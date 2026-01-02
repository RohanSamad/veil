import { kv } from '@vercel/kv';

const RATE_LIMIT = 3; // 3 tries per IP
const WINDOW = 24 * 60 * 60; // 24 hours in seconds

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt?: Date;
    limit: number;
}

/**
 * Check and enforce rate limiting based on IP address
 * Uses Vercel KV (Redis) for fast, distributed counting
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
    const key = `rate_limit:${ip}`;

    // Local dev mode: Skip if no KV params
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        return {
            allowed: true,
            remaining: RATE_LIMIT,
            limit: RATE_LIMIT
        };
    }

    try {
        // Get current count
        const current = await kv.get<number>(key) || 0;

        if (current >= RATE_LIMIT) {
            // Get TTL to show when it resets
            const ttl = await kv.ttl(key);
            const resetAt = ttl > 0 ? new Date(Date.now() + ttl * 1000) : new Date(Date.now() + WINDOW * 1000);

            return {
                allowed: false,
                remaining: 0,
                resetAt,
                limit: RATE_LIMIT
            };
        }

        // Increment counter
        const newCount = current + 1;
        await kv.set(key, newCount, { ex: WINDOW });

        return {
            allowed: true,
            remaining: RATE_LIMIT - newCount,
            limit: RATE_LIMIT
        };
    } catch (error) {
        console.error('Rate limit error:', error);
        // Fail open - allow request if Redis is down
        return {
            allowed: true,
            remaining: RATE_LIMIT - 1,
            limit: RATE_LIMIT
        };
    }
}

/**
 * Get the user's IP address from request headers
 * Works with Vercel's edge network
 */
export function getClientIP(request: Request): string {
    // Try Vercel's forwarded IP first
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    // Fall back to real IP
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Default fallback
    return 'unknown';
}
