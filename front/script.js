/**
 * SIGR — pedidos (HTML + CSS + JS vanilla)
 */

const STORAGE_CART = "sigr_cart_v1";
const STORAGE_ORDERS = "sigr_orders_v1";

/** Parámetros Unsplash: recorte fijo, calidad alta, formato automático (webp cuando el navegador lo permite). */
function foodPhoto(path) {
  return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=960&h=720&q=88`;
}

const CATEGORIES = ["Todos", "Entradas", "Platos fuertes", "Bebidas", "Postres"];

const MENU = [
  {
    id: "e1",
    name: "Bruschetta al pomodoro",
    description: "Pan tostado con tomate fresco, albahaca y aceite de oliva virgen extra.",
    price: 6.5,
    category: "Entradas",
    image: foodPhoto("photo-1544025162-d76694265947"),
  },
  {
    id: "e2",
    name: "Ensalada César",
    description: "Lechuga romana, parmesano, picatostes y aderezo César.",
    price: 8.9,
    category: "Entradas",
    image: foodPhoto("photo-1546793665-c74683f339c1"),
  },
  {
    id: "p1",
    name: "Pasta carbonara",
    description: "Spaghetti con huevo, guanciale, pecorino y pimienta negra.",
    price: 13.5,
    category: "Platos fuertes",
    image: foodPhoto("photo-1621996346565-e3dbc646d9a9"),
  },
  {
    id: "p2",
    name: "Salmón a la plancha",
    description: "Lomo de salmón con limón, eneldo y guarnición de verduras.",
    price: 16.9,
    category: "Platos fuertes",
    image: foodPhoto("photo-1467003909585-2f8a72700288"),
  },
  {
    id: "p3",
    name: "Risotto de setas",
    description: "Arroz arborio cremoso con porcini y parmesano.",
    price: 14.2,
    category: "Platos fuertes",
    image: foodPhoto("photo-1563379926898-05f4575a45d8"),
  },
  {
    id: "p4",
    name: "Hamburguesa SIGR",
    description: "Carne 180 g, cheddar, bacon crujiente y pan brioche.",
    price: 12.0,
    category: "Platos fuertes",
    image: foodPhoto("photo-1550547660-d9450f859349"),
  },
  {
    id: "b1",
    name: "Limonada casera",
    description: "Limón fresco, menta y un toque de jengibre.",
    price: 3.5,
    category: "Bebidas",
    image: foodPhoto("photo-1559339352-11d035aa65de"),
  },
  {
    id: "b2",
    name: "Copa de vino tinto",
    description: "Selección de la casa (Ribera / Rioja según disponibilidad).",
    price: 4.5,
    category: "Bebidas",
    image: foodPhoto("photo-1510812431401-41d2bd2722f3"),
  },
  {
    id: "b3",
    name: "Café espresso",
    description: "Mezcla tostada media, notas a chocolate.",
    price: 2.2,
    category: "Bebidas",
    image: foodPhoto("photo-1509042239860-f550ce710b93"),
  },
  {
    id: "o1",
    name: "Tiramisú",
    description: "Mascarpone, café y cacao en polvo — receta clásica.",
    price: 6.0,
    category: "Postres",
    image: foodPhoto("photo-1571877227200-a0d98ea607e9"),
  },
  {
    id: "o2",
    name: "Cheesecake de frutos rojos",
    description: "Base de galleta y coulis de frambuesa.",
    price: 6.5,
    category: "Postres",
    image: foodPhoto("photo-1488477181946-6428a0291777"),
  },
  {
    id: "o3",
    name: "Helado artesanal",
    description: "Dos bolas: vainilla bourbon y pistacho.",
    price: 5.5,
    category: "Postres",
    image: foodPhoto("photo-1563805042-7684c019e1cb"),
  },
];

/** @type {Record<string, { dish: typeof MENU[0], qty: number }>} */
let cart = {};

function formatMoney(n) {
  return (
    n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " €"
  );
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_CART);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      cart = {};
      for (const id of Object.keys(parsed)) {
        const row = parsed[id];
        const dish = MENU.find((d) => d.id === id);
        if (dish && row && typeof row.qty === "number" && row.qty > 0) {
          cart[id] = { dish, qty: Math.floor(row.qty) };
        }
      }
    }
  } catch {
    cart = {};
  }
}

function saveCartToStorage() {
  const minimal = {};
  for (const id of Object.keys(cart)) {
    minimal[id] = { qty: cart[id].qty };
  }
  localStorage.setItem(STORAGE_CART, JSON.stringify(minimal));
}

function getCartLineItems() {
  return Object.values(cart);
}

function getCartCount() {
  return getCartLineItems().reduce((s, line) => s + line.qty, 0);
}

function getCartTotal() {
  return getCartLineItems().reduce((s, line) => s + line.dish.price * line.qty, 0);
}

function addToCart(dishId) {
  const dish = MENU.find((d) => d.id === dishId);
  if (!dish) return;
  if (!cart[dishId]) cart[dishId] = { dish, qty: 0 };
  cart[dishId].qty += 1;
  saveCartToStorage();
  renderCart();
  renderMenu();
  pulseCartBadge();
}

function setQty(dishId, qty) {
  const q = Math.max(0, Math.floor(Number(qty)));
  if (!cart[dishId]) return;
  if (q === 0) {
    delete cart[dishId];
  } else {
    cart[dishId].qty = q;
  }
  saveCartToStorage();
  renderCart();
  renderMenu();
}

function removeLine(dishId) {
  delete cart[dishId];
  saveCartToStorage();
  renderCart();
  renderMenu();
}

function clearCart() {
  cart = {};
  saveCartToStorage();
  renderCart();
  renderMenu();
}

function pulseCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  badge.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }],
    { duration: 280, easing: "ease-out" }
  );
}

let activeCategory = "Todos";
let searchQuery = "";

function getFilteredMenu() {
  const q = searchQuery.trim().toLowerCase();
  return MENU.filter((d) => {
    const catOk = activeCategory === "Todos" || d.category === activeCategory;
    if (!catOk) return false;
    if (!q) return true;
    const blob = (d.name + " " + d.description).toLowerCase();
    return blob.includes(q);
  });
}

function renderCategoryFilters() {
  const wrap = document.getElementById("category-filters");
  if (!wrap) return;
  wrap.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip" + (cat === activeCategory ? " is-active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      renderCategoryFilters();
      renderMenu();
    });
    wrap.appendChild(btn);
  });
}

function renderMenu() {
  const grid = document.getElementById("menu-grid");
  const empty = document.getElementById("menu-empty");
  if (!grid || !empty) return;

  const list = getFilteredMenu();
  grid.innerHTML = "";

  if (list.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  list.forEach((dish, index) => {
    const inCart = cart[dish.id];
    const qty = inCart ? inCart.qty : 0;

    const article = document.createElement("article");
    article.className = "menu-card";
    article.style.animationDelay = `${Math.min(index * 0.04, 0.4)}s`;

    article.innerHTML = `
      <div class="menu-card-image-wrap">
        <img class="menu-card-image" src="${dish.image}" alt="${escapeHtml(dish.name)}" loading="lazy" decoding="async" width="400" height="300" />
      </div>
      <div class="menu-card-body">
        <span class="menu-card-cat">${escapeHtml(dish.category)}</span>
        <h3 class="menu-card-name">${escapeHtml(dish.name)}</h3>
        <p class="menu-card-desc">${escapeHtml(dish.description)}</p>
        <div class="menu-card-row">
          <span class="menu-card-price">${formatMoney(dish.price)}</span>
          <button type="button" class="btn btn-primary btn-add" data-add="${dish.id}">
            Agregar al pedido${qty ? ` (${qty})` : ""}
          </button>
        </div>
      </div>
    `;

    article.querySelector("[data-add]")?.addEventListener("click", () => addToCart(dish.id));
    grid.appendChild(article);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderCart() {
  const listEl = document.getElementById("cart-list");
  const emptyEl = document.getElementById("cart-empty");
  const totalEl = document.getElementById("cart-total");
  const btnCheckout = document.getElementById("btn-checkout");
  const badge = document.getElementById("cart-badge");

  if (!listEl || !emptyEl || !totalEl || !btnCheckout) return;

  const lines = getCartLineItems();
  const count = getCartCount();
  if (badge) badge.textContent = String(count);

  listEl.innerHTML = "";

  if (lines.length === 0) {
    emptyEl.classList.remove("hidden");
    totalEl.textContent = formatMoney(0);
    btnCheckout.disabled = true;
    return;
  }

  emptyEl.classList.add("hidden");
  btnCheckout.disabled = false;

  lines.forEach((line) => {
    const { dish, qty } = line;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img class="cart-item-thumb" src="${dish.image}" alt="" width="56" height="56" loading="lazy" />
      <div class="cart-item-info">
        <p class="cart-item-name">${escapeHtml(dish.name)}</p>
        <p class="cart-item-price">${formatMoney(dish.price)} × ${qty} = ${formatMoney(dish.price * qty)}</p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-row">
          <button type="button" class="qty-btn" data-dec="${dish.id}" aria-label="Menos">−</button>
          <span class="qty-value">${qty}</span>
          <button type="button" class="qty-btn" data-inc="${dish.id}" aria-label="Más">+</button>
        </div>
        <button type="button" class="btn-remove" data-remove="${dish.id}">Quitar</button>
      </div>
    `;
    li.querySelector("[data-dec]")?.addEventListener("click", () => setQty(dish.id, qty - 1));
    li.querySelector("[data-inc]")?.addEventListener("click", () => setQty(dish.id, qty + 1));
    li.querySelector("[data-remove]")?.addEventListener("click", () => removeLine(dish.id));
    listEl.appendChild(li);
  });

  totalEl.textContent = formatMoney(getCartTotal());
}

function openCart() {
  const overlay = document.getElementById("cart-overlay");
  const toggle = document.getElementById("cart-toggle");
  overlay?.classList.add("is-visible");
  overlay?.classList.remove("hidden");
  toggle?.setAttribute("aria-expanded", "true");
}

function closeCart() {
  const overlay = document.getElementById("cart-overlay");
  const toggle = document.getElementById("cart-toggle");
  overlay?.classList.remove("is-visible");
  toggle?.setAttribute("aria-expanded", "false");
  setTimeout(() => overlay?.classList.add("hidden"), 220);
}

function openCheckoutModal() {
  document.getElementById("checkout-overlay")?.classList.add("is-visible");
  document.getElementById("checkout-overlay")?.classList.remove("hidden");
}

function closeCheckoutModal() {
  const el = document.getElementById("checkout-overlay");
  el?.classList.remove("is-visible");
  setTimeout(() => el?.classList.add("hidden"), 220);
}

function closeCheckoutAndReturnToCart() {
  closeCheckoutModal();
  if (getCartCount() > 0) openCart();
}

function openSummaryModal(html) {
  const content = document.getElementById("summary-content");
  const overlay = document.getElementById("summary-overlay");
  if (content) content.innerHTML = html;
  overlay?.classList.add("is-visible");
  overlay?.classList.remove("hidden");
}

function closeSummaryModal() {
  const el = document.getElementById("summary-overlay");
  el?.classList.remove("is-visible");
  setTimeout(() => el?.classList.add("hidden"), 220);
}

function syncServiceFields() {
  const mesa = document.getElementById("field-mesa");
  const dir = document.getElementById("field-direccion");
  const mesaInput = document.getElementById("mesa-input");
  const dirInput = document.getElementById("direccion-input");
  const service = document.querySelector('input[name="service"]:checked')?.value;
  if (service === "domicilio") {
    mesa?.classList.add("hidden");
    dir?.classList.remove("hidden");
    mesaInput?.removeAttribute("required");
    dirInput?.setAttribute("required", "required");
  } else {
    mesa?.classList.remove("hidden");
    dir?.classList.add("hidden");
    dirInput?.removeAttribute("required");
    mesaInput?.setAttribute("required", "required");
  }
}

function appendOrderToStorage(order) {
  let orders = [];
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS);
    if (raw) orders = JSON.parse(raw);
    if (!Array.isArray(orders)) orders = [];
  } catch {
    orders = [];
  }
  orders.push(order);
  localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
}

function buildSummaryHtml(order) {
  const lines = order.items
    .map(
      (i) =>
        `<li>${escapeHtml(i.name)} × ${i.qty} — <strong>${formatMoney(i.price * i.qty)}</strong></li>`
    )
    .join("");

  const lugar =
    order.service === "mesa"
      ? `Mesa <strong>${escapeHtml(order.mesa || "—")}</strong>`
      : `Domicilio: ${escapeHtml(order.direccion || "—")}`;

  return `
    <p class="summary-success">¡Gracias, ${escapeHtml(order.customer)}! Tu pedido ha quedado registrado.</p>
    <div class="summary-block">
      <h3>Detalle</h3>
      <ul class="summary-lines">${lines}</ul>
      <p class="summary-total">Total: ${formatMoney(order.total)}</p>
    </div>
    <div class="summary-block">
      <h3>Servicio</h3>
      <p>${lugar}</p>
      <p style="margin-top:0.5rem;font-size:0.85rem;">Referencia local: <code style="color:var(--text);">${escapeHtml(order.id)}</code></p>
    </div>
  `;
}

function init() {
  loadCartFromStorage();
  renderCategoryFilters();
  renderMenu();
  renderCart();

  document.getElementById("search-input")?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderMenu();
  });

  document.getElementById("cart-toggle")?.addEventListener("click", () => {
    const overlay = document.getElementById("cart-overlay");
    if (overlay?.classList.contains("is-visible")) closeCart();
    else openCart();
  });

  document.getElementById("cart-modal-close")?.addEventListener("click", closeCart);

  document.getElementById("cart-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "cart-overlay") closeCart();
  });

  document.getElementById("btn-checkout")?.addEventListener("click", () => {
    if (getCartCount() === 0) return;
    syncServiceFields();
    openCheckoutModal();
    closeCart();
  });

  document.querySelectorAll('input[name="service"]').forEach((r) => {
    r.addEventListener("change", syncServiceFields);
  });

  document.getElementById("checkout-close")?.addEventListener("click", closeCheckoutAndReturnToCart);
  document.getElementById("checkout-cancel")?.addEventListener("click", closeCheckoutAndReturnToCart);
  document.getElementById("checkout-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "checkout-overlay") closeCheckoutAndReturnToCart();
  });

  document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const customer = form.customer.value.trim();
    const service = form.service.value;
    let mesa = "";
    let direccion = "";
    if (service === "mesa") {
      mesa = form.mesa.value.trim();
      if (!mesa) {
        form.mesa.focus();
        return;
      }
    } else {
      direccion = form.direccion.value.trim();
      if (!direccion) {
        form.direccion.focus();
        return;
      }
    }

    const items = getCartLineItems().map((line) => ({
      id: line.dish.id,
      name: line.dish.name,
      price: line.dish.price,
      qty: line.qty,
    }));
    const total = getCartTotal();
    const order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      at: new Date().toISOString(),
      customer,
      service,
      mesa: service === "mesa" ? mesa : "",
      direccion: service === "domicilio" ? direccion : "",
      items,
      total,
    };

    appendOrderToStorage(order);
    clearCart();
    closeCheckoutModal();
    openSummaryModal(buildSummaryHtml(order));
    form.reset();
    const mesaRadio = form.querySelector('input[name="service"][value="mesa"]');
    if (mesaRadio) mesaRadio.checked = true;
    syncServiceFields();
  });

  document.getElementById("summary-done")?.addEventListener("click", closeSummaryModal);
  document.getElementById("summary-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "summary-overlay") closeSummaryModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const summaryEl = document.getElementById("summary-overlay");
    const checkoutEl = document.getElementById("checkout-overlay");
    const cartEl = document.getElementById("cart-overlay");
    if (summaryEl?.classList.contains("is-visible")) {
      e.preventDefault();
      closeSummaryModal();
      return;
    }
    if (checkoutEl?.classList.contains("is-visible")) {
      e.preventDefault();
      closeCheckoutAndReturnToCart();
      return;
    }
    if (cartEl?.classList.contains("is-visible")) {
      e.preventDefault();
      closeCart();
    }
  });

  syncServiceFields();
}

document.addEventListener("DOMContentLoaded", init);
