// A compact, append-only record of every store-listing price CHANGE
// (not a snapshot of everything, every day) — the storage-size fix
// the owner asked for, 2026-09-28: the old data/history/YYYY-MM-DD.json
// wrote a full copy of data/prices.json every single day forever,
// growing without bound even on a day nothing changed. This instead
// keys by a store listing's own URL (the one identifier that outlives
// a display-name rename — see scraper/rename-products.js) and holds
// just [date, price] pairs, one per day that URL's price actually
// changed.
//
// data/price-history.json shape:
//   { "<url>": [["2026-09-26", 1.29], ["2026-10-03", 1.19], ...] }
// Entries are always kept sorted by date ascending (recordPrices only
// ever appends at the end, or replaces the last entry if called twice
// for the same date — see its own comment). A URL with no entries at
// all before a given date has no recorded price for that date: this
// never guesses backward past the first day it was ever seen.
//
// Pure functions only, no file I/O — daily-update.js reads/writes the
// JSON file itself, the same separation match-products.js and
// daily-update-logic.js already follow, so this is directly testable.

// Adds today's prices to the history, but only where they actually
// changed a URL's LAST recorded price (or the URL has never been
// recorded before, in which case today's price becomes its first
// entry — otherwise a product whose price never changes would have
// no data point to answer "what was the price on day N" at all).
// Called twice for the SAME date (a re-run the same day) replaces
// that date's entry rather than appending a duplicate, so re-running
// the daily update by hand never clutters the file.
// Returns a NEW history object (input is never mutated) and how many
// URLs got a new or replaced entry, for the run's own log line.
function recordPrices(history, dateStr, freshPricesByUrl) {
  const next = { ...history };
  let changed = 0;
  for (const [url, price] of Object.entries(freshPricesByUrl)) {
    const entries = next[url];
    if (!entries || entries.length === 0) {
      next[url] = [[dateStr, price]];
      changed++;
      continue;
    }
    const last = entries[entries.length - 1];
    if (last[1] === price) continue; // no change — nothing to record
    next[url] = last[0] === dateStr ? [...entries.slice(0, -1), [dateStr, price]] : [...entries, [dateStr, price]];
    changed++;
  }
  return { history: next, changed };
}

// The price actually in effect for a URL on a given date — the most
// recent recorded change on or before it, carrying forward exactly
// the way a real price does between changes. null when that URL has
// no recorded price that early (never seen yet on that date), not 0 —
// "unknown", never "free".
function priceOnDate(history, url, dateStr) {
  const entries = history[url];
  if (!entries || entries.length === 0) return null;
  const target = dateStr; // ISO "YYYY-MM-DD" strings compare correctly as plain strings
  let result = null;
  for (const [date, price] of entries) {
    if (date > target) break; // entries are date-ascending; nothing later can still qualify
    result = price;
  }
  return result;
}

// The lowest price in effect at ANY point in the `windowDays`-day
// window ending on `endDateStr` (inclusive of both ends — the default
// 30 covers "today and the 29 days before it", for the "real
// discount" check: today's price is only a genuine discount if it's
// below this). Considers every recorded change that falls inside the
// window, PLUS whatever price was already in effect the instant the
// window opened (a price that never changed during the whole window
// still counts — found by hand-checking this: a product with zero
// recorded changes in 30 days would otherwise wrongly report "no
// data" instead of its one steady price). null only when there is no
// recorded price at all as of the window's start.
function lowestPriceInWindow(history, url, endDateStr, windowDays = 30) {
  const entries = history[url];
  if (!entries || entries.length === 0) return null;
  const startDateStr = shiftDate(endDateStr, -(windowDays - 1));

  let min = null;
  for (const [date, price] of entries) {
    if (date < startDateStr) continue; // covered below by the window's own carry-in price instead
    if (date > endDateStr) break;
    if (min === null || price < min) min = price;
  }
  // Whatever price was ALREADY in effect the moment the window opened
  // (a price that never changed during the whole window still has to
  // count) — a plain priceOnDate at the window's start handles both
  // "the latest change was before the window" and "there's a change
  // exactly on the first day" identically and correctly.
  const carryIn = priceOnDate(history, url, startDateStr);
  if (carryIn !== null && (min === null || carryIn < min)) min = carryIn;
  return min;
}

// "2026-09-26" shifted by `days` (negative to go backward) — plain
// date arithmetic, UTC so it never shifts by a wall-clock hour near
// midnight in any timezone.
function shiftDate(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

module.exports = { recordPrices, priceOnDate, lowestPriceInWindow, shiftDate };
