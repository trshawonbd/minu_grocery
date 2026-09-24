# Price comparison review

Generated 2026-09-24 by `npm run review` (scraper/build-review.js) from already-scraped data — data/raw/, data/prices.json, data/ambiguous.json, data/unmatched.json, data/unclassified.json. Never contacts a store; run `npm run fetch-prices` first for fresh numbers.

Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to `ambiguous.json` instead of a guess. Selver has no live stock signal in its public API, so its price always carries a "Selver: availability not verified" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Total |
|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 15 + 29 + 25 | 201 + 276 + 261 | 130 + 80 + 134 | 1151 |
| Matched (any store combination) | 12 | 64 | 31 | 107 |
| — at all 3 stores | 1 | 18 | 9 | 28 |
| — at 2 stores only (Barbora + Rimi) | 1 | 21 | 3 | 25 |
| — at 2 stores only (Barbora + Selver) | 2 | 11 | 12 | 25 |
| — at 2 stores only (Rimi + Selver) | 8 | 14 | 7 | 29 |
| Unmatched | 38 | 571 | 273 | 882 |
| Unclassified | 0 | 4 | 0 | 4 |
| Ambiguous groups | 2 | 5 | 0 | 7 |

## 1. All matched products

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
| Tutteli Tuttelitm 1 650g | Baby formula | 9.99 € | — | 9.99 € | Barbora + Selver |
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
| Farmi Koorene jogurt kirss must 400g | Dairy | 1.79 € | 1.19 € | — | Rimi |
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
| Saare Jogurtikreem passioni vaarika 400g | Dairy | 1.25 € | 1.79 € | 1.82 € (1.39 € Partner) | Barbora |
| Saare Kreeka jogurt 380g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Tere Piim pure 1l | Dairy | — | 1.29 € | 1.09 € | Selver |
| Tere Või 200g | Dairy | 2.59 € | 2.19 € | 2.59 € | Rimi |
| Tere Või laktoosivaba lactose-free 200g | Dairy | — | 2.79 € | 3.29 € | Rimi |
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
| Juurseller kg | Fruits & vegetables | 1.29 € | 1.39 € | — | Barbora |
| Kaalikas kg | Fruits & vegetables | 1.59 € | 1.89 € | — | Barbora |
| Kadarbiku Beebiporgand 250g | Fruits & vegetables | 1.79 € | 1.79 € | — | Barbora + Rimi |
| Kadarbiku Hapukapsas 900g | Fruits & vegetables | 2.45 € | 2.45 € | — | Barbora + Rimi |
| Kapsas brüsseli 500g | Fruits & vegetables | — | 3.59 € | 1.99 € | Selver |
| Kapsas punane kg | Fruits & vegetables | 1.09 € | 1.19 € | — | Barbora |
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
| Paprika kollane kg | Fruits & vegetables | 3.99 € | 3.99 € | 3.29 € | Selver |
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

Card prices shown in parentheses are informational only — never used to decide the Cheapest column.

## 2. Ambiguous — needs a person to pick

| Category | Items in the group |
|---|---|
| Baby formula | Barbora "Mahepiimasegu imikutele HOLLE 400g sünn." (11.59 €); Selver "Kitsepiimasegu nr2 6+, HOLLE, 400 g" (20.50 €); Selver "Kitsepiimasegu nr1 0+, HOLLE, 400 g" (20.50 €) |
| Baby formula | Rimi "Piimasegu Aptamil Comfort sünnist 400g" (13.99 €); Rimi "Piimasegu Aptamil Comfort 2 al. 6k 400g" (14.75 €); Selver "Piimasegu Comfort nr1 0+, APTAMIL, 400 g" (13.99 €) |
| Fruits & vegetables | Barbora "Kartul varajane lahtine kg" (0.69 €); Barbora "Kartul varajane pakitud, kg" (0.99 €); Rimi "Kartul varajane pesemata, kg" (0.49 €); Selver "Kartul pesemata, kg" (0.37 €) |
| Fruits & vegetables | Barbora "Kurk lühike, kg" (2.49 €); Rimi "Kurk lühike kg" (2.59 €); Selver "Eesti lühike kurk, kg" (3.99 €); Selver "Kurk poolpikk, kg" (5.59 €) |
| Fruits & vegetables | Rimi "Roheline sibul pakitud 100g" (1.89 €); Selver "Roheline sibul, 100 g" (2.29 €); Selver "Roheline sibul, 100 g" (2.29 €) |
| Fruits & vegetables | Rimi "Mais keedetud 450g" (1.99 €); Selver "Mais vaakumis, 450 g" (2.99 €); Selver "Mais poolikud vaakumis, 450 g" (2.99 €) |
| Fruits & vegetables | Rimi "Mahe Idutrio Lõunaidu 150g" (1.99 €); Selver "Mahe Mungoaidu, LÕUNAIDU, 150 g" (1.89 €); Selver "Mahe idusalat, LÕUNAIDU, 150 g" (1.99 €) |

## 3. Unclassified

No recognized type and no recognized brand on any side — never had a reliable comparison to begin with.

| Store | Name | Price |
|---|---|---|
| Barbora | Punane sõstar, 125g | 4.99 € |
| Barbora | Eesti sibula mix võrgus, 1kg | 3.29 € |
| Rimi | Mahe pohl Eesti 250g | 4.79 € |
| Selver | Marineeritud kuuseriisikad, 450 g | 5.99 € |

