import { z } from 'zod';

/**
 * Zod schemas for validation
 * Ensures all inputs and outputs match expected formats
 */

// Input validation schema
export const RoadTestInputSchema = z.object({
    message: z.string()
        .min(1, 'Message cannot be empty')
        .max(1000, 'Message too long (max 1000 characters)'),
    context: z.string()
        .max(100, 'Context too long (max 100 characters)')
        .optional(),
    user_intensity: z.number()
        .int()
        .min(1)
        .max(10)
        .optional(),
    local_time: z.string().optional(),
    test_mode: z.boolean().optional().optional()
});

// Traffic light types
export const TrafficLightSchema = z.enum(['send', 'wait', 'rewrite', 'hard_stop']);
export const QuickLabelSchema = z.enum(['Emoting', 'Integrating', 'EmCo']);
export const DetectedUrgencySchema = z.enum(['low', 'medium', 'high']);
export const DetectedRiskSchema = z.enum(['none', 'escalation', 'safety_concern']);
export const ContextTypeSchema = z.enum(['silence', 'conflict', 'intimacy', 'other']);

// Classification schema
export const ClassificationSchema = z.object({
    user_intensity: z.number().int().min(1).max(10),
    ai_intensity: z.number().int().min(1).max(10),
    effective_intensity: z.number().int().min(1).max(10),
    detected_urgency: DetectedUrgencySchema,
    detected_risk: DetectedRiskSchema,
    context_type: ContextTypeSchema,
    ambiguity: z.boolean(),
    late_night: z.boolean()
});

// Verdict schema
export const VerdictSchema = z.object({
    traffic_light: TrafficLightSchema,
    traffic_light_emoji: z.string(),
    rationale: z.string().min(1),
    rule_trace: z.array(z.string())
});

// Label schema
export const LabelSchema = z.object({
    quick_label: QuickLabelSchema,
    pattern_tag: z.string().min(1)
});

// Rewrite schema
export const RewriteSchema = z.object({
    tone: z.string().min(1),
    text: z.string().min(1)
});

// Full response schema
export const RoadTestResponseSchema = z.object({
    mode: z.literal('road_test'),
    trace_id: z.string().min(8),
    classification: ClassificationSchema,
    verdict: VerdictSchema,
    label: LabelSchema,
    coaching_question: z.string().optional(),
    rewrites: z.array(RewriteSchema).max(2).optional()
});

// Export types from schemas
export type RoadTestInputType = z.infer<typeof RoadTestInputSchema>;
export type RoadTestResponseType = z.infer<typeof RoadTestResponseSchema>;

// SCENARIO SCHEMA
export const ScenarioInputSchema = z.object({
    situation: z.string().min(10, 'Describe the situation (min 10 chars)').max(1000),
    feeling: z.string().min(2, 'How do you feel?').max(200),
    intent: z.string().min(2, 'What do you want to do?').max(200)
});

export const MicroPlanStepSchema = z.object({
    text: z.string(),
    icon: z.string()
});

export const ScenarioResponseSchema = z.object({
    mode: z.literal('scenario_analysis'),
    trace_id: z.string(),
    pattern_label: z.string(),
    mirror_text: z.string(),
    prediction_text: z.string(),
    emco_move: z.string(),
    micro_plan: z.array(MicroPlanStepSchema)
});

// DEBRIEF SCHEMA
export const DebriefInputSchema = z.object({
    action_taken: z.string().min(2).max(500),
    outcome: z.string().min(2).max(500),
    prediction_match: z.enum(['yes', 'no', 'unsure'])
});

export const DebriefResponseSchema = z.object({
    mode: z.literal('debrief'),
    trace_id: z.string(),
    outcome_label: z.string(),
    lesson_text: z.string(),
    next_step_text: z.string()
});

export type DebriefInputType = z.infer<typeof DebriefInputSchema>;
export type DebriefResponseType = z.infer<typeof DebriefResponseSchema>;
