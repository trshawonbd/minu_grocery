// Rewrites one or more categories' blocks of data/prices.json from
// data/raw/ alone — the exact pipeline fetch-price.js runs after a
// scrape (loadRawPool → matchPool → toProductEntry), with no network:
// this file never contacts a store (see scraper/no-scrape.test.js).
//
// For when a matching or naming rule changed and the already-scraped
// items just need to be re-interpreted — a wrong display name, a
// rule the owner decided — without a fresh live scrape. Prices stay
// exactly what the last scrape recorded in data/raw/; only the
// matches, names and data/ean-conflicts.json are recomputed (merged
// by category, same as data/prices.json). Every other category's
// entries are kept byte-for-byte, in their original order, the same
// way fetch-price.js keeps the categories it wasn't asked for — and a
// pre-existing product this run can't re-match (its raw listing
// drifted since the last scrape, e.g. from a daily-update run in
// between) is carried over unchanged rather than dropped.
//
// Usage: node scraper/rebuild-prices.js "Diapers & baby wipes" "Chocolate"

const fs = require("fs");
const path = require("path");
const { loadRawPool } = require("./raw");
const { CATEGORIES } = require("./categories");
const { matchPool } = require("./match-products");
// The raw pool carries the settings recorded at scrape time; the
// current ones in scraper/categories.js win (withCurrentSettings in
// scrape-output.js) — found in batch 9, when a stale implied word in
// meta.json silently kept old display names.
const { withCurrentSettings, toProductEntry, uniqueCanonicalNames, carryOverImages, toLeftoverEntry } = require("./scrape-output");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const KNOWN_DIFFERENT_PATH = path.join(__dirname, "..", "data", "known-different.json");
const OUTPUT_PATH = path.join(__dirname, "..", "data", "prices.json");
const EAN_CONFLICTS_PATH = path.join(__dirname, "..", "data", "ean-conflicts.json");

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
  // data/ean-conflicts.json merges by category exactly like
  // data/prices.json does — a category this run doesn't touch keeps
  // its existing conflict entries untouched. Real gap found
  // 2026-09-28: this file used to be written only by fetch-price.js
  // (a live scrape), so a rebuild silently left it stale — a
  // conflict this run actually resolved stayed listed as unresolved.
  const existingConflicts = fs.existsSync(EAN_CONFLICTS_PATH) ? loadJson(EAN_CONFLICTS_PATH) : [];
  const untouchedConflicts = existingConflicts.filter((c) => !categories.some((cat) => cat.name === c.category));

  const freshEntries = [];
  const freshConflicts = [];
  for (const category of categories) {
    const existingHere = existing.filter((p) => p.category === category.name);
    const before = existingHere.length;
    const { matches, unmatched, ambiguous, eanConflicts } = matchPool(withCurrentSettings(loadRawPool(category.name), category), overrides, knownDifferent);
    for (const match of uniqueCanonicalNames(matches)) freshEntries.push(toProductEntry(category, match));
    for (const { a, b } of eanConflicts) {
      freshConflicts.push({ category: category.name, a: { ...toLeftoverEntry(a), ean: a.signature.ean, url: a.url }, b: { ...toLeftoverEntry(b), ean: b.signature.ean, url: b.url } });
    }

    // A pre-existing (reviewed) product this rebuild can't keep — its
    // items are gone from data/raw/ by the time this runs, most often
    // because something else (a live scrape, the daily update)
    // refreshed that category's raw/ files in between — is carried
    // over exactly as it was, the same safety net fetch-price.js's
    // --only-store mode already has. Real data loss found 2026-09-28:
    // rebuilding straight after a daily-update run (which refreshes
    // EVERY category's raw/, not just the three it prices daily)
    // silently dropped 27 already-reviewed products whose raw listing
    // text had since drifted just enough to stop matching by name —
    // unrelated to whatever rule the rebuild was actually for.
    const keptUrls = new Set(matches.flatMap((m) => m.items.map((it) => it.url)));
    const carriedOver = existingHere.filter((p) => !Object.values(p.prices).some((e) => keptUrls.has(e.url)));
    freshEntries.push(...carriedOver);

    console.log(
      `${category.name}: ${before} -> ${matches.length} matches (${unmatched.length} unmatched, ${ambiguous.length} ambiguous) — rebuilt from data/raw/, no scrape`
    );
    if (carriedOver.length) console.log(`  (${carriedOver.length} pre-existing ${category.name} products carried over unchanged: ${carriedOver.map((p) => p.name).join("; ")})`);
  }

  // Raw data older than image capture carries no photo URLs — keep the
  // ones the previous entries (filled by the daily update) already had.
  const imagesKept = carryOverImages(freshEntries, existing);
  if (imagesKept) console.log(`${imagesKept} store photo URLs carried over from the previous data/prices.json.`);
  const prices = [...untouched, ...freshEntries];
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prices, null, 2) + "\n");
  const conflicts = [...untouchedConflicts, ...freshConflicts];
  fs.writeFileSync(EAN_CONFLICTS_PATH, JSON.stringify(conflicts, null, 2) + "\n");
  console.log(`Wrote ${prices.length} products to data/prices.json (${untouched.length} untouched, ${freshEntries.length} rebuilt).`);
  console.log(`Wrote ${conflicts.length} EAN conflicts to data/ean-conflicts.json (${untouchedConflicts.length} untouched, ${freshConflicts.length} from this run). Run \`npm run review\` next.`);
}

main();
