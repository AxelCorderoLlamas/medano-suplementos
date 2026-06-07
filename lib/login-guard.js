const { getClientIp } = require("./rate-limit");

const attempts = new Map();
const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const LOCK_DURATION_MS = 30 * 60 * 1000;
const MAX_FAILURES = 5;

function cleanup(now = Date.now()) {
  for (const [key, entry] of attempts.entries()) {
    if (entry.expiresAt <= now) {
      attempts.delete(key);
    }
  }
}

function getEntry(req) {
  const now = Date.now();
  cleanup(now);

  const key = `login:${getClientIp(req)}`;
  const entry = attempts.get(key);

  if (!entry || entry.expiresAt <= now) {
    return {
      key,
      failures: 0,
      lockedUntil: 0,
      expiresAt: now + FAILURE_WINDOW_MS,
    };
  }

  return { key, ...entry };
}

function isLoginLocked(req) {
  const entry = getEntry(req);
  const now = Date.now();

  if (entry.lockedUntil > now) {
    return {
      locked: true,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.lockedUntil - now) / 1000)),
    };
  }

  return { locked: false };
}

function registerLoginFailure(req) {
  const now = Date.now();
  const entry = getEntry(req);
  const failures = entry.failures + 1;
  const lockedUntil = failures >= MAX_FAILURES ? now + LOCK_DURATION_MS : 0;

  attempts.set(entry.key, {
    failures,
    lockedUntil,
    expiresAt: lockedUntil || now + FAILURE_WINDOW_MS,
  });

  return {
    failures,
    lockedUntil,
    retryAfterSeconds: lockedUntil ? Math.max(1, Math.ceil((lockedUntil - now) / 1000)) : 0,
  };
}

function clearLoginFailures(req) {
  const entry = getEntry(req);
  attempts.delete(entry.key);
}

module.exports = {
  clearLoginFailures,
  isLoginLocked,
  registerLoginFailure,
};
