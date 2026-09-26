// "New discount" vs "permanent sale price" — the owner's rule for
// EVERY brand (2026-09-26, see CLAUDE.md's "Outlets" section): a
// discount counts as NEW only against the 30-day lowest price, never
// against the brand's own "tavahind". Found on Denim Dream: 58% of
// its whole catalogue is "on sale", and on every sale item checked
// the sale price had already been the lowest for 30+ days — a price
// that IS the price, not a discount.
//
// Two 30-day lows are read:
//   - the site's own field (Denim Dream's priceMinOf30Days, the EU
//     Omnibus figure — `item.priceMin30`), when the site has one;
//   - our own price history (scraper/price-history.js's
//     lowestPriceInWindow over the 30 days ending YESTERDAY, so
//     today's own price never counts as its own reference).
// Until our history for a link is 30 days old, the site's field
// decides alone; once it is, BOTH must agree before something is
// called new. A site with no such field: our history alone, once
// mature; before that the item is "unknown" — shown as a plain
// "Allahindlus" with no new/permanent split (the owner's rule for
// Klick, Apotheka, Euronics until 30 days of our own history exist).
//
// Pure — no I/O. Returns { status, refPrice, newPercent }:
//   status     "new" | "permanent" | "unknown"
//   refPrice   the 30-day lowest the item was judged against (null
//              when neither source has one yet)
//   newPercent the discount measured against refPrice (null unless new)

const { lowestPriceInWindow, shiftDate } = require("../../scraper/price-history.js");

const WINDOW_DAYS = 30;

function classifyDiscount(item, history, todayStr) {
  const yesterday = shiftDate(todayStr, -1);
  const link = item.link;
  const siteMin = typeof item.priceMin30 === "number" && item.priceMin30 > 0 ? item.priceMin30 : null;
  const ourPrior = link ? lowestPriceInWindow(history, link, yesterday, WINDOW_DAYS) : null;
  const firstSeen = item.firstSeen || todayStr;
  const historyMature = firstSeen <= shiftDate(todayStr, -WINDOW_DAYS);

  const siteSaysNew = siteMin !== null && item.salePrice < siteMin;
  const ourSaysNew = ourPrior !== null && item.salePrice < ourPrior;

  if (siteMin === null && !historyMature) return { status: "unknown", refPrice: null, newPercent: null };

  const refPrice = siteMin !== null ? (historyMature && ourPrior !== null ? Math.min(siteMin, ourPrior) : siteMin) : ourPrior;
  const percent = refPrice ? Math.round((1 - item.salePrice / refPrice) * 100) : null;
  // A cent's difference (111.95 vs 111.96, found on Kingitus.ee
  // 2026-09-26) is a rounding gap, not a discount — never "new" below
  // a whole percent against the 30-day low.
  const isNew = (siteMin !== null ? (historyMature ? siteSaysNew && ourSaysNew : siteSaysNew) : ourSaysNew) && percent !== null && percent >= 1;
  return { status: isNew ? "new" : "permanent", refPrice, newPercent: isNew ? percent : null };
}

module.exports = { classifyDiscount, WINDOW_DAYS };
