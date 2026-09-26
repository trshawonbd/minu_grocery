// Tests for outlets/scraper/daily-update.js — the weekly-malls /
// daily-brand decision logic, run with stub fetchers so nothing here
// ever contacts a site.
// Run with: node outlets/scraper/daily-update.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { main, shouldRefreshMalls } = require("./daily-update");

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
  const deps = {
    now: NOW,
    log: quiet,
    readMallsFetchedAt: () => fetchedAt,
    fetchMalls: async () => calls.push("malls"),
    fetchDenimDream: async () => calls.push("denimDream"),
    ...overrides,
  };
  return { deps, calls };
}

(async () => {
  await test("shouldRefreshMalls: missing, unreadable, or 7+ days old -> refresh; fresher than 7 days -> skip", () => {
    assert.equal(shouldRefreshMalls(null, NOW), true);
    assert.equal(shouldRefreshMalls("not a date", NOW), true);
    assert.equal(shouldRefreshMalls("2026-09-19T05:00:00Z", NOW), true, "exactly 7 days old refreshes");
    assert.equal(shouldRefreshMalls("2026-09-10T05:00:00Z", NOW), true);
    assert.equal(shouldRefreshMalls("2026-09-24T05:00:00Z", NOW), false);
    assert.equal(shouldRefreshMalls("2026-09-26T04:00:00Z", NOW), false);
  });
  await test("main: a fresh mall directory is NOT re-fetched (weekly rule) but Denim Dream still runs daily", async () => {
    const { deps, calls } = stubs("2026-09-24T05:00:00Z");
    const ran = await main(deps);
    assert.deepEqual(calls, ["denimDream"]);
    assert.deepEqual(ran, { malls: false, denimDream: true });
  });
  await test("main: a week-old mall directory is re-fetched first, then Denim Dream", async () => {
    const { deps, calls } = stubs("2026-09-18T05:00:00Z");
    const ran = await main(deps);
    assert.deepEqual(calls, ["malls", "denimDream"]);
    assert.deepEqual(ran, { malls: true, denimDream: true });
  });
  await test("main: one site failing never stops the other, and never throws out to the grocery update", async () => {
    const { deps, calls } = stubs(null, { fetchMalls: async () => { throw new Error("site down"); } });
    const ran = await main(deps);
    assert.deepEqual(calls, ["denimDream"]);
    assert.deepEqual(ran, { malls: false, denimDream: true });
    const second = stubs(null, { fetchDenimDream: async () => { throw new Error("site down"); } });
    const ran2 = await main(second.deps);
    assert.deepEqual(second.calls, ["malls"]);
    assert.deepEqual(ran2, { malls: true, denimDream: false });
  });

  const pass = results.filter(Boolean).length;
  const fail = results.length - pass;
  console.log("");
  console.log(`${pass} passed, ${fail} failed (${results.length} total)`);
  if (fail > 0) process.exit(1);
})();
