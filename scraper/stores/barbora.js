// Fetches a Barbora page and pulls out product name, price, and EAN
// (when present). Accepts either a single product page or a category
// listing page, and always returns an array — one entry per product
// found on that page. Barbora doesn't expose structured product
// data, so this reads values out of the page's embedded JSON state.

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const CATEGORY_LIST_PATTERN = /window\.b_productList\s*=\s*(\[[\s\S]*?\]);/;

function cleanTitle(title) {
  return title.replace(/\\r\\n/g, " ").replace(/\s+/g, " ").trim();
}

// Barbora doesn't label a product's EAN/GTIN/barcode anywhere we've
// found, on either a product page or a category listing — but if a
// future page (or product) does include one under any of these
// common names, anywhere in its data, this will pick it up.
function findEan(source) {
  const text = typeof source === "string" ? source : JSON.stringify(source);
  const match = text.match(/"(?:ean|ean13|gtin|gtin13|gtin14|barcode|upc)"\s*:\s*"?(\d{6,14})"?/i);
  return match ? match[1] : null;
}

// Splits a raw product's price into what price fairness requires:
// `price` is what any shopper can pay today (a cardless sale counts;
// a loyalty-card-only one doesn't), `regularPrice` is the normal
// non-sale price, and `cardPrice`/`cardName` are set only when the
// active promotion requires the Aitäh card — in which case `price`
// falls back to the regular price, since that loyalty price isn't
// available to everyone. `p.retail_price` is only present at all when
// a promotion exists — absent otherwise, so `price` doubles as the
// regular price on an unpromoted item.
function splitPrice(p) {
  const regularPrice = p.retail_price ?? p.price;

  if (p.promotion && p.promotion.loyaltyCardRequired) {
    return { price: regularPrice, regularPrice, cardPrice: p.price, cardName: "Aitäh" };
  }

  return { price: p.price, regularPrice, cardPrice: null, cardName: null };
}

async function fetchBarboraPrice(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`Barbora: HTTP ${response.status}`);
  }

  const html = await response.text();

  const listMatch = html.match(CATEGORY_LIST_PATTERN);
  if (listMatch) {
    let products;
    try {
      products = JSON.parse(listMatch[1]);
    } catch (err) {
      throw new Error(`Barbora: could not parse category product list (${err.message})`);
    }

    return products
      .map((p) => ({
        store: "Barbora",
        name: cleanTitle(p.title),
        ...splitPrice(p),
        currency: "EUR",
        url: `https://barbora.ee/toode/${p.Url}`,
        ean: findEan(p),
        // The basis Barbora prints its comparative price against ("kg"
        // in "17,38 €/kg", or "tk" for per-item goods). Used only as a
        // fallback when the product name states no unit of its own —
        // see computeSignature in match-products.js.
        unit: p.comparative_unit || null,
        // Barbora's own per-kg (or per-l/per-tk) price, computed by
        // Barbora itself from the real pack weight — not derived from
        // parsing a weight out of the name, so it's available even for
        // items priced "per kg" with no weight of their own (most of
        // meat). See storeUnitPrice in match-products.js/fetch-price.js.
        storeUnitPrice: typeof p.comparative_unit_price === "number" ? p.comparative_unit_price : null,
        // The real, store-assigned brand — confirmed reliable across
        // categories (APTAMIL, KADARBIKU, ALMA, ...) and correctly
        // empty for the one genuinely unbranded item found by hand
        // ("Või 82% 200g"). Used in place of guessing a brand from the
        // name — see computeSignature in match-products.js.
        brand: p.brand_name ? p.brand_name.trim() : null,
        // Barbora's own CDN URL for the product photo (the medium
        // size, `big_image`; `image` is the thumbnail) — stored as a
        // URL only, never downloaded, so the app can hotlink it. See
        // SHOW_STORE_IMAGES in frontend/pricing.js and CLAUDE.md.
        image: p.big_image || p.image || null,
      }))
      // Barbora reports 0 for an item that's temporarily unavailable —
      // never a real price. Drop it rather than match on it: no price
      // is not the same thing as a free product.
      .filter((item) => item.price > 0);
  }

  const nameMatch = html.match(/"title":"([^"]+)"/);
  const priceMatch = html.match(/"price":(\d+(?:\.\d+)?)/);

  if (!nameMatch || !priceMatch) {
    throw new Error("Barbora: could not find product name or price on the page");
  }

  const name = cleanTitle(nameMatch[1]);
  // A single product page embeds the same fields as a category
  // listing's entries, just not inside an array — matched directly.
  const retailPriceMatch = html.match(/"retail_price":(\d+(?:\.\d+)?)/);
  const loyaltyMatch = html.match(/"loyaltyCardRequired":(true|false)/);
  const brandMatch = html.match(/"brand_name":"([^"]*)"/);
  const unitPriceMatch = html.match(/"comparative_unit_price":(\d+(?:\.\d+)?)/);
  const { price, regularPrice, cardPrice, cardName } = splitPrice({
    price: parseFloat(priceMatch[1]),
    retail_price: retailPriceMatch ? parseFloat(retailPriceMatch[1]) : undefined,
    promotion: loyaltyMatch ? { loyaltyCardRequired: loyaltyMatch[1] === "true" } : null,
  });

  if (price === 0) {
    throw new Error(`Barbora: ${name} has no real price (temporarily unavailable)`);
  }

  const brand = brandMatch && brandMatch[1].trim() ? brandMatch[1].trim() : null;
  const storeUnitPrice = unitPriceMatch ? parseFloat(unitPriceMatch[1]) : null;

  return [
    { store: "Barbora", name, price, regularPrice, cardPrice, cardName, brand, storeUnitPrice, currency: "EUR", url, ean: findEan(html) },
  ];
}

module.exports = { fetchBarboraPrice, splitPrice };
