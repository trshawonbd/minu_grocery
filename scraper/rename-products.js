// Recomputes ONLY the display name of every automatically matched
// product in data/prices.json, from the same raw items (looked up by
// URL in data/raw/) the match was built from — no re-matching, no
// price change, no product added or removed. For when a naming rule
// changed (the owner's 2026-09-27 call: word order and spelling as the
// store writes them) and every category's names should follow, including
// the daily-updated ones (Fruits & vegetables, Bread, Drinks) that
// rebuild-prices.js must never re-match. Never contacts a store.
//
// Names set by hand in data/products.json (matchedVia "override") are
// kept. A product whose raw item is gone from data/raw/ keeps its old
// name (logged). Within a category no two products may share a name —
// the same uniqueCanonicalNames guard the scrape uses.
//
// Usage: node scraper/rename-products.js            (every category)
//        node scraper/rename-products.js "Wine"     (named categories)

const fs = require("fs");
const path = require("path");
const { loadRawPool } = require("./raw");
const { CATEGORIES } = require("./categories");
const { synthesizeCanonicalName } = require("./match-products");
const { withCurrentSettings, uniqueCanonicalNames } = require("./scrape-output");

const OUTPUT_PATH = path.join(__dirname, "..", "data", "prices.json");

// Pure: returns { products, renamed, kept } for one category's products.
function renameCategory(category, products) {
  let pool;
  try {
    pool = withCurrentSettings(loadRawPool(category.name), category);
  } catch (err) {
    return { products, renamed: 0, kept: products.length, note: err.message };
  }
  const byUrl = new Map(pool.map((item, index) => [item.url, { item, index }]));
  const pseudo = products.map((product) => {
    if (product.matchedVia !== "automatic") return { product, items: [], canonicalName: product.name, fixed: true };
    const found = Object.values(product.prices).map((entry) => byUrl.get(entry.url));
    if (found.some((f) => !f) || found.length < 2) return { product, items: [], canonicalName: product.name, fixed: true };
    const items = found.sort((x, y) => x.index - y.index).map((f) => f.item);
    return { product, items, canonicalName: synthesizeCanonicalName(items[0], items[1], items.slice(2)), fixed: false };
  });
  // The duplicate guard needs each match's items to pick a distinguishing
  // word; a kept product contributes its own store names for that.
  const guarded = uniqueCanonicalNames(pseudo.map((m) => ({ ...m, items: m.items.length ? m.items : Object.values(m.product.prices).map((e) => ({ name: e.storeName || "" })) })));
  let renamed = 0;
  const out = guarded.map((m, i) => {
    const target = pseudo[i];
    if (target.fixed || m.canonicalName === target.product.name) return target.product;
    renamed++;
    return { ...target.product, name: m.canonicalName };
  });
  return { products: out, renamed, kept: products.length - renamed };
}

function main() {
  const requested = process.argv.slice(2);
  const wanted = requested.length ? CATEGORIES.filter((c) => requested.includes(c.name)) : CATEGORIES;
  if (requested.length && wanted.length !== requested.length) throw new Error(`Unknown category among: ${requested.join(", ")}`);
  const prices = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
  const result = [];
  let total = 0;
  for (const category of wanted) {
    const own = prices.filter((p) => p.category === category.name);
    if (own.length === 0) continue;
    const { products, renamed, note } = renameCategory(category, own);
    const byOld = new Map(products.map((p, i) => [own[i], p]));
    result.push([category.name, byOld]);
    total += renamed;
    console.log(`${category.name}: ${renamed} of ${own.length} names changed${note ? ` (${note})` : ""}`);
  }
  const lookup = new Map(result.flatMap(([, m]) => [...m.entries()]));
  const out = prices.map((p) => lookup.get(p) || p);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`Renamed ${total} products; ${out.length} products written, nothing else touched.`);
}

if (require.main === module) main();

module.exports = { renameCategory };
