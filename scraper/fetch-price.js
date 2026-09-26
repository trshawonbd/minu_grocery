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
const { fetchCoopPrice } = require("./stores/coop");
const { matchPool } = require("./match-products");
const { writeRaw, loadRaw } = require("./raw");
const { buildSingles } = require("./build-singles");
const { CATEGORIES } = require("./categories");
const { fetchAllUrls, prepareItem, inferBrands, isUnclassified, toLeftoverEntry, toProductEntry, uniqueCanonicalNames, carryOverImages } = require("./scrape-output");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const KNOWN_DIFFERENT_PATH = path.join(__dirname, "..", "data", "known-different.json");
const OUTPUT_PATH = path.join(__dirname, "..", "data", "prices.json");
const UNMATCHED_PATH = path.join(__dirname, "..", "data", "unmatched.json");
const UNCLASSIFIED_PATH = path.join(__dirname, "..", "data", "unclassified.json");
const AMBIGUOUS_PATH = path.join(__dirname, "..", "data", "ambiguous.json");
const EAN_CONFLICTS_PATH = path.join(__dirname, "..", "data", "ean-conflicts.json");

// Categories the daily update keeps current in data/raw/ — a fresh
// group in a --only-store run that has no item of that store and no
// pre-existing product is exactly what the daily update leaves for a
// person in data/pending.json, so it is left alone here too.
const DAILY_UPDATED = ["Fruits & vegetables", "Bread", "Drinks"];

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

async function main() {
  const args = process.argv.slice(2);
  // --only-store=Coop: fetch ONE store live and take the others from
  // data/raw/ (what the last scrape / daily update recorded), then pool
  // as usual — for adding a store without re-scraping everything.
  const onlyStore = (args.find((a) => a.startsWith("--only-store=")) || "").split("=")[1] || null;
  // --from-raw (with --only-store): take that store from data/raw/ too,
  // no network at all — re-pool after a matching-rule change.
  const fromRaw = args.includes("--from-raw");
  const requestedName = args.find((a) => !a.startsWith("--"));
  const categories = requestedName ? CATEGORIES.filter((c) => c.name === requestedName) : CATEGORIES;
  const fetchers = {
    Barbora: (category) => fetchAllUrls(fetchBarboraPrice, category.urls.barbora, "page"),
    Rimi: (category) => fetchAllUrls(fetchRimiPrice, category.urls.rimi, "currentPage"),
    Selver: (category) => fetchSelverPrice(category.name),
    Coop: (category) => fetchCoopPrice(category.name),
  };
  if (onlyStore && !fetchers[onlyStore]) throw new Error(`Unknown store "${onlyStore}". Known: ${Object.keys(fetchers).join(", ")}`);
  const rawByCategory = onlyStore ? new Map(loadRaw().map((c) => [c.category, c.stores])) : new Map();

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
  const eanConflictEntries = [];

  for (const category of categories) {
    // Selver and Coop have their own internal 1-req/sec throttles (see
    // stores/selver.js, stores/coop.js) independent of Barbora/Rimi's
    // pagination, so fetching the stores in parallel here doesn't
    // affect their pacing — each store's requests are still
    // sequential within themselves.
    let resultsByStore;
    if (onlyStore) {
      const previous = rawByCategory.get(category.name) || {};
      resultsByStore = { Barbora: previous.Barbora || [], Rimi: previous.Rimi || [], Selver: previous.Selver || [], Coop: previous.Coop || [] };
      if (!fromRaw) resultsByStore[onlyStore] = await fetchers[onlyStore](category);
    } else {
      const [barboraResults, rimiResults, selverResults, coopResults] = await Promise.all(Object.values(fetchers).map((f) => f(category)));
      resultsByStore = { Barbora: barboraResults, Rimi: rimiResults, Selver: selverResults, Coop: coopResults };
    }
    const { Barbora: barboraResults, Rimi: rimiResults, Selver: selverResults, Coop: coopResults } = resultsByStore;

    // Saved exactly as the stores returned it, before signatures or
    // strictPackaging are added — the single source anything else
    // (review.md, matching experiments) should read from instead of
    // scraping again. See scraper/raw.js and scraper/no-scrape.test.js.
    // In --only-store mode only that store's file is (re)written.
    writeRaw(category.name, {
      order: CATEGORIES.indexOf(category),
      strictPackaging: category.strictPackaging !== false,
      matchAcrossWeights: category.matchAcrossWeights === true,
      diaperMatching: category.diaperMatching === true,
      fixedWeightMustMatch: category.fixedWeightMustMatch === true,
      alcoholMatching: category.alcoholMatching === true,
      pieceCountSizes: category.pieceCountSizes === true,
      impliedDescriptors: category.impliedDescriptors || [],
      resultsByStore: onlyStore ? (fromRaw ? {} : { [onlyStore]: resultsByStore[onlyStore] }) : resultsByStore,
    });

    // Run every item through the extraction functions exactly once
    // here, instead of once per pair inside matchPool — with N
    // Barbora items and M Rimi items, that's N+M extraction passes
    // instead of up to N×M. prepareItem sets strictPackaging/
    // matchAcrossWeights from the category's own settings (default
    // true / opt-in false respectively — see scraper/categories.js)
    // before computing the signature.
    // One flat pool per category — every store's items together, not
    // a fixed "store A vs store B" pair. Brand-less items (Coop) take a
    // brand another store states in this pool (see inferBrands) before
    // signatures are computed.
    const pool = [...barboraResults, ...rimiResults, ...selverResults, ...coopResults];
    inferBrands(pool);
    for (const item of pool) prepareItem(item, category);
    let { matches, unmatched, ambiguous, eanConflicts } = matchPool(pool, overrides, knownDifferent);

    let carriedOver = [];
    if (onlyStore) {
      const existingHere = existing.filter((p) => p.category === category.name);
      if (DAILY_UPDATED.includes(category.name)) {
        const existingUrls = new Set(existingHere.flatMap((p) => Object.values(p.prices).map((e) => e.url)));
        const keep = matches.filter((m) => m.items.some((it) => it.store === onlyStore) || m.items.some((it) => existingUrls.has(it.url)));
        for (const m of matches) if (!keep.includes(m)) unmatched.push(...m.items);
        matches = keep;
      }
      // A pre-existing (reviewed) product the re-pool can't keep —
      // its items are gone from data/raw/ (the daily update marked
      // them unavailable), or the new store's wording bridged it into
      // an ambiguous cluster — is carried over exactly as it was; the
      // cluster stays in data/ambiguous.json for a person.
      const keptUrls = new Set(matches.flatMap((m) => m.items.map((it) => it.url)));
      carriedOver = existingHere.filter((p) => !Object.values(p.prices).some((e) => keptUrls.has(e.url)));
    }

    for (const { a, b } of eanConflicts) {
      eanConflictEntries.push({ category: category.name, a: { ...toLeftoverEntry(a), ean: a.signature.ean, url: a.url }, b: { ...toLeftoverEntry(b), ean: b.signature.ean, url: b.url } });
    }

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
        `${unmatched.length - unclassifiedCount} unmatched, ${unclassifiedCount} unclassified, ${ambiguous.length} ambiguous` +
        (coopResults.length ? `, ${coopResults.length} Coop items` : "") +
        (eanConflicts.length ? `, ${eanConflicts.length} EAN conflicts` : "")
    );

    for (const match of uniqueCanonicalNames(matches)) {
      freshEntries.push(toProductEntry(category, match));
    }
    freshEntries.push(...carriedOver);
    if (carriedOver.length) console.log(`  (${carriedOver.length} pre-existing ${category.name} products carried over unchanged: ${carriedOver.map((p) => p.name).join("; ")})`);
  }

  const prices = [...untouched, ...freshEntries];
  // A store photo the previous entries had and this run's items don't
  // (a --from-raw re-pool over raw data older than image capture) is
  // kept — see carryOverImages.
  const imagesKept = carryOverImages(freshEntries, existing);
  if (imagesKept) console.log(`  (${imagesKept} store photo URLs carried over from the previous data/prices.json)`);

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prices, null, 2) + "\n");
  fs.writeFileSync(UNMATCHED_PATH, JSON.stringify(unmatchedEntries, null, 2) + "\n");
  fs.writeFileSync(UNCLASSIFIED_PATH, JSON.stringify(unclassifiedEntries, null, 2) + "\n");
  fs.writeFileSync(AMBIGUOUS_PATH, JSON.stringify(ambiguousEntries, null, 2) + "\n");
  fs.writeFileSync(EAN_CONFLICTS_PATH, JSON.stringify(eanConflictEntries, null, 2) + "\n");

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
  // The app's "Ainult ühes poes" search section follows the data —
  // see build-singles.js (reads data/raw/ and the file just written).
  console.log(`Wrote ${buildSingles().length} single-store listings to data/singles.json.`);
}

main().catch((err) => {
  console.error("Scraper failed:", err.message);
  process.exit(1);
});
