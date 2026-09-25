// Render smoke test for frontend/render.js: every screen is built on
// a tiny fake document (only the DOM calls render.js uses) with a few
// real-shaped products, and the text a shopper must see is asserted —
// so a broken screen fails here, not in the browser. The UI is
// Estonian by default; one test switches to English.
// Run with: node frontend/render.test.js
// or:       npm test

const assert = require("node:assert/strict");

// --- a minimal fake DOM ---
class FakeNode {
  constructor(tag) {
    this.tagName = tag;
    this.children = [];
    this.className = "";
    this.attributes = {};
    this.listeners = {};
    this._text = "";
  }
  appendChild(child) { this.children.push(child); return child; }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
  get textContent() { return this._text + this.children.map((c) => c.textContent).join(""); }
  set textContent(v) { this._text = String(v); this.children = []; }
  click() { for (const fn of this.listeners.click || []) fn(); }
  find(pred, out = []) { if (pred(this)) out.push(this); for (const c of this.children) c.find(pred, out); return out; }
}
global.document = {
  createElement: (tag) => new FakeNode(tag),
  createElementNS: (ns, tag) => new FakeNode(tag),
};
global.window = {};

Object.assign(global, require("./pricing"), require("./app-logic"), require("./catalog"), require("./i18n"));
const { renderApp, renderSearchResults, renderError } = require("./render");

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
  for (const [store, info] of Object.entries(prices)) shaped[store] = { currency: "EUR", url: `https://example.test/${store}/${name}`, ...info };
  return { name, category, prices: shaped, matchedVia: "automatic", ...extra };
}

const piim = product("Alma Piim 2.5% 1000ml", "Dairy", {
  barbora: { price: 1.0, size: "1000ml", storeName: "Piim ALMA 2,5% 1L", image: "https://example.test/b.png" },
  rimi: { price: 1.5, size: "1000ml", regularPrice: 1.99, cardPrice: 1.2, cardName: "Rimi", storeName: "Piim Alma 2,5% 1l" },
  selver: { price: 1.0, size: "1000ml", storeName: "Piim 2,5%, ALMA, 1 L" },
});
const voi = product("Tere Või 82% 200g", "Dairy", { barbora: { price: 2.0 }, rimi: { price: 2.2 } });
const oun = product("Õun Granny Smith kg", "Fruits & vegetables", { barbora: { price: 2.0 }, rimi: { price: 2.4 } });
const tomat = product("Tomat kg", "Fruits & vegetables", { barbora: { price: 3.0 }, selver: { price: 3.0 } });
const diapers = product("Pampers Premium Care Püksmähkmed S5 34tk", "Diapers & baby wipes", { barbora: { price: 13.79, size: "34tk" }, selver: { price: 23.88, size: "34tk" } });
const meat = product("Rakvere Seahakkliha", "Meat", { barbora: { price: 3.99, size: "400g", storeUnitPrice: 9.98 }, rimi: { price: 4.49, size: "500g", storeUnitPrice: 8.98 } }, { cheapestByUnitPrice: true });
const hidden = product("Hidden thing", "Dairy", { barbora: { price: 1 }, rimi: { price: 9 } }, { hidden: true });
const products = [piim, voi, oun, tomat, diapers, meat, hidden];

function makeState(overrides) {
  return {
    products,
    searchIndex: buildSearchIndex(products),
    screen: "home",
    query: "",
    basket: {},
    updatedAt: "26.09.2026, 08:58",
    stale: false,
    lang: "et",
    ...overrides,
  };
}
const noop = () => {};
const actions = { openProduct: noop, openCategory: noop, goHome: noop, goto: noop, setQuery: noop, setQuantity: noop, setLang: noop };

function render(state) {
  const root = new FakeNode("div");
  const nav = new FakeNode("nav");
  renderApp(root, nav, state, actions);
  return { root, nav, text: root.textContent, navText: nav.textContent };
}

const results = [
  test("Home (Estonian): search bar, Estonian tiles in shopping order with the F&V and Dairy splits and our own SVG icons, both sections with badges, the Updated line, the language switch", () => {
    const { root, text, navText } = render(makeState({ screen: "home" }));
    assert.ok(root.find((n) => n.tagName === "input").length === 1, "one search input");
    const tiles = root.find((n) => n.className === "tile").map((n) => n.textContent);
    assert.deepEqual(tiles, ["Puuviljad1", "Köögiviljad1", "Piim ja jogurt1", "Või1", "Liha1", "Lapsed1"], "name + count, shopping order, hidden product not counted");
    assert.ok(!text.includes("Dairy") && !text.includes("Fruits & vegetables"), "no English data-category names on screen");
    const tileIcons = root.find((n) => n.tagName === "svg" && n.attributes.class === "cat-icon");
    assert.equal(tileIcons.length, 6, "every tile has our own SVG icon");
    assert.ok(text.includes("Suurimad hinnavahed täna"));
    assert.ok(text.includes("kuni 42% odavam"), "diapers 13.79 vs 23.88 -> 42%");
    assert.ok(text.includes("Tavalisest odavam"));
    assert.ok(text.includes("-25% Rimi"), "milk 1.50 vs regular 1.99 at Rimi");
    assert.ok(!text.includes("Hidden thing"));
    assert.ok(text.includes("Uuendatud: 26.09.2026, 08:58"));
    assert.ok(text.includes("Keel:") && text.includes("ET") && text.includes("EN") && text.includes("RU"));
    assert.ok(navText.includes("Avaleht") && navText.includes("Otsing") && navText.includes("Korv"));
    assert.ok(root.find((n) => n.tagName === "input")[0].placeholder.startsWith("Otsi"));
  }),
  test("Language setting: the same screen in English and Russian, and an unknown language falls back to Estonian", () => {
    const en = render(makeState({ lang: "en" }));
    assert.ok(en.text.includes("Categories") && en.text.includes("Fruit") && en.text.includes("Vegetables") && en.text.includes("Milk & yoghurt") && en.text.includes("Butter"));
    assert.ok(en.text.includes("up to 42% cheaper") && en.text.includes("-25% at Rimi") && en.text.includes("Updated: 26.09.2026, 08:58"));
    assert.ok(en.navText.includes("Home") && en.navText.includes("Search") && en.navText.includes("Basket"));
    const ru = render(makeState({ lang: "ru" }));
    assert.ok(ru.text.includes("Категории") && ru.text.includes("Фрукты") && ru.navText.includes("Корзина"));
    const fallback = render(makeState({ lang: "xx" }));
    assert.ok(fallback.text.includes("Kategooriad"));
    const calls = [];
    const root = new FakeNode("div");
    renderApp(root, new FakeNode("nav"), makeState(), { ...actions, setLang: (l) => calls.push(l) });
    root.find((n) => n.className === "lang-btn" && n.textContent === "EN")[0].click();
    assert.deepEqual(calls, ["en"]);
  }),
  test("Home: the stale warning shows when the data is old, and the basket count shows in the nav", () => {
    const { text, navText } = render(makeState({ stale: true, basket: { [productKey(piim)]: 2, [productKey(oun)]: 1 } }));
    assert.ok(text.includes("andmed võivad olla vananenud"));
    assert.ok(navText.includes("Korv (3)"));
  }),
  test("Category (a display id): only that split's products, Estonian title, 2-column grid cards with image/icon, name, price range, gap badge, store count, Lisa korvi", () => {
    const { root, text } = render(makeState({ screen: "category", category: "piim-ja-jogurt" }));
    assert.ok(text.includes("Piim ja jogurt"));
    assert.ok(text.includes("Alma Piim 2.5% 1000ml"));
    assert.ok(!text.includes("Tere Või 82% 200g"), "butter is in Või, not in Piim ja jogurt");
    assert.ok(text.includes("1 toodet võrdluses"));
    assert.ok(text.includes("1.00 – 1.50 €"), "price range");
    assert.ok(text.includes("kuni 33% odavam"));
    assert.ok(text.includes("3 poodi"));
    assert.ok(text.includes("Lisa korvi"));
    assert.ok(!text.includes("Hidden thing"));
    const imgs = root.find((n) => n.tagName === "img");
    assert.equal(imgs.length, 1, "the milk has a store photo (lazy), hidden products aren't rendered");
    assert.equal(imgs[0].loading, "lazy");
    assert.equal(imgs[0].src, "https://example.test/b.png");
    const veg = render(makeState({ screen: "category", category: "koogiviljad" })).text;
    assert.ok(veg.includes("Köögiviljad") && veg.includes("Tomat kg") && !veg.includes("Õun Granny Smith kg"));
    const fruit = render(makeState({ screen: "category", category: "puuviljad" })).text;
    assert.ok(fruit.includes("Puuviljad") && fruit.includes("Õun Granny Smith kg") && !fruit.includes("Tomat kg"));
  }),
  test("Product: image + caption, back to its display category, one row per store with coloured label, own name, Vaata poes in a new tab, Parim hind on every tied store, +X € on others, unit price, card price line, Selver note", () => {
    const { root, text } = render(makeState({ screen: "product", product: piim }));
    assert.ok(text.includes("Pilt: Barbora"));
    assert.ok(text.includes("‹ Piim ja jogurt"), "back button names the display category");
    assert.ok(text.includes("Piim ALMA 2,5% 1L") && text.includes("Piim Alma 2,5% 1l"), "each store's own listing name");
    const links = root.find((n) => n.tagName === "a");
    assert.equal(links.length, 3);
    assert.ok(links.every((a) => a.target === "_blank" && a.rel === "noopener noreferrer" && a.textContent.includes("Vaata poes")));
    assert.equal((text.match(/Parim hind/g) || []).length, 2, "Barbora and Selver tie at 1.00");
    assert.ok(text.includes("+0.50 €"), "Rimi is 0.50 more");
    assert.ok(text.includes("1.00 €/l"), "unit price per litre as a small line");
    assert.ok(text.includes("1.20 € Rimi kaardiga"), "card price only as a small extra line");
    assert.ok(text.includes("tavahind 1.99 €"));
    assert.ok(text.includes("Selver: saadavus kontrollimata"));
    const labels = root.find((n) => /store-name/.test(n.className));
    assert.ok(labels.some((n) => n.className.includes("store-rimi")), "store label is a coloured text class, no logo");
    const calls = [];
    const r = new FakeNode("div");
    renderApp(r, new FakeNode("nav"), makeState({ screen: "product", product: voi }), { ...actions, openCategory: (c) => calls.push(c) });
    r.find((n) => n.className === "back")[0].click();
    assert.deepEqual(calls, ["voi"], "back from the butter opens the Või display category");
  }),
  test("Product: a diaper shows €/tk, and a meat product leads with €/kg and marks Parim hind by unit price", () => {
    const d = render(makeState({ screen: "product", product: diapers })).text;
    assert.ok(d.includes("0.41 €/tk"), "13.79 / 34");
    assert.ok(!d.includes("/kg"));
    const m = render(makeState({ screen: "product", product: meat }));
    assert.ok(m.text.includes("8.98 €/kg"));
    const bestRows = m.root.find((n) => n.className === "store-row cheapest");
    assert.equal(bestRows.length, 1);
    assert.ok(bestRows[0].textContent.includes("Rimi"), "Rimi is cheaper per kg despite the higher pack price");
  }),
  test("Search results: 'oun' finds Õun; empty query shows the hint; a stepper replaces Lisa korvi once an item is in the basket", () => {
    const container = new FakeNode("div");
    renderSearchResults(container, makeState({ query: "oun" }), actions);
    assert.ok(container.textContent.includes("Õun Granny Smith kg"));
    renderSearchResults(container, makeState({ query: "" }), actions);
    assert.ok(container.textContent.includes("oun leiab õuna"));
    renderSearchResults(container, makeState({ query: "zzzz" }), actions);
    assert.ok(container.textContent.includes("Midagi ei leitud: “zzzz”."));
    renderSearchResults(container, makeState({ query: "oun", basket: { [productKey(oun)]: 2 } }), actions);
    assert.ok(!container.textContent.includes("Lisa korvi"));
    assert.ok(container.find((n) => n.className === "qty-value").some((n) => n.textContent === "2"));
  }),
  test("Basket: lines with quantity, Võrdle korvi with the complete store cheapest, a store missing items never cheapest, the split total and its saving; empty basket message", () => {
    const state = makeState({ screen: "basket", basket: { [productKey(piim)]: 2, [productKey(oun)]: 1 } });
    const { text } = render(state);
    assert.ok(text.includes("Alma Piim 2.5% 1000ml") && text.includes("Õun Granny Smith kg"));
    assert.ok(text.includes("Võrdle korvi"));
    // barbora: 2×1.00 + 2.00 = 4.00 complete; rimi: 2×1.50 + 2.40 = 5.40 complete; selver: 2×1.00, missing the apple
    assert.ok(text.includes("4.00 €") && text.includes("5.40 €"));
    assert.ok(text.includes("puudu: 1 toode"));
    assert.equal((text.match(/Odavaim/g) || []).length, 1, "only Barbora, the cheapest complete store");
    assert.ok(text.includes("+1.40 €"));
    assert.ok(text.includes("Ostes igast poest odavaima"));
    assert.ok(text.includes("kliendikaardi hinnad ei lähe arvesse"));
    assert.ok(text.includes("Eemalda"));
    const empty = render(makeState({ screen: "basket", basket: {} })).text;
    assert.ok(empty.includes("Korv on tühi"));
  }),
  test("Actions: tapping a tile opens that display category by id; the quantity stepper calls setQuantity with the new number; the error screen is in the chosen language", () => {
    const calls = [];
    const spy = { ...actions, openCategory: (c) => calls.push(["cat", c]), setQuantity: (k, q) => calls.push(["qty", k, q]) };
    const root = new FakeNode("div");
    renderApp(root, new FakeNode("nav"), makeState({ screen: "home", basket: { [productKey(diapers)]: 1 } }), spy);
    root.find((n) => n.className === "tile" && n.textContent.includes("Köögiviljad"))[0].click();
    const plus = root.find((n) => n.className === "qty-btn" && n.textContent === "+")[0];
    plus.click();
    assert.deepEqual(calls[0], ["cat", "koogiviljad"]);
    assert.deepEqual(calls[1], ["qty", productKey(diapers), 2]);
    const err = new FakeNode("div");
    renderError(err, makeState({ lang: "et" }));
    assert.ok(err.textContent.includes("Hinnaandmeid veel pole"));
    renderError(err, makeState({ lang: "en" }));
    assert.ok(err.textContent.includes("No price data yet"));
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
