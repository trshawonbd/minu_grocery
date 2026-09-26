// The five categories this project scrapes: their store URLs, and
// whether strict packaged-product matching applies to each (see
// strictPackaging in match-products.js). This is the single source of
// truth for both — fetch-price.js reads it to know what to fetch and
// how to build real items, and buildItem() below (the one way a test
// or a by-hand check should construct an item) reads the same
// strictPackaging setting, so neither has to hardcode or guess it
// separately. That mattered in practice: an earlier by-hand check
// built items without setting strictPackaging at all, silently ran
// the lenient (non-strict) matching path instead of the real one, and
// reported pairs as "already matching" that weren't.

// Word-list helper for a urls.barbora/urls.rimi entry's nameFilter —
// same shape and purpose as the one in stores/selver.js (kept as its
// own copy rather than imported from there: a store module staying
// self-contained, and this orchestrator not reaching into one store's
// internals to filter another store's items).
function excludeWords(exclude, require) {
  return (name) => {
    const lower = name.toLowerCase();
    if (require && !require.some((p) => (p instanceof RegExp ? p.test(lower) : lower.includes(p)))) {
      return false;
    }
    return !exclude.some((p) => (p instanceof RegExp ? p.test(lower) : lower.includes(p)));
  };
}

// Shared between every water URL at Barbora and Rimi (see the Drinks
// category below) — Vitamin Well-style "vitamin water", magnesium
// water, sports water, and coconut water all turned up mixed into
// both stores' plain AND flavoured water categories alike. None of
// these are grocery drinking water despite the name; they're a
// functional/supplement drink, the same reasoning "vitamiinijoogid"
// and "spordijoogid" are excluded as their own categories elsewhere.
// "spordi" (genitive: e.g. "Spordivesi") is listed separately from
// "sport" since Estonian's consonant-gradation compounding means the
// bare stem doesn't always appear as a literal substring.
const waterFilter = excludeWords(["vitamiin", "sport", "spordi", "magneesium", "kookos", "infusion", "ekstrakt"]);

// Meat: species/animals out of scope (rabbit, wild boar, venison —
// see the "Veise-, lamba- ja ulukiliha"/"veise--lamba--ja-ulukiliha"
// sources below, which genuinely mix these in) and offal (liver,
// heart, kidney, gizzard, tongue, blood, bone-broth cuts — none of
// which are "chicken/pork/beef/lamb/minced meat" as scoped). Checked
// by hand against a real scrape before deciding these, not guessed.
const MEAT_EXCLUDE_GAME = ["küülik", "uluk", "metssea", "hirve", "põdra", "vutt", "vuti"];
const MEAT_EXCLUDE_OFFAL = ["maks", "süda", /\bneer/, "kops", "magu", /\bkeel\b/, "puljongikont", "supikogu", /\bluu\b/, "veri"];

// Applied to every Meat source regardless of which animal/cut it
// otherwise holds — checked by hand, all three turned up in more than
// one category: offal (see MEAT_EXCLUDE_OFFAL), "peekon" (bacon —
// cured, belongs with ham/deli, not a fresh cut), "eelküpsetatud"
// (pre-cooked, a ready-meal-adjacent product), and "frikadell"
// (shaped/processed meatballs, not a plain mince product). Combines
// with a source's own nameFilter (game, above) rather than replacing
// it, so both apply.
function addMeatExclusions(entry) {
  const { url, nameFilter } = typeof entry === "string" ? { url: entry, nameFilter: null } : entry;
  const meatFilter = excludeWords(["peekon", "eelküps", "frikadell", ...MEAT_EXCLUDE_OFFAL]);
  return { url, nameFilter: (name) => meatFilter(name) && (!nameFilter || nameFilter(name)) };
}

// A category's urls.barbora/urls.rimi can be a single URL or an array
// of them (see Dairy) — used when the store's own category tree has
// no single page covering the target products without also pulling
// in siblings that don't belong. Milk's own subcategory page, for
// example, is clean on its own; the group page one level up isn't
// (it also lists condensed milk, milk drinks, and plant-based
// dairy-free drinks) — so this points straight at the leaf, rather
// than fetching the broader page and filtering its results.
//
// strictPackaging defaults to true for any category not listed here —
// brand+size alone isn't enough for packaged goods sold under many
// near-identical variants (fat %, flavour), see sameBrandedProduct in
// match-products.js, and that's the common case for a new category
// (a fourth one added later gets the safer rule without anyone having
// to remember to opt it in). Baby formula and Fruits & vegetables are
// the explicit exceptions: each already has its own tested matching
// rule (formula's stage-number variant; produce's type/unit/variety),
// hand-verified separately — strict packaging is additive risk for
// them, not a fix, and formula's does not survive it (confirmed: 0
// matches instead of 2, since Barbora's "0K+" and Rimi's "al. sün."
// are the same "from birth" stage worded completely differently, and
// strict packaging's descriptor check can't tell that apart).
// Shared across Cheese's three sources at every store — cheese snacks
// (Barbora/Rimi/Selver all genuinely mix these into their main cheese
// leaf: "Juustupulgad"/"Juustusnäkk"/cheese sticks, chips, and one
// stuffed-pepper item, "Paprika ... juustuga" at Barbora and "Juustuga
// täidetud magus paprika" at Selver — checked by hand, not guessed),
// and plant-based cheese alternatives (Selver mixes in BON VEGAN tofu
// and VIOLIFE vegan cheese slices under the same category IDs as real
// cheese). "näk" (not "näkk") catches every real spelling found by
// hand: "Juustusnäkk" (Rimi), "Juustu snäkk" (Barbora), and
// "Juustusnäkid" (Selver) — Estonian consonant gradation drops one k
// in some inflected forms ("näkk" -> "näkid"), the same reasoning
// "spordi" is listed separately from "sport" in waterFilter above. A
// real bug found by hand in the first scrape run: "näkk" (double k)
// didn't catch Selver's "Juustusnäkid", letting a cheese-snack match
// a cheese-snack across stores instead of being excluded from either.
// "roh.pepper"/"magus pip" catch two more Barbora items missed by
// "paprika" alone — the same GRIKIOS cream-cheese-stuffed-pepper
// product line Selver lists in full ("Juustuga täidetud magus
// paprika"), but abbreviated at Barbora as "Roh.pepper. GRIKIOS
// toorjuust." and "Magus pip.GRIKIOS toorjuus.l.v." — neither contains
// "paprika" literally. "Salatijuust GRIKIOS" (a real salad cheese from
// the same brand) is untouched by either phrase.
const cheeseFilter = excludeWords(["näk", "pulgad", "laastud", "ribad", "tofu", "violife", "paprika", "roh.pepper", "magus pip"]);

// Shared across Curd & cottage cheese's sources at every store — all
// three genuinely mix dessert-style curd products into the same leaf
// as plain kohupiim/kodujuust: "kohupiimakreem" (curd cream, flavoured
// dessert pudding), "kohupiimapasta" (curd paste dessert; Barbora also
// abbreviates this as "Kohupiimap." with no full "pasta" substring —
// caught separately), "kohupiimavorm" (molded curd dessert, Rimi
// only), and Selver additionally mixes in Kinder chocolate biscuit
// cakes and one stray "Kohoke" (kohuke, a chocolate-glazed curd bar —
// already excluded by category choice everywhere else). A flavoured
// but non-dessert-form variant (jam, herbs, pickle-dill, chocolate
// chips) is NOT excluded here — that's a real flavoured product, not a
// dessert, and strict packaging's descriptor check already keeps it
// from matching the plain version.
const curdFilter = excludeWords(["kreem", "pasta", "kohupiimap.", "vorm", "kinder", "kohoke"]);

// Shared between Sausages and Ham & cold cuts — stores disagree on
// where dried/cured products go: Barbora and Selver put Serrano ham
// and pancetta in their *sausage* leaves, Rimi and Selver put fuet/
// salami/chorizo/kabanos in their *ham & deli* groups. Left as-is, the
// same product would land in two categories at different stores and
// never be compared. One rule everywhere instead: a name with a ham
// word is Ham & cold cuts, a name with a sausage word is Sausages —
// each contested leaf is fetched once per category, with the other
// category's words excluded. "singi" alongside "sink" — Estonian
// consonant gradation ("sink" → genitive "singi") means the bare word
// misses real ham names like "Singivalik"/"Singikreem"; found by hand
// in the first scrape when hand-reviewing what "sink"-only left out.
const HAM_WORDS = ["sink", "singi", "pancetta"];
const SAUSAGE_WORDS = ["vorst", "viiner", "sardell", "salaami", "salami", "fuet", "chorizo", "salchichon", "pepperoni", "kabanos", "servelaat", /\bkäkk/i];

// Diapers & baby wipes: special-purpose diapers (swim, and bedwetting
// pants for older kids like Huggies Dry Nites) are a genuinely
// different product from an everyday absorbent diaper — no S-number,
// priced and sized on a completely different scale — so they're kept
// out rather than mixed in with the size-numbered kind the owner's
// matching rule (size + piece count) is built for. "rinnapadi" (breast
// pad) is a real stray found by hand in Selver's own diaper listing
// (GRØN BALANCE) — a nursing accessory, not a diaper.
const DIAPER_EXCLUDE = excludeWords(["uju", "swim", "dry nites", "ninjamas", "öömähk", "oomahk", "rinnapad"]);
// The three stores' wet-wipe leaves are bundled in with unrelated baby
// hygiene items (shampoo, cream, powder, cotton swabs, bottles) —
// isolated by requiring both "wet" and "napkin" appear, the two
// Estonian words every real wet-wipe name states together
// ("Niisked salvrätikud", abbreviated "Niisk. salv."). Neither word
// alone is safe: "salv" alone also catches dry tissues/napkins
// elsewhere, "niis" alone catches other "moistened"-anything.
const DIAPER_WIPE_ONLY = excludeWords([], [/niis.*salv|salv.*niis/i]);

// Household: Rimi's whole cleaning-and-paper department is one single
// page (no per-leaf URL the way Barbora/Selver have) — real cleaning/
// paper products separated by name from reusable tools (cloths,
// sponges, gloves, vacuum dust bags — not a single-use consumable the
// way a trash bag is) and from the shoe-care aisle Rimi bundles into
// the same department (polish, laces, insoles, shoe deodorant — a
// different kind of good, not cleaning or paper).
const HOUSEHOLD_RIMI_EXCLUDE = excludeWords(["kinga", "jalanõu", "sisetald", "lapp", "lapid", "svamm", "käsn", "kinnas", "kindad", "tolmukot"]);

// Personal care: Rimi's hair-care and body-care leaves are each one
// page too (see HOUSEHOLD_RIMI_EXCLUDE) — hair dye ("püsivärv"/
// "poolpüsivärv") and combs/brushes excluded from hair-care (a
// cosmetic treatment and a reusable tool, neither "hygiene"); bath
// sponges (reusable tool) from body-care.
const PERSONAL_CARE_RIMI_HAIR_EXCLUDE = excludeWords(["värv", "kamm", "juuksehari"]);
const PERSONAL_CARE_RIMI_BODY_EXCLUDE = excludeWords(["svamm", "käsn"]);

// Batch 9 — alcohol-free drinks: "alcohol-free" in every abbreviation
// the three stores use ("Alkoholivaba", "Alk.vaba", "Alk. Vaba",
// "Alkovaba", "Alk.v.", "Al.vaba", "Alkoh. vaba"), plus a "0,0%" or a
// "Zero"/"Null" product name. REQUIRED on every alcohol-free source
// (Barbora's and Selver's alcohol-free shelves also hold sparkling
// juice-style drinks with no beer/wine/cider claim at all) and
// EXCLUDED from every alcohol source — so an alcohol-free beer can
// never be scraped into the same pool as its alcoholic twin, which is
// how "0.0% never matches the alcoholic version" is guaranteed
// structurally, not by a matching rule alone. Kept identical in
// scraper/stores/selver.js (its own copy, same reasoning as
// excludeWords above).
const ALCOHOL_FREE_PATTERN = /(?:alk(?:oh(?:oli)?)?|al)\.?\s*v(?:aba|\.)|alkovaba|0[,.]0\s*%|(?<![\p{L}])(?:zero|null)(?![\p{L}])/iu;
const ALCOHOL_FREE_ONLY = excludeWords([], [ALCOHOL_FREE_PATTERN]);
const NO_ALCOHOL_FREE = excludeWords([ALCOHOL_FREE_PATTERN]);

// Cakes & pastries: packaged cakes, cake rolls, keeks, pastries only.
// Excluded by name wherever a store's confectionery shelf mixes them
// in: raw dough/pastry sheets ("tainas"/"taigen" — Selver's "Koogid,
// rullbiskviidid, tainad" leaf), biscuits/crackers/wafers/gingerbread
// (Biscuits' scope — Rimi's "kondiitritooted" holds a layered Reval
// biscuit). In-store bakery is never fetched (Selver's "Selveri
// Pagarid" 252, Barbora's "värsked pagaritooted", Rimi's "Rimi
// pagarid" SH-6-6 are not sources).
const CAKES_FILTER = excludeWords(["tain", "taig", "küpsis", "kreeker", "vahvl", "piparkoo", "präänik"]);

// Instant food — the owner's scope: instant noodles, instant mashed
// potato, and instant/cup soups, nothing else on the same shelf. A
// positive list (the name must say noodle/soup/mash/purée/potato/
// rice/pasta/dish) plus exclusions for the shelf-mates: bouillon
// (puljong), dry sauce and meal-mix packets (Maggi Idea/Fix, "segu",
// "kaste" as a whole word — "kastmega" on an instant noodle dish is
// the dish itself and stays), sweet instant desserts (kissell,
// pudding, jelly, cocoa), casserole mixes ("vorm"), tins and frozen.
const INSTANT_FILTER = excludeWords(
  ["puljong", /(?<![\p{L}])kaste(?![\p{L}])/u, /(?<![\p{L}])kastme(?![\p{L}])/u, /(?<![\p{L}])segu(?![\p{L}])/u, "idea", /(?<![\p{L}])fix(?![\p{L}])/u, "kissell", "puding", "pudding", "tarretis", "kakao", "maitseaine", "vorm", "konserv", "külmutatud"],
  [/nuudl/, /supp/, /pud(?:er|ru)/, /püree/, /kartuli/, /(?<![\p{L}])riis/u, /roog|road/, /pasta/, /makaron/],
);

// World cuisine — the owner's call: only what no existing category
// owns. Tortillas/wraps/taco shells, Asian noodles (rice, glass, egg,
// ramen, udon, soba), coconut milk/cream/drink for cooking, curry
// pastes, sushi ingredients (nori, rice paper, wasabi, pickled
// ginger), miso, kimchi, tofu. Everything else on the same shelves
// stays where it already is or out: tortilla/prawn chips (Chips &
// snacks), soy/teriyaki/oyster and every other sauce (Sauces &
// condiments), taco/fajita/curry spice mixes (Spices), jalapeños
// (Canned food), sushi rice and tempura flour (Rice & grains / Flour
// & sugar own rice and flour), sushi vinegar, instant noodles and cup
// soups (Instant food), salsa and dips, and non-food (sushi mats,
// chopsticks).
const WORLD_FILTER = excludeWords(
  ["krõps", "krõp", "chips", "kaste", "kastme", "maitseaine", /(?<![\p{L}])segu(?![\p{L}])/u, "äädik", "matt", "pulgad", "pulk", "jahu", "sushiriis", /(?<![\p{L}])riis(?![\p{L}])/u, "supisegu", "supp", "kiir", "salsa", "dipp", /(?<![\p{L}])dip(?![\p{L}])/u, "külmutatud"],
  [/tortil/, /wrap/, /taco/, /nuudl/, /kookos(?:piim|kreem|jook|vesi)/, /karri\s*-?pasta|currypasta|curry\s*paste/, /riisipaber|riisileh/, /(?<![\p{L}])nori(?![\p{L}])/u, /wasabi/, /(?<![\p{L}])miso(?![\p{L}])/u, /kimchi/, /tofu/, /sushi/, /pad\s*thai/, /burrito/, /enchilada/, /fajita/],
);

// Pasta must not take the Asian noodles World cuisine now owns
// (Thai-Choice egg noodles, rice/glass noodles, udon, ramen, soba) —
// one product, one category.
const PASTA_NO_ASIAN = excludeWords(["thai", "riisinuudl", "klaasnuudl", "udon", "ramen", "soba", "aasia", "wok"]);

const CATEGORIES = [
  {
    // The owner's call: follow-on and growing-up formula (stage 2, 3,
    // 4 and similar — Nestlé's "Plus2"/"Plus3"/"Plus4", Aptamil's
    // piimajook range) belong in this same category, matched the same
    // way as stage 1 always has been (stage numbers must agree).
    // Barbora splits by stage across separate leaves (from-birth,
    // follow-on 6mo+, growing-up 12mo+, plus a fourth leaf for special-
    // needs formula — lactose-free, anti-reflux, goat milk — that
    // isn't split by stage at all); Rimi's own "breast-milk-
    // substitutes" leaf already lists every stage on one page (added
    // nothing new there), so only its separate liquid/ready-to-feed
    // leaf needed adding. Selver was already covering every stage —
    // its own filter only requires "piimasegu" appear in the name,
    // with no stage split of its own to miss.
    name: "Baby formula",
    strictPackaging: false,
    // Display only (this category never compares descriptors): Rimi's
    // "P.segu" leaves a bare "P" as the first word, and "segu" alone is
    // just "mix" — neither belongs in a product's name.
    impliedDescriptors: ["p", "segu"],
    urls: {
      barbora: [
        "https://barbora.ee/lastekaubad/piimasegud-ja-jatkupiimasegud/piimasegud-alates-sunnist",
        "https://barbora.ee/lastekaubad/piimasegud-ja-jatkupiimasegud/jatkupiimasegud-6-kuud",
        "https://barbora.ee/lastekaubad/piimasegud-ja-jatkupiimasegud/piimajoogid-12-kuud",
        "https://barbora.ee/lastekaubad/piimasegud-ja-jatkupiimasegud/eriotstarbelised-piimasegud",
      ],
      rimi: [
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/breast-milk-substitutes/c/SH-5-6-18",
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/liquid-breast-milk-substitutes/c/SH-5-6-25",
      ],
    },
  },
  {
    name: "Fruits & vegetables",
    strictPackaging: false,
    urls: {
      barbora: "https://barbora.ee/koogiviljad-puuviljad",
      rimi: "https://www.rimi.ee/epood/ee/tooted/puuviljad-koogiviljad-lilled/c/SH-12",
    },
  },
  {
    // Starting scope: milk, butter, eggs, yoghurt. Barbora splits
    // yoghurt into unflavored/flavored with no single page covering
    // both without also listing desserts; Rimi doesn't split it the
    // same way, so the two stores' url lists aren't the same length —
    // expected, not a bug.
    name: "Dairy",
    // Eggs are sold by count ("10tk", "M10") — see pieceCountSizes /
    // matchSize in match-products.js; "tk" left over after the count
    // is read is implied.
    pieceCountSizes: true,
    impliedDescriptors: ["tk"],
    urls: {
      barbora: [
        "https://barbora.ee/piimatooted-ja-munad/piimad/piimad",
        "https://barbora.ee/piimatooted-ja-munad/void-ja-margariinid/void",
        "https://barbora.ee/piimatooted-ja-munad/munad/kanamunad",
        "https://barbora.ee/piimatooted-ja-munad/jogurtid-ja-desserdid/maitsestamata-jogurtid",
        "https://barbora.ee/piimatooted-ja-munad/jogurtid-ja-desserdid/maitsestatud-jogurtid",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/piimad/piim/c/SH-11-8-37",
        "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/void-ja-margariinid/voi/c/SH-11-9-41",
        "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/munad/munad/c/SH-11-7-29",
        "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/jogurtid-desserdid-kohukesed/jogurtid/c/SH-11-2-5",
      ],
    },
  },
  {
    // Strict packaging applies (the default — no opt-out here): a
    // brand sells several genuinely different loaves at the same
    // size (rye vs wheat, sliced vs whole), so brand+size alone isn't
    // enough, the same reasoning as Dairy.
    //
    // leib/sai/röstsai/sepik only — excluded on both stores: buns
    // ("kuklid"), crisp bread ("näkileivad"), cakes/pastries/cookies
    // (both stores' "kondiitritooted"/confectionery branches), and
    // each store's own in-store bakery department (Barbora's
    // "värsked pagaritooted", Rimi's "Rimi Pagarid") — sold fresh,
    // not a supplier-branded packaged product, the same reasoning
    // flowers were excluded from Rimi's produce category.
    name: "Bread",
    urls: {
      // "muud-leivatooted" ("other bread products") is left out too —
      // dominated by breadcrumbs (Riivsai, Panko) with only a few
      // real lavash loaves mixed in, no clean split available.
      barbora: [
        "https://barbora.ee/leivad-saiad-kondiitritooted/leivad-ja-saiad/leivad",
        "https://barbora.ee/leivad-saiad-kondiitritooted/leivad-ja-saiad/palaleivad",
        "https://barbora.ee/leivad-saiad-kondiitritooted/leivad-ja-saiad/saiad-ja-sepikud",
        "https://barbora.ee/leivad-saiad-kondiitritooted/leivad-ja-saiad/rostsaiad",
      ],
      // Rimi's "sai" leaf already includes sepik — no separate URL
      // for it. "koorikleib-kuklid" (crusty bread mixed with actual
      // buns, e.g. "Burgerikukkel") and "rahvusleivad" (lavash/
      // tortilla flatbread, not leib/sai/röstsai/sepik) are both left
      // out — neither has a clean split between what we want and what
      // we don't.
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/leivad-saiad-sepikud/leib/c/SH-6-3-15",
        "https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/leivad-saiad-sepikud/sai/c/SH-6-7-22",
        "https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/leivad-saiad-sepikud/rostsai/c/SH-6-7-21",
      ],
    },
  },
  {
    // Non-alcoholic only: water (still/sparkling, flavoured or not),
    // juice and nectar, carbonated soft drinks (including tonic —
    // sold in the same aisle, same carbonated-mixer style), and kali
    // (kvass). Excluded everywhere: real alcohol, alcohol-free beer/
    // cider/wine/cocktails (still the same excluded product types,
    // 0.0% or not), energy drinks, syrups, smoothies/purées, milk
    // drinks, coffee, tea, sports drinks, and vitamin/functional
    // "water" (Vitamin Well-style, magnesium water, coconut water —
    // a different product than grocery drinking water despite the
    // name).
    //
    // Water is flavoured or not at every store — a clean flavoured-
    // vs-plain split turned out unreliable to get right by name
    // everywhere (Selver in particular names a flavour as a bare noun
    // — "Vesi Ananass" — with no consistent "flavoured" marker to
    // filter on), and it isn't needed: strict packaging's descriptors
    // check already blocks a flavoured item from matching a plain one
    // of the same brand/size, the same way it already caught sliced-
    // vs-whole bread without a dedicated rule (see match-products.js
    // tests). So flavoured water is included rather than fought.
    name: "Drinks",
    urls: {
      // "kaljad-ja-muud-kaaritatud-joogid" ("kali AND OTHER fermented
      // drinks") is >90% real kali with one or two kombucha items
      // mixed in, no finer URL to split on — accepted as noise, same
      // trade-off as Selver's "Saiad" bun contamination in Bread.
      barbora: [
        { url: "https://barbora.ee/joogid/veed/gaseerimata-veed", nameFilter: waterFilter },
        { url: "https://barbora.ee/joogid/veed/gaseeritud-veed", nameFilter: waterFilter },
        { url: "https://barbora.ee/joogid/veed/maitsestatud-veed", nameFilter: waterFilter },
        "https://barbora.ee/joogid/mahlad-nektarid-ja-mahlajoogid/mahlad-ja-nektarid",
        "https://barbora.ee/joogid/karastusjoogid/limonaadid",
        "https://barbora.ee/joogid/karastusjoogid/toonikud",
        "https://barbora.ee/joogid/karastusjoogid/kaljad-ja-muud-kaaritatud-joogid",
      ],
      // Rimi's whole "mahlad, mahlajoogid ja siirupid" tree mixes
      // real juice/nectar with juice drinks ("mahlajook") and syrup
      // at every flavour-based subcategory, with no ID-level split —
      // name-filtered instead: keep only items naming "mahl" or
      // "nektar", and drop anything that's actually a "...jook"
      // variant or a concentrate. "karastusjoogid" (the parent
      // listing) mixes in iced tea; its clean "limonaad-karastusjook"
      // leaf is used instead.
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/vesi/maitsestamata-vesi-gaseerimata/c/SH-3-12-8", nameFilter: waterFilter },
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/vesi/maitsestamata-vesi-gaseeritud/c/SH-3-12-9", nameFilter: waterFilter },
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/vesi/maitsestatud-vesi-gaseerimata/c/SH-3-12-10", nameFilter: waterFilter },
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/vesi/maitsestatud-vesi-gaseeritud/c/SH-3-12-11", nameFilter: waterFilter },
        {
          url: "https://www.rimi.ee/epood/ee/tooted/joogid/mahlad-mahlajoogid-ja-siirupid/c/SH-12-20",
          nameFilter: excludeWords(["jook", "kontsentraat"], ["mahl", "nektar"]),
        },
        "https://www.rimi.ee/epood/ee/tooted/joogid/varske-mahl-smuuti/varske-mahl/c/SH-12-8-36",
        "https://www.rimi.ee/epood/ee/tooted/joogid/karastusjoogid/limonaad-karastusjook/c/SH-3-7",
        "https://www.rimi.ee/epood/ee/tooted/joogid/karastusjoogid/laste-peojoogid/c/SH-12-22",
        "https://www.rimi.ee/epood/ee/tooted/joogid/karastusjoogid/kali/c/SH-3-6",
        "https://www.rimi.ee/epood/ee/tooted/joogid/toonik/c/SH-3-11",
      ],
    },
  },
  {
    // Scope: fresh and frozen chicken, pork, beef, lamb, and minced
    // meat (including turkey mince) — plus raw formed patties/burgers/
    // kebabs, still ground/mixed meat, not a ready meal. Excluded
    // everywhere below: rabbit, wild boar, venison (MEAT_EXCLUDE_GAME),
    // any offal (liver/heart/kidney/gizzard/tongue/blood/bone-broth
    // cuts — MEAT_EXCLUDE_OFFAL), bacon ("peekon" — cured, belongs with
    // ham/deli, not a fresh cut), pre-cooked items ("eelküpsetatud"),
    // and meatballs ("frikadell" — shaped/processed, not a plain mince
    // product). Sausages, ham, smoked/cured meat, and fish are already
    // excluded by category choice, never reached by these filters.
    //
    // cheapestByUnitPrice: Meat is the first category where "cheapest"
    // is decided by per-kg price (see storeUnitPrice in fetch-price.js
    // and frontend/pricing.js's rankKey), not pack price — a huge
    // fraction of real meat listings are sold "per kg" with no weight
    // of their own in the name at all (found by hand: 42% of a real
    // sample), so pack price alone isn't comparable across stores.
    //
    // matchAcrossWeights: also Meat-only (see sameBrandedProduct in
    // match-products.js) — a 400g pack, a 500g pack, and a "sold per
    // kg" listing of the same real cut/brand/marinade are the same
    // product once cheapest is decided per-kg instead of per-pack; a
    // multipack ("2x500g") is still never folded into a single pack.
    name: "Meat",
    cheapestByUnitPrice: true,
    matchAcrossWeights: true,
    urls: {
      barbora: [
        "https://barbora.ee/liha-kala-valmistoit/liha/kiauliena", // pork
        "https://barbora.ee/liha-kala-valmistoit/liha/linnuliha", // poultry
        // Also holds rabbit (excluded) alongside beef — no dedicated
        // beef-only leaf at Barbora.
        { url: "https://barbora.ee/liha-kala-valmistoit/liha/veis-ja-muu-varske-liha", nameFilter: excludeWords(MEAT_EXCLUDE_GAME) },
        "https://barbora.ee/liha-kala-valmistoit/liha/hakkliha", // minced, incl. raw kebab/patty mixes
        {
          // Dominated by liver/gizzard/soup bones and meatballs —
          // checked by hand, only a handful of real frozen cuts.
          url: "https://barbora.ee/kulmutatud-tooted/kulmutatud-liha-ja-kalatooted/kulmutatud-lihatooted",
          nameFilter: excludeWords([...MEAT_EXCLUDE_OFFAL, ...MEAT_EXCLUDE_GAME, "frikadell"]),
        },
      ].map((entry) => addMeatExclusions(entry)),
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/sealiha/varske-sealiha/c/SH-8-14-25",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/sealiha/maitsestatud-sealiha/c/SH-8-14-20",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/linnuliha/varske-kana-broiler/c/SH-8-9-25",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/linnuliha/maitsestatud-linnuliha/c/SH-8-9-20",
        // Also holds rabbit and (rarely) game — beef/lamb only wanted.
        {
          url: "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/veise--lamba--ja-ulukiliha/c/SH-8-21",
          nameFilter: excludeWords(MEAT_EXCLUDE_GAME),
        },
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/hakkliha/veisehakkliha/c/SH-8-2-1",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/hakkliha/kanahakkliha/c/SH-8-2-3",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/hakkliha/seguhakkliha/c/SH-8-2-5",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/hakkliha/hakktooted/c/SH-8-2-6", // raw formed patties, e.g. burgeripihv
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/hakkliha/seahakkliha/c/SH-8-2-7",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/hakkliha/kalkunihakkliha/c/SH-8-2-8", // turkey mince — in scope
        {
          // Only 4 items total when checked by hand — 3 are offal/
          // quail (excluded), 1 (frozen chicken neck) is in scope.
          url: "https://www.rimi.ee/epood/ee/tooted/kulmutatud-toidukaubad/kulmutatud-lihatooted/c/SH-4-4",
          nameFilter: excludeWords([...MEAT_EXCLUDE_OFFAL, "vutt", "vuti"]),
        },
      ].map((entry) => addMeatExclusions(entry)),
    },
  },
  {
    // Strict packaging applies (the default). Scope: dry pasta of any
    // shape/grain, including gluten-free and egg pasta. Excluded:
    // ready meals, sauces (neither turned up here by hand, but the
    // scope excludes them on principle the same way as every other
    // category).
    name: "Pasta",
    // Every store's own generic "this is pasta" word — dropped here
    // only (see impliedDescriptors below CATEGORIES): "pasta" alone is
    // a real word elsewhere (a paste in Sauces/Spices). "durum"/
    // "durumnisu(jahu)pasta" is always true of these dried pastas
    // (Tartu Mill states it, Barbora doesn't); "täistera" (whole
    // grain) is NOT here — a genuinely different product.
    impliedDescriptors: ["makaronid", "makaron", "makar", "pasta", "durum", "durumnisupasta", "durumnisujahupasta"],
    urls: {
      // The parent page aggregates every leaf (gluten-free, egg,
      // lasagne/cannelloni, whole-grain, the main "makaronid" leaf) —
      // checked by hand, clean: no ready meals or sauces mixed in.
      // Asian noodles (Thai-Choice egg noodles were here) belong to
      // World cuisine since batch 9 — see PASTA_NO_ASIAN.
      barbora: { url: "https://barbora.ee/kauasailivad-toidukaubad/makaronid", nameFilter: PASTA_NO_ASIAN },
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/makaronid-pasta/c/SH-13-14-20",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/gluteenivaba-pasta/c/SH-13-14-21",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/munapasta/c/SH-13-14-23",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/lasanje-ja-cannellonid/c/SH-13-14-86",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/taisterapasta/c/SH-13-14-87",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: rice of any type
    // (basmati, jasmine, long-grain, risotto, wild, pudding/round) and
    // whole grains/groats (buckwheat, barley, oats, couscous, bulgur,
    // quinoa, millet, semolina) — excluded: legumes (peas, beans,
    // lentils), which share a category with grains at every store but
    // aren't a grain, and grain/flour MIXES.
    name: "Rice & grains",
    urls: {
      // "tangained" (grains) aggregates every leaf including legumes
      // (herned/oad/laatsed) — filtered by name, the store's own
      // category tree has no finer split. "riisid" is its own clean
      // parent, no filter needed.
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/tangained/riisid",
        { url: "https://barbora.ee/kauasailivad-toidukaubad/tangained", nameFilter: excludeWords(["hernes", "herned", "oad", "lääts"]) },
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/riis/c/SH-13-15-90",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/makaronid-ja-riis/riis-kotikestes/c/SH-13-15-91",
        {
          url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/teraviljad-ja-kaunviljad/c/SH-13-7",
          nameFilter: excludeWords(["hernes", "herned", "oad", "lääts"]),
        },
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: flour of any
    // grain (wheat, rye, whole-grain, gluten-free, rice, oat, almond,
    // ...) and starch, plus granulated/brown/powdered/speciality sugar
    // — excluded: flour/baking mixes ("segu", "pulber" — pancake,
    // muffin, cake, pizza-dough mixes), and sugar substitutes/
    // sweeteners ("asendaja", "magusaine") and sugar syrup
    // ("siirup") — a real sweetener or syrup, not granulated sugar.
    name: "Flour & sugar",
    urls: {
      barbora: [
        // "jahusegud" (flour mixes) is its own dedicated leaf, left
        // out entirely rather than fetched and filtered; the other
        // four are real flour types, with the same "segu" filter
        // applied as a safety net (one stray "Mitmevilja jahusegu"
        // turned up in "muud-jahud" by hand).
        { url: "https://barbora.ee/kauasailivad-toidukaubad/jahud/nisujahud", nameFilter: excludeWords(["segu"]) },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/jahud/rukkijahud", nameFilter: excludeWords(["segu"]) },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/jahud/taisterajahud", nameFilter: excludeWords(["segu"]) },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/jahud/muud-jahud", nameFilter: excludeWords(["segu"]) },
        {
          url: "https://barbora.ee/kauasailivad-toidukaubad/maitseained/suhkrud-ja-suhkruasendajad",
          nameFilter: excludeWords(["asendaja", "magusaine", "siirup"]),
        },
      ],
      rimi: [
        {
          // Aggregates every flour leaf (incl. the dedicated
          // "jahusegud" mixes leaf and the gluten-free leaf, which
          // itself mixes real flour with mixes) — checked by hand,
          // filtered by name rather than trying to cherry-pick leaves
          // that don't cleanly separate mixes from flour anyway.
          url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/jahu-ja-jahusegud/c/SH-13-4",
          nameFilter: excludeWords(["segu", "pulber"]),
        },
        {
          url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/suhkur/c/SH-13-13-85",
          nameFilter: excludeWords(["asendaja", "magusaine", "siirup"]),
        },
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: cooking oil of
    // any kind (olive, rapeseed/canola, sunflower, coconut, and
    // specialty oils — grapeseed, sesame, avocado, walnut, ...) —
    // excluded: oil sprays ("sprei"), vinegar, and vinegar-based
    // sauces/glazes ("äädik", "palsamikreem"), which share a category
    // with oil at every store.
    name: "Cooking oil",
    urls: {
      // Aggregates all 5 leaves (coconut/other/olive/sunflower/
      // rapeseed) — checked by hand, several "sprei" (spray) items
      // turned up mixed in, filtered by name; no vinegar here (that's
      // its own separate department at Barbora, unlike Rimi/Selver).
      barbora: { url: "https://barbora.ee/kauasailivad-toidukaubad/olid", nameFilter: excludeWords(["sprei"]) },
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/kookosoli/c/SH-13-19-106",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/muu-toiduoli/c/SH-13-19-107",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/oliivioli/c/SH-13-19-108",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/paevalilleoli/c/SH-13-19-110",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/rapsioli/c/SH-13-19-111",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/vaarisoliiviolid/c/SH-13-19-114",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: cheese of any
    // type (Eesti, Gouda, Edam, mozzarella, feta, blue/mould, goat/
    // sheep milk, hard, soft, processed/melted, cream/spreadable) —
    // excluded everywhere: cheese snacks/sticks/chips (see
    // cheeseFilter above) and plant-based cheese alternatives (tofu,
    // Violife).
    name: "Cheese",
    urls: {
      // Aggregates all 10 of Barbora's own leaves (mould, snacks,
      // goat-milk, hard, sliced, spreadable, mozzarella, soft/white,
      // processed, chunk) in one page — checked by hand, 52 items, 6
      // of which are cheese snacks/a stuffed pepper, filtered by name.
      barbora: { url: "https://barbora.ee/piimatooted-ja-munad/juustud", nameFilter: cheeseFilter },
      // Aggregates all 10 of Rimi's own leaves the same way — checked
      // by hand (~200+ items across feta/mozzarella, grill cheese,
      // mould, snacks, goat/sheep, mascarpone/ricotta, spreadable/
      // cream/smoked, grated, chunk, sliced).
      rimi: { url: "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/juust/c/SH-11-3", nameFilter: cheeseFilter },
    },
  },
  {
    // Strict packaging applies (the default). Scope: curd (kohupiim)
    // and cottage cheese (kodujuust) of any fat%/flavour — excluded
    // everywhere: dessert-form curd products (curd cream, curd paste,
    // molded curd dessert — see curdFilter above) and kohukesed
    // (chocolate-glazed curd bars — excluded by category choice at
    // Barbora/Selver, which both have kohukesed as a separate sibling
    // leaf never fetched here; caught by name at Rimi/Selver where a
    // stray one leaked into the same leaf as plain curd).
    name: "Curd & cottage cheese",
    urls: {
      // Barbora's two leaves are used directly rather than the parent
      // (which also aggregates kohukesed and a dedicated desserts
      // leaf) — kodujuustud is clean as-is; kohupiimad itself still
      // mixes in curd-cream/curd-paste desserts, filtered by name.
      barbora: [
        "https://barbora.ee/piimatooted-ja-munad/kohupiimatooted/kodujuustud",
        { url: "https://barbora.ee/piimatooted-ja-munad/kohupiimatooted/kohupiimad", nameFilter: curdFilter },
      ],
      rimi: { url: "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/kohupiim-kodujuust/c/SH-11-4", nameFilter: curdFilter },
    },
  },
  {
    // Strict packaging applies (the default). Scope: cream (vahukoor,
    // toidukoor, kohvikoor, köögikoor) and sour cream (hapukoor,
    // smetana, creme fraiche) of any fat% — excluded everywhere:
    // plant-based cream alternatives (oat, coconut, soy — Barbora's
    // own "taimsed-koored" sibling leaf, never fetched here).
    name: "Cream & sour cream",
    urls: {
      // Barbora's two clean leaves, used directly — the parent one
      // level up also aggregates "taimsed-koored" (plant-based
      // creams), with no filter needed once the leaves are used
      // instead (checked by hand: 23 items between the two, matching
      // the parent's 28 minus the plant leaf's 5 exactly).
      barbora: [
        "https://barbora.ee/piimatooted-ja-munad/hapukoored-ja-koored/koored",
        "https://barbora.ee/piimatooted-ja-munad/hapukoored-ja-koored/hapukoor",
      ],
      // Rimi's "Koored" aggregates hapukoor + vahukoor/kohvikoor with
      // no plant-based items mixed in (checked by hand) — no filter.
      rimi: "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/koored/c/SH-11-5",
    },
  },
  {
    // Strict packaging applies (the default). Scope: kefir (plain and
    // flavoured/drinkable), sour milk (hapupiim), buttermilk (pett),
    // and ryazhenka/baked fermented milk (rjaženka) — all four are the
    // same "cultured sour milk" family, bundled together at every
    // store's own category tree (Barbora: "keefirid-ja-hapupiimad";
    // this is also exactly what Dairy's own Selver milk filter already
    // excludes from "milk" — see the Dairy category's id:234 comment —
    // confirming these were always meant to live here, not there).
    // Excluded: one real miscategorized item found by hand, a cold
    // beet soup sold under Barbora's kefir leaf despite not being a
    // dairy product at all.
    name: "Kefir & buttermilk",
    urls: {
      // Aggregates all 3 of Barbora's own leaves (keefirid,
      // keefirijoogid, hapupiimajoogid) — checked by hand, 30 items,
      // one of which is a cold beet soup, filtered by name.
      barbora: { url: "https://barbora.ee/piimatooted-ja-munad/keefirid-ja-hapupiimad", nameFilter: excludeWords(["supp"]) },
      // Rimi's "Hapupiim ja keefir" is clean as-is (checked by hand:
      // 23 items, all real kefir/sour milk, no soup/dessert/plant-based).
      rimi: "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/hapupiim-ja-keefir/c/SH-11-1",
    },
  },
  {
    // Strict packaging applies (the default). Scope: coffee to brew at
    // home — beans, ground, instant, capsules/pods (Dolce Gusto,
    // Nespresso, A Modo Mio, generic pods), and coffee substitutes
    // (chicory/roasted-grain "coffee", e.g. Rimi's "Sigur"/"Inka" —
    // caffeine-free but sold and used the same way, same aisle at
    // every store). Excluded: coffee whitener/creamer powder (a
    // separate Barbora leaf, "kohvi-valmistamiseks" — not coffee
    // itself), ready-to-drink bottled coffee drinks (Barbora's
    // "kohvijoogid" leaf — a drink, not a pantry product to brew; the
    // existing Drinks category excludes coffee drinks for the same
    // reason), and two real finds by hand in the first scrape:
    // Matcha Latte (a green-tea-based instant drink mix, MOKATE/
    // JACOBS — Barbora's "lahustuvad-kohvid" leaf mixes it in despite
    // it having no coffee in it at all) and a Nesquik cocoa capsule
    // (Rimi's "Kohvikapslid" leaf serves both coffee and cocoa
    // capsules for the same machines).
    name: "Coffee",
    urls: {
      // Direct leaves, not the "kohv-tee-kakao" parent — avoids ever
      // fetching the whitener/RTD-drink leaves at all, rather than
      // fetching and filtering them out.
      barbora: [
        "https://barbora.ee/joogid/kohv-tee-kakao/kohvioad",
        { url: "https://barbora.ee/joogid/kohv-tee-kakao/lahustuvad-kohvid", nameFilter: excludeWords(["match"]) },
        "https://barbora.ee/joogid/kohv-tee-kakao/jahvatatud-kohvid",
        "https://barbora.ee/joogid/kohv-tee-kakao/kohvikapslid-dolce-gusto-masinatele",
        "https://barbora.ee/joogid/kohv-tee-kakao/kohvikapslid-nespresso-masinatele",
        "https://barbora.ee/joogid/kohv-tee-kakao/kohvikapslid-a-modo-mio-masinatele",
        "https://barbora.ee/joogid/kohv-tee-kakao/kohvipadjad",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/jahvatatud-kohv/c/SH-13-9-44",
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/kohvikapslid/c/SH-13-9-45", nameFilter: excludeWords(["kakaokapslid"]) },
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/kohvioad/c/SH-13-9-46",
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/lahustuv-kohv/c/SH-13-9-47",
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/muud-kuumad-joogid/c/SH-13-9-48",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: tea (black,
    // green, fruit, herbal, specialty/gift-boxed) and cocoa/drinking
    // chocolate (powder, drink mix, capsules) — bundled into one
    // category because Barbora and Rimi both shelve cocoa directly
    // inside their own "coffee, tea, cocoa" department, the same aisle
    // as tea, not with confectionery. Matcha Latte (green tea, not
    // coffee — see the Coffee category above, which excludes it) and
    // Nesquik-branded flavoured milk drink powders both belong here
    // and are kept. A real find by hand: MASHIE fruit/berry purée
    // squeeze pouches (not tea, cocoa, or coffee at all) mixed into
    // both Barbora's fruit/herbal-tea leaf and Rimi's tea-gift-box
    // leaf — excluded by name everywhere.
    name: "Tea & cocoa",
    urls: {
      barbora: [
        "https://barbora.ee/joogid/kohv-tee-kakao/must-tee",
        "https://barbora.ee/joogid/kohv-tee-kakao/roheline-tee",
        { url: "https://barbora.ee/joogid/kohv-tee-kakao/puuvilja-ja-taimeteed", nameFilter: excludeWords(["mashie", "püree"]) },
        // "muud-teed" ("other teas") also holds "Tee kontsentraat"
        // (liquid tea concentrate, sold in ml — a syrup-like iced-tea
        // base, not tea to brew), filtered by name; the rest (instant
        // tea, Ceylon, white, crushed/granulated tea) stays.
        { url: "https://barbora.ee/joogid/kohv-tee-kakao/muud-teed", nameFilter: excludeWords(["kontsentraat"]) },
        "https://barbora.ee/joogid/kohv-tee-kakao/kakaod",
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/eritee-kinkekarbid/c/SH-13-17-94", nameFilter: excludeWords(["mashie", "püree"]) },
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/must-tee/c/SH-13-17-95",
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/puuviljatee/c/SH-13-17-96",
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/roheline-tee/c/SH-13-17-97",
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/taimetee/c/SH-13-17-98",
        "https://www.rimi.ee/epood/ee/tooted/joogid/kohv-tee-kakao/kakao/c/SH-13-5",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: breakfast cereal,
    // muesli, and porridge oats/flakes of any grain (oat, rice, rye,
    // buckwheat, multi-grain, gluten-free) — a muesli that merely
    // contains quinoa/millet as one ingredient among others stays in
    // scope (e.g. "Müsli kinoa ja vaarikatega"). Excluded: breakfast/
    // muesli/protein bars (a snack, not a bowl cereal — its own leaf
    // at every store, "hommikusoogibatoonid"/"Müslibatoonid, batoonid"
    // — deferred to the Sweets & snacks batch; Rimi abbreviates this
    // past a bare "batoon" filter as "Müslibat."/"Müs.bat.", and Corny
    // — a brand that, checked by hand, makes nothing except bars here —
    // dodges it a different way at Selver, "MILK 4-pakk ... CORNY",
    // with no "bat" substring at all), standalone quinoa/millet
    // (Rimi's "Kinoa"/"Hirss ... Free From" — a raw grain, not a
    // cereal, and already in scope under the existing Rice & grains
    // category; excluding it here avoids the same real product
    // appearing twice under two categories), kama-ball snacks
    // (BALSNACK's "Kamapallid"/"Neljaviljapallid" — a traditional
    // Estonian snack ball, not a bowl cereal; a same-shaped
    // "Neljaviljapallid" from a different brand, KRÕBINAD, stays, since
    // by hand it reads as a real cereal-ball product), corn-stick
    // snacks (Selver's "Maisikepikesed" — a sweetened corn-puff snack,
    // not a pourable cereal), and, at Selver only, fruit jelly/kissel
    // dessert powder ("tarretis"/"kissel") mixed into the same category
    // ID as the cereal/muesli/oats it also holds.
    name: "Cereals & oats",
    urls: {
      barbora: [
        { url: "https://barbora.ee/kauasailivad-toidukaubad/hommikusoogid-ja-batoonid/hommikusoogihelbed", nameFilter: excludeWords(["balsnack"]) },
        "https://barbora.ee/kauasailivad-toidukaubad/hommikusoogid-ja-batoonid/pudruhelbed",
        "https://barbora.ee/kauasailivad-toidukaubad/hommikusoogid-ja-batoonid/muslid",
      ],
      // Rimi's parent aggregates every leaf including "Müslibatoonid,
      // batoonid" — filtered by name rather than picking leaves one by
      // one, since every real leaf otherwise belongs (gluten-free,
      // multi-grain, oat, rice, buckwheat, "other" flakes, muesli).
      // The /^kinoa\b/i and /^hirss\b/i patterns only match a name that
      // STARTS with the bare grain word (Rimi's standalone "Kinoa Rimi
      // Free From") — a muesli naming quinoa/millet as an ingredient
      // always starts with "Müsli"/"Täisteramüsli" instead, so it's
      // untouched.
      rimi: {
        url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/helbed-hommikusoogihelbed-musli/c/SH-13-2",
        nameFilter: excludeWords(["batoon", "bat.", "balsnack", "corny", /^kinoa\b/i, /^hirss\b/i]),
      },
    },
  },
  {
    // Strict packaging applies (the default). Scope: canned/jarred
    // vegetables of any kind (corn, peas, beans, tomatoes, pickles/
    // cucumbers, mushrooms, olives, peppers, other preserved
    // vegetables and vegetable salads) — excluded everywhere: ready
    // meals (own leaf/ID at every store), canned/packet soup (Rimi's
    // "Supid" leaf, and one bean soup that leaked into its "Oad" leaf —
    // closer to a ready meal than a plain vegetable, same reasoning as
    // every other ready-meal exclusion in this project), prepared
    // vegetable dishes (Rimi's "Köögiviljahautis Ratatouille" — a
    // cooked stew, same ready-meal reasoning) and spreads/dips
    // (Rimi's "Baklažaani kaaviar" — eggplant caviar, a spread, not a
    // whole/chunked vegetable — and a WELL DONE cream-cheese-stuffed
    // pepper at Barbora, the same "stuffed pepper" contamination
    // already found and excluded in the Cheese category, just a
    // different brand), and sweet preserves/jam/honey (their own
    // leaves, waiting for the later jam/honey/spreads batch). Pesto
    // and other jarred sauces — a real find at Selver, whose
    // canned-vegetables ID also holds ~20 pesto products from Filippo
    // Berio/Barilla/Gestus/etc. plus a couple of prepared sauces — are
    // deliberately left for the later sauces & condiments batch
    // instead, so they get reviewed together with the rest of that
    // category.
    name: "Canned food",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/konserveeritud-maisid-herned-oad",
        { url: "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/konserveeritud-kurgid-ja-tomatid", nameFilter: excludeWords(["täid.papr"]) },
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/konserveeritud-seened",
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/muud-konserveeritud-koogiviljad",
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/oliivid",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/herned/c/SH-13-10-49",
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/oad/c/SH-13-10-50", nameFilter: excludeWords(["supp"]) },
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/kurgid/c/SH-13-10-51",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/mais/c/SH-13-10-52",
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/muud-hoidised-salatid/c/SH-13-10-55", nameFilter: excludeWords(["kaaviar", "hautis"]) },
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/oliivid/c/SH-13-10-56",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/paprikad-ja-piprad/c/SH-13-10-57",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/seened/c/SH-13-10-61",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/konserveeritud-koogiviljad/tomatid/c/SH-13-10-63",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: sauces of any
    // kind (ketchup, pasta/tomato sauce, pesto, BBQ, salad dressing,
    // dip, Asian condiment sauces), mayonnaise (incl. vegan), mustard,
    // horseradish, and vinegar/balsamic — vinegar deliberately excluded
    // from the existing Cooking oil category (see its own comment) is
    // meant to live here. Excluded: dry soup/ready-meal seasoning
    // packets (Selver's "Kuivsupid ja -kastmed" — checked by hand, all
    // 23 items are instant soup or meal-starter mixes, not a sauce to
    // pour), and one sweet dessert dip (Selver's "Šokolaadi hummus" —
    // a chocolate spread, not a savoury condiment).
    name: "Sauces & condiments",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/muud-kastmed",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/pastakastmed",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/tomatikastmed-ja-pastad",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/pestod",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/aadikad-ja-palsamikreemid",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/ketsupid",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/sinepid-ja-madaroikad",
        "https://barbora.ee/kauasailivad-toidukaubad/kastmed/salatikastmed",
        // Barbora files mayonnaise under "Piimatooted ja munad" (dairy
        // & eggs), not "kauasäilivad toidukaubad" — egg-based, same odd
        // placement Rimi uses (SH-11-6, below).
        "https://barbora.ee/piimatooted-ja-munad/majoneesid-ja-kastmed/majoneesid",
        "https://barbora.ee/piimatooted-ja-munad/majoneesid-ja-kastmed/dipi-ja-muud-kastmed",
        "https://barbora.ee/piimatooted-ja-munad/majoneesid-ja-kastmed/majoneesikastmed",
        "https://barbora.ee/piimatooted-ja-munad/majoneesid-ja-kastmed/taimsed-majoneesid",
      ],
      rimi: [
        // Aggregates all 10 of Rimi's own sauce/ketchup/mustard leaves
        // (Adžika, BBQ, cooking sauces, other sauces, horseradish,
        // pesto, salad dressings, mustard, tomato sauce/paste, ketchup)
        // — checked by hand, clean.
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/kastmed-ketsupid-sinep-ja-madaroigas/c/SH-13-6",
        // Mayo/dip, also filed under dairy & eggs at Rimi.
        "https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/kastmed-majonees/c/SH-11-6",
        // Vinegar/balsamic — 4 leaves under the same "oil and vinegar"
        // department Cooking oil already uses (id/URL disjoint from
        // Cooking oil's own oil leaves, so no overlap).
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/aadikas/c/SH-13-19-104",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/palsamiaadikad-ja-kastmed/c/SH-13-19-105",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/ounaaadikas/c/SH-13-19-109",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/oli-ja-aadikas/veiniaadikas/c/SH-13-19-113",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: spice blends,
    // pure herbs/spices, salt, pepper, and marinades — excluded:
    // sugar in any form (already fully covered by the existing Flour
    // & sugar category, including flavoured sugars — see the Baking
    // supplies entry below for the fuller story) and every baking
    // additive (baking powder, yeast, gelatin, thickener, cake
    // decorations/food colouring — Baking supplies' scope instead).
    name: "Spices",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/maitseained/maitseainesegud",
        "https://barbora.ee/kauasailivad-toidukaubad/maitseained/urdid-ja-puhtad-maitsed",
        "https://barbora.ee/kauasailivad-toidukaubad/maitseained/soolad",
        "https://barbora.ee/kauasailivad-toidukaubad/maitseained/piprad",
        "https://barbora.ee/kauasailivad-toidukaubad/maitseained/marinaadid",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/maitseainesegud/c/SH-13-12-73",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/marinaadid/c/SH-13-12-74",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/piprad-must-pipar/c/SH-13-12-75",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/puhtad-maitseained-ja-urdid/c/SH-13-12-76",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/sool/c/SH-13-12-77",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/universaalsed-maitseained/c/SH-13-12-78",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: jam/marmalade,
    // honey, sweet fruit/nut spreads (Nutella-style, peanut/cashew
    // butter, tahini, lemon curd, maple syrup), and canned/preserved
    // fruit (peach halves, pineapple, fruit cocktail, 100% fruit
    // purée) — the owner's call: neither jam nor the earlier Canned
    // food category (vegetables only) cleanly covered canned fruit, so
    // it's folded in here rather than left out. Excluded: one
    // Scandinavian cold fruit soup (Selver's "Mustikasupp" — a drink,
    // not a preserve, and miscategorized into the spice catch-all it's
    // scraped alongside).
    name: "Jam & honey & spreads",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/magusad-hoidised",
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/magusad-maarded",
        "https://barbora.ee/kauasailivad-toidukaubad/hoidised-ja-konservid/mesi",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/magusad-hoidised/mesi/c/SH-13-10-53",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/magusad-hoidised/moos-ja-marmelaad/c/SH-13-10-54",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/magusad-hoidised/puuviljad-ja-marjad/c/SH-13-10-60",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/magusad-hoidised/sokolaadi--ja-pahklikreemid-magusad-kastmed/c/SH-13-10-62",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: home baking
    // ingredients not already covered by an existing category —
    // baking powder, yeast, gelatin/thickeners, cake decorations and
    // food colouring, and confectionery ingredients (almond/coconut
    // flakes, baking chocolate chips, citric acid, vanilla bean,
    // cinnamon, saffron, poppy/sesame seeds). Excluded: anything named
    // "*suhkur*" (vanilla sugar, cinnamon sugar, powdered sugar, ...) —
    // a real find checked against the existing data: Barbora's own
    // vanilla sugar is already inside Flour & sugar (it shares that
    // category's "sugars and sugar substitutes" leaf there), so
    // pulling flavoured sugar in here too would silently split the
    // same real product across two categories, never compared against
    // each other — confirmed live in the first scrape, where Barbora's
    // own cake-decorations leaf turned up a cinnamon sugar with no
    // filter yet. Also excluded: dessert-mix coffee creamer (Rimi's
    // "Desserdid" leaf also holds Coffeeta/Mokate whitener powder,
    // same product type already excluded from Coffee for the same
    // reason) and Selver's "Maitsepärm" (nutritional/savoury yeast — a
    // seasoning, not a baking leavening agent, despite containing the
    // same "pärm" word as real baking yeast).
    name: "Baking supplies",
    urls: {
      barbora: [
        // "tärklis" (starch) excluded — the existing Flour & sugar
        // category's own scope already explicitly includes starch,
        // and Rimi's side of it already has real starch products;
        // "kaljapulber" (kvass/kali drink powder) excluded — a
        // beverage mix, not a baking ingredient, despite living in
        // the same "kupsetuslisandid" leaf as real baking aids.
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maitseained/kupsetuslisandid", nameFilter: excludeWords(["suhkur", "tärklis", "kaljapulber"]) },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maitseained/koogikaunistused-ja-toiduvarvid", nameFilter: excludeWords(["suhkur"]) },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/desserdid/c/SH-13-13-79", nameFilter: excludeWords(["coffeeta", "mokate"]) },
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/zelatiin-paksendajad/c/SH-13-13-80",
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/kondiitri-vurtsid/c/SH-13-13-81", nameFilter: excludeWords(["suhkur"]) },
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/koogi-dekoratsioonid/c/SH-13-13-82",
        "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maitseained/parm-ja-muud-kergitusained/c/SH-13-13-83",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: chocolate bars
    // (milk, dark, white) and countline/candy-style chocolate bars
    // ("šokolaadibatoonid" — Snickers-type), the way all three stores
    // file them under their own "chocolate" node. Chocolate-COATED
    // candy (M&M's, chocolate-covered nuts, pralines in boxes) is
    // Candy instead, again matching every store's own filing.
    name: "Chocolate",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/sokolaadid/sokolaadibatoonid",
        "https://barbora.ee/kauasailivad-toidukaubad/sokolaadid/piimasokolaadid",
        "https://barbora.ee/kauasailivad-toidukaubad/sokolaadid/tumedad-sokolaadid",
        "https://barbora.ee/kauasailivad-toidukaubad/sokolaadid/valged-sokolaadid",
      ],
      // Parent aggregates all 4 leaves (milk, dark, white, bars). One
      // real find in the first scrape: "Hematogeen" (an iron-supplement
      // bar sold as a sweet — a health product, not chocolate).
      rimi: { url: "https://www.rimi.ee/epood/ee/tooted/maiustused-ja-snakid/sokolaad/c/SH-9-9", nameFilter: excludeWords(["hematogeen"]) },
    },
  },
  {
    // Strict packaging applies (the default). Scope: non-chocolate-bar
    // confectionery — gummies, toffee/caramel, dragées, boxed candy,
    // candy bags, lollipops and surprise eggs, marshmallow/sefiir,
    // marmalade/halva/marzipan, weighed per-kg candy, plus chewing gum
    // and pastilles (the owner's call — same aisle, same purchase;
    // Barbora already mixes them in). Nothing excluded: every leaf at
    // every store was checked by hand and holds only confectionery.
    name: "Candy",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/kummikommid-ja-natsukommid",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/kommipakid-ja-drazeed",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/pulgakommid-ja-ullatusmunad",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/natsud-ja-pastillid",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/kommikarbid",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/muud-maiustused",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/kaalutud-kommid-ja-maiustused",
        "https://barbora.ee/kauasailivad-toidukaubad/kommid-ja-maiustused/sefiirid-vahukommid-ja-marmelaadid",
      ],
      rimi: [
        // Parent aggregates all 9 candy leaves, incl. per-kg "Kaalukommid".
        "https://www.rimi.ee/epood/ee/tooted/maiustused-ja-snakid/kommid-ja-maiustused/c/SH-9-6",
        // Gum and pastilles are their own parent at Rimi.
        "https://www.rimi.ee/epood/ee/tooted/maiustused-ja-snakid/narimiskumm-ja-pastillid/c/SH-9-11",
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: sweet and savoury
    // biscuits/cookies, crackers, waffles, gingerbread and ring
    // biscuits. Excluded: crispbread ("näkileib/näkileivad" — already
    // deliberately left out of Bread, and Selver mixes one into its
    // biscuits leaf).
    name: "Biscuits",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/kupsised/soolased-kupsised",
        "https://barbora.ee/kauasailivad-toidukaubad/kupsised/magusad-kupsised-ja-vahvlid",
        "https://barbora.ee/kauasailivad-toidukaubad/kupsised/rongikud-ja-praanikud",
      ],
      // Parent aggregates sweet, savoury, and waffles. Real finds in
      // the first scrape, none a biscuit: packaged croissants
      // ("Sarvesai"/"Croissant" — a pastry, the same thing Bread
      // deliberately leaves out), an ice-cream cone cup ("Jäätisetops"),
      // a brownie (matched only as a name STARTING with "Brownie" —
      // "Küpsis Choco Brownie OREO"/Milka's brownie-flavoured cookie are
      // real biscuits Barbora and Selver keep, so a bare "brownie"
      // substring would silently drop Rimi's copy of the same product),
      // and corn sticks ("Maisipulgad" — Chips & snacks' scope at every
      // other store).
      rimi: {
        url: "https://www.rimi.ee/epood/ee/tooted/maiustused-ja-snakid/kupsised-vahvlid/c/SH-9-5",
        nameFilter: excludeWords(["sarvesai", "croissant", "jäätisetops", /^brownie\b/i, "maisipulg"]),
      },
    },
  },
  {
    // Strict packaging applies (the default). Scope: potato/vegetable
    // chips, corn snacks and corn sticks (the "Maisikepikesed" kept out
    // of Cereals & oats belong here), tortilla/nacho chips, popcorn,
    // bread chips and rusks, rice/corn cakes, pork rinds. Excluded:
    // dip-mix powders and dip sauces shelved with chips at every store
    // ("dipi…" — a sauce mix, not a snack; Barbora's own
    // "kuivad-dipikastmed" leaf is simply never fetched), and, at
    // Rimi, the tortilla WRAPS and taco shells sharing the
    // "Tortiljad ja krõpsud" leaf with tortilla chips (only "krõp…"
    // items taken — the abbreviation "krõp." occurs too).
    name: "Chips & snacks",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/kartulikropsud",
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/maisisnakid",
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/popcornid",
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/leivasnakid",
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/muud-snakid",
      ],
      rimi: [
        // "dipp" as well as "dipi": the first scrape showed Rimi also
        // spells its dips "Dipp guacamole"/"Juustudipp", which "dipi"
        // alone missed; "maitseainesegu" catches a guacamole spice mix
        // shelved with the chips (Spices' scope, not a snack).
        { url: "https://www.rimi.ee/epood/ee/tooted/maiustused-ja-snakid/kropsud-popkorn/c/SH-9-8", nameFilter: excludeWords(["dipi", "dipp", "maitseainesegu"]) },
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maailmakook/tortiljad-ja-kropsud/c/SH-13-11-65", nameFilter: excludeWords([], ["krõp"]) },
      ],
    },
  },
  {
    // Strict packaging applies (the default). Scope: nuts and nut
    // mixes, seeds, dried fruit and berries, and trail mixes of those
    // — the owner's call to take all three together, since every
    // store shelves them as one department and the mixes span all of
    // them. Nothing excluded: every leaf checked by hand.
    name: "Nuts, seeds & dried fruit",
    urls: {
      barbora: [
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/pahklid-ja-pahklisegud",
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/pakendatud-seemned",
        "https://barbora.ee/kauasailivad-toidukaubad/snakid/kuivatatud-marjad-ja-puuviljad",
      ],
      // Parent aggregates nuts, flavoured nuts, seeds, dried fruit,
      // and mixes — checked by hand, clean.
      rimi: "https://www.rimi.ee/epood/ee/tooted/maiustused-ja-snakid/kuivatatud-puuviljad-ja-pahklid/c/SH-9-4",
    },
  },
  {
    // Strict packaging applies (the default). Scope: frozen
    // vegetables, vegetable mixes, mushrooms, berries and fruit.
    // Excluded: frozen fries/wedges/hash browns (the owner's call —
    // Dumplings & pizza, see CLAUDE.md; Barbora's own fries leaf is
    // simply never fetched here, Selver's veg ID needs a name filter),
    // frozen soup ("supp" — one in Barbora's veg leaf, one in
    // Selver's), and frozen smoothie packs ("smuuti" — Barbora's
    // berries leaf; a drink, the same call as Drinks).
    name: "Frozen vegetables & berries",
    // Everything here is frozen by definition — Barbora prefixes
    // "Külm." on every item, Selver states nothing (9 real pairs in the
    // first abbreviation round). Dropped here only; in Meat/Fish the
    // same word keeps blocking a frozen cut against a fresh one.
    impliedDescriptors: ["külmutatud"],
    urls: {
      // "supp"/"supi" (soup, incl. the inflected "Supi köögiviljasegu",
      // a soup vegetable mix) and "smuuti" (smoothie packs) at every
      // store, so the same call is made everywhere.
      barbora: [
        { url: "https://barbora.ee/kulmutatud-tooted/kulmutatud-koogiviljad-seened-ja-marjad/kulmutatud-koogiviljad-ja-seened", nameFilter: excludeWords(["supp", "supi", "smuuti"]) },
        { url: "https://barbora.ee/kulmutatud-tooted/kulmutatud-koogiviljad-seened-ja-marjad/kulmutatud-marjad", nameFilter: excludeWords(["supp", "supi", "smuuti"]) },
      ],
      // Parent aggregates vegetables, berries, mushrooms — fries live
      // in a different Rimi department entirely. Checked by hand: one
      // smoothie mix and one borscht soup vegetable mix mixed in.
      rimi: { url: "https://www.rimi.ee/epood/ee/tooted/kulmutatud-toidukaubad/kulmutatud-koogiviljad-marjad/c/SH-4-3", nameFilter: excludeWords(["supp", "supi", "smuuti"]) },
    },
  },
  {
    // Strict packaging applies (the default). Scope: ice cream of
    // every form (sticks, cones, tubs, family packs, multipacks and
    // ice-cream cakes, juice ices and sorbets). Excluded: ice cubes
    // ("jääkuubik" — the only thing in Rimi's "Jää" leaf too) sold in
    // the same department at every store. Plain substring on purpose:
    // a first attempt used /\bjää\b/, and JS's \b treats "ä" as a
    // non-word character, so it matched inside "Jäätis" and silently
    // dropped every Rimi item literally named "Jäätis …" — caught by
    // the count (107 where ~250 were expected) in the first scrape.
    name: "Ice cream",
    // "jäätis" is the category itself (Barbora "Jäätis strawberry white
    // MAGNUM" vs Selver "White Strawberry, MAGNUM"); frozen likewise.
    impliedDescriptors: ["jäätis", "külmutatud"],
    urls: {
      barbora: [
        "https://barbora.ee/kulmutatud-tooted/jaatised-ja-jaakuubikud/pulgajaatised",
        "https://barbora.ee/kulmutatud-tooted/jaatised-ja-jaakuubikud/perejaatised",
        "https://barbora.ee/kulmutatud-tooted/jaatised-ja-jaakuubikud/muud-vaikejaatised",
        "https://barbora.ee/kulmutatud-tooted/jaatised-ja-jaakuubikud/topsi-ja-koonusjaatised",
      ],
      rimi: { url: "https://www.rimi.ee/epood/ee/tooted/kulmutatud-toidukaubad/jaatis-ja-jaa/c/SH-4-1", nameFilter: excludeWords(["jääkuubik"]) },
    },
  },
  {
    // Strict packaging applies (the default). Scope: frozen dumplings
    // (pelmeenid, vareenikud, gyoza), frozen pizza, and — the owner's
    // call — frozen fries, wedges, hash browns and other pre-fried
    // potato products (frozen convenience food, see CLAUDE.md).
    // Excluded: every other frozen ready meal (nuggets, spring rolls,
    // pancakes, boxed meals — each store's own "valmistoit" leaf or,
    // at Selver, everything in the ready-products ID that isn't
    // dumplings/pizza by name).
    name: "Dumplings, pizza & fries",
    // Same reasoning as Frozen vegetables & berries — Barbora prefixes
    // "Külm." on all 112 of its items here.
    impliedDescriptors: ["külmutatud"],
    urls: {
      barbora: [
        "https://barbora.ee/kulmutatud-tooted/kulmutatud-pooltooted/kulmutatud-pelmeenid-ja-vareenikud",
        "https://barbora.ee/kulmutatud-tooted/kulmutatud-pooltooted/kulmutatud-pitsad",
        "https://barbora.ee/kulmutatud-tooted/kulmutatud-koogiviljad-seened-ja-marjad/kulmutatud-friikartulid-ja-kartulisektorid",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/kulmutatud-toidukaubad/pelmeenid-ja-vareenikud/c/SH-4-7",
        "https://www.rimi.ee/epood/ee/tooted/kulmutatud-toidukaubad/kulmutatud-pitsa-friikartulid-valmistoit/kulmutatud-pitsa/c/SH-4-5-19",
        "https://www.rimi.ee/epood/ee/tooted/kulmutatud-toidukaubad/kulmutatud-pitsa-friikartulid-valmistoit/friikartulid/c/SH-4-3-13",
      ],
    },
  },
  {
    // Meat's own matching rules (see the Meat entry): a large share of
    // sausages is sold per kg from the deli counter ("kg-lett") with no
    // pack weight in the name, so cheapest is decided by €/kg and
    // different pack weights of the same product may match — the
    // owner's call for all three categories of this batch.
    // Scope: boiled, smoked/half-smoked/dried, grill, raw/oven, blood
    // sausages, frankfurters, kabanos. Excluded: pre-cooked meat
    // (Rimi shelves "Eelküpsetatud lihatooted" inside its grill group
    // with no telltale word, so that group is taken by REQUIRING a
    // sausage word instead), and plant-based imitations (Selver mixes
    // BON VEGAN "Taimne viiner"/"Taimne suitsuvorst" into its sausage
    // leaf).
    name: "Sausages",
    cheapestByUnitPrice: true,
    matchAcrossWeights: true,
    urls: {
      barbora: [
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/keeduvorstid",
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/grillvorstid",
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/viinerid-ja-sardellid",
        // Real find: this leaf also carries Serrano ham and pancetta
        // (HAM_WORDS) — cured, but ham, not a sausage.
        { url: "https://barbora.ee/liha-kala-valmistoit/lihatooted/suitsutatud-vinnutatud-vorstid", nameFilter: excludeWords(HAM_WORDS) },
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/verivorstid",
        "https://barbora.ee/liha-kala-valmistoit/liha/toorvorstid",
      ],
      rimi: [
        // Grill/raw/blood sausages + pre-cooked meat in one group —
        // "käkk" is "Verikäkk" (blood-sausage loaf), "sibulagrill" a
        // Wõro grill sausage with no "vorst" in its name.
        { url: "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/grill--ja-verivorstid-eelkupsetatud-lihatooted/c/SH-8-1", nameFilter: excludeWords([], ["vorst", "käkk", "sibulagrill"]) },
        // Real find: this leaf also carries sliced ham ("Sealihasink
        // keed., kuumsuit., viil.") — HAM_WORDS excluded.
        { url: "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/keeduvorst-ja-suitsuvorst/c/SH-8-50", nameFilter: excludeWords(HAM_WORDS) },
        // "Muud lihatooted" is shared with Ham & cold cuts (pâté, sült,
        // canned, snacks) and holds meatballs/offal too — only the
        // frankfurter/sardell/kabanos items are taken here.
        { url: "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/muud-lihatooted/c/SH-8-12", nameFilter: excludeWords([], ["viiner", "sardell", "kabanos"]) },
      ],
    },
  },
  {
    // Meat's rules again (per-kg deli counter, see Sausages). Scope:
    // ham, bacon, roulades and other smoked/cured/dried meat (incl.
    // smoked chicken and cured Mediterranean cold cuts), and — the
    // owner's call — pâté and sült (jellied meat), canned meat, and
    // meat snacks/jerky. Excluded: meatballs/patties/cutlets/nuggets,
    // breaded and pre-cooked items, offal (Barbora's "liha-
    // subproduktid" and Rimi's "Liha subproduktid" leaves are never
    // fetched; Selver's are filtered by name), smoked soup bones
    // ("supikogu"), and plant-based imitations.
    name: "Ham & cold cuts",
    cheapestByUnitPrice: true,
    matchAcrossWeights: true,
    urls: {
      barbora: [
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/sink-peekon-ja-rulaadid",
        { url: "https://barbora.ee/liha-kala-valmistoit/lihatooted/suitsulihatooted", nameFilter: excludeWords(["supikogu"]) },
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/muud-lihatooted",
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/pasteedid",
        "https://barbora.ee/liha-kala-valmistoit/lihatooted/lihakonservid",
        { url: "https://barbora.ee/liha-kala-valmistoit/lihatooted/lihasnakid", nameFilter: excludeWords(["soja", "taimne", "vegan"]) },
      ],
      rimi: [
        // Real find: this leaf also carries fuet/chorizo/salchichon
        // dry sausages ("Fuet Artesano", "Vorst Salchichon", "Vorst
        // Fuetec") — SAUSAGE_WORDS excluded — and one soup-bone kit
        // ("Hernesupikogu", a pea-soup bone set, not a cold cut).
        {
          url: "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/sink-peekon-vinnutatud-lihatooted/c/SH-8-11",
          nameFilter: excludeWords(SAUSAGE_WORDS.concat(["hernesupikogu"])),
        },
        // The pâté/sült/snack/canned side of "Muud lihatooted" (see
        // Sausages for the other side); meatballs and offal never
        // carry these words.
        {
          url: "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/muud-lihatooted/c/SH-8-12",
          nameFilter: excludeWords([], ["pasteet", "sült", "snäk", "sigar", "konserv", "hautatud", "omas mahlas", "turisti", "jerky", "vinnut", "kuivat"]),
        },
      ],
    },
  },
  {
    // Meat's rules again (fresh fish is almost entirely per kg). Scope:
    // fresh and thawed fish, salted/smoked fish, canned and marinated
    // fish incl. herring and sprats, dried fish snacks, and — the
    // owner's call — seafood, roe/caviar, crab sticks, and seaweed/
    // seafood salads. One category, "smoked"/"canned"/"marinated"
    // staying as descriptors the matcher already keeps distinct.
    // Excluded: plant-based imitations ("taimne"/"vegan").
    name: "Fish & seafood",
    cheapestByUnitPrice: true,
    matchAcrossWeights: true,
    // The owner's call (abbreviation round): matchAcrossWeights here
    // applies to per-kg listings only — a fixed-weight pack or tin
    // (a 190g tin of sprats, a 240g herring fillet pack) matches only
    // an equal weight. Found by hand: the fully relaxed rule put seven
    // real tin/pack pairs into data/ambiguous.json (Vici herring
    // 240g/400g/1kg all matching each other) and matched a 900g bag
    // of shrimp with a 300g jar. Meat keeps the relaxed rule — a
    // separate, earlier decision of the owner's.
    fixedWeightMustMatch: true,
    urls: {
      barbora: [
        "https://barbora.ee/liha-kala-valmistoit/varske-kala-ja-mereannid/varske-kala",
        "https://barbora.ee/liha-kala-valmistoit/kalatooted/soolatud-ja-suitsutatud-kalatooted",
        "https://barbora.ee/liha-kala-valmistoit/kalatooted/kalakonservid-ja-marineeritud-kalad",
        "https://barbora.ee/liha-kala-valmistoit/kalatooted/heeringad-ja-heeringatooted",
        "https://barbora.ee/liha-kala-valmistoit/kalatooted/vurtsikilud-ja-raimed",
        "https://barbora.ee/liha-kala-valmistoit/kalatooted/kuivatatud-kalatooted",
        "https://barbora.ee/liha-kala-valmistoit/kalatooted/mereannid-ja-kalamari",
      ],
      rimi: [
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/varske-kala/c/SH-8-20",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/toodeldud-kalatooted/c/SH-8-16",
        "https://www.rimi.ee/epood/ee/tooted/liha--ja-kalatooted/kalamari-ja-mereannid/c/SH-8-3",
      ],
    },
  },
  {
    // Purées, porridge, snacks and drinks made for babies — everything
    // under "children's food" except formula/follow-on formula, which
    // already has its own category ("Baby formula") and must never
    // also appear here (the owner's explicit rule for this batch: no
    // product in two categories). Barbora/Rimi keep formula in its own
    // leaf(s), simply never fetched here. Strict packaging left on its
    // default (true) — real flavours vary a lot brand-to-brand (apple,
    // apple-banana, pumpkin, ...) and only the descriptor check strict
    // mode adds actually distinguishes them; the plain numeric-stage
    // `variant` field this category would otherwise fall back to only
    // catches an age number, not a flavour.
    name: "Baby food",
    urls: {
      barbora: [
        "https://barbora.ee/lastekaubad/liha-ja-koogiviljapureed",
        "https://barbora.ee/lastekaubad/puuviljapureed",
        "https://barbora.ee/lastekaubad/pudrud",
        "https://barbora.ee/lastekaubad/snakid-ja-joogid",
      ],
      rimi: [
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/meals/c/SH-5-6-17",
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/drinks-for-children/c/SH-5-6-19",
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/porridges/c/SH-5-6-20",
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/fruit-and-berry-purees/c/SH-5-6-23",
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/snacks/c/SH-5-6-24",
      ],
    },
  },
  {
    // The owner's explicit matching rule for this category: size
    // number (e.g. "S4", "S5") and piece count (e.g. "44tk") must both
    // agree — not brand+weight the way every other packaged category
    // works (see sameDiaperProduct in match-products.js). Diapers are
    // always sold in a size (matched to a baby's weight, which is
    // redundant advice, not the purchasing unit, and differs slightly
    // by brand for what's really the same tier) and a piece count.
    // Special-purpose diapers (swim, bedwetting pants) excluded — see
    // DIAPER_EXCLUDE. Wet wipes included in the same category — a
    // genuinely different real purchase from a diaper, but too small a
    // product line at every store to warrant a category of its own —
    // isolated from the surrounding baby-hygiene leaf by
    // DIAPER_WIPE_ONLY, and never confused for a diaper by the matcher
    // itself (see isDiaperWipe in match-products.js).
    name: "Diapers & baby wipes",
    // strictPackaging is irrelevant here — diaperMatching branches to
    // its own comparison (sameDiaperProduct) before strictPackaging is
    // ever consulted — set to false anyway so a reader doesn't have to
    // trace that to know it plays no part in this category.
    strictPackaging: false,
    diaperMatching: true,
    urls: {
      barbora: [
        { url: "https://barbora.ee/lastekaubad/mahkmed", nameFilter: DIAPER_EXCLUDE },
        { url: "https://barbora.ee/lastekaubad/laste-hugieenitarbed", nameFilter: DIAPER_WIPE_ONLY },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/en/products/children-s-goods/diapers/c/SH-5-7", nameFilter: DIAPER_EXCLUDE },
        "https://www.rimi.ee/epood/en/products/children-s-goods/baby-care-products/wet-wipes/c/SH-5-1-2",
      ],
    },
  },
  {
    // The owner's call: a grocery-store category, the three grocery
    // stores only — separate from the planned Beauty deals feature
    // (beauty-store products). "Hygiene only": deodorant, shampoo/
    // conditioner/styling, shower gel/soap, hand/body lotion, shaving,
    // oral care, feminine hygiene. Excluded, all by the owner's
    // explicit answers: face care and decorative cosmetics/makeup
    // (Kosmeetika/Dekoratiivkosmeetika/Korean skincare — the Beauty
    // feature's own territory), hair dye and tanning products (a
    // cosmetic treatment, not hygiene), home pharmacy (OTC medicine,
    // wound care, vitamins/supplements, pregnancy tests — a
    // regulatory/legal angle CLAUDE.md flags), perfume/eau de toilette
    // (a fragrance/luxury good, not hygiene), and every reusable tool
    // (hairbrushes/combs, manicure/pedicure implements, bath sponges —
    // not a repurchased consumable the way soap or shampoo is). Strict
    // packaging left on its default (true) — a real bug, found reading
    // the first live scrape by hand: without it, two different named
    // product lines from the same brand at the same size (e.g. Gliss
    // "Blond Perfector" shampoo vs Gliss "Split-End" shampoo, Pantene
    // "Shake Repair" vs "Bond Repair" spray) matched as if they were
    // the same listing — nothing in the lenient path's brand+size+
    // numeric-variant check reads a named product-line word at all.
    name: "Personal care",
    urls: {
      barbora: [
        "https://barbora.ee/enesehooldustooted/intiimhugieeni-vahendid/hugieenisidemed",
        "https://barbora.ee/enesehooldustooted/intiimhugieeni-vahendid/intiimhugieeni-niisked-salvratikud",
        "https://barbora.ee/enesehooldustooted/intiimhugieeni-vahendid/intiimpesuvahendid",
        "https://barbora.ee/enesehooldustooted/intiimhugieeni-vahendid/pesukaitsmed",
        "https://barbora.ee/enesehooldustooted/intiimhugieeni-vahendid/tampoonid",
        "https://barbora.ee/enesehooldustooted/juuksehooldustooted/juukselakid-geelid-ja-vahud",
        "https://barbora.ee/enesehooldustooted/juuksehooldustooted/juuksepalsamid",
        "https://barbora.ee/enesehooldustooted/juuksehooldustooted/juuksesampoonid",
        "https://barbora.ee/enesehooldustooted/juuksehooldustooted/kuivsampoonid",
        "https://barbora.ee/enesehooldustooted/juuksehooldustooted/maskid-seerumid-ja-juukseolid",
        "https://barbora.ee/enesehooldustooted/juuksehooldustooted/meeste-sampoonid",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/dusigeelid",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/dusigeelid-meestele",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/jalahooldus",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/katehooldus",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/kehakoorijad",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/kehakreemid-kehaolid",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/tuki-ja-vedelseebid",
        "https://barbora.ee/enesehooldustooted/kehahooldustooted/vannivahud-ja-vannisoolad",
        "https://barbora.ee/enesehooldustooted/parfuumid-ja-deodorandid/meeste-aerosooldeodorandid",
        "https://barbora.ee/enesehooldustooted/parfuumid-ja-deodorandid/meeste-rull-ja-pulkdeodorandid",
        "https://barbora.ee/enesehooldustooted/parfuumid-ja-deodorandid/naiste-aerosooldeodorandid",
        "https://barbora.ee/enesehooldustooted/parfuumid-ja-deodorandid/naiste-rull-ja-pulkdeodorandid",
        "https://barbora.ee/enesehooldustooted/raseerimisvahendid",
        "https://barbora.ee/enesehooldustooted/suuhugieen",
      ],
      rimi: [
        "https://www.rimi.ee/epood/en/products/self-care-products/deodorants/c/SH-2-2",
        "https://www.rimi.ee/epood/en/products/self-care-products/hygienic-napkins-and-wipes/c/SH-2-3",
        "https://www.rimi.ee/epood/en/products/self-care-products/intimate-hygiene/c/SH-2-4",
        { url: "https://www.rimi.ee/epood/en/products/self-care-products/hair-care/c/SH-2-5", nameFilter: PERSONAL_CARE_RIMI_HAIR_EXCLUDE },
        { url: "https://www.rimi.ee/epood/en/products/self-care-products/body-care/c/SH-2-6", nameFilter: PERSONAL_CARE_RIMI_BODY_EXCLUDE },
        "https://www.rimi.ee/epood/en/products/self-care-products/shaving-and-depilatory-products/c/SH-2-10",
        "https://www.rimi.ee/epood/en/products/self-care-products/oral-care/c/SH-2-11",
      ],
    },
  },
  {
    // The owner's call: consumables only (things people repurchase
    // regularly) — cleaning supplies and paper products. Excluded:
    // kitchen tools, small appliances, textiles/bedding, home décor,
    // garden goods (none a repurchased consumable), every reusable
    // cleaning tool (cloths, sponges, gloves, mops/buckets, vacuum
    // dust bags), shoe/clothing care, and pest control (a chemical
    // product with its own safety-labelling angle, kept out the same
    // conservative way home pharmacy is for Personal care). Barbora
    // has no laundry-detergent leaf under this department — genuinely
    // absent from the leaf tree, not a filtering mistake. Strict
    // packaging left on its default (true) — same real bug class as
    // Personal care: a scent/formula variant (Ambi Pur "Cotton Flower"
    // vs "Lenor Spring Awakening", Ariel gel "Sensitive" vs "Color")
    // at the same brand and pack size matched as the same listing
    // without it.
    name: "Household",
    // Paper products are sold by roll/sheet/piece count and ply — see
    // pieceCountSizes / LAYER_PATTERN in match-products.js; the count
    // and ply words left over once the numbers are read are implied.
    pieceCountSizes: true,
    impliedDescriptors: ["tk", "rl", "rul", "rull", "rulli", "rullid", "kih", "kihiline", "kihilist", "kihilised", "lehte", "leh"],
    urls: {
      barbora: [
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/majapidamis-ja-koristustarbed/majapidamispaberid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/majapidamis-ja-koristustarbed/prugikotid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/majapidamis-ja-koristustarbed/taskuratikud",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/majapidamis-ja-koristustarbed/tualettpaberid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/akna-ja-klaasipuhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/eriotstarbelised-puhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/katlakivieemaldusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/koogi-puhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/ohuvarskendajad",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/poranda-ja-vaipade-puhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/uldpuhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/vannitoa-puhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/wc-poti-puhastusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/kodukeemia/wc-poti-varskendajad",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/noudepesuvahendid/kasipesuvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/noudepesuvahendid/noudepesumasina-soolad-ja-hooldusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/noudepesuvahendid/noudepesuvahendid-masinpesuks",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/pesupesemisvahendid/pesugeelid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/pesupesemisvahendid/pesukapslid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/pesupesemisvahendid/pesuloputusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/pesupesemisvahendid/pesumasina-hooldusvahendid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/pesupesemisvahendid/pesupulbrid",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/pesupesemisvahendid/plekieemaldusvahendid-ja-valgendajad",
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/en/products/detergents-and-cleaning-supplies/c/SH-14", nameFilter: HOUSEHOLD_RIMI_EXCLUDE },
        // Foil, cling film, baking paper — Rimi shelves them under
        // kitchenware (the owner's call, 2026-09-27); Barbora has no
        // such leaf.
        { url: "https://www.rimi.ee/epood/ee/tooted/kodu--ja-vabaajakaubad/koogitarvikud/foolium-kupsetuspaber/c/SH-10-6-23", nameFilter: HOUSEHOLD_RIMI_EXCLUDE },
      ],
    },
  },
  {
    // Pet FOOD only — the roadmap's own scope. Excluded: litter/
    // bedding, toys, and other pet accessories/supplies (a durable
    // good, not something repurchased the way food is). Treats
    // included alongside meals/dry food — still a food product, not a
    // toy or accessory. Strict packaging left on its default (true) —
    // a real, serious bug, found reading the first live scrape by
    // hand: Club 4 Paws sells both a cat food AND a dog food at the
    // same 900g size, and without the descriptor check, a Barbora dog
    // food (lamb-rice) matched a Rimi CAT food (veal) as the same
    // listing — the lenient path's brand+size check alone never reads
    // the species or flavour word at all.
    name: "Pet food",
    // Selver prefixes the feed-law class on every item ("Täiendsööt."
    // = complementary feed, "Täistoit." = complete feed) — a
    // regulatory label, not a product fact the other stores state.
    impliedDescriptors: ["täiendsööt", "täistoit"],
    urls: {
      barbora: [
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/kassi-maiustused",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/kasside-konservid-ja-eined",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/kasside-kuivsoot",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/koerte-konservid-ja-eined",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/koerte-kuivsoot",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/koerte-maiustused",
        "https://barbora.ee/puhastustarbed-ja-lemmikloomatooted/lemmikloomakaubad/vaikeloomatoidud",
      ],
      rimi: [
        "https://www.rimi.ee/epood/en/products/pet-goods/cat-food/c/SH-7-1",
        "https://www.rimi.ee/epood/en/products/pet-goods/dog-food/c/SH-7-2",
      ],
    },
  },
  // ---- Batch 9 ----
  {
    // Strict packaging applies (the default). Packaged cakes, cake
    // rolls, keeks and pastries — see CAKES_FILTER for what the same
    // shelves mix in and why it's excluded. Every store's own-kitchen
    // items (Selveri Köök, Rimi's own cakes) are fetched but can only
    // ever stay unmatched — one store's kitchen isn't sold elsewhere.
    name: "Cakes & pastries",
    urls: {
      barbora: [
        { url: "https://barbora.ee/leivad-saiad-kondiitritooted/koogid-ja-tordid/koogid", nameFilter: CAKES_FILTER },
        { url: "https://barbora.ee/leivad-saiad-kondiitritooted/koogid-ja-tordid/tordid", nameFilter: CAKES_FILTER },
        { url: "https://barbora.ee/leivad-saiad-kondiitritooted/koogid-ja-tordid/muud-kondiitritooted", nameFilter: CAKES_FILTER },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/kondiitritooted/c/SH-6-1", nameFilter: CAKES_FILTER },
      ],
    },
  },
  {
    // Strict packaging applies (the default). The owner's scope:
    // instant noodles, instant mash, instant/cup soups only — see
    // INSTANT_FILTER. Barbora's "kiirtoidud" department has separate
    // leaves for the excluded shelf-mates (puljongid, kuivkastmed,
    // magusad kiirtoidud), which are simply not sources; Rimi's
    // "kiirtoit" and Selver's dry-soup/noodle-dish leaves mix them in
    // and are filtered.
    name: "Instant food",
    urls: {
      barbora: [
        { url: "https://barbora.ee/kauasailivad-toidukaubad/kiirtoidud/kiirnuudlid-ja-supid", nameFilter: INSTANT_FILTER },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/kiirtoidud/kiirkartulipudrud", nameFilter: INSTANT_FILTER },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/kiirtoit/c/SH-13-8", nameFilter: INSTANT_FILTER },
      ],
    },
  },
  {
    // Strict packaging applies (the default). See WORLD_FILTER for the
    // owner's scope (only what no other category owns). Barbora's
    // sauce and spice-mix leaves under "maailma köögid" are not
    // sources at all — those products live in Sauces & condiments and
    // Spices already; the leaves that are sources still go through
    // the filter (tortilla chips share the tortilla leaf).
    name: "World cuisine",
    urls: {
      barbora: [
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maailma-koogid/aasia-nuudlid", nameFilter: WORLD_FILTER },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maailma-koogid/kookosjoogid-ja-kreemid", nameFilter: WORLD_FILTER },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maailma-koogid/tortillad-ja-maisikropsud", nameFilter: WORLD_FILTER },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maailma-koogid/muud-aasia-maitsed", nameFilter: WORLD_FILTER },
        { url: "https://barbora.ee/kauasailivad-toidukaubad/maailma-koogid/aasia-kastmed-ja-maitseainesegud", nameFilter: WORLD_FILTER },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/kauasailivad-toidukaubad/maailmakook/c/SH-13-11", nameFilter: WORLD_FILTER },
      ],
    },
  },
  {
    // Alcohol-free beer, cider, wine and cocktails — the owner's call:
    // everything a store sells as "alkoholivaba" (by Estonian law at
    // most 0.5%), the name showing 0.0% wherever the store prints it;
    // one category for all four kinds. NOT an alcohol category:
    // always shown, whatever SHOW_ALCOHOL says. alcoholMatching is on
    // for the same reasons as the alcohol categories below (Selver
    // prints no strength; a one-sided "0,0%" must not block). The
    // ALCOHOL_FREE_ONLY requirement keeps sparkling juice-style drinks
    // on the same shelves out.
    name: "Alcohol-free beer, cider & wine",
    alcoholMatching: true,
    impliedDescriptors: ["õlu"],
    urls: {
      barbora: [
        { url: "https://barbora.ee/joogid/alkoholivabad-joogid/alkoholivabad-olled", nameFilter: ALCOHOL_FREE_ONLY },
        { url: "https://barbora.ee/joogid/alkoholivabad-joogid/alkoholivabad-siidrid", nameFilter: ALCOHOL_FREE_ONLY },
        { url: "https://barbora.ee/joogid/alkoholivabad-joogid/alkoholivabad-veinid", nameFilter: ALCOHOL_FREE_ONLY },
        { url: "https://barbora.ee/joogid/alkoholivabad-joogid/alkoholivabad-kokteilid", nameFilter: ALCOHOL_FREE_ONLY },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/alkoholivabad-joogid/alkoholivaba-olu/c/SH-3-1", nameFilter: ALCOHOL_FREE_ONLY },
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/alkoholivabad-joogid/alkoholivaba-siider-ja-kokteilid/c/SH-3-2", nameFilter: ALCOHOL_FREE_ONLY },
        { url: "https://www.rimi.ee/epood/ee/tooted/joogid/alkoholivabad-joogid/alkoholivaba-vein-ja-vahuvein/c/SH-3-3", nameFilter: ALCOHOL_FREE_ONLY },
      ],
    },
  },
  // ---- Alcohol: private testing on this PC only. SHOW_ALCOHOL in
  // frontend/app-logic.js hides these three categories and their
  // products completely when false; it must be reviewed with a lawyer
  // and set to false before the app is ever public (see CLAUDE.md).
  // Every alcohol source EXCLUDES alcohol-free items (NO_ALCOHOL_FREE),
  // and alcoholMatching adds the strength/vintage rules — see
  // sameBrandedProduct in match-products.js. Traps watched: alcohol %
  // (4,5% ≠ 5,2%), volume (cl/ml/l all normalized), can vs bottle
  // (purk/pudel must agree when stated), multipacks ("6x0,5l" =
  // "0,5l 6-pakk" ≠ one can), vintage year, grape/type words.
  {
    // The owner's call: beer, cider, long drinks, beer cocktails and
    // ready-to-drink mixes — the stores' own "õlu ja siider" /
    // "kokteilid-segujoogid" shelves as they are.
    name: "Beer & cider",
    alcoholMatching: true,
    // "õlu" is what the category is. Barbora's habitual "Hele õlu"
    // type phrase is folded to "õlu" by a normalization pattern in
    // match-products.js instead of implying "hele" — implying it
    // erased the product's own name on "Saku Hele" (first scrape).
    impliedDescriptors: ["õlu"],
    urls: {
      barbora: [
        { url: "https://barbora.ee/joogid/olu-ja-siider/heledad-olled", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/tumedad-olled", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/nisuolled", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/kasitooolled", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/siidrid", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/long-dringid", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/ollekokteilid", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/olu-ja-siider/kokteilijoogid", nameFilter: NO_ALCOHOL_FREE },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/olu/c/SH-1-6", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/siider/c/SH-1-8", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kokteilid-segujoogid/c/SH-1-3", nameFilter: NO_ALCOHOL_FREE },
      ],
    },
  },
  {
    // The owner's call: still, sparkling, fortified and vermouth
    // together (Rimi shelves vermouth under strong alcohol; it's a
    // wine product). Barbora's three wine departments are fetched as
    // parents (each aggregates its grape leaves; checked by hand).
    name: "Wine",
    alcoholMatching: true,
    // The word "vein" itself, and the legal quality classes Barbora
    // and Rimi prefix inconsistently ("KPN vein", "Kgt.vein", "GT
    // vein", "Kpn.kv.vahuvein") while Selver prints none — a label
    // class, not the wine's identity; the grape/type words (Merlot,
    // Cabernet, Prosecco, Brut) stay real descriptors.
    // "v"/"vv" are the fragments of Rimi's "kv.v.vein"/"kv.vv" shorthand
    // ("kvaliteetvahuvein"), the same label class.
    impliedDescriptors: ["vein", "kpn", "kgt", "gt", "kv", "kvv", "v", "vv"],
    urls: {
      barbora: [
        { url: "https://barbora.ee/joogid/punased-ja-roosad-veinid", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/valged-veinid", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://barbora.ee/joogid/muud-veinid-ja-veinijoogid", nameFilter: NO_ALCOHOL_FREE },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/vein/c/SH-1-11", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/vahuveinid-ja-sampanjad/c/SH-1-10", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/vermut/c/SH-1-12", nameFilter: NO_ALCOHOL_FREE },
      ],
    },
  },
  {
    // The owner's call: vodka, gin, whisky, rum, brandy/cognac,
    // tequila, liqueurs and other strong alcohol — the stores' own
    // "kange alkohol" as it is (minus vermouth, in Wine).
    name: "Spirits",
    alcoholMatching: true,
    urls: {
      barbora: [
        { url: "https://barbora.ee/joogid/kange-alkohol", nameFilter: NO_ALCOHOL_FREE },
      ],
      rimi: [
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/viin/c/SH-1-13", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/dzinn/c/SH-1-2", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/viski/c/SH-1-14", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/rumm/c/SH-1-7", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/brandi/c/SH-1-1", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/konjak/c/SH-1-4", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/tekiila/c/SH-1-9", nameFilter: NO_ALCOHOL_FREE },
        { url: "https://www.rimi.ee/epood/ee/tooted/alkohol/kange-alkohol/likoor/c/SH-1-5", nameFilter: NO_ALCOHOL_FREE },
      ],
    },
  },
];

// The three alcohol categories — the ones SHOW_ALCOHOL (frontend/
// app-logic.js) hides. The alcohol-free category is deliberately not
// here. Exported so the app and the tests read one list.
const ALCOHOL_CATEGORIES = ["Beer & cider", "Wine", "Spirits"];

// Whether a category opts into strict packaged-product matching (the
// default — see the comment above CATEGORIES). Throws on an unknown
// name rather than silently defaulting to true, so a typo'd category
// name in a test or script fails loudly instead of happening to pass.
function strictPackagingFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return category.strictPackaging !== false;
}

// Whether a category allows a match across different pack weights
// (currently just Meat — see sameBrandedProduct in match-products.js
// and the comment on the Meat entry above). Off unless a category
// explicitly opts in, the same reasoning as strictPackagingFor's
// throw-on-unknown-name.
function matchAcrossWeightsFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return category.matchAcrossWeights === true;
}

// Whether a category uses diaper-specific matching (currently just
// Diapers & baby wipes — see sameDiaperProduct in match-products.js
// and the comment on that category's entry below). Off unless a
// category explicitly opts in, the same reasoning as the two throw-
// on-unknown-name helpers above.
function diaperMatchingFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return category.diaperMatching === true;
}

// Builds one item the same shape a real scrape produces (store, name,
// price, currency, url, ean, plus whatever the caller needs to set —
// brand, ean, etc. — via `extra`), with strictPackaging/
// matchAcrossWeights set exactly the way fetch-price.js would set
// them for a real item in this category. The one place a test or an
// ad-hoc by-hand check should build an item from — never hand-roll
// `{ store, name, ... }` and guess at these flags, which is what led
// to the wrong "39 pairs already match" conclusion in an earlier
// session.
// Words a category declares as true of every item in it, dropped from
// descriptors for that category only — see extractDescriptors in
// match-products.js and each category's own impliedDescriptors comment.
// Empty for every category that hasn't opted in; throws on an unknown
// name like the helpers above.
function impliedDescriptorsFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return Array.isArray(category.impliedDescriptors) ? category.impliedDescriptors : [];
}

// Whether a category narrows matchAcrossWeights to per-kg listings
// only (currently just Fish & seafood — see its entry above and
// sameBrandedProduct in match-products.js). Off unless a category
// explicitly opts in; throws on an unknown name like the others.
function fixedWeightMustMatchFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return category.fixedWeightMustMatch === true;
}

// Whether a category uses the alcohol rules (strength compared only
// when both stores print it, vintage must agree — see
// sameBrandedProduct in match-products.js): Beer & cider, Wine,
// Spirits and the alcohol-free drinks. Off unless a category opts in;
// throws on an unknown name like the others.
function alcoholMatchingFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return category.alcoholMatching === true;
}

// Whether a category reads piece/roll/sheet counts as the size and ply
// as a variant (Dairy for eggs, Household for paper) — see matchSize in
// match-products.js. Off unless a category opts in; throws on an
// unknown name like the others.
function pieceCountSizesFor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) {
    throw new Error(`Unknown category "${categoryName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  return category.pieceCountSizes === true;
}

function buildItem(categoryName, store, name, extra = {}) {
  const item = { store, name, price: 0, currency: "EUR", url: "x", ean: null, ...extra };
  if (strictPackagingFor(categoryName)) item.strictPackaging = true;
  if (matchAcrossWeightsFor(categoryName)) item.matchAcrossWeights = true;
  if (diaperMatchingFor(categoryName)) item.diaperMatching = true;
  if (fixedWeightMustMatchFor(categoryName)) item.fixedWeightMustMatch = true;
  if (alcoholMatchingFor(categoryName)) item.alcoholMatching = true;
  if (pieceCountSizesFor(categoryName)) item.pieceCountSizes = true;
  const implied = impliedDescriptorsFor(categoryName);
  if (implied.length > 0) item.impliedDescriptors = implied;
  return item;
}

module.exports = { CATEGORIES, ALCOHOL_CATEGORIES, strictPackagingFor, matchAcrossWeightsFor, diaperMatchingFor, fixedWeightMustMatchFor, alcoholMatchingFor, pieceCountSizesFor, impliedDescriptorsFor, buildItem };
