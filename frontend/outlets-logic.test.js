// Regression tests for frontend/outlets-logic.js — matching a mall's
// shop list to a brand's own scraped sale items by name.
// Run with: node frontend/outlets-logic.test.js
// or as part of: npm test

const assert = require("node:assert/strict");
const { brandKey, indexBrandsByName, mallList, findMall, shopsWithDiscounts, brandItemsForShopName, itemSections, itemTypes, filterAndSortItems } = require("./outlets-logic");

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
    { id: "1", name: "Calvin Klein Jope", regularPrice: 80, salePrice: 60, discountPercent: 25, status: "new", newPercent: 14, link: "https://a", image: null },
    { id: "2", name: "Levi's Teksad", regularPrice: 90, salePrice: 45, discountPercent: 50, status: "permanent", newPercent: null, link: "https://b", image: null },
  ],
};

const results = [
  test("brandKey: trims and lowercases so casing/whitespace differences never break a match; a mall's second unit ('Apotheka 2', 'Goldtime II', 'H&M II korrus') is the same brand", () => {
    assert.equal(brandKey("Denim Dream"), "denim dream");
    assert.equal(brandKey("  DENIM DREAM  "), "denim dream");
    assert.equal(brandKey(null), "");
    assert.equal(brandKey("Apotheka 2"), "apotheka");
    assert.equal(brandKey("Goldtime II"), "goldtime");
    assert.equal(brandKey("H&M II korrus"), "h&m");
    assert.equal(brandKey("Klick"), "klick");
    assert.equal(brandKey("Telo24"), "telo24", "a number fused into the name is the name");
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
  test("shopsWithDiscounts: a shop whose name matches a brand file gets a real summary — item count, how many are NEW discounts (status 'new'), and the largest new % (against the 30-day low, never the -50% tavahind gap of a permanent price); a shop with no match gets discount: null", () => {
    const mall = { shops: [{ name: "Denim Dream", category: "Mood", floor: "1" }, { name: "Some Other Shop" }] };
    const byName = indexBrandsByName([DENIM_DREAM]);
    const result = shopsWithDiscounts(mall, byName);
    assert.deepEqual(result[0].discount, { brand: "Denim Dream", itemCount: 2, newCount: 1, maxNewPercent: 14, unknownCount: 0 });
    assert.equal(result[1].discount, null);
    const allPermanent = indexBrandsByName([{ ...DENIM_DREAM, items: DENIM_DREAM.items.map((i) => ({ ...i, status: "permanent", newPercent: null })) }]);
    assert.deepEqual(shopsWithDiscounts(mall, allPermanent)[0].discount, { brand: "Denim Dream", itemCount: 2, newCount: 0, maxNewPercent: 0, unknownCount: 0 });
    const klick = indexBrandsByName([{ brand: "Klick", items: [{ discountPercent: 13, status: "unknown", newPercent: null }] }]);
    assert.deepEqual(shopsWithDiscounts({ shops: [{ name: "Klick" }] }, klick)[0].discount, { brand: "Klick", itemCount: 1, newCount: 0, maxNewPercent: 0, unknownCount: 1 });
    const secondUnit = indexBrandsByName([{ brand: "Apotheka", items: [{ discountPercent: 50, status: "unknown", newPercent: null }] }]);
    assert.equal(shopsWithDiscounts({ shops: [{ name: "Apotheka 2" }] }, secondUnit)[0].discount.itemCount, 1, "'Apotheka 2' is Apotheka");
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
  test("itemSections/itemTypes: sections in the store's own order, only those present; types by count then Estonian alphabet, within the chosen section only", () => {
    const items = [
      { section: "Mehed", type: "Teksad" }, { section: "Naised", type: "Kleidid" }, { section: "Naised", type: "Teksad" },
      { section: "Naised", type: "Teksad" }, { section: "Lapsed", type: "Sokid" }, { section: "Naised", type: "Ülerõivad" },
    ];
    assert.deepEqual(itemSections(items), ["Naised", "Mehed", "Lapsed"]);
    assert.deepEqual(itemSections(items.slice(0, 1)), ["Mehed"]);
    assert.deepEqual(itemTypes(items, null), [{ type: "Teksad", count: 3 }, { type: "Kleidid", count: 1 }, { type: "Sokid", count: 1 }, { type: "Ülerõivad", count: 1 }]);
    assert.deepEqual(itemTypes(items, "Naised"), [{ type: "Teksad", count: 2 }, { type: "Kleidid", count: 1 }, { type: "Ülerõivad", count: 1 }]);
  }),
  test("filterAndSortItems: section and type narrow; 'discount' = biggest % first, 'price' = cheapest first, 'newest' = latest firstSeen, then fresh, then the store's own order; a filter matching nothing gives an empty list, not everything", () => {
    const items = [
      { id: "a", name: "A", section: "Naised", type: "Teksad", salePrice: 40, discountPercent: 50, firstSeen: "2026-09-20", fresh: false, position: 3 },
      { id: "b", name: "B", section: "Naised", type: "Kleidid", salePrice: 30, discountPercent: 25, firstSeen: "2026-09-26", fresh: false, position: 2 },
      { id: "c", name: "C", section: "Mehed", type: "Teksad", salePrice: 10, discountPercent: 30, firstSeen: "2026-09-26", fresh: true, position: 1 },
      { id: "d", name: "D", section: "Mehed", type: "Teksad", salePrice: 20, discountPercent: 30, firstSeen: "2026-09-26", fresh: true, position: 5 },
    ];
    const ids = (f) => filterAndSortItems(items, f).map((i) => i.id);
    assert.deepEqual(ids({}), ["a", "c", "d", "b"], "default (all permanent here): tavahind gap desc, then cheaper first");
    const withNew = items.map((i) => (i.id === "b" ? { ...i, status: "new", newPercent: 10 } : i));
    assert.deepEqual(filterAndSortItems(withNew, {}).map((i) => i.id), ["b", "a", "c", "d"], "a NEW discount sorts before every permanent price, whatever its tavahind gap");
    const withUnknown = withNew.map((i) => (i.id === "d" ? { ...i, status: "unknown" } : i));
    assert.deepEqual(filterAndSortItems(withUnknown, {}).map((i) => i.id), ["b", "d", "a", "c"], "new, then not-yet-judgeable, then permanent");
    assert.deepEqual(ids({ sort: "price" }), ["c", "d", "b", "a"]);
    assert.deepEqual(ids({ sort: "newest" }), ["c", "d", "b", "a"], "2026-09-26 before 2026-09-20; fresh before not; store order within");
    assert.deepEqual(ids({ section: "Naised" }), ["a", "b"]);
    assert.deepEqual(ids({ section: "Mehed", type: "Teksad", sort: "price" }), ["c", "d"]);
    assert.deepEqual(ids({ type: "Kleidid", section: "Mehed" }), []);
    assert.deepEqual(ids({ sort: "bogus" }), ["a", "c", "d", "b"], "an unknown sort falls back to discount");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
