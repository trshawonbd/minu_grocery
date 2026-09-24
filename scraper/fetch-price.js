// Fetches product categories from multiple grocery stores, pools every
// store's items for a category together and groups them into products
// (see matchPool in match-products.js — a product can hold any number
// of stores, not just two), and writes:
// - data/raw/<category>/<store>.json + meta.json: every item exactly
//   as the store returned it, overwritten each run — the single
//   source anything else needs the scraped items from (see
//   scraper/raw.js). This is the only file in the project that
//   should ever contact a store; everything downstream reads this
//   instead (see scraper/no-scrape.test.js).
// - data/prices.json: matched products, one entry per product with a
//   `prices` object keyed by however many stores it was found at.
//   Merges by category — a run only replaces the categories it
//   fetched this time, leaving every other category already in the
//   file untouched.
// - data/unmatched.json: items with a recognized type or brand that
//   still didn't find a match anywhere — needs a person to check (see
//   match-products.js).
// - data/unclassified.json: items with no recognized type or brand at
//   all — never had a reliable comparison to begin with, kept
//   separate from unmatched.json for that reason.
// - data/ambiguous.json: whole groups that don't agree with each
//   other cleanly — two same-store items both matching a third, or a
//   chain (A-B, B-C) that isn't a clique (no A-C) — needs a person to
//   pick, not a guess (see matchPool).
// Unlike prices.json, the latter three are a plain overwrite of
// whatever this run actually processed, every run — they don't merge
// by category, so a single-category run narrows them to that
// category's leftovers only.
//
// Run with: node scraper/fetch-price.js
// or, to refresh a single category: node scraper/fetch-price.js "Baby formula"

const fs = require("fs");
const path = require("path");
const { fetchBarboraPrice } = require("./stores/barbora");
const { fetchRimiPrice } = require("./stores/rimi");
const { fetchSelverPrice } = require("./stores/selver");
const { matchPool, computeSignature } = require("./match-products");
const { writeRaw } = require("./raw");

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
];

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const KNOWN_DIFFERENT_PATH = path.join(__dirname, "..", "data", "known-different.json");
const OUTPUT_PATH = path.join(__dirname, "..", "data", "prices.json");
const UNMATCHED_PATH = path.join(__dirname, "..", "data", "unmatched.json");
const UNCLASSIFIED_PATH = path.join(__dirname, "..", "data", "unclassified.json");
const AMBIGUOUS_PATH = path.join(__dirname, "..", "data", "ambiguous.json");

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Mirrors the classification matchPool already applies when choosing
// between its two console.warn messages — reused here so
// data/unclassified.json and data/unmatched.json split the same way
// the log output does, instead of re-deriving it differently.
function isUnclassified(item) {
  const sig = item.signature;
  return !sig.isProduce && !sig.hasBrand && sig.brand === null;
}

function toLeftoverEntry(item) {
  return { store: item.store, name: item.name, price: item.price };
}

// prices.json's per-product store map: one entry per item in the
// group, keyed by the store's own name lowercased — however many
// stores a product was found at, not a fixed barbora/rimi shape.
function toPricesObject(groupItems) {
  return Object.fromEntries(groupItems.map((item) => [item.store.toLowerCase(), toStoreEntry(item)]));
}

// `price` is always what any shopper can pay today (see splitPrice in
// scraper/stores/barbora.js) — the only field matching or the
// cheapest-store comparison ever reads. cardPrice/cardName are
// included only when a loyalty-card price actually exists for this
// item, so they never silently influence which store looks cheaper.
function toStoreEntry(item) {
  const entry = { price: item.price, currency: item.currency, url: item.url };
  if (item.cardPrice != null) {
    entry.cardPrice = item.cardPrice;
    entry.cardName = item.cardName;
  }
  return entry;
}

// Both stores cap a category listing at one page and require a page
// number to get the rest. Barbora signals the end with a clean empty
// page (`window.b_productList = []`); Rimi has no such signal — a
// page past the last one throws instead — so past page 1, any fetch
// error is treated as "no more pages" rather than surfaced. A page 1
// error still throws, since that means the category itself failed.
async function fetchAllPages(fetchFn, baseUrl, pageParam) {
  const items = [];
  let page = 1;

  while (true) {
    const url = `${baseUrl}?${pageParam}=${page}`;
    let pageItems;
    if (page === 1) {
      pageItems = await fetchFn(url);
    } else {
      try {
        pageItems = await fetchFn(url);
      } catch (err) {
        break;
      }
    }

    if (pageItems.length === 0) break;
    items.push(...pageItems);
    page++;
  }

  return items;
}

// Normalizes a category's urls.barbora/urls.rimi (a single URL, an
// array of them, or — when a subcategory bundles in a product type we
// don't want with no finer URL to split on, e.g. Rimi's juice tree
// mixing "mahl"/"nektar" with "mahlajook" at every level — an array
// entry can instead be `{ url, nameFilter }`) and fetches every one,
// paginated, concatenated into one list. Mirrors the nameFilter
// already used for Selver's sources (see stores/selver.js) — same
// principle, extended here since Barbora/Rimi needed it for the first
// time with Drinks.
async function fetchAllUrls(fetchFn, urlOrUrls, pageParam) {
  const entries = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls];
  const results = await Promise.all(
    entries.map(async (entry) => {
      const { url, nameFilter } = typeof entry === "string" ? { url: entry, nameFilter: null } : entry;
      const items = await fetchAllPages(fetchFn, url, pageParam);
      return nameFilter ? items.filter((item) => nameFilter(item.name)) : items;
    })
  );
  return results.flat();
}

async function main() {
  const requestedName = process.argv[2];
  const categories = requestedName ? CATEGORIES.filter((c) => c.name === requestedName) : CATEGORIES;

  if (categories.length === 0) {
    throw new Error(
      `Unknown category "${requestedName}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`
    );
  }

  const overrides = loadJson(PRODUCTS_PATH);
  const knownDifferent = loadJson(KNOWN_DIFFERENT_PATH);

  const existing = fs.existsSync(OUTPUT_PATH) ? loadJson(OUTPUT_PATH) : [];
  const untouched = existing.filter((p) => !categories.some((c) => c.name === p.category));

  const freshEntries = [];
  const unmatchedEntries = [];
  const unclassifiedEntries = [];
  const ambiguousEntries = [];

  for (const category of categories) {
    // Selver has its own internal 1-req/sec throttle (see
    // stores/selver.js) independent of Barbora/Rimi's pagination, so
    // fetching all three in parallel here doesn't affect its pacing —
    // each store's requests are still sequential within themselves.
    const [barboraResults, rimiResults, selverResults] = await Promise.all([
      fetchAllUrls(fetchBarboraPrice, category.urls.barbora, "page"),
      fetchAllUrls(fetchRimiPrice, category.urls.rimi, "currentPage"),
      fetchSelverPrice(category.name),
    ]);

    // Saved exactly as the stores returned it, before signatures or
    // strictPackaging are added — the single source anything else
    // (review.md, matching experiments) should read from instead of
    // scraping again. See scraper/raw.js and scraper/no-scrape.test.js.
    writeRaw(category.name, {
      order: CATEGORIES.indexOf(category),
      strictPackaging: category.strictPackaging !== false,
      resultsByStore: { Barbora: barboraResults, Rimi: rimiResults, Selver: selverResults },
    });

    // Default true; a category opts out explicitly (see CATEGORIES)
    // rather than opting in, so a new category gets the safer rule
    // without anyone having to remember to ask for it.
    const strictPackaging = category.strictPackaging !== false;

    // Run every item through the extraction functions exactly once
    // here, instead of once per pair inside matchPool — with N
    // Barbora items and M Rimi items, that's N+M extraction passes
    // instead of up to N×M.
    for (const item of barboraResults) {
      if (strictPackaging) item.strictPackaging = true;
      item.signature = computeSignature(item);
    }
    for (const item of rimiResults) {
      if (strictPackaging) item.strictPackaging = true;
      item.signature = computeSignature(item);
    }
    for (const item of selverResults) {
      if (strictPackaging) item.strictPackaging = true;
      item.signature = computeSignature(item);
    }

    // One flat pool per category — every store's items together, not
    // a fixed "store A vs store B" pair.
    const pool = [...barboraResults, ...rimiResults, ...selverResults];
    const { matches, unmatched, ambiguous } = matchPool(pool, overrides, knownDifferent);

    for (const { items: groupItems } of ambiguous) {
      ambiguousEntries.push({
        category: category.name,
        items: groupItems.map(toLeftoverEntry),
      });
    }

    let unclassifiedCount = 0;
    for (const item of unmatched) {
      if (isUnclassified(item)) {
        unclassifiedEntries.push(toLeftoverEntry(item));
        unclassifiedCount++;
      } else {
        unmatchedEntries.push(toLeftoverEntry(item));
      }
    }

    console.log(
      `${category.name}: ${barboraResults.length} Barbora items, ${rimiResults.length} Rimi items, ` +
        `${selverResults.length} Selver items -> ${matches.length} matches, ` +
        `${unmatched.length - unclassifiedCount} unmatched, ${unclassifiedCount} unclassified, ${ambiguous.length} ambiguous`
    );

    for (const { items: groupItems, canonicalName, reason } of matches) {
      freshEntries.push({
        name: canonicalName,
        category: category.name,
        prices: toPricesObject(groupItems),
        matchedVia: reason,
      });
    }
  }

  const prices = [...untouched, ...freshEntries];

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prices, null, 2) + "\n");
  fs.writeFileSync(UNMATCHED_PATH, JSON.stringify(unmatchedEntries, null, 2) + "\n");
  fs.writeFileSync(UNCLASSIFIED_PATH, JSON.stringify(unclassifiedEntries, null, 2) + "\n");
  fs.writeFileSync(AMBIGUOUS_PATH, JSON.stringify(ambiguousEntries, null, 2) + "\n");

  console.log(`\nWrote ${prices.length} matched products to data/prices.json (${freshEntries.length} from this run):`);
  prices.forEach((p) => {
    const stores = Object.entries(p.prices)
      .map(([store, entry]) => `${store[0].toUpperCase()}${store.slice(1)} ${entry.price.toFixed(2)} ${entry.currency}`)
      .join(" — ");
    console.log(`  [${p.category}] ${p.name}: ${stores} (${p.matchedVia})`);
  });
  console.log(`Wrote ${unmatchedEntries.length} leftover items to data/unmatched.json.`);
  console.log(`Wrote ${unclassifiedEntries.length} leftover items to data/unclassified.json.`);
  console.log(`Wrote ${ambiguousEntries.length} ambiguous groups to data/ambiguous.json.`);
}

main().catch((err) => {
  console.error("Scraper failed:", err.message);
  process.exit(1);
});
