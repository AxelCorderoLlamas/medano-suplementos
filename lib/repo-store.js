const fs = require("fs");
const path = require("path");

function hasGitHubStore() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function getGitHubRepo() {
  return process.env.GITHUB_REPO || "";
}

function getGitHubBranch() {
  return process.env.GITHUB_BRANCH || "main";
}

function getLocalPath(filePath) {
  return path.join(process.cwd(), filePath);
}

function readLocalJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(getLocalPath(filePath), "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function readRemoteJson(filePath, fallback) {
  const repo = getGitHubRepo();
  const branch = getGitHubBranch();
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "Medano Suplementos Store",
    },
  });

  if (response.status === 404) {
    return fallback;
  }

  if (!response.ok) {
    throw new Error(`GitHub store read failed: ${response.status}`);
  }

  const payload = await response.json();
  const content = Buffer.from(payload.content || "", payload.encoding || "base64").toString("utf8");
  return content ? JSON.parse(content) : fallback;
}

async function readStoreJson(filePath, fallback) {
  if (hasGitHubStore()) {
    try {
      return await readRemoteJson(filePath, fallback);
    } catch {
      return readLocalJson(filePath, fallback);
    }
  }

  return readLocalJson(filePath, fallback);
}

async function writeRemoteJson(filePath, value, message) {
  const repo = getGitHubRepo();
  const branch = getGitHubBranch();
  const contentsUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const content = `${JSON.stringify(value, null, 2)}\n`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const payload = {
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
    };

    const existing = await fetch(`${contentsUrl}?ref=${encodeURIComponent(branch)}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Medano Suplementos Store",
      },
    });

    if (existing.ok) {
      const current = await existing.json();
      payload.sha = current.sha;
    } else if (existing.status !== 404) {
      throw new Error(`GitHub store lookup failed: ${existing.status}`);
    }

    const response = await fetch(contentsUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "Medano Suplementos Store",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response.json();
    }

    if (response.status !== 409 || attempt === 1) {
      const errorPayload = await response.json().catch(() => ({}));
      throw new Error(errorPayload.message || `GitHub store write failed: ${response.status}`);
    }
  }
}

function writeLocalJson(filePath, value) {
  const localPath = getLocalPath(filePath);
  fs.mkdirSync(path.dirname(localPath), { recursive: true });
  fs.writeFileSync(localPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function writeStoreJson(filePath, value, message) {
  if (hasGitHubStore()) {
    return writeRemoteJson(filePath, value, message);
  }

  writeLocalJson(filePath, value);
  return value;
}

async function updateStoreJson(filePath, updater, fallback, message) {
  const current = await readStoreJson(filePath, fallback);
  const next = await updater(current);
  await writeStoreJson(filePath, next, message);
  return next;
}

async function appendStoreItem(filePath, item, fallback, message) {
  return updateStoreJson(
    filePath,
    async (current) => {
      const list = Array.isArray(current) ? current : [];
      return [item, ...list];
    },
    fallback,
    message,
  );
}

module.exports = {
  appendStoreItem,
  hasGitHubStore,
  readStoreJson,
  updateStoreJson,
  writeStoreJson,
};
