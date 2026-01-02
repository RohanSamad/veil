import { NextRequest, NextResponse } from 'next/server';
import { classifyMessage } from '@/lib/classifier';
import { getVerdict, getQuickLabel } from '@/lib/decision-engine';
import { generateResponse } from '@/lib/generator';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { RoadTestInputSchema } from '@/lib/schemas';
import { RoadTestInput, RoadTestResponse } from '@/lib/types';
import { nanoid } from 'nanoid';

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

        // 2. Parse and validate input with Zod
        const body = await request.json();
        const validation = RoadTestInputSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Validation error',
                    message: validation.error.issues[0].message,
                    details: validation.error.issues
                },
                { status: 400 }
            );
        }

        const input: RoadTestInput = validation.data;

        // 3. Generate trace ID for auditing
        const trace_id = `rt_${nanoid(10)}`;

        // 4. Classify the message (AI)
        const classification = await classifyMessage(input);

        // 5. Get verdict (deterministic rules)
        const verdict = getVerdict(classification);

        // 6. Generate rewrites/coaching if needed (AI)
        const generated = await generateResponse(
            verdict.traffic_light,
            input.message,
            input.context || "No context provided",
            classification
        );

        // 7. Build response
        const response: RoadTestResponse = {
            mode: 'road_test',
            trace_id,
            classification,
            verdict,
            label: {
                quick_label: getQuickLabel(classification.effective_intensity),
                pattern_tag: generated.pattern_tag
            },
            coaching_question: generated.coaching_question,
            rewrites: generated.rewrites
        };

        // 8. Return with rate limit headers
        return NextResponse.json(response, {
            headers: {
                'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                'X-RateLimit-Limit': '3'
            }
        });

    } catch (error) {
        console.error('Road-test API error:', error);

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: 'Something went wrong. Please try again.',
                trace_id: `error_${nanoid(10)}`
            },
            { status: 500 }
        );
    }
}

// OPTIONS handler for CORS (if needed)
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
