# Price comparison review

Generated 2026-09-25 by `npm run review` (scraper/build-review.js) from already-scraped data — data/raw/ and data/prices.json. Never contacts a store; run `npm run fetch-prices` first for fresh numbers. Unmatched/unclassified/ambiguous counts and listings are recomputed fresh from data/raw/ every time (not read from data/unmatched.json etc., which a single-category run narrows to just that category — see the comment at the top of this file).

Matching pools every store's items for a category together (scraper/match-products.js's `matchPool`) instead of comparing store pairs — a product can hold any number of stores. A group is only accepted when every pair inside it agrees on being the same product AND it holds at most one item per store; anything that fails either check (two same-store items both matching a third, or a chain that isn't a clique) goes to the ambiguous list instead of a guess. Selver has no live stock signal in its public API, so its price always carries a "Selver: availability not verified" note on the product screen, and its Partner card price is shown only as a small secondary line — neither ever decides which store is cheapest.

## Summary

| | Baby formula | Fruits & vegetables | Dairy | Bread | Drinks | Meat | Pasta | Rice & grains | Flour & sugar | Cooking oil | Cheese | Curd & cottage cheese | Cream & sour cream | Kefir & buttermilk | Coffee | Tea & cocoa | Cereals & oats | Canned food | Sauces & condiments | Spices | Jam & honey & spreads | Baking supplies | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scraped (Barbora + Rimi + Selver) | 15 + 29 + 25 | 221 + 277 + 259 | 130 + 80 + 133 | 113 + 87 + 98 | 418 + 419 + 353 | 149 + 129 + 110 | 157 + 109 + 111 | 152 + 68 + 72 | 58 + 54 + 73 | 92 + 67 + 59 | 269 + 313 + 231 | 52 + 37 + 39 | 23 + 27 + 25 | 29 + 23 + 26 | 310 + 168 + 184 | 294 + 149 + 146 | 179 + 148 + 151 | 253 + 178 + 171 | 351 + 209 + 311 | 389 + 193 + 246 | 168 + 98 + 109 | 76 + 75 + 25 | 9792 |
| Matched (any store combination) | 12 | 67 | 41 | 83 | 94 | 18 | 7 | 19 | 25 | 18 | 54 | 24 | 11 | 5 | 49 | 9 | 36 | 26 | 117 | 114 | 39 | 18 | 886 |
| — at all 3 stores | 1 | 18 | 12 | 18 | 20 | 3 | 0 | 4 | 6 | 7 | 10 | 9 | 2 | 0 | 14 | 0 | 13 | 4 | 44 | 57 | 19 | 1 | 262 |
| — at 2 stores only (Barbora + Rimi) | 1 | 23 | 4 | 30 | 22 | 3 | 6 | 5 | 1 | 3 | 14 | 6 | 3 | 1 | 9 | 6 | 7 | 1 | 21 | 15 | 4 | 10 | 195 |
| — at 2 stores only (Barbora + Selver) | 2 | 12 | 16 | 24 | 40 | 8 | 1 | 5 | 12 | 5 | 7 | 5 | 3 | 0 | 15 | 3 | 7 | 15 | 37 | 26 | 16 | 4 | 263 |
| — at 2 stores only (Rimi + Selver) | 8 | 14 | 9 | 11 | 12 | 4 | 0 | 5 | 6 | 3 | 23 | 4 | 3 | 4 | 11 | 0 | 9 | 6 | 15 | 16 | 0 | 3 | 166 |
| Unmatched | 38 | 577 | 249 | 122 | 964 | 342 | 363 | 219 | 129 | 172 | 695 | 71 | 51 | 68 | 547 | 569 | 393 | 546 | 593 | 543 | 278 | 139 | 7668 |
| Unclassified | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 6 |
| Ambiguous groups | 2 | 8 | 0 | 0 | 3 | 2 | 0 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 26 |

**Note:** recomputed 884 matches from data/raw/, but data/prices.json has 886 — data/raw/ has moved on since the last run that wrote prices.json for some category.

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
| Dilmah Must earl grey tee 20x1.5g | Tea & cocoa | 1.55 € | 2.59 € | — | Barbora |
| Lipton Must earl grey tee 20x1.6g | Tea & cocoa | 3.09 € | 3.19 € | — | Barbora |
| Loyd Must ceylon tee 50x2g | Tea & cocoa | 4.09 € (3.19 € Aitäh) | 4.09 € | — | Barbora + Rimi |
| Loyd Must earl gray tee 25x2g | Tea & cocoa | 2.19 € | 2.29 € | — | Barbora |
| Nesquik Lahustuv kakaojook 150g | Tea & cocoa | 2.59 € | — | 2.29 € | Selver |
| Nesquik Lahustuv kakaojook 300g | Tea & cocoa | 3.89 € | — | 4.19 € | Barbora |
| Twinings Must grey lady tee 100g | Tea & cocoa | 6.39 € | 6.39 € | — | Barbora + Rimi |
| Twinings Roheline gunpowder purutee 100g | Tea & cocoa | 6.39 € | — | 6.39 € | Barbora + Selver |

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
| Coffee | Barbora "Jahvatatud kohv Espresso LAVAZZA 250g" (9.99 €); Barbora "Jahvatatud kohv LAVAZZA Espresso 250g" (10.99 €); Rimi "Kohv jahvatatud Lavazza Espresso 250g" (9.99 €) |

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
| Barbora "Lah. kohvijook JACOBS 2in1 12.4g" (0.27 €) | Rimi "Kohvijook lahustuv 2in1 Jacobs 12,4g" (0.26 €) |
| Barbora "Lah.kohvijook JACOBS 3in1 12.6g" (0.27 €) | Rimi "Lahustuv kohvijook Jacobs 3in1 12,6g" (0.26 €) |

### Tea & cocoa (29)

| Item A | Item B |
|---|---|
| Barbora "Must lehetee DILMAH karp 100g" (2.21 €) | Selver "Ceyloni must lehetee, DILMAH, 100 g" (2.45 €) |
| Barbora "Must tee English Aristocratic HYLEYS100g" (1.79 €) | Selver "Must purutee English Aristocratic, HYLEYS, 100 g" (1.89 €) |
| Barbora "Must purutee TWININGS Earl Grey,100g" (6.39 €) | Rimi "Tee must Earl Grey Twinings 100g" (6.39 €) |
| Barbora "Must purutee TWININGS Earl Grey,100g" (6.39 €) | Selver "Earl Grey purutee, TWININGS, 100 g" (5.29 €) |
| Barbora "Must tee mustasõstramaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must mustsõstramaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee mustasõstramaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must vaarikamaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee mustasõstramaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must karamellimaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee karamellimaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must mustsõstramaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee karamellimaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must vaarikamaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee karamellimaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must karamellimaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee sidrunimaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must mustsõstramaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee sidrunimaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must vaarikamaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee sidrunimaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must karamellimaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee vaarikamaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must mustsõstramaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee vaarikamaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must vaarikamaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee vaarikamaits.DILMAH,20x1,5g" (1.55 €) | Rimi "Tee must karamellimaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee DILMAH maasika 20x1.5g" (1.55 €) | Rimi "Tee must mustsõstramaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee DILMAH maasika 20x1.5g" (1.55 €) | Rimi "Tee must vaarikamaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must tee DILMAH maasika 20x1.5g" (1.55 €) | Rimi "Tee must karamellimaitseline Dilmah 20x1,5g" (2.59 €) |
| Barbora "Must Tseil.tee DILMAH Premium 25x2g" (1.55 €) | Rimi "Tee must Dilmah Premium 25x2g" (2.59 €) |
| Barbora "Must tseil.tee DILMAH Premium 50x2g" (2.57 €) | Rimi "Tee must Dilmah Premium 50x2g" (4.29 €) |
| Barbora "Must tee LOYD Intense 25x2g" (2.19 €) | Rimi "Tee must Black Intense Loyd 25x2g" (2.29 €) |
| Barbora "Must tee LIPTON Mango 20x1.7g" (3.09 €) | Rimi "Must tee virsiku-mango Lipton 20x1,7g" (3.19 €) |
| Barbora "Roheline Tseiloni tee DILMAH 100g" (2.01 €) | Selver "Roheline Tseiloni purutee, DILMAH, 100 g" (3.34 €) |
| Barbora "Rohel tee Jasmine Green BASILUR 100g" (5.99 €) | Rimi "Roheline tee Jasmine Green Basilur 100g" (5.99 €) |
| Barbora "Lahustuv jook NESQUIK maasika 350g" (4.89 €) | Selver "Lahustuv jook maasikamaitseline, NESQUIK, 350 g" (4.89 €) |
| Barbora "Lahustuv jook NESQUIK maasika 350g" (4.89 €) | Selver "Lahustuv jook Vanilla, NESQUIK, 350 g" (4.99 €) |
| Barbora "Kakaojook NESQUIK 600g" (8.49 €) | Selver "Lahustuv kakaojook, NESQUIK, 600g" (8.49 €) |
| Rimi "Jook Nesquik Pouch maasikamaitseline 350g" (4.89 €) | Selver "Lahustuv jook maasikamaitseline, NESQUIK, 350 g" (4.89 €) |

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
| Rimi "Kiirtatrahelbed täistera Tartu Mill 500g" (2.89 €) | Selver "Täistera röstitud kiirtatrahelbed, TARTU MILL, 500 g" (2.59 €) |
| Rimi "Granola müsli punaste marjadega Sante 350g" (2.29 €) | Selver "Krõbe müsli punaste marjadega, SANTE, 350 g" (2.19 €) |
| Rimi "Hommikusöök šokolaadiga riis Oho 500g" (3.59 €) | Selver "Šokolaadiga riis, OHO, 500 g" (3.65 €) |
| Rimi "Hommikusöök nisu meega Oho 500g" (4.29 €) | Selver "Nisu meega, OHO, 500 g" (4.26 €) |
| Rimi "Kaerahelbed jämedad röstitud Veski Mati 1kg" (2.55 €) | Selver "Täistera jämedad kaerahelbed, VESKI MATI, 1 kg" (2.19 €) |

### Canned food (29)

| Item A | Item B |
|---|---|
| Barbora "Konsev.mais BONDUELLE 670g" (3.49 €) | Rimi "Mais Bonduelle 670g/570g" (2.95 €) |
| Barbora "Valged oad tomatikastmes HEINZ 415g" (2.39 €) | Rimi "Oad tomatikastmes küpsetatud Heinz 415g" (2.35 €) |
| Barbora "Konserveeritud mais BONDUELLE 530g" (2.59 €) | Rimi "Mais Bonduelle 530g/360g" (2.19 €) |
| Barbora "Magus mais BONDUELLE 340g" (2.09 €) | Rimi "Mais magus Bonduelle 340g / 285g" (1.69 €) |
| Barbora "Punased oad mais.kastmes BONDUELLE 430g" (2.85 €) | Selver "Punased oad tšilli kastmes, BONDUELLE, 430 g" (1.89 €) |
| Barbora "Piknikukurk (viilud) PÕLTSAMAA 680g" (2.89 €) | Rimi "Piknikukurk viilutatud Põltsamaa 680/360g" (3.25 €) |
| Barbora "Piknikukurk (viilud) PÕLTSAMAA 680g" (2.89 €) | Selver "Piknikukurk viiludena, PÕLTSAMAA, 680 g" (3.19 €) |
| Barbora "Võileivakurk (pikiviilud) PÕLTSAMAA 460g" (2.99 €) | Rimi "Võileivakurk Põltsamaa 460g/240g" (2.99 €) |
| Barbora "Salatikurk SALVEST 395g" (1.99 €) | Rimi "Salatikurk Salvest 395g/237g" (1.99 €) |
| Barbora "Salatikurk SALVEST 395g" (1.99 €) | Selver "Salatikurk, SALVEST, 395g neto" (1.99 €) |
| Barbora "Maitselt mahe kurk PÕLTSAMAA 680g" (2.89 €) | Rimi "Kurk maitselt mahe Põltsamaa 680g/360g" (2.89 €) |
| Barbora "Võileivakurk SALVEST 530g" (2.79 €) | Rimi "Võileivakurk Salvest 530g/290g" (2.85 €) |
| Barbora "Viilukurk SALVEST 675g" (2.79 €) | Rimi "Viilukurk Salvest 675g/350g" (2.95 €) |
| Barbora "Viilukurk SALVEST 675g" (2.79 €) | Selver "Piprakurk, SALVEST, 675 g" (2.79 €) |
| Barbora "Marin.kirsstomatid NIZHYN 450g" (2.55 €) | Rimi "Kabatšokipüree Nizhyn 450g" (2.49 €) |
| Barbora "Marin.kirsstomatid NIZHYN 450g" (2.55 €) | Rimi "Letšo Nizhyn 450g" (3.59 €) |
| Barbora "Aurutatud läätsed vapeur BONDUELLE 310g" (2.49 €) | Rimi "Läätsed aurutatud Bonduelle Vapeur 310g/265g" (2.59 €) |
| Barbora "Röst.punased maguspiprad GOURMANTE 450g" (4.55 €) | Selver "Röstitud punased maguspiprad, GOURMANTE, 450 g" (4.55 €) |
| Barbora "Küüslauguküüned äädikas GOURMANTE 100g" (1.89 €) | Selver "Küüslaugud äädikas, GOURMANTE, 100 g" (1.92 €) |
| Barbora "Viil.artišokid SACLA 285g" (4.19 €) | Rimi "Artišokid marineeritud Sacla 285g/171g" (4.59 €) |
| Barbora "Sibulad äädikas GOURMANTE 100g" (1.79 €) | Selver "Küüslaugud äädikas, GOURMANTE, 100 g" (1.92 €) |
| Rimi "Piknikukurk viilutatud Põltsamaa 680/360g" (3.25 €) | Selver "Piknikukurk viiludena, PÕLTSAMAA, 680 g" (3.19 €) |
| Rimi "Kurgid marineeritud 6-9cm Sunfood 680g/360g" (2.19 €) | Selver "Marineeritud kurgid 6-9 cm, SUNFOOD, 680 g" (2.19 €) |
| Rimi "Mais ja hernes Bonduelle 425ml/285g" (2.89 €) | Selver "Mais, hernes ja paprika, BONDUELLE, 425 ml" (2.89 €) |
| Rimi "Salatikurk Salvest 395g/237g" (1.99 €) | Selver "Salatikurk, SALVEST, 395g neto" (1.99 €) |
| Rimi "Salatiporgand Salvest 400g" (2.09 €) | Selver "Salatiporgand, SALVEST, neto 400g" (2.09 €) |
| Rimi "Punapeediviilud Põltsamaa 570g/380g" (2.09 €) | Selver "Punapeediviilud, PÕLTSAMAA, 570 g" (2.05 €) |
| Rimi "Šampinjonid marineeritud Bonduelle 540g/290g" (4.49 €) | Selver "Šampinjonid traditsiooniliselt marineeritud, BONDUELLE, 540 g" (4.49 €) |
| Rimi "Šampinjonid marineeritud Bonduelle 540g/290g" (4.49 €) | Selver "Marineeritud šampinjonid, BONDUELLE, 540 g" (4.59 €) |

### Sauces & condiments (30)

| Item A | Item B |
|---|---|
| Barbora "Austrikaste Oyster THAI-CHOICE 200ml" (2.59 €) | Selver "Austrikaste, THAI CHOICE, 200 ml" (2.59 €) |
| Barbora "Adžika gruusiapärane MAADLEX 350g" (1.85 €) | Selver "Gruusia adžika, MAADLEX, 350 g" (1.66 €) |
| Barbora "BBQ kaste burboon.viski SANTA MARIA 350g" (4.25 €) | Selver "BBQ kaste burbooni viski, SANTA MARIA, 350g" (4.25 €) |
| Barbora "Paprikakaste FELIX 270g" (2.01 €) | Selver "Paprikakaste Külluslik, FELIX, 270 g" (2.59 €) |
| Barbora "Pastakaste Arrabbiata BARILLA 400g" (3.75 €) | Selver "Pastakaste Arrabiata, BARILLA, 400 g" (2.99 €) |
| Barbora "Pastakaste Mediterranee BARILLA 400g" (4.15 €) | Selver "Pastakaste Arrabiata, BARILLA, 400 g" (2.99 €) |
| Barbora "Pastakaste tomat.juust TARTU MILL 340g" (4.19 €) | Selver "Pastakaste Tomat ja Juust, TARTU MILL, 340 g" (3.99 €) |
| Barbora "Originaalne ketšup HEINZ 700g" (5.05 €) | Rimi "Ketšup Heinz originaal 700g" (5.09 €) |
| Barbora "Originaalne ketšup HEINZ 700g" (5.05 €) | Selver "Original Ketšup, HEINZ, 700 g" (5.07 €) |
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
| Barbora "Majonees HELLMANN'S Originaal, 855ml" (6.99 €) | Selver "Majonees Original, HELLMANN'S, 855 ml" (7.99 €) |
| Barbora "Majonees BALTIKA Provansaal Orig.,300g" (1.89 €) | Selver "Majonees Kuldne provansaal, BALTIKA, 300 g" (1.79 €) |
| Barbora "Majonees BALTIKA Provansaal Klas.,300g" (1.79 €) | Selver "Majonees Kuldne provansaal, BALTIKA, 300 g" (1.79 €) |
| Barbora "Majonees BBQ LEMMIK 200g" (1.49 €) | Rimi "Majonees küüslaugu Lemmik 200g" (1.59 €) |
| Barbora "MajoneesTARPLAN aioli 210g" (1.24 €) | Rimi "Majonees aioli Tarplan 210g" (1.79 €) |
| Barbora "Dipikaste TERE Dipp-Tops papr.-ranch200g" (1.75 €) | Selver "Tere Dipp-Tops paprika ranch-dipikaste, TERE, 200 g" (1.78 €) |
| Barbora "Majoneesi-ketšupikaste HEINZ 425g" (4.35 €) | Rimi "Majoneesi-ketšupikaste Heinz 425g/415ml" (4.39 €) |
| Rimi "Kaste mango-tšilli Felix 285g" (2.99 €) | Selver "Mango-tsilli kaste, FELIX, 285 g" (2.99 €) |
| Rimi "Ketšup Felix öko 500g" (3.79 €) | Selver "Terav ketšup, FELIX, 500 g" (2.94 €) |
| Rimi "Kaste hiinapärane terav Felix 500g" (2.29 €) | Selver "Terav Hiina kaste, FELIX, 500 g" (2.75 €) |
| Rimi "Ketšup Heinz originaal 700g" (5.09 €) | Selver "Original Ketšup, HEINZ, 700 g" (5.07 €) |

### Spices (29)

| Item A | Item B |
|---|---|
| Barbora "Maitseainesegu Podravka VEGETA 75g" (0.59 €) | Rimi "Maitseainesegu Vegeta 75g" (0.99 €) |
| Barbora "Liham.ürdi-küüslaugu SANTA MARIA 20g" (1.05 €) | Rimi "Lihamaitseaine ürdi-küüslaugu Santa Maria 20g" (0.79 €) |
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
| Rimi "Tellicherry pipar veskis Santa Maria 210g" (16.49 €) | Selver "Tellicherry pipar, SANTA MARIA, 210 g" (16.59 €) |

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

### Baking supplies (5)

| Item A | Item B |
|---|---|
| Barbora "Rummi lõhna- ja maitseaine, DR.OETKER 8ml" (1.19 €) | Rimi "Vanilli lõhna- ja maitseaine Dr. Oetker 8 ml" (1.39 €) |
| Barbora "Mõrumandli lõhna- ja maitseaine, DR.OETKER 8ml" (1.19 €) | Rimi "Vanilli lõhna- ja maitseaine Dr. Oetker 8 ml" (1.39 €) |
| Barbora "Tordikreem vaniljemaits.DR.OETKER 105g" (2.09 €) | Rimi "Vanillimaitseline tordikreem Dr. Oetker 105g" (2.39 €) |
| Barbora "Toiduvärv kollane DR. OETKER 10g" (1.85 €) | Selver "Geeltoiduvärv kollane, DR.OETKER, 10 g" (1.85 €) |
| Barbora "Purpur nonparell MEIRA 60g" (1.88 €) | Selver "Lilla nonparell, MEIRA, 60 g" (1.88 €) |

