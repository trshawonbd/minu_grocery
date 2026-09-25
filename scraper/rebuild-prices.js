// Rewrites one or more categories' blocks of data/prices.json from
// data/raw/ alone — the exact pipeline fetch-price.js runs after a
// scrape (loadRawPool → matchPool → toProductEntry), with no network:
// this file never contacts a store (see scraper/no-scrape.test.js).
//
// For when a matching or naming rule changed and the already-scraped
// items just need to be re-interpreted — a wrong display name, a
// rule the owner decided — without a fresh live scrape. Prices stay
// exactly what the last scrape recorded in data/raw/; only the
// matches and names are recomputed. Every other category's entries
// are kept byte-for-byte, in their original order, the same way
// fetch-price.js keeps the categories it wasn't asked for.
//
// Usage: node scraper/rebuild-prices.js "Diapers & baby wipes" "Chocolate"

const fs = require("fs");
const path = require("path");
const { loadRawPool } = require("./raw");
const { CATEGORIES } = require("./categories");
const { matchPool } = require("./match-products");
const { toProductEntry, uniqueCanonicalNames } = require("./scrape-output");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const KNOWN_DIFFERENT_PATH = path.join(__dirname, "..", "data", "known-different.json");
const OUTPUT_PATH = path.join(__dirname, "..", "data", "prices.json");

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function main() {
  const requested = process.argv.slice(2);
  if (requested.length === 0) {
    throw new Error(`Name at least one category. Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
  }
  const categories = requested.map((name) => {
    const category = CATEGORIES.find((c) => c.name === name);
    if (!category) throw new Error(`Unknown category "${name}". Known categories: ${CATEGORIES.map((c) => c.name).join(", ")}`);
    return category;
  });

  const overrides = loadJson(PRODUCTS_PATH);
  const knownDifferent = loadJson(KNOWN_DIFFERENT_PATH);
  const existing = loadJson(OUTPUT_PATH);
  const untouched = existing.filter((p) => !categories.some((c) => c.name === p.category));

  const freshEntries = [];
  for (const category of categories) {
    const before = existing.filter((p) => p.category === category.name).length;
    const { matches, unmatched, ambiguous } = matchPool(loadRawPool(category.name), overrides, knownDifferent);
    for (const match of uniqueCanonicalNames(matches)) freshEntries.push(toProductEntry(category, match));
    console.log(`${category.name}: ${before} -> ${matches.length} matches (${unmatched.length} unmatched, ${ambiguous.length} ambiguous) — rebuilt from data/raw/, no scrape`);
  }

  const prices = [...untouched, ...freshEntries];
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prices, null, 2) + "\n");
  console.log(`Wrote ${prices.length} products to data/prices.json (${untouched.length} untouched, ${freshEntries.length} rebuilt). Run \`npm run review\` next.`);
}

main();
