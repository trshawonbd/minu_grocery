// Fetches Denim Dream's full SALE list and writes
// outlets/data/denim-dream.json — roadmap step 3, first brand. The
// only file that contacts denimdream.com or its API.
//
// Source (found 2026-09-26 by reading the site's own app bundle — the
// same JSON its own pages load, like Selver's catalog path):
//   https://api-v2.denimdream.com/api/v2/product/product
//     ?country=EE&lang=et&sale=true&sexId=<id>&page=<n>&size=50
// Conditions the owner set, all checked before the first fetch:
//   - robots.txt: api-v2.denimdream.com serves none at all (404), so
//     nothing on that host is disallowed; www.denimdream.com's
//     "Disallow: /api" applies to that host only, and this never
//     touches it.
//   - no login: the endpoint answers without any token or cookie.
//   - 1 request/second, strictly sequential.
//   - sale items only: `sale=true` on the request AND every item
//     re-checked here for regular > sale (brands.js) — never the
//     whole ~9,400-item catalogue.
// Sections are the API's own sexId values (1 Mehed, 2 Naised, 4
// Poisid, 5 Tüdrukud — the last two shown as "Lapsed"). Pages stop at
// the API's own `count`, with a defensive cap so this can never loop
// forever if a count is ever wrong.
//
// Price history (outlets/data/denim-dream-price-history.json) keeps
// one [date, price] per link PER CHANGE — the same pure helpers
// groceries use (scraper/price-history.js) — and each item's
// `firstSeen` is the first date its link ever appeared, for the
// "uusim" (newest) sort in the app and a later "real discount" check.
//
// Run with: node outlets/scraper/fetch-denim-dream.js
// or:       npm run fetch-denim-dream

const { parseDenimDreamProducts } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");

const API_URL = "https://api-v2.denimdream.com/api/v2/product/product";
const SEX_IDS = [2, 1, 4, 5];
const PAGE_SIZE = 50;
const MAX_PAGES_PER_SECTION = 400;
const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";
const THROTTLE_MS = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function listUrl(sexId, page) {
  const params = new URLSearchParams({ country: "EE", lang: "et", sale: "true", sexId: String(sexId), page: String(page), size: String(PAGE_SIZE) });
  return `${API_URL}?${params}`;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

// One section, every page, 1/second. Returns { items, count }.
async function fetchSection(sexId, deps) {
  const items = [];
  let count = 0;
  for (let page = 1; page <= MAX_PAGES_PER_SECTION; page++) {
    if (page > 1) await deps.sleep(THROTTLE_MS);
    const list = await deps.fetchJson(listUrl(sexId, page));
    if (Array.isArray(list)) throw new Error(`API error: ${JSON.stringify(list).slice(0, 200)}`);
    const parsed = parseDenimDreamProducts(list);
    items.push(...parsed.items);
    count = parsed.count;
    const seen = (page - 1) * (list.size || PAGE_SIZE) + (list.products || []).length;
    if ((list.products || []).length === 0 || seen >= count) break;
  }
  return { items, count };
}

// The first date each link was ever recorded — read from the history
// AFTER today's prices are recorded, so a brand-new item's first date
// is today.
// Denim Dream's site carries a 30-day-lowest field, so its items are
// judged new/permanent from day one (thirtyDaySource "site").
function writeOutput(items, catalogueCount, scrapedAt, deps = {}) {
  return writeBrandOutput({ brand: "Denim Dream", slug: "denim-dream", items, catalogueCount, scrapedAt, thirtyDaySource: "site" }, deps);
}

async function main(overrides = {}) {
  const deps = { fetchJson, sleep, log: console.log, now: () => new Date(), ...overrides };
  const byId = new Map();
  let catalogueCount = 0;
  for (const sexId of SEX_IDS) {
    deps.log(`Fetching Denim Dream sale items (sexId ${sexId})...`);
    const { items, count } = await fetchSection(sexId, deps);
    deps.log(`  sexId ${sexId}: ${count} listed, ${items.length} real sale variants`);
    catalogueCount += count;
    // A product can be listed under two sections (a kids' item under
    // both Poisid and Tüdrukud); the first sighting wins.
    for (const item of items) if (!byId.has(item.id)) byId.set(item.id, item);
    await deps.sleep(THROTTLE_MS);
  }
  const allItems = [...byId.values()];
  const scrapedAt = deps.now().toISOString();
  const result = writeOutput(allItems, catalogueCount, scrapedAt, deps);
  deps.log(`\n${summaryLine("Denim Dream", result)}`);
  return { items: allItems, catalogueCount };
}

module.exports = { main, fetchSection, writeOutput, listUrl, SEX_IDS, PAGE_SIZE };

if (require.main === module) {
  main().catch((err) => {
    console.error("Denim Dream fetch failed:", err.stack || err.message);
    process.exit(1);
  });
}
