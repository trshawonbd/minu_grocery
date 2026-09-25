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

const CATEGORIES = [
  {
    name: "Baby formula",
    strictPackaging: false,
    urls: {
      barbora: "https://barbora.ee/lastekaubad/piimasegud-ja-jatkupiimasegud/piimasegud-alates-sunnist",
      rimi: "https://www.rimi.ee/epood/en/products/children-s-goods/baby-food/breast-milk-substitutes/c/SH-5-6-18",
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
    urls: {
      // The parent page aggregates every leaf (gluten-free, egg,
      // lasagne/cannelloni, whole-grain, the main "makaronid" leaf) —
      // checked by hand, clean: no ready meals or sauces mixed in.
      barbora: "https://barbora.ee/kauasailivad-toidukaubad/makaronid",
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
];

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

// Builds one item the same shape a real scrape produces (store, name,
// price, currency, url, ean, plus whatever the caller needs to set —
// brand, ean, etc. — via `extra`), with strictPackaging/
// matchAcrossWeights set exactly the way fetch-price.js would set
// them for a real item in this category. The one place a test or an
// ad-hoc by-hand check should build an item from — never hand-roll
// `{ store, name, ... }` and guess at these flags, which is what led
// to the wrong "39 pairs already match" conclusion in an earlier
// session.
function buildItem(categoryName, store, name, extra = {}) {
  const item = { store, name, price: 0, currency: "EUR", url: "x", ean: null, ...extra };
  if (strictPackagingFor(categoryName)) item.strictPackaging = true;
  if (matchAcrossWeightsFor(categoryName)) item.matchAcrossWeights = true;
  return item;
}

module.exports = { CATEGORIES, strictPackagingFor, matchAcrossWeightsFor, buildItem };
