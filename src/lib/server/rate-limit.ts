import "server-only";

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

/**
 * Fixed-window limiter kept in memory. On serverless hosts each instance has its own
 * memory, so this is best-effort protection against bursts, not a strict quota.
 */
export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 10_000) {
      for (const [k, w] of buckets) if (w.resetAt <= now) buckets.delete(k);
    }
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}
