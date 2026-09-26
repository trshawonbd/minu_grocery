// Pure parsers for a brand's own sale/outlet page — outlets roadmap
// step 3. Each brand gets its own extractor here (the site shapes
// differ as much as the five malls' did); Denim Dream is first.
//
// Denim Dream's outlet page (https://www.denimdream.com/EE/et/<Sex>/Outlet)
// server-renders its first 50 items as a Next.js __NEXT_DATA__ JSON
// blob — no regex-scraping of HTML needed, just JSON.parse. One
// "item" here is one (product, colour) pair, since that is the level
// with its own link, own picture and own price — a product with two
// colours in the sale is two separate sale items, matching what a
// shopper actually clicks through to.
//
// Only variants where the sale price is genuinely below the regular
// price are kept ("Only real sale items (regular > sale)", the
// owner's rule) — the page's own "sale"/"outlet" flags are read too
// but never trusted alone, the same caution groceries give a loyalty
// price: checked against the real numbers here, not assumed.

function extractNextData(html) {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return null;
  return JSON.parse(m[1]);
}

// `data` is one page's already-parsed __NEXT_DATA__ object (see
// extractNextData). Returns { items, count, size } — count/size are
// the CATALOGUE's own totals (for the fetch script to know it only
// ever sees page 1 — see the fetch script's own comment on why).
function parseDenimDreamPage(data) {
  const pl = data?.props?.pageProps?.initialState?.productsList?.data;
  if (!pl) return { items: [], count: 0, size: 0 };
  const items = [];
  for (const product of pl.products || []) {
    const brand = product.brand?.brand || "";
    const name = `${brand} ${product.model || ""}`.trim();
    for (const color of product.colors || []) {
      if (!color.price) continue;
      const regularPrice = parseFloat(color.price.price);
      const salePrice = parseFloat(color.price.priceDiscount);
      if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice < regularPrice)) continue;
      const discountPercent = Math.round((1 - salePrice / regularPrice) * 100);
      const picture = color.pictures && color.pictures[0];
      items.push({
        id: String(color.productId),
        name,
        regularPrice,
        salePrice,
        discountPercent,
        link: color.shareUrl || null,
        image: picture ? picture.urlMedium : null,
      });
    }
  }
  return { items, count: pl.count || 0, size: pl.size || 0 };
}

module.exports = { extractNextData, parseDenimDreamPage };
