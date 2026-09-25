# Price comparison review

Generated 2026-09-25 by `npm run review` (scraper/build-review.js) from already-scraped data — data/raw/ and data/prices.json. Never contacts a store; run `npm run fetch-prices` first for fresh numbers. Unmatched/unclassified/ambiguous counts and listings are recomputed fresh from data/raw/ every time (not read from data/unmatched.json etc., which a single-category run narrows to just that category — see the comment at the top of this file).

Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to the ambiguous list instead of a guess. Selver has no live stock signal in its public API, so its price always carries a "Selver: availability not verified" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Bread | Drinks | Meat | Pasta | Rice & grains | Flour & sugar | Cooking oil | Cheese | Curd & cottage cheese | Cream & sour cream | Kefir & buttermilk | Coffee | Tea & cocoa | Cereals & oats | Canned food | Sauces & condiments | Spices | Jam & honey & spreads | Baking supplies | Chocolate | Candy | Biscuits | Chips & snacks | Nuts, seeds & dried fruit | Frozen vegetables & berries | Ice cream | Dumplings, pizza & fries | Sausages | Ham & cold cuts | Fish & seafood | Baby food | Diapers & baby wipes | Personal care | Household | Pet food | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 49 + 31 + 25 | 221 + 277 + 259 | 130 + 80 + 133 | 113 + 87 + 98 | 418 + 419 + 353 | 149 + 129 + 110 | 157 + 109 + 110 | 152 + 68 + 72 | 58 + 54 + 73 | 92 + 67 + 59 | 269 + 313 + 231 | 52 + 37 + 39 | 23 + 27 + 25 | 29 + 23 + 26 | 310 + 168 + 184 | 294 + 149 + 146 | 179 + 148 + 151 | 253 + 178 + 171 | 351 + 209 + 311 | 389 + 193 + 246 | 168 + 98 + 109 | 76 + 75 + 25 | 221 + 153 + 137 | 467 + 341 + 280 | 275 + 206 + 197 | 334 + 177 + 86 | 249 + 190 + 152 | 70 + 51 + 78 | 258 + 229 + 161 | 118 + 73 + 83 | 268 + 152 + 151 | 277 + 173 + 188 | 351 + 194 + 236 | 257 + 157 + 162 | 142 + 78 + 78 | 1648 + 1600 + 764 | 716 + 644 + 329 | 389 + 324 + 194 | 23885 |
| Matched (any store combination) | 20 | 67 | 41 | 83 | 94 | 18 | 38 | 19 | 25 | 18 | 54 | 24 | 11 | 5 | 49 | 15 | 36 | 26 | 117 | 114 | 39 | 18 | 37 | 55 | 29 | 30 | 30 | 14 | 16 | 21 | 61 | 53 | 47 | 8 | 44 | 196 | 60 | 11 | 1643 |
| — at all 3 stores | 8 | 18 | 12 | 18 | 20 | 3 | 11 | 4 | 6 | 7 | 10 | 9 | 2 | 0 | 14 | 0 | 13 | 4 | 44 | 57 | 19 | 1 | 12 | 9 | 5 | 3 | 5 | 2 | 2 | 3 | 23 | 9 | 5 | 1 | 29 | 37 | 4 | 2 | 431 |
| — at 2 stores only (Barbora + Rimi) | 5 | 23 | 4 | 30 | 22 | 3 | 7 | 5 | 1 | 3 | 14 | 6 | 3 | 1 | 9 | 11 | 7 | 1 | 21 | 15 | 4 | 10 | 9 | 16 | 4 | 9 | 5 | 0 | 6 | 3 | 17 | 14 | 7 | 3 | 1 | 91 | 45 | 2 | 437 |
| — at 2 stores only (Barbora + Selver) | 4 | 12 | 16 | 24 | 40 | 8 | 9 | 5 | 12 | 5 | 7 | 5 | 3 | 0 | 15 | 4 | 7 | 15 | 37 | 26 | 16 | 4 | 7 | 17 | 12 | 7 | 9 | 9 | 4 | 9 | 14 | 12 | 29 | 4 | 13 | 42 | 7 | 4 | 473 |
| — at 2 stores only (Rimi + Selver) | 3 | 14 | 9 | 11 | 12 | 4 | 11 | 5 | 6 | 3 | 23 | 4 | 3 | 4 | 11 | 0 | 9 | 6 | 15 | 16 | 0 | 3 | 9 | 13 | 8 | 11 | 11 | 3 | 4 | 6 | 7 | 18 | 6 | 0 | 1 | 26 | 4 | 3 | 302 |
| Unmatched | 57 | 577 | 249 | 122 | 964 | 341 | 289 | 210 | 129 | 172 | 694 | 71 | 51 | 68 | 547 | 557 | 393 | 524 | 586 | 543 | 278 | 139 | 425 | 963 | 607 | 534 | 526 | 169 | 614 | 229 | 382 | 516 | 678 | 559 | 111 | 3581 | 1565 | 883 | 19903 |
| Unclassified | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 7 |
| Ambiguous groups | 0 | 8 | 0 | 0 | 3 | 2 | 0 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 2 | 1 | 0 | 15 | 0 | 0 | 0 | 53 |

**Note:** recomputed 1663 matches from data/raw/, but data/prices.json has 1643 — data/raw/ has moved on since the last run that wrote prices.json for some category.

## 1. All matched products

| Product | Category | Barbora | Rimi | Selver | Cheapest |
|---|---|---|---|---|---|
| Bebivita Apteegitilli tee 200g | Baby food | 4.45 € | — | 4.46 € | Barbora |
| Ella's kitchen Kanaroog riisiga 130g | Baby food | 3.29 € | — | 3.65 € | Barbora |
| Hipp Kalkunilihapüree bio 125g | Baby food | 3.65 € | — | 3.65 € | Barbora + Selver |
| Organix Kaerabatoon maasika õuna 23g | Baby food | 1.59 € | — | 1.69 € | Barbora |
| Plasmon Beebiküpsised 120g | Baby food | 2.55 € | 2.55 € | 2.33 € | Selver |
| Plasmon Beebiküpsised 60g | Baby food | 1.45 € | 1.45 € | — | Barbora + Rimi |
| Põnn Kõrvitsapüree ökoloogiline 125g | Baby food | 1.55 € | 1.65 € | — | Barbora |
| Põnn Ühepajatoit sealihaga 130g | Baby food | 2.19 € | 2.19 € | — | Barbora + Rimi |
| Aptamil 1 400g | Baby formula | 10.99 € | 11.59 € | — | Barbora |
| Aptamil 1 800g | Baby formula | 15.99 € | 18.99 € | 19.19 € | Barbora |
| Aptamil 2 1200g | Baby formula | 26.99 € | 24.49 € | 24.49 € | Rimi + Selver |
| Aptamil 2 800g | Baby formula | 15.99 € | 14.05 € | 19.19 € | Rimi |
| Aptamil 3 1200g | Baby formula | 26.99 € | 24.49 € | 24.49 € | Rimi + Selver |
| Aptamil 3 800g | Baby formula | 15.99 € | 14.05 € | 19.19 € | Rimi |
| Aptamil 4 800g | Baby formula | 15.99 € | 14.05 € | 19.19 € | Rimi |
| Aptamil Jätkupiimasegu 2 2x200ml | Baby formula | 4.49 € | 4.39 € | 4.39 € | Rimi + Selver |
| Aptamil Jätkupiimasegu comfort2 400g | Baby formula | 13.99 € | 14.75 € | — | Barbora |
| Aptamil Piimajook 3 200ml | Baby formula | 2.69 € | 2.29 € | — | Rimi |
| Aptamil Piimasegu ar 400g | Baby formula | 13.19 € | 13.19 € | — | Barbora + Rimi |
| Aptamil Piimasegu comfort 400g | Baby formula | — | 13.99 € | 13.99 € | Rimi + Selver |
| Friso Jätkupiimasegu 2 800g | Baby formula | 26.45 € | — | 22.90 € | Selver |
| Hipp Jätkup 2 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Hipp Öko 2 400g | Baby formula | 16.49 € | — | 20.32 € (16.49 € Partner) | Barbora |
| Hipp Öko 400g | Baby formula | 20.29 € | — | 20.32 € | Barbora |
| Hipp P 1 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Hipp Piimasegu 3 500g | Baby formula | 10.49 € | 11.99 € | — | Barbora |
| Tutteli Tuttelitm 1 650g | Baby formula | 9.99 € | — | 9.99 € | Barbora + Selver |
| Tutteli Tuttelitm 2 650g | Baby formula | 11.49 € | 9.99 € | 9.99 € | Rimi + Selver |
| Dr.oetker Küpsetuspulber 160g | Baking supplies | — | 2.99 € | 3.00 € | Rimi |
| Dr.oetker Küpsetuspulber 30g | Baking supplies | 0.49 € | 0.55 € | — | Barbora |
| Dr.oetker Söögisooda 70g | Baking supplies | 0.60 € | 0.65 € | — | Barbora |
| Dr.oetker Suhkrukaunistused 80g | Baking supplies | 2.45 € | 2.45 € | — | Barbora + Rimi |
| Dr.oetker Suhkrust südamekesed 10g | Baking supplies | 1.15 € | 1.15 € | — | Barbora + Rimi |
| Dr.oetker Toiduvärv punane 10g | Baking supplies | 1.85 € | 2.05 € | — | Barbora |
| Dr.oetker Toiduvärv roheline 10g | Baking supplies | 1.85 € | 2.05 € | — | Barbora |
| Dr.oetker Toiduvärv sinine 10g | Baking supplies | 1.85 € | 2.05 € | — | Barbora |
| Dr.oetker Želatiin 20g | Baking supplies | 0.89 € | 0.89 € | — | Barbora + Rimi |
| Dr.oetker Želatiinilehed 10g | Baking supplies | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Meira Küpsetuspulber 100g | Baking supplies | — | 1.79 € | 1.62 € | Selver |
| Meira Värviline nonparell 60g | Baking supplies | 1.88 € | — | 1.88 € | Barbora + Selver |
| Mikaado Moosipaksendaja 30g | Baking supplies | — | 1.99 € | 1.88 € | Selver |
| Nordic Pärm 50g | Baking supplies | 0.39 € | — | 0.36 € | Selver |
| Santa maria Küpsetuspulber 45g | Baking supplies | 0.85 € | 0.95 € | 0.85 € (0.65 € Partner) | Barbora + Selver |
| Santa maria Sidrunhape 32g | Baking supplies | 0.75 € | 0.79 € | — | Barbora |
| Santa maria Želatiin 25g | Baking supplies | 1.25 € | — | 1.25 € | Barbora + Selver |
| Veski mati Kuivpärm 11g | Baking supplies | 0.47 € | — | 0.47 € | Barbora + Selver |
| Domino Küpsised avec fun 120g | Biscuits | — | 2.89 € | 2.95 € | Rimi |
| Domino Küpsised choco crunchy lemon 150g | Biscuits | — | 2.99 € | 2.99 € | Rimi + Selver |
| Domino Küpsised choco crunchy nougat 150g | Biscuits | — | 2.99 € | 2.99 € | Rimi + Selver |
| Domino Küpsised dumle fun 120g | Biscuits | — | 2.89 € | 2.95 € | Rimi |
| Gullon Küpsised digestive 400g | Biscuits | — | 1.99 € | 2.19 € | Rimi |
| Kalev Ekstra küpsis 180g | Biscuits | 1.19 € | 1.19 € | — | Barbora + Rimi |
| Kalev Klassikaline küpsis 163g | Biscuits | 0.95 € | 1.04 € | 1.19 € | Barbora |
| Kalev Küpsised pähklikreemi täidisega 205g | Biscuits | — | 2.65 € | 2.63 € (1.95 € Partner) | Selver |
| Kalev Sidrunimaitseline küpsis 163g | Biscuits | 1.19 € | 1.19 € | 1.19 € | Barbora + Rimi + Selver |
| Kalev Šokolaadimaitseline küpsis 163g | Biscuits | 1.19 € | 1.19 € | 1.19 € | Barbora + Rimi + Selver |
| Kalev Vanillimaitseline küpsis 163g | Biscuits | 1.19 € | 1.19 € | — | Barbora + Rimi |
| Kinder Küpsised cards 76.8g | Biscuits | 2.95 € | — | 2.95 € (2.39 € Partner) | Barbora + Selver |
| Lorenz Soolakõrsik saltletts 75g | Biscuits | 0.85 € | 0.89 € | — | Barbora |
| Magus kõrsik 250g | Biscuits | 1.85 € | — | 1.79 € | Selver |
| Maiasmokk Kirsiküpsised 130g | Biscuits | 1.75 € | — | 1.75 € | Barbora + Selver |
| Maiasmokk Maasikaküpsised 130g | Biscuits | 1.75 € | — | 1.39 € | Selver |
| Marmiton Kaeraküpsised jõhvikatega 150g | Biscuits | 1.65 € | 1.69 € | 1.62 € | Selver |
| Marmiton Krõbedad kaeraküpsised 150g | Biscuits | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Marmiton Rosinaküpsised tallinn 180g | Biscuits | 1.69 € | — | 1.69 € | Barbora + Selver |
| Milka Küpsis choc 150g | Biscuits | — | 2.99 € | 3.39 € | Rimi |
| Nutella Küpsised 193g | Biscuits | 4.59 € | — | 4.59 € | Barbora + Selver |
| Selga Vahvlid šokolaadimaitselised 180g | Biscuits | — | 1.85 € | 1.85 € | Rimi + Selver |
| Tuc Kreekerid juustuga 100g | Biscuits | 1.65 € (1.65 € Aitäh) | — | 1.65 € (1.29 € Partner) | Barbora + Selver |
| Tuc Kreekerid paprikaga 100g | Biscuits | 1.65 € (1.65 € Aitäh) | — | 1.65 € (1.29 € Partner) | Barbora + Selver |
| Tuc Kreekerid peekoniga 100g | Biscuits | 1.65 € (1.65 € Aitäh) | — | 1.65 € (1.29 € Partner) | Barbora + Selver |
| Väike väänik Kaeraküpsis 500g | Biscuits | 1.55 € | — | 2.35 € | Barbora |
| Väike väänik Präänik vanilli 250g | Biscuits | 1.15 € | — | 1.19 € | Barbora |
| Väike väänik Rahvapräänik 500g | Biscuits | 1.55 € | 1.79 € | 2.25 € | Barbora |
| Väike väänik Tatraküpsis 250g | Biscuits | 1.39 € | — | 1.39 € (1.19 € Partner) | Barbora + Selver |
| Eesti pagar Haputaina pehmik 240g | Bread | 1.17 € | — | 1.17 € | Barbora + Selver |
| Eesti pagar Haputaina röst 430g | Bread | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Eesti pagar Hele ciabatta 300g | Bread | 1.09 € | 1.19 € | — | Barbora |
| Eesti pagar Juusturöst tosta 430g | Bread | — | 1.89 € | 1.59 € | Selver |
| Eesti pagar Kaera pehmik 220g | Bread | 1.15 € | — | 1.17 € | Barbora |
| Eesti pagar Kaerasepik 300g | Bread | 1.25 € | 1.25 € | — | Barbora + Rimi |
| Eesti pagar Kanepiseemne leib rukkiteradega 500g | Bread | 1.55 € | — | 1.58 € (1.29 € Partner) | Barbora |
| Eesti pagar Kartuli pehmik röstsibula 240g | Bread | 1.29 € | — | 1.29 € | Barbora + Selver |
| Eesti pagar Leib peremehe 600g | Bread | 1.29 € | — | 1.29 € | Barbora + Selver |
| Eesti Pagar Meeleib 500g | Bread | 1.79 € | 1.39 € | — | Rimi |
| Eesti pagar Mitmevilja pehmik 240g | Bread | 0.89 € | — | 1.17 € | Barbora |
| Eesti pagar Mitmevilja röst tosta 500g | Bread | 1.19 € | 1.19 € | — | Barbora + Rimi |
| Eesti pagar Must rukkileib 390g | Bread | 1.15 € | 1.15 € | — | Barbora + Rimi |
| Eesti pagar Must vormileib 600g | Bread | 0.89 € | 1.25 € | — | Barbora |
| Eesti pagar Narva peenleib 310g | Bread | 0.76 € | 0.75 € | — | Rimi |
| Eesti pagar Pagari kaeraröst 430g | Bread | 1.49 € | 1.59 € | — | Barbora |
| Eesti Pagar Pagariröst täistera 430g | Bread | — | 1.59 € | 1.59 € | Rimi + Selver |
| Eesti pagar Pealinna peenleib 490g | Bread | 1.27 € | 0.99 € | — | Rimi |
| Eesti pagar Peedi pastinaagi pehmik porgandi 240g | Bread | 1.29 € | — | 1.35 € | Barbora |
| Eesti pagar Põrandaleib peremehe 450g | Bread | 1.65 € | 1.79 € | 1.67 € | Barbora |
| Eesti pagar Rehe koorikleib 200g | Bread | 0.80 € | — | 0.80 € | Barbora + Selver |
| Eesti pagar Rehe rukkileib 390g | Bread | 0.89 € | 1.09 € | — | Barbora |
| Eesti Pagar Rehe rukkileib 600g | Bread | 0.65 € | 0.82 € | — | Barbora |
| Eesti pagar Röstsai röst tosta 500g | Bread | 0.99 € | 1.19 € | — | Barbora |
| Eesti pagar Rukkiröst tosta 390g | Bread | 1.09 € | 1.19 € | 1.41 € | Barbora |
| Eesti pagar Rukkisepik 300g | Bread | 1.19 € | 1.09 € | — | Rimi |
| Eesti pagar Rukkitasku 340g | Bread | 1.05 € (0.79 € Aitäh) | — | 1.09 € | Barbora |
| Eesti pagar Seemneleib jassi 310g | Bread | 1.17 € | 1.17 € | — | Barbora + Rimi |
| Eesti pagar Sepik õnne 300g | Bread | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Eesti pagar Suur perenaise sai 500g | Bread | 1.21 € | 0.89 € | — | Rimi |
| Eesti Pagar täistera röstsepik 500g | Bread | 1.55 € | 1.19 € | — | Rimi |
| Eesti pagar Täisterasepik 500g | Bread | 1.19 € | 1.09 € | 1.55 € | Rimi |
| Eesti pagar Teratasku 280g | Bread | 0.99 € | — | 0.99 € | Barbora + Selver |
| Eesti pagar Tume ciabatta 300g | Bread | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Fazer Juuretise röst 450g | Bread | 1.49 € | 1.99 € | 1.89 € | Barbora |
| Fazer Juuretisesai 500g | Bread | 1.79 € | 1.95 € | — | Barbora |
| Fazer Kaerasepik d vitamiiniga 350g | Bread | — | 1.39 € | 1.35 € | Selver |
| Fazer Kamaröst 400g | Bread | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Fazer Keefiriröst kaltsiumiga 450g | Bread | 1.89 € | 1.96 € | — | Barbora |
| Fazer Keefirisai kaltsiumiga 350g | Bread | 1.19 € | 1.25 € | 1.49 € | Barbora |
| Fazer Kodu pereleib 600g | Bread | 1.39 € | — | 0.65 € | Selver |
| Fazer Kodusai mini röst 240g | Bread | 1.29 € | 1.39 € | 1.29 € (1.09 € Partner) | Barbora + Selver |
| Fazer Kodusai röst 500g | Bread | 1.51 € | 1.60 € | 1.59 € | Barbora |
| Fazer Kodusai suur 500g | Bread | 0.99 € | — | 1.49 € | Barbora |
| Fazer Kodusai xxl 700g | Bread | — | 1.29 € | 1.39 € | Rimi |
| Fazer Must juuretisega leib tume 500g | Bread | 1.09 € | 1.39 € | — | Barbora |
| Fazer Must leib 300g | Bread | 1.09 € (0.75 € Aitäh) | — | 1.19 € | Barbora |
| Fazer Must leib 600g | Bread | 1.55 € | 1.60 € | — | Barbora |
| Fazer Must põrandaleib 390g | Bread | 1.45 € | 1.50 € | 1.49 € | Barbora |
| Fazer Must seemneleib 280g | Bread | 1.29 € | 1.39 € | 1.19 € | Selver |
| Fazer Peenleib juuretise 500g | Bread | 1.25 € | 1.69 € | — | Barbora |
| Fazer Prantsuse pikk sai 220g | Bread | 1.45 € | 1.59 € | — | Barbora |
| Fazer Röst seemnetega 500g | Bread | 1.65 € | 1.69 € | — | Barbora |
| Fazer Seemneleib 400g | Bread | 1.99 € | 2.09 € | 2.19 € (1.89 € Partner) | Barbora |
| Fazer Seemneröst 450g | Bread | 1.79 € | 2.39 € | 1.99 € | Barbora |
| Fazer Sepik seemnetega 250g | Bread | 0.79 € | 0.85 € | — | Barbora |
| Fazer Südamesepik täistera 300g | Bread | 1.21 € | — | 1.29 € | Barbora |
| Fazer Vilja röstsepik täisterahelvest 480g | Bread | 1.95 € | 1.55 € | — | Rimi |
| Fazer Võileiva food street tasku 400g | Bread | 2.59 € | — | 2.65 € (2.25 € Partner) | Barbora |
| Leibur Isa peenleib 355g | Bread | 0.99 € | 0.99 € | 0.99 € | Barbora + Rimi + Selver |
| Leibur Kirde sai 300g | Bread | 1.09 € | 0.99 € | 0.89 € | Selver |
| Leibur Kodune sepik 250g | Bread | 0.65 € | 0.69 € | 0.65 € | Barbora + Selver |
| Leibur Kuldne klassikaline röst 250g | Bread | 1.25 € | — | 1.27 € | Barbora |
| Leibur Kuldne klassikaline röst 500g | Bread | 1.09 € | — | 0.95 € | Selver |
| Leibur Leiburi mitmevilja röst 470g | Bread | 1.29 € | 1.89 € | 1.99 € (1.29 € Partner) | Barbora |
| Leibur Mitmevilja röst 250g | Bread | — | 1.69 € | 1.62 € | Selver |
| Leibur Peenleib isa seemnetega 390g | Bread | 1.05 € | 1.05 € | 1.05 € | Barbora + Rimi + Selver |
| Leibur Röst rukkijahu 550g | Bread | 1.95 € | — | 1.98 € (1.49 € Partner) | Barbora |
| Leibur Röstsai graham kuldne röst 500g | Bread | — | 1.55 € | 0.69 € | Selver |
| Leibur Röstsai kuldne röst täistera 500g | Bread | — | 1.79 € | 1.79 € | Rimi + Selver |
| Leibur Rukkileib ruks 390g | Bread | 1.15 € (0.79 € Aitäh) | — | 0.89 € | Selver |
| Leibur Rukkipala idandatud teradega 240g | Bread | 1.59 € | — | 1.95 € (1.39 € Partner) | Barbora |
| Leibur Ruks seemneid seemneleib 390g | Bread | 1.29 € | — | 1.31 € | Barbora |
| Leibur Ruks seemnepala 260g | Bread | 1.47 € | — | 1.47 € | Barbora + Selver |
| Leibur Saib 370g | Bread | — | 1.69 € | 1.68 € | Selver |
| Leibur Sibulaleib 390g | Bread | 2.09 € | 1.75 € | 1.59 € | Selver |
| Leibur Suur kirde sai 450g | Bread | 1.41 € | — | 1.41 € (1.19 € Partner) | Barbora + Selver |
| Leibur Täistera kaeraröst röst 550g | Bread | 2.19 € | — | 2.19 € | Barbora + Selver |
| Leibur Täisterasepik fitlap 360g | Bread | — | 1.59 € | 1.62 € | Rimi |
| Leibur Tallinna peenleib 490g | Bread | 0.99 € | 1.52 € | — | Barbora |
| Leibur Vilja kuldne röst 525g | Bread | 1.55 € | 1.55 € | 1.55 € | Barbora + Rimi + Selver |
| Lõuna pagarid Rukkileib idandatud teradega 300g | Bread | — | 1.59 € | 1.49 € | Selver |
| Lõuna pagarid Rukkileib seemnetega 300g | Bread | — | 1.69 € | 1.59 € | Selver |
| Chupa chups Mullinäts babol big 27.6g | Candy | 0.75 € | 0.75 € | — | Barbora + Rimi |
| Chupa chups Pulgakomm best of the 12g | Candy | 0.39 € | 0.40 € | — | Barbora |
| Dumle Pulgakomm 10g | Candy | 0.30 € | — | 0.30 € | Barbora + Selver |
| Halls Pastillid colors 33.5g | Candy | 1.25 € (0.89 € Aitäh) | 1.25 € | — | Barbora + Rimi |
| Halls Pastillid mee sidruni 33.5g | Candy | 1.25 € (0.89 € Aitäh) | 0.89 € | — | Rimi |
| Haribo Kummikommid balla pico 160g | Candy | 2.25 € | 2.25 € | 1.59 € | Selver |
| Haribo Kummikommid balla pico 85g | Candy | 1.35 € | — | 1.35 € | Barbora + Selver |
| Haribo Kummikommid bussi fruity 175g | Candy | 2.39 € | — | 2.39 € (1.89 € Partner) | Barbora + Selver |
| Haribo Kummikommid cola happy 175g | Candy | 2.25 € | 2.25 € | 2.39 € | Barbora + Rimi |
| Haribo Kummikommid goldbears 175g | Candy | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Haribo Kummikommid phantasia 175g | Candy | 2.39 € | 2.15 € | — | Rimi |
| Haribo Kummikommid ussid 100g | Candy | 1.39 € | — | 1.39 € | Barbora + Selver |
| Kalev Batoonike kirju koer 200g | Candy | 3.59 € | 3.59 € | 2.79 € | Selver |
| Kalev Kama jogurtibatoonike 150g | Candy | 2.39 € | 2.45 € | 2.39 € | Barbora + Selver |
| Kalev Karamell apelsinimaitseline 120g | Candy | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Kalev Karamell barbarissimaitseline 120g | Candy | 1.09 € | 1.09 € | 1.07 € | Selver |
| Kalev Karamell eukalüpti mentoolim 120g | Candy | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Kalev Karamell piparmündimaitseline 120g | Candy | 1.09 € | — | 1.07 € | Selver |
| Kalev Klassikalised trühvlid 160g | Candy | 9.95 € | 9.99 € | 9.97 € | Barbora |
| Kalev Kommisegu lemmikut 7 500g | Candy | 7.95 € (5.79 € Aitäh) | — | 7.97 € (5.99 € Partner) | Barbora |
| Kalev Kungla pralineekomme valik 390g | Candy | 19.69 € | — | 19.69 € | Barbora + Selver |
| Kalev Martsipanikommid klassikalised 175g | Candy | — | 4.29 € | 3.97 € | Selver |
| Kalev Metspähkel piimašokolaadis 140g | Candy | — | 3.39 € | 4.47 € | Rimi |
| Kalev Pehme iiris kiss 150g | Candy | 1.89 € | — | 1.87 € | Selver |
| Kalev Pralineekommid maiuspala 200g | Candy | 7.99 € (5.99 € Aitäh) | 7.99 € | 7.97 € | Selver |
| Kalev Pralineekommid maiuspala 350g | Candy | 7.89 € | 7.89 € | 7.97 € | Barbora + Rimi |
| Kalev Pralineekompvek maiuspala 175g | Candy | 2.69 € | — | 2.59 € | Selver |
| Kalev Rosin merekivid suhkrus 160g | Candy | — | 1.99 € | 1.98 € | Selver |
| Kalev Rosinad nurr piimašokolaadis 150g | Candy | 3.99 € | 3.99 € | — | Barbora + Rimi |
| Kalev Šokolaadikommid kannel 300g | Candy | — | 22.39 € | 23.28 € | Rimi |
| Kalev Tiramisu kakaos mandel 140g | Candy | — | 3.39 € | 4.47 € | Rimi |
| Kalev Vahvlikompvek mesikäpp 150g | Candy | 3.79 € | — | 3.77 € (2.89 € Partner) | Selver |
| Kalev Valik aitäh piimašokolaadikomme 226g | Candy | — | 7.99 € | 7.97 € | Selver |
| Karl fazer Kommikarp selection 150g | Candy | 4.99 € | — | 4.99 € | Barbora + Selver |
| Karl fazer Piimašokolaadikompvekid 250g | Candy | — | 7.99 € | 8.29 € | Rimi |
| Laima Sefiir mustikamaitseline 200g | Candy | — | 2.09 € | 2.19 € | Rimi |
| Laima Sefiir vaniljemaitseline 200g | Candy | 2.09 € (1.49 € Aitäh) | — | 2.19 € | Barbora |
| Lockets Pastillid extra strong 41g | Candy | 1.05 € | 1.05 € | — | Barbora + Rimi |
| Marmiton Halvaa kakaoga 150g | Candy | 2.09 € | — | 2.09 € | Barbora + Selver |
| Marmiton Halvaa pistaatsia 150g | Candy | 1.95 € | — | 1.98 € (1.59 € Partner) | Barbora |
| Marmiton Marmelaad hapu 150g | Candy | 1.99 € | — | 2.15 € | Barbora |
| Marmiton Marmelaad lõigud 150g | Candy | 2.09 € | — | 2.12 € | Barbora |
| Miisu Batoonike 150g | Candy | 2.49 € | 2.49 € | — | Barbora + Rimi |
| Mynthon Pastillid extra strong 34g | Candy | 0.95 € | 0.95 € | 0.95 € (0.75 € Partner) | Barbora + Rimi + Selver |
| Orbit Närimiskumm freshmint white 14g | Candy | — | 0.59 € | 0.90 € | Rimi |
| Orbit Närimiskumm spearmint 50g | Candy | — | 2.49 € | 2.73 € | Rimi |
| Red band Kummikommid bubble pop 100g | Candy | 1.39 € | 1.39 € | — | Barbora + Rimi |
| Skriveru Ploomid tumedas šokolaadis 110g | Candy | 2.75 € | 2.45 € | — | Rimi |
| Trolli Kummikommid glowworms sour 200g | Candy | 1.95 € (1.49 € Aitäh) | 1.99 € | — | Barbora |
| Trolli Kummikommid pfirsichringe 200g | Candy | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Trolli Kummikommid playmouse 200g | Candy | 1.92 € (1.49 € Aitäh) | 1.99 € | — | Barbora |
| True dates Datlid cola sour 100g | Candy | — | 2.75 € | 2.79 € | Rimi |
| True dates Datlid cookie dough 100g | Candy | — | 2.75 € | 2.79 € | Rimi |
| True dates Datlid peach sweet 100g | Candy | — | 2.75 € | 2.79 € | Rimi |
| Van damme Mini vahukommid 100g | Candy | 1.49 € | — | 1.39 € | Selver |
| Felix Kurgi sinepisalat 280g | Canned food | 2.29 € | — | 2.29 € | Barbora + Selver |
| Felix Kurgisalat 280g | Canned food | 2.29 € | 1.99 € | 2.29 € | Rimi |
| Felix Piknikukurk terve 680g | Canned food | 2.95 € | — | 2.89 € | Selver |
| Felix Särtsukurk 460g | Canned food | 2.95 € | — | 2.59 € | Selver |
| Gourmante Kapparid äädikas 100g | Canned food | 1.79 € | — | 1.82 € | Barbora |
| Heinz Punased kidney oad 400g | Canned food | 1.89 € | — | 1.89 € | Barbora + Selver |
| Heinz Viie oa segu tomatikastmes 415g | Canned food | 2.65 € | 2.65 € | — | Barbora + Rimi |
| Minu Tomatid 680g | Canned food | 2.79 € | — | 2.79 € | Barbora + Selver |
| Mõisaproua Marin kurgid 1000g | Canned food | 3.65 € | — | 3.29 € | Selver |
| Mõisaproua Marin kurk mesine 500g | Canned food | 2.45 € | — | 2.43 € | Selver |
| Mõisaproua Tomatid mahlas omas 1000g | Canned food | 3.49 € | — | 3.04 € | Selver |
| Põltsamaa Jahimehesalat 550g | Canned food | — | 3.89 € | 3.65 € | Selver |
| Põltsamaa Sügisesalat 530g | Canned food | — | 3.69 € | 2.99 € | Selver |
| Salvest Aedoad tomatikastmes 530g | Canned food | 2.89 € | — | 2.89 € | Barbora + Selver |
| Salvest Delikatesskurk 330g | Canned food | 2.49 € | 2.59 € | 2.49 € | Barbora + Selver |
| Salvest Hapukurk 675g | Canned food | 3.49 € | 3.49 € | 3.49 € | Barbora + Rimi + Selver |
| Salvest Köögiviljasalat magus vürtsikas 380g | Canned food | — | 3.79 € | 3.65 € | Selver |
| Salvest Kurk 675g | Canned food | 2.69 € | — | 2.69 € (2.29 € Partner) | Barbora + Selver |
| Salvest Kurk maitselt 1600g | Canned food | — | 4.99 € | 4.99 € | Rimi + Selver |
| Salvest Küüslaugukurk 675g | Canned food | 2.79 € | — | 2.79 € | Barbora + Selver |
| Salvest Magus kurk 675g | Canned food | 2.79 € | 2.79 € | 2.79 € | Barbora + Rimi + Selver |
| Salvest Maitselt kurk 675g | Canned food | 2.79 € | — | 2.79 € (1.99 € Partner) | Barbora + Selver |
| Salvest Pohlasalat 310g | Canned food | — | 3.95 € | 3.45 € | Selver |
| Salvest Roheline hernes 690g | Canned food | 2.29 € | — | 2.29 € | Barbora + Selver |
| Salvest Salat toome 520g | Canned food | — | 2.59 € | 2.59 € | Rimi + Selver |
| Salvest Talukurk 675g | Canned food | 2.95 € | — | 2.49 € | Selver |
| Axa Kiirkaerahelbepuder koore maasika 40g | Cereals & oats | 0.55 € | 0.55 € | — | Barbora + Rimi |
| Axa Müsli marjadega premium 330g | Cereals & oats | 2.73 € | — | 2.73 € | Barbora + Selver |
| Baltix Hirsihelbed 500g | Cereals & oats | 1.59 € | 1.59 € | 1.59 € | Barbora + Rimi + Selver |
| Baltix Kiirkaerahelbed 1000g | Cereals & oats | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Baltix Maisihelbed 500g | Cereals & oats | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Baltix Neljaviljahelbed 1000g | Cereals & oats | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Elovena Kaerahelbed kaerakliidega 600g | Cereals & oats | — | 2.69 € | 2.43 € (2.15 € Partner) | Selver |
| Elovena Kiirkaerahelbed 500g | Cereals & oats | — | 2.25 € | 2.25 € (1.89 € Partner) | Rimi + Selver |
| Elovena Kiirkaerapuder vaarikatega 6x35g | Cereals & oats | 2.99 € | — | 2.99 € | Barbora + Selver |
| Helen Kiirkaerahelbed 500g | Cereals & oats | 1.47 € | 1.49 € | 1.47 € | Barbora + Selver |
| Helen Neljaviljahelbed 500g | Cereals & oats | 1.35 € | 1.35 € | 1.35 € | Barbora + Rimi + Selver |
| Helen Riisihelbed 500g | Cereals & oats | 2.25 € | 2.35 € | 2.39 € | Barbora |
| Helen Täisterakaerahelbed 500g | Cereals & oats | 1.34 € | 1.39 € | 1.35 € | Barbora |
| Helen Tatrahelbed 500g | Cereals & oats | 3.09 € | 3.19 € | 3.13 € | Barbora |
| Herkuless Müsli granola šokolaadi 3 350g | Cereals & oats | 2.79 € | — | 2.79 € | Barbora + Selver |
| Kellogg's Hommikuhelbed corn flakes 375g | Cereals & oats | 2.79 € | 3.89 € | 3.99 € | Barbora |
| Lotte Meerõngad 225g | Cereals & oats | 1.67 € | — | 1.67 € | Barbora + Selver |
| Sante Röstitud banaani müsli šokolaadi 350g | Cereals & oats | — | 2.79 € | 2.89 € | Rimi |
| Sante Röstitud müsli puuviljadega 350g | Cereals & oats | 2.79 € | 2.79 € | 2.84 € | Barbora + Rimi |
| Start Padjakesed kakaotäidisega 500g | Cereals & oats | 3.65 € | 3.59 € | — | Rimi |
| Tartu mill Kaerahelbed 500g | Cereals & oats | 0.94 € | — | 1.09 € | Barbora |
| Tartu mill Kaerahelbed jämedad täistera 1000g | Cereals & oats | — | 2.39 € | 2.39 € | Rimi + Selver |
| Tartu mill Kaerahelbed jämedad täistera 500g | Cereals & oats | — | 1.29 € | 1.29 € | Rimi + Selver |
| Tartu mill Kaerahelbepuder kaneeli õuna 35g | Cereals & oats | — | 0.49 € | 0.49 € | Rimi + Selver |
| Tartu mill Kaerahelbepuder mustasõstra 35g | Cereals & oats | — | 0.49 € | 0.39 € | Selver |
| Tartu mill Kaerahelbepuder vaarika 35g | Cereals & oats | 0.49 € (0.39 € Aitäh) | 0.49 € | 0.49 € | Barbora + Rimi + Selver |
| Tartu mill Neljaviljahelbed täistera 500g | Cereals & oats | — | 1.29 € | 1.29 € | Rimi + Selver |
| Tartu mill Riisihelbed 500g | Cereals & oats | 1.99 € | 1.99 € | 1.99 € | Barbora + Rimi + Selver |
| Tartu mill Täistera kiirkaerahelbed 1000g | Cereals & oats | 2.39 € | 2.39 € | 2.39 € | Barbora + Rimi + Selver |
| Tartu mill Täistera kiirkaerahelbed 500g | Cereals & oats | 1.29 € (0.99 € Aitäh) | 1.29 € | 1.29 € | Barbora + Rimi + Selver |
| Tartu mill Täistera neljaviljahelbed 1000g | Cereals & oats | 2.39 € | 2.39 € | 1.99 € | Selver |
| Veski mati Helbed ja kliidega seemnete 500g | Cereals & oats | — | 1.45 € | 1.99 € | Rimi |
| Veski mati Kaera ja riisihelbe segu 500g | Cereals & oats | 1.99 € | — | 2.02 € | Barbora |
| Veski mati Kaerakliid 1000g | Cereals & oats | 3.09 € | 2.95 € | — | Rimi |
| Veski mati Kiirkaerahelbed 500g | Cereals & oats | 1.69 € | 1.45 € | — | Rimi |
| Veski mati Viljahelbed kliidega 500g | Cereals & oats | 1.85 € | — | 1.85 € | Barbora + Selver |
| Alma Sulatatud cheddari juust tšilli 200g | Cheese | 1.99 € (1.59 € Aitäh) | 1.99 € | 1.69 € | Selver |
| Alma Sulatatud juust 200g | Cheese | 1.99 € (1.59 € Aitäh) | 1.89 € | 1.99 € (1.49 € Partner) | Rimi |
| Alma Sulatatud juust kreveti 200g | Cheese | 1.99 € (1.59 € Aitäh) | — | 1.99 € (1.49 € Partner) | Barbora + Selver |
| Alma Sulatatud juust maitseürdi 200g | Cheese | 1.99 € (1.59 € Aitäh) | — | 1.99 € (1.49 € Partner) | Barbora + Selver |
| Alma Sulatatud juust trühvlimaitseline 200g | Cheese | — | 1.99 € | 1.69 € | Selver |
| Estover Juust eesti viilutatud 200g | Cheese | 2.49 € (1.79 € Aitäh) | 2.49 € | — | Barbora + Rimi |
| Estover Juust eesti viilutatud 500g | Cheese | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Estover Juust vene viilutatud 150g | Cheese | 1.69 € | 1.95 € | — | Barbora |
| Estover Juust vene viilutatud 500g | Cheese | — | 6.29 € | 6.59 € | Rimi |
| Estover Riivjuust eesti 400g | Cheese | 4.55 € (2.99 € Aitäh) | 4.55 € | — | Barbora + Rimi |
| Exquisa Toorjuust fitline 200g | Cheese | — | 2.29 € | 2.33 € (1.79 € Partner) | Rimi |
| Farmi Juustu mix 200g | Cheese | — | 2.99 € | 3.25 € | Rimi |
| Farmi Köögi toorjuust 400g | Cheese | 3.69 € | — | 3.69 € | Barbora + Selver |
| Farmi Toorjuust küüslauguga 150g | Cheese | 2.25 € | — | 2.30 € | Barbora |
| Farmi Toorjuust murulauguga 150g | Cheese | 2.25 € | — | 2.30 € | Barbora |
| Farmi Võileivamääre hapukurgi tilli 150g | Cheese | — | 1.55 € | 1.49 € | Selver |
| Hiirte juust Sulatatud 185g | Cheese | 1.85 € | — | 1.87 € | Barbora |
| Merevaik Sulatatud juust 200g | Cheese | — | 1.99 € | 1.99 € | Rimi + Selver |
| Merevaik Sulatatud juust 370g | Cheese | — | 3.59 € | 3.39 € | Selver |
| Merevaik Sulatatud juust kanaga röstitud 200g | Cheese | — | 1.99 € | 1.99 € | Rimi + Selver |
| Merevaik Sulatatud juust kukeseentega 200g | Cheese | — | 1.99 € | 1.99 € | Rimi + Selver |
| Merevaik Sulatatud juust laktoosivaba lactose-free 200g | Cheese | — | 1.99 € | 1.99 € | Rimi + Selver |
| Merevaik Sulatatud juust murulauguga 200g | Cheese | — | 1.99 € | 1.99 € | Rimi + Selver |
| Merevaik Sulatatud juust musta trühvliga 170g | Cheese | — | 1.99 € | 1.99 € | Rimi + Selver |
| Merevaik Sulatatud juust premium 170g | Cheese | 1.57 € | 1.99 € | 1.79 € | Barbora |
| Mo saaremaa Sulatatud juust kadaka 185g | Cheese | — | 1.89 € | 1.87 € | Selver |
| Mo saaremaa Sulatatud juust old saare 185g | Cheese | — | 1.89 € | 1.87 € | Selver |
| Nopri Gouda juust tšilli 250g | Cheese | 3.89 € | — | 5.22 € (3.99 € Partner) | Barbora |
| Nopri Grilljuust 200g | Cheese | 3.52 € | 4.90 € | 4.69 € | Barbora |
| Nopri Grilljuust döner kebab kohvri 200g | Cheese | 3.56 € | 4.49 € | 4.77 € (3.79 € Partner) | Barbora |
| Nopri Grilljuust karulaugu 200g | Cheese | 3.52 € | 4.90 € | — | Barbora |
| Nopri Grilljuust tšilliga 200g | Cheese | 3.52 € | 4.90 € | 4.70 € | Barbora |
| Olympus Salatijuust kitsepiimast 150g | Cheese | — | 2.89 € | 2.90 € (2.39 € Partner) | Rimi |
| Olympus Salatijuust lambapiimast 150g | Cheese | — | 2.89 € | 2.90 € (2.39 € Partner) | Rimi |
| Philadelphia Toorjuust classic 200g | Cheese | 3.75 € (2.89 € Aitäh) | 2.99 € | 2.99 € | Rimi + Selver |
| Philadelphia Toorjuust küüsl light 200g | Cheese | 3.69 € (2.89 € Aitäh) | 2.99 € | — | Rimi |
| Philadelphia Toorjuust light 200g | Cheese | — | 2.99 € | 3.99 € | Rimi |
| Piimameister otto Mozzarella kirsid 125g | Cheese | — | 1.75 € | 1.69 € | Selver |
| Piimameister otto Toorjuust 150g | Cheese | 1.99 € (1.35 € Aitäh) | 1.99 € | — | Barbora + Rimi |
| Piimameister otto Toorjuust 400g | Cheese | 3.45 € | 3.49 € | 3.45 € | Barbora + Selver |
| President Valgehallitusjuust camembert 120g | Cheese | — | 2.85 € | 3.24 € | Rimi |
| Royal blue Sinihallitusjuust 100g | Cheese | 2.19 € | 1.59 € | 1.89 € | Rimi |
| Synnove Juust itaallane kõva 150g | Cheese | — | 3.69 € | 3.65 € | Selver |
| Tere Suitsujuust 200g | Cheese | — | 2.99 € | 3.04 € (2.49 € Partner) | Rimi |
| Valio Juust atleet originaal 200g | Cheese | — | 2.49 € | 2.53 € | Rimi |
| Valio Juust gouda red royal 250g | Cheese | 3.69 € | 2.89 € | — | Rimi |
| Valio Juust gouda red royal viil 150g | Cheese | 2.43 € | 1.89 € | — | Rimi |
| Valio Juust gouda royal yellow 300g | Cheese | 4.16 € | 3.29 € | — | Rimi |
| Valio Juust oltermanni 500g | Cheese | 3.99 € | 6.99 € | — | Barbora |
| Valio Suitsujuust ants kaval 250g | Cheese | 2.95 € | 2.95 € | — | Barbora + Rimi |
| Valio Sulatatud forte juust juustu 185g | Cheese | 1.98 € | 1.99 € | — | Barbora |
| Valio Sulatatud juust 185g | Cheese | 1.99 € | 1.99 € | 1.98 € | Selver |
| Valio Sulatatud juust 370g | Cheese | 2.49 € | 2.69 € | — | Barbora |
| Valio Sulatatud juust murulaugu ürdi 185g | Cheese | — | 1.99 € | 1.98 € | Selver |
| Balsnack Kartulivahvel hapukoore tilli 90g | Chips & snacks | 1.05 € | 1.09 € | — | Barbora |
| Balsnack Kartulivahvel meresoolaga 90g | Chips & snacks | 1.35 € | 1.35 € | — | Barbora + Rimi |
| Cheetos Ketšupi maisikrõpsud 165g | Chips & snacks | 2.69 € | 2.75 € | — | Barbora |
| Cheetos Maisikrõps juustu 165g | Chips & snacks | — | 2.75 € | 2.73 € | Selver |
| Cheetos Maisikrõpsud pitsa 160g | Chips & snacks | 2.69 € | 2.75 € | — | Barbora |
| Estrella Kartulikrõpsud hapukoore kurgi 170g | Chips & snacks | 3.45 € | 3.49 € | — | Barbora |
| Estrella Kartulikrõpsud juustu 180g | Chips & snacks | — | 3.59 € | 3.75 € | Rimi |
| Estrella Kartulikrõpsud sibula 250g | Chips & snacks | 4.59 € (2.89 € Aitäh) | — | 4.49 € | Selver |
| Estrella Mikropopcorn soolaga 90g | Chips & snacks | 1.19 € | — | 1.29 € | Barbora |
| Estrella Mikropopcorn või 90g | Chips & snacks | 1.19 € (0.89 € Aitäh) | 1.19 € | 1.29 € | Barbora + Rimi |
| Lay's Kartulikrõpsud juustu 180g | Chips & snacks | — | 3.59 € | 3.59 € | Rimi + Selver |
| Lay's Kartulikrõpsud sibula 130g | Chips & snacks | — | 1.59 € | 1.99 € | Rimi |
| Lay's Kartulikrõpsud sibula 180g | Chips & snacks | — | 3.59 € | 3.59 € | Rimi + Selver |
| Lay's Kartulikrõpsud tomati 180g | Chips & snacks | — | 3.59 € | 3.59 € | Rimi + Selver |
| Lotte Maisipulgad 130g | Chips & snacks | 1.39 € | 1.39 € | — | Barbora + Rimi |
| Mogyi Mikropopcorn juustu 100g | Chips & snacks | 0.99 € | — | 0.89 € | Selver |
| Ok snacks Röstitud seakrõpsud 50g | Chips & snacks | 2.09 € | — | 1.69 € | Selver |
| Pringles Kartulikrõpsud herbs mediterranean 165g | Chips & snacks | 3.19 € | — | 3.55 € | Barbora |
| Pringles Kartulikrõpsud hot spicy 165g | Chips & snacks | 3.19 € | 3.19 € | — | Barbora + Rimi |
| Pringles Kartulikrõpsud juustu sibula 165g | Chips & snacks | — | 3.19 € | 2.95 € | Selver |
| Pringles Kartulikrõpsud koore sibula 165g | Chips & snacks | — | 3.19 € | 3.55 € | Rimi |
| Pringles Kartulikrõpsud original 165g | Chips & snacks | 3.19 € | 3.19 € | 2.95 € | Selver |
| Pringles Kartulikrõpsud paprika 165g | Chips & snacks | 3.19 € | — | 3.55 € | Barbora |
| Pringles Kartulikrõpsud peekoni 165g | Chips & snacks | 3.19 € | 3.19 € | — | Barbora + Rimi |
| Seakamarakrõpsud ossi sinepi 40g | Chips & snacks | 0.95 € | 1.12 € | — | Barbora |
| Taffel Kartulikrõpsud cheddari 180g | Chips & snacks | 2.75 € | — | 2.97 € (1.97 € Partner) | Barbora |
| Taffel Kartulikrõpsud hapukoore sibula 180g | Chips & snacks | — | 2.95 € | 2.97 € | Rimi |
| Taffel Kartulikrõpsud juustu 180g | Chips & snacks | — | 2.85 € | 2.97 € (1.97 € Partner) | Rimi |
| Taffel Maisipallid juustu nacho 165g | Chips & snacks | 2.99 € | 2.99 € | 2.97 € | Selver |
| Taffel Maisisnäkid hearts juustu nacho 200g | Chips & snacks | — | 3.69 € | 2.85 € | Selver |
| Geisha Šokolaadibatoon crunchy 50g | Chocolate | 1.49 € | — | 1.75 € | Barbora |
| Kalev Brownie batoon maitseline 50g | Chocolate | 1.15 € (0.79 € Aitäh) | 1.15 € | — | Barbora + Rimi |
| Kalev Kamatahvel 100g | Chocolate | — | 1.49 € | 1.49 € | Rimi + Selver |
| Kalev Kamatahvel küpsise mustika 100g | Chocolate | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Kalev Klassikaline martsipanibatoon 40g | Chocolate | 0.99 € | 0.99 € | 0.97 € | Selver |
| Kalev Martsipanibatoon tallinn vana 40g | Chocolate | 0.99 € | 1.05 € | 0.97 € | Selver |
| Kalev Piimašokolaad 190g | Chocolate | 4.99 € | 2.99 € | 4.97 € | Rimi |
| Kalev Piimašokolaad anneke 100g | Chocolate | 2.69 € (1.89 € Aitäh) | 2.59 € | 2.69 € (1.99 € Partner) | Rimi |
| Kalev Piimašokolaad anneke 190g | Chocolate | 4.99 € (3.49 € Aitäh) | 4.99 € | — | Barbora + Rimi |
| Kalev Piimašokolaad anneke 270g | Chocolate | 6.99 € (4.69 € Aitäh) | 6.99 € | 4.97 € | Selver |
| Kalev Piimašokolaad anneke õhuline 65g | Chocolate | 2.25 € (1.59 € Aitäh) | 2.29 € | 2.17 € (1.59 € Partner) | Selver |
| Kalev Piimašokolaad nurr 20g | Chocolate | 0.69 € | — | 0.99 € | Barbora |
| Kalev Šokolaad cream tallinn vana 104g | Chocolate | 2.95 € | — | 2.97 € | Barbora |
| Kalev Tume bitter šokolaad 100g | Chocolate | 2.69 € | 2.69 € | 2.67 € | Selver |
| Kalev Tume bitter šokolaad 100g | Chocolate | 2.69 € | 2.69 € | 2.67 € | Selver |
| Kalev Tume bitter šokolaad 100g | Chocolate | 2.69 € | 2.69 € | — | Barbora + Rimi |
| Kalev Tume bitter šokolaad 190g | Chocolate | 3.79 € | 5.55 € | 4.97 € | Barbora |
| Kalev Tume kirsiga šokolaad 190g | Chocolate | 4.99 € | 2.99 € | 4.97 € | Rimi |
| Kalev Tume mandlitega tervete šokolaad 190g | Chocolate | — | 2.99 € | 4.97 € | Rimi |
| Kalev Tume tuljak täidisega šokolaad 105g | Chocolate | — | 3.29 € | 2.97 € | Selver |
| Karl fazer Piimašokolaad 180g | Chocolate | 5.29 € | 4.99 € | 5.29 € (2.99 € Partner) | Rimi |
| Karl fazer Piimašokolaad 95g | Chocolate | 2.99 € | — | 2.99 € (1.99 € Partner) | Barbora + Selver |
| Karl fazer Piimašokolaad pähkli rosina 180g | Chocolate | — | 5.29 € | 5.29 € (2.99 € Partner) | Rimi + Selver |
| Karl fazer Šokolaadibatoon crunchy 55g | Chocolate | — | 1.75 € | 1.75 € (1.09 € Partner) | Rimi + Selver |
| Karl fazer Tume šokolaad 180g | Chocolate | 5.29 € | — | 5.29 € (2.99 € Partner) | Barbora + Selver |
| Kex Täidetud piimašokolaadis vahvel 60g | Chocolate | 0.99 € | — | 1.25 € | Barbora |
| Kinder Šokolaadibatoon crispy 34.5g | Chocolate | 0.97 € | 1.39 € | — | Barbora |
| Mesikäpp Piimašokolaad vahvliga 270g | Chocolate | — | 6.99 € | 6.87 € | Selver |
| Milka Piimašokolaad bubbly 90g | Chocolate | 2.35 € (1.69 € Aitäh) | 2.35 € | — | Barbora + Rimi |
| Milka Piimašokolaad bubbly white 95g | Chocolate | 2.35 € (1.49 € Aitäh) | 2.35 € | — | Barbora + Rimi |
| Milka Piimašokolaad daim 90g | Chocolate | 2.65 € (1.49 € Aitäh) | — | 2.99 € | Barbora |
| Milka Piimašokolaad oreo 100g | Chocolate | — | 2.35 € | 2.99 € | Rimi |
| Milka Piimašokolaad oreo 300g | Chocolate | 6.39 € (4.49 € Aitäh) | 6.39 € | 4.99 € | Selver |
| Milka Piimašokolaad pähklitega tervete 250g | Chocolate | — | 6.39 € | 6.60 € | Rimi |
| Roshen Piimašokolaad lacmi 90g | Chocolate | 1.59 € | 1.99 € | — | Barbora |
| Schogetten Valge šokolaad 100g | Chocolate | 2.29 € (1.79 € Aitäh) | 2.29 € | — | Barbora + Rimi |
| Tupla Šokolaadibatoon maxi 50g | Chocolate | — | 1.19 € | 1.29 € | Rimi |
| Caffebo Kohvioad tõde 1000g | Coffee | — | 19.99 € | 18.28 € | Selver |
| Caffebo Kohviuba kratt 1000g | Coffee | — | 16.99 € | 15.24 € | Selver |
| Jacobs Jahvatatud kohv krönung 250g | Coffee | 6.49 € | — | 6.29 € (4.99 € Partner) | Selver |
| Jacobs Jahvatatud kohv kronung 500g | Coffee | 10.79 € (6.99 € Aitäh) | 10.79 € | — | Barbora + Rimi |
| Jacobs Jahvatatud kohv kronung mild 500g | Coffee | 12.69 € (8.99 € Aitäh) | 12.69 € | — | Barbora + Rimi |
| Jacobs Jahvatatud kohv selection 500g | Coffee | 13.89 € (7.99 € Aitäh) | 13.89 € | 12.49 € | Selver |
| Jacobs Kohv kronung lahustuv 200g | Coffee | — | 13.79 € | 13.99 € (8.99 € Partner) | Rimi |
| Jacobs Kohvioad barista crema 1000g | Coffee | 29.99 € (14.99 € Aitäh) | 13.99 € | 23.49 € | Rimi |
| Jacobs Kohvioad barista espresso 1000g | Coffee | 29.99 € (14.99 € Aitäh) | 13.99 € | — | Rimi |
| Jacobs Lahustuv cronat gold kohv 100g | Coffee | 6.49 € (3.99 € Aitäh) | 6.49 € | 6.49 € | Barbora + Rimi + Selver |
| Jacobs Lahustuv cronat gold kohv 200g | Coffee | 11.79 € (6.99 € Aitäh) | 11.79 € | 7.99 € | Selver |
| Jacobs Lahustuv kohv krönung 100g | Coffee | 8.19 € (4.69 € Aitäh) | — | 8.12 € | Selver |
| L'or Kohvikapslid capri 10x5.2g | Coffee | 4.59 € (3.59 € Aitäh) | 5.79 € | — | Barbora |
| L'or Kohvikapslid santorini 10x5.2g | Coffee | 4.79 € (3.69 € Aitäh) | 5.79 € | — | Barbora |
| Lavazza Jahvatatud inblu kohv 250g | Coffee | 10.99 € (6.29 € Aitäh) | — | 11.59 € (5.99 € Partner) | Barbora |
| Lavazza Jahvatatud kohv oro 250g | Coffee | 9.99 € (6.99 € Aitäh) | 9.99 € | — | Barbora + Rimi |
| Lavazza Jahvatatud kohv oro qualita 250g | Coffee | 10.99 € (5.99 € Aitäh) | — | 5.69 € | Selver |
| Lavazza Jahvatatud kohv rossa 250g | Coffee | 8.69 € (5.99 € Aitäh) | 8.69 € | — | Barbora + Rimi |
| Lavazza Kohv club jahvatatud purgis 250g | Coffee | — | 10.99 € | 10.99 € | Rimi + Selver |
| Lavazza Kohvioad aroma crema e 1000g | Coffee | 29.99 € (12.99 € Aitäh) | 29.99 € | 29.99 € (14.99 € Partner) | Barbora + Rimi + Selver |
| Lavazza Kohvioad dark oro qualita roast 1000g | Coffee | — | 33.49 € | 34.99 € (18.99 € Partner) | Rimi |
| Lavazza Kohvioad italy napoli of tales 450g | Coffee | — | 18.99 € | 17.99 € (10.99 € Partner) | Selver |
| Lavazza Kohvioad italy of roma tales 450g | Coffee | — | 18.99 € | 17.99 € (10.99 € Partner) | Selver |
| Lavazza Kohvioad qualita rossa 1000g | Coffee | 29.99 € (12.99 € Aitäh) | — | 29.99 € (14.99 € Partner) | Barbora + Selver |
| Löfbergs Jahvatatud inferno kohv 450g | Coffee | 10.15 € | — | 10.15 € | Barbora + Selver |
| Löfbergs Kohvioad brazil 1000g | Coffee | 24.29 € | — | 24.29 € | Barbora + Selver |
| Löfbergs Kohvioad crema 1000g | Coffee | 23.89 € | — | 23.90 € | Barbora |
| Merrild Kohvioad arabica 1000g | Coffee | 25.89 € (13.99 € Aitäh) | — | 26.99 € (12.99 € Partner) | Barbora |
| Merrild Kohvioad barista cremoso 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 25.79 € | 27.99 € | Rimi |
| Merrild Kohvioad barista espresso 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 26.99 € | 27.99 € | Barbora |
| Merrild Kohvioad crema 1000g | Coffee | 25.89 € (13.99 € Aitäh) | 11.99 € | 26.99 € | Rimi |
| Merrild Kohvioad crema dolce 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 26.35 € | 26.99 € (11.99 € Partner) | Barbora |
| Merrild Kohvioad roast vienna 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 24.99 € | — | Rimi |
| Mövenpick Jahvatatud der himmlische kohv 500g | Coffee | 13.29 € | — | 9.99 € | Selver |
| Nescafe Lahustuv classic crema kohv 100g | Coffee | 7.49 € (4.99 € Aitäh) | — | 7.49 € | Barbora + Selver |
| Nescafe Lahustuv gold kohv 200g | Coffee | 16.99 € (8.99 € Aitäh) | 16.99 € | 16.99 € | Barbora + Rimi + Selver |
| Paulig Kohv classic cremoso jahvatatud 500g | Coffee | — | 6.49 € | 10.19 € | Rimi |
| Paulig Kohv jahvatatud mokka 475g | Coffee | — | 6.99 € | 9.59 € (5.69 € Partner) | Rimi |
| Paulig Kohvioad arabica 1000g | Coffee | 24.39 € | 12.49 € | 23.90 € | Rimi |
| Paulig Kohvioad aromatico classic 1000g | Coffee | — | 23.69 € | 24.49 € (12.99 € Partner) | Rimi |
| Paulig Kohvioad classic 1000g | Coffee | 24.89 € (12.99 € Aitäh) | 23.69 € | 24.49 € | Rimi |
| Paulig Kohvioad classic crema 1000g | Coffee | 24.89 € (12.99 € Aitäh) | 23.69 € | 24.49 € | Rimi |
| Paulig Kohviuba arabica selected 1000g | Coffee | — | 12.49 € | 23.90 € | Rimi |
| Segafredo Jahvatatud dolce kohv 450g | Coffee | 9.19 € | — | 9.19 € | Barbora + Selver |
| Segafredo Kohvioad crema perfetto 900g | Coffee | 27.39 € | — | 27.39 € | Barbora + Selver |
| Seve Lahustuv siguriga viljakohv 100g | Coffee | 1.49 € | — | 1.19 € | Selver |
| Starbucks Kohvioad blonde espresso 450g | Coffee | 14.99 € (10.99 € Aitäh) | 14.99 € | 17.99 € | Barbora + Rimi |
| Starbucks Kohvioad pike place 450g | Coffee | 14.99 € (10.99 € Aitäh) | 14.99 € | — | Barbora + Rimi |
| Tasuja Kohviuba tambet 1000g | Coffee | 23.29 € (21.09 € Aitäh) | — | 24.90 € | Barbora |
| Borges Ekstra väärisoliiviõli 250ml | Cooking oil | — | 5.59 € | 5.49 € | Selver |
| Borges Ekstra väärisoliiviõli 750ml | Cooking oil | — | 14.69 € | 14.99 € (8.99 € Partner) | Rimi |
| Borges Viinamarjaseemneõli 500ml | Cooking oil | 4.57 € | — | 6.09 € | Barbora |
| Goccia d'oro Oliivijääkõli 1000ml | Cooking oil | 7.99 € | — | 9.89 € | Barbora |
| Gourmante Ekstra väärisoliiviõli 500ml | Cooking oil | — | 10.99 € | 10.59 € | Selver |
| Kalew Extra väärisoliiviõli 500ml | Cooking oil | 8.15 € (5.49 € Aitäh) | — | 8.19 € | Barbora |
| Kalew Küpsetusõli 1000ml | Cooking oil | 2.49 € | 3.19 € | 3.24 € | Barbora |
| Kalew Oliiviõli extra light 500ml | Cooking oil | 8.35 € | 8.59 € | 8.32 € (6.49 € Partner) | Selver |
| Kalew Rapsiõli 1000ml | Cooking oil | 3.19 € (1.99 € Aitäh) | 3.19 € | 3.19 € | Barbora + Rimi + Selver |
| Natura Päevalilleõli 1000ml | Cooking oil | 5.59 € | 5.59 € | — | Barbora + Rimi |
| Naturalisimo Päevalilleõli 1000ml | Cooking oil | 5.69 € | 6.19 € | 4.18 € (2.99 € Partner) | Selver |
| Naturalisimo Rafineeritud kookosõli 500ml | Cooking oil | 3.99 € | 4.69 € | — | Barbora |
| Oilio Toiduõli 1000ml | Cooking oil | 3.69 € | — | 2.99 € | Selver |
| Oleina Rapsiõli 1000ml | Cooking oil | 3.79 € | — | 3.85 € | Barbora |
| Olivia Küpsetusõli 1000ml | Cooking oil | 3.65 € | 3.69 € | 3.65 € (2.49 € Partner) | Barbora + Selver |
| Olivia Päevalilleõli 1000ml | Cooking oil | 3.49 € (2.49 € Aitäh) | 2.49 € | — | Rimi |
| Olivia Rapsiõli 1000ml | Cooking oil | 3.59 € (2.49 € Aitäh) | 3.65 € | 3.59 € (2.39 € Partner) | Barbora + Selver |
| Olivia Rapsiõli 500ml | Cooking oil | 1.95 € | 1.69 € | 1.79 € | Rimi |
| Alma Hapukoor 250g | Cream & sour cream | 0.95 € | 1.19 € | — | Barbora |
| Alma Hapukoor 500g | Cream & sour cream | 1.45 € | 1.49 € | — | Barbora |
| Alma Kohvikoor 200ml | Cream & sour cream | — | 0.65 € | 0.39 € | Selver |
| Alma Kohvikoor 380ml | Cream & sour cream | 1.25 € | 0.99 € | 1.15 € | Rimi |
| Alma Toidukoor 400ml | Cream & sour cream | 1.59 € | 1.99 € | 1.49 € | Selver |
| Alma Vahukoor 400ml | Cream & sour cream | — | 2.49 € | 2.39 € | Selver |
| Tere Hapukoor 250g | Cream & sour cream | 1.09 € | — | 1.72 € | Barbora |
| Tere Kohvikoor 200ml | Cream & sour cream | 0.65 € | 0.65 € | — | Barbora + Rimi |
| Tere Kohvikoor 380ml | Cream & sour cream | 0.95 € | — | 0.99 € | Barbora |
| Tere Vahukoor laktoosivaba lactose-free 200ml | Cream & sour cream | — | 1.49 € | 1.39 € | Selver |
| Tere Vahukoor laktoosivaba lactose-free 400ml | Cream & sour cream | 2.39 € | — | 2.79 € | Barbora |
| Alma Kodujuust 200g | Curd & cottage cheese | 1.35 € | 0.99 € | 1.34 € | Rimi |
| Alma Kodujuust 380g | Curd & cottage cheese | 2.19 € | 2.19 € | 2.25 € | Barbora + Rimi |
| Alma Kodujuust 500g | Curd & cottage cheese | 2.29 € | 2.39 € | — | Barbora |
| Alma Kodujuust laktoosivaba lactose-free 200g | Curd & cottage cheese | — | 1.19 € | 1.58 € | Rimi |
| Alma Kodujuust murakamoosiga 200g | Curd & cottage cheese | — | 1.49 € | 2.02 € (1.59 € Partner) | Rimi |
| Alma Kodujuust soolakurgi tilliga 200g | Curd & cottage cheese | 1.39 € | 1.25 € | — | Rimi |
| Alma Kohupiim 200g | Curd & cottage cheese | 0.85 € | — | 0.99 € | Barbora |
| Alma Kohupiim lahja 200g | Curd & cottage cheese | 0.85 € | 1.15 € | 0.99 € | Barbora |
| Alma Kohupiim metsmaasika 200g | Curd & cottage cheese | — | 1.15 € | 1.25 € | Rimi |
| Alma Kohupiim vanilli 200g | Curd & cottage cheese | 0.99 € | 1.15 € | — | Barbora |
| Farmi Kohupiim 200g | Curd & cottage cheese | 0.79 € | 0.89 € | — | Barbora |
| Farmi Kohupiim lahja rosinatega 200g | Curd & cottage cheese | 0.79 € | 0.89 € | 0.99 € | Barbora |
| Farmi Lahja kohupiim vanilliiniga 200g | Curd & cottage cheese | — | 0.89 € | 0.99 € | Rimi |
| Liisu Kohupiim 250g | Curd & cottage cheese | 2.09 € | 2.09 € | 2.07 € | Selver |
| Mo saaremaa Pehme kohupiim 500g | Curd & cottage cheese | 2.49 € | 2.55 € | 2.19 € | Selver |
| Piimameister otto Kodujuust hapukoorega 330g | Curd & cottage cheese | 1.85 € (1.45 € Aitäh) | — | 1.88 € (1.39 € Partner) | Barbora |
| Piimameister otto Kodujuust klassikaline 330g | Curd & cottage cheese | 1.85 € (1.45 € Aitäh) | 1.85 € | 1.88 € | Barbora + Rimi |
| Piimameister otto Kodujuust klassikaline 440g | Curd & cottage cheese | 2.39 € | — | 2.55 € | Barbora |
| Piimameister otto Kohupiim ricotta 200g | Curd & cottage cheese | 0.73 € | 0.69 € | — | Rimi |
| Tere Kodujuust karulaugupestoga 200g | Curd & cottage cheese | 1.35 € | 1.69 € | 1.39 € | Barbora |
| Tere Kodujuust klassikaline 380g | Curd & cottage cheese | 2.05 € | 2.05 € | — | Barbora + Rimi |
| Tere Kodujuust riisikatega 200g | Curd & cottage cheese | 1.35 € | — | 1.99 € | Barbora |
| Tere Kohupiim 200g | Curd & cottage cheese | 1.15 € | 1.09 € | 1.17 € (0.89 € Partner) | Rimi |
| Tere Kohupiim rosinatega 200g | Curd & cottage cheese | 1.15 € | — | 1.17 € (0.89 € Partner) | Barbora |
| Alma Koorejogurt marja muah plombiirimaitseline 180g | Dairy | 1.29 € | — | 1.31 € | Barbora |
| Alma Koorejogurt muah stracciatella 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Koorejogurt muah troopiline 180g | Dairy | 1.29 € | — | 1.31 € | Barbora |
| Alma Koorejogurt muah vanilli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Kreeka jogurt maitsestamata 180g | Dairy | 0.94 € | — | 0.94 € | Barbora + Selver |
| Alma Kreeka jogurt maitsestamata 370g | Dairy | 1.65 € | — | 1.65 € (1.39 € Partner) | Barbora + Selver |
| Alma Muah koorejogurt rukkileiva-kaneeli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Piim 1000ml | Dairy | 1.25 € | — | 1.25 € | Barbora + Selver |
| Alma Piim 1500ml | Dairy | 1.39 € | 1.39 € | 1.29 € | Selver |
| Alma Piim 2,5% 1L | Dairy | — | 1.29 € | 1.25 € | Selver |
| Alma Piim 500ml | Dairy | 0.80 € | 0.82 € | 0.80 € | Barbora + Selver |
| Alma Proteiinijogurt kreeka maitsestamata 370g | Dairy | 1.75 € (1.39 € Aitäh) | 1.89 € | — | Barbora |
| Alma Täispiim 2000ml | Dairy | — | 1.99 € | 1.99 € | Rimi + Selver |
| Alma Või 200g | Dairy | 2.49 € | 2.49 € | 2.39 € (1.49 € Partner) | Selver |
| Estover Taluvõi eesti 150g | Dairy | 2.19 € | — | 2.39 € | Barbora |
| Farmi Koorene jogurt kiivi tikri 400g | Dairy | 1.79 € | 1.79 € | 1.82 € | Barbora + Rimi |
| Farmi Koorene jogurt kirss must 400g | Dairy | 1.79 € | 1.19 € | — | Rimi |
| Farmi Koorene jogurt maasikatega 400g | Dairy | — | 1.19 € | 1.79 € (1.19 € Partner) | Rimi |
| Farmi Koorene jogurt martsipani ploomi 200g | Dairy | 1.19 € | — | 1.19 € | Barbora + Selver |
| Farmi Koorene jogurt mustasõstra 200g | Dairy | 1.19 € | — | 1.19 € | Barbora + Selver |
| Farmi Koorene jogurt mustikatega 400g | Dairy | 1.79 € | — | 1.49 € | Selver |
| Farmi Koorene jogurt virsikutega 400g | Dairy | 1.79 € | — | 1.79 € (1.19 € Partner) | Barbora + Selver |
| Farmi Kreeka jogurt 370g | Dairy | 1.49 € | — | 1.79 € | Barbora |
| Farmi Piim kiles 1000ml | Dairy | 0.89 € | — | 0.62 € | Selver |
| Farmi Piim pure 1500ml | Dairy | — | 1.59 € | 1.49 € | Selver |
| Farmi Skyr maasika 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Farmi Skyr virsiku 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Farmi Täispiim 3,6-4,2% 1L | Dairy | — | 1.65 € | 1.65 € | Rimi + Selver |
| Hellus Jogurt maitsestamata 1000g | Dairy | 2.05 € | — | 2.09 € | Barbora |
| Mo saaremaa Mahetäispiim 1000ml | Dairy | 1.69 € | — | 1.45 € | Selver |
| Mo saaremaa Või 200g | Dairy | 2.49 € (1.75 € Aitäh) | 2.49 € | — | Barbora + Rimi |
| Mo saaremaa Või küüsl soolakrist 150g | Dairy | 2.19 € (1.75 € Aitäh) | 2.19 € | — | Barbora + Rimi |
| Mo saaremaa Või laktoosivaba lactose-free 200g | Dairy | — | 2.49 € | 1.99 € | Selver |
| Saare Jogurt maitsestamata 400g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Saare Jogurtikreem laktoosivaba sidruni lactose-free 400g | Dairy | — | 1.79 € | 1.82 € (1.39 € Partner) | Rimi |
| Saare Jogurtikreem passioni vaarika 400g | Dairy | 1.25 € | 1.79 € | 1.82 € (1.39 € Partner) | Barbora |
| Saare Kreeka jogurt 380g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Tere Piim pure 1000ml | Dairy | — | 1.29 € | 1.09 € | Selver |
| Tere Või 200g | Dairy | 2.59 € | 2.19 € | 2.59 € | Rimi |
| Tere Või laktoosivaba lactose-free 200g | Dairy | — | 2.79 € | 3.29 € | Rimi |
| Valio Meiereivõi soolata või 500g | Dairy | 4.99 € | 5.89 € | 5.79 € | Barbora |
| Huggies Mähkmed 1 5000g | Diapers & baby wipes | 5.99 € | 6.79 € | 7.10 € (5.49 € Partner) | Barbora |
| Huggies Mähkmed 1 5000g | Diapers & baby wipes | 13.29 € | 20.49 € | 21.90 € | Barbora |
| Huggies Mähkmed 2 6000g | Diapers & baby wipes | 17.25 € | 17.29 € | — | Barbora |
| Huggies Mähkmed 3 10000g | Diapers & baby wipes | 15.99 € | 24.99 € | 25.81 € (20.99 € Partner) | Barbora |
| Huggies Mähkmed 4 16000g | Diapers & baby wipes | 15.99 € | 24.99 € | 25.81 € (20.99 € Partner) | Barbora |
| Huggies Mähkmed 5 25000g | Diapers & baby wipes | 15.99 € | 24.99 € | 25.81 € (20.99 € Partner) | Barbora |
| Huggies Mähkmed 6000g | Diapers & baby wipes | 13.29 € | 20.49 € | 21.90 € | Barbora |
| Huggies Niisk | Diapers & baby wipes | 2.43 € | 2.45 € | 2.43 € (1.69 € Partner) | Barbora + Selver |
| Huggies Püksmähkm 3 11000g | Diapers & baby wipes | 25.99 € | 25.99 € | 26.90 € | Barbora + Rimi |
| Huggies Püksmähkm 4 14000g | Diapers & baby wipes | 25.99 € | 25.99 € | 26.90 € | Barbora + Rimi |
| Huggies Püksmähkm 4 14000g | Diapers & baby wipes | 14.15 € | — | 15.49 € | Barbora |
| Huggies Püksmähkm 5 17000g | Diapers & baby wipes | 14.15 € | — | 15.49 € | Barbora |
| Huggies Püksmähkm 6 25000g | Diapers & baby wipes | 25.99 € | 25.99 € | 26.90 € | Barbora + Rimi |
| Huggies Püksmähkm 6 25000g | Diapers & baby wipes | 14.15 € | — | 15.49 € | Barbora |
| Muumi baby Püksmähkmed 5 15000g | Diapers & baby wipes | — | 16.99 € | 17.99 € | Rimi |
| Neutral Niisked | Diapers & baby wipes | 4.59 € | 3.39 € | 4.59 € | Rimi |
| Pampers Mähkmed | Diapers & baby wipes | 12.49 € | 11.99 € | 13.99 € | Rimi |
| Pampers Mähkmed 0 3000g | Diapers & baby wipes | 6.79 € | — | 7.10 € (5.79 € Partner) | Barbora |
| Pampers Mähkmed 10000g | Diapers & baby wipes | 13.19 € | 24.49 € | 16.79 € | Barbora |
| Pampers Mähkmed 14000g | Diapers & baby wipes | 13.19 € | 24.49 € | 16.79 € | Barbora |
| Pampers Mähkmed 5 16000g | Diapers & baby wipes | 14.99 € | — | 16.79 € | Barbora |
| Pampers Mähkmed 5000g | Diapers & baby wipes | 6.60 € | 6.79 € | 6.60 € (4.99 € Partner) | Barbora + Selver |
| Pampers Mähkmed 6000g | Diapers & baby wipes | 6.09 € | 6.79 € | 6.09 € (4.99 € Partner) | Barbora + Selver |
| Pampers Mähkmed 8000g | Diapers & baby wipes | 11.99 € | 11.99 € | 13.99 € | Barbora + Rimi |
| Pampers Niisk | Diapers & baby wipes | 10.66 € (6.29 € Aitäh) | 11.19 € | 7.96 € | Selver |
| Pampers Püksmähk | Diapers & baby wipes | 13.79 € | 24.49 € | 23.88 € | Barbora |
| Pampers Püksmähk 11000g | Diapers & baby wipes | 13.79 € | 24.49 € | 23.88 € | Barbora |
| Pampers Püksmähk 17000g | Diapers & baby wipes | 13.79 € | 24.49 € | 23.88 € | Barbora |
| Pampers Püksmähkmed | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Püksmähkmed | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Püksmähkmed | Diapers & baby wipes | 14.31 € | — | 23.88 € | Barbora |
| Pampers Püksmähkmed | Diapers & baby wipes | 14.69 € | 17.99 € | 24.49 € | Barbora |
| Pampers Püksmähkmed | Diapers & baby wipes | 14.69 € | 17.99 € | 24.49 € | Barbora |
| Pampers Püksmähkmed 11000g | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Püksmähkmed 15000g | Diapers & baby wipes | 24.33 € | — | 40.55 € | Barbora |
| Pampers Püksmähkmed 15000g | Diapers & baby wipes | 12.77 € | — | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Püksmähkmed 15000g | Diapers & baby wipes | 22.99 € | 22.99 € | 23.90 € | Barbora + Rimi |
| Pampers Püksmähkmed 18000g | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Püksmähkmed 19000g | Diapers & baby wipes | 12.77 € | 24.49 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Püksmähkmed 44 | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Püksmähkmed 50 19000g | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Püksmähkmed 58 17000g | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Püksmähkmed 84 | Diapers & baby wipes | 24.33 € | — | 40.55 € | Barbora |
| Pampers Püksmähkmed 96 17000g | Diapers & baby wipes | 24.33 € | — | 40.55 € | Barbora |
| A. le coq Kali klassikaline 2000ml | Drinks | 2.09 € | — | 2.08 € | Selver |
| A. le coq Kali klassikaline 500ml | Drinks | 0.99 € | — | 0.97 € | Selver |
| A. le coq Kali rukkilinnase 500ml | Drinks | 1.05 € | — | 0.99 € | Selver |
| A. le coq Karastusjook barbariss 1500ml | Drinks | 1.55 € | — | 1.58 € (1.09 € Partner) | Barbora |
| Aura Ananassinektar 1000ml | Drinks | 2.75 € | 2.85 € | 2.19 € | Selver |
| Aura Apelsinimahl 1000ml | Drinks | 2.39 € | 2.39 € | 1.89 € | Selver |
| Aura Gaseerimata gaasita mg vesi 500ml | Drinks | 1.29 € (0.99 € Aitäh) | 1.39 € | — | Barbora |
| Aura Köögiviljamahl 1000ml | Drinks | — | 1.95 € | 1.85 € | Selver |
| Aura Multinektar 1000ml | Drinks | 1.89 € | 1.89 € | 1.89 € | Barbora + Rimi + Selver |
| Aura Nektar aprikoosi mango 1000ml | Drinks | — | 1.89 € | 1.89 € | Rimi + Selver |
| Aura Õunamahl 1000ml | Drinks | 1.99 € | — | 1.98 € | Selver |
| Aura Pirninektar 1000ml | Drinks | — | 2.05 € | 1.89 € | Selver |
| Aura Ploominektar 1000ml | Drinks | 1.75 € | 1.79 € | 1.45 € | Selver |
| Aura Punase greibi nektar 1000ml | Drinks | 1.89 € | — | 1.89 € | Barbora + Selver |
| Aura Spring vesi gaasita 500ml | Drinks | 0.56 € | — | 0.56 € | Barbora + Selver |
| Aura Tomatimahl 1000ml | Drinks | 1.79 € | 1.79 € | 1.76 € | Selver |
| Aura Vesi gaasita spring 1500ml | Drinks | 0.78 € | — | 0.78 € | Barbora + Selver |
| Aura Viinamarjanektar 1000ml | Drinks | 1.79 € | — | 1.79 € | Barbora + Selver |
| Borjomi Looduslik karboniseeritud 1000ml | Drinks | 2.49 € | — | 2.49 € | Barbora + Selver |
| Cappy Apelsininektar 1000ml | Drinks | 2.95 € (1.69 € Aitäh) | — | 2.95 € | Barbora + Selver |
| Cappy Multivitamiininektar 1L | Drinks | 2.85 € (1.69 € Aitäh) | 1.99 € | 2.89 € | Rimi |
| Cappy Õunanektar 1000ml | Drinks | 2.55 € (1.69 € Aitäh) | — | 2.59 € | Barbora |
| Cido Köögiviljamahl 1000ml | Drinks | 1.85 € | — | 1.82 € | Selver |
| Coca-cola Karastusjook 2000ml | Drinks | 2.85 € | 2.85 € | 2.73 € (2.09 € Partner) | Selver |
| Coca-cola Karastusjook 200ml | Drinks | 0.79 € | — | 0.80 € | Barbora |
| Coca-cola Karastusjook 500ml | Drinks | 1.29 € | — | 1.27 € | Selver |
| Coca-Cola karastusjook 6x330ml | Drinks | 6.19 € | 6.19 € | 5.99 € | Selver |
| Coca-cola Karastusjook 850ml | Drinks | 1.69 € | — | 1.49 € | Selver |
| Coca-cola Karastusjook cherry 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | 1.21 € (0.89 € Partner) | Rimi |
| Coca-cola Karastusjook cherry 850ml | Drinks | 1.69 € | 1.29 € | — | Rimi |
| Coca-cola Karastusjook zero 2000ml | Drinks | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Coca-cola Karastusjook zero 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Coca-cola Karastusjook zero 6x330ml | Drinks | 6.19 € | 6.19 € | — | Barbora + Rimi |
| Coca-Cola Zero karastusjook 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | — | Rimi |
| Don simon Ananassinektar 330ml | Drinks | 1.39 € | 1.39 € | 1.49 € (1.29 € Partner) | Barbora + Rimi |
| Don simon Apelsinimahl 1000ml | Drinks | 4.06 € | 4.19 € | — | Barbora |
| Don simon Apelsinimahl viljalihaga 1000ml | Drinks | — | 3.99 € | 3.99 € | Rimi + Selver |
| Don simon Apelsinimahl viljalihaga 2000ml | Drinks | — | 4.99 € | 5.59 € | Rimi |
| Don simon Apelsininektar 330ml | Drinks | 1.39 € | 1.39 € | 1.49 € | Barbora + Rimi |
| Don simon Apelsininektar premium 1500ml | Drinks | 4.05 € | — | 4.09 € | Barbora |
| Don simon Mandariinimahl 1000ml | Drinks | 3.65 € | 3.79 € | — | Barbora |
| Don simon Mangonektar premium 1500ml | Drinks | 3.75 € (2.99 € Aitäh) | — | 3.99 € | Barbora |
| Don simon Tomatimahl premium 200ml | Drinks | — | 1.39 € | 1.21 € | Selver |
| Don simon Troopiliste mahl viljade 1000ml | Drinks | — | 3.65 € | 3.65 € | Rimi + Selver |
| Don simon Virsikunektar premium 1500ml | Drinks | 4.09 € (2.99 € Aitäh) | — | 3.99 € | Selver |
| Dr.pepper Karastusjook 330ml | Drinks | 1.19 € | — | 1.11 € | Selver |
| Evian Looduslik 1500ml | Drinks | 2.25 € | 2.25 € | — | Barbora + Rimi |
| Evian mineraalvesi 500ml | Drinks | 1.25 € | 1.25 € | — | Barbora + Rimi |
| Fanta Karastusjook 330ml | Drinks | 1.21 € (1.21 € Aitäh) | — | 1.21 € (0.89 € Partner) | Barbora + Selver |
| Fanta Karastusjook apelsini 1500ml | Drinks | 2.29 € | 2.29 € | 2.29 € | Barbora + Rimi + Selver |
| Fanta Karastusjook apelsini 2000ml | Drinks | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Fanta Karastusjook apelsini 500ml | Drinks | 1.29 € | 1.29 € | 1.27 € | Selver |
| Fanta Karastusjook orange 850ml | Drinks | 1.69 € | 1.29 € | — | Rimi |
| Fanta Karastusjook orange zero 1500ml | Drinks | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Fanta Karastusjook orange zero 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | — | Rimi |
| Fanta Karastusjook orange zero 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Fentimans Rose Lemonade 275ml | Drinks | 2.35 € | 2.35 € | 2.43 € | Barbora + Rimi |
| Fever tree Toonik indian tonic water 500ml | Drinks | — | 3.49 € | 2.59 € | Selver |
| Heinz Tomatimahl 290ml | Drinks | — | 1.49 € | 1.49 € | Rimi + Selver |
| Limpa Vahujook karastusjook mullike 750ml | Drinks | 3.39 € | 3.59 € | — | Barbora |
| Pepsi Karastusjook cola 1500ml | Drinks | 1.99 € (1.29 € Aitäh) | 1.29 € | 2.02 € | Rimi |
| Pepsi Karastusjook cola 500ml | Drinks | 1.09 € | 1.09 € | 1.07 € | Selver |
| Põhjala Kali 440ml | Drinks | 1.89 € (1.49 € Aitäh) | — | 1.99 € (1.49 € Partner) | Barbora |
| Põltsamaa Apelsinimahl 1000ml | Drinks | 2.99 € | — | 2.49 € | Selver |
| Põltsamaa Õunamahl 1000ml | Drinks | 1.99 € | — | 1.79 € | Selver |
| Põltsamaa Ploominektar 1000ml | Drinks | 1.75 € | — | 1.79 € | Barbora |
| Põltsamaa Tomatimahl 1000ml | Drinks | 1.85 € | — | 1.85 € | Barbora + Selver |
| Põltsamaa Tomatimahl 2000ml | Drinks | 3.29 € | — | 3.30 € | Barbora |
| Pure Ananassimahl 1000ml | Drinks | 4.55 € (3.49 € Aitäh) | 3.99 € | 4.59 € | Rimi |
| Pure Apelsinimahl 1000ml | Drinks | 4.99 € (2.99 € Aitäh) | 3.69 € | 3.29 € | Selver |
| Pure Greibimahl 1000ml | Drinks | 4.99 € (3.49 € Aitäh) | 3.99 € | — | Rimi |
| Pure Õunamahl 1000ml | Drinks | 3.65 € | 3.29 € | 3.69 € | Rimi |
| Pure Tomatimahl 1000ml | Drinks | 4.69 € | 3.79 € | — | Rimi |
| Rc cola Karastusjook 2000ml | Drinks | 2.09 € | — | 2.08 € | Selver |
| Rynkeby Mahl kuivatatud ploomi 1000ml | Drinks | 4.25 € | — | 4.26 € | Barbora |
| Saaremaa Joogivesi 1500ml | Drinks | — | 0.85 € | 0.70 € | Selver |
| Saaremaa Joogivesi 5000ml | Drinks | — | 1.19 € | 1.19 € | Rimi + Selver |
| Saaremaa Joogivesi 500ml | Drinks | — | 0.54 € | 0.53 € | Selver |
| Schweppes Toonik bitter lemon 1000ml | Drinks | 1.39 € | — | 1.92 € | Barbora |
| Schweppes Toonik mixer pink 1000ml | Drinks | 1.95 € | — | 1.49 € | Selver |
| Schweppes Toonik mixer pink 1500ml | Drinks | 2.75 € | — | 2.73 € (1.79 € Partner) | Selver |
| Schweppes Toonik tangerine 1000ml | Drinks | 1.95 € | — | 1.92 € | Selver |
| Sprite Karastusjook 1500ml | Drinks | 2.29 € | — | 2.29 € | Barbora + Selver |
| Sprite Karastusjook 500ml | Drinks | 1.29 € | — | 1.27 € | Selver |
| Sprite Karastusjook 850ml | Drinks | 1.69 € | 1.29 € | 1.69 € | Rimi |
| Sprite Karastusjook chill zero 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 1.19 € | — | Rimi |
| Sprite Karastusjook chill zero 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Super Manki karastusjook 330ml | Drinks | 1.05 € | 0.99 € | — | Rimi |
| Värska originaal Mineraalvesi 1000ml | Drinks | 1.45 € | — | 1.45 € | Barbora + Selver |
| Värska originaal Mineraalvesi 1500ml | Drinks | 1.69 € | — | 1.68 € (1.29 € Partner) | Selver |
| Värska originaal Mineraalvesi 500ml | Drinks | 0.99 € | — | 0.97 € | Selver |
| Värska Originaal mineraalvesi 500ml | Drinks | 0.98 € | 1.09 € | — | Barbora |
| Värska originaal Värska gaasita naturaal 1500ml | Drinks | 0.99 € | — | 0.99 € | Barbora + Selver |
| Vytautas Mineraalvesi 1500ml | Drinks | 1.29 € (0.79 € Aitäh) | — | 1.21 € (0.99 € Partner) | Selver |
| Aviko Kartulipallid 600g | Dumplings, pizza & fries | — | 2.75 € | 2.43 € | Selver |
| Dr.oetker pitsa prosciutto ristorante 340g | Dumplings, pizza & fries | 4.05 € | — | 4.06 € | Barbora |
| Dr.oetker pitsa ristorante speciale 345g | Dumplings, pizza & fries | 3.99 € | — | 4.06 € | Barbora |
| Isukas pelmeenid 700g | Dumplings, pizza & fries | 2.15 € | — | 2.69 € | Barbora |
| Maahärra friikartul sakiline 750g | Dumplings, pizza & fries | 2.99 € | — | 3.04 € | Barbora |
| Maks & moorits Kodupelmeenid 700g | Dumplings, pizza & fries | 3.11 € | 3.89 € | — | Barbora |
| Pealinna laste pelmeenid 350g | Dumplings, pizza & fries | 1.83 € | — | 2.29 € | Barbora |
| Pealinna Pelmeenid premia 350g | Dumplings, pizza & fries | — | 2.29 € | 2.29 € | Rimi + Selver |
| Rakvere broilerilihaga pelmeenid 400g | Dumplings, pizza & fries | 2.15 € | 2.69 € | 2.73 € (2.29 € Partner) | Barbora |
| Rakvere Minipelmeenid sealihaga 350g | Dumplings, pizza & fries | — | 2.49 € | 2.35 € (1.99 € Partner) | Selver |
| Rakvere pelmeenid 900g | Dumplings, pizza & fries | 5.39 € (3.99 € Aitäh) | 4.59 € | 5.39 € | Rimi |
| Rakvere Pelmeenid pere 600g | Dumplings, pizza & fries | — | 2.39 € | 2.99 € | Rimi |
| Rakvere pelmeenid praesibulaga 400g | Dumplings, pizza & fries | 1.72 € | — | 2.15 € | Barbora |
| Rannarootsi ehe mini pelmeenid 350g | Dumplings, pizza & fries | 2.23 € | — | 2.84 € | Barbora |
| Rannarootsi hinkaalid 420g | Dumplings, pizza & fries | 2.63 € | 3.29 € | — | Barbora |
| Rannarootsi mini pelmeenid 700g | Dumplings, pizza & fries | — | 3.99 € | 3.89 € | Selver |
| Tallegg Minipelmeenid broilerilihaga 350g | Dumplings, pizza & fries | — | 2.69 € | 2.59 € | Selver |
| Uvic hiina pelmeenid 1000g | Dumplings, pizza & fries | 6.36 € | — | 7.98 € | Barbora |
| Uvic hiina pelmeenid 400g | Dumplings, pizza & fries | 2.63 € | 3.29 € | 3.34 € (2.79 € Partner) | Barbora |
| Vici gyoza pelmeenid seentega 400g | Dumplings, pizza & fries | 2.63 € | — | 3.65 € (2.99 € Partner) | Barbora |
| Vici hinkaalid 400g | Dumplings, pizza & fries | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Abba Lõhepasteet 145g | Fish & seafood | — | 2.65 € | 2.69 € | Rimi |
| Abba Tuunikalapasteet 145g | Fish & seafood | — | 2.65 € | 2.69 € | Rimi |
| Briis Anšoovis filee klassikaline 145g | Fish & seafood | 2.05 € | — | 2.05 € | Barbora + Selver |
| Briis Praetud räimed tomatikastmes 270g | Fish & seafood | 1.59 € | 2.15 € | 2.05 € | Barbora |
| Briis Vürtsikilu fileed õlis 160g | Fish & seafood | — | 2.75 € | 2.75 € | Rimi + Selver |
| Briis Vürtsikilud balti 400g | Fish & seafood | 1.95 € | 1.95 € | 1.95 € | Barbora + Rimi + Selver |
| Briis Vürtsikilufilee 160g | Fish & seafood | 2.59 € | 2.59 € | — | Barbora + Rimi |
| Kaija Skumbria mahlas omas 240g | Fish & seafood | 3.05 € | — | 2.89 € | Selver |
| Kaija Skumbria õlis 240g | Fish & seafood | 3.09 € | 3.09 € | — | Barbora + Rimi |
| Kaija Skumbria tomatikastmes 240g | Fish & seafood | 3.05 € | — | 2.99 € | Selver |
| Kaija Sprotid õlis 190g | Fish & seafood | 3.45 € | 3.49 € | — | Barbora |
| Kaija Tuunikala õlis 160g | Fish & seafood | 4.49 € | 3.59 € | — | Rimi |
| Kaluri Praetud koduses räimed 500g | Fish & seafood | 3.79 € | — | 3.69 € (3.29 € Partner) | Selver |
| Kaluri Praetud räimed tomatikastmes 500g | Fish & seafood | 3.89 € | — | 3.89 € (3.29 € Partner) | Barbora + Selver |
| Kaluri Tallinna kilud 250g | Fish & seafood | 3.09 € | — | 3.09 € | Barbora + Selver |
| Kaluri Vinnutatud särg 200g | Fish & seafood | 5.69 € | 5.69 € | 5.09 € | Selver |
| Kapten grant Heeringafilee vähesoolane 240g | Fish & seafood | 2.49 € | — | 1.99 € | Selver |
| Kapten grant Lõhe mahlas omas 230g | Fish & seafood | 2.65 € | — | 2.65 € | Barbora + Selver |
| Kapten grant Lõhetükid tomatikastmes 230g | Fish & seafood | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Kapten grant Merekapsasalat 500g | Fish & seafood | — | 2.99 € | 2.85 € | Selver |
| Kapten grant Skumbria tomatikastmes 240g | Fish & seafood | 2.45 € | — | 2.45 € | Barbora + Selver |
| Kapten grant Sprotid õlis 240g | Fish & seafood | 2.79 € | 2.79 € | 2.79 € | Barbora + Rimi + Selver |
| Kapten grant Tallinna kilud 240g | Fish & seafood | 2.69 € | — | 2.69 € | Barbora + Selver |
| Kapten grant Vürtsikilufilee 100g | Fish & seafood | 2.99 € | — | 3.05 € | Barbora |
| M.v.wool Heik 250g | Fish & seafood | 4.49 € | — | 4.49 € | Barbora + Selver |
| Marwi Vannamei krevetid küüslaugu tšilli 100g | Fish & seafood | — | 3.99 € | 3.99 € | Rimi + Selver |
| Minu Räimed praetud tomatikastmes 240g | Fish & seafood | — | 2.55 € | 2.59 € | Rimi |
| Msdm Kuivatatud meritint 36g | Fish & seafood | 2.15 € | 2.15 € | — | Barbora + Rimi |
| Vici choice pulgad smart surimi 250g | Fish & seafood | 2.49 € | — | 2.49 € (1.69 € Partner) | Barbora + Selver |
| Vici Heeringafilee 240g | Fish & seafood | 3.39 € | — | 3.39 € | Barbora + Selver |
| Vici Heeringafilee kergsoola 220g | Fish & seafood | 1.99 € | — | 2.85 € | Barbora |
| Vici Heeringafilee rasvane 240g | Fish & seafood | 3.09 € | — | 3.09 € | Barbora + Selver |
| Vici Heeringafilee traditsiooniline 240g | Fish & seafood | 3.19 € | — | 3.19 € | Barbora + Selver |
| Vici Heeringafilee traditsiooniline 400g | Fish & seafood | 4.99 € | — | 4.99 € | Barbora + Selver |
| Vici krabinuudel surimi 200g | Fish & seafood | 3.15 € | — | 2.09 € | Selver |
| Vici Kuumsuitsu nahaga skumbriafilee 175g | Fish & seafood | 4.89 € | — | 5.89 € | Barbora |
| Vici liha lumekrabi surimi 120g | Fish & seafood | 2.19 € | — | 1.49 € | Selver |
| Vici Maksikrevetid soolvees surimi 320g | Fish & seafood | 3.99 € | — | 3.99 € | Barbora + Selver |
| Vici pulgad surimi 150g | Fish & seafood | 2.19 € | — | 2.09 € | Selver |
| Vici pulgad surimi 300g | Fish & seafood | 3.99 € | — | 4.09 € | Barbora |
| Vici Tursamaks 121g | Fish & seafood | 3.29 € | — | 3.29 € | Barbora + Selver |
| Viru rand Heeringasalat murulauguga 360g | Fish & seafood | 4.99 € | — | 6.29 € | Barbora |
| Viru rand Praetud koduses räimed 500g | Fish & seafood | 4.29 € (2.99 € Aitäh) | 4.99 € | 4.99 € | Barbora |
| Viru rand Praetud räimed tomatikastmes 500g | Fish & seafood | 4.29 € (2.99 € Aitäh) | — | 4.69 € | Barbora |
| Viru rand Räimerullid küüslaugumarinaadis 400g | Fish & seafood | 4.99 € | — | 5.69 € | Barbora |
| Viru rand Vürtsikilufileed 100g | Fish & seafood | 2.49 € | — | 2.89 € | Barbora |
| Zigmas Vähesoolane heeringafilee õlis 240g | Fish & seafood | 2.39 € | 2.49 € | — | Barbora |
| Dan sukker Fariinsuhkur 500g | Flour & sugar | 1.95 € | — | 1.95 € | Barbora + Selver |
| Dan sukker Hele muscovado suhkur 400g | Flour & sugar | 2.43 € | — | 2.43 € | Barbora + Selver |
| Dan sukker Mini tükksuhkur 500g | Flour & sugar | 1.99 € | — | 1.95 € | Selver |
| Dan sukker Suhkur 1000g | Flour & sugar | — | 0.89 € | 1.11 € | Rimi |
| Dan sukker Suhkur demerara 500g | Flour & sugar | 2.19 € | — | 2.19 € | Barbora + Selver |
| Dan sukker Tuhksuhkur 500g | Flour & sugar | 1.47 € | — | 1.47 € | Barbora + Selver |
| Diamant Suhkur 1000g | Flour & sugar | 1.62 € | — | 0.69 € | Selver |
| Kalew Nisujahu t 1000g | Flour & sugar | — | 1.25 € | 0.99 € | Selver |
| Kalew Nisujahu t 2000g | Flour & sugar | — | 2.05 € | 2.33 € | Rimi |
| Kalew Ülepannikoogijahu 400g | Flour & sugar | — | 2.25 € | 2.15 € | Selver |
| Meira Vanillisuhkur 85g | Flour & sugar | 3.29 € | — | 3.14 € | Selver |
| Santa maria Vanillisuhkur 20g | Flour & sugar | 1.35 € | — | 1.35 € | Barbora + Selver |
| Tartu mill Kamajahu 400g | Flour & sugar | — | 1.75 € | 1.78 € | Rimi |
| Tartu mill Rukkikama 400g | Flour & sugar | — | 1.69 € | 1.78 € | Rimi |
| Tartu mill Rukkitäisterajahu 1500g | Flour & sugar | 1.79 € | 1.99 € | 1.79 € | Barbora + Selver |
| Tartu mill Täistera nisujahu 1000g | Flour & sugar | 1.49 € | — | 1.49 € | Barbora + Selver |
| Veski mati Eriti hea nisujahu 1000g | Flour & sugar | 1.45 € | 1.45 € | 1.47 € (1.19 € Partner) | Barbora + Rimi |
| Veski mati Eriti hea nisujahu 2000g | Flour & sugar | 2.65 € | 2.25 € | 2.25 € | Rimi + Selver |
| Veski mati Isekerkiv jahu 1000g | Flour & sugar | 1.79 € | — | 1.79 € | Barbora + Selver |
| Veski mati Maisijahu 1000g | Flour & sugar | 1.79 € | 1.89 € | 1.78 € | Selver |
| Veski mati Nisujahu t 2000g | Flour & sugar | 2.29 € | — | 2.29 € | Barbora + Selver |
| Veski mati Riisijahu 1000g | Flour & sugar | 2.23 € | 2.39 € | 2.23 € | Barbora + Selver |
| Veski mati Täistera kaerajahu 1000g | Flour & sugar | 2.75 € | 2.75 € | 2.75 € | Barbora + Rimi + Selver |
| Veski mati Täistera odrajahu 1000g | Flour & sugar | 1.55 € | — | 1.51 € | Selver |
| Veski mati Täisteraspeltajahu 1000g | Flour & sugar | 2.49 € | 2.69 € | — | Barbora |
| Bauer mustsõstar 300g | Frozen vegetables & berries | 2.75 € | — | 2.23 € | Selver |
| Härmavili ahjuköögiviljad 700g | Frozen vegetables & berries | 4.39 € | — | 3.19 € | Selver |
| Härmavili Köögiviljad šampinjonidega 400g | Frozen vegetables & berries | — | 2.29 € | 2.26 € (1.75 € Partner) | Selver |
| Härmavili maasikas rabarber 300g | Frozen vegetables & berries | 2.69 € | — | 2.69 € (1.89 € Partner) | Barbora + Selver |
| Härmavili mustikad vaarikad 300g | Frozen vegetables & berries | 5.89 € | — | 5.89 € | Barbora + Selver |
| Hortex julienne metsaseened 400g | Frozen vegetables & berries | 2.49 € | 3.65 € | 3.65 € | Barbora |
| Hortex marjasegu vaarikatega 300g | Frozen vegetables & berries | 2.79 € | — | 3.29 € | Barbora |
| Maahärra brokoli ja lillkapsas 400g | Frozen vegetables & berries | 1.79 € | — | 1.82 € (1.45 € Partner) | Barbora |
| Maahärra fit tervisepada 400g | Frozen vegetables & berries | 1.89 € | — | 1.89 € | Barbora + Selver |
| Maahärra kartuli sibulasegu 1000g | Frozen vegetables & berries | 2.89 € | — | 2.94 € | Barbora |
| Maahärra Köögiviljasegu fit 400g | Frozen vegetables & berries | — | 1.49 € | 1.49 € | Rimi + Selver |
| Maahärra marjasegu 300g | Frozen vegetables & berries | 2.59 € | — | 2.59 € | Barbora + Selver |
| Maahärra Pühapäevapada 400g | Frozen vegetables & berries | — | 1.75 € | 1.72 € | Selver |
| Maahärra seenesegu 400g | Frozen vegetables & berries | 2.99 € | 3.29 € | 3.04 € (2.59 € Partner) | Barbora |
| Ananass kg | Fruits & vegetables | 2.79 € | 2.79 € | 2.29 € | Selver |
| Avokaado kg | Fruits & vegetables | 5.99 € | 5.99 € | 6.99 € | Barbora + Rimi |
| Baklažaan kg | Fruits & vegetables | 2.19 € | 2.79 € | 3.19 € | Barbora |
| Banaan kg | Fruits & vegetables | 1.29 € | — | 1.29 € | Barbora + Selver |
| Bataat kg | Fruits & vegetables | 2.79 € | 2.79 € | 3.99 € | Barbora + Rimi |
| Dattel 200g | Fruits & vegetables | 0.99 € | — | 1.29 € | Barbora |
| Eesti and Šampinjonid 500g | Fruits & vegetables | — | 5.79 € | 5.59 € | Selver |
| Eesti and Sibulad 450g | Fruits & vegetables | — | 2.99 € | 2.99 € | Rimi + Selver |
| Eesti and Soolakurk 300g | Fruits & vegetables | 3.49 € | — | 3.49 € | Barbora + Selver |
| Eesti And Soolakurk küüslauguga 500g | Fruits & vegetables | 3.29 € | 3.29 € | — | Barbora + Rimi |
| Granaatõun kg | Fruits & vegetables | 3.49 € | 5.99 € | 5.99 € | Barbora |
| Hapukapsas viibergi 650g | Fruits & vegetables | — | 2.99 € | 3.99 € | Rimi |
| Hapukurk viibergi 400g | Fruits & vegetables | — | 2.99 € | 3.39 € | Rimi |
| Intsu Kirsstomat 250g | Fruits & vegetables | — | 3.49 € | 4.99 € | Rimi |
| Juurseller kg | Fruits & vegetables | 1.29 € | 1.39 € | — | Barbora |
| Kaalikas kg | Fruits & vegetables | 1.59 € | 1.89 € | — | Barbora |
| Kadarbiku Beebiporgand 250g | Fruits & vegetables | 1.79 € | 1.79 € | — | Barbora + Rimi |
| Kadarbiku Hapukapsas 900g | Fruits & vegetables | 2.45 € | 2.45 € | — | Barbora + Rimi |
| Kapsas brüsseli 500g | Fruits & vegetables | — | 2.79 € | 1.99 € | Selver |
| Kapsas punane kg | Fruits & vegetables | 1.09 € | 1.19 € | — | Barbora |
| Kartul punane kg | Fruits & vegetables | 0.99 € | 0.99 € | 0.99 € | Barbora + Rimi + Selver |
| Kartul talukartul kollane 2500g | Fruits & vegetables | — | 3.59 € | 3.99 € | Rimi |
| Kartul talukartul punane 2500g | Fruits & vegetables | 3.59 € | — | 3.59 € | Barbora + Selver |
| Kartul villeri 2000g | Fruits & vegetables | 2.95 € | 2.95 € | — | Barbora + Rimi |
| Kiivi kg | Fruits & vegetables | 4.99 € | 3.29 € | 4.99 € | Rimi |
| Kiivi kollane 500g | Fruits & vegetables | 4.99 € | — | 5.99 € | Barbora |
| Kõrvits hokkaido kg | Fruits & vegetables | 1.69 € | 1.59 € | — | Rimi |
| Kõrvits kg | Fruits & vegetables | 1.19 € | 0.79 € | 1.69 € | Rimi |
| Kurk luunja kg | Fruits & vegetables | 2.69 € | 4.29 € | — | Barbora |
| Küüslauk kg | Fruits & vegetables | 4.99 € | 4.99 € | 5.99 € | Barbora + Rimi |
| Laheotsa Kartul 2000g | Fruits & vegetables | 2.79 € | 2.79 € | — | Barbora + Rimi |
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
| Särtsakas peedisalat koriandriga 450g | Fruits & vegetables | 2.59 € | 2.59 € | — | Barbora + Rimi |
| Sibul kg | Fruits & vegetables | 0.37 € | 0.37 € | — | Barbora + Rimi |
| Sibul punane 400g | Fruits & vegetables | 2.55 € (1.89 € Aitäh) | 2.39 € | — | Rimi |
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
| Chef lunden Kanamaksapasteet 200g | Ham & cold cuts | 2.59 € | — | 2.59 € | Barbora + Selver |
| Chef lunden Kodune pasteet 200g | Ham & cold cuts | — | 2.65 € | 2.59 € | Selver |
| Frank pott Turistieine 325g | Ham & cold cuts | — | 2.29 € | 2.39 € | Rimi |
| Frank pott Vürtsisealiha 325g | Ham & cold cuts | 2.29 € | — | 2.39 € | Barbora |
| Karni Broileri rinnalihasink 300g | Ham & cold cuts | — | 3.69 € | 3.69 € | Rimi + Selver |
| Karni Kuningate sink 120g | Ham & cold cuts | — | 2.49 € | 2.49 € | Rimi + Selver |
| Linnamäe Metssealiha konserv 240g | Ham & cold cuts | 4.79 € | 4.79 € | — | Barbora + Rimi |
| Maks & moorits Kreemjas kodupasteet 210g | Ham & cold cuts | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Maks & moorits Pitsasink 250g | Ham & cold cuts | 2.09 € | 1.89 € | — | Rimi |
| Maks & moorits Pühajärve sink 300g | Ham & cold cuts | 2.54 € | 3.39 € | — | Barbora |
| Matsimoka Küüslaugupekk viil 110g | Ham & cold cuts | 1.85 € | 1.85 € | — | Barbora + Rimi |
| Matsimoka Pasteet 170g | Ham & cold cuts | 2.29 € | 2.29 € | 2.29 € (1.59 € Partner) | Barbora + Rimi + Selver |
| Matsimoka Suitsuliha viilutatud 110g | Ham & cold cuts | — | 2.39 € | 2.45 € | Rimi |
| Matsimoka Sült kallerdisega naturaalse 320g | Ham & cold cuts | — | 2.99 € | 4.26 € | Rimi |
| Minu Turistieine de lux sealihast 525g | Ham & cold cuts | 4.79 € | 4.79 € | — | Barbora + Rimi |
| Nõo Delikatess sült 300g | Ham & cold cuts | 2.45 € | 2.55 € | — | Barbora |
| Nõo Hommikupeekon 135g | Ham & cold cuts | — | 1.79 € | 2.65 € | Rimi |
| Nõo Kanasink fitlap 105g | Ham & cold cuts | — | 1.79 € | 2.23 € (1.49 € Partner) | Rimi |
| Nõo Kanasült fitlap 300g | Ham & cold cuts | 2.89 € | 2.89 € | — | Barbora + Rimi |
| Nõo Kodune maksapasteet 200g | Ham & cold cuts | 2.15 € | — | 2.15 € | Barbora + Selver |
| Nõo Maksapasteet delikatess 200g | Ham & cold cuts | 1.95 € | 1.95 € | 2.19 € | Barbora + Rimi |
| Nõo Pitsakate 300g | Ham & cold cuts | 3.29 € | 3.29 € | 3.29 € | Barbora + Rimi + Selver |
| Nõo Seakõrvasnäkid 130g | Ham & cold cuts | 2.39 € | 2.79 € | 3.10 € | Barbora |
| Nõo Suitsupõsk | Ham & cold cuts | 8.19 € | — | 9.14 € (5.99 € Partner) | Barbora |
| Nõo Suitsutatud seakeel 200g | Ham & cold cuts | 2.69 € | — | 2.79 € | Barbora |
| Nõo Suur memme sült 500g | Ham & cold cuts | 4.29 € | — | 4.29 € (2.99 € Partner) | Barbora + Selver |
| Oskar E maksapasteet vaba 200g | Ham & cold cuts | 1.89 € | 1.89 € | — | Barbora + Rimi |
| Oskar Sealihasült 330g | Ham & cold cuts | 3.05 € (2.15 € Aitäh) | 3.05 € | — | Barbora + Rimi |
| Rakvere Kreemjas maksapasteet 300g | Ham & cold cuts | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Rakvere Prosciutto peekon viilutatud 140g | Ham & cold cuts | — | 2.59 € | 2.59 € | Rimi + Selver |
| Rakvere Seavälisfilee suitsutatud 130g | Ham & cold cuts | — | 2.39 € | 11.99 € | Rimi |
| Rakvere Snäkk pro ribisnäkk 300g | Ham & cold cuts | 3.45 € | 3.45 € | 3.45 € | Barbora + Rimi + Selver |
| Rakvere Suitsusink 350g | Ham & cold cuts | 4.29 € | 3.85 € | — | Rimi |
| Rakvere Talurulaad 350g | Ham & cold cuts | 3.29 € | — | 3.34 € (2.59 € Partner) | Barbora |
| Rakvere Toorsuitsupeekon ameerikapärane 150g | Ham & cold cuts | — | 2.85 € | 2.99 € | Rimi |
| Rakvere Toorsuitsupeekon inglisepärane 150g | Ham & cold cuts | — | 2.89 € | 2.94 € | Rimi |
| Rakvere Toorsuitsupeekoni kuubikud 140g | Ham & cold cuts | 2.19 € | 2.09 € | 2.19 € | Rimi |
| Rakvere Võileivapeekon 130g | Ham & cold cuts | 2.59 € | — | 2.63 € | Barbora |
| Rannarootsi Hirveliha mahlas omas 240g | Ham & cold cuts | — | 3.59 € | 3.65 € | Rimi |
| Rannarootsi Kodune pasteet 180g | Ham & cold cuts | 1.39 € | — | 1.09 € | Selver |
| Rannarootsi Maksapasteet 240g | Ham & cold cuts | 1.85 € | — | 1.89 € | Barbora |
| Rannarootsi Sealiha mahlas omas 240g | Ham & cold cuts | 2.89 € | — | 2.99 € | Barbora |
| Rannarootsi Sealihasült 330g | Ham & cold cuts | 2.75 € | 2.59 € | 2.79 € | Rimi |
| Rannarootsi Seasink ehe välisfileest 120g | Ham & cold cuts | — | 1.89 € | 1.69 € | Selver |
| Rannarootsi Turistieine 240g | Ham & cold cuts | — | 2.89 € | 2.99 € | Rimi |
| Rannarootsi Veiseliha mahlas omas 240g | Ham & cold cuts | 2.89 € | 2.89 € | 2.99 € | Barbora + Rimi |
| Rannarootsi Veisesink ehe välisfileest 120g | Ham & cold cuts | — | 3.09 € | 3.15 € | Rimi |
| Tallegg Delikatessrulaad 500g | Ham & cold cuts | 6.79 € | 6.79 € | 2.84 € | Selver |
| Tallegg Kanafileesink fit 130g | Ham & cold cuts | — | 1.89 € | 1.89 € | Rimi + Selver |
| Tallegg kanarulaad klassikaline 400g | Ham & cold cuts | 3.99 € | 4.99 € | — | Barbora |
| Tallegg Kanasigar 200g | Ham & cold cuts | 2.99 € | 2.79 € | — | Rimi |
| Tallegg Kanasink tilliga 130g | Ham & cold cuts | — | 1.69 € | 1.72 € | Rimi |
| Tallegg Suitsukanakuubikud 300g | Ham & cold cuts | 4.35 € | — | 4.39 € | Barbora |
| Ajax Üldpuhastusvahend blossom peach 1000ml | Household | 3.69 € | 3.99 € | 2.59 € | Selver |
| Ambi pur Õhuvärskendaja mist ocean 185ml | Household | 6.59 € | — | 6.49 € | Selver |
| Ariel Pesugeel color pk 1125ml | Household | 13.59 € | 12.99 € | — | Rimi |
| Ariel Pesugeel color pk 1800ml | Household | 17.99 € | 17.99 € | — | Barbora + Rimi |
| Ariel Pesugeel gold orchid pk 1575ml | Household | 17.99 € | 19.99 € | — | Barbora |
| Ariel Pesugeel gold orchid pk 2250ml | Household | 24.89 € | 26.29 € | — | Barbora |
| Ariel Pesugeel mountain pk spring 1800ml | Household | 18.29 € | 17.99 € | — | Rimi |
| Ariel Pesugeel pk sensitive 1125ml | Household | 13.59 € | 12.99 € | — | Rimi |
| Domestos Wc lime p värskendaja 3x50g | Household | 3.59 € | 5.99 € | — | Barbora |
| Domestos Wc pine täide värskendaja 35g | Household | 0.95 € | — | 1.59 € | Barbora |
| Fairy Nõudepesuvahend apple 900ml | Household | 4.79 € | 3.79 € | — | Rimi |
| Fairy Nõudepesuvahend citrus 650ml | Household | — | 3.05 € | 3.59 € (2.59 € Partner) | Rimi |
| Fairy Nõudepesuvahend clean pure 900ml | Household | 4.79 € | — | 3.19 € | Selver |
| Fairy Nõudepesuvahend lemon 1350ml | Household | 6.69 € | 6.99 € | 6.69 € (4.69 € Partner) | Barbora + Selver |
| Fairy Nõudepesuvahend lemon 450ml | Household | 2.55 € (1.99 € Aitäh) | — | 2.89 € | Barbora |
| Fairy Nõudepesuvahend lemon 900ml | Household | 4.79 € | — | 4.79 € | Barbora + Selver |
| Fairy Nõudepesuvahend pomegranate 450ml | Household | 2.55 € | 2.55 € | — | Barbora + Rimi |
| Fairy Nõudepesuvahend pomegranate 900ml | Household | 4.79 € | 4.19 € | — | Rimi |
| Finish Nõudepesumasina loputusvahend 400ml | Household | — | 5.79 € | 5.79 € | Rimi + Selver |
| Finish Nõudepesumasina sool 1500g | Household | 3.57 € | 5.59 € | 5.79 € | Barbora |
| Finish Nõudepesumasina sool 4000g | Household | 5.51 € | 5.69 € | — | Barbora |
| Kh-7 Katlakivieemaldaja 750ml | Household | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Kh-7 Plekieemaldaja effect oxy 750ml | Household | 7.15 € | 7.15 € | — | Barbora + Rimi |
| Kh-7 Rasvaeemaldaja 750ml | Household | 6.29 € | 6.29 € | 4.49 € | Selver |
| Kh-7 Vannitoa puhastusvahend 500ml | Household | 6.29 € | 4.89 € | — | Rimi |
| Mayeri Katlakivieemaldaja 500ml | Household | — | 2.39 € | 1.79 € | Selver |
| Mayeri Nõudepesuvahend cranberry 500ml | Household | 1.01 € | — | 1.59 € | Barbora |
| Mayeri Nõudepesuvahend sensitive 500ml | Household | — | 1.45 € | 1.59 € (1.19 € Partner) | Rimi |
| Mayeri Nõudepesuvahend sensitive 900ml | Household | 1.53 € | 2.19 € | — | Barbora |
| Mayeri Pesugeel sensitive 1650ml | Household | 5.91 € | 8.49 € | — | Barbora |
| Mayeri Pesupulber color sensitive 1650g | Household | 5.70 € | 7.99 € | — | Barbora |
| Mayeri Pesupulber sensitive 1650g | Household | 5.67 € | 8.19 € | — | Barbora |
| Mayeri Üldpuhastuvahend sensitive 500ml | Household | 1.71 € | — | 2.69 € | Barbora |
| Mayeri Wc lavender puhastusvahend 750ml | Household | 2.09 € | 2.99 € | — | Barbora |
| Mayeri Wc lemon puhastusvahend 750ml | Household | 2.09 € | 2.99 € | — | Barbora |
| Mulieres Pesugeel roosiaed 1500ml | Household | 13.19 € | 13.19 € | — | Barbora + Rimi |
| Persil Pesugeel color lavender pk 1800ml | Household | 18.29 € | 20.90 € | — | Barbora |
| Persil Pesugeel color pk 1980ml | Household | 18.29 € | 20.90 € | — | Barbora |
| Persil Pesugeel color pk 990ml | Household | 10.19 € (7.25 € Aitäh) | 8.99 € | — | Rimi |
| Persil Pesugeel pk sensitive 1800ml | Household | 18.29 € | 20.90 € | — | Barbora |
| Persil Pesugeel pk sensitive 900ml | Household | 10.19 € (7.25 € Aitäh) | 8.39 € | — | Rimi |
| Persil Pesugeel pk universal 1980ml | Household | 18.29 € | 20.90 € | — | Barbora |
| Persil Pesugeel pk universal 990ml | Household | 10.15 € | 10.15 € | — | Barbora + Rimi |
| Persil Pesupulber color pk 1100g | Household | 10.19 € (6.99 € Aitäh) | 7.29 € | — | Rimi |
| Persil Pesupulber color pk 2200g | Household | 21.29 € | 21.29 € | — | Barbora + Rimi |
| Persil Pesupulber pk sensitive 990g | Household | 10.15 € | 7.29 € | — | Rimi |
| Perwoll Pesugeel black pk 1000ml | Household | 9.19 € (5.79 € Aitäh) | 6.19 € | — | Rimi |
| Perwoll Pesugeel black pk 2000ml | Household | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Perwoll Pesugeel black pk 3000ml | Household | 20.99 € | 12.39 € | — | Rimi |
| Perwoll Pesugeel bloom dark pk 2000ml | Household | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Perwoll Pesugeel blossom pk 1000ml | Household | 9.19 € | 6.19 € | — | Rimi |
| Perwoll Pesugeel blossom pk 2000ml | Household | 16.25 € | 15.99 € | — | Rimi |
| Perwoll Pesugeel blossom pk 3000ml | Household | 20.99 € | 12.39 € | — | Rimi |
| Perwoll Pesugeel color pk 1000ml | Household | 9.19 € (5.79 € Aitäh) | 6.19 € | — | Rimi |
| Perwoll Pesugeel color pk 2000ml | Household | 16.25 € | 15.99 € | — | Rimi |
| Perwoll Pesugeel color pk 3000ml | Household | 20.99 € | 12.39 € | — | Rimi |
| Perwoll Pesugeel pk sport 2000ml | Household | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Perwoll Pesugeel pk wool 2000ml | Household | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Somat Nõudepesumasina sool 1500g | Household | 5.07 € (2.99 € Aitäh) | 5.19 € | — | Barbora |
| Tri-bio Nõudepesuvahend 420ml | Household | 3.29 € | 3.29 € | — | Barbora + Rimi |
| Balbiino Jogurtijäätis jogurtiglasuuris mustika 54g | Ice cream | — | 1.25 € | 1.19 € | Selver |
| Balbiino Koorejäätis laktoosivaba lactose-free 480g | Ice cream | 5.69 € | — | 5.68 € | Selver |
| Eriti rammus Koorejäätis mustika 110g | Ice cream | 1.78 € | 1.19 € | — | Rimi |
| Eriti rammus Koorejäätis vanilli 100g | Ice cream | 1.78 € (1.19 € Aitäh) | 1.19 € | — | Rimi |
| La muu Kondenspiimajäätis 250g | Ice cream | — | 4.49 € | 4.49 € | Rimi + Selver |
| La muu mango passioni vegan 250g | Ice cream | — | 3.99 € | 4.49 € (3.79 € Partner) | Rimi |
| Magnum strawberry white 81g | Ice cream | 1.30 € | — | 1.88 € | Barbora |
| Nutella 230g | Ice cream | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Onu eskimo Koorejäätis šokolaadi 57g | Ice cream | 0.99 € | — | 1.05 € | Barbora |
| Premia Koorejäätis mango meloni 480g | Ice cream | 4.15 € | 4.15 € | 4.15 € (3.39 € Partner) | Barbora + Rimi + Selver |
| Premia Koorejäätis pistaatsia 240g | Ice cream | 4.19 € | — | 4.22 € | Barbora |
| Premia Koorejäätis stracciatella 480g | Ice cream | 4.79 € | 4.79 € | 4.79 € (3.79 € Partner) | Barbora + Rimi + Selver |
| Väike tom lehmakommi 60g | Ice cream | 0.79 € | 0.99 € | — | Barbora |
| Väike tom vanilli 60g | Ice cream | 0.95 € | 0.95 € | — | Barbora + Rimi |
| Vana toomas vanilliplombiir 90g | Ice cream | 1.49 € | 1.39 € | — | Rimi |
| Vanilla ninja Karamelli glasuuris koorejäätis 80g | Ice cream | — | 1.19 € | 1.19 € (0.79 € Partner) | Rimi + Selver |
| Bonne Mangopüree 500ml | Jam & honey & spreads | 3.45 € | — | 2.99 € | Selver |
| Bonne Ploomipüree 500ml | Jam & honey & spreads | 4.25 € | — | 4.26 € | Barbora |
| Bonne Virsikupüree 500ml | Jam & honey & spreads | 3.45 € | — | 3.45 € | Barbora + Selver |
| Küllus Kiivimoos 400g | Jam & honey & spreads | 4.69 € | 4.69 € | — | Barbora + Rimi |
| Küllus Kirsimoos 400g | Jam & honey & spreads | 4.19 € | 4.69 € | 4.29 € | Barbora |
| Küllus Maasikamoos 400g | Jam & honey & spreads | 4.19 € | 4.29 € | 3.69 € | Selver |
| Küllus Rabamurakamoos 400g | Jam & honey & spreads | 11.99 € | 12.39 € | 12.19 € | Barbora |
| Küllus Vaarikamoos 400g | Jam & honey & spreads | 4.69 € | 4.59 € | 3.89 € | Selver |
| Meie mari Maasikamoos 310g | Jam & honey & spreads | 3.75 € | — | 3.75 € | Barbora + Selver |
| Meie mari Murakamoos 310g | Jam & honey & spreads | 10.49 € | 10.49 € | 10.49 € | Barbora + Rimi + Selver |
| Meie mari Mustasõstramoos 310g | Jam & honey & spreads | 3.75 € | — | 3.75 € | Barbora + Selver |
| Meie mari Pannkoogimoos 310g | Jam & honey & spreads | 3.39 € | 2.99 € | 2.99 € (1.99 € Partner) | Rimi + Selver |
| Meie mari Pohlamoos 310g | Jam & honey & spreads | 3.75 € | 4.19 € | 3.75 € | Barbora + Selver |
| Meie mari Vaarikamoos 310g | Jam & honey & spreads | 3.75 € | — | 3.65 € | Selver |
| Meveda Mesi 500g | Jam & honey & spreads | 7.49 € | 7.49 € | — | Barbora + Rimi |
| Meveda Mesi kreemjas 500g | Jam & honey & spreads | 6.99 € | — | 6.99 € | Barbora + Selver |
| Muhe mesi Mesi 1100g | Jam & honey & spreads | 12.79 € | — | 12.39 € | Selver |
| Muhe mesi Mesi 450g | Jam & honey & spreads | 6.29 € | — | 6.29 € | Barbora + Selver |
| Põltsamaa Aprikoosimoos 380g | Jam & honey & spreads | 3.85 € | 3.85 € | 3.85 € (3.19 € Partner) | Barbora + Rimi + Selver |
| Põltsamaa Maasikamoos 380g | Jam & honey & spreads | 3.65 € | 3.65 € | 3.65 € | Barbora + Rimi + Selver |
| Põltsamaa Maasikamoos 600g | Jam & honey & spreads | 4.49 € (3.59 € Aitäh) | 4.49 € | 3.59 € | Selver |
| Põltsamaa Maasikamoos pudelis 390g | Jam & honey & spreads | 3.45 € | 3.69 € | 3.45 € | Barbora + Selver |
| Põltsamaa Metsamarjamoos 380g | Jam & honey & spreads | 3.65 € | 3.19 € | 3.65 € (2.99 € Partner) | Rimi |
| Põltsamaa Mustikamoos 380g | Jam & honey & spreads | 4.09 € | 4.09 € | 4.09 € | Barbora + Rimi + Selver |
| Põltsamaa Mustsõstramoos 380g | Jam & honey & spreads | 3.55 € | 2.99 € | 3.55 € | Rimi |
| Põltsamaa Pohlamoos 380g | Jam & honey & spreads | 3.69 € | 3.69 € | 3.69 € | Barbora + Rimi + Selver |
| Põltsamaa Pohlamoos pudelis 385g | Jam & honey & spreads | 3.55 € | 3.69 € | 3.55 € | Barbora + Selver |
| Põltsamaa Vaarikamoos 380g | Jam & honey & spreads | 4.05 € | 4.05 € | 4.05 € (3.49 € Partner) | Barbora + Rimi + Selver |
| Põltsamaa Vaarikamoos 600g | Jam & honey & spreads | 5.79 € (3.59 € Aitäh) | 5.79 € | 5.79 € | Barbora + Rimi + Selver |
| Põltsamaa Vaarikamoos pudelis 390g | Jam & honey & spreads | 4.45 € | 4.79 € | 4.46 € | Barbora |
| Salvest Ökoloogiline mangopüree 450g | Jam & honey & spreads | 3.99 € | 3.09 € | — | Rimi |
| Salvest Ökoloogiline pirnipüree 450g | Jam & honey & spreads | 3.65 € | 3.89 € | — | Barbora |
| Salvest Õunakaste 530g | Jam & honey & spreads | 2.89 € | — | 2.29 € | Selver |
| Sante Maapähklikreem crunchy 350g | Jam & honey & spreads | 3.09 € | — | 3.14 € | Barbora |
| Schwartau Karamelli dessertkaste 125ml | Jam & honey & spreads | 2.89 € | — | 2.92 € | Barbora |
| Schwartau Šokolaadi dessertkaste 125ml | Jam & honey & spreads | 2.75 € | — | 2.73 € | Selver |
| Semu Astelpajumoos 320g | Jam & honey & spreads | 3.95 € | — | 3.95 € | Barbora + Selver |
| Sireli Mesi 1000g | Jam & honey & spreads | 11.99 € | — | 11.99 € | Barbora + Selver |
| Sireli Mesi 250g | Jam & honey & spreads | 3.79 € | — | 3.79 € | Barbora + Selver |
| Farmi Hapendatud pett 1000g | Kefir & buttermilk | — | 1.29 € | 1.31 € (1.09 € Partner) | Rimi |
| Farmi Hapendatud täispiim 1000g | Kefir & buttermilk | — | 1.89 € | 1.92 € | Rimi |
| Farmi Keefir täispiimast 1000g | Kefir & buttermilk | 1.25 € | 1.25 € | — | Barbora + Rimi |
| Farmi Rjaženka 400g | Kefir & buttermilk | — | 0.89 € | 1.01 € | Rimi |
| Hellus Keefir laktoosivaba lactose-free 1000g | Kefir & buttermilk | — | 2.09 € | 2.12 € | Rimi |
| Armeenia grill Armeenia šašlõkk | Meat | 8.99 € | 11.99 € | 12.19 € | Barbora |
| Armeenia grill Br broileri kintsuliha šašlõkk | Meat | 11.99 € | 8.99 € | 12.19 € | Rimi |
| Armeenia grill Sea šašlõkk | Meat | 11.99 € | 12.49 € | 12.59 € | Barbora |
| Liivimaa lihaveis Rohumaaveise hakkliha 300g | Meat | 5.79 € | — | 5.79 € | Barbora + Selver |
| Matsimoka Delikatesshakkliha 300g | Meat | 2.95 € | 2.29 € | — | Rimi |
| Oskar Kebab lambalihaga 400g | Meat | 7.39 € | — | 7.39 € (4.99 € Partner) | Barbora + Selver |
| Rakvere Baby back searibi | Meat | — | 11.79 € | 10.49 € | Selver |
| Rakvere Grill liha mustika 500g | Meat | 6.89 € | — | 4.99 € | Selver |
| Rakvere Mustika grill ribi | Meat | 11.19 € | — | 7.49 € | Selver |
| Rakvere Sea sisefilee | Meat | — | 8.69 € | 11.99 € | Rimi |
| Rakvere Sea välisfilee | Meat | — | 9.99 € | 9.99 € | Rimi + Selver |
| Seakaelakarbonaad | Meat | 8.99 € | 9.99 € | — | Barbora |
| Tallegg Ahjubroiler klassikaline | Meat | 5.99 € | — | 4.99 € | Selver |
| Tallegg Br broileri klassikalises poolkoivad 800g | Meat | 3.75 € | — | 4.99 € (3.99 € Partner) | Barbora |
| Tallegg Broilerikintsuliha juustuga kolme 400g | Meat | 4.99 € | — | 5.39 € | Barbora |
| Tallegg Delikatess broilerihakklihasegu 300g | Meat | — | 3.69 € | 3.65 € | Selver |
| Tallegg Eestimaine broilerikoib | Meat | 3.59 € | — | 5.99 € | Barbora |
| Tallegg Külmutatud broilerikael 500g | Meat | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Arimex India pähklid 300g | Nuts, seeds & dried fruit | 7.39 € (4.39 € Aitäh) | 4.99 € | — | Rimi |
| Arimex Kuninglik segu 300g | Nuts, seeds & dried fruit | — | 6.29 € | 6.25 € | Selver |
| Arimex Pähklisegu premium 300g | Nuts, seeds & dried fruit | 8.09 € | — | 8.12 € | Barbora |
| Arimex Troopiliste puuviljade segu 200g | Nuts, seeds & dried fruit | 3.79 € | 3.79 € | — | Barbora + Rimi |
| Estrella Röstitud maapähklid soolaga 140g | Nuts, seeds & dried fruit | — | 2.39 € | 3.04 € (2.19 € Partner) | Rimi |
| Estrella Röstitud maapähklid soolaga 240g | Nuts, seeds & dried fruit | 1.79 € | 2.99 € | 3.04 € | Barbora |
| Estrella Röstitud maapähklid soolaga 500g | Nuts, seeds & dried fruit | — | 4.99 € | 4.59 € | Selver |
| Germund Linaseemned 200g | Nuts, seeds & dried fruit | 1.19 € | — | 1.21 € | Barbora |
| Germund Mandlilaastud 100g | Nuts, seeds & dried fruit | 2.79 € | — | 2.80 € | Barbora |
| Pähklinäpp Ananassikuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | — | Rimi |
| Pähklinäpp Chia seemned 200g | Nuts, seeds & dried fruit | 2.29 € | — | 2.33 € (1.79 € Partner) | Barbora |
| Pähklinäpp Karamellis mandel 200g | Nuts, seeds & dried fruit | 4.89 € | — | 4.89 € (3.85 € Partner) | Barbora + Selver |
| Pähklinäpp Kirsikuubikud 85g | Nuts, seeds & dried fruit | 2.09 € | 1.59 € | — | Rimi |
| Pähklinäpp Kreeka pähkel 200g | Nuts, seeds & dried fruit | 3.99 € | 3.99 € | 4.06 € (2.99 € Partner) | Barbora + Rimi |
| Pähklinäpp Maapähkel soolakaramellis 200g | Nuts, seeds & dried fruit | — | 2.25 € | 2.25 € | Rimi + Selver |
| Pähklinäpp Maasikakuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | 2.02 € (1.59 € Partner) | Rimi |
| Pähklinäpp Mandlite ja marjade segu 200g | Nuts, seeds & dried fruit | — | 3.29 € | 3.29 € (2.65 € Partner) | Rimi + Selver |
| Pähklinäpp Mango kuivatatud viilud 200g | Nuts, seeds & dried fruit | — | 4.99 € | 4.06 € | Selver |
| Pähklinäpp Mooniseemned 200g | Nuts, seeds & dried fruit | 1.99 € | — | 1.99 € | Barbora + Selver |
| Pähklinäpp Mustikakuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | — | Rimi |
| Pähklinäpp Pähklite ja puuviljade segu 200g | Nuts, seeds & dried fruit | — | 3.69 € | 3.29 € | Selver |
| Pähklinäpp Passionikuubikud 85g | Nuts, seeds & dried fruit | 1.99 € | 1.59 € | 2.02 € (1.59 € Partner) | Rimi |
| Pähklinäpp Pistaatsiapähkel meresoolaga 200g | Nuts, seeds & dried fruit | — | 4.49 € | 4.49 € | Rimi + Selver |
| Pähklinäpp Röstitud india pähkel 200g | Nuts, seeds & dried fruit | — | 3.49 € | 3.29 € | Selver |
| Pähklinäpp Seemnete segu 200g | Nuts, seeds & dried fruit | 2.19 € | — | 2.23 € | Barbora |
| Pähklinäpp Vaarikakuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | 2.02 € (1.59 € Partner) | Rimi |
| Premium Seedermänni seemned 150g | Nuts, seeds & dried fruit | 7.59 € | — | 7.55 € | Selver |
| Seeberger Kuivatatud kivideta ploomid 200g | Nuts, seeds & dried fruit | — | 5.29 € | 5.23 € | Selver |
| Seeberger Kuivatatud mango 100g | Nuts, seeds & dried fruit | 5.49 € | — | 5.49 € | Barbora + Selver |
| Seeberger Viigimarjad kuivatatud 200g | Nuts, seeds & dried fruit | — | 6.29 € | 5.99 € (4.49 € Partner) | Selver |
| Barilla fettuccine 500g | Pasta | 2.32 € | 2.99 € | — | Barbora |
| Barilla fusilli 500g | Pasta | — | 2.35 € | 2.45 € | Rimi |
| Barilla nr spagetid 500g | Pasta | — | 2.35 € | 1.45 € | Selver |
| Barilla penne rigate 500g | Pasta | 1.64 € | 2.35 € | — | Barbora |
| Delverde fusilli 500g | Pasta | 2.02 € | — | 2.89 € | Barbora |
| Panzani chifferini 500g | Pasta | 1.49 € | 2.19 € | 1.99 € | Barbora |
| Panzani conchiglie rigate 500g | Pasta | — | 2.19 € | 1.99 € | Selver |
| Panzani farfalle 500g | Pasta | 1.49 € | 2.19 € | 1.99 € | Barbora |
| Panzani fusilli 1000g | Pasta | — | 4.29 € | 3.39 € | Selver |
| Panzani fusilli 500g | Pasta | 1.99 € (1.59 € Aitäh) | 2.19 € | — | Barbora |
| Panzani Laastmakaron fines nouilles 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani Lintspagett linguine 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani macaroni 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani mini penne 500g | Pasta | 1.82 € | — | 2.43 € | Barbora |
| Panzani munaga tagliatelle 400g | Pasta | 2.47 € | 3.29 € | — | Barbora |
| Panzani penne rigate 1000g | Pasta | — | 4.29 € | 3.39 € | Selver |
| Panzani penne rigate 500g | Pasta | 1.49 € | 2.19 € | 1.99 € | Barbora |
| Panzani spagetid 1000g | Pasta | — | 4.29 € | 3.39 € | Selver |
| Presto chiffari lisci nr 400g | Pasta | — | 0.69 € | 0.79 € | Rimi |
| Presto cornetti 400g | Pasta | 0.44 € | 0.69 € | 0.79 € | Barbora |
| Presto fusilli 400g | Pasta | 0.44 € | 0.69 € | 0.79 € | Barbora |
| Presto penne 400g | Pasta | — | 0.69 € | 0.79 € | Rimi |
| Reggia elbows 500g | Pasta | — | 1.29 € | 1.87 € | Rimi |
| Reggia fusilli 500g | Pasta | — | 1.29 € | 1.87 € (1.29 € Partner) | Rimi |
| Reggia spagetid 500g | Pasta | — | 1.29 € | 1.87 € | Rimi |
| Tartu mill chiffari lisci 500g | Pasta | 1.01 € | 1.39 € | 1.39 € | Barbora |
| Tartu mill cornetti 500g | Pasta | 1.01 € | 1.35 € | 1.39 € (1.09 € Partner) | Barbora |
| Tartu mill ditali lisci 500g | Pasta | 1.03 € | 1.39 € | 1.39 € (1.09 € Partner) | Barbora |
| Tartu mill farfalle 500g | Pasta | 1.04 € | 1.39 € | — | Barbora |
| Tartu mill filini piccoli 500g | Pasta | 1.03 € | — | 1.39 € (1.09 € Partner) | Barbora |
| Tartu mill fusilli 500g | Pasta | 1.01 € | 1.19 € | 1.15 € | Barbora |
| Tartu mill fusilli tricolore 500g | Pasta | 1.39 € | 1.85 € | — | Barbora |
| Tartu mill lasagne mini 400g | Pasta | 1.01 € | — | 1.39 € (1.15 € Partner) | Barbora |
| Tartu mill linquine 500g | Pasta | 1.03 € | — | 1.39 € | Barbora |
| Tartu mill lisci maccheroni 500g | Pasta | 1.03 € | 1.39 € | 1.39 € | Barbora |
| Tartu mill penne 500g | Pasta | 1.01 € | 1.35 € | 1.39 € | Barbora |
| Tartu mill puntine 500g | Pasta | 1.03 € | 1.39 € | — | Barbora |
| Tartu mill Täistera fusilli 500g | Pasta | 1.10 € | — | 1.47 € (1.19 € Partner) | Barbora |
| Aussie Palsam repair revive sos 200ml | Personal care | 10.69 € | 10.69 € | — | Barbora + Rimi |
| Aussie Šampoon repair revive sos 300ml | Personal care | 10.69 € | 10.69 € | — | Barbora + Rimi |
| Batiste Kuivšampoon original 200ml | Personal care | 6.79 € | 4.75 € | 6.80 € | Rimi |
| Batiste Kuivšampoon sensitive 200ml | Personal care | — | 4.75 € | 7.10 € | Rimi |
| Batiste Kuivšampoon tropical 200ml | Personal care | 6.79 € | 6.79 € | — | Barbora + Rimi |
| Batiste Kuivšampoon volume xxl 200ml | Personal care | 7.29 € | — | 7.31 € | Barbora |
| Colgate Hambapasta action triple 125ml | Personal care | 3.19 € (2.29 € Aitäh) | — | 3.69 € | Barbora |
| Colgate Hambapasta action triple 75ml | Personal care | 2.49 € | 2.15 € | 2.69 € | Rimi |
| Colgate Hambapasta advanced white 125ml | Personal care | 4.29 € | 2.55 € | — | Rimi |
| Colgate Hambapasta advanced white 75ml | Personal care | 3.19 € | 2.29 € | 3.79 € | Rimi |
| Colgate Hambapasta crystals max white 75ml | Personal care | — | 2.39 € | 2.99 € | Rimi |
| Colgate Hambapasta max one white 75ml | Personal care | 7.49 € | — | 7.29 € (4.29 € Partner) | Selver |
| Colgate Hambapasta max white 125ml | Personal care | 4.69 € | — | 4.99 € | Barbora |
| Colgate Hambapasta multi protect 50ml | Personal care | 9.19 € (5.05 € Aitäh) | 4.99 € | — | Rimi |
| Colgate Hambapasta original total 75ml | Personal care | 4.19 € | — | 4.69 € | Barbora |
| Colgate Hambapasta total whitening 75ml | Personal care | 4.19 € | — | 4.69 € | Barbora |
| Colgate Suuvesi total 500ml | Personal care | — | 8.29 € | 8.29 € | Rimi + Selver |
| Corega Proteesiliim care gum 40g | Personal care | 7.79 € | 7.79 € | 7.99 € | Barbora + Rimi |
| Corega Proteesiliim tugev 40g | Personal care | — | 8.89 € | 8.59 € | Selver |
| Dove Deodorant aloe pearl vera 150ml | Personal care | 4.55 € | 5.19 € | — | Barbora |
| Dove Deodorant care invisible 150ml | Personal care | 4.55 € | — | 5.99 € | Barbora |
| Dove Dušigeel care fresh 450ml | Personal care | 5.01 € | 7.59 € | — | Barbora |
| Dove Dušigeel care nourishing 400ml | Personal care | 5.24 € | 8.49 € | — | Barbora |
| Dove Dušigeel creamy indulge 450ml | Personal care | 6.99 € (4.49 € Aitäh) | 7.59 € | — | Barbora |
| Dove Dušigeel creamy indulge 720ml | Personal care | 6.99 € | 10.99 € | — | Barbora |
| Dove Dušigeel deeply nourishing 400ml | Personal care | 7.99 € | — | 8.99 € (6.09 € Partner) | Barbora |
| Dove Dušigeel gentle pamper 450ml | Personal care | 5.01 € | 7.59 € | — | Barbora |
| Dove Dušigeel hydrate 450ml | Personal care | 5.01 € | 7.59 € | — | Barbora |
| Dove Dušigeel rebalancing 400ml | Personal care | 7.49 € (4.99 € Aitäh) | 5.79 € | — | Rimi |
| Dove Tükiseep replenishing 90g | Personal care | 1.79 € (1.09 € Aitäh) | — | 1.79 € | Barbora + Selver |
| Dove Vedelseep fresh täide 500ml | Personal care | 3.99 € (2.49 € Aitäh) | 4.19 € | — | Barbora |
| Elmex Hambapasta caries protection 75ml | Personal care | 5.99 € (4.39 € Aitäh) | 5.99 € | 5.99 € | Barbora + Rimi + Selver |
| Elmex Hambapasta junior 75ml | Personal care | — | 5.99 € | 6.69 € | Rimi |
| Elmex Hambapasta plus sensitive 75ml | Personal care | 8.79 € | 8.79 € | — | Barbora + Rimi |
| Elmex Hambapasta professional sensitive 75ml | Personal care | — | 8.79 € | 8.99 € | Rimi |
| Elmex Hambapasta sensitive 75ml | Personal care | 6.19 € | 5.99 € | 6.89 € (4.59 € Partner) | Rimi |
| Elmex Hambapasta sensitive whitening 75ml | Personal care | — | 5.99 € | 6.89 € (4.59 € Partner) | Rimi |
| Elmex Suuvesi caries protection 400ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elmex Suuvesi sensitive 400ml | Personal care | 8.19 € | — | 8.99 € | Barbora |
| Elseve Juuksemask hyaluron plump 300ml | Personal care | 9.19 € | 9.79 € | — | Barbora |
| Elseve Juukseõli extraordinary oil 100ml | Personal care | 14.99 € | 14.99 € | — | Barbora + Rimi |
| Elseve Juukseseerum hyaluron plump 150ml | Personal care | 7.99 € | 7.99 € | — | Barbora + Rimi |
| Elseve Palsam bond repair 150ml | Personal care | 10.99 € | 10.99 € | — | Barbora + Rimi |
| Elseve Palsam color vive 400ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elseve Palsam extraordinary oil 200ml | Personal care | 5.99 € | 4.19 € | — | Rimi |
| Elseve Palsam hyaluron plump 200ml | Personal care | 5.99 € | 4.19 € | — | Rimi |
| Elseve Palsam repair total 5 200ml | Personal care | 5.99 € | 4.19 € | — | Rimi |
| Elseve Šampoon color vive 400ml | Personal care | 7.99 € | 8.19 € | — | Barbora |
| Elseve Šampoon dream long 1000ml | Personal care | 19.99 € (9.99 € Aitäh) | 9.99 € | — | Rimi |
| Elseve Šampoon hyaluron plump 1000ml | Personal care | 19.99 € (9.99 € Aitäh) | 9.99 € | — | Rimi |
| Elseve Šampoon hyaluron plump 250ml | Personal care | 5.99 € | 4.19 € | — | Rimi |
| Elseve Šampoon hyaluron plump 400ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elseve Šampoon repair total 5 400ml | Personal care | 7.99 € | 8.19 € | — | Barbora |
| Fa Deodorant passion pink 150ml | Personal care | 4.79 € (2.99 € Aitäh) | 3.19 € | — | Rimi |
| Fa Dušigeel aloe vera yogurt 400ml | Personal care | 5.49 € (3.49 € Aitäh) | — | 5.49 € | Barbora + Selver |
| Fa Dušigeel attraction force men 400ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Fa Dušigeel blueberry yogh 400ml | Personal care | 5.49 € | 3.49 € | — | Rimi |
| Fa Dušigeel cacao cream oil 400ml | Personal care | 5.49 € | 3.59 € | — | Rimi |
| Fa Dušigeel coconut milk 400ml | Personal care | 5.49 € | 4.09 € | — | Rimi |
| Fa Dušigeel divine moments 400ml | Personal care | 5.49 € | — | 5.49 € | Barbora + Selver |
| Fa Dušigeel dream fiji 400ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Fa Dušigeel honey pistachio soft 400ml | Personal care | — | 3.59 € | 5.49 € | Rimi |
| Fa Dušigeel men xtracool 400ml | Personal care | 5.49 € | 3.59 € | — | Rimi |
| Fructis Palsam color resist 200ml | Personal care | 4.99 € | 5.29 € | — | Barbora |
| Fructis Šampoon color resist 400ml | Personal care | 5.99 € | 4.29 € | — | Rimi |
| Gillette Habemepalsam c king 100ml | Personal care | 13.19 € | 13.19 € | — | Barbora + Rimi |
| Gliss Juuksemask in shine 400ml | Personal care | 10.69 € | — | 11.17 € | Barbora |
| Gliss Palsam full hair wonder 200ml | Personal care | 5.39 € | — | 5.69 € | Barbora |
| Gliss Šampoon gentle scalp 200ml | Personal care | 10.29 € | — | 10.99 € | Barbora |
| Gliss Šampoon repair ultimate 400ml | Personal care | 6.59 € | — | 7.59 € | Barbora |
| Got2b Juukselakk glued 300ml | Personal care | 10.39 € | 10.99 € | 10.15 € | Selver |
| Head & shoulders Šampoon apple 400ml | Personal care | — | 10.29 € | 9.44 € | Selver |
| Head & shoulders Šampoon clarify shine 400ml | Personal care | — | 8.79 € | 9.44 € | Rimi |
| Head & shoulders Šampoon in menthol 400ml | Personal care | — | 8.99 € | 9.44 € (7.29 € Partner) | Rimi |
| Himalaya Hambapasta sparkly white 75ml | Personal care | 4.79 € | 4.79 € | — | Barbora + Rimi |
| Jordan Hambapasta breath fresh 75ml | Personal care | 2.65 € | 2.79 € | 2.89 € | Barbora |
| Jordan Hambapasta caries defence 75ml | Personal care | 2.65 € | — | 2.89 € | Barbora |
| Jordan Hambapasta smile white 75ml | Personal care | 2.65 € | 2.79 € | 2.89 € (2.29 € Partner) | Barbora |
| Listerine Suuvesi care extra mild total 500ml | Personal care | — | 7.69 € | 8.29 € | Rimi |
| Listerine Suuvesi care total 1000ml | Personal care | — | 7.79 € | 10.99 € | Rimi |
| Listerine Suuvesi care total 500ml | Personal care | 7.09 € | — | 8.29 € | Barbora |
| Listerine Suuvesi coolmint 1000ml | Personal care | 10.15 € | — | 10.15 € | Barbora + Selver |
| Listerine Suuvesi freshburst 500ml | Personal care | 6.09 € | 6.69 € | — | Barbora |
| Mayeri Dušigeel sensitive 300ml | Personal care | 4.39 € | 4.39 € | — | Barbora + Rimi |
| Mayeri Vahuseep grapefruit 300ml | Personal care | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Mayeri Vahuseep sensitive 300ml | Personal care | 2.85 € | 2.85 € | 2.99 € (2.19 € Partner) | Barbora + Rimi |
| Natura estonica Šampoon c power 400ml | Personal care | — | 5.49 € | 5.58 € | Rimi |
| Naturalis Kätekreem aloe vera 125ml | Personal care | 2.99 € | — | 2.43 € (2.09 € Partner) | Selver |
| Naturalis Kätekreem mandliõliga 125ml | Personal care | 2.99 € | — | 2.43 € (2.09 € Partner) | Selver |
| Neutral Seep sensitive skin 100g | Personal care | 1.59 € | 1.39 € | — | Rimi |
| Nivea Dušigeel apricot care 500ml | Personal care | 7.25 € | 7.25 € | — | Barbora + Rimi |
| Nivea Dušigeel care fruit star 500ml | Personal care | 7.25 € | 7.25 € | 7.10 € (4.89 € Partner) | Selver |
| Nivea Dušigeel creme soft 250ml | Personal care | 4.49 € | — | 4.56 € | Barbora |
| Nivea Dušigeel creme soft 750ml | Personal care | 9.19 € | 6.79 € | — | Rimi |
| Nivea Dušigeel lemon oil 250ml | Personal care | 4.49 € | 3.29 € | — | Rimi |
| Nivea Dušigeel lemon oil 500ml | Personal care | 7.25 € | 5.29 € | — | Rimi |
| Nivea Dušigeel men sport 500ml | Personal care | 7.25 € | 7.25 € | — | Barbora + Rimi |
| Nivea Ihupiim aloe hydration 400ml | Personal care | 9.79 € | 9.99 € | 9.99 € | Barbora |
| Nivea Ihupiim aloe hydration 625ml | Personal care | 9.99 € | 10.99 € | — | Barbora |
| Nivea Juukselakk strong ultra 250ml | Personal care | 5.31 € | — | 7.61 € | Barbora |
| Nivea Kreem universaalne 75ml | Personal care | — | 2.95 € | 3.55 € | Rimi |
| Nivea Šampoon color cristal gloss 250ml | Personal care | 3.35 € | — | 4.79 € | Barbora |
| Nivea Šampoon in palsam 250ml | Personal care | 3.35 € | — | 4.79 € | Barbora |
| Nivea Šampoon sensation volume 250ml | Personal care | 3.35 € | — | 4.79 € (3.29 € Partner) | Barbora |
| Old spice Deodorant claw tiger 150ml | Personal care | 5.05 € | — | 5.07 € | Barbora |
| Old spice Deodorant oasis 150ml | Personal care | 5.05 € | 5.19 € | — | Barbora |
| Old spice Deodorant wolfthorn 150ml | Personal care | 5.05 € | 5.19 € | — | Barbora |
| Old spice Dušigeel bearglove 400ml | Personal care | 5.75 € | 4.99 € | 5.78 € | Rimi |
| Old spice Dušigeel captain 1000ml | Personal care | 11.59 € | 7.99 € | — | Rimi |
| Old spice Dušigeel captain 400ml | Personal care | 5.79 € | 5.99 € | 5.78 € | Selver |
| Old spice Dušigeel claw tiger 400ml | Personal care | 5.75 € | 6.19 € | 5.69 € | Selver |
| Old spice Dušigeel night panther 400ml | Personal care | 5.75 € | 4.99 € | 5.78 € (4.69 € Partner) | Rimi |
| Old spice Dušigeel oasis 400ml | Personal care | 5.75 € | 5.99 € | — | Barbora |
| Old spice Dušigeel rockstar 400ml | Personal care | 5.75 € | 5.99 € | 6.09 € | Barbora |
| Old spice Dušigeel whitewater 1000ml | Personal care | 12.49 € | 7.99 € | — | Rimi |
| Old spice Dušigeel whitewater 400ml | Personal care | 5.75 € (4.49 € Aitäh) | 5.99 € | 5.78 € | Barbora |
| Old spice Dušigeel wolfthorn 400ml | Personal care | 5.75 € | 5.99 € | — | Barbora |
| Old spice Pulkdeodorant bearglove 50ml | Personal care | — | 4.29 € | 5.07 € | Rimi |
| Old spice Pulkdeodorant captain 50ml | Personal care | — | 5.19 € | 5.07 € | Selver |
| Old spice Pulkdeodorant oasis 50ml | Personal care | 5.05 € | 5.19 € | — | Barbora |
| Palmolive Seep aloe hygiene plus 90g | Personal care | 0.95 € | 0.95 € | — | Barbora + Rimi |
| Palmolive Tükiseep black naturals orchid 90g | Personal care | — | 0.95 € | 0.95 € | Rimi + Selver |
| Palmolive Vedelseep honey milk 300ml | Personal care | — | 2.89 € | 3.89 € | Rimi |
| Palmolive Vedelseep milk olive 300ml | Personal care | 2.89 € | — | 3.49 € | Barbora |
| Pantene Juukseõli keratin protect 100ml | Personal care | 13.99 € | 13.99 € | — | Barbora + Rimi |
| Pantene Palsam aqua light 275ml | Personal care | 6.99 € | 6.99 € | 7.10 € | Barbora + Rimi |
| Pantene Palsam infinite lenghts 275ml | Personal care | 6.99 € | — | 7.10 € | Barbora |
| Pantene Palsam strong thick 275ml | Personal care | 6.99 € | 6.99 € | — | Barbora + Rimi |
| Pantene Šampoon hydration recharge 400ml | Personal care | 6.99 € | 7.79 € | — | Barbora |
| Pantene Šampoon in strong thick 325ml | Personal care | 6.79 € | 6.99 € | — | Barbora |
| Pantene Šampoon infinite lenghts 400ml | Personal care | 6.99 € | — | 7.10 € | Barbora |
| Pantene Šampoon strong thick 400ml | Personal care | 6.99 € | 7.69 € | — | Barbora |
| Parodontax Hambapasta active gum repair 75ml | Personal care | — | 7.39 € | 6.99 € | Selver |
| Parodontax Hambapasta classic 75ml | Personal care | 6.39 € | 6.39 € | 6.59 € (5.59 € Partner) | Barbora + Rimi |
| Parodontax Hambapasta fluoride 75ml | Personal care | 7.79 € | 7.99 € | — | Barbora |
| Parodontax Suuvesi 500ml | Personal care | 8.39 € | — | 8.99 € (7.29 € Partner) | Barbora |
| Puhas loodus Dušigeel kadakamari 250ml | Personal care | 2.55 € | 2.99 € | — | Barbora |
| Puhas loodus Kehakreem kibuvits 150ml | Personal care | 3.99 € | 4.39 € | — | Barbora |
| Puhas loodus Šampoon nõges toitev 250ml | Personal care | 2.39 € | 2.69 € | — | Barbora |
| Puhas loodus Šampoon takjas tugevd 250ml | Personal care | 2.39 € | 2.69 € | — | Barbora |
| Rexona Deodorant bouquet sexy 200ml | Personal care | 5.99 € | 6.15 € | — | Barbora |
| Rexona Deodorant cobalt dry men 200ml | Personal care | 5.99 € | 6.15 € | — | Barbora |
| Rich Palsam andev kohevust 200ml | Personal care | 15.19 € | — | 15.24 € | Barbora |
| Rich Palsam collagen repairing 200ml | Personal care | 15.59 € | 12.39 € | — | Rimi |
| Rich Šampoon andev kohevust 250ml | Personal care | 14.19 € | — | 14.22 € | Barbora |
| Rich Šampoon collagen repairing 250ml | Personal care | 14.29 € | 11.39 € | — | Rimi |
| Schauma Palsam color 250ml | Personal care | 3.99 € | — | 4.06 € | Barbora |
| Schauma Šampoon care repair 400ml | Personal care | 5.09 € | 3.79 € | — | Rimi |
| Schauma Šampoon color shine 400ml | Personal care | 5.09 € | 3.79 € | 5.07 € | Rimi |
| Sensodyne Hambapasta care multi 75ml | Personal care | 5.29 € | 5.49 € | 5.29 € | Barbora + Selver |
| Sensodyne Hambapasta cavity sensitivity 75ml | Personal care | — | 6.79 € | 6.69 € | Selver |
| Sensodyne Hambapasta clean deep 75ml | Personal care | 6.39 € | 6.79 € | 7.29 € | Barbora |
| Sensodyne Hambapasta clinical white 75ml | Personal care | 9.99 € (6.49 € Aitäh) | — | 9.99 € | Barbora + Selver |
| Sensodyne Hambapasta daily protection 100ml | Personal care | — | 5.29 € | 5.29 € | Rimi + Selver |
| Sensodyne Hambapasta fluoride 75ml | Personal care | 6.59 € | 6.59 € | 6.59 € | Barbora + Rimi + Selver |
| Sensodyne Hambapasta gum sensitivity 75ml | Personal care | — | 8.39 € | 8.99 € | Rimi |
| Sensodyne Hambapasta pronamel 75ml | Personal care | 8.19 € | 8.19 € | 7.99 € | Selver |
| Sensodyne Hambapasta protect repair 75ml | Personal care | 8.49 € (5.52 € Aitäh) | 6.99 € | 8.99 € | Rimi |
| Sensodyne Hambapasta whitening 75ml | Personal care | — | 6.99 € | 6.99 € | Rimi + Selver |
| Sensodyne Suuvesi cool mint 500ml | Personal care | 8.79 € (5.71 € Aitäh) | 7.39 € | 8.99 € | Rimi |
| Splat Hambapasta biocalcium 100ml | Personal care | 5.49 € | 5.49 € | 5.59 € | Barbora + Rimi |
| Splat Hambapasta herbs medical 100ml | Personal care | 5.49 € | 5.49 € | 5.59 € | Barbora + Rimi |
| Splat Hambapasta plus white 100ml | Personal care | 5.49 € | — | 5.29 € | Selver |
| Splat Hambapasta sensitive 100ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Splat Hambapasta ultracomplex 100ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Syoss Juuksegeel hold max 250ml | Personal care | 6.43 € | 5.59 € | — | Rimi |
| Syoss Juuksemask intense keratin 400ml | Personal care | 7.69 € | 8.39 € | — | Barbora |
| Syoss Juuksevaha hold max 150ml | Personal care | 5.66 € | 6.79 € | — | Barbora |
| Syoss Juuksevaht control curl 250ml | Personal care | 5.94 € | 5.79 € | — | Rimi |
| Syoss Kuivšampoon fresh pure 200ml | Personal care | 5.03 € | 4.99 € | 8.99 € (5.59 € Partner) | Rimi |
| Syoss Palsam color 440ml | Personal care | 5.59 € | 5.29 € | 5.49 € | Rimi |
| Syoss Palsam curls intense 250ml | Personal care | 5.59 € | 5.59 € | — | Barbora + Rimi |
| Syoss Palsam intense plex 250ml | Personal care | 5.38 € | 5.49 € | — | Barbora |
| Syoss Palsam keratin 250ml | Personal care | 5.38 € | — | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Palsam repair 440ml | Personal care | 5.59 € | 5.29 € | 7.99 € (5.29 € Partner) | Rimi |
| Syoss Šampoon anti dandruff 440ml | Personal care | 5.59 € | 7.99 € | — | Barbora |
| Syoss Šampoon color 440ml | Personal care | 5.59 € | 5.39 € | 5.49 € | Rimi |
| Syoss Šampoon curls waves 440ml | Personal care | 5.59 € | — | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Šampoon glaze intense 440ml | Personal care | 5.59 € | 5.79 € | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Šampoon intense oleo 440ml | Personal care | 5.59 € | 5.29 € | — | Rimi |
| Syoss Šampoon intense plex 440ml | Personal care | 5.59 € | 5.79 € | — | Barbora |
| Syoss Šampoon keratin 750ml | Personal care | — | 12.39 € | 13.99 € | Rimi |
| Syoss Šampoon repair 440ml | Personal care | 5.59 € | 5.39 € | 7.99 € (5.29 € Partner) | Rimi |
| Syoss Šampoon volume 440ml | Personal care | 5.59 € | 5.29 € | 7.99 € (5.29 € Partner) | Rimi |
| Taft Juukselakk aloe boost 250ml | Personal care | 7.15 € | 4.99 € | — | Rimi |
| Taft Juukselakk invisible power 250ml | Personal care | 7.15 € | 3.69 € | 5.49 € | Rimi |
| Taft Juukselakk ultimate 250ml | Personal care | 7.15 € | 5.19 € | — | Rimi |
| Taft Juukselakk up volume 250ml | Personal care | — | 5.19 € | 7.10 € | Rimi |
| Taft Juuksepuuder volume 10g | Personal care | 8.19 € | 4.99 € | — | Rimi |
| Taft Juuksevaha creative look 75ml | Personal care | 7.15 € | 6.39 € | — | Rimi |
| Woom Hambapasta aloe vera 75ml | Personal care | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Woom Hambapasta sensitive 75ml | Personal care | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Ziaja Dušigeel butter cocoa 500ml | Personal care | 3.99 € (2.79 € Aitäh) | — | 4.06 € | Barbora |
| Ziaja Dušigeel butter orange 500ml | Personal care | 3.69 € (2.59 € Aitäh) | — | 4.06 € | Barbora |
| Ziaja Dušigeel natural olive 500ml | Personal care | 3.99 € | — | 4.06 € | Barbora |
| Ziaja Šampoon oil olive 400ml | Personal care | 3.99 € | — | 3.29 € | Selver |
| Dreamies Kassi kanalihaga suupiste 60g | Pet food | — | 1.29 € | 1.99 € (1.19 € Partner) | Rimi |
| Dreamies Kassi pardilihaga suupiste 60g | Pet food | — | 1.29 € | 1.99 € (1.19 € Partner) | Rimi |
| Dreamies Suupiste kassi lõhega 60g | Pet food | 1.79 € | 1.29 € | 1.99 € (1.19 € Partner) | Rimi |
| Felix Kassimaius deli kana moments 4x10g | Pet food | 1.59 € | — | 1.99 € | Barbora |
| Felix Kassimaius deli lõhe moments 4x10g | Pet food | 1.59 € | — | 1.99 € | Barbora |
| Pedigree Koeraeine 4x100g | Pet food | 1.79 € | 2.49 € | — | Barbora |
| Pedigree Koeraeine junior 4x100g | Pet food | 1.67 € | 2.49 € | — | Barbora |
| Pedigree Koeramaius rodeo 70g | Pet food | 0.90 € | 1.35 € | 1.29 € | Barbora |
| Sheba Kassipasteet kanaga 85g | Pet food | 0.79 € | — | 0.99 € | Barbora |
| Sheba Kiisueine kastmes segavalik 4x85g | Pet food | 3.49 € | — | 3.49 € | Barbora + Selver |
| Sheba Kiisueine lõhega 85g | Pet food | — | 0.75 € | 0.99 € | Rimi |
| Baltix Hirss 1000g | Rice & grains | 2.45 € | 2.49 € | 2.50 € | Barbora |
| Baltix Odrakruup 1000g | Rice & grains | 1.39 € | — | 1.41 € | Barbora |
| Baltix Tatar 1000g | Rice & grains | 1.64 € | — | 2.35 € | Barbora |
| Baltix Tatar 4x100g | Rice & grains | 1.69 € | 1.99 € | — | Barbora |
| Baltix Toortatar 4x100g | Rice & grains | 1.64 € | 2.35 € | 2.23 € | Barbora |
| Bosto Bulgur 4x75g | Rice & grains | 2.73 € | 2.79 € | — | Barbora |
| Bosto Pärlkuskuss 4x75g | Rice & grains | 3.45 € | 3.45 € | — | Barbora + Rimi |
| Just nature Must kinoa 500g | Rice & grains | 3.85 € | — | 3.85 € | Barbora + Selver |
| Just nature Punane kinoa 500g | Rice & grains | 3.55 € | — | 3.55 € | Barbora + Selver |
| Just nature Valge kinoa 500g | Rice & grains | 3.85 € | — | 3.03 € | Selver |
| Tartu mill Manna 1000g | Rice & grains | — | 1.45 € | 1.51 € | Rimi |
| Tartu mill Odra pärlkruup 4x100g | Rice & grains | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Tartu mill Tatar 1000g | Rice & grains | 2.24 € | 2.39 € | — | Barbora |
| Veski mati Hirss 500g | Rice & grains | 1.25 € | 1.29 € | 1.25 € | Barbora + Selver |
| Veski mati Maisitang 500g | Rice & grains | — | 1.09 € | 1.01 € | Selver |
| Veski mati Manna 500g | Rice & grains | 0.99 € | 1.05 € | 1.02 € | Barbora |
| Veski mati Pudruriis 1000g | Rice & grains | — | 3.09 € | 3.13 € | Rimi |
| Veski mati Riis sõmer 1000g | Rice & grains | — | 3.09 € | 3.00 € | Selver |
| Veski mati Risotoriis 500g | Rice & grains | — | 2.49 € | 2.39 € | Selver |
| Baltika Ketšup terav 500g | Sauces & condiments | 1.85 € | 2.39 € | — | Barbora |
| Baltika Kodune kange sinep 120g | Sauces & condiments | 1.35 € | 1.49 € | 1.41 € (1.19 € Partner) | Barbora |
| Barilla Pastakaste basilico 400g | Sauces & condiments | 3.75 € (2.99 € Aitäh) | 3.79 € | 3.59 € | Selver |
| Barilla Pastakaste bolognese 400g | Sauces & condiments | 4.99 € | 4.99 € | 4.99 € | Barbora + Rimi + Selver |
| Barilla Pastakaste genovese pesto 190g | Sauces & condiments | 3.99 € | 3.59 € | — | Rimi |
| Barilla Pastakaste napoletana 400g | Sauces & condiments | 3.79 € | 3.79 € | 2.99 € | Selver |
| Borges Modena palsamiäädikas 250ml | Sauces & condiments | 2.94 € | — | 2.94 € | Barbora + Selver |
| Borges Õunaäädikas ökoloogiline 250ml | Sauces & condiments | 2.95 € | 2.95 € | — | Barbora + Rimi |
| Chumak Šašlõkiketšup 250g | Sauces & condiments | 1.29 € | — | 1.29 € | Barbora + Selver |
| Chumak Tomatiketšup 250g | Sauces & condiments | 1.29 € | — | 1.29 € | Barbora + Selver |
| Farmi Dipikaste aiaürtidega 200g | Sauces & condiments | — | 1.59 € | 1.69 € (1.49 € Partner) | Rimi |
| Felix Adžika 260g | Sauces & condiments | 1.95 € | 1.99 € | 1.95 € | Barbora + Selver |
| Felix Barbeque meekaste 320g | Sauces & condiments | 2.09 € | 2.89 € | 2.39 € | Barbora |
| Felix Bolognese kaste 490g | Sauces & condiments | 2.65 € | 1.99 € | 2.69 € | Rimi |
| Felix Burgerikaste 220g | Sauces & condiments | 1.79 € | 1.45 € | 1.79 € | Rimi |
| Felix Grillkaste 510g | Sauces & condiments | 1.99 € | 2.05 € | 1.99 € | Barbora + Selver |
| Felix Hellfire ketšup 500g | Sauces & condiments | 3.55 € | 2.79 € | — | Rimi |
| Felix Hiinapärane kaste poolmagus 500g | Sauces & condiments | 2.19 € | 1.99 € | — | Rimi |
| Felix Kartulikaste 220g | Sauces & condiments | 1.79 € | 1.45 € | 1.79 € | Rimi |
| Felix Kaste ananassiga and sour sweet 500g | Sauces & condiments | — | 1.99 € | 2.19 € | Rimi |
| Felix Kaste island thousand 375g | Sauces & condiments | 2.35 € | 2.69 € | 2.59 € (2.19 € Partner) | Barbora |
| Felix Klassikaline salatikaste 375g | Sauces & condiments | 2.01 € | 2.69 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Kuldse meega sinep 170g | Sauces & condiments | 2.95 € | — | 2.95 € | Barbora + Selver |
| Felix Kurgikaste 275g | Sauces & condiments | 2.01 € | 2.69 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Küüslaugukaste 275g | Sauces & condiments | 2.01 € | 2.69 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Mädarõigas kodune 200g | Sauces & condiments | 1.69 € | 1.69 € | — | Barbora + Rimi |
| Felix Magus tšillikaste 355g | Sauces & condiments | 1.83 € | — | 2.43 € | Barbora |
| Felix Maheda maitsega sinep 170g | Sauces & condiments | 2.65 € | — | 2.65 € | Barbora + Selver |
| Felix Majonees aioli laimi 220g | Sauces & condiments | 1.99 € | 1.79 € | — | Rimi |
| Felix Majonees kerge 870g | Sauces & condiments | 3.25 € | 3.39 € | 4.06 € | Barbora |
| Felix Majonees klassikaline 830g | Sauces & condiments | — | 4.05 € | 4.05 € | Rimi + Selver |
| Felix Mangokaste 500g | Sauces & condiments | 2.59 € | — | 2.59 € | Barbora + Selver |
| Felix Mee ja salatikaste sinepi 375g | Sauces & condiments | 1.94 € | — | 2.59 € | Barbora |
| Felix Pastakaste 500g | Sauces & condiments | 2.59 € | 1.99 € | 2.59 € | Rimi |
| Felix Pastakaste ürtidega 360g | Sauces & condiments | 2.65 € | 2.65 € | — | Barbora + Rimi |
| Felix Põltsamaa kange sinep 65g | Sauces & condiments | 1.49 € | — | 1.49 € | Barbora + Selver |
| Felix Premium majonees 235g | Sauces & condiments | 1.99 € | — | 2.12 € | Barbora |
| Felix Premium majonees 445g | Sauces & condiments | 3.55 € | 3.79 € | 3.69 € | Barbora |
| Felix Ranch salatikaste 375g | Sauces & condiments | 2.01 € | 2.89 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Salatikaste caesar 375g | Sauces & condiments | 1.94 € | — | 2.59 € | Barbora |
| Felix Terav tomatiketšup 1000g | Sauces & condiments | 4.49 € | 4.49 € | — | Barbora + Rimi |
| Felix Terav tomatiketšup 500g | Sauces & condiments | 2.89 € | 2.89 € | — | Barbora + Rimi |
| Felix Terav tšillikaste 350g | Sauces & condiments | 1.83 € | — | 2.43 € | Barbora |
| Felix Tomati salatikaste tšilli 375g | Sauces & condiments | 1.94 € | — | 2.59 € (2.19 € Partner) | Barbora |
| Felix Tomatiketšup 1000g | Sauces & condiments | 4.09 € | 3.79 € | 3.79 € | Rimi + Selver |
| Felix Tomatiketšup 1250g | Sauces & condiments | 4.95 € (3.59 € Aitäh) | 4.89 € | 4.95 € (3.29 € Partner) | Rimi |
| Felix Tomatiketšup 500g | Sauces & condiments | 2.89 € | 2.89 € | 2.29 € | Selver |
| Felix Tomatiketšup ilma lisatud suhkruta 970g | Sauces & condiments | — | 3.49 € | 4.65 € (3.79 € Partner) | Rimi |
| Felix Tomatipasta 265g | Sauces & condiments | 1.85 € | 1.49 € | 1.85 € | Rimi |
| Felix Tšillimajonees 220g | Sauces & condiments | 2.05 € | 1.79 € | 2.08 € | Rimi |
| Felix Vahemere salatikaste 375g | Sauces & condiments | 2.01 € | — | 2.69 € | Barbora |
| Felix Wrapikaste 220g | Sauces & condiments | 1.55 € | 1.45 € | 1.79 € | Rimi |
| Flying goose Sriracha tšillikaste 200ml | Sauces & condiments | 4.79 € | — | 3.99 € | Selver |
| Gourmante Palsamikreem 250ml | Sauces & condiments | 4.89 € | — | 4.87 € | Selver |
| Gourmet club Caesari kaste 150g | Sauces & condiments | 3.79 € | 2.99 € | 2.99 € | Rimi + Selver |
| Heinz Bbq kaste klassikaline 480g | Sauces & condiments | — | 4.79 € | 4.46 € | Selver |
| Heinz Burgerikaste ameerikapärane 400ml | Sauces & condiments | — | 4.79 € | 4.79 € | Rimi + Selver |
| Heinz Ketšup 460g | Sauces & condiments | 3.59 € | 3.59 € | — | Barbora + Rimi |
| Heinz Küüslaugukaste 420g | Sauces & condiments | 4.69 € | 4.69 € | — | Barbora + Rimi |
| Heinz Worcester kaste 150ml | Sauces & condiments | — | 2.95 € | 2.63 € | Selver |
| Hellmann's Bbq kaste original 430ml | Sauces & condiments | 3.99 € | 3.99 € | — | Barbora + Rimi |
| Hellmann's Kaste burger chunky 250ml | Sauces & condiments | — | 3.19 € | 3.39 € | Rimi |
| Hellmann's Majonees light 405ml | Sauces & condiments | 3.99 € | — | 4.89 € | Barbora |
| Hellmann's Majonees original 405ml | Sauces & condiments | 3.69 € (2.39 € Aitäh) | — | 3.99 € (2.29 € Partner) | Barbora |
| Hellmann's Majonees original 625ml | Sauces & condiments | 5.79 € (3.99 € Aitäh) | 6.39 € | — | Barbora |
| Lemmik Majonees juustu 200g | Sauces & condiments | 1.49 € | 1.59 € | — | Barbora |
| Lemmik Majonees oliivi provansaal 210g | Sauces & condiments | 1.39 € (0.79 € Aitäh) | 1.49 € | 1.55 € | Barbora |
| Lemmik Majonees provansaal 405g | Sauces & condiments | 1.99 € | 2.05 € | 2.25 € | Barbora |
| Lemmik Majonees provansaal 700g | Sauces & condiments | 2.99 € | 2.99 € | 3.39 € | Barbora + Rimi |
| Maggi Kaste salsa texicana 500ml | Sauces & condiments | 4.99 € | 4.99 € | — | Barbora + Rimi |
| Meira Sinep traditsiooniline 500g | Sauces & condiments | 2.99 € | — | 3.04 € | Barbora |
| Merevaik Juustudipp cheddari 200g | Sauces & condiments | 1.89 € | 1.89 € | 1.89 € | Barbora + Rimi + Selver |
| Merevaik Juustudipp originaal 200g | Sauces & condiments | 1.89 € | — | 1.89 € | Barbora + Selver |
| Merevaik Juustumajonees tere 210g | Sauces & condiments | 1.55 € | 1.89 € | — | Barbora |
| Minu Mädarõigas delikatess 170g | Sauces & condiments | 1.19 € | — | 1.31 € | Barbora |
| Minu Mädarõigas ekstra kange 200g | Sauces & condiments | 1.69 € | — | 1.79 € | Barbora |
| Mo saaremaa Juustukaste 400g | Sauces & condiments | 2.65 € (1.99 € Aitäh) | 2.65 € | — | Barbora + Rimi |
| Panzani Bolognese pastakaste veggie 390g | Sauces & condiments | 4.99 € | — | 4.49 € (3.59 € Partner) | Selver |
| Panzani Pastakaste bolognese extra 425g | Sauces & condiments | — | 5.29 € | 5.29 € | Rimi + Selver |
| Panzani Pastakaste napoletana 400g | Sauces & condiments | 3.69 € | 3.69 € | 3.89 € | Barbora + Rimi |
| Panzani Pastakaste originale 400g | Sauces & condiments | 3.69 € | 3.69 € | 3.89 € | Barbora + Rimi |
| Panzani Pitsakaste tomapizza 390g | Sauces & condiments | 2.99 € | — | 3.05 € | Barbora |
| Panzani Tomatipüree tomacouli 200g | Sauces & condiments | 1.55 € | — | 1.25 € | Selver |
| Pomi Tomatipasta 200g | Sauces & condiments | 1.15 € | 1.15 € | 1.15 € | Barbora + Rimi + Selver |
| Pomi Tomatipasta 500g | Sauces & condiments | 1.99 € | — | 1.95 € | Selver |
| Ponti Palsamiäädikakreem 250g | Sauces & condiments | 4.55 € (3.95 € Aitäh) | — | 4.56 € | Barbora |
| Salvest Adžika ketšup 360g | Sauces & condiments | 2.29 € | 2.45 € | 2.29 € | Barbora + Selver |
| Salvest Bbq kaste 390g | Sauces & condiments | 2.69 € | 2.69 € | 2.69 € | Barbora + Rimi + Selver |
| Salvest Ketšup 1000g | Sauces & condiments | — | 4.09 € | 4.06 € | Selver |
| Salvest Ketšup 270g | Sauces & condiments | 2.15 € | 2.15 € | 2.15 € | Barbora + Rimi + Selver |
| Salvest Ketšup 530g | Sauces & condiments | 2.99 € | 2.99 € | 2.49 € | Selver |
| Salvest Majonees kerge 430g | Sauces & condiments | 2.35 € | 2.49 € | 2.39 € | Barbora |
| Salvest Majonees klassikaline 430g | Sauces & condiments | 2.35 € | 2.49 € | 1.99 € | Selver |
| Salvest Majonees mädarõikamaitseline 430g | Sauces & condiments | — | 2.49 € | 2.53 € | Rimi |
| Salvest Pastakaste bolognese hakklihaga 460g | Sauces & condiments | — | 2.65 € | 2.45 € | Selver |
| Salvest Pastakaste köögiviljadega 460g | Sauces & condiments | 3.19 € | 3.19 € | 3.19 € | Barbora + Rimi + Selver |
| Salvest Pastakaste ürtidega 460g | Sauces & condiments | 3.19 € | 2.99 € | 3.19 € | Rimi |
| Salvest Tomatipasta 300g | Sauces & condiments | — | 1.89 € | 1.69 € | Selver |
| Salvest Tomatipasta ürtidega 300g | Sauces & condiments | 1.99 € | 1.99 € | 1.99 € | Barbora + Rimi + Selver |
| Santa maria Bbq kaste universaalne 330g | Sauces & condiments | 4.25 € | — | 4.25 € | Barbora + Selver |
| Sfinx-e Äädikhape 500ml | Sauces & condiments | 1.19 € | — | 1.19 € | Barbora + Selver |
| Tarplan Majonees küüslauguga 210g | Sauces & condiments | 1.19 € | — | 1.49 € | Barbora |
| Tarplan Majonees premium provansaal 210g | Sauces & condiments | 1.12 € | 1.29 € | 1.49 € | Barbora |
| Tarplan Majonees provansaal 380g | Sauces & condiments | 1.44 € | 1.69 € | 1.95 € | Barbora |
| Tarplan Majonees provansaal 450g | Sauces & condiments | 1.64 € | — | 2.19 € | Barbora |
| Tarplan Majonees provansaal 900g | Sauces & condiments | — | 3.99 € | 3.95 € (3.29 € Partner) | Selver |
| Tarplan Majonees tšilli 210g | Sauces & condiments | 1.24 € | 1.79 € | — | Barbora |
| Tarplan Majonees vegan 380g | Sauces & condiments | 1.65 € | — | 2.19 € | Barbora |
| Tarplan Salatikaste caesar 210g | Sauces & condiments | 1.42 € | 1.99 € | 1.79 € | Barbora |
| Tartu mill Pastakaste arrabbiata 340g | Sauces & condiments | 3.19 € | 3.19 € | — | Barbora + Rimi |
| Tartu mill Pastakaste napoletana 340g | Sauces & condiments | 3.29 € | 3.29 € | — | Barbora + Rimi |
| Tere Dipikaste dipp küüslaugu tops 200g | Sauces & condiments | 1.75 € | — | 1.75 € | Barbora + Selver |
| Tere Majonees laktoosivaba lactose-free 410g | Sauces & condiments | — | 2.75 € | 2.65 € | Selver |
| Thai choice Kalakaste 200ml | Sauces & condiments | 2.19 € (1.75 € Aitäh) | — | 2.19 € | Barbora + Selver |
| Thai choice Magus tšillikaste 200ml | Sauces & condiments | 2.19 € | — | 2.09 € | Selver |
| Vilux Sinep dijoni teraline 200g | Sauces & condiments | 2.79 € | — | 2.80 € | Barbora |
| Vilux Sinep dijoni teravamaitseline 200g | Sauces & condiments | 2.79 € | — | 2.80 € | Barbora |
| Karni Täissuitsuvorst kuningate 250g | Sausages | 3.95 € | 3.95 € | 3.95 € | Barbora + Rimi + Selver |
| Maks & moorits Koduviiner 500g | Sausages | 2.05 € | 2.05 € | — | Barbora + Rimi |
| Maks & moorits Sardell 375g | Sausages | 1.99 € | 2.29 € | — | Barbora |
| Maks & moorits Suitsusardell lemmik 375g | Sausages | 2.19 € | 2.19 € | — | Barbora + Rimi |
| Maks & moorits Suitsuviiner 300g | Sausages | 1.62 € | 1.69 € | — | Barbora |
| Maks & moorits Täissuitsuvorst pepperoni 240g | Sausages | 3.59 € | 2.39 € | — | Rimi |
| Maks & moorits Väike viiner 260g | Sausages | 1.89 € | 1.69 € | — | Rimi |
| Matsimoka Salaami chorizo 150g | Sausages | 3.45 € | — | 3.45 € | Barbora + Selver |
| Matsimoka Salaami traditsiooniline 150g | Sausages | 3.45 € | — | 3.45 € | Barbora + Selver |
| Matsimoka Suitsuvorst juustuga 240g | Sausages | 3.79 € | 3.79 € | 4.09 € | Barbora + Rimi |
| Matsimoka Tailihaviiner 250g | Sausages | 4.05 € | 4.05 € | 4.06 € | Barbora + Rimi |
| Nõo Grillvorstid jäägri 365g | Sausages | 4.65 € | 4.59 € | 4.59 € | Rimi + Selver |
| Nõo Keedusalaami tarbatu 105g | Sausages | — | 3.59 € | 3.65 € | Rimi |
| Nõo Keedusalaami vasalli 250g | Sausages | 4.99 € | — | 3.19 € | Selver |
| Nõo Keeduvorst nomps 350g | Sausages | 4.99 € | — | 4.99 € (3.39 € Partner) | Barbora + Selver |
| Nõo Suitsuvorst terräv treski 240g | Sausages | 4.69 € | — | 4.69 € | Barbora + Selver |
| Nõo Täislihaviiner suitsutatud 310g | Sausages | 4.35 € | — | 4.39 € | Barbora |
| Nõo Täissuitsuvorst eesti juustuga 250g | Sausages | 4.89 € | 4.89 € | — | Barbora + Rimi |
| Nõo Täissuitsuvorst juustuga moskva 250g | Sausages | 4.39 € | 4.39 € | — | Barbora + Rimi |
| Nõo Täissuitsuvorst moskva 250g | Sausages | 4.19 € | 3.59 € | 4.19 € (3.49 € Partner) | Rimi |
| Nõo Täissuitsuvorst wabariigi 250g | Sausages | 4.25 € | 4.25 € | 3.29 € | Selver |
| Oskar E lihaviiner vaba 125g | Sausages | 1.49 € | 1.49 € | 1.19 € | Selver |
| Oskar Täissuitsuvorst moskva 210g | Sausages | 4.59 € | 4.59 € | 4.59 € | Barbora + Rimi + Selver |
| Oskar Viiner lambasooles päris 350g | Sausages | 3.65 € | 3.65 € | — | Barbora + Rimi |
| Rakvere Grillvorstid juustuga rohke 400g | Sausages | 4.29 € | 3.99 € | 4.29 € | Rimi |
| Rakvere Keeduvorst doktori 300g | Sausages | 1.55 € | — | 2.02 € | Barbora |
| Rakvere Keeduvorst juustu 300g | Sausages | 1.75 € | — | 2.43 € | Barbora |
| Rakvere Krakov lihakas 300g | Sausages | — | 2.99 € | 2.39 € | Selver |
| Rakvere Lasteviiner 200g | Sausages | 1.89 € | 1.49 € | 1.89 € | Rimi |
| Rakvere Mini juustuviiner 200g | Sausages | 2.29 € | — | 2.39 € | Barbora |
| Rakvere Poolsuitsuvorst 350g | Sausages | 3.69 € | 3.79 € | — | Barbora |
| Rakvere Poolsuitsuvorst servelaat 500g | Sausages | 5.79 € | 5.79 € | 6.29 € | Barbora + Rimi |
| Rakvere Salaami itaaliapärane 130g | Sausages | — | 3.19 € | 2.49 € | Selver |
| Rakvere Šašlõki toorvorstid 400g | Sausages | 4.19 € | 3.79 € | 4.39 € | Rimi |
| Rakvere Suitsujuustuvorst lihakas 360g | Sausages | 3.49 € | 3.15 € | 3.75 € | Rimi |
| Rakvere Suitsusardell 500g | Sausages | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Rakvere Täissuitsuvorst mõnus 210g | Sausages | 3.79 € | 3.79 € | — | Barbora + Rimi |
| Rakvere Toorsuitsuvorst seemnekattega 110g | Sausages | — | 2.59 € | 2.49 € | Selver |
| Rakvere Toorvorstid merevaigu 400g | Sausages | 5.19 € (3.99 € Aitäh) | 3.49 € | — | Rimi |
| Rakvere Toorvorstid mustika 400g | Sausages | 4.99 € | 4.65 € | — | Rimi |
| Rakvere Verikäkk 440g | Sausages | 1.85 € | 1.85 € | — | Barbora + Rimi |
| Rakvere Verivorst 500g | Sausages | 2.35 € | 2.39 € | — | Barbora |
| Rakvere Viiner 500g | Sausages | 2.69 € | 2.69 € | 3.45 € | Barbora + Rimi |
| Rakvere Viiner lihakas 260g | Sausages | — | 2.89 € | 2.99 € | Rimi |
| Rannarootsi Frankfurter 500g | Sausages | 2.59 € | — | 3.55 € (2.79 € Partner) | Barbora |
| Rannarootsi Miniviiner ehe 200g | Sausages | 1.95 € (1.59 € Aitäh) | 1.95 € | 1.99 € | Barbora + Rimi |
| Rannarootsi Poolsuitsuvorst juustu 330g | Sausages | 3.35 € | — | 1.75 € | Selver |
| Rannarootsi Poolsuitsuvorst kalevi 330g | Sausages | 2.99 € | — | 3.09 € | Barbora |
| Rannarootsi Sealihasardell 500g | Sausages | 3.29 € | 2.85 € | 3.39 € | Rimi |
| Rannarootsi Suitsusardell 500g | Sausages | 2.39 € | 2.89 € | 2.39 € | Barbora + Selver |
| Rannarootsi Suitsusardell ehe 375g | Sausages | — | 3.25 € | 3.23 € (2.59 € Partner) | Selver |
| Rannarootsi Suitsusardell juustuga 500g | Sausages | 3.09 € | 3.15 € | 3.13 € | Barbora |
| Rannarootsi Täissuitsuvorst hirve 240g | Sausages | 3.55 € | 3.55 € | 3.55 € | Barbora + Rimi + Selver |
| Rannarootsi Viiner ehe 330g | Sausages | 2.89 € | 2.61 € | 2.49 € | Selver |
| Toored grillvorstid lambasooles vk 400g | Sausages | 3.69 € | 3.69 € | — | Barbora + Rimi |
| Valla Keeduvorst juustu 600g | Sausages | 1.99 € | — | 1.98 € | Selver |
| Wõro Juustuvorst 600g | Sausages | 2.09 € | 2.09 € | 2.12 € | Barbora + Rimi |
| Wõro Õllemops juustuga 500g | Sausages | 2.29 € | 2.39 € | 3.39 € | Barbora |
| Wõro Peipsi sibulagrill 900g | Sausages | 3.99 € | 4.59 € | 4.99 € | Barbora |
| Wõro Poolsuitsuvorst tõmmu 350g | Sausages | 1.59 € | — | 2.19 € (1.69 € Partner) | Barbora |
| Wõro Suitsuvorst juustuga tõmmu 350g | Sausages | — | 2.55 € | 2.39 € (2.09 € Partner) | Selver |
| Kotanyi Loorberilehed 4g | Spices | 1.39 € (0.99 € Aitäh) | 1.55 € | — | Barbora |
| Meira Cajuni vürts 32g | Spices | 1.45 € | — | 1.47 € | Barbora |
| Meira Jahvatatud kardemon 8g | Spices | 0.89 € | — | 0.90 € | Barbora |
| Meira Jahvatatud vürtsköömen 25g | Spices | 1.05 € | — | 1.07 € | Barbora |
| Meira Kardemoni seemned 8g | Spices | 1.15 € | — | 1.17 € | Barbora |
| Meira Kurkum 60g | Spices | 1.99 € | — | 2.02 € | Barbora |
| Meira Sibulapulber 30g | Spices | 1.79 € | — | 1.82 € | Barbora |
| Meira Sidrunipipar soola 32g | Spices | 1.55 € | — | 1.58 € | Barbora |
| Santa maria Apelsinipipar 48g | Spices | 2.29 € | — | 2.29 € | Barbora + Selver |
| Santa maria Aroomisool 390g | Spices | — | 5.29 € | 5.19 € | Selver |
| Santa maria Aroomisool 40g | Spices | 0.95 € | — | 0.95 € (0.75 € Partner) | Barbora + Selver |
| Santa maria Aroomisool 74g | Spices | 1.69 € | — | 1.59 € | Selver |
| Santa maria Basiilik 12g | Spices | 1.59 € | — | 1.59 € | Barbora + Selver |
| Santa maria Basiilik 6g | Spices | 1.19 € | 1.35 € | — | Barbora |
| Santa maria Broilerimaitseaine 275g | Spices | 2.91 € | 5.19 € | 5.19 € | Barbora |
| Santa maria Broilerimaitseaine 30g | Spices | 0.99 € | 1.05 € | 0.95 € | Selver |
| Santa maria Broilerimaitseaine 90g | Spices | 2.25 € | 2.25 € | — | Barbora + Rimi |
| Santa maria Cajuni maitseainesegu 34g | Spices | — | 3.69 € | 3.49 € | Selver |
| Santa maria Cayenne i pipar 30g | Spices | 1.59 € | — | 1.59 € | Barbora + Selver |
| Santa maria Guljašimaitseaine 40g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Hakklihamaitseaine 280g | Spices | 2.93 € | 5.19 € | 5.19 € | Barbora |
| Santa maria Hakklihamaitseaine 30g | Spices | 0.95 € | 1.05 € | 0.95 € | Barbora + Selver |
| Santa maria Hakklihamaitseaine 80g | Spices | 2.25 € | 2.25 € | 1.59 € | Selver |
| Santa maria Jahimehesegu 220g | Spices | 3.51 € | 6.55 € | 6.29 € | Barbora |
| Santa maria Jahimehesegu 30g | Spices | 1.45 € | 1.59 € | 1.45 € | Barbora + Selver |
| Santa maria Jahvatatud ingver 20g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Jahvatatud must pipar 181g | Spices | 4.95 € | 8.89 € | 8.89 € | Barbora |
| Santa maria Jahvatatud paprika 22g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Kadakamari 21g | Spices | 3.69 € | — | 3.69 € | Barbora + Selver |
| Santa maria Kalamaitseaine sidruniga 23g | Spices | 1.15 € | 0.79 € | 1.19 € | Rimi |
| Santa maria Kalamaitseaine tilliga 25g | Spices | 0.95 € | 1.05 € | 0.95 € | Barbora + Selver |
| Santa maria Kaneel jahvatatud 210g | Spices | 4.41 € | — | 7.89 € | Barbora |
| Santa maria Kaneel jahvatatud 40g | Spices | 2.15 € | — | 2.09 € | Selver |
| Santa maria Kardemon jahvatatud 35g | Spices | 4.99 € | 5.39 € | 4.99 € | Barbora + Selver |
| Santa maria Karri 25g | Spices | 0.95 € | 1.05 € | 0.95 € (0.75 € Partner) | Barbora + Selver |
| Santa maria Karri 34g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Karri ja maitseainesegu mango 41g | Spices | — | 3.79 € | 3.49 € | Selver |
| Santa maria Kartulimaitseaine 100g | Spices | 2.25 € | 2.25 € | — | Barbora + Rimi |
| Santa maria Kartulimaitseaine 30g | Spices | 0.95 € | 1.05 € | 0.95 € | Barbora + Selver |
| Santa maria Kartulimaitseaine 350g | Spices | 2.91 € | 5.19 € | 5.19 € | Barbora |
| Santa maria Kartulimaitseaine 57g | Spices | 1.59 € | — | 1.59 € | Barbora + Selver |
| Santa maria Kiluvürts 30g | Spices | 1.75 € | — | 1.75 € | Barbora + Selver |
| Santa maria Kivisool veskis 140g | Spices | 4.69 € | — | 4.69 € (3.59 € Partner) | Barbora + Selver |
| Santa maria Köömned 20g | Spices | 0.95 € | 1.05 € | 0.95 € | Barbora + Selver |
| Santa maria Koriander purustatud 20g | Spices | — | 0.79 € | 0.95 € | Rimi |
| Santa maria Kotletimaitseaine 28g | Spices | 0.95 € | 1.05 € | 0.95 € | Barbora + Selver |
| Santa maria Kurkum jahvatatud 20g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Kurkum jahvatatud 32g | Spices | 1.49 € | 1.55 € | 1.49 € | Barbora + Selver |
| Santa maria Küüslaugupipar 30g | Spices | 1.59 € | 1.59 € | 1.59 € | Barbora + Rimi + Selver |
| Santa maria Küüslaugupipar 70g | Spices | 2.79 € | 2.79 € | — | Barbora + Rimi |
| Santa maria Küüslaugupulber 46g | Spices | 3.49 € | 3.69 € | 3.49 € | Barbora + Selver |
| Santa maria Küüslaugusool 40g | Spices | 0.95 € | 0.79 € | 0.95 € (0.75 € Partner) | Rimi |
| Santa maria Küüslaugusool 77g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Küüslauk tükeldatud 25g | Spices | 1.05 € | 0.99 € | 1.05 € | Rimi |
| Santa maria Laimipipar veskis 90g | Spices | 5.89 € | — | 5.89 € (4.49 € Partner) | Barbora + Selver |
| Santa maria Liha üldmaitseaine 290g | Spices | 2.99 € | 5.29 € | 5.79 € | Barbora |
| Santa maria Liha üldmaitseaine 35g | Spices | 1.05 € | 1.05 € | 1.05 € | Barbora + Rimi + Selver |
| Santa maria Liha üldmaitseaine 51g | Spices | — | 1.85 € | 1.75 € | Selver |
| Santa maria Liha üldmaitseaine 70g | Spices | 1.75 € | 1.75 € | 1.19 € | Selver |
| Santa maria Loorberileht 4g | Spices | 1.45 € | 1.55 € | — | Barbora |
| Santa maria Marinaad magus tšilli 75g | Spices | — | 1.09 € | 1.05 € | Selver |
| Santa maria Marinaadisegu kurgile 100g | Spices | 1.39 € | 1.49 € | 1.39 € | Barbora + Selver |
| Santa maria Muskaatpähkel 10g | Spices | — | 1.59 € | 1.49 € | Selver |
| Santa maria Must jahvatatud pipar 16g | Spices | — | 1.55 € | 1.45 € (1.09 € Partner) | Selver |
| Santa maria Must jahvatatud pipar 45g | Spices | 3.49 € | 3.39 € | 2.59 € | Selver |
| Santa maria Must pipar purustatud 18g | Spices | — | 1.55 € | 1.45 € (1.09 € Partner) | Selver |
| Santa maria Must pipar purustatud 217g | Spices | 5.39 € | 9.55 € | — | Barbora |
| Santa maria Must pipar purustatud 36g | Spices | 2.89 € | 3.09 € | 2.89 € | Barbora + Selver |
| Santa maria Must terapipar 210g | Spices | 5.39 € | 9.55 € | 9.79 € | Barbora |
| Santa maria Must terapipar 22g | Spices | 1.39 € | 1.55 € | — | Barbora |
| Santa maria Nelk 10g | Spices | 1.15 € | 1.05 € | 1.15 € | Rimi |
| Santa maria Persillade 35g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Persillade 48g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Petersell 4g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Pihvimaitseaine 30g | Spices | 0.95 € | — | 0.95 € | Barbora + Selver |
| Santa maria Piparkoogimaitseaine 30g | Spices | 1.55 € | — | 1.55 € | Barbora + Selver |
| Santa maria Piprasegu 258g | Spices | 5.63 € | — | 9.99 € | Barbora |
| Santa maria Piprasegu 25g | Spices | 1.59 € | 1.29 € | 1.59 € | Rimi |
| Santa maria Pitsamaitseaine 5g | Spices | — | 0.79 € | 0.95 € | Rimi |
| Santa maria Pitsamaitseaine 9g | Spices | — | 1.65 € | 1.59 € | Selver |
| Santa maria Prantsuse ürdisegu 6g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Pune 5g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Pune 9g | Spices | — | 3.79 € | 3.49 € | Selver |
| Santa maria Rosmariin 15g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Rosmariin 19g | Spices | 3.79 € | 3.79 € | — | Barbora + Rimi |
| Santa maria Salatimaitseaine ürtidega 30g | Spices | — | 1.05 € | 1.05 € | Rimi + Selver |
| Santa maria Šašlõkimaitseaine 45g | Spices | 1.05 € | 0.79 € | — | Rimi |
| Santa maria Sidrunipipar 33g | Spices | 1.89 € | 1.89 € | — | Barbora + Rimi |
| Santa maria Sidrunipipar 359g | Spices | 5.33 € | 9.55 € | 9.49 € | Barbora |
| Santa maria Sidrunipipar 42g | Spices | 2.55 € | 2.75 € | — | Barbora |
| Santa maria Sidrunipipar 55g | Spices | 2.39 € | 2.45 € | 2.39 € | Barbora + Selver |
| Santa maria Sidrunipipar 70g | Spices | 2.79 € | 2.59 € | — | Rimi |
| Santa maria Sinepiseemned 35g | Spices | 0.99 € | 1.05 € | 0.95 € | Selver |
| Santa maria Sool 92g | Spices | 1.59 € | — | 1.59 € | Barbora + Selver |
| Santa maria Suitsutatud paprika 37g | Spices | 2.79 € | 2.85 € | 2.75 € | Selver |
| Santa maria Teriyaki maitseainesegu 44g | Spices | — | 3.79 € | 3.49 € | Selver |
| Santa maria Teriyaki marinaad 75g | Spices | 1.05 € | 1.09 € | 1.05 € | Barbora + Selver |
| Santa maria Till 7g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Tšillipipar 34g | Spices | 2.29 € | — | 2.29 € | Barbora + Selver |
| Santa maria Tšillipipar helbed hot red 28g | Spices | — | 2.39 € | 2.29 € | Selver |
| Santa maria Tšillipulber 41g | Spices | 2.29 € | 2.39 € | 2.29 € | Barbora + Selver |
| Santa maria Tsitrus grillisegu 35g | Spices | 1.59 € | 1.25 € | — | Rimi |
| Santa maria Tuline lihamaitseaine 20g | Spices | 0.95 € | — | 0.95 € | Barbora + Selver |
| Santa maria Tüümian 10g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Universaalne maitseaine 160g | Spices | 2.69 € | 2.75 € | 1.85 € | Selver |
| Santa maria Universaalne maitseaine 350g | Spices | 2.99 € | — | 5.39 € | Barbora |
| Santa maria Universaalne marinaad 75g | Spices | 1.05 € | 1.09 € | — | Barbora |
| Santa maria Ürdiaia segu 29g | Spices | 1.59 € | 1.69 € | 1.59 € | Barbora + Selver |
| Santa maria Ürdisegu küüslauguga 28g | Spices | 1.45 € | 1.19 € | 1.39 € | Rimi |
| Santa maria Vahemere ürdisegu 12g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Viie pipra segu 25g | Spices | 1.69 € | 1.39 € | 1.75 € | Rimi |
| Santa maria Viie pipra veski 60g | Spices | — | 9.19 € | 9.09 € (6.99 € Partner) | Selver |
| Santa maria Vürts 15g | Spices | 1.39 € | 1.69 € | 1.39 € | Barbora + Selver |
| Santa maria Vürtsköömen 20g | Spices | 1.19 € | 0.99 € | 1.19 € | Rimi |
| Basilur Must ceylon leaf of tee 100g | Tea & cocoa | 4.19 € | 4.19 € | — | Barbora + Rimi |
| Basilur Roheline green jasmine tee 100g | Tea & cocoa | 5.99 € | 5.99 € | — | Barbora + Rimi |
| Dilmah Must earl grey tee 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | — | Barbora |
| Dilmah Must karamelli tee 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | — | Barbora |
| Dilmah Must mustsõstra tee 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | — | Barbora |
| Dilmah Must tee vaarika 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | — | Barbora |
| Lipton Must earl grey tee 20x1.6g | Tea & cocoa | 3.09 € | 3.19 € | — | Barbora |
| Loyd Must ceylon tee 50x2g | Tea & cocoa | 4.09 € (3.19 € Aitäh) | 4.09 € | — | Barbora + Rimi |
| Loyd Must earl gray tee 25x2g | Tea & cocoa | 2.19 € | 2.29 € | — | Barbora |
| Loyd Must intense tee 25x2g | Tea & cocoa | 2.19 € | 2.29 € | — | Barbora |
| Nesquik Lahustuv jook maasika 350g | Tea & cocoa | 4.89 € | — | 4.89 € (3.59 € Partner) | Barbora + Selver |
| Nesquik Lahustuv kakaojook 150g | Tea & cocoa | 2.59 € | — | 2.29 € | Selver |
| Nesquik Lahustuv kakaojook 300g | Tea & cocoa | 3.89 € | — | 4.19 € | Barbora |
| Twinings Must grey lady tee 100g | Tea & cocoa | 6.39 € | 6.39 € | — | Barbora + Rimi |
| Twinings Roheline gunpowder purutee 100g | Tea & cocoa | 6.39 € | — | 6.39 € | Barbora + Selver |

Card prices shown in parentheses are informational only — never used to decide the Cheapest column.

## 2. Ambiguous — needs a person to pick

| Category | Items in the group |
|---|---|
| Fruits & vegetables | Barbora "Kartul varajane lahtine kg" (0.69 €); Barbora "Kartul varajane pakitud, kg" (0.99 €); Rimi "Kartul varajane pesemata, kg" (0.49 €); Selver "Kartul pesemata, kg" (0.37 €) |
| Fruits & vegetables | Barbora "Sibul võrgus, kg" (0.75 €); Barbora "Eesti sibul võrgus, 1tk" (2.99 €); Rimi "Sibul võrgus Eesti kg" (2.99 €) |
| Fruits & vegetables | Barbora "Arbuus, kg" (0.99 €); Selver "Arbuus seemneteta, kg" (1.99 €); Selver "Arbuus, kg" (1.59 €) |
| Fruits & vegetables | Barbora "Kurk lühike, kg" (2.49 €); Rimi "Kurk lühike kg" (2.59 €); Selver "Eesti lühike kurk, kg" (3.99 €); Selver "Kurk poolpikk, kg" (5.59 €) |
| Fruits & vegetables | Barbora "Õun pakitud 1kl., kg" (1.79 €); Selver "Õun Eesti (erinevad sordid), kg" (5.19 €); Selver "Õun Eesti, erinevad sordid, kg" (4.69 €) |
| Fruits & vegetables | Rimi "Roheline sibul pakitud 100g" (1.89 €); Selver "Roheline sibul, 100 g" (2.29 €); Selver "Roheline sibul, 100 g" (2.29 €) |
| Fruits & vegetables | Rimi "Mais keedetud 450g" (1.99 €); Selver "Mais vaakumis, 450 g" (2.99 €); Selver "Mais poolikud vaakumis, 450 g" (2.99 €) |
| Fruits & vegetables | Rimi "Mahe Idutrio Lõunaidu 150g" (1.99 €); Selver "Mahe Mungoaidu, LÕUNAIDU, 150 g" (1.89 €); Selver "Mahe idusalat, LÕUNAIDU, 150 g" (1.99 €) |
| Drinks | Barbora "Karastusjook COCA-COLA 1.5L*2tk" (3.59 €); Barbora "Karastusjook COCA-COLA 1.5L" (2.25 €); Rimi "Karastusjook Coca-Cola 1,5l" (2.25 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 1,5 L" (2.29 €) |
| Drinks | Barbora "Karastusjook COCA-COLA Zero 1.5L*2tk" (3.59 €); Barbora "Karastusjook COCA-COLA Zero 1.5L" (2.29 €); Rimi "Karastusjook Coca-Cola Zero 1,5l" (2.25 €) |
| Drinks | Barbora "Karastusjook COCA-COLA 330ml" (1.21 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 330 ml" (1.21 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 330 ml" (1.29 €) |
| Meat | Barbora "Kodune hakkliha RAKVERE,600g" (6.99 €); Rimi "Hakkliha kodune Rakvere 400g" (3.59 €); Selver "Kodune hakkliha, RAKVERE LK, 400 g" (3.55 €); Selver "Kodune hakkliha, RAKVERE LK, 600 g" (6.99 €) |
| Meat | Rimi "Sea kaelakarbonaad Rakvere kg" (8.49 €); Selver "Sea kaelakarbonaad, RAKVERE LK, kg" (5.99 €); Selver "Sea kaelakarbonaad, RAKVERE LK, kg" (10.15 €) |
| Rice & grains | Barbora "Pikateraline riis BOSTO 4x125g" (2.09 €); Barbora "Pikateraline riis BOSTO 4x125g" (2.09 €); Rimi "Pikateraline riis Bosto 4x125g" (2.09 €); Selver "Pikateraline riis 4 x 125 g, BOSTO, 500 g" (2.25 €) |
| Rice & grains | Barbora "Basmati riis BOSTO 4x125g" (3.79 €); Barbora "Basmati riis BOSTO 4x125g" (3.79 €); Rimi "Basmati riis Bosto 4x125g" (3.29 €); Selver "Basmati riis 4 x 125 g, BOSTO, 500 g" (2.89 €) |
| Rice & grains | Barbora "Aurutatud riis BALTIX 1kg" (2.39 €); Barbora "Aurutatud riis BALTIX 1kg" (2.39 €); Selver "Aurutatud riis, BALTIX, 1 kg" (2.49 €) |
| Rice & grains | Barbora "Pikateraline riis BALTIX 1kg" (2.12 €); Barbora "Pikateraline riis BALTIX 1kg" (2.12 €); Selver "Pikateraline riis, BALTIX, 1 kg" (2.12 €); Selver "Pikateraline riis, BALTIX, 1kg" (0.49 €) |
| Rice & grains | Barbora "Basmati riis VESKI MATI 500g" (2.69 €); Barbora "Basmati riis VESKI MATI 500g" (2.69 €); Rimi "Riis basmati Veski Mati 500g" (2.75 €); Selver "Basmati riis, VESKI MATI, 500 g" (2.69 €) |
| Rice & grains | Barbora "Pikateraline riis TARTU MILL1kg" (2.53 €); Barbora "Pikateraline riis TARTU MILL1kg" (2.53 €); Rimi "Riis pikateraline Tartu Mill 1kg" (2.75 €); Selver "Pikateraline riis, TARTU MILL, 1 kg" (2.53 €) |
| Rice & grains | Barbora "Aurutatud riis TARTU MILL 1kg" (2.92 €); Barbora "Aurutatud riis TARTU MILL 1kg" (2.92 €); Rimi "Riis aurutatud Tartu Mill 1kg" (2.99 €) |
| Rice & grains | Barbora "Aurutatud riis TARTU MILL 4x125g" (1.89 €); Barbora "Aurutatud riis TARTU MILL 4x125g" (1.89 €); Rimi "Riis aurutatud Tartu Mill 4x125g" (1.89 €) |
| Rice & grains | Barbora "Riis Poke bowl BOSTO 500g" (3.65 €); Barbora "Riis Poke bowl BOSTO 500g" (3.65 €); Rimi "Riis Bosto Poke Bowl 500g" (3.69 €); Selver "Poke bowl riis, BOSTO, 500 g" (3.65 €) |
| Cooking oil | Rimi "Ekstra väärisoliiviõli Borges 500ml" (9.65 €); Selver "Ekstra väärisoliiviõli, BORGES, 500 ml" (10.49 €); Selver "Ekstra väärisoliiviõli, BORGES, 500 ml" (11.69 €) |
| Coffee | Barbora "Jahvatatud kohv Espresso LAVAZZA 250g" (9.99 €); Barbora "Jahvatatud kohv LAVAZZA Espresso 250g" (10.99 €); Rimi "Kohv jahvatatud Lavazza Espresso 250g" (9.99 €) |
| Sausages | Barbora "Keeduvorst Laste RAKVERE, 300g" (1.55 €); Selver "Keeduvorst Laste, RAKVERE LK, 190 g" (1.69 €); Selver "Keeduvorst Laste, RAKVERE LK, 300 g" (2.12 €); Selver "Keeduvorst Laste, RAKVERE, kg" (6.99 €) |
| Sausages | Barbora "Doktorivorst RAKVERE, 600g" (3.95 €); Rimi "Doktorivorst Rakvere 300g" (1.55 €); Rimi "Doktorivorst Rakvere 600g" (3.95 €); Selver "Doktorivorst, RAKVERE LK, 600 g" (3.95 €) |
| Sausages | Barbora "Juustuvorst RAKVERE, 600g" (4.45 €); Rimi "Juustuvorst Rakvere 300g" (1.55 €); Rimi "Juustuvorst Rakvere 600g" (4.49 €); Selver "Juustuvorst, RAKVERE LK, 600 g" (4.46 €) |
| Sausages | Barbora "Lastevorst RAKVERE, 600g" (3.85 €); Rimi "Lastevorst Rakvere 600g" (3.69 €); Rimi "Lastevorst Rakvere 300g" (1.55 €); Selver "Lastevorst, RAKVERE LK, 600 g" (3.85 €) |
| Sausages | Barbora "Lastevorst VALLA, 600g" (2.09 €); Rimi "Lastevorst Valla 1kg" (2.29 €); Rimi "Lastevorst Valla 240g" (0.92 €); Selver "Lastevorst, VALLA, 240 g" (1.15 €) |
| Sausages | Barbora "Pereviiner RAKVERE, 500g" (2.29 €); Rimi "Pereviiner Rakvere 900g" (3.59 €); Rimi "Pereviiner Rakvere 500g" (1.99 €); Selver "Pereviiner, RAKVERE LK, 500 g" (1.99 €) |
| Sausages | Barbora "Täissuitsuvorst Pepperoni OSKAR, 210g" (4.89 €); Rimi "Täissuitsuvorst Pepperoni Oskar 210g" (4.89 €); Selver "Pepperoni täissuitsuvorst, OSKAR, 210 g" (4.89 €); Selver "Täissuitsuvorst Pepperoni, OSKAR, 80 g" (1.79 €) |
| Sausages | Barbora "Palermo salaami RAKVERE,200g" (3.39 €); Rimi "Salaami Palermo Rakvere 110g" (2.69 €); Rimi "Salaami Palermo Rakvere 200g" (3.45 €); Selver "Palermo salaami , RAKVERE LK, 200 g" (3.49 €); Selver "Palermo salaami, RAKVERE, 110 g" (2.79 €) |
| Sausages | Barbora "Suitsuvorst Tamula WÕRO,350g" (2.39 €); Barbora "Suitsuvorst Tamula WÕRO,150g" (1.35 €); Rimi "Suitsuvorst Tamula Wõro 150g" (1.19 €); Rimi "Suitsuvorst Tamula Wõro 350g" (2.45 €) |
| Sausages | Barbora "E-vaba täissuitsuvorst OSKAR,210g" (3.79 €); Rimi "Täissuitsuvorst E-vaba Oskar 210g" (3.79 €); Selver "Täissuitsuvorst E-vaba, OSKAR, 210 g" (5.22 €); Selver "Täissuitsuvorst E-vaba, OSKAR, 120 g" (3.29 €) |
| Sausages | Rimi "Lastevorst Lihakas Rakvere 360g" (3.45 €); Selver "Lihakas Lastevorst, RAKVERE LK, 360 g" (3.85 €); Selver "Lihakas lastevorst, RAKVERE, 170 g" (2.08 €) |
| Ham & cold cuts | Barbora "Suitsusingike RAKVERE, 350g" (4.99 €); Rimi "Suitsusingike Rakvere 130g" (2.29 €); Rimi "Suitsusingike Rakvere 350g" (4.99 €); Selver "Suitsusingike, RAKVERE LK, 350 g" (5.99 €) |
| Ham & cold cuts | Rimi "Suitsupeekon Rakvere 130g" (3.15 €); Selver "Rakvere suitsupeekon, RAKVERE, kg" (11.99 €); Selver "Suitsupeekon, RAKVERE LK, 130 g" (3.13 €) |
| Fish & seafood | Rimi "Sprotid õlis Rannaküla 160g" (2.85 €); Selver "Sprotid õlis, RANNAKÜLA, 160 g" (2.99 €); Selver "Sprotid õlis, RANNAKÜLA, 160 g" (2.85 €) |
| Diapers & baby wipes | Barbora "Püksmähkm.HUGGIES ExtraCare5 12-17kg34tk" (25.99 €); Barbora "Püksmähkmed HUGGIES S5 Girl 12-17kg 34tk" (18.25 €); Barbora "Püksmähkmed HUGGIES S5 Boy 12-17kg 34tk" (18.25 €); Rimi "Püksmähkmed Huggies Extra Care 5 12-17kg 34tk" (25.99 €); Selver "Püksmähkmed Extra Care 5, HUGGIES, 12-17kg/34tk" (26.90 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S4 Mega Girl 52tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S4 Mega Boy 52tk" (20.29 €); Rimi "Püksmähkmed Huggies 4 Girl 9-14 kg 52 tk" (12.49 €); Rimi "Püksmähkmed Huggies 4 Boy 9-14kg 52tk" (12.49 €); Selver "Püksmähkmed Pants Little Movers 4 Boy 9-14kg, HUGGIES, 52 tk" (20.32 €); Selver "Püksmähkmed Pants Little Movers 4 Girl 9-14kg, HUGGIES, 52 tk" (20.32 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S5 Boy 12-17kg 48tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S5 Girl 12-17kg 48tk" (20.29 €); Rimi "Püksmähkmed Huggies 5 Girl,12-17kg 48tk" (12.49 €); Selver "Püksmähkmed Pants Little Movers 5 Boy 12-17kg, HUGGIES, 48 tk" (20.32 €); Selver "Püksmähkmed Pants Little Movers 5 Girl 12-17kg, HUGGIES, 48 tk" (20.32 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed PAMPERS s5,22tk" (8.69 €); Barbora "Püksmähkmed PAMPERS Night VP S5 22tk" (9.49 €); Rimi "Püksm. Pampers Night Pants VP S5,22tk" (12.69 €); Selver "Öö püksmähkmed VP S5, PAMPERS, 22tk" (12.69 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed PAMPERS S6,19tk" (8.69 €); Barbora "Püksmähkmed PAMPERS Night VP S6 19tk" (9.49 €); Rimi "Püksm. Pampers Night Pants VP S6,19tk" (12.69 €); Selver "Öö püksmähkmed VP S6, PAMPERS, 19tk" (12.69 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES Girl S4 9-14kg 72tk" (27.89 €); Barbora "Püksmähkmed HUGGIES Boy S4 9-14kg 72tk" (27.89 €); Selver "Püksmähkmed Pants Little Movers 4 Box Boy, HUGGIES, 9-14kg/72 tk" (29.90 €); Selver "Püksmähkmed Pants Little Movers 4 Box Girl, HUGGIES,  9-14 kg/72 tk" (29.90 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES Girl S5 12-17kg 68tk" (27.89 €); Barbora "Püksmähkmed HUGGIES Boy S5 12-17kg 68tk" (27.89 €); Selver "Püksmähkmed Pants 5 Box Boy, HUGGIES, 12-17 kg/68 tk" (29.90 €); Selver "Püksmähkmed Pants Little Movers 5 Box Girl, HUGGIES, 12-17 kg/68 tk" (29.90 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES Girl S6 15-25kg 60tk" (27.89 €); Barbora "Püksmähkmed HUGGIES Boy S6 15-25kg 60tk" (27.89 €); Selver "Püksmähkmed Pants Little Movers 6 Box Boy, HUGGIES, 15-25 kg/60 tk" (29.90 €); Selver "Püksmähkmed Pants Little Movers 6 Box Girl, HUGGIES, 15-25 kg/60 tk" (29.90 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S3 Mega Boy 58tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S3 Mega Girl 58tk" (20.29 €); Rimi "Püksmäh. Huggies Meg.girl S3 6-11kg 58tk" (12.49 €); Rimi "Püksmähkmed Huggies Mega Boy S3, 6-11kg 58tk" (12.49 €); Selver "Püksmähkmed Pants Little Movers 3 Boy 6-11kg, HUGGIES, 58 tk" (20.32 €); Selver "Püksmähkmed Pants Little Movers 3 Girl 6-11kg, HUGGIES, 58 tk" (20.32 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S6 Girl 15-25kg 44tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S6 Boy 15-25kg 44tk" (20.29 €); Rimi "Püksmäh. Huggies Mega Boy S6, 15-25kg 44tk" (12.49 €); Rimi "Püksmähkmed Huggies 6 Girl,15-25kg 44tk" (12.49 €); Selver "Püksmähkmed Pants 6 Boy, HUGGIES, 15-25kg/44tk" (20.32 €); Selver "Püksmähkmed Pants Little Movers 6 Girl 15-25kg, HUGGIES, 44 tk" (20.32 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed PAMPERS S4 9-15 kg 25tk" (8.09 €); Barbora "Püksmähkmed PAMPERS Night VP S4 25tk" (9.49 €); Rimi "Püksm. Pampers Night Pants VP S4,25tk" (12.69 €); Selver "Öö püksmähkmed VP S4, PAMPERS, 25tk" (12.69 €) |
| Diapers & baby wipes | Barbora "Niisked salvrätik.PAMPERS Sensit.PF 52tk" (2.89 €); Barbora "Niisk.salvrätik.PAMPERS Fresh Clean 52tk" (2.89 €); Rimi "Niisked salvrätikud Pampers Sensitive 52tk" (1.55 €); Rimi "Niis. salv.r. Pampers Fresh Clean Pl.Fr. 52tk" (2.69 €); Selver "Niisked salvrätikud Sensitive PF (plastic free), Pampers, 52tk" (1.99 €) |
| Diapers & baby wipes | Barbora "Niisk.salvr.HUGGIES Sensit.ExtraCare48tk" (4.09 €); Barbora "Niisked salvrätikud HUGGIES Pure 48tk" (3.19 €); Barbora "Niisked salvr. HUGGIES Natural Care 48tk" (3.19 €); Rimi "Niisked salvrätikud Huggies Pure 48tk" (3.29 €); Rimi "Niisk. salvrät. Huggies Extra Care Sens. 48tk" (4.39 €); Selver "Niisked salvrätikud Pure, HUGGIES, 48 tk" (3.39 €) |
| Diapers & baby wipes | Barbora "Niisked salvrätikud PAMPERS Water,3x60tk" (10.99 €); Barbora "Niisk.salvr.PAMPERS AquaSoftTouch,3x60tk" (13.49 €); Rimi "Niisked salvrätikud Pampers Water 3x60tk" (10.49 €) |
| Diapers & baby wipes | Barbora "Niisked salvrätikud PAMPERS Water, 60tk" (2.99 €); Barbora "Niisk.salvr.PAMPERS Aqua Soft Touch 60tk" (5.29 €); Rimi "Niisked salvrätikud Pampers Water 60tk" (3.59 €); Rimi "Niisked salv.r. Pampers Aqua Soft Touch 60tk" (4.69 €) |

## 3. Unclassified

No recognized type and no recognized brand on any side — never had a reliable comparison to begin with.

| Store | Name | Price |
|---|---|---|
| Barbora | Punane sõstar, 125g | 4.99 € |
| Barbora | Eesti sibula mix võrgus, 1kg | 3.29 € |
| Rimi | Mahe pohl Eesti 250g | 4.79 € |
| Selver | Marineeritud kuuseriisikad, 450 g | 5.99 € |
| Rimi | Must tee mango-virsiku maitseline 20x1,7g | 2.75 € |
| Rimi | Roheline tee mangomaitseline 20x1,5g | 2.75 € |
| Barbora | Marineeritud angersäga, 250g | 7.69 € |

## 4. Possible matches to check by hand

Not matched automatically — just a list. Same real brand, same size, same qualifiers/variant/fat %, and the leftover descriptor words differ by exactly one (a single addition, removal, or swap). Capped at 30 pairs per category.

### Fruits & vegetables (2)

| Item A | Item B |
|---|---|
| Barbora "Aurutatud punapeet KADARBIKU,500g" (1.99 €) | Rimi "Hapukapsas Kadarbiku 500g" (1.79 €) |
| Barbora "Peakapsa Kimchi 300g" (3.59 €) | Rimi "Punase peakapsa Kimchi Kadarbiku 300g" (3.59 €) |

### Dairy (3)

| Item A | Item B |
|---|---|
| Barbora "Koorene jogurt FARMI apelsin&šok., 400g" (1.79 €) | Rimi "Koorene jogurt apel.-šokol. Farmi 400g" (1.79 €) |
| Barbora "Jogurt ACTIVIA metsamarja, 4x120g" (2.79 €) | Selver "Jogurt maasika 4x120g, ACTIVIA, 480 g" (3.19 €) |
| Barbora "Jogurt ACTIVIA metsamarja, 4x120g" (2.79 €) | Selver "Jogurt kirsi 4x120g, ACTIVIA, 480 g" (3.19 €) |

### Bread (6)

| Item A | Item B |
|---|---|
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Rimi "Täisteravormileib Ruks Leibur 300g" (1.05 €) |
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Selver "Täistera vormileib Ruks, LEIBUR, 300 g" (0.99 €) |
| Barbora "Koorikleib Rukkipala LEIBUR 6tk(330g)" (1.29 €) | Selver "Rukkipala, LEIBUR, 330 g" (0.95 €) |
| Barbora "Pagari röst täistera 430g" (1.59 €) | Selver "Pagari Haputaina röst, EESTI PAGAR, 430 g" (1.59 €) |
| Rimi "Sai Perenaise Eesti Pagar 320g" (0.89 €) | Selver "Perenaise sai viilutatud, EESTI PAGAR, 320 g" (0.97 €) |
| Rimi "Hea Sai Eesti Pagar 300g" (0.55 €) | Selver "Hea sai viilutatud, EESTI PAGAR, 300 g" (0.55 €) |

### Drinks (30)

| Item A | Item B |
|---|---|
| Barbora "Looduslik mineraalvesi HAAGE 1l,g-ta" (1.09 €) | Rimi "Mineraalvesi looduslik Haage 1l" (1.15 €) |
| Barbora "Looduslik mineraalvesi HAAGE 1l,g-ta" (1.09 €) | Rimi "Karb. looduslik mineraalvesi Haage 1l" (1.15 €) |
| Barbora "Looduslik mineraalvesi HAAGE 1l,g-ta" (1.09 €) | Selver "Mullita looduslik mineraalvesi, HAAGE, 1 L" (1.19 €) |
| Barbora "Looduslik mineraalvesi HAAGE 6x1l,g-ta" (6.49 €) | Selver "Mullita looduslik mineraalvesi, HAAGE, 6 x 1L" (6.99 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Sidruni, VÄRSKA, 1,5 L" (1.55 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Originaal aluseline gaasita, VÄRSKA, 1,5 L" (1.68 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Granaatõun, VÄRSKA, 1,5 L" (1.55 €) |
| Barbora "Looduslik karb.mineraalvesi BORJOMI 6x1L" (14.49 €) | Selver "Karboniseeritud looduslik mineraalvesi 6-pakk, BORJOMI, 6 x 1 L" (14.99 €) |
| Barbora "Mineraalvesi VYTAUTAS 1L,g-tud" (0.99 €) | Selver "Mineraalvesi, VYTAUTAS, 1 L" (0.90 €) |
| Barbora "Mineraalvesi VICHY Looduslik g-tud 1.5L" (0.80 €) | Selver "Looduslik mineraalvesi, VICHY, 1,5 L" (0.80 €) |
| Barbora "Loodus.karbon.mineraalvesi BORJOMI 330ml" (1.25 €) | Rimi "Mineraalvesi karboniseeritud Borjomi 0,33l" (1.29 €) |
| Barbora "Kergelt gaseeritud vesi AURA Mg 500ml" (1.29 €) | Selver "Vesi kergelt gaseeritud, AURA, 500 ml" (0.56 €) |
| Barbora "Vesi AURA FRUIT Mustikas 1.5l" (1.35 €) | Selver "Vesi Ananass, AURA FRUIT, 1,5 L" (1.39 €) |
| Barbora "Vesi AURA FRUIT Mustikas 500ml" (0.86 €) | Selver "Vesi Ananass, AURA FRUIT, 500 ml" (0.85 €) |
| Barbora "Vesi AURA FRUIT granadilli 1.5L" (1.49 €) | Selver "Vesi Ananass, AURA FRUIT, 1,5 L" (1.39 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Selver "Jõhvikanektar, CIDO, 1 L" (2.19 €) |
| Barbora "Astelpaju nektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) |
| Barbora "Astelpaju-mustikanektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) |
| Barbora "Karastusjook LIMONAAD traditsioon. 500ml" (0.79 €) | Rimi "Karastusjook tradit. limonaad A.Le Coq 0,5l" (0.79 €) |
| Barbora "Karastusjook LIMONAAD traditsioon. 1,5L" (1.55 €) | Rimi "Karastusjook tradit. limonaad A.Le Coq 1,5l" (1.59 €) |
| Barbora "Karastusjook,ploomimaitsel.,KELLUKE 1.5l" (1.59 €) | Selver "Limonaad Kelluke ploomi, A. LE COQ, 1,5 L" (1.62 €) |
| Barbora "Karastusjook PEPSI MAX 1.5L" (1.99 €) | Selver "Karastusjook Pepsi Zero, PEPSI, 1,5 L" (2.02 €) |
| Barbora "Karastusjook PEPSI MAX 1.5L" (1.99 €) | Selver "Karastusjook Pepsi Lemon, PEPSI, 1,5 l" (2.02 €) |
| Barbora "Karastusjook vaarika KELLUKE 1.5L" (1.59 €) | Selver "Limonaad Kelluke vaarika, A. LE COQ, 1,5 l" (1.19 €) |
| Barbora "Karastusjook BORJOMI Limonati pirni330ml" (1.49 €) | Rimi "Karastusjook Tarhun Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati tsitrus 330ml" (1.49 €) | Rimi "Kar.jook pirnimait. Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati tsitrus 330ml" (1.49 €) | Rimi "Kar.jook mandariini Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati tsitrus 330ml" (1.49 €) | Rimi "Kar.jook tsitruse Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati mandariin330ml" (1.49 €) | Rimi "Kar.jook pirnimait. Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati mandariin330ml" (1.49 €) | Rimi "Kar.jook mandariini Limonati Borjomi 0,33l" (1.55 €) |

### Meat (5)

| Item A | Item B |
|---|---|
| Barbora "Kirsi-rum.grill-liha seaväl.RAKVERE,580g" (5.59 €) | Selver "Kirsi-rummimarinaadis grill-liha seavälisfileest, RAKVERE LK, 580 g" (5.99 €) |
| Barbora "Grill-liha Meistrite NÕO,450g" (6.49 €) | Rimi "Meistrite grill-liha sealihast Nõo 450g" (5.99 €) |
| Barbora "Br.poolkoivad jogurti-tilli TALLEGG,800g" (3.75 €) | Selver "Broileri poolkoivad jogurti-tillimarinaadis, TALLEGG, 800 g" (4.99 €) |
| Rimi "Armeenia šašlõkk seakaelakarb. Steff 600g" (6.29 €) | Selver "Šašlõkk seakaelakarbonaadist Armeenia, STEFF, 600 g" (7.99 €) |
| Rimi "Armeenia šašlõkk seakaelakarb. Steff 600g" (6.29 €) | Selver "Šašlõkk broilerikintsulihast Armeenia, STEFF, 600 g" (7.99 €) |

### Pasta (30)

| Item A | Item B |
|---|---|
| Barbora "Makaronid lipsukesed BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Makaronid lipsukesed BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Makaronid lipsukesed BARILLA 500g" (1.64 €) | Selver "Pasta Tagliatelle, BARILLA, 500 g" (4.59 €) |
| Barbora "Spagetid BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Spagetid BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Spagetid BARILLA 500g" (1.64 €) | Rimi "Pasta Spaghetti Integrale Barilla 500g" (2.55 €) |
| Barbora "Spagetid BARILLA 500g" (1.64 €) | Selver "Pasta Tagliatelle, BARILLA, 500 g" (4.59 €) |
| Barbora "Makaronid spiraalid BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Makaronid spiraalid BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Makaronid spiraalid BARILLA 500g" (1.64 €) | Selver "Pasta Tagliatelle, BARILLA, 500 g" (4.59 €) |
| Barbora "Spagetid n.5 PANZANI 500g" (1.99 €) | Rimi "Makaronid Spaghetti nr.5 Panzani 500g" (2.19 €) |
| Barbora "Spagetid n.5 PANZANI 500g" (1.99 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaronid Serpentini PANZANI 500g" (1.72 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaron.teokarbid Conchiglie PANZANI500g" (1.49 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Lasanjeplaadid BARILLA 500g" (3.29 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Lasanjeplaadid BARILLA 500g" (3.29 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Lasanjeplaadid BARILLA 500g" (3.29 €) | Selver "Pasta Tagliatelle, BARILLA, 500 g" (4.59 €) |
| Barbora "Makaronid Vermicelli PANZANI 500g" (1.49 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaronid Risoni BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Makaronid Risoni BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Makaronid Risoni BARILLA 500g" (1.64 €) | Selver "Pasta Tagliatelle, BARILLA, 500 g" (4.59 €) |
| Barbora "Makaronid Tagliatelle PANZANI 500g" (2.54 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Spagetid 3-minuti PANZANI 500g" (1.94 €) | Rimi "Makaronid Spaghetti nr.5 Panzani 500g" (2.19 €) |
| Barbora "Spagetid 3-minuti PANZANI 500g" (1.94 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Spagetid Premium PANZANI 500g" (1.94 €) | Rimi "Makaronid Spaghetti nr.5 Panzani 500g" (2.19 €) |
| Barbora "Spagetid Premium PANZANI 500g" (1.94 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaronid Fusilli Premium PANZANI 500g" (1.94 €) | Rimi "Makaronid 3-värvilised Fusilli Panzani 500g" (2.59 €) |
| Barbora "Makaronid Fusilli Premium PANZANI 500g" (1.94 €) | Selver "Kolmevärviline spiraal Fusilli, PANZANI, 500 g" (2.59 €) |
| Barbora "Makaronid Fusilli Premium PANZANI 500g" (1.94 €) | Selver "Spiraal Fusilli international, PANZANI, 500 g" (1.59 €) |
| Barbora "Makaronid Fusilli 3-minuti PANZANI 500g" (1.94 €) | Rimi "Makaronid 3-värvilised Fusilli Panzani 500g" (2.59 €) |

### Rice & grains (15)

| Item A | Item B |
|---|---|
| Barbora "Riis Risotto Mediterraneo BOSTO 500g" (3.79 €) | Rimi "Riis Mediterraneo Bosto 500g" (3.79 €) |
| Barbora "Pikateraline pruun riis BOSTO 4x125g" (2.25 €) | Selver "Pruun Basmati riis 4x125g, BOSTO, 500 g" (3.81 €) |
| Barbora "Risoto riis VESKI MATI 500g" (2.39 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Jasmiini riis VESKI MATI 500g" (2.45 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Ümarateraline riis BALTIX 1kg" (2.73 €) | Selver "Pudruriis (Ümarateraline riis), BALTIX, 1 kg" (2.73 €) |
| Barbora "Pikateraline riis TARTU MILL 4x 125g" (1.69 €) | Selver "Riis aurutatud (sõmer) 4x125g, TARTU MILL, 500 g" (1.77 €) |
| Barbora "Pudruriis TARTU MILL 1kg" (2.99 €) | Selver "Odrakruup, TARTU MILL, 1 kg" (1.43 €) |
| Barbora "Pudruriis TARTU MILL 1kg" (2.99 €) | Selver "Odratang, TARTU MILL, 1 kg" (1.37 €) |
| Barbora "Sushi-riis VESKI MATI 500g" (2.49 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Risotoriis Carnaroli RISO SCOTTI 500g" (4.89 €) | Selver "Risotoriis Arborio, RISO SCOTTI, 500 g" (3.65 €) |
| Barbora "Kinoa kolmevärviline BOSTO 4x75g" (3.79 €) | Selver "Quinoa, kolmevärviline 4x75g, BOSTO, 300 g" (3.79 €) |
| Barbora "Kinoa valge BOSTO 4x75g" (3.51 €) | Selver "Quinoa, valge 4x75g, BOSTO, 300 g" (3.51 €) |
| Barbora "Odrakruup VESKI MATI 500g" (0.99 €) | Selver "Jasmiiniriis, VESKI MATI, 500 g" (2.50 €) |
| Barbora "Odrakruup VESKI MATI 500g" (0.99 €) | Selver "Riisimanna, VESKI MATI, 500 g" (1.72 €) |
| Barbora "Odrakruup VESKI MATI 500g" (0.99 €) | Selver "Tatar, VESKI MATI, 500 g" (1.65 €) |

### Flour & sugar (14)

| Item A | Item B |
|---|---|
| Barbora "Nisujahu k/s T550 KALEW 1,0 kg" (1.19 €) | Selver "Nisujahu T550, KALEW, 1 kg" (1.19 €) |
| Barbora "Pruun tükksuhkur DAN SUKKER 500g" (2.56 €) | Selver "Tume tükksuhkur, DAN SUKKER, 500 g" (2.56 €) |
| Barbora "Pruun tükksuhkur DAN SUKKER 500g" (2.56 €) | Selver "Kõva tükksuhkur, DAN SUKKER, 500 g" (1.59 €) |
| Barbora "Karamellsuhkur DANSUKER 500g" (2.69 €) | Selver "Karamellsuhkur, DAN SUKKER, 500 g" (2.69 €) |
| Barbora "Moosisuhkur DAN SUKKER 1kg" (2.89 €) | Rimi "Suhkur moosisuhkur Dan Sukker 1kg" (2.89 €) |
| Barbora "Granuleeritud suhkur BILLINGTON'S 1kg" (4.75 €) | Selver "Suhkur granuleeritud, BILLINGTONS, 1 kg" (4.77 €) |
| Barbora "Suhkur Demerara BILLINGTON'S 500g" (2.49 €) | Selver "Suhkur Demerara, BILLINGTONS, 500 g" (2.53 €) |
| Barbora "Kristall.fruktoos ALVO 500g" (4.09 €) | Rimi "Fruktoos Alvo 500g" (4.09 €) |
| Rimi "Pitsajahu Tartu Mill 400g" (1.59 €) | Selver "Riivsai, TARTU MILL, 400 g" (1.31 €) |
| Rimi "Pitsajahu Tartu Mill 400g" (1.59 €) | Selver "Vahvlijahu, TARTU MILL, 400 g" (2.29 €) |
| Rimi "Pitsajahu Tartu Mill 400g" (1.59 €) | Selver "Plaadikook, TARTU MILL, 400 g" (2.09 €) |
| Rimi "Marmelaadisuhkur Dansukker 330g" (1.45 €) | Selver "Marmelaadisuhkur, DAN SUKKER, 330 g" (1.41 €) |
| Rimi "Muscovado suhkur tume Dansukker 400g" (2.59 €) | Selver "Tume Muscovado suhkur, DAN SUKKER, 400 g" (2.43 €) |
| Rimi "Suhkur valge DanSukker ökoloogiline 1kg" (3.29 €) | Selver "Ökoloogiline valge suhkur, DAN SUKKER, 1 kg" (3.23 €) |

### Cooking oil (8)

| Item A | Item B |
|---|---|
| Barbora "Ekstra-neitsioliiviõli BORGES 1L" (13.49 €) | Selver "Ekstra väärisoliiviõli, BORGES, 1 l" (16.99 €) |
| Barbora "Rapsiõli OILIO 1L" (3.05 €) | Selver "Päevalilleõli, OILIO, 1 l" (3.45 €) |
| Barbora "Org. päevalilleõli BIONATURALIS 1L" (8.39 €) | Rimi "Päevalilleõli Bionaturalis öko 1l" (8.39 €) |
| Barbora "Org.külmpress kookosõli THAI CHOICE 500ml" (12.69 €) | Selver "Orgaaniline külmpress kookosõli, THAI CHOICE, 500 ml" (12.69 €) |
| Barbora "Mahe kookosõli külmpres.LOODUSVÄGI,500ml" (8.62 €) | Selver "Mahe kookosõli lõhnatu, LOODUSVÄGI, 500 ml" (8.99 €) |
| Barbora "Avokaadoõli GLORIA 250ml" (5.59 €) | Selver "Avokaadoõli, rafineerimata, GLORIA, 250 ml" (5.58 €) |
| Barbora "Extra väärisoliiviõli KALEW 1L" (15.99 €) | Selver "Ekstra väärisoliiviõli, KALEW, 1l" (14.99 €) |
| Barbora "Fritüürõli OILIO 1L" (4.45 €) | Selver "Päevalilleõli, OILIO, 1 l" (3.45 €) |

### Cheese (30)

| Item A | Item B |
|---|---|
| Barbora "Valge juust FITAKI Original, 500g" (6.19 €) | Rimi "Juust Fitaki Original 500g" (5.49 €) |
| Barbora "Sul.juust MEREVAIK krevettidega 200g" (1.49 €) | Rimi "Sulatatud juust krevettidega Merevaik 200g" (1.99 €) |
| Barbora "Juust VALIO Edam, 200g" (2.55 €) | Rimi "Juust Tilsit Valio 200g" (2.59 €) |
| Barbora "Toorjuust FARMI originaal 150g" (2.25 €) | Selver "Toorjuust, FARMI, 150 g" (2.30 €) |
| Barbora "Toorjuustukreem PHILADELPHIA Milka 175g" (3.99 €) | Rimi "Toorjuust Milka Philadelphia 175g" (2.99 €) |
| Barbora "Pehme valge juust ATHENA Classic, 500g" (5.23 €) | Selver "Pehme valge juust, ATHENA, 500 g" (5.22 €) |
| Barbora "Valgehall.juust Camembert CASTELLO,125g" (3.79 €) | Rimi "Juust Camembert Castello 125g" (3.79 €) |
| Barbora "Pehme valge juust ATHENA Classic, 200g" (2.15 €) | Selver "Pehme valge juust, ATHENA, 200 g" (2.18 €) |
| Barbora "Juust EESTI viilutatud, 350g" (4.49 €) | Selver "Eesti Juust viilud, ESTOVER, 350 g" (2.99 €) |
| Barbora "Hallitusjuust Gorgonzola IGOR Dolce,200g" (3.49 €) | Rimi "Sinihallitusjuust Gorgonzola Dolce Igor 200g" (3.49 €) |
| Barbora "Juust täispiimast EESTI viilutatud, 450g" (3.89 €) | Selver "Eesti Juust täispiimast viilud, ESTOVER, 450 g" (6.09 €) |
| Barbora "Juust täispiimast EESTI viilutatud, 180g" (2.63 €) | Selver "Eesti Juust täispiimast viilud, ESTOVER, 180 g" (2.63 €) |
| Barbora "Juust täispiimast ALMA viilutatud, 500g" (6.19 €) | Rimi "Juust täispiimast viil. Alma 500g" (6.19 €) |
| Barbora "Juust Gouda NOPRI karulauguga, 250g" (3.89 €) | Selver "Gouda Karulauguga, NOPRI, 250 g" (5.22 €) |
| Barbora "Juustuampsud MO SAAREMAA, 200g" (3.09 €) | Rimi "Juustuampsud klassik. MO Saaremaa 200g" (2.29 €) |
| Barbora "Juust Royal Gouda VALIO Black viil.,150g" (2.65 €) | Rimi "Juust Royal Gouda Yellow viil. Valio 150g" (1.59 €) |
| Barbora "Juust Saaremaa MO SAAREMAA viil., 450g" (5.88 €) | Rimi "Juust Saaremaa viilutatud MO Saaremaa 450g" (4.59 €) |
| Barbora "Sinihallitusjuust GOLDEN MONARH, 100g" (2.15 €) | Rimi "Sinihallitusjuust Golden Monarch 100g" (2.15 €) |
| Barbora "Juust Gouda NOPRI kukeseene, 250g" (4.24 €) | Selver "Gouda Kukeseene, NOPRI, 250 g" (5.68 €) |
| Barbora "Juust Gouda NOPRI kukeseene, 250g" (4.24 €) | Selver "Juust gouda jalapeno, NOPRI, 250 g" (5.22 €) |
| Barbora "Juust Saare Leet MO SAAREMAA viil., 450g" (6.19 €) | Rimi "Juust Saare Leet viilutatud MO Saaremaa 450g" (5.99 €) |
| Rimi "Juust Atleet Light viil. Valio 150g" (2.05 €) | Selver "Juust Atleet Light viilud, VALIO, 150 g" (2.08 €) |
| Rimi "Juust Cheddar Valio 250g" (3.59 €) | Selver "Juust Atleet Cheddar, VALIO, 250 g" (3.62 €) |
| Rimi "Juust Mozzarella Galbani 125g" (1.79 €) | Selver "Mozzarella, GALBANI, 125 g" (1.82 €) |
| Rimi "Juust Brie President 125g" (1.99 €) | Selver "Brie valgehallitusjuust, PRESIDENT, 125 g" (3.24 €) |
| Rimi "Juust Burrata Granarolo 125g" (3.39 €) | Selver "Mozzarella Burrata, GRANAROLO, 125g" (3.24 €) |
| Rimi "Juust Chavroux 150g" (4.85 €) | Selver "Kitsepiimajuust, CHAVROUX, 150 g" (5.48 €) |
| Rimi "Juust MO Saaremaa Red Cheddar 280g" (4.09 €) | Selver "Cheddar juust, MO SAAREMAA, 280 g" (4.16 €) |
| Rimi "Mozzarella Synnove riivitud 200g" (2.99 €) | Selver "Riivjuust mozzarella, SYNNOVE, 200 g" (3.04 €) |
| Rimi "Brie sinihallitusjuustuga Ile de France 125g" (6.69 €) | Selver "Valgehallitusjuust Brie sinihallitusjuustuga, ILE DE FRANCE, 125 g" (6.80 €) |

### Curd & cottage cheese (2)

| Item A | Item B |
|---|---|
| Barbora "Kodujuust TERE klassikaline 4% 300g" (1.35 €) | Selver "Kodujuust 4%, TERE, 300 g" (2.12 €) |
| Rimi "Kodujuust crème brulée Alma 200g" (1.25 €) | Selver "Kodujuust crème brûlée maitseline, ALMA, 200 g" (1.68 €) |

### Cream & sour cream (5)

| Item A | Item B |
|---|---|
| Barbora "Vahukoor ALMA 35% 200ml PP" (1.65 €) | Selver "Vahukoor 35%, ALMA, 200 ml" (1.59 €) |
| Barbora "Hapukoor FARMI 20%, 200g kile" (1.15 €) | Rimi "Hapukoor 20% Farmi 200g" (1.15 €) |
| Barbora "Hapukoor FARMI 10%, 500g kile" (1.62 €) | Selver "Hapukoor 10%, FARMI, 500 g" (1.62 €) |
| Barbora "Hapukoor FARMI 20%, 500g" (1.35 €) | Selver "Hapukoor 20% kile, FARMI, 500 g" (1.69 €) |
| Barbora "Hapukoor TERE 30% tops, 300g" (2.05 €) | Rimi "Hapukoor Tere 30% 300g" (2.19 €) |

### Kefir & buttermilk (1)

| Item A | Item B |
|---|---|
| Barbora "Keefir FARMI 2,5% 1kg, kile" (0.89 €) | Selver "Keefir 2,5% kiles, FARMI, 1 kg" (0.73 €) |

### Coffee (30)

| Item A | Item B |
|---|---|
| Barbora "Kohvioad Krönung JACOBS 1 kg" (29.49 €) | Selver "Kohviuba Krönung, JACOBS, 1 kg" (21.49 €) |
| Barbora "Kohvioad Crema JACOBS 1 kg" (29.49 €) | Selver "Kohviuba Crema, JACOBS, 1 kg" (12.99 €) |
| Barbora "Kohvioad Qualita Oro LAVAZZA 1kg" (33.49 €) | Rimi "Kohvioad Lavazza Oro 1kg" (33.49 €) |
| Barbora "Kohvioad Qualita Oro LAVAZZA 1kg" (33.49 €) | Selver "Kohviuba Qualita Oro, LAVAZZA, 1 kg" (34.99 €) |
| Barbora "Kohvioad keskm.röst LÖFBERGS 1kg" (24.29 €) | Selver "Kohvioad keskmine röst, LÖFBERGS, 1 kg" (24.29 €) |
| Barbora "Kohvioad Espresso LÖFBERGS 1kg" (24.29 €) | Selver "Kohviuba Espresso, LÖFBERGS, 1 kg" (24.29 €) |
| Barbora "Kohvioad Kharisma LÖFBERGS 1kg" (24.29 €) | Selver "Kohviuba Kharisma, LÖFBERGS, 1 kg" (24.29 €) |
| Barbora "Kohviuba JACOBS Uganda&Kenya 1kg" (29.99 €) | Selver "Kohviuba Origins Uganda & Kenya, JACOBS, 1 kg" (23.49 €) |
| Barbora "Kohvioad LAVAZZA Espresso Gran Crema 1kg" (33.49 €) | Rimi "Kohvioad Barista Gran Crema Lavazza 1kg" (33.49 €) |
| Barbora "Kohvioad LAVAZZA Espresso Gran Crema 1kg" (33.49 €) | Selver "Kohvioad Lavazza Espresso Barista Gran Crema , LAVAZZA, 1 kg" (34.99 €) |
| Barbora "Kohvioad Selezione Crema SEGAFREDO 1kg" (27.39 €) | Selver "Kohvioad Selezione Crema, SEGAFREDO ZANETTI, 1 kg" (16.99 €) |
| Barbora "Kohvioad LAVAZZA Espresso Perfetto 1kg" (34.99 €) | Selver "Kohvioad Lavazza Espresso Barista Perfetto , LAVAZZA, 1 kg" (34.99 €) |
| Barbora "Kohviuba Jaanus TASUJA 1kg" (23.29 €) | Selver "Kohviuba Wahur, TASUJA, 1 kg" (24.90 €) |
| Barbora "Kohviuba Jaanus TASUJA 1kg" (23.29 €) | Selver "Espresso kohviuba Jaanus, TASUJA, 1 kg" (24.90 €) |
| Barbora "Kohvioad Caffe Crema MÖVENPICK 1kg" (25.89 €) | Selver "Café Crema kohvioad, MÖVENPICK, 1 kg" (22.90 €) |
| Barbora "Kohvioad Arabica Espresso PAULIG 1kg" (24.39 €) | Selver "Kohviuba Arabica Espresso, PAULIG, 1 kg" (23.90 €) |
| Barbora "Kovhioad OA No.2 1kg" (23.35 €) | Selver "Kohviuba No1, OA, 1 kg" (23.90 €) |
| Barbora "Kovhioad OA No.2 1kg" (23.35 €) | Selver "Kohviuba No2, OA, 1 kg" (17.99 €) |
| Barbora "Kohviuba Oa N4 1kg" (37.99 €) | Selver "Kohviuba No1, OA, 1 kg" (23.90 €) |
| Barbora "Kohviuba Oa N4 1kg" (37.99 €) | Selver "Kohviuba No2, OA, 1 kg" (17.99 €) |
| Barbora "Kohvioad Mokka PAULIG,1kg" (22.99 €) | Selver "Paulig Mokka kohviuba, PAULIG, 1kg" (21.99 €) |
| Barbora "Lahustuv kohv NESCAFÉ® CLASSIC 100g" (6.99 €) | Selver "Lahustuv kohv Classic (klaaspurk), NESCAFE, 100g" (6.99 €) |
| Barbora "Lahustuv kohv Classic NESCAFE 200g" (11.99 €) | Rimi "Lahustuv kohv Nescafe Classic Crema 200g" (11.99 €) |
| Barbora "Lahustuv kohv Classic NESCAFE 200g" (11.99 €) | Selver "Lahustuv kohv Classic (klaaspurk), NESCAFE, 200 g" (11.99 €) |
| Barbora "Lahustuv kohv NESCAFE Strong 250g" (12.19 €) | Selver "Lahustuv kohv Classic Strong, NESCAFE, 250g" (12.19 €) |
| Barbora "Lahustuv kohvijook NESCAFÉ® 3IN1 Creamy Latte 10x15g" (2.95 €) | Selver "Lahustuv kohvijook 3in1 Creamy Latte 10X15g, NESCAFE, 150 g" (3.30 €) |
| Barbora "Lahustuv kohv NESCAFÉ® CLASSIC Crema 200g" (11.99 €) | Rimi "Lahustuv kohv Nescafe Classic Crema 200g" (11.99 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 20x12.6g" (5.69 €) | Rimi "Lah. kohvijook Jacobs 3in1 Original 20x12,6g" (5.29 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 20x12.6g" (5.69 €) | Selver "Kohvijook  3in1 (kott 20x12,6g), JACOBS, 252 g" (5.29 €) |
| Barbora "Lah. kohvijook JACOBS 2in1 12.4g" (0.27 €) | Rimi "Kohvijook lahustuv 2in1 Jacobs 12,4g" (0.26 €) |

### Tea & cocoa (12)

| Item A | Item B |
|---|---|
| Barbora "Must lehetee DILMAH karp 100g" (2.21 €) | Selver "Ceyloni must lehetee, DILMAH, 100 g" (2.45 €) |
| Barbora "Must tee English Aristocratic HYLEYS100g" (1.79 €) | Selver "Must purutee English Aristocratic, HYLEYS, 100 g" (1.89 €) |
| Barbora "Must purutee TWININGS Earl Grey,100g" (6.39 €) | Rimi "Tee must Earl Grey Twinings 100g" (6.39 €) |
| Barbora "Must purutee TWININGS Earl Grey,100g" (6.39 €) | Selver "Earl Grey purutee, TWININGS, 100 g" (5.29 €) |
| Barbora "Must Tseil.tee DILMAH Premium 25x2g" (1.55 €) | Rimi "Tee must Dilmah Premium 25x2g" (2.59 €) |
| Barbora "Must tseil.tee DILMAH Premium 50x2g" (2.57 €) | Rimi "Tee must Dilmah Premium 50x2g" (4.29 €) |
| Barbora "Must tee LIPTON Mango 20x1.7g" (3.09 €) | Rimi "Must tee virsiku-mango Lipton 20x1,7g" (3.19 €) |
| Barbora "Rohel.tee The Island of Tea BASILUR 100g" (4.59 €) | Selver "Roheline purutee The Island of Tea, BASILUR, 100 g" (4.56 €) |
| Barbora "Roheline Tseiloni tee DILMAH 100g" (2.01 €) | Selver "Roheline Tseiloni purutee, DILMAH, 100 g" (3.34 €) |
| Barbora "Tee maasika-vaarikamaits.LOYD pür.20x2g" (2.75 €) | Rimi "Tee puuvilja vaarika&maasika Loyd 20x2g" (2.79 €) |
| Barbora "Tee põldmarja-mustikamaits.LOYDpür.20x2g" (2.75 €) | Rimi "Tee puuvilja põldmarja&mustika Loyd 20x2g" (2.79 €) |
| Barbora "Kakaojook NESQUIK 600g" (8.49 €) | Selver "Lahustuv kakaojook, NESQUIK, 600g" (8.49 €) |

### Cereals & oats (30)

| Item A | Item B |
|---|---|
| Barbora "Hommikuhelbed Chocapic NESTLE 375g" (4.29 €) | Rimi "Hommikueine Nestle Chocapic 375g" (3.45 €) |
| Barbora "Hommikuhelbed Cookie Crisp NESTLE 375g" (4.29 €) | Rimi "Hommikueine Nestle Cookie Crisp 375g" (4.29 €) |
| Barbora "Hommikuhelbed Lion NESTLE 400g" (4.29 €) | Rimi "Hommikueine Nestle Lion 400g" (4.29 €) |
| Barbora "Hommikuhelbed NESTLE Cookie Crisp 625g" (6.19 €) | Rimi "Hommikueine Nestle Cookie Crisp 625g" (6.19 €) |
| Barbora "Hommikuhelbed Cheerios Honey NESTLE 375g" (4.29 €) | Rimi "Hommikueine Nestle Cheerios Honey 375g" (4.29 €) |
| Barbora "Hommikuhelbed Smacks KELLOGG'S 330g" (5.19 €) | Selver "Hommikuhelbed Frosties, KELLOGG'S, 330 g" (3.85 €) |
| Barbora "Hommikuhelbed KitKat NESTLE 330g" (4.29 €) | Rimi "Hommikueine Nestle KitKat 330g" (4.29 €) |
| Barbora "Hommikusöök Coco Pops KELLOGG'S 330g" (5.29 €) | Selver "Hommikusöögihelbed Coco Pops, KELLOGG'S, 330 g" (5.28 €) |
| Barbora "Hommikuhelbed Coco Pops KELLOGG'S 330g" (4.59 €) | Selver "Hommikusöögihelbed Coco Pops, KELLOGG'S, 330 g" (5.28 €) |
| Barbora "Helbed Tresor Milk Choco KELLOGG'S 410g" (5.07 €) | Selver "Hommikuhelbed Tresor Milk Choco, KELLOGG'S, 410g" (5.07 €) |
| Barbora "Kaerahelbed peened VESKI MATI 1kg" (2.39 €) | Rimi "Kaerahelbed Veski Mati 1kg" (2.49 €) |
| Barbora "Kaerahelbed peened VESKI MATI 1kg" (2.39 €) | Selver "Täistera peened kaerahelbed, VESKI MATI, 1 kg" (2.39 €) |
| Barbora "Kaerahelbed jämedad VESKI MATI 1kg" (2.49 €) | Rimi "Kaerahelbed jämedad röstitud Veski Mati 1kg" (2.55 €) |
| Barbora "Kaerahelbed jämedad VESKI MATI 1kg" (2.49 €) | Rimi "Kaerahelbed Veski Mati 1kg" (2.49 €) |
| Barbora "Kaerahelbed jämedad VESKI MATI 1kg" (2.49 €) | Selver "Täistera jämedad kaerahelbed, VESKI MATI, 1 kg" (2.19 €) |
| Barbora "Riisihelbed BALTIX 500g" (1.49 €) | Rimi "Täisterakaerahelbed Baltix 500g" (1.29 €) |
| Barbora "Riisihelbed BALTIX 500g" (1.49 €) | Selver "Hernehelbed, BALTIX, 500 g" (1.39 €) |
| Barbora "Kaerah. kiirpuder õuna VESKI MATI 45g" (0.63 €) | Selver "Kiirpuder Õuna, VESKI MATI, 45 g" (0.63 €) |
| Barbora "Täistera 4-viljahelbed TARTU MILL 500g" (1.29 €) | Rimi "Kiirtatrahelbed täistera Tartu Mill 500g" (2.89 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Rimi "Kaheksaviljahelbed Veski Mati 500g" (1.45 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Rimi "Odrahelbed Veski Mati 500g" (2.25 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Selver "Täistera Tatrahelbed, VESKI MATI, 500 g" (2.79 €) |
| Barbora "Kiirkaerahelbepuder AXA õuna-kaneeli 40g" (0.56 €) | Selver "Kiirkaerahelbepuder õuna ja kaneeli, AXA, 40 g" (0.56 €) |
| Barbora "Naturaalne röstitud müsli SANTE 350g" (2.39 €) | Selver "Röstitud müsli, SANTE, 350 g" (2.39 €) |
| Barbora "Müsli troop.viljadega Premium AXA 330g" (2.73 €) | Selver "Premium müsli troopiliste viljadega, AXA, 330 g" (2.73 €) |
| Barbora "Müsli šok.pähklitega Premium AXA 330g" (2.73 €) | Rimi "Granola müsli šokolaadi-pähklitega Axa 330g" (1.99 €) |
| Rimi "Kiirtatrahelbed täistera Tartu Mill 500g" (2.89 €) | Selver "Täistera röstitud kiirtatrahelbed, TARTU MILL, 500 g" (2.59 €) |
| Rimi "Granola müsli punaste marjadega Sante 350g" (2.29 €) | Selver "Krõbe müsli punaste marjadega, SANTE, 350 g" (2.19 €) |
| Rimi "Hommikusöök šokolaadiga riis Oho 500g" (3.59 €) | Selver "Šokolaadiga riis, OHO, 500 g" (3.65 €) |
| Rimi "Hommikusöök nisu meega Oho 500g" (4.29 €) | Selver "Nisu meega, OHO, 500 g" (4.26 €) |

### Canned food (18)

| Item A | Item B |
|---|---|
| Barbora "Konsev.mais BONDUELLE 670g" (3.49 €) | Rimi "Mais Bonduelle 670g/570g" (2.95 €) |
| Barbora "Valged oad tomatikastmes HEINZ 415g" (2.39 €) | Rimi "Oad tomatikastmes küpsetatud Heinz 415g" (2.35 €) |
| Barbora "Konserveeritud mais BONDUELLE 530g" (2.59 €) | Rimi "Mais Bonduelle 530g/360g" (2.19 €) |
| Barbora "Punased oad mais.kastmes BONDUELLE 430g" (2.85 €) | Selver "Punased oad tšilli kastmes, BONDUELLE, 430 g" (1.89 €) |
| Barbora "Piknikukurk (viilud) PÕLTSAMAA 680g" (2.89 €) | Rimi "Piknikukurk viilutatud Põltsamaa 680/360g" (3.25 €) |
| Barbora "Piknikukurk (viilud) PÕLTSAMAA 680g" (2.89 €) | Selver "Piknikukurk viiludena, PÕLTSAMAA, 680 g" (3.19 €) |
| Barbora "Võileivakurk (pikiviilud) PÕLTSAMAA 460g" (2.99 €) | Rimi "Võileivakurk Põltsamaa 460g/240g" (2.99 €) |
| Barbora "Marin.kirsstomatid NIZHYN 450g" (2.55 €) | Rimi "Kabatšokipüree Nizhyn 450g" (2.49 €) |
| Barbora "Marin.kirsstomatid NIZHYN 450g" (2.55 €) | Rimi "Letšo Nizhyn 450g" (3.59 €) |
| Barbora "Röst.punased maguspiprad GOURMANTE 450g" (4.55 €) | Selver "Röstitud punased maguspiprad, GOURMANTE, 450 g" (4.55 €) |
| Barbora "Küüslauguküüned äädikas GOURMANTE 100g" (1.89 €) | Selver "Küüslaugud äädikas, GOURMANTE, 100 g" (1.92 €) |
| Barbora "Viil.artišokid SACLA 285g" (4.19 €) | Rimi "Artišokid marineeritud Sacla 285g/171g" (4.59 €) |
| Barbora "Sibulad äädikas GOURMANTE 100g" (1.79 €) | Selver "Küüslaugud äädikas, GOURMANTE, 100 g" (1.92 €) |
| Rimi "Valged oad tomatikastmes Bonduelle 425ml/430g" (2.19 €) | Selver "Aurutatud valged oad, BONDUELLE, 425 ml" (2.15 €) |
| Rimi "Piknikukurk viilutatud Põltsamaa 680/360g" (3.25 €) | Selver "Piknikukurk viiludena, PÕLTSAMAA, 680 g" (3.19 €) |
| Rimi "Mais ja hernes Bonduelle 425ml/285g" (2.89 €) | Selver "Mais, hernes ja paprika, BONDUELLE, 425 ml" (2.89 €) |
| Rimi "Salatiporgand Salvest 400g" (2.09 €) | Selver "Salatiporgand, SALVEST, neto 400g" (2.09 €) |
| Rimi "Šampinjonid marin. trad. Bonduelle 540g/290g" (4.49 €) | Selver "Šampinjonid traditsiooniliselt marineeritud, BONDUELLE, 540 g" (4.49 €) |

### Sauces & condiments (29)

| Item A | Item B |
|---|---|
| Barbora "Austrikaste Oyster THAI-CHOICE 200ml" (2.59 €) | Selver "Austrikaste, THAI CHOICE, 200 ml" (2.59 €) |
| Barbora "Adžika gruusiapärane MAADLEX 350g" (1.85 €) | Selver "Gruusia adžika, MAADLEX, 350 g" (1.66 €) |
| Barbora "BBQ kaste burboon.viski SANTA MARIA 350g" (4.25 €) | Selver "BBQ kaste burbooni viski, SANTA MARIA, 350g" (4.25 €) |
| Barbora "Paprikakaste FELIX 270g" (2.01 €) | Selver "Paprikakaste Külluslik, FELIX, 270 g" (2.59 €) |
| Barbora "Pastakaste Arrabbiata BARILLA 400g" (3.75 €) | Selver "Pastakaste Arrabiata, BARILLA, 400 g" (2.99 €) |
| Barbora "Pastakaste Mediterranee BARILLA 400g" (4.15 €) | Selver "Pastakaste Arrabiata, BARILLA, 400 g" (2.99 €) |
| Barbora "Pastakaste tomat.juust TARTU MILL 340g" (4.19 €) | Selver "Pastakaste Tomat ja Juust, TARTU MILL, 340 g" (3.99 €) |
| Barbora "Ketšup BALTIKA 500g" (1.85 €) | Rimi "Ketšup originaal Baltika 500g" (2.39 €) |
| Barbora "Vürtsikas ketšup HELLMANN'S 470g" (2.99 €) | Rimi "Ketšup terav Hellmann's 470g" (2.99 €) |
| Barbora "Ketšup terav HEINZ 460g" (3.75 €) | Selver "Ketšup original, HEINZ, 460 g" (3.59 €) |
| Barbora "Sinep kange MAADLEX 75g" (1.15 €) | Selver "Sinep, MAADLEX, 75 g" (1.03 €) |
| Barbora "Inglise sinep FELIX 200g" (1.99 €) | Selver "Special Inglise sinep, FELIX, 200 g" (1.99 €) |
| Barbora "Küüslaugu Salatikaste FELIX 375g" (1.94 €) | Rimi "Salatikaste Caesari Felix 375g" (2.55 €) |
| Barbora "Küüslaugu Salatikaste FELIX 375g" (1.94 €) | Selver "Küüslaugu kaste, FELIX, 375 g" (2.29 €) |
| Barbora "Majonees TARPLAN Provansaal 50%430g tops" (1.42 €) | Selver "Provansaal majonees 50%, TARPLAN, 430 g" (1.95 €) |
| Barbora "Majonees LEMMIK Provansaal, 210g" (1.29 €) | Rimi "Majonees klassik. Provansaal Lemmik 210g" (1.29 €) |
| Barbora "Majonees LEMMIK Provansaal, 210g" (1.29 €) | Selver "Klassikaline provansaal majonees, LEMMIK, 210 g" (1.29 €) |
| Barbora "Majonees BALTIKA Provansaal Orig.,300g" (1.89 €) | Selver "Majonees Kuldne provansaal, BALTIKA, 300 g" (1.79 €) |
| Barbora "Majonees BALTIKA Provansaal Klas.,300g" (1.79 €) | Selver "Majonees Kuldne provansaal, BALTIKA, 300 g" (1.79 €) |
| Barbora "Majonees BBQ LEMMIK 200g" (1.49 €) | Rimi "Majonees küüslaugu Lemmik 200g" (1.59 €) |
| Barbora "MajoneesTARPLAN aioli 210g" (1.24 €) | Rimi "Majonees aioli Tarplan 210g" (1.79 €) |
| Barbora "Dipikaste TERE Dipp-Tops papr.-ranch200g" (1.75 €) | Selver "Tere Dipp-Tops paprika ranch-dipikaste, TERE, 200 g" (1.78 €) |
| Rimi "Kaste mango-tšilli Felix 285g" (2.99 €) | Selver "Mango-tsilli kaste, FELIX, 285 g" (2.99 €) |
| Rimi "Ketšup Felix öko 500g" (3.79 €) | Selver "Terav ketšup, FELIX, 500 g" (2.94 €) |
| Rimi "Kaste hiinapärane terav Felix 500g" (2.29 €) | Selver "Terav Hiina kaste, FELIX, 500 g" (2.75 €) |
| Rimi "Majonees klassik. Provansaal Lemmik 210g" (1.29 €) | Selver "Klassikaline provansaal majonees, LEMMIK, 210 g" (1.29 €) |
| Rimi "Majonees aioli Tarplan 210g" (1.79 €) | Selver "Majonees Provansaal, TARPLAN, 210 g" (1.09 €) |
| Rimi "Majonees aioli Tarplan 210g" (1.79 €) | Selver "Majonees Vegan, TARPLAN, 210 g" (1.29 €) |
| Rimi "Palsamiäädikas Borges 250ml" (2.89 €) | Selver "Õunaäädikas ÖKO, BORGES, 250 ml" (2.59 €) |

### Spices (30)

| Item A | Item B |
|---|---|
| Barbora "Maitseainesegu Podravka VEGETA 75g" (0.59 €) | Rimi "Maitseainesegu Vegeta 75g" (0.99 €) |
| Barbora "Kana-ja lihamaits.veskis SANTA MARIA 75g" (4.65 €) | Selver "Kana ja liha maitseaine veskis, SANTA MARIA, 75 g" (4.69 €) |
| Barbora "Liham.ürdi-küüslaugu SANTA MARIA 20g" (1.05 €) | Rimi "Lihamaitseaine ürdi-küüslaugu Santa Maria 20g" (0.79 €) |
| Barbora "Maits.Pasta Rosso veskis SANTA MARIA 80g" (5.89 €) | Selver "Pasta rossa veskis, SANTA MARIA, 80 g" (5.89 €) |
| Barbora "Lihamaits.tüümianiga SANTA MARIA 25g" (0.95 €) | Selver "Lihamaitseaine tüümianiga, SANTA MARIA, 25 g" (0.95 €) |
| Barbora "Maitseaine kuldsele kanale VEGETA 20g" (0.45 €) | Selver "Maitseaine Vegeta Natur kuldsele kanale, PODRAVKA, 20 g" (0.66 €) |
| Barbora "Univers. maitseainesegu SANTA MARIA 78g" (5.29 €) | Rimi "Universaalne maitseainesegu Santa Maria 78g" (5.29 €) |
| Barbora "Jahvat. kaneel SANTA MARIA, 22g" (1.25 €) | Selver "Kaneel (jahvatatud), SANTA MARIA, 22 g" (1.25 €) |
| Barbora "Küüslauk KOTANYI, 28g" (1.59 €) | Rimi "Hakitud küüslauk Kotanyi 28g" (1.55 €) |
| Barbora "Nelk KOTANYI, 14g" (1.59 €) | Rimi "Tüümian Kotanyi 14g" (1.55 €) |
| Barbora "Pune KOTANYI, 8g" (1.39 €) | Rimi "Oregano Kotanyi 8g" (1.55 €) |
| Barbora "Peenestatud tüümian KOTANYI, 14g" (1.39 €) | Rimi "Tüümian Kotanyi 14g" (1.55 €) |
| Barbora "Kaneelikoor SANTA MARIA 22g" (2.39 €) | Selver "Kaneelikoor pakk, SANTA MARIA, 22g" (2.39 €) |
| Barbora "Tomati ürdisegu veskis SANTA MARIA 69g" (5.89 €) | Selver "Tomati ja ürdisegu veskis, SANTA MARIA, 69 g" (5.89 €) |
| Barbora "Mahe paprika jahv.SANTA MARIA 36g" (3.69 €) | Rimi "Paprika jahvatatud Santa Maria mahe 36g" (3.69 €) |
| Barbora "Petersell MEIRA 9g" (0.99 €) | Selver "Estragon, MEIRA, 9 g" (1.31 €) |
| Barbora "Kivisool veskis SANTA MARIA 455g" (6.39 €) | Rimi "Kivisool jämedateral. veskis Santa Maria 455g" (6.69 €) |
| Barbora "Kivisool veskis SANTA MARIA 455g" (6.39 €) | Selver "Kivisool, SANTA MARIA, 455 g" (6.39 €) |
| Barbora "Adygei sool küüslauguga SALDVA 130g" (1.09 €) | Rimi "Sool Saldva küüslauguga 130g" (1.15 €) |
| Barbora "Adygei sool ürtidega SALDVA 130g" (1.09 €) | Rimi "Sool Saldva ürtidega 130g" (1.15 €) |
| Barbora "Tšillipipar veskis SANTA MARIA ,70g" (4.65 €) | Selver "Tšillimaitseaine veskis, SANTA MARIA, 70 g" (4.69 €) |
| Barbora "Must pipar veskis SANTA MARIA, 210g" (16.39 €) | Rimi "Tellicherry pipar veskis Santa Maria 210g" (16.49 €) |
| Barbora "Must peen pipar MEIRA 27g" (1.65 €) | Selver "Must pipar purustatud, MEIRA, 27 g" (1.68 €) |
| Barbora "Must pipar jahv.SANTA MARIA 36g" (2.89 €) | Rimi "Must pipar jahvatatud Santa Maria 36g" (2.89 €) |
| Barbora "Roosa pipar SANTA MARIA 21g" (3.79 €) | Selver "Rosee pipar, SANTA MARIA, 21 g" (3.79 €) |
| Barbora "Kanamarinaad SANTA MARIA Klassik 75g" (1.09 €) | Selver "Klassikaline kanamarinaad, SANTA MARIA, 75 g" (1.05 €) |
| Barbora "Kuivmarinaadisegu ürt. SANTA MARIA 22g" (1.25 €) | Selver "Universaalne kuivmarinaadisegu, SANTA MARIA, 22 g" (1.25 €) |
| Barbora "Kuivmarinaadisegu kanale SANTA MARIA30g" (1.25 €) | Selver "Kuivmarinaadisegu ribidele, SANTA MARIA, 30 g" (1.25 €) |
| Rimi "Vasabi ja seesami maitseaine. Santa Maria 44g" (3.79 €) | Selver "Vasabi ja seesami maitseainesegu, SANTA MARIA, 44 g" (3.49 €) |
| Rimi "Pasta rossa Santa Maria 80g" (5.95 €) | Selver "Pasta rossa veskis, SANTA MARIA, 80 g" (5.89 €) |

### Jam & honey & spreads (9)

| Item A | Item B |
|---|---|
| Barbora "Mustikapüree 100% BONNE 0.5L" (6.59 €) | Selver "Ananassipüree, BONNE, 500 ml" (4.99 €) |
| Barbora "Pirnipüree 100% BONNE 0.5L" (3.89 €) | Selver "Ananassipüree, BONNE, 500 ml" (4.99 €) |
| Barbora "Banaanipüree BONNE 0.5L" (4.35 €) | Selver "Ananassipüree, BONNE, 500 ml" (4.99 €) |
| Barbora "Pähklikreem MILKA 350g" (5.29 €) | Rimi "Sarapuupähklikreem Milka 350g" (5.29 €) |
| Barbora "Mesi NORDMEL 450g" (6.59 €) | Selver "Mesi tops, NORDMEL, 450 g" (6.59 €) |
| Barbora "Suvine Eesti mesi presstuub.MEVEDA 500g" (6.99 €) | Selver "Eesti mesi Suvine presstuubis, MEVEDA, 500 g" (6.99 €) |
| Rimi "Mesi suvine presstuubis Meveda 500g" (8.89 €) | Selver "Eesti mesi Suvine presstuubis, MEVEDA, 500 g" (6.99 €) |
| Rimi "Šokolaadi-Pähklikreem Nutella 600g" (7.99 €) | Selver "Pähklikreem, NUTELLA, 600 g" (8.59 €) |
| Rimi "Šokolaadi-Pähklikreem Nutella 350g" (5.39 €) | Selver "Pähklikreem, NUTELLA, 350 g" (5.39 €) |

### Baking supplies (7)

| Item A | Item B |
|---|---|
| Barbora "Rummi lõhna- ja maitseaine, DR.OETKER 8ml" (1.19 €) | Rimi "Vanilli lõhna- ja maitseaine Dr. Oetker 8 ml" (1.39 €) |
| Barbora "Mõrumandli lõhna- ja maitseaine, DR.OETKER 8ml" (1.19 €) | Rimi "Vanilli lõhna- ja maitseaine Dr. Oetker 8 ml" (1.39 €) |
| Barbora "Tordikreem vaniljemaits.DR.OETKER 105g" (2.09 €) | Rimi "Vanillimaitseline tordikreem Dr. Oetker 105g" (2.39 €) |
| Barbora "Šokol.maits.tordikaunistusedDR.OETKER 80g" (1.99 €) | Rimi "Tordikaunistused šokolaadi Dr.Oetker 80g" (2.29 €) |
| Barbora "Valge šokol.maits.glasuurDR.OETKER 100g" (2.09 €) | Selver "Glasuur - valge šokolaadi maitseline, DR.OETKER, 100 g" (2.09 €) |
| Barbora "Toiduvärv kollane DR. OETKER 10g" (1.85 €) | Selver "Geeltoiduvärv kollane, DR.OETKER, 10 g" (1.85 €) |
| Barbora "Purpur nonparell MEIRA 60g" (1.88 €) | Selver "Lilla nonparell, MEIRA, 60 g" (1.88 €) |

### Chocolate (30)

| Item A | Item B |
|---|---|
| Barbora "Piimašokolaad Singel DAIM 28g" (0.79 €) | Selver "Piimašokolaad Daim, DAIM, 28g" (0.79 €) |
| Barbora "Šokolaadibatoonike King Size TUPLA 85g" (1.79 €) | Rimi "Šokolaadibatoon Tupla King Size 85g" (1.79 €) |
| Barbora "Šokolaadibatoonike King Size TUPLA 85g" (1.79 €) | Selver "Šokolaad King Size, TUPLA, 85g" (1.85 €) |
| Barbora "Šokolaadibatoonike SNICKERS 50g" (1.29 €) | Rimi "Šokolaadibatoon Snickers 50g" (1.29 €) |
| Barbora "Šokolaadibatoonike SNICKERS 50g" (1.29 €) | Selver "Šokolaad, SNICKERS, 50 g" (1.35 €) |
| Barbora "Šokolaadibatoonike TWIX 50g" (1.29 €) | Rimi "Šokolaadibatoon Twix 50g" (1.19 €) |
| Barbora "Šokolaadibatoonike TWIX 50g" (1.29 €) | Selver "Šokolaad, TWIX, 50 g" (1.29 €) |
| Barbora "Šokolaadibatoon multipack LION 5x30g" (2.99 €) | Rimi "Šokolaadibatoon Lion multipakk 5x30g" (2.99 €) |
| Barbora "Šokolaadibatoon Cookie dough KIT KAT 42g" (0.75 €) | Selver "Cookie Dough batoon, KIT KAT, 42g" (1.29 €) |
| Barbora "Šokolaad MILKA maasika 100g" (2.99 €) | Rimi "Šokolaad karamelli Milka 100g" (2.35 €) |
| Barbora "Šokolaad Caramel MILKA 100g" (2.35 €) | Rimi "Šokolaad karamelli Milka 100g" (2.35 €) |
| Barbora "Piimašokolaad Chips Ahoy MILKA 100g" (2.99 €) | Selver "Šokolaad Chips Ahoy!, MILKA, 100g" (2.19 €) |
| Barbora "Piimašokolaad metsapähkl. MILKA 90g" (2.65 €) | Rimi "Piimašokolaad Milka 90g" (2.29 €) |
| Barbora "Piimašokolaad Biscoff MILKA 90g" (2.59 €) | Rimi "Piimašokolaad Milka 90g" (2.29 €) |
| Barbora "Piimašokolaad metspähklitega KALEV 190g" (4.99 €) | Selver "Piimašokolaad purustatud metspähklitega, KALEV, 190 g" (4.97 €) |
| Barbora "Piimašokolaad metspähklitega KALEV 190g" (4.99 €) | Selver "Piimašokolaad tervete metspähklitega, KALEV, 190 g" (4.99 €) |
| Barbora "Piimašokolaad Nurr KALEV 190g" (4.99 €) | Selver "Nurr kassikaline piimašokolaad, KALEV, 190 g" (4.97 €) |
| Barbora "Piimašokolaad Nurr KALEV 100g" (2.69 €) | Selver "Piimašokolaad Eesti, KALEV, 100 g" (2.97 €) |
| Barbora "Piimašokolaad Nurr KALEV 100g" (2.69 €) | Selver "Nurr kassikaline piimašokolaad, KALEV, 100 g" (1.97 €) |
| Barbora "Piimašok.tahvel KIT KAT 99g" (1.55 €) | Selver "Sarapuupähkli tahvel, KIT KAT, 99 g" (2.59 €) |
| Barbora "Piimašok.tahvel KIT KAT 99g" (1.55 €) | Selver "Soolakaramelli tahvel, KIT KAT, 99 g" (2.59 €) |
| Barbora "Piimašok.soolamandliga MARABOU 170g" (4.69 €) | Selver "Piimašokolaad  soolamandliga, MARABOU, 170g" (4.69 €) |
| Barbora "Tume šokolaad metsapähklitegaKALEV 100g" (2.69 €) | Rimi "Tume šokolaad kirsi Kalev 100g" (2.69 €) |
| Barbora "Tume šokolaad Vana Tallinn KALEV 103g" (2.95 €) | Selver "Šokolaad Vana Tallinn, KALEV, 103 g" (2.97 €) |
| Barbora "Tume šok.purustatud metspähk. KALEV 270g" (6.99 €) | Rimi "Tume šok. purustatud metspähklite. Kalev 270g" (6.99 €) |
| Barbora "Tume šokolaad Maiuspala KALEV 100g" (2.95 €) | Rimi "Tume šokolaad kirsi Kalev 100g" (2.69 €) |
| Rimi "Piimašokolaad piimatäidisega Kinder 100g" (2.39 €) | Selver "Piimašok. piimatäidisega, KINDER, 100 g" (2.55 €) |
| Rimi "Šokolaadibatoon Twix 50g" (1.19 €) | Selver "Šokolaad, TWIX, 50 g" (1.29 €) |
| Rimi "Šokolaadibatoon Daim 28g" (0.79 €) | Selver "Piimašokolaad Daim, DAIM, 28g" (0.79 €) |
| Rimi "Piimašokolaadibatoon Bounty 57g" (1.69 €) | Selver "Šokolaad, BOUNTY, 57 g" (1.75 €) |

### Candy (30)

| Item A | Item B |
|---|---|
| Barbora "Närimiskommid Party Animals TRULY 110g" (1.49 €) | Rimi "Kummikommid Red Band Truly Party Animals 110g" (1.35 €) |
| Barbora "Kummikommid HARIBO Kuldkaru 100g" (1.35 €) | Selver "Kummikommid Kuldkarud, HARIBO, 100 g" (1.35 €) |
| Barbora "Kummikommid HARIBO Kuldkaru 100g" (1.35 €) | Selver "Kummikommid Maasikad, HARIBO, 100g" (1.35 €) |
| Barbora "Nätsukommid TUTTI FRUTTI 15g" (0.41 €) | Rimi "Närimiskommid Red Band Tutti Frutti 15g" (0.39 €) |
| Barbora "Nätsukomm Rainbow MENTOS 37.5g" (0.99 €) | Selver "Nätsukomm Discovery, MENTOS, 37,5 g" (0.99 €) |
| Barbora "Kummikompv. Dracula TROLLI 200g" (1.99 €) | Selver "Kummikommid Dracula, TROLLI, 200 g" (2.19 €) |
| Barbora "Nätsukomm Mamba Magic Sticks STORCK 140g" (2.49 €) | Selver "Nätsukomm Magic Sticks, MAMBA, 140 g" (2.49 €) |
| Barbora "Kummikommid Starmix HARIBO 175g" (2.39 €) | Rimi "Kummikommid Worms Haribo 175g" (2.35 €) |
| Barbora "Kummikommid Starmix HARIBO 175g" (2.39 €) | Selver "Kummikommid TropiFrutti, HARIBO, 175 g" (2.39 €) |
| Barbora "Kummikommid Starmix HARIBO 175g" (2.39 €) | Selver "Kummikommid Fantaasia, HARIBO, 175 g" (2.39 €) |
| Barbora "Kummikommid Starmix HARIBO 175g" (2.39 €) | Selver "Kummikommid kuldkarud, HARIBO, 175g" (2.39 €) |
| Barbora "Kummikommid Starmix HARIBO 175g" (2.39 €) | Selver "Kummikommid Konnad, HARIBO, 175 g" (2.39 €) |
| Barbora "Närimiskompvekid Raupies HARIBO 160g" (2.35 €) | Rimi "Kummikommid Raupies Haribo 160g" (2.35 €) |
| Barbora "Närimiskomm Discovery MENTOS 37.5g" (0.89 €) | Rimi "Närimiskommid Mentos Discovery 37,5g" (0.99 €) |
| Barbora "Närimiskomm Discovery MENTOS 37.5g" (0.89 €) | Selver "Nätsukomm Discovery, MENTOS, 37,5 g" (0.99 €) |
| Barbora "Kummikommid Miami fizz HARIBO 85g" (1.39 €) | Selver "Miami Fizz hapud kummikommid, HARIBO, 85g" (1.39 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Rimi "Kummikommid Worms Haribo 175g" (2.35 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Selver "Kummikommid TropiFrutti, HARIBO, 175 g" (2.39 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Selver "Kummikommid Fantaasia, HARIBO, 175 g" (2.39 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Selver "Kummikommid kuldkarud, HARIBO, 175g" (2.39 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Selver "Kummikommid Konnad, HARIBO, 175 g" (2.39 €) |
| Barbora "Kummikommid Kiss TROLLI 200g" (1.99 €) | Selver "Kummikommid "Ussikesed", TROLLI, 200 g" (1.99 €) |
| Barbora "Kummikommid Kiss TROLLI 200g" (1.99 €) | Selver "Kummikommid Dracula, TROLLI, 200 g" (2.19 €) |
| Barbora "Kommisegu 7 lemmikut KALEV 1kg" (15.79 €) | Rimi "Kommidesegu Kalev 7 lemmikut 1kg" (9.99 €) |
| Barbora "Kommisegu 7 lemmikut KALEV 1kg" (15.79 €) | Selver "7 lemmikut kaalu, KALEV, 1 kg" (14.77 €) |
| Barbora "Iiris Toffee Kiss-Kiss KALEV 150g" (1.89 €) | Selver "Kiss-Kiss iiris, KALEV, 150 g" (1.88 €) |
| Barbora "Batoonike Kaseke KALEV 150g" (2.39 €) | Rimi "Batoonikesed Kalev Kaseke 150g" (2.35 €) |
| Barbora "Batoonike Kaseke KALEV 150g" (2.39 €) | Selver "Batoon Kaseke, KALEV, 150 g" (2.39 €) |
| Barbora "Piimabatoonike Pilveke KALEV 150g" (2.45 €) | Rimi "Piimabatoonikesed Kalev Pilveke 150g" (2.45 €) |
| Barbora "Piimabatoonike Pilveke KALEV 150g" (2.45 €) | Selver "Kompvek Pilveke, KALEV, 150 g" (2.47 €) |

### Biscuits (30)

| Item A | Item B |
|---|---|
| Barbora "Juustumaitselised kreekrid CROCO 400g" (3.29 €) | Selver "Soolakreeker juustumaitseline, CROCO, 400 g" (3.79 €) |
| Barbora "Kreekerid sibula/hapukoorega TUC 100g" (1.65 €) | Selver "Kreekerid sibula ja hapukoorega, TUC, 100 g" (1.65 €) |
| Barbora "Kreeker Scrocchi pitsamaits.LAURIERI175g" (2.39 €) | Rimi "Kreekerid Laurieri Scrocchi pitsamaits. 175g" (2.39 €) |
| Barbora "Kreeker Scrocchi trühvliga LAURIERI175g" (2.35 €) | Rimi "Kreekerid Laurieri Scrocchi trühvliga 175g" (2.39 €) |
| Barbora "Kondenspiimamait. küpsised SELGA, 180g" (1.25 €) | Rimi "Vormiküpsised kondenspiima Selga 180g" (1.15 €) |
| Barbora "Kondenspiimamait. küpsised SELGA, 180g" (1.25 €) | Selver "Kondenspiima küpsis, SELGA, 180 g" (1.27 €) |
| Barbora "Šokolaadimaitselised küpsised SELGA 180g" (1.25 €) | Rimi "Vormiküpsised šokolaadi Selga 180g" (1.15 €) |
| Barbora "Šokolaadimaitselised küpsised SELGA 180g" (1.25 €) | Selver "Šokolaadi küpsis, SELGA, 180 g" (1.27 €) |
| Barbora "Biskviitküpsis šok.täidis.BARNI 30g" (0.69 €) | Selver "Barni šokolaadi biskviitküpsis, LU, 30 g" (0.70 €) |
| Barbora "Biskviitküpsis piimatäidis.BARNI 150g" (2.99 €) | Selver "Barni piima biskviitküpsis, BARNI, 150 g" (2.99 €) |
| Barbora "Küpsised Choco Cookie MILKA 135g" (2.65 €) | Selver "Küpsised Choco Cookies, MILKA, 135 g" (2.79 €) |
| Barbora "Biskviitküpsis maasikat.BARNI 150g" (2.99 €) | Selver "Barni piima biskviitküpsis, BARNI, 150 g" (2.99 €) |
| Barbora "Küpsised Choco Grain MILKA 126g" (2.59 €) | Rimi "Kaeraküpsised Milka Choco Grain 126g" (2.59 €) |
| Barbora "Biskviitküpsis Tender Moo MILKA 140g" (2.99 €) | Rimi "Küpsis Milka Tender Moo 140g" (2.99 €) |
| Barbora "Küpsis pähkli kreemitäidisega KALEV205g" (2.59 €) | Selver "Šokolaadimaitselise kreemitäidisega küpsis, KALEV, 205 g" (2.63 €) |
| Barbora "Küpsis vanill.kreemitäidisega KALEV 205g" (2.59 €) | Selver "Šokolaadimaitselise kreemitäidisega küpsis, KALEV, 205 g" (2.63 €) |
| Barbora "Küpsis Golden OREO 154g" (2.49 €) | Selver "Küpsised Golden, OREO, 154 g" (1.89 €) |
| Barbora "Küpsised Original OREO 154g" (2.49 €) | Selver "Küpsised Golden, OREO, 154 g" (1.89 €) |
| Barbora "Küpsised Choco Cookies rosin.MILKA 135g" (2.59 €) | Selver "Küpsised Choco Cookies, MILKA, 135 g" (2.79 €) |
| Barbora "Vahvel valge glasuuriga MARMITON 150g" (2.75 €) | Rimi "Vahvlid valge glasuuriga Marmiton 150g" (2.79 €) |
| Barbora "Vahvel valge glasuuriga MARMITON 150g" (2.75 €) | Selver "Heleda glasuuriga vahvel, MARMITON, 150 g" (2.75 €) |
| Barbora "Rosinaküpsis Tallinn MARMITON 350g" (2.99 €) | Selver "Rosinaküpsised Tallinn, MARMITON, 350 g" (3.04 €) |
| Barbora "Vahvlid vaniljekr.Kooli MARMITON 110g" (1.49 €) | Rimi "Vahvlid Kooli Marmiton 110g" (1.49 €) |
| Rimi "Küpsised juustumaitselised Tuc Mini 100g" (1.49 €) | Selver "Kreekerid Juustu Mini, TUC, 100 g" (1.69 €) |
| Rimi "Vormiküpsised šokolaadi Selga 180g" (1.15 €) | Selver "Šokolaadi küpsis, SELGA, 180 g" (1.27 €) |
| Rimi "Vormiküpsised kondenspiima Selga 180g" (1.15 €) | Selver "Kondenspiima küpsis, SELGA, 180 g" (1.27 €) |
| Rimi "Soolakringlid Croco 300g" (2.79 €) | Selver "Soolakringel, CROCO, 300 g" (3.29 €) |
| Rimi "Täisteraküpsised metsamarja Belvita 300g" (3.69 €) | Selver "Küpsised metsamarja, BELVITA, 300 g" (3.55 €) |
| Rimi "Kaeraküpsis glasuuriga Marmiton 300g" (2.65 €) | Selver "Kaeraküpsised glasuuriga, MARMITON, 300 g" (2.29 €) |
| Rimi "Küpsised Daim Marabou 184g" (4.49 €) | Selver "Küpsised Daim'ga, MARABOU, 184 g" (3.49 €) |

### Chips & snacks (30)

| Item A | Item B |
|---|---|
| Barbora "Krõpsud Juustu Maximus PRINGLES 165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Krõpsud juustu-sib.maits.PRINGLES 165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Kartulisnäkk kanamaits. ESTRELLA, 110g" (2.45 €) | Rimi "Kartulisnäkk grillkana maits.Estrella 110g" (1.89 €) |
| Barbora "Kartulikrõpsud BBQ PRINGLES 165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Kartulikrõpsud BBQ PRINGLES 165g" (3.19 €) | Rimi "Kart.krõpsud BBQ maitselised Pringles 165g" (3.19 €) |
| Barbora "Krõpsud PRINGLES Ketchup,165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Krõpsud PRINGLES Pizza,165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Kartulikrõps hapuk.-sibul.ESTRELLA 130g" (2.49 €) | Rimi "Kartulikrõpsud Estrella hapukoore-sibula 130g" (2.49 €) |
| Barbora "Kartulikrõps. Original sool.PRINGLES70g" (1.99 €) | Rimi "Krõpsud Pringles Original 70g" (1.99 €) |
| Barbora "Kartulikrõpsud hapuk.-sibul.PRINGLES70g" (1.99 €) | Rimi "Krõpsud hapukoore-sibula maits. Pringles 70g" (1.99 €) |
| Barbora "Kartulikrõpsud paprika PRINGLES 70g" (1.99 €) | Rimi "Krõpsud Pringles Original 70g" (1.99 €) |
| Barbora "Kartulikrõpsud tillimaits. ESTRELLA 180g" (3.75 €) | Rimi "Kartulikrõpsud Estrella peekonimaits. 180g" (3.59 €) |
| Barbora "Kartulikrõpsud tillimaits. ESTRELLA 180g" (3.75 €) | Selver "Kartulikrõps suitsupeekonimaitseline, ESTRELLA, 180 g" (3.75 €) |
| Barbora "Kartulikrõpsud Ranch ESTRELLA 250g" (4.59 €) | Selver "Kartulikrõpsud sakilised Ranch, ESTRELLA, 250 g" (4.49 €) |
| Barbora "Kartulikrõpsud krevett PRINGLES 165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Kart.krõpsud tšilli/tsitrus.TAFFEL 180g" (2.75 €) | Rimi "Kartulikrõpsud tšilli-tsitrus Taffel 180g" (2.85 €) |
| Barbora "Kartulikrõpsud krabimaits.PRINGLES 165g" (3.19 €) | Rimi "Kartulikrõpsud juustu Pringles 165g" (3.19 €) |
| Barbora "Maisikrõpsud CHEETOS Cruncho tšilli 165g" (2.69 €) | Selver "Magusa Tšilli maitselised maisikrõpsud, CHEETOS, 165 g" (2.73 €) |
| Barbora "Maisisnäkid juustumaits. ESTRELLA 110g" (2.45 €) | Rimi "Maisikrõpsud juustumaitselised Estrella 110g" (1.89 €) |
| Barbora "Magus mikropopkorn ESTRELLA 90g" (1.19 €) | Rimi "Mikropopkorn soolane Estrella 90g" (1.19 €) |
| Barbora "Mikropopkorn juustu maits. ESTRELLA 90g" (1.19 €) | Rimi "Mikropopkorn soolane Estrella 90g" (1.19 €) |
| Barbora "Nisukrõps suitsupeekoni PIRAAT 150g" (1.75 €) | Selver "Nisukrõps Piraat suitsupeekoni, BALSNACK, 150 g" (2.19 €) |
| Rimi "Maisikrõps maguspipra maitseline Cheetos 165g" (2.75 €) | Selver "Maisikrõps ketšupimaitseline, CHEETOS, 165 g" (2.73 €) |
| Rimi "Kartulikr. tšilli- ja laimimait. Lay's 170g" (3.59 €) | Selver "Tšilli- ja laimimaitselised kartulikrõpsud, LAY'S, 170g" (3.59 €) |
| Rimi "Maisisnäkid Cheese Balls Nacho Taffel 190g" (2.39 €) | Selver "Cheese Balls maisisnäkid, TAFFEL, 190 g" (2.97 €) |
| Rimi "Kartulikrõpsud hapuk.-ja ürdimait. Lay's 180g" (3.59 €) | Selver "Hapukoore-ja ürtidemaitselised kartulikrõpsud, LAY'S, 180g" (3.59 €) |
| Rimi "Kartulikrõpsud või-soola maits. Estrella 170g" (3.69 €) | Selver "Kartulikrõpsud või ja soolamaitselised, ESTRELLA, 170g" (2.45 €) |
| Rimi "Krõpsud šašlõki ja röstitud sibul Taffel 180g" (2.79 €) | Selver "Šašlõki ja röstitud sibula maitselised kartulikrõpsud, TAFFEL, 180g" (2.97 €) |
| Rimi "Kartulikrõpsud Estrella hapukoore-sibula 180g" (3.59 €) | Selver "Kartulikrõps hapukoore ja sibulamaitseline, ESTRELLA, 180 g" (3.75 €) |
| Rimi "Kar.krõpsud Estrella Kettle hapuk-sibula 120g" (2.89 €) | Selver "Kettle Cooked hapukoore-sibulamaitselised kartulikrõpsud, ESTRELLA, 120 g" (2.90 €) |

### Nuts, seeds & dried fruit (24)

| Item A | Item B |
|---|---|
| Barbora "Tudengieine ARIMEX 300g" (5.29 €) | Rimi "Mandlid Arimex 300g" (4.99 €) |
| Barbora "Tudengieine ARIMEX 300g" (5.29 €) | Rimi "Sarapuupähklid Arimex 300g" (6.99 €) |
| Barbora "Tudengieine ARIMEX 300g" (5.29 €) | Selver "Lemmiksegu, ARIMEX, 300g" (5.99 €) |
| Barbora "Mandel ARIMEX 300g" (7.15 €) | Rimi "Mandlid Arimex 300g" (4.99 €) |
| Barbora "Mandel ARIMEX 300g" (7.15 €) | Rimi "Sarapuupähklid Arimex 300g" (6.99 €) |
| Barbora "Mandel ARIMEX 300g" (7.15 €) | Selver "Lemmiksegu, ARIMEX, 300g" (5.99 €) |
| Barbora "Kreeka pähklid Premium GERMUND 200g" (4.59 €) | Selver "Premium Kreeka pähkel, GERMUND, 200 g" (4.67 €) |
| Barbora "Pähklite segu Premium GERMUND 250g" (5.69 €) | Rimi "Pähklite segu Germund 250g" (5.45 €) |
| Barbora "Mandel GERMUND 200g" (3.99 €) | Selver "Pistaatsiapähkel, GERMUND, 200 g" (4.87 €) |
| Barbora "Maapähklid tšillimaits. röst.TAFFEL 140g" (2.29 €) | Rimi "Maapähklid tšillimaitselised Taffel 140g" (2.29 €) |
| Barbora "Maapähklid tšillimaits. röst.TAFFEL 140g" (2.29 €) | Selver "Tšillimaitselised röstitud maapähklid, TAFFEL, 140g" (2.33 €) |
| Barbora "Päevalilleseemned röstitud MOGYI 200g" (1.39 €) | Selver "Päevalilleseemned röstitud (triibulised), MOGYI, 200 g" (1.45 €) |
| Barbora "Kõrvitsaseemned ARIMEX 300g" (5.99 €) | Rimi "Mandlid Arimex 300g" (4.99 €) |
| Barbora "Kõrvitsaseemned ARIMEX 300g" (5.99 €) | Rimi "Sarapuupähklid Arimex 300g" (6.99 €) |
| Barbora "Kõrvitsaseemned ARIMEX 300g" (5.99 €) | Selver "Lemmiksegu, ARIMEX, 300g" (5.99 €) |
| Barbora "Kuivatatud aprikoos ARIMEX 300g" (6.29 €) | Rimi "Jõhvikad kuivatatud Arimex 300g" (6.39 €) |
| Barbora "Kuiv.kivideta datlid Premium ARIMEX 300g" (1.99 €) | Rimi "Datlid kivideta Arimex Premium 300g" (2.69 €) |
| Rimi "Kuivatatud datlid kivideta Seeberger 200g" (3.95 €) | Selver "Kivideta datlid, SEEBERGER, 200 g" (3.79 €) |
| Rimi "Röst.hapuk.-sibula maapähklid Estrella 140g" (2.35 €) | Selver "Maapähklid hapukoore-sibulamaitselised, ESTRELLA, 140 g" (2.33 €) |
| Rimi "Kuivatatud õunad  Arimex 200g" (4.59 €) | Selver "Kuivatatud õunarõngad, ARIMEX, 200 g" (4.67 €) |
| Rimi "Kuivatatud õunad  Arimex 200g" (4.59 €) | Selver "Kuivatatud aprikoos, ARIMEX, 200 g" (4.06 €) |
| Rimi "Mandlid Arimex 300g" (4.99 €) | Selver "Lemmiksegu, ARIMEX, 300g" (5.99 €) |
| Rimi "Sarapuupähklid Arimex 300g" (6.99 €) | Selver "Lemmiksegu, ARIMEX, 300g" (5.99 €) |
| Rimi "Maapähklid tšillimaitselised Taffel 140g" (2.29 €) | Selver "Tšillimaitselised röstitud maapähklid, TAFFEL, 140g" (2.33 €) |

### Frozen vegetables & berries (9)

| Item A | Item B |
|---|---|
| Barbora "Külm.köögivilj.HÄRMAVILI läätsedega,400g" (2.09 €) | Rimi "Köögiviljasegu läätsedega Härmavili 400g" (2.15 €) |
| Barbora "Külm.köögiviljas.Tervist HÄRMAVILI,400g" (1.89 €) | Rimi "Köögiviljasegu Tervist! Härmavili 400g" (1.89 €) |
| Barbora "Külm.köögiv.seemnetega HÄRMAVILI, 400g" (2.29 €) | Rimi "Köögiviljad seemnetega Härmavili 0,4kg" (2.29 €) |
| Barbora "Külm.kultuurmustikad HARMAVILI,300g" (3.39 €) | Selver "Kultuurmustikad, HÄRMAVILI, 300 g" (3.40 €) |
| Barbora "Külm.murel kivideta BIMAR, 300g" (2.59 €) | Selver "Murel, BIMAR, 300 g" (2.53 €) |
| Rimi "Köögiviljasegu Tervist! Härmavili 400g" (1.89 €) | Selver "Köögiviljasegu Tervist! Fitlap, HÄRMAVILI, 400 g" (1.92 €) |
| Rimi "Köögiviljasegu Mehhiko Maahärra 400g" (2.15 €) | Selver "Mehhiko segu, MAAHÄRRA, 400 g" (2.19 €) |
| Rimi "Köögiviljasegu läätsedega Härmavili 400g" (2.15 €) | Selver "Rikkalik köögiviljasegu läätsedega, HÄRMAVILI, 400 g" (2.12 €) |
| Rimi "Köögiviljad seemnetega Härmavili 0,4kg" (2.29 €) | Selver "Köögiviljad seemnetega Fitlap, HÄRMAVILI, 400 g" (2.29 €) |

### Ice cream (30)

| Item A | Item B |
|---|---|
| Barbora "Jäätis VÄIKE TOM apelsin.glasuuris, 60g" (0.95 €) | Selver "Vanilliplombiir glasuuris, VÄIKE TOM, 60 g" (0.99 €) |
| Barbora "Jäätis VÄIKE TOM apelsin.glasuuris, 60g" (0.95 €) | Selver "Šokolaadijäätis glasuuris, VÄIKE TOM, 60 g" (0.99 €) |
| Barbora "Jäätis VÄIKE TOM pähklitäidis., 60g" (0.95 €) | Rimi "Jäätis šokolaadi Väike Tom 60g/90ml" (0.99 €) |
| Barbora "Jäätis VÄIKE TOM pähklitäidis., 60g" (0.95 €) | Rimi "Koolijäätis Väike Tom 60g/90ml" (0.99 €) |
| Barbora "Jäätis šok.-koore.gl.VANILLA NINJA, 80g" (1.19 €) | Rimi "Jäätis vanilli šok.gl. Vanilla Ninja 80g" (1.19 €) |
| Barbora "Jäätis šok.-koore.gl.VANILLA NINJA, 80g" (1.19 €) | Rimi "Jäätis šokol. Šok. gl. Vanilla Ninja 80g" (1.19 €) |
| Barbora "Maasika-puuviljasorbett DRAKO, 90g" (1.05 €) | Selver "Maasika-puuviljasorbett, DRAAKON, 90 g" (1.07 €) |
| Barbora "Jäätis VANA TOOMAS šokolaadiplomb., 90g" (1.49 €) | Rimi "Jäätis soolakaramelli Vana Toomas 90g" (1.39 €) |
| Barbora "Jäätis VANA TOOMAS šokolaadiplomb., 90g" (1.49 €) | Selver "Šokolaadijäätis, VANA TOOMAS, 90 g" (1.51 €) |
| Barbora "Jäätis classic MAGNUM, 81g" (1.30 €) | Selver "Vanillijäätis Classic, MAGNUM, 81 g" (1.88 €) |
| Barbora "Jäätis VÄIKE TOM mingo-mango, 60g" (0.65 €) | Rimi "Koorejäätis mango Väike Tom 60g/74ml" (0.69 €) |
| Barbora "Jogurtijäätis virsiku BALBIINO 54g" (1.19 €) | Selver "Virsiku-jogurtijäätis jogurtiglasuuris, BALBIINO, 54 g" (1.19 €) |
| Barbora "Jäätis Tallinn piparmündi PREMIA 60g" (1.05 €) | Rimi "Piparmündi koorej. Tallinn Premia 60g/100ml" (1.09 €) |
| Barbora "Koorejäätis PREMIA stracciatella, 245g" (3.29 €) | Rimi "Jäätis Stracciatella Premia 245g/0,5l" (2.99 €) |
| Barbora "Koorejäätis REGATT vanilli, 480g" (3.99 €) | Selver "Koorejäätis, REGATT, 480 g" (4.01 €) |
| Barbora "Koorejäätis vanilliplomb.ONU ESKIMO,480g" (5.99 €) | Selver "Vanillimaitseline koorejäätis, ONU ESKIMO, 480 g" (5.89 €) |
| Barbora "Koorejäätis laktoosivaba BALBIINO, 270g" (4.49 €) | Selver "FITLAP Laktoosivaba koorejäätis, BALBIINO, 270 g" (4.49 €) |
| Barbora "Koorejäätis vaarika&šok.ONU ESKIMO, 680g" (7.05 €) | Selver "Vaarika- ja šokolaadi-koorejäätis, ONU ESKIMO, 680 g" (7.06 €) |
| Barbora "Jäätis Cappuccino, lakt.vab. LA MUU 250g" (4.59 €) | Rimi "Jäätis Cappuccino lakt.vaba La Muu 250g/500ml" (4.49 €) |
| Barbora "Jäätis SNICKERS, 48g" (1.29 €) | Rimi "Jäätisebatoon Snickers 48g/53ml" (1.29 €) |
| Barbora "Vaarika sorbetipallid MINI MELTS, 72g" (2.39 €) | Rimi "Mango sorbetipallid Mini Melts 72g" (2.39 €) |
| Barbora "Koorejäätis ERITI RAMMUS šokolaadi, 100g" (1.78 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS karamelli, 100g" (1.75 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ONU ESKIMO šoko.tops,65g" (1.04 €) | Selver "Šokolaadi-koorejäätis vahvlitopsis, ONU ESKIMO, 65 g" (1.04 €) |
| Barbora "Koorejäätis šoko.tk.ONU ESKIMO,65g" (0.99 €) | Selver "Šokolaadi-koorejäätis vahvlitopsis, ONU ESKIMO, 65 g" (1.04 €) |
| Barbora "Koorejäätis ERITI RAMMUS kondensp.,100g" (1.78 €) | Rimi "Jäätis kondensp. Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS kondensp.,100g" (1.78 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Jäätis kreembrülee koon SUPER VIVA, 100g" (1.99 €) | Selver "Kreembrülee koonus, SUPER VIVA, 100 g" (2.02 €) |
| Barbora "Koorejäätis ERITI RAMMUS soolakar.,110g" (1.78 €) | Rimi "Koorejäätis jõhvikam. Eriti Rammus 110g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS pistaatsia,100g" (1.95 €) | Rimi "Jäätis pistaatsia Eriti Rammus 100g/200ml" (1.69 €) |

### Dumplings, pizza & fries (8)

| Item A | Item B |
|---|---|
| Barbora "Külm.pelmeenid PEALINNA, 350g" (1.89 €) | Rimi "Minipelmeenid Pealinna 350g" (2.35 €) |
| Barbora "Külm. vareenikud UVIC kartuli-seene,500g" (3.09 €) | Selver "Vareenikud Ivan kartuli-seene, UVIC, 500 g" (3.14 €) |
| Barbora "Külm.minipelm.kanalihaga PEALINNA, 350g" (1.99 €) | Selver "Minipelmeenid kanalihaga, PEALINNA, 350 g" (2.53 €) |
| Barbora "Külm.pitsa Mozzarella RISTORANTE, 355g" (4.05 €) | Selver "Pitsa Ristorante Hawaii, DR.OETKER, 355g" (4.06 €) |
| Barbora "Külm.Margherita pitsa PEALINNA 300g" (2.19 €) | Selver "Margherita pitsa, PREMIA, 300 g" (2.77 €) |
| Barbora "Külm. bataadi MAAHÄRRA friikad, 500g" (4.45 €) | Rimi "Bataadi friikartulid Maahärra 500g" (4.49 €) |
| Rimi "Pealinna minipelmeenid 700g" (4.39 €) | Selver "Minipelmeenid Pealinna, PREMIA, 700 g" (4.29 €) |
| Rimi "Minipelmeenid Pealinna 350g" (2.35 €) | Selver "Minipelmeenid Pealinna, PREMIA, 350 g" (2.39 €) |

### Sausages (25)

| Item A | Item B |
|---|---|
| Barbora "Juustuvorst VALLA, 240g viil" (1.25 €) | Selver "Juustuvorst viilutatud, VALLA, 240g" (1.19 €) |
| Barbora "Lastevorst XL M&M, 300g viil" (1.65 €) | Rimi "Lastevorst XL viilutatud Maks&Moorits 300g" (1.95 €) |
| Barbora "Juustuvorst RAKVERE, 190g viil" (1.89 €) | Selver "Juustuvorst viilutatud, RAKVERE LK, 190 g" (1.92 €) |
| Barbora "Merevaigu grillvorstid RAKVERE 600g" (4.99 €) | Rimi "Klassikalised grillvorstid Rakvere 600g" (4.39 €) |
| Barbora "Merevaigu grillvorstid RAKVERE 600g" (4.99 €) | Rimi "Grillvorstid Merevaik Rakvere 600g" (4.49 €) |
| Barbora "Šašlõkivorst MATSIMOKA,365g" (5.69 €) | Rimi "Šašlõkivorst lambasooles Matsimoka 365g" (5.99 €) |
| Barbora "Kanaviinerid TALLEGG, 400g" (1.99 €) | Rimi "Kanaviiner Tallegg 400g" (1.99 €) |
| Barbora "Poolsuitsuvorst Täpi NÕO, 135g viil" (2.89 €) | Selver "Poolsuitsuvorst Täpi, NÕO, 135 g" (2.94 €) |
| Barbora "Poolsuitsuvorst Mini NÕO, 135g viil" (2.79 €) | Selver "Poolsuitsuvorst Mini, NÕO, 135 g" (2.80 €) |
| Barbora "Poolsuitsuvorst Krakov NÕO, 270g" (3.65 €) | Rimi "Vorst Krakov Nõo 270g" (2.99 €) |
| Barbora "Poolsuitsuvorst Krakov NÕO, 270g" (3.65 €) | Selver "Poolsuitsuvorst Krakovi, NÕO, 270 g" (3.65 €) |
| Barbora "Keedusalaami Paruni NÕO, 90g viil" (2.75 €) | Rimi "Keedusalaami Paruni Nõo 90g" (2.75 €) |
| Barbora "E-vaba täissuitsuvorst OSKAR, 120g viil" (3.25 €) | Rimi "Täissuitsuvorst e-vaba viilutatud Oskar 120g" (3.19 €) |
| Barbora "Täissuitsuvorst Ordu küüslaugug.NÕO,250g" (4.79 €) | Rimi "Täissuitsuvorst Ordu Nõo 250g" (4.79 €) |
| Barbora "Täissuitsuvorst Kalevipoja NÕO, 250g" (4.39 €) | Rimi "Täissuitsuvorst Ordu Nõo 250g" (4.79 €) |
| Barbora "Täissuitsuvorst Kalevipoja NÕO, 250g" (4.39 €) | Selver "BBQ täissuitsuvorst, NÕO, 250 g" (5.09 €) |
| Barbora "Täissuitsuvorst Moskva RANNAROOTSI,240g" (3.49 €) | Selver "Lihaveise täissuitsuvorst, RANNAROOTSI, 240 g" (3.75 €) |
| Barbora "Täissuitsuvorst veise RANNAROOTSI,240g" (3.59 €) | Selver "Lihaveise täissuitsuvorst, RANNAROOTSI, 240 g" (3.75 €) |
| Barbora "Poolsuitsuvorst Krakov VALLA, 450g" (2.69 €) | Rimi "Vorst Krakov Valla 450g" (2.59 €) |
| Barbora "Täissuitsuvorst Tooma M&M, 240g" (3.29 €) | Rimi "Täissuitsuvorst klassik. Maks&Moorits 240g" (2.39 €) |
| Barbora "Täissuitsuvorst Tõeline RAKVERE, 210g" (3.79 €) | Rimi "Täissuitsuvorst Äge Rakvere 210g" (3.79 €) |
| Barbora "Täissuitsuvorst klassikaline M&M 240g" (3.59 €) | Rimi "Täissuitsuvorst klassik. Maks&Moorits 240g" (2.39 €) |
| Rimi "Lihaveise täissuitsuv. Rannarootsi 240g" (3.59 €) | Selver "Lihaveise täissuitsuvorst, RANNAROOTSI, 240 g" (3.75 €) |
| Rimi "Täissuitsuvorst Ordu Nõo 250g" (4.79 €) | Selver "BBQ täissuitsuvorst, NÕO, 250 g" (5.09 €) |
| Rimi "Maitsesalaami viilutatud Karni 120g" (2.49 €) | Selver "Maitsesalaami, KARNI, 120 g" (2.59 €) |

### Ham & cold cuts (30)

| Item A | Item B |
|---|---|
| Barbora "Rulaad NÕO, 135g viil" (2.49 €) | Rimi "Rulaad Nõo viilutatud Nõo 135g" (1.79 €) |
| Barbora "Rulaad NÕO, 135g viil" (2.49 €) | Selver "Rulaad Nõo, NÕO, 135 g" (2.49 €) |
| Barbora "Kaelakarbonaad NÕO, 135g viil" (2.69 €) | Selver "Kaelakarbonaad, NÕO, 135 g" (2.69 €) |
| Barbora "Kalkunifileesink NÕO, 105g viil" (2.02 €) | Rimi "Kalkunifileesink Nõo 105g" (1.79 €) |
| Barbora "Veiserind OSKAR, 100g viil" (2.85 €) | Rimi "Veiserind viilutatud Oskar 100g" (2.85 €) |
| Barbora "Lõunasink OSKAR, 300g viil" (2.32 €) | Selver "Lõunasink, OSKAR, 300 g" (3.13 €) |
| Barbora "Maamehe suitsusink NÕO, 105g viil" (2.14 €) | Selver "Maamehe suitsusink, NÕO, 105 g" (2.90 €) |
| Barbora "Eri suitsupeekon OSKAR, 120g viil" (2.49 €) | Rimi "Suitsupeekon viilutatud Eri Oskar 120g" (2.49 €) |
| Barbora "Suitsupeekon Ehe RANNAROOTSI,120g viil" (2.39 €) | Selver "Suitsupeekon Ehe, RANNAROOTSI, 120 g" (2.49 €) |
| Barbora "Õhuline Viru sink RAKVERE, 150g viil" (1.27 €) | Selver "Õhuline Viru sink, RAKVERE LK, 150 g" (1.72 €) |
| Barbora "Kalkunisink Fitlap NÕO, 105g viil" (1.87 €) | Selver "Kalkunisink Fitlap, NÕO LIHAVÜRST, 105 g" (2.53 €) |
| Barbora "Talusink M&M,150g viil" (1.79 €) | Rimi "Talusink Maks&Moorits 150g" (2.39 €) |
| Barbora "Einepeekon MAKS&MOORITS, 150g viil" (1.99 €) | Rimi "Einepeekon Maks&Moorits 150g" (1.99 €) |
| Barbora "Seaseljafilee NÕO, 105g viil" (2.65 €) | Rimi "Seaseljafilee suits. Nõo 105g" (1.79 €) |
| Barbora "Kanasink TALLEGG,300g viil" (3.14 €) | Rimi "Kanasink Tallegg 300g" (2.99 €) |
| Barbora "Viru sink RAKVERE,300g viil" (2.59 €) | Rimi "Viru sink Rakvere 300g" (3.49 €) |
| Barbora "Suitsurulaad RAKVERE,130g viil" (1.87 €) | Rimi "Suitsurulaad Rakvere 130g" (2.49 €) |
| Barbora "Veisemaksapasteet NÕO, 200g" (1.99 €) | Rimi "Hanemaksapasteet Nõo 200g" (2.25 €) |
| Barbora "Hautatud veiseliha FRANK POTT, 240g" (1.85 €) | Selver "Hautatud sealiha, FRANK POTT, 240 g" (1.79 €) |
| Barbora "Hautatud kanaliha FRANK POTT, 240g" (2.09 €) | Selver "Hautatud sealiha, FRANK POTT, 240 g" (1.79 €) |
| Barbora "Kons.turistieine sealihast MINU 250g" (2.05 €) | Rimi "Turistieine sealihast Minu 250g" (2.05 €) |
| Barbora "Vinnut.veiseliha Hot KARNI,50g" (2.79 €) | Selver "Vinnutatud veiseliha Hot, KARNI, 50 g" (2.80 €) |
| Barbora "Vinnut.veiseliha Teriyaki KARNI,50g" (2.79 €) | Rimi "Vinnut. veiseliha Teriyaki Jerkey Karni 50g" (2.79 €) |
| Barbora "Vinnut.veiseliha Teriyaki KARNI,50g" (2.79 €) | Selver "Vinnutatud veiseliha Teriyaki, KARNI, 50 g" (2.80 €) |
| Barbora "Vinnut.veiseliha Original KARNI,50g" (2.79 €) | Rimi "Kuivatatud veiseliha Original Karni 50g" (2.79 €) |
| Barbora "Vinnut.veiseliha Original KARNI,50g" (2.79 €) | Selver "Vinnutatud veiseliha Original, KARNI, 50 g" (2.80 €) |
| Barbora "Snäkk 'n' Go sealiha NÕO,70g" (2.29 €) | Rimi "Sealiha snäkk Snack 'n' Go Nõo 70g" (1.99 €) |
| Barbora "Snäkk 'n' Go Chorizo NÕO,70g" (2.29 €) | Rimi "Chorizo snäkk Snack 'n' Go Nõo 70g" (1.99 €) |
| Rimi "Rulaad Nõo viilutatud Nõo 135g" (1.79 €) | Selver "Rulaad Nõo, NÕO, 135 g" (2.49 €) |
| Rimi "Suitsukana poolkoivad Tallegg 600g" (4.89 €) | Selver "Suitsukana poolkoib, TALLEGG, 600 g" (5.09 €) |

### Fish & seafood (25)

| Item A | Item B |
|---|---|
| Barbora "Soolalõhe viilutatud M.V.WOOL,100g" (3.07 €) | Selver "Soolalõhe fileelõigud viilutatud, M.V.WOOL, 100 g" (2.99 €) |
| Barbora "Sprotid ōlis RANNAKÜLA, EO, 240g" (2.99 €) | Rimi "Sprotid õlis Rannaküla 240g" (2.99 €) |
| Barbora "Grill sardiinid õlis BRIIS, EO 140g" (2.05 €) | Selver "Grill sardiinid õlis, EPINELL, 140g" (2.05 €) |
| Barbora "Skumbria õlis KAPTEN GRANT,240g" (2.55 €) | Rimi "Sardiinid õlis Kapten Grant 240g" (2.19 €) |
| Barbora "Kalapallid tomatikastmes MINU, EO 240g" (2.15 €) | Selver "Sprotid tomatikastmes EO, MINU, 240 g" (3.49 €) |
| Barbora "Kalapallid tomatikastmes MINU, EO 240g" (2.15 €) | Selver "Kilu tomatikastmes EO, MINU, 240 g" (2.19 €) |
| Barbora "Tuunikala pipra ja sidruniga KAIJA 160g" (4.49 €) | Rimi "Tuunikala roh. pipra ja sidruniga Kaija 160g" (3.59 €) |
| Barbora "Heeringafilee ilma õlita VICI, 200g" (2.89 €) | Selver "Atlandi heeringafilee ilma õlita, VICI, 200 g" (2.89 €) |
| Barbora "Pr.kilud tomatikastmes KALURI, 500g" (3.89 €) | Selver "Praetud heeringafilee tomatikastmes, KALURI, 500 g" (4.89 €) |
| Barbora "Pr.kilud koduses marinaadis KALURI,500g" (3.89 €) | Selver "Praetud heeringafilee koduses marinaadis, KALURI, 500 g" (4.89 €) |
| Barbora "Vürtsisilgufilee KAPTEN GRANT, 100g" (2.49 €) | Selver "Forellimari, KAPTEN GRANT, 100 g" (10.79 €) |
| Barbora "Kuivatatud tursk MSDM, 36g" (1.99 €) | Rimi "Tursk vürtsikas kuivatatud MSDM 36g" (2.15 €) |
| Barbora "Kuivatatud tursk MSDM, 36g" (1.99 €) | Selver "Tursk suitsutatud, MSDM, 36 g" (1.99 €) |
| Barbora "Kuivatatud tursk MSDM, 36g" (1.99 €) | Selver "Tursk vähesoolane, MSDM, 36 g" (1.99 €) |
| Barbora "Krevetid soolvees VICI, 100/200g" (4.79 €) | Selver "Krevetid soolvees 100 g neto, VICI, 200 g" (3.99 €) |
| Barbora "Kalmaarid omas mahlas CALVO, EO 115g" (2.55 €) | Rimi "Kalmaarid omas tindis Calvo 115g/72g" (2.55 €) |
| Barbora "Krevetid tšilli-küüslaugu MARWI 100g" (3.99 €) | Rimi "Rannakarbid tšilli-küüslaugu Marwi 100g" (2.49 €) |
| Barbora "Kooritud krevetid soolveesMARWI 300g" (4.99 €) | Rimi "Krevetid kooritud soolvees Marwi MSC 300/140g" (4.99 €) |
| Barbora "Rannakarabid soolvees MARWI 300g" (3.99 €) | Rimi "Rannakarbid soolvees Marwi ASC 300/140g" (4.19 €) |
| Rimi "Õrnsoola lõhe viilud Avektra 100g" (4.69 €) | Selver "Õrnsoola lõhefilee viilud, AVEKTRA, 100 g" (4.79 €) |
| Rimi "Forelli viilud õrnsoola Avektra 100g" (4.69 €) | Selver "Õrnsoola lõhefilee viilud, AVEKTRA, 100 g" (4.79 €) |
| Rimi "Kalmaar vähesoolane kuivatatud MSDM 36g" (2.15 €) | Selver "Kalmaar vähesoolane, MSDM, 36 g" (2.29 €) |
| Rimi "Tursk suitsutatud vähesoolane MSDM 36g" (2.15 €) | Selver "Tursk suitsutatud, MSDM, 36 g" (1.99 €) |
| Rimi "Tursk suitsutatud vähesoolane MSDM 36g" (2.15 €) | Selver "Tursk vähesoolane, MSDM, 36 g" (1.99 €) |
| Rimi "Sprotid Rannaküla õlis 250g klaas" (4.89 €) | Selver "Sprotid õlis, RANNAKÜLA, 250 g" (4.79 €) |

### Baby food (21)

| Item A | Item B |
|---|---|
| Barbora "Juurviljapüree HIPP BIO 125g 4k" (1.65 €) | Selver "Kanalihapüree BIO, HIPP, 125 g" (3.65 €) |
| Barbora "Veiselihapüree HIPP BIO125g, 4k" (3.65 €) | Rimi "Veiselihapüree Hipp öko 5kuud+ 125g" (3.99 €) |
| Barbora "Veiselihapüree HIPP BIO125g, 4k" (3.65 €) | Selver "Kanalihapüree BIO, HIPP, 125 g" (3.65 €) |
| Barbora "Ploomipüree HIPP BIO 125g,4k" (1.79 €) | Selver "Kanalihapüree BIO, HIPP, 125 g" (3.65 €) |
| Barbora "Pirnipüree Williams BIO HIPP 125g, 4k" (1.79 €) | Selver "Pirnipüree Williams Öko 4k, HIPP, 125 g" (1.82 €) |
| Barbora "Aprikoosipüree HIPP BIO 125g,4k" (1.79 €) | Selver "Kanalihapüree BIO, HIPP, 125 g" (3.65 €) |
| Barbora "Õunapüree banaaniga HIPP BIO 100g 4k" (2.05 €) | Selver "Hippis õunapüree banaaniga BIO 4+, HIPP, 100 g" (2.02 €) |
| Barbora "Pirni.vaarika.ban.püree MUUTI 110g al.6k" (1.59 €) | Rimi "Püree pirni-vaarika-banaani Muuti 110g" (1.59 €) |
| Barbora "Piimapuder šokolaaditük. MILUPA 250g,8k" (3.71 €) | Rimi "Riisipuder Milupa šokolaaditük. 8k+ 250g" (3.69 €) |
| Barbora "Riisipuder HOLLE 250g 4k" (3.74 €) | Rimi "Kaerahelbepuder al. 6k Holle öko 250g" (4.59 €) |
| Barbora "Riisipuder HOLLE 250g 4k" (3.74 €) | Rimi "Riisipuder beebidele al. 6k Holle öko 250g" (4.99 €) |
| Barbora "Piimapudrupulber beebiküps.HIPP 250g 6k" (3.79 €) | Selver "Tatra piimapudrupulber, HIPP, 250 g" (5.07 €) |
| Barbora "Mitmeviljapud.õuna-kan.Öko PÕNN 110g 6k" (1.85 €) | Rimi "Mitmeviljapud. õuna-kaneeli 6k+ Põnn öko 110g" (1.89 €) |
| Barbora "Pohla.must.rukkipuder MUUTI Öko 110g 8k" (1.59 €) | Rimi "Pohla-mustika-rukkipuder Muuti öko. 110g" (1.59 €) |
| Barbora "Õunamahl mahe Bio HIPP 200ml, 4k" (1.79 €) | Selver "Mahe õunamahl, HIPP, 200 ml" (1.78 €) |
| Barbora "Riisivahvlid vaarikatega HIPP BIO 30g,8k" (2.25 €) | Selver "Riisivahvlid vaarikatega 8+ öko, HIPP, 30 g" (2.45 €) |
| Barbora "Maisipulgad here.tomati ORGANIX 15g 7k" (1.95 €) | Selver "Maisipulgad herne-, tomatimaitselised, ORGANIX, 15 g" (1.96 €) |
| Barbora "Ploomimehu SALVEST PÕNN Öko 240ml,4k" (1.85 €) | Selver "Ploomimehu ÖKO 4+, PÕNN, 240 ml" (1.87 €) |
| Barbora "Maisirõngad krõbedad ORGANIX Öko 6k 20g" (1.95 €) | Rimi "Maisirõngad al. 6k Organix öko 20g" (1.95 €) |
| Rimi "Tatra piimapudrupulber Hipp  õun 4k 250g" (4.99 €) | Selver "Tatra piimapudrupulber, HIPP, 250 g" (5.07 €) |
| Rimi "Öko. Mango-kookosesmuuti 6k+ Põnn 110g" (1.79 €) | Selver "Ökoloogiline Mango-kookosesmuuti 6+, PÕNN, 110 g" (1.85 €) |

### Personal care (30)

| Item A | Item B |
|---|---|
| Barbora "Juukselakk TAFT Shine 250ml" (7.15 €) | Rimi "Juukselakk Taft cashmere 250 ml" (4.79 €) |
| Barbora "Juukselakk TAFT Ultra 250ml" (7.15 €) | Rimi "Juukselakk Taft cashmere 250 ml" (4.79 €) |
| Barbora "Juukselakk NIVEA Volume Care 250ml" (5.31 €) | Rimi "Juukselakk Nivea volume 250ml" (4.09 €) |
| Barbora "Juukselakk NIVEA Volume Care 250ml" (5.31 €) | Selver "Juukselakk Volume Sensation, NIVEA, 250 ml" (7.61 €) |
| Barbora "Juuksevaht NIVEA Volume Care 150ml" (5.31 €) | Selver "Juuksevaht Volume Sensation, NIVEA, 150 ml" (7.61 €) |
| Barbora "Juuksevaht NIVEA Volume Care 150ml" (5.31 €) | Selver "Juuksevaht Diamond Care, NIVEA, 150ml" (7.61 €) |
| Barbora "Juuksevaht WELLA Ultra Tugev 200ml" (7.69 €) | Rimi "Juuksevaht Wellaflex ultra tugev 200ml" (7.79 €) |
| Barbora "Juukselakk TAFT Power,250ml" (7.15 €) | Rimi "Juukselakk Taft cashmere 250 ml" (4.79 €) |
| Barbora "Juuksepasta GOT2B Beach boy100ml" (11.19 €) | Rimi "Juuksepasta Got2B beach boy super 100ml" (10.99 €) |
| Barbora "Juukselakk TAFT Power Cashmere 250ml" (7.15 €) | Rimi "Juukselakk Taft cashmere 250 ml" (4.79 €) |
| Barbora "Juuksevaht TAFT Power Cashm.200ml" (7.15 €) | Rimi "Juuksevaht Taft Power kašmiir 200ml" (5.19 €) |
| Barbora "Juukselakk SYOSS Max Hold 300ml" (5.94 €) | Rimi "Juukselakk Syoss max 300 ml" (5.79 €) |
| Barbora "Juukselakk SYOSS Max Hold 300ml" (5.94 €) | Selver "Juukselakk Shine&Hold, SYOSS, 300 ml" (8.99 €) |
| Barbora "Juukselakk SYOSS Strong Hold 300ml" (5.94 €) | Selver "Juukselakk Shine&Hold, SYOSS, 300 ml" (8.99 €) |
| Barbora "Juukselakk SYOSS KERATIN CARE 300ml" (5.94 €) | Rimi "Juukselakk Syoss keratin 300 ml" (8.49 €) |
| Barbora "Juukselakk TAFT Perfect Flex 250ml" (7.15 €) | Rimi "Juukselakk Taft perf.flex. 250 ml" (3.69 €) |
| Barbora "Juuksepasta GOT2B Phenomenal,meest.100ml" (11.19 €) | Rimi "Juuksepasta got2b PhenoMENal text 100ml" (10.99 €) |
| Barbora "Juuksepasta GOT2B Phenomenal,meest.100ml" (11.19 €) | Rimi "Juuksepasta Got2b Phenomenal 100ml" (10.99 €) |
| Barbora "Juukselakk SYOSS Style Ceramide 300ml" (5.94 €) | Rimi "Juukselakk Syoss ceramide 300 ml" (8.49 €) |
| Barbora "Juukselakk GOT2B VolumaniacBoosting300ml" (11.19 €) | Rimi "Juukselakk Got2b volumania 300 ml" (10.99 €) |
| Barbora "Juuksepasta SYOSS Texture Clay 100ml" (6.99 €) | Rimi "Stiliseerimispasta Syoss Texture Clay 100ml" (6.99 €) |
| Barbora "Juuksevaht NIVEA Diamond Volume 150ml" (5.31 €) | Selver "Juuksevaht Volume Sensation, NIVEA, 150 ml" (7.61 €) |
| Barbora "Juuksevaht NIVEA Diamond Volume 150ml" (5.31 €) | Selver "Juuksevaht Diamond Care, NIVEA, 150ml" (7.61 €) |
| Barbora "Juukselakk SYOSS Glaze 3in1 300ml" (6.29 €) | Rimi "Juukselakk Syoss Glaze 300ml" (6.39 €) |
| Barbora "Juukselakk SYOSS Glaze 3in1 300ml" (6.29 €) | Selver "Juukselakk Intense Glaze, SYOSS, 300ml" (8.99 €) |
| Barbora "Palsam NIVEA Color Cristal Gloss 200ml" (3.35 €) | Selver "Palsam Color Cristal Gloss värvi, NIVEA, 200 ml" (4.79 €) |
| Barbora "Palsam RICH Miracle Renew CC 200ml" (15.79 €) | Rimi "Palsam Rich Miracle Renew Keratin 200ml" (15.69 €) |
| Barbora "Palsam NIVEA Hairmilk Shine 200ml" (3.35 €) | Selver "Palsam hooldav Hairmilk Shine, NIVEA, 200ml" (4.79 €) |
| Barbora "Palsam PUHAS LOODUS Takjas tugev. 250ml" (2.39 €) | Rimi "Palsam Puhas Loodus tuge. takjas 250ml" (2.99 €) |
| Barbora "Palsam PUHAS LOODUS Sheavõiga 250ml" (2.39 €) | Selver "Palsam sheavõiga, hooldav, PUHAS LOODUS, 250 ml" (3.39 €) |

### Household (30)

| Item A | Item B |
|---|---|
| Barbora "Klaasipuhastusvahend CLIN Citrus 500ml" (3.35 €) | Rimi "Aknapuhastusvahend clin citrus 500 ml" (3.39 €) |
| Barbora "Klaasipuhastusvahend CLIN Citrus 500ml" (3.35 €) | Selver "Klaasipuhastusvahend Lemon, CLIN, 500 ml" (3.34 €) |
| Barbora "Klaasipuhastusvahend CLIN Citrus 500ml" (3.35 €) | Selver "Klaasipuhastusvahend AntiFog, CLIN, 500 ml" (3.34 €) |
| Barbora "Klaasipuhastusvahend CLIN Anti-Fog 500ml" (3.35 €) | Rimi "Aknapuhastusvahend clin anti-fog 500 ml" (3.39 €) |
| Barbora "Torupuhastusvahend TORU-SIIL 1L" (1.74 €) | Rimi "Torupuhastusvahend Toru-Siil Mayeri 1l" (2.35 €) |
| Barbora "Hallituse eemaldaja CILLIT BANG 750ml" (8.79 €) | Selver "Hallituse eemaldaja, CILLIT, 750 ml" (9.19 €) |
| Barbora "Torupuhastusvahend PUHAS KODU 500ml" (1.99 €) | Rimi "Torupuhastusgeel Puhas Kodu 500ml" (2.65 €) |
| Barbora "Torugeel PUHAS KODU 500ml" (2.39 €) | Rimi "Torupuhastusgeel Puhas Kodu 500ml" (2.65 €) |
| Barbora "Vaibapuhastusvaht THE PINK STUFF 500ml" (4.49 €) | Rimi "Üldpuhastusvahend The Pink Stuff 500ml" (4.39 €) |
| Barbora "Katlakivieemaldi PUHAS KODU 500ml" (1.99 €) | Rimi "Torupuhastusgeel Puhas Kodu 500ml" (2.65 €) |
| Barbora "Rasvaeemaldaja CILLIT BANG Spray 750ml" (5.49 €) | Rimi "Rasvaeemaldaja Cillit spray 750 ml" (6.29 €) |
| Barbora "Köögipuhastusvahend SANYTOL 500ml" (4.69 €) | Selver "Köögipuhastusvahend desinfitseeriv, SANYTOL, 500 ml" (4.69 €) |
| Barbora "Köögipuhastusvahend CIF 500ml" (4.69 €) | Rimi "Vannitoapuhastusvahend Cif 500 ml" (4.69 €) |
| Barbora "Õhuvärsk.AIR WICK Citrus täide 250ml" (9.99 €) | Selver "Õhuvärskendaja Citrus täide, AIR WICK, 250 ml" (6.99 €) |
| Barbora "Õhuvärskendaja AIR WICK PureCherry 250ml" (5.69 €) | Selver "Õhuvärskendaja täide, AIR WICK, 250 ml" (9.99 €) |
| Barbora "Kodulõhnastaja AREON Vanilla Black 85ml" (10.99 €) | Rimi "Õhuvärskendaja Areon Black Vanilla 85ml" (10.19 €) |
| Barbora "Õhuvärskendaja AIR WICK Jasmine 237ml" (6.29 €) | Rimi "Õhuvärskendaja Air Wick Jasmine-Freesia 237ml" (4.75 €) |
| Barbora "El.õhuvärsk. täide AMBI PUR Cotton 20ml" (4.59 €) | Rimi "El. õhuvärsk. Ambi Pur 3Vol Cotton 20ml" (10.19 €) |
| Barbora "Õhuvärsk.AMBI PUR Flowers&Spring 185ml" (3.95 €) | Rimi "Õhuvärskendaja Ambi Pur Flowers&Spring 185ml" (6.59 €) |
| Barbora "Üldpuhastusvahend SANYTOL 500ml" (4.69 €) | Selver "Üldpuhastusvahend desinfitseeriv, SANYTOL, 500 ml" (3.69 €) |
| Barbora "Puhastuskreem CIF Lemon mikroos. 540g" (3.69 €) | Selver "Puhastuskreem Lemon Cream, CIF, 540 g" (3.89 €) |
| Barbora "Üldpuhastusvahend SANYTOL Greip 500ml" (4.69 €) | Selver "Üldpuhastusvahend desinfitseeriv, SANYTOL, 500 ml" (3.69 €) |
| Barbora "Universaalne puhastusvahend CIF 500ml" (4.79 €) | Rimi "Puhastusvahend Cif köögile 500ml" (4.69 €) |
| Barbora "Üldpuhastusvahend MAYERI Rhubarb 500ml" (2.06 €) | Rimi "Üldpuhastusvahend Mayeri Sensitive 500ml" (2.75 €) |
| Barbora "Vannitoa puhastusvahend CIF 500ml" (4.69 €) | Rimi "Puhastusvahend Cif köögile 500ml" (4.69 €) |
| Barbora "WC puhastusvahend Harpic Original 750ml" (3.85 €) | Rimi "WC puhastusvahend Harpic hygiene 750ml" (4.99 €) |
| Barbora "WC puhastusvahend Harpic Original 750ml" (3.85 €) | Selver "WC-poti puhastusvahend Original, HARPIC, 750 ml" (3.85 €) |
| Barbora "WC puhastusvahend FROSCH lavender 750ml" (2.39 €) | Rimi "WC puhastusvahend Frosch vaarika 750ml" (2.35 €) |
| Barbora "WC puhastusvahend FROSCH lavender 750ml" (2.39 €) | Rimi "WC puhastusvahend Frosch sidruni 750ml" (2.35 €) |
| Barbora "WC puhastusvahend FROSCH citrus 750ml" (2.35 €) | Rimi "WC puhastusvahend Frosch vaarika 750ml" (2.35 €) |

### Pet food (11)

| Item A | Item B |
|---|---|
| Barbora "Suupiste kassidele DREAMIES kanalih.60g" (1.79 €) | Selver "Täiendsööt. Suupiste kassidele juustu, DREAMIES, 60g" (1.99 €) |
| Barbora "Suupiste kassidele DREAMIES pardilih.60g" (1.79 €) | Selver "Täiendsööt. Suupiste kassidele juustu, DREAMIES, 60g" (1.99 €) |
| Barbora "Suupiste kassidele DREAMIES nõges 60g" (1.79 €) | Selver "Täiendsööt. Suupiste kassidele juustu, DREAMIES, 60g" (1.99 €) |
| Barbora "Kiisueine SHEBA kodulind 4x85g" (3.49 €) | Selver "Kiisueine kodulinnuvalik 4-pakk, SHEBA, 4x85 g" (3.49 €) |
| Barbora "Kiisueine lihavalik SHEBA 4x85g" (3.49 €) | Selver "Kiisueine kodulinnuvalik 4-pakk, SHEBA, 4x85 g" (3.49 €) |
| Barbora "Kiisueine SHEBA kanalihaga, kastmes 85g" (1.05 €) | Rimi "Kiisueine Sheba kanalihaga 85g" (0.75 €) |
| Barbora "Kiisueine linnuliha valik SHEBA 4x85g" (3.49 €) | Rimi "Kiisueine Sheba linnuliha tarretises 4x85g" (1.99 €) |
| Barbora "Kuiv kassitoit tuunikalaga WHISKAS 800g" (4.79 €) | Rimi "Kassitoit tuunikalaga Whiskas Adult 800g" (4.99 €) |
| Barbora "Koeramaiused PEDIGREE markies 150g" (1.25 €) | Rimi "Koeraküpsised Pedigree Markies 150 g" (2.29 €) |
| Barbora "Koera nagitsad metssiga ADVENTUROS 90g" (1.79 €) | Selver "Täiendsööt. Nagitsad koertele metssiga 22tk, ADVENTUROS, 90g" (1.82 €) |
| Barbora "Koeramaius kana Jerkies PEDIGREE 70g" (1.39 €) | Rimi "Koeramaius Pedigree Ranchos Jerkies kana 70g" (2.19 €) |

