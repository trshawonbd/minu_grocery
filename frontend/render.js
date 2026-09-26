// Every screen of the app as DOM-building functions with no state of
// their own: index.html owns the state (data, route, query, basket,
// lang) and calls these with it plus an `actions` object. Only a small
// set of DOM calls is used (createElement/createElementNS, appendChild,
// textContent, className, setAttribute, addEventListener, plain
// properties) so frontend/render.test.js can run the same code on a
// tiny fake document. Uses the globals of pricing.js, app-logic.js,
// catalog.js and i18n.js (loaded before this file in the page;
// attached to `global` in tests).
//
// Categories on screen are the DISPLAY categories of catalog.js
// (Estonian, shopping order, Fruits/Vegetables and Milk/Butter/Eggs
// split), not the data categories of prices.json. All UI text goes
// through i18n.js's t(); the language is state.lang ("et" default).

const STORE_LABELS = { barbora: "Barbora", rimi: "Rimi", selver: "Selver", coop: "Coop (Haapsalu)" };

// Coloured text labels — no logos.
function storeLabel(key) {
  return STORE_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function money(value, currency) {
  const symbol = currency === "EUR" || !currency ? "€" : currency;
  return `${value.toFixed(2)} ${symbol}`;
}

function tr(state, key, vars) {
  return t(normalizeLang(state.lang), key, vars);
}

function storesText(state, n) {
  return n === 1 ? tr(state, "store1") : tr(state, "stores", { n });
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

function svgIcon(paths, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  for (const d of paths) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.6");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
  }
  return svg;
}

// Our own simple line icon for a display category (catalog.js).
function categoryIconSvg(category, className) {
  return svgIcon(ICON_PATHS[category.icon] || ICON_PATHS.cart, className || "cat-icon");
}

// The neutral placeholder shown whenever there's no store photo to
// hotlink (images off, no store has one, or the URL failed to load).
function neutralIcon() {
  return svgIcon(["M6 7h12l1 13H5L6 7zm3 0V5a3 3 0 0 1 6 0v2"], "neutral-icon");
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

function gapBadge(state, gapPct) {
  if (!(gapPct > 0)) return null;
  return el("span", "badge badge-gap", tr(state, "upToCheaper", { n: Math.round(gapPct) }));
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
    const unit = summary.perUnit ? tr(state, "perKg") : "";
    const range = summary.min === summary.max ? `${money(summary.min)}${unit}` : `${summary.min.toFixed(2)} – ${money(summary.max)}${unit}`;
    open.appendChild(el("div", "pcard-price", range));
  }
  const badges = el("div", "pcard-badges");
  const badge = extraBadge || gapBadge(state, summary.gapPct);
  if (badge) badges.appendChild(badge);
  badges.appendChild(el("span", "pcard-stores", storesText(state, summary.storeCount)));
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
    wrap.appendChild(button("btn-add", tr(state, "addToBasket"), () => actions.setQuantity(key, 1)));
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
    line.textContent = tr(state, "updated", { time: state.updatedAt }) + (state.stale ? tr(state, "stale") : "");
  }
  return line;
}

// "Keel: ET · EN · RU" — the language setting. Estonian is the default;
// the others are ready in i18n.js.
function languageSwitch(state, actions) {
  const wrap = el("div", "lang-switch");
  wrap.appendChild(el("span", "lang-label", `${tr(state, "language")}:`));
  const current = normalizeLang(state.lang);
  for (const lang of LANGUAGES) {
    const b = button("lang-btn" + (lang === current ? " active" : ""), lang.toUpperCase(), () => actions.setLang(lang));
    b.setAttribute("aria-pressed", lang === current ? "true" : "false");
    wrap.appendChild(b);
  }
  return wrap;
}

function searchBar(state, actions, autofocus) {
  const form = el("div", "searchbar");
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = tr(state, "searchPlaceholder");
  input.value = state.query || "";
  input.setAttribute("aria-label", tr(state, "searchLabel"));
  input.addEventListener("input", () => actions.setQuery(input.value));
  form.appendChild(input);
  if (autofocus && typeof input.focus === "function") setTimeout(() => input.focus(), 0);
  return form;
}

// --- Screens ---

function renderHome(root, state, actions) {
  root.textContent = "";
  const products = visibleProducts(state.products);
  const lang = normalizeLang(state.lang);

  root.appendChild(el("div", "brand", "MINU"));
  root.appendChild(el("div", "tagline", tr(state, "tagline", { n: products.length })));
  root.appendChild(searchBar(state, actions, false));

  // One horizontal, swipeable row of round group icons (2026-09-26,
  // the owner's redesign) — replaces the old full-page grid of every
  // display category, so the "Suurimad hinnavahed"/"Tavalisest
  // odavam" rows below are visible on a phone without scrolling.
  const groupRow = el("div", "group-row");
  for (const { group, count } of groupsWithCounts(products)) {
    const item = button("group-item", "", () => actions.openGroup(group.id));
    const icon = el("div", "group-icon");
    icon.appendChild(categoryIconSvg(group, "cat-icon group-icon-svg"));
    item.appendChild(icon);
    item.appendChild(el("div", "group-name", groupName(group, lang)));
    item.appendChild(el("div", "group-count", `${count}`));
    groupRow.appendChild(item);
  }
  root.appendChild(groupRow);

  root.appendChild(el("h2", "section-title", tr(state, "biggestDifferences")));
  const row = el("div", "hrow");
  for (const { product, gapPct } of biggestDifferences(products, 12)) {
    row.appendChild(productCard(product, state, actions, gapBadge(state, gapPct)));
  }
  root.appendChild(row);

  root.appendChild(el("h2", "section-title", tr(state, "cheaperThanUsual")));
  const deals = cheaperThanUsual(products, 12);
  if (deals.length === 0) {
    root.appendChild(el("div", "muted", tr(state, "noDeals")));
  } else {
    const dealRow = el("div", "hrow");
    for (const deal of deals) {
      const badge = el("span", "badge badge-deal", tr(state, "dealBadge", { n: Math.round(deal.discountPct), store: storeLabel(deal.store) }));
      dealRow.appendChild(productCard(deal.product, state, actions, badge));
    }
    root.appendChild(dealRow);
  }

  root.appendChild(updatedLine(state));
  root.appendChild(languageSwitch(state, actions));
}

function renderSearch(root, state, actions) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", tr(state, "search")));
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
    container.appendChild(el("div", "muted", tr(state, "searchHint")));
    return;
  }
  const found = searchProducts(state.searchIndex, query, 60);
  const singles = searchSingles(state.singlesIndex, query, 40);
  if (found.length === 0 && singles.length === 0) {
    container.appendChild(el("div", "muted", tr(state, "nothingFound", { q: query })));
    return;
  }
  if (found.length > 0) {
    container.appendChild(el("div", "muted", tr(state, found.length === 60 ? "resultsMore" : "results", { n: found.length })));
    const grid = el("div", "grid");
    for (const product of found) grid.appendChild(productCard(product, state, actions));
    container.appendChild(grid);
  }
  // Search only — never on a category screen (see app-logic.js).
  if (singles.length > 0) {
    container.appendChild(el("h2", "section-title", tr(state, "onlyOneStore")));
    container.appendChild(el("div", "muted", tr(state, "onlyOneStoreHint")));
    const list = el("div", "store-list");
    for (const single of singles) list.appendChild(singleRow(single, state));
    container.appendChild(list);
  }
}

// One single-store listing: coloured store label, the store's own
// name, price, unit price, and "View at store" in a new tab. No
// "cheapest", no basket — there is nothing to compare it against.
function singleRow(single, state) {
  const row = el("div", "store-row single-row");
  const left = el("div", "store-left");
  left.appendChild(el("div", `store-name store-${single.store}`, storeLabel(single.store)));
  left.appendChild(el("div", "single-name", single.name));
  if (single.url) {
    const link = document.createElement("a");
    link.className = "store-link";
    link.href = single.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = tr(state, "viewAtStore");
    left.appendChild(link);
  }
  row.appendChild(left);
  const right = el("div", "store-right");
  right.appendChild(el("div", "store-price", money(single.price, single.currency)));
  const unit = unitPrice(single);
  if (unit) {
    right.appendChild(el("div", "store-sub", `${money(unit.value, single.currency)}/${unit.unit}`));
  } else if (single.storeUnitPrice != null) {
    right.appendChild(el("div", "store-sub", `${money(single.storeUnitPrice, single.currency)}${tr(state, "perKg")}`));
  }
  if (single.regularPrice != null && single.regularPrice > single.price) {
    right.appendChild(el("div", "store-sub store-regular", tr(state, "usually", { price: money(single.regularPrice, single.currency) })));
  }
  if (single.cardPrice != null) {
    right.appendChild(el("div", "store-sub", tr(state, "withCard", { price: money(single.cardPrice, single.currency), card: single.cardName })));
  }
  row.appendChild(right);
  return row;
}

// state.category is a display category id (catalog.js).
function renderCategory(root, state, actions) {
  root.textContent = "";
  const lang = normalizeLang(state.lang);
  const category = displayCategoryById(state.category) || FALLBACK_CATEGORY;
  const header = el("div", "header");
  header.appendChild(button("back", tr(state, "back", { name: tr(state, "home") }), () => actions.goHome()));
  root.appendChild(header);
  const title = el("h1", "screen-title");
  title.appendChild(categoryIconSvg(category, "cat-icon title-icon"));
  title.appendChild(el("span", "", categoryName(category, lang)));
  root.appendChild(title);
  const items = productsInDisplayCategory(visibleProducts(state.products), category.id);
  root.appendChild(el("div", "muted", tr(state, "productsMatched", { n: items.length })));
  const grid = el("div", "grid");
  for (const product of items) grid.appendChild(productCard(product, state, actions));
  root.appendChild(grid);
}

// The home screen's group page (2026-09-26) — a round-icon group
// (e.g. "Piimatooted ja munad") opens here: subcategory tabs at the
// top ("Kõik" plus one tab per display category that actually has a
// product in this group right now), the product grid for whichever
// tab is selected below. state.group is a GROUPS id, state.groupTab
// is either null ("Kõik" — every product in the group) or one
// DISPLAY_CATEGORIES id from that group.
function renderGroup(root, state, actions) {
  root.textContent = "";
  const lang = normalizeLang(state.lang);
  const group = groupById(state.group);
  if (!group) { renderHome(root, state, actions); return; }
  const products = visibleProducts(state.products);
  const { categories } = groupsWithCounts(products).find((g) => g.group.id === group.id) || { categories: [] };

  const header = el("div", "header");
  header.appendChild(button("back", tr(state, "back", { name: tr(state, "home") }), () => actions.goHome()));
  root.appendChild(header);
  const title = el("h1", "screen-title");
  title.appendChild(categoryIconSvg(group, "cat-icon title-icon"));
  title.appendChild(el("span", "", groupName(group, lang)));
  root.appendChild(title);

  const tabs = el("div", "tab-row");
  const allTab = button("tab" + (state.groupTab ? "" : " active"), tr(state, "allTab"), () => actions.openGroup(group.id));
  tabs.appendChild(allTab);
  for (const { id } of categories) {
    const category = displayCategoryById(id);
    if (!category) continue;
    const tab = button("tab" + (state.groupTab === id ? " active" : ""), categoryName(category, lang), () => actions.openGroup(group.id, id));
    tabs.appendChild(tab);
  }
  root.appendChild(tabs);

  const items = state.groupTab ? productsInDisplayCategory(products, state.groupTab) : productsInGroup(products, group.id);
  root.appendChild(el("div", "muted", tr(state, "productsMatched", { n: items.length })));
  const grid = el("div", "grid");
  for (const product of items) grid.appendChild(productCard(product, state, actions));
  root.appendChild(grid);
}

function renderProduct(root, state, actions) {
  root.textContent = "";
  const product = state.product;
  const lang = normalizeLang(state.lang);
  const category = displayCategoryFor(product);
  const header = el("div", "header");
  header.appendChild(button("back", tr(state, "back", { name: categoryName(category, lang) }), () => actions.openCategory(category.id)));
  root.appendChild(header);

  const figure = el("div", "product-image");
  const caption = el("div", "image-caption");
  const { box, pick } = imageBox(product, "frame", () => { caption.textContent = ""; });
  figure.appendChild(box);
  if (pick) {
    caption.textContent = tr(state, "imageFrom", { store: storeLabel(pick.store) });
    figure.appendChild(caption);
  }
  root.appendChild(figure);

  root.appendChild(el("h1", "screen-title", product.name));
  const summary = priceSummary(product);
  const sub = [categoryName(category, lang), storesText(state, summary.storeCount)];
  if (summary.gapPct > 0) sub.push(tr(state, "upToCheaper", { n: Math.round(summary.gapPct) }));
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
      link.textContent = tr(state, "viewAtStore");
      left.appendChild(link);
    }
    row.appendChild(left);

    const right = el("div", "store-right");
    const perKg = tr(state, "perKg");
    if (product.cheapestByUnitPrice && entry.storeUnitPrice != null) {
      // Unit-price categories: the per-kg price is the headline (it
      // decided "Best price"), pack price is the secondary line.
      right.appendChild(el("div", "store-price", `${money(entry.storeUnitPrice, entry.currency)}${perKg}`));
      right.appendChild(el("div", "store-sub", entry.size ? `${money(entry.price, entry.currency)} · ${entry.size}` : money(entry.price, entry.currency)));
    } else {
      right.appendChild(el("div", "store-price", money(entry.price, entry.currency)));
      if (entry.unitPrice) {
        right.appendChild(el("div", "store-sub", `${money(entry.unitPrice.value, entry.currency)}/${entry.unitPrice.unit}`));
      } else if (entry.storeUnitPrice != null) {
        right.appendChild(el("div", "store-sub", `${money(entry.storeUnitPrice, entry.currency)}${perKg}`));
      }
    }
    if (entry.regularPrice != null && entry.regularPrice > entry.price) {
      right.appendChild(el("div", "store-sub store-regular", tr(state, "usually", { price: money(entry.regularPrice, entry.currency) })));
    }
    if (entry.cardPrice != null) {
      // Informational only — never part of "Best price".
      right.appendChild(el("div", "store-sub", tr(state, "withCard", { price: money(entry.cardPrice, entry.currency), card: entry.cardName })));
    }
    if (entry.store === "selver") {
      right.appendChild(el("div", "store-availability-note", tr(state, "availabilityNote")));
    }
    if (entry.store === "coop") {
      // Regional pricing — the Haapsalu e-shop's price.
      right.appendChild(el("div", "store-availability-note", tr(state, "coopNote")));
    }
    if (entry.isCheapest) {
      right.appendChild(el("div", "store-tag best", tr(state, "bestPrice")));
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
  root.appendChild(el("h1", "screen-title", tr(state, "basket")));
  const { lines, stores, split } = compareBasket(state.products, state.basket);
  if (lines.length === 0) {
    root.appendChild(el("div", "muted", tr(state, "basketEmpty")));
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
    ctl.appendChild(button("qty-remove", tr(state, "remove"), () => actions.setQuantity(key, 0)));
    line.appendChild(ctl);
    list.appendChild(line);
  }
  root.appendChild(list);

  root.appendChild(el("h2", "section-title", tr(state, "compareBasket")));
  const compare = el("div", "store-list");
  for (const s of stores) {
    const row = el("div", "store-row" + (s.isCheapest ? " cheapest" : ""));
    const left = el("div", "store-left");
    left.appendChild(el("div", `store-name store-${s.store}`, storeLabel(s.store)));
    if (s.missing > 0) left.appendChild(el("div", "store-sub", s.missing === 1 ? tr(state, "missingItem") : tr(state, "missingItems", { n: s.missing })));
    row.appendChild(left);
    const right = el("div", "store-right");
    right.appendChild(el("div", "store-price", money(s.total)));
    const cheapestStore = stores.find((x) => x.isCheapest);
    if (s.isCheapest) right.appendChild(el("div", "store-tag best", tr(state, "cheapest")));
    else if (s.complete && cheapestStore) right.appendChild(el("div", "store-tag more", `+${money(s.total - cheapestStore.total)}`));
    row.appendChild(right);
    compare.appendChild(row);
  }
  root.appendChild(compare);

  const splitBox = el("div", "split");
  splitBox.appendChild(el("div", "split-title", tr(state, "splitTitle")));
  const used = split.storesUsed.map(storeLabel).join(" + ");
  splitBox.appendChild(el("div", "split-total", `${money(split.total)} · ${used}`));
  if (split.saving === null) {
    splitBox.appendChild(el("div", "muted", tr(state, "splitNoComplete")));
  } else if (split.saving > 0) {
    splitBox.appendChild(el("div", "split-saving", tr(state, "splitSaving", { amount: money(split.saving) })));
  } else {
    splitBox.appendChild(el("div", "muted", tr(state, "splitNoSaving")));
  }
  splitBox.appendChild(el("div", "muted", tr(state, "splitNote")));
  root.appendChild(splitBox);
}

const NAV_ICONS = {
  home: ["M4 11l8-7 8 7v9H4v-9z", "M10 20v-6h4v6"],
  search: ["M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z", "M15 15l5 5"],
  // A simple storefront — scalloped awning, walls, a door — for the
  // "Outletid" tab (2026-09-26): malls and brand discounts, a
  // separate section from the grocery comparison, own icon so it
  // never looks like another category tile.
  outlets: ["M4 10h16", "M5 10l1-6h12l1 6", "M5 10v9h14v-9", "M9 19v-5h6v5"],
  basket: ICON_PATHS.cart,
};

const OUTLET_SCREENS = new Set(["outlets", "outletMall", "outletShop"]);

function renderNav(nav, state, actions) {
  nav.textContent = "";
  const count = basketCount(state.basket);
  const items = [
    ["home", tr(state, "home")],
    ["search", tr(state, "search")],
    ["outlets", tr(state, "outlets")],
    ["basket", count > 0 ? tr(state, "basketWithCount", { n: count }) : tr(state, "basket")],
  ];
  for (const [screen, label] of items) {
    const isActive = screen === "outlets" ? OUTLET_SCREENS.has(state.screen) : state.screen === screen;
    const b = button("nav-item" + (isActive ? " active" : ""), "", () => actions.goto(screen));
    const icon = el("span", "nav-icon");
    icon.appendChild(svgIcon(NAV_ICONS[screen], "nav-svg"));
    b.appendChild(icon);
    b.appendChild(el("span", "nav-label", label));
    nav.appendChild(b);
  }
}

// "Outletid" nav tab (2026-09-26 app work) — malls and brand
// discounts, a fully separate section from the grocery comparison
// (see outlets/ and CLAUDE.md's own "Outlets" section); nothing here
// reads state.products or any grocery data at all. state.outletMalls
// is outlets/data/malls.json's own `malls` array, state.outletBrands
// is the array of already-fetched brand-data files (denim-dream.json
// today) — both loaded by index.html, optional (the tab still shows
// a mall list of zero if they haven't loaded yet).
// The location block (roadmap step 4): "Kasuta minu asukohta" (the
// browser asks the shopper's permission itself) or a typed address
// (looked up by In-ADS, index.html). The location lives in state only
// — never stored, never sent by us — and the hint says so.
function locationBlock(state, actions) {
  const box = el("div", "loc-box");
  if (state.outletLocation) {
    const line = el("div", "loc-current");
    line.appendChild(el("span", "loc-label", state.outletLocation.label));
    line.appendChild(button("loc-clear", tr(state, "outletClearLocation"), () => actions.clearLocation()));
    box.appendChild(line);
    const chips = el("div", "tab-row outlet-radius");
    for (const km of RADIUS_OPTIONS_KM) {
      const label = km === null ? tr(state, "outletRadiusAll") : `${km} km`;
      chips.appendChild(button("tab" + (state.outletRadius === km ? " active" : ""), label, () => actions.setRadius(km)));
    }
    box.appendChild(chips);
    return box;
  }
  box.appendChild(button("btn-add loc-use", tr(state, "outletUseMyLocation"), () => actions.useMyLocation()));
  const form = el("div", "loc-form");
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = tr(state, "outletAddressPlaceholder");
  input.setAttribute("aria-label", tr(state, "outletAddressLabel"));
  input.addEventListener("keydown", (event) => { if (event && event.key === "Enter") actions.searchAddress(input.value); });
  form.appendChild(input);
  form.appendChild(button("loc-search", tr(state, "outletSearch"), () => actions.searchAddress(input.value)));
  box.appendChild(form);
  if (state.outletLocationStatus === "locating") box.appendChild(el("div", "muted", tr(state, "outletLocating")));
  if (state.outletLocationStatus === "failed") box.appendChild(el("div", "muted loc-error", tr(state, "outletLocationFailed")));
  if (state.outletLocationStatus === "notFound") box.appendChild(el("div", "muted loc-error", tr(state, "outletAddressNotFound")));
  box.appendChild(el("div", "muted loc-hint", tr(state, "outletLocationHint")));
  return box;
}

// One mall row: name, address, distance (with a location), and what
// its shops offer — "3 kauplust allahindlustega · Apotheka 777 toodet,
// Klick 30 toodet".
function mallRow(mall, state, actions, brandsByName) {
  const row = button("store-row", "", () => actions.openOutletMall(mall.id));
  const left = el("div", "store-left");
  left.appendChild(el("div", "store-name", mall.name));
  if (mall.address) left.appendChild(el("div", "store-own-name", mall.address));
  const summary = mallSummary(mall, brandsByName);
  const parts = [];
  if (summary.discountShops === 0) parts.push(tr(state, "outletNoDiscountShops"));
  else parts.push(summary.discountShops === 1 ? tr(state, "outletDiscountShop1") : tr(state, "outletDiscountShops", { n: summary.discountShops }));
  if (summary.top.length > 0) parts.push(summary.top.map((s) => tr(state, "outletTopShop", { name: s.name, n: s.count })).join(", "));
  left.appendChild(el("div", "store-sub mall-summary", parts.join(" · ")));
  row.appendChild(left);
  const right = el("div", "store-right");
  if (mall.distanceKm != null) right.appendChild(el("div", "store-price mall-distance", formatKm(mall.distanceKm)));
  right.appendChild(el("div", "store-sub", mall.shopCount === 1 ? tr(state, "outletShop1") : tr(state, "outletShops", { n: mall.shopCount })));
  row.appendChild(right);
  return row;
}

function renderOutlets(root, state, actions) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", tr(state, "outlets")));
  root.appendChild(locationBlock(state, actions));
  const brandsByName = indexBrandsByName(state.outletBrands);
  const counts = new Map(mallList(state.outletMalls).map((m) => [m.id, m.shopCount]));
  const located = mallsWithDistance(state.outletMalls, state.outletLocation);
  const malls = mallsInRadius(located, state.outletLocation ? state.outletRadius : null);
  if (state.outletLocation && malls.length === 0) root.appendChild(el("div", "muted", tr(state, "outletNoMallsInRange")));
  const list = el("div", "store-list");
  for (const mall of malls) list.appendChild(mallRow({ ...mall, shopCount: counts.get(mall.id) || 0 }, state, actions, brandsByName));
  root.appendChild(list);
}

// One mall's own shop list — a shop with real discount data (its own
// name matches a brand file, see frontend/outlets-logic.js) shows its
// new-discount count (or, with none new, the count on sale in small
// text) and opens the items; a shop with no data is shown but not
// clickable (nothing to open).
function outletShopRow(shop, state, actions, mallId) {
  const meta = [shop.category, shop.floor].filter(Boolean).join(" · ");
  if (!shop.discount) {
    const row = el("div", "store-row");
    const left = el("div", "store-left");
    left.appendChild(el("div", "store-name", shop.name));
    if (meta) left.appendChild(el("div", "store-own-name", meta));
    row.appendChild(left);
    return row;
  }
  const row = button("store-row", "", () => actions.openOutletShop(mallId, shop.name));
  const left = el("div", "store-left");
  left.appendChild(el("div", "store-name", shop.name));
  if (meta) left.appendChild(el("div", "store-own-name", meta));
  row.appendChild(left);
  const right = el("div", "store-right");
  // Only NEW discounts earn the badge ("12 uut allahindlust"); a brand
  // whose sale prices are all permanent gets small grey text with the
  // count on sale — never a big % (the owner's rule).
  if (shop.discount.newCount > 0) {
    right.appendChild(el("span", "badge badge-deal", tr(state, "outletNewCount", { n: shop.discount.newCount })));
  } else if (shop.discount.unknownCount > 0) {
    right.appendChild(el("div", "store-sub", tr(state, "outletUnknownCount", { n: shop.discount.unknownCount })));
  } else {
    right.appendChild(el("div", "store-sub", tr(state, "outletOnSaleCount", { n: shop.discount.itemCount })));
  }
  row.appendChild(right);
  return row;
}

function renderOutletMall(root, state, actions) {
  root.textContent = "";
  const header = el("div", "header");
  header.appendChild(button("back", tr(state, "back", { name: tr(state, "outlets") }), () => actions.goto("outlets")));
  root.appendChild(header);
  const mall = findMall(state.outletMalls, state.outletMallId);
  if (!mall) { root.appendChild(el("div", "muted", tr(state, "outletNoItems"))); return; }
  root.appendChild(el("h1", "screen-title", mall.name));
  if (mall.address) root.appendChild(el("div", "muted", mall.address));
  const byName = indexBrandsByName(state.outletBrands);
  // Shops with discount data first (biggest first), the rest after,
  // one row per brand even when the mall lists a chain twice.
  const shops = orderShopsForMall(shopsWithDiscounts(mall, byName));
  if (!shops.some((s) => s.discount)) root.appendChild(el("div", "muted", tr(state, "outletNoDiscounts")));
  const list = el("div", "store-list");
  for (const shop of shops) list.appendChild(outletShopRow(shop, state, actions, mall.id));
  root.appendChild(list);
}

// One brand's own hotlinked photo (whole product shown — contain,
// never cropped), or the neutral icon — same SHOW_STORE_IMAGES gate
// as grocery product photos (pricing.js): off means no image URL is
// ever requested here either.
// badgeText: the big orange "-X%" for a NEW discount (X against the
// 30-day lowest price), or null — a permanent sale price gets no
// badge at all (the owner's rule, see outlets-logic.js).
function outletImageBox(item, badgeText) {
  const box = el("div", "ocard-img");
  const badge = () => { if (badgeText) box.appendChild(el("span", "ocard-badge", badgeText)); };
  if (SHOW_STORE_IMAGES && item.image) {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => {
      box.textContent = "";
      box.appendChild(neutralIcon());
      badge();
    });
    img.src = item.image;
    box.appendChild(img);
  } else {
    box.appendChild(neutralIcon());
  }
  badge();
  return box;
}

// One real sale item as a fashion-shop card (2026-09-26 redesign):
// large 3:4 photo, brand small, name (two lines at most), sale price
// big — the WHOLE card is the link to the brand's own product page,
// in a new tab; no separate button. A NEW discount carries the big
// "-X%" badge (X against the 30-day low, never against tavahind); a
// permanent sale price carries a small grey "Püsiv soodushind" note
// instead, and "tavahind X €" in small text either way.
function outletItemCard(item, state) {
  const card = document.createElement("a");
  card.className = "ocard";
  if (item.link) {
    card.href = item.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }
  const fresh = isNewDiscount(item);
  const unknown = isUnknownDiscount(item);
  // A not-yet-judgeable item (no site 30-day field, our history under
  // 30 days) carries a plain "Allahindlus" tag on the photo — a word,
  // never a %, until the split can be made honestly.
  card.appendChild(outletImageBox(item, fresh ? `-${item.newPercent}%` : unknown ? tr(state, "outletUnknown") : null));
  if (unknown) card.className = "ocard ocard--unknown";
  const body = el("div", "ocard-body");
  if (item.brand) body.appendChild(el("div", "ocard-brand", item.brand));
  body.appendChild(el("div", "ocard-name", item.name));
  body.appendChild(el("div", "ocard-price", money(item.salePrice)));
  if (!fresh && !unknown) body.appendChild(el("div", "ocard-permanent", tr(state, "outletPermanent")));
  const old = el("div", "ocard-old");
  old.appendChild(el("span", "ocard-old-label", `${tr(state, "outletRegular")} `));
  old.appendChild(el("s", "", money(item.regularPrice)));
  body.appendChild(old);
  card.appendChild(body);
  return card;
}

function chipRow(className, chips) {
  const row = el("div", `tab-row ${className}`);
  for (const { label, active, onClick } of chips) row.appendChild(button("tab" + (active ? " active" : ""), label, onClick));
  return row;
}

function formatTime(iso) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso || "";
  return date.toLocaleString("et-EE", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

// The discounted items for one shop's brand — the note the owner
// asked for ("E-poe allahindlus. See bränd on selles keskuses
// esindatud.") is shown right under the title every time, so it's
// never mistaken for an in-mall price. Filters (the store's own
// sections, product type) and sorts are state.outletFilter (see
// outlets-logic.js); the count and "Uuendatud" line reflect the
// current selection and the brand file's own scrape time.
function renderOutletShop(root, state, actions) {
  root.textContent = "";
  root.className = "page page-wide";
  const mall = findMall(state.outletMalls, state.outletMallId);
  const header = el("div", "header");
  header.appendChild(button("back", tr(state, "back", { name: mall ? mall.name : tr(state, "outlets") }), () => actions.openOutletMall(state.outletMallId)));
  root.appendChild(header);
  root.appendChild(el("h1", "screen-title", state.outletShopName || ""));
  root.appendChild(el("div", "muted outlet-note", tr(state, "outletOnlineNote")));
  const byName = indexBrandsByName(state.outletBrands);
  const brand = brandForShopName(byName, state.outletShopName);
  const allItems = brand ? brand.items : [];
  if (allItems.length === 0) {
    root.appendChild(el("div", "muted", tr(state, "outletNoItems")));
    return;
  }
  const filter = { ...DEFAULT_OUTLET_FILTER, ...(state.outletFilter || {}) };
  const set = (patch) => actions.setOutletFilter(patch);

  const sections = itemSections(allItems);
  if (sections.length > 1) {
    root.appendChild(chipRow("outlet-sections", [
      { label: tr(state, "allTab"), active: !filter.section, onClick: () => set({ section: null, type: null }) },
      ...sections.map((s) => ({ label: s, active: filter.section === s, onClick: () => set({ section: s, type: null }) })),
    ]));
  }
  const types = itemTypes(allItems, filter.section);
  if (types.length > 1) {
    root.appendChild(chipRow("outlet-types", [
      { label: tr(state, "allTab"), active: !filter.type, onClick: () => set({ type: null }) },
      ...types.map(({ type, count }) => ({ label: `${type} (${count})`, active: filter.type === type, onClick: () => set({ type }) })),
    ]));
  }
  root.appendChild(chipRow("outlet-sorts", [
    { label: tr(state, "outletSortDiscount"), active: filter.sort === "discount", onClick: () => set({ sort: "discount" }) },
    { label: tr(state, "outletSortPrice"), active: filter.sort === "price", onClick: () => set({ sort: "price" }) },
    { label: tr(state, "outletSortNewest"), active: filter.sort === "newest", onClick: () => set({ sort: "newest" }) },
  ]));

  const items = filterAndSortItems(allItems, filter);
  const meta = el("div", "muted outlet-meta");
  meta.appendChild(el("span", "", tr(state, "outletItemCount", { n: items.length })));
  if (brand.scrapedAt) meta.appendChild(el("span", "", ` · ${tr(state, "updated", { time: formatTime(brand.scrapedAt) })}`));
  root.appendChild(meta);
  if (items.length === 0) {
    root.appendChild(el("div", "muted", tr(state, "outletNoItems")));
    return;
  }
  const grid = el("div", "ogrid");
  for (const item of items) grid.appendChild(outletItemCard(item, state));
  root.appendChild(grid);
  root.appendChild(el("div", "muted image-caption", tr(state, "outletImageFrom", { brand: brand.brand })));
}

function renderError(root, state) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", tr(state, "noData")));
  root.appendChild(el("div", "muted", tr(state, "noDataHelp")));
}

function renderApp(root, nav, state, actions) {
  root.className = "page";
  if (state.screen === "home") renderHome(root, state, actions);
  else if (state.screen === "search") renderSearch(root, state, actions);
  else if (state.screen === "category") renderCategory(root, state, actions);
  else if (state.screen === "group") renderGroup(root, state, actions);
  else if (state.screen === "product") renderProduct(root, state, actions);
  else if (state.screen === "outlets") renderOutlets(root, state, actions);
  else if (state.screen === "outletMall") renderOutletMall(root, state, actions);
  else if (state.screen === "outletShop") renderOutletShop(root, state, actions);
  else if (state.screen === "basket") renderBasket(root, state, actions);
  renderNav(nav, state, actions);
}

if (typeof module !== "undefined") {
  module.exports = { renderApp, renderHome, renderSearch, renderSearchResults, renderCategory, renderGroup, renderProduct, renderOutlets, renderOutletMall, renderOutletShop, renderBasket, renderNav, renderError, storeLabel, categoryIconSvg, money };
}
