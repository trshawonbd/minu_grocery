// The one place outlets code talks to the network from: a per-site
// fetcher that waits max(1 second, the site's robots.txt Crawl-delay)
// between its requests — the owner's rule (2026-09-26) — with the
// same User-Agent everywhere. A brand's fetch script names its
// crawl-delay explicitly (read from the site's robots.txt by hand
// when the brand was built and checked again on every run: if the
// live robots.txt now asks for MORE than the script assumes, the
// larger value wins).

const USER_AGENT = "Mozilla/5.0 (compatible; MinuOutlets/1.0)";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// The Crawl-delay that applies to us from a robots.txt text: the
// specific group for our agent if one names it, else the "*" group;
// null when none is stated.
function crawlDelayFor(robotsText, agent = "MinuOutlets") {
  let current = [];
  let inGroup = false;
  let starDelay = null;
  let ownDelay = null;
  for (const raw of (robotsText || "").split("\n")) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (inGroup) current = [];
      inGroup = false;
      current.push(value.toLowerCase());
    } else {
      inGroup = true;
      if (key === "crawl-delay") {
        const n = parseFloat(value);
        if (!Number.isFinite(n)) continue;
        if (current.some((a) => a === agent.toLowerCase())) ownDelay = Math.max(ownDelay || 0, n);
        else if (current.includes("*")) starDelay = Math.max(starDelay || 0, n);
      }
    }
  }
  return ownDelay ?? starDelay;
}

// Which user-agent groups in a robots.txt carry "Disallow: /" (the
// whole site) — so a build can say whether that applies to "*" (us).
function agentsDisallowingAll(robotsText) {
  const out = [];
  let current = [];
  let inGroup = false;
  for (const raw of (robotsText || "").split("\n")) {
    const line = raw.replace(/#.*$/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (inGroup) current = [];
      inGroup = false;
      current.push(value);
    } else {
      inGroup = true;
      if (key === "disallow" && value === "/") out.push(...current);
    }
  }
  return [...new Set(out)];
}

// siteFetcher({ crawlDelaySeconds }) -> { text(url), json(url) },
// each waiting the site's delay before every request after the first.
function siteFetcher({ crawlDelaySeconds = 1, fetchImpl = fetch, sleepImpl = sleep } = {}) {
  const delayMs = Math.max(1, crawlDelaySeconds) * 1000;
  let first = true;
  async function request(url, accept) {
    if (!first) await sleepImpl(delayMs);
    first = false;
    const response = await fetchImpl(url, { headers: { "User-Agent": USER_AGENT, Accept: accept, "Accept-Language": "et,en;q=0.8" } });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    return response;
  }
  return {
    delayMs,
    text: async (url) => (await request(url, "text/html")).text(),
    json: async (url) => (await request(url, "application/json")).json(),
  };
}

module.exports = { USER_AGENT, sleep, crawlDelayFor, agentsDisallowingAll, siteFetcher };
