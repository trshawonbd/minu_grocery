// Regression tests for frontend/outlets-logic.js — matching a mall's
// shop list to a brand's own scraped sale items by name.
// Run with: node frontend/outlets-logic.test.js
// or as part of: npm test

const assert = require("node:assert/strict");
const { brandKey, indexBrandsByName, mallList, findMall, shopsWithDiscounts, brandItemsForShopName } = require("./outlets-logic");

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

const DENIM_DREAM = {
  brand: "Denim Dream",
  scrapedAt: "2026-09-26T10:00:00.000Z",
  catalogueCount: 5575,
  items: [
    { id: "1", name: "Calvin Klein Jope", regularPrice: 80, salePrice: 60, discountPercent: 25, link: "https://a", image: null },
    { id: "2", name: "Levi's Teksad", regularPrice: 90, salePrice: 45, discountPercent: 50, link: "https://b", image: null },
  ],
};

const results = [
  test("brandKey: trims and lowercases so casing/whitespace differences never break a match", () => {
    assert.equal(brandKey("Denim Dream"), "denim dream");
    assert.equal(brandKey("  DENIM DREAM  "), "denim dream");
    assert.equal(brandKey(null), "");
  }),
  test("indexBrandsByName: keys by lowercased brand name, skips a malformed entry with no brand field", () => {
    const byName = indexBrandsByName([DENIM_DREAM, { items: [] }]);
    assert.equal(byName.get("denim dream"), DENIM_DREAM);
    assert.equal(byName.size, 1);
  }),
  test("mallList: id/name/address plus a shop count, never the full shop array", () => {
    const malls = [{ id: "ulemiste", name: "Ülemiste", address: "Suur-Sõjamäe tn 4", shops: [{ name: "A" }, { name: "B" }] }];
    assert.deepEqual(mallList(malls), [{ id: "ulemiste", name: "Ülemiste", address: "Suur-Sõjamäe tn 4", shopCount: 2 }]);
  }),
  test("findMall: looks a mall up by id, null when not found", () => {
    const malls = [{ id: "ulemiste", name: "Ülemiste" }];
    assert.equal(findMall(malls, "ulemiste").name, "Ülemiste");
    assert.equal(findMall(malls, "nope"), null);
  }),
  test("shopsWithDiscounts: a shop whose name matches a brand file gets a real discount summary (max % and item count read from the actual items, not guessed); a shop with no match gets discount: null", () => {
    const mall = { shops: [{ name: "Denim Dream", category: "Mood", floor: "1" }, { name: "Some Other Shop" }] };
    const byName = indexBrandsByName([DENIM_DREAM]);
    const result = shopsWithDiscounts(mall, byName);
    assert.deepEqual(result[0].discount, { brand: "Denim Dream", maxPercent: 50, itemCount: 2 });
    assert.equal(result[1].discount, null);
  }),
  test("shopsWithDiscounts: matches case-insensitively (a mall's own casing pass and a brand's own field aren't guaranteed to agree)", () => {
    const mall = { shops: [{ name: "DENIM DREAM" }] };
    const byName = indexBrandsByName([DENIM_DREAM]);
    assert.equal(shopsWithDiscounts(mall, byName)[0].discount.itemCount, 2);
  }),
  test("brandItemsForShopName: returns the real items for a matching shop name, an empty list for no match", () => {
    const byName = indexBrandsByName([DENIM_DREAM]);
    assert.equal(brandItemsForShopName(byName, "Denim Dream").length, 2);
    assert.deepEqual(brandItemsForShopName(byName, "No Match"), []);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
