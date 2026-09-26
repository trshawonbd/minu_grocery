# outlets/data/

Mall directory and brand-discount data lives here once
`outlets/scraper/` produces it (roadmap steps 2–3 in CLAUDE.md's
"Outlets" section). Nothing here is written yet — step 1
(investigation) is a report only, no scrape, no file written under
this folder.

Planned files (named once step 2/3 actually write them):
- A mall directory: 5 malls (Ülemiste, Rocca al Mare, Kristiine,
  Viru, Lõunakeskus) — address, coordinates, and each mall's own shop
  list, brand names made consistent across malls. Refreshed weekly.
- One file per brand's current sale items: name, regular price, sale
  price, discount %, link, image URL (hotlinked, same
  `SHOW_STORE_IMAGES` rule as groceries), and when it was scraped.
  Refreshed daily.
- A compact price-history log for outlets discounts, the same
  URL-keyed, changes-only shape `scraper/price-history.js` uses for
  groceries (see CLAUDE.md's storage-design rule) — for a later "is
  this discount actually new" check.
