// Fetches all 5 malls' own shop lists and writes outlets/data/malls.json
// — roadmap step 2 (see CLAUDE.md's "Outlets" section). The only file
// that contacts a mall's site directly; outlets/scraper/malls.js holds
// the pure parsers this calls. 1 request/second, strictly sequential,
// PER SITE (five sites fetched one after another here, never in
// parallel, so the real-world rate to any one of them is well under
// that anyway). Ülemiste is paginated — fetched page by page until a
// page comes back empty or 404, never assuming a fixed page count.
//
// Run with: node outlets/scraper/fetch-malls.js
// or:       npm run fetch-malls

const fs = require("fs");
const path = require("path");
const { MALLS, PARSERS, buildCanonicalNames, applyCanonicalNames } = require("./malls");

const OUTPUT_PATH = path.join(__dirname, "..", "data", "malls.json");
const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";
const THROTTLE_MS = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) return { ok: false, status: response.status };
  return { ok: true, text: await response.text() };
}

// Ülemiste's shop list is paginated (/kauplused/, /kauplused/page/2,
// /kauplused/page/3, ...) — fetched one page at a time, 1/second,
// stopping at the first page that 404s or parses to zero shops
// (rather than trusting a page-count read off the page, which could
// silently under/over-run if the site's own pagination ever changes).
async function fetchUlemisteAll(mall) {
  const allShops = [];
  for (let page = 1; ; page++) {
    const url = page === 1 ? mall.listUrl : `${mall.listUrl}page/${page}`;
    if (page > 1) await sleep(THROTTLE_MS);
    const result = await fetchText(url);
    if (!result.ok) break;
    const shops = PARSERS[mall.id](result.text);
    if (shops.length === 0 && page > 1) break;
    allShops.push(...shops);
    // A defensive upper bound — real page count was 21 when this was
    // written; something is wrong (an infinite redirect loop, a
    // changed site) long before 60, and this must never run forever.
    if (page >= 60) break;
  }
  return allShops;
}

async function fetchMallShops(mall) {
  if (mall.id === "ulemiste") return fetchUlemisteAll(mall);
  const result = await fetchText(mall.listUrl);
  if (!result.ok) throw new Error(`HTTP ${result.status} for ${mall.listUrl}`);
  return PARSERS[mall.id](result.text);
}

async function main() {
  const results = [];
  for (const mall of MALLS) {
    console.log(`Fetching ${mall.name}...`);
    try {
      const shops = await fetchMallShops(mall);
      results.push({ mall, shops });
      console.log(`  ${mall.name}: ${shops.length} shops`);
    } catch (err) {
      console.log(`  ${mall.name}: FAILED (${err.message}) — kept out of this run`);
    }
    // 1 request/second between DIFFERENT sites too — no reason not
    // to be just as polite moving from one mall's site to the next.
    await sleep(THROTTLE_MS);
  }

  // Cross-mall name-casing pass — a brand written in caps at one mall
  // and normal case at another becomes consistent everywhere, using
  // whichever spelling any mall already got right (see malls.js).
  const allShops = results.flatMap((r) => r.shops);
  const canonical = buildCanonicalNames(allShops);

  const malls = results.map(({ mall, shops }) => ({
    id: mall.id,
    name: mall.name,
    address: mall.address,
    lat: mall.lat,
    lon: mall.lon,
    url: mall.url,
    shops: applyCanonicalNames(shops, canonical),
  }));

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ fetchedAt: new Date().toISOString(), malls }, null, 2) + "\n");
  const total = malls.reduce((sum, m) => sum + m.shops.length, 0);
  console.log(`\nWrote ${malls.length} malls, ${total} shops total, to outlets/data/malls.json`);
}

module.exports = { main, OUTPUT_PATH };

if (require.main === module) {
  main().catch((err) => {
    console.error("Mall fetch failed:", err.stack || err.message);
    process.exit(1);
  });
}
