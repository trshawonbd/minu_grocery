// Regression tests for findBrandForName in rimi.js — specifically
// that it tolerates a different mix of spaces/dots than the brand
// facet's own string uses, without ever matching a partial or
// unrelated brand.
// Run with: node scraper/stores/rimi.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { findBrandForName } = require("./rimi");

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
  test('Real case: "A.Le Coq" (no space after the dot) still finds the facet\'s "A. Le Coq"', () => {
    const facet = ["A. Le Coq"];
    assert.equal(findBrandForName("Kali klassikaline A.Le Coq 0,5l pet", facet), "A. Le Coq");
  }),

  test("Any mix of spaces/dots between the brand's own words is tolerated", () => {
    const facet = ["A. Le Coq"];
    assert.equal(findBrandForName("A. Le Coq toode", facet), "A. Le Coq", "facet's own spacing");
    assert.equal(findBrandForName("A.Le Coq toode", facet), "A. Le Coq", "dot, no space");
    assert.equal(findBrandForName("A Le Coq toode", facet), "A. Le Coq", "space, no dot");
    assert.equal(findBrandForName("A.Le.Coq toode", facet), "A. Le Coq", "dots throughout");
  }),

  test("Never a partial match — the brand's own letters must still appear whole and in order", () => {
    const facet = ["A. Le Coq"];
    assert.equal(findBrandForName("Coq au vin 500g", facet), null, "only the last word present");
    assert.equal(findBrandForName("A. Le toode", facet), null, "missing the last word entirely");
    assert.equal(findBrandForName("Coqtail Karastusjook 500ml", facet), null, "\"Coq\" as a prefix of a longer, unrelated word");
  }),

  test("Never matches an unrelated brand on the same page's facet list", () => {
    const facet = ["A. Le Coq", "Alma", "Tere"];
    assert.equal(findBrandForName("Piim Alma 2,5% 1l", facet), "Alma");
    assert.equal(findBrandForName("Piim Tere 2,5% 1l", facet), "Tere");
    assert.equal(findBrandForName("Kali A.Le Coq 0,5l", facet), "A. Le Coq");
    // None of the three should ever cross-match another's item.
    assert.notEqual(findBrandForName("Piim Alma 2,5% 1l", facet), "Tere");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
