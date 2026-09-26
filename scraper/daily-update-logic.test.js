// Regression tests for scraper/daily-update-logic.js — the pure logic
// behind the daily automatic price update (scraper/daily-update.js).
// Run with: node scraper/daily-update-logic.test.js
// or:       npm test

const assert = require("node:assert/strict");
const {
  checkRepoSafety,
  checkStoreSafety,
  updateProductPrices,
  availableStoreCount,
  updateHidden,
  findLeftoverPool,
} = require("./daily-update-logic");

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

// A minimal fresh item, shaped like what scrape-output.js's
// toStoreEntry reads from (item.signature.size, not a plain "size").
function freshItem(url, price, extra = {}) {
  return { url, price, currency: "EUR", signature: { size: null }, ...extra };
}

function product(prices) {
  return { name: "Test product", category: "Test", prices };
}

const results = [
  test("Price update: a fresh item found by URL updates that store's price, leaving the URL and other stores untouched", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
      rimi: { price: 2.0, currency: "EUR", url: "r1" },
    });
    const freshByStore = { barbora: [freshItem("b1", 1.29)] };
    const { priceUpdates, newlyUnavailable, reactivated } = updateProductPrices(p, freshByStore);
    assert.equal(priceUpdates, 1);
    assert.equal(newlyUnavailable, 0);
    assert.equal(reactivated, 0);
    assert.equal(p.prices.barbora.price, 1.29);
    assert.equal(p.prices.barbora.url, "b1");
    // Rimi wasn't in freshByStore at all (unsafe/failed this run) —
    // its entry must be byte-for-byte untouched.
    assert.deepEqual(p.prices.rimi, { price: 2.0, currency: "EUR", url: "r1" });
  }),

  test("Image: a fresh item's store photo URL is carried into the existing entry by URL (so the nightly run fills in images with no extra scrape); a fresh item with no photo KEEPS the entry's last known one (the owner's call, 2026-09-26: keep and fill, never drop)", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
      rimi: { price: 2.0, currency: "EUR", url: "r1", image: "https://example.test/r/old" },
    });
    updateProductPrices(p, {
      barbora: [freshItem("b1", 1.29, { image: "https://example.test/b/x_m.png" })],
      rimi: [freshItem("r1", 2.0)],
    });
    assert.equal(p.prices.barbora.image, "https://example.test/b/x_m.png");
    assert.equal(p.prices.barbora.price, 1.29);
    assert.equal(p.prices.rimi.image, "https://example.test/r/old", "no photo in the fresh listing -> the last known one stays");
  }),
  test("Unavailable: a store's URL missing from the fresh scrape marks that entry unavailable, keeping its last known price", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
    });
    const freshByStore = { barbora: [freshItem("some-other-url", 5.0)] };
    const { priceUpdates, newlyUnavailable } = updateProductPrices(p, freshByStore);
    assert.equal(priceUpdates, 0);
    assert.equal(newlyUnavailable, 1);
    assert.equal(p.prices.barbora.unavailable, true);
    assert.equal(p.prices.barbora.price, 1.0, "last known price is kept, not cleared");
    assert.equal(p.prices.barbora.url, "b1", "URL is kept so a later run can still find and reactivate it");
  }),

  test("Reactivation: a previously-unavailable store found again by URL clears the flag and updates the price", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1", unavailable: true },
    });
    const freshByStore = { barbora: [freshItem("b1", 1.49)] };
    const { reactivated } = updateProductPrices(p, freshByStore);
    assert.equal(reactivated, 1);
    assert.equal(p.prices.barbora.unavailable, undefined);
    assert.equal(p.prices.barbora.price, 1.49);
  }),

  test("Hide under 2 stores: a product left with only 1 available store is hidden, never deleted; 2+ stays visible", () => {
    const oneLeft = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1", unavailable: true },
      rimi: { price: 2.0, currency: "EUR", url: "r1" },
    });
    assert.equal(availableStoreCount(oneLeft), 1);
    assert.equal(updateHidden(oneLeft), true);
    assert.equal(oneLeft.hidden, true);
    assert.ok(oneLeft.prices.barbora, "the unavailable store's entry still exists — never deleted");

    const twoLeft = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1" },
      rimi: { price: 2.0, currency: "EUR", url: "r1" },
      selver: { price: 3.0, currency: "EUR", url: "s1", unavailable: true },
    });
    assert.equal(availableStoreCount(twoLeft), 2);
    assert.equal(updateHidden(twoLeft), false);

    // Reactivating a store must flip hidden back to false, the same
    // run a later scrape finds it again.
    updateProductPrices(oneLeft, { barbora: [freshItem("b1", 1.1)] });
    assert.equal(updateHidden(oneLeft), false);
  }),

  test("Pending not published: findLeftoverPool only returns items whose URL isn't already tied to an existing product", () => {
    const existing = [
      product({
        barbora: { price: 1.0, currency: "EUR", url: "b1" },
        rimi: { price: 2.0, currency: "EUR", url: "r1" },
      }),
    ];
    const freshByStore = {
      barbora: [freshItem("b1", 1.1), freshItem("b2", 4.5)], // b1 already used, b2 is new
      rimi: [freshItem("r1", 2.2)], // already used, no new Rimi items
      selver: [freshItem("s1", 3.3)], // a store with no existing product at all
    };
    const pool = findLeftoverPool(existing, freshByStore);
    assert.deepEqual(
      pool.map((i) => i.url).sort(),
      ["b2", "s1"]
    );
  }),

  test("Safety: a 20%+ item count drop is unsafe, under 20% is safe", () => {
    const previous = Array.from({ length: 100 }, (_, i) => ({ url: `u${i}`, price: 1 }));
    const droppedTo79 = previous.slice(0, 79); // 21% fewer
    const droppedTo81 = previous.slice(0, 81); // 19% fewer

    assert.equal(checkStoreSafety(previous, droppedTo79).safe, false);
    assert.equal(checkStoreSafety(previous, droppedTo79).reason, "item-count-drop");
    assert.equal(checkStoreSafety(previous, droppedTo81).safe, true);
  }),

  test("Safety: more than 30% of matched items changing price by more than 50% is unsafe, 30% or fewer is safe", () => {
    const previous = Array.from({ length: 10 }, (_, i) => ({ url: `u${i}`, price: 10 }));
    // 4 of 10 (40%) triple in price — over both thresholds.
    const freshUnsafe = previous.map((item, i) => ({ url: item.url, price: i < 4 ? 30 : 10 }));
    assert.equal(checkStoreSafety(previous, freshUnsafe).safe, false);
    assert.equal(checkStoreSafety(previous, freshUnsafe).reason, "price-volatility");

    // Exactly 3 of 10 (30%) triple — at the threshold, not over it.
    const freshAtThreshold = previous.map((item, i) => ({ url: item.url, price: i < 3 ? 30 : 10 }));
    assert.equal(checkStoreSafety(previous, freshAtThreshold).safe, true);

    // A real, ordinary sale/price-change (under 50%) on every item
    // must never trip this.
    const freshOrdinary = previous.map((item) => ({ url: item.url, price: 11 }));
    assert.equal(checkStoreSafety(previous, freshOrdinary).safe, true);
  }),

  test("Safety: with no previous data at all (a brand-new category), any fresh list is safe — nothing to compare against", () => {
    const fresh = [{ url: "u1", price: 1 }];
    assert.equal(checkStoreSafety([], fresh).safe, true);
  }),

  test("Repo safety: a clean git status and no work-in-progress marker is safe", () => {
    assert.equal(checkRepoSafety("", false).safe, true);
  }),

  test("Repo safety: uncommitted changes anywhere in the repo (not just data/) are unsafe", () => {
    const result = checkRepoSafety(" M scraper/categories.js\n", false);
    assert.equal(result.safe, false);
    assert.equal(result.reason, "uncommitted-changes");
  }),

  test("Repo safety: data/.work-in-progress existing is unsafe even with an otherwise-clean git status", () => {
    const result = checkRepoSafety("", true);
    assert.equal(result.safe, false);
    assert.equal(result.reason, "work-in-progress");
  }),

  test("Repo safety: the work-in-progress marker is checked first — its reason wins even when git status is also dirty", () => {
    const result = checkRepoSafety(" M data/prices.json\n", true);
    assert.equal(result.safe, false);
    assert.equal(result.reason, "work-in-progress");
  }),

  test("Repo safety (2026-09-26): the update's own data/logs/ files never count as dirty — untracked or modified — so a SKIPPED run's log line can't make every later run skip too; anything else still does, and the detail names it", () => {
    assert.equal(checkRepoSafety("?? data/logs/2026-09-26.txt\n", false).safe, true);
    assert.equal(checkRepoSafety(" M data/logs/2026-09-26.txt\n?? data/logs/2026-09-27.txt\n", false).safe, true);
    const other = checkRepoSafety("?? data/logs/2026-09-26.txt\n?? .claude/scheduled_tasks.lock\n", false);
    assert.equal(other.safe, false);
    assert.equal(other.reason, "uncommitted-changes");
    assert.match(other.detail, /\.claude\/scheduled_tasks\.lock/, "the offending file is named");
    assert.doesNotMatch(other.detail, /data\/logs/);
    const modified = checkRepoSafety(" M scraper/match-products.js\n", false);
    assert.equal(modified.safe, false);
    assert.match(modified.detail, /scraper\/match-products\.js/);
    assert.equal(checkRepoSafety("\n", false).safe, true);
  }),

  test("Images: a fresh item's photo URL replaces the entry's; a fresh item WITHOUT one keeps the photo the entry already had (never dropped); imagesFilled counts entries that gained their first photo", () => {
    const p = product({
      barbora: { price: 1.0, currency: "EUR", url: "b1", image: "https://b/old.jpg" },
      rimi: { price: 1.2, currency: "EUR", url: "r1" },
      selver: { price: 1.1, currency: "EUR", url: "s1" },
    });
    const counts = updateProductPrices(p, {
      barbora: [freshItem("b1", 1.05)],
      rimi: [freshItem("r1", 1.25, { image: "https://r/new.jpg" })],
      selver: [freshItem("s1", 1.15)],
    });
    assert.equal(p.prices.barbora.image, "https://b/old.jpg", "kept when the fresh item has none");
    assert.equal(p.prices.barbora.price, 1.05, "price still refreshed");
    assert.equal(p.prices.rimi.image, "https://r/new.jpg", "filled from the fresh item");
    assert.equal(p.prices.selver.image, undefined);
    assert.equal(counts.imagesFilled, 1);
    const replaced = product({ barbora: { price: 1.0, currency: "EUR", url: "b1", image: "https://b/old.jpg" } });
    updateProductPrices(replaced, { barbora: [freshItem("b1", 1.0, { image: "https://b/new.jpg" })] });
    assert.equal(replaced.prices.barbora.image, "https://b/new.jpg", "a fresh photo wins");
    // An unavailable listing keeps its photo too.
    const gone = product({ barbora: { price: 1.0, currency: "EUR", url: "b1", image: "https://b/old.jpg" } });
    updateProductPrices(gone, { barbora: [] });
    assert.equal(gone.prices.barbora.image, "https://b/old.jpg");
    assert.equal(gone.prices.barbora.unavailable, true);
  }),

  // Source-level guard: the daily update walks every category in
  // scraper/categories.js — never a fixed list of its own — so a new
  // category is refreshed from its first morning on (the owner's
  // question when the list reached 53).
  test("Daily update covers every category in scraper/categories.js (53 today), from that list, never a fixed one of its own", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const { CATEGORIES } = require("./categories");
    assert.ok(CATEGORIES.length >= 53, `expected at least 53 categories, found ${CATEGORIES.length}`);
    const source = fs.readFileSync(path.join(__dirname, "daily-update.js"), "utf8");
    assert.match(source, /for \(const category of CATEGORIES\)/, "iterates CATEGORIES from categories.js");
    for (const c of CATEGORIES) assert.doesNotMatch(source, new RegExp(`"${c.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `no category named in the script itself (${c.name})`);
    // Every store module is fetched, and the log always gets written —
    // on a skip and on a failure as well as on a finished run.
    for (const store of ["barbora", "rimi", "selver", "coop"]) assert.match(source, new RegExp(`require\\("\\./stores/${store}"\\)`), `${store} module is used`);
    assert.match(source, /SKIPPED — \$\{safety\.reason\}/, "a skipped run logs its reason");
    assert.match(source, /FAILED — \$\{err\.stack/, "a failed run logs the error");
    assert.match(source, /STARTED \(/, "a run logs that it started before fetching");
  }),

  // Source-level guard, same style as no-scrape.test.js: the push step
  // is I/O with no pure logic to unit-test, but its two invariants —
  // it exists, and it can never force-push — are cheap to pin down by
  // reading the script itself.
  test("Daily update pushes after committing, and never with --force (or any force-push spelling)", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const source = fs.readFileSync(path.join(__dirname, "daily-update.js"), "utf8");
    assert.match(source, /execFileSync\("git",\s*\["push",\s*"origin",\s*"HEAD"\]/, "a plain `git push origin HEAD` must be present");
    assert.doesNotMatch(source, /--force|force-with-lease|"-f"|"\+[A-Za-z]/, "no force-push flag or +refspec anywhere in the script");
    // The push is wrapped so a failure is logged, not thrown — the
    // whole run must never exit non-zero just because GitHub or the
    // network was unreachable.
    assert.match(source, /function gitPush\(\) \{\s*try \{/, "push must be inside a try block");
  }),
];

const pass = results.filter(Boolean).length;
const fail = results.length - pass;
console.log("");
console.log(`${pass} passed, ${fail} failed (${results.length} total)`);

if (fail > 0) {
  process.exit(1);
}
