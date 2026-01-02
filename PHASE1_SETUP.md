# VEIL Phase 1 - MVP Implementation Guide

## 🚀 Current Status: Core Logic Complete

We've completed **Day 1-2** of Phase 1!

### ✅ What's Built

**Core Backend Logic:**
- ✅ TypeScript types matching phase1_specs schemas
- ✅ Decision engine with deterministic traffic light rules
- ✅ LLM classifier for message analysis
- ✅ LLM generator for rewrites and coaching questions
- ✅ IP-based rate limiting (3 tries per 24h)
- ✅ Main API endpoint: `/api/road-test`

**File Structure:**
```
lib/
├── types.ts              # TypeScript interfaces
├── decision-engine.ts    # Rules-based verdict logic
├── classifier.ts         # LLM message analysis
├── generator.ts          # Rewrite & coaching generation
└── rate-limit.ts         # Vercel KV rate limiting

app/api/road-test/
└── route.ts              # Main API endpoint
```

---

## 📋 Next Steps (Day 3-4)

### 1. Set Up Environment Variables

Create `.env.local` file (copy from `env.example`):

```bash
cp env.example .env.local
```

Add your OpenAI API key:
```env
OPENAI_API_KEY=sk-proj-...
```

For local testing, you'll also need Vercel KV. Two options:

**Option A: Deploy to Vercel (Recommended)**
```bash
npm install -g vercel
vercel link
vercel env pull .env.local
```

**Option B: Local Development (Mock rate limiting)**
- Temporarily disable rate limiting in `app/api/road-test/route.ts`
- Comment out the rate limit check

### 2. Test the API

Start dev server:
```bash
npm run dev
```

Test with curl:
```bash
curl -X POST http://localhost:3000/api/road-test \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Why are you ignoring me? I know you saw my text.",
    "context": "Haven been talking for 2 days after an argument",
    "user_intensity": 8,
    "local_time": "2026-01-02T23:00:00Z"
  }'
```

Expected response:
```json
{
  "mode": "road_test",
  "trace_id": "rt_abc123",
  "classification": {
    "effective_intensity": 8,
    "detected_risk": "escalation",
    ...
  },
  "verdict": {
    "traffic_light": "rewrite",
    "traffic_light_emoji": "🔴",
    "rationale": "This reads hot. Sending it now will probably escalate things."
  },
  "label": {
    "quick_label": "Emoting",
    "pattern_tag": "Reactive Escalation"
  },
  "rewrites": [...],
  "coaching_question": "What outcome are you actually going for here?"
}
```

### 3. Write Test Cases

Create `lib/__tests__/decision-engine.test.ts`:

Test these 5 scenarios:
1. **🟢 SEND:** Low intensity (≤4), no ambiguity, daytime
2. **🟡 WAIT:** Medium intensity (5-7) OR late night OR ambiguous
3. **🔴 REWRITE:** High intensity (≥8) OR escalation risk
4. **⛔ HARD_STOP:** Safety concern (self-harm/violence)
5. **Edge Case:** Conflicting signals (low user_intensity but high AI_intensity)

### 4. Build the Frontend (Day 6-7)

We'll create:
- Landing page
- Message input form
- Result display with traffic light UI
- Mobile responsive design

---

## 🧪 Testing the Decision Engine

Quick test in Node REPL:

```typescript
import { getVerdict } from './lib/decision-engine';

// Test SEND scenario
const test1 = getVerdict({
  user_intensity: 3,
  ai_intensity: 2,
  effective_intensity: 3,
  detected_risk: 'none',
  detected_urgency: 'low',
  context_type: 'intimacy',
  ambiguity: false,
  late_night: false
});
console.log(test1.traffic_light); // Should be 'send'

// Test REWRITE scenario
const test2 = getVerdict({
  user_intensity: 8,
  ai_intensity: 9,
  effective_intensity: 9,
  detected_risk: 'escalation',
  detected_urgency: 'high',
  context_type: 'conflict',
  ambiguity: false,
  late_night: true
});
console.log(test2.traffic_light); // Should be 'rewrite'
```

---

## 🛠️ Troubleshooting

### "OpenAI API key not found"
- Make sure `.env.local` exists and has `OPENAI_API_KEY`
- Restart dev server after adding env vars

### "kv is not defined"
- You need Vercel KV set up
- Either deploy to Vercel or temporarily disable rate limiting for local dev

### TypeScript errors
```bash
npm install --save-dev @types/node
```

---

## 📚 API Documentation

### POST `/api/road-test`

**Request Body:**
```typescript
{
  message: string;           // The draft message to analyze
  context: string;           // 1-2 line situation description
  user_intensity: number;    // 1-10 self-reported emotional intensity
  local_time?: string;       // ISO timestamp (optional)
}
```

**Response:**
```typescript
{
  mode: 'road_test';
  trace_id: string;
  classification: Classification;
  verdict: Verdict;
  label: Label;
  coaching_question?: string;
  rewrites?: Rewrite[];
}
```

**Rate Limiting:**
- 3 requests per IP per 24 hours
- Returns 429 when exceeded
- Headers: `X-RateLimit-Remaining`, `X-RateLimit-Limit`

---

## 🎯 Phase 1 Milestones

- [x] **Day 1-2:** Core logic implementation ✅
- [ ] **Day 3-4:** API testing + validation
- [ ] **Day 5:** Rate limiting setup
- [ ] **Day 6-7:** Frontend UI
- [ ] **Day 8-9:** End-to-end testing
- [ ] **Day 10:** Deploy + soft launch

---

## 📞 Support

Questions? Check:
- `phase1_specs/` for JSON schemas
- `VEIL_Phase1_System_Design.md` for full specification
- `veil_complete_roadmap.md` for full implementation plan

---

**Last Updated:** 2026-01-02  
**Status:** Day 1-2 Complete ✅  
**Next:** Test API endpoint
