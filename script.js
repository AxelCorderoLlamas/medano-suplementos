const instagramUrl = "https://www.instagram.com/medanosuplementos/";
const whatsappBase = "https://wa.me/5492291414853";
const genericWhatsappText = "Hola Medano, quiero consultar por suplementos";

const defaultProducts = [
  {
    id: "nutrilab-whey-pro",
    name: "Nutrilab Whey Pro",
    brand: "Nutrilab",
    category: "masa",
    type: "Proteina",
    goal: "Masa y recuperacion",
    flavor: "Chocolate",
    flavors: ["Chocolate", "Vainilla", "Frutilla"],
    description: "Proteina en polvo para completar la ingesta diaria y acompanar el post entreno.",
    does: "Ayuda a cubrir proteina diaria cuando cuesta llegar solo con comidas.",
    how: "Se suele usar en batido, desayuno o post entreno. Confirmar porcion segun etiqueta.",
    pair: "Combina bien con creatina monohidratada o con Crea Shock si buscas un stack de entreno.",
    tags: ["Whey", "Post entreno", "Mas consultado"],
    price: "$25.990",
    feature: "Mas consultado",
    image: "https://acdn-us.mitiendanube.com/stores/001/354/710/products/whey-pro-1kg-nutrilab-6d8919ec15cd33483017339392907947-480-0.webp",
  },
  {
    id: "nutrilab-crea-shock-cafeina",
    name: "Nutrilab Crea Shock Cafeina",
    brand: "Nutrilab",
    category: "energia",
    type: "Pre entreno",
    goal: "Energia y foco",
    flavor: "Frutal",
    flavors: ["Frutal", "Citrus"],
    description: "Creatina con cafeina para entrenamientos donde se busca empuje previo.",
    does: "Apunta a energia, foco y soporte para esfuerzos intensos antes de entrenar.",
    how: "Usar antes del entrenamiento y revisar tolerancia a cafeina. Evitar cerca del descanso.",
    pair: "Combina con whey para cubrir recuperacion despues de entrenar.",
    tags: ["Cafeina", "Pre entreno", "Foco"],
    price: "$21.060",
    oldPrice: "$23.380",
    feature: "Stock visto",
    image: "https://acdn-us.mitiendanube.com/stores/001/354/710/products/crea-shok-300g-nutrilab-b2844f81f8ac1ef75b17339387539796-480-0.webp",
  },
  {
    id: "creatina-monohidratada-300g",
    name: "Creatina Monohidratada 300g",
    brand: "Star Nutrition",
    category: "fuerza",
    type: "Creatina",
    goal: "Fuerza y potencia",
    flavor: "Sin sabor",
    flavors: ["Sin sabor"],
    description: "Opcion clasica para rendimiento en esfuerzos cortos e intensos.",
    does: "Soporta fuerza, potencia y rendimiento repetido en entrenamientos intensos.",
    how: "Uso diario segun etiqueta. No depende necesariamente del horario de entrenamiento.",
    pair: "Combina bien con proteina whey y una alimentacion suficiente.",
    tags: ["Sin sabor", "Uso diario", "Fuerza"],
    price: "$31.600",
    oldPrice: "$34.820",
    feature: "Oferta",
    image: "https://acdn-us.mitiendanube.com/stores/001/354/710/products/creatina-300g-doy-pack-star-nutrition-c009a6a92968d1398717195988049794-480-0.webp",
  },
  {
    id: "whey-protein-1kg",
    name: "Whey Protein 1kg",
    brand: "HardCore",
    category: "masa",
    type: "Proteina",
    goal: "Masa muscular",
    flavor: "Chocolate",
    flavors: ["Chocolate", "Vainilla", "Cookies"],
    description: "Formato de whey proteina para uso diario y practico en casa o gimnasio.",
    does: "Aporta proteina practica para desayuno, merienda o post entreno.",
    how: "Preparar con agua o leche segun preferencia y objetivo.",
    pair: "Puede combinarse con creatina o carbohidratos si el objetivo es volumen.",
    tags: ["Whey", "Recuperacion", "Formato 1kg"],
    price: "$14.890",
    oldPrice: "$16.900",
    feature: "Oferta",
    image: "https://acdn-us.mitiendanube.com/stores/001/354/710/products/frente1-151c87ba61e0c3d3fc16009772401321-480-0.webp",
  },
  {
    id: "combo-whey-pro-crea-shock",
    name: "Combo Whey Pro + Crea Shock",
    brand: "Nutrilab",
    category: "combos",
    type: "Combo",
    goal: "Entreno completo",
    flavor: "Chocolate + Frutal",
    flavors: ["Chocolate + Frutal"],
    description: "Combo visto en historias: proteina para recuperacion y cafeina/creatina para pre entreno.",
    does: "Cubre dos momentos clave: pre entreno con energia y post entreno con proteina.",
    how: "Crea Shock antes de entrenar; Whey Pro como batido diario o post entreno.",
    pair: "Es un stack cerrado. Se puede sumar creatina pura solo si corresponde.",
    tags: ["Combo", "Proteina", "Cafeina"],
    price: "$34.850",
    oldPrice: "$42.726",
    feature: "Historia IG",
    image: "https://acdn-us.mitiendanube.com/stores/001/354/710/products/promo-whey-pro-creashock-nutrilab-b2673bda9b3ce9a30817376581984017-480-0.webp",
  },
  {
    id: "vitamina-c-150g",
    name: "Vitamina C 150g",
    brand: "One Fit",
    category: "bienestar",
    type: "Vitaminas",
    goal: "Bienestar",
    flavor: "Naranja",
    flavors: ["Naranja"],
    description: "Suplemento de vitamina C en polvo para sumar a la rutina diaria.",
    does: "Aporta vitamina C para soporte general dentro de una rutina de bienestar.",
    how: "Usar segun etiqueta, idealmente como parte de una rutina constante.",
    pair: "Puede combinarse con multivitaminicos o minerales segun necesidad.",
    tags: ["Vitamina C", "Naranja", "Antioxidante"],
    price: "$10.900",
    feature: "Salud diaria",
    image: "https://acdn-us.mitiendanube.com/stores/001/354/710/products/vitamina-c-150g-d692d5d9285d3e703717267805314775-480-0.webp",
  },
  {
    id: "aminoacidos-gentech",
    name: "Aminoacidos",
    brand: "Gentech",
    category: "masa",
    type: "Recuperacion",
    goal: "Recuperacion",
    flavor: "Frutilla",
    flavors: ["Frutilla", "Tropical"],
    description: "Alternativa para rutinas con alto volumen de entrenamiento.",
    does: "Apunta a acompanar recuperacion en rutinas con mucho volumen.",
    how: "Suele usarse intra o post entreno segun producto y etiqueta.",
    pair: "Combina con whey si el objetivo principal es recuperacion.",
    tags: ["Intra entreno", "Recuperacion", "Rutina"],
    price: "Consultar",
    feature: "Recuperacion",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "quemador-termogenico",
    name: "Quemador / Termogenico",
    brand: "Ena",
    category: "energia",
    type: "Definicion",
    goal: "Definicion",
    flavor: "Sin sabor",
    flavors: ["Sin sabor"],
    description: "Producto sensible a tolerancia individual. Consultar antes de usar.",
    does: "Busca apoyar energia y definicion, pero depende mucho de tolerancia individual.",
    how: "Consultar antes de usar, especialmente si sos sensible a estimulantes.",
    pair: "Puede combinarse con proteina, pero conviene evitar mezclar estimulantes.",
    tags: ["Consulta previa", "Energia", "Definicion"],
    price: "Consultar",
    feature: "Definicion",
    image: "https://images.unsplash.com/photo-1596457224318-4c9eaf5f4f2f?auto=format&fit=crop&w=900&q=85",
  },
];

let products = [...defaultProducts];

const grid = document.querySelector("#productGrid");
const storeGrid = document.querySelector("#storeGrid");
const offerGrid = document.querySelector("#offerGrid");
const comboGrid = document.querySelector("#comboGrid");
const catalogCount = document.querySelector("#catalogCount");
const searchInput = document.querySelector("#searchInput");
const brandFilter = document.querySelector("#brandFilter");
const flavorFilter = document.querySelector("#flavorFilter");
const filterButtons = document.querySelectorAll(".filter-button");
const advisorForm = document.querySelector("#advisorForm");
const goalSelect = document.querySelector("#goalSelect");
const levelSelect = document.querySelector("#levelSelect");
const recommendation = document.querySelector("#recommendation");
const productDialog = document.querySelector("#productDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogFeature = document.querySelector("#dialogFeature");
const dialogBrand = document.querySelector("#dialogBrand");
const dialogName = document.querySelector("#dialogName");
const dialogType = document.querySelector("#dialogType");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogFlavors = document.querySelector("#dialogFlavors");
const dialogPrice = document.querySelector("#dialogPrice");
const dialogPriceBlock = document.querySelector("#dialogPriceBlock");
const dialogDoes = document.querySelector("#dialogDoes");
const dialogHow = document.querySelector("#dialogHow");
const dialogPair = document.querySelector("#dialogPair");
const dialogTags = document.querySelector("#dialogTags");
const dialogWhatsapp = document.querySelector("#dialogWhatsapp");
const cartCount = document.querySelector("#cartCount");
const cartSummary = document.querySelector("#cartSummary");
const cartItems = document.querySelector("#cartItems");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutSubmitButton = document.querySelector("#checkoutSubmitButton");
const orderStatus = document.querySelector("#orderStatus");
const scrollToCartButton = document.querySelector("#scrollToCartButton");
const cartPanel = document.querySelector("#cartPanel");

let activeFilter = "todos";
let activeBrand = "all";
let activeFlavor = "all";
const cartStorageKey = "medano-cart-v1";
let cart = loadCart(defaultProducts);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function whatsappUrlFor(product) {
  const text = product ? `Hola Medano, quiero consultar por ${product.name}` : genericWhatsappText;
  return `${whatsappBase}?text=${encodeURIComponent(text)}`;
}

function parsePriceValue(price) {
  const digits = String(price || "").replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

async function loadCatalog() {
  try {
    const response = await fetch("/api/catalog", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Catalog unavailable");
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
      return defaultProducts;
    }

    return payload.map((product, index) => ({
      id: String(product.id || defaultProducts[index]?.id || `product-${index + 1}`),
      name: String(product.name || ""),
      brand: String(product.brand || ""),
      category: String(product.category || ""),
      type: String(product.type || ""),
      goal: String(product.goal || ""),
      flavor: String(product.flavor || ""),
      flavors: Array.isArray(product.flavors) ? product.flavors : String(product.flavors || "").split(",").map((item) => item.trim()).filter(Boolean),
      description: String(product.description || ""),
      does: String(product.does || ""),
      how: String(product.how || ""),
      pair: String(product.pair || ""),
      tags: Array.isArray(product.tags) ? product.tags : String(product.tags || "").split(",").map((item) => item.trim()).filter(Boolean),
      price: String(product.price || ""),
      oldPrice: String(product.oldPrice || ""),
      feature: String(product.feature || ""),
      image: String(product.image || ""),
      showPrice: product.showPrice !== false,
    }));
  } catch {
    return defaultProducts;
  }
}

function loadCart(catalog = defaultProducts) {
  try {
    const parsed = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => {
        if (typeof item?.id === "string" && item.id.trim()) {
          return { id: item.id.trim(), qty: Number(item.qty || 0) };
        }

        if (Number.isInteger(item?.index) && catalog[item.index]) {
          return { id: catalog[item.index].id, qty: Number(item.qty || 0) };
        }

        return null;
      })
      .filter((item) => item && item.id && item.qty > 0);
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function getCartProducts() {
  return cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);
}

function getCartTotals() {
  const items = getCartProducts();
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return { items, totalItems };
}

function setOrderStatus(message, type = "") {
  orderStatus.textContent = message;
  orderStatus.classList.toggle("is-error", type === "error");
  orderStatus.classList.toggle("is-success", type === "success");
}

function addToCart(id, qty = 1) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart();
  renderCart();
  setOrderStatus("Producto agregado al carrito.");
}

function updateCartItem(id, delta) {
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((entry) => entry.id !== id);
  }
  saveCart();
  renderCart();
}

function removeCartItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function renderStore() {
  const selected = products.slice(0, 6);
  storeGrid.innerHTML = selected.map((product) => {
    return productTemplate(product);
  }).join("");
}

function renderCart() {
  const { items, totalItems } = getCartTotals();

  cartCount.textContent = totalItems;
  cartSummary.innerHTML = totalItems
    ? `
      <strong>${totalItems} producto${totalItems === 1 ? "" : "s"}</strong>
      <span>Revisá el resumen y enviá el pedido al email configurado.</span>
    `
    : `
      <strong>0 productos</strong>
      <span>Agregá productos para empezar.</span>
    `;

  if (!items.length) {
    cartItems.innerHTML = `<div class="cart-empty">Todavía no agregaste productos al carrito.</div>`;
    checkoutSubmitButton.disabled = true;
    checkoutSubmitButton.textContent = "Agregar productos";
    return;
  }

  checkoutSubmitButton.disabled = false;
  checkoutSubmitButton.textContent = "Enviar pedido por email";

  cartItems.innerHTML = items
    .map(({ id, qty, product }) => {
      return `
        <article class="cart-item">
          <div class="cart-item-top">
            <div>
              <strong>${product.name}</strong>
              <span class="cart-item-meta">${product.brand} · ${product.type}</span>
            </div>
            <button class="cart-item-remove" type="button" data-cart-remove="${id}">Quitar</button>
          </div>
          <div class="cart-item-top">
            <div class="cart-item-controls">
              <button class="quantity-button" type="button" data-cart-decrease="${id}" aria-label="Disminuir">-</button>
              <span class="cart-item-qty">${qty}</span>
              <button class="quantity-button" type="button" data-cart-increase="${id}" aria-label="Aumentar">+</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function productTemplate(product) {
  const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");
  const feature = product.feature ? `<span class="feature-label">${product.feature}</span>` : "";
  const price = product.showPrice === false
    ? ""
    : `<div class="card-price"><strong>${escapeXml(product.price || "Consultar")}</strong>${product.oldPrice ? `<span>${escapeXml(product.oldPrice)}</span>` : ""}</div>`;

  return `
    <article class="product-card">
      <div class="product-media">
        ${feature}
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-top">
          <div>
            <span class="brand-line">${product.brand}</span>
            <h3>${product.name}</h3>
          </div>
          <span class="badge">${product.type}</span>
        </div>
        <p>${product.description}</p>
        <div class="product-meta">${tags}</div>
        ${price}
        <div class="price-row">
          <div class="card-actions">
            <button class="primary-button" type="button" data-add-to-cart="${product.id}">Agregar</button>
            <button class="secondary-button detail-button" type="button" data-product="${product.id}">Detalle</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function offerTemplate(product) {
  const price = product.showPrice === false
    ? ""
    : `<div class="card-price"><strong>${escapeXml(product.price || "Consultar")}</strong>${product.oldPrice ? `<span>${escapeXml(product.oldPrice)}</span>` : ""}</div>`;
  return `
    <article class="offer-card">
      <div class="offer-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="offer-body">
        <span class="feature-label">${product.feature || "Oferta"}</span>
        <div class="product-top">
          <div>
            <span class="brand-line">${product.brand}</span>
            <h3>${product.name}</h3>
          </div>
          <span class="badge">${product.flavor}</span>
        </div>
        <p>${product.description}</p>
        <div class="product-meta">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        ${price}
        <div class="price-row">
          <div class="card-actions">
            <button class="primary-button" type="button" data-add-to-cart="${product.id}">Agregar</button>
            <a class="secondary-button" href="${whatsappUrlFor(product)}" target="_blank" rel="noreferrer">Pedir</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function comboTemplate(product) {
  const price = product.showPrice === false
    ? ""
    : `<div class="card-price"><strong>${escapeXml(product.price || "Consultar")}</strong>${product.oldPrice ? `<span>${escapeXml(product.oldPrice)}</span>` : ""}</div>`;
  return `
    <article class="combo-card">
      <span class="feature-label">${product.feature || "Combo"}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-meta">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      ${price}
      <div class="price-row">
        <div class="card-actions">
          <button class="primary-button" type="button" data-add-to-cart="${product.id}">Agregar</button>
          <a class="secondary-button" href="${whatsappUrlFor(product)}" target="_blank" rel="noreferrer">Reservar</a>
        </div>
      </div>
    </article>
  `;
}

function buildSelectOptions(select, values, placeholder) {
  select.innerHTML = [
    `<option value="all">${placeholder}</option>`,
    ...values.map((value) => `<option value="${escapeXml(value)}">${escapeXml(value)}</option>`),
  ].join("");
}

function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();

  return products.filter((product) => {
    const matchesFilter = activeFilter === "todos" || product.category === activeFilter;
    const matchesBrand = activeBrand === "all" || product.brand === activeBrand;
    const matchesFlavor = activeFlavor === "all" || (product.flavors || []).includes(activeFlavor) || product.flavor === activeFlavor;
    const searchable = [
      product.name,
      product.brand,
      product.type,
      product.goal,
      product.description,
      product.tags.join(" "),
      (product.flavors || []).join(" "),
    ].join(" ").toLowerCase();

    return matchesFilter && matchesBrand && matchesFlavor && searchable.includes(query);
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();

  catalogCount.textContent = `${filtered.length} productos visibles de ${products.length} cargados`;
  grid.innerHTML = filtered.length
    ? filtered.map((product) => productTemplate(product)).join("")
    : `<p class="muted">No hay productos para ese filtro.</p>`;
}

function renderOffers() {
  const offers = products.filter((product) => product.feature === "Oferta" || product.feature === "Stock visto");
  offerGrid.innerHTML = offers.length
    ? offers.map((product) => offerTemplate(product)).join("")
    : `<p class="muted">No hay ofertas cargadas por ahora.</p>`;
}

function renderCombos() {
  const combos = products.filter((product) => product.category === "combos");
  comboGrid.innerHTML = combos.map((product) => comboTemplate(product)).join("");
}

function setActiveFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.filter === filter);
  });
  renderProducts();
}

function populateFilters() {
  const brands = [...new Set(products.map((product) => product.brand))].sort((a, b) => a.localeCompare(b));
  const flavors = [...new Set(products.flatMap((product) => product.flavors || [product.flavor]).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  buildSelectOptions(brandFilter, brands, "Todas las marcas");
  buildSelectOptions(flavorFilter, flavors, "Todos los sabores");
}

function openProductDetail(productId) {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;

  dialogImage.src = product.image;
  dialogImage.alt = product.name;
  dialogFeature.textContent = product.feature || product.goal;
  dialogBrand.textContent = product.brand;
  dialogName.textContent = product.name;
  dialogType.textContent = product.type;
  dialogDescription.textContent = product.description;
  dialogFlavors.textContent = (product.flavors || [product.flavor]).join(", ");
  if (product.showPrice === false) {
    dialogPriceBlock.hidden = true;
  } else {
    dialogPriceBlock.hidden = false;
    dialogPrice.textContent = product.oldPrice ? `${product.price || "Consultar"} · Antes ${product.oldPrice}` : (product.price || "Consultar");
  }
  dialogDoes.textContent = product.does || product.goal;
  dialogHow.textContent = product.how || "Consultar uso recomendado segun etiqueta y objetivo.";
  dialogPair.textContent = product.pair || "Consultar combinaciones segun rutina y tolerancia.";
  dialogTags.innerHTML = product.tags.map((tag) => `<span>${escapeXml(tag)}</span>`).join("");
  dialogWhatsapp.href = whatsappUrlFor(product);
  productDialog.showModal();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;

  openProductDetail(button.dataset.product);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
});

document.querySelectorAll("[data-jump-filter]").forEach((link) => {
  link.addEventListener("click", () => setActiveFilter(link.dataset.jumpFilter));
});

searchInput.addEventListener("input", renderProducts);

brandFilter.addEventListener("change", () => {
  activeBrand = brandFilter.value;
  renderProducts();
});

flavorFilter.addEventListener("change", () => {
  activeFlavor = flavorFilter.value;
  renderProducts();
});

advisorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const goal = goalSelect.value;
  const level = levelSelect.value;
  const matches = products.filter((product) => product.category === goal).slice(0, 2);
  const names = matches.map((product) => product.name).join(" + ");
  const consultUrl = whatsappUrlFor(matches[0]);

  const levelText = {
    inicio: "Arrancaríamos simple y revisaríamos tolerancia antes de sumar más productos.",
    medio: "Podes comparar formatos, sabores y frecuencia segun tu rutina.",
    avanzado: "Conviene validar dosis, timing y compatibilidad con tu planificacion.",
  };

  recommendation.innerHTML = `
    <strong>Primera opcion: ${names || "consulta personalizada"}.</strong>
    <p>${levelText[level]} Para cerrar compra, confirmar stock, etiqueta y contraindicaciones por WhatsApp.</p>
    <a class="secondary-button" href="${consultUrl}" target="_blank" rel="noreferrer">Consultar recomendacion</a>
  `;
});

scrollToCartButton.addEventListener("click", () => {
  cartPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-to-cart]");
  if (addButton) {
    addToCart(addButton.dataset.addToCart);
    return;
  }

  const removeButton = event.target.closest("[data-cart-remove]");
  if (removeButton) {
    removeCartItem(removeButton.dataset.cartRemove);
    return;
  }

  const increaseButton = event.target.closest("[data-cart-increase]");
  if (increaseButton) {
    updateCartItem(increaseButton.dataset.cartIncrease, 1);
    return;
  }

  const decreaseButton = event.target.closest("[data-cart-decrease]");
  if (decreaseButton) {
    updateCartItem(decreaseButton.dataset.cartDecrease, -1);
  }
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { items, totalItems } = getCartTotals();
  if (!items.length) {
    setOrderStatus("Agregá productos al carrito antes de enviar el pedido.", "error");
    return;
  }

  const formData = new FormData(checkoutForm);
  const customer = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    delivery: String(formData.get("delivery") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  };

  checkoutSubmitButton.disabled = true;
  setOrderStatus("Enviando pedido...");

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        items: items.map(({ id, qty, product }) => ({
          id,
          name: product.name,
          brand: product.brand,
          type: product.type,
          quantity: qty,
        })),
        summary: { totalItems },
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.error || "No se pudo enviar el pedido.");
    }

    cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
    setOrderStatus("Pedido enviado. Ya quedó en el email configurado.", "success");
  } catch (error) {
    setOrderStatus(error.message || "No se pudo enviar el pedido.", "error");
  } finally {
    checkoutSubmitButton.disabled = cart.length === 0;
  }
});

(async function initApp() {
  products = await loadCatalog();
  cart = loadCart(products);
  populateFilters();
  renderStore();
  renderProducts();
  renderOffers();
  renderCombos();
  renderCart();
})();
