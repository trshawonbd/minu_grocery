# Minu — grocery price comparison

Minu scrapes the same real products from three Estonian grocery
stores, figures out which listings are actually the same product, and
shows a side-by-side price comparison with the cheapest store
highlighted. No build step, no external dependencies — just Node.js
and a static HTML page.

## The four stores and the categories

| Store | How it's fetched |
|---|---|
| Barbora | category listing pages, server-rendered HTML |
| Rimi | category listing pages, server-rendered HTML |
| Selver | its open catalog search API — the site itself is a client-rendered app that returns no data to a plain fetch, but this specific API path is explicitly allowed by Selver's `robots.txt` |
| Coop (Haapsalu) | the public WooCommerce Store API of coophaapsalu.ee (`/wp-json/wc/store/v1/products`), one request per second; in-stock items only. Regional pricing — the Haapsalu e-shop's prices, labelled as such in the app. Its `sku` is a barcode on branded goods, so Coop–Selver pairs mostly match by EAN (see CLAUDE.md) |

Fifty-three categories are scraped today, with this many matched
products in each as of the last run (`data/prices.json`) — a product
is a group of 2, 3 or 4 store listings. The three
alcohol categories exist for private testing only and are hidden
entirely when `SHOW_ALCOHOL` (frontend/app-logic.js) is false — see
CLAUDE.md:

| Category | Matched products |
|---|---|
| Baby formula | 26 |
| Fruits & vegetables | 132 |
| Dairy | 91 |
| Bread | 115 |
| Drinks (non-alcoholic only) | 238 |
| Meat (fresh & frozen chicken, pork, beef, lamb, minced) | 32 |
| Pasta | 61 |
| Rice & grains | 34 |
| Flour & sugar | 49 |
| Cooking oil | 34 |
| Cheese | 146 |
| Curd & cottage cheese | 34 |
| Cream & sour cream | 19 |
| Kefir & buttermilk | 6 |
| Coffee | 99 |
| Tea & cocoa | 66 |
| Cereals & oats | 87 |
| Canned food | 73 |
| Sauces & condiments | 193 |
| Spices | 155 |
| Jam & honey & spreads | 66 |
| Baking supplies | 27 |
| Chocolate | 103 |
| Candy | 212 |
| Biscuits | 111 |
| Chips & snacks | 67 |
| Nuts, seeds & dried fruit | 82 |
| Frozen vegetables & berries | 34 |
| Ice cream | 55 |
| Dumplings, pizza & fries | 43 |
| Sausages | 134 |
| Ham & cold cuts | 117 |
| Fish & seafood | 109 |
| Baby food | 109 |
| Diapers & baby wipes | 56 |
| Personal care | 464 |
| Household | 249 |
| Pet food (incl. cat litter) | 105 |
| Cakes & pastries | 29 |
| Instant food | 61 |
| World cuisine | 29 |
| Alcohol-free beer, cider & wine | 33 |
| Beer & cider (private testing) | 209 |
| Wine (private testing) | 235 |
| Spirits (private testing) | 279 |
| Curd snacks & desserts | 56 |
| Milk drinks & drinking yoghurt | 28 |
| Crispbreads | 12 |
| Energy, sports & iced-tea drinks | 61 |
| Syrups & juice drinks | 63 |
| Frozen fish & seafood | 14 |
| Frozen dough & pastries | 23 |
| Broths & stock | 9 |
| **Total** | **4974** |

Each store's own category tree is mapped onto these by hand in
`scraper/categories.js` (URLs for Barbora/Rimi, and each category's
own settings — see below) and `scraper/stores/selver.js` (category
IDs, and a name filter wherever Selver's own category doesn't split
cleanly — e.g. no category dedicated to formula alone, or a "Water"
leaf mixing in vitamin water). The comments next to each category's
URLs/IDs spell out exactly what's included and excluded, and why.

Meat works differently from every other category, in two ways:
- **Cheapest is decided by per-kg price, not pack price**
  (`cheapestByUnitPrice` in `scraper/categories.js`) — a real weight is
  captured from each store's own per-kg field (Barbora's
  `comparative_unit_price`, Rimi's "Hind ühiku kohta" card text,
  Selver's `unit_price`), not parsed from the name, since a large
  share of meat is sold "per kg" with no weight in the name at all.
  The product screen shows €/kg as the headline number for Meat, pack
  price and weight as the small line underneath — the reverse of every
  other category.
- **A match can span different pack weights**, including "sold per
  kg" vs a fixed pack (`matchAcrossWeights` in `scraper/categories.js`
  and `sameBrandedProduct` in `scraper/match-products.js`) — since
  cheapest is per-kg anyway, the pack size itself isn't part of a meat
  product's identity, the one exception being a multipack ("2x500g"),
  which never matches a single pack. Fresh vs frozen, marinated vs
  plain (and different marinade flavours), bone, skin, cut, and mince
  type still always block, the same strict-packaging descriptor check
  every other category uses.

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

## Daily automatic updates

`scraper/daily-update.js` runs on its own, on a schedule, without
Claude Code (installed via `scripts/install-daily-update.sh` — a
launchd job on macOS; see that script for the exact time). It's
deliberately narrower than a by-hand `npm run fetch-prices` run:

- It only ever **updates the price of a product already confirmed in
  `data/prices.json`**, matching a store's item to that product's
  existing entry by URL — it never creates, merges, or reassigns a
  product on its own, no matter what the matcher thinks it's found.
- A store's listing that's gone (removed, out of stock) gets marked
  `unavailable: true` on that one entry — never deleted, so a later
  run can still find the same URL and reactivate it. The app hides
  that store's row for the product (see `frontend/pricing.js`'s
  `storeEntries`), but keeps its price on file.
- A product left with fewer than 2 available stores gets
  `hidden: true` and disappears from the app — again, never deleted.
- Any **new** match the matcher finds among items not already tied to
  an existing product goes to `data/pending.json` only — never
  auto-added to `data/prices.json`. Review it with Claude Code when
  you get to it.
- **Safety checks, per store, every run:** if a store's fetch fails,
  or it returns 20%+ fewer items than its own last run, or more than
  30% of the items it has in common with last time changed price by
  more than 50%, that store's update is skipped entirely (yesterday's
  data for it stays exactly as-is) and the problem is written to
  `data/alerts.json` — a bad scrape (an outage, a broken page, a
  price-feed bug) should never silently look like a real update.
- It refreshes every store entry a fresh item is found for — price,
  sale price, barcode, store name and the **store's photo URL** (a
  photo the entry already had is kept when a day's scrape carries
  none). `rebuild-prices.js` and `fetch-price.js` carry existing
  photo URLs over the same way (`carryOverImages`), and
  `rename-products.js` never touches anything but the name.
- Every category in `scraper/categories.js` (53 today), every store
  (Barbora, Rimi, Selver, Coop) — never a fixed list of its own.
- Writes a dated snapshot to `data/history/YYYY-MM-DD.json` every run
  and a summary to `data/logs/YYYY-MM-DD.txt` — **on every invocation**:
  a run that skips itself (repo not clean, see below) or fails writes
  its reason there too, and the repo-safety check ignores that one
  folder so a skip log can't cause the next morning to skip as well.
  Then it commits every changed file under `data/` with the message
  `Daily update YYYY-MM-DD` — the one script in this project that
  commits on its own, since the entire point is running with nobody
  watching.
- **Scheduling on a Mac:** the launchd job fires at 06:00; if the Mac
  is asleep then, launchd runs it as soon as the Mac wakes (missed
  calendar jobs are not dropped). Only a Mac that is shut down, or a
  user who is logged out, misses a day. launchd's own stdout/stderr
  land in `~/Library/Logs/minu/daily-update.{out,err}.log`.

Run it by hand with `node scraper/daily-update.js` (same politeness
rules as `npm run fetch-prices`: Selver capped at 1 request/second).
The pure rules behind all of the above (what counts as safe, how a
price/unavailable/hidden update is applied, which items are "new") are
in `scraper/daily-update-logic.js`, tested independently of any real
network call in `scraper/daily-update-logic.test.js`.

The product screen shows **"Updated: ⟨date, time⟩"** at the top,
read from `data/last-update.json` (written by every daily-update.js
run), and switches to a warning style if that's more than 2 days old
— the job runs once a day, so anything older means a run was missed
or every store alerted.

## npm commands

```
npm run fetch-prices   # scrapes all three stores, writes data/raw/, data/prices.json, and the leftover files
npm run daily-update    # the same scrape, but update-only — see "Daily automatic updates" above
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
| `data/prices.json` | Matched products the app actually displays — one entry per product, with a price per store it was found at (plus that store's own per-kg `storeUnitPrice` when known, and `cheapestByUnitPrice: true` on a Meat product — see "Meat works differently" above) |
| `data/unmatched.json` | Items with a recognizable type or brand that still didn't find a match anywhere — worth a person's look |
| `data/unclassified.json` | Items with no recognizable type or brand at all — never had a reliable comparison to begin with |
| `data/ambiguous.json` | Groups that don't agree with each other cleanly — needs a person to pick, see "How matching works" above |
| `data/review.md` | A human-readable summary, generated by `npm run review`: a per-category summary table, all matched products, ambiguous groups, unclassified items, and a "Possible matches to check by hand" section — same-brand, same-size, same-fat%/qualifiers unmatched pairs whose leftover descriptor words differ by exactly one, capped at 30 per category. That last section is a list for a person to look at, nothing in it is matched automatically. |
| `data/products.json` | Hand-added overrides: forces two specific listings to match, with the canonical name to use |
| `data/known-different.json` | Hand-added overrides: forces two specific listings to never match |
| `data/pending.json` | New candidate matches `scraper/daily-update.js` found among items not already tied to an existing product — for a person to review with Claude Code; never auto-applied, overwritten fresh every run |
| `data/alerts.json` | This run's safety-check failures from `scraper/daily-update.js` (a store that failed, or looked too different from last time) — empty when there were none, overwritten fresh every run |
| `data/history/YYYY-MM-DD.json` | A full snapshot of `data/prices.json` at the end of that day's update — one per day, kept forever |
| `data/logs/YYYY-MM-DD.txt` | A short plain-text summary of that day's update run |
| `data/last-update.json` | `{ updatedAt }` — when `scraper/daily-update.js` last ran, shown on the product screen |

## What's here

```
minu-project/
├── README.md
├── package.json                npm scripts: fetch-prices, review, test, start
├── data/                       see "Where each data file is" above
├── frontend/
│   ├── index.html               state, hash routes, loads data/prices.json; the UI language setting (localStorage "minu.lang", Estonian default)
│   ├── render.js                 every screen as DOM-building functions (+ render.test.js on a fake document)
│   ├── catalog.js                the DISPLAY taxonomy: Estonian category names in shopping order laid over the data categories, with splits (Fruits & vegetables -> Puuviljad/Köögiviljad, Dairy -> Piim ja jogurt/Või/Munad, Household -> four aisles) and merges (Coffee + Tea & cocoa -> Kohv ja tee); our own simple SVG line icons (+ catalog.test.js)
│   ├── i18n.js                   all UI strings in et (default), en and ru; t() fills placeholders, falls back ru -> en -> et
│   ├── app-logic.js              search index (Estonian letters folded), price gaps, "Cheaper than usual" (never card prices), basket storage and comparison (+ app-logic.test.js)
│   └── pricing.js                pure price logic (cheapest, tie-breaking, per-store rows, unit price) — kept separate from the DOM code so it's directly testable
├── scraper/
│   ├── fetch-price.js            the only file that contacts a store; writes data/raw/, data/prices.json, and the leftover files
│   ├── categories.js             every category's store URLs and settings (strictPackaging, Meat's cheapestByUnitPrice/matchAcrossWeights, Diapers & baby wipes' diaperMatching, Fish's fixedWeightMustMatch, the alcohol categories' alcoholMatching, ALCOHOL_CATEGORIES) — fetch-price.js's single source for all of it, and the one place a test/by-hand check should build an item from (buildItem)
│   ├── daily-update.js           unattended, scheduled price refresh — see "Daily automatic updates" below (+ daily-update-logic.js, its pure rules, and daily-update-logic.test.js)
│   ├── scrape-output.js          shared by fetch-price.js and daily-update.js: pagination, and the item -> data/prices.json entry shape
│   ├── build-review.js           regenerates data/review.md from already-scraped data; never scrapes
│   ├── build-singles.js          writes data/singles.json — every scraped listing no comparison holds, for the app's search-only "Ainult ühes poes" section; never scrapes
│   ├── rebuild-prices.js         re-runs matching over data/raw/ for named categories, no network (never for the daily-updated ones)
│   ├── rename-products.js        recomputes ONLY display names in data/prices.json from data/raw/ — no re-matching, no price change, no network
│   ├── match-products.js         the matching rules (sameProduct, matchPool)
│   ├── raw.js                    reads/writes data/raw/ (+ raw.test.js, that a category's settings round-trip through meta.json)
│   ├── no-scrape.test.js         enforces that only fetch-price.js/daily-update.js contact a store
│   └── stores/
│       ├── barbora.js            fetches + parses Barbora category pages
│       ├── rimi.js               fetches + parses Rimi category pages (+ rimi.test.js, its brand-facet matching)
│       ├── selver.js             fetches Selver's catalog search API
│       └── coop.js               fetches Coop Haapsalu's WooCommerce Store API (+ coop.test.js: item shape, the category map, the dairy-family split)
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
