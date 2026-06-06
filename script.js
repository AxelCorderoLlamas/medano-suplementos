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
    description: "Proteina en polvo vista en el stock de Medano. Ideal para completar ingesta diaria de proteina.",
    tags: ["Whey", "Post entreno", "Foto recibida"],
    price: "Consultar",
    feature: "Mas consultado",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Nutrilab Crea Shock Cafeina",
    brand: "Nutrilab",
    category: "energia",
    type: "Pre entreno",
    goal: "Energia y foco",
    description: "Creatina con cafeina para entrenamientos donde se busca empuje previo. Consultar tolerancia.",
    tags: ["Cafeina", "Pre entreno", "Foco"],
    price: "Consultar",
    feature: "Stock visto",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Creatina Monohidratada",
    brand: "Varias marcas",
    category: "fuerza",
    type: "Creatina",
    goal: "Fuerza y potencia",
    description: "Opcion clasica para rendimiento en esfuerzos cortos e intensos.",
    tags: ["Sin sabor", "Uso diario", "Fuerza"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1622818426150-7c1ee566bd45?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Combo Whey Pro + Crea Shock",
    brand: "Nutrilab",
    category: "combos",
    type: "Combo",
    goal: "Entreno completo",
    description: "Combo visto en historia: proteina para recuperacion y cafeina/creatina para pre entreno.",
    tags: ["Combo", "Proteina", "Cafeina"],
    price: "$41.500",
    oldPrice: "Consultar separado",
    feature: "Historia IG",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Multivitaminico",
    brand: "Consultar marca",
    category: "bienestar",
    type: "Vitaminas",
    goal: "Bienestar",
    description: "Apoyo general para complementar la alimentacion diaria.",
    tags: ["Vitaminas", "Minerales", "Rutina"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Aminoacidos",
    brand: "Consultar marca",
    category: "masa",
    type: "Recuperacion",
    goal: "Recuperacion",
    description: "Alternativa para rutinas con alto volumen de entrenamiento.",
    tags: ["Intra entreno", "Recuperacion", "Rutina"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Quemador / Termogenico",
    brand: "Consultar marca",
    category: "energia",
    type: "Definicion",
    goal: "Definicion",
    description: "Producto sensible a tolerancia individual. Consultar antes de usar.",
    tags: ["Consulta previa", "Energia", "Definicion"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=700&q=85",
  },
];

const grid = document.querySelector("#productGrid");
const comboGrid = document.querySelector("#comboGrid");
const catalogCount = document.querySelector("#catalogCount");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const advisorForm = document.querySelector("#advisorForm");
const goalSelect = document.querySelector("#goalSelect");
const levelSelect = document.querySelector("#levelSelect");
const recommendation = document.querySelector("#recommendation");

let activeFilter = "todos";

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
          <a class="secondary-button" href="${whatsappUrlFor(product)}" target="_blank" rel="noreferrer">Consultar</a>
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

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesFilter = activeFilter === "todos" || product.category === activeFilter;
    const searchable = [
      product.name,
      product.brand,
      product.type,
      product.goal,
      product.description,
      product.tags.join(" "),
    ].join(" ").toLowerCase();

    return matchesFilter && searchable.includes(query);
  });

  catalogCount.textContent = `${filtered.length} productos visibles de ${products.length} cargados`;
  grid.innerHTML = filtered.length
    ? filtered.map(productTemplate).join("")
    : `<p class="muted">No hay productos para ese filtro.</p>`;
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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
});

document.querySelectorAll("[data-jump-filter]").forEach((link) => {
  link.addEventListener("click", () => setActiveFilter(link.dataset.jumpFilter));
});

searchInput.addEventListener("input", renderProducts);

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

renderProducts();
renderCombos();
