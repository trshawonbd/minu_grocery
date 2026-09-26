// Fetches Skechers's sale list page and writes outlets/data/skechers.json.
// Checked 2026-09-26: robots.txt (no crawl-delay, no whole-site
// disallow) forbids every "?p=" URL, i.e. the paging — so only the
// first page of /et/sale.html is read, one request a run; the rest of
// the sale is out of reach by the site's own rule. No login. No
// 30-day field.
// Run with: node outlets/scraper/fetch-skechers.js

const { parseSkechersPage } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");
const { siteFetcher } = require("./fetch-helpers");

const SALE_URL = "https://skechers.ee/et/sale.html";

async function main(overrides = {}) {
  const deps = { fetcher: siteFetcher({ crawlDelaySeconds: 1 }), log: console.log, now: () => new Date(), ...overrides };
  deps.log("Fetching Skechers /et/sale.html (page 1 only — robots.txt forbids ?p=)...");
  const { items, cards } = parseSkechersPage(await deps.fetcher.text(SALE_URL));
  deps.log(`  ${cards} cards on the page, ${items.length} real sale items`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: "Skechers", slug: "skechers", items, catalogueCount: cards, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine("Skechers", result)}`);
  return { items, catalogueCount: cards };
}

module.exports = { main, SALE_URL };

if (require.main === module) {
  main().catch((err) => { console.error("Skechers fetch failed:", err.stack || err.message); process.exit(1); });
}
