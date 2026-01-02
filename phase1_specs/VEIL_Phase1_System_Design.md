# VEIL MVP — Phase 1: Complete System Design Specification

**Version:** 2.0  
**Status:** DRAFT — For Client Sign-off  
**Scope:** Full System Logic (No Code Implementation)

---

## Table of Contents

1.  [Product Vision & Philosophy](#1-product-vision--philosophy)
2.  [High-Level System Architecture](#2-high-level-system-architecture)
3.  [User Journey & Flows](#3-user-journey--flows)
4.  [Module Specifications](#4-module-specifications)
    *   4.1 Authentication & User Profile
    *   4.2 Quiz Engine & Report Generator
    *   4.3 Payment & Subscription Logic
    *   4.4 The "Coherence Engine" (Bot Core)
5.  [AI Orchestration Layer](#5-ai-orchestration-layer---the-coherence-engine)
6.  [Decision Rules & Logic](#6-decision-rules--logic)
7.  [Tone, Persona & Guardrails](#7-tone-persona--guardrails)
8.  [Explicit AI Boundaries](#8-explicit-ai-boundaries)
9.  [Memory & Privacy Model](#9-memory--privacy-model)
10. [Failure Modes & Recovery](#10-failure-modes--recovery)
11. [JSON Schemas and Examples](#11-json-schemas-and-examples)
12. [Acceptance Criteria for Phase 1](#12-acceptance-criteria-for-phase-1)
13. [Audit Logging and Determinism](#13-audit-logging-and-determinism)
14. [Deliverable Packaging](#14-deliverable-packaging)

---

## 1. Product Vision & Philosophy

**What VEIL Is:**
VEIL is a behavioural clarity tool. It helps functional adults understand the *emotional language* underlying their interpersonal dynamics—the signals, timing, and patterns they often miss.

**What VEIL Is NOT:**
*   Not therapy.
*   Not dating advice.
*   Does NOT diagnose, treat, or label.

**Core Promise:**
> When people understand emotional language, confusion drops, self-blame drops, and decisions become simpler.

**The Bot ("It"):**
A real-time AI companion that optimises human decisions under emotional load. It intervenes *before* a user makes a regrettable communication.

---

## 2. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Landing    │  │  Quiz Flow  │  │  Report     │  │  Coherence Lab  │ │
│  │  (Entry)    │->│  (6QS/20QS) │->│  (Display)  │->│  (Bot Chat UI)  │ │
│  └─────────────┘  └─────────────┘  └──────┬──────┘  └────────┬────────┘ │
│                                           │ (Paywall)        │          │
└───────────────────────────────────────────┼──────────────────┼──────────┘
                                            │                  │
                                            ▼                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (API / Supabase)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Auth       │  │  Quiz       │  │  Report     │  │  Bot Router     │ │
│  │  (Supabase) │  │  Engine     │  │  Generator  │  │  (Coherence)    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────┬────────┘ │
│                                                              │          │
│  ┌─────────────┐  ┌─────────────┐                            │          │
│  │  Postgres   │  │  Stripe     │                            │          │
│  │  (DB)       │  │  (Payments) │                            │          │
│  └─────────────┘  └─────────────┘                            │          │
└──────────────────────────────────────────────────────────────┼──────────┘
                                                               │
                                                               ▼
                              ┌─────────────────────────────────────────┐
                              │          AI MODEL (LLM)                 │
                              │  Classifier -> Policy -> Generator      │
                              └─────────────────────────────────────────┘
```

**Key Components:**
*   **Frontend:** Next.js / React for speed and UX.
*   **Backend:** Supabase for Auth & Postgres DB. Stripe for Payments.
*   **AI Layer:** One LLM for classification + rewrites + coaching questions. The **traffic-light verdict is rules-based** (so it stays explainable and easy to audit).

---

## 3. User Journey & Flows

This section maps the complete user path from discovery to active bot user.

### Stage 0: Entry (Wide Net)
*   **Source:** Social media posts, founder content, curiosity hooks.
*   **Goal:** Intrigue. No selling. "Why does this keep happening?"
*   **User State:** `Anonymous`

### Stage 1: DM Engagement (Soft Qualification)
*   **Source:** ManyChat, Instagram DMs.
*   **Action:** "Want to try the quiz?" Micro-survey questions.
*   **Goal:** Warm up, harvest intent data.
*   **User State:** `Anonymous` (Pre-qualification)

### Stage 2: Free Quiz (6QS) — The Hook
*   **Entry:** User clicks through from DM or landing page.
*   **Flow:**
    1.  Light personalization: First name, Sex, Partner term.
        *   This stays **on-device** (it’s just to make the copy read naturally). It’s **not stored server-side**.
    2.  6 questions (pattern recognition).
    3.  Submit.
*   **Output:** Basic Archetype Result Page.
    *   Simple archetype name + explanation.
    *   CTA: "Go deeper →" (leads to paid quiz).
*   **Goal:** Self-recognition ("That's me!") + Sharing (virality).
*   **User State:** `Anonymous` or `Registered` (optional sign-up to save results).

### Stage 3: Paid Quiz (20QS/30QS) — The Deeper Dive
*   **Entry:** User clicks CTA from 6QS report.
*   **Gate:** **Paywall** (One-time purchase or included in subscription).
*   **Flow:**
    1.  Payment via Stripe.
    2.  20-30 deeper questions.
    3.  Submit.
*   **Output:** Rich, Personalised Report ("Glossy-mag" feel).
    *   Detailed archetype breakdown.
    *   Pattern analysis.
    *   CTA: "Access the Bot →" (leads to subscription).
*   **Goal:** Trust, commitment, better data.
*   **User State:** `Registered` + `Paid (Report)`

### Stage 4: Quiet Segmentation (Population Split)
*   **What it is:** A behind-the-scenes tag based on quiz answers + behaviour.
*   **What it’s used for:** Offering the next step that fits (without announcing the “split”).
*   **Example output:** `cohort_tag = feeling_led | other`

### Stage 5: Optional Hive-off — Emotional Coherence Sub-Module
*   **Who sees it:** Mainly the `feeling_led` cohort.
*   **Positioning:** “Understand what’s actually happening. Run real situations past *It* before reacting.”
*   **Tone:** Glossy-mag, externalised (about the dynamic), zero blame.

### Stage 6: Basic Bot “It” — Limited Access (Everyone)
*   **Why:** People need the “oh wow… this stopped me doing something stupid” moment before they subscribe.
*   **What they get:** A small number of Road-Tests + Scenario checks (example: 3 total) with guardrails.
*   **Gate:** Rate limits + abuse protection (no heavy identity checks).

### Stage 7: Full Bot Subscription — The Core Product
*   **Gate:** Subscription (Stripe).
*   **Access:** Full “Coherence Lab” + higher usage caps.
*   **User State:** `Subscribed`

### Stage 8: Bot Interaction ("Coherence Lab")
*   **Modes Available:**
    *   **[A] Road-Test a Message**
    *   **[B] Live Scenario Analysis**
    *   **[C] Post-Move Debrief**
*   **Goal:** Real-time behavioural intervention. Prove value. Track outcomes.

---

## 4. Module Specifications

### 4.1 Authentication & User Profile

**Provider:** Supabase Auth

**User States (Authorization Levels):**

| Level | Description | Access |
| :--- | :--- | :--- |
| `Anonymous` | No account | 6QS Quiz + **Limited Bot Preview** |
| `Registered` | Email sign-up | 6QS + Save results + Limited Bot Preview |
| `Paid (Report)` | One-time purchase | 20QS/30QS + Rich Report + Bigger Preview |
| `Subscribed` | Active subscription | Full Bot Access |

**Profile Data (Persistent, server-side):**
*   `user_id` (UUID)
*   `email`
*   `quiz_results` (JSON blob: archetype, scores)
*   `subscription_status` (from Stripe)
*   `profile_level` / "Ladder Level" (derived from quiz)

**Display preferences (default on-device, not stored server-side):**
*   `first_name` (display only)
*   `sex` (for language personalization)
*   `partner_term` (husband / wife / partner)

---

### 4.2 Quiz Engine & Report Generator

**Quizzes:**

| Quiz | Questions | Price | Output |
| :--- | :--- | :--- | :--- |
| **6QS** | 6 | Free | Basic Archetype Page |
| **20QS** | 20 | Paid (Low) | Comprehensive Report |
| **30QS** | 30 | Paid (Premium) | Personalized Roadmap |

**Quiz Logic (Conceptual):**
*   Questions are multiple-choice or sliding scale.
*   Answers map to weighted scores across different pattern dimensions (e.g., Pursuit/Withdrawal, Anxious/Avoidant).
*   Final archetype is determined by the highest-scoring dimension.

**Report Generation:**
*   **Input:** Quiz answer payload.
*   **Process:** Mapping function (rules-based, not AI) produces archetype + narrative.
*   **Output:** Rendered HTML/PDF report page.
*   **Storage:** Object storage (e.g., Supabase Storage, S3) linked to `user_id`.

---

### 4.3 Payment & Subscription Logic

**Provider:** Stripe

**Products:**

| Product | Type | Price (Example) | Entitlement |
| :--- | :--- | :--- | :--- |
| 20QS Report | One-time | $19 | Access to 20QS + Report |
| 30QS Report | One-time | $49 | Access to 30QS + Report |
| Bot Subscription | Recurring (Monthly) | $29/mo | Full Bot Access |

**Gating Logic (API Level):**
*   Before any protected API call (`/bot/roadtest`, `/report/generate`), check Stripe entitlements.
*   `user.subscription_status === 'active'` → Allow bot access.
*   `user.purchases.includes('20qs_report')` → Allow 20QS access.

**Usage Caps (MVP):**
*   e.g., 30 Road-Tests / month.
*   Overage: Soft prompt to upgrade (not a hard block for MVP).

---

### 4.4 The "Coherence Engine" (Bot Core)

This is the heart of VEIL. It's an AI orchestration layer, not a simple chatbot.

**Available Modes:**

#### Mode A: Road-Test a Message (Highest Value)

**User Provides:**
*   **The Draft Message:** The text they want to send.
*   **Context:** 1-2 lines describing the situation (e.g., "We haven't spoken in 2 days after a fight").
*   **Emotion intensity (1–10):** A quick gut score.

**The bot also infers (quietly):**
*   `ai_intensity`, `urgency`, `risk`, `context_type`, plus flags like `ambiguity` and `late_night`.

**Determinism note (important):**
*   We compute `effective_intensity = max(user_intensity, ai_intensity)`
*   The **traffic-light verdict is rules-based**. The LLM is used for rewrites + coaching question (not “picking the colour”).

**Bot Returns:**
*   🚦 **Traffic Light Verdict:** `Send` / `Wait` / `Rewrite` (plus a 1-line rationale)
*   **Quick label:** `Emoting` / `Integrating` / `EmCo`
*   **Pattern tag:** A short behaviour label (e.g., "Reactive Escalation", "Silence Anxiety")
*   **Rewrite Options:** 1-2 alternatives (when useful)
*   **Coaching Question:** One reflective question (e.g., "What outcome are you going for?")

---

#### Mode B: Live Scenario Analysis

**User Provides:**
*   **What happened:** A description of the event.
*   **What they're feeling:** Current emotional state.
*   **What they want to do:** Their intended action.

**Bot Returns:**
*   **Pattern Identified:** (e.g., "Pursuit-Withdrawal Loop").
*   **Explanation / "The Mirror":** Reflects the dynamic back to the user.
*   **Prediction:** "If you do X, the likely outcome is Y."
*   **Micro-Plan:** 3 bullet-point actions for emotional sovereignty.
*   **“What would EmCo do?”** A short, steady alternative move.

---

#### Mode C: Post-Move Debrief

**User Provides:**
*   **What did you do?** (Sent the text / Waited / Called)
*   **What happened?** (They replied / Ghosted / Fight escalated)
*   **Did it match the prediction?** (Yes / No / Not sure)

**Bot Returns:**
*   **Validation / Lesson:** Connects the outcome to the previous prediction. (e.g., "See? When you paused, they came forward.")
*   **Outcome Tag:** Stored for future learning. (e.g., "Successful De-escalation").
*   **Next step (tiny):** One calm suggestion (non-directive).

---

## 5. AI Orchestration Layer — "The Coherence Engine"

**Architecture:**
One LLM model handles all tasks via structured prompting. No multi-agent systems for MVP.

**Processing Pipeline:**

```
User Input (Mode, Message, Context, User Intensity, Local Time)
           │
           ▼
┌───────────────────────────────────────────────────────────┐
│ Step 1: CLASSIFIER (Cheap/Fast Pass)                      │
│   Inputs: message_text, context_text, user_intensity,     │
│           local_time                                      │
│   Outputs:                                                │
│     - ai_intensity: 1-10                                  │
│     - effective_intensty:max(user_intensity, ai_intensity)│
│     - detected_urgency: low / medium / high               │
│     - detected_risk: none / safety_concern / escalation   │
│     - context_type: silence / conflict / intimacy / other │
│     - ambiguity: true / false                             │
│     - late_night: true / false                            │
│     - quick_label: Emoting / Integrating / EmCo           │
└───────────────────────────────────────────────────────────┘
           │
           ▼
┌───────────────────────────────────────────────────────────┐
│ Step 2: POLICY + PERSONA WRAPPER                          │
│   Applies:                                                │
│     - Tone rules (sassy, warm, non-directive)             │
│     - "Coach questions, not commands" policy              │
│     - Safety filter check                                 │
└───────────────────────────────────────────────────────────┘
           │
           ▼
┌───────────────────────────────────────────────────────────┐
│ Step 3: DECISION ENGINE (Rules)                           │
│   Produces:                                               │
│     - traffic_light                                       │
│     - rationale_brief                                     │
│     - rule_trace (for audit)                              │
└───────────────────────────────────────────────────────────┘
           │
           ▼
┌───────────────────────────────────────────────────────────┐
│ Step 4: GENERATOR (LLM, only where allowed)               │
│   Produces:                                               │
│     - rewrite_options[]                                   │
│     - coaching_question                                   │
│     - pattern_tag (short label)                           │
│     - “What would EmCo do?” (scenario mode)               │
└───────────────────────────────────────────────────────────┘
           │
           ▼
┌───────────────────────────────────────────────────────────┐
│ Step 5: SAFETY + SCHEMA CHECKS                            │
│   Checks for:                                             │
│     - Self-harm / violence / DV / harassment / explicit   │
│     - JSON Schema validity (retry once, else fallback)    │
│   Action: If flagged, return HARD STOP or a safe fallback.│
└───────────────────────────────────────────────────────────┘
           │
           ▼
      Final JSON Response (+ trace_id)
```

---

## 6. Decision Rules & Logic

### Traffic Light Rules (for Road-Test Mode)

The verdict is driven by `effective_intensity` + `risk`, with two extra flags: `ambiguity` and `late_night`.

| Condition | Verdict | Bot Action |
| :--- | :---: | :--- |
| `risk == none` AND `effective_intensity <= 4` AND `ambiguity == false` AND `late_night == false` | 🟢 **SEND** | Approve + keep it simple. |
| `risk == none` AND (`effective_intensity` is 5-7 OR `ambiguity == true` OR `late_night == true`) | 🟡 **WAIT** | Suggest a pause + one insight. |
| `risk == escalation` OR `effective_intensity >= 8` | 🔴 **REWRITE** | Don’t send it as-is. Offer 1–2 rewrites + 1 coaching question. |
| `risk == safety_concern` | ⛔ **HARD STOP** | Exit flow. Provide crisis resources. |

### Contextual Pattern Rules

| Pattern Detected | Bot Guidance |
| :--- | :--- |
| **Silence Anxiety:** User panicking about no reply. | "Silence is not an emergency. Stillness is strength here." |
| **Conflict Mode:** User is in "fight" mode. | "Nothing productive happens above 100bpm. Cool down first." |
| **Avoidance:** User is ghosting to avoid hard conversation. | "Slow ghosting is crueler than kind clarity." |
| **Protest Behavior:** User is picking a fight to get a reaction. | "You're creating a crisis to get attention. Any reaction feels better than silence." |
| **Wall of Text:** Message is >150 words. | "That's a lot of words. What's the one thing you actually need to say?" |

---

## 7. Tone, Persona & Guardrails

### The Persona: "It"

*   **Archetype:** Glossy Magazine Columnist + Zen Master + Cool Older Sibling.
*   **Vibe:** Sophisticated, slightly detached, warm but firm. Never clinical.
*   **Voice Examples:**
    *   ✅ "That's a lot of words for 'I'm scared you don't care.'"
    *   ✅ "This isn't urgency. It's anxiety wearing a costume."
    *   ❌ "It sounds like you are experiencing anxious attachment patterns..." (Too clinical)
    *   ❌ "You should definitely break up with him." (Directive / Judgmental)

### The "Never Do" List (Guardrails)

1.  **NO Commands:** Never say "Do this." Use "A strong move would be..." or "Consider..."
2.  **NO Diagnosis:** Never use clinical terms (Narcissist, BPD, Trauma, ADHD). Use behavioral language (High conflict, Emotional volatility, A pattern of...).
3.  **NO Escalation:** Never suggest revenge, "testing" the partner, or playing games.
4.  **NO Mental Health Advice:** The bot is not a therapist. It does not treat. It reflects.
5.  **NO Taking Sides:** Never say "You're right, they're wrong." Focus on dynamics, not blame.

---

## 8. Explicit AI Boundaries

This is a hard rule: where AI is allowed vs not allowed.

| ✅ AI IS ALLOWED (Pass) | ❌ AI IS PROHIBITED (Fail) |
| :--- | :--- |
| **Reflecting emotions:** "It sounds like you're feeling ignored." | **Diagnosing:** "He sounds like a textbook narcissist." |
| **Suggesting rewrites:** "Here's a clearer way to say that." | **Fabricating excuses:** "Tell him you were sick." |
| **Naming patterns:** "This looks like the pursuit-withdrawal loop." | **Predicting partner's feelings:** "He definitely still loves you." |
| **Asking coaching questions:** "What's your goal here?" | **Giving relationship edicts:** "You need to leave him." |
| **Detecting emotional intensity from text.** | **Making mental health claims:** "You have anxiety." |

---

## 9. Memory & Privacy Model

**Two-Tier Memory:**

| Type | Description | Retention |
| :--- | :--- | :--- |
| **Profile Memory (Persistent)** | Quiz results, archetype, preferences, subscription status. | Permanent (until user deletes account) |
| **Session Memory (Ephemeral)** | Last N messages in current chat session. | Expires after X days (e.g., 7 days) |

**Data Handling Rules:**
*   **Display prefs stay on-device:** first name / sex / partner term are used for writing style, not stored server-side.
*   **NEVER store raw pasted text messages by default.**
*   Store only:
    *   Embeddings or short, anonymized summaries.
    *   Outcome metrics (Did they send? What happened?).
    *   Pattern tags.
*   **Opt-in Toggle:** "Save this scenario to improve my coaching." (User must actively consent).

---

## 10. Failure Modes & Recovery

| Failure Scenario | Bot Response Strategy |
| :--- | :--- |
| **User is angry / rejecting advice:** "You don't get it!" | Validate feeling, restate prediction without judgment. "I hear you're angry. You can send it. I predict [Negative Outcome]. Your call. What do you want more: to be right, or to be connected?" |
| **User is vague:** "He's being weird." | Ask clarifying question. "Define 'weird.' Is he silent, cold, sarcastic, or something else?" |
| **User wants validation (Echo Chamber):** "Just tell me I'm right!" | Gentle redirect. "I'm on your team, which is why I can't just agree. Being 'right' won't get you a hug. Let's focus on what actually works." |
| **User tries to misuse bot for manipulation:** "How do I make him jealous?" | Redirect to integrity. "That's a game. Games create distance. What do you actually want from this relationship?" |
| **LLM returns invalid JSON** | Retry once with a stricter “return JSON only” prompt. If it still fails, return a safe fallback: traffic light + 1 plain-language reason + 1 coaching question (no rewrites). Log the failure. |
| **LLM refuses / is over-cautious** | Keep the rules-based verdict. Ask 1 clarifying question or give a minimal safe response (“I can’t rewrite that. What outcome do you want?”). Log the refusal. |
| **Rate limit / quota hit** | Don’t break the vibe. Explain plainly (“You’ve hit today’s limit”), show when it resets, and offer upgrade/next step. |
| **Entitlement check fails (Stripe/Supabase hiccup)** | Fail closed for paid features (no full bot access), but keep a lightweight preview response if possible. Ask the user to refresh / try again. Log the incident. |
| **Timeout / model downtime** | Return: “I’m having a moment—try again in 30 seconds.” Offer a “manual quick check” template (3 questions) so the user still gets value. |
| **Safety Concern (Self-harm, Domestic Violence):** "I want to hurt myself." / "I'm afraid he'll hit me." | **HARD STOP.** Exit normal flow. "This is beyond my scope. I'm an AI, not a crisis service. Please contact [Local Crisis Line / Hotline]. I cannot advise on safety or medical issues." Do not continue conversation on this topic. |

---

## 11. JSON Schemas and Examples

To keep this system **testable** and **auditable**, every mode returns strict JSON.

**Files live here:** `phase1_specs/json/`

*   **Road-test:** `road_test.schema.json` + `road_test.example.json`
*   **Scenario analysis:** `scenario_analysis.schema.json` + `scenario_analysis.example.json`
*   **Debrief:** `debrief.schema.json` + `debrief.example.json`
*   **Audit events (internal):** `audit_event.schema.json` + `audit_event.example.json`

---

## 12. Acceptance Criteria for Phase 1

Phase 1 is considered **COMPLETE** when the following are true:

| # | Criterion | Status |
| :--- | :--- | :---: |
| 1 | All three bot interaction modes (Road-Test, Scenario, Debrief) are fully documented with Inputs, Internal Steps, and Outputs. | ⬜ |
| 2 | Road-test Traffic Light rules are deterministic (rules-based) using `effective_intensity` + `risk` (+ `ambiguity` / `late_night`). | ⬜ |
| 3 | Quick-label taxonomy is locked: **Emoting / Integrating / EmCo** (and included in outputs). | ⬜ |
| 4 | Tone and Guardrails ("Never Do" list) are explicitly documented. | ⬜ |
| 5 | AI Boundaries (Allowed vs. Prohibited actions) are unambiguous. | ⬜ |
| 6 | Failure modes include both user-behaviour cases + system/LLM failures (>= 5 total). | ⬜ |
| 7 | JSON Schemas + example JSON exist for Road-test / Scenario / Debrief. | ⬜ |
| 8 | Full user journey is mapped, including **Population Split + Hive-off + Limited Bot Preview + Paywalls**. | ⬜ |
| 9 | Flow diagrams exist for **Road-test**, **Scenario Analysis**, and **Post-move Debrief**. | ⬜ |
| 10 | Audit/logging format is defined (and avoids storing raw text by default). | ⬜ |
| 11 | Determinism controls are documented: versions, schema validation, retry/fallback, and `rule_trace`. | ⬜ |
| 12 | Deliverable packaging notes exist: how to export **PDF + PNG** for client sign-off. | ⬜ |
| 13 | All logic is reviewable and explainable to a non-technical stakeholder. | ⬜ |

**Definition of Done:** All criteria marked ✅. Document is ready for client sign-off before any coding (Phase 2) begins.

---

## 13. Audit Logging and Determinism

This is how we keep the system **explainable** and “deterministic enough” for testing.

### Audit logging (what we log)

**Rules:**
*   **No raw pasted text by default.** Log lengths + a one-way hash if needed (for debugging duplicates).
*   Every request gets a `trace_id` so we can replay the decision trail.

**Log the stuff that matters:**
*   **Inputs (safe):** message length, context length, `user_intensity`, `late_night` flag
*   **Classifier outputs:** `ai_intensity`, `effective_intensity`, `risk`, `urgency`, `context_type`, flags
*   **Decision:** traffic light + `rule_trace`
*   **LLM metadata:** model name, prompt version, temperature
*   **Schema status:** valid/invalid + retry/fallback taken

**Reference schema + example:**
*   `phase1_specs/json/audit_event.schema.json`
*   `phase1_specs/json/audit_event.example.json`

### Determinism controls (how we keep it consistent)

*   **Rules pick the verdict** (Send/Wait/Rewrite/Hard Stop) — not the LLM.
*   **Version everything:** prompts, schemas, and model choice.
*   **Keep generation tight:** low temperature + short outputs.
*   **Validate every response:** JSON Schema check → retry once → safe fallback.
*   **Store `rule_trace`:** makes it easy to explain “why that verdict” in plain English.

---

## 14. Deliverable Packaging

For Phase 1 sign-off, the “delivery bundle” is basically:

*   **Spec (PDF export):** `phase1_specs/VEIL_Phase1_System_Design.md`
*   **Diagrams (PNG exports):**
    *   `phase1_specs/user_journey_flow.mermaid`
    *   `phase1_specs/road_test_flow.mermaid`
    *   `phase1_specs/scenario_analysis_flow.mermaid`
    *   `phase1_specs/post_move_debrief_flow.mermaid`
*   **JSON contracts + examples:** everything in `phase1_specs/json/`

If you want a quick export path:
*   **Mermaid → PNG:** use Mermaid Live Editor (paste the `.mermaid` content) or Mermaid CLI (`mmdc`) if you prefer.
*   **Markdown → PDF:** export from VS Code / Obsidian / Typora / your usual tool.
