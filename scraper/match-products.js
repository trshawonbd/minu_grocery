// Decides whether two raw scraped items (from any two stores) are
// the same product, without any hand-typed per-product list.
//
// Rule: if both items have an EAN, that decides it. Otherwise there
// are two paths:
// - Branded products (most things): pull a brand, size, and
//   stage/variant out of each raw name and only call it a match if
//   all three agree — and never match if only one side has a
//   variant.
// - Produce with no real brand (most loose fruit and vegetables):
//   pull a type, unit, and variety out of each raw name instead, and
//   apply the same "all must agree, variant presence must match"
//   rule to those.
//
// These are simple heuristics on purpose. They will still get some
// real products wrong — that's what data/products.json (force a
// match) and data/known-different.json (force a non-match) are for.
// Fix the heuristic itself first; only reach for those lists once a
// case genuinely needs a person's call.

// "A/B" weight — total/drained (e.g. "500g/300g", or "400/200g" where
// only the second number states a unit). Always resolves to the
// first number, with the unit inferred from whichever side actually
// states one — so the same real pack size doesn't extract
// inconsistently depending on which of the two numbers happens to
// carry the "g". Checked before SIZE_PATTERNS, which would otherwise
// match "500g" out of "500g/300g" by coincidence (the first pattern
// found) but "200g" out of "400/200g" (the only one with a unit) —
// two different rules picking different sides of the same format.
const SPLIT_WEIGHT_PATTERN = /(\d+(?:[.,]\d+)?)\s*\/\s*\d+(?:[.,]\d+)?\s*(kg|g|ml|l)\b/i;

const SIZE_PATTERNS = [
  // multipack, e.g. "2x200ml"
  /\d+(?:[.,]\d+)?\s*x\s*\d+(?:[.,]\d+)?\s*(?:kg|g|ml|l)\b/i,
  // e.g. "10-pack"
  /\d+(?:[.,]\d+)?\s*-?\s*pack\b/i,
  // simple size, e.g. "800g", "1L", "0,5l"
  /\d+(?:[.,]\d+)?\s*(?:kg|g|ml|l)\b/i,
];

// Words that are the first capitalized word in plenty of raw names
// but aren't a real brand — either because they describe the
// category ("piimasegu"/"eripiimasegu" — formula/special formula in
// Estonian), or because they're a generic descriptor that happens to
// be capitalized ("Eesti" — Estonian, i.e. country of origin, as in
// "Mahe pohl Eesti 250g"). "And" is skipped for the same reason as
// "Eesti", not on its own merits — it's the second word of "Eesti
// And", a packer name on Rimi's preserved-vegetable listings (e.g.
// "Marineeritud šampinjonid Eesti And 500g/300g"); skipping "Eesti"
// alone would just leave "And" behind as the next fallback word.
// English "and" otherwise never appears in this Estonian-language
// data, so this is safe to skip outright rather than needing a
// two-word phrase match.
//
// The colour words (kept as plain strings here, not a reference to
// PRODUCE_COLORS below, since that's defined later in the file) are
// here for the same reason as "Eesti": a leading, capitalized colour
// on a not-yet-whitelisted produce word (e.g. "Punane sõstar" — red
// currant, "sõstar" isn't a recognized type) would otherwise be
// picked up as a pseudo-brand — and two completely different
// products that both happen to be red would then look like the same
// "brand". Colour agreement is separately enforced by qualifiers
// (see IDENTITY_QUALIFIER_PATTERNS) once a real brand is found, so
// skipping them here doesn't lose that check.
const CATEGORY_WORDS = new Set([
  "piimasegu", "eripiimasegu", "eesti", "and",
  "punane", "sinine", "kollane", "roheline", "valge", "must", "oranž",
]);

// Named product variants that aren't a stage number — checked before
// falling back to a numeric stage. "lv" is Rimi's own abbreviation
// for "laktoosivaba" (lactose-free), taken straight from the raw
// product name text.
const NAMED_VARIANTS = [
  { pattern: /\bcomf(?:ort)?\b/i, token: "comfort" },
  { pattern: /\b(?:lv|laktoosivaba)\b/i, token: "lactose-free" },
];

// Marks a genuinely different product or listing, wherever it shows
// up in the name — checked the same way regardless of which path
// (produce or brand) the rest of the comparison takes, since e.g. a
// "with garlic" version isn't the same listing as a plain one no
// matter how the rest of the name classifies. Unlike NON_IDENTITY_
// PATTERN, these are never stripped away — their presence (or
// absence, or disagreement) is the point.
// - "mahe" (organic): stripped from NON_IDENTITY_PATTERN for type
//   detection, but tracked here — organic and non-organic are
//   genuinely different products, not just a differently-worded
//   listing of the same one.
// - An explicit grade of 2 or higher ("2kl", "3.kl.", ...) — grade 1
//   is the common, often-omitted default (see QUALITY_GRADE_PATTERN)
//   so it stays silent; a store that bothers to say "grade 2" is
//   flagging a real, lower-quality batch.
// - Any word in the comitative case ("-ga" — Estonian "with X", e.g.
//   "küüslauguga" = with garlic, "tilliga" = with dill): a flavoured
//   or mixed-in version is a different product from a plain one.
const IDENTITY_QUALIFIER_PATTERNS = [
  { pattern: /\bmahe\b/i, extract: () => "mahe" },
  { pattern: /\b([2-9])\.?\s*kl\.?\b/i, extract: (m) => `${m[1]}kl` },
  { pattern: /\b\p{L}{2,}ga\b/giu, extract: (m) => m[0].toLowerCase(), all: true },
];

// Every colour word in a name, as one sorted string ("" when none) —
// only consulted on the known-brand path (see sameProduct), where the
// produce path's variety check doesn't run: a brand sells the same
// vegetable in more than one colour at one pack size (Laheotsa
// yellow vs red 2kg), so brand+size+type agreeing isn't enough.
function extractColors(name) {
  return PRODUCE_COLORS.filter(({ pattern }) => pattern.test(name))
    .map(({ token }) => token)
    .sort()
    .join(" ");
}

function extractQualifiers(name) {
  const found = new Set();
  for (const { pattern, extract, all } of IDENTITY_QUALIFIER_PATTERNS) {
    if (all) {
      for (const m of name.matchAll(pattern)) found.add(extract(m));
    } else {
      const m = name.match(pattern);
      if (m) found.add(extract(m));
    }
  }
  return [...found].sort().join(" ");
}

// "1kl" (also seen as "1 kl.", "1kl.", "1.kl.") is Barbora and
// Rimi's shorthand for "1. klass" — a produce quality grade, not
// part of the product's identity. Stripped before any extraction
// runs.
const QUALITY_GRADE_PATTERN = /\b1\.?\s*kl\.?\b/gi;

// Cooking/processing descriptors and qualifiers that lead a produce
// name but aren't the product's identity, the same way "1kl" isn't —
// e.g. "Aurutatud punapeet" (steamed beetroot) should extract as
// type "punapeet", never "aurutatud"; "Mahe šampinjonid" (organic
// mushrooms) should extract as "šampinjonid", never "mahe".
// Stripped everywhere the quality grade is.
const NON_IDENTITY_PATTERN = /\b(aurutatud|keedetud|mahe|marineeritud)\b/gi;

// Color words, checked the same way NAMED_VARIANTS checks for named
// brand variants — a color found on one side and not the other, or a
// different color on each side, is treated as a variant mismatch
// (e.g. a yellow pepper isn't the same listing as a red one).
const PRODUCE_COLORS = [
  { pattern: /\bpunane\b/i, token: "punane" },
  { pattern: /\bsinine\b/i, token: "sinine" },
  { pattern: /\bkollane\b/i, token: "kollane" },
  { pattern: /\broheline\b/i, token: "roheline" },
  { pattern: /\bvalge\b/i, token: "valge" },
  { pattern: /\bmust\b/i, token: "must" },
  { pattern: /\boranž\b/i, token: "oranž" },
  // "hele"/"tume" (light/dark) aren't a named colour but function the
  // same way here — a real gap found by hand: "Ploom tume, kg" (dark
  // plum) and "Ploom hele kg" (light plum) had nothing distinguishing
  // them, so both were valid candidates for the same Rimi listing.
  { pattern: /\bhele\b/i, token: "hele" },
  { pattern: /\btume\b/i, token: "tume" },
];

// Other qualifiers checked the same way colors are — present on one
// side and not the other, or disagreeing, blocks the match (e.g.
// dried bananas aren't the same listing as fresh ones).
const PRODUCE_QUALIFIERS = [
  ...PRODUCE_COLORS,
  { pattern: /\bkuivatatud\b/i, token: "kuivatatud" },
  // Pack format, not origin or variety — "in a net" (a multi-kg mesh
  // bag) is a genuinely different listing from the same produce sold
  // loose, even at the same per-kg unit (e.g. "Sibul kg" loose vs
  // "Sibul võrgus kg" netted — different prices, different pack).
  { pattern: /\bvõrgus\b/i, token: "võrgus" },
];

// Despite the name, strips both the quality grade and any
// non-identity descriptor (currently just "aurutatud") — kept as one
// function since every call site needs both stripped the same way.
function stripQualityGrade(name) {
  return name.replace(QUALITY_GRADE_PATTERN, "").replace(NON_IDENTITY_PATTERN, "");
}

// Loose fruit and vegetables are sold under a generic type name with
// no real brand ("Tomat 1kl, kg"), so brand/size/variant matching
// doesn't apply to them. There's no reliable way to tell "no real
// brand" apart from "brand happens to be capitalized" in general, so
// this is a small, explicit whitelist of known type words instead —
// extend it as more produce categories get scraped. Anything not in
// this list keeps going through the brand path unchanged (e.g.
// "Mustikad Rimi 400g" — "Rimi" there is a genuine brand).
const PRODUCE_TYPES = new Set([
  "tomat", "tomatid",
  "banaan", "banaanid",
  "kartul", "kartulid",
  "õun", "õunad",
  "sibul", "sibulad",
  "kurk", "kurgid",
  "porgand", "porgandid",
  "paprika", "paprikad",
  "kapsas", "kapsad",
  "viinamari", "viinamarjad",
  "ploom", "ploomid",
  "virsik", "virsikud",
  "sidrun", "sidrunid",
  "laim", "laimid",
  "kiivi", "kiivid",
  "küüslauk", "küüslaugud",
  "bataat", "bataadid",
  "avokaado", "avokaadod",
  "spinat", "spinatid",
  "salat", "salatid",
  "mango", "mangod",
  "ananass", "ananassid",
  "tšillipipar", "tšillipiprad",
  "kirsstomat", "kirsstomatid",
  "redis", "redised",
  "spargel", "sparglid",
  "pirn", "pirnid",
  "peet", "peedid",
  "till", "tillid",
  "basiilik", "basiilikud",
  "hapukapsas", "hapukapsad",
  "šampinjon", "šampinjonid",
  "arbuus", "arbuusid",
  "petersell", "petersellid",
  "apelsin", "apelsinid",
  "hapukurk", "hapukurgid",
  "koriander", "korianderid",
  "tüümian", "tüümianid",
  "lillkapsas", "lillkapsad",
  "piparmünt", "piparmündid",
  "mustikad",
  "kaalikas", "kaalikad",
  "juurseller", "juursellerid",
  "peakapsas", "peakapsad",
  "baklažaan", "baklažaanid",
  "nuikapsas", "nuikapsad",
  "kõrvits", "kõrvitsad",
  "granaatõun", "granaatõunad",
  "pomel", "pomelid",
  "papaia", "papaiad",
  "vaarikatomat", "vaarikatomatid",
  "murulauk", "murulaugud",
  "sidrunmeliss", "sidrunmelissid",
  "salatisibul", "salatisibulad",
]);

// Real Estonian words that can follow a produce type's genitive form
// to name a specific product — "kartuli" (potato's) + "viilud"
// (slices) = "kartuliviilud" (potato slices). A word is only treated
// as a compound of a known type when what's left over after removing
// the type is one of these, not just any leftover letters. Without
// this, "salatisibul" (spring onion — a different vegetable, whose
// name happens to start with "salat") would wrongly type as "salat"
// (lettuce): its leftover, "isibul"/"sibul", isn't a recognized
// suffix here, so it's correctly rejected. Extend this list as more
// real compounds turn up.
const COMPOUND_SUFFIXES = new Set(["viilud"]);

function isRecognizedCompoundSuffix(leftover) {
  if (COMPOUND_SUFFIXES.has(leftover)) return true;
  // Compounds often link the parts with a genitive "-i" ("kartul" ->
  // "kartuli" + "viilud"); allow for that linking vowel too.
  return leftover.startsWith("i") && COMPOUND_SUFFIXES.has(leftover.slice(1));
}

// Real brand names seen in produce listings, where the generic type
// word ("Vaarikad", "Mustikad") isn't the actual brand — e.g.
// "Vaarikad WELL DONE" and "Vaarikad Rimi" are different suppliers'
// raspberries, not the same listing. If a recognized brand shows up
// on both sides of a comparison, that comparison goes through the
// brand path instead of the produce path — same type/unit isn't
// enough, the brands (and variant) have to agree too. Extend this as
// more brands turn up in scraped data.
const KNOWN_BRANDS = [
  // Listed before anything that would otherwise swallow "Eesti":
  // extractBrand checks this list first, so the full phrase wins
  // before "Eesti" gets skipped as a CATEGORY_WORD. It's a real
  // producer — Rimi carries it in their own brand filter — not the
  // country word plus a leftover.
  "Eesti And",
  "Rimi Eco",
  "Selection By Rimi",
  "Rimi",
  "Kadarbiku",
  "Intsu",
  "Võiste Aiand",
  "WELL DONE",
  "Laheotsa",
  "Bimi",
  "Tasty Home",
  "Peipsi",
  "Dimdini",
  "Dongwon",
];

const KNOWN_BRAND_PATTERNS = KNOWN_BRANDS.map(
  (brand) => new RegExp(`\\b${brand.replace(/\s+/g, "\\s+")}\\b`, "i")
);

function hasKnownBrand(name) {
  return KNOWN_BRAND_PATTERNS.some((pattern) => pattern.test(name));
}

function firstWord(name) {
  const match = name.match(/\p{L}+/u);
  return match ? match[0] : null;
}

// Scans every letter-run in the (cleaned) name in order, and returns
// the known type it belongs to — either an exact match ("peet"), or
// a word that starts with a known type's stem AND leaves a
// recognized compound suffix behind ("kartuliviilud" links to
// "kartul", the same way plurals already do — see
// isRecognizedCompoundSuffix for why "salatisibul" doesn't link to
// "salat"). Checking every word rather than just the first one is
// what lets an abbreviated compound like "riiv.peet" (the period
// splits it into two words) still find "peet" as its second word.
// Returns null if nothing in the name matches any known type.
function matchProduceType(name) {
  for (const match of stripQualityGrade(name).matchAll(/\p{L}+/gu)) {
    const word = match[0].toLowerCase();
    if (PRODUCE_TYPES.has(word)) {
      return word;
    }
    for (const type of PRODUCE_TYPES) {
      if (word.startsWith(type) && isRecognizedCompoundSuffix(word.slice(type.length))) {
        return type;
      }
    }
  }
  return null;
}

function isProduceItem(name) {
  return matchProduceType(name) !== null;
}

function matchSize(name) {
  // `raw`/`index` always describe the FULL matched span, for callers
  // that blank it out of the text (extractVariant, extractProduceVariant);
  // `value` is the normalized size those callers don't care about but
  // extractSize returns.
  const splitMatch = name.match(SPLIT_WEIGHT_PATTERN);
  if (splitMatch) {
    return { raw: splitMatch[0], value: `${splitMatch[1]}${splitMatch[2]}`, index: splitMatch.index };
  }

  for (const pattern of SIZE_PATTERNS) {
    const match = name.match(pattern);
    if (match) {
      return { raw: match[0], value: match[0], index: match.index };
    }
  }
  return null;
}

function extractKnownBrand(name) {
  const index = KNOWN_BRAND_PATTERNS.findIndex((pattern) => pattern.test(name));
  return index === -1 ? null : KNOWN_BRANDS[index].toLowerCase();
}

function extractBrand(name) {
  // If a real, recognized brand is present, that's it — e.g.
  // "Vaarikad WELL DONE" shouldn't extract as "vaarikad" just
  // because it's the first capitalized word.
  const knownBrand = extractKnownBrand(name);
  if (knownBrand) return knownBrand;

  // Otherwise, first capitalized word is fine to start — skipping
  // past known category words so they don't get mistaken for the
  // brand.
  for (const match of stripQualityGrade(name).matchAll(/\p{Lu}[\p{L}\p{N}]*/gu)) {
    const word = match[0].toLowerCase();
    if (!CATEGORY_WORDS.has(word)) {
      return word;
    }
  }
  return null;
}

// A size's number+unit, converted to one base unit (ml or g) so the
// same real quantity always extracts identically no matter which unit
// or decimal separator the store's own text happens to use — "1.5L"
// (Barbora's convention), "1,5l", and "1500ml" all become "1500ml".
// Found by hand while investigating Drinks' low match rate: Barbora
// writes sizes with a period, Rimi/Selver with a comma, and Rimi in
// particular often states a sub-liter size in liters ("0,5l") where
// Barbora/Selver say "500ml" — same real bottle, extracted as two
// different strings before this.
//
// A multipack keeps its own count as its own part of the string
// ("6x330ml", "6x0,33l" both -> "6x330ml") so it can never equal a
// single item of the same per-unit size ("330ml") — a six-pack and
// one bottle are genuinely different products, not a wording
// difference.
//
// Anything that isn't a plain "number(xnumber)unit" shape (e.g. the
// unitless "10-pack" pattern) falls back to the old whitespace-
// stripped/lowercased behavior unchanged.
const NORMALIZED_SIZE_PATTERN = /^(\d+(?:[.,]\d+)?)(?:x(\d+(?:[.,]\d+)?))?(kg|g|ml|l)$/;

function normalizeSizeValue(rawValue) {
  const compact = rawValue.replace(/\s+/g, "").toLowerCase();
  const match = compact.match(NORMALIZED_SIZE_PATTERN);
  if (!match) return compact;

  const toNumber = (s) => parseFloat(s.replace(",", "."));
  const mult = match[2] ? toNumber(match[1]) : 1;
  let each = match[2] ? toNumber(match[2]) : toNumber(match[1]);
  let unit = match[3];

  if (unit === "l") {
    each *= 1000;
    unit = "ml";
  } else if (unit === "kg") {
    each *= 1000;
    unit = "g";
  }
  // Clears the floating-point noise unit conversion introduces
  // (0.33 * 1000 === 330.00000000000006, not 330).
  each = Math.round(each * 100) / 100;

  return mult === 1 ? `${each}${unit}` : `${mult}x${each}${unit}`;
}

function extractSize(name) {
  const size = matchSize(name);
  return size ? normalizeSizeValue(size.value) : null;
}

function extractVariant(name) {
  for (const { pattern, token } of NAMED_VARIANTS) {
    if (pattern.test(name)) {
      return token;
    }
  }

  // Blank out the size match first so its digits (e.g. the "800" in
  // "800g") can't be mistaken for a stage number.
  let text = name;
  const size = matchSize(name);
  if (size) {
    text = name.slice(0, size.index) + " ".repeat(size.raw.length) + name.slice(size.index + size.raw.length);
  }

  // A standalone 1-2 digit number, as long as it isn't part of an
  // age range or marker like "0-6k", "0+", "10%" — those aren't a
  // product stage/variant.
  const match = text.match(/(?<![\d.,-])\b(\d{1,2})\b(?!\s*(?:[.,]\d|%|\+))(?![a-zA-Z])(?!-)/);
  return match ? match[1] : null;
}

// A fat-content percentage or range, e.g. "2,5%", "3.5%", "0.05%",
// "3,6-4,2%", "82%" (butter), "99,9%" (ghee) — comma and period both
// used for the decimal point depending on the source, normalized to
// a period here. Used specifically for strict packaged-product
// matching (see sameBrandedProduct) — two milks at the same brand and
// size but different fat % are different products, not a wording
// difference.
const FAT_PERCENT_PATTERN = /\b(\d+(?:[.,]\d+)?(?:\s*-\s*\d+(?:[.,]\d+)?)?)\s*%/;

function extractFatPercent(name) {
  const match = name.match(FAT_PERCENT_PATTERN);
  if (!match) return null;
  const value = match[1].replace(/,/g, ".").replace(/\s+/g, "");

  // A lone "100%" is never a real fat content — no grocery product is
  // pure fat (butter tops out around 82%, ghee at 99,9%). It's a
  // purity/composition claim instead ("100% juice", "100% pure"),
  // which wrongly blocked an otherwise-clean match whenever only one
  // store's name happened to print the "100%" badge (e.g.
  // "Köögiviljamahl CIDO 1L" vs "Köögiviljamahl 100%, CIDO, 1 L"). A
  // range starting at 100 ("100-105%") is unaffected — this only
  // catches the bare, unqualified "100%".
  if (value === "100") return null;

  return value;
}

// Known shorthand a store's own raw name sometimes uses in place of
// the real brand text — e.g. Barbora shortens "Eesti Pagar" to "EP"
// on some bread items. The brand-stripping regex below only matches
// the real, spelled-out brand string (from the store's own structured
// data), so an abbreviated mention survives as a stray leftover word
// ("ep") and blocks an otherwise-clean match against a store that
// spells the brand out. Keyed by the lowercased real brand string;
// small and meant to be extended by hand as more turn up.
const BRAND_ABBREVIATIONS = {
  "eesti pagar": ["ep"],
};

// What's left of a packaged product's name once the known parts —
// brand, size, fat % — are removed: almost always flavour ("kirsi-
// ploomi", "stracciatella") or another describing word ("naturaalne",
// "soolata"). Two items with the same brand and size but different
// leftover words are a different product, the same principle as
// produce's variety — see sameBrandedProduct.
function extractDescriptors(name, brand) {
  let text = stripQualityGrade(name);

  if (brand) {
    const brandPattern = new RegExp(`\\b${escapeRegExp(brand).replace(/\s+/g, "\\s+")}\\b`, "gi");
    text = text.replace(brandPattern, " ");

    for (const abbreviation of BRAND_ABBREVIATIONS[brand.toLowerCase()] || []) {
      const abbreviationPattern = new RegExp(`\\b${escapeRegExp(abbreviation)}\\b`, "gi");
      text = text.replace(abbreviationPattern, " ");
    }
  }

  const fatMatch = text.match(FAT_PERCENT_PATTERN);
  if (fatMatch) {
    text = text.slice(0, fatMatch.index) + " " + text.slice(fatMatch.index + fatMatch[0].length);
  }

  const size = matchSize(text);
  if (size) {
    text = text.slice(0, size.index) + " " + text.slice(size.index + size.raw.length);
  }

  const words = [...new Set([...text.matchAll(/\p{L}+/gu)].map((m) => m[0].toLowerCase()))].sort();
  return words.length > 0 ? words.join(" ") : null;
}

// Produce's "unit" is extracted the same way size is — plus a bare
// "kg" fallback, since loose produce priced per kilogram often has
// no leading quantity at all (e.g. "Tomat 1kl, kg", not "1kg") — and
// the same for "tk" (piece), for produce sold by the item rather
// than by weight (e.g. a head of lettuce, "Salat ..., tk"). Doesn't
// default a name with neither to "tk" — that would treat "no unit
// stated" as itself meaningful, which isn't safe to assume.
function extractUnit(name) {
  const cleaned = stripQualityGrade(name);
  const size = extractSize(cleaned);
  if (size) return size;
  if (/\bkg\b/i.test(cleaned)) return "kg";
  return /\btk\b/i.test(cleaned) ? "tk" : null;
}

function extractType(name) {
  const matched = matchProduceType(name);
  if (matched) return matched;

  const word = firstWord(stripQualityGrade(name));
  return word ? word.toLowerCase() : null;
}

// A produce variety is whatever capitalized word(s) remain after the
// type word (e.g. "Cavendish" in "Banaan Cavendish", "Granny Smith"
// in "Õun Granny Smith") — mirroring how extractVariant looks for a
// named/numeric stage on the brand path — plus any qualifier word
// found anywhere in the name (see PRODUCE_QUALIFIERS: colors, and
// things like "kuivatatud"/dried). Plain lowercase descriptors that
// aren't on that list, like "lahtine" (loose) or "suur" (large), are
// deliberately ignored, the same way they'd never get picked up as
// a brand.
function extractProduceVariant(name) {
  const cleaned = stripQualityGrade(name);

  let text = cleaned;
  const size = matchSize(cleaned);
  if (size) {
    text = cleaned.slice(0, size.index) + " ".repeat(size.raw.length) + cleaned.slice(size.index + size.raw.length);
  }

  // Drop the same words extractBrand skips (CATEGORY_WORDS: country
  // and leftover phrase words like "Eesti"/"And"), plus the type word
  // itself — a type is not its own variety.
  //
  // The type is removed by identity, not by position. Dropping the
  // first capitalized word instead would assume the type is always
  // capitalized and always leads, which breaks on names like "Eesti
  // õun Krista ..." where the type ("õun") is lowercase: once "Eesti"
  // is skipped, "Krista" would land in first position and be swallowed
  // as the type, losing a real cultivar name.
  const type = extractType(name);
  const varietyWords = [...text.matchAll(/\p{Lu}[\p{L}]*/gu)]
    .map((m) => m[0].toLowerCase())
    .filter((w) => w !== type && !CATEGORY_WORDS.has(w));

  const qualifier = PRODUCE_QUALIFIERS.find(({ pattern }) => pattern.test(text));
  // Deduplicated: a colour that's also capitalized ("Punane kapsas")
  // otherwise lands in the word scan AND again via the qualifier
  // list, yielding "punane punane".
  const components = [...new Set(qualifier ? [...varietyWords, qualifier.token] : varietyWords)];

  return components.length > 0 ? components.join(" ") : null;
}

// Runs every raw-name extraction function exactly once for an item
// and bundles the results into one object, so downstream comparisons
// can read fields instead of re-parsing the name. Richer than a
// {ean, type, unit, variant, qualifiers, brand} sketch would suggest
// — isProduce/hasBrand are kept as their own booleans (extractType
// always falls back to *something* non-null, so "was this actually
// a recognized produce type" can't be read off it after the fact),
// and produce's unit/variety are kept separate from brand-path's
// size/variant since they come from different extraction rules
// (extractSize requires a leading digit, extractUnit doesn't).
// Exported so fetch-price.js can compute this once per item, right
// after scraping, instead of leaving it to happen once per pair.
function computeSignature(item) {
  const name = item.name;
  return {
    ean: item.ean || null,
    isProduce: isProduceItem(name),
    hasBrand: hasKnownBrand(name),
    type: extractType(name),
    // Name first; only if it states no unit does the store's own
    // per-unit price label stand in (Barbora publishes one as
    // `comparative_unit`). A name that says "kg" or "tk" is the
    // stronger signal, so it's never overridden.
    unit: extractUnit(name) || item.unit || null,
    variety: extractProduceVariant(name),
    // Lowercased, quality-grade-stripped name — kept alongside variety
    // so sameProduceItem can check whether a word only one side's
    // variety picked up (because it happened to be capitalized there)
    // is still genuinely present on the other side, just lowercase.
    // Not used for anything else; extraction itself stays
    // capitalized-word-only, unchanged.
    nameLower: stripQualityGrade(name).toLowerCase(),
    // The store's own brand (Barbora's brand_name, Rimi's brand
    // filter facet — see the scraper modules) wins when the scraper
    // found one; only guessed from the name when it didn't. A generic
    // product word (piim, või, jogurt, ...) is never mistaken for a
    // brand this way, the way the name-only guess could be.
    brand: item.brand ? item.brand.toLowerCase() : extractBrand(name),
    size: extractSize(name),
    variant: extractVariant(name),
    // Checked against the raw name, not the stripped/produce-typed
    // text — applies the same way on the brand path and the produce
    // path. See IDENTITY_QUALIFIER_PATTERNS.
    qualifiers: extractQualifiers(name),
    colors: extractColors(name),
    fatPercent: extractFatPercent(name),
    descriptors: extractDescriptors(name, item.brand),
    // Set by the caller (fetch-price.js) per category, not guessed
    // here — see sameBrandedProduct. Off by default so this never
    // changes behavior for a category that hasn't opted in.
    strictPackaging: item.strictPackaging === true,
  };
}

// Items that already went through computeSignature (e.g. in
// fetch-price.js, right after scraping) carry it as `.signature` —
// reused as-is. Anything else (a raw {store, name, ...} item, like
// in match-products.test.js) gets it computed on the spot, so every
// caller keeps working the same way; only the batch path in
// fetch-price.js gets the once-per-item win.
function signatureOf(item) {
  return item.signature || computeSignature(item);
}

function sameBrandedProduct(sigA, sigB) {
  if (!sigA.brand || !sigB.brand || sigA.brand !== sigB.brand) return false;

  if (!sigA.size || !sigB.size || sigA.size !== sigB.size) return false;

  // Never match if only one side has a variant, or they disagree —
  // that's most likely a different stage or type of the same
  // product line, not the same product.
  if ((sigA.variant === null) !== (sigB.variant === null)) return false;
  if (sigA.variant !== null && sigA.variant !== sigB.variant) return false;

  // Packaged products opted into strict matching (see computeSignature
  // — set per category by the caller, currently just Dairy): brand
  // and size agreeing isn't enough on their own, the way it visibly
  // wasn't for milk (same brand, same size, different fat %) or for
  // two Alma Muah yoghurts that turned out to be different flavours.
  if (sigA.strictPackaging && sigB.strictPackaging) {
    // Same pattern as variant below: neither side stating a fat % at
    // all (Skyr, some yoghurts) is a plain product on both sides and
    // isn't blocked on this alone — but one side stating it and the
    // other not, or the two stating different values (Alma 0.05% vs
    // Alma 2.5%), is exactly the kind of gap this exists to catch.
    if ((sigA.fatPercent === null) !== (sigB.fatPercent === null)) return false;
    if (sigA.fatPercent !== null && sigA.fatPercent !== sigB.fatPercent) return false;

    // Descriptors (flavour, or another describing word) work the same
    // way variant does above: both sides having nothing left over is
    // a plain product on both sides, which is fine; one side having
    // something the other doesn't, or a different something, isn't.
    if ((sigA.descriptors === null) !== (sigB.descriptors === null)) return false;
    if (sigA.descriptors !== null && sigA.descriptors !== sigB.descriptors) return false;
  }

  return true;
}

function escapeRegExp(word) {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// True if every variety word unique to one side (found there because
// it happened to be capitalized in that side's raw name) also shows
// up, case-insensitively, as a whole word in the other side's raw
// name — just lowercase there, which is why extraction didn't pick
// it up on that side. Narrow on purpose: this only bridges a
// capitalization gap for a word that's genuinely present on both
// sides, it never invents agreement between two different words. An
// exact match (including both null) short-circuits before this runs.
function varietyWordsAgree(sigA, sigB) {
  const wordsA = sigA.variety.split(" ");
  const wordsB = sigB.variety.split(" ");

  const onlyInA = wordsA.filter((w) => !wordsB.includes(w));
  const onlyInB = wordsB.filter((w) => !wordsA.includes(w));

  const foundInOther = (word, otherNameLower) => new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(otherNameLower);

  return onlyInA.every((w) => foundInOther(w, sigB.nameLower)) && onlyInB.every((w) => foundInOther(w, sigA.nameLower));
}

function sameProduceItem(sigA, sigB) {
  if (!sigA.type || !sigB.type || sigA.type !== sigB.type) return false;

  if (!sigA.unit || !sigB.unit || sigA.unit !== sigB.unit) return false;

  // Same principle as the brand path's stage number: never match if
  // only one side names a variety, or they disagree.
  if ((sigA.variety === null) !== (sigB.variety === null)) return false;
  if (sigA.variety !== null && sigA.variety !== sigB.variety && !varietyWordsAgree(sigA, sigB)) return false;

  return true;
}

// Compares two items (raw, or pre-signed via computeSignature) and
// decides if they're the same product. Does not consult either
// override list — see matchItems for that.
function sameProduct(a, b) {
  const sigA = signatureOf(a);
  const sigB = signatureOf(b);

  if (sigA.ean && sigB.ean) {
    return sigA.ean === sigB.ean;
  }

  // Checked before either path's own rules, and after EAN (a matching
  // barcode is definitive regardless) — a qualifier disagreement means
  // a genuinely different product no matter which path the rest of
  // the comparison would otherwise take.
  if (sigA.qualifiers !== sigB.qualifiers) {
    return false;
  }

  // A recognized brand present on only one side means a different
  // supplier/listing, not a coincidence — blocks the match outright,
  // the same principle as an asymmetric variant (Aptamil 1 vs 2).
  if (sigA.hasBrand !== sigB.hasBrand) {
    return false;
  }

  // A recognized brand on both sides overrides the produce path even
  // for a produce-shaped item — e.g. "Vaarikad WELL DONE" vs
  // "Vaarikad Rimi" are different suppliers, not the same listing.
  if (sigA.hasBrand && sigB.hasBrand) {
    // A KNOWN_BRANDS entry spans many different products — Kadarbiku
    // alone sells carrots, beets, and sauerkraut under the same brand
    // and often the same pack size. Brand+size agreeing isn't enough
    // to prove it's the same vegetable; the type has to agree too.
    // (Not applied to the generic brand-fallback path below — there,
    // type is often just the leading word, e.g. "aptamil" vs
    // "piimasegu" for the same real formula, and holding it to this
    // standard would break matches that are otherwise correct.)
    if (sigA.type !== sigB.type) return false;
    // A colour named on only one side, or a different colour on each,
    // is a different listing — same rule as the produce path's variety.
    if (sigA.colors !== sigB.colors) return false;
    return sameBrandedProduct(sigA, sigB);
  }

  // Strict packaged-product categories (Dairy — see computeSignature)
  // never take the produce path, full stop, even when a flavour word
  // happens to also be a whitelisted produce type ("kiivi" in a
  // kiwi-flavoured yoghurt matched "Koorene jogurt FARMI kiivi-tikri"
  // as produce before this, skipping brand/fat %/descriptors
  // entirely — it still got the right answer, but by luck). Isn't
  // applied to the non-strict categories below, which still rely on
  // this path for real produce.
  const strictPackaging = sigA.strictPackaging && sigB.strictPackaging;

  if (!strictPackaging) {
    if (sigA.isProduce && sigB.isProduce) {
      return sameProduceItem(sigA, sigB);
    }
    if (sigA.isProduce !== sigB.isProduce) {
      // One looks like loose produce, the other doesn't — not the
      // same kind of listing, so not the same product.
      return false;
    }
  }

  // Neither side is produce-typed or known-branded. That alone
  // still covers things like baby formula, where the plain
  // first-capitalized-word heuristic (skipping CATEGORY_WORDS)
  // reliably finds the real brand — Aptamil, NESTLE, NAN, etc. just
  // aren't on the produce-specific KNOWN_BRANDS list. Only when that
  // heuristic finds nothing at all on EITHER side is there truly
  // nothing reliable to compare; that's the real "unclassified" case
  // matchAcrossStores logs distinctly, rather than guessing from a
  // generic word like "Tomati" or "Aurutatud".
  if (sigA.brand === null && sigB.brand === null) {
    return false;
  }

  return sameBrandedProduct(sigA, sigB);
}

function sameRawItem(x, item) {
  return x.store.toLowerCase() === item.store.toLowerCase() && x.name === item.name;
}

// data/known-different.json holds pairs that must never match,
// regardless of what the brand/size/variant rules conclude. It's a
// backstop for whatever those rules still get wrong, not a
// replacement for fixing them.
function isKnownDifferent(a, b, knownDifferent) {
  return knownDifferent.some(
    ([x, y]) => (sameRawItem(x, a) && sameRawItem(y, b)) || (sameRawItem(x, b) && sameRawItem(y, a))
  );
}

function findOverride(a, b, overrides) {
  for (const product of overrides) {
    const aliasA = product.aliases[a.store.toLowerCase()];
    const aliasB = product.aliases[b.store.toLowerCase()];
    if (aliasA === a.name && aliasB === b.name) {
      return product.name;
    }
  }
  return null;
}

function capitalize(word) {
  return word ? word[0].toUpperCase() + word.slice(1) : "";
}

function synthesizeCanonicalName(a, b) {
  const sigA = signatureOf(a);
  const sigB = signatureOf(b);

  const branded = sigA.hasBrand && sigB.hasBrand;
  if (!branded && sigA.isProduce && sigB.isProduce) {
    const type = sigA.type || sigB.type || "";
    const unit = sigA.unit || sigB.unit || "";
    const variety = sigA.variety ?? sigB.variety;
    return [capitalize(type), variety, unit].filter(Boolean).join(" ");
  }

  const brand = sigA.brand || sigB.brand || "";
  const type = sigA.type || sigB.type || "";
  const size = sigA.size || sigB.size || "";
  const variant = sigA.variant ?? sigB.variant;
  // Include the extracted type alongside brand/size when it adds real
  // information — e.g. two same-brand, same-size KNOWN_BRANDS items
  // ("Kadarbiku Porgand 500g" vs "Kadarbiku Punapeet 500g") shouldn't
  // synthesize to the same canonical name just because the brand and
  // size happen to match. Skipped when type and brand are the same
  // word (formula items like Aptamil, where the type fallback just
  // re-finds the brand itself — adding it would only be noise).
  const typeName = type && type.toLowerCase() !== brand.toLowerCase() ? capitalize(type) : null;
  // Same principle, one level further: two same-brand, same-size,
  // same-type packaged items can still be different products — two
  // Alma Muah yoghurts ("Alma Koorejogurt 380g" for both stracciatella
  // and vanilla) is the real case this fixes. Only for items that
  // opted into strict packaged-product matching (see sameBrandedProduct)
  // — descriptors is extracted for every item regardless, but on a
  // category that isn't checking it for agreement, it's just leftover
  // noise (formula's "0K+"/"al. sün." wording became "Aptamil k
  // piimasegu 1 800g" before this guard). descriptors already includes
  // the type word itself (extractDescriptors doesn't strip it, since
  // strict matching doesn't need to), so it's filtered back out here
  // to avoid repeating "Koorejogurt koorejogurt 380g".
  const useDescriptors = sigA.strictPackaging && sigB.strictPackaging;
  const descriptors = useDescriptors ? sigA.descriptors ?? sigB.descriptors : null;
  const descriptorWords = descriptors
    ? descriptors.split(" ").filter((w) => w !== type.toLowerCase() && w !== brand.toLowerCase())
    : [];
  const descriptorName = descriptorWords.length > 0 ? descriptorWords.join(" ") : null;
  return [capitalize(brand) || "Unknown", typeName, descriptorName, variant, size].filter(Boolean).join(" ");
}

// Decides if two raw items are the same product:
// 1. data/known-different.json can force a "no" outright.
// 2. data/products.json's aliases can force a "yes" with a canonical
//    name, for cases the automatic rules get wrong.
// 3. Otherwise, the automatic match decides (brand path or produce
//    path, whichever applies).
function matchItems(a, b, overrides = [], knownDifferent = []) {
  if (isKnownDifferent(a, b, knownDifferent)) {
    return { matched: false, reason: "known-different" };
  }

  const overrideName = findOverride(a, b, overrides);
  if (overrideName) {
    return { matched: true, canonicalName: overrideName, reason: "override" };
  }

  if (sameProduct(a, b)) {
    return { matched: true, canonicalName: synthesizeCanonicalName(a, b), reason: "automatic" };
  }

  return { matched: false, reason: null };
}

// Union-find over an item pool's index positions — used by matchPool
// to turn a set of pairwise matches into connected groups without
// caring which store any particular item came from.
function makeUnionFind(size) {
  const parent = Array.from({ length: size }, (_, i) => i);
  function find(i) {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]];
      i = parent[i];
    }
    return i;
  }
  function union(i, j) {
    const ri = find(i);
    const rj = find(j);
    if (ri !== rj) parent[ri] = rj;
  }
  return { find, union };
}

// Matches every item in the pool against every other item, across any
// number of stores, with no per-product hand-typing and no fixed
// "store A vs store B" shape — a category's items all go in one flat
// list, tagged with their own `.store`. sameProduct/matchItems decide
// pairwise agreement exactly as before; this only decides how those
// pairwise results combine into a product.
//
// Two items from the same store are never compared — a store doesn't
// duplicate-list its own products, so there's nothing to resolve
// there, and it would only risk merging two genuinely different same-
// store items that happen to look alike.
//
// A product is a connected group of matching items that also passes
// two checks, generalizing the two failure modes the old two-store
// version already guarded against:
// - At most one item per store (the old "two candidates on the other
//   side" uniqueness rule: two same-store items both matching a third
//   item, from a different store, are still two DIFFERENT same-store
//   items — the group can't hold both, so the whole group goes to
//   review instead of picking one arbitrarily).
// - Every pair within the group must itself match, not just be
//   reachable through a chain — A matching B and B matching C doesn't
//   prove A matches C (sameProduct has no transitivity guarantee, and
//   won't be given one). A chain that isn't a clique goes to review
//   too, rather than guessing which link is the odd one out.
// Anything left over with no match at all is reported separately from
// either of those.
function matchPool(items, overrides = [], knownDifferent = []) {
  const n = items.length;
  const { find, union } = makeUnionFind(n);
  const edges = new Map(); // "i-j" (i<j) -> matchItems result, cross-store pairs only

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (items[i].store === items[j].store) continue;
      const result = matchItems(items[i], items[j], overrides, knownDifferent);
      if (result.matched) {
        edges.set(`${i}-${j}`, result);
        union(i, j);
      }
    }
  }

  const groups = new Map(); // root index -> item indices
  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(i);
  }

  const matches = [];
  const unmatched = [];
  const ambiguous = [];

  for (const indices of groups.values()) {
    if (indices.length === 1) {
      unmatched.push(items[indices[0]]);
      continue;
    }

    const stores = new Set(indices.map((i) => items[i].store));
    const oneItemPerStore = stores.size === indices.length;

    let isClique = true;
    for (let a = 0; a < indices.length && isClique; a++) {
      for (let b = a + 1; b < indices.length; b++) {
        const i = indices[a];
        const j = indices[b];
        if (items[i].store === items[j].store) continue;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edges.has(key)) {
          isClique = false;
          break;
        }
      }
    }

    if (!oneItemPerStore || !isClique) {
      ambiguous.push({ items: indices.map((i) => items[i]) });
      continue;
    }

    const groupItems = indices.map((i) => items[i]).sort((x, y) => x.store.localeCompare(y.store));
    const canonicalName = synthesizeCanonicalName(groupItems[0], groupItems[1]);
    const reason = indices.some((i, a) =>
      indices.slice(a + 1).some((j) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        return edges.get(key)?.reason === "override";
      })
    )
      ? "override"
      : "automatic";

    matches.push({ items: groupItems, canonicalName, reason });
  }

  // An item with no recognized produce type, no recognized brand, and
  // not even a plain capitalized word to fall back on never had a
  // reliable comparison to begin with — log it as unclassified so it
  // reads differently from an actual brand or variant disagreement
  // between two comparable items.
  function logUnmatched(item) {
    const sig = signatureOf(item);
    if (!sig.isProduce && !sig.hasBrand && sig.brand === null) {
      console.warn(`Unclassified: no known type or brand for ${item.store} product "${item.name}" — skipped, not compared against anything.`);
    } else {
      console.warn(`No match found for ${item.store} product "${item.name}" — needs a person to check (add an override in data/products.json if it should match something).`);
    }
  }

  for (const item of unmatched) {
    logUnmatched(item);
  }
  for (const { items: groupItems } of ambiguous) {
    console.warn(
      `Ambiguous: ${groupItems.length} items don't agree with each other cleanly ` +
        `(${groupItems.map((i) => `${i.store} "${i.name}"`).join(", ")}) — needs a person to pick which belong together (add an override in data/products.json).`
    );
  }

  return { matches, unmatched, ambiguous };
}

module.exports = {
  extractBrand,
  extractSize,
  extractVariant,
  isProduceItem,
  hasKnownBrand,
  extractType,
  extractUnit,
  extractProduceVariant,
  computeSignature,
  sameProduct,
  matchItems,
  matchPool,
};
