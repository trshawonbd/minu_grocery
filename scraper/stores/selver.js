// Fetches Selver products from its catalog search API (an open,
// unauthenticated Elasticsearch endpoint behind the storefront — the
// storefront itself is a client-rendered SPA that serves an empty
// shell to plain HTTP fetches, so it can't be scraped the way Barbora
// and Rimi's server-rendered pages can). Selver has no per-category
// listing page to fetch, so scoping is done by Magento category ID
// instead of a URL — see CATEGORIES below for how each of our three
// target categories maps to Selver's own taxonomy.

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const SEARCH_URL = "https://www.selver.ee/api/catalog/vue_storefront_catalog_et/product/_search";
const ATTRIBUTE_URL = "https://www.selver.ee/api/catalog/vue_storefront_catalog_et/attribute/_search";

// The badge Selver shows on a product card when the lower,
// logged-in price requires its own loyalty card ("Partner card" —
// confirmed via the badge image filename, vaimo_badges/0partnerkaart_*).
// Its presence lines up exactly (checked against 18 real examples) with
// every non-anonymous customer_group_id sharing one uniform lower
// price — a real public loyalty price, unlike the many other customer
// groups in `prices` (business/wholesale accounts, ...) that carry
// their own uneven prices with no such badge and no public program
// behind them. Only the badge-backed case is trustworthy enough to
// report as a card price, mirroring Barbora's Aitäh rule.
function findPartnerCardPrice(source) {
  const badges = source.vmo_badges || [];
  const hasPartnerBadge = badges.some((b) => JSON.stringify(b).includes("partnerkaart"));
  if (!hasPartnerBadge) return null;

  const memberPrice = (source.prices || []).find((p) => p.customer_group_id !== 0);
  return memberPrice ? memberPrice.price : null;
}

// 1 request/second, strictly sequential — polite scraping against a
// live, unauthenticated API with no key of its own.
let lastRequestAt = 0;
async function throttle() {
  const wait = lastRequestAt + 1000 - Date.now();
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastRequestAt = Date.now();
}

async function fetchJson(url) {
  await throttle();
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Selver: HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

function searchUrl(base, request) {
  return `${base}?request=${encodeURIComponent(JSON.stringify(request))}`;
}

// product_brand is only a numeric attribute-option id in search
// results — the real name lives in a separate attribute-definition
// lookup, fetched once and cached for the life of the process.
let brandMapPromise = null;
async function getBrandMap() {
  if (!brandMapPromise) {
    brandMapPromise = fetchJson(
      searchUrl(ATTRIBUTE_URL, { query: { term: { attribute_code: "product_brand" } } })
    ).then((data) => {
      const options = data.hits.hits[0]._source.optionsPacked;
      return new Map(options.map(([name, id]) => [id, name]));
    });
  }
  return brandMapPromise;
}

// "Määramata" ("Unspecified") is Selver's own explicit placeholder
// brand option (id 450) — assigned to loose produce and anything else
// with no real manufacturer brand, not itself a brand name. Barbora's
// equivalent is simply leaving brand_name empty; Selver states it
// instead, so it's normalized to null the same way.
const NO_BRAND = "Määramata";

function mapItem(source, brandMap) {
  // Group 0 (anonymous/no account) is confirmed, across every sample
  // checked, to always equal the top-level regular_price and to never
  // itself carry a discount — so it's what any unlogged-in shopper
  // pays, the same role Barbora's `price` plays before a loyalty card.
  const price = source.regular_price;
  const cardPrice = findPartnerCardPrice(source);

  return {
    store: "Selver",
    name: source.name,
    price,
    regularPrice: source.regular_price,
    cardPrice,
    cardName: cardPrice != null ? "Partner" : null,
    currency: "EUR",
    url: `https://www.selver.ee/${source.slug}`,
    ean: source.product_main_ean || null,
    // Selver's own per-kg (or per-l) price — a real structured field on
    // every product, computed by Selver itself from `product_volume`
    // (also structured, not just text in the name), not derived from
    // parsing a weight out of the name. See storeUnitPrice in
    // match-products.js/fetch-price.js.
    storeUnitPrice: typeof source.unit_price === "number" ? source.unit_price : null,
    brand: (() => {
      const name = brandMap.get(String(source.product_brand));
      return name && name !== NO_BRAND ? name : null;
    })(),
  };
}

// Word-list helper for a nameFilter: true when the (lowercased) name
// contains none of `exclude`, and — if `require` is given — only when
// it also contains at least one of `require`. Every pattern is a
// plain substring except where written as a regex literal for a word
// boundary.
function excludeWords(exclude, require) {
  return (name) => {
    const lower = name.toLowerCase();
    if (require && !require.some((p) => (p instanceof RegExp ? p.test(lower) : lower.includes(p)))) {
      return false;
    }
    return !exclude.some((p) => (p instanceof RegExp ? p.test(lower) : lower.includes(p)));
  };
}

// Each of our three shared categories maps to one or more Selver
// category IDs (its Magento category tree, not the separate
// `eshop_category` attribute — see the id-mismatch note below).
// Chosen by walking Selver's own department tree ("Puu- ja
// köögiviljad" / "Piimatooted, munad, võid" / "Lastekaubad") and
// picking only the leaf subcategories that hold the same kind of
// product Barbora/Rimi are scraped for — the same "skip by category
// ID" approach used to keep flowers out of Rimi's produce category.
// Where Selver's own category tree bundles in a product type neither
// store actually scrapes (verified against Barbora/Rimi's real
// results, not guessed), a per-source nameFilter narrows it further —
// same principle, applied by name instead of by ID where Selver has
// no finer ID to filter on.
// Meat: offal and out-of-scope game animals — see the fuller comment
// on scraper/categories.js's own copy of these two lists (duplicated
// here, not imported, for the same self-contained reason the water
// filter above is duplicated rather than shared).
const MEAT_OFFAL = ["maks", "süda", /\bneer/, "kops", "magu", /\bkeel\b/, "puljongikont", "supikogu", /\bluu\b/, "veri"];
const MEAT_GAME = ["küülik", "uluk", "metssea", "hirve", "põdra", "vutt", "vuti"];

// Frozen potato PRODUCTS (fries, wedges, rösti, balls, pancakes,
// croquettes, "vigurkartul" shapes, hash browns) — the owner's call
// puts these in Dumplings, pizza & fries, not Frozen vegetables.
// Deliberately not "kartul" itself: a vegetable mix containing potato
// is still a vegetable mix. Shared by both frozen categories below,
// one excluding these words, the other requiring them.
const SELVER_FROZEN_POTATO_WORDS = ["friik", "kartulisektor", "kartuliviil", "kartulipall", "kartulipannkoo", "kartulikroket", "rösti", "vigurkartul", "hash brown"];

// Plant-based imitations Selver shelves inside its meat/sausage leaves
// (BON VEGAN, THORMI, MATI's "kanaloog" fake chicken, "taimne"/
// "taimse"/"vegan"/tofu/soy) — never a match for a real meat product,
// the same call as the dairy categories make for plant "milk".
const SELVER_PLANT_BASED_WORDS = ["taimne", "taimse", "taimevalgu", "vegan", "tofu", "soja", "kanaloog", "thormi", "bon vegan"];

// Shared between Sausages and Ham & cold cuts, same self-contained
// duplication as categories.js's own copy (see the fuller comment
// there) — Selver's sausage IDs also carry Serrano ham/pancetta,
// its ham/gourmet IDs also carry fuet/salami/chorizo. "singi"
// alongside "sink": Estonian consonant gradation ("sink" → genitive
// "singi") means the bare word misses real ham names.
const SELVER_HAM_WORDS = ["sink", "singi", "pancetta"];
const SELVER_SAUSAGE_WORDS = ["vorst", "viiner", "sardell", "salaami", "salami", "fuet", "chorizo", "salchichon", "pepperoni", "kabanos", "servelaat"];

// Diapers & baby wipes: special-purpose diapers (swim, bedwetting
// pants) and "rinnapad" (a stray nursing accessory found by hand in
// category 308's own listing, GRØN BALANCE brand) — see the fuller
// comment on categories.js's own copy of this same word list.
const SELVER_DIAPER_EXCLUDE = ["uju", "swim", "dry nites", "ninjamas", "öömähk", "oomahk", "rinnapad"];
// Isolates real wet-wipe listings from the rest of category 309's
// baby-hygiene items (shampoo, cream, powder, cotton swabs, bottles)
// — see categories.js's own copy for why neither word alone is safe.
const SELVER_DIAPER_WIPE_ONLY = [/niis.*salv|salv.*niis/i];

const CATEGORIES = {
  // Unlike Barbora/Rimi, Selver has no subcategory dedicated to
  // formula alone — category 307 ("Lastetoidud") holds every baby
  // food (formula, purée, porridge, juice, snacks) with no finer
  // category ID to split them. Name-filtered instead: every real
  // formula product's name contains "piimasegu" ("milk mix"/formula),
  // confirmed against all 186 items in the category by hand; the only
  // false positives were two porridges that merely mention formula as
  // an ingredient ("... teraviljapuder piimasegu ja banaaniga ..."),
  // excluded by also requiring "puder" (porridge) be absent.
  "Baby formula": {
    sources: [{ id: 307, nameFilter: excludeWords(["puder"], ["piimasegu"]) }],
  },
  // Every leaf under "Puu- ja köögiviljad" (209) except fruit salads
  // (216, prepared/dressed mixes — not a raw product Barbora/Rimi list
  // here either, confirmed against their existing scrapes) and
  // smoothies/fresh juices (369, a bottled drink, not the fruit
  // itself).
  "Fruits & vegetables": {
    sources: [{ id: 210 }, { id: 212 }, { id: 213 }, { id: 214 }, { id: 215 }, { id: 217 }],
  },
  // Milk, butter, eggs, yoghurt — the same four Barbora/Rimi already
  // cover. "Piimatooted, munad, võid" (233) has three more leaves
  // (curd/cottage cheese, kohukesed, other desserts) left out because
  // neither store's current dairy scope includes them. Each of the
  // four remaining leaves turned out to be broader than what
  // Barbora/Rimi actually scrape (checked by hand against their real
  // results, not assumed) and needed its own name-based narrowing:
  "Dairy": {
    sources: [
      // 234 "Piimad, koored" (milk, cream) also holds plant-based
      // drinks (soy/oat/almond "jook"), dairy creams (vahukoor,
      // hapukoor, kohvikoor, toidukoor), kefir, buttermilk
      // ("hapendatud" pett/täispiim), ryazhenka, condensed milk, and
      // coffee drinks — none of which Barbora/Rimi's milk scrape
      // contains. Real milk names all contain "piim"; the few
      // "piim"-containing exceptions (kondenspiim, soured/fermented
      // "hapendatud" milk, hapupiim) are excluded explicitly.
      {
        id: 234,
        nameFilter: excludeWords(
          ["kondenspiim", "hapupiim", "hapendatud", "keefir", "kefiir", "rjaženka", "rjazenka", /\bpett\b/],
          ["piim"]
        ),
      },
      // 236 "Jogurtid, jogurtijoogid" also holds drinkable yoghurt
      // ("joogijogurt"/"jogurtijook", both compound orders), yoghurt
      // smoothies, protein shakes/mousse, and a handful of
      // candy-topped kids' desserts (chocolate rice balls, M&M's,
      // Mars bar pieces) — none in Barbora's flavoured-yoghurt scrape
      // either (checked live). Plain flavoured yoghurt under the same
      // kids' brands (Danonino, Emma's fruit flavours) stays, since
      // Barbora/Rimi already carry that style.
      {
        id: 236,
        nameFilter: excludeWords([
          "jook",
          "joogijogurt",
          "kokteil",
          "smuuti",
          "mousse",
          "kommi",
          "riisikuulidega",
          "kakaoküpsistega",
          /\bmars\b/,
          "m&m",
        ]),
      },
      // 239 "Munad" is eggs only (whole, quail, egg white) — matches
      // Barbora/Rimi's scope as-is, no filter needed.
      { id: 239 },
      // 240 "Võid, margariinid" also holds margarine, plant-based
      // spreads, rendered animal fat (goose/duck/pork), a vegan
      // avocado spread, and baking-spray oil — none in Barbora/Rimi's
      // butter scrape, which is real butter (and ghee — present
      // there too, kept here for the same reason match-products.js
      // already has a dedicated "ghee is not butter" test rather than
      // excluding it outright).
      {
        id: 240,
        nameFilter: excludeWords(["margariin", "taimne", "rasvasegu", "searasv", "hanerasv", "pardirasv", "vormiõli", "voimix", "vegan", /\bmäär/]),
      },
    ],
  },
  // "Leivad, saiad, kondiitritooted" (247) has 8 leaves. Only two hold
  // what we want (leib/sai/röstsai/sepik) — excluded: 250 "Sepikud,
  // kuklid, lavašid" (checked: ~43% buns/lavash by sample, and its
  // real sepik items already show up in 249 too), 251 "Näkileivad"
  // (crispbread), 252 "Selveri Pagarid" (Selver's own in-store
  // bakery), 253 "Tordid" (tortes), 254 "Koogid, rullbiskviidid,
  // tainad" (cakes/dough), 255 "Saiakesed, stritslid, kringlid"
  // (small buns/pastries/pretzels).
  "Bread": {
    sources: [
      // 248 "Leivad" (breads) — clean, no filter needed.
      { id: 248 },
      // 249 "Saiad" is mostly sai/sepik/röstsai (Kodusai, Perenaise
      // sai, täisterasepik, ...) but ~16% of it (checked all 50 items
      // by hand) is buns ("kukkel"/"kuklid", a small-bun diminutive
      // "saiake") or lavash flatbread, none of which Barbora/Rimi's
      // bread scrape includes — filtered the same way dairy's
      // categories were narrowed. "Võiks (6 tk)" was left unfiltered —
      // checked afterwards via Selver's own product description
      // ("Nisu-, kaera- ja rukkijahust palaleib" — wheat/oat/rye
      // piece bread), genuinely bread, not a bun.
      { id: 249, nameFilter: excludeWords(["kukkel", "kukli", "kuklid", "saiake", "saiakesed", "lavash", "lavašš"]) },
    ],
  },
  // "Joogid" (28) has 7 children: 29/37 real alcohol, 46 coffee/tea/
  // cocoa, 56 sports drinks+supplements, 59 lighters(!) — all
  // excluded outright. The other two, 48 "Veed, mahlad, siirupid,
  // smuutid" and 52 "Karastus- ja energiajoogid, toonikud", are just
  // parents — their own leaves (49-51, 53-55) are what actually hold
  // products, checked individually below. 54 "Energiajoogid" (energy
  // drinks) and 55 "Alkoholivabad joogid" (alcohol-free beer/cider/
  // wine — still the excluded product types, 0.0% or not) are left
  // out entirely, same as 29/37/46/56 above.
  "Drinks": {
    sources: [
      // 49 "Smuutid, värsked mahlad" — dominated by smoothies/purées
      // (Frosh, Corny, Salvest) with only a couple of real juices
      // mixed in, no clean split — excluded outright, same call as
      // Barbora's "varskelt-pressitud-mahlad-ja-smuutid".
      // 50 "Veed" mixes plain and flavoured water (both legitimately
      // included — see the Drinks category comment in fetch-price.js)
      // with vitamin/sports/magnesium/coconut "water", which isn't
      // really water — filtered the same as every Barbora/Rimi water
      // URL (see waterFilter in fetch-price.js; duplicated here since
      // Selver's fetch path doesn't share that module).
      {
        id: 50,
        nameFilter: excludeWords(["vitamiin", "sport", "spordi", "magneesium", "kookos", "infusion", "ekstrakt"]),
      },
      // 51 "Mahlad ja -kontsentraadid, siirupid" mixes real juice/
      // nectar with juice drinks ("mahlajook") and concentrates at
      // every level, same problem as Rimi's juice tree — same filter.
      { id: 51, nameFilter: excludeWords(["jook", "kontsentraat"], ["mahl", "nektar"]) },
      // 53 "Karastusjoogid, toonikud" — checked all 156 items, clean:
      // soft drinks, tonics, and kali all live here together (Selver
      // has no separate kali category) with no energy drinks, iced
      // tea, or sports drinks mixed in.
      { id: 53 },
    ],
  },
  // Scope: fresh chicken, pork, beef, lamb, and minced meat (incl.
  // turkey mince, raw formed patties/burgers/kebabs) — see the fuller
  // comment on the Meat entry in scraper/categories.js. 219/220/222
  // are already clean leaves for their own animal; 221 genuinely mixes
  // in wild boar and venison ("ulukiliha" in its own name), filtered
  // by name the same way rabbit/game is filtered at Barbora/Rimi.
  // 285 "Külmutatud liha- ja kalatooted" (frozen) was checked by hand
  // and found to hold no fresh/frozen cuts in scope at all — 106 items
  // and every one is dumplings, breaded fish, seafood, or offal — so
  // it's left out entirely rather than fetched and filtered down to
  // nothing.
  "Meat": {
    sources: [
      { id: 219, nameFilter: excludeWords(["peekon", "eelküps", "frikadell", ...MEAT_OFFAL]) }, // Sealiha
      { id: 220, nameFilter: excludeWords(["peekon", "eelküps", "frikadell", ...MEAT_OFFAL]) }, // Linnuliha
      {
        id: 221, // Veise-, lamba- ja ulukiliha
        nameFilter: excludeWords(["peekon", "eelküps", "frikadell", ...MEAT_OFFAL, ...MEAT_GAME]),
      },
      { id: 222, nameFilter: excludeWords(["peekon", "eelküps", "frikadell", ...MEAT_OFFAL]) }, // Hakkliha
    ],
  },
  // Pasta — 11 "Makaronid" is already a clean leaf, checked by hand.
  "Pasta": {
    sources: [{ id: 11 }],
  },
  // Rice & grains — 13 "Riisid" is clean; 12 "Tangained" mixes in
  // legumes (chickpeas, mung beans, lentils), filtered by name the
  // same way Barbora/Rimi's grains categories are.
  "Rice & grains": {
    sources: [
      { id: 13 },
      { id: 12, nameFilter: excludeWords(["hernes", "herned", "oad", "lääts"]) },
    ],
  },
  // Flour & sugar — 10 "Jahud" mixes in baking mixes/powders/desserts
  // (pancake/muffin/cake mixes, baking powder, semolina whip);
  // "Maitseained" (263) is a large flat 336-item spices catch-all with
  // no dedicated sugar leaf, so it's filtered by requiring "suhkur" in
  // the name and excluding sweeteners/substitutes/syrup, the same
  // pattern as Barbora/Rimi's sugar category.
  "Flour & sugar": {
    sources: [
      { id: 10, nameFilter: excludeWords(["segu", "pulber", "pannkoo", "keeks", "muffin", "vaht"]) },
      { id: 263, nameFilter: excludeWords(["asendaja", "magusaine", "siirup"], ["suhkur"]) },
    ],
  },
  // Cooking oil — 267 "Õlid, äädikad" mixes oil with vinegar and
  // vinegar-based sauces/glazes, and one oil spray, filtered by name.
  "Cooking oil": {
    sources: [{ id: 267, nameFilter: excludeWords(["äädik", "palsamikreem", "sprei"]) }],
  },
  // Cheese — Selver keeps cheese under its own department (242
  // "Juustud"), separate from 233 "Piimatooted, munad, võid" that the
  // rest of Dairy uses. Its 4 children: 243 "Juustud" (general/hard/
  // sliced/grated/mozzarella, 115 items), 244 "Määrdejuustud"
  // (spreadable/cream/melted, 59 items), 245 "Delikatessjuustud"
  // (gourmet — blue, goat/sheep, halloumi, feta, 80 items); 246
  // "Gurmee juustud" was checked by hand and found empty (0 items) —
  // left out entirely. All three mix in cheese snacks/sticks/chips
  // (243, 245) and vegan cheese/tofu (243, 244) — same cheeseFilter
  // as Barbora/Rimi (scraper/categories.js), duplicated here for the
  // same self-contained reason every other filter in this file is.
  "Cheese": {
    sources: [
      { id: 243, nameFilter: excludeWords(["näk", "pulgad", "laastud", "ribad", "tofu", "violife", "paprika"]) },
      { id: 244, nameFilter: excludeWords(["näk", "pulgad", "laastud", "ribad", "tofu", "violife", "paprika"]) },
      { id: 245, nameFilter: excludeWords(["näk", "pulgad", "laastud", "ribad", "tofu", "violife", "paprika"]) },
    ],
  },
  // Curd & cottage cheese — 235 "Kohupiimad, kodujuustud" (child of
  // 233, sibling of 234/236/237/239/240 that the rest of Dairy uses)
  // mixes plain kohupiim/kodujuust with dessert-form curd products
  // (curd cream, curd paste) and even two stray Kinder chocolate
  // biscuit cakes and one kohuke — same curdFilter reasoning as
  // Barbora/Rimi (scraper/categories.js), duplicated here.
  "Curd & cottage cheese": {
    sources: [{ id: 235, nameFilter: excludeWords(["kreem", "pasta", "kohupiimap.", "vorm", "kinder", "kohoke"]) }],
  },
  // Cream & sour cream — Selver has no dedicated ID: 234 "Piimad,
  // koored" (the same id Dairy's own milk uses, filtered there down to
  // "piim"-named items only) also holds every cream/sour-cream product
  // under one of five real words (hapukoor, vahukoor, kohvikoor,
  // toidukoor, köögikoor) — every one of them contains "koor", and
  // nothing else in the category does (checked against all 150 items
  // by hand: the plant-based oat "kreem"/"kaerajook" items use neither
  // word, so requiring "koor" alone cleanly excludes them with no
  // separate plant-based filter needed).
  "Cream & sour cream": {
    sources: [{ id: 234, nameFilter: excludeWords([], ["koor"]) }],
  },
  // Kefir & buttermilk — same id 234 as Cream, this time requiring one
  // of kefir/hapupiim/hapendatud/pett/rjaženka (the same "cultured
  // sour milk" family Dairy's own milk filter already excludes as
  // not-milk — see the Dairy category's id:234 comment). Checked by
  // hand against all 150 items: none of the plant-based drink/dessert
  // items in this category use any of these words, so no separate
  // exclude is needed on top of the require list.
  "Kefir & buttermilk": {
    sources: [{ id: 234, nameFilter: excludeWords([], ["keefir", "kefiir", "hapupiim", "hapendatud", /\bpett\b/, "rjaženka", "rjazenka"]) }],
  },
  // Coffee — 24 "Kohvid" (Selver has this whole "Kohv, tee, kakao"
  // tree duplicated under two parent departments, 8 and 28, both
  // resolving to the exact same 184 products when checked by hand —
  // only one copy, id 24, is used here to avoid redundant requests).
  "Coffee": {
    sources: [{ id: 24 }],
  },
  // Tea & cocoa — 25 "Teed" also mixes in MASHIE fruit/berry purée
  // squeeze pouches ("... tee jaoks" — meant to be stirred into hot
  // water, but a genuinely different product form from tea itself,
  // same real find as Barbora/Rimi — see the Tea & cocoa entry in
  // scraper/categories.js); 26 "Kakaod, kakaojoogid" is clean as-is.
  "Tea & cocoa": {
    sources: [{ id: 25, nameFilter: excludeWords(["mashie", "püree"]) }, { id: 26 }],
  },
  // Cereals & oats — 15 "Hommikuhelbed, müslid, kiirpudrud" also mixes
  // in breakfast/muesli/protein bars, fruit-jelly and kissel dessert
  // powder, and kama-ball snacks — none of which are a bowl cereal —
  // checked by hand against all 201 items.
  "Cereals & oats": {
    sources: [
      {
        id: 15,
        nameFilter: excludeWords([
          "batoon",
          "bat.",
          "ampstükk",
          "kamapallid",
          "balsnack",
          "corny",
          "maisikepikes",
          "tarretis",
          "kissel",
        ]),
      },
    ],
  },
  // Canned food — 20 "Hoidised" also mixes in ~20 pesto products and a
  // couple of prepared sauces ("Hiinapärane kaste"), deliberately left
  // for the later sauces & condiments batch — see the fuller comment
  // on the Canned food entry in scraper/categories.js. Its siblings
  // 19 "Magusad hoidised" (jam) and 21 "Valmistoidud purgis" (ready
  // meals) are separate IDs, never fetched here.
  "Canned food": {
    sources: [{ id: 20, nameFilter: excludeWords(["pesto", "kaste", "bruschetta"]) }],
  },
  // Sauces & condiments — 267 "Õlid, äädikad" is shared with Cooking
  // oil, which excludes vinegar/balsamic; here it's the other way
  // round, requiring one of those same words (vinegar is meant to
  // live in this category instead — see the fuller comment on the
  // Sauces & condiments entry in scraper/categories.js). 268
  // "Majoneesid, sinepid" and 270 "Gurmee kastmed" are clean as-is
  // (270 currently holds a single pesto item); 269 "Ketšupid,
  // tomatipastad, kastmed" mixes in one sweet dessert dip. 264
  // "Maailma köök" (world cuisine) is a big mixed department — only
  // its real liquid-sauce items are pulled in by requiring "kaste" or
  // "salsa" (its spice blends go to Spices instead, its tortilla
  // chips/noodles/wraps/coconut drink are out of scope entirely).
  "Sauces & condiments": {
    sources: [
      { id: 267, nameFilter: excludeWords([], ["äädik", "palsamikreem"]) },
      { id: 268 },
      { id: 269, nameFilter: excludeWords(["šokolaadi hummus"]) },
      { id: 270 },
      { id: 264, nameFilter: excludeWords([], ["kaste", "salsa"]) },
    ],
  },
  // Spices — 263 "Maitseained" is a large flat catch-all (337 items,
  // also shared with Flour & sugar, which requires "suhkur" from it)
  // that also mixes in every baking additive (same words Baking
  // supplies below requires), one Swedish-style cold fruit soup
  // ("Mustikasupp"), and — found by hand in the first live scrape —
  // syrup and sweetener ("siirup"/"asendaja"/"magusaine", the same
  // words Flour & sugar's own comment already excludes for the same
  // reason), almond flour ("jahu" — already fully inside Flour &
  // sugar, same "same product, two categories" risk as vanilla
  // sugar), and baking soda ("söögisooda", missed on the first pass
  // even though "küpsetuspulber"/baking powder was already excluded —
  // moved to Baking supplies' require list instead). 264 "Maailma
  // köök" contributes its spice-blend items here (the sauce/salsa
  // side of the same department goes to Sauces & condiments instead).
  "Spices": {
    sources: [
      {
        id: 263,
        nameFilter: excludeWords([
          "suhkur",
          "siirup",
          "asendaja",
          "magusaine",
          "jahu",
          "küpsetuspulber",
          "söögisooda",
          "želatiin",
          "paksendaja",
          "glasuur",
          "dekoratsioon",
          "nonparell",
          "toiduvärv",
          "vaniljekaun",
          "pärm",
          "mustikasupp",
        ]),
      },
      // "kaste" excluded here even though "maitseainesegu" matches —
      // one real hybrid product, "Tandoori kaste ja maitseainesegu",
      // literally names both a sauce and a spice mix; without this it
      // scraped into Spices AND Sauces & condiments as the same URL,
      // the same same-product-in-two-categories problem as vanilla
      // sugar. Kept in Sauces & condiments only (see that category's
      // own id 264 source, which requires "kaste"/"salsa").
      { id: 264, nameFilter: excludeWords(["kaste"], ["maitseainesegu"]) },
    ],
  },
  // Jam & honey & spreads — 19 "Magusad hoidised" already bundles jam,
  // honey, canned/preserved fruit, fruit purée, and sweet spreads
  // (Nutella-style, peanut/cashew butter, tahini, lemon curd, maple-
  // adjacent dessert sauces) cleanly, checked against all 109 items by
  // hand — no filter needed.
  "Jam & honey & spreads": {
    sources: [{ id: 19 }],
  },
  // Baking supplies — same 263 "Maitseained" catch-all as Spices,
  // this time requiring one of the baking-additive words instead of
  // excluding them. "Maitsepärm" (nutritional/savoury yeast — a
  // seasoning, not a leavening agent) is excluded even though it
  // contains "pärm", the same word real baking yeast is caught by.
  "Baking supplies": {
    sources: [
      {
        id: 263,
        nameFilter: excludeWords(
          ["maitsepärm"],
          ["küpsetuspulber", "söögisooda", "želatiin", "paksendaja", "glasuur", "dekoratsioon", "nonparell", "toiduvärv", "vaniljekaun", "pärm"]
        ),
      },
    ],
  },
  // Sweets & snacks — all under 271 "Maiustused, küpsised, näksid".
  // Its seasonal leaves (280/281 "Tähtpäeva …") were empty when
  // checked, 276 "Näkileivad" (crispbread) is deliberately out (same
  // call as Bread), and 279 "Gurmee …" held a single real biscuit —
  // fetched with Biscuits so it isn't lost.
  // 283 "Šokolaadid" — chocolate bars incl. countlines; clean.
  "Chocolate": {
    sources: [{ id: 283 }],
  },
  // 272 "Kommipakid" (bags, incl. chocolate-COATED candy the other
  // stores also file as candy), 273 "Nätsud, pastillid", 274 "Muud
  // maiustused" (surprise eggs, toffee, halva, marmalade, marzipan),
  // 282 "Kommikarbid" (boxed) — all checked by hand, clean.
  "Candy": {
    sources: [{ id: 272 }, { id: 273 }, { id: 274 }, { id: 282 }],
  },
  // 275 "Küpsised" also mixes in one crispbread ("Näkileivad") —
  // excluded, same call as Bread — and, found in the first scrape,
  // garlic bread and pumpernickel from Selver's own bakery
  // ("Küüslauguleivad", "Pumpernikkel"): bread, not a biscuit.
  "Biscuits": {
    sources: [{ id: 275, nameFilter: excludeWords(["näkileiv", "näkileib", "küüslauguleiv", "pumpernik"]) }, { id: 279 }],
  },
  // 278 "Sipsid" also holds chip-dip mixes/sauces ("Dipikaste…",
  // "Dipikastmepulber…") — a sauce mix, not a snack, same exclusion
  // as Rimi's own "Dipikastmed"/"Dipisegu"/"Dipp…" and Barbora's
  // never-fetched "kuivad-dipikastmed" leaf.
  "Chips & snacks": {
    sources: [{ id: 278, nameFilter: excludeWords(["dipi", "dipp"]) }],
  },
  // 277 "Pähklid ja kuivatatud puuviljad" — nuts, seeds, dried fruit,
  // mixes; checked by hand, clean.
  "Nuts, seeds & dried fruit": {
    sources: [{ id: 277 }],
  },
  // Frozen — all under 284 "Külmutatud toidukaubad".
  // 287 "Külmutatud köögiviljad, marjad, puuviljad" also holds every
  // frozen potato product (fries, wedges, rösti, potato balls/
  // pancakes/croquettes — Dumplings, pizza & fries' scope by the
  // owner's call) and one frozen soup; the specific potato-PRODUCT
  // words are excluded, not "kartul" itself, so a vegetable mix that
  // merely contains potato ("Kartuli-sibulasegu", "Praadimissegu
  // kartuliga") stays here.
  "Frozen vegetables & berries": {
    sources: [{ id: 287, nameFilter: excludeWords(SELVER_FROZEN_POTATO_WORDS.concat(["supp", "supi", "smuuti"])) }],
  },
  // 289 "Jäätised" — ice cream, incl. juice ices; ice cubes excluded.
  "Ice cream": {
    sources: [{ id: 289, nameFilter: excludeWords(["jääkuubik"]) }],
  },
  // Selver spreads this across three IDs: dumplings sit in 285
  // "Külmutatud liha- ja kalatooted" (41 of its 106 items — the rest
  // is breaded fish, seafood, offal, none wanted), pizza and one
  // vareniki in 286 "Külmutatud valmistooted" (otherwise ready meals:
  // nuggets, spring rolls, pancakes, boxed meals, baby purée), and
  // the potato products in 287 (see above). Each is taken by name.
  "Dumplings, pizza & fries": {
    sources: [
      { id: 285, nameFilter: excludeWords([], ["pelmeen", "vareenik"]) },
      { id: 286, nameFilter: excludeWords([], ["pelmeen", "vareenik", "pitsa", "pizza"]) },
      { id: 287, nameFilter: excludeWords([], SELVER_FROZEN_POTATO_WORDS) },
    ],
  },
  // Meat products & fish — all under 218 "Liha- ja kalatooted"
  // (219–222 are the fresh cuts Meat already uses).
  // 223 "Keedu- ja suitsuvorstid, viinerid" and 226 "Grillvorstid,
  // verivorstid" — sausages; BON VEGAN "Taimne viiner"/"Taimne
  // suitsuvorst" mixed into 223, excluded.
  // Real find: 223 also carries smoked/sliced ham ("Suitusink",
  // "Lainelised singilõigud", "Singi-šampinjoni lõige") — SELVER_HAM_WORDS
  // excluded on both, so a stray one in 226 is caught too.
  "Sausages": {
    sources: [
      { id: 223, nameFilter: excludeWords(SELVER_PLANT_BASED_WORDS.concat(SELVER_HAM_WORDS)) },
      { id: 226, nameFilter: excludeWords(SELVER_PLANT_BASED_WORDS.concat(SELVER_HAM_WORDS)) },
    ],
  },
  // 224 "Singid, rulaadid" is clean (two "Xvorst" items, e.g.
  // "Sinkvorst XL" — a pressed ham loaf, genuinely ham despite the
  // "vorst" ending, left as-is). 227 "Gurmee lihatooted" (prosciutto,
  // coppa, terrines) also carries real dry sausage (Fuetec, Tapas
  // fuet) — SAUSAGE_WORDS excluded. 225 "Muud lihatooted" is a real
  // mixed bag — pâté, sült, canned meat, jerky/snacks, smoked chicken
  // and cured cuts (wanted) next to meatballs, cutlets, nuggets,
  // breaded schnitzel, pulled meat, a soup kit, and plant-based fakes
  // (not) — so it's taken by REQUIRING an in-scope word, checked
  // against all 160 names by hand.
  "Ham & cold cuts": {
    sources: [
      { id: 224, nameFilter: excludeWords(SELVER_PLANT_BASED_WORDS) },
      { id: 227, nameFilter: excludeWords(SELVER_SAUSAGE_WORDS) },
      {
        id: 225,
        nameFilter: excludeWords(
          SELVER_PLANT_BASED_WORDS.concat(["supikogu"]),
          // "vürtsisealiha"/"vürtsine sealiha"/"vürtsikas lihaveise" are
          // canned meats; a bare "vürtsi" also caught spicy chicken
          // wings (pre-cooked, not a cold cut) — checked on the dump.
          ["sült", "pasteet", "konserv", "omas mahlas", "hautatud", "turisti", "vürtsisealiha", "vürtsine sealiha", "vürtsikas lihaveise", "jerky", "vinnut", "kuivat", "snäk", "kabanos", "salaami", "sink", "prosciutto", "suitsu", "äkis", "terriin", "vaht", "seakõrv"]
        ),
      },
    ],
  },
  // 228 "Värske kala, mereannid" (nearly all per kg), 229 "Soolatud ja
  // suitsutatud kalatooted", 230 "Töödeldud mereannid" (mussels,
  // shrimp, roe, caviar, seaweed), 231 "Muud kalatooted" (canned,
  // marinated, sprats, herring, dried) — checked by hand, clean.
  "Fish & seafood": {
    sources: [{ id: 228 }, { id: 229 }, { id: 230 }, { id: 231, nameFilter: excludeWords(SELVER_PLANT_BASED_WORDS) }],
  },
  // Same source as "Baby formula" (307, "Lastetoidud" — Selver has no
  // finer category), the opposite filter: every real formula product
  // contains "piimasegu", excluded outright here so nothing is ever
  // in both categories (the owner's explicit rule for this batch).
  "Baby food": {
    sources: [{ id: 307, nameFilter: excludeWords(["piimasegu"]) }],
  },
  // 308 "Mähkmed" is flat (no further split by size the way Barbora's
  // own leaf is) — special-purpose diapers and the stray "Rinnapadjad"
  // (breast pads) excluded by name. 309 "Beebi hooldusvahendid" bundles
  // real wet wipes in with shampoo/cream/powder/cotton swabs/bottles —
  // isolated by requiring both "wet" and "napkin" (see
  // SELVER_DIAPER_WIPE_ONLY).
  "Diapers & baby wipes": {
    sources: [
      { id: 308, nameFilter: excludeWords(SELVER_DIAPER_EXCLUDE) },
      { id: 309, nameFilter: excludeWords([], SELVER_DIAPER_WIPE_ONLY) },
    ],
  },
  // "Enesehooldustarbed" (63) hygiene-only leaves — the owner's call:
  // deodorant (88), hair care minus dye (78/79/518 — hair dye, 80, is
  // its own separate id, simply never fetched), body wash/soap/lotion/
  // hand care (83/84/93 — sun care, manicure/pedicure, and body
  // brushes/sponges are their own separate ids under 82, never
  // fetched), shaving (86), oral care (68's own children, 69/70 —
  // 68 itself holds no products directly), feminine hygiene (91).
  // Never fetched at all: 64 (Tervisekaubad/Apteegikaubad — home
  // pharmacy, a regulatory/legal angle CLAUDE.md flags), 71
  // (Näohooldus — face care), 92 (Lõhnad, tualettveed — perfume), 94
  // (Dekoratiivkosmeetika — makeup; all three the Beauty deals
  // feature's own territory, per the owner's explicit separation).
  "Personal care": {
    sources: [{ id: 69 }, { id: 70 }, { id: 78 }, { id: 79 }, { id: 518 }, { id: 83 }, { id: 84 }, { id: 86 }, { id: 88 }, { id: 91 }, { id: 93 }],
  },
  // "Majapidamis- ja kodukaubad" (100) consumables only — the owner's
  // call: paper products (102/103/104) and cleaning products
  // (108/110/111/112). Never fetched: reusable tools (109, sponges/
  // brushes), clothing/shoe care (113), kitchenware (123), appliances
  // (135), bathroom/sauna accessories (143), textiles (149), décor
  // (155), garden goods (161), and — under 118's own children —
  // clothing storage (119), lightbulbs/cords (121), batteries (122),
  // tape (505), and pest control (120, kept out the same conservative
  // way home pharmacy is for Personal care). No laundry-detergent leaf
  // exists anywhere in this department — genuinely absent from
  // Selver's own tree, not a filtering mistake.
  "Household": {
    sources: [{ id: 102 }, { id: 103 }, { id: 104 }, { id: 108 }, { id: 110 }, { id: 111 }, { id: 112 }],
  },
  // "Lemmiklooma kaubad" (314) pet FOOD only — the roadmap's own scope.
  // 319 "Lemmikloomatarbed" (litter, toys, accessories) never fetched —
  // not food.
  "Pet food": {
    sources: [{ id: 315 }, { id: 316 }, { id: 317 }, { id: 318 }],
  },
};

async function fetchSelverPrice(categoryName) {
  const config = CATEGORIES[categoryName];
  if (!config) {
    throw new Error(`Selver: unknown category "${categoryName}". Known categories: ${Object.keys(CATEGORIES).join(", ")}`);
  }

  const brandMap = await getBrandMap();

  const seen = new Set();
  const items = [];
  for (const source of config.sources) {
    const data = await fetchJson(
      searchUrl(SEARCH_URL, { query: { term: { category_ids: source.id } }, size: 300 })
    );

    for (const hit of data.hits.hits) {
      const item = hit._source;
      if (seen.has(item.id)) continue;
      seen.add(item.id);

      // No equivalent to Barbora's price===0 "temporarily unavailable"
      // filter here: every item in this index reports
      // stock.is_in_stock === false, even ordinary staples, so it's
      // not a live per-request signal (most likely store/pickup-point
      // dependent and never resolved for an anonymous, storeless
      // request) — checked and confirmed before deciding to ignore it
      // rather than filter on it.
      if (source.nameFilter && !source.nameFilter(item.name)) continue;

      items.push(mapItem(item, brandMap));
    }
  }

  return items;
}

module.exports = { fetchSelverPrice, CATEGORIES };
