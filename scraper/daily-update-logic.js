// Pure logic for the daily price-update script (scraper/daily-update.js)
// — kept separate from network/file/git I/O so it's directly testable,
// the same reason match-products.js and frontend/pricing.js are pure.
//
// The daily update's one job is narrower than a full re-scrape
// (scraper/fetch-price.js): it may only update the price fields of a
// product already confirmed in data/prices.json, matching a store's
// item to that product's existing entry by URL — it must never create,
// merge, or reassign a product on its own. A URL that disappears from
// a fresh scrape means that store's listing is marked unavailable
// (never deleted — a future run can still find the same URL again and
// reactivate it). A product left with fewer than 2 available stores is
// marked hidden (still never deleted). Anything the matcher finds among
// items NOT already tied to an existing product goes to data/pending.json
// for a person to review with Claude Code later — never into
// data/prices.json automatically.

const { toStoreEntry } = require("./scrape-output");

// A store's fresh scrape must never be applied blindly — a store-side
// outage or bug (an empty/near-empty page that still parses, a broken
// price feed) looks just like a real update otherwise. Two independent
// checks, either one alone being reason enough to keep yesterday's
// data for that store and raise an alert instead.
const ITEM_COUNT_DROP_THRESHOLD = 0.2; // 20% fewer items than last time
const PRICE_CHANGE_RATIO_THRESHOLD = 0.5; // a single item's price more than doubling or halving
const PRICE_CHANGE_FRACTION_THRESHOLD = 0.3; // more than 30% of comparable items doing that

// Decides whether a store's fresh item list is safe to apply, compared
// against its previous raw list (data/raw/<category>/<store>.json
// before this run overwrites it). Returns { safe: true } or
// { safe: false, reason, detail } — reason is one of "fetch-failed"
// (the caller sets this directly, not from here), "item-count-drop",
// "price-volatility".
function checkStoreSafety(previousItems, freshItems) {
  if (previousItems.length > 0) {
    const dropRatio = (previousItems.length - freshItems.length) / previousItems.length;
    if (dropRatio >= ITEM_COUNT_DROP_THRESHOLD) {
      return {
        safe: false,
        reason: "item-count-drop",
        detail: `${previousItems.length} -> ${freshItems.length} items (${Math.round(dropRatio * 100)}% fewer)`,
      };
    }
  }

  const previousByUrl = new Map(previousItems.map((item) => [item.url, item]));
  let compared = 0;
  let bigChanges = 0;
  for (const item of freshItems) {
    const prev = previousByUrl.get(item.url);
    if (!prev || !(prev.price > 0) || !(item.price > 0)) continue;
    compared++;
    const changeRatio = Math.abs(item.price - prev.price) / prev.price;
    if (changeRatio > PRICE_CHANGE_RATIO_THRESHOLD) bigChanges++;
  }
  if (compared > 0 && bigChanges / compared > PRICE_CHANGE_FRACTION_THRESHOLD) {
    return {
      safe: false,
      reason: "price-volatility",
      detail: `${bigChanges}/${compared} matched items changed by more than 50%`,
    };
  }

  return { safe: true };
}

// Guards the whole run, before any store is even fetched — a person
// (or another Claude Code session) working in the repo when the
// schedule fires is a real scenario (this runs at 06:00 unattended,
// with no guarantee nobody's mid-edit), and this script's own
// self-commit (see gitCommit in daily-update.js) would otherwise
// scoop up and commit whatever uncommitted work is sitting there —
// confusing at best, wrong at worst. Two independent signals, either
// one enough to skip the entire run untouched: uncommitted changes
// anywhere in the repo (not just data/ — a mid-edit in scraper/*.js
// counts too), or an explicit data/.work-in-progress marker file a
// person creates before starting work and removes when done, for the
// case where they *want* to leave things uncommitted overnight.
// Pure by design (takes already-gathered strings/booleans, not a live
// git call) so it's directly testable — see daily-update.js for the
// real git status/fs.existsSync call this wraps.
// The update's own log files (data/logs/YYYY-MM-DD.txt) are the one
// thing this check ignores: a SKIPPED run writes its reason there
// (the owner's rule — a skipped run must always say why), and that
// file is untracked until the next real run commits it. Counting it
// would make one skip skip every run after it, forever. Found on
// 2026-09-26, when the 06:00 run skipped and left no trace in the
// repo at all — the only record was launchd's own log file.
// A porcelain line is two status characters (a space counts, " M"),
// a space, then the path.
const OWN_LOG_PATH = /^.{2} "?data\/logs\//;

function checkRepoSafety(gitStatusOutput, workInProgressExists) {
  if (workInProgressExists) {
    return { safe: false, reason: "work-in-progress", detail: "data/.work-in-progress exists" };
  }
  const dirty = gitStatusOutput
    .split("\n")
    .map((line) => line.replace(/\r$/, ""))
    .filter((line) => line.trim().length > 0 && !OWN_LOG_PATH.test(line));
  if (dirty.length > 0) {
    const shown = dirty.slice(0, 5).map((line) => line.trim()).join(", ");
    return { safe: false, reason: "uncommitted-changes", detail: `git status is not clean: ${shown}${dirty.length > 5 ? `, … (${dirty.length} files)` : ""}` };
  }
  return { safe: true };
}

// Every store an existing product entry could be keyed under, lowercased
// (see toPricesObject in scrape-output.js) — used to go from a fresh
// scrape's "Barbora"/"Rimi"/"Selver" store name to the matching
// data/prices.json key.
function storeKey(store) {
  return store.toLowerCase();
}

// Updates one product's per-store price entries in place, matching a
// store's existing entry to a fresh item by URL alone — never by name
// or any kind of re-matching. A store missing from `freshByStore`
// (failed or unsafe this run) is left completely untouched. Returns
// per-product counts for the run's report.
function updateProductPrices(product, freshByStore) {
  let priceUpdates = 0;
  let newlyUnavailable = 0;
  let reactivated = 0;
  let imagesFilled = 0;

  for (const store of Object.keys(product.prices)) {
    const freshItems = freshByStore[storeKey(store)];
    if (!freshItems) continue; // this store wasn't safely refreshed this run — leave as-is

    const entry = product.prices[store];
    const fresh = freshItems.find((item) => item.url === entry.url);

    if (fresh) {
      if (entry.unavailable) reactivated++;
      const updated = mergeStoreEntry(entry, toStoreEntry(fresh));
      if (!entry.image && updated.image) imagesFilled++;
      product.prices[store] = updated;
      priceUpdates++;
    } else {
      if (!entry.unavailable) newlyUnavailable++;
      product.prices[store] = { ...entry, unavailable: true };
    }
  }

  return { priceUpdates, newlyUnavailable, reactivated, imagesFilled };
}

// The fresh entry replaces the old one — price, size, barcode, store
// name, sale price, and the store's photo URL when the scrape carried
// one. A photo the old entry had and the fresh item didn't (a scrape
// that couldn't read it that day) is kept rather than dropped: the
// image is display-only and the last known one is better than none.
// Everything else follows the fresh item exactly, so a card price or
// sale price the store stopped stating disappears as it should.
function mergeStoreEntry(previousEntry, freshEntry) {
  if (freshEntry.image || !previousEntry.image) return freshEntry;
  return { ...freshEntry, image: previousEntry.image };
}

// How many of a product's stores are currently available — a store
// marked unavailable still has an entry (never deleted), just excluded
// from this count.
function availableStoreCount(product) {
  return Object.values(product.prices).filter((entry) => !entry.unavailable).length;
}

// Recomputes whether a product should be hidden from the app (fewer
// than 2 available stores) — sets `product.hidden`, never deletes the
// product. Idempotent: a store reactivating later flips this back.
function updateHidden(product) {
  product.hidden = availableStoreCount(product) < 2;
  return product.hidden;
}

// Items from a fresh scrape not already tied (by URL) to any existing
// product in this category — the pool a matching pass considers for
// brand-new candidates. `freshByStore` only includes stores that were
// safely refreshed this run (see checkStoreSafety), so a skipped
// store's items are never treated as "new".
function findLeftoverPool(existingProducts, freshByStore) {
  const usedUrls = new Set();
  for (const product of existingProducts) {
    for (const entry of Object.values(product.prices)) {
      usedUrls.add(entry.url);
    }
  }

  const pool = [];
  for (const [store, items] of Object.entries(freshByStore)) {
    for (const item of items) {
      if (usedUrls.has(item.url)) continue;
      pool.push(item);
    }
  }
  return pool;
}

module.exports = {
  ITEM_COUNT_DROP_THRESHOLD,
  PRICE_CHANGE_RATIO_THRESHOLD,
  PRICE_CHANGE_FRACTION_THRESHOLD,
  checkRepoSafety,
  checkStoreSafety,
  updateProductPrices,
  mergeStoreEntry,
  availableStoreCount,
  updateHidden,
  findLeftoverPool,
};
