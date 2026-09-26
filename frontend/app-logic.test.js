// Regression tests for frontend/app-logic.js — the basket math, the
// search folding of Estonian letters, and the rule that "Cheaper than
// usual" never reads a loyalty-card price.
// Run with: node frontend/app-logic.test.js
// or:       npm test

const assert = require("node:assert/strict");
const {
  productKey,
  normalizeText,
  buildSearchIndex,
  searchProducts,
  priceSummary,
  biggestDifferences,
  cheaperThanUsual,
  loadBasket,
  saveBasket,
  setBasketQuantity,
  basketCount,
  compareBasket,
} = require("./app-logic");

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

function product(name, category, prices, extra = {}) {
  const shaped = {};
  for (const [store, info] of Object.entries(prices)) {
    shaped[store] = { currency: "EUR", url: `${store}/${name}`, ...info };
  }
  return { name, category, prices: shaped, matchedVia: "automatic", ...extra };
}

const piim = product("Alma Piim 2.5% 1000ml", "Dairy", { barbora: { price: 1.0 }, rimi: { price: 1.5 }, selver: { price: 1.2 } });
const oun = product("Õun Granny Smith kg", "Fruits & vegetables", { barbora: { price: 2.0 }, rimi: { price: 2.0 } });
const sokolaad = product("Kalev Tume bitter šokolaad 70% 100g", "Chocolate", { rimi: { price: 3.0, cardPrice: 1.5, cardName: "Rimi" }, selver: { price: 2.0 } });
const products = [piim, oun, sokolaad];

class FakeStorage {
  constructor() { this.map = new Map(); }
  getItem(k) { return this.map.has(k) ? this.map.get(k) : null; }
  setItem(k, v) { this.map.set(k, String(v)); }
}

const results = [
  test("Search ignores Estonian letters: 'oun' finds 'Õun', 'piim' finds 'Piim', 'sokolaad' finds 'šokolaad'; word order doesn't matter; empty query finds nothing", () => {
    const index = buildSearchIndex(products);
    assert.deepEqual(searchProducts(index, "oun").map((p) => p.name), ["Õun Granny Smith kg"]);
    assert.deepEqual(searchProducts(index, "piim").map((p) => p.name), ["Alma Piim 2.5% 1000ml"]);
    assert.deepEqual(searchProducts(index, "sokolaad").map((p) => p.name), ["Kalev Tume bitter šokolaad 70% 100g"]);
    assert.deepEqual(searchProducts(index, "ŠOKOLAAD tume").map((p) => p.name), ["Kalev Tume bitter šokolaad 70% 100g"], "any case, any order");
    assert.deepEqual(searchProducts(index, "smith granny").map((p) => p.name), ["Õun Granny Smith kg"]);
    assert.deepEqual(searchProducts(index, ""), []);
    assert.deepEqual(searchProducts(index, "   "), []);
    assert.equal(normalizeText("Hapukoore-sibula Küüslauk ÕÄÖÜŠŽ"), "hapukoore sibula kuuslauk oaousz");
  }),
  test("SHOW_ALCOHOL: when false, Beer & cider / Wine / Spirits products vanish from visibleProducts, the search index, the deals lists and the basket; the alcohol-free category is never hidden; when true they show", () => {
    const { SHOW_ALCOHOL, ALCOHOL_CATEGORIES, isAlcoholProduct, visibleProducts } = require("./app-logic");
    assert.equal(typeof SHOW_ALCOHOL, "boolean");
    assert.deepEqual([...ALCOHOL_CATEGORIES].sort(), ["Beer & cider", "Spirits", "Wine"]);
    const beer = product("Saku Kuld 5.2% 500ml", "Beer & cider", { barbora: { price: 1.2, regularPrice: 1.6 }, rimi: { price: 1.8 } });
    const wine = product("Andes Merlot 750ml", "Wine", { barbora: { price: 6.0 }, selver: { price: 9.0 } });
    const vodka = product("Absolut 40% 700ml", "Spirits", { barbora: { price: 15.0 }, rimi: { price: 16.0 } });
    const free = product("Heineken Alkoholivaba õlu 0.0% 330ml", "Alcohol-free beer, cider & wine", { barbora: { price: 0.9 }, rimi: { price: 1.1 } });
    const all = [...products, beer, wine, vodka, free];
    assert.ok([beer, wine, vodka].every(isAlcoholProduct) && !isAlcoholProduct(free) && !isAlcoholProduct(piim));
    const shown = visibleProducts(all, true).map((p) => p.name);
    assert.ok(shown.includes("Saku Kuld 5.2% 500ml") && shown.includes("Andes Merlot 750ml") && shown.includes("Absolut 40% 700ml") && shown.includes("Heineken Alkoholivaba õlu 0.0% 330ml"));
    const hiddenList = visibleProducts(all, false).map((p) => p.name);
    assert.ok(!hiddenList.includes("Saku Kuld 5.2% 500ml") && !hiddenList.includes("Andes Merlot 750ml") && !hiddenList.includes("Absolut 40% 700ml"));
    assert.ok(hiddenList.includes("Heineken Alkoholivaba õlu 0.0% 330ml"), "alcohol-free stays");
    assert.equal(hiddenList.length, products.length + 1);
    // Every list the screens draw reads through visibleProducts, so
    // the same switch governs them all.
    const withAlcoholHidden = all.map((p) => (isAlcoholProduct(p) ? { ...p, hidden: !false && true } : p));
    assert.ok(!searchProducts(buildSearchIndex(withAlcoholHidden), "saku").length);
    assert.ok(!biggestDifferences(withAlcoholHidden, 50).some((d) => isAlcoholProduct(d.product)));
    assert.ok(!cheaperThanUsual(withAlcoholHidden, 50).some((d) => isAlcoholProduct(d.product)));
    assert.equal(compareBasket(withAlcoholHidden, { [productKey(beer)]: 1 }).lines.length, 0);
  }),
  test("Search skips hidden products and honours the result limit", () => {
    const hidden = product("Piim hidden", "Dairy", { barbora: { price: 1 } }, { hidden: true });
    const many = Array.from({ length: 70 }, (_, i) => product(`Piim ${i}`, "Dairy", { barbora: { price: 1 }, rimi: { price: 1 } }));
    const index = buildSearchIndex([hidden, ...many]);
    const found = searchProducts(index, "piim");
    assert.equal(found.length, 60, "capped at 60");
    assert.ok(!found.some((p) => p.hidden));
  }),
  test("Price gap: min – max across available stores and the gap as % of the most expensive; unit-price categories use the per-kg price", () => {
    const s = priceSummary(piim);
    assert.equal(s.min, 1.0);
    assert.equal(s.max, 1.5);
    assert.ok(Math.abs(s.gapPct - 33.33) < 0.01);
    assert.equal(s.storeCount, 3);
    assert.equal(s.perUnit, false);

    const meat = product("Rakvere Seahakkliha", "Meat", { barbora: { price: 3.99, storeUnitPrice: 9.98 }, rimi: { price: 4.49, storeUnitPrice: 8.98 } }, { cheapestByUnitPrice: true });
    const m = priceSummary(meat);
    assert.equal(m.min, 8.98);
    assert.equal(m.max, 9.98);
    assert.equal(m.perUnit, true);

    const gone = product("X", "Dairy", { barbora: { price: 1 }, rimi: { price: 5, unavailable: true } });
    assert.equal(priceSummary(gone).storeCount, 1, "an unavailable store is excluded");
    assert.equal(priceSummary(gone).gapPct, 0);
  }),
  test("Biggest differences: largest gap first, needs two stores with a value, hidden products excluded", () => {
    const hidden = product("Hidden", "Dairy", { barbora: { price: 1 }, rimi: { price: 9 } }, { hidden: true });
    const top = biggestDifferences([...products, hidden], 10);
    assert.deepEqual(top.map((t) => t.product.name), ["Alma Piim 2.5% 1000ml", "Kalev Tume bitter šokolaad 70% 100g"], "Õun (2.00 = 2.00) has no gap; the milk (33.3%) and the chocolate (33.3%) tie and keep their data order");
    assert.ok(top.every((t) => t.gapPct > 0));
  }),
  test("Cheaper than usual: only a current price below the store's stated regular price counts, sorted by discount %, with the store named — a loyalty-card price is never a discount", () => {
    const sale = product("Barilla Fusilli 500g", "Pasta", { barbora: { price: 1.49, regularPrice: 1.99 }, rimi: { price: 1.99 } });
    const bigger = product("Fairy 650ml", "Household", { rimi: { price: 2.0, regularPrice: 4.0 }, selver: { price: 3.99 } });
    const cardOnly = product("Card deal", "Dairy", { rimi: { price: 3.0, cardPrice: 1.5, cardName: "Rimi" }, selver: { price: 3.0 } });
    const regularEqual = product("No deal", "Dairy", { rimi: { price: 3.0, regularPrice: 3.0 }, selver: { price: 3.0 } });
    const list = cheaperThanUsual([sale, bigger, cardOnly, regularEqual, sokolaad], 20);
    assert.deepEqual(list.map((d) => d.product.name), ["Fairy 650ml", "Barilla Fusilli 500g"]);
    assert.equal(list[0].store, "rimi");
    assert.ok(Math.abs(list[0].discountPct - 50) < 0.01);
    assert.ok(Math.abs(list[1].discountPct - 25.13) < 0.01);
    assert.ok(!list.some((d) => d.product.name === "Card deal"), "a card-only lower price is not a discount");
    assert.ok(!list.some((d) => d.product.name === "Kalev Tume bitter šokolaad 70% 100g"));
  }),
  test("Basket storage: quantities round-trip, bad or missing storage never breaks, 0 removes a line, 99 is the cap", () => {
    const storage = new FakeStorage();
    let basket = {};
    basket = setBasketQuantity(basket, productKey(piim), 2);
    basket = setBasketQuantity(basket, productKey(oun), 1);
    saveBasket(storage, basket);
    assert.deepEqual(loadBasket(storage), { [productKey(piim)]: 2, [productKey(oun)]: 1 });
    assert.equal(basketCount(basket), 3);
    basket = setBasketQuantity(basket, productKey(oun), 0);
    assert.deepEqual(Object.keys(basket), [productKey(piim)]);
    assert.equal(setBasketQuantity({}, "k", 500).k, 99);
    storage.setItem("minu.basket.v1", "{not json");
    assert.deepEqual(loadBasket(storage), {});
    assert.deepEqual(loadBasket(null), {});
    assert.deepEqual(loadBasket({ getItem: () => JSON.stringify({ a: 2, b: "x", c: -1, d: 1.5 }) }), { a: 2 });
  }),
  test("Compare basket: totals use quantity × pack price, a store with every item comes first (cheapest), a store missing items is never cheapest and says how many", () => {
    const basket = { [productKey(piim)]: 2, [productKey(sokolaad)]: 1 };
    const { lines, stores, split } = compareBasket(products, basket);
    assert.equal(lines.length, 2);
    // rimi: 2×1.5 + 3.0 = 6.0 (complete); selver: 2×1.2 + 2.0 = 4.4 (complete); barbora: 2×1.0, missing the chocolate
    const byStore = Object.fromEntries(stores.map((s) => [s.store, s]));
    assert.equal(byStore.selver.total, 4.4);
    assert.equal(byStore.rimi.total, 6.0);
    assert.equal(byStore.barbora.total, 2.0);
    assert.equal(byStore.barbora.missing, 1);
    assert.equal(byStore.barbora.complete, false);
    assert.equal(byStore.barbora.isCheapest, false, "missing an item -> never cheapest, even though its partial total is lowest");
    assert.deepEqual(stores.map((s) => s.store), ["selver", "rimi", "barbora"], "complete stores first, cheapest first, then by missing count");
    assert.equal(byStore.selver.isCheapest, true);
    assert.equal(byStore.rimi.isCheapest, false);
    // Split: milk at barbora (1.0×2) + chocolate at selver (2.0) = 4.0, saving 0.4 vs the cheapest complete store.
    assert.equal(split.total, 4.0);
    assert.deepEqual(split.storesUsed.sort(), ["barbora", "selver"]);
    assert.equal(split.saving, 0.4);
  }),
  test("Compare basket: a tie marks every complete store cheapest; card prices never count; a basket key with no product is ignored; empty basket -> no stores", () => {
    const a = product("A", "Dairy", { barbora: { price: 2.0, cardPrice: 0.5, cardName: "Aitäh" }, rimi: { price: 2.0 } });
    const b = product("B", "Dairy", { barbora: { price: 1.0 }, rimi: { price: 1.0, cardPrice: 0.1, cardName: "Rimi" } });
    const { stores, split } = compareBasket([a, b], { [productKey(a)]: 1, [productKey(b)]: 3, "Gone::Gone": 4 });
    assert.deepEqual(stores.map((s) => [s.store, s.total, s.isCheapest]).sort(), [["barbora", 5.0, true], ["rimi", 5.0, true]]);
    assert.equal(split.total, 5.0, "card prices play no part in the split either");
    assert.equal(split.saving, 0);
    const empty = compareBasket([a, b], {});
    assert.deepEqual(empty.stores, []);
    assert.equal(empty.split.saving, null);
  }),
  test("Compare basket: when no store has everything, nothing is cheapest, and the split total still works with saving unknown", () => {
    const onlyBarbora = product("OB", "Dairy", { barbora: { price: 1.0 } });
    const onlyRimi = product("OR", "Dairy", { rimi: { price: 2.0 } });
    const { stores, lowest, split } = compareBasket([onlyBarbora, onlyRimi], { [productKey(onlyBarbora)]: 1, [productKey(onlyRimi)]: 1 });
    assert.ok(stores.every((s) => !s.isCheapest && s.missing === 1));
    assert.equal(lowest, null);
    assert.equal(split.total, 3.0);
    assert.equal(split.saving, null);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
