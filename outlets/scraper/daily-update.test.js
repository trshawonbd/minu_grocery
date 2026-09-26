// Tests for outlets/scraper/daily-update.js — the weekly-malls /
// daily-brands decision logic, run with stub fetchers so nothing here
// ever contacts a site.
// Run with: node outlets/scraper/daily-update.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { main, shouldRefreshMalls, BRANDS } = require("./daily-update");

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

const NOW = new Date("2026-09-26T05:00:00Z");
const quiet = () => {};

function stubs(fetchedAt, overrides = {}) {
  const calls = [];
  const brands = ["Denim Dream", "Klick", "Apotheka", "Euronics"].map((name) => ({ name, run: async () => calls.push(name) }));
  const deps = {
    now: NOW,
    log: quiet,
    readMallsFetchedAt: () => fetchedAt,
    fetchMalls: async () => calls.push("malls"),
    brands,
    ...overrides,
  };
  return { deps, calls, brands };
}

(async () => {
  await test("shouldRefreshMalls: missing, unreadable, or 7+ days old -> refresh; fresher than 7 days -> skip", () => {
    assert.equal(shouldRefreshMalls(null, NOW), true);
    assert.equal(shouldRefreshMalls("not a date", NOW), true);
    assert.equal(shouldRefreshMalls("2026-09-19T05:00:00Z", NOW), true, "exactly 7 days old refreshes");
    assert.equal(shouldRefreshMalls("2026-09-24T05:00:00Z", NOW), false);
  });
  await test("the real brand list is every built brand, in order", () => {
    assert.deepEqual(BRANDS.map((b) => b.name), ["Denim Dream", "Klick", "Apotheka", "Euronics", "Charlot", "Skechers", "Kingitus.ee", "Danija", "Reserved", "Cropp"]);
    assert.ok(BRANDS.every((b) => typeof b.run === "function"));
  });
  await test("main: a fresh mall directory is NOT re-fetched (weekly rule) but every brand still runs daily, in order", async () => {
    const { deps, calls } = stubs("2026-09-24T05:00:00Z");
    const ran = await main(deps);
    assert.deepEqual(calls, ["Denim Dream", "Klick", "Apotheka", "Euronics"]);
    assert.deepEqual(ran, { malls: false, brands: { "Denim Dream": true, Klick: true, Apotheka: true, Euronics: true } });
  });
  await test("main: a week-old mall directory is re-fetched first, then the brands", async () => {
    const { deps, calls } = stubs("2026-09-18T05:00:00Z");
    const ran = await main(deps);
    assert.deepEqual(calls, ["malls", "Denim Dream", "Klick", "Apotheka", "Euronics"]);
    assert.equal(ran.malls, true);
  });
  await test("main: one brand failing never stops the next one, and nothing throws out to the grocery update", async () => {
    const { deps, calls, brands } = stubs(null);
    brands[1].run = async () => { throw new Error("site down"); };
    const ran = await main({ ...deps, fetchMalls: async () => { throw new Error("site down"); } });
    assert.deepEqual(calls, ["Denim Dream", "Apotheka", "Euronics"]);
    assert.deepEqual(ran, { malls: false, brands: { "Denim Dream": true, Klick: false, Apotheka: true, Euronics: true } });
  });

  const pass = results.filter(Boolean).length;
  const fail = results.length - pass;
  console.log("");
  console.log(`${pass} passed, ${fail} failed (${results.length} total)`);
  if (fail > 0) process.exit(1);
})();
