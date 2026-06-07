const catalogEditor = document.querySelector("#catalogEditor");
const catalogStatus = document.querySelector("#catalogStatus");
const ordersStatus = document.querySelector("#ordersStatus");
const ordersList = document.querySelector("#ordersList");
const adminStats = document.querySelector("#adminStats");
const saveCatalogButton = document.querySelector("#saveCatalogButton");
const reloadCatalogButton = document.querySelector("#reloadCatalogButton");
const refreshOrdersButton = document.querySelector("#refreshOrdersButton");
const logoutButton = document.querySelector("#logoutButton");

let catalogCache = [];
let ordersCache = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(element, message, type = "") {
  element.textContent = message;
  element.classList.toggle("is-error", type === "error");
  element.classList.toggle("is-success", type === "success");
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderStats() {
  const productCount = Array.isArray(catalogCache) ? catalogCache.length : 0;
  const orderCount = Array.isArray(ordersCache) ? ordersCache.length : 0;
  const itemsCount = Array.isArray(ordersCache)
    ? ordersCache.reduce((sum, order) => sum + Number(order?.summary?.totalItems || 0), 0)
    : 0;

  adminStats.innerHTML = `
    <article><strong>${productCount}</strong><span>Productos</span></article>
    <article><strong>${orderCount}</strong><span>Pedidos</span></article>
    <article><strong>${itemsCount}</strong><span>Items vendidos</span></article>
  `;
}

function renderOrders() {
  if (!ordersCache.length) {
    ordersList.innerHTML = `<div class="empty-state">Todavia no hay pedidos guardados.</div>`;
    return;
  }

  ordersList.innerHTML = ordersCache
    .map((order) => {
      const items = Array.isArray(order.items)
        ? order.items.map((item) => `<li>${escapeHtml(item.quantity)} x ${escapeHtml(item.name)}</li>`).join("")
        : "";

      return `
        <article class="order-card">
          <div class="order-card-head">
            <div>
              <strong>${escapeHtml(order.customer?.name || "Sin nombre")}</strong>
              <span>${escapeHtml(formatDate(order.createdAt))}</span>
            </div>
            <span class="order-pill">${escapeHtml(order.summary?.totalItems || 0)} items</span>
          </div>
          <p><strong>Email:</strong> ${escapeHtml(order.customer?.email || "-")}</p>
          <p><strong>Telefono:</strong> ${escapeHtml(order.customer?.phone || "-")}</p>
          <p><strong>Entrega:</strong> ${escapeHtml(order.customer?.delivery || "-")}</p>
          ${order.customer?.notes ? `<p><strong>Notas:</strong> ${escapeHtml(order.customer.notes)}</p>` : ""}
          <ul>${items}</ul>
        </article>
      `;
    })
    .join("");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    cache: "no-store",
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Operacion fallida.");
  }
  return payload;
}

async function loadCatalog() {
  setStatus(catalogStatus, "Cargando catalogo...");
  catalogCache = await fetchJson("/api/catalog");
  catalogEditor.value = JSON.stringify(catalogCache, null, 2);
  renderStats();
  setStatus(catalogStatus, `Catalogo cargado (${catalogCache.length} productos).`, "success");
}

async function loadOrders() {
  setStatus(ordersStatus, "Cargando pedidos...");
  ordersCache = await fetchJson("/api/orders");
  renderOrders();
  renderStats();
  setStatus(ordersStatus, `Pedidos cargados (${ordersCache.length}).`, "success");
}

async function checkSession() {
  const session = await fetchJson("/api/auth/session");
  if (!session.authenticated) {
    window.location.href = "/login";
    return false;
  }
  return true;
}

saveCatalogButton.addEventListener("click", async () => {
  saveCatalogButton.disabled = true;
  setStatus(catalogStatus, "Guardando catalogo...");

  try {
    const parsed = JSON.parse(catalogEditor.value);
    await fetchJson("/api/catalog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    });

    await loadCatalog();
  } catch (error) {
    setStatus(catalogStatus, error.message || "No se pudo guardar el catalogo.", "error");
  } finally {
    saveCatalogButton.disabled = false;
  }
});

reloadCatalogButton.addEventListener("click", () => {
  loadCatalog().catch((error) => setStatus(catalogStatus, error.message || "No se pudo recargar el catalogo.", "error"));
});
refreshOrdersButton.addEventListener("click", () => {
  loadOrders().catch((error) => setStatus(ordersStatus, error.message || "No se pudo recargar los pedidos.", "error"));
});

logoutButton.addEventListener("click", async () => {
  await fetchJson("/api/auth/logout", { method: "POST" }).catch(() => {});
  window.location.href = "/login";
});

(async function boot() {
  const authenticated = await checkSession().catch(() => false);
  if (!authenticated) {
    return;
  }

  try {
    await Promise.all([loadCatalog(), loadOrders()]);
  } catch (error) {
    const message = error.message || "No se pudo cargar el panel.";
    setStatus(catalogStatus, message, "error");
    setStatus(ordersStatus, message, "error");
  }
})();
