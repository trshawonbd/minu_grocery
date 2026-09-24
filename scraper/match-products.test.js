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
const { sameProduct, extractType, isProduceItem, hasKnownBrand, extractProduceVariant, extractSize, matchPool } = require("./match-products");

function item(store, name) {
  return { store, name, price: 0, currency: "EUR", url: "x", ean: null };
}

// Dairy items carry a real, store-sourced brand and opt into strict
// packaged-product matching (brand + size + fat % + descriptors all
// agree) — see splitPrice's brand field in the store scrapers and
// strictPackaging in computeSignature/sameBrandedProduct.
function dairyItem(store, name, brand) {
  return { ...item(store, name), brand, strictPackaging: true };
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
