const { readStoreJson } = require("../lib/repo-store");
const { requireAdmin } = require("../lib/admin-auth");

const STORE_PATH = "data/orders.json";

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) {
    return;
  }

  const orders = await readStoreJson(STORE_PATH, []);
  return res.status(200).json(Array.isArray(orders) ? orders : []);
};
