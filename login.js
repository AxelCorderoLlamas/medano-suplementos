const loginForm = document.querySelector("#loginForm");
const passwordInput = document.querySelector("#passwordInput");
const loginButton = document.querySelector("#loginButton");
const loginStatus = document.querySelector("#loginStatus");
const recaptchaWidget = document.querySelector("#recaptchaWidget");
let recaptchaWidgetId = null;
let recaptchaScriptPromise = null;

function setStatus(message, type = "") {
  loginStatus.textContent = message;
  loginStatus.classList.toggle("is-error", type === "error");
  loginStatus.classList.toggle("is-success", type === "success");
}

function loadRecaptchaScript() {
  if (recaptchaScriptPromise) {
    return recaptchaScriptPromise;
  }

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha);
      return;
    }

    const script = document.createElement("script");
    const lang = window.__RECAPTCHA_HL__ || "es-419";
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${encodeURIComponent(lang)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.grecaptcha);
    script.onerror = () => reject(new Error("No se pudo cargar Google reCAPTCHA."));
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

async function loadRecaptchaWidget() {
  const response = await fetch("/api/auth/recaptcha", { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.enabled || !payload.siteKey) {
    throw new Error("Falta configurar Google reCAPTCHA en Vercel.");
  }

  const grecaptcha = await loadRecaptchaScript();
  recaptchaWidgetId = grecaptcha.render(recaptchaWidget, {
    sitekey: payload.siteKey,
    theme: "dark",
  });
}

async function checkSession() {
  try {
    const response = await fetch("/api/auth/session", { cache: "no-store" });
    const payload = await response.json();
    if (payload.authenticated) {
      window.location.href = "/admin";
    }
  } catch {
    // ignore
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (recaptchaWidgetId === null || !window.grecaptcha) {
    setStatus("Esperá a que cargue la verificacion de Google.", "error");
    return;
  }

  const recaptchaToken = window.grecaptcha.getResponse(recaptchaWidgetId);
  if (!recaptchaToken) {
    setStatus("Completá la verificacion de Google para continuar.", "error");
    return;
  }

  loginButton.disabled = true;
  setStatus("Validando acceso...");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordInput.value,
        recaptchaToken,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (window.grecaptcha && recaptchaWidgetId !== null) {
        window.grecaptcha.reset(recaptchaWidgetId);
      }
      throw new Error(payload.error || "No se pudo iniciar sesion.");
    }

    setStatus("Acceso concedido.", "success");
    window.location.href = "/admin";
  } catch (error) {
    if (window.grecaptcha && recaptchaWidgetId !== null) {
      window.grecaptcha.reset(recaptchaWidgetId);
    }
    setStatus(error.message || "No se pudo iniciar sesion.", "error");
  } finally {
    loginButton.disabled = false;
  }
});

checkSession();
loadRecaptchaWidget().catch((error) => {
  setStatus(error.message || "No se pudo cargar la verificacion de Google.", "error");
  loginButton.disabled = true;
});
