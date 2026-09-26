// Fetches an LPP-family brand's sale sections (Reserved, Cropp —
// one shared platform) and writes outlets/data/<slug>.json. The sale
// page server-renders its product list inside `window.getCatalogData`
// (200 items a page), read straight from the HTML — never the
// "/ajx/" or "/ajax/" paths their robots.txt disallow. Paging is the
// plain "?page=N" URL (allowed by Reserved's and Cropp's robots.txt;
// House's forbids it, and Sinsay/House/Mohito publish no sale link in
// their HTML at all, so those three are not built — see CLAUDE.md).
// Crawl-delay 10 seconds (their robots.txt), so pages are capped per
// section to keep a run bounded; the cap and the site's own maxPage
// are both logged. No login. No 30-day field on the list.
// Run with: node outlets/scraper/fetch-lpp.js reserved
//           node outlets/scraper/fetch-lpp.js cropp

const { parseLppCatalog } = require("./brands");
const { writeBrandOutput, summaryLine } = require("./brand-output");
const { siteFetcher } = require("./fetch-helpers");

const BRANDS = {
  reserved: {
    brand: "Reserved", slug: "reserved", crawlDelaySeconds: 10,
    sections: [
      "https://www.reserved.com/ee/et/allahindlus/naised",
      "https://www.reserved.com/ee/et/allahindlus/mehed",
      "https://www.reserved.com/ee/et/allahindlus/tudrukud",
      "https://www.reserved.com/ee/et/allahindlus/poisid",
    ],
  },
  cropp: {
    brand: "Cropp", slug: "cropp", crawlDelaySeconds: 10,
    sections: ["https://www.cropp.com/ee/et/naised/riided/allahindlus", "https://www.cropp.com/ee/et/mehed/riided/allahindlus"],
  },
};
const MAX_PAGES_PER_SECTION = 10;

function pageUrl(sectionUrl, page) {
  return page === 1 ? sectionUrl : `${sectionUrl}?page=${page}`;
}

// Cropp's sale URLs carry the section in the path, not in
// categoryPathNames — read it from the URL when the catalog gives none.
function sectionFromUrl(url) {
  if (/\/naised\//.test(url)) return "Naised";
  if (/\/mehed\//.test(url)) return "Mehed";
  if (/\/(tudrukud|poisid|lapsed)\b/.test(url)) return "Lapsed";
  return null;
}

async function main(key, overrides = {}) {
  const config = BRANDS[key];
  if (!config) throw new Error(`unknown LPP brand "${key}" — one of ${Object.keys(BRANDS).join(", ")}`);
  const deps = { fetcher: siteFetcher({ crawlDelaySeconds: config.crawlDelaySeconds }), log: console.log, now: () => new Date(), ...overrides };
  const byId = new Map();
  let listed = 0;
  for (const sectionUrl of config.sections) {
    let firstIds = null;
    for (let page = 1; page <= MAX_PAGES_PER_SECTION; page++) {
      const parsed = parseLppCatalog(await deps.fetcher.text(pageUrl(sectionUrl, page)), config.brand);
      const ids = parsed.items.map((i) => i.id).join(",");
      if (page > 1 && ids === firstIds) { deps.log(`  ${sectionUrl} page ${page}: same as page 1 — paging not honoured, stopping`); break; }
      if (page === 1) { firstIds = ids; listed += parsed.total || parsed.products; }
      const section = sectionFromUrl(sectionUrl);
      let added = 0;
      for (const item of parsed.items) if (!byId.has(item.id)) { byId.set(item.id, { ...item, section: item.section || section }); added++; }
      deps.log(`  ${sectionUrl} page ${page}/${parsed.maxPage ?? "?"}: ${parsed.products} products, ${added} new sale items (site total ${parsed.total ?? "?"})`);
      if (parsed.products === 0 || (parsed.maxPage && page >= parsed.maxPage)) break;
      if (page === MAX_PAGES_PER_SECTION && parsed.maxPage && parsed.maxPage > page) deps.log(`  ${sectionUrl}: capped at ${MAX_PAGES_PER_SECTION} of ${parsed.maxPage} pages (crawl-delay ${config.crawlDelaySeconds} s)`);
    }
  }
  const items = [...byId.values()];
  deps.log(`${config.brand}: ${listed} listed by the site, ${items.length} real sale items read`);
  const scrapedAt = deps.now().toISOString();
  const result = writeBrandOutput({ brand: config.brand, slug: config.slug, items, catalogueCount: listed, scrapedAt, thirtyDaySource: "history" }, deps);
  deps.log(`\n${summaryLine(config.brand, result)}`);
  return { items, catalogueCount: listed };
}

module.exports = { main, BRANDS, pageUrl, sectionFromUrl, MAX_PAGES_PER_SECTION };

if (require.main === module) {
  main(process.argv[2]).catch((err) => { console.error("LPP fetch failed:", err.stack || err.message); process.exit(1); });
}
