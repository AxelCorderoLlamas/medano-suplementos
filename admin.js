const catalogList = document.querySelector("#catalogList");
const catalogStatus = document.querySelector("#catalogStatus");
const catalogCountStatus = document.querySelector("#catalogCountStatus");
const ordersStatus = document.querySelector("#ordersStatus");
const ordersList = document.querySelector("#ordersList");
const adminStats = document.querySelector("#adminStats");
const adminTabs = document.querySelectorAll("[data-admin-tab]");
const adminPanels = document.querySelectorAll("[data-admin-panel]");
const saveCatalogButton = document.querySelector("#saveCatalogButton");
const reloadCatalogButton = document.querySelector("#reloadCatalogButton");
const refreshOrdersButton = document.querySelector("#refreshOrdersButton");
const logoutButton = document.querySelector("#logoutButton");
const newProductButton = document.querySelector("#newProductButton");
const duplicateProductButton = document.querySelector("#duplicateProductButton");
const deleteProductButton = document.querySelector("#deleteProductButton");
const catalogSearchInput = document.querySelector("#catalogSearchInput");
const productForm = document.querySelector("#productForm");
const productFormTitle = document.querySelector("#productFormTitle");
const productStatus = document.querySelector("#productStatus");
const productIdInput = document.querySelector("#productId");
const productNameInput = document.querySelector("#productName");
const productBrandInput = document.querySelector("#productBrand");
const productCategoryInput = document.querySelector("#productCategory");
const productTypeInput = document.querySelector("#productType");
const productGoalInput = document.querySelector("#productGoal");
const productFlavorInput = document.querySelector("#productFlavor");
const productFlavorsInput = document.querySelector("#productFlavors");
const productTagsInput = document.querySelector("#productTags");
const productPriceInput = document.querySelector("#productPrice");
const productOldPriceInput = document.querySelector("#productOldPrice");
const productShowPriceInput = document.querySelector("#productShowPrice");
const productFeatureInput = document.querySelector("#productFeature");
const productDescriptionInput = document.querySelector("#productDescription");
const productDoesInput = document.querySelector("#productDoes");
const productHowInput = document.querySelector("#productHow");
const productPairInput = document.querySelector("#productPair");
const productImageInput = document.querySelector("#productImage");
const productImageFileInput = document.querySelector("#productImageFile");
const uploadImageButton = document.querySelector("#uploadImageButton");
const productImagePreview = document.querySelector("#productImagePreview");

let catalogCache = [];
let ordersCache = [];
let selectedProductId = "";
let catalogSearchTerm = "";
let activeAdminTab = window.localStorage.getItem("admin-active-tab") || "catalog";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

function setStatus(element, message, type = "") {
  element.textContent = message;
  element.classList.toggle("is-error", type === "error");
  element.classList.toggle("is-success", type === "success");
}

function setActiveTab(tabName) {
  activeAdminTab = tabName === "orders" ? "orders" : "catalog";
  window.localStorage.setItem("admin-active-tab", activeAdminTab);

  adminTabs.forEach((button) => {
    const isActive = button.dataset.adminTab === activeAdminTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  adminPanels.forEach((panel) => {
    const isActive = panel.dataset.adminPanel === activeAdminTab;
    panel.hidden = !isActive;
  });
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

function renderCatalogList() {
  const filteredCatalog = catalogCache.filter((product) => {
    const query = catalogSearchTerm.trim().toLowerCase();
    if (!query) return true;

    const searchable = [
      product.name,
      product.brand,
      product.type,
      product.category,
      product.feature,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });

  if (!filteredCatalog.length) {
    catalogList.innerHTML = `<div class="empty-state">No hay productos cargados.</div>`;
    setStatus(catalogCountStatus, catalogSearchTerm ? "Sin resultados para la busqueda." : "0 productos visibles.");
    return;
  }

  catalogList.innerHTML = filteredCatalog
    .map((product, index) => {
      const active = product.id === selectedProductId ? "is-active" : "";
      const feature = product.feature ? `<span>${escapeHtml(product.feature)}</span>` : "";
      const price = product.price ? `<strong>${escapeHtml(product.price)}</strong>` : "<strong>Sin precio</strong>";
      const priceState = product.showPrice === true
        ? `<span class="catalog-price-state is-public">Precio publico</span>`
        : `<span class="catalog-price-state">Precio oculto</span>`;

      return `
        <button class="catalog-item ${active}" type="button" data-edit-product="${escapeHtml(product.id)}">
          <div class="catalog-item-top">
            <div>
              <strong>${escapeHtml(product.name || "Sin nombre")}</strong>
              <span>${escapeHtml(product.brand || "Sin marca")}</span>
            </div>
            <small>#${index + 1}</small>
          </div>
          <div class="catalog-item-meta">
            <span>${escapeHtml(product.type || "Sin tipo")}</span>
            ${feature}
            ${price}
            ${priceState}
          </div>
        </button>
      `;
    })
    .join("");

  setStatus(
    catalogCountStatus,
    catalogSearchTerm
      ? `${filteredCatalog.length} productos coinciden con la busqueda.`
      : `${filteredCatalog.length} productos visibles.`,
  );
}

function defaultProduct() {
  return {
    id: `producto-${Date.now()}`,
    name: "",
    brand: "",
    category: "masa",
    type: "",
    goal: "",
    flavor: "",
    flavors: [],
    description: "",
    does: "",
    how: "",
    pair: "",
    tags: [],
    price: "",
    oldPrice: "",
    showPrice: false,
    feature: "",
    image: "",
  };
}

function setFormProduct(product) {
  selectedProductId = product?.id || "";
  productIdInput.value = selectedProductId;
  productNameInput.value = product?.name || "";
  productBrandInput.value = product?.brand || "";
  productCategoryInput.value = product?.category || "masa";
  productTypeInput.value = product?.type || "";
  productGoalInput.value = product?.goal || "";
  productFlavorInput.value = product?.flavor || "";
  productFlavorsInput.value = Array.isArray(product?.flavors) ? product.flavors.join(", ") : "";
  productTagsInput.value = Array.isArray(product?.tags) ? product.tags.join(", ") : "";
  productPriceInput.value = product?.price || "";
  productOldPriceInput.value = product?.oldPrice || "";
  productShowPriceInput.checked = product?.showPrice === true;
  productFeatureInput.value = product?.feature || "";
  productDescriptionInput.value = product?.description || "";
  productDoesInput.value = product?.does || "";
  productHowInput.value = product?.how || "";
  productPairInput.value = product?.pair || "";
  productImageInput.value = product?.image || "";
  productFormTitle.textContent = product?.id ? "Editar producto" : "Nuevo producto";
  setStatus(productStatus, product?.id ? "Editando producto seleccionado." : "Crea un producto nuevo y luego guardalo.", "success");
  updateImagePreview(product?.image || "");
  renderCatalogList();
}

function updateImagePreview(url) {
  const value = String(url || "").trim();
  if (value) {
    productImagePreview.src = value;
    productImagePreview.alt = productNameInput.value || "Vista previa del producto";
    productImagePreview.parentElement.classList.add("has-image");
  } else {
    productImagePreview.removeAttribute("src");
    productImagePreview.alt = "";
    productImagePreview.parentElement.classList.remove("has-image");
  }
}

function readFormProduct() {
  const id = String(productIdInput.value || "").trim() || `producto-${Date.now()}`;
  return {
    id,
    name: String(productNameInput.value || "").trim(),
    brand: String(productBrandInput.value || "").trim(),
    category: String(productCategoryInput.value || "masa").trim(),
    type: String(productTypeInput.value || "").trim(),
    goal: String(productGoalInput.value || "").trim(),
    flavor: String(productFlavorInput.value || "").trim(),
    flavors: splitList(productFlavorsInput.value),
    description: String(productDescriptionInput.value || "").trim(),
    does: String(productDoesInput.value || "").trim(),
    how: String(productHowInput.value || "").trim(),
    pair: String(productPairInput.value || "").trim(),
    tags: splitList(productTagsInput.value),
    price: String(productPriceInput.value || "").trim(),
    oldPrice: String(productOldPriceInput.value || "").trim(),
    showPrice: Boolean(productShowPriceInput.checked),
    feature: String(productFeatureInput.value || "").trim(),
    image: String(productImageInput.value || "").trim(),
  };
}

function updateProductFromForm() {
  const draft = readFormProduct();
  const index = catalogCache.findIndex((product) => product.id === draft.id);

  if (index >= 0) {
    catalogCache[index] = draft;
  } else {
    catalogCache.unshift(draft);
  }

  selectedProductId = draft.id;
  renderStats();
  renderCatalogList();
  updateImagePreview(draft.image);
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
  if (!selectedProductId || !catalogCache.some((product) => product.id === selectedProductId)) {
    setFormProduct(catalogCache[0] || defaultProduct());
  } else {
    const selected = catalogCache.find((product) => product.id === selectedProductId);
    if (selected) setFormProduct(selected);
  }
  renderStats();
  renderCatalogList();
  setStatus(catalogStatus, `Catalogo cargado (${catalogCache.length} productos).`, "success");
}

function applyCatalogSearch() {
  catalogSearchTerm = String(catalogSearchInput?.value || "");
  renderCatalogList();
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
  if (!productForm.checkValidity()) {
    productForm.reportValidity();
    return;
  }

  updateProductFromForm();
  saveCatalogButton.disabled = true;
  setStatus(catalogStatus, "Guardando catalogo...");

  try {
    await fetchJson("/api/catalog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(catalogCache),
    });

    await loadCatalog();
  } catch (error) {
    setStatus(catalogStatus, error.message || "No se pudo guardar el catalogo.", "error");
  } finally {
    saveCatalogButton.disabled = false;
  }
});

newProductButton.addEventListener("click", () => {
  const nextProduct = defaultProduct();
  catalogCache = [nextProduct, ...catalogCache];
  setFormProduct(nextProduct);
  renderStats();
  renderCatalogList();
});

duplicateProductButton.addEventListener("click", () => {
  const current = readFormProduct();
  const duplicate = {
    ...current,
    id: `producto-${Date.now()}`,
    name: current.name ? `${current.name} - copia` : "Nuevo producto",
  };
  catalogCache = [duplicate, ...catalogCache];
  setFormProduct(duplicate);
  renderStats();
  renderCatalogList();
});

deleteProductButton.addEventListener("click", () => {
  const currentId = String(productIdInput.value || "").trim();
  if (!currentId) {
    return;
  }

  const confirmed = window.confirm("¿Eliminar este producto del catalogo?");
  if (!confirmed) {
    return;
  }

  catalogCache = catalogCache.filter((product) => product.id !== currentId);
  const nextSelected = catalogCache[0] || defaultProduct();
  setFormProduct(nextSelected);
  renderStats();
  renderCatalogList();
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

productForm.addEventListener("input", () => {
  const draft = readFormProduct();
  selectedProductId = draft.id;
  renderCatalogList();
});

catalogList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-edit-product]");
  if (!button) return;

  const product = catalogCache.find((entry) => entry.id === button.dataset.editProduct);
  if (product) {
    setFormProduct(product);
  }
});

catalogSearchInput.addEventListener("input", applyCatalogSearch);

adminTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.adminTab || "catalog");
  });
});

productImageInput.addEventListener("input", () => {
  updateImagePreview(productImageInput.value);
});

productNameInput.addEventListener("input", () => {
  if (productImagePreview.src) {
    productImagePreview.alt = productNameInput.value || "Vista previa del producto";
  }
});

uploadImageButton.addEventListener("click", async () => {
  const file = productImageFileInput.files && productImageFileInput.files[0];
  if (!file) {
    setStatus(productStatus, "Elegí una imagen antes de subirla.", "error");
    return;
  }

  uploadImageButton.disabled = true;
  setStatus(productStatus, "Subiendo imagen...");

  try {
    const dataUrl = await readFileAsDataUrl(file);
    const payload = dataUrl.split(",");
    const response = await fetchJson("/api/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        mimeType: file.type,
        data: payload[1] || "",
      }),
    });

    productImageInput.value = response.url;
    updateImagePreview(response.url);
    setStatus(productStatus, "Imagen subida y lista para guardar.", "success");
  } catch (error) {
    setStatus(productStatus, error.message || "No se pudo subir la imagen.", "error");
  } finally {
    uploadImageButton.disabled = false;
  }
});

(async function boot() {
  const authenticated = await checkSession().catch(() => false);
  if (!authenticated) {
    return;
  }

  setActiveTab(activeAdminTab);

  try {
    await Promise.all([loadCatalog(), loadOrders()]);
  } catch (error) {
    const message = error.message || "No se pudo cargar el panel.";
    setStatus(catalogStatus, message, "error");
    setStatus(ordersStatus, message, "error");
  }
})();
