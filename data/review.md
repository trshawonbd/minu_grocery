# Price comparison review

Generated 2026-09-24 from a live run of all three categories across Barbora, Rimi and Selver (`node scraper/fetch-price.js`), using the shared-pool matcher (`matchPool` in scraper/match-products.js): every store's items go into one pool per category, and matching connected groups become one product with any number of stores. A group is accepted only when every pair inside it agrees AND it holds at most one item per store; otherwise it goes to data/ambiguous.json instead of a guess.

Selver is read from its open catalog search API (scraper/stores/selver.js, only under `/api/catalog/vue_storefront_catalog_et/`, at most 1 request per second). It exposes no reliable live stock signal (search index, a dedicated stock-check endpoint and GraphQL were all constant or absent), so every Selver row on the product screen carries a permanent "Selver: availability not verified" note; Selver still counts normally for the cheapest-store comparison. Selver's "Partner" loyalty price is shown only as a small extra line, like Barbora's Aitäh price, and never decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Total |
|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 14 + 29 + 25 | 201 + 259 + 261 | 130 + 79 + 133 | 1131 |
| Matched (any store combination) | 11 | 62 | 31 | 104 |
| — at all 3 stores | 1 | 17 | 8 | 26 |
| — at 2 stores only (Barbora + Rimi) | 1 | 19 | 3 | 23 |
| — at 2 stores only (Barbora + Selver) | 1 | 12 | 13 | 26 |
| — at 2 stores only (Rimi + Selver) | 8 | 14 | 7 | 29 |
| — of which include Selver | 10 | 43 | 28 | 81 |
| Unmatched | 39 | 559 | 272 | 870 |
| Unclassified | 0 | 4 | 0 | 4 |
| Ambiguous groups | 2 | 5 | 0 | 7 |

## 1. Selver hand review — every match involving Selver checked by hand

**81 matches involve Selver, and all 81 pass the check. Two doubtful pairings found in this pass were removed from the data first (below); none was confirmed wrong.** Broken down: Baby formula 10, Fruits & vegetables 43, Dairy 28.

Every pair was read against the raw store names for brand, size, fat % (dairy), flavour/descriptors (dairy), variety/colour/unit (produce) and stage 1/2/3/4 (formula), with particular attention to Selver's own naming style — brand often stated last in capitals ("..., APTAMIL, 800g"). That risk is a non-issue for the `brand` field itself (Selver's comes from the real `product_brand` attribute via a one-time id→name lookup, like Barbora's `brand_name`); it matters only for the fields parsed from the raw name (size, fat %, descriptors, stage), which were checked directly and are guarded by a regression test. "Confirmed" here means every compared attribute agrees on the store's own wording and nothing contradicts it — there is no barcode on the Barbora/Rimi side to prove identity (section 2).

### Found and fixed this pass

- **Colour was never checked on the known-brand path.** "Kartul **kollane** pakitud, LAHEOTSA, 2 kg" (Selver) had been grouped with Barbora's "Kartul pestud pakitud LAHEOTSA, 2kg" and Rimi's "Kartul pestud Laheotsa 2kg", which state no colour. Brand, size and type agreed, and the produce path's variety check doesn't run for a known brand, so a yellow and a red potato from the same brand at the same pack size would have matched. Fixed in `sameProduct` (a colour named on one side only, or a different colour on each, now blocks a known-brand match) with a regression test. Effect: Selver's Laheotsa item leaves the group; Barbora + Rimi stay matched. No other match changed.
- **"Porgand lahtine,kg" (Barbora) taken out of "Porgand kg".** Rimi and Selver both say "pestud" (washed); Barbora says only "lahtine" (loose), and its product page says nothing more. Washed vs unwashed is a real listing difference elsewhere in this data, so this can't be confirmed. Recorded in data/known-different.json (Barbora vs each of the other two); Rimi + Selver remain matched. **Delete those two entries if you know Barbora's is washed.** A blanket "pestud/pesemata" rule was tried and rejected: it would also have dissolved the approved early-potato ambiguous group and created a new Rimi "varajane pesemata" vs Selver "pesemata" match.

### Checked and cleared

- **Aptamil 800g, Rimi 14.05 € vs Selver 19.19 €** (stages 2, 3, 4): looked like two different product lines. Rimi's own product pages say "Aptamil® NUTRI-BIOTIK 2/3" — the same line Selver names — and neither price is a sale price. A real price difference, not a mismatch.
- **"Kirsstomat punane Intsu Talu 1kl, 250g" (Rimi) vs "Kirsstomat punane, INTSU, 250 g" (Selver)**: Rimi's extra "Talu" (farm) is never checked because "Intsu" is a recognized brand on both sides, so the brand path compares brand+size+type+colour, not variety.
- **"Mar. sibulad peedipulbriga Eesti And 450g" vs "Marineeritud sibulad peedipulbriga, EESTI AND, 450 g"**: Rimi's abbreviation "Mar." doesn't strip like the full word, but the same known-brand path means variety is never compared.
- **"Hapukapsas porgandiga kodune Viibergi 650g" vs "Kodune hapukapsas porgandiga, VIIBERGI, 650g"**: word order moves "kodune", so the variety strings differ, and the word-bridging rule (`varietyWordsAgree`) finds it lowercase in the other name.
- **"Soolakurk punase tšilliga 300g" (Barbora) vs "Soolakurgid punase tšilliga, 300g" (Selver)**: matched through Barbora's real structured brand ("Eesti And"), which isn't repeated in the name.
- **Hipp / Aptamil formula** (Rimi abbreviations "P.segu ... Comb.", "Jätkup.segu"; Selver "Organic Combiotic", "NUTRIBIOTIK"): stage number, size, brand and goat/cow base agree on every pair.

### Names agree but are not independently verifiable (kept)

Brüsseli kapsas 500g (Rimi 3.59 € vs Selver 1.99 €), Spargel 250g (Selver adds "ehk asparaagus"), Dattel 200g, Redis 125g ("tuutu" vs "pakitud"), Sibul punane kg (Rimi says "Eesti", Selver states no origin; "Eesti" is deliberately not a variety). Identical wording and pack size, but nothing beyond the name to prove they are the same listing.

## 2. EAN

**EAN decided zero matches.** Selver states a real EAN on every product (419/419 across the three categories, from `product_main_ean`). Barbora and Rimi state one on none of their items (0/345 and 0/367). Re-checked this pass on live single-product pages (Rimi Aptamil 3 and 2, Barbora Porgand): no `gtin`/`ean`/`barcode` field anywhere in the embedded data, no 13-digit number, no schema.org gtin. `sameProduct`'s EAN path only fires when **both** sides have one, so it never fires for any Barbora↔Selver or Rimi↔Selver comparison, and every match comes from the brand/produce heuristics. Selver's EANs are stored on the scraped item but currently unused; they would become useful only if Barbora or Rimi start exposing one.

## 3. Card prices never decide cheapest

Verified against the real `productRows()` (the same code the page renders with) on the live data:

- **Farmi Koorene jogurt maasikatega 400g** — Rimi 1.19 €; Selver 1.79 € with a Partner card price of 1.19 €, exactly tying Rimi's real price. Only Rimi is marked cheapest; Selver's 1.19 € appears only as the small "with Partner card" line.
- **Alma Või 200g** — Selver's real price (2.39 €) is already the lowest of the three, and its Partner price (1.49 €) is lower still. Selver is cheapest on its 2.39 €, and the 1.49 € changes nothing in the comparison.

## 4. All matched products

| Product | Category | Barbora | Rimi | Selver | Cheapest |
|---|---|---|---|---|---|
| Aptamil 1 400g | Baby formula | 10.99 € | 11.59 € | — | Barbora |
| Aptamil 1 800g | Baby formula | 15.99 € | 18.99 € | 19.19 € | Barbora |
| Aptamil Piimapulber 3 800g | Baby formula | — | 14.05 € | 19.19 € | Rimi |
| Aptamil Piimapulber 4 800g | Baby formula | — | 14.05 € | 19.19 € | Rimi |
| Aptamil Piimasegu 2 1,2kg | Baby formula | — | 24.49 € | 24.49 € | Rimi + Selver |
| Aptamil Piimasegu 2 800g | Baby formula | — | 14.05 € | 19.19 € | Rimi |
| Aptamil Piimasegu 3 1,2kg | Baby formula | — | 24.49 € | 24.49 € | Rimi + Selver |
| Hipp Jätkup 2 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Hipp Öko 400g | Baby formula | 20.29 € | — | 20.32 € | Barbora |
| Hipp P 1 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Tutteli Piimasegu 2 650g | Baby formula | — | 9.99 € | 9.99 € | Rimi + Selver |
| Ananass kg | Fruits & vegetables | 2.79 € | 2.79 € | 2.29 € | Selver |
| Avokaado kg | Fruits & vegetables | 5.99 € | 5.99 € | 6.99 € | Barbora + Rimi |
| Baklažaan kg | Fruits & vegetables | 2.19 € | 2.79 € | 3.19 € | Barbora |
| Banaan kg | Fruits & vegetables | 1.29 € | — | 1.29 € | Barbora + Selver |
| Bataat kg | Fruits & vegetables | 2.79 € | 2.79 € | 3.99 € | Barbora + Rimi |
| Dattel 200g | Fruits & vegetables | 0.99 € | — | 1.29 € | Barbora |
| Eesti and Šampinjonid 500g | Fruits & vegetables | — | 5.79 € | 5.59 € | Selver |
| Eesti and Sibulad 450g | Fruits & vegetables | — | 2.99 € | 2.99 € | Rimi + Selver |
| Eesti and Soolakurk 300g | Fruits & vegetables | 3.49 € | — | 3.49 € | Barbora + Selver |
| Granaatõun kg | Fruits & vegetables | 3.49 € | 5.99 € | 5.99 € | Barbora |
| Hapukapsas viibergi 650g | Fruits & vegetables | — | 2.99 € | 3.99 € | Rimi |
| Hapukurk viibergi 400g | Fruits & vegetables | — | 2.99 € | 3.39 € | Rimi |
| Intsu Kirsstomat 250g | Fruits & vegetables | — | 3.49 € | 4.99 € | Rimi |
| Kaalikas kg | Fruits & vegetables | 1.59 € | 1.89 € | — | Barbora |
| Kadarbiku Beebiporgand 250g | Fruits & vegetables | 1.79 € | 1.79 € | — | Barbora + Rimi |
| Kadarbiku Hapukapsas 900g | Fruits & vegetables | 2.45 € | 2.45 € | — | Barbora + Rimi |
| Kapsas brüsseli 500g | Fruits & vegetables | — | 3.59 € | 1.99 € | Selver |
| Kartul punane kg | Fruits & vegetables | 0.99 € | 0.99 € | 0.99 € | Barbora + Rimi + Selver |
| Kartul talukartul kollane 2,5kg | Fruits & vegetables | — | 3.59 € | 3.99 € | Rimi |
| Kartul villeri 2kg | Fruits & vegetables | 2.95 € | 2.95 € | — | Barbora + Rimi |
| Kiivi kg | Fruits & vegetables | 4.99 € | 3.29 € | 4.99 € | Rimi |
| Kiivi kollane 500g | Fruits & vegetables | 4.99 € | — | 5.99 € | Barbora |
| Kõrvits hokkaido kg | Fruits & vegetables | 1.69 € | 1.59 € | — | Rimi |
| Kõrvits kg | Fruits & vegetables | 1.19 € | 0.79 € | 1.69 € | Rimi |
| Kurk luunja kg | Fruits & vegetables | 2.69 € | 4.29 € | — | Barbora |
| Küüslauk kg | Fruits & vegetables | 4.99 € | 4.99 € | 5.99 € | Barbora + Rimi |
| Laheotsa Kartul 2kg | Fruits & vegetables | 2.79 € | 2.79 € | — | Barbora + Rimi |
| Laim kg | Fruits & vegetables | 4.99 € (3.99 € Aitäh) | 4.99 € | — | Barbora + Rimi |
| Lillkapsas kg | Fruits & vegetables | 3.59 € | 2.19 € | 4.29 € | Rimi |
| Maasikad 500g | Fruits & vegetables | 4.99 € | 4.79 € | — | Rimi |
| Murulauk grüne fee tk | Fruits & vegetables | 2.35 € | — | 2.49 € | Barbora |
| Nuikapsas kg | Fruits & vegetables | 1.99 € | 1.99 € | 1.99 € | Barbora + Rimi + Selver |
| Õun granny smith kg | Fruits & vegetables | 2.39 € | — | 3.99 € | Barbora |
| Õun kanzi kg | Fruits & vegetables | 3.99 € (3.19 € Aitäh) | 3.79 € | 3.99 € | Rimi |
| Õun paulared kg | Fruits & vegetables | 0.45 € | — | 0.39 € | Selver |
| Õun royal gala kg | Fruits & vegetables | 2.69 € | 1.49 € | — | Rimi |
| Papaia formosa kg | Fruits & vegetables | 8.29 € | 6.99 € | — | Rimi |
| Paprika kollane kg | Fruits & vegetables | 3.99 € | — | 3.29 € | Selver |
| Paprika punane kg | Fruits & vegetables | 2.29 € | 2.29 € | 2.29 € | Barbora + Rimi + Selver |
| Paprika valge kg | Fruits & vegetables | 1.89 € | 2.79 € | 2.79 € | Barbora |
| Peakapsas kg | Fruits & vegetables | 0.49 € | 0.59 € | 0.35 € | Selver |
| Peet 350g | Fruits & vegetables | 0.75 € | 0.99 € | — | Barbora |
| Piparmünt grüne fee tk | Fruits & vegetables | 2.35 € | 2.39 € | 2.39 € | Barbora |
| Pirn guyot kg | Fruits & vegetables | — | 2.99 € | 2.99 € | Rimi + Selver |
| Ploom tume kg | Fruits & vegetables | 1.99 € | 0.99 € | — | Rimi |
| Pomel kg | Fruits & vegetables | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Porgand kg | Fruits & vegetables | — | 0.50 € | 0.45 € | Selver |
| Redis 125g | Fruits & vegetables | — | 0.85 € | 0.99 € | Rimi |
| Salatisibul kg | Fruits & vegetables | 1.89 € | 1.89 € | 1.89 € | Barbora + Rimi + Selver |
| Sibul kg | Fruits & vegetables | 0.37 € | 0.37 € | — | Barbora + Rimi |
| Sibul punane 400g | Fruits & vegetables | 2.55 € (1.89 € Aitäh) | 2.19 € | — | Rimi |
| Sibul punane kg | Fruits & vegetables | — | 1.59 € | 0.99 € | Selver |
| Sibul võrgus kg | Fruits & vegetables | 0.75 € | 2.99 € | — | Barbora |
| Sidrun eureka kg | Fruits & vegetables | — | 2.29 € | 2.49 € | Rimi |
| Spargel 250g | Fruits & vegetables | 5.99 € | — | 6.58 € | Barbora |
| Spinat grüne fee tk | Fruits & vegetables | 2.35 € | — | 2.39 € | Barbora |
| Tomat kg | Fruits & vegetables | 1.79 € | 1.99 € | — | Barbora |
| Tomat kollane kg | Fruits & vegetables | 3.99 € | — | 3.99 € | Barbora + Selver |
| Tšillipipar punane kg | Fruits & vegetables | — | 7.99 € | 7.99 € | Rimi + Selver |
| Vaarikatomat kg | Fruits & vegetables | 2.99 € | 2.59 € | — | Rimi |
| Viinamari red globe punane kg | Fruits & vegetables | 3.99 € | — | 3.99 € | Barbora + Selver |
| Virsik kg | Fruits & vegetables | — | 2.99 € | 3.99 € | Rimi |
| Alma Koorejogurt muah stracciatella 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Koorejogurt muah troopiline 180g | Dairy | 1.29 € | — | 1.31 € | Barbora |
| Alma Koorejogurt muah vanilli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Kreeka jogurt maitsestamata 180g | Dairy | 0.94 € | — | 0.94 € | Barbora + Selver |
| Alma Kreeka jogurt maitsestamata 370g | Dairy | 1.65 € | — | 1.65 € (1.39 € Partner) | Barbora + Selver |
| Alma Piim 1,5l | Dairy | 1.39 € | 1.39 € | 1.29 € | Selver |
| Alma Piim 500ml | Dairy | — | 0.82 € | 0.80 € | Selver |
| Alma Täispiim 2l | Dairy | — | 1.99 € | 1.99 € | Rimi + Selver |
| Alma Või 200g | Dairy | 2.49 € | 2.49 € | 2.39 € (1.49 € Partner) | Selver |
| Estover Taluvõi eesti 150g | Dairy | 2.19 € | — | 2.39 € | Barbora |
| Farmi Koorene jogurt kirss must 400g | Dairy | 1.79 € | 1.24 € | — | Rimi |
| Farmi Koorene jogurt maasikatega 400g | Dairy | — | 1.19 € | 1.79 € (1.19 € Partner) | Rimi |
| Farmi Koorene jogurt mustasõstra 200g | Dairy | 1.19 € | — | 1.19 € | Barbora + Selver |
| Farmi Koorene jogurt mustikatega 400g | Dairy | 1.79 € | — | 1.49 € | Selver |
| Farmi Koorene jogurt virsikutega 400g | Dairy | 1.79 € | — | 1.79 € (1.19 € Partner) | Barbora + Selver |
| Farmi Kreeka jogurt 370g | Dairy | 1.49 € | — | 1.79 € | Barbora |
| Farmi Piim kiles 1l | Dairy | 0.89 € | — | 0.62 € | Selver |
| Farmi Piim pure 1,5l | Dairy | — | 1.59 € | 1.49 € | Selver |
| Farmi Skyr maasika 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Farmi Skyr virsiku 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Hellus Jogurt maitsestamata 1kg | Dairy | 2.05 € | — | 2.09 € | Barbora |
| Kiivi koorene farmi 400g | Dairy | 1.79 € | 1.79 € | 1.82 € | Barbora + Rimi |
| Mo saaremaa Või 200g | Dairy | 2.49 € (1.75 € Aitäh) | 2.49 € | — | Barbora + Rimi |
| Mo saaremaa Või küüsl soolakrist 150g | Dairy | 2.19 € (1.75 € Aitäh) | 2.19 € | — | Barbora + Rimi |
| Saare Jogurt maitsestamata 400g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Saare Jogurtikreem laktoosivaba sidruni lactose-free 400g | Dairy | — | 1.79 € | 1.82 € (1.39 € Partner) | Rimi |
| Saare Jogurtikreem passioni vaarika 400g | Dairy | 1.25 € | — | 1.82 € (1.39 € Partner) | Barbora |
| Saare Kreeka jogurt 380g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Tere Piim pure 1l | Dairy | — | 1.29 € | 1.09 € | Selver |
| Tere Või 200g | Dairy | 2.59 € | 2.19 € | 2.59 € | Rimi |
| Tere Või laktoosivaba lactose-free 200g | Dairy | — | 2.79 € | 3.29 € | Rimi |

Card prices in parentheses are informational only (section 3). Every Selver price carries the "availability not verified" note on the product screen.

## 5. Ambiguous — needs a person to pick

| Category | Items in the group |
|---|---|
| Baby formula | Barbora "Mahepiimasegu imikutele HOLLE 400g sünn." (11.59 €); Selver "Kitsepiimasegu nr2 6+, HOLLE, 400 g" (20.50 €); Selver "Kitsepiimasegu nr1 0+, HOLLE, 400 g" (20.50 €) |
| Baby formula | Rimi "Piimasegu Aptamil Comfort sünnist 400g" (13.99 €); Rimi "Piimasegu Aptamil Comfort 2 al. 6k 400g" (14.75 €); Selver "Piimasegu Comfort nr1 0+, APTAMIL, 400 g" (13.99 €) |
| Fruits & vegetables | Barbora "Kartul varajane lahtine kg" (0.69 €); Barbora "Kartul varajane pakitud, kg" (0.99 €); Rimi "Kartul varajane pesemata, kg" (0.49 €); Selver "Kartul pesemata, kg" (0.37 €) |
| Fruits & vegetables | Barbora "Kurk lühike, kg" (2.49 €); Rimi "Kurk lühike kg" (2.59 €); Selver "Eesti lühike kurk, kg" (3.99 €); Selver "Kurk poolpikk, kg" (5.59 €) |
| Fruits & vegetables | Rimi "Roheline sibul pakitud 100g" (1.89 €); Selver "Roheline sibul, 100 g" (2.29 €); Selver "Roheline sibul, 100 g" (2.29 €) |
| Fruits & vegetables | Rimi "Mais keedetud 450g" (1.99 €); Selver "Mais vaakumis, 450 g" (2.99 €); Selver "Mais poolikud vaakumis, 450 g" (2.99 €) |
| Fruits & vegetables | Rimi "Mahe Idutrio Lõunaidu 150g" (1.99 €); Selver "Mahe Mungoaidu, LÕUNAIDU, 150 g" (1.89 €); Selver "Mahe idusalat, LÕUNAIDU, 150 g" (1.99 €) |

All 7 are the pool rule working as intended: two same-store variants both matching one listing at another store, or a genuine 3-way disagreement where not every pair agrees.

## 6. Unclassified

| Store | Name | Price |
|---|---|---|
| Barbora | Punane sõstar, 125g | 4.99 € |
| Barbora | Eesti sibula mix võrgus, 1kg | 3.29 € |
| Rimi | Mahe pohl Eesti 250g | 4.79 € |
| Selver | Marineeritud kuuseriisikad, 450 g | 5.99 € |

No recognized type and no recognized brand on any side — never had a reliable comparison to begin with.
