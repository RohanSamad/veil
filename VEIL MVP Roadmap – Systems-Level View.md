# VEIL MVP Roadmap – Systems-Level View

**Phase 1: Core Planning & Interaction Design (3 days)**

* **Purpose:** Map all core bot interactions and decision logic.  
* **Key Outputs/Artefacts:**  
  * Send/Wait/Rewrite flow diagram (PNG)  
  * Scenario analysis & post-move debrief flows  
  * Decision logic rules & JSON schema (example JSON)  
  * Tone/guardrail rule-set  
  * Failure modes \+ recovery rules  
  * Explicit AI boundaries: areas AI will NOT be used  
  * Acceptance criteria checklist for all artefacts  
  * Deliverable formats: PDF \+ JSON examples \+ PNG diagram  
  * Audit/logging format description for determinism  
* **AI Use:** Controlled orchestration for lightweight classification + rewrite suggestions + coaching questions only; clearly documented boundaries  
* **Outcome:** Complete, auditable design for all interactions; ready for technical implementation

**Phase 2: MVP Build (Next.js \+ Supabase) — Feature-based mini-milestones (total \~3 weeks)**

* **Purpose:** Implement core MVP functionality with parallel frontend/backend work focused on features.  
* **Planning note:** Mini-milestones are implemented in parallel where practical; total calendar time assumes sequential completion with overlap where noted.  
* **Mini-Milestone 2.1 — Road-Test Feature (5 working days)**  
  * Deliverables: message input UI, Send/Wait/Rewrite orchestration (sandbox), 1–2 rewrite options, coaching question, traffic-light label, example JSON responses.  
  * Acceptance: 5 test scenarios produce deterministic outcomes per rules.  
* **Mini-Milestone 2.2 — Scenario Analysis (5 working days, overlaps with 2.1)**  
  * Deliverables: scenario input UI, classifier \+ micro-plan generator, pattern labeling output.  
  * Acceptance: 10 scenario types return consistent micro-plans and labels.  
* **Mini-Milestone 2.3 — Post-Move Debrief (3 working days, overlaps)**  
  * Deliverables: debrief flow, outcome capture points, learning summary generator.  
  * Acceptance: Debrief records outcome and provides actionable next-step suggestions in test cases.  
* **Mini-Milestone 2.4 — Quizzes & Reports (5 working days)**  
  * Deliverables: 6QS free quiz \+ basic report, 20QS paid quiz \+ richer report, report export/storage.  
  * Acceptance: Quiz submits, report renders, and CTA to bot works end-to-end.  
* **Mini-Milestone 2.5 — User Management & Payments (Sandbox) (4 working days)**  
  * Deliverables: Supabase auth, user profiles, entitlement checks, Stripe sandbox wiring, test payment flows.  
  * Acceptance: Test users can sign up, purchase entitlements, and access gated features in sandbox.  
* **Outcome:** Core product features implemented, integrated, and validated in staging; ready for analytics and go-live ops.

**Phase 3: Analytics, Outcome Tracking, Memory & Subscription Control (1 week)**

* **Purpose:** Add event tracking, memory handling, and prepare subscription/cost controls for launch.  
* **Key Outputs/Artefacts:**  
  * Event tracking plan \+ implementation hooks  
  * Session \+ profile memory behavior (ephemeral vs persistent)  
  * Meta-question capture points and storage mapping  
  * Usage caps & overage soft-prompt rules  
  * Serverless deployment checklist (Vercel/Cloud Run)  
  * Stripe go-live checklist (ops)  
* **Acceptance:** Tracking fires for core flows; memory retention rules verified; cost-control hooks in place.

**Phase 4: Validation & MVP Launch (5 working days)**

* **Purpose:** Final QA, billing go-live, monitoring, and launch validation against MVO.  
* **Key Outputs/Artefacts:**  
  * End-to-end QA and smoke tests  
  * Live Stripe payments enabled and verified  
  * Monitoring & alerts configured (errors, latency, billing anomalies)  
  * Launch measurement plan (baseline metrics, cohorts)  
  * Legal & privacy checklist signed off  
* **Acceptance:** Product live in production, initial cohort onboarded, MVO measurement running.

**Total estimated timeline (single developer baseline): \~5 weeks (25 working days)**

* Phase 1: 3 days  
* Phase 2: \~3 weeks (15 working days) — milestones overlap; calendar time \~3 weeks  
* Phase 3: 1 week (5 working days)  
* Phase 4: 5 working days

## **Notes & assumptions**

* Deliverables for Phase 1 will be presented as PDF \+ example JSON \+ PNG diagram for client sign-off before Phase 2 begins.  
* All Stripe work in Phase 2 is sandbox/testing only; Phase 3 includes go-live ops and billing readiness.

If you want, I can also add explicit dates (calendar days) based on your start date.

