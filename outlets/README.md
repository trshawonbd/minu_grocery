# Outlets — malls and brand discounts

A second, fully separate section of the Minu project (started
2026-09-26) — mall directories and brand sale prices, not groceries.
Nothing here touches `scraper/`, `frontend/`'s grocery screens, or
`data/prices.json`; grocery code and data are never edited by outlets
work, and vice versa. See CLAUDE.md's own **"Outlets"** section for
the rules, roadmap, and scope decisions — this file just says where
things live.

## Where things are

- `outlets/scraper/` — everything that reads a mall's or brand's own
  website: the mall directory (5 malls' address/coordinates/shop
  list), each brand's sale-price scraper, and `daily-update.js` (run
  as a separate step by the grocery `scraper/daily-update.js`, so an
  outlets failure can never stop or change the grocery update — see
  its own header comment).
- `outlets/data/` — the mall directory and brand-discount data this
  produces. Nothing here is grocery data and nothing in `data/` is
  outlets data.
- Tests sit next to the file they test, `outlets/scraper/*.test.js`,
  the same convention `scraper/*.test.js` already uses. Run with
  `npm run test:outlets` (kept separate from `npm test`, which is
  grocery-only and must never depend on outlets code).

## Rules (same spirit as groceries, see CLAUDE.md)

- Ask the owner before any live scrape — a mall/brand site included.
- Respect each site's `robots.txt`.
- At most 1 request per second, per site.
- A wrong match/price is worse than a missing one, same as groceries.

## Roadmap

See CLAUDE.md's "Outlets" section for the full numbered roadmap and
its current status.
