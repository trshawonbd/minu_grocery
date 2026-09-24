# Minu — grocery price comparison

Minu scrapes the same real products from three Estonian grocery
stores, figures out which listings are actually the same product, and
shows a side-by-side price comparison with the cheapest store
highlighted. No build step, no external dependencies — just Node.js
and a static HTML page.

## The three stores and five categories

| Store | How it's fetched |
|---|---|
| Barbora | category listing pages, server-rendered HTML |
| Rimi | category listing pages, server-rendered HTML |
| Selver | its open catalog search API — the site itself is a client-rendered app that returns no data to a plain fetch, but this specific API path is explicitly allowed by Selver's `robots.txt` |

Five categories are scraped today, with this many matched products in
each as of the last run (`data/prices.json`):

| Category | Matched products |
|---|---|
| Baby formula | 12 |
| Fruits & vegetables | 67 |
| Dairy | 41 |
| Bread | 83 |
| Drinks (non-alcoholic only) | 94 |
| **Total** | **297** |

Each store's own category tree is mapped onto these by hand in
`scraper/fetch-price.js` (URLs for Barbora/Rimi) and
`scraper/stores/selver.js` (category IDs, and a name filter wherever
Selver's own category doesn't split cleanly — e.g. no category
dedicated to formula alone, or a "Water" leaf mixing in vitamin
water). The comments next to each category's URLs/IDs spell out
exactly what's included and excluded, and why.

## How matching works, in plain words

A store only tells you its own product name, price, and (sometimes) a
few other fields — never "this is the same product as that other
store's listing." Minu has to figure that out itself, in
`scraper/match-products.js`:

- If two items share a real barcode (EAN), that settles it. In
  practice this rarely fires — Selver states an EAN on every product,
  but Barbora and Rimi don't expose one anywhere we've found.
- Otherwise, a brand, size, and a few other identifying details
  (fat %, flavour, produce variety, formula stage) are pulled out of
  each raw product name with pattern matching, and two items are only
  called the same product if all of those agree.
- Size is normalized before comparing: comma vs period ("1,5l" vs
  "1.5L") and the unit itself (500ml vs 0,5l vs 0.5L) are all
  collapsed to one base unit (grams or millilitres) first, so the same
  real bottle or pack extracts identically regardless of which
  convention a store's own text happens to use. A multipack keeps its
  own count as part of the size ("6x330ml") — it can never equal a
  single item of the same per-unit size, even after normalizing.
- Every store's items for a category go into one shared pool
  (`matchPool`), not compared store-by-store. A group of matching
  items becomes one product only if **every pair** in the group
  agrees with each other, and the group holds **at most one item per
  store**. A group that fails either check — two listings from the
  same store both plausibly matching one listing elsewhere, or a
  three-way chain that doesn't fully agree — is written to
  `data/ambiguous.json` for a person to resolve, instead of guessed.
- Two more files exist for the cases the automatic rules get wrong:
  `data/products.json` forces a match (with the canonical name to
  use), and `data/known-different.json` forces two specific listings
  to never match, no matter what the rules say.

## Key rules this project holds to

- **A wrong match is worse than a missing one.** When it's not clear
  two listings are the same product, the answer is "don't match them"
  — never a best guess. This is why the ambiguous/unmatched/
  unclassified files exist instead of the matcher always picking
  something.
- **The price shown is the price anyone can pay today**, not a
  members-only or loyalty-card price. Barbora's Aitäh price and
  Selver's Partner price are shown only as a small secondary line on
  the product screen — they're informational, and never used to
  decide which store is cheapest. The per-kg/per-litre unit price
  shown under each store's price is the same kind of secondary line —
  computed for display only (`frontend/pricing.js`'s `unitPrice`) from
  the normalized size, a multipack's *total* contents, never a store's
  own per-unit label — and never affects which store is marked
  cheapest either. It's simply left off when the size isn't known.
- **One change at a time.** Matching rules, scrapers, and the data
  pipeline get changed and tested individually — never several
  unrelated changes bundled into one pass, so a regression is easy to
  trace back to its cause.
- **Selver is only ever contacted through its open catalog search API**
  under `/api/catalog/vue_storefront_catalog_et/` — the one path its
  `robots.txt` explicitly allows — at a strict maximum of one request
  per second, never in parallel. `scraper/no-scrape.test.js` enforces
  that only `scraper/fetch-price.js` contacts any store at all;
  everything else (the review generator, matching experiments) reads
  already-scraped data from `data/raw/` instead.

## npm commands

```
npm run fetch-prices   # scrapes all three stores, writes data/raw/, data/prices.json, and the leftover files
npm run review          # regenerates data/review.md from already-scraped data — never scrapes
npm test                 # runs every test file (matching rules, price-fairness, no-scrape enforcement, frontend logic)
npm start                # serves the project at http://localhost:8000
```

Then open **http://localhost:8000/frontend/index.html**.

> **Only run one Claude Code (or any automated) session against this
> project at a time.** A background/second session running
> `npm run fetch-prices` while another session is mid-task has already
> caused an unattended live scrape that silently overwrote `data/raw/`
> and `data/prices.json` underneath work in progress — the scraped
> data itself was fine, but it broke the "before vs after" comparison
> the working session was relying on. Close other sessions before
> starting real work here, and don't pre-approve
> `Bash(node scraper/fetch-price.js)` (or any command that scrapes) to
> run without asking — a live scrape should always need a person's
> go-ahead in the moment.

### Why `npm start` instead of double-clicking index.html

Double-clicking `frontend/index.html` opens it as a `file://` page.
Most browsers block a `file://` page from fetching another local file,
so `data/prices.json` won't load and the page will show "No price
data yet". Serving the folder over `http://localhost` (via
`npm start`) avoids that.

## Where each data file is

All of these live in `data/` and are regenerated by `npm run
fetch-prices` (except `products.json` and `known-different.json`,
which are edited by hand):

| File | What it holds |
|---|---|
| `data/raw/<category>/<store>.json` + `meta.json` | Every item exactly as that store returned it, for that category — the only file anything other than `fetch-price.js` should ever read scraped data from |
| `data/prices.json` | Matched products the app actually displays — one entry per product, with a price per store it was found at |
| `data/unmatched.json` | Items with a recognizable type or brand that still didn't find a match anywhere — worth a person's look |
| `data/unclassified.json` | Items with no recognizable type or brand at all — never had a reliable comparison to begin with |
| `data/ambiguous.json` | Groups that don't agree with each other cleanly — needs a person to pick, see "How matching works" above |
| `data/review.md` | A human-readable summary, generated by `npm run review`: a per-category summary table, all matched products, ambiguous groups, unclassified items, and a "Possible matches to check by hand" section — same-brand, same-size, same-fat%/qualifiers unmatched pairs whose leftover descriptor words differ by exactly one, capped at 30 per category. That last section is a list for a person to look at, nothing in it is matched automatically. |
| `data/products.json` | Hand-added overrides: forces two specific listings to match, with the canonical name to use |
| `data/known-different.json` | Hand-added overrides: forces two specific listings to never match |

## What's here

```
minu-project/
├── README.md
├── package.json                npm scripts: fetch-prices, review, test, start
├── data/                       see "Where each data file is" above
├── frontend/
│   ├── index.html               renders the comparison from data/prices.json
│   └── pricing.js                pure price logic (cheapest, tie-breaking, per-store rows, unit price) — kept separate from the DOM code so it's directly testable
├── scraper/
│   ├── fetch-price.js            the only file that contacts a store; writes data/raw/, data/prices.json, and the leftover files
│   ├── categories.js             the five categories' store URLs and strictPackaging settings — fetch-price.js's single source for both, and the one place a test/by-hand check should build an item from (buildItem)
│   ├── build-review.js           regenerates data/review.md from already-scraped data; never scrapes
│   ├── match-products.js         the matching rules (sameProduct, matchPool)
│   ├── raw.js                    reads/writes data/raw/
│   ├── no-scrape.test.js         enforces that only fetch-price.js contacts a store
│   └── stores/
│       ├── barbora.js            fetches + parses Barbora category pages
│       ├── rimi.js               fetches + parses Rimi category pages (+ rimi.test.js, its brand-facet matching)
│       └── selver.js             fetches Selver's catalog search API
└── scripts/
    └── serve.js                  tiny local static server, no dependencies
```

## Backups

This project is a local git repository (no remote/GitHub) used
specifically as a backup mechanism — a commit after each meaningful
change means any regression can be traced and reverted. There's
nothing else backing this project up, so don't skip committing.

## One honest note

This is fine for testing on your own computer. Before anyone else
uses it, each store's terms of use still need a lawyer's check —
scraping product pages (and Selver's catalog API) may not be
permitted under their terms beyond what `robots.txt` signals.
