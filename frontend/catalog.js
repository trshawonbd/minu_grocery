// How the app DISPLAYS categories — the way an Estonian shopper
// expects them, in a natural shopping order, in Estonian — laid over
// the data categories in data/prices.json, which don't change. A
// display category can split one data category by product name
// (Fruits & vegetables -> Puuviljad / Köögiviljad, Dairy -> Piim ja
// jogurt / Või / Munad, Household -> four aisles) or merge several
// (Coffee + Tea & cocoa -> Kohv ja tee). Icons are our own simple
// line drawings (see ICON_PATHS), never another app's artwork.
// Pure: no DOM; the page builds the SVG from ICON_PATHS.

// Estonian words that make a Fruits & vegetables item a fruit/berry.
// Checked AFTER the vegetable overrides: "kirsstomat" (cherry tomato)
// and "vaarikatomat" contain a fruit word but are tomatoes.
const FRUIT_WORDS = [
  "õun", "banaan", "apelsin", "mandariin", "klementiin", "pirn", "viinamari", "kiivi", "sidrun", "laim",
  "mango", "ananass", "arbuus", "melon", "ploom", "virsik", "nektariin", "greip", "granaatõun", "pomel",
  "papaia", "dattel", "maasik", "mustik", "vaarik", "sõstar", "kirs", "jõhvik", "murak", "kookos",
  "avokaado", "hurmaa", "aprikoos", "füüsal", "liitsi", "feijoa",
];
const VEGETABLE_OVERRIDES = ["tomat", "kurk", "kapsas", "peet", "hapukapsas"];

const DAIRY_EGG_WORDS = ["muna"];
// "või" as a whole word (or the end of "taluvõi"/"meierivõi"), never
// the start of another word such as "võib" or "võid".
const BUTTER_PATTERN = /(?<![\p{L}])(?:\p{L}*või|ghee)(?![\p{L}])/iu;

const HOUSEHOLD_PAPER_WORDS = ["tualettpaber", "majapidamispaber", "salvrätik", "taskurätik", "paberrätik", "käterätik", "wc-paber", "wc paber"];
const HOUSEHOLD_DISH_WORDS = ["nõudepes", "nõudep.", "loputusvahend", "nõudepesumasina"];
const HOUSEHOLD_LAUNDRY_WORDS = ["pesupulber", "pesugeel", "pesukapsl", "pesuloputus", "pesumasina", "plekieemald", "veepehmend", "pesuvahend", "pesuvedelik", "pesutablet", "pesulehed", "valgendaja"];

const SPLIT_RULES = {
  fruit: (name) => !hasAny(name, VEGETABLE_OVERRIDES) && hasAny(name, FRUIT_WORDS),
  vegetable: (name) => hasAny(name, VEGETABLE_OVERRIDES) || !hasAny(name, FRUIT_WORDS),
  eggs: (name) => hasAny(name, DAIRY_EGG_WORDS),
  butter: (name) => !hasAny(name, DAIRY_EGG_WORDS) && BUTTER_PATTERN.test(String(name || "")),
  milk: (name) => !hasAny(name, DAIRY_EGG_WORDS) && !BUTTER_PATTERN.test(String(name || "")),
  paper: (name) => hasAny(name, HOUSEHOLD_PAPER_WORDS),
  dish: (name) => !hasAny(name, HOUSEHOLD_PAPER_WORDS) && hasAny(name, HOUSEHOLD_DISH_WORDS),
  laundry: (name) => !hasAny(name, HOUSEHOLD_PAPER_WORDS) && !hasAny(name, HOUSEHOLD_DISH_WORDS) && hasAny(name, HOUSEHOLD_LAUNDRY_WORDS),
  cleaning: (name) => !hasAny(name, HOUSEHOLD_PAPER_WORDS) && !hasAny(name, HOUSEHOLD_DISH_WORDS) && !hasAny(name, HOUSEHOLD_LAUNDRY_WORDS),
};

function hasAny(name, words) {
  const lower = String(name || "").toLowerCase();
  return words.some((w) => lower.includes(w));
}

// Shopping order: fresh food first, then chilled, meat & fish, bread,
// breakfast & dry goods, sweets & snacks, frozen, drinks, children,
// then non-food. `sources` are data categories; `split` names a rule
// above; `icon` names an entry of ICON_PATHS.
const DISPLAY_CATEGORIES = [
  { id: "puuviljad", sources: ["Fruits & vegetables"], split: "fruit", icon: "apple", name: { et: "Puuviljad", en: "Fruit", ru: "Фрукты" } },
  { id: "koogiviljad", sources: ["Fruits & vegetables"], split: "vegetable", icon: "carrot", name: { et: "Köögiviljad", en: "Vegetables", ru: "Овощи" } },
  { id: "piim-ja-jogurt", sources: ["Dairy"], split: "milk", icon: "bottle", name: { et: "Piim ja jogurt", en: "Milk & yoghurt", ru: "Молоко и йогурт" } },
  { id: "voi", sources: ["Dairy"], split: "butter", icon: "butter", name: { et: "Või", en: "Butter", ru: "Масло" } },
  { id: "munad", sources: ["Dairy"], split: "eggs", icon: "egg", name: { et: "Munad", en: "Eggs", ru: "Яйца" } },
  { id: "juustud", sources: ["Cheese"], icon: "cheese", name: { et: "Juustud", en: "Cheese", ru: "Сыры" } },
  { id: "kohupiim", sources: ["Curd & cottage cheese"], icon: "bowl", name: { et: "Kohupiim", en: "Curd & cottage cheese", ru: "Творог" } },
  { id: "koor", sources: ["Cream & sour cream"], icon: "bottle", name: { et: "Koor ja hapukoor", en: "Cream & sour cream", ru: "Сливки и сметана" } },
  { id: "keefir", sources: ["Kefir & buttermilk"], icon: "bottle", name: { et: "Keefir ja pett", en: "Kefir & buttermilk", ru: "Кефир и пахта" } },
  { id: "liha", sources: ["Meat"], icon: "meat", name: { et: "Liha", en: "Meat", ru: "Мясо" } },
  { id: "vorstid", sources: ["Sausages"], icon: "sausage", name: { et: "Vorstid", en: "Sausages", ru: "Колбасы и сосиски" } },
  { id: "lihatooted", sources: ["Ham & cold cuts"], icon: "meat", name: { et: "Lihatooted", en: "Ham & cold cuts", ru: "Мясные изделия" } },
  { id: "kala", sources: ["Fish & seafood"], icon: "fish", name: { et: "Kala", en: "Fish & seafood", ru: "Рыба" } },
  { id: "leib-ja-sai", sources: ["Bread"], icon: "bread", name: { et: "Leib ja sai", en: "Bread", ru: "Хлеб" } },
  { id: "koogid", sources: ["Cakes & pastries"], icon: "cake", name: { et: "Koogid ja saiakesed", en: "Cakes & pastries", ru: "Торты и выпечка" } },
  { id: "hommikusook", sources: ["Cereals & oats"], icon: "bowl", name: { et: "Hommikusöök", en: "Breakfast cereals", ru: "Завтраки" } },
  { id: "riis-ja-teraviljad", sources: ["Rice & grains"], icon: "grain", name: { et: "Riis ja teraviljad", en: "Rice & grains", ru: "Рис и крупы" } },
  { id: "pasta", sources: ["Pasta"], icon: "pasta", name: { et: "Pasta", en: "Pasta", ru: "Макароны" } },
  { id: "kiirtoit", sources: ["Instant food"], icon: "noodles", name: { et: "Kiirtoit", en: "Instant food", ru: "Быстрое питание" } },
  { id: "jahu-ja-suhkur", sources: ["Flour & sugar"], icon: "bag", name: { et: "Jahu ja suhkur", en: "Flour & sugar", ru: "Мука и сахар" } },
  { id: "kupsetamine", sources: ["Baking supplies"], icon: "cupcake", name: { et: "Küpsetamine", en: "Baking", ru: "Выпечка" } },
  { id: "hoidised", sources: ["Canned food"], icon: "can", name: { et: "Hoidised", en: "Canned & preserved", ru: "Консервы" } },
  { id: "kastmed", sources: ["Sauces & condiments"], icon: "bottle", name: { et: "Kastmed", en: "Sauces", ru: "Соусы" } },
  { id: "maailma-kook", sources: ["World cuisine"], icon: "globe", name: { et: "Maailma köök", en: "World cuisine", ru: "Кухни мира" } },
  { id: "olid", sources: ["Cooking oil"], icon: "bottle", name: { et: "Õlid", en: "Cooking oil", ru: "Масла" } },
  { id: "maitseained", sources: ["Spices"], icon: "spoon", name: { et: "Maitseained", en: "Spices", ru: "Специи" } },
  { id: "moosid-ja-maarded", sources: ["Jam & honey & spreads"], icon: "jar", name: { et: "Moosid ja määrded", en: "Jam, honey & spreads", ru: "Джемы и пасты" } },
  { id: "sokolaad", sources: ["Chocolate"], icon: "chocolate", name: { et: "Šokolaad", en: "Chocolate", ru: "Шоколад" } },
  { id: "maiustused", sources: ["Candy"], icon: "candy", name: { et: "Maiustused", en: "Candy", ru: "Сладости" } },
  { id: "kupsised", sources: ["Biscuits"], icon: "cookie", name: { et: "Küpsised", en: "Biscuits", ru: "Печенье" } },
  { id: "snakid", sources: ["Chips & snacks"], icon: "bag", name: { et: "Snäkid", en: "Chips & snacks", ru: "Снеки" } },
  { id: "pahklid", sources: ["Nuts, seeds & dried fruit"], icon: "nut", name: { et: "Pähklid ja kuivatatud puuviljad", en: "Nuts, seeds & dried fruit", ru: "Орехи и сухофрукты" } },
  { id: "kulmutatud-toit", sources: ["Frozen vegetables & berries"], icon: "snowflake", name: { et: "Külmutatud toit", en: "Frozen food", ru: "Замороженные продукты" } },
  { id: "pelmeenid-ja-pitsa", sources: ["Dumplings, pizza & fries"], icon: "pizza", name: { et: "Pelmeenid ja pitsa", en: "Dumplings, pizza & fries", ru: "Пельмени и пицца" } },
  { id: "jaatis", sources: ["Ice cream"], icon: "icecream", name: { et: "Jäätis", en: "Ice cream", ru: "Мороженое" } },
  { id: "kohv-ja-tee", sources: ["Coffee", "Tea & cocoa"], icon: "cup", name: { et: "Kohv ja tee", en: "Coffee & tea", ru: "Кофе и чай" } },
  { id: "mahlad-ja-joogid", sources: ["Drinks"], icon: "cup", name: { et: "Mahlad ja joogid", en: "Juices & drinks", ru: "Соки и напитки" } },
  { id: "alkoholivaba", sources: ["Alcohol-free beer, cider & wine"], icon: "beer", name: { et: "Alkoholivaba õlu ja vein", en: "Alcohol-free beer & wine", ru: "Безалкогольное пиво и вино" } },
  // Alcohol — private testing only; hidden entirely when SHOW_ALCOHOL
  // (frontend/app-logic.js) is false, because visibleProducts() then
  // returns no product of these data categories and a tile with no
  // products is never drawn.
  { id: "olu-ja-siider", sources: ["Beer & cider"], icon: "beer", alcohol: true, name: { et: "Õlu ja siider", en: "Beer & cider", ru: "Пиво и сидр" } },
  { id: "vein", sources: ["Wine"], icon: "wine", alcohol: true, name: { et: "Vein", en: "Wine", ru: "Вино" } },
  { id: "kange-alkohol", sources: ["Spirits"], icon: "glass", alcohol: true, name: { et: "Kange alkohol", en: "Spirits", ru: "Крепкий алкоголь" } },
  { id: "lapsed", sources: ["Baby formula", "Baby food", "Diapers & baby wipes"], icon: "baby", name: { et: "Lapsed", en: "Baby & children", ru: "Дети" } },
  { id: "hugieen", sources: ["Personal care"], icon: "drop", name: { et: "Hügieen", en: "Personal care", ru: "Гигиена" } },
  { id: "noudepesu", sources: ["Household"], split: "dish", icon: "spray", name: { et: "Nõudepesu", en: "Dishwashing", ru: "Для посуды" } },
  { id: "pesuvahendid", sources: ["Household"], split: "laundry", icon: "spray", name: { et: "Pesuvahendid", en: "Laundry", ru: "Для стирки" } },
  { id: "puhastusvahendid", sources: ["Household"], split: "cleaning", icon: "spray", name: { et: "Puhastusvahendid", en: "Cleaning", ru: "Для уборки" } },
  { id: "paberitooted", sources: ["Household"], split: "paper", icon: "paper", name: { et: "Paberitooted", en: "Paper products", ru: "Бумажные изделия" } },
  { id: "lemmikloomad", sources: ["Pet food"], icon: "paw", name: { et: "Lemmikloomad", en: "Pet food", ru: "Для питомцев" } },
];

// Our own simple line icons: each is one or more SVG path `d`
// strings on a 24×24 grid, drawn as strokes. Deliberately plain.
const ICON_PATHS = {
  apple: ["M12 7c-3-3-8-1-8 5 0 5 3 9 6 9 1 0 2-1 2-1s1 1 2 1c3 0 6-4 6-9 0-6-5-8-8-5z", "M12 7c0-2 1-4 3-4"],
  carrot: ["M14 10l-9 9 1 1 9-9", "M14 10c3-3 6-2 7-4-2-1-5 0-7 4z", "M14 10c-1-3 0-6 2-7"],
  bottle: ["M10 3h4v3l2 3v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3V3z"],
  butter: ["M4 10h13l3 3v6H7l-3-3v-6z", "M4 10l3 3h13", "M7 13v6"],
  egg: ["M12 3c-4 0-7 6-7 11a7 7 0 0 0 14 0c0-5-3-11-7-11z"],
  cheese: ["M3 10l18-4v12H3z", "M3 10l18-4", "M9 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"],
  bowl: ["M3 11h18a9 9 0 0 1-18 0z", "M8 11V6M12 11V4M16 11V7"],
  meat: ["M6 15a6 6 0 0 1 6-9c4 0 7 2 7 5 0 5-6 8-10 8-2 0-3-2-3-4z", "M5 19l2-2"],
  sausage: ["M4 16c0-6 5-11 12-11 3 0 4 2 4 4 0 6-5 11-12 11-3 0-4-2-4-4z"],
  fish: ["M3 12c4-5 9-6 14-3l4 3-4 3c-5 3-10 2-14-3z", "M17 9l3-4v14l-3-4", "M8 12h1"],
  bread: ["M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7H4v-7z", "M4 12c2 0 3 2 3 2v5"],
  grain: ["M12 21V9", "M12 9c-3 0-5-2-5-5 3 0 5 2 5 5zM12 9c3 0 5-2 5-5-3 0-5 2-5 5zM12 15c-3 0-5-2-5-5 3 0 5 2 5 5zM12 15c3 0 5-2 5-5-3 0-5 2-5 5z"],
  pasta: ["M4 10h16", "M5 10c0 6 3 9 7 9s7-3 7-9", "M8 10V5M12 10V4M16 10V5"],
  bag: ["M6 8h12l1 12H5L6 8z", "M9 8V6a3 3 0 0 1 6 0v2"],
  cupcake: ["M5 11h14l-2 9H7l-2-9z", "M5 11a7 7 0 0 1 14 0", "M12 4v2"],
  can: ["M6 6a6 2 0 0 1 12 0v12a6 2 0 0 1-12 0V6z", "M6 6a6 2 0 0 0 12 0"],
  spoon: ["M12 3a4 4 0 0 1 4 4c0 3-2 5-4 5s-4-2-4-5a4 4 0 0 1 4-4z", "M12 12v9"],
  jar: ["M7 8h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8z", "M8 5h8v3H8z"],
  chocolate: ["M5 4h14v16H5z", "M5 12h14M12 4v16"],
  candy: ["M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z", "M8 10L3 7v10l5-3M16 10l5-3v10l-5-3"],
  cookie: ["M12 3a9 9 0 1 0 9 9c-2 0-3-1-3-3-2 0-3-1-3-3 0-1 0-2-3-3z", "M9 9h1M14 14h1M9 15h1"],
  nut: ["M12 21c-4-3-7-6-7-10a7 7 0 0 1 14 0c0 4-3 7-7 10z", "M8 9h8"],
  snowflake: ["M12 3v18M3 12h18M6 6l12 12M18 6L6 18"],
  pizza: ["M12 3l9 16H3L12 3z", "M12 3c4 0 7 2 9 4M8 14h1M13 12h1M11 17h1"],
  icecream: ["M12 21l-5-8h10l-5 8z", "M7 13a5 5 0 0 1 10 0", "M9 9a3 3 0 0 1 6 0"],
  cup: ["M5 8h11v7a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z", "M16 10h2a2 2 0 0 1 0 4h-2", "M8 3v2M12 3v2"],
  baby: ["M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "M9 12h1M14 12h1", "M9 15c1 1 2 1 3 1s2 0 3-1", "M12 5V3"],
  drop: ["M12 3c-3 5-7 8-7 12a7 7 0 0 0 14 0c0-4-4-7-7-12z"],
  spray: ["M9 9h6l1 12H8L9 9z", "M12 9V5h4", "M16 5l3-2"],
  paper: ["M6 3h9l4 4v14H6V3z", "M15 3v4h4", "M9 12h6M9 16h6"],
  paw: ["M12 13c-3 0-5 2-5 4s2 3 5 3 5-1 5-3-2-4-5-4z", "M7 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM14 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  cart: ["M3 4h2l2 11h11l2-7H7", "M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"],
  cake: ["M4 13h16v7H4z", "M4 13a3 2 0 0 1 4 0 3 2 0 0 0 4 0 3 2 0 0 0 4 0 3 2 0 0 1 4 0", "M12 9V6", "M11 4c0-1 1-1 1-2 0 1 1 1 1 2a1 1 0 0 1-2 0z"],
  noodles: ["M4 11h16a8 8 0 0 1-16 0z", "M5 11l2-8M9 11l2-8", "M7 19h10"],
  globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M3 12h18", "M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"],
  beer: ["M6 6h9v14H6z", "M15 9h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2", "M6 6a2 2 0 0 1 2-3h5a2 2 0 0 1 2 3", "M9 10v7M12 10v7"],
  wine: ["M8 3h8l1 6a5 5 0 0 1-10 0l1-6z", "M12 14v6", "M9 20h6"],
  glass: ["M7 3h10l-1 9a4 4 0 0 1-8 0L7 3z", "M12 16v4", "M9 20h6", "M8 7h8"],
};

function displayCategoryById(id) {
  return DISPLAY_CATEGORIES.find((c) => c.id === id) || null;
}

// The display category a product belongs to — the first whose sources
// include its data category and whose split rule (if any) accepts its
// name. Every product lands somewhere: a split's rules are exhaustive
// (the last rule of each split is the complement of the others), and
// a data category no display category names falls back to a generic
// "Muu" tile so nothing silently disappears.
const FALLBACK_CATEGORY = { id: "muu", sources: [], icon: "cart", name: { et: "Muu", en: "Other", ru: "Прочее" } };

function displayCategoryFor(product) {
  for (const category of DISPLAY_CATEGORIES) {
    if (!category.sources.includes(product.category)) continue;
    if (!category.split || SPLIT_RULES[category.split](product.name)) return category;
  }
  return FALLBACK_CATEGORY;
}

function productsInDisplayCategory(products, id) {
  return products.filter((p) => displayCategoryFor(p).id === id);
}

// Display categories in shopping order with a live product count
// (only those that have products), plus the fallback if needed.
function displayCategoriesWithCounts(products) {
  const counts = new Map();
  for (const p of products) {
    const id = displayCategoryFor(p).id;
    counts.set(id, (counts.get(id) || 0) + 1);
  }
  const list = DISPLAY_CATEGORIES.filter((c) => counts.has(c.id)).map((c) => ({ category: c, count: counts.get(c.id) }));
  if (counts.has(FALLBACK_CATEGORY.id)) list.push({ category: FALLBACK_CATEGORY, count: counts.get(FALLBACK_CATEGORY.id) });
  return list;
}

function categoryName(category, lang) {
  return category.name[lang] || category.name.en || category.name.et;
}

if (typeof module !== "undefined") {
  module.exports = { DISPLAY_CATEGORIES, ICON_PATHS, FALLBACK_CATEGORY, SPLIT_RULES, displayCategoryById, displayCategoryFor, productsInDisplayCategory, displayCategoriesWithCounts, categoryName };
}
