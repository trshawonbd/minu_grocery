// Regression tests for frontend/outlets-logic.js — matching a mall's
// shop list to a brand's own scraped sale items by name.
// Run with: node frontend/outlets-logic.test.js
// or as part of: npm test

const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const {
  brandKey, indexBrandsByName, mallList, findMall, shopsWithDiscounts, brandItemsForShopName, itemSections, itemTypes, filterAndSortItems,
  dedupeShopsByBrand, haversineKm, formatKm, mallsWithDistance, mallsInRadius, mallSummary, orderShopsForMall, RADIUS_OPTIONS_KM, DEFAULT_RADIUS_KM,
} = require("./outlets-logic");

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
  test("dedupeShopsByBrand / mallList: a chain listed twice in one mall ('Apotheka', 'Apotheka 2'; 'H&M', 'H&M II korrus') is one row, the first listing's details kept; the mall's shop count counts it once", () => {
    const shops = [{ name: "Apotheka", floor: "1" }, { name: "Klick" }, { name: "Apotheka 2", floor: "2" }, { name: "H&M" }, { name: "H&M II korrus" }];
    assert.deepEqual(dedupeShopsByBrand(shops).map((s) => s.name), ["Apotheka", "Klick", "H&M"]);
    assert.equal(dedupeShopsByBrand(shops)[0].floor, "1");
    assert.equal(mallList([{ id: "x", name: "X", shops }])[0].shopCount, 3);
  }),
  test("haversineKm: the great-circle distance — Viru Keskus to Kristiine keskus is about 2.05 km, to Lõunakeskus about 163 km, to itself 0; formatKm gives one decimal under 10 km and whole km above", () => {
    const viru = { lat: 59.436198, lon: 24.75525 };
    const kristiine = { lat: 59.42675, lon: 24.724157 };
    const lounakeskus = { lat: 58.357883, lon: 26.677576 };
    const d1 = haversineKm(viru.lat, viru.lon, kristiine.lat, kristiine.lon);
    assert.ok(Math.abs(d1 - 2.05) < 0.05, `got ${d1}`);
    const d2 = haversineKm(viru.lat, viru.lon, lounakeskus.lat, lounakeskus.lon);
    assert.ok(Math.abs(d2 - 163) < 1, `got ${d2}`);
    assert.equal(haversineKm(viru.lat, viru.lon, viru.lat, viru.lon), 0);
    assert.equal(formatKm(2.44), "2.4 km");
    assert.equal(formatKm(0.96), "1.0 km");
    assert.equal(formatKm(162.99), "163 km");
  }),
  test("mallsWithDistance + mallsInRadius: nearest first with a distance; the 5/8/10 km chips keep only malls within, 'Kõik' (null) keeps all; without a location the order is untouched and everything passes", () => {
    const malls = [
      { id: "lounakeskus", name: "Lõunakeskus", lat: 58.357883, lon: 26.677576 },
      { id: "ulemiste", name: "Ülemiste", lat: 59.421955, lon: 24.794377 },
      { id: "kristiine", name: "Kristiine keskus", lat: 59.42675, lon: 24.724157 },
      { id: "roccaalmare", name: "Rocca al Mare", lat: 59.426768, lon: 24.651907 },
    ];
    const viru = { lat: 59.436198, lon: 24.75525, label: "Viru väljak 4" };
    const located = mallsWithDistance(malls, viru);
    assert.deepEqual(located.map((m) => m.id), ["kristiine", "ulemiste", "roccaalmare", "lounakeskus"]);
    assert.ok(located.every((m) => typeof m.distanceKm === "number"));
    assert.deepEqual(mallsInRadius(located, 5).map((m) => m.id), ["kristiine", "ulemiste"]);
    assert.deepEqual(mallsInRadius(located, 8).map((m) => m.id), ["kristiine", "ulemiste", "roccaalmare"]);
    assert.deepEqual(mallsInRadius(located, 10).map((m) => m.id), ["kristiine", "ulemiste", "roccaalmare"]);
    assert.equal(mallsInRadius(located, null).length, 4, "Kõik");
    assert.deepEqual(RADIUS_OPTIONS_KM, [5, 8, 10, null]);
    assert.equal(DEFAULT_RADIUS_KM, 10);
    const unlocated = mallsWithDistance(malls, null);
    assert.deepEqual(unlocated.map((m) => m.id), ["lounakeskus", "ulemiste", "kristiine", "roccaalmare"], "no location: the malls' own order");
    assert.ok(unlocated.every((m) => m.distanceKm === null));
    assert.equal(mallsInRadius(unlocated, 5).length, 0, "a radius without a location matches nothing — the screen never asks for that");
  }),
  test("mallSummary / orderShopsForMall: how many (deduped) shops have discount data and the biggest three; a mall page lists those first, biggest first, then the rest in the mall's own order", () => {
    const byName = indexBrandsByName([
      { brand: "Apotheka", items: Array.from({ length: 777 }, (_, i) => ({ id: String(i), discountPercent: 10, status: "unknown", newPercent: null })) },
      { brand: "Klick", items: Array.from({ length: 30 }, (_, i) => ({ id: String(i), discountPercent: 10, status: "unknown", newPercent: null })) },
      { brand: "Denim Dream", items: Array.from({ length: 9522 }, (_, i) => ({ id: String(i), discountPercent: 30, status: "permanent", newPercent: null })) },
    ]);
    const mall = { shops: [{ name: "Zara" }, { name: "Apotheka" }, { name: "Klick" }, { name: "Apotheka 2" }, { name: "Denim Dream" }, { name: "Euronics" }] };
    assert.deepEqual(mallSummary(mall, byName), { discountShops: 3, top: [{ name: "Denim Dream", count: 9522 }, { name: "Apotheka", count: 777 }, { name: "Klick", count: 30 }] });
    assert.deepEqual(orderShopsForMall(shopsWithDiscounts(mall, byName)).map((s) => s.name), ["Denim Dream", "Apotheka", "Klick", "Zara", "Euronics"]);
    assert.deepEqual(mallSummary({ shops: [{ name: "Zara" }] }, byName), { discountShops: 0, top: [] });
  }),
  test("the shopper's location is never stored or sent (the owner's rule): index.html keeps it in state only — no localStorage/sessionStorage/cookie write mentions it, no hash route carries it, and the only outgoing address lookup sends the typed address text alone", () => {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    const lines = html.split("\n");
    const storageLines = lines.filter((l) => /localStorage|sessionStorage|document\.cookie/.test(l));
    assert.ok(storageLines.length > 0, "the file does use storage (for lang and basket)");
    assert.ok(storageLines.every((l) => !/outletLocation|outletRadius|latitude|longitude|coords/.test(l)), "no storage line touches the location");
    assert.ok(!/location\.hash\s*=[^\n]*(outletLocation|lat|lon)/.test(html), "no route carries the location");
    const inads = lines.filter((l) => /inaadress\.maaamet\.ee/.test(l));
    assert.equal(inads.length, 1, "exactly one In-ADS request");
    assert.ok(/encodeURIComponent\(address\)/.test(inads[0]) && !/lat|lon|coords/.test(inads[0]), "it sends the typed address text only");
    assert.ok(!/fetch\([^)]*(outletLocation|coords|latitude)/.test(html), "no other request carries coordinates");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
