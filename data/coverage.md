# Coverage audit — Barbora, Rimi, Selver (2026-09-26)

Every food, drink, household, personal-care, baby and pet subcategory of
the three stores, read from their own category trees (menu/category
pages and Selver's category API only — no product scraping), marked:

- **COVERED** — fetched by one of our categories (`scraper/categories.js`
  / `scraper/stores/selver.js`); "(filtered)" = only part of the
  subcategory, by name filter.
- **EXCLUDED** — left out on purpose, with the reason from CLAUDE.md.
- **MISSING** — sold by the store, not fetched, no decision yet.

Non-grocery departments (home goods, kitchenware, textiles, garden,
electronics, office, clothing, services, seasonal/promo duplicates) are
listed once at the end as out of scope.

## Barbora

| Department / subcategory | Status | Notes |
|---|---|---|
| Köögiviljad, puuviljad / Puuviljad ja marjad | COVERED | Fruits & vegetables |
| Köögiviljad, puuviljad / Köögiviljad ja aedviljad | COVERED | Fruits & vegetables |
| Köögiviljad, puuviljad / Ürdid (herbs, salads, sprouts) | COVERED | Fruits & vegetables |
| Piimatooted / Piimad → piimad | COVERED | Dairy |
| Piimatooted / Piimad → piimajoogid, kondenspiimad | MISSING | flavoured milk drinks, condensed milk |
| Piimatooted / Piimad → taimsed piimavabad joogid | EXCLUDED | plant-based imitations of dairy |
| Piimatooted / Võid ja margariinid → võid | COVERED | Dairy (butter); margarine excluded (not butter) |
| Piimatooted / Jogurtid → maitsestamata, maitsestatud jogurtid | COVERED | Dairy |
| Piimatooted / Jogurtid → joogijogurtid | MISSING | drinking yoghurts |
| Piimatooted / Jogurtid → desserdid, piimatäidisega batoonid | MISSING | puddings & dairy desserts |
| Piimatooted / Jogurtid → taimsed desserdid | EXCLUDED | plant-based imitations of dairy |
| Piimatooted / Kohupiimatooted → kohupiimad, kodujuustud | COVERED | Curd & cottage cheese |
| Piimatooted / Kohupiimatooted → kohukesed, kohupiimadesserdid | MISSING | glazed curd snacks, curd desserts |
| Piimatooted / Hapukoored ja koored | COVERED | Cream & sour cream (plant creams excluded) |
| Piimatooted / Juustud (incl. toorjuustud, määrdejuustud, delikatess) | COVERED (filtered) | Cheese — spreadable and deli cheeses are in; cheese snacks/sticks, tofu, Violife out |
| Piimatooted / Keefirid ja hapupiimad | COVERED (filtered) | Kefir & buttermilk |
| Piimatooted / Munad | COVERED | Dairy (eggs — matching by count since 2026-09-26) |
| Piimatooted / Majoneesid ja kastmed | COVERED | Sauces & condiments |
| Piimatooted / Laktoosivabad tooted | — | duplicate listing of items in their own categories |
| Leivad / Leivad ja saiad → leivad, palaleivad, saiad ja sepikud, röstsaiad | COVERED | Bread |
| Leivad / Leivad ja saiad → kuklid, muud leivatooted | EXCLUDED | buns/in-store-style bakery (Bread = leib/sai/röstsai/sepik only) |
| Leivad / Leivad ja saiad → näkileivad | MISSING | crispbreads |
| Leivad / Koogid ja tordid | COVERED (filtered) | Cakes & pastries |
| Leivad / Muud kondiitritooted → keeksid, stritslid, pakitud saiakesed | MISSING (partly) | packaged pastries beyond the cakes leaf — check against Cakes & pastries scope |
| Leivad / Muud kondiitritooted → taignad ja tordipõhjad | MISSING | doughs & cake bases (chilled) |
| Leivad / Värsked pagaritooted | EXCLUDED | in-store bakery |
| Liha / Liha → sealiha, linnuliha, veis, hakkliha | COVERED (filtered) | Meat (game, offal out) |
| Liha / Liha → toorvorstid | COVERED | Sausages |
| Liha / Liha → liha-subproduktid | EXCLUDED | offal |
| Liha / Lihatooted → viinerid, vorstid, verivorstid, grillvorstid | COVERED | Sausages |
| Liha / Lihatooted → sink, peekon, rulaadid, suitsuliha, pasteedid, lihasnakid, lihakonservid, muud | COVERED | Ham & cold cuts |
| Liha / Lihatooted → pihvid ja lihapallid, eelküpsetatud | EXCLUDED | processed/pre-cooked (ready-meal-adjacent) |
| Liha / Lihatooted → taimsed liha-alternatiivid | EXCLUDED | plant-based imitations |
| Liha / Kalatooted (heeringad, kilud, mereannid, suitsukala, kuivatatud, konservid) | COVERED | Fish & seafood |
| Liha / Kalatooted → määrded kalast | MISSING (minor) | fish spreads |
| Liha / Kulinaaria (salatid, supid, valmistoidud, võileivad, hummus, magustoidud) | EXCLUDED | ready meals, salads, soups |
| Kauasäilivad / Kommid ja maiustused | COVERED | Candy |
| Kauasäilivad / Šokolaadid | COVERED | Chocolate |
| Kauasäilivad / Küpsised → magusad, soolased, rõngikud ja präänikud | COVERED | Biscuits |
| Kauasäilivad / Küpsised → grissinid ja krutoonid | MISSING (minor) | breadsticks/croutons |
| Kauasäilivad / Snäkid → krõpsud, maisisnäkid, leivasnäkid, popcorn, muud | COVERED | Chips & snacks |
| Kauasäilivad / Snäkid → pähklid, kuivatatud marjad, seemned | COVERED | Nuts, seeds & dried fruit |
| Kauasäilivad / Snäkid → kuivad dipikastmed | EXCLUDED | dip mixes |
| Kauasäilivad / Hoidised → oliivid, konservid, kurgid, tomatid, seened | COVERED | Canned food |
| Kauasäilivad / Hoidised → magusad hoidised, määrded, mesi | COVERED | Jam & honey & spreads |
| Kauasäilivad / Hoidised → valmistoidud purgis | EXCLUDED | ready meals / canned soups |
| Kauasäilivad / Kiirtoidud → kiirnuudlid ja supid, kiirkartulipudrud | COVERED (filtered) | Instant food |
| Kauasäilivad / Kiirtoidud → puljongid | MISSING | broths & stock cubes (kept out of Instant food by decision) |
| Kauasäilivad / Kiirtoidud → kuivkastmed | EXCLUDED | sauce packets |
| Kauasäilivad / Kiirtoidud → magusad kiirtoidud | MISSING (minor) | kissell/pudding mixes |
| Kauasäilivad / Maitseained (spices, baking) | COVERED | Spices; Baking supplies |
| Kauasäilivad / Õlid | COVERED (filtered) | Cooking oil; vinegar is in Sauces & condiments |
| Kauasäilivad / Maailma köögid → nuudlid, tortillad, kookos, muud Aasia | COVERED (filtered) | World cuisine |
| Kauasäilivad / Maailma köögid → sojakastmed, Aasia/Mehhiko kastmed ja segud | COVERED | Sauces & condiments; Spices |
| Kauasäilivad / makaronid, tangained, riisid, jahud, suhkur, helbed | COVERED | Pasta; Rice & grains; Flour & sugar; Cereals & oats |
| Külmutatud / Külmutatud lihatooted | COVERED (filtered) | Meat |
| Külmutatud / Külmutatud kalatooted, mereannid | MISSING | frozen fish & seafood |
| Külmutatud / Jäätised | COVERED | Ice cream (jääkuubikud out) |
| Külmutatud / Pooltooted → pitsad, pelmeenid | COVERED | Dumplings, pizza & fries |
| Külmutatud / Pooltooted → valmistoidud ja snäkid, taimsed | EXCLUDED | frozen ready meals; plant imitations |
| Külmutatud / Köögiviljad, seened, marjad | COVERED | Frozen vegetables & berries; fries → Dumplings, pizza & fries |
| Külmutatud / Külmutatud kondiitritooted (taignad, saiakesed, pirukad, koogid, leivad) | MISSING | frozen doughs & pastries |
| Joogid / Kohv, tee, kakao | COVERED | Coffee; Tea & cocoa (kohvijoogid, kohvi valmistamiseks out) |
| Joogid / Veed | COVERED (filtered) | Drinks (vitamin/sports water out) |
| Joogid / Karastusjoogid → limonaadid, kaljad, toonikud | COVERED | Drinks |
| Joogid / Karastusjoogid → energiajoogid, spordijoogid, vitamiinijoogid | MISSING | energy/sports/vitamin drinks (Drinks excludes them by decision) |
| Joogid / Karastusjoogid → jääteed | MISSING | iced tea |
| Joogid / Mahlad → mahlad ja nektarid | COVERED | Drinks |
| Joogid / Mahlad → mahlajoogid, siirupid | MISSING | juice drinks (Drinks takes mahl/nektar only); syrups |
| Joogid / Mahlad → värskelt pressitud, smuutid | EXCLUDED | smoothies/purées |
| Joogid / Alkoholivabad joogid | COVERED (filtered) | Alcohol-free beer, cider & wine |
| Joogid / Õlu ja siider; veinid; kange alkohol | COVERED (filtered) | Beer & cider; Wine; Spirits — private testing only |
| Lastekaubad / Piimasegud | COVERED | Baby formula |
| Lastekaubad / Püreed, pudrud, snäkid ja joogid | COVERED | Baby food |
| Lastekaubad / Mähkmed; niisked salvrätikud | COVERED (filtered) | Diapers & baby wipes |
| Lastekaubad / Laste hügieenitarbed → keha-, suu-, juuksehooldus lastele | MISSING (minor) | children's toothpaste/shampoo/body care |
| Lastekaubad / Laste hügieenitarbed → tooted emadele | MISSING (minor) | nursing pads etc. |
| Lastekaubad / Laste hooldustarbed, mänguasjad | EXCLUDED | non-grocery |
| Enesehooldus / Raseerimisvahendid, intiimhügieen, juuksehooldus, kehahooldus, suuhügieen | COVERED | Personal care |
| Enesehooldus / juuksevärvid, maniküür, kehaharjad, päikesekaitse, saunatarbed, hambaproteesid | EXCLUDED | Beauty feature territory / reusable tools |
| Enesehooldus / Näohooldustooted | EXCLUDED | face care (Beauty feature) |
| Puhastustarbed / Nõudepesu, pesupesemine, kodukeemia | COVERED | Household (pest control out) |
| Puhastustarbed / Majapidamis- ja koristustarbed (paper) | COVERED | Household |
| Puhastustarbed / Lemmikloomakaubad → kuivsööt, konservid, maiustused, väikeloomad | COVERED | Pet food |
| Puhastustarbed / Lemmikloomakaubad → allapanu | MISSING | cat litter (Pet food is food only by decision) |
| Puhastustarbed / Lemmikloomakaubad → mänguasjad ja tarvikud | EXCLUDED | pet supplies |

## Rimi

| Department / subcategory | Status | Notes |
|---|---|---|
| Puuviljad, köögiviljad / juurviljad, maitsetaimed, marjad, puuviljad, salatid, seened | COVERED | Fruits & vegetables |
| Puuviljad, köögiviljad / töödeldud puu- ja köögiviljad | MISSING (minor) | pre-cut/processed produce |
| Puuviljad, köögiviljad / värske mahl, smuuti, püree | COVERED / EXCLUDED | fresh juice → Drinks; smoothies/purées out |
| Puuviljad, köögiviljad / mahlad, mahlajoogid ja siirupid | COVERED (filtered) | Drinks (mahl/nektar); juice drinks & syrups MISSING |
| Puuviljad, köögiviljad / lilled | EXCLUDED | flowers |
| Piimatooted / piimad → piim | COVERED | Dairy |
| Piimatooted / piimad → kondenspiimad, maitsestatud piim, spetsiaalsed | MISSING | condensed & flavoured milk |
| Piimatooted / võid ja margariinid → või | COVERED | Dairy |
| Piimatooted / jogurtid → jogurtid, maitsestamata jogurtid | COVERED | Dairy |
| Piimatooted / jogurtid → joogijogurtid, funktsionaalsed | MISSING | drinking yoghurts |
| Piimatooted / jogurtid → desserdid, kohukesed | MISSING | puddings & desserts; glazed curd snacks |
| Piimatooted / juust (incl. määrdejuustud, toorjuustud, delikatess) | COVERED (filtered) | Cheese |
| Piimatooted / kohupiim, kodujuust | COVERED (filtered) | Curd & cottage cheese |
| Piimatooted / koored | COVERED | Cream & sour cream |
| Piimatooted / hapupiim ja keefir | COVERED | Kefir & buttermilk |
| Piimatooted / kastmed, majonees | COVERED | Sauces & condiments |
| Piimatooted / munad → munad | COVERED | Dairy |
| Piimatooted / munad → munatooted, muud munad | MISSING (minor) | egg products, quail eggs |
| Leivad / leivad, saiad, sepikud | COVERED | Bread |
| Leivad / rahvusleivad | MISSING (minor) | lavash/pita |
| Leivad / näkileivad, galetid | MISSING | crispbreads, rice cakes |
| Leivad / kondiitritooted → tordid, koogid, rullbiskviit, muud | COVERED (filtered) | Cakes & pastries |
| Leivad / kondiitritooted → taignad, tordipõhjad | MISSING | doughs & cake bases |
| Leivad / Rimi pagarid | EXCLUDED | in-store bakery |
| Liha, kala / sealiha, linnuliha, hakkliha, veise-lamba | COVERED (filtered) | Meat |
| Liha, kala / keeduvorst, suitsuvorst, viinerid, grill-, verivorstid, toorvorstid | COVERED | Sausages |
| Liha, kala / sink, peekon, vinnutatud, sült, pasteet, muud | COVERED | Ham & cold cuts |
| Liha, kala / eelküpsetatud lihatooted, lihapallid, subproduktid | EXCLUDED | pre-cooked / offal |
| Liha, kala / värske kala, töödeldud kala, kalamari, mereannid, kuivatatud kala | COVERED | Fish & seafood |
| Liha, kala / krabipulgad | MISSING (minor) | crab sticks (check Fish scope) |
| Külmutatud / jäätis | COVERED | Ice cream |
| Külmutatud / külmutatud kala ja mereannid | MISSING | frozen fish & seafood |
| Külmutatud / külmutatud lihatooted | COVERED (filtered) | Meat |
| Külmutatud / köögiviljad, marjad, seened; friikartulid | COVERED | Frozen vegetables & berries; Dumplings, pizza & fries |
| Külmutatud / pitsa; pelmeenid ja vareenikud | COVERED | Dumplings, pizza & fries |
| Külmutatud / muu külmutatud valmistoit | EXCLUDED | frozen ready meals |
| Külmutatud / külmutatud taignad ja kondiitritooted | MISSING | frozen doughs, pastries, desserts |
| Kauasäilivad / helbed, jahud, teraviljad, makaronid ja riis | COVERED | Cereals & oats; Flour & sugar; Rice & grains; Pasta |
| Kauasäilivad / kohv, tee, kakao | COVERED | Coffee; Tea & cocoa |
| Kauasäilivad / kastmed, ketšupid, sinep; õli ja äädikas | COVERED | Sauces & condiments; Cooking oil (vinegar in Sauces) |
| Kauasäilivad / maitseained | COVERED | Spices |
| Kauasäilivad / konserveeritud köögiviljad, mesi, moos, kreemid | COVERED | Canned food; Jam & honey & spreads |
| Kauasäilivad / konserveeritud → supid, valmistoit | EXCLUDED | canned soups / ready meals |
| Kauasäilivad / kiirtoit → kiirnuudlid, kiirpudrud, kiirsupid, pajaroad | COVERED (filtered) | Instant food |
| Kauasäilivad / kiirtoit → puljongid | MISSING | broths |
| Kauasäilivad / kiirtoit → kastmed | EXCLUDED | sauce packets |
| Kauasäilivad / maailmaköök | COVERED (filtered) | World cuisine; chips → Chips & snacks; sauces → Sauces |
| Kauasäilivad / eritoitumine (gluteenivaba, suhkruvaba, keto, sojatooted, vegan) | MISSING (partly) | special-diet lines; some items already in their own categories |
| Kauasäilivad / sporditooted ja toidulisandid | EXCLUDED | supplements |
| Maiustused / kommid, närimiskumm, pastillid, kommikarbid | COVERED | Candy |
| Maiustused / kaalukommid | MISSING (minor) | pick-and-mix (weighed) |
| Maiustused / šokolaad; küpsised, vahvlid; krõpsud, popkorn; pähklid, kuivatatud puuviljad | COVERED | Chocolate; Biscuits; Chips & snacks; Nuts, seeds & dried fruit |
| Maiustused / dipikastmed | EXCLUDED | dips |
| Maiustused / hooajalised, suhkruvabad, gluteenivabad, keto snäkid | MISSING (minor) | seasonal/special-diet duplicates |
| Joogid / alkoholivabad joogid | COVERED (filtered) | Alcohol-free beer, cider & wine |
| Joogid / kali, limonaad, toonik, vesi | COVERED | Drinks |
| Joogid / energiajook, spordijoogid, jäätee, kohvijoogid | MISSING | energy/sports drinks, iced tea, coffee drinks |
| Alkohol / õlu, siider, kokteilid; vein, vahuvein, vermut; kange alkohol | COVERED (filtered) | Beer & cider; Wine; Spirits — private testing only |
| Lastekaubad / lastetoidud (piimasegud, püreed, pudrud, snäkid, joogid) | COVERED | Baby formula; Baby food |
| Lastekaubad / mähkmed; niisked salvrätid | COVERED (filtered) | Diapers & baby wipes |
| Lastekaubad / beebi hooldusvahendid, suuhooldus lastele | MISSING (minor) | baby/children's hygiene |
| Lastekaubad / emade hooldusvahendid | MISSING (minor) | nursing products |
| Lastekaubad / mänguasjad, sokid, aluspesu | EXCLUDED | non-grocery |
| Enesehooldus / deodorandid, hügieenilised salvrätid, intiimhügieen, juuksehooldus, kehahooldus, raseerimine, suuhooldus | COVERED (filtered) | Personal care |
| Enesehooldus / näohooldus, kosmeetika, päevitustooted, korea kosmeetika, juuksevärvid | EXCLUDED | Beauty feature territory |
| Enesehooldus / koduapteek | EXCLUDED | home pharmacy |
| Puhastusvahendid (SH-14 combined page: nõudepesu, pesupesemine, puhastus) | COVERED (filtered) | Household (cloths, sponges, gloves, shoe care out) |
| Kodu / majapidamispaber ja tualettpaber, taskurätikud | COVERED | Household (via SH-14) |
| Kodu / prügikotid | COVERED | Household |
| Kodu / foolium, küpsetuspaber | MISSING | foil, cling film, baking paper |
| Kodu / õhuvärskendajad | COVERED (partly) | Household |
| Lemmikloomad / kassitoit, koeratoit | COVERED | Pet food |
| Lemmikloomad / kassiliiv | MISSING | cat litter |
| Lemmikloomad / mänguasjad, tarvikud | EXCLUDED | pet supplies |
| Valmistoit (SH-16), vegantooted (SH-17) | EXCLUDED | ready meals; plant-based imitations (oat milks etc.) |

## Selver

| Department / subcategory (id, items) | Status | Notes |
|---|---|---|
| Puu- ja köögiviljad 210–217 | COVERED | Fruits & vegetables |
| Puu- ja köögiviljad / Smuutid, värsked mahlad 369/49 (81) | EXCLUDED | smoothies/purées |
| Piimatooted / Piimad, koored 234 (150) | COVERED (filtered) | Dairy (milk); Cream & sour cream; Kefir & buttermilk |
| Piimatooted / Kohupiimad, kodujuustud 235 (83) | COVERED (filtered) | Curd & cottage cheese |
| Piimatooted / Jogurtid, jogurtijoogid 236 (120) | COVERED (filtered) | Dairy (yoghurts); drinking yoghurts MISSING |
| Piimatooted / Kohukesed 237 (33) | MISSING | glazed curd snacks |
| Piimatooted / Muud magustoidud 238 (45) | MISSING | puddings & dairy desserts |
| Piimatooted / Munad 239 (18) | COVERED | Dairy |
| Piimatooted / Võid, margariinid 240 (32) | COVERED (filtered) | Dairy (butter) |
| Juustud 243–245 (261) | COVERED (filtered) | Cheese — spreadable (244) and deli (245) included |
| Leivad / Leivad 248, Saiad 249 | COVERED | Bread |
| Leivad / Sepikud, kuklid, lavašid 250 (7) | MISSING (minor) | sepik at Selver, lavash |
| Leivad / Näkileivad 251 (23) + 276 (96) | MISSING | crispbreads |
| Leivad / Selveri Pagarid 252 | EXCLUDED | in-store bakery |
| Leivad / Tordid 253, Koogid 254, Saiakesed 255 | COVERED (filtered) | Cakes & pastries (doughs out) |
| Valmistoidud 257–261, 443 | EXCLUDED | ready meals, salads, sushi |
| Liha / Sealiha, Linnuliha, Veis, Hakkliha 219–222 | COVERED (filtered) | Meat |
| Liha / Vorstid 223, 226 | COVERED (filtered) | Sausages |
| Liha / Singid 224, Muud lihatooted 225, Gurmee 227 | COVERED (filtered) | Ham & cold cuts |
| Kala 228–231 | COVERED | Fish & seafood |
| Kuivained / Jahud 10, Makaronid 11, Tangained 12, Riisid 13, Helbed 15 | COVERED | Flour & sugar; Pasta; Rice & grains; Cereals & oats |
| Kuivained / Kuivsupid ja -kastmed 16, Paja- ja nuudliroad 17 | COVERED (filtered) | Instant food |
| Kuivained / Gurmee kuivained 14 (2) | MISSING (minor) | — |
| Hoidised / Magusad hoidised 19 | COVERED | Jam & honey & spreads |
| Hoidised / Hoidised 20 | COVERED (filtered) | Canned food |
| Hoidised / Valmistoidud purgis 21 (86) | EXCLUDED | canned ready meals/soups |
| Kohv 24, Teed 25, Kakaod 26 | COVERED | Coffee; Tea & cocoa |
| Joogid / Veed 50, Mahlad 51 (filtered), Karastusjoogid 53 | COVERED | Drinks (syrups/concentrates out) |
| Joogid / Energiajoogid 54 (74), Spordijoogid 57 | MISSING | energy/sports drinks |
| Joogid / siirupid (in 51) | MISSING | syrups |
| Joogid / Alkoholivabad joogid 55 | COVERED (filtered) | Alcohol-free beer, cider & wine |
| Joogid / Lahja alkohol 30–35, Kange alkohol 38–45 | COVERED (filtered) | Beer & cider; Wine; Spirits — private testing only |
| Joogid / Toidulisandid 58, Välgumihklid 62 | EXCLUDED | supplements; non-grocery |
| Maailma köök 264 | COVERED (filtered) | World cuisine (sauces/spice mixes to Sauces/Spices) |
| Maitseained 263 | COVERED (filtered) | Spices; Baking supplies |
| Puljongid 265 (20) | MISSING | broths |
| Kastmed, õlid 267–270 | COVERED (filtered) | Sauces & condiments (vinegar in); Cooking oil |
| Maiustused / Kommid 272–274, 282; Šokolaadid 283; Küpsised 275; Sipsid 278; Pähklid 277 | COVERED | Candy; Chocolate; Biscuits; Chips & snacks; Nuts |
| Külmutatud / Liha- ja kalatooted 285 (106) | COVERED (filtered) | Dumplings/Meat take the meat part; **frozen fish MISSING** |
| Külmutatud / Valmistooted 286 | COVERED (filtered) / EXCLUDED | pizza & dumplings in; ready meals out |
| Külmutatud / Köögiviljad, marjad 287 | COVERED | Frozen vegetables & berries (fries → Dumplings, pizza & fries) |
| Külmutatud / Tainad ja kondiitritooted 288 (47) | MISSING | frozen doughs & pastries |
| Külmutatud / Jäätised 289 | COVERED (filtered) | Ice cream |
| Lastekaubad / Lastetoidud 307 | COVERED (filtered) | Baby food; Baby formula |
| Lastekaubad / Mähkmed 308, Beebi hooldusvahendid 309 | COVERED (filtered) | Diapers & baby wipes |
| Lastekaubad / Tarvikud 310, Mänguasjad 311, Sokid 313 | EXCLUDED | non-grocery |
| Enesehooldus / Suuhooldus 69–70; Juuksehooldus 78, 79, 518; Kehahooldus 83, 84, 86, 88, 91, 93 | COVERED | Personal care |
| Enesehooldus / Hügieenilised salvrätikud, vatid 74 (17) | MISSING (minor) | wet wipes/cotton (covered at Rimi, not here) |
| Enesehooldus / Tervisekaubad 65, Apteegikaubad 66, Plaastrid 90 | EXCLUDED | home pharmacy |
| Enesehooldus / Näohooldus 72–76, 425; Juuksevärvid 80; Päevitus 85; Lõhnad 92; Dekoratiivkosmeetika 94–99 | EXCLUDED | Beauty feature territory |
| Enesehooldus / Juukseharjad 81, Maniküür 87 | EXCLUDED | reusable tools |
| Majapidamine / Paberitooted 102–104 | COVERED | Household |
| Majapidamine / Nõudepesu 108, Puhastusvahendid 110–111, Prügikotid 112 | COVERED | Household |
| Majapidamine / **Pesupesemisvahendid 114 (164)** | **MISSING — gap** | laundry detergents are in Household at Barbora and Rimi but were never fetched at Selver (all 32 laundry products are 2-store) |
| Majapidamine / Svammid, harjad 109; Rõivaste ja jalatsite hooldus 115–116; Parasiitide tõrje 120 | EXCLUDED | reusable tools; shoe/clothing care; pest control |
| Majapidamine / Fooliumid, kiled, küpsetuspaberid 127 (37) | MISSING | foil, cling film, baking paper |
| Lemmikloomad / Kassitoidud 315, Koeratoidud 316, Väikeloomad 317, Kala- ja linnutoidud 318 | COVERED | Pet food |
| Lemmikloomad / Lemmikloomatarbed 319 (29) | MISSING (litter) / EXCLUDED (toys) | cat litter is in here |

## Out of scope at every store (not grocery)

Rimi SH-10 kodu- ja vabaajakaubad (kitchenware, textiles, candles,
office, garden, electronics, clothing), SH-15 autotooted, SH-18
teenused, SH-19 talu-toidab and Rimi's seasonal/gourmet/promo
duplicates; Selver 118–165 (home goods, kitchenware, appliances,
textiles, garden), 166 vabaajakaubad, 322 hooajakaubad and every
promo/campaign node; Barbora mänguasjad, laste hooldustarbed.

## Batch 10 — proposal (from the MISSING list)

Kept out, as instructed: ready meals, salads, sushi, in-store bakery,
bulk packs, medicine, makeup, non-grocery goods. Already covered, so
NOT proposed: spreadable and deli cheeses (in Cheese at all three
stores), vinegar (in Sauces & condiments).

1. **Kohukesed & dairy desserts** — glazed curd snacks, curd desserts,
   puddings (Barbora kohukesed/kohupiimadesserdid/desserdid, Rimi
   desserdid/kohukesed, Selver 237 + 238). Traps: flavour, glaze,
   piece count/multipack, lactose-free.
2. **Drinking yoghurts, flavoured & condensed milk** (Barbora
   joogijogurtid/piimajoogid/kondenspiimad, Rimi joogijogurtid/
   funktsionaalsed/kondenspiimad/maitsestatud piim, Selver 236
   drinks + 234 rest). Traps: fat %, flavour, volume.
3. **Näkileivad** — crispbreads, rice cakes, galetid (Barbora
   nakileivad, Rimi SH-6-4, Selver 251 + 276). Traps: grain, seeds,
   thin/thick, pack weight.
4. **Energy, sports & iced-tea drinks** (Barbora energiajoogid/
   spordijoogid/vitamiinijoogid/jäteed, Rimi SH-3-4/5/10, Selver 54,
   57). Traps: sugar-free, flavour, can vs bottle, multipack.
5. **Syrups & concentrates + juice drinks** (Barbora siirupid/
   mahlajoogid, Rimi mahlajoogid & siirupid, Selver 51's siirupid).
   Traps: concentrate ratio, sugar-free, volume.
6. **Frozen fish & seafood** (Barbora, Rimi SH-4-2, Selver 285's fish
   part). Traps: species, fillet vs whole, glaze %, weight.
7. **Frozen doughs & pastries** (Barbora kulmutatud-kondiitritooted,
   Rimi SH-4-6, Selver 288) — doughs, pastries, pies, frozen bread;
   frozen ready meals stay out. Traps: puff vs shortcrust, filling,
   piece count.
8. **Broths & stock** (Barbora puljongid, Rimi kiirtoit/puljongid,
   Selver 265). Traps: cube vs liquid vs powder, kind (chicken/beef/
   vegetable), piece count.
9. **Cat litter** — needs the owner's decision (Pet food is "food
   only" today): Barbora allapanu, Rimi kassiliiv, Selver 319.
10. **Household gaps, no new category**: add Selver 114
    Pesupesemisvahendid to Household (laundry, 164 items); consider
    foil/cling film/baking paper as a Household consumable (Rimi
    foolium-kupsetuspaber, Selver 127, Barbora in
    majapidamistarbed).

Smaller MISSING items not proposed for batch 10 (low count or scope
question): children's toothpaste/shampoo, nursing products, crab
sticks, fish spreads, grissini/croutons, pick-and-mix candy, lavash/
pita, sepik at Selver, egg products, special-diet lines, kissell
mixes, wet wipes at Selver.
