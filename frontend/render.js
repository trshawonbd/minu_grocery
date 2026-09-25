// Every screen of the app as DOM-building functions with no state of
// their own: index.html owns the state (data, route, query, basket)
// and calls these with it plus an `actions` object. Only a small set
// of DOM calls is used (createElement/createElementNS, appendChild,
// textContent, className, setAttribute, addEventListener, plain
// properties) so frontend/render.test.js can run the same code on a
// tiny fake document. Uses the globals of pricing.js and app-logic.js
// (loaded before this file in the page; attached to `global` in tests).

const STORE_LABELS = { barbora: "Barbora", rimi: "Rimi", selver: "Selver" };

// Coloured text labels — no logos.
function storeLabel(key) {
  return STORE_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function money(value, currency) {
  const symbol = currency === "EUR" || !currency ? "€" : currency;
  return `${value.toFixed(2)} ${symbol}`;
}

const CATEGORY_ICONS = {
  "Baby formula": "🍼", "Fruits & vegetables": "🥕", Dairy: "🥛", Bread: "🍞", Drinks: "🥤", Meat: "🥩",
  Pasta: "🍝", "Rice & grains": "🍚", "Flour & sugar": "🌾", "Cooking oil": "🫒", Cheese: "🧀",
  "Curd & cottage cheese": "🥣", "Cream & sour cream": "🍶", "Kefir & buttermilk": "🥛", Coffee: "☕",
  "Tea & cocoa": "🍵", "Cereals & oats": "🌾", "Canned food": "🥫", "Sauces & condiments": "🥫", Spices: "🌶️",
  "Jam & honey & spreads": "🍯", "Baking supplies": "🧁", Chocolate: "🍫", Candy: "🍬", Biscuits: "🍪",
  "Chips & snacks": "🥨", "Nuts, seeds & dried fruit": "🥜", "Frozen vegetables & berries": "🫐", "Ice cream": "🍦",
  "Dumplings, pizza & fries": "🍕", Sausages: "🌭", "Ham & cold cuts": "🥓", "Fish & seafood": "🐟",
  "Baby food": "🥄", "Diapers & baby wipes": "👶", "Personal care": "🧴", Household: "🧹", "Pet food": "🐾",
};

function categoryIcon(category) {
  return CATEGORY_ICONS[category] || "🛒";
}

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function button(className, text, onClick) {
  const b = el("button", className, text);
  b.type = "button";
  b.addEventListener("click", onClick);
  return b;
}

// The neutral placeholder shown whenever there's no store photo to
// hotlink (images off, no store has one, or the URL failed to load).
function neutralIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", "neutral-icon");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M6 7h12l1 13H5L6 7zm3 0V5a3 3 0 0 1 6 0v2");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.6");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  return svg;
}

// One store's photo (productImage in pricing.js), hotlinked and
// lazy-loaded, or the neutral icon. With SHOW_STORE_IMAGES off,
// productImage returns null: no <img> is created, no URL requested.
// Nothing is downloaded, saved, resized or edited.
function imageBox(product, className, onFallback) {
  const box = el("div", className);
  const pick = productImage(product);
  if (!pick) {
    box.appendChild(neutralIcon());
    return { box, pick: null };
  }
  const img = document.createElement("img");
  img.loading = "lazy";
  img.decoding = "async";
  img.alt = "";
  img.referrerPolicy = "no-referrer";
  img.addEventListener("error", () => {
    box.textContent = "";
    box.appendChild(neutralIcon());
    if (onFallback) onFallback();
  });
  img.src = pick.url;
  box.appendChild(img);
  return { box, pick };
}

function gapBadge(gapPct) {
  if (!(gapPct > 0)) return null;
  return el("span", "badge badge-gap", `up to ${Math.round(gapPct)}% cheaper`);
}

// A product card for a grid or a horizontal row: image, name, price
// range, gap badge, store count, and a quantity control for the basket.
function productCard(product, state, actions, extraBadge) {
  const card = el("div", "pcard");
  const summary = priceSummary(product);

  const open = button("pcard-open", "", () => actions.openProduct(product));
  open.appendChild(imageBox(product, "pcard-thumb").box);
  open.appendChild(el("div", "pcard-name", product.name));
  if (summary.min !== null) {
    const unit = summary.perUnit ? "/kg" : "";
    const range = summary.min === summary.max ? `${money(summary.min)}${unit}` : `${summary.min.toFixed(2)} – ${money(summary.max)}${unit}`;
    open.appendChild(el("div", "pcard-price", range));
  }
  const badges = el("div", "pcard-badges");
  const badge = extraBadge || gapBadge(summary.gapPct);
  if (badge) badges.appendChild(badge);
  badges.appendChild(el("span", "pcard-stores", `${summary.storeCount} store${summary.storeCount === 1 ? "" : "s"}`));
  open.appendChild(badges);
  card.appendChild(open);
  card.appendChild(quantityControl(product, state, actions, "small"));
  return card;
}

// "Add to basket" that turns into a − qty + stepper once added.
function quantityControl(product, state, actions, size) {
  const key = productKey(product);
  const qty = state.basket[key] || 0;
  const wrap = el("div", `qty ${size || ""}`);
  if (qty === 0) {
    wrap.appendChild(button("btn-add", "Add to basket", () => actions.setQuantity(key, 1)));
    return wrap;
  }
  wrap.appendChild(button("qty-btn", "−", () => actions.setQuantity(key, qty - 1)));
  wrap.appendChild(el("span", "qty-value", String(qty)));
  wrap.appendChild(button("qty-btn", "+", () => actions.setQuantity(key, qty + 1)));
  return wrap;
}

function updatedLine(state) {
  const line = el("div", "update-status" + (state.stale ? " stale" : ""));
  if (state.updatedAt) {
    line.textContent = `Updated: ${state.updatedAt}${state.stale ? " — data may be out of date" : ""}`;
  }
  return line;
}

function searchBar(state, actions, autofocus) {
  const form = el("div", "searchbar");
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Search products, e.g. piim, oun, kohv";
  input.value = state.query || "";
  input.setAttribute("aria-label", "Search products");
  input.addEventListener("input", () => actions.setQuery(input.value));
  form.appendChild(input);
  if (autofocus && typeof input.focus === "function") setTimeout(() => input.focus(), 0);
  return form;
}

// --- Screens ---

function renderHome(root, state, actions) {
  root.textContent = "";
  const products = visibleProducts(state.products);

  root.appendChild(el("div", "brand", "MINU"));
  root.appendChild(el("div", "tagline", `${products.length} products compared across Barbora, Rimi and Selver`));
  root.appendChild(searchBar(state, actions, false));

  root.appendChild(el("h2", "section-title", "Categories"));
  const tiles = el("div", "tiles");
  const counts = new Map();
  for (const p of products) counts.set(p.category, (counts.get(p.category) || 0) + 1);
  for (const [category, count] of counts) {
    const tile = button("tile", "", () => actions.openCategory(category));
    tile.appendChild(el("div", "tile-icon", categoryIcon(category)));
    tile.appendChild(el("div", "tile-name", category));
    tile.appendChild(el("div", "tile-count", `${count}`));
    tiles.appendChild(tile);
  }
  root.appendChild(tiles);

  root.appendChild(el("h2", "section-title", "Biggest price differences today"));
  const row = el("div", "hrow");
  for (const { product, gapPct } of biggestDifferences(products, 12)) {
    row.appendChild(productCard(product, state, actions, gapBadge(gapPct)));
  }
  root.appendChild(row);

  root.appendChild(el("h2", "section-title", "Cheaper than usual"));
  const deals = cheaperThanUsual(products, 12);
  if (deals.length === 0) {
    root.appendChild(el("div", "muted", "No store is reporting a sale price right now."));
  } else {
    const dealRow = el("div", "hrow");
    for (const deal of deals) {
      const badge = el("span", "badge badge-deal", `-${Math.round(deal.discountPct)}% at ${storeLabel(deal.store)}`);
      dealRow.appendChild(productCard(deal.product, state, actions, badge));
    }
    root.appendChild(dealRow);
  }

  root.appendChild(updatedLine(state));
}

function renderSearch(root, state, actions) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", "Search"));
  root.appendChild(searchBar(state, actions, true));
  const results = el("div", "search-results");
  results.setAttribute("id", "search-results");
  root.appendChild(results);
  renderSearchResults(results, state, actions);
}

// Re-rendered alone on every keystroke, so the input keeps focus.
function renderSearchResults(container, state, actions) {
  container.textContent = "";
  const query = (state.query || "").trim();
  if (!query) {
    container.appendChild(el("div", "muted", "Type a product name — Estonian letters are optional (oun finds õun)."));
    return;
  }
  const found = searchProducts(state.searchIndex, query, 60);
  if (found.length === 0) {
    container.appendChild(el("div", "muted", `Nothing found for “${query}”.`));
    return;
  }
  container.appendChild(el("div", "muted", `${found.length}${found.length === 60 ? "+" : ""} result${found.length === 1 ? "" : "s"}`));
  const grid = el("div", "grid");
  for (const product of found) grid.appendChild(productCard(product, state, actions));
  container.appendChild(grid);
}

function renderCategory(root, state, actions) {
  root.textContent = "";
  const header = el("div", "header");
  header.appendChild(button("back", "‹ Home", () => actions.goHome()));
  root.appendChild(header);
  root.appendChild(el("h1", "screen-title", `${categoryIcon(state.category)} ${state.category}`));
  const items = visibleProducts(state.products).filter((p) => p.category === state.category);
  root.appendChild(el("div", "muted", `${items.length} product${items.length === 1 ? "" : "s"} matched across stores`));
  const grid = el("div", "grid");
  for (const product of items) grid.appendChild(productCard(product, state, actions));
  root.appendChild(grid);
}

function renderProduct(root, state, actions) {
  root.textContent = "";
  const product = state.product;
  const header = el("div", "header");
  header.appendChild(button("back", `‹ ${product.category}`, () => actions.openCategory(product.category)));
  root.appendChild(header);

  const figure = el("div", "product-image");
  const caption = el("div", "image-caption");
  const { box, pick } = imageBox(product, "frame", () => { caption.textContent = ""; });
  figure.appendChild(box);
  if (pick) {
    caption.textContent = `Image: ${storeLabel(pick.store)}`;
    figure.appendChild(caption);
  }
  root.appendChild(figure);

  root.appendChild(el("h1", "screen-title", product.name));
  const summary = priceSummary(product);
  const sub = [`${product.category}`, `${summary.storeCount} store${summary.storeCount === 1 ? "" : "s"}`];
  if (summary.gapPct > 0) sub.push(`up to ${Math.round(summary.gapPct)}% cheaper`);
  root.appendChild(el("div", "muted", sub.join(" · ")));
  root.appendChild(quantityControl(product, state, actions, "large"));

  const rows = productRows(product);
  const list = el("div", "store-list");
  for (const entry of rows) {
    const row = el("div", "store-row" + (entry.isCheapest ? " cheapest" : ""));
    const left = el("div", "store-left");
    left.appendChild(el("div", `store-name store-${entry.store}`, storeLabel(entry.store)));
    if (entry.storeName) left.appendChild(el("div", "store-own-name", entry.storeName));
    if (entry.url) {
      // Opens the store's own product page in a NEW tab.
      const link = document.createElement("a");
      link.className = "store-link";
      link.href = entry.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View at store ›";
      left.appendChild(link);
    }
    row.appendChild(left);

    const right = el("div", "store-right");
    if (product.cheapestByUnitPrice && entry.storeUnitPrice != null) {
      // Unit-price categories: the per-kg price is the headline (it
      // decided "Best price"), pack price is the secondary line.
      right.appendChild(el("div", "store-price", `${money(entry.storeUnitPrice, entry.currency)}/kg`));
      right.appendChild(el("div", "store-sub", entry.size ? `${money(entry.price, entry.currency)} · ${entry.size}` : money(entry.price, entry.currency)));
    } else {
      right.appendChild(el("div", "store-price", money(entry.price, entry.currency)));
      if (entry.unitPrice) {
        right.appendChild(el("div", "store-sub", `${money(entry.unitPrice.value, entry.currency)}/${entry.unitPrice.unit}`));
      } else if (entry.storeUnitPrice != null) {
        right.appendChild(el("div", "store-sub", `${money(entry.storeUnitPrice, entry.currency)}/kg`));
      }
    }
    if (entry.regularPrice != null && entry.regularPrice > entry.price) {
      right.appendChild(el("div", "store-sub store-regular", `usually ${money(entry.regularPrice, entry.currency)}`));
    }
    if (entry.cardPrice != null) {
      // Informational only — never part of "Best price".
      right.appendChild(el("div", "store-sub", `${money(entry.cardPrice, entry.currency)} with ${entry.cardName} card`));
    }
    if (entry.store === "selver") {
      right.appendChild(el("div", "store-availability-note", "Selver: availability not verified"));
    }
    if (entry.isCheapest) {
      right.appendChild(el("div", "store-tag best", "Best price"));
    } else if (entry.diff != null) {
      right.appendChild(el("div", "store-tag more", `+${money(entry.diff, entry.currency)}`));
    }
    row.appendChild(right);
    list.appendChild(row);
  }
  root.appendChild(list);
}

function renderBasket(root, state, actions) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", "Basket"));
  const { lines, stores, split } = compareBasket(state.products, state.basket);
  if (lines.length === 0) {
    root.appendChild(el("div", "muted", "Your basket is empty. Add products from any category or search."));
    return;
  }

  const list = el("div", "basket-list");
  for (const { key, product, qty } of lines) {
    const line = el("div", "basket-line");
    const open = button("basket-name", product.name, () => actions.openProduct(product));
    line.appendChild(open);
    const ctl = el("div", "qty small");
    ctl.appendChild(button("qty-btn", "−", () => actions.setQuantity(key, qty - 1)));
    ctl.appendChild(el("span", "qty-value", String(qty)));
    ctl.appendChild(button("qty-btn", "+", () => actions.setQuantity(key, qty + 1)));
    ctl.appendChild(button("qty-remove", "Remove", () => actions.setQuantity(key, 0)));
    line.appendChild(ctl);
    list.appendChild(line);
  }
  root.appendChild(list);

  root.appendChild(el("h2", "section-title", "Compare basket"));
  const compare = el("div", "store-list");
  for (const s of stores) {
    const row = el("div", "store-row" + (s.isCheapest ? " cheapest" : ""));
    const left = el("div", "store-left");
    left.appendChild(el("div", `store-name store-${s.store}`, storeLabel(s.store)));
    if (s.missing > 0) left.appendChild(el("div", "store-sub", `missing: ${s.missing} item${s.missing === 1 ? "" : "s"}`));
    row.appendChild(left);
    const right = el("div", "store-right");
    right.appendChild(el("div", "store-price", money(s.total)));
    const cheapestStore = stores.find((x) => x.isCheapest);
    if (s.isCheapest) right.appendChild(el("div", "store-tag best", "Cheapest"));
    else if (s.complete && cheapestStore) right.appendChild(el("div", "store-tag more", `+${money(s.total - cheapestStore.total)}`));
    row.appendChild(right);
    compare.appendChild(row);
  }
  root.appendChild(compare);

  const splitBox = el("div", "split");
  splitBox.appendChild(el("div", "split-title", "Split across stores"));
  const used = split.storesUsed.map(storeLabel).join(" + ");
  splitBox.appendChild(el("div", "split-total", `${money(split.total)} · ${used}`));
  if (split.saving === null) {
    splitBox.appendChild(el("div", "muted", "No single store has every item — buying each item where it's cheapest is the only way."));
  } else if (split.saving > 0) {
    splitBox.appendChild(el("div", "split-saving", `saves ${money(split.saving)} against the cheapest single store`));
  } else {
    splitBox.appendChild(el("div", "muted", "No saving over the cheapest single store."));
  }
  splitBox.appendChild(el("div", "muted", "Totals use the pack price anyone pays today; card prices never count."));
  root.appendChild(splitBox);
}

function renderNav(nav, state, actions) {
  nav.textContent = "";
  const items = [
    ["home", "Home", "⌂"],
    ["search", "Search", "⌕"],
    ["basket", "Basket", "🧺"],
  ];
  const count = basketCount(state.basket);
  for (const [screen, label, icon] of items) {
    const b = button("nav-item" + (state.screen === screen ? " active" : ""), "", () => actions.goto(screen));
    b.appendChild(el("span", "nav-icon", icon));
    b.appendChild(el("span", "nav-label", screen === "basket" && count > 0 ? `${label} (${count})` : label));
    nav.appendChild(b);
  }
}

function renderError(root, message) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", "No price data yet"));
  root.appendChild(el("div", "muted", message));
}

function renderApp(root, nav, state, actions) {
  if (state.screen === "home") renderHome(root, state, actions);
  else if (state.screen === "search") renderSearch(root, state, actions);
  else if (state.screen === "category") renderCategory(root, state, actions);
  else if (state.screen === "product") renderProduct(root, state, actions);
  else if (state.screen === "basket") renderBasket(root, state, actions);
  renderNav(nav, state, actions);
}

if (typeof module !== "undefined") {
  module.exports = { renderApp, renderHome, renderSearch, renderSearchResults, renderCategory, renderProduct, renderBasket, renderNav, renderError, storeLabel, categoryIcon, money };
}
