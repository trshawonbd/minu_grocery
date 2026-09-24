// Enforces that only scraper/fetch-price.js ever contacts a store —
// everything else (scraper/raw.js, scraper/build-review.js, matching
// experiments) must read data/raw/ instead of scraping again. See
// scraper/raw.js.
//
// Two independent checks, since either one alone could be worked
// around: a file could avoid naming fetchBarboraPrice/etc. and inline
// its own fetch() call instead, or reference a store's domain without
// going through the named function.
// Run with: node scraper/no-scrape.test.js
// or:       npm test

const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FETCH_PRICE_FILE = path.join(__dirname, "fetch-price.js");
// This file itself necessarily names every function/domain it's
// scanning for, in the lists right below — excluded from its own
// scan for that reason, not because it's allowed to call them.
const THIS_FILE = path.join(__dirname, "no-scrape.test.js");
const STORE_MODULE_FILES = [
  path.join(__dirname, "stores", "barbora.js"),
  path.join(__dirname, "stores", "rimi.js"),
  path.join(__dirname, "stores", "selver.js"),
];
const FETCH_FUNCTION_NAMES = ["fetchBarboraPrice", "fetchRimiPrice", "fetchSelverPrice"];
const STORE_DOMAINS = ["barbora.ee", "rimi.ee", "selver.ee"];

function listJsFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "data") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listJsFiles(full));
    } else if (entry.name.endsWith(".js")) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = listJsFiles(ROOT);
const relFiles = (files) => files.map((f) => path.relative(ROOT, f)).sort();

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
  test("Only scraper/fetch-price.js references a store's fetch function (fetchBarboraPrice/fetchRimiPrice/fetchSelverPrice)", () => {
    // Each store module legitimately defines and exports its own
    // fetch function — a definition isn't a call, so those files are
    // excluded here; a caller anywhere else is the violation.
    const candidates = allFiles.filter((f) => f !== FETCH_PRICE_FILE && f !== THIS_FILE && !STORE_MODULE_FILES.includes(f));
    const offenders = [];
    for (const file of candidates) {
      const text = fs.readFileSync(file, "utf8");
      for (const name of FETCH_FUNCTION_NAMES) {
        if (text.includes(name)) offenders.push(`${path.relative(ROOT, file)} references ${name}`);
      }
    }
    assert.deepEqual(offenders, [], `found a store-fetch reference outside fetch-price.js:\n${offenders.join("\n")}`);
  }),
  test("Only scraper/fetch-price.js and the store modules themselves mention a store's domain", () => {
    const candidates = allFiles.filter((f) => f !== FETCH_PRICE_FILE && f !== THIS_FILE && !STORE_MODULE_FILES.includes(f));
    const offenders = [];
    for (const file of candidates) {
      const text = fs.readFileSync(file, "utf8");
      for (const domain of STORE_DOMAINS) {
        if (text.includes(domain)) offenders.push(`${path.relative(ROOT, file)} mentions ${domain}`);
      }
    }
    assert.deepEqual(offenders, [], `found a store domain reference outside fetch-price.js/stores:\n${offenders.join("\n")}`);
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
