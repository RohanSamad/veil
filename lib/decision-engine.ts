import { Classification, Verdict, TrafficLight } from './types';

/**
 * Decision Engine - Rules-based traffic light verdict
 * This is deterministic and NOT driven by AI
 * Based on VEIL_Phase1_System_Design.md Section 6
 */

export function getVerdict(classification: Classification): Verdict {
    const {
        effective_intensity,
        detected_risk,
        ambiguity,
        late_night
    } = classification;

    // Hard stop for safety concerns
    if (detected_risk === 'safety_concern') {
        return {
            traffic_light: 'hard_stop',
            traffic_light_emoji: '⛔',
            rationale: 'This is beyond my scope. Please contact a crisis support service.',
            rule_trace: ['risk == safety_concern → HARD_STOP']
        };
    }

    // Rewrite if escalation risk or very high intensity
    if (detected_risk === 'escalation' || effective_intensity >= 8) {
        return {
            traffic_light: 'rewrite',
            traffic_light_emoji: '🔴',
            rationale: getRationale('rewrite', classification),
            rule_trace: [
                detected_risk === 'escalation'
                    ? 'risk == escalation → REWRITE'
                    : 'effective_intensity >= 8 → REWRITE'
            ]
        };
    }

    // Wait if moderate intensity, ambiguous, or late night
    if (
        (effective_intensity >= 5 && effective_intensity <= 7) ||
        ambiguity ||
        late_night
    ) {
        const reasons = [];
        if (effective_intensity >= 5 && effective_intensity <= 7) {
            reasons.push('effective_intensity 5-7');
        }
        if (ambiguity) reasons.push('ambiguity == true');
        if (late_night) reasons.push('late_night == true');

        return {
            traffic_light: 'wait',
            traffic_light_emoji: '🟡',
            rationale: getRationale('wait', classification),
            rule_trace: [`${reasons.join(' OR ')} → WAIT`]
        };
    }

    // Send if low intensity and clear
    return {
        traffic_light: 'send',
        traffic_light_emoji: '🟢',
        rationale: getRationale('send', classification),
        rule_trace: ['effective_intensity <= 4 AND ambiguity == false AND late_night == false → SEND']
    };
}

function getRationale(verdict: TrafficLight, classification: Classification): string {
    const { effective_intensity, late_night, ambiguity, context_type } = classification;

    switch (verdict) {
        case 'send':
            return 'This looks calm and clear. Youre good to send.';

        case 'wait':
            if (late_night) {
                return 'Nothing good happens after 10pm. Sleep on it.';
            }
            if (ambiguity) {
                return 'This is a bit unclear. Give it a beat before sending.';
            }
            if (context_type === 'silence') {
                return 'Silence is not an emergency. Stillness is strength here.';
            }
            return 'Pause. Let this land before you send.';

        case 'rewrite':
            if (effective_intensity >= 8) {
                return 'This reads hot. Sending it now will probably escalate things.';
            }
            if (context_type === 'conflict') {
                return 'This reads reactive and blamey. Sending it now will probably trigger defensiveness.';
            }
            return 'This could use a reframe. Lets cool it down.';

        case 'hard_stop':
            return 'This is beyond my scope. Im an AI, not a crisis service.Please contact a local crisis line.';

        default:
            return 'Something went wrong. Try again.';
    }
}

/**
 * Get quick label based on effective intensity
 */
export function getQuickLabel(effective_intensity: number): 'Emoting' | 'Integrating' | 'EmCo' {
    if (effective_intensity >= 7) return 'Emoting';
    if (effective_intensity >= 4) return 'Integrating';
    return 'EmCo';
}
