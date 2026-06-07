const crypto = require("crypto");
const { appendStoreItem } = require("../lib/repo-store");
const { applyRateLimit } = require("../lib/rate-limit");

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const ORDER_STORE_PATH = "data/orders.json";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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

function buildEmailHtml(order) {
  const itemsHtml = order.items
    .map((item) => {
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
            <strong>${escapeHtml(item.name)}</strong><br />
            <span style="color:#6b7280;">${escapeHtml(item.brand)} · ${escapeHtml(item.type)}</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${escapeHtml(item.quantity)}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#0f1720;background:#f8fafc;padding:24px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
        <div style="padding:24px;background:linear-gradient(135deg,#ff5a1f,#ff7849);color:#fff;">
          <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:800;">Medano Suplementos</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1;">Nuevo pedido</h1>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 18px;font-size:16px;"><strong>Cliente:</strong> ${escapeHtml(order.customer.name)}</p>
          <p style="margin:0 0 18px;"><strong>Email:</strong> ${escapeHtml(order.customer.email)}<br /><strong>Teléfono:</strong> ${escapeHtml(order.customer.phone)}<br /><strong>Entrega:</strong> ${escapeHtml(order.customer.delivery)}</p>
          ${order.customer.notes ? `<p style="margin:0 0 18px;"><strong>Notas:</strong><br />${escapeHtml(order.customer.notes)}</p>` : ""}
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr>
                <th style="text-align:left;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">Producto</th>
                <th style="text-align:center;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">Cant.</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;">
            <strong>Productos: ${escapeHtml(order.summary.totalItems)}</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(order) {
  const lines = [
    "Nuevo pedido - Medano Suplementos",
    "",
    `Cliente: ${order.customer.name}`,
    `Email: ${order.customer.email}`,
    `Teléfono: ${order.customer.phone}`,
    `Entrega: ${order.customer.delivery}`,
  ];

  if (order.customer.notes) {
    lines.push(`Notas: ${order.customer.notes}`);
  }

  lines.push("");
  lines.push("Items:");

  order.items.forEach((item) => {
    lines.push(`- ${item.quantity} x ${item.name} (${item.brand} · ${item.type})`);
  });

  lines.push("");
  lines.push(`Productos: ${order.summary.totalItems}`);

  return lines.join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const limit = applyRateLimit(req, "checkout-order", {
    windowMs: 5 * 60 * 1000,
    max: 3,
  });
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds || 60));
    return res.status(429).json({
      error: "Hay muchos pedidos seguidos desde esta conexión. Probá nuevamente en unos minutos.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ORDER_TO_EMAIL;
  const fromEmail = process.env.ORDER_FROM_EMAIL || "Medano Suplementos <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return res.status(500).json({
      error: "Falta configurar RESEND_API_KEY u ORDER_TO_EMAIL en Vercel.",
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "El pedido no tiene un JSON valido." });
  }

  const customer = body.customer || {};
  const items = Array.isArray(body.items) ? body.items.filter(Boolean) : [];

  if (!customer.name || !customer.email || !customer.phone || !customer.delivery || !items.length) {
    return res.status(400).json({ error: "Faltan datos del pedido." });
  }

  const order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    customer: {
      name: String(customer.name).trim(),
      email: String(customer.email).trim(),
      phone: String(customer.phone).trim(),
      delivery: String(customer.delivery).trim(),
      notes: String(customer.notes || "").trim(),
    },
    items: items.map((item) => ({
      id: String(item.id || ""),
      name: String(item.name || ""),
      brand: String(item.brand || ""),
      type: String(item.type || ""),
      quantity: Number(item.quantity || 1),
    })),
    summary: {
      totalItems: items.reduce((sum, item) => sum + Number(item.quantity || 1), 0),
    },
  };

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "Medano Suplementos Orders",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `Nuevo pedido - ${order.customer.name}`,
      html: buildEmailHtml(order),
      text: buildEmailText(order),
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(response.status).json({
      error: payload.message || payload.error || "No se pudo enviar el email.",
    });
  }

  let storeWarning = "";
  try {
    await appendStoreItem(
      ORDER_STORE_PATH,
      {
        id: order.id,
        createdAt: order.createdAt,
        customer: order.customer,
        items: order.items,
        summary: order.summary,
        emailId: payload.id || "",
      },
      [],
      "Record Medano order",
    );
  } catch (error) {
    storeWarning = error.message || "No se pudo guardar el pedido en el panel.";
  }

  return res.status(200).json({ ok: true, id: payload.id, orderId: order.id, warning: storeWarning || undefined });
};
