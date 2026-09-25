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
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
