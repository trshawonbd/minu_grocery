# Possible matches, sorted by hand

Every pair from `data/review.md`'s "Possible matches to check by hand" section, read by hand and sorted into three groups. Nothing here is applied automatically — no matching rule changed, no override added, no product re-scraped. If you decide a pair really is the same product, add it to `data/products.json` yourself (see the README).

- **ALMOST CERTAINLY SAME** — the only difference is an abbreviation, spelling/grammatical variant, word order, translation, or a generic/packaging word that adds no real product difference.
- **CERTAINLY DIFFERENT** — the differing word states a real product difference (flavour, variety, fat %, sliced vs whole, carbonated vs still, organic, with/without something).
- **UNSURE** — genuinely unclear either way. Raw names, prices, and store URLs are given so you can check by hand.

## Counts

| Category | Almost certainly same | Certainly different | Unsure | Total |
|---|---|---|---|---|
| Fruits & vegetables | 1 | 3 | 2 | 6 |
| Dairy | 12 | 0 | 1 | 13 |
| Bread | 10 | 9 | 3 | 22 |
| Drinks | 18 | 10 | 2 | 30 |
| **Total** | **41** | **22** | **8** | **71** |

## 1. Almost certainly same

### Fruits & vegetables (1)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Soolakurk küüslauguga, 500g" (3.29 €) | Rimi "Soolakurk küüslauguga Eesti And 500g/300g" (3.29 €) | only difference is a stray "g" — a tokenizer artifact from "500g/300g", not a real word; both say küüslauguga |

### Dairy (12)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Piim ALMA 0.05% 1L" (1.25 €) | Selver "Piim rasvatu 0,05%, ALMA, 1 L" (1.25 €) | rasvatu (fat-free) just restates the already-agreed 0.05% fat in words |
| Barbora "Mahetäispiim MO SAAREMAA Öko 3,8-4,4%,1L" (1.69 €) | Selver "Mahetäispiim 3,8 - 4,4%, MO SAAREMAA, 1 L" (1.45 €) | öko is a redundant synonym for the already-agreed "mahe"/organic |
| Barbora "Meiereivõi VALIO soolata, 500g" (4.99 €) | Rimi "Või soolata Valio 500g" (5.89 €) | meiereivõi (creamery butter) = või (butter), same product |
| Barbora "Meiereivõi VALIO soolata, 500g" (4.99 €) | Selver "Meierivõi soolata, VALIO, 500 g" (5.79 €) | spelling variant — meiereivõi vs meierivõi, one letter |
| Barbora "Proteiinijogurt ALMA kreeka m-ta 370g" (1.75 €) | Rimi "Proteiinijogurt kreeka m.-mata Alma 370g" (1.89 €) | both sides abbreviate "maitsestamata" (unflavoured) — m-ta / m.-mata |
| Barbora "Koorejogurt Muah marja-plomb. ALMA 180g" (1.29 €) | Selver "Koorejogurt muah marja-plombiirimaitseline, ALMA, 180 g" (1.31 €) | abbreviation of plombiirimaitseline (plombir-flavoured) |
| Barbora "Koorene ploomi-martsip.jogurt FARMI 200g" (1.19 €) | Selver "Koorene ploomi-martsipani jogurt, FARMI, 200 g" (1.19 €) | grammatical case of the same word (martsipani = marzipan's) |
| Rimi "Piim Alma 2,5% 1l" (1.29 €) | Selver "Piim 2,5% pure, ALMA, 1 L" (1.25 €) | "pure" is a generic packaging/format word, not a different product |
| Rimi "Täispiim 3,6%-4,2% Farmi 1l" (1.65 €) | Selver "Täispiim 3,6%-4,2% pure, FARMI, 1 L" (1.65 €) | "pure" is a generic packaging/format word, not a different product |
| Rimi "Piim Alma kile 2,5% 1l" (0.89 €) | Selver "Piim 2,5% pure, ALMA, 1 L" (1.25 €) | kile and pure are both packaging-format words, not a different product |
| Rimi "Või soolata Valio 500g" (5.89 €) | Selver "Meierivõi soolata, VALIO, 500 g" (5.79 €) | või (butter) = meierivõi (creamery butter), same product |
| Rimi "Või laktoosivaba MO Saaremaa 200g" (2.49 €) | Selver "Saaremaa või, laktoosivaba, MO SAAREMAA, 200 g" (1.99 €) | "Saaremaa" is a redundant repeat of the already-agreed brand (MO Saaremaa) |

### Bread (10)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Rehe rukkileib vorm.EESTI PAGAR,600g" (0.65 €) | Rimi "Rukkileib Rehe Eesti Pagar 600g" (0.82 €) | vorm (tin-baked) is a baking-method note; Rimi's plain name is the same standard loaf |
| Barbora "Rustikaalne Meeleib EESTI PAGAR 500g" (1.79 €) | Rimi "Meeleib Eesti Pagar 500g" (1.39 €) | rustikaalne (rustic) is a marketing adjective, not a recipe difference |
| Barbora "Teratasku Eesti Pagar 4tk, 280g" (0.99 €) | Selver "Teratasku, EESTI PAGAR, 280 g" (0.99 €) | "tk" is a piece-count artifact from "4tk", not a real word |
| Barbora "Leiburi RÖST mitmevilja, 470g" (1.29 €) | Rimi "Röst Mitmevilja Leibur 470g" (1.89 €) | "Leiburi" is the grammatical (genitive) form of the brand name Leibur |
| Barbora "Röstsai FAZER mini, 240g" (1.29 €) | Selver "Mini röst, FAZER, 240 g" (1.29 €) | röstsai and röst are the same word, one abbreviated |
| Barbora "Röst 100% rukkijahu LEIBUR 550g" (1.95 €) | Selver "Röst 100% rukkijahust, LEIBUR, 550 g" (1.98 €) | rukkijahu/rukkijahust — same word, different grammatical case |
| Barbora "5-vilja röstsepik täisterahel.FAZER,480g" (1.95 €) | Rimi "Röstsepik täisterahelvest. 5-vilja Fazer 480g" (1.55 €) | both sides truncate the same word (täisterahelvestega — with wholegrain flakes) |
| Rimi "Rukkileib idan. teradega Lõuna Pagarid 300g" (1.59 €) | Selver "Rukkileib idandatud teradega, LÕUNA PAGARID, 300g" (1.49 €) | exact abbreviation: idan. = idandatud (sprouted) |
| Rimi "Röst Mitmevilja Leibur 470g" (1.89 €) | Selver "Röstsai mitmevilja, LEIBUR, 470 g" (1.99 €) | röst and röstsai are the same word, one abbreviated |
| Rimi "Pagariröst täistera Eesti Pagar 430g" (1.59 €) | Selver "Röstsai täistera, EESTI PAGAR, 430 g" (1.59 €) | pagariröst and röstsai are used interchangeably for the same product type |

### Drinks (18)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Mineraalvesi EVIAN 500ml" (1.25 €) | Rimi "Mineraalvesi looduslik Evian 0,5l" (1.25 €) | looduslik (natural) is a generic quality word, not a different recipe |
| Barbora "Vesi AURA gaasita 500ml" (0.56 €) | Selver "Vesi Spring gaasita, AURA, 500 ml" (0.56 €) | "Spring" is Aura's still-water line name, not a different recipe; identical price |
| Barbora "VÄRSKA Naturaal Mullita 1,5L" (0.99 €) | Selver "Värska Naturaal gaasita, VÄRSKA, 1,5 L" (0.99 €) | mullita and gaasita are synonyms — both mean "no bubbles/still" |
| Barbora "Gaseerimata vesi AURA Mg 500ml" (1.29 €) | Rimi "Vesi Aura Mg gaasita 0.5l" (1.39 €) | gaseerimata and gaasita are synonyms for "still"; both sides already say Mg |
| Barbora "Mineraalvesi VÄRSKA originaal 1l" (1.45 €) | Selver "Värska Originaal, VÄRSKA, 1 L" (1.45 €) | leftover words are a generic category noun (mineraalvesi) and a redundant brand repeat (värska) |
| Barbora "Mineraalvesi VÄRSKA originaal 1.5L" (1.69 €) | Selver "Värska Originaal, VÄRSKA, 1,5 L" (1.68 €) | leftover words are a generic category noun (mineraalvesi) and a redundant brand repeat (värska) |
| Barbora "Mineraalvesi VÄRSKA 0,5 L" (0.98 €) | Rimi "Mineraalvesi Värska Originaal 0,5l" (1.09 €) | "Originaal" is missing only from this Barbora SKU's display name, not from its real brand data |
| Barbora "Looduslik karbon.mineraalvesi BORJOMI 1L" (2.49 €) | Selver "Karboniseeritud looduslik mineraalvesi, BORJOMI, 1 L" (2.49 €) | karbon is an abbreviation of karboniseeritud (carbonated) |
| Barbora "Mineraalvesi VÄRSKA originaal 500ml" (0.99 €) | Selver "Värska Originaal, VÄRSKA, 500 ml" (0.97 €) | leftover words are a generic category noun (mineraalvesi) and a redundant brand repeat (värska) |
| Barbora "Mahl RYNKEBY Kuivatatud Ploomist 1L" (4.25 €) | Selver "Kuivatatud ploomi mahl, RYNKEBY, 1 L" (4.26 €) | ploomist/ploomi — same word (plum), different grammatical case |
| Barbora "Karastusjook FENTIMANS Rose Lemona.275ml" (2.35 €) | Rimi "Karastusjook Rose Fentimans 0,275l" (2.35 €) | lemona is Barbora's truncated "lemonade" |
| Barbora "Karastusjook FENTIMANS Rose Lemona.275ml" (2.35 €) | Selver "Karastusjook Rose Lemonade, FENTIMANS, 275 ml" (2.43 €) | lemona is Barbora's truncated "lemonade" |
| Barbora "Vahujook LIMPA Mullike 750ml" (3.39 €) | Rimi "Karastusjook Limpa Mullike 0,75l" (3.59 €) | vahujook and karastusjook are both generic category words for the same drink type |
| Barbora "Karastusjook COCA-COLA 6x330ml" (6.19 €) | Rimi "Karastusjook Coca-Cola 6x0,33l purk" (6.19 €) | purk (can) is a packaging-material word; size already agrees |
| Barbora "Karastusjook COCA-COLA 6x330ml" (6.19 €) | Selver "Karastusjook Coca-Cola 6-pakk, COCA-COLA, 6 x 330 ml" (5.99 €) | pakk (pack) just restates the already-known 6-pack size |
| Barbora "Karastusjook FANTA Zero Apelsin 500ml" (1.29 €) | Rimi "Karastusjook Fanta Orange Zero 0,5l" (1.29 €) | apelsin (Estonian) and orange (English) are the same flavour, translated |
| Barbora "Karastusjook SUPER MANKI 330ml" (1.05 €) | Rimi "Karastusjook Super Manki 0,33l prk" (0.99 €) | prk (can) is a packaging-material word; size already agrees |
| Barbora "Karastusjook COCA-COLA Zero 330ml" (1.21 €) | Rimi "Karastusjook Coca-Cola Zero 0,33l prk" (0.89 €) | prk (can) is a packaging-material word; both sides already say Zero |

## 2. Certainly different

### Fruits & vegetables (3)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Viinamari hele, seemneteta, 500g" (2.99 €) | Selver "Viinamari punane seemneteta, 500 g" (2.99 €) | different grape colour/variety (hele=light vs punane=red) |
| Barbora "Aurutatud punapeet KADARBIKU,500g" (1.99 €) | Rimi "Hapukapsas Kadarbiku 500g" (1.79 €) | different vegetables entirely (punapeet=beetroot vs hapukapsas=sauerkraut) |
| Barbora "Peakapsa Kimchi 300g" (3.59 €) | Rimi "Punase peakapsa Kimchi Kadarbiku 300g" (3.59 €) | punane (red) cabbage is a different variety/colour from the unspecified plain cabbage |

### Bread (9)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Rehe rukkileib vorm.EESTI PAGAR,600g" (0.65 €) | Selver "Rehe rukkileib viilutatud, EESTI PAGAR, 600 g" (1.29 €) | viilutatud = sliced, a real format difference from the tin-baked/whole loaf |
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Rimi "Täisteravormileib Ruks Leibur 300g" (1.05 €) | täisteravormileib = wholegrain tin bread, a real recipe difference from plain vormileib |
| Barbora "Ruks vormileib LEIBUR 300g" (0.99 €) | Selver "Täistera vormileib Ruks, LEIBUR, 300 g" (0.99 €) | täistera = wholegrain, a real recipe difference |
| Barbora "Pagari röst täistera 430g" (1.59 €) | Selver "Pagari Haputaina röst, EESTI PAGAR, 430 g" (1.59 €) | täistera (wholegrain) and haputaina (sourdough) are two different real recipe attributes |
| Rimi "Rukkileib Rehe Eesti Pagar 600g" (0.82 €) | Selver "Rehe rukkileib viilutatud, EESTI PAGAR, 600 g" (1.29 €) | viilutatud = sliced, a real format difference |
| Rimi "Sai Perenaise Eesti Pagar 320g" (0.89 €) | Selver "Perenaise sai viilutatud, EESTI PAGAR, 320 g" (0.97 €) | viilutatud = sliced, a real format difference |
| Rimi "Hea Sai Eesti Pagar 300g" (0.55 €) | Selver "Hea sai viilutatud, EESTI PAGAR, 300 g" (0.55 €) | viilutatud = sliced, a real format difference |
| Rimi "Röstsai mitmevilja Tosta Eesti Pagar 500g" (1.19 €) | Selver "Tosta röstsai viilutatud, EESTI PAGAR, 500 g" (1.31 €) | mitmevilja (multigrain) missing and viilutatud (sliced) present — two real differences |
| Rimi "Röstsai mitmevilja Tosta Eesti Pagar 500g" (1.19 €) | Selver "Tosta mitmevilja-röstsai viilutatud, EESTI PAGAR, 500 g" (1.55 €) | viilutatud = sliced, a real format difference |

### Drinks (10)

| Item A | Item B | Why |
|---|---|---|
| Barbora "Vesi AURA gaasita 500ml" (0.56 €) | Rimi "Vesi Aura Mg gaasita 0.5l" (1.39 €) | Mg = magnesium-enriched water, a different (functional) product from plain water |
| Barbora "Kergelt gaseeritud vesi AURA Mg 500ml" (1.29 €) | Selver "Vesi kergelt gaseeritud, AURA, 500 ml" (0.56 €) | Mg = magnesium-enriched water, a different (functional) product from plain water |
| Barbora "Vesi AURA FRUIT Mustikas 1.5l" (1.35 €) | Selver "Vesi Ananass, AURA FRUIT, 1,5 L" (1.39 €) | different flavours — mustikas (blueberry) vs ananass (pineapple) |
| Barbora "Vesi AURA FRUIT Mustikas 500ml" (0.86 €) | Selver "Vesi Ananass, AURA FRUIT, 500 ml" (0.85 €) | different flavours — mustikas (blueberry) vs ananass (pineapple) |
| Barbora "Vesi AURA FRUIT granadilli 1.5L" (1.49 €) | Selver "Vesi Ananass, AURA FRUIT, 1,5 L" (1.39 €) | different flavours — granadilli (passionfruit) vs ananass (pineapple) |
| Barbora "Greibinektar CIDO 1L" (1.99 €) | Selver "Jõhvikanektar, CIDO, 1 L" (2.19 €) | different flavours — greibi (grapefruit) vs jõhvika (cranberry) |
| Barbora "Astelpaju nektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) | nektar vs täismahl (100%/whole juice) — a real juice-vs-nectar difference |
| Barbora "Astelpaju-mustikanektar SEMU 500ml" (3.09 €) | Rimi "Täismahl Semu astelpaju 0,5l" (5.99 €) | adds a blueberry flavour AND nektar-vs-täismahl — two real differences |
| Barbora "Karastusjook FANTA Shokata Zero 500ml" (1.29 €) | Rimi "Karastusjook Fanta Orange Zero 0,5l" (1.29 €) | Shokata and Orange are different real Fanta flavours |
| Barbora "Karastusjook COCA-COLA Zero 330ml" (1.21 €) | Rimi "Karastusjook Coca-Cola 0,33l prk" (0.89 €) | Zero (sugar-free) present on only one side — a real formulation difference |

## 3. Unsure

### Fruits & vegetables (2)

| Item A | Item B | Why unsure |
|---|---|---|
| Barbora ["Särtsakas peedisalat koriandriga, 450g"](https://barbora.ee/toode/sartsakas-peedisalat-koriandriga-450-g) (2.59 €) | Rimi ["Peedisalat koriandriga Eesti And 450g"](https://www.rimi.ee/epood/ee/tooted/puuviljad-koogiviljad-lilled/toodeldud-puu--ja-koogiviljad/peedisalat-koriandriga-eesti-and-450g/p/2000453) (2.59 €) | särtsakas (zesty/spicy) could be marketing flair or a real added-heat recipe difference |
| Rimi ["Viinamari punane Ralli 1kl 500g"](https://www.rimi.ee/epood/ee/tooted/puuviljad-koogiviljad-lilled/puuviljad/viinamarjad/viinamari-punane-ralli-1kl-500g/p/297278) (3.29 €) | Selver ["Viinamari punane seemneteta, 500 g"](https://www.selver.ee/viinamari-punane-seemneteta-500-g) (2.99 €) | Ralli is a named grape cultivar; seemneteta (seedless) is a real attribute stated on only one side |

### Dairy (1)

| Item A | Item B | Why unsure |
|---|---|---|
| Rimi ["Koorejogurt rukkileiva-kaneeli Muah Alma 380g"](https://www.rimi.ee/epood/ee/tooted/piimatooted-munad-juust/jogurtid-desserdid-kohukesed/jogurtid/koorejogurt-rukkileiva-kaneeli-muah-alma-380g/p/299592) (1.39 €) | Selver ["Koorejogurt Muah rukkileiva, ALMA, 380 g"](https://www.selver.ee/koorejogurt-muah-rukkileiva-alma-380-g) (1.68 €) | kaneeli (cinnamon) is a real flavour component present on only one side |

### Bread (3)

| Item A | Item B | Why unsure |
|---|---|---|
| Barbora ["Täistera röstsepik EESTI PAGAR,500g"](https://barbora.ee/toode/taistera-rostsepik-eesti-pagar-500-g) (1.55 €) | Rimi ["Röstsepik täistera Tosta Eesti Pagar 500g"](https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/leivad-saiad-sepikud/sai/rostsepik-taistera-tosta-eesti-pagar-500g/p/957205) (1.19 €) | "Tosta" may be a specific named product line, or just an omitted sub-brand name |
| Rimi ["Saib Leibur 370g"](https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/leivad-saiad-sepikud/rostsai/saib-leibur-370g/p/278361) (1.69 €) | Selver ["Saib 100% rukkijahust, LEIBUR, 370 g"](https://www.selver.ee/saib-100-rukkijahust-leibur-370-g) (1.68 €) | "100% rukkijahust" (100% rye flour) may be a real recipe claim or a redundant restatement |
| Rimi ["Kodusai mini röst Fazer 240g"](https://www.rimi.ee/epood/ee/tooted/leivad-saiad-kondiitritooted/leivad-saiad-sepikud/rostsai/kodusai-mini-rost-fazer-240g/p/902923) (1.39 €) | Selver ["Mini röst, FAZER, 240 g"](https://www.selver.ee/mini-rost-fazer-240-g) (1.29 €) | "Kodusai" is a specific Fazer product line name; unclear if this Selver item is the same line |

### Drinks (2)

| Item A | Item B | Why unsure |
|---|---|---|
| Barbora ["VÄRSKA Originaal aluseline 1,5L"](https://barbora.ee/toode/varska-originaal-aluseline-1-5-l) (1.65 €) | Selver ["Värska Originaal, VÄRSKA, 1,5 L"](https://www.selver.ee/varska-originaal-varska-1-5-l) (1.68 €) | aluseline (alkaline) may just be inherent to all Värska Originaal water, or a genuinely distinct SKU — a past check found Selver using two different EANs for near-identically-named 500ml Värska listings, so treat this brand as unresolved rather than assume either way |
| Barbora ["Multivitamiininektar CAPPY 1L"](https://barbora.ee/toode/multivitamiininektar-cappy-1-l) (2.85 €) | Selver ["Multinektar, CAPPY, 1 l"](https://www.selver.ee/multinektar-cappy-1-l) (2.89 €) | multivitamiininektar (vitamin-fortified) may be a real formulation difference or just a fuller product name |

