function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureArray(value, fallback = []) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((entry) => String(entry).trim()).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return fallback;
}

function normalizeProduct(product, index = 0) {
  const name = String(product?.name || "").trim();
  const brand = String(product?.brand || "").trim();
  const type = String(product?.type || "").trim();
  const id = String(product?.id || `${slugify(name || "producto")}-${index + 1}`).trim();
  const flavor = String(product?.flavor || "").trim();

  return {
    id,
    name,
    brand,
    category: String(product?.category || "").trim(),
    type,
    goal: String(product?.goal || "").trim(),
    flavor,
    flavors: ensureArray(product?.flavors, flavor ? [flavor] : []),
    description: String(product?.description || "").trim(),
    does: String(product?.does || "").trim(),
    how: String(product?.how || "").trim(),
    pair: String(product?.pair || "").trim(),
    tags: ensureArray(product?.tags),
    price: String(product?.price || "").trim(),
    oldPrice: String(product?.oldPrice || "").trim(),
    showPrice: product?.showPrice === true,
    feature: String(product?.feature || "").trim(),
    image: String(product?.image || "").trim(),
  };
}

function normalizeCatalog(products) {
  return Array.isArray(products) ? products.map((product, index) => normalizeProduct(product, index)) : [];
}

function validateCatalog(products) {
  if (!Array.isArray(products)) {
    return { ok: false, error: "El catalogo debe ser una lista de productos." };
  }

  const normalized = normalizeCatalog(products);
  const invalid = normalized.find((product) => !product.name || !product.brand || !product.type);
  if (invalid) {
    return { ok: false, error: "Cada producto necesita nombre, marca y tipo." };
  }

  return { ok: true, products: normalized };
}

module.exports = {
  ensureArray,
  normalizeCatalog,
  normalizeProduct,
  slugify,
  validateCatalog,
};
