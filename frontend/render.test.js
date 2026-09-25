// Render smoke test for frontend/render.js: every screen is built on
// a tiny fake document (only the DOM calls render.js uses) with a few
// real-shaped products, and the text a shopper must see is asserted —
// so a broken screen fails here, not in the browser.
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

Object.assign(global, require("./pricing"), require("./app-logic"));
const { renderApp, renderSearchResults } = require("./render");

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
const oun = product("Õun Granny Smith kg", "Fruits & vegetables", { barbora: { price: 2.0 }, rimi: { price: 2.4 } });
const diapers = product("Pampers Premium Care Püksmähkmed S5 34tk", "Diapers & baby wipes", { barbora: { price: 13.79, size: "34tk" }, selver: { price: 23.88, size: "34tk" } });
const meat = product("Rakvere Seahakkliha", "Meat", { barbora: { price: 3.99, size: "400g", storeUnitPrice: 9.98 }, rimi: { price: 4.49, size: "500g", storeUnitPrice: 8.98 } }, { cheapestByUnitPrice: true });
const hidden = product("Hidden thing", "Dairy", { barbora: { price: 1 }, rimi: { price: 9 } }, { hidden: true });
const products = [piim, oun, diapers, meat, hidden];

function makeState(overrides) {
  return {
    products,
    searchIndex: buildSearchIndex(products),
    screen: "home",
    query: "",
    basket: {},
    updatedAt: "26 Sept 2026, 08:58",
    stale: false,
    ...overrides,
  };
}
const noop = () => {};
const actions = { openProduct: noop, openCategory: noop, goHome: noop, goto: noop, setQuery: noop, setQuantity: noop };

function render(state) {
  const root = new FakeNode("div");
  const nav = new FakeNode("nav");
  renderApp(root, nav, state, actions);
  return { root, nav, text: root.textContent, navText: nav.textContent };
}

const results = [
  test("Home: search bar, a tile per category (hidden products excluded), both sections with badges, the Updated line", () => {
    const { root, text, navText } = render(makeState({ screen: "home" }));
    assert.ok(root.find((n) => n.tagName === "input").length === 1, "one search input");
    for (const c of ["Dairy", "Fruits & vegetables", "Diapers & baby wipes", "Meat"]) assert.ok(text.includes(c), `tile: ${c}`);
    assert.ok(text.includes("Biggest price differences today"));
    assert.ok(text.includes("up to 42% cheaper"), "diapers 13.79 vs 23.88 -> 42%");
    assert.ok(text.includes("Cheaper than usual"));
    assert.ok(text.includes("-25% at Rimi"), "milk 1.50 vs regular 1.99 at Rimi");
    assert.ok(!text.includes("Hidden thing"));
    assert.ok(text.includes("Updated: 26 Sept 2026, 08:58"));
    assert.ok(navText.includes("Home") && navText.includes("Search") && navText.includes("Basket"));
  }),
  test("Home: the stale warning shows when the data is old, and the basket count shows in the nav", () => {
    const { text, navText } = render(makeState({ stale: true, basket: { [productKey(piim)]: 2, [productKey(oun)]: 1 } }));
    assert.ok(text.includes("data may be out of date"));
    assert.ok(navText.includes("Basket (3)"));
  }),
  test("Category: 2-column grid cards with image/icon, name, price range, gap badge, store count, Add to basket", () => {
    const { root, text } = render(makeState({ screen: "category", category: "Dairy" }));
    assert.ok(text.includes("Alma Piim 2.5% 1000ml"));
    assert.ok(text.includes("1.00 – 1.50 €"), "price range");
    assert.ok(text.includes("up to 33% cheaper"));
    assert.ok(text.includes("3 stores"));
    assert.ok(text.includes("Add to basket"));
    assert.ok(!text.includes("Hidden thing"));
    const imgs = root.find((n) => n.tagName === "img");
    assert.equal(imgs.length, 1, "the milk has a store photo (lazy), hidden products aren't rendered");
    assert.equal(imgs[0].loading, "lazy");
    assert.equal(imgs[0].src, "https://example.test/b.png");
  }),
  test("Product: image + caption, one row per store with coloured label, own name, View at store in a new tab, Best price on every tied store, +X € on others, unit price, card price line, Selver note", () => {
    const { root, text } = render(makeState({ screen: "product", product: piim }));
    assert.ok(text.includes("Image: Barbora"));
    assert.ok(text.includes("Piim ALMA 2,5% 1L") && text.includes("Piim Alma 2,5% 1l"), "each store's own listing name");
    const links = root.find((n) => n.tagName === "a");
    assert.equal(links.length, 3);
    assert.ok(links.every((a) => a.target === "_blank" && a.rel === "noopener noreferrer" && a.textContent.includes("View at store")));
    assert.equal((text.match(/Best price/g) || []).length, 2, "Barbora and Selver tie at 1.00");
    assert.ok(text.includes("+0.50 €"), "Rimi is 0.50 more");
    assert.ok(text.includes("1.00 €/l"), "unit price per litre as a small line");
    assert.ok(text.includes("1.20 € with Rimi card"), "card price only as a small extra line");
    assert.ok(text.includes("usually 1.99 €"));
    assert.ok(text.includes("Selver: availability not verified"));
    const labels = root.find((n) => /store-name/.test(n.className));
    assert.ok(labels.some((n) => n.className.includes("store-rimi")), "store label is a coloured text class, no logo");
  }),
  test("Product: a diaper shows €/tk, and a meat product leads with €/kg and marks Best price by unit price", () => {
    const d = render(makeState({ screen: "product", product: diapers })).text;
    assert.ok(d.includes("0.41 €/tk"), "13.79 / 34");
    assert.ok(!d.includes("/kg"));
    const m = render(makeState({ screen: "product", product: meat }));
    assert.ok(m.text.includes("8.98 €/kg"));
    const bestRows = m.root.find((n) => n.className === "store-row cheapest");
    assert.equal(bestRows.length, 1);
    assert.ok(bestRows[0].textContent.includes("Rimi"), "Rimi is cheaper per kg despite the higher pack price");
  }),
  test("Search results: 'oun' finds Õun; empty query shows the hint; a stepper replaces Add to basket once an item is in the basket", () => {
    const container = new FakeNode("div");
    renderSearchResults(container, makeState({ query: "oun" }), actions);
    assert.ok(container.textContent.includes("Õun Granny Smith kg"));
    renderSearchResults(container, makeState({ query: "" }), actions);
    assert.ok(container.textContent.includes("oun finds õun"));
    renderSearchResults(container, makeState({ query: "oun", basket: { [productKey(oun)]: 2 } }), actions);
    assert.ok(!container.textContent.includes("Add to basket"));
    assert.ok(container.find((n) => n.className === "qty-value").some((n) => n.textContent === "2"));
  }),
  test("Basket: lines with quantity, Compare basket with the complete store cheapest, a store missing items never cheapest, the split total and its saving; empty basket message", () => {
    const state = makeState({ screen: "basket", basket: { [productKey(piim)]: 2, [productKey(oun)]: 1 } });
    const { text } = render(state);
    assert.ok(text.includes("Alma Piim 2.5% 1000ml") && text.includes("Õun Granny Smith kg"));
    assert.ok(text.includes("Compare basket"));
    // barbora: 2×1.00 + 2.00 = 4.00 complete; rimi: 2×1.50 + 2.40 = 5.40 complete; selver: 2×1.00, missing the apple
    assert.ok(text.includes("4.00 €") && text.includes("5.40 €"));
    assert.ok(text.includes("missing: 1 item"));
    assert.equal((text.match(/Cheapest/g) || []).length, 1, "only Barbora, the cheapest complete store");
    assert.ok(text.includes("+1.40 €"));
    assert.ok(text.includes("Split across stores"));
    assert.ok(text.includes("4.00 €"), "split total equals the cheapest single store here");
    assert.ok(text.includes("card prices never count"));
    const empty = render(makeState({ screen: "basket", basket: {} })).text;
    assert.ok(empty.includes("Your basket is empty"));
  }),
  test("Actions: tapping a category tile opens that category; the quantity stepper calls setQuantity with the new number", () => {
    const calls = [];
    const spy = { ...actions, openCategory: (c) => calls.push(["cat", c]), setQuantity: (k, q) => calls.push(["qty", k, q]) };
    const root = new FakeNode("div");
    renderApp(root, new FakeNode("nav"), makeState({ screen: "home", basket: { [productKey(diapers)]: 1 } }), spy);
    root.find((n) => n.className === "tile" && n.textContent.includes("Dairy"))[0].click();
    const plus = root.find((n) => n.className === "qty-btn" && n.textContent === "+")[0];
    plus.click();
    assert.deepEqual(calls[0], ["cat", "Dairy"]);
    assert.deepEqual(calls[1], ["qty", productKey(diapers), 2]);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
