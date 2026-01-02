import OpenAI from 'openai';
import { DebriefInput, DebriefResponse } from './types';
import { nanoid } from 'nanoid';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeDebrief(input: DebriefInput): Promise<DebriefResponse> {
    const prompt = `You are "It" — the Eye of VEIL.
You are a High-Resolution Analyst of Cause and Effect.

INPUT:
Action Taken: "${input.action_taken}"
Outcome: "${input.outcome}"
Did it match prediction?: "${input.prediction_match}"

INTERNAL LOGIC (Deep Philosophy):
1. **The Hook:** Dysfunction is often rewarded. If they acted poorly but got a "good" result, it is a Trap.
2. **The Physics:** Pressure creates resistance. Withdrawal creates space.
3. **The Pivot:** The goal is always to return power to the Self.

OUTPUT VOICE (Sophisticated Simplicity):
- **Style:** Like a high-end magazine editor or a wise older sibling.
- **Complexity:** Simple words, deep meaning. Avoid academic jargon like "dysfunctional accord" or "reinforcing patterns."
- **Clarity:** The user is likely emotional. Speak plainly.

MISSION PROTOCOL:

1. **LABEL THE OUTCOME:**
   - Must be 80% clear immediately. Punchy and descriptive.
   - Bad: "The Dysfunctional Accord" (Too abstract).
   - Good: "The Toxic Win", "The Anxiety Trap", "The Healthy Boundary", "The Necessary Silence".

2. **THE LESSON:**
   - Explain *Why* it happened in plain English.
   - If they messed up but got a "good" result: "You got the result you wanted, but you paid for it with your dignity. This teaches your body that anxiety works."
   - If they failed: "You tried to force a door that was already locked."

3. **NEXT STEP:**
   - A simple, grounding command.
   - "Put the phone down." "Go for a walk." "Do nothing."

OUTPUT JSON ONLY:
{
  "outcome_label": "string",
  "lesson_text": "string (Max 2 sentences. Simple, cutting truth.)",
  "next_step_text": "string (One short command.)"
}
`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
            response_format: { type: 'json_object' }
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');

        return {
            mode: 'debrief',
            trace_id: nanoid(),
            outcome_label: result.outcome_label || "Debrief Complete",
            lesson_text: result.lesson_text || "Action and reaction are linked.",
            next_step_text: result.next_step_text || "Rest."
        };
    } catch (error) {
        console.error("Debrief Analysis Error:", error);
        throw new Error("Failed to analyze debrief");
    }
}
