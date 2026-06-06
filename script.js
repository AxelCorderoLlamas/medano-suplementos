const instagramUrl = "https://www.instagram.com/medanosuplementos/";
const whatsappUrl = "https://wa.me/5492291414853?text=Hola%20Medano%2C%20quiero%20consultar%20por%20suplementos";

const products = [
  {
    name: "Whey Protein",
    category: "masa",
    goal: "Masa muscular",
    description: "Proteína para sumar ingesta diaria y acompañar entrenamiento de fuerza.",
    tags: ["Proteína", "Post entreno", "Sabores"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Creatina Monohidratada",
    category: "fuerza",
    goal: "Fuerza",
    description: "Opción clásica para rendimiento en esfuerzos cortos e intensos.",
    tags: ["Sin sabor", "Diario", "Entreno"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1622818426150-7c1ee566bd45?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Pre Entreno",
    category: "energia",
    goal: "Energía",
    description: "Fórmula para foco y energía antes de sesiones demandantes.",
    tags: ["Antes de entrenar", "Foco", "Energía"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Multivitamínico",
    category: "bienestar",
    goal: "Bienestar",
    description: "Apoyo general para complementar la alimentación diaria.",
    tags: ["Vitaminas", "Minerales", "Rutina"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Aminoácidos",
    category: "masa",
    goal: "Recuperación",
    description: "Alternativa para acompañar rutinas con alto volumen de entrenamiento.",
    tags: ["Intra entreno", "Recuperación", "Rutina"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Quemador / Termogénico",
    category: "energia",
    goal: "Definición",
    description: "Producto sensible a tolerancia individual. Consultar antes de usar.",
    tags: ["Consulta previa", "Energía", "Definición"],
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=700&q=85",
  },
];

const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const advisorForm = document.querySelector("#advisorForm");
const goalSelect = document.querySelector("#goalSelect");
const levelSelect = document.querySelector("#levelSelect");
const recommendation = document.querySelector("#recommendation");

let activeFilter = "todos";

function productTemplate(product) {
  const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${product.name}</h3>
          <span class="badge">${product.goal}</span>
        </div>
        <p>${product.description}</p>
        <div class="product-meta">${tags}</div>
        <div class="price-row">
          <span class="price">${product.price}</span>
          <a class="secondary-button" href="${whatsappUrl}" target="_blank" rel="noreferrer">Consultar</a>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesFilter = activeFilter === "todos" || product.category === activeFilter;
    const searchable = `${product.name} ${product.goal} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
    return matchesFilter && searchable.includes(query);
  });

  grid.innerHTML = filtered.length
    ? filtered.map(productTemplate).join("")
    : `<p class="muted">No hay productos para ese filtro.</p>`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

advisorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const goal = goalSelect.value;
  const level = levelSelect.value;
  const matches = products.filter((product) => product.category === goal).slice(0, 2);
  const names = matches.map((product) => product.name).join(" + ");

  const levelText = {
    inicio: "Arrancaría simple y revisaría tolerancia antes de sumar más productos.",
    medio: "Podés comparar formatos, sabores y frecuencia según tu rutina.",
    avanzado: "Conviene validar dosis, timing y compatibilidad con tu planificación.",
  };

  recommendation.innerHTML = `
    <strong>Primera opción: ${names || "consulta personalizada"}.</strong>
    <p>${levelText[level]} Para cerrar compra, confirmar stock, etiqueta y contraindicaciones por WhatsApp.</p>
  `;
});

renderProducts();
