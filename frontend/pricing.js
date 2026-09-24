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
    return { ...entry, isCheapest, diff, pct };
  });
}

if (typeof module !== "undefined") {
  module.exports = { storeEntries, cheapestPrice, productRows };
}
