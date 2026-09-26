// Regression tests for match-products.js — every real case found
// while building the matcher (formula, produce, color/qualifier,
// brand-vs-produce-shaped, cooking method/compound words). Run this
// after any change to the matching logic, for any category —
// formula, produce, Selver, or otherwise — instead of re-reading the
// full match list by hand each time.
//
// Plain node:assert, no framework: consistent with the rest of this
// project (see scripts/serve.js).
// Run with: node scraper/match-products.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { sameProduct, extractType, isProduceItem, hasKnownBrand, extractProduceVariant, extractSize, extractBrand, extractVariant, matchPool, matchItems, computeSignature } = require("./match-products");
const { buildItem } = require("./categories");

function item(store, name) {
  return { store, name, price: 0, currency: "EUR", url: "x", ean: null };
}

// The one way to build an item for a named category — reads that
// category's real strictPackaging setting from scraper/categories.js
// (the same thing fetch-price.js reads), instead of a test hardcoding
// or guessing it. Any new test involving a specific category should
// use this, not a bare `item(...)`, precisely because a bare item
// silently runs the WRONG (lenient) matching path for a strict
// category — that's exactly what produced the incorrect "39 of 41
// pairs already match" conclusion in an earlier session: an ad-hoc
// check built items without strictPackaging at all.
//
// `dairyItem` below is kept only for the ~40 pre-existing call sites
// across Dairy/Bread/Drinks tests that already relied on strict
// packaging always being on; it now delegates here instead of
// hardcoding `true`, so it stays correct if Dairy's own setting ever
// changes, but it's still the wrong choice for a NEW test — name the
// real category via buildItem instead.
function dairyItem(store, name, brand) {
  return buildItem("Dairy", store, name, { brand });
}

const tests = [
  // --- Formula ---
  {
    name: "Formula: Barbora Aptamil 1, 800g vs Rimi Aptamil 1, 800g -> true",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Aptamil® 1 piimasegu 0K+, 800g"), item("Rimi", "Piimasegu Aptamil 1 al. sün. 800g")),
        true
      ),
  },
  {
    name: "Formula: Aptamil 1 vs Aptamil 2 -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Rimi", "Piimasegu Aptamil 1 al. sün. 800g"), item("Rimi", "Piimasegu Aptamil 2 alates 6k 800g")),
        false
      ),
  },
  {
    name: "Formula: NESTLE NAN Comfort vs Nan lactose-free -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Eripiimasegu NESTLE NAN Comf.400g sün."), item("Rimi", "Eripiimasegu imikutele Nan lv 400g")),
        false
      ),
  },
  {
    name: "Formula: real bug — generic Estonian formula words (jätkupiimasegu, kitsepiim(asegu), imiku, algpiimasegu, öko, mahepiimasegu) were mistaken for the brand, letting two DIFFERENT real brands' formula extract the same wrong pseudo-brand and risk a cross-brand match",
    run: () => {
      assert.equal(extractBrand("Algpiimasegu NESTLE NAN OptiPro 650g 0+"), "nestle");
      assert.equal(extractBrand("Öko.kitsepiimasegu HIPP Pre 400g sünn."), "hipp");
      assert.equal(extractBrand("Mahepiimasegu imikutele HOLLE 400g sünn."), "holle");
      assert.equal(extractBrand("Kitsepiim.jätk.KABRITA 800g 0-6k"), "kabrita");
      // The real cross-brand collision this fixes: before, both of
      // these extracted the same wrong pseudo-brand ("jätkupiimasegu")
      // despite being two different real manufacturers — HIPP's own
      // "Combiotic" line name (fused to a stage digit, a separate,
      // narrower gap left for the abbreviation-matching round) still
      // isn't "jätkupiimasegu" any more, and Aptamil now correctly
      // extracts as itself.
      assert.equal(extractBrand("Jätkupiimasegu APTAMIL Comfort2 400g 6K"), "aptamil");
      assert.notEqual(extractBrand("Jätkupiimasegu Combiotic2Bio HIPP800g,6k"), "jätkupiimasegu");
    },
  },
  {
    name: "Formula: real bug — a stage digit fused directly onto a named variant word with no space (Comfort1, Comfort2, Nan's Plus1..Plus4) extracted no variant at all, since a bare \\b never fires between a letter and a digit",
    run: () => {
      assert.equal(extractVariant("Piimasegu Comfort1 APTAMIL 400g, sünnist"), "comfort1");
      assert.equal(extractVariant("Jätkupiimasegu APTAMIL Comfort2 400g 6K"), "comfort2");
      assert.equal(extractVariant("P.segu Optipro Nan Plus1 al.sünnist 800g"), "1");
      assert.equal(extractVariant("Piimasegu  Nan Optipro Plus4 al.2a 800g"), "4");
      // The spaced form (a different store's own wording) already
      // worked before this fix and must still agree with the fused
      // form of the same real stage.
      assert.equal(extractVariant("Jä.p.segu Optipro Nan Plus 2 al.6k 800g"), "2");
    },
  },
  {
    name: "Formula: Aptamil AR (anti-reflux) is a real, different product from plain Aptamil at the same size/stage-less wording — never matches",
    run: () => {
      const ar = item("Barbora", "Piimasegu AR APTAMIL 400g, sünnist");
      const plain = item("Rimi", "Piimasegu Aptamil 400g, sünnist");
      assert.equal(sameProduct(ar, plain), false);
      const arAgain = item("Rimi", "Piimasegu Aptamil AR alates sünnist 400g");
      assert.equal(sameProduct(ar, arAgain), true, "the same AR formula, worded differently, still matches");
    },
  },
  {
    name: "Formula: real bug — 'Comfort' with a SPACED stage digit ('Comfort 2') silently dropped the digit, since NAMED_VARIANTS returns on its first match (the plain 'comfort' entry) and never reaches the numeric fallback; and whichever word order a store uses, 'Comfort'/'Comfort1' coming before the real brand must not become the pseudo-brand",
    run: () => {
      assert.equal(extractVariant("Piimasegu Aptamil Comfort sünnist 400g"), "comfort");
      assert.equal(extractVariant("Piimasegu Aptamil Comfort 2 al. 6k 400g"), "comfort2");
      assert.equal(extractBrand("Piimasegu Comfort nr1 0+, APTAMIL, 400 g"), "aptamil");
      assert.equal(extractBrand("Piimasegu Comfort1 APTAMIL 400g, sünnist"), "aptamil");

      // The real case this fixes: two DIFFERENT real Rimi products
      // (Comfort stage 1, implied, vs Comfort stage 2) used to extract
      // the identical "comfort" variant and only avoided a wrong match
      // because they came from the same store — a genuine cross-store
      // stage-2 Comfort pair would have wrongly matched a stage-1 one.
      const comfort1 = item("Rimi", "Piimasegu Aptamil Comfort sünnist 400g");
      const comfort2 = item("Rimi", "Piimasegu Aptamil Comfort 2 al. 6k 400g");
      assert.equal(sameProduct(comfort1, comfort2), false);
    },
  },
  {
    name: "Formula: real bug — Selver's 'nr1'/'nr2' stage shorthand (fused, no space) extracted no variant at all, the same fused-digit root cause as Comfort/Plus — HOLLE's plain organic formula (no stage stated) correctly stays unmatched against either of Selver's goat-milk-specific nr1/nr2 listings rather than ambiguously matching both",
    run: () => {
      assert.equal(extractVariant("Kitsepiimasegu nr1 0+, HOLLE, 400 g"), "1");
      assert.equal(extractVariant("Kitsepiimasegu nr2 6+, HOLLE, 400 g"), "2");

      const holleBarbora = item("Barbora", "Mahepiimasegu imikutele HOLLE 400g sünn.");
      const holleNr1 = item("Selver", "Kitsepiimasegu nr1 0+, HOLLE, 400 g");
      const holleNr2 = item("Selver", "Kitsepiimasegu nr2 6+, HOLLE, 400 g");
      assert.equal(sameProduct(holleBarbora, holleNr1), false);
      assert.equal(sameProduct(holleBarbora, holleNr2), false);
      assert.equal(sameProduct(holleNr1, holleNr2), false, "sanity: the two Selver stages never match each other either");
    },
  },

  // --- Produce: type and variety ---
  {
    name: 'Produce: Rimi "Tomat 1kl, kg" vs Barbora "Tomat lahtine 1 kl., kg" -> true',
    run: () =>
      assert.equal(sameProduct(item("Rimi", "Tomat 1kl, kg"), item("Barbora", "Tomat lahtine 1 kl., kg")), true),
  },
  {
    name: "Produce: Banaan Cavendish vs plain Banaan -> false",
    run: () =>
      assert.equal(sameProduct(item("Rimi", "Banaan Cavendish 1kl, kg"), item("Barbora", "Banaan, kg")), false),
  },
  {
    name: "Produce: Õun Granny Smith vs Õun Kanzi -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Õun Granny Smith 1kl., kg"), item("Barbora", "Õun Kanzi 1kl., kg")),
        false
      ),
  },
  {
    name: "Produce: Punane kapsas vs Kapsas punane, cross-store, word order -> true",
    run: () =>
      assert.equal(sameProduct(item("Barbora", "Punane kapsas, kg"), item("Rimi", "Kapsas punane, kg")), true),
  },

  // --- Color and qualifiers ---
  {
    name: "Color: Ploom sinine vs Ploom punane -> false",
    run: () =>
      assert.equal(sameProduct(item("Barbora", "Ploom sinine, kg"), item("Rimi", "Ploom punane kg")), false),
  },
  {
    name: "Color: Paprika kollane vs Paprika punane -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Paprika kollane 1.kl.,kg"), item("Rimi", "Paprika punane 1kl, kg")),
        false
      ),
  },
  {
    name: "Qualifier: Väikesed banaanid (fresh) vs Kuivatatud banaanid (dried) -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Väikesed banaanid pakitud, 250g"), item("Rimi", "Kuivatatud banaanid, 250 g")),
        false
      ),
  },

  // --- Brand versus produce-shaped ---
  {
    name: "Brand vs produce-shaped: WELL DONE vaarikad vs Rimi's own vaarikad -> false",
    run: () =>
      assert.equal(sameProduct(item("Barbora", "Vaarikad WELL DONE, 125g"), item("Rimi", "Vaarikad Rimi 125g")), false),
  },
  {
    name: "Brand vs produce-shaped: Kirsstomat Zebrino vs Kirsstomat ... Intsu Talu -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Kirsstomat Zebrino WELL DONE, 250g"), item("Rimi", "Kirsstomat punane Intsu Talu 1kl, 250g")),
        false
      ),
  },
  {
    name: "Brand vs produce-shaped: Tomati mix unbranded vs Tomati mix Võiste Aiand -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Tomati mix pakitud 500g"), item("Rimi", "Tomati mix Võiste Aiand 500g")),
        false
      ),
  },
  {
    name: "Brand vs produce-shaped: Mustikad WELL DONE vs Mustikad Rimi -> false (brand path still wins even though 'mustikad' is now a recognized produce type)",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Mustikad WELL DONE, 400g"), item("Rimi", "Mustikad Rimi 400g")),
        false
      ),
  },
  {
    name: "Known brand, different vegetable: Kadarbiku carrot vs Kadarbiku beet -> false",
    run: () =>
      // Same brand, same size — but a real false positive found in
      // production data: type must also agree under a known brand.
      assert.equal(
        sameProduct(item("Barbora", "Porgand pestud pakitud KADARBIKU 500g"), item("Rimi", "Peet aurutatud kooritud Kadarbiku 500g")),
        false
      ),
  },
  {
    name: "Known brand, different vegetable: Kadarbiku beet vs Kadarbiku sauerkraut -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Aurutatud punapeet KADARBIKU,500g"), item("Rimi", "Hapukapsas Kadarbiku 500g")),
        false
      ),
  },

  // --- Identity qualifiers: organic, flavour, and quality grade ---
  {
    name: "Qualifier: mahe (organic) on only one side blocks the match -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Viinamari hele, seemneteta, 500g"), item("Rimi", "Viinamari hele seemneteta mahe 1kl 500G")),
        false
      ),
  },
  {
    name: 'Qualifier: "-ga" flavour word (küüslauguga = with garlic) vs plain -> false',
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Soolakurk küüslauguga, 500g"), item("Rimi", "Soolakurk värske 500g/300g")),
        false
      ),
  },
  {
    name: "Qualifier: explicit grade 2 vs unstated grade -> false",
    run: () =>
      assert.equal(
        sameProduct(item("Barbora", "Pirn Conference pakitud, 1kg"), item("Rimi", "Pirn Conference pakitud väike 2kl 1kg")),
        false
      ),
  },

  // --- Country/leftover words, unit labels, and phrase brands ---
  {
    name: 'Country word: "Eesti punane kartul pestud, kg" vs "Kartul punane pestud, kg Eesti" -> true, "Eesti" is not a variety on either side',
    run: () => {
      // Both sides reduce to the colour alone, so this matches on an
      // exact variety, with no case-insensitive fallback involved.
      assert.equal(extractProduceVariant("Eesti punane kartul pestud, kg"), "punane");
      assert.equal(extractProduceVariant("Kartul punane pestud, kg Eesti"), "punane");
      assert.equal(
        sameProduct(item("Barbora", "Eesti punane kartul pestud, kg"), item("Rimi", "Kartul punane pestud, kg Eesti")),
        true
      );
    },
  },
  {
    name: 'Country word must not swallow a cultivar: "Õun pakitud" vs "Eesti õun Krista" -> false',
    run: () => {
      // Regression guard: skipping "Eesti" must not shift "Krista"
      // into the type position and erase it. The type is removed from
      // the variety by identity, not by position — see
      // extractProduceVariant.
      assert.equal(extractProduceVariant("Eesti õun Krista 70+ mm 1kl, kg"), "krista");
      assert.equal(
        sameProduct(item("Barbora", "Õun pakitud 1kl., kg"), item("Rimi", "Eesti õun Krista 70+ mm 1kl, kg")),
        false
      );
    },
  },
  {
    name: 'Phrase brand: Marineeritud šampinjonid vs same + "Eesti And" -> false, blocked by known-brand asymmetry',
    run: () => {
      // "Eesti And" is a real producer, matched as a whole phrase
      // before "Eesti" alone gets skipped — so this is the same
      // asymmetry rule as the Tomati mix case, not a variety quarrel.
      assert.equal(hasKnownBrand("Marineeritud šampinjonid Eesti And 500g/300g"), true);
      assert.equal(hasKnownBrand("Marineeritud šampinjonid 500g"), false);
      assert.equal(
        sameProduct(
          item("Barbora", "Marineeritud šampinjonid 500g"),
          item("Rimi", "Marineeritud šampinjonid Eesti And 500g/300g")
        ),
        false
      );
    },
  },
  {
    name: "Vocabulary: Lillkapsas matches across stores (cauliflower, added this round)",
    run: () => {
      assert.equal(extractType("Lillkapsas, kg"), "lillkapsas");
      assert.equal(sameProduct(item("Barbora", "Lillkapsas, kg"), item("Rimi", "Lillkapsas kg")), true);
    },
  },
  {
    name: "Frillice: same salad, but the stores price it on different bases (kg vs tk) -> false",
    run: () => {
      // Barbora states no unit in the name; its own per-unit price
      // label says kg (17,38 €/kg), which is what fills the gap. Rimi
      // sells the same salad but writes "tk" in the name. Documented
      // as a real, still-unresolved miss: the variety side agrees
      // (Frillice/frillice is bridged case-insensitively), only the
      // unit basis disagrees.
      const barbora = { ...item("Barbora", "Salat Frillice pakis GRÜNE FEE"), unit: "kg" };
      const rimi = item("Rimi", "Salat frillice lõig. Grüne Fee, tk");
      assert.equal(sameProduct(barbora, rimi), false);
      // With the basis held equal, the name difference alone does not
      // block it — proving the capitalization bridge works.
      assert.equal(
        sameProduct({ ...item("Barbora", "Salat Frillice pakis GRÜNE FEE, tk"), unit: "tk" }, rimi),
        true
      );
    },
  },

  // --- Cooking method and compounds ---
  {
    name: "Cooking method: Aurutatud punapeet vs Aurutatud kartuliviilud -> false, neither types as aurutatud",
    run: () => {
      assert.equal(
        sameProduct(item("Barbora", "Aurutatud punapeet KADARBIKU,500g"), item("Rimi", "Aurutatud kartuliviilud 500g")),
        false
      );
      assert.equal(extractType("Aurutatud punapeet KADARBIKU,500g"), "punapeet");
      // Stale as literally worded when this suite was requested —
      // "kartuliviilud" itself now normalizes to "kartul" (test 16,
      // the later compound-suffix fix). What actually matters here,
      // and still holds, is that it's never "aurutatud".
      assert.equal(extractType("Aurutatud kartuliviilud 500g"), "kartul");
    },
  },
  {
    name: 'Compound: "Kartuliviilud" types as "kartul"',
    run: () => assert.equal(extractType("Kartuliviilud 500g"), "kartul"),
  },
  {
    name: 'Compound: "Riiv.peet" types as "peet"',
    run: () => assert.equal(extractType("Riiv.peet 350g"), "peet"),
  },
  {
    name: 'Compound: "Salatisibul" does NOT type as "salat"',
    run: () => {
      // "salatisibul" is now its own whitelisted word (spring onion —
      // a different vegetable from "salat"/lettuce, whose name just
      // happens to start with those letters), so it's recognized
      // produce in its own right rather than merely avoiding a wrong
      // match via the compound-suffix rejection this test originally
      // exercised.
      assert.equal(extractType("Salatisibul, kg"), "salatisibul");
      assert.notEqual(extractType("Salatisibul, kg"), "salat");
      assert.equal(isProduceItem("Salatisibul, kg"), true);
    },
  },
  {
    name: 'Compound: "Granaatõun" does NOT type as "õun"',
    run: () => assert.equal(extractType("Granaatõun, kg"), "granaatõun"),
  },
  {
    name: 'Compound: "Peakapsas" does NOT type as "kapsas"',
    run: () => assert.equal(extractType("Peakapsas, kg"), "peakapsas"),
  },
  {
    name: 'Compound: "Nuikapsas" does NOT type as "kapsas"',
    run: () => assert.equal(extractType("Nuikapsas, kg"), "nuikapsas"),
  },
  {
    name: 'Compound: "Vaarikatomat" does NOT type as "tomat"',
    run: () => assert.equal(extractType("Vaarikatomat 1kl.,kg"), "vaarikatomat"),
  },

  // --- Colour skip-list and split weights ---
  {
    name: "Colour word is skipped as a pseudo-brand, same as Eesti: two different red things don't collide",
    run: () =>
      // "sõstar" (currant) and "koonuskapsas" (a cone cabbage) aren't
      // whitelisted types, so both would fall back to their leading
      // capitalized word — which is "Punane" (red) on both sides
      // purely by coincidence. Without the skip, that reads as the
      // same "brand"; with it, neither extracts a brand at all, so
      // they land in unclassified rather than falsely matching.
      assert.equal(
        sameProduct(item("Barbora", "Punane sõstar, 125g"), item("Rimi", "Punane koonuskapsas Eesti, kg")),
        false
      ),
  },
  {
    name: 'Colour: "hele"/"tume" (light/dark) tracked like the named colours — dark plum has exactly one partner, not two',
    run: () => {
      // The real gap found by hand: "Ploom tume, kg" was ambiguous
      // between a real dark-plum match and a light-plum listing,
      // since neither word was tracked before this.
      assert.equal(sameProduct(item("Barbora", "Ploom tume, kg"), item("Rimi", "Ploom tume 1kl, kg")), true);
      assert.equal(sameProduct(item("Barbora", "Ploom tume, kg"), item("Rimi", "Ploom hele kg")), false);
    },
  },
  {
    name: 'Split weight "A/B" resolves consistently to the first number regardless of which side states the unit',
    run: () => {
      assert.equal(extractSize("Soolakurk värske ämbris Peipsi 1150g/500g"), "1150g");
      assert.equal(extractSize("Marineeritud punane sibul 400/200g"), "400g");
    },
  },
  {
    name: "Size normalization: comma vs period and unit both collapse to the same real quantity",
    run: () => {
      assert.equal(extractSize("Karastusjook COCA-COLA 1.5L"), extractSize("Karastusjook Coca-Cola 1,5l"));
      assert.equal(extractSize("Karastusjook COCA-COLA 1.5L"), extractSize("Karastusjook Coca-Cola 1500ml"));
      assert.equal(extractSize("Karastusjook COCA-COLA Zero 500ml"), extractSize("Karastusjook Coca-Cola Zero 0,5l"));
      assert.equal(extractSize("Karastusjook FANTA orange 850ml"), extractSize("Karastusjook Fanta Orange 0,85l"));

      // A multipack keeps its own count, normalized the same way on
      // both sides of the "x" — but never equals a single bottle of
      // the same per-unit size, even after normalization.
      assert.equal(extractSize("Karastusjook COCA-COLA Zero 6x330ml"), extractSize("Karastusjook Coca-Cola Zero 6x0,33l"));
      assert.notEqual(extractSize("Karastusjook COCA-COLA Zero 6x330ml"), extractSize("Karastusjook Coca-Cola Zero 330ml"));
    },
  },
  {
    name: 'A lone "100%" is not read as a fat percentage — real case: Cido köögiviljamahl matches whether or not one side prints the "100%" badge',
    run: () => {
      const withBadge = dairyItem("Selver", "Köögiviljamahl 100%, CIDO, 1 L", "CIDO");
      const withoutBadge = dairyItem("Barbora", "Köögiviljamahl CIDO 1L", "CIDO");
      assert.equal(sameProduct(withBadge, withoutBadge), true);

      // A range that merely starts at 100 is a real, different fat %
      // and must still block — only the bare "100%" is special-cased.
      const range = dairyItem("Rimi", "Piim täisrasvane 100-105% 1L", "CIDO");
      assert.equal(sameProduct(withoutBadge, range), false);
    },
  },
  {
    name: 'Known brand abbreviations are stripped from descriptors — real case: Barbora\'s "EP" (Eesti Pagar) no longer leaves a stray leftover word',
    run: () => {
      const abbreviated = dairyItem("Barbora", "Peedi-porgandi-pastinaagi pehmik EP 240g", "EESTI PAGAR");
      const spelledOut = dairyItem("Selver", "Peedi-porgandi-pastinaagi pehmik, EESTI PAGAR, 240 g", "EESTI PAGAR");
      assert.equal(sameProduct(abbreviated, spelledOut), true);

      const abbreviated2 = dairyItem("Barbora", "Kartuli-röstsibula Pehmik EP 240g", "EESTI PAGAR");
      const spelledOut2 = dairyItem("Selver", "Kartuli-röstsibula Pehmik, EESTI PAGAR, 240g", "EESTI PAGAR");
      assert.equal(sameProduct(abbreviated2, spelledOut2), true);

      // "EP" must not turn into a universal wildcard — a genuinely
      // different product from the same brand still doesn't match.
      assert.equal(sameProduct(abbreviated, spelledOut2), false);
    },
  },

  // --- Dairy: strict packaged-product matching ---
  {
    name: "Dairy: different real brand, same generic word and size -> false (Farmi vs Alma milk)",
    run: () =>
      assert.equal(
        sameProduct(
          dairyItem("Barbora", "Piim 2,5% FARMI 1l kiles", "FARMI"),
          dairyItem("Rimi", "Piim Alma 2,5% 1l", "Alma")
        ),
        false
      ),
  },
  {
    name: "Dairy: same brand, different fat % -> false (Alma 0.05% vs Alma 2,5%)",
    run: () =>
      assert.equal(
        sameProduct(
          dairyItem("Barbora", "Piim ALMA 0.05% 1L", "ALMA"),
          dairyItem("Rimi", "Piim Alma kile 2,5% 1l", "Alma")
        ),
        false
      ),
  },
  {
    name: "Dairy: ghee is not butter -> false, even same size (different brand and fat %)",
    run: () =>
      assert.equal(
        sameProduct(
          dairyItem("Barbora", "Või SAULUTE GoldenGhee selitat.99,9%500g", "SAULUTE"),
          dairyItem("Rimi", "Või soolata Valio 500g", "Valio")
        ),
        false
      ),
  },
  {
    name: "Dairy: two Alma Muah yoghurts each match only their own flavour, never each other's",
    run: () => {
      const barboraRukkileib = dairyItem("Barbora", "Koorejogurt ALMA Muah r.leiv-kaneel,380g", "ALMA");
      const barboraStracciatella = dairyItem("Barbora", "Koorejogurt ALMA Muah stracciatella,380g", "ALMA");
      const rimiStracciatella = dairyItem("Rimi", "Koorejogurt stracciatella Muah Alma 380g", "Alma");

      // The real false positive this guards against: rukkileib-kaneel
      // (rye bread & cinnamon) is not stracciatella, no matter that
      // brand and size agree.
      assert.equal(sameProduct(barboraRukkileib, rimiStracciatella), false);
      // stracciatella matches its own flavour correctly.
      assert.equal(sameProduct(barboraStracciatella, rimiStracciatella), true);
    },
  },
  {
    name: "Dairy: strict categories never take the produce path, even when a flavour word is a whitelisted produce type",
    run: () => {
      // "kiivi" is a whitelisted produce type (see PRODUCE_TYPES), so
      // this pair is isProduce:true on both sides — but strict
      // packaging must route it through brand/size/fat %/descriptors
      // regardless, never through sameProduceItem (which doesn't
      // check brand at all).
      const barboraFarmi = dairyItem("Barbora", "Koorene jogurt FARMI kiivi-tikri 400g", "FARMI");
      const rimiFarmi = dairyItem("Rimi", "Koorene jogurt kiivi-tikri Farmi 400g", "Farmi");
      const rimiAlma = dairyItem("Rimi", "Koorene jogurt ALMA kiivi-tikri 400g", "Alma");

      assert.equal(isProduceItem(barboraFarmi.name), true, "sanity check: this name really is produce-shaped");
      // Same flavour, same real brand -> still matches, now via the
      // strict path instead of the produce path.
      assert.equal(sameProduct(barboraFarmi, rimiFarmi), true);
      // Same flavour, DIFFERENT real brand -> must not match. The
      // produce path would ignore brand entirely and match this
      // wrongly; only the strict path catches it.
      assert.equal(sameProduct(barboraFarmi, rimiAlma), false);
    },
  },
  {
    name: "Dairy: strict categories never run the produce-type scan at all — a coincidental whole-word collision (WELL DONE eggs abbreviated as \"peet\") no longer types as beet",
    run: () => {
      // Real case: Barbora abbreviates "vabapidamisel peetavate
      // kanade munad" (free-range eggs) down to "Vab.peet.kanade
      // munad" — the period-separated fragment "peet" happens to be
      // the whole word for beet (see PRODUCE_TYPES), which used to
      // get picked up as this item's produce type even though Dairy
      // is strict packaging and none of this is actually produce.
      const eggs = dairyItem("Barbora", "Vab.peet.kanade munad M WELL DONE 10tk", "WELL DONE");
      assert.equal(isProduceItem(eggs.name, { strictPackaging: true }), false);
      assert.equal(extractType(eggs.name, { strictPackaging: true }), "vab");

      // Un-gated (the default), the same name still finds "peet" —
      // proves the fix is the strict-category gate, not that "peet"
      // stopped being a recognized produce word in general.
      assert.equal(extractType(eggs.name), "peet");

      // The type-must-agree check for a recognized brand (WELL DONE
      // is in KNOWN_BRANDS) is where this leaked into a real matching
      // decision: two WELL DONE items — an egg carton and an
      // unrelated product — must never accidentally agree on type
      // just because "peet" was misread out of the egg carton's name.
      const beet = dairyItem("Rimi", "Riivitud peet WELL DONE 400g", "WELL DONE");
      assert.notEqual(computeSignature(eggs).type, computeSignature(beet).type);
    },
  },

  // --- Bread ---
  {
    name: "Bread: sliced vs whole (viilutatud) never match, even same brand/type/size — caught by the generic descriptors check, no dedicated rule needed",
    run: () => {
      // Real case found reviewing the first Bread scrape: Selver
      // states "viilutatud" explicitly on many items that also exist
      // unsliced at Barbora/Rimi under the same brand/size. There's no
      // dedicated sliced/whole qualifier in match-products.js —
      // "viilutatud" is just leftover text that lands in `descriptors`
      // like any other word, and strict packaging's descriptors check
      // (present on one side, absent on the other -> blocked) already
      // catches it as a side effect. This test exists so that stays
      // true on purpose, not by accident.
      const whole = dairyItem("Barbora", "Tallinna peenleib LEIBUR 490g", "LEIBUR");
      const sliced = dairyItem("Selver", "Tallinna peenleib viilutatud, LEIBUR, 490 g", "LEIBUR");
      assert.equal(sameProduct(whole, sliced), false);

      // Same case Selver actually has: "1/2 viilutatud" (half-sliced)
      // is its own distinct real product, not a wording variant of
      // either "whole" or "fully sliced" — must not match either one.
      const halfSliced = dairyItem("Selver", "Pealinna peenleib 1/2 viilutatud, EESTI PAGAR, 490 g", "EESTI PAGAR");
      const fullSlicedSameBrand = dairyItem("Barbora", "Pealinna peenleib viilutatud EESTI PAGAR 490g", "EESTI PAGAR");
      assert.equal(sameProduct(halfSliced, fullSlicedSameBrand), false);
    },
  },
  {
    name: "Bread: a store's own private label (Rimi Smart) never matches another store's item just because size/type happen to agree",
    run: () => {
      // Real case: "Röstsai mitmevilja Rimi Smart 500g" is Rimi's own
      // in-house brand — no equivalent exists at Barbora/Selver by
      // definition, but if the brand field were ever ignored (or
      // guessed from the name instead of used from real store data),
      // this could wrongly match any other multigrain röstsai at the
      // same size.
      const rimiOwnBrand = dairyItem("Rimi", "Röstsai mitmevilja Rimi Smart 500g", "Rimi Smart");
      const otherBrand = dairyItem("Barbora", "Mitmevilja röstsai LEIBUR 500g", "LEIBUR");
      assert.equal(sameProduct(rimiOwnBrand, otherBrand), false);
    },
  },

  // --- Drinks ---
  {
    name: "Drinks: a multipack never matches a single bottle of the same brand, even at the equivalent per-unit size",
    run: () => {
      const single = dairyItem("Barbora", "Karastusjook COCA-COLA 330ml", "COCA-COLA");
      const multipack = dairyItem("Selver", "Karastusjook Coca-Cola 24-kast, COCA-COLA, 24 x 330 ml", "COCA-COLA");
      assert.equal(extractSize(single.name), "330ml");
      assert.equal(extractSize(multipack.name), "24x330ml", "sanity check: the multipack pattern is checked before the plain-size pattern, so this never simplifies down to \"330ml\"");
      assert.equal(sameProduct(single, multipack), false);
    },
  },
  {
    name: "Drinks: sugar-free/zero never matches the regular version, same brand and size",
    run: () => {
      const regular = dairyItem("Rimi", "Karastusjook Coca-Cola 2l", "COCA-COLA");
      const zero = dairyItem("Barbora", "Karastusjook COCA-COLA Zero 2L", "COCA-COLA");
      assert.equal(sameProduct(regular, zero), false);
    },
  },
  {
    name: "Drinks: 100% juice never matches nectar, even same brand/fruit/size — they're different compound words (mahl vs nektar), not just a wording variant",
    run: () => {
      const juice = dairyItem("Barbora", "Õunamahl AURA 100% 1L", "AURA");
      const nectar = dairyItem("Selver", "Õunanektar, AURA, 1 L", "AURA");
      assert.equal(sameProduct(juice, nectar), false);

      // Flavours must also agree between two real nectars.
      const plumNectar = dairyItem("Barbora", "Ploominektar AURA 1L", "AURA");
      const grapeNectar = dairyItem("Rimi", "Viinamarjanektar Aura 1l", "AURA");
      assert.equal(sameProduct(plumNectar, grapeNectar), false);
    },
  },
  {
    name: "Drinks: can vs bottle — a real size difference (0.33L vs 0.5L) blocks the match even for the exact same drink and brand",
    run: () => {
      const can = dairyItem("Barbora", "Karastusjook COCA-COLA 330ml", "COCA-COLA");
      const bottle = dairyItem("Selver", "Karastusjook Coca-Cola, COCA-COLA, 500 ml", "COCA-COLA");
      assert.equal(sameProduct(can, bottle), false);
    },
  },

  // --- Meat ---
  {
    name: "Meat: different pack weights match when everything else agrees, including \"sold per kg\" (no weight in the name) vs a fixed pack",
    run: () => {
      const pack400 = buildItem("Meat", "Barbora", "Veisehakkliha WELL DONE,400g", { brand: "WELL DONE" });
      const pack600 = buildItem("Meat", "Rimi", "Veisehakkliha Well Done 600g", { brand: "WELL DONE" });
      assert.equal(sameProduct(pack400, pack600), true);

      // "kg" (no digit at all — sold per kg, weight chosen at
      // checkout) must also match a fixed pack of the real real cut —
      // most of Meat's actual inventory has no weight in the name.
      const perKg = buildItem("Meat", "Selver", "Veisehakkliha, WELL DONE, kg", { brand: "WELL DONE" });
      assert.equal(sameProduct(pack400, perKg), true);
    },
  },
  {
    name: "Meat: a multipack never matches a single pack, even at the same brand/cut/weight-per-unit",
    run: () => {
      const single = buildItem("Meat", "Barbora", "Seahakkliha WELL DONE,500g", { brand: "WELL DONE" });
      const multipack = buildItem("Meat", "Selver", "HULGI Seahakkliha 2tk, WELL DONE, 2 x 500g", { brand: "WELL DONE" });
      assert.equal(sameProduct(single, multipack), false);
    },
  },
  {
    name: "Meat: frozen never matches fresh, but \"jahutatud\" (chilled) stated on only one side does not block — it just restates the default",
    run: () => {
      const fresh = buildItem("Meat", "Barbora", "Broilerikoib TALLEGG, kg", { brand: "TALLEGG" });
      const frozen = buildItem("Meat", "Rimi", "Külmutatud broilerikoib Tallegg kg", { brand: "TALLEGG" });
      assert.equal(sameProduct(fresh, frozen), false);

      const chilled = buildItem("Meat", "Rimi", "Jahutatud broilerikoib Tallegg kg", { brand: "TALLEGG" });
      assert.equal(sameProduct(fresh, chilled), true);
    },
  },
  {
    name: "Meat: marinated never matches plain, and two different marinade flavours never match each other",
    run: () => {
      const plain = buildItem("Meat", "Barbora", "Broileri poolkoivad TALLEGG, 800g", { brand: "TALLEGG" });
      const marinated = buildItem("Meat", "Rimi", "Broileri poolkoivad klassikalises marinaadis Tallegg 800g", { brand: "TALLEGG" });
      assert.equal(sameProduct(plain, marinated), false);

      const otherMarinade = buildItem("Meat", "Selver", "Broileri poolkoivad mustikamarinaadis, TALLEGG, 800 g", { brand: "TALLEGG" });
      assert.equal(sameProduct(marinated, otherMarinade), false);

      // Same marinade, abbreviated on one side — must still match.
      const abbreviated = buildItem("Meat", "Barbora", "Br.poolkoivad klassik.marin.TALLEGG,800g", { brand: "TALLEGG" });
      assert.equal(sameProduct(abbreviated, marinated), true);
    },
  },
  {
    name: "Meat: bone-in vs boneless, and skin-on vs skinless, always block — stated on only one side still blocks, for consistency",
    run: () => {
      const boneIn = buildItem("Meat", "Barbora", "Seapraad kondiga, kg", { brand: "" });
      const boneless = buildItem("Meat", "Rimi", "Seapraad kondita Rimi kg", { brand: "" });
      assert.equal(sameProduct(boneIn, boneless), false);

      const skinOn = buildItem("Meat", "Barbora", "Sea välisfilee kamaraga, kg", { brand: "" });
      const skinless = buildItem("Meat", "Rimi", "Sea välisfilee kamarata Rimi kg", { brand: "" });
      assert.equal(sameProduct(skinOn, skinless), false);

      // Unstated (neither word at all) vs stated must also block —
      // never assumed to mean the unstated side is boneless/skinless.
      const unstated = buildItem("Meat", "Selver", "Sea välisfilee, Selver, kg", { brand: "" });
      assert.equal(sameProduct(skinOn, unstated), false);
      assert.equal(sameProduct(skinless, unstated), false);
    },
  },
  {
    name: "Meat: a different cut never matches, even at the same brand and weight",
    run: () => {
      const breast = buildItem("Meat", "Barbora", "Broileri rinnafilee TALLEGG, 400g", { brand: "TALLEGG" });
      const thigh = buildItem("Meat", "Rimi", "Broilerikintsuliha Tallegg 400g", { brand: "TALLEGG" });
      assert.equal(sameProduct(breast, thigh), false);
    },
  },
  {
    name: "Meat: a different mince type (pork vs beef) never matches, even same brand/weight, and \"taine\" (lean) always blocks too",
    run: () => {
      const pork = buildItem("Meat", "Barbora", "Seahakkliha WELL DONE,400g", { brand: "WELL DONE" });
      const beef = buildItem("Meat", "Rimi", "Veisehakkliha Well Done 400g", { brand: "WELL DONE" });
      assert.equal(sameProduct(pork, beef), false);

      const lean = buildItem("Meat", "Selver", "Taine seahakkliha, WELL DONE, 400 g", { brand: "WELL DONE" });
      assert.equal(sameProduct(pork, lean), false);
    },
  },
  {
    name: "Meat: brand abbreviations — Barbora's \"M&M\" and Selver's \"RAKVERE LK\" match the same brand's full/plain name elsewhere",
    run: () => {
      const mm = buildItem("Meat", "Barbora", "Minutipihv seavälisfileest M&M, 400g", { brand: "MAKS & MOORITS" });
      const fullName = buildItem("Meat", "Rimi", "Minutipihv seavälisfileest Maks&Moorits 400g", { brand: "MAKS & MOORITS" });
      assert.equal(sameProduct(mm, fullName), true);

      const rakvereLk = buildItem("Meat", "Selver", "Sea sisefilee, RAKVERE LK, kg", { brand: "RAKVERE" });
      const rakverePlain = buildItem("Meat", "Rimi", "Sea sisefilee Rakvere kg", { brand: "RAKVERE" });
      assert.equal(sameProduct(rakvereLk, rakverePlain), true);
    },
  },

  // --- Flour & sugar ---
  {
    name: "Flour & sugar: different wheat flour grades (T405 vs T550) never match, even same brand/size — the grade digits used to be silently dropped",
    run: () => {
      // Real case, found by hand reviewing every Flour & sugar match:
      // KALEW sells both T405 and T550 at 2kg, at every store. Before
      // this was fixed, "T-550"/"T405" both tokenized down to the
      // same leftover word ("t") — the digits aren't letters, so
      // extractDescriptors' letter-only tokenizer silently dropped
      // them — meaning these two genuinely different flours could
      // have matched on brand+size alone.
      const t550 = buildItem("Flour & sugar", "Barbora", "Nisujahu T-550 KALEW 2kg", { brand: "KALEW" });
      const t405 = buildItem("Flour & sugar", "Selver", "Nisujahu T405, KALEW, 2 kg", { brand: "KALEW" });
      assert.equal(sameProduct(t550, t405), false);
      // A genuine same-grade pair, spelled the same way both sides,
      // still matches — the fix blocks a real disagreement, not every
      // comparison that happens to mention a grade.
      const t550Again = buildItem("Flour & sugar", "Rimi", "Nisujahu T 550 Kalew 2kg", { brand: "KALEW" });
      assert.equal(sameProduct(t550, t550Again), true);

      // Every real spelling of the grade found by hand reads as the
      // same qualifier value — "T-550"/"T550"/"T 550", Rimi's
      // "tüüp 550C", and the bare "550D" form (no "T" at all) — even
      // though "tüüp"/the trailing grade-letter are separate leftover
      // words that can still block a match on their own (a wording
      // difference, not a grade disagreement).
      const tType = buildItem("Flour & sugar", "Rimi", "Nisujahu Kalew tüüp 550C 2kg", { brand: "KALEW" });
      const bareLetter = buildItem("Flour & sugar", "Barbora", "Nisujahu KALEW 550D 2kg", { brand: "KALEW" });
      assert.equal(computeSignature(t550).qualifiers, computeSignature(tType).qualifiers);
      assert.equal(computeSignature(t550).qualifiers, computeSignature(bareLetter).qualifiers);

      // An unrelated number that merely coincides with a grade value
      // (a 550g pack of something with no grade marker at all) must
      // never be misread as a grade — no qualifier, so it stays a
      // plain, ungated comparison.
      const unrelated = buildItem("Flour & sugar", "Barbora", "Suhkur DIAMANT 550g", { brand: "DIAMANT" });
      assert.equal(computeSignature(unrelated).qualifiers, "");
    },
  },
  {
    name: "Qualifiers: 'Mega' and 'omega' are never read as the Estonian comitative case (\"-ga\", with X) — real bug found while adding Diapers & baby wipes, where 'Mega Pack' wholesale listings blocked an otherwise-clean match",
    run: () => {
      const megaPack = buildItem("Diapers & baby wipes", "Rimi", "HULGI Püksmähkmed Mega Pack S5, PAMPERS, 11-18kg/96 tk", { brand: "pampers" });
      const plain = buildItem("Diapers & baby wipes", "Barbora", "Püksmähkmed PAMPERS MP S5 12-17kg 96tk", { brand: "pampers" });
      assert.equal(computeSignature(megaPack).qualifiers, "");
      assert.equal(sameProduct(megaPack, plain), true);

      const omegaOil = buildItem("Baking supplies", "Barbora", "Omega-3 kalaõli MOLLER 250ml", { brand: "MOLLER" });
      assert.equal(computeSignature(omegaOil).qualifiers, "");

      // A real comitative word must still block, same as before —
      // this fix excludes two specific loanwords, not "-ga" entirely.
      const withGarlic = buildItem("Baking supplies", "Barbora", "Salatikaste küüslauguga BALTIC 300g", { brand: "BALTIC" });
      const plainSauce = buildItem("Baking supplies", "Rimi", "Salatikaste BALTIC 300g", { brand: "BALTIC" });
      assert.equal(computeSignature(withGarlic).qualifiers, "küüslauguga");
      assert.equal(sameProduct(withGarlic, plainSauce), false);
    },
  },

  // --- matchPool: shared pool across any number of stores ---
  {
    name: "Pool: a genuine 3-store group (Barbora + Rimi + Selver) becomes one product, not three pairs",
    run: () => {
      const a = dairyItem("Barbora", "Piim ALMA 2,5%, 1L", "Alma");
      const b = dairyItem("Rimi", "Piim Alma 2,5% 1l", "Alma");
      const c = dairyItem("Selver", "Piim 2,5%, ALMA, 1 L", "ALMA");

      const { matches, unmatched, ambiguous } = matchPool([a, b, c]);

      assert.equal(matches.length, 1);
      assert.equal(ambiguous.length, 0);
      assert.equal(unmatched.length, 0);
      assert.deepEqual(
        matches[0].items.map((i) => i.store).sort(),
        ["Barbora", "Rimi", "Selver"]
      );
    },
  },
  {
    name: "Pool: a group matched via an override uses the override's own canonical name, not a synthesized one",
    run: () => {
      // Regression test: matchPool used to always call
      // synthesizeCanonicalName for a group's name, even when the
      // group only came together because of an override — silently
      // discarding the name a person chose in data/products.json.
      const a = item("Barbora", "Täistera röstsepik EESTI PAGAR,500g");
      const b = item("Rimi", "Röstsepik täistera Tosta Eesti Pagar 500g");
      const overrides = [
        {
          name: "Eesti Pagar täistera röstsepik 500g",
          aliases: {
            barbora: "Täistera röstsepik EESTI PAGAR,500g",
            rimi: "Röstsepik täistera Tosta Eesti Pagar 500g",
          },
        },
      ];

      const { matches } = matchPool([a, b], overrides, []);

      assert.equal(matches.length, 1);
      assert.equal(matches[0].reason, "override");
      assert.equal(matches[0].canonicalName, "Eesti Pagar täistera röstsepik 500g");
    },
  },
  {
    name: "Known brand, colour on one side only or different colours: Laheotsa 2kg potato (Selver states \"kollane\", Barbora/Rimi state none) -> false; same colour both sides -> true",
    run: () => {
      // Found by hand in the Step 3 Selver review: brand+size+type
      // agreed, and colour was never checked on the known-brand path,
      // so a yellow and a red potato from the same brand at the same
      // pack size would have matched.
      const rimi = item("Rimi", "Kartul pestud Laheotsa 2kg");
      const selverYellow = item("Selver", "Kartul kollane pakitud, LAHEOTSA, 2 kg");
      assert.equal(sameProduct(rimi, selverYellow), false);

      const rimiYellow = item("Rimi", "Kartul pestud kollane Laheotsa 2kg");
      const selverRed = item("Selver", "Kartul punane pakitud, LAHEOTSA, 2 kg");
      assert.equal(sameProduct(rimiYellow, selverRed), false);

      // Same colour on both sides, wording order differing, still matches.
      assert.equal(sameProduct(rimiYellow, selverYellow), true);
    },
  },
  {
    name: "Selver: brand-at-the-end naming (\"..., FARMI, 370 g\") extracts size/fat %/descriptors the same as Barbora's brand-first naming, real match survives it",
    run: () => {
      // Verified against a real Step 3 case (Farmi Kreeka jogurt
      // 370g) — Selver's brand attribute comes from real store data,
      // not name-parsing, so the position risk is really about
      // size/fat %/descriptors extraction reading past the trailing
      // ", FARMI," rather than getting confused by it.
      const barbora = dairyItem("Barbora", "Kreeka jogurt FARMI 10%, 370g", "FARMI");
      const selver = dairyItem("Selver", "Kreeka jogurt 10%, FARMI, 370 g", "FARMI");
      assert.equal(sameProduct(barbora, selver), true);

      // A different fat % at the same trailing brand position must
      // still block — proves the check isn't accidentally skipped
      // just because the brand sits at the end.
      const selverWrongFat = dairyItem("Selver", "Kreeka jogurt 5%, FARMI, 370 g", "FARMI");
      assert.equal(sameProduct(barbora, selverWrongFat), false);
    },
  },
  {
    name: "Pool: A matches B and B matches C but A does not match C -> whole group goes to ambiguous, not a guess",
    run: () => {
      // Genuinely unrelated products — real automatic matching would
      // never link any of these. Overrides force exactly the two
      // edges this rule needs (A-B, B-C) without forcing A-C, so the
      // chain-but-not-a-clique conflict is deliberate, not incidental
      // to some heuristic's quirk.
      const a = item("Barbora", "Product A");
      const b = item("Rimi", "Product B");
      const c = item("Selver", "Product C");
      const overrides = [
        { name: "X", aliases: { barbora: "Product A", rimi: "Product B" } },
        { name: "Y", aliases: { rimi: "Product B", selver: "Product C" } },
      ];

      assert.equal(sameProduct(a, c), false, "sanity check: A and C really don't match on their own");

      const { matches, unmatched, ambiguous } = matchPool([a, b, c], overrides, []);

      assert.equal(matches.length, 0);
      assert.equal(unmatched.length, 0);
      assert.equal(ambiguous.length, 1);
      assert.deepEqual(
        ambiguous[0].items.map((i) => i.store).sort(),
        ["Barbora", "Rimi", "Selver"]
      );
    },
  },
  // --- Diapers & baby wipes ---
  {
    name: "Diapers: same brand, same size, same piece count, different-looking weight range -> true (the weight range is not the identity)",
    run: () => {
      const barbora = buildItem("Diapers & baby wipes", "Barbora", "Püksmähkmed PAMPERS MP S5 12-17kg 96tk", { brand: "pampers" });
      const rimi = buildItem("Diapers & baby wipes", "Rimi", "HULGI Püksmähkmed Mega Pack S5, PAMPERS, 11-18kg/96 tk", { brand: "pampers" });
      assert.equal(sameProduct(barbora, rimi), true);
    },
  },
  {
    name: "Diapers: same brand and piece count but a different size -> false",
    run: () => {
      const s4 = buildItem("Diapers & baby wipes", "Barbora", "Mähkmed PAMPERS Premium Care S4 60tk", { brand: "pampers" });
      const s5 = buildItem("Diapers & baby wipes", "Rimi", "Mähkmed PAMPERS Premium Care S5 60tk", { brand: "pampers" });
      assert.equal(sameProduct(s4, s5), false);
    },
  },
  {
    name: "Diapers: same brand and size but a different piece count -> false (a different pack size is a different purchase)",
    run: () => {
      const pack60 = buildItem("Diapers & baby wipes", "Barbora", "Mähkmed PAMPERS Premium Care S3,60tk", { brand: "pampers" });
      const pack120 = buildItem("Diapers & baby wipes", "Rimi", "Mähkmed PAMPERS PC MB S3 120tk", { brand: "pampers" });
      assert.equal(sameProduct(pack60, pack120), false);
    },
  },
  {
    name: "Diapers: Barbora's fused abbreviation 'ExtraCare5 12-17kg34tk' (no space before the weight range, none between kg and the piece count) still extracts size 5 and count 34",
    run: () => {
      const fused = buildItem("Diapers & baby wipes", "Barbora", "Püksmähk.HUGGIES ExtraCare5 12-17kg34tk", { brand: "huggies" });
      const spelled = buildItem("Diapers & baby wipes", "Rimi", "Püksmähkmed Extra Care 5, HUGGIES, 12-17kg/34tk", { brand: "huggies" });
      assert.equal(sameProduct(fused, spelled), true);
    },
  },
  {
    name: "Diapers: a wet wipe never matches a diaper, even same brand and same extracted piece count (Pampers sells both)",
    run: () => {
      const wipes = buildItem("Diapers & baby wipes", "Barbora", "Niisked salvrätikud PAMPERS Water, 60tk", { brand: "pampers" });
      const diapers = buildItem("Diapers & baby wipes", "Rimi", "Mähkmed PAMPERS Premium Care S5, 60tk", { brand: "pampers" });
      assert.equal(sameProduct(wipes, diapers), false);
    },
  },
  {
    name: "Diapers: two wet wipes, same brand and piece count, no size number on either side -> true",
    run: () => {
      const a = buildItem("Diapers & baby wipes", "Barbora", "Niisked salvrätikud PAMPERS Water, 60tk", { brand: "pampers" });
      const b = buildItem("Diapers & baby wipes", "Rimi", "Niisked salv.r. Pampers Aqua Soft Touch 60tk", { brand: "pampers" });
      assert.equal(sameProduct(a, b), true);
    },
  },
  {
    name: "Diapers: a 3-pack bundle never matches a single pack of the same brand even when the piece count extracts identically (per-box count, not a stated grand total)",
    run: () => {
      const bundle = buildItem("Diapers & baby wipes", "Rimi", "Niisked salvrätikud Huggies Pure 3 x 48tk", { brand: "huggies" });
      const single = buildItem("Diapers & baby wipes", "Rimi", "Niisked salvrätikud Huggies Pure 48tk", { brand: "huggies" });
      assert.equal(sameProduct(bundle, single), false);
    },
  },
  {
    name: "Diapers: a newborn pack with no size number stated on either side still matches on brand + piece count",
    run: () => {
      const a = buildItem("Diapers & baby wipes", "Barbora", "Mähkmed vastsündinule 2-4 KG, GRØN BALANCE, 28 tk", { brand: "grøn balance" });
      const b = buildItem("Diapers & baby wipes", "Selver", "Mähkmed vastsündinule 2-3 KG, GRØN BALANCE, 28 tk", { brand: "grøn balance" });
      assert.equal(sameProduct(a, b), true);
    },
  },
  {
    name: "Diapers: real bug — the display name used the generic size field (the weight range's own digits, e.g. '17kg' -> '15000g') instead of the real size+count; canonical name now reads 'Pampers Püksmähkmed S5 96tk', never 'Pampers Püksmähkmed 15000g'",
    run: () => {
      const a = buildItem("Diapers & baby wipes", "Barbora", "Püksmähkmed PAMPERS MP S5 12-17kg 96tk", { brand: "pampers" });
      const b = buildItem("Diapers & baby wipes", "Rimi", "HULGI Püksmähkmed Mega Pack S5, PAMPERS, 11-18kg/96 tk", { brand: "pampers" });
      assert.equal(matchItems(a, b).canonicalName, "Pampers Mega Pack Püksmähkmed S5 96tk");

      const wipeA = buildItem("Diapers & baby wipes", "Barbora", "Niisked salvrätikud PAMPERS Water, 60tk", { brand: "pampers" });
      const wipeB = buildItem("Diapers & baby wipes", "Rimi", "Niisked salv.r. Pampers Aqua Soft Touch 60tk", { brand: "pampers" });
      assert.equal(matchItems(wipeA, wipeB).canonicalName, "Pampers Aqua Soft Touch Water Niisked salvrätikud 60tk", "Rimi's 'salv.r.' abbreviation letter never leaks into the name");
      // The stored size is the piece count, so the screen prices per
      // piece — never the baby's weight range as grams.
      assert.equal(computeSignature(a).size, "96tk");
      assert.equal(computeSignature(wipeA).size, "60tk");
    },
  },
  {
    name: "Diapers: the display name carries brand, product line (Barbora's PC/JP/GP/MP/VP abbreviations expanded from the store that spells it out), type, size, piece count, and Boy/Girl when stated — never the weight range",
    run: () => {
      const d = (store, name, brand) => buildItem("Diapers & baby wipes", store, name, { brand });
      assert.equal(matchItems(d("Barbora", "Püksmähk.PAMPERS Prem.Care s5,34tk 11-17", "pampers"), d("Selver", "Püksmähkmed Premium Care, Value Pack S5, PAMPERS, 11-17kg/34 tk", "pampers")).canonicalName, "Pampers Premium Care Value Pack Püksmähkmed S5 34tk");
      assert.equal(matchItems(d("Barbora", "Mähkmed HUGGIES Extra Care S3 72tk", "huggies"), d("Rimi", "Mähkmed Huggies Extra Care 3 6-10kg 72tk", "huggies")).canonicalName, "Huggies Extra Care Mähkmed S3 72tk");
      assert.equal(matchItems(d("Barbora", "Püksmähkm.HUGGIES ExtraCare3 6-11kg 48tk", "huggies"), d("Selver", "Püksmähkmed Extra Care 3, HUGGIES, 6-11kg/48tk", "huggies")).canonicalName, "Huggies Extra Care Püksmähkmed S3 48tk");
      assert.equal(matchItems(d("Barbora", "Püksmähkmed HUGGIES S5 Boy 12-17kg 48tk", "huggies"), d("Selver", "Püksmähkmed Pants Little Movers 5 Boy 12-17kg, HUGGIES, 48 tk", "huggies")).canonicalName, "Huggies Little Movers Püksmähkmed S5 48tk Boy");
      assert.equal(matchItems(d("Barbora", "Püksmähkmed PAMPERS JP S6 13-19kg 42tk", "pampers"), d("Selver", "Püksmähkmed Jumbo Pack S6, PAMPERS, 13-19kg/42tk", "pampers")).canonicalName, "Pampers Jumbo Pack Püksmähkmed S6 42tk");
      const name = matchItems(d("Barbora", "Mähkmed PAMPERS Prem.Care s0,< 3kg 30tk", "pampers"), d("Selver", "Mähkmed Premium Care 0, PAMPERS, < 3 kg/30 tk", "pampers")).canonicalName;
      assert.equal(name, "Pampers Premium Care Mähkmed S0 30tk");
      assert.ok(!/\d+g\b/.test(name) && !/kg/.test(name), "no grams or kg in a diaper name");
    },
  },
  {
    name: "Names: a stated cocoa/fat % and the organic qualifier are part of the display name — real duplicate found: three Kalev dark chocolates (56/70/87%) all read 'Kalev Tume bitter šokolaad 100g'",
    run: () => {
      const choc = (store, name) => buildItem("Chocolate", store, name, { brand: "kalev" });
      const n56 = matchItems(choc("Barbora", "Tume šokolaad bitter 56% KALEV 100g"), choc("Selver", "Tume šokolaad Bitter 56%, KALEV, 100 g")).canonicalName;
      const n70 = matchItems(choc("Barbora", "Tume šokolaad bitter 70% KALEV 100g"), choc("Selver", "Tume šokolaad Bitter 70%, KALEV, 100 g")).canonicalName;
      assert.notEqual(n56, n70);
      assert.ok(n56.includes("56%") && n70.includes("70%"), `${n56} / ${n70}`);
      const jam = (store, name) => buildItem("Jam & honey & spreads", store, name, { brand: "salvest" });
      assert.equal(matchItems(jam("Barbora", "Ökoloogiline SALVEST pirnipüree 450g"), jam("Selver", "Pirnipüree Öko, SALVEST, 450 g")).canonicalName, "Salvest pirnipüree mahe 450g");
    },
  },
  {
    name: "Names: display-only regressions found reviewing every name the change touched — a '-ga' word keeps its leading diacritic, a brand ending in -ga (Selga/Corega) is never repeated as a qualifier, 'maheda' (mild) is not organic, a display word is only ever expanded (Röstsai stays, Mineraalvesi stays), 'lactose-free' shows as laktoosivaba once",
    run: () => {
      const sauce = (store, name) => buildItem("Sauces & condiments", store, name, { brand: "felix" });
      assert.equal(computeSignature(sauce("Barbora", "Pastakaste ürtidega FELIX 360g")).qualifiers, "ürtidega");
      assert.equal(matchItems(sauce("Barbora", "Pastakaste ürtidega FELIX 360g"), sauce("Rimi", "Pastakaste ürtidega Felix 360g")).canonicalName, "Felix Pastakaste ürtidega 360g");
      assert.ok(!computeSignature(sauce("Barbora", "Maheda maitsega sinep FELIX 170g")).qualifiers.split(" ").includes("mahe"), "'maheda' is mild, not organic");
      const pickle = (store, name) => buildItem("Canned food", store, name, { brand: "salvest" });
      assert.equal(matchItems(pickle("Barbora", "Maitselt mahe kurk SALVEST 675g"), pickle("Selver", "Maitselt mahe kurk, SALVEST, 675 g")).canonicalName, "Salvest Maitselt kurk 675g", "a mild pickle is not labelled organic");
      const chips = (store, name) => buildItem("Chips & snacks", store, name, { brand: "estrella" });
      assert.equal(matchItems(chips("Barbora", "Mikropopkorn soolaga ESTRELLA 90g"), chips("Selver", "Mikropopcorn soolaga, ESTRELLA, 90 g")).canonicalName, "Estrella Mikropopkorn soolaga 90g", "one Estonian spelling, shown once");
      const biscuit = (store, name) => buildItem("Biscuits", store, name, { brand: "selga" });
      assert.equal(matchItems(biscuit("Barbora", "Küpsis kookosemaits. SELGA 180g"), biscuit("Rimi", "Küpsis kookosemaitseline Selga 180g")).canonicalName, "Selga Küpsis kookose 180g");
      const bread = (store, name) => buildItem("Bread", store, name, { brand: "leibur" });
      assert.match(matchItems(bread("Barbora", "Röstsai kuldne täistera LEIBUR 500g"), bread("Rimi", "Röstsai kuldne täistera Leibur 500g")).canonicalName, /^Leibur Röstsai /);
      const water = (store, name) => buildItem("Drinks", store, name, { brand: "vytautas" });
      assert.match(matchItems(water("Barbora", "Mineraalvesi VYTAUTAS 1.5L"), water("Rimi", "Mineraalvesi Vytautas 1,5l")).canonicalName, /Mineraalvesi/);
      const cream = (store, name) => buildItem("Cream & sour cream", store, name, { brand: "tere" });
      const creamName = matchItems(cream("Barbora", "Vahukoor laktoosivaba TERE 35% 400ml"), cream("Rimi", "Vahukoor laktoosivaba 35% Tere 400ml")).canonicalName;
      assert.ok(!creamName.includes("lactose-free") && (creamName.match(/laktoosivaba/g) || []).length === 1, creamName);
    },
  },

  // --- Abbreviation-matching round (roadmap step 8) ---
  // Every pair below is a real cross-store pair from data/review.md's
  // "possible matches to check by hand", read by hand. Each "SAME"
  // pair is one the rules must now match; each "DIFF" pair is a
  // genuinely different product that must keep NOT matching even
  // though it shares brand, size and every other word.
  {
    name: "Abbreviations: '-flavoured' fused onto a flavour word in any store's spelling (juustumaitseline / juustumaitsel. / ketšupimaits. / pitsamait.) strips to the flavour word itself; a different flavour still never matches",
    run: () => {
      const chips = (store, name, brand) => buildItem("Chips & snacks", store, name, { brand });
      assert.equal(sameProduct(chips("Barbora", "Maisipallid juustu. Nacho TAFFEL 165g", "taffel"), chips("Selver", "Maisipallid juustumaitselised Nacho, TAFFEL, 165g", "taffel")), true);
      assert.equal(sameProduct(chips("Barbora", "Kartulikrõps.Cheddari maits.TAFFEL 180g", "taffel"), chips("Selver", "Kartulikrõps cheddari maitseline, TAFFEL, 180 g", "taffel")), true);
      assert.equal(sameProduct(chips("Barbora", "Ketšupimaits.maisikrõpsud CHEETOS 165g", "cheetos"), chips("Rimi", "Maisikrõpsud Cheetos ketšupi 165g", "cheetos")), true);
      const tea = (store, name) => buildItem("Tea & cocoa", store, name, { brand: "dilmah" });
      assert.equal(sameProduct(tea("Barbora", "Must tee mustasõstramaits.DILMAH,20x1,5g"), tea("Rimi", "Tee must mustsõstramaitseline Dilmah 20x1,5g")), true, "blackcurrant with and without the linking vowel, once the suffix is gone");
      assert.equal(sameProduct(tea("Barbora", "Must tee mustasõstramaits.DILMAH,20x1,5g"), tea("Rimi", "Tee must vaarikamaitseline Dilmah 20x1,5g")), false, "blackcurrant is not raspberry");
      const ice = (store, name) => buildItem("Ice cream", store, name, { brand: "väike tom" });
      assert.equal(sameProduct(ice("Barbora", "Jäätis VÄIKE TOM lehmakommimaits.,60g"), ice("Rimi", "Jäätis lehmakommi Väike Tom 60g")), true);
      // "maitsestamata"/"maitsestatud" (unflavoured/seasoned) are NOT
      // this suffix — a letter follows "maits" — and must keep blocking.
      const milk = (store, name) => buildItem("Dairy", store, name, { brand: "alma" });
      assert.equal(sameProduct(milk("Barbora", "Piim maitsestamata ALMA 1L"), milk("Rimi", "Piim maitsestatud Alma 1l")), false);
      // The pre-existing "plomb" expansion still meets the other side
      // once both lose the suffix.
      const yog = (store, name) => buildItem("Dairy", store, name, { brand: "farmi" });
      assert.equal(sameProduct(yog("Barbora", "Jogurt marja-plomb. FARMI 380g"), yog("Rimi", "Jogurt marja-plombiirimaitseline Farmi 380g")), true);
    },
  },
  {
    name: "Abbreviations: potato-chip synonyms (krõpsud / kartulikrõps / kartulilaastud / Selver's typo kartuliaastud) and spelling variants (originaal, till/tilli, popkorn/popcorn) — a different flavour or sweet vs salty still never matches",
    run: () => {
      const chips = (store, name, brand) => buildItem("Chips & snacks", store, name, { brand });
      assert.equal(sameProduct(chips("Barbora", "Krõpsud Original PRINGLES 165g", "pringles"), chips("Rimi", "Krõpsud Pringles Originaal 165g", "pringles")), true);
      assert.equal(sameProduct(chips("Barbora", "Krõpsud PRINGLES Hot&Spicy,165g", "pringles"), chips("Rimi", "Kartulikrõpsud Hot&Spicy Pringles 165g", "pringles")), true);
      assert.equal(sameProduct(chips("Rimi", "Kartulikrõpsud juustumaitselised Taffel 180g", "taffel"), chips("Selver", "Juustumaitselised kartuliaastud, TAFFEL, 180g", "taffel")), true);
      assert.equal(sameProduct(chips("Barbora", "Kartulivahvel hapukoore/till BALSNACK90g", "balsnack"), chips("Rimi", "Kartulivahvel hapukoore-tilli Balsnack 90g", "balsnack")), true);
      assert.equal(sameProduct(chips("Barbora", "Kartulikrõpsud Peekoni PRINGLES, 165g", "pringles"), chips("Rimi", "Kartulikrõpsud juustu Pringles 165g", "pringles")), false, "bacon is not cheese");
      assert.equal(sameProduct(chips("Rimi", "Kartulikrõpsud juustu Pringles 165g", "pringles"), chips("Selver", "Kartulikrõpsud Juustu-sibula, PRINGLES, 165 g", "pringles")), false, "cheese is not cheese-onion");
      assert.equal(sameProduct(chips("Barbora", "Magus mikropopkorn ESTRELLA 90g", "estrella"), chips("Rimi", "Mikropopkorn soolane Estrella 90g", "estrella")), false, "sweet is not salty");
    },
  },
  {
    name: "Abbreviations: Pasta drops its own generic words (makaronid / makar. / pasta / durum(nisu(jahu)pasta)) as implied, translates sarvekesed to chifferini, fixes Rimi's 'rigatte' — but whole grain, tri-colour, a different shape, Premium and a quick-cook line still never match",
    run: () => {
      const pasta = (store, name, brand) => buildItem("Pasta", store, name, { brand });
      assert.equal(sameProduct(pasta("Barbora", "Makaronid Fusilli DELVERDE 500g", "delverde"), pasta("Selver", "Fusilli, DELVERDE, 500 g", "delverde")), true);
      assert.equal(sameProduct(pasta("Barbora", "Makaronid Penne TARTU MILL 500g", "tartu mill"), pasta("Rimi", "Durumnisupasta Penne Tartu Mill 500g", "tartu mill")), true);
      assert.equal(sameProduct(pasta("Barbora", "Täistera makar.Fusilli TARTU MILL 500g", "tartu mill"), pasta("Selver", "Täistera fusilli, TARTU MILL, 500 g", "tartu mill")), true);
      assert.equal(sameProduct(pasta("Barbora", "Makaronid sarvekesed PANZANI 500g", "panzani"), pasta("Rimi", "Makaronid Chifferini Panzani 500g", "panzani")), true);
      assert.equal(sameProduct(pasta("Rimi", "Makaronid Chifferini Panzani 500g", "panzani"), pasta("Selver", "Sarveke Chifferini, PANZANI, 500 g", "panzani")), true);
      assert.equal(sameProduct(pasta("Barbora", "Makaronid Penne Rigate PANZANI 500g", "panzani"), pasta("Rimi", "Makaronid Penne Rigatte Panzani 500g", "panzani")), true);
      assert.equal(sameProduct(pasta("Barbora", "Makaronid Fusilli TARTU MILL 500g", "tartu mill"), pasta("Selver", "Täistera fusilli, TARTU MILL, 500 g", "tartu mill")), false, "whole grain is a different product");
      assert.equal(sameProduct(pasta("Barbora", "Makaronid spiraalid Fusilli PANZANI 500g", "panzani"), pasta("Rimi", "Makaronid 3-värvilised Fusilli Panzani 500g", "panzani")), false, "tri-colour is a different product");
      assert.equal(sameProduct(pasta("Barbora", "Makaronid Penne Rigate PANZANI 500g", "panzani"), pasta("Rimi", "Makaronid Conchiglie Rigate Panzani 500g", "panzani")), false, "a different shape");
      assert.equal(sameProduct(pasta("Barbora", "Spagetid Premium PANZANI 500g", "panzani"), pasta("Selver", "Spagetid Spaghetti, PANZANI, 500 g", "panzani")), false, "Premium left for the owner to decide");
      // "pasta" is only implied inside the Pasta category — elsewhere
      // it stays a real word (a paste), so nothing outside Pasta
      // changes.
      assert.equal(computeSignature(buildItem("Spices", "Rimi", "Karri pasta Santa Maria 100g", { brand: "santa maria" })).descriptors, "karri pasta");
    },
  },
  {
    name: "Abbreviations: Barbora's 'Külm.' expands to 'külmutatud' everywhere, and only the frozen categories drop it as implied — a frozen cut in Meat still never matches a fresh one",
    run: () => {
      const frozen = (store, name, brand) => buildItem("Frozen vegetables & berries", store, name, { brand });
      assert.equal(sameProduct(frozen("Barbora", "Külm.marjasegu vaarikatega HORTEX, 300g", "hortex"), frozen("Selver", "Marjasegu vaarikatega, HORTEX, 300 g", "hortex")), true);
      assert.equal(sameProduct(frozen("Barbora", "Külm.mustsõstar BAUER, 300g", "bauer"), frozen("Selver", "Mustsõstar, BAUER, 300 g", "bauer")), true);
      const meat = (store, name) => buildItem("Meat", store, name, { brand: "tallegg" });
      assert.equal(sameProduct(meat("Barbora", "Külm.broilerifilee TALLEGG 500g"), meat("Rimi", "Broilerifilee Tallegg 500g")), false, "frozen vs fresh keeps blocking in Meat");
      assert.equal(computeSignature(meat("Barbora", "Külm.broilerifilee TALLEGG 500g")).descriptors, "broilerifilee külmutatud");
    },
  },
  {
    name: "Abbreviations: Ice cream drops 'jäätis' as implied and a unit left behind by Rimi's dual size ('230g/470ml'); šoko./šok./šokol. read as šokolaadi, glas. as glasuuris — a different flavour still never matches",
    run: () => {
      const ice = (store, name, brand) => buildItem("Ice cream", store, name, { brand });
      assert.equal(sameProduct(ice("Barbora", "Jäätis strawberry white MAGNUM, 81g", "magnum"), ice("Selver", "White Strawberry, MAGNUM, 81 g", "magnum")), true);
      assert.equal(sameProduct(ice("Barbora", "Jäätis NUTELLA 230g", "nutella"), ice("Rimi", "Jäätis Nutella 230g/470ml", "nutella")), true);
      assert.equal(sameProduct(ice("Barbora", "Koorejäätis šoko.ONU ESKIMO,57g", "onu eskimo"), ice("Selver", "Šokolaadi-koorejäätis, ONU ESKIMO, 57 g", "onu eskimo")), true);
      assert.equal(sameProduct(ice("Rimi", "Karamelli-koorejäätis glas. Vanilla Ninja 80g", "vanilla ninja"), ice("Selver", "Karamelli-koorejäätis glasuuris, VANILLA NINJA, 80 g", "vanilla ninja")), true);
      assert.equal(sameProduct(ice("Barbora", "Koorejäätis šoko.ONU ESKIMO,57g", "onu eskimo"), ice("Selver", "Karamelli-koorejäätis, ONU ESKIMO, 57 g", "onu eskimo")), false, "chocolate is not caramel");
    },
  },
  {
    name: "Abbreviations: Fish — 'EO' (easy-open lid), Pr. (praetud), Jah. (jahutatud), KGrant (Kapten Grant), anchovy/anšoovis, surimist/surimi — a different fish or a different cure (dried vs smoked) still never matches",
    run: () => {
      const fish = (store, name, brand) => buildItem("Fish & seafood", store, name, { brand });
      assert.equal(sameProduct(fish("Barbora", "Skumbria tomatikastmes KAIJA, 240g", "kaija"), fish("Selver", "Skumbria tomatikastmes EO, KAIJA, 240 g", "kaija")), true);
      assert.equal(sameProduct(fish("Barbora", "Pr.räimed tomatikastmes KALURI,500g", "kaluri"), fish("Selver", "Praetud räimed tomatikastmes, KALURI, 500 g", "kaluri")), true);
      assert.equal(sameProduct(fish("Barbora", "Heeringafilee vähesoolane KGrant, 240g", "kapten grant"), fish("Selver", "Heeringafilee vähesoolane, KAPTEN GRANT, 240 g", "kapten grant")), true);
      assert.equal(sameProduct(fish("Barbora", "Jah. krabinuudel, surimi, VICI, 200g", "vici"), fish("Selver", "Krabinuudel surimi, VICI, 200 g", "vici")), true);
      assert.equal(sameProduct(fish("Barbora", "Anšoovis filee klassikaline BRIIS,145g", "briis"), fish("Selver", "Anchovy klassikaline filee, BRIIS, 145 g", "briis")), true);
      assert.equal(sameProduct(fish("Barbora", "Kuivatatud tursk MSDM, 36g", "msdm"), fish("Selver", "Tursk suitsutatud, MSDM, 36 g", "msdm")), false, "dried is not smoked");
      assert.equal(sameProduct(fish("Barbora", "Skumbria õlis KAPTEN GRANT,240g", "kapten grant"), fish("Rimi", "Sardiinid õlis Kapten Grant 240g", "kapten grant")), false, "mackerel is not sardines");
    },
  },
  {
    name: "Abbreviations: Pet food drops Selver's feed-law labels (Täiendsööt./Täistoit.) as implied and reads kassidele/kasside/kassi as one word; Tea reads 'Black' as 'must' and 'Rohel' as 'roheline'; Baby food drops an orphaned age marker — a different selection, an added flavour, or purutee vs tee still never matches",
    run: () => {
      const pet = (store, name, brand) => buildItem("Pet food", store, name, { brand });
      assert.equal(sameProduct(pet("Barbora", "Suupiste kassidele DREAMIES lõhega 60g", "dreamies"), pet("Rimi", "Kasside suupiste Dreamies lõhega 60g", "dreamies")), true);
      assert.equal(sameProduct(pet("Barbora", "Kassimaius FELIX Deli Moments kana 4x10g", "felix"), pet("Selver", "Täiendsööt. Kassimaius FELIX Deli Moments kana 4x10g, FELIX,", "felix")), true);
      assert.equal(sameProduct(pet("Barbora", "Kiisueine lihavalik SHEBA 4x85g", "sheba"), pet("Selver", "Kiisueine kodulinnuvalik 4-pakk, SHEBA, 4x85 g", "sheba")), false, "meat selection is not poultry selection");
      const tea = (store, name, brand) => buildItem("Tea & cocoa", store, name, { brand });
      assert.equal(sameProduct(tea("Barbora", "Must tee LOYD Intense 25x2g", "loyd"), tea("Rimi", "Tee must Black Intense Loyd 25x2g", "loyd")), true);
      assert.equal(sameProduct(tea("Barbora", "Rohel tee Jasmine Green BASILUR 100g", "basilur"), tea("Rimi", "Roheline tee Jasmine Green Basilur 100g", "basilur")), true);
      assert.equal(sameProduct(tea("Barbora", "Must tee LIPTON Mango 20x1.7g", "lipton"), tea("Rimi", "Must tee virsiku-mango Lipton 20x1,7g", "lipton")), false, "peach-mango is not mango");
      assert.equal(sameProduct(tea("Barbora", "Must tee English Aristocratic HYLEYS100g", "hyleys"), tea("Selver", "Must purutee English Aristocratic, HYLEYS, 100 g", "hyleys")), false, "purutee vs tee left for the owner to decide");
      const baby = (store, name) => buildItem("Baby food", store, name, { brand: "ella's kitchen" });
      assert.equal(sameProduct(baby("Barbora", "Kanaroog riisiga ELLA'S KITCHEN 130g 7k"), baby("Selver", "Kanaroog riisiga, ELLA'S KITCHEN, 130 g")), true);
    },
  },
  {
    name: "Abbreviations: a unit letter left behind by a dual size ('675g/360g', '230g/470ml', '4 x 100 g') or an age marker ('6k') is stripped only when a digit precedes it — real bug: dropping a bare 'g' as a word also erased the 'G' of 'Sensitivity&G' (& Gum) and matched a different toothpaste",
    run: () => {
      const canned = (store, name) => buildItem("Canned food", store, name, { brand: "salvest" });
      assert.equal(sameProduct(canned("Barbora", "Talukurk SALVEST 675g"), canned("Rimi", "Talukurk Salvest 675g/360g")), true);
      const rice = (store, name) => buildItem("Rice & grains", store, name, { brand: "baltix" });
      assert.equal(sameProduct(rice("Barbora", "Tatar BALTIX 4x100g"), rice("Selver", "Tatar 4 x 100 g, BALTIX, 400 g")), true);
      const ice = (store, name) => buildItem("Ice cream", store, name, { brand: "nutella" });
      assert.equal(sameProduct(ice("Barbora", "Jäätis NUTELLA 230g"), ice("Rimi", "Jäätis Nutella 230g/470ml")), true);
      const care = (store, name) => buildItem("Personal care", store, name, { brand: "sensodyne" });
      assert.equal(sameProduct(care("Barbora", "Hambapasta SENSODYNE Sensitivity&G 75ml"), care("Rimi", "Hambapasta Sensodyne Sensitivity 75ml")), false, "Sensitivity & Gum is not plain Sensitivity");
      assert.equal(computeSignature(care("Barbora", "Hambapasta SENSODYNE Sensitivity&G 75ml")).descriptors, "g hambapasta sensitivity");
    },
  },
  {
    name: "Organic: 'mahe', 'öko', 'ökoloogiline' and 'BIO' are one qualifier — Öko on one side agrees with BIO on the other, and organic never matches non-organic (the owner's decision)",
    run: () => {
      const baby = (store, name) => buildItem("Baby food", store, name, { brand: "hipp" });
      assert.equal(sameProduct(baby("Barbora", "Pirnipüree Williams BIO HIPP 125g, 4k"), baby("Selver", "Pirnipüree Williams Öko 4k, HIPP, 125 g")), true);
      assert.equal(sameProduct(baby("Barbora", "Pirnipüree Williams HIPP 125g, 4k"), baby("Selver", "Pirnipüree Williams Öko 4k, HIPP, 125 g")), false, "organic vs non-organic");
      const ponn = (store, name) => buildItem("Baby food", store, name, { brand: "põnn" });
      assert.equal(sameProduct(ponn("Barbora", "Kõrvitsapüree PÕNN Ökoloogiline 125g"), ponn("Rimi", "Kõrvitsapüree Põnn ökoloogiline 4+ 125g")), true);
      assert.equal(computeSignature(ponn("Barbora", "Kõrvitsapüree PÕNN Ökoloogiline 125g")).qualifiers, "mahe");
      // Selver's English "Organic" and the compound prefix "Mahe…" are
      // the same qualifier — real pairs that broke the moment "öko"
      // stopped being dropped as noise.
      const formula = (store, name) => buildItem("Baby formula", store, name, { brand: "hipp" });
      assert.equal(sameProduct(formula("Rimi", "Jätkup.segu Hipp 2 Comb. al. 6k öko 800g"), formula("Selver", "2 Organic Combiotic jätkupiimasegu 6kuud, HIPP, 800 g")), true);
      const milk = (store, name) => buildItem("Dairy", store, name, { brand: "mo saaremaa" });
      assert.equal(sameProduct(milk("Barbora", "Mahetäispiim MO SAAREMAA öko 3,8-4,4% 1L"), milk("Selver", "Mahetäispiim 3,8-4,4%, MO SAAREMAA, 1 L")), true);
      // "Biocalcium" is not "bio".
      assert.equal(computeSignature(buildItem("Personal care", "Barbora", "Hambapasta SPLAT Biocalcium,100ml", { brand: "splat" })).qualifiers, "");
    },
  },
  {
    name: "Fish & seafood: the owner's call — a fixed-weight pack or tin matches only an equal weight (190g sprats are not 240g sprats; a 900g bag of shrimp is not a 300g jar), a per-kg listing may still match across weights, and Meat keeps its own fully relaxed rule",
    run: () => {
      const fish = (store, name, brand) => buildItem("Fish & seafood", store, name, { brand });
      // Real tins from the round's ambiguous groups.
      assert.equal(sameProduct(fish("Barbora", "Sprotid õlis KAIJA, 190g", "kaija"), fish("Rimi", "Sprotid õlis EO Kaija 190g", "kaija")), true);
      assert.equal(sameProduct(fish("Barbora", "Sprotid õlis KAIJA, 240g", "kaija"), fish("Rimi", "Sprotid õlis EO Kaija 190g", "kaija")), false);
      assert.equal(sameProduct(fish("Barbora", "Heeringafilee traditsiooniline VICI,240g", "vici"), fish("Selver", "Heeringafilee traditsiooniline, VICI, 240 g", "vici")), true);
      assert.equal(sameProduct(fish("Barbora", "Heeringafilee traditsiooniline VICI,400g", "vici"), fish("Selver", "Heeringafilee traditsiooniline, VICI, 240 g", "vici")), false);
      assert.equal(sameProduct(fish("Barbora", "Kooritud krevetid soolvees 900g", "marwi"), fish("Rimi", "Krevetid kooritud soolvees Marwi MSC 300/140g", "marwi")), false);
      // Per-kg (no size stated) still matches a fixed pack of the same
      // fish — the rule fresh fish is sold under is untouched.
      assert.equal(sameProduct(fish("Rimi", "Lõhefilee nahaga Avektra kg", "avektra"), fish("Selver", "Lõhefilee nahaga, AVEKTRA, 500 g", "avektra")), true);
      // Meat is a separate, earlier decision: different pack weights of
      // the same cut are still the same product there.
      const meat = (store, name) => buildItem("Meat", store, name, { brand: "rakvere" });
      assert.equal(sameProduct(meat("Barbora", "Seahakkliha RAKVERE 400g"), meat("Rimi", "Seahakkliha Rakvere 500g")), true);
    },
  },
  // ---- Batch 9: alcohol ----
  {
    name: "Alcohol sizes: 'cl' becomes ml (75 cl = 0,75l = 750ml), the multipack separator may be x, × or *, and Rimi's 'N-pakk' after a single size is the same multipack Barbora writes as Nx — never equal to one can",
    run: () => {
      assert.equal(extractSize("Espiritu De Chile Shiraz Cabernet 75 cl"), "750ml");
      assert.equal(extractSize("Kgt.vein Cielo Primasole Primitivo 0,75l"), "750ml");
      assert.equal(extractSize("Viin ABSOLUT 40% 700ml"), "700ml");
      assert.equal(extractSize("Viin BELVEDERE Pure, 70 cl"), "700ml");
      assert.equal(extractSize("Hele õlu Saku Kuld 5,2% 12*0,33L prk"), "12x330ml");
      assert.equal(extractSize("Hele õlu A.LE COQ Premium 4.7% 24x330ml"), "24x330ml");
      assert.equal(extractSize("Õlu Originaal 6-pakk, SAKU, 6 x 500 ml purk"), "6x500ml");
      assert.equal(extractSize("Õlu Saku Rock 5,3% 0,568l prk 6-pakk"), "6x568ml");
      assert.equal(extractSize("Õlu A.Le Coq Premium 4,7% 0,5l prk 6-pakk"), "6x500ml");
      assert.equal(extractSize("Õlu Alexander 5,2 %vol 0,568l prk"), "568ml");
      const beer = (store, name, brand) => buildItem("Beer & cider", store, name, { brand });
      assert.equal(sameProduct(beer("Rimi", "Õlu Saku Rock 5,3% 0,568l prk 6-pakk", "saku"), beer("Barbora", "Hele õlu SAKU Rock 5.3% 6x0.568l, prk", "saku")), true, "the same six-pack, two spellings");
      assert.equal(sameProduct(beer("Rimi", "Õlu Saku Rock 5,3% 0,568l prk 6-pakk", "saku"), beer("Rimi", "Õlu Saku Rock 5,3% 0,568l prk", "saku")), false, "a six-pack is not one can");
    },
  },
  {
    name: "Alcohol strength: both stores printing it must agree (4,5% ≠ 5,2%, 37,5% ≠ 40%; '%vol' and '% vol' read the same), Selver printing none is tolerated in the alcohol categories only — every other category keeps blocking a one-sided percent",
    run: () => {
      const beer = (store, name, brand) => buildItem("Beer & cider", store, name, { brand });
      assert.equal(sameProduct(beer("Rimi", "Õlu Alexander 5,2 %vol 0,568l prk", "a. le coq"), beer("Barbora", "Hele õlu ALEXANDER 5.2% 568ml prk", "a. le coq")), true);
      assert.equal(sameProduct(beer("Rimi", "Õlu Alexander 4,5 %vol 0,568l prk", "a. le coq"), beer("Barbora", "Hele õlu ALEXANDER 5.2% 568ml prk", "a. le coq")), false, "different strength = different beer");
      assert.equal(sameProduct(beer("Barbora", "Hele õlu LAPIN KULTA 5,2% 0.5L prk", "lapin kulta"), beer("Selver", "Õlu, LAPIN KULTA, 500 ml purk", "lapin kulta")), true, "Selver prints no strength; brand, size, can and every word agree");
      const spirits = (store, name, brand) => buildItem("Spirits", store, name, { brand });
      assert.equal(sameProduct(spirits("Barbora", "Viin ABSOLUT 40% 700ml", "absolut"), spirits("Selver", "Viin ABSOLUT, 70 cl", "absolut")), true);
      assert.equal(sameProduct(spirits("Rimi", "Gin Bartender´s Club Dry 37,5%vol 0,7l", "bartender's club"), spirits("Barbora", "Gin BARTENDER'S CLUB Dry 40% 700ml", "bartender's club")), false);
      // Outside the alcohol categories nothing changed: a one-sided
      // fat % still blocks (Dairy's original rule).
      const dairy = (store, name) => buildItem("Dairy", store, name, { brand: "alma" });
      assert.equal(sameProduct(dairy("Barbora", "Piim ALMA 2,5% 1L"), dairy("Selver", "Piim, ALMA, 1 L")), false);
    },
  },
  {
    name: "Alcohol: can vs bottle must agree when stated (purk/prk = purk, pudel/pdl = pudel; one side saying purk and the other nothing never matches), a wine's vintage must agree, and grape/type words stay real (Merlot ≠ Cabernet, Brut ≠ Semi Seco)",
    run: () => {
      const beer = (store, name, brand) => buildItem("Beer & cider", store, name, { brand });
      assert.equal(sameProduct(beer("Barbora", "Õlu CRONUS Lager 5% 500ml prk", "cronus"), beer("Selver", "Õlu Lager, CRONUS, 500 ml purk", "cronus")), true);
      assert.equal(sameProduct(beer("Barbora", "Õlu CRONUS Lager 5% 500ml prk", "cronus"), beer("Selver", "Õlu Lager, CRONUS, 500 ml pudel", "cronus")), false, "can is not bottle");
      assert.equal(sameProduct(beer("Barbora", "Õlu CRONUS Lager 5% 500ml", "cronus"), beer("Selver", "Õlu Lager, CRONUS, 500 ml purk", "cronus")), false, "one side states the can, the other nothing — unsure, no match");
      const wine = (store, name, brand) => buildItem("Wine", store, name, { brand });
      assert.equal(sameProduct(wine("Barbora", "GT vein ANDES Merlot 750ml", "andes"), wine("Rimi", "Gt.vein Andes Merlot 0,75l", "andes")), true);
      assert.equal(sameProduct(wine("Barbora", "KPN vein ANDES Merlot 750ml", "andes"), wine("Selver", "Andes Merlot 75 cl", "andes")), true, "the KPN/KGT/GT label class and the word 'vein' are implied");
      assert.equal(sameProduct(wine("Barbora", "GT vein ANDES Merlot 750ml", "andes"), wine("Rimi", "Gt.vein Andes Cabernet Sauvignon 0,75l", "andes")), false);
      assert.equal(sameProduct(wine("Rimi", "Kpn.kv.v.vein Cava Jaume Serra Brut 0,75l", "jaume serra"), wine("Selver", "Jaume Serra Cava Brut 75 cl", "jaume serra")), true);
      assert.equal(sameProduct(wine("Rimi", "Kpn.kv.v.vein Cava Jaume Serra Brut 0,75l", "jaume serra"), wine("Selver", "Jaume Serra Cava Semi Seco 75 cl", "jaume serra")), false);
      assert.equal(sameProduct(wine("Barbora", "KPN vein RIOJA Reserva 2018 750ml", "rioja"), wine("Selver", "Rioja Reserva 2018 75 cl", "rioja")), true);
      assert.equal(sameProduct(wine("Barbora", "KPN vein RIOJA Reserva 2018 750ml", "rioja"), wine("Selver", "Rioja Reserva 2019 75 cl", "rioja")), false, "two harvests are two wines");
      assert.equal(sameProduct(wine("Barbora", "KPN vein RIOJA Reserva 2018 750ml", "rioja"), wine("Selver", "Rioja Reserva 75 cl", "rioja")), false, "a vintage on one side only — unsure");
      assert.equal(sameProduct(beer("Barbora", "Õlu KRONENBOURG 1664 Blanc 5% 500ml prk", "kronenbourg"), beer("Rimi", "Õlu Kronenbourg 1664 Blanc 5% 0,5l purk", "kronenbourg")), true, "1664 is a name, not a vintage");
    },
  },
  {
    name: "Alcohol-free: every abbreviation of 'alkoholivaba' is one word, and a 0,0% listing never matches its alcoholic twin — different strength within one pool, and a different category in real scraping",
    run: () => {
      const free = (store, name, brand) => buildItem("Alcohol-free beer, cider & wine", store, name, { brand });
      assert.equal(sameProduct(free("Barbora", "Alk.vaba õlu WARSTEINER Fresh 330ml", "warsteiner"), free("Selver", "Alkoholivaba õlu Warsteiner Fresh, WARSTEINER, 330 ml", "warsteiner")), true);
      assert.equal(sameProduct(free("Rimi", "Alk.v. õlu Kronenbourg 1664 Blanc 0,33l pdl", "kronenbourg"), free("Barbora", "Alkoholivaba õlu KRONENBOURG 1664 Blanc 330ml pudel", "kronenbourg")), true);
      assert.equal(sameProduct(free("Rimi", "Alkoholivaba õlu Heineken alk.0,0%vol 0,5l", "heineken"), free("Selver", "Alkoholivaba õlu, HEINEKEN, 500 ml", "heineken")), true);
      const beer = (store, name, brand) => buildItem("Beer & cider", store, name, { brand });
      assert.equal(sameProduct(beer("Rimi", "Õlu Heineken 0,0% 0,33l pudel", "heineken"), beer("Barbora", "Õlu HEINEKEN 5% 330ml pudel", "heineken")), false, "0,0% ≠ 5%");
      assert.equal(sameProduct(beer("Rimi", "Alkoholivaba õlu Heineken 0,33l pudel", "heineken"), beer("Barbora", "Õlu HEINEKEN 5% 330ml pudel", "heineken")), false, "'alkoholivaba' is a real word on one side only");
      // Nothing else changed: a category outside batch 9 reads the
      // new normalizations the same way (whole words only).
      const chips = (store, name) => buildItem("Chips & snacks", store, name, { brand: "taffel" });
      assert.equal(sameProduct(chips("Barbora", "Maisipallid Nacho TAFFEL 190g"), chips("Rimi", "Maisipallid Nacho Taffel 190g")), true);
    },
  },
  {
    name: "Spirits: an age statement is the product (Havana Club Añejo 3YO ≠ 7YO — a real wrong match in the first batch-9 scrape), spelled 3YO/12yo/3 Year alike, one-sided never matches, and the display name shows it as '12YO'",
    run: () => {
      const spirits = (store, name, brand) => buildItem("Spirits", store, name, { brand });
      assert.equal(sameProduct(spirits("Barbora", "Rumm HAVANA CLUB Anejo 3YO 37,5% 0,7l", "havana club"), spirits("Selver", "Rumm HAVANA CLUB Anejo 7YO, 70cl", "havana club")), false);
      assert.equal(sameProduct(spirits("Barbora", "Rumm HAVANA CLUB Anejo 3YO 37,5% 0,7l", "havana club"), spirits("Selver", "Rumm HAVANA CLUB Anejo 3YO, 70cl", "havana club")), true);
      assert.equal(sameProduct(spirits("Barbora", "Rumm FLOR DE CANA 12YO 40% 700ml", "flor de cana"), spirits("Rimi", "Rumm Flor de Cana 12yo 40% 0,7l", "flor de cana")), true);
      assert.equal(sameProduct(spirits("Rimi", "Brandy Old Kakheti 3 Year 40% 0,5l", "old kakheti"), spirits("Selver", "Brändi OLD KAKHETI 3 Year Brandy 50cl", "old kakheti")), true);
      assert.equal(sameProduct(spirits("Rimi", "Brandy Ararat 5YO 40% 0,5l", "ararat"), spirits("Selver", "Brändi ARARAT 3YO, 50 cl", "ararat")), false);
      assert.equal(sameProduct(spirits("Rimi", "Brandy Ararat 5YO 40% 0,5l", "ararat"), spirits("Selver", "Brändi ARARAT, 50 cl", "ararat")), false, "age on one side only");
      assert.equal(extractVariant("Rumm FLOR DE CANA 12YO 40% 700ml"), "12yo");
      const { matches } = matchPool([spirits("Barbora", "Rumm FLOR DE CANA 12YO 40% 700ml", "flor de cana"), spirits("Rimi", "Rumm Flor de Cana 12yo 40% 0,7l", "flor de cana")]);
      assert.equal(matches[0].canonicalName, "Flor de cana Rumm 40% 12YO 700ml");
    },
  },
  {
    name: "Display names (owner, 2026-09-27): descriptor words keep the order and spelling the store wrote — 'pinot grigio', 'black label', 'white label' — an abbreviation is still expanded (Külm. -> külmutatud), a '-maitseline' suffix still strips, the store with the fewest abbreviations supplies the wording, and matching itself is unchanged",
    run: () => {
      const wine = (store, name, brand) => buildItem("Wine", store, name, { brand });
      const spirits = (store, name, brand) => buildItem("Spirits", store, name, { brand });
      assert.equal(matchItems(wine("Barbora", "KPN vein DOPPIO PASSO Pinot Grigio 750ml", "doppio passo"), wine("Rimi", "Kpn.vein Doppio Passo Pinot Grigio 0,75l", "doppio passo")).canonicalName, "Doppio passo pinot grigio 750ml");
      assert.equal(matchItems(spirits("Rimi", "Whisky Johnnie Walker Black Label 40% 0,7l", "johnnie walker"), spirits("Selver", "Viski JOHNNIE WALKER Black Label, 70 cl", "johnnie walker")).canonicalName, "Johnnie walker Viski black label 40% 700ml", "'black' as the store wrote it, not the matcher's 'must'");
      assert.equal(matchItems(spirits("Barbora", "Whisky JIM BEAM White Label 40% 500ml", "jim beam"), spirits("Rimi", "Whisky Jim Beam White Label 40% 0,5l", "jim beam")).canonicalName, "Jim beam Viski white label 40% 500ml");
      const frozen = (store, name, brand) => buildItem("Meat", store, name, { brand });
      assert.equal(matchItems(frozen("Barbora", "Külm. kanafilee TALLEGG 600g", "tallegg"), frozen("Rimi", "Külmutatud kanafilee Tallegg 600g", "tallegg")).canonicalName, "Tallegg Külmutatud kanafilee 600g", "Rimi's whole word supplies the spelling; Barbora's abbreviation is never shown");
      const biscuit = (store, name, brand) => buildItem("Biscuits", store, name, { brand });
      assert.equal(matchItems(biscuit("Barbora", "Küpsis kookosemaits. SELGA 180g", "selga"), biscuit("Rimi", "Küpsis kookosemaitseline Selga 180g", "selga")).canonicalName, "Selga Küpsis kookose 180g", "a suffix strip is not undone");
      // Matching reads the sorted form: order never decides a match.
      assert.equal(sameProduct(wine("Barbora", "KPN vein X Grigio Pinot 750ml", "x"), wine("Rimi", "Kpn.vein X Pinot Grigio 0,75l", "x")), true);
    },
  },
  {
    name: "Eggs (Dairy, pieceCountSizes): the piece count is the size — '10tk', Rimi's fused 'M10', Selver's '10 tk' all read 10tk — the size letter must agree (M ≠ L), 10 ≠ 15, Barbora's brand-less Dava is the known brand, free-range spellings meet, and the name shows the letter as 'M'",
    run: () => {
      const egg = (store, name, brand) => buildItem("Dairy", store, name, { brand });
      const b = egg("Barbora", "Õrrekanade munad M DAVA 10tk");
      const r = egg("Rimi", "Õrrekanade munad Dava M10", "Dava");
      const s = egg("Selver", "Õrrekanade munad M10, DAVA, 10 tk", "DAVA");
      assert.equal(extractSize("Õrrekanade munad Dava M10", { pieceCounts: true }), "10tk");
      assert.equal(extractSize("Õrrekanade munad Dava M10"), null, "only a category that opted in reads counts");
      assert.equal(sameProduct(b, r), true);
      assert.equal(sameProduct(r, s), true);
      assert.equal(sameProduct(b, s), true);
      assert.equal(sameProduct(egg("Barbora", "Õrrekanade munad L DAVA 10tk"), s), false, "L is not M");
      assert.equal(sameProduct(egg("Selver", "Õrrekanade munad M15, DAVA, 15 tk", "DAVA"), s), false, "15 is not 10");
      assert.equal(sameProduct(egg("Rimi", "Vabapidamisel kanade munad Kodutalu 10tk", "Kodutalu"), egg("Selver", "Vabalt peetavate kanade munad, KODUTALU, 10 tk", "KODUTALU")), true, "free-range spellings, 'kanamunad'/'kanade' folded");
      assert.equal(sameProduct(egg("Rimi", "Õrrekanade munad Kodutalu M10", "Kodutalu"), egg("Selver", "Vabalt peetavate kanade munad, KODUTALU, 10 tk", "KODUTALU")), false, "barn is not free-range");
      const { matches } = matchPool([b, r, s]);
      assert.equal(matches.length, 1);
      assert.equal(matches[0].canonicalName, "Dava Õrrekanade munad M 10tk");
    },
  },
  {
    name: "Paper (Household, pieceCountSizes): rolls are the size ('8rl' = '8 rulli' = '8rul.' ≠ '24rl'), ply is a variant ('3kih' = '3-kihiline' = '3k.' ≠ 2-ply), '300l' on paper is 300 sheets not litres, tissues '10x9tk' are a multipack, a one-sided count never matches, and a formula's '6k' age marker is untouched",
    run: () => {
      const paper = (store, name, brand) => buildItem("Household", store, name, { brand });
      assert.equal(extractSize("Tualettpaber Zewa Deluxe Pure White 3k. 8rul.", { pieceCounts: true }), "8rl");
      assert.equal(extractSize("Majapidamispaber BLOOM Regular 2kih 300l", { pieceCounts: true }), "300lehte");
      assert.equal(extractSize("Majapidamispaber BLOOM Regular 2kih 300l"), "300000ml", "without the flag the old litre reading stands (no category without paper uses it)");
      assert.equal(extractSize("Taskurätikud ZEWA Softis 4kih, 10x9tk", { pieceCounts: true }), "10x9tk");
      assert.equal(extractVariant("Tualettpaber Rimi 8 rulli, 3 kihiline", { pieceCounts: true }), "3kih");
      assert.equal(extractVariant("Piimasegu Aptamil 2 al. 6k 400g"), "2", "Baby formula reads no ply");
      assert.equal(sameProduct(paper("Barbora", "Tualettpaber ZEWA Deluxe 3kih 8rl", "ZEWA"), paper("Rimi", "Tualettpaber Zewa Deluxe 3 kihiline 8 rulli", "Zewa")), true);
      assert.equal(sameProduct(paper("Barbora", "Tualettpaber ZEWA Deluxe 3kih 8rl", "ZEWA"), paper("Rimi", "Tualettpaber Zewa Deluxe 2 kihiline 8 rulli", "Zewa")), false, "2-ply is not 3-ply");
      assert.equal(sameProduct(paper("Barbora", "WC-paber ZEWA Deluxe White 3kih 24rl", "ZEWA"), paper("Rimi", "Tualettpaber Zewa Deluxe Pure White 3k. 8rul.", "Zewa")), false, "24 rolls is not 8");
      assert.equal(sameProduct(paper("Barbora", "Tualettpaber ZEWA Deluxe 3kih", "ZEWA"), paper("Rimi", "Tualettpaber Zewa Deluxe 3 kihiline 8 rulli", "Zewa")), false, "no count on one side — unsure");
      assert.equal(sameProduct(paper("Barbora", "Majapidamispaber ZEWA Premium 2kih 2rl", "ZEWA"), paper("Selver", "Majapidamispaber Premium, 2-kihiline, ZEWA, 2 rl", "ZEWA")), true);
      assert.equal(matchItems(paper("Barbora", "Tualettpaber ZEWA Deluxe 3kih 8rl", "ZEWA"), paper("Rimi", "Tualettpaber Zewa Deluxe 3 kihiline 8 rulli", "Zewa")).canonicalName, "Zewa Tualettpaber deluxe 3-kihiline 8rl");
    },
  },
  {
    name: "Brand spelling: hyphens, periods, spaces and apostrophes in a store's brand field are not part of the brand (TORU-SIIL = TORUSIIL, MAKS & MOORITS = MAKS&MOORITS, A. Le Coq = A.LE COQ, Grant's = Grants) — a genuinely different brand still never matches",
    run: () => {
      const h = (store, name, brand) => buildItem("Household", store, name, { brand });
      assert.equal(sameProduct(h("Barbora", "Torupuhastusvahend TORU-SIIL 1L", "TORU-SIIL"), h("Selver", "Torupuhastusvahend, TORUSIIL, 1 l", "TORUSIIL")), true);
      const s = (store, name, brand) => buildItem("Sausages", store, name, { brand });
      assert.equal(sameProduct(s("Barbora", "Koduviiner M&M,500g", "MAKS & MOORITS"), s("Selver", "Koduviiner, MAKS&MOORITS, 500 g", "MAKS&MOORITS")), true);
      const b = (store, name, brand) => buildItem("Beer & cider", store, name, { brand });
      assert.equal(sameProduct(b("Barbora", "Hele õlu A. LE COQ Premium 4.7% 330ml", "A. LE COQ"), b("Rimi", "Õlu A. Le Coq Premium 4,7% 0,33l", "A.Le Coq")), true);
      const sp = (store, name, brand) => buildItem("Spirits", store, name, { brand });
      assert.equal(sameProduct(sp("Barbora", "Whisky GRANTS Triple Wood 40% 1L", "GRANTS"), sp("Rimi", "Whisky Grant's Triple Wood 40%vol 1l", "Grant's")), true);
      assert.equal(sameProduct(h("Barbora", "Torupuhastusvahend TIRET 1L", "TIRET"), h("Selver", "Torupuhastusvahend, TORUSIIL, 1 l", "TORUSIIL")), false);
    },
  },
  {
    name: "Beer: 'Hele õlu' as the type phrase folds to 'õlu' (Barbora/Selver's lager prefix vs Rimi's plain 'Õlu'), but a product's own 'Hele' (Saku Hele) stays its name — it matches itself across stores and never Saku Kuld",
    run: () => {
      const beer = (store, name, brand) => buildItem("Beer & cider", store, name, { brand });
      assert.equal(sameProduct(beer("Barbora", "Hele õlu SAKU Kuld 5,2% 500ml prk", "saku"), beer("Rimi", "Õlu Saku Kuld 5,2%vol 0,5L purk", "saku")), true);
      assert.equal(sameProduct(beer("Barbora", "Hele õlu Saku Hele 5.2% 500ml,pdl", "saku"), beer("Selver", "Õlu Hele, SAKU, 500 ml pudel", "saku")), true);
      assert.equal(sameProduct(beer("Barbora", "Hele õlu Saku Hele 5.2% 500ml,pdl", "saku"), beer("Rimi", "Õlu Saku Kuld 5,2%vol 0,5L pdl", "saku")), false);
      const { matches } = matchPool([beer("Barbora", "Hele õlu Saku Hele 5.2% 500ml,pdl", "saku"), beer("Selver", "Õlu Hele, SAKU, 500 ml pudel", "saku")]);
      assert.equal(matches[0].canonicalName, "Saku hele pudel 5.2% 500ml", "the name keeps Hele");
    },
  },
];

let pass = 0;
let fail = 0;

for (const test of tests) {
  try {
    test.run();
    pass++;
    console.log(`PASS  ${test.name}`);
  } catch (err) {
    fail++;
    console.log(`FAIL  ${test.name}`);
    console.log(`      ${err.message}`);
  }
}

console.log("");
console.log(`${pass} passed, ${fail} failed (${tests.length} total)`);

if (fail > 0) {
  process.exit(1);
}
