// Regression tests for outlets/scraper/malls.js — the pure per-mall
// parsers, the gym-by-name filter, and the cross-mall name-casing
// pass. Each fixture below is a small, hand-trimmed real excerpt from
// that mall's own page (checked against the full page by hand,
// 2026-09-26), not a made-up shape — the same principle
// scraper/*.test.js follows for the grocery stores. Never contacts a
// site.
// Run with: node outlets/scraper/malls.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { parseUlemiste, parseRoccaAlMare, parseKristiine, parseViru, parseLounakeskus, isGymByName, buildCanonicalNames, applyCanonicalNames, titleCase } = require("./malls");

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
  test("Ülemiste: a real shop is kept with its category/floor/link; an entertainment listing (Apollo Kino, category Meelelahutus) is skipped", () => {
    const html = `
      <a href="https://www.ulemiste.ee/kauplused/toidupoed/"><h6 class="text-green-400">Toidupoed</h6></a>
      <div class="mr-6">1. korrus</div>
      <a href="https://www.ulemiste.ee/kauplus/54gurmee/"><h3 class="uppercase">54 Gurmee</h3></a>
      <a href="https://www.ulemiste.ee/kauplused/meelelahutus/"><h6 class="text-green-400">Meelelahutus</h6></a>
      <div class="mr-6">3. korrus</div>
      <a href="https://www.ulemiste.ee/kauplus/apollo-kino/"><h3 class="uppercase">Apollo Kino</h3></a>
    `;
    const shops = parseUlemiste(html);
    assert.deepEqual(shops, [{ name: "54 Gurmee", category: "Toidupoed", floor: "1", url: "https://www.ulemiste.ee/kauplus/54gurmee/" }]);
  }),
  test("Rocca al Mare: only data-website-cat=\"shops\" is kept — a restaurant (data-website-cat=\"restaurants\") is skipped; the Estonian category slug is the 3rd of 4 (en, no, et, fi), never the last", () => {
    const html = `
      <div class="store-card" data-website-cat="shops"
      data-sales-group="home-and-sporting-goods hjem-og-sportsutstyr kodu-ja-spordikaubad koti-ja-urheilu" data-title="apollo">
      <a href="https://www.roccaalmare.ee/store/apollo-2/"><h4>Apollo</h4></a></div>
      <div class="store-card" data-website-cat="restaurants"
      data-sales-group="cafes-and-restaurants kafeer-og-restauranter kohvikud-ja-restoranid ravintolat-ja-kahvilat" data-title="kfc">
      <a href="https://www.roccaalmare.ee/store/kfc/"><h4>KFC</h4></a></div>
    `;
    const shops = parseRoccaAlMare(html);
    assert.deepEqual(shops, [{ name: "Apollo", category: "kodu-ja-spordikaubad", floor: null, url: "https://www.roccaalmare.ee/store/apollo-2/" }]);
  }),
  test("Kristiine: 'Teenused' and 'Kohvikud ja restoranid' are skipped; a store spanning two floors ('1 korrus ja 2 korrus' — Reserved, H&M) is KEPT with its real floor text, not dropped (the real bug this fixed)", () => {
    const html = `
      <a class="store-card" href="/kauplused/mood-ja-aksessuaarid/reserved/-/27f"><h4 class="store-name">Reserved</h4>
      <p class="fob-floor"><span class="floor d-block">Mood ja aksessuaarid</span> <span class="mb-2">1 korrus ja 2 korrus</span></p></a>
      <a class="store-card" href="/kauplused/teenused/telia/-/1"><h4 class="store-name">Telia esindus</h4>
      <p class="fob-floor"><span class="floor d-block">Teenused</span> <span class="mb-2">1 korrus</span></p></a>
      <a class="store-card" href="/kauplused/kohvikud-ja-restoranid/kfc/-/2"><h4 class="store-name">KFC</h4>
      <p class="fob-floor"><span class="floor d-block">Kohvikud ja restoranid</span> <span class="mb-2">1 korrus</span></p></a>
    `;
    const shops = parseKristiine(html);
    assert.deepEqual(shops, [{ name: "Reserved", category: "Mood ja aksessuaarid", floor: "1 ja 2", url: "https://www.kristiinekeskus.ee/kauplused/mood-ja-aksessuaarid/reserved/-/27f" }]);
  }),
  test("Kristiine: a gym hiding inside an otherwise shop-shaped category ('Vaba aeg' also holds a bookshop and a hobby shop) is skipped by NAME, not by category", () => {
    const html = `
      <a class="store-card" href="/kauplused/vaba-aeg/myfitness/-/1"><h4 class="store-name">MyFitness Kristiine</h4>
      <p class="fob-floor"><span class="floor d-block">Vaba aeg</span> <span class="mb-2">2 korrus</span></p></a>
      <a class="store-card" href="/kauplused/vaba-aeg/mnogoknig/-/2"><h4 class="store-name">Mnogoknig</h4>
      <p class="fob-floor"><span class="floor d-block">Vaba aeg</span> <span class="mb-2">1 korrus</span></p></a>
    `;
    const shops = parseKristiine(html);
    assert.equal(shops.length, 1);
    assert.equal(shops[0].name, "Mnogoknig");
  }),
  test("Viru Keskus: parses the embedded window.__shopsInitialData JSON blob; a service/quick-food category is skipped", () => {
    const html = `<script>window.__shopsInitialData = {"posts":[{"letter":"A","posts":[
      {"title":"adidas Originals","url":"https://virukeskus.com/kauplused/adidas-originals","cats":["mood"],"groups":[]},
      {"title":"Telia","url":"https://virukeskus.com/kauplused/telia","cats":["teenus"],"groups":[]},
      {"title":"R-Kiosk I korrus","url":"https://virukeskus.com/kauplused/r-kiosk","cats":["kiire-eine"],"groups":[]}
    ]}]};</script>`;
    const shops = parseViru(html);
    assert.deepEqual(shops, [{ name: "adidas Originals", category: "mood", floor: null, url: "https://virukeskus.com/kauplused/adidas-originals" }]);
  }),
  test("Lõunakeskus: name+floor+link are read even when category isn't available (a client-side-only filter, not scraped) — a shop with NO floor badge at all is still kept, floor null rather than dropped", () => {
    const html = `
      <a href="https://www.astri.ee/lounakeskus/poed/pood/denim-dream/" title="Denim Dream" class="absolute inset-0 z-1"></a>
      <h3>Denim Dream</h3><div class="badge-primary">1. korrus</div>
      <a href="https://www.astri.ee/lounakeskus/poed/pood/astri-arena/" title="Astri Arena" class="absolute inset-0 z-1"></a>
      <h3>Astri Arena</h3>
    `;
    const shops = parseLounakeskus(html);
    assert.deepEqual(shops, [
      { name: "Denim Dream", category: null, floor: "1", url: "https://www.astri.ee/lounakeskus/poed/pood/denim-dream/" },
      { name: "Astri Arena", category: null, floor: null, url: "https://www.astri.ee/lounakeskus/poed/pood/astri-arena/" },
    ]);
  }),
  test("isGymByName: catches every real gym name found in step 2 (MyFitness, Gym!) case-insensitively; never a genuine shop whose name merely contains a similar-looking word", () => {
    assert.equal(isGymByName("MyFitness Kristiine"), true);
    assert.equal(isGymByName("Gym! Tallinn Ülemiste"), true);
    assert.equal(isGymByName("myfitness"), true);
    assert.equal(isGymByName("Apollo"), false);
    assert.equal(isGymByName("Sportland"), false, "a sporting-goods RETAILER is not a gym");
  }),
  test("Cross-mall name casing: the one mall that already wrote a brand in normal case wins over every mall that shouted it in caps; a name seen only in caps falls back to Title Case", () => {
    const shops = [
      { name: "DENIM DREAM", category: null, floor: null, url: "https://a" },
      { name: "Denim Dream", category: null, floor: "1", url: "https://b" }, // the one normal-case spelling
      { name: "DENIM DREAM", category: null, floor: null, url: "https://c" },
      { name: "PEPCO", category: null, floor: null, url: "https://d" }, // never spelled any other way
    ];
    const canonical = buildCanonicalNames(shops);
    const result = applyCanonicalNames(shops, canonical);
    assert.deepEqual(result.map((s) => s.name), ["Denim Dream", "Denim Dream", "Denim Dream", "Pepco"]);
    assert.equal(titleCase("DENIM DREAM"), "Denim Dream");
    assert.equal(titleCase("H&M"), "H&M", "a bare ampersand is left alone, not treated as a word to capitalize");
  }),
  test("titleCase leaves a short (<=4 letter) all-caps word alone as a likely acronym/stylization ('CCC', 'IKEA') instead of Title-Casing it into 'Ccc'/'Ikea'; a periods-between-letters acronym keeps each letter capitalized", () => {
    assert.equal(titleCase("CCC"), "CCC");
    assert.equal(titleCase("IKEA"), "IKEA");
    assert.equal(titleCase("I.L.U."), "I.L.U.");
    assert.equal(titleCase("REKLAAMLEHT"), "Reklaamleht", "a genuinely long all-caps word is still Title-Cased");
  }),
  test("Ülemiste: a numeric HTML entity in a shop name (&#038; for &) is decoded, matching the &amp; case already handled", () => {
    const html = `
      <a href="https://www.ulemiste.ee/kauplused/mood/"><h6 class="text-green-400">Mood</h6></a>
      <div class="mr-6">1. korrus</div>
      <a href="https://www.ulemiste.ee/kauplus/hm-home/"><h3 class="uppercase">H&#038;M Home</h3></a>
    `;
    const shops = parseUlemiste(html);
    assert.equal(shops[0].name, "H&M Home");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
