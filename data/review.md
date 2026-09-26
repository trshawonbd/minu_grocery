# Price comparison review

Generated 2026-09-26 by `npm run review` (scraper/build-review.js) from already-scraped data — data/raw/ and data/prices.json. Never contacts a store; run `npm run fetch-prices` first for fresh numbers. Unmatched/unclassified/ambiguous counts and listings are recomputed fresh from data/raw/ every time (not read from data/unmatched.json etc., which a single-category run narrows to just that category — see the comment at the top of this file).

Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to the ambiguous list instead of a guess. Selver has no live stock signal in its public API, so its price always carries a "Selver: availability not verified" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Bread | Drinks | Meat | Pasta | Rice & grains | Flour & sugar | Cooking oil | Cheese | Curd & cottage cheese | Cream & sour cream | Kefir & buttermilk | Coffee | Tea & cocoa | Cereals & oats | Canned food | Sauces & condiments | Spices | Jam & honey & spreads | Baking supplies | Chocolate | Candy | Biscuits | Chips & snacks | Nuts, seeds & dried fruit | Frozen vegetables & berries | Ice cream | Dumplings, pizza & fries | Sausages | Ham & cold cuts | Fish & seafood | Baby food | Diapers & baby wipes | Personal care | Household | Pet food | Cakes & pastries | Instant food | World cuisine | Alcohol-free beer, cider & wine | Beer & cider | Wine | Spirits | Curd snacks & desserts | Milk drinks & drinking yoghurt | Crispbreads | Energy, sports & iced-tea drinks | Syrups & juice drinks | Frozen fish & seafood | Frozen dough & pastries | Broths & stock | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 49 + 31 + 25 | 220 + 271 + 214 | 129 + 78 + 133 | 113 + 79 + 98 | 418 + 419 + 351 | 143 + 128 + 110 | 156 + 109 + 110 | 152 + 66 + 72 | 58 + 54 + 74 | 91 + 67 + 58 | 269 + 313 + 231 | 52 + 35 + 39 | 23 + 27 + 25 | 29 + 23 + 26 | 310 + 172 + 184 | 294 + 152 + 146 | 179 + 151 + 151 | 253 + 178 + 171 | 351 + 209 + 311 | 389 + 193 + 246 | 168 + 98 + 109 | 76 + 76 + 24 | 221 + 154 + 137 | 467 + 341 + 280 | 275 + 206 + 197 | 299 + 177 + 86 | 226 + 189 + 152 | 70 + 50 + 78 | 258 + 228 + 161 | 118 + 73 + 83 | 268 + 152 + 151 | 277 + 175 + 188 | 351 + 202 + 236 | 257 + 156 + 162 | 142 + 77 + 78 | 1578 + 1604 + 764 | 716 + 670 + 529 | 422 + 338 + 206 | 114 + 125 + 126 | 162 + 108 + 93 | 58 + 44 + 51 | 75 + 64 + 51 | 340 + 328 + 245 | 820 + 497 + 658 | 711 + 453 + 429 | 161 + 152 + 78 | 89 + 67 + 41 | 17 + 45 + 50 | 107 + 106 + 83 | 79 + 75 + 92 | 39 + 30 + 31 | 44 + 28 + 45 | 29 + 18 + 20 | 31062 |
| Matched (any store combination) | 26 | 132 | 91 | 115 | 238 | 32 | 61 | 34 | 50 | 34 | 146 | 34 | 19 | 6 | 101 | 66 | 87 | 73 | 193 | 155 | 66 | 27 | 103 | 214 | 111 | 67 | 82 | 34 | 91 | 43 | 134 | 118 | 111 | 109 | 56 | 465 | 270 | 119 | 30 | 61 | 29 | 33 | 211 | 235 | 279 | 58 | 28 | 12 | 61 | 63 | 15 | 23 | 9 | 5060 |
| — at all 3 stores | 10 | 30 | 24 | 37 | 51 | 8 | 22 | 12 | 12 | 9 | 44 | 9 | 4 | 0 | 17 | 12 | 14 | 23 | 44 | 41 | 9 | 2 | 19 | 34 | 28 | 14 | 14 | 12 | 9 | 9 | 36 | 41 | 28 | 10 | 14 | 54 | 32 | 7 | 7 | 13 | 4 | 6 | 53 | 30 | 79 | 8 | 11 | 2 | 9 | 12 | 4 | 7 | 3 | 1043 |
| — at 2 stores only (Barbora + Rimi) | 3 | 15 | 3 | 21 | 22 | 4 | 5 | 1 | 1 | 2 | 9 | 3 | 3 | 1 | 12 | 6 | 7 | 2 | 19 | 6 | 1 | 12 | 9 | 19 | 2 | 8 | 4 | 0 | 6 | 2 | 8 | 4 | 7 | 1 | 1 | 90 | 27 | 5 | 4 | 9 | 3 | 1 | 18 | 15 | 36 | 7 | 2 | 0 | 6 | 4 | 1 | 1 | 0 | 458 |
| — at 2 stores only (Barbora + Selver) | 2 | 7 | 7 | 9 | 12 | 5 | 3 | 5 | 5 | 1 | 3 | 4 | 1 | 0 | 6 | 2 | 1 | 5 | 14 | 13 | 9 | 2 | 1 | 2 | 3 | 3 | 2 | 3 | 3 | 6 | 10 | 11 | 11 | 6 | 11 | 24 | 9 | 2 | 1 | 7 | 1 | 3 | 4 | 27 | 38 | 4 | 1 | 0 | 4 | 1 | 2 | 3 | 1 | 320 |
| — at 2 stores only (Rimi + Selver) | 1 | 7 | 3 | 7 | 1 | 2 | 3 | 1 | 2 | 1 | 5 | 2 | 1 | 5 | 4 | 0 | 3 | 1 | 4 | 11 | 0 | 2 | 1 | 3 | 2 | 5 | 7 | 2 | 1 | 3 | 3 | 3 | 2 | 0 | 1 | 20 | 2 | 0 | 6 | 2 | 0 | 1 | 2 | 18 | 32 | 5 | 0 | 0 | 1 | 3 | 1 | 2 | 0 | 194 |
| Unmatched | 51 | 571 | 237 | 124 | 976 | 367 | 278 | 197 | 165 | 170 | 653 | 68 | 60 | 68 | 510 | 557 | 382 | 584 | 570 | 566 | 323 | 133 | 413 | 994 | 624 | 520 | 537 | 174 | 606 | 221 | 421 | 509 | 726 | 504 | 114 | 3595 | 1788 | 1043 | 351 | 273 | 109 | 164 | 667 | 1849 | 1038 | 330 | 164 | 103 | 225 | 197 | 96 | 106 | 51 | 26122 |
| Unclassified | 0 | 15 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 21 |
| Ambiguous groups | 0 | 9 | 0 | 2 | 4 | 2 | 0 | 17 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 3 | 1 | 0 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 3 | 2 | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 83 |

**Note:** recomputed 5014 matches from data/raw/, but data/prices.json has 5060 — data/raw/ has moved on since the last run that wrote prices.json for some category.

## 1. All matched products

| Product | Category | Barbora | Rimi | Selver | Cheapest |
|---|---|---|---|---|---|
| A. le coq alkoholivaba premium prk 500ml | Alcohol-free beer, cider & wine | 0.89 € | 0.99 € | — | Barbora |
| Alexander alkoholivaba bohemian 0.0% 500ml | Alcohol-free beer, cider & wine | 1.19 € | 1.15 € | 1.05 € | Selver |
| Alk alkoholivaba jook barbara mull rabarberiga 750ml | Alcohol-free beer, cider & wine | — | — | 7.99 € | Coop |
| Alk alkoholivaba jook maasika ja mull rabarberi rose rabarberiga 750ml | Alcohol-free beer, cider & wine | — | — | 7.99 € | Coop |
| Alk alkoholivaba premium a coq le purk 500ml | Alcohol-free beer, cider & wine | — | — | 1.26 € | Coop |
| Alk alkoholivaba siider apple hoggys purk 500ml | Alcohol-free beer, cider & wine | — | 1.15 € | 1.14 € | Coop |
| Alk alkoholivaba vahuvein rabarbra null 0.5% 750ml | Alcohol-free beer, cider & wine | — | — | 7.99 € (5.49 € Partner) | Selver |
| Blue nun Vv alkoholivaba white 750ml | Alcohol-free beer, cider & wine | — | — | 7.10 € | Coop |
| Clausthaler alkoholivaba dry hopped pudel 330ml | Alcohol-free beer, cider & wine | — | — | 1.19 € (0.95 € Partner) | Selver |
| Clausthaler Alkoholivaba lemon 500ml | Alcohol-free beer, cider & wine | 1.39 € (0.99 € Aitäh) | — | — | Coop |
| Clausthaler alkoholivaba lemon pudel 330ml | Alcohol-free beer, cider & wine | — | 1.29 € | 1.19 € (0.95 € Partner) | Selver |
| Clausthaler alkoholivaba original pudel 330ml | Alcohol-free beer, cider & wine | — | — | 1.19 € (0.95 € Partner) | Selver |
| Corona alkoholivaba cero pudel 0.0% 330ml | Alcohol-free beer, cider & wine | — | 1.69 € | — | Rimi |
| Estrella Alkoholivaba damm 0.0% 500ml | Alcohol-free beer, cider & wine | 1.29 € (1.09 € Aitäh) | — | 1.39 € | Barbora |
| Fassbrause alkoholivaba lemon purk õllejook 0.0% 500ml | Alcohol-free beer, cider & wine | — | — | 1.25 € | Coop + Selver |
| Fassbrause alkoholivaba mojito purk õllejook 0.0% 500ml | Alcohol-free beer, cider & wine | — | — | 1.25 € | Coop + Selver |
| Fassbrause alkoholivaba õllejook cherry prk 0.0% 500ml | Alcohol-free beer, cider & wine | — | 1.25 € | 1.25 € | Coop + Rimi + Selver |
| Fassbrause alkoholivaba peach purk õllejook 0.0% 500ml | Alcohol-free beer, cider & wine | — | — | 1.25 € | Coop + Selver |
| G:n alkoholivaba grapefruit a coq jook ld le purk 500ml | Alcohol-free beer, cider & wine | — | — | 1.14 € | Selver |
| Hartwall alkoholivaba original jook ld purk 330ml | Alcohol-free beer, cider & wine | — | — | 0.99 € (0.79 € Partner) | Coop + Selver |
| Heineken alkoholivaba pudel 0% 330ml | Alcohol-free beer, cider & wine | 1.25 € | 1.29 € | 1.29 € | Barbora |
| Saku Alkoholivaba originaal purk 500ml | Alcohol-free beer, cider & wine | — | 1.25 € | 1.24 € (0.99 € Partner) | Selver |
| Saku Alkoholivaba rock zero purk 0.5% 500ml | Alcohol-free beer, cider & wine | 0.79 € | — | 0.89 € | Barbora |
| Saku on ice Alkoholivaba hola 330ml | Alcohol-free beer, cider & wine | 1.09 € (0.79 € Aitäh) | 1.09 € | 1.26 € | Barbora + Coop + Rimi |
| Saku on ice Saku alkoholivaba mango õllejook 500ml | Alcohol-free beer, cider & wine | — | — | 1.26 € | Coop |
| Somersby alkoholivaba siider mandarine prk 500ml | Alcohol-free beer, cider & wine | — | 1.19 € | — | Rimi |
| Somersby Alkoholivaba siider pear 500ml | Alcohol-free beer, cider & wine | 1.25 € (0.99 € Aitäh) | 1.19 € | 1.29 € | Rimi |
| Staropramen Alkoholivaba 330ml | Alcohol-free beer, cider & wine | 1.29 € (0.99 € Aitäh) | — | 1.29 € | Barbora + Selver |
| Tanker alkoholivaba select purk 0% 500ml | Alcohol-free beer, cider & wine | — | — | 0.99 € | Selver |
| Törley Alkoholivaba vahuvein 750ml | Alcohol-free beer, cider & wine | 6.09 € | 6.19 € | 6.79 € | Barbora |
| Warsteiner alkoholivaba fresh 330ml | Alcohol-free beer, cider & wine | 1.15 € | — | 1.17 € | Barbora |
| Wõlu Alkoholivaba vahuvein maasikas 0.5% 750ml | Alcohol-free beer, cider & wine | 6.15 € | — | — | Coop |
| Wõlu Alkoholivaba vahuvein rabarber 0.5% 750ml | Alcohol-free beer, cider & wine | 6.25 € | — | — | Coop |
| Aptamil Piimajook 200ml | Baby food | — | — | 2.69 € | Coop + Selver |
| Babycool suvikõrvitsapüree kuubikud 200g | Baby food | — | — | 5.28 € | Coop |
| Babycool Veiselihapüree kuubikud külmutatud 200g | Baby food | — | — | 11.88 € | Coop |
| Bebivita Apteegitilli tee 200g | Baby food | 4.45 € | — | 4.46 € | Barbora |
| Bebivita Õuna melissi tee 200g | Baby food | 4.45 € | — | — | Coop |
| Ella's kitchen Kanaroog riisiga 130g | Baby food | 3.29 € | — | 3.65 € | Barbora |
| Hipp Beebiküpsis mahe 180g | Baby food | — | — | 4.15 € | Coop + Selver |
| Hipp bio Aedviljad riisi ja vasikalihaga mahe 220g | Baby food | — | — | 2.79 € (2.29 € Partner) | Coop + Selver |
| Hipp bio Aedviljapüree kalkuniliha riisiga mahe 220g | Baby food | — | — | 2.79 € | Coop + Selver |
| Hipp bio Ban pirni ja mangoga hippis püree mahe 100g | Baby food | — | — | 2.02 € (1.39 € Partner) | Selver |
| Hipp bio Juurvilja nuudlipüree kanalihaga mahe 220g | Baby food | — | — | 2.79 € | Coop + Selver |
| Hipp bio Õuna ban batoon puuviljasõber vaar mahe 23g | Baby food | — | — | 1.69 € (1.29 € Partner) | Coop |
| Hipp bio Õuna ban beebiküps hippis püree mahe 100g | Baby food | — | — | 2.05 € | Coop |
| Hipp bio Õuna ban hippis püree vaarikaga mahe 100g | Baby food | — | — | 2.05 € (1.39 € Partner) | Coop + Selver |
| Hipp bio Õuna banaani smuutijook marj pun mahe 120ml | Baby food | — | — | 1.59 € | Selver |
| Hipp bio Õuna pirni ja ban hippis püree mahe 100g | Baby food | — | — | 2.05 € | Coop + Selver |
| Hipp bio Õuna pirni smuutijook mustikatega mahe 120ml | Baby food | — | — | 2.12 € | Selver |
| Hipp bio Peedi õuna loomalihaga juurv püree mahe 220g | Baby food | — | — | 2.84 € | Coop |
| Hipp bio Piimapuder head ööd küpsiste õunte mahe 190g | Baby food | — | — | 1.99 € | Selver |
| Hipp bio Puuviljasõber kirsi ban batoon jog mahe 23g | Baby food | — | — | 1.69 € (1.29 € Partner) | Coop + Selver |
| Hipp bio Puuviljasõber õuna kaerabatoon ban mahe 23g | Baby food | — | — | 1.25 € | Selver |
| Hipp bio Riisivahvlid mustikaga mahe 30g | Baby food | — | — | 2.45 € | Coop + Selver |
| Hipp bio Tomati nuudlipüree vasikalihaga mahe 220g | Baby food | — | — | 2.84 € | Coop |
| Hipp head ööd küpsis org piimap beebiküpsistega mahe 250g | Baby food | — | — | 5.05 € | Coop + Selver |
| Hipp Juurviljapüree mahe 125g | Baby food | 1.65 € | — | 1.68 € | Barbora + Coop |
| Hipp Kaerapudrupulber mahe 200g | Baby food | 3.74 € | — | — | Barbora |
| Hipp Kalkunilihapüree mahe 125g | Baby food | 3.65 € | — | 3.65 € | Barbora + Selver |
| Hipp Makaronid kalaga spargelkapsa koorek 220g | Baby food | — | — | 2.79 € (2.29 € Partner) | Coop + Selver |
| Hipp Mitmeviljapuder mahe 200g | Baby food | 3.79 € | — | 5.05 € | Barbora |
| Hipp Õuna porgandimahl mahe 200ml | Baby food | 1.79 € | — | 1.78 € | Selver |
| Hipp Õunamahl mahe 200ml | Baby food | 1.79 € | — | 1.78 € | Coop |
| Hipp Õunapüree banaaniga hippis mahe 100g | Baby food | — | — | 2.02 € | Selver |
| Hipp Õunapüree hippis maasika banaani mahe 100g | Baby food | — | — | 2.05 € | Coop + Selver |
| Hipp Piimapudru head ööd banaan kuivik mahe 250g | Baby food | — | — | 5.05 € (4.29 € Partner) | Coop + Selver |
| Hipp Pirnipüree hippis m ploom sõstar mahe 100g | Baby food | — | — | 2.05 € | Coop + Selver |
| Hipp Pirnipüree williams mahe 125g | Baby food | 1.79 € | — | 1.82 € | Barbora |
| Hipp Riisivahvlid vaarikatega mahe 30g | Baby food | 2.25 € | — | 2.45 € | Barbora |
| Hipp Spagetid bolognese mahe 190g | Baby food | 2.69 € | — | — | Barbora + Coop |
| Hipp Spargelkapsa risoto küülikulihaga 220g | Baby food | — | — | 2.79 € (2.29 € Partner) | Coop + Selver |
| Hipp Tatra piimapudrupulber 250g | Baby food | — | — | 5.07 € | Coop |
| Hipp Veiselihapüree mahe 125g | Baby food | 3.65 € | 3.99 € | 3.65 € | Barbora + Coop + Selver |
| Hipp Virsiku mango hippis ban jog org püree jogurtiga mahe 100g | Baby food | — | — | 2.02 € | Selver |
| Holle Täistera viljapuder 250g | Baby food | 4.31 € | — | — | Barbora |
| Maisipulgad ellas kitchen maasika banaani 20g | Baby food | — | — | 1.59 € | Selver |
| Maisipulgad pastinaagi ellas kitchen porg mahe 20g | Baby food | — | — | 1.59 € | Selver |
| Milupa Hea une õuna pirni kaerapuder pirnidega 250g | Baby food | — | — | 4.95 € (3.99 € Partner) | Coop + Selver |
| Milupa Riisipuder piimaga shok tükikestega 250g | Baby food | — | — | 4.95 € (3.99 € Partner) | Coop + Selver |
| Milupa Täisterapuder piimaga puuviljadega 250g | Baby food | — | — | 4.95 € (3.99 € Partner) | Coop + Selver |
| Muuti Ök ban lõvi mangopür riisivalg virs mahe riisivalguga 110g | Baby food | — | — | 1.59 € | Coop |
| Muuti Ök mango porgandi astelp orav püree mahe 110g | Baby food | — | — | 1.59 € | Coop |
| Muuti Ök õuna mango m rebane sõstrapür mahe 110g | Baby food | — | — | 1.59 € | Coop |
| Muuti Ök õuna mustikapüree ahv ban mahe 110g | Baby food | — | — | 1.15 € | Selver |
| Muuti Ök pirni vaarika ban elevant püree mahe 110g | Baby food | — | — | 1.15 € | Selver |
| Muuti Ök pohla mustika rukkipuder karu põnn mahe 110g | Baby food | — | 1.59 € | 1.59 € | Coop |
| Nogel Brokkolipüree rauaga mahe 70g | Baby food | — | 1.09 € | — | Rimi |
| Nogel Kaera õuna rauaga riisipud virs mahe 100g | Baby food | — | — | 1.95 € | Coop |
| Nogel Kaerapuder aprik porg rauaga mahe 100g | Baby food | — | — | 1.79 € | Selver |
| Nogel Pirni ploomi kiivismuuti rauaga mahe 100g | Baby food | — | — | 1.95 € | Coop |
| Nogel Riisipuder rauaga ploomi pirni mahe 190g | Baby food | — | 2.19 € | — | Coop + Rimi |
| Nogel Tatrapud pirni lillkapsa rauaga mahe 100g | Baby food | — | — | 1.95 € | Coop |
| Organix Kaerabatoon maasika õuna 23g | Baby food | 1.59 € | — | 1.69 € | Barbora |
| Organix Maisipulgad herne tomati 15g | Baby food | — | — | 1.96 € | Coop |
| Organix Porgandipulgad mahe 20g | Baby food | — | — | 1.85 € | Coop |
| Õuna viinamarja aroonianektar hippbio pun arooniaga 500ml | Baby food | — | — | 3.24 € | Coop |
| Plasmon Beebiküpsised 120g | Baby food | 2.55 € | 2.55 € | 2.33 € | Selver |
| Plasmon Beebiküpsised 60g | Baby food | 1.45 € | 1.45 € | — | Barbora + Rimi |
| Põnn Aedvilja pastaroog kanalihaga mahe 120g | Baby food | — | — | 2.09 € (1.65 € Partner) | Coop + Selver |
| Põnn Hirsi kaerapuder ploomi kol mango mahe 110g | Baby food | — | — | 1.29 € | Selver |
| Põnn Kaerapuder mustikaga mahe 190g | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Kõrvitsapüree mahe 125g | Baby food | 1.55 € | 1.65 € | 1.55 € | Barbora + Coop + Selver |
| Põnn Kuivatatud ploomi püree mahe 4 100g | Baby food | — | — | 1.69 € (1.29 € Partner) | Coop + Selver |
| Põnn Maasikasmuuti mahe 110g | Baby food | — | — | 1.29 € | Selver |
| Põnn Maisikrõbuskid maasika õuna mahe 20g | Baby food | — | 1.49 € | 1.09 € | Coop + Selver |
| Põnn Maisikrõbuskid mango ja banaan mahe 20g | Baby food | — | — | 1.45 € (1.19 € Partner) | Coop + Selver |
| Põnn Maisikrõbuskid porgandi tomati mahe 20g | Baby food | — | — | 1.45 € | Coop + Selver |
| Põnn Mango kookosesmuuti mahe 110g | Baby food | — | 1.79 € | 1.85 € | Rimi |
| Põnn Mangopüree mahe 100g | Baby food | — | — | 1.69 € | Coop + Selver |
| Põnn Mustika õunapüree mahe 100g | Baby food | — | — | 1.69 € (1.29 € Partner) | Coop + Selver |
| Põnn neljaviljapuder vaarika mahe 200g | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Ök õuna kaneeli headpäeva mitmev puder mahe 110g | Baby food | — | — | 1.85 € (1.39 € Partner) | Coop + Selver |
| Põnn Ökol aedvilja pastaroog veiselihaga 190g | Baby food | — | — | 2.29 € | Coop + Selver |
| Põnn Ökol aedviljapüree kanafileega 190g | Baby food | — | 1.79 € | 1.79 € | Rimi + Selver |
| Põnn Ökol kaerapuder sõstra kookos m ploom kookosega mahe 110g | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Ökol kanalihapüree mahe 120g | Baby food | — | — | 2.79 € | Selver |
| Põnn Ökol köögiviljapüree kanalihaga 110g | Baby food | — | — | 1.89 € | Coop + Selver |
| Põnn Ökol köögiviljapüree seasisefileega 110g | Baby food | — | — | 1.89 € | Coop + Selver |
| Põnn Ökol köögiviljapüree veiselihaga 110g | Baby food | — | — | 1.89 € | Coop + Selver |
| Põnn Ökol köögiviljapüree veiselihaga 190g | Baby food | — | — | 1.79 € | Coop |
| Põnn Ökol kõrvitsa bataadi mangopüree mahe 110g | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Ökol makaroni juusturoog veiselihaga 130g | Baby food | — | — | 2.19 € (1.79 € Partner) | Coop + Selver |
| Põnn Ökol neljaviljapuder mustikaga banaan 110g | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Ökol pirni virsiku kiivismuuti mahe 110g | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Ökol puuvilja jogurtismuuti küpsistega 110g | Baby food | — | — | 1.82 € | Selver |
| Põnn Ökol veiselihapüree mahe 120g | Baby food | — | 2.79 € | 2.79 € | Rimi + Selver |
| Põnn Pirnipüree mahe 100g | Baby food | — | — | 1.69 € | Coop + Selver |
| Põnn Ploomimehu mahe 240ml | Baby food | — | — | 1.87 € | Coop |
| Põnn Porgandimehu mahe 240ml | Baby food | — | — | 1.85 € | Coop + Selver |
| Põnn Puuviljasmuuti mahe 110g | Baby food | — | — | 1.29 € | Selver |
| Põnn Riisivahvlid vaarika banaani mahe 40g | Baby food | — | — | 2.19 € | Coop |
| Põnn Täisterapuder banaani mustsõstraga mahe 200g | Baby food | — | — | 1.79 € | Coop + Selver |
| Põnn Teraviljapuder head und piima puuv mahe 110g | Baby food | — | — | 1.87 € | Coop |
| Põnn Toortatraroog veiselihaga mahe 190g | Baby food | — | 2.35 € | 2.29 € (1.95 € Partner) | Coop + Selver |
| Põnn Ühepajatoit sealihaga mahe 130g | Baby food | 2.19 € | 2.19 € | 2.19 € (1.79 € Partner) | Barbora + Coop + Rimi + Selver |
| Puuviljapüree punane ellas kitchen orgaan mahe 90g | Baby food | — | — | 2.02 € | Coop |
| Semper Õuna vaarika banaanipüree frukt mums 110g | Baby food | — | — | 1.85 € | Coop + Selver |
| Semper Pirni banaani mangopüree frukt mums 110g | Baby food | — | — | 1.85 € | Coop + Selver |
| Semper Puuviljapüree frukt mums maasika 110g | Baby food | — | — | 1.39 € | Coop |
| Semper Puuviljapüree frukt mums mango 110g | Baby food | — | — | 1.85 € | Coop |
| Semper Virsiku õuna banaanipüree frukt mums 110g | Baby food | — | — | 1.82 € | Coop |
| Aptamil 1 400g | Baby formula | 10.99 € | 11.59 € | — | Barbora |
| Aptamil 1 800g | Baby formula | 15.99 € | 18.99 € | 19.19 € | Barbora |
| Aptamil 2 1200g | Baby formula | 26.99 € | 24.49 € | 24.49 € | Rimi + Selver |
| Aptamil 2 800g | Baby formula | 15.99 € | 14.05 € | 19.19 € | Rimi |
| Aptamil 3 1200g | Baby formula | 26.99 € | 24.49 € | 24.49 € | Rimi + Selver |
| Aptamil 3 800g | Baby formula | 15.99 € | 14.05 € | 19.19 € | Rimi |
| Aptamil 4 800g | Baby formula | 15.99 € | 14.05 € | 19.19 € | Rimi |
| Aptamil Jätkupiimasegu 2 2x200ml | Baby formula | 4.49 € | 4.39 € | 4.39 € | Rimi + Selver |
| Aptamil Jätkupiimasegu comfort2 400g | Baby formula | 13.99 € | 14.75 € | — | Barbora + Coop |
| Aptamil Piimajook 3 200ml | Baby formula | 2.69 € | 2.29 € | — | Rimi |
| Aptamil Piimasegu AR 400g | Baby formula | 13.19 € | 13.19 € | — | Barbora + Rimi |
| Aptamil Piimasegu Comfort 400g | Baby formula | — | 13.99 € | 13.99 € | Rimi + Selver |
| Friso Jätkupiimasegu 2 800g | Baby formula | 26.45 € | — | 22.90 € | Selver |
| Hipp Imiku Comfort 300g | Baby formula | 12.19 € | — | 12.19 € | Coop |
| Hipp Imiku mahe 1 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Hipp Jätkupiimasegu mahe 2 200ml | Baby formula | 2.49 € | — | 2.49 € | Coop |
| Hipp Jätkupiimasegu mahe 2 800g | Baby formula | 19.99 € | 19.99 € | 20.90 € | Barbora + Rimi |
| Hipp Kitsepiimasegu mahe 1 400g | Baby formula | 20.29 € | 18.49 € | 20.32 € | Rimi |
| Hipp Kitsepiimasegu mahe 2 400g | Baby formula | 16.49 € | 18.49 € | 20.32 € (16.49 € Partner) | Barbora |
| Hipp Piimasegu 3 500g | Baby formula | 10.49 € | 11.99 € | — | Barbora |
| Holle 1 400g | Baby formula | — | — | 20.50 € | Coop |
| Holle Kitsepiimasegu 2 400g | Baby formula | — | — | 20.50 € | Coop + Selver |
| Nuppi gold Piimal 1 350g | Baby formula | — | — | 6.99 € | Coop |
| Nuppi Jätkupiimasegu 2 350g | Baby formula | 5.89 € | — | — | Barbora + Coop |
| Tutteli Tuttelitm 1 650g | Baby formula | 9.99 € | — | 9.99 € | Barbora + Selver |
| Tutteli Tuttelitm 2 650g | Baby formula | 11.49 € | 9.99 € | 9.99 € | Rimi + Selver |
| Dr.oetker Dr geeltoiduvärv punane 10g | Baking supplies | — | — | 1.85 € | Selver |
| Dr.oetker Geeltoiduvärv kollane 10g | Baking supplies | — | — | 1.85 € | Selver |
| Dr.oetker Geeltoiduvärv sinine 10g | Baking supplies | — | — | 1.85 € | Selver |
| Dr.oetker Koogiglasuur valge tumeda shok segu 100g | Baking supplies | — | — | 2.09 € | Selver |
| Dr.oetker Küpsetuspulber 160g | Baking supplies | — | 2.99 € | 3.00 € | Rimi |
| Dr.oetker Küpsetuspulber 30g | Baking supplies | 0.49 € | 0.55 € | — | Barbora |
| Dr.oetker Šokolaadi tordikaunistused 80g | Baking supplies | 1.99 € | 2.29 € | — | Barbora |
| Dr.oetker Söögisooda 70g | Baking supplies | 0.60 € | 0.65 € | — | Barbora |
| Dr.oetker Suhkrukaunistused 80g | Baking supplies | 2.45 € | 2.45 € | — | Barbora + Rimi |
| Dr.oetker Suhkrust südamekesed 10g | Baking supplies | 1.15 € | 1.15 € | — | Barbora + Rimi |
| Dr.oetker Toiduvärv punane 10g | Baking supplies | 1.85 € | 2.05 € | — | Barbora |
| Dr.oetker Toiduvärv roheline 10g | Baking supplies | 1.85 € | 2.05 € | — | Barbora |
| Dr.oetker Toiduvärv sinine 10g | Baking supplies | 1.85 € | 2.05 € | — | Barbora |
| Dr.oetker Valge glasuur šokolaadi 100g | Baking supplies | 2.09 € | — | 2.09 € | Barbora + Selver |
| Dr.oetker Želatiin 20g | Baking supplies | 0.89 € | 0.89 € | — | Barbora + Rimi |
| Dr.oetker Želatiinilehed 10g | Baking supplies | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Lombardi Söögisooda 500g | Baking supplies | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Meira Küpsetuspulber 100g | Baking supplies | — | 1.79 € | 1.62 € | Coop |
| Meira söögisooda 125g | Baking supplies | — | — | 1.27 € | Selver |
| Meira Söögisooda 50g | Baking supplies | — | — | 0.60 € | Selver |
| Meira Värviline nonparell 60g | Baking supplies | 1.88 € | — | 1.88 € | Barbora + Selver |
| Mikaado Moosipaksendaja 30g | Baking supplies | — | 1.99 € | 1.88 € | Selver |
| Nordic Pärm 50g | Baking supplies | 0.39 € | 0.40 € | 0.36 € | Coop |
| Santa maria Küpsetuspulber 45g | Baking supplies | 0.85 € | 0.95 € | 0.85 € (0.65 € Partner) | Barbora + Selver |
| Santa maria Sidrunhape 32g | Baking supplies | 0.75 € | 0.79 € | — | Barbora |
| Santa maria Želatiin 25g | Baking supplies | 1.25 € | — | 1.25 € | Barbora + Selver |
| Veski mati Kuivpärm 11g | Baking supplies | 0.47 € | — | — | Barbora |
| A le coq premium 4.7% 330ml | Beer & cider | 1.70 € | 1.79 € | — | Barbora |
| A le coq special 5.2% 6x500ml | Beer & cider | 8.39 € | 10.99 € | — | Barbora |
| A. le coq Muu long melon jook purk 5.5% 330ml | Beer & cider | — | — | 1.59 € | Selver |
| A. le coq pilsner 4.2% 500ml | Beer & cider | 1.59 € | 1.59 € | — | Barbora + Rimi |
| A. le coq pilsner prk 4.2% 6x500ml | Beer & cider | 9.25 € | — | 9.25 € | Barbora + Selver |
| A. le coq pilsner purk 4.2% 500ml | Beer & cider | 1.59 € | 1.59 € | 1.59 € | Barbora + Coop + Rimi + Selver |
| A. le coq premium pdl 4.7% 6x500ml | Beer & cider | — | 9.99 € | 9.99 € | Rimi + Selver |
| A. le coq premium prk 4.7% 500ml | Beer & cider | — | 1.35 € | 1.79 € | Rimi |
| A. le coq premium purk 4.7% 24x330ml | Beer & cider | — | — | 19.99 € | Selver |
| A. le coq premium purk 4.7% 330ml | Beer & cider | — | 0.94 € | 0.89 € | Selver |
| A. le coq premium select 4.3% 12x355ml | Beer & cider | 13.59 € | — | 11.99 € | Coop + Selver |
| A. le coq premium select prk 4.3% 355ml | Beer & cider | 1.25 € | 1.29 € | 1.29 € | Barbora |
| A.le coq i prk 2.9% 500ml | Beer & cider | — | 1.45 € | 1.45 € | Rimi + Selver |
| A.le coq Muu cuba libre jook 4.7% 330ml | Beer & cider | — | — | 1.60 € | Selver |
| A.le coq Muu g jook ld mohhiito n 5.5% 1500ml | Beer & cider | — | — | 4.75 € | Coop + Selver |
| A.le coq Muu grapefruit g n jook ld 5.5% 500ml | Beer & cider | — | — | 2.09 € | Coop + Selver |
| A.le coq Muu jook lemon spritz pudel 4.7% 330ml | Beer & cider | — | — | 1.60 € | Selver |
| A.le coq Muu jook long grapefruit 5.5% 500ml | Beer & cider | — | — | 1.99 € | Selver |
| A.le coq Muu long grapefruit jook 5.5% 330ml | Beer & cider | — | — | 1.59 € | Selver |
| A.le coq Muu long passionfruit jook 5.5% 330ml | Beer & cider | — | — | 1.64 € | Selver |
| A.le coq Muu long strong jook purk 7.5% 330ml | Beer & cider | — | — | 1.96 € | Coop |
| A.le coq Muu long tropical jook purk 5.5% 330ml | Beer & cider | — | — | 1.64 € | Selver |
| A.le coq Muu mojito jook 4.7% 330ml | Beer & cider | — | — | 1.60 € | Selver |
| A.le coq Muu turbo g jook ld n pudel 5.5% 1500ml | Beer & cider | — | — | 4.75 € | Coop + Selver |
| A.le coq Muu watermelon margarita j 4.7% 330ml | Beer & cider | — | — | 1.60 € | Selver |
| A.le coq pilsner pudel 4.2% 500ml | Beer & cider | — | — | 1.62 € | Coop |
| A.le coq premium export purk 5.2% 12x330ml | Beer & cider | — | — | 10.49 € | Selver |
| A.le coq premium prk 4.7% 6x500ml | Beer & cider | — | 9.99 € | 10.05 € | Rimi |
| A.le coq purk sandels 4.7% 500ml | Beer & cider | — | — | 1.49 € | Selver |
| A.le coq special pudel 5.2% 500ml | Beer & cider | — | — | 1.55 € | Selver |
| A.le coq Tume baltic porter pudel 6% 750ml | Beer & cider | — | — | 4.25 € | Selver |
| A.le coq Tume taar purk saare 4.2% 500ml | Beer & cider | — | — | 1.69 € | Coop + Selver |
| Alexander a coq filt le mata purk 5% 568ml | Beer & cider | — | — | 1.92 € | Coop |
| Alexander pdl a coq le 5.2% 500ml | Beer & cider | — | 1.69 € | 1.59 € | Selver |
| Alexander prk 5.2% 568ml | Beer & cider | 1.95 € | 1.79 € | — | Rimi |
| Alexander purk a coq le 5.2% 568ml | Beer & cider | — | — | 1.92 € | Coop |
| Alexander purk a coq le 5.2% 6x568ml | Beer & cider | — | — | 10.99 € | Coop + Selver |
| Alexander Tume dunkel prk 4.2% 568ml | Beer & cider | 1.95 € | — | 1.92 € | Coop |
| Alexander väike sass 4.8% 6x330ml | Beer & cider | 5.29 € | — | 7.49 € | Barbora |
| Alexander westfalen pils 5% 568ml | Beer & cider | 1.89 € | 1.89 € | 1.89 € | Barbora + Coop + Rimi + Selver |
| Angelo poretti 5% 500ml | Beer & cider | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Arom spritz roll originale veinikokteil 8% 750ml | Beer & cider | — | — | 7.99 € | Coop |
| Asahi super dry 5% 330ml | Beer & cider | 2.39 € | 2.55 € | — | Barbora |
| Bacardi breezer Muu orange jook 4% 275ml | Beer & cider | — | — | 2.39 € | Coop + Selver |
| Bacardi breezer Muu watermelon jook 4% 275ml | Beer & cider | — | — | 2.39 € | Coop + Selver |
| Bacardi Muu mojito jook purk 5% 250ml | Beer & cider | — | — | 2.39 € | Coop + Selver |
| Benediktiner weissbier 5.4% 500ml | Beer & cider | 2.29 € | 2.39 € | — | Barbora |
| Birra moretti prk 4.6% 500ml | Beer & cider | — | 2.19 € | — | Coop |
| Bitburger premium pils 4.8% 500ml | Beer & cider | 2.19 € | 2.29 € | — | Barbora |
| Brothers Siider toffee pudel apple 4% 500ml | Beer & cider | — | — | 4.09 € | Coop |
| Budweiser budvar pudel lager 5% 500ml | Beer & cider | — | — | 2.79 € | Coop |
| Carlsberg prk 5% 500ml | Beer & cider | 1.19 € | — | 2.05 € | Barbora |
| Cooler Muu dark cherry jook 4% 275ml | Beer & cider | — | 1.95 € | 1.95 € | Rimi + Selver |
| Cooler Muu green apple jook 4% 275ml | Beer & cider | — | — | 1.95 € | Selver |
| Cooler Muu mellow peach jook pudel 4% 275ml | Beer & cider | — | — | 1.95 € | Selver |
| Cooler Muu passion fruit jook 4% 275ml | Beer & cider | — | — | 1.95 € | Selver |
| Corona extra pudel 4.5% 355ml | Beer & cider | 1.69 € | — | 1.69 € | Barbora + Selver |
| Corona extra pudel 4.5% 6x355ml | Beer & cider | — | — | 9.99 € | Selver |
| Double bock Kange a le coq 7% 500ml | Beer & cider | — | — | 1.89 € | Coop |
| Estrella damm prk 4.6% 500ml | Beer & cider | — | 2.15 € | 2.09 € | Coop |
| Estrella de levante prk 4.8% 500ml | Beer & cider | 2.19 € | 2.15 € | 2.09 € | Coop |
| Estrella galicia purk 5.5% 500ml | Beer & cider | 2.69 € | 2.49 € | — | Rimi |
| Fizz Siider blueberry purk 4.5% 500ml | Beer & cider | 1.79 € | — | 1.75 € | Coop |
| Fizz Siider pear pet 4.5% 1500ml | Beer & cider | — | — | 4.43 € | Coop |
| Fizz Siider pear purk 4.5% 500ml | Beer & cider | — | — | 1.75 € | Coop + Selver |
| G:n Muu grapefruit jook ld 5.5% 1500ml | Beer & cider | — | — | 4.75 € | Coop + Selver |
| G:n Muu grapefruit jook ld pet 5.5% 500ml | Beer & cider | — | — | 1.79 € | Selver |
| G:n Muu jook watermelon ld pet 5.5% 1500ml | Beer & cider | — | — | 4.75 € | Coop + Selver |
| G:n Muu jook watermelon ld purk 5.5% 500ml | Beer & cider | — | — | 2.09 € | Coop + Selver |
| Garage Muu californian pear hard j 4.6% 275ml | Beer & cider | — | — | 1.72 € | Coop |
| Garage Muu hard lemon jook purk 4% 500ml | Beer & cider | — | 2.19 € | 2.21 € | Coop |
| Garage Muu hard lingonberry jook 4.6% 275ml | Beer & cider | — | — | 1.79 € | Coop |
| Garage Muu hardcore grapefr jook pudel 6% 275ml | Beer & cider | — | — | 1.79 € | Selver |
| Gin Muu long drink purk hoggys jook 5% 500ml | Beer & cider | — | — | 2.29 € | Coop + Selver |
| Grimbergen blonde 6.7% 500ml | Beer & cider | 2.49 € | 2.59 € | — | Barbora |
| Gubernija ekstra lager 5.2% 568ml | Beer & cider | 1.89 € | 1.89 € | — | Barbora + Rimi |
| Guinness Tume original pudel 5% 330ml | Beer & cider | — | — | 1.92 € | Selver |
| Guinness Tume purk draught 4.2% 440ml | Beer & cider | 2.69 € | — | 2.80 € | Barbora |
| Hartwall Muu original jook ld purk 5.5% 500ml | Beer & cider | — | — | 2.49 € | Coop + Selver |
| Hartwall Muu original lemonade j ld 5.5% 330ml | Beer & cider | — | — | 1.89 € | Coop + Selver |
| Hartwall Muu original purk jook ld 5.5% 330ml | Beer & cider | — | — | 1.60 € | Selver |
| Hartwall Muu peach ice tea j ld orig 5.5% 330ml | Beer & cider | — | — | 1.89 € | Coop |
| Hartwall Muu pineapple jook ld orig 5.5% 330ml | Beer & cider | — | — | 1.89 € | Coop + Selver |
| Hartwall Muu purk jook ld originaal 5.5% 24x330ml | Beer & cider | — | — | 37.99 € | Selver |
| Hartwall Muu strong jook ld originaal 7.5% 330ml | Beer & cider | — | — | 2.35 € | Coop |
| Heineken prk 5% 500ml | Beer & cider | — | 1.29 € | 2.03 € | Rimi |
| Heineken pudel 5% 330ml | Beer & cider | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Henry westons Siider vintage pudel 8.2% 500ml | Beer & cider | — | — | 4.95 € | Coop |
| Hoggy's Siider hard purk 5.5% 500ml | Beer & cider | 1.99 € | 1.99 € | 2.05 € | Barbora + Rimi |
| Jack daniels cola purk 5% 330ml | Beer & cider | — | — | 2.79 € | Selver |
| Karksi blond munk pdl 6% 500ml | Beer & cider | 2.29 € | 2.25 € | — | Coop |
| Karksi blond munk prk 6% 500ml | Beer & cider | 2.39 € | — | — | Coop |
| Karksi Kirsiõlu pudel 4.6% 500ml | Beer & cider | 2.15 € | — | 2.25 € | Barbora |
| Karksi Siider õunasiider 5% 500ml | Beer & cider | — | — | 2.49 € | Coop |
| Karksi Tume must nunn pdl 6% 500ml | Beer & cider | 2.25 € | — | 2.25 € | Coop |
| Karl friedrich Karl pdl 5% 500ml | Beer & cider | — | 1.59 € | 1.55 € | Selver |
| Karl friedrich prk 5% 568ml | Beer & cider | — | 1.89 € | 1.91 € | Coop + Rimi |
| Karl friedrich prk 5% 6x568ml | Beer & cider | — | 8.29 € | 10.99 € | Rimi |
| Karl friedrich starkbier purk 6% 568ml | Beer & cider | — | 1.95 € | 1.99 € | Rimi |
| Karl friedrich tšehhi lager purk 5% 568ml | Beer & cider | — | — | 1.93 € | Coop |
| Kiss Muu jook daiquiri strawb 4.7% 330ml | Beer & cider | — | — | 1.65 € | Selver |
| Kiss Muu jook pornstar martini 4.7% 330ml | Beer & cider | — | — | 1.65 € | Selver |
| Koff Muu grapefruit jook purk 5.5% 330ml | Beer & cider | — | 1.19 € | 1.65 € | Rimi |
| Koff Muu jook lime viin purk 5.5% 330ml | Beer & cider | — | 1.19 € | — | Rimi |
| Koff Muu mango drink jook long purk 5.5% 330ml | Beer & cider | — | — | 1.65 € | Coop + Selver |
| Koff Muu strong raspberry jook 8% 330ml | Beer & cider | — | — | 2.11 € | Coop |
| Kopparberg Siider purk lime strawberry 4.5% 500ml | Beer & cider | — | — | 2.65 € | Coop + Selver |
| Kopparberg Siider purk wildberries 4.5% 500ml | Beer & cider | — | — | 2.65 € | Coop + Selver |
| Kronenbourg 1664 blanc purk 5% 500ml | Beer & cider | — | 1.75 € | 2.15 € | Rimi |
| Kronenbourg blanc 5% 6x500ml | Beer & cider | 12.59 € | — | 9.99 € | Selver |
| Krusovice imperial pdl 5% 500ml | Beer & cider | — | 2.49 € | — | Coop + Rimi |
| Lapin kulta purk 5.2% 500ml | Beer & cider | 1.79 € | — | 1.81 € | Coop |
| Leffe blonde pudel 6.6% 330ml | Beer & cider | — | 2.59 € | 2.59 € | Coop + Rimi + Selver |
| Leffe purk blonde 6.6% 500ml | Beer & cider | 2.85 € | 2.85 € | 2.82 € | Coop |
| Leffe Tume brune prk 6.5% 500ml | Beer & cider | 2.75 € | — | — | Barbora |
| Meistrite gildi pilsner prk 4.5% 568ml | Beer & cider | — | 1.49 € | — | Rimi |
| Mix Muu alkohoolne jook mojito 4% 330ml | Beer & cider | 2.09 € | 1.99 € | — | Rimi |
| Muu caribba rum cola jook pudel 4.5% 275ml | Beer & cider | — | — | 2.15 € | Coop |
| Muu ginger joe jook stones 4% 330ml | Beer & cider | — | — | 2.25 € | Coop + Selver |
| Õllenaut hele prk 4.9% 500ml | Beer & cider | — | 1.99 € | 1.49 € | Selver |
| Õllenaut vaskne purk 4.9% 500ml | Beer & cider | — | — | 1.82 € | Selver |
| Perry hard hoggys pear purk 5.5% 500ml | Beer & cider | — | — | 2.05 € | Selver |
| Pilsner urquell Pilsner pudel 4.4% 500ml | Beer & cider | — | — | 2.79 € | Selver |
| Pilsner urquell purk 4.4% 500ml | Beer & cider | 2.49 € | 2.59 € | 2.69 € | Barbora |
| Põhjala kosmos 5.5% 440ml | Beer & cider | 3.49 € | 3.59 € | 3.42 € | Coop |
| Põhjala laager 4.7% 440ml | Beer & cider | 2.29 € | 2.29 € | 2.29 € | Barbora + Rimi + Selver |
| Põhjala limoncello ipa purk 5.5% 440ml | Beer & cider | — | — | 3.49 € | Coop |
| Põhjala punane laager 4.9% 440ml | Beer & cider | 2.15 € | 2.29 € | 2.29 € | Barbora |
| Põhjala saturnus prk 5% 440ml | Beer & cider | 2.99 € | 3.15 € | 3.09 € | Barbora |
| Põhjala sun city pineapple purk 5% 440ml | Beer & cider | — | — | 3.99 € | Coop + Selver |
| Põhjala sun city purk ale 5% 440ml | Beer & cider | — | — | 3.99 € | Coop + Selver |
| Põhjala Tume laager prk 5% 440ml | Beer & cider | 2.29 € | — | — | Barbora |
| Põhjala uus maailm 4.7% 440ml | Beer & cider | 3.19 € | — | 3.49 € | Barbora |
| Põhjala virmalised 6.5% 330ml | Beer & cider | 2.99 € | — | 3.09 € | Barbora + Coop |
| Rekorderlig Siider strawberry lime prk 4.5% 500ml | Beer & cider | — | 2.49 € | — | Rimi |
| Rock hopper purk 5.3% 568ml | Beer & cider | — | 1.59 € | — | Rimi |
| Rock unikorn 5.1% 500ml | Beer & cider | — | 1.49 € | 1.85 € | Rimi |
| Saaremaa tuulik purk a coq le 4.7% 500ml | Beer & cider | — | 1.59 € | 1.45 € | Selver |
| Saku antvärk Saku paljas õun pudel 4.5% 330ml | Beer & cider | — | — | 1.79 € | Coop + Selver |
| Saku hele pudel 5.2% 500ml | Beer & cider | 1.95 € | 1.59 € | 1.85 € | Rimi |
| Saku kuld prk 5.2% 12x330ml | Beer & cider | 9.99 € | — | 11.19 € | Barbora |
| Saku kuld prk 5.2% 500ml | Beer & cider | 1.65 € | 1.89 € | 1.92 € | Barbora |
| Saku kuld pudel 5.2% 330ml | Beer & cider | — | — | 1.69 € | Selver |
| Saku kuld purk 5.2% 6x500ml | Beer & cider | — | — | 11.45 € | Coop |
| Saku Muu alkohoolne jook kirss pdl 4.5% 500ml | Beer & cider | — | 1.95 € | 1.85 € | Coop |
| Saku Muu mõdu pudel alkohoolne jook 4% 500ml | Beer & cider | — | — | 1.95 € | Coop + Selver |
| Saku on ice 5% 330ml | Beer & cider | 1.09 € | 1.45 € | — | Barbora |
| Saku on ice hola 4.5% 330ml | Beer & cider | 1.09 € | 1.45 € | 1.47 € | Barbora |
| Saku on ice Muu granaatõun pudel jook 4% 330ml | Beer & cider | — | — | 1.47 € | Selver |
| Saku on ice Muu õun münt jook pudel 4% 330ml | Beer & cider | — | — | 1.47 € | Selver |
| Saku on ice Muu pudel jook tsitrus 4% 330ml | Beer & cider | — | — | 1.47 € | Selver |
| Saku on ice pdl 5% 6x330ml | Beer & cider | 8.15 € | 8.59 € | 6.79 € | Selver |
| Saku on ice pudel 5% 330ml | Beer & cider | — | — | 1.47 € | Selver |
| Saku on ice purk 5% 12x330ml | Beer & cider | 12.99 € | — | 12.25 € | Selver |
| Saku originaal prk 4.7% 12x330ml | Beer & cider | 9.49 € | 10.79 € | — | Barbora |
| Saku originaal prk 4.7% 6x500ml | Beer & cider | — | 10.39 € | 10.39 € | Rimi + Selver |
| Saku originaal pudel 4.7% 500ml | Beer & cider | — | — | 1.79 € | Coop + Selver |
| Saku originaal purk 4.7% 12x330ml | Beer & cider | — | — | 9.99 € | Selver |
| Saku originaal purk 4.7% 330ml | Beer & cider | — | — | 1.29 € | Coop |
| Saku originaal purk 4.7% 500ml | Beer & cider | — | 1.79 € | 1.79 € | Coop + Rimi + Selver |
| Saku originaal smooth purk 4.6% 500ml | Beer & cider | — | — | 1.85 € | Coop |
| Saku pilsner 4.2% 500ml | Beer & cider | 1.65 € | — | 1.64 € | Selver |
| Saku Pun manchester of taste the 4.2% 500ml | Beer & cider | — | — | 1.95 € | Coop + Selver |
| Saku rock prk 5.3% 568ml | Beer & cider | — | 1.55 € | 1.95 € | Rimi |
| Saku rock prk 5.3% 6x568ml | Beer & cider | — | 10.79 € | 10.79 € | Rimi + Selver |
| Saku rock pudel 5.3% 500ml | Beer & cider | — | — | 1.75 € | Selver |
| Saku safiir 5% 500ml | Beer & cider | 1.95 € | 1.49 € | 1.89 € | Rimi |
| Saku Tume kirsi martsipani pudel 6% 500ml | Beer & cider | — | 2.15 € | 2.10 € | Coop |
| Saku Tume porter pudel 6.9% 500ml | Beer & cider | — | — | 2.05 € | Coop + Selver |
| Saku Tume pudel 6.7% 500ml | Beer & cider | — | 2.05 € | 2.05 € | Coop + Rimi + Selver |
| Saku Tume rubiin purk 5.5% 500ml | Beer & cider | — | — | 1.90 € | Coop |
| Siider dry apple hoggys purk 4.5% 355ml | Beer & cider | — | — | 1.59 € | Coop + Selver |
| Siider raspberry dream hoggys purk 4.5% 355ml | Beer & cider | — | — | 1.57 € | Selver |
| Siider rhubarb bliss hoggys purk 4.5% 355ml | Beer & cider | — | — | 1.59 € | Coop + Selver |
| Sinebrychoff Muu cranberry jook ld 5.5% 1500ml | Beer & cider | — | 4.75 € | 4.75 € | Rimi + Selver |
| Sinebrychoff Muu cranberry jook purk 5.5% 500ml | Beer & cider | — | — | 2.05 € | Selver |
| Sinebrychoff Muu grapefr jook ld pet 5.5% 500ml | Beer & cider | — | — | 1.75 € | Selver |
| Sinebrychoff Muu grapefruit jook ld 5.5% 1500ml | Beer & cider | — | 4.69 € | 4.75 € | Rimi |
| Sinebrychoff Muu grapefruit jook ld 5.5% 500ml | Beer & cider | — | — | 2.05 € | Selver |
| Sinebrychoff Muu mango mint jook ld 5.5% 500ml | Beer & cider | — | — | 2.05 € | Coop |
| Somersby Perry pear 4.5% 1000ml | Beer & cider | — | — | 3.49 € | Coop + Selver |
| Somersby Perry pear pudel 4.5% 330ml | Beer & cider | — | — | 1.65 € | Coop + Selver |
| Somersby Perry pear purk 4.5% 4x500ml | Beer & cider | — | — | 6.59 € | Selver |
| Somersby Perry pear purk 4.5% 500ml | Beer & cider | — | 1.59 € | 2.15 € | Rimi |
| Somersby Siider apple 4.5% 1000ml | Beer & cider | — | — | 3.49 € | Coop + Selver |
| Somersby Siider apple pet 4.5% 1000ml | Beer & cider | 3.79 € | 3.59 € | — | Rimi |
| Somersby Siider apple purk 4.5% 500ml | Beer & cider | — | 1.59 € | 2.15 € | Rimi |
| Somersby Siider blackberry pet 4.5% 1000ml | Beer & cider | 3.79 € | 3.59 € | — | Coop |
| Somersby Siider blackberry purk 4.5% 500ml | Beer & cider | 1.59 € | 1.59 € | 2.15 € | Barbora + Rimi |
| Somersby Siider pineapple lime pet 4.5% 1000ml | Beer & cider | — | 3.59 € | 3.49 € | Coop + Selver |
| Somersby Siider pineapple lime prk 4.5% 500ml | Beer & cider | — | 1.79 € | 2.15 € | Rimi |
| Somersby Siider watermelon prk 4.5% 500ml | Beer & cider | — | 1.79 € | — | Rimi |
| St.pierre blond prk 6.5% 500ml | Beer & cider | — | 2.59 € | — | Coop |
| Staropramen prk 5% 500ml | Beer & cider | — | 1.69 € | 1.99 € | Rimi |
| Stella artois pudel 5% 330ml | Beer & cider | 2.09 € | 2.09 € | 2.10 € | Barbora + Rimi |
| Tanker Jõhvika siider 5.4% 500ml | Beer & cider | 1.99 € | 1.99 € | 2.15 € | Barbora + Rimi |
| Tanker kerge ipa 5.2% 500ml | Beer & cider | 1.39 € | — | 1.92 € | Barbora |
| Tanker reloaded purk 5.8% 440ml | Beer & cider | 2.39 € | 2.79 € | — | Barbora |
| Tanker sauna lager purk 5% 500ml | Beer & cider | — | 1.39 € | — | Rimi |
| Tanker sauna session purk 4.7% 440ml | Beer & cider | 2.99 € | 2.79 € | 2.32 € | Selver |
| Tanker select lager 5% 500ml | Beer & cider | 1.39 € | 1.79 € | 1.45 € | Barbora |
| Tanker Siider purk 5.5% 500ml | Beer & cider | — | — | 1.75 € | Selver |
| Tuborg gold 5.5% 500ml | Beer & cider | 1.39 € | 1.99 € | — | Barbora |
| Tuborg green pdl 4.6% 330ml | Beer & cider | 1.55 € | 1.55 € | 1.49 € | Selver |
| Tuborg pdl 4.6% 6x330ml | Beer & cider | — | 8.89 € | 8.75 € | Coop |
| Tuborg prk 4.6% 500ml | Beer & cider | 1.19 € | 1.85 € | 1.89 € | Barbora |
| Tume imperial extra double stout pdl 7% 400ml | Beer & cider | — | — | 2.15 € | Coop + Selver |
| Valmiermuiza pudel 5.2% 500ml | Beer & cider | — | — | 2.99 € | Coop + Selver |
| Velkopopovicky kozel premium purk 4.8% 500ml | Beer & cider | — | — | 2.40 € | Coop |
| Velkopopovicky kozel Tume dark purk 3.8% 500ml | Beer & cider | — | 2.39 € | 2.40 € | Coop |
| Zubr gold purk 4.6% 500ml | Beer & cider | — | 1.89 € | 1.75 € | Coop + Selver |
| Arcor Kreeker kiudainega 200g | Biscuits | — | — | 1.59 € | Coop |
| Bahlsen hit küpsis kakao 220g | Biscuits | — | — | 2.69 € | Coop |
| Bahlsen Küpsisebatoon pick piimashok up kreemitäidisega 28g | Biscuits | — | — | 0.85 € | Selver |
| Bahlsen Küpsisebatoon pick shok tumeda up piimašokolaadiga 28g | Biscuits | — | — | 0.85 € | Selver |
| Bahlsen vahvlirullid piimashok ga piimašokolaadiga 100g | Biscuits | — | — | 3.19 € | Coop |
| Barni Küpsis piimatäidisega 150g | Biscuits | — | — | 2.99 € | Coop + Selver |
| Barni Küpsis piimatäidisega 30g | Biscuits | — | — | 0.70 € (0.55 € Partner) | Coop |
| Barni Küpsis shokolaaditäidisega 150g | Biscuits | — | — | 2.99 € | Coop + Selver |
| Barni Küpsis shokolaaditäidisega 30g | Biscuits | — | — | 0.70 € (0.55 € Partner) | Coop |
| Belvita Küpsis metsamarja 300g | Biscuits | — | — | 3.55 € | Selver |
| Belvita Küpsis shokolaadi 300g | Biscuits | — | — | 4.09 € | Coop + Selver |
| Croco mix soolakreeker ja kringel 500g | Biscuits | — | — | 4.29 € | Coop |
| Croco soolakringlid 300g | Biscuits | — | 2.79 € | 3.29 € | Rimi |
| Domino Küpsis crunchy choco lemon fazer 150g | Biscuits | — | 2.99 € | 2.99 € | Coop + Rimi + Selver |
| Domino Küpsis crunchy choco nougat fazer 150g | Biscuits | — | 2.99 € | 2.99 € | Coop + Rimi + Selver |
| Domino Küpsis fun avec fazer 120g | Biscuits | — | 2.89 € | 2.95 € | Rimi |
| Domino Küpsis fun dumle fazer 120g | Biscuits | — | 2.89 € | 2.95 € | Rimi |
| Domino Küpsis marianne fazer piparmünditükkidega täidisega 350g | Biscuits | — | — | 4.56 € | Selver |
| Domino Küpsis original fazer vegan 175g | Biscuits | — | 2.59 € | 2.79 € | Coop |
| Domino Küpsis original fazer vegan 350g | Biscuits | — | 4.49 € | 4.59 € | Rimi |
| Domino Küpsis täidisega fazer laimi 350g | Biscuits | — | — | 4.77 € | Coop |
| Domino Küpsis täidisega fazer maasika 175g | Biscuits | — | — | 2.79 € | Selver |
| Elephant Rõngik mee sibula ja sinepi meega 70g | Biscuits | — | — | 1.65 € | Coop + Selver |
| Elephant Rõngik soolaga 80g | Biscuits | — | 1.59 € | 1.65 € | Rimi |
| Elephant Rõngik tomati ürdi 70g | Biscuits | — | — | 1.65 € | Coop + Selver |
| Elephant Rõngik valgete mustade seesamiseemne seesamiseemnetaga 80g | Biscuits | — | — | 1.15 € | Selver |
| Fasupala Vahvlipala dumle fazer 175g | Biscuits | — | — | 4.09 € (2.99 € Partner) | Coop + Selver |
| Fasupala Vahvlipala geisha fazer 175g | Biscuits | — | — | 4.09 € (2.99 € Partner) | Coop + Selver |
| Fazer Küpsis doris trühvlitäidisega 250g | Biscuits | — | — | 3.29 € | Selver |
| Gullon Kreeker cheddari juustuga 250g | Biscuits | — | — | 3.49 € | Coop + Selver |
| Gullon Kreeker kinoa ja chia seemnetega 250g | Biscuits | — | — | 3.49 € | Coop + Selver |
| Gullon Küpsis digestive gluteenivaba 150g | Biscuits | — | — | 2.49 € | Coop + Selver |
| Gullon Küpsis digestive suhkruvaba magusainetega 400g | Biscuits | — | — | 3.29 € | Coop |
| Gullon Küpsis maria 200g | Biscuits | — | — | 1.35 € | Coop + Selver |
| Gullon Küpsised digestive 400g | Biscuits | — | 1.99 € | 2.19 € | Rimi |
| Gullon Suhkruvaba kiudaineterikas küpsis 170g | Biscuits | — | — | 1.99 € | Coop |
| Gullon Suhkruvaba vahvel shokolaadi magusaine magusainega 60g | Biscuits | — | — | 1.09 € | Selver |
| Jyväshyvä Kaeraküpsis fazer kaerajahust 350g | Biscuits | — | 3.79 € | 3.85 € (2.59 € Partner) | Coop + Rimi |
| Jyväshyvä Küpsis fazer shok tükkidega 350g | Biscuits | — | 2.99 € | 3.85 € (2.59 € Partner) | Coop + Rimi |
| Kalev Ekstra küpsis 180g | Biscuits | 1.19 € | 1.19 € | 1.09 € | Selver |
| Kalev Klassikaline küpsis 163g | Biscuits | 0.95 € | 1.04 € | 1.19 € | Barbora |
| Kalev Krõbe kaeraküpsis 300g | Biscuits | — | — | 2.99 € | Selver |
| Kalev Küpsis kreemitäidisega shok 205g | Biscuits | — | — | 2.63 € (1.95 € Partner) | Selver |
| Kalev Küpsis pähklikreemi täidisega 205g | Biscuits | — | 2.65 € | 2.63 € (1.95 € Partner) | Selver |
| Kalev Küpsis suhkruvaba 163g | Biscuits | — | — | 1.39 € | Coop |
| Kalev Sidruni küpsis 163g | Biscuits | 1.19 € | 1.19 € | 1.19 € | Barbora + Coop + Rimi + Selver |
| Kalev Šokolaadi küpsis 163g | Biscuits | 1.19 € | 1.19 € | 1.19 € | Barbora + Coop + Rimi + Selver |
| Kalev Vanilli küpsis 163g | Biscuits | 1.19 € | 1.19 € | — | Barbora + Coop + Rimi |
| Kinder Küpsised cards piimashokolaadiga 76.8g | Biscuits | 2.95 € | — | 2.95 € (2.39 € Partner) | Coop |
| Knoppers Vahvel storck piima ja pähklitäidisega 25g | Biscuits | — | — | 0.66 € (0.49 € Partner) | Selver |
| Küpsis vallatud seenekesed shokolaadi šokolaadiga 170g | Biscuits | — | — | 2.19 € | Coop |
| Küpsis vicenzi grisbi lemon cream sidrunikreemitäidisega 135g | Biscuits | — | — | 2.75 € | Coop + Selver |
| Laurieri Kreeker scrocchi pitsa 175g | Biscuits | 2.39 € | — | 2.35 € (1.99 € Partner) | Selver |
| Laurieri Kreeker scrocchi trühvliga 175g | Biscuits | 2.35 € | — | — | Barbora |
| Liivaküpsis mulino bianco galletti 350g | Biscuits | 3.29 € | — | — | Coop |
| Liivaküpsis mulino bianco girotondi 350g | Biscuits | 3.29 € | — | — | Coop |
| Lorenz Kreeker lunch clubs 180g | Biscuits | — | — | 1.99 € | Selver |
| Lorenz Soolakõrsik saltletts 150g | Biscuits | — | 1.65 € | 1.65 € (1.29 € Partner) | Coop + Rimi + Selver |
| Lorenz Soolakõrsik saltletts 75g | Biscuits | 0.85 € | 0.89 € | — | Barbora |
| Lotus biscoff Lotus karamelliseer küpsis 250g | Biscuits | — | — | 3.49 € | Coop |
| Magus kõrsik 250g | Biscuits | 1.85 € | — | 1.79 € | Coop |
| Maiasmokk Kirsiküpsised 130g | Biscuits | 1.75 € | — | 1.75 € | Barbora + Selver |
| Maiasmokk Maasikaküpsised 130g | Biscuits | 1.75 € | — | 1.39 € | Selver |
| Marmiton Kaeraküpsised jõhvikatega 150g | Biscuits | 1.65 € | 1.69 € | 1.62 € | Selver |
| Marmiton Krõbe kaeraküpsis 150g | Biscuits | — | — | 1.47 € (1.19 € Partner) | Selver |
| Marmiton Krõbe kaeraküpsis kaera ants 400g | Biscuits | — | — | 3.55 € | Selver |
| Marmiton Krõbedad kaeraküpsised 150g | Biscuits | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Marmiton Rosinaküpsis tallinn 350g | Biscuits | 2.99 € | — | 3.04 € (2.45 € Partner) | Barbora |
| Marmiton Rosinaküpsised tallinn 180g | Biscuits | 1.69 € | — | 1.69 € | Barbora + Selver |
| Marmiton Vahvel dessert kakaokreemiga 110g | Biscuits | — | — | 1.25 € | Selver |
| Marmiton Vahvel kooli vanillikreemiga 110g | Biscuits | — | — | 1.51 € (1.19 € Partner) | Selver |
| Marmiton Vahvel valge glasuuriga 150g | Biscuits | 2.75 € | — | 2.75 € | Barbora + Coop + Selver |
| Mesikäpp Küpsis täidisega dops kalev vanillim 210g | Biscuits | — | — | 2.65 € (1.99 € Partner) | Coop + Selver |
| Mesikäpp Vahvel kreemiga kalev shok 250g | Biscuits | — | — | 3.13 € (2.45 € Partner) | Selver |
| Milka choco cookies raisins rosinatega 135g | Biscuits | — | — | 2.69 € | Coop |
| Milka Küpsis cake brownie šokolaaditükkidega 150g | Biscuits | — | — | 3.55 € | Coop |
| Milka Küpsis choc 150g | Biscuits | — | 2.99 € | 3.39 € | Coop |
| Milka Küpsis choco cookies 135g | Biscuits | — | — | 2.79 € | Coop |
| Milka Küpsis choco minis piimatäidisega 150g | Biscuits | — | — | 2.19 € | Selver |
| Milka Küpsis choco pause shokolaadikreemiga 260g | Biscuits | — | — | 3.39 € | Coop |
| Milka Küpsis sensation cookie shok täidisega 156g | Biscuits | — | — | 2.79 € | Selver |
| Milka Küpsisepulgad choco stix 112g | Biscuits | — | — | 2.79 € | Coop |
| Nutella Küpsised 193g | Biscuits | 4.59 € | — | 4.59 € | Coop |
| Oreo Küpsis classic vaniljekreemiga 154g | Biscuits | — | — | 2.69 € | Coop |
| Oreo Küpsis double stuff pocket vaniljetäidisega 157g | Biscuits | — | — | 1.99 € | Coop + Selver |
| Oreo Küpsis golden 154g | Biscuits | 2.49 € (1.69 € Aitäh) | — | — | Coop |
| Oreo Küpsis vaniljekreemiga 44g | Biscuits | — | — | 0.99 € | Coop |
| Pally küpsis digestive täisterajahu 400g | Biscuits | — | — | 2.09 € (1.69 € Partner) | Coop + Selver |
| Praline Pehmed vahvlid 250g | Biscuits | — | — | 2.49 € | Coop |
| Selga Küpsis klassikaline 180g | Biscuits | — | — | 1.27 € | Selver |
| Selga Küpsis kondenspiima 180g | Biscuits | — | — | 1.27 € | Selver |
| Selga Küpsis kookose 180g | Biscuits | 1.25 € | 1.15 € | — | Rimi |
| Selga Küpsis shokolaadi 180g | Biscuits | — | — | 1.27 € | Selver |
| Selga Vahvlid šokolaadi 180g | Biscuits | — | 1.85 € | 1.85 € | Rimi + Selver |
| Tuc Kreeker mini juustu 100g | Biscuits | — | — | 1.69 € | Coop |
| Tuc Kreeker mini sibula hapukoore sibulaga 100g | Biscuits | — | — | 1.68 € (1.29 € Partner) | Coop |
| Tuc Kreeker originaal soolaga 100g | Biscuits | — | — | 1.25 € | Selver |
| Tuc Kreeker sibula ja hapukoore hapukoorega 100g | Biscuits | — | — | 1.65 € (1.29 € Partner) | Coop + Selver |
| Tuc Kreekerid juustuga 100g | Biscuits | 1.65 € (1.65 € Aitäh) | — | 1.65 € (1.29 € Partner) | Barbora + Selver |
| Tuc Kreekerid paprikaga 100g | Biscuits | 1.65 € (1.65 € Aitäh) | — | 1.65 € (1.29 € Partner) | Barbora + Coop + Selver |
| Tuc Kreekerid peekoniga 100g | Biscuits | 1.65 € (1.65 € Aitäh) | — | 1.65 € (1.29 € Partner) | Barbora + Coop + Selver |
| Väike väänik Kaeraküpsis 500g | Biscuits | 1.55 € | — | 2.35 € | Barbora |
| Väike väänik Präänik maris gilden shokolaadi šokolaadiga 250g | Biscuits | — | — | 1.19 € | Selver |
| Väike väänik Präänik piparmündi piparmündiga 250g | Biscuits | 1.15 € | — | 1.19 € | Barbora |
| Väike väänik Präänik vanilli 250g | Biscuits | 1.15 € | — | 1.19 € | Barbora |
| Väike väänik Rahvapräänik 500g | Biscuits | 1.55 € | 1.79 € | 2.25 € | Barbora |
| Väike väänik Tatraküpsis 250g | Biscuits | 1.39 € | — | 1.39 € (1.19 € Partner) | Barbora + Selver |
| Väike väänik Väike juustupulgad 140g | Biscuits | — | — | 2.79 € (2.29 € Partner) | Coop |
| Vikstal Vahvel ahjupiima 240g | Biscuits | — | — | 1.59 € | Selver |
| Võileivaküpsised carrs 125g | Biscuits | — | — | 1.78 € | Selver |
| Waffa sofi Kreeker kreete kuldkalake 150g | Biscuits | 0.99 € | — | — | Barbora + Coop |
| Eesti pagar Haputaina pehmik 240g | Bread | 1.17 € | — | 1.17 € | Barbora + Selver |
| Eesti pagar Haputaina röst 430g | Bread | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Eesti pagar Hele ciabatta 300g | Bread | 1.09 € | 1.19 € | — | Barbora |
| Eesti pagar Jassi seemneleib viil 1 310g | Bread | — | — | 1.17 € | Coop |
| Eesti pagar Juusturöst tosta 430g | Bread | — | 1.89 € | 1.59 € | Selver |
| Eesti pagar Kaera pehmik 220g | Bread | 1.17 € | — | 1.17 € | Coop |
| Eesti pagar Kaerasepik 300g | Bread | 1.25 € | 1.25 € | — | Coop |
| Eesti pagar Kanepiseemne leib rukkiteradega 240g | Bread | — | — | 1.11 € | Coop |
| Eesti pagar Kanepiseemne leib rukkiteradega 500g | Bread | 1.49 € | — | 1.58 € (1.29 € Partner) | Barbora |
| Eesti pagar Kartuli röstsibula pehmik 240g | Bread | 1.29 € | — | 1.29 € | Coop |
| Eesti pagar Kodukandi koorikleib 300g | Bread | 0.79 € | — | 0.85 € | Barbora |
| Eesti pagar Kodukandi rukkileib viil 1 390g | Bread | — | — | 1.11 € | Coop |
| Eesti pagar Leib peremehe 600g | Bread | 1.29 € | — | 1.29 € | Barbora + Selver |
| Eesti Pagar Meeleib 500g | Bread | 1.79 € | 1.39 € | — | Rimi |
| Eesti pagar Mitmevilja pehmik 240g | Bread | 0.89 € | — | 1.17 € | Barbora |
| Eesti pagar Mitmevilja röst tosta 500g | Bread | 1.19 € | 1.19 € | — | Barbora + Rimi |
| Eesti pagar Must jassi seemneleib 310g | Bread | — | 1.25 € | 1.27 € | Coop |
| Eesti pagar Must rukkileib 390g | Bread | 1.15 € | 1.15 € | — | Barbora + Rimi |
| Eesti pagar Must vormileib 600g | Bread | 0.89 € | 1.25 € | — | Barbora |
| Eesti pagar Must vormileib viil 1 280g | Bread | — | — | 1.07 € | Coop |
| Eesti pagar Must vormileib viil 600g | Bread | — | — | 1.31 € | Coop |
| Eesti pagar Narva peenleib 310g | Bread | 0.76 € | 0.75 € | — | Rimi |
| Eesti pagar Pagari kaeraröst 430g | Bread | 1.49 € | 1.59 € | — | Barbora |
| Eesti Pagar Pagariröst täistera 430g | Bread | — | 1.59 € | 1.59 € | Rimi + Selver |
| Eesti pagar Pealinna peenleib 490g | Bread | 1.27 € | 0.99 € | — | Rimi |
| Eesti pagar Pealinna peenleib viil 1 490g | Bread | — | — | 1.27 € (0.99 € Partner) | Coop |
| Eesti pagar Pealinna teraleib 390g | Bread | 0.89 € | — | 0.95 € | Barbora |
| Eesti pagar Peedi porgandi pastinaagi pehmik 240g | Bread | 1.29 € | — | 1.35 € | Barbora |
| Eesti pagar Perenaise sai viil 320g | Bread | — | — | 0.97 € (0.79 € Partner) | Coop |
| Eesti pagar Põrandaleib peremehe 450g | Bread | 1.65 € | — | 1.67 € | Coop |
| Eesti pagar Rehe koorikleib 200g | Bread | 0.80 € | — | 0.80 € | Coop |
| Eesti pagar Rehe rukkileib 390g | Bread | 0.89 € | 1.09 € | 1.14 € | Barbora |
| Eesti Pagar Rehe rukkileib 600g | Bread | 0.65 € | 0.82 € | — | Barbora |
| Eesti pagar Rehe rukkileib vormileib 600g | Bread | — | — | 1.29 € | Coop |
| Eesti pagar Rosinasai 400g | Bread | 1.55 € | — | — | Coop |
| Eesti pagar Röstsai tosta 500g | Bread | 0.99 € | 1.19 € | — | Barbora |
| Eesti pagar Rukkiröst tosta 390g | Bread | 1.09 € | 1.19 € | 1.41 € | Barbora |
| Eesti pagar Rukkisepik 300g | Bread | 1.19 € | 1.09 € | — | Coop |
| Eesti pagar Rukkitasku 340g | Bread | 1.05 € (0.79 € Aitäh) | — | 1.09 € | Coop |
| Eesti pagar Seemneleib jassi 310g | Bread | 1.17 € | 1.17 € | — | Barbora + Rimi |
| Eesti pagar Sepik õnne 300g | Bread | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Eesti pagar Suur perenaise sai 500g | Bread | 1.21 € | 0.89 € | — | Rimi |
| Eesti pagar Suur perenaise sai viil 500g | Bread | — | — | 0.99 € | Selver |
| Eesti Pagar täistera röstsepik 500g | Bread | 1.55 € | 1.19 € | — | Rimi |
| Eesti pagar Täisterasepik 500g | Bread | 1.19 € | 1.09 € | 1.55 € | Rimi |
| Eesti pagar Teratasku 280g | Bread | 0.99 € | — | 0.99 € | Coop |
| Eesti pagar Tosta mitmevilja röstsai viil 500g | Bread | — | — | 1.55 € (1.25 € Partner) | Coop |
| Eesti pagar Tosta röstsai viil 500g | Bread | — | — | 1.31 € (0.99 € Partner) | Coop |
| Eesti pagar Tume ciabatta 300g | Bread | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Fazer Juuretise röst 450g | Bread | 1.49 € | 1.99 € | 1.89 € | Barbora |
| Fazer Juuretisesai 500g | Bread | 1.79 € | 1.95 € | — | Barbora + Coop |
| Fazer Kaerasepik d vitamiiniga 350g | Bread | — | 1.39 € | 1.35 € | Selver |
| Fazer Kamaröst 400g | Bread | 1.99 € | 1.99 € | — | Coop |
| Fazer Keefiriröst kaltsiumiga 450g | Bread | 1.95 € | 1.96 € | 1.95 € | Barbora + Coop + Selver |
| Fazer Keefirisai kaltsiumiga 350g | Bread | 1.19 € | 1.25 € | 1.49 € | Barbora |
| Fazer Kodu pereleib 600g | Bread | 1.39 € | — | 0.65 € | Selver |
| Fazer Kodusai mini röst 240g | Bread | 1.29 € | 1.39 € | 1.29 € (1.09 € Partner) | Barbora + Coop + Selver |
| Fazer Kodusai röst 500g | Bread | 1.51 € | 1.60 € | 1.59 € | Barbora |
| Fazer Kodusai suur 500g | Bread | 0.99 € | — | 1.49 € | Barbora |
| Fazer Kodusai xxl 700g | Bread | 1.29 € | 1.29 € | 1.39 € | Barbora + Rimi |
| Fazer Lapi leib kaeraga street food 180g | Bread | — | — | 2.39 € | Coop |
| Fazer Must leib 300g | Bread | 1.09 € (0.75 € Aitäh) | — | 1.19 € | Barbora |
| Fazer Must leib 600g | Bread | 1.59 € | 1.60 € | — | Barbora |
| Fazer Must põrandaleib 390g | Bread | 1.45 € | 1.50 € | 1.49 € | Barbora + Coop |
| Fazer Must seemneleib 280g | Bread | 1.29 € | 1.39 € | 1.19 € | Selver |
| Fazer Must tume leib juuretisega 500g | Bread | 1.09 € | 1.39 € | — | Barbora |
| Fazer Must vormileib viil 600g | Bread | — | — | 1.59 € | Coop + Selver |
| Fazer Peenleib juuretise 500g | Bread | 1.25 € | 1.69 € | — | Barbora |
| Fazer Prantsuse pikk sai 220g | Bread | 1.45 € | 1.59 € | — | Barbora |
| Fazer Röst seemnetega 500g | Bread | 1.65 € | 1.69 € | — | Barbora |
| Fazer Seemneleib 400g | Bread | — | 2.09 € | 2.19 € (1.89 € Partner) | Rimi |
| Fazer Seemneröst 450g | Bread | 1.79 € | 2.39 € | 1.99 € | Barbora |
| Fazer Sepik seemnetega 250g | Bread | 0.79 € | 0.85 € | — | Barbora |
| Fazer Südamesepik täistera 300g | Bread | 1.21 € | — | 1.29 € | Barbora |
| Fazer Vilja röstsepik täisterahelvest 480g | Bread | 1.95 € | 1.55 € | — | Rimi |
| Fazer Võileiva tasku street food 400g | Bread | 2.59 € | — | 2.65 € (2.25 € Partner) | Barbora |
| Leibur Brioche röstsai 260g | Bread | — | — | 1.72 € | Selver |
| Leibur Fitlap täisterasepik 360g | Bread | 1.59 € | 1.59 € | 1.62 € | Barbora + Rimi |
| Leibur Isa peenleib 355g | Bread | 0.99 € | 0.99 € | 0.99 € | Barbora + Rimi + Selver |
| Leibur Kaerasepik 360g | Bread | 1.39 € | — | — | Coop |
| Leibur Kaerasüda 380g | Bread | — | — | 1.89 € | Selver |
| Leibur Kirde sai 300g | Bread | 1.09 € | 0.99 € | 0.89 € | Selver |
| Leibur Kodune sepik 250g | Bread | 0.65 € | 0.69 € | 0.65 € | Barbora + Selver |
| Leibur Kuldne klassikaline röstsai 250g | Bread | 1.27 € | — | 1.27 € | Barbora + Selver |
| Leibur Kuldne klassikaline röstsai 500g | Bread | 1.09 € | — | 0.95 € | Selver |
| Leibur Mitmevilja röst 250g | Bread | — | 1.69 € | 1.62 € | Selver |
| Leibur Must pätsileib ruks 390g | Bread | 1.15 € | — | 1.15 € | Barbora + Coop + Selver |
| Leibur Palaleib flaffi 300g | Bread | — | — | 2.02 € | Coop |
| Leibur Peenleib isa seemnetega 390g | Bread | 1.05 € | 1.05 € | 1.05 € | Barbora + Rimi + Selver |
| Leibur röst mitmevilja 470g | Bread | 1.29 € | 1.89 € | 1.99 € (1.29 € Partner) | Barbora |
| Leibur Röst rukkijahu 550g | Bread | 1.95 € | — | 1.98 € (1.49 € Partner) | Coop |
| Leibur Röstsai kuldne graham 500g | Bread | — | 1.55 € | 0.69 € | Selver |
| Leibur Rukkileib ruks 390g | Bread | 1.15 € (0.79 € Aitäh) | — | 0.89 € | Selver |
| Leibur Rukkipala 330g | Bread | — | — | 0.95 € | Coop |
| Leibur Rukkipala hõrk ja õhuke 195g | Bread | — | — | 1.69 € | Coop + Selver |
| Leibur Rukkipala idandatud teradega 240g | Bread | 1.59 € | — | 1.95 € (1.39 € Partner) | Barbora |
| Leibur Rukkipala päevalilleseemnetega 6 360g | Bread | — | — | 1.82 € | Coop |
| Leibur Ruks seemneleib seemneid 10% 390g | Bread | 1.29 € | — | 1.31 € | Barbora |
| Leibur Ruks seemnepala 260g | Bread | 1.47 € | — | 1.47 € | Barbora + Selver |
| Leibur Saib 370g | Bread | — | 1.69 € | 1.68 € | Selver |
| Leibur Sibulaleib 390g | Bread | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Leibur Suur kirde sai 450g | Bread | 1.41 € | — | 1.41 € (1.19 € Partner) | Barbora + Selver |
| Leibur Täistera kaeraröst röst 550g | Bread | 2.19 € | — | 2.19 € | Barbora + Selver |
| Leibur Täistera röstsai kuldne 500g | Bread | — | 1.79 € | 1.79 € | Coop + Rimi + Selver |
| Leibur Täistera rukkileib fitlap d vitamiiniga 390g | Bread | — | — | 1.37 € | Selver |
| Leibur Täistera vormileib ruks 300g | Bread | — | — | 0.99 € | Coop + Selver |
| Leibur Täisterarukkileib ruks 800g | Bread | — | — | 1.69 € | Coop + Selver |
| Leibur Tallinna peenleib 490g | Bread | 0.99 € | 1.52 € | — | Barbora |
| Leibur Tallinna peenleib pool viil 490g | Bread | — | — | 1.51 € | Selver |
| Leibur Vilja röstsai kuldne 525g | Bread | 1.55 € | 1.55 € | 1.55 € | Barbora + Rimi + Selver |
| Leibur Võiks 6 360g | Bread | — | — | 1.39 € | Selver |
| Lõuna pagarid Rukkileib idandatud teradega 300g | Bread | — | 1.59 € | 1.49 € | Selver |
| Lõuna pagarid Rukkileib seemnetega 300g | Bread | — | 1.69 € | 1.59 € | Selver |
| Schär Leib surdegsbröt dr gluteenivaba juuretisega 240g | Bread | — | — | 4.99 € | Coop + Selver |
| Schär Mitmeviljasai cereale dr glut vaba 300g | Bread | — | — | 4.19 € | Selver |
| Gallina blanca Kanapuljong 15x10g | Broths & stock | 1.65 € | 1.65 € | 1.65 € | Barbora + Coop + Rimi + Selver |
| Gallina blanca Kanapuljong 8x10g | Broths & stock | 0.89 € | 0.95 € | — | Barbora |
| Gallina blanca Köögiviljapuljong 8x10g | Broths & stock | 0.89 € | — | — | Barbora |
| Gallina blanca Seenepuljong puraviku 8x10g | Broths & stock | — | — | 0.90 € | Selver |
| Maggi Aedviljapuljong 120g | Broths & stock | 1.45 € | — | 1.49 € (0.89 € Partner) | Barbora |
| Maggi Kanapuljong 12x10g | Broths & stock | 1.39 € (0.95 € Aitäh) | — | 0.99 € | Coop + Selver |
| Maggi Kanapuljong mahe 80g | Broths & stock | 2.99 € | — | 3.19 € (1.99 € Partner) | Barbora |
| Maggi Kanapuljong peterselli tilli peterselliga 12x10g | Broths & stock | — | — | 0.99 € | Selver |
| Maggi Rikkalik veiselihapuljong kostilja 12x10g | Broths & stock | — | — | 1.59 € (0.99 € Partner) | Selver |
| 7days Chipita sarvesai kakao ja double van vaniljetäidisega 60g | Cakes & pastries | — | — | 0.79 € | Selver |
| 7days Days mini kakao croissant van 185g | Cakes & pastries | — | — | 2.49 € | Coop |
| Chipita days double sarvesai vanilje ja kirsi murelitäidisega 7 60g | Cakes & pastries | — | — | 0.99 € | Coop |
| Days midi croissant kakaokreemiga 7 60g | Cakes & pastries | — | — | 0.99 € | Coop |
| Days mini kakao croissant 7 185g | Cakes & pastries | — | — | 2.49 € | Coop |
| Eesti pagar Apelsini shokolaadikeeks 300g | Cakes & pastries | — | — | 2.43 € | Coop |
| Eesti pagar Aprikoosikook 310g | Cakes & pastries | 3.55 € | — | 3.55 € (2.89 € Partner) | Barbora + Selver |
| Eesti pagar Belgia vahvel 100g | Cakes & pastries | — | 1.19 € | 1.15 € | Selver |
| Eesti pagar Biskviit 400g | Cakes & pastries | — | 3.79 € | 3.59 € | Coop |
| Eesti pagar Jõhvikarull 300g | Cakes & pastries | 3.49 € | — | — | Barbora |
| Eesti pagar Keeks 250g | Cakes & pastries | — | 1.69 € | 1.69 € | Coop |
| Eesti pagar Kirju kohupiimatort 830g | Cakes & pastries | 13.69 € | 13.69 € | — | Barbora + Rimi |
| Eesti pagar Kohupiimarull 350g | Cakes & pastries | — | 3.19 € | — | Coop |
| Eesti pagar Mango hapukoorekook 300g | Cakes & pastries | 3.99 € | 4.09 € | — | Barbora |
| Eesti pagar Meekook 1000g | Cakes & pastries | 10.19 € (8.49 € Aitäh) | 9.19 € | — | Rimi |
| Eesti pagar Mini fondant 225g | Cakes & pastries | — | 3.69 € | 4.29 € | Rimi |
| Eesti pagar Napoleoni kook 1200g | Cakes & pastries | 12.45 € | 10.89 € | — | Rimi |
| Eesti pagar Õunakook 230g | Cakes & pastries | 3.49 € | 3.29 € | — | Rimi |
| Eesti pagar Pealinna kook 1100g | Cakes & pastries | 11.29 € (8.99 € Aitäh) | 11.29 € | — | Coop |
| Eesti pagar Prantsuse kohupiimakook 320g | Cakes & pastries | — | 3.35 € | — | Rimi |
| Eesti pagar Šokolaadi napoleoni kook 400g | Cakes & pastries | 4.39 € | 4.39 € | 4.39 € | Barbora + Rimi + Selver |
| Eesti pagar Vaarika kohupiima tort 400g | Cakes & pastries | 7.29 € (5.99 € Aitäh) | 7.79 € | — | Barbora |
| Europagar Kaneelisüda 200g | Cakes & pastries | — | 1.75 € | 1.95 € | Rimi |
| Fazer Minisaiakesed kaneeliga 240g | Cakes & pastries | — | 2.69 € | 2.59 € | Selver |
| Kuchenmeister Marmorkeeks 400g | Cakes & pastries | — | 3.29 € | 4.09 € | Rimi |
| Kuchenmeister Rondana sidrunikeeks 250g | Cakes & pastries | — | 2.25 € | 2.79 € | Rimi |
| Pagarini Juustukook mango passioni 520g | Cakes & pastries | — | 12.39 € | 11.79 € (9.59 € Partner) | Selver |
| Reval kondiiter Minitosca karbis 240g | Cakes & pastries | — | — | 4.59 € | Coop |
| Väike väänik Marmelaadikeeksid 300g | Cakes & pastries | — | — | 3.69 € | Coop + Selver |
| Väike väänik Rosinakeeksid 300g | Cakes & pastries | — | — | 3.69 € | Coop + Selver |
| After eight K karp maitsega nestle piparmündi 200g | Candy | — | — | 5.79 € | Coop + Selver |
| Bucuria karamell frutic assortii 190g | Candy | — | — | 1.27 € | Selver |
| Casali K banana glasuuriga karp shok souffle 150g | Candy | — | — | 1.99 € | Selver |
| Chupa chups Mullinäts big babol 27.6g | Candy | 0.75 € | 0.75 € | — | Barbora + Rimi |
| Chupa chups Mullinäts tutti babol big frutt 27.6g | Candy | — | — | 0.76 € (0.49 € Partner) | Selver |
| Chupa chups Pulgakomm fruit 12g | Candy | — | — | 0.40 € | Coop + Selver |
| Chupa chups Pulgakomm melody pops maasika 15g | Candy | — | — | 0.79 € (0.49 € Partner) | Coop + Selver |
| Chupa chups Pulgakomm the best of 12g | Candy | 0.39 € | 0.40 € | — | Barbora |
| Chupa chups Pulgakomm xxl 29g | Candy | 0.79 € | — | — | Barbora |
| Drako Närimiskommide segupakk mix 420g | Candy | — | — | 5.40 € | Selver |
| Drazee tictac apelsini 18g | Candy | — | — | 0.99 € (0.79 € Partner) | Coop + Selver |
| Drazee tictac fresh orange apelsini 54g | Candy | — | — | 2.59 € | Coop |
| Drazee tictac maasika mix 18g | Candy | — | — | 0.99 € (0.79 € Partner) | Coop + Selver |
| Dumle Pulgakomm 10g | Candy | 0.30 € | — | 0.30 € | Barbora + Selver |
| Fazer Kommikott dumle original 120g | Candy | — | — | 1.99 € | Selver |
| Fazer Kommikott dumle snacks 100g | Candy | — | — | 2.89 € | Coop |
| Fazer marianne Fazer kommikott 120g | Candy | — | — | 2.99 € | Coop + Selver |
| Finlandia jellies marmelaadikuulid 260g | Candy | — | — | 4.91 € | Selver |
| Geisha K fazer karamelli karp meresoola 150g | Candy | — | — | 4.99 € | Selver |
| Geisha K fazer karp 150g | Candy | — | — | 4.99 € | Selver |
| Geisha Kommikarp 250g | Candy | 7.99 € (5.99 € Aitäh) | 5.99 € | — | Rimi |
| Geisha Piimašokolaadikompvekid 185g | Candy | 9.25 € | 7.39 € | — | Rimi |
| Halls Pastillid colors 33.5g | Candy | 1.25 € (0.89 € Aitäh) | 1.25 € | — | Barbora + Rimi |
| Halls Pastillid mee sidruni 33.5g | Candy | 1.25 € (0.89 € Aitäh) | 0.89 € | — | Rimi |
| Haribo jelly beans zeleekomm 160g | Candy | — | — | 2.39 € | Coop + Selver |
| Haribo konnad kummikomm 175g | Candy | — | — | 2.39 € (1.89 € Partner) | Coop + Selver |
| Haribo Kummikomm fantaasia 175g | Candy | — | — | 2.39 € | Coop |
| Haribo Kummikomm halloween minipakid 250g | Candy | — | — | 3.79 € (2.89 € Partner) | Selver |
| Haribo Kummikomm kuldkarud 100g | Candy | — | — | 1.35 € | Selver |
| Haribo Kummikomm kuldkarud 175g | Candy | — | — | 2.39 € (1.89 € Partner) | Coop |
| Haribo Kummikomm miami fizz 85g | Candy | — | — | 1.39 € | Coop |
| Haribo Kummikomm röövikud hapud 160g | Candy | — | — | 2.35 € | Coop + Selver |
| Haribo Kummikomm rulett 25g | Candy | — | — | 0.41 € | Selver |
| Haribo Kummikomm sauerbrenner hapud 160g | Candy | — | — | 2.39 € | Coop |
| Haribo Kummikomm starmix segu 175g | Candy | — | — | 2.39 € (1.89 € Partner) | Coop + Selver |
| Haribo Kummikomm troppi frutti 175g | Candy | — | — | 2.39 € | Coop |
| Haribo Kummikommid fruity bussi 175g | Candy | 2.39 € | — | 2.39 € (1.89 € Partner) | Coop |
| Haribo Kummikommid goldbears 175g | Candy | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Haribo Kummikommid happy cola 175g | Candy | 2.25 € | 2.25 € | 2.39 € | Barbora + Rimi |
| Haribo Kummikommid phantasia 175g | Candy | 2.39 € | 2.15 € | — | Rimi |
| Haribo Kummikommid pico balla 160g | Candy | 2.25 € | 2.25 € | 1.59 € | Selver |
| Haribo Kummikommid pico balla 85g | Candy | 1.35 € | — | 1.35 € | Barbora + Selver |
| Haribo Kummikommid ussid 100g | Candy | 1.39 € | — | 1.39 € | Barbora + Coop + Selver |
| Haribo Vahukomm maasika 100g | Candy | — | — | 1.35 € | Selver |
| Hubba bubba Närimiskumm fancy fruit 56g | Candy | — | — | 2.49 € | Coop + Selver |
| Hubba bubba Närimiskumm strawberry 56g | Candy | — | — | 2.49 € | Coop + Selver |
| Jelly bean Närimiskomm the factory tuub 36 90g | Candy | — | — | 2.69 € | Coop + Selver |
| Jenkki Närimiskumm peppermint kott 100g | Candy | — | — | 3.13 € | Selver |
| Jenkki Närimiskumm spearmint kott 100g | Candy | — | — | 3.13 € | Selver |
| K nostalgia karp kompvekid koorepumati 180g | Candy | — | — | 2.99 € (2.29 € Partner) | Selver |
| Kalev Batoonike kaseke 150g | Candy | 2.39 € | — | 2.39 € | Barbora + Selver |
| Kalev Batoonike kirju koer 200g | Candy | 3.59 € | 3.59 € | 2.79 € | Selver |
| Kalev drazee merekivid rosin suhkrus 160g | Candy | — | 1.99 € | 1.98 € | Selver |
| Kalev Drazee metspähkel piimashok 140g | Candy | — | 3.39 € | 4.47 € | Rimi |
| Kalev Drazee metspähkel tumedas shok 140g | Candy | — | — | 4.47 € | Coop |
| Kalev Drazee mündi mandel piimashok 140g | Candy | — | — | 4.47 € | Coop |
| Kalev Drazee tiramisu mandel kakaos 140g | Candy | — | 3.39 € | 4.47 € | Rimi |
| Kalev Iiris kiss 150g | Candy | — | — | 1.88 € | Selver |
| Kalev K aitäh karp 226g | Candy | — | 7.99 € | 7.97 € | Coop |
| Kalev K eesti india karp pralineekompv pähkli pähkliga 500g | Candy | — | — | 11.37 € | Coop |
| Kalev K kannel karp shokolaadikompvek 300g | Candy | — | 22.39 € | 23.28 € | Rimi |
| Kalev K klassikalised martsipanikommid karp 150g | Candy | — | — | 4.97 € | Coop |
| Kalev K linnupiim karp vahust vanillitäidis vanillitäidisega 136g | Candy | — | — | 5.68 € | Selver |
| Kalev K linnupiim valik täidisega karp vahust 238g | Candy | — | — | 8.27 € | Coop |
| Kalev K pidulik valik karp 435g | Candy | — | — | 11.97 € | Coop |
| Kalev K vana tallinn karp kooreliköörikompvek täidisega 122g | Candy | — | — | 4.95 € | Coop + Selver |
| Kalev K vana tallinn karp liköörikreemiga 122g | Candy | — | — | 4.95 € | Coop + Selver |
| Kalev K vana tallinna limoncello karp likööriga 300g | Candy | — | — | 8.19 € | Coop + Selver |
| Kalev Kama jogurtibatoonike 150g | Candy | 2.39 € | 2.45 € | 2.39 € | Barbora + Coop + Selver |
| Kalev Karamell apelsini 120g | Candy | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Kalev Karamell apelsini täidisega 120g | Candy | — | — | 1.07 € | Selver |
| Kalev Karamell barbarissi 120g | Candy | 1.09 € | 1.09 € | 1.07 € | Selver |
| Kalev Karamell eukalüpti mentooli täidisega 120g | Candy | — | — | 1.07 € | Selver |
| Kalev Karamell eukalüpti mentoolim 120g | Candy | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Kalev Karamell maasika 120g | Candy | 0.79 € | — | — | Barbora |
| Kalev Karamell piparmündi 120g | Candy | 1.09 € | — | 1.07 € | Selver |
| Kalev Klassikalised trühvlid 160g | Candy | 9.95 € | 9.99 € | 9.97 € | Coop |
| Kalev Kommisegu lemmikut 7 500g | Candy | 7.95 € (5.79 € Aitäh) | — | 7.97 € (5.99 € Partner) | Coop |
| Kalev Kommisegu sünnipäeva 500g | Candy | — | — | 6.49 € | Coop |
| Kalev Kungla valik pralineekomme 390g | Candy | 19.69 € | — | 19.69 € | Barbora + Selver |
| Kalev maiuspala drazee pallid shok 140g | Candy | — | — | 4.47 € | Coop |
| Kalev Marmelaadikompv kirsi 175g | Candy | 2.85 € | — | 2.87 € | Barbora + Coop |
| Kalev Marmelaadikompv lily jõhvika 175g | Candy | — | — | 2.87 € | Selver |
| Kalev Marmelaadikompv maasika rab 175g | Candy | — | — | 1.97 € | Selver |
| Kalev Marmelaadikompv mari marja 175g | Candy | — | — | 2.87 € | Selver |
| Kalev Marmelaadikompv mustsõstra 175g | Candy | — | — | 2.87 € | Coop |
| Kalev Marmelaadikompv tiina rummi 175g | Candy | — | — | 2.87 € (1.67 € Partner) | Coop |
| Kalev Martsipanikompv 175g | Candy | — | 4.29 € | 3.97 € | Selver |
| Kalev Närimiskompv drako maasika 110g | Candy | — | — | 1.57 € | Selver |
| Kalev Närimiskompv drako õuna 110g | Candy | — | — | 1.25 € | Selver |
| Kalev Pehme iiris kiss 150g | Candy | 1.89 € | — | 1.87 € | Selver |
| Kalev Piimabatoonike pilveke 150g | Candy | 2.45 € | — | 2.47 € | Coop |
| Kalev Pralineekommid maiuspala 200g | Candy | 7.99 € (5.99 € Aitäh) | 7.99 € | 7.97 € | Selver |
| Kalev Pralineekommid maiuspala 350g | Candy | 7.89 € | 7.89 € | 7.97 € | Barbora + Coop + Rimi |
| Kalev Pralineekompv 175g | Candy | — | — | 2.97 € (2.39 € Partner) | Coop |
| Kalev Pralineekompv karakum 175g | Candy | — | — | 3.97 € | Selver |
| Kalev Pralineekompv komeet 175g | Candy | — | — | 2.87 € | Coop |
| Kalev Pralineekompv oravake 175g | Candy | — | — | 3.97 € | Selver |
| Kalev Pralineekompv pistaatsiapähkliga 175g | Candy | — | — | 3.27 € | Coop |
| Kalev Pralineekompv teekonna 175g | Candy | — | — | 2.87 € | Coop |
| Kalev Pralineekompvek india pähkliga 175g | Candy | 3.25 € | — | — | Barbora + Coop |
| Kalev Pralineekompvek maiuspala 175g | Candy | 2.69 € | — | 2.59 € | Selver |
| Kalev Pumatikompv tõmmu rummi 175g | Candy | — | — | 2.87 € | Coop |
| Kalev Rosinad piimašokolaadis nurr 150g | Candy | 3.99 € | 3.99 € | — | Barbora + Rimi |
| Kalev Vahvlikompv ananassi ananass 150g | Candy | — | — | 3.77 € | Coop |
| Kalev Vahvlikompv tallinn rummi 150g | Candy | — | — | 3.87 € | Coop |
| Kalev Vahvlikompvek mesikäpp pralineekreemiga 150g | Candy | 3.79 € | — | 3.77 € (2.89 € Partner) | Coop |
| Karl fazer K dark karp 70% 150g | Candy | — | — | 4.99 € | Selver |
| Karl fazer K karp piimashokolaadikompvekid 250g | Candy | — | 7.99 € | 8.29 € | Rimi |
| Karl fazer K karp vaarikajogurtitäidis vaarikajogurtitäidisega 250g | Candy | — | — | 8.29 € | Coop + Selver |
| Karl fazer Kommikarp selection 150g | Candy | 4.99 € | — | 4.99 € | Barbora + Selver |
| Kinder Komm bueno mini pähklitäidisega 108g | Candy | — | — | 3.79 € | Coop + Selver |
| Koorekompv originaal werthers 135g | Candy | — | — | 2.15 € (1.79 € Partner) | Selver |
| Laima Sefiir maigums shok vanilje 175g | Candy | — | — | 2.29 € | Coop + Selver |
| Laima Sefiir mustika 200g | Candy | — | 2.09 € | 2.19 € | Rimi |
| Laima Sefiir vanilje 200g | Candy | 2.09 € (1.49 € Aitäh) | — | 2.19 € | Barbora |
| Lockets Kurgupastill sidruni mee 41g | Candy | — | — | 1.04 € | Selver |
| Lockets Pastillid extra strong 41g | Candy | 1.05 € | 1.05 € | — | Barbora + Rimi |
| Loodusvägi vaarikad tumedas shok mahe 50g | Candy | — | — | 3.19 € (2.59 € Partner) | Selver |
| M crispy glasuuris piimashok s värvilises 77g | Candy | — | — | 2.39 € | Coop + Selver |
| M glasuuris piimashok s värvilises 200g | Candy | — | — | 3.99 € | Selver |
| M glasuuris piimashok s värvilises 70g | Candy | — | — | 2.39 € | Coop + Selver |
| Malaco Lagrits laku sekoitus 250g | Candy | — | — | 2.99 € (2.55 € Partner) | Coop + Selver |
| Marianne Komm fazer piparmündi 220g | Candy | — | — | 4.49 € | Coop + Selver |
| Maris gilden Iiris kass arturi koore 180g | Candy | — | — | 1.65 € (1.29 € Partner) | Selver |
| Maris gilden Iirisepallid kass artur 150g | Candy | — | — | 2.49 € | Coop + Selver |
| Marmiton Halvaa 200g | Candy | — | — | 1.99 € | Coop |
| Marmiton Halvaa india pähklitega 100g | Candy | 0.99 € | — | 1.19 € (0.95 € Partner) | Barbora |
| Marmiton Halvaa kakaoga 150g | Candy | 2.09 € | — | 2.09 € | Barbora + Coop + Selver |
| Marmiton Halvaa pistaatsia pähklitega 150g | Candy | 1.95 € | — | 1.98 € (1.59 € Partner) | Barbora |
| Marmiton Halvaa rummi ja rosinatega 200g | Candy | — | — | 1.99 € | Coop + Selver |
| Marmiton Halvaa vanilli 100g | Candy | — | 1.09 € | 1.07 € | Selver |
| Marmiton Marmelaad foor 150g | Candy | 2.09 € | — | — | Barbora + Coop |
| Marmiton Marmelaad hapu 150g | Candy | 1.99 € | — | 2.15 € | Barbora |
| Marmiton Marmelaad kuubikud 150g | Candy | 2.09 € | — | 2.09 € (1.69 € Partner) | Barbora + Coop + Selver |
| Marmiton Marmelaad lõigud 150g | Candy | 2.09 € | — | 2.12 € | Barbora |
| Marmiton Marmelaad mango 150g | Candy | 2.49 € | 2.49 € | — | Barbora + Rimi |
| Marmiton Marmelaad rabarberi 150g | Candy | 2.49 € | 2.49 € | — | Barbora + Rimi |
| Mentos Nätsukomm discover 37.5g | Candy | — | — | 0.99 € | Coop + Selver |
| Mentos Nätsukomm mint piparmündi 38g | Candy | — | — | 0.99 € | Coop + Selver |
| Merci K finest karp selection 400g | Candy | — | — | 13.45 € | Selver |
| Mesikäpp Batoonike kalev 150g | Candy | — | — | 2.63 € (1.99 € Partner) | Selver |
| Mesikäpp Kakaobatoonike glasuuriga kalev shok 200g | Candy | — | — | 3.55 € (2.79 € Partner) | Selver |
| Mesikäpp Kommisegu päkk kalev 500g | Candy | — | — | 4.97 € | Selver |
| Mesikäpp Maisipallid iirisega mõnus maius 25g | Candy | — | 0.79 € | 0.80 € (0.65 € Partner) | Rimi |
| Mesikäpp Piimabatoonike kalev vahvliga 150g | Candy | — | — | 2.33 € (1.89 € Partner) | Selver |
| Mesikäpp Vahukomm piimashokolaadis 115g | Candy | — | — | 1.92 € (1.55 € Partner) | Selver |
| Miisu Batoonike 150g | Candy | 2.49 € | 2.49 € | — | Barbora + Rimi |
| Mynthon Pastillid extra strong 34g | Candy | 0.95 € | 0.95 € | 0.95 € (0.75 € Partner) | Barbora + Coop + Rimi + Selver |
| Nerds närimiskomm clusters fruit 45g | Candy | — | — | 2.02 € | Selver |
| Orbit Närimiskumm blueberry 14g | Candy | — | — | 0.95 € | Coop + Selver |
| Orbit Närimiskumm peppermint 14g | Candy | — | — | 0.89 € | Selver |
| Orbit Närimiskumm rasberry pomegranate magusainetega 14g | Candy | — | — | 0.90 € | Selver |
| Orbit Närimiskumm spearmint 50g | Candy | — | 2.49 € | 2.73 € | Rimi |
| Orbit Närimiskumm spearmint magusainetega 14g | Candy | — | — | 0.95 € | Coop + Selver |
| Orbit Närimiskumm spearmint purk 64g | Candy | — | — | 3.59 € | Coop + Selver |
| Orbit Närimiskumm sweet mint magusainetega 14g | Candy | — | — | 0.95 € | Coop + Selver |
| Orbit Närimiskumm sweetmint purk 64g | Candy | — | — | 3.59 € | Coop + Selver |
| Orbit Närimiskumm watermelon magusainetega 14g | Candy | — | — | 0.95 € | Coop + Selver |
| Orbit Närimiskumm winterfresh 14g | Candy | — | 0.59 € | 0.95 € | Rimi |
| Orbit Pastill mints spearmint magusainetega 28g | Candy | — | — | 1.07 € | Selver |
| Orbit watermelon närimiskumm purk 64g | Candy | — | — | 3.59 € | Coop + Selver |
| Orbit white Närimiskumm freshmint 14g | Candy | — | 0.59 € | 0.90 € | Rimi |
| Orbit white Närimiskumm freshmint purk 64g | Candy | — | — | 3.59 € | Coop + Selver |
| Orbit white Närimiskumm fruit magusainetega 14g | Candy | — | — | 0.90 € | Selver |
| Orbit white Närimiskumm spearmint magusainetega 14g | Candy | — | — | 0.90 € | Selver |
| Pergale K tallinn assortii karp shok tumeda 348g | Candy | — | — | 8.15 € | Coop + Selver |
| Pez Kihisevad kommid fizzy 30g | Candy | — | — | 0.99 € (0.69 € Partner) | Coop + Selver |
| Pez Mänguasi täidet 2 17g | Candy | — | — | 2.65 € (1.99 € Partner) | Coop + Selver |
| Pez Mänguasja täide 6x51g | Candy | — | — | 1.39 € (1.09 € Partner) | Coop + Selver |
| Raffaello K t karp kookose 150g | Candy | — | — | 5.39 € | Coop |
| Raffaello K t karp kookose 230g | Candy | — | — | 7.59 € | Coop |
| Red band Kummikomm truly party animals 110g | Candy | — | — | 1.49 € | Coop + Selver |
| Red band Kummikomm tutti frutti hearts 15g | Candy | — | — | 0.46 € (0.35 € Partner) | Selver |
| Red band Kummikomm tutti frutti puuvilja 15g | Candy | — | — | 0.41 € | Selver |
| Red band Kummikommid bubble pop 100g | Candy | 1.39 € | 1.39 € | — | Barbora + Rimi |
| Rocher K karp t 200g | Candy | — | — | 9.19 € | Selver |
| Rocher K karp t 300g | Candy | — | — | 15.59 € | Selver |
| Rocher Komm 37.5g | Candy | — | — | 1.89 € | Coop + Selver |
| Roshen K assortii karp kommide shok 145g | Candy | — | — | 4.69 € | Coop + Selver |
| Roshen Karamell crabs kakao ja maapähkli 126g | Candy | — | — | 0.99 € | Coop |
| Roshen Koorekomm creamy toffee milky splash täidisega 150g | Candy | — | — | 1.68 € | Selver |
| Roshen sweet drop kar kondenspiima piimatäidisega 150g | Candy | — | — | 1.47 € | Selver |
| Shok rukkileiva likööriga kompv 160g | Candy | — | — | 13.20 € (10.99 € Partner) | Selver |
| Skittles Drazee fruits puuvilja 95g | Candy | — | — | 2.29 € (1.49 € Partner) | Coop + Selver |
| Skittles fruit drazee puuvilja 38g | Candy | — | — | 1.11 € | Selver |
| Skriveru Ploomid tumedas šokolaadis 110g | Candy | 2.75 € | 2.45 € | — | Rimi |
| Storck K finest karp merci selection 250g | Candy | — | — | 7.75 € (6.79 € Partner) | Coop + Selver |
| Storck Nätsukomm mamba 106g | Candy | — | — | 1.39 € | Coop + Selver |
| Storck Nätsukomm mamba magic sticks 140g | Candy | — | — | 2.49 € | Coop + Selver |
| Toffifee K karp 400g | Candy | — | — | 8.65 € | Coop + Selver |
| Toffifee K storck karp 125g | Candy | — | — | 3.05 € (2.49 € Partner) | Coop + Selver |
| Trolli Kummikomm dino rex eri 100g | Candy | — | — | 1.31 € | Selver |
| Trolli Kummikomm sour glowworms 200g | Candy | — | — | 1.99 € | Coop + Selver |
| Trolli Kummikomm squiggle twist eri 175g | Candy | — | — | 1.92 € | Selver |
| Trolli Kummikommid pfirsichringe 200g | Candy | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Trolli Kummikommid playmouse 200g | Candy | 1.92 € (1.49 € Aitäh) | 1.99 € | — | Barbora |
| Trolli Kummikommid sour glowworms 200g | Candy | 1.95 € (1.49 € Aitäh) | 1.99 € | — | Barbora |
| True dates Datlid sweet peach 100g | Candy | — | 2.75 € | 2.79 € | Rimi |
| True dates Dattel cookie dough 100g | Candy | — | 2.75 € | 2.79 € | Rimi |
| True dates Dattel creamy peanut butter 100g | Candy | — | — | 2.79 € | Coop + Selver |
| True dates Dattel sour apple 100g | Candy | — | — | 2.79 € | Coop + Selver |
| True dates Dattel sour cola 100g | Candy | — | 2.75 € | 2.79 € | Rimi |
| Tupla Shok puffs crispy kommid 140g | Candy | — | — | 4.89 € | Coop + Selver |
| Tutti frutti Kummikomm original fazer 180g | Candy | — | — | 2.29 € | Coop + Selver |
| Tutti frutti Kummikomm original fazer 350g | Candy | — | — | 4.69 € | Coop |
| Tutti frutti Kummikomm passion fazer 180g | Candy | — | — | 2.29 € | Coop + Selver |
| Tutti frutti Kummikomm remix boo sour 90g | Candy | — | — | 1.29 € (0.89 € Partner) | Selver |
| Tutti frutti Kummikomm smoothie drops ch fazer 200g | Candy | — | — | 2.79 € | Coop + Selver |
| Tutti frutti Kummikomm smoothie drops fazer 100g | Candy | — | — | 1.59 € | Coop + Selver |
| Tutti frutti Kummikomm sour fazer 180g | Candy | — | — | 2.29 € | Coop + Selver |
| V bbq damme grillvahukomm mallows 300g | Candy | — | — | 3.45 € | Coop + Selver |
| Van damme Mini vahukommid 100g | Candy | 1.49 € | — | 1.39 € | Selver |
| Werthers original sugar free magusainetega 42g | Candy | — | — | 1.82 € (1.49 € Partner) | Selver |
| Bonduelle Borlotti oad chilli kastmes 430g | Canned food | — | — | 1.89 € | Selver |
| Bonduelle Läätsed vapeur 310g | Canned food | 2.49 € | 2.59 € | — | Barbora + Coop |
| Bonduelle Magus mais 340g | Canned food | 2.09 € | 1.69 € | — | Rimi |
| Bonduelle Mais 530g | Canned food | — | 2.19 € | — | Rimi |
| Bonduelle Pun oad vapeur 310g | Canned food | 2.39 € | — | — | Barbora + Coop |
| Bonduelle Šampinjonid 540g | Canned food | — | 4.49 € | 4.59 € | Rimi |
| Bonduelle Väikesed rohelised herned 400g | Canned food | 2.69 € | — | — | Barbora + Coop |
| Bonduelle Valg oad vapeur 310g | Canned food | 2.15 € | — | — | Barbora |
| Citres küüslauk ürtidega päeval õlis 290g | Canned food | — | — | 4.75 € | Coop + Selver |
| Dittmann kerg pepperoni pikantne mahe 250g | Canned food | — | — | 2.49 € | Coop + Selver |
| Felix Kurgi sinepisalat 280g | Canned food | 2.29 € | — | 2.29 € | Barbora + Selver |
| Felix Kurgisalat 280g | Canned food | 2.29 € | 1.99 € | 2.29 € | Rimi |
| Felix Piknikukurk terve 680g | Canned food | 2.95 € | — | 2.89 € | Selver |
| Felix Särtsukurk 460g | Canned food | 2.95 € | — | 2.59 € | Selver |
| Figaro Mustad oliivid kivideta 142g | Canned food | — | — | 1.75 € | Coop + Selver |
| Figaro Mustad oliivid kivideta 240g | Canned food | — | — | 1.69 € | Selver |
| Figaro oliivid aedpipratäidis roh paprikaga 240g | Canned food | — | — | 1.75 € | Selver |
| Figaro rohelised oliivid kivideta 142g | Canned food | — | — | 1.75 € | Coop + Selver |
| Figaro Rohelised oliivid kivideta 240g | Canned food | — | — | 1.69 € | Selver |
| Gaea kalamata oliivid kivideta 150g | Canned food | — | 4.29 € | — | Coop |
| Gourmante Kapparid äädikas 100g | Canned food | 1.79 € | — | 1.82 € | Barbora |
| Gourmante kivideta oliivid roh 360g | Canned food | — | — | 3.99 € | Coop + Selver |
| Gourmante Rohelised oliivid kividega 360g | Canned food | — | — | 3.75 € | Coop |
| Gourmante Röst punased maguspiprad 450g | Canned food | 4.55 € | — | 4.55 € | Barbora + Coop + Selver |
| Green rohelised oliivid krevetiga 300g | Canned food | — | — | 1.99 € | Coop |
| Green Valged riisikad 530g | Canned food | — | — | 2.45 € | Coop + Selver |
| Heinz Punased oad kidney 400g | Canned food | 1.89 € | — | 1.89 € | Barbora + Selver |
| Heinz Viie oa segu tomatikastmes 415g | Canned food | 2.65 € | 2.65 € | — | Barbora + Rimi |
| Mikado Nameko seened 530g | Canned food | 4.99 € | — | — | Coop |
| Mikado Shiitake seened 530g | Canned food | 4.59 € | — | — | Barbora + Coop |
| Minu Kreeka salat 850g | Canned food | 4.09 € | — | — | Coop |
| Minu Letsho naturaalne 680g | Canned food | — | — | 2.69 € | Coop + Selver |
| Minu Pepperoni pipar 630g | Canned food | 2.49 € | — | 2.59 € | Barbora |
| Minu Tomatid 680g | Canned food | 2.79 € | — | 2.79 € | Barbora + Selver |
| Mõisaproua kurgid 1000g | Canned food | 3.65 € | — | 3.29 € | Coop + Selver |
| Mõisaproua kurk mesine 500g | Canned food | 2.45 € | — | 2.43 € | Selver |
| Mõisaproua Tomatid omas mahlas 1000g | Canned food | 3.49 € | — | 3.04 € | Coop |
| Organic foods Foods kikerhernes vees mahe 400g | Canned food | — | — | 1.79 € (1.39 € Partner) | Coop |
| Organic foods Foods mustad oad vees mahe 400g | Canned food | — | — | 1.85 € (1.49 € Partner) | Coop |
| Põltsamaa Jahimehesalat 550g | Canned food | — | 3.89 € | 3.65 € | Selver |
| Põltsamaa Kõrvitsasalat 560g | Canned food | — | 2.55 € | — | Coop |
| Põltsamaa Maitselt kurk 680g | Canned food | 2.89 € | 2.89 € | — | Barbora + Rimi |
| Põltsamaa Minikurk 330g | Canned food | 2.39 € | — | — | Barbora |
| Põltsamaa Perekurk viilutatud 680g | Canned food | — | 2.99 € | — | Coop + Rimi |
| Põltsamaa Piknikukurk viilutatud 680g | Canned food | — | 3.25 € | 3.19 € (2.69 € Partner) | Selver |
| Põltsamaa Punapeedi viilud 570g | Canned food | — | 2.09 € | 2.05 € | Selver |
| Põltsamaa Salatikurk 380g | Canned food | 2.69 € | — | — | Coop |
| Põltsamaa Sügisesalat 530g | Canned food | — | 3.69 € | 2.99 € | Selver |
| Põltsamaa Võileivakurk 460g | Canned food | — | 2.99 € | — | Coop + Rimi |
| Pro champ Shampinjonid soolvees viilutatud 290g | Canned food | — | — | 1.39 € | Selver |
| Reggia Tomat kooritud 400g | Canned food | — | — | 1.68 € | Selver |
| Salvest Aasiapärane salat 380g | Canned food | — | — | 3.79 € (3.19 € Partner) | Coop |
| Salvest Aedoad tomatikastmes 530g | Canned food | 2.89 € | — | 2.89 € | Barbora + Selver |
| Salvest Delikatesskurk 330g | Canned food | 2.49 € | 2.59 € | 2.49 € | Barbora + Selver |
| Salvest Hapukurk 675g | Canned food | 3.49 € | 3.49 € | 3.49 € | Barbora + Coop + Rimi + Selver |
| Salvest Köögiviljasalat magus vürtsikas 380g | Canned food | — | 3.79 € | 3.65 € | Coop + Selver |
| Salvest Kõrvitsasalat 560g | Canned food | — | — | 2.45 € | Coop + Selver |
| Salvest Kurk 675g | Canned food | 2.69 € | 2.69 € | 2.69 € (2.29 € Partner) | Barbora + Rimi + Selver |
| Salvest Küüslaugukurk 675g | Canned food | 2.79 € | 2.79 € | 2.79 € | Barbora + Coop + Rimi + Selver |
| Salvest Magus kurk 675g | Canned food | 2.79 € | 2.79 € | 2.79 € | Coop |
| Salvest Maitselt kurk 1600g | Canned food | — | 4.99 € | 4.99 € | Coop |
| Salvest Maitselt kurk 675g | Canned food | 2.79 € | 2.79 € | 2.79 € (1.99 € Partner) | Barbora + Coop + Rimi + Selver |
| Salvest Piprakurk 675g | Canned food | — | — | 2.79 € | Coop + Selver |
| Salvest Pohlasalat 310g | Canned food | — | 3.95 € | 3.45 € | Coop + Selver |
| Salvest Roheline hernes 690g | Canned food | 2.29 € | — | 2.29 € | Barbora + Selver |
| Salvest Salat tervist 520g | Canned food | — | — | 2.69 € | Selver |
| Salvest Salat toome 520g | Canned food | — | 2.59 € | 2.59 € | Rimi + Selver |
| Salvest Salatikurk 395g | Canned food | 1.99 € | 1.99 € | 1.99 € | Coop |
| Salvest Salatiporgand 400g | Canned food | — | 2.09 € | 2.09 € | Coop |
| Salvest Talukurk 675g | Canned food | 2.95 € | 2.79 € | 2.49 € | Selver |
| Salvest Viilukurk 675g | Canned food | 2.79 € | 2.95 € | — | Coop |
| Salvest Võileivakurk 530g | Canned food | 2.79 € | 2.85 € | — | Coop |
| Sunfood Kurk cm 680g | Canned food | — | 2.19 € | 2.19 € | Rimi + Selver |
| Axa Kiirkaerahelbepuder koore maasika 40g | Cereals & oats | 0.55 € | 0.55 € | — | Barbora + Rimi |
| Axa Kiirkaerahelbepuder mustikaga 40g | Cereals & oats | 0.55 € | — | — | Barbora + Coop |
| Axa Müsli marjadega premium 330g | Cereals & oats | 2.73 € | — | 2.73 € | Barbora + Selver |
| Axa Röstitud müsli granola banaani kookose 300g | Cereals & oats | — | — | 3.79 € (3.19 € Partner) | Selver |
| Axa Röstitud müsli premium troopilise vilja viljadega 330g | Cereals & oats | — | — | 2.73 € | Selver |
| Axa Röstitud müsli puuviljade ja meega 375g | Cereals & oats | — | — | 2.94 € (2.39 € Partner) | Coop |
| Axa Röstitud müsli shokolaadi ja meega 375g | Cereals & oats | — | — | 2.94 € (2.39 € Partner) | Coop |
| Baltix Hirsihelbed 500g | Cereals & oats | 1.59 € | 1.59 € | 1.59 € | Barbora + Rimi + Selver |
| Baltix Kiirkaerahelbed 1000g | Cereals & oats | 1.99 € | 1.99 € | — | Barbora + Rimi |
| Baltix Maisihelbed 500g | Cereals & oats | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Baltix Neljaviljahelbed 1000g | Cereals & oats | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Cini minis Nestle kaneeli 375g | Cereals & oats | — | — | 4.29 € | Coop |
| Cini minis Nisuruudud kaneeli nestle 645g | Cereals & oats | — | — | 6.19 € (4.49 € Partner) | Selver |
| Elovena Kaerahelbed kaerakliidega 600g | Cereals & oats | — | 2.69 € | 2.43 € (2.15 € Partner) | Selver |
| Elovena Kiirkaerahelbed 500g | Cereals & oats | — | 2.25 € | 2.25 € (1.89 € Partner) | Rimi + Selver |
| Elovena Kiirkaerapuder vaarikatega 6x35g | Cereals & oats | 2.99 € | 2.69 € | 2.99 € | Rimi |
| Elovena Täistera kiirkaerahelbed gluteenivaba 500g | Cereals & oats | — | — | 3.55 € | Selver |
| Elovena Täistera suured glut kaerahelbed vaba 500g | Cereals & oats | — | — | 3.25 € | Selver |
| Fitness Müsli nestle granola jõhvika kõrvitsa 300g | Cereals & oats | — | — | 4.19 € | Selver |
| Fitness Müsli nestle granola kinoa shok pähkl pähklitega 300g | Cereals & oats | — | — | 4.19 € | Selver |
| Fitness Müsli nestle granola meega 300g | Cereals & oats | — | — | 4.09 € | Selver |
| Fitness Täistera nisuhelbed nestle 375g | Cereals & oats | — | — | 4.39 € (3.49 € Partner) | Coop + Selver |
| Fitness Täistera protein kakaoga nestle padj 310g | Cereals & oats | — | — | 4.09 € (3.19 € Partner) | Coop + Selver |
| Helen Kiirkaerahelbed 500g | Cereals & oats | 1.47 € | 1.49 € | 1.47 € | Barbora + Selver |
| Helen Neljaviljahelbed 500g | Cereals & oats | 1.35 € | 1.35 € | 1.35 € | Barbora + Rimi + Selver |
| Helen Riisihelbed 500g | Cereals & oats | 2.25 € | 2.35 € | 2.39 € | Barbora + Coop |
| Helen Täisterakaerahelbed 500g | Cereals & oats | 1.34 € | 1.39 € | 1.35 € | Barbora |
| Helen Tatrahelbed 500g | Cereals & oats | 3.09 € | 3.19 € | 3.13 € | Barbora |
| Herkuless Müsli šokolaadi granola 3 350g | Cereals & oats | 2.79 € | — | 2.79 € | Barbora + Selver |
| Herkuless Röstitud müsli pähkli mee meega 350g | Cereals & oats | — | — | 2.69 € | Selver |
| Kellogg's Hommikuhelbed corn flakes 375g | Cereals & oats | 2.79 € | 3.89 € | 3.99 € | Barbora |
| Krõb gl maisihelb mee nestlecornfl pähkli vab 350g | Cereals & oats | — | — | 3.75 € | Selver |
| Lotte Meerõngad 225g | Cereals & oats | 1.67 € | — | 1.67 € | Barbora + Selver |
| Nesquik Teraviljapallid kakao nestle 375g | Cereals & oats | — | — | 4.36 € | Selver |
| Nesquik Teraviljapallid nestle kakaoga 625g | Cereals & oats | — | — | 6.49 € | Coop + Selver |
| Nesquik Teraviljapallid nestle maasika 330g | Cereals & oats | — | — | 4.29 € | Selver |
| Nestle Hommikusöögihelbed kitkat 330g | Cereals & oats | — | — | 4.29 € | Selver |
| Nestle lion helb kar shok terav karamelliga 600g | Cereals & oats | — | — | 6.19 € (4.49 € Partner) | Selver |
| Nestle Maisihelbed corn flakes gl v 375g | Cereals & oats | — | — | 2.69 € | Selver |
| Nestle Padjakesed lion wildcrush karam shok 360g | Cereals & oats | — | — | 4.99 € | Coop + Selver |
| Nestle Teraviljahelbed cookie crisp 625g | Cereals & oats | — | — | 6.49 € | Coop + Selver |
| Nestle Teraviljahelbed cookie crisp shok 375g | Cereals & oats | — | — | 4.29 € | Selver |
| Nestle Teraviljahelbed lion karamelli shok 400g | Cereals & oats | — | — | 4.29 € | Selver |
| Nestle Teraviljarõngad honey cheerios meega 375g | Cereals & oats | — | — | 4.29 € | Selver |
| Oho Hommikusöögihelbed cookie pillows 175g | Cereals & oats | — | — | 1.58 € (1.25 € Partner) | Selver |
| Oho Hommikusöögihelbed cookie rings 150g | Cereals & oats | — | — | 1.47 € (1.15 € Partner) | Selver |
| Oho hommikusöögihelbed fruity froops 150g | Cereals & oats | — | — | 1.47 € (1.15 € Partner) | Selver |
| Oho Hommikusöök kakaoga teraviljahelbed 150g | Cereals & oats | — | — | 1.22 € | Selver |
| Oho hommikusöök kolm sõpra 150g | Cereals & oats | — | — | 1.22 € | Selver |
| Oho Hommikusöök shokolaadiga riis 500g | Cereals & oats | — | — | 3.65 € | Coop + Selver |
| Sante Krõbe müsli granola punaste marjadega 350g | Cereals & oats | — | — | 2.19 € | Selver |
| Sante Krõbe röstitud müsli granola t shok ga šokolaadiga 350g | Cereals & oats | — | — | 3.24 € | Selver |
| Sante Naturaalne röstitud müsli 350g | Cereals & oats | 2.39 € | — | 2.39 € | Barbora + Coop + Selver |
| Sante Röst brownie kirsi goon müsli protein 300g | Cereals & oats | — | — | 3.29 € | Selver |
| Sante Röst goon müsli protein pähkli shok sokolaadiga 300g | Cereals & oats | — | — | 3.29 € | Selver |
| Sante Röst müsli banaani ja shokolaadiga 350g | Cereals & oats | — | 2.79 € | 2.89 € | Rimi |
| Sante Röst müsli granola maapähkli premium maapähklikreemiga 350g | Cereals & oats | — | — | 1.99 € | Selver |
| Sante Röst müsli maasika granola shok v 350g | Cereals & oats | — | — | 3.34 € | Coop |
| Sante Röstitud müsli puuviljadega 350g | Cereals & oats | 2.79 € | 2.79 € | 2.84 € | Barbora + Rimi |
| Start Padjakesed kakaotäidisega 500g | Cereals & oats | 3.65 € | 3.59 € | — | Rimi |
| Start Padjakesed piima täidisega 500g | Cereals & oats | — | — | 3.65 € | Coop + Selver |
| Tartu mill Kaerahelbe kiirpuder õuna kaneeli 35g | Cereals & oats | — | 0.49 € | 0.49 € | Rimi + Selver |
| Tartu mill Kaerahelbed 500g | Cereals & oats | 0.94 € | — | 1.09 € | Barbora |
| Tartu mill Kaerahelbepuder mustasõstra 35g | Cereals & oats | — | 0.49 € | 0.39 € | Selver |
| Tartu mill Kaerahelbepuder vaarika 35g | Cereals & oats | 0.49 € (0.39 € Aitäh) | 0.49 € | 0.49 € | Barbora + Rimi + Selver |
| Tartu mill Riisihelbed 500g | Cereals & oats | 1.99 € | 1.99 € | 1.99 € | Barbora + Rimi + Selver |
| Tartu mill Täistera jämedad kaerahelbed 1000g | Cereals & oats | — | 2.39 € | 2.39 € | Coop + Rimi + Selver |
| Tartu mill Täistera jämedad kaerahelbed 500g | Cereals & oats | — | 1.29 € | 1.29 € | Rimi + Selver |
| Tartu mill Täistera kiirkaerahelbed 1000g | Cereals & oats | 2.39 € | 2.39 € | 2.39 € | Barbora + Coop + Rimi + Selver |
| Tartu mill Täistera kiirkaerahelbed 500g | Cereals & oats | 1.29 € (0.99 € Aitäh) | 1.29 € | 1.29 € | Barbora + Rimi + Selver |
| Tartu mill Täistera kiirkaerahelbed mahe 500g | Cereals & oats | — | — | 2.49 € | Coop + Selver |
| Tartu mill Täistera neljaviljahelbed 1000g | Cereals & oats | 2.39 € | 2.39 € | 1.99 € | Selver |
| Tartu mill Täistera neljaviljahelbed 500g | Cereals & oats | — | 1.29 € | 1.29 € | Rimi + Selver |
| Tartu mill Täistera röstitud kiirtatrahelbed 500g | Cereals & oats | — | — | 2.59 € | Selver |
| Väike väänik Terav padjakesed kakaotäidisega 250g | Cereals & oats | — | — | 2.45 € | Coop |
| Väike väänik Terav padjakesed vaniljetäidisega 250g | Cereals & oats | — | — | 2.45 € | Coop |
| Veski mati Kaera ja riisihelbe segu 500g | Cereals & oats | 1.99 € | — | 2.02 € | Barbora |
| Veski mati Kaerahelbe kiirpuder metsamarja metsamarjadega 45g | Cereals & oats | — | — | 0.70 € | Coop |
| Veski mati Kaerahelbe kiirpuder mustika 45g | Cereals & oats | — | — | 0.52 € | Selver |
| Veski mati Kaerakliid 1000g | Cereals & oats | 3.09 € | 2.95 € | — | Rimi |
| Veski mati Kiirkaerahelbed 500g | Cereals & oats | 1.69 € | 1.45 € | — | Rimi |
| Veski mati Seemnete ja kliidega helbed 500g | Cereals & oats | — | 1.45 € | 1.99 € | Rimi |
| Veski mati Täistera jämedad kaerahelbed 1000g | Cereals & oats | — | — | 2.19 € | Selver |
| Veski mati Täistera kiirkaerahelbed 500g | Cereals & oats | — | — | 1.29 € | Coop + Selver |
| Veski mati Täistera odrahelbed 500g | Cereals & oats | — | — | 1.89 € | Selver |
| Veski mati Veski täistera viljahelbed 500g | Cereals & oats | — | — | 1.29 € | Coop |
| Veski mati Viljahelbed kliidega 500g | Cereals & oats | 1.85 € | — | 1.85 € | Barbora + Selver |
| Alma Sulatatud juust 200g | Cheese | 1.99 € (1.59 € Aitäh) | 1.89 € | 1.99 € (1.49 € Partner) | Rimi |
| Alma Sulatatud juust cheddari tšilli 200g | Cheese | 1.99 € (1.59 € Aitäh) | 1.99 € | 1.69 € | Selver |
| Alma Sulatatud juust kreveti 200g | Cheese | 1.99 € (1.59 € Aitäh) | — | 1.99 € (1.49 € Partner) | Barbora + Coop + Selver |
| Alma Sulatatud juust maitseürdi 200g | Cheese | 1.99 € (1.59 € Aitäh) | — | 1.99 € (1.49 € Partner) | Barbora + Selver |
| Alma Sulatatud juust trühvli 200g | Cheese | 1.99 € (1.59 € Aitäh) | 1.99 € | 1.69 € | Selver |
| Apetina juust päiksekuiv tomat tomatitega 100g | Cheese | — | — | 3.04 € (2.39 € Partner) | Coop |
| Aristides Salatijuust 200g | Cheese | — | 2.49 € | 2.50 € | Coop + Rimi |
| Athena Pehme valge juust 200g | Cheese | — | — | 2.18 € | Coop |
| Bavaria blue Valge sinihallitusjuust bergader 150g | Cheese | — | — | 3.75 € | Coop |
| Bergader Sinihallitusjuust bavaria würzige 175g | Cheese | — | — | 4.06 € (3.19 € Partner) | Coop |
| Bergader Sinihallitusjuust gourmet 100g | Cheese | 2.84 € | — | 2.84 € | Barbora + Selver |
| Castello V danish brie hall juust 125g | Cheese | — | — | 4.05 € | Coop |
| Castello V danish camembert hall juust 125g | Cheese | — | — | 4.05 € | Coop |
| Delikatess Suitsutatud juustupats 200g | Cheese | — | — | 5.58 € | Selver |
| Deline Kõva kitsepiimajuust kitseke viil 150g | Cheese | — | — | 4.49 € | Coop |
| E-piim Brõnsa juust 200g | Cheese | 2.49 € | — | 2.53 € | Barbora |
| E-piim Juust gouda viilutatud 300g | Cheese | 3.69 € | — | 3.49 € | Coop |
| E-piim Riivjuust light 250g | Cheese | 1.99 € | — | 2.73 € (1.89 € Partner) | Barbora |
| Epiim Eesti juust viil laktoosivaba 500g | Cheese | — | — | 5.48 € (3.29 € Partner) | Selver |
| Epiim Gouda juust 350g | Cheese | — | — | 3.45 € | Selver |
| Epiim Juust bresto laktoosivaba 200g | Cheese | — | — | 2.49 € | Coop + Selver |
| Epiim Juust bresto light laktoosivaba 200g | Cheese | — | — | 2.43 € | Selver |
| Epiim Light juust viil 150g | Cheese | — | — | 1.82 € (1.29 € Partner) | Coop |
| Estover Eesti juust pt viil 500g | Cheese | — | — | 6.29 € | Coop |
| Estover Eesti juust riivitud pt 25.2% 200g | Cheese | — | — | 2.43 € | Coop |
| Estover Eesti juust täispiimast viil 180g | Cheese | — | — | 2.63 € (1.99 € Partner) | Coop |
| Estover Eesti juust täispiimast viil 450g | Cheese | — | — | 6.09 € (3.39 € Partner) | Coop |
| Estover Hollandi leibjuust pt viil 25.2% 300g | Cheese | — | — | 4.36 € (2.99 € Partner) | Coop |
| Estover Juust eesti viilutatud 200g | Cheese | 2.49 € (1.79 € Aitäh) | 2.49 € | 3.13 € | Coop |
| Estover Juust eesti viilutatud 500g | Cheese | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Estover Juust emmental viil 150g | Cheese | 2.63 € (1.49 € Aitäh) | — | 2.63 € | Coop |
| Estover Juust maasdam viil 28.3% 150g | Cheese | — | — | 2.63 € | Coop |
| Estover Juust vene viilutatud 150g | Cheese | 1.69 € | 1.95 € | — | Barbora |
| Estover Riivjuust eesti 400g | Cheese | 4.55 € (2.99 € Aitäh) | 4.55 € | — | Barbora + Rimi |
| Estover Vene juust pt viil 28.5% 150g | Cheese | — | — | 2.29 € | Coop |
| Estover Vene juust pt viil 28.5% 500g | Cheese | — | 6.29 € | 6.59 € | Coop |
| Exquisa toorjuust 200g | Cheese | — | — | 2.33 € (1.79 € Partner) | Coop |
| Exquisa toorjuust fitline 0.2% 200g | Cheese | — | 2.29 € | 2.33 € (1.79 € Partner) | Coop + Rimi |
| Farmi Juustu mix 200g | Cheese | — | 2.99 € | 3.25 € | Rimi |
| Farmi Köögi toorjuust 400g | Cheese | 3.69 € | — | 3.69 € | Barbora + Coop + Selver |
| Farmi Köögitoorjuust laktoosivaba 15% 400g | Cheese | — | — | 2.79 € | Selver |
| Farmi Toorjuust küüslauguga 150g | Cheese | 2.25 € | — | 2.30 € | Coop |
| Farmi Toorjuust maitsestamata 150g | Cheese | — | — | 2.30 € | Coop |
| Farmi Toorjuust murulauguga 150g | Cheese | 2.25 € | — | 2.30 € | Coop |
| Farmi Võileivamääre hapukurgi tilli 150g | Cheese | — | 1.55 € | 1.49 € | Coop + Selver |
| Farmi Võileivamääre karulaugupestoga 150g | Cheese | — | — | 1.49 € | Coop + Selver |
| Golden monarch Sinihallitusjuust 100g | Cheese | — | 2.15 € | — | Coop |
| Granarolo Juust burrata 125g | Cheese | — | 3.39 € | 3.24 € | Coop |
| Granarolo Mozzarella minikirsid 125g | Cheese | — | — | 2.19 € | Coop |
| Hiirte juust Hiirte estover pt viil 25.2% 200g | Cheese | — | — | 3.04 € (1.99 € Partner) | Coop |
| Hiirte juust Hiirte estover pt viil 25.2% 500g | Cheese | — | — | 3.99 € | Coop + Selver |
| Hiirte juust Sulatatud 185g | Cheese | 1.85 € | 1.39 € | 1.87 € | Rimi |
| Juust atleet cheddar 250g | Cheese | — | — | 3.62 € (2.59 € Partner) | Coop |
| Juust forte classico 26% laktoosivaba 180g | Cheese | — | — | 3.75 € | Coop |
| Juust forte superiore 26% laktoosivaba 180g | Cheese | — | — | 4.26 € | Coop |
| Juustoportti Lapimaa juust 140g | Cheese | — | — | 3.99 € | Coop + Selver |
| Juustoportti Lapimaa juust laktoosivaba 140g | Cheese | — | — | 3.99 € (3.29 € Partner) | Coop + Selver |
| Käserei brie ch h juust v 125g | Cheese | — | — | 3.55 € | Coop |
| Käserei fitaki juust 200g | Cheese | — | — | 3.04 € | Coop |
| Käserei Fitaki juust ch 40% 500g | Cheese | — | — | 6.19 € | Coop |
| Käserei Sinihall dorblu ch juust 100g | Cheese | — | — | 2.43 € (1.89 € Partner) | Coop |
| Käserei Sinihall royal blu dorblu juust 100g | Cheese | — | — | 2.39 € | Coop |
| Käserei Sinihallitusjuust cambozola 70% 150g | Cheese | — | — | 4.06 € | Coop |
| Kortos Salatijuust ürtidega 160g | Cheese | 2.69 € (1.79 € Aitäh) | — | — | Barbora + Coop |
| Kreemjuust kitsepiimast altenburger laktoosivaba 150g | Cheese | — | — | 3.55 € (2.69 € Partner) | Coop |
| Madeta Sinihallitusjuust niva 100g | Cheese | — | — | 1.86 € | Coop |
| Merevaik Sulatatud juust 200g | Cheese | — | 1.99 € | 1.99 € | Coop + Rimi + Selver |
| Merevaik Sulatatud juust 370g | Cheese | — | 3.59 € | 3.39 € | Coop + Selver |
| Merevaik Sulatatud juust krevettidega 200g | Cheese | — | 1.99 € | — | Coop + Rimi |
| Merevaik Sulatatud juust kukeseentega 200g | Cheese | — | 1.99 € | 1.99 € | Coop + Rimi + Selver |
| Merevaik Sulatatud juust laktoosivaba 200g | Cheese | — | 1.99 € | 1.99 € | Coop + Rimi + Selver |
| Merevaik Sulatatud juust murulauguga 200g | Cheese | — | 1.99 € | 1.99 € | Coop + Rimi + Selver |
| Merevaik Sulatatud juust musta trühvliga 170g | Cheese | — | 1.99 € | 1.99 € | Coop + Rimi + Selver |
| Merevaik Sulatatud juust premium 170g | Cheese | 1.57 € | 1.99 € | 1.79 € | Barbora |
| Merevaik Sulatatud juust röstitud kanaga 200g | Cheese | — | 1.99 € | 1.99 € | Coop + Rimi + Selver |
| Miree toorjuust mädarõikaga 150g | Cheese | — | — | 2.33 € (1.89 € Partner) | Coop |
| Mo saaremaa Juust edam viil 450g | Cheese | 5.88 € | — | 5.88 € | Coop |
| Mo saaremaa Juust old saare 3 280g | Cheese | — | 4.19 € | — | Coop |
| Mo saaremaa Juust old saare 6 280g | Cheese | — | 4.69 € | — | Coop |
| Mo saaremaa Juust red cheddar 280g | Cheese | — | 4.09 € | 4.16 € | Coop |
| Mo saaremaa Juust saare leet viil 450g | Cheese | 6.19 € | — | — | Coop |
| Mo saaremaa Juust saare light viil 15% laktoosivaba 150g | Cheese | — | — | 2.08 € | Coop |
| Mo saaremaa Juust viil 450g | Cheese | 5.88 € | — | 3.69 € | Selver |
| Mo saaremaa Juustuampsud 200g | Cheese | 3.09 € | — | 3.10 € | Coop |
| Mo saaremaa Riivjuust 200g | Cheese | 1.79 € | — | 2.63 € | Barbora |
| Mo saaremaa Seltskonna juustuamps koduaia ürt ürtidega 200g | Cheese | — | — | 3.10 € | Coop |
| Mo saaremaa Seltskonna juustuampsud kuiv p tom tomatitega 200g | Cheese | — | — | 3.10 € | Coop |
| Mo saaremaa Suitsutatud kadaka juust laktoosivaba 500g | Cheese | — | — | 7.32 € | Coop |
| Mo saaremaa Suitsutatud kadaka juust viil 26% laktoosivaba 150g | Cheese | — | — | 2.30 € | Coop |
| Mo saaremaa Sulatatud juust kadaka 185g | Cheese | — | 1.89 € | 1.87 € | Selver |
| Nopri Gouda juust tšilli 250g | Cheese | 3.89 € | — | 5.22 € (3.99 € Partner) | Barbora |
| Nopri gouda talujuust klassika 3 250g | Cheese | — | — | 5.27 € | Coop |
| Nopri Grilljuust 200g | Cheese | 3.52 € | 4.90 € | 4.69 € | Barbora |
| Nopri Grilljuust döner kebab kohvri 200g | Cheese | 3.56 € | 4.49 € | 4.77 € (3.79 € Partner) | Barbora |
| Nopri Grilljuust karulaugu 200g | Cheese | 3.52 € | 4.90 € | — | Barbora |
| Nopri Grilljuust tšilliga 200g | Cheese | 3.52 € | 4.90 € | 4.70 € | Barbora |
| Nopri Juust gouda karulauguga 250g | Cheese | 3.89 € | — | 5.22 € | Barbora |
| Nopri Juust gouda lambaläätsedega 250g | Cheese | — | — | 5.22 € | Coop |
| Olympus Feta juust 150g | Cheese | — | 3.35 € | 3.34 € (2.69 € Partner) | Coop |
| Olympus Salatijuust kitsepiimast 150g | Cheese | — | 2.89 € | 2.90 € (2.39 € Partner) | Rimi |
| Olympus Salatijuust lambapiimast 150g | Cheese | — | 2.89 € | 2.90 € (2.39 € Partner) | Rimi |
| Paysan breton Valgehallitusjuust brie 180g | Cheese | — | — | 4.59 € | Coop + Selver |
| Philadelphia Toorjuust classic 200g | Cheese | 3.75 € (2.89 € Aitäh) | 2.99 € | 2.99 € | Rimi + Selver |
| Philadelphia Toorjuust light 200g | Cheese | — | 2.99 € | 3.99 € | Rimi |
| Philadelphia Toorjuust light küüsl 200g | Cheese | 3.69 € (2.89 € Aitäh) | 2.99 € | — | Rimi |
| Piimameister otto Mozzarella kirsid 125g | Cheese | — | 1.75 € | 1.69 € | Coop |
| Piimameister otto Toorjuust 150g | Cheese | 1.99 € (1.35 € Aitäh) | 1.99 € | — | Barbora + Coop + Rimi |
| Piimameister otto Toorjuust 400g | Cheese | 3.45 € | 3.49 € | 3.45 € | Barbora + Selver |
| Piimameister otto Toorjuust küüslaugu ürtidega 150g | Cheese | 1.99 € (1.35 € Aitäh) | — | — | Barbora + Coop |
| President Camembert juust valgehal 120g | Cheese | — | 2.85 € | 3.24 € | Rimi |
| President V brie hall juust naturaalne 125g | Cheese | — | — | 3.24 € (2.49 € Partner) | Coop |
| President V brie hall juust pähkliga 125g | Cheese | — | — | 3.24 € (2.49 € Partner) | Coop |
| President V camembert pähklitega hall juust 120g | Cheese | — | — | 3.24 € | Coop |
| Riivjuust atleet cheddar 200g | Cheese | — | — | 2.73 € (1.99 € Partner) | Coop |
| Royal blue Sinihallitusjuust 100g | Cheese | 2.19 € | 1.59 € | 1.89 € | Rimi |
| Sulatatud juust grillkanaga hiirte 185g | Cheese | — | 1.39 € | — | Rimi |
| Sulatatud juust maitserohelisega hiirte 185g | Cheese | — | 1.39 € | 1.87 € | Rimi |
| Sulatatud juust old saare 185g | Cheese | — | 1.89 € | 1.87 € | Selver |
| Sulatatud juust suitsujuustuga hiirte 185g | Cheese | — | 1.39 € | 1.87 € | Rimi |
| Synnove Kõva juust itaallane 150g | Cheese | — | 3.69 € | 3.65 € | Coop |
| Synnove Mozzarella riivjuust 200g | Cheese | — | — | 3.04 € | Coop |
| Tere Suitsujuust kiles 18% 200g | Cheese | — | 2.99 € | 3.04 € (2.49 € Partner) | Coop + Rimi |
| Valcolatte Mozzarella laktoosivaba 100g | Cheese | — | — | 1.87 € | Coop |
| Valio atleet Riivjuust küpsetistele 200g | Cheese | 2.59 € (1.79 € Aitäh) | — | 2.63 € | Barbora + Coop |
| Valio atleet Viilujuust light 150g | Cheese | — | — | 2.08 € | Coop |
| Valio atleet Viilujuust originaal 26% 500g | Cheese | — | — | 6.27 € | Coop |
| Valio Juust atleet originaal 200g | Cheese | — | 2.49 € | 2.53 € | Coop + Rimi |
| Valio Juust atleet originaal 26% 500g | Cheese | — | — | 5.58 € (3.59 € Partner) | Selver |
| Valio Juust atleet originaal viil 150g | Cheese | — | 1.59 € | 1.67 € | Rimi |
| Valio Juust edam 200g | Cheese | 2.55 € | — | — | Barbora |
| Valio Juust forte speciale 180g | Cheese | — | 4.79 € | 4.67 € | Coop |
| Valio Juust oltermanni 500g | Cheese | 3.99 € | 6.99 € | 7.32 € | Barbora |
| Valio Juust royal gouda red 250g | Cheese | 3.69 € | 2.89 € | 3.75 € | Rimi |
| Valio Juust royal gouda red viil 150g | Cheese | 2.43 € | 1.89 € | — | Rimi |
| Valio Juust royal gouda yellow 300g | Cheese | 4.16 € | 3.29 € | — | Rimi |
| Valio Juust tilsit 200g | Cheese | — | 2.59 € | — | Coop + Rimi |
| Valio Suitsujuust kaval ants 250g | Cheese | 2.95 € | 2.95 € | — | Barbora + Rimi |
| Valio Sulatatud juust 185g | Cheese | 1.99 € | 1.99 € | 1.98 € | Selver |
| Valio Sulatatud juust 370g | Cheese | 2.49 € | 2.69 € | — | Barbora |
| Valio Sulatatud juust forte juustu 185g | Cheese | 1.98 € | 1.99 € | — | Barbora |
| Valio Sulatatud juust murulaugu ürdi 185g | Cheese | — | 1.99 € | 1.98 € | Selver |
| Valio Viilujuust atleet cheddar 500g | Cheese | — | — | 4.49 € | Selver |
| Valio Viilujuust royal gouda yellow laktoosivaba 150g | Cheese | — | — | 2.08 € | Coop |
| Viilujuust atleet cheddar 150g | Cheese | — | — | 2.29 € | Coop |
| Zott Sulatatud juust toasty hamburger viil 120g | Cheese | — | — | 1.99 € | Coop |
| Zott toasty sandwich viil 120g | Cheese | — | — | 1.99 € | Coop |
| Balsnack Kartulivahvel hapukoore tilli 90g | Chips & snacks | 1.05 € | 1.09 € | — | Barbora |
| Balsnack Kartulivahvel meresoolaga 90g | Chips & snacks | 1.35 € | 1.35 € | — | Barbora + Rimi |
| Cheetos Ketšupi maisikrõpsud 165g | Chips & snacks | 2.69 € | 2.75 € | — | Barbora |
| Cheetos Maisikrõps crunchos maguspipra 165g | Chips & snacks | — | — | 2.73 € | Selver |
| Cheetos Maisikrõps juustu 165g | Chips & snacks | — | 2.75 € | 2.73 € | Selver |
| Cheetos Maisikrõpsud pitsa 160g | Chips & snacks | 2.69 € | 2.75 € | — | Barbora |
| Estrella Kartulikr hapukoore sibula kettlecooked 120g | Chips & snacks | — | — | 2.90 € | Coop |
| Estrella Kartulikrõpsud cheddar juust pun sibul 120g | Chips & snacks | — | — | 2.90 € | Coop |
| Estrella Kartulikrõpsud hapukoore sibula 130g | Chips & snacks | — | 2.49 € | — | Coop + Rimi |
| Estrella Kartulikrõpsud hapukoore sibula 180g | Chips & snacks | — | 3.59 € | 3.75 € | Rimi |
| Estrella Kartulikrõpsud hapukoore sibula 250g | Chips & snacks | — | 4.59 € | — | Coop + Rimi |
| Estrella Kartulikrõpsud juustu 130g | Chips & snacks | — | 2.49 € | — | Coop + Rimi |
| Estrella Kartulikrõpsud juustu 180g | Chips & snacks | — | 3.59 € | 3.75 € | Rimi |
| Estrella Kartulikrõpsud kettle cooked soolaga 120g | Chips & snacks | — | — | 2.90 € | Coop |
| Estrella Kartulikrõpsud koorese kukeseene kastme 170g | Chips & snacks | — | — | 2.45 € | Selver |
| Estrella Kartulikrõpsud kurgi hapukoore 170g | Chips & snacks | 3.45 € | 3.49 € | — | Barbora |
| Estrella Kartulikrõpsud sibula 250g | Chips & snacks | 4.59 € (2.89 € Aitäh) | — | 4.49 € | Selver |
| Estrella Kartulikrõpsud spicy jalapeno juustu 115g | Chips & snacks | — | — | 2.73 € | Coop |
| Estrella Kartulikrõpsud spicy tshilli hapukoore 115g | Chips & snacks | — | — | 2.73 € | Coop |
| Estrella Kartulikrõpsud või ja soola 170g | Chips & snacks | — | — | 2.45 € | Selver |
| Estrella Mikropopkorn soolaga 3x90g | Chips & snacks | 3.55 € | — | — | Barbora + Coop |
| Estrella Mikropopkorn soolaga 90g | Chips & snacks | 1.19 € | — | 1.29 € | Barbora + Coop |
| Estrella Mikropopkorn või 3x90g | Chips & snacks | 3.55 € | — | — | Barbora + Coop |
| Estrella Mikropopkorn või 90g | Chips & snacks | 1.19 € (0.89 € Aitäh) | 1.19 € | 1.29 € | Barbora + Coop + Rimi |
| Kartulikrõps Kartulikrõpsud lays juustu vürtsika paprika 120g | Chips & snacks | — | — | 2.69 € | Selver |
| Kartulikrõps Kartulikrõpsud lays max salsa 120g | Chips & snacks | — | — | 2.69 € | Selver |
| Kartulikrõps Kartulikrõpsud lays oven baked kukeseene 110g | Chips & snacks | — | — | 2.84 € (1.89 € Partner) | Selver |
| Kartulikrõps Kartulikrõpsud lays sibula 130g | Chips & snacks | — | 1.59 € | 1.99 € | Rimi |
| Kartulisnäkk pomsticks soolaga 100g | Chips & snacks | — | — | 1.98 € (1.65 € Partner) | Selver |
| Kartulivahvel balsnack hapukoore sibula 90g | Chips & snacks | — | — | 1.35 € | Coop + Selver |
| Kartulivahvel balsnack juustu sibula 90g | Chips & snacks | — | — | 1.35 € | Coop + Selver |
| Kartulivahvel hapukoore balsnack tilli tilliga 90g | Chips & snacks | — | — | 1.35 € | Coop + Selver |
| Lay's Kartulikrõpsud juustu 180g | Chips & snacks | — | 3.59 € | 3.59 € | Rimi + Selver |
| Lay's Kartulikrõpsud sibula 180g | Chips & snacks | — | 3.59 € | 3.59 € | Rimi + Selver |
| Lay's Kartulikrõpsud tomati 180g | Chips & snacks | — | 3.59 € | 3.59 € | Rimi + Selver |
| Lotte Maisipulgad 130g | Chips & snacks | 1.39 € | 1.39 € | — | Barbora + Rimi |
| Mogyi micropop popcorn soolaga 100g | Chips & snacks | — | — | 0.89 € | Selver |
| Mogyi Mikropopkorn juustu juustuga 100g | Chips & snacks | 0.99 € | — | 0.89 € | Selver |
| Oho Läätsekrõps hapukoore ja sibulaga 100g | Chips & snacks | — | — | 1.62 € (1.29 € Partner) | Selver |
| Oho Läätsekrõps peekoniga 100g | Chips & snacks | — | — | 1.62 € (1.29 € Partner) | Selver |
| Ok snacks Röstitud seakrõpsud pekiga 50g | Chips & snacks | 2.09 € | — | 1.69 € | Selver |
| Ossi Seakamarakrõpsud meresoolaga 40g | Chips & snacks | 0.95 € | 1.14 € | — | Barbora |
| Ossi Seakamarakrõpsud sinepi 40g | Chips & snacks | 0.95 € | 1.12 € | — | Barbora |
| Piraat Kartulikrõpsud maxi hapukoore küüslaugu 150g | Chips & snacks | — | — | 2.35 € | Coop |
| Piraat Nisukrõps sibula ja juustu 150g | Chips & snacks | — | — | 1.99 € | Selver |
| Piraat Nisukrõps suitsupeekoniga 150g | Chips & snacks | — | — | 2.19 € (1.79 € Partner) | Coop + Selver |
| Pringles ja kartulikr soola äädika 165g | Chips & snacks | — | — | 3.55 € | Coop |
| Pringles juustu kartulikr sibulam 165g | Chips & snacks | — | 3.19 € | 2.95 € | Selver |
| Pringles Kartulikrõpsud hot spicy 165g | Chips & snacks | 3.19 € | 3.19 € | — | Barbora + Rimi |
| Pringles Kartulikrõpsud juustu 165g | Chips & snacks | — | 3.19 € | — | Rimi |
| Pringles Kartulikrõpsud mediterranean herbs 165g | Chips & snacks | 3.19 € | — | 3.55 € | Barbora |
| Pringles Kartulikrõpsud original 165g | Chips & snacks | 3.19 € | 3.19 € | 2.95 € | Selver |
| Pringles Kartulikrõpsud paprika 165g | Chips & snacks | 3.19 € | — | 3.55 € | Barbora |
| Pringles Kartulikrõpsud peekoni 165g | Chips & snacks | 3.19 € | 3.19 € | — | Barbora + Rimi |
| Pringles krõpsud koore sibulam 165g | Chips & snacks | — | 3.19 € | 3.55 € | Rimi |
| Starchipz Kartulikrõpsud hapukoore sibula 150g | Chips & snacks | — | 1.99 € | 3.04 € | Rimi |
| Taffel juustu kartulikr 180g | Chips & snacks | — | 2.85 € | 2.97 € (1.97 € Partner) | Rimi |
| Taffel kartulikr röst shashlõki sib 180g | Chips & snacks | — | — | 2.97 € | Selver |
| Taffel Kartulikrõpsud cheddari 180g | Chips & snacks | 2.75 € | — | 2.97 € (1.97 € Partner) | Barbora |
| Taffel Kartulikrõpsud hapukoore sibula 180g | Chips & snacks | — | — | 2.97 € (1.47 € Partner) | Coop |
| Taffel Kartulikrõpsud san diego vürtsikad 180g | Chips & snacks | — | — | 2.97 € (1.47 € Partner) | Selver |
| Taffel Kartulikrõpsud tshilli tsitruse 180g | Chips & snacks | — | — | 2.97 € | Selver |
| Taffel Kartulil hapukoore sibulam siledad 180g | Chips & snacks | — | — | 2.97 € | Selver |
| Taffel Maisipallid nacho juustu 165g | Chips & snacks | 2.99 € | 2.99 € | 2.97 € | Selver |
| Taffel Maisipallid pitsa 165g | Chips & snacks | 2.99 € | — | — | Barbora + Coop |
| Taffel Maisisnäkid nacho juustu hearts 200g | Chips & snacks | — | 3.69 € | 2.85 € | Selver |
| Vigur Kartulikrõpsud juustu sibula 90g | Chips & snacks | — | 1.49 € | 1.51 € | Coop + Rimi |
| Bounty Piimashok bat kookospähkliga 57g | Chocolate | — | — | 1.75 € (1.19 € Partner) | Selver |
| Daim Shok batoon mini 28g | Chocolate | — | — | 0.79 € | Selver |
| Dumle Shok crispy twins batoon 40g | Chocolate | — | — | 1.29 € | Selver |
| Fazer dumle Piimashokolaad karl toffeetükkidega 180g | Chocolate | — | — | 5.29 € (2.99 € Partner) | Selver |
| Geisha Piimashok fazer karamelli meresoola 100g | Chocolate | — | — | 2.75 € | Coop + Selver |
| Geisha Piimashokolaad fazer 100g | Chocolate | — | — | 2.75 € | Coop |
| Geisha Piimashokolaadibatoon fazer 37g | Chocolate | — | — | 1.19 € | Selver |
| Geisha Šokolaadibatoon crunchy 50g | Chocolate | 1.49 € | 1.19 € | 1.75 € | Rimi |
| Kalev Brownie batoon 50g | Chocolate | 1.15 € (0.79 € Aitäh) | 1.15 € | — | Barbora + Rimi |
| Kalev Kamatahvel 100g | Chocolate | — | 1.49 € | 1.49 € | Coop + Rimi + Selver |
| Kalev Kamatahvel mustika küpsise 100g | Chocolate | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Kalev Kamatahvel mustikate ja küpsistega 100g | Chocolate | — | — | 1.49 € | Coop + Selver |
| Kalev Klassikaline martsipanibatoon 40g | Chocolate | 0.99 € | 0.99 € | 0.97 € | Selver |
| Kalev Martsipanibatoon vana tallinn 40g | Chocolate | 0.99 € | 1.05 € | 0.97 € | Selver |
| Kalev Piimashok anneke 20g | Chocolate | — | — | 0.89 € (0.65 € Partner) | Coop + Selver |
| Kalev Piimashok kalevipoeg mandlitega 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Piimashok linda metspähklitega 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Piimashok nurr mullidega õhuline 65g | Chocolate | — | — | 1.97 € | Selver |
| Kalev Piimashok piret tervete metspähklitega 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Piimashok purustatud metspähklitega 190g | Chocolate | — | — | 4.97 € | Coop |
| Kalev Piimashok saarepiiga leiva ja jõhvikaga 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Piimashok tervete metspähklitega 100g | Chocolate | — | — | 2.67 € | Selver |
| Kalev Piimashok tervete metspähklitega 190g | Chocolate | — | — | 4.99 € | Coop |
| Kalev Piimashokolaad eesti 100g | Chocolate | — | — | 2.97 € | Coop |
| Kalev Piimašokolaad 190g | Chocolate | 4.99 € | 2.99 € | 4.97 € | Rimi |
| Kalev Piimašokolaad anneke 100g | Chocolate | 2.69 € (1.89 € Aitäh) | 2.59 € | 2.69 € (1.99 € Partner) | Rimi |
| Kalev Piimašokolaad anneke 190g | Chocolate | 4.99 € (3.49 € Aitäh) | 4.99 € | — | Barbora + Rimi |
| Kalev Piimašokolaad anneke 270g | Chocolate | 6.99 € (4.69 € Aitäh) | 6.99 € | 4.97 € | Selver |
| Kalev Piimašokolaad anneke õhuline 65g | Chocolate | 2.25 € (1.59 € Aitäh) | 2.29 € | 2.17 € (1.59 € Partner) | Coop |
| Kalev Piimašokolaad nurr 20g | Chocolate | 0.69 € | — | 0.99 € | Barbora |
| Kalev Shok brownie karamelli metspähkli batoon 50g | Chocolate | — | — | 0.97 € | Selver |
| Kalev Shok maapähkli batoon ja karamelliga 50g | Chocolate | — | — | 0.97 € | Selver |
| Kalev Shok maiuspala batoon pähklitega 40g | Chocolate | — | — | 0.99 € | Selver |
| Kalev Šokolaad vana tallinn cream 104g | Chocolate | 2.95 € | — | 2.97 € | Coop |
| Kalev Soolakaramellibatoon piimashokolaadiga 40g | Chocolate | — | — | 0.97 € (0.79 € Partner) | Selver |
| Kalev Täispiimashok nurr 100g | Chocolate | — | — | 1.97 € | Selver |
| Kalev Täispiimashok nurr 190g | Chocolate | — | — | 4.97 € | Coop |
| Kalev Tume leiger tervete mandlitega shok 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Tume maiuspala täidisega shok 100g | Chocolate | — | — | 2.97 € | Coop |
| Kalev Tume metspähklitega shok 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Tume shokolaad kirssidega 100g | Chocolate | — | — | 2.67 € | Selver |
| Kalev Tume shokolaad tuljak täidisega 105g | Chocolate | — | 3.29 € | 2.97 € | Coop |
| Kalev Tume šokolaad bitter 56% 100g | Chocolate | 2.69 € | 2.69 € | 2.67 € | Selver |
| Kalev Tume šokolaad bitter 70% 100g | Chocolate | 2.69 € | 2.69 € | 2.67 € | Selver |
| Kalev Tume šokolaad bitter 70% 190g | Chocolate | 3.79 € | 5.55 € | 4.97 € | Barbora |
| Kalev Tume šokolaad bitter 87% 100g | Chocolate | 2.69 € | 2.69 € | — | Barbora + Rimi |
| Kalev Tume šokolaad kirsiga 190g | Chocolate | 4.99 € | 2.99 € | 4.97 € | Rimi |
| Kalev Tume suur tõll tervete metspähkli shok metspähklitega 270g | Chocolate | — | — | 7.27 € | Coop |
| Kalev Tume tervete mandlitega shok 190g | Chocolate | — | 2.99 € | 4.97 € | Rimi |
| Kalev Tume tervete metspähklitega shok 100g | Chocolate | — | — | 2.67 € | Selver |
| Kalev Tume vana tallinn liköörikr shok täidis 103g | Chocolate | — | — | 2.97 € | Coop |
| Kalev Valge ja õhitud riisiga mustikate shok 95g | Chocolate | — | — | 2.79 € | Coop |
| Kalev Valge õhitud ja mustikate riisiga shok 190g | Chocolate | — | — | 4.97 € | Coop |
| Karl fazer Piimashok ja pähklite rosinatega 180g | Chocolate | — | 5.29 € | 5.29 € (2.99 € Partner) | Rimi + Selver |
| Karl fazer Piimashok marjadega punaste 180g | Chocolate | — | — | 5.19 € (2.99 € Partner) | Selver |
| Karl fazer Piimashok piparmünditükikestega 95g | Chocolate | — | — | 1.99 € | Selver |
| Karl fazer Piimashok purustatud metsapähklitega 95g | Chocolate | — | — | 2.99 € (1.99 € Partner) | Coop + Selver |
| Karl fazer Piimashok soolase karamelli ga tükkidega 180g | Chocolate | — | — | 3.49 € | Selver |
| Karl fazer Piimashok tervete metsapähklitega 200g | Chocolate | — | — | 5.65 € (3.69 € Partner) | Coop |
| Karl fazer Piimašokolaad 180g | Chocolate | 5.29 € | 4.99 € | 5.29 € (2.99 € Partner) | Rimi |
| Karl fazer Piimašokolaad 95g | Chocolate | 2.99 € | — | 2.99 € (1.99 € Partner) | Barbora + Coop + Selver |
| Karl fazer Shok crunchy batoon 55g | Chocolate | — | 1.75 € | 1.75 € (1.09 € Partner) | Rimi + Selver |
| Karl fazer Tume šokolaad 180g | Chocolate | 5.29 € | — | 5.29 € (2.99 € Partner) | Barbora + Selver |
| Karl fazer Valge ja piimashokolaad 131g | Chocolate | — | — | 3.49 € | Coop + Selver |
| Kex Täidetud vahvel piimašokolaadis vahvliga 60g | Chocolate | 0.99 € | — | 1.25 € | Barbora + Coop |
| Kinder Piimashok bat t piimja täidisega 100g | Chocolate | — | — | 2.55 € | Coop + Selver |
| Kinder Piimashok country piima teravilja täidis 24g | Chocolate | — | — | 0.69 € | Selver |
| Kinder Shok bueno batoon 43g | Chocolate | — | — | 1.55 € | Coop + Selver |
| Kinder Šokolaadibatoon crispy 34.5g | Chocolate | 0.97 € | 1.39 € | — | Barbora |
| Kismet Vahvlibatoon dumle fazer 55g | Chocolate | — | 1.29 € | 1.29 € (0.89 € Partner) | Rimi + Selver |
| Kismet Vahvlibatoon fazer 55g | Chocolate | — | — | 1.29 € (0.89 € Partner) | Selver |
| Kitkat Piimashok nestle 99g | Chocolate | — | — | 2.59 € (1.89 € Partner) | Coop + Selver |
| Kitkat Piimashok nestle sarapuupähklitega 99g | Chocolate | — | 1.49 € | 2.59 € (1.89 € Partner) | Rimi |
| Kitkat Piimashok nestle soolakaramelliga 99g | Chocolate | — | 1.49 € | 2.59 € (1.89 € Partner) | Rimi |
| Kitkat Shok chunky batoon nestle 40g | Chocolate | — | — | 1.29 € (0.99 € Partner) | Coop + Selver |
| Kitkat Shok chunky peanut butter nestle batoon 42g | Chocolate | — | — | 1.29 € (0.99 € Partner) | Coop + Selver |
| Kitkat Shok nestle batoon 41.5g | Chocolate | — | — | 1.29 € (0.99 € Partner) | Coop + Selver |
| Knoppers Shok nutbar batoon 40g | Chocolate | — | — | 1.05 € | Coop + Selver |
| Lion Shok batoon nestle 2x60g | Chocolate | — | — | 0.99 € | Selver |
| Marabou mandliga piimashok soolase 170g | Chocolate | — | — | 4.69 € | Coop + Selver |
| Mars bat nougatikr piimashok 2x70g | Chocolate | — | — | 1.69 € (1.19 € Partner) | Selver |
| Mesikäpp Piimashok vahvliga kalev 100g | Chocolate | — | — | 2.69 € (1.99 € Partner) | Coop + Selver |
| Mesikäpp Piimashok vahvliga kalev 270g | Chocolate | — | 6.99 € | 6.87 € | Selver |
| Milka Piima ja valge shokolaadi segu bubbly 95g | Chocolate | — | — | 2.99 € | Coop + Selver |
| Milka piimashok 45g | Chocolate | — | — | 1.55 € | Coop |
| Milka Piimashok pähklitega 250g | Chocolate | — | 6.39 € | 6.60 € | Rimi |
| Milka Piimašokolaad bubbly 90g | Chocolate | 2.35 € (1.69 € Aitäh) | 2.35 € | — | Barbora + Rimi |
| Milka Piimašokolaad bubbly white 95g | Chocolate | 2.35 € (1.49 € Aitäh) | 2.35 € | — | Barbora + Rimi |
| Milka Piimašokolaad daim 90g | Chocolate | 2.65 € (1.49 € Aitäh) | — | 2.99 € | Barbora |
| Milka Piimašokolaad oreo 100g | Chocolate | — | 2.35 € | 2.99 € | Rimi |
| Milka Piimašokolaad oreo 300g | Chocolate | 6.39 € (4.49 € Aitäh) | 6.39 € | 4.99 € | Selver |
| Nicks kookose batoon shok 40g | Chocolate | — | — | 2.09 € (1.59 € Partner) | Coop + Selver |
| Nicks maapähkli batoon shok 40g | Chocolate | — | — | 2.09 € (1.59 € Partner) | Coop + Selver |
| Roshen Piimašokolaad lacmi 90g | Chocolate | 1.59 € | 1.99 € | — | Barbora |
| Schogetten Valge šokolaad 100g | Chocolate | 2.29 € (1.79 € Aitäh) | 2.29 € | — | Barbora + Rimi |
| Snickers Shok batoon 50g | Chocolate | — | — | 1.35 € | Coop |
| Snickers Shok batoon nougatikreemiga 5x250g | Chocolate | — | — | 5.09 € | Coop + Selver |
| Snickers Shok creamy peanut batoon 36.5g | Chocolate | — | — | 1.35 € | Coop |
| Snickers Shok super batoon 1 112.5g | Chocolate | — | — | 2.49 € (1.59 € Partner) | Coop |
| Tupla Shok maxi batoon 50g | Chocolate | — | 1.19 € | 1.29 € | Rimi |
| Twix Piimashok bat 50g | Chocolate | — | — | 1.29 € | Selver |
| Twix Piimashok xtra bat ja karamelli küpsisega 75g | Chocolate | — | — | 1.75 € | Selver |
| Twix Shok bat ga ja karam küpsis 5x250g | Chocolate | — | — | 5.09 € | Coop + Selver |
| Aroma gold Lahustuv kohv 200g | Coffee | 13.49 € (6.99 € Aitäh) | 13.49 € | — | Barbora + Rimi |
| Arvid nordquist Arvid kohviuba mellan 500g | Coffee | — | — | 15.24 € | Selver |
| Best beans Kohviuba espresso supreme 900g | Coffee | — | — | 18.99 € | Selver |
| Caffebo Kohvioad tõde 1000g | Coffee | — | 19.99 € | 18.28 € | Selver |
| Caffebo Kohviuba kratt 1000g | Coffee | — | 16.99 € | 15.24 € | Selver |
| Coffeestar Kohviuba creme brulee 200g | Coffee | — | — | 6.70 € | Selver |
| Jacobs Jahvatatud kohv krönung 250g | Coffee | 6.49 € | — | 6.29 € (4.99 € Partner) | Selver |
| Jacobs Jahvatatud kohv kronung 500g | Coffee | 10.79 € (6.99 € Aitäh) | 10.79 € | — | Barbora + Rimi |
| Jacobs Jahvatatud kohv kronung mild 500g | Coffee | 12.69 € (8.99 € Aitäh) | 12.69 € | — | Barbora + Rimi |
| Jacobs Jahvatatud kohv origins brazil colomba 450g | Coffee | — | — | 11.49 € | Coop + Selver |
| Jacobs Jahvatatud kohv origins uganda kenya 450g | Coffee | — | — | 11.49 € | Coop + Selver |
| Jacobs Jahvatatud kohv selection 500g | Coffee | 13.89 € (7.99 € Aitäh) | 13.89 € | 12.49 € | Coop + Selver |
| Jacobs Kofeiinivaba kohv krönung 250g | Coffee | — | — | 7.49 € | Selver |
| Jacobs Kohvioad barista crema 1000g | Coffee | 29.99 € (14.99 € Aitäh) | 13.99 € | 23.49 € | Rimi |
| Jacobs Kohvioad barista espresso 1000g | Coffee | 29.99 € (14.99 € Aitäh) | 13.99 € | — | Rimi |
| Jacobs Kohvioad espresso 1000g | Coffee | 29.49 € (13.99 € Aitäh) | 26.99 € | — | Rimi |
| Jacobs Kohviuba crema gold 1000g | Coffee | — | — | 12.99 € | Coop + Selver |
| Jacobs Kohviuba espresso 1 1000g | Coffee | — | — | 21.49 € (12.99 € Partner) | Coop |
| Jacobs Kohviuba krönung 1000g | Coffee | — | — | 21.49 € (12.99 € Partner) | Coop |
| Jacobs Kohviuba origins brazil colombia 1000g | Coffee | — | — | 23.49 € (13.99 € Partner) | Coop |
| Jacobs Kohviuba origins uganda kenya 1000g | Coffee | — | — | 23.49 € (13.99 € Partner) | Coop |
| Jacobs Lahustuv kohv crema 200g | Coffee | 11.79 € | 11.79 € | — | Barbora + Rimi |
| Jacobs Lahustuv kohv cronat gold 100g | Coffee | 6.49 € (3.99 € Aitäh) | 6.49 € | 6.49 € | Barbora + Rimi + Selver |
| Jacobs Lahustuv kohv cronat gold 200g | Coffee | 11.79 € (6.99 € Aitäh) | 11.79 € | 7.99 € | Selver |
| Jacobs Lahustuv kohv krönung 100g | Coffee | 8.19 € (4.69 € Aitäh) | — | 8.12 € | Selver |
| Jacobs Lahustuv kohv krönung 200g | Coffee | 13.79 € (7.99 € Aitäh) | 13.79 € | 13.99 € (8.99 € Partner) | Barbora + Rimi |
| Jacobs Lahustuv kohv velvet 200g | Coffee | 10.99 € (6.99 € Aitäh) | — | — | Barbora |
| Kohviuba oa no 1000g | Coffee | — | — | 17.99 € | Selver |
| Kulta katriina Presskannu kohv utz 450g | Coffee | — | — | 6.99 € | Selver |
| L'or Kohvikapslid capri 10x5.2g | Coffee | 4.59 € (3.59 € Aitäh) | 5.79 € | — | Barbora |
| L'or Kohvikapslid santorini 10x5.2g | Coffee | 4.79 € (3.69 € Aitäh) | 5.79 € | — | Barbora |
| Lavazza espresso barista perfetto 1000g | Coffee | — | — | 34.99 € | Coop |
| Lavazza espresso italiano classico 250g | Coffee | — | — | 9.99 € | Coop |
| Lavazza Jahvatatud kohv caffe decaffeinato 250g | Coffee | — | — | 10.99 € | Coop |
| Lavazza Jahvatatud kohv club 250g | Coffee | 10.99 € (5.99 € Aitäh) | 10.99 € | 10.99 € | Coop |
| Lavazza Jahvatatud kohv inblu 250g | Coffee | 10.99 € (6.29 € Aitäh) | — | 11.59 € (5.99 € Partner) | Barbora |
| Lavazza Jahvatatud kohv oro 250g | Coffee | 9.99 € (6.99 € Aitäh) | 9.99 € | — | Barbora + Rimi |
| Lavazza Jahvatatud kohv qualita oro 250g | Coffee | 10.99 € (5.99 € Aitäh) | — | 5.69 € | Selver |
| Lavazza Jahvatatud kohv qualita oro purgis 250g | Coffee | — | — | 10.99 € | Coop |
| Lavazza Jahvatatud kohv rossa 250g | Coffee | 8.69 € (5.99 € Aitäh) | 8.69 € | — | Barbora + Rimi |
| Lavazza Kohvikapsel a modo mio decaf cremo 16 16x7.5g | Coffee | — | — | 8.89 € (5.69 € Partner) | Coop |
| Lavazza Kohvikapsel a modo mio lungo dolce 16x8g | Coffee | — | — | 5.99 € | Selver |
| Lavazza Kohvikapsel a modo mio oro 16x7.5g | Coffee | — | — | 8.89 € | Coop |
| Lavazza Kohvikapsel a modo mio passionale 16x7.5g | Coffee | — | — | 5.99 € | Selver |
| Lavazza Kohvikapsel espresso lungo 10x5.6g | Coffee | — | — | 6.99 € | Coop |
| Lavazza Kohvikapsel qualita oro 10x5.5g | Coffee | — | — | 6.99 € (4.29 € Partner) | Coop |
| Lavazza Kohvioad crema e aroma 1000g | Coffee | 29.99 € (12.99 € Aitäh) | 29.99 € | 29.99 € (14.99 € Partner) | Coop |
| Lavazza Kohvioad qualita rossa 1000g | Coffee | 29.99 € (12.99 € Aitäh) | — | 29.99 € (14.99 € Partner) | Coop |
| Lavazza Kohvioad tales of italy napoli 450g | Coffee | — | 18.99 € | 17.99 € (10.99 € Partner) | Selver |
| Lavazza Kohvioad tales of italy roma 450g | Coffee | — | 18.99 € | 17.99 € (10.99 € Partner) | Selver |
| Lavazza Kohvipadjad crema e aroma 18 18x6.94g | Coffee | — | — | 7.39 € | Coop |
| Lavazza Kohviuba caffe crema classico 1000g | Coffee | — | — | 29.99 € | Coop |
| Lavazza Kohviuba qualita oro 1000g | Coffee | — | — | 34.99 € | Coop |
| Lavazza qualita oro dark roast 1000g | Coffee | — | 33.49 € | 34.99 € (18.99 € Partner) | Coop |
| Löfbergs Jahvatatud kohv inferno 450g | Coffee | 10.15 € | — | 10.15 € | Barbora + Selver |
| Löfbergs Kohvioad brazil 1000g | Coffee | 24.29 € | — | 24.29 € | Barbora + Selver |
| Löfbergs Kohvioad crema 1000g | Coffee | 23.89 € | — | 23.90 € | Barbora |
| Löfbergs Kohviuba espresso 1000g | Coffee | — | — | 24.29 € (12.99 € Partner) | Selver |
| Löfbergs Kohviuba kharisma 1000g | Coffee | — | — | 24.29 € (13.99 € Partner) | Selver |
| Löfbergs Kohviuba medium 1000g | Coffee | — | — | 24.29 € | Selver |
| Löfbergs Presskannukohv prezzo 500g | Coffee | — | — | 10.66 € | Selver |
| Löfbergs Tassikohv in cup keskmine röst 500g | Coffee | — | — | 10.66 € | Selver |
| Luxus Kannukohv bodum 500g | Coffee | — | — | 10.99 € | Coop + Selver |
| Merrild Kohvioad arabica 1000g | Coffee | 25.89 € (13.99 € Aitäh) | — | 26.99 € (12.99 € Partner) | Coop |
| Merrild Kohvioad barista cremoso 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 25.79 € | 27.99 € | Coop |
| Merrild Kohvioad barista espresso 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 26.99 € | 27.99 € | Coop |
| Merrild Kohvioad crema 1000g | Coffee | 25.89 € (13.99 € Aitäh) | 11.99 € | 26.99 € | Rimi |
| Merrild Kohvioad crema dolce 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 26.35 € | 26.99 € (11.99 € Partner) | Barbora |
| Merrild Kohvioad vienna roast 1000g | Coffee | 25.99 € (13.99 € Aitäh) | 24.99 € | — | Rimi |
| Merrild Tassikohv in cup 400g | Coffee | — | — | 11.59 € | Coop |
| Mövenpick Jahvatatud kohv der himmlische 500g | Coffee | 13.29 € | — | 9.99 € | Selver |
| Nescafe dolce gusto Kohvikapsel au lait 16 16x10g | Coffee | — | — | 6.99 € | Coop |
| Nescafe dolce gusto Nescafe grande 16 16x8.5g | Coffee | — | — | 8.49 € | Coop |
| Nescafe dolce gusto Nescafe intenso gr 16 16x8.3g | Coffee | — | — | 6.99 € | Coop + Selver |
| Nescafe Kohvikapsel gusto cappuccino d 16 16x11.65g | Coffee | — | — | 8.49 € | Coop + Selver |
| Nescafe Kohvikapsel latte macchiato dg 16 16x11.45g | Coffee | — | — | 8.49 € | Coop + Selver |
| Nescafe Lahustuv kohv classic 100g | Coffee | — | — | 6.99 € | Coop |
| Nescafe Lahustuv kohv classic crema 100g | Coffee | 7.49 € (4.99 € Aitäh) | — | 7.49 € | Barbora + Selver |
| Nescafe Lahustuv kohv classic strong 250g | Coffee | — | — | 12.19 € | Selver |
| Nescafe Lahustuv kohv gold 100g | Coffee | 10.19 € (6.49 € Aitäh) | — | — | Coop |
| Nescafe Lahustuv kohv gold 200g | Coffee | 16.99 € (8.99 € Aitäh) | 16.99 € | 16.99 € | Barbora + Rimi + Selver |
| Paulig Jahvatatud kohv classic aromatico 500g | Coffee | — | — | 10.19 € (5.99 € Partner) | Coop |
| Paulig Jahvatatud kohv classic cremoso 500g | Coffee | — | 6.49 € | 10.19 € | Rimi |
| Paulig Jahvatatud kohv mokka 475g | Coffee | — | 6.99 € | 9.59 € (5.69 € Partner) | Rimi |
| Paulig Kannukohv classic 500g | Coffee | — | — | 10.19 € | Coop |
| Paulig Kohvioad arabica 1000g | Coffee | 24.39 € | 12.49 € | 23.90 € | Rimi |
| Paulig Kohvioad classic 1000g | Coffee | 24.89 € (12.99 € Aitäh) | 23.69 € | 24.49 € | Coop |
| Paulig Kohvioad classic crema 1000g | Coffee | 24.89 € (12.99 € Aitäh) | 23.69 € | 24.49 € | Coop |
| Paulig Kohviuba arabica espresso 1000g | Coffee | — | — | 23.90 € | Coop |
| Paulig Kohviuba arabica selected 1000g | Coffee | — | 12.49 € | 23.90 € | Rimi |
| Paulig Kohviuba classic aromatico 1000g | Coffee | 24.39 € | 23.69 € | 24.49 € (12.99 € Partner) | Coop |
| Paulig Kohviuba mokka 1000g | Coffee | — | — | 21.99 € (12.49 € Partner) | Coop |
| Segafredo Jahvatatud kohv dolce 450g | Coffee | 9.19 € | — | 9.19 € | Barbora + Selver |
| Segafredo Jahvatatud kohv pausa 450g | Coffee | — | — | 9.19 € | Selver |
| Segafredo Kohvioad crema perfetto 900g | Coffee | 27.39 € | — | 27.39 € | Barbora + Selver |
| Senseo kohvipadjad strong 36x6.9g | Coffee | — | — | 9.99 € | Selver |
| Seve Lahustuv viljakohv siguriga 100g | Coffee | 1.49 € | — | 1.19 € | Selver |
| Starbucks Kohvioad blonde espresso 450g | Coffee | 14.99 € (10.99 € Aitäh) | 14.99 € | 17.99 € | Barbora + Rimi |
| Starbucks Kohvioad pike place 450g | Coffee | 14.99 € (10.99 € Aitäh) | 14.99 € | — | Barbora + Rimi |
| Tasuja Kohviuba jaanus 1000g | Coffee | 23.29 € | — | 24.90 € (18.99 € Partner) | Barbora |
| Tasuja Kohviuba tambet 1000g | Coffee | 23.29 € (21.09 € Aitäh) | — | 24.90 € | Barbora |
| Borges Ekstra väärisoliiviõli 750ml | Cooking oil | — | 14.69 € | 14.99 € (8.99 € Partner) | Rimi |
| Borges Ekstra väärisoliiviõli mahe 500ml | Cooking oil | — | — | 11.69 € | Coop + Selver |
| Borges Ekstra väärisoliiviõli original 1000ml | Cooking oil | — | — | 16.99 € | Coop + Selver |
| Borges Ekstra väärisoliiviõli original 250ml | Cooking oil | — | 5.59 € | 5.49 € | Coop |
| Borges Ekstra väärisoliiviõli original 500ml | Cooking oil | — | — | 10.49 € | Coop + Selver |
| Borges Oliiviõli extra light raf väärisol 250ml | Cooking oil | — | — | 3.99 € | Selver |
| Borges Oliiviõli extra light raf väärisol õli 1000ml | Cooking oil | — | — | 16.99 € | Coop |
| Borges Oliiviõli light extra raf väärisol 500ml | Cooking oil | — | — | 9.99 € | Coop + Selver |
| Borges Viinamarjaseemneõli 500ml | Cooking oil | 4.57 € | — | 6.09 € | Barbora |
| Gloria Linaseemneõli 500ml | Cooking oil | 4.99 € | — | — | Coop |
| Goccia d'oro Oliivijääkõli 1000ml | Cooking oil | 7.99 € | — | 9.89 € | Barbora |
| Gourmante Ekstra kalamata väärisoliiviõli 500ml | Cooking oil | — | — | 11.19 € | Coop + Selver |
| Gourmante Ekstra väärisoliiviõli 500ml | Cooking oil | — | 10.99 € | 10.59 € | Coop + Selver |
| Kalew Extra väärisoliiviõli 1000ml | Cooking oil | 15.99 € | — | 14.99 € (10.99 € Partner) | Coop + Selver |
| Kalew Extra väärisoliiviõli 500ml | Cooking oil | 8.15 € (5.49 € Aitäh) | — | 8.19 € | Barbora |
| Kalew Küpsetusõli 1000ml | Cooking oil | 2.49 € | 3.19 € | 3.24 € | Barbora + Coop |
| Kalew Oliiviõli extra light 500ml | Cooking oil | 8.35 € | 8.59 € | 8.32 € (6.49 € Partner) | Coop |
| Kalew Päevalilleõli 1000ml | Cooking oil | — | 3.99 € | — | Coop |
| Kalew Rapsiõli 1000ml | Cooking oil | 3.19 € (1.99 € Aitäh) | 3.19 € | 3.19 € | Barbora + Coop + Rimi + Selver |
| Loodusvägi Kookosõli extra virgin mahe 500ml | Cooking oil | — | — | 11.49 € | Selver |
| Natura Päevalilleõli 1000ml | Cooking oil | 5.59 € | 5.59 € | — | Barbora + Rimi |
| Naturalisimo Päevalilleõli 1000ml | Cooking oil | 5.69 € | 6.19 € | 4.18 € (2.99 € Partner) | Selver |
| Naturalisimo Rafineeritud kookosõli 500ml | Cooking oil | 3.99 € | 4.69 € | — | Barbora |
| Oilio Fritüürõli 1000ml | Cooking oil | 4.45 € | — | — | Barbora |
| Oilio Rapsiõli 1000ml | Cooking oil | 3.05 € | — | — | Coop |
| Oilio Toiduõli 1000ml | Cooking oil | 3.69 € | — | 2.99 € | Coop |
| Oleina Rapsiõli 1000ml | Cooking oil | 3.79 € | — | 3.85 € | Barbora |
| Olivia Küpsetusõli 1000ml | Cooking oil | 3.65 € | 3.69 € | 3.65 € (2.49 € Partner) | Coop |
| Olivia Päevalilleõli 1000ml | Cooking oil | 3.49 € (2.49 € Aitäh) | 2.49 € | 3.49 € | Rimi |
| Olivia Rapsiõli 1000ml | Cooking oil | 3.59 € (2.49 € Aitäh) | 3.65 € | 3.59 € (2.39 € Partner) | Coop |
| Olivia Rapsiõli 500ml | Cooking oil | 1.95 € | 1.69 € | 1.79 € | Rimi |
| Rapsiõli ovilo 1000ml | Cooking oil | 2.99 € | — | — | Coop |
| Soilmates Avokaadoõli 500ml | Cooking oil | — | 11.59 € | 11.59 € | Rimi + Selver |
| Thai choice Orgaaniline külmpress kookosõli 200ml | Cooking oil | — | — | 4.99 € | Selver |
| Alma Hapukoor 20% 250g | Cream & sour cream | 0.95 € | 1.19 € | — | Barbora |
| Alma Hapukoor 20% 500g | Cream & sour cream | 1.45 € | 1.49 € | — | Barbora |
| Alma Hapukoor kilepakk 20% 500g | Cream & sour cream | — | — | 1.15 € | Selver |
| Alma Kohvikoor 10% 200ml | Cream & sour cream | — | 0.65 € | 0.39 € | Selver |
| Alma Kohvikoor 10% 380ml | Cream & sour cream | 1.25 € | 0.99 € | 1.15 € | Coop + Rimi |
| Alma Toidukoor 20% 400ml | Cream & sour cream | 1.59 € | 1.99 € | 1.49 € | Selver |
| Alma Vahukoor 35% 400ml | Cream & sour cream | — | 2.49 € | 2.39 € | Selver |
| Farmi Hapukoor 20% 200g | Cream & sour cream | — | 1.15 € | — | Coop |
| Farmi Hapukoor kilepakk 10% 500g | Cream & sour cream | — | — | 1.62 € | Coop |
| Farmi Hapukoor kilepakk 20% 500g | Cream & sour cream | — | — | 1.69 € | Coop |
| Farmi Köögikoor laktoosivaba 15% 400ml | Cream & sour cream | — | — | 1.89 € | Coop |
| Saare hapukoor smetana 30% 150g | Cream & sour cream | — | — | 1.41 € | Selver |
| Tere Hapukoor 20% 250g | Cream & sour cream | 1.09 € | — | 1.72 € | Barbora |
| Tere Hapukoor laktoosivaba 20% 300g | Cream & sour cream | — | — | 1.49 € | Coop + Selver |
| Tere Kohvikoor 10% 200ml | Cream & sour cream | 0.65 € | 0.65 € | — | Barbora + Rimi |
| Tere Kohvikoor 10% 380ml | Cream & sour cream | 0.95 € | — | 0.99 € | Barbora |
| Tere Vahukoor laktoosivaba 35% 200ml | Cream & sour cream | — | 1.49 € | 1.39 € | Coop + Selver |
| Tere Vahukoor laktoosivaba 35% 400ml | Cream & sour cream | 2.39 € | — | 2.79 € | Barbora + Coop |
| Zott Kohvikoor 10% 10x10g | Cream & sour cream | — | — | 0.90 € (0.69 € Partner) | Coop |
| Danvita Näkileib juustu küüslauguga 130g | Crispbreads | — | — | 1.68 € (1.39 € Partner) | Coop |
| Danvita Näkileib mooni seesami linaseemne seemnetega 1 130g | Crispbreads | — | — | 1.37 € (1.15 € Partner) | Coop |
| Dr.nature Tatragalett 110g | Crispbreads | — | 1.69 € | 1.72 € | Rimi |
| Fazer Maisigalett dumle puruga 66g | Crispbreads | — | — | 2.75 € | Coop |
| Fazer Must näkileib küüslaugu ja peterselliga 150g | Crispbreads | — | — | 2.09 € | Selver |
| Fazer Must näkileib päevalilleseemnetega 150g | Crispbreads | — | 2.19 € | 2.09 € | Selver |
| Finn crisp Näkileib original taste 200g | Crispbreads | — | — | 2.69 € | Coop |
| Kupiec Riisivahvlid naturaalsed 90g | Crispbreads | — | — | 1.72 € | Selver |
| Kupiec Riisivahvlid piimashokolaadiga 60g | Crispbreads | — | — | 2.43 € | Coop |
| Kupiec Riisivahvlid tumeda shokolaadiga 60g | Crispbreads | — | — | 2.43 € | Coop |
| Sonko vilja galetid metsiku riisiga 130g | Crispbreads | — | — | 1.47 € | Selver |
| Wasa Näkileivad original 275g | Crispbreads | 2.85 € | 2.15 € | 1.95 € | Selver |
| Alma Kodujuust 0.1% 200g | Curd & cottage cheese | — | — | 1.34 € (1.09 € Partner) | Selver |
| Alma Kodujuust 5% 200g | Curd & cottage cheese | 1.35 € | 0.99 € | 1.34 € | Rimi |
| Alma Kodujuust 5% 380g | Curd & cottage cheese | 2.19 € | 2.19 € | 2.25 € | Barbora + Coop + Rimi |
| Alma Kodujuust 5% 500g | Curd & cottage cheese | 2.29 € | 2.39 € | — | Barbora |
| Alma Kodujuust hapukoorega 380g | Curd & cottage cheese | 2.19 € | — | — | Barbora + Coop |
| Alma Kodujuust hapukoorega 500g | Curd & cottage cheese | — | 2.39 € | — | Rimi |
| Alma Kodujuust lakt shokolaaditükkidega vaba laktoosivaba 200g | Curd & cottage cheese | — | — | 2.02 € (1.59 € Partner) | Coop |
| Alma Kodujuust laktoosivaba 200g | Curd & cottage cheese | — | 1.19 € | 1.58 € | Rimi |
| Alma Kodujuust murakamoosiga 200g | Curd & cottage cheese | 1.99 € | 1.49 € | 2.02 € (1.59 € Partner) | Rimi |
| Alma Kodujuust soolakurgi tilli 200g | Curd & cottage cheese | — | — | 1.72 € (1.29 € Partner) | Coop |
| Alma Kodujuust soolakurgi tilliga 200g | Curd & cottage cheese | 1.39 € | 1.25 € | — | Rimi |
| Alma Kohupiim 4% 200g | Curd & cottage cheese | 0.85 € | — | 0.99 € | Barbora |
| Alma Kohupiim lahja 200g | Curd & cottage cheese | 0.85 € | 1.15 € | 0.99 € | Barbora |
| Alma Kohupiim metsmaasika 200g | Curd & cottage cheese | — | 1.15 € | 1.25 € | Rimi |
| Alma Kohupiim vanilli 200g | Curd & cottage cheese | 0.99 € | 1.15 € | — | Barbora |
| Farmi Kodujuust hapukoorega 330g | Curd & cottage cheese | 2.09 € | — | 2.15 € | Coop |
| Farmi Kohupiim 5% 200g | Curd & cottage cheese | 0.79 € | 0.89 € | — | Barbora |
| Farmi Kohupiim lahja rosinatega 200g | Curd & cottage cheese | 0.79 € | 0.89 € | 0.99 € | Barbora |
| Farmi Kohupiim lahja vanilliiniga 200g | Curd & cottage cheese | — | 0.89 € | 0.99 € | Rimi |
| Liisu Kohupiim 9% 250g | Curd & cottage cheese | 2.09 € | 2.09 € | 2.07 € | Coop |
| Mo saaremaa Pehme kohupiim 5% 500g | Curd & cottage cheese | 2.49 € | 2.55 € | 2.19 € | Selver |
| Mo saaremaa Pehme kohupiim rasvatu lakt vaba 500g | Curd & cottage cheese | — | — | 2.63 € (2.09 € Partner) | Coop |
| Piimameister otto Kodujuust hapukoorega 330g | Curd & cottage cheese | 1.85 € (1.45 € Aitäh) | — | 1.88 € (1.39 € Partner) | Barbora + Coop |
| Piimameister otto Kodujuust klassikaline 330g | Curd & cottage cheese | 1.85 € (1.45 € Aitäh) | 1.85 € | 1.88 € | Barbora + Coop + Rimi |
| Piimameister otto Kodujuust klassikaline 440g | Curd & cottage cheese | 2.39 € | — | 2.55 € | Barbora |
| Piimameister otto Kodujuust laktoosivaba 220g | Curd & cottage cheese | — | 1.35 € | — | Coop + Rimi |
| Piimameister otto Kohupiim ricotta 200g | Curd & cottage cheese | 0.73 € | 0.69 € | 0.73 € (0.59 € Partner) | Coop + Rimi |
| Tere Kodujuust karulaugupestoga 200g | Curd & cottage cheese | 1.35 € | 1.69 € | 1.39 € | Barbora |
| Tere Kodujuust klassikaline 300g | Curd & cottage cheese | — | 1.99 € | 2.12 € | Coop |
| Tere Kodujuust klassikaline 380g | Curd & cottage cheese | 2.05 € | 2.05 € | — | Barbora + Rimi |
| Tere Kodujuust riisikatega 200g | Curd & cottage cheese | 1.35 € | — | 1.99 € | Barbora |
| Tere Kohupiim 5% 200g | Curd & cottage cheese | 1.15 € | 1.09 € | 1.17 € (0.89 € Partner) | Coop + Rimi |
| Tere Kohupiim rosinatega 200g | Curd & cottage cheese | 1.15 € | — | 1.17 € (0.89 € Partner) | Barbora |
| Tere Vanillikohupiim vanilliga 200g | Curd & cottage cheese | — | — | 1.17 € (0.89 € Partner) | Coop |
| Aasa Kohuke šokolaadi tükkidega 40g | Curd snacks & desserts | 0.69 € (0.55 € Aitäh) | 0.70 € | — | Barbora |
| Aasa Riisipuder kirssidega 6% 200g | Curd snacks & desserts | 1.29 € | 1.49 € | — | Barbora |
| Alma Kohuke kakao kakaoglasuuris 40g | Curd snacks & desserts | — | 0.49 € | — | Coop |
| Alma Kohuke koorekommi karamelliglasuuris 40g | Curd snacks & desserts | — | 0.49 € | 0.50 € | Rimi |
| Alma Kohuke mangotäidisega kakaoglasuuris 40g | Curd snacks & desserts | — | — | 0.50 € | Coop |
| Alma Kohuke metsmaasika kakaoglasuuris 40g | Curd snacks & desserts | — | — | 0.50 € | Coop |
| Alma Kohuke vaarikatäidisega kakaoglasuuris 40g | Curd snacks & desserts | — | — | 0.50 € | Coop |
| Alma Kohuke vanilli kakaoglasuuris 40g | Curd snacks & desserts | — | 0.49 € | 0.50 € | Coop |
| Alma Kohuke vanilli kakaoglasuuris 7x40g | Curd snacks & desserts | — | 2.19 € | 2.59 € | Rimi |
| Alma Kohupiimahõrgutis ahjuõuna 150g | Curd snacks & desserts | 1.05 € | — | 1.04 € | Selver |
| Alma Kohupiimahõrgutis maasika mustika 150g | Curd snacks & desserts | — | — | 1.07 € | Selver |
| Alma Kohupiimakreem creme brulee 150g | Curd snacks & desserts | 0.85 € | 1.09 € | — | Barbora |
| Alma Kohupiimakreem mangokisselliga 140g | Curd snacks & desserts | 0.69 € | 0.79 € | — | Barbora |
| Alma Kohupiimakreem metsmaasika 150g | Curd snacks & desserts | 0.85 € | — | — | Barbora |
| Alma Kohupiimakreem metsmaasika 300g | Curd snacks & desserts | — | 1.49 € | — | Coop + Rimi |
| Alma Kohupiimakreem vanilli 150g | Curd snacks & desserts | 0.85 € | 1.09 € | — | Barbora |
| Alma Puding karamelli 230g | Curd snacks & desserts | 1.22 € | 1.25 € | 1.27 € | Coop |
| Alma Puding kohvi 230g | Curd snacks & desserts | 1.25 € | 1.25 € | 1.27 € | Barbora + Rimi |
| Alma Puding šokolaadi metsapähkli 230g | Curd snacks & desserts | 1.25 € | 1.25 € | 1.27 € | Coop |
| Alma Puding vaarika mascarpone 230g | Curd snacks & desserts | — | — | 1.27 € | Coop |
| Alma Puding vanilli 230g | Curd snacks & desserts | 1.25 € | — | — | Coop |
| Emma Kohupiimakreem mustikakisselliga 150g | Curd snacks & desserts | — | 0.99 € | — | Coop |
| Emma Kohupiimakreem vaarikakisselliga 150g | Curd snacks & desserts | — | 0.99 € | — | Coop |
| Fantasia Jogurt kirsilisandiga 118g | Curd snacks & desserts | 0.99 € | 0.99 € | — | Barbora + Rimi |
| Farmi Puding koorene šokolaadi 230g | Curd snacks & desserts | 0.89 € | — | 1.09 € | Barbora |
| Farmi Puding koorene vanilje 230g | Curd snacks & desserts | 0.89 € | 1.15 € | 1.09 € | Barbora |
| Farmi Skyr mustikadessert shokolaadiglasuuris 40g | Curd snacks & desserts | — | — | 0.66 € | Coop |
| Farmi Skyr vanillidessert shokolaadiglasuuris 40g | Curd snacks & desserts | — | — | 0.66 € | Coop |
| Fit Proteiinibatoon maasika magusainetega 46g | Curd snacks & desserts | — | 0.76 € | 0.76 € | Rimi + Selver |
| Hellus Keefirimaius metsamarja 200g | Curd snacks & desserts | 1.35 € | — | 1.39 € | Barbora |
| Jänks Tarretis kiivi 150g | Curd snacks & desserts | 0.49 € (0.49 € Aitäh) | 0.62 € | — | Barbora |
| Jänks Tarretis kirsi 150g | Curd snacks & desserts | 0.49 € (0.49 € Aitäh) | 0.49 € | 0.62 € | Barbora + Rimi |
| Jänks Tarretis vaarika 150g | Curd snacks & desserts | 0.49 € (0.49 € Aitäh) | 0.49 € | 0.62 € | Barbora + Rimi |
| Jänks Tutti frutti tarretis 150g | Curd snacks & desserts | — | — | 0.62 € | Coop |
| Karums Glasuurkohuke kookose 45g | Curd snacks & desserts | 0.56 € | — | 0.56 € (0.45 € Partner) | Barbora + Selver |
| Karums Koorekreem vaarika 150g | Curd snacks & desserts | — | 1.19 € | 1.17 € | Selver |
| Karums Shokolaadikohuke 45g | Curd snacks & desserts | — | — | 0.56 € (0.45 € Partner) | Coop |
| Karums Vanillikohuke 45g | Curd snacks & desserts | — | — | 0.56 € (0.45 € Partner) | Coop |
| Karums Vanillikohuke multipakk 1 7x45g | Curd snacks & desserts | — | — | 3.75 € | Coop |
| Magija Kohuke barbarissi 40g | Curd snacks & desserts | 0.55 € | 0.55 € | — | Barbora + Rimi |
| Magija Kohuke küpsise 40g | Curd snacks & desserts | 0.55 € | 0.55 € | — | Barbora + Rimi |
| Nopri Panna cotta vaarika 150g | Curd snacks & desserts | 1.46 € | — | 1.95 € (1.49 € Partner) | Barbora |
| Saare Kohuke laktoosivaba vanilli 40g | Curd snacks & desserts | — | 0.57 € | 0.59 € | Rimi |
| Saare Koorene kohuke toffee 40g | Curd snacks & desserts | — | — | 0.57 € | Coop |
| Tere Fit proteiinipuding kakao 150g | Curd snacks & desserts | — | — | 1.37 € (1.09 € Partner) | Coop |
| Tere Fit proteiinipuding karamelli 150g | Curd snacks & desserts | — | — | 1.37 € (1.09 € Partner) | Coop |
| Tere Fit proteiinipuding vanilli 150g | Curd snacks & desserts | — | — | 1.37 € (1.09 € Partner) | Coop |
| Tere Kakaopuding laktoosivaba 200g | Curd snacks & desserts | — | — | 1.24 € | Coop |
| Tere Kohuke jõhvika multipakk 5x40g | Curd snacks & desserts | 2.59 € | — | 2.29 € | Selver |
| Tere Kohuke kondenspiima ja karamelliglasuuriga 40g | Curd snacks & desserts | — | — | 0.55 € (0.45 € Partner) | Coop |
| Tere Kohuke kondenspiima multipakk 5x40g | Curd snacks & desserts | 2.59 € | — | — | Coop |
| Tere Kohuke mustika shokolaadiglasuuriga 40g | Curd snacks & desserts | — | — | 0.55 € (0.45 € Partner) | Coop |
| Tere Kohuke vanilli multipakk 7x40g | Curd snacks & desserts | 2.79 € | — | 3.49 € | Barbora |
| Tere Kohuke vanilli shokolaadiglasuuriga 40g | Curd snacks & desserts | — | — | 0.52 € (0.45 € Partner) | Coop |
| Tere Suvepuding mango 200g | Curd snacks & desserts | 1.25 € | 1.19 € | 1.24 € | Rimi |
| Valio profeel Proteiinipuding piimashok 150g | Curd snacks & desserts | — | — | 1.27 € | Coop |
| Valio profeel Proteiinipuding valge pähk shok 150g | Curd snacks & desserts | — | — | 1.27 € | Coop |
| Zott liegeois dessert sh vahuk 175g | Curd snacks & desserts | — | — | 0.90 € (0.69 € Partner) | Coop |
| Activia kirsi jogurt 4x120g | Dairy | — | — | 3.19 € | Coop + Selver |
| Activia maasika jogurt 4x120g | Dairy | — | — | 3.19 € | Coop + Selver |
| Alma Jogurt mandlitükkide ja shokolaadiga 150g | Dairy | — | — | 1.21 € | Selver |
| Alma Jogurt mango 1000g | Dairy | — | 1.99 € | — | Rimi |
| Alma Jogurt shokolaadirõngastega 150g | Dairy | — | — | 1.21 € | Selver |
| Alma Koorejogurt muah barbarissi 180g | Dairy | 1.35 € | — | — | Coop |
| Alma Koorejogurt muah creme brulee 380g | Dairy | 1.39 € | — | 1.68 € | Barbora |
| Alma Koorejogurt muah marja plombiiri 180g | Dairy | 1.29 € | — | 1.31 € | Barbora + Coop |
| Alma Koorejogurt muah sidruni juustukoogi 380g | Dairy | — | — | 1.68 € | Coop |
| Alma Koorejogurt muah stracciatella 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Koorejogurt muah troopiline 180g | Dairy | 1.29 € | — | 1.31 € | Barbora + Coop |
| Alma Koorejogurt muah vanilli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Kreeka jogurt maitsestamata 180g | Dairy | 0.94 € | — | 0.94 € | Barbora + Selver |
| Alma Kreeka jogurt maitsestamata 370g | Dairy | 1.65 € | — | 1.65 € (1.39 € Partner) | Barbora + Selver |
| Alma Metsmaasikajogurt pure 2% 1000g | Dairy | — | — | 1.85 € | Selver |
| Alma Muah koorejogurt rukkileiva-kaneeli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Piim 0.05% 1000ml | Dairy | 1.25 € | — | 1.25 € | Barbora + Selver |
| Alma Piim 2,5% 1L | Dairy | — | 1.29 € | 1.25 € | Coop |
| Alma Piim 2.5% 1500ml | Dairy | 1.39 € | 1.39 € | 1.29 € | Selver |
| Alma Piim 2.5% 500ml | Dairy | 0.80 € | 0.82 € | 0.80 € | Coop |
| Alma Proteiinijogurt kreeka maitsestamata 370g | Dairy | 1.75 € (1.39 € Aitäh) | 1.89 € | — | Barbora |
| Alma Täispiim 3.6-4.2% 2000ml | Dairy | — | 1.99 € | 1.99 € | Rimi + Selver |
| Alma Või 82% 200g | Dairy | 2.49 € | 2.49 € | 2.39 € (1.49 € Partner) | Coop |
| Alma Või laktoosivaba 82% 200g | Dairy | — | 2.49 € | — | Coop |
| Danonino Tuubijogurt vanilje 70g | Dairy | — | — | 1.09 € | Coop |
| Dava Õrrekanade munad L 10tk | Dairy | 2.99 € | 2.99 € | 3.25 € | Barbora + Rimi |
| Dava Õrrekanade munad M 10tk | Dairy | 2.79 € | 2.89 € | 2.79 € | Barbora + Selver |
| Eggo Peremunad M 10tk | Dairy | — | — | 2.39 € | Coop + Selver |
| Eggo Peremunad M 18tk | Dairy | — | — | 4.29 € | Coop |
| Eggo Suured munad L 10tk | Dairy | — | — | 2.89 € | Coop |
| Estover Taluvõi eesti 82% 150g | Dairy | 2.19 € | — | 2.39 € | Barbora + Coop |
| Fantasia Kreemjogurt shokolaadipallidega 100g | Dairy | — | — | 1.19 € | Coop |
| Farmi Jogurt maasika banaani laktoosivaba 1000g | Dairy | — | 1.99 € | — | Rimi |
| Farmi Koorene jogurt kiivi tikri 400g | Dairy | 1.79 € | 1.79 € | 1.82 € | Barbora + Rimi |
| Farmi Koorene jogurt kirssidega 400g | Dairy | — | — | 1.49 € | Coop + Selver |
| Farmi Koorene jogurt maasikatega 400g | Dairy | — | 1.19 € | 1.79 € (1.19 € Partner) | Rimi |
| Farmi Koorene jogurt maitsestamata 5% 1000g | Dairy | 1.89 € | — | 1.99 € | Barbora |
| Farmi Koorene jogurt must kirss 400g | Dairy | 1.79 € | 1.19 € | — | Rimi |
| Farmi Koorene jogurt mustikatega 400g | Dairy | 1.79 € | 1.79 € | 1.49 € | Coop + Selver |
| Farmi Koorene jogurt virsikutega 400g | Dairy | 1.79 € | — | 1.79 € (1.19 € Partner) | Coop |
| Farmi Koorene mustasõstra jogurt 200g | Dairy | 1.19 € | — | 1.19 € | Barbora + Selver |
| Farmi Koorene ploomi martsipani jogurt 200g | Dairy | 1.19 € | — | 1.19 € | Barbora + Selver |
| Farmi Kreeka jogurt 10% 370g | Dairy | 1.49 € | — | 1.79 € | Barbora |
| Farmi Leiva pähkli jogurt tops laktoosivaba 400g | Dairy | — | — | 1.49 € | Coop + Selver |
| Farmi Maasika arbuusijog lakt puuv suhkru vaba suhkrutega laktoosivaba 130g | Dairy | — | — | 0.97 € | Selver |
| Farmi Mangojogurt suhkrutega lakt puuv vaba laktoosivaba 130g | Dairy | — | — | 0.97 € | Selver |
| Farmi Piim kiles 2.5% 1000ml | Dairy | 0.89 € | — | 0.62 € | Coop + Selver |
| Farmi Piim pure 2.5% 1500ml | Dairy | — | 1.59 € | 1.49 € | Coop |
| Farmi Skyr apelsini stracciatella 150g | Dairy | — | — | 1.31 € (0.99 € Partner) | Coop |
| Farmi Skyr kirssidega 150g | Dairy | — | — | 1.31 € (0.99 € Partner) | Coop |
| Farmi Skyr maasika 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Farmi Skyr metsmaasikatega 150g | Dairy | 0.85 € | — | 1.31 € (0.99 € Partner) | Barbora |
| Farmi Skyr mustikatega 150g | Dairy | — | — | 1.31 € (0.99 € Partner) | Coop |
| Farmi Skyr virsiku 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Farmi Täispiim 3,6-4,2% 1L | Dairy | — | 1.65 € | 1.65 € | Coop |
| Farmi täispiim pure 3.6-4.2% 2000ml | Dairy | — | — | 2.59 € | Coop |
| Hellus Jogurt maitsestamata 1000g | Dairy | 2.05 € | — | 2.09 € | Barbora |
| Hellus Keefirijogurt kirsi ploomi tere me 380g | Dairy | — | — | 1.65 € | Coop |
| Hellus Keefirijogurt maasika mustika tere me 380g | Dairy | — | — | 1.65 € | Coop |
| Hellus Keefirijogurt mango orange tere me 380g | Dairy | — | — | 1.65 € | Coop |
| Hellus Keefirijogurt sidruni vanilli tere me 380g | Dairy | — | — | 1.65 € | Coop |
| Mlekovita piim lakt uht vaba 3.2% laktoosivaba 500ml | Dairy | — | — | 1.45 € | Coop |
| Mo saaremaa Mahetäispiim mahe 3.8-4.4% 1000ml | Dairy | 1.69 € | — | 1.45 € | Selver |
| Mo saaremaa Mo või küüslaugu soolakristallidega 150g | Dairy | — | — | 2.19 € | Coop |
| Mo saaremaa Saaremaa või soolakristallidega 200g | Dairy | — | 2.69 € | 2.49 € | Coop |
| Mo saaremaa Või 82% 200g | Dairy | 2.49 € (1.75 € Aitäh) | 2.49 € | 2.49 € | Coop |
| Mo saaremaa Või küüsl soolakrist 150g | Dairy | 2.19 € (1.75 € Aitäh) | 2.19 € | — | Barbora + Rimi |
| Mo saaremaa Või laktoosivaba 200g | Dairy | — | 2.49 € | 1.99 € | Selver |
| Saare Jogurt maitsestamata 5% 400g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Saare Jogurtikreem ahjuõuna 400g | Dairy | 1.25 € | — | — | Barbora |
| Saare Jogurtikreem mango 400g | Dairy | 1.25 € | — | 1.82 € (1.39 € Partner) | Barbora |
| Saare Jogurtikreem sidruni laktoosivaba 400g | Dairy | — | 1.79 € | 1.82 € (1.39 € Partner) | Coop + Rimi |
| Saare Jogurtikreem vaarika passioni 400g | Dairy | 1.25 € | 1.79 € | 1.82 € (1.39 € Partner) | Barbora |
| Saare Kreeka jogurt 10% 380g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Saaremaa või koduaia ürtidega 150g | Dairy | — | 2.19 € | 2.19 € | Coop |
| Tere Ab jogurt maasika laktoosivaba 150g | Dairy | — | — | 0.82 € | Coop |
| Tere Cappuccino piim 3.5% 1000ml | Dairy | — | — | 2.29 € | Coop |
| Tere Emma banaanijogurt laktoosivaba 110g | Dairy | — | — | 0.93 € (0.75 € Partner) | Coop |
| Tere Emma maasikajogurt laktoosivaba 110g | Dairy | — | — | 0.93 € (0.75 € Partner) | Coop |
| Tere Emma mustikajogurt laktoosivaba 110g | Dairy | — | — | 0.93 € (0.75 € Partner) | Coop |
| Tere Kreeka jogurt maitsestamata laktoosivaba 350g | Dairy | — | — | 1.68 € | Coop |
| Tere Latte piim kõrgkuumutatud 2.5% 1000ml | Dairy | — | — | 2.02 € | Coop |
| Tere Piim d vitamiiniga laktoosivaba pure 2.5% 1000ml | Dairy | — | — | 1.39 € | Coop + Selver |
| Tere Piim pure 1.8% 1000ml | Dairy | — | 1.29 € | 1.09 € | Selver |
| Tere Või 82% 200g | Dairy | 2.59 € | 2.19 € | 2.59 € | Coop |
| Tere Või laktoosivaba 82% 200g | Dairy | — | 2.79 € | 3.29 € | Coop |
| Väike tom Kõrgk lisand piimjook shok vitamiin vitamiinidega 200ml | Dairy | — | — | 0.85 € | Coop + Selver |
| Valio gefilus jogurt laktoosivaba ta 2.5% 380g | Dairy | — | — | 1.56 € (1.19 € Partner) | Coop |
| Valio gefilus Mustikajogurt laktoosivaba 2% 380g | Dairy | — | — | 1.56 € (1.29 € Partner) | Coop |
| Valio gefilus Virsiku jogurt papaia lakt vaba 2% laktoosivaba 380g | Dairy | — | — | 1.56 € (1.29 € Partner) | Coop |
| Valio Või soolata 82% 500g | Dairy | 4.99 € | 5.89 € | 5.79 € | Barbora |
| Huggies All Over Clear Niisked salvrätikud 56tk | Diapers & baby wipes | 2.43 € | 2.45 € | 2.43 € (1.69 € Partner) | Barbora + Selver |
| Huggies Extra Care Mähkmed S1 26tk | Diapers & baby wipes | 5.99 € | 6.79 € | 7.10 € (5.49 € Partner) | Barbora + Coop |
| Huggies Extra Care Mähkmed S1 84tk | Diapers & baby wipes | 13.29 € | 20.49 € | 21.90 € | Barbora |
| Huggies Extra Care Mähkmed S2 58tk | Diapers & baby wipes | 17.25 € | 17.29 € | — | Barbora |
| Huggies Extra Care Mähkmed S2 82tk | Diapers & baby wipes | 13.29 € | 20.49 € | 21.90 € | Barbora |
| Huggies Extra Care Mähkmed S3 72tk | Diapers & baby wipes | 15.99 € | 24.99 € | 25.81 € (20.99 € Partner) | Barbora |
| Huggies Extra Care Mähkmed S4 60tk | Diapers & baby wipes | 15.99 € | 24.99 € | 25.81 € (20.99 € Partner) | Barbora |
| Huggies Extra Care Mähkmed S5 50tk | Diapers & baby wipes | 15.99 € | 24.99 € | 25.81 € (20.99 € Partner) | Barbora |
| Huggies Extra Care P Püksmähkmed S6 30tk | Diapers & baby wipes | 25.99 € | 25.99 € | 26.90 € | Coop |
| Huggies Extra Care Püksmähkmed S3 48tk | Diapers & baby wipes | 25.99 € | 25.99 € | 26.90 € | Coop |
| Huggies Extra Care Püksmähkmed S4 38tk | Diapers & baby wipes | 25.99 € | 25.99 € | 26.90 € | Coop |
| Huggies Little Movers Lm Box Püksmähkmed S4 72tk Boy | Diapers & baby wipes | — | — | 29.90 € | Coop |
| Huggies Little Movers Lm Box Püksmähkmed S4 72tk Girl | Diapers & baby wipes | — | — | 29.90 € | Coop |
| Huggies Little Movers Lm Box Püksmähkmed S5 68tk Girl | Diapers & baby wipes | — | — | 29.90 € | Coop |
| Huggies Little Movers Lm Püksmähkmed S3 58tk Boy | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Little Movers Lm Püksmähkmed S3 58tk Girl | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Little Movers Lm Püksmähkmed S4 52tk Boy | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Little Movers Lm Püksmähkmed S4 52tk Girl | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Little Movers Lm Püksmähkmed S5 48tk Boy | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Little Movers Lm Püksmähkmed S5 48tk Girl | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Little Movers Lm Püksmähkmed S6 44tk Girl | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Lm Box Püksmähkmed S5 68tk Boy | Diapers & baby wipes | — | — | 29.90 € | Coop |
| Huggies Lm Püksmähkmed S6 44tk Boy | Diapers & baby wipes | — | — | 20.32 € (12.99 € Partner) | Coop |
| Huggies Overnights P Püksmähkmed S4 26tk | Diapers & baby wipes | 14.15 € | — | 15.49 € | Barbora + Coop |
| Huggies Overnights P Püksmähkmed S5 24tk | Diapers & baby wipes | 14.15 € | — | 15.49 € | Barbora + Coop |
| Huggies Overnights P Püksmähkmed S6 22tk | Diapers & baby wipes | 14.15 € | — | 15.49 € | Barbora + Coop |
| Muumi baby Püksmähkmed S5 38tk | Diapers & baby wipes | — | 16.99 € | 17.99 € | Rimi |
| Neutral Plastic Free Baby Niisked salvrätikud 52tk | Diapers & baby wipes | 4.59 € | 3.39 € | 4.59 € | Rimi |
| Pampers Giant Pack Püksmähkmed S3 76tk | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Giant Pack Püksmähkmed S4 66tk | Diapers & baby wipes | 14.69 € | 17.99 € | 24.49 € | Barbora |
| Pampers Giant Pack Püksmähkmed S5 58tk | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Giant Pack Püksmähkmed S6 50tk | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Giant Pack Püksmähkmed S7 44tk | Diapers & baby wipes | 14.69 € | — | 24.49 € | Barbora |
| Pampers Jumbo Pack Püksmähkmed S3 62tk | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Jumbo Pack Püksmähkmed S4 54tk | Diapers & baby wipes | 12.77 € | 24.49 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Jumbo Pack Püksmähkmed S5 48tk | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Jumbo Pack Püksmähkmed S6 42tk | Diapers & baby wipes | 12.77 € | 24.49 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Jumbo Pack Püksmähkmed S7 38tk | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Jumbo Pack Püksmähkmed S8 32tk | Diapers & baby wipes | 12.77 € | 22.99 € | 22.26 € (14.99 € Partner) | Barbora |
| Pampers Mega Pack Püksmähkmed S4 108tk | Diapers & baby wipes | 24.33 € | — | 40.55 € | Barbora |
| Pampers Mega Pack Püksmähkmed S5 96tk | Diapers & baby wipes | 24.33 € | — | 40.55 € | Barbora |
| Pampers Mega Pack Püksmähkmed S6 84tk | Diapers & baby wipes | 24.33 € | — | 40.55 € | Barbora |
| Pampers Premium Care Mähkmed S0 30tk | Diapers & baby wipes | 6.79 € | — | 7.10 € (5.79 € Partner) | Barbora |
| Pampers Premium Care Mähkmed S1 26tk | Diapers & baby wipes | 6.60 € | 6.79 € | 6.60 € (4.99 € Partner) | Barbora + Selver |
| Pampers Premium Care Mähkmed S2 23tk | Diapers & baby wipes | 6.09 € | 6.79 € | 6.09 € (4.99 € Partner) | Barbora + Selver |
| Pampers Premium Care Mähkmed S5 44tk | Diapers & baby wipes | 14.99 € | — | 16.79 € | Barbora |
| Pampers Premium Care Value Pack Mähkmed S1 72tk | Diapers & baby wipes | 12.49 € | 11.99 € | 13.99 € | Coop + Rimi |
| Pampers Premium Care Value Pack Mähkmed S2 68tk | Diapers & baby wipes | 11.99 € | 11.99 € | 13.99 € | Barbora + Coop + Rimi |
| Pampers Premium Care Value Pack Mähkmed S3 60tk | Diapers & baby wipes | 13.19 € | 24.49 € | 16.79 € | Barbora + Coop |
| Pampers Premium Care Value Pack Mähkmed S4 52tk | Diapers & baby wipes | 13.19 € | 24.49 € | 16.79 € | Barbora |
| Pampers Premium Care Value Pack Püksmähkmed S3 48tk | Diapers & baby wipes | 13.79 € | 24.49 € | 23.88 € | Barbora |
| Pampers Premium Care Value Pack Püksmähkmed S4 40tk | Diapers & baby wipes | 22.99 € | — | 23.90 € | Barbora |
| Pampers Premium Care Value Pack Püksmähkmed S5 34tk | Diapers & baby wipes | 13.79 € | 24.49 € | 23.88 € | Barbora |
| Pampers Premium Care Value Pack Püksmähkmed S6 31tk | Diapers & baby wipes | 13.79 € | 24.49 € | 23.88 € | Barbora |
| Pampers Premium Care Value Pack Püksmähkmed S7 27tk | Diapers & baby wipes | 14.31 € | — | 23.88 € | Barbora |
| Pampers Sensitive Plastic Free Niisked salvrätikud 52tk | Diapers & baby wipes | 10.66 € (6.29 € Aitäh) | 11.19 € | 7.96 € | Selver |
| A kali põldmarja coq le rukkilinnase 500ml | Drinks | — | — | 0.99 € | Coop + Selver |
| A. le coq Kali klassikaline 0.5% 2000ml | Drinks | 2.09 € | 1.99 € | 2.08 € | Rimi |
| A. le coq Kali klassikaline 500ml | Drinks | 0.99 € | — | 0.97 € | Selver |
| A. le coq Kali rukkilinnase 500ml | Drinks | 1.05 € | — | 0.99 € | Coop + Selver |
| A. le coq Karastusjook barbariss 1500ml | Drinks | 1.55 € | — | 1.58 € (1.09 € Partner) | Barbora + Coop |
| Akvile Karb tud lauavesi apelsini 600ml | Drinks | — | 0.79 € | — | Coop + Rimi |
| Akvile Karb tud lauavesi laimi 600ml | Drinks | — | 0.79 € | — | Coop + Rimi |
| Akvile Karb tud lauavesi virsiku 600ml | Drinks | — | 0.79 € | — | Coop + Rimi |
| Aura Ananassinektar 1000ml | Drinks | 2.75 € | 2.85 € | 2.19 € | Selver |
| Aura Apelsinimahl 1000ml | Drinks | 2.39 € | 2.39 € | 1.89 € | Selver |
| Aura fruit Gaasita basiiliku maasika vesi 1500ml | Drinks | — | — | 1.37 € | Selver |
| Aura fruit Gas jook kasemahlast tud vesi õunam 1500ml | Drinks | — | — | 1.37 € | Selver |
| Aura fruit Gas mata mustikas vesi 1500ml | Drinks | — | — | 1.37 € | Selver |
| Aura fruit Gas sidrunimahlaga tud vesi 500ml | Drinks | — | — | 0.86 € | Coop |
| Aura fruit Gas vesi ananassi pet tud 1500ml | Drinks | — | — | 1.39 € | Coop + Selver |
| Aura fruit Gas vesi ananassi tud 500ml | Drinks | — | — | 0.85 € | Coop + Selver |
| Aura fruit Gas vesi sidrunimahlaga tud 1500ml | Drinks | — | — | 1.37 € | Selver |
| Aura Gaasita vesi mg 500ml | Drinks | 1.29 € (0.99 € Aitäh) | 1.39 € | — | Barbora |
| Aura Köögiviljamahl 1000ml | Drinks | — | 1.95 € | 1.85 € | Coop + Selver |
| Aura Magus apelsininektar 1000ml | Drinks | 2.29 € | — | 1.99 € | Coop + Selver |
| Aura Mango aprikoosi nektar 1000ml | Drinks | — | 1.89 € | 1.89 € | Coop + Rimi + Selver |
| Aura Multinektar 50% 1000ml | Drinks | 1.89 € | 1.89 € | 1.89 € | Barbora + Coop + Rimi + Selver |
| Aura Õunamahl 1000ml | Drinks | 1.99 € | — | 1.98 € | Selver |
| Aura Õunamahl filtreerimata tetra mahe 1000ml | Drinks | — | — | 2.80 € | Coop |
| Aura pirninektar 50% 1000ml | Drinks | — | 2.05 € | 1.89 € | Coop + Selver |
| Aura Ploominektar 40% 1000ml | Drinks | 1.75 € | 1.79 € | 1.45 € | Selver |
| Aura plus Gas vesi pohla pet tud 1 1500ml | Drinks | — | — | 0.80 € | Selver |
| Aura plus Gas vesi sidruni pet tud 1 1500ml | Drinks | — | — | 0.80 € | Selver |
| Aura Punase greibi nektar 55% 1000ml | Drinks | 1.89 € | — | 1.89 € | Coop |
| Aura Spring vesi gaasita 500ml | Drinks | 0.56 € | — | 0.56 € | Barbora + Selver |
| Aura Tomatimahl 1000ml | Drinks | 1.79 € | 1.79 € | 1.76 € | Selver |
| Aura Vesi spring gaasita 1500ml | Drinks | 0.78 € | — | 0.78 € | Barbora + Selver |
| Aura Viinamarjanektar 1000ml | Drinks | 1.79 € | — | 1.79 € | Barbora + Selver |
| Borjomi Karb looduslik 1250ml | Drinks | — | — | 2.99 € | Coop + Selver |
| Borjomi Karb looduslik pet 500ml | Drinks | — | — | 1.49 € (1.19 € Partner) | Coop |
| Borjomi Looduslik karboniseeritud 1000ml | Drinks | 2.49 € | — | 2.49 € | Barbora + Selver |
| Cappy Apelsininektar 1000ml | Drinks | 2.95 € (1.69 € Aitäh) | — | 2.95 € | Barbora + Coop + Selver |
| Cappy Multivitamiininektar 1L | Drinks | 2.85 € (1.69 € Aitäh) | 1.99 € | 2.89 € | Rimi |
| Cappy Õunanektar 1000ml | Drinks | 2.55 € (1.69 € Aitäh) | — | 2.59 € | Barbora |
| Cido Granaatõunanektar 30% 1000ml | Drinks | 2.39 € | — | — | Coop |
| Cido Köögiviljamahl 1000ml | Drinks | 1.85 € | — | 1.82 € | Coop |
| Coca-cola Karastusjook 2000ml | Drinks | 2.85 € | 2.85 € | 2.73 € (2.09 € Partner) | Coop |
| Coca-cola Karastusjook 200ml | Drinks | 0.79 € | — | 0.80 € | Barbora |
| Coca-cola Karastusjook 500ml | Drinks | 1.29 € | — | 1.27 € | Coop |
| Coca-Cola karastusjook 6x330ml | Drinks | 6.19 € | 6.19 € | 5.99 € | Coop + Selver |
| Coca-cola Karastusjook 850ml | Drinks | 1.69 € | — | 1.49 € | Selver |
| Coca-cola Karastusjook cherry 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | 1.21 € (0.89 € Partner) | Rimi |
| Coca-cola Karastusjook cherry 850ml | Drinks | 1.69 € | 1.29 € | — | Rimi |
| Coca-cola Karastusjook zero 2000ml | Drinks | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Coca-cola Karastusjook zero 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Coca-cola Karastusjook zero 6x330ml | Drinks | 6.19 € | 6.19 € | — | Barbora + Rimi |
| Coca-cola zero Coca karastusjook karb tud magusainetega 1500ml | Drinks | — | — | 2.29 € | Coop |
| Coca-Cola Zero karastusjook 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | — | Rimi |
| Coca-cola zero Karb karastusjook tud 500ml | Drinks | — | — | 1.27 € | Coop |
| Coca-cola zero Karb karastusjook tud 850ml | Drinks | — | — | 1.49 € | Selver |
| Coca-cola zero Karb tud karastusjook koola 2000ml | Drinks | — | — | 2.73 € (2.09 € Partner) | Selver |
| Devin Looduslik 1500ml | Drinks | 2.05 € | 2.09 € | 2.02 € | Coop |
| Don simon Ananassimahl 1000ml | Drinks | — | — | 4.49 € | Coop + Selver |
| Don simon Ananassinektar 330ml | Drinks | 1.39 € | 1.39 € | 1.49 € (1.29 € Partner) | Barbora + Rimi |
| Don simon Apelsinimahl 1000ml | Drinks | 4.06 € | 4.19 € | — | Barbora |
| Don simon Apelsinimahl pres viljadest värsketest viljalihaga 1000ml | Drinks | — | 3.99 € | 3.99 € | Coop + Rimi + Selver |
| Don simon Apelsinimahl pres viljadest värsketest viljalihaga 2000ml | Drinks | — | 4.99 € | 5.59 € | Rimi |
| Don simon Apelsininektar 330ml | Drinks | 1.39 € | 1.39 € | 1.49 € | Barbora + Rimi |
| Don simon Apelsininektar premium 1500ml | Drinks | 4.05 € | — | 4.09 € | Barbora |
| Don simon Don ananassinektar premium 50% 1500ml | Drinks | — | — | 3.99 € (2.99 € Partner) | Coop + Selver |
| Don simon Don granadillinektar pet 1500ml | Drinks | — | — | 3.99 € | Coop + Selver |
| Don simon Don mahl troop vilj 1000ml | Drinks | — | 3.65 € | 3.65 € | Coop + Rimi + Selver |
| Don simon Mandariinimahl 1000ml | Drinks | 3.65 € | 3.79 € | — | Barbora |
| Don simon Mandariinimahl värsketest pres viljade 1000ml | Drinks | — | — | 3.65 € (2.99 € Partner) | Coop + Selver |
| Don simon Mangonektar premium 1500ml | Drinks | 3.75 € (2.99 € Aitäh) | — | 3.99 € | Barbora |
| Don simon Punase greibi mahl 1000ml | Drinks | — | — | 3.55 € | Selver |
| Don simon Punase viinamarja mahl 1000ml | Drinks | — | 2.99 € | 3.04 € (2.59 € Partner) | Coop + Rimi |
| Don simon Tomatimahl premium 200ml | Drinks | — | 1.39 € | 1.21 € | Selver |
| Don simon Virsikunektar premium 1500ml | Drinks | 4.09 € (2.99 € Aitäh) | — | 3.99 € | Coop + Selver |
| Dr.pepper Karastusjook 330ml | Drinks | 1.19 € | 1.15 € | 1.11 € | Selver |
| Essential well Karb nr looduslik min tud vesi 1000ml | Drinks | — | — | 1.68 € | Selver |
| Evian Gas looduslik mata 1500ml | Drinks | — | — | 2.29 € (1.69 € Partner) | Coop + Selver |
| Evian Gas looduslik mata 500ml | Drinks | — | — | 1.29 € | Coop |
| Evian Looduslik 1500ml | Drinks | 2.25 € | 2.25 € | — | Barbora + Rimi |
| Evian mineraalvesi 500ml | Drinks | 1.25 € | 1.25 € | — | Barbora + Rimi |
| Fanta Karastusjook 330ml | Drinks | 1.21 € (1.21 € Aitäh) | — | 1.21 € (0.89 € Partner) | Coop |
| Fanta Karastusjook apelsini 1500ml | Drinks | 2.29 € | 2.29 € | 2.29 € | Coop |
| Fanta Karastusjook apelsini 2000ml | Drinks | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Fanta Karastusjook apelsini 500ml | Drinks | 1.29 € | 1.29 € | 1.27 € | Coop |
| Fanta karastusjook diablo karb tud 500ml | Drinks | — | — | 1.27 € | Selver |
| Fanta karastusjook karb tud 850ml | Drinks | — | — | 1.69 € | Coop + Selver |
| Fanta Karastusjook orange 850ml | Drinks | 1.69 € | 1.29 € | — | Rimi |
| Fanta Karastusjook orange zero 1500ml | Drinks | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Fanta Karastusjook orange zero 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | — | Rimi |
| Fanta Karastusjook zero apelsin 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Fanta Karb apelsini zero karastusj tud 1500ml | Drinks | — | — | 2.29 € | Coop |
| Fentimans Rose Lemonade 275ml | Drinks | 2.35 € | 2.35 € | 2.43 € | Barbora + Rimi |
| Fentimans Toonik pink grapefruit tonic water 500ml | Drinks | — | — | 3.65 € | Coop |
| Fentimans Toonik premium indian tonic water 500ml | Drinks | — | — | 3.65 € | Coop |
| Fever tree Ginger ale klaas 500ml | Drinks | — | — | 3.55 € (2.59 € Partner) | Coop |
| Fever tree Tonic indian water 500ml | Drinks | — | 3.49 € | 2.59 € | Selver |
| Filly Karb apelsini virsiku jook kar tud 330ml | Drinks | — | — | 1.79 € | Coop + Selver |
| Filly Karb passioni mango jook kar tud 330ml | Drinks | — | — | 1.79 € | Coop + Selver |
| Filly Karb rabarberi mündi jook kar tud 330ml | Drinks | — | — | 1.79 € | Coop + Selver |
| Filly Karb vaarika maasika jook kar tud 330ml | Drinks | — | — | 1.79 € | Coop + Selver |
| Gas kali tume a coq kuni kääritatud le tud 0.5% 1000ml | Drinks | — | 1.49 € | 1.09 € | Selver |
| Gas null jook karast pet traditsiooniline tud 1500ml | Drinks | — | — | 1.59 € | Coop |
| Go botanicals Karb lime grape jook purk tub 330ml | Drinks | — | — | 1.49 € | Coop + Selver |
| Go botanicals Karb melon lemon jook purk tud 330ml | Drinks | — | — | 1.49 € | Coop + Selver |
| Go botanicals Karb pear orange jook purk tud 330ml | Drinks | — | — | 1.49 € | Coop + Selver |
| Granini Apelsini mangonektar pet 43% 1000ml | Drinks | — | — | 4.06 € | Coop |
| Haage looduslik karb mata miner vesi 1000ml | Drinks | — | — | 1.19 € | Coop |
| Haage looduslik karb miner tud vesi mulliga 1000ml | Drinks | — | — | 1.19 € | Coop |
| Haanja mulliga looduslik min vesi 1000ml | Drinks | — | — | 1.19 € (0.79 € Partner) | Coop |
| Hartwall Karb jaffa karastusj orange orig tud 1500ml | Drinks | — | — | 1.69 € | Selver |
| Heavenly Karb ananassi jook kar tud ananassimaitsega 330ml | Drinks | — | — | 1.51 € | Coop |
| Heavenly Karb õuna mündi jook kar tud maitsega 330ml | Drinks | — | — | 1.51 € | Coop |
| Heavenly Karb passioni jook kar mango tud 330ml | Drinks | — | — | 1.51 € | Coop |
| Heavenly Karb pirni jook kar purk tud 330ml | Drinks | — | — | 1.51 € | Coop |
| Heavenly Karb vaarika rabarberi jook kar tud maitsega 330ml | Drinks | — | — | 1.51 € | Coop |
| Heinz Tomatimahl 290ml | Drinks | — | 1.49 € | 1.49 € | Coop + Rimi + Selver |
| Karastusjook rose lemonade blooms johnny 330ml | Drinks | — | — | 0.85 € | Selver |
| Karb aranciata jook pellegrino s tud 330ml | Drinks | — | — | 1.49 € | Coop + Selver |
| Karb aranciata rossa jook pellegrino s tud 330ml | Drinks | — | — | 1.49 € | Coop + Selver |
| Karb karastusjook coca cola purk tud zero magusainetega 330ml | Drinks | — | — | 1.21 € (0.89 € Partner) | Coop |
| Karb karastusjook lime coca cola tud zero 500ml | Drinks | — | — | 1.27 € | Coop |
| Karb tud karastusjook kuldne apelsin pet 1500ml | Drinks | — | 1.59 € | 1.59 € (1.09 € Partner) | Coop |
| Karb tud karastusjook kuldne apelsin pet 500ml | Drinks | — | — | 0.95 € | Coop + Selver |
| Karb tud min vesi s pellegrino pet 1000ml | Drinks | — | — | 1.79 € | Coop |
| Karboniseeritud toonik greibi a coq jook le 1500ml | Drinks | — | — | 1.77 € | Coop |
| Karl friedrich Kali 1500ml | Drinks | — | — | 1.69 € (1.29 € Partner) | Coop + Selver |
| Karl friedrich Kali kirss pet 1500ml | Drinks | — | 1.59 € | 1.72 € (1.29 € Partner) | Rimi |
| Karl friedrich Kali kirss purk 500ml | Drinks | — | — | 1.01 € | Coop |
| Karl friedrich Kali purk 500ml | Drinks | — | — | 0.96 € | Selver |
| Kelluke Karb karastusjook sidruni tud 1500ml | Drinks | — | — | 1.58 € | Coop |
| Kelluke Karb tud karastusjook ploomi 1500ml | Drinks | — | — | 1.62 € | Coop |
| Kelluke Karb tud karastusjook vaarika pet 1500ml | Drinks | — | — | 1.19 € | Coop |
| Kelluke vaarika jook kar karb tud 500ml | Drinks | — | — | 0.97 € | Coop |
| Kombucha Kar ingv jook sidr mahe 400ml | Drinks | — | — | 2.71 € | Selver |
| Lillepidu karastusjook karb tud 330ml | Drinks | — | — | 1.31 € | Coop |
| Limonaad Gas null jook karast tud magusainetega 500ml | Drinks | — | — | 0.97 € (0.59 € Partner) | Coop |
| Limonaad Gas traditsiooniline jook karast tud 1500ml | Drinks | — | — | 1.58 € | Coop |
| Limonaad Gas traditsiooniline jook karast tud 500ml | Drinks | — | — | 0.79 € (0.59 € Partner) | Coop + Selver |
| Limonaad Gas tud karast jook traditsiooniline 1000ml | Drinks | — | — | 0.99 € | Selver |
| Limonaad Karb tud traditsiooniline pdl 330ml | Drinks | — | — | 0.66 € | Selver |
| Limpa Karastusjook mullike 750ml | Drinks | 3.39 € | 3.59 € | — | Barbora |
| Loodusvägi Multinektar mahe 200ml | Drinks | — | 1.35 € | — | Coop + Rimi |
| Neptunas karb lauavesi mint tud 1500ml | Drinks | — | — | 1.25 € (0.99 € Partner) | Selver |
| Neptunas still karb mata min vesi 1500ml | Drinks | — | — | 1.09 € (0.79 € Partner) | Selver |
| Orn craft Karb guava jook kar purk tud 330ml | Drinks | — | — | 1.31 € (0.99 € Partner) | Coop |
| Orn craft Karb jook kar kiwi purk tud 330ml | Drinks | — | — | 1.31 € | Coop |
| Orn craft Karb lemon jook kar purk tud 330ml | Drinks | — | — | 1.31 € (0.99 € Partner) | Coop |
| Orn craft Karb orange jook kar purk tud 330ml | Drinks | — | — | 1.31 € | Coop |
| Orn craft Karb pineapple jook kar purk tud 330ml | Drinks | — | — | 1.31 € (0.99 € Partner) | Coop |
| Orn craft Toonik elderblossom pet 1000ml | Drinks | — | 1.49 € | 1.62 € | Rimi |
| Orn craft Toonik indian tonic water pet 1000ml | Drinks | — | — | 1.62 € (1.29 € Partner) | Coop |
| Orn craft Toonik red mixer pet 1000ml | Drinks | 1.65 € | — | 1.62 € | Selver |
| Orn craft Toonik rose tonic lemonade pet 1000ml | Drinks | — | — | 1.62 € (1.29 € Partner) | Coop |
| Öun Õunalimonaad mahe 330ml | Drinks | — | — | 2.29 € | Coop |
| Öun Rabarberilimonaad mahe 330ml | Drinks | — | — | 2.29 € | Coop |
| Pepsi Karastusjook cola 1500ml | Drinks | 1.99 € (1.29 € Aitäh) | 1.29 € | 2.02 € | Rimi |
| Pepsi Karastusjook cola 500ml | Drinks | 1.09 € | 1.09 € | 1.07 € | Selver |
| Perrier gas looduslik min tud vesi 500ml | Drinks | — | — | 1.39 € | Coop |
| Perrier Gas tud looduslik 1000ml | Drinks | — | — | 1.39 € | Selver |
| Peter mikheim Peter karb min tud vesi 1000ml | Drinks | — | — | 1.19 € | Coop |
| Põhjala Kali 440ml | Drinks | 1.89 € (1.49 € Aitäh) | — | 1.99 € (1.49 € Partner) | Barbora |
| Põltsamaa Apelsinimahl 1000ml | Drinks | 2.99 € | — | 2.49 € | Coop |
| Põltsamaa Õunamahl 1000ml | Drinks | 1.99 € | — | 1.79 € | Coop |
| Põltsamaa õunamahl 300ml | Drinks | — | — | 1.17 € | Coop |
| Põltsamaa Ploominektar 1000ml | Drinks | 1.75 € | — | 1.79 € | Barbora + Coop |
| Põltsamaa Tomatimahl 1000ml | Drinks | 1.85 € | — | 1.85 € | Barbora + Coop + Selver |
| Põltsamaa Tomatimahl 2000ml | Drinks | 3.29 € | — | 3.30 € | Barbora + Coop |
| Pure Ananassimahl 1000ml | Drinks | 4.55 € (3.49 € Aitäh) | 3.99 € | 4.59 € | Rimi |
| Pure Apelsinimahl viljalihaga 1000ml | Drinks | 4.99 € (2.99 € Aitäh) | 3.69 € | 3.29 € | Selver |
| Pure Greibimahl 1000ml | Drinks | 4.99 € (3.49 € Aitäh) | 3.99 € | — | Rimi |
| Pure Õunamahl 1000ml | Drinks | 3.65 € | 3.29 € | 3.69 € | Rimi |
| Pure Tomatimahl 1000ml | Drinks | 4.69 € | 3.79 € | — | Rimi |
| Pure Tomatimahl meresoolaga 1000ml | Drinks | — | — | 4.29 € | Coop |
| Rc cola Karastusjook 2000ml | Drinks | 2.09 € | — | 2.08 € | Coop |
| Reynar Granaatõunamahl 1000ml | Drinks | — | — | 3.13 € | Coop |
| Royal club Soodavesi purk 330ml | Drinks | — | — | 0.90 € | Selver |
| Rynkeby Mahl kuivatatud ploomist 1000ml | Drinks | 4.25 € | — | 4.26 € | Barbora |
| Saaremaa vesi Looduslik joogivesi 5000ml | Drinks | — | 1.19 € | 1.19 € | Coop + Rimi + Selver |
| Saaremaa vesi Looduslik joogivesi pet 1500ml | Drinks | — | 0.85 € | 0.70 € | Selver |
| Saaremaa vesi Looduslik joogivesi pet 500ml | Drinks | — | 0.54 € | 0.53 € | Selver |
| Saaremaa vesi Nõrgalt gaseeritud 1500ml | Drinks | — | — | 0.70 € | Selver |
| Saaremaa vesi Nõrgalt gaseeritud pet 500ml | Drinks | — | — | 0.53 € | Selver |
| Sadochok Ananassi nektar õuna 950ml | Drinks | — | 2.39 € | — | Coop + Rimi |
| Sadochok nektar mitmevilja 950ml | Drinks | — | 2.19 € | — | Coop |
| Sadochok Õuna kirsinektar 950ml | Drinks | 2.09 € | — | — | Coop |
| Sadochok Õunamahl 200ml | Drinks | 0.59 € | — | — | Barbora |
| Schweppes Toonik 1500ml | Drinks | — | — | 2.73 € (1.79 € Partner) | Selver |
| Schweppes Toonik bitter lemon 1000ml | Drinks | 1.39 € | — | 1.92 € | Barbora |
| Schweppes Toonik pink mixer 1000ml | Drinks | 1.95 € | — | 1.49 € | Selver |
| Schweppes Toonik pink mixer 1500ml | Drinks | 2.75 € | — | 2.73 € (1.79 € Partner) | Selver |
| Schweppes Toonik tangerine 1000ml | Drinks | 1.95 € | — | 1.92 € | Selver |
| Schweppes Toonik tonic water 1000ml | Drinks | 1.95 € | — | 1.49 € | Selver |
| Semu Astelpajunektar 500ml | Drinks | — | — | 2.92 € | Coop |
| Semu Jõhvikamahl 500ml | Drinks | — | — | 7.49 € | Coop |
| Shroomwell Kar focus state jook lionsmane lprk 250ml | Drinks | — | — | 2.53 € | Coop |
| Spläsh Gas vesi maasika kiivi tud 330ml | Drinks | — | — | 1.29 € | Coop + Selver |
| Spläsh Gas vesi mango mandariini tud 330ml | Drinks | — | — | 1.29 € | Coop + Selver |
| Spläsh vesi gas mata min mineraalidega 310ml | Drinks | — | — | 0.99 € | Coop + Selver |
| Spläsh vesi pirni gas tud 330ml | Drinks | — | — | 1.29 € | Coop + Selver |
| Sprite Karastusjook 1500ml | Drinks | 2.29 € | — | 2.29 € | Coop |
| Sprite Karastusjook 500ml | Drinks | 1.29 € | — | 1.27 € | Coop |
| Sprite Karastusjook 850ml | Drinks | 1.69 € | 1.29 € | 1.69 € | Rimi |
| Sprite Karastusjook chill zero 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 1.19 € | — | Rimi |
| Sprite Karastusjook chill zero 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Sprite zero Karb jook kar laimi sidr tud magusainetega 500ml | Drinks | — | — | 1.27 € | Coop |
| Sprite zero Sprite jook kar karb laimi sidr magusainetega 1500ml | Drinks | — | — | 2.29 € | Coop |
| Stellar looduslik pudel mineraalidega 700ml | Drinks | — | — | 1.72 € | Coop |
| Super Manki karastusjook 330ml | Drinks | 1.05 € | 0.99 € | — | Rimi |
| Tanheiser Naturaalne kali kuni 0.5% 1500ml | Drinks | — | — | 1.69 € | Selver |
| Valge klaar Karastusjook mahlaga 1500ml | Drinks | — | — | 1.58 € (1.09 € Partner) | Coop |
| Värska Gas looduslik naturaal mata min vesi 7000ml | Drinks | — | — | 2.08 € | Selver |
| Värska Karb granaat pet tud vesi 1500ml | Drinks | — | — | 1.55 € (1.29 € Partner) | Selver |
| Värska Karb looduslik laim min piparm tud vesi laimiga 1000ml | Drinks | — | — | 1.21 € | Selver |
| Värska Karb mineraliseeritud vesi tud 1500ml | Drinks | — | — | 1.01 € | Coop |
| Värska Karb naturaal goji jõhv tud vesi 1500ml | Drinks | — | — | 1.55 € (1.19 € Partner) | Coop + Selver |
| Värska Karb naturaal pet tud vesi gaasiga 1500ml | Drinks | — | — | 0.99 € | Selver |
| Värska Karb tud looduslik origin 6x1000ml | Drinks | — | — | 7.19 € | Coop + Selver |
| Värska mineraal Karb loodus mata miner vesi 1000ml | Drinks | — | — | 1.21 € | Coop |
| Värska mineraal Karb loodus miner tud vesi 1500ml | Drinks | — | — | 1.58 € | Coop |
| Värska mineraal Karb loodus miner tud vesi 6x1500ml | Drinks | — | — | 9.19 € | Coop |
| Värska mineraal Karb looduslik min tud vesi 6x1000ml | Drinks | — | — | 5.59 € | Selver |
| Värska originaal Gas aluseline mata min vesi 1500ml | Drinks | — | — | 1.68 € (1.29 € Partner) | Coop |
| Värska originaal Karb aluseline mata vesi 500ml | Drinks | — | — | 0.97 € | Selver |
| Värska originaal Looduslik 6 6x1500ml | Drinks | — | — | 8.99 € | Coop |
| Värska originaal Mineraalvesi 1500ml | Drinks | 1.69 € | — | 1.68 € (1.29 € Partner) | Selver |
| Värska originaal Mineraalvesi 500ml | Drinks | 0.99 € | — | 0.97 € | Selver |
| Värska Originaal mineraalvesi 500ml | Drinks | 0.98 € | 1.09 € | — | Barbora |
| Värska originaal Mineraalvesi karb tud looduslik origin 1000ml | Drinks | 1.45 € | — | 1.45 € | Coop |
| Värska originaal Värska naturaal mullita 1500ml | Drinks | 0.99 € | — | 0.99 € | Barbora + Selver |
| Värska vurtsvasser Karb kirsi aroonia mahlaj tud 1000ml | Drinks | — | — | 2.32 € | Selver |
| Värska vurtsvasser Karb mahlaj rabar tud vaar 1000ml | Drinks | — | — | 2.36 € | Coop |
| Vichy classique Karb sidruni lauavesi tud 1500ml | Drinks | — | — | 0.80 € | Selver |
| Vichy fresh Karb bubbles jook orange pet tud 1500ml | Drinks | — | — | 1.37 € (0.99 € Partner) | Selver |
| Vichy fresh Karb laimi vesi mata sidr 1500ml | Drinks | — | — | 1.37 € | Selver |
| Vichy fresh Karb vesi cherry mata 1500ml | Drinks | — | — | 1.37 € | Selver |
| Vichy fresh Vichy bubbles lemon 1500ml | Drinks | — | — | 1.37 € (0.99 € Partner) | Selver |
| Vytautas Karb tud looduslik 1000ml | Drinks | — | — | 0.90 € | Coop |
| Vytautas Mineraalvesi karb tud looduslik 1500ml | Drinks | 1.29 € (0.79 € Aitäh) | — | 1.21 € (0.99 € Partner) | Coop |
| Aviko Kartulipallid 600g | Dumplings, pizza & fries | — | 2.75 € | 2.43 € | Selver |
| Bimar vareenikud kirssidega 400g | Dumplings, pizza & fries | 2.55 € | — | — | Barbora |
| Dr.oetker pitsa prosciutto ristorante 340g | Dumplings, pizza & fries | 4.05 € | — | 4.06 € | Barbora |
| Dr.oetker pitsa ristorante speciale 345g | Dumplings, pizza & fries | 3.99 € | — | 4.06 € | Barbora |
| Ehe Rr pelmeenid linnulihaga 350g | Dumplings, pizza & fries | — | — | 2.79 € (1.99 € Partner) | Selver |
| Härmavili Bataadi friikartulid kullakesed 450g | Dumplings, pizza & fries | — | — | 3.19 € | Selver |
| Härmavili Friikartul sakiline kullakesed 750g | Dumplings, pizza & fries | — | 2.99 € | 3.29 € | Coop + Rimi |
| Härmavili Sirge ja krõbe friikartul kullakesed 600g | Dumplings, pizza & fries | — | — | 2.59 € | Selver |
| Isukas pelmeenid 700g | Dumplings, pizza & fries | 2.15 € | — | 2.69 € | Coop |
| Maahärra Bataadi friikartulid kuldselt krõbe 500g | Dumplings, pizza & fries | — | — | 4.46 € | Selver |
| Maahärra friikartul sakiline 750g | Dumplings, pizza & fries | 2.99 € | — | 3.04 € | Barbora |
| Maahärra Kartulisektorid kuldselt krõbe 500g | Dumplings, pizza & fries | — | — | 2.12 € | Selver |
| Maks & moorits Kodupelmeenid 700g | Dumplings, pizza & fries | 3.11 € | 3.89 € | 3.98 € | Barbora |
| Maks&moorits Klassikalised pelmeenid külmut 400g | Dumplings, pizza & fries | — | — | 3.17 € | Selver |
| Pealinna laste pelmeenid 350g | Dumplings, pizza & fries | 1.83 € | — | 2.29 € | Barbora |
| Pealinna minipelmeenid 700g | Dumplings, pizza & fries | — | 4.39 € | 4.29 € | Coop + Selver |
| Pealinna minipelmeenid kanalihaga 350g | Dumplings, pizza & fries | — | — | 2.53 € | Selver |
| Pealinna pelmeenid 350g | Dumplings, pizza & fries | 1.89 € | 2.29 € | 2.29 € | Barbora |
| Pealinna Pelmeenid 700g | Dumplings, pizza & fries | — | 4.59 € | — | Coop |
| Pealinna Pelmeenid minipelmeenid 350g | Dumplings, pizza & fries | — | — | 2.39 € | Coop |
| Põdralihapelmeenid eesti uluk rr 350g | Dumplings, pizza & fries | — | — | 2.84 € | Selver |
| Rakvere broilerilihaga pelmeenid 400g | Dumplings, pizza & fries | 2.15 € | 2.69 € | 2.73 € (2.29 € Partner) | Barbora |
| Rakvere Laste pelmeenid 350g | Dumplings, pizza & fries | — | — | 2.15 € | Selver |
| Rakvere Minipelmeenid sealihaga 350g | Dumplings, pizza & fries | — | 2.49 € | 2.35 € (1.99 € Partner) | Selver |
| Rakvere pelmeenid 900g | Dumplings, pizza & fries | 5.39 € (3.99 € Aitäh) | 4.59 € | 5.39 € | Rimi |
| Rakvere pelmeenid praesibulaga 400g | Dumplings, pizza & fries | 1.72 € | — | 2.15 € | Barbora |
| Rakvere Pere pelmeenid 600g | Dumplings, pizza & fries | — | 2.39 € | 2.99 € | Rimi |
| Rannarootsi hinkaalid 420g | Dumplings, pizza & fries | 2.63 € | 3.29 € | — | Barbora |
| Rannarootsi mini pelmeenid 700g | Dumplings, pizza & fries | — | 3.99 € | 3.89 € | Selver |
| Rannarootsi mini pelmeenid ehe 350g | Dumplings, pizza & fries | 2.23 € | — | 2.84 € | Barbora |
| Rannarootsi pelmeenid ehe 350g | Dumplings, pizza & fries | 2.79 € (1.99 € Aitäh) | — | 2.79 € | Barbora + Selver |
| Rannarootsi Pelmeenid ehe 600g | Dumplings, pizza & fries | — | — | 3.49 € | Selver |
| Tallegg Minipelmeenid broilerilihaga 350g | Dumplings, pizza & fries | — | 2.69 € | 2.59 € | Selver |
| Uvic hiina pelmeenid 1000g | Dumplings, pizza & fries | 6.36 € | — | 7.98 € | Barbora |
| Uvic pelmeenid hiina 400g | Dumplings, pizza & fries | 2.63 € | 3.29 € | 3.34 € (2.79 € Partner) | Barbora |
| Vici hinkaalid 400g | Dumplings, pizza & fries | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Vici pelmeenid kana juustu puravik puravikega 400g | Dumplings, pizza & fries | — | — | 4.35 € | Coop + Selver |
| Vici Pelmeenid kanaga traditional style külmut 400g | Dumplings, pizza & fries | — | — | 2.89 € | Selver |
| Vici Pelmeenid köögiviljade ja kanaga gyoza 200g | Dumplings, pizza & fries | — | — | 2.05 € | Selver |
| Vici pelmeenid lihaga gyoza 400g | Dumplings, pizza & fries | 2.63 € | — | 3.65 € | Barbora |
| Vici pelmeenid seentega gyoza 400g | Dumplings, pizza & fries | 2.63 € | — | 3.65 € (2.99 € Partner) | Barbora |
| Vici Pelmeenid veiselihaga traditional style 400g | Dumplings, pizza & fries | — | — | 4.25 € | Selver |
| Vici Pelmeenid vürtsikate gyoza köögiv köögiviljadega 400g | Dumplings, pizza & fries | — | — | 3.25 € | Selver |
| Arctic sport Proteiinijook maasika move 330ml | Energy, sports & iced-tea drinks | — | 1.99 € | 2.09 € | Rimi |
| Arctic sport Spordijook greibi 1500ml | Energy, sports & iced-tea drinks | — | — | 1.82 € | Coop |
| Arctic sport Spordijook greibi 750ml | Energy, sports & iced-tea drinks | — | — | 1.41 € | Coop |
| Battery Energiajook 330ml | Energy, sports & iced-tea drinks | 1.29 € (0.79 € Aitäh) | 1.29 € | 1.19 € | Coop + Selver |
| Battery Energiajook fresh 500ml | Energy, sports & iced-tea drinks | 1.69 € (0.99 € Aitäh) | 1.59 € | — | Rimi |
| Battery Energiajook juiced breeze 330ml | Energy, sports & iced-tea drinks | 1.69 € | 1.59 € | 1.39 € | Coop + Selver |
| Battery Energiajook juiced bright purk 330ml | Energy, sports & iced-tea drinks | — | 1.59 € | — | Coop |
| Battery Energiajook juiced euphoria 330ml | Energy, sports & iced-tea drinks | 1.55 € | 1.39 € | — | Rimi |
| Battery Energiajook original 400ml | Energy, sports & iced-tea drinks | — | — | 0.89 € | Selver |
| Battery Energiajook virsiku vaarika 500ml | Energy, sports & iced-tea drinks | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Belief jook kofeiiniga maas rabarb 530ml | Energy, sports & iced-tea drinks | — | — | 1.98 € | Selver |
| Belief Karb arbuusi jook kofeiiniga tud 530ml | Energy, sports & iced-tea drinks | — | — | 1.98 € (1.59 € Partner) | Selver |
| Belief Karb greibi jook kofeiiniga tud 530ml | Energy, sports & iced-tea drinks | — | — | 1.98 € | Selver |
| Belief Karb jook dragonfr kofeiiniga tud 530ml | Energy, sports & iced-tea drinks | — | — | 1.98 € | Selver |
| Belief Karb jook kofeiiniga passionim tud 530ml | Energy, sports & iced-tea drinks | — | — | 1.98 € | Selver |
| Belief Karb jook kofeiiniga tropic tud 530ml | Energy, sports & iced-tea drinks | — | — | 1.98 € | Selver |
| Burn Energiajook apple kiwi 250ml | Energy, sports & iced-tea drinks | 0.99 € | — | 0.99 € | Barbora + Selver |
| Burn Energiajook original 250ml | Energy, sports & iced-tea drinks | 0.99 € | — | 0.99 € | Barbora + Selver |
| Dynamit Energiajook pet pwr 5 500ml | Energy, sports & iced-tea drinks | — | — | 1.09 € (0.79 € Partner) | Coop |
| Dynamit Energiajook pwr pet 7 500ml | Energy, sports & iced-tea drinks | — | — | 0.99 € | Coop + Selver |
| Dynamit Energiajook pwr purk 3 500ml | Energy, sports & iced-tea drinks | — | — | 0.99 € | Coop + Selver |
| For me For gr jook kofeiini õun ženženn maitsega 500ml | Energy, sports & iced-tea drinks | — | — | 1.78 € | Selver |
| For me Karb tee j kofeiiniga piparm roh tud 500ml | Energy, sports & iced-tea drinks | — | — | 1.79 € | Selver |
| For me Karb yuzu vaarika jook kofeiiniga tud 500ml | Energy, sports & iced-tea drinks | — | — | 1.78 € | Selver |
| For me Karb zero granad j kofeiin tud veriap maitsega 500ml | Energy, sports & iced-tea drinks | — | — | 1.79 € | Selver |
| For me Karb zero maasika leedri j kofeiin tud maitsega 500ml | Energy, sports & iced-tea drinks | — | — | 1.79 € (1.19 € Partner) | Selver |
| Hustler Energiajook purk 500ml | Energy, sports & iced-tea drinks | — | 0.99 € | — | Rimi |
| Monster aussie lemonade en jook purk 500ml | Energy, sports & iced-tea drinks | — | — | 1.65 € (1.19 € Partner) | Selver |
| Monster Energiajook bad apple 500ml | Energy, sports & iced-tea drinks | 1.79 € | — | 1.69 € (1.19 € Partner) | Selver |
| Monster Energiajook doctor zero 500ml | Energy, sports & iced-tea drinks | 1.79 € | — | 1.69 € (1.19 € Partner) | Selver |
| Monster Energiajook energy 500ml | Energy, sports & iced-tea drinks | 1.79 € | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Monster Energiajook juice monarch 500ml | Energy, sports & iced-tea drinks | 1.79 € | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Monster energiajook mega karb tud 553ml | Energy, sports & iced-tea drinks | — | — | 1.79 € (1.19 € Partner) | Coop + Selver |
| Monster Energiajook rio punch 500ml | Energy, sports & iced-tea drinks | 1.79 € | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Monster Energiajook ultra mega 553ml | Energy, sports & iced-tea drinks | 1.79 € | — | 1.79 € (1.19 € Partner) | Coop |
| Monster Karb energiajook mango loco purk tud 500ml | Energy, sports & iced-tea drinks | — | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Monster Karb energiajook ultra purk tud zero 500ml | Energy, sports & iced-tea drinks | — | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Monster ultra strawberry en jook 500ml | Energy, sports & iced-tea drinks | — | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Monster zero en green jook purk 500ml | Energy, sports & iced-tea drinks | — | — | 1.69 € (1.19 € Partner) | Coop + Selver |
| Nestea Jäätee sidruni 1500ml | Energy, sports & iced-tea drinks | 2.09 € | 2.09 € | — | Barbora + Rimi |
| Nestea Jäätee virsiku 1500ml | Energy, sports & iced-tea drinks | 2.09 € | 2.09 € | — | Barbora + Rimi |
| Nocco Karb cola funts jook tud magusainetega 330ml | Energy, sports & iced-tea drinks | — | — | 2.53 € | Coop |
| Nocco Karb grand sour fun j purk tud 330ml | Energy, sports & iced-tea drinks | — | — | 2.49 € | Coop + Selver |
| Nocco Karb jook berruba fun tud magusainetega 330ml | Energy, sports & iced-tea drinks | — | — | 2.53 € (1.99 € Partner) | Coop |
| Nocco Karb passionite fun jook tud 330ml | Energy, sports & iced-tea drinks | — | — | 2.53 € | Coop |
| Nocco Karb stellar blend funkts jook tud 330ml | Energy, sports & iced-tea drinks | — | — | 2.53 € (1.99 € Partner) | Coop |
| Red bull Energiajook 250ml | Energy, sports & iced-tea drinks | 1.69 € (1.69 € Aitäh) | 0.99 € | 1.68 € | Rimi |
| Red bull Energiajook 355ml | Energy, sports & iced-tea drinks | 2.29 € | 2.29 € | 2.25 € (1.59 € Partner) | Selver |
| Red bull Energiajook 4x250ml | Energy, sports & iced-tea drinks | 5.99 € | 5.99 € | 5.89 € (3.99 € Partner) | Selver |
| Red bull Energiajook apricot purk strawberry 250ml | Energy, sports & iced-tea drinks | — | 0.99 € | 1.68 € | Rimi |
| Red bull Energiajook prk 473ml | Energy, sports & iced-tea drinks | 2.89 € | 2.95 € | 2.99 € | Coop |
| Red bull Energiajook purple edition 250ml | Energy, sports & iced-tea drinks | 1.69 € (1.69 € Aitäh) | 0.99 € | 1.68 € | Rimi |
| Red bull Energiajook sea blue edition 250ml | Energy, sports & iced-tea drinks | — | 0.99 € | — | Rimi |
| Red bull Energiajook suhkruvaba 250ml | Energy, sports & iced-tea drinks | 1.69 € (1.69 € Aitäh) | 0.99 € | 1.68 € | Rimi |
| Red bull Energiajook suhkruvaba 355ml | Energy, sports & iced-tea drinks | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Red bull Energiajook suhkruvaba 473ml | Energy, sports & iced-tea drinks | 2.89 € | — | 2.99 € | Coop |
| Red bull Energiajook suhkruvaba 4x250ml | Energy, sports & iced-tea drinks | — | 5.99 € | 5.89 € (3.99 € Partner) | Selver |
| Red bull Energiajook suhkruvaba purk magusainetega 355ml | Energy, sports & iced-tea drinks | — | — | 2.25 € (1.59 € Partner) | Selver |
| Red bull Energiajook white peach purk 250ml | Energy, sports & iced-tea drinks | — | — | 1.68 € | Selver |
| Red bull Energiajook zero 250ml | Energy, sports & iced-tea drinks | 1.69 € (1.69 € Aitäh) | — | 1.68 € | Selver |
| Starter Energiajook 500ml | Energy, sports & iced-tea drinks | 0.89 € | 0.97 € | 0.95 € | Barbora |
| Abba Lõhepasteet 145g | Fish & seafood | — | 2.65 € | 2.69 € | Coop + Rimi |
| Abba Tuunikalapasteet 145g | Fish & seafood | — | 2.65 € | 2.69 € | Coop + Rimi |
| Briis Anšoovis filee klassikaline 145g | Fish & seafood | 2.05 € | — | 2.05 € | Barbora + Coop + Selver |
| Briis Praetud kilu puhastatud 170g | Fish & seafood | 1.85 € | — | — | Barbora + Coop |
| Briis Praetud räimed tomatikastmes 270g | Fish & seafood | 1.59 € | 2.15 € | 2.05 € | Barbora |
| Briis Vürtsikilud balti 400g | Fish & seafood | 1.95 € | 1.95 € | 1.95 € | Coop |
| Briis Vürtsikilufilee 160g | Fish & seafood | 2.59 € | 2.59 € | 2.59 € | Barbora + Rimi + Selver |
| Briis Vürtsikilufileed õlis 160g | Fish & seafood | — | 2.75 € | 2.75 € | Coop + Rimi + Selver |
| Epinell Grill sardiinid omas mahlas 140g | Fish & seafood | 2.05 € | — | 2.05 € | Barbora + Selver |
| Harbour Lõhepasteet klassikaline 100g | Fish & seafood | — | — | 1.19 € | Selver |
| Kaija Skumbria õlis 240g | Fish & seafood | 3.09 € | 3.09 € | — | Barbora + Rimi |
| Kaija Skumbria omas mahlas 240g | Fish & seafood | 3.05 € | — | 2.89 € | Selver |
| Kaija Skumbria tomatikastmes 240g | Fish & seafood | 3.05 € | — | 2.99 € | Selver |
| Kaija Sprotid õlis 190g | Fish & seafood | 3.45 € | 3.49 € | — | Barbora |
| Kaija Tuunikala õlis 160g | Fish & seafood | 4.49 € | 3.59 € | — | Rimi |
| Kalapallid tomatikastmes stella maris 240g | Fish & seafood | — | — | 1.79 € | Coop |
| Kaluri Heeringafilee juurviljadega tükid 400g | Fish & seafood | — | — | 3.39 € | Coop + Selver |
| Kaluri Praetud kilud koduses 500g | Fish & seafood | 3.89 € | — | — | Barbora + Coop |
| Kaluri Praetud kilud tomatikastmes 500g | Fish & seafood | 3.89 € | — | — | Barbora + Coop |
| Kaluri Praetud räimed koduses 500g | Fish & seafood | 3.79 € | — | 3.69 € (3.29 € Partner) | Selver |
| Kaluri Praetud räimed tomatikastmes 500g | Fish & seafood | 3.89 € | — | 3.89 € (3.29 € Partner) | Barbora + Coop + Selver |
| Kaluri Räimerullid küüsl pipra rose 300g | Fish & seafood | — | — | 4.39 € (3.49 € Partner) | Coop + Selver |
| Kaluri Tallinna kilud 250g | Fish & seafood | 3.09 € | — | 3.09 € | Barbora + Selver |
| Kaluri vinnutatud räim 100g | Fish & seafood | — | 2.39 € | — | Coop |
| Kaluri Vinnutatud särg 200g | Fish & seafood | 5.69 € | 5.69 € | 5.09 € | Selver |
| Kaluri Vürtsikilud 500g | Fish & seafood | 2.39 € | — | 2.39 € | Barbora + Coop + Selver |
| Kaluri Vürtsisilgu filee 100g | Fish & seafood | — | 2.29 € | — | Coop |
| Kapten grant Forellimari 100g | Fish & seafood | — | — | 10.79 € | Selver |
| Kapten grant Heeringafil sibulaga koorekastm 150g | Fish & seafood | — | — | 2.19 € | Selver |
| Kapten grant Heeringafilee vähesoolane 240g | Fish & seafood | 2.49 € | — | 1.99 € | Coop |
| Kapten grant Islandi tursamaks naturaalne 120g | Fish & seafood | — | — | 3.29 € | Selver |
| Kapten grant Lõhe omas mahlas 230g | Fish & seafood | 2.65 € | — | 2.65 € | Barbora + Selver |
| Kapten grant Lõhetükid tomatikastmes 230g | Fish & seafood | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Kapten grant Merekapsasalat 500g | Fish & seafood | — | 2.99 € | 2.85 € | Selver |
| Kapten grant Rollmops heeringast kurgiga 250g | Fish & seafood | — | — | 4.29 € | Coop + Selver |
| Kapten grant Skumbria tomatikastmes 240g | Fish & seafood | 2.45 € | — | 2.45 € | Barbora + Coop + Selver |
| Kapten grant Sprotid õlis 240g | Fish & seafood | 2.79 € | 2.79 € | 2.79 € | Barbora + Rimi + Selver |
| Kapten grant Tallinna kilud 240g | Fish & seafood | 2.69 € | — | 2.69 € | Coop |
| Kapten grant Tuunikala suured soolv 185g | Fish & seafood | — | — | 2.09 € | Selver |
| Kapten grant Tuunikala tükid tomatikastmes 185g | Fish & seafood | — | — | 1.99 € | Selver |
| Kapten grant Vürtsikilufilee 100g | Fish & seafood | 2.99 € | — | 3.05 € | Barbora |
| Koduranna heeringafilee sibula sibulaga 500g | Fish & seafood | — | — | 4.49 € (3.29 € Partner) | Coop |
| Koduranna Räimefilee sibulaga 270g | Fish & seafood | — | 3.29 € | — | Coop |
| Külmsuitsu lõhe viilutatud wool 100g | Fish & seafood | — | — | 4.09 € (2.99 € Partner) | Selver |
| M.v.wool Heik 250g | Fish & seafood | 4.49 € | — | 4.49 € | Barbora + Selver |
| M.v.wool Soolalõhe viilutatud 100g | Fish & seafood | 3.07 € | — | 2.99 € | Selver |
| Marine abc Lõhe omas mahlas 240g | Fish & seafood | 2.79 € | — | — | Coop |
| Marwi Kooritud krevetid soolvees 300g | Fish & seafood | 4.99 € | 4.99 € | — | Barbora + Rimi |
| Marwi Vannamei krevetid tšilli küüslaugu 100g | Fish & seafood | — | 3.99 € | 3.99 € | Rimi + Selver |
| Meremari must kriskal 113g | Fish & seafood | — | 1.99 € | — | Coop |
| Meremari punane kriskal 113g | Fish & seafood | — | 1.99 € | — | Coop |
| Minu Kilu tomatis 240g | Fish & seafood | — | — | 2.19 € | Coop |
| Minu Lõhe omas mahlas supikogu 240g | Fish & seafood | — | — | 2.65 € | Coop + Selver |
| Minu Lõhe tomatikastmes supikogu 240g | Fish & seafood | — | — | 2.65 € | Coop + Selver |
| Minu Praetud räimed tomatikastmes 240g | Fish & seafood | — | 2.55 € | 2.59 € | Rimi |
| Minu Sprotid õlis 240g | Fish & seafood | — | — | 3.25 € | Coop + Selver |
| Minu sprotid tomatikastmes 240g | Fish & seafood | — | — | 3.49 € | Coop |
| Msdm Kalmaariribad suitsu 36g | Fish & seafood | — | 2.19 € | 2.29 € | Rimi |
| Msdm Kuivatatud meritint 36g | Fish & seafood | 2.15 € | 2.15 € | — | Barbora + Rimi |
| Msdm Kuivatatud stauriid soolatud 36g | Fish & seafood | — | — | 1.99 € | Coop + Selver |
| Msdm Kuivatatud tursk vähesoolane lõikudena 36g | Fish & seafood | — | — | 1.99 € | Coop + Selver |
| Msdm tursk kuiv lõik suits vähesool 36g | Fish & seafood | — | — | 1.99 € | Coop |
| Msdm Vürtsikas kalmaar jerky 36g | Fish & seafood | 2.29 € | — | — | Coop |
| Pirate barbarossa Suits sprotid tomatikastmes 250g | Fish & seafood | — | — | 4.99 € | Coop |
| Rannakarbid veinikastmes vilsund kala 350g | Fish & seafood | — | — | 5.49 € | Selver |
| Rannakarbid vilsund kala 350g | Fish & seafood | — | — | 5.49 € | Selver |
| Rannaküla Praetud kilud tomatikastmes 240g | Fish & seafood | 2.25 € | — | — | Barbora + Coop |
| Rannaküla Sprotid õlis 100g | Fish & seafood | — | — | 2.29 € | Coop + Selver |
| Rannaküla Sprotid tomatikastmes 100g | Fish & seafood | — | — | 2.29 € | Coop + Selver |
| Rannaküla Tursamaks 121g | Fish & seafood | 3.49 € | — | — | Coop |
| Soolaforellifilee viil wool 100g | Fish & seafood | — | — | 4.29 € (3.19 € Partner) | Coop + Selver |
| Sprotid suitsutatud pirate barbaross klaaspurk 250g | Fish & seafood | — | — | 4.99 € | Coop |
| Vändra angerjas kalat 450g | Fish & seafood | — | — | 17.35 € | Coop |
| Vändra kalatooted Angerjas 250g | Fish & seafood | — | — | 11.59 € | Coop + Selver |
| Vändra kalatooted Kuumsuitsu angerjas 250g | Fish & seafood | — | — | 14.29 € (9.99 € Partner) | Coop |
| Veladis delikatess krevetimääre 150g | Fish & seafood | — | 2.79 € | — | Coop + Rimi |
| Veladis krevetimääre avokaadoga 150g | Fish & seafood | — | 2.69 € | — | Rimi |
| Vici Atlandi heeringafilee 200g | Fish & seafood | — | — | 2.89 € (2.29 € Partner) | Coop + Selver |
| Vici Atlandi heeringafilee punase sibulaga 200g | Fish & seafood | — | — | 3.39 € (2.29 € Partner) | Coop |
| Vici Atlandi heeringafilee roosakas õlita 200g | Fish & seafood | — | — | 3.09 € (2.29 € Partner) | Coop |
| Vici Heeringafilee 240g | Fish & seafood | 3.39 € | — | 3.39 € | Barbora + Selver |
| Vici Heeringafilee kergsoola 220g | Fish & seafood | 1.99 € | — | 2.85 € | Barbora |
| Vici Heeringafilee rasvane 240g | Fish & seafood | 3.09 € | — | 3.09 € | Barbora + Selver |
| Vici Heeringafilee traditsiooniline 240g | Fish & seafood | 3.19 € | — | 3.19 € | Barbora + Coop + Selver |
| Vici Heeringafilee traditsiooniline 400g | Fish & seafood | 4.99 € | — | 4.99 € | Coop |
| Vici Heeringafilee traditsiooniline õlita 190g | Fish & seafood | — | — | 1.69 € | Selver |
| Vici krabinuudel surimi 200g | Fish & seafood | 3.15 € | — | 2.09 € | Selver |
| Vici Krevetid soolvees 200g | Fish & seafood | — | — | 3.99 € | Selver |
| Vici Külmsuitsu lõhefilee tükk 160g | Fish & seafood | — | — | 5.89 € | Coop + Selver |
| Vici Kuumsuitsu skumbriafilee nahaga 175g | Fish & seafood | 4.89 € | — | 5.89 € | Barbora |
| Vici Lumekrabi pulgad surimist jahut krabim 250g | Fish & seafood | — | — | 4.69 € | Coop |
| Vici Maksikrevetid surimi soolvees 320g | Fish & seafood | 3.99 € | — | 3.99 € | Barbora + Selver |
| Vici riisi köögiv sal surimipulgad köögiviljadega 200g | Fish & seafood | — | — | 2.49 € | Coop |
| Vici surimipulgad surimi kama 180g | Fish & seafood | 3.19 € | — | — | Barbora + Coop |
| Vici surimist liha lumekrabi 120g | Fish & seafood | 2.19 € | — | 1.49 € | Selver |
| Vici surimist pulgad 150g | Fish & seafood | 2.19 € | — | 2.09 € | Coop |
| Vici surimist pulgad 300g | Fish & seafood | 3.99 € | — | 4.09 € | Coop |
| Vici surimist pulgad smart choice 250g | Fish & seafood | 2.49 € | — | 2.49 € (1.69 € Partner) | Coop |
| Vici surimist pulgad smart choice 400g | Fish & seafood | 3.85 € (2.19 € Aitäh) | — | — | Coop |
| Vici Tursamaks 121g | Fish & seafood | 3.29 € | — | 3.29 € | Barbora + Selver |
| Viru rand Heeringafilee tomatimarinaadis 500g | Fish & seafood | — | — | 5.29 € | Coop |
| Viru rand Heeringasalat murulauguga 360g | Fish & seafood | 4.99 € | — | 6.29 € | Barbora |
| Viru rand Praetud räimed koduses 500g | Fish & seafood | 4.29 € (2.99 € Aitäh) | 4.99 € | 4.99 € | Barbora + Coop |
| Viru rand Praetud räimed tomatikastmes 500g | Fish & seafood | 4.29 € (2.99 € Aitäh) | — | 4.69 € | Barbora + Coop |
| Viru rand Praetud räimefileed tarrendis 270g | Fish & seafood | — | — | 3.59 € | Coop + Selver |
| Viru rand Räimerullid küüslaugumarinaadis küüslauguga 400g | Fish & seafood | 4.99 € | — | 5.69 € | Barbora + Coop |
| Viru rand Tallinna kilu filee 100g | Fish & seafood | — | — | 3.29 € | Coop |
| Viru rand Vürtsikilufileed 100g | Fish & seafood | 2.49 € | — | 2.89 € | Barbora + Coop |
| Vr räimerullid juurviljadega 200g | Fish & seafood | — | — | 3.99 € | Coop |
| Wool Angersäga angersäga 250g | Fish & seafood | — | — | 7.69 € (5.99 € Partner) | Selver |
| Zigmas Vähesoolane heeringafilee õlis 240g | Fish & seafood | 2.39 € | 2.49 € | — | Barbora |
| Dan sukker Fariinsuhkur 500g | Flour & sugar | 1.95 € | — | 1.95 € | Barbora + Coop + Selver |
| Dan sukker Hele muscovado suhkur 400g | Flour & sugar | 2.43 € | — | 2.43 € | Barbora + Selver |
| Dan sukker Mini tükksuhkur 500g | Flour & sugar | 1.99 € | — | 1.95 € | Selver |
| Dan sukker Suhkur 1000g | Flour & sugar | — | 0.89 € | 1.11 € | Rimi |
| Dan sukker Suhkur demerara 500g | Flour & sugar | 2.19 € | — | 2.19 € | Barbora + Selver |
| Dan sukker Tuhksuhkur 500g | Flour & sugar | 1.47 € | — | 1.47 € | Barbora + Selver |
| Dansukker Peedisuhkur mahe 750g | Flour & sugar | — | — | 2.79 € | Selver |
| Dansukker Valge suhkur mahe 1000g | Flour & sugar | — | 3.29 € | 3.23 € | Selver |
| Diamant Moosisuhkur 1 1000g | Flour & sugar | — | — | 2.05 € | Coop |
| Diamant Suhkur 1000g | Flour & sugar | 1.62 € | — | 0.69 € | Selver |
| Ekstrapeen suhkur dansukker 1000g | Flour & sugar | — | — | 2.02 € | Selver |
| Jahu-jaan Rukkilinnasejahu mahe 500g | Flour & sugar | — | — | 2.84 € | Coop |
| Jahu-jaan Toortatrajahu mahe 750g | Flour & sugar | — | — | 3.65 € | Coop |
| Kalew Nisujahu T405 1000g | Flour & sugar | — | 1.25 € | 0.99 € | Selver |
| Kalew Nisujahu T405 2000g | Flour & sugar | — | — | 2.35 € | Coop + Selver |
| Kalew Nisujahu T550 1000g | Flour & sugar | — | — | 1.19 € | Coop |
| Kalew Nisujahu T550 2000g | Flour & sugar | — | 2.05 € | 2.33 € | Rimi |
| Kalew Pannkoogijahu 400g | Flour & sugar | — | 2.25 € | — | Coop |
| Kalew rukkikroovjahu 1500g | Flour & sugar | — | — | 1.82 € | Selver |
| Kalew Ülepannikoogijahu 400g | Flour & sugar | — | 2.25 € | 2.15 € | Selver |
| Küpsetussuhkur golden caster billingtons peene 1000g | Flour & sugar | — | — | 4.77 € | Selver |
| Linda Nisujahu T550 1000g | Flour & sugar | — | — | 0.99 € | Selver |
| Marmelaadisuhkur dansukker 330g | Flour & sugar | — | — | 1.41 € | Selver |
| Meira Vanillisuhkur 85g | Flour & sugar | 3.29 € | — | 3.14 € | Selver |
| Santa maria Vanillisuhkur 20g | Flour & sugar | 1.35 € | — | 1.35 € | Barbora + Selver |
| Schär Mix it farina gluteenivaba jahu dr 500g | Flour & sugar | — | — | 2.99 € | Coop + Selver |
| Schär Saiajahu gluteenivaba b dr mix 1000g | Flour & sugar | — | — | 5.49 € | Selver |
| Suhkur demerara billingtons 500g | Flour & sugar | — | — | 2.53 € | Selver |
| Tarretisesuhkur dansukker 350g | Flour & sugar | — | — | 1.82 € | Selver |
| Tartu mill Kaerajahu purukook jahusegu 450g | Flour & sugar | — | — | 1.45 € | Selver |
| Tartu mill Kamajahu 400g | Flour & sugar | — | 1.75 € | 1.78 € | Rimi |
| Tartu mill Plaadikook jahusegu 400g | Flour & sugar | — | — | 2.09 € | Coop + Selver |
| Tartu mill Rukkikama 400g | Flour & sugar | — | 1.69 € | 1.78 € | Rimi |
| Tartu mill Rukkitäisterajahu 1500g | Flour & sugar | 1.79 € | 1.99 € | 1.79 € | Barbora + Selver |
| Tartu mill Rukkitäisterajahu mahe 1500g | Flour & sugar | — | — | 2.59 € | Selver |
| Tartu mill Täistera nisujahu 1000g | Flour & sugar | 1.49 € | — | 1.49 € | Barbora + Selver |
| Tartu mill Vahvlid jahusegu 400g | Flour & sugar | — | — | 2.29 € | Selver |
| Tume tükksuhkur dansukker 500g | Flour & sugar | — | — | 2.56 € | Selver |
| Umami Kookosjahu 300g | Flour & sugar | — | — | 3.14 € | Selver |
| Umami Mandlijahu 300g | Flour & sugar | — | — | 8.53 € | Coop |
| Veski mati Eriti hea nisujahu 1000g | Flour & sugar | 1.45 € | 1.45 € | 1.47 € (1.19 € Partner) | Barbora + Rimi |
| Veski mati Eriti hea nisujahu 2000g | Flour & sugar | 2.65 € | 2.25 € | 2.25 € | Coop |
| Veski mati Isekerkiv jahu 1000g | Flour & sugar | 1.79 € | — | 1.79 € | Barbora + Coop + Selver |
| Veski mati Maisijahu 1000g | Flour & sugar | 1.79 € | 1.89 € | 1.78 € | Selver |
| Veski mati Nisujahu T550 2000g | Flour & sugar | 2.29 € | — | 2.29 € | Barbora + Selver |
| Veski mati Riisijahu 1000g | Flour & sugar | 2.23 € | 2.39 € | 2.23 € | Barbora + Selver |
| Veski mati Täistera kaerajahu 1000g | Flour & sugar | 2.75 € | 2.75 € | 2.75 € | Barbora + Coop + Rimi + Selver |
| Veski mati Täistera odrajahu 1000g | Flour & sugar | 1.55 € | — | 1.51 € | Selver |
| Veski mati Täistera speltajahu 1000g | Flour & sugar | — | — | 2.49 € | Selver |
| Veski mati Täisteraspeltajahu 1000g | Flour & sugar | 2.49 € | 2.69 € | — | Barbora |
| Eesti pagar ciabatta hele 300g | Frozen dough & pastries | 1.37 € | 1.45 € | 1.37 € | Barbora + Selver |
| Eesti pagar ciabatta tume 300g | Frozen dough & pastries | 1.37 € | 1.45 € | 1.37 € | Barbora + Selver |
| Eesti pagar croissant võiga 360g | Frozen dough & pastries | 3.79 € | — | 3.79 € | Barbora + Selver |
| Eesti pagar dallase saiake 480g | Frozen dough & pastries | 4.69 € | — | — | Coop |
| Eesti pagar juusturull 400g | Frozen dough & pastries | 3.85 € | — | 3.85 € | Barbora + Selver |
| Eesti pagar kaneelisaiake 320g | Frozen dough & pastries | 2.89 € | — | 2.89 € | Coop |
| Eesti pagar lihapirukas 400g | Frozen dough & pastries | 2.99 € | — | 3.09 € | Barbora |
| Eesti pagar Maasika toorjuustusaiake 425g | Frozen dough & pastries | — | 4.89 € | 4.36 € | Selver |
| Eesti pagar Mooni martsipanirull 320g | Frozen dough & pastries | — | — | 3.09 € | Coop |
| Eesti pagar pärmi lehttaigen 500g | Frozen dough & pastries | 2.79 € | 2.49 € | — | Rimi |
| Eesti pagar Pärmi lehttaigen võiga 400g | Frozen dough & pastries | — | — | 2.59 € | Selver |
| Eesti pagar Peekoni munapirukas 390g | Frozen dough & pastries | — | — | 4.06 € | Coop |
| Eesti pagar Pikk külmut küüslauguvõidega sai 175g | Frozen dough & pastries | — | — | 0.99 € | Selver |
| Eesti pagar pitsarull 400g | Frozen dough & pastries | 3.75 € | — | 3.75 € (2.79 € Partner) | Barbora + Selver |
| Eesti pagar pitsataigen 600g | Frozen dough & pastries | 1.79 € | — | 1.79 € | Barbora + Selver |
| Eesti pagar Shokolaadisaiake võiga 240g | Frozen dough & pastries | — | — | 2.63 € | Selver |
| Eesti pagar Spinati juustupirukas 360g | Frozen dough & pastries | — | 2.85 € | 3.34 € | Rimi |
| Eesti pagar vaniljesaiake 400g | Frozen dough & pastries | 1.99 € | 2.59 € | 2.94 € | Barbora |
| Eesti pagar viineripirukas 1200g | Frozen dough & pastries | 8.79 € (6.69 € Aitäh) | — | 8.83 € | Barbora |
| Eesti pagar viineripirukas 360g | Frozen dough & pastries | 3.99 € | — | 3.79 € | Coop + Selver |
| Mantinga Hot dog saiake 240g | Frozen dough & pastries | — | — | 1.41 € | Selver |
| Pikk sai maitserohelisega eesti pag 175g | Frozen dough & pastries | — | — | 1.22 € | Selver |
| Vici pitsapõhjad 320g | Frozen dough & pastries | 1.79 € | — | 1.89 € | Barbora |
| Esva kalapulgad 250g | Frozen fish & seafood | 1.99 € | 2.19 € | 2.09 € | Barbora + Coop |
| Esva kalapulgad 450g | Frozen fish & seafood | 3.29 € (2.29 € Aitäh) | 3.59 € | — | Barbora |
| Esva Kalapulgad kiles 400g | Frozen fish & seafood | — | — | 2.29 € | Selver |
| Esva kalapulgad silver 250g | Frozen fish & seafood | 2.89 € | — | 2.89 € (2.25 € Partner) | Barbora + Selver |
| Kalafileepulgad double panko 285g | Frozen fish & seafood | — | 5.15 € | 5.09 € | Coop |
| Marine hiidkrevetisabad koorimata 21 300g | Frozen fish & seafood | — | — | 8.63 € | Coop |
| Marine Krevetid koorimata 90 360g | Frozen fish & seafood | — | — | 7.29 € | Coop |
| Marine Krevetid kooritud 200g | Frozen fish & seafood | — | — | 4.99 € | Selver |
| Saare fishexport Räim 1000g | Frozen fish & seafood | — | 2.99 € | 2.99 € | Rimi + Selver |
| Vici Kalafilee krõbedas paneeringus külmut 400g | Frozen fish & seafood | — | 5.59 € | 3.99 € | Selver |
| Vici Kalafileepalad tempura taignas 300g | Frozen fish & seafood | — | 5.89 € | 5.89 € | Coop |
| Vici kalapulgad muumi 250g | Frozen fish & seafood | 2.29 € | — | 2.39 € | Barbora + Coop |
| Vici kalapulgad smart choice 250g | Frozen fish & seafood | 0.89 € | — | 1.59 € | Barbora |
| Vici Pan kala 800g | Frozen fish & seafood | — | — | 8.99 € | Coop |
| Vici Pan surimikrevetid 170g | Frozen fish & seafood | — | — | 2.29 € | Selver |
| Ardo Lillkapsariis 450g | Frozen vegetables & berries | — | — | 2.63 € | Coop |
| Aviko sibularõngad 450g | Frozen vegetables & berries | 2.99 € | — | — | Barbora + Coop |
| Bauer mustsõstar 300g | Frozen vegetables & berries | 2.75 € | — | 2.23 € | Selver |
| Farm frites Kartuli pannkoogid sibulaga 540g | Frozen vegetables & berries | — | — | 2.71 € | Coop |
| Figuraata maasikaviilud 1000g | Frozen vegetables & berries | — | — | 7.67 € | Coop |
| Figuraata mango kuubikud 1000g | Frozen vegetables & berries | — | — | 7.41 € | Coop |
| Figuraata Vaarikad 1000g | Frozen vegetables & berries | — | — | 14.89 € | Coop |
| Härmavili Aedviljasegu 400g | Frozen vegetables & berries | — | — | 2.08 € | Selver |
| Härmavili ahjuköögiviljad 700g | Frozen vegetables & berries | 4.39 € | — | 3.19 € | Selver |
| Härmavili hakitud spinati portsjonid 300g | Frozen vegetables & berries | — | — | 1.27 € | Coop |
| Härmavili Hernes mais porgand 400g | Frozen vegetables & berries | — | — | 1.92 € | Coop |
| Härmavili Kirsid kivideta 400g | Frozen vegetables & berries | — | — | 3.79 € | Selver |
| Härmavili Köögiviljad kikerhernestega külmut 400g | Frozen vegetables & berries | — | — | 2.26 € | Coop |
| Härmavili Köögiviljad külmut shampinjonidega 400g | Frozen vegetables & berries | — | 2.29 € | 2.26 € (1.75 € Partner) | Coop |
| Härmavili Köögiviljad seemnetega 400g | Frozen vegetables & berries | — | 2.29 € | 2.29 € | Coop |
| Härmavili Köögiviljasegu tervist 400g | Frozen vegetables & berries | — | 1.89 € | 1.92 € | Rimi |
| Härmavili Kultuurmustikad 300g | Frozen vegetables & berries | — | — | 3.40 € | Coop |
| Härmavili maasikas rabarber 300g | Frozen vegetables & berries | 2.69 € | — | 2.69 € (1.89 € Partner) | Coop |
| Härmavili pajaroog 400g | Frozen vegetables & berries | 1.75 € | — | 1.78 € | Barbora |
| Härmavili Porgand lillkapsas brokkoli 400g | Frozen vegetables & berries | — | — | 1.78 € | Selver |
| Härmavili Praadimissegu kartuliga 400g | Frozen vegetables & berries | — | — | 2.12 € (1.59 € Partner) | Coop |
| Härmavili Ühepajatoit 400g | Frozen vegetables & berries | — | — | 1.78 € | Selver |
| Härmavili vaarikad mustikad 300g | Frozen vegetables & berries | 5.89 € | — | 5.89 € | Barbora + Coop + Selver |
| Härmavili wokisegu 400g | Frozen vegetables & berries | 2.19 € | — | 2.19 € | Coop |
| Hortex marjasegu vaarikatega 300g | Frozen vegetables & berries | 2.79 € | — | 3.29 € | Barbora |
| Hortex metsaseened julienne 400g | Frozen vegetables & berries | 2.49 € | 3.65 € | 3.65 € | Barbora |
| Maahärra fit tervisepada 400g | Frozen vegetables & berries | 1.89 € | — | 1.89 € | Barbora + Selver |
| Maahärra kartuli sibulasegu 1000g | Frozen vegetables & berries | 2.89 € | — | 2.94 € | Barbora |
| Maahärra Köögiv praadimiseks aasia maitseaine maitseainetega 400g | Frozen vegetables & berries | — | — | 2.19 € | Coop |
| Maahärra Köögiviljasegu fit 400g | Frozen vegetables & berries | — | 1.49 € | 1.49 € | Rimi + Selver |
| Maahärra lillkapsas ja brokoli 400g | Frozen vegetables & berries | 1.79 € | — | 1.82 € (1.45 € Partner) | Barbora |
| Maahärra marjasegu 300g | Frozen vegetables & berries | 2.59 € | — | 2.59 € | Barbora + Coop + Selver |
| Maahärra Pühapäevapada 400g | Frozen vegetables & berries | — | 1.75 € | 1.72 € | Selver |
| Maahärra seenesegu 400g | Frozen vegetables & berries | 2.99 € | 3.29 € | 3.04 € (2.59 € Partner) | Barbora |
| Ananass kg | Fruits & vegetables | 2.79 € | 2.79 € | 2.29 € | Coop + Selver |
| Apelsin valencia kg | Fruits & vegetables | — | 2.19 € | — | Rimi |
| Austerservikud 300g | Fruits & vegetables | — | — | 3.99 € | Coop |
| Avokaado kg | Fruits & vegetables | 5.99 € | 5.99 € | 6.99 € | Barbora + Coop + Rimi |
| Baby 230g | Fruits & vegetables | — | — | 1.99 € | Coop |
| Baklažaan kg | Fruits & vegetables | 2.19 € | 2.79 € | 3.19 € | Barbora |
| Banaan kg | Fruits & vegetables | 1.29 € | — | 1.29 € | Coop |
| Basiilik grüne fee tk | Fruits & vegetables | — | — | 2.49 € | Coop |
| Bataat kg | Fruits & vegetables | 2.79 € | 2.79 € | 3.99 € | Barbora + Coop + Rimi |
| Brokoli mahe 40g | Fruits & vegetables | — | — | 3.59 € | Coop |
| Dattel 200g | Fruits & vegetables | 0.99 € | — | 1.29 € | Barbora + Coop |
| Eesti and Šampinjonid 500g | Fruits & vegetables | — | 5.79 € | 5.59 € | Selver |
| Eesti and Sibulad peedipulbriga 450g | Fruits & vegetables | — | 2.99 € | 2.99 € | Rimi + Selver |
| Eesti and Soolakurk küüslauguga 300g | Fruits & vegetables | — | — | 3.49 € | Coop |
| Eesti And Soolakurk küüslauguga 500g | Fruits & vegetables | 3.29 € | 3.29 € | — | Barbora + Rimi |
| Eesti and Soolakurk tšilliga 300g | Fruits & vegetables | 3.49 € | — | 3.49 € | Barbora + Selver |
| Granaatõun kg | Fruits & vegetables | 3.49 € | 5.99 € | 5.99 € | Barbora |
| Grüne fee Frillis 1 | Fruits & vegetables | — | — | 2.49 € | Coop |
| Grüne fee Lehtsalat 1 | Fruits & vegetables | — | — | 1.99 € | Coop |
| Grüne fee Meliss 1 | Fruits & vegetables | — | — | 2.39 € | Coop |
| Grüne fee Oregano 1 | Fruits & vegetables | — | — | 2.49 € | Coop |
| Hapukapsas kadarbiku kõõgivili 300g | Fruits & vegetables | — | — | 1.59 € | Coop + Selver |
| Hapukapsas kadarbiku köögivili 500g | Fruits & vegetables | — | — | 1.79 € | Coop + Selver |
| Hapukapsas kadarbiku köögivili 900g | Fruits & vegetables | — | — | 2.45 € | Coop |
| Hapukapsas viibergi 650g | Fruits & vegetables | — | 2.99 € | 3.99 € | Rimi |
| Hapukurk viibergi 400g | Fruits & vegetables | — | 2.99 € | 3.39 € | Coop + Rimi |
| Idusalat mahe 140g | Fruits & vegetables | — | — | 1.79 € | Coop + Selver |
| Idusalat mahe 150g | Fruits & vegetables | 1.99 € | — | 1.99 € | Coop |
| Intsu Kirsstomat 250g | Fruits & vegetables | — | 3.49 € | — | Coop |
| Juurseller kg | Fruits & vegetables | 1.29 € | 1.39 € | — | Barbora |
| Kaalikas kg | Fruits & vegetables | 1.59 € | 1.89 € | — | Coop |
| Kadarbiku Beebiporgand 250g | Fruits & vegetables | 1.79 € | 1.79 € | — | Barbora + Rimi |
| Kadarbiku Hapukapsas 900g | Fruits & vegetables | 2.45 € | 2.45 € | — | Barbora + Rimi |
| Kadarbiku Porgand 500g | Fruits & vegetables | 1.39 € | — | 1.29 € | Coop + Selver |
| Kadarbiku Punapeet 500g | Fruits & vegetables | 1.99 € | — | 1.99 € | Coop |
| Kapsas brüsseli 500g | Fruits & vegetables | — | 2.79 € | 1.99 € | Selver |
| Kapsas hiina kg | Fruits & vegetables | 1.99 € | — | — | Barbora + Coop |
| Kapsas punane kg | Fruits & vegetables | 1.09 € | 1.19 € | — | Coop |
| Kartul punane 2000g | Fruits & vegetables | — | — | 2.99 € | Coop |
| Kartul punane kg | Fruits & vegetables | 0.99 € | 0.99 € | 0.99 € | Barbora + Rimi + Selver |
| Kartul talukartul kollane 2500g | Fruits & vegetables | 3.35 € | 3.59 € | 3.99 € | Coop |
| Kartul talukartul punane 2500g | Fruits & vegetables | 3.59 € | — | 3.59 € | Coop |
| Kartul villeri 2000g | Fruits & vegetables | 2.95 € | 2.95 € | — | Barbora + Rimi |
| Kiivi kg | Fruits & vegetables | 4.99 € | 3.29 € | 4.99 € | Rimi |
| Kiivi kollane 500g | Fruits & vegetables | 4.99 € | — | 5.99 € | Barbora |
| Kirss 250g | Fruits & vegetables | 2.19 € | — | 2.99 € | Barbora |
| Kirss 500g | Fruits & vegetables | 2.99 € | — | 4.99 € | Barbora |
| Kirsstomat punane 250g | Fruits & vegetables | — | — | 2.39 € | Coop |
| Koriander 50g | Fruits & vegetables | — | — | 2.49 € | Coop |
| Kõrvits hokkaido kg | Fruits & vegetables | 1.69 € | 1.59 € | — | Rimi |
| Kõrvits kg | Fruits & vegetables | 1.19 € | 0.79 € | 1.69 € | Rimi |
| Kurk luunja kg | Fruits & vegetables | 2.69 € | 4.29 € | — | Barbora |
| Küüslaugu 200g | Fruits & vegetables | — | 3.69 € | — | Coop |
| Küüslauk kg | Fruits & vegetables | 4.99 € | 4.99 € | 5.99 € | Barbora + Coop + Rimi |
| Küüslauk must 75g | Fruits & vegetables | — | 6.99 € | — | Rimi |
| Läätsede mahe 140g | Fruits & vegetables | — | — | 1.79 € | Coop + Selver |
| Laheotsa Kartul 2000g | Fruits & vegetables | 2.79 € | 2.79 € | — | Barbora + Rimi |
| Laim kg | Fruits & vegetables | — | 4.99 € | — | Coop + Rimi |
| Lehtkapsas 200g | Fruits & vegetables | — | 3.49 € | 3.99 € | Coop |
| Lillkapsas kg | Fruits & vegetables | 3.59 € | 2.19 € | 4.29 € | Rimi |
| Lutserni mahe 100g | Fruits & vegetables | — | — | 1.79 € | Coop + Selver |
| Maasikad 500g | Fruits & vegetables | 4.99 € | 4.79 € | — | Rimi |
| Maitseroheline 100g | Fruits & vegetables | 2.59 € | — | — | Barbora |
| Mango kg | Fruits & vegetables | 4.49 € | — | — | Barbora |
| Mungoa mahe 140g idud | Fruits & vegetables | — | — | 1.79 € | Coop + Selver |
| Mungoa mahe 140g redise | Fruits & vegetables | — | — | 1.79 € | Coop + Selver |
| Mungoa mahe 150g | Fruits & vegetables | — | — | 1.89 € | Coop |
| Murulauk grüne fee tk | Fruits & vegetables | 2.35 € | — | 2.49 € | Coop |
| Nuikapsas kg | Fruits & vegetables | 1.99 € | 1.99 € | 1.99 € | Barbora + Coop + Rimi + Selver |
| Õun golden delicious kg | Fruits & vegetables | 2.89 € | — | — | Barbora |
| Õun granny smith kg | Fruits & vegetables | 2.39 € | — | 3.99 € | Barbora |
| Õun kanzi kg | Fruits & vegetables | 3.99 € (3.19 € Aitäh) | 3.79 € | 3.99 € | Coop |
| Õun paulared kg | Fruits & vegetables | 0.45 € | — | 0.39 € | Selver |
| Õun royal gala kg | Fruits & vegetables | 2.69 € | 1.49 € | — | Rimi |
| Papaia formosa kg | Fruits & vegetables | 8.29 € | 6.99 € | — | Rimi |
| Paprika kollane kg | Fruits & vegetables | 3.99 € | 3.99 € | 3.29 € | Selver |
| Paprika punane kg | Fruits & vegetables | 2.29 € | 2.29 € | 2.29 € | Barbora + Rimi + Selver |
| Paprika roheline kg | Fruits & vegetables | — | — | 2.99 € | Selver |
| Paprika valge kg | Fruits & vegetables | 1.89 € | 2.79 € | 2.79 € | Barbora |
| Peakapsa 300g | Fruits & vegetables | — | — | 3.59 € | Coop |
| Peakapsas kg | Fruits & vegetables | 0.49 € | 0.59 € | 0.35 € | Selver |
| Peet 350g | Fruits & vegetables | 0.75 € | 0.99 € | — | Barbora |
| Peet mõisaproua 500g | Fruits & vegetables | — | — | 1.45 € | Selver |
| Peet punane kg | Fruits & vegetables | — | 0.79 € | — | Coop |
| Peipsi Hapukurk 400g | Fruits & vegetables | 1.99 € | — | — | Barbora |
| Peipsi Hapukurk 500g | Fruits & vegetables | 4.19 € | — | 4.19 € | Coop |
| Peipsi Kurk 500g | Fruits & vegetables | — | — | 5.99 € | Coop |
| Petersell grüne fee tk | Fruits & vegetables | — | — | 2.39 € | Coop |
| Piparmünt grüne fee tk | Fruits & vegetables | 2.35 € | 2.39 € | 2.39 € | Coop |
| Pirn conference kg | Fruits & vegetables | 1.99 € | — | — | Coop |
| Pirn guyot kg | Fruits & vegetables | 2.59 € | 2.99 € | 2.99 € | Coop |
| Ploom tume kg | Fruits & vegetables | 1.99 € | 0.99 € | — | Rimi |
| Ploomtomat 500g | Fruits & vegetables | 2.99 € | 3.99 € | — | Barbora |
| Pomel kg | Fruits & vegetables | 2.99 € | 2.99 € | — | Barbora + Rimi |
| Porgand 200g | Fruits & vegetables | 1.29 € | — | 2.49 € | Barbora |
| Porgand ahjusegu 700g | Fruits & vegetables | — | — | 2.99 € | Coop |
| Porgand kg | Fruits & vegetables | — | 0.50 € | 0.45 € | Selver |
| Porgand laheotsa 500g | Fruits & vegetables | — | — | 1.49 € | Coop |
| Porgand saaremaa 500g | Fruits & vegetables | — | 1.29 € | 1.57 € | Coop + Rimi |
| Redis 125g | Fruits & vegetables | — | 0.85 € | 0.99 € | Rimi |
| Redis punane 500g | Fruits & vegetables | — | — | 1.99 € | Coop + Selver |
| Redis valge kg | Fruits & vegetables | — | — | 2.99 € | Coop |
| Rosmariin 50g | Fruits & vegetables | — | — | 2.49 € | Coop |
| Salat korea 380g | Fruits & vegetables | — | — | 2.69 € | Coop |
| Salatisegu 120g | Fruits & vegetables | — | 1.89 € | — | Coop + Rimi |
| Salatisibul kg | Fruits & vegetables | 1.89 € | 1.89 € | 1.89 € | Barbora + Rimi + Selver |
| Särtsakas peedisalat koriandriga 450g | Fruits & vegetables | 2.59 € | 2.59 € | — | Barbora + Rimi |
| Seen 300g | Fruits & vegetables | — | — | 3.39 € | Coop |
| Shampinjonid 200g | Fruits & vegetables | — | — | 2.59 € | Coop |
| Shampinjonid 230g pruunid | Fruits & vegetables | — | — | 2.59 € | Coop |
| Shampinjonid 230g valged | Fruits & vegetables | — | — | 2.19 € | Coop |
| Shimeji 150g | Fruits & vegetables | — | 2.09 € | — | Coop + Rimi |
| Sibul kg | Fruits & vegetables | 0.37 € | 0.37 € | — | Barbora + Rimi |
| Sibul punane 400g | Fruits & vegetables | 2.55 € (1.89 € Aitäh) | 2.39 € | — | Rimi |
| Sibul punane kg | Fruits & vegetables | — | 1.59 € | 0.99 € | Selver |
| Sibul võrgus kg | Fruits & vegetables | 0.75 € | 2.99 € | — | Barbora |
| Sidrun eureka kg | Fruits & vegetables | — | 2.29 € | 2.49 € | Rimi |
| Sidrun kg | Fruits & vegetables | 2.39 € | — | — | Coop |
| Sidrunhein 50g | Fruits & vegetables | — | — | 1.99 € | Selver |
| Spargel 250g | Fruits & vegetables | 5.99 € | — | 6.58 € | Barbora |
| Spinat grüne fee tk | Fruits & vegetables | 2.35 € | — | 2.39 € | Coop |
| Till grüne fee tk | Fruits & vegetables | — | — | 2.29 € | Coop |
| Tomat kg | Fruits & vegetables | 1.79 € | 1.99 € | — | Barbora |
| Tomat kollane kg | Fruits & vegetables | 3.99 € | — | 3.99 € | Barbora + Selver |
| Tšillipipar punane kg | Fruits & vegetables | — | 7.99 € | 7.99 € | Rimi + Selver |
| Vaarikad 125g | Fruits & vegetables | — | — | 4.99 € | Selver |
| Vaarikatomat kg | Fruits & vegetables | 2.99 € | 2.59 € | — | Rimi |
| Viibergi Hapukurgiviilud küüslauguga 400g | Fruits & vegetables | — | — | 3.49 € | Coop |
| Viinamari hele thompson 500g | Fruits & vegetables | — | — | 2.99 € | Coop + Selver |
| Viinamari red globe punane kg | Fruits & vegetables | 3.99 € | — | 3.99 € | Barbora + Selver |
| Virsik kg | Fruits & vegetables | — | 2.99 € | 3.99 € | Coop + Rimi |
| Virsik paraguayo kg | Fruits & vegetables | — | — | 3.29 € | Selver |
| Chef lunden Kanamaksapasteet 200g | Ham & cold cuts | 2.59 € | — | 2.59 € | Barbora + Selver |
| Chef lunden Kodune pasteet 200g | Ham & cold cuts | — | 2.65 € | 2.59 € | Coop |
| Chef lunden Pardimaksapasteet 200g | Ham & cold cuts | 3.99 € | — | — | Coop |
| Chef lunden Vasikamaksapasteet 200g | Ham & cold cuts | 3.09 € | — | — | Coop |
| Chef lunden Veisemaksapasteet 200g | Ham & cold cuts | 2.99 € | — | — | Barbora + Coop |
| Frank pott Hautatud kanalihaga konserv 240g | Ham & cold cuts | — | 2.09 € | — | Coop |
| Frank pott Hautatud sealihaga konserv 240g | Ham & cold cuts | — | 1.89 € | 1.79 € | Coop + Selver |
| Frank pott Hautatud veiselihaga konserv 240g | Ham & cold cuts | — | — | 1.89 € | Coop |
| Frank pott Kanamaksapasteet 240g | Ham & cold cuts | — | 1.99 € | — | Coop |
| Frank pott Turistieine 325g | Ham & cold cuts | — | 2.29 € | 2.39 € | Coop |
| Frank pott Vürtsisealiha vürtsisealihaga 325g | Ham & cold cuts | 2.29 € | 2.09 € | 2.39 € | Coop |
| Karni Broileri rinnalihasink viil 300g | Ham & cold cuts | 2.77 € | 3.69 € | 3.69 € | Barbora |
| Karni Broilerilihasült 270g | Ham & cold cuts | 2.45 € | — | — | Coop |
| Karni Karbonaad viil 120g | Ham & cold cuts | — | — | 2.29 € | Coop |
| Karni Pasteet 170g | Ham & cold cuts | — | 1.95 € | 1.89 € | Coop + Selver |
| Karni S k kuningate sink viilutatud 120g | Ham & cold cuts | — | 2.49 € | 2.49 € | Coop |
| Karni Veise pipraliha viil 120g | Ham & cold cuts | — | — | 4.05 € | Coop |
| Liivimaa lihaveise liha omas mahlas 240g | Ham & cold cuts | — | — | 4.19 € | Selver |
| Liivimaa lv vürtsikas lihaveise liha laktoosivaba 240g | Ham & cold cuts | — | — | 4.19 € | Selver |
| Linnamäe Kana kintsuliha omas mahlas 240g | Ham & cold cuts | — | — | 3.49 € | Coop + Selver |
| Linnamäe lihaveise sink pipradekoor pipradekooriga 100g | Ham & cold cuts | — | — | 3.99 € | Coop + Selver |
| Linnamäe Maasuitsu fileesink viil 135g | Ham & cold cuts | — | 2.75 € | — | Coop |
| Linnamäe Metssealiha konserv 240g | Ham & cold cuts | 4.79 € | 4.79 € | 4.79 € | Coop |
| Linnamäe Põdralihaga pasteet põdralihaga 240g | Ham & cold cuts | — | — | 3.09 € | Coop |
| Linnamäe Reservväelaste konserv 240g | Ham & cold cuts | 3.75 € | — | 3.75 € | Coop |
| Linnamäe sealiha omas mahlas 240g | Ham & cold cuts | — | — | 3.29 € | Coop + Selver |
| Maks & moorits Delikatess sink tailihast viil 170g | Ham & cold cuts | 1.99 € | — | 2.49 € (1.99 € Partner) | Barbora |
| Maks & moorits Einepeekon viil 150g | Ham & cold cuts | 1.99 € | — | — | Barbora + Coop |
| Maks & moorits Kanafileesink viil 150g | Ham & cold cuts | 1.42 € | — | 1.29 € | Selver |
| Maks & moorits Kanalihasült 300g | Ham & cold cuts | 2.99 € | — | 2.99 € | Barbora + Selver |
| Maks & moorits Kodusült 300g | Ham & cold cuts | 1.89 € | — | 2.39 € | Barbora |
| Maks & moorits Kreemjas kodupasteet 210g | Ham & cold cuts | 1.59 € | 1.59 € | 1.62 € | Barbora + Rimi |
| Maks & moorits Maakodu suitsusink | Ham & cold cuts | 7.99 € | — | 9.99 € | Barbora |
| Maks & moorits Maamehesink | Ham & cold cuts | 12.69 € | — | 12.45 € (8.99 € Partner) | Selver |
| Maks & moorits Maasuitsu fileesink | Ham & cold cuts | 11.99 € | — | 11.99 € | Barbora + Selver |
| Maks & moorits Õrnsuitsu sisefilee kuubikud 200g | Ham & cold cuts | 1.99 € | — | 2.49 € | Barbora |
| Maks & moorits Peekon viil 100g | Ham & cold cuts | 2.59 € | — | 2.39 € (1.99 € Partner) | Coop + Selver |
| Maks & moorits Pitsasink 250g | Ham & cold cuts | 2.09 € | 1.89 € | 1.59 € | Selver |
| Maks & moorits Pühajärve sink 300g | Ham & cold cuts | 2.54 € | 3.39 € | 2.99 € | Barbora |
| Maks & moorits Sealihasült 300g | Ham & cold cuts | 1.89 € | — | 2.38 € | Barbora |
| Maks & moorits Seavälisfileesink viil 150g | Ham & cold cuts | 1.79 € | 2.39 € | 2.39 € | Coop |
| Maks & moorits Talusink viil 150g | Ham & cold cuts | 1.79 € | 2.39 € | 2.19 € (1.69 € Partner) | Barbora |
| Maks & moorits Veisemaksapasteet 210g | Ham & cold cuts | 1.59 € | — | 1.72 € | Coop |
| Maks&moorits Kalkunifileesink viil 170g | Ham & cold cuts | — | — | 2.49 € | Coop + Selver |
| Maks&moorits Suitsusink õhemast õhem viil 170g | Ham & cold cuts | — | — | 2.49 € | Coop + Selver |
| Matsimoka Küüslaugupekk viil 110g | Ham & cold cuts | 1.85 € | 1.85 € | — | Barbora + Rimi |
| Matsimoka Pasteet 170g | Ham & cold cuts | 2.29 € | 2.29 € | 2.29 € (1.59 € Partner) | Barbora + Rimi + Selver |
| Matsimoka Suitsuliha viilutatud 110g | Ham & cold cuts | — | 2.39 € | 2.45 € | Rimi |
| Matsimoka Sült naturaalse kallerdisega 320g | Ham & cold cuts | — | 2.99 € | 4.26 € | Rimi |
| Minu Turistieine sealihast 250g | Ham & cold cuts | — | 2.05 € | — | Coop |
| Minu Turistieine sealihast de lux 525g | Ham & cold cuts | 4.79 € | 4.79 € | — | Coop |
| Nõo Delikatess sült 300g | Ham & cold cuts | 2.45 € | 2.55 € | — | Barbora |
| Nõo Hommikupeekon viil 135g | Ham & cold cuts | 2.55 € | 1.79 € | 2.65 € | Rimi |
| Nõo Kalkunisink fitlap viil 105g | Ham & cold cuts | 1.87 € | — | 2.53 € (1.69 € Partner) | Barbora |
| Nõo Kanasink fitlap viil 105g | Ham & cold cuts | 1.61 € | 1.79 € | 2.23 € (1.49 € Partner) | Barbora |
| Nõo Kanasült fitlap 300g | Ham & cold cuts | 2.89 € | 2.89 € | — | Barbora + Rimi |
| Nõo Kodune maksapasteet 200g | Ham & cold cuts | 2.15 € | — | 2.15 € | Barbora + Coop + Selver |
| Nõo Maamehesink viil 105g | Ham & cold cuts | — | — | 2.90 € (1.59 € Partner) | Coop |
| Nõo Maksapasteet delikatess 200g | Ham & cold cuts | 1.95 € | 1.95 € | 2.19 € | Coop |
| Nõo Pitsakate 300g | Ham & cold cuts | 3.29 € | 3.29 € | 3.29 € | Barbora + Rimi + Selver |
| Nõo Rulaad viil 135g | Ham & cold cuts | 2.49 € | — | 2.49 € | Coop |
| Nõo Seakõrvasnäkid 130g | Ham & cold cuts | 2.39 € | 2.79 € | 3.10 € | Barbora |
| Nõo Suitsupõsk | Ham & cold cuts | 8.19 € | — | 9.14 € (5.99 € Partner) | Barbora |
| Nõo Suitsutatud seakaelakarbonaad viil 135g | Ham & cold cuts | — | — | 2.69 € (1.59 € Partner) | Coop + Selver |
| Nõo Suitsutatud seakeel 200g | Ham & cold cuts | 2.69 € | — | 2.79 € | Coop |
| Nõo Suur sült memme 500g | Ham & cold cuts | 4.29 € | — | 4.29 € (2.99 € Partner) | Barbora + Selver |
| Nõo Toorsuitsupeekon viil 105g | Ham & cold cuts | 2.35 € | — | — | Coop |
| Nõo Veisesink liivimaa viil 100g | Ham & cold cuts | 2.24 € | — | — | Barbora |
| Oskar E vaba maksapasteet 200g | Ham & cold cuts | 1.89 € | 1.89 € | — | Coop |
| Oskar Eri suitsupeekon viil 120g | Ham & cold cuts | 2.49 € | — | — | Coop |
| Oskar Küüslaugukülg viil 200g | Ham & cold cuts | 2.59 € | — | — | Coop |
| Oskar Lõuna keedusink viil 300g | Ham & cold cuts | — | — | 3.13 € | Coop |
| Oskar Sealihasült 330g | Ham & cold cuts | 3.05 € (2.15 € Aitäh) | 3.05 € | — | Coop |
| Oskar Seljafilee viil 105g | Ham & cold cuts | 2.19 € | — | — | Coop |
| Oskar Singikreem 200g | Ham & cold cuts | 1.59 € | — | — | Barbora + Coop |
| Rakvere Inglisepärane toorsuitsupeekon viil 150g | Ham & cold cuts | — | 2.89 € | 2.94 € | Coop |
| Rakvere Kreemjas maksapasteet 300g | Ham & cold cuts | 1.99 € | 1.99 € | — | Coop |
| Rakvere Küpsetatud maksapasteet rõõsa koorega 200g | Ham & cold cuts | — | — | 2.39 € | Coop |
| Rakvere Maksarõngas 300g | Ham & cold cuts | 1.75 € | — | — | Barbora |
| Rakvere Õhuline hommikusink viil 200g | Ham & cold cuts | 1.72 € | — | — | Barbora |
| Rakvere Õhuline viru sink viil 150g | Ham & cold cuts | 1.27 € | — | 1.72 € | Barbora |
| Rakvere Prosciutto peekon viilutatud 140g | Ham & cold cuts | — | 2.59 € | 2.59 € | Coop |
| Rakvere Seavälisfilee suitsutatud 130g | Ham & cold cuts | — | 2.39 € | 11.99 € | Rimi |
| Rakvere Serrano sink viil 105g | Ham & cold cuts | — | — | 4.67 € | Coop |
| Rakvere Snäkk pro ribisnäkk 300g | Ham & cold cuts | 3.45 € | 3.45 € | 3.45 € | Barbora + Rimi + Selver |
| Rakvere Suitsurulaad viil 130g | Ham & cold cuts | 1.87 € | — | — | Barbora |
| Rakvere Suitsusingike viil 130g | Ham & cold cuts | 1.72 € | — | — | Barbora |
| Rakvere Suitsusink 350g | Ham & cold cuts | 4.29 € | 3.85 € | — | Rimi |
| Rakvere Suitsutatud seavälisfilee viil 130g | Ham & cold cuts | — | — | 2.45 € | Selver |
| Rakvere Talurulaad 350g | Ham & cold cuts | 3.29 € | — | 3.34 € (2.59 € Partner) | Barbora |
| Rakvere Toorsuitsupeekon ameerikapärane 150g | Ham & cold cuts | — | 2.85 € | 2.99 € | Coop |
| Rakvere Toorsuitsupeekoni kuubikud 140g | Ham & cold cuts | 2.19 € | 2.09 € | 2.19 € | Rimi |
| Rakvere Viru sink viil 300g | Ham & cold cuts | 2.59 € | — | — | Barbora |
| Rakvere Võileivapeekon 130g | Ham & cold cuts | 2.59 € | — | 2.63 € | Coop |
| Rannamõisa Kanalihasült 330g | Ham & cold cuts | 3.19 € | — | — | Coop |
| Rannarootsi Ehe seasink välisfileest viil 120g | Ham & cold cuts | — | 1.89 € | 1.69 € | Selver |
| Rannarootsi Ehe veisesink välisfileest viil 120g | Ham & cold cuts | — | 3.09 € | 3.15 € | Coop |
| Rannarootsi Hirveliha omas mahlas 240g | Ham & cold cuts | — | 3.59 € | 3.65 € | Coop |
| Rannarootsi Kanaliha omas mahlas 240g | Ham & cold cuts | — | — | 3.09 € | Coop |
| Rannarootsi Kodune pasteet 180g | Ham & cold cuts | 1.39 € | — | 1.09 € | Selver |
| Rannarootsi Maarahva suitsukülg viil 120g | Ham & cold cuts | — | — | 2.29 € | Coop |
| Rannarootsi Maksapasteet 240g | Ham & cold cuts | 1.85 € | — | 1.89 € | Barbora |
| Rannarootsi Sealiha omas mahlas 240g | Ham & cold cuts | 2.89 € | — | 2.99 € | Coop |
| Rannarootsi Sealihasült 330g | Ham & cold cuts | 2.75 € | 2.59 € | 2.79 € | Coop |
| Rannarootsi Seasink viil 150g | Ham & cold cuts | 1.49 € | — | — | Barbora |
| Rannarootsi Seavälisfilee suitsusink viil 150g | Ham & cold cuts | — | — | 2.29 € | Coop + Selver |
| Rannarootsi Suitsukont 1500g | Ham & cold cuts | — | — | 3.99 € | Coop |
| Rannarootsi Turistieine 240g | Ham & cold cuts | — | 2.89 € | 2.99 € | Rimi |
| Rannarootsi Vasikamaksapasteet 180g | Ham & cold cuts | — | — | 1.59 € | Coop |
| Rannarootsi Veiseliha omas mahlas 240g | Ham & cold cuts | 2.89 € | 2.89 € | 2.99 € | Coop |
| Rr vasikalihasült 330g | Ham & cold cuts | — | — | 3.55 € | Coop |
| Tallegg Delikatessrulaad 500g | Ham & cold cuts | 6.79 € | 6.79 € | 2.84 € | Selver |
| Tallegg Kanafileesink fit viil 130g | Ham & cold cuts | 1.42 € | 1.89 € | 1.89 € | Barbora |
| Tallegg Kanasigar 200g | Ham & cold cuts | 2.99 € | 2.79 € | — | Rimi |
| Tallegg Kanasink tilliga viil 130g | Ham & cold cuts | 1.27 € | 1.69 € | 1.72 € | Barbora |
| Tallegg Kanasink viil 300g | Ham & cold cuts | 3.14 € | — | — | Coop |
| Tallegg klassikaline kanarulaad 400g | Ham & cold cuts | 3.99 € | 4.99 € | — | Barbora |
| Tallegg Suitsukanakuubikud 300g | Ham & cold cuts | 4.35 € | — | 4.39 € | Barbora |
| Ace Pesuvalgendaja regular 1000ml | Household | — | — | 2.19 € | Selver |
| Ace Plekieemaldaja colors pesule värv 1000ml | Household | — | — | 5.59 € | Selver |
| Air wick Air freshmatic citrus täide 250ml | Household | — | — | 6.99 € | Selver |
| Air wick Air freshmatic maui mango õ v 250ml | Household | — | — | 9.99 € | Coop |
| Air wick Air rainy eucal fr värsk õ 236ml | Household | — | — | 6.59 € (4.49 € Partner) | Coop |
| Air wick Õ v cool raspberries lime 236ml | Household | — | — | 6.59 € (4.49 € Partner) | Coop |
| Air wick Õ v fresh dew white jasmine 236ml | Household | — | — | 6.59 € (4.49 € Partner) | Coop |
| Air wick Õ v pure spring delight 250ml | Household | — | — | 5.99 € | Coop |
| Ajax Klaasipuhastusvahend crystal 7 500ml | Household | — | — | 3.59 € | Coop |
| Ajax Puhastussprei lavender sandalwood 500ml | Household | — | — | 5.79 € | Coop + Selver |
| Ajax puhastusvahend universaalne 750ml | Household | — | 6.29 € | — | Rimi |
| Ajax Üldpuhastusvahend floral fiesta roheline 1000ml | Household | — | — | 3.79 € | Coop + Selver |
| Ajax Üldpuhastusvahend peach blossom 1000ml | Household | 3.69 € | 3.99 € | 2.59 € | Selver |
| Ambi pur Õhuvärskendaja ocean mist 185ml | Household | 6.59 € | — | 6.49 € | Selver |
| Ariel mountain spring p geel kaps 44tk | Household | — | — | 25.90 € | Coop + Selver |
| Ariel pesugeel color pesu 40 1800ml | Household | — | — | 17.99 € | Coop + Selver |
| Ariel Pesugeel color pk 1125ml | Household | 13.59 € | 12.99 € | — | Rimi |
| Ariel Pesugeel color pk 1800ml | Household | 17.99 € | 17.99 € | — | Barbora + Rimi |
| Ariel Pesugeel gold orchid pk 1575ml | Household | 17.99 € | 19.99 € | — | Barbora |
| Ariel Pesugeel gold orchid pk 2250ml | Household | 24.89 € | 26.29 € | — | Barbora |
| Ariel Pesugeel kapslid color 22tk | Household | — | — | 16.99 € | Selver |
| Ariel Pesugeel kapslid color 30tk | Household | — | — | 19.59 € | Selver |
| Ariel Pesugeel kapslid color 44tk | Household | — | — | 25.90 € | Coop + Selver |
| Ariel Pesugeel kapslid extra clean 26tk | Household | — | — | 19.59 € | Selver |
| Ariel Pesugeel kapslid mountain spring 22tk | Household | — | — | 10.99 € | Selver |
| Ariel Pesugeel mountain spring pk 1800ml | Household | 18.29 € | 17.99 € | — | Rimi |
| Ariel Pesugeel sensitive pk 1125ml | Household | 13.59 € | 12.99 € | — | Rimi |
| Ariel Pesupulber color pesukorda 6 330g | Household | — | — | 4.06 € | Selver |
| Ariel Pesupulber color pk 1100g | Household | 10.99 € | — | 10.99 € | Barbora + Selver |
| Ariel Pesupulber mountain spring pesukorda 1100g | Household | — | — | 10.99 € | Selver |
| Aw fresh smooth satin moon lilly 250ml | Household | — | — | 9.99 € | Coop |
| Bref brilliant arc ocean wc värsk 3x42g | Household | — | — | 8.12 € | Coop |
| Bref duo cubes original wc värsk 2x50g | Household | — | — | 3.79 € | Selver |
| Bref power aktiv lavender wc värsk 2x50g | Household | — | 5.29 € | 5.29 € (3.29 € Partner) | Coop |
| Bref power aktiv lavender wc värsk 3x50g | Household | — | 6.89 € | — | Coop |
| Bref Wc värsk power aktiv lemon duo pack 2x50g | Household | — | — | 5.29 € (3.29 € Partner) | Coop |
| Bref Wc värskendaja brilliant gel spring rain 2x42g | Household | — | — | 6.49 € (3.59 € Partner) | Coop |
| Bref Wc värskendaja brilliant ocean arc gel 2x42g | Household | — | — | 6.49 € (3.89 € Partner) | Coop |
| Bref Wc värskendaja color auto active eucalyp 2x50g | Household | — | — | 5.99 € | Coop |
| Bref Wc värskendaja color auto active eucalyp 3x50g | Household | — | — | 7.99 € | Coop |
| Bref Wc värskendaja color auto active eucalyp 4x50g | Household | — | — | 10.99 € (6.19 € Partner) | Coop |
| Bref Wc värskendaja color auto active flower 2x50g | Household | — | — | 5.99 € | Coop |
| Bref Wc värskendaja color auto active flower 3x50g | Household | — | — | 7.99 € | Coop |
| Bref Wc värskendaja color auto active flower 4x50g | Household | — | — | 10.99 € (6.19 € Partner) | Coop |
| Bref Wc värskendaja color auto active lavend 2x50g | Household | — | — | 6.29 € | Coop |
| Bref Wc värskendaja deluxe magnolia 2x50g | Household | 6.49 € | — | — | Coop |
| Bref Wc värskendaja deluxe magnolia 3x50g | Household | 8.19 € | — | — | Coop |
| Bref Wc värskendaja power aktiv fruitopia 3x50g | Household | — | — | 6.89 € | Coop |
| Bref Wc värskendaja spa moments vitality 2x50g | Household | — | — | 6.39 € | Coop |
| Bref wellness harmony wc värsk 3x50g | Household | — | — | 8.12 € (4.89 € Partner) | Coop |
| Calgon Veepehmendaja pesumasinale 500g | Household | — | — | 7.49 € | Coop |
| Calgon Veepehmendi 1000g | Household | 12.19 € | — | 11.99 € (8.99 € Partner) | Selver |
| Calgon Veepehmendi tabletid 15tk | Household | — | — | 11.99 € | Selver |
| Calgon Veepehmendusgeel 750ml | Household | — | — | 11.99 € (8.99 € Partner) | Selver |
| Cif Puhastuskreem lemon 300g | Household | — | — | 1.19 € | Selver |
| Cif Puhastusvahend köögile 500ml | Household | — | 4.69 € | — | Coop + Rimi |
| Cif Vannitoa puhastusvahend 500ml | Household | 4.69 € | — | — | Barbora + Coop |
| Cillit bang Cillit bleach hygiene puh vah 750ml | Household | — | — | 9.19 € | Coop |
| Cillit bang Cillit rasvaeemaldaja 750ml | Household | — | — | 9.19 € | Coop |
| Cillit bang Puh naturally pow vah vannitoa 750ml | Household | — | — | 9.19 € (4.99 € Partner) | Coop |
| Cillit bang Puhastusvahend vannitoale 750ml | Household | — | — | 9.19 € | Coop |
| Cillit bang Puhastusvaht vannitoale 600ml | Household | — | — | 9.19 € | Coop |
| Clin Klaasipuhastusvahend anti fog 500ml | Household | 3.35 € | — | 3.34 € | Coop |
| Domestos power fresh lime wc geel 700ml | Household | — | — | 2.39 € | Selver |
| Domestos Wc puhastusvahend citrus 750ml | Household | — | — | 1.89 € | Selver |
| Domestos Wc puhastusvahend pine fresh 750ml | Household | — | — | 3.89 € (2.09 € Partner) | Coop |
| Domestos Wc värskendaja p lime 3x50g | Household | 3.59 € | 5.99 € | — | Barbora |
| Domestos Wc värskendaja pine täide 35g | Household | 0.95 € | — | 1.59 € | Barbora |
| Dr.beckmann Külmkapivärskendi mr magic lemon 40g | Household | — | — | 5.28 € | Selver |
| Dr.beckmann Puhastuskreem pliidile pin r v 250ml | Household | — | — | 4.67 € | Selver |
| Dr.beckmann Puhastuspulber pesumasinale 250g | Household | — | — | 4.46 € | Selver |
| Elise alumiiniumfooliumvormid 4 1500ml | Household | — | — | 2.33 € | Coop |
| Elise alumiiniumfooliumvormid 6 850ml | Household | — | — | 2.02 € | Coop |
| Eres Puhastusvahend pliidile keraam pihust 500ml | Household | — | — | 7.31 € | Coop |
| Fairy Nõudep M kapslid platinum plus lemon 71tk | Household | — | — | 36.90 € | Selver |
| Fairy Nõudep mas kapslid platinum lemon 45tk | Household | — | — | 21.90 € | Selver |
| Fairy Nõudep masina kaps platinum lemon 81tk | Household | — | — | 41.90 € | Selver |
| Fairy Nõudepesuvahend apple 900ml | Household | 4.79 € | 3.79 € | — | Rimi |
| Fairy Nõudepesuvahend citrus 650ml | Household | — | 3.05 € | 3.59 € (2.59 € Partner) | Rimi |
| Fairy Nõudepesuvahend lemon 1350ml | Household | 6.69 € | 6.99 € | 6.69 € (4.69 € Partner) | Barbora + Selver |
| Fairy Nõudepesuvahend lemon 450ml | Household | 2.55 € (1.99 € Aitäh) | — | 2.89 € | Coop |
| Fairy Nõudepesuvahend lemon 900ml | Household | 4.79 € | — | 4.79 € | Barbora + Selver |
| Fairy Nõudepesuvahend pomegranate 450ml | Household | 2.55 € | 2.55 € | — | Barbora + Rimi |
| Fairy Nõudepesuvahend pomegranate 900ml | Household | 4.79 € | 4.19 € | — | Rimi |
| Fairy Nõudepesuvahend pure clean 450ml | Household | — | — | 2.79 € | Selver |
| Fairy Nõudepesuvahend pure clean 900ml | Household | 4.79 € | — | 3.19 € | Selver |
| Fairy Nõudepesuvahend sensitive teatree mint 450ml | Household | — | — | 2.89 € | Selver |
| Fairy Nõudepesuvahend sensitive teatree mint 900ml | Household | — | — | 4.79 € | Selver |
| Finish Nõude mas geel all in eco 0% 900ml | Household | — | — | 25.90 € | Coop |
| Finish Nõudep mas loputusvahend max 800ml | Household | — | — | 8.63 € | Selver |
| Finish Nõudep masina loputusvahend 400ml | Household | — | 5.79 € | 5.79 € | Rimi + Selver |
| Finish Nõudep masina puhastusvahend 250ml | Household | — | — | 8.63 € (5.99 € Partner) | Selver |
| Finish Nõudepesumasina sool 1500g | Household | 3.57 € | 5.59 € | 5.79 € | Barbora |
| Finish Nõudepesumasina sool 4000g | Household | 5.51 € | 5.69 € | — | Barbora |
| Finish quantum lemon nõudep tab 60tk | Household | — | — | 37.90 € | Coop |
| Flora Majapidamisseep kiles 72% 185g | Household | — | — | 1.72 € | Selver |
| Flora Seep plekieemaldi sapiga 90g | Household | — | 1.39 € | — | Coop + Rimi |
| Frosch Nõudepesupalsam granaatõun 500ml | Household | 2.29 € | — | — | Coop |
| Frosch Nõudepesuvahend citrus 500ml | Household | — | — | 1.39 € | Selver |
| Frosch pesugeel aloe vera 1500ml | Household | — | 9.39 € | 8.69 € | Coop |
| Frosch Pesuloputusvahend aloe vera pesu 750ml | Household | — | — | 2.79 € | Selver |
| Frosch Puh vahend keraam induktsioonpliit sidruniga 300ml | Household | — | — | 3.79 € | Selver |
| Frosch Üldpuhastusvahend apelsin 500ml | Household | 3.39 € | — | — | Barbora + Coop |
| Glade Õhuvärskend t f pure clean linen täide 10ml | Household | — | — | 2.73 € | Coop |
| Glade Õhuvärskendaja one touch citrus hoidjaga 10ml | Household | — | — | 3.34 € | Selver |
| Glade Õhuvärskendaja one touch sidrun täide 10ml | Household | — | — | 2.63 € | Coop |
| Glade Õhuvärskendaja one touch zen gard täide 10ml | Household | — | — | 2.63 € | Coop |
| Glade one touch lily õ v täide 10ml | Household | — | — | 2.63 € | Coop |
| Gowipes niiske t paber 44tk | Household | — | — | 1.99 € | Selver |
| Grite Lehtkäterätik ecological 2-kihiline 150lehte | Household | — | — | 1.59 € | Selver |
| Grite Lehträtik blossom 120tk | Household | 1.69 € | 1.79 € | 1.62 € | Selver |
| Grite Paberkäterätik rabbitxxl wh 2-kihiline 1rl | Household | — | — | 4.06 € | Selver |
| Grite Paberkäterätt blossom XL leht 2-kihiline 1rl | Household | — | — | 4.46 € | Selver |
| Harpic power plus hygiene wc puh 750ml | Household | — | — | 4.87 € | Selver |
| Harpic Wc puhastusvahend max 750ml | Household | — | — | 5.09 € | Coop + Selver |
| Harpic Wc puhastusvahend power plus marine 750ml | Household | — | — | 4.87 € (2.99 € Partner) | Coop |
| Hooldusvahend johnson puitpinnale 500ml | Household | — | — | 4.36 € | Coop |
| Kh-7 Katlakivieemaldaja 750ml | Household | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Kh-7 Plekieemaldaja 750ml | Household | 7.15 € | — | 6.99 € | Selver |
| Kh-7 Plekieemaldaja oxy effect 750ml | Household | 7.15 € | 7.15 € | — | Barbora + Rimi |
| Kh-7 Rasvaeemaldaja 750ml | Household | 6.29 € | 6.29 € | 4.49 € | Coop + Selver |
| Kh-7 Vannitoa puhastusvahend 500ml | Household | 6.29 € | 4.89 € | — | Rimi |
| Kolorado Wc loputuskasti tablett meri 45g | Household | — | — | 1.62 € | Selver |
| Lambi Lehträtik 3-kihiline 120tk | Household | — | — | 2.73 € (2.19 € Partner) | Selver |
| Lambi tualettpaber 3-kihiline 16tk | Household | — | — | 12.19 € | Coop |
| Lambi Tualettpaber valge 3-kihiline 8tk | Household | — | — | 6.09 € | Coop |
| Lenor fresh L graanul pesukorda 22 270g | Household | — | — | 6.29 € | Selver |
| Lenor gold orchid vanilla pesul v 59 1239ml | Household | — | — | 8.12 € | Selver |
| Lenor Pesulop lotus flower figs diam p vah 59 1239ml | Household | — | — | 8.12 € | Selver |
| Lenor Pesulop vah lotus flower diam figs p 32 675ml | Household | — | — | 3.69 € | Selver |
| Lenor Pesulop vah spring awakening pesu 38 798ml | Household | — | — | 5.58 € | Coop |
| Lenor Pesulop vahend floral bouquet pesu 32 675ml | Household | — | — | 5.58 € | Coop |
| Lenor Pesulop vahend gold orchid vanilla p 32 675ml | Household | — | — | 5.58 € | Coop |
| Lenor Pesulop vahend sensitive pesukorda 38 798ml | Household | — | — | 3.69 € | Selver |
| Mayeri Ahju all care grilli ja puhastusvah 500ml | Household | — | — | 3.79 € | Coop |
| Mayeri all care sweet hug pesul v 750ml | Household | — | — | 3.19 € | Selver |
| Mayeri Antistaatik 150ml | Household | — | — | 3.59 € | Coop |
| Mayeri Destilleeritud vesi 1000ml | Household | — | — | 1.79 € | Coop |
| Mayeri Katlakivieemaldaja 500ml | Household | — | 2.39 € | 1.79 € | Selver |
| Mayeri Nõudep mas tabletid all care in one 1 40tk | Household | — | — | 10.99 € (7.99 € Partner) | Coop |
| Mayeri Nõudepesuvahend citrus olive hüpoall 500ml | Household | — | — | 1.59 € | Selver |
| Mayeri Nõudepesuvahend cranberry 500ml | Household | 1.01 € | — | 1.59 € | Barbora |
| Mayeri Nõudepesuvahend sensitive 500ml | Household | — | 1.45 € | 1.59 € (1.19 € Partner) | Rimi |
| Mayeri Nõudepesuvahend sensitive 900ml | Household | 1.53 € | 2.19 € | — | Barbora |
| Mayeri organic Mayeri rhub apple nõudep v mahe 500ml | Household | — | — | 3.34 € | Coop |
| Mayeri organic Pesuäädikas rabarber õun mahe 1000ml | Household | — | — | 5.29 € | Coop |
| Mayeri organic Roheline seep pihustiga mahe 500ml | Household | — | — | 2.59 € | Coop + Selver |
| Mayeri Pesuäädikas sweet grapefruit 500ml | Household | — | 3.99 € | 3.99 € | Rimi + Selver |
| Mayeri Pesugeel all care color 1650ml | Household | 5.91 € | — | 8.69 € | Barbora |
| Mayeri Pesugeel all care color hüpoal kapslid 25tk | Household | — | — | 11.99 € | Coop + Selver |
| Mayeri Pesugeel color all care täitepakend 1500ml | Household | — | — | 7.19 € | Selver |
| Mayeri Pesugeel dark denim 750ml | Household | 4.54 € | — | 6.49 € | Barbora |
| Mayeri Pesugeel kapslid sensitive 25tk | Household | — | — | 11.99 € | Coop |
| Mayeri Pesugeel kapslid sensitive pouch 32tk | Household | — | — | 9.99 € | Selver |
| Mayeri Pesugeel sensitive 1650ml | Household | 5.91 € | 8.49 € | 8.69 € (6.29 € Partner) | Barbora |
| Mayeri Pesugeel sensitive color 1500ml | Household | — | — | 7.19 € | Selver |
| Mayeri Pesugeel sensitive color 1650ml | Household | — | 8.49 € | 8.69 € (6.29 € Partner) | Rimi |
| Mayeri Pesugeel sensitive täitepakend 1500ml | Household | — | — | 5.49 € | Selver |
| Mayeri Pesugeel spordiriietele all care täide 1500ml | Household | — | 6.89 € | 7.99 € | Rimi |
| Mayeri Pesuloputusvahend sensitive 750ml | Household | 2.06 € | — | 3.29 € (2.39 € Partner) | Barbora |
| Mayeri Pesupulber sensitive 1650g | Household | 5.67 € | 8.19 € | 8.39 € (6.29 € Partner) | Barbora |
| Mayeri Pesupulber sensitive color 1650g | Household | 5.70 € | 7.99 € | 8.39 € | Barbora |
| Mayeri Toru-Siil torupuhastusvahend 1000ml | Household | 1.74 € | 2.35 € | 2.49 € | Barbora |
| Mayeri Üldpuh all care freshmint hüpoal vah 500ml | Household | — | — | 3.49 € | Coop |
| Mayeri Üldpuh all care rhubarb hüpoal vahend 500ml | Household | — | — | 2.59 € | Selver |
| Mayeri Üldpuhastuvahend sensitive 500ml | Household | 1.71 € | 2.75 € | 2.69 € | Barbora |
| Mayeri Wc puhastusvahend lavender 750ml | Household | 2.09 € | 2.99 € | — | Barbora |
| Mayeri Wc puhastusvahend lemon 750ml | Household | 2.09 € | 2.99 € | — | Barbora |
| Mclean Prügikott hd nööriga mic 15 35000ml | Household | — | — | 1.51 € | Selver |
| Mclean prügikott sinine hd 9000ml | Household | — | — | 1.01 € | Selver |
| Mulieres Looduslik värske lõhna tsitr äädikas 450ml | Household | — | — | 7.10 € | Selver |
| Mulieres Nõudep mas tabletid premium all in 1 25tk | Household | — | — | 8.12 € | Selver |
| Mulieres Pesugeel roosiaed 1500ml | Household | 13.19 € | 13.19 € | — | Barbora + Rimi |
| Mulieres Pesugeel värske tsitrus pesukorda 1500ml | Household | — | — | 13.20 € | Selver |
| Neutral Nõudepesuvahend sensitive skin 500ml | Household | — | — | 3.99 € | Selver |
| Neutral P geel sensitive skin white wash 20 1000ml | Household | — | — | 10.90 € | Coop |
| Neutral Pesuloputusvahend sensitive 1000ml | Household | — | 4.69 € | 5.99 € | Rimi |
| Nua majap paber 3-kihiline 1tk | Household | — | — | 1.79 € | Selver |
| Oro green Nõudepesumasina tabletid 40tk | Household | — | — | 8.29 € | Coop |
| Orto villashampoon 500ml | Household | — | — | 2.63 € | Selver |
| Persil Pesugeel color pk 1980ml | Household | 18.29 € | 20.90 € | 19.99 € (11.99 € Partner) | Barbora |
| Persil Pesugeel color pk 990ml | Household | 10.19 € (7.25 € Aitäh) | 8.99 € | 10.99 € (7.49 € Partner) | Rimi |
| Persil Pesugeel kapslid color 28 28tk | Household | — | — | 10.99 € | Selver |
| Persil Pesugeel kapslid universal 13tk | Household | — | — | 10.15 € (5.79 € Partner) | Coop + Selver |
| Persil Pesugeel kapslid universal 28 28tk | Household | — | — | 17.99 € | Selver |
| Persil Pesugeel kapslid universal 42 42tk | Household | — | — | 26.90 € (14.99 € Partner) | Coop + Selver |
| Persil Pesugeel lavender color pk 1800ml | Household | 18.29 € | 20.90 € | 12.99 € | Selver |
| Persil Pesugeel sensitive pk 1800ml | Household | 18.29 € | 20.90 € | 19.99 € | Barbora + Coop |
| Persil Pesugeel sensitive pk 900ml | Household | 10.19 € (7.25 € Aitäh) | 8.39 € | 10.99 € (7.49 € Partner) | Rimi |
| Persil Pesugeel universal pk 1980ml | Household | 18.29 € | 20.90 € | — | Barbora |
| Persil Pesugeel universal pk 2970ml | Household | 26.39 € | — | 30.90 € (18.99 € Partner) | Barbora |
| Persil Pesugeel universal pk 990ml | Household | 10.15 € | 10.15 € | — | Barbora + Rimi |
| Persil Pesupulber color pk 1100g | Household | 10.19 € (6.99 € Aitäh) | 7.29 € | 10.15 € (6.29 € Partner) | Rimi |
| Persil Pesupulber color pk 2200g | Household | 21.29 € | 21.29 € | — | Barbora + Rimi |
| Persil Pesupulber sensitive pk 990g | Household | 10.15 € | 7.29 € | 10.15 € | Rimi |
| Perwoll Pesugeel black pk 1000ml | Household | 9.19 € (5.79 € Aitäh) | 6.19 € | 9.14 € (4.79 € Partner) | Rimi |
| Perwoll Pesugeel black pk 2000ml | Household | 15.99 € | 15.99 € | 15.99 € | Barbora + Rimi + Selver |
| Perwoll Pesugeel black pk 3000ml | Household | 20.99 € | 12.39 € | — | Rimi |
| Perwoll Pesugeel blossom pk 1000ml | Household | 9.19 € | 6.19 € | — | Rimi |
| Perwoll Pesugeel blossom pk 2000ml | Household | 16.25 € | 15.99 € | 15.99 € | Rimi + Selver |
| Perwoll Pesugeel blossom pk 3000ml | Household | 20.99 € | 12.39 € | — | Rimi |
| Perwoll Pesugeel color pk 1000ml | Household | 9.19 € (5.79 € Aitäh) | 6.19 € | 9.14 € (4.79 € Partner) | Rimi |
| Perwoll Pesugeel color pk 2000ml | Household | 16.25 € | 15.99 € | 15.99 € | Rimi + Selver |
| Perwoll Pesugeel color pk 3000ml | Household | 20.99 € | 12.39 € | — | Rimi |
| Perwoll Pesugeel dark bloom pk 2000ml | Household | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Perwoll Pesugeel light colors pk 2000ml | Household | 15.99 € | — | 15.99 € | Barbora + Selver |
| Perwoll Pesugeel sport pk 2000ml | Household | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Perwoll Pesugeel wool pk 2000ml | Household | 15.99 € | 15.99 € | 15.99 € | Barbora + Rimi + Selver |
| Power aktiv pine wc värsk 2x50g | Household | — | — | 5.29 € (3.29 € Partner) | Coop |
| Puhas kodu Katlakivieemaldi 500ml | Household | 1.99 € | — | — | Coop |
| Puhas kodu Torupuhastusgeel 500ml | Household | — | 2.65 € | 3.04 € | Coop |
| Rex orchid oil color p geel kaps 13tk | Household | — | — | 7.10 € (4.79 € Partner) | Selver |
| Saga Küpsetuspaber 10m | Household | — | — | 2.63 € | Coop |
| Saga Küpsetuspaber cm 38 24lehte | Household | — | — | 2.73 € | Selver |
| Sanytol Puhastusvahend köögile desinfits 500ml | Household | — | — | 4.69 € | Coop + Selver |
| Sanytol Puhastusvahend vannitoa desinfits 500ml | Household | — | — | 4.69 € | Coop + Selver |
| Sanytol Üldpuhastusvahend desinfitseeriv 500ml | Household | — | — | 3.69 € | Coop |
| Serla Lehträtik orava 100tk | Household | 2.15 € (1.25 € Aitäh) | — | 1.99 € | Selver |
| Serla Majapidamispaber orava XXL 1rl | Household | — | — | 5.07 € | Selver |
| Serla orava lehträtik 2-kihiline 135lehte | Household | — | — | 2.33 € | Selver |
| Serla orava tualettpaber valge 3-kihiline 8tk | Household | — | — | 5.07 € | Selver |
| Silan Pesulop fresh sky pesukorda vahend 1408ml | Household | — | — | 7.10 € (4.19 € Partner) | Coop |
| Silan Pesulop sensitive pesukorda vahend 1408ml | Household | — | — | 7.10 € (4.19 € Partner) | Coop |
| Silan Pesulop vah floral ess cherry bloss p 540ml | Household | — | — | 7.29 € | Coop |
| Silan Pesulop vah floral ess daimond orc p 540ml | Household | — | — | 7.29 € | Coop |
| Silan Pesulop vahend dreamy lotus pesu 770ml | Household | — | — | 4.99 € (2.89 € Partner) | Selver |
| Silan Pesulop vahend fresh sky pesu 880ml | Household | — | — | 5.07 € | Selver |
| Silan Pesulop vahend sensitive pesukorda 880ml | Household | — | — | 5.07 € | Selver |
| Smile alumiiniumfoolium cm kiles 10m | Household | — | — | 3.19 € | Coop |
| Somat Nõudepesumasina loputusvahend rinser 750ml | Household | — | — | 8.49 € | Coop |
| Somat Nõudepesumasina sool 1500g | Household | 5.07 € (2.99 € Aitäh) | 5.19 € | — | Barbora |
| Tango Õhuvärskendaja ocean 300ml | Household | 1.59 € | — | — | Coop |
| The pink stuff Puhastuskreem 500ml | Household | — | — | 2.89 € | Selver |
| The pink stuff Universaalne puhastusvahend 750ml | Household | — | — | 3.09 € | Selver |
| The pink stuff Vannitoapuhastusvahend 750ml | Household | — | — | 3.09 € | Selver |
| Tri-bio Nõudepesumasina sool mahe 1400g | Household | — | 3.99 € | — | Rimi |
| Tri-bio Nõudepesumasina tabletid mahe 25tk | Household | 10.15 € | — | 10.15 € | Coop |
| Tri-bio Nõudepesuvahend mahe 420ml | Household | 3.29 € | 3.29 € | — | Coop |
| Tri-bio Pesugeel sensitive mahe 1420ml | Household | 9.99 € | — | — | Barbora + Coop |
| Tri-bio Tri nõudepesuvahend mahe 840ml | Household | — | 4.89 € | — | Rimi |
| Tri-bio Tri veepehmendaja mahe 940ml | Household | — | 8.39 € | — | Coop |
| Tri-bio Vannitoapuhastusvahend mahe 420ml | Household | — | 5.19 € | — | Coop |
| Tri-bio Wc puhastusvahend mahe 710ml | Household | — | 3.49 € | — | Rimi |
| Vanish Plekieemaldaja gold gel eelpesuks 200ml | Household | — | — | 6.70 € (4.99 € Partner) | Selver |
| Vanish Plekieemaldaja regular 1000ml | Household | 7.49 € | — | 8.29 € | Coop |
| Vanish Plekieemaldaja regular 2000ml | Household | 13.99 € | — | 14.22 € (9.99 € Partner) | Barbora |
| Vanish Plekieemaldaja white 1000ml | Household | 7.49 € | — | 8.29 € | Barbora |
| Vanish Plekieemaldaja white 2000ml | Household | 14.19 € | — | 14.22 € (9.99 € Partner) | Barbora |
| Vanish Värvipüüdja 32tk | Household | — | — | 8.99 € | Selver |
| Vanish Värvipüüdja 60tk | Household | 11.17 € | — | — | Coop |
| Woolite keratin pesugeel therapy 1800ml | Household | — | — | 6.99 € | Selver |
| Woolite Pesugeel white 1800ml | Household | 11.99 € | — | 11.99 € | Barbora + Selver |
| Woolite Pesuvahend color pesukorda 900ml | Household | — | — | 6.69 € | Coop |
| Woolite Pesuvahend fruity pesukorda 1800ml | Household | — | — | 11.99 € | Coop |
| Zewa just t paber 5-kihiline 6tk | Household | — | — | 8.99 € | Coop + Selver |
| Zewa Majapidamispaber everyday easy 2-kihiline 120tk | Household | — | — | 2.53 € | Selver |
| Zewa Majapidamispaber everyday jumbo val 2-kihiline 1tk | Household | — | — | 5.69 € | Coop |
| Zewa Majapidamispaber premium 2-kihiline 120lehte | Household | — | — | 1.79 € | Selver |
| Zewa Majapidamispaber premium 2-kihiline 2rl | Household | 2.35 € | — | 2.33 € | Selver |
| Zewa Majapidamispaber wisch weg design 2-kihiline 2tk | Household | — | — | 3.59 € | Selver |
| Zewa Majapidamispaber wisch weg sp valge 2-kihiline 4tk | Household | — | — | 5.99 € | Selver |
| Zewa niisked t paber sensitive 42tk | Household | — | — | 3.34 € (2.09 € Partner) | Coop |
| Zewa Taskurätikud softis 4-kihiline 10x9tk | Household | 3.65 € | — | — | Coop |
| Zewa Tualettpaber deluxe delicate care 3-kihiline 16tk | Household | — | — | 12.49 € | Coop |
| Zewa Tualettpaber deluxe delicate care 3-kihiline 4tk | Household | — | — | 3.34 € | Selver |
| Zewa Tualettpaber deluxe delicate care 3-kihiline 8tk | Household | — | — | 6.09 € | Coop + Selver |
| Zewa Tualettpaber deluxe kummel 3-kihiline 8tk | Household | — | — | 6.29 € | Coop |
| Zewa Tualettpaber everyday 3-kihiline 6tk | Household | — | — | 3.89 € (2.49 € Partner) | Selver |
| Zewa Tualettpaber niiske sensitive 1 80tk | Household | — | — | 5.58 € | Selver |
| Zewaexclusivesoft tualettpaber valge 4-kihiline 8tk | Household | — | — | 9.85 € (6.99 € Partner) | Selver |
| Balbiino Fitlap koorejäätis 90ml | Ice cream | — | 1.45 € | 1.47 € | Rimi |
| Balbiino Fitlap laktoosivaba koorej shok 90ml | Ice cream | — | — | 1.47 € | Selver |
| Balbiino Fitlap laktoosivaba koorejäätis 500ml | Ice cream | — | — | 4.49 € | Coop + Selver |
| Balbiino Koorejäätis laktoosivaba 480g | Ice cream | 5.69 € | — | 5.68 € | Selver |
| Balbiino Reservväelase kondenspiimaga koorej 65g | Ice cream | — | — | 1.05 € (0.75 € Partner) | Coop |
| Balbiino Shok suhkruga koorejäätis vähen laktoosivaba 500ml | Ice cream | — | — | 2.49 € | Selver |
| Balbiino Vahuk vaarika j mustsõstra vahvlikoon mustasõstratoormoosiga 94g | Ice cream | — | — | 1.09 € | Selver |
| Balbiino Vahukoore kirsijäät shok tükkidega 1000ml | Ice cream | — | — | 6.59 € | Coop + Selver |
| Balbiino Vahukoorej maasikatoormoosi shok piimašokolaaditükkidega 500g | Ice cream | — | — | 6.59 € | Coop + Selver |
| Balbiino Vahukoorej maasikatoormoosi shok tükk piimašokolaaditükkidega 94g | Ice cream | — | — | 1.59 € | Coop |
| Balbiino Vahukoorejäätis karam tük vahvlikoon karamellitükkidega 86g | Ice cream | — | — | 1.59 € | Coop |
| Balbiino Virsiku jogurtijäätis jogurtiglasuuris 54g | Ice cream | — | — | 1.19 € | Coop + Selver |
| Classic Pistaatsia meresoolaga koorejäät 500ml | Ice cream | — | — | 4.69 € | Coop + Selver |
| Classic Pistaatsia valges glasuuris koorej pist pistaatsiatükkidega 67g | Ice cream | — | — | 1.99 € | Coop |
| Eriti rammus Kondenspiima perejäätis 1000ml | Ice cream | — | — | 4.36 € | Selver |
| Eriti rammus Koorejäätis mustika 110g | Ice cream | 1.78 € | 1.19 € | — | Rimi |
| Eriti rammus Koorejäätis põldmarjamoosiga 110g | Ice cream | — | — | 1.78 € | Selver |
| Eriti rammus Koorejäätis vanilli 100g | Ice cream | 1.78 € (1.19 € Aitäh) | 1.19 € | — | Rimi |
| Eriti rammus Martsipani kirsimoosiga koorej 110g | Ice cream | — | — | 1.78 € | Selver |
| Eriti rammus Shokolaadi koorejäätis šokolaadiga 200ml | Ice cream | — | — | 1.78 € | Selver |
| Eriti rammus Vanilli koorejäätis 200ml | Ice cream | — | — | 1.78 € | Selver |
| Eriti rammus Vanillikoorejäätis shok tükkidega 200ml | Ice cream | — | — | 1.78 € | Selver |
| Kalevipoeg Piimashok koorejäätis mandlitükk mandlitükkidega 270g | Ice cream | — | — | 4.62 € | Selver |
| Karamelli koorjäätis churrose tükkidega b j 360g | Ice cream | — | — | 8.28 € | Selver |
| Koorejäätis kookos lisandi ja glasuurigaclassic kookoseglasuuriga 69g | Ice cream | — | — | 1.99 € | Coop |
| La muu Kondenspiimajäätis 250g | Ice cream | — | 4.49 € | 4.49 € | Rimi + Selver |
| La muu Madagaskari vanilliga lakt vaba laktoosivaba 250g | Ice cream | — | — | 3.79 € | Selver |
| La muu Mango passionijäätis vegan 500ml | Ice cream | — | 3.99 € | 4.49 € (3.79 € Partner) | Rimi |
| La muu Shokolaadijäätis vegan 500ml | Ice cream | — | — | 4.49 € | Selver |
| Limpa limonaadi guanaba 70g | Ice cream | — | — | 0.60 € | Coop |
| Maasika koorej maasikatoormoosigaeriti rammus maasikatoormoosiga 110g | Ice cream | — | — | 1.78 € | Selver |
| Maasikaj b j koorej sõõriku taigna tükk 393g | Ice cream | — | — | 8.28 € (4.89 € Partner) | Selver |
| Magnum double caramel dore billionaire kastmega 71g | Ice cream | — | — | 1.88 € | Selver |
| Magnum Pistaatsia glasuuris 70g | Ice cream | — | — | 1.88 € | Selver |
| Magnum strawberry white 81g | Ice cream | 1.30 € | — | 1.88 € | Barbora |
| Magnum Van ja mandlitega shok 110ml | Ice cream | — | — | 1.88 € | Selver |
| Magnum Virsiku glasuuris 70g | Ice cream | — | — | 1.88 € | Selver |
| Mahlapurikas mahlajää lotte 75ml | Ice cream | — | — | 0.72 € | Selver |
| Mesikäpp Koorejäätis kakaokr küpsisetükk kakaokreemiga 500ml | Ice cream | — | — | 4.62 € | Selver |
| Mustika jogurtijäätis jogurtiglasuuris balbiion 54g | Ice cream | — | 1.25 € | 1.19 € | Coop + Selver |
| Nutella 230g | Ice cream | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Onu eskimo Karamelli koorejäätis 90ml | Ice cream | — | — | 1.05 € | Coop |
| Onu eskimo Koorejäätis šokolaadi 57g | Ice cream | 0.99 € | — | 1.05 € | Barbora + Coop |
| Onu eskimo Pohla karamelli koorejäätis 1400ml | Ice cream | — | — | 7.09 € (5.29 € Partner) | Coop + Selver |
| Onu eskimo Vaarika ja koorej shokolaadi 1400ml | Ice cream | — | — | 7.06 € (5.29 € Partner) | Selver |
| Onu eskimo Vanilli koorejäätis 90ml | Ice cream | — | — | 1.05 € | Coop |
| Onu eskimo Vanilliplombiir 1000ml | Ice cream | — | — | 5.89 € | Coop |
| Piparmündi koorejäätis eskimo koonusonu shok šokolaaditükkidega 80g | Ice cream | — | — | 1.45 € | Coop |
| Pirulo Arbuusi mahlajää nestle 73ml | Ice cream | — | — | 1.32 € (0.79 € Partner) | Selver |
| Premia Karamelli tallinn glasuur koorejäät shok 60g | Ice cream | — | — | 0.99 € | Coop + Selver |
| Premia Koorejäätis mango meloni 480g | Ice cream | 4.15 € | 4.15 € | 4.15 € (3.39 € Partner) | Barbora + Rimi + Selver |
| Premia Koorejäätis piparm shok tükkidega 500ml | Ice cream | — | — | 3.29 € | Selver |
| Premia Koorejäätis pistaatsia 240g | Ice cream | 4.19 € | — | 4.22 € | Barbora |
| Premia Koorejäätis stracciatella 480g | Ice cream | 4.79 € | 4.79 € | 4.79 € (3.79 € Partner) | Barbora + Coop + Rimi + Selver |
| Premia Koorejäätis väh suhkruga 47% 500ml | Ice cream | — | — | 2.84 € | Selver |
| Premia regatt brikett vahvlitega 180ml | Ice cream | — | — | 1.01 € | Coop |
| Premia Shokolaadi koorejäätis 500ml | Ice cream | — | — | 2.84 € | Selver |
| Premia Sidruni koorejäätis laimitükk laimitükkidega 500ml | Ice cream | — | — | 2.84 € | Selver |
| Premia Vanamehe tops soolakaramelli soolakaramelliga 140ml | Ice cream | — | — | 1.09 € | Selver |
| Premia Vanilli koorej shok tükkidega 500ml | Ice cream | — | — | 3.29 € | Selver |
| Premia Vanilli koorejäätis 480g | Ice cream | 4.29 € | — | 4.29 € | Barbora + Selver |
| Premia Vanilli koorejäätis regatt 1750ml | Ice cream | — | — | 6.69 € | Coop + Selver |
| Raks Koorejäätis küpsistega 110ml | Ice cream | — | 1.25 € | 1.25 € | Coop + Rimi + Selver |
| Raks Koorejäätis vanilli 110ml | Ice cream | — | — | 1.25 € | Coop + Selver |
| Raks Pähklikreemi koorejäätis küpsistega 60g | Ice cream | — | — | 1.25 € | Coop + Selver |
| Raks Piparmündi koorejäätis küpsistega 110ml | Ice cream | — | — | 1.25 € | Coop + Selver |
| Raks Shokolaadi koorejäätis vahvlitorus 110ml | Ice cream | — | — | 1.25 € | Coop + Selver |
| Regatt Koorejäätis 1000ml | Ice cream | — | — | 4.01 € | Coop |
| Regatt Vanilli koorejäätis 125ml | Ice cream | — | — | 1.01 € | Coop |
| Soolakaram b batooni j karam 350g | Ice cream | — | — | 8.28 € (4.89 € Partner) | Coop |
| Super viva Karam koorejäät pähklitäidis 95g | Ice cream | — | — | 1.75 € | Coop |
| Super viva Koorejäätis brulee creme 100g | Ice cream | — | — | 2.02 € | Coop |
| Väike tom Koolijäätis 60g | Ice cream | — | 0.99 € | 0.99 € (0.79 € Partner) | Coop + Rimi + Selver |
| Väike tom Küpsisejäätis hele küpsistega 140ml | Ice cream | — | — | 1.19 € (0.95 € Partner) | Coop + Selver |
| Väike tom lehmakommi 60g | Ice cream | 0.79 € | 0.99 € | — | Barbora |
| Väike tom Shokolaadijäätis glasuuris 90ml | Ice cream | — | — | 0.99 € (0.79 € Partner) | Coop + Selver |
| Väike tom Siiru viiru küpsik koorejäätis van karamellitäidisega 80g | Ice cream | — | — | 1.19 € (0.95 € Partner) | Coop + Selver |
| Väike tom Väike krokojäätis 75g | Ice cream | — | — | 0.69 € (0.55 € Partner) | Coop + Selver |
| Väike tom vanilli 60g | Ice cream | 0.95 € | 0.95 € | — | Barbora + Rimi |
| Väike tom Vanilliplombiir glasuuris 90ml | Ice cream | — | — | 0.99 € (0.79 € Partner) | Coop + Selver |
| Van gl iirise koorej soolakaram väiketom 75g | Ice cream | — | — | 1.25 € (0.99 € Partner) | Selver |
| Van gl plombiir pähklitäidisega väiketom 70ml | Ice cream | — | — | 0.99 € (0.79 € Partner) | Coop + Selver |
| Vana toomas shokolaadi premia 150ml | Ice cream | — | — | 1.51 € | Selver |
| Vana toomas vanilliplombiir 90g | Ice cream | 1.49 € | 1.39 € | — | Rimi |
| Vana toomas Vanilliplombiir premia šokolaadiglasuuriga 150ml | Ice cream | — | — | 1.51 € | Coop |
| Vanilla ninja Karam glasuuris koorej 110ml | Ice cream | — | 1.19 € | 1.19 € (0.79 € Partner) | Coop + Rimi + Selver |
| Vanilla ninja Koorejäätis glasuuris 7 7x110ml | Ice cream | — | — | 7.75 € | Coop |
| Vanilla ninja Piparmündi glasuuris koorej 80g | Ice cream | — | — | 1.19 € (0.79 € Partner) | Coop + Selver |
| Vanilla ninja Shok gl koorejäätis pulk 80g | Ice cream | — | — | 1.19 € (0.79 € Partner) | Coop |
| Vanilla ninja Vanilli glasuuris koorej shokol 110ml | Ice cream | — | — | 1.19 € (0.79 € Partner) | Coop |
| Vanilli maasika gl koorej mustsõst sh väiketom 75g | Ice cream | — | — | 1.25 € (0.99 € Partner) | Selver |
| Ajinomoto Kiirnuudlid kastmega oyakata vürts 93g | Instant food | — | — | 1.99 € | Coop + Selver |
| Ajinomoto Kiirnuudlid oyakata veise wasabi 93g | Instant food | — | — | 1.99 € (1.49 € Partner) | Coop + Selver |
| Ajinomoto oyakata kiirnuudlid juustu 97g | Instant food | — | — | 2.15 € (1.59 € Partner) | Coop |
| Bla band Itaalia pajaroog 150g | Instant food | 3.69 € | 3.39 € | — | Rimi |
| Bla band Napoli pajaroog 170g | Instant food | 3.69 € | — | 3.69 € | Barbora + Selver |
| Bla band Tex mex pajaroog 193g | Instant food | 3.69 € | — | 2.69 € | Selver |
| Daryna kiirnuudlid kana 50g | Instant food | — | — | 0.35 € | Coop + Selver |
| Daryna kiirnuudlid veise 50g | Instant food | — | — | 0.35 € | Coop + Selver |
| Glads Riisinuudlid tom yum 65g | Instant food | 1.11 € | 1.59 € | — | Barbora |
| Hao hao Kiirnuudlid kreveti tshilli laimi laimiga 78g | Instant food | — | — | 0.45 € | Selver |
| Ippin Kiirnuudlid miso ramen 80g | Instant food | 0.89 € | — | 0.99 € | Barbora |
| Ippin Kiirnuudlid shoyu ramen 83g | Instant food | 0.89 € | — | 0.99 € | Barbora |
| Knorr Juustu kiirnuudlid ürdi 61g | Instant food | 0.99 € (0.55 € Aitäh) | 1.05 € | 1.15 € | Barbora |
| Knorr Juustupüree kiirsupp krutoonidega 22g | Instant food | — | — | 0.80 € | Coop |
| Knorr Juustusupp 22g | Instant food | 0.69 € (0.45 € Aitäh) | 0.75 € | — | Barbora |
| Knorr Kana kiirnuudlid 61g | Instant food | 0.99 € (0.55 € Aitäh) | — | 1.15 € (0.59 € Partner) | Barbora |
| Knorr Kana kiirsupp nuudlitega 12g | Instant food | — | — | 0.79 € | Coop |
| Knorr Kanapüree kiirsupp krutoonidega 16g | Instant food | — | — | 0.79 € (0.45 € Partner) | Coop |
| Knorr Kanapüreesupp 16g | Instant food | 0.75 € | 0.75 € | — | Barbora + Rimi |
| Knorr Kartulipüree peekoni sibulaga 51g | Instant food | — | 1.99 € | 2.29 € (1.35 € Partner) | Coop + Rimi |
| Knorr Kiirroog pasta bolognese topsis kastmega 60g | Instant food | — | — | 2.29 € | Coop |
| Knorr Kiirroog pasta carbonara topsis 55g | Instant food | — | — | 2.29 € (1.35 € Partner) | Coop |
| Knorr kiirroog pasta hapukoore ürdi murulauguga 59g | Instant food | — | — | 2.29 € (1.39 € Partner) | Coop |
| Knorr Shampinjoni kiirsupp krutoonidega 15g | Instant food | — | — | 0.80 € | Coop |
| Knorr Tomati kiirnuudlid 65g | Instant food | 1.05 € | — | 1.15 € (0.59 € Partner) | Barbora + Coop |
| Maggi herne kiirsupp krutoonidega 22g | Instant food | — | — | 0.79 € (0.49 € Partner) | Coop + Selver |
| Maggi Juustu kiirnuudlid 59.2g | Instant food | 0.39 € | 0.79 € | 0.39 € | Barbora + Selver |
| Maggi Juustusupp saiakuubikutega 19g | Instant food | 0.79 € | 0.79 € | 0.79 € (0.49 € Partner) | Barbora + Coop + Rimi + Selver |
| Maggi Kana kiirsupp nuudlitega 12g | Instant food | — | — | 0.79 € (0.49 € Partner) | Coop + Selver |
| Maggi Kanaliha kiirnuudlid 59.2g | Instant food | 0.39 € | 0.79 € | — | Barbora |
| Maggi Kartulipüree peekoni ja saiakuubikutega 53g | Instant food | — | — | 1.79 € (1.15 € Partner) | Selver |
| Maggi Kartulipüree rõõsakoorega 35g | Instant food | — | — | 0.95 € (0.65 € Partner) | Coop + Selver |
| Maggi kartulipüree tilliga 50g | Instant food | — | — | 1.79 € (1.15 € Partner) | Selver |
| Maggi Kiirnuudlid bami goreng 185g | Instant food | 1.89 € | 1.89 € | — | Barbora + Rimi |
| Maggi Kiirnuudlid soy garlic 185g | Instant food | 1.89 € | 1.89 € | — | Barbora + Rimi |
| Maggi Kiirnuudlid sweet chilli 185g | Instant food | 1.89 € | 1.89 € | — | Barbora + Rimi |
| Maggi Kiirnuudlid vürtsika kana 59.2g | Instant food | — | 0.79 € | 0.39 € | Selver |
| Maggi Köögivilja kiirnuudlid 59.2g | Instant food | 0.79 € | — | 0.79 € (0.39 € Partner) | Barbora + Coop + Selver |
| Maggi Koorene kana kiirsupp krutoonidega 16g | Instant food | — | — | 0.79 € (0.49 € Partner) | Coop + Selver |
| Maggi Pasta carbonara 50g | Instant food | 1.79 € | — | 1.79 € (1.15 € Partner) | Barbora + Selver |
| Maggi Punapeedi kiirsupp saiakuub 16g | Instant food | 0.79 € | 0.79 € | — | Barbora + Rimi |
| Maggi Punapeedi kiirsupp saiakuubikutega 16g | Instant food | — | — | 0.79 € (0.49 € Partner) | Coop + Selver |
| Maggi Veiseliha kiirnuudlid 59.2g | Instant food | 0.79 € | 0.79 € | 0.79 € (0.39 € Partner) | Barbora + Rimi + Selver |
| Maggi Või kartulipüree tilliga 35g | Instant food | 0.95 € | — | 0.95 € (0.65 € Partner) | Barbora + Coop + Selver |
| Oyakata Kiirnuudlisupp sojakastme ramen 83g | Instant food | — | 1.39 € | 0.79 € | Selver |
| Podravka Kana nuudli pakisupp 62g | Instant food | — | — | 0.94 € (0.69 € Partner) | Selver |
| Podravka Kanaliha pakisupp tähestikunuudlitega 52g | Instant food | — | — | 0.95 € | Coop + Selver |
| Podravka Kanasupp nuudlitega 62g | Instant food | 0.89 € | 0.99 € | — | Barbora |
| Reeva Juustu ja peekoni kiirnuudlid 60g | Instant food | 0.49 € | 0.69 € | 0.69 € (0.45 € Partner) | Barbora |
| Reeva Kanaliha kiirnuudlid 60g | Instant food | 0.49 € | 0.69 € | 0.69 € (0.45 € Partner) | Barbora |
| Reeva Kiirnuudlid kana 85g | Instant food | 1.15 € | 1.15 € | 1.15 € (0.75 € Partner) | Coop |
| Reeva kiirnuudlid veiseliha 60g | Instant food | — | 0.69 € | 0.69 € (0.45 € Partner) | Coop + Rimi + Selver |
| Reeva Kiirnuudlid veiseliha 85g | Instant food | — | 1.15 € | 1.15 € (0.75 € Partner) | Coop |
| Reeva Kiirnuudlid vürtsika kana 60g | Instant food | — | — | 0.69 € (0.45 € Partner) | Coop + Selver |
| Samyang Kiirnuudlid tuline kana buldak carbon 130g | Instant food | — | — | 2.49 € | Coop |
| Sun yan Kiirnuudlid kana 60g | Instant food | 0.55 € | — | 0.79 € | Barbora |
| Tartu mill Kartulipuder piimaga 35g | Instant food | 0.49 € | — | 0.45 € | Selver |
| Thai choice Kana kiirnuudlid 85g | Instant food | 1.15 € | — | 0.89 € | Selver |
| Thai choice Kiirnuudlid tom yum 85g | Instant food | — | 1.19 € | 0.89 € | Selver |
| Thai choice Kiirnuudlid veiseliha 85g | Instant food | — | — | 1.15 € | Coop |
| Yatekomo Kiirnuudlid kana topsis 60g | Instant food | 1.75 € | — | 1.75 € | Barbora + Selver |
| Bonne Mangopüree 500ml | Jam & honey & spreads | 3.45 € | — | 2.99 € | Selver |
| Bonne Ploomipüree 500ml | Jam & honey & spreads | 4.25 € | — | 4.26 € | Barbora |
| Bonne Virsikupüree 500ml | Jam & honey & spreads | 3.45 € | — | 3.45 € | Barbora + Selver |
| Good good Good aprikoosimoos steviaga 330g | Jam & honey & spreads | — | — | 5.99 € | Coop |
| Good good Good maasikamoos steviaga 330g | Jam & honey & spreads | — | — | 5.89 € | Coop + Selver |
| Good good Mustikamoos steviaga 330g | Jam & honey & spreads | — | — | 5.99 € | Coop |
| Good good Sarap kreem steviaga m pähkli shok 350g | Jam & honey & spreads | — | — | 7.10 € | Selver |
| Good good Vaarikamoos steviaga 330g | Jam & honey & spreads | — | — | 5.99 € | Coop |
| Green mango lõigud siirupis 425g | Jam & honey & spreads | — | — | 1.92 € | Selver |
| Greenhouse kirsikompott kivideta 680g | Jam & honey & spreads | — | — | 5.99 € | Coop + Selver |
| Honest nektar Mesi tuubis 300g | Jam & honey & spreads | 4.29 € | — | 4.29 € | Coop |
| Küllus Kiivimoos 400g | Jam & honey & spreads | 4.69 € | 4.69 € | — | Coop |
| Küllus Kirsimoos 400g | Jam & honey & spreads | 4.19 € | 4.69 € | 4.29 € | Barbora |
| Küllus Maasika metsmustikamoos 400g | Jam & honey & spreads | 4.29 € | — | — | Barbora + Coop |
| Küllus Maasikamoos 400g | Jam & honey & spreads | 4.19 € | 4.29 € | 3.69 € | Selver |
| Küllus õuna passionimoos 400g | Jam & honey & spreads | — | — | 4.29 € (3.49 € Partner) | Coop + Selver |
| Küllus Rabamurakamoos 400g | Jam & honey & spreads | 11.99 € | 12.39 € | 12.19 € | Barbora |
| Küllus Vaarikamoos 400g | Jam & honey & spreads | 4.69 € | 4.59 € | 3.89 € | Selver |
| Küllus virsiku apelsinimoos 400g | Jam & honey & spreads | — | — | 4.87 € (3.99 € Partner) | Selver |
| Maasikamoos rõngu marjadega 1000g | Jam & honey & spreads | — | — | 7.79 € | Coop + Selver |
| Makedoonia Tahiini seesamipasta 300g | Jam & honey & spreads | — | — | 4.59 € | Coop + Selver |
| Meie mari Maasikamoos 310g | Jam & honey & spreads | 3.75 € | — | 3.75 € | Barbora + Coop + Selver |
| Meie mari Maasikamoos 590g | Jam & honey & spreads | 5.39 € | — | — | Barbora + Coop |
| Meie mari Murakamoos 310g | Jam & honey & spreads | 10.49 € | 10.49 € | 10.49 € | Barbora + Rimi + Selver |
| Meie mari Mustasõstramoos 310g | Jam & honey & spreads | 3.75 € | — | 3.75 € | Barbora + Coop + Selver |
| Meie mari Pannkoogimoos 310g | Jam & honey & spreads | 3.39 € | 2.99 € | 2.99 € (1.99 € Partner) | Coop + Rimi + Selver |
| Meie mari Pohlamoos 310g | Jam & honey & spreads | 3.75 € | 4.19 € | 3.75 € | Barbora + Selver |
| Meie mari Vaarika mustasõstramoos 590g | Jam & honey & spreads | 5.39 € | — | — | Barbora + Coop |
| Meie mari Vaarikamoos 310g | Jam & honey & spreads | 3.75 € | — | 3.65 € | Coop + Selver |
| Meveda Mesi 500g | Jam & honey & spreads | 7.49 € | 7.49 € | — | Barbora + Rimi |
| Meveda Mesi eesti 1000g | Jam & honey & spreads | — | — | 10.89 € | Coop + Selver |
| Meveda Mesi kreemjas 500g | Jam & honey & spreads | 6.99 € | — | 6.99 € | Barbora + Selver |
| Meveda Suvine mesi eesti 500g | Jam & honey & spreads | — | — | 6.99 € | Selver |
| Minu Ananassitükid kerges siirupis 227g | Jam & honey & spreads | 1.49 € | — | — | Barbora |
| Minu Ananassiviilud kerges siirupis 227g | Jam & honey & spreads | 1.49 € | — | — | Barbora |
| Muhe mesi Mesi 1100g | Jam & honey & spreads | 12.79 € | — | 12.39 € | Selver |
| Muhe mesi Mesi 450g | Jam & honey & spreads | 6.29 € | — | 6.29 € | Barbora + Selver |
| Naoussa Aprikoosidzemm 500g | Jam & honey & spreads | — | — | 2.55 € | Coop + Selver |
| Natty Maapähklivõie kranži krõbisev mahe 333g | Jam & honey & spreads | — | — | 6.65 € | Coop + Selver |
| Natty Maapähklivõie smuuud kreemjas mahe 333g | Jam & honey & spreads | — | — | 6.65 € | Coop + Selver |
| Nutella Shokolaadi pähklikreem 350g | Jam & honey & spreads | — | — | 5.39 € | Coop + Selver |
| Nutella Shokolaadi pähklikreem 600g | Jam & honey & spreads | — | — | 8.59 € | Coop + Selver |
| Põltsamaa Aprikoosimoos 380g | Jam & honey & spreads | 3.85 € | 3.85 € | 3.85 € (3.19 € Partner) | Barbora + Rimi + Selver |
| Põltsamaa Maasikamoos 380g | Jam & honey & spreads | 3.65 € | 3.65 € | 3.65 € | Barbora + Coop + Rimi + Selver |
| Põltsamaa Maasikamoos 600g | Jam & honey & spreads | 4.49 € (3.59 € Aitäh) | 4.49 € | 3.59 € | Coop + Selver |
| Põltsamaa Maasikamoos pudelis 390g | Jam & honey & spreads | 3.45 € | 3.69 € | 3.45 € | Barbora + Coop + Selver |
| Põltsamaa Metsamarjamoos 380g | Jam & honey & spreads | 3.65 € | 3.19 € | 3.65 € (2.99 € Partner) | Rimi |
| Põltsamaa Mustikamoos 380g | Jam & honey & spreads | 4.09 € | 4.09 € | 4.09 € | Barbora + Coop + Rimi + Selver |
| Põltsamaa Mustsõstramoos 380g | Jam & honey & spreads | 3.55 € | 2.99 € | 3.55 € | Rimi |
| Põltsamaa Pohlamoos 380g | Jam & honey & spreads | 3.69 € | 3.69 € | 3.69 € | Barbora + Rimi + Selver |
| Põltsamaa Pohlamoos pudelis 385g | Jam & honey & spreads | 3.55 € | 3.69 € | 3.55 € | Barbora + Coop + Selver |
| Põltsamaa Vaarikamoos 380g | Jam & honey & spreads | 4.05 € | 4.05 € | 4.05 € (3.49 € Partner) | Barbora + Rimi + Selver |
| Põltsamaa Vaarikamoos 600g | Jam & honey & spreads | 5.79 € (3.59 € Aitäh) | 5.79 € | 5.79 € | Barbora + Rimi + Selver |
| Põltsamaa Vaarikamoos pudelis 390g | Jam & honey & spreads | 4.45 € | 4.79 € | 4.46 € | Barbora |
| Rõngu mahl Küpsetuskindel täidis kirss marjadega 1000g | Jam & honey & spreads | — | — | 9.89 € | Coop + Selver |
| Salvest mangopüree mahe 450g | Jam & honey & spreads | 3.99 € | 3.09 € | 3.99 € | Rimi |
| Salvest Õunakaste 530g | Jam & honey & spreads | 2.89 € | — | 2.29 € | Selver |
| Salvest pirnipüree mahe 450g | Jam & honey & spreads | 3.65 € | 3.89 € | 3.65 € | Barbora + Selver |
| Sante Maapähklikreem crunchy 350g | Jam & honey & spreads | 3.09 € | — | 3.14 € | Barbora |
| Schwartau Karamelli dessertkaste 125ml | Jam & honey & spreads | 2.89 € | — | 2.92 € | Barbora |
| Schwartau Šokolaadi dessertkaste 125ml | Jam & honey & spreads | 2.75 € | — | 2.73 € | Selver |
| Semu Astelpajumoos 320g | Jam & honey & spreads | 3.95 € | — | 3.95 € | Barbora + Selver |
| Sireli Mesi 1000g | Jam & honey & spreads | 11.99 € | — | 11.99 € | Barbora + Selver |
| Sireli Mesi 250g | Jam & honey & spreads | 3.79 € | — | 3.79 € | Barbora + Selver |
| Sunfood ananassitükid kerges siirup 227g | Jam & honey & spreads | — | — | 1.69 € | Selver |
| Vaarikamoos rõngu marjadega 1000g | Jam & honey & spreads | — | — | 8.79 € | Coop + Selver |
| Farmi Hapendatud pett 1000g | Kefir & buttermilk | — | 1.29 € | 1.31 € (1.09 € Partner) | Rimi |
| Farmi Hapendatud täispiim 3.6-4.2% 1000g | Kefir & buttermilk | — | 1.89 € | 1.92 € | Rimi |
| Farmi Keefir täispiimast 3.8-4.2% 1000g | Kefir & buttermilk | 1.25 € | 1.25 € | — | Barbora + Rimi |
| Farmi Rjaženka 400g | Kefir & buttermilk | — | 0.89 € | 1.01 € | Rimi |
| Gefilus Keefir jääkohvi 300g | Kefir & buttermilk | — | 1.29 € | 1.24 € (0.99 € Partner) | Selver |
| Hellus Keefir laktoosivaba 1000g | Kefir & buttermilk | — | 2.09 € | 2.12 € | Rimi |
| Armeenia grill Armeenia šašlõkk | Meat | 8.99 € | 11.99 € | 12.19 € | Barbora |
| Armeenia grill Broileri kintsuliha šašlõkk | Meat | 11.99 € | 8.99 € | 12.19 € | Rimi |
| Armeenia grill Sea šašlõkk | Meat | 11.99 € | 12.49 € | 12.59 € | Barbora |
| Liivimaa lihaveis Rohumaaveise hakkliha mahe 300g | Meat | 5.79 € | — | 5.79 € | Barbora + Selver |
| Matsimoka Delikatesshakkliha 300g | Meat | 2.95 € | 2.29 € | — | Rimi |
| Oskar Kebab lambalihaga 400g | Meat | 7.39 € | — | 7.39 € (4.99 € Partner) | Barbora + Selver |
| Rakvere baby back searibi | Meat | 11.79 € | — | 10.49 € | Selver |
| Rakvere Grill mustika liha 500g | Meat | 6.89 € | — | 4.99 € | Selver |
| Rakvere Mustika grill ribi 1200g | Meat | 11.19 € | — | 7.49 € | Selver |
| Rakvere Sea sisefilee | Meat | — | 8.69 € | 11.99 € | Rimi |
| Rakvere Sea välisfilee | Meat | — | 9.99 € | 9.99 € | Rimi + Selver |
| Rakvere Seahakkliha 400g | Meat | 2.79 € | — | — | Barbora |
| Rakvere Seastrooganov 380g | Meat | — | — | 2.89 € | Selver |
| Rannamõisa Mustika broileripooltiivad 400g | Meat | — | 3.99 € | — | Coop + Rimi |
| Rannarootsi Ehe shaslõkk seakaelakarbonaadist 600g | Meat | — | — | 7.45 € (5.59 € Partner) | Coop |
| Rannarootsi Triibuliha soola ja pipraga ehe 250g | Meat | 3.45 € (2.89 € Aitäh) | — | — | Coop |
| Rm broileritiiva õlaosa 500g | Meat | — | — | 3.25 € | Selver |
| Seakaelakarbonaad | Meat | 8.99 € | 9.99 € | — | Barbora |
| Steff Armeenia šašlõkk seakaelakarb 600g | Meat | 5.49 € | 6.29 € | — | Barbora |
| Steff Armeenia shaslõkk seakaelakarbonaadist 600g | Meat | — | — | 7.99 € (5.99 € Partner) | Coop |
| Tallegg Ahjubroiler klassikaline | Meat | 5.99 € | 5.79 € | 4.99 € | Selver |
| Tallegg Broileri poolkoivad klassikalises 800g | Meat | 3.75 € | — | 4.99 € (3.99 € Partner) | Barbora |
| Tallegg Broilerikintsuliha kolme juustuga 400g | Meat | 4.99 € | — | 5.39 € | Barbora |
| Tallegg Broileripooltiib eestimaine 400g | Meat | — | — | 3.29 € | Coop |
| Tallegg Delikatess broilerihakklihasegu 300g | Meat | — | 3.69 € | 3.65 € | Coop |
| Tallegg Eestimaine broilerikints 550g | Meat | — | — | 4.29 € | Selver |
| Tallegg Eestimaine broilerikoib | Meat | 3.59 € | — | 5.99 € | Barbora |
| Tallegg Fit broileri jog rinnafileeshaslõkk 800g | Meat | — | — | 9.49 € | Coop |
| Tallegg Fit broileririnnafilee hakkliha 300g | Meat | — | — | 3.29 € | Coop + Selver |
| Tallegg Fitness caesari broileri rinnafilee 500g | Meat | — | — | 5.99 € (4.99 € Partner) | Coop + Selver |
| Tallegg Juustuga minutipihv broileririnnafil juustuga 350g | Meat | — | — | 5.99 € | Coop + Selver |
| Tallegg Külmutatud broilerikael 500g | Meat | 1.49 € | 1.49 € | — | Barbora + Rimi |
| Aasa Piimajook vanilje 2.3% 450ml | Milk drinks & drinking yoghurt | 1.49 € (0.85 € Aitäh) | 1.65 € | — | Barbora |
| Actimel Jogurtijook puuvilja 4x100g | Milk drinks & drinking yoghurt | — | 2.59 € | 2.69 € | Rimi |
| Actimel Maasika jogurtijook 4x100g | Milk drinks & drinking yoghurt | — | 2.59 € | 2.69 € | Rimi |
| Actimel Maasika jogurtijook 8x100g | Milk drinks & drinking yoghurt | — | 4.69 € | 4.89 € | Rimi |
| Actimel Metsamarja jogurtijook 4x100g | Milk drinks & drinking yoghurt | — | 2.59 € | 2.69 € | Rimi |
| Actimel Metsamarja jogurtijook 8x100g | Milk drinks & drinking yoghurt | — | 4.69 € | 4.89 € | Coop |
| Activia Joogijogurt maasika kiivi 300g | Milk drinks & drinking yoghurt | — | 1.45 € | 1.69 € | Rimi |
| Alma Banaani maasikajoogijogurt kile 1.5% 1000g | Milk drinks & drinking yoghurt | — | — | 1.51 € | Selver |
| Alma Jogurtijook kreeka mango maasika 275g | Milk drinks & drinking yoghurt | — | 0.99 € | — | Rimi |
| Alma Jogurtijook kreeka stiilis mustika kirsi 275g | Milk drinks & drinking yoghurt | — | — | 1.22 € | Selver |
| Alma Jogurtijook kreeka vaarika virsiku 275g | Milk drinks & drinking yoghurt | — | 0.99 € | 1.22 € | Rimi |
| Alma Joogijogurt banaani maasika 900g | Milk drinks & drinking yoghurt | 1.75 € | 1.59 € | — | Rimi |
| Alma Joogijogurt maasika nektariini 900g | Milk drinks & drinking yoghurt | 1.85 € | 1.59 € | — | Rimi |
| Alma Joogijogurt mango 900g | Milk drinks & drinking yoghurt | 1.82 € | — | 1.82 € | Coop |
| Alma Joogijogurt metsamarja 900g | Milk drinks & drinking yoghurt | 1.82 € | — | 1.82 € | Coop |
| Gefilus Joogijogurt maasika pohla harmoonia laktoosivaba 1000g | Milk drinks & drinking yoghurt | — | — | 2.08 € (1.59 € Partner) | Coop |
| Gefilus Joogijogurt vaarika passioni laktoosiv laktoosivaba 1000g | Milk drinks & drinking yoghurt | — | — | 2.08 € (1.59 € Partner) | Coop |
| Jovi duet Jogurtijook maasika kiivi 350g | Milk drinks & drinking yoghurt | — | — | 1.19 € (0.89 € Partner) | Coop |
| Jovi duet Jogurtijook õuna pirni 350g | Milk drinks & drinking yoghurt | — | — | 1.19 € (0.89 € Partner) | Coop |
| Lotte Marja jogurtijook 6x100g | Milk drinks & drinking yoghurt | — | — | 2.59 € | Selver |
| Tere Joogijogurt metsmaasika 900g | Milk drinks & drinking yoghurt | 1.99 € | — | 2.02 € | Barbora + Coop |
| Tere Joogijogurt mustika vaarika 900g | Milk drinks & drinking yoghurt | 1.99 € | — | 2.02 € | Barbora |
| Väike tom Kõrgkuum karamelli piimjook vitam vitamiinidega 200ml | Milk drinks & drinking yoghurt | — | — | 0.85 € | Coop + Selver |
| Väike tom Kõrgkuum maasikalis piimjook vitam vitamiinidega 200ml | Milk drinks & drinking yoghurt | — | — | 0.85 € | Coop + Selver |
| Valio eila Piimajook laktoosivaba 1.5% 1000ml | Milk drinks & drinking yoghurt | — | — | 2.53 € | Selver |
| Valio profeel Proteiinijogurtijook kirsi 275g | Milk drinks & drinking yoghurt | — | — | 1.98 € (1.59 € Partner) | Selver |
| Valio profeel Proteiinijogurtijook metsamarja 275g | Milk drinks & drinking yoghurt | — | — | 1.98 € (1.59 € Partner) | Selver |
| Valio profeel Proteiinijogurtijook troopiline 275g | Milk drinks & drinking yoghurt | — | — | 1.98 € (1.59 € Partner) | Selver |
| Arimex India pähklid 300g | Nuts, seeds & dried fruit | 7.39 € (4.39 € Aitäh) | 4.99 € | — | Rimi |
| Arimex Kuninglik segu 300g | Nuts, seeds & dried fruit | — | 6.29 € | 6.25 € | Selver |
| Arimex lemmiksegu 300g | Nuts, seeds & dried fruit | — | — | 5.99 € (4.69 € Partner) | Coop |
| Arimex Pähklisegu premium 300g | Nuts, seeds & dried fruit | 8.09 € | — | 8.12 € | Barbora + Coop |
| Arimex Troopiliste puuviljade segu 200g | Nuts, seeds & dried fruit | 3.79 € | 3.79 € | — | Barbora + Rimi |
| Estrella Maapähkel cheddar crispers juust röst kattega 140g | Nuts, seeds & dried fruit | — | — | 2.33 € | Selver |
| Estrella Maapähkel crispers röstitud vürtsikas kattega 140g | Nuts, seeds & dried fruit | — | — | 2.33 € | Selver |
| Estrella Maapähkel röstitud mee soola meega 140g | Nuts, seeds & dried fruit | — | — | 3.04 € (2.19 € Partner) | Coop |
| Estrella maapähkel röstitud soolat soolaga 140g | Nuts, seeds & dried fruit | — | 2.39 € | 3.04 € (2.19 € Partner) | Rimi |
| Estrella Pistaatsiapähkel röstitud soolatud 275g | Nuts, seeds & dried fruit | — | — | 5.99 € | Selver |
| Estrella Röstitud maapähklid soolaga 240g | Nuts, seeds & dried fruit | 1.79 € | 2.99 € | 3.04 € | Barbora |
| Estrella Röstitud maapähklid soolaga 500g | Nuts, seeds & dried fruit | — | 4.99 € | 4.59 € | Selver |
| Estrella sibula h koore maapähkel 140g | Nuts, seeds & dried fruit | — | — | 2.33 € | Selver |
| Germund eksklusiivne segu premium 300g | Nuts, seeds & dried fruit | — | — | 5.78 € (4.89 € Partner) | Selver |
| Germund Linaseemned 200g | Nuts, seeds & dried fruit | 1.19 € | — | 1.21 € | Barbora |
| Germund Mandlilaastud 100g | Nuts, seeds & dried fruit | 2.79 € | — | 2.80 € | Barbora |
| Germund Pistaatsiapähkel röstitud soolatud 200g | Nuts, seeds & dried fruit | — | — | 4.87 € (3.99 € Partner) | Selver |
| Germund premium India pähkel röstitud 300g | Nuts, seeds & dried fruit | — | — | 6.80 € (4.99 € Partner) | Coop |
| Germund premium Jõhvikas 300g | Nuts, seeds & dried fruit | — | — | 3.95 € | Selver |
| Germund premium Kreeka pähkel 200g | Nuts, seeds & dried fruit | — | — | 4.67 € | Coop |
| Germund premium Kuivat jõhvikad pähklid suured 300g | Nuts, seeds & dried fruit | — | — | 4.95 € | Selver |
| Germund premium Mandel 300g | Nuts, seeds & dried fruit | — | — | 5.38 € | Selver |
| Germund premium Marjade papaia segu kuivatatud 300g | Nuts, seeds & dried fruit | — | — | 3.34 € | Selver |
| Germund premium Pähklite segu 250g | Nuts, seeds & dried fruit | — | — | 4.99 € | Selver |
| Germund premium Tudengi eine 300g | Nuts, seeds & dried fruit | — | — | 5.68 € | Selver |
| Germund Seesamiseemned 100g | Nuts, seeds & dried fruit | — | — | 1.17 € | Selver |
| Germund Soolapähkel röstitud 200g | Nuts, seeds & dried fruit | — | — | 1.47 € (1.25 € Partner) | Selver |
| Kommi asemel Gurmee salatisegu take 1 130g | Nuts, seeds & dried fruit | — | — | 2.39 € | Selver |
| Kommi asemel Ingver take 1 150g | Nuts, seeds & dried fruit | — | — | 1.82 € | Selver |
| Kommi asemel Kirss take suhkruga 1 100g | Nuts, seeds & dried fruit | — | — | 3.29 € | Coop |
| Kommi asemel Take ananassikuubikud 1 150g | Nuts, seeds & dried fruit | — | — | 1.99 € | Selver |
| Kommi asemel Take jõhvikas 1 100g | Nuts, seeds & dried fruit | — | — | 1.68 € | Selver |
| Kommi asemel Take lilleseemn p mahe 1 150g | Nuts, seeds & dried fruit | — | — | 1.58 € | Selver |
| Kommi asemel Take segu puuv pähkli 150g | Nuts, seeds & dried fruit | — | — | 1.69 € | Selver |
| Meki külmkuivatatud maasikas 15g | Nuts, seeds & dried fruit | — | — | 2.53 € | Coop |
| Meki külmkuivatatud vaarikas 15g | Nuts, seeds & dried fruit | — | — | 2.49 € | Selver |
| Mogyi India pähkel röstitud soolatud 70g | Nuts, seeds & dried fruit | — | — | 1.92 € | Selver |
| Mogyi Päevalilleseemned röstitud triibulised 200g | Nuts, seeds & dried fruit | — | — | 1.45 € | Selver |
| Pähklinäpp Ananassikuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | — | Rimi |
| Pähklinäpp Apelsinikuubikud 85g | Nuts, seeds & dried fruit | — | 1.59 € | — | Rimi |
| Pähklinäpp Aprikoos 250g | Nuts, seeds & dried fruit | — | — | 3.65 € | Coop + Selver |
| Pähklinäpp Chia seemned 200g | Nuts, seeds & dried fruit | 2.29 € | — | 2.33 € (1.79 € Partner) | Coop |
| Pähklinäpp India pähkel röstitud 200g | Nuts, seeds & dried fruit | — | 3.49 € | 3.29 € | Selver |
| Pähklinäpp Kirsikuubikud 85g | Nuts, seeds & dried fruit | 2.09 € | 1.59 € | — | Rimi |
| Pähklinäpp Kõrvitsaseemned kooritud 250g | Nuts, seeds & dried fruit | — | — | 3.14 € (2.49 € Partner) | Coop |
| Pähklinäpp Kreeka pähkel 200g | Nuts, seeds & dried fruit | 3.99 € | 3.99 € | 4.06 € (2.99 € Partner) | Barbora + Rimi |
| Pähklinäpp Kuivatatud mango viilud 200g | Nuts, seeds & dried fruit | — | 4.99 € | 4.06 € | Selver |
| Pähklinäpp Kuivatatud õunarõngad 200g | Nuts, seeds & dried fruit | 3.45 € | — | — | Coop |
| Pähklinäpp Maapähkel soolakaramellis 200g | Nuts, seeds & dried fruit | — | 2.25 € | 2.25 € | Coop + Rimi + Selver |
| Pähklinäpp Maasikakuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | 2.02 € (1.59 € Partner) | Rimi |
| Pähklinäpp Mandel karamellis 200g | Nuts, seeds & dried fruit | — | — | 4.89 € (3.85 € Partner) | Selver |
| Pähklinäpp Mandlite ja marjade segu 200g | Nuts, seeds & dried fruit | — | 3.29 € | 3.29 € (2.65 € Partner) | Rimi + Selver |
| Pähklinäpp metsapähkel 250g | Nuts, seeds & dried fruit | — | — | 6.49 € | Selver |
| Pähklinäpp Mooniseemned 200g | Nuts, seeds & dried fruit | 1.99 € | — | 1.99 € | Barbora + Selver |
| Pähklinäpp Mustikakuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | — | Rimi |
| Pähklinäpp Pähkli puuviljasegu classic 500g | Nuts, seeds & dried fruit | — | — | 5.59 € | Selver |
| Pähklinäpp Pähklite ja puuviljade segu 200g | Nuts, seeds & dried fruit | — | 3.69 € | 3.29 € | Selver |
| Pähklinäpp Pähklite segu 200g | Nuts, seeds & dried fruit | — | — | 4.16 € (3.59 € Partner) | Selver |
| Pähklinäpp Passionikuubikud 85g | Nuts, seeds & dried fruit | 1.99 € | 1.59 € | 2.02 € (1.59 € Partner) | Rimi |
| Pähklinäpp Pistaatsiapähkel ilma soolata 200g | Nuts, seeds & dried fruit | — | — | 4.49 € | Selver |
| Pähklinäpp Pistaatsiapähkel meresoolaga 200g | Nuts, seeds & dried fruit | — | 4.49 € | 4.49 € | Rimi + Selver |
| Pähklinäpp Rosin sultana 500g | Nuts, seeds & dried fruit | — | — | 2.79 € | Selver |
| Pähklinäpp Seemnete segu 200g | Nuts, seeds & dried fruit | 2.19 € | — | 2.23 € | Barbora |
| Pähklinäpp Vaarikakuubikud 85g | Nuts, seeds & dried fruit | 1.99 € (1.59 € Aitäh) | 1.59 € | 2.02 € (1.59 € Partner) | Rimi |
| Pcd Soolapähkel 200g | Nuts, seeds & dried fruit | — | — | 1.68 € | Selver |
| Premium Arimex datlid kivita 500g | Nuts, seeds & dried fruit | — | — | 4.97 € | Coop |
| Premium Jõhvika röstitud pähklite segu 300g | Nuts, seeds & dried fruit | — | 5.99 € | 5.65 € | Selver |
| Premium Pistaatsiapähklid arimex 250g | Nuts, seeds & dried fruit | — | — | 4.99 € | Selver |
| Premium Seedermänni seemned 150g | Nuts, seeds & dried fruit | 7.59 € | — | 7.55 € | Selver |
| Seeberger banaanilõigud 150g | Nuts, seeds & dried fruit | — | — | 2.99 € | Coop |
| Seeberger Dattel kivita 200g | Nuts, seeds & dried fruit | — | — | 3.79 € (2.59 € Partner) | Coop |
| Seeberger Kuivatatud mango 100g | Nuts, seeds & dried fruit | 5.49 € | — | 5.49 € | Coop |
| Seeberger Kuivatatud ploomid kivideta 200g | Nuts, seeds & dried fruit | — | 5.29 € | 5.23 € | Selver |
| Seeberger Pähkli puuviljasegu caribic royal 200g | Nuts, seeds & dried fruit | — | — | 4.89 € | Coop |
| Seeberger Pähklisegu luxury 150g | Nuts, seeds & dried fruit | — | — | 6.99 € | Coop |
| Seeberger Puuviljasegu 200g | Nuts, seeds & dried fruit | 4.99 € | — | — | Barbora + Coop |
| Seeberger Viigimarjad kuivatatud 200g | Nuts, seeds & dried fruit | — | 6.29 € | 5.99 € (4.49 € Partner) | Selver |
| Taffel Maapähkel ja kaetud röst sinihallitusj 140g | Nuts, seeds & dried fruit | — | — | 2.33 € | Coop |
| Taffel Maapähkel kaetud röst tshilli vürtsika 140g | Nuts, seeds & dried fruit | — | — | 2.33 € | Coop |
| Taffel Maapähkel röstitud ja kaetud salsa 140g | Nuts, seeds & dried fruit | — | — | 2.33 € | Coop |
| Yes Päevalilleseemned sibula 150g | Nuts, seeds & dried fruit | — | — | 1.99 € | Coop |
| Yes Päevalilleseemned triibulised soolased soolaga 150g | Nuts, seeds & dried fruit | — | — | 1.99 € | Coop |
| Barilla fettuccine 500g | Pasta | 2.32 € | 2.99 € | — | Barbora |
| Barilla fusilli 500g | Pasta | — | 2.35 € | 2.45 € | Rimi |
| Barilla lasagne 500g | Pasta | — | — | 4.65 € | Coop |
| Barilla penne rigate 500g | Pasta | 1.64 € | 2.35 € | 2.45 € | Barbora |
| Barilla Spagetid 500g | Pasta | 1.64 € | 2.35 € | 1.45 € | Selver |
| Barilla tagliatelle 500g | Pasta | — | — | 4.59 € | Coop + Selver |
| Bosto Pärlkuskuss 4x75g | Pasta | — | — | 3.45 € | Selver |
| Delverde fusilli 500g | Pasta | 2.02 € | — | 2.89 € | Barbora |
| Panzani conchiglie rigate 500g | Pasta | — | 2.19 € | 1.99 € | Coop + Selver |
| Panzani coquillette gluteenivaba 400g | Pasta | — | 3.59 € | 3.59 € | Coop |
| Panzani farfalle 500g | Pasta | 1.49 € | 2.19 € | 1.99 € | Barbora |
| Panzani fusilli 1000g | Pasta | — | 4.29 € | 3.39 € | Coop + Selver |
| Panzani fusilli 500g | Pasta | 1.99 € (1.59 € Aitäh) | 2.19 € | 1.59 € | Selver |
| Panzani Laastmakaron nouilles fines 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani Lintspagett linguine 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani macaroni 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani mini penne 500g | Pasta | 1.82 € | — | 2.43 € | Barbora |
| Panzani munaga tagliatelle 400g | Pasta | 2.47 € | 3.29 € | — | Barbora |
| Panzani Munapasta selezione dichef collerette munaga 400g | Pasta | — | — | 3.45 € (2.69 € Partner) | Coop |
| Panzani Munapasta selezione dichef tagliatelle munaga 400g | Pasta | — | — | 3.61 € (2.69 € Partner) | Coop |
| Panzani penne gluteenivaba 400g | Pasta | — | 3.59 € | 3.59 € | Coop |
| Panzani penne rigate 1000g | Pasta | — | 4.29 € | 3.39 € | Coop + Selver |
| Panzani penne rigate 500g | Pasta | 1.49 € | 2.19 € | 1.99 € | Barbora |
| Panzani sarvekesed 500g | Pasta | 1.49 € | 2.19 € | 1.99 € | Barbora |
| Panzani spaghetti 1000g | Pasta | — | 4.29 € | 3.39 € | Coop + Selver |
| Panzani spaghetti 500g | Pasta | — | — | 1.99 € | Coop |
| Panzani spaghetti gluteenivaba 400g | Pasta | — | 3.59 € | 3.59 € | Coop |
| Presto chiffari lisci nr 400g | Pasta | — | 0.69 € | 0.79 € | Rimi |
| Presto cornetti 400g | Pasta | 0.44 € | 0.69 € | 0.79 € | Barbora |
| Presto fusilli 400g | Pasta | 0.44 € | 0.69 € | 0.79 € | Barbora |
| Presto penne 400g | Pasta | — | 0.69 € | 0.79 € | Rimi |
| Reggia bucatini 500g | Pasta | — | — | 1.87 € | Coop |
| Reggia ditalini 500g | Pasta | — | — | 1.87 € | Coop |
| Reggia elbows 500g | Pasta | — | 1.29 € | 1.87 € | Rimi |
| Reggia fusilli 500g | Pasta | — | 1.29 € | 1.87 € (1.29 € Partner) | Rimi |
| Reggia lasagne 500g | Pasta | — | — | 3.15 € | Coop + Selver |
| Reggia spaghetti 500g | Pasta | — | 1.29 € | 1.87 € | Rimi |
| Reggia spaghetti tagliati 500g | Pasta | — | — | 1.87 € (1.29 € Partner) | Coop |
| Reggia tofe 500g | Pasta | — | 1.29 € | 1.87 € (1.29 € Partner) | Rimi |
| Sam mills Sam maisijahust fusilli gl v 500g | Pasta | — | — | 3.35 € | Selver |
| Sam mills Sam penne rigate maisijahust 500g | Pasta | — | — | 3.35 € | Selver |
| Tartu mill chiffari lisci 500g | Pasta | 1.01 € | 1.39 € | 1.39 € | Barbora |
| Tartu mill cornetti 1000g | Pasta | 2.69 € (1.89 € Aitäh) | 2.69 € | — | Barbora + Rimi |
| Tartu mill cornetti 500g | Pasta | 1.01 € | 1.35 € | 1.39 € (1.09 € Partner) | Barbora |
| Tartu mill ditali lisci 500g | Pasta | 1.03 € | 1.39 € | 1.39 € (1.09 € Partner) | Barbora |
| Tartu mill farfalle 500g | Pasta | 1.04 € | 1.39 € | — | Barbora |
| Tartu mill filini piccoli 500g | Pasta | 1.03 € | — | 1.39 € (1.09 € Partner) | Barbora |
| Tartu mill fusilli 1000g | Pasta | 2.69 € (1.89 € Aitäh) | 2.79 € | — | Barbora |
| Tartu mill fusilli 500g | Pasta | 1.01 € | 1.19 € | 1.15 € | Barbora |
| Tartu mill fusilli tricolore 500g | Pasta | 1.39 € | 1.85 € | — | Barbora |
| Tartu mill linquine 500g | Pasta | 1.03 € | 1.39 € | 1.39 € | Barbora |
| Tartu mill maccheroni lisci 500g | Pasta | 1.03 € | 1.39 € | 1.39 € | Barbora |
| Tartu mill mini lasagne 400g | Pasta | 1.01 € | — | 1.39 € (1.15 € Partner) | Barbora |
| Tartu mill penne 500g | Pasta | 1.01 € | 1.35 € | 1.39 € | Barbora |
| Tartu mill puntine 500g | Pasta | 1.03 € | 1.39 € | — | Barbora |
| Tartu mill puntine grandi 500g | Pasta | — | — | 1.39 € (1.15 € Partner) | Coop |
| Tartu mill Spagetid nr 7 500g | Pasta | 1.01 € | — | 1.15 € | Barbora |
| Tartu mill Täistera chiffari lisci 500g | Pasta | — | — | 1.47 € (1.19 € Partner) | Coop |
| Tartu mill Täistera fusilli 500g | Pasta | 1.10 € | — | 1.47 € (1.19 € Partner) | Barbora |
| Tartu mill täistera penne rigate 500g | Pasta | — | — | 1.47 € | Coop |
| Tartu mill Täistera spagetid nr 7 500g | Pasta | 1.10 € | — | 1.47 € | Barbora |
| Adidas Dushigeel in ice dive meeste 250ml | Personal care | — | — | 4.99 € | Selver |
| Adidas in victory league d geel 250ml | Personal care | — | — | 4.99 € | Selver |
| Adidas pure game in d g 250ml | Personal care | — | — | 4.99 € | Selver |
| Always H side ultra extra night protect duo 12 | Personal care | — | — | 5.09 € | Coop + Selver |
| Always H side ultra night duo 14 | Personal care | — | — | 5.07 € | Selver |
| Always H side ultra normal plus duopack 20 | Personal care | — | — | 5.09 € | Coop |
| Always H side ultra platinum super plus duo 14 | Personal care | — | — | 5.28 € (3.99 € Partner) | Coop |
| Always H side ultra super plus duo 16 | Personal care | — | — | 5.07 € | Selver |
| Always long unscented p kaitse 52 | Personal care | — | — | 5.88 € | Selver |
| Always normal deo p k 58 | Personal care | — | — | 5.88 € | Selver |
| Always Pesukaitse extra long single 44 | Personal care | — | — | 4.39 € | Selver |
| Always Pesukaitse normal 60 | Personal care | — | — | 5.99 € | Coop |
| Always ultra plus quattro h side 40 | Personal care | — | — | 5.99 € | Selver |
| Always ultra super quat pack h side 32 | Personal care | — | — | 8.63 € (5.99 € Partner) | Coop |
| Aussie Palsam sos repair revive 200ml | Personal care | 10.69 € | 10.69 € | — | Barbora + Rimi |
| Aussie Šampoon sos repair revive 300ml | Personal care | 10.69 € | 10.69 € | — | Barbora + Rimi |
| Batiste Kuivšampoon original 200ml | Personal care | 6.79 € | 4.75 € | 6.80 € | Rimi |
| Batiste Kuivšampoon sensitive 200ml | Personal care | — | 4.75 € | 7.10 € | Rimi |
| Batiste Kuivšampoon tropical 200ml | Personal care | 6.79 € | 6.79 € | — | Barbora + Rimi |
| Batiste Kuivšampoon xxl volume 200ml | Personal care | 7.29 € | — | 7.31 € | Coop |
| Bic Raseerija new twin pastel ühekordne 2 | Personal care | — | — | 1.79 € | Selver |
| Biorepair Hambapasta pro white 75ml | Personal care | — | 8.19 € | — | Coop |
| Biorepair kids h pasta 50ml | Personal care | — | — | 4.99 € | Selver |
| Carefree long plus fresh pesukaitse 40 | Personal care | — | — | 4.87 € (4.19 € Partner) | Selver |
| Colgate cavity h p protec white 75ml | Personal care | — | — | 1.79 € (1.39 € Partner) | Selver |
| Colgate h hari black medium 1 | Personal care | — | — | 5.39 € (3.69 € Partner) | Coop |
| Colgate H hari high density charcoal soft pakk 2 | Personal care | — | — | 5.99 € (3.49 € Partner) | Coop |
| Colgate Hambahari high density charcoal soft | Personal care | — | — | 3.59 € | Coop |
| Colgate hambahari max white charcoal 2 | Personal care | — | — | 6.09 € (4.39 € Partner) | Coop |
| Colgate Hambahari max white soft 1 | Personal care | — | — | 4.09 € (2.49 € Partner) | Coop + Selver |
| Colgate Hambahari slim soft charcoal 1 | Personal care | — | — | 3.59 € | Selver |
| Colgate Hambahari zig zag medium 1 | Personal care | — | — | 1.29 € | Selver |
| Colgate Hambapasta advanced white 125ml | Personal care | 4.29 € | 2.55 € | — | Rimi |
| Colgate Hambapasta advanced white 75ml | Personal care | 3.19 € | 2.29 € | 3.79 € | Rimi |
| Colgate Hambapasta advanced white charcoal 75ml | Personal care | — | — | 3.79 € | Coop |
| Colgate Hambapasta big kids smiles 50ml | Personal care | — | — | 3.69 € | Coop |
| Colgate Hambapasta max white 125ml | Personal care | 4.69 € | — | 4.99 € | Barbora |
| Colgate Hambapasta max white crystals 75ml | Personal care | — | 2.39 € | 2.99 € | Rimi |
| Colgate Hambapasta max white one 75ml | Personal care | 7.49 € | — | 7.29 € (4.29 € Partner) | Selver |
| Colgate Hambapasta max white purple reveal 75ml | Personal care | — | — | 7.39 € | Coop |
| Colgate Hambapasta max white sparkle diamonds 75ml | Personal care | — | — | 4.09 € (2.69 € Partner) | Coop |
| Colgate Hambapasta multi protect 50ml | Personal care | 9.19 € (5.05 € Aitäh) | 4.99 € | — | Rimi |
| Colgate Hambapasta total original 75ml | Personal care | 4.19 € | — | 4.69 € | Barbora |
| Colgate Hambapasta total whitening 75ml | Personal care | 4.19 € | — | 4.69 € | Barbora |
| Colgate Hambapasta triple action 125ml | Personal care | 3.19 € (2.29 € Aitäh) | — | 3.69 € | Barbora + Coop |
| Colgate Hambapasta triple action 75ml | Personal care | 2.49 € | 2.15 € | 2.69 € | Coop |
| Colgate max fresh cool cryst h p 75ml | Personal care | — | — | 4.09 € (1.99 € Partner) | Coop |
| Colgate max white charcoal h p 75ml | Personal care | — | — | 7.39 € | Coop |
| Colgate Suuvesi cool mint 500ml | Personal care | — | — | 8.43 € (5.19 € Partner) | Coop |
| Colgate total gum care sensitivih p 75ml | Personal care | — | — | 4.79 € | Coop |
| Colgate total suuvesi 500ml | Personal care | — | 8.29 € | 8.29 € | Rimi + Selver |
| Corega proteesiliim eriti tugev 40g | Personal care | — | 8.89 € | 8.59 € | Selver |
| Corega Proteesiliim gum care 40g | Personal care | — | 7.79 € | 7.99 € | Rimi |
| Deodorant fa fresh dry green tea 150ml | Personal care | — | — | 4.99 € (3.49 € Partner) | Coop |
| Deodorant fa fresh dry peony sorbet 150ml | Personal care | — | — | 4.99 € | Coop |
| Deodorant fa pink passion naiste 150ml | Personal care | — | — | 4.99 € | Coop |
| Discreet Pesukaitse deo waterlily 60 | Personal care | — | — | 4.36 € | Selver |
| Discreet Pesukaitse ultra mini tena uriinipid 28 | Personal care | — | — | 3.99 € | Selver |
| Discreet Uriinipidamatuse sidemed tena mini 20 | Personal care | — | — | 3.99 € | Selver |
| Dove advanced care original rulldeo 50ml | Personal care | — | — | 5.99 € (4.09 € Partner) | Coop |
| Dove Deodorant invisible care 150ml | Personal care | 4.55 € | — | 5.99 € | Barbora |
| Dove Deodorant pearl aloe vera 150ml | Personal care | 4.55 € | 5.19 € | — | Barbora |
| Dove Dushigeel deeply nourishing 225ml | Personal care | — | — | 6.29 € (4.39 € Partner) | Coop + Selver |
| Dove Dushigeel eucalyptus mint 400ml | Personal care | — | — | 6.29 € (4.29 € Partner) | Coop |
| Dove Dušigeel creamy indulge 450ml | Personal care | 6.99 € (4.49 € Aitäh) | 7.59 € | — | Barbora |
| Dove Dušigeel creamy indulge 720ml | Personal care | 6.99 € | 10.99 € | — | Barbora |
| Dove Dušigeel deeply nourishing 400ml | Personal care | 7.99 € | — | 8.99 € (6.09 € Partner) | Barbora |
| Dove Dušigeel fresh care 450ml | Personal care | 5.01 € | 7.59 € | — | Barbora |
| Dove Dušigeel gentle pamper 450ml | Personal care | 5.01 € | 7.59 € | — | Barbora |
| Dove Dušigeel hydrate 450ml | Personal care | 5.01 € | 7.59 € | — | Barbora |
| Dove Dušigeel nourishing care 400ml | Personal care | 5.24 € | 8.49 € | — | Barbora |
| Dove Dušigeel rebalancing 400ml | Personal care | 7.49 € (4.99 € Aitäh) | 5.79 € | — | Rimi |
| Dove fresh touch kreemseep 90g | Personal care | — | — | 1.99 € | Coop |
| Dove Kreemseep 90g | Personal care | — | — | 1.99 € (1.29 € Partner) | Coop |
| Dove men Dushigeel clean comfort 250ml | Personal care | — | — | 4.79 € (3.29 € Partner) | Coop |
| Dove Tükiseep replenishing 90g | Personal care | 1.79 € (1.09 € Aitäh) | — | 1.79 € | Barbora + Selver |
| Dove Vedelseep fresh täide 500ml | Personal care | 3.99 € (2.49 € Aitäh) | 4.19 € | — | Barbora |
| Dushigeel fa yoghurt blueberry 400ml | Personal care | — | — | 5.49 € | Coop |
| Ecodenta valg must süsi h pasta 100ml | Personal care | — | — | 5.49 € | Coop |
| Elmex Hambapasta caries protection 75ml | Personal care | 5.99 € (4.39 € Aitäh) | 5.99 € | 5.99 € | Barbora + Rimi + Selver |
| Elmex Hambapasta children 50ml | Personal care | — | — | 4.39 € | Selver |
| Elmex Hambapasta junior 75ml | Personal care | — | 5.99 € | 6.69 € | Rimi |
| Elmex Hambapasta sensitive 75ml | Personal care | 6.19 € | 5.99 € | 6.89 € (4.59 € Partner) | Rimi |
| Elmex Hambapasta sensitive plus 75ml | Personal care | 8.79 € | 8.79 € | — | Barbora + Rimi |
| Elmex Hambapasta sensitive professional 75ml | Personal care | — | 8.79 € | 8.99 € | Rimi |
| Elmex Hambapasta sensitive whitening 75ml | Personal care | — | 5.99 € | 6.89 € (4.59 € Partner) | Rimi |
| Elmex Suuvesi caries protection 400ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elmex Suuvesi sensitive 400ml | Personal care | 8.19 € | — | 8.99 € | Barbora |
| Elseve Juuksekreem dream length 200ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elseve Juuksemask hyaluron plump 300ml | Personal care | 9.19 € | 9.79 € | — | Barbora |
| Elseve Juukseõli extraordinary oil 100ml | Personal care | 14.99 € | 14.99 € | — | Barbora + Rimi |
| Elseve Juukseseerum hyaluron plump 150ml | Personal care | 7.99 € | 7.99 € | — | Barbora + Rimi |
| Elseve Palsam bond repair 150ml | Personal care | 10.99 € | 10.99 € | 11.17 € | Coop |
| Elseve Palsam color vive 400ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elseve Palsam color vive uv filter 200ml | Personal care | — | 4.19 € | 5.99 € | Rimi |
| Elseve Palsam dream long 200ml | Personal care | — | — | 5.99 € | Coop |
| Elseve Palsam extraordinary oil 200ml | Personal care | 5.99 € | 4.19 € | 5.99 € | Rimi |
| Elseve Palsam full resist 200ml | Personal care | 5.79 € | — | — | Coop |
| Elseve Palsam glycolic gloss 150ml | Personal care | — | — | 10.15 € | Coop |
| Elseve Palsam hyaluron plump 200ml | Personal care | 5.99 € | 4.19 € | 5.99 € | Rimi |
| Elseve Palsam hyaluron plump 400ml | Personal care | 8.19 € | — | 8.12 € (5.79 € Partner) | Coop |
| Elseve Palsam total repair 5 200ml | Personal care | 5.99 € | 4.19 € | 5.99 € | Rimi |
| Elseve Šampoon color vive 400ml | Personal care | 7.99 € | 8.19 € | — | Barbora |
| Elseve Šampoon dream long 1000ml | Personal care | 19.99 € (9.99 € Aitäh) | 9.99 € | — | Rimi |
| Elseve Šampoon hyaluron plump 1000ml | Personal care | 19.99 € (9.99 € Aitäh) | 9.99 € | — | Rimi |
| Elseve Šampoon hyaluron plump 250ml | Personal care | 5.99 € | 4.19 € | — | Rimi |
| Elseve Šampoon hyaluron plump 400ml | Personal care | 8.19 € | 8.19 € | — | Barbora + Rimi |
| Elseve Šampoon total repair 5 400ml | Personal care | 7.99 € | 8.19 € | — | Barbora |
| Elseve Shampoon dream long 250ml | Personal care | — | — | 5.99 € | Coop |
| Elseve Shampoon extraordinary oil 250ml | Personal care | — | — | 5.99 € | Coop |
| Elseve Shampoon glycolic gloss 200ml | Personal care | — | — | 10.15 € | Coop |
| Elseve Shampoon hyaluron plump 250ml | Personal care | — | — | 5.99 € | Coop |
| Elseve Shampoon hyaluron plump 400ml | Personal care | — | — | 8.12 € (5.79 € Partner) | Coop |
| Elseve Shampoon total repair 5 250ml | Personal care | — | — | 5.99 € | Coop |
| Fa Deodorant pink passion 150ml | Personal care | 4.79 € (2.99 € Aitäh) | 3.19 € | — | Rimi |
| Fa Dušigeel attraction force men 400ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Fa Dušigeel coconut milk 400ml | Personal care | 5.49 € | 4.09 € | — | Rimi |
| Fa Dušigeel cream oil cacao 400ml | Personal care | 5.49 € | 3.59 € | — | Rimi |
| Fa Dušigeel divine moments 400ml | Personal care | 5.49 € | — | 5.49 € | Barbora + Coop + Selver |
| Fa Dušigeel fiji dream 400ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Fa Dušigeel men xtracool 400ml | Personal care | 5.49 € | 3.59 € | — | Rimi |
| Fa Dušigeel soft pistachio honey 400ml | Personal care | — | 3.59 € | 5.49 € | Rimi |
| Fa Dušigeel yogh blueberry 400ml | Personal care | 5.49 € | 3.49 € | — | Rimi |
| Fa Dušigeel yogurt aloe vera 400ml | Personal care | 5.49 € (3.49 € Aitäh) | — | 5.49 € | Barbora + Coop + Selver |
| Fa fresh dry green tea rulldeo 50ml | Personal care | — | — | 4.99 € (3.49 € Partner) | Coop |
| Fa island vibes fidji dream d geel 250ml | Personal care | — | — | 4.49 € (2.99 € Partner) | Coop + Selver |
| Fa men Deodorant sport 150ml | Personal care | — | — | 4.99 € | Coop |
| Fa men Dushigeel extreme cool 250ml | Personal care | — | — | 4.49 € | Coop + Selver |
| Fa men Dushigeel sport 400ml | Personal care | — | — | 5.49 € | Coop + Selver |
| Fa men Fa chedarwood d geel 400ml | Personal care | — | — | 3.99 € | Selver |
| Fa men Fa spicy bergamot d geel 400ml | Personal care | — | — | 5.49 € | Coop + Selver |
| Fa yoghurt aloe vera d geel 250ml | Personal care | — | — | 4.49 € (2.99 € Partner) | Coop + Selver |
| Flora Lasteseep 90g | Personal care | — | — | 1.27 € | Selver |
| Frosch Vedelseep granaatõun täitepakend 500ml | Personal care | — | — | 2.99 € | Coop |
| Fructis aloe hydra bomb palsam 200ml | Personal care | — | 5.29 € | — | Rimi |
| Fructis grow strong orange shamp 400ml | Personal care | — | — | 6.89 € | Coop |
| Fructis hair food banana shamp 350ml | Personal care | — | — | 8.29 € | Coop |
| Fructis in shamp 400ml | Personal care | — | — | 6.89 € | Coop |
| Fructis Palsam color resist 200ml | Personal care | 4.99 € | 5.29 € | — | Barbora |
| Fructis Palsam damage goodbye juust kahju 200ml | Personal care | — | — | 5.39 € | Selver |
| Fructis Šampoon color resist 400ml | Personal care | 5.99 € | 4.29 € | — | Rimi |
| Fructis Shampoon goodbye damage kahjustatud 250ml | Personal care | — | — | 5.19 € | Coop + Selver |
| Fructis Shampoon in juust norm sh strengt 250ml | Personal care | — | — | 5.19 € | Coop + Selver |
| Garnier botanic ricin almon pals th 200ml | Personal care | — | — | 5.69 € (3.99 € Partner) | Coop |
| Garnier botanic ricin almond sh th 400ml | Personal care | — | — | 6.59 € (4.49 € Partner) | Coop |
| Garnier dry mag men min rulldeo ult 50ml | Personal care | — | — | 5.59 € | Coop |
| Garnier min in must white col 150ml | Personal care | — | — | 6.29 € | Coop |
| Garnier mineral Garnier action control deo 150ml | Personal care | — | — | 6.29 € | Coop |
| Garnier mineral Garnier deo extreme meeste 150ml | Personal care | — | — | 6.29 € | Coop |
| Garnier mineral Garnier men bl c rulldeo wh 50ml | Personal care | — | — | 5.59 € | Coop |
| Garnier mineral Garnier protect rulldeo 6 50ml | Personal care | — | — | 5.79 € | Coop |
| Garnier mineral Garnier protection deo 6 150ml | Personal care | — | — | 6.29 € | Coop |
| Garnier mineral Garnier wom hyaluron deo 150ml | Personal care | — | — | 6.29 € | Coop |
| Garnier mineral Rulldeo action control 50ml | Personal care | — | — | 5.79 € | Coop |
| Garnier mineral Rulldeo in must white col 50ml | Personal care | — | — | 5.79 € | Coop |
| Garnier mineral Rulldeo men extreme 50ml | Personal care | 5.39 € | — | 5.59 € | Barbora |
| Garnier Palsam botanic honey propolis ther 200ml | Personal care | — | — | 5.69 € (3.99 € Partner) | Coop |
| Garnier women bwc cl cotton rulldeo 50ml | Personal care | — | — | 5.59 € | Coop |
| Gillette fusion terad | Personal care | — | — | 36.90 € | Selver |
| Gillette fusion terad käepide alusega | Personal care | — | — | 26.32 € | Selver |
| Gillette Habemepalsam king c 100ml | Personal care | 13.19 € | 13.19 € | — | Barbora + Rimi |
| Gillette Raseerija mach charcoal up | Personal care | — | — | 11.99 € | Coop |
| Gillette Raseerija mach tera 5 | Personal care | — | — | 18.49 € (13.99 € Partner) | Selver |
| Gillette sensor comfort käep terad | Personal care | — | — | 11.29 € | Selver |
| Gillette Terad fusion proglide 4 | Personal care | — | — | 26.32 € | Selver |
| Gillette Terad mach 5 | Personal care | — | — | 18.89 € | Selver |
| Gillette Terad sensor comfort | Personal care | — | — | 9.99 € (8.19 € Partner) | Selver |
| Gillette venus Gillette olay sugarberry raseerija 1 | Personal care | — | — | 13.09 € | Coop |
| Gillette venus Gillette olay sugarberry terad 3 | Personal care | — | — | 16.99 € | Selver |
| Gillette venus Gillette raseerija tera 2 | Personal care | — | — | 10.89 € | Selver |
| Gillette venus Gillette smooth terad | Personal care | — | — | 23.90 € | Selver |
| Gillette venus Raseerija breeze tera 1 | Personal care | — | — | 13.09 € | Coop |
| Gillette venus Terad breeze 4 | Personal care | — | — | 18.49 € | Selver |
| Gillette venus Terad for women 4 | Personal care | — | — | 13.59 € | Selver |
| Gliss exp rep ultim repair pals väga 200ml | Personal care | — | — | 8.12 € | Coop |
| Gliss Juuksemask in nourish 400ml | Personal care | — | 10.69 € | 11.17 € | Rimi |
| Gliss Juuksemask in shine 400ml | Personal care | 10.69 € | — | 11.17 € | Barbora |
| Gliss kur Gliss expr rep split ends pals 200ml | Personal care | — | — | 8.12 € | Coop |
| Gliss kur Shampoon ultimate repair väga 250ml | Personal care | — | — | 5.69 € | Coop |
| Gliss oil nutrive shampoon 400ml | Personal care | — | — | 7.59 € | Coop |
| Gliss Palsam full hair wonder 200ml | Personal care | 5.39 € | — | 5.69 € | Barbora |
| Gliss Palsam liquid silk 200ml | Personal care | 5.39 € | 6.19 € | — | Barbora |
| Gliss Palsam oil nutritive 200ml | Personal care | 5.39 € | 5.99 € | — | Barbora |
| Gliss Palsam ultimate repair 200ml | Personal care | 5.39 € | — | 5.69 € | Barbora |
| Gliss Šampoon blond perfector 250ml | Personal care | 7.19 € | 7.19 € | — | Barbora + Rimi |
| Gliss Šampoon full hair wonder 400ml | Personal care | — | 7.19 € | 7.59 € | Rimi |
| Gliss Šampoon liquid silk 400ml | Personal care | 6.59 € | 7.19 € | — | Barbora |
| Gliss Šampoon oil nutritive 400ml | Personal care | 6.59 € | 7.19 € | — | Barbora |
| Gliss Šampoon scalp gentle 200ml | Personal care | 10.29 € | — | 10.99 € | Barbora |
| Gliss Šampoon ultimate repair 400ml | Personal care | 6.59 € | — | 7.59 € | Barbora |
| Gliss Seerum full hair wonder 100ml | Personal care | — | 12.99 € | 13.20 € | Rimi |
| Gliss Shampoon liquid silk 400ml | Personal care | — | — | 7.59 € | Coop |
| Gliss split ends miracle shamp 250ml | Personal care | — | — | 5.69 € | Coop |
| Gliss split ends miracle shamp 400ml | Personal care | — | 7.19 € | 7.59 € | Coop + Rimi |
| Gliss Spreipalsam full hair wonder 200ml | Personal care | — | 8.15 € | 8.12 € | Selver |
| Gliss ultimate color palsam 200ml | Personal care | — | 5.99 € | 5.69 € | Coop |
| Gliss ultimate color shampoon 400ml | Personal care | — | — | 7.59 € | Coop |
| Got2b Juukselakk glued 300ml | Personal care | 10.39 € | 10.99 € | 10.15 € | Selver |
| Hambapasta bam d white cool water 75ml | Personal care | — | — | 2.53 € (2.19 € Partner) | Selver |
| Head & shoulders Šampoon clarify shine 400ml | Personal care | — | 8.79 € | 9.44 € | Rimi |
| Head & shoulders Šampoon classic clean 800ml | Personal care | — | 18.99 € | 18.99 € | Rimi + Selver |
| Head & shoulders Šampoon menthol 800ml | Personal care | — | 18.99 € | 18.99 € | Rimi + Selver |
| Head & shoulders Šampoon menthol in 400ml | Personal care | — | 8.99 € | 9.44 € (7.29 € Partner) | Rimi |
| Head&shoulders Head shamp citrus fresh 400ml | Personal care | — | — | 9.44 € | Coop |
| Head&shoulders Šampoon citrus 800ml | Personal care | 18.99 € | 17.99 € | — | Rimi |
| Head&shoulders Šampoon citrus in 400ml | Personal care | 9.09 € | — | 9.44 € (7.29 € Partner) | Barbora |
| Head&shoulders Šampoon menthol 400ml | Personal care | 9.09 € (5.99 € Aitäh) | 9.99 € | — | Barbora |
| Head&shoulders Šampoon sensitive 400ml | Personal care | 9.09 € | — | 9.44 € | Barbora |
| Head&shoulders Šampoon tea tree 400ml | Personal care | 9.09 € | — | 9.44 € | Barbora |
| Head&shoulders Shampoon apple fresh 400ml | Personal care | — | 10.29 € | 9.44 € | Coop |
| Head&shoulders Shampoon classic clean 400ml | Personal care | — | — | 9.44 € | Coop |
| Head&shoulders Shampoon in classic clean 250ml | Personal care | — | — | 7.41 € (5.39 € Partner) | Selver |
| Himalaya Hambapasta sparkly white 75ml | Personal care | 4.79 € | 4.79 € | — | Barbora + Rimi |
| Jordan expand hambaniit m paisuv 25 | Personal care | — | — | 3.04 € | Selver |
| Jordan green clean medium h hari 1 | Personal care | — | — | 3.55 € | Selver |
| Jordan green clean soft h hari 1 | Personal care | — | — | 3.55 € | Selver |
| Jordan H kids p piimaham sulfaafivaba 50ml | Personal care | — | — | 2.69 € | Coop |
| Jordan H p junior sulfaadivaba 50ml | Personal care | — | — | 2.69 € | Selver |
| Jordan Hambahari 1 | Personal care | — | — | 2.33 € (1.99 € Partner) | Coop |
| Jordan hambahari clean between medium 1 | Personal care | — | — | 2.43 € | Selver |
| Jordan Hambahari clean between soft 1 | Personal care | — | — | 2.43 € | Selver |
| Jordan Hambahari step lastele harjaste tops 1 | Personal care | — | — | 2.33 € (1.99 € Partner) | Coop |
| Jordan Hambahari target sensitive ultrasoft 1 | Personal care | — | — | 2.79 € | Coop |
| Jordan Hambahari target white soft 1 | Personal care | — | — | 2.84 € | Coop |
| Jordan Hambahari ultralite sensitive soft 1 | Personal care | — | — | 3.55 € (2.79 € Partner) | Selver |
| Jordan Hambapasta caries defence 75ml | Personal care | 2.65 € | — | 2.89 € | Barbora |
| Jordan Hambapasta fresh breath 75ml | Personal care | 2.65 € | 2.79 € | 2.89 € | Barbora |
| Jordan Hambapasta white smile 75ml | Personal care | 2.65 € | 2.79 € | 2.89 € (2.29 € Partner) | Barbora |
| Jordan stay fresh sensitive h pasta 75ml | Personal care | — | — | 2.89 € (2.29 € Partner) | Coop |
| Jordan ultralite sensi h hari ultrasoft 1 | Personal care | — | — | 3.55 € | Selver |
| Kotex Tampoonid ultra sorb normal 16 | Personal care | — | — | 3.89 € | Coop |
| Kotex Tampoonid ultra sorb super 16 | Personal care | — | — | 3.89 € | Coop |
| Lady speed stick Geeldeo fitness gel 65g | Personal care | — | — | 7.99 € | Coop |
| Libresse dailies long ext p kaitse 42 | Personal care | — | — | 4.46 € | Coop |
| Libresse goodnight ultra x large h s 8 | Personal care | — | — | 2.69 € | Coop + Selver |
| Libresse H side goodnight maxi wings 10 | Personal care | — | — | 2.39 € | Coop |
| Libresse H side ultra long wings 8 | Personal care | — | — | 2.29 € | Coop |
| Libresse natural care reg wings h s 20 | Personal care | — | — | 2.39 € | Selver |
| Libresse Pesukaitse dailies style black 30 | Personal care | — | — | 2.63 € | Selver |
| Libresse Pesukaitse natural care dailies reg 40 | Personal care | — | — | 1.79 € | Selver |
| Libresse ultra long wings duo h s 2 | Personal care | — | — | 2.39 € | Selver |
| Listerine Suuvesi advanced white 500ml | Personal care | 7.09 € | — | — | Barbora |
| Listerine Suuvesi cool mint mild taste 250ml | Personal care | — | 4.29 € | 3.99 € | Selver |
| Listerine Suuvesi coolmint 1000ml | Personal care | 10.15 € | — | 10.15 € | Barbora + Selver |
| Listerine Suuvesi coolmint 500ml | Personal care | 6.09 € | — | 6.89 € | Barbora |
| Listerine Suuvesi freshburst 500ml | Personal care | 6.09 € | 6.69 € | 6.99 € | Barbora |
| Listerine Suuvesi total care 1000ml | Personal care | — | 7.79 € | 10.99 € | Rimi |
| Listerine Suuvesi total care 500ml | Personal care | 7.09 € | — | 8.29 € | Barbora |
| Listerine Suuvesi total care extra mild 500ml | Personal care | — | 7.69 € | 8.29 € | Rimi |
| Loreal men expert anti mark rulldeo 50ml | Personal care | — | — | 6.69 € | Coop |
| Mayeri Dušigeel sensitive 300ml | Personal care | 4.39 € | 4.39 € | — | Barbora + Rimi |
| Mayeri Vahuseep grapefruit 300ml | Personal care | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Mayeri Vahuseep sensitive 300ml | Personal care | 2.85 € | 2.85 € | 2.99 € (2.19 € Partner) | Barbora + Rimi |
| Natura estonica Šampoon power c 400ml | Personal care | — | 5.49 € | 5.58 € | Rimi |
| Natura siberica Palsam loves estonia 400ml | Personal care | — | — | 7.10 € | Selver |
| Naturalis Kätekreem aloe vera 125ml | Personal care | 2.99 € | — | 2.43 € (2.09 € Partner) | Selver |
| Naturalis Kätekreem mandliõliga 125ml | Personal care | 2.99 € | — | 2.43 € (2.09 € Partner) | Selver |
| Naturella H side ultra normal duo 20 | Personal care | — | — | 4.26 € | Selver |
| Neutral Seep 100g | Personal care | — | — | 1.51 € | Selver |
| Neutral Seep sensitive skin 100g | Personal care | 1.59 € | 1.39 € | — | Rimi |
| Neutrogena Ihupiim intense repair taastav 400ml | Personal care | — | — | 9.99 € (8.69 € Partner) | Selver |
| Neutrogena Kätekreem kiiresti imenduv 75ml | Personal care | — | 5.89 € | — | Rimi |
| Neutrogena Kehakreem toitev 300ml | Personal care | — | — | 7.49 € (7.19 € Partner) | Selver |
| Nivea b w ultim imp deo meeste 150ml | Personal care | — | — | 5.59 € | Coop + Selver |
| Nivea beauty pearl deo naiste 150ml | Personal care | — | — | 5.59 € (3.79 € Partner) | Coop |
| Nivea black deo fr meeste power wh 50ml | Personal care | — | — | 5.59 € (3.89 € Partner) | Coop + Selver |
| Nivea cool kick rulldeo 50ml | Personal care | — | — | 5.59 € (3.89 € Partner) | Coop + Selver |
| Nivea Deodorant clear must white naiste 150ml | Personal care | — | — | 5.59 € | Coop |
| Nivea Deodorant power must white meeste 150ml | Personal care | — | — | 5.59 € | Coop + Selver |
| Nivea Dushigeel active clean for men 250ml | Personal care | — | — | 4.56 € | Selver |
| Nivea Dushigeel active clean meeste 500ml | Personal care | — | — | 7.61 € (4.99 € Partner) | Coop |
| Nivea Dušigeel care apricot 500ml | Personal care | 7.25 € | 7.25 € | — | Barbora + Rimi |
| Nivea Dušigeel care star fruit 500ml | Personal care | 7.25 € | 7.25 € | 7.10 € (4.89 € Partner) | Selver |
| Nivea Dušigeel creme soft 250ml | Personal care | 4.49 € | — | 4.56 € | Barbora |
| Nivea Dušigeel creme soft 750ml | Personal care | 9.19 € | 6.79 € | — | Rimi |
| Nivea Dušigeel lemon oil 250ml | Personal care | 4.49 € | 3.29 € | — | Rimi |
| Nivea Dušigeel lemon oil 500ml | Personal care | 7.25 € | 5.29 € | — | Rimi |
| Nivea Dušigeel men sport 500ml | Personal care | 7.25 € | 7.25 € | — | Barbora + Rimi |
| Nivea for men shampoon 250ml | Personal care | — | — | 4.99 € | Selver |
| Nivea fresh rulldeo naiste 50ml | Personal care | — | — | 5.59 € | Coop |
| Nivea Ihupiim aloe hydration 400ml | Personal care | 9.79 € | 9.99 € | 9.99 € | Barbora |
| Nivea Ihupiim aloe hydration 625ml | Personal care | 9.99 € | 10.99 € | — | Barbora |
| Nivea Ihupiim nourishing toitev kuiv nahk 250ml | Personal care | — | — | 7.99 € | Selver |
| Nivea Juukselakk ultra strong 250ml | Personal care | 5.31 € | — | 7.61 € | Barbora |
| Nivea Kreem universaalne 75ml | Personal care | — | 2.95 € | 3.55 € | Rimi |
| Nivea lemon oil d geel naiste 250ml | Personal care | — | — | 4.56 € | Selver |
| Nivea men Pulkdeo fresh active 50ml | Personal care | 5.19 € | — | — | Barbora |
| Nivea power must white deo meeste 50ml | Personal care | — | — | 5.59 € | Coop + Selver |
| Nivea repair care ihupiim 400ml | Personal care | — | — | 9.99 € | Selver |
| Nivea Rulldeo beauty pearl naiste 50ml | Personal care | — | — | 5.59 € (3.79 € Partner) | Coop |
| Nivea Rulldeo fresh meeste 50ml | Personal care | — | — | 5.59 € | Coop + Selver |
| Nivea Šampoon color cristal gloss 250ml | Personal care | 3.35 € | — | 4.79 € | Barbora |
| Nivea Šampoon palsam in 2 250ml | Personal care | 3.35 € | — | 4.79 € | Barbora |
| Nivea Šampoon volume sensation 250ml | Personal care | 3.35 € | — | 4.79 € (3.29 € Partner) | Barbora |
| Nurme käte ja ihupiim sidrunheina 300ml | Personal care | — | 17.15 € | — | Coop |
| Nurme Palsam rosmariini 250ml | Personal care | — | — | 11.99 € | Coop |
| Nurme Palsam sidrunheina 250ml | Personal care | 11.19 € | — | — | Coop |
| Nurme Shampoon rosmariini provitamin b 250ml | Personal care | — | — | 10.99 € | Coop |
| O.b. Tampoonid super mahe 16 | Personal care | — | — | 4.77 € | Selver |
| Ogx Šampoon biotin collagen 385ml | Personal care | 14.99 € | — | 8.99 € | Selver |
| Old spice Deodorant oasis 150ml | Personal care | 5.05 € | 5.19 € | — | Barbora |
| Old spice Deodorant tiger claw 150ml | Personal care | 5.05 € | — | 5.07 € | Barbora |
| Old spice Deodorant wolfthorn 150ml | Personal care | 5.05 € | 5.19 € | — | Barbora |
| Old spice Dušigeel bearglove 400ml | Personal care | 5.75 € | 4.99 € | 5.78 € | Rimi |
| Old spice Dušigeel captain 1000ml | Personal care | 11.59 € | 7.99 € | — | Rimi |
| Old spice Dušigeel captain 400ml | Personal care | 5.79 € | 5.99 € | 5.78 € | Coop |
| Old spice Dušigeel night panther 400ml | Personal care | 5.75 € | 4.99 € | 5.78 € (4.69 € Partner) | Rimi |
| Old spice Dušigeel oasis 400ml | Personal care | 5.75 € | 5.99 € | — | Barbora |
| Old spice Dušigeel rockstar 400ml | Personal care | 5.75 € | 5.99 € | 6.09 € | Barbora |
| Old spice Dušigeel tiger claw 400ml | Personal care | 5.75 € | 6.19 € | 5.69 € | Selver |
| Old spice Dušigeel whitewater 1000ml | Personal care | 12.49 € | 7.99 € | — | Rimi |
| Old spice Dušigeel whitewater 400ml | Personal care | 5.75 € (4.49 € Aitäh) | 5.99 € | 5.78 € | Barbora |
| Old spice Dušigeel wolfthorn 400ml | Personal care | 5.75 € | 5.99 € | — | Barbora |
| Old spice Pulkdeo bearglove 50ml | Personal care | — | 4.29 € | 5.07 € | Rimi |
| Old spice Pulkdeo captain 50ml | Personal care | — | 5.19 € | 5.07 € | Selver |
| Old spice Pulkdeo tiger claw 50ml | Personal care | — | — | 4.99 € | Selver |
| Old spice Pulkdeo whitewater 85ml | Personal care | 9.19 € (5.97 € Aitäh) | — | — | Coop |
| Old spice Pulkdeo whitewater meeste 50ml | Personal care | 5.05 € (3.99 € Aitäh) | — | 3.99 € | Selver |
| Old spice Pulkdeo wolfthorne 50ml | Personal care | — | — | 5.07 € | Selver |
| Old spice Pulkdeodorant oasis 50ml | Personal care | 5.05 € | 5.19 € | — | Barbora |
| Oral-b Hambaniit vahatatud m 50 | Personal care | — | — | 3.79 € | Coop |
| Oral-b Oral junior hambapasta 75ml | Personal care | — | — | 4.29 € | Coop |
| Orto Kätekreem kummeli glütseriiniga 75ml | Personal care | — | — | 2.09 € | Coop |
| Palmolive aroma ess ult relax d g 500ml | Personal care | — | — | 7.39 € | Coop + Selver |
| Palmolive D geel aroma essence sweet delight 500ml | Personal care | — | — | 7.39 € (3.99 € Partner) | Coop + Selver |
| Palmolive D geel sr with nat aha papaya peach 500ml | Personal care | — | — | 7.39 € | Coop + Selver |
| Palmolive Dushigeel for men energising 500ml | Personal care | — | — | 7.39 € | Coop + Selver |
| Palmolive Dushigeel for men intense spice up 500ml | Personal care | — | — | 4.99 € | Selver |
| Palmolive Dushigeel men energising pump 750ml | Personal care | — | — | 10.99 € | Coop |
| Palmolive Dushigeel spa mineral massage th 500ml | Personal care | — | — | 7.39 € | Coop + Selver |
| Palmolive men refreshing d geel 250ml | Personal care | — | — | 4.49 € | Coop + Selver |
| Palmolive nat almond v seep täitep 500ml | Personal care | — | — | 3.99 € | Selver |
| Palmolive nat black orchid seep 90g | Personal care | — | 0.95 € | 0.95 € | Coop + Rimi + Selver |
| Palmolive naturals black orchid d g 500ml | Personal care | — | — | 7.39 € | Coop + Selver |
| Palmolive naturals jasmin d g 500ml | Personal care | — | — | 4.99 € | Selver |
| Palmolive naturals milk honey v s 300ml | Personal care | — | 2.89 € | 3.89 € | Rimi |
| Palmolive naturals olive milk d g 250ml | Personal care | — | — | 4.49 € | Coop + Selver |
| Palmolive odur neutralizing v seep 300ml | Personal care | — | — | 3.49 € (2.49 € Partner) | Selver |
| Palmolive Seep hygiene plus aloe 90g | Personal care | 0.95 € | 0.95 € | 0.95 € | Barbora + Coop + Rimi + Selver |
| Palmolive Seep naturals chamomile 90g | Personal care | — | — | 0.95 € | Coop + Selver |
| Palmolive Seep naturals milk honey 90g | Personal care | — | 0.95 € | 0.95 € | Coop + Rimi + Selver |
| Palmolive Seep naturals olive milk 90g | Personal care | — | — | 0.95 € | Coop + Selver |
| Palmolive sr nat aha avocado hon 500ml | Personal care | — | — | 7.39 € | Coop + Selver |
| Palmolive Vedelseep nat olive milk täide 500ml | Personal care | — | — | 3.99 € | Selver |
| Palmolive Vedelseep naturals black orchid 300ml | Personal care | — | — | 3.49 € (2.49 € Partner) | Selver |
| Palmolive Vedelseep olive milk 300ml | Personal care | 2.89 € | — | 3.49 € | Barbora |
| Palsam pl tugevdav takjas takjaga 250ml | Personal care | — | — | 3.39 € | Coop |
| Pantene Juukseõli keratin protect 100ml | Personal care | 13.99 € | 13.99 € | — | Barbora + Rimi |
| Pantene Palsam aqua light 275ml | Personal care | 6.99 € | 6.99 € | 7.10 € | Barbora + Rimi |
| Pantene Palsam infinite lenghts 275ml | Personal care | 6.99 € | — | 7.10 € | Barbora |
| Pantene Palsam thick strong 275ml | Personal care | 6.99 € | 6.99 € | — | Barbora + Rimi |
| Pantene Šampoon hydration recharge 400ml | Personal care | 6.99 € | 7.79 € | — | Barbora |
| Pantene Šampoon infinite lenghts 400ml | Personal care | 6.99 € | — | 7.10 € | Barbora |
| Pantene Šampoon thick strong 400ml | Personal care | 6.99 € | 7.69 € | — | Barbora |
| Pantene Šampoon thick strong in 325ml | Personal care | 6.79 € | 6.99 € | — | Barbora |
| Pantene Shampoon rep protect 400ml | Personal care | — | — | 7.10 € | Coop |
| Parodontax compl ex fres h p protec 75ml | Personal care | — | — | 8.99 € (7.29 € Partner) | Coop + Selver |
| Parodontax compl protec whiten h p 75ml | Personal care | — | — | 8.99 € (7.29 € Partner) | Coop + Selver |
| Parodontax Hambapasta active gum repair 75ml | Personal care | — | 7.39 € | 6.99 € | Selver |
| Parodontax Hambapasta classic 75ml | Personal care | 6.39 € | 6.39 € | 6.59 € (5.59 € Partner) | Barbora + Rimi |
| Parodontax Hambapasta fluoride 75ml | Personal care | 7.79 € | 7.99 € | — | Barbora |
| Parodontax Suuvesi 500ml | Personal care | 8.39 € | — | 8.99 € (7.29 € Partner) | Barbora |
| Puhas limpa Puhas shampoon tüdrukutele 300ml | Personal care | — | — | 2.63 € | Coop |
| Puhas limpa Shampoon dushigeel laste 300ml | Personal care | — | — | 2.84 € | Coop |
| Puhas limpa Shampoon dushigeel poiste 300ml | Personal care | — | — | 2.73 € | Coop |
| Puhas loodus Dushigeel kadakamari 250ml | Personal care | — | — | 2.99 € | Coop |
| Puhas loodus Dušigeel kadakamari 250ml | Personal care | 2.55 € | 2.99 € | — | Barbora |
| Puhas loodus Kehakreem kibuvits 150ml | Personal care | 3.99 € | 4.39 € | — | Barbora |
| Puhas loodus Palsam nõges toitev 250ml | Personal care | 2.39 € | — | — | Barbora |
| Puhas loodus Puhas palsam hoold sheavõi sheavõiga 250ml | Personal care | — | — | 3.39 € | Coop |
| Puhas loodus Šampoon nõges toitev 250ml | Personal care | 2.39 € | 2.69 € | — | Barbora |
| Puhas loodus Šampoon takjas tugevd 250ml | Personal care | 2.39 € | 2.69 € | — | Barbora |
| Puhas loodus Shampoon niisutav mustsõstar mustsõstraga 250ml | Personal care | — | — | 3.39 € | Coop |
| Puhas loodus Shampoon toitev nõges nõgesega 250ml | Personal care | — | — | 3.39 € | Coop |
| Puhas loodus Shampoon tugevdav takjas takjaga 250ml | Personal care | — | — | 3.39 € | Coop |
| Puhas loodus Shampoon värskendav greip greibiga 250ml | Personal care | — | — | 3.39 € | Coop |
| Puhas loodus Vedelseep lõhnavaba 500ml | Personal care | — | — | 2.99 € | Coop |
| Raseerimisgeel satin care sensitive aloe vera 200ml | Personal care | — | — | 6.49 € | Selver |
| Rexona Deodorant invisible must white meest 150ml | Personal care | — | — | 4.79 € | Coop |
| Rexona Deodorant invisible must white naist 150ml | Personal care | — | — | 4.79 € (3.39 € Partner) | Coop |
| Rexona Deodorant men cobalt dry 200ml | Personal care | 5.99 € | 6.15 € | — | Barbora |
| Rexona Deodorant sexy bouquet 200ml | Personal care | 5.99 € | 6.15 € | — | Barbora |
| Rexona men cobalt pulkdeo 50ml | Personal care | — | — | 4.79 € | Coop |
| Rich Palsam kohevust andev 200ml | Personal care | 15.19 € | — | 15.24 € | Barbora |
| Rich Palsam repairing collagen 200ml | Personal care | 15.59 € | 12.39 € | — | Rimi |
| Rich Šampoon kohevust andev 250ml | Personal care | 14.19 € | — | 14.22 € | Barbora |
| Rich Šampoon repairing collagen 250ml | Personal care | 14.29 € | 11.39 € | — | Rimi |
| Rulldeo fa pink passion naiste 50ml | Personal care | — | — | 3.59 € | Selver |
| Rulldeo loreal men expert carbon 50ml | Personal care | — | — | 6.69 € | Coop |
| Sanytol Desinfitseerimisvahend green tea käte 75ml | Personal care | — | — | 2.39 € | Coop + Selver |
| Schauma men charcoal in sh 400ml | Personal care | — | — | 5.07 € | Coop |
| Schauma Palsam color 250ml | Personal care | 3.99 € | — | 4.06 € | Barbora + Coop |
| Schauma Šampoon color shine 400ml | Personal care | 5.09 € | 3.79 € | 5.07 € | Rimi |
| Schauma Šampoon repair care 400ml | Personal care | 5.09 € | 3.79 € | — | Rimi |
| Schauma Shampoon men 400ml | Personal care | — | — | 5.07 € | Coop |
| Sensodyne complete protect h pasta 75ml | Personal care | — | — | 9.49 € | Selver |
| Sensodyne daily protection h pasta 100ml | Personal care | — | 5.29 € | 5.29 € | Rimi + Selver |
| Sensodyne extra whitening h pasta 75ml | Personal care | — | 6.99 € | 6.99 € | Coop |
| Sensodyne Hambahari complete protection soft 1 | Personal care | — | — | 5.49 € | Coop |
| Sensodyne hambaniit m 30 | Personal care | — | — | 4.99 € | Selver |
| Sensodyne Hambapasta cavity sensitivity 75ml | Personal care | — | 6.79 € | 6.69 € | Selver |
| Sensodyne Hambapasta clinical white 75ml | Personal care | 9.99 € (6.49 € Aitäh) | — | 9.99 € | Barbora + Selver |
| Sensodyne Hambapasta deep clean 75ml | Personal care | 6.39 € | 6.79 € | 7.29 € | Barbora |
| Sensodyne Hambapasta fluoride 75ml | Personal care | 6.59 € | 6.59 € | 6.59 € | Barbora + Rimi + Selver |
| Sensodyne Hambapasta multi care 75ml | Personal care | 5.29 € | 5.49 € | 5.29 € | Barbora + Selver |
| Sensodyne Hambapasta pronamel 75ml | Personal care | 8.19 € | 8.19 € | 7.99 € | Selver |
| Sensodyne Hambapasta repair protect 75ml | Personal care | 8.49 € (5.52 € Aitäh) | 6.99 € | 8.99 € | Rimi |
| Sensodyne Hambapasta repair protect whitening 75ml | Personal care | — | — | 8.99 € | Coop + Selver |
| Sensodyne Hambapasta sensitivity gum 75ml | Personal care | — | 8.39 € | 8.99 € | Rimi |
| Sensodyne multi care medium hambahari 1 | Personal care | — | — | 4.29 € | Selver |
| Sensodyne multi care soft hambahari 1 | Personal care | — | — | 4.29 € | Selver |
| Sensodyne Suuvesi cool mint 500ml | Personal care | 8.79 € (5.71 € Aitäh) | 7.39 € | 8.99 € | Rimi |
| Skin super good Dushigeel os refresh 500ml | Personal care | — | — | 6.09 € | Coop + Selver |
| Sophie Intiimpuhastusrätid vees lagunevad 20 | Personal care | — | — | 1.59 € | Selver |
| Splat Hambapasta biocalcium 100ml | Personal care | 5.49 € | 5.49 € | 5.59 € | Coop |
| Splat Hambapasta medical herbs 100ml | Personal care | 5.49 € | 5.49 € | 5.59 € | Coop |
| Splat Hambapasta sensitive 100ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Splat Hambapasta ultracomplex 100ml | Personal care | 5.49 € | 5.49 € | — | Barbora + Rimi |
| Splat Hambapasta white plus 100ml | Personal care | 5.49 € | 5.49 € | 5.29 € | Coop |
| Split ends miracle palsam 200ml | Personal care | — | 5.99 € | 5.69 € | Coop |
| Syoss intense plex shamp 440ml | Personal care | — | — | 7.99 € (5.29 € Partner) | Coop |
| Syoss Juuksegeel max hold 250ml | Personal care | 6.43 € | 5.59 € | — | Rimi |
| Syoss Juuksemask intense keratin 400ml | Personal care | 7.69 € | 8.39 € | — | Barbora |
| Syoss Juuksevaha max hold 150ml | Personal care | 5.66 € | 6.79 € | — | Barbora |
| Syoss Juuksevaht curl control 250ml | Personal care | 5.94 € | 5.79 € | — | Rimi |
| Syoss Kuivšampoon pure fresh 200ml | Personal care | 5.03 € | 4.99 € | 8.99 € (5.59 € Partner) | Rimi |
| Syoss men clean cool shamp 440ml | Personal care | — | — | 7.99 € (5.29 € Partner) | Coop |
| Syoss Palsam color 440ml | Personal care | 5.59 € | 5.29 € | 5.49 € | Rimi |
| Syoss Palsam intense curls 250ml | Personal care | 5.59 € | 5.59 € | — | Barbora + Rimi |
| Syoss Palsam intense plex 250ml | Personal care | 5.38 € | 5.49 € | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Palsam keratin 250ml | Personal care | 5.38 € | — | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Palsam keratin hair perfection 440ml | Personal care | — | — | 7.99 € (5.29 € Partner) | Coop |
| Syoss Palsam repair 440ml | Personal care | 5.59 € | 5.29 € | 7.99 € (5.29 € Partner) | Rimi |
| Syoss Šampoon anti dandruff 440ml | Personal care | 5.59 € | 7.99 € | — | Barbora |
| Syoss Šampoon color 440ml | Personal care | 5.59 € | 5.39 € | 5.49 € | Rimi |
| Syoss Šampoon curls waves 440ml | Personal care | 5.59 € | — | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Šampoon intense glaze 440ml | Personal care | 5.59 € | 5.79 € | 7.99 € (5.29 € Partner) | Barbora |
| Syoss Šampoon intense plex 440ml | Personal care | 5.59 € | 5.79 € | — | Barbora |
| Syoss Šampoon oleo intense 440ml | Personal care | 5.59 € | 5.29 € | — | Rimi |
| Syoss Šampoon repair 440ml | Personal care | 5.59 € | 5.39 € | 7.99 € (5.29 € Partner) | Rimi |
| Syoss Šampoon volume 440ml | Personal care | 5.59 € | 5.29 € | 7.99 € (5.29 € Partner) | Rimi |
| Syoss Shampoon anti dandruff 440ml | Personal care | — | — | 5.49 € | Selver |
| Syoss Shampoon keratin 750ml | Personal care | — | 12.39 € | 13.99 € | Rimi |
| Syoss Shampoon keratin hair perfection 440ml | Personal care | — | — | 7.99 € (5.29 € Partner) | Coop |
| Syoss Shampoon men power 440ml | Personal care | — | — | 7.99 € (5.29 € Partner) | Coop |
| Taft Juukselakk aloe boost 250ml | Personal care | 7.15 € | 4.99 € | — | Rimi |
| Taft Juukselakk power invisible 250ml | Personal care | 7.15 € | 3.69 € | 5.49 € | Rimi |
| Taft Juukselakk ultimate 250ml | Personal care | 7.15 € | 5.19 € | — | Rimi |
| Taft Juukselakk volume up 250ml | Personal care | — | 5.19 € | 7.10 € | Rimi |
| Taft Juuksepuuder volume 10g | Personal care | 8.19 € | 4.99 € | — | Rimi |
| Taft Juuksevaha creative look 75ml | Personal care | 7.15 € | 6.39 € | — | Rimi |
| Tampax compak regular tampoonid 16 | Personal care | — | — | 5.58 € | Selver |
| Tampax compak super tampoonid 16 | Personal care | — | — | 5.58 € | Selver |
| Tena lady normal uriinipid side 12 | Personal care | — | — | 3.99 € | Selver |
| Tena Uriinipidamatuse sidemed lady maxi night 6 | Personal care | — | — | 3.99 € | Selver |
| Ultra normal wings h side 10 | Personal care | — | — | 2.29 € | Coop |
| Veet cold wax sensit vahaplaaster 12 | Personal care | — | — | 8.12 € | Selver |
| Vuokkoset H side normal wings mahe 12 | Personal care | — | — | 2.99 € | Selver |
| Woom Hambapasta aloe vera 75ml | Personal care | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Woom Hambapasta sensitive 75ml | Personal care | 6.29 € | 6.29 € | — | Barbora + Rimi |
| Ziaja Dušigeel cocoa butter 500ml | Personal care | 3.99 € (2.79 € Aitäh) | — | 4.06 € | Barbora + Coop |
| Ziaja Dušigeel natural olive 500ml | Personal care | 3.99 € | — | 4.06 € | Barbora |
| Ziaja Dušigeel orange butter 500ml | Personal care | 3.69 € (2.59 € Aitäh) | — | 4.06 € | Barbora |
| Ziaja Intiimpesugeel kaitsev piimhappega 500ml | Personal care | — | — | 4.26 € | Selver |
| Ziaja Šampoon olive oil 400ml | Personal care | 3.99 € | — | 3.29 € | Selver |
| Adventuros Maius koerale metssiga 90g | Pet food | — | — | 1.82 € | Selver |
| Adventuros Maius koerale pühvel 120g | Pet food | — | — | 1.82 € | Selver |
| Apollo Närimispulgad koerale loomalihaga 95% 55g | Pet food | — | — | 1.31 € (1.09 € Partner) | Selver |
| Apollo närimisribad kana kalk kalkunilihaga 200g | Pet food | — | — | 1.51 € (1.19 € Partner) | Coop |
| Athena junior kons kassile linnulih linnulihaga 100g | Pet food | — | — | 0.55 € | Selver |
| Athena Kons kassile linnuliha linnulihaga 100g | Pet food | — | — | 0.55 € | Selver |
| Athena Kons kassile loomaliha loomalihaga 100g | Pet food | — | — | 0.55 € | Selver |
| Athena kons kassile merekala krevet 100g | Pet food | — | — | 0.55 € | Selver |
| Athena piim kassile 200ml | Pet food | — | — | 0.94 € | Selver |
| Catsan kassiliiv 10000ml | Pet food | — | — | 8.32 € | Coop |
| Dog fest Maius koerale kanaliha palad 90g | Pet food | — | — | 3.85 € | Coop + Selver |
| Dr stern Kassiliiv kvartsteemandid 6000ml | Pet food | 7.59 € | — | 7.59 € | Barbora + Coop + Selver |
| Dr.stern Eestimaine hein küülikute meris mahe 500g | Pet food | — | — | 3.65 € | Selver |
| Dr.stern Kuivt premium koerale 10000g | Pet food | — | — | 14.49 € | Selver |
| Dr.stern Vorst koerale linnuliha loomaliha 400g | Pet food | — | — | 1.49 € | Coop + Selver |
| Dr.stern Vorst koerale vasikaliha 400g | Pet food | — | — | 1.49 € | Coop + Selver |
| Dreamies Suupiste kassidele lõhega 60g | Pet food | 1.79 € | 1.29 € | 1.99 € (1.19 € Partner) | Rimi |
| Dreamies Suupiste kassile juustuga 60g | Pet food | — | — | 1.99 € (1.19 € Partner) | Coop |
| Dreamies Suupiste kassile kanalihaga 60g | Pet food | — | 1.29 € | 1.99 € (1.19 € Partner) | Rimi |
| Dreamies Suupiste kassile naistenõgese naistenõgesega 60g | Pet food | — | — | 1.99 € (1.19 € Partner) | Coop |
| Dreamies Suupiste kassile pardi pardilihaga 60g | Pet food | — | 1.29 € | 1.99 € (1.19 € Partner) | Rimi |
| Felix Kassimaius deli moments kana 4x10g | Pet food | 1.59 € | — | 1.99 € | Barbora |
| Felix Kassimaius deli moments lõhe 4x10g | Pet food | 1.59 € | — | 1.99 € | Barbora |
| Felix Kassimaius party mix ocean 60g | Pet food | 1.75 € | 1.75 € | — | Barbora + Rimi |
| Felix Kiisueine fantastic kana loomaliha 4x85g | Pet food | — | — | 2.39 € | Coop |
| Felix Kiisueine fantastic küülik 85g | Pet food | 0.79 € | — | — | Barbora + Coop |
| Felix Kiisueine fantastic lõhe lest 4x85g | Pet food | — | — | 2.39 € | Selver |
| Felix Kiisueine sensations kala tarrendis 4x85g | Pet food | — | — | 2.39 € | Selver |
| Felix Kiisueine sensations kalkun 4x85g | Pet food | 2.39 € | 2.39 € | — | Barbora + Rimi |
| Felix Kiisueine sensations liha tarrendis 4x85g | Pet food | — | — | 2.39 € | Selver |
| Felix Kiisueine tasty shreds kalavalik 4x80g | Pet food | — | — | 2.59 € | Coop |
| Felix Maius kassile party mix ocean lõhe maitsega 60g | Pet food | — | — | 1.78 € | Coop |
| Felix maius kassile party mix origin maitsega 60g | Pet food | — | — | 1.78 € | Coop |
| Felix Maius kassile play tubes kalkuni singi 50g | Pet food | — | — | 1.78 € | Coop |
| Gourmet gold Gourmet kons kassi kastmes tükkidega 4x85g | Pet food | — | — | 2.49 € | Selver |
| Gourmet gold Kons del kala kassile succulent kalaga 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons del kana kassile succulent kanaga 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons del kassile loom succulent loomalihaga 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile 4x85g | Pet food | — | — | 2.49 € | Coop + Selver |
| Gourmet gold Kons kassile kalkunipasteet 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile kanapasteet 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile lõhe kanaliha tükkidega 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile loomalihapasteet 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile sc kana porganditega 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile sc lambaliha ubadega 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassile tuunikalapasteet 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons kassipojale kitten vasika vasikalihaga 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Gourmet gold Kons liha del kala kassile succ 4x85g | Pet food | — | — | 2.49 € | Selver |
| Gourmet gold Kons loomaliha ja kassile sc tom 85g | Pet food | — | — | 0.88 € (0.50 € Partner) | Selver |
| Happy Kassiliiv ookeanilõhnaline paakuv 5000ml | Pet food | — | — | 5.28 € | Coop |
| Happy Kassiliiv paakuv 5000g | Pet food | 3.79 € | — | 3.19 € | Coop + Selver |
| Hau hau Maius koerale delikatess pardifilee 100g | Pet food | — | — | 4.26 € | Selver |
| Kiisueine one sterilcat lõhe porgand porgandiga 4x85g | Pet food | — | — | 3.85 € | Coop + Selver |
| Kitty clean Kassiliiv ränihiibliivast 3800ml | Pet food | — | — | 3.99 € | Selver |
| Koeraeine kana köögivil maksa pedigr veise 4x100g | Pet food | — | — | 2.39 € (1.69 € Partner) | Coop + Selver |
| Kuivt kassile one steriliseeritud veisega 750g | Pet food | — | — | 4.99 € | Selver |
| Kuivt weight control kana kassile one steril kanaga 1400g | Pet food | — | — | 7.99 € | Selver |
| Maius koerale delikatess kanafilee hhc 100g | Pet food | — | — | 4.26 € | Selver |
| One kassile kgloomaliha kuivt ster tud veisega 1400g | Pet food | — | — | 10.39 € | Coop |
| One koerale lõhe mini delic kuivt 1500g | Pet food | — | — | 9.99 € | Coop + Selver |
| Pedigree dentastix närimistoode mini 68g | Pet food | — | — | 1.89 € | Coop + Selver |
| Pedigree Koeraeine 4x100g | Pet food | 1.79 € | 2.49 € | — | Barbora |
| Pedigree Koeraeine junior 4x100g | Pet food | 1.67 € | 2.49 € | — | Barbora |
| Pedigree Koeraeine junior kanaliha 4x100g | Pet food | — | — | 2.39 € (1.69 € Partner) | Coop + Selver |
| Pedigree Koeraeine loom porgand 4x100g | Pet food | 1.79 € | 2.49 € | — | Barbora |
| Pedigree Koeraeine veise lamba kalkunil küülikulihaga porganditega 4x100g | Pet food | — | — | 2.39 € (1.69 € Partner) | Coop + Selver |
| Pedigree Koeramaius rodeo 70g | Pet food | 0.90 € | 1.35 € | 1.29 € | Barbora |
| Pedigree Kuivt adult koerale köögivilja veise köögiviljaga 10000g | Pet food | — | — | 35.90 € | Coop |
| Pedigree Maius koerale biscrok 200g | Pet food | — | — | 1.89 € (1.35 € Partner) | Coop + Selver |
| Pedigree Maius koerale ranchos jerkies veise veiselihaga 70g | Pet food | — | — | 2.39 € | Selver |
| Pedigree Maius koerale rodeo duos kana peekon 123g | Pet food | — | — | 1.89 € | Coop + Selver |
| Pedigree Maius koerale rodeo veiselihaga 123g | Pet food | — | — | 1.89 € (1.39 € Partner) | Coop + Selver |
| Pedigree Närimispulk dentastix keskm koera 180g | Pet food | — | — | 2.49 € | Selver |
| Pedigree närimispulk suur koerale 270g | Pet food | — | — | 3.49 € | Selver |
| Pedigree tasty maius koerale veise 140g | Pet food | — | — | 2.49 € | Selver |
| Perfect fit Kuivt kanaga kassile steril 750g | Pet food | — | — | 6.29 € | Coop + Selver |
| Perfect fit Kuivt veiselihaga kassile sterile 750g | Pet food | — | — | 6.29 € | Coop + Selver |
| Piper Kons kanasüdame koerale spinati spinatiga 400g | Pet food | — | — | 2.09 € | Selver |
| Piper Kons lambaliha koerale porgandi porgandiga 400g | Pet food | — | — | 2.09 € | Selver |
| Primacat Kassieine kana vees 4x50g | Pet food | — | — | 4.77 € | Selver |
| Primacat Kassieine tuunikala vees 4x50g | Pet food | — | — | 4.77 € | Selver |
| Primacat Kassiliiv lõhnatu valge bentoniit 5000ml | Pet food | — | — | 5.07 € (3.99 € Partner) | Selver |
| Primacat Kiisueine lõhe krev tuunik 4x50g | Pet food | — | — | 4.77 € | Selver |
| Primacat kiisueine ster kass lõhe lõhega 4x85g | Pet food | — | — | 3.45 € | Coop |
| Primacat Kuivt steriliseeritud kanaga kassile 400g | Pet food | — | — | 4.09 € | Coop + Selver |
| Primacat Kuivt teraviljavaba kalkun kassile st kalkunilihaga 400g | Pet food | — | — | 4.87 € | Coop |
| Primadog Eine koerale kanaga 600g | Pet food | — | — | 2.99 € | Selver |
| Primadog Koeraeine ulukiliha ulukilihaga 600g | Pet food | — | — | 2.99 € | Selver |
| Primadog Kuivtoit koerale kana kartul 3000g | Pet food | — | — | 11.49 € | Selver |
| Primadog Kuivtoit koerale lammas kartul 3000g | Pet food | — | — | 15.24 € | Selver |
| Primadog lammas kartul koerale kuivt 10000g | Pet food | — | — | 46.65 € | Selver |
| Primadog Maius koerale lambaliha 50g | Pet food | — | — | 2.35 € | Selver |
| Primadog Närimisrullid koerale kanaga 180g | Pet food | — | — | 4.59 € | Selver |
| Rex Närimiskont sõlmitud 80g | Pet food | — | — | 1.47 € | Selver |
| Sheba Kassipasteet kanaga 85g | Pet food | 0.79 € | — | 0.99 € | Barbora |
| Sheba Kiisueine fine flakes kodulinnuvalik 4x85g | Pet food | — | — | 3.49 € | Coop |
| Sheba Kiisueine kalavalik kastmes 4x85g | Pet food | — | — | 3.29 € | Coop + Selver |
| Sheba Kiisueine kalkunilihaga kastmes 85g | Pet food | — | — | 0.99 € | Coop + Selver |
| Sheba Kiisueine kitten segavalik kastmes 4x85g | Pet food | — | — | 3.49 € | Coop |
| Sheba Kiisueine lihaga kastmes 4x85g | Pet food | — | — | 3.29 € | Coop + Selver |
| Sheba kiisueine linnulihaga kastm 12x85g | Pet food | — | — | 6.49 € | Selver |
| Sheba Kiisueine linnulihaga kastmes 4x85g | Pet food | — | — | 3.29 € | Coop + Selver |
| Sheba kiisueine lõhega 85g | Pet food | — | 0.75 € | 0.99 € | Rimi |
| Sheba Kiisueine segavalik kastmes 4x85g | Pet food | 3.49 € | — | 3.49 € | Coop |
| Sheba Kiisueine tuunikalaga kastmes 85g | Pet food | — | — | 0.99 € | Coop + Selver |
| Sheba Maius kassile creamy kana kanaga 4x12g | Pet food | — | — | 1.79 € | Selver |
| Sheba Maius kassile creamy lõhe lõhega 4x12g | Pet food | — | — | 1.79 € | Selver |
| Vitakraft life täissööt merisigadele 600g | Pet food | — | — | 5.58 € | Coop |
| Whiskas Kiisueine eakale kassile linnuliha kodulinnulihaga 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine junior klassikaline valik 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine kalavalik 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine lihavalik 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine linnuliha kodulinnulihaga 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine pure delight kana kalkun linnulihaga 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine pure delight kana lõhe 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kiisueine tasty mix creamy creations 4x85g | Pet food | — | — | 2.39 € (1.59 € Partner) | Coop |
| Whiskas Kuivt kanalihaga kassile 800g | Pet food | — | — | 3.59 € | Selver |
| Whiskas Kuivt kanalihaga kassile senior 800g | Pet food | — | — | 3.59 € | Selver |
| Whiskas Kuivt tuunikalaga kassile 800g | Pet food | — | — | 3.59 € | Selver |
| Baltix Bulgur 4x100g | Rice & grains | 2.05 € | — | — | Barbora + Coop |
| Baltix Hirss 1000g | Rice & grains | 2.45 € | 2.49 € | 2.50 € | Barbora |
| Baltix Hirss 4x100g | Rice & grains | 1.51 € | — | 1.51 € | Barbora + Selver |
| Baltix Odrakruup 1000g | Rice & grains | 1.39 € | — | 1.41 € | Barbora |
| Baltix Odrakruup 4x100g | Rice & grains | 0.89 € | — | 1.01 € | Barbora |
| Baltix Tatar 1000g | Rice & grains | 1.64 € | — | 2.35 € | Barbora |
| Baltix Tatar 4x100g | Rice & grains | 1.69 € | 1.99 € | 1.92 € | Barbora |
| Baltix Toortatar 4x100g | Rice & grains | 1.64 € | 2.35 € | 2.23 € | Barbora |
| Bosto Bulgur 4x75g | Rice & grains | 2.73 € | 2.79 € | 2.73 € | Barbora + Selver |
| Bosto Jasmiini riis 4x125g | Rice & grains | — | 2.29 € | 2.39 € | Rimi |
| Bosto Kinoa kolmevärviline 4x75g | Rice & grains | 3.79 € | — | 3.79 € | Barbora + Selver |
| Bosto Pärlkuskuss 4x75g | Rice & grains | 3.45 € | 3.45 € | — | Barbora + Rimi |
| Bosto Pruun riis 4x125g | Rice & grains | — | 1.99 € | 2.25 € | Rimi |
| Bosto Riis mediterraneo 500g | Rice & grains | — | 3.79 € | — | Coop + Rimi |
| Bosto Riis pikateraline 1 8x125g | Rice & grains | — | — | 3.29 € | Selver |
| Just nature Must kinoa 500g | Rice & grains | 3.85 € | — | 3.85 € | Barbora + Selver |
| Just nature Punane kinoa 500g | Rice & grains | 3.55 € | — | 3.55 € | Barbora + Selver |
| Just nature Valge kinoa 500g | Rice & grains | 3.85 € | — | 3.03 € | Selver |
| Manna kalew 1000g | Rice & grains | — | 1.45 € | 1.51 € | Rimi |
| Tartu mill Kaerakliid 500g | Rice & grains | — | — | 1.41 € | Selver |
| Tartu mill Odra pärlkruup 4x100g | Rice & grains | 1.59 € | 1.59 € | 1.59 € | Barbora + Coop + Rimi + Selver |
| Tartu mill Odrakruup 1000g | Rice & grains | — | — | 1.43 € | Selver |
| Tartu mill Tartu odratang 1000g | Rice & grains | — | — | 1.37 € | Selver |
| Tartu mill Tatar 1000g | Rice & grains | 2.24 € | 2.39 € | — | Barbora |
| Veski mati Hirss 500g | Rice & grains | 1.25 € | 1.29 € | 1.25 € | Barbora + Selver |
| Veski mati Maisitangud 500g | Rice & grains | — | 1.09 € | 1.01 € | Selver |
| Veski mati Manna 500g | Rice & grains | 0.99 € | 1.05 € | 1.02 € | Barbora |
| Veski mati Pruun täistera riis 400g | Rice & grains | — | — | 1.35 € | Selver |
| Veski mati Pudruriis ekstra 1000g | Rice & grains | — | 3.09 € | 3.13 € | Rimi |
| Veski mati Riis sõmer 1000g | Rice & grains | — | 3.09 € | 3.00 € | Selver |
| Veski mati Riisimanna 500g | Rice & grains | — | — | 1.72 € | Selver |
| Veski mati Risotoriis 500g | Rice & grains | — | 2.49 € | 2.39 € | Selver |
| Veski mati Veski tatar 500g | Rice & grains | — | — | 1.65 € | Coop + Selver |
| Wiru mill Wiru toortatra peentang mahe 500g | Rice & grains | — | — | 3.04 € | Selver |
| Acetum Palsamiäädika glasuur klassikaline 150ml | Sauces & condiments | — | — | 2.99 € | Coop + Selver |
| Acetum Palsamiäädika glasuur viigimarjaga 150ml | Sauces & condiments | — | — | 2.69 € | Selver |
| Baltika Ketšup terav 500g | Sauces & condiments | 1.85 € | 2.39 € | — | Barbora |
| Baltika Kodune sinep kange 120g | Sauces & condiments | 1.35 € | 1.49 € | 1.41 € (1.19 € Partner) | Barbora |
| Barilla Pastakaste basilico 400g | Sauces & condiments | 3.75 € (2.99 € Aitäh) | 3.79 € | 3.59 € | Selver |
| Barilla Pastakaste bolognese 400g | Sauces & condiments | 4.99 € | 4.99 € | 4.99 € | Barbora + Rimi + Selver |
| Barilla Pastakaste napoletana 400g | Sauces & condiments | 3.79 € | 3.79 € | 2.99 € | Selver |
| Barilla Pastakaste pesto genovese 190g | Sauces & condiments | 3.99 € | 3.59 € | — | Rimi |
| Borges Modena palsamiäädikas 250ml | Sauces & condiments | 2.94 € | — | 2.94 € | Barbora + Selver |
| Borges Õunaäädikas mahe 250ml | Sauces & condiments | 2.95 € | 2.95 € | 2.59 € | Selver |
| Chumak Šašlõkiketšup 250g | Sauces & condiments | 1.29 € | — | 1.29 € | Coop |
| Chumak Tomatiketšup 250g | Sauces & condiments | 1.29 € | — | 1.29 € | Barbora + Selver |
| Farmi Dipikaste aiaürtidega 19.4% 200g | Sauces & condiments | — | 1.59 € | 1.69 € (1.49 € Partner) | Rimi |
| Felix Adžika 260g | Sauces & condiments | 1.95 € | 1.99 € | 1.95 € | Barbora + Selver |
| Felix Barbeque meekaste 320g | Sauces & condiments | 2.09 € | 2.89 € | 2.39 € | Barbora |
| Felix Bolognese kaste 490g | Sauces & condiments | 2.65 € | 1.99 € | 2.69 € | Rimi |
| Felix Burgerikaste 220g | Sauces & condiments | 1.79 € | 1.45 € | 1.79 € | Rimi |
| Felix Grillkaste 510g | Sauces & condiments | 1.99 € | 2.05 € | 1.99 € | Barbora + Selver |
| Felix Hellfire ketšup 500g | Sauces & condiments | 3.55 € | 2.79 € | — | Rimi |
| Felix Hiinapärane kaste poolmagus 500g | Sauces & condiments | 2.19 € | 1.99 € | 2.53 € | Rimi |
| Felix Inglise sinep 200g | Sauces & condiments | 1.99 € | — | 1.99 € | Coop |
| Felix Kartulikaste 220g | Sauces & condiments | 1.79 € | 1.45 € | 1.79 € | Rimi |
| Felix Kartulikaste 400g | Sauces & condiments | 2.89 € | — | — | Barbora |
| Felix Kaste thousand island 375g | Sauces & condiments | 2.35 € | 2.69 € | 2.59 € (2.19 € Partner) | Barbora |
| Felix Ketshup mahe 500g | Sauces & condiments | — | — | 3.89 € | Selver |
| Felix Klassikaline majonees 830g | Sauces & condiments | — | 4.05 € | 4.05 € | Rimi + Selver |
| Felix Klassikaline salatikaste 375g | Sauces & condiments | 2.01 € | 2.69 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Kuldse meega sinep 170g | Sauces & condiments | 2.95 € | — | 2.95 € | Barbora + Selver |
| Felix Külluslik paprikakaste 270g | Sauces & condiments | — | — | 2.59 € (2.19 € Partner) | Selver |
| Felix Kurgikaste 275g | Sauces & condiments | 2.01 € | 2.69 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Küüslaugukaste 275g | Sauces & condiments | 2.01 € | 2.69 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Mädarõigas kodune 200g | Sauces & condiments | 1.69 € | 1.69 € | — | Barbora + Rimi |
| Felix Magus tšillikaste 355g | Sauces & condiments | 1.83 € | — | 2.43 € | Barbora |
| Felix Magushapu kaste sweet sour ananassiga 500g | Sauces & condiments | — | 1.99 € | 2.19 € | Rimi |
| Felix Maheda maitsega sinep 170g | Sauces & condiments | 2.65 € | — | 2.65 € | Barbora + Selver |
| Felix Majonees kerge 870g | Sauces & condiments | 3.25 € | 3.39 € | 4.06 € | Coop |
| Felix Majonees laimi aioli 220g | Sauces & condiments | 1.99 € | 1.79 € | — | Rimi |
| Felix Mangokaste 500g | Sauces & condiments | 2.59 € | — | 2.59 € | Barbora + Selver |
| Felix Mee ja sinepi salatikaste sinepiga 375g | Sauces & condiments | 1.94 € | — | 2.59 € | Barbora |
| Felix Pastakaste 500g | Sauces & condiments | 2.59 € | 1.99 € | 2.59 € | Rimi |
| Felix Pastakaste basilico ürdiga 360g | Sauces & condiments | — | — | 2.53 € | Selver |
| Felix Pastakaste napoletana köögiviljadega 360g | Sauces & condiments | — | — | 2.29 € | Selver |
| Felix Pastakaste ürtidega 360g | Sauces & condiments | 2.65 € | 2.65 € | — | Barbora + Rimi |
| Felix Põltsamaa kange sinep 65g | Sauces & condiments | 1.49 € | — | 1.49 € | Coop |
| Felix Premium majonees 235g | Sauces & condiments | 1.99 € | — | 2.12 € | Barbora + Coop |
| Felix Premium majonees 445g | Sauces & condiments | 3.55 € | 3.79 € | 3.69 € | Barbora |
| Felix Ranch salatikaste 375g | Sauces & condiments | 2.01 € | 2.89 € | 2.69 € (2.19 € Partner) | Barbora |
| Felix Salatikaste caesar 375g | Sauces & condiments | 1.94 € | — | 2.59 € | Barbora |
| Felix Salatikaste mango tshilli special 285g | Sauces & condiments | — | — | 2.99 € (2.49 € Partner) | Selver |
| Felix sool suhk tomatiketshup vähen suhkruga 980g | Sauces & condiments | — | — | 4.79 € (3.79 € Partner) | Selver |
| Felix Terav hiinapärane kaste 500g | Sauces & condiments | — | 2.29 € | 2.75 € | Rimi |
| Felix Terav tomatiketšup 1000g | Sauces & condiments | 4.49 € | 4.49 € | — | Barbora + Rimi |
| Felix Terav tomatiketšup 500g | Sauces & condiments | 2.89 € | 2.89 € | — | Barbora + Rimi |
| Felix Terav tšillikaste 350g | Sauces & condiments | 1.83 € | — | 2.43 € | Barbora |
| Felix Tomati tšilli salatikaste 375g | Sauces & condiments | 1.94 € | — | 2.59 € (2.19 € Partner) | Barbora |
| Felix Tomatiketshup ilma lisatud suhkruta 970g | Sauces & condiments | — | 3.49 € | 4.65 € (3.79 € Partner) | Rimi |
| Felix Tomatiketshup terav 1000g | Sauces & condiments | — | — | 4.35 € | Coop + Selver |
| Felix Tomatiketshup terav 500g | Sauces & condiments | — | — | 2.94 € | Coop |
| Felix Tomatiketšup 1000g | Sauces & condiments | 4.09 € | 3.79 € | 3.79 € | Coop |
| Felix Tomatiketšup 1250g | Sauces & condiments | 4.95 € (3.59 € Aitäh) | 4.89 € | 4.95 € (3.29 € Partner) | Rimi |
| Felix Tomatiketšup 500g | Sauces & condiments | 2.89 € | 2.89 € | 2.29 € | Selver |
| Felix Tomatipasta 265g | Sauces & condiments | 1.85 € | 1.49 € | 1.85 € | Rimi |
| Felix Tšillimajonees 220g | Sauces & condiments | 2.05 € | 1.79 € | 2.08 € | Rimi |
| Felix Vahemere salatikaste 375g | Sauces & condiments | 2.01 € | 2.89 € | 2.69 € | Barbora |
| Felix Wrapikaste 220g | Sauces & condiments | 1.55 € | 1.45 € | 1.79 € | Rimi |
| Felix Wrapikaste 395g | Sauces & condiments | 2.89 € | — | — | Barbora |
| Filippo berio Pesto tomatite ja ricotta juust juustuga 190g | Sauces & condiments | — | — | 2.99 € | Selver |
| Flying goose Sriracha majoneesikaste 200ml | Sauces & condiments | — | — | 4.29 € | Selver |
| Flying goose Sriracha tšillikaste 200ml | Sauces & condiments | 4.79 € | — | 3.99 € | Coop |
| Gourmante modena palsamiäädikas 250ml | Sauces & condiments | — | — | 3.49 € | Coop + Selver |
| Gourmante Palsamikreem 250ml | Sauces & condiments | 4.89 € | — | 4.87 € | Selver |
| Gourmet club Caesari kaste 150g | Sauces & condiments | 3.79 € | 2.99 € | 2.99 € | Rimi + Selver |
| Gourmet club Musta trühvli majonees 180g | Sauces & condiments | — | — | 3.04 € (2.39 € Partner) | Coop |
| Gourmet club Tshilli chipotle majonees 180g | Sauces & condiments | — | — | 3.04 € | Coop |
| Green Tomatipasta 28-30% 70g | Sauces & condiments | — | — | 0.55 € | Coop + Selver |
| Heinz Barbeque kaste 480g | Sauces & condiments | — | 4.79 € | 4.46 € | Selver |
| Heinz Burgerikaste ameerikapärane 400ml | Sauces & condiments | — | 4.79 € | 4.79 € | Rimi + Selver |
| Heinz Ketshup original 1000g | Sauces & condiments | — | — | 6.09 € | Coop |
| Heinz Ketshup original 460g | Sauces & condiments | — | — | 3.59 € | Selver |
| Heinz Ketšup 460g | Sauces & condiments | 3.59 € | 3.59 € | — | Barbora + Rimi |
| Heinz Ketšup originaal 700g | Sauces & condiments | — | 5.09 € | 5.07 € | Selver |
| Heinz Küüslaugukaste 420g | Sauces & condiments | 4.69 € | 4.69 € | — | Barbora + Rimi |
| Heinz majonees prk 460g | Sauces & condiments | — | — | 3.69 € | Coop + Selver |
| Heinz Majoneesi ketšupikaste 425g | Sauces & condiments | 4.35 € | 4.39 € | — | Barbora |
| Heinz Sinep mahe 240g | Sauces & condiments | 3.79 € | — | — | Coop |
| Heinz Sojakaste 150ml | Sauces & condiments | — | — | 2.63 € | Selver |
| Heinz Worcester kaste 150ml | Sauces & condiments | — | 2.95 € | 2.63 € | Selver |
| Hellmann's Bbq kaste original 430ml | Sauces & condiments | 3.99 € | 3.99 € | — | Barbora + Rimi |
| Hellmann's Majonees light 405ml | Sauces & condiments | 3.99 € | — | 4.89 € | Barbora |
| Hellmann's Majonees originaal 855ml | Sauces & condiments | 6.99 € (4.59 € Aitäh) | — | 7.99 € | Barbora |
| Hellmann's Majonees original 405ml | Sauces & condiments | 3.69 € (2.39 € Aitäh) | — | 3.99 € (2.29 € Partner) | Barbora |
| Hellmann's Majonees original 625ml | Sauces & condiments | 5.79 € (3.99 € Aitäh) | 6.39 € | — | Barbora |
| Hellmanns kaste chunky burger 250ml | Sauces & condiments | — | 3.19 € | 3.39 € | Rimi |
| Herkkumaa kurgimajonees 320g | Sauces & condiments | — | — | 3.85 € | Selver |
| Herkkumaa Paprikamajonees 320g | Sauces & condiments | — | — | 3.85 € | Selver |
| Ideafarm Gurmeeäädikas vaarika 200ml | Sauces & condiments | — | — | 4.36 € | Selver |
| Japanese choice Sojakaste gluteenivaba 200ml | Sauces & condiments | — | — | 3.24 € | Coop |
| Japanese choice Sushi sojakaste 200ml | Sauces & condiments | — | — | 2.94 € | Selver |
| Kuldne Majonees provansaal 500g | Sauces & condiments | — | — | 2.94 € (2.29 € Partner) | Coop |
| Lemmik Majonees juustu 200g | Sauces & condiments | 1.49 € | 1.59 € | — | Barbora |
| Lemmik Majonees provansaal 405g | Sauces & condiments | 1.99 € | 2.05 € | 2.25 € | Barbora + Coop |
| Lemmik Majonees provansaal 700g | Sauces & condiments | 2.99 € | 2.99 € | 3.39 € | Barbora + Rimi |
| Lemmik Majonees provansaal klassikaline 210g | Sauces & condiments | — | — | 1.29 € | Coop |
| Lemmik Majonees provansaal oliivi 210g | Sauces & condiments | 1.39 € (0.79 € Aitäh) | 1.49 € | 1.55 € | Barbora + Coop |
| Maggi Kaste texicana salsa 500ml | Sauces & condiments | 4.99 € | 4.99 € | — | Barbora + Rimi |
| Maggi texicana salsakaste 500ml | Sauces & condiments | — | — | 5.19 € | Coop + Selver |
| Meira Sinep traditsiooniline 500g | Sauces & condiments | 2.99 € | — | 3.04 € | Barbora |
| Merevaik Juustudipp cheddari 200g | Sauces & condiments | 1.89 € | 1.89 € | 1.89 € | Barbora + Rimi + Selver |
| Merevaik Juustudipp originaal 200g | Sauces & condiments | 1.89 € | — | 1.89 € | Barbora + Selver |
| Merevaik Juustumajonees tere 210g | Sauces & condiments | 1.55 € | 1.89 € | — | Barbora |
| Minu Mädarõigas delikatess 170g | Sauces & condiments | 1.19 € | — | 1.31 € | Barbora |
| Minu Mädarõigas ekstra kange 200g | Sauces & condiments | 1.69 € | — | 1.79 € | Barbora |
| Mo saaremaa Juustukaste 400g | Sauces & condiments | 2.65 € (1.99 € Aitäh) | 2.65 € | — | Barbora + Rimi |
| Mutti Pastakaste basiilikuga 400g | Sauces & condiments | 3.55 € | — | 3.55 € | Barbora + Selver |
| Õunaäädikas pastöriseerimata saaremaa 500ml | Sauces & condiments | — | — | 5.69 € | Coop + Selver |
| Panzani Bolognese veggie pastakaste 390g | Sauces & condiments | 4.99 € | — | 4.49 € (3.59 € Partner) | Selver |
| Panzani Pastakaste extra bolognese 425g | Sauces & condiments | — | 5.29 € | 5.29 € | Coop |
| Panzani Pastakaste napoletana 400g | Sauces & condiments | 3.69 € | 3.69 € | 3.89 € | Barbora + Rimi |
| Panzani Pastakaste originale 400g | Sauces & condiments | 3.69 € | 3.69 € | 3.89 € | Barbora + Rimi |
| Panzani Pitsakaste tomapizza 390g | Sauces & condiments | 2.99 € | — | 3.05 € | Coop |
| Panzani Tomatipüree tomacouli 200g | Sauces & condiments | 1.55 € | — | 1.25 € | Selver |
| Panzani Tomatipüree tomacouli 500g | Sauces & condiments | 2.69 € | — | — | Barbora + Coop |
| Pearl river Hele sojakaste bridge 150ml | Sauces & condiments | — | — | 1.41 € (1.19 € Partner) | Selver |
| Pearl river Hele sojakaste bridge 500ml | Sauces & condiments | — | — | 2.94 € (2.49 € Partner) | Coop |
| Pearl river Hele sojakaste broileri lauapudel prem 150ml | Sauces & condiments | — | — | 1.87 € (1.59 € Partner) | Selver |
| Pomi Pizza ja pasta kaste 500g | Sauces & condiments | — | — | 2.89 € | Coop + Selver |
| Pomi Tomatipasta 500g | Sauces & condiments | 1.99 € | — | 1.95 € | Selver |
| Pomi Tomatipasta 8% 200g | Sauces & condiments | 1.15 € | 1.15 € | 1.15 € | Barbora + Coop + Rimi + Selver |
| Ponti Palsamiäädikakreem 250g | Sauces & condiments | 4.55 € (3.95 € Aitäh) | — | 4.56 € | Barbora |
| Primo gusto Tomatipüree melissa 500g | Sauces & condiments | — | — | 1.39 € | Coop + Selver |
| Primo gusto Tomatipüree melissa basiilikuga 500g | Sauces & condiments | — | — | 1.59 € | Selver |
| Pure Mangokaste 260g | Sauces & condiments | 2.49 € | — | — | Coop |
| Reggia tomatikaste 680g | Sauces & condiments | — | — | 2.43 € | Selver |
| Reine de dijon Dijon sinep 200g | Sauces & condiments | 3.29 € | — | — | Barbora + Coop |
| Reine de dijon Teraline sinep 350g | Sauces & condiments | 3.85 € | — | 3.85 € | Barbora + Selver |
| Salvest Adžika ketšup 360g | Sauces & condiments | 2.29 € | 2.45 € | 2.29 € | Barbora + Selver |
| Salvest Bbq kaste 390g | Sauces & condiments | 2.69 € | 2.69 € | 2.69 € | Barbora + Coop + Rimi + Selver |
| Salvest Ketshup 1000g | Sauces & condiments | — | 4.09 € | 4.06 € | Selver |
| Salvest Ketšup 270g | Sauces & condiments | 2.15 € | 2.15 € | 2.15 € | Barbora + Rimi + Selver |
| Salvest Ketšup 530g | Sauces & condiments | 2.99 € | 2.99 € | 2.49 € | Selver |
| Salvest Majonees kerge 430g | Sauces & condiments | 2.35 € | 2.49 € | 2.39 € | Barbora + Coop |
| Salvest Majonees klassikaline 430g | Sauces & condiments | 2.35 € | 2.49 € | 1.99 € | Selver |
| Salvest Majonees mädarõika 430g | Sauces & condiments | 2.35 € | 2.49 € | 2.53 € | Barbora + Coop |
| Salvest Pastakaste bolognese hakklihaga 460g | Sauces & condiments | — | 2.65 € | 2.45 € | Selver |
| Salvest Pastakaste köögiviljadega 460g | Sauces & condiments | 3.19 € | 3.19 € | 3.19 € | Barbora + Coop + Rimi + Selver |
| Salvest Pastakaste ürtidega 460g | Sauces & condiments | 3.19 € | 2.99 € | 3.19 € | Rimi |
| Salvest Tomatipasta 300g | Sauces & condiments | — | 1.89 € | 1.69 € | Selver |
| Salvest Tomatipasta ürtidega 300g | Sauces & condiments | 1.99 € | 1.99 € | 1.99 € | Barbora + Coop + Rimi + Selver |
| Santa maria Bbq kaste suitsu 345g | Sauces & condiments | — | — | 4.25 € | Selver |
| Santa maria Bbq kaste universaalne 330g | Sauces & condiments | 4.25 € | 4.25 € | 4.25 € | Barbora + Rimi + Selver |
| Santa maria Chunky salsa 230g | Sauces & condiments | — | — | 3.29 € | Selver |
| Santa maria Magus tshillikaste 500ml | Sauces & condiments | — | — | 4.09 € | Coop |
| Santa maria Tako kaste maheda mahe 230g | Sauces & condiments | — | — | 3.29 € | Coop + Selver |
| Santa maria Tako kaste terava 230g | Sauces & condiments | — | — | 3.29 € | Selver |
| Santa maria Teriyaki kaste 300ml | Sauces & condiments | — | — | 6.79 € | Coop |
| Santa maria Vokikaste magus hapu 150g | Sauces & condiments | — | — | 2.09 € | Selver |
| Santa maria Vokikaste pad thai 150g | Sauces & condiments | — | — | 2.79 € | Selver |
| Seasir Hele sojakaste 152ml | Sauces & condiments | — | — | 1.99 € | Selver |
| Seasir Sojakaste premium 480ml | Sauces & condiments | — | — | 3.09 € | Selver |
| Sfinx Äädikhape 30% 1000ml | Sauces & condiments | — | — | 1.98 € | Coop |
| Sfinx Marinaadiäädikas 9% 1000ml | Sauces & condiments | — | — | 1.35 € | Coop + Selver |
| Sfinx-e Äädikhape 30% 500ml | Sauces & condiments | 1.19 € | — | 1.19 € | Barbora + Coop + Selver |
| Tarplan Majonees aioli 210g | Sauces & condiments | 1.24 € | 1.79 € | — | Barbora |
| Tarplan Majonees küüslauguga 210g | Sauces & condiments | 1.19 € | — | 1.49 € | Barbora |
| Tarplan Majonees peakoka 380g | Sauces & condiments | — | — | 2.49 € | Coop + Selver |
| Tarplan Majonees provansaal 380g | Sauces & condiments | 1.44 € | 1.69 € | 1.95 € | Barbora |
| Tarplan Majonees provansaal 430g | Sauces & condiments | — | 1.49 € | 1.95 € | Rimi |
| Tarplan Majonees provansaal 50% 450g | Sauces & condiments | 1.64 € | — | 2.19 € | Barbora |
| Tarplan Majonees provansaal 900g | Sauces & condiments | — | 3.99 € | 3.95 € (3.29 € Partner) | Selver |
| Tarplan Majonees provansaal laktoosivaba 210g | Sauces & condiments | — | 1.19 € | 1.09 € | Coop + Selver |
| Tarplan Majonees provansaal premium 210g | Sauces & condiments | 1.12 € | 1.29 € | 1.49 € | Barbora |
| Tarplan Majonees tilliga 210g | Sauces & condiments | — | — | 1.58 € | Coop |
| Tarplan Majonees tšilli 210g | Sauces & condiments | 1.24 € | 1.79 € | — | Barbora |
| Tarplan Majonees vegan 210g | Sauces & condiments | — | — | 1.29 € | Coop + Selver |
| Tarplan Majonees vegan 380g | Sauces & condiments | 1.65 € | — | 2.19 € | Barbora |
| Tarplan Majoneesi ketshupikaste 450g | Sauces & condiments | — | — | 2.29 € | Coop |
| Tarplan Salatikaste caesar 210g | Sauces & condiments | 1.42 € | 1.99 € | 1.79 € | Barbora |
| Tartu mill Pastakaste arrabbiata 340g | Sauces & condiments | 3.19 € | 3.19 € | — | Barbora + Rimi |
| Tartu mill Pastakaste arrabbiata terav tšilliga 340g | Sauces & condiments | — | — | 3.19 € (2.69 € Partner) | Selver |
| Tartu mill Pastakaste bolognese hakklihaga 340g | Sauces & condiments | — | — | 3.65 € | Selver |
| Tartu mill Pastakaste napoletana 340g | Sauces & condiments | 3.29 € | 3.29 € | — | Barbora + Rimi |
| Tartu mill Pastakaste napoletana porg sibula sibulaga 340g | Sauces & condiments | — | — | 3.13 € (2.69 € Partner) | Selver |
| Tartu mill Pastakaste tomati basiiliku 340g | Sauces & condiments | — | — | 3.19 € (2.69 € Partner) | Selver |
| Tartu mill Pastakaste tomati itaalia juustu 340g | Sauces & condiments | — | — | 3.99 € | Coop + Selver |
| Tere Dipikaste dipp tops küüslaugu 200g | Sauces & condiments | 1.75 € | — | 1.75 € | Barbora + Selver |
| Tere Majonees laktoosivaba 410g | Sauces & condiments | — | 2.75 € | 2.65 € | Coop |
| Thai choice Austrikaste 200ml | Sauces & condiments | — | — | 2.59 € | Coop |
| Thai choice Kalakaste 200ml | Sauces & condiments | 2.19 € (1.75 € Aitäh) | — | 2.19 € | Barbora + Coop + Selver |
| Thai choice Magus tshillikaste 700ml | Sauces & condiments | — | — | 4.77 € (3.79 € Partner) | Coop |
| Thai choice Magus tšillikaste 200ml | Sauces & condiments | 2.19 € | — | 2.09 € | Coop |
| Thai choice Teriyaki kaste 200ml | Sauces & condiments | — | — | 2.79 € | Coop |
| Vilux Sinep dijoni teraline 200g | Sauces & condiments | 2.79 € | — | 2.80 € | Barbora |
| Vilux Sinep dijoni terava 200g | Sauces & condiments | 2.79 € | — | 2.80 € | Barbora |
| Elpozo Fuet nobleza salaami 200g | Sausages | — | — | 4.06 € | Coop |
| Elpozo Fuetec toorsalaami 170g | Sausages | — | — | 2.99 € | Coop |
| Elpozo Salaami fuetec trühvliga 150g | Sausages | 4.29 € | — | — | Barbora + Coop |
| Karni Maitsesalaami viil 120g | Sausages | — | — | 2.59 € | Coop |
| Karni T s vorst parmigiano reggiano juustuga 250g | Sausages | — | — | 5.59 € | Coop |
| Karni Täissuitsuvorst kuningate 250g | Sausages | 3.95 € | 3.95 € | 3.95 € | Barbora + Coop + Rimi + Selver |
| Lihasnäkk parmigiano reggiano juustuga m 85g | Sausages | — | — | 1.85 € (1.29 € Partner) | Selver |
| Linnamäe T s hirvevorst lepasuitsujuustuga 230g | Sausages | — | — | 4.49 € | Selver |
| Linnamäe T s põdravorst 230g | Sausages | — | — | 5.69 € (4.89 € Partner) | Selver |
| Maitselt grillvorst juustuga m 600g | Sausages | — | — | 5.89 € | Coop |
| Maks & moorits Doktorivorst 600g | Sausages | 3.69 € | — | 3.69 € (2.49 € Partner) | Coop |
| Maks & moorits Juustuvorst 300g | Sausages | 1.79 € | — | 1.49 € | Selver |
| Maks & moorits Juustuvorst 77.7% 350g | Sausages | 2.59 € | — | 3.19 € | Barbora |
| Maks & moorits Kanaviiner 500g | Sausages | 2.19 € | — | 2.29 € | Coop |
| Maks & moorits Keeduvorst kevadine 300g | Sausages | 1.49 € | — | 1.51 € | Coop |
| Maks & moorits Klassikaline viiner 500g | Sausages | 2.99 € | — | — | Coop |
| Maks & moorits Koduviiner 500g | Sausages | 2.05 € | 2.05 € | 1.59 € | Coop |
| Maks & moorits Laste toorvorstikesed 400g | Sausages | 3.99 € | — | — | Barbora + Coop |
| Maks & moorits Lastevorst 77.7% 350g | Sausages | 2.59 € | — | 2.89 € | Barbora |
| Maks & moorits Lemmikvorst 300g | Sausages | 1.39 € | — | 1.39 € | Coop |
| Maks & moorits Memme verivorst 500g | Sausages | 2.49 € | — | 1.79 € | Coop |
| Maks & moorits Sardell 77.7% 375g | Sausages | 1.99 € | 2.29 € | 2.53 € (1.99 € Partner) | Barbora |
| Maks & moorits Sealihasardell 500g | Sausages | 2.69 € | — | — | Coop |
| Maks & moorits Suitsusardell lemmik 375g | Sausages | 2.19 € | 2.19 € | — | Coop |
| Maks & moorits Suitsutatud doktorivorst 500g | Sausages | 2.75 € | — | 3.59 € | Barbora |
| Maks & moorits Suitsutatud juustuvorst 500g | Sausages | 2.75 € | — | 3.59 € | Barbora |
| Maks & moorits Suitsuviiner 300g | Sausages | 1.62 € | 1.69 € | 1.62 € | Coop |
| Maks & moorits Täissuitsuvorst klassikaline 240g | Sausages | 3.59 € | — | 3.59 € | Coop |
| Maks & moorits Täissuitsuvorst pepperoni 240g | Sausages | 3.59 € | 2.39 € | 3.65 € | Rimi |
| Maks & moorits Täissuitsuvorst tooma 240g | Sausages | 3.29 € | — | 2.49 € | Coop |
| Maks & moorits Toorvorstikesed pühajärve 400g | Sausages | 2.39 € | — | 3.49 € | Barbora |
| Maks & moorits Väike kanaviiner 300g | Sausages | 1.69 € | — | 1.59 € | Coop + Selver |
| Maks & moorits Väike viiner 260g | Sausages | 1.89 € | 1.69 € | 1.79 € | Rimi |
| Maks&moorits Juustuviiner 300g | Sausages | — | — | 2.29 € | Coop |
| Maks&moorits Kanalihasnäkk super snack 85g | Sausages | — | — | 1.85 € (1.29 € Partner) | Coop |
| Maks&moorits Kodu grillvorstid 600g | Sausages | — | 3.99 € | — | Coop |
| Maks&moorits Lihasnäkk pepperoni super snack 85g | Sausages | — | — | 1.85 € (1.29 € Partner) | Selver |
| Maks&moorits Lihasnäkk super snack klassikaline 85g | Sausages | — | — | 1.85 € (1.29 € Partner) | Selver |
| Maks&moorits Maitselt mahedad grillvorstid 900g | Sausages | — | — | 4.99 € | Coop + Selver |
| Maks&moorits Maitselt mahedad toorvorstikesed 400g | Sausages | — | — | 4.09 € | Coop |
| Matsimoka Grillvorst mozzarella tom basiiliku 250g | Sausages | — | — | 4.49 € | Coop + Selver |
| Matsimoka Salaami chorizo 150g | Sausages | 3.45 € | — | 3.45 € | Coop |
| Matsimoka Salaami traditsiooniline 150g | Sausages | 3.45 € | — | 3.45 € | Coop |
| Matsimoka Suitsuvorst juustuga 240g | Sausages | 3.79 € | 3.79 € | 4.09 € | Barbora + Rimi |
| Matsimoka Tailihaviiner 250g | Sausages | 4.05 € | 4.05 € | 4.06 € | Coop |
| Matsimoka Trühvli salaami 150g | Sausages | — | — | 4.09 € | Coop |
| Matsimoka Tshilli salaami 150g | Sausages | — | — | 3.45 € | Coop |
| Nõo Grillvorstid jäägri 365g | Sausages | 4.65 € | — | 4.59 € | Coop + Selver |
| Nõo Kanaviinerid nomps 250g | Sausages | 2.29 € | — | — | Barbora |
| Nõo Keedusalaami paruni viil 90g | Sausages | 2.75 € | — | — | Barbora |
| Nõo Keedusalaami vasalli 250g | Sausages | 4.99 € | — | 3.19 € | Selver |
| Nõo Keeduvorst nomps 350g | Sausages | 4.99 € | — | 4.99 € (3.39 € Partner) | Barbora + Selver |
| Nõo P s vorst krakov 270g | Sausages | — | — | 3.65 € (2.49 € Partner) | Coop |
| Nõo P s vorst mini viil 135g | Sausages | — | — | 2.80 € (1.49 € Partner) | Coop |
| Nõo Snäkkvorstike parmigiano reggiano juustuga 85g | Sausages | — | — | 1.49 € | Selver |
| Nõo Suitsuvorst kadakajuustuga 250g | Sausages | — | — | 3.49 € | Selver |
| Nõo Suitsuvorst treski terräv 240g | Sausages | 4.69 € | — | 4.69 € | Barbora + Selver |
| Nõo T s vorst ordu küüslauguga 250g | Sausages | — | — | 4.79 € | Coop + Selver |
| Nõo Täislihaviiner suitsutatud 310g | Sausages | 4.35 € | — | 4.39 € | Barbora |
| Nõo Täissuitsuvorst eesti juustuga 250g | Sausages | 4.89 € | 4.89 € | — | Barbora + Rimi |
| Nõo Täissuitsuvorst juustuga moskva 250g | Sausages | 4.39 € | 4.39 € | — | Barbora + Rimi |
| Nõo Täissuitsuvorst moskva 250g | Sausages | 4.19 € | 3.59 € | 4.19 € (3.49 € Partner) | Rimi |
| Nõo Täissuitsuvorst wabariigi 250g | Sausages | 4.25 € | 4.25 € | 3.29 € | Selver |
| Nõo Tarbatu keedusalaami viil 105g | Sausages | — | 3.59 € | 3.65 € | Coop |
| Oskar E vaba lihaviiner 125g | Sausages | 1.49 € | 1.49 € | 1.19 € | Selver |
| Oskar Täissuitsuvorst moskva 210g | Sausages | 4.59 € | 4.59 € | 4.59 € | Barbora + Rimi + Selver |
| Oskar Viiner lambasooles päris 350g | Sausages | 3.65 € | 3.65 € | — | Barbora + Rimi |
| Rakvere grillviiner juustuga 500g | Sausages | — | — | 4.99 € | Coop |
| Rakvere Grillvorstid rohke juustuga 400g | Sausages | 4.29 € | 3.99 € | 4.29 € | Coop + Rimi |
| Rakvere Juustuvorst viil 190g | Sausages | 1.89 € | — | 1.92 € | Barbora |
| Rakvere Keeduvorst doktori 300g | Sausages | 1.55 € | — | 2.02 € | Barbora |
| Rakvere Keeduvorst juustu 300g | Sausages | 1.75 € | — | 2.43 € | Barbora |
| Rakvere Keeduvorst lastevorst 300g | Sausages | — | — | 2.12 € | Coop |
| Rakvere Keeduvorst lastevorst viil 190g | Sausages | — | — | 1.69 € | Coop |
| Rakvere Lasteviiner 200g | Sausages | 1.89 € | 1.49 € | 1.89 € | Rimi |
| Rakvere Lastevorst lihakas viil 170g | Sausages | 2.05 € | — | 2.08 € | Coop |
| Rakvere Lihakas doktorivorst viil 170g | Sausages | — | — | 2.02 € | Coop |
| Rakvere Lihakas lastevorst 360g | Sausages | — | — | 3.85 € | Coop |
| Rakvere Merevaigu grillvorstid 600g | Sausages | 4.99 € | — | — | Coop |
| Rakvere Mini juustuviiner 200g | Sausages | 2.29 € | — | 2.39 € | Barbora |
| Rakvere Miniõllesigar 300g | Sausages | — | — | 5.68 € | Selver |
| Rakvere Miniõllesigar kolme juustuga 300g | Sausages | — | — | 5.89 € | Coop |
| Rakvere P s vorst lihakas krakov 300g | Sausages | 3.65 € | 2.99 € | 2.39 € | Selver |
| Rakvere Poolsuitsuvorst 350g | Sausages | 3.69 € | 3.79 € | — | Barbora |
| Rakvere Poolsuitsuvorst servelaat 500g | Sausages | 5.79 € | 5.79 € | 6.29 € | Barbora + Rimi |
| Rakvere Salaami itaaliapärane viil 130g | Sausages | 3.19 € | 3.19 € | 2.49 € | Selver |
| Rakvere Salaami seemnekattega 200g | Sausages | 3.95 € | — | — | Coop |
| Rakvere Šašlõki toorvorstid 400g | Sausages | 4.19 € | — | 4.39 € | Barbora + Coop |
| Rakvere Seemnekattega toorsuitsuvorst viil seemnekattega 110g | Sausages | — | 2.59 € | 2.49 € | Coop + Selver |
| Rakvere Suitsujuustuvorst lihakas 360g | Sausages | 3.49 € | 3.15 € | 3.75 € | Rimi |
| Rakvere Suitsusardell 500g | Sausages | 2.99 € | 2.99 € | — | Coop |
| Rakvere T s vorst õllesigar 120g | Sausages | — | — | 1.79 € | Selver |
| Rakvere Täissuitsuvorst mõnus 210g | Sausages | 3.79 € | 3.79 € | — | Barbora + Rimi |
| Rakvere Toorsuitsuvorst 280g | Sausages | — | 3.89 € | — | Rimi |
| Rakvere Toorvorstid merevaigu 400g | Sausages | 5.19 € (3.99 € Aitäh) | 3.49 € | — | Rimi |
| Rakvere Toorvorstid mustika 400g | Sausages | 4.99 € | 4.65 € | — | Rimi |
| Rakvere Traditsiooniline salaami viil 130g | Sausages | — | — | 3.29 € | Coop + Selver |
| Rakvere Verikäkk 440g | Sausages | 1.85 € | 1.85 € | — | Barbora + Rimi |
| Rakvere Verivorst 500g | Sausages | 2.35 € | 2.39 € | — | Barbora |
| Rakvere Viiner 500g | Sausages | 2.69 € | 2.69 € | 3.45 € | Barbora + Rimi |
| Rakvere Viiner lihakas 260g | Sausages | — | 2.89 € | 2.99 € | Rimi |
| Rakvere Vinkuampsud juustuga 300g | Sausages | — | — | 3.55 € | Coop |
| Rannarootsi Delikatessviiner cheddari juustuga 250g | Sausages | — | — | 2.65 € | Coop |
| Rannarootsi Ehe hispaaniapärane chorizo viil 100g | Sausages | — | — | 2.39 € | Coop |
| Rannarootsi Ehe itaaliapärane salaami viil 100g | Sausages | — | — | 2.39 € | Coop |
| Rannarootsi Frankfurter 500g | Sausages | 2.59 € | — | 3.55 € (2.79 € Partner) | Barbora |
| Rannarootsi Keeduvorst paprikalõige viil 150g | Sausages | — | — | 1.49 € | Coop |
| Rannarootsi Miniviiner ehe 200g | Sausages | 1.95 € (1.59 € Aitäh) | 1.95 € | 1.99 € | Barbora + Coop + Rimi |
| Rannarootsi Peened grillvorstid 330g | Sausages | 3.29 € | — | — | Coop |
| Rannarootsi Poolsuitsuvorst juustu 330g | Sausages | 3.35 € | — | 1.75 € | Selver |
| Rannarootsi Poolsuitsuvorst kalevi 330g | Sausages | 2.99 € | — | 3.09 € | Barbora |
| Rannarootsi Sealihasardell 500g | Sausages | 3.29 € | 2.85 € | 3.39 € | Coop |
| Rannarootsi Suitsusardell 500g | Sausages | 2.39 € | 2.89 € | 2.39 € | Barbora + Selver |
| Rannarootsi Suitsusardell ehe 375g | Sausages | — | 3.25 € | 3.23 € (2.59 € Partner) | Selver |
| Rannarootsi Suitsusardell juustuga 500g | Sausages | 3.09 € | 3.15 € | 3.13 € | Coop |
| Rannarootsi T s vorst eesti lihaveise 240g | Sausages | — | — | 3.75 € | Coop |
| Rannarootsi T s vorst metssealihast eesti uluk 180g | Sausages | — | — | 2.99 € | Coop |
| Rannarootsi Täissuitsuvorst hirve 240g | Sausages | 3.55 € | 3.55 € | 3.55 € | Coop |
| Rannarootsi Viiner 400g | Sausages | 2.39 € | — | — | Coop |
| Rannarootsi Viiner ehe 90% 330g | Sausages | 2.89 € | 2.61 € | 2.49 € | Coop + Selver |
| T s vorst põdralihast juustuga eesti uluk rr 180g | Sausages | — | — | 3.19 € | Coop |
| Tallegg Kanasigar 200g | Sausages | — | — | 2.59 € | Selver |
| Tallegg Kanasigar juustu juustuga 200g | Sausages | — | — | 3.79 € | Coop + Selver |
| Tallegg Kanaviiner 400g | Sausages | — | 1.99 € | — | Coop + Rimi |
| Tallegg T s vorst broilerilihast 200g | Sausages | 3.85 € | — | — | Coop |
| Toored grillvorstid lambasooles vk 400g | Sausages | 3.69 € | 3.69 € | — | Barbora + Rimi |
| Valla Keeduvorst juustu 600g | Sausages | 1.99 € | — | 1.98 € | Selver |
| Wõro Juustuvorst 600g | Sausages | 2.09 € | 2.09 € | 2.12 € | Coop |
| Wõro Keeduvorst võileivavorst 800g | Sausages | — | — | 0.69 € | Selver |
| Wõro Õllemops juustuga 500g | Sausages | 2.29 € | 2.39 € | 3.39 € | Barbora |
| Wõro Peipsi sibulagrill 900g | Sausages | 3.99 € | 4.59 € | 4.99 € | Barbora |
| Wõro Poolsuitsuvorst tõmmu 350g | Sausages | 1.59 € | — | 2.19 € (1.69 € Partner) | Barbora + Coop |
| Wõro Suitsuvorst juustuga tõmmu 350g | Sausages | — | 2.55 € | 2.39 € (2.09 € Partner) | Selver |
| Wõro Suitsuvorst tamula viil 150g | Sausages | — | — | 1.39 € | Coop |
| Ekströms Vaniljekastmepulber 91g | Spices | — | — | 1.11 € | Selver |
| Himaalaja roosa sool 1000g | Spices | — | — | 2.63 € | Coop |
| Himaalaja roosa sool jäme 1000g | Spices | — | — | 1.99 € | Selver |
| Kalev Küpsetusshokolaad piima vilma 190g | Spices | — | — | 4.87 € | Selver |
| Kalev Küpsetusshokolaad tume vilma 70% 190g | Spices | — | — | 4.87 € | Selver |
| Kalev Küpsetusshokolaad valge vilma 190g | Spices | — | — | 4.87 € | Selver |
| Kati Sool ekstra 1000g | Spices | — | — | 0.99 € | Selver |
| Kati Sool jäme 1000g | Spices | — | — | 0.99 € | Selver |
| Kotanyi Kartulimaitseaine ameerika 30g | Spices | — | 1.59 € | — | Coop |
| Kotanyi Loorberilehed 4g | Spices | 1.39 € (0.99 € Aitäh) | 1.55 € | — | Barbora |
| Kotanyi Nelja pipra segu 16g | Spices | 1.45 € | — | — | Barbora + Coop |
| Kotanyi Oregano 8g | Spices | — | 1.55 € | — | Coop |
| Kotanyi Peenestatud tüümian 14g | Spices | 1.39 € | — | — | Barbora |
| Kotanyi Ribimaitseaine 40g | Spices | 1.45 € | — | — | Barbora + Coop |
| Meira Cajuni vürts 32g | Spices | 1.45 € | — | 1.47 € | Barbora |
| Meira Jahvatatud kaneel 27g | Spices | 0.99 € | — | — | Barbora + Coop |
| Meira Jahvatatud kardemon 8g | Spices | 0.89 € | — | 0.90 € | Barbora |
| Meira Jahvatatud vürtsköömen 25g | Spices | 1.05 € | — | 1.07 € | Barbora |
| Meira Kardemoni seemned 8g | Spices | 1.15 € | — | 1.17 € | Barbora |
| Meira Kurkum 60g | Spices | 1.99 € | — | 2.02 € | Barbora |
| Meira muskaatpähkel jahvatatud purk 32g | Spices | — | — | 4.56 € | Selver |
| Meira Must pipar purustatud 27g | Spices | — | — | 1.68 € | Selver |
| Meira Peeneteraline mineraalsool jodeeritud 80g | Spices | — | — | 3.14 € | Coop |
| Meira Petersell 9g | Spices | 0.99 € | — | — | Barbora + Coop |
| Meira Rosepipar jahvatamata 15g | Spices | — | — | 1.82 € | Selver |
| Meira Sibulapulber 30g | Spices | 1.79 € | — | 1.82 € | Barbora |
| Meira Sidrunipipar soola 0% 32g | Spices | 1.55 € | — | 1.58 € | Barbora |
| Meira Vahemere ürdisegu soola 0% 9g | Spices | 0.85 € | — | 0.86 € | Barbora |
| Pansool 450g | Spices | — | — | 4.18 € | Selver |
| Podravka M aine kuldsele kanale vegeta natur 20g | Spices | — | — | 0.66 € | Selver |
| Podravka Maitseaine kalale vegeta natur 20g | Spices | — | — | 0.66 € | Selver |
| Santa maria Apelsinipipar 48g | Spices | 2.29 € | — | 2.29 € | Barbora + Selver |
| Santa maria Aroomisool 40g | Spices | 0.95 € | — | 0.95 € (0.75 € Partner) | Barbora + Selver |
| Santa maria Aroomisool 74g | Spices | 1.69 € | — | 1.59 € | Selver |
| Santa maria Aroomisool purk 390g | Spices | — | 5.29 € | 5.19 € | Coop |
| Santa maria Basiilik 12g | Spices | 1.59 € | — | 1.59 € | Barbora + Selver |
| Santa maria Basiilik 6g | Spices | 1.19 € | 1.35 € | 1.19 € | Barbora + Selver |
| Santa maria Broilerimaitseaine 275g | Spices | 2.91 € | 5.19 € | 5.19 € | Barbora |
| Santa maria Broilerimaitseaine 30g | Spices | 0.99 € | 1.05 € | 0.95 € | Coop |
| Santa maria Broilerimaitseaine 90g | Spices | 2.25 € | 2.25 € | 1.59 € | Selver |
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
| Santa maria Kanamaitseaine kollane karri 24g | Spices | — | 1.05 € | — | Rimi |
| Santa maria Kaneel jahvatatud 210g | Spices | 4.41 € | — | 7.89 € | Barbora |
| Santa maria Kaneel jahvatatud 22g | Spices | — | — | 1.25 € (0.95 € Partner) | Coop |
| Santa maria Kaneel jahvatatud 40g | Spices | 2.15 € | — | 2.09 € | Selver |
| Santa maria Kaneelikoor 22g | Spices | 2.39 € | — | 2.39 € | Barbora + Selver |
| Santa maria Kardemon jahvatatud 35g | Spices | 4.99 € | 5.39 € | 4.99 € | Barbora + Selver |
| Santa maria Karri 25g | Spices | 0.95 € | 1.05 € | 0.95 € (0.75 € Partner) | Barbora + Selver |
| Santa maria Karri 34g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Karri ja mango maitseainesegu 41g | Spices | — | 3.79 € | 3.49 € | Selver |
| Santa maria Kartulimaitseaine 100g | Spices | 2.25 € | 2.25 € | 1.59 € | Selver |
| Santa maria Kartulimaitseaine 30g | Spices | 0.95 € | 1.05 € | 0.95 € | Coop |
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
| Santa maria Küüslaugupulber mahe 46g | Spices | 3.49 € | 3.69 € | 3.49 € | Barbora + Selver |
| Santa maria Küüslaugusool 40g | Spices | 0.95 € | 0.79 € | 0.95 € (0.75 € Partner) | Rimi |
| Santa maria Küüslaugusool 77g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Küüslauk tükeldatud 25g | Spices | 1.05 € | 0.99 € | 1.05 € | Rimi |
| Santa maria Laimipipar veskis 90g | Spices | 5.89 € | — | 5.89 € (4.49 € Partner) | Barbora + Selver |
| Santa maria Liha üldmaitseaine 290g | Spices | 2.99 € | 5.29 € | 5.79 € | Barbora |
| Santa maria Liha üldmaitseaine 35g | Spices | 1.05 € | 1.05 € | 1.05 € | Coop |
| Santa maria Liha üldmaitseaine 51g | Spices | — | 1.85 € | 1.75 € | Selver |
| Santa maria Liha üldmaitseaine 70g | Spices | 1.75 € | 1.75 € | 1.19 € | Selver |
| Santa maria Loorberileht 4g | Spices | 1.45 € | 1.55 € | 1.45 € | Barbora + Selver |
| Santa maria Maitseainesegu garam masala 33g | Spices | — | — | 1.55 € | Selver |
| Santa maria Maitseainesegu kana takole 28g | Spices | — | — | 1.85 € | Selver |
| Santa maria Maitseainesegu takole juustu 28g | Spices | — | — | 1.25 € | Coop + Selver |
| Santa maria Maitseainesegu tikka masala 35g | Spices | — | — | 1.55 € | Selver |
| Santa maria Marinaad magus tšilli 75g | Spices | — | 1.09 € | 1.05 € | Selver |
| Santa maria Marinaadisegu kurgile 100g | Spices | 1.39 € | 1.49 € | 1.39 € | Barbora + Selver |
| Santa maria Muskaatpähkel 10g | Spices | — | 1.59 € | 1.49 € | Selver |
| Santa maria Must pipar jahvatatud 16g | Spices | — | 1.55 € | 1.45 € (1.09 € Partner) | Selver |
| Santa maria Must pipar jahvatatud 45g | Spices | 3.49 € | 3.39 € | 2.59 € | Selver |
| Santa maria Must pipar purustatud 18g | Spices | — | 1.55 € | 1.45 € (1.09 € Partner) | Coop |
| Santa maria Must pipar purustatud 217g | Spices | 5.39 € | 9.55 € | — | Barbora |
| Santa maria Must pipar purustatud 36g | Spices | 2.89 € | 3.09 € | 2.89 € | Barbora + Selver |
| Santa maria Must pipar purustatud purk 217g | Spices | — | — | 10.59 € | Coop + Selver |
| Santa maria Must terapipar 210g | Spices | 5.39 € | 9.55 € | 9.79 € | Barbora |
| Santa maria Must terapipar 22g | Spices | 1.39 € | 1.55 € | 1.45 € | Barbora |
| Santa maria Nelk 10g | Spices | 1.15 € | 1.05 € | 1.15 € | Rimi |
| Santa maria Persillade 35g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Persillade 48g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Petersell 4g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Pihvimaitseaine 30g | Spices | 0.95 € | — | 0.95 € | Barbora + Selver |
| Santa maria Piparkoogimaitseaine 30g | Spices | 1.55 € | — | 1.55 € | Barbora + Selver |
| Santa maria Piprasegu 258g | Spices | 5.63 € | — | 9.99 € | Barbora |
| Santa maria Piprasegu 25g | Spices | 1.59 € | 1.29 € | 1.59 € | Rimi |
| Santa maria Pitsamaitseaine 9g | Spices | — | 1.65 € | 1.59 € | Selver |
| Santa maria Pizzamaitseaine 5g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Prantsuse ürdisegu 6g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Pune 5g | Spices | 1.59 € | 1.75 € | 1.59 € | Barbora + Selver |
| Santa maria Pune mahe 9g | Spices | — | 3.79 € | 3.49 € | Selver |
| Santa maria Rosmariin 15g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Rosmariin mahe 19g | Spices | 3.79 € | 3.79 € | — | Barbora + Rimi |
| Santa maria Salatimaitseaine ürtidega 30g | Spices | — | 1.05 € | 1.05 € | Rimi + Selver |
| Santa maria Santa maitseainesegu fajita 28g | Spices | — | — | 1.19 € | Selver |
| Santa maria Santa maitseainesegu takole 28g | Spices | — | — | 1.19 € | Selver |
| Santa maria Santa segu pasta rossa veski 80g | Spices | — | — | 5.89 € (4.49 € Partner) | Coop + Selver |
| Santa maria Šašlõkimaitseaine 45g | Spices | 1.05 € | 0.79 € | — | Rimi |
| Santa maria Sidrunipipar 33g | Spices | 1.89 € | 1.89 € | — | Barbora + Coop + Rimi |
| Santa maria Sidrunipipar 359g | Spices | 5.33 € | 9.55 € | 9.49 € | Barbora |
| Santa maria Sidrunipipar 42g | Spices | 2.55 € | 2.75 € | — | Barbora |
| Santa maria Sidrunipipar 55g | Spices | 2.39 € | 2.45 € | 2.39 € | Barbora + Selver |
| Santa maria Sidrunipipar 70g | Spices | 2.79 € | 2.59 € | — | Rimi |
| Santa maria Sidrunipipar soola purk 0% 42g | Spices | — | — | 2.55 € | Selver |
| Santa maria Sinepiseemned 35g | Spices | 0.99 € | 1.05 € | 0.95 € | Selver |
| Santa maria Sool 92g | Spices | 1.59 € | — | 1.59 € | Barbora + Selver |
| Santa maria Suitsutatud paprika 37g | Spices | 2.79 € | 2.85 € | 2.75 € | Selver |
| Santa maria Tellicherry pipar veski 70g | Spices | — | — | 6.99 € (5.29 € Partner) | Coop + Selver |
| Santa maria Teriyaki maitseainesegu 44g | Spices | — | 3.79 € | 3.49 € | Selver |
| Santa maria Teriyaki marinaad 75g | Spices | 1.05 € | 1.09 € | 1.05 € | Barbora + Selver |
| Santa maria Tilli 7g | Spices | 0.95 € | 0.79 € | 0.95 € | Rimi |
| Santa maria Tšillipipar 34g | Spices | 2.29 € | — | 2.29 € | Barbora + Selver |
| Santa maria Tšillipipar red hot helbed 28g | Spices | — | 2.39 € | 2.29 € | Selver |
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
| Santa maria Vanillikaun purk 3g | Spices | — | — | 9.09 € | Coop + Selver |
| Santa maria Viie pipra segu 25g | Spices | 1.69 € | 1.39 € | 1.75 € | Rimi |
| Santa maria Viie pipra veski 60g | Spices | — | 9.19 € | 9.09 € (6.99 € Partner) | Selver |
| Santa maria Vürts 15g | Spices | 1.39 € | 1.69 € | 1.39 € | Barbora + Selver |
| Santa maria Vürtsköömen 20g | Spices | 1.19 € | 0.99 € | 1.19 € | Rimi |
| Take1 Take maapähkel röstitud purustatud 70g | Spices | — | — | 0.86 € | Selver |
| Umami Tumeda shokolaadi nööbid 200g | Spices | — | — | 6.09 € | Selver |
| Umami Valge shokolaadi nööbid 200g | Spices | — | — | 6.09 € | Selver |
| Vegeta Maitseaine 75g | Spices | — | — | 0.86 € | Selver |
| 24 herbs Gin cucumber mint 40% 700ml | Spirits | 31.49 € | 27.49 € | — | Rimi |
| Absolut Viin 40% 1000ml | Spirits | 29.99 € | 21.99 € | 30.45 € | Rimi |
| Absolut Viin 40% 500ml | Spirits | 10.99 € | 10.99 € | 11.99 € | Barbora + Rimi |
| Absolut Viin 40% 700ml | Spirits | 23.79 € | 15.99 € | 24.90 € | Rimi |
| Absolut viin passionfruit 38% 700ml | Spirits | — | 16.99 € | 25.90 € | Rimi |
| Absolut viin tabasco 38% 700ml | Spirits | 24.89 € | — | 25.90 € | Barbora |
| Amaretto bonino Liköör 21% 200ml | Spirits | — | — | 3.85 € | Selver |
| Amaretto Liköör bonino 21% 200ml | Spirits | 4.19 € | 4.19 € | — | Barbora + Rimi |
| Aperol Muu alkohoolne jook 11% 700ml | Spirits | — | 15.99 € | 15.99 € | Rimi + Selver |
| Aramis Piiritusjook vs 30% 500ml | Spirits | — | — | 10.49 € | Selver |
| Aramis Piiritusjook vsop 30% 200ml | Spirits | — | — | 4.59 € | Coop |
| Aramis Piiritusjook vsop 30% 500ml | Spirits | — | — | 12.39 € | Selver |
| Aramis Piiritusjook xo 200ml | Spirits | — | 5.75 € | 5.75 € | Rimi + Selver |
| Aramis Piiritusjook xo 500ml | Spirits | — | 14.69 € | 14.75 € | Rimi |
| Ararat Brandy 40% 3YO 500ml | Spirits | — | 20.05 € | 20.09 € | Rimi |
| Ararat Brandy 40% 5YO 500ml | Spirits | 25.69 € | 26.55 € | 26.69 € | Coop |
| Arsenitch Viin 40% 500ml | Spirits | — | 12.99 € | 12.59 € | Selver |
| Bacardi Piiritusjook spiced 35% 1000ml | Spirits | — | 22.99 € | 34.89 € | Rimi |
| Bacardi Rumm carta blanca 37.5% 1000ml | Spirits | 22.99 € | 22.99 € | 22.99 € | Barbora + Rimi + Selver |
| Bacardi Rumm carta blanca 37.5% 500ml | Spirits | — | 18.29 € | 18.17 € | Selver |
| Bacardi Rumm carta blanca 37.5% 700ml | Spirits | 24.15 € | 24.99 € | 25.90 € | Barbora |
| Bacardi Rumm carta negra 37.5% 1000ml | Spirits | 22.99 € | 22.99 € | — | Barbora + Rimi |
| Bacardi Rumm carta negra 37.5% 500ml | Spirits | 18.29 € | 18.29 € | 18.17 € | Selver |
| Bacardi Rumm carta negra 37.5% 700ml | Spirits | — | — | 24.20 € | Selver |
| Baileys Liköör irish cream 17% 500ml | Spirits | 20.49 € | — | 15.99 € | Selver |
| Baileys Liköör irish cream 17% 700ml | Spirits | 24.99 € | — | 24.90 € | Selver |
| Ballantines Viski 40% 500ml | Spirits | — | — | 21.09 € | Coop |
| Barracuda Rumm gold 38% 700ml | Spirits | 19.99 € | 21.45 € | — | Barbora + Coop |
| Beefeater Gin 40% 500ml | Spirits | 16.99 € | — | 18.55 € | Barbora |
| Beefeater Gin london dry 40% 1000ml | Spirits | — | 23.99 € | 29.90 € | Rimi |
| Beefeater Gin london dry 40% 700ml | Spirits | — | 16.49 € | 22.99 € | Rimi |
| Beefeater Gin pink 37.5% 700ml | Spirits | 26.89 € | 25.75 € | 26.90 € | Rimi |
| Beehive Brandy vsop 40% 500ml | Spirits | 18.29 € | — | — | Coop |
| Beehive Brandy xo 40% 500ml | Spirits | 19.29 € | — | — | Coop |
| Belõi aist Brandy 40% 3 500ml | Spirits | 13.99 € | — | 14.89 € | Barbora |
| Beluga Viin noble 40% 500ml | Spirits | 38.99 € | 29.99 € | — | Rimi |
| Belvedere Viin pure 40% 700ml | Spirits | 37.99 € | — | 48.89 € | Barbora |
| Black ram Viski 40% 200ml | Spirits | 6.29 € | 4.99 € | — | Rimi |
| Black ram Viski 40% 700ml | Spirits | 19.89 € | 18.29 € | — | Rimi |
| Bombay sapphire Gin dry 40% 700ml | Spirits | — | 29.99 € | 21.99 € | Selver |
| Bumbu Piiritusjook rum 40% 700ml | Spirits | — | 50.99 € | — | Coop |
| Bumbu Rumm xo 40% 700ml | Spirits | 47.99 € | 59.99 € | — | Coop |
| Bushmills Viski original 40% 700ml | Spirits | 27.69 € | 27.39 € | 26.79 € | Selver |
| Campari Bitter 25% 500ml | Spirits | — | 15.99 € | — | Rimi |
| Canadian Viski special old 40% 700ml | Spirits | — | 22.49 € | 22.39 € | Selver |
| Canari Liköör pina colada 15% 350ml | Spirits | 6.25 € | — | 6.09 € | Selver |
| Canari Liköör tiramisu 16% 350ml | Spirits | 6.25 € | — | 6.09 € | Selver |
| Captain morgan Piiritusjook spiced gold 35% 1000ml | Spirits | — | — | 28.75 € | Selver |
| Captain morgan Piiritusjook spiced gold 35% 500ml | Spirits | — | — | 17.27 € | Selver |
| Captain morgan Rumm dark 40% 1000ml | Spirits | 35.99 € | 33.99 € | 34.46 € | Rimi |
| Captain morgan Rumm dark 40% 700ml | Spirits | 24.79 € | 25.95 € | — | Barbora |
| Captain morgan Rumm white 37.5% 700ml | Spirits | 24.99 € | 18.99 € | 23.25 € | Rimi |
| Caribba Piiritusjook cherry 35% 500ml | Spirits | — | 12.19 € | 11.59 € | Selver |
| Caribba Piiritusjook spiced 35% 500ml | Spirits | — | 10.99 € | 8.99 € | Selver |
| Caribba Rumm blanco 37.5% 500ml | Spirits | 10.99 € | 11.99 € | 9.99 € | Selver |
| Caribba Rumm negro 37.5% 1000ml | Spirits | 24.39 € | 24.39 € | 19.99 € | Selver |
| Caribba Rumm negro 37.5% 500ml | Spirits | 11.25 € | 11.99 € | 9.99 € | Selver |
| Casa charlize Liköör limoncello 26% 500ml | Spirits | 12.99 € | 14.59 € | — | Barbora |
| Chateau de montifaud Konjak vsop 40% 700ml | Spirits | — | 57.99 € | 61.99 € | Rimi |
| Cointreau Liköör 40% 500ml | Spirits | 24.85 € | 24.85 € | 23.49 € | Selver |
| Courvoisier Konjak vs 40% 350ml | Spirits | 25.99 € | 24.99 € | 26.19 € | Rimi |
| Courvoisier Konjak vs 40% 500ml | Spirits | 36.99 € | 37.99 € | 36.89 € | Selver |
| Courvoisier Konjak vs 40% 700ml | Spirits | — | 34.99 € | — | Rimi |
| Courvoisier Konjak vsop 40% 500ml | Spirits | — | 46.29 € | 48.99 € | Rimi |
| Courvoisier Konjak vsop 40% 700ml | Spirits | — | 44.99 € | 63.29 € | Rimi |
| Crafters Gin london dry 43% 700ml | Spirits | — | 29.99 € | 30.50 € | Rimi |
| Danzka Viin 40% 500ml | Spirits | 16.49 € | 16.49 € | 16.49 € | Coop |
| Don papa Rumm 40% 700ml | Spirits | 39.99 € | 42.99 € | — | Barbora |
| Don papa Rumm baroko 40% 700ml | Spirits | 39.99 € | — | 54.78 € | Barbora |
| Don papa Rumm masskara 40% 700ml | Spirits | 39.99 € | — | 50.72 € | Barbora |
| Finlandia Viin 40% 1000ml | Spirits | 20.99 € | 21.99 € | — | Barbora |
| Finlandia Viin 40% 500ml | Spirits | 10.99 € | 10.99 € | — | Barbora + Rimi |
| Finlandia Viin 40% 700ml | Spirits | 14.99 € | 16.99 € | — | Barbora |
| Fireball Liköör 33% 500ml | Spirits | — | 16.35 € | 15.99 € | Selver |
| Flor de cana Rumm 40% 12YO 700ml | Spirits | 43.99 € | 46.69 € | 43.39 € | Selver |
| Gabriel Liköör 45% 500ml | Spirits | 13.35 € | — | 14.20 € | Barbora |
| Gin gordons london dry 37.5% 700ml | Spirits | — | 23.19 € | 23.29 € | Coop |
| Gin hendricks 41.4% 700ml | Spirits | — | 37.99 € | 44.90 € | Rimi |
| Gordon's Gin passionfruit 37.5% 700ml | Spirits | 23.49 € | — | 23.19 € | Selver |
| Grants Viski triple wood 40% 1000ml | Spirits | 24.99 € | 23.99 € | 32.99 € | Rimi |
| Grants Viski triple wood 40% 500ml | Spirits | — | — | 11.99 € | Selver |
| Grants Viski triple wood 40% 700ml | Spirits | — | — | 23.89 € | Selver |
| Grey goose Viin 40% 700ml | Spirits | 44.99 € | — | 51.69 € | Barbora |
| Haig club Viski clubman 40% 700ml | Spirits | 31.99 € | — | 33.39 € | Barbora |
| Hennessy Konjak vs 40% 200ml | Spirits | 16.99 € | 15.49 € | 12.99 € | Selver |
| Hennessy Konjak vs 40% 350ml | Spirits | 19.99 € | 24.99 € | 24.29 € | Barbora |
| Hennessy Konjak vs 40% 500ml | Spirits | 31.49 € | 25.99 € | 28.99 € | Rimi |
| Hennessy Konjak vs karbis 40% 700ml | Spirits | — | — | 48.69 € | Selver |
| Hennessy Konjak vsop karbis 40% 500ml | Spirits | — | — | 62.51 € | Coop |
| Herbert Liköör 35% 350ml | Spirits | — | 9.69 € | 9.59 € | Coop |
| Hine Konjak rare 40% 700ml | Spirits | 61.99 € | 62.99 € | — | Barbora |
| Hlibny dar Viin classic 40% 1000ml | Spirits | — | 21.39 € | — | Rimi |
| Hlibny dar Viin classic 40% 500ml | Spirits | — | 12.49 € | 12.35 € | Selver |
| Hlibny dar Viin classic 40% 700ml | Spirits | — | 17.15 € | 17.15 € | Rimi + Selver |
| Hõbe Viin 39.2% 500ml | Spirits | — | — | 9.99 € | Selver |
| Hõbe Viin 39.2% 700ml | Spirits | 15.99 € | 22.59 € | 22.89 € | Barbora |
| Hõbe Viin mahe 39.2% 700ml | Spirits | 24.19 € | — | 22.79 € | Selver |
| Hõbe Viin mild 39.2% 700ml | Spirits | 16.99 € | 22.99 € | 21.39 € | Barbora |
| Hõbe Viin tuubis 39.2% 700ml | Spirits | 24.99 € | 25.05 € | 24.29 € | Selver |
| Hogarth Gin 37.5% 700ml | Spirits | — | — | 19.25 € | Coop |
| Ibis Brandy xo 36% 500ml | Spirits | — | 10.59 € | 15.79 € | Rimi |
| Ibis Brandy xo 36% 700ml | Spirits | 18.99 € | — | 26.15 € | Barbora |
| Imperial xii Brandy vsop 36% 500ml | Spirits | — | 8.55 € | 10.99 € | Rimi |
| Imperial xii Piiritusjook vs 30% 500ml | Spirits | — | 7.19 € | 12.59 € | Rimi |
| J.p chenet Brandy vsop 36% 500ml | Spirits | 13.99 € | 16.99 € | 18.55 € | Coop |
| J.p chenet Brandy vsop 36% 700ml | Spirits | 20.19 € | 19.99 € | 21.05 € | Rimi |
| Jää Viin premium 40% 700ml | Spirits | 14.99 € | 14.99 € | 19.35 € | Barbora + Rimi |
| Jagdtraum Liköör 30% 700ml | Spirits | 19.49 € | 15.89 € | — | Coop + Rimi |
| Jägermeister Liköör 35% 1000ml | Spirits | 29.99 € | 29.99 € | 33.29 € | Barbora + Rimi |
| Jägermeister Liköör 35% 100ml | Spirits | 6.29 € | 6.29 € | 5.69 € | Selver |
| Jägermeister Liköör 35% 200ml | Spirits | 8.99 € | 8.99 € | 9.45 € | Barbora + Rimi |
| Jägermeister Liköör 35% 350ml | Spirits | 13.79 € | 9.99 € | 13.79 € | Rimi |
| Jägermeister Liköör 35% 500ml | Spirits | 14.99 € | 18.99 € | 17.99 € | Barbora |
| Jägermeister Liköör 35% 700ml | Spirits | 19.99 € | 17.99 € | 23.90 € | Rimi |
| Jägermeister Liköör orange 33% 1000ml | Spirits | 27.99 € | 34.99 € | — | Barbora |
| Jägermeister Liköör orange 33% 500ml | Spirits | 14.99 € | 13.99 € | — | Rimi |
| Jägermeister Liköör orange 33% 700ml | Spirits | 23.99 € | 24.99 € | — | Barbora |
| Jameson Viski 40% 1000ml | Spirits | 39.49 € | — | 39.99 € | Barbora |
| Jameson Viski crested 40% 700ml | Spirits | 27.99 € | — | 35.10 € | Barbora |
| Jameson Viski irish 40% 500ml | Spirits | 16.99 € | 16.39 € | 21.95 € | Rimi |
| Jameson Viski irish 40% 700ml | Spirits | 21.99 € | 23.99 € | 29.39 € | Barbora |
| Jim beam Liköör apple 32.5% 700ml | Spirits | 29.99 € | 28.19 € | — | Rimi |
| Jim beam Viski white label 40% 200ml | Spirits | 10.99 € | — | 9.99 € | Selver |
| Jim beam Viski white label 40% 500ml | Spirits | 15.99 € | 15.99 € | — | Barbora + Rimi |
| Jim beam Viski white label 40% 700ml | Spirits | — | 28.19 € | 26.99 € | Selver |
| Johan freitag Gin 38% 500ml | Spirits | 11.75 € | 11.75 € | — | Coop |
| Johnnie walker Viski black label 40% 700ml | Spirits | — | 40.99 € | 39.99 € | Selver |
| Johnnie walker Viski red label 40% 1000ml | Spirits | — | 37.65 € | 35.79 € | Selver |
| Johnnie walker Viski red label 40% 500ml | Spirits | — | 18.79 € | 18.79 € | Rimi + Selver |
| Johnnie walker Viski red label 40% 700ml | Spirits | — | 17.99 € | 25.40 € | Rimi |
| Junimperium Gin blended dry 45% 700ml | Spirits | — | — | 54.99 € | Coop |
| Junimperium Gin rhubarb 40% 700ml | Spirits | — | — | 56.45 € | Coop |
| Juniper island Gin london dry 40% 700ml | Spirits | 26.49 € | — | 23.99 € | Coop |
| Juniper island Gin nordic rhubarb 38% 700ml | Spirits | — | — | 23.99 € | Coop |
| Kada Gin kadaka 37.5% 500ml | Spirits | 12.59 € | 12.95 € | 12.59 € | Coop |
| Kada Gin kirsi 37.5% 500ml | Spirits | — | 12.99 € | 12.59 € | Selver |
| Kada Gin longero 38% 500ml | Spirits | — | 14.25 € | 12.59 € | Selver |
| Kada Gin rabarberi 37.5% 500ml | Spirits | — | 9.99 € | 12.59 € | Rimi |
| Khortytsa Viin classic 40% 500ml | Spirits | 9.99 € | — | 11.85 € | Barbora |
| Khortytsa Viin classic 40% 700ml | Spirits | 19.09 € | — | 15.35 € | Selver |
| Khortytsa Viin platinum 40% 500ml | Spirits | 9.99 € | — | 13.15 € | Barbora |
| Khortytsa Viin platinum 40% 700ml | Spirits | 19.59 € | — | — | Coop |
| Khortytsa Viin silver cool 40% 500ml | Spirits | 9.99 € | — | 13.15 € | Barbora |
| Kingsmill Gin 38% 1000ml | Spirits | 24.49 € | — | 25.49 € | Barbora |
| Kingsmill Gin 38% 500ml | Spirits | 9.99 € | 14.85 € | 12.99 € | Barbora |
| Kingsmill Gin 38% 700ml | Spirits | 12.99 € | 13.99 € | 12.99 € | Barbora + Selver |
| Kingsmill Gin pet 38% 200ml | Spirits | 4.99 € | 3.99 € | 4.80 € | Rimi |
| Kingsmill Gin rhubarb 38% 500ml | Spirits | — | 9.99 € | 13.41 € | Rimi |
| Koskenkorva Liköör rhubarb 21% 500ml | Spirits | 10.99 € | 13.65 € | — | Barbora |
| Koskenkorva Liköör salmiakki 30% 500ml | Spirits | — | 14.69 € | 12.99 € | Selver |
| Koskenkorva Viin 40% 1000ml | Spirits | 28.59 € | 26.49 € | — | Rimi |
| Koskenkorva Viin 40% 500ml | Spirits | 10.99 € | 13.49 € | 14.99 € | Barbora |
| Koskenkorva Viin 40% 700ml | Spirits | 20.95 € | 14.99 € | — | Rimi |
| Larsen Konjak vs 40% 700ml | Spirits | 41.59 € | — | 41.99 € | Barbora |
| Larsen Konjak vs karbis 40% 500ml | Spirits | — | — | 31.59 € | Selver |
| Larsen Konjak vsop 40% 500ml | Spirits | 41.49 € | 30.99 € | — | Rimi |
| Larsen Konjak vsop karbis 40% 500ml | Spirits | — | — | 29.99 € | Selver |
| Larsen Konjak vsop karbis 40% 700ml | Spirits | — | 49.99 € | 54.09 € | Rimi |
| Larsen Konjak xo karbis 40% 700ml | Spirits | — | 69.99 € | — | Rimi |
| Liviko Liköör kännu kukk karbis 45% 500ml | Spirits | 18.25 € | — | 18.25 € | Barbora + Selver |
| Liviko Liköör kirsi 21% 500ml | Spirits | 7.49 € | — | 6.99 € | Selver |
| Liviko Liköör kirss 21% 500ml | Spirits | 7.65 € | 7.39 € | — | Rimi |
| Liviko Liköör metsmaasikas 21% 500ml | Spirits | 7.19 € | 7.39 € | — | Barbora |
| Lõunamaine Liköör 40% 500ml | Spirits | 12.45 € | 12.45 € | — | Barbora + Rimi |
| Magistr Brandy vsop 36% 500ml | Spirits | — | 16.99 € | 16.99 € | Coop |
| Malibu Liköör 18% 500ml | Spirits | 17.49 € | — | 17.15 € | Selver |
| Martell Konjak vs 40% 700ml | Spirits | 44.99 € | — | 43.59 € | Selver |
| Martell Konjak vsop 40% 350ml | Spirits | — | 36.99 € | 35.29 € | Selver |
| Martell Konjak vsop 40% 700ml | Spirits | 49.99 € | 59.99 € | 64.59 € | Barbora |
| Mernaya Viin tradition 40% 500ml | Spirits | — | 13.19 € | — | Rimi |
| Metaxa Muu piiritusjook 40% 7 700ml | Spirits | 29.99 € | 31.49 € | — | Barbora |
| Metaxa Piiritusjook 38% 5 700ml | Spirits | 28.99 € | — | 26.99 € | Selver |
| Meukow Konjak vs 40% 200ml | Spirits | 11.99 € | 11.49 € | 12.09 € | Coop |
| Meukow Konjak vs 40% 350ml | Spirits | 24.99 € | 23.49 € | 27.99 € | Rimi |
| Meukow Konjak vsop 40% 350ml | Spirits | 34.49 € | 34.49 € | 26.99 € | Selver |
| Meukow Konjak vsop 40% 700ml | Spirits | — | 60.39 € | 53.75 € | Selver |
| Meukow Konjak vsop karbis 40% 500ml | Spirits | — | — | 43.39 € | Coop |
| Midsomer Gin dry pet 38% 500ml | Spirits | 11.99 € | — | — | Coop |
| Moe Viin 40% 700ml | Spirits | — | 20.49 € | 20.49 € | Coop |
| Moe Viin mahe 40% 700ml | Spirits | — | 20.49 € | 21.99 € | Rimi |
| Monarque Piiritusjook 30% 500ml | Spirits | — | 9.29 € | 9.65 € | Rimi |
| Monkey shoulder Viski 40% 700ml | Spirits | 46.99 € | 48.99 € | — | Barbora |
| Morosha Viin spring 40% 500ml | Spirits | 13.79 € | — | 12.80 € | Selver |
| Moskovskaya Viin osobaya 40% 500ml | Spirits | — | 13.35 € | 14.39 € | Coop |
| Moskovskaya Viin silver 40% 500ml | Spirits | — | 13.35 € | — | Coop |
| Nemiroff Viin delikat 40% 200ml | Spirits | — | 6.19 € | 5.99 € | Selver |
| Nemiroff Viin delikat 40% 500ml | Spirits | 9.79 € | 13.99 € | 13.99 € | Barbora |
| Nemiroff viin honey pepper 40% 500ml | Spirits | — | 13.99 € | 13.79 € | Selver |
| Nemiroff Viin original 40% 500ml | Spirits | 12.96 € | 13.99 € | 13.79 € | Barbora |
| Nipernaadi viin jõhvika 37.5% 200ml | Spirits | — | — | 5.39 € | Coop + Selver |
| Nipernaadi viin jõhvika 37.5% 500ml | Spirits | 13.85 € | 13.85 € | 13.75 € | Coop |
| Nordic spirits lab Gin 41% 500ml | Spirits | 23.99 € | 23.99 € | — | Coop |
| Oakheart Piiritusjook spiced bacardi 32.5% 1000ml | Spirits | — | — | 19.99 € | Selver |
| Oakheart Piiritusjook spiced bacardi 32.5% 700ml | Spirits | — | — | 15.99 € | Selver |
| Old kakheti Brandy 40% 3YO 500ml | Spirits | — | 17.99 € | 17.59 € | Selver |
| Perepelka Viin classic 40% 500ml | Spirits | — | — | 12.79 € | Coop |
| Piiritusjook the demons share 40% 6YO 700ml | Spirits | — | — | 35.99 € | Selver |
| Pipra naps Piiritusjook 35% 500ml | Spirits | — | — | 11.59 € | Coop + Selver |
| Pipra naps Piiritusjook meega 35% 500ml | Spirits | — | 11.99 € | 11.59 € | Coop + Selver |
| Pipra naps Pipra piiritusjook 35% 350ml | Spirits | — | 8.49 € | 6.69 € | Selver |
| Planteray Rumm barbados 40% 5YO 700ml | Spirits | 27.99 € | 30.49 € | — | Barbora |
| Planteray Rumm original dark 40% 700ml | Spirits | 21.99 € | 26.49 € | 28.09 € | Barbora |
| Remy martin Konjak vsop 40% 700ml | Spirits | 59.99 € | — | 82.49 € | Barbora |
| Saare Gin roosa 37.5% 500ml | Spirits | 12.49 € | — | 12.09 € | Selver |
| Saare Gin sõstar 37.5% 500ml | Spirits | 12.49 € | — | 12.09 € | Selver |
| Saaremaa Gin dry 37.5% 500ml | Spirits | — | — | 10.99 € | Selver |
| Saaremaa Gin ore 37.5% 500ml | Spirits | — | 14.99 € | 10.99 € | Selver |
| Saaremaa Gin passionfruit 37.5% 500ml | Spirits | 11.99 € | — | 10.99 € | Selver |
| Saaremaa Gin ras 37.5% 500ml | Spirits | — | 9.99 € | 10.99 € | Rimi |
| Saaremaa Gin rhu 37.5% 500ml | Spirits | — | — | 10.99 € | Selver |
| Saaremaa viin jõhvikas 37.5% 500ml | Spirits | — | 12.59 € | 12.19 € | Selver |
| Saaremaa Viin mild 40% 500ml | Spirits | — | 12.29 € | 12.55 € | Rimi |
| Saaremaa Viin pööriöö 40% 500ml | Spirits | 16.49 € | — | 15.99 € | Selver |
| Saaremaa Viin rabarber 37.5% 500ml | Spirits | 9.49 € | — | 12.99 € | Barbora |
| Saaremaa vodka Viin 40% 1000ml | Spirits | 22.95 € | 15.99 € | 18.99 € | Rimi |
| Saaremaa vodka Viin 40% 700ml | Spirits | 17.49 € | — | — | Coop |
| Saaremaa vodka Viin pet 40% 200ml | Spirits | — | 4.79 € | 4.49 € | Selver |
| Scottish leader Viski 40% 200ml | Spirits | 7.69 € | — | 7.99 € | Barbora |
| Scottish leader Viski 40% 700ml | Spirits | 21.99 € | — | 22.89 € | Barbora |
| Silver swan Viin pure rye 40% 700ml | Spirits | — | — | 28.19 € | Coop |
| Singleton Viski single malt 40% 12YO 700ml | Spirits | — | 42.99 € | 53.99 € | Rimi |
| Smirnoff Viin red 37.5% 500ml | Spirits | 17.49 € | 11.99 € | 13.99 € | Rimi |
| Smirnoff Viin red 37.5% 700ml | Spirits | 22.15 € | — | 18.99 € | Selver |
| St.remy Brandy authentic pet vsop 36% 500ml | Spirits | 17.49 € | — | 12.99 € | Selver |
| St.remy Brandy authentic vsop 36% 500ml | Spirits | — | 13.99 € | — | Rimi |
| St.remy Brandy authentic vsop 36% 700ml | Spirits | 18.99 € | 18.99 € | — | Barbora + Rimi |
| St.remy Brandy authentic xo 40% 700ml | Spirits | 31.99 € | — | 33.45 € | Barbora |
| Star dollar Piiritusjook 30% 3 200ml | Spirits | — | — | 4.65 € | Coop |
| Star dollar Piiritusjook rich harmony 30% 5 350ml | Spirits | — | — | 8.35 € | Coop |
| Stumbras Viin 40% 350ml | Spirits | 9.99 € | — | 10.69 € | Barbora |
| Stumbras Viin 40% 500ml | Spirits | 9.99 € | 8.99 € | 15.29 € | Rimi |
| Stumbras Viin 40% 700ml | Spirits | 19.49 € | 19.55 € | — | Barbora |
| Tanqueray Gin 43.1% 700ml | Spirits | 21.99 € | 26.99 € | — | Barbora |
| Tanqueray Gin london dry 43.1% 700ml | Spirits | — | — | 25.99 € | Selver |
| The dubliner Viski irish 40% 700ml | Spirits | — | 20.99 € | 30.99 € | Rimi |
| Three sixty Viin original 37.5% 500ml | Spirits | 17.99 € | — | — | Coop |
| Tullamore dew Viski 40% 1000ml | Spirits | — | 35.69 € | — | Coop |
| Tullamore Viski 40% 700ml | Spirits | 29.99 € | 20.99 € | 26.99 € | Rimi |
| Ukrainka Viin 40% 500ml | Spirits | 12.89 € | 10.49 € | 12.95 € | Rimi |
| Ukrainka Viin 40% 700ml | Spirits | 18.59 € | 13.99 € | — | Rimi |
| Ukrainka Viin platinum 40% 500ml | Spirits | 10.99 € | 10.49 € | 10.99 € | Rimi |
| Ukrainka Viin platinum 40% 700ml | Spirits | 17.99 € | 13.99 € | — | Rimi |
| Valge viin Viin 40% 200ml | Spirits | 4.35 € | 4.35 € | 4.35 € | Barbora + Rimi + Selver |
| Vana tallinn Liköör 40% 1000ml | Spirits | 20.99 € | 25.85 € | 25.70 € | Barbora |
| Vana tallinn Liköör 40% 500ml | Spirits | — | — | 16.39 € | Coop |
| Vana tallinn Liköör 50% 500ml | Spirits | — | — | 17.79 € | Coop |
| Vana tallinn Liköör chocolate cream 16% 500ml | Spirits | — | 11.05 € | 10.45 € | Selver |
| Vana tallinn Liköör coconut 16% 500ml | Spirits | 10.99 € | 11.05 € | — | Barbora |
| Vana tallinn Liköör coffee espresso 35% 500ml | Spirits | — | 11.99 € | — | Rimi |
| Vana tallinn Liköör cream originaal 16% 500ml | Spirits | — | — | 7.99 € | Selver |
| Vana tallinn Liköör eesti 40% 500ml | Spirits | 14.79 € | 11.99 € | 11.99 € | Rimi + Selver |
| Vana tallinn Liköör heritage 40% 500ml | Spirits | 25.99 € | 25.99 € | — | Coop |
| Vana tallinn Liköör ice cream 16% 500ml | Spirits | 10.99 € | 11.05 € | 10.45 € | Selver |
| Vana tallinn Liköör marzipan 16% 500ml | Spirits | 10.99 € | 11.05 € | — | Barbora |
| Vana tallinn Liköör pet 40% 200ml | Spirits | 6.99 € | — | — | Coop |
| Vana tallinn Liköör pet 40% 500ml | Spirits | — | 12.99 € | 11.99 € | Selver |
| Vana tallinn Liköör signature 40% 500ml | Spirits | 61.59 € | — | 61.59 € | Coop |
| Vana tallinn Liköör tiramisu cream 16% 500ml | Spirits | — | 11.05 € | — | Coop |
| Vana tallinn Liköör toffee caramel 35% 500ml | Spirits | — | 11.99 € | 14.95 € | Rimi |
| Viin laua 40% 1000ml | Spirits | — | 17.35 € | 16.05 € | Coop |
| Viin laua 40% 100ml | Spirits | — | — | 2.49 € | Coop |
| Viin laua 40% 200ml | Spirits | — | — | 4.33 € | Selver |
| Viin laua 40% 500ml | Spirits | — | 7.19 € | 7.39 € | Rimi |
| Viin laua 40% 700ml | Spirits | — | 13.19 € | 11.42 € | Selver |
| Viin laua pet 40% 500ml | Spirits | — | 9.29 € | 9.19 € | Coop |
| Viru valge Viin 40% 1000ml | Spirits | 16.99 € | 22.59 € | 22.73 € | Barbora |
| Viru valge Viin 40% 200ml | Spirits | 5.29 € | — | 5.32 € | Coop |
| Viru valge Viin 40% 350ml | Spirits | 9.29 € | 9.29 € | 8.33 € | Selver |
| Viru valge Viin 40% 700ml | Spirits | 16.39 € | 16.49 € | 16.20 € | Selver |
| Viru valge Viin cranberry 37.5% 500ml | Spirits | 8.99 € | — | 11.64 € | Barbora |
| Viru valge Viin rhubarb 37.5% 500ml | Spirits | 11.69 € | — | 11.64 € | Selver |
| Viru valge Viin vägev 80% 500ml | Spirits | 20.99 € | 20.99 € | 19.37 € | Selver |
| Viru valge viin waterm 37.5% 500ml | Spirits | 11.79 € | 9.99 € | — | Rimi |
| Whisky Viski daniels jack tennessee 40% 500ml | Spirits | — | — | 18.99 € | Selver |
| Whisky Viski daniels jack tennessee 40% 700ml | Spirits | — | — | 35.49 € | Selver |
| Zacapa Rumm solera gran reserva 40% 700ml | Spirits | 54.99 € | 78.09 € | — | Barbora |
| Zubrowka Viin biala 40% 500ml | Spirits | 11.49 € | 11.49 € | — | Barbora + Rimi |
| Zubrowka Viin biala 40% 700ml | Spirits | 13.99 € | 15.49 € | — | Barbora |
| Zubrowka Viin cranberry 37.5% 500ml | Spirits | 13.99 € | — | 13.79 € | Selver |
| Aleo Aloe vera jook premium 1500ml | Syrups & juice drinks | 4.09 € | 3.99 € | 4.19 € (3.59 € Partner) | Rimi |
| Aleo Aloe vera jook premium 500ml | Syrups & juice drinks | — | 1.99 € | 2.15 € | Rimi |
| Aleo Mahlajook mango aloe vera pet 1500ml | Syrups & juice drinks | — | — | 4.19 € (3.59 € Partner) | Coop |
| Apelsini ananassi active dr mahlajook porgandi 1500ml | Syrups & juice drinks | — | — | 1.75 € | Coop + Selver |
| Apelsini ananassi active dr mahlajook porgandi 500ml | Syrups & juice drinks | — | — | 1.09 € | Coop + Selver |
| Aura fresh Jõhvikamahlajook 5% 2000ml | Syrups & juice drinks | — | — | 2.35 € | Coop + Selver |
| Aura fresh Mahlajook multifruit 25% 2000ml | Syrups & juice drinks | — | — | 2.35 € | Coop + Selver |
| Aura fresh Mahlajook õuna kirsi aroonia 6% 2000ml | Syrups & juice drinks | — | — | 2.35 € | Coop + Selver |
| Aura fresh Mahlajook viinamarja 5% 2000ml | Syrups & juice drinks | — | — | 2.35 € | Coop |
| Aura fresh Pirni õunamahlajook 10% 2000ml | Syrups & juice drinks | — | — | 2.35 € (1.69 € Partner) | Coop + Selver |
| Aura fresh Ploomi õunamahlajook 2000ml | Syrups & juice drinks | — | — | 2.35 € | Coop + Selver |
| Aura fresh Pun mahlajook viinamarja 25% 2000ml | Syrups & juice drinks | — | — | 2.35 € | Coop + Selver |
| Aura Granaatõunajook 20% 1000ml | Syrups & juice drinks | 1.75 € | 1.75 € | 1.75 € | Barbora + Coop + Rimi + Selver |
| Aura Jõhvikajook 10% 1000ml | Syrups & juice drinks | 1.75 € | — | 1.75 € | Coop |
| Aura Kirsijook 20% 1000ml | Syrups & juice drinks | 1.79 € | 1.79 € | 1.82 € | Barbora + Coop + Rimi |
| Aura Mahlajoogikontsentraat kirsi jõhvika 1000ml | Syrups & juice drinks | — | — | 3.19 € | Coop + Selver |
| Aura Mahlajoogikontsentraat orange mango 1000ml | Syrups & juice drinks | — | — | 3.19 € | Coop + Selver |
| Aura Metsamarja mahlajook fresh 2000ml | Syrups & juice drinks | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Aura Multipuuvilja mahlajook fresh 2000ml | Syrups & juice drinks | 2.29 € | 2.29 € | — | Barbora + Rimi |
| Aura Mustika mahlajook 1000ml | Syrups & juice drinks | — | 1.59 € | 1.65 € | Rimi |
| Aura Siirup sidrunello pet 750ml | Syrups & juice drinks | — | — | 2.05 € | Coop + Selver |
| Aura Viinamarja mahlajook fresh 2000ml | Syrups & juice drinks | 2.29 € | 2.35 € | — | Barbora |
| Cappy Mahlajook fruit ice multipuuvilj 1500ml | Syrups & juice drinks | — | — | 2.50 € | Coop |
| Don simon Don apelsini kõrrejook 200ml | Syrups & juice drinks | — | — | 1.49 € | Coop + Selver |
| Don simon Don viinamarja kõrrejook anan 200ml | Syrups & juice drinks | — | — | 1.31 € | Coop |
| Dr. active Mahlajook mango apelsini 500ml | Syrups & juice drinks | — | 1.09 € | 1.09 € | Rimi + Selver |
| Greppo Karb arbuus mahlajook purk tud 320ml | Syrups & juice drinks | — | — | 1.59 € | Coop |
| Greppo Karb draakonvili mahlajook purk tud 320ml | Syrups & juice drinks | — | — | 1.59 € | Coop |
| Heliis siirup jõhvika 1500ml | Syrups & juice drinks | — | — | 3.79 € | Coop + Selver |
| Kannujook mustsõstra õuna vaarika 200ml | Syrups & juice drinks | — | — | 0.90 € | Selver |
| Küllus Kontsent mahlaj metsjõhvika tud 330ml | Syrups & juice drinks | — | — | 7.41 € | Coop |
| Küllus Kontsent mahlaj metsmustika tud vaar 330ml | Syrups & juice drinks | — | — | 6.99 € | Coop |
| Limpa Maasikajook 250ml | Syrups & juice drinks | 0.62 € (0.55 € Aitäh) | 0.65 € | 0.62 € | Coop |
| Limpa Mahlajook peojook õuna maasika 2000ml | Syrups & juice drinks | — | — | 2.53 € | Coop |
| Limpa Mahlajook pirni õuna 250ml | Syrups & juice drinks | — | 0.59 € | 0.62 € | Rimi |
| Limpa Multijook 250ml | Syrups & juice drinks | 0.62 € (0.55 € Aitäh) | 0.65 € | — | Barbora |
| Limpa Multimahlajook 250ml | Syrups & juice drinks | — | — | 0.62 € | Coop |
| Limpa Õuna kirsijook 250ml | Syrups & juice drinks | 0.62 € (0.55 € Aitäh) | — | 0.62 € | Coop |
| Maasikamahlajook üllatusmuna ülletusmunaga 300ml | Syrups & juice drinks | — | — | 1.72 € | Coop |
| Mango mahlajook apelsini active dr 1500ml | Syrups & juice drinks | — | — | 1.75 € | Coop + Selver |
| Monin Siirup mojito piparmündi 250ml | Syrups & juice drinks | 5.79 € | — | 5.89 € | Barbora |
| Multimahlajook üllatusmuna üllatusmunaga 300ml | Syrups & juice drinks | — | — | 1.72 € | Coop |
| Õunamahlajook üllatusmuna üllatusmunaga 300ml | Syrups & juice drinks | — | — | 1.72 € | Coop |
| Pfanner Punase apelsini jook 2000ml | Syrups & juice drinks | — | 3.79 € | 3.65 € | Selver |
| Põltsamaa Apelsini õunajook 200ml | Syrups & juice drinks | 0.75 € | — | — | Coop |
| Põltsamaa Jõhvika granaatõunajook 1000ml | Syrups & juice drinks | — | — | 1.79 € | Coop + Selver |
| Põltsamaa Jõhvika mahlajook 2000ml | Syrups & juice drinks | 2.65 € | 2.19 € | 2.65 € | Rimi |
| Põltsamaa Jõhvikajook 1000ml | Syrups & juice drinks | 1.75 € | — | 1.79 € | Coop |
| Põltsamaa Kannujook jõhvika 1000ml | Syrups & juice drinks | — | 3.45 € | 3.45 € | Coop + Rimi + Selver |
| Põltsamaa Kannujook kirsi aroonia 200ml | Syrups & juice drinks | — | — | 0.90 € | Selver |
| Põltsamaa kannujook multimahla 1000ml | Syrups & juice drinks | — | — | 3.45 € | Coop + Selver |
| Põltsamaa kannujook mustika õuna 1000ml | Syrups & juice drinks | — | — | 3.45 € | Coop + Selver |
| Põltsamaa Maasika punasesõstrajook kõrrega 200ml | Syrups & juice drinks | — | — | 0.62 € | Coop |
| Põltsamaa Mahlajook troopika mix 2000ml | Syrups & juice drinks | — | — | 2.65 € | Coop + Selver |
| Põltsamaa Marjajook 1000ml | Syrups & juice drinks | 1.79 € | — | 1.79 € | Barbora + Coop + Selver |
| Põltsamaa Multimahlajook 1000ml | Syrups & juice drinks | 1.95 € | — | 1.95 € | Barbora + Coop + Selver |
| Põltsamaa Multimahlajook 2000ml | Syrups & juice drinks | — | 2.19 € | 2.80 € | Rimi |
| Põltsamaa Multimahlajook 200ml | Syrups & juice drinks | 0.62 € (0.62 € Aitäh) | — | 0.62 € | Coop |
| Põltsamaa Mustika õunajook 1000ml | Syrups & juice drinks | 1.69 € | — | 1.69 € | Barbora + Coop + Selver |
| Põltsamaa Õunajook 200ml | Syrups & juice drinks | 0.62 € (0.62 € Aitäh) | — | 0.62 € | Coop |
| Rohelise õuna mündi mahlajook active dr pet 1500ml | Syrups & juice drinks | — | — | 1.75 € | Coop + Selver |
| Rohelise õuna mündi mahlajook active dr pet 500ml | Syrups & juice drinks | — | — | 1.09 € | Coop + Selver |
| Siirup valge klaar a coq le 750ml | Syrups & juice drinks | — | — | 2.02 € | Selver |
| Ahmad tea Must tee earl grey 25x2g | Tea & cocoa | — | 2.25 € | 1.99 € | Selver |
| Ahmad tea Roheline tee green 100g | Tea & cocoa | — | — | 3.29 € (2.59 € Partner) | Selver |
| Basilur Must tee leaf of ceylon 100g | Tea & cocoa | 4.19 € | 4.19 € | — | Barbora + Rimi |
| Basilur Roheline tee jasmine green 100g | Tea & cocoa | 5.99 € | 5.99 € | — | Barbora + Rimi |
| Belin Puuviljatee ingveri astelpaju 20x2g | Tea & cocoa | — | — | 1.01 € | Selver |
| Dilmah Must purutee ceylon 100g | Tea & cocoa | — | — | 2.45 € | Selver |
| Dilmah Must tee earl grey 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | 2.63 € | Barbora |
| Dilmah Must tee ingveri mee 20x1.5g | Tea & cocoa | 1.55 € | — | — | Barbora |
| Dilmah Must tee karamelli 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | 2.63 € | Barbora |
| Dilmah Must tee mustsõstra 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | 2.63 € | Barbora |
| Dilmah Must tee sidruni 20x1.5g | Tea & cocoa | 1.55 € | — | 2.63 € | Barbora |
| Dilmah Must tee vaarika 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | 2.63 € | Barbora |
| Dilmah Roh tee sidruniga 20x1.5g | Tea & cocoa | — | — | 2.84 € | Selver |
| Greenfield Must tee earl grey fantasy 50 25x2g | Tea & cocoa | — | — | 2.43 € | Coop |
| Greenfield Must tee golden ceylon 25x2g | Tea & cocoa | 2.45 € | — | 2.43 € | Coop |
| Greenfield Roheline tee flying dragon 50 25x2g | Tea & cocoa | — | — | 2.43 € | Coop |
| Herba Apteegitillitee 25x1.75g | Tea & cocoa | 1.59 € | — | — | Coop |
| Herba Kummelitee 25x1.25g | Tea & cocoa | 1.59 € | — | — | Coop |
| Herba Piparmünditee 25x1.5g | Tea & cocoa | 1.59 € | — | 1.55 € | Coop |
| Herba Tee kibuvitsa hibiskitee niidiga 25x2g | Tea & cocoa | — | — | 1.55 € | Coop + Selver |
| Herba Tee puuvilja niidiga 25x2g | Tea & cocoa | — | — | 1.55 € | Coop + Selver |
| Hyleys m tee english aristocratic 100g | Tea & cocoa | — | — | 1.89 € | Selver |
| Hyleys Must tee passion fruit 25x2g | Tea & cocoa | 1.55 € | — | — | Barbora + Coop |
| Hyleys Roheline tee 25x1.5g | Tea & cocoa | 1.19 € | — | — | Barbora + Coop |
| Lipton Marjatee vaarika aroonia 20x1.6g | Tea & cocoa | — | — | 3.10 € | Selver |
| Lipton Must tee earl grey 20x1.6g | Tea & cocoa | 3.09 € | 3.19 € | — | Barbora |
| Lipton Must tee earl grey bergamoti sidruni niidiga 25x2g | Tea & cocoa | — | — | 2.55 € | Coop + Selver |
| Lipton Must tee metsamarjadega 20x1.7g | Tea & cocoa | — | — | 3.10 € | Selver |
| Lipton Must tee sidruniga 20x1.7g | Tea & cocoa | — | — | 3.10 € | Selver |
| Lipton Must tee yellow label 100x2g | Tea & cocoa | 7.75 € | — | — | Barbora + Coop |
| Lipton Must tee yellow label 25x2g | Tea & cocoa | 2.49 € | — | 1.75 € | Selver |
| Lipton Must tee yellow label 50x2g | Tea & cocoa | 4.85 € | — | 4.46 € | Coop |
| Lipton Roh tee apelsini mandariini 20x1.8g | Tea & cocoa | — | — | 3.10 € | Selver |
| Lipton Roh tee vaarika granaatõuna 20x1.4g | Tea & cocoa | — | — | 3.10 € | Selver |
| Loyd Marjatee kirsi 20x2g | Tea & cocoa | 2.75 € | — | — | Coop |
| Loyd Marjatee metsamarja 20x2g | Tea & cocoa | — | — | 2.75 € | Coop |
| Loyd Marjatee vaarika maasika 20x2g | Tea & cocoa | — | — | 2.75 € | Coop |
| Loyd Must tee ceylon 50x2g | Tea & cocoa | 4.09 € (3.19 € Aitäh) | 4.09 € | — | Barbora + Rimi |
| Loyd Must tee earl gray 25x2g | Tea & cocoa | 2.19 € | 2.29 € | — | Barbora |
| Loyd Must tee intense 25x2g | Tea & cocoa | 2.19 € | 2.29 € | — | Barbora |
| Loyd puuviljatee ananassi pirni 20x2g | Tea & cocoa | — | — | 2.75 € | Coop |
| Loyd Taime ingveri ja mee puuv sidruni tee 20x2g | Tea & cocoa | — | — | 2.75 € | Coop |
| Mokate Lah matcha latte classic teejook 6x14g | Tea & cocoa | — | — | 2.99 € | Selver |
| Mokate Lahustuv kakaojook milky 10x18g | Tea & cocoa | — | — | 2.79 € | Coop + Selver |
| Nesquik Lahustuv jook maasika 350g | Tea & cocoa | 4.89 € | — | 4.89 € (3.59 € Partner) | Barbora + Selver |
| Nesquik Lahustuv kakaojook 150g | Tea & cocoa | 2.59 € | — | 2.29 € | Selver |
| Nesquik Lahustuv kakaojook 300g | Tea & cocoa | 3.89 € | — | 4.19 € | Coop |
| Põhjala teetalu Marjatee mündine must sõst 10x2.5g | Tea & cocoa | — | — | 6.25 € | Coop + Selver |
| Põhjala teetalu Marjatee mündine vaarikas 10x2.5g | Tea & cocoa | — | — | 7.27 € | Selver |
| Põhjala teetalu Põhjala kummel tee mahe 16x0.8g | Tea & cocoa | — | — | 5.23 € | Selver |
| Põhjala teetalu Taimetee piparmünt mahe 10x1g | Tea & cocoa | — | — | 4.22 € | Coop |
| Shan wai shan Matcha tee 80g | Tea & cocoa | — | — | 6.39 € | Selver |
| Teekanne Hispaania apelsinitee niidiga 20x2.5g | Tea & cocoa | — | — | 2.95 € (2.49 € Partner) | Selver |
| Teekanne immun aktiv c tsin vit tsingiga 18x1.8g | Tea & cocoa | — | — | 3.79 € | Selver |
| Teekanne Kummelitee 20x1.5g | Tea & cocoa | 2.89 € (2.09 € Aitäh) | — | 2.89 € | Barbora + Selver |
| Teekanne Melissitee 20x2g | Tea & cocoa | 2.89 € (2.09 € Aitäh) | — | 2.89 € | Barbora + Coop + Selver |
| Teekanne Piparmünditee 20x2.25g | Tea & cocoa | 2.89 € (2.09 € Aitäh) | — | 2.89 € | Barbora + Selver |
| Teekanne Puuviljatee sweet kiss 20x2.25g | Tea & cocoa | — | — | 2.99 € | Selver |
| Teekanne stomach smoother tee niidiga 20x2g | Tea & cocoa | — | — | 2.95 € | Selver |
| Teekanne tee ingveri apelsini r niidiga 20x1.75g | Tea & cocoa | — | — | 2.99 € | Coop + Selver |
| Teekanne Tee ingveri sidruni niidiga 20x1.75g | Tea & cocoa | — | — | 2.89 € | Selver |
| Teekanne Tee rootsi mustika niidiga 20x2.25g | Tea & cocoa | — | — | 2.95 € (2.49 € Partner) | Selver |
| Teekanne vahemere virsiku tee niidiga 20x2.5g | Tea & cocoa | — | — | 2.95 € (2.49 € Partner) | Selver |
| Twinings earl grey must tee 100g | Tea & cocoa | — | 6.39 € | — | Coop |
| Twinings Must tee lady grey 100g | Tea & cocoa | 6.39 € | 6.39 € | — | Barbora + Rimi |
| Twinings Roheline purutee gunpowder 100g | Tea & cocoa | 6.39 € | — | 6.39 € | Barbora + Selver |
| 19 crimes cabernet sauvignon 750ml | Wine | — | 14.19 € | 14.29 € | Rimi |
| Amorale Pv primitivo puglia 18 750ml | Wine | — | — | 14.49 € | Coop |
| Amorale Pv puglia rosso 750ml | Wine | — | — | 11.49 € | Coop |
| Amorale tre uva bianco 750ml | Wine | 11.49 € | — | 11.49 € | Coop |
| Anterra pinot grigio 750ml | Wine | 10.99 € | — | 10.49 € | Selver |
| Anterra pinot noir 750ml | Wine | 10.99 € | — | 10.49 € | Selver |
| Arom leedri õuna puuviljavein 750ml | Wine | — | — | 6.65 € | Coop + Selver |
| Arom puuviljavein kirss 750ml | Wine | — | — | 6.65 € | Coop + Selver |
| Arom puuviljavein must sõstar 750ml | Wine | — | — | 6.65 € | Coop + Selver |
| Asio otus Pv cabernet merlot shiraz 750ml | Wine | — | — | 10.29 € | Selver |
| Baron rosen Pv vino tinto medium sweet tetra 1000ml | Wine | — | — | 6.89 € | Selver |
| Baron rosen riesling 750ml | Wine | 8.99 € | — | 8.35 € | Selver |
| Baron rosen Rv vino rose medium sweet tetra 1000ml | Wine | — | — | 6.89 € | Selver |
| Baron rosen vino blanco medium sweet tetra 1000ml | Wine | — | — | 6.89 € | Selver |
| Barone montalto passivento bianco 750ml | Wine | — | — | 12.99 € | Selver |
| Barone montalto pinot grigio 3000ml | Wine | 22.99 € | — | 28.99 € | Barbora |
| Barone montalto pinot grigio 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Barone montalto Pv passivento rosso 750ml | Wine | — | — | 12.99 € | Selver |
| Barone montalto Pv passivento rosso bib 3000ml | Wine | — | — | 32.99 € | Coop |
| Big game malbec 750ml | Wine | 12.99 € | 12.85 € | 12.85 € | Rimi + Selver |
| Blue nun original 750ml | Wine | — | 8.69 € | 8.69 € | Coop |
| Blue nun riesling rheinhessen 750ml | Wine | — | 10.99 € | 10.49 € | Selver |
| Bollino bianco sweet 750ml | Wine | — | — | 4.99 € | Selver |
| Bollino Pv rosso sweet 750ml | Wine | — | — | 5.79 € | Coop |
| Ca perla Ca blanc de blancs mahe 750ml | Wine | — | — | 7.99 € | Coop + Selver |
| Cabaret Cava brut 750ml | Wine | — | — | 11.35 € | Coop |
| Cafe estoril vinho verde 750ml | Wine | 10.49 € | — | 9.59 € | Coop |
| Calecara fiano puglia 750ml | Wine | — | — | 11.99 € | Coop |
| Campo viejo reserva 750ml | Wine | 16.49 € | — | 16.59 € | Barbora |
| Campo viejo tempranillo 750ml | Wine | 13.49 € | — | 11.99 € | Selver |
| Casa charlize floreale pinot grigio 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Casa charlize pinot grigio terre bib sicil 3000ml | Wine | — | — | 27.79 € | Coop |
| Casa charlize pinot grigio terre siciliane 750ml | Wine | — | — | 9.99 € | Coop |
| Casa charlize prosecco brut 750ml | Wine | — | 10.99 € | 10.99 € | Rimi + Selver |
| Casa charlize Pv passonata primitivo 750ml | Wine | — | — | 12.59 € | Coop |
| Casa charlize Pv passonata puglia 750ml | Wine | — | — | 12.59 € | Coop |
| Casa charlize Pv primitivo puglia 750ml | Wine | — | — | 9.99 € | Coop |
| Casa charlize Rv floreale pinot grigio blush 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Casa charlize Vahuvein blanc de blancs brut 750ml | Wine | — | — | 8.99 € | Coop |
| Casa solis chardonnay 750ml | Wine | 8.99 € | — | — | Coop |
| Casal garcia rose vinho verde 750ml | Wine | — | 10.25 € | 9.99 € | Selver |
| Casal garcia vinho verde branco 750ml | Wine | — | — | 7.99 € | Selver |
| Cava clos amador Cava brut delicat reser 750ml | Wine | — | — | 12.90 € | Coop |
| Champagne brut imperial karbis chandon moet 750ml | Wine | — | — | 61.99 € | Selver |
| Chateau le mayne Pv bordeaux superieur 750ml | Wine | — | — | 11.75 € | Coop |
| Chill out chenin blanc 1500ml | Wine | 14.99 € | 15.09 € | 15.90 € | Coop |
| Chill out Pv cabernet sauvignon bib 3000ml | Wine | — | — | 24.99 € | Coop |
| Cinzano Vahuvein sweet edition dolce 750ml | Wine | — | 9.99 € | 9.99 € | Coop + Rimi + Selver |
| Cocoon zinfandel 13.5% 750ml | Wine | — | 13.55 € | 13.59 € | Rimi |
| Codici primitivo puglia 750ml | Wine | 10.99 € | — | 10.99 € | Barbora + Selver |
| Cono sur Pv pinot noir bicicleta 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Cono sur riesling bicicleta 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Cono sur Rv bicicleta pinot noir rose 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Contarini Vahuvein blanc de blancs dry extra 750ml | Wine | — | — | 6.99 € | Selver |
| Cremant paul g valentin de limoux brut nr 88 750ml | Wine | — | — | 15.99 € | Selver |
| Despassino Rv vinho verde rose 750ml | Wine | — | — | 7.79 € | Coop |
| Despassino vinho verde branco 750ml | Wine | — | — | 7.79 € | Coop |
| Devils rock riesling 750ml | Wine | 10.49 € | — | 10.15 € | Selver |
| Diablo dark red 750ml | Wine | 16.49 € | — | 12.99 € | Selver |
| Dolce cioccolato bianco 750ml | Wine | — | — | 7.89 € | Coop |
| Dolce cioccolato Pv rosso 750ml | Wine | — | — | 7.89 € | Coop |
| Doppio passo pinot grigio 750ml | Wine | 7.99 € | 10.55 € | — | Barbora |
| Doppio passo primitivo 750ml | Wine | — | 10.55 € | 11.89 € | Rimi |
| Dreamer late harvest chardonnay 750ml | Wine | — | — | 7.99 € | Coop + Selver |
| Dreamer late harvest rose 750ml | Wine | 7.99 € | — | 7.99 € | Barbora + Selver |
| Dreamer Pv sweet red 1000ml | Wine | — | — | 7.99 € | Coop |
| Dreamer Rv sweet rose 1000ml | Wine | — | — | 7.99 € | Coop |
| Dreamer sweet white 1000ml | Wine | — | — | 7.99 € | Coop |
| Dulong Cremant de bordeaux brut 750ml | Wine | — | — | 13.99 € | Selver |
| El cortez xo 750ml | Wine | 12.99 € | — | 11.90 € | Selver |
| El coto blanco rioja 750ml | Wine | 11.49 € | — | 11.49 € | Barbora + Selver |
| El coto crianza 750ml | Wine | 13.99 € | 13.79 € | 13.80 € | Rimi |
| Emporium Pv primitivo di manduria 750ml | Wine | — | — | 13.09 € | Coop |
| Franz hoffner riesling 750ml | Wine | 9.49 € | — | 8.93 € | Coop |
| Franz hoffner riesling bib 3000ml | Wine | 25.99 € | — | 25.92 € | Coop |
| Franz hoffner weisswein 750ml | Wine | 8.99 € | — | 7.99 € | Coop |
| Freixenet Cava carta nevada seco semi 750ml | Wine | — | — | 10.87 € | Coop |
| Freixenet Prosecco dry extra 750ml | Wine | — | — | 14.99 € | Selver |
| Frontera chardonnay 750ml | Wine | 6.19 € | 7.99 € | — | Barbora |
| Frontera sauvignon blanc 750ml | Wine | 6.19 € | 7.99 € | — | Barbora |
| Gaseeritud rabarber mull puuviljavein 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Gato negro chardonnay 750ml | Wine | 8.65 € | — | 7.99 € | Selver |
| Goru 750ml | Wine | 12.49 € | 12.49 € | — | Barbora + Rimi |
| Gran castillo barcelona sauvignon blanc 750ml | Wine | — | — | 8.99 € | Coop + Selver |
| Gran castillo Pv cabernet medium sauvig sweet 750ml | Wine | — | — | 8.99 € | Coop |
| Gran castillo Rv ibiza bobal rose moscato 750ml | Wine | — | — | 8.99 € | Coop + Selver |
| Gran castillo tempranillo rose 750ml | Wine | — | 9.59 € | 8.99 € | Selver |
| Gran castillo viura chardonnay 11% 3000ml | Wine | — | 22.99 € | 22.75 € | Selver |
| Gran castillo viura chardonnay 750ml | Wine | — | 9.59 € | 8.99 € | Coop |
| Gran mirador dark blend 750ml | Wine | 7.49 € | — | 9.99 € | Barbora |
| Gran mirador red blend 750ml | Wine | 7.49 € | — | 9.99 € | Barbora |
| Gratien&meyer Cremant brut de loire 750ml | Wine | — | — | 12.69 € | Coop |
| Hardys bin colombard chard 750ml | Wine | — | 6.49 € | 7.99 € | Rimi |
| Hardys chardonnay main road 750ml | Wine | — | — | 7.39 € | Selver |
| Hardys Pv shiraz main road 750ml | Wine | — | — | 7.39 € | Selver |
| Henri ehrhart alsace pinot blanc 750ml | Wine | — | — | 10.39 € | Coop |
| Henri ehrhart alsace riesling 750ml | Wine | — | — | 11.45 € | Coop |
| Il capolavoro bianco 750ml | Wine | 7.99 € | — | 7.99 € | Barbora + Selver |
| Italo cescon pinot grigio 750ml | Wine | 16.29 € | 16.99 € | — | Barbora |
| Italo cescon raboso 750ml | Wine | 16.29 € | — | 15.99 € | Selver |
| J.p.chenet medium sweet 750ml | Wine | — | — | 7.99 € | Coop |
| Jacob's creek pinot grigio 750ml | Wine | 13.29 € | — | 12.59 € | Selver |
| Jacob's creek pinot noir 750ml | Wine | 13.29 € | — | 12.59 € | Selver |
| Jacob's creek riesling 750ml | Wine | — | 13.29 € | 12.59 € | Selver |
| Jacob's creek shiraz cabernet 750ml | Wine | — | 13.29 € | 12.59 € | Selver |
| Janela branca vinho verde 750ml | Wine | — | — | 8.89 € | Coop |
| Jaume serra Cava brut 750ml | Wine | — | 10.99 € | 10.89 € | Selver |
| Jaume serra Cava semi seco 750ml | Wine | — | — | 10.69 € | Selver |
| Johann brunner gewürztraminer prestige 750ml | Wine | — | — | 8.55 € | Coop |
| Johann brunner riesling mosel 750ml | Wine | — | — | 8.59 € | Coop |
| Johann brunner riesling rheinhessen 750ml | Wine | — | — | 7.79 € | Selver |
| Johann brunner Rv rose dornfelder 750ml | Wine | — | — | 7.79 € | Coop |
| Johann brunner weisswein lieblich 750ml | Wine | — | — | 6.96 € | Coop |
| Karu cabernet sauvignon 750ml | Wine | 9.15 € | — | 8.99 € | Coop + Selver |
| Karu chardonnay 750ml | Wine | 9.15 € | — | 8.99 € | Coop + Selver |
| Kendermanns riesling 187ml | Wine | — | — | 3.99 € | Coop |
| Königsmosel riesling 750ml | Wine | — | — | 9.15 € | Coop |
| Kwv classic pinotage 750ml | Wine | 11.39 € | — | 10.75 € | Selver |
| La piqueta Pv cabernet sauvignon 750ml | Wine | — | — | 8.39 € | Selver |
| La piqueta sauvignon blanc 750ml | Wine | — | — | 8.39 € | Selver |
| Lago sagrado Pv lisboa tinto 750ml | Wine | — | — | 10.99 € | Coop + Selver |
| Laroche chardonnay reserve 750ml | Wine | — | 13.99 € | 16.25 € | Rimi |
| Le grand noir cabernet syrah 187ml | Wine | — | 3.19 € | 3.15 € | Selver |
| Le grand noir Pv cabernet shiraz 750ml | Wine | — | — | 10.79 € | Selver |
| Le grand noir sauvignon blanc 187ml | Wine | — | 3.19 € | 3.15 € | Selver |
| Le grand noir sauvignon blanc 750ml | Wine | — | 10.49 € | 10.79 € | Rimi |
| Litoral blanco tetra 1000ml | Wine | — | — | 6.39 € | Coop |
| Luciente semi sweet blanco 750ml | Wine | 6.19 € | — | — | Barbora + Coop |
| Maison castel Pv cotes du rhone 750ml | Wine | — | — | 12.99 € | Coop |
| Maison castel Rv rose d anjou 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Maori bay blanc sauvignon 750ml | Wine | — | — | 8.49 € | Coop |
| Maori bay chardonnay 750ml | Wine | — | — | 9.99 € | Coop |
| Maori bay chardonnay semillion 750ml | Wine | — | — | 8.49 € | Coop |
| Maori bay pinot grigio 12% 2000ml | Wine | 15.99 € | 25.75 € | — | Barbora |
| Maori bay pinot grigio 750ml | Wine | 6.49 € | 6.49 € | — | Barbora + Rimi |
| Maori bay sauvignon blanc 750ml | Wine | — | — | 9.99 € | Selver |
| Maori bay shiraz 750ml | Wine | 6.49 € | 6.49 € | 8.49 € | Barbora + Rimi |
| Maori bay shiraz rose 750ml | Wine | 9.49 € | — | 9.49 € | Coop |
| Maori moana sauvignon blanc 750ml | Wine | — | — | 11.99 € | Coop |
| Marques de riscal rueda verdejo 750ml | Wine | — | — | 13.99 € | Coop |
| Martini asti vahuvein 7.5% 200ml | Wine | 5.15 € | — | 5.19 € | Barbora |
| Martini asti Vahuvein 750ml | Wine | — | — | 12.99 € | Coop + Selver |
| Martini Prosecco 750ml | Wine | — | — | 12.99 € | Selver |
| Martini vahuvein prosecco 750ml | Wine | 11.99 € | 9.99 € | — | Rimi |
| Martini Vermut bianco 15% 1000ml | Wine | 14.99 € | 14.95 € | — | Rimi |
| Martini Vermut bianco 15% 750ml | Wine | 14.45 € | 14.49 € | — | Barbora |
| Martini Vermut fiero 15% 1000ml | Wine | 17.55 € | 17.49 € | — | Rimi |
| Martini Vermut rosso 15% 1000ml | Wine | 17.55 € | 17.39 € | — | Rimi |
| Maschio Prosecco extra dry treviso 200ml | Wine | — | — | 4.75 € | Coop |
| Maschio Prosecco extra dry treviso 750ml | Wine | — | — | 11.19 € | Selver |
| Masi masianco 750ml | Wine | 17.59 € | 17.59 € | 16.99 € | Selver |
| Masso antico Pv primitivo salento 750ml | Wine | — | — | 11.39 € | Selver |
| Mateus rose 250ml | Wine | — | 4.59 € | 4.69 € | Rimi |
| Mateus rose 750ml | Wine | — | 11.29 € | 11.39 € | Rimi |
| Minuty m 750ml | Wine | 25.65 € | — | 24.09 € | Selver |
| Mionetto Prosecco treviso brut 200ml | Wine | — | 3.95 € | 4.29 € | Rimi |
| Mionetto Prosecco treviso brut 750ml | Wine | — | — | 11.17 € | Coop |
| Monte cristo Pv red sweet 750ml | Wine | — | — | 5.89 € | Coop |
| Monte cristo Rv rose sweet 750ml | Wine | — | — | 5.89 € | Coop |
| Monte cristo white sweet 750ml | Wine | — | — | 5.89 € | Coop |
| Moselland riesling kabinett 750ml | Wine | — | 9.59 € | 9.99 € | Rimi |
| Mucho mas Pv red bib 3000ml | Wine | — | — | 32.99 € | Coop |
| Mucho mas red 13.5% 750ml | Wine | 10.99 € | 6.99 € | — | Rimi |
| Mucho mas white 750ml | Wine | 10.99 € | 6.99 € | — | Rimi |
| Mucho mas white bib 3000ml | Wine | — | — | 32.99 € | Coop |
| Murviedro crianza 750ml | Wine | 6.49 € | 9.05 € | 8.59 € | Barbora |
| Murviedro reserva 750ml | Wine | 7.49 € | 9.45 € | 9.59 € | Barbora |
| Nerone Pv negroamaro primitivo bib 13% 3000ml | Wine | — | — | 27.25 € | Coop |
| Old gruzia kindzmarauli 750ml | Wine | 11.59 € | — | 11.49 € | Selver |
| Old tbilisi alazani white semi sweet 750ml | Wine | — | — | 9.79 € | Coop |
| Old tbilisi kindzmarauli 750ml | Wine | 13.99 € | — | 13.99 € | Barbora + Selver |
| Old tbilisi Pv alazani red semi sweet 750ml | Wine | — | — | 9.79 € | Coop |
| Pasqua pinot grigio 750ml | Wine | — | — | 9.99 € | Coop |
| Paul g valentin de limoux rose 69 750ml | Wine | — | — | 15.99 € | Selver |
| Penasol Rv rosado 1000ml | Wine | — | — | 6.69 € | Coop + Selver |
| Piqueras sauvignon verdejo bib mahe 3000ml | Wine | — | — | 26.79 € | Coop |
| Pv cabernet sauvignon b g reserve 750ml | Wine | — | — | 9.99 € | Coop |
| Pv de bor chateau cot fontarabiebl 750ml | Wine | — | — | 11.59 € | Coop |
| Rare vinho verde 750ml | Wine | — | — | 9.39 € | Coop |
| Ricossa gavi 750ml | Wine | — | — | 15.05 € | Coop |
| Roberts canyon Pv california zinfandel 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Robertson cabernet sauvignon 750ml | Wine | — | 9.39 € | 8.89 € | Selver |
| Robertson sauvignon blanc 750ml | Wine | — | 9.39 € | 8.89 € | Selver |
| Rv mini mi rose igp mediterrannee 750ml | Wine | — | — | 13.19 € | Coop |
| Rv rose d anjou b g 750ml | Wine | — | — | 9.99 € | Coop + Selver |
| Sära Vahuvein moijto mulliga 750ml | Wine | — | — | 6.19 € | Coop |
| Savanha medium sweet 750ml | Wine | — | 8.29 € | 8.49 € | Rimi |
| Savanha pinotage shiraz 750ml | Wine | 8.69 € | 8.29 € | — | Rimi |
| Savanha Pv pinotage shiraz 750ml | Wine | — | — | 8.49 € | Selver |
| Serena pinot grigio veneto 750ml | Wine | — | — | 8.59 € | Coop |
| Serena Pv cabernet veneto sauvignon 750ml | Wine | — | — | 8.59 € | Coop |
| Serena sauvignon veneto blanc 750ml | Wine | — | — | 8.59 € | Coop |
| Silk and spice Pv red blend 750ml | Wine | — | — | 12.95 € | Coop |
| Silverboom chardonnay 750ml | Wine | 9.49 € | — | 9.75 € | Barbora |
| Silverboom shiraz merlot 750ml | Wine | 9.49 € | — | 9.75 € | Barbora |
| Soleil des alpes Rv rose provence 750ml | Wine | — | — | 13.49 € | Selver |
| Sovetskoje Vahuvein polusladkoje 750ml | Wine | — | — | 5.89 € | Coop |
| Sovetskoje Vahuvein sladkoje 750ml | Wine | — | — | 4.35 € | Coop |
| Stony ocean sauvignon blanc marlborough 750ml | Wine | — | 8.15 € | 10.99 € | Rimi |
| Tamada pirosmani red 750ml | Wine | 9.49 € | — | 9.99 € | Barbora |
| Tamada pirosmani white 750ml | Wine | 9.49 € | — | 9.99 € | Barbora |
| Tarapaca sauvignon blanc 750ml | Wine | 10.99 € | — | 10.59 € | Selver |
| Teliani valley alazani white 750ml | Wine | — | — | 9.49 € | Coop |
| Teliani valley Pv alazani red 750ml | Wine | — | — | 9.49 € | Coop |
| Teliani valley saperavi 750ml | Wine | 10.89 € | — | 10.49 € | Selver |
| Terre collina pinot grigio 750ml | Wine | — | — | 6.99 € | Selver |
| Terre collina Pv primitivo puglia 750ml | Wine | — | — | 9.35 € | Coop |
| Think big zinfandel 750ml | Wine | 10.59 € | — | 11.25 € | Barbora |
| Tommasi le fornaci lugana 750ml | Wine | — | — | 17.09 € | Coop |
| Tommasi le rosse pinot grigio 750ml | Wine | — | — | 16.05 € | Coop |
| Tommasi Pv valpolicella 750ml | Wine | — | — | 16.09 € | Coop |
| Törley Vahuvein charmant doux 750ml | Wine | — | 6.89 € | 6.45 € | Selver |
| Törley Vahuvein charmant rose 750ml | Wine | 6.79 € | 6.89 € | — | Barbora |
| Törley Vahuvein gala sec 12% 750ml | Wine | — | 6.89 € | — | Rimi |
| Törley Vahuvein muscateller doux 750ml | Wine | — | 5.99 € | 6.89 € | Rimi |
| Törley Vahuvein talisman 11% 750ml | Wine | 6.79 € | 6.89 € | — | Barbora |
| Torres sangre de toro 750ml | Wine | 12.49 € | — | 9.99 € | Selver |
| Uone Pv primitivo di manduria 750ml | Wine | — | — | 12.99 € | Selver |
| Ventisquero blanc res sauv 750ml | Wine | — | — | 10.19 € | Coop |
| Ventisquero Pv pinot noir reserva 750ml | Wine | — | — | 9.95 € | Coop |
| Ventisquero reserva chardonnay 750ml | Wine | — | — | 10.19 € | Coop |
| Veuve clicquot Champagne brut karbis 750ml | Wine | — | — | 59.99 € | Selver |
| Villa maria sauvignon blanc marlborough 750ml | Wine | — | — | 16.99 € | Coop + Selver |
| Vv crafted collection riesling 750ml | Wine | — | — | 9.49 € | Coop |
| Vv crafted collection riesling gewürztraminer 750ml | Wine | — | — | 9.49 € | Coop |
| Wallbreck Cremant de loire brut 750ml | Wine | — | — | 13.39 € | Coop |
| Wõlu Gas kollane ploom puuviljavein tud 750ml | Wine | — | — | 6.68 € | Coop |
| Wõlu Gas maasikas puuviljavein tud 750ml | Wine | — | — | 6.68 € | Coop |
| Wõlu Gas rabarber puuviljavein tud 750ml | Wine | — | — | 6.68 € | Coop |
| Wõlu Gas tikker puuviljavein tud 750ml | Wine | — | — | 6.68 € | Coop |
| Zensa pinot grigio mahe 750ml | Wine | — | — | 12.55 € | Coop |
| Zensa Pv primitivo pugla mahe 750ml | Wine | — | — | 12.55 € | Coop |
| Zibomare zibibbo terre siciliane 750ml | Wine | — | — | 11.09 € | Coop |
| Zonin Prosecco cuvee 750ml | Wine | — | — | 11.15 € | Selver |
| Zonin vahuvein prosecco cuvee 200ml | Wine | 4.75 € | 4.89 € | — | Barbora |
| Eesti pagar Eesti nisutortilja klassikalises 6 360g | World cuisine | — | — | 2.89 € | Coop |
| Eesti pagar Täisteratortilja 25 360g | World cuisine | — | — | 2.99 € | Coop + Selver |
| Japanese choice Sushi ingver roosa vaakumpak 200g | World cuisine | — | — | 1.39 € | Coop + Selver |
| Japanese-choice Sushi nori lehed 14g | World cuisine | 2.89 € | — | 2.89 € | Coop |
| Kara Kookoskreem 17% 200ml | World cuisine | — | — | 1.39 € | Selver |
| Old el paso Tortilja gluteenivaba 216g | World cuisine | — | — | 2.95 € | Selver |
| Pearl river bridge Pearl wasabi pasta 43g | World cuisine | — | — | 2.53 € (2.39 € Partner) | Selver |
| Santa maria Klaasnuudlid 100g | World cuisine | 3.35 € | 3.38 € | — | Barbora |
| Santa maria Kookosjook 250ml | World cuisine | 1.89 € | 2.79 € | 2.75 € | Barbora + Coop |
| Santa maria Kookosjook väherasvane 250ml | World cuisine | — | — | 1.99 € | Selver |
| Santa maria Kookoskreem 250ml | World cuisine | 3.59 € | 3.65 € | 3.59 € (2.69 € Partner) | Barbora + Selver |
| Santa maria Munanuudlid 250g | World cuisine | 1.49 € | 1.49 € | 1.59 € | Barbora + Rimi |
| Santa maria Nisutortilja 20 320g | World cuisine | — | — | 3.39 € | Coop |
| Santa maria Nisutortilja suur 25 371g | World cuisine | — | — | 3.99 € | Coop |
| Santa maria Nisutortilja väike 15 200g | World cuisine | — | — | 2.25 € | Coop + Selver |
| Santa maria Punane karripasta 110g | World cuisine | 4.25 € | 4.25 € | — | Barbora + Rimi |
| Santa maria Ramen nuudlid 200g | World cuisine | 3.49 € | 3.49 € | 3.49 € (2.59 € Partner) | Barbora + Coop + Rimi + Selver |
| Santa maria Riisinuudlid 180g | World cuisine | 3.05 € | 3.15 € | 2.89 € | Selver |
| Santa maria Santa maisi ja nisutortilja 20 336g | World cuisine | — | — | 3.39 € | Coop + Selver |
| Santa maria Täisteratortilja 20 320g | World cuisine | — | — | 3.39 € | Coop + Selver |
| Thai choice Kookoskreem 400ml | World cuisine | 2.99 € | 3.09 € | 2.99 € (2.49 € Partner) | Barbora + Selver |
| Thai choice Kookoskreem kreemjas 400ml | World cuisine | — | — | 3.29 € | Coop |
| Thai choice Kookoskreem väherasvane 400ml | World cuisine | 2.55 € | — | 2.53 € | Coop |
| Thai choice Munanuudlid 200g | World cuisine | 2.05 € | — | 1.79 € | Selver |
| Thai choice Oanuudlid 200g | World cuisine | 4.99 € | 3.99 € | — | Rimi |
| Thai choice Punane karripasta 110g | World cuisine | 3.05 € | 3.29 € | 3.04 € | Selver |
| Thai choice Riisi niitnuudlid 200g | World cuisine | 2.25 € | — | 2.25 € | Barbora + Selver |
| Thai choice Riisipaber 100g | World cuisine | 2.59 € | — | 2.59 € | Barbora + Coop + Selver |
| Thai choice Tai riisinuudlid 454g | World cuisine | 4.35 € | 3.95 € | 4.06 € | Rimi |

Card prices shown in parentheses are informational only — never used to decide the Cheapest column.

## 2. Ambiguous — needs a person to pick

| Category | Items in the group |
|---|---|
| Fruits & vegetables | Barbora "Kartul varajane lahtine kg" (0.49 €); Barbora "Kartul varajane pakitud, kg" (0.99 €); Selver "Kartul pesemata, kg" (0.37 €) |
| Fruits & vegetables | Barbora "Porgand lahtine,kg" (0.45 €); Coop "Porgand kg" (0.49 €); Rimi "Porgand pestud, kg Eesti" (0.50 €); Selver "Porgand pestud, kg" (0.45 €) |
| Fruits & vegetables | Barbora "Arbuus, kg" (0.99 €); Coop "Arbuus seemneteta kg" (1.99 €); Coop "Arbuus kg" (0.79 €); Rimi "Arbuus Eesti kg" (5.99 €); Rimi "Arbuus kg" (0.99 €); Selver "Arbuus, kg" (1.59 €); Selver "Arbuus seemneteta, kg" (1.99 €) |
| Fruits & vegetables | Barbora "Kurk lühike, kg" (2.49 €); Coop "Kurk kiles kg" (6.99 €); Coop "Kurk lühike kg" (2.49 €); Rimi "Kurk lühike kg" (2.59 €); Selver "Kurk poolpikk, kg" (5.59 €) |
| Fruits & vegetables | Coop "Guacamole 200g" (3.99 €); Selver "Guacamole, PALTAVO, 200 g" (4.06 €); Coop "Mangopüree Paltavo 200g" (3.99 €) |
| Fruits & vegetables | Coop "Hiinakapsa Krimchi 400g" (9.99 €); Selver "Hiinakapsa Kimchi, KRIMCHI, 400 g" (9.99 €); Selver "Eriti Vürtsikas Peakapsa Kimchi, KRIMCHI, 400 g" (9.99 €); Selver "Eriti Vürtsikas Hiinakapsa Kimchi, KRIMCHI, 400 g" (9.99 €); Selver "Peakapsa Kimchi, KRIMCHI, 400 g" (9.99 €) |
| Fruits & vegetables | Coop "Salatisegu Grill Mix Fit&Easy 150g" (1.89 €); Coop "Salatisegu Family Fit&Easy 150g" (1.89 €); Coop "Salatisegu Gourmet Fit&Easy 150g" (1.89 €); Coop "Salatisegu Green&Red Fit&Easy 150g" (1.89 €); Rimi "Salatisegu Fit & Easy ,,Gourmet“ 150g" (1.89 €) |
| Fruits & vegetables | Coop "Mugulsibul 1kg võrgus" (3.39 €); Coop "Mugulsibul 1kg võrgus" (0.99 €); Selver "Mugulsibul pakitud võrgus, 1 kg" (1.49 €) |
| Fruits & vegetables | Rimi "Roheline sibul pakitud 100g" (1.89 €); Selver "Roheline sibul, 100 g" (2.29 €); Selver "Roheline sibul, 100 g" (2.29 €) |
| Bread | Barbora "Rustikaalne Meeleib EESTI PAGAR 500g" (1.79 €); Coop "Meeleib 500g Eesti Pagar" (1.59 €); Rimi "Meeleib Eesti Pagar 500g" (1.39 €) |
| Bread | Barbora "Täistera röstsepik EESTI PAGAR,500g" (1.55 €); Coop "Tosta Täistera röstsepik 500g Eesti Pagar" (1.59 €); Rimi "Röstsepik täistera Tosta Eesti Pagar 500g" (1.19 €) |
| Drinks | Coop "Coca-Cola karb-tud karastusjook.1.5L" (2.25 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 1,5 L" (2.29 €); Barbora "Karastusjook COCA-COLA 1.5L*2tk" (3.59 €); Barbora "Karastusjook COCA-COLA 1.5L" (2.25 €); Rimi "Karastusjook Coca-Cola 1,5l" (2.25 €) |
| Drinks | Barbora "Karastusjook COCA-COLA Zero 1.5L*2tk" (3.59 €); Barbora "Karastusjook COCA-COLA Zero 1.5L" (2.29 €); Rimi "Karastusjook Coca-Cola Zero 1,5l" (2.25 €) |
| Drinks | Coop "Karb-tud karastusjook Coca Cola 0.33L prk" (1.19 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 330 ml" (1.21 €); Barbora "Karastusjook COCA-COLA 330ml" (1.21 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 330 ml" (1.29 €) |
| Drinks | Barbora "Kali Karl Friedrich 500ml" (0.96 €); Barbora "Kali KARL Friedrich 500ml" (1.09 €); Rimi "Kali Karl Friedrich 0,5l" (0.95 €); Rimi "Kali Karl Friedrich 0,5l" (1.09 €) |
| Meat | Coop "Kodune hakkliha Rakvere 400g jahutatud" (3.65 €); Selver "Kodune hakkliha, RAKVERE LK, 400 g" (3.55 €); Barbora "Kodune hakkliha RAKVERE,600g" (6.99 €); Rimi "Hakkliha kodune Rakvere 400g" (3.59 €); Selver "Kodune hakkliha, RAKVERE LK, 600 g" (6.99 €) |
| Meat | Rimi "Sea kaelakarbonaad Rakvere kg" (8.49 €); Selver "Sea kaelakarbonaad, RAKVERE LK, kg" (5.99 €); Selver "Sea kaelakarbonaad, RAKVERE LK, kg" (10.15 €) |
| Rice & grains | Coop "Riis pikateraline Bosto 4*125g" (2.25 €); Selver "Pikateraline riis 4 x 125 g, BOSTO, 500 g" (2.25 €); Barbora "Pikateraline riis BOSTO 4x125g" (2.09 €); Barbora "Pikateraline riis BOSTO 4x125g" (2.09 €); Rimi "Pikateraline riis Bosto 4x125g" (2.09 €) |
| Rice & grains | Coop "Riis pikateraline pruun Bosto 4*125g" (2.25 €); Selver "Pruun riis 4 x 125 g, BOSTO, 500 g" (2.25 €); Barbora "Pikateraline pruun riis BOSTO 4x125g" (2.25 €); Barbora "Pikateraline pruun riis BOSTO 4x125g" (2.25 €); Rimi "Pruun riis Bosto 4x125g" (1.99 €) |
| Rice & grains | Coop "Basmati riis Bosto 4*125g" (3.75 €); Selver "Basmati riis 4 x 125 g, BOSTO, 500 g" (2.89 €); Barbora "Basmati riis BOSTO 4x125g" (3.79 €); Barbora "Basmati riis BOSTO 4x125g" (3.79 €); Rimi "Basmati riis Bosto 4x125g" (3.29 €) |
| Rice & grains | Coop "Riis pikateraline Baltix 4*100g" (1.39 €); Selver "Pikateraline riis, BALTIX, 400 g" (1.34 €); Barbora "Pikateraline riis BALTIX 4x100g" (1.34 €); Barbora "Pikateraline riis BALTIX 4x100g" (1.34 €) |
| Rice & grains | Barbora "Aurutatud riis BALTIX 1kg" (2.39 €); Barbora "Aurutatud riis BALTIX 1kg" (2.39 €); Selver "Aurutatud riis, BALTIX, 1 kg" (2.49 €) |
| Rice & grains | Barbora "Pikateraline riis BALTIX 1kg" (2.12 €); Barbora "Pikateraline riis BALTIX 1kg" (2.12 €); Selver "Pikateraline riis, BALTIX, 1kg" (0.49 €); Selver "Pikateraline riis, BALTIX, 1 kg" (2.12 €) |
| Rice & grains | Barbora "Aurutatud riis BALTIX 4x100g" (1.39 €); Barbora "Aurutatud riis BALTIX 4x100g" (1.39 €); Coop "Riis aurutatud Baltix 4*100g" (1.65 €) |
| Rice & grains | Coop "Basmati riis Veski Mati 500g" (2.75 €); Selver "Basmati riis, VESKI MATI, 500 g" (2.69 €); Barbora "Basmati riis VESKI MATI 500g" (2.69 €); Barbora "Basmati riis VESKI MATI 500g" (2.69 €); Rimi "Riis basmati Veski Mati 500g" (2.75 €) |
| Rice & grains | Coop "Jasmiini riis Veski Mati 500g" (2.55 €); Selver "Jasmiiniriis, VESKI MATI, 500 g" (2.50 €); Barbora "Jasmiini riis VESKI MATI 500g" (2.45 €); Barbora "Jasmiini riis VESKI MATI 500g" (2.45 €) |
| Rice & grains | Coop "Tartu Mill Pikateraline riis 1kg" (2.75 €); Selver "Pikateraline riis, TARTU MILL, 1 kg" (2.53 €); Barbora "Pikateraline riis TARTU MILL1kg" (2.53 €); Barbora "Pikateraline riis TARTU MILL1kg" (2.53 €); Rimi "Riis pikateraline Tartu Mill 1kg" (2.75 €) |
| Rice & grains | Coop "Tartu Mill riis aurutatud 1kg" (2.99 €); Selver "Eelkeedetud sõmer riis, TARTU MILL, 1 kg" (2.92 €); Barbora "Aurutatud riis TARTU MILL 1kg" (2.92 €); Barbora "Aurutatud riis TARTU MILL 1kg" (2.92 €); Rimi "Riis aurutatud Tartu Mill 1kg" (2.99 €) |
| Rice & grains | Barbora "Aurutatud riis TARTU MILL 4x125g" (1.89 €); Barbora "Aurutatud riis TARTU MILL 4x125g" (1.89 €); Coop "Riis aurutatud Tartu Mill 4*125g" (1.75 €); Rimi "Riis aurutatud Tartu Mill 4x125g" (1.89 €) |
| Rice & grains | Barbora "Pikateraline riis TARTU MILL 4x 125g" (1.69 €); Barbora "Pikateraline riis TARTU MILL 4x 125g" (1.69 €); Coop "Riis pikateraline Tartu Mill 4*125g" (1.69 €) |
| Rice & grains | Barbora "Pudruriis TARTU MILL 1kg" (2.99 €); Barbora "Pudruriis TARTU MILL 1kg" (2.99 €); Coop "Tartu Mill Pudruriis 1kg" (2.99 €) |
| Rice & grains | Barbora "Basmati riis BALTIX 4x100g" (2.25 €); Barbora "Basmati riis BALTIX 4x100g" (2.25 €); Coop "Basmati riis Baltix 4*100g" (2.25 €) |
| Rice & grains | Barbora "Pudruriis BALTIX 4x100g" (1.79 €); Barbora "Pudruriis BALTIX 4x100g" (1.79 €); Coop "Pudruriis Baltix 4*100g" (1.79 €) |
| Rice & grains | Barbora "Riis Poke bowl BOSTO 500g" (3.65 €); Barbora "Riis Poke bowl BOSTO 500g" (3.65 €); Rimi "Riis Bosto Poke Bowl 500g" (3.69 €); Selver "Poke bowl riis, BOSTO, 500 g" (3.65 €) |
| Coffee | Barbora "Jahvatatud kohv Espresso LAVAZZA 250g" (9.99 €); Barbora "Jahvatatud kohv LAVAZZA Espresso 250g" (10.99 €); Rimi "Kohv jahvatatud Lavazza Espresso 250g" (9.99 €) |
| Tea & cocoa | Barbora "Must tee Earl Grey HYLEYS,100g" (2.35 €); Barbora "Must tee Earl Grey HYLEYS 100g" (5.69 €); Coop "Hyleys must tee Earl Grey 100g" (2.35 €) |
| Canned food | Barbora "Valged oad tomatikastmes BONDUELLE 430g" (2.09 €); Coop "Bonduelle valged oad tomatikastmes 430g" (2.39 €); Coop "Valged oad tomatikastmes Bonduelle 430g" (2.19 €) |
| Sausages | Coop "Keeduvorst Doktori Rakvere 600g" (3.49 €); Selver "Doktorivorst, RAKVERE LK, 600 g" (3.95 €); Barbora "Keeduvorst Doktori RAKVERE, 300g" (1.55 €); Barbora "Doktorivorst RAKVERE, 600g" (3.95 €); Rimi "Doktorivorst Rakvere 300g" (1.55 €); Rimi "Doktorivorst Rakvere 600g" (3.95 €); Selver "Keeduvorst Doktori, RAKVERE LK, 300 g" (2.02 €) |
| Sausages | Coop "Keeduvorst Juustuvorst Rakvere 600g" (4.49 €); Selver "Juustuvorst, RAKVERE LK, 600 g" (4.46 €); Barbora "Juustuvorst RAKVERE, 600g" (4.45 €); Rimi "Juustuvorst Rakvere 300g" (1.55 €); Rimi "Juustuvorst Rakvere 600g" (4.49 €) |
| Sausages | Coop "Keeduvorst Lastevorst Rakvere 600g" (3.69 €); Selver "Lastevorst, RAKVERE LK, 600 g" (3.85 €); Barbora "Lastevorst RAKVERE, 600g" (3.85 €); Rimi "Lastevorst Rakvere 600g" (3.69 €); Rimi "Lastevorst Rakvere 300g" (1.55 €) |
| Sausages | Coop "Keeduvorst Lastevorst Valla 240g viil" (1.15 €); Selver "Lastevorst, VALLA, 240 g" (1.15 €); Barbora "Lastevorst VALLA, 600g" (2.09 €); Rimi "Lastevorst Valla 1kg" (2.29 €); Rimi "Lastevorst Valla 240g" (0.92 €) |
| Sausages | Coop "Keeduvorst Lastevorst Maks&Moorits 300g" (1.09 €); Selver "Lastevorst, MAKS&MOORITS, 300 g" (1.05 €); Barbora "Lastevorst M&M,300g" (1.25 €); Barbora "Lastevorst M&M, 600g" (2.69 €); Selver "Lastevorst, MAKS&MOORITS, 600 g" (2.69 €) |
| Sausages | Coop "Pereviiner Rakvere 500g" (1.89 €); Selver "Pereviiner, RAKVERE LK, 500 g" (1.99 €); Barbora "Pereviiner RAKVERE, 500g" (2.29 €); Coop "Pereviiner Rakvere 900g" (3.99 €); Rimi "Pereviiner Rakvere 900g" (3.59 €); Rimi "Pereviiner Rakvere 500g" (1.99 €) |
| Sausages | Coop "Keedusalaami Vasalli Nõo 105g viil" (1.99 €); Selver "Keedusalaami Vasalli, NÕO, 105 g" (3.19 €); Barbora "Keedusalaami Vasalli NÕO, 250g" (4.99 €); Barbora "Keedusalaami Vasalli NÕO, 105 viil" (1.99 €) |
| Sausages | Coop "T/S vorst Pepperoni Oskar 210g" (4.59 €); Selver "Pepperoni täissuitsuvorst, OSKAR, 210 g" (4.89 €); Barbora "Täissuitsuvorst Pepperoni OSKAR, 210g" (4.89 €); Rimi "Täissuitsuvorst Pepperoni Oskar 210g" (4.89 €); Selver "Täissuitsuvorst Pepperoni, OSKAR, 80 g" (1.79 €) |
| Sausages | Coop "Palermo salaami Rakvere 110g viil" (2.39 €); Selver "Palermo salaami, RAKVERE, 110 g" (2.79 €); Barbora "Palermo salaami RAKVERE,200g" (3.39 €); Barbora "Salaami Palermo RAKVERE,110g viil" (2.69 €); Rimi "Salaami Palermo Rakvere 110g" (2.69 €); Rimi "Salaami Palermo Rakvere 200g" (3.45 €); Selver "Palermo salaami , RAKVERE LK, 200 g" (3.49 €) |
| Sausages | Barbora "Suitsuvorst Tamula WÕRO,350g" (2.39 €); Barbora "Suitsuvorst Tamula WÕRO,150g" (1.35 €); Rimi "Suitsuvorst Tamula Wõro 150g" (1.19 €); Rimi "Suitsuvorst Tamula Wõro 350g" (2.45 €) |
| Sausages | Barbora "E-vaba täissuitsuvorst OSKAR,210g" (3.79 €); Rimi "Täissuitsuvorst E-vaba Oskar 210g" (3.79 €); Selver "Täissuitsuvorst E-vaba, OSKAR, 210 g" (5.22 €); Selver "Täissuitsuvorst E-vaba, OSKAR, 120 g" (3.29 €) |
| Ham & cold cuts | Barbora "Suitsusingike RAKVERE, 350g" (4.99 €); Rimi "Suitsusingike Rakvere 130g" (2.29 €); Rimi "Suitsusingike Rakvere 350g" (4.99 €); Selver "Suitsusingike, RAKVERE LK, 350 g" (5.99 €) |
| Ham & cold cuts | Coop "Delikatessrulaad Tallegg 130g viil" (2.49 €); Selver "Delikatessrulaad, TALLEGG, 130 g" (2.84 €); Barbora "Delikatessrulaad TALLEGG, 500g" (6.79 €); Barbora "Delikatessrulaad TALLEGG, 130g viil" (2.14 €); Rimi "Delikatessrulaad Tallegg 500g" (6.79 €) |
| Ham & cold cuts | Coop "Suitsupeekon Rakvere 130g viil" (2.85 €); Selver "Suitsupeekon, RAKVERE LK, 130 g" (3.13 €); Rimi "Suitsupeekon Rakvere 130g" (3.15 €); Selver "Rakvere suitsupeekon, RAKVERE, kg" (11.99 €) |
| Fish & seafood | Rimi "Sprotid õlis Rannaküla 160g" (2.85 €); Selver "Sprotid õlis, RANNAKÜLA, 160 g" (2.85 €); Selver "Sprotid õlis, RANNAKÜLA, 160 g" (2.99 €) |
| Diapers & baby wipes | Coop "Püksmähkmed Huggies Extra Care 5 12-17kg 34tk" (24.50 €); Selver "Püksmähkmed Extra Care 5, HUGGIES, 12-17kg/34tk" (26.90 €); Barbora "Püksmähkm.HUGGIES ExtraCare5 12-17kg34tk" (25.99 €); Barbora "Püksmähkmed HUGGIES S5 Girl 12-17kg 34tk" (18.25 €); Barbora "Püksmähkmed HUGGIES S5 Boy 12-17kg 34tk" (18.25 €); Rimi "Püksmähkmed Huggies Extra Care 5 12-17kg 34tk" (25.99 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S4 Mega Girl 52tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S4 Mega Boy 52tk" (20.29 €); Rimi "Püksmähkmed Huggies 4 Girl 9-14 kg 52 tk" (12.49 €); Rimi "Püksmähkmed Huggies 4 Boy 9-14kg 52tk" (12.49 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S5 Boy 12-17kg 48tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S5 Girl 12-17kg 48tk" (20.29 €); Rimi "Püksmähkmed Huggies 5 Girl,12-17kg 48tk" (12.49 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed PAMPERS s5,22tk" (8.69 €); Barbora "Püksmähkmed PAMPERS Night VP S5 22tk" (9.49 €); Rimi "Püksm. Pampers Night Pants VP S5,22tk" (12.69 €); Selver "Öö püksmähkmed VP S5, PAMPERS, 22tk" (12.69 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed PAMPERS S6,19tk" (8.69 €); Barbora "Püksmähkmed PAMPERS Night VP S6 19tk" (9.49 €); Rimi "Püksm. Pampers Night Pants VP S6,19tk" (12.69 €); Selver "Öö püksmähkmed VP S6, PAMPERS, 19tk" (12.69 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES Girl S4 9-14kg 72tk" (27.89 €); Barbora "Püksmähkmed HUGGIES Boy S4 9-14kg 72tk" (27.89 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES Girl S5 12-17kg 68tk" (27.89 €); Barbora "Püksmähkmed HUGGIES Boy S5 12-17kg 68tk" (27.89 €) |
| Diapers & baby wipes | Coop "Püksmähkmed Huggies Pants LM 6 Box Girl15-25kg60tk" (27.90 €); Selver "Püksmähkmed Pants Little Movers 6 Box Girl, HUGGIES, 15-25 kg/60 tk" (29.90 €); Barbora "Püksmähkmed HUGGIES Girl S6 15-25kg 60tk" (27.89 €); Barbora "Püksmähkmed HUGGIES Boy S6 15-25kg 60tk" (27.89 €); Selver "Püksmähkmed Pants Little Movers 6 Box Boy, HUGGIES, 15-25 kg/60 tk" (29.90 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S3 Mega Boy 58tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S3 Mega Girl 58tk" (20.29 €); Rimi "Püksmäh. Huggies Meg.girl S3 6-11kg 58tk" (12.49 €); Rimi "Püksmähkmed Huggies Mega Boy S3, 6-11kg 58tk" (12.49 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed HUGGIES S6 Girl 15-25kg 44tk" (20.29 €); Barbora "Püksmähkmed HUGGIES S6 Boy 15-25kg 44tk" (20.29 €); Rimi "Püksmäh. Huggies Mega Boy S6, 15-25kg 44tk" (12.49 €); Rimi "Püksmähkmed Huggies 6 Girl,15-25kg 44tk" (12.49 €) |
| Diapers & baby wipes | Barbora "Püksmähkmed PAMPERS S4 9-15 kg 25tk" (8.09 €); Barbora "Püksmähkmed PAMPERS Night VP S4 25tk" (9.49 €); Rimi "Püksm. Pampers Night Pants VP S4,25tk" (12.69 €); Selver "Öö püksmähkmed VP S4, PAMPERS, 25tk" (12.69 €) |
| Diapers & baby wipes | Coop "Niisked salvrätikud Huggies All Over Clear 56tk" (2.25 €); Selver "Niisked salvrätikud All Over Clear, HUGGIES, 56tk" (2.43 €); Barbora "Niisk. salv. HUGGIES All Over Clear 56tk" (2.43 €); Coop "Niisked salvrätikud Huggies Sensit Extra Care 56tk" (3.45 €); Rimi "Salvrätik. Huggies AllOverCl univ,56tk" (2.45 €) |
| Diapers & baby wipes | Coop "Niisked salvrätikud Pampers Sensitive PF 52tk" (2.69 €); Selver "Niisked salvrätikud Sensitive PF (plastic free), Pampers, 52tk" (1.99 €); Barbora "Niisked salvrätik.PAMPERS Sensit.PF 52tk" (2.89 €); Barbora "Niisk.salvrätik.PAMPERS Fresh Clean 52tk" (2.89 €); Rimi "Niisked salvrätikud Pampers Sensitive 52tk" (1.55 €); Rimi "Niis. salv.r. Pampers Fresh Clean Pl.Fr. 52tk" (2.69 €) |
| Diapers & baby wipes | Barbora "Niisk.salvr.HUGGIES Sensit.ExtraCare48tk" (4.09 €); Barbora "Niisked salvrätikud HUGGIES Pure 48tk" (3.19 €); Barbora "Niisked salvr. HUGGIES Natural Care 48tk" (3.19 €); Rimi "Niisked salvrätikud Huggies Pure 48tk" (3.29 €); Rimi "Niisk. salvrät. Huggies Extra Care Sens. 48tk" (4.39 €); Selver "Niisked salvrätikud Pure, HUGGIES, 48 tk" (3.39 €) |
| Diapers & baby wipes | Barbora "Niisked salvrätikud PAMPERS Water,3x60tk" (10.99 €); Barbora "Niisk.salvr.PAMPERS AquaSoftTouch,3x60tk" (13.49 €); Rimi "Niisked salvrätikud Pampers Water 3x60tk" (10.49 €) |
| Diapers & baby wipes | Barbora "Niisked salvrätikud PAMPERS Water, 60tk" (2.99 €); Barbora "Niisk.salvr.PAMPERS Aqua Soft Touch 60tk" (5.29 €); Rimi "Niisked salvrätikud Pampers Water 60tk" (3.59 €); Rimi "Niisked salv.r. Pampers Aqua Soft Touch 60tk" (4.69 €) |
| Household | Coop "Pesugeel Perwoll Wool 2L 40pesukorda" (16.29 €); Selver "Pesugeel Wool 40pk, PERWOLL, 2 l" (15.99 €); Barbora "Pesugeel PERWOLL Wool 40pk 2L" (15.99 €); Rimi "Pesugeel Perwoll wool 40pk 2l" (15.99 €); Rimi "Pesugeel Perwoll wool 40pk 2l" (15.99 €) |
| Beer & cider | Barbora "Hele õlu PREMIUM 4.7% 500ml A.Le Coq" (1.79 €); Barbora "Hele õlu PREMIUM A.Le Coq 4.7% 500ml" (1.85 €); Rimi "Õlu A.Le Coq Premium 4,7%vol 0,5l" (1.79 €) |
| Beer & cider | Barbora "Hele õlu A.Le Coq Special 5,2% 500ml" (1.89 €); Barbora "Hele õlu A.LE COQ Special 5.2% 500ml" (1.89 €); Rimi "Õlu A.Le Coq Special 5,2%vol 0,5l" (1.89 €); Rimi "Õlu A. Le Coq Special 5,2%vol 0,5l" (1.89 €) |
| Beer & cider | Barbora "Hele õlu KIRIN ICHIBAN 5% 330ml" (2.39 €); Rimi "Õlu Kirin Ichiban 5%vol 0,33l" (2.59 €); Rimi "Õlu Kirin Ichiban 5% 0,33l" (2.35 €) |
| Wine | Coop "Pv Gran Castillo Shiraz Medium Sweet 0.75L" (8.75 €); Selver "Gran Castillo Shiraz 75 cl" (8.99 €); Barbora "KPN vein GRAN CASTILLO Shiraz 750ml" (9.29 €); Rimi "Kpn.vein Gran Castillo Shiraz 0,75l" (9.59 €); Rimi "Kpn.vein Gran Castillo Shiraz 0,75l" (9.59 €) |
| Wine | Barbora "GT vein MAORI BAY Sauvignon Blanc 750ml" (6.99 €); Barbora "Vein MAORI BAY Sauvignon Blanc 750ml" (14.65 €); Rimi "Gt.vein Maori Bay Sauvignon Blanc 0,75l" (8.49 €) |
| Spirits | Coop "Liköör Vana Tallinn 35% 0.5L" (14.99 €); Selver "Liköör Vana Tallinn 50 cl" (15.59 €); Barbora "Liköör VANA TALLINN 45% 500ml" (16.89 €); Barbora "Liköör VANA TALLINN 45% 500ml" (15.89 €); Barbora "Liköör VANA TALLINN 35% 500ml" (11.49 €); Rimi "Liköör Vana Tallinn 45% 0,5l" (16.89 €); Rimi "Liköör Vana Tallinn 35% 0,5l" (15.55 €); Selver "Liköör VANA TALLINN 45%, 50 cl" (16.59 €) |
| Spirits | Barbora "Liköör VANA TALLINN 40% 500ml" (11.99 €); Barbora "Liköör VANA TALLINN 50%500ml" (17.99 €); Barbora "Liköör VANA TALLINN 40% 500ml" (16.59 €); Barbora "Liköör VANA TALLINN 40% 500ml" (15.65 €); Rimi "Liköör Vana Tallinn 40% 0,5l" (15.99 €) |
| Spirits | Coop "Viin Viru Valge 40% 0.5L" (12.29 €); Selver "Viin VIRU VALGE, 50 cl" (9.49 €); Barbora "Viin VIRU VALGE 40% 500ml" (8.99 €); Selver "Viin VIRU VALGE, 50 cl" (11.90 €) |
| Spirits | Barbora "Cognac HENNESSY VS 40% 700ml" (37.99 €); Barbora "Cognac HENNESSY VS 40% 700ml" (37.99 €); Rimi "Cognac Hennessy VS 40% 0,7l" (48.99 €) |
| Spirits | Coop "Viin Saaremaa Vodka 40% 0.5L" (12.99 €); Selver "Viin SAAREMAA, 50 cl" (12.19 €); Barbora "Viin SAAREMAA 40% 500ml" (9.49 €); Rimi "Viin Saaremaa 80% 0,5l" (24.69 €); Rimi "Viin Saaremaa 40% 0,5l" (9.99 €) |
| Spirits | Barbora "Liköör VANA TALLINN 40% 200ml" (6.85 €); Rimi "Liköör Vana Tallinn 0,2L" (6.39 €); Rimi "Liköör Vana Tallinn 40%vol 0,2l" (6.59 €); Selver "Liköör VANA TALLINN 40%, 20 cl" (6.59 €) |
| Spirits | Coop "Liviko Liqueur Metsmaasikas 21% 0.5L" (7.29 €); Selver "Liköör LIVIKO Metsmaasika, 50 cl" (6.99 €); Barbora "Liköör METSMAASIKA 21% 500ml" (7.19 €); Barbora "Liköör LIVIKO Metsmaasikas 21% 500ml" (7.19 €); Rimi "Liköör Liviko Metsmaasikas 21% 0,5L" (7.39 €); Selver "Liköör LIVIKO Metsmaasika, 50 cl" (6.99 €) |
| Spirits | Coop "Liköör Liviko Liqueur Kirss 21% 0.5L" (7.29 €); Selver "Liköör LIVIKO Kirsi, 50 cl" (6.99 €); Barbora "Liköör KIRSI 21% 500ml" (7.49 €); Barbora "Liköör LIVIKO Kirss 21% 500ml" (7.65 €); Rimi "Liköör Liviko Liqueur Kirss 21%vol 0,5l" (7.39 €) |
| Broths & stock | Barbora "Kanapuljong MAGGI 80g" (1.15 €); Barbora "Kanapuljong MAGGI 80g" (1.15 €); Rimi "Kanapuljong Maggi 80g" (0.99 €) |

## 3. Unclassified

No recognized type and no recognized brand on any side — never had a reliable comparison to begin with.

| Store | Name | Price |
|---|---|---|
| Barbora | Punane sõstar, 125g | 4.99 € |
| Barbora | Eesti sibula mix võrgus, 1kg | 3.29 € |
| Coop | Keedetud mais 450g v/p | 2.39 € |
| Coop | Roheline jalapeno pipar 30g | 1.69 € |
| Coop | Keedetud oad 300g | 1.39 € |
| Coop | Keedetud kikerhernes 250g | 1.39 € |
| Coop | Punane greip kg | 1.99 € |
| Coop | Marineeritud kukeseened 420g | 6.99 € |
| Coop | Marineeritud puravikud 420g | 7.99 € |
| Coop | Marineeritud küüslaugu võrsed 320g | 5.79 € |
| Coop | Mahe kukeseen 300g | 4.99 € |
| Coop | Marineeritud metsaseened 420g purk | 6.99 € |
| Coop | Mahe idutrio 150g | 1.79 € |
| Rimi | Mahe pohl Eesti 250g | 4.79 € |
| Rimi | Punane koonuskapsas Eesti, kg | 2.69 € |
| Coop | Öko kanepiõli 250ml | 9.49 € |
| Coop | Eesti juust 400g väikepakk | 4.99 € |
| Rimi | Must tee mango-virsiku maitseline 20x1,7g | 2.75 € |
| Rimi | Roheline tee mangomaitseline 20x1,5g | 2.75 € |
| Coop | Mahe kanepiseemned 500g | 6.99 € |
| Barbora | Marineeritud angersäga, 250g | 7.69 € |

## 4. Possible matches to check by hand

Not matched automatically — just a list. Same real brand, same size, same qualifiers/variant/fat %, and the leftover descriptor words differ by exactly one (a single addition, removal, or swap). Capped at 30 pairs per category.

### Fruits & vegetables (5)

| Item A | Item B |
|---|---|
| Barbora "Värske soolakurk ämbris PEIPSI, 500g" (4.99 €) | Coop "Värske soolakurk Peipsi Kurk 500g" (4.99 €) |
| Barbora "Peakapsa Kimchi 300g" (3.59 €) | Rimi "Punase peakapsa Kimchi Kadarbiku 300g" (3.59 €) |
| Barbora "Spargel, 250g" (5.99 €) | Rimi "Spargel roheline 250g" (5.99 €) |
| Coop "Tshillipipar Cayenne mix Eat Me 75g" (3.59 €) | Selver "Tšillipipar Cayenne mix, EAT ME, 75 g" (2.99 €) |
| Coop "Avokaado Hass võrgus 700g" (3.69 €) | Selver "Avokaado võrgus, 700 g" (4.99 €) |

### Dairy (13)

| Item A | Item B |
|---|---|
| Barbora "Täispiim ALMA 3.6-4.2% 1.5L" (1.49 €) | Coop "Täispiim 3.6-4.2% Alma 1.5L purepakk" (1.79 €) |
| Barbora "Koorene jogurt FARMI apelsin&šok., 400g" (1.79 €) | Rimi "Koorene jogurt apel.-šokol. Farmi 400g" (1.79 €) |
| Coop "Jogurtimaius mango Alma 200g" (1.25 €) | Selver "Jogurtimaius virsiku, ALMA, 200 g" (1.27 €) |
| Coop "Jogurt Zott Zottis Fruit 400g" (1.35 €) | Rimi "Jogurt marja Zott Zottis 400g" (1.39 €) |
| Coop "Proteiinijogurt mustsõstra Valio PROfeel 200g" (1.29 €) | Selver "Proteiinijogurt ahjuõuna, VALIO PROFEEL, 200 g" (1.34 €) |
| Coop "Proteiinijogurt mustsõstra Valio PROfeel 200g" (1.29 €) | Selver "Proteiinijogurt maasika, VALIO PROFEEL, 200 g" (1.34 €) |
| Coop "Jogurtimaius maasika Alma 200g" (1.25 €) | Selver "Jogurtimaius virsiku, ALMA, 200 g" (1.27 €) |
| Coop "Vabalt peetavate kanade munad Kodutalu M 10tk" (2.99 €) | Rimi "Vabapidamisel kanade munad Kodutalu 10tk" (2.99 €) |
| Coop "Vabalt peetavate kanade munad Kodutalu M 10tk" (2.99 €) | Rimi "Õrrekanade munad Kodutalu M10" (2.49 €) |
| Coop "Kanamunad Kodutalu M 10tk" (1.99 €) | Rimi "Vabapidamisel kanade munad Kodutalu 10tk" (2.99 €) |
| Coop "Kanamunad Kodutalu M 10tk" (1.99 €) | Rimi "Õrrekanade munad Kodutalu M10" (2.49 €) |
| Coop "Kodutalu õrrekana munad M 10tk" (2.39 €) | Rimi "Õrrekanade munad Kodutalu M10" (2.49 €) |
| Coop "Linnu Talu Kollased talumunad M 10tk" (2.69 €) | Selver "Kollased Talumunad L, LINNU TALU, 10 tk" (3.25 €) |

### Bread (5)

| Item A | Item B |
|---|---|
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Rimi "Täisteravormileib Ruks Leibur 300g" (1.05 €) |
| Barbora "Sepik seemnetega XXL FAZER 500g" (1.49 €) | Coop "Seemnetega sepik 500g Fazer" (1.55 €) |
| Barbora "Pagari röst täistera 430g" (1.59 €) | Selver "Pagari Haputaina röst, EESTI PAGAR, 430 g" (1.59 €) |
| Barbora "Röst seemnetega FAZER 500g" (1.65 €) | Coop "Seemnetega sepik 500g Fazer" (1.55 €) |
| Rimi "Hea Sai Eesti Pagar 300g" (0.55 €) | Selver "Hea sai viilutatud, EESTI PAGAR, 300 g" (0.55 €) |

### Drinks (30)

| Item A | Item B |
|---|---|
| Barbora "Naturaal. mineraalvesi AKVILE Kids 500ml" (0.69 €) | Coop "Looduslik mineraalvesi Akvile Kids 0.5L" (0.69 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Sidruni, VÄRSKA, 1,5 L" (1.55 €) |
| Barbora "Looduslik karb.mineraalvesi BORJOMI 6x1L" (14.49 €) | Selver "Karboniseeritud looduslik mineraalvesi 6-pakk, BORJOMI, 6 x 1 L" (14.99 €) |
| Barbora "Loodus.karbon.mineraalvesi BORJOMI 330ml" (1.25 €) | Rimi "Mineraalvesi karboniseeritud Borjomi 0,33l" (1.29 €) |
| Barbora "Kergelt gaseeritud vesi AURA Mg 500ml" (1.29 €) | Selver "Vesi kergelt gaseeritud, AURA, 500 ml" (0.56 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Coop "Cido ananassinektar 1L" (2.25 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Coop "Õunamahl 100% Cido 1L" (1.99 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Coop "Cido ploominektar 1L" (1.85 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Coop "Cido tomatimahl 1L" (1.79 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Coop "Virsikunektar Cido 1L" (1.95 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Coop "Cido apelsinimahl 1L" (2.45 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Selver "Jõhvikanektar, CIDO, 1 L" (2.19 €) |
| Barbora "Astelpaju nektar SEMU 500ml" (3.09 €) | Coop "Astelpaju-mustika nektar Semu 0.5L" (2.85 €) |
| Barbora "Astelpaju nektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) |
| Barbora "Astelpaju-mustikanektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) |
| Barbora "Karastusjook LIMONAAD traditsioon. 500ml" (0.79 €) | Rimi "Karastusjook tradit. limonaad A.Le Coq 0,5l" (0.79 €) |
| Barbora "Karastusjook LIMONAAD traditsioon. 1,5L" (1.55 €) | Rimi "Karastusjook tradit. limonaad A.Le Coq 1,5l" (1.59 €) |
| Barbora "Karastusj. COCA-COLA 330ml, pdl" (1.35 €) | Rimi "Karastusjook Coca-Cola 0,33l pudel" (1.35 €) |
| Barbora "Karastusjook PEPSI MAX 1.5L" (1.99 €) | Selver "Karastusjook Pepsi Zero, PEPSI, 1,5 L" (2.02 €) |
| Barbora "Karastusjook PEPSI MAX 1.5L" (1.99 €) | Selver "Karastusjook Pepsi Lemon, PEPSI, 1,5 l" (2.02 €) |
| Barbora "Karastusjook BORJOMI Limonati pirni330ml" (1.49 €) | Rimi "Karastusjook Tarhun Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati tsitrus 330ml" (1.49 €) | Rimi "Kar.jook pirnimait. Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati tsitrus 330ml" (1.49 €) | Rimi "Kar.jook mandariini Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati tsitrus 330ml" (1.49 €) | Rimi "Kar.jook tsitruse Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati mandariin330ml" (1.49 €) | Rimi "Kar.jook pirnimait. Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati mandariin330ml" (1.49 €) | Rimi "Kar.jook mandariini Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati mandariin330ml" (1.49 €) | Rimi "Kar.jook tsitruse Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati Tarkhun 330ml" (1.49 €) | Rimi "Kar.jook pirnimait. Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati Tarkhun 330ml" (1.49 €) | Rimi "Kar.jook mandariini Limonati Borjomi 0,33l" (1.55 €) |
| Barbora "Kar.jook BORJOMI Limonati Tarkhun 330ml" (1.49 €) | Rimi "Kar.jook tsitruse Limonati Borjomi 0,33l" (1.55 €) |

### Meat (3)

| Item A | Item B |
|---|---|
| Barbora "Kirsi-rum.grill-liha seaväl.RAKVERE,580g" (5.59 €) | Selver "Kirsi-rummimarinaadis grill-liha seavälisfileest, RAKVERE LK, 580 g" (5.99 €) |
| Barbora "Br.poolkoivad jogurti-tilli TALLEGG,800g" (3.75 €) | Selver "Broileri poolkoivad jogurti-tillimarinaadis, TALLEGG, 800 g" (4.99 €) |
| Coop "Seaguljash Rakvere 380g" (3.39 €) | Selver "Veisestrooganov, RAKVERE LK, 380 g" (8.49 €) |

### Pasta (30)

| Item A | Item B |
|---|---|
| Barbora "Makaronid lipsukesed BARILLA 500g" (1.64 €) | Coop "Pasta Bavette Barilla 500g" (2.19 €) |
| Barbora "Makaronid lipsukesed BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Makaronid lipsukesed BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Makaronid spiraalid BARILLA 500g" (1.64 €) | Coop "Pasta Bavette Barilla 500g" (2.19 €) |
| Barbora "Makaronid spiraalid BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Makaronid spiraalid BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Makaronid Farfalline LA MOLISANA 500g" (1.49 €) | Rimi "Makaronid La Molisana Mafalda 500g" (1.99 €) |
| Barbora "Spagetid n.5 PANZANI 500g" (1.99 €) | Rimi "Makaronid Spaghetti nr.5 Panzani 500g" (2.19 €) |
| Barbora "Makaronid Serpentini PANZANI 500g" (1.72 €) | Coop "Pasta Mafaldelle Panzani 500g" (2.69 €) |
| Barbora "Makaron.teokarbid Conchiglie PANZANI500g" (1.49 €) | Coop "Pasta Mafaldelle Panzani 500g" (2.69 €) |
| Barbora "Lasanjeplaadid BARILLA 500g" (3.29 €) | Coop "Pasta Bavette Barilla 500g" (2.19 €) |
| Barbora "Lasanjeplaadid BARILLA 500g" (3.29 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Lasanjeplaadid BARILLA 500g" (3.29 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Kartuliklimbid Gnocchi LA MOLISANA500g" (1.49 €) | Rimi "Makaronid Gnocchi n.26 La Molisana 500g" (1.99 €) |
| Barbora "Makaronid Vermicelli PANZANI 500g" (1.49 €) | Coop "Pasta Mafaldelle Panzani 500g" (2.69 €) |
| Barbora "Makaronid Farfalle LA MOLISANA 500g" (1.49 €) | Rimi "Makaronid La Molisana Mafalda 500g" (1.99 €) |
| Barbora "Makaronid Farfalle LA MOLISANA 500g" (1.49 €) | Rimi "Pasta  „LaMolisana“ FARFALLE 500g" (1.99 €) |
| Barbora "Makar.Fusilli Integrali LA MOLISANA 500g" (1.49 €) | Rimi "Pasta „LaMolisana“ Fusilli 500g" (1.99 €) |
| Barbora "Spagetid Trighetto LA MOLISANA 500g" (1.49 €) | Rimi "Makaronid Spaghetti n.15 La Molisana 500g" (1.75 €) |
| Barbora "Makaronid Risoni BARILLA 500g" (1.64 €) | Coop "Pasta Bavette Barilla 500g" (2.19 €) |
| Barbora "Makaronid Risoni BARILLA 500g" (1.64 €) | Rimi "Pasta Spagettini Barilla 500g" (2.35 €) |
| Barbora "Makaronid Risoni BARILLA 500g" (1.64 €) | Rimi "Pasta Farfalle Barilla 500g" (2.35 €) |
| Barbora "Makaronid Tagliatelle PANZANI 500g" (2.54 €) | Coop "Pasta Mafaldelle Panzani 500g" (2.69 €) |
| Barbora "Spagetid 3-minuti PANZANI 500g" (1.94 €) | Rimi "Makaronid Spaghetti nr.5 Panzani 500g" (2.19 €) |
| Barbora "Spagetid Premium PANZANI 500g" (1.94 €) | Rimi "Makaronid Spaghetti nr.5 Panzani 500g" (2.19 €) |
| Barbora "Makaronid Fusilli Premium PANZANI 500g" (1.94 €) | Rimi "Makaronid 3-värvilised Fusilli Panzani 500g" (2.59 €) |
| Barbora "Makaronid Fusilli Premium PANZANI 500g" (1.94 €) | Selver "Kolmevärviline spiraal Fusilli, PANZANI, 500 g" (2.59 €) |
| Barbora "Makaronid Fusilli 3-minuti PANZANI 500g" (1.94 €) | Rimi "Makaronid 3-värvilised Fusilli Panzani 500g" (2.59 €) |
| Barbora "Makaronid Fusilli 3-minuti PANZANI 500g" (1.94 €) | Selver "Kolmevärviline spiraal Fusilli, PANZANI, 500 g" (2.59 €) |
| Coop "Pasta Zara pasta Gnocchi 500g" (1.75 €) | Selver "Kuskuss, PASTA ZARA, 500 g" (2.56 €) |

### Rice & grains (8)

| Item A | Item B |
|---|---|
| Barbora "Risoto riis VESKI MATI 500g" (2.39 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Ümarateraline riis BALTIX 1kg" (2.73 €) | Selver "Pudruriis (Ümarateraline riis), BALTIX, 1 kg" (2.73 €) |
| Barbora "Sushi-riis VESKI MATI 500g" (2.49 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Risotoriis Carnaroli RISO SCOTTI 500g" (4.89 €) | Selver "Risotoriis Arborio, RISO SCOTTI, 500 g" (3.65 €) |
| Barbora "Kinoa valge BOSTO 4x75g" (3.51 €) | Selver "Quinoa, valge 4x75g, BOSTO, 300 g" (3.51 €) |
| Barbora "Tatar TATRU MILL 4x125g" (1.49 €) | Coop "Tatar Tartu Mill 4*125g" (2.05 €) |
| Coop "Riis aurutatud Bosto 4*125g" (2.29 €) | Rimi "Aurutöödeldud riis Bosto 4x125g" (2.29 €) |
| Coop "Kaerakliid Veski Mati 1kg" (3.05 €) | Selver "Tatar, VESKI MATI, 1 kg" (2.25 €) |

### Flour & sugar (8)

| Item A | Item B |
|---|---|
| Barbora "Täisteranisujahu VESKI MATI 1kg" (1.49 €) | Coop "Speltajahu Veski Mati 1kg" (3.05 €) |
| Barbora "Pruun tükksuhkur DAN SUKKER 500g" (2.56 €) | Selver "Kõva tükksuhkur, DAN SUKKER, 500 g" (1.59 €) |
| Barbora "Karamellsuhkur DANSUKER 500g" (2.69 €) | Selver "Karamellsuhkur, DAN SUKKER, 500 g" (2.69 €) |
| Barbora "Moosisuhkur DAN SUKKER 1kg" (2.89 €) | Rimi "Suhkur moosisuhkur Dan Sukker 1kg" (2.89 €) |
| Barbora "Granuleeritud suhkur BILLINGTON'S 1kg" (4.75 €) | Selver "Suhkur granuleeritud, BILLINGTONS, 1 kg" (4.77 €) |
| Barbora "Kristall.fruktoos ALVO 500g" (4.09 €) | Rimi "Fruktoos Alvo 500g" (4.09 €) |
| Rimi "Pitsajahu Tartu Mill 400g" (1.59 €) | Selver "Riivsai, TARTU MILL, 400 g" (1.31 €) |
| Rimi "Muscovado suhkur tume Dansukker 400g" (2.59 €) | Selver "Tume Muscovado suhkur, DAN SUKKER, 400 g" (2.43 €) |

### Cooking oil (11)

| Item A | Item B |
|---|---|
| Barbora "Ekstra-neitsioliiviõli BORGES 500ml" (10.49 €) | Rimi "Ekstra väärisoliiviõli Borges 500ml" (9.65 €) |
| Barbora "Kõrvitsaõli GLORIA 500ml" (9.79 €) | Coop "Kreekapähkliõli Gloria 0.5L" (5.79 €) |
| Barbora "Kõrvitsaõli GLORIA 500ml" (9.79 €) | Coop "Gloria Mandliõli 0.5L" (9.25 €) |
| Barbora "Seesamiõli GLORIA 500ml" (6.25 €) | Coop "Kreekapähkliõli Gloria 0.5L" (5.79 €) |
| Barbora "Seesamiõli GLORIA 500ml" (6.25 €) | Coop "Gloria Mandliõli 0.5L" (9.25 €) |
| Barbora "Org.külmpress kookosõli THAI CHOICE 500ml" (12.69 €) | Selver "Orgaaniline külmpress kookosõli, THAI CHOICE, 500 ml" (12.69 €) |
| Barbora "Mahe kookosõli külmpres.LOODUSVÄGI,500ml" (8.62 €) | Selver "Mahe kookosõli lõhnatu, LOODUSVÄGI, 500 ml" (8.99 €) |
| Barbora "Avokaadoõli GLORIA 250ml" (5.59 €) | Selver "Avokaadoõli, rafineerimata, GLORIA, 250 ml" (5.58 €) |
| Barbora "Päevalilleõli OVILO 1L" (3.29 €) | Coop "Päevalilleõli Chumak 1L" (3.49 €) |
| Rimi "Ekstra väärisoliiviõli Borges 500ml" (9.65 €) | Selver "Ekstra-väärisoliiviõli Harmony, BORGES, 500ml" (7.49 €) |
| Rimi "MCT kookoseõli Bionaturalis öko 250ml" (10.19 €) | Selver "Kookosõli MCT Mahe, BIONATURALIS, 250ml" (10.15 €) |

### Cheese (27)

| Item A | Item B |
|---|---|
| Barbora "Valge juust FITAKI Original, 500g" (6.19 €) | Rimi "Juust Fitaki Original 500g" (5.49 €) |
| Barbora "Juust Leet MO SAAREMAA viil., 150g" (2.08 €) | Coop "Saaremaa juust MO Saaremaa 150g viil" (1.99 €) |
| Barbora "Juust DOR BLU klassikaline, 100g" (2.19 €) | Rimi "Juust Dor Blu 100g" (2.29 €) |
| Barbora "Toorjuustukreem PHILADELPHIA Milka 175g" (3.99 €) | Rimi "Toorjuust Milka Philadelphia 175g" (2.99 €) |
| Barbora "Juust Mozzarella ZOTTARELLA Classic,125g" (1.89 €) | Coop "Juust Zottarella mozzarella Zott 125g" (1.99 €) |
| Barbora "Pehme valge juust ATHENA Classic, 500g" (5.23 €) | Selver "Pehme valge juust, ATHENA, 500 g" (5.22 €) |
| Barbora "Valgehall.juust Camembert CASTELLO,125g" (3.79 €) | Rimi "Juust Camembert Castello 125g" (3.79 €) |
| Barbora "Juust EESTI viilutatud, 350g" (4.49 €) | Selver "Eesti Juust viilud, ESTOVER, 350 g" (2.99 €) |
| Barbora "Hallitusjuust Gorgonzola IGOR Dolce,200g" (3.49 €) | Rimi "Sinihallitusjuust Gorgonzola Dolce Igor 200g" (3.49 €) |
| Barbora "Juust täispiimast ALMA viilutatud, 500g" (6.19 €) | Rimi "Juust täispiimast viil. Alma 500g" (6.19 €) |
| Barbora "Juust Royal Gouda VALIO Black viil.,150g" (2.65 €) | Rimi "Juust Royal Gouda Yellow viil. Valio 150g" (1.59 €) |
| Barbora "Juust CheddarWhiteMO SAAREMAA viil.,150g" (2.25 €) | Coop "Saaremaa juust MO Saaremaa 150g viil" (1.99 €) |
| Barbora "Juusturattakesed BEL 60g" (2.45 €) | Selver "Babybel juusturattakesed, BEL, 60 g" (2.50 €) |
| Barbora "Toorjuust OTTO kurgi-tilliga, 150g" (1.99 €) | Coop "Toorjuust kurgi ja tilliga Piimameister Otto 150g" (1.99 €) |
| Barbora "Juust Gouda NOPRI kukeseene, 250g" (4.24 €) | Selver "Gouda Kukeseene, NOPRI, 250 g" (5.68 €) |
| Barbora "Juust Gouda NOPRI kukeseene, 250g" (4.24 €) | Selver "Juust gouda jalapeno, NOPRI, 250 g" (5.22 €) |
| Barbora "Kreemjuust Castello küüslaugumait.125g" (2.15 €) | Selver "Vahustatud kreemjuust, küüslaugumaitseline, CASTELLO, 125 g" (2.33 €) |
| Barbora "Kreemjuust vahestat.Castello pipraga125g" (2.19 €) | Selver "Vahustatud kreemjuust, pipraga, CASTELLO, 125 g" (2.33 €) |
| Coop "Mozzarella light Galbani 125g" (1.69 €) | Rimi "Juust Mozzarella Galbani 125g" (1.79 €) |
| Coop "Mozzarella light Galbani 125g" (1.69 €) | Selver "Mozzarella, GALBANI, 125 g" (1.82 €) |
| Coop "Gouda juust Epiim 150g viilutatud" (1.29 €) | Selver "Hollandi juust viilutatud, EPIIM, 150 g" (1.78 €) |
| Coop "MO Saaremaa Old Saare Sp.juust 12k 280g" (4.99 €) | Rimi "Old Saare juust Special MO Saaremaa 280g" (4.99 €) |
| Coop "Juust Parmigiano Reggiano DOP 200g" (6.79 €) | Rimi "Juust Rimi Parmigiano Reggiano 200g" (7.15 €) |
| Coop "Pehme juust laktoosivaba Apetina 200g tetra" (2.99 €) | Rimi "Valge pehme juust laktoosivaba Apetina 200g" (2.65 €) |
| Rimi "Juust Mozzarella Galbani 125g" (1.79 €) | Selver "Mozzarella, GALBANI, 125 g" (1.82 €) |
| Rimi "Juust Chavroux 150g" (4.85 €) | Selver "Kitsepiimajuust, CHAVROUX, 150 g" (5.48 €) |
| Rimi "Brie sinihallitusjuustuga Ile de France 125g" (6.69 €) | Selver "Valgehallitusjuust Brie sinihallitusjuustuga, ILE DE FRANCE, 125 g" (6.80 €) |

### Curd & cottage cheese (1)

| Item A | Item B |
|---|---|
| Rimi "Kodujuust crème brulée Alma 200g" (1.25 €) | Selver "Kodujuust crème brûlée maitseline, ALMA, 200 g" (1.68 €) |

### Cream & sour cream (4)

| Item A | Item B |
|---|---|
| Barbora "Vahukoor ALMA 35% 200ml PP" (1.65 €) | Selver "Vahukoor 35%, ALMA, 200 ml" (1.59 €) |
| Barbora "Hapukoor TERE 30% tops, 300g" (2.05 €) | Coop "Hapukoor 30% Tere 300g topsis" (2.05 €) |
| Barbora "Hapukoor TERE 30% tops, 300g" (2.05 €) | Rimi "Hapukoor Tere 30% 300g" (2.19 €) |
| Coop "Hapukoor 30% Tere 300g topsis" (2.05 €) | Rimi "Hapukoor Tere 30% 300g" (2.19 €) |

### Kefir & buttermilk (7)

| Item A | Item B |
|---|---|
| Barbora "Keefir FARMI 2,5% 1kg, kile" (0.89 €) | Selver "Keefir 2,5% kiles, FARMI, 1 kg" (0.73 €) |
| Rimi "Keefir Gefilus 2,5% 500g" (1.05 €) | Selver "Keefir 2,5%, VALIO GEFILUS, 500 g" (1.04 €) |
| Rimi "Keefir metsmaasika Gefilus 1kg" (2.09 €) | Selver "Keefir metsmaasika, VALIO GEFILUS, 1 kg" (2.08 €) |
| Rimi "Keefir mustika Gefilus 1kg" (2.09 €) | Selver "Keefir mustika, VALIO GEFILUS, 1 kg" (2.08 €) |
| Rimi "Keefir maasika-banaani Gefilus 1kg" (2.09 €) | Selver "Keefir maasika-banaani, VALIO GEFILUS, 1 kg" (2.08 €) |
| Rimi "Keefir metsmaasika Gefilus 300g" (1.29 €) | Selver "Keefir metsmaasika, VALIO GEFILUS, 300 g" (1.24 €) |
| Rimi "Keefir vaarika-mustika Gefilus 1kg" (2.09 €) | Selver "Keefir mustika, VALIO GEFILUS, 1 kg" (2.08 €) |

### Coffee (30)

| Item A | Item B |
|---|---|
| Barbora "Kohvioad Qualita Oro LAVAZZA 1kg" (33.49 €) | Rimi "Kohvioad Lavazza Oro 1kg" (33.49 €) |
| Barbora "Kohvioad LAVAZZA Espresso Gran Crema 1kg" (33.49 €) | Rimi "Kohvioad Barista Gran Crema Lavazza 1kg" (33.49 €) |
| Barbora "Kohvioad LAVAZZA Espresso Gran Crema 1kg" (33.49 €) | Selver "Kohvioad Lavazza Espresso Barista Gran Crema , LAVAZZA, 1 kg" (34.99 €) |
| Barbora "Kohvioad Selezione Crema SEGAFREDO 1kg" (27.39 €) | Selver "Kohvioad Selezione Crema, SEGAFREDO ZANETTI, 1 kg" (16.99 €) |
| Barbora "Kohvioad Caffe Crema MÖVENPICK 1kg" (25.89 €) | Selver "Café Crema kohvioad, MÖVENPICK, 1 kg" (22.90 €) |
| Barbora "Kovhioad OA No.2 1kg" (23.35 €) | Selver "Kohviuba No1, OA, 1 kg" (23.90 €) |
| Barbora "Kohviuba Oa N4 1kg" (37.99 €) | Selver "Kohviuba No1, OA, 1 kg" (23.90 €) |
| Barbora "Lahustuv kohv Classic NESCAFE 200g" (11.99 €) | Rimi "Lahustuv kohv Nescafe Classic Crema 200g" (11.99 €) |
| Barbora "Lahustuv kohv Classic NESCAFE 200g" (11.99 €) | Selver "Lahustuv kohv Classic (klaaspurk), NESCAFE, 200 g" (11.99 €) |
| Barbora "Lahustuv kohvijook NESCAFÉ® 3IN1 Creamy Latte 10x15g" (2.95 €) | Selver "Lahustuv kohvijook 3in1 Creamy Latte 10X15g, NESCAFE, 150 g" (3.30 €) |
| Barbora "Lahustuv kohv NESCAFÉ® CLASSIC Crema 200g" (11.99 €) | Rimi "Lahustuv kohv Nescafe Classic Crema 200g" (11.99 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 20x12.6g" (5.69 €) | Rimi "Lah. kohvijook Jacobs 3in1 Original 20x12,6g" (5.29 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 20x12.6g" (5.69 €) | Selver "Kohvijook  3in1 (kott 20x12,6g), JACOBS, 252 g" (5.29 €) |
| Barbora "Lah. kohvijook JACOBS 2in1 12.4g" (0.27 €) | Rimi "Kohvijook lahustuv 2in1 Jacobs 12,4g" (0.26 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 12.6g" (0.27 €) | Rimi "Lahustuv kohvijook Jacobs 3in1 12,6g" (0.26 €) |
| Barbora "Lahustuv kohv JACOBS Cronat Gold 150g" (6.09 €) | Rimi "Kohv lahustuv Jacobs Cronat Gold Refill 150g" (6.49 €) |
| Barbora "Lahustuv kohv JACOBS Cronat Gold 150g" (6.09 €) | Selver "Lahustuv kohv Cronat Gold, täitepakk, JACOBS, 150g" (6.09 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 Milka 10x12.4g" (2.89 €) | Selver "Lahustuv kohvijook 3in1 10x12,4g Milka, JACOBS, 124 g" (2.75 €) |
| Barbora "Kohvijook 3in1 JACOBS 20x12.6g" (5.29 €) | Selver "Kohvijook  3in1 (kott 20x12,6g), JACOBS, 252 g" (5.29 €) |
| Barbora "Kohvijook 3in1 JACOBS 10x12.6g" (2.79 €) | Selver "Kohvijook 3in1 (kott 10x12,6g ), JACOBS, 126 g" (1.99 €) |
| Barbora "Kohvijook NESCAFE 3in1 Strong 28x14g" (8.99 €) | Selver "Kohvijook 3IN1 Strong, karp 28x14g, NESCAFE, 392g" (8.93 €) |
| Barbora "Jahvatatud kohv Classic PAULIG 500g" (10.19 €) | Selver "Jahvatatud filtrikohv Classic, PAULIG, 500 g" (10.19 €) |
| Barbora "Jah.kohv LAVAZZA Caffe Decaffeinato 250g" (10.99 €) | Rimi "Jahvat. kohv Lavazza Caffe Decaffeinato 250g" (10.99 €) |
| Barbora "Jahv.kohv MERRILD In cup 500g" (12.19 €) | Rimi "Kohv jahvatatud Merrild In-Cup 500g" (7.99 €) |
| Barbora "Jahvatatud kohv PAULIG Classic 100g" (3.19 €) | Selver "Jahvatatud filtrikohv Classic, PAULIG, 100 g" (2.69 €) |
| Barbora "Kohvikapslid L'OR Dubai Choco 10x5.2g" (4.79 €) | Rimi "Kohvikapslid L'or Dubai Chocolate 10x5,2g" (5.79 €) |
| Coop "Nescafe Classic Crema lah.kohv 200g" (11.99 €) | Rimi "Lahustuv kohv Nescafe Classic Crema 200g" (11.99 €) |
| Coop "Indian Instant Coffee lahustuv kohv 90g" (4.19 €) | Rimi "Kohv lahustuv Indian Instant 90g" (3.09 €) |
| Rimi "Kohvioad Arabica Origin Brazil Paulig 1kg" (24.99 €) | Selver "Kohvioad Arabica Origin Edition Brazil, PAULIG, 1kg" (24.90 €) |
| Rimi "Kohvioad Arabica Origin Colombia Paulig 1kg" (24.99 €) | Selver "Kohvioad Arabica Origin Edition Colombia, PAULIG, 1kg" (24.90 €) |

### Tea & cocoa (21)

| Item A | Item B |
|---|---|
| Barbora "Must purutee TWININGS Earl Grey,100g" (6.39 €) | Selver "Earl Grey purutee, TWININGS, 100 g" (5.29 €) |
| Barbora "Must pur.TWININGS English Breakfast,100g" (6.39 €) | Coop "Twinings English Breakfast must tee100g" (6.49 €) |
| Barbora "Must Tseiloni tee DILMAH Premium 30x2g" (1.23 €) | Coop "Must tee Dilmah Premium Ceylon 30*2g" (2.05 €) |
| Barbora "Must Tseil.tee DILMAH Premium 25x2g" (1.55 €) | Rimi "Tee must Dilmah Premium 25x2g" (2.59 €) |
| Barbora "Must tseil.tee DILMAH Premium 50x2g" (2.57 €) | Rimi "Tee must Dilmah Premium 50x2g" (4.29 €) |
| Barbora "Must tee LIPTON Mango 20x1.7g" (3.09 €) | Rimi "Must tee virsiku-mango Lipton 20x1,7g" (3.19 €) |
| Barbora "Must tee TEA MOMENTS assortii 15x2.24g" (3.99 €) | Coop "Rohelise tee assortii Tea Moments 15*2.24g" (3.15 €) |
| Barbora "Must tee TEA MOMENTS assortii 15x2.24g" (3.99 €) | Coop "Musta tee assortii Tea Moments 15*2.24g" (3.15 €) |
| Barbora "Roheline tee HYLEYS suureleheline 100g" (1.75 €) | Coop "Hyleys roheline tee 100g jasmiini" (1.95 €) |
| Barbora "Rohel.tee The Island of Tea BASILUR 100g" (4.59 €) | Selver "Roheline purutee The Island of Tea, BASILUR, 100 g" (4.56 €) |
| Barbora "Roheline Tseiloni tee DILMAH 100g" (2.01 €) | Selver "Roheline Tseiloni purutee, DILMAH, 100 g" (3.34 €) |
| Barbora "Roh.tee GREENFIELD Jasmine Dream,25x2g" (2.45 €) | Coop "Roheline tee Greenfield Jasmine Dream 25*2g" (2.39 €) |
| Barbora "Roheline tee HYLEYS MoroccanLegend100g" (5.09 €) | Coop "Hyleys roheline tee 100g jasmiini" (1.95 €) |
| Barbora "Rohel.tee TEA MOMENTS assortii 15x2.24g" (3.99 €) | Coop "Rohelise tee assortii Tea Moments 15*2.24g" (3.15 €) |
| Barbora "Rohel.tee TEA MOMENTS assortii 15x2.24g" (3.99 €) | Coop "Musta tee assortii Tea Moments 15*2.24g" (3.15 €) |
| Barbora "Tee maasika-vaarikamaits.LOYD pür.20x2g" (2.75 €) | Rimi "Tee puuvilja vaarika&maasika Loyd 20x2g" (2.79 €) |
| Barbora "Tee põldmarja-mustikamaits.LOYDpür.20x2g" (2.75 €) | Rimi "Tee puuvilja põldmarja&mustika Loyd 20x2g" (2.79 €) |
| Barbora "Puuviljatee maasika&rabarberi LOYD20x2g" (2.75 €) | Coop "Marjatee Loyd 20*2g maasika-rabarberimaits." (2.69 €) |
| Barbora "Kakaojook NESQUIK 600g" (8.49 €) | Selver "Lahustuv kakaojook, NESQUIK, 600g" (8.49 €) |
| Rimi "Must tee Earl Grey Ahmad 100g" (3.29 €) | Selver "Must purutee Earl Grey, AHMAD, 100 g" (3.39 €) |
| Rimi "Roheline tee Gunpowder Ahmad 100g" (3.29 €) | Selver "Roheline purutee Gunpowder, AHMAD, 100 g" (3.79 €) |

### Cereals & oats (30)

| Item A | Item B |
|---|---|
| Barbora "Hommikuhelbed Chocapic NESTLE 375g" (4.29 €) | Rimi "Hommikueine Nestle Chocapic 375g" (3.45 €) |
| Barbora "Hommikuhelbed Cookie Crisp NESTLE 375g" (4.29 €) | Rimi "Hommikueine Nestle Cookie Crisp 375g" (4.29 €) |
| Barbora "Hommikuhelbed Lion NESTLE 400g" (4.29 €) | Rimi "Hommikueine Nestle Lion 400g" (4.29 €) |
| Barbora "Hommikuhelbed NESTLE Cookie Crisp 625g" (6.19 €) | Rimi "Hommikueine Nestle Cookie Crisp 625g" (6.19 €) |
| Barbora "Teraviljahelbed Froot LoopsKELLOGG'S375g" (5.49 €) | Rimi "Hommikuhelbed Froot Loops Kellogg's 375g" (5.49 €) |
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
| Barbora "Riisihelbed BALTIX 500g" (1.49 €) | Rimi "Täisterakaerahelbed Baltix 500g" (1.29 €) |
| Barbora "Riisihelbed BALTIX 500g" (1.49 €) | Selver "Hernehelbed, BALTIX, 500 g" (1.39 €) |
| Barbora "Kaerah. kiirpuder õuna VESKI MATI 45g" (0.63 €) | Selver "Kiirpuder Õuna, VESKI MATI, 45 g" (0.63 €) |
| Barbora "Täistera 4-viljahelbed TARTU MILL 500g" (1.29 €) | Rimi "Kiirtatrahelbed täistera Tartu Mill 500g" (2.89 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Coop "Täisterakaerahelbed Veski Mati 500g" (1.49 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Rimi "Kaheksaviljahelbed Veski Mati 500g" (1.45 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Rimi "Odrahelbed Veski Mati 500g" (2.25 €) |
| Barbora "Tatrahelbed VESKI MATI 500g" (2.79 €) | Selver "Täistera Tatrahelbed, VESKI MATI, 500 g" (2.79 €) |
| Barbora "Kiirkaerahelbepuder AXA õuna-kaneeli 40g" (0.56 €) | Selver "Kiirkaerahelbepuder õuna ja kaneeli, AXA, 40 g" (0.56 €) |
| Barbora "Müsli šok.pähklitega Premium AXA 330g" (2.73 €) | Rimi "Granola müsli šokolaadi-pähklitega Axa 330g" (1.99 €) |
| Coop "Hommikuhelbed Start 500g mustika-vanilje" (3.49 €) | Rimi "Hommikuhelbed mustika ja vanilje Start! 500g" (3.45 €) |
| Coop "Hommikusöök Kakaoga teraviljahelbed Oho 500g+100g" (3.65 €) | Rimi "Teraviljahelbed kakaoga Oho 500g" (3.59 €) |
| Coop "Täisterakaerahelbed Veski Mati 500g" (1.49 €) | Rimi "Kaheksaviljahelbed Veski Mati 500g" (1.45 €) |
| Coop "Täisterakaerahelbed Veski Mati 500g" (1.49 €) | Rimi "Odrahelbed Veski Mati 500g" (2.25 €) |
| Rimi "Hommikusöök nisu meega Oho 500g" (4.29 €) | Selver "Nisu meega, OHO, 500 g" (4.26 €) |

### Canned food (16)

| Item A | Item B |
|---|---|
| Barbora "Konsev.mais BONDUELLE 670g" (3.49 €) | Rimi "Mais Bonduelle 670g/570g" (2.95 €) |
| Barbora "Valged oad tomatikastmes HEINZ 415g" (2.39 €) | Rimi "Oad tomatikastmes küpsetatud Heinz 415g" (2.35 €) |
| Barbora "Tomatid omas mahlas MINU 680g" (2.69 €) | Coop "Minu Tomat omas mahlas 680g" (2.69 €) |
| Barbora "Marin.kirsstomatid NIZHYN 450g" (2.55 €) | Rimi "Kabatšokipüree Nizhyn 450g" (2.49 €) |
| Barbora "Marin.kirsstomatid NIZHYN 450g" (2.55 €) | Rimi "Letšo Nizhyn 450g" (3.59 €) |
| Barbora "Küüslauguküüned äädikas GOURMANTE 100g" (1.89 €) | Selver "Küüslaugud äädikas, GOURMANTE, 100 g" (1.92 €) |
| Barbora "Viil.artišokid SACLA 285g" (4.19 €) | Rimi "Artišokid marineeritud Sacla 285g/171g" (4.59 €) |
| Barbora "Sibulad äädikas GOURMANTE 100g" (1.79 €) | Selver "Küüslaugud äädikas, GOURMANTE, 100 g" (1.92 €) |
| Coop "Sunfood Punased Kidney oad 400g" (1.65 €) | Rimi "Oad punased Sunfood 400g/240g" (1.65 €) |
| Coop "Roheline hernes Bonduelle 660g" (2.99 €) | Rimi "Hernes konserveeritud Bonduelle 660g / 465g" (2.99 €) |
| Coop "Mais Bonduelle 170g" (1.65 €) | Rimi "Mais magus Bonduelle 170g / 140g" (1.35 €) |
| Coop "Roheline hernes Bonduelle 400g" (1.99 €) | Rimi "Konserveeritud hernes Bonduelle 400g / 265g" (1.99 €) |
| Coop "Küpsetatud aedoad tomatikastmes Heinz 415g" (2.35 €) | Rimi "Oad tomatikastmes küpsetatud Heinz 415g" (2.35 €) |
| Rimi "Valged oad tomatikastmes Bonduelle 425ml/430g" (2.19 €) | Selver "Aurutatud valged oad, BONDUELLE, 425 ml" (2.15 €) |
| Rimi "Mais ja hernes Bonduelle 425ml/285g" (2.89 €) | Selver "Mais, hernes ja paprika, BONDUELLE, 425 ml" (2.89 €) |
| Rimi "Šampinjonid marin. trad. Bonduelle 540g/290g" (4.49 €) | Selver "Šampinjonid traditsiooniliselt marineeritud, BONDUELLE, 540 g" (4.49 €) |

### Sauces & condiments (28)

| Item A | Item B |
|---|---|
| Barbora "Magustsilli kaste CHUMAK 200g" (1.29 €) | Coop "Magushapu kaste Chumak 200g" (1.25 €) |
| Barbora "Adžika gruusiapärane MAADLEX 350g" (1.85 €) | Selver "Gruusia adžika, MAADLEX, 350 g" (1.66 €) |
| Barbora "Korma kaste SANTA MARIA 360g" (4.25 €) | Coop "Korma kaste Santa Maria 360g+maitseainesegu" (4.29 €) |
| Barbora "BBQ kaste burboon.viski SANTA MARIA 350g" (4.25 €) | Rimi "Kaste BBQ Bourbon Whiskey Santa Maria 350g" (4.25 €) |
| Barbora "BBQ kaste burboon.viski SANTA MARIA 350g" (4.25 €) | Selver "BBQ kaste burbooni viski, SANTA MARIA, 350g" (4.25 €) |
| Barbora "Võikana kaste SANTA MARIA 360g" (4.25 €) | Coop "Võikana kaste Santa Maria 360g+maitseainesegu" (4.29 €) |
| Barbora "Pastakaste Arrabbiata BARILLA 400g" (3.75 €) | Selver "Pastakaste Arrabiata, BARILLA, 400 g" (2.99 €) |
| Barbora "Pastakaste Mediterranee BARILLA 400g" (4.15 €) | Selver "Pastakaste Arrabiata, BARILLA, 400 g" (2.99 €) |
| Barbora "Tomatipasta MUTTI 130g" (2.09 €) | Coop "Tomatipasta Mutti 130g topeltkontsentreeritud" (1.95 €) |
| Barbora "Pestokaste paprika ricotta PANZANI 190g" (3.55 €) | Coop "Pestokaste Panzani 190g paprika-ricotta juustu" (3.55 €) |
| Barbora "Riisiäädikas THAI-CHOICE 300ml" (2.99 €) | Coop "Sojakaste Thai Choice 300ml" (3.59 €) |
| Barbora "Ketšup BALTIKA 500g" (1.85 €) | Rimi "Ketšup originaal Baltika 500g" (2.39 €) |
| Barbora "Mahe ketšup HELLMANN'S 477g" (2.99 €) | Selver "Mahedamaitseline ketšup, HELLMANN'S, 477 g" (3.29 €) |
| Barbora "Vürtsikas ketšup HELLMANN'S 470g" (2.99 €) | Rimi "Ketšup terav Hellmann's 470g" (2.99 €) |
| Barbora "Mahe ketšup HELLMANN'S 833g" (4.89 €) | Selver "Mahedamaitseline ketšup, HELLMANN'S, 833 g" (4.89 €) |
| Barbora "Sinep kange MAADLEX 75g" (1.15 €) | Selver "Sinep, MAADLEX, 75 g" (1.03 €) |
| Barbora "Küüslaugu Salatikaste FELIX 375g" (1.94 €) | Rimi "Salatikaste Caesari Felix 375g" (2.55 €) |
| Barbora "Küüslaugu Salatikaste FELIX 375g" (1.94 €) | Selver "Küüslaugu kaste, FELIX, 375 g" (2.29 €) |
| Barbora "Majonees LEMMIK Provansaal, 210g" (1.29 €) | Rimi "Majonees klassik. Provansaal Lemmik 210g" (1.29 €) |
| Barbora "MajoneesLEMMIK Provansaal Orig.300g tops" (1.69 €) | Selver "Majonees Provansaal (tops), LEMMIK, 300 g" (1.72 €) |
| Barbora "Majonees BALTIKA Provansaal Orig.,300g" (1.89 €) | Selver "Majonees Kuldne provansaal, BALTIKA, 300 g" (1.79 €) |
| Barbora "Majonees BALTIKA Provansaal Klas.,300g" (1.79 €) | Selver "Majonees Kuldne provansaal, BALTIKA, 300 g" (1.79 €) |
| Barbora "Majonees BBQ LEMMIK 200g" (1.49 €) | Rimi "Majonees küüslaugu Lemmik 200g" (1.59 €) |
| Barbora "Dipikaste TERE Dipp-Tops papr.-ranch200g" (1.75 €) | Selver "Tere Dipp-Tops paprika ranch-dipikaste, TERE, 200 g" (1.78 €) |
| Barbora "Ameerika burgerikaste HEINZ 418g/400ml" (4.79 €) | Coop "Ameerikapärane burgerikaste Heinz 418g" (4.95 €) |
| Coop "Ketshup Originaal Baltika 500g" (2.85 €) | Rimi "Ketšup originaal Baltika 500g" (2.39 €) |
| Coop "Ketshup Salvest 360g" (2.55 €) | Rimi "Ketšup Salvest 360g" (2.25 €) |
| Rimi "Kaste BBQ Bourbon Whiskey Santa Maria 350g" (4.25 €) | Selver "BBQ kaste burbooni viski, SANTA MARIA, 350g" (4.25 €) |

### Spices (30)

| Item A | Item B |
|---|---|
| Barbora "Maitseainesegu Podravka VEGETA 75g" (0.59 €) | Rimi "Maitseainesegu Vegeta 75g" (0.99 €) |
| Barbora "Kana-ja lihamaits.veskis SANTA MARIA 75g" (4.65 €) | Selver "Kana ja liha maitseaine veskis, SANTA MARIA, 75 g" (4.69 €) |
| Barbora "Liham.ürdi-küüslaugu SANTA MARIA 20g" (1.05 €) | Rimi "Lihamaitseaine ürdi-küüslaugu Santa Maria 20g" (0.79 €) |
| Barbora "Lihamaits.tüümianiga SANTA MARIA 25g" (0.95 €) | Selver "Lihamaitseaine tüümianiga, SANTA MARIA, 25 g" (0.95 €) |
| Barbora "Univers. maitseainesegu SANTA MARIA 78g" (5.29 €) | Rimi "Universaalne maitseainesegu Santa Maria 78g" (5.29 €) |
| Barbora "Maitseained VEGETA Fine Blend 200g" (1.74 €) | Coop "Maitseaine Vegeta Fine Blend 200g" (2.59 €) |
| Barbora "Maitseainesegu Fajita MAGGI AirFryer 27g" (1.49 €) | Coop "Fajita täidise maitseainesegu Maggi 27g" (1.55 €) |
| Barbora "Peen.till KOTANYI 11g" (1.39 €) | Coop "Peenestatud till Kotanyi 11g" (1.45 €) |
| Barbora "Küüslauk KOTANYI, 28g" (1.59 €) | Rimi "Hakitud küüslauk Kotanyi 28g" (1.55 €) |
| Barbora "Nelk KOTANYI, 14g" (1.59 €) | Rimi "Tüümian Kotanyi 14g" (1.55 €) |
| Barbora "Oregano MEIRA 5g" (0.80 €) | Coop "Majoraan Meira 5g" (0.75 €) |
| Barbora "Tomati ürdisegu veskis SANTA MARIA 69g" (5.89 €) | Selver "Tomati ja ürdisegu veskis, SANTA MARIA, 69 g" (5.89 €) |
| Barbora "Mahe paprika jahv.SANTA MARIA 36g" (3.69 €) | Rimi "Paprika jahvatatud Santa Maria mahe 36g" (3.69 €) |
| Barbora "Kivisool veskis SANTA MARIA 455g" (6.39 €) | Rimi "Kivisool jämedateral. veskis Santa Maria 455g" (6.69 €) |
| Barbora "Kivisool veskis SANTA MARIA 455g" (6.39 €) | Selver "Kivisool, SANTA MARIA, 455 g" (6.39 €) |
| Barbora "Adygei sool küüslauguga SALDVA 130g" (1.09 €) | Rimi "Sool Saldva küüslauguga 130g" (1.15 €) |
| Barbora "Adygei sool ürtidega SALDVA 130g" (1.09 €) | Rimi "Sool Saldva ürtidega 130g" (1.15 €) |
| Barbora "Söögisool jodeeritud KUJAWSKA 1kg" (0.48 €) | Coop "Söögisool Kujawska 1kg" (0.75 €) |
| Barbora "Sool Himaalaja roosa DROGHERIA 90g" (2.89 €) | Coop "Himaalaja roosa sool Drogheria 90g veskis" (2.89 €) |
| Barbora "Tšillipipar veskis SANTA MARIA ,70g" (4.65 €) | Selver "Tšillimaitseaine veskis, SANTA MARIA, 70 g" (4.69 €) |
| Barbora "Must pipar veskis SANTA MARIA, 210g" (16.39 €) | Rimi "Tellicherry pipar veskis Santa Maria 210g" (16.49 €) |
| Barbora "Must peen pipar MEIRA 27g" (1.65 €) | Coop "Must pipar purustatud Meira 27g" (1.85 €) |
| Barbora "Must pipar jahv.SANTA MARIA 36g" (2.89 €) | Rimi "Must pipar jahvatatud Santa Maria 36g" (2.89 €) |
| Barbora "Roosa pipar SANTA MARIA 21g" (3.79 €) | Selver "Rosee pipar, SANTA MARIA, 21 g" (3.79 €) |
| Barbora "Kanamarinaad SANTA MARIA Klassik 75g" (1.09 €) | Selver "Klassikaline kanamarinaad, SANTA MARIA, 75 g" (1.05 €) |
| Barbora "Kuivmarinaadisegu ürt. SANTA MARIA 22g" (1.25 €) | Selver "Universaalne kuivmarinaadisegu, SANTA MARIA, 22 g" (1.25 €) |
| Barbora "Kuivmarinaadisegu kanale SANTA MARIA30g" (1.25 €) | Selver "Kuivmarinaadisegu ribidele, SANTA MARIA, 30 g" (1.25 €) |
| Coop "Maitseaine sealihale Podravka Vegeta Natur 20g" (0.75 €) | Selver "Maitseaine Vegeta Natur mozzarellale, PODRAVKA, 20 g" (0.66 €) |
| Coop "Must pipar jahvatatud Santa Maria 36g purk" (2.99 €) | Rimi "Must pipar jahvatatud Santa Maria 36g" (2.89 €) |
| Rimi "Vasabi ja seesami maitseaine. Santa Maria 44g" (3.79 €) | Selver "Vasabi ja seesami maitseainesegu, SANTA MARIA, 44 g" (3.49 €) |

### Jam & honey & spreads (11)

| Item A | Item B |
|---|---|
| Barbora "Mustikapüree 100% BONNE 0.5L" (6.59 €) | Selver "Ananassipüree, BONNE, 500 ml" (4.99 €) |
| Barbora "Pirnipüree 100% BONNE 0.5L" (3.89 €) | Selver "Ananassipüree, BONNE, 500 ml" (4.99 €) |
| Barbora "Granadillikaste PURE 300g" (3.89 €) | Coop "Pure Puratos Granadillikaste 300g" (3.55 €) |
| Barbora "Banaanipüree BONNE 0.5L" (4.35 €) | Selver "Ananassipüree, BONNE, 500 ml" (4.99 €) |
| Barbora "Maapähklikreem SANTE 350g" (3.15 €) | Coop "Sante Smooth maapähklikreem 350g" (3.15 €) |
| Barbora "Pähklikreem MILKA 350g" (5.29 €) | Coop "Shokolaadi-pähklikreem Milka 350g" (4.85 €) |
| Barbora "Pähklikreem MILKA 350g" (5.29 €) | Rimi "Sarapuupähklikreem Milka 350g" (5.29 €) |
| Barbora "Taruvaiguga mesi MEVEDA 300g" (5.29 €) | Coop "Meveda mesi taruvaiguga 300g Eesti" (5.19 €) |
| Barbora "Mesi NORDMEL 450g" (6.59 €) | Selver "Mesi tops, NORDMEL, 450 g" (6.59 €) |
| Coop "Metsamarjamoos Küllus 400g" (4.59 €) | Selver "Metspohlamoos, KÜLLUS, 400 g" (5.68 €) |
| Coop "Nutella shokolaadi-pähklikreem 230g" (4.15 €) | Rimi "Šokolaadi-pähklikreem Nutella 230g" (3.89 €) |

### Baking supplies (4)

| Item A | Item B |
|---|---|
| Barbora "Rummi lõhna- ja maitseaine, DR.OETKER 8ml" (1.19 €) | Rimi "Vanilli lõhna- ja maitseaine Dr. Oetker 8 ml" (1.39 €) |
| Barbora "Mõrumandli lõhna- ja maitseaine, DR.OETKER 8ml" (1.19 €) | Rimi "Vanilli lõhna- ja maitseaine Dr. Oetker 8 ml" (1.39 €) |
| Barbora "Tordikreem vaniljemaits.DR.OETKER 105g" (2.09 €) | Rimi "Vanillimaitseline tordikreem Dr. Oetker 105g" (2.39 €) |
| Barbora "Purpur nonparell MEIRA 60g" (1.88 €) | Selver "Lilla nonparell, MEIRA, 60 g" (1.88 €) |

### Chocolate (20)

| Item A | Item B |
|---|---|
| Barbora "Šokolaadibatoonike King Size TUPLA 85g" (1.79 €) | Rimi "Šokolaadibatoon Tupla King Size 85g" (1.79 €) |
| Barbora "Šokolaadibatoonike King Size TUPLA 85g" (1.79 €) | Selver "Šokolaad King Size, TUPLA, 85g" (1.85 €) |
| Barbora "Šokolaadibatoonike SNICKERS 50g" (1.29 €) | Rimi "Šokolaadibatoon Snickers 50g" (1.29 €) |
| Barbora "Šokolaadibatoonike TWIX 50g" (1.29 €) | Rimi "Šokolaadibatoon Twix 50g" (1.19 €) |
| Barbora "Šok.batoon.White Lion 2pack NESTLE 60g" (1.45 €) | Coop "Shok.batoon Lion White 2Pack Nestle 60g" (1.45 €) |
| Barbora "Šokolaadibatoon multipack LION 5x30g" (2.99 €) | Rimi "Šokolaadibatoon Lion multipakk 5x30g" (2.99 €) |
| Barbora "Šokolaadibatoon Cookie dough KIT KAT 42g" (0.75 €) | Selver "Cookie Dough batoon, KIT KAT, 42g" (1.29 €) |
| Barbora "Šokolaad MILKA maasika 100g" (2.99 €) | Rimi "Šokolaad karamelli Milka 100g" (2.35 €) |
| Barbora "Šokolaad Caramel MILKA 100g" (2.35 €) | Rimi "Šokolaad karamelli Milka 100g" (2.35 €) |
| Barbora "Piimašokolaad Chips Ahoy MILKA 100g" (2.99 €) | Selver "Šokolaad Chips Ahoy!, MILKA, 100g" (2.19 €) |
| Barbora "Piimašok.Oreo küpsisega MILKA 92g" (2.35 €) | Coop "Piimashok.Milka Oreo 92g küpsisega" (2.99 €) |
| Barbora "Piimašokolaad metsapähkl. MILKA 90g" (2.65 €) | Rimi "Piimašokolaad Milka 90g" (2.29 €) |
| Barbora "Piimašokolaad Biscoff MILKA 90g" (2.59 €) | Coop "Milka Piimashokolaad Biscoff 90g" (2.99 €) |
| Barbora "Piimašokolaad Biscoff MILKA 90g" (2.59 €) | Rimi "Piimašokolaad Milka 90g" (2.29 €) |
| Barbora "Piimašokolaad Daim MARABOU 170g" (4.69 €) | Coop "Marabou Daim piimashokolaad 170g" (4.69 €) |
| Barbora "Tume šokolaad Bitter 56% KALEV 190g" (4.99 €) | Coop "Tume shok.Bitter 56% Kalev 190g" (4.89 €) |
| Barbora "Tume šok.purustatud metspähk. KALEV 270g" (6.99 €) | Rimi "Tume šok. purustatud metspähklite. Kalev 270g" (6.99 €) |
| Barbora "Tume šokolaad Maiuspala KALEV 100g" (2.95 €) | Rimi "Tume šokolaad kirsi Kalev 100g" (2.69 €) |
| Barbora "Valge šok.Pistaatsia SCHOGETTEN 100g" (2.69 €) | Coop "Valge shok.Schogetten 100g pistaatsia" (2.69 €) |
| Rimi "Šokolaadibatoon Tupla King Size 85g" (1.79 €) | Selver "Šokolaad King Size, TUPLA, 85g" (1.85 €) |

### Candy (30)

| Item A | Item B |
|---|---|
| Barbora "Närimiskommid Party Animals TRULY 110g" (1.49 €) | Rimi "Kummikommid Red Band Truly Party Animals 110g" (1.35 €) |
| Barbora "Nätsukomm Maoam Kracher HARIBO 200g" (2.39 €) | Coop "Närimiskomm Maoam Kracher Haribo 200g" (2.39 €) |
| Barbora "Nätsukommid TUTTI FRUTTI 15g" (0.41 €) | Rimi "Närimiskommid Red Band Tutti Frutti 15g" (0.39 €) |
| Barbora "Närimiskomm FRITT 70g" (1.59 €) | Coop "Nätsukomm Fritt 70g" (1.39 €) |
| Barbora "Närimiskomm FRITT 70g" (1.59 €) | Rimi "Närimiskommid Fritt 70g" (1.59 €) |
| Barbora "Vaarikakangikesed VERI BERI 50g" (1.99 €) | Selver "Kirsikangikesed, VERI BERI, 50 g" (1.92 €) |
| Barbora "Vaarikakangikesed VERI BERI 50g" (1.99 €) | Selver "Mustsõstrakangikesed, VERI BERI, 50 g" (1.92 €) |
| Barbora "Maasikakangikesed VERI BERI 50g" (1.99 €) | Selver "Kirsikangikesed, VERI BERI, 50 g" (1.92 €) |
| Barbora "Maasikakangikesed VERI BERI 50g" (1.99 €) | Selver "Mustsõstrakangikesed, VERI BERI, 50 g" (1.92 €) |
| Barbora "Närimiskommid Smoothies SKITTLES 95g" (2.29 €) | Coop "Drazee Skittles Smoothies 95g" (2.29 €) |
| Barbora "Kummikompv. Dracula TROLLI 200g" (1.99 €) | Selver "Kummikommid Dracula, TROLLI, 200 g" (2.19 €) |
| Barbora "Mustikakangikesed VERI BERI 50g" (1.99 €) | Selver "Kirsikangikesed, VERI BERI, 50 g" (1.92 €) |
| Barbora "Mustikakangikesed VERI BERI 50g" (1.99 €) | Selver "Mustsõstrakangikesed, VERI BERI, 50 g" (1.92 €) |
| Barbora "Kummikommid Starmix HARIBO 175g" (2.39 €) | Rimi "Kummikommid Worms Haribo 175g" (2.35 €) |
| Barbora "Närimiskompvekid Raupies HARIBO 160g" (2.35 €) | Rimi "Kummikommid Raupies Haribo 160g" (2.35 €) |
| Barbora "Närimiskomm Discovery MENTOS 37.5g" (0.89 €) | Rimi "Närimiskommid Mentos Discovery 37,5g" (0.99 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Coop "Kummikomm Ussid Haribo 175g" (2.39 €) |
| Barbora "Kummikommid ussid HARIBO 175g" (2.35 €) | Rimi "Kummikommid Worms Haribo 175g" (2.35 €) |
| Barbora "Kummikommid Kiss TROLLI 200g" (1.99 €) | Selver "Kummikommid Dracula, TROLLI, 200 g" (2.19 €) |
| Barbora "Kommisegu 7 lemmikut KALEV 1kg" (15.79 €) | Rimi "Kommidesegu Kalev 7 lemmikut 1kg" (9.99 €) |
| Barbora "Kommisegu 7 lemmikut KALEV 1kg" (15.79 €) | Selver "7 lemmikut kaalu, KALEV, 1 kg" (14.77 €) |
| Barbora "Pralineekompvek Komeet KALEV 175g" (2.85 €) | Rimi "Pralineekommid Kalev Komeet 175g" (1.99 €) |
| Barbora "Pralineekompvek Teekonna KALEV 175g" (2.85 €) | Rimi "Pralineekommid Kalev Teekonna 175g" (2.89 €) |
| Barbora "Pralineekompvek Oravake KALEV 175g" (3.99 €) | Rimi "Pralineekommid Kalev Oravake 175g" (3.99 €) |
| Barbora "Vahvlikompvek Ananass KALEV 150g" (3.79 €) | Rimi "Vahvlikommid Kalev Ananass 150g" (1.99 €) |
| Barbora "Pralineekompvek Kalev KALEV 175g" (2.95 €) | Rimi "Pralineekommid Kalev 175g" (2.85 €) |
| Barbora "Närimiskompv.puuviljam.Drako KALEV110g" (1.55 €) | Coop "Närimiskompv.Drako Kalev 110g koolamaitseline" (1.59 €) |
| Barbora "Närimiskompv.puuviljam.Drako KALEV110g" (1.55 €) | Coop "Närimiskompv.Drako Kalev 110g puuviljamaits." (1.59 €) |
| Barbora "Batoonike Mesikäpp KALEV 150g" (2.45 €) | Rimi "Batoonikesed Kalev Mesikäpp 150g" (2.45 €) |
| Barbora "Batoonike Mesikäpp KALEV 150g" (2.45 €) | Rimi "Vahvlikommid Kalev Mesikäpp 150g" (3.79 €) |

### Biscuits (23)

| Item A | Item B |
|---|---|
| Barbora "Juustumaitselised kreekrid CROCO 400g" (3.29 €) | Selver "Soolakreeker juustumaitseline, CROCO, 400 g" (3.79 €) |
| Barbora "Rõngiku tükid BBQ maits.ELEPHANT 75g" (1.69 €) | Coop "Rõngiku tükid Elephant glasuuritud 75g BBQ maits." (1.65 €) |
| Barbora "Rõngiku tükid juustumaits.ELEPHANT 75g" (1.69 €) | Coop "Rõngiku tükid Elephant 75g Sriracha juustu maits." (1.65 €) |
| Barbora "Kondenspiimamait. küpsised SELGA, 180g" (1.25 €) | Rimi "Vormiküpsised kondenspiima Selga 180g" (1.15 €) |
| Barbora "Šokolaadimaitselised küpsised SELGA 180g" (1.25 €) | Rimi "Vormiküpsised šokolaadi Selga 180g" (1.15 €) |
| Barbora "Vahvlid vaniljekr.Kooli MARMITON 110g" (1.49 €) | Rimi "Vahvlid Kooli Marmiton 110g" (1.49 €) |
| Barbora "Küpsised Choco Grain MILKA 126g" (2.59 €) | Rimi "Kaeraküpsised Milka Choco Grain 126g" (2.59 €) |
| Barbora "Biskviitküpsis Tender Moo MILKA 140g" (2.99 €) | Rimi "Küpsis Milka Tender Moo 140g" (2.99 €) |
| Barbora "Küpsis pähkli kreemitäidisega KALEV205g" (2.59 €) | Coop "Küpsis Kalev kreemitäidisega 205g vanillimaits." (2.65 €) |
| Barbora "Küpsis Amaretti mandel LAURIERI 200g" (3.09 €) | Coop "Küpsis Amaretti Laurieri 200g" (3.09 €) |
| Barbora "Küpsis vanill.kreemitäidisega KALEV 205g" (2.59 €) | Coop "Küpsis Kalev kreemitäidisega 205g vanillimaits." (2.65 €) |
| Barbora "Küpsised Original OREO 154g" (2.49 €) | Selver "Küpsised Golden, OREO, 154 g" (1.89 €) |
| Barbora "Präänik šokolaadi VÄIKE VÄÄNIK 250g" (1.15 €) | Coop "Präänik Vanaema Väike Väänik 250g" (1.25 €) |
| Barbora "Präänikud Vanaema VÄIKE VÄÄNIK 250g" (1.39 €) | Coop "Präänik Vanaema Väike Väänik 250g" (1.25 €) |
| Barbora "Präänik Keeleke MARAKRATT 1kg" (3.99 €) | Coop "Präänik Keeleke Marakratt 1kg vaniljemaitseline" (4.09 €) |
| Barbora "Präänik keeleke šokol.maits.MARAKRATT1kg" (3.99 €) | Coop "Präänik Keeleke Marakratt 1kg vaniljemaitseline" (4.09 €) |
| Barbora "Präänik keeleke ahjupiimam.MARAKRATT 1kg" (3.99 €) | Coop "Präänik Keeleke Marakratt 1kg vaniljemaitseline" (4.09 €) |
| Coop "Küpsis Kalev kreemitäidisega 205g vanillimaits." (2.65 €) | Rimi "Küpsised vanilli kreemitäidisega Kalev 205g" (2.59 €) |
| Coop "Kreeker Scrocchi Laurieri 175g rosmariiniga" (2.45 €) | Rimi "Kreekerid Laurieri Scrocchi rosmariiniga 175g" (2.39 €) |
| Coop "Küpsis Marabou Daim 184g" (4.49 €) | Rimi "Küpsised Daim Marabou 184g" (4.49 €) |
| Rimi "Kaeraküpsis glasuuriga Marmiton 300g" (2.65 €) | Selver "Kaeraküpsised glasuuriga, MARMITON, 300 g" (2.29 €) |
| Rimi "Küpsised Daim Marabou 184g" (4.49 €) | Selver "Küpsised Daim'ga, MARABOU, 184 g" (3.49 €) |
| Rimi "Vahvlipalad Original Fasupala 199g" (4.09 €) | Selver "Original vahvlipala, FASUPALA, 199 g" (4.09 €) |

### Chips & snacks (27)

| Item A | Item B |
|---|---|
| Barbora "Kart.krõpsud grillimaits. VIGUR 70g" (1.49 €) | Coop "Kartulikrõps Vigur 70g grillimaitseline" (1.69 €) |
| Barbora "Kartulisnäkk kanamaits. ESTRELLA, 110g" (2.45 €) | Rimi "Kartulisnäkk grillkana maits.Estrella 110g" (1.89 €) |
| Barbora "Kartulikrõpsud BBQ PRINGLES 165g" (3.19 €) | Rimi "Kart.krõpsud BBQ maitselised Pringles 165g" (3.19 €) |
| Barbora "Kartulisnäkk sool. Pom Bear ESTRELLA65g" (2.69 €) | Coop "Kartulisnäkk Pom-Bear Estrella 65g juustumaits." (2.19 €) |
| Barbora "Kartulikrõps. Original sool.PRINGLES70g" (1.99 €) | Rimi "Krõpsud Pringles Original 70g" (1.99 €) |
| Barbora "Kartulikrõpsud hapuk.-sibul.PRINGLES70g" (1.99 €) | Rimi "Krõpsud hapukoore-sibula maits. Pringles 70g" (1.99 €) |
| Barbora "Kartulikrõpsud paprika PRINGLES 70g" (1.99 €) | Rimi "Krõpsud Pringles Original 70g" (1.99 €) |
| Barbora "Kartulikrõpsud tillimaits. ESTRELLA 180g" (3.75 €) | Rimi "Kartulikrõpsud Estrella peekonimaits. 180g" (3.59 €) |
| Barbora "Kartulikrõpsud tillimaits. ESTRELLA 180g" (3.75 €) | Selver "Kartulikrõps suitsupeekonimaitseline, ESTRELLA, 180 g" (3.75 €) |
| Barbora "Kartulikrõpsud Ranch ESTRELLA 250g" (4.59 €) | Selver "Kartulikrõpsud sakilised Ranch, ESTRELLA, 250 g" (4.49 €) |
| Barbora "Kart.krõpsud tšilli/tsitrus.TAFFEL 180g" (2.75 €) | Rimi "Kartulikrõpsud tšilli-tsitrus Taffel 180g" (2.85 €) |
| Barbora "Maisisnäkid juustumaits. ESTRELLA 110g" (2.45 €) | Coop "Maisikrõps Estrella 110g juustumaitseline" (2.45 €) |
| Barbora "Maisisnäkid juustumaits. ESTRELLA 110g" (2.45 €) | Rimi "Maisikrõpsud juustumaitselised Estrella 110g" (1.89 €) |
| Barbora "Maisipallid hapuk.-sibul. TAFFEL 165g" (2.99 €) | Coop "Taffel maisipallid 165g hapukoore-sibula" (2.99 €) |
| Barbora "Magus mikropopkorn ESTRELLA 90g" (1.19 €) | Rimi "Mikropopkorn soolane Estrella 90g" (1.19 €) |
| Barbora "Mikropopkorn juustu maits. ESTRELLA 90g" (1.19 €) | Rimi "Mikropopkorn soolane Estrella 90g" (1.19 €) |
| Barbora "Küüslauguleib BALSNACK 80g" (0.99 €) | Coop "Küüslauguleivad BalSnack 80g" (1.05 €) |
| Barbora "Juustu-sibulamaitsel.leib BALSNACK80g" (0.89 €) | Coop "Leivakrõps BalSnack 80g juustu-sibulamaitseline" (0.89 €) |
| Barbora "Küüslauguleivad MARMITON 300g" (3.99 €) | Coop "Küüslauguleivad Marmiton 300g ämbris" (4.19 €) |
| Barbora "Seakamarakrõps. pipra ja soolaga OSSI40g" (1.19 €) | Rimi "Seakamarakrõpsud pipra ja soolaga Ossi 40g" (1.35 €) |
| Coop "Maisikrõps Estrella 110g juustumaitseline" (2.45 €) | Rimi "Maisikrõpsud juustumaitselised Estrella 110g" (1.89 €) |
| Coop "Estrella kartulikr.180g tilliga" (3.75 €) | Rimi "Kartulikrõpsud Estrella tilliga 180g" (3.59 €) |
| Rimi "Maisikrõps maguspipra maitseline Cheetos 165g" (2.75 €) | Selver "Maisikrõps ketšupimaitseline, CHEETOS, 165 g" (2.73 €) |
| Rimi "Kartulikr. tšilli- ja laimimait. Lay's 170g" (3.59 €) | Selver "Tšilli- ja laimimaitselised kartulikrõpsud, LAY'S, 170g" (3.59 €) |
| Rimi "Maisisnäkid Cheese Balls Nacho Taffel 190g" (2.39 €) | Selver "Cheese Balls maisisnäkid, TAFFEL, 190 g" (2.97 €) |
| Rimi "Kartulikrõpsud hapuk.-ja ürdimait. Lay's 180g" (3.59 €) | Selver "Hapukoore-ja ürtidemaitselised kartulikrõpsud, LAY'S, 180g" (3.59 €) |
| Rimi "Kartulikrõpsud Estrella peekonimaits. 180g" (3.59 €) | Selver "Kartulikrõps suitsupeekonimaitseline, ESTRELLA, 180 g" (3.75 €) |

### Nuts, seeds & dried fruit (22)

| Item A | Item B |
|---|---|
| Barbora "Tudengieine ARIMEX 300g" (5.29 €) | Rimi "Mandlid Arimex 300g" (4.99 €) |
| Barbora "Tudengieine ARIMEX 300g" (5.29 €) | Rimi "Sarapuupähklid Arimex 300g" (6.99 €) |
| Barbora "Mandel ARIMEX 300g" (7.15 €) | Rimi "Mandlid Arimex 300g" (4.99 €) |
| Barbora "Mandel ARIMEX 300g" (7.15 €) | Rimi "Sarapuupähklid Arimex 300g" (6.99 €) |
| Barbora "Pähklite segu Premium GERMUND 250g" (5.69 €) | Rimi "Pähklite segu Germund 250g" (5.45 €) |
| Barbora "Maapähklid tšillimaits. röst.TAFFEL 140g" (2.29 €) | Rimi "Maapähklid tšillimaitselised Taffel 140g" (2.29 €) |
| Barbora "Soolakaram.maapähkel PÄHKLINÄPP 200g" (2.25 €) | Coop "Pähklinäpp Maapähkel 200g kooritud" (0.99 €) |
| Barbora "Kõrvitsaseemned ARIMEX 300g" (5.99 €) | Rimi "Mandlid Arimex 300g" (4.99 €) |
| Barbora "Kõrvitsaseemned ARIMEX 300g" (5.99 €) | Rimi "Sarapuupähklid Arimex 300g" (6.99 €) |
| Barbora "Seesamiseemned PÄHKLINÄPP 200g" (1.59 €) | Coop "Pekaanipähkel Pähklinäpp 200g" (5.59 €) |
| Barbora "Seesamiseemned PÄHKLINÄPP 200g" (1.59 €) | Coop "Jõhvikas Pähklinäpp 200g" (2.59 €) |
| Barbora "Kõrvitsaseemned röstitud MONARCH 100g" (2.49 €) | Rimi "Röstitud päevalilleseemned Monarch 100g" (1.59 €) |
| Barbora "Röst.sool.kõrvitsaseemned MONARCH 100g" (2.49 €) | Rimi "Röst. sool. päevalilleseemned Monarch 100g" (1.59 €) |
| Barbora "Kuivatatud aprikoos ARIMEX 300g" (6.29 €) | Rimi "Jõhvikad kuivatatud Arimex 300g" (6.39 €) |
| Barbora "Kuiv.kivideta datlid Premium ARIMEX 300g" (1.99 €) | Rimi "Datlid kivideta Arimex Premium 300g" (2.69 €) |
| Barbora "Viigimari PÄHKLINÄPP 200g" (2.99 €) | Coop "Pekaanipähkel Pähklinäpp 200g" (5.59 €) |
| Barbora "Viigimari PÄHKLINÄPP 200g" (2.99 €) | Coop "Jõhvikas Pähklinäpp 200g" (2.59 €) |
| Coop "Pähklinäpp Kreeka pähkel 500g" (6.99 €) | Selver "India pähkel, PÄHKLINÄPP, 500 g" (7.49 €) |
| Rimi "India pähkel röstitud Premium 300g" (6.89 €) | Selver "India pähkel, PREMIUM, 300 g" (4.99 €) |
| Rimi "Inkamarjad Kommi asemel 130g" (3.35 €) | Selver "Makadaamiapähklid, KOMMI ASEMEL, 130 g" (6.25 €) |
| Rimi "Kuivatatud õunad  Arimex 200g" (4.59 €) | Selver "Kuivatatud aprikoos, ARIMEX, 200 g" (4.06 €) |
| Rimi "Kuivatatud õunad  Arimex 200g" (4.59 €) | Selver "Kuivatatud õunarõngad, ARIMEX, 200 g" (4.67 €) |

### Frozen vegetables & berries (7)

| Item A | Item B |
|---|---|
| Barbora "Külm.köögivilj.HÄRMAVILI läätsedega,400g" (2.09 €) | Rimi "Köögiviljasegu läätsedega Härmavili 400g" (2.15 €) |
| Barbora "Külm.murel kivideta BIMAR, 300g" (2.59 €) | Selver "Murel, BIMAR, 300 g" (2.53 €) |
| Coop "Ploomid Hortex 450g külmutatud" (3.59 €) | Selver "Hortex põldoad külmutatud, HORTEX, 450g" (3.89 €) |
| Coop "Rohelised köögiviljad Härmavili 400g külmutatud" (2.19 €) | Rimi "Köögiviljad kikerhern. Härmavili 0,4kg" (2.29 €) |
| Coop "Bimar Vaarikad külmutatud 300g" (4.99 €) | Selver "Murel, BIMAR, 300 g" (2.53 €) |
| Rimi "Köögiviljasegu Mehhiko Maahärra 400g" (2.15 €) | Selver "Mehhiko segu, MAAHÄRRA, 400 g" (2.19 €) |
| Rimi "Köögiviljasegu läätsedega Härmavili 400g" (2.15 €) | Selver "Rikkalik köögiviljasegu läätsedega, HÄRMAVILI, 400 g" (2.12 €) |

### Ice cream (29)

| Item A | Item B |
|---|---|
| Barbora "Jäätis VÄIKE TOM pähklitäidis., 60g" (0.95 €) | Rimi "Jäätis šokolaadi Väike Tom 60g/90ml" (0.99 €) |
| Barbora "Jäätis šok.-koore.gl.VANILLA NINJA, 80g" (1.19 €) | Rimi "Jäätis vanilli šok.gl. Vanilla Ninja 80g" (1.19 €) |
| Barbora "Jäätis šok.-koore.gl.VANILLA NINJA, 80g" (1.19 €) | Rimi "Jäätis šokol. Šok. gl. Vanilla Ninja 80g" (1.19 €) |
| Barbora "Maasika-puuviljasorbett DRAKO, 90g" (1.05 €) | Selver "Maasika-puuviljasorbett, DRAAKON, 90 g" (1.07 €) |
| Barbora "Jäätis VANA TOOMAS šokolaadiplomb., 90g" (1.49 €) | Rimi "Jäätis soolakaramelli Vana Toomas 90g" (1.39 €) |
| Barbora "Jäätis classic MAGNUM, 81g" (1.30 €) | Selver "Vanillijäätis Classic, MAGNUM, 81 g" (1.88 €) |
| Barbora "Jäätis VÄIKE TOM mingo-mango, 60g" (0.65 €) | Rimi "Koorejäätis mango Väike Tom 60g/74ml" (0.69 €) |
| Barbora "Jäätis Tallinn piparmündi PREMIA 60g" (1.05 €) | Rimi "Piparmündi koorej. Tallinn Premia 60g/100ml" (1.09 €) |
| Barbora "Koorejäätis PREMIA stracciatella, 245g" (3.29 €) | Rimi "Jäätis Stracciatella Premia 245g/0,5l" (2.99 €) |
| Barbora "Jäätis Cappuccino, lakt.vab. LA MUU 250g" (4.59 €) | Rimi "Jäätis Cappuccino lakt.vaba La Muu 250g/500ml" (4.49 €) |
| Barbora "Jäätis SNICKERS, 48g" (1.29 €) | Rimi "Jäätisebatoon Snickers 48g/53ml" (1.29 €) |
| Barbora "Vaarika sorbetipallid MINI MELTS, 72g" (2.39 €) | Rimi "Mango sorbetipallid Mini Melts 72g" (2.39 €) |
| Barbora "Koorejäätis ERITI RAMMUS šokolaadi, 100g" (1.78 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS karamelli, 100g" (1.75 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ONU ESKIMO šoko.tops,65g" (1.04 €) | Selver "Šokolaadi-koorejäätis vahvlitopsis, ONU ESKIMO, 65 g" (1.04 €) |
| Barbora "Koorejäätis šoko.tk.ONU ESKIMO,65g" (0.99 €) | Selver "Šokolaadi-koorejäätis vahvlitopsis, ONU ESKIMO, 65 g" (1.04 €) |
| Barbora "Koorejäätis ERITI RAMMUS kondensp.,100g" (1.78 €) | Rimi "Jäätis kondensp. Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS kondensp.,100g" (1.78 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS soolakar.,110g" (1.78 €) | Coop "Eriti Rammus Vaarika koorejäätis 110g" (1.79 €) |
| Barbora "Koorejäätis ERITI RAMMUS soolakar.,110g" (1.78 €) | Rimi "Koorejäätis jõhvikam. Eriti Rammus 110g/200ml" (1.19 €) |
| Barbora "Koorejäätis ERITI RAMMUS pistaatsia,100g" (1.95 €) | Rimi "Jäätis pistaatsia Eriti Rammus 100g/200ml" (1.69 €) |
| Barbora "Koorejäätis ERITI RAMMUS pistaatsia,100g" (1.95 €) | Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) |
| Barbora "Jäätis põldmarja ERITI RAMMUS 110g" (1.78 €) | Rimi "Jäätis soolakaram. Eriti Rammus 110g/200ml" (1.19 €) |
| Barbora "Jäätis mango vahvlitops.VÄIKE TOM 65g" (0.99 €) | Rimi "Mango-koorejäätis Väike Tom 65g/120ml" (1.09 €) |
| Barbora "Jäätis maasikatoormoos.ERITI RAMMUS 110g" (1.78 €) | Rimi "Jäätis soolakaram. Eriti Rammus 110g/200ml" (1.19 €) |
| Coop "Mango-koorejäätis vahvlitopsis Väike Tom 65g" (0.95 €) | Rimi "Mango-koorejäätis Väike Tom 65g/120ml" (1.09 €) |
| Coop "Eriti Rammus Vaarika koorejäätis 110g" (1.79 €) | Rimi "Koorejäätis jõhvikam. Eriti Rammus 110g/200ml" (1.19 €) |
| Rimi "Jäätis mandli Magnum mini multipakk 6x55ml" (7.19 €) | Selver "Almond mini multipakk 6 x 55ml, MAGNUM, 266 g" (5.49 €) |
| Rimi "Koorejäätis mango Eriti Rammus 100g/200ml" (1.19 €) | Selver "Mango koonusjäätis, ERITI RAMMUS, 100 g" (1.78 €) |

### Dumplings, pizza & fries (5)

| Item A | Item B |
|---|---|
| Barbora "Külm. vareenikud UVIC kartuli-seene,500g" (3.09 €) | Selver "Vareenikud Ivan kartuli-seene, UVIC, 500 g" (3.14 €) |
| Barbora "Külm.pitsa Mozzarella RISTORANTE, 355g" (4.05 €) | Selver "Pitsa Ristorante Hawaii, DR.OETKER, 355g" (4.06 €) |
| Barbora "Külm.Margherita pitsa PEALINNA 300g" (2.19 €) | Selver "Margherita pitsa, PREMIA, 300 g" (2.77 €) |
| Barbora "Külm.friikartul SMART CHOICE, 1kg" (2.25 €) | Coop "Friikartul Smart Choice Vici 1kg külmutatud" (2.29 €) |
| Barbora "Külm. bataadi MAAHÄRRA friikad, 500g" (4.45 €) | Rimi "Bataadi friikartulid Maahärra 500g" (4.49 €) |

### Sausages (24)

| Item A | Item B |
|---|---|
| Barbora "Juustuvorst VALLA, 240g viil" (1.25 €) | Selver "Juustuvorst viilutatud, VALLA, 240g" (1.19 €) |
| Barbora "Lastevorst XL M&M, 300g viil" (1.65 €) | Rimi "Lastevorst XL viilutatud Maks&Moorits 300g" (1.95 €) |
| Barbora "Keeduvorst Laste VALLA, 1kg" (2.89 €) | Coop "Keeduvorst Lastevorst Valla 1kg" (2.89 €) |
| Barbora "Lastevorst WÕRO, 600g" (1.89 €) | Coop "Keeduvorst Lastevorst Wõro 600g" (1.89 €) |
| Rimi "Lastevorst Lihakas Rakvere 360g" (3.45 €) | Selver "Lihakas doktorivorst, RAKVERE LK, 360 g" (3.55 €) |
| Barbora "Keeduvorst kanalihaga NompsNÕO,100g viil" (1.69 €) | Selver "Keeduvorst kanalihaga, Nomps, NÕO, 100 g" (1.69 €) |
| Barbora "P/S teravad grillvorstid KARNI 450g" (3.99 €) | Coop "P/S Sõprade grillvorstid Karni 450g" (3.55 €) |
| Barbora "Šašlõkivorst MATSIMOKA,365g" (5.69 €) | Rimi "Šašlõkivorst lambasooles Matsimoka 365g" (5.99 €) |
| Barbora "Kodusardell M&M, 500g" (2.45 €) | Rimi "Viiner Maks&Moorits 500g" (2.95 €) |
| Barbora "Poolsuitsuvorst Täpi NÕO, 135g viil" (2.89 €) | Selver "Poolsuitsuvorst Täpi, NÕO, 135 g" (2.94 €) |
| Barbora "Poolsuitsuvorst Krakov NÕO, 270g" (3.65 €) | Rimi "Vorst Krakov Nõo 270g" (2.99 €) |
| Barbora "Keedusalaami juustuga NÕO,90g viil" (2.89 €) | Coop "Vasalli keedusalaami juustuga Nõo 90g" (2.19 €) |
| Barbora "Täissuitsuvorst Ordu küüslaugug.NÕO,250g" (4.79 €) | Rimi "Täissuitsuvorst Ordu Nõo 250g" (4.79 €) |
| Barbora "Salaami ELPOZO, 80g viil" (2.69 €) | Coop "Salaami Elpozo 80g viilutatud" (2.39 €) |
| Barbora "Poolsuitsuvorst Krakov VALLA, 450g" (2.69 €) | Rimi "Vorst Krakov Valla 450g" (2.59 €) |
| Barbora "Täissuitsuvorst Tõeline RAKVERE, 210g" (3.79 €) | Rimi "Täissuitsuvorst Äge Rakvere 210g" (3.79 €) |
| Barbora "Täissuitsuvorst Kalevipoja NÕO, 250g" (4.39 €) | Rimi "Täissuitsuvorst Ordu Nõo 250g" (4.79 €) |
| Barbora "Täissuitsuvorst Kalevipoja NÕO, 250g" (4.39 €) | Selver "BBQ täissuitsuvorst, NÕO, 250 g" (5.09 €) |
| Barbora "Toorvorstid Laste RANNAROOTSI, 400g" (4.65 €) | Coop "Laste toorvorstikesed Rannarootsi 400g" (3.49 €) |
| Coop "Wõro Võileivavorst ülesuitsutatud 300g" (1.39 €) | Rimi "Ülesuitsutatud võileivavorst viil Wõro 300g" (1.45 €) |
| Coop "Ribisnäkk Rakvere 300g" (2.79 €) | Selver "Maksarõngas, RAKVERE LK, 300 g" (2.23 €) |
| Coop "Cheddari-jalopeno grillvorstid Nõo 360g" (3.99 €) | Rimi "Grillvorstid cheddari-jalapeno Nõo 360g" (3.95 €) |
| Coop "Lihakas shaslõkivorstid Rakvere 400g" (3.99 €) | Rimi "Šašlõkivorstid Lihakas Rakvere 400g" (4.29 €) |
| Rimi "Täissuitsuvorst Ordu Nõo 250g" (4.79 €) | Selver "BBQ täissuitsuvorst, NÕO, 250 g" (5.09 €) |

### Ham & cold cuts (30)

| Item A | Item B |
|---|---|
| Barbora "Kalkunifileesink NÕO, 105g viil" (2.02 €) | Rimi "Kalkunifileesink Nõo 105g" (1.79 €) |
| Barbora "Veise vürtsisink OSKAR, 100g viil" (2.14 €) | Coop "Veise vürtsisink viilu Oskar 100g" (2.69 €) |
| Barbora "Veiserind OSKAR, 100g viil" (2.85 €) | Rimi "Veiserind viilutatud Oskar 100g" (2.85 €) |
| Barbora "Tagasink KARNI,120g viil" (1.69 €) | Coop "Seaseljafilee Karni120g viil" (2.15 €) |
| Barbora "Maamehe suitsusink NÕO, 105g viil" (2.14 €) | Coop "Hertsogi suitsusink Nõo 105g viil" (2.69 €) |
| Barbora "Suitsupeekon Ehe RANNAROOTSI,120g viil" (2.39 €) | Selver "Suitsupeekon Ehe, RANNAROOTSI, 120 g" (2.49 €) |
| Barbora "Seaseljafilee NÕO, 105g viil" (2.65 €) | Rimi "Seaseljafilee suits. Nõo 105g" (1.79 €) |
| Barbora "Marmorsink KARNI 120g, viil" (1.24 €) | Coop "Seaseljafilee Karni120g viil" (2.15 €) |
| Barbora "Marmorsink KARNI 120g, viil" (1.24 €) | Coop "Keedusink Marmorsink Karni 120g viil" (1.65 €) |
| Barbora "Suit.seakaelakarbonaad RAKVERE,130g viil" (1.87 €) | Coop "Suitsutatud seakaelakarbonaad Rakvere 130g viil" (2.79 €) |
| Barbora "Suitsurulaad keele, šamp. NÕO 100g viil" (1.49 €) | Coop "Nõo Suitsurulaad keele-shampi100g viil" (1.49 €) |
| Barbora "Maksapasteet linnulihast NÕO, 200g" (2.29 €) | Coop "Fitlap maksapasteet Nõo 200g" (2.15 €) |
| Barbora "Veisemaksapasteet NÕO, 200g" (1.99 €) | Rimi "Hanemaksapasteet Nõo 200g" (2.25 €) |
| Barbora "Suitsukanavõie pasteet KARNI, 190g" (2.19 €) | Coop "Suitsukanavõie Karni 190g" (1.89 €) |
| Barbora "Suitsukanavõie pasteet KARNI, 190g" (2.19 €) | Coop "Kreemjas pasteet Karni 190g" (1.39 €) |
| Barbora "Broilerimaksapasteet Fitlap NÕO,200g" (2.29 €) | Coop "Fitlap maksapasteet Nõo 200g" (2.15 €) |
| Barbora "Kons.hautatud sealiha MINU 250g" (1.49 €) | Coop "Hautatud sealiha Minu 250g" (1.75 €) |
| Barbora "Kons.turistieine veiselihast MINU 250g" (1.99 €) | Coop "Turistieine veiselihast Minu 250g" (1.99 €) |
| Barbora "Kanaliha želees MINU, 250g" (1.49 €) | Coop "Kanaliha zelees Minu 250g" (1.75 €) |
| Barbora "Veiseliha hautatud MINU, 250g" (1.89 €) | Coop "Hautatud sealiha Minu 250g" (1.75 €) |
| Barbora "Loomalihakonserv MINU De Lux, 525g" (6.75 €) | Coop "Minu Kalkuniliha De Lux 525g" (5.25 €) |
| Barbora "Sealihakonserv MINU De Lux, 525g" (4.79 €) | Coop "Minu Kalkuniliha De Lux 525g" (5.25 €) |
| Barbora "Kanalihakonserv MINU De Lux, 525g" (5.29 €) | Coop "Minu Kalkuniliha De Lux 525g" (5.25 €) |
| Barbora "Hautatud lambaliha KODUKÜLA, 250g" (3.99 €) | Rimi "Hautatud kanaliha Koduküla 250g" (2.49 €) |
| Barbora "Hautatud veiseliha KODUKÜLA, 250g" (2.99 €) | Rimi "Hautatud kanaliha Koduküla 250g" (2.49 €) |
| Barbora "Hautatud veiseliha KODUKÜLA, 250g" (2.99 €) | Rimi "Konserv hautatud veiseliha Koduküla 250g" (2.99 €) |
| Barbora "Hautatud kalkuniliha KODUKÜLA, 250g" (2.89 €) | Rimi "Hautatud kanaliha Koduküla 250g" (2.49 €) |
| Barbora "Vinnut.veiseliha Hot KARNI,50g" (2.79 €) | Selver "Vinnutatud veiseliha Hot, KARNI, 50 g" (2.80 €) |
| Barbora "Vinnut.veiseliha Teriyaki KARNI,50g" (2.79 €) | Rimi "Vinnut. veiseliha Teriyaki Jerkey Karni 50g" (2.79 €) |
| Barbora "Vinnut.veiseliha Teriyaki KARNI,50g" (2.79 €) | Selver "Vinnutatud veiseliha Teriyaki, KARNI, 50 g" (2.80 €) |

### Fish & seafood (30)

| Item A | Item B |
|---|---|
| Barbora "Tuunikalatk.päevalilleõlis CALVO,EO 142g" (2.85 €) | Coop "Calvo Tuunikalatükid päevalilleõlis 142g" (2.79 €) |
| Barbora "Sprotid ōlis RANNAKÜLA, EO, 240g" (2.99 €) | Rimi "Sprotid õlis Rannaküla 240g" (2.99 €) |
| Barbora "Lõhefilee KAIJA naturaalne EO, 170g" (3.19 €) | Coop "Lõhefilee sinepikreemis Kaija 170g" (3.25 €) |
| Barbora "Lõhesalat Mehhiko MARINE ABC, EO 240g" (2.19 €) | Coop "Lõhesalat Mehhiko moodi Marine ABC 240g" (1.99 €) |
| Barbora "Lõhesalat Prantsuse MARINE ABC, EO 240g" (2.19 €) | Coop "Lõhesalat Prantsuse moodi Marine ABC 240g" (1.99 €) |
| Barbora "Grill sardiinid õlis BRIIS, EO 140g" (2.05 €) | Selver "Grill sardiinid õlis, EPINELL, 140g" (2.05 €) |
| Barbora "Skumbria õlis KAPTEN GRANT,240g" (2.55 €) | Rimi "Sardiinid õlis Kapten Grant 240g" (2.19 €) |
| Barbora "Tuunikala purust. õlis KAPTEN GRANT,185g" (1.49 €) | Coop "Tuunikala suured tk õlis Kapten Grant 185g" (1.99 €) |
| Barbora "Tuunikala pipra ja sidruniga KAIJA 160g" (4.49 €) | Rimi "Tuunikala roh. pipra ja sidruniga Kaija 160g" (3.59 €) |
| Barbora "Heeringafilee tradits.õlita VICI 500g" (6.99 €) | Coop "Heeringafilee traditsiooniline õlita Vici 500g" (5.89 €) |
| Barbora "Vürtsikilufilee BRIIS, 400g" (4.49 €) | Coop "Briis vürtsikilufileed 400g" (5.89 €) |
| Barbora "Vürtsisilgufilee KALURI, 100g" (2.15 €) | Selver "Forellimari, KALURI, 100g" (9.29 €) |
| Barbora "Kuivatatud tursk MSDM, 36g" (1.99 €) | Rimi "Tursk vürtsikas kuivatatud MSDM 36g" (2.15 €) |
| Barbora "Vinnutatud lestaribad SEA SNACKS, 30g" (2.99 €) | Rimi "Vinnutatud gorbuušafilee Sea Snacks 30g" (2.99 €) |
| Barbora "Vinnutatud gorbuušaribad SEA SNACKS 30g" (2.99 €) | Rimi "Vinnutatud gorbuušafilee Sea Snacks 30g" (2.99 €) |
| Barbora "Vinnutatud forelliribad SEA SNACKS, 30g" (2.99 €) | Rimi "Vinnutatud gorbuušafilee Sea Snacks 30g" (2.99 €) |
| Barbora "Kalmaarid omas mahlas CALVO, EO 115g" (2.55 €) | Rimi "Kalmaarid omas tindis Calvo 115g/72g" (2.55 €) |
| Barbora "Krevetid tšilli-küüslaugu MARWI 100g" (3.99 €) | Rimi "Rannakarbid tšilli-küüslaugu Marwi 100g" (2.49 €) |
| Barbora "Rannakarabid soolvees MARWI 300g" (3.99 €) | Rimi "Rannakarbid soolvees Marwi ASC 300/140g" (4.19 €) |
| Coop "Tursk vürtsikas MSDM 36g lõikudena" (1.69 €) | Rimi "Tursk vürtsikas kuivatatud MSDM 36g" (2.15 €) |
| Coop "Heeringafilee tükid mädarõikakastmes Vici 200g" (2.39 €) | Rimi "Heeringafilee tükid mädarõikakast. Vici 200g" (2.89 €) |
| Coop "Külmsuitsu lõhefilee Vici 100g" (4.09 €) | Selver "Külmsuitsu lõhefilee viilutatud, VICI, 100 g" (4.39 €) |
| Coop "Kaija Tuunikala Teryaki kastmes 110g" (2.99 €) | Rimi "Tuunikala Teriyaki kastmes Kaija 110g" (2.59 €) |
| Coop "Kaija Tuunikala Teryaki kastmes 110g" (2.99 €) | Rimi "Tuunikala Poke kastmes Kaija 110g" (2.69 €) |
| Coop "Tuunikala suured tk õlis Kapten Grant 185g" (1.99 €) | Selver "Tuunikala suured tükid õlis, KAPTEN GRANT, 185 g" (1.99 €) |
| Coop "Tuunikala purustatud tk soolvees Kapten Grant 185g" (1.99 €) | Rimi "Tuunikala soolvees Kapten Grant MSC 185g/130g" (2.29 €) |
| Coop "Tuunikala purustatud tükid õlis Kapten Grant 185g" (1.99 €) | Selver "Tuunikala suured tükid õlis, KAPTEN GRANT, 185 g" (1.99 €) |
| Rimi "Õrnsoola lõhe viilud Avektra 100g" (4.69 €) | Selver "Õrnsoola lõhefilee viilud, AVEKTRA, 100 g" (4.79 €) |
| Rimi "Forelli viilud õrnsoola Avektra 100g" (4.69 €) | Selver "Õrnsoola lõhefilee viilud, AVEKTRA, 100 g" (4.79 €) |
| Rimi "Kalmaar vähesoolane kuivatatud MSDM 36g" (2.15 €) | Selver "Kalmaar vähesoolane, MSDM, 36 g" (2.29 €) |

### Baby food (13)

| Item A | Item B |
|---|---|
| Barbora "Juurv.püree kalkunilih. BIO HIPP 220g 1a" (2.95 €) | Rimi "Püree Hipp juurv.-kalkuni bio 12k 220g" (2.79 €) |
| Barbora "Suvikõrvitsap.kartuliga HIPP 125g 4+öko" (1.65 €) | Coop "4K Suvikõrvitsapüree Hipp Organic 125g kartuliga" (1.65 €) |
| Barbora "Ploomipüree HIPP BIO 125g,4k" (1.79 €) | Selver "Kanalihapüree BIO, HIPP, 125 g" (3.65 €) |
| Barbora "Aprikoosipüree HIPP BIO 125g,4k" (1.79 €) | Selver "Kanalihapüree BIO, HIPP, 125 g" (3.65 €) |
| Barbora "Pirni.vaarika.ban.püree MUUTI 110g al.6k" (1.59 €) | Rimi "Püree pirni-vaarika-banaani Muuti 110g" (1.59 €) |
| Barbora "Piimapuder šokolaaditük. MILUPA 250g,8k" (3.71 €) | Rimi "Riisipuder Milupa šokolaaditük. 8k+ 250g" (3.69 €) |
| Barbora "Kaerapuder virs.ban.RUDOLFS 110g 4k" (1.31 €) | Coop "Rudolfs 4K Kaerapuder 110g virsiku-ban." (2.05 €) |
| Barbora "Mitmeviljapud.õuna-kan.Öko PÕNN 110g 6k" (1.85 €) | Rimi "Mitmeviljapud. õuna-kaneeli 6k+ Põnn öko 110g" (1.89 €) |
| Barbora "Täistera hirsipuder HOLLE 250g 6k" (3.74 €) | Coop "6K Täistera kaerapuder Holle 250g" (5.59 €) |
| Barbora "Puuv.batoon HIPP õun/banaan/kaer 23g 1a" (1.05 €) | Rimi "Batoon Hipp õun-banaan-kaer 12k 23g" (1.05 €) |
| Barbora "Maisirõngad krõbedad ORGANIX Öko 6k 20g" (1.95 €) | Rimi "Maisirõngad al. 6k Organix öko 20g" (1.95 €) |
| Coop "4K Mahe lillkapsapüree rauaga Nogel 120g" (1.65 €) | Rimi "Lillkapsas rauaga Nogel öko 120g" (1.69 €) |
| Coop "6K Kaera-õuna piimapudrupulb.Head ööd BIO Hipp250g" (5.05 €) | Selver "Head Ööd piimapudrupulber kaera-õuna mahe 6+, HIPP, 250 g" (5.05 €) |

### Personal care (30)

| Item A | Item B |
|---|---|
| Barbora "Juukselakk TAFT Shine 250ml" (7.15 €) | Rimi "Juukselakk Taft cashmere 250 ml" (4.79 €) |
| Barbora "Juukselakk TAFT Ultra 250ml" (7.15 €) | Rimi "Juukselakk Taft cashmere 250 ml" (4.79 €) |
| Barbora "Juukselakk NIVEA Volume Care 250ml" (5.31 €) | Rimi "Juukselakk Nivea volume 250ml" (4.09 €) |
| Barbora "Juukselakk NIVEA Volume Care 250ml" (5.31 €) | Selver "Juukselakk Volume Sensation, NIVEA, 250 ml" (7.61 €) |
| Barbora "Juuksevaht NIVEA Volume Care 150ml" (5.31 €) | Selver "Juuksevaht Diamond Care, NIVEA, 150ml" (7.61 €) |
| Barbora "Juuksevaht NIVEA Volume Care 150ml" (5.31 €) | Selver "Juuksevaht Volume Sensation, NIVEA, 150 ml" (7.61 €) |
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
| Barbora "Juuksevaht NIVEA Diamond Volume 150ml" (5.31 €) | Selver "Juuksevaht Diamond Care, NIVEA, 150ml" (7.61 €) |
| Barbora "Juuksevaht NIVEA Diamond Volume 150ml" (5.31 €) | Selver "Juuksevaht Volume Sensation, NIVEA, 150 ml" (7.61 €) |
| Barbora "Juukselakk SYOSS Glaze 3in1 300ml" (6.29 €) | Rimi "Juukselakk Syoss Glaze 300ml" (6.39 €) |
| Barbora "Juukselakk SYOSS Glaze 3in1 300ml" (6.29 €) | Selver "Juukselakk Intense Glaze, SYOSS, 300ml" (8.99 €) |
| Barbora "Palsam NIVEA Color Cristal Gloss 200ml" (3.35 €) | Selver "Palsam Color Cristal Gloss värvi, NIVEA, 200 ml" (4.79 €) |
| Barbora "Palsam RICH Miracle Renew CC 200ml" (15.79 €) | Rimi "Palsam Rich Miracle Renew Keratin 200ml" (15.69 €) |
| Barbora "Palsam RICH Intense Moisture 200ml" (14.79 €) | Coop "Palsam Rich Luxury Intense Moisture 200ml" (15.25 €) |
| Barbora "Palsam NIVEA Hairmilk Shine 200ml" (3.35 €) | Selver "Palsam hooldav Hairmilk Shine, NIVEA, 200ml" (4.79 €) |
| Barbora "Palsam PUHAS LOODUS Takjas tugev. 250ml" (2.39 €) | Rimi "Palsam Puhas Loodus tuge. takjas 250ml" (2.99 €) |

### Household (30)

| Item A | Item B |
|---|---|
| Barbora "Klaasipuhastusvahend FROSCH 500ml" (2.75 €) | Coop "Klaasipuhastusvahend Frosch bioalkohol 500ml" (2.89 €) |
| Barbora "Klaasipuhastusvahend CLIN Citrus 500ml" (3.35 €) | Coop "Klaasipuhastusvahend Clin Peony 500ml" (3.25 €) |
| Barbora "Klaasipuhastusvahend CLIN Citrus 500ml" (3.35 €) | Rimi "Aknapuhastusvahend clin citrus 500 ml" (3.39 €) |
| Barbora "Klaasipuhastusvahend CLIN Citrus 500ml" (3.35 €) | Selver "Klaasipuhastusvahend Lemon, CLIN, 500 ml" (3.34 €) |
| Barbora "Hallituse eemaldaja CILLIT BANG 750ml" (8.79 €) | Selver "Hallituse eemaldaja, CILLIT, 750 ml" (9.19 €) |
| Barbora "Vaibapuhastusvaht THE PINK STUFF 500ml" (4.49 €) | Rimi "Üldpuhastusvahend The Pink Stuff 500ml" (4.39 €) |
| Barbora "Katlakivieemaldaja FROSCH Raspberry500ml" (4.19 €) | Coop "Katlakivieemaldaja Frosch vaarikas 500ml" (4.25 €) |
| Barbora "Rasvaeemaldaja CILLIT BANG Spray 750ml" (5.49 €) | Rimi "Rasvaeemaldaja Cillit spray 750 ml" (6.29 €) |
| Barbora "Ahjupuhastusvah.MAYERI All Care 500ml" (2.43 €) | Rimi "Vannitoapuhastusvahend Mayeri All-Care 500ml" (3.69 €) |
| Barbora "Ahjupuhastusvah.MAYERI All Care 500ml" (2.43 €) | Rimi "Köögipuhastusvahend Mayeri All-Care 500ml" (3.49 €) |
| Barbora "Köögipuhastusvahend CIF 500ml" (4.69 €) | Rimi "Vannitoapuhastusvahend Cif 500 ml" (4.69 €) |
| Barbora "Kodulõhnastaja AREON Vanilla Black 85ml" (10.99 €) | Rimi "Õhuvärskendaja Areon Black Vanilla 85ml" (10.19 €) |
| Barbora "Õhuvärskendaja TANGO Citrus 300ml" (1.59 €) | Coop "Tango Citrus õhuvärsk. 300ml" (1.45 €) |
| Barbora "Õhuvärskendaja AIR WICK Jasmine 237ml" (6.29 €) | Rimi "Õhuvärskendaja Air Wick Jasmine-Freesia 237ml" (4.75 €) |
| Barbora "El.õhuvärskendaja AMBI PUR Cotton +20ml" (6.09 €) | Rimi "El. õhuvärsk. Ambi Pur 3Vol Cotton 20ml" (10.19 €) |
| Barbora "El.õhuvärsk. täide AMBI PUR Cotton 20ml" (4.59 €) | Rimi "El. õhuvärsk. Ambi Pur 3Vol Cotton 20ml" (10.19 €) |
| Barbora "Õhuvärsk.AMBI PUR Flowers&Spring 185ml" (3.95 €) | Rimi "Õhuvärskendaja Ambi Pur Flowers&Spring 185ml" (6.59 €) |
| Barbora "Põrandapuhastusvah.THE PINK STUFF 750ml" (4.29 €) | Coop "The Pink Stuff klaasipuhastusvah 750ml" (3.79 €) |
| Barbora "Puhastuskreem CIF Lemon mikroos. 540g" (3.69 €) | Coop "Puhastuskreem Cif Lemon 540g" (1.99 €) |
| Barbora "Puhastuskreem CIF Lemon mikroos. 540g" (3.69 €) | Selver "Puhastuskreem Lemon Cream, CIF, 540 g" (3.89 €) |
| Barbora "Üldpuhastusvahend SANYTOL Greip 500ml" (4.69 €) | Coop "Üldpuhastusvahend Sanytol Greip 500ml desinfits" (4.69 €) |
| Barbora "Üldpuhastusvahend THE PINK STUFF 750ml" (3.49 €) | Coop "The Pink Stuff klaasipuhastusvah 750ml" (3.79 €) |
| Barbora "Puhastuslapid MAYERI Pomergranate 30tk" (1.85 €) | Selver "Puhastuslapid Pomergranate Juice, MAYERI, 30 tk" (2.49 €) |
| Barbora "Üldpuhastussprei AJAX Neroli&Yuzu500ml" (6.49 €) | Coop "Ajax Neroli&Yuzu puhastussprei 500ml" (5.79 €) |
| Barbora "WC puhastusvahend Harpic Original 750ml" (3.85 €) | Rimi "WC puhastusvahend Harpic hygiene 750ml" (4.99 €) |
| Barbora "WC puhastusvahend Harpic Original 750ml" (3.85 €) | Selver "WC-poti puhastusvahend Original, HARPIC, 750 ml" (3.85 €) |
| Barbora "WC puhastusvahend FROSCH lavender 750ml" (2.39 €) | Coop "Frosch Lavendel WC puhastusvahend 750ml" (2.39 €) |
| Barbora "WC puhastusvahend FROSCH lavender 750ml" (2.39 €) | Rimi "WC puhastusvahend Frosch sidruni 750ml" (2.35 €) |
| Barbora "WC puhastusvahend FROSCH citrus 750ml" (2.35 €) | Coop "Frosch Lavendel WC puhastusvahend 750ml" (2.39 €) |
| Barbora "WC puhastusvahend FROSCH citrus 750ml" (2.35 €) | Rimi "WC puhastusvahend Frosch sidruni 750ml" (2.35 €) |

### Pet food (14)

| Item A | Item B |
|---|---|
| Barbora "Kassiliiv PUFFY TAIL Silikageel 3.8l" (5.09 €) | Selver "Kassiliiv silikageelist, PUFFY TAIL, 3,8 l" (5.07 €) |
| Barbora "Kiisueine SHEBA lõhega, kastmes 85g" (1.05 €) | Coop "Sheba Cuisine kiisueine 85g lõhega" (0.99 €) |
| Barbora "Kiisueine SHEBA kanalihaga, kastmes 85g" (1.05 €) | Coop "Sheba Cuisine kiisueine 85g kanalihaga" (0.99 €) |
| Barbora "Kiisueine SHEBA kanalihaga, kastmes 85g" (1.05 €) | Rimi "Kiisueine Sheba kanalihaga 85g" (0.75 €) |
| Barbora "Kiisueine linnuliha valik SHEBA 4x85g" (3.49 €) | Rimi "Kiisueine Sheba linnuliha tarretises 4x85g" (1.99 €) |
| Barbora "Kiisueine FELIX Fantastic kana 85g" (0.79 €) | Coop "Felix Fantastic kiisueine 85g kanaliha" (0.79 €) |
| Barbora "Kiisueine FELIX Fantas.kassipoe.kana 85g" (0.79 €) | Coop "Felix Fantas.kassip.kiisueine 85g kana" (0.79 €) |
| Barbora "Kiisueine SHEBA Natures Kodulinnu,4x85g" (3.49 €) | Coop "Kiisueine Sheba Natures 4*85g kodulinnuvalik" (3.29 €) |
| Barbora "Kuiv kassitoit tuunikalaga WHISKAS 800g" (4.79 €) | Rimi "Kassitoit tuunikalaga Whiskas Adult 800g" (4.99 €) |
| Barbora "KoeraeinePEDIGREE veisemaks 100g" (0.62 €) | Coop "Koeraeine Pedigree 100g loomaliha" (0.89 €) |
| Barbora "Koeramaiused PEDIGREE markies 150g" (1.25 €) | Rimi "Koeraküpsised Pedigree Markies 150 g" (2.29 €) |
| Barbora "Koeramaius kana Jerkies PEDIGREE 70g" (1.39 €) | Rimi "Koeramaius Pedigree Ranchos Jerkies kana 70g" (2.19 €) |
| Barbora "Täissööt VITAKRAFT Hamstritele 400g" (3.09 €) | Coop "Täissööt hamstritele Vitakraft Menu 400g" (3.05 €) |
| Coop "Sheba Cuisine kiisueine 85g kanalihaga" (0.99 €) | Rimi "Kiisueine Sheba kanalihaga 85g" (0.75 €) |

### Cakes & pastries (13)

| Item A | Item B |
|---|---|
| Barbora "Sokolaadirull EESTI PAGAR, 350g" (5.19 €) | Coop "Shokolaadirull 350g Eesti Pagar" (4.29 €) |
| Barbora "Sokolaadirull EESTI PAGAR, 350g" (5.19 €) | Rimi "Šokolaadirull Eesti Pagar 350g" (5.29 €) |
| Barbora "Sokolaadirull EESTI PAGAR, 350g" (5.19 €) | Selver "Juubelisai, EESTI PAGAR, 350 g" (2.08 €) |
| Barbora "Minikookide valik 12tk REVAL KOND. 260g" (6.99 €) | Rimi "Minikookide valik Reval Kondiiter 12tk 260g" (5.49 €) |
| Barbora "Supermarja Tosca kook EESTI PAGAR 600g" (8.99 €) | Rimi "Vaarika Tosca kook Eesti Pagar 600g" (11.99 €) |
| Barbora "Sotsnik REVAL KONDIITER 150g" (2.15 €) | Rimi "Soolapulgad Reval Kondiiter 150g" (1.89 €) |
| Coop "Shokolaadi hõrgutis 100g Eesti Pagar" (2.79 €) | Rimi "Šokolaadi hõrgutis Eesti Pagar 100g" (2.89 €) |
| Coop "Shokolaadirull 350g Eesti Pagar" (4.29 €) | Rimi "Šokolaadirull Eesti Pagar 350g" (5.29 €) |
| Coop "Shokolaadirull 350g Eesti Pagar" (4.29 €) | Selver "Juubelisai, EESTI PAGAR, 350 g" (2.08 €) |
| Rimi "Moorapea Lõuna Pagarid 165g" (3.59 €) | Selver "Moorapead, LÕUNA PAGARID, 165 g" (3.40 €) |
| Rimi "Kohupiimataskud Lõuna Pagarid 250g" (4.49 €) | Selver "Kohupiimataskud karbis, LÕUNA PAGARID, 250 g" (4.55 €) |
| Rimi "Šokolaadirull Eesti Pagar 350g" (5.29 €) | Selver "Juubelisai, EESTI PAGAR, 350 g" (2.08 €) |
| Rimi "Vaarika-juustukook Pagarini 850g" (21.59 €) | Selver "Juustukook, PAGARINI, 850 g" (16.99 €) |

### Instant food (18)

| Item A | Item B |
|---|---|
| Barbora "Kiirnuudlisupp miso Ramen OYAKATA 89g" (1.25 €) | Selver "Ramen miso-pasta maitseline kiirnuudlisupp, OYAKATA, 89 g" (0.79 €) |
| Barbora "Kiirnuudlisupp kana Ramen OYAKATA 83g" (1.25 €) | Selver "Ramen kanalihamaitseline kiirnuudlisupp, OYAKATA, 83 g" (0.79 €) |
| Barbora "Kiirnuudlisupp soja.Ramen OYAKATA 83g" (1.25 €) | Selver "Ramen kanalihamaitseline kiirnuudlisupp, OYAKATA, 83 g" (0.79 €) |
| Barbora "Vürts.kanamaits.kiirnuudlid MAGGI 59.2g" (0.39 €) | Selver "Kanamaitselised kiirnuudlid, MAGGI, 59,2 g" (0.79 €) |
| Barbora "Kiirnuudlid kanamaits.SUN YAN 65g" (1.09 €) | Rimi "Kiirnuudlid kanalihamaitselised Sun Yan 65g" (1.09 €) |
| Barbora "Kiirnuudlid veisemaits.SUN YAN 65g" (1.09 €) | Rimi "Kiirnuudlid kanalihamaitselised Sun Yan 65g" (1.09 €) |
| Barbora "Kiirnuudlid krevetimaits.SUN YAN 65g" (1.09 €) | Rimi "Kiirnuudlid kanalihamaitselised Sun Yan 65g" (1.09 €) |
| Barbora "Kiirnuudlid maapähklimaits.MAGGI 75g" (2.45 €) | Rimi "Kiirnuudlid teriyakimaitselised Maggi 75g" (2.45 €) |
| Barbora "Kiirnuudlid pardimaits.SUN YAN 65g" (1.65 €) | Rimi "Kiirnuudlid kanalihamaitselised Sun Yan 65g" (1.09 €) |
| Barbora "Kiirnuudlid veisemaits.SUN YAN 60g" (0.55 €) | Rimi "Kiirnuudlid kanalihamaitselised Sun Yan 60g" (0.55 €) |
| Barbora "Kiirnuudlid veisemaits.SUN YAN 60g" (0.55 €) | Rimi "Kiirnuudlid veiselihamaitselised Sun Yan 60g" (0.55 €) |
| Barbora "Kiirnuudlid kanamaits.REEVA tops 75g" (1.45 €) | Rimi "Kiirnuudlid kanamaitselised Reeva 75g" (1.45 €) |
| Barbora "Kiirnuudlid klassik.Ramen IPPIN 82g" (0.89 €) | Selver "Ramen kiirnuudlid klassikalised, IPPIN, 82g" (0.99 €) |
| Barbora "Kiirnuudlid Korea BBQ.OYAKATA 93g" (1.99 €) | Rimi "Kiirnuudlid Oyakata Korea barbecue maits. 93g" (1.95 €) |
| Coop "Kiirnuudlid Reeva 75g veiselihamaitselised topsis" (1.85 €) | Rimi "Kiirnuudlid veiselihamaitselised Reeva 75g" (1.45 €) |
| Rimi "Kiirnuudlid vürts. kana maitselised Reeva 60g" (0.69 €) | Selver "Kiirnuudlid kanamaitselised Asia, REEVA, 60g" (0.85 €) |
| Rimi "Kiirseenesupp Maggi 22g" (0.79 €) | Selver "Seenesupp, MAGGI, 22 g" (0.79 €) |
| Rimi "Kiirnuudlid Oyakata Korea barbecue maits. 93g" (1.95 €) | Selver "Kiirnuudliroog Korea barbecue maitseline, OYAKATA, 93g" (1.99 €) |

### World cuisine (4)

| Item A | Item B |
|---|---|
| Barbora "Kookosjook väherasv.SANTA MARIA 250ml" (2.69 €) | Rimi "Kookosjook lahja Santa Maria 250ml" (2.69 €) |
| Barbora "Minitortilla SANTA MARIA 200g" (1.49 €) | Rimi "Minitortiljad Santa Maria 200g" (2.29 €) |
| Coop "Ayuko Ramen nuudlid 300g" (2.35 €) | Selver "Soba nuudlid, AYUKO, 300 g" (2.33 €) |
| Coop "Japanese Choice Sushi ingver 190g roosa" (1.95 €) | Selver "Sushi Ingver valge, JAPANESE CHOICE, 190 g" (2.29 €) |

### Alcohol-free beer, cider & wine (21)

| Item A | Item B |
|---|---|
| Barbora "Alkoholivaba õlu CLAUSTHALER 330ml" (1.25 €) | Rimi "Alk.vaba õlu Clausthaler Grapefruit 0,33l" (1.29 €) |
| Barbora "Alkoholivaba õlu CLAUSTHALER 500ml" (1.29 €) | Rimi "Alkoholivaba õlu Clausthaler Original 0,5l" (1.39 €) |
| Barbora "Alkoholivaba õlu CLAUSTHALER Sidrun0.33L" (1.25 €) | Rimi "Alk.vaba õlu Clausthaler Grapefruit 0,33l" (1.29 €) |
| Barbora "Alkoholivaba õlu KRONENBOURG Bl. 330ml" (1.49 €) | Selver "Alkoholivaba Blanc, KRONENBOURG, 330 ml" (1.51 €) |
| Barbora "Alk.vaba õlu CLAUSTHALER Grap. 330ml" (1.29 €) | Rimi "Alk.vaba õlu Clausthaler Grapefruit 0,33l" (1.29 €) |
| Barbora "Alkoholivaba õlu ESTRELLA Galicia 500ml" (1.99 €) | Rimi "Alkoholivaba õlu Estrella Galicia 0,5l purk" (2.15 €) |
| Barbora "Siider KOPPARBERG Pear alk.vaba 500ml" (1.69 €) | Selver "Alkoholivaba siider Pirni, KOPPARBERG, 500 ml" (1.49 €) |
| Barbora "Alk.vaba vahuvein FREIXENET White 750ml" (9.19 €) | Rimi "Alkoholivaba vahuvein Freixenet Valge 0,75l" (9.39 €) |
| Coop "Alk.vaba Õunasiider Tanker 0.5L prk" (1.19 €) | Rimi "Alkoholivaba õunasiider Tanker 0,5l" (1.25 €) |
| Coop "Alk.vaba õlu Heineken 0.0% 0.5L prk" (1.39 €) | Rimi "Alkoholivaba õlu Heineken alk.0,0%vol 0,5l" (1.15 €) |
| Coop "Alk.vaba siider Somersby Strawberry&Lime 0.5L prk" (1.25 €) | Rimi "Alk.vaba siider Somersby Strawberry&Lime 0,5l" (1.19 €) |
| Coop "Alk.vaba õlu Clausthaler Grapefruit 0.33L pdl" (1.25 €) | Rimi "Alk.vaba õlu Clausthaler Grapefruit 0,33l" (1.29 €) |
| Coop "Alk.vaba õlu Clausthaler Original 0.5L prk" (1.35 €) | Rimi "Alkoholivaba õlu Clausthaler Original 0,5l" (1.39 €) |
| Coop "Alk.vaba vahuvein Törley 0.75L pant" (5.99 €) | Rimi "Alk.vaba vahuvein roosa Törley 0,75l" (6.19 €) |
| Coop "Alk.vaba vahuvein Törley 0.75L pant" (5.99 €) | Selver "Alkoholivaba vahuvein Rose, TÖRLEY, 750 ml" (6.79 €) |
| Rimi "Alk.v. õlu Kronenbourg 1664 Blanc 0,33l pdl" (1.49 €) | Selver "Alkoholivaba Blanc, KRONENBOURG, 330 ml" (1.51 €) |
| Rimi "Alk.vaba jook Carlsberg Organic  0,33l pudel" (1.29 €) | Selver "Alkoholivaba õlu Carlsberg Organic, CARLSBERG, 330 ml pudel" (1.27 €) |
| Rimi "Alkoholivaba õlu A. Le Coq 0,33l prk" (0.99 €) | Selver "Alkoholivaba õlu A.Le Coq, A. LE COQ, 330 ml" (0.97 €) |
| Rimi "Alk.vaba vahuvein roosa Törley 0,75l" (6.19 €) | Selver "Alkoholivaba vahuvein Rose, TÖRLEY, 750 ml" (6.79 €) |
| Rimi "Alkoholivaba jook Passioni Mull Null 0,75l" (7.99 €) | Selver "Alkoholivaba jook Blush, MULL NULL, 750 ml" (6.99 €) |
| Rimi "Alkoholivaba jook Granaatõuna Mull Null 0,75l" (7.99 €) | Selver "Alkoholivaba jook Blush, MULL NULL, 750 ml" (6.99 €) |

### Beer & cider (30)

| Item A | Item B |
|---|---|
| Barbora "Hele õlu Holsten Premium 4,5% 0,5l purk" (1.19 €) | Coop "Hele õlu Holsten 4.5% 0.5L prk" (1.65 €) |
| Barbora "H.õlu Saku Originaal 4.7% 0.5L pdl" (1.89 €) | Rimi "Õlu Saku Originaal 4,7%vol 0,5l pudel" (1.85 €) |
| Barbora "Hele õlu PÕHJALA Prenzl. Berg 4.5% 330ml" (3.19 €) | Rimi "Õlu Prenzlauer Berg Põhjala 4,5% 0,33l" (3.39 €) |
| Barbora "Hele õlu PÕHJALA Kask 5% 440ml" (2.69 €) | Coop "Hele õlu Põhjala Kask 5% 0.44L prk" (2.55 €) |
| Barbora "H.õlu SAKU ORIGINAAL Smooth 4.6% 6x500ml" (7.99 €) | Coop "Hele õlu Saku Originaal Smooth 4.6% 6*0.5L prk" (10.79 €) |
| Barbora "Õlu SAKU On Ice Hola 4.5% 6x330ml" (4.69 €) | Rimi "Õlu Saku On Ice Hola 4,5% 0,33l purk 6-pakk" (8.19 €) |
| Barbora "Õlu TANKER Classic Amber 4.7% 500ml" (1.79 €) | Coop "Hele õlu Tanker Classic 4.7% 0.5L prk" (1.89 €) |
| Barbora "Õlu TANKER Classic Amber 4.7% 500ml" (1.79 €) | Rimi "Õlu Tanker Classic 4,7%vol 0,5l" (1.79 €) |
| Barbora "Tume õlu PORTER A.Le Coq 6.5% 500ml" (1.99 €) | Rimi "Õlu A.Le Coq Porter 6,5%vol 0,5l" (1.99 €) |
| Barbora "Tume õlu SAKU PORTER 6.9% 500ml" (2.15 €) | Rimi "Õlu Saku Porter 6,9% 0,5L" (1.69 €) |
| Barbora "Tume õlu Guinness Original 33cl 5%" (1.89 €) | Rimi "Õlu Guinness Original 5%vol 0,33l pdl" (1.99 €) |
| Barbora "Tume õlu ST.PIERRE Brune 6.5% 500ml" (2.59 €) | Coop "Tume õlu St.Pierre Brune 6.5% 0.5L prk" (2.45 €) |
| Barbora "Tume õlu SAKU Rubiin 5.5% 500ml" (1.49 €) | Rimi "Õlu Saku Rubiin 5,5%vol 0,5l purk" (1.59 €) |
| Barbora "Nisuõlu KROMBACHER Weizen 5.3% 500ml" (2.49 €) | Rimi "Õlu Krombacher Weizen 5,3%vol 0,5l prk" (2.49 €) |
| Barbora "Tume õlu TANKER Lager 5% 500ml" (1.89 €) | Rimi "Õlu Tume Lager Tanker 5% 0,5l purk" (1.39 €) |
| Barbora "Siider Ashton pirni maits. SIP 5% 500ml" (2.19 €) | Coop "Siider Ashton pirnimaitseline 5% 0.5L prk" (2.09 €) |
| Barbora "Siider Ashton pirni maits. SIP 5% 500ml" (2.19 €) | Rimi "Siider Ashton pirnimaitseline 5%vol 0,5l" (1.65 €) |
| Barbora "Siider Ashton õuna maits. SIP 5% 500ml" (2.19 €) | Coop "Siider Ashton õunamaitseline 5% 0.5L prk" (2.09 €) |
| Barbora "Siider Ashton õuna maits. SIP 5% 500ml" (2.19 €) | Rimi "Siider Ashton õunamaitseline 5%vol 0,5l" (1.65 €) |
| Barbora "Siider SOMERSBY Pear 4.5% 1L PET" (3.79 €) | Rimi "Perry Somersby Pear 4,5% 1l PET" (3.59 €) |
| Barbora "Pirnimaitseline siider TANKER 4.8% 500ml" (1.99 €) | Rimi "Siid. Tanker pirnimaitseline siider 4,8% 0,5l" (1.45 €) |
| Barbora "M.alk.jook HARTWALL Long Drink5.5%330ml" (1.89 €) | Rimi "M.alk.jook Hartwall Long Mandarin 5,5% 0,33l" (1.99 €) |
| Barbora "Muu.al.j. GARAGE Hard Lemon 4% 275ml pdl" (1.79 €) | Rimi "Muu alk.jook Garage Hard Lemon 4% 0,275l pdl" (1.79 €) |
| Barbora "M.a.j. KOFF Strong Grapefruit 8% 330ml" (1.99 €) | Rimi "M.a.jk Strong Grapefruit Koff 8% 0,33l" (1.69 €) |
| Barbora "Muu alkohoolne jook KOFF Twist5.5%500ml" (2.49 €) | Rimi "Muu alkohoolne jook Koff Twist 5,5% 0,5l purk" (2.39 €) |
| Barbora "Muu alk.jook KOFF Pineapple 5.5% 330ml" (1.59 €) | Coop "Muu alk.jook Koff Pineapple 5.5% 0.33L prk" (1.65 €) |
| Barbora "Muu alk.jook KOFF Pineapple 5.5% 330ml" (1.59 €) | Rimi "Muu alkohoolne jook Pineapple Koff 5,5% 0,33l" (1.19 €) |
| Barbora "Muu.alk.jook Saku on ICE Tsitr. 4% 0,33l" (1.09 €) | Rimi "Muu alk.jook Saku On Ice Ploom 4% 0,33l" (1.45 €) |
| Barbora "Alk.jook COOLER Sour Rhubarb 4% 275ml" (1.95 €) | Coop "Muu alk.jook Cooler Sour Rhubarb 4% 0.275L" (1.99 €) |
| Barbora "Muu al.j. SAAREMAA G&T Rhu 4.5% 275ml" (2.29 €) | Rimi "Muu alk.jook Saaremaa Rhu G&T 4,5%vol 0,275l" (2.29 €) |

### Wine (30)

| Item A | Item B |
|---|---|
| Barbora "GT vein FRONTERA Cab.Sauv. 750ml" (6.19 €) | Rimi "Gt. Vein Frontera Cabernet Sauv. 0,75l" (7.99 €) |
| Barbora "KGT vein TRAPICHE Reserve Malbec 750ml" (12.49 €) | Selver "Trapiche Vineyards Malbec 75 cl" (9.89 €) |
| Barbora "KPN kuiv vein TOMMASI Valpolicella 750ml" (15.49 €) | Selver "Tommasi Ripasso Valpolicella 75 cl" (30.75 €) |
| Barbora "KPN vein FAUSTINO VII Tinto 750ml" (12.49 €) | Selver "Faustino VII Red 75 cl" (10.30 €) |
| Barbora "KGT pun.vein MASI Campofiorin 750ml" (18.49 €) | Rimi "Kgt.vein Masi Campofiorin Appassimento  0,75l" (18.55 €) |
| Barbora "KGT pun.vein MASI Campofiorin 750ml" (18.49 €) | Selver "Masi Campofiorin Ripasso 75 cl" (19.99 €) |
| Barbora "GT vein TELIANI VALLEY Khvanchkara 750ml" (17.49 €) | Selver "Teliani Valley Mukuzani 75 cl" (12.99 €) |
| Barbora "GT vein TELIANI VALLEY Khvanchkara 750ml" (17.49 €) | Selver "Teliani Kindzmarauli 75 cl" (12.59 €) |
| Barbora "GT vein TELIANI VALLEY Kindzmar. 750ml" (13.99 €) | Selver "Teliani Valley Mukuzani 75 cl" (12.99 €) |
| Barbora "GT vein TELIANI VALLEY Kindzmar. 750ml" (13.99 €) | Selver "Teliani Kindzmarauli 75 cl" (12.59 €) |
| Barbora "KPN vein GRAN CASTILLO Reserve Cab.750ml" (9.79 €) | Rimi "Kpn.vein Gran Castillo Cab. Sauvignon 0,75l" (9.59 €) |
| Barbora "KPN vein TORRES Rioja Ibericos 750ml" (15.49 €) | Selver "Torres Ibericos Crianza Rioja 75 cl" (14.39 €) |
| Barbora "Vein SALENTEIN Malbec Barrel Sel. 750ml" (18.55 €) | Rimi "Vein Malbec Barrel Selection Salentein 0,75l" (19.09 €) |
| Barbora "Vein ROBERTSON Natural Sweet Rose 750ml" (8.49 €) | Coop "Rv Robertson Natural Sweet Rose 0.75L" (7.99 €) |
| Barbora "Vein ROBERTSON Natural Sweet Rose 750ml" (8.49 €) | Coop "Vv Robertson Natural Sweet White 0.75L" (7.99 €) |
| Barbora "Vein TOMMASI Graticcio Appassion.750ml" (16.99 €) | Selver "Tommasi Graticcio Appassionato 75 cl" (15.05 €) |
| Barbora "KPN vein ZONIN Ripasso Valpolic. 750ml" (15.25 €) | Selver "Zonin Ripasso Valpolicella 75 cl" (14.99 €) |
| Barbora "KPN vein JOHANN BRUNNER Dornf.Rose 750ml" (6.99 €) | Rimi "Kpn.vein Johann Brunner Dorf. Rose 0,75l" (8.19 €) |
| Barbora "Vein CONDE VILLAR Vinho Verde 750ml" (10.55 €) | Selver "Conde Villar Vinho Verde Branco 75 cl" (10.35 €) |
| Barbora "Vein CONDE VILLAR Vinho Verde 750ml" (10.55 €) | Selver "Conde Villar Vinho Verde Rose 75cl" (10.35 €) |
| Barbora "KPN vein DOPPIO PASSO Riserva 750ml" (15.69 €) | Rimi "Kgt.vein Doppio Passo Negroamaro 0,75l" (10.55 €) |
| Barbora "GT vein PICCINI Memoro Primitivo 750ml" (11.49 €) | Selver "Piccini Memoro Rosso 75 cl" (10.89 €) |
| Barbora "GT vein PICCINI Memoro Primitivo 750ml" (11.49 €) | Selver "Piccini Memoro Bianco 75 cl" (10.99 €) |
| Barbora "KPN vein DOPPIO PASSO Appassimento 750ml" (11.99 €) | Rimi "Kgt.vein Doppio Passo Negroamaro 0,75l" (10.55 €) |
| Barbora "GT vein YELLOW TAIL red 750ml" (8.99 €) | Selver "Yellow Tail Shiraz 75 cl" (10.99 €) |
| Barbora "GT vein YELLOW TAIL red 750ml" (8.99 €) | Selver "Yellow Tail Merlot 75 cl" (10.99 €) |
| Barbora "GT vein YELLOW TAIL red 750ml" (8.99 €) | Selver "Yellow Tail Moscato 75 cl" (10.99 €) |
| Barbora "KGT vein DREAMER Late Harv. Shiraz 750ml" (7.99 €) | Selver "DREAMER Late Harvest Shiraz 75 cl" (7.99 €) |
| Barbora "GT vein CASA SOLIS Caber.Sauvignon 750ml" (8.99 €) | Coop "Vv Casa Solis Sauvignon Blanc 0.75L" (7.69 €) |
| Barbora "KGT vein CASA CHARLIZE Pas.Puglia 750ml" (11.99 €) | Rimi "Kgt.vein Casa Charlize Primitivo Puglia 0,75l" (6.59 €) |

### Spirits (30)

| Item A | Item B |
|---|---|
| Barbora "Whisky CHIVAS REGAL 12 YO 40% 700ml" (44.99 €) | Rimi "Whisky Chivas Regal 12YO 40% 0,7l karbis" (32.99 €) |
| Barbora "Whisky BALLANTINES Finest 40% 1L" (35.99 €) | Coop "Whisky Ballantines 40% 1L" (28.90 €) |
| Barbora "Liköör VANA TALLINN Cream 16% 500ml" (10.99 €) | Coop "Liköör Vana Tallinn Marzipan Cream 16% 0.5L" (10.55 €) |
| Barbora "Liköör VANA TALLINN Cream 16% 500ml" (10.99 €) | Rimi "Liköör Koore Vana Tallinn 16% 0,5l" (11.05 €) |
| Barbora "Liköör VANA TALLINN Cream 16% 500ml" (10.99 €) | Rimi "Liköör Vana Tallinn koore 16% 0,5l" (11.05 €) |
| Barbora "Cognac HENNESSY VSOP 40% 700ml karp" (59.99 €) | Rimi "Cognac Hennessy VSOP 40% 0,7l" (59.99 €) |
| Barbora "Cognac HENNESSY XO 40% 700ml" (239.99 €) | Rimi "Cognac Hennessy VSOP 40% 0,7l" (59.99 €) |
| Barbora "Cognac MEUKOW VS 40% 700ml karp" (34.99 €) | Rimi "Cognac Meukow VS 40% 0,7l" (42.49 €) |
| Barbora "Cognac LARSEN VS 40% 500ml" (24.99 €) | Rimi "Cognac Larsen VS 40%vol 0,5l karp" (30.99 €) |
| Barbora "Piiritusjook STAR DOLLAR 3* 30 % 500ml" (10.69 €) | Rimi "Muu piiritusjook Star Dollar 3* 30%vol 0,5l" (10.99 €) |
| Barbora "Brandy BELÕJ AIST 5* 40% 500ml" (16.35 €) | Coop "Brandy Belõi Aist 5* 40% 0.5L" (15.65 €) |
| Barbora "Viin NEMIROFF Original 40% 700ml" (17.99 €) | Rimi "Viin Nemiroff Delikat 40% 0,7l" (17.99 €) |
| Barbora "Liköör VANA TALLINN Chocolate 16% 500ml" (10.99 €) | Rimi "Liköör Koore Vana Tallinn 16% 0,5l" (11.05 €) |
| Barbora "Liköör VANA TALLINN Chocolate 16% 500ml" (10.99 €) | Rimi "Liköör Vana Tallinn koore 16% 0,5l" (11.05 €) |
| Barbora "Viin STUMBRAS 40% 200ml" (6.45 €) | Rimi "Mait. viin Stumbras Cranberry 40%vol 0,2l" (4.99 €) |
| Barbora "Liköör KOSKENKORVA Minttu 35% 500ml" (14.99 €) | Rimi "Liköör Koskenkorva Minttu 35% 0,5l klaas" (14.69 €) |
| Barbora "Viin FINLANDIA Cranberry 37.5% 700ml" (14.99 €) | Rimi "Mait.viin Finlandia Vodka Cranb. 37,5% 0,7l" (16.99 €) |
| Barbora "Cognac HENNESSY VSOP 40% 500ml,karp" (49.99 €) | Rimi "Cognac Hennessy VSOP 40% 0,5l" (59.49 €) |
| Barbora "Maits.Viin ZUBROWKA Bis.Grass 37.5% 0.5L" (12.85 €) | Rimi "Mait. viin Zubrowka Bison Grass 37,5% 0,5l" (11.49 €) |
| Barbora "Muu alkohoollne jook APEROL 11% 1l" (19.99 €) | Rimi "Muu alkohoolne jook Aperol 11%vol 1l" (26.99 €) |
| Barbora "Viin GORILKA Klassitšna 40% 500ml" (12.25 €) | Rimi "Viin Gorilka  Klasična 40% 0,5l" (12.29 €) |
| Barbora "Viin GORILKA Klassitšna 40% 500ml" (12.25 €) | Rimi "Viin Gorilka  Pšeničnaja 40% 0,5l" (8.99 €) |
| Barbora "Viin GORILKA Klassitšna 40% 500ml" (12.25 €) | Rimi "Viin Gorilka  Ržanaja 40% 0,5l" (8.99 €) |
| Barbora "Viin LAUA 40% 100ml Pet" (2.45 €) | Rimi "Viin Laua Viin 40% 0,1l" (2.49 €) |
| Barbora "Rumm The COLONIST Dark 40% 70cl" (18.59 €) | Rimi "Rumm Colonist Premium Dark 40% 0,7l" (18.79 €) |
| Barbora "Brandy ASKANELI 5YO 40% 500ml" (13.99 €) | Rimi "Brandy Gocha Askaneli 5 YO 40%vol 0,5l" (16.55 €) |
| Barbora "Rumm HAVANA CLUB Especial 37,5% 0,7l" (26.49 €) | Rimi "Rumm Havana Club Especial Cuban 37,5% 0,7l" (20.85 €) |
| Barbora "Viin STUMBRAS Jõhvikas 40% 200ml" (6.19 €) | Rimi "Mait. viin Stumbras Cranberry 40%vol 0,2l" (4.99 €) |
| Barbora "Tequila OLMECA Silver 35% 700ml" (31.99 €) | Rimi "Piiritusjook Olmeca Tequila Silver 35% 0,7l" (31.99 €) |
| Barbora "Gin TANQUERAY Blackc. Royale 41.3% 700ml" (29.99 €) | Rimi "Dest. gin Tanqueray Blackc. Royale 41,3% 0,7l" (34.05 €) |

### Curd snacks & desserts (23)

| Item A | Item B |
|---|---|
| Barbora "Glasuurkohuke KARUMS karamelli, 45g" (0.56 €) | Rimi "Kohuke karamelli Karums 45g" (0.56 €) |
| Barbora "Kohuke ALMA metsmaasika 40g" (0.49 €) | Rimi "Kohuke metsmaasika kakaoglas. Alma 40g" (0.49 €) |
| Barbora "Kohuke TERE šokolaadi 37g" (0.39 €) | Rimi "Kohuke šokolaadi šokolaadigl. Tere 37g" (0.39 €) |
| Barbora "Dessert ZOTT Liegois maasika, 175g" (0.89 €) | Rimi "Dessert maasika Liegeois Zott 175g" (0.89 €) |
| Barbora "Panna Cotta NOPRI Fitlap kohvi, 150g" (1.46 €) | Selver "Panna cotta kohvi, NOPRI, 150 g" (1.95 €) |
| Barbora "Panna CottaNOPRI MangoPassioniFitlap150g" (1.49 €) | Selver "Panna Cotta tiramisu, NOPRI, 150 g" (1.95 €) |
| Barbora "Panna CottaNOPRI MangoPassioniFitlap150g" (1.49 €) | Selver "Panna Cotta apelsini, NOPRI, 150 g" (1.95 €) |
| Barbora "Panna CottaNOPRI MangoPassioniFitlap150g" (1.49 €) | Selver "Panna Cotta vanilje, NOPRI, 150 g" (1.95 €) |
| Barbora "Panna CottaNOPRI MangoPassioniFitlap150g" (1.49 €) | Selver "Panna cotta kohvi, NOPRI, 150 g" (1.95 €) |
| Barbora "Biskviitkook KINDER Milk Slice, 28g" (0.80 €) | Rimi "Biskviitmaiustus Kinder Milk Slice 28g" (0.85 €) |
| Barbora "Dessert KINDER Maxi King 3x35g" (2.99 €) | Rimi "Biskviitmaius Kinder Maxi King 3x35g" (2.99 €) |
| Coop "Vanillikreem Karums 150g" (1.19 €) | Rimi "Karamellikreem Karums 150g" (1.19 €) |
| Coop "Kohupiimakreem kakao Alma 380g" (1.95 €) | Rimi "Kohupiimakreem brownie Alma 380g" (1.59 €) |
| Coop "Kohupiimakreem kakao Alma 380g" (1.95 €) | Rimi "Kohupiimakreem rosina Alma 380g" (1.59 €) |
| Coop "Kohupiimakreem rosina-vanilli Alma 380g" (1.95 €) | Rimi "Kohupiimakreem rosina Alma 380g" (1.59 €) |
| Coop "Kohupiimakreem vanilli Alma 300g toru" (1.49 €) | Rimi "Kohupiimakreem vanilli Alma 300g" (1.49 €) |
| Coop "Koorekreem karamelli Karums 150g" (1.19 €) | Selver "Koorekreem kakao, KARUMS, 150 g" (1.11 €) |
| Coop "Koorekreem karamelli Karums 150g" (1.19 €) | Selver "Koorekreem sidrunimaitseline, KARUMS, 150 g" (1.17 €) |
| Rimi "Kohuke vanilli Karums 45g" (0.49 €) | Selver "Kohuke mustika, KARUMS, 45 g" (0.59 €) |
| Rimi "Kohuke šokolaadi Karums 45g" (0.56 €) | Selver "Kohuke mustika, KARUMS, 45 g" (0.59 €) |
| Rimi "Kohuke karamelli Karums 45g" (0.56 €) | Selver "Kohuke mustika, KARUMS, 45 g" (0.59 €) |
| Rimi "Kohuke kookose Karums 45g" (0.56 €) | Selver "Kohuke mustika, KARUMS, 45 g" (0.59 €) |
| Rimi "Kohupiimadessert gl. vanilli Jeppi 38g" (0.39 €) | Selver "Vanillimaitseline kohupiimadessert, JEPPI, 38 g" (0.43 €) |

### Milk drinks & drinking yoghurt (3)

| Item A | Item B |
|---|---|
| Barbora "Joogijogurt ALMA ploomi-jäätise, 275g" (1.34 €) | Selver "Jogurtijook ploomi-jäätisemaitseline, ALMA, 275 g" (1.34 €) |
| Barbora "Piimajook VÄIKE TOM UHT maasika,200ml" (0.85 €) | Rimi "Piimajook maasika Väike Tom 200ml" (0.79 €) |
| Barbora "Magustatud kondenspiim šokol.,JAANI 250g" (2.05 €) | Selver "Kondenspiim šokolaadi, JAANI, 250 g" (2.08 €) |

### Crispbreads (3)

| Item A | Item B |
|---|---|
| Barbora "Näkileivad FINN CRISP Traditional 200g" (2.39 €) | Selver "Finn Crisp Traditional, FINN CRISP, 200 g" (2.69 €) |
| Barbora "Näkileivad Fibre WASA 230g" (2.85 €) | Rimi "Näkileib Wasa Fibre 230g" (2.85 €) |
| Rimi "Rukkisnäkid Creamy Ranch Finn Crisp 150g" (3.59 €) | Selver "Täistera rukkisnäkid Creamy Ranch, FINN CRISP, 150g" (3.65 €) |

### Energy, sports & iced-tea drinks (30)

| Item A | Item B |
|---|---|
| Barbora "Energiajook BATTERY 400ml" (1.29 €) | Rimi "Energiajook Battery 0,4l pudel" (1.29 €) |
| Barbora "Energiajook RED BULL Green Editions250ml" (1.69 €) | Rimi "Energiajook Red Bull Green Edition 0,25l" (0.99 €) |
| Barbora "Energiajook BATTERY 500ml" (1.59 €) | Coop "Energiajook Battery 0.5L prk" (1.39 €) |
| Barbora "Energiajook MONSTER Mango Loco 500ml" (1.79 €) | Rimi "Energiajook Monster Juice Mango Loco 0,5l" (1.75 €) |
| Barbora "Energiajook MONSTER Zero Ultra 500ml" (1.79 €) | Rimi "Energiajook Monster Zero Ultra suhkruvab.0,5l" (1.75 €) |
| Barbora "Energiajook MONSTER Zero Ultra 500ml" (1.79 €) | Selver "Energiajook Ultra Gold, MONSTER, 500 ml" (1.69 €) |
| Barbora "Energiajook MONSTER Zero Ultra 500ml" (1.79 €) | Selver "Energiajook Ultra Rosa Zero, MONSTER, 500 ml" (1.69 €) |
| Barbora "Energiajook BATTERY Strawberry&Lime500ml" (1.59 €) | Rimi "Energiajook Battery Strawberry+Lime 0,5l purk" (1.59 €) |
| Barbora "Energiajook MONSTER Ultra Rosa 500ml" (1.79 €) | Selver "Energiajook Ultra Gold, MONSTER, 500 ml" (1.69 €) |
| Barbora "Energiajook MONSTER Ultra Rosa 500ml" (1.79 €) | Selver "Energiajook Ultra Rosa Zero, MONSTER, 500 ml" (1.69 €) |
| Barbora "Energiajook BATTERY vaarikamaits.500ml" (1.69 €) | Coop "Energiajook Battery 0.5L prk" (1.39 €) |
| Barbora "Energiajook MONSTER Ultra Ruby Red 500ml" (1.79 €) | Selver "Energiajook Ultra Fantasy Ruby Red, MONSTER, 500 ml" (1.69 €) |
| Barbora "Spordijook ARCTIC SPORT pun.greip 0.75l" (1.39 €) | Rimi "Spordijook Arctic Sport Zero pun.greip 0,75l" (1.39 €) |
| Barbora "Isotoonil.spordijook Faster mango 750ml" (1.29 €) | Selver "Isotooniline spordijook mango, FASTER, 750 ml" (1.39 €) |
| Barbora "Isot.spordijook Faster multifruit 750ml" (1.29 €) | Selver "Isotooniline spordijook multifruit, FASTER, 750 ml" (1.39 €) |
| Barbora "Spordijook Golden Soleil NOCCO 330ml" (2.49 €) | Selver "Energiajook Golden Soleil, NOCCO, 330 ml" (2.53 €) |
| Barbora "Spordijook GoldiBerry NOCCO 330ml" (2.49 €) | Selver "Energiajook GoldiBerry, NOCCO, 330 ml" (2.53 €) |
| Barbora "Roheline jäätee NESTEA Sidruni 1,5l" (2.09 €) | Coop "Nestea Lemon jäätee 1.5L sidrunimaits." (2.05 €) |
| Coop "Energiajook Red Bull Green Edition 0.25L prk" (1.69 €) | Rimi "Energiajook Red Bull Green Edition 0,25l" (0.99 €) |
| Coop "Nestea Peach Zero jäätee 1.5L virsiku" (2.05 €) | Rimi "Jäätee Nestea virsiku zero 1,5l" (2.09 €) |
| Coop "Nestea Peach jäätee 1.5L virsikumaits." (2.05 €) | Rimi "Jäätee Nestea virsiku zero 1,5l" (2.09 €) |
| Coop "Nestea Peach jäätee 0.5L virsikumaits." (1.45 €) | Rimi "Jäätee virsikumaitseline Nestea 0,5l" (1.25 €) |
| Coop "Nestea Lemon jäätee 0.5L sidrunimaits." (1.45 €) | Rimi "Jäätee sidrunimaitseline Nestea 0,5l" (1.25 €) |
| Rimi "Energiajook Red Bull Winter Edition 0,25l" (0.99 €) | Selver "Energiajook Cherry Edition, RED BULL, 250 ml" (1.68 €) |
| Rimi "Energiajook Starter Cherry 0,5l" (0.99 €) | Selver "Enegriajook Cherry, STARTER, 500 ml" (1.31 €) |
| Rimi "Energiajook Starter Cherry 0,5l" (0.99 €) | Selver "Energiajook Passion, STARTER, 500 ml" (1.31 €) |
| Rimi "Energiajook Monster Zero Ultra suhkruvab.0,5l" (1.75 €) | Selver "Energiajook Ultra Rosa Zero, MONSTER, 500 ml" (1.69 €) |
| Rimi "Energiajook Red Bull Green Edition 0,25l" (0.99 €) | Selver "Energiajook Cherry Edition, RED BULL, 250 ml" (1.68 €) |
| Rimi "Energiajook Monster Ultra Gold magusain. 0,5l" (1.75 €) | Selver "Energiajook Ultra Gold, MONSTER, 500 ml" (1.69 €) |
| Rimi "Energiajook Red Bull Peach Edition 0,25l" (0.99 €) | Selver "Energiajook Cherry Edition, RED BULL, 250 ml" (1.68 €) |

### Syrups & juice drinks (24)

| Item A | Item B |
|---|---|
| Barbora "Siirup MONIN karamelli 250ml" (6.19 €) | Rimi "Siirup Caramel Monin 0,25l" (5.79 €) |
| Barbora "Siirup MONIN karamelli 250ml" (6.19 €) | Rimi "Siirup Grenadiin Monin 0,25l" (5.79 €) |
| Barbora "Siirup MONIN karamelli 250ml" (6.19 €) | Rimi "Siirup Iiri Monin 0,25l" (5.79 €) |
| Barbora "Siirup MONIN grenadiini 250ml" (4.59 €) | Rimi "Siirup Caramel Monin 0,25l" (5.79 €) |
| Barbora "Siirup MONIN grenadiini 250ml" (4.59 €) | Rimi "Siirup Grenadiin Monin 0,25l" (5.79 €) |
| Barbora "Siirup MONIN grenadiini 250ml" (4.59 €) | Rimi "Siirup Iiri Monin 0,25l" (5.79 €) |
| Barbora "Siirup AURA vaarikamaitseline 750ml" (2.05 €) | Rimi "Siirup vaarikamaitseline Aura 0,75l PET" (2.05 €) |
| Barbora "Siirup AURA vaarikamaitseline 750ml" (2.05 €) | Selver "Siirup Pirni, AURA, 750 ml" (2.05 €) |
| Barbora "Siirup AURA vaarikamaitseline 750ml" (2.05 €) | Selver "Siirup Rabarber, AURA, 750 ml" (2.05 €) |
| Barbora "Siirup AURA vaarikamaitseline 750ml" (2.05 €) | Selver "Siirup Vaarikas, AURA, 750 ml" (2.05 €) |
| Barbora "Siirup AURA rabarberimaitseline 750ml" (2.05 €) | Selver "Siirup Pirni, AURA, 750 ml" (2.05 €) |
| Barbora "Siirup AURA rabarberimaitseline 750ml" (2.05 €) | Selver "Siirup Rabarber, AURA, 750 ml" (2.05 €) |
| Barbora "Siirup AURA rabarberimaitseline 750ml" (2.05 €) | Selver "Siirup Vaarikas, AURA, 750 ml" (2.05 €) |
| Barbora "Mahlajook DR.ACTIVE Apels.Anan.Porg.1.5L" (1.85 €) | Rimi "Mahlajook Dr.Active apels-ananass-porg. 1,5l" (1.85 €) |
| Barbora "Mahlaj.DON SIMON punase viinamarja 330ml" (1.39 €) | Selver "Punase viinamarja mahlajook, DON SIMON, 330 ml" (1.49 €) |
| Coop "Heliis Siirup jõhvikamaitseline 0.5L" (1.75 €) | Selver "Metsvaarikamaitseline siirup, HELIIS, 500 ml" (1.77 €) |
| Rimi "Konts.mahlajook mustsõstra Küllus 0,33l" (5.59 €) | Selver "Mustasõstra kontsentreeritud mahlajook, KÜLLUS, 330 ml" (5.64 €) |
| Rimi "Siirup pirnimaitseline Aura 0,75l PET" (2.05 €) | Selver "Siirup Pirni, AURA, 750 ml" (2.05 €) |
| Rimi "Mahlajook vaarika Limpa 0,25l" (0.59 €) | Selver "Vaarika kõrrejook, LIMPA, 250 ml" (0.60 €) |
| Rimi "Mahlajook mustika Limpa 0,25l" (0.59 €) | Selver "Mustika kõrrejook, LIMPA, 250 ml" (0.60 €) |
| Rimi "Apelsinijook Pfanner 2l" (3.79 €) | Selver "Multimahlajook, PFANNER, 2 l" (3.24 €) |
| Rimi "Passionvilja mahlajook Pfanner 1l" (2.09 €) | Selver "Granadilli mahlajook, PFANNER, 1 L" (2.63 €) |
| Rimi "Passionvilja mahlajook Pfanner 1l" (2.09 €) | Selver "Ananassi mahlajook, PFANNER, 1 L" (2.35 €) |
| Rimi "Passionvilja mahlajook Pfanner 1l" (2.09 €) | Selver "Maasika mahlajook, PFANNER, 1 L" (2.53 €) |

### Frozen fish & seafood (4)

| Item A | Item B |
|---|---|
| Barbora "Külm.mintai kalapulgad FINDUS, 420g" (5.65 €) | Rimi "Kalapulgad mintai fileest Findus 420g" (5.65 €) |
| Barbora "Külm.mintai kalapulgad FINDUS, 420g" (5.65 €) | Selver "Alaska mintai kalapulgad, FINDUS, 420 g" (5.68 €) |
| Barbora "Külm.tiigerkrevet.keedetud,kooritud,300g" (9.99 €) | Rimi "Kuningkrevetid Nowaco kooritud ASC 300g" (10.69 €) |
| Rimi "Kalapulgad mintai fileest Findus 420g" (5.65 €) | Selver "Alaska mintai kalapulgad, FINDUS, 420 g" (5.68 €) |

### Frozen dough & pastries (2)

| Item A | Item B |
|---|---|
| Barbora "Külm.magus muretaigen EESTI PAGAR,500g" (2.49 €) | Selver "Magus muretainas, EESTI PAGAR, 500 g" (2.53 €) |
| Barbora "Külm spinat-juustupirukasEESTI PAGAR360g" (3.29 €) | Selver "Singi-juustupirukas, EESTI PAGAR, 360 g" (4.09 €) |

### Broths & stock (9)

| Item A | Item B |
|---|---|
| Barbora "Kanapul.till.peters.GALLINA BLANCA 8x10g" (0.89 €) | Rimi "Kanapuljong till-peters. Gallina Blanca 8x10g" (0.95 €) |
| Barbora "Seenepuljong GALLINA BLANCA 8x10g" (0.89 €) | Coop "Loomalihapuljong Gallina Blanca 8*10g" (1.05 €) |
| Barbora "Seenepuljong GALLINA BLANCA 8x10g" (0.89 €) | Rimi "Puravikupuljong Gallina Blanca 8x10g" (0.95 €) |
| Barbora "Kanapuljong MAGGI 160g" (3.09 €) | Rimi "Vedel Kanapuljong Maggi 160g" (3.09 €) |
| Barbora "Kanapuljong tilli.peterselliga MAGGI 80g" (1.15 €) | Rimi "Kanapuljong tilli ja peterselliga Maggi 80g" (0.99 €) |
| Barbora "Thai puljong MAGGI 80g" (1.79 €) | Rimi "Puljong veiseliha Maggi 80g" (1.55 €) |
| Barbora "Thai puljong MAGGI 80g" (1.79 €) | Rimi "Puljong Tai Maggi 80g" (1.89 €) |
| Coop "Kanapuljong Gallina Blanca 8*10g tilli,peterselli" (0.95 €) | Rimi "Kanapuljong till-peters. Gallina Blanca 8x10g" (0.95 €) |
| Coop "Loomalihapuljong Gallina Blanca 8*10g" (1.05 €) | Rimi "Puravikupuljong Gallina Blanca 8x10g" (0.95 €) |

