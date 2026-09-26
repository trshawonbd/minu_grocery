// The outlets step of the daily update — run by scraper/daily-update.js's
// runOutletsStep() as a child process strictly AFTER the grocery
// commit and push (see CLAUDE.md's "Outlets" section), so nothing here
// can ever stop or change the grocery update.
//
// Two jobs, each in its own try/catch so one site being down never
// blocks the other:
//   - mall shop lists: refreshed WEEKLY (the owner's rule) — only when
//     outlets/data/malls.json is 7+ days old or missing, otherwise
//     skipped without a single request.
//   - Denim Dream sale items: refreshed daily (its own price history
//     is written by fetch-denim-dream.js).
// Both fetchers are injectable so the test runs the real decision
// logic with stubs and never contacts a site. Direct run:
//   node outlets/scraper/daily-update.js

const fs = require("fs");
const path = require("path");

const MALLS_PATH = path.join(__dirname, "..", "data", "malls.json");
const MALLS_MAX_AGE_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

// true when the mall directory is missing, unreadable, or 7+ days old.
function shouldRefreshMalls(fetchedAt, now) {
  if (!fetchedAt) return true;
  const fetchedMs = Date.parse(fetchedAt);
  if (Number.isNaN(fetchedMs)) return true;
  return now.getTime() - fetchedMs >= MALLS_MAX_AGE_DAYS * DAY_MS;
}

function readMallsFetchedAt() {
  try {
    return JSON.parse(fs.readFileSync(MALLS_PATH, "utf8")).fetchedAt || null;
  } catch {
    return null;
  }
}

async function main(deps = {}) {
  const now = deps.now || new Date();
  const log = deps.log || console.log;
  const fetchedAt = deps.readMallsFetchedAt ? deps.readMallsFetchedAt() : readMallsFetchedAt();
  const fetchMalls = deps.fetchMalls || (() => require("./fetch-malls").main());
  const fetchDenimDream = deps.fetchDenimDream || (() => require("./fetch-denim-dream").main());
  const ran = { malls: false, denimDream: false };

  log(`Outlets daily update — ${now.toISOString()}`);
  if (shouldRefreshMalls(fetchedAt, now)) {
    try {
      await fetchMalls();
      ran.malls = true;
    } catch (err) {
      log(`  malls: FAILED (${err.message}) — kept last week's list`);
    }
  } else {
    log(`  malls: last fetched ${fetchedAt}, under ${MALLS_MAX_AGE_DAYS} days old — skipped (weekly refresh)`);
  }

  try {
    await fetchDenimDream();
    ran.denimDream = true;
  } catch (err) {
    log(`  Denim Dream: FAILED (${err.message}) — kept yesterday's items`);
  }
  return ran;
}

module.exports = { main, shouldRefreshMalls, MALLS_MAX_AGE_DAYS };

if (require.main === module) {
  main().catch((err) => {
    console.error("Outlets daily update failed:", err.stack || err.message);
    process.exit(1);
  });
}
