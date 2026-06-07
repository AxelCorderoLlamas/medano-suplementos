const crypto = require("crypto");

const SESSION_COOKIE_NAME = "medano_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function isSecureCookie() {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
}

function parseCookieHeader(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, part) => {
    const [rawKey, ...rawValue] = part.split("=");
    if (!rawKey || !rawValue.length) {
      return cookies;
    }

    const key = rawKey.trim();
    const value = rawValue.join("=").trim();
    if (key) {
      cookies[key] = value;
    }
    return cookies;
  }, {});
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET no esta configurada.");
  }

  return secret;
}

function signSessionToken(token) {
  return crypto.createHmac("sha256", getSessionSecret()).update(token).digest("hex");
}

function createSessionValue() {
  const token = crypto.randomBytes(32).toString("hex");
  const signature = signSessionToken(token);
  return `${token}.${signature}`;
}

function verifySessionValue(value) {
  if (!value) {
    return false;
  }

  const [token, signature] = String(value).split(".");
  if (!token || !signature) {
    return false;
  }

  const expected = signSessionToken(token);
  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

function buildCookieAttributes(value, maxAgeSeconds) {
  const attributes = [
    `${SESSION_COOKIE_NAME}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAgeSeconds}`,
  ];

  if (isSecureCookie()) {
    attributes.push("Secure");
  }

  return attributes.join("; ");
}

function setSessionCookie(res, value) {
  res.setHeader("Set-Cookie", buildCookieAttributes(value, SESSION_TTL_SECONDS));
}

function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", buildCookieAttributes("", 0));
}

function readSessionCookie(req) {
  const cookies = parseCookieHeader(req.headers.cookie || "");
  return cookies[SESSION_COOKIE_NAME] || "";
}

function isAuthenticated(req) {
  return verifySessionValue(readSessionCookie(req));
}

function requireAdmin(req, res) {
  if (isAuthenticated(req)) {
    return true;
  }

  res.statusCode = 401;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ error: "No autorizado." }));
  return false;
}

function verifyAdminPassword(password) {
  const spec = process.env.ADMIN_PASSWORD_HASH;
  if (!spec) {
    return false;
  }

  const [scheme, saltHex, hashHex] = String(spec).split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const derived = crypto.scryptSync(String(password), salt, expected.length);

  return derived.length === expected.length && crypto.timingSafeEqual(derived, expected);
}

function createCookieHeader(value) {
  return buildCookieAttributes(value, SESSION_TTL_SECONDS);
}

module.exports = {
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  createCookieHeader,
  createSessionValue,
  clearSessionCookie,
  isAuthenticated,
  parseCookieHeader,
  requireAdmin,
  setSessionCookie,
  verifyAdminPassword,
  verifySessionValue,
};
