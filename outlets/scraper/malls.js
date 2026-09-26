// Mall directory — roadmap step 2 (see CLAUDE.md's "Outlets" section
// for the rules and the 5 malls' correct URLs). Each mall's own
// website has a completely different structure (a WordPress shop
// directory, a Svelte-rendered store finder, an embedded JSON blob,
// a headless Astri-Grupp storefront) — this file holds one PURE
// parser per mall (HTML/JSON text in, a plain shop array out, no
// network) plus the fetch orchestrator that throttles requests to
// 1/second per site and paginates where a mall needs it. The parsers
// are what scraper/*.test.js-style tests exercise; the network layer
// is untested the same way scraper/fetch-price.js's own network calls
// are (see outlets/scraper/malls.test.js).
//
// A shop entry is { name, category, floor, url } — `category` and
// `floor` are null when that mall's own page doesn't show one for a
// given shop (Viru Keskus has no floor field at all in its data;
// Lõunakeskus's category is only available through a client-side
// filter this file doesn't reverse-engineer — both documented below,
// not a bug).
//
// Only real shops are kept — every mall labels some of its own
// listings as services, food-service, or entertainment in its OWN
// category system, and this respects that labelling rather than
// guessing per shop (see SKIP_CATEGORIES below). A few genuine gyms
// hide inside an otherwise shop-shaped category at more than one mall
// (e.g. Kristiine's "Vaba aeg" mixes a gym in with a bookshop and a
// hobby shop) — GYM_NAME_PATTERN catches those by name as a second,
// narrow pass after the category filter.

const GYM_NAME_PATTERN = /\b(myfitness|fitness\d*|gym!?|kalev spa|trenazoo?r)\b/i;

// Category labels each mall itself uses for something that isn't a
// shop — cafés/restaurants, entertainment, services. Kept per-mall
// because the wording (and what's bundled together) differs; see the
// investigation notes above each mall's fetch function for what was
// actually found in its own category list.
const SKIP_CATEGORIES = {
  ulemiste: new Set(["teenused", "meelelahutus", "bowling-meelelahutus", "kingituste-pakkimine", "pakiautomaadid"]),
  kristiine: new Set(["teenused", "kohvikud ja restoranid"]),
  viru: new Set(["teenus", "hooldusteenus", "kiire-eine"]),
  // Rocca al Mare uses its own `data-website-cat` attribute directly
  // instead of a category-name list — see parseRoccaAlMare below.
  roccaalmare: null,
  // Lõunakeskus's per-shop category isn't available from the plain
  // shop-list page at all (see parseLounakeskus's own comment) — no
  // category to skip by, so nothing is filtered out on that basis for
  // this mall; the gym-by-name pass still applies.
  lounakeskus: null,
};

function isGymByName(name) {
  return GYM_NAME_PATTERN.test(name);
}

// Services and other non-shops caught by NAME (the owner's rule,
// 2026-09-26), for the one mall whose site gives no per-shop category
// at all (Lõunakeskus) — a bank, a car wash, a clinic, a laundry, a
// hairdresser, a locksmith, a fuel station, an EV charger, a parcel
// locker, a telecom desk, a phone-repair counter, a casino, a hotel,
// an adventure park. Applied at every mall (harmless where the mall's
// own category already dropped the listing). Whole-word matches with
// Estonian letters honoured (\b alone treats õäöü as non-letters).
// A pharmacy (Apotheka) is a shop and stays; "apteek" alone is never
// matched, only a pharmacy-service wording would be.
const SERVICE_NAME_WORDS = [
  "pank", "tankla", "automaattankla", "pesula", "pesusalong", "pesumaja", "autopesula",
  "kino", "kinokapsel", "laadimisjaam", "laadimispunkt", "pakiautomaat", "postkontor",
  "massaažisalong", "kliinik", "kliinikum", "loomakliinik", "nõuandla", "hambaravi",
  "juuksur", "juuksurisalong", "ilusalong", "kosmeetik", "küünesalong", "solaarium",
  "kingsepp", "fotostuudio", "õmblustöökoda", "remont", "kiirlaen", "laen", "notar",
  "võtmed", "võtmeabi", "lukud", "apteek-teenus", "apteegiteenus", "valuuta", "reisibüroo",
  "kindlustus", "advokaat", "seikluspark", "paintballiklubi", "casino", "kasiino", "hotell",
  "arena", "mängudžungel", "uisumaailm", "golfx", "kiddy rides",
];
const SERVICE_BRANDS = ["ChargeNet", "Eleport", "Enefit Volt", "Circle K", "Telia", "Elisa", "Tele2", "Nutipesu", "Telo24", "Elektrum Drive"];
const SERVICE_NAME_PATTERN = new RegExp(
  `(^|[^\\p{L}])(${[...SERVICE_NAME_WORDS, ...SERVICE_BRANDS].map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})($|[^\\p{L}])`,
  "iu"
);

function isServiceByName(name) {
  return SERVICE_NAME_PATTERN.test(name);
}

function isNonShopByName(name) {
  return isGymByName(name) || isServiceByName(name);
}

// "1. korrus" -> "1"; "1 korrus ja 2 korrus" (a store spanning two
// floors, e.g. Kristiine's Reserved/H&M) -> "1 ja 2" — the "korrus"
// word itself carries no information once every mall's floor field
// is next to a mall name anyway, so it's dropped; the digit(s) and
// any "ja" (and) between them are kept exactly as stated.
function cleanFloorText(raw) {
  return raw
    .replace(/\bkorrus\b/gi, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ---- Ülemiste — WordPress shop directory, paginated (~21 pages
// today; fetchUlemisteShops stops at the first empty/missing page
// rather than assuming a fixed count). Each shop card: a category
// link+label (<h6>, also encodes the category slug in its href),
// a floor ("N. korrus"), the shop name (<h3>) and its own page link.
const ULEMISTE_CARD_PATTERN =
  /href="https:\/\/www\.ulemiste\.ee\/kauplused\/([a-z-]+)\/"[^>]*>\s*<h6[^>]*>\s*([^<]+?)\s*<\/h6>[\s\S]{0,400}?<div class="mr-6">\s*([^<]+?)\s*<\/div>[\s\S]{0,600}?href="(https:\/\/www\.ulemiste\.ee\/kauplus\/[^"]+)"[^>]*>\s*<h3[^>]*>\s*([^<]+?)\s*<\/h3>/g;

function parseUlemiste(html) {
  const shops = [];
  for (const m of html.matchAll(ULEMISTE_CARD_PATTERN)) {
    const [, categorySlug, categoryName, floor, url, name] = m;
    if (SKIP_CATEGORIES.ulemiste.has(categorySlug)) continue;
    const cleanName = decodeEntities(name.trim());
    if (isNonShopByName(cleanName)) continue;
    // Every floor seen is "N. korrus", but captured as raw text (not
    // forced into a bare digit) in case a future/other page shows a
    // multi-floor store the way Kristiine's does — see Kristiine's
    // own comment for the real bug this avoided there.
    shops.push({ name: cleanName, category: decodeEntities(categoryName.trim()), floor: cleanFloorText(floor), url });
  }
  return shops;
}

// ---- Rocca al Mare — single page, every card carries its own
// `data-website-cat` ("shops" is the one that means an actual shop —
// "restaurants"/"office"/"other"/"" cover food, services and misc,
// checked by hand against every one of Rocca al Mare's own listings,
// 2026-09-26), a `data-sales-group` (its category, space-separated
// et/fi/no/... slugs — the Estonian one is last), a shop name (<h4>)
// and its own page link.
const ROCCA_CARD_PATTERN =
  /data-website-cat="([^"]*)"\s*\n\s*data-sales-group="([^"]*)"[\s\S]{0,60}?data-title="[^"]*"[\s\S]{0,20}?<a href="(https:\/\/www\.roccaalmare\.ee\/store\/[^"]+)"[\s\S]{0,700}?<h4[^>]*>\s*([^<]+?)\s*<\/h4>/g;

function parseRoccaAlMare(html) {
  const shops = [];
  for (const m of html.matchAll(ROCCA_CARD_PATTERN)) {
    const [, websiteCat, salesGroup, url, name] = m;
    if (websiteCat !== "shops") continue;
    const cleanName = decodeEntities(name.trim());
    if (isNonShopByName(cleanName)) continue;
    // Each data-sales-group is 4 space-separated slugs, one per site
    // language, always in the SAME order — en, no, et, fi (checked
    // against every category on the page, 2026-09-26) — so the
    // Estonian one is always the 3rd, never the last.
    const slugs = salesGroup.trim().split(/\s+/);
    const category = slugs.length >= 3 ? slugs[2] : slugs[0] || null;
    shops.push({ name: cleanName, category, floor: null, url });
  }
  return shops;
}

// ---- Kristiine keskus — single page, Svelte-rendered but present in
// the plain HTML response (no JS execution needed). Each card: a shop
// name (<h4 class="store-name">), then a category label
// (<span class="floor">, despite the class name — confirmed against
// every category on the page, 2026-09-26) and a floor
// (<span class="mb-2">N korrus</span>), and the enclosing <a href>.
// The final span's text is USUALLY a bare "N korrus", but a store
// spanning two floors reads "1 korrus ja 2 korrus" (real example:
// Reserved, H&M) — captured as whatever raw text is there rather
// than forced into one digit, so a multi-floor store is kept (with
// its real floor text) instead of silently dropped. Found by hand,
// 2026-09-26: an earlier, digit-only pattern lost every such store
// entirely, not just its floor.
const KRISTIINE_CARD_PATTERN =
  /<a class="store-card[^"]*" href="(\/kauplused\/[^"]+)"><h4 class="store-name[^"]*">([^<]+)<\/h4>[\s\S]{0,120}?<span class="floor[^"]*">([^<]+)<\/span>[\s\S]{0,150}?<span class="mb-2">([^<]+)<\/span>/g;

function parseKristiine(html) {
  const shops = [];
  for (const m of html.matchAll(KRISTIINE_CARD_PATTERN)) {
    const [, path, name, category, floor] = m;
    const cleanCategory = decodeEntities(category.trim()).toLowerCase();
    if (SKIP_CATEGORIES.kristiine.has(cleanCategory)) continue;
    const cleanName = decodeEntities(name.trim());
    if (isNonShopByName(cleanName)) continue;
    shops.push({ name: cleanName, category: decodeEntities(category.trim()), floor: cleanFloorText(floor), url: `https://www.kristiinekeskus.ee${path}` });
  }
  return shops;
}

// ---- Viru Keskus — a single embedded JSON blob
// (`window.__shopsInitialData`), grouped by first letter; each entry
// has its own category slug(s) (`cats`) but NO floor field at all —
// confirmed by hand, 2026-09-26, not a parsing gap.
function parseViru(html) {
  const marker = "window.__shopsInitialData";
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) return [];
  const start = html.indexOf("{", markerIndex);
  let depth = 0;
  let end = start;
  for (let i = start; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const data = JSON.parse(html.slice(start, end));
  const shops = [];
  for (const group of data.posts || []) {
    for (const post of group.posts || []) {
      const cats = post.cats || [];
      if (cats.some((c) => SKIP_CATEGORIES.viru.has(c))) continue;
      const name = decodeEntities(post.title.trim());
      if (isNonShopByName(name)) continue;
      shops.push({ name, category: cats[0] || null, floor: null, url: post.url });
    }
  }
  return shops;
}

// ---- Lõunakeskus (Astri Grupp) — single page, every shop's category
// is applied client-side (an AJAX filter, not present per-shop in the
// plain HTML — checked by hand, 2026-09-26: a `?category=` query
// param on this same URL returns the identical, unfiltered list, so
// there's no static per-shop category to read without reverse-
// engineering that client-side call). Only name, floor and link are
// captured; category is null for every Lõunakeskus shop until that
// gap is closed. The gym-by-name pass is the only "not a shop" filter
// that applies here.
const LOUNAKESKUS_CARD_START = /href="(https:\/\/www\.astri\.ee\/lounakeskus\/poed\/pood\/[^"]+)" title="([^"]+)" class="absolute inset-0 z-1">/g;
const LOUNAKESKUS_FLOOR = /badge-primary">\s*([^<]+?)\s*<\/div>/;

function parseLounakeskus(html) {
  const starts = [...html.matchAll(LOUNAKESKUS_CARD_START)];
  const shops = [];
  for (let i = 0; i < starts.length; i++) {
    const [, url, title] = starts[i];
    const name = decodeEntities(title.trim());
    if (isNonShopByName(name)) continue;
    // A floor badge sits somewhere after this shop's own link and
    // before the NEXT shop's — not every shop has one (~30 of ~187
    // don't, checked by hand 2026-09-26), so this only looks within
    // that one shop's own slice of the page, never borrowing a
    // neighbour's floor when one is missing.
    const sliceEnd = i + 1 < starts.length ? starts[i + 1].index : html.length;
    const floorMatch = html.slice(starts[i].index, sliceEnd).match(LOUNAKESKUS_FLOOR);
    shops.push({ name, category: null, floor: floorMatch ? cleanFloorText(floorMatch[1]) : null, url });
  }
  return shops;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .trim();
}

// A brand's name should read the same at every mall it's in — most
// malls already write it in normal case ("Denim Dream"), a few in
// caps ("DENIM DREAM"). Rather than guess a casing rule, this prefers
// whatever NON-all-caps spelling any mall already used for that exact
// name (case-insensitive match) — real data deciding, not a heuristic
// — and only falls back to Title Case for a name that was never seen
// any other way. Pure; takes every mall's shops together so a brand
// present at 3 malls can be corrected by the 1 mall that wrote it
// properly.
function buildCanonicalNames(allShops) {
  const byKey = new Map();
  for (const shop of allShops) {
    const key = shop.name.toLowerCase();
    const isAllCaps = shop.name === shop.name.toUpperCase() && shop.name !== shop.name.toLowerCase();
    const existing = byKey.get(key);
    if (!existing || (existing.isAllCaps && !isAllCaps)) {
      byKey.set(key, { name: shop.name, isAllCaps });
    }
  }
  return byKey;
}

// A short (<=4 letter) all-caps word ("CCC", "IKEA", "ECCO") is left
// alone rather than Title-Cased — real brand acronyms/stylizations
// are usually this short, and Title-Casing one (e.g. "CCC" -> "Ccc")
// is worse than leaving it as the store wrote it. Splitting on "."
// too so a periods-between-letters acronym ("I.L.U.") keeps each
// single letter capitalized instead of becoming "I.l.u.".
function titleCase(name) {
  return name
    .split(/(\s+|&|-|\.)/)
    .map((part) => {
      if (!/^[a-zõäöüšž]/i.test(part)) return part;
      if (part.length <= 4) return part;
      const lower = part.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

function applyCanonicalNames(shops, canonicalMap) {
  return shops.map((shop) => {
    const entry = canonicalMap.get(shop.name.toLowerCase());
    const isAllCaps = shop.name === shop.name.toUpperCase() && shop.name !== shop.name.toLowerCase();
    const name = entry && !entry.isAllCaps ? entry.name : isAllCaps ? titleCase(shop.name) : shop.name;
    return { ...shop, name };
  });
}

const MALLS = [
  { id: "ulemiste", name: "Ülemiste", address: "Suur-Sõjamäe tn 4, 11415 Tallinn", lat: 59.421955, lon: 24.794377, url: "https://www.ulemiste.ee/", listUrl: "https://www.ulemiste.ee/kauplused/" },
  { id: "roccaalmare", name: "Rocca al Mare", address: "Paldiski mnt 102, 13522 Tallinn", lat: 59.426768, lon: 24.651907, url: "https://www.roccaalmare.ee/", listUrl: "https://www.roccaalmare.ee/kauplused/" },
  { id: "kristiine", name: "Kristiine keskus", address: "Endla tn 45, 10615 Tallinn", lat: 59.42675, lon: 24.724157, url: "https://www.kristiinekeskus.ee/", listUrl: "https://www.kristiinekeskus.ee/kauplused" },
  { id: "viru", name: "Viru Keskus", address: "Viru väljak 4/6, 10111 Tallinn", lat: 59.436198, lon: 24.75525, url: "https://virukeskus.com/", listUrl: "https://virukeskus.com/kauplused" },
  { id: "lounakeskus", name: "Lõunakeskus", address: "Lääneringtee 39, Tartu", lat: 58.357883, lon: 26.677576, url: "https://www.astri.ee/lounakeskus/", listUrl: "https://www.astri.ee/lounakeskus/poed/" },
];

const PARSERS = {
  ulemiste: parseUlemiste,
  roccaalmare: parseRoccaAlMare,
  kristiine: parseKristiine,
  viru: parseViru,
  lounakeskus: parseLounakeskus,
};

module.exports = {
  MALLS,
  PARSERS,
  parseUlemiste,
  parseRoccaAlMare,
  parseKristiine,
  parseViru,
  parseLounakeskus,
  isGymByName,
  isServiceByName,
  isNonShopByName,
  buildCanonicalNames,
  applyCanonicalNames,
  titleCase,
  SKIP_CATEGORIES,
};
