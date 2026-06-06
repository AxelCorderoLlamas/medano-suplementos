const instagramUrl = "https://www.instagram.com/medanosuplementos/";
const whatsappBase = "https://wa.me/5492291414853";
const genericWhatsappText = "Hola Medano, quiero consultar por suplementos";

const products = [
  {
    name: "Nutrilab Whey Pro",
    packshotLabel: "WHEY PRO",
    brand: "Nutrilab",
    category: "masa",
    type: "Proteina",
    goal: "Masa y recuperacion",
    flavor: "Chocolate",
    flavors: ["Chocolate", "Vainilla", "Frutilla"],
    description: "Proteina en polvo para completar la ingesta diaria y acompañar el post entreno.",
    tags: ["Whey", "Post entreno", "Mas consultado"],
    price: "$25.308",
    oldPrice: "$28.120",
    feature: "Oferta",
    imageTone: "amber",
  },
  {
    name: "Nutrilab Crea Shock Cafeina",
    packshotLabel: "CREA SHOCK",
    brand: "Nutrilab",
    category: "energia",
    type: "Pre entreno",
    goal: "Energia y foco",
    flavor: "Frutal",
    flavors: ["Frutal", "Citrus"],
    description: "Creatina con cafeina para entrenamientos donde se busca empuje previo.",
    tags: ["Cafeina", "Pre entreno", "Foco"],
    price: "$19.687",
    oldPrice: "$23.380",
    feature: "Oferta",
    imageTone: "copper",
  },
  {
    name: "Creatina Monohidratada 300g",
    packshotLabel: "CREATINA",
    brand: "Star Nutrition",
    category: "fuerza",
    type: "Creatina",
    goal: "Fuerza y potencia",
    flavor: "Sin sabor",
    flavors: ["Sin sabor"],
    description: "Opcion clasica para rendimiento en esfuerzos cortos e intensos.",
    tags: ["Sin sabor", "Uso diario", "Fuerza"],
    price: "Consultar",
    feature: "Mas vendido",
    imageTone: "graphite",
  },
  {
    name: "Whey Protein 1kg",
    packshotLabel: "WHEY 1KG",
    brand: "HardCore",
    category: "masa",
    type: "Proteina",
    goal: "Masa muscular",
    flavor: "Chocolate",
    flavors: ["Chocolate", "Vainilla", "Cookies"],
    description: "Formato de whey proteina para uso diario y practico en casa o gimnasio.",
    tags: ["Whey", "Recuperacion", "Formato 1kg"],
    price: "Consultar",
    oldPrice: "$14.890",
    feature: "Oferta",
    imageTone: "espresso",
  },
  {
    name: "Combo Whey Pro + Crea Shock",
    packshotLabel: "COMBO STACK",
    brand: "Nutrilab",
    category: "combos",
    type: "Combo",
    goal: "Entreno completo",
    flavor: "Chocolate + Frutal",
    flavors: ["Chocolate + Frutal"],
    description: "Combo visto en historias: proteina para recuperacion y cafeina/creatina para pre entreno.",
    tags: ["Combo", "Proteina", "Cafeina"],
    price: "$41.500",
    oldPrice: "Consultar separado",
    feature: "Historia IG",
    imageTone: "mix",
  },
  {
    name: "Multivitaminico",
    packshotLabel: "MULTI",
    brand: "One Fit",
    category: "bienestar",
    type: "Vitaminas",
    goal: "Bienestar",
    flavor: "Naranja",
    flavors: ["Naranja"],
    description: "Apoyo general para complementar la alimentacion diaria.",
    tags: ["Vitaminas", "Minerales", "Rutina"],
    price: "Consultar",
    feature: "Salud diaria",
    imageTone: "sand",
  },
  {
    name: "Aminoacidos",
    packshotLabel: "AMINO",
    brand: "Gentech",
    category: "masa",
    type: "Recuperacion",
    goal: "Recuperacion",
    flavor: "Frutilla",
    flavors: ["Frutilla", "Tropical"],
    description: "Alternativa para rutinas con alto volumen de entrenamiento.",
    tags: ["Intra entreno", "Recuperacion", "Rutina"],
    price: "Consultar",
    feature: "Recuperacion",
    imageTone: "olive",
  },
  {
    name: "Quemador / Termogenico",
    packshotLabel: "THERMO",
    brand: "Ena",
    category: "energia",
    type: "Definicion",
    goal: "Definicion",
    flavor: "Sin sabor",
    flavors: ["Sin sabor"],
    description: "Producto sensible a tolerancia individual. Consultar antes de usar.",
    tags: ["Consulta previa", "Energia", "Definicion"],
    price: "Consultar",
    feature: "Definicion",
    imageTone: "copper",
  },
];

const paletteByTone = {
  amber: ["#111111", "#c38355", "#f4eee8"],
  copper: ["#151311", "#a96a46", "#f6eee7"],
  graphite: ["#171717", "#d0b39b", "#f7f3ef"],
  espresso: ["#201915", "#b07f55", "#f2e7db"],
  mix: ["#121212", "#c38355", "#cdb8a6"],
  sand: ["#1d1a17", "#d8c0a6", "#f6f0ea"],
  olive: ["#171915", "#9f8a62", "#f1ede7"],
};

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

let activeFilter = "todos";
let activeBrand = "all";
let activeFlavor = "all";

function encodeSvg(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function productPalette(product) {
  return paletteByTone[product.imageTone] || paletteByTone.graphite;
}

function packshotSrc(product) {
  const [dark, accent, light] = productPalette(product);
  const label = product.packshotLabel || product.name.toUpperCase();
  const subtitle = product.brand.toUpperCase();
  const flavor = (product.flavor || "SIN SABOR").toUpperCase();
  const isCombo = product.type === "Combo";

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" role="img" aria-label="${product.name}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${dark}"/>
        <stop offset="55%" stop-color="#221d19"/>
        <stop offset="100%" stop-color="${accent}"/>
      </linearGradient>
      <linearGradient id="body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2c2723"/>
        <stop offset="45%" stop-color="#151313"/>
        <stop offset="100%" stop-color="#0f0f0f"/>
      </linearGradient>
      <linearGradient id="label" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="${light}"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
    </defs>
    <rect width="900" height="900" rx="42" fill="url(#bg)"/>
    <ellipse cx="460" cy="782" rx="250" ry="42" fill="#000000" opacity="0.36"/>
    ${isCombo ? `
      <g filter="url(#shadow)" transform="translate(260 190)">
        <rect x="0" y="64" width="210" height="370" rx="44" fill="url(#body)"/>
        <rect x="24" y="0" width="162" height="92" rx="28" fill="#191716"/>
        <rect x="20" y="122" width="170" height="150" rx="28" fill="url(#label)"/>
        <rect x="20" y="286" width="170" height="110" rx="24" fill="rgba(17,16,15,0.88)"/>
      </g>
      <g filter="url(#shadow)" transform="translate(450 230) scale(0.84)">
        <rect x="0" y="64" width="210" height="370" rx="44" fill="url(#body)"/>
        <rect x="24" y="0" width="162" height="92" rx="28" fill="#191716"/>
        <rect x="20" y="122" width="170" height="150" rx="28" fill="url(#label)"/>
        <rect x="20" y="286" width="170" height="110" rx="24" fill="rgba(17,16,15,0.88)"/>
      </g>
    ` : `
      <g filter="url(#shadow)" transform="translate(275 170)">
        <rect x="0" y="78" width="280" height="430" rx="58" fill="url(#body)"/>
        <rect x="34" y="0" width="212" height="118" rx="36" fill="#191716"/>
        <rect x="24" y="156" width="232" height="188" rx="34" fill="url(#label)"/>
        <rect x="24" y="360" width="232" height="112" rx="28" fill="rgba(17,16,15,0.9)"/>
      </g>
    `}
    <text x="450" y="382" text-anchor="middle" fill="#111111" font-family="Arial Black, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="2">${escapeXml(label)}</text>
    <text x="450" y="436" text-anchor="middle" fill="#111111" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="3">${escapeXml(subtitle)}</text>
    <text x="450" y="746" text-anchor="middle" fill="${light}" font-family="Arial, sans-serif" font-size="30" font-weight="800" letter-spacing="2">${escapeXml(flavor)}</text>
  </svg>`;

  return encodeSvg(svg);
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
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
        <img src="${packshotSrc(product)}" alt="${product.name}" loading="lazy" />
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
          <a class="secondary-button" href="${whatsappUrlFor(product)}" target="_blank" rel="noreferrer">Consultar</a>
        </div>
      </div>
    </article>
  `;
}

function offerTemplate(product) {
  return `
    <article class="offer-card">
      <div class="offer-image">
        <img src="${packshotSrc(product)}" alt="${product.name}" loading="lazy" />
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
