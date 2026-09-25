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
const { matchPool } = require("./match-products");
const { writeRaw } = require("./raw");
const { CATEGORIES } = require("./categories");
const { fetchAllUrls, prepareItem, isUnclassified, toLeftoverEntry, toPricesObject } = require("./scrape-output");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const KNOWN_DIFFERENT_PATH = path.join(__dirname, "..", "data", "known-different.json");
const OUTPUT_PATH = path.join(__dirname, "..", "data", "prices.json");
const UNMATCHED_PATH = path.join(__dirname, "..", "data", "unmatched.json");
const UNCLASSIFIED_PATH = path.join(__dirname, "..", "data", "unclassified.json");
const AMBIGUOUS_PATH = path.join(__dirname, "..", "data", "ambiguous.json");

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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
      matchAcrossWeights: category.matchAcrossWeights === true,
      diaperMatching: category.diaperMatching === true,
      resultsByStore: { Barbora: barboraResults, Rimi: rimiResults, Selver: selverResults },
    });

    // Run every item through the extraction functions exactly once
    // here, instead of once per pair inside matchPool — with N
    // Barbora items and M Rimi items, that's N+M extraction passes
    // instead of up to N×M. prepareItem sets strictPackaging/
    // matchAcrossWeights from the category's own settings (default
    // true / opt-in false respectively — see scraper/categories.js)
    // before computing the signature.
    for (const item of barboraResults) prepareItem(item, category);
    for (const item of rimiResults) prepareItem(item, category);
    for (const item of selverResults) prepareItem(item, category);

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
      const entry = {
        name: canonicalName,
        category: category.name,
        prices: toPricesObject(groupItems),
        matchedVia: reason,
      };
      // Meat decides "cheapest" by per-kg price, not pack price — see
      // frontend/pricing.js's cheapestPrice/productRows and
      // cheapestByUnitPrice in scraper/categories.js. Every other
      // category leaves this unset and keeps comparing by `price`.
      if (category.cheapestByUnitPrice) entry.cheapestByUnitPrice = true;
      freshEntries.push(entry);
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
