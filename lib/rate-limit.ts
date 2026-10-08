const RATE_LIMIT_STORE = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = RATE_LIMIT_STORE.get(key);

  if (!record) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW };
  }

  if (now > record.resetTime) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetTime,
    };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count, resetAt: record.resetTime };
}

export function getRateLimitInfo(key: string) {
  const record = RATE_LIMIT_STORE.get(key);
  if (!record) return { remaining: RATE_LIMIT_MAX, resetAt: 0 };

  const now = Date.now();
  if (now > record.resetTime) {
    return { remaining: RATE_LIMIT_MAX, resetAt: now + RATE_LIMIT_WINDOW };
  }

  return { remaining: Math.max(0, RATE_LIMIT_MAX - record.count), resetAt: record.resetTime };
}