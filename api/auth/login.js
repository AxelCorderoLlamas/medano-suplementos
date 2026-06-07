const { createSessionValue, setSessionCookie, verifyAdminPassword } = require("../../lib/admin-auth");
const { applyRateLimit } = require("../../lib/rate-limit");
const { clearLoginFailures, isLoginLocked, registerLoginFailure } = require("../../lib/login-guard");
const { verifyRecaptchaToken } = require("../../lib/recaptcha");

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

  const limit = applyRateLimit(req, "admin-login", {
    windowMs: 15 * 60 * 1000,
    max: 5,
  });
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds || 60));
    return res.status(429).json({
      error: "Demasiados intentos. Espera un momento e intenta de nuevo.",
    });
  }

  const locked = isLoginLocked(req);
  if (locked.locked) {
    res.setHeader("Retry-After", String(locked.retryAfterSeconds || 60));
    return res.status(429).json({
      error: "Demasiados intentos fallidos. Espera un poco antes de volver a probar.",
    });
  }

  if (!process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET) {
    return res.status(500).json({
      error: "Faltan ADMIN_PASSWORD_HASH o ADMIN_SESSION_SECRET en el entorno.",
    });
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({
      error: "Falta configurar RECAPTCHA_SECRET_KEY en el entorno.",
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "El login no tiene un JSON valido." });
  }

  const captcha = await verifyRecaptchaToken(body.recaptchaToken, req);
  if (!captcha.ok) {
    return res.status(400).json({
      error: captcha.error || "No se pudo validar el captcha.",
    });
  }

  const password = String(body.password || "");
  if (!password || !verifyAdminPassword(password)) {
    const attempt = registerLoginFailure(req);
    if (attempt.lockedUntil) {
      res.setHeader("Retry-After", String(attempt.retryAfterSeconds || 60));
      return res.status(429).json({
        error: "Demasiados intentos fallidos. El acceso queda bloqueado temporalmente.",
      });
    }

    return res.status(401).json({ error: "Clave invalida." });
  }

  clearLoginFailures(req);
  const sessionValue = createSessionValue();
  setSessionCookie(res, sessionValue);
  return res.status(200).json({ ok: true });
};
