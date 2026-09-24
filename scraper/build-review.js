// Regenerates data/review.md from already-scraped data only: reads
// data/raw/ (via scraper/raw.js) plus data/prices.json,
// data/ambiguous.json, data/unmatched.json, data/unclassified.json.
// Never contacts a store (see scraper/no-scrape.test.js) — run
// `npm run fetch-prices` first if data/raw/ is missing or stale.
//
// data/prices.json is the source for the matched-products table (the
// real, already-written output the app reads). data/raw/ is used
// alongside it to recompute matchPool's per-category breakdown
// (scraped counts, unmatched/unclassified/ambiguous split) — a pure
// computation over already-scraped items, not a new scrape — which
// then gets cross-checked against the officially written files rather
// than trusted blindly.
//
// Run with: node scraper/build-review.js
// or:       npm run review

const fs = require("fs");
const path = require("path");
const { loadRaw, loadRawPool } = require("./raw");
const { matchPool } = require("./match-products");

const DATA_DIR = path.join(__dirname, "..", "data");
const REVIEW_PATH = path.join(DATA_DIR, "review.md");

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf8"));
}

function esc(s) {
  return String(s).replace(/\|/g, "\\|");
}

function eur(n) {
  return n.toFixed(2) + " €";
}

function storeName(key) {
  return key[0].toUpperCase() + key.slice(1);
}

function main() {
  const rawCategories = loadRaw();
  if (rawCategories.length === 0) {
    throw new Error("data/raw/ is empty — run `npm run fetch-prices` first.");
  }

  const overrides = loadJson("products.json");
  const knownDifferent = loadJson("known-different.json");
  const prices = loadJson("prices.json");
  const ambiguous = loadJson("ambiguous.json");
  const unmatched = loadJson("unmatched.json");
  const unclassified = loadJson("unclassified.json");

  // Recomputed from data/raw/ alone (pure — no network), one entry
  // per category, purely to get a category-tagged breakdown that
  // prices.json/unmatched.json/etc. don't carry on their own.
  const perCategory = rawCategories.map((cat) => {
    const pool = loadRawPool(cat.category);
    const realWarn = console.warn;
    console.warn = () => {};
    const result = matchPool(pool, overrides, knownDifferent);
    console.warn = realWarn;

    const isUnclassified = (item) => !item.signature.isProduce && !item.signature.hasBrand && item.signature.brand === null;
    const unclassifiedCount = result.unmatched.filter(isUnclassified).length;

    return {
      category: cat.category,
      scrapedByStore: Object.fromEntries(Object.entries(cat.stores).map(([store, items]) => [store, items.length])),
      matched: result.matches.length,
      unmatched: result.unmatched.length - unclassifiedCount,
      unclassified: unclassifiedCount,
      ambiguous: result.ambiguous.length,
    };
  });

  // Cross-check against the officially written files rather than
  // trusting the recomputation blindly — if these ever disagree, the
  // files on disk are stale relative to data/raw/ (run fetch-price.js
  // again) rather than review.md being wrong.
  const warnings = [];
  const recomputedMatched = perCategory.reduce((sum, c) => sum + c.matched, 0);
  if (recomputedMatched !== prices.length) {
    warnings.push(`recomputed ${recomputedMatched} matches from data/raw/, but data/prices.json has ${prices.length} — they were likely written from different scrapes.`);
  }
  const recomputedAmbiguous = perCategory.reduce((sum, c) => sum + c.ambiguous, 0);
  if (recomputedAmbiguous !== ambiguous.length) {
    warnings.push(`recomputed ${recomputedAmbiguous} ambiguous groups from data/raw/, but data/ambiguous.json has ${ambiguous.length}.`);
  }
  for (const w of warnings) console.warn(`build-review: ${w}`);

  const lines = [];
  lines.push("# Price comparison review");
  lines.push("");
  lines.push(
    `Generated ${new Date().toISOString().slice(0, 10)} by \`npm run review\` (scraper/build-review.js) from already-scraped data — data/raw/, data/prices.json, data/ambiguous.json, data/unmatched.json, data/unclassified.json. Never contacts a store; run \`npm run fetch-prices\` first for fresh numbers.`
  );
  lines.push("");
  lines.push(
    "Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to `ambiguous.json` instead of a guess. Selver has no live stock signal in its public API, so its price always carries a \"Selver: availability not verified\" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest."
  );
  lines.push("");

  // ---------- Summary ----------
  lines.push("## Summary");
  lines.push("");
  const categoryNames = perCategory.map((c) => c.category);
  lines.push(`| | ${categoryNames.join(" | ")} | Total |`);
  lines.push(`|---|${categoryNames.map(() => "---").join("|")}|---|`);

  const stores = ["Barbora", "Rimi", "Selver"];
  const scrapedRow = perCategory.map((c) => stores.map((s) => c.scrapedByStore[s] || 0).join(" + "));
  const scrapedTotal = perCategory.reduce((sum, c) => sum + stores.reduce((s2, s) => s2 + (c.scrapedByStore[s] || 0), 0), 0);
  lines.push(`| Scraped (Barbora + Rimi + Selver) | ${scrapedRow.join(" | ")} | ${scrapedTotal} |`);

  function matchCountFor(cat, pred) {
    return prices.filter((p) => p.category === cat && pred(p)).length;
  }
  const matchedRow = categoryNames.map((c) => matchCountFor(c, () => true));
  lines.push(`| Matched (any store combination) | ${matchedRow.join(" | ")} | ${matchedRow.reduce((a, b) => a + b, 0)} |`);

  const threeStoreRow = categoryNames.map((c) => matchCountFor(c, (p) => Object.keys(p.prices).length === 3));
  lines.push(`| — at all 3 stores | ${threeStoreRow.join(" | ")} | ${threeStoreRow.reduce((a, b) => a + b, 0)} |`);

  const pairCombos = [["barbora", "rimi"], ["barbora", "selver"], ["rimi", "selver"]];
  for (const [x, y] of pairCombos) {
    const row = categoryNames.map((c) =>
      matchCountFor(c, (p) => {
        const ps = Object.keys(p.prices).sort();
        return ps.length === 2 && ps[0] === [x, y].sort()[0] && ps[1] === [x, y].sort()[1];
      })
    );
    lines.push(`| — at 2 stores only (${storeName(x)} + ${storeName(y)}) | ${row.join(" | ")} | ${row.reduce((a, b) => a + b, 0)} |`);
  }

  lines.push(`| Unmatched | ${perCategory.map((c) => c.unmatched).join(" | ")} | ${perCategory.reduce((s, c) => s + c.unmatched, 0)} |`);
  lines.push(`| Unclassified | ${perCategory.map((c) => c.unclassified).join(" | ")} | ${perCategory.reduce((s, c) => s + c.unclassified, 0)} |`);
  lines.push(`| Ambiguous groups | ${perCategory.map((c) => c.ambiguous).join(" | ")} | ${perCategory.reduce((s, c) => s + c.ambiguous, 0)} |`);
  lines.push("");
  if (warnings.length > 0) {
    lines.push("**Note:** " + warnings.join(" "));
    lines.push("");
  }

  // ---------- Matches ----------
  lines.push("## 1. All matched products");
  lines.push("");
  lines.push("| Product | Category | Barbora | Rimi | Selver | Cheapest |");
  lines.push("|---|---|---|---|---|---|");
  const sorted = [...prices].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  for (const p of sorted) {
    const cellFor = (store) => {
      const e = p.prices[store];
      if (!e) return "—";
      let s = eur(e.price);
      if (e.cardPrice != null) s += ` (${eur(e.cardPrice)} ${e.cardName})`;
      return s;
    };
    const priceVals = Object.values(p.prices).map((e) => e.price);
    const min = Math.min(...priceVals);
    const cheapestStores = Object.entries(p.prices)
      .filter(([, e]) => e.price === min)
      .map(([s]) => storeName(s));
    lines.push(`| ${esc(p.name)} | ${p.category} | ${cellFor("barbora")} | ${cellFor("rimi")} | ${cellFor("selver")} | ${cheapestStores.join(" + ")} |`);
  }
  lines.push("");
  lines.push("Card prices shown in parentheses are informational only — never used to decide the Cheapest column.");
  lines.push("");

  // ---------- Ambiguous ----------
  lines.push("## 2. Ambiguous — needs a person to pick");
  lines.push("");
  lines.push("| Category | Items in the group |");
  lines.push("|---|---|");
  for (const a of ambiguous) {
    const itemsText = a.items.map((i) => `${i.store} "${esc(i.name)}" (${eur(i.price)})`).join("; ");
    lines.push(`| ${a.category} | ${itemsText} |`);
  }
  lines.push("");

  // ---------- Unclassified ----------
  lines.push("## 3. Unclassified");
  lines.push("");
  lines.push("No recognized type and no recognized brand on any side — never had a reliable comparison to begin with.");
  lines.push("");
  lines.push("| Store | Name | Price |");
  lines.push("|---|---|---|");
  for (const u of unclassified) {
    lines.push(`| ${u.store} | ${esc(u.name)} | ${eur(u.price)} |`);
  }
  lines.push("");

  fs.writeFileSync(REVIEW_PATH, lines.join("\n") + "\n");
  console.log(`Wrote data/review.md (${lines.length} lines).`);
  console.log(`Matched: ${matchedRow.reduce((a, b) => a + b, 0)}, unmatched: ${unmatched.length}, unclassified: ${unclassified.length}, ambiguous groups: ${ambiguous.length}.`);
}

main();
