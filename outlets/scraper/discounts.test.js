// Tests for outlets/scraper/discounts.js — the "new discount" vs
// "permanent sale price" rule (the owner's, 2026-09-26, for every
// brand). Pure, no network.
// Run with: node outlets/scraper/discounts.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { classifyDiscount } = require("./discounts");

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

const TODAY = "2026-09-26";
const LINK = "https://www.denimdream.com/EE/et/toode/1";
const item = (over = {}) => ({ link: LINK, regularPrice: 100, salePrice: 70, priceMin30: 70, firstSeen: TODAY, ...over });

const results = [
  test("site's 30-day low equals today's sale price (what every Denim Dream item showed 2026-09-26) -> permanent, no new %", () => {
    assert.deepEqual(classifyDiscount(item(), {}, TODAY), { status: "permanent", refPrice: 70, newPercent: null });
  }),
  test("today's price below the site's 30-day low, history younger than 30 days -> new, % measured against that low, never against tavahind", () => {
    const r = classifyDiscount(item({ salePrice: 56, priceMin30: 70 }), { [LINK]: [["2026-09-20", 70]] }, TODAY);
    assert.deepEqual(r, { status: "new", refPrice: 70, newPercent: 20 }, "56 vs 70 = -20%, not 56 vs 100 = -44%");
  }),
  test("history 30+ days old: BOTH the site's low and our own prior-30-day low must agree — site says new but our history saw 56 last week -> permanent", () => {
    const history = { [LINK]: [["2026-08-01", 90], ["2026-09-19", 56]] };
    const r = classifyDiscount(item({ salePrice: 56, priceMin30: 70, firstSeen: "2026-08-01" }), history, TODAY);
    assert.equal(r.status, "permanent");
    assert.equal(r.refPrice, 56, "the lower of the two lows is the reference");
  }),
  test("history 30+ days old and both agree -> new; the reference is the lower of the two lows", () => {
    const history = { [LINK]: [["2026-08-01", 90], ["2026-09-01", 80]] };
    const r = classifyDiscount(item({ salePrice: 56, priceMin30: 75, firstSeen: "2026-08-01" }), history, TODAY);
    assert.deepEqual(r, { status: "new", refPrice: 75, newPercent: 25 });
  }),
  test("today's own price never counts as its own reference: history holding only today's entry -> judged by the site's field alone", () => {
    const r = classifyDiscount(item({ salePrice: 56, priceMin30: 70 }), { [LINK]: [[TODAY, 56]] }, TODAY);
    assert.equal(r.status, "new");
  }),
  test("a site with no 30-day field: 'unknown' (a plain Allahindlus, no split) until our own history is 30 days old; then our history alone decides", () => {
    assert.deepEqual(classifyDiscount(item({ priceMin30: null }), {}, TODAY), { status: "unknown", refPrice: null, newPercent: null });
    const young = { [LINK]: [["2026-09-10", 90]] };
    assert.equal(classifyDiscount(item({ priceMin30: null, salePrice: 70, firstSeen: "2026-09-10" }), young, TODAY).status, "unknown");
    const mature = { [LINK]: [["2026-08-01", 90]] };
    assert.deepEqual(classifyDiscount(item({ priceMin30: null, salePrice: 70, firstSeen: "2026-08-01" }), mature, TODAY), { status: "new", refPrice: 90, newPercent: 22 });
  }),
  test("a cent below the 30-day low (111.95 vs 111.96, a rounding gap) is NOT a new discount — under a whole percent never earns the badge", () => {
    const r = classifyDiscount(item({ salePrice: 111.95, priceMin30: 111.96 }), {}, TODAY);
    assert.deepEqual(r, { status: "permanent", refPrice: 111.96, newPercent: null });
    assert.equal(classifyDiscount(item({ salePrice: 110, priceMin30: 111.96 }), {}, TODAY).status, "new", "2% below is new");
  }),
  test("a mature history whose price never changed in the window still counts (the carry-in price), and an equal price is not new", () => {
    const mature = { [LINK]: [["2026-06-01", 70]] };
    assert.equal(classifyDiscount(item({ priceMin30: null, salePrice: 70, firstSeen: "2026-06-01" }), mature, TODAY).status, "permanent");
    assert.equal(classifyDiscount(item({ priceMin30: null, salePrice: 69, firstSeen: "2026-06-01" }), mature, TODAY).status, "new");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);
if (fail > 0) process.exit(1);
