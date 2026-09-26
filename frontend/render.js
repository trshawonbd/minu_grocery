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
function renderOutlets(root, state, actions) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", tr(state, "outlets")));
  const list = el("div", "store-list");
  for (const mall of mallList(state.outletMalls)) {
    const row = button("store-row", "", () => actions.openOutletMall(mall.id));
    const left = el("div", "store-left");
    left.appendChild(el("div", "store-name", mall.name));
    if (mall.address) left.appendChild(el("div", "store-own-name", mall.address));
    row.appendChild(left);
    const right = el("div", "store-right");
    right.appendChild(el("div", "store-sub", mall.shopCount === 1 ? tr(state, "outletShop1") : tr(state, "outletShops", { n: mall.shopCount })));
    row.appendChild(right);
    list.appendChild(row);
  }
  root.appendChild(list);
}

// One mall's own shop list — a shop with real discount data (its own
// name matches a brand file, see frontend/outlets-logic.js) shows the
// "kuni -X%, N toodet" badge and opens the discounted items; a shop
// with none is shown but not clickable (nothing to open).
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
  right.appendChild(el("span", "badge badge-deal", tr(state, "outletDiscountBadge", { n: shop.discount.maxPercent, count: shop.discount.itemCount })));
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
  const shops = shopsWithDiscounts(mall, byName);
  if (!shops.some((s) => s.discount)) root.appendChild(el("div", "muted", tr(state, "outletNoDiscounts")));
  const list = el("div", "store-list");
  for (const shop of shops) list.appendChild(outletShopRow(shop, state, actions, mall.id));
  root.appendChild(list);
}

// One brand's own hotlinked photo, or the neutral icon — same
// SHOW_STORE_IMAGES gate as grocery product photos (pricing.js): off
// means no image URL is ever requested here either.
function outletImageBox(item) {
  const box = el("div", "row-thumb");
  if (!SHOW_STORE_IMAGES || !item.image) {
    box.appendChild(neutralIcon());
    return box;
  }
  const img = document.createElement("img");
  img.loading = "lazy";
  img.decoding = "async";
  img.alt = "";
  img.referrerPolicy = "no-referrer";
  img.addEventListener("error", () => {
    box.textContent = "";
    box.appendChild(neutralIcon());
  });
  img.src = item.image;
  box.appendChild(img);
  return box;
}

// One real sale item: photo, name, sale price, struck-through regular
// price, discount %, and a link to the brand's own product page.
function outletItemRow(item, state) {
  const row = el("div", "store-row single-row");
  row.appendChild(outletImageBox(item));
  const left = el("div", "store-left");
  left.appendChild(el("div", "single-name", item.name));
  if (item.link) {
    const link = document.createElement("a");
    link.className = "store-link";
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = tr(state, "viewAtStore");
    left.appendChild(link);
  }
  row.appendChild(left);
  const right = el("div", "store-right");
  right.appendChild(el("div", "store-price", money(item.salePrice)));
  right.appendChild(el("div", "store-sub store-regular", tr(state, "usually", { price: money(item.regularPrice) })));
  right.appendChild(el("span", "badge badge-deal", `-${item.discountPercent}%`));
  row.appendChild(right);
  return row;
}

// The discounted items for one shop's brand — the label the owner
// asked for ("e-poe allahindlus; see bränd on selles keskuses
// esindatud") is shown right under the title, every time, so it's
// never mistaken for an in-mall price.
function renderOutletShop(root, state, actions) {
  root.textContent = "";
  const mall = findMall(state.outletMalls, state.outletMallId);
  const header = el("div", "header");
  header.appendChild(button("back", tr(state, "back", { name: mall ? mall.name : tr(state, "outlets") }), () => actions.openOutletMall(state.outletMallId)));
  root.appendChild(header);
  root.appendChild(el("h1", "screen-title", state.outletShopName || ""));
  root.appendChild(el("div", "muted", tr(state, "outletOnlineNote")));
  const byName = indexBrandsByName(state.outletBrands);
  const items = brandItemsForShopName(byName, state.outletShopName);
  if (items.length === 0) {
    root.appendChild(el("div", "muted", tr(state, "outletNoItems")));
    return;
  }
  const list = el("div", "store-list");
  for (const item of items) list.appendChild(outletItemRow(item, state));
  root.appendChild(list);
}

function renderError(root, state) {
  root.textContent = "";
  root.appendChild(el("h1", "screen-title", tr(state, "noData")));
  root.appendChild(el("div", "muted", tr(state, "noDataHelp")));
}

function renderApp(root, nav, state, actions) {
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
