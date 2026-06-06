const instagramUrl = "https://www.instagram.com/medanosuplementos/";
const whatsappBase = "https://wa.me/5492291414853";
const genericWhatsappText = "Hola Medano, quiero consultar por suplementos";

const products = [
  {
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

const grid = document.querySelector("#productGrid");
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
const dialogDoes = document.querySelector("#dialogDoes");
const dialogHow = document.querySelector("#dialogHow");
const dialogPair = document.querySelector("#dialogPair");
const dialogTags = document.querySelector("#dialogTags");
const dialogWhatsapp = document.querySelector("#dialogWhatsapp");

let activeFilter = "todos";
let activeBrand = "all";
let activeFlavor = "all";

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

function priceTemplate(product) {
  const oldPrice = product.oldPrice ? `<small>${product.oldPrice}</small>` : "";
  return `<span class="price">${oldPrice}${product.price}</span>`;
}

function productTemplate(product) {
  const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");
  const feature = product.feature ? `<span class="feature-label">${product.feature}</span>` : "";

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
        <div class="price-row">
          ${priceTemplate(product)}
          <button class="secondary-button detail-button" type="button" data-product="${products.indexOf(product)}">Ver detalle</button>
        </div>
      </div>
    </article>
  `;
}

function offerTemplate(product) {
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
        <div class="price-row">
          ${priceTemplate(product)}
          <a class="primary-button" href="${whatsappUrlFor(product)}" target="_blank" rel="noreferrer">Pedir</a>
        </div>
      </div>
    </article>
  `;
}

function comboTemplate(product) {
  return `
    <article class="combo-card">
      <span class="feature-label">${product.feature || "Combo"}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-meta">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <div class="price-row">
        ${priceTemplate(product)}
        <a class="primary-button" href="${whatsappUrlFor(product)}" target="_blank" rel="noreferrer">Reservar</a>
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
    ? filtered.map(productTemplate).join("")
    : `<p class="muted">No hay productos para ese filtro.</p>`;
}

function renderOffers() {
  const offers = products.filter((product) => product.oldPrice && product.category !== "combos");
  offerGrid.innerHTML = offers.length
    ? offers.map(offerTemplate).join("")
    : `<p class="muted">No hay ofertas cargadas por ahora.</p>`;
}

function renderCombos() {
  const combos = products.filter((product) => product.category === "combos");
  comboGrid.innerHTML = combos.map(comboTemplate).join("");
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

function openProductDetail(product) {
  dialogImage.src = product.image;
  dialogImage.alt = product.name;
  dialogFeature.textContent = product.feature || product.goal;
  dialogBrand.textContent = product.brand;
  dialogName.textContent = product.name;
  dialogType.textContent = product.type;
  dialogDescription.textContent = product.description;
  dialogFlavors.textContent = (product.flavors || [product.flavor]).join(", ");
  dialogPrice.textContent = product.price;
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

  const product = products[Number(button.dataset.product)];
  if (product) openProductDetail(product);
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
    inicio: "Arrancaria simple y revisaria tolerancia antes de sumar mas productos.",
    medio: "Podes comparar formatos, sabores y frecuencia segun tu rutina.",
    avanzado: "Conviene validar dosis, timing y compatibilidad con tu planificacion.",
  };

  recommendation.innerHTML = `
    <strong>Primera opcion: ${names || "consulta personalizada"}.</strong>
    <p>${levelText[level]} Para cerrar compra, confirmar stock, etiqueta y contraindicaciones por WhatsApp.</p>
    <a class="secondary-button" href="${consultUrl}" target="_blank" rel="noreferrer">Consultar recomendacion</a>
  `;
});

populateFilters();
renderProducts();
renderOffers();
renderCombos();
