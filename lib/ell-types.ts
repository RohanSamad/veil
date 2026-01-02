// Core types for ELL State (MVP)
// Based on ELL State Schema (MVP)

export type ELLPattern =
    | 'silence_anxiety'
    | 'reactive_escalation'
    | 'avoidant_delay'
    | 'protest_behavior'
    | 'conflict_spike'
    | 'wall_of_text'
    | 'over_explaining'
    | 'people_pleasing'
    | 'clarity_avoidance'
    | 'ambiguity_intolerance';

export type ELLCoherence =
    | 'pauses_before_action'
    | 'chooses_clarity_over_intensity'
    | 'outcome_matches_prediction'
    | 'uses_short_clear_messages'
    | 'sets_clean_boundaries'
    | 'tolerates_silence';

export interface CalibrationFlags {
    prefers_direct_tone: boolean;
    late_night_sensitivity: boolean;
    high_ambiguity_reactivity: boolean;
    prefers_short_responses: boolean;
}

export interface InteractionMeta {
    road_tests_count: number;
    scenario_checks_count: number;
    debriefs_completed: number;
    last_mode_used: 'road_test' | 'scenario_analysis' | 'post_move_debrief' | 'none';
    last_interaction_at: string | null; // ISO Date
}

export interface ELLState {
    schema_version: '1.0.0';
    user_id: string;
    dominant_patterns: ELLPattern[];
    coherence_indicators: ELLCoherence[];
    calibration_flags: CalibrationFlags;
    interaction_history_meta: InteractionMeta;
    consent: {
        save_scenarios_opt_in: boolean;
    };
    last_updated: string; // ISO Date
}

// Default empty state for new users
export const DEFAULT_ELL_STATE: Omit<ELLState, 'user_id' | 'last_updated'> = {
    schema_version: '1.0.0',
    dominant_patterns: [],
    coherence_indicators: [],
    calibration_flags: {
        prefers_direct_tone: false,
        late_night_sensitivity: false,
        high_ambiguity_reactivity: false,
        prefers_short_responses: true
    },
    interaction_history_meta: {
        road_tests_count: 0,
        scenario_checks_count: 0,
        debriefs_completed: 0,
        last_mode_used: 'none',
        last_interaction_at: null
    },
    consent: {
        save_scenarios_opt_in: false
    }
};
