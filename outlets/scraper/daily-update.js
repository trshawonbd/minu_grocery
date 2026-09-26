// Outlets' own scheduled update — run as a SEPARATE STEP by the
// grocery scraper/daily-update.js, after the grocery run has already
// committed and pushed. This is the safety boundary the owner asked
// for (2026-09-28): whatever this script does or fails to do, it can
// never stop or change the grocery update, because by the time it
// runs the grocery commit already happened. The grocery script calls
// this as a child process wrapped in its own try/catch, so even a
// crash here (non-zero exit, an uncaught exception) is caught, logged
// and swallowed there — see runOutletsStep() in
// scraper/daily-update.js.
//
// Currently a stub: no mall/brand scraper exists yet (roadmap step 1,
// investigation, is report-only; steps 2-3 build the real scrapers).
// Exits 0 and writes nothing once those exist, this is where the real
// daily work goes — mall shop lists refreshed weekly, brand discounts
// refreshed daily, each with the same safety checks and 1-request-
// per-second throttle groceries use. Never contacts a site without
// the owner's go-ahead for that specific scrape, same as groceries.
//
// Run with: node outlets/scraper/daily-update.js

function main() {
  console.log(`Outlets daily update — ${new Date().toISOString()}: no scraper built yet (see CLAUDE.md's "Outlets" roadmap) — nothing to do.`);
}

if (require.main === module) main();

module.exports = { main };
