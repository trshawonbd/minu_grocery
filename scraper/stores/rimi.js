// Fetches a Rimi page and pulls out product name, price, and EAN
// (when present). Accepts either a single product page or a category
// listing page, and always returns an array — one entry per product
// found on that page.
//
// A single product page publishes a schema.org Product block as
// JSON-LD, so that's read directly. A category page doesn't, but
// each product card carries its id/name/brand in a
// `data-gtm-eec-product` attribute — its `price` field, however, is
// not the displayed price (confirmed against the same product's own
// page: e.g. a card showing `"price":0.6` sits next to "4.99 €/kg" in
// the card's own visible markup) and is never used. The real price is
// read from the card's own price display instead, scoped per card so
// a neighboring product's price can't leak in.

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function findEan(source) {
  const text = typeof source === "string" ? source : JSON.stringify(source);
  const match = text.match(/"(?:ean|ean13|gtin|gtin13|gtin14|barcode|upc)"\s*:\s*"?(\d{6,14})"?/i);
  return match ? match[1] : null;
}

// Rimi's own pre-discount price, wherever it's shown, labeled
// "Tavahind" ("regular price"). Present only when a sale is active;
// absent otherwise, so callers fall back to the current price. Never
// found gated behind a loyalty card anywhere in Rimi's public markup
// (checked category and product pages, no "Rimi kaart"/"kliendikaart"
// text at all) — so unlike Barbora, there's no cardPrice/cardName to
// extract here, only price vs regularPrice.
const OLD_PRICE_PATTERN = /Tavahind:\s*([\d.,]+)\s*(?:€|\\u20ac)/;

function findRegularPrice(html, fallbackPrice) {
  const match = html.match(OLD_PRICE_PATTERN);
  return match ? parseFloat(match[1].replace(",", ".")) : fallbackPrice;
}

function parseSingleProduct(html, url) {
  const ldJsonMatch = html.match(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
  );

  if (!ldJsonMatch) {
    return null;
  }

  // The block's "description" field contains raw, unescaped newlines,
  // which makes it invalid JSON — so pull out just the fields we need
  // instead of parsing the whole thing.
  const ldJson = ldJsonMatch[1];
  const nameMatch = ldJson.match(/"name":\s*"([^"]+)"/);
  const priceMatch = ldJson.match(/"price":\s*"?(\d+(?:\.\d+)?)"?/);
  const currencyMatch = ldJson.match(/"priceCurrency":\s*"([^"]+)"/);

  if (!nameMatch || !priceMatch) {
    throw new Error("Rimi: could not find product name or price on the page");
  }

  const name = nameMatch[1].trim();
  const price = parseFloat(priceMatch[1]);
  const currency = currencyMatch ? currencyMatch[1] : "EUR";

  if (price === 0) {
    throw new Error(`Rimi: ${name} has no real price (temporarily unavailable)`);
  }

  const regularPrice = findRegularPrice(html, price);
  const unitPrice = findCardUnitPrice(html);

  // No reliable brand source found on a single product page (no brand
  // facet there, unlike a category listing) — falls back to the
  // name-guessing heuristic in match-products.js, same as before.
  return [
    {
      store: "Rimi",
      name,
      price,
      regularPrice,
      cardPrice: null,
      cardName: null,
      brand: null,
      storeUnitPrice: unitPrice ? unitPrice.value : null,
      currency,
      url,
      ean: findEan(html),
    },
  ];
}

// The current price, scoped to one product card: "price-tag
// card__price" holds it, distinct from "old-price-tag card__old-price"
// (the crossed-out pre-discount price) which sits right next to it in
// the same card — matching the more specific class name first avoids
// ever reading the old price. Returns null for an out-of-stock card,
// which has neither ("Ei ole saadaval" / "not available" instead of a
// price) — null means no price, never 0.
const CARD_PRICE_PATTERN = /(?<!old-)price-tag card__price">\s*<span class="sr-only">\s*([\d.,]+)\s*€/;

function findCardPrice(cardHtml) {
  const match = cardHtml.match(CARD_PRICE_PATTERN);
  return match ? parseFloat(match[1].replace(",", ".")) : null;
}

// Rimi's own per-kg (or per-l) price, printed on every card regardless
// of whether the item is a fixed pack or sold "per kg" — computed by
// Rimi itself from the real pack weight, not derived from parsing a
// weight out of the name. Absent only on an out-of-stock card (same as
// the main price). See storeUnitPrice in match-products.js/fetch-price.js.
const CARD_UNIT_PRICE_PATTERN = /Hind ühiku kohta:\s*([\d.,]+)\s*€\/(kg|l)/;

function findCardUnitPrice(cardHtml) {
  const match = cardHtml.match(CARD_UNIT_PRICE_PATTERN);
  return match ? { value: parseFloat(match[1].replace(",", ".")), unit: match[2] } : null;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Rimi's own product data (the gtm-eec-product payload's "brand"
// field) is unreliable — always null in practice, checked across
// several categories. The real per-category brand list lives in the
// "Kaubamärk" ("Brand" on English-locale pages) filter facet instead,
// e.g. `data-facet-name="Kaubamärk"` with each checkbox's value
// containing `brand:Alma`, `brand:MO+Saaremaa`, etc. — one list per
// page, not per item.
const BRAND_FACET_PATTERN = /data-facet-name="(?:Kaubamärk|Brand)"[\s\S]*?<\/ul>/;
const BRAND_FACET_VALUE_PATTERN = /brand:([^"&]+)"/g;

function extractBrandFacet(html) {
  const facetMatch = html.match(BRAND_FACET_PATTERN);
  if (!facetMatch) return [];

  const brands = new Set();
  for (const m of facetMatch[0].matchAll(BRAND_FACET_VALUE_PATTERN)) {
    brands.add(decodeURIComponent(m[1].replace(/\+/g, " ")));
  }

  // Longest first, so a specific sub-brand ("Rimi Smart") is checked
  // for before its shorter, more generic parent ("Rimi").
  return [...brands].sort((a, b) => b.length - a.length);
}

// Finds which of a page's real brands appears in one product's name —
// the per-item link the facet list itself doesn't provide.
//
// Built from the brand's own letter-runs (splitting on any spaces or
// dots), joined back with a separator that tolerates any mix of
// spaces and dots between them, not just the exact mix the facet
// string itself happens to use. Real case found by hand: the facet
// lists "A. Le Coq" (dot, then a space), but some item names write it
// "A.Le Coq" (dot, no space) — the old regex required the facet's
// own spacing verbatim, so that pairing never matched. Each letter-run
// is still required verbatim and in its own order — this only
// relaxes the punctuation between them, it never makes part of the
// brand name itself optional, so it can't start matching an unrelated
// or partial brand.
function findBrandForName(name, brandFacet) {
  for (const brand of brandFacet) {
    const tokens = brand.split(/[\s.]+/).filter(Boolean).map(escapeRegExp);
    const pattern = new RegExp(`\\b${tokens.join("[\\s.]*")}\\b`, "i");
    if (pattern.test(name)) return brand;
  }
  return null;
}

function parseCategoryListing(html) {
  const brandFacet = extractBrandFacet(html);

  // Path segment after the locale varies by language ("products" in
  // English, "tooted" in Estonian) — match either instead of
  // hardcoding one, or every item's url silently ends up null.
  const urlPattern = /href="(\/epood\/[a-z]{2}\/(?:products|tooted)\/[^"]+\/p\/(\d+))"/g;

  const urlById = new Map();
  let urlEntry;
  while ((urlEntry = urlPattern.exec(html)) !== null) {
    urlById.set(urlEntry[2], `https://www.rimi.ee${urlEntry[1]}`);
  }

  // Split into one chunk per product card so each card's price can
  // only ever come from that same card — a global price search across
  // the whole page would drift onto a neighboring card whenever a card
  // in between has no price of its own (out of stock).
  const cards = html.split('<li class="product-grid__item">').slice(1);

  const products = [];
  for (const card of cards) {
    const match = card.match(/data-gtm-eec-product='([^']+)'/);
    if (!match) continue;

    const data = JSON.parse(match[1]);
    const price = findCardPrice(card);
    if (price === null) continue; // out of stock — no price, so no item

    const cardUnitPrice = findCardUnitPrice(card);
    const url = urlById.get(String(data.id)) || null;
    // The category root ("puuviljad-koogiviljad-lilled") ends in the
    // same word, so this only matches the flower/plant subcategory's
    // own path segment — never a false hit on the root's name. Herbs
    // live under a sibling segment ("maitsetaimed") and are unaffected.
    if (url && url.includes("/lilled/")) continue;

    const name = data.name.trim();

    products.push({
      store: "Rimi",
      name,
      price,
      regularPrice: findRegularPrice(card, price),
      cardPrice: null,
      cardName: null,
      brand: findBrandForName(name, brandFacet),
      storeUnitPrice: cardUnitPrice ? cardUnitPrice.value : null,
      currency: data.currency || "EUR",
      url,
      ean: findEan(data),
    });
  }

  return products;
}

async function fetchRimiPrice(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`Rimi: HTTP ${response.status}`);
  }

  const html = await response.text();

  const single = parseSingleProduct(html, url);
  if (single) {
    return single;
  }

  const products = parseCategoryListing(html);
  if (products.length === 0) {
    throw new Error("Rimi: could not find any product data on the page");
  }

  return products;
}

module.exports = { fetchRimiPrice, findBrandForName };
