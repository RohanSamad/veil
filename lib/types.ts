// Core types for VEIL Road-Test bot
// Based on phase1_specs/json/road_test.schema.json

// SCENARIO ANALYSIS TYPES
export interface ScenarioInput {
  situation: string; // "What happened"
  feeling: string;   // "What I feel"
  intent: string;    // "What I want to do"
}

export interface MicroPlanStep {
  text: string;
  icon: string; // e.g. "🛑", "🧘", "📱"
}

export interface ScenarioResponse {
  mode: 'scenario_analysis';
  trace_id: string;
  pattern_label: string;      // "Pursuit-Withdrawal Loop"
  mirror_text: string;        // "You are chasing..."
  prediction_text: string;    // "If you do X, Y happens"
  emco_move: string;          // "The steady move is..."
  micro_plan: MicroPlanStep[];
}

export type TrafficLight = 'send' | 'wait' | 'rewrite' | 'hard_stop';
export type QuickLabel = 'Emoting' | 'Integrating' | 'EmCo';
export type DetectedUrgency = 'low' | 'medium' | 'high';
export type DetectedRisk = 'none' | 'escalation' | 'safety_concern';
export type ContextType = 'silence' | 'conflict' | 'intimacy' | 'other';

export interface Classification {
  user_intensity: number; // 1-10
  ai_intensity: number; // 1-10
  effective_intensity: number; // max(user_intensity, ai_intensity)
  detected_urgency: DetectedUrgency;
  detected_risk: DetectedRisk;
  context_type: ContextType;
  ambiguity: boolean;
  late_night: boolean;
}

export interface Verdict {
  traffic_light: TrafficLight;
  traffic_light_emoji: string;
  rationale: string;
  rule_trace: string[];
}

export interface Label {
  quick_label: QuickLabel;
  pattern_tag: string;
}

export interface Rewrite {
  tone: string;
  text: string;
}

export interface RoadTestResponse {
  mode: 'road_test';
  trace_id: string;
  classification: Classification;
  verdict: Verdict;
  label: Label;
  coaching_question?: string;
  rewrites?: Rewrite[];
}

export interface RoadTestInput {
  message: string;
  context?: string;
  user_intensity?: number; // 1-10
  local_time?: string; // ISO timestamp
  test_mode?: boolean;
}

// DEBRIEF TYPES
export interface DebriefInput {
  action_taken: string; // "I sent the text" or "I waited"
  outcome: string;      // "He replied instantly" or "He ghosted"
  prediction_match: 'yes' | 'no' | 'unsure';
}

export interface DebriefResponse {
  mode: 'debrief';
  trace_id: string;
  outcome_label: string;      // "Successful Boundary" or "Reactive Backslide"
  lesson_text: string;        // "Notice how X led to Y."
  next_step_text: string;    // "Now, do nothing."
}
