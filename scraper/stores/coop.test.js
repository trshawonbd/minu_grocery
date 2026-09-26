// Regression tests for scraper/stores/coop.js — the Store API item
// shape and the category map that lays Coop Haapsalu's coarse tree
// over our categories. Never contacts the store.
// Run with: node scraper/stores/coop.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { mapItem, CATEGORIES } = require("./coop");
const { CATEGORIES: OUR_CATEGORIES } = require("../categories");

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

const filterOf = (category, id) => CATEGORIES[category].sources.find((s) => s.id === id).nameFilter;
const takes = (category, name) => CATEGORIES[category].sources.some((s) => !s.nameFilter || s.nameFilter(name));

const results = [
  test("mapItem: price anyone pays (cents -> euros), regular price kept, no card price, EAN only when the sku is 8 or 13 digits, image and permalink hotlinked, store 'Coop'", () => {
    const item = mapItem({
      name: "Kummikomm Sour Spookers Trolli 150g",
      sku: "4070481000307",
      permalink: "https://example.test/toode/kummikomm",
      prices: { price: "209", regular_price: "259", sale_price: "209" },
      on_sale: true,
      is_in_stock: true,
      images: [{ src: "https://example.test/img.jpg" }],
    });
    assert.equal(item.store, "Coop");
    assert.equal(item.price, 2.09);
    assert.equal(item.regularPrice, 2.59);
    assert.equal(item.cardPrice, null);
    assert.equal(item.ean, "4070481000307");
    assert.equal(item.image, "https://example.test/img.jpg");
    assert.equal(item.url, "https://example.test/toode/kummikomm");
    assert.equal(item.brand, null, "Coop has no brand field — the name decides");
    assert.equal(item.storeUnitPrice, null, "the site's per-kg price is broken; the app computes it from the size");
    assert.equal(mapItem({ name: "Haapsalu lihapirukas", sku: "005255", prices: { price: "950" } }).ean, null, "an internal code is not a barcode");
    assert.equal(mapItem({ name: "Piim &amp; koor", sku: "", prices: { price: "100" } }).name, "Piim & koor");
  }),
  test("Every one of our categories has a Coop mapping", () => {
    for (const c of OUR_CATEGORIES) assert.ok(CATEGORIES[c.name], `${c.name} has no Coop sources`);
  }),
  test("Coop's one 'Piimatooted' bucket splits cleanly: a curd, a cream, a kefir, a curd snack and a milk drink each land in exactly one of the five dairy-family categories", () => {
    const family = ["Curd & cottage cheese", "Cream & sour cream", "Kefir & buttermilk", "Curd snacks & desserts", "Milk drinks & drinking yoghurt"];
    const where = (name) => family.filter((cat) => filterOf(cat, 96)(name));
    assert.deepEqual(where("Kohupiim 5% Farmi 380g"), ["Curd & cottage cheese"]);
    assert.deepEqual(where("Kodujuust 4% Alma 200g"), ["Curd & cottage cheese"]);
    assert.deepEqual(where("Hapukoor 20% Farmi 400g"), ["Cream & sour cream"]);
    assert.deepEqual(where("Vahukoor 35% Alma 200ml"), ["Cream & sour cream"]);
    assert.deepEqual(where("Keefir 2,5% Farmi 1l"), ["Kefir & buttermilk"]);
    assert.deepEqual(where("Kohuke vanilli Alma 40g"), ["Curd snacks & desserts"]);
    assert.deepEqual(where("Kohupiimakreem vanilli Alma 150g"), ["Curd snacks & desserts"]);
    assert.deepEqual(where("Piimajook vanilje Aasa 450ml"), ["Milk drinks & drinking yoghurt"]);
  }),
  test("Dairy at Coop: plain milk, spoonable yoghurt, eggs and butter only — flavoured/condensed milk, drinking yoghurt, plant drinks and margarine never", () => {
    assert.equal(filterOf("Dairy", 95)("Piim 2,5% Alma 1l"), true);
    assert.equal(filterOf("Dairy", 95)("Kakaopiim 2,5% Tere 1l"), false);
    assert.equal(filterOf("Dairy", 95)("Kondenspiim suhkruga 397g"), false);
    assert.equal(filterOf("Dairy", 95)("Kaerajook Oatly 1l"), false);
    assert.equal(filterOf("Dairy", 97)("Jogurt maasika Alma 380g"), true);
    assert.equal(filterOf("Dairy", 97)("Joogijogurt mango Alma 900g"), false);
    assert.equal(filterOf("Dairy", 99)("Või 82% Tere 200g"), true);
    assert.equal(filterOf("Dairy", 99)("Margariin Rama 400g"), false);
    assert.equal(filterOf("Milk drinks & drinking yoghurt", 95)("Kakaopiim 2,5% Tere 1l"), true, "and the milk drink goes to its own category");
  }),
  test("Coop's 'Grillvorstid ja -lihad' splits into Sausages (a sausage word) and Meat (marinated grill meat); offal and game never reach Meat; sausages never take ham", () => {
    assert.equal(filterOf("Sausages", 87)("Grillvorst juustuga Rakvere 400g"), true);
    assert.equal(filterOf("Meat", 87)("Grillvorst juustuga Rakvere 400g"), false);
    assert.equal(filterOf("Meat", 87)("Grill-liha sea kaelakarbonaad marineeritud 500g"), true);
    assert.equal(filterOf("Sausages", 87)("Grill-liha sea kaelakarbonaad marineeritud 500g"), false);
    assert.equal(filterOf("Meat", 85)("Seamaks 400g"), false);
    assert.equal(filterOf("Meat", 85)("Põdraliha 500g"), false);
    assert.equal(filterOf("Sausages", 88)("Suitsusink Rakvere 300g"), false);
  }),
  test("Drinks vs the drink categories: juice stays in Drinks, juice drinks and syrups go to Syrups & juice drinks, energy/sport/iced tea to their category, alcohol-free requires the claim", () => {
    assert.equal(filterOf("Drinks", 143)("Apelsinimahl Põltsamaa 1l"), true);
    assert.equal(filterOf("Drinks", 143)("Multimahlajook Põltsamaa 1l"), false);
    assert.equal(filterOf("Syrups & juice drinks", 143)("Multimahlajook Põltsamaa 1l"), true);
    assert.equal(filterOf("Drinks", 141)("Energiajook Red Bull 250ml"), false);
    assert.equal(filterOf("Drinks", 141)("Limonaad A. Le Coq 1,5l"), true);
    assert.equal(filterOf("Energy, sports & iced-tea drinks", 141)("Jäätee Nestea sidruni 1,5l"), true);
    assert.equal(filterOf("Energy, sports & iced-tea drinks", 141)("Limonaad A. Le Coq 1,5l"), false);
    assert.equal(filterOf("Alcohol-free beer, cider & wine", 145)("Alkoholivaba õlu Heineken 0,0% 330ml"), true);
    assert.equal(filterOf("Alcohol-free beer, cider & wine", 145)("Kali A. Le Coq 1l"), false);
    assert.equal(filterOf("Beer & cider", 1240)("Alkoholivaba õlu Saku 500ml"), false);
  }),
  test("Fish: chilled/smoked/canned fish in Fish & seafood, frozen fish in Frozen fish & seafood, never both; frozen fish burgers nowhere", () => {
    assert.equal(filterOf("Fish & seafood", 91)("Suitsulõhe viilud 100g"), true);
    assert.equal(filterOf("Fish & seafood", 91)("Külmutatud lõhefilee 500g"), false);
    assert.equal(filterOf("Frozen fish & seafood", 91)("Külmutatud lõhefilee 500g"), true);
    assert.equal(filterOf("Frozen fish & seafood", 72)("Kalapulgad Esva 250g"), true);
    assert.equal(filterOf("Frozen fish & seafood", 72)("Kalaburger Esva 375g"), false);
    assert.equal(takes("Dumplings, pizza & fries", "Pelmeenid Pealinna 350g"), true);
    assert.equal(filterOf("Frozen fish & seafood", 72)("Pelmeenid Pealinna 350g"), false);
  }),
  test("Spices vs Baking vs vinegar (all in Coop's 'Maitseained, äädikas'): each name to one category; Instant food vs Broths split the same shelf; cat litter only from pet supplies", () => {
    const spice = filterOf("Spices", 123), baking = filterOf("Baking supplies", 123), vinegar = filterOf("Sauces & condiments", 123);
    assert.deepEqual([spice("Must pipar jahvatatud Santa Maria 35g"), baking("Must pipar jahvatatud Santa Maria 35g"), vinegar("Must pipar jahvatatud Santa Maria 35g")], [true, false, false]);
    assert.deepEqual([spice("Küpsetuspulber Dr. Oetker 30g"), baking("Küpsetuspulber Dr. Oetker 30g"), vinegar("Küpsetuspulber Dr. Oetker 30g")], [false, true, false]);
    assert.deepEqual([spice("Õunaäädikas 500ml"), baking("Õunaäädikas 500ml"), vinegar("Õunaäädikas 500ml")], [false, false, true]);
    assert.equal(filterOf("Instant food", 109)("Kiirnuudlid kanamaitselised Reeva 60g"), true);
    assert.equal(filterOf("Instant food", 109)("Kanapuljong Maggi 120g"), false);
    assert.equal(filterOf("Broths & stock", 109)("Kanapuljong Maggi 120g"), true);
    assert.equal(filterOf("Pet food", 173)("Kassiliiv klombistuv 5l"), true);
    assert.equal(filterOf("Pet food", 173)("Kassi mänguasi hiir"), false);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);
if (fail > 0) process.exit(1);
