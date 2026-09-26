// Regression tests for outlets/scraper/brands.js — the per-brand
// sale-page parsers. Fixture is a hand-trimmed real excerpt of Denim
// Dream's own __NEXT_DATA__ shape (checked against the live page by
// hand, 2026-09-26), with one item's price edited to equal its
// regular price to prove a non-real "sale" is dropped. Never
// contacts a site.
// Run with: node outlets/scraper/brands.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { extractNextData, parseDenimDreamPage } = require("./brands");

function test(name, run) {
  try {
    run();
    console.log(`PASS  ${name}`);
    return true;
  } catch (err) {
    console.log(`FAIL  ${name}`);
    console.log(`      ${err.message}`);
    return false;
  }
}

function fixturePage(products, count = products.length, size = 50) {
  return {
    props: { pageProps: { initialState: { productsList: { data: { products, count, size } } } } },
  };
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

const results = [
  test("parseDenimDreamPage: a real sale colour (regular > sale) is kept with name, both prices, computed discount %, link and image", () => {
    const products = [{ brand: { brand: "Calvin Klein" }, model: "Teksaseelik 90S MINI SKIRT BASSET BLUE", colors: [fixtureColor()] }];
    const { items, count, size } = parseDenimDreamPage(fixturePage(products, 5575, 50));
    assert.deepEqual(items, [
      {
        id: "446500",
        name: "Calvin Klein Teksaseelik 90S MINI SKIRT BASSET BLUE",
        regularPrice: 99.9,
        salePrice: 69.9,
        discountPercent: 30,
        link: "https://www.denimdream.com/EE/et/toode/446500",
        image: "https://pic.denimdream.com/picture/n/2026/07/w370_q90/311092_446500_1_600_910.jpg",
      },
    ]);
    assert.equal(count, 5575);
    assert.equal(size, 50);
  }),
  test("parseDenimDreamPage: a colour whose sale price is NOT below its regular price is dropped even if the page's own 'sale' flag says true — never trusted alone", () => {
    const products = [
      {
        brand: { brand: "Levi's" },
        model: "Not really discounted",
        colors: [fixtureColor({ productId: 999, price: { price: "49.90", priceDiscount: "49.90" }, sale: true })],
      },
    ];
    const { items } = parseDenimDreamPage(fixturePage(products));
    assert.deepEqual(items, []);
  }),
  test("parseDenimDreamPage: two colours of the same product are two separate items, each with its own link/image/price", () => {
    const products = [
      {
        brand: { brand: "Calvin Klein" },
        model: "Jope",
        colors: [
          fixtureColor({ productId: 1, price: { price: "80.00", priceDiscount: "60.00" }, shareUrl: "https://www.denimdream.com/EE/et/toode/1" }),
          fixtureColor({ productId: 2, price: { price: "80.00", priceDiscount: "40.00" }, shareUrl: "https://www.denimdream.com/EE/et/toode/2" }),
        ],
      },
    ];
    const { items } = parseDenimDreamPage(fixturePage(products));
    assert.equal(items.length, 2);
    assert.deepEqual(items.map((i) => i.id), ["1", "2"]);
    assert.deepEqual(items.map((i) => i.discountPercent), [25, 50]);
  }),
  test("extractNextData: pulls and parses the __NEXT_DATA__ script tag out of a page; returns null when it isn't there (a JS-only page like Reserved/Mohito, not this shape)", () => {
    const html = `<html><body><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ a: 1 })}</script></body></html>`;
    assert.deepEqual(extractNextData(html), { a: 1 });
    assert.equal(extractNextData("<html><body>no next data here</body></html>"), null);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
