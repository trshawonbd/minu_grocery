// Regression tests for scraper/scrape-output.js — the pieces that
// shape data/prices.json entries — plus one check on the data itself:
// no two products in a category may share a displayed name (the
// owner's rule). Real duplicates found on the product screen: five
// diaper groups whose names had collapsed to "Pampers Püksmähkmed"
// and the like, and three Kalev dark chocolates (56/70/87%) all
// reading "Kalev Tume bitter šokolaad 100g".
// Run with: node scraper/scrape-output.test.js
// or:       npm test

const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { uniqueCanonicalNames, toStoreEntry } = require("./scrape-output");
const { buildItem } = require("./categories");
const { computeSignature } = require("./match-products");

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

function match(canonicalName, ...names) {
  return { canonicalName, reason: "automatic", items: names.map((n, i) => ({ store: ["Barbora", "Rimi", "Selver"][i], name: n, url: `u${i}` })) };
}

const results = [
  test("carryOverImages: a rebuilt entry without a store photo takes the one the previous data/prices.json had for the same URL; an entry that already has one, or whose URL had none, is untouched", () => {
    const { carryOverImages } = require("./scrape-output");
    const previous = [
      { name: "Old", category: "Bread", prices: { barbora: { price: 1, url: "b1", image: "https://b/1.jpg" }, selver: { price: 1, url: "s1" } } },
    ];
    const rebuilt = [
      { name: "New", category: "Bread", prices: { barbora: { price: 1.1, url: "b1" }, selver: { price: 1.2, url: "s1" }, coop: { price: 1, url: "c1", image: "https://c/1.jpg" } } },
      { name: "Other", category: "Bread", prices: { barbora: { price: 2, url: "b2" }, rimi: { price: 2, url: "r2" } } },
    ];
    assert.equal(carryOverImages(rebuilt, previous), 1);
    assert.equal(rebuilt[0].prices.barbora.image, "https://b/1.jpg");
    assert.equal(rebuilt[0].prices.selver.image, undefined);
    assert.equal(rebuilt[0].prices.coop.image, "https://c/1.jpg");
    assert.equal(rebuilt[1].prices.barbora.image, undefined);
    assert.equal(rebuilt[0].prices.barbora.price, 1.1, "nothing but the image is touched");
  }),
  test("inferBrands: a brand-less item takes a brand another store states in the pool (whole word, any case, longest first); an item naming no stated brand keeps none; stated brands are never overwritten", () => {
    const { inferBrands } = require("./scrape-output");
    const pool = [
      { store: "Barbora", name: "Piim ALMA 2,5% 1L", brand: "ALMA" },
      { store: "Rimi", name: "Jogurt maasika Alma 380g", brand: "Alma" },
      { store: "Selver", name: "Kohuke, MO SAAREMAA, 40 g", brand: "MO Saaremaa" },
      { store: "Coop", name: "Jogurt maasika Alma 380g", brand: null },
      { store: "Coop", name: "Kohuke vanilli Mo Saaremaa 40g", brand: null },
      { store: "Coop", name: "Kohuke Almaks 40g", brand: null },
      { store: "Coop", name: "Haapsalu lihapirukas kg", brand: null },
    ];
    assert.equal(inferBrands(pool), 2);
    assert.equal(pool[3].brand, "ALMA");
    assert.equal(pool[4].brand, "MO Saaremaa", "a two-word brand, matched across the space");
    assert.equal(pool[5].brand, null, "'Almaks' is not the word 'Alma'");
    assert.equal(pool[6].brand, null);
    assert.equal(pool[0].brand, "ALMA", "stated brands untouched");
  }),
  test("uniqueCanonicalNames: a duplicate group is told apart by a raw-name word only one member has; unique names are untouched", () => {
    const out = uniqueCanonicalNames([
      match("Kalev Tume šokolaad 100g", "Tume šokolaad bitter KALEV 100g", "Tume šokolaad Bitter, KALEV, 100 g"),
      match("Kalev Tume šokolaad 100g", "Tume šokolaad apelsiniga KALEV 100g", "Tume šokolaad apelsiniga, KALEV, 100 g"),
      match("Alma Piim 1000ml", "Piim ALMA 1L", "Piim Alma 1l"),
    ]);
    assert.equal(out[0].canonicalName, "Kalev Tume šokolaad 100g bitter");
    assert.equal(out[1].canonicalName, "Kalev Tume šokolaad 100g apelsiniga");
    assert.equal(out[2].canonicalName, "Alma Piim 1000ml");
    assert.equal(new Set(out.map((m) => m.canonicalName)).size, 3);
  }),
  test("uniqueCanonicalNames: when no raw word tells the members apart, a visible ' (2)' suffix keeps names unique rather than a silent collision", () => {
    const out = uniqueCanonicalNames([
      match("X 100g", "X KALEV 100g", "X, KALEV, 100 g"),
      match("X 100g", "X KALEV 100g", "X, KALEV, 100 g"),
    ]);
    assert.deepEqual(out.map((m) => m.canonicalName), ["X 100g", "X 100g (2)"]);
  }),
  test("toStoreEntry: a diaper's stored size is its piece count ('96tk'), never the baby's weight range as grams", () => {
    const item = buildItem("Diapers & baby wipes", "Barbora", "Püksmähkmed PAMPERS MP S5 12-17kg 96tk", { brand: "pampers", price: 24.33 });
    item.signature = computeSignature(item);
    assert.equal(toStoreEntry(item).size, "96tk");
  }),
  test("data/prices.json: no two products in a category share a displayed name, and no diaper carries a weight-based size or a gram figure in its name", () => {
    const prices = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "prices.json"), "utf8"));
    const seen = new Map();
    for (const p of prices) {
      const key = `${p.category}\u0000${p.name}`;
      seen.set(key, (seen.get(key) || 0) + 1);
    }
    const duplicates = [...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k.replace("\u0000", " :: "));
    assert.deepEqual(duplicates, [], `duplicate displayed names: ${duplicates.join("; ")}`);

    for (const p of prices.filter((x) => x.category === "Diapers & baby wipes")) {
      assert.ok(!/\d+\s?g\b|kg/i.test(p.name), `weight in a diaper name: ${p.name}`);
      for (const [store, entry] of Object.entries(p.prices)) {
        assert.ok(entry.size === undefined || /^\d+tk$/.test(entry.size), `${store} size "${entry.size}" on ${p.name} is not a piece count`);
      }
    }
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
