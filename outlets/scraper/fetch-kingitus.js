// Fetches Kingitus.ee's /allahindlus/ list and writes
// outlets/data/kingitus.json. Checked 2026-09-26: robots.txt is open
// for the list and product pages (only cart, cms, partner and
// search/order query URLs are blocked; no crawl-delay); no login. The
// list is one page (every item on it). The EU 30-day-lowest price is
// stated on each PRODUCT page, so this visits every sale item's page
// (1 request/second) — that is what makes Kingitus.ee's items
// judgeable new/permanent from day one (thirtyDaySource "site").
// Run with: node outlets/scraper/fetch-kingitus.js

const { parseKingitusPage, parseKingitusProductLowest } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");
const { siteFetcher } = require("./fetch-helpers");

const LIST_URL = "https://www.kingitus.ee/allahindlus/";

async function main(overrides = {}) {
  const deps = { fetcher: siteFetcher({ crawlDelaySeconds: 1 }), log: console.log, now: () => new Date(), ...overrides };
  deps.log("Fetching Kingitus.ee /allahindlus/...");
  const { items, cards, total } = parseKingitusPage(await deps.fetcher.text(LIST_URL));
  deps.log(`  ${cards} cards (site says ${total ?? "?"}), ${items.length} real sale items; reading each product page for the 30-day lowest price...`);
  let withLowest = 0;
  for (const item of items) {
    if (!item.link) continue;
    try {
      const lowest = parseKingitusProductLowest(await deps.fetcher.text(item.link));
      if (lowest !== null) { item.priceMin30 = lowest; withLowest++; }
    } catch (err) {
      deps.log(`  ${item.link}: FAILED (${err.message}) — no 30-day value for it today`);
    }
  }
  deps.log(`  30-day lowest price found on ${withLowest} of ${items.length} product pages`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: "Kingitus.ee", slug: "kingitus", items, catalogueCount: cards, scrapedAt, thirtyDaySource: "site" }, deps);
  deps.log(`\n${summaryLine("Kingitus.ee", result)}`);
  return { items, catalogueCount: cards, withLowest };
}

module.exports = { main, LIST_URL };

if (require.main === module) {
  main().catch((err) => { console.error("Kingitus.ee fetch failed:", err.stack || err.message); process.exit(1); });
}
