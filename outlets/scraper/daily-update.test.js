// Regression test for outlets/scraper/daily-update.js — currently a
// stub (no mall/brand scraper built yet, see CLAUDE.md's "Outlets"
// roadmap). Just pins that it runs cleanly and never throws, since
// scraper/daily-update.js (grocery) relies on that — see its own
// runOutletsStep(), which treats ANY throw here as caught-and-logged,
// never fatal to the grocery run either way, but a script that
// throws on every single invocation would still be worth catching
// here first.
// Run with: node outlets/scraper/daily-update.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { main } = require("./daily-update");

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
  test("main() runs without throwing and without contacting a store (no scraper exists yet)", () => {
    assert.doesNotThrow(() => main());
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
