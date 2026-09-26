# CLAUDE.md — working instructions for this project

Minu is a grocery price-comparison tool: it scrapes the same real
products from four Estonian grocery stores (Barbora, Rimi, Selver and
Coop Haapsalu — the last with regional prices, see below), matches
equivalent listings across stores, and shows a side-by-side price
comparison. Zero npm dependencies, plain Node.js.

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
  project; the whole `.claude/` folder is gitignored on purpose (its
  lock files are untracked otherwise, and any untracked file makes the
  daily update skip itself — that is what stopped the 2026-09-26 run).

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
  request/second, strictly sequential; Coop (Haapsalu) only via its
  public Store API (`/wp-json/wc/store/v1/products`), also 1
  request/second.
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
  and it does nothing (no scrape, no commit) except write one line
  saying so to `data/logs/YYYY-MM-DD.txt` (the owner's rule: a
  skipped run must always say why; that folder is the one path the
  check ignores, so the line can't make tomorrow skip too). To keep
  it from running overnight while something is deliberately left
  uncommitted, create an empty `data/.work-in-progress` and delete it
  when done. See `checkRepoSafety()` in
  `scraper/daily-update-logic.js`. It covers every category in
  `scraper/categories.js` and every store, refreshes store photo
  URLs along with prices, and launchd runs a missed 06:00 as soon as
  the Mac wakes (a shut-down or logged-out Mac misses the day).
- **Storage design (owner's decision, 2026-09-26):** `data/raw/` is
  gitignored — it still exists on this machine (needed by
  `rebuild-prices.js`, `npm run review`) and is fully regenerable via
  a live scrape, it's just never committed. Price history is
  `data/price-history.json`, one `[date, price]` entry per store URL
  PER ACTUAL CHANGE (keyed by URL, not the product's display name, so
  a rename never orphans it) — never a full daily snapshot; see
  `scraper/price-history.js` for the two pure readers
  (`priceOnDate`, `lowestPriceInWindow`) anything needing a past price
  or a 30-day low (a "real discount" check) should use, and
  `scraper/daily-update.js`'s own call to `recordPrices` for how it's
  kept current. The old `data/history/YYYY-MM-DD.json` full snapshots
  are gone (converted with no information lost via
  `scraper/convert-history.js`, spot-checked, then deleted) — never
  bring that format back.
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
   stay unchanged. — *done*
9. **Batch 9** (owner's request, 2026-09-26): Cakes & pastries,
   Instant food, World cuisine, Alcohol-free beer, cider & wine, and —
   for private testing on this PC only — the three alcohol categories
   Beer & cider, Wine, Spirits (see the alcohol rules below) — *done*
   (2026-09-26: 402 products added, total 2078; one wrong match found
   and fixed in the review — a spirit's age statement now must agree).

10. **Batch 10 — done 2026-09-26** (from the coverage audit, see
    `data/coverage.md`; 118 products added, total 2259): Kohukesed & dairy
    desserts; drinking yoghurts & flavoured/condensed milk; Näkileivad
    (crispbreads); energy/sports/iced-tea drinks; syrups &
    concentrates + juice drinks; frozen fish & seafood; frozen doughs
    & pastries; broths & stock; cat litter (needs the owner's call —
    Pet food is food only today); and two Household gaps (Selver 114
    laundry detergents never fetched; foil/cling film/baking paper).
    Kept out: ready meals, salads, sushi, in-store bakery, bulk packs,
    medicine, makeup, non-grocery. Spreadable/deli cheeses and vinegar
    are already covered. Cat litter went into Pet food (the owner's
    call), the Household gaps were fixed the same day.

11. **Coop (Haapsalu) as the fourth store — done 2026-09-26** (the
    owner's decision; see the Coop section below): 7,545 Coop items
    scraped over all 53 categories, 3,847 products carry a Coop price
    (3,460 joined by barcode, 387 by name), total 2259 → 4974. Review
    found one wrong match (HiPP Comfort vs HiPP Anti Reflux, Baby
    formula) — fixed with regression tests; 145 EAN-vs-name conflicts
    left unmatched in `data/ean-conflicts.json`.

**Not allowed without the owner's explicit decision:** adding a new
store beyond the four (e.g. PROMO Cash&Carry, Lidl), or anything that
puts the app online/publicly reachable. Alcohol was decided by the owner for
batch 9 — private testing only, never public, see next.

**Alcohol is shown for private testing only.** The three alcohol
categories (Beer & cider, Wine, Spirits — `ALCOHOL_CATEGORIES` in
`scraper/categories.js` and `frontend/app-logic.js`) exist so the
owner can test them on this PC. The single setting `SHOW_ALCOHOL` in
`frontend/app-logic.js` is `true` for now; when `false`, every
alcohol category and product is completely hidden in the app — no
tile, no search hit, no home-screen card, no product page, no basket
line (`visibleProducts` is the one gate every screen reads through).
**Before the app is ever made public, `SHOW_ALCOHOL` must be reviewed
with a lawyer and set to `false`** — Estonian alcohol advertising law
(alkoholiseadus) restricts showing alcohol and its prices; this is a
legal question, not a technical one. Never change the setting without
the owner. The alcohol-free category is not alcohol and is never
hidden by it. Store access: Barbora, Rimi and Selver all list alcohol
with prices behind nothing more than a simple "I am 18+" click
(checked 2026-09-26) — if a store ever puts alcohol behind a login or
ID check, stop and tell the owner; never bypass it.

**Coop (Haapsalu) is the fourth store (the owner's decision,
2026-09-26) — regional pricing.** `scraper/stores/coop.js` reads
coophaapsalu.ee's public WooCommerce Store API
(`/wp-json/wc/store/v1/products`, 1 request/second, in-stock items
only). Its prices are the Haapsalu consumer cooperative's e-shop
prices — other Coop regions differ — so the app labels it "Coop
(Haapsalu)" and shows "Haapsalu e-poe hind, teistes piirkondades võib
erineda" under its rows; the price used is what anyone pays online
(Säästukaart discounts don't apply online). **Before anything public,
Coop needs the same lawyer check as the other stores** (robots.txt
allows the API and the sales terms say nothing about automated access,
but that is not a legal opinion). Coop states no brand: `inferBrands`
in `scraper/scrape-output.js` gives a brand-less item a brand another
store states in the same pool before signatures. Coop's `sku` is a
barcode on branded goods: `isValidEan` (8/13 digits, mod-10 check) in
`scraper/match-products.js` decides whether it counts; the same valid
EAN at Coop and Selver = the same product (matchedVia "ean"), the same
EAN with a different size / fat % / stage is an **EAN conflict —
never matched**, written to `data/ean-conflicts.json` for a person.
`node scraper/fetch-price.js --only-store=Coop` fetches Coop alone and
pools it with the other stores' `data/raw/` (no re-scrape); in the
daily-updated categories it never creates a group that has neither a
Coop item nor a pre-existing product. The daily update fetches Coop
with the same safety rules. Coop's own naming habits the matcher now
reads (each with a regression test in `scraper/match-products.test.js`):
a leading age marker ("6K", "10K", "1A") is never the type word or a
brand guess; a stage digit fused onto a line or brand word
("Combiotic2", "Holle2", "Comb.1") is the stage; "Anti Reflux" in
words is the AR line; a strength fused onto a word ("Strong7.5%")
reads 7.5; a weight range fused onto a word ("Girl12-17kg") is not a
diaper size. Barbora's all-caps brand fused onto the previous word
("ComfortHIPP", "MajoneesTARPLAN") is split off before anything else
is read (`splitFusedBrand`). A shared barcode never excuses two
stated diaper sizes disagreeing either.

**When a real EAN matches but the stores file the product under
different category/type words, trust the EAN (owner, 2026-09-26).**
Found reviewing the EAN-conflict fixes: a Zewa "Premium" 2-ply,
120-piece kitchen paper carries the identical barcode at Selver
(filed as "Lehträtikud" — napkins) and Coop (filed as
"Majapidamispaber" — kitchen roll). A real 13-digit manufacturer
barcode is GS1's own guarantee of one physical retail product,
stronger evidence than either store's own loose category wording —
`eanVerdict` in `scraper/match-products.js` never checks the type word
at all, by design, and this is why. Kept matched. (This is separate
from an *internal* code, see below, which never decides anything.)

**GS1's restricted-circulation prefixes ("02", "04", "20"-"29") are
never a matching signal**, even when structurally valid (correct
check digit) — they're a store's own internal code (a per-kg label
for loose produce/weighed meat, or, found in Coop's own data, a small
producer's self-assigned code on 26 of its own Haapsalu-bakery items)
and not globally unique the way a real manufacturer EAN is.
`isInternalEanPrefix` in `scraper/match-products.js` strips these from
every signature's `ean` field before matching; name rules decide
instead. **EAN conflicts** (a shared real barcode whose names disagree)
get one more chance before being left unmatched: `amountCandidatesOverlap`
checks whether either raw name, read in full, states a number the
other side's total also equals — a multipack whose "N-pakk" count and
stated weight are BOTH already the total, a gross/net or per-unit
pair of numbers stated together in one name ("1L/480g"), a paper
product's roll/piece/sheet count or length wherever it appears. Never
approximate — a rounding gap in a store's own label is still reported,
never guessed into a match. Checked against the 145 EAN conflicts on
file 2026-09-26: 84 resolved this way (hand-reviewed against known
real packaging), 61 remained genuine conflicts for a person, in
`data/ean-conflicts.json`.

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
- **Batch 9 follow-ups (owner, 2026-09-26):** Podravka-style dry
  packet soups (cooked in a pot) STAY in Instant food alongside cup
  soups; the 7 ambiguous Spirits groups (same-store duplicate
  listings, Saaremaa 40%/80% vs a strength-less Selver listing) stay
  unmatched — don't ask again.
- **Batch 9 scope (owner, 2026-09-26):** *Cakes & pastries* =
  packaged cakes, cake rolls, keeks, pastries; never in-store bakery,
  dough, biscuits/wafers/gingerbread. *Instant food* = instant
  noodles, instant mash, instant/cup soups ONLY — bouillon and dry
  sauce/meal-mix packets stay out. *World cuisine* = only what no
  category already owns: tortillas/wraps/taco shells, Asian noodles,
  coconut milk/cream, curry pastes, sushi ingredients (nori, rice
  paper, wasabi, pickled ginger), miso, kimchi, tofu; tortilla chips
  stay in Chips & snacks, soy/teriyaki/oyster and every sauce in
  Sauces & condiments, taco/curry spice mixes in Spices, jalapeños in
  Canned food, sushi rice/tempura flour with Rice / Flour. **Asian
  noodles leave Pasta** (`PASTA_NO_ASIAN`) — one product, one
  category. *Alcohol-free beer, cider & wine* = everything a store
  labels "alkoholivaba" (legally ≤0.5%), beer, cider, wine and
  cocktails in one category, "0,0%" shown wherever the store prints
  it. *Alcohol* = the stores' own three shelves: Beer & cider (beer,
  cider, long drinks, beer cocktails, RTD mixes), Wine (still,
  sparkling, fortified, vermouth), Spirits (vodka, gin, whisky, rum,
  brandy/cognac, tequila, liqueurs, other).
- **Alcohol matching rules** (`alcoholMatching` in
  `scraper/categories.js`, `sameBrandedProduct` in
  `scraper/match-products.js`): the alcohol strength is read like a
  fat % and must agree when both stores print it (4,5% ≠ 5,2%) — but
  Selver prints it on nothing, so a one-sided value alone doesn't
  block in these categories (everywhere else it still does); the
  vintage year must agree (one-sided → no match); can vs bottle must
  agree when stated (one-sided → no match); "cl" sizes are ml; "6x0,5l",
  "6 x 500 ml", "12*0,33L" and "0,5l 6-pakk" are the same six-pack and
  never one can; grape/type words (Merlot, Brut) are real descriptors;
  the label classes KPN/KGT/GT/kv are implied in Wine, "õlu"/"hele" in
  Beer & cider. Alcohol-free items are excluded from every alcohol
  source and required on every alcohol-free source
  (`ALCOHOL_FREE_PATTERN`), so "0,0%" can never be pooled with its
  alcoholic twin.
- **Batch 10 scope (owner, 2026-09-26):** *Curd snacks & desserts* =
  kohukesed, curd desserts, puddings, jellies, kissell (no plant
  imitations). *Milk drinks & drinking yoghurt* = joogijogurt,
  flavoured milk, condensed milk — Dairy keeps plain milk and
  spoonable yoghurt (its Selver filters drop "jook"/"joogijogurt"/
  "kondenspiim"); barista milks and coffee drinks stay out.
  *Crispbreads* = näkileivad, rice cakes, galettes — not croutons,
  rusks or snack breads. *Energy, sports & iced-tea drinks* = the
  three together; vitamin water and coffee drinks out; Selver has no
  iced-tea leaf. *Syrups & juice drinks* = syrups, concentrates and
  "mahlajook" together; real juice/nectar stays in Drinks (its filter
  drops "jook"). *Frozen fish & seafood* = fish, fish products (fish
  fingers, breaded fillets), seafood — never fish burgers/patties.
  *Frozen dough & pastries* = doughs, pastries & pies, frozen bread,
  frozen desserts — all four; frozen ready meals out. *Broths & stock*
  = cubes, concentrates, liquid broth — not soups. **Pet food = food +
  cat litter only** (LITTER_ONLY: "liiv"), never toys, bedding, hay,
  sawdust, wood pellets or other supplies.
- **Store candidates checked 2026-09-26 (report only, nothing
  added):** Coop Haapsalu (coophaapsalu.ee) is WooCommerce with an
  open Store API (`/wp-json/wc/store/v1/products`, 100 per page,
  ~9,500 products, EAN as `sku` on branded goods, regular/sale price
  in cents, VAT included, in-stock flag, no brand field, per-kg price
  broken on the site) — robots.txt allows it, the sales terms say
  nothing about automated access; prices are Haapsalu-local, so the
  label must be "Coop (Haapsalu)". Lidl (lidl.ee) has no online
  grocery catalogue — only ~40 weekly leaflet offers, mostly own
  brands — not addable as a store. Neither may be added without the
  owner's explicit decision (and a lawyer's check, like the others).
- **Piece-count sizes (2026-09-26)**: eggs and paper products have
  no weight/volume in their names, only a count — "10tk", Rimi's
  fused "M10", "8 rulli", "300 lehte" — so the strict path (size
  needed on both sides) never matched one, and the app's Munad and
  Paberitooted tiles stayed empty. `pieceCountSizes` in
  `scraper/categories.js` (Dairy, Household only) reads the count as
  the size (10tk ≠ 15tk, 8rl ≠ 24rl, "10x9tk" tissues a multipack),
  the ply as a variant ("3-kihiline" ≠ 2-ply), a paper "300l" as
  sheets not litres, and the egg size letter (M/L) stays a real word.
  Other categories are untouched by it on purpose (a "4tk" in Cakes
  or Candy would create new matches there — the owner's call if ever
  wanted). Many paper products still don't match because the stores
  describe them differently ("Pure White" vs "White") — missing, not
  wrong.
- **Brand spelling (2026-09-26)**: a store's brand field is compared
  with hyphens, periods, spaces and apostrophes removed (`brandKey` in
  `scraper/match-products.js`): TORU-SIIL = TORUSIIL, MAKS & MOORITS
  = MAKS&MOORITS, A. Le Coq = A.LE COQ, Grant's = Grants. Found via
  Torusiil 1 l (all three stores, never matched); the rule added 42
  correct matches across Cheese, Chocolate, Sausages, Ham & cold
  cuts, Personal care, Beer and Spirits, every one read by hand. The
  Torusiil product itself needed a `data/products.json` override too
  (Rimi adds the manufacturer "Mayeri" to the name).
- **Single-store listings in search** (owner, 2026-09-26):
  `data/singles.json` (`scraper/build-singles.js`, run by `npm run
  review`, `fetch-price.js` and `daily-update.js`) holds every scraped
  listing no comparison contains — the app shows them ONLY under
  search results, after the compared products, as "Ainult ühes poes"
  with the store's own name, price, unit price and link; never on a
  category screen, never with "cheapest" or a basket button. The
  `SHOW_ALCOHOL` gate applies to them by category.
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
  size. **Descriptor words keep the order and spelling the store
  wrote** (the owner's call, 2026-09-26: "Pinot grigio", "Black
  Label", never the matcher's sorted/translated form) — the store
  with the fewest abbreviations supplies the wording; an abbreviation
  is still shown expanded ("Külm." → külmutatud) and a "-maitseline"
  suffix still stripped. Matching itself compares the sorted form and
  is untouched by display. `scraper/rename-products.js` recomputes
  ONLY names over `data/prices.json` from `data/raw/` (no re-matching,
  no price change — safe for the daily-updated categories too); use it
  whenever a naming rule changes, and check before/after that nothing
  but `name` differs. Diapers & baby wipes have their own shape (brand, product
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
- `data/prices.json` — the matched products the app displays. Each
  store entry also carries `regularPrice` (only when the store states
  a pre-sale price above today's — "Cheaper than usual" reads this
  and never a card price) and `storeName` (the store's own listing
  title, shown in small print on the product screen).
- `frontend/` — the app: `index.html` (state, hash routes `#/`,
  `#/search`, `#/g/<group id>[/<display category id>]`,
  `#/c/<display category id>`, `#/p/<category::name>`, `#/basket`,
  data loading, the language setting `minu.lang` in localStorage —
  Estonian default), `render.js` (every screen as DOM-building
  functions, no state; all text via `t()`), `catalog.js` (the DISPLAY
  categories: Estonian names in shopping order laid over the data
  categories, which never change — Fruits & vegetables split into
  Puuviljad/Köögiviljad, Dairy into Piim ja jogurt/Või/Munad,
  Household into Nõudepesu/Pesuvahendid/Puhastusvahendid/
  Paberitooted, Coffee + Tea & cocoa merged into Kohv ja tee, Baby
  formula + Baby food + Diapers into Lapsed; the three alcohol tiles
  carry `alcohol: true` and disappear on their own when
  `SHOW_ALCOHOL` is false, because no product reaches them; a data
  category nobody names falls back to a "Muu" tile; icons are our own
  SVG line drawings in `ICON_PATHS`, never another app's artwork).
  **Home screen (2026-09-26 redesign):** `GROUPS` in `catalog.js` folds
  the ~56 display categories into ~14 shopper-familiar groups (Puu- ja
  köögiviljad, Piimatooted ja munad, Liha ja kala, ... — every id
  belongs to exactly one group, checked by `catalog.test.js`; Alkohol
  is its own group, hidden the identical way the alcohol display
  categories already were, when `SHOW_ALCOHOL` is false).
  `frontend/render.js`'s home screen is search bar, then ONE
  horizontally-scrolling row of round group icons (`groupsWithCounts`
  — never a grid, so it never pushes "Suurimad hinnavahed"/"Tavalisest
  odavam" below the fold on a phone), then those two deal rows
  immediately below. Tapping a group opens `renderGroup` — subcategory
  tabs at the top ("Kõik" plus one per display category that
  currently has a product, via `groupsWithCounts`' own `categories`
  list) and the product grid below for whichever tab is selected. The
  older flat single-category screen (`renderCategory`, `#/c/`) still
  exists unchanged (the product screen's own "back" link still uses
  it) — the group screen is a new, separate top-level entry point from
  home, not a replacement.  `i18n.js` (UI strings in et/en/ru; a new
  string goes in all three), `app-logic.js` (search with Estonian
  letters folded, price gaps, "cheaper than usual", basket math —
  basket lives in the browser's localStorage only, key
  `minu.basket.v1`), `pricing.js` (cheapest/tie/unit-price rules,
  `SHOW_STORE_IMAGES`). Tests: `app-logic.test.js`, `catalog.test.js`
  (the display splits, order, groups, three-language names, i18n
  fallback), `render.test.js` (runs the real screens on a tiny fake
  document), `pricing.test.js`. Own design, no store logos — store
  names are coloured text labels. A fourth nav tab, "Outletid"
  (2026-09-26), opens `renderOutlets` — a placeholder screen with no
  grocery data on it at all, between Search and Basket; see the
  "Outlets" section below for what it's for and its own roadmap.
- `data/coverage.md` — the 2026-09-26 audit of every store
  subcategory (COVERED / EXCLUDED with reason / MISSING) and the batch
  10 proposal; refresh it by hand when a store's tree changes.
- `data/review.md`, `data/ambiguous.json`, `data/unmatched.json`,
  `data/unclassified.json` — generated by `npm run review`.
- `README.md` — fuller technical detail on the architecture, kept in
  English for whoever reads the code next.

## Outlets

A second, fully separate section of this project (started
2026-09-26) — mall directories and brand sale prices, not groceries.
**Everything outlets-related lives under `outlets/`** (`outlets/scraper/`,
`outlets/data/`, tests as `outlets/scraper/*.test.js` — see
`outlets/README.md`). Outlets code never edits anything under
`scraper/`, `data/`, or a grocery screen in `frontend/`, and grocery
code never depends on outlets code, in either direction. `npm test`
stays grocery-only; outlets has its own `npm run test:outlets`.
Verify this rule holds after any outlets change the same way: grocery
tests all green and `data/prices.json` byte-identical before/after
(`md5`/`shasum` it before starting).

**The daily update runs outlets as a separate, later step.**
`scraper/daily-update.js`'s `runOutletsStep()` calls
`outlets/scraper/daily-update.js` as a child process strictly AFTER
the grocery commit and push have already happened — wrapped in a
try/catch that only logs, never rethrows, never touches grocery
state. An outlets failure (a crash, a bad exit code, a site being
down) can therefore never stop or change the grocery update, because
by the time outlets even starts that update is already finished and
irreversible. Pinned by a source-level test in
`scraper/daily-update-logic.test.js`.

**Frontend:** a fourth bottom-nav tab, "Outletid", between Search and
Basket. Three screens in `frontend/render.js` (`renderOutlets` — the
mall list; `renderOutletMall` — one mall's shops, a shop whose name
matches a brand file shows its new-discount count and is tappable, one
without is shown plainly; `renderOutletShop` — that brand's real sale
items as a card grid, the note "E-poe allahindlus. See bränd on
selles keskuses esindatud." under the title every time, each card one
link to the brand's own page in a new tab). Routes `#/outlets`,
`#/outlets/<mall id>`, `#/outlets/<mall id>/<shop name>` — the shop
name is split off the RAW hash and decoded on its own, because real
shop names contain "/" ("Juku / Kidzone"). Pure matching lives in
`frontend/outlets-logic.js` (name-based, case-insensitive, tested in
`frontend/outlets-logic.test.js`, part of `npm test`); the screens
read `state.outletMalls` (from `outlets/data/malls.json`) and
`state.outletBrands` (one entry per file in `OUTLET_BRAND_FILES` in
`frontend/index.html` — add a new brand's file there). No grocery
data on any of these screens; images hotlinked under the same
`SHOW_STORE_IMAGES` gate as groceries.

**Rules — same spirit as groceries, apply every session:**
- Ask the owner before every live scrape of a mall or brand site —
  investigation fetches included.
- Respect each site's `robots.txt`.
- At most 1 request per second, per site, strictly sequential —
  the same politeness rule Selver/Coop already follow.
- A wrong match/price is worse than a missing one. When unsure, don't
  match — leave it for a person, the same as groceries'
  `data/ambiguous.json`/`data/pending.json` pattern.
- Store images (once brand discounts are scraped) are hotlinked only,
  same `SHOW_STORE_IMAGES` rule and lawyer-review-before-public
  requirement as groceries.
- No new mall, brand, or store beyond what's decided below without
  the owner's explicit decision — same as groceries' "no new store
  without asking" rule.
- **A discount is "new" only against the 30-day lowest price — for
  EVERY brand (owner, 2026-09-26).** Found on Denim Dream: 58% of its
  whole catalogue (9,640 of 16,611 listings) is "on sale", and on
  every sale item checked the sale price had already been the
  lowest for 30+ days — a price that IS the price. So a brand's own
  "tavahind" never decides a badge. `outlets/scraper/discounts.js`
  (`classifyDiscount`, tested) marks each item `status: "new"` or
  `"permanent"`: NEW = today's price below the site's own 30-day low
  (`priceMin30`, the EU Omnibus figure, kept from the API) — and,
  once our own price history for that link is 30 days old, ALSO
  below `lowestPriceInWindow` of our history; both must agree. A
  site with no such field: our history alone once mature, nothing
  new before that. The `newPercent` is measured against that 30-day
  low, never against tavahind. In the app (`isNewDiscount` in
  `frontend/outlets-logic.js`): only a NEW discount gets the big
  orange "-X%" badge and sorts first; a permanent sale price shows
  the price, a small grey "Püsiv soodushind" note and "tavahind X €"
  in small text — never a big %. A mall's shop row shows only the
  count of new discounts ("12 uut allahindlust"); with none, small
  text "N toodet soodushinnas". A sale price must also be > 0 (a
  non-sale Denim Dream listing carries priceDiscount "0.00", which
  read as 100% off once).

### Malls — correct URLs (verified 2026-09-26; use exactly these)

| Mall | Site |
|---|---|
| Ülemiste | `https://www.ulemiste.ee/` |
| Rocca al Mare | `https://www.roccaalmare.ee/` |
| Kristiine keskus | `https://www.kristiinekeskus.ee/` — **not** `kristiine.ee` (an unrelated site, not the mall) |
| Viru Keskus | `https://virukeskus.com/` |
| Lõunakeskus | `https://www.astri.ee/lounakeskus/` (part of the Astri Grupp mall network) |

### Roadmap

1. **Investigation (report only)** — no scrape, no file written; just
   answers the question of where each mall's shop list and each
   brand's sale page live, what format they're in, and roughly how
   hard each would be to build.
2. **Mall directory** — 5 malls, their real sites (see "Malls" table
   below — two of the owner's own domain guesses were wrong, checked
   2026-09-26): Ülemiste, Rocca al Mare, **Kristiine
   (`https://www.kristiinekeskus.ee/` — NOT `kristiine.ee`, an
   unrelated site)**, Viru, Lõunakeskus. Per mall: name, address,
   coordinates (In-ADS), opening hours if shown, and its own shop
   list from its own website (shop name, category, floor if shown) —
   brand names made consistent across malls (a chain may spell/list
   its name differently at each mall's site, e.g. "DENIM DREAM" =
   "Denim Dream"). Non-shops (cafés, restaurants, cinemas, gyms,
   services) are skipped — shops only. Refreshed weekly, as part of
   the outlets daily-update step.
3. **Brand discounts** — first ONE brand built end-to-end to prove the
   pattern (**Denim Dream**, the owner's pick, 2026-09-26 — plain
   HTML, the most complete price data of anything checked in step 1),
   then fast mode at 3–4 brands per round. Per item: name, regular
   price, sale price, discount % — only a REAL sale (regular > sale,
   never a listing with no discount) — link, image URL (hotlinked,
   `SHOW_STORE_IMAGES` rule), and when it was scraped. A compact,
   URL-keyed price-history log (`scraper/price-history.js`'s shape)
   for a later "is this discount actually new" check.
   **The 12-brand list and where each currently stands (owner's
   decisions, 2026-09-26):**
   - **Denim Dream — built 2026-09-26, via the site's own list API**
     (the owner's decision, with conditions — all four checked and
     recorded in `outlets/scraper/fetch-denim-dream.js`'s header):
     `https://api-v2.denimdream.com/api/v2/product/product?country=EE&lang=et&sale=true&sexId=<1|2|4|5>&page=<n>&size=50`
     — the same JSON the brand's own pages load (found by reading its
     app bundle, the way Selver's catalog path was), a host with NO
     `robots.txt` at all (so nothing disallowed there; the main site's
     `Disallow: /api` is that host only and is never touched), no
     login, 1 request/second, **sale items only** (`sale=true` on the
     request AND regular > sale re-checked per item in
     `outlets/scraper/brands.js`) — never the whole catalogue. The
     page-1 HTML route (`__NEXT_DATA__`) is the same product shape and
     the same parser. Output `outlets/data/denim-dream.json` (per item:
     brand, name, the store's own section Naised/Mehed/Lapsed and type
     e.g. "Teksad", both prices, discount %, link, image, `fresh`,
     store `position`, `firstSeen`), price history in
     `outlets/data/denim-dream-price-history.json` (one entry per link
     per change; `firstSeen` is that link's first date). Ask the owner
     before a full fetch, as with every scrape.
   - **Klick, Apotheka, Euronics — built 2026-09-26** (fast mode;
     one fetch script each, `outlets/scraper/fetch-<brand>.js`, all
     writing through the shared `outlets/scraper/brand-output.js`;
     parsers and their real-excerpt fixtures in
     `outlets/scraper/brands.js` / `fixtures/`). None of the three
     sites has a 30-day-lowest field (checked on list AND product
     pages), so their files say `thirtyDaySource: "history"` and
     every item is `status: "unknown"` — a plain "Allahindlus" in the
     app, no new/permanent split — until our own price history for
     that link is 30 days old, after which our history alone decides.
     - **Klick**: the site's own "Parimad pakkumised" category (id
       60) through its Vue Storefront catalog API
       (`vsf-api.klick.ee/api/catalog/vue_storefront_catalog_et/…`,
       the same stack as Selver's allowed path; that host serves no
       robots.txt; two requests a run). The plain HTML page prints the
       sale price in BOTH price slots — never read prices from it.
       Prices are the `*_incl_tax` fields, rounded to cents. Type =
       the real department (level-2 ancestor among ids 4, 7, 10, 11,
       12, 13), never a campaign landing page.
     - **Apotheka**: `/pakkumised/koik-sooduspakkumised?p=N`, plain
       HTML, 34 cards a page until an empty page. **Cosmetics and
       hygiene ONLY, never a medicine or supplement** (a pharmacy's
       OTC medicine carries the same legal angle groceries' Personal
       care already excludes it for). The only category signal is the
       card's "Toote tüüp": `apothekaTypeAllowed` keeps a type only
       when it matches cosmetics/hygiene wording AND no medicine/
       supplement/health/device word — an unknown type is dropped and
       logged, never guessed in; "Hetkel otsas" (out of stock) is
       dropped too.
     - **Euronics**: no sale listing exists; discounts sit on the
       campaign pages linked from the home page (`/kampaaniad/<id>`;
       deeper `/kampaaniad/*/*` paths are disallowed by robots.txt and
       never fetched). A card's shown price is either for everyone
       (plain `discount__old`) or a loyalty "Sõbrahind"
       (`discount__old__loyal`, "Püsikliendile") — the owner's rule,
       same as Aitäh/Partner in groceries: a loyalty-only card is NOT
       a sale item; it is counted and reported instead. On
       2026-09-26 every one of the 79 discounted campaign cards was
       loyalty-only, so Euronics had 0 sale items.
   - **Reserved, Mohito, New Yorker, Pepco, Rademar, Sportland** —
     later (JavaScript-rendered, no confirmed API from step 1's
     static fetching; New Yorker's real site is
     `https://www.newyorker.de/ee/` — ONLY the Estonian store pages,
     never another country's — `newyorker.com` is an unrelated
     magazine, not this brand).
   - **Ideaal Kosmeetika — never scrape.** Its `robots.txt` disallows
     `ClaudeBot` by name for the entire site; the owner's decision is
     to respect that intent rather than work around it. A partnership
     with the brand directly (not a scrape) is possible later.
   - **Lindex — excluded.** Blocks every request outright (403,
     including `robots.txt` itself). Getting past that would mean
     evading their bot-detection on purpose — never do this, for
     Lindex or any site.
4. **App** — location + a radius picker (5/8/10 km), malls within
   range, each mall's shops with "kuni -X%, N toodet", and the
   discounted items themselves. Label on a brand shown because it has
   a store in that mall: "online discount at this brand, which has a
   store in this mall" (the discount itself is the brand's online
   price, not necessarily identical in-store — the label says so).
5. **Daily update** — brand discounts daily, mall shop lists weekly,
   same safety checks as groceries (an item-count-drop/price-
   volatility check per site); a compact, URL-keyed price-history log
   for outlets discounts (the same shape `scraper/price-history.js`
   uses for groceries) for a later "is this discount actually new"
   check.

**Status (2026-09-26):** steps 1–3 done, step 4 partly, step 5 wired.
- Step 1: see `outlets/investigation.md`; Ideaal Kosmeetika and Lindex
  excluded, Apotheka scoped to cosmetics/hygiene only, the rest
  deferred (above).
- Step 2: `outlets/data/malls.json` — 5 malls, 539 shops (Ülemiste
  162, Rocca al Mare 106, Kristiine 89, Viru 62, Lõunakeskus 120),
  In-ADS coordinates verified against the registry's own
  point-of-interest list. Parsers in `outlets/scraper/malls.js`, one
  per mall (five different site shapes), fetch in
  `outlets/scraper/fetch-malls.js`. Lõunakeskus's site gives no
  per-shop category (client-side filter only), so services there are
  dropped by NAME instead — `isServiceByName` (the owner's word list,
  2026-09-26: pank, autopesula, kliinik, pesula, juuksur, kingsepp,
  lukud/võtmed, pakiautomaat, tankla, EV chargers, telecom desks,
  phone repair, casino, hotel, adventure park ...), applied at every
  mall; 50 listings removed, all reviewed by the owner. A pharmacy
  (Apotheka) is a shop and stays. Viru gives no floor. Opening hours:
  none of the five list them on the shop-list page — not stored.
- Step 3: Denim Dream via its list API (above); the app's discount
  list is a fashion-shop card grid (2 columns on a phone, 4 on a
  desktop) with the store's own section chips (Naised/Mehed/Lapsed),
  product-type chips, and three sorts (suurim allahindlus / madalaim
  hind / uusim) — pure logic in `frontend/outlets-logic.js`
  (`filterAndSortItems`, `itemTypes`, `itemSections`), the chosen
  filter in `state.outletFilter`, reset when a different shop opens.
- Step 4: the mall list → shops → items screens exist (see
  "Frontend"); the location + radius picker is NOT built yet.
- Step 5: `outlets/scraper/daily-update.js` refreshes malls weekly
  (only when `malls.json` is 7+ days old — `shouldRefreshMalls`) and
  every brand in its `BRANDS` list daily (Denim Dream, Klick,
  Apotheka, Euronics — add a new brand's fetch script there and its
  data file to `OUTLET_BRAND_FILES` in `frontend/index.html`), each
  in its own try/catch; stub-tested in
  `outlets/scraper/daily-update.test.js`. The item-count-drop /
  price-volatility safety check is NOT built yet.
