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
// - data/history/YYYY-MM-DD.json — a full snapshot of data/prices.json
//   after this run, one file per day, kept forever (they're small).
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
const { CATEGORIES } = require("./categories");
const { matchPool } = require("./match-products");
const { loadRaw, writeRaw } = require("./raw");
const { fetchAllUrls, prepareItem, toPricesObject } = require("./scrape-output");
const { checkRepoSafety, checkStoreSafety, updateProductPrices, updateHidden, findLeftoverPool } = require("./daily-update-logic");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PRICES_PATH = path.join(DATA_DIR, "prices.json");
const PRODUCTS_PATH = path.join(DATA_DIR, "products.json");
const KNOWN_DIFFERENT_PATH = path.join(DATA_DIR, "known-different.json");
const PENDING_PATH = path.join(DATA_DIR, "pending.json");
const ALERTS_PATH = path.join(DATA_DIR, "alerts.json");
const HISTORY_DIR = path.join(DATA_DIR, "history");
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
  const [barbora, rimi, selver] = await Promise.all([
    fetchStore(() => fetchAllUrls(fetchBarboraPrice, category.urls.barbora, "page")),
    fetchStore(() => fetchAllUrls(fetchRimiPrice, category.urls.rimi, "currentPage")),
    fetchStore(() => fetchSelverPrice(category.name)),
  ]);
  const fetched = { Barbora: barbora, Rimi: rimi, Selver: selver };

  const previousRaw = loadRaw().find((c) => c.category === category.name);
  const previousByStore = previousRaw ? previousRaw.stores : {};

  // freshByStore (lowercased keys, matching data/prices.json's own
  // store keys) only ever contains a store that (a) fetched
  // successfully and (b) passed both safety checks — every other
  // store is simply absent, which is what tells
  // updateProductPrices/findLeftoverPool to leave it untouched.
  const freshByStore = {};
  const rawToWrite = {};

  for (const store of ["Barbora", "Rimi", "Selver"]) {
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
      resultsByStore: rawToWrite,
    });
  }

  // Update existing products in this category only — matched to a
  // fresh item by URL alone, never created/merged/reassigned.
  let priceUpdates = 0;
  let newlyUnavailable = 0;
  let reactivated = 0;
  let newlyHidden = 0;
  const categoryProducts = prices.filter((p) => p.category === category.name);
  for (const product of categoryProducts) {
    const wasHidden = product.hidden === true;
    const counts = updateProductPrices(product, freshByStore);
    priceUpdates += counts.priceUpdates;
    newlyUnavailable += counts.newlyUnavailable;
    reactivated += counts.reactivated;
    const isHidden = updateHidden(product);
    if (isHidden && !wasHidden) newlyHidden++;
  }

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
    `  -> ${priceUpdates} price updates, ${newlyUnavailable} newly unavailable, ${reactivated} reactivated, ${newlyHidden} newly hidden`
  );
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
// see checkRepoSafety in daily-update-logic.js for why. Deliberately
// writes nothing to disk when unsafe (not even a log file): the whole
// point is to leave the repo exactly as a person left it, and a log
// entry here would itself be a new uncommitted file, tripping this
// same check again on tomorrow's run and skipping forever. The
// console output still reaches ~/Library/Logs/minu/daily-update.*.log
// via launchd's own StandardOutPath (see install-daily-update.sh).
function repoSafetyCheck() {
  const gitStatusOutput = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" });
  const workInProgressExists = fs.existsSync(WORK_IN_PROGRESS_PATH);
  return checkRepoSafety(gitStatusOutput, workInProgressExists);
}

async function main() {
  const safety = repoSafetyCheck();
  if (!safety.safe) {
    console.log(`Skipping daily update: ${safety.reason} (${safety.detail}).`);
    return;
  }

  const prices = loadJson(PRICES_PATH, []);
  const overrides = loadJson(PRODUCTS_PATH, []);
  const knownDifferent = loadJson(KNOWN_DIFFERENT_PATH, []);

  const log = [`Daily update — ${new Date().toISOString()}`, ""];
  const alerts = [];
  const pendingEntries = [];

  for (const category of CATEGORIES) {
    await updateCategory(category, prices, overrides, knownDifferent, log, alerts, pendingEntries);
  }

  writeJson(PRICES_PATH, prices);
  writeJson(PENDING_PATH, pendingEntries);
  writeJson(ALERTS_PATH, alerts);
  writeJson(path.join(HISTORY_DIR, `${today()}.json`), prices);
  writeJson(LAST_UPDATE_PATH, { updatedAt: new Date().toISOString() });

  log.push("");
  log.push(`Total: ${pendingEntries.length} pending candidate(s), ${alerts.length} alert(s).`);
  if (alerts.length > 0) {
    log.push("Alerts:");
    for (const a of alerts) log.push(`  [${a.category}] ${a.store}: ${a.reason} — ${a.detail}`);
  }

  // Written before the commit so the log itself is included in it —
  // real bug found by hand testing this: writing it after left every
  // day's log file uncommitted and untracked, forever.
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  fs.writeFileSync(path.join(LOGS_DIR, `${today()}.txt`), log.join("\n") + "\n");

  console.log(log.join("\n"));
  gitCommit();
  // Always attempted, even on a day with nothing new to commit — a
  // push that failed on an earlier run leaves that commit unpushed
  // locally, and this is what gets it out the next morning. When
  // everything is already on the remote it's a harmless no-op.
  gitPush();
}

main().catch((err) => {
  console.error("Daily update failed:", err.stack || err.message);
  process.exit(1);
});
