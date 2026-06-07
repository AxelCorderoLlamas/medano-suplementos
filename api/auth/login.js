const { createSessionValue, setSessionCookie, verifyAdminPassword } = require("../../lib/admin-auth");

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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET) {
    return res.status(500).json({
      error: "Faltan ADMIN_PASSWORD_HASH o ADMIN_SESSION_SECRET en el entorno.",
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "El login no tiene un JSON valido." });
  }

  const password = String(body.password || "");
  if (!password || !verifyAdminPassword(password)) {
    return res.status(401).json({ error: "Clave invalida." });
  }

  const sessionValue = createSessionValue();
  setSessionCookie(res, sessionValue);
  return res.status(200).json({ ok: true });
};
