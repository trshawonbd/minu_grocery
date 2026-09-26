// One-time conversion (2026-09-28): rebuilds data/price-history.json
// from the OLD full-snapshot files (data/history/YYYY-MM-DD.json —
// one per day, each a complete copy of that day's data/prices.json)
// with no information lost, then the old files are removed by hand
// once the result is checked. Never contacts a store.
//
// Feeds each snapshot through recordPrices in chronological order,
// exactly the way scraper/daily-update.js feeds one day at a time —
// so the result is identical to what price-history.json would already
// hold had the compact format existed from day one. A URL's every
// real price change across the old snapshots becomes one compact
// [date, price] entry; a URL whose price never changed across two
// consecutive snapshots produces no second entry, which is the whole
// point (not a loss — priceOnDate still answers correctly for every
// day in between, carried forward from the one entry it does have).
//
// Usage: node scraper/convert-history.js
//   (prints a summary; writes data/price-history.json; does NOT
//   delete data/history/ itself — remove those files by hand once
//   you've checked the summary and, if you like, spot-checked a few
//   products with scraper/price-history.js's priceOnDate against the
//   original snapshot files.)

const fs = require("fs");
const path = require("path");
const { recordPrices } = require("./price-history");

const HISTORY_DIR = path.join(__dirname, "..", "data", "history");
const OUTPUT_PATH = path.join(__dirname, "..", "data", "price-history.json");

function main() {
  if (!fs.existsSync(HISTORY_DIR)) {
    console.log("No data/history/ directory — nothing to convert.");
    return;
  }
  const files = fs
    .readdirSync(HISTORY_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort(); // filenames are ISO dates, so lexical sort is chronological

  if (files.length === 0) {
    console.log("No dated snapshot files in data/history/ — nothing to convert.");
    return;
  }

  let history = fs.existsSync(OUTPUT_PATH) ? JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8")) : {};
  let totalChanges = 0;
  for (const file of files) {
    const dateStr = file.replace(".json", "");
    const prices = JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, file), "utf8"));
    const byUrl = {};
    for (const product of prices) for (const entry of Object.values(product.prices)) byUrl[entry.url] = entry.price;
    const result = recordPrices(history, dateStr, byUrl);
    history = result.history;
    totalChanges += result.changed;
    console.log(`${dateStr}: ${Object.keys(byUrl).length} store entries in the snapshot, ${result.changed} new price-history entries`);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(history, null, 2) + "\n");
  const urls = Object.keys(history).length;
  const entries = Object.values(history).reduce((sum, list) => sum + list.length, 0);
  console.log(`\nConverted ${files.length} snapshot file(s) (${totalChanges} entries recorded) into data/price-history.json: ${urls} URLs, ${entries} total [date, price] entries.`);
  console.log("Spot-check a few products, then delete data/history/*.json by hand.");
}

main();
