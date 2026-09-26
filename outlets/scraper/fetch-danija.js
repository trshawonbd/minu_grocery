// Fetches Danija's /kampaaniad list page by page and writes
// outlets/data/danija.json. Checked 2026-09-26: robots.txt (no
// crawl-delay, no whole-site disallow) blocks sort/tag/search query
// URLs but allows "?page=N"; no login; 38 cards a page; a page with
// no cards ends it. No 30-day field.
// Run with: node outlets/scraper/fetch-danija.js

const { parseDanijaPage } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");
const { siteFetcher } = require("./fetch-helpers");

const LIST_URL = "https://danija.ee/kampaaniad";
const MAX_PAGES = 40;

function pageUrl(page) {
  return page === 1 ? LIST_URL : `${LIST_URL}?page=${page}`;
}

async function main(overrides = {}) {
  const deps = { fetcher: siteFetcher({ crawlDelaySeconds: 1 }), log: console.log, now: () => new Date(), ...overrides };
  const byId = new Map();
  let cards = 0;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const parsed = parseDanijaPage(await deps.fetcher.text(pageUrl(page)));
    if (parsed.cards === 0) break;
    cards += parsed.cards;
    let added = 0;
    for (const item of parsed.items) if (!byId.has(item.id)) { byId.set(item.id, item); added++; }
    deps.log(`  page ${page}: ${parsed.cards} cards, ${parsed.items.length} sale items (${added} new)`);
    if (added === 0 && page > 1) break; // the site repeating page 1 past the end
  }
  const items = [...byId.values()];
  deps.log(`Danija: ${cards} cards, ${items.length} real sale items`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: "Danija", slug: "danija", items, catalogueCount: cards, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine("Danija", result)}`);
  return { items, catalogueCount: cards };
}

module.exports = { main, pageUrl };

if (require.main === module) {
  main().catch((err) => { console.error("Danija fetch failed:", err.stack || err.message); process.exit(1); });
}
