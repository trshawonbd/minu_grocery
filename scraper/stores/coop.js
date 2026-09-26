// Fetches Coop Haapsalu products (coophaapsalu.ee — the Haapsalu
// consumer cooperative's WooCommerce e-shop; prices are that region's,
// hence the app label "Coop (Haapsalu)") from its public WooCommerce
// Store API, `/wp-json/wc/store/v1/products` — plain JSON, no key, 100
// products per page, filtered by category id. robots.txt allows it and
// the sales terms say nothing about automated access (checked
// 2026-09-27); still a lawyer's check before anything public, like
// the other stores. 1 request/second, strictly sequential.
//
// Fields used: name, permalink (url), prices.price (cents — what any
// shopper pays online today; the site says Säästukaart discounts don't
// apply online, so an online sale price is open to everyone),
// prices.regular_price (pre-sale price, only kept when higher),
// is_in_stock (out-of-stock items are not offered at all), sku (the
// EAN barcode on branded goods, an internal code on own goods —
// validated by scraper/match-products.js's isValidEan before it can
// match anything), images[0].src (hotlinked only, like the others).
// No brand field, no usable per-kg price (the site's own is broken) —
// the app computes unit prices from the size in the name.

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const API_URL = "https://coophaapsalu.ee/wp-json/wc/store/v1/products";
const PER_PAGE = 100;

let lastRequestAt = 0;
async function throttle() {
  const wait = lastRequestAt + 1000 - Date.now();
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastRequestAt = Date.now();
}

async function fetchJson(url) {
  await throttle();
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } });
  if (!response.ok) throw new Error(`Coop: HTTP ${response.status} for ${url}`);
  const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1", 10);
  return { data: await response.json(), totalPages: Number.isFinite(totalPages) ? totalPages : 1 };
}

// Word-list helper, same shape as the one in categories.js/selver.js
// (its own copy: a store module stays self-contained).
function excludeWords(exclude, require) {
  return (name) => {
    const lower = name.toLowerCase();
    if (require && !require.some((p) => (p instanceof RegExp ? p.test(lower) : lower.includes(p)))) {
      return false;
    }
    return !exclude.some((p) => (p instanceof RegExp ? p.test(lower) : lower.includes(p)));
  };
}

const cents = (value) => (value == null || value === "" ? null : Math.round(parseInt(value, 10)) / 100);

// One raw item in the same shape the other store modules return.
function mapItem(product) {
  const price = cents(product.prices && product.prices.price);
  const regular = cents(product.prices && product.prices.regular_price);
  const image = Array.isArray(product.images) && product.images[0] && product.images[0].src ? product.images[0].src : null;
  const sku = product.sku ? String(product.sku).trim() : "";
  return {
    store: "Coop",
    name: String(product.name || "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim(),
    price,
    regularPrice: regular,
    cardPrice: null,
    cardName: null,
    currency: "EUR",
    url: product.permalink,
    // Only a digit string can be a barcode; validity (8/13 digits with
    // a correct check digit) is decided in match-products.js.
    ean: /^\d{8}$|^\d{13}$/.test(sku) ? sku : null,
    image,
    storeUnitPrice: null,
    brand: null,
  };
}

// ---- Filters shared with categories.js/selver.js (own copies) ----
const MEAT_OFFAL = ["maks", "süda", /\bneer/, "kops", "magu", /\bkeel\b/, "puljongikont", "supikogu", /\bluu\b/, "veri"];
const MEAT_GAME = ["küülik", "uluk", "metssea", "hirve", "põdra", "vutt", "vuti"];
const PLANT_WORDS = ["taimne", "taimse", "taimevalgu", "vegan", "tofu", "soja", "kanaloog", "thormi", "bon vegan", "violife"];
const HAM_WORDS = ["sink", "singi", "pancetta"];
const SAUSAGE_WORDS = ["vorst", "viiner", "sardell", "salaami", "salami", "fuet", "chorizo", "salchichon", "pepperoni", "kabanos", "servelaat"];
const FROZEN_POTATO_WORDS = ["friik", "kartulisektor", "kartuliviil", "kartulipall", "kartulipannkoo", "kartulikroket", "rösti", "vigurkartul", "hash brown"];
const WATER_EXCLUDE = ["vitamiin", "sport", "spordi", "magneesium", "kookos", "infusion", "ekstrakt"];
const BAKING_WORDS = ["küpsetuspulber", "söögisooda", "želatiin", "paksendaja", "glasuur", "dekoratsioon", "nonparell", "toiduvärv", "vaniljekaun", "pärm", "vanillisuhkur", "vanilliinsuhkur", "tuhksuhkur", "kakaopulber"];
const CANNED_FRUIT_WORDS = ["ananass", "virsik", "pirn", "kompott", "aprikoos", "mango", "puuvilja", "kirss", "ploom", "litši", "mandariin", "püree"];
const ALCOHOL_FREE_PATTERN = /(?:alk(?:oh(?:oli)?)?|al)\.?\s*v(?:aba|\.)|alkovaba|0[,.]0\s*%|(?<![\p{L}])(?:zero|null)(?![\p{L}])/iu;
const NO_ALCOHOL_FREE = excludeWords([ALCOHOL_FREE_PATTERN]);
const CAKES_FILTER = excludeWords(["tain", "taig", "küpsis", "kreeker", "vahvl", "piparkoo", "präänik", "ettetellimisel"]);
const INSTANT_FILTER = excludeWords(
  ["puljong", /(?<![\p{L}])kaste(?![\p{L}])/u, /(?<![\p{L}])kastme(?![\p{L}])/u, /(?<![\p{L}])segu(?![\p{L}])/u, "idea", /(?<![\p{L}])fix(?![\p{L}])/u, "kissell", "puding", "pudding", "tarretis", "kakao", "maitseaine", "vorm", "konserv", "külmutatud"],
  [/nuudl/, /supp/, /pud(?:er|ru)/, /püree/, /kartuli/, /(?<![\p{L}])riis/u, /roog|road/, /pasta/, /makaron/],
);
const WORLD_FILTER = excludeWords(
  ["krõps", "krõp", "chips", "kaste", "kastme", "maitseaine", /(?<![\p{L}])segu(?![\p{L}])/u, "äädik", "matt", "pulgad", "pulk", "jahu", "sushiriis", /(?<![\p{L}])riis(?![\p{L}])/u, "supisegu", "supp", "kiir", "salsa", "dipp", /(?<![\p{L}])dip(?![\p{L}])/u, "külmutatud"],
  [/tortil/, /wrap/, /taco/, /nuudl/, /kookos(?:piim|kreem|jook|vesi)/, /karri\s*-?pasta|currypasta|curry\s*paste/, /riisipaber|riisileh/, /(?<![\p{L}])nori(?![\p{L}])/u, /wasabi/, /(?<![\p{L}])miso(?![\p{L}])/u, /kimchi/, /tofu/, /sushi/, /pad\s*thai/, /burrito/, /enchilada/, /fajita/],
);
const PASTA_NO_ASIAN = excludeWords(["thai", "riisinuudl", "klaasnuudl", "udon", "ramen", "soba", "aasia", "wok"]);
const LITTER_ONLY = excludeWords(["mänguasi", "kaisu", "kott", "hein", "saepuru", "graanul", "vitamiin", "snäk"], ["liiv"]);
const DESSERT_FILTER = excludeWords(["taimne", "taimse", "vegan", "kaerapõhine", "sojapõhine"]);
const CRISPBREAD_FILTER = excludeWords(["krutoon", "kuivik", "topsis", "leivake", "kaerakrõps"], ["näki", "galet", "vahvl", "crisp"]);
const FROZEN_FISH_FILTER = excludeWords(
  ["burger", "pihv", "kotlet", "frikadell", "pelmeen", "vareenik", "pitsa", "salat", "supp", "maks", "luud", "broiler", "kana", "sea", "veise"],
  [/kala|krevet|mereann|lõhe|lohe|forell|tursk|kilu|räim|heering|kalmaar|rannakarp|tuun|saida|ahven|siig|austr|seepia|hiid|pangaasius|tilaapia|karp/],
);
const FROZEN_DOUGH_FILTER = excludeWords(["pelmeen", "vareenik", "friikartul", "jäätis", "külmutatud pitsa", /^pitsa\b/]);
const DIAPER_EXCLUDE = excludeWords(["uju", "swim", "dry nites", "ninjamas", "öömähk", "oomahk", "rinnapad"]);
const DIAPER_WIPE_ONLY = excludeWords([], [/niis.*salv|salv.*niis/i]);
const CHEESE_FILTER = excludeWords(["näk", "pulgad", "laastud", "ribad", "tofu", "violife", "paprika"]);
const CURD_FILTER = excludeWords(["kreem", "pasta", "kohupiimap.", "vorm", "kinder", "kohoke", "kohuke", "dessert", "magustoit"], ["kohupiim", "kodujuust"]);
const MEAT_FILTER = excludeWords(["peekon", "eelküps", "frikadell", "vorst", ...MEAT_OFFAL, ...MEAT_GAME]);

// Coop's tree is coarse ("Piimatooted" is curd + cream + kefir +
// desserts in one bucket, "Kalatooted, mereannid" fresh + frozen), so
// most sources carry a name filter — the same word lists the Selver
// module uses for the same splits. Ids from the Store API's category
// list (2026-09-27). Not fetched anywhere: 1248 pre-order kitchen,
// 135 Eritooted (pharmacy, supplements, vegan/soy), 103 Valmistoit,
// 874 Kosmeetika, 865 Hooaja, 1096 Garderoob, 163's non-consumables.
const CATEGORIES = {
  "Baby formula": { sources: [{ id: 151, nameFilter: excludeWords(["puder"], ["piimasegu"]) }] },
  "Fruits & vegetables": { sources: [{ id: 80 }, { id: 79 }, { id: 81 }] },
  "Dairy": {
    sources: [
      { id: 95, nameFilter: excludeWords(["kondens", "hapupiim", "hapendatud", "keefir", "kakao", "šokolaadi", "maasika", "vanilli", "banaani", "karamelli", "piimajook", "maitsestatud", ...PLANT_WORDS, "kaera", "mandli", "riisi"], ["piim"]) },
      { id: 97, nameFilter: excludeWords(["jook", "joogijogurt", "kokteil", "smuuti", "mousse", "dessert", "magustoit", ...PLANT_WORDS, "kaera"]) },
      { id: 98 },
      { id: 99, nameFilter: excludeWords(["margariin", "taimne", "rasvasegu", "searasv", "hanerasv", "pardirasv", "vormiõli", "voimix", "vegan", /\bmäär/], ["või"]) },
    ],
  },
  "Bread": { sources: [{ id: 111 }, { id: 112, nameFilter: excludeWords(["kukkel", "kukli", "kuklid", "saiake", "saiakesed", "lavash", "lavašš"]) }] },
  "Drinks": {
    sources: [
      { id: 140, nameFilter: excludeWords(WATER_EXCLUDE) },
      { id: 143, nameFilter: excludeWords(["jook", "kontsentraat", "smuuti", "siirup"], ["mahl", "nektar"]) },
      { id: 141, nameFilter: excludeWords(["energia", "spordi", "jäätee", "vitamiin", "kohvijook"]) },
    ],
  },
  "Meat": {
    sources: [
      { id: 84, nameFilter: MEAT_FILTER },
      { id: 85, nameFilter: MEAT_FILTER },
      { id: 86, nameFilter: MEAT_FILTER },
      // "Grillvorstid ja -lihad": the marinated grill MEAT (no sausage word).
      { id: 87, nameFilter: excludeWords([...SAUSAGE_WORDS, "peekon", "eelküps", "frikadell", "šašlõkk", "šašlokk", ...MEAT_OFFAL]) },
    ],
  },
  "Pasta": { sources: [{ id: 796, nameFilter: PASTA_NO_ASIAN }] },
  "Rice & grains": { sources: [{ id: 120 }, { id: 797, nameFilter: excludeWords(["puder", "pudru", "helbe", "hernes", "herned", "oad", "lääts"]) }] },
  "Flour & sugar": { sources: [{ id: 122 }, { id: 118 }] },
  "Cooking oil": { sources: [{ id: 124, nameFilter: excludeWords(["äädik", "kaste"]) }] },
  "Cheese": { sources: [{ id: 102, nameFilter: CHEESE_FILTER }, { id: 101, nameFilter: CHEESE_FILTER }] },
  "Curd & cottage cheese": { sources: [{ id: 96, nameFilter: CURD_FILTER }] },
  "Cream & sour cream": { sources: [{ id: 96, nameFilter: excludeWords(["jogurt", "kohupiim", "kohuke", "taimne", "kaera", "soja"], ["koor"]) }] },
  "Kefir & buttermilk": { sources: [{ id: 96, nameFilter: excludeWords([], ["keefir", "kefiir", "hapupiim", "hapendatud", /\bpett\b/, "rjaženka", "rjazenka"]) }] },
  "Coffee": { sources: [{ id: 147, nameFilter: excludeWords(["matcha", "kakao", "kohvijook", "filter", "filtr"]) }] },
  "Tea & cocoa": { sources: [{ id: 148, nameFilter: excludeWords(["jäätee"]) }, { id: 149 }] },
  "Cereals & oats": {
    sources: [
      { id: 121, nameFilter: excludeWords(["batoon", "bat.", "ampstükk", "kamapallid", "balsnack", "corny", "maisikepikes", "tarretis", "kissel"]) },
      { id: 797, nameFilter: excludeWords([], ["puder", "pudru", "helbe"]) },
    ],
  },
  "Canned food": { sources: [{ id: 82, nameFilter: excludeWords(["pesto", "kaste", "bruschetta", "supp", ...CANNED_FRUIT_WORDS]) }] },
  "Sauces & condiments": {
    sources: [
      { id: 798, nameFilter: excludeWords(["šokolaadi hummus"]) },
      { id: 100 },
      { id: 123, nameFilter: excludeWords([], ["äädik"]) },
      { id: 795, nameFilter: excludeWords([], ["kaste", "salsa"]) },
    ],
  },
  "Spices": {
    sources: [
      { id: 123, nameFilter: excludeWords(["äädik", "suhkur", "siirup", "asendaja", "magusaine", "jahu", ...BAKING_WORDS, "mustikasupp", "kaste"]) },
      { id: 795, nameFilter: excludeWords(["kaste"], ["maitseainesegu"]) },
    ],
  },
  "Jam & honey & spreads": { sources: [{ id: 119 }, { id: 82, nameFilter: excludeWords([], CANNED_FRUIT_WORDS) }] },
  "Baking supplies": { sources: [{ id: 123, nameFilter: excludeWords(["maitsepärm"], BAKING_WORDS) }] },
  "Chocolate": { sources: [{ id: 129 }] },
  "Candy": { sources: [{ id: 127 }, { id: 128 }, { id: 130 }, { id: 134 }] },
  "Biscuits": { sources: [{ id: 131, nameFilter: excludeWords(["näkileiv", "näkileib", "küüslauguleiv", "pumpernik"]) }] },
  "Chips & snacks": { sources: [{ id: 132, nameFilter: excludeWords(["dipi", "dipp", "maitseainesegu"]) }] },
  "Nuts, seeds & dried fruit": { sources: [{ id: 133 }] },
  "Frozen vegetables & berries": { sources: [{ id: 74, nameFilter: excludeWords(FROZEN_POTATO_WORDS.concat(["supp", "supi", "smuuti"])) }] },
  "Ice cream": { sources: [{ id: 76, nameFilter: excludeWords(["jääkuubik"]) }] },
  "Dumplings, pizza & fries": {
    sources: [
      { id: 72, nameFilter: excludeWords([], ["pelmeen", "vareenik"]) },
      { id: 73, nameFilter: excludeWords([], ["pelmeen", "vareenik", "pitsa", "pizza"]) },
      { id: 74, nameFilter: excludeWords([], FROZEN_POTATO_WORDS) },
    ],
  },
  "Sausages": {
    sources: [
      { id: 88, nameFilter: excludeWords(PLANT_WORDS.concat(HAM_WORDS)) },
      { id: 87, nameFilter: excludeWords(PLANT_WORDS.concat(HAM_WORDS, ["eelküps"]), SAUSAGE_WORDS) },
    ],
  },
  "Ham & cold cuts": {
    sources: [
      { id: 89, nameFilter: excludeWords(PLANT_WORDS) },
      { id: 90, nameFilter: excludeWords(PLANT_WORDS.concat(["pihv", "lihapall", "kotlet", "frikadell", "burger"])) },
      { id: 92, nameFilter: excludeWords(PLANT_WORDS.concat(["supikogu"])) },
    ],
  },
  "Fish & seafood": { sources: [{ id: 91, nameFilter: excludeWords(PLANT_WORDS.concat(["külmutatud", "külm."])) }, { id: 93 }] },
  "Baby food": { sources: [{ id: 151, nameFilter: excludeWords(["piimasegu"]) }] },
  "Diapers & baby wipes": { sources: [{ id: 153, nameFilter: DIAPER_EXCLUDE }, { id: 152, nameFilter: DIAPER_WIPE_ONLY }] },
  "Personal care": {
    sources: [
      { id: 158 },
      { id: 161, nameFilter: excludeWords(["plaaster", "rasedustest", "kondoom", "libesti"]) },
      { id: 156, nameFilter: excludeWords(["värv", "kamm", "juuksehari"]) },
      { id: 160 },
      { id: 157, nameFilter: excludeWords(["svamm", "käsn"]) },
      { id: 159 },
      { id: 155, nameFilter: excludeWords(["näo", "silma", "päikese", "päevitus"], ["kehakreem", "ihupiim", "kätekreem", "kehalosjoon", "kehaõli", "jalakreem"]) },
    ],
  },
  "Household": {
    sources: [
      { id: 167 },
      { id: 850 },
      { id: 164 },
      { id: 165 },
      { id: 166, nameFilter: excludeWords(["hari", "harja", "lapp", "lapid", "svamm", "käsn", "kinnas", "kindad", "mopp", "ämber", "tolmukot", "rull"]) },
      { id: 168, nameFilter: excludeWords([], ["foolium", "küpsetuspaber", "toidukile", "kile", "prügikot"]) },
    ],
  },
  "Pet food": { sources: [{ id: 834 }, { id: 172 }, { id: 835 }, { id: 173, nameFilter: LITTER_ONLY }] },
  "Cakes & pastries": { sources: [{ id: 115, nameFilter: CAKES_FILTER }, { id: 114, nameFilter: CAKES_FILTER }] },
  "Instant food": { sources: [{ id: 109, nameFilter: INSTANT_FILTER }] },
  "World cuisine": { sources: [{ id: 795, nameFilter: WORLD_FILTER }] },
  "Alcohol-free beer, cider & wine": { sources: [{ id: 145, nameFilter: excludeWords([], [ALCOHOL_FREE_PATTERN]) }] },
  "Beer & cider": { sources: [1240, 1241, 1242, 1243, 1247].map((id) => ({ id, nameFilter: NO_ALCOHOL_FREE })) },
  "Wine": { sources: [1245, 1244, 1246].map((id) => ({ id, nameFilter: NO_ALCOHOL_FREE })) },
  "Spirits": { sources: [1234, 1260, 1235, 1236, 1239, 1237, 1233, 1238].map((id) => ({ id, nameFilter: NO_ALCOHOL_FREE })) },
  "Curd snacks & desserts": {
    sources: [
      { id: 96, nameFilter: excludeWords(["taimne", "vegan", "kaerapõhine", "pulber"], ["kohuke", "dessert", "puding", "kissell", "tarretis", "magustoit", "hõrgutis", "kreem"]) },
      { id: 657, nameFilter: DESSERT_FILTER },
      { id: 97, nameFilter: excludeWords(["taimne", "vegan"], ["dessert", "magustoit"]) },
    ],
  },
  "Milk drinks & drinking yoghurt": {
    sources: [
      { id: 97, nameFilter: excludeWords(["taimne", "kaera", "soja", "mandli", "smuuti"], ["jook", "joogijogurt"]) },
      { id: 95, nameFilter: excludeWords(["koor", /\bpett\b/, "keefir", "hapendatud", "kohvijook", "cappuccino", "latte", "taimne", "kaera", "soja", "mandli"], ["kondens", "kakao", "šokolaadi", "maasika", "vanilli", "banaani", "karamelli", "piimajook", "maitsestatud"]) },
      { id: 96, nameFilter: excludeWords(["taimne", "kaera", "soja"], ["piimajook", "jogurtijook", "joogijogurt"]) },
    ],
  },
  "Crispbreads": { sources: [{ id: 113, nameFilter: CRISPBREAD_FILTER }] },
  "Energy, sports & iced-tea drinks": { sources: [{ id: 142 }, { id: 141, nameFilter: excludeWords([], ["jäätee"]) }] },
  "Syrups & juice drinks": { sources: [{ id: 146 }, { id: 143, nameFilter: excludeWords(["smuuti"], ["jook"]) }] },
  "Frozen fish & seafood": { sources: [{ id: 72, nameFilter: FROZEN_FISH_FILTER }, { id: 91, nameFilter: excludeWords([], ["külmutatud", "külm."]) }] },
  "Frozen dough & pastries": { sources: [{ id: 75, nameFilter: FROZEN_DOUGH_FILTER }] },
  "Broths & stock": { sources: [{ id: 109, nameFilter: excludeWords(["supp"], ["puljong"]) }] },
};

// Every in-stock product of one Store API category, all pages.
async function fetchCategoryProducts(categoryId) {
  const items = [];
  let page = 1;
  let totalPages = 1;
  do {
    const { data, totalPages: pages } = await fetchJson(`${API_URL}?category=${categoryId}&per_page=${PER_PAGE}&page=${page}`);
    totalPages = pages;
    for (const product of Array.isArray(data) ? data : []) items.push(product);
    page++;
  } while (page <= totalPages);
  return items;
}

async function fetchCoopPrice(categoryName) {
  const config = CATEGORIES[categoryName];
  if (!config) throw new Error(`Coop: no category mapping for "${categoryName}"`);
  const seen = new Set();
  const items = [];
  for (const source of config.sources) {
    for (const product of await fetchCategoryProducts(source.id)) {
      if (product.is_in_stock === false || product.is_purchasable === false) continue;
      const item = mapItem(product);
      if (!item.name || item.price == null || !item.url) continue;
      if (source.nameFilter && !source.nameFilter(item.name)) continue;
      if (seen.has(item.url)) continue;
      seen.add(item.url);
      items.push(item);
    }
  }
  return items;
}

module.exports = { fetchCoopPrice, mapItem, CATEGORIES, API_URL };
