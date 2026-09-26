// Writes data/singles.json: every scraped listing in data/raw/ that is
// NOT part of any product in data/prices.json — the "only at one
// store" items the app shows in SEARCH results only, under "Ainult
// ühes poes" (the owner's call, 2026-09-27). Category browsing stays
// comparisons only. Never contacts a store; reads data/raw/ and
// data/prices.json. Run by `npm run review`, and at the end of
// fetch-price.js and daily-update.js so the file follows the data.
//
// A listing here is simply one the matcher found no partner for: most
// are genuinely sold at one store, some are the same product another
// store describes too differently to pair — either way the shopper
// sees the store's own name, price and link, never a comparison.
// Alcohol listings carry their category so the app can hide them with
// SHOW_ALCOHOL. No image URL (keeps the file small; the store's page
// is one tap away).

const fs = require("fs");
const path = require("path");
const { loadRaw, loadRawPool } = require("./raw");
const { CATEGORIES } = require("./categories");
const { withCurrentSettings, toStoreEntry } = require("./scrape-output");

const PRICES_PATH = path.join(__dirname, "..", "data", "prices.json");
const SINGLES_PATH = path.join(__dirname, "..", "data", "singles.json");

// Pure: the singles list for one category's prepared pool.
function singlesFor(categoryName, pool, matchedUrls) {
  const out = [];
  const seen = new Set();
  for (const item of pool) {
    if (matchedUrls.has(item.url) || seen.has(item.url)) continue;
    seen.add(item.url);
    const entry = toStoreEntry(item);
    const single = { store: item.store.toLowerCase(), category: categoryName, name: item.name, price: entry.price, currency: entry.currency, url: entry.url };
    if (entry.size) single.size = entry.size;
    if (entry.storeUnitPrice != null) single.storeUnitPrice = entry.storeUnitPrice;
    if (entry.regularPrice != null) single.regularPrice = entry.regularPrice;
    if (entry.cardPrice != null) {
      single.cardPrice = entry.cardPrice;
      single.cardName = entry.cardName;
    }
    out.push(single);
  }
  return out;
}

function buildSingles({ pricesPath = PRICES_PATH, singlesPath = SINGLES_PATH, rawOptions } = {}) {
  const prices = fs.existsSync(pricesPath) ? JSON.parse(fs.readFileSync(pricesPath, "utf8")) : [];
  const matchedUrls = new Set(prices.flatMap((p) => Object.values(p.prices).map((e) => e.url)));
  const known = new Set(loadRaw(rawOptions).map((c) => c.category));
  const singles = [];
  const seenUrls = new Set();
  for (const category of CATEGORIES) {
    if (!known.has(category.name)) continue;
    const pool = withCurrentSettings(loadRawPool(category.name, rawOptions), category);
    for (const single of singlesFor(category.name, pool, matchedUrls)) {
      if (seenUrls.has(single.url)) continue; // the same listing scraped into two categories
      seenUrls.add(single.url);
      singles.push(single);
    }
  }
  fs.writeFileSync(singlesPath, JSON.stringify(singles) + "\n");
  return singles;
}

if (require.main === module) {
  const singles = buildSingles();
  const byStore = {};
  for (const s of singles) byStore[s.store] = (byStore[s.store] || 0) + 1;
  console.log(`Wrote ${singles.length} single-store listings to data/singles.json`, byStore);
}

module.exports = { buildSingles, singlesFor };
