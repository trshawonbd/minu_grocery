// Regression tests for the shared nameFilter word lists in
// categories.js (cheeseFilter, curdFilter) — these decide what's
// scraped in the first place, upstream of match-products.js, so a gap
// here can let a genuinely wrong pair of items through to matching
// even though the matcher itself is working correctly.
// Run with: node scraper/categories.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { CATEGORIES } = require("./categories");
const { CATEGORIES: SELVER_CATEGORIES } = require("./stores/selver");

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
const bakingBarboraDecorFilter = category("Baking supplies").urls.barbora[1].nameFilter;
const bakingBarboraFilter = category("Baking supplies").urls.barbora[0].nameFilter;
const selverSpicesWorldCuisineFilter = SELVER_CATEGORIES["Spices"].sources[1].nameFilter;
const selverSpicesCatchAllFilter = SELVER_CATEGORIES["Spices"].sources[0].nameFilter;

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

  test("Baking supplies: a real bug — cinnamon sugar leaked into Barbora's cake-decorations leaf with no filter, duplicating the existing Flour & sugar category", () => {
    assert.equal(bakingBarboraDecorFilter("Kaneelisuhkur DR.OETKER 20g"), false);
    assert.equal(bakingBarboraDecorFilter("Toiduvärv sinine  DR. OETKER 10g"), true, "real cake decorations/food colouring stay in scope");
  }),

  test("Baking supplies: a real bug — corn/potato starch and kvass drink powder both leaked into Barbora's baking-additives leaf, one duplicating Flour & sugar's own starch scope", () => {
    assert.equal(bakingBarboraFilter("Maisitärklis DR.OETKER 200g"), false, "starch is already Flour & sugar's scope (it already has real starch products)");
    assert.equal(bakingBarboraFilter("Kartulitärklis KLINGAI 400g"), false);
    assert.equal(bakingBarboraFilter("Kaljapulber KLINGAI 126g"), false, "a kvass/kali drink powder, not a baking ingredient");
    assert.equal(bakingBarboraFilter("Küpsetuspulber SANTA MARIA 45g"), true, "real baking powder stays in scope");
  }),

  test("Spices: a real bug — a hybrid 'sauce and spice mix' product (Selver's Tandoori kaste ja maitseainesegu) scraped into both Spices and Sauces & condiments as the same URL", () => {
    assert.equal(selverSpicesWorldCuisineFilter("Tandoori kaste ja maitseainesegu, SANTA MARIA, 360 g"), false, "kept in Sauces & condiments only, not duplicated here");
    assert.equal(selverSpicesWorldCuisineFilter("Tandoori maitseainesegu, SANTA MARIA, 35 g"), true, "a pure spice mix with no sauce in the name stays in scope");
  }),

  test("Spices: a real bug — syrup, sweetener, almond flour, and baking soda all leaked into Selver's flat spice catch-all, each duplicating an existing category's scope", () => {
    assert.equal(selverSpicesCatchAllFilter("Glükoosisiirup, DAN SUKKER, 400 ml"), false, "syrup is not a spice, and Flour & sugar already excludes it too");
    assert.equal(
      selverSpicesCatchAllFilter("Steviaga suhkruasendaja – stevioolglükosiidil ja erütritoolil põhinev lauamagusaine, UMAMI, 300 g"),
      false,
      "a sweetener, same exclusion Flour & sugar already applies"
    );
    assert.equal(selverSpicesCatchAllFilter("Mandlijahu, MEIRA, 80 g"), false, "almond flour is already fully inside Flour & sugar");
    assert.equal(selverSpicesCatchAllFilter("Söögisooda, DNIPRYANOCHKA, 400 g"), false, "baking soda belongs to Baking supplies, not Spices");
    assert.equal(selverSpicesCatchAllFilter("Jahvatatud ingver, SANTA MARIA, 20 g"), true, "'jahvatatud' (ground) must not be caught by the 'jahu' (flour) exclude");
    assert.equal(selverSpicesCatchAllFilter("Karri, SANTA MARIA, 25 g"), true, "a real spice stays in scope");
  }),

  test("Sweets & snacks: real finds from the first scrape — an iron-supplement bar in chocolate, pastries/cone cups/bread in biscuits, and 'Dipp'-spelled dips the 'dipi' filter missed in chips", () => {
    const chocolateRimi = category("Chocolate").urls.rimi.nameFilter;
    const biscuitsRimi = category("Biscuits").urls.rimi.nameFilter;
    const biscuitsSelver = SELVER_CATEGORIES["Biscuits"].sources[0].nameFilter;
    const chipsRimi = category("Chips & snacks").urls.rimi[0].nameFilter;
    const chipsSelver = SELVER_CATEGORIES["Chips & snacks"].sources[0].nameFilter;

    assert.equal(chocolateRimi("Hematogeen Vita+ 50g"), false, "a health product, not chocolate");
    assert.equal(chocolateRimi("Piimašok. Kalevipoeg purust. mand. Kalev 270g"), true);

    assert.equal(biscuitsRimi("Croissant kakao täidisega 7 Days Mini 185g"), false);
    assert.equal(biscuitsRimi("Sarvesai kakaotäidisega 7Days 60g"), false);
    assert.equal(biscuitsRimi("Jäätisetops Marmiton 50g"), false, "an ice-cream cone cup");
    assert.equal(biscuitsRimi("Maisipulgad kondenspiima Kuki Muki 250g"), false, "corn sticks are Chips & snacks at every other store");
    assert.equal(biscuitsRimi("Brownie Belgia šokolaadi tükkidega 200g"), false, "an actual brownie cake");
    assert.equal(biscuitsRimi("Küpsis Choco Brownie OREO 154g"), true, "a brownie-FLAVOURED biscuit stays — Barbora/Selver keep the same product, so a bare 'brownie' substring would split it");
    assert.equal(biscuitsRimi("Soolapulgad Rimi 125g"), true, "savoury sticks are a real biscuit product");
    assert.equal(biscuitsSelver("Küüslauguleivad, SELVERI KÖÖK, 200 g"), false, "garlic bread is bread");
    assert.equal(biscuitsSelver("Näkileivad laktoosivaba, PRIILEIB, 120 g"), false, "crispbread — same call as Bread");
    assert.equal(biscuitsSelver("Juustuküpsis laktoosivaba, PRIILEIB, 120 g"), true, "the brand name PRIILEIB must not trip the bread exclusions");

    assert.equal(chipsRimi("Dipp guacamole Rimi Planet 300g"), false, "'Dipp' spelling was missed by 'dipi' alone");
    assert.equal(chipsRimi("Juustudipp Rimi Planet jalapenoga 300g"), false);
    assert.equal(chipsRimi("Dipisegu tilliga Salling 20g"), false);
    assert.equal(chipsRimi("Guacamole-kastme maitseainesegu S.M. 15g"), false, "a spice mix, Spices' scope");
    assert.equal(chipsRimi("Kartulikr. tšilli- ja laimimait. Lay's 170g"), true);
    assert.equal(chipsSelver("Dipikastmepulber küüslauguga, GESTUS, 16g"), false);
    assert.equal(chipsSelver("Juustumaitselised kartuliaastud, TAFFEL, 180g"), true);
  }),

  test("Frozen: a real bug — a /\\bjää\\b/ ice-cube exclude matched inside 'Jäätis' (JS's \\b treats 'ä' as a non-word char) and dropped every Rimi item named 'Jäätis …'; plus the frozen veg/potato routing", () => {
    const iceRimi = category("Ice cream").urls.rimi.nameFilter;
    const iceSelver = SELVER_CATEGORIES["Ice cream"].sources[0].nameFilter;
    const vegBarbora = category("Frozen vegetables & berries").urls.barbora[0].nameFilter;
    const vegRimi = category("Frozen vegetables & berries").urls.rimi.nameFilter;
    const vegSelver = SELVER_CATEGORIES["Frozen vegetables & berries"].sources[0].nameFilter;
    const dumplingsSelverPotato = SELVER_CATEGORIES["Dumplings, pizza & fries"].sources[2].nameFilter;
    const dumplingsSelverReady = SELVER_CATEGORIES["Dumplings, pizza & fries"].sources[1].nameFilter;

    assert.equal(iceRimi("Jäätis VÄIKE TOM šokolaadiga, 60g"), true, "the actual bug — an ice cream named 'Jäätis' must never be excluded");
    assert.equal(iceRimi("Mahlajää arbuusi Pirulo 67g"), true, "juice ice is ice cream scope");
    assert.equal(iceRimi("Jääkuubikud Balbiino 2kg"), false, "ice cubes are excluded");
    assert.equal(iceSelver("Jääkuubikud topsis, külmutatud, ICE CUP, 130 g"), false);
    assert.equal(iceSelver("Jäätis brikett, REGATT, 90 g"), true);

    assert.equal(vegBarbora("Külm.talvine supp WELL DONE, 400g"), false, "frozen soup, same call as every other soup");
    assert.equal(vegRimi("Supi köögiviljasegu Ukraina Borš Bauer 400g"), false, "the inflected 'Supi' must be caught too");
    assert.equal(vegRimi("Smuutisegu suvine Nice'n Easy külm. 375g"), false, "a frozen smoothie pack is a drink");
    assert.equal(vegRimi("Külmutatud brokoli Rimi 400g"), true);
    assert.equal(vegSelver("Friikartul sakiline, MAAHÄRRA, 750 g"), false, "fries leave Frozen vegetables (owner's call)…");
    assert.equal(dumplingsSelverPotato("Friikartul sakiline, MAAHÄRRA, 750 g"), true, "…and land in Dumplings, pizza & fries");
    assert.equal(vegSelver("Kartuli-sibulasegu, MAAHÄRRA, 1 kg"), true, "a vegetable mix that merely contains potato stays a vegetable mix");
    assert.equal(dumplingsSelverPotato("Kartuli-sibulasegu, MAAHÄRRA, 1 kg"), false);
    assert.equal(dumplingsSelverReady("Asia Box Tikka Masala kana jasmiiniriisiga, SPICEFIELD, 350 g"), false, "a boxed ready meal");
    assert.equal(dumplingsSelverReady("Pitsa Ristorante Hawaii, DR.OETKER, 355g"), true);
  }),

  test("Meat products & fish: the by-name splits — Rimi's pre-cooked meat has no telltale word so its grill group REQUIRES a sausage word; the shared 'Muud lihatooted' group splits into Sausages vs Ham & cold cuts; Selver's mixed leaf keeps deli items and drops meatballs/plant fakes", () => {
    const sausagesRimiGrill = category("Sausages").urls.rimi[0].nameFilter;
    const sausagesRimiOther = category("Sausages").urls.rimi[2].nameFilter;
    const hamRimiOther = category("Ham & cold cuts").urls.rimi[1].nameFilter;
    const sausagesSelver = SELVER_CATEGORIES["Sausages"].sources[0].nameFilter;
    const hamSelverMixed = SELVER_CATEGORIES["Ham & cold cuts"].sources.find((s) => s.id === 225).nameFilter;
    const fishSelverOther = SELVER_CATEGORIES["Fish & seafood"].sources.find((s) => s.id === 231).nameFilter;

    assert.equal(sausagesRimiGrill("Hõrgud kanafileelõigud M&M 200g"), false, "pre-cooked meat in the grill group, no 'eelküps' in its name");
    assert.equal(sausagesRimiGrill("Peipsi sibulagrill Wõro 900g"), true, "a grill sausage with no 'vorst' in its name");
    assert.equal(sausagesRimiGrill("Verikäkk Rakvere 440g"), true);
    assert.equal(sausagesRimiOther("Pereviiner Rakvere 900g"), true);
    assert.equal(sausagesRimiOther("Maksapasteet Delikatess Nõo 200g"), false, "pâté belongs to Ham & cold cuts, not Sausages");
    assert.equal(hamRimiOther("Maksapasteet Delikatess Nõo 200g"), true);
    assert.equal(hamRimiOther("Pere lihapallid Rakvere 400g"), false, "meatballs are out of every category");
    assert.equal(hamRimiOther("Broilerimaks, värske, A-klass Tallegg 500g"), false, "offal is out");
    assert.equal(hamRimiOther("Pereviiner Rakvere 900g"), false, "frankfurters go to Sausages, not here — no double-listing");

    assert.equal(sausagesSelver("Taimne viiner, BON VEGAN, 250 g"), false, "plant-based imitation");
    assert.equal(sausagesSelver("Viiner, RAKVERE, 500 g"), true);
    assert.equal(hamSelverMixed("Hautatud sealiha, FRANK POTT, 240 g"), true, "canned meat (owner's call)");
    assert.equal(hamSelverMixed("Snäkk pro Beef jerky, RAKVERE LK, 50 g"), true, "meat snack (owner's call)");
    assert.equal(hamSelverMixed("Vürtsisealiha, FRANK POTT, 325 g"), true, "canned spiced pork");
    assert.equal(hamSelverMixed("Vürtsikad kanapooltiivad, TALLEGG, 400 g"), false, "spicy chicken wings are pre-cooked, not a cold cut — a bare 'vürtsi' had kept them");
    assert.equal(hamSelverMixed("Kiievi kotlet, TALLEGG, 300 g"), false);
    assert.equal(hamSelverMixed("Kanaloog ehk taimne filee, MATI, 180 g"), false, "plant-based fake chicken");
    assert.equal(fishSelverOther("Kalaloog ehk taimne filee, MATI, 170 g"), false, "plant-based fake fish");
    assert.equal(fishSelverOther("Sprotid õlis, RANNAKÜLA, 250 g"), true);
  }),

  test("Sausages vs Ham & cold cuts: a real bug — the first live scrape found genuine ham (Serrano ham, sliced ham) leaking into Sausages, and genuine dry sausage (fuet/salchichon) plus a soup-bone kit leaking into Ham & cold cuts, at every store; 'singi' (genitive of 'sink') needed alongside the bare word", () => {
    const sausagesBarboraVinnutatud = category("Sausages").urls.barbora[3].nameFilter;
    const sausagesRimiSmoked = category("Sausages").urls.rimi[1].nameFilter;
    const hamRimiSinkPeekon = category("Ham & cold cuts").urls.rimi[0].nameFilter;
    const sausagesSelver223 = SELVER_CATEGORIES["Sausages"].sources[0].nameFilter;
    const hamSelver227 = SELVER_CATEGORIES["Ham & cold cuts"].sources.find((s) => s.id === 227).nameFilter;

    assert.equal(sausagesBarboraVinnutatud("Vinnut. sink Serrano ELPOZO, 500g viil"), false, "Serrano ham, not a sausage");
    assert.equal(sausagesBarboraVinnutatud("Pancetta Arrotolata WELL DONE 100g viil"), false);
    assert.equal(sausagesBarboraVinnutatud("Kuumsuits. servelaat PORMET,280g"), true, "a real cured sausage stays in scope");
    assert.equal(sausagesRimiSmoked("Sealihasink keed., kuumsuit., viil. Rimi 200g"), false, "sliced ham, not a sausage");
    assert.equal(sausagesRimiSmoked("Krakov Lihakas Rakvere 300g"), true);

    assert.equal(hamRimiSinkPeekon("Fuet Artesano Selection by Rimi 160g"), false, "dry sausage belongs to Sausages");
    assert.equal(hamRimiSinkPeekon("Vorst Salchichon viil. Selection by Rimi 80g"), false);
    assert.equal(hamRimiSinkPeekon("Hernesupikogu Rakvere 800g"), false, "a soup-bone kit, not a cold cut");
    assert.equal(hamRimiSinkPeekon("Veiserind viilutatud Oskar 100g"), true, "a real cured cut stays in scope");
    assert.equal(hamRimiSinkPeekon("Singivalik viilutatud Argal 120g"), true, "the genitive 'Singivalik' must still be recognised as ham");

    assert.equal(sausagesSelver223("Suitusink Treski Hüä, NÕO, kg"), false, "smoked ham, not a sausage");
    assert.equal(sausagesSelver223("Lainelised singilõigud, NÕO, 100 g"), false, "'singilõigud' (ham slices) — the genitive form");
    assert.equal(sausagesSelver223("Frankfurter, RANNAROOTSI, 500 g"), true);
    assert.equal(hamSelver227("Fuetec trühvliga, ELPOZO, 150 g"), false, "dry sausage belongs to Sausages");
    assert.equal(hamSelver227("Serrano sink, EMBUTIDOS CAULA, 100 g"), true, "a real cured ham stays in scope");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
