// Fetches Euronics's campaign pages and writes outlets/data/euronics.json.
// Euronics has no sale listing: its discounts sit on campaign pages
// linked from the home page (/kampaaniad/<id>). Checked 2026-09-26:
// robots.txt allows the home page and /kampaaniad/<id> and disallows
// only deeper /kampaaniad/*/* paths (never fetched); no login; one
// request per campaign plus the home page, 1/second. A campaign's
// loyalty-only "Sõbrahind" cards are never sale items (the owner's
// rule) — brands.js counts them so the run can say how much of a
// campaign was loyalty-only.
//
// Run with: node outlets/scraper/fetch-euronics.js
// or:       npm run fetch-euronics

const { parseEuronicsCampaignLinks, parseEuronicsCampaign } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");

const HOME_URL = "https://www.euronics.ee/";
const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";
const THROTTLE_MS = 1000;
const MAX_CAMPAIGNS = 40;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

async function main(overrides = {}) {
  const deps = { fetchText, sleep, log: console.log, now: () => new Date(), ...overrides };
  deps.log("Fetching Euronics home page for campaign links...");
  const links = parseEuronicsCampaignLinks(await deps.fetchText(HOME_URL)).slice(0, MAX_CAMPAIGNS);
  deps.log(`  ${links.length} campaigns`);
  const byId = new Map();
  let cards = 0;
  let loyaltyOnly = 0;
  for (const link of links) {
    await deps.sleep(THROTTLE_MS);
    try {
      const parsed = parseEuronicsCampaign(await deps.fetchText(link));
      cards += parsed.cards;
      loyaltyOnly += parsed.loyaltyOnly;
      for (const item of parsed.items) if (!byId.has(item.id)) byId.set(item.id, item);
      deps.log(`  ${link}: ${parsed.cards} cards, ${parsed.items.length} sale items for everyone, ${parsed.loyaltyOnly} loyalty-only, ${parsed.noDiscount} without a discount`);
    } catch (err) {
      deps.log(`  ${link}: FAILED (${err.message}) — skipped`);
    }
  }
  const items = [...byId.values()];
  deps.log(`Euronics: ${cards} campaign cards, ${items.length} real sale items, ${loyaltyOnly} loyalty-only (never counted)`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: "Euronics", slug: "euronics", items, catalogueCount: cards, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine("Euronics", result)}`);
  return { items, catalogueCount: cards, loyaltyOnly, campaigns: links.length };
}

module.exports = { main };

if (require.main === module) {
  main().catch((err) => {
    console.error("Euronics fetch failed:", err.stack || err.message);
    process.exit(1);
  });
}
