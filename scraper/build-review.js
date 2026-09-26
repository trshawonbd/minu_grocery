// Regenerates data/review.md from already-scraped data only: reads
// data/raw/ (via scraper/raw.js) and data/prices.json. Never contacts
// a store (see scraper/no-scrape.test.js) — run `npm run fetch-prices`
// first if data/raw/ is missing or stale.
//
// data/prices.json is the source for the matched-products table — it
// merges by category across runs, so it's always complete regardless
// of which categories were last refreshed. data/unmatched.json,
// data/unclassified.json, and data/ambiguous.json do NOT merge — a
// single-category fetch-price.js run overwrites them down to just
// that category's leftovers (by design, see fetch-price.js), so they
// go stale for every other category the moment a partial run happens.
// Reading them here would silently understate older categories'
// unmatched/ambiguous counts. Recomputing matchPool fresh from
// data/raw/ (a pure computation over already-scraped items, no
// network) for every category currently on disk avoids that — it's
// always complete, and the total is cross-checked against
// data/prices.json rather than trusted blindly.
//
// Run with: node scraper/build-review.js
// or:       npm run review

const fs = require("fs");
const path = require("path");
const { loadRaw, loadRawPool } = require("./raw");
const { buildSingles } = require("./build-singles");
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

function toLeftoverEntry(item) {
  return { store: item.store, name: item.name, price: item.price };
}

// "Possible matches to check by hand": unmatched pairs (cross-store,
// same real brand) where everything that gates a match already
// agrees — size, qualifiers, variant, fat % — and only the leftover
// descriptor words (flavour, or whatever else is left over once
// brand/size/fat % are removed) differ, by exactly one word on either
// side (a pure addition/removal, or a single one-for-one swap; never
// more). This is a strictly narrower net than "descriptors differ" —
// most of that bucket is two genuinely different products that happen
// to share a brand, not a near miss. Found by hand, not matched
// automatically — a person still has to look at each one.
const MAX_POSSIBLE_MATCHES_PER_CATEGORY = 30;

function findPossibleMatches(unmatchedItems) {
  const results = [];
  const seen = new Set();

  for (const a of unmatchedItems) {
    if (results.length >= MAX_POSSIBLE_MATCHES_PER_CATEGORY) break;
    for (const b of unmatchedItems) {
      if (a === b || a.store === b.store) continue;
      const key = a.store + a.name < b.store + b.name ? `${a.store}${a.name}~~${b.store}${b.name}` : `${b.store}${b.name}~~${a.store}${a.name}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const sa = a.signature, sb = b.signature;
      if (!sa.brand || !sb.brand || sa.brand !== sb.brand) continue;
      if (sa.qualifiers !== sb.qualifiers) continue;
      if (sa.variant !== sb.variant) continue;
      if (sa.fatPercent !== sb.fatPercent) continue;
      if (!sa.size || !sb.size || sa.size !== sb.size) continue;
      if (sa.descriptors === sb.descriptors) continue; // would already have matched

      const wordsA = sa.descriptors ? sa.descriptors.split(" ") : [];
      const wordsB = sb.descriptors ? sb.descriptors.split(" ") : [];
      const onlyA = wordsA.filter((w) => !wordsB.includes(w));
      const onlyB = wordsB.filter((w) => !wordsA.includes(w));
      if (onlyA.length > 1 || onlyB.length > 1) continue;

      results.push({ a: toLeftoverEntry(a), b: toLeftoverEntry(b) });
      if (results.length >= MAX_POSSIBLE_MATCHES_PER_CATEGORY) break;
    }
  }
  return results;
}

function main() {
  const rawCategories = loadRaw();
  if (rawCategories.length === 0) {
    throw new Error("data/raw/ is empty — run `npm run fetch-prices` first.");
  }

  const overrides = loadJson("products.json");
  const knownDifferent = loadJson("known-different.json");
  const prices = loadJson("prices.json");

  // Recomputed from data/raw/ alone (pure — no network), one entry
  // per category currently on disk — always complete, unlike the
  // leftover files (see header comment above).
  const unclassifiedItems = [];
  const ambiguousGroups = [];
  const possibleMatchesByCategory = [];
  const perCategory = rawCategories.map((cat) => {
    const pool = loadRawPool(cat.category);
    const realWarn = console.warn;
    console.warn = () => {};
    const result = matchPool(pool, overrides, knownDifferent);
    console.warn = realWarn;

    const isUnclassified = (item) => !item.signature.isProduce && !item.signature.hasBrand && item.signature.brand === null;
    const categoryUnclassified = result.unmatched.filter(isUnclassified);
    for (const item of categoryUnclassified) unclassifiedItems.push(toLeftoverEntry(item));
    for (const { items } of result.ambiguous) ambiguousGroups.push({ category: cat.category, items: items.map(toLeftoverEntry) });

    const possibleMatches = findPossibleMatches(result.unmatched);
    if (possibleMatches.length > 0) possibleMatchesByCategory.push({ category: cat.category, pairs: possibleMatches });

    return {
      category: cat.category,
      scrapedByStore: Object.fromEntries(Object.entries(cat.stores).map(([store, items]) => [store, items.length])),
      matched: result.matches.length,
      unmatched: result.unmatched.length - categoryUnclassified.length,
      unclassified: categoryUnclassified.length,
      ambiguous: result.ambiguous.length,
    };
  });

  // Cross-checked against data/prices.json specifically — unlike the
  // leftover files, it does merge by category across runs, so it's
  // safe to compare against a full recomputation from data/raw/. A
  // mismatch means data/raw/ has moved on since the last
  // fetch-price.js run that touched prices.json (stale, not wrong).
  const recomputedMatched = perCategory.reduce((sum, c) => sum + c.matched, 0);
  let warning = null;
  if (recomputedMatched !== prices.length) {
    warning = `recomputed ${recomputedMatched} matches from data/raw/, but data/prices.json has ${prices.length} — data/raw/ has moved on since the last run that wrote prices.json for some category.`;
    console.warn(`build-review: ${warning}`);
  }

  const lines = [];
  lines.push("# Price comparison review");
  lines.push("");
  lines.push(
    `Generated ${new Date().toISOString().slice(0, 10)} by \`npm run review\` (scraper/build-review.js) from already-scraped data — data/raw/ and data/prices.json. Never contacts a store; run \`npm run fetch-prices\` first for fresh numbers. Unmatched/unclassified/ambiguous counts and listings are recomputed fresh from data/raw/ every time (not read from data/unmatched.json etc., which a single-category run narrows to just that category — see the comment at the top of this file).`
  );
  lines.push("");
  lines.push(
    "Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to the ambiguous list instead of a guess. Selver has no live stock signal in its public API, so its price always carries a \"Selver: availability not verified\" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest."
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
  if (warning) {
    lines.push("**Note:** " + warning);
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
  for (const a of ambiguousGroups) {
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
  for (const u of unclassifiedItems) {
    lines.push(`| ${u.store} | ${esc(u.name)} | ${eur(u.price)} |`);
  }
  lines.push("");

  // ---------- Possible matches to check by hand ----------
  lines.push("## 4. Possible matches to check by hand");
  lines.push("");
  lines.push(
    `Not matched automatically — just a list. Same real brand, same size, same qualifiers/variant/fat %, and the leftover descriptor words differ by exactly one (a single addition, removal, or swap). Capped at ${MAX_POSSIBLE_MATCHES_PER_CATEGORY} pairs per category.`
  );
  lines.push("");
  if (possibleMatchesByCategory.length === 0) {
    lines.push("None found this run.");
    lines.push("");
  }
  for (const { category, pairs } of possibleMatchesByCategory) {
    lines.push(`### ${category} (${pairs.length})`);
    lines.push("");
    lines.push("| Item A | Item B |");
    lines.push("|---|---|");
    for (const { a, b } of pairs) {
      lines.push(`| ${a.store} "${esc(a.name)}" (${eur(a.price)}) | ${b.store} "${esc(b.name)}" (${eur(b.price)}) |`);
    }
    lines.push("");
  }

  fs.writeFileSync(REVIEW_PATH, lines.join("\n") + "\n");
  console.log(`Wrote data/review.md (${lines.length} lines).`);
  console.log(
    `Matched: ${matchedRow.reduce((a, b) => a + b, 0)}, unmatched: ${perCategory.reduce((s, c) => s + c.unmatched, 0)}, ` +
      `unclassified: ${unclassifiedItems.length}, ambiguous groups: ${ambiguousGroups.length}.`
  );
  // The app's "Ainult ühes poes" search section — see build-singles.js.
  const singles = buildSingles();
  console.log(`Wrote ${singles.length} single-store listings to data/singles.json.`);
}

main();
