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

const diaperBarboraFilter = category("Diapers & baby wipes").urls.barbora[0].nameFilter;
const diaperBarboraWipeFilter = category("Diapers & baby wipes").urls.barbora[1].nameFilter;
const diaperRimiFilter = category("Diapers & baby wipes").urls.rimi[0].nameFilter;
const householdRimiFilter = category("Household").urls.rimi[0].nameFilter;
const personalCareRimiHairFilter = category("Personal care").urls.rimi[3].nameFilter;
const personalCareRimiBodyFilter = category("Personal care").urls.rimi[4].nameFilter;
const babyFoodSelverFilter = SELVER_CATEGORIES["Baby food"].sources[0].nameFilter;
const diaperSelverFilter = SELVER_CATEGORIES["Diapers & baby wipes"].sources.find((s) => s.id === 308).nameFilter;
const diaperSelverWipeFilter = SELVER_CATEGORIES["Diapers & baby wipes"].sources.find((s) => s.id === 309).nameFilter;

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

  test("Diapers & baby wipes: special-purpose diapers (swim, Dry Nites, Ninjamas) and Selver's stray 'Rinnapadjad' (breast pads) are excluded; wet wipes are isolated from the surrounding baby-hygiene leaf by requiring both 'wet' and 'napkin'", () => {
    assert.equal(diaperBarboraFilter("Püksmähkmed PAMPERS MP S5 12-17kg 96tk"), true);
    assert.equal(diaperBarboraFilter("Mähk.HUGGIES Little Swim.(S) 7-12kg 12tk"), false, "swim diaper");
    assert.equal(diaperBarboraFilter("Ujumismähkmed PAMPERS S3-4 6-11kg 12tk"), false);
    assert.equal(diaperBarboraFilter("Püksmähk.DRY NITES boy 4-7a 17-30kg 10tk"), false, "bedwetting pants, a different product from a size-numbered diaper");

    assert.equal(diaperBarboraWipeFilter("Niisked salvrätikud PAMPERS Water, 60tk"), true);
    assert.equal(diaperBarboraWipeFilter("Niisk. salv. HUGGIES All Over Clear 56tk"), true, "Barbora's own abbreviated form");
    assert.equal(diaperBarboraWipeFilter("JOHNSON'S beebiõli 200ml"), false, "baby oil, not a wet wipe");
    assert.equal(diaperBarboraWipeFilter("Rinnapadjad Bel Baby 30tk"), false, "nursing pads, not a wipe");

    assert.equal(diaperRimiFilter("Püksmähkmed Pants Little Movers 5 Boy 12-17kg, HUGGIES, 48 tk"), true);
    assert.equal(diaperRimiFilter("Ujumismähkmed Pampers S4-5 9-15kg 11tk"), false);
    assert.equal(diaperRimiFilter("Öömähkmed Pampers Ninjamas Space JP S7 10tk"), false, "Ninjamas night pants");

    assert.equal(diaperSelverFilter("Püksmähkmed Pants Little Movers 5 Boy 12-17kg, HUGGIES, 48 tk"), true);
    assert.equal(diaperSelverFilter("Mähkmed Little Swimmers S, HUGGIES, 7-15 kg/12 tk"), false);
    assert.equal(diaperSelverFilter("Püksmähkmed Dry Nites tüdrukutele, HUGGIES, 17-30 kg/10 tk"), false);
    assert.equal(diaperSelverFilter("Rinnapadjad, GRØN BALANCE, 50 tk"), false, "the real stray item found in category 308");

    assert.equal(diaperSelverWipeFilter("Niisked salvrätikud All Over Clear, HUGGIES, 56tk"), true);
    assert.equal(diaperSelverWipeFilter("Vatitikud ohutud imikutele mõeldud 56 tk, CANPOL, 56 tk"), false, "cotton swabs, not a wipe");
    assert.equal(diaperSelverWipeFilter("Beebipuuder talgivaba, BÜBCHEN, 80 g"), false, "baby powder, not a wipe");
  }),

  test("Baby food (Selver): excludes real formula ('piimasegu') so no product is ever in both Baby formula and Baby food — the owner's explicit rule for this batch", () => {
    assert.equal(babyFoodSelverFilter("Piimasegu al. sünnist NAN 1, 800g"), false, "real formula");
    assert.equal(babyFoodSelverFilter("Puuviljapüree õun-banaan HIPP, 125g"), true, "a real fruit purée");
    assert.equal(babyFoodSelverFilter("Piimapuder banaaniga, HIPP, 250g"), true, "a porridge, not formula");
  }),

  test("Household (Rimi): reusable tools (cloths, sponges, gloves, dust bags) and the shoe-care aisle Rimi bundles into the same department are excluded from the one combined SH-14 page; real cleaning/paper products pass", () => {
    assert.equal(householdRimiFilter("Prügikotid Eco Line 60l 15tk"), true);
    assert.equal(householdRimiFilter("Nõudepesumasina tabletid Somat All-in-One Ex 75tk"), true);
    assert.equal(householdRimiFilter("Mikrokiudlapid Spontex 16tk"), false, "reusable cloth");
    assert.equal(householdRimiFilter("Svammid Spontex 10tk 2+1"), false, "reusable sponge");
    assert.equal(householdRimiFilter("Kingaviks Silver must 75ml"), false, "shoe polish");
    assert.equal(householdRimiFilter("Kingapaelad valged 120cm"), false, "shoelaces");
  }),

  test("Personal care (Rimi): hair dye and hairbrushes/combs excluded from hair-care, bath sponges from body-care — the owner's call to keep this a hygiene-only category, separate from the planned Beauty deals feature", () => {
    assert.equal(personalCareRimiHairFilter("Šampoon Head & Shoulders Classic 400ml"), true);
    assert.equal(personalCareRimiHairFilter("Püsivärv Garnier Color Nat Olive Oil 3"), false, "hair dye, a cosmetic treatment");
    assert.equal(personalCareRimiHairFilter("Kamm lokkis juustele Afro"), false, "a comb, a reusable tool");

    assert.equal(personalCareRimiBodyFilter("Dušigeel Nivea Men 250ml"), true);
    assert.equal(personalCareRimiBodyFilter("Svamm Oreon 1tk"), false, "a bath sponge, a reusable tool");
  }),
  // ---- Batch 9 ----
  test("Batch 9 categories exist in both files with the same names; only the three alcohol categories are in ALCOHOL_CATEGORIES; alcoholMatching is on for those and the alcohol-free one, off everywhere else; buildItem carries it", () => {
    const { ALCOHOL_CATEGORIES, buildItem, alcoholMatchingFor } = require("./categories");
    for (const name of ["Cakes & pastries", "Instant food", "World cuisine", "Alcohol-free beer, cider & wine", "Beer & cider", "Wine", "Spirits"]) {
      assert.ok(CATEGORIES.some((c) => c.name === name), `${name} in categories.js`);
      assert.ok(SELVER_CATEGORIES[name], `${name} in selver.js`);
    }
    assert.deepEqual(ALCOHOL_CATEGORIES, ["Beer & cider", "Wine", "Spirits"]);
    for (const name of ["Beer & cider", "Wine", "Spirits", "Alcohol-free beer, cider & wine"]) assert.equal(alcoholMatchingFor(name), true, name);
    for (const name of ["Cakes & pastries", "Instant food", "World cuisine", "Dairy", "Drinks", "Pasta"]) assert.equal(alcoholMatchingFor(name), false, name);
    assert.equal(buildItem("Wine", "Rimi", "Vein 0,75l").alcoholMatching, true);
    assert.equal(buildItem("Dairy", "Rimi", "Piim 1l").alcoholMatching, undefined);
  }),
  test("Alcohol-free filter: required on every alcohol-free source (every store abbreviation, 0,0%, Zero/Null names; sparkling juice drinks on the same shelf fail), excluded from every alcohol source — so a 0,0% beer is never in the alcohol pool", () => {
    const category = (name) => CATEGORIES.find((c) => c.name === name);
    const freeBarbora = category("Alcohol-free beer, cider & wine").urls.barbora[0].nameFilter;
    const freeSelver = SELVER_CATEGORIES["Alcohol-free beer, cider & wine"].sources[0].nameFilter;
    for (const n of ["Alk.vaba õlu WARSTEINER Fresh 330ml", "Alk. Vaba Õlu A. Le Coq Premium 0.5L prk", "Alkovaba siider Hoggy's Apple 0,5l", "Alk.v. õlu Kronenbourg 1664 Blanc 0,33l pdl", "Al.vaba jook Ananassi-Vaarika Mull Null 0,75l", "Alkoh. vaba v.v. Wõlu Vahutav Rabarber 0,75l", "Õlu Corona Cero 0,0% 0,33l pudel", "Saku Rock Zero 500ml"]) {
      assert.equal(freeBarbora(n), true, n);
      assert.equal(freeSelver(n), true, n);
    }
    assert.equal(freeSelver("Sinikuslapuu-tüümian vahujook, ÖUN, 750 ml"), false, "a sparkling drink with no alcohol-free claim");
    for (const name of ["Beer & cider", "Wine", "Spirits"]) {
      const barbora = category(name).urls.barbora[0].nameFilter;
      const rimi = category(name).urls.rimi[0].nameFilter;
      const selver = SELVER_CATEGORIES[name].sources[0].nameFilter;
      for (const f of [barbora, rimi, selver]) {
        assert.equal(f("Alkoholivaba õlu Heineken 0,0% 0,5l"), false, `${name}: alcohol-free out`);
        assert.equal(f("Õlu Heineken 5% 0,5l purk"), true, `${name}: alcohol in`);
      }
    }
  }),
  test("Cakes, Instant food and World cuisine filters: dough/biscuits out of cakes; bouillon, sauce/meal mixes and desserts out of instant food; chips, sauces, spice mixes, rice, flour, vinegar and non-food out of world cuisine; Pasta no longer takes Asian noodles", () => {
    const category = (name) => CATEGORIES.find((c) => c.name === name);
    const cakes = SELVER_CATEGORIES["Cakes & pastries"].sources[1].nameFilter;
    assert.equal(cakes("Vaarika beseerull, REVAL KONDIITER, 300 g"), true);
    assert.equal(cakes("Kohupiimataskud karbis, LÕUNA PAGARID, 250 g"), true);
    assert.equal(cakes("Lehttainas, EESTI PAGAR, 500 g"), false);
    assert.equal(cakes("Küpsis kihiline Reval 140g"), false);
    const instant = category("Instant food").urls.rimi[0].nameFilter;
    assert.equal(instant("Kiirnuudlid kanamaitselised Knorr 57g"), true);
    assert.equal(instant("Kiirkartulipuder, FELIX, 220g"), true);
    assert.equal(instant("Juustusupp saiakuubikutega MAGGI, 19g"), true);
    assert.equal(instant("Kiirnuudliroog karrimaitselise kastmega, OYAKATA, 90 g"), true, "'kastmega' is the dish, not a sauce packet");
    assert.equal(instant("Kanapuljong I Love Eco 66g"), false);
    assert.equal(instant("Kaste pastale Spag. Bolognese Maggi Idea 44g"), false);
    assert.equal(instant("Idea segu kanalihale koore-ürdikastmes, MAGGI, 30 g"), false);
    assert.equal(instant("Segu kartuli-hakklihavormile, MAGGI, 42 g"), false);
    assert.equal(instant("Kiirkissell maasika 50g"), false);
    const world = category("World cuisine").urls.rimi[0].nameFilter;
    for (const n of ["Nisutortilja Mehhiko Santa Maria 371g", "Maisitaskud Taco Shells SANTA MARIA 135g", "Riisinuudlid THAI-CHOICE 250g", "Kookospiim Blue Dragon 400ml", "Punane karripasta SANTA MARIA 110g", "Riisilehed EXOTIC FOOD 100g", "Ingver sushi FUDO 190g"]) assert.equal(world(n), true, n);
    for (const n of ["Tortiljakrõpsud kerge soolaga Santa Maria 185", "Krevetikrõpsud Santa Maria 73g", "Kaste Teriyaki BLUE DRAGON 120g", "Taco maitseainesegu Santa Maria 28g", "Roheline jalapeno Rimi Planet 335/160g", "Sushiriis FUDO 500g", "Tempura jahu JAPANESE CHOICE 150g", "Sushi äädikas Japanese Choice 200ml", "Sushimatt JAPANESE CHOICE", "Kanamaitsel.kiirnuudlid THAI-CHOICE 85g", "Supisegu Tom Kha, SANTA MARIA, 30 g"]) assert.equal(world(n), false, n);
    const pasta = category("Pasta").urls.barbora.nameFilter;
    assert.equal(pasta("Munanuudlid THAI-CHOICE 500g"), false);
    assert.equal(pasta("Makaronid nuudlid EXTRA LINE 400g"), true);
    assert.equal(SELVER_CATEGORIES["Pasta"].sources[0].nameFilter("Riisinuudlid, BLUE DRAGON, 250 g"), false);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
