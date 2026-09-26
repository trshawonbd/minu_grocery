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

Object.assign(global, require("./pricing"), require("./app-logic"), require("./catalog"), require("./i18n"), require("./outlets-logic"));
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
const fourStore = product("Tere Kohuke vanilli 40g", "Curd snacks & desserts", {
  barbora: { price: 0.55, size: "40g" }, rimi: { price: 0.59, size: "40g" }, selver: { price: 0.6, size: "40g", ean: "4740012345670" }, coop: { price: 0.49, size: "40g", ean: "4740012345670", storeName: "Kohuke vanilli Tere 40g" },
});
const products = [piim, voi, oun, tomat, diapers, meat, hidden, fourStore];

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
    outletMalls: [],
    outletBrands: [],
    outletMallId: null,
    outletShopName: null,
    outletLocation: null,
    outletRadius: 10,
    outletLocationStatus: null,
    ...overrides,
  };
}
const noop = () => {};
const actions = { openProduct: noop, openCategory: noop, goHome: noop, goto: noop, setQuery: noop, setQuantity: noop, setLang: noop, openOutletMall: noop, openOutletShop: noop, setOutletFilter: noop, useMyLocation: noop, searchAddress: noop, clearLocation: noop, setRadius: noop };

function render(state, customActions) {
  const root = new FakeNode("div");
  const nav = new FakeNode("nav");
  renderApp(root, nav, state, customActions || actions);
  return { root, nav, text: root.textContent, navText: nav.textContent };
}

const OUTLET_MALLS = [
  {
    id: "ulemiste",
    name: "Ülemiste",
    address: "Suur-Sõjamäe tn 4, 11415 Tallinn",
    lat: 59.421955,
    lon: 24.794377,
    shops: [
      { name: "Denim Dream", category: "Mood ja aksessuaarid", floor: "1" },
      { name: "Apollo", category: "Vaba aeg", floor: "2" },
    ],
  },
  { id: "viru", name: "Viru Keskus", address: "Viru väljak 4/6, 10111 Tallinn", lat: 59.436198, lon: 24.75525, shops: [{ name: "R-Kiosk", category: null, floor: null }] },
  { id: "lounakeskus", name: "Lõunakeskus", address: "Lääneringtee 39, Tartu", lat: 58.357883, lon: 26.677576, shops: [{ name: "Denim Dream", category: null, floor: "1" }, { name: "Denim Dream 2", category: null, floor: "2" }] },
];
const OUTLET_BRANDS = [
  {
    brand: "Denim Dream",
    scrapedAt: "2026-09-26T10:00:00.000Z",
    catalogueCount: 5575,
    items: [
      { id: "1", brand: "Calvin Klein", name: "Teksaseelik 90S MINI", section: "Naised", type: "Seelikud", regularPrice: 99.9, salePrice: 69.9, discountPercent: 30, status: "new", refPrice: 79.9, newPercent: 13, link: "https://www.denimdream.com/EE/et/toode/1", image: "https://pic.denimdream.com/1.jpg", fresh: false, position: 2, firstSeen: "2026-09-20" },
      { id: "2", brand: "Levi's", name: "Teksad 501", section: "Mehed", type: "Teksad", regularPrice: 90, salePrice: 45, discountPercent: 50, status: "permanent", refPrice: 45, newPercent: null, link: "https://www.denimdream.com/EE/et/toode/2", image: null, fresh: true, position: 1, firstSeen: "2026-09-26" },
    ],
  },
];

const results = [
  test("Home (Estonian): search bar, ONE round-icon group row (2026-09-26 redesign) in shopping order — several display categories folded into each group — with our own SVG icons, both deal sections with badges, the Updated line, the language switch", () => {
    const { root, text, navText } = render(makeState({ screen: "home" }));
    assert.ok(root.find((n) => n.tagName === "input").length === 1, "one search input");
    // 7 products land in 7 display categories, but only 4 GROUPS (a
    // group-row item's text is its name + its live count, e.g. Dairy's
    // two products and Curd snacks' one all fold into "Piimatooted ja
    // munad3", not three separate tiles).
    const groups = root.find((n) => n.className === "group-item").map((n) => n.textContent);
    assert.deepEqual(groups, ["Puu- ja köögiviljad2", "Piimatooted ja munad3", "Liha ja kala1", "Lapsed1"], "name + count, shopping order, hidden product not counted, only groups with products");
    assert.ok(!text.includes("Dairy") && !text.includes("Fruits & vegetables"), "no English data-category names on screen");
    assert.ok(!root.find((n) => n.className === "tiles" || n.className === "tile").length, "the old full-page category grid is gone");
    const groupIcons = root.find((n) => n.tagName === "svg" && n.attributes.class === "cat-icon group-icon-svg");
    assert.equal(groupIcons.length, 4, "every group has our own SVG icon");
    // The group row must come right after the search bar, with no
    // heading eating space above it, so the deal sections below stay
    // visible on a phone without scrolling.
    const topLevelClasses = root.children.map((n) => n.className);
    const searchbarIndex = topLevelClasses.findIndex((c) => c === "searchbar");
    const groupRowIndex = topLevelClasses.indexOf("group-row");
    assert.ok(groupRowIndex === searchbarIndex + 1, "the group row is the very next thing after the search bar");
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
    assert.ok(en.text.includes("Fruit & vegetables") && en.text.includes("Dairy & eggs") && en.text.includes("Meat & fish") && en.text.includes("Baby & children"), "group names, English");
    assert.ok(en.text.includes("up to 42% cheaper") && en.text.includes("-25% at Rimi") && en.text.includes("Updated: 26.09.2026, 08:58"));
    assert.ok(en.navText.includes("Home") && en.navText.includes("Search") && en.navText.includes("Basket"));
    const ru = render(makeState({ lang: "ru" }));
    assert.ok(ru.text.includes("Фрукты и овощи") && ru.navText.includes("Корзина"), "group names, Russian");
    const fallback = render(makeState({ lang: "xx" }));
    assert.ok(fallback.text.includes("Puu- ja köögiviljad"), "an unknown language falls back to Estonian");
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
  test("Outletid: its own nav tab between Search and Basket, no grocery data on any outlets screen", () => {
    const root = new FakeNode("div");
    const nav = new FakeNode("nav");
    renderApp(root, nav, makeState({ screen: "outlets" }), actions);
    const labels = nav.children.map((n) => n.children[1].textContent);
    assert.deepEqual(labels, ["Avaleht", "Otsing", "Outletid", "Korv"], "Outletid sits between Search and Basket");
    assert.equal(nav.find((n) => n.className.includes("active"))[0].children[1].textContent, "Outletid");
    assert.ok(root.textContent.includes("Outletid"));
    assert.ok(!root.textContent.includes("Alma Piim") && !root.textContent.includes("Tere Või"), "no grocery product on the outlets screen");
  }),
  test("Outletid mall list (no location): every mall as before — name, address, shop count (a chain listed twice counted once), what its shops offer — no distance, the location block offering 'Kasuta minu asukohta' and an address search with the never-stored hint; tapping a mall opens it", () => {
    const calls = [];
    const { root, text } = render(makeState({ screen: "outlets", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS }), { ...actions, openOutletMall: (id) => calls.push(id) });
    assert.ok(text.includes("Ülemiste") && text.includes("Suur-Sõjamäe tn 4, 11415 Tallinn") && text.includes("2 kauplust"));
    assert.ok(text.includes("Viru Keskus") && text.includes("1 kauplus"));
    assert.ok(text.includes("Lõunakeskus") && text.includes("1 kauplus"), "'Denim Dream' + 'Denim Dream 2' count once");
    assert.equal(root.find((n) => n.className === "store-row").length, 3, "all malls, no location");
    assert.equal(root.find((n) => n.className === "store-price mall-distance").length, 0, "no distance without a location");
    assert.ok(text.includes("1 kauplus allahindlustega") && text.includes("Denim Dream 2 toodet"), "the mall row says what its shops offer");
    assert.ok(text.includes("Allahindlusandmeid pole veel"), "Viru has no shop with data");
    assert.ok(text.includes("Kasuta minu asukohta") && text.includes("Otsi") && text.includes("ei salvestata ega saadeta"));
    assert.equal(root.find((n) => n.tagName === "input").length, 1, "the address field");
    assert.equal(root.find((n) => n.className === "tab-row outlet-radius").length, 0, "no radius chips before a location");
    root.find((n) => n.className === "store-row" && n.textContent.includes("Ülemiste"))[0].click();
    assert.deepEqual(calls, ["ulemiste"]);
  }),
  test("Outletid mall list with a location: nearest first with a distance ('2.7 km'), the 10 km default keeps Tallinn's malls and drops Tartu, 'Kõik' brings it back, the chips call setRadius, 'Eemalda' clears; the location's label shows, the address field is gone", () => {
    const calls = [];
    const viru = { lat: 59.436198, lon: 24.75525, label: "Viru väljak 4, Kesklinna linnaosa, Tallinn" };
    const state = makeState({ screen: "outlets", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS, outletLocation: viru, outletRadius: 10 });
    const { root, text } = render(state, { ...actions, setRadius: (km) => calls.push(["radius", km]), clearLocation: () => calls.push(["clear"]) });
    const rows = root.find((n) => n.className === "store-row").map((n) => n.textContent);
    assert.equal(rows.length, 2, "Lõunakeskus (163 km) is outside 10 km");
    assert.ok(rows[0].includes("Viru Keskus") && rows[0].includes("0.0 km"), "nearest first");
    assert.ok(rows[1].includes("Ülemiste") && rows[1].includes("2.7 km"));
    assert.ok(text.includes("Viru väljak 4, Kesklinna linnaosa, Tallinn") && text.includes("Eemalda"));
    assert.equal(root.find((n) => n.tagName === "input").length, 0, "no address field once located");
    const chips = root.find((n) => n.className === "tab-row outlet-radius")[0].children.map((c) => c.textContent);
    assert.deepEqual(chips, ["5 km", "8 km", "10 km", "Kõik"]);
    assert.equal(root.find((n) => n.className === "tab active")[0].textContent, "10 km");
    root.find((n) => n.className === "tab" && n.textContent === "5 km")[0].click();
    root.find((n) => n.className === "loc-clear")[0].click();
    assert.deepEqual(calls, [["radius", 5], ["clear"]]);
    const all = render(makeState({ ...state, outletRadius: null }));
    assert.equal(all.root.find((n) => n.className === "store-row").length, 3, "Kõik shows every mall");
    assert.ok(all.text.includes("163 km"));
    const tight = render(makeState({ ...state, outletRadius: 5, outletLocation: { lat: 58.0, lon: 26.0, label: "Somewhere" } }));
    assert.ok(tight.text.includes("Selles raadiuses pole ühtegi keskust"));
  }),
  test("Outletid location block: 'Kasuta minu asukohta' calls useMyLocation; typing an address and pressing Otsi (or Enter) calls searchAddress with the text; the locating/failed/not-found notes show", () => {
    const calls = [];
    const { root } = render(makeState({ screen: "outlets", outletMalls: OUTLET_MALLS }), { ...actions, useMyLocation: () => calls.push("geo"), searchAddress: (q) => calls.push(q) });
    root.find((n) => n.className === "btn-add loc-use")[0].click();
    const input = root.find((n) => n.tagName === "input")[0];
    input.value = "Viru väljak 4";
    root.find((n) => n.className === "loc-search")[0].click();
    for (const fn of input.listeners.keydown) fn({ key: "Enter" });
    assert.deepEqual(calls, ["geo", "Viru väljak 4", "Viru väljak 4"]);
    assert.ok(render(makeState({ screen: "outlets", outletMalls: OUTLET_MALLS, outletLocationStatus: "locating" })).text.includes("Otsin asukohta"));
    assert.ok(render(makeState({ screen: "outlets", outletMalls: OUTLET_MALLS, outletLocationStatus: "failed" })).text.includes("Asukohta ei saadud"));
    assert.ok(render(makeState({ screen: "outlets", outletMalls: OUTLET_MALLS, outletLocationStatus: "notFound" })).text.includes("Aadressi ei leitud"));
  }),
  test("Outletid mall screen: a shop matching a brand file shows 'kuni -X%, N toodet' and opens the discounted items; a shop with no match shows plainly, not clickable", () => {
    const calls = [];
    const state = makeState({ screen: "outletMall", outletMallId: "ulemiste", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS });
    const { root, text } = render(state, { ...actions, openOutletShop: (mallId, shopName) => calls.push([mallId, shopName]) });
    assert.ok(text.includes("Ülemiste") && text.includes("Suur-Sõjamäe tn 4, 11415 Tallinn"));
    assert.ok(text.includes("Denim Dream") && text.includes("1 uut allahindlust"), "only the NEW discount is counted — never the permanent -50%");
    assert.ok(!text.includes("-50%") && !text.includes("kuni"), "no big % on a mall row");
    assert.ok(text.includes("Apollo") && text.includes("Vaba aeg"));
    const denimRow = root.find((n) => n.tagName === "button" && n.className === "store-row" && n.textContent.includes("Denim Dream"))[0];
    denimRow.click();
    assert.deepEqual(calls, [["ulemiste", "Denim Dream"]]);
    const apolloRow = root.find((n) => n.className === "store-row" && n.textContent.includes("Apollo"))[0];
    assert.notEqual(apolloRow.tagName, "button", "a shop with no discount data is not a button — nothing to open");
    const order = root.find((n) => n.className === "store-row").map((n) => n.children[0].children[0].textContent);
    assert.deepEqual(order, ["Denim Dream", "Apollo"], "shops with discount data first");
    const tartu = render(makeState({ screen: "outletMall", outletMallId: "lounakeskus", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS }));
    assert.equal(tartu.root.find((n) => n.className === "store-row").length, 1, "'Denim Dream' and 'Denim Dream 2' are one row");
  }),
  test("Outletid mall screen: a mall where no shop has discount data yet says so; a brand whose sale prices are ALL permanent shows small text with the count on sale, no badge", () => {
    const { text } = render(makeState({ screen: "outletMall", outletMallId: "viru", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS }));
    assert.ok(text.includes("Ühelgi selle keskuse kauplusel pole praegu allahindlusandmeid"));
    const allPermanent = [{ ...OUTLET_BRANDS[0], items: OUTLET_BRANDS[0].items.map((i) => ({ ...i, status: "permanent", newPercent: null })) }];
    const { root, text: t2 } = render(makeState({ screen: "outletMall", outletMallId: "ulemiste", outletMalls: OUTLET_MALLS, outletBrands: allPermanent }));
    assert.ok(t2.includes("2 toodet soodushinnas"));
    assert.equal(root.find((n) => n.className === "badge badge-deal").length, 0, "no badge at all");
    assert.equal(root.find((n) => n.tagName === "button" && n.className === "store-row").length, 1, "still tappable — the items are still there to see");
  }),
  test("Outletid, a brand with no site 30-day field (Klick/Apotheka/Euronics): the mall row says 'N toodet allahindluses' in small text, and each card carries a plain 'Allahindlus' tag — no %, no 'Püsiv soodushind' — until our own history is 30 days old", () => {
    const klickMalls = [{ id: "ulemiste", name: "Ülemiste", address: "x", shops: [{ name: "Klick", category: "Kodu & tehnika", floor: "1" }] }];
    const klick = [{ brand: "Klick", scrapedAt: "2026-09-26T10:00:00.000Z", catalogueCount: 34, thirtyDaySource: "history", items: [
      { id: "k1", brand: "HP", name: "Laserprinter M140w", section: null, type: "Arvutid ja lisad", regularPrice: 149.99, salePrice: 129.99, discountPercent: 13, status: "unknown", refPrice: null, newPercent: null, link: "https://www.klick.ee/printer", image: null, fresh: false, position: 1, firstSeen: "2026-09-26" },
    ] }];
    const mall = render(makeState({ screen: "outletMall", outletMallId: "ulemiste", outletMalls: klickMalls, outletBrands: klick }));
    assert.ok(mall.text.includes("1 toodet allahindluses") && !mall.text.includes("uut allahindlust") && !mall.text.includes("soodushinnas"));
    const shop = render(makeState({ screen: "outletShop", outletMallId: "ulemiste", outletShopName: "Klick", outletMalls: klickMalls, outletBrands: klick }));
    const card = shop.root.find((n) => n.className.startsWith("ocard "))[0] || shop.root.find((n) => n.className === "ocard")[0];
    assert.ok(card, "one card");
    assert.equal(card.find((n) => n.className === "ocard-badge")[0].textContent, "Allahindlus");
    assert.ok(!card.textContent.includes("%") && !card.textContent.includes("Püsiv soodushind"));
    assert.ok(card.textContent.includes("129.99 €") && card.textContent.includes("tavahind 149.99 €"));
    assert.equal(shop.root.find((n) => n.className === "tab-row outlet-sections").length, 0, "no section row for a brand without sections");
  }),
  test("Outletid shop screen (2026-09-26 redesign): a card grid — each card ONE link to the brand's page in a new tab, 3:4 photo with the discount badge on it (neutral icon when there's no photo), brand small, name, sale price, 'tavahind' struck through; the Estonian note, the item count and 'Uuendatud' line; biggest discount first by default", () => {
    const { root, text } = render(makeState({ screen: "outletShop", outletMallId: "ulemiste", outletShopName: "Denim Dream", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS }));
    assert.equal(root.className, "page page-wide", "the wide layout, for 4 columns on a desktop");
    assert.ok(text.includes("E-poe allahindlus. See bränd on selles keskuses esindatud."), "the owner's required note, in Estonian");
    assert.ok(text.includes("2 toodet") && text.includes("Uuendatud:"));
    const cards = root.find((n) => n.className === "ocard");
    assert.equal(cards.length, 2);
    assert.deepEqual(cards.map((c) => c.href), ["https://www.denimdream.com/EE/et/toode/1", "https://www.denimdream.com/EE/et/toode/2"], "the NEW discount first, the permanent -50% tavahind gap after it");
    assert.ok(cards.every((c) => c.tagName === "a" && c.target === "_blank" && c.rel === "noopener noreferrer"));
    assert.equal(root.find((n) => n.className === "store-link").length, 0, "no separate 'Vaata poes' button");
    const [ck, levis] = cards;
    assert.ok(ck.textContent.includes("Calvin Klein") && ck.textContent.includes("Teksaseelik 90S MINI") && ck.textContent.includes("69.90 €") && ck.textContent.includes("tavahind 99.90 €"));
    assert.equal(ck.find((n) => n.className === "ocard-badge")[0].textContent, "-13%", "the badge is against the 30-day low (79.90), NOT the -30% tavahind gap");
    assert.ok(!ck.textContent.includes("-30%") && !ck.textContent.includes("Püsiv soodushind"));
    assert.equal(ck.find((n) => n.tagName === "img").length, 1, "a photo when the brand has one");
    assert.equal(ck.find((n) => n.tagName === "img")[0].src, "https://pic.denimdream.com/1.jpg");
    assert.equal(levis.find((n) => n.tagName === "img").length, 0, "no <img> without a photo");
    assert.equal(levis.find((n) => n.attributes.class === "neutral-icon").length, 1, "the neutral icon instead");
    assert.equal(levis.find((n) => n.className === "ocard-badge").length, 0, "a permanent sale price gets NO % badge");
    assert.ok(levis.textContent.includes("Püsiv soodushind") && levis.textContent.includes("45.00 €") && levis.textContent.includes("tavahind 90.00 €") && !levis.textContent.includes("-50%"));
    assert.ok(text.includes("Pilt: Denim Dream"));
  }),
  test("Outletid shop screen: section / type / sort chips — tapping one calls setOutletFilter; a chosen section narrows the type chips and the grid; 'Madalaim hind' and 'Uusim' reorder", () => {
    const calls = [];
    const base = { screen: "outletShop", outletMallId: "ulemiste", outletShopName: "Denim Dream", outletMalls: OUTLET_MALLS, outletBrands: OUTLET_BRANDS };
    const { root } = render(makeState(base), { ...actions, setOutletFilter: (p) => calls.push(p) });
    const chips = (cls) => root.find((n) => n.className === `tab-row ${cls}`)[0].children.map((c) => c.textContent);
    assert.deepEqual(chips("outlet-sections"), ["Kõik", "Naised", "Mehed"], "the store's own sections that have an item, in its order");
    assert.deepEqual(chips("outlet-types"), ["Kõik", "Seelikud (1)", "Teksad (1)"]);
    assert.deepEqual(chips("outlet-sorts"), ["Suurim allahindlus", "Madalaim hind", "Uusim"]);
    root.find((n) => n.className === "tab" && n.textContent === "Mehed")[0].click();
    root.find((n) => n.className === "tab" && n.textContent === "Madalaim hind")[0].click();
    assert.deepEqual(calls, [{ section: "Mehed", type: null }, { sort: "price" }]);
    const mehed = render(makeState({ ...base, outletFilter: { section: "Mehed", type: null, sort: "discount" } }));
    assert.deepEqual(mehed.root.find((n) => n.className === "ocard").map((c) => c.href), ["https://www.denimdream.com/EE/et/toode/2"]);
    assert.ok(mehed.text.includes("1 toodet"));
    assert.equal(mehed.root.find((n) => n.className === "tab-row outlet-types").length, 0, "one type only in Mehed -> no type row needed");
    const byPrice = render(makeState({ ...base, outletFilter: { section: null, type: null, sort: "price" } }));
    assert.deepEqual(byPrice.root.find((n) => n.className === "ocard").map((c) => c.href), ["https://www.denimdream.com/EE/et/toode/2", "https://www.denimdream.com/EE/et/toode/1"], "cheapest first regardless of new/permanent");
    const newest = render(makeState({ ...base, outletFilter: { section: null, type: null, sort: "newest" } }));
    assert.equal(newest.root.find((n) => n.className === "tab active")[0].textContent, "Kõik");
    assert.ok(newest.root.find((n) => n.className === "tab active").some((n) => n.textContent === "Uusim"));
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
  test("Group (2026-09-26 redesign): tabs are 'Kõik' plus one per display category with a product, in group order; 'Kõik' shows every product folded into the group, a tab shows only its own category, and the back button goes home", () => {
    const withoutTab = render(makeState({ screen: "group", group: "piimatooted-ja-munad", groupTab: null }));
    assert.ok(withoutTab.text.includes("Piimatooted ja munad"));
    const tabLabels = withoutTab.root.find((n) => n.className === "tab" || n.className === "tab active").map((n) => n.textContent);
    assert.deepEqual(tabLabels, ["Kõik", "Piim ja jogurt", "Või", "Kohukesed ja magustoidud"], "'Kõik' first, then group order — no empty-category tabs (only 3 of the group's 9 categories have a product)");
    const activeTabs = withoutTab.root.find((n) => n.className === "tab active").map((n) => n.textContent);
    assert.deepEqual(activeTabs, ["Kõik"], "'Kõik' is active with no tab selected");
    assert.ok(withoutTab.text.includes("Alma Piim 2.5% 1000ml") && withoutTab.text.includes("Tere Või 82% 200g") && withoutTab.text.includes("Tere Kohuke vanilli 40g"), "every product across the group's categories, folded together");
    assert.ok(withoutTab.text.includes("3 toodet võrdluses"));

    const withTab = render(makeState({ screen: "group", group: "piimatooted-ja-munad", groupTab: "voi" }));
    assert.ok(withTab.text.includes("Tere Või 82% 200g") && !withTab.text.includes("Alma Piim 2.5% 1000ml") && !withTab.text.includes("Tere Kohuke vanilli 40g"), "only the selected tab's own category");
    assert.deepEqual(withTab.root.find((n) => n.className === "tab active").map((n) => n.textContent), ["Või"]);
    assert.ok(withTab.text.includes("1 toodet võrdluses"));

    // An unknown group id falls back to the home screen rather than
    // crashing (a stray/old hash, or a group removed later).
    const badGroup = render(makeState({ screen: "group", group: "does-not-exist" }));
    assert.ok(badGroup.text.includes("Suurimad hinnavahed täna"), "falls back to home");

    const calls = [];
    const backRoot = new FakeNode("div");
    renderApp(backRoot, new FakeNode("nav"), makeState({ screen: "group", group: "piimatooted-ja-munad" }), { ...actions, goHome: () => calls.push("home") });
    backRoot.find((n) => n.className === "back")[0].click();
    assert.deepEqual(calls, ["home"]);
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
  test("Product with four stores: Coop (Haapsalu) has its own coloured label, its regional-price note, is Parim hind here, and the other three show +X €", () => {
    const { root, text } = render(makeState({ screen: "product", product: fourStore }));
    assert.ok(text.includes("Coop (Haapsalu)"));
    assert.ok(text.includes("Haapsalu e-poe hind, teistes piirkondades võib erineda"));
    assert.ok(root.find((n) => n.className === "store-name store-coop").length === 1);
    assert.equal((text.match(/Parim hind/g) || []).length, 1);
    const best = root.find((n) => n.className === "store-row cheapest");
    assert.ok(best.length === 1 && best[0].textContent.includes("Coop (Haapsalu)"));
    assert.ok(text.includes("+0.06 €") && text.includes("+0.10 €") && text.includes("+0.11 €"));
    assert.ok(text.includes("4 poodi"));
    assert.equal(root.find((n) => n.tagName === "a").length, 4);
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
  test("Search: 'Ainult ühes poes' shows single-store listings after the compared results — store label, the store's own name, price, unit price, Vaata poes in a new tab — also when no compared product matches; a category screen never shows them", () => {
    const singles = [
      { store: "selver", category: "Household", name: "Torupuhastusvahend, TORUSIIL, 1 l", price: 2.49, currency: "EUR", url: "https://example.test/s/torusiil", size: "1000ml" },
      { store: "rimi", category: "Dairy", name: "Kanamunad Rimi Smart M 10tk", price: 1.99, currency: "EUR", url: "https://example.test/r/munad", size: "10tk" },
    ];
    const withSingles = (overrides) => makeState({ singles, singlesIndex: buildSinglesIndex(singles), ...overrides });
    const container = new FakeNode("div");
    renderSearchResults(container, withSingles({ query: "toru" }), actions);
    const text = container.textContent;
    assert.ok(!text.includes("Midagi ei leitud"), "a single-store hit is a result");
    assert.ok(text.includes("Ainult ühes poes") && text.includes("Torupuhastusvahend, TORUSIIL, 1 l") && text.includes("2.49 €") && text.includes("2.49 €/l"));
    assert.ok(container.find((n) => n.className === "store-name store-selver").length === 1, "coloured store label");
    const links = container.find((n) => n.tagName === "a");
    assert.equal(links.length, 1);
    assert.ok(links[0].target === "_blank" && links[0].href === "https://example.test/s/torusiil" && links[0].textContent.includes("Vaata poes"));
    assert.ok(!text.includes("Lisa korvi"), "nothing to add to a basket");
    // Compared products first, singles after.
    renderSearchResults(container, withSingles({ query: "piim" }), actions);
    assert.ok(container.textContent.includes("Alma Piim 2.5% 1000ml") && !container.textContent.includes("Ainult ühes poes"));
    renderSearchResults(container, withSingles({ query: "munad" }), actions);
    assert.ok(container.textContent.includes("Kanamunad Rimi Smart M 10tk") && container.textContent.includes("0.20 €/tk"));
    renderSearchResults(container, withSingles({ query: "zzzz" }), actions);
    assert.ok(container.textContent.includes("Midagi ei leitud"));
    const cat = render(withSingles({ screen: "category", category: "piim-ja-jogurt" })).text;
    assert.ok(!cat.includes("Ainult ühes poes") && !cat.includes("TORUSIIL"), "category browsing stays comparisons only");
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
  test("Actions: tapping a group icon opens that group by id; the quantity stepper calls setQuantity with the new number; the error screen is in the chosen language", () => {
    const calls = [];
    const spy = { ...actions, openGroup: (g, tab) => calls.push(["group", g, tab]), setQuantity: (k, q) => calls.push(["qty", k, q]) };
    const root = new FakeNode("div");
    renderApp(root, new FakeNode("nav"), makeState({ screen: "home", basket: { [productKey(diapers)]: 1 } }), spy);
    root.find((n) => n.className === "group-item" && n.textContent.includes("Puu- ja köögiviljad"))[0].click();
    const plus = root.find((n) => n.className === "qty-btn" && n.textContent === "+")[0];
    plus.click();
    assert.deepEqual(calls[0], ["group", "puu-ja-koogiviljad", undefined]);
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
