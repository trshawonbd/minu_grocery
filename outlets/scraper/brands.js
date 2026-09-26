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
      // A non-sale listing carries priceDiscount "0.00" (found 2026-09-26:
      // 0 < regular would have read as "100% off") — the sale price must
      // be a real price, above zero and below the regular one.
      if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice)) continue;
      const discountPercent = Math.round((1 - salePrice / regularPrice) * 100);
      const priceMin30 = parseFloat(color.price.priceMinOf30Days);
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
        // The site's own "30 päeva soodsaim hind" (EU rule) and which
        // campaign the sale price belongs to — what "new vs permanent"
        // is judged against (outlets/scraper/discounts.js).
        priceMin30: Number.isFinite(priceMin30) && priceMin30 > 0 ? priceMin30 : null,
        campaignId: typeof color.price.campaignId === "number" ? color.price.campaignId : null,
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

// --- Klick (www.klick.ee) — its Vue Storefront catalog API, the same
// stack as Selver's allowed path: vsf-api.klick.ee/api/catalog/
// vue_storefront_catalog_et/product/_search. The sale list is the
// site's own "Parimad pakkumised" category (id 60). Prices: the
// *_incl_tax fields (what a shopper pays); the plain page's HTML
// prints the sale price twice (found 2026-09-26), so the API is the
// only reliable source. No 30-day field anywhere in the API.
const KLICK_SALE_CATEGORY_ID = 60;
// The shop's real top-level departments (level 2 in its tree) — the
// filter chips; every other level-2 node is a campaign/brand landing
// page ("Must reede", "Apple Days", "Parimad pakkumised" itself).
const KLICK_DEPARTMENT_IDS = new Set([4, 7, 10, 11, 12, 13]);

function buildKlickCategoryIndex(categoryHits) {
  const byId = new Map();
  for (const hit of categoryHits || []) {
    const c = hit._source || hit;
    byId.set(c.id, { id: c.id, name: c.name, level: c.level, path: c.path || "" });
  }
  return byId;
}

// The department (level-2 ancestor) a product belongs to, from any of
// its categories whose path runs through a real department; else the
// deepest category's own name; else null.
function klickTypeFor(product, categoriesById) {
  let deepest = null;
  for (const id of product.category_ids || []) {
    const cat = categoriesById.get(id);
    if (!cat) continue;
    const l2 = Number(cat.path.split("/")[2]);
    if (KLICK_DEPARTMENT_IDS.has(l2)) return categoriesById.get(l2).name;
    if (cat.id !== KLICK_SALE_CATEGORY_ID && (!deepest || cat.level > deepest.level)) deepest = cat;
  }
  return deepest ? deepest.name : null;
}

function parseKlickProducts(productHits, categoriesById) {
  const items = [];
  for (const hit of productHits || []) {
    const p = hit._source || hit;
    if (p.status !== 1) continue;
    // The API's incl-tax floats carry binary noise (1249.0000000000002).
    const regularPrice = Math.round(parseFloat(p.original_price_incl_tax) * 100) / 100;
    const salePrice = Math.round(parseFloat(p.special_price_incl_tax) * 100) / 100;
    if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice)) continue;
    items.push({
      id: String(p.sku),
      brand: p.brand_label || null,
      name: (p.name || "").trim(),
      section: null,
      type: klickTypeFor(p, categoriesById),
      regularPrice,
      salePrice,
      discountPercent: Math.round((1 - salePrice / regularPrice) * 100),
      priceMin30: null,
      campaignId: null,
      link: p.url_path ? `https://www.klick.ee/${p.url_path}` : null,
      image: p.image ? `https://vsf-api.klick.ee/img/600/600/resize${p.image}` : null,
      fresh: false,
      position: items.length + 1,
    });
  }
  return { items, count: (productHits || []).length };
}

// --- Apotheka (www.apotheka.ee) — plain server-rendered HTML,
// /pakkumised/koik-sooduspakkumised?p=N, 34 cards a page, an empty
// page ends it. Each card states "Hind" (struck) and "Soodushind",
// a -N% badge, and "Toote tüüp" — the ONLY category signal, and what
// the owner's rule reads: cosmetics and hygiene only, never a
// medicine or a supplement. A type this list has never seen is
// EXCLUDED and logged for the owner, never guessed in. No 30-day
// field on the list or product pages (checked 2026-09-26).
const APOTHEKA_EXCLUDED_TYPE = /ravim|toidulisand|tervisetoode|vitamiin|meditsiini|seade|test|side|plaaster|desinfits|lutt|pudel|mähk/i;
const APOTHEKA_ALLOWED_TYPE = /kosmeetika|hügieen|hooldus|kreem|šampoon|palsam|seep|deodorant|hambapasta|hambahari|suuvesi|päikese|näo|keha|juukse|naha|intiim|beebi|habeme|parfüüm|dušš|niisut|huule|küün|meik|jumestus|geel|losjoon|õli|pesu|sprei|maskeering|sära/i;

function decodeHtml(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(parseInt(c, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, c) => String.fromCharCode(parseInt(c, 16)))
    .trim();
}

function apothekaTypeAllowed(type) {
  if (!type) return false;
  if (APOTHEKA_EXCLUDED_TYPE.test(type)) return false;
  return APOTHEKA_ALLOWED_TYPE.test(type);
}

function parseApothekaPage(html) {
  const items = [];
  const excluded = [];
  const types = {};
  const cards = html.split('<li data-testid="product-card-').slice(1);
  for (const card of cards) {
    const sku = card.slice(0, card.indexOf('"'));
    const name = decodeHtml((card.match(/product-card__title">([\s\S]*?)<\/h3>/) || [, ""])[1]);
    const type = decodeHtml((card.match(/product-card__type">[\s\S]*?<\/span>([\s\S]*?)<\/p>/) || [, ""])[1]);
    const link = (card.match(/<a href="([^"]+)" class="product-card__link"/) || [])[1] || null;
    const image = (card.match(/<img loading="lazy" src="([^"]+)"/) || [])[1] || null;
    const regular = (card.match(/<del[^>]*>\s*([\d\s]+,\d{2})\s*€/) || [])[1];
    const sale = (card.match(/<ins[^>]*>\s*<data value="([\d.]+)"/) || [])[1];
    const outOfStock = /Hetkel otsas/.test(card);
    types[type || "(none)"] = (types[type || "(none)"] || 0) + 1;
    if (!apothekaTypeAllowed(type)) { excluded.push({ sku, name, type: type || null }); continue; }
    if (outOfStock) continue;
    const regularPrice = regular ? parseFloat(regular.replace(/\s/g, "").replace(",", ".")) : NaN;
    const salePrice = sale ? parseFloat(sale) : NaN;
    if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice)) continue;
    items.push({
      id: sku,
      brand: null,
      name,
      section: null,
      type,
      regularPrice,
      salePrice,
      discountPercent: Math.round((1 - salePrice / regularPrice) * 100),
      priceMin30: null,
      campaignId: null,
      link,
      image,
      fresh: false,
      position: items.length + 1,
    });
  }
  return { items, excluded, types, cards: cards.length };
}

// --- Euronics (www.euronics.ee) — no sale listing at all; discounts
// live on campaign pages linked from the home page
// (/kampaaniad/<id>, plain HTML — deeper /kampaaniad/*/* paths are
// disallowed by its robots.txt and never fetched). A card's shown
// price is either for everyone (old price in a plain "discount__old"
// block) or a loyalty "Sõbrahind" ("discount__old__loyal", the
// "Püsikliendile" label) — the owner's rule, same as Barbora's Aitäh
// and Selver's Partner in groceries: a loyalty price is never the
// sale price, so a card whose only discount is a loyalty one is NOT
// a sale item here (counted and reported instead). No 30-day field
// (checked 2026-09-26). Category = the product URL's first segment,
// the site's own Estonian department slug.
function parseEuronicsCampaignLinks(html) {
  return [...new Set([...html.matchAll(/href="(https:\/\/www\.euronics\.ee\/kampaaniad\/\d+)"/g)].map((m) => m[1]))];
}

function euronicsTypeFromUrl(url) {
  const m = (url || "").match(/^https:\/\/www\.euronics\.ee\/([a-z0-9-]+)\//);
  if (!m) return null;
  const slug = m[1];
  if (slug === "tv") return "TV";
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
}

function parseEuronicsCampaign(html) {
  const items = [];
  let loyaltyOnly = 0;
  let noDiscount = 0;
  const cards = html.split('<article class="product-card vertical').slice(1);
  for (const card of cards) {
    const id = (card.match(/data-product-id="(\d+)"/) || [])[1];
    const name = decodeHtml((card.match(/product-card__title"[^>]*>([\s\S]*?)<\/span>/) || [, ""])[1]);
    const link = (card.match(/class="product_name" href="([^"]+)"/) || [])[1] || null;
    const image = (card.match(/product-card__image responsive-image"\s+src="([^"]+)"/) || [])[1] || null;
    const shown = parseFloat((card.match(/data-product-price="([\d.]+)"/) || [])[1]);
    const oldMatch = card.match(/<div class="\s*discount__old([^"]*)">\s*<span class="label">\s*Tavahind:\s*([\d\s.,]+?)(?:&#xA0;|&nbsp;|\s)*(?:&#x20AC;|€)/);
    if (!oldMatch) { noDiscount++; continue; }
    if (/loyal/.test(oldMatch[1]) || /Püsikliendile|P&#xFC;sikliendile/.test(card)) { loyaltyOnly++; continue; }
    const regularPrice = parseFloat(oldMatch[2].replace(/\s/g, "").replace(",", "."));
    const salePrice = shown;
    if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice)) continue;
    items.push({
      id: String(id),
      brand: null,
      name,
      section: null,
      type: euronicsTypeFromUrl(link),
      regularPrice,
      salePrice,
      discountPercent: Math.round((1 - salePrice / regularPrice) * 100),
      priceMin30: null,
      campaignId: null,
      link,
      image,
      fresh: false,
      position: items.length + 1,
    });
  }
  return { items, loyaltyOnly, noDiscount, cards: cards.length };
}

module.exports = {
  extractNextData, parseDenimDreamProducts, parseDenimDreamPage, SECTION_BY_SEX_ID,
  buildKlickCategoryIndex, klickTypeFor, parseKlickProducts, KLICK_SALE_CATEGORY_ID,
  parseApothekaPage, apothekaTypeAllowed,
  parseEuronicsCampaignLinks, parseEuronicsCampaign, euronicsTypeFromUrl, decodeHtml,
};
