// Pure helpers for the Outletid tab (2026-09-26 app work, roadmap
// step "App") — matching a mall's own shop list (outlets/data/malls.json)
// against a brand's own scraped sale items (outlets/data/denim-dream.json
// today, more brand files later) by shop NAME. Never touches grocery
// data (state.products) — a fully separate section, same as
// outlets/scraper and outlets/data are their own folders from
// scraper/ and data/.
//
// The match is name-based because that's the only thing a mall's own
// shop list and a brand's own site agree on; case-insensitive since
// outlets/scraper/malls.js's cross-mall casing pass and a brand's own
// `brand` field aren't guaranteed to agree on case even though today
// both say "Denim Dream".

function brandKey(name) {
  return (name || "").trim().toLowerCase();
}

// brandFiles: the array of already-fetched brand-data objects
// ({ brand, scrapedAt, catalogueCount, items }), one per file in
// outlets/data/. Returns a Map from a lowercased brand name to that
// brand's data, for shopsWithDiscounts to look a shop's own name up in.
function indexBrandsByName(brandFiles) {
  const byName = new Map();
  for (const brand of brandFiles || []) {
    if (brand && brand.brand) byName.set(brandKey(brand.brand), brand);
  }
  return byName;
}

function mallList(malls) {
  return (malls || []).map((mall) => ({ id: mall.id, name: mall.name, address: mall.address, shopCount: (mall.shops || []).length }));
}

function findMall(malls, mallId) {
  return (malls || []).find((mall) => mall.id === mallId) || null;
}

// Every shop in a mall, each with a `discount` field: null when no
// brand-data file matches that shop's own name, otherwise a real
// summary read from that brand's actually-scraped items (never
// estimated) — { brand, maxPercent, itemCount }.
function shopsWithDiscounts(mall, brandsByName) {
  if (!mall) return [];
  return (mall.shops || []).map((shop) => {
    const brand = brandsByName.get(brandKey(shop.name));
    if (!brand || !Array.isArray(brand.items) || brand.items.length === 0) return { ...shop, discount: null };
    const maxPercent = brand.items.reduce((max, item) => Math.max(max, item.discountPercent), 0);
    return { ...shop, discount: { brand: brand.brand, maxPercent, itemCount: brand.items.length } };
  });
}

// The real sale items for whichever brand a shop's name matches, or
// an empty list when there's no match (a shop with no discount data
// at all, or a shop screen opened directly by name with a typo).
function brandItemsForShopName(brandsByName, shopName) {
  const brand = brandsByName.get(brandKey(shopName));
  return brand ? brand.items : [];
}

if (typeof module !== "undefined") {
  module.exports = { brandKey, indexBrandsByName, mallList, findMall, shopsWithDiscounts, brandItemsForShopName };
}
