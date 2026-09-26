// Fetches Klick's sale list ("Parimad pakkumised") through its own
// Vue Storefront catalog API and writes outlets/data/klick.json —
// the same stack, path shape and politeness as Selver's allowed
// catalog path. Checked 2026-09-26: vsf-api.klick.ee serves no
// robots.txt at all (nothing disallowed; www.klick.ee's own
// robots.txt allows the sale page and never mentions the API host),
// no login, and two requests per run (the category tree, then the
// category's products) at 1/second. The plain HTML page can't be
// used: it prints the sale price in both price slots.
//
// Run with: node outlets/scraper/fetch-klick.js
// or:       npm run fetch-klick

const { parseKlickProducts, buildKlickCategoryIndex, KLICK_SALE_CATEGORY_ID } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");

const API_BASE = "https://vsf-api.klick.ee/api/catalog/vue_storefront_catalog_et";
const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";
const THROTTLE_MS = 1000;

function searchUrl(kind, request, size) {
  return `${API_BASE}/${kind}/_search?size=${size}&from=0&request=${encodeURIComponent(JSON.stringify(request))}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

async function main(overrides = {}) {
  const deps = { fetchJson, sleep, log: console.log, now: () => new Date(), ...overrides };
  deps.log("Fetching Klick category tree...");
  const categories = await deps.fetchJson(searchUrl("category", { query: { match_all: {} } }, 1000));
  const categoriesById = buildKlickCategoryIndex(categories.hits.hits);
  await deps.sleep(THROTTLE_MS);
  deps.log("Fetching Klick 'Parimad pakkumised'...");
  const products = await deps.fetchJson(searchUrl("product", { query: { term: { category_ids: KLICK_SALE_CATEGORY_ID } } }, 300));
  const { items, count } = parseKlickProducts(products.hits.hits, categoriesById);
  deps.log(`  ${count} listed, ${items.length} real sale items`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: "Klick", slug: "klick", items, catalogueCount: count, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine("Klick", result)}`);
  return { items, catalogueCount: count };
}

module.exports = { main, searchUrl };

if (require.main === module) {
  main().catch((err) => {
    console.error("Klick fetch failed:", err.stack || err.message);
    process.exit(1);
  });
}
