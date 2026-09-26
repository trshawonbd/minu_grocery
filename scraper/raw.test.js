// Regression test for scraper/raw.js — specifically, that
// loadRawPool actually propagates a category's per-item settings
// (strictPackaging, matchAcrossWeights) from meta.json onto the pool
// items it builds, the same way fetch-price.js does for a live run.
// Real bug found by hand: matchAcrossWeights (added for Meat) was
// wired into match-products.js and scraper/categories.js, but neither
// writeRaw nor loadRawPool ever passed it through — meta.json never
// recorded it, and every pool item built from data/raw/ silently ran
// the old strict size-equality rule instead of Meat's relaxed one, a
// live scrape's whole point. Caught only by checking a real matched
// pair by hand after the fact, not by any test — this exists so it
// can't happen silently again for the next per-category setting.
// Run with: node scraper/raw.test.js
// or:       npm test

const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { writeRaw, loadRawPool } = require("./raw");

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

function withTempDir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "minu-raw-test-"));
  try {
    run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const results = [
  test("loadRawPool sets matchAcrossWeights on every item when the category opted in, and leaves it unset when it didn't", () => {
    withTempDir((dir) => {
      writeRaw(
        "Meat",
        {
          order: 0,
          strictPackaging: true,
          matchAcrossWeights: true,
          resultsByStore: {
            Barbora: [{ store: "Barbora", name: "Seahakkliha WELL DONE,400g", price: 1.89, currency: "EUR", url: "x", ean: null }],
          },
        },
        { dir }
      );
      const pool = loadRawPool("Meat", { dir });
      assert.equal(pool.length, 1);
      assert.equal(pool[0].matchAcrossWeights, true);
      assert.equal(pool[0].signature.matchAcrossWeights, true);
    });
  }),
  test("loadRawPool leaves matchAcrossWeights unset for a category that never opted in (every category but Meat)", () => {
    withTempDir((dir) => {
      writeRaw(
        "Dairy",
        {
          order: 0,
          strictPackaging: true,
          matchAcrossWeights: false,
          resultsByStore: {
            Barbora: [{ store: "Barbora", name: "Piim ALMA 2,5%, 1L", price: 1.39, currency: "EUR", url: "x", ean: null }],
          },
        },
        { dir }
      );
      const pool = loadRawPool("Dairy", { dir });
      assert.equal(pool[0].matchAcrossWeights, undefined);
      assert.equal(pool[0].signature.matchAcrossWeights, false);
    });
  }),
  test("loadRawPool still sets strictPackaging the same way it always has, alongside the new flag", () => {
    withTempDir((dir) => {
      writeRaw(
        "Meat",
        {
          order: 0,
          strictPackaging: true,
          matchAcrossWeights: true,
          resultsByStore: {
            Rimi: [{ store: "Rimi", name: "Veisehakkliha Rimi 400g", price: 3.49, currency: "EUR", url: "x", ean: null }],
          },
        },
        { dir }
      );
      const pool = loadRawPool("Meat", { dir });
      assert.equal(pool[0].strictPackaging, true);
      assert.equal(pool[0].signature.strictPackaging, true);
    });
  }),
  test("loadRawPool propagates a category's impliedDescriptors from meta.json so a pool item's descriptors drop them, and leaves items alone when the category declares none", () => {
    withTempDir((dir) => {
      writeRaw(
        "Frozen vegetables & berries",
        {
          order: 0,
          strictPackaging: true,
          matchAcrossWeights: false,
          diaperMatching: false,
          impliedDescriptors: ["külmutatud"],
          resultsByStore: {
            Barbora: [{ store: "Barbora", name: "Külm.marjasegu MAAHÄRRA 300g", price: 2.59, currency: "EUR", url: "x", ean: null, brand: "MAAHÄRRA" }],
          },
        },
        { dir }
      );
      writeRaw(
        "Meat",
        {
          order: 1,
          strictPackaging: true,
          matchAcrossWeights: true,
          diaperMatching: false,
          resultsByStore: {
            Barbora: [{ store: "Barbora", name: "Külm.broilerifilee TALLEGG 500g", price: 4.99, currency: "EUR", url: "x", ean: null, brand: "TALLEGG" }],
          },
        },
        { dir }
      );
      const frozen = loadRawPool("Frozen vegetables & berries", { dir });
      assert.deepEqual(frozen[0].impliedDescriptors, ["külmutatud"]);
      assert.equal(frozen[0].signature.descriptors, "marjasegu", "the implied word is gone from a frozen item's descriptors");
      const meat = loadRawPool("Meat", { dir });
      assert.equal(meat[0].impliedDescriptors, undefined);
      assert.equal(meat[0].signature.descriptors, "broilerifilee külmutatud", "the same word stays a real descriptor where it isn't implied");
    });
  }),
  test("loadRawPool propagates fixedWeightMustMatch from meta.json (Fish & seafood) and leaves it unset for a category that never opted in", () => {
    withTempDir((dir) => {
      writeRaw(
        "Fish & seafood",
        {
          order: 0,
          strictPackaging: true,
          matchAcrossWeights: true,
          diaperMatching: false,
          fixedWeightMustMatch: true,
          resultsByStore: {
            Barbora: [{ store: "Barbora", name: "Sprotid õlis KAIJA, 190g", price: 1.99, currency: "EUR", url: "x", ean: null, brand: "KAIJA" }],
          },
        },
        { dir }
      );
      writeRaw(
        "Meat",
        {
          order: 1,
          strictPackaging: true,
          matchAcrossWeights: true,
          diaperMatching: false,
          resultsByStore: {
            Barbora: [{ store: "Barbora", name: "Seahakkliha RAKVERE 400g", price: 3.49, currency: "EUR", url: "x", ean: null, brand: "RAKVERE" }],
          },
        },
        { dir }
      );
      const fish = loadRawPool("Fish & seafood", { dir });
      assert.equal(fish[0].fixedWeightMustMatch, true);
      assert.equal(fish[0].signature.fixedWeightMustMatch, true);
      const meat = loadRawPool("Meat", { dir });
      assert.equal(meat[0].fixedWeightMustMatch, undefined);
      assert.equal(meat[0].signature.fixedWeightMustMatch, false);
    });
  }),
  test("loadRawPool propagates alcoholMatching from meta.json (Wine) and leaves it unset for a category that never opted in", () => {
    withTempDir((dir) => {
      writeRaw("Wine", { order: 0, strictPackaging: true, matchAcrossWeights: false, diaperMatching: false, alcoholMatching: true, resultsByStore: { Selver: [{ store: "Selver", name: "Andes Merlot 75 cl", price: 6.99, currency: "EUR", url: "x", ean: null, brand: "ANDES" }] } }, { dir });
      writeRaw("Meat", { order: 1, strictPackaging: true, matchAcrossWeights: true, diaperMatching: false, resultsByStore: { Barbora: [{ store: "Barbora", name: "Seahakkliha RAKVERE 400g", price: 3.49, currency: "EUR", url: "x", ean: null, brand: "RAKVERE" }] } }, { dir });
      const wine = loadRawPool("Wine", { dir });
      assert.equal(wine[0].alcoholMatching, true);
      assert.equal(wine[0].signature.alcoholMatching, true);
      assert.equal(wine[0].signature.size, "750ml");
      const meat = loadRawPool("Meat", { dir });
      assert.equal(meat[0].alcoholMatching, undefined);
      assert.equal(meat[0].signature.alcoholMatching, false);
    });
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
