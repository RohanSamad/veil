import OpenAI from 'openai';
import { Rewrite, TrafficLight, Classification } from './types';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface GeneratorOutput {
    pattern_tag: string;
    coaching_question?: string;
    rewrites?: Rewrite[];
}

/**
 * Generator - Creates rewrites and coaching questions
 * Only used when verdict is WAIT or REWRITE
 */
export async function generateResponse(
    verdict: TrafficLight,
    message: string,
    context: string,
    classification: Classification,
    ellState?: any // Typed as ELLState
): Promise<GeneratorOutput> {
    // No generation needed for SEND or HARD_STOP
    if (verdict === 'send' || verdict === 'hard_stop') {
        return {
            pattern_tag: getPatternTag(classification),
            coaching_question: undefined,
            rewrites: undefined
        };
    }

    const prompt = buildGeneratorPrompt(verdict, message, context, classification, ellState);

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7, // Slightly higher for creative rewrites
            response_format: { type: 'json_object' }
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');

        return {
            pattern_tag: result.pattern_tag || getPatternTag(classification),
            coaching_question: result.coaching_question,
            rewrites: verdict === 'rewrite' ? result.rewrites : undefined
        };
    } catch (error) {
        console.error('Generator error:', error);
        // Fallback responses
        return {
            pattern_tag: getPatternTag(classification),
            coaching_question: 'What outcome are you actually going for here?',
            rewrites: verdict === 'rewrite' ? getFallbackRewrites(message) : undefined
        };
    }
}

function buildGeneratorPrompt(
    verdict: TrafficLight,
    message: string,
    context: string,
    classification: Classification,
    ellState?: any
): string {
    // Inject ELL Context if available
    const ellContext = ellState ? `
HISTORY (ELL STATE):
- The User tends towards: ${ellState.dominant_patterns.join(', ') || 'Unknown'}
- Coherence Signals: ${ellState.coherence_indicators.join(', ') || 'None'}
- Flag: Prefers Direct Tone? ${ellState.calibration_flags.prefers_direct_tone ? 'YES' : 'NO'}
` : '';

    const baseInstructions = `You are "It" — the collective wisdom of VEIL.
You are a philosopher-coach who sees the architecture of human connection.
Your tone is high-resolution, sophisticated, slightly detached but deeply caring.
You do not give "tips". You give *sight*.

YOUR VOICE:
- Like Marcus Aurelius meeting an editor from Vogue.
- Cutting, precise, devoid of cliché.
- Use words like: "Architecture", "Signal", "Noise", "Leverage", "Geometry", "Void".
- Never use: "It seems like", "Maybe try", "Calm down", "Take a breath".
- Direct. Sassy. Essentialist.

THE PHILOSOPHY:
- Relationships are systems. One change in input changes the whole system.
- Reactivity preserves the past. Response creates the future.
- The user is usually "hooked" by a story they are telling themselves. Your job is to cut the hook.

PATTERN RECOGNITION (Use these deep tags):
- "The Narrative Spin" (Inventing a story in the silence)
- "The Victim Trap" (Giving away all power to the other)
- "The Justice Barrage" (Using logic to bludgeon emotion)
- "The Clarity Void" (Hoping for rescue instead of asking for needs)
- "The Anxious Pursuit" (Running after someone who is walking away)

${ellContext}

INPUT REALITY:
Draft: "${message}"
Context: "${context}"
Intensity: ${classification.effective_intensity}/10 (${classification.effective_intensity >= 8 ? 'FLOODED' : 'ACTIVATED'})
Context Type: ${classification.context_type}`;

    if (verdict === 'rewrite') {
        return `${baseInstructions}

VERDICT: REWRITE (The signal is distorted by noise).

TASK:
1. Diagnose the *Distortion* (Pattern Tag).
2. Architect 2 Rewrites that restore dignity and clarity.
   - Option A (The Stoic): High boundaries, low emotion, pure signal.
   - Option B (The Vulnerable Truth): Disarming, honest, owned emotion (no blame).
3. Ask 1 Coaching Question that forces them to see the reality.

JSON OUTPUT ONLY:
{
  "pattern_tag": "string (The Deep Distortion)",
  "rewrites": [
    {"tone": "The Stoic / Direct", "text": "..."},
    {"tone": "The Vulnerable Truth", "text": "..."}
  ],
  "coaching_question": "string"
}

REWRITE LAWS:
- Kill the adjectives.
- Kill the "You statements".
- Own the projection.
- If they are chasing, make them stand still.
- If they are fighting, make them drop the sword.

QUESTION LAWS:
- Pierce the delusion.
- Example: "Are you trying to connect, or are you trying to win?"
- Example: "If this text works perfectly, what does the next 5 minutes look like?"`;
    }

    // WAIT verdict
    return `${baseInstructions}

VERDICT: WAIT (The timing is the enemy).

TASK:
1. Name the Trap (Pattern Tag).
2. Ask 1 Question that reveals the futility of acting now.

JSON OUTPUT ONLY:
{
  "pattern_tag": "string",
  "coaching_question": "string"
}

QUESTION LAWS:
- Reveal that urgency is a sensation, not a fact.
- Example: "You are trying to solve an internal feeling with an external action. Why?"
- Example: "The version of you sending this text is not the version of you who will regret it."`;
}

function getPatternTag(classification: Classification): string {
    const { context_type, effective_intensity, ambiguity } = classification;

    if (context_type === 'silence' && effective_intensity >= 6) {
        return 'Silence Anxiety';
    }
    if (context_type === 'conflict' && effective_intensity >= 7) {
        return 'Reactive Escalation';
    }
    if (ambiguity) {
        return 'Clarity Avoidance';
    }
    if (effective_intensity >= 8) {
        return 'Emotional Flooding';
    }
    if (effective_intensity <= 3) {
        return 'Clear Communication';
    }
    return 'Processing';
}

function getFallbackRewrites(message: string): Rewrite[] {
    // Simple fallback if AI fails
    return [
        {
            tone: 'Neutral / Direct',
            text: 'Hey, can we talk when you have a minute? I want to understand whats happening.'
        },
        {
            tone: 'Warm / Vulnerable',
            text: 'Im feeling disconnected.Can we reset and talk this through ? '
        }
    ];
}
