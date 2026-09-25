# Price comparison review

Generated 2026-09-25 by `npm run review` (scraper/build-review.js) from already-scraped data — data/raw/ and data/prices.json. Never contacts a store; run `npm run fetch-prices` first for fresh numbers. Unmatched/unclassified/ambiguous counts and listings are recomputed fresh from data/raw/ every time (not read from data/unmatched.json etc., which a single-category run narrows to just that category — see the comment at the top of this file).

Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to the ambiguous list instead of a guess. Selver has no live stock signal in its public API, so its price always carries a "Selver: availability not verified" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Bread | Drinks | Meat | Pasta | Rice & grains | Flour & sugar | Cooking oil | Cheese | Curd & cottage cheese | Cream & sour cream | Kefir & buttermilk | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 15 + 29 + 25 | 221 + 277 + 259 | 130 + 80 + 133 | 113 + 87 + 98 | 418 + 419 + 353 | 149 + 129 + 110 | 157 + 109 + 111 | 152 + 68 + 72 | 58 + 54 + 73 | 92 + 67 + 59 | 269 + 313 + 231 | 52 + 37 + 39 | 23 + 27 + 25 | 29 + 23 + 26 | 5211 |
| Matched (any store combination) | 12 | 67 | 41 | 83 | 94 | 18 | 7 | 19 | 25 | 18 | 54 | 24 | 11 | 5 | 478 |
| — at all 3 stores | 1 | 18 | 12 | 18 | 20 | 3 | 0 | 4 | 6 | 7 | 10 | 9 | 2 | 0 | 110 |
| — at 2 stores only (Barbora + Rimi) | 1 | 23 | 4 | 30 | 22 | 3 | 6 | 5 | 1 | 3 | 14 | 6 | 3 | 1 | 122 |
| — at 2 stores only (Barbora + Selver) | 2 | 12 | 16 | 24 | 40 | 8 | 1 | 5 | 12 | 5 | 7 | 5 | 3 | 0 | 140 |
| — at 2 stores only (Rimi + Selver) | 8 | 14 | 9 | 11 | 12 | 4 | 0 | 5 | 6 | 3 | 23 | 4 | 3 | 4 | 106 |
| Unmatched | 38 | 577 | 249 | 122 | 964 | 342 | 363 | 219 | 129 | 172 | 695 | 71 | 51 | 68 | 4060 |
| Unclassified | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 |
| Ambiguous groups | 2 | 8 | 0 | 0 | 3 | 2 | 0 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 25 |

**Note:** recomputed 476 matches from data/raw/, but data/prices.json has 478 — data/raw/ has moved on since the last run that wrote prices.json for some category.

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
| Barilla Makaronid penne rigate 500g | Pasta | 1.64 € | 2.35 € | — | Barbora |
| Panzani Laastmakaron fines nouilles 500g | Pasta | 1.49 € | — | 1.99 € | Barbora |
| Panzani Makaronid farfalle 500g | Pasta | 1.49 € | 2.19 € | — | Barbora |
| Panzani Pasta munaga tagliatelle 400g | Pasta | 2.47 € | 3.29 € | — | Barbora |
| Presto Makaronid cornetti 400g | Pasta | 0.44 € | 0.69 € | — | Barbora |
| Presto Makaronid fusilli 400g | Pasta | 0.44 € | 0.69 € | — | Barbora |
| Tartu mill Makaronid chiffari lisci 500g | Pasta | 1.01 € | 1.39 € | — | Barbora |
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

Card prices shown in parentheses are informational only — never used to decide the Cheapest column.

## 2. Ambiguous — needs a person to pick

| Category | Items in the group |
|---|---|
| Baby formula | Barbora "Mahepiimasegu imikutele HOLLE 400g sünn." (11.59 €); Selver "Kitsepiimasegu nr2 6+, HOLLE, 400 g" (20.50 €); Selver "Kitsepiimasegu nr1 0+, HOLLE, 400 g" (20.50 €) |
| Baby formula | Rimi "Piimasegu Aptamil Comfort sünnist 400g" (13.99 €); Rimi "Piimasegu Aptamil Comfort 2 al. 6k 400g" (14.75 €); Selver "Piimasegu Comfort nr1 0+, APTAMIL, 400 g" (13.99 €) |
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
| Rice & grains | Barbora "Pikateraline riis BOSTO 4x125g" (2.09 €); Barbora "Pikateraline riis BOSTO 4x125g" (2.09 €); Rimi "Pikateraline riis Bosto 4x125g" (2.09 €) |
| Rice & grains | Barbora "Basmati riis BOSTO 4x125g" (3.79 €); Barbora "Basmati riis BOSTO 4x125g" (3.79 €); Rimi "Basmati riis Bosto 4x125g" (3.29 €) |
| Rice & grains | Barbora "Aurutatud riis BALTIX 1kg" (2.39 €); Barbora "Aurutatud riis BALTIX 1kg" (2.39 €); Selver "Aurutatud riis, BALTIX, 1 kg" (2.49 €) |
| Rice & grains | Barbora "Pikateraline riis BALTIX 1kg" (2.12 €); Barbora "Pikateraline riis BALTIX 1kg" (2.12 €); Selver "Pikateraline riis, BALTIX, 1 kg" (2.12 €); Selver "Pikateraline riis, BALTIX, 1kg" (0.49 €) |
| Rice & grains | Barbora "Basmati riis VESKI MATI 500g" (2.69 €); Barbora "Basmati riis VESKI MATI 500g" (2.69 €); Rimi "Riis basmati Veski Mati 500g" (2.75 €); Selver "Basmati riis, VESKI MATI, 500 g" (2.69 €) |
| Rice & grains | Barbora "Pikateraline riis TARTU MILL1kg" (2.53 €); Barbora "Pikateraline riis TARTU MILL1kg" (2.53 €); Rimi "Riis pikateraline Tartu Mill 1kg" (2.75 €); Selver "Pikateraline riis, TARTU MILL, 1 kg" (2.53 €) |
| Rice & grains | Barbora "Aurutatud riis TARTU MILL 1kg" (2.92 €); Barbora "Aurutatud riis TARTU MILL 1kg" (2.92 €); Rimi "Riis aurutatud Tartu Mill 1kg" (2.99 €) |
| Rice & grains | Barbora "Aurutatud riis TARTU MILL 4x125g" (1.89 €); Barbora "Aurutatud riis TARTU MILL 4x125g" (1.89 €); Rimi "Riis aurutatud Tartu Mill 4x125g" (1.89 €) |
| Rice & grains | Barbora "Riis Poke bowl BOSTO 500g" (3.65 €); Barbora "Riis Poke bowl BOSTO 500g" (3.65 €); Rimi "Riis Bosto Poke Bowl 500g" (3.69 €); Selver "Poke bowl riis, BOSTO, 500 g" (3.65 €) |
| Cooking oil | Rimi "Ekstra väärisoliiviõli Borges 500ml" (9.65 €); Selver "Ekstra väärisoliiviõli, BORGES, 500 ml" (10.49 €); Selver "Ekstra väärisoliiviõli, BORGES, 500 ml" (11.69 €) |

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

### Fruits & vegetables (2)

| Item A | Item B |
|---|---|
| Barbora "Aurutatud punapeet KADARBIKU,500g" (1.99 €) | Rimi "Hapukapsas Kadarbiku 500g" (1.79 €) |
| Barbora "Peakapsa Kimchi 300g" (3.59 €) | Rimi "Punase peakapsa Kimchi Kadarbiku 300g" (3.59 €) |

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
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Sidruni, VÄRSKA, 1,5 L" (1.55 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Originaal aluseline gaasita, VÄRSKA, 1,5 L" (1.68 €) |
| Barbora "VÄRSKA Originaal aluseline 1,5L" (1.65 €) | Selver "Värska Granaatõun, VÄRSKA, 1,5 L" (1.55 €) |
| Barbora "Looduslik karb.mineraalvesi BORJOMI 6x1L" (14.49 €) | Selver "Karboniseeritud looduslik mineraalvesi 6-pakk, BORJOMI, 6 x 1 L" (14.99 €) |
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
| Barbora "Karastusjook PEPSI MAX 1.5L" (1.99 €) | Selver "Karastusjook Pepsi Zero, PEPSI, 1,5 L" (2.02 €) |
| Barbora "Karastusjook PEPSI MAX 1.5L" (1.99 €) | Selver "Karastusjook Pepsi Lemon, PEPSI, 1,5 l" (2.02 €) |
| Barbora "Karastusjook vaarika KELLUKE 1.5L" (1.59 €) | Selver "Limonaad Kelluke vaarika, A. LE COQ, 1,5 l" (1.19 €) |
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
| Barbora "Karastusjook COCA-COLA Zero Caffe.500ml" (1.25 €) | Rimi "Karastusjook Zero Caff. Coca-Cola 0,5l" (1.29 €) |
| Barbora "Karastusjook COCA-COLA Zero Caffe.500ml" (1.25 €) | Rimi "Karastusjook Coca-Cola Zero Lime 0,5l" (1.29 €) |
| Barbora "Karastusjook FANTA Zero sidrun 1.5L" (2.29 €) | Selver "Karastusjook Fanta Apelsini Zero, FANTA, 1,5 L" (2.29 €) |

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
| Barbora "Spagetid BARILLA 500g" (1.64 €) | Selver "Spagetid (nr.5), BARILLA, 500 g" (1.45 €) |
| Barbora "Makaronid Fusilli DELVERDE 500g" (2.02 €) | Selver "Fusilli, DELVERDE, 500 g" (2.89 €) |
| Barbora "Spagetid n.5 PANZANI 500g" (1.99 €) | Selver "Spagetid Spaghetti, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaronid Penne Rigate PANZANI 500g" (1.49 €) | Rimi "Makaronid Conchiglie Rigate Panzani 500g" (2.19 €) |
| Barbora "Makaronid Penne Rigate PANZANI 500g" (1.49 €) | Rimi "Makaronid Penne Rigatte Panzani 500g" (2.19 €) |
| Barbora "Makaronid Penne Rigate PANZANI 500g" (1.49 €) | Selver "Specialita Penne Rigate, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaronid spiraalid Fusilli PANZANI 500g" (1.99 €) | Rimi "Makaronid Fusilli Panzani  500g" (2.19 €) |
| Barbora "Makaronid spiraalid Fusilli PANZANI 500g" (1.99 €) | Rimi "Makaronid 3-värvilised Fusilli Panzani 500g" (2.59 €) |
| Barbora "Makaronid sarvekesed PANZANI 500g" (1.49 €) | Rimi "Makaronid Chifferini Panzani 500g" (2.19 €) |
| Barbora "Makaronid sarvekesed PANZANI 500g" (1.49 €) | Rimi "Makaronid Fusilli Panzani  500g" (2.19 €) |
| Barbora "Makaronid Serpentini PANZANI 500g" (1.72 €) | Rimi "Makaronid Chifferini Panzani 500g" (2.19 €) |
| Barbora "Makaronid Serpentini PANZANI 500g" (1.72 €) | Rimi "Makaronid Fusilli Panzani  500g" (2.19 €) |
| Barbora "Makaronid Macaroni PANZANI 500g" (1.49 €) | Rimi "Makaronid Chifferini Panzani 500g" (2.19 €) |
| Barbora "Makaronid Macaroni PANZANI 500g" (1.49 €) | Rimi "Makaronid Fusilli Panzani  500g" (2.19 €) |
| Barbora "Makaronid Macaroni PANZANI 500g" (1.49 €) | Selver "Macaroni, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaron.teokarbid Conchiglie PANZANI500g" (1.49 €) | Selver "Conchiglie Rigate teokarbid, PANZANI, 500 g" (1.99 €) |
| Barbora "Makaronid Penne TARTU MILL 500g" (1.01 €) | Rimi "Durumnisupasta Penne Tartu Mill 500g" (1.35 €) |
| Barbora "Makaronid Penne TARTU MILL 500g" (1.01 €) | Selver "Durumnisujahupasta Penne, TARTU MILL, 500 g" (1.39 €) |
| Barbora "Makaronid Fusilli TARTU MILL 500g" (1.01 €) | Rimi "Durumnisupasta Fusilli Tartu Mill 500g" (1.19 €) |
| Barbora "Makaronid Fusilli TARTU MILL 500g" (1.01 €) | Selver "Täistera fusilli, TARTU MILL, 500 g" (1.47 €) |
| Barbora "Makaronid Fusilli TARTU MILL 500g" (1.01 €) | Selver "Durumnisujahupasta Fusilli, TARTU MILL, 500 g" (1.15 €) |
| Barbora "Makaronid Cornetti TARTU MILL 500g" (1.01 €) | Rimi "Durumnisupasta Cornetti Tartu Mill 500g" (1.35 €) |
| Barbora "Makaronid Cornetti TARTU MILL 500g" (1.01 €) | Selver "Durumnisujahupasta Cornetti, TARTU MILL, 500 g" (1.39 €) |
| Barbora "Makaronid Puntine TARTU MILL 500g" (1.03 €) | Rimi "Durumnisupasta Puntine Tartu Mill 500g" (1.39 €) |
| Barbora "Makaronid Mini Penne PANZANI 500g" (1.82 €) | Rimi "Makaronid Penne Rigatte Panzani 500g" (2.19 €) |
| Barbora "Makaronid Mini Penne PANZANI 500g" (1.82 €) | Selver "Mini Penne torud, PANZANI, 500 g" (2.43 €) |
| Barbora "Spagetid nr7 TARTU MILL 500g" (1.01 €) | Selver "Durumnisujahust spagetid nr.7, TARTU MILL, 500 g" (1.15 €) |
| Barbora "Makaronid Vermicelli PANZANI 500g" (1.49 €) | Rimi "Makaronid Chifferini Panzani 500g" (2.19 €) |
| Barbora "Makaronid Vermicelli PANZANI 500g" (1.49 €) | Rimi "Makaronid Fusilli Panzani  500g" (2.19 €) |
| Barbora "Täistera makar.Fusilli TARTU MILL 500g" (1.10 €) | Selver "Täistera fusilli, TARTU MILL, 500 g" (1.47 €) |

### Rice & grains (16)

| Item A | Item B |
|---|---|
| Barbora "Riis Risotto Mediterraneo BOSTO 500g" (3.79 €) | Rimi "Riis Mediterraneo Bosto 500g" (3.79 €) |
| Barbora "Pikateraline pruun riis BOSTO 4x125g" (2.25 €) | Rimi "Pruun riis Bosto 4x125g" (1.99 €) |
| Barbora "Pikateraline pruun riis BOSTO 4x125g" (2.25 €) | Selver "Pikateraline riis 4 x 125 g, BOSTO, 500 g" (2.25 €) |
| Barbora "Pikateraline pruun riis BOSTO 4x125g" (2.25 €) | Selver "Pruun riis 4 x 125 g, BOSTO, 500 g" (2.25 €) |
| Barbora "Risoto riis VESKI MATI 500g" (2.39 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Jasmiini riis VESKI MATI 500g" (2.45 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Ümarateraline riis BALTIX 1kg" (2.73 €) | Selver "Pudruriis (Ümarateraline riis), BALTIX, 1 kg" (2.73 €) |
| Barbora "Pudruriis TARTU MILL 1kg" (2.99 €) | Selver "Odrakruup, TARTU MILL, 1 kg" (1.43 €) |
| Barbora "Pudruriis TARTU MILL 1kg" (2.99 €) | Selver "Odratang, TARTU MILL, 1 kg" (1.37 €) |
| Barbora "Sushi-riis VESKI MATI 500g" (2.49 €) | Selver "Pikateraline riis, VESKI MATI, 500 g" (1.35 €) |
| Barbora "Risotoriis Carnaroli RISO SCOTTI 500g" (4.89 €) | Selver "Risotoriis Arborio, RISO SCOTTI, 500 g" (3.65 €) |
| Barbora "Odrakruup BALTIX 4x100g" (0.89 €) | Selver "Odrakruup 4x100g, BALTIX, 400 g" (1.01 €) |
| Barbora "Odrakruup VESKI MATI 500g" (0.99 €) | Selver "Jasmiiniriis, VESKI MATI, 500 g" (2.50 €) |
| Barbora "Odrakruup VESKI MATI 500g" (0.99 €) | Selver "Riisimanna, VESKI MATI, 500 g" (1.72 €) |
| Barbora "Odrakruup VESKI MATI 500g" (0.99 €) | Selver "Tatar, VESKI MATI, 500 g" (1.65 €) |
| Rimi "Pruun riis Bosto 4x125g" (1.99 €) | Selver "Pruun riis 4 x 125 g, BOSTO, 500 g" (2.25 €) |

### Flour & sugar (13)

| Item A | Item B |
|---|---|
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

### Curd & cottage cheese (1)

| Item A | Item B |
|---|---|
| Barbora "Kodujuust TERE klassikaline 4% 300g" (1.35 €) | Selver "Kodujuust 4%, TERE, 300 g" (2.12 €) |

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

