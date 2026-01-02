import { NextRequest, NextResponse } from 'next/server';
import { analyzeScenario } from '@/lib/scenario-planner';
import { ScenarioInputSchema } from '@/lib/schemas';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
    try {
        // 1. Rate limiting
        const clientIP = getClientIP(request);
        const rateLimit = await checkRateLimit(clientIP);

        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Rate limit exceeded',
                    message: `You've used all 3 free tries. Resets at ${rateLimit.resetAt?.toLocaleString()}`,
                    remaining: 0
                },
                { status: 429 }
            );
        }

        // 2. Parse & Validate Input
        const body = await request.json();
        const validation = ScenarioInputSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { message: 'Invalid input', errors: validation.error.issues },
                { status: 400 }
            );
        }

        // 3. AI Analysis
        const result = await analyzeScenario(validation.data);

        // 4. Return Response
        return NextResponse.json(result, {
            headers: {
                'X-RateLimit-Limit': rateLimit.limit.toString(),
                'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                'X-RateLimit-Reset': rateLimit.resetAt?.toISOString() || ''
            }
        });

    } catch (error) {
        console.error('Scenario API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error processing scenario' },
            { status: 500 }
        );
    }
}
