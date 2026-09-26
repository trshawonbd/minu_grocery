// Pure logic behind the app screens — search, price gaps, "cheaper
// than usual", and the basket — kept out of the page so every rule
// is tested against the exact code the browser runs. No DOM, no
// dependencies. Relies on pricing.js (storeEntries/rankKey) being
// loaded first in the browser, or required alongside in tests.

const pricingApi = typeof module !== "undefined" ? require("./pricing") : { storeEntries, rankKey };

// A stable identity for a product across data updates: category +
// display name (unique within a category — see uniqueCanonicalNames
// in scraper/scrape-output.js). Used as the basket key.
function productKey(product) {
  return `${product.category}::${product.name}`;
}

// Products the daily update left with fewer than 2 available stores
// are hidden, never deleted — excluded from every screen.
// ---- Alcohol (private testing only) ----
// When false, the three alcohol categories and every product in them
// are gone from the app completely: no tile, no search hit, no
// "biggest differences"/"cheaper than usual" card, no product route,
// no basket line. Estonian alcohol-advertising law: this MUST be
// reviewed with a lawyer and set to false before the app is ever
// public (see CLAUDE.md). The alcohol-free category is not alcohol
// and is never hidden by this.
const SHOW_ALCOHOL = true;
const ALCOHOL_CATEGORIES = new Set(["Beer & cider", "Wine", "Spirits"]);

function isAlcoholProduct(product) {
  return ALCOHOL_CATEGORIES.has(product.category);
}

// Everything the app may show: never a hidden product, and never an
// alcohol product unless SHOW_ALCOHOL. Every screen, the search index
// and the basket read through this.
function visibleProducts(products, showAlcohol = SHOW_ALCOHOL) {
  return products.filter((p) => !p.hidden && (showAlcohol || !isAlcoholProduct(p)));
}

// --- Search ---

// Lowercase, Estonian letters folded to plain ones so "oun" finds
// "õun" and "sokolaad" finds "šokolaad"; any other accent is stripped
// the same way (NFD + combining marks removed). Punctuation becomes
// spaces so "hapukoore-sibula" is found by "sibula".
const LETTER_FOLDS = { õ: "o", ä: "a", ö: "o", ü: "u", š: "s", ž: "z" };

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[õäöüšž]/g, (c) => LETTER_FOLDS[c])
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Built once per data load, not per keystroke — with 1600+ products
// the per-keystroke work is then a few thousand substring checks.
function buildSearchIndex(products) {
  return visibleProducts(products).map((product) => ({
    product,
    key: productKey(product),
    text: normalizeText(`${product.name} ${product.category}`),
  }));
}

// Every query word (in any order) must appear in the product's
// normalized name/category. Empty query -> no results, not everything.
function searchProducts(index, query, limit = 60) {
  const words = normalizeText(query).split(" ").filter(Boolean);
  if (words.length === 0) return [];
  const results = [];
  for (const entry of index) {
    if (words.every((w) => entry.text.includes(w))) {
      results.push(entry.product);
      if (results.length >= limit) break;
    }
  }
  return results;
}

// --- Price gaps ---

// min/max across the product's available stores of the value that
// decides "cheapest" for it (pack price, or per-kg price for the
// unit-price categories — see rankKey in pricing.js), plus the gap
// as a percentage of the most expensive: "up to 45% cheaper".
function priceSummary(product) {
  const key = pricingApi.rankKey(product);
  const entries = pricingApi.storeEntries(product);
  const values = entries.map((e) => e[key]).filter((v) => typeof v === "number");
  if (values.length === 0) return { min: null, max: null, gapPct: 0, storeCount: entries.length, perUnit: key === "storeUnitPrice" };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const gapPct = max > 0 ? ((max - min) / max) * 100 : 0;
  return { min, max, gapPct, storeCount: entries.length, perUnit: key === "storeUnitPrice" };
}

// Products with the largest gap between their cheapest and most
// expensive store, best first. Needs at least two stores with a value.
function biggestDifferences(products, limit = 10) {
  return visibleProducts(products)
    .map((product) => ({ product, summary: priceSummary(product) }))
    .filter(({ summary }) => summary.storeCount >= 2 && summary.gapPct > 0)
    .sort((a, b) => b.summary.gapPct - a.summary.gapPct)
    .slice(0, limit)
    .map(({ product, summary }) => ({ product, gapPct: summary.gapPct }));
}

// --- Cheaper than usual ---

// A store's current price (open to everyone) below the store's own
// stated regular price. A loyalty-card price is NEVER a discount here
// — it isn't read at all. One entry per product: its best discount.
function cheaperThanUsual(products, limit = 20) {
  const results = [];
  for (const product of visibleProducts(products)) {
    let best = null;
    for (const entry of pricingApi.storeEntries(product)) {
      if (typeof entry.regularPrice !== "number" || !(entry.regularPrice > entry.price)) continue;
      const discountPct = ((entry.regularPrice - entry.price) / entry.regularPrice) * 100;
      if (!best || discountPct > best.discountPct) {
        best = { store: entry.store, price: entry.price, regularPrice: entry.regularPrice, discountPct };
      }
    }
    if (best) results.push({ product, ...best });
  }
  return results.sort((a, b) => b.discountPct - a.discountPct).slice(0, limit);
}

// --- Basket ---

const BASKET_STORAGE_KEY = "minu.basket.v1";

// { [productKey]: quantity } — saved in the browser only. Every read
// and write is guarded: storage can be missing, blocked or corrupt.
function loadBasket(storage) {
  try {
    const raw = storage && storage.getItem(BASKET_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const basket = {};
    for (const [key, qty] of Object.entries(parsed)) {
      if (Number.isInteger(qty) && qty > 0) basket[key] = qty;
    }
    return basket;
  } catch (err) {
    return {};
  }
}

function saveBasket(storage, basket) {
  try {
    if (storage) storage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
  } catch (err) {
    // Browser storage unavailable — the basket still works for this
    // page view, it just won't survive a reload.
  }
}

// Returns a NEW basket; a quantity of 0 or less removes the line.
function setBasketQuantity(basket, key, quantity) {
  const next = { ...basket };
  const qty = Math.floor(Number(quantity) || 0);
  if (qty <= 0) delete next[key];
  else next[key] = Math.min(qty, 99);
  return next;
}

function basketCount(basket) {
  return Object.values(basket).reduce((sum, qty) => sum + qty, 0);
}

// Everything the basket screen shows, as data:
// - lines: each basket item that still exists in the data, with qty
// - stores: one row per store, sorted so a store that has EVERY item
//   comes first (cheapest total first); a store missing items is never
//   called cheapest and shows how many it lacks. Ties: every complete
//   store at the lowest total is cheapest.
// - split: the total if every item is bought where it's cheapest, the
//   stores that would take, and how much that saves against the
//   cheapest complete store (null when no store has everything).
// Totals always use the pack price the shopper pays today (`price`) —
// a loyalty-card price is never read.
function compareBasket(products, basket) {
  const byKey = new Map(visibleProducts(products).map((p) => [productKey(p), p]));
  const lines = [];
  for (const [key, qty] of Object.entries(basket)) {
    const product = byKey.get(key);
    if (product && qty > 0) lines.push({ key, product, qty });
  }

  const storeNames = new Set();
  for (const { product } of lines) for (const e of pricingApi.storeEntries(product)) storeNames.add(e.store);

  const stores = [...storeNames].map((store) => {
    let total = 0;
    let missing = 0;
    for (const { product, qty } of lines) {
      const entry = pricingApi.storeEntries(product).find((e) => e.store === store);
      if (entry) total += entry.price * qty;
      else missing++;
    }
    return { store, total: round2(total), missing, complete: lines.length > 0 && missing === 0, isCheapest: false };
  });

  const complete = stores.filter((s) => s.complete);
  const lowest = complete.length > 0 ? Math.min(...complete.map((s) => s.total)) : null;
  for (const s of stores) s.isCheapest = s.complete && s.total === lowest;
  stores.sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? -1 : 1;
    if (a.missing !== b.missing) return a.missing - b.missing;
    return a.total - b.total;
  });

  let splitTotal = 0;
  const storesUsed = new Set();
  for (const { product, qty } of lines) {
    const entries = pricingApi.storeEntries(product);
    if (entries.length === 0) continue;
    const cheapest = entries.reduce((best, e) => (e.price < best.price ? e : best), entries[0]);
    splitTotal += cheapest.price * qty;
    storesUsed.add(cheapest.store);
  }
  splitTotal = round2(splitTotal);
  const saving = lowest === null ? null : round2(lowest - splitTotal);

  return { lines, stores, lowest, split: { total: splitTotal, storesUsed: [...storesUsed], saving } };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

if (typeof module !== "undefined") {
  module.exports = {
    productKey,
    SHOW_ALCOHOL,
    ALCOHOL_CATEGORIES,
    isAlcoholProduct,
    visibleProducts,
    normalizeText,
    buildSearchIndex,
    searchProducts,
    priceSummary,
    biggestDifferences,
    cheaperThanUsual,
    BASKET_STORAGE_KEY,
    loadBasket,
    saveBasket,
    setBasketQuantity,
    basketCount,
    compareBasket,
  };
}
