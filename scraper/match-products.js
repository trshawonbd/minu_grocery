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

// "cl" (centilitre) is Selver's unit for every wine and spirit ("75
// cl", "70 cl", "20 cl") — normalized to ml below, the way "l" is.
// The multipack separator is "x", "×" or "*" (Barbora: "12*0,33L").
const SIZE_PATTERNS = [
  // multipack, e.g. "2x200ml", "6 x 500 ml", "12*0,33L"
  /\d+(?:[.,]\d+)?\s*[x×*]\s*\d+(?:[.,]\d+)?\s*(?:kg|g|ml|cl|l)\b/i,
  // e.g. "10-pack"
  /\d+(?:[.,]\d+)?\s*-?\s*pack\b/i,
  // simple size, e.g. "800g", "1L", "0,5l", "75 cl"
  /\d+(?:[.,]\d+)?\s*(?:kg|g|ml|cl|l)\b/i,
];

// A pack count written as its own word after a single size — Rimi's
// "0,5l prk 6-pakk", "0,33l 24-pakk" — is the same multipack Barbora
// writes as "6x0,5l". Folded into the size ("6x500ml") so a six-pack
// never equals one can, and two stores' spellings of the same
// six-pack do equal each other. Only a digit-marked "N-pakk"/"N pakk"
// counts; a bare "pakk" stays what it was (see extractDescriptors).
const PACK_COUNT_PATTERN = /(?<!\d)(\d+)\s*-?\s*(?:pakk|pack)(?![\p{L}])/iu;

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
// Baby formula's own generic/descriptive words, added while expanding
// the category to follow-on and growing-up formula: "jätkupiimasegu"
// (follow-on formula), "kitsepiim"/"kitsepiimasegu" (goat milk formula
// — the real distinguishing fact there is the brand, Kabrita, which
// only makes goat-milk formula, so once this is skipped the brand
// alone is enough), "imiku" (baby's/infant), "algpiimasegu" (starter
// formula), "öko"/"mahepiimasegu" (organic/organic-formula), "piimas"
// (Barbora's own period-truncated "Piimas." for "Piimasegu"), "ar"
// (Aptamil's anti-reflux line — a real, different product from plain
// formula, so also recognized as its own NAMED_VARIANTS entry below;
// this only keeps it from being mistaken for the BRAND). Real bug,
// found reviewing the expanded scrape by hand: two DIFFERENT real
// brands ("Jätkupiimasegu Combiotic2Bio HIPP800g" and "Jätkupiimasegu
// APTAMIL Comfort2 400g") both extracted the same wrong pseudo-brand
// ("jätkupiimasegu") before this — a same-size coincidence between
// two such items would have matched two different brands' formula as
// the same product.
// "comfort"/"comfort1".."comfort4" (also recognized as a NAMED_VARIANTS
// entry — see below): whichever word order a store's own name uses,
// "Comfort" (or the fused "Comfort2") coming before the real brand
// must not become the pseudo-brand itself. Real bug, same shape as the
// generic-word collision above: "Piimasegu Comfort nr1 0+, APTAMIL,
// 400 g" (brand written last) extracted "comfort" as the brand, not
// "aptamil".
const CATEGORY_WORDS = new Set([
  "piimasegu", "eripiimasegu", "eesti", "and",
  "punane", "sinine", "kollane", "roheline", "valge", "must", "oranž",
  "jätkupiimasegu", "kitsepiim", "kitsepiimasegu", "imiku", "algpiimasegu", "öko", "mahepiimasegu", "piimas", "ar",
  "comfort", "comfort1", "comfort2", "comfort3", "comfort4",
]);

// Named product variants that aren't a stage number — checked before
// falling back to a numeric stage. Each `token` is a function of the
// match, not a plain string — needed for "plus" below, whose real
// distinguishing value is the digit it carries, not a fixed label.
// "lv" is Rimi's own abbreviation for "laktoosivaba" (lactose-free),
// taken straight from the raw product name text.
const NAMED_VARIANTS = [
  // "Comfort1"/"Comfort 2" (Aptamil's own line — the digit sometimes
  // fused directly onto the word, sometimes spaced) — checked before
  // the plain "comfort" entry below, so the stage digit is kept:
  // Comfort1 and Comfort2 are different real products, not just "the
  // comfort one" either way. Real bug, the fused form: a bare \b fails
  // between a letter and a digit (both are "word" characters to JS
  // regex), so it matched neither this file's existing comfort pattern
  // nor the generic numeric fallback below. A second real bug, the
  // SPACED form ("Comfort 2"): NAMED_VARIANTS returns on its first
  // match and never reaches the numeric fallback at all, so the plain
  // "comfort" entry below matched first and silently dropped the "2" —
  // Rimi's own "Piimasegu Aptamil Comfort sünnist 400g" (stage 1,
  // implied) and "Piimasegu Aptamil Comfort 2 al. 6k 400g" (stage 2)
  // both extracted the same bare "comfort" variant, and only fell into
  // data/ambiguous.json instead of quietly mismatching by luck because
  // a same-store pair can never form a match in the first place — but
  // a genuine cross-store Comfort-stage-2 pair would have been blocked
  // by this the same way. Both found reviewing the expanded formula
  // scrape's ambiguous groups by hand.
  // A spirit's age statement — "3YO", "12yo", "12 Years", "3 Year",
  // "8 aastat" — is the product: Havana Club Añejo 3YO is not Añejo
  // 7YO. Found as a real wrong match in batch 9's first scrape: the
  // digits are invisible to the letters-only descriptors, and the
  // letters-only "yo" was equal on both sides. Both sides must state
  // the same age (a one-sided age never matches, like every variant).
  { pattern: /(?<![\p{L}\d])(\d{1,2})\s*-?\s*(?:yo|y\.o\.?|years?(?:\s+old)?|aastane|aastat|a[nñ]os)(?![\p{L}])/iu, token: (m) => `${m[1]}yo` },
  { pattern: /\bcomfort\s*(\d)\b/i, token: (m) => `comfort${m[1]}` },
  { pattern: /\bcomf(?:ort)?\b/i, token: () => "comfort" },
  // HiPP's "Combiotic" line states its stage the way NAN's "Plus" does
  // (see below) — sometimes fused ("Combiotic2", Coop's own style),
  // sometimes spaced ("Combiotic 2"). Extracts the bare digit so it
  // still agrees with a stage stated alone elsewhere ("HIPP 2 Bio").
  // Listed after the Comfort entries: "Comfort Combiotic 1" is the
  // Comfort product, not stage 1 of plain Combiotic. Also Coop's
  // abbreviation "Comb.1" (the period made the digit invisible to the
  // numeric fallback, which refuses a digit after a period so that a
  // decimal is never split). A letter may follow the digit (Barbora's
  // "Combiotic2Bio" is stage 2) — but not an age marker's letter
  // ("Combiotic 6k", "6kuud", "2a", "2aastat") and never "0+".
  { pattern: /\bcomb(?:iotic|\.)\s*(\d)(?![\d.,%+-])(?![ka](?![\p{L}])|kuu|aast)/iu, token: (m) => m[1] },
  { pattern: /\b(?:lv|laktoosivaba)\b/i, token: () => "lactose-free" },
  // Aptamil's anti-reflux line ("Piimasegu AR APTAMIL...") — a real,
  // different product from plain formula (a medical dietary need), not
  // just a wording difference. Case-sensitive (no /i/) on purpose: a
  // bare two-letter token is only safe to treat as meaningful when it
  // appears exactly as the all-caps abbreviation real AR formula
  // packaging uses, not as a coincidental capitalized fragment
  // elsewhere.
  { pattern: /\bAR\b/, token: () => "ar" },
  // The same anti-reflux line spelled out ("Hipp Anti Reflux imiku
  // piimasegu 300g" — Coop writes it in words, no "AR" at all). Real
  // wrong match found reviewing the first Coop scrape by hand: with
  // the words invisible to the variant rules, Coop's HiPP Anti Reflux
  // 300g matched Barbora's HiPP Comfort 300g on brand+size alone.
  { pattern: /\banti[\s-]?reflux\b/i, token: () => "ar" },
  // Nestlé NAN's "Optipro Plus1"/"Plus2"/"Plus3"/"Plus4" line states
  // its stage as "Plus" + digit — sometimes fused ("Plus4"), sometimes
  // spaced ("Plus 2"); both extract to the bare digit here so they
  // still agree with a same-stage item from a store/line that states
  // the stage number alone (Plus is NAN's own branding around the
  // stage, not a distinct product line the way Comfort is). The spaced
  // form already worked via the generic numeric fallback below; this
  // exists for the fused form, which — same root cause as Comfort1/2
  // above — a bare \b can't reach.
  { pattern: /\bplus\s*(\d{1,2})\b/i, token: (m) => m[1] },
  // "nr1"/"nr2" (Selver's own shorthand for the stage number, "nr" =
  // "number") — equivalent to the bare stage digit everywhere else,
  // not a distinguishing product line, so this extracts just the
  // digit itself rather than a "nr"-prefixed token (a same-stage item
  // stated as a bare digit elsewhere must still agree with it). Real
  // bug, same root cause as Comfort/Plus above: "nr1" fuses "nr"
  // directly to the digit with no space, which the generic fallback's
  // \b can't reach.
  { pattern: /\bnr\s*(\d{1,2})\b/i, token: (m) => m[1] },
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
// - A wheat flour's grade number (T405, T550, T812, T00 — a real
//   milling-fineness classification, not a size) — real bug found by
//   hand testing the new Flour & sugar category: the grade digits
//   were silently dropped during descriptor tokenization (which only
//   keeps letter-runs, never digits), so "T405" and "T550" both
//   collapsed to the same leftover word ("t") and two genuinely
//   different flours from the same brand at the same pack size could
//   have matched (KALEW sells both T405 and T550 at 2kg, at every
//   store). Every real spelling found by hand: "T-550"/"T550"/"T 812"
//   (a "T" prefix, sometimes with a separating dot/dash/space),
//   "tüüp 812"/"tüüp 550C" (Rimi's "tüüp" = "type"), and "405d"/"550D"
//   (a bare digit with a trailing grade-letter, no "T" at all). Not a
//   generic "any 2-3 digit number" rule — deliberately limited to the
//   four grade values actually seen, so it can't misread an unrelated
//   number (e.g. a coincidental "550g" pack weight) as a grade.
// Loanwords that happen to end in "-ga" but are never the Estonian
// comitative case — real bug found while adding Diapers & baby wipes:
// "Mega Pack" (a real, recurring wholesale-listing term at every
// store, e.g. "HULGI Püksmähkmed Mega Pack S4") was read as "with X"
// the same way "küüslauguga" (with garlic) is, blocking an otherwise-
// clean match against a plain "Extra Care" listing of the same real
// pack. "omega" (as in omega-3 oils/supplements, elsewhere in this
// project's scope) is the same shape of false positive, excluded
// defensively alongside it.
const NON_COMITATIVE_GA_WORDS = new Set(["mega", "omega"]);

const IDENTITY_QUALIFIER_PATTERNS = [
  // Organic, in every spelling the stores use — "mahe", "öko",
  // "ökoloogiline", "BIO" — is ONE qualifier (the owner's decision,
  // 2026-09-26): organic and non-organic are different products, and
  // "Öko" on one side still agrees with "BIO" on the other. Letter
  // boundaries rather than \b, since \b never fires before "ö".
  // Also Selver's English "Organic" ("2 Organic Combiotic ..."), and
  // the compound prefix "Mahe…" ("Mahetäispiim", "Mahepiimasegu") —
  // real pairs found by hand where one store writes the prefix and the
  // other a standalone "öko". ("mahe" is also Estonian for "mild", as
  // in "maitselt mahe kurk" — harmless: both stores of such a pair
  // write it, so the qualifier agrees.)
  // The prefix form needs 3+ letters after "mahe" ("Mahetäispiim",
  // "Mahepiimasegu") so that "maheda"/"mahedalt" — "mild(ly)", as in
  // Felix's "Maheda maitsega sinep" — is never read as organic.
  { pattern: /(?<![\p{L}])(?:mahe(?:\p{L}{3,})?|öko|ökoloogiline|bio|organic)(?![\p{L}])/iu, extract: () => "mahe" },
  { pattern: /\b([2-9])\.?\s*kl\.?\b/i, extract: (m) => `${m[1]}kl` },
  {
    // Letter boundaries, not \b: a \b never fires before "ü"/"š", so
    // "ürtidega" (with herbs) used to extract as "rtidega" — harmless
    // for matching (both stores lost the same letter) but wrong the
    // moment the qualifier is shown in a display name.
    pattern: /(?<![\p{L}])\p{L}{2,}ga(?![\p{L}])/giu,
    extract: (m) => {
      const word = m[0].toLowerCase();
      return NON_COMITATIVE_GA_WORDS.has(word) ? null : word;
    },
    all: true,
  },
  {
    pattern: /\b(?:(?:t[\s.-]*|tüüp\s+)(00|405|550|812)|(00|405|550|812)[cd])\b/i,
    extract: (m) => `t${m[1] || m[2]}`,
  },
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
  const add = (value) => {
    if (value !== null) found.add(value);
  };
  for (const { pattern, extract, all } of IDENTITY_QUALIFIER_PATTERNS) {
    if (all) {
      for (const m of name.matchAll(pattern)) add(extract(m));
    } else {
      const m = name.match(pattern);
      if (m) add(extract(m));
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
// The organic words (öko/ökoloogiline/bio/organic, alongside the
// original "mahe") are stripped here for the same reason "mahe" always
// was: they're tracked as the organic QUALIFIER instead (see
// IDENTITY_QUALIFIER_PATTERNS), so they must not also survive as a
// descriptor word that differs by spelling ("BIO" vs "Öko") between
// stores. Letter boundaries rather than \b — \b never fires before "ö".
const NON_IDENTITY_PATTERN = /(?<![\p{L}])(aurutatud|keedetud|mahe|öko|ökoloogiline|bio|organic|marineeritud)(?![\p{L}])/giu;

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
  "DAVA", // eggs — Barbora prints no brand field on its Dava eggs
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

// PRODUCE_TYPES is a whitelist built for one thing: loose,
// unbranded fruit and vegetables (see its own comment above). A
// strict-packaging category (Dairy, Bread, Drinks — anything that
// isn't Baby formula or Fruits & vegetables) never has genuine loose
// produce in it, so the scan is skipped there outright rather than
// run and ignored — real case: Barbora's own abbreviation style
// truncates "vabapidamisel peetavate kanade munad" (free-range eggs)
// down to "Vab.peet.kanade munad", and the period-separated fragment
// "peet" is — by pure coincidence — also the whole word for beet.
// Skipping the scan for strict categories keeps that fragment from
// ever being mistaken for a real "peet" (beet) type, the same way
// "kiivi"/"banaan"/"apelsin" flavour words in a yoghurt or soft drink
// name should never be read as the type of loose produce either.
function isProduceItem(name, { strictPackaging = false } = {}) {
  if (strictPackaging) return false;
  return matchProduceType(name) !== null;
}

// Piece-count sizes — for the categories that opt in (pieceCountSizes
// in scraper/categories.js: Dairy for eggs, Household for paper). Eggs
// and toilet paper have no weight or volume in their names at all, only
// a count ("10tk", "M10", "8 rulli", "300 lehte"), so the strict path
// (which needs a size on both sides) never matched a single egg or
// roll of paper — found because the app's Munad and Paberitooted
// tiles stayed empty. The count IS the size here: "10tk" ≠ "15tk",
// "8rl" ≠ "12rl", "10x9tk" (tissues) is a multipack. A paper
// product's "300l" is 300 sheets ("lehte"), never 300 litres — checked
// before the litre pattern for paper names only.
const PAPER_NAME_PATTERN = /paber|rätik|rätt|salvrät|taskur/i;
const EGG_FUSED_COUNT_PATTERN = /(?<=(?:^|[\s,/])(?:XL|L|M|S))(\d{1,2})(?![\d\p{L}])/u;
const COUNT_SIZE_PATTERNS = [
  { pattern: /(\d+)\s*[x×*]\s*(\d+)\s*(?:tk|tük\p{L}*)\.?(?![\p{L}])/iu, value: (m) => `${m[1]}x${m[2]}tk` },
  { pattern: /(\d+)\s*(?:tk|tük\p{L}*)\.?(?![\p{L}])/iu, value: (m) => `${m[1]}tk` },
  { pattern: /(\d+)\s*(?:rl|rul\p{L}*)\.?(?![\p{L}])/iu, value: (m) => `${m[1]}rl` },
  // Foil, cling film and baking paper are sold by length ("20m",
  // "30 m") — the length is the size, like a roll count.
  { pattern: /(\d+(?:[.,]\d+)?)\s*m(?![\p{L}])/iu, value: (m) => `${m[1].replace(",", ".")}m` },
];
const SHEET_COUNT_PATTERN = /(\d+)\s*(?:lehte|leh\.?|l)(?![\p{L}])/iu;

function countSize(name, allowSheets) {
  const patterns = allowSheets ? [...COUNT_SIZE_PATTERNS, { pattern: SHEET_COUNT_PATTERN, value: (m) => `${m[1]}lehte` }] : COUNT_SIZE_PATTERNS;
  for (const { pattern, value } of patterns) {
    const match = name.match(pattern);
    if (match) return { raw: match[0], value: value(match), index: match.index, count: true };
  }
  const egg = name.match(EGG_FUSED_COUNT_PATTERN);
  return egg ? { raw: egg[0], value: `${egg[1]}tk`, index: egg.index, count: true } : null;
}

function matchSize(name, { pieceCounts = false } = {}) {
  // `raw`/`index` always describe the FULL matched span, for callers
  // that blank it out of the text (extractVariant, extractProduceVariant);
  // `value` is the normalized size those callers don't care about but
  // extractSize returns.
  if (pieceCounts && PAPER_NAME_PATTERN.test(name)) {
    const paper = countSize(name, true);
    if (paper) return paper;
  }
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
  return pieceCounts ? countSize(name, false) : null;
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
  // (Coop's leading age marker "6K"/"1A" is not a capitalized word
  // — it was guessed as the brand "k" on every brand-less Coop baby
  // food, see stripLeadingAgeMarker.)
  for (const match of stripLeadingAgeMarker(stripQualityGrade(name)).matchAll(/\p{Lu}[\p{L}\p{N}]*/gu)) {
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
const NORMALIZED_SIZE_PATTERN = /^(\d+(?:[.,]\d+)?)(?:x(\d+(?:[.,]\d+)?))?(kg|g|ml|cl|l)$/;

function normalizeSizeValue(rawValue) {
  const compact = rawValue.replace(/\s+/g, "").replace(/[×*]/g, "x").toLowerCase();
  const match = compact.match(NORMALIZED_SIZE_PATTERN);
  if (!match) return compact;

  const toNumber = (s) => parseFloat(s.replace(",", "."));
  const mult = match[2] ? toNumber(match[1]) : 1;
  let each = match[2] ? toNumber(match[2]) : toNumber(match[1]);
  let unit = match[3];

  if (unit === "l") {
    each *= 1000;
    unit = "ml";
  } else if (unit === "cl") {
    each *= 10;
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

function extractSize(name, options = {}) {
  const size = matchSize(name, options);
  if (!size) return null;
  if (size.count) return size.value;
  const normalized = normalizeSizeValue(size.value);
  // A separate "N-pakk" count turns a single size into that multipack
  // (see PACK_COUNT_PATTERN); a size that already is one keeps it.
  const pack = name.match(PACK_COUNT_PATTERN);
  if (pack && /^\d+(?:\.\d+)?(?:ml|g)$/.test(normalized)) {
    return `${parseInt(pack[1], 10)}x${normalized}`;
  }
  return normalized;
}

// A wine's vintage — a four-digit year on its own ("Rioja Reserva
// 2018"). Compared in the alcohol categories only (see
// sameBrandedProduct): the same wine from two harvests is two
// products. Never a year glued to other digits, and not the
// four-digit brand-numbers beers carry (Kronenbourg 1664 is outside
// the range).
const VINTAGE_PATTERN = /(?<![\d.,])(19[6-9]\d|20[0-4]\d)(?![\d.,%])/;

function extractVintage(name) {
  const match = name.match(VINTAGE_PATTERN);
  return match ? match[1] : null;
}

// Paper's ply count ("3-kihiline", "2kih", "3k.") — a real difference
// (2-ply is not 3-ply), only read in the piece-count categories so a
// formula's age marker ("al. 6k") is never mistaken for it.
const LAYER_PATTERN = /(?<![\d])(\d)\s*-?\s*(?:kih\p{L}*|k\.)(?![\p{L}])/iu;

// The store's own age marker written as a leading token — Coop's "6K"
// (from 6 months), "10K", "1A" (from 1 year) — is never the product's
// type word or a descriptor. Barbora's trailing "6K+"/"0K+" was
// already invisible (a unit-like letter after a digit is dropped, see
// DESCRIPTOR_NORMALIZATION_PATTERNS); the LEADING form still became
// the type word "k" ("Hipp K mahe 2 800g" on the screen).
const LEADING_AGE_MARKER = /^\s*\d{1,2}\s*[kKaA]\+?(?![\p{L}])\s*/u;

function stripLeadingAgeMarker(name) {
  return name.replace(LEADING_AGE_MARKER, "");
}

function extractVariant(name, { pieceCounts = false, brand = null } = {}) {
  if (pieceCounts) {
    const layers = name.match(LAYER_PATTERN);
    if (layers) return `${layers[1]}kih`;
  }
  for (const { pattern, token } of NAMED_VARIANTS) {
    const match = name.match(pattern);
    if (match) {
      return token(match);
    }
  }

  // Blank out the size match first so its digits (e.g. the "800" in
  // "800g") can't be mistaken for a stage number.
  let text = name;
  const size = matchSize(name, { pieceCounts });
  if (size) {
    text = name.slice(0, size.index) + " ".repeat(size.raw.length) + name.slice(size.index + size.raw.length);
  }
  // A stage digit fused straight onto the brand ("Holle2", Coop's own
  // style) is unreachable to the \b below (letter and digit are both
  // "word" characters); blanking the known brand first leaves the
  // bare digit. Letter boundaries only, so the digit survives.
  if (brand) {
    text = text.replace(new RegExp(`(?<![\\p{L}])${escapeRegExp(brand).replace(/\s+/g, "\\s+")}(?![\\p{L}])`, "giu"), (m) => " ".repeat(m.length));
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
// The number may be fused straight onto the preceding word (Coop's
// "Strong7.5%"): a plain \b can't reach a digit after a letter and
// read ".5%" as 5%. The lookbehind only forbids starting inside a
// number ("7.5" must not be re-read from its "5").
const FAT_PERCENT_PATTERN = /(?<!\d[.,]?)(\d+(?:[.,]\d+)?(?:\s*-\s*\d+(?:[.,]\d+)?)?)\s*%/;

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
  // Barbora's meat item names shorten "Maks & Moorits" to "M&M" — the
  // real brand field (used for `brand`) already says the full name on
  // both stores, so only this leftover abbreviation needs stripping.
  "maks & moorits": ["m&m"],
  // Selver's meat names print "RAKVERE LK" (Rakvere Lihakombinaat) as
  // a display suffix — its own brand field is plain "RAKVERE", same as
  // Barbora/Rimi's, so only the stray "LK" needs stripping.
  rakvere: ["lk"],
  // Barbora's fish names fuse "Kapten Grant" into "KGrant"
  // ("Heeringafilee vähesoolane KGrant, 240g").
  "kapten grant": ["kgrant"],
};

// Abbreviations, spelling/grammatical-case variants, translations,
// and synonyms that never signal a real product difference —
// collapsed to one canonical word (or dropped outright, when nothing
// on a genuine match's other side ever states an equivalent word) in
// extractDescriptors, before descriptors are tokenized and compared.
// Each entry was verified by hand against a real pair from
// data/review.md's "possible matches to check by hand" section (see
// data/possible-matches-sorted.md).
//
// Deliberately narrow, on purpose: a genuine packaging/format word
// ("purk"/"prk" — can vs bottle, "vorm" — tin-baked vs hearth-baked,
// a marketing adjective like "rustikaalne") is NOT here — that can be
// a real product difference and needs a person's call instead
// (data/products.json), never a blanket rule. `rasvatu` and `pakk`
// are handled separately, below, since whether they're safe to drop
// depends on the item's own fat % / size, not on the word alone.
const DESCRIPTOR_WORD_NORMALIZATIONS = [
  // Abbreviations (a store's own shorthand, usually period-marked)
  ["idan", "idandatud"], // "idan. teradega" -> "idandatud teradega"
  ["m[.-]+ta", "maitsestamata"], // "m-ta" (unflavoured)
  ["m[.-]+mata", "maitsestamata"], // "m.-mata" (unflavoured)
  ["martsip", "martsipani"], // "ploomi-martsip.jogurt"
  ["plomb", "plombiiri"], // "marja-plomb." — the other side's "plombiirimaitseline" loses its "-flavoured" suffix first (see the suffix pattern below), so both meet at "plombiiri"
  ["karbon", "karboniseeritud"], // "karbon.mineraalvesi"
  ["täisterahel", "täisterahelvest"], // "täisterahel.FAZER"
  ["röstsai", "röst"],
  ["lemona", "lemonade"],
  // Spelling / grammatical-case variants
  ["leiburi", ""], // genitive of the brand "Leibur" — already covered by brand-stripping when spelled "Leibur"
  ["rukkijahust", "rukkijahu"], // partitive case
  ["ploomist", "ploomi"], // elative case
  ["meiereivõi", "või"],
  ["meierivõi", "või"],
  // Translations
  ["apelsin", "orange"],
  // Synonyms
  ["mullita", "gaasita"], // both "still/no bubbles"
  ["gaseerimata", "gaasita"], // both "not carbonated"
  // "öko"/"ökoloogiline"/"bio" are NOT dropped here any more — they are
  // the organic qualifier (see IDENTITY_QUALIFIER_PATTERNS), compared
  // before descriptors ever are. Dropping "öko" as noise (the old
  // entry) would have let an organic item match a non-organic one.
  ["vahujook", "karastusjook"], // both generic "sparkling/soft drink"
  // Leftover fragments that never carry real distinguishing weight: a
  // piece-count artifact ("4tk" -> "tk", the digit is dropped
  // elsewhere already) and the generic "this is water" category noun
  // some stores spell out and others don't.
  ["tk", ""],
  ["mineraalvesi", ""],
  // A bare "kg" with no leading digit — "sold per kg, weight chosen at
  // checkout" — is never stripped by the size-matching step above,
  // which only strips a NUMBER+unit ("400g", "kg" never alone). Real
  // bug found while testing Meat's matchAcrossWeights: every "X, kg"
  // item carried a stray "kg" descriptor token that a same product's
  // fixed-pack listing never has (its weight is stripped as the size
  // match instead), so a per-kg listing could never match a fixed
  // pack of the identical cut even once size-equality itself was
  // relaxed. Safe everywhere — "kg" is a unit, never a real
  // distinguishing word, the same reasoning as "tk" above.
  ["kg", ""],

  // --- Meat ---
  // Abbreviations (Barbora's meat names abbreviate heavily)
  ["br", "broileri"], // "Br.poolkoivad", "Br.kintsuliha" -> chicken/broiler cuts
  ["klassik", "klassikalises"], // "klassik.marin." -> "klassikalises marinaadis"
  ["eelküps", "eelküpsetatud"], // "Eelküps.grillribid" -> pre-cooked
  ["seaväl", "seavälisfileest"], // "seaväl.RAKVERE" -> pork outer fillet
  // "jahutatud" (chilled) restates a fact already true by default —
  // the absence of "külmutatud" (frozen, never touched by this list)
  // already means fresh, so one store bothering to say "jahutatud"
  // and another not must never block on its own. Frozen vs fresh
  // itself must always keep blocking — that's "külmutatud" surviving
  // untouched as a real descriptor.
  ["jahutatud", ""],
  // "Marinated in X" (marinaadis/marineeritud) is a generic filler
  // word — real distinguishing power is the flavour itself ("punases
  // marinaadis" vs "mustikamarinaadis"), which stays untouched as its
  // own descriptor either way, so dropping the generic word can never
  // make two different marinades (or a marinated and a plain item)
  // collide. See also the "marin" suffix pattern below, for a flavour
  // word compounded directly onto "marin." with no separator
  // ("mustikamarin.").
  ["marinaadis", ""],
  ["marineeritud", ""],

  // --- Abbreviation-matching round (roadmap step 8) ---
  // Each entry verified by hand against a real cross-store pair from
  // data/review.md's "possible matches to check by hand" for the
  // low-match categories (Chips, Tea, Pasta, Frozen, Ice cream, Fish,
  // Pet food, Baby food): only wording differences that never signal
  // a real product difference. Anything in doubt (a ridged/textured
  // variant, a quality tier, a quick-cook line, "purutee" vs "tee",
  // organic wording, a life-stage label) was deliberately left alone
  // for the owner to decide, not normalized.
  // Spelling / grammatical variants of one word
  ["original", "originaal"], // kept as the Estonian spelling, the display language
  ["till", "tilli"], // dill: "hapukoore/till" vs "hapukoore-tilli"
  ["jätkup", "jätkupiimasegu"], // Rimi's "Jätkup.segu" (follow-on formula)
  ["mikropopcorn", "mikropopkorn"], // kept as the Estonian spelling
  ["seakrõps", "seakrõpsud"],
  ["rigatte", "rigate"], // Rimi's own misspelling of the ridged-pasta word
  ["lintspagetid", "lintspagett"],
  ["vürtskilufilee", "vürtsikilufilee"],
  ["tšill", "tšilli"],
  ["surimist", "surimi"], // elative case
  ["hõbeheik", "heik"], // silver hake is hake
  ["mustasõstra", "mustsõstra"], // blackcurrant, with/without the linking vowel (only ever seen once the "maits" suffix below is gone)
  ["kassidele", "kassi"], // for cats / cats' / cat's
  ["kasside", "kassi"],
  ["koeramaiused", "koeramaius"],
  ["vähesoolatud", "vähesoolane"], // lightly salted, participle vs adjective
  // Abbreviations (a store's own shorthand, usually period-marked)
  ["rohel", "roheline"],
  ["hapuk", "hapukoore"],
  ["tomatikast", "tomatikastmes"],
  ["vähes", "vähesoolane"],
  ["küüslaugumar", "küüslaugumarinaadis"],
  ["pr", "praetud"],
  ["glas", "glasuuris"],
  ["jogurtigl", "jogurtiglasuuris"],
  ["šoko", "šokolaadi"],
  ["šokol", "šokolaadi"],
  ["šok", "šokolaadi"],
  // Barbora's "Külm." is EXPANDED to the full word, never dropped —
  // frozen vs fresh must keep blocking in Meat/Fish, where Barbora
  // uses the same abbreviation on a frozen cut. The categories where
  // everything is frozen by definition drop it as an implied word
  // instead (see impliedDescriptors in scraper/categories.js).
  ["külm", "külmutatud"],
  ["jah", ""], // "jahutatud", already dropped above
  ["mar", ""], // "marinaadis", already dropped above
  // Translations
  ["anchovy", "anšoovis"],
  ["black", "must"],
  ["sarvekesed", "chifferini"], // Estonian "little horns" is the same elbow pasta shape
  ["sarveke", "chifferini"],
  // Potato chips — every store's own word for the same thing, plus
  // Selver's own one-letter typo "kartuliaastud" (seen next to its
  // correctly spelled "kartulilaastud" on sibling items).
  ["krõpsud", "kartulikrõpsud"],
  ["kartulikrõps", "kartulikrõpsud"],
  ["kartulilaastud", "kartulikrõpsud"],
  ["kartuliaastud", "kartulikrõpsud"],
  // Leftover fragments that never carry real distinguishing weight.
  // (A bare unit letter — the "g" of Rimi's "675g/360g" dual size or
  // the "k" of an age marker "6k" — is NOT in this list: it's stripped
  // by the digit-adjacent pattern below instead. Dropping "g" as a
  // word was a real bug: it also erased the "G" of Barbora's
  // "Sensitivity&G" — Sensodyne Sensitivity & Gum, a different
  // toothpaste from plain Sensitivity — and matched the two.)
  ["kuud", ""],
  ["al", ""],
  ["eo", ""], // canned fish "EO" marking (easy-open lid), Kaija/Vici/Minu at Rimi and Selver
  ["asc", ""], // sustainability certification badges
  ["msc", ""],
  ["oü", ""], // company-form suffix leaking out of a brand name ("VIRU RAND OÜ")
  ["spaghetti", "spagetid"], // the Italian / singular spelling of "Spagetid" — kept as the Estonian word (not dropped) so the shape stays in the product's display name
  ["spagett", "spagetid"],
  ["spiraalid", ""], // a shape already named in Italian: fusilli are spirals,
  ["spiraal", ""], // penne are tubes, conchiglie are shells
  ["torud", ""],
  ["teokarbid", ""],
  ["specialita", ""], // Selver's "Specialità" line word on Panzani pasta
  // Alcohol (batch 9). The "% vol"/"%vol" alcohol strength leaves a
  // bare "vol" once the percent itself is read (extractFatPercent
  // reads any "N%", so 5,2% beer and 40% vodka compare the same way
  // fat % does); "alk." alone ("alk.0,0%vol") is the same leftover.
  ["vol", ""],
  ["alk", ""],
  // Eggs: "kanamunad" (hen eggs) is "munad"; free-range in every
  // spelling ("vabapidamisel", "vabapidamise", "vabalt peetavate",
  // Barbora's "vab.peet.") is one word; "kanade" (of hens) adds nothing.
  ["kanamunad", "munad"],
  ["vabapidamisel", "vabapidamis"],
  ["vabapidamise", "vabapidamis"],
  ["kanade", ""],
  // The letters of an age statement ("12YO", "3 Year") — the age
  // itself is the variant (see NAMED_VARIANTS), shown as "12YO".
  ["yo", ""],
  ["year", ""],
  ["years", ""],
  // Packaging words a store abbreviates: can vs bottle stays a real
  // difference (one side saying "purk" and the other nothing never
  // matches — see the note above DESCRIPTOR_WORD_NORMALIZATIONS), but
  // the same can must not fail on spelling.
  ["prk", "purk"],
  ["pdl", "pudel"],
  ["plastpudel", "pet"],
  // English/other spellings of the spirit and drink types Barbora,
  // Rimi and Selver mostly write in Estonian — the Estonian word is
  // kept (not dropped) so the type stays in the display name.
  ["vodka", "viin"],
  ["whisky", "viski"],
  ["whiskey", "viski"],
  ["rum", "rumm"],
  ["dzinn", "gin"],
  ["džinn", "gin"],
  ["cognac", "konjak"],
  ["brändi", "brandy"],
  ["liqueur", "liköör"],
  ["likoor", "liköör"],
  ["cider", "siider"],
  ["beer", "õlu"],
  ["wine", "vein"],
];

// The whole-word list above as regexes. Unicode-aware word boundary —
// a plain \b treats a leading/trailing diacritic (ö, õ, ä, ü, š) as
// "not a word character", so it fails to bound a word like "öko" at
// all; this checks for an adjacent letter directly instead, the same
// way `u`+`\p{L}` is used elsewhere in this file. Also used alone by
// displayWordMap: a store's word that only differs from the descriptor
// by one of these spellings/translations is shown as the store wrote
// it; a suffix strip ("-maitseline") is not undone.
const WORD_NORMALIZATION_REGEXES = DESCRIPTOR_WORD_NORMALIZATIONS.map(([pattern, replacement]) => ({
  regex: new RegExp(`(?<![\\p{L}])${pattern}(?![\\p{L}])`, "giu"),
  replacement,
}));

const DESCRIPTOR_NORMALIZATION_PATTERNS = [
  // "-flavoured" as a SUFFIX fused onto the flavour word, in every
  // spelling a store abbreviates it to — "juustumaitseline",
  // "juustumaitselised", "juustumaitsel.", "ketšupimaits.",
  // "pitsamait." — all stripped down to the flavour word itself
  // ("juustu", "ketšupi", "pitsa"), which is the part that actually
  // distinguishes anything; a bare standalone "maitseline"/"maits."
  // (nothing fused in front) strips to nothing for the same reason.
  // Runs BEFORE the whole-word list, so a word that only exists once
  // the suffix is gone ("mustasõstra") can still be normalized there.
  // Never touches "maitsestamata"/"maitsestatud"/"maitseaine": those
  // continue with a letter after "maits", which the lookahead rejects.
  { regex: /mait(?:s(?:elised|eline|el)?)?(?![\p{L}])/giu, replacement: "" },
  // A unit or age-marker letter still attached to a digit once the
  // main size is blanked — the second half of Rimi's "675g/360g" or
  // "230g/470ml" dual size, Selver's "4 x 100 g" spelled-out multipack,
  // an age marker "6k"/"0K+" — is never a word. Only when a digit
  // precedes it: a bare letter after anything else ("Sensitivity&G",
  // "&G" = "& Gum") is an abbreviation and stays a real descriptor.
  { regex: /(?<=\d)\s*(?:kg|ml|cl|g|l|k)(?![\p{L}])/giu, replacement: "" },
  // The year form of the same age marker ("1A" = from 1 year, Coop;
  // "al.2a", Barbora) — fused to the digit only, so a spaced "2 a"
  // or any word is never touched.
  { regex: /(?<=\d)a(?![\p{L}])/giu, replacement: "" },
  // "Alcohol-free" in every abbreviation the three stores use —
  // "Alk.vaba", "Alk. Vaba", "Alkovaba", "Alk.v.", "Al.vaba",
  // "Alkoh. vaba" — all meet at the full word, so the same
  // alcohol-free beer isn't two products over a period. Runs before
  // the whole-word list, whose "alk" -> "" would otherwise eat the
  // prefix first.
  { regex: /(?<![\p{L}])(?:alk(?:oh(?:oli)?)?|al)\.?\s*v(?:aba|\.)|alkovaba/giu, replacement: "alkoholivaba" },
  // "Hele õlu" (pale beer) is Barbora's and Selver's habitual TYPE
  // phrase on a lager ("Hele õlu SAKU Kuld", "Hele õlu Kuld, SAKU")
  // that Rimi writes as plain "Õlu" — the phrase drops to "õlu". A
  // product's OWN "Hele" ("Õlu Saku Hele", "Hele õlu Saku Hele") is
  // not in that phrase position and stays a real word, so Saku Hele
  // keeps its name and never matches Saku Kuld. (Making "hele" an
  // implied word instead erased the name: first scrape showed "Saku
  // pudel 5.2% 500ml".)
  { regex: /(?<![\p{L}])hele\s+õlu(?![\p{L}])/giu, replacement: "õlu" },
  { regex: /(?<![\p{L}])(?:vab\.\s*peet\.|vabalt\s+peetavate)/giu, replacement: "vabapidamis" },
].concat(WORD_NORMALIZATION_REGEXES).concat([
  // "marin" also needs to strip as a SUFFIX on a flavour word
  // compounded directly onto it with no separator, Barbora's own
  // style ("Grill-liha mustikamarin. RAKVERE,500g" -> flavour word
  // "mustika" + "marin.") — no left-boundary check, unlike every
  // other entry above, specifically to catch that compound. The
  // flavour word itself is untouched either way (see the plain
  // "marinaadis"/"marineeritud" entries above for why that's safe).
  { regex: /marin(?![\p{L}])/giu, replacement: "" },
]);

// What's left of a packaged product's name once the known parts —
// brand, size, fat % — are removed: almost always flavour ("kirsi-
// ploomi", "stracciatella") or another describing word ("naturaalne",
// "soolata"). Two items with the same brand and size but different
// leftover words are a different product, the same principle as
// produce's variety — see sameBrandedProduct.
// `impliedWords`: words a category declares as true of every item in
// it (see impliedDescriptors in scraper/categories.js — "külmutatud"
// in the frozen categories, "makaronid"/"pasta" in Pasta, ...), so one
// store stating it and another not can never block a match there.
// Applied after normalization, whole-word, and only for the category
// that opted in — the same word stays a real descriptor everywhere
// else (frozen vs fresh in Meat/Fish).
function extractDescriptors(name, brand, impliedWords = [], options = {}) {
  const words = descriptorWordList(name, brand, impliedWords, options);
  return words.length > 0 ? [...words].sort().join(" ") : null;
}

// The same words in the ORDER the store wrote them (unique, normalized)
// — kept on the signature as `descriptorOrder` for the display name
// only; matching compares the sorted form above.
function descriptorWordList(name, brand, impliedWords = [], options = {}) {
  let text = stripQualityGrade(name);

  if (brand) {
    const brandPattern = new RegExp(`\\b${escapeRegExp(brand).replace(/\s+/g, "\\s+")}\\b`, "gi");
    text = text.replace(brandPattern, " ");

    for (const abbreviation of BRAND_ABBREVIATIONS[brand.toLowerCase()] || []) {
      const abbreviationPattern = new RegExp(`\\b${escapeRegExp(abbreviation)}\\b`, "gi");
      text = text.replace(abbreviationPattern, " ");
    }

    // A leftover word that's already part of the brand itself (e.g.
    // "Saaremaa" when the real brand is "MO Saaremaa", "Originaal"
    // when it's "Värska Originaal") restates something already known
    // from `brand` — not a real distinguishing detail. Whole-word
    // only, so this never touches an unrelated word that merely
    // shares a substring with the brand.
    const brandWords = new Set(brand.toLowerCase().match(/\p{L}+/gu) || []);
    if (brandWords.size > 0) {
      text = text.replace(/\p{L}+/gu, (word) => (brandWords.has(word.toLowerCase()) ? " " : word));
    }
  }

  const fatMatch = text.match(FAT_PERCENT_PATTERN);
  if (fatMatch) {
    text = text.slice(0, fatMatch.index) + " " + text.slice(fatMatch.index + fatMatch[0].length);
  }

  const size = matchSize(text, options);
  if (size) {
    text = text.slice(0, size.index) + " " + text.slice(size.index + size.raw.length);
  }

  // A fat % the item already states as 0.05 or lower makes "rasvatu"
  // (fat-free) redundant — restating a fact the number already
  // proves, not a real distinguishing detail.
  const fatPercent = extractFatPercent(name);
  if (fatPercent !== null && parseFloat(fatPercent) <= 0.05) {
    text = text.replace(/(?<![\p{L}])rasvatu(?![\p{L}])/giu, " ");
  }

  // A multipack size ("6x330ml") already proves this is a pack —
  // "pakk" restates that the same way "rasvatu" restates an
  // already-stated fat %. Not "purk"/"prk" (can vs bottle) — a real
  // packaging-material difference belongs in data/products.json, not
  // here.
  const sizeValue = extractSize(name);
  if (sizeValue && sizeValue.includes("x")) {
    text = text.replace(/(?<![\p{L}])pakk(?![\p{L}])/giu, " ");
  }

  for (const { regex, replacement } of DESCRIPTOR_NORMALIZATION_PATTERNS) {
    text = text.replace(regex, replacement);
  }

  const implied = new Set(impliedWords.map((w) => w.toLowerCase()));
  return [...new Set([...text.matchAll(/\p{L}+/gu)].map((m) => m[0].toLowerCase()))].filter((w) => !implied.has(w));
}

// For the display name (the owner's call, 2026-09-26): a descriptor is
// shown as the store itself wrote it — "Black Label", not "must
// label"; "Pinot Grigio", not "grigio pinot" — whenever the store's own
// token is a clean whole word (letters only, no abbreviation period)
// that normalizes to exactly that descriptor. An abbreviation
// ("juustumaits.", "Külm.") has no clean token, so the expanded
// normalized word is shown as before. Maps normalized word -> the
// store's own lowercase word.
function displayWordMap(name, brand) {
  let text = stripQualityGrade(name);
  if (brand) {
    const brandPattern = new RegExp(`\\b${escapeRegExp(brand).replace(/\s+/g, "\\s+")}\\b`, "gi");
    text = text.replace(brandPattern, " ");
  }
  const shown = {};
  for (const token of text.split(/[\s,;()]+/)) {
    if (!/^\p{L}+$/u.test(token)) continue;
    let normalized = token.toLowerCase();
    for (const { regex, replacement } of WORD_NORMALIZATION_REGEXES) normalized = normalized.replace(regex, replacement);
    const words = normalized.match(/\p{L}+/gu) || [];
    if (words.length === 1 && !(words[0] in shown)) shown[words[0]] = token.toLowerCase();
  }
  return shown;
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

// Same reasoning as isProduceItem: the produce-type whitelist is
// skipped for strict-packaging categories, so `type` always falls
// back to the plain first-word heuristic there — the one place this
// otherwise still mattered for a strict pair is the KNOWN_BRANDS path
// in sameProduct, which requires type to agree whenever both sides
// have a recognized brand, regardless of strictPackaging.
function extractType(name, { strictPackaging = false } = {}) {
  if (!strictPackaging) {
    const matched = matchProduceType(name);
    if (matched) return matched;
  }

  // The same type-phrase fold the descriptors get ("Hele õlu SAKU
  // Kuld" is an "õlu", not a "hele") — otherwise the first word "Hele"
  // became the display name's type word ("Corona Hele extra pudel").
  const word = firstWord(stripLeadingAgeMarker(stripQualityGrade(name)).replace(TYPE_PHRASE_FOLD, "õlu"));
  return word ? word.toLowerCase() : null;
}

const TYPE_PHRASE_FOLD = /(?<![\p{L}])hele\s+õlu(?![\p{L}])/giu;

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
// Barbora sometimes runs the (all-caps) brand straight onto the word
// before it: "Imiku piimasegu ComfortHIPP 300g" — one token, so
// neither the brand pattern nor the "comfort" variant rule can see
// either half. Real wrong match found reviewing the first Coop
// scrape: with "Comfort" invisible, this listing matched Coop's HiPP
// Anti Reflux 300g. Split only when the store-stated brand appears in
// capitals directly after a lowercase letter — never case-insensitive
// (brand "Alma" inside "Palma" must stay one word).
function splitFusedBrand(name, brand) {
  if (!brand || brand.length < 3) return name;
  const upper = brand.toUpperCase();
  if (upper === brand.toLowerCase()) return name;
  return name.replace(new RegExp(`(\\p{Ll})(${escapeRegExp(upper)})(?![\\p{L}])`, "gu"), "$1 $2");
}

function computeSignature(item) {
  const name = splitFusedBrand(item.name, item.brand);
  const sizeOptions = { pieceCounts: item.pieceCountSizes === true };
  // In the piece-count categories a brand found by the KNOWN_BRANDS
  // list (Barbora prints no brand field on its Dava eggs) is stripped
  // from the descriptors the way a store-stated brand is — otherwise
  // "dava" stayed a descriptor on one side only. Kept to these
  // categories so no other category's matches move.
  const descriptorBrand = item.brand || (sizeOptions.pieceCounts ? extractKnownBrand(name) : null);
  const strictPackaging = item.strictPackaging === true;
  return {
    ean: isValidEan(item.ean) && !isInternalEanPrefix(item.ean) ? String(item.ean).trim() : null,
    isProduce: isProduceItem(name, { strictPackaging }),
    hasBrand: hasKnownBrand(name),
    type: extractType(name, { strictPackaging }),
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
    // Diapers & baby wipes: the size a shopper compares is the piece
    // count ("96tk"), never a weight — the only weight in a diaper's
    // name is the baby's weight range ("12-17kg"), which extractSize
    // used to read as a 17kg pack. Real bug found on the product
    // screen: data/prices.json carried size "17000g" and the page
    // showed a nonsense €/kg line. Written to prices.json by
    // toStoreEntry, priced per piece by frontend/pricing.js.
    size: item.diaperMatching === true ? diaperPieceCountSize(name) : extractSize(name, sizeOptions),
    variant: extractVariant(name, { ...sizeOptions, brand: item.brand || null }),
    // Checked against the raw name, not the stripped/produce-typed
    // text — applies the same way on the brand path and the produce
    // path. See IDENTITY_QUALIFIER_PATTERNS.
    qualifiers: extractQualifiers(name),
    colors: extractColors(name),
    fatPercent: extractFatPercent(name),
    descriptors: extractDescriptors(name, descriptorBrand, item.impliedDescriptors || [], sizeOptions),
    // Display only — see synthesizeCanonicalName.
    descriptorOrder: descriptorWordList(name, descriptorBrand, item.impliedDescriptors || [], sizeOptions),
    // Set by the caller per category (Dairy, Household) — see matchSize.
    pieceCountSizes: item.pieceCountSizes === true,
    descriptorShown: displayWordMap(name, item.brand),
    // Kept on the signature only for synthesizeCanonicalName, so the
    // display name's type word gets the same treatment descriptors do.
    impliedDescriptors: item.impliedDescriptors || [],
    // Set by the caller (fetch-price.js) per category, not guessed
    // here — see sameBrandedProduct. Off by default so this never
    // changes behavior for a category that hasn't opted in.
    strictPackaging,
    // Set by the caller per category (currently just Meat) — see
    // sameBrandedProduct. Off by default so this never changes
    // behavior for a category that hasn't opted in.
    matchAcrossWeights: item.matchAcrossWeights === true,
    // Set by the caller per category (currently just Fish & seafood) —
    // narrows matchAcrossWeights to per-kg listings only, see
    // sameBrandedProduct. Off by default.
    fixedWeightMustMatch: item.fixedWeightMustMatch === true,
    // Set by the caller per category (Beer & cider, Wine, Spirits and
    // the alcohol-free drinks — batch 9): the alcohol strength ("5,2%",
    // "40%") is read by extractFatPercent like a fat %, and under this
    // flag ONE side leaving it out is tolerated (Selver never prints
    // it) while two stated values must still agree; the vintage year
    // must agree too. Off by default — nothing changes elsewhere.
    alcoholMatching: item.alcoholMatching === true,
    vintage: extractVintage(name),
    // Set by the caller per category (currently just Diapers & baby
    // wipes) — see sameDiaperProduct. Off by default so this never
    // changes behavior for a category that hasn't opted in; the other
    // diaper-specific fields below are cheap to always compute and are
    // only ever consulted when this is true.
    diaperMatching: item.diaperMatching === true,
    diaperSize: extractDiaperSize(name),
    diaperPieceCount: extractDiaperPieceCount(name),
    diaperMultipack: isDiaperMultipack(name),
    isDiaperWipe: DIAPER_WIPE_PATTERN.test(name),
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

// A normalized size in the "NxSIZE" shape (e.g. "2x500g", "6x330ml")
// — the same multipack shape normalizeSizeValue produces. Meat's
// relaxed weight matching (see sameBrandedProduct) still must never
// fold a multipack into a single pack, the same principle Drinks
// already relies on via plain size equality.
function isMultipack(size) {
  return typeof size === "string" && /^\d/.test(size) && size.includes("x");
}

// Two spellings of one brand are one brand: Selver's "TORUSIIL" is
// Barbora's and Rimi's "TORU-SIIL", "A.Le Coq" is "A. Le Coq" — the
// hyphens, periods and spaces a store's brand field happens to carry
// are not part of the brand. Found because Torusiil 1 l, sold at all
// three stores, never matched (2026-09-26).
function brandKey(brand) {
  return String(brand).toLowerCase().replace(/[\s.\-–'’]/g, "");
}

function sameBrandedProduct(sigA, sigB) {
  if (!sigA.brand || !sigB.brand || brandKey(sigA.brand) !== brandKey(sigB.brand)) return false;

  if (sigA.matchAcrossWeights && sigB.matchAcrossWeights) {
    // Meat: cheapest is decided by per-kg price (see storeUnitPrice in
    // fetch-price.js), not pack price, so the pack weight itself isn't
    // part of a meat product's identity — a 400g pack, a 500g pack,
    // and a "sold per kg" listing (no weight in the name at all, size
    // null) of the same real cut/brand/marinade are the same product.
    // A multipack is the one exception: "2x500g" is a genuinely
    // different purchase from a single pack, even at the same brand
    // and per-unit weight — never folded together.
    if (isMultipack(sigA.size) !== isMultipack(sigB.size)) return false;
    // Fish & seafood (the owner's call, abbreviation round): a fixed-
    // weight pack or tin only ever matches an equal weight — a 190g tin
    // of sprats is not a 240g tin. Only a per-kg listing (no size in
    // the name at all) may still match across weights, the way fresh
    // fish is sold. Meat keeps the fully relaxed rule above — its
    // 400g/500g/per-kg decision was the owner's own, separately.
    if (sigA.fixedWeightMustMatch && sigB.fixedWeightMustMatch && sigA.size && sigB.size && sigA.size !== sigB.size) {
      return false;
    }
  } else if (!sigA.size || !sigB.size || sigA.size !== sigB.size) {
    return false;
  }

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
    if (sigA.alcoholMatching && sigB.alcoholMatching) {
      // Alcohol: the strength is compared when both stores print it
      // (4,5% is not 5,2%; 37,5% is not 40%) — but Selver prints it on
      // nothing, so a one-sided value alone doesn't block: the brand,
      // size, every remaining word and the vintage still have to
      // agree. An alcohol-free "0,0%" listing can never reach here
      // against its alcoholic twin: they're scraped into different
      // categories, and within one pool 0,0% ≠ 5%.
      if (sigA.fatPercent !== null && sigB.fatPercent !== null && sigA.fatPercent !== sigB.fatPercent) return false;
      if ((sigA.vintage === null) !== (sigB.vintage === null)) return false;
      if (sigA.vintage !== null && sigA.vintage !== sigB.vintage) return false;
    } else {
      if ((sigA.fatPercent === null) !== (sigB.fatPercent === null)) return false;
      if (sigA.fatPercent !== null && sigA.fatPercent !== sigB.fatPercent) return false;
    }

    // Descriptors (flavour, or another describing word) work the same
    // way variant does above: both sides having nothing left over is
    // a plain product on both sides, which is fine; one side having
    // something the other doesn't, or a different something, isn't.
    if ((sigA.descriptors === null) !== (sigB.descriptors === null)) return false;
    if (sigA.descriptors !== null && sigA.descriptors !== sigB.descriptors) return false;
  }

  return true;
}

// Diapers & baby wipes: the owner's explicit rule is "size number and
// piece count must both agree" — neither is the generic brand/size
// pair the rest of this file extracts (the stated weight, e.g.
// "9-14kg", is a RANGE that differs slightly by brand for what's
// really the same size tier, and is never the purchasing unit; the
// piece count, e.g. "44tk", is). Kept fully separate from every other
// category's matching (see sameDiaperProduct/computeSignature's
// diaperMatching flag) rather than bent into the generic size/variant
// fields, since diapers' own shape (a size digit AND a piece count,
// both potentially absent or fused to a neighbouring word) doesn't
// fit either.
//
// Piece count: the LAST "Ntk" in the name. Usually the only one, but
// a multipack states its per-box count earlier too (Barbora's own
// HULGI/wholesale listings, "4tk, PAMPERS, 4 x 52 tk") — the final
// number is the one a shopper actually compares.
const DIAPER_PIECE_COUNT_PATTERN = /(\d+)\s*tk\b/gi;

function extractDiaperPieceCount(name) {
  const matches = [...name.matchAll(DIAPER_PIECE_COUNT_PATTERN)];
  return matches.length > 0 ? matches[matches.length - 1][1] : null;
}

// A multipack of the piece-count unit itself ("3 x 48tk", "4x52tk") —
// never the same purchase as a single pack even when the per-box
// count happens to extract identically (both "48tk" e.g.), the same
// principle isMultipack already applies to a weight-based size.
const DIAPER_PIECE_MULTIPACK_PATTERN = /\d+\s*x\s*\d+\s*tk\b/i;

function isDiaperMultipack(name) {
  return DIAPER_PIECE_MULTIPACK_PATTERN.test(name);
}

// Diaper size (e.g. "S4", "suurus 4", "nr 5", a bare "Extra Care 3"),
// tried in order of how explicit/reliable the signal is:
// 1. An explicit "S"/"s" immediately followed by the digit(s) — "S5",
//    "S 5", "s3,". The most common real form across all three stores.
// 2. "suurus N" / "nr N" — spelled out, mostly GRØN BALANCE/MUUMI.
// 3. A digit fused directly onto the preceding word with no space
//    (Barbora's own abbreviation style, "ExtraCare3", "ExtraCare5")
//    identified by what follows it — a weight range, with or without
//    its own separating space ("ExtraCare5 12-17kg", "kg" itself
//    matched loosely since Barbora sometimes runs it straight into
//    the piece count with no space either, "17kg34tk").
// 4. A final bare standalone 1-2 digit fallback, once whatever's
//    already been extracted (S-prefix cases won't reach here) doesn't
//    apply — guarded the same way extractVariant's stage-number guess
//    is (not part of a decimal/percent/plus/another digit run, not
//    immediately followed by a letter or "tk").
const DIAPER_SIZE_PATTERNS = [
  /\bs\s?(\d{1,2})\b/i,
  /\b(?:suurus|nr\.?)\s*(\d{1,2})\b/i,
  // The space before the weight range is required: Coop's "Girl12-17kg"
  // fuses the RANGE onto the word, and without it the "1" of "12" was
  // read as the size ("S1" on the screen for a size-5 box).
  /[a-zA-Z](\d{1,2})(?=\s\d+(?:[.,]\d+)?\s*-\s*\d+(?:[.,]\d+)?\s*\+?\s*kg(?![a-zA-Z]))/i,
];
const DIAPER_SIZE_FALLBACK_PATTERN = /(?<![\d.,-])\b(\d{1,2})\b(?!\s*(?:[.,]\d|%|\+|tk\b))(?![a-zA-Z])(?!-)/i;

function extractDiaperSize(name) {
  for (const pattern of DIAPER_SIZE_PATTERNS) {
    const match = name.match(pattern);
    if (match) return match[1];
  }
  const fallback = name.match(DIAPER_SIZE_FALLBACK_PATTERN);
  return fallback ? fallback[1] : null;
}

// Same brand, same product TYPE (a wipe is never a diaper even under
// the same brand — Pampers sells both), same piece-count/multipack
// shape, and — for actual diapers, not wipes, which carry no size
// number at all — the same size. A diaper with no size number found
// on either side (a newborn "vastsündinule" listing with only a
// weight, never an S-number) still has to agree on everything else;
// it just isn't blocked on a size neither side states.
function sameDiaperProduct(sigA, sigB) {
  if (!sigA.brand || !sigB.brand || brandKey(sigA.brand) !== brandKey(sigB.brand)) return false;
  if (sigA.isDiaperWipe !== sigB.isDiaperWipe) return false;
  if (sigA.diaperMultipack !== sigB.diaperMultipack) return false;
  if (sigA.diaperPieceCount === null || sigB.diaperPieceCount === null || sigA.diaperPieceCount !== sigB.diaperPieceCount) {
    return false;
  }

  if (!sigA.isDiaperWipe) {
    if ((sigA.diaperSize === null) !== (sigB.diaperSize === null)) return false;
    if (sigA.diaperSize !== null && sigA.diaperSize !== sigB.diaperSize) return false;
  }

  return true;
}

// A wet-wipe product's name always contains "salv" as a word start
// ("salvrätik", the abbreviated "salv."/"salv.r.") — checked against
// every real Barbora/Rimi/Selver wipe name found by hand. Diapers
// never do.
const DIAPER_WIPE_PATTERN = /\bsalv/i;

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

  const ean = eanVerdict(sigA, sigB, a.name, b.name);
  if (ean === "same") return true;
  if (ean === "conflict") return false;

  // Checked before either path's own rules, and after EAN (a matching
  // barcode is definitive regardless) — a qualifier disagreement means
  // a genuinely different product no matter which path the rest of
  // the comparison would otherwise take.
  if (sigA.qualifiers !== sigB.qualifiers) {
    return false;
  }

  // Diapers & baby wipes: brand/size/variant/produce — none of the
  // rules below apply to this category, which has its own identity
  // (see sameDiaperProduct's own comment for why).
  if (sigA.diaperMatching && sigB.diaperMatching) {
    return sameDiaperProduct(sigA, sigB);
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

// The display-name counterpart of extractDescriptors' normalization:
// one raw first word, abbreviations expanded/dropped the same way, and
// gone entirely if the category declares it implied. Returns "" when
// nothing meaningful is left.
// Type words whose ORIGINAL spelling is shown in a display name even
// though matching reduces or drops them: "Röstsai" (matching reads it
// as "röst") and "Mineraalvesi" (matching drops it as noise) — a
// shopper reading "Leibur Röst" or "Värska originaal 1500ml" is worse
// off. Every other type word is normalized exactly the way descriptor
// words are, so it de-duplicates against them ("Šokolaadimaitseline"
// -> "šokolaadi", "Hõbeheik" -> "heik", "Jah." -> nothing) — both
// found by hand reviewing every name this touches.
const TYPE_WORD_KEEP = new Set(["röstsai", "mineraalvesi"]);

function normalizeTypeWord(type, impliedWords = []) {
  let text = type || "";
  for (const { regex, replacement } of DESCRIPTOR_NORMALIZATION_PATTERNS) {
    text = text.replace(regex, replacement);
  }
  const implied = new Set(impliedWords.map((w) => w.toLowerCase()));
  return [...text.matchAll(/\p{L}+/gu)]
    .map((m) => m[0].toLowerCase())
    .filter((w) => !implied.has(w))
    .join(" ");
}

// Real bug found reviewing the first Diapers & baby wipes scrape: the
// generic naming below reaches for the generic `size` field (a plain
// weight/volume like "500g"), which for a diaper is whatever the
// stated weight RANGE happened to extract as (e.g. "17kg" out of
// "12-17kg") — not a real product fact, producing nonsense names like
// "Pampers Püksmähkmed 15000g" or "Pampers Püksmähkmed 44" (a bare
// piece count with no unit). Diapers' real identity is size + piece
// count (see sameDiaperProduct); the display name uses exactly those,
// never the generic size/variant fields.
function diaperPieceCountSize(name) {
  const count = extractDiaperPieceCount(name);
  return count === null ? null : `${count}tk`;
}

// The words of a diaper/wipe name that are NOT its identity fields
// (brand, type, size, count, weight range) and NOT filler — what's
// left is the product line ("Premium Care", "Little Movers", "Extra
// Care", "Jumbo Pack") and, when stated, Boy/Girl. Barbora abbreviates
// the line heavily ("PC", "JP", "Prem.Care", "ExtraCare5"); every
// expansion here was read off a real pair where the other store
// spells it out. Returns capitalized words in the name's own order.
const DIAPER_LINE_EXPANSIONS = {
  pc: "Premium Care", prem: "Premium", pr: "Premium", car: "Care",
  jp: "Jumbo Pack", jumb: "Jumbo", gp: "Giant Pack", mp: "Mega Pack",
  vp: "Value Pack", mb: "Monthly Box", extracare: "Extra Care",
  sens: "Sensitive", pf: "Plastic Free", allovercl: "All Over Clear",
  poistele: "Boy", tüdrukutele: "Girl",
};
const DIAPER_NOISE_WORDS = new Set([
  "püksmähkmed", "püksmähkm", "püksmähk", "püksmäh", "mähkmed", "mähkm", "mähk", "mäh", "tavamähkmed",
  "pants", "diapers", "hulgi", "niisked", "niisk", "niis", "salvrätikud", "salvrätik", "salvrätid", "salvr", "salv",
  "beebidele", "beebile", "univ", "tk", "kg", "k", "x", "nr", "s", "size",
  "r", // Rimi's "salv.r." (salvrätikud)
  // "for newborns" hints and Pampers' own size words — the size
  // number already says it.
  "v", "sün", "sünn", "sünnist", "vastsündinu", "vastsündinule", "newborn", "junior", "midi", "maxi",
]);

// Multi-word product-line phrases, in the order they're shown — so
// Barbora's "PC" and Selver's "Premium Care, Value Pack" both read
// "Premium Care Value Pack", never "Premium Value Pack Care". Any
// word not part of a listed phrase follows in first-seen order.
const DIAPER_LINE_PHRASES = [
  "Premium Care", "Extra Care", "Little Movers", "Active Baby", "Harmonie", "Overnights",
  "Jumbo Pack", "Giant Pack", "Mega Pack", "Value Pack", "Monthly Box",
  "All Over Clear", "Aqua Soft Touch", "Sensitive", "Plastic Free", "Pure", "Water",
];

function diaperLineWords(name, brand) {
  const brandWords = new Set((brand || "").toLowerCase().match(/\p{L}+/gu) || []);
  const words = [];
  for (const m of name.matchAll(/[\p{L}\p{N}&]+/gu)) {
    const raw = m[0].toLowerCase();
    if (/^\d/.test(raw)) continue; // sizes, counts, weight ranges
    if (/^s\d{1,2}$/.test(raw)) continue; // "S5"
    const stripped = raw.replace(/\d+$/, ""); // "extracare5", "comfort2"
    if (!stripped || brandWords.has(stripped) || DIAPER_NOISE_WORDS.has(stripped)) continue;
    const expanded = DIAPER_LINE_EXPANSIONS[stripped] || stripped;
    for (const w of expanded.split(" ")) {
      const cap = w === "&" ? "&" : capitalize(w);
      if (!words.includes(cap)) words.push(cap);
    }
  }
  return words;
}

// "Pampers Premium Care Püksmähkmed S5 34tk", "Huggies Little Movers
// Püksmähkmed S5 48tk Boy", "Pampers Sensitive Niisked salvrätikud
// 52tk" — brand, product line, type, size, piece count, Boy/Girl. The
// line is read from whichever store spells it out most (both items'
// words, longest list first), so Barbora's "PC S5 34tk" and Selver's
// "Premium Care, Value Pack S5" meet at one name. Never a weight.
function synthesizeDiaperName(sigA, sigB, restSigs = []) {
  const sigs = [sigA, sigB, ...restSigs];
  const brand = sigA.brand || sigB.brand || "";
  const namesLower = sigs.map((s) => s.nameLower).filter(Boolean);
  const kind = sigA.isDiaperWipe ? "Niisked salvrätikud" : namesLower.some((n) => /püksmähk|pants/.test(n)) ? "Püksmähkmed" : "Mähkmed";
  const size = sigA.diaperSize ?? sigB.diaperSize;
  const count = sigA.diaperPieceCount ?? sigB.diaperPieceCount;

  // Every line word any store states, once, then known phrases in
  // their fixed order and the rest as first seen.
  const tokens = [];
  for (const sig of sigs) {
    for (const w of diaperLineWords(sig.nameLower || "", brand)) if (!tokens.includes(w)) tokens.push(w);
  }
  const gender = tokens.filter((w) => w === "Boy" || w === "Girl");
  let leftover = tokens.filter((w) => !gender.includes(w));
  const line = [];
  for (const phrase of DIAPER_LINE_PHRASES) {
    const words = phrase.split(" ");
    if (words.every((w) => leftover.includes(w))) {
      line.push(phrase);
      leftover = leftover.filter((w) => !words.includes(w));
    }
  }
  line.push(...leftover);

  const parts = [capitalize(brand) || "Unknown", ...line, kind];
  if (size !== null) parts.push(`S${size}`);
  if (count !== null) parts.push(`${count}tk`);
  parts.push(...gender);
  return parts.join(" ");
}

// `rest`: any further items of the same group (a 3-store product) —
// a diaper's product line is read from whichever store spells it out,
// which is often the third one.
function synthesizeCanonicalName(a, b, rest = []) {
  const sigA = signatureOf(a);
  const sigB = signatureOf(b);

  if (sigA.diaperMatching && sigB.diaperMatching) {
    return synthesizeDiaperName(sigA, sigB, rest.map(signatureOf));
  }

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
  // The type word is the raw first word of one store's name — run it
  // through the same abbreviation normalization and implied-word
  // filter descriptors get, so a display name never reads "Külm
  // seenesegu" (Barbora's frozen abbreviation, implied in a frozen
  // category) or "Pr räimed" (for "Praetud") — found reviewing the
  // abbreviation round's new matches by hand.
  const typeKey = normalizeTypeWord(type, sigA.impliedDescriptors ?? sigB.impliedDescriptors ?? []);
  const typeShown = TYPE_WORD_KEEP.has(type.toLowerCase()) ? type.toLowerCase() : typeKey;
  const typeName = typeShown && typeShown !== brand.toLowerCase() ? capitalize(typeShown) : null;
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
  const descriptorSet = descriptors
    ? descriptors.split(" ").filter((w) => w !== typeKey && w !== brand.toLowerCase())
    : [];
  // Word order and spelling as the store wrote them (the owner's call,
  // 2026-09-26): the store whose name has the fewest abbreviation
  // periods supplies the order and the shown words; a word that store
  // doesn't have (never, under strict matching) is appended sorted.
  const sigs = [sigA, sigB, ...rest.map(signatureOf)];
  const source = sigs
    .filter((s) => s.descriptors !== null && Array.isArray(s.descriptorOrder))
    .sort((x, y) => (x.nameLower.match(/\./g) || []).length - (y.nameLower.match(/\./g) || []).length)[0] || sigA;
  const ordered = (source.descriptorOrder || []).filter((w) => descriptorSet.includes(w));
  const descriptorWords = [...ordered, ...descriptorSet.filter((w) => !ordered.includes(w)).sort()];
  // An egg's or paper's size letter (M, L, XL) reads as a letter, not
  // a lowercase word — piece-count categories only.
  const SIZE_LETTERS = new Set(["s", "m", "l", "xl", "xxl"]);
  const shownWord = (w) => {
    const own = (source.descriptorShown && source.descriptorShown[w]) || w;
    return source.pieceCountSizes && SIZE_LETTERS.has(own) ? own.toUpperCase() : own;
  };
  const descriptorName = descriptorWords.length > 0 ? descriptorWords.join(" ") : null;
  // A stated fat/cocoa % and the identity qualifiers (organic, a
  // flour grade, a "with X") are part of what makes the product
  // itself, and were the reason two names could collide: three Kalev
  // dark chocolates (56/70/87%) all read "Kalev Tume bitter šokolaad
  // 100g" — the % is compared for matching but was never shown. The
  // qualifiers already present as a descriptor word (a "-ga" word)
  // aren't repeated; "mahe" reads as the Estonian word, a grade as
  // "T550"/"2kl".
  const fatPercent = sigA.fatPercent ?? sigB.fatPercent;
  const brandWords = new Set(brand.toLowerCase().match(/\p{L}+/gu) || []);
  const gradeQualifier = (sigA.qualifiers || sigB.qualifiers || "").split(" ").find((q) => /^t(00|405|550|812)$/.test(q));
  // "Maitselt mahe kurk" (a MILD-tasting pickle) carries the organic
  // qualifier only because "mahe" is also the Estonian word for mild
  // — the raw words already say it, so it isn't appended again.
  const mildNotOrganic = [a.name, b.name].some((n) => n && /maitselt\s+mahe/i.test(n));
  const qualifierText = (sigA.qualifiers || sigB.qualifiers || "")
    .split(" ")
    // A brand that happens to end in "-ga" (Selga, Corega) is read as
    // a comitative qualifier by the matcher — never repeated here.
    .filter((q) => q && !descriptorWords.includes(q) && !brandWords.has(q) && !(q === "mahe" && mildNotOrganic))
    .map((q) => (/^t(00|405|550|812)$/.test(q) ? q.toUpperCase() : q))
    .join(" ");
  // The flour grade's own stray "t" (from "T-550", "T 550") is a
  // leftover descriptor letter the grade qualifier already covers.
  const shownDescriptors = (gradeQualifier ? descriptorWords.filter((w) => w !== "t") : descriptorWords).map(shownWord);
  const shownDescriptorName = shownDescriptors.length > 0 ? shownDescriptors.join(" ") : null;
  // Named variants are internal tokens; shown in the display language
  // (Estonian) and never repeated when the word is already there.
  const VARIANT_DISPLAY = { "lactose-free": "laktoosivaba", comfort: "Comfort", ar: "AR" };
  const ageMatch = typeof variant === "string" ? variant.match(/^(\d+)yo$/) : null;
  const layerMatch = typeof variant === "string" ? variant.match(/^(\d)kih$/) : null;
  const shownVariant = variant == null ? null : ageMatch ? `${ageMatch[1]}YO` : layerMatch ? `${layerMatch[1]}-kihiline` : VARIANT_DISPLAY[variant] || variant;
  const variantText = shownVariant && !descriptorWords.includes(shownVariant.toLowerCase()) ? shownVariant : null;
  return [capitalize(brand) || "Unknown", typeName, shownDescriptorName, qualifierText || null, fatPercent ? `${fatPercent}%` : null, variantText, size]
    .filter(Boolean)
    .join(" ");
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

  const ean = eanVerdict(signatureOf(a), signatureOf(b), a.name, b.name);
  if (ean === "same") {
    return { matched: true, canonicalName: synthesizeCanonicalName(a, b), reason: "ean" };
  }
  if (ean === "conflict") {
    // The owner's rule (2026-09-26): the same barcode but names that
    // clearly disagree (size, fat %, stage) is never matched — it goes
    // to data/ean-conflicts.json for a person instead.
    return { matched: false, reason: "ean-conflict" };
  }

  if (sameProduct(a, b)) {
    return { matched: true, canonicalName: synthesizeCanonicalName(a, b), reason: "automatic" };
  }

  return { matched: false, reason: null };
}

// A real EAN/GTIN barcode: 8 or 13 digits with a correct mod-10 check
// digit. Anything else (an internal code, a typo, a 12-digit UPC we
// don't normalize) is treated as no barcode at all — Coop's own-brand
// SKUs and any mangled Selver value can then never pair on it.
function isValidEan(value) {
  if (value == null) return false;
  const digits = String(value).trim();
  if (!/^\d{8}$|^\d{13}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < digits.length - 1; i++) {
    const d = digits.charCodeAt(i) - 48;
    // From the right, the second-to-last digit is weighted 3.
    const weight = (digits.length - 1 - i) % 2 === 1 ? 3 : 1;
    sum += d * weight;
  }
  const check = (10 - (sum % 10)) % 10;
  return check === digits.charCodeAt(digits.length - 1) - 48;
}

// GS1's own "restricted circulation number" prefixes — "02", "04",
// and "20"-"29" — are reserved for a store's INTERNAL use: its own
// per-kg label for loose produce or weighed meat/deli, or (as found
// reviewing Coop's own bakery goods, 2026-09-28) a small producer's
// self-assigned code for its own shelf. These are structurally valid
// (correct check digit) but never globally unique the way a real
// manufacturer EAN is — two different stores' scales can print the
// same "27xxxxx" code for two completely different vegetables. Found
// live in the data: Selver's own per-kg codes for every loose fruit/
// veg and cut of meat (2700014000000 = its own "Avokaado kg"), and 26
// of Coop's own "Haapsalu" bakery items (02700100xxxxx). None happened
// to have decided a match yet (checked 2026-09-28: every current
// matchedVia "ean" product's barcode is a real manufacturer prefix),
// but the rule is never safe to skip — never a matching signal, name
// rules decide instead (see eanVerdict/computeSignature below).
function isInternalEanPrefix(ean) {
  const digits = String(ean).trim();
  return /^(?:02|04|2[0-9])/.test(digits);
}

// What two valid barcodes say about a pair: "same" (equal, and the
// names agree on the things a barcode can't excuse — pack size, fat %
// / strength, stage or age variant), "conflict" (equal barcode but
// those disagree — reported, never matched), or null (no shared valid
// barcode; the name rules decide). Two DIFFERENT valid barcodes decide
// nothing: the same product carries different codes at two stores
// often enough (Fazer Juuretise röst 450g: 4750212903427 at Coop,
// 4740103011256 at Selver; Diamant sugar likewise) — found when the
// old "different barcodes = different product" rule broke 65
// long-standing groups the day Coop joined.
function eanVerdict(sigA, sigB, nameA = null, nameB = null) {
  if (!sigA.ean || !sigB.ean) return null;
  if (sigA.ean !== sigB.ean) return null;
  if (sigA.size && sigB.size && !sameAmount(sigA.size, sigB.size)) {
    // One more chance before calling it a conflict: does either raw
    // name, read in full, state a number the other side's stated
    // total also equals (a gross/net pair, an unmultiplied pack
    // total, a roll/piece/sheet count, a length)? See
    // amountCandidatesOverlap's own comment for exactly what this
    // does and doesn't resolve. Only reachable when both raw names
    // were passed in (both real call sites do).
    if (!nameA || !nameB || !amountCandidatesOverlap(nameA, nameB)) return "conflict";
  }
  if (sigA.fatPercent !== null && sigB.fatPercent !== null && !sameFatPercent(sigA.fatPercent, sigB.fatPercent)) return "conflict";
  if (sigA.variant !== null && sigB.variant !== null && sigA.variant !== sigB.variant) return "conflict";
  // Diapers: the size number is the product (the owner's rule) — a
  // barcode can't excuse two stated sizes disagreeing either.
  if (sigA.diaperMatching && sigB.diaperMatching && sigA.diaperSize !== null && sigB.diaperSize !== null && sigA.diaperSize !== sigB.diaperSize) return "conflict";
  return "same";
}

// Under a shared barcode, two sizes "clearly disagree" only when the
// AMOUNT differs — not the notation: "500 g" and "500ml" (milk),
// "4x75g" and "300g" (the same four rolls), "240g" and "4*60g" are
// the same pack described two ways. Different totals (70 g vs 50 g)
// stay a conflict. Piece/roll/length counts compare as-is.
function sameAmount(sizeA, sizeB) {
  if (sizeA === sizeB) return true;
  const total = (size) => {
    const m = String(size).match(/^(?:(\d+(?:\.\d+)?)x)?(\d+(?:\.\d+)?)(g|ml)$/);
    return m ? Math.round((m[1] ? parseFloat(m[1]) : 1) * parseFloat(m[2]) * 100) / 100 : null;
  };
  const a = total(sizeA);
  const b = total(sizeB);
  return a !== null && b !== null && a === b;
}

// Every plausible "how much is really in this pack" reading of a raw
// item name — typed by kind (a weight/volume "amount" collapsed to
// g/ml, a "count" of tk/rl/lehte — piece/roll/sheet, one purchasing
// unit either way — or a bare-metre "length" for foil/baking paper)
// so two candidates only ever compare within the same kind. Used ONLY
// as a fallback in eanVerdict, once sameAmount(sigA.size, sigB.size)
// has already said the two sides disagree — a pair that already
// shares a real barcode gets one more chance to agree from what its
// OWN name actually states, before being called a conflict. Never
// read anywhere else: it can't affect the displayed `size`, ordinary
// name-based matching, or a pair that doesn't already share a
// barcode.
//
// Hand-reviewed against every real EAN conflict in the data,
// 2026-09-28 — three genuine patterns this resolves, each with a
// regression test:
// - A multipack whose "N-pakk" count and stated weight are BOTH the
//   TOTAL, not per-unit — Selver's "4-pakk, PURINA ONE, 340g" for a
//   4x85g cat-food tray. extractSize's own "N-pakk multiplies the
//   size" rule (right for Rimi's "0,5l prk 6-pakk" beer cans) reads
//   this the other way (4x340g) — the UNMULTIPLIED reading, 340, is
//   also kept as a candidate, alongside the multiplied one so nothing
//   that already matched today stops matching.
// - A gross/net, or per-item/whole-pack, PAIR OF NUMBERS stated
//   together in one name: ice cream's "1L/480g" (tub volume / net
//   weight), a jar's "720 ml, ... 630 g neto", Marine's "200g/160g" —
//   either number is a real fact about the same pack, so both become
//   candidates; nothing is inferred that isn't written down.
// - A paper/foil product's roll, piece or sheet count ("rl", "tk",
//   "lehte" are one purchasing unit for these — a napkin sheet, a
//   towel roll), or its length ("10m"), wherever in the name it
//   appears — not just the one matchSize happened to pick as the
//   primary size.
//
// Deliberately NOT resolved this way (found in the same review, left
// as conflicts, reported to a person): two numbers that are merely
// CLOSE — a coffee pad's stated "250g" against 36 pads' own "36x6.9g"
// (248.4g), a few teas' stated bag count and per-bag weight not quite
// multiplying out — those are a real rounding gap in the store's own
// label, not the same number written differently, and this function
// requires an EXACT match, never an approximate one.
const AMOUNT_TOKEN_PATTERN = /(?:(\d+(?:[.,]\d+)?)\s*[x×*]\s*)?(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|l)\b/giu;
const COUNT_TOKEN_PATTERNS = [
  /(\d+)\s*[x×*]\s*(\d+)\s*(?:tk|tük\p{L}*)\.?(?![\p{L}])/giu,
  /(\d+)\s*(?:tk|tük\p{L}*)\.?(?![\p{L}])/giu,
  /(\d+)\s*(?:rl|rul\p{L}*)\.?(?![\p{L}])/giu,
  /(\d+)\s*(?:lehte|leh\.?)(?![\p{L}])/giu,
];
const LENGTH_TOKEN_PATTERN = /(\d+(?:[.,]\d+)?)\s*m(?![\p{L}])/giu;

function toBaseAmount(rawNumber, unit) {
  const n = parseFloat(String(rawNumber).replace(",", "."));
  const u = unit.toLowerCase();
  const scaled = u === "kg" || u === "l" ? n * 1000 : u === "cl" ? n * 10 : n;
  return Math.round(scaled * 100) / 100;
}

function computeAmountCandidates(name) {
  const candidates = new Set();
  const packMatch = name.match(PACK_COUNT_PATTERN);
  const packCount = packMatch ? parseInt(packMatch[1], 10) : null;

  for (const m of name.matchAll(AMOUNT_TOKEN_PATTERN)) {
    const base = toBaseAmount(m[2], m[3]);
    candidates.add(`amount:${base}`);
    if (m[1]) candidates.add(`amount:${Math.round(parseFloat(m[1].replace(",", ".")) * base * 100) / 100}`);
    if (packCount) candidates.add(`amount:${Math.round(packCount * base * 100) / 100}`);
  }
  for (const pattern of COUNT_TOKEN_PATTERNS) {
    for (const m of name.matchAll(pattern)) {
      if (m.length > 2 && m[2] !== undefined) {
        candidates.add(`count:${parseInt(m[2], 10)}`);
        candidates.add(`count:${parseInt(m[1], 10) * parseInt(m[2], 10)}`);
      } else {
        candidates.add(`count:${parseInt(m[1], 10)}`);
      }
    }
  }
  for (const m of name.matchAll(LENGTH_TOKEN_PATTERN)) candidates.add(`length:${parseFloat(m[1].replace(",", "."))}`);
  return candidates;
}

function amountCandidatesOverlap(nameA, nameB) {
  const candidatesB = computeAmountCandidates(nameB);
  for (const candidate of computeAmountCandidates(nameA)) if (candidatesB.has(candidate)) return true;
  return false;
}

// "3.6" and "3.6-4.2" (a range one store prints in full) agree; two
// different single values don't.
function sameFatPercent(a, b) {
  if (a === b) return true;
  const low = (v) => String(v).split("-")[0];
  return low(a) === low(b) && (String(a).includes("-") || String(b).includes("-"));
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
  const eanConflicts = []; // same barcode, names that disagree — for a person

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (items[i].store === items[j].store) continue;
      const result = matchItems(items[i], items[j], overrides, knownDifferent);
      if (result.matched) {
        edges.set(`${i}-${j}`, result);
        union(i, j);
      } else if (result.reason === "ean-conflict") {
        eanConflicts.push({ a: items[i], b: items[j] });
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

  const edgeOf = (i, j) => edges.get(i < j ? `${i}-${j}` : `${j}-${i}`);

  // Is this set of indices one clean product? One item per store, and
  // every cross-store pair either matched directly or is linked
  // through a barcode: when i and j didn't pair by name but one of
  // them shares a valid EAN with a third member k that the other did
  // pair with, i and j are the same product too (Coop's names differ
  // in wording from Barbora's/Rimi's, but Coop = Selver by barcode and
  // Selver = Barbora by name). Without this, adding a store with
  // barcodes turned 526 existing groups ambiguous.
  function isCleanGroup(indices) {
    const stores = new Set(indices.map((i) => items[i].store));
    if (stores.size !== indices.length) return false;
    // A barcode core (items joined by EAN edges, transitively) is one
    // certain product: whatever pairs with any member pairs with the
    // core. Two items with no direct edge are still the same product
    // when they belong to, or pair into, one and the same core. Real
    // two-hop case: Barbora "Pizzamaitseaine" = Coop "Pizzamaitseaine"
    // by name, Coop = Selver by barcode, Selver = Rimi "Pitsamaitseaine"
    // by name — one product at four stores.
    const coreId = new Map();
    let nextCore = 0;
    for (const i of indices) {
      if (coreId.has(i)) continue;
      const members = [i];
      for (let n = 0; n < members.length; n++) for (const k of indices) if (!members.includes(k) && edgeOf(members[n], k)?.reason === "ean") members.push(k);
      if (members.length >= 2) for (const m of members) coreId.set(m, nextCore);
      if (members.length >= 2) nextCore++;
    }
    const coresOf = (i) => {
      const set = new Set();
      if (coreId.has(i)) set.add(coreId.get(i));
      for (const k of indices) if (coreId.has(k) && edgeOf(i, k)) set.add(coreId.get(k));
      return set;
    };
    for (let a = 0; a < indices.length; a++) {
      for (let b = a + 1; b < indices.length; b++) {
        const i = indices[a];
        const j = indices[b];
        if (edgeOf(i, j)) continue;
        const ci = coresOf(i);
        if (![...coresOf(j)].some((c) => ci.has(c))) return false;
      }
    }
    return true;
  }

  // A group that isn't clean but holds barcode pairs is split along
  // them: each set of items joined by EAN edges is a core; an item
  // with no barcode joins the one core it has an edge to; an item with
  // edges to two cores is undecidable and left out (ambiguous); items
  // touching no core are considered as a group of their own. Real
  // case: Barbora's "Combiotic2Bio" (stage digit fused, unreadable)
  // paired by name with BOTH of Coop's Hipp stages, while Coop's
  // barcodes tie each stage to Selver's — the barcodes settle it.
  function splitByEan(indices) {
    const parent = new Map(indices.map((i) => [i, i]));
    const find = (i) => (parent.get(i) === i ? i : find(parent.get(i)));
    let anyEan = false;
    for (const i of indices) for (const j of indices) if (i < j && edgeOf(i, j)?.reason === "ean") { anyEan = true; parent.set(find(i), find(j)); }
    if (!anyEan) return null;
    const cores = new Map();
    for (const i of indices) { const r = find(i); if (!cores.has(r)) cores.set(r, []); cores.get(r).push(i); }
    const coreList = [...cores.values()].filter((c) => c.length >= 2);
    const inCore = new Set(coreList.flat());
    const free = [];
    const leftovers = [];
    for (const i of indices) {
      if (inCore.has(i)) continue;
      const touched = coreList.filter((core) => core.some((m) => edgeOf(i, m)));
      if (touched.length === 1) touched[0].push(i);
      else if (touched.length >= 2) leftovers.push(i);
      else free.push(i);
    }
    return { cores: coreList, free, leftovers };
  }

  function emit(indices) {
    if (indices.length === 1) {
      unmatched.push(items[indices[0]]);
      return;
    }
    if (!isCleanGroup(indices)) {
      ambiguous.push({ items: indices.map((i) => items[i]) });
      return;
    }

    const groupItems = indices.map((i) => items[i]).sort((x, y) => x.store.localeCompare(y.store));

    // If any pair in the group matched via an override, that
    // override's own canonical name wins outright — a person already
    // chose it (see data/products.json), and it should never be
    // silently replaced by the synthesized guess, the way it was
    // before this: only synthesizing a name when nothing in the group
    // came from an override.
    let overrideEdge = null;
    for (let a = 0; a < indices.length && !overrideEdge; a++) {
      for (let b = a + 1; b < indices.length; b++) {
        const edge = edgeOf(indices[a], indices[b]);
        if (edge?.reason === "override") {
          overrideEdge = edge;
          break;
        }
      }
    }

    const canonicalName = overrideEdge ? overrideEdge.canonicalName : synthesizeCanonicalName(groupItems[0], groupItems[1], groupItems.slice(2));
    // "ean" when any pair in the group was decided by a shared barcode.
    const eanEdge = !overrideEdge && indices.some((i, a) => indices.slice(a + 1).some((j) => (edgeOf(i, j) || {}).reason === "ean"));
    const reason = overrideEdge ? "override" : eanEdge ? "ean" : "automatic";

    matches.push({ items: groupItems, canonicalName, reason });
  }

  for (const indices of groups.values()) {
    if (indices.length > 1 && !isCleanGroup(indices)) {
      const split = splitByEan(indices);
      if (split) {
        for (const core of split.cores) emit(core);
        if (split.free.length > 0) emit(split.free);
        if (split.leftovers.length > 1) ambiguous.push({ items: split.leftovers.map((i) => items[i]) });
        else if (split.leftovers.length === 1) unmatched.push(items[split.leftovers[0]]);
        continue;
      }
    }
    emit(indices);
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

  return { matches, unmatched, ambiguous, eanConflicts };
}

module.exports = {
  synthesizeCanonicalName,
  isValidEan,
  isInternalEanPrefix,
  eanVerdict,
  amountCandidatesOverlap,
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
