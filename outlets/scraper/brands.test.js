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
  buildKlickCategoryIndex, parseKlickProducts, parseApothekaPage, apothekaTypeAllowed,
  parseEuronicsCampaignLinks, parseEuronicsCampaign, euronicsTypeFromUrl,
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
  await test("Apotheka: a cosmetics card is read — 'Hind' struck (24,26 €) as regular, 'Soodushind' as sale, the -N% recomputed, link and image kept", () => {
    const html = fixture("apotheka-cards.html").replace(/Toidulisand/g, "Kosmeetika");
    const { items } = parseApothekaPage(html);
    assert.equal(items.length, 1, "the out-of-stock one is still dropped");
    const [item] = items;
    assert.equal(item.regularPrice, 24.26);
    assert.equal(item.salePrice, 12.15);
    assert.equal(item.discountPercent, 50);
    assert.equal(item.type, "Kosmeetika");
    assert.equal(item.link, "https://www.apotheka.ee/formula-vitale-d-vit-paikeseparlid-4000iu-n120-pmm0164114ee");
    assert.ok(item.image.startsWith("https://www.apotheka.ee/media/catalog/product/"));
    assert.equal(item.name, "FORMULA VITALE D-VIT PÄIKESEPÄRLID 4000IU N120");
  });
  await test("apothekaTypeAllowed: medicine/supplement/health/vitamin types and anything unknown are out; cosmetics and hygiene wording is in; a medicine word wins over a cosmetics word", () => {
    for (const t of ["Käsimüügiravim", "Toidulisand", "Tervisetoode", "Vitamiinid", "Meditsiiniseade", "Test", null, "Muu"]) assert.equal(apothekaTypeAllowed(t), false, `${t} out`);
    for (const t of ["Kosmeetika", "Hügieenitoode", "Näokreem", "Šampoon", "Hambapasta", "Deodorant", "Päikesekaitse", "Intiimhügieen", "Beebihooldus"]) assert.equal(apothekaTypeAllowed(t), true, `${t} in`);
    assert.equal(apothekaTypeAllowed("Ravimkosmeetika"), false, "'ravim' inside the word keeps it out — a person decides, not a guess");
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
