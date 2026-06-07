const { normalizeCatalog, validateCatalog } = require("../lib/catalog");
const { readStoreJson, writeStoreJson } = require("../lib/repo-store");
const { requireAdmin } = require("../lib/admin-auth");

const STORE_PATH = "data/catalog.json";

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const catalog = normalizeCatalog(await readStoreJson(STORE_PATH, []));
    return res.status(200).json(catalog);
  }

  if (req.method === "PUT") {
    if (!requireAdmin(req, res)) {
      return;
    }

    let body;
    try {
      body = await readJsonBody(req);
    } catch {
      return res.status(400).json({ error: "El catalogo no tiene un JSON valido." });
    }

    const payload = Array.isArray(body) ? body : Array.isArray(body.products) ? body.products : null;
    const validation = validateCatalog(payload);

    if (!validation.ok) {
      return res.status(400).json({ error: validation.error });
    }

    await writeStoreJson(STORE_PATH, validation.products, "Update Medano catalog");
    return res.status(200).json({ ok: true, count: validation.products.length });
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed" });
};

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (!chunks.length) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}
