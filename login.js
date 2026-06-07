const loginForm = document.querySelector("#loginForm");
const passwordInput = document.querySelector("#passwordInput");
const loginButton = document.querySelector("#loginButton");
const loginStatus = document.querySelector("#loginStatus");

function setStatus(message, type = "") {
  loginStatus.textContent = message;
  loginStatus.classList.toggle("is-error", type === "error");
  loginStatus.classList.toggle("is-success", type === "success");
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

  loginButton.disabled = true;
  setStatus("Validando acceso...");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: passwordInput.value }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "No se pudo iniciar sesion.");
    }

    setStatus("Acceso concedido.", "success");
    window.location.href = "/admin";
  } catch (error) {
    setStatus(error.message || "No se pudo iniciar sesion.", "error");
  } finally {
    loginButton.disabled = false;
  }
});

checkSession();
