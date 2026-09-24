// Regression tests for frontend/pricing.js — specifically the tie
// rule: every store at the lowest price counts as cheapest, not just
// the first one found.
// Run with: node frontend/pricing.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { storeEntries, cheapestPrice, productRows } = require("./pricing");

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
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
