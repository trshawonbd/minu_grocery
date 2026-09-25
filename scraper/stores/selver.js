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
