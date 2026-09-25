// Regression tests for the shared nameFilter word lists in
// categories.js (cheeseFilter, curdFilter) — these decide what's
// scraped in the first place, upstream of match-products.js, so a gap
// here can let a genuinely wrong pair of items through to matching
// even though the matcher itself is working correctly.
// Run with: node scraper/categories.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { CATEGORIES } = require("./categories");

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

function category(name) {
  const found = CATEGORIES.find((c) => c.name === name);
  if (!found) throw new Error(`No category named "${name}"`);
  return found;
}

const cheeseBarboraFilter = category("Cheese").urls.barbora.nameFilter;
const cheeseRimiFilter = category("Cheese").urls.rimi.nameFilter;
const curdBarboraFilter = category("Curd & cottage cheese").urls.barbora[1].nameFilter;
const curdRimiFilter = category("Curd & cottage cheese").urls.rimi.nameFilter;
const coffeeBarboraInstantFilter = category("Coffee").urls.barbora[1].nameFilter;
const coffeeRimiCapsuleFilter = category("Coffee").urls.rimi[1].nameFilter;
const teaBarboraFruitFilter = category("Tea & cocoa").urls.barbora[2].nameFilter;
const teaRimiGiftFilter = category("Tea & cocoa").urls.rimi[0].nameFilter;
const cerealsBarboraFilter = category("Cereals & oats").urls.barbora[0].nameFilter;
const cerealsRimiFilter = category("Cereals & oats").urls.rimi.nameFilter;
const cannedBarboraPickleFilter = category("Canned food").urls.barbora[1].nameFilter;
const cannedRimiBeansFilter = category("Canned food").urls.rimi[1].nameFilter;
const cannedRimiSaladFilter = category("Canned food").urls.rimi[4].nameFilter;

const results = [
  test("Cheese: a real bug — 'näkk' (double k) missed Selver's inflected 'Juustusnäkid', letting a cheese snack scrape through and match another store's cheese snack", () => {
    assert.equal(cheeseRimiFilter("Juustusnäkk sin.hallitusjuustu"), false, "Rimi's own double-k spelling must still be excluded");
    assert.equal(cheeseBarboraFilter("Juustu snäkk FARMI, 200g"), false, "Barbora's 's' + double-k spelling must still be excluded");
    // The actual bug: this Selver spelling (single k, consonant
    // gradation) slipped through "näkk" and matched Rimi's
    // "Juustusnäkk" in a live scrape before this fix.
    assert.equal(cheeseRimiFilter("Juustusnäkid Forte Classico, VALIO, 100 g"), false, "Selver's inflected single-k spelling must be excluded too");
  }),

  test("Cheese: plant-based tofu/Violife and cheese sticks/chips are excluded, real cheese isn't", () => {
    assert.equal(cheeseBarboraFilter("Suitsutofu, BON VEGAN, 220 g"), false);
    assert.equal(cheeseBarboraFilter("Võileivaviilud, Cheddarjuustu maitselised, VIOLIFE, 100 g"), false);
    assert.equal(cheeseBarboraFilter("Juustupulgad PIK-NIK Classic, 140g"), false);
    assert.equal(cheeseBarboraFilter("Juustulaastud Forte Classico 26%, VALIO, 100 g"), false);
    assert.equal(cheeseBarboraFilter("Eesti Juust viilutatud, 200g"), true);
    assert.equal(cheeseBarboraFilter("Kõva juust DŽIUGAS, 100g"), true);
  }),

  test("Cheese: GRIKIOS cream-cheese-stuffed peppers are excluded even in Barbora's abbreviated form; a real GRIKIOS cheese isn't", () => {
    assert.equal(cheeseBarboraFilter("Roh.pepper. GRIKIOS toorjuust.,200/150g"), false);
    assert.equal(cheeseBarboraFilter("Magus pip.GRIKIOS toorjuus.l.v.,200/150g"), false);
    assert.equal(cheeseBarboraFilter("Juustuga täidetud magus paprika, GRIKIOS, 200 g"), false);
    assert.equal(cheeseBarboraFilter("Salatijuust GRIKIOS, 200g"), true, "a real GRIKIOS cheese (not a stuffed pepper) must stay in scope");
  }),

  test("Curd & cottage cheese: dessert-form curd cream/paste/mould are excluded, flavoured-but-plain-form curd isn't", () => {
    assert.equal(curdRimiFilter("Kohupiimakreem metsmaasika, ALMA, 300 g"), false);
    assert.equal(curdRimiFilter("Kohupiimapasta vanilje, TERE, 300 g"), false);
    assert.equal(curdRimiFilter("Kohupiimavorm vanilliga"), false);
    // Barbora abbreviates "Kohupiimapasta" with no full "pasta"
    // substring — caught by its own literal phrase, not by "pasta".
    assert.equal(curdBarboraFilter("Kohupiimap.TERE sidr.-laimi lakt.v.,300g"), false);
    assert.equal(curdRimiFilter("Kodujuust murakamoosiga 5%, ALMA, 200 g"), true, "a jam-flavoured (not dessert-form) cottage cheese stays in scope");
    assert.equal(curdRimiFilter("Kodujuust soolakurgi ja tilli, ALMA, 200 g"), true, "a savoury-flavoured cottage cheese stays in scope");
  }),

  test("Coffee: a real bug — Matcha Latte (green tea, no coffee) and a Nesquik cocoa capsule both leaked into a live scrape via leaves shared with real coffee", () => {
    assert.equal(coffeeBarboraInstantFilter("MatchaLatte MOKATE Classic 6x14g"), false);
    assert.equal(coffeeBarboraInstantFilter("Lah.k.j.JACOBS vanil.match.latte 8x14.5g"), false, "the abbreviated 'match.latte' spelling must be caught too");
    assert.equal(coffeeBarboraInstantFilter("Nescafe Lahustuv classic crema kohv 100g"), true, "real instant coffee stays in scope");
    assert.equal(coffeeRimiCapsuleFilter("Kakaokapslid Dolce Gusto Nesquik 256g"), false);
    assert.equal(coffeeRimiCapsuleFilter("Koh.kap. Starbucks Blonde Espr.Roast 10tk 53g"), true, "a real coffee capsule stays in scope");
  }),

  test("Tea & cocoa: a real bug — MASHIE fruit/berry purée pouches (not tea) leaked into both Barbora's fruit-tea leaf and Rimi's tea-gift-box leaf", () => {
    assert.equal(teaBarboraFruitFilter("Marjapüree MASHIE astelpaju 4x45g"), false);
    assert.equal(teaBarboraFruitFilter("Basilur Must ceylon leaf of tee 100g"), true, "a real fruit/herbal tea stays in scope");
    assert.equal(teaRimiGiftFilter("Marjapüree val.sõs.-ingv. Mashie Original 4tk"), false);
    assert.equal(teaRimiGiftFilter("Tee ürdi kummeli Rimi 30g"), true, "a real gift-boxed tea stays in scope");
  }),

  test("Cereals & oats: a real bug — BALSNACK kama-ball snacks, standalone quinoa/millet (already in Rice & grains), and abbreviated muesli-bar spellings all leaked past the plain 'batoon' filter", () => {
    assert.equal(cerealsBarboraFilter("Kamapallid BALSNACK 150g"), false);
    assert.equal(cerealsBarboraFilter("Hommikuhelbed Nesquik NESTLE 375g"), true, "a real breakfast cereal stays in scope");
    assert.equal(cerealsRimiFilter("Neljaviljapallid Balsnack 150g"), false);
    assert.equal(cerealsRimiFilter("Kinoa Rimi Free From 375g"), false, "standalone quinoa duplicates the existing Rice & grains category");
    assert.equal(cerealsRimiFilter("Hirss Rimi Free From 375g"), false, "standalone millet duplicates the existing Rice & grains category");
    assert.equal(cerealsRimiFilter("Müsli kinoa ja vaarikatega Rimi 350g"), true, "muesli that merely contains quinoa as an ingredient stays in scope");
    assert.equal(cerealsRimiFilter("Müs.bat. maapähk. piimašok. Corny Big 50g"), false, "abbreviated 'bat.' spelling must be caught, not just full 'batoon'");
    assert.equal(cerealsRimiFilter("Hommikueine Nestle Cookie Crisp 625g"), true, "a real breakfast cereal stays in scope");
  }),

  test("Canned food: a real bug — a cream-cheese-stuffed pepper, a bean soup with beef, and eggplant caviar/vegetable stew all leaked into the canned-vegetables leaves as jarred/canned products", () => {
    assert.equal(cannedBarboraPickleFilter("T.juust täid.papr.WELL DONE PREM.250g"), false, "same stuffed-pepper contamination already found in Cheese, different brand");
    assert.equal(cannedBarboraPickleFilter("Maitselt mahe kurk SALVEST 675g"), true, "a real canned pickle stays in scope");
    assert.equal(cannedRimiBeansFilter("Tšillioa supp veiselihaga Activus 400g"), false, "a soup with meat, not a plain canned bean");
    assert.equal(cannedRimiBeansFilter("Punased Kidney oad Heinz 400g"), true, "real canned beans stay in scope");
    assert.equal(cannedRimiSaladFilter("Baklažaani kaaviar Janarat 470g"), false, "eggplant caviar is a spread, not a whole/chunked vegetable");
    assert.equal(cannedRimiSaladFilter("Köögiviljahautis Ratatouille Nizhyn 450g"), false, "a cooked vegetable stew is a ready meal, not a plain canned vegetable");
    assert.equal(cannedRimiSaladFilter("Sügisesalat Põltsamaa 530g"), true, "a real preserved vegetable salad stays in scope");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
