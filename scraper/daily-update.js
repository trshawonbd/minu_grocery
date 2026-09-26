// Runs unattended, on a schedule, without Claude Code — see
// scripts/install-daily-update.sh for the launchd job that invokes
// this. Refreshes every category's prices from a live scrape, but
// unlike scraper/fetch-price.js it never creates, merges, or reassigns
// a product: an existing data/prices.json product's price is only
// ever updated by matching its stored URL to a fresh item, one store
// at a time. Anything the matcher finds among items NOT already tied
// to an existing product goes to data/pending.json for a person to
// review with Claude Code later — never into data/prices.json
// automatically. See scraper/daily-update-logic.js for the pure rules
// this follows (safety checks, price/unavailable/hidden updates,
// pending-pool selection); this file is the network/file/git glue
// around it.
//
// Writes:
// - data/raw/<category>/<store>.json — only for a store that was
//   safely refreshed this run (see checkStoreSafety); a failed or
//   unsafe store's raw file, and every product price/availability
//   entry that depends on it, is left exactly as it was.
// - data/prices.json — existing products' prices/availability/hidden
//   updated in place; never a new product.
// - data/pending.json — brand-new candidate matches, overwritten fresh
//   every run (never merged into prices.json by this script).
// - data/alerts.json — today's safety-check failures, overwritten
//   fresh every run (empty array when there are none).
// - data/price-history.json — one [date, price] entry per store URL
//   PER CHANGE (never a full daily snapshot, since 2026-09-28 — the
//   owner's storage-size decision; see scraper/price-history.js for
//   the compact format and the priceOnDate/lowestPriceInWindow
//   readers a future "real discount" check would use).
// - data/logs/YYYY-MM-DD.txt — a short plain-text summary of the run.
// - data/last-update.json — { updatedAt } for the frontend's
//   "Updated: ..." banner and staleness warning.
// Then commits every changed file under data/ with the message
// "Daily update YYYY-MM-DD" — the one file in this project that
// commits on its own, since the whole point is running without a
// person watching — and pushes it to the GitHub remote (best-effort:
// a failed push is logged and the commit stays local until the next
// push; never a force-push — see gitPush()).
//
// LAST, after that grocery commit/push are already done: runs
// outlets/scraper/daily-update.js as its own step (see
// runOutletsStep()) — a completely separate section of the project
// (malls and brand discounts, see CLAUDE.md's "Outlets" section).
// Any failure there (a crash, a bad exit code) is caught and logged,
// never fatal to this script and never able to change anything the
// grocery run already did.
//
// Before any of that: skips the entire run, untouched, if the repo
// has uncommitted changes or data/.work-in-progress exists — see
// repoSafetyCheck() and checkRepoSafety() in daily-update-logic.js.
// To pause the automatic run while working on something you don't
// want committed yet, create an empty data/.work-in-progress file and
// delete it when done.
//
// Run with: node scraper/daily-update.js

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { fetchBarboraPrice } = require("./stores/barbora");
const { fetchRimiPrice } = require("./stores/rimi");
const { fetchSelverPrice } = require("./stores/selver");
const { fetchCoopPrice } = require("./stores/coop");
const { CATEGORIES } = require("./categories");
const { matchPool } = require("./match-products");
const { loadRaw, writeRaw } = require("./raw");
const { buildSingles } = require("./build-singles");
const { fetchAllUrls, prepareItem, inferBrands, toPricesObject } = require("./scrape-output");
const { checkRepoSafety, checkStoreSafety, updateProductPrices, updateHidden, findLeftoverPool } = require("./daily-update-logic");
const { recordPrices } = require("./price-history");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PRICES_PATH = path.join(DATA_DIR, "prices.json");
const PRODUCTS_PATH = path.join(DATA_DIR, "products.json");
const KNOWN_DIFFERENT_PATH = path.join(DATA_DIR, "known-different.json");
const PENDING_PATH = path.join(DATA_DIR, "pending.json");
const ALERTS_PATH = path.join(DATA_DIR, "alerts.json");
const PRICE_HISTORY_PATH = path.join(DATA_DIR, "price-history.json");
const LOGS_DIR = path.join(DATA_DIR, "logs");
const LAST_UPDATE_PATH = path.join(DATA_DIR, "last-update.json");
const WORK_IN_PROGRESS_PATH = path.join(DATA_DIR, ".work-in-progress");

function loadJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// Runs one store's fetch for a category, never throwing — a failed
// store must never abort the other two, or the other categories.
async function fetchStore(fetchThunk) {
  try {
    const items = await fetchThunk();
    return { ok: true, items };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function updateCategory(category, prices, overrides, knownDifferent, log, alerts, pendingEntries) {
  log.push(`== ${category.name} ==`);

  // Selver has its own internal 1-req/sec throttle (see
  // stores/selver.js) independent of Barbora/Rimi's pagination, so
  // fetching all three in parallel here doesn't affect its pacing —
  // each store's requests are still sequential within themselves. A
  // failed store is caught per-store, not per-category, so e.g. a
  // Rimi outage never blocks Barbora/Selver from updating.
  const [barbora, rimi, selver, coop] = await Promise.all([
    fetchStore(() => fetchAllUrls(fetchBarboraPrice, category.urls.barbora, "page")),
    fetchStore(() => fetchAllUrls(fetchRimiPrice, category.urls.rimi, "currentPage")),
    fetchStore(() => fetchSelverPrice(category.name)),
    // Coop (Haapsalu) — its own 1 req/s throttle, see stores/coop.js.
    fetchStore(() => fetchCoopPrice(category.name)),
  ]);
  const fetched = { Barbora: barbora, Rimi: rimi, Selver: selver, Coop: coop };

  const previousRaw = loadRaw().find((c) => c.category === category.name);
  const previousByStore = previousRaw ? previousRaw.stores : {};

  // freshByStore (lowercased keys, matching data/prices.json's own
  // store keys) only ever contains a store that (a) fetched
  // successfully and (b) passed both safety checks — every other
  // store is simply absent, which is what tells
  // updateProductPrices/findLeftoverPool to leave it untouched.
  const freshByStore = {};
  const rawToWrite = {};

  // Coop states no brand — take it from what the other stores state in
  // this category (fresh where fetched, else yesterday's raw), the
  // same step fetch-price.js runs before signatures.
  inferBrands([
    ...Object.values(fetched).flatMap((r) => (r.ok ? r.items : [])),
    ...Object.entries(previousByStore).filter(([store]) => !fetched[store] || !fetched[store].ok).flatMap(([, items]) => items),
  ]);

  for (const store of ["Barbora", "Rimi", "Selver", "Coop"]) {
    const result = fetched[store];
    if (!result.ok) {
      alerts.push({ category: category.name, store, reason: "fetch-failed", detail: result.error });
      log.push(`  ${store}: FAILED (${result.error}) — kept yesterday's data`);
      continue;
    }

    const freshItems = result.items;
    for (const item of freshItems) prepareItem(item, category);

    const safety = checkStoreSafety(previousByStore[store] || [], freshItems);
    if (!safety.safe) {
      alerts.push({ category: category.name, store, reason: safety.reason, detail: safety.detail });
      log.push(`  ${store}: SKIPPED (${safety.reason}: ${safety.detail}) — kept yesterday's data`);
      continue;
    }

    freshByStore[store.toLowerCase()] = freshItems;
    rawToWrite[store] = freshItems;
    log.push(`  ${store}: OK, ${freshItems.length} items`);
  }

  // Only overwrite raw data for stores that were actually safe this
  // run — writeRaw only touches the store keys it's given (see
  // scraper/raw.js), so a skipped store's data/raw/ file is left
  // exactly as it was, alongside the prices.json entries that depend
  // on it.
  if (Object.keys(rawToWrite).length > 0) {
    writeRaw(category.name, {
      order: CATEGORIES.indexOf(category),
      strictPackaging: category.strictPackaging !== false,
      matchAcrossWeights: category.matchAcrossWeights === true,
      diaperMatching: category.diaperMatching === true,
      fixedWeightMustMatch: category.fixedWeightMustMatch === true,
      alcoholMatching: category.alcoholMatching === true,
      pieceCountSizes: category.pieceCountSizes === true,
      impliedDescriptors: category.impliedDescriptors || [],
      resultsByStore: rawToWrite,
    });
  }

  // Update existing products in this category only — matched to a
  // fresh item by URL alone, never created/merged/reassigned. Price,
  // availability AND the store's photo URL (kept when a fresh item
  // has none — see mergeStoreEntry in daily-update-logic.js).
  let priceUpdates = 0;
  let priceChanges = 0;
  let newlyUnavailable = 0;
  let reactivated = 0;
  let newlyHidden = 0;
  let imagesFilled = 0;
  const categoryProducts = prices.filter((p) => p.category === category.name);
  for (const product of categoryProducts) {
    const wasHidden = product.hidden === true;
    const before = Object.fromEntries(Object.entries(product.prices).map(([s, e]) => [s, e.price]));
    const counts = updateProductPrices(product, freshByStore);
    priceUpdates += counts.priceUpdates;
    newlyUnavailable += counts.newlyUnavailable;
    reactivated += counts.reactivated;
    imagesFilled += counts.imagesFilled;
    for (const [s, e] of Object.entries(product.prices)) if (before[s] !== undefined && e.price !== before[s]) priceChanges++;
    const isHidden = updateHidden(product);
    if (isHidden && !wasHidden) newlyHidden++;
  }
  totals.priceUpdates += priceUpdates;
  totals.priceChanges += priceChanges;
  totals.newlyUnavailable += newlyUnavailable;
  totals.reactivated += reactivated;
  totals.newlyHidden += newlyHidden;
  totals.imagesFilled += imagesFilled;
  if (Object.keys(freshByStore).length > 0) totals.categoriesUpdated++;

  // New candidate matches among items not already tied to an existing
  // product — written to data/pending.json only, see main().
  const leftoverPool = findLeftoverPool(categoryProducts, freshByStore);
  if (leftoverPool.length > 0) {
    const { matches } = matchPool(leftoverPool, overrides, knownDifferent);
    for (const m of matches) {
      pendingEntries.push({
        category: category.name,
        canonicalName: m.canonicalName,
        reason: m.reason,
        items: m.items.map((item) => ({ store: item.store, name: item.name, price: item.price, url: item.url })),
      });
    }
  }

  log.push(
    `  -> ${priceUpdates} entries refreshed (${priceChanges} prices changed), ${newlyUnavailable} newly unavailable, ${reactivated} reactivated, ${newlyHidden} newly hidden, ${imagesFilled} images filled in`
  );
}

// How many products carry at least one store photo, and how many store
// entries do — for the run's log (the owner's question after images
// were added: "how many products now have an image").
function imageCounts(prices) {
  let products = 0;
  let entries = 0;
  let entriesWithImage = 0;
  for (const product of prices) {
    const list = Object.values(product.prices);
    entries += list.length;
    const withImage = list.filter((e) => e.image).length;
    entriesWithImage += withImage;
    if (withImage > 0) products++;
  }
  return { products, total: prices.length, entries, entriesWithImage };
}

// The run's own plain-text log, data/logs/YYYY-MM-DD.txt — written on
// EVERY invocation, a skipped one included (the owner's rule: a
// skipped run must always say why). Appended, so a skip at 06:00 and
// a by-hand run later the same day both stay on record. The repo
// safety check ignores this one path (see checkRepoSafety), which is
// what makes writing it while the repo is "dirty" safe.
function appendLog(lines) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  const file = path.join(LOGS_DIR, `${today()}.txt`);
  const prefix = fs.existsSync(file) && fs.statSync(file).size > 0 ? "\n" : "";
  fs.appendFileSync(file, prefix + lines.join("\n") + "\n");
}

// Commits everything under data/ — called AFTER the day's log file is
// written (see main()), specifically so the log itself is included in
// the commit instead of being left behind, uncommitted, every single
// run. Its own outcome is only ever logged to the console, never back
// into the log file — by the time this runs, that file's content is
// already decided.
function gitCommit() {
  const status = execFileSync("git", ["status", "--porcelain", "--", "data/"], { cwd: ROOT, encoding: "utf8" });
  if (!status.trim()) {
    console.log("No data changes — nothing to commit.");
    return;
  }
  execFileSync("git", ["add", "--", "data/"], { cwd: ROOT });
  execFileSync("git", ["commit", "-m", `Daily update ${today()}`], { cwd: ROOT });
  console.log(`Committed: "Daily update ${today()}"`);
}

// Pushes the commit to the GitHub remote. Deliberately best-effort:
// this runs unattended at 06:00, and a push can fail for reasons
// nobody is around to fix (no internet, GitHub down, or `main` moved
// on the remote because someone pushed from another clone). Any of
// those is logged and the run still counts as done — the commit is
// safe locally and the next `git pull`/push by a person or by
// tomorrow's run picks it up. NEVER force-pushes: a plain `git push`
// is rejected on divergence rather than overwriting anyone's work,
// which is exactly the behaviour wanted here.
function gitPush() {
  try {
    execFileSync("git", ["push", "origin", "HEAD"], { cwd: ROOT, stdio: "pipe", timeout: 120000 });
    console.log("Pushed to origin.");
  } catch (err) {
    const detail = (err.stderr && err.stderr.toString().trim()) || err.message;
    console.log(`Push failed (commit kept locally, will retry next run): ${detail}`);
  }
}

// Checked first thing in main(), before any store is even fetched —
// see checkRepoSafety in daily-update-logic.js for why. When unsafe,
// the ONLY thing written is the day's log line under data/logs/
// (which the check itself ignores, so it can't cause tomorrow's run
// to skip too); the repo is otherwise left exactly as a person left
// it. Console output also reaches ~/Library/Logs/minu/daily-update.*.log
// via launchd's own StandardOutPath (see install-daily-update.sh).
function repoSafetyCheck() {
  const gitStatusOutput = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" });
  const workInProgressExists = fs.existsSync(WORK_IN_PROGRESS_PATH);
  return checkRepoSafety(gitStatusOutput, workInProgressExists);
}

// Per-run totals for the log's summary lines (filled by updateCategory).
const totals = { categoriesUpdated: 0, priceUpdates: 0, priceChanges: 0, newlyUnavailable: 0, reactivated: 0, newlyHidden: 0, imagesFilled: 0 };

async function main() {
  const startedAt = new Date().toISOString();
  const safety = repoSafetyCheck();
  if (!safety.safe) {
    const line = `Daily update — ${startedAt}: SKIPPED — ${safety.reason} (${safety.detail}). Nothing fetched, nothing changed.`;
    console.log(line);
    appendLog([line]);
    return;
  }

  const prices = loadJson(PRICES_PATH, []);
  const overrides = loadJson(PRODUCTS_PATH, []);
  const knownDifferent = loadJson(KNOWN_DIFFERENT_PATH, []);

  // A "started" line first, so a run that dies half-way (power, a
  // crash) still leaves a trace in the repo's own log; the finished
  // run's full summary is appended below.
  appendLog([`Daily update — ${startedAt}: STARTED (${CATEGORIES.length} categories, every store)`]);

  const log = [`Daily update — ${startedAt}`, ""];
  const alerts = [];
  const pendingEntries = [];

  // Every category in scraper/categories.js — never a fixed list here,
  // so a category added there is updated from its first morning on.
  for (const category of CATEGORIES) {
    await updateCategory(category, prices, overrides, knownDifferent, log, alerts, pendingEntries);
  }

  writeJson(PRICES_PATH, prices);
  // data/singles.json follows the refreshed raw data and prices — see build-singles.js.
  buildSingles();
  writeJson(PENDING_PATH, pendingEntries);
  writeJson(ALERTS_PATH, alerts);

  // One [date, price] entry per store URL whose CURRENT price
  // (whether refreshed today or carried over unchanged) differs from
  // its last recorded one — see scraper/price-history.js. Every store
  // entry currently in data/prices.json is fed in, refreshed or not:
  // an unchanged price is always a no-op for recordPrices, so this is
  // safe and simpler than tracking which URLs this run touched.
  const todayStr = today();
  const freshPricesByUrl = {};
  for (const product of prices) for (const entry of Object.values(product.prices)) freshPricesByUrl[entry.url] = entry.price;
  const previousHistory = loadJson(PRICE_HISTORY_PATH, {});
  const { history: nextHistory, changed: priceHistoryChanges } = recordPrices(previousHistory, todayStr, freshPricesByUrl);
  writeJson(PRICE_HISTORY_PATH, nextHistory);

  writeJson(LAST_UPDATE_PATH, { updatedAt: new Date().toISOString() });

  const images = imageCounts(prices);
  log.push("");
  log.push(`Categories: ${totals.categoriesUpdated} of ${CATEGORIES.length} updated from at least one store.`);
  log.push(`Prices: ${totals.priceUpdates} store entries refreshed, ${totals.priceChanges} prices changed, ${totals.newlyUnavailable} newly unavailable, ${totals.reactivated} reactivated, ${totals.newlyHidden} newly hidden.`);
  log.push(`Price history: ${priceHistoryChanges} URLs got a new recorded price today (data/price-history.json).`);
  log.push(`Images: ${totals.imagesFilled} filled in this run; ${images.products} of ${images.total} products now have a store photo (${images.entriesWithImage} of ${images.entries} store entries).`);
  log.push(`Total: ${pendingEntries.length} pending candidate(s), ${alerts.length} alert(s).`);
  if (alerts.length > 0) {
    log.push("Alerts:");
    for (const a of alerts) log.push(`  [${a.category}] ${a.store}: ${a.reason} — ${a.detail}`);
  }
  log.push(`Finished — ${new Date().toISOString()}`);

  // Written before the commit so the log itself is included in it —
  // real bug found by hand testing this: writing it after left every
  // day's log file uncommitted and untracked, forever.
  appendLog(log);

  console.log(log.join("\n"));
  gitCommit();
  // Always attempted, even on a day with nothing new to commit — a
  // push that failed on an earlier run leaves that commit unpushed
  // locally, and this is what gets it out the next morning. When
  // everything is already on the remote it's a harmless no-op.
  gitPush();

  // Outlets (2026-09-28) run as their own step, strictly AFTER the
  // grocery commit/push above have already happened — so nothing an
  // outlets scraper does (a crash, a bad exit code, its own file
  // writes) can ever stop or change the grocery update; by the time
  // this runs, that update is already finished and irreversible.
  runOutletsStep();
}

// Runs outlets/scraper/daily-update.js as its own child process and
// swallows anything it does — a non-zero exit, a thrown error, output
// on stderr — logging it but never rethrowing, never touching the
// exit code of THIS process. See outlets/README.md and CLAUDE.md's
// "Outlets" section for what that script does (a stub today).
function runOutletsStep() {
  try {
    const output = execFileSync("node", ["outlets/scraper/daily-update.js"], { cwd: ROOT, encoding: "utf8", timeout: 120000 });
    console.log(output.trim());
    appendLog([output.trim()]);
  } catch (err) {
    const detail = (err.stdout && err.stdout.toString().trim()) || (err.stderr && err.stderr.toString().trim()) || err.message;
    console.log(`Outlets step failed (grocery update is unaffected — it already finished): ${detail}`);
    appendLog([`Outlets step failed (grocery update is unaffected — it already finished): ${detail}`]);
  }
}

main().catch((err) => {
  console.error("Daily update failed:", err.stack || err.message);
  // The failure goes into the repo's own log too, so a person reading
  // data/logs/ sees why a morning has no "Finished" line.
  try {
    appendLog([`Daily update — ${new Date().toISOString()}: FAILED — ${err.stack || err.message}`]);
  } catch (logErr) {
    console.error("Could not write the log file:", logErr.message);
  }
  process.exit(1);
});
