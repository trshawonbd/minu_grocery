// Regression tests for frontend/catalog.js — the Estonian display
// taxonomy laid over the data categories: the Fruits/Vegetables and
// Milk/Butter/Eggs splits, the Household aisles, shopping order,
// names in three languages, and that every product lands somewhere.
// Run with: node frontend/catalog.test.js
// or:       npm test

const assert = require("node:assert/strict");
const {
  DISPLAY_CATEGORIES,
  ICON_PATHS,
  FALLBACK_CATEGORY,
  displayCategoryById,
  displayCategoryFor,
  productsInDisplayCategory,
  displayCategoriesWithCounts,
  categoryName,
} = require("./catalog");
const { LANGUAGES, t, normalizeLang } = require("./i18n");

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

const p = (name, category) => ({ name, category, prices: {} });
const id = (name, category) => displayCategoryFor(p(name, category)).id;

const results = [
  test("Fruits & vegetables split: fruit words go to Puuviljad, everything else to Köögiviljad, and cherry/raspberry tomatoes stay vegetables", () => {
    for (const n of ["Õun granny smith kg", "Banaan kg", "Viinamari red globe punane kg", "Maasikad 500g", "Sidrun eureka kg", "Granaatõun kg", "Dattel 200g", "Avokaado kg"]) assert.equal(id(n, "Fruits & vegetables"), "puuviljad", n);
    for (const n of ["Tomat kg", "Kartul punane kg", "Kadarbiku Hapukapsas 900g", "Intsu Kirsstomat 250g", "Vaarikatomat kg", "Peet 350g", "Spinat grüne fee tk", "Eesti and Šampinjonid 500g"]) assert.equal(id(n, "Fruits & vegetables"), "koogiviljad", n);
  }),
  test("Dairy split: milk/yoghurt/skyr -> Piim ja jogurt, butter -> Või, eggs -> Munad", () => {
    for (const n of ["Alma Piim 2.5% 1500ml", "Farmi Skyr maasika 300g", "Saare Jogurtikreem laktoosivaba sidruni 400g", "Alma Koorejogurt muah vanilli 380g"]) assert.equal(id(n, "Dairy"), "piim-ja-jogurt", n);
    for (const n of ["Tere Või 82% 200g", "Estover Taluvõi eesti 82% 150g", "Mo saaremaa Või küüsl soolakrist 150g", "Valio Või soolata 500g"]) assert.equal(id(n, "Dairy"), "voi", n);
    for (const n of ["Eesti Munad M 10tk", "Kanamunad L 10tk", "Munad vabapidamine 6tk"]) assert.equal(id(n, "Dairy"), "munad", n);
    assert.equal(id("Alma Piim võib sisaldada 1L", "Dairy"), "piim-ja-jogurt", "'või' must be a whole word — 'võib' is not butter");
  }),
  test("Household split: dishwashing, laundry, paper, and everything else as cleaning", () => {
    assert.equal(id("Fairy Nõudepesuvahend lemon 450ml", "Household"), "noudepesu");
    assert.equal(id("Finish Nõudepesumasina sool 1500g", "Household"), "noudepesu");
    assert.equal(id("Persil Pesugeel color pk 990ml", "Household"), "pesuvahendid");
    assert.equal(id("Mayeri Pesupulber sensitive 1650g", "Household"), "pesuvahendid");
    assert.equal(id("Kh-7 Plekieemaldaja effect oxy 750ml", "Household"), "pesuvahendid");
    assert.equal(id("Zewa Tualettpaber 8 rulli", "Household"), "paberitooted");
    assert.equal(id("Lambi Majapidamispaber 2 rulli", "Household"), "paberitooted");
    assert.equal(id("Domestos Wc pine täide värskendaja 35g", "Household"), "puhastusvahendid");
    assert.equal(id("Ajax Üldpuhastusvahend blossom peach 1000ml", "Household"), "puhastusvahendid");
  }),
  test("Unsplit categories map 1:1, Coffee and Tea & cocoa merge into Kohv ja tee, formula + baby food + diapers merge into Lapsed", () => {
    assert.equal(id("Kalev šokolaad 100g", "Chocolate"), "sokolaad");
    assert.equal(id("Paulig Classic 500g", "Coffee"), "kohv-ja-tee");
    assert.equal(id("Lipton Yellow label 100tk", "Tea & cocoa"), "kohv-ja-tee");
    assert.equal(id("Nutrilon 2 800g", "Baby formula"), "lapsed");
    assert.equal(id("Gerber Püree 125g", "Baby food"), "lapsed");
    assert.equal(id("Pampers Premium Care Püksmähkmed S5 34tk", "Diapers & baby wipes"), "lapsed");
    assert.equal(id("Whiskas 400g", "Pet food"), "lemmikloomad");
  }),
  test("Batch 9 display tiles: cakes after bread, instant food after pasta, world cuisine after sauces, alcohol-free after drinks, then the three alcohol tiles (flagged alcohol), each with its own icon", () => {
    const ids = DISPLAY_CATEGORIES.map((c) => c.id);
    assert.equal(ids.indexOf("koogid"), ids.indexOf("leib-ja-sai") + 1);
    assert.equal(ids.indexOf("kiirtoit"), ids.indexOf("pasta") + 1);
    assert.equal(ids.indexOf("maailma-kook"), ids.indexOf("kastmed") + 1);
    assert.deepEqual(ids.slice(ids.indexOf("mahlad-ja-joogid"), ids.indexOf("mahlad-ja-joogid") + 5), ["mahlad-ja-joogid", "alkoholivaba", "olu-ja-siider", "vein", "kange-alkohol"]);
    assert.deepEqual(DISPLAY_CATEGORIES.filter((c) => c.alcohol).map((c) => c.id), ["olu-ja-siider", "vein", "kange-alkohol"]);
    assert.equal(id("Saku Kuld 500ml", "Beer & cider"), "olu-ja-siider");
    assert.equal(id("Andes Merlot 750ml", "Wine"), "vein");
    assert.equal(id("Absolut 700ml", "Spirits"), "kange-alkohol");
    assert.equal(id("Heineken 0.0% 330ml", "Alcohol-free beer, cider & wine"), "alkoholivaba");
    assert.equal(id("Nisutortilja 320g", "World cuisine"), "maailma-kook");
    assert.equal(id("Kiirnuudlid 60g", "Instant food"), "kiirtoit");
    assert.equal(id("Meekook 1kg", "Cakes & pastries"), "koogid");
    assert.equal(categoryName(displayCategoryById("kange-alkohol"), "et"), "Kange alkohol");
  }),
  test("A data category no display category names falls back to Muu instead of vanishing", () => {
    assert.equal(id("Something", "Brand new category"), FALLBACK_CATEGORY.id);
    const list = displayCategoriesWithCounts([p("Something", "Brand new category"), p("Õun kg", "Fruits & vegetables")]);
    assert.deepEqual(list.map((x) => x.category.id), ["puuviljad", "muu"]);
  }),
  test("Shopping order and counts: only categories with products appear, in DISPLAY_CATEGORIES order, and the counts add up", () => {
    const products = [
      p("Persil Pesugeel 1L", "Household"), p("Tere Või 200g", "Dairy"), p("Õun kg", "Fruits & vegetables"),
      p("Tomat kg", "Fruits & vegetables"), p("Alma Piim 1L", "Dairy"), p("Kalev šokolaad", "Chocolate"),
    ];
    const list = displayCategoriesWithCounts(products);
    assert.deepEqual(list.map((x) => [x.category.id, x.count]), [["puuviljad", 1], ["koogiviljad", 1], ["piim-ja-jogurt", 1], ["voi", 1], ["sokolaad", 1], ["pesuvahendid", 1]]);
    assert.equal(list.reduce((s, x) => s + x.count, 0), products.length);
    assert.deepEqual(productsInDisplayCategory(products, "koogiviljad").map((x) => x.name), ["Tomat kg"]);
  }),
  test("Every display category has a unique id, an icon we drew ourselves, and a name in et/en/ru; names fall back et <- en <- ru", () => {
    const ids = new Set();
    for (const c of DISPLAY_CATEGORIES) {
      assert.ok(!ids.has(c.id), `duplicate id ${c.id}`);
      ids.add(c.id);
      assert.ok(Array.isArray(ICON_PATHS[c.icon]) && ICON_PATHS[c.icon].length > 0, `icon ${c.icon} for ${c.id}`);
      for (const lang of LANGUAGES) assert.ok(c.name[lang], `${c.id} name in ${lang}`);
      assert.equal(displayCategoryById(c.id), c);
    }
    assert.equal(categoryName(displayCategoryById("koogiviljad"), "et"), "Köögiviljad");
    assert.equal(categoryName(displayCategoryById("koogiviljad"), "en"), "Vegetables");
    assert.equal(categoryName(displayCategoryById("koogiviljad"), "ru"), "Овощи");
    assert.equal(categoryName({ name: { et: "Ainult eesti" } }, "ru"), "Ainult eesti");
    assert.equal(displayCategoryById("nope"), null);
  }),
  test("i18n: Estonian by default, placeholders filled, unknown language -> et, a key missing in ru falls back to en then et, a missing key returns the key", () => {
    assert.equal(normalizeLang(undefined), "et");
    assert.equal(normalizeLang("fr"), "et");
    assert.equal(normalizeLang("ru"), "ru");
    assert.equal(t("et", "stores", { n: 3 }), "3 poodi");
    assert.equal(t("en", "stores", { n: 3 }), "3 stores");
    assert.equal(t("ru", "home"), "Главная");
    assert.equal(t("ru", "no-such-key"), "no-such-key");
    assert.equal(t("et", "updated", { time: "x" }), "Uuendatud: x");
    assert.equal(t("en", "basketWithCount", { n: 2 }), "Basket (2)");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
