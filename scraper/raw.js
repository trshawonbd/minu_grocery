// Reads and writes data/raw/: every item exactly as the stores returned
// it, one file per store per category, plus a small meta.json per
// category. Layout:
//
//   data/raw/<category-slug>/<store>.json   array of scraped items
//   data/raw/<category-slug>/meta.json      { category, order, strictPackaging, fetchedAt }
//
// This is the single source for anything that needs the scraped items
// after a run — reports, review.md, matching experiments. Those must
// read from here and never scrape again: only scraper/fetch-price.js
// and scraper/daily-update.js may contact the stores (see
// scraper/no-scrape.test.js), and they're the only callers of
// writeRaw. Files are overwritten each run, a category (and for
// daily-update.js, a store within it) at a time — a single-category
// run leaves the others alone, and a store daily-update.js judged
// unsafe to apply this run leaves that store's own file alone too.

const fs = require("fs");
const path = require("path");
const { computeSignature } = require("./match-products");

const RAW_DIR = path.join(__dirname, "..", "data", "raw");

// "Fruits & vegetables" -> "fruits-and-vegetables"
function slug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n");
}

// resultsByStore: { Barbora: [...], Rimi: [...], Selver: [...] } —
// the arrays exactly as the store modules returned them, so call this
// before anything (signatures, strictPackaging) is added to the items.
function writeRaw(category, { order, strictPackaging, matchAcrossWeights, diaperMatching, fixedWeightMustMatch = false, alcoholMatching = false, impliedDescriptors = [], resultsByStore }, { dir = RAW_DIR, fetchedAt = new Date().toISOString() } = {}) {
  const categoryDir = path.join(dir, slug(category));
  fs.mkdirSync(categoryDir, { recursive: true });
  for (const [store, items] of Object.entries(resultsByStore)) {
    writeJson(path.join(categoryDir, `${store.toLowerCase()}.json`), items);
  }
  writeJson(path.join(categoryDir, "meta.json"), { category, order, strictPackaging, matchAcrossWeights, diaperMatching, fixedWeightMustMatch, alcoholMatching, impliedDescriptors, fetchedAt });
}

// Every category in data/raw/, in the order fetch-price.js lists them:
// [{ category, order, strictPackaging, fetchedAt, stores: { Barbora: [...], ... } }]
function loadRaw({ dir = RAW_DIR } = {}) {
  if (!fs.existsSync(dir)) return [];

  const categories = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const categoryDir = path.join(dir, entry.name);
    const metaPath = path.join(categoryDir, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    const stores = {};
    for (const file of fs.readdirSync(categoryDir)) {
      if (file === "meta.json" || !file.endsWith(".json")) continue;
      const items = JSON.parse(fs.readFileSync(path.join(categoryDir, file), "utf8"));
      const store = items.length > 0 ? items[0].store : file.replace(/\.json$/, "");
      stores[store] = items;
    }
    categories.push({ ...meta, stores });
  }
  return categories.sort((a, b) => a.order - b.order);
}

// One category's items as a single flat pool, prepared exactly the
// way fetch-price.js prepares it before matchPool — strictPackaging
// and matchAcrossWeights set from the category's own settings,
// signature computed once — so a matching experiment on this pool
// behaves like a real run, without touching the network.
function loadRawPool(category, options) {
  const found = loadRaw(options).find((c) => c.category === category);
  if (!found) {
    throw new Error(`No raw data for "${category}" in data/raw/ — run fetch-price.js once to create it.`);
  }
  const pool = Object.values(found.stores).flat();
  for (const item of pool) {
    if (found.strictPackaging) item.strictPackaging = true;
    if (found.matchAcrossWeights) item.matchAcrossWeights = true;
    if (found.diaperMatching) item.diaperMatching = true;
    if (found.fixedWeightMustMatch) item.fixedWeightMustMatch = true;
    if (found.alcoholMatching) item.alcoholMatching = true;
    if (Array.isArray(found.impliedDescriptors) && found.impliedDescriptors.length > 0) {
      item.impliedDescriptors = found.impliedDescriptors;
    }
    item.signature = computeSignature(item);
  }
  return pool;
}

module.exports = { RAW_DIR, slug, writeRaw, loadRaw, loadRawPool };
