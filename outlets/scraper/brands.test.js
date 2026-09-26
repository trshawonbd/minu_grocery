// Regression tests for outlets/scraper/brands.js (the Denim Dream
// parser) and the paging/writing logic of fetch-denim-dream.js, run
// with stub fetchers — nothing here ever contacts a site. Fixtures are
// hand-trimmed real excerpts of Denim Dream's own product shape
// (checked against the live page and its list API by hand,
// 2026-09-26), with prices edited where a test needs a non-sale.
// Run with: node outlets/scraper/brands.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const {
  extractNextData, parseDenimDreamPage, parseDenimDreamProducts,
  buildKlickCategoryIndex, parseKlickProducts, parseApothekaPage, apothekaKeeps, apothekaChip, APOTHEKA_CHIP_RULES,
  parseEuronicsCampaignLinks, parseEuronicsCampaign, euronicsTypeFromUrl,
  parsePrice, parseCharlotPage, parseSkechersPage, parseKingitusPage, parseKingitusProductLowest, parseDanijaPage, parseLppCatalog,
} = require("./brands");
const { fetchSection, writeOutput, listUrl, main } = require("./fetch-denim-dream");
const fixture = (name) => fs.readFileSync(path.join(__dirname, "fixtures", name), "utf8");

const results = [];
async function test(name, run) {
  try {
    await run();
    console.log(`PASS  ${name}`);
    results.push(true);
  } catch (err) {
    console.log(`FAIL  ${name}`);
    console.log(`      ${err.message}`);
    results.push(false);
  }
}

function fixtureColor(overrides = {}) {
  return {
    productId: 446500,
    price: { price: "99.90", priceDiscount: "69.90" },
    shareUrl: "https://www.denimdream.com/EE/et/toode/446500",
    pictures: [{ urlMedium: "https://pic.denimdream.com/picture/n/2026/07/w370_q90/311092_446500_1_600_910.jpg" }],
    sale: true,
    ...overrides,
  };
}

function fixtureProduct(overrides = {}) {
  return {
    brand: { brand: "Calvin Klein" },
    model: "Teksaseelik 90S MINI SKIRT BASSET BLUE",
    sex: { sexId: 2, sex: "Women", sexLocal: "Naised" },
    category: { categoryId: "115", categoryLocal: "Seelikud" },
    modelType: "Teksaseelik",
    fresh: true,
    position: 1,
    colors: [fixtureColor()],
    ...overrides,
  };
}

function fixturePage(products, count = products.length, size = 50) {
  return { props: { pageProps: { initialState: { productsList: { data: { products, count, size } } } } } };
}

(async () => {
  await test("parseDenimDreamPage: a real sale colour (regular > sale) is kept with brand, name, the store's own section and type, both prices, computed discount %, link, image, fresh flag and position", () => {
    const { items, count, size } = parseDenimDreamPage(fixturePage([fixtureProduct()], 5575, 50));
    assert.deepEqual(items, [
      {
        id: "446500",
        brand: "Calvin Klein",
        name: "Teksaseelik 90S MINI SKIRT BASSET BLUE",
        section: "Naised",
        type: "Seelikud",
        regularPrice: 99.9,
        salePrice: 69.9,
        discountPercent: 30,
        priceMin30: null,
        campaignId: null,
        link: "https://www.denimdream.com/EE/et/toode/446500",
        image: "https://pic.denimdream.com/picture/n/2026/07/w370_q90/311092_446500_1_600_910.jpg",
        fresh: true,
        position: 1,
      },
    ]);
    assert.equal(count, 5575);
    assert.equal(size, 50);
  });
  await test("the site's own 30-day lowest price and campaign id are kept (priceMinOf30Days -> priceMin30, campaignId); a non-sale listing's priceDiscount \"0.00\" is NEVER a sale (it read as 100% off before the guard)", () => {
    const withMin = fixtureProduct({ colors: [fixtureColor({ price: { price: "99.90", priceDiscount: "69.90", priceMinOf30Days: "69.90", campaignId: 16017 } })] });
    const [item] = parseDenimDreamProducts({ products: [withMin] }).items;
    assert.equal(item.priceMin30, 69.9);
    assert.equal(item.campaignId, 16017);
    const nonSale = fixtureProduct({ colors: [fixtureColor({ price: { price: "106.95", priceDiscount: "0.00", campaignId: 0 }, sale: false, outlet: false })] });
    assert.deepEqual(parseDenimDreamProducts({ products: [nonSale] }).items, []);
  });
  await test("sections: sexId 1 -> Mehed, 2 -> Naised, and every kids' id (3 Lapsed, 4 Poisid, 5 Tüdrukud, 6 Unisex Kids) -> Lapsed", () => {
    const sections = [1, 2, 3, 4, 5, 6].map((sexId) => parseDenimDreamProducts({ products: [fixtureProduct({ sex: { sexId } })] }).items[0].section);
    assert.deepEqual(sections, ["Mehed", "Naised", "Lapsed", "Lapsed", "Lapsed", "Lapsed"]);
  });
  await test("a colour whose sale price is NOT below its regular price is dropped even if the API's own 'sale' flag says true — never trusted alone", () => {
    const product = fixtureProduct({ colors: [fixtureColor({ productId: 999, price: { price: "49.90", priceDiscount: "49.90" }, sale: true })] });
    assert.deepEqual(parseDenimDreamProducts({ products: [product] }).items, []);
  });
  await test("two colours of the same product are two separate items, each with its own link/image/price", () => {
    const product = fixtureProduct({
      colors: [
        fixtureColor({ productId: 1, price: { price: "80.00", priceDiscount: "60.00" }, shareUrl: "https://www.denimdream.com/EE/et/toode/1" }),
        fixtureColor({ productId: 2, price: { price: "80.00", priceDiscount: "40.00" }, shareUrl: "https://www.denimdream.com/EE/et/toode/2" }),
      ],
    });
    const { items } = parseDenimDreamProducts({ products: [product] });
    assert.deepEqual(items.map((i) => i.id), ["1", "2"]);
    assert.deepEqual(items.map((i) => i.discountPercent), [25, 50]);
  });
  await test("extractNextData: pulls and parses the __NEXT_DATA__ script tag out of a page; null when it isn't there (a JS-only page like Reserved/Mohito, not this shape)", () => {
    const html = `<html><body><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ a: 1 })}</script></body></html>`;
    assert.deepEqual(extractNextData(html), { a: 1 });
    assert.equal(extractNextData("<html><body>no next data here</body></html>"), null);
  });
  await test("listUrl: the API's own parameter names (country, lang, sale=true, sexId, page, size=50) — never the whole catalogue, always the api-v2 host", () => {
    const url = listUrl(2, 3);
    assert.ok(url.startsWith("https://api-v2.denimdream.com/api/v2/product/product?"));
    const params = new URL(url).searchParams;
    assert.equal(params.get("country"), "EE");
    assert.equal(params.get("lang"), "et");
    assert.equal(params.get("sale"), "true");
    assert.equal(params.get("sexId"), "2");
    assert.equal(params.get("page"), "3");
    assert.equal(params.get("size"), "50");
  });
  await test("fetchSection: pages until the API's own count is reached (3 pages for count 120 at size 50), one sleep between pages, stops early on an empty page", async () => {
    const calls = [];
    let sleeps = 0;
    const pageOf = (page) => {
      const n = page < 3 ? 50 : 20;
      return { count: 120, size: 50, page, products: Array.from({ length: n }, (_, i) => fixtureProduct({ colors: [fixtureColor({ productId: page * 1000 + i })] })) };
    };
    const deps = { fetchJson: async (url) => { calls.push(new URL(url).searchParams.get("page")); return pageOf(Number(new URL(url).searchParams.get("page"))); }, sleep: async () => { sleeps++; } };
    const { items, count } = await fetchSection(2, deps);
    assert.deepEqual(calls, ["1", "2", "3"]);
    assert.equal(sleeps, 2);
    assert.equal(count, 120);
    assert.equal(items.length, 120);
    const empty = { fetchJson: async () => ({ count: 999, size: 50, page: 1, products: [] }), sleep: async () => {} };
    assert.equal((await fetchSection(1, empty)).items.length, 0, "an empty page ends the section even if count says more");
  });
  await test("fetchSection: the API's own error reply (a JSON array) throws instead of being read as an empty page", async () => {
    const deps = { fetchJson: async () => [{ fieldErrors: ["country"], message: "Invalid request" }], sleep: async () => {} };
    await assert.rejects(() => fetchSection(2, deps), /API error/);
  });
  await test("main: dedupes an item listed under two kids' sections by id, and writes firstSeen from the price history (today for a new item, its first-ever date for a returning one)", async () => {
    const shared = fixtureProduct({ sex: { sexId: 4 }, colors: [fixtureColor({ productId: 7, shareUrl: "https://www.denimdream.com/EE/et/toode/7" })] });
    const older = fixtureProduct({ sex: { sexId: 2 }, colors: [fixtureColor({ productId: 8, shareUrl: "https://www.denimdream.com/EE/et/toode/8" })] });
    const written = {};
    const deps = {
      fetchJson: async (url) => {
        const sexId = new URL(url).searchParams.get("sexId");
        if (sexId === "2") return { count: 1, size: 50, page: 1, products: [older] };
        if (sexId === "4" || sexId === "5") return { count: 1, size: 50, page: 1, products: [shared] };
        return { count: 0, size: 50, page: 1, products: [] };
      },
      sleep: async () => {},
      log: () => {},
      now: () => new Date("2026-09-26T08:00:00Z"),
      readJson: () => ({ "https://www.denimdream.com/EE/et/toode/8": [["2026-09-20", 69.9]] }),
      writeFile: (p, text) => { written[p] = JSON.parse(text); },
    };
    const { items, catalogueCount } = await main(deps);
    assert.deepEqual(items.map((i) => i.id), ["8", "7"], "sexId 2 fetched first, the kids' duplicate counted once");
    assert.equal(catalogueCount, 3, "the API's own counts summed, before dedupe (what the store lists)");
    const out = Object.values(written).find((v) => v.brand === "Denim Dream");
    assert.deepEqual(out.items.map((i) => i.firstSeen), ["2026-09-20", "2026-09-26"]);
    assert.deepEqual(out.items.map((i) => i.status), ["unknown", "unknown"], "no site 30-day field in this fixture and history under 30 days -> not judgeable yet");
    const history = Object.values(written).find((v) => v["https://www.denimdream.com/EE/et/toode/7"]);
    assert.deepEqual(history["https://www.denimdream.com/EE/et/toode/7"], [["2026-09-26", 69.9]]);
    assert.deepEqual(history["https://www.denimdream.com/EE/et/toode/8"], [["2026-09-20", 69.9]], "an unchanged price adds no entry");
  });
  await test("writeOutput: nothing written to disk in tests, and the output carries brand, scrapedAt, catalogueCount and items", () => {
    const written = {};
    const item = parseDenimDreamProducts({ products: [fixtureProduct()] }).items[0];
    const r = writeOutput([item], 5575, "2026-09-26T08:00:00.000Z", { readJson: () => ({}), writeFile: (p, text) => { written[p] = JSON.parse(text); } });
    assert.equal(r.written, 1);
    assert.equal(r.changed, 1);
    const out = Object.values(written).find((v) => v.brand === "Denim Dream");
    assert.equal(out.scrapedAt, "2026-09-26T08:00:00.000Z");
    assert.equal(out.catalogueCount, 5575);
    assert.equal(out.items[0].firstSeen, "2026-09-26");
  });

  // --- Klick (real API excerpt, fixtures/klick-products.json, 2026-09-26) ---
  await test("Klick: a sale product is read from the *_incl_tax fields (149.99 -> 129.99), typed by its real department (Arvutid ja lisad, not 'Parimad pakkumised'), linked and imaged through the site's own hosts", () => {
    const fx = JSON.parse(fixture("klick-products.json"));
    const byId = buildKlickCategoryIndex(fx.categories.hits.hits);
    const { items, count } = parseKlickProducts(fx.products.hits.hits, byId);
    assert.equal(count, 2);
    assert.equal(items.length, 2);
    const printer = items.find((i) => i.name.includes("HP LaserJet"));
    assert.equal(printer.regularPrice, 149.99);
    assert.equal(printer.salePrice, 129.99);
    assert.equal(printer.discountPercent, 13);
    assert.equal(printer.type, "Arvutid ja lisad");
    assert.equal(printer.brand, "HP");
    assert.equal(printer.link, "https://www.klick.ee/multifunktsionaalne-laserprinter-hp-laserjet-mfp-m140w");
    assert.ok(printer.image.startsWith("https://vsf-api.klick.ee/img/600/600/resize/webp/"));
    assert.equal(printer.priceMin30, null, "Klick has no 30-day field");
    assert.equal(printer.section, null);
  });
  await test("Klick: a product with no special price, an equal one, a zero one, or status != 1 is not a sale item", () => {
    const byId = buildKlickCategoryIndex([]);
    const base = { sku: "X", name: "Thing", status: 1, url_path: "thing", category_ids: [], original_price_incl_tax: 100 };
    assert.equal(parseKlickProducts([{ _source: { ...base } }], byId).items.length, 0);
    assert.equal(parseKlickProducts([{ _source: { ...base, special_price_incl_tax: 100 } }], byId).items.length, 0);
    assert.equal(parseKlickProducts([{ _source: { ...base, special_price_incl_tax: 0 } }], byId).items.length, 0);
    assert.equal(parseKlickProducts([{ _source: { ...base, special_price_incl_tax: 80, status: 2 } }], byId).items.length, 0);
    assert.equal(parseKlickProducts([{ _source: { ...base, special_price_incl_tax: 80 } }], byId).items.length, 1);
  });

  // --- Apotheka (real page excerpt, fixtures/apotheka-cards.html) ---
  await test("Apotheka: a supplement ('Toidulisand') and an out-of-stock card are DROPPED — cosmetics/hygiene only; the type breakdown and the dropped list are reported, never silently lost", () => {
    const { items, excluded, types, cards } = parseApothekaPage(fixture("apotheka-cards.html"));
    assert.equal(cards, 2);
    assert.equal(items.length, 0);
    assert.equal(excluded.length, 2);
    assert.deepEqual(excluded.map((e) => e.type), ["Toidulisand", "Toidulisand"]);
    assert.deepEqual(types, { Toidulisand: 2 });
  });
  await test("Apotheka: a cosmetics card (a 'Tervisetoode' whose NAME says šampoon) is read — 'Hind' struck (24,26 €) as regular, 'Soodushind' as sale, the -N% recomputed, link and image kept", () => {
    const html = fixture("apotheka-cards.html").replace(/Toidulisand/g, "Tervisetoode").replace("FORMULA VITALE D-VIT PÄIKESEPÄRLID 4000IU N120</h3>", "VICHY DERCOS ŠAMPOON 200ML</h3>");
    const { items } = parseApothekaPage(html);
    assert.equal(items.length, 1, "the out-of-stock one is still dropped");
    const [item] = items;
    assert.equal(item.regularPrice, 24.26);
    assert.equal(item.salePrice, 12.15);
    assert.equal(item.discountPercent, 50);
    assert.equal(item.type, "Juuksehooldus", "the chip comes from the name; the site's own type is kept aside");
    assert.equal(item.siteType, "Tervisetoode");
    assert.equal(item.link, "https://www.apotheka.ee/formula-vitale-d-vit-paikeseparlid-4000iu-n120-pmm0164114ee");
    assert.ok(item.image.startsWith("https://www.apotheka.ee/media/catalog/product/"));
    assert.equal(item.name, "VICHY DERCOS ŠAMPOON 200ML");
  });
  await test("apothekaKeeps (the owner's rule, 2026-09-26): a medicine/supplement/veterinary/aid TYPE is always out; within 'Tervisetoode' the NAME decides — a cosmetics/hygiene word or a known cosmetics brand keeps it, a medical word or an unclear name drops it", () => {
    for (const t of ["Käsimüügiravim", "Toidulisand", "Veterinaarravim", "Abivahend", "Meditsiiniseade", null]) assert.equal(apothekaKeeps(t, "NIVEA KREEM 50ML"), false, `${t} out`);
    for (const n of ["VICHY DERCOS ŠAMPOON 200ML", "BIODERMA SENSIBIO H2O MITSELLAARVESI 500ML", "SENSODYNE HAMBAPASTA 75ML", "REXONA DEODORANT 150ML", "LA ROCHE-POSAY ANTHELIOS SPF50 50ML", "LIBRESSE HÜGIEENISIDE N10", "CERAVE NIISUTAV KREEM 340G"]) assert.equal(apothekaKeeps("Tervisetoode", n), true, `${n} in`);
    for (const n of ["OMRON M3 VERERÕHUMÕÕTJA", "TERMOMEETER DIGITAALNE", "PÕLVE TUGISIDE M", "HANSAPLAST PLAASTER N20", "COVID-19 ANTIGEENI TEST N1", "MEDISOFT SOOJENDUSPADI", "UNKNOWN THING 100ML"]) assert.equal(apothekaKeeps("Tervisetoode", n), false, `${n} out`);
    assert.equal(apothekaKeeps("Tervisetoode", "BEPANTHEN HAAVA KREEM 30G"), false, "a medical word wins over a cosmetics word");
  });

  await test("apothekaChip (the owner's chips, 2026-09-26): one chip per item, audience first — a men's shampoo is Meestele, a kids' sunscreen Beebitooted, then Päikesekaitse, Suuhügieen, Juuksehooldus, Näohooldus, Kehahooldus; an unmatched name has no chip", () => {
    assert.deepEqual(APOTHEKA_CHIP_RULES.map((r) => r[0]), ["Meestele", "Beebitooted", "Päikesekaitse", "Suuhügieen", "Juuksehooldus", "Näohooldus", "Kehahooldus"]);
    const cases = {
      "LABO SPECIFIC SHAMPOON SEBORRÖA VASTU MEESTELE 200ML": "Meestele",
      "ISDIN SUN PÄIKESEKAITSEGEEL-KREEM LASTELE SPF50 250ML": "Beebitooted",
      "AVENE SUN MIST SPRAY PÄIKESEKAITSEÕLI SPF30 150ML": "Päikesekaitse",
      "SENSODYNE HAMBAPASTA 75ML": "Suuhügieen",
      "VICHY DERCOS ŠAMPOON 200ML": "Juuksehooldus",
      "BIODERMA SENSIBIO H2O MITSELLAARVESI 500ML": "Näohooldus",
      "ISDIN ACNIBEN REPAIR HUULEPALSAM TAASTAV 10ML": "Näohooldus",
      "REXONA DEODORANT 150ML": "Kehahooldus",
      "MOLICARE PAD LADY 3 TILKA N12": "Kehahooldus",
      "KLORANE PALSAM LINAEKSTRAKTIGA 200ML": "Kehahooldus",
      "SOMETHING 100ML": null,
    };
    for (const [name, chip] of Object.entries(cases)) assert.equal(apothekaChip(name), chip, name);
  });

  // --- the second round (real excerpts, 2026-09-26) ---
  await test("parsePrice: '9.20', '199,00 €', '8 641', '149<!-- -->,<!-- -->95' all read as numbers with cents; junk is NaN", () => {
    assert.equal(parsePrice("9.20"), 9.2);
    assert.equal(parsePrice(" 199,00 € "), 199);
    assert.equal(parsePrice("8 641"), 8641);
    assert.equal(parsePrice("149<!-- -->,<!-- -->95<!-- --> "), 149.95);
    assert.ok(Number.isNaN(parsePrice(undefined)) && Number.isNaN(parsePrice("abc")));
  });
  await test("Charlot: a card's struck incl-VAT price is the regular price, the bold incl-VAT one the sale price (the deposit 'pant' and the ex-VAT lines ignored); brand, name, link and image read; a card without a struck price is not a sale item", () => {
    const { items, cards } = parseCharlotPage(fixture("charlot-cards.html"));
    assert.equal(cards, 2);
    const cola = items.find((i) => /COCA-COLA/.test(i.name));
    assert.ok(cola, "the Coca-Cola card is a sale item");
    assert.equal(cola.regularPrice, 9.2);
    assert.equal(cola.salePrice, 6.85, "6.85 — the '+ pant 0.60' is not part of the price");
    assert.equal(cola.discountPercent, 26);
    assert.equal(cola.brand, "Coca-cola");
    assert.equal(cola.link, "https://charlot.ee/soodusmuuk/coca-cola-033l-6-pakkpurk/");
    assert.ok(cola.image.startsWith("https://charlot.ee/i/i/"));
    assert.equal(cola.id, "119994");
    assert.equal(cola.priceMin30, null);
    const noStrike = fixture("charlot-cards.html").replace(/<s class="pvt">[\s\S]*?<\/s>/g, "");
    assert.equal(parseCharlotPage(noStrike).items.length, 0, "no struck price -> no discount");
  });
  await test("Skechers: the price box's data-price-amount finalPrice/oldPrice are the sale/regular prices (74 vs 110), name, link, image; brand is Skechers", () => {
    const { items, cards } = parseSkechersPage(fixture("skechers-card.html"));
    assert.equal(cards, 1);
    assert.equal(items.length, 1);
    const [item] = items;
    assert.equal(item.name, "GLIDE-STEP PRO");
    assert.equal(item.regularPrice, 110);
    assert.equal(item.salePrice, 74);
    assert.equal(item.discountPercent, 33);
    assert.equal(item.brand, "Skechers");
    assert.equal(item.link, "https://skechers.ee/et/glide-step-pro-150420-cnf.html");
    assert.ok(item.image.startsWith("https://skechers.ee/media/catalog/product/"));
  });
  await test("Kingitus.ee: the card's struck 'price-before-discount' (149,95) and 'price-after-discount' (119,95), name, link, the CDN image decoded out of the Next.js image URL; the product page's 'Viimase 30 päeva madalaim hind' value is read", () => {
    const { items, cards } = parseKingitusPage(fixture("kingitus-card.html"));
    assert.equal(cards, 1);
    assert.equal(items.length, 1);
    const [item] = items;
    assert.equal(item.regularPrice, 149.95);
    assert.equal(item.salePrice, 119.95);
    assert.equal(item.discountPercent, 20);
    assert.ok(item.name.length > 5);
    assert.ok(item.link.startsWith("https://www.kingitus.ee/kingitus/"));
    assert.ok(item.image.startsWith("https://cdn.kingitus.ee/storage/photos/products/"), item.image);
    assert.equal(parseKingitusProductLowest(fixture("kingitus-product.html")), 149.95);
    assert.equal(parseKingitusProductLowest("<html>no such line</html>"), null);
  });
  await test("Danija: brand link + model line make brand and name, '--old' 229,00 is the regular price and '--new' 199,00 the sale price, link and image read", () => {
    const { items, cards } = parseDanijaPage(fixture("danija-card.html"));
    assert.equal(cards, 1);
    assert.equal(items.length, 1);
    const [item] = items;
    assert.equal(item.brand, "DR.MARTENS");
    assert.equal(item.name, "1461 Quad");
    assert.equal(item.regularPrice, 229);
    assert.equal(item.salePrice, 199);
    assert.equal(item.discountPercent, 13);
    assert.equal(item.link, "https://danija.ee/19190-mustad-naiste-kummisaapad-drmartens-83-98-11-7.html");
    assert.ok(item.image.startsWith("https://danija.ee/"));
  });
  await test("LPP (Reserved/Cropp): the products array inside window.getCatalogData is read string-aware (brackets inside strings never end it); minQtyRegularPrice/minQtyFinalPrice are the prices, section from categoryPathNames ('sale/women' -> Naised), paging fields read", () => {
    const { items, products, total } = parseLppCatalog(fixture("lpp-catalog.html"), "Reserved");
    assert.equal(products, 2);
    assert.equal(items.length, 2);
    assert.equal(items[0].brand, "Reserved");
    assert.equal(items[0].section, "Naised");
    assert.equal(items[0].regularPrice, 29.99);
    assert.equal(items[0].salePrice, 17.99);
    assert.equal(items[0].discountPercent, 40);
    assert.ok(items[0].link.startsWith("https://www.reserved.com/ee/et/"));
    assert.ok(items[0].image.startsWith("https://static.reserved.com/"));
    assert.equal(total, 2);
    const tricky = fixture("lpp-catalog.html").replace('"name":"Seotava detailiga puuvillane s\\u00e4rk"', '"name":"Särk [test] ]"');
    assert.equal(parseLppCatalog(tricky, "Reserved").items.length, 2, "a ']' inside a string does not end the array");
    assert.deepEqual(parseLppCatalog("<html>nothing</html>", "Reserved").items, []);
  });

  // --- Euronics (real campaign-page excerpt, fixtures/euronics-cards.html) ---
  await test("Euronics: a loyalty-only 'Sõbrahind' card is NOT a sale item (counted as loyalty-only), a card with no old price is not one either; the campaign links on the home page are collected once each", () => {
    const { items, loyaltyOnly, noDiscount, cards } = parseEuronicsCampaign(fixture("euronics-cards.html"));
    assert.equal(cards, 2);
    assert.equal(items.length, 0);
    assert.equal(loyaltyOnly, 1);
    assert.equal(noDiscount, 1);
    const links = parseEuronicsCampaignLinks('<a href="https://www.euronics.ee/kampaaniad/7565">x</a><a href="https://www.euronics.ee/kampaaniad/7565">y</a><a href="https://www.euronics.ee/kampaaniad/7569">z</a>');
    assert.deepEqual(links, ["https://www.euronics.ee/kampaaniad/7565", "https://www.euronics.ee/kampaaniad/7569"]);
  });
  await test("Euronics: the same card with a plain (everyone's) old price IS a sale item — Tavahind as regular, the shown price as sale, department from the URL's first segment", () => {
    const html = fixture("euronics-cards.html").replace("discount__old discount__old__loyal", "discount__old").replace(/P&#xFC;sikliendile/g, "");
    const { items } = parseEuronicsCampaign(html);
    assert.equal(items.length, 1);
    const [item] = items;
    assert.equal(item.regularPrice, 185.99);
    assert.equal(item.salePrice, 145.99);
    assert.equal(item.discountPercent, 22);
    assert.equal(item.type, "Koduhoid");
    assert.equal(item.id, "144049");
    assert.ok(item.name.startsWith("Philips OneUp 5000"));
    assert.ok(item.link.startsWith("https://www.euronics.ee/koduhoid/"));
    assert.ok(item.image.startsWith("https://www.euronics.ee/UserFiles/Products/Images/"));
    assert.equal(euronicsTypeFromUrl("https://www.euronics.ee/tv/televiisorid/x"), "TV");
    assert.equal(euronicsTypeFromUrl("https://www.euronics.ee/kodumasinad-ja-koogitehnika/x"), "Kodumasinad ja koogitehnika");
  });

  const pass = results.filter(Boolean).length;
  const fail = results.length - pass;
  console.log("");
  console.log(`${pass} passed, ${fail} failed (${results.length} total)`);
  if (fail > 0) process.exit(1);
})();
