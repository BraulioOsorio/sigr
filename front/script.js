/**
 * SIGR — front modular (HTML + CSS + JS vanilla). Persistencia: localStorage únicamente.
 */

const STORAGE_CART = "sigr_cart_v1";
const STORAGE_ORDERS = "sigr_orders_v1";
const STORAGE_MENU = "sigr_menu_v1";
const STORAGE_SESSION = "sigr_session_v1";
const STORAGE_RESERVATIONS = "sigr_reservations_v1";
const STORAGE_CASH = "sigr_cash_closures_v1";

const ORDER_STATUSES = ["pendiente", "en_preparacion", "listo", "entregado"];

const DEFAULT_DISH_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

function foodPhoto(path) {
  return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=960&h=720&q=88`;
}

const MENU_SEED = [
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

function getMenu() {
  try {
    const raw = localStorage.getItem(STORAGE_MENU);
    if (raw) {
      const p = JSON.parse(raw);
      if (Array.isArray(p) && p.length) return p;
    }
  } catch {
    /* vacío */
  }
  return MENU_SEED.map((d) => ({ ...d }));
}

function saveMenu(items) {
  localStorage.setItem(STORAGE_MENU, JSON.stringify(items));
}

function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s && s.role && s.name) return s;
  } catch {
    /* */
  }
  return null;
}

function setSession(name, role) {
  const payload = {
    name: String(name).trim(),
    role: String(role),
    at: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(payload));
}

function clearSession() {
  localStorage.removeItem(STORAGE_SESSION);
}

function getOrders() {
  let orders = [];
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS);
    if (raw) orders = JSON.parse(raw);
    if (!Array.isArray(orders)) orders = [];
  } catch {
    orders = [];
  }
  return orders.map((o) => ({
    ...o,
    status: o.status && ORDER_STATUSES.includes(o.status) ? o.status : "pendiente",
  }));
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
}

function getReservations() {
  try {
    const raw = localStorage.getItem(STORAGE_RESERVATIONS);
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

function saveReservations(list) {
  localStorage.setItem(STORAGE_RESERVATIONS, JSON.stringify(list));
}

function getCashClosures() {
  try {
    const raw = localStorage.getItem(STORAGE_CASH);
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

function saveCashClosures(list) {
  localStorage.setItem(STORAGE_CASH, JSON.stringify(list));
}

function dateKeyFromIso(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** @type {Record<string, { dish: object, qty: number }>} */
let cart = {};

function formatMoney(n) {
  return (
    Number(n).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
  );
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_CART);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const menu = getMenu();
      cart = {};
      for (const id of Object.keys(parsed)) {
        const row = parsed[id];
        const dish = menu.find((d) => d.id === id);
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
  const dish = getMenu().find((d) => d.id === dishId);
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

function buildCategoryList() {
  const cats = new Set(getMenu().map((d) => d.category).filter(Boolean));
  return ["Todos", ...Array.from(cats).sort((a, b) => a.localeCompare(b, "es"))];
}

function getFilteredMenu() {
  const q = searchQuery.trim().toLowerCase();
  return getMenu().filter((d) => {
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
  const list = buildCategoryList();
  if (!list.includes(activeCategory)) activeCategory = "Todos";
  wrap.innerHTML = "";
  list.forEach((cat) => {
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
        <img class="menu-card-image" src="${escapeHtml(dish.image)}" alt="${escapeHtml(dish.name)}" loading="lazy" decoding="async" width="400" height="300" />
      </div>
      <div class="menu-card-body">
        <span class="menu-card-cat">${escapeHtml(dish.category)}</span>
        <h3 class="menu-card-name">${escapeHtml(dish.name)}</h3>
        <p class="menu-card-desc">${escapeHtml(dish.description)}</p>
        <div class="menu-card-row">
          <span class="menu-card-price">${formatMoney(dish.price)}</span>
          <button type="button" class="btn btn-primary btn-add" data-add="${escapeHtml(dish.id)}">
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
  div.textContent = text == null ? "" : String(text);
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
      <img class="cart-item-thumb" src="${escapeHtml(dish.image)}" alt="" width="56" height="56" loading="lazy" />
      <div class="cart-item-info">
        <p class="cart-item-name">${escapeHtml(dish.name)}</p>
        <p class="cart-item-price">${formatMoney(dish.price)} × ${qty} = ${formatMoney(dish.price * qty)}</p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-row">
          <button type="button" class="qty-btn" data-dec="${escapeHtml(dish.id)}" aria-label="Menos">−</button>
          <span class="qty-value">${qty}</span>
          <button type="button" class="qty-btn" data-inc="${escapeHtml(dish.id)}" aria-label="Más">+</button>
        </div>
        <button type="button" class="btn-remove" data-remove="${escapeHtml(dish.id)}">Quitar</button>
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
  const orders = getOrders();
  orders.push({
    ...order,
    status: "pendiente",
    updatedAt: order.at,
  });
  saveOrders(orders);
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

function showView(viewId) {
  document.querySelectorAll(".view").forEach((v) => {
    v.classList.toggle("hidden", v.id !== "view-" + viewId);
    v.classList.toggle("view-active", v.id === "view-" + viewId);
  });
  document.querySelectorAll(".nav-tab").forEach((t) => {
    t.classList.toggle("is-active", t.dataset.view === viewId);
  });
  const cartBtn = document.getElementById("cart-toggle");
  if (cartBtn) cartBtn.classList.toggle("hidden", viewId !== "pedidos");

  if (viewId === "menu-admin") {
    fillCategoryDatalist();
    renderMenuAdminTable();
  }
  if (viewId === "pedidos-live") renderOrdersLive();
  if (viewId === "reservas") renderReservas();
  if (viewId === "caja") {
    initCajaFecha();
    renderCajaClosures();
    document.getElementById("caja-resumen")?.classList.add("hidden");
  }
  if (viewId === "auth") renderAuthPanel();
}

function updateSessionBadge() {
  const el = document.getElementById("session-badge");
  const s = getSession();
  if (!el) return;
  if (!s) {
    el.classList.add("hidden");
    el.textContent = "";
    return;
  }
  const roleLabel =
    s.role === "administrador" ? "Admin" : s.role === "mesero" ? "Mesero" : "Cliente";
  el.textContent = `${roleLabel}: ${s.name}`;
  el.classList.remove("hidden");
}

function renderAuthPanel() {
  const cur = document.getElementById("auth-current");
  const form = document.getElementById("auth-form");
  const s = getSession();
  if (!cur || !form) return;
  if (s) {
    cur.classList.remove("hidden");
    cur.innerHTML = `<p><strong>Sesión activa:</strong> ${escapeHtml(s.name)} — rol <strong>${escapeHtml(s.role)}</strong>.</p>`;
    form.classList.add("hidden");
  } else {
    cur.classList.add("hidden");
    form.classList.remove("hidden");
  }
}

function fillCategoryDatalist() {
  const dl = document.getElementById("category-datalist");
  if (!dl) return;
  dl.innerHTML = "";
  const cats = new Set(getMenu().map((d) => d.category));
  cats.forEach((c) => {
    const o = document.createElement("option");
    o.value = c;
    dl.appendChild(o);
  });
}

function renderMenuAdminTable() {
  const tbody = document.getElementById("menu-admin-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  getMenu().forEach((dish) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(dish.name)}</td>
      <td>${escapeHtml(dish.category)}</td>
      <td>${formatMoney(dish.price)}</td>
      <td class="table-actions">
        <button type="button" class="btn btn-ghost btn-sm" data-edit="${escapeHtml(dish.id)}">Editar</button>
        <button type="button" class="btn btn-ghost btn-sm danger-text" data-del="${escapeHtml(dish.id)}">Eliminar</button>
      </td>
    `;
    tr.querySelector("[data-edit]")?.addEventListener("click", () => editDishPrompt(dish.id));
    tr.querySelector("[data-del]")?.addEventListener("click", () => deleteDish(dish.id));
    tbody.appendChild(tr);
  });
}

function editDishPrompt(id) {
  const menu = getMenu();
  const d = menu.find((x) => x.id === id);
  if (!d) return;
  const name = window.prompt("Nombre del plato", d.name);
  if (name === null) return;
  const desc = window.prompt("Descripción", d.description || "") ?? "";
  const priceStr = window.prompt("Precio (número, ej. 12.5)", String(d.price));
  if (priceStr === null) return;
  const price = Number(priceStr);
  if (Number.isNaN(price) || price < 0) return;
  const cat = window.prompt("Categoría", d.category);
  if (cat === null) return;
  const img = window.prompt("URL de imagen", d.image || DEFAULT_DISH_IMAGE);
  if (img === null) return;
  const next = menu.map((x) =>
    x.id === id
      ? { ...x, name: name.trim(), description: desc.trim(), price, category: cat.trim(), image: img.trim() || DEFAULT_DISH_IMAGE }
      : x
  );
  saveMenu(next);
  loadCartFromStorage();
  renderCategoryFilters();
  renderMenu();
  renderMenuAdminTable();
  fillCategoryDatalist();
}

function deleteDish(id) {
  if (!window.confirm("¿Eliminar este plato del menú local?")) return;
  const next = getMenu().filter((d) => d.id !== id);
  saveMenu(next);
  delete cart[id];
  saveCartToStorage();
  loadCartFromStorage();
  renderCategoryFilters();
  renderMenu();
  renderCart();
  renderMenuAdminTable();
  fillCategoryDatalist();
}

function renderOrdersLive() {
  const tbody = document.getElementById("orders-live-tbody");
  const empty = document.getElementById("orders-live-empty");
  if (!tbody || !empty) return;
  const orders = getOrders().slice().reverse();
  tbody.innerHTML = "";
  if (orders.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  orders.forEach((o) => {
    const tr = document.createElement("tr");
    const opts = ORDER_STATUSES.map(
      (st) =>
        `<option value="${st}" ${o.status === st ? "selected" : ""}>${st.replace(/_/g, " ")}</option>`
    ).join("");
    tr.innerHTML = `
      <td><code>${escapeHtml(o.id)}</code></td>
      <td>${escapeHtml(new Date(o.at).toLocaleString("es-ES"))}</td>
      <td>${escapeHtml(o.customer)}</td>
      <td>${formatMoney(o.total)}</td>
      <td><select class="status-select" data-order-id="${escapeHtml(o.id)}">${opts}</select></td>
    `;
    tr.querySelector(".status-select")?.addEventListener("change", (e) => {
      const id = e.target.getAttribute("data-order-id");
      const status = e.target.value;
      const all = getOrders();
      const ord = all.find((x) => x.id === id);
      if (ord) {
        ord.status = status;
        ord.updatedAt = new Date().toISOString();
        saveOrders(all);
      }
    });
    tbody.appendChild(tr);
  });
}

function renderReservas() {
  const list = document.getElementById("reserva-list");
  const empty = document.getElementById("reserva-empty");
  if (!list || !empty) return;
  const items = getReservations().slice().reverse();
  list.innerHTML = "";
  if (items.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  items.forEach((r) => {
    const li = document.createElement("li");
    li.className = "reserva-item";
    li.innerHTML = `
      <div>
        <strong>${escapeHtml(r.nombre)}</strong> — ${escapeHtml(r.fecha)} ${escapeHtml(r.hora)} · ${r.comensales} pax
        ${r.notas ? `<div class="reserva-note">${escapeHtml(r.notas)}</div>` : ""}
      </div>
      <button type="button" class="btn btn-ghost btn-sm danger-text" data-res-del="${escapeHtml(r.id)}">Eliminar</button>
    `;
    li.querySelector("[data-res-del]")?.addEventListener("click", () => {
      saveReservations(getReservations().filter((x) => x.id !== r.id));
      renderReservas();
    });
    list.appendChild(li);
  });
}

function initCajaFecha() {
  const inp = document.getElementById("caja-fecha");
  if (!inp || inp.value) return;
  const t = new Date();
  inp.value = dateKeyFromIso(t.toISOString());
}

function renderCajaClosures() {
  const tbody = document.getElementById("caja-cierres-tbody");
  const empty = document.getElementById("caja-cierres-empty");
  if (!tbody || !empty) return;
  const rows = getCashClosures().slice().reverse();
  tbody.innerHTML = "";
  if (rows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(r.dateKey)}</td>
      <td>${formatMoney(r.total)}</td>
      <td>${r.orderCount}</td>
      <td>${escapeHtml(new Date(r.closedAt).toLocaleString("es-ES"))}</td>
    `;
    tbody.appendChild(tr);
  });
}

function calcularCajaDia(dateKey) {
  const orders = getOrders();
  let total = 0;
  let count = 0;
  orders.forEach((o) => {
    if (dateKeyFromIso(o.at) === dateKey) {
      total += Number(o.total) || 0;
      count += 1;
    }
  });
  return { total, count };
}

function init() {
  loadCartFromStorage();
  renderCategoryFilters();
  renderMenu();
  renderCart();
  updateSessionBadge();

  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });

  document.getElementById("auth-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("auth-name")?.value.trim();
    const role = document.getElementById("auth-role")?.value;
    if (!name) return;
    setSession(name, role);
    updateSessionBadge();
    renderAuthPanel();
  });

  document.getElementById("auth-clear")?.addEventListener("click", () => {
    clearSession();
    updateSessionBadge();
    renderAuthPanel();
    document.getElementById("auth-form")?.reset();
  });

  document.getElementById("menu-reset-seed")?.addEventListener("click", () => {
    if (!window.confirm("¿Borrar el menú personalizado y volver al menú por defecto?")) return;
    localStorage.removeItem(STORAGE_MENU);
    loadCartFromStorage();
    renderCategoryFilters();
    renderMenu();
    renderMenuAdminTable();
    fillCategoryDatalist();
  });

  document.getElementById("menu-refresh-views")?.addEventListener("click", () => {
    loadCartFromStorage();
    renderCategoryFilters();
    renderMenu();
    showView("pedidos");
  });

  document.getElementById("dish-add-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("dish-new-name")?.value.trim();
    const desc = document.getElementById("dish-new-desc")?.value.trim() ?? "";
    const price = Number(document.getElementById("dish-new-price")?.value);
    const cat = document.getElementById("dish-new-cat")?.value.trim();
    let img = document.getElementById("dish-new-img")?.value.trim() || "";
    if (!name || !cat || Number.isNaN(price) || price < 0) return;
    if (!img) img = DEFAULT_DISH_IMAGE;
    const id = "d-" + Date.now().toString(36);
    const next = [...getMenu(), { id, name, description: desc, price, category: cat, image: img }];
    saveMenu(next);
    e.target.reset();
    loadCartFromStorage();
    renderCategoryFilters();
    renderMenu();
    renderMenuAdminTable();
    fillCategoryDatalist();
  });

  document.getElementById("orders-refresh")?.addEventListener("click", () => renderOrdersLive());

  document.getElementById("reserva-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("res-nombre")?.value.trim();
    const fecha = document.getElementById("res-fecha")?.value;
    const hora = document.getElementById("res-hora")?.value;
    const comensales = Number(document.getElementById("res-comensales")?.value);
    const notas = document.getElementById("res-notas")?.value.trim() ?? "";
    if (!nombre || !fecha || !hora) return;
    const r = {
      id: "RES-" + Date.now().toString(36).toUpperCase(),
      nombre,
      fecha,
      hora,
      comensales: Number.isFinite(comensales) && comensales > 0 ? comensales : 2,
      notas,
      at: new Date().toISOString(),
    };
    saveReservations([...getReservations(), r]);
    e.target.reset();
    renderReservas();
  });

  document.getElementById("caja-calc")?.addEventListener("click", () => {
    const dateKey = document.getElementById("caja-fecha")?.value;
    if (!dateKey) return;
    const { total, count } = calcularCajaDia(dateKey);
    const box = document.getElementById("caja-resumen");
    if (box) {
      box.classList.remove("hidden");
      box.innerHTML = `<p><strong>Día ${escapeHtml(dateKey)}</strong>: ${count} pedido(s), total <strong>${formatMoney(total)}</strong>.</p>`;
    }
  });

  document.getElementById("caja-cerrar")?.addEventListener("click", () => {
    const dateKey = document.getElementById("caja-fecha")?.value;
    if (!dateKey) return;
    const { total, count } = calcularCajaDia(dateKey);
    const closures = getCashClosures();
    closures.push({
      dateKey,
      total,
      orderCount: count,
      closedAt: new Date().toISOString(),
    });
    saveCashClosures(closures);
    renderCajaClosures();
  });

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
  renderAuthPanel();
}

document.addEventListener("DOMContentLoaded", init);
