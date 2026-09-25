// Regression tests for scraper/daily-update-logic.js — the pure logic
// behind the daily automatic price update (scraper/daily-update.js).
// Run with: node scraper/daily-update-logic.test.js
// or:       npm test

const assert = require("node:assert/strict");
const {
  checkStoreSafety,
  updateProductPrices,
  availableStoreCount,
  updateHidden,
  findLeftoverPool,
} = require("./daily-update-logic");

function test(name, run) {
  try {
    run();
    console.log(`PASS  ${name}`);
    return true;
  } catch (err) {
    console.log(`FAIL  ${name}`);
    console.log(`      ${err.message}`);
    return false;
  }
}

// A minimal fresh item, shaped like what scrape-output.js's
// toStoreEntry reads from (item.signature.size, not a plain "size").
function freshItem(url, price, extra = {}) {
  return { url, price, currency: "EUR", signature: { size: null }, ...extra };
}

function product(prices) {
  return { name: "Test product", category: "Test", prices };
}

const results = [
  test("Price update: a fresh item found by URL updates that store's price, leaving the URL and other stores untouched", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
      rimi: { price: 2.0, currency: "EUR", url: "r1" },
    });
    const freshByStore = { barbora: [freshItem("b1", 1.29)] };
    const { priceUpdates, newlyUnavailable, reactivated } = updateProductPrices(p, freshByStore);
    assert.equal(priceUpdates, 1);
    assert.equal(newlyUnavailable, 0);
    assert.equal(reactivated, 0);
    assert.equal(p.prices.barbora.price, 1.29);
    assert.equal(p.prices.barbora.url, "b1");
    // Rimi wasn't in freshByStore at all (unsafe/failed this run) —
    // its entry must be byte-for-byte untouched.
    assert.deepEqual(p.prices.rimi, { price: 2.0, currency: "EUR", url: "r1" });
  }),

  test("Unavailable: a store's URL missing from the fresh scrape marks that entry unavailable, keeping its last known price", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
    });
    const freshByStore = { barbora: [freshItem("some-other-url", 5.0)] };
    const { priceUpdates, newlyUnavailable } = updateProductPrices(p, freshByStore);
    assert.equal(priceUpdates, 0);
    assert.equal(newlyUnavailable, 1);
    assert.equal(p.prices.barbora.unavailable, true);
    assert.equal(p.prices.barbora.price, 1.0, "last known price is kept, not cleared");
    assert.equal(p.prices.barbora.url, "b1", "URL is kept so a later run can still find and reactivate it");
  }),

  test("Reactivation: a previously-unavailable store found again by URL clears the flag and updates the price", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1", unavailable: true },
    });
    const freshByStore = { barbora: [freshItem("b1", 1.49)] };
    const { reactivated } = updateProductPrices(p, freshByStore);
    assert.equal(reactivated, 1);
    assert.equal(p.prices.barbora.unavailable, undefined);
    assert.equal(p.prices.barbora.price, 1.49);
  }),

  test("Hide under 2 stores: a product left with only 1 available store is hidden, never deleted; 2+ stays visible", () => {
    const oneLeft = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1", unavailable: true },
      rimi: { price: 2.0, currency: "EUR", url: "r1" },
    });
    assert.equal(availableStoreCount(oneLeft), 1);
    assert.equal(updateHidden(oneLeft), true);
    assert.equal(oneLeft.hidden, true);
    assert.ok(oneLeft.prices.barbora, "the unavailable store's entry still exists — never deleted");

    const twoLeft = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
      rimi: { price: 2.0, currency: "EUR", url: "r1" },
      selver: { price: 3.0, currency: "EUR", url: "s1", unavailable: true },
    });
    assert.equal(availableStoreCount(twoLeft), 2);
    assert.equal(updateHidden(twoLeft), false);

    // Reactivating a store must flip hidden back to false, the same
    // run a later scrape finds it again.
    updateProductPrices(oneLeft, { barbora: [freshItem("b1", 1.1)] });
    assert.equal(updateHidden(oneLeft), false);
  }),

  test("Pending not published: findLeftoverPool only returns items whose URL isn't already tied to an existing product", () => {
    const existing = [
      product({
        barbora: { price: 1.0, currency: "EUR", url: "b1" },
        rimi: { price: 2.0, currency: "EUR", url: "r1" },
      }),
    ];
    const freshByStore = {
      barbora: [freshItem("b1", 1.1), freshItem("b2", 4.5)], // b1 already used, b2 is new
      rimi: [freshItem("r1", 2.2)], // already used, no new Rimi items
      selver: [freshItem("s1", 3.3)], // a store with no existing product at all
    };
    const pool = findLeftoverPool(existing, freshByStore);
    assert.deepEqual(
      pool.map((i) => i.url).sort(),
      ["b2", "s1"]
    );
  }),

  test("Safety: a 20%+ item count drop is unsafe, under 20% is safe", () => {
    const previous = Array.from({ length: 100 }, (_, i) => ({ url: `u${i}`, price: 1 }));
    const droppedTo79 = previous.slice(0, 79); // 21% fewer
    const droppedTo81 = previous.slice(0, 81); // 19% fewer

    assert.equal(checkStoreSafety(previous, droppedTo79).safe, false);
    assert.equal(checkStoreSafety(previous, droppedTo79).reason, "item-count-drop");
    assert.equal(checkStoreSafety(previous, droppedTo81).safe, true);
  }),

  test("Safety: more than 30% of matched items changing price by more than 50% is unsafe, 30% or fewer is safe", () => {
    const previous = Array.from({ length: 10 }, (_, i) => ({ url: `u${i}`, price: 10 }));
    // 4 of 10 (40%) triple in price — over both thresholds.
    const freshUnsafe = previous.map((item, i) => ({ url: item.url, price: i < 4 ? 30 : 10 }));
    assert.equal(checkStoreSafety(previous, freshUnsafe).safe, false);
    assert.equal(checkStoreSafety(previous, freshUnsafe).reason, "price-volatility");

    // Exactly 3 of 10 (30%) triple — at the threshold, not over it.
    const freshAtThreshold = previous.map((item, i) => ({ url: item.url, price: i < 3 ? 30 : 10 }));
    assert.equal(checkStoreSafety(previous, freshAtThreshold).safe, true);

    // A real, ordinary sale/price-change (under 50%) on every item
    // must never trip this.
    const freshOrdinary = previous.map((item) => ({ url: item.url, price: 11 }));
    assert.equal(checkStoreSafety(previous, freshOrdinary).safe, true);
  }),

  test("Safety: with no previous data at all (a brand-new category), any fresh list is safe — nothing to compare against", () => {
    const fresh = [{ url: "u1", price: 1 }];
    assert.equal(checkStoreSafety([], fresh).safe, true);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
