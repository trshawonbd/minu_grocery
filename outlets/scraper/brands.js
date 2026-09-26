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
// Found on the first full fetch (2026-09-26, 1,533 deals): the site
// types 1,037 of them just "Tervisetoode" — its catch-all for every
// non-medicine product, shampoo and blood-pressure monitor alike. So
// the type only EXCLUDES (a medicine, supplement, veterinary or aid
// type is never kept), and the product NAME decides what's kept: a
// clear cosmetics/hygiene word, or a known cosmetics/hygiene brand,
// and no medical word. Anything else is dropped and listed in
// outlets/data/apotheka-dropped.json for the owner — the owner's
// decision, 2026-09-26: keep by name, never guess.
const APOTHEKA_EXCLUDED_TYPE = /ravim|toidulisand|vitamiin|meditsiini|veterinaar|abivahend|seade|test/i;
const APOTHEKA_COSMETIC_NAME = new RegExp(
  [
    "šampoon", "shampoo", "palsam", "juuksemask", "juuksehooldus", "juukse", "kreem", "cream", "losjoon", "lotion", "seerum", "serum",
    "deodorant", "antiperspirant", "hambapasta", "hambahari", "hambaniit", "hambavahe", "suuvesi", "suuloputus", "toothpaste", "mouthwash",
    "seep", "soap", "dušigeel", "duššigeel", "dušš", "shower", "vannivaht", "kehapiim", "ihupiim", "kehaõli", "kehavõi", "body",
    "näovesi", "näopesu", "näogeel", "näokreem", "näoõli", "mitsellaar", "micellar", "toonik", "puhastusvaht", "puhastusgeel", "puhastuspiim", "cleanser",
    "päikesekaitse", "päevitus", "spf", "sunscreen", "after sun", "huulepalsam", "huulepulk", "huulevõi", "lip balm",
    "kätekreem", "käte", "jalakreem", "jalgade", "küünelakk", "küünehooldus", "hand cream", "foot cream",
    "meik", "jumestus", "ripsmetušš", "mascara", "parfüüm", "eau de", "raseerimis", "habemeajamis", "habeme", "aftershave",
    "intiimpesu", "intiimhügieen", "hügieeniside", "pesukaitse", "tampoon", "menstruaal", "niisked salvrätikud", "salvrätik", "mähkmed", "püksmähkmed",
    "kehasprei", "sprei", "hooldusõli", "kuivšampoon", "juuksesprei", "juukselakk", "vahatoode", "depil", "epil",
    // spellings and words found in the first full list (2026-09-26 review)
    "dushi", "pesemisgeel", "pesugeel", "pesemisõli", "pesemisvaht", "pesuvaht", "pesemisemuls", "pesemispiim", "vanniõli",
    "puhastusõli", "puhastusvesi", "näopuhastus", "emulsioon", "termaalvesi", "meigieemaldaja", "silmaümbrus", "kehageel",
    "näomask", "silmamask", "öömask", "puuder", "vistrikugeel", "suuvärskendaja", "hambalint", "igemegeel", "vaseliin",
    "ripsme", "koorija", "kehakoor", "kuivõli",
  ].join("|"),
  "i"
);
const APOTHEKA_COSMETIC_BRAND = /^(vichy|la roche[- ]posay|bioderma|eucerin|av[eè]ne|cerave|nivea|garnier|l'?or[eé]al|isdin|bab[eé]|bionike|novaclear|cumlaude|ducray|klorane|nuxe|uriage|svr|weleda|mustela|sebamed|cetaphil|neutrogena|vaseline|physiogel|a-derma|lierac|filorga|caudalie|oral-b|colgate|sensodyne|elmex|listerine|parodontax|lacalut|meridol|curaprox|gum|dove|rexona|gillette|batiste|head ?& ?shoulders|johnson'?s|pampers|huggies|libresse|always|o\.b\.|tena|seni|abena|attends|natracare|topfer|töpfer|hipp babysanft|ziaja|balea|lumene|bielenda|eveline|dermosil|dr\.? ?hauschka|kneipp|frezyderm|noreva|embryolisse|rilastil|apivita|korres|eubos|dermalex|exomega|xemose|ecophane|ecrinal|idun|jowa[eé]|molicare|ren[eé] furterer|sensilis|beauty spa|elgydium|pasta del capitano|mincer pharma|holika holika)\b/i;
const APOTHEKA_MEDICAL_NAME = /ravi\b|ravim|meditsiini|desinf|haava|plaaster|hemorr|seene|mycosan|excilor|psoria|ekseem|termomeet|vererõhu|glükomeet|inhalaat|nebul|kompress|tugiside|elastikside|marliside|ortoos|prill|läätse|lääts|pipett|süstal|test\b|oovul|vaginaal|suposii|lubrikant|kondoom|silmatilg|ninatilg|ninasalv|tilgad|ampull|proteesi|putukatõrje|täikamm|pastill|tablet|siirup|loputuslahus|soolalahus/i;

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

// Filter chips for Apotheka, from the product NAME (the owner's list,
// 2026-09-26) — first matching rule wins, so every item is in at most
// one chip; a name matching none is only under "Kõik" (type null).
// Audience first (a men's or a baby product stays there even when it
// is also a shampoo), then the specific kinds, then face, hair, body.
const APOTHEKA_CHIP_RULES = [
  ["Meestele", /meestele|for men|\bman\b|\bmen\b|\bmeeste|habeme|raseerimis|aftershave/i],
  ["Beebitooted", /\bbaby\b|beebi|pediatric|lastele|\blaste\b|\bkids\b|junior|imiku|mähkme/i],
  ["Päikesekaitse", /päikese|päikse|päevitus|\bspf|\bsun\b|after sun|isepruunistav|autobronzant/i],
  ["Suuhügieen", /hamba|suuvesi|suuloputus|suuvärskendaja|igeme|proteesi|mouthwash|toothpaste/i],
  ["Juuksehooldus", /šampoon|shampoo|juukse|juuste|\bjuus|peanaha|kõõm|\bhair\b|kuivõli/i],
  ["Näohooldus", /\bnäo|silma|huule|meik|meigi|jumestus|ripsme|puuder|põsepuna|mitsellaar|toonik|seerum|serum|näomask|öömask|päevakreem|öökreem|kortsu|vananemis|akne|\bakn\b|vistrik|poori|peiteplii|peitekreem|termaalvesi|essents|pesemisvaht|puhastusvaht|pesuvaht|\bmask\b|aqua-gel/i],
  ["Kehahooldus", /keha|ihu|\bbody\b|dushi|dušš|duši|shower|seep|soap|deodorant|antiperspirant|käte|\bhand\b|jala|jalg|\bfoot\b|intiim|hügieeniside|tampoon|molicare|\bpad\b|salvrätik|vanni|pesemis|pesugeel|puhastus|losjoon|lotion|kreem|cream|emulsioon|geel|õli|vaseliin|sprei|depil|epil|koorija|küün|\bnail|palsam|\bsalv\b|kontsentraat|hooldusvahend|hooldus/i],
];

function apothekaChip(name) {
  for (const [chip, pattern] of APOTHEKA_CHIP_RULES) if (pattern.test(name || "")) return chip;
  return null;
}

function apothekaKeeps(type, name) {
  if (!type || APOTHEKA_EXCLUDED_TYPE.test(type)) return false;
  if (!name || APOTHEKA_MEDICAL_NAME.test(name)) return false;
  return APOTHEKA_COSMETIC_NAME.test(name) || APOTHEKA_COSMETIC_BRAND.test(name);
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
    if (!apothekaKeeps(type, name)) { excluded.push({ sku, name, type: type || null }); continue; }
    if (outOfStock) continue;
    const regularPrice = regular ? parseFloat(regular.replace(/\s/g, "").replace(",", ".")) : NaN;
    const salePrice = sale ? parseFloat(sale) : NaN;
    if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice)) continue;
    items.push({
      id: sku,
      brand: null,
      name,
      section: null,
      type: apothekaChip(name),
      siteType: type,
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

// Shared: "9,20 €" / "8 641" / "149,95" -> number (cents kept).
function parsePrice(text) {
  if (text == null) return NaN;
  const cleaned = String(text).replace(/&nbsp;| |€|&euro;/g, "").replace(/<!--.*?-->/g, "").replace(/\s/g, "").replace(",", ".");
  return Math.round(parseFloat(cleaned) * 100) / 100;
}

function makeItem(fields) {
  const { regularPrice, salePrice } = fields;
  if (!(Number.isFinite(regularPrice) && Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice)) return null;
  return {
    id: String(fields.id),
    brand: fields.brand || null,
    name: fields.name,
    section: fields.section || null,
    type: fields.type || null,
    regularPrice,
    salePrice,
    discountPercent: Math.round((1 - salePrice / regularPrice) * 100),
    priceMin30: Number.isFinite(fields.priceMin30) && fields.priceMin30 > 0 ? fields.priceMin30 : null,
    campaignId: null,
    link: fields.link || null,
    image: fields.image || null,
    fresh: false,
    position: fields.position,
  };
}

// --- Charlot (charlot.ee) — plain server-rendered HTML, /soodusmuuk/,
// one page (the "Näita rohkem" button loads more through a
// query-string URL, and robots.txt forbids every "?" URL to us, so
// only what the plain page carries is read). Each card: struck old
// price and current price, both incl. VAT (`pvt`; `pnvt` is
// ex-VAT and ignored), a bottle deposit ("pant") shown separately and
// left out, brand in "Bränd:". crawl-delay 10. No 30-day field.
function parseCharlotPage(html) {
  const items = [];
  const cards = html.split('<div class="pr" id="p').slice(1);
  for (const card of cards) {
    const id = (card.match(/^\d+i(\d+)"/) || [])[1];
    const name = decodeHtml((card.match(/<h4 id="np[^"]*">([\s\S]*?)<\/h4>/) || [, ""])[1]);
    const path = (card.match(/<a href="(\/soodusmuuk\/[^"]+)">/) || [])[1];
    const imagePath = (card.match(/background-image:url\('([^']+)'\)/) || [])[1];
    const oldPrice = (card.match(/<s class="pvt">[\s\S]*?<q class="prc\d+">([^<]+)<\/q>/) || [])[1];
    const newPrice = (card.match(/<b class="pvt">[\s\S]*?<q class="prc\d+">([^<]+)<\/q>/) || [])[1];
    const brand = decodeHtml((card.match(/Bränd:\s*<b>([^<]*)<\/b>/) || [, ""])[1]) || null;
    const item = makeItem({
      id, brand, name, regularPrice: parsePrice(oldPrice), salePrice: parsePrice(newPrice),
      link: path ? `https://charlot.ee${path}` : null, image: imagePath ? `https://charlot.ee${imagePath}` : null, position: items.length + 1,
    });
    if (item) items.push(item);
  }
  return { items, cards: cards.length };
}

// --- Skechers (skechers.ee) — Magento, /et/sale.html. Prices are in
// the card's price box as data-price-amount (finalPrice / oldPrice),
// exact numbers rather than the formatted text. robots.txt disallows
// every "?p=" URL, so ONLY the first page is ever read (13 cards) —
// the rest of the sale is out of reach to us by the site's own rule.
function parseSkechersPage(html) {
  const items = [];
  const cards = html.split('<li class="item product product-item"').slice(1);
  for (const card of cards) {
    const link = (card.match(/class="product-item-link"\s+href="([^"]+)"/) || card.match(/href="([^"]+)"\s+class="product-item-link"/) || [])[1];
    const name = decodeHtml((card.match(/class="product-item-link"[^>]*>([\s\S]*?)<\/a>/) || [, ""])[1]);
    const image = (card.match(/class="product-image-photo"\s+src="([^"]+)"/) || [])[1];
    const box = (card.match(/<div class="base-price">([\s\S]*?)<\/div>\s*<\/div>/) || [, card])[1];
    const finalPrice = (box.match(/data-price-amount="([\d.]+)"\s+data-price-type="finalPrice"/) || [])[1];
    const oldPrice = (box.match(/data-price-amount="([\d.]+)"\s+data-price-type="oldPrice"/) || [])[1];
    const id = (box.match(/data-product-id="(\d+)"/) || [])[1];
    const item = makeItem({ id, brand: "Skechers", name, regularPrice: parsePrice(oldPrice), salePrice: parsePrice(finalPrice), link, image, position: items.length + 1 });
    if (item) items.push(item);
  }
  return { items, cards: cards.length };
}

// --- Kingitus.ee — Next.js, server-rendered list at /allahindlus/
// (every item on one page: "Näed 76 toodet 76-st"). Cards carry the
// struck "price-before-discount" and the "price-after-discount"; the
// EU 30-day-lowest value ("Viimase 30 päeva madalaim hind enne
// allahindlust: 149.95 €") is on the PRODUCT page only, so the fetch
// script visits each item's page for it (thirtyDaySource "site").
function parseKingitusPage(html) {
  const items = [];
  const cards = html.split('data-testid="product-card"').slice(1);
  for (const card of cards) {
    const id = (card.match(/^\s*data-product-id="(\d+)"/) || [])[1];
    const m = card.match(/<h2[^>]*><a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/h2>/);
    const path = m ? m[1] : null;
    const name = decodeHtml(m ? m[2] : "");
    const imgParam = (card.match(/data-testid="product-image"[^>]*src="\/_next\/image\/\?url=([^&"]+)/) || [])[1];
    const image = imgParam ? decodeURIComponent(imgParam) : null;
    const before = (card.match(/data-testid="price-before-discount">([\s\S]*?)<span/) || [])[1];
    const after = (card.match(/data-testid="price-after-discount">([\s\S]*?)<span/) || [])[1];
    const item = makeItem({
      id, brand: null, name, regularPrice: parsePrice(before), salePrice: parsePrice(after),
      link: path ? (path.startsWith("http") ? path : `https://www.kingitus.ee${path}`) : null, image, position: items.length + 1,
    });
    if (item) items.push(item);
  }
  const total = (html.match(/Näed (\d+) toodet (\d+)-st/) || [])[2];
  return { items, cards: cards.length, total: total ? Number(total) : null };
}

// The 30-day-lowest price stated on a Kingitus.ee product page, or null.
function parseKingitusProductLowest(html) {
  const m = html.match(/Viimase 30 päeva madalaim hind enne allahindlust:\s*([\d\s.,]+?)\s*€/);
  return m ? parsePrice(m[1]) : null;
}

// --- Danija (danija.ee) — PrestaShop, /kampaaniad?page=N (38 cards a
// page, robots.txt allows the page parameter). Card: brand link +
// model line, "--new" and "--old" prices. No 30-day field.
function parseDanijaPage(html) {
  const items = [];
  const starts = [...html.matchAll(/<[a-z]+\s+class="[^"]*js-product-miniature[^"]*"/g)].map((m) => m.index);
  for (let i = 0; i < starts.length; i++) {
    const card = html.slice(starts[i], starts[i + 1] ?? html.length);
    const id = (card.match(/data-id-product="(\d+)"/) || [])[1];
    // Title = brand link, then usually a model line ("1461 Quad") —
    // 26 of 36 cards on the first page had no model line at all, so
    // it is optional and the brand then doubles as the name.
    const title = card.match(/products-list__title[^>]*>\s*<a href="([^"]+)">([\s\S]*?)<\/a>(?:\s*<p>([\s\S]*?)<\/p>)?/);
    const link = title ? title[1] : null;
    const brand = decodeHtml(title ? title[2] : "") || null;
    const model = decodeHtml(title && title[3] ? title[3] : "");
    const image = (card.match(/<img[^>]+(?:data-src|src)="(https:\/\/danija\.[a-z]+\/[^"]+)"/) || [])[1];
    const newPrice = (card.match(/products-list__price--new"[^>]*>\s*([^<]+)/) || [])[1];
    const oldPrice = (card.match(/products-list__price--old"[^>]*>\s*([^<]+)/) || [])[1];
    const item = makeItem({ id, brand, name: model || brand || "", regularPrice: parsePrice(oldPrice), salePrice: parsePrice(newPrice), link, image, position: items.length + 1 });
    if (item) items.push(item);
  }
  return { items, cards: starts.length };
}

// --- LPP family (Reserved, Cropp, ... — one platform): the sale
// page embeds its product list in `window.getCatalogData`'s
// `products: [...]` array (200 a page, `maxPage`, `productsQuantity`)
// — read straight from the HTML, never through the "/ajx/" and
// "/ajax/" paths their robots.txt disallow. Prices come as
// minQtyRegularPrice / minQtyFinalPrice numbers (fallback: the
// "29,99" strings). No 30-day field on the list.
const LPP_SECTION_BY_PATH = { women: "Naised", men: "Mehed", girls: "Lapsed", boys: "Lapsed", kids: "Lapsed" };

function parseLppCatalog(html, brand) {
  const start = html.indexOf("window.getCatalogData =");
  if (start < 0) return { items: [], products: 0, page: null, maxPage: null, total: null };
  const seg = html.slice(start);
  const pi = seg.indexOf("products: [");
  if (pi < 0) return { items: [], products: 0, page: null, maxPage: null, total: null };
  let depth = 0, inStr = false, esc = false, k = pi + 10;
  for (; k < seg.length; k++) {
    const c = seg[k];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) break; }
  }
  const products = JSON.parse(seg.slice(pi + 10, k + 1));
  const after = seg.slice(k + 1, k + 3000);
  const num = (key) => { const m = after.match(new RegExp(`\\b${key}\\s*:\\s*(\\d+)`)); return m ? Number(m[1]) : null; };
  const pathNames = (seg.match(/categoryPathNames:\s*'([^']*)'/) || [])[1] || "";
  const section = LPP_SECTION_BY_PATH[pathNames.split("/").pop()] || null;
  const items = [];
  for (const p of products) {
    const regular = typeof p.minQtyRegularPrice === "number" ? p.minQtyRegularPrice : parsePrice(p.price);
    const sale = typeof p.minQtyFinalPrice === "number" ? p.minQtyFinalPrice : parsePrice(p.final_price);
    const item = makeItem({
      id: String(p.id), brand, name: (p.name || "").trim(), section, regularPrice: Math.round(regular * 100) / 100, salePrice: Math.round(sale * 100) / 100,
      link: p.url || null, image: Array.isArray(p.img) && p.img[0] ? p.img[0] : null, position: items.length + 1,
    });
    if (item) items.push(item);
  }
  return { items, products: products.length, page: num("page"), maxPage: num("maxPage"), total: num("productsQuantity") };
}

module.exports = {
  extractNextData, parseDenimDreamProducts, parseDenimDreamPage, SECTION_BY_SEX_ID,
  parsePrice, parseCharlotPage, parseSkechersPage, parseKingitusPage, parseKingitusProductLowest, parseDanijaPage, parseLppCatalog, LPP_SECTION_BY_PATH,
  buildKlickCategoryIndex, klickTypeFor, parseKlickProducts, KLICK_SALE_CATEGORY_ID,
  parseApothekaPage, apothekaKeeps, apothekaChip, APOTHEKA_CHIP_RULES,
  parseEuronicsCampaignLinks, parseEuronicsCampaign, euronicsTypeFromUrl, decodeHtml,
};
