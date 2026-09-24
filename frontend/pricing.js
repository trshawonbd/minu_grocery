// Pure price logic shared between the page and its tests — kept out
// of the inline script specifically so a two-way (or more) tie can be
// tested against the exact code the browser runs, not a re-typed copy
// of it. No DOM, no dependencies.

function storeEntries(product) {
  return Object.entries(product.prices)
    .map(([store, info]) => ({ store, ...info }))
    .sort((a, b) => a.price - b.price);
}

// The lowest price among a product's stores. Every store whose price
// equals this is "cheapest" — a tie is a tie, not just entries[0].
function cheapestPrice(entries) {
  return entries[0].price;
}

// A product's per-kg or per-litre price, computed from `entry.size` —
// the already-normalized size string scraper/match-products.js writes
// into data/prices.json (comma/period and unit already collapsed to
// one base unit, so this only ever sees plain grams or millilitres,
// never kg/l/comma-decimals to reparse). A multipack's own count is
// baked into that string ("6x330ml"), so its total volume/weight is
// used, not the per-unit size — a 6-pack's unit price is price ÷ the
// whole pack's contents, the same number a shopper would compute by
// hand. Display-only: never read by matching or by isCheapest/diff
// above. Returns null whenever there's no size to work from (a store
// that stated no unit at all, or a non-standard shape like a bare
// "10-pack") — skipped on the page rather than guessed at.
const UNIT_PRICE_SIZE_PATTERN = /^(\d+(?:\.\d+)?)(?:x(\d+(?:\.\d+)?))?(g|ml)$/;

function unitPrice(entry) {
  if (!entry.size) return null;
  const match = entry.size.match(UNIT_PRICE_SIZE_PATTERN);
  if (!match) return null;

  const mult = match[2] ? parseFloat(match[1]) : 1;
  const each = match[2] ? parseFloat(match[2]) : parseFloat(match[1]);
  const unit = match[3];
  const totalInBaseUnit = mult * each; // grams or millilitres
  if (!totalInBaseUnit) return null;

  const totalInKgOrL = totalInBaseUnit / 1000;
  return { value: entry.price / totalInKgOrL, unit: unit === "g" ? "kg" : "l" };
}

// Everything the product screen needs per store row, as data rather
// than DOM — so a product with any number of stores (2, 3, ...) can be
// tested against the exact logic the page renders with, the same
// reason storeEntries/cheapestPrice live here instead of inline.
// cardPrice/cardName pass through unchanged when present; they're
// never part of isCheapest/diff, which always read entry.price alone.
function productRows(product) {
  const entries = storeEntries(product);
  const lowest = cheapestPrice(entries);
  return entries.map((entry) => {
    const isCheapest = entry.price === lowest;
    const diff = entry.price - lowest;
    const pct = lowest > 0 ? (diff / lowest) * 100 : 0;
    return { ...entry, isCheapest, diff, pct, unitPrice: unitPrice(entry) };
  });
}

if (typeof module !== "undefined") {
  module.exports = { storeEntries, cheapestPrice, productRows, unitPrice };
}
