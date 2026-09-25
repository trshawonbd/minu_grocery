// Regression tests for frontend/pricing.js — specifically the tie
// rule: every store at the lowest price counts as cheapest, not just
// the first one found.
// Run with: node frontend/pricing.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { storeEntries, cheapestPrice, productRows, unitPrice, productImage, SHOW_STORE_IMAGES } = require("./pricing");

function product(barboraPrice, rimiPrice) {
  return {
    prices: {
      barbora: { price: barboraPrice, currency: "EUR", url: "b" },
      rimi: { price: rimiPrice, currency: "EUR", url: "r" },
    },
  };
}

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

const results = [
  test("Two-way tie: both stores are marked cheapest, e.g. Laim kg at 4.99 € on both sides", () => {
    const entries = storeEntries(product(4.99, 4.99));
    const lowest = cheapestPrice(entries);
    const cheapestStores = entries.filter((e) => e.price === lowest).map((e) => e.store).sort();
    assert.deepEqual(cheapestStores, ["barbora", "rimi"]);
  }),
  test("No tie: only the actual lower price is marked cheapest", () => {
    const entries = storeEntries(product(3.99, 3.79));
    const lowest = cheapestPrice(entries);
    const cheapestStores = entries.filter((e) => e.price === lowest).map((e) => e.store);
    assert.deepEqual(cheapestStores, ["rimi"]);
  }),
  test("A 3-store product: every store shows, only the real cheapest is marked, diffs are against it", () => {
    const threeStore = {
      prices: {
        barbora: { price: 3.99, currency: "EUR", url: "b" },
        rimi: { price: 3.79, currency: "EUR", url: "r" },
        selver: { price: 4.29, currency: "EUR", url: "s", cardPrice: 3.59, cardName: "Partner" },
      },
    };
    const rows = productRows(threeStore);
    assert.equal(rows.length, 3);
    assert.deepEqual(rows.map((r) => r.store), ["rimi", "barbora", "selver"]);

    const cheapest = rows.filter((r) => r.isCheapest);
    assert.deepEqual(cheapest.map((r) => r.store), ["rimi"]);

    const barboraRow = rows.find((r) => r.store === "barbora");
    assert.equal(Math.round(barboraRow.diff * 100) / 100, 0.2);
    assert.ok(Math.abs(barboraRow.pct - (0.2 / 3.79) * 100) < 0.01);

    // A store's card price passes through untouched, and plays no
    // part in isCheapest — Selver's 3.59 card price is below Rimi's
    // 3.79 real price, but Selver isn't marked cheapest.
    const selverRow = rows.find((r) => r.store === "selver");
    assert.equal(selverRow.cardPrice, 3.59);
    assert.equal(selverRow.cardName, "Partner");
    assert.equal(selverRow.isCheapest, false);
  }),

  test("Unit price: a plain weight and a plain volume both compute correctly", () => {
    const weight = unitPrice({ price: 2.49, size: "500g" });
    assert.equal(weight.unit, "kg");
    assert.ok(Math.abs(weight.value - 4.98) < 0.001);

    const volume = unitPrice({ price: 1.29, size: "330ml" });
    assert.equal(volume.unit, "l");
    assert.ok(Math.abs(volume.value - 1.29 / 0.33) < 0.001);
  }),
  test("Unit price: a multipack uses its total volume, not the per-bottle size", () => {
    // Real case: Coca-Cola Zero 6x330ml at 6.19 € -> price per litre
    // of the whole 6-pack (1.98 L), not per 330ml bottle.
    const sixPack = unitPrice({ price: 6.19, size: "6x330ml" });
    assert.equal(sixPack.unit, "l");
    assert.ok(Math.abs(sixPack.value - 6.19 / 1.98) < 0.001);

    const single = unitPrice({ price: 1.29, size: "330ml" });
    assert.notEqual(Math.round(sixPack.value * 100), Math.round(single.value * 100), "a 6-pack's per-litre price must not collapse to the same number as a single bottle's");
  }),
  test("Unit price: skipped (null) when there's no size to work from", () => {
    assert.equal(unitPrice({ price: 2.49 }), null);
    assert.equal(unitPrice({ price: 2.49, size: null }), null);
    assert.equal(unitPrice({ price: 2.49, size: "10-pack" }), null, "a non-standard size shape is skipped, not guessed at");
  }),
  test("Store images: with SHOW_STORE_IMAGES off, productImage returns null even when every store has a photo — so no image URL is ever put in the page and no store is contacted", () => {
    const product = {
      prices: {
        barbora: { price: 1, currency: "EUR", url: "b", image: "https://cdn.barbora.ee/products/x_m.png" },
        rimi: { price: 1, currency: "EUR", url: "r", image: "https://rimibaltic-res.cloudinary.com/x" },
        selver: { price: 1, currency: "EUR", url: "s", image: "https://www.selver.ee/img/800/800/resize/x.jpg" },
      },
    };
    assert.equal(productImage(product, false), null);
    assert.equal(typeof SHOW_STORE_IMAGES, "boolean", "the setting is a single boolean in pricing.js");
  }),
  test("Store images: one store's photo per product, in the fixed preference order, skipping a store with no photo or an unavailable listing", () => {
    const all = {
      prices: {
        barbora: { price: 1, currency: "EUR", url: "b", image: "https://cdn.barbora.ee/products/x_m.png" },
        rimi: { price: 1, currency: "EUR", url: "r", image: "https://rimibaltic-res.cloudinary.com/x" },
        selver: { price: 1, currency: "EUR", url: "s", image: "https://www.selver.ee/img/800/800/resize/x.jpg" },
      },
    };
    assert.deepEqual(productImage(all, true), { url: "https://cdn.barbora.ee/products/x_m.png", store: "barbora" });
    const noBarbora = { prices: { rimi: all.prices.rimi, selver: all.prices.selver } };
    assert.equal(productImage(noBarbora, true).store, "selver");
    const barboraGone = { prices: { ...all.prices, barbora: { ...all.prices.barbora, unavailable: true } } };
    assert.equal(productImage(barboraGone, true).store, "selver", "an unavailable store's photo isn't used");
    const none = { prices: { barbora: { price: 1, currency: "EUR", url: "b" }, rimi: { price: 1, currency: "EUR", url: "r" } } };
    assert.equal(productImage(none, true), null, "no photo anywhere -> the icon");
  }),
  test("Unit price: a diaper (piece-count size '96tk') is priced per piece, never per kg — the baby's weight range plays no part", () => {
    const diapers = unitPrice({ price: 24.33, size: "96tk" });
    assert.equal(diapers.unit, "tk");
    assert.ok(Math.abs(diapers.value - 24.33 / 96) < 0.0001);
    assert.equal(unitPrice({ price: 24.33, size: "0tk" }), null, "a zero count is skipped, not divided by");
    // Regression: the old weight-range-as-size shape must never again
    // produce a €/kg number for a diaper — the scraper no longer writes
    // it, and even if it did, "17000g" is not a piece count.
    const oldShape = unitPrice({ price: 24.33, size: "17000g" });
    assert.notEqual(oldShape && oldShape.unit, "tk");
  }),
  test("Unit price never affects isCheapest — productRows still decides cheapest from price alone", () => {
    const product = {
      prices: {
        barbora: { price: 3.99, currency: "EUR", url: "b", size: "1000g" },
        rimi: { price: 3.79, currency: "EUR", url: "r", size: "500g" },
      },
    };
    const rows = productRows(product);
    const cheapest = rows.filter((r) => r.isCheapest);
    // Rimi is cheaper per package (3.79 < 3.99) despite Barbora being
    // cheaper per kg (3.99/kg vs 7.58/kg) — isCheapest must track the
    // real price paid, never the computed unit price.
    assert.deepEqual(cheapest.map((r) => r.store), ["rimi"]);
    assert.ok(Math.abs(rows.find((r) => r.store === "barbora").unitPrice.value - 3.99) < 0.001);
  }),

  test("Meat (cheapestByUnitPrice): isCheapest is decided by storeUnitPrice, not pack price", () => {
    const meat = {
      cheapestByUnitPrice: true,
      prices: {
        // Barbora: cheaper pack, but sold "per kg" at a HIGHER per-kg
        // rate than Rimi's fixed 400g pack — real case shape (see the
        // Meat investigation: many items have no weight in the name at
        // all, priced per kg directly).
        barbora: { price: 5.0, currency: "EUR", url: "b", storeUnitPrice: 12.0 },
        rimi: { price: 7.49, currency: "EUR", url: "r", size: "400g", storeUnitPrice: 8.72 },
      },
    };
    const rows = productRows(meat);
    const cheapest = rows.filter((r) => r.isCheapest);
    assert.deepEqual(cheapest.map((r) => r.store), ["rimi"]);
    // The higher-pack-price store is correctly NOT cheapest, because
    // its per-kg rate is worse — the opposite of what plain price
    // comparison would say.
    assert.equal(rows.find((r) => r.store === "barbora").isCheapest, false);
  }),
  test("Meat: a per-kg tie marks every tied store cheapest, same rule as a price tie", () => {
    const meat = {
      cheapestByUnitPrice: true,
      prices: {
        barbora: { price: 6.0, currency: "EUR", url: "b", storeUnitPrice: 12.0 },
        rimi: { price: 4.8, currency: "EUR", url: "r", size: "400g", storeUnitPrice: 12.0 },
      },
    };
    const rows = productRows(meat);
    const cheapest = rows.filter((r) => r.isCheapest).map((r) => r.store).sort();
    assert.deepEqual(cheapest, ["barbora", "rimi"]);
  }),
  test("Meat: a store missing storeUnitPrice is never marked cheapest and gets no diff/pct, but still shows", () => {
    const meat = {
      cheapestByUnitPrice: true,
      prices: {
        barbora: { price: 5.0, currency: "EUR", url: "b" }, // no storeUnitPrice
        rimi: { price: 7.49, currency: "EUR", url: "r", storeUnitPrice: 8.72 },
      },
    };
    const rows = productRows(meat);
    assert.equal(rows.length, 2);
    const barboraRow = rows.find((r) => r.store === "barbora");
    assert.equal(barboraRow.isCheapest, false);
    assert.equal(barboraRow.diff, null);
    assert.equal(barboraRow.pct, null);
    assert.equal(rows.find((r) => r.store === "rimi").isCheapest, true);
  }),
  test("Non-meat products are completely unaffected by cheapestByUnitPrice logic — still rank by price", () => {
    const plain = {
      prices: {
        barbora: { price: 3.99, currency: "EUR", url: "b", storeUnitPrice: 999 },
        rimi: { price: 3.79, currency: "EUR", url: "r", storeUnitPrice: 1 },
      },
    };
    const rows = productRows(plain);
    // storeUnitPrice values are deliberately backwards from price here
    // — if this ever affected a non-flagged product, Barbora (huge
    // storeUnitPrice) would wrongly win. It must still be Rimi.
    assert.deepEqual(rows.filter((r) => r.isCheapest).map((r) => r.store), ["rimi"]);
  }),

  test("Daily update: a store the update marked unavailable is never shown as a row and never competes for cheapest", () => {
    const twoAvailable = {
      prices: {
        barbora: { price: 1.99, currency: "EUR", url: "b", unavailable: true },
        rimi: { price: 3.79, currency: "EUR", url: "r" },
        selver: { price: 3.99, currency: "EUR", url: "s" },
      },
    };
    const rows = productRows(twoAvailable);
    assert.equal(rows.length, 2, "the unavailable store never appears as a row");
    assert.deepEqual(
      rows.map((r) => r.store).sort(),
      ["rimi", "selver"]
    );
    // Barbora's 1.99 is the lowest real number in the data, but it's
    // unavailable — must never win cheapest just by being cheap.
    assert.deepEqual(rows.filter((r) => r.isCheapest).map((r) => r.store), ["rimi"]);
  }),
  test("Daily update: every store unavailable leaves productRows/cheapestPrice empty rather than crashing", () => {
    const allGone = {
      prices: {
        barbora: { price: 1.99, currency: "EUR", url: "b", unavailable: true },
        rimi: { price: 3.79, currency: "EUR", url: "r", unavailable: true },
      },
    };
    assert.deepEqual(productRows(allGone), []);
    assert.equal(cheapestPrice(storeEntries(allGone)), null);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
