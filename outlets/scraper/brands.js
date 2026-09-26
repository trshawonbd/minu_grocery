// Pure parsers for a brand's own sale data — outlets roadmap step 3.
// Each brand gets its own extractor here (the site shapes differ as
// much as the five malls' did); Denim Dream is first.
//
// Denim Dream serves ONE product shape in two places: the first 50
// items of a section are server-rendered into the page's Next.js
// __NEXT_DATA__ blob, and every page (including page 1) comes from
// its own JSON list API (api-v2.denimdream.com, see
// fetch-denim-dream.js). Both carry the same `products` array, so one
// parser reads both. One "item" is one (product, colour) pair — the
// level with its own link, own picture and own price; a product with
// two colours in the sale is two sale items, matching what a shopper
// actually clicks through to.
//
// Only variants whose sale price is genuinely below the regular price
// are kept ("Only real sale items (regular > sale)", the owner's
// rule) — the API's own sale/outlet flags are never trusted alone,
// the same caution groceries give a loyalty price: checked against
// the real numbers here.

// The API's own sexId values: 1 Mehed, 2 Naised, 3 Lapsed (the kids'
// section as a whole), 4 Poisid, 5 Tüdrukud, 6 Unisex Kids — the
// last four are all "Lapsed" on screen, the store's own three tabs.
const SECTION_BY_SEX_ID = { 1: "Mehed", 2: "Naised", 3: "Lapsed", 4: "Lapsed", 5: "Lapsed", 6: "Lapsed" };

function extractNextData(html) {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return null;
  return JSON.parse(m[1]);
}

// `list` is the API's own list object ({ products, count, size, page })
// — identical in shape to the page blob's productsList.data. Returns
// { items, count, size }; count/size are the CATALOGUE's totals, for
// the fetch script to know when it has the last page.
function parseDenimDreamProducts(list) {
  if (!list) return { items: [], count: 0, size: 0 };
  const items = [];
  for (const product of list.products || []) {
    const brand = product.brand?.brand || "";
    const name = (product.model || "").trim();
    const sexId = product.sex?.sexId;
    const section = SECTION_BY_SEX_ID[sexId] || (product.sex?.kids ? "Lapsed" : product.sex?.sexLocal || null);
    const type = product.category?.categoryLocal || product.modelType || null;
    for (const color of product.colors || []) {
      if (!color.price) continue;
      const regularPrice = parseFloat(color.price.price);
      const salePrice = parseFloat(color.price.priceDiscount);
      if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice < regularPrice)) continue;
      const discountPercent = Math.round((1 - salePrice / regularPrice) * 100);
      const picture = color.pictures && color.pictures[0];
      items.push({
        id: String(color.productId),
        brand,
        name,
        section,
        type,
        regularPrice,
        salePrice,
        discountPercent,
        link: color.shareUrl || null,
        image: picture ? picture.urlMedium : null,
        fresh: product.fresh === true,
        position: typeof product.position === "number" ? product.position : null,
      });
    }
  }
  return { items, count: list.count || 0, size: list.size || 0 };
}

// The page-1 HTML route (a whole page's parsed __NEXT_DATA__).
function parseDenimDreamPage(data) {
  return parseDenimDreamProducts(data?.props?.pageProps?.initialState?.productsList?.data);
}

module.exports = { extractNextData, parseDenimDreamProducts, parseDenimDreamPage, SECTION_BY_SEX_ID };
