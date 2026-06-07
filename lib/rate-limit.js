const buckets = new Map();

function getClientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const realIp = String(req.headers["x-real-ip"] || "").trim();
  const vercelIp = String(req.headers["x-vercel-forwarded-for"] || "").split(",")[0].trim();
  return forwarded || vercelIp || realIp || req.socket?.remoteAddress || "unknown";
}

function cleanupBuckets(now = Date.now()) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function applyRateLimit(req, scope, { windowMs, max }) {
  const now = Date.now();
  cleanupBuckets(now);

  const ip = getClientIp(req);
  const key = `${scope}:${ip}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const nextBucket = {
      count: 1,
      resetAt: now + windowMs,
    };

    buckets.set(key, nextBucket);
    return { allowed: true, remaining: max - 1, resetAt: nextBucket.resetAt };
  }

  if (bucket.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, max - bucket.count),
    resetAt: bucket.resetAt,
  };
}

module.exports = {
  applyRateLimit,
  getClientIp,
};
