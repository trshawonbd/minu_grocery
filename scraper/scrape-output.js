// Shared pieces of turning a raw scrape into the shapes data/ files
// use — split out of fetch-price.js so scraper/daily-update.js can
// reuse the exact same logic (pagination, per-store entry shape,
// leftover-item shape) without re-fetching through fetch-price.js
// itself, which would mean requiring a file whose whole job is to
// scrape unconditionally. Pure functions and network-pagination
// glue only — no file writes here.

const { computeSignature } = require("./match-products");

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
// don't want with no finer URL to split on — an array entry can
// instead be `{ url, nameFilter }`) and fetches every one, paginated,
// concatenated into one list. Mirrors the nameFilter already used for
// Selver's sources (see stores/selver.js).
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

// Sets strictPackaging/matchAcrossWeights from the category's own
// settings and computes the signature exactly once — the same
// preparation fetch-price.js does before matchPool, and the same one
// scraper/raw.js's loadRawPool does when reading data/raw/ back. A
// category opts out of strictPackaging explicitly (default true) and
// opts into matchAcrossWeights explicitly (default false) — see
// scraper/categories.js.
// A raw item read back from data/raw/ carries the settings recorded in
// meta.json AT SCRAPE TIME. A rebuild or rename exists because a rule
// changed since, so the CURRENT settings in scraper/categories.js win:
// every flag is cleared and set again exactly as prepareItem sets it
// today, signature included.
const CATEGORY_FLAGS = ["strictPackaging", "matchAcrossWeights", "diaperMatching", "fixedWeightMustMatch", "alcoholMatching", "pieceCountSizes", "impliedDescriptors", "signature"];

function withCurrentSettings(items, category) {
  return items.map((item) => {
    for (const flag of CATEGORY_FLAGS) delete item[flag];
    return prepareItem(item, category);
  });
}

// Coop's Store API has no brand field, and its names put the brand
// late ("Jogurt maasika Alma 380g", like Rimi — but Rimi has a brand
// facet). The first capitalized word would be read as the brand
// ("jogurt"), so a Coop item could never pair with a Barbora/Rimi/
// Selver item whose store states "Alma". Before signatures are
// computed, every brand the OTHER stores state in the same category
// pool is looked for in a brand-less item's name (whole words,
// case-insensitive, the longest brand first) and, when found, set as
// that item's brand. Nothing is guessed that no store in the pool
// stated; an item with no such brand keeps the name-only fallback.
// Pure: mutates only `brand` on items that had none.
function inferBrands(pool) {
  const brands = [...new Set(pool.filter((it) => it.brand).map((it) => String(it.brand).trim()).filter((b) => b.length >= 3))];
  const patterns = brands
    .sort((a, b) => b.length - a.length)
    // A digit may follow the brand directly ("Holle2" — Coop fuses the
    // formula stage onto it); a letter may not ("Alma" is not "Almar").
    .map((brand) => ({ brand, regex: new RegExp(`(?<![\\p{L}\\p{N}])${brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}(?![\\p{L}])`, "iu") }));
  let inferred = 0;
  for (const item of pool) {
    if (item.brand || !item.name) continue;
    const hit = patterns.find(({ regex }) => regex.test(item.name));
    if (hit) {
      item.brand = hit.brand;
      inferred++;
    }
  }
  return inferred;
}

function prepareItem(item, category) {
  if (category.strictPackaging !== false) item.strictPackaging = true;
  if (category.matchAcrossWeights === true) item.matchAcrossWeights = true;
  if (category.diaperMatching === true) item.diaperMatching = true;
  if (category.fixedWeightMustMatch === true) item.fixedWeightMustMatch = true;
  if (category.alcoholMatching === true) item.alcoholMatching = true;
  if (category.pieceCountSizes === true) item.pieceCountSizes = true;
  if (Array.isArray(category.impliedDescriptors) && category.impliedDescriptors.length > 0) {
    item.impliedDescriptors = category.impliedDescriptors;
  }
  item.signature = computeSignature(item);
  return item;
}

// Mirrors the classification matchPool already applies when choosing
// between its two console.warn messages — reused so
// data/unclassified.json and data/unmatched.json split the same way
// the log output does, instead of re-deriving it differently.
function isUnclassified(item) {
  const sig = item.signature;
  return !sig.isProduce && !sig.hasBrand && sig.brand === null;
}

function toLeftoverEntry(item) {
  return { store: item.store, name: item.name, price: item.price };
}

// `price` is always what any shopper can pay today (see splitPrice in
// scraper/stores/barbora.js) — the only field matching or the
// cheapest-store comparison ever reads. cardPrice/cardName are
// included only when a loyalty-card price actually exists for this
// item, so they never silently influence which store looks cheaper.
// `size` is the already-normalized string from computeSignature
// (comma/period and unit collapsed to one base unit — see
// match-products.js) — display-only, for the frontend's unit-price
// line (frontend/pricing.js's unitPrice); never read by matching.
// `storeUnitPrice` is the store's OWN per-kg/per-l price (Barbora's
// comparative_unit_price, Rimi's card "Hind ühiku kohta", Selver's
// unit_price) — unlike `size`-derived unitPrice, this is available
// even when an item is priced "per kg" with no weight of its own in
// the name (most of Meat). Display-only, like `size`; never read by
// matching.
function toStoreEntry(item) {
  const entry = { price: item.price, currency: item.currency, url: item.url };
  if (item.cardPrice != null) {
    entry.cardPrice = item.cardPrice;
    entry.cardName = item.cardName;
  }
  if (item.signature.size) {
    entry.size = item.signature.size;
  }
  // The store's valid barcode (Selver, Coop) — display/report only:
  // it shows which matches EAN decided.
  if (item.signature.ean) {
    entry.ean = item.signature.ean;
  }
  if (item.storeUnitPrice != null) {
    entry.storeUnitPrice = item.storeUnitPrice;
  }
  // The store's own product-photo URL, hotlinked by the app (never
  // downloaded or saved) — see SHOW_STORE_IMAGES in frontend/pricing.js.
  if (item.image) {
    entry.image = item.image;
  }
  // The store's own pre-sale ("Tavahind"/retail) price, only when the
  // store states one above what's paid today — the app's "Cheaper
  // than usual" reads this, and only this: a loyalty-card price never
  // counts as a discount. Display-only, never read by matching.
  if (typeof item.regularPrice === "number" && item.regularPrice > item.price) {
    entry.regularPrice = item.regularPrice;
  }
  // The store's own listing title, shown in small print under the
  // store's row on the product screen so a shopper can check the
  // match with their own eyes. Display-only.
  if (item.name) {
    entry.storeName = item.name;
  }
  return entry;
}

// prices.json's per-product store map: one entry per item in the
// group, keyed by the store's own name lowercased — however many
// stores a product was found at, not a fixed barbora/rimi shape.
function toPricesObject(groupItems) {
  return Object.fromEntries(groupItems.map((item) => [item.store.toLowerCase(), toStoreEntry(item)]));
}

// One data/prices.json product from one matchPool match — the single
// place that shape is built, shared by fetch-price.js (a live scrape)
// and rebuild-prices.js (the same pipeline re-run over data/raw/ with
// no network), so the two can never drift apart.
function toProductEntry(category, match) {
  const entry = {
    name: match.canonicalName,
    category: category.name,
    prices: toPricesObject(match.items),
    matchedVia: match.reason,
  };
  // Meat decides "cheapest" by per-kg price, not pack price — see
  // frontend/pricing.js's cheapestPrice/productRows and
  // cheapestByUnitPrice in scraper/categories.js. Every other
  // category leaves this unset and keeps comparing by `price`.
  if (category.cheapestByUnitPrice) entry.cheapestByUnitPrice = true;
  return entry;
}

// No two products in a category may share a displayed name (the
// owner's rule). synthesizeCanonicalName is meant to make names
// unique by itself — this is the guard for whatever it still misses.
// A duplicate group gets each member's name extended with the first
// raw-name word (from any of its store listings) that no other member
// of the group has anywhere in its own listings; when even that finds
// nothing, a " (2)", " (3)" suffix — visible, never silent. Returns
// new match objects; the input isn't mutated.
function uniqueCanonicalNames(matches) {
  const wordsOf = (match) => new Set(match.items.flatMap((it) => (it.name.toLowerCase().match(/\p{L}+/gu) || [])));
  const groups = new Map();
  for (const match of matches) {
    if (!groups.has(match.canonicalName)) groups.set(match.canonicalName, []);
    groups.get(match.canonicalName).push(match);
  }

  const renamed = new Map();
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const words = group.map(wordsOf);
    const taken = new Set();
    group.forEach((match, i) => {
      const others = words.filter((_, j) => j !== i);
      const distinct = [...words[i]].find((w) => !others.some((set) => set.has(w)));
      let name = distinct ? `${match.canonicalName} ${distinct}` : match.canonicalName;
      for (let n = 2; taken.has(name); n++) name = `${match.canonicalName} (${n})`;
      taken.add(name);
      renamed.set(match, name);
    });
  }
  return matches.map((match) => (renamed.has(match) ? { ...match, canonicalName: renamed.get(match) } : match));
}

module.exports = {
  fetchAllPages,
  fetchAllUrls,
  prepareItem,
  inferBrands,
  withCurrentSettings,
  isUnclassified,
  toLeftoverEntry,
  toStoreEntry,
  toPricesObject,
  toProductEntry,
  uniqueCanonicalNames,
};
