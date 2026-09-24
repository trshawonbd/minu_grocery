// Regression tests for the price-fairness split in barbora.js —
// specifically, that a loyalty-card-only price is never surfaced as
// the plain "price" a matched product is compared and sorted on.
// Run with: node scraper/stores/barbora.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { splitPrice } = require("./barbora");

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
  test("Aitäh-only price is never used as price — price falls back to the regular price instead", () => {
    // Real case: Õun Kanzi 1kl., kg on 2026-09-23 — €3.19 required the
    // Aitäh card, €3.99 was what a walk-in customer actually paid.
    const result = splitPrice({
      price: 3.19,
      retail_price: 3.99,
      promotion: { loyaltyCardRequired: true },
    });
    assert.equal(result.price, 3.99, "price must be the regular price, not the loyalty price");
    assert.equal(result.regularPrice, 3.99);
    assert.equal(result.cardPrice, 3.19);
    assert.equal(result.cardName, "Aitäh");
  }),

  test("A cardless sale price IS used as price — it's open to everyone", () => {
    const result = splitPrice({
      price: 0.75,
      retail_price: 1.29,
      promotion: { loyaltyCardRequired: false },
    });
    assert.equal(result.price, 0.75);
    assert.equal(result.regularPrice, 1.29);
    assert.equal(result.cardPrice, null);
    assert.equal(result.cardName, null);
  }),

  test("No promotion at all — price and regularPrice are the same, no card fields", () => {
    const result = splitPrice({ price: 4.99, promotion: null });
    assert.equal(result.price, 4.99);
    assert.equal(result.regularPrice, 4.99);
    assert.equal(result.cardPrice, null);
    assert.equal(result.cardName, null);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
