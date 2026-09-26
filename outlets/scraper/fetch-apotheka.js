// Fetches Apotheka's own "Kõik sooduspakkumised" list and writes
// outlets/data/apotheka.json — plain server-rendered HTML, one page
// per request (?p=N, 34 cards each, an empty page ends it; checked
// 2026-09-26), 1 request/second. robots.txt allows /pakkumised/
// (only checkout, cart, wishlist and account paths are blocked); no
// login. Cosmetics and hygiene ONLY — brands.js's parseApothekaPage
// drops every medicine, supplement, health product and any type it
// has never seen, and this logs the full type breakdown so the owner
// can check nothing wrong slipped in or out.
//
// Run with: node outlets/scraper/fetch-apotheka.js
// or:       npm run fetch-apotheka

const fs = require("fs");
const path = require("path");
const { parseApothekaPage } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");

const LIST_URL = "https://www.apotheka.ee/pakkumised/koik-sooduspakkumised";
const DROPPED_PATH = path.join(__dirname, "..", "data", "apotheka-dropped.json");
const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";
const THROTTLE_MS = 1000;
const MAX_PAGES = 60;

function pageUrl(page) {
  return page === 1 ? LIST_URL : `${LIST_URL}?p=${page}`;
}

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
  const byId = new Map();
  const excluded = [];
  const types = {};
  let cards = 0;
  for (let page = 1; page <= MAX_PAGES; page++) {
    if (page > 1) await deps.sleep(THROTTLE_MS);
    const html = await deps.fetchText(pageUrl(page));
    const parsed = parseApothekaPage(html);
    if (parsed.cards === 0) break;
    cards += parsed.cards;
    for (const item of parsed.items) if (!byId.has(item.id)) byId.set(item.id, item);
    excluded.push(...parsed.excluded);
    for (const [type, n] of Object.entries(parsed.types)) types[type] = (types[type] || 0) + n;
    deps.log(`  page ${page}: ${parsed.cards} cards, ${parsed.items.length} cosmetics/hygiene sale items`);
  }
  const items = [...byId.values()];
  deps.log(`Apotheka: ${cards} cards on the site's deals list, ${items.length} kept (cosmetics/hygiene, in stock, real sale), ${excluded.length} dropped by type`);
  deps.log("  types seen: " + Object.entries(types).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ${n}`).join(", "));
  const scrapedAt = deps.now().toISOString();
  // Everything dropped, by name and type, for the owner to review —
  // the scope rule (cosmetics/hygiene only) is a judgment a person
  // checks, never something guessed silently.
  const write = deps.writeFile || ((p, text) => fs.writeFileSync(p, text));
  write(DROPPED_PATH, JSON.stringify({ scrapedAt, types, dropped: excluded }, null, 1) + "\n");
  const result = writeBrandOutput({ brand: "Apotheka", slug: "apotheka", items, catalogueCount: cards, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine("Apotheka", result)}`);
  return { items, catalogueCount: cards, excluded, types };
}

module.exports = { main, pageUrl };

if (require.main === module) {
  main().catch((err) => {
    console.error("Apotheka fetch failed:", err.stack || err.message);
    process.exit(1);
  });
}
