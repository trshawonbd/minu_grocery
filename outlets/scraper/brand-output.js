// The one writer every brand's fetch script uses (Denim Dream, Klick,
// Apotheka, Euronics — see CLAUDE.md's "Outlets" section). Given a
// brand's freshly parsed sale items it:
//   1. records today's sale prices in outlets/data/<slug>-price-history.json
//      (one [date, price] per link PER CHANGE — scraper/price-history.js's
//      pure helpers, the same shape groceries use);
//   2. stamps each item with firstSeen (the first date its link was
//      ever recorded) and the new/permanent/unknown discount status
//      (outlets/scraper/discounts.js — judged against the history as it
//      was BEFORE today, so today's price is never its own reference);
//   3. writes outlets/data/<slug>.json:
//        { brand, scrapedAt, catalogueCount, thirtyDaySource, items }
//      thirtyDaySource is "site" when the brand's own site carries a
//      30-day-lowest field (Denim Dream), "history" when it doesn't
//      (Klick, Apotheka, Euronics) — the app then labels those items
//      plain "Allahindlus" until our own history is 30 days old.
// Pure apart from the two file writes, both injectable for tests.

const fs = require("fs");
const path = require("path");
const { recordPrices } = require("../../scraper/price-history.js");
const { classifyDiscount } = require("./discounts");

const DATA_DIR = path.join(__dirname, "..", "data");

function dataPath(slug) {
  return path.join(DATA_DIR, `${slug}.json`);
}

function historyPath(slug) {
  return path.join(DATA_DIR, `${slug}-price-history.json`);
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

// The first date each link was ever recorded.
function firstSeenByLink(history) {
  const out = {};
  for (const [link, entries] of Object.entries(history)) {
    if (entries && entries.length > 0) out[link] = entries[0][0];
  }
  return out;
}

function writeBrandOutput({ brand, slug, items, catalogueCount, scrapedAt, thirtyDaySource }, deps = {}) {
  const readFile = deps.readJson || readJson;
  const write = deps.writeFile || ((p, text) => fs.writeFileSync(p, text));
  const dateStr = scrapedAt.slice(0, 10);
  const freshPricesByUrl = {};
  for (const item of items) {
    if (item.link) freshPricesByUrl[item.link] = item.salePrice;
  }
  const history = readFile(historyPath(slug), {});
  const { history: nextHistory, changed } = recordPrices(history, dateStr, freshPricesByUrl);
  const firstSeen = firstSeenByLink(nextHistory);
  const stamped = items.map((item) => {
    const dated = { ...item, firstSeen: item.link ? firstSeen[item.link] || dateStr : dateStr };
    return { ...dated, ...classifyDiscount(dated, history, dateStr) };
  });

  fs.mkdirSync(DATA_DIR, { recursive: true });
  write(dataPath(slug), JSON.stringify({ brand, scrapedAt, catalogueCount, thirtyDaySource, items: stamped }, null, 2) + "\n");
  write(historyPath(slug), JSON.stringify(nextHistory, null, 2) + "\n");
  const count = (status) => stamped.filter((i) => i.status === status).length;
  return { written: stamped.length, changed, newCount: count("new"), permanentCount: count("permanent"), unknownCount: count("unknown") };
}

function summaryLine(brand, r) {
  return `Wrote ${r.written} ${brand} sale items (${r.newCount} new, ${r.permanentCount} permanent, ${r.unknownCount} not yet judgeable; ${r.changed} price-history entries changed)`;
}

module.exports = { writeBrandOutput, summaryLine, dataPath, historyPath, readJson, firstSeenByLink };
