// Fetches Charlot's sale page and writes outlets/data/charlot.json.
// Checked 2026-09-26: robots.txt's "*" group asks Crawl-delay 10 and
// forbids every URL with a "?" (so no paging, no filters — only the
// plain /soodusmuuk/ page is read, one request a run); its whole-site
// "Disallow: /" groups name 26 other bots, not us. No login. No
// 30-day field.
// Run with: node outlets/scraper/fetch-charlot.js

const { parseCharlotPage } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");
const { siteFetcher } = require("./fetch-helpers");

const SALE_URL = "https://charlot.ee/soodusmuuk/";
const CRAWL_DELAY_SECONDS = 10;

async function main(overrides = {}) {
  const deps = { fetcher: siteFetcher({ crawlDelaySeconds: CRAWL_DELAY_SECONDS }), log: console.log, now: () => new Date(), ...overrides };
  deps.log("Fetching Charlot /soodusmuuk/...");
  const { items, cards } = parseCharlotPage(await deps.fetcher.text(SALE_URL));
  deps.log(`  ${cards} cards on the page, ${items.length} real sale items`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: "Charlot", slug: "charlot", items, catalogueCount: cards, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine("Charlot", result)}`);
  return { items, catalogueCount: cards };
}

module.exports = { main, SALE_URL, CRAWL_DELAY_SECONDS };

if (require.main === module) {
  main().catch((err) => { console.error("Charlot fetch failed:", err.stack || err.message); process.exit(1); });
}
