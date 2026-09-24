# Price comparison review

Generated 2026-09-24 by `npm run review` (scraper/build-review.js) from already-scraped data — data/raw/ and data/prices.json. Never contacts a store; run `npm run fetch-prices` first for fresh numbers. Unmatched/unclassified/ambiguous counts and listings are recomputed fresh from data/raw/ every time (not read from data/unmatched.json etc., which a single-category run narrows to just that category — see the comment at the top of this file).

Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to the ambiguous list instead of a guess. Selver has no live stock signal in its public API, so its price always carries a "Selver: availability not verified" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Bread | Drinks | Total |
|---|---|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 15 + 29 + 25 | 201 + 276 + 261 | 130 + 80 + 134 | 117 + 94 + 98 | 418 + 420 + 349 | 2647 |
| Matched (any store combination) | 12 | 66 | 32 | 74 | 76 | 260 |
| — at all 3 stores | 1 | 18 | 11 | 17 | 19 | 66 |
| — at 2 stores only (Barbora + Rimi) | 1 | 22 | 3 | 26 | 14 | 66 |
| — at 2 stores only (Barbora + Selver) | 2 | 12 | 12 | 22 | 31 | 79 |
| — at 2 stores only (Rimi + Selver) | 8 | 14 | 6 | 9 | 12 | 49 |
| Unmatched | 38 | 567 | 269 | 144 | 1013 | 2031 |
| Unclassified | 0 | 4 | 0 | 0 | 0 | 4 |
| Ambiguous groups | 2 | 5 | 0 | 0 | 1 | 8 |

## 1. All matched products

| Product | Category | Barbora | Rimi | Selver | Cheapest |
|---|---|---|---|---|---|
| Aptamil 1 400g | Baby formula | 10.99 € | 11.59 € | — | Barbora |
| Aptamil 1 800g | Baby formula | 15.99 € | 18.99 € | 19.19 € | Barbora |
| Aptamil Piimapulber 3 800g | Baby formula | — | 14.05 € | 19.19 € | Rimi |
| Aptamil Piimapulber 4 800g | Baby formula | — | 14.05 € | 19.19 € | Rimi |
| Aptamil Piimasegu 2 1200g | Baby formula | — | 24.49 € | 24.49 € | Rimi + Selver |
| Aptamil Piimasegu 2 800g | Baby formula | — | 14.05 € | 19.19 € | Rimi |
| Aptamil Piimasegu 3 1200g | Baby formula | — | 24.49 € | 24.49 € | Rimi + Selver |
| Hipp Jätkup 2 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Hipp Öko 400g | Baby formula | 20.29 € | — | 20.32 € | Barbora |
| Hipp P 1 800g | Baby formula | — | 19.99 € | 20.90 € | Rimi |
| Tutteli Piimasegu 2 650g | Baby formula | — | 9.99 € | 9.99 € | Rimi + Selver |
| Tutteli Tuttelitm 1 650g | Baby formula | 9.99 € | — | 9.99 € | Barbora + Selver |
| Eesti pagar Haputaina pehmik 240g | Bread | 1.17 € | — | 1.17 € | Barbora + Selver |
| Eesti pagar Haputaina röst 430g | Bread | 1.59 € | 1.59 € | — | Barbora + Rimi |
| Eesti pagar Hele ciabatta 300g | Bread | 1.09 € | 1.19 € | — | Barbora |
| Eesti pagar Juusturöst tosta 430g | Bread | — | 1.89 € | 1.59 € | Selver |
| Eesti pagar Kaera pehmik 220g | Bread | 1.15 € | — | 1.17 € | Barbora |
| Eesti pagar Kaerasepik 300g | Bread | 1.25 € | 1.25 € | — | Barbora + Rimi |
| Eesti pagar Kanepiseemne leib rukkiteradega 500g | Bread | 1.55 € | — | 1.58 € (1.29 € Partner) | Barbora |
| Eesti pagar Kartuli pehmik röstsibula 240g | Bread | 1.29 € | — | 1.29 € | Barbora + Selver |
| Eesti pagar Leib peremehe 600g | Bread | 1.29 € | — | 1.29 € | Barbora + Selver |
| Eesti pagar Mitmevilja pehmik 240g | Bread | 0.89 € | — | 1.17 € | Barbora |
| Eesti pagar Must rukkileib 390g | Bread | 1.15 € | 1.15 € | — | Barbora + Rimi |
| Eesti pagar Must vormileib 600g | Bread | 0.89 € | 1.25 € | — | Barbora |
| Eesti pagar Narva peenleib 310g | Bread | 0.76 € | 0.75 € | — | Rimi |
| Eesti pagar Pagari kaeraröst 430g | Bread | 1.49 € | 1.59 € | — | Barbora |
| Eesti pagar Pealinna peenleib 490g | Bread | 1.27 € | 0.99 € | — | Rimi |
| Eesti pagar Peedi pastinaagi pehmik porgandi 240g | Bread | 1.29 € | — | 1.35 € | Barbora |
| Eesti pagar Põrandaleib peremehe 450g | Bread | 1.65 € | 1.79 € | 1.67 € | Barbora |
| Eesti pagar Rehe koorikleib 200g | Bread | 0.80 € | — | 0.80 € | Barbora + Selver |
| Eesti pagar Rehe rukkileib 390g | Bread | 0.89 € | 1.09 € | — | Barbora |
| Eesti pagar Röstsai tosta 500g | Bread | 0.99 € | 1.19 € | — | Barbora |
| Eesti pagar Rukkiröst tosta 390g | Bread | 1.09 € | 1.19 € | 1.41 € | Barbora |
| Eesti pagar Rukkisepik 300g | Bread | 1.19 € | 1.09 € | — | Rimi |
| Eesti pagar Rukkitasku 340g | Bread | 1.05 € (0.79 € Aitäh) | — | 1.09 € | Barbora |
| Eesti pagar Seemneleib jassi 310g | Bread | 1.17 € | 1.17 € | — | Barbora + Rimi |
| Eesti pagar Sepik õnne 300g | Bread | 1.09 € | 1.09 € | — | Barbora + Rimi |
| Eesti pagar Suur perenaise sai 500g | Bread | 1.21 € | 0.89 € | — | Rimi |
| Eesti Pagar täistera röstsepik 500g | Bread | 1.55 € | 1.19 € | — | Rimi |
| Eesti pagar Täisterasepik 500g | Bread | 1.19 € | 1.09 € | 1.55 € | Rimi |
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
| Fazer Võileiva food street tasku 400g | Bread | 2.59 € | — | 2.65 € (2.25 € Partner) | Barbora |
| Leibur Isa peenleib 355g | Bread | 0.99 € | 0.99 € | 0.99 € | Barbora + Rimi + Selver |
| Leibur Kirde sai 300g | Bread | 1.09 € | 0.99 € | 0.89 € | Selver |
| Leibur Kodune sepik 250g | Bread | 0.65 € | 0.69 € | 0.65 € | Barbora + Selver |
| Leibur Kuldne klassikaline röstsai 250g | Bread | 1.25 € | — | 1.27 € | Barbora |
| Leibur Kuldne klassikaline röstsai 500g | Bread | 1.09 € | — | 0.95 € | Selver |
| Leibur Mitmevilja röst 250g | Bread | — | 1.69 € | 1.62 € | Selver |
| Leibur Peenleib isa seemnetega 390g | Bread | 1.05 € | 1.05 € | 1.05 € | Barbora + Rimi + Selver |
| Leibur Röstsai graham kuldne 500g | Bread | — | 1.55 € | 0.69 € | Selver |
| Leibur Röstsai kuldne täistera 500g | Bread | — | 1.79 € | 1.79 € | Rimi + Selver |
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
| Leibur Vilja kuldne röstsai 525g | Bread | 1.55 € | 1.55 € | 1.55 € | Barbora + Rimi + Selver |
| Lõuna pagarid Rukkileib seemnetega 300g | Bread | — | 1.69 € | 1.59 € | Selver |
| Alma Koorejogurt muah stracciatella 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Koorejogurt muah troopiline 180g | Dairy | 1.29 € | — | 1.31 € | Barbora |
| Alma Koorejogurt muah vanilli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Kreeka jogurt maitsestamata 180g | Dairy | 0.94 € | — | 0.94 € | Barbora + Selver |
| Alma Kreeka jogurt maitsestamata 370g | Dairy | 1.65 € | — | 1.65 € (1.39 € Partner) | Barbora + Selver |
| Alma Muah koorejogurt rukkileiva-kaneeli 380g | Dairy | 1.39 € | 1.39 € | 1.68 € | Barbora + Rimi |
| Alma Piim 1500ml | Dairy | 1.39 € | 1.39 € | 1.29 € | Selver |
| Alma Piim 500ml | Dairy | 0.80 € | 0.82 € | 0.80 € | Barbora + Selver |
| Alma Täispiim 2000ml | Dairy | — | 1.99 € | 1.99 € | Rimi + Selver |
| Alma Või 200g | Dairy | 2.49 € | 2.49 € | 2.39 € (1.49 € Partner) | Selver |
| Estover Taluvõi eesti 150g | Dairy | 2.19 € | — | 2.39 € | Barbora |
| Farmi Koorene jogurt kirss must 400g | Dairy | 1.79 € | 1.19 € | — | Rimi |
| Farmi Koorene jogurt maasikatega 400g | Dairy | — | 1.19 € | 1.79 € (1.19 € Partner) | Rimi |
| Farmi Koorene jogurt mustasõstra 200g | Dairy | 1.19 € | — | 1.19 € | Barbora + Selver |
| Farmi Koorene jogurt mustikatega 400g | Dairy | 1.79 € | — | 1.49 € | Selver |
| Farmi Koorene jogurt virsikutega 400g | Dairy | 1.79 € | — | 1.79 € (1.19 € Partner) | Barbora + Selver |
| Farmi Kreeka jogurt 370g | Dairy | 1.49 € | — | 1.79 € | Barbora |
| Farmi Piim kiles 1000ml | Dairy | 0.89 € | — | 0.62 € | Selver |
| Farmi Piim pure 1500ml | Dairy | — | 1.59 € | 1.49 € | Selver |
| Farmi Skyr maasika 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Farmi Skyr virsiku 300g | Dairy | 1.39 € | 1.79 € | 1.82 € | Barbora |
| Hellus Jogurt maitsestamata 1000g | Dairy | 2.05 € | — | 2.09 € | Barbora |
| Kiivi koorene farmi 400g | Dairy | 1.79 € | 1.79 € | 1.82 € | Barbora + Rimi |
| Mo saaremaa Või 200g | Dairy | 2.49 € (1.75 € Aitäh) | 2.49 € | — | Barbora + Rimi |
| Mo saaremaa Või küüsl soolakrist 150g | Dairy | 2.19 € (1.75 € Aitäh) | 2.19 € | — | Barbora + Rimi |
| Saare Jogurt maitsestamata 400g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Saare Jogurtikreem laktoosivaba sidruni lactose-free 400g | Dairy | — | 1.79 € | 1.82 € (1.39 € Partner) | Rimi |
| Saare Jogurtikreem passioni vaarika 400g | Dairy | 1.25 € | 1.79 € | 1.82 € (1.39 € Partner) | Barbora |
| Saare Kreeka jogurt 380g | Dairy | 1.29 € | — | 1.89 € | Barbora |
| Tere Piim pure 1000ml | Dairy | — | 1.29 € | 1.09 € | Selver |
| Tere Või 200g | Dairy | 2.59 € | 2.19 € | 2.59 € | Rimi |
| Tere Või laktoosivaba lactose-free 200g | Dairy | — | 2.79 € | 3.29 € | Rimi |
| A. le coq Kali klassikaline 2000ml | Drinks | 2.09 € | — | 2.08 € | Selver |
| A. le coq Kali klassikaline 500ml | Drinks | 0.99 € | — | 0.97 € | Selver |
| A. le coq Kali rukkilinnase 500ml | Drinks | 1.05 € | — | 0.99 € | Selver |
| A. le coq Karastusjook barbariss 1500ml | Drinks | 1.55 € | — | 1.58 € (1.09 € Partner) | Barbora |
| Aura Ananassinektar 1000ml | Drinks | 2.75 € | 2.85 € | 2.19 € | Selver |
| Aura Apelsinimahl 1000ml | Drinks | 2.39 € | 2.39 € | 1.89 € | Selver |
| Aura Köögiviljamahl 1000ml | Drinks | — | 1.95 € | 1.85 € | Selver |
| Aura Multinektar 1000ml | Drinks | 1.89 € | 1.89 € | 1.89 € | Barbora + Rimi + Selver |
| Aura Õunamahl 1000ml | Drinks | 1.99 € | — | 1.98 € | Selver |
| Aura Pirninektar 1000ml | Drinks | — | 2.05 € | 1.89 € | Selver |
| Aura Ploominektar 1000ml | Drinks | 1.75 € | 1.79 € | 1.45 € | Selver |
| Aura Punase greibi nektar 1000ml | Drinks | 1.89 € | — | 1.89 € | Barbora + Selver |
| Aura Tomatimahl 1000ml | Drinks | 1.79 € | 1.79 € | 1.76 € | Selver |
| Aura Vesi gaasita spring 1500ml | Drinks | 0.78 € | — | 0.78 € | Barbora + Selver |
| Aura Viinamarjanektar 1000ml | Drinks | 1.79 € | — | 1.79 € | Barbora + Selver |
| Cappy Apelsininektar 1000ml | Drinks | 2.95 € (1.69 € Aitäh) | — | 2.95 € | Barbora + Selver |
| Cappy Multivitamiininektar 1L | Drinks | 2.85 € (1.69 € Aitäh) | 1.99 € | 2.89 € | Rimi |
| Cappy Õunanektar 1000ml | Drinks | 2.55 € (1.69 € Aitäh) | — | 2.59 € | Barbora |
| Cido Köögiviljamahl 1000ml | Drinks | 1.85 € | — | 1.82 € | Selver |
| Coca-cola Karastusjook 1500ml | Drinks | 2.25 € | 2.25 € | 2.29 € | Barbora + Rimi |
| Coca-cola Karastusjook 2000ml | Drinks | 2.85 € | 2.85 € | 2.73 € (2.09 € Partner) | Selver |
| Coca-cola Karastusjook 200ml | Drinks | 0.79 € | — | 0.80 € | Barbora |
| Coca-cola Karastusjook 500ml | Drinks | 1.29 € | — | 1.27 € | Selver |
| Coca-cola Karastusjook cherry 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | 1.21 € (0.89 € Partner) | Rimi |
| Coca-cola Karastusjook zero 1500ml | Drinks | 2.29 € | 2.25 € | — | Rimi |
| Coca-cola Karastusjook zero 2000ml | Drinks | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Coca-cola Karastusjook zero 500ml | Drinks | 1.29 € | 1.29 € | — | Barbora + Rimi |
| Coca-cola Karastusjook zero 6x330ml | Drinks | 6.19 € | 6.19 € | — | Barbora + Rimi |
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
| Evian Looduslik mineraalvesi 1500ml | Drinks | 2.25 € | 2.25 € | — | Barbora + Rimi |
| Fanta Karastusjook 330ml | Drinks | 1.21 € (1.21 € Aitäh) | — | 1.21 € (0.89 € Partner) | Barbora + Selver |
| Fanta Karastusjook apelsini 1500ml | Drinks | 2.29 € | 2.29 € | 2.29 € | Barbora + Rimi + Selver |
| Fanta Karastusjook apelsini 2000ml | Drinks | 2.85 € | 2.85 € | — | Barbora + Rimi |
| Fanta Karastusjook apelsini 500ml | Drinks | 1.29 € | 1.29 € | 1.27 € | Selver |
| Fanta Karastusjook orange 850ml | Drinks | 1.69 € | 1.29 € | — | Rimi |
| Fanta Karastusjook orange zero 330ml | Drinks | 1.21 € (1.21 € Aitäh) | 0.89 € | — | Rimi |
| Fever tree Toonik indian tonic water 500ml | Drinks | — | 3.49 € | 2.59 € | Selver |
| Heinz Tomatimahl 290ml | Drinks | — | 1.49 € | 1.49 € | Rimi + Selver |
| Mango nektar aura 1000ml | Drinks | — | 1.89 € | 1.89 € | Rimi + Selver |
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
| Vytautas Mineraalvesi 1500ml | Drinks | 1.29 € (0.79 € Aitäh) | — | 1.21 € (0.99 € Partner) | Selver |
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
| Drinks | Barbora "Karastusjook COCA-COLA 330ml" (1.21 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 330 ml" (1.21 €); Selver "Karastusjook Coca-Cola, COCA-COLA, 330 ml" (1.29 €) |

## 3. Unclassified

No recognized type and no recognized brand on any side — never had a reliable comparison to begin with.

| Store | Name | Price |
|---|---|---|
| Barbora | Punane sõstar, 125g | 4.99 € |
| Barbora | Eesti sibula mix võrgus, 1kg | 3.29 € |
| Rimi | Mahe pohl Eesti 250g | 4.79 € |
| Selver | Marineeritud kuuseriisikad, 450 g | 5.99 € |

## 4. Possible matches to check by hand

Not matched automatically — just a list. Same real brand, same size, same qualifiers/variant/fat %, and the leftover descriptor words differ by exactly one (a single addition, removal, or swap). Capped at 30 pairs per category.

### Fruits & vegetables (5)

| Item A | Item B |
|---|---|
| Barbora "Viinamari hele, seemneteta, 500g" (2.99 €) | Selver "Viinamari punane seemneteta, 500 g" (2.99 €) |
| Barbora "Aurutatud punapeet KADARBIKU,500g" (1.99 €) | Rimi "Hapukapsas Kadarbiku 500g" (1.79 €) |
| Barbora "Soolakurk küüslauguga, 500g" (3.29 €) | Rimi "Soolakurk küüslauguga Eesti And 500g/300g" (3.29 €) |
| Barbora "Peakapsa Kimchi 300g" (3.59 €) | Rimi "Punase peakapsa Kimchi Kadarbiku 300g" (3.59 €) |
| Rimi "Viinamari punane Ralli 1kl 500g" (3.29 €) | Selver "Viinamari punane seemneteta, 500 g" (2.99 €) |

### Dairy (12)

| Item A | Item B |
|---|---|
| Barbora "Piim ALMA 0.05% 1L" (1.25 €) | Selver "Piim rasvatu 0,05%, ALMA, 1 L" (1.25 €) |
| Barbora "Mahetäispiim MO SAAREMAA Öko 3,8-4,4%,1L" (1.69 €) | Selver "Mahetäispiim 3,8 - 4,4%, MO SAAREMAA, 1 L" (1.45 €) |
| Barbora "Meiereivõi VALIO soolata, 500g" (4.99 €) | Rimi "Või soolata Valio 500g" (5.89 €) |
| Barbora "Meiereivõi VALIO soolata, 500g" (4.99 €) | Selver "Meierivõi soolata, VALIO, 500 g" (5.79 €) |
| Barbora "Proteiinijogurt ALMA kreeka m-ta 370g" (1.75 €) | Rimi "Proteiinijogurt kreeka m.-mata Alma 370g" (1.89 €) |
| Barbora "Koorejogurt Muah marja-plomb. ALMA 180g" (1.29 €) | Selver "Koorejogurt muah marja-plombiirimaitseline, ALMA, 180 g" (1.31 €) |
| Barbora "Koorene ploomi-martsip.jogurt FARMI 200g" (1.19 €) | Selver "Koorene ploomi-martsipani jogurt, FARMI, 200 g" (1.19 €) |
| Rimi "Piim Alma 2,5% 1l" (1.29 €) | Selver "Piim 2,5% pure, ALMA, 1 L" (1.25 €) |
| Rimi "Täispiim 3,6%-4,2% Farmi 1l" (1.65 €) | Selver "Täispiim 3,6%-4,2% pure, FARMI, 1 L" (1.65 €) |
| Rimi "Piim Alma kile 2,5% 1l" (0.89 €) | Selver "Piim 2,5% pure, ALMA, 1 L" (1.25 €) |
| Rimi "Või soolata Valio 500g" (5.89 €) | Selver "Meierivõi soolata, VALIO, 500 g" (5.79 €) |
| Rimi "Või laktoosivaba MO Saaremaa 200g" (2.49 €) | Selver "Saaremaa või, laktoosivaba, MO SAAREMAA, 200 g" (1.99 €) |

### Bread (18)

| Item A | Item B |
|---|---|
| Barbora "Rehe rukkileib vorm.EESTI PAGAR,600g" (0.65 €) | Rimi "Rukkileib Rehe Eesti Pagar 600g" (0.82 €) |
| Barbora "Rehe rukkileib vorm.EESTI PAGAR,600g" (0.65 €) | Selver "Rehe rukkileib viilutatud, EESTI PAGAR, 600 g" (1.29 €) |
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Rimi "Täisteravormileib Ruks Leibur 300g" (1.05 €) |
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Selver "Täistera vormileib Ruks, LEIBUR, 300 g" (0.99 €) |
| Barbora "Rustikaalne Meeleib EESTI PAGAR 500g" (1.79 €) | Rimi "Meeleib Eesti Pagar 500g" (1.39 €) |
| Barbora "Teratasku Eesti Pagar 4tk, 280g" (0.99 €) | Selver "Teratasku, EESTI PAGAR, 280 g" (0.99 €) |
| Barbora "Leiburi RÖST mitmevilja, 470g" (1.29 €) | Rimi "Röst Mitmevilja Leibur 470g" (1.89 €) |
| Barbora "Pagari röst täistera 430g" (1.59 €) | Selver "Pagari Haputaina röst, EESTI PAGAR, 430 g" (1.59 €) |
| Barbora "Röst 100% rukkijahu LEIBUR 550g" (1.95 €) | Selver "Röst 100% rukkijahust, LEIBUR, 550 g" (1.98 €) |
| Barbora "5-vilja röstsepik täisterahel.FAZER,480g" (1.95 €) | Rimi "Röstsepik täisterahelvest. 5-vilja Fazer 480g" (1.55 €) |
| Rimi "Rukkileib Rehe Eesti Pagar 600g" (0.82 €) | Selver "Rehe rukkileib viilutatud, EESTI PAGAR, 600 g" (1.29 €) |
| Rimi "Rukkileib idan. teradega Lõuna Pagarid 300g" (1.59 €) | Selver "Rukkileib idandatud teradega, LÕUNA PAGARID, 300g" (1.49 €) |
| Rimi "Sai Perenaise Eesti Pagar 320g" (0.89 €) | Selver "Perenaise sai viilutatud, EESTI PAGAR, 320 g" (0.97 €) |
| Rimi "Hea Sai Eesti Pagar 300g" (0.55 €) | Selver "Hea sai viilutatud, EESTI PAGAR, 300 g" (0.55 €) |
| Rimi "Röst Mitmevilja Leibur 470g" (1.89 €) | Selver "Röstsai mitmevilja, LEIBUR, 470 g" (1.99 €) |
| Rimi "Röstsai mitmevilja Tosta Eesti Pagar 500g" (1.19 €) | Selver "Tosta röstsai viilutatud, EESTI PAGAR, 500 g" (1.31 €) |
| Rimi "Röstsai mitmevilja Tosta Eesti Pagar 500g" (1.19 €) | Selver "Tosta mitmevilja-röstsai viilutatud, EESTI PAGAR, 500 g" (1.55 €) |
| Rimi "Pagariröst täistera Eesti Pagar 430g" (1.59 €) | Selver "Röstsai täistera, EESTI PAGAR, 430 g" (1.59 €) |

### Drinks (30)

| Item A | Item B |
|---|---|
| Barbora "Mineraalvesi EVIAN 500ml" (1.25 €) | Rimi "Mineraalvesi looduslik Evian 0,5l" (1.25 €) |
| Barbora "Vesi AURA gaasita 500ml" (0.56 €) | Rimi "Vesi Aura Mg gaasita 0.5l" (1.39 €) |
| Barbora "Vesi AURA gaasita 500ml" (0.56 €) | Selver "Vesi Spring gaasita, AURA, 500 ml" (0.56 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Originaal, VÄRSKA, 1,5 L" (1.68 €) |
| Barbora "VÄRSKA Naturaal Mullita 1,5L" (0.99 €) | Selver "Värska Naturaal gaasita, VÄRSKA, 1,5 L" (0.99 €) |
| Barbora "Gaseerimata vesi AURA Mg 500ml" (1.29 €) | Rimi "Vesi Aura Mg gaasita 0.5l" (1.39 €) |
| Barbora "Mineraalvesi VÄRSKA originaal 1l" (1.45 €) | Selver "Värska Originaal, VÄRSKA, 1 L" (1.45 €) |
| Barbora "Mineraalvesi VÄRSKA originaal 1.5L" (1.69 €) | Selver "Värska Originaal, VÄRSKA, 1,5 L" (1.68 €) |
| Barbora "Mineraalvesi VÄRSKA 0,5 L" (0.98 €) | Rimi "Mineraalvesi Värska Originaal 0,5l" (1.09 €) |
| Barbora "Looduslik karbon.mineraalvesi BORJOMI 1L" (2.49 €) | Selver "Karboniseeritud looduslik mineraalvesi, BORJOMI, 1 L" (2.49 €) |
| Barbora "Kergelt gaseeritud vesi AURA Mg 500ml" (1.29 €) | Selver "Vesi kergelt gaseeritud, AURA, 500 ml" (0.56 €) |
| Barbora "Mineraalvesi VÄRSKA originaal 500ml" (0.99 €) | Selver "Värska Originaal, VÄRSKA, 500 ml" (0.97 €) |
| Barbora "Vesi AURA FRUIT Mustikas 1.5l" (1.35 €) | Selver "Vesi Ananass, AURA FRUIT, 1,5 L" (1.39 €) |
| Barbora "Vesi AURA FRUIT Mustikas 500ml" (0.86 €) | Selver "Vesi Ananass, AURA FRUIT, 500 ml" (0.85 €) |
| Barbora "Vesi AURA FRUIT granadilli 1.5L" (1.49 €) | Selver "Vesi Ananass, AURA FRUIT, 1,5 L" (1.39 €) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Selver "Jõhvikanektar, CIDO, 1 L" (2.19 €) |
| Barbora "Mahl RYNKEBY Kuivatatud Ploomist 1L" (4.25 €) | Selver "Kuivatatud ploomi mahl, RYNKEBY, 1 L" (4.26 €) |
| Barbora "Astelpaju nektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) |
| Barbora "Astelpaju-mustikanektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) |
| Barbora "Karastusjook FENTIMANS Rose Lemona.275ml" (2.35 €) | Rimi "Karastusjook Rose Fentimans 0,275l" (2.35 €) |
| Barbora "Karastusjook FENTIMANS Rose Lemona.275ml" (2.35 €) | Selver "Karastusjook Rose Lemonade, FENTIMANS, 275 ml" (2.43 €) |
| Barbora "Vahujook LIMPA Mullike 750ml" (3.39 €) | Rimi "Karastusjook Limpa Mullike 0,75l" (3.59 €) |
| Barbora "Karastusjook COCA-COLA 6x330ml" (6.19 €) | Rimi "Karastusjook Coca-Cola 6x0,33l purk" (6.19 €) |
| Barbora "Karastusjook COCA-COLA 6x330ml" (6.19 €) | Selver "Karastusjook Coca-Cola 6-pakk, COCA-COLA, 6 x 330 ml" (5.99 €) |
| Barbora "Karastusjook FANTA Zero Apelsin 500ml" (1.29 €) | Rimi "Karastusjook Fanta Orange Zero 0,5l" (1.29 €) |
| Barbora "Karastusjook FANTA Shokata Zero 500ml" (1.29 €) | Rimi "Karastusjook Fanta Orange Zero 0,5l" (1.29 €) |
| Barbora "Karastusjook SUPER MANKI 330ml" (1.05 €) | Rimi "Karastusjook Super Manki 0,33l prk" (0.99 €) |
| Barbora "Karastusjook COCA-COLA Zero 330ml" (1.21 €) | Rimi "Karastusjook Coca-Cola Zero 0,33l prk" (0.89 €) |
| Barbora "Karastusjook COCA-COLA Zero 330ml" (1.21 €) | Rimi "Karastusjook Coca-Cola 0,33l prk" (0.89 €) |
| Barbora "Karastusjook COCA-COLA Zero 330ml" (1.21 €) | Rimi "Karastusjook Coca-Cola 0,33l pudel" (1.35 €) |

