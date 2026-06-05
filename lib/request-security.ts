type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitBucket>();

function getRequestOrigin(request: Request) {
  return new URL(request.url).origin;
}

export function isSameOriginRequest(request: Request) {
  const requestOrigin = getRequestOrigin(request);
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    return origin === requestOrigin;
  }

  if (referer) {
    try {
      return new URL(referer).origin === requestOrigin;
    } catch {
      return false;
    }
  }

  return true;
}

export function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.trim() ?? "unknown-agent";
  const origin = request.headers.get("origin")?.trim() ?? "unknown-origin";
  const ip = forwardedFor || realIp || "unknown-ip";

  return `${ip}:${userAgent}:${origin}`;
}

export function consumeRateLimit(key: string, maxRequests: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = rateLimitStore.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs
    });

    return {
      ok: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000)
    };
  }

  bucket.count += 1;

  if (bucket.count > maxRequests) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
    };
  }

  return {
    ok: true,
    remaining: Math.max(0, maxRequests - bucket.count),
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
  };
}
