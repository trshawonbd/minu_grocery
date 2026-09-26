# Outlets — step 1 investigation (2026-09-26)

Report only — no scrape, no file written under `outlets/data/`. ~20
page fetches total (robots.txt + one shop-list/sale page per site),
each site fetched once, never more than 1 request/second to any one
site. Two domain corrections found along the way (see below) — the
owner's own brand/mall names were right, the guessed domains weren't.

## Domain corrections (important — don't reuse the wrong ones)

- **Kristiine**: `kristiine.ee` is NOT the mall — it's an unrelated
  local political/district site. The real mall is
  **`kristiinekeskus.ee`**.
- **New Yorker**: `newyorker.com` is *The New Yorker* magazine
  (Condé Nast), not the clothing brand. The real brand site is
  **`newyorker.de`**, with an Estonia path at `/ee/`.
- **Denim Dream**: `denimdream.eu` doesn't resolve.
  `denimdream.ee`/`denimdream.lv` both redirect to the real domain,
  **`denimdream.com`** (country path `/EE/et`).

## Malls

All five are plain server-rendered HTML, no JavaScript needed, and
none of their `robots.txt` files disallow the shop-list page or
mention any AI crawler.

| Mall | Real domain | Shop-list URL | Format | Grouping | Paging |
|---|---|---|---|---|---|
| Ülemiste | www.ulemiste.ee | `/kauplused/` | Plain HTML | Category ("Toidupoed", "Mood", ...) + floor per shop | Paginated, ~21 pages |
| Rocca al Mare | www.roccaalmare.ee | `/kauplused/` | Plain HTML | Alphabetical + category/floor filter sidebar | One page |
| Kristiine | www.kristiinekeskus.ee | `/kauplused` | Plain HTML | Alphabetical + category, floor per shop | One page |
| Viru Keskus | virukeskus.com | `/kauplused` | Plain HTML | Alphabetical, category filter (floor not confirmed on this page — check individual shop pages) | One page |
| Lõunakeskus | www.astri.ee/lounakeskus | `/lounakeskus/poed/` | Plain HTML | Floor + category | One page |

Individual shop pages exist per mall too (e.g. Ülemiste's
`/kauplus/<slug>/`, Lõunakeskus's `/poed/pood/<slug>/`) for whatever
detail isn't on the list page. Lõunakeskus is part of the Astri Grupp
mall network (`astri.ee`) — the same platform likely runs Astri's
other malls, worth knowing if a 6th mall is ever added.

**robots.txt notes:** Kristiine's disallows `/api/*.json` — its own
shop-list page is itself a client-hidden JSON endpoint the *site*
uses, blocked from crawling; we don't need it since the plain
`/kauplused` HTML already has everything. No other mall's robots.txt
disallows anything relevant.

## Brands

| Brand | Real domain | Discount URL | Format | Regular+sale price shown? | Rough item count | robots.txt |
|---|---|---|---|---|---|---|
| Denim Dream | www.denimdream.com | `/EE/et/Naised/Outlet` (+ presumably a Men's/Kids one) | **Plain HTML**, real prices in the markup | Yes — crossed-out regular + sale price + discount % | ~5,578 (women's alone) | Open, `Allow: *`, only cart/account paths blocked |
| Klick | www.klick.ee | `/parimad-pakkumised` | **Plain HTML** | Yes — discount amount shown | ~30 | Open (only checkout/account/compare blocked); `GPTBot` allowed too |
| Apotheka | www.apotheka.ee | `/pakkumised/koik-sooduspakkumised` | **Plain HTML** (confirmed `-50%` badges in the raw markup) | Yes | "over 300 deals a month" per their own tagline | Open for this path — see note below |
| Euronics | www.euronics.ee | No single page — discounts are split across many numbered `/kampaaniad/<id>` campaign pages (e.g. "Back to school", "Apple pre-orders"), enumerated from the homepage/nav each time | Plain HTML per campaign page | Yes, but as **"Sõbrahind" (loyalty price) vs "Tavahind" (regular)** — same caution as Barbora's Aitäh/Selver's Partner in groceries: Sõbrahind must never be treated as "the" price everyone pays without checking there's also a plain price | ~30 per campaign page | Open; explicitly **allows ClaudeBot** for its comparison-tool path (irrelevant to us either way) |
| Sportland | sportland.ee | `/outlet` | **JavaScript-rendered** (Scandiweb Magento PWA/React) — but backed by Magento's own GraphQL API, a standard, documented schema (`regular_price`/`special_price` fields) rather than a private one | Not confirmed without querying the API | Not confirmed | Standard Magento disallow list, nothing AI-specific |
| Reserved | www.reserved.com | `/ee/et/allahindlus` (redirects from `/sale`) | **JavaScript-only** — empty shell, backed by `api.reserved.com` (undocumented) | Not confirmed | Not confirmed | Open, `Crawl-delay: 10` |
| Mohito | www.mohito.com | `/ee/et/sale` | **JavaScript-only**, backed by `api.mohito.com` (same group as Reserved — LPP) | Not confirmed | Not confirmed | Open, `Crawl-delay: 10` |
| New Yorker | www.newyorker.de | Not found even via nav search — likely exists but not linked from the homepage shell | **JavaScript-only**, empty shell, backed by an `api.newyorker.*` endpoint (undocumented) | Not confirmed | Not confirmed | Open — explicitly **allows ClaudeBot/Claude-Web** sitewide |
| Pepco | pepco.ee | No dedicated sale collection found — only a "Reklaamleht" (weekly flyer) link, possibly an image/PDF rather than structured data | **JavaScript-only** (Shopify Hydrogen/Oxygen headless storefront — NOT the standard Shopify theme, so the usual public `/products.json` trick doesn't work) | Not confirmed | Not confirmed | Standard Shopify disallow list |
| Rademar | rademar.ee (pages served from **www.rademar.ee**, API at **api.rademar.ee**) | `/sale` (guessed; page itself is a client-rendered shell either way) | **JavaScript-only**, empty shell on every path tried, including a real product URL from the sitemap | Not confirmed | Not confirmed | `api.rademar.ee/robots.txt` blocks crawling filtered/sorted/paged URL *variants* only, not the base pages |
| **Lindex** | www.lindex.com | `/ee/sale/` | **Blocked outright** — Akamai bot-wall returns 403 on every request, including `/robots.txt` itself, with a browser-like user agent | Unknown | Unknown | Couldn't even read it |
| **Ideaal Kosmeetika** | www.ideaalkosmeetika.ee | not checked further | Not checked | Not checked | Not checked | **Explicitly disallows `ClaudeBot` with `Disallow: /` (everything)** — see below |

### Two brands that need the owner's own call, not just a build-order ranking

- **Ideaal Kosmeetika's `robots.txt` names `ClaudeBot` specifically and
  disallows it from the entire site.** This isn't a generic "no
  bots" wildcard — it targets Claude by name. Per the project's own
  rule (respect `robots.txt`, never bypass a site's stated
  restriction), **I did not fetch anything past its `robots.txt`,
  and recommend not building a scraper for this brand at all**
  (with Claude Code or otherwise) unless the owner wants to look
  into it themselves through a different route.
- **Lindex blocks automated requests outright** (Akamai, 403 on
  everything, no way to even read its `robots.txt`). Getting past
  this would need techniques closer to "evading detection" than
  ordinary scraping — not something to pursue. Recommend dropping it
  from the brand list, or the owner can say otherwise.

### A legal-angle note for later, not now

Apotheka is a pharmacy — its "sooduspakkumised" almost certainly mixes
ordinary drugstore goods with OTC medicine. Groceries already exclude
home-pharmacy items from Personal care for a legal/regulatory reason
(see CLAUDE.md). The same question will need the owner's call when
Apotheka's turn comes: show medicine discounts at all, or filter them
out the same way.

## Recommended build order

1. **Denim Dream** — first brand to prove the pattern. Plain HTML,
   the most complete price/discount data of anything checked (regular
   price, sale price, discount %), by far the largest item count, and
   the most permissive `robots.txt`. As close to "just like a grocery
   store's HTML page" as any of the 12 get.
2. **Klick**, **Apotheka** — same plain-HTML shape as Denim Dream,
   smaller item counts; good candidates for the first "fast mode"
   round of 3–4. Apotheka needs the pharmacy-scope question answered
   first (see above).
3. **Euronics** — plain HTML per page, but needs an "enumerate active
   campaigns" step first (no single discount listing), and the
   Sõbrahind-vs-Tavahind question needs the same care groceries give
   loyalty-card prices.
4. **Sportland** — JavaScript UI, but sits on Magento's own
   documented GraphQL schema — worth trying to query that schema
   directly before assuming a headless browser is needed.
5. **Reserved, Mohito** — same underlying platform (LPP group), so
   solving one likely solves both; JavaScript-only, backed by an
   undocumented API (`api.reserved.com`/`api.mohito.com`) that would
   need reverse-engineering (checking real browser network requests)
   before a scraper could be built.
6. **New Yorker, Pepco, Rademar** — each JavaScript-only with no
   confirmed API shape found from static fetching alone; would need
   the same reverse-engineering step as Reserved/Mohito, with no
   guarantee it's as straightforward.
7. **Lindex, Ideaal Kosmeetika** — not recommended (see above);
   revisit only if the owner explicitly wants to.
