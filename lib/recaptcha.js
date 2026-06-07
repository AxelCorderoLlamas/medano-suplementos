function getRemoteIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const realIp = String(req.headers["x-real-ip"] || "").trim();
  const vercelIp = String(req.headers["x-vercel-forwarded-for"] || "").split(",")[0].trim();
  return forwarded || vercelIp || realIp || req.socket?.remoteAddress || "";
}

async function verifyRecaptchaToken(token, req) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return {
      ok: false,
      error: "Falta configurar RECAPTCHA_SECRET_KEY en el entorno.",
    };
  }

  const responseToken = String(token || "").trim();
  if (!responseToken) {
    return {
      ok: false,
      error: "Completa el captcha antes de continuar.",
    };
  }

  const params = new URLSearchParams({
    secret,
    response: responseToken,
  });

  const remoteIp = getRemoteIp(req);
  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Medano Suplementos reCAPTCHA",
    },
    body: params.toString(),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.success) {
    return {
      ok: false,
      error: "No se pudo validar el captcha. Intentá de nuevo.",
      codes: Array.isArray(payload["error-codes"]) ? payload["error-codes"] : [],
    };
  }

  return { ok: true, payload };
}

module.exports = {
  verifyRecaptchaToken,
};
