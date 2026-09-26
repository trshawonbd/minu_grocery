// Regression tests for scraper/price-history.js — the compact
// price-change log that replaced daily-update.js's full daily
// snapshot (2026-09-28, the owner's storage-size decision).
// Run with: node scraper/price-history.test.js
// or:       npm test

const assert = require("node:assert/strict");
const { recordPrices, priceOnDate, lowestPriceInWindow, shiftDate } = require("./price-history");

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

const results = [
  test("recordPrices: a URL seen for the first time gets today's price as its first entry (a product that never changes price still has ONE data point, not zero)", () => {
    const { history, changed } = recordPrices({}, "2026-09-26", { "u1": 1.29, "u2": 2.5 });
    assert.deepEqual(history, { u1: [["2026-09-26", 1.29]], u2: [["2026-09-26", 2.5]] });
    assert.equal(changed, 2);
  }),
  test("recordPrices: an unchanged price appends NOTHING (the whole point of the compact log) — a changed price appends one new entry", () => {
    const before = { u1: [["2026-09-26", 1.29]] };
    const { history, changed } = recordPrices(before, "2026-09-27", { u1: 1.29 });
    assert.deepEqual(history, before, "byte-identical, nothing appended");
    assert.equal(changed, 0);
    const { history: h2, changed: c2 } = recordPrices(before, "2026-09-27", { u1: 1.35 });
    assert.deepEqual(h2, { u1: [["2026-09-26", 1.29], ["2026-09-27", 1.35]] });
    assert.equal(c2, 1);
    assert.deepEqual(before, { u1: [["2026-09-26", 1.29]] }, "the input is never mutated");
  }),
  test("recordPrices: calling it twice for the SAME date (a by-hand re-run) replaces that date's entry instead of appending a duplicate", () => {
    const before = { u1: [["2026-09-26", 1.29]] };
    const { history: h1 } = recordPrices(before, "2026-09-27", { u1: 1.35 });
    const { history: h2, changed } = recordPrices(h1, "2026-09-27", { u1: 1.4 });
    assert.deepEqual(h2, { u1: [["2026-09-26", 1.29], ["2026-09-27", 1.4]] }, "one entry for 09-27, not two");
    assert.equal(changed, 1);
    // Re-running with the SAME price as the (already replaced) entry
    // is a true no-op, same as any other unchanged-price call.
    const { history: h3, changed: c3 } = recordPrices(h2, "2026-09-27", { u1: 1.4 });
    assert.deepEqual(h3, h2);
    assert.equal(c3, 0);
  }),
  test("priceOnDate: the most recent recorded change on or before the date, carried forward through every day it didn't change; null before the URL was ever seen", () => {
    const history = { u1: [["2026-09-10", 1.0], ["2026-09-20", 1.2], ["2026-10-01", 0.9]] };
    assert.equal(priceOnDate(history, "u1", "2026-09-09"), null, "before the first recorded price at all");
    assert.equal(priceOnDate(history, "u1", "2026-09-10"), 1.0, "exactly the first entry's date");
    assert.equal(priceOnDate(history, "u1", "2026-09-15"), 1.0, "carried forward, no change yet");
    assert.equal(priceOnDate(history, "u1", "2026-09-20"), 1.2);
    assert.equal(priceOnDate(history, "u1", "2026-09-30"), 1.2, "still carried forward from 09-20");
    assert.equal(priceOnDate(history, "u1", "2026-10-01"), 0.9);
    assert.equal(priceOnDate(history, "u1", "2026-12-25"), 0.9, "carried all the way to today if nothing changed since");
    assert.equal(priceOnDate({}, "unknown-url", "2026-09-20"), null, "a URL never recorded at all");
  }),
  test("lowestPriceInWindow: the lowest of every price actually in effect during the window, including a price that never changed within it (the carry-in from before the window opened)", () => {
    const history = { u1: [["2026-09-01", 2.0], ["2026-09-15", 1.5], ["2026-09-20", 1.8]] };
    // 30-day window ending 2026-09-25 -> starts 2026-08-27. The price
    // in effect at the window's open (2.0, set 09-01) is a candidate
    // alongside 1.5 and 1.8, so the minimum is 1.5, not 1.8.
    assert.equal(lowestPriceInWindow(history, "u1", "2026-09-25"), 1.5);
    // A short window where NOTHING changed still finds the one
    // steady price that carried through the whole thing.
    const steady = { u1: [["2026-08-01", 3.0]] };
    assert.equal(lowestPriceInWindow(steady, "u1", "2026-09-25", 30), 3.0);
    // A window entirely before the URL was ever seen has no data.
    assert.equal(lowestPriceInWindow(history, "u1", "2026-08-15", 10), null);
    // A custom window length (the default is 30).
    assert.equal(lowestPriceInWindow(history, "u1", "2026-09-16", 3), 1.5, "09-14..09-16, only the 1.5 change (09-15) and its carry-in from 09-01 (2.0) apply");
    assert.equal(lowestPriceInWindow({}, "unknown-url", "2026-09-25"), null);
  }),
  test("lowestPriceInWindow: the real 'real discount' check — today's price only counts as a discount when it's below the 30-day low, and a price that only ever went UP during the window is its own low", () => {
    const history = { u1: [["2026-08-30", 1.0], ["2026-09-10", 1.5], ["2026-09-24", 1.2]] };
    const low = lowestPriceInWindow(history, "u1", "2026-09-26", 30);
    assert.equal(low, 1.0, "the 08-30 carry-in price is still the lowest, even though it's outside the last few explicit changes");
    assert.ok(1.2 > low, "today's 1.2 is NOT a real discount against the 30-day low of 1.0");
  }),
  test("shiftDate: plain calendar arithmetic, forward and backward, across a month boundary", () => {
    assert.equal(shiftDate("2026-09-26", -29), "2026-08-28", "the start of a 30-day window ending 09-26");
    assert.equal(shiftDate("2026-09-26", 0), "2026-09-26");
    assert.equal(shiftDate("2026-09-01", -1), "2026-08-31");
    assert.equal(shiftDate("2026-12-31", 1), "2027-01-01");
  }),
  test("End to end: a month of recorded changes, then asking for a specific past day's price and the 30-day low, the way frontend/pricing.js's future 'real discount' check would", () => {
    let history = {};
    const days = [
      ["2026-08-27", 5.0],
      ["2026-09-05", 4.5],
      ["2026-09-05", 4.5], // unchanged elsewhere the same day — no-op
      ["2026-09-15", 6.0],
      ["2026-09-26", 4.8],
    ];
    for (const [date, price] of days) {
      const result = recordPrices(history, date, { "https://store/x": price });
      history = result.history;
    }
    assert.deepEqual(history["https://store/x"], [
      ["2026-08-27", 5.0],
      ["2026-09-05", 4.5],
      ["2026-09-15", 6.0],
      ["2026-09-26", 4.8],
    ]);
    assert.equal(priceOnDate(history, "https://store/x", "2026-09-10"), 4.5);
    assert.equal(lowestPriceInWindow(history, "https://store/x", "2026-09-26", 30), 4.5, "4.5 (09-05) beats today's 4.8 and 09-15's 6.0");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
