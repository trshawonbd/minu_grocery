# CLAUDE.md — working instructions for this project

Minu is a grocery price-comparison tool: it scrapes the same real
products from three Estonian grocery stores (Barbora, Rimi, Selver),
matches equivalent listings across stores, and shows a side-by-side
price comparison. Zero npm dependencies, plain Node.js.

## Who the owner is

The owner is **non-technical, with no coding knowledge**. Every report
back to them must be in **simple Bengali** (technical names — file
names, category names, brand names — can stay in English). Keep
reports **short**: what was done, the numbers, anything wrong found,
and any decision the owner needs to make. No jargon, no code dumps, no
long prose.

## Project rules (always, every session)

- **A wrong match is worse than a missing one.** When unsure, don't
  match — leave it in `data/ambiguous.json` or `data/pending.json` for
  a person to decide. Never guess a tie.
- **Compare the price anyone actually pays.** A loyalty-card price
  (Barbora's Aitäh, Selver's Partner) is shown only as a small extra
  line — it never decides which store is "cheapest."
- **Only `scraper/fetch-price.js` and `scraper/daily-update.js` ever
  contact a store.** Always ask the owner before running any live
  scrape. Selver may only be fetched via its open, explicitly-allowed
  path (`/api/catalog/vue_storefront_catalog_et/...`), at 1
  request/second, strictly sequential.
- **Every test or by-hand check builds items via `buildItem()`** (in
  `scraper/categories.js`) with the real category settings
  (`strictPackaging`, `matchAcrossWeights`) — never hand-roll a test
  item and guess these flags. Getting this wrong has produced false
  "already matching" conclusions before.
- **Run the full test suite (`npm test`) before and after every
  change.** Commit after each finished step, not in one giant batch.
- **Other categories must stay unchanged** by any single category's
  work — confirm their `data/prices.json` product counts are
  byte-identical before/after (rebuild from `data/raw/` only, no
  scraping, to check).
- **One Claude Code session at a time** against this repo — don't run
  a second one concurrently.
- **Never use `sudo`.**

## Roadmap

Work through this in order, **one batch per round**. Check off/note
progress as each batch finishes.

1. **Dairy rest**: cheese, curd & cottage cheese, cream & sour cream,
   kefir & buttermilk — *done*
2. **Pantry 1**: coffee, tea, cereals & oats, canned food
3. **Pantry 2**: sauces & condiments, spices, jam & honey & spreads,
   baking supplies
4. **Sweets & snacks**: chocolate, candy, biscuits, chips, nuts
5. **Frozen**: vegetables & berries, ice cream, dumplings & pizza
6. **Meat products & fish**: sausages, ham & cold cuts, fish (fresh,
   smoked, canned)
7. **Baby food, household, personal care, pet food**

**Not allowed without the owner's explicit decision:** alcohol, adding
a new store (e.g. PROMO Cash&Carry), or anything that puts the app
online/publicly reachable.

## Fast-mode review (required for every batch)

For each new category added:

1. Investigate each store's real category tree by hand before writing
   any code (URLs/IDs, what's mixed in, what needs excluding).
2. One authorized live scrape per batch (after asking the owner).
3. **Read by hand every 3-store match**, plus **20 randomly sampled
   2-store matches per category** (or all of them if fewer than 20
   exist).
4. If any wrong match is found: read that whole category by hand, fix
   the underlying rule, add a regression test.
5. Confirm all other categories' counts are unchanged.
6. Full test suite green, `npm run review`, commit per category (code
   commit first, then one data commit per category — see recent git
   log for the established additive-diff pattern).
7. In the report to the owner, **list the category-specific traps
   watched for** (e.g. fat %, flavour vs plain, organic, lactose-free,
   pack form, own-brand isolation, whatever applies to that batch).

## When to stop and ask the owner

- Before every live scrape.
- Any scope question (include or exclude a product type/variant).
- Any ambiguous pair that needs a human decision — don't guess.
- Anything with a legal angle.
- Any failing test that can't be fixed without a judgment call.
- Anything that would need admin rights.

## Weekly maintenance

Review `data/pending.json` and `data/alerts.json` (written by the
daily automatic update) using the **same fast-mode review rules**
above — read matches by hand before applying anything, ask the owner
about anything ambiguous.

## Where things are

- `scraper/categories.js` — single source of truth for every
  category's store URLs/IDs and settings; both `fetch-price.js` and
  `daily-update.js` read from here.
- `scraper/stores/selver.js` — Selver's own category-ID map.
- `scraper/match-products.js` — the matching engine.
- `scraper/daily-update.js` — unattended scheduled updates (never
  creates/merges products, only updates prices/availability by URL;
  new candidates go to `data/pending.json`, never auto-applied).
- `data/prices.json` — the matched products the app displays.
- `data/review.md`, `data/ambiguous.json`, `data/unmatched.json`,
  `data/unclassified.json` — generated by `npm run review`.
- `README.md` — fuller technical detail on the architecture, kept in
  English for whoever reads the code next.
