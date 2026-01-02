import OpenAI from 'openai';
import { Classification, RoadTestInput } from './types';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Retry wrapper for OpenAI API calls
 * Implements exponential backoff for transient failures
 */
async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 2,
    initialDelay: number = 1000
): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;

            // Don't retry on validation errors or auth issues
            if (error instanceof OpenAI.APIError) {
                if (error.status === 400 || error.status === 401) {
                    throw error;
                }
            }

            // If this was the last attempt, throw
            if (attempt === maxRetries) {
                throw lastError;
            }

            // Exponential backoff
            const delay = initialDelay * Math.pow(2, attempt);
            console.log(`Retry attempt ${attempt + 1} after ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

/**
 * Classifier - Uses LLM to analyze message and infer emotional signals
 * Returns structured classification data used by decision engine
 */
export async function classifyMessage(
    input: RoadTestInput,
    ellState?: any // Typed as ELLState in real integration
): Promise<Classification> {
    const { message, local_time } = input;

    // Default values if not provided (for prompt context)
    const context = input.context || "No context provided (Infer from message content)";
    const user_intensity_display = input.user_intensity ? `${input.user_intensity}/10` : "Not rated (Infer from text)";

    // Check if late night (10pm - 6am) - skip if test mode is enabled
    const late_night = input.test_mode ? false : isLateNight(local_time);

    // Format ELL Context if available
    const ellContext = ellState ? `
USER HAS A HISTORY (ELL STATE):
- Dominant Patterns: ${ellState.dominant_patterns.join(', ') || 'None detected yet'}
- Coherence Indicators: ${ellState.coherence_indicators.join(', ') || 'None detected yet'}
- Calibration: Prefers direct tone? ${ellState.calibration_flags.prefers_direct_tone ? 'YES' : 'NO'}
` : '';

    const prompt = `You are the Eye of VEIL. 
You are not a simple sentiment analyzer. You are a deep-psychology engine designed to see what the user cannot see.
Your purpose is to pierce through the surface text and reveal the hidden structure of the interaction.

PHILOSOPHICAL LENS:
- Every text message is a bid for connection, power, or safety.
- Anger is often a bodyguard for grief.
- Silence is often a scream for safety.
- Ambiguity is a shield against rejection.

YOUR MISSION:
Decode the *subtext*, the *shadow*, and the *true risk* of the following message.
Do not be fooled by polite words usually hiding resentment. 
Do not be fooled by "loud" words usually hiding fear.

INPUT DATA:
Message: "${message}"
Context: "${context}"
User Self-Rating: ${user_intensity_display}
${ellContext}

ANALYSIS PROTOCOLS (Be Unflinching):

1. AI_INTENSITY (1-10):
   - 1-3: The Adult Self. Grounded, factual, clear boundaries. No "charge".
   - 4-6: The Vulnerable Self. Honest emotion, but owned. "I feel X" (True vulnerability).
   - 7-8: The Wounded Child / Protective Defender. Blame, "You" statements, passive-aggression, rhetorical traps.
   - 9-10: The Shadow Storm. Flooding, incoherence, ultimatums, abuse, total loss of perspective.

2. CONTEXT_TYPE:
   - "silence": The Void. Anxiety provoked by absence.
   - "conflict": The Arena. Active battle for truth or dominance.
   - "intimacy": The Bridge. Attempting to cross the gap to another.
   - "other": The Marketplace. Logistics and daily trivialities.

3. DETECTED_RISK:
   - "none": Low probability of relational damage.
   - "escalation": High probability of invoking defense/counter-attack. The message carries a "hook".
   - "safety_concern": Immediate physical or severe psychological danger.

4. AMBIGUITY:
   - TRUE: The Fog. Hinting, testing, baiting, or hoping the other person reads minds.
   - FALSE: The Light. Direct requests, explicit statements of reality.

OUTPUT FORMAT (JSON ONLY):
{
  "ai_intensity": number,
  "detected_urgency": "low" | "medium" | "high",
  "detected_risk": "none" | "escalation" | "safety_concern",
  "context_type": "silence" | "conflict" | "intimacy" | "other",
  "ambiguity": boolean
}`;

    try {
        const result = await retryWithBackoff(async () => {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3,
                response_format: { type: 'json_object' }
            });

            const parsed = JSON.parse(completion.choices[0].message.content || '{}');

            // Validate we got required fields
            if (!parsed.ai_intensity || !parsed.detected_urgency || !parsed.detected_risk) {
                throw new Error('Incomplete classification from LLM');
            }

            return parsed;
        });

        // Calculate effective intensity
        const ai_intensity = result.ai_intensity || 5;
        // If user didn't rate, use AI rating. If they did, take the MAX.
        const effective_intensity = input.user_intensity
            ? Math.max(input.user_intensity, ai_intensity)
            : ai_intensity;

        return {
            user_intensity: input.user_intensity || 0, // 0 indicates "not provided"
            ai_intensity,
            effective_intensity,
            detected_urgency: result.detected_urgency || 'medium',
            detected_risk: result.detected_risk || 'none',
            context_type: result.context_type || 'other',
            ambiguity: result.ambiguity || false,
            late_night
        };
    } catch (error) {
        console.error('Classifier error after retries:', error);
        // Fallback to safe defaults
        const safeIntensity = input.user_intensity || 5;
        return {
            user_intensity: input.user_intensity || 0,
            ai_intensity: safeIntensity,
            effective_intensity: safeIntensity,
            detected_urgency: 'medium',
            detected_risk: 'none',
            context_type: 'other',
            ambiguity: false,
            late_night
        };
    }
}

function isLateNight(timestamp?: string): boolean {
    if (!timestamp) return false;

    try {
        const date = new Date(timestamp);
        const hour = date.getHours();
        // 10pm (22:00) to 6am (06:00)
        return hour >= 22 || hour < 6;
    } catch {
        return false;
    }
}
