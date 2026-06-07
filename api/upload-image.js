const crypto = require("crypto");
const { requireAdmin } = require("../lib/admin-auth");

const UPLOAD_DIR = "assets/uploads";
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

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

function sanitizeFilename(filename) {
  return String(filename || "image")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "image";
}

function extensionFromMime(mimeType) {
  const normalized = String(mimeType || "").toLowerCase();
  if (normalized === "image/jpeg") return "jpg";
  if (normalized === "image/png") return "png";
  if (normalized === "image/webp") return "webp";
  if (normalized === "image/gif") return "gif";
  if (normalized === "image/svg+xml") return "svg";
  return "";
}

function buildRawUrl(repo, branch, filePath) {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) {
    return;
  }

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return res.status(500).json({
      error: "Faltan GITHUB_TOKEN o GITHUB_REPO para subir imagenes.",
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "La imagen no tiene un JSON valido." });
  }

  const base64 = String(body.data || "");
  const mimeType = String(body.mimeType || "");
  const filename = sanitizeFilename(body.filename || "image");
  const extension = extensionFromMime(mimeType);

  if (!base64 || !mimeType || !extension) {
    return res.status(400).json({ error: "Formato de imagen no soportado." });
  }

  const buffer = Buffer.from(base64, "base64");
  if (!buffer.length || buffer.length > MAX_UPLOAD_BYTES) {
    return res.status(413).json({ error: "La imagen supera el tamaño permitido." });
  }

  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const shortId = crypto.randomBytes(4).toString("hex");
  const filePath = `${UPLOAD_DIR}/${stamp}-${shortId}-${filename}.${extension}`;
  const content = buffer.toString("base64");

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "Medano Suplementos Image Upload",
    },
    body: JSON.stringify({
      message: `Upload admin image ${filePath}`,
      content,
      branch,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(response.status).json({
      error: payload.message || "No se pudo subir la imagen.",
    });
  }

  return res.status(200).json({
    ok: true,
    path: filePath,
    url: buildRawUrl(repo, branch, filePath),
  });
};
