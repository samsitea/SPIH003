# DelayGuard — PRD

## Original Problem Statement
Hackathon Round 3: build a startup-worthy marketing/explainer landing page for "DelayGuard" (aka SLA Guardian) — an agentic AI system that predicts SLA breaches in government/enterprise service requests before they happen. Required: hero naming the product/audience/purpose, animated 5-agent flow (Intake → Risk Scoring → Root-Cause → Prioritization → Action + Orchestrator calibration), live clickable demo widget scoring one request end-to-end, problem/solution in plain language, services, why-choose-us, storytelling, community voices, roadmap, pricing, FAQs, login/signup pages, department icons, product screenshots, heavy animations, responsive, deployable (Vercel/Netlify), GitHub folder = team number.

## Architecture
- Frontend-only delivery per user decision ("I will do the backend work myself"): React 19 + Tailwind + framer-motion + lenis smooth scroll. Design: void-black (#030712) + neon cyan (#00F0FF), Unbounded / IBM Plex Sans / JetBrains Mono.
- Demo pipeline runs client-side in `/app/frontend/src/lib/pipeline.js` — deterministic 5-agent logic (stage-dwell vs 90-day average, deadline pressure, stage breach history → score; WATCH ≥45 / CRITICAL ≥70; priority = risk × impact; action mapping escalate/reassign/add-resource) so the static build is fully standalone for Round 3 deployment. Same logic is intended to be mirrored in the user's own backend later.
- Backend (FastAPI/MongoDB) untouched — owned by the user's team.

## User Personas
- SLA ops leads / grievance officers evaluating the product
- Hackathon judges assessing Round 3 rubric (functional, responsive, animated, live demo)

## Implemented (2026-08-22)
- Kinetic hero: masked line-by-line reveal, mouse-parallax 3D console frame, floating alert chips, count-up stats
- Editorial slow marquee, numbered manifesto chapters (problem/shift/trust)
- AgentFlow: orchestrator node with pulse rings, 5 agent cards, animated dashed connectors, two-tier calibration strip
- Live demo widget: 6 department icon selectors, 12-request mock dataset, scan/scramble state, streaming agent terminal log, animated SVG risk gauge, WATCH/CRITICAL badge, priority rank, typewriter root-cause brief, drafted escalation with mock approve action (toast)
- Services bento grid, trackers-vs-DelayGuard comparison table, product showcase with scroll parallax, testimonial marquee, roadmap timeline, 3-tier pricing, Radix FAQ accordion
- Mock login + signup pages (glass, dept icon picker, sonner toasts, redirect home) — AUTH IS MOCKED, no real accounts
- Lenis momentum scrolling, global grain overlay, data-testids on all interactive elements

## Backlog
- P0 (user-owned): real FastAPI agent pipeline + dataset ingestion; wire demo widget to `/api/*`
- P1: real auth (JWT), GitHub push with team-number folder, Vercel/Netlify deploy
- P2: dashboard route (ops console) behind login, CSV upload intake, LLM-drafted escalations

## Next Tasks
1. Mirror `pipeline.js` logic in FastAPI endpoints and swap demo widget to live API
2. Add real JWT auth if Round 4 requires accounts
3. Push to GitHub under team-number folder; deploy static build
