// Tests for outlets/scraper/fetch-helpers.js — robots.txt reading
// (which crawl-delay applies to us, which agents get "Disallow: /")
// and the per-site fetcher's waiting. No network: the fetch is a stub.
// Run with: node outlets/scraper/fetch-helpers.test.js
// or:       npm run test:outlets

const assert = require("node:assert/strict");
const { crawlDelayFor, agentsDisallowingAll, siteFetcher, USER_AGENT } = require("./fetch-helpers");

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

const CHARLOT_LIKE = `
User-agent: PetalBot
Disallow: /

User-agent: AhrefsBot
User-agent: SemrushBot
Disallow: /

User-agent: *
Crawl-delay: 10
Disallow: /*?*
Disallow: /profiil/

Sitemap: https://charlot.ee/sitemap_index.xml
`;

(async () => {
  await test("crawlDelayFor: the '*' group's Crawl-delay applies to us (10 for a Charlot-shaped file); a file with none gives null; a group naming us wins over '*'", () => {
    assert.equal(crawlDelayFor(CHARLOT_LIKE), 10);
    assert.equal(crawlDelayFor("User-agent: *\nDisallow: /cart/\n"), null);
    assert.equal(crawlDelayFor("User-agent: *\nCrawl-delay: 2\n\nUser-agent: MinuOutlets\nCrawl-delay: 5\n"), 5);
    assert.equal(crawlDelayFor(""), null);
  });
  await test("agentsDisallowingAll: lists exactly the user-agents whose group says 'Disallow: /' — never '*' when '*' only blocks paths (the Charlot check that let the build go ahead)", () => {
    assert.deepEqual(agentsDisallowingAll(CHARLOT_LIKE), ["PetalBot", "AhrefsBot", "SemrushBot"]);
    assert.deepEqual(agentsDisallowingAll("User-agent: *\nDisallow: /\n"), ["*"]);
    assert.deepEqual(agentsDisallowingAll("User-agent: *\nDisallow: /cart/\n"), []);
  });
  await test("siteFetcher: waits max(1 s, crawl-delay) before every request after the first, sends our User-Agent, throws on a non-2xx", async () => {
    const calls = [];
    const sleeps = [];
    const fetchImpl = async (url, opts) => { calls.push([url, opts.headers["User-Agent"]]); return { ok: !/bad/.test(url), status: /bad/.test(url) ? 503 : 200, text: async () => "<html>", json: async () => ({ ok: 1 }) }; };
    const f = siteFetcher({ crawlDelaySeconds: 10, fetchImpl, sleepImpl: async (ms) => sleeps.push(ms) });
    await f.text("https://a/1");
    await f.text("https://a/2");
    await f.json("https://a/3");
    assert.deepEqual(sleeps, [10000, 10000], "no wait before the first request, 10 s before each later one");
    assert.ok(calls.every((c) => c[1] === USER_AGENT));
    await assert.rejects(() => f.text("https://a/bad"), /HTTP 503/);
    const quick = siteFetcher({ crawlDelaySeconds: 0.2, fetchImpl, sleepImpl: async (ms) => sleeps.push(ms) });
    await quick.text("https://b/1");
    await quick.text("https://b/2");
    assert.equal(sleeps[sleeps.length - 1], 1000, "never faster than 1 request/second");
  });

  const pass = results.filter(Boolean).length;
  const fail = results.length - pass;
  console.log("");
  console.log(`${pass} passed, ${fail} failed (${results.length} total)`);
  if (fail > 0) process.exit(1);
})();
