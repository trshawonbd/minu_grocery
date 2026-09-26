// Pure helpers for the Outletid tab (2026-09-26 app work, roadmap
// step "App") — matching a mall's own shop list (outlets/data/malls.json)
// against a brand's own scraped sale items (outlets/data/denim-dream.json
// today, more brand files later) by shop NAME, and the discount
// list's own filters and sorts. Never touches grocery data
// (state.products) — a fully separate section, same as
// outlets/scraper and outlets/data are their own folders from
// scraper/ and data/.
//
// The match is name-based because that's the only thing a mall's own
// shop list and a brand's own site agree on; case-insensitive since
// outlets/scraper/malls.js's cross-mall casing pass and a brand's own
// `brand` field aren't guaranteed to agree on case even though today
// both say "Denim Dream".

// A mall's second unit of the same chain ("Apotheka 2", "Goldtime II",
// "H&M II korrus") is the same brand — the trailing unit number and a
// floor word are dropped before matching.
function brandKey(name) {
  return (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+(\d+|[ivx]+)(\s+korrus)?$/i, "")
    .trim();
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

// A mall listing the same chain twice ("Apotheka", "Apotheka 2") shows
// ONE row — the online discounts are the same (the owner's rule,
// 2026-09-26). The first listing's category/floor is kept.
function dedupeShopsByBrand(shops) {
  const seen = new Set();
  return (shops || []).filter((shop) => {
    const key = brandKey(shop.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mallList(malls) {
  return (malls || []).map((mall) => ({ id: mall.id, name: mall.name, address: mall.address, shopCount: dedupeShopsByBrand(mall.shops).length }));
}

// --- location and distance (roadmap step 4, 2026-09-26) ---
// The shopper's location lives in the page's memory only (state),
// never in localStorage, the URL or a request of ours — checked by
// a test over index.html. Distances are straight-line (haversine),
// the honest "as the crow flies" figure a radius chip implies.

const EARTH_RADIUS_KM = 6371;
const RADIUS_OPTIONS_KM = [5, 8, 10, null]; // null = "Kõik"
const DEFAULT_RADIUS_KM = 10;

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

// "2.4 km" under ten, "163 km" above — one decimal is meaningful for
// a walk, noise for a drive across the country.
function formatKm(km) {
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;
}

// Every mall with its distance from `location` ({ lat, lon }),
// nearest first; with no location, the malls as they are, distance null.
function mallsWithDistance(malls, location) {
  const list = (malls || []).map((mall) => ({
    ...mall,
    distanceKm: location && typeof mall.lat === "number" && typeof mall.lon === "number" ? haversineKm(location.lat, location.lon, mall.lat, mall.lon) : null,
  }));
  if (!location) return list;
  return list.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
}

// radiusKm null = "Kõik"; a mall with no distance (no location) always passes.
function mallsInRadius(malls, radiusKm) {
  if (radiusKm == null) return malls;
  return (malls || []).filter((mall) => mall.distanceKm != null && mall.distanceKm <= radiusKm);
}

// For a mall row: how many of its (deduped) shops have discount data,
// and the biggest of them — "Apotheka 777 toodet, Klick 30 toodet".
function mallSummary(mall, brandsByName) {
  const withData = dedupeShopsByBrand(shopsWithDiscounts(mall, brandsByName)).filter((shop) => shop.discount);
  const top = withData
    .slice()
    .sort((a, b) => b.discount.itemCount - a.discount.itemCount || a.name.localeCompare(b.name, "et"))
    .slice(0, 3)
    .map((shop) => ({ name: shop.name, count: shop.discount.itemCount }));
  return { discountShops: withData.length, top };
}

// A mall page: shops with discount data first (biggest first), then
// the rest in the mall's own order — one row per brand.
function orderShopsForMall(shops) {
  const unique = dedupeShopsByBrand(shops);
  const withData = unique.filter((s) => s.discount).sort((a, b) => b.discount.itemCount - a.discount.itemCount || a.name.localeCompare(b.name, "et"));
  const rest = unique.filter((s) => !s.discount);
  return [...withData, ...rest];
}

function findMall(malls, mallId) {
  return (malls || []).find((mall) => mall.id === mallId) || null;
}

// A "new" discount is one the scraper judged against the 30-day
// lowest price (outlets/scraper/discounts.js — `status: "new"`);
// everything else is a permanent sale price and never gets a big %
// badge (the owner's rule for every brand, 2026-09-26).
function isNewDiscount(item) {
  return item.status === "new" && typeof item.newPercent === "number";
}

// A brand whose site has no 30-day field, before our own history is
// 30 days old: shown as a plain "Allahindlus", neither new nor
// permanent (the owner's rule for Klick, Apotheka, Euronics).
function isUnknownDiscount(item) {
  return item.status === "unknown";
}

// Every shop in a mall, each with a `discount` field: null when no
// brand-data file matches that shop's own name, otherwise a real
// summary read from that brand's actually-scraped items (never
// estimated) — { brand, itemCount, newCount, maxNewPercent }.
function shopsWithDiscounts(mall, brandsByName) {
  if (!mall) return [];
  return (mall.shops || []).map((shop) => {
    const brand = brandsByName.get(brandKey(shop.name));
    if (!brand || !Array.isArray(brand.items) || brand.items.length === 0) return { ...shop, discount: null };
    const fresh = brand.items.filter(isNewDiscount);
    const maxNewPercent = fresh.reduce((max, item) => Math.max(max, item.newPercent), 0);
    const unknownCount = brand.items.filter(isUnknownDiscount).length;
    return { ...shop, discount: { brand: brand.brand, itemCount: brand.items.length, newCount: fresh.length, maxNewPercent, unknownCount } };
  });
}

// The brand-data object a shop's name matches, or null.
function brandForShopName(brandsByName, shopName) {
  return brandsByName.get(brandKey(shopName)) || null;
}

// The real sale items for whichever brand a shop's name matches, or
// an empty list when there's no match (a shop with no discount data
// at all, or a shop screen opened directly by name with a typo).
function brandItemsForShopName(brandsByName, shopName) {
  const brand = brandForShopName(brandsByName, shopName);
  return brand ? brand.items : [];
}

// --- the discount list's filters and sorts (2026-09-26 redesign) ---

// Sections are the store's own (Naised / Mehed / Lapsed), in this
// fixed order; only those with an item are offered.
const SECTION_ORDER = ["Naised", "Mehed", "Lapsed"];
const SORTS = ["discount", "price", "newest"];
const DEFAULT_OUTLET_FILTER = { section: null, type: null, sort: "discount" };

function itemSections(items) {
  const present = new Set((items || []).map((item) => item.section).filter(Boolean));
  return SECTION_ORDER.filter((s) => present.has(s));
}

// Product types with counts, most common first (ties alphabetical, Estonian
// order) — within the currently selected section, so the chips only
// ever offer a type that has an item to show.
function itemTypes(items, section) {
  const counts = new Map();
  for (const item of items || []) {
    if (section && item.section !== section) continue;
    if (!item.type) continue;
    counts.set(item.type, (counts.get(item.type) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type, "et"));
}

function compareItems(sort) {
  if (sort === "price") return (a, b) => a.salePrice - b.salePrice || b.discountPercent - a.discountPercent || a.name.localeCompare(b.name, "et");
  if (sort === "newest") {
    // First seen most recently first (from the price history's first
    // date per link), the store's own "fresh" flag next, then the
    // store's own listing order — so a brand-new item is on top even
    // on the day everything shares one first-seen date.
    return (a, b) =>
      (b.firstSeen || "").localeCompare(a.firstSeen || "") ||
      (b.fresh === true) - (a.fresh === true) ||
      (a.position ?? Infinity) - (b.position ?? Infinity) ||
      a.name.localeCompare(b.name, "et");
  }
  // "Suurim allahindlus": new discounts first (largest % against the
  // 30-day low first), then not-yet-judgeable "Allahindlus" items,
  // then permanent sale prices — within each by the tavahind gap. A
  // permanent price never outranks a new discount.
  return (a, b) =>
    isNewDiscount(b) - isNewDiscount(a) ||
    (b.newPercent || 0) - (a.newPercent || 0) ||
    isUnknownDiscount(b) - isUnknownDiscount(a) ||
    b.discountPercent - a.discountPercent ||
    a.salePrice - b.salePrice ||
    a.name.localeCompare(b.name, "et");
}

// filter: { section, type, sort } (see DEFAULT_OUTLET_FILTER). A
// section/type that matches nothing yields an empty list rather than
// silently showing everything — the chip the shopper tapped stays
// honest.
function filterAndSortItems(items, filter) {
  const f = { ...DEFAULT_OUTLET_FILTER, ...(filter || {}) };
  const kept = (items || []).filter((item) => (!f.section || item.section === f.section) && (!f.type || item.type === f.type));
  return kept.slice().sort(compareItems(SORTS.includes(f.sort) ? f.sort : "discount"));
}

if (typeof module !== "undefined") {
  module.exports = {
    brandKey, indexBrandsByName, mallList, findMall, shopsWithDiscounts, brandForShopName, brandItemsForShopName, isNewDiscount, isUnknownDiscount,
    SECTION_ORDER, SORTS, DEFAULT_OUTLET_FILTER, itemSections, itemTypes, filterAndSortItems,
    dedupeShopsByBrand, haversineKm, formatKm, mallsWithDistance, mallsInRadius, mallSummary, orderShopsForMall, RADIUS_OPTIONS_KM, DEFAULT_RADIUS_KM,
  };
}
