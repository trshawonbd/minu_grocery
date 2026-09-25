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

## Git workflow (always)

- The repo lives on GitHub (`origin`, private:
  `trshawonbd/minu_grocery`). **Always `git pull` before starting
  work**, and **`git push` after each commit** — the daily update also
  commits and pushes on its own every morning, so an unpulled local
  clone drifts fast.
- **A developer may also work on this repository.** Their changes come
  in through **branches and pull requests, never directly on `main`.**
  Claude Code sessions (the owner's own work) commit to `main` as
  before, after pulling.
- **Never force-push.** If a push is rejected, pull (rebase or merge),
  resolve, and push again — and ask the owner about any conflict in
  `data/prices.json` rather than guessing which side is right.
- No secrets, tokens, or per-machine files in the repo. GitHub login
  is via `gh auth login` (browser), which keeps the token outside the
  project; `.claude/settings.local.json` is gitignored on purpose.

## Project rules (always, every session)

- **A wrong match is worse than a missing one.** When unsure, don't
  match — leave it in `data/ambiguous.json` or `data/pending.json` for
  a person to decide. Never guess a tie.
- **Unbranded packaged items only match with proof of the same
  manufacturer.** The matcher falls back to the name's first word as
  a pseudo-brand when a packaged item has no brand (so two "Magus
  kõrsik 250g" listings auto-match on "magus"). Such a pair is never
  kept on that basis alone: check both product pages and data —
  manufacturer/"Tootja", supplier line, description and ingredients,
  Selver's EAN (and what that EAN is registered as elsewhere). Same
  manufacturer proven → keep it, and record it in `data/products.json`
  with a `note` giving the evidence. Not proven → remove it and add
  the pair to `data/known-different.json`.
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
- **The daily automatic update skips itself if the repo isn't clean**
  — uncommitted changes anywhere, or a `data/.work-in-progress` file,
  and it does nothing (no scrape, no commit). To keep it from running
  overnight while something is deliberately left uncommitted, create
  an empty `data/.work-in-progress` and delete it when done. See
  `checkRepoSafety()` in `scraper/daily-update-logic.js`.
- **Never use `sudo`.**

## Roadmap

Work through this in order, **one batch per round**. Check off/note
progress as each batch finishes.

1. **Dairy rest**: cheese, curd & cottage cheese, cream & sour cream,
   kefir & buttermilk — *done*
2. **Pantry 1**: coffee, tea & cocoa, cereals & oats, canned food —
   *done*
3. **Pantry 2**: sauces & condiments, spices, jam & honey & spreads,
   baking supplies — *done*
4. **Sweets & snacks**: chocolate, candy, biscuits, chips & snacks,
   nuts, seeds & dried fruit — *done*
5. **Frozen**: vegetables & berries, ice cream, dumplings & pizza
   (& fries) — *done*
6. **Meat products & fish**: sausages, ham & cold cuts, fish & seafood
   (fresh, smoked, canned) — *done*
7. **Baby food, household, personal care, pet food** — *done* (plus a
   fifth category the owner asked for mid-batch, **Diapers & baby
   wipes**, with its own size+piece-count matching rule)
8. **Abbreviation-matching round** (after batch 7): one pass over the
   low-match categories — Chips & snacks, Tea & cocoa, Pasta, and any
   other with few matches — using `data/review.md`'s "possible matches
   to check by hand" list to find stores' differing abbreviations of
   the same product ("hapuk.-sibul." vs "hapukoore-sibula",
   "kartulilaastud" vs "kart.krõp") and add tested normalizations,
   the same way earlier abbreviation rules were added. Every new rule
   needs a regression test, and every other category's counts must
   stay unchanged.

**Not allowed without the owner's explicit decision:** alcohol, adding
a new store (e.g. PROMO Cash&Carry), or anything that puts the app
online/publicly reachable.

**Store images are hotlinked, for private testing only.** Each store
entry in `data/prices.json` may carry the store's own product-photo
URL (`image`, captured by the store modules from the store's own
data); the app shows it straight from that URL (`frontend/index.html`,
`productImage` in `frontend/pricing.js`), with "Image: <store>" under
it, and never downloads, saves, resizes or edits an image. The single
setting `SHOW_STORE_IMAGES` in `frontend/pricing.js` is `true` for
now; when `false`, no image URL is ever requested and only the
neutral icon shows. **Before the app is ever made public,
`SHOW_STORE_IMAGES` must be reviewed with a lawyer and set to
`false`** — hotlinking another company's photos is a legal question,
not a technical one. Never change the setting or the caption without
the owner.

## Scope decisions to remember (owner's calls, apply every time)

- Frozen fries, potato wedges and hash browns belong in **Dumplings &
  pizza** (frozen convenience food), never in Frozen vegetables —
  stores disagree (Barbora shelves them with vegetables, Rimi with
  pizza/ready meals), the owner decided.
- Cocoa/drinking chocolate goes with Tea; canned fruit and fruit
  purée with Jam & honey & spreads; dried fruit and seeds with Nuts;
  chewing gum and pastilles with Candy.
- Excluded everywhere unless the owner says otherwise: ready meals,
  soups (canned, packet, or frozen), dip mixes/sauce packets sold
  next to another category, plant-based imitations of a dairy
  product, and anything already owned by an existing category (sugar
  in any form, starch, flour, quinoa/millet → Flour & sugar / Rice &
  grains).
- **Baby food excludes formula** — Baby formula is its own category,
  and no product goes in two categories. Follow-on/growing-up formula
  (stage 2, 3, 4 and similar) is scraped as part of **Baby formula**
  (the owner's decision), matched the same way stage 1 always has
  been — stage numbers must agree.
- **Personal care is a grocery category, the three grocery stores
  only** — kept separate from the planned Beauty deals feature (beauty
  stores). Hygiene only: deodorant, shampoo/conditioner/styling,
  shower gel/soap, hand/body lotion, shaving, oral care, feminine
  hygiene. Excluded: face care, decorative cosmetics/makeup, Korean
  skincare, hair dye, tanning products (all the Beauty feature's own
  territory), home pharmacy (OTC medicine, wound care, vitamins/
  supplements, pregnancy tests — a legal/regulatory angle), perfume/
  eau de toilette, and every reusable tool (hairbrushes/combs,
  manicure/pedicure implements, bath sponges).
- **Diapers & baby wipes** is its own category (the owner's call, not
  folded into Personal care) — every-day absorbent diapers and wet
  wipes only, not swim/bedwetting-pants diapers (a different product,
  not sized the same way). Its matching rule is different from every
  other category: size number and piece count must both agree, not
  brand+weight — the weight range on the pack is redundant advice, not
  the purchasing unit (see `diaperMatching` in `scraper/categories.js`,
  `sameDiaperProduct` in `scraper/match-products.js`).
- **Household is consumables only** — cleaning supplies and paper
  products (the things people repurchase regularly), never kitchen
  tools, small appliances, textiles/bedding, home décor, garden goods,
  reusable cleaning tools (cloths, sponges, gloves), shoe/clothing
  care, or pest control (kept out the same conservative way home
  pharmacy is, for the same reason).
- **Pet food is food only** — never litter, toys, or other pet
  supplies/accessories.
- **Fish & seafood pack sizes** (owner, 2026-09-25): a fixed-weight
  pack or tin matches only an equal weight (a 190g tin of sprats is
  not a 240g tin); only a per-kg listing (no size in the name) may
  match across weights. Meat keeps its own earlier rule (400g, 500g
  and per-kg of the same cut are one product). `fixedWeightMustMatch`
  in `scraper/categories.js`.
- **Abbreviation round — DECIDED by the owner (2026-09-26): these
  all stay NOT matched. Never add a rule for any of them, and don't
  ask again:** "purutee" vs "tee" (crushed-leaf vs unspecified tea)
  are different products; ridged/textured variants ("sakilised"
  chips, "rigate" conchiglie vs plain) are different products;
  Panzani "Premium" is a different product; Panzani "3-minuti"
  quick-cook is a different product; a pasta number ("nr.5") is part
  of the product — a listing with it and one without don't match;
  the "Fitlap" co-branding label makes a different product; a pet
  life-stage label ("Adult") and "kastmes" (in gravy) vs unstated
  are different products; Dilmah's "Tseil."/"karp" stay unmatched.
- **Organic wording (owner, 2026-09-26): Öko / Ökoloogiline / BIO
  count as organic, the same rule as "mahe"** — organic and
  non-organic are different products, and one side stating it and
  the other not blocks the match (see IDENTITY_QUALIFIER_PATTERNS in
  `scraper/match-products.js`). The four spellings are one qualifier,
  so "Öko" on one side and "BIO" on the other still match each other.
- **Per-category implied words**: a word true of every item in a
  category (`impliedDescriptors` in `scraper/categories.js` —
  "külmutatud" in the frozen categories, Pasta's generic
  makaronid/pasta/durum, "jäätis" in Ice cream, Selver's feed-law
  labels in Pet food) is dropped from descriptors for that category
  only. Never drop such a word globally: "külmutatud" must keep
  blocking frozen vs fresh in Meat/Fish, "pasta" is a real word (a
  paste) in Sauces/Spices.
- Categories with a lot of named product-line variety per brand
  (cosmetics/toiletries, cleaning products, pet food by flavour/
  species) need strict packaging (the default) — the lenient path's
  brand+size(+numeric-stage) check never reads a named variant word at
  all, and real, different products at the same brand+size can match
  as if identical. Found the hard way in batch 7: different shampoo
  lines, different scents, and once a dog food matching a cat food.
  Only turn strict packaging off for a category that's genuinely
  produce-shaped (loose fruit/veg) or as narrow and low-variant as
  Baby formula.

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
- `scraper/rebuild-prices.js` — re-runs the scrape pipeline over
  `data/raw/` for named categories with NO network (`node
  scraper/rebuild-prices.js "Diapers & baby wipes"`), for when a
  matching or naming rule changed and already-scraped items just need
  re-interpreting. Prices stay what the last scrape recorded. Never
  use it on Fruits & vegetables, Bread or Drinks after the daily
  update has run — their `data/raw/` is newer than `data/prices.json`
  and a rebuild would re-match on un-reviewed data.
- **Display names**: every name is synthesized (`synthesizeCanonicalName`
  in `scraper/match-products.js`) in Estonian — brand, type,
  descriptors, organic/grade qualifiers, the stated fat/cocoa %, then
  size. Diapers & baby wipes have their own shape (brand, product
  line, püksmähkmed/mähkmed, S-size, piece count, Boy/Girl — never a
  weight; their stored `size` is the piece count, so the screen prices
  per piece). No two products in a category may share a name —
  `uniqueCanonicalNames` in `scraper/scrape-output.js` guards it and
  `scraper/scrape-output.test.js` checks the data file. A fix to a
  name rule reaches the screen only after a rebuild or a scrape
  rewrites `data/prices.json` — the earlier diaper-name fix sat in the
  code for a day because Diapers was never re-run.
- `scraper/daily-update.js` — unattended scheduled updates (never
  creates/merges products, only updates prices/availability by URL;
  new candidates go to `data/pending.json`, never auto-applied; skips
  the whole run if the repo isn't clean, see the project rule above;
  commits and then pushes to GitHub, logging a failed push instead of
  failing — never force-pushes).
- `data/prices.json` — the matched products the app displays.
- `data/review.md`, `data/ambiguous.json`, `data/unmatched.json`,
  `data/unclassified.json` — generated by `npm run review`.
- `README.md` — fuller technical detail on the architecture, kept in
  English for whoever reads the code next.
