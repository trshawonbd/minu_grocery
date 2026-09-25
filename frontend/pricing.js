// Pure price logic shared between the page and its tests — kept out
// of the inline script specifically so a two-way (or more) tie can be
// tested against the exact code the browser runs, not a re-typed copy
// of it. No DOM, no dependencies.

// Which field decides "cheapest" for this product — every category
// compares by pack `price` except Meat (see cheapestByUnitPrice in
// scraper/categories.js and fetch-price.js), which compares by
// storeUnitPrice, the store's own per-kg price. A product missing that
// flag behaves exactly as before this existed.
function rankKey(product) {
  return product.cheapestByUnitPrice ? "storeUnitPrice" : "price";
}

function storeEntries(product) {
  const key = rankKey(product);
  // A store the daily update (scraper/daily-update.js) marked
  // unavailable — its listing disappeared from that store, not
  // repriced — is never shown as a row and never competes for
  // cheapest; its data stays in product.prices (never deleted, so a
  // later run can reactivate it), just excluded here.
  // A store missing the ranking value (shouldn't happen once scraped,
  // but not assumed) sorts to the end rather than winning a NaN
  // comparison — it still shows in the list, just never first.
  return Object.entries(product.prices)
    .filter(([, info]) => !info.unavailable)
    .map(([store, info]) => ({ store, ...info }))
    .sort((a, b) => (a[key] ?? Infinity) - (b[key] ?? Infinity));
}

// The lowest ranking value among a product's stores (pack price, or
// for Meat, per-kg price). Every store whose own value equals this is
// "cheapest" — a tie is a tie, not just entries[0]. `key` defaults to
// "price" so a plain (non-Meat) product works exactly as before.
function cheapestPrice(entries, key = "price") {
  // Only reachable if every store on a product is unavailable — the
  // app hides a product before this once fewer than 2 stores are
  // available, but this stays defensive rather than assuming a caller
  // always does that first.
  if (entries.length === 0) return null;
  return entries[0][key];
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

// A piece-count size ("96tk" — diapers and wet wipes, see
// diaperMatching in scraper/categories.js): the unit price is per
// piece, never per kg. Real bug found on the product screen: a
// diaper's `size` used to be the baby's weight range read as a pack
// weight ("17000g"), and this function turned it into a nonsense
// "€/kg" line. The scraper no longer writes that; this is the display
// side of the same fix.
const PIECE_COUNT_SIZE_PATTERN = /^(\d+)tk$/;

function unitPrice(entry) {
  if (!entry.size) return null;
  const pieces = entry.size.match(PIECE_COUNT_SIZE_PATTERN);
  if (pieces) {
    const count = parseInt(pieces[1], 10);
    return count > 0 ? { value: entry.price / count, unit: "tk" } : null;
  }
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
  const key = rankKey(product);
  const entries = storeEntries(product);
  const lowest = cheapestPrice(entries, key);
  return entries.map((entry) => {
    const value = entry[key];
    // A store missing the ranking value is never marked cheapest and
    // gets no diff/pct — rather than a wrong "cheapest" via a NaN/
    // undefined comparison. Doesn't happen for `price` (always real);
    // only a real possibility for Meat's storeUnitPrice.
    const isCheapest = value != null && lowest != null && value === lowest;
    const diff = value != null && lowest != null ? value - lowest : null;
    const pct = diff == null ? null : lowest > 0 ? (diff / lowest) * 100 : 0;
    return { ...entry, isCheapest, diff, pct, unitPrice: unitPrice(entry) };
  });
}

if (typeof module !== "undefined") {
  module.exports = { storeEntries, cheapestPrice, productRows, unitPrice, rankKey };
}
