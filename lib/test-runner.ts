import { getVerdict, getQuickLabel } from './decision-engine';
import { Classification } from './types';

// Mock classification data factory
const mockClass = (overrides: Partial<Classification>): Classification => ({
    user_intensity: 5,
    ai_intensity: 5,
    effective_intensity: 5,
    detected_urgency: 'medium',
    detected_risk: 'none',
    context_type: 'other',
    ambiguity: false,
    late_night: false,
    ...overrides
});

console.log('🧪 Starting Decision Engine Tests...\n');

let passed = 0;
let failed = 0;

function assertVerdict(name: string, input: Classification, expected: string) {
    const result = getVerdict(input);
    if (result.traffic_light === expected) {
        console.log(`✅ ${name}: PASSED`);
        passed++;
    } else {
        console.error(`❌ ${name}: FAILED (Expected ${expected}, got ${result.traffic_light})`);
        console.error('   Input:', JSON.stringify(input, null, 2));
        console.error('   Trace:', result.rule_trace);
        failed++;
    }
}

// 🟢 SEND SCENARIOS
assertVerdict('Clear Low Intensity', mockClass({
    effective_intensity: 3,
    ambiguity: false,
    late_night: false
}), 'send');

assertVerdict('Clear Medium-Low Intensity', mockClass({
    effective_intensity: 4,
    ambiguity: false,
    late_night: false
}), 'send');

// 🟡 WAIT SCENARIOS
assertVerdict('Medium Intensity Wait', mockClass({
    effective_intensity: 6, // 5-7 range
    ambiguity: false
}), 'wait');

assertVerdict('Ambiguity Wait', mockClass({
    effective_intensity: 3,
    ambiguity: true // Ambiguous
}), 'wait');

assertVerdict('Late Night Wait', mockClass({
    effective_intensity: 3,
    late_night: true // Late night
}), 'wait');

assertVerdict('Silence Wait', mockClass({
    effective_intensity: 5,
    context_type: 'silence'
}), 'wait');

// 🔴 REWRITE SCENARIOS
assertVerdict('High Intensity Rewrite', mockClass({
    effective_intensity: 8
}), 'rewrite');

assertVerdict('Escalation Risk Rewrite', mockClass({
    effective_intensity: 5,
    detected_risk: 'escalation'
}), 'rewrite');

assertVerdict('Conflict Context Rewrite', mockClass({
    effective_intensity: 8,
    context_type: 'conflict'
}), 'rewrite');

// ⛔ HARD STOP SCENARIOS
assertVerdict('Safety Concern Stop', mockClass({
    effective_intensity: 9,
    detected_risk: 'safety_concern'
}), 'hard_stop');


console.log(`\nResults: ${passed} passed, ${failed} failed.`);

if (failed > 0) process.exit(1);
