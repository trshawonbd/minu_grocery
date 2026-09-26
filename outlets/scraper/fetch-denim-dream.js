// Fetches Denim Dream's own outlet page and writes
// outlets/data/denim-dream.json — roadmap step 3, first brand. The
// only file that contacts denimdream.com directly.
//
// IMPORTANT LIMITATION, found while building this (checked by hand,
// not guessed around): denimdream.com/EE/et/<Sex>/Outlet only
// server-renders its FIRST 50 items in plain HTML (the
// __NEXT_DATA__ blob outlets/scraper/brands.js reads) — a real
// ?page=2 request returns the SAME first-page data, meaning further
// pages are loaded by the site's own client-side JavaScript calling
// an endpoint this code has not identified. That puts pages 2+ in
// the same "would need reverse-engineering a private API" category
// investigation.md already deferred Reserved/Mohito for — so this
// only ever reads page 1 of each of the three sections (Naised,
// Mehed, Lapsed), 150 real product listings total, not the full
// ~9,400-item catalogue. Safe, confirmed, no guessing; the owner can
// decide later whether chasing the full catalogue via a browser
// network-tab investigation is worth doing.
//
// 1 request/second, strictly sequential — three requests total.
//
// Run with: node outlets/scraper/fetch-denim-dream.js
// or:       npm run fetch-denim-dream

const fs = require("fs");
const path = require("path");
const { extractNextData, parseDenimDreamPage } = require("./brands");
const { recordPrices } = require("../../scraper/price-history.js");

const SECTIONS = [
  { sex: "Naised", url: "https://www.denimdream.com/EE/et/Naised/Outlet" },
  { sex: "Mehed", url: "https://www.denimdream.com/EE/et/Mehed/Outlet" },
  { sex: "Lapsed", url: "https://www.denimdream.com/EE/et/Lapsed/Outlet" },
];
const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";
const THROTTLE_MS = 1000;
const OUTPUT_PATH = path.join(__dirname, "..", "data", "denim-dream.json");
const HISTORY_PATH = path.join(__dirname, "..", "data", "denim-dream-price-history.json");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchSection(section) {
  const response = await fetch(section.url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${section.url}`);
  const html = await response.text();
  const data = extractNextData(html);
  if (!data) throw new Error(`__NEXT_DATA__ not found for ${section.url}`);
  return parseDenimDreamPage(data);
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function main() {
  const allItems = [];
  let totalCatalogueCount = 0;
  for (const section of SECTIONS) {
    console.log(`Fetching Denim Dream (${section.sex})...`);
    const { items, count } = await fetchSection(section);
    console.log(`  ${section.sex}: page 1 of ${count} total, ${items.length} real sale items on it`);
    allItems.push(...items);
    totalCatalogueCount += count;
    await sleep(THROTTLE_MS);
  }

  const scrapedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({ brand: "Denim Dream", scrapedAt, catalogueCount: totalCatalogueCount, items: allItems }, null, 2) + "\n"
  );

  const dateStr = scrapedAt.slice(0, 10);
  const freshPricesByUrl = {};
  for (const item of allItems) {
    if (item.link) freshPricesByUrl[item.link] = item.salePrice;
  }
  const history = readJson(HISTORY_PATH, {});
  const { history: nextHistory, changed } = recordPrices(history, dateStr, freshPricesByUrl);
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(nextHistory, null, 2) + "\n");

  console.log(`\nWrote ${allItems.length} sale items to outlets/data/denim-dream.json (${changed} price-history entries changed)`);
}

main().catch((err) => {
  console.error("Denim Dream fetch failed:", err.stack || err.message);
  process.exit(1);
});
