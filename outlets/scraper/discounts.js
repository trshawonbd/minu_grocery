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
// mature; before that, nothing is new (the conservative side — a
// missing badge, never a false one).
//
// Pure — no I/O. Returns { status, refPrice, newPercent }:
//   status     "new" | "permanent"
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

  let isNew;
  if (siteMin !== null) isNew = historyMature ? siteSaysNew && ourSaysNew : siteSaysNew;
  else isNew = historyMature ? ourSaysNew : false;

  const refPrice = siteMin !== null ? (historyMature && ourPrior !== null ? Math.min(siteMin, ourPrior) : siteMin) : historyMature ? ourPrior : null;
  const newPercent = isNew && refPrice ? Math.round((1 - item.salePrice / refPrice) * 100) : null;
  return { status: isNew ? "new" : "permanent", refPrice, newPercent };
}

module.exports = { classifyDiscount, WINDOW_DAYS };
