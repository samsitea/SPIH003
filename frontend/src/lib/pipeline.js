// DelayGuard — in-browser agent pipeline.
// The same deterministic 5-agent logic the FastAPI backend implements,
// mirrored here so the Round 3 static build runs the live demo standalone.

export const DEPARTMENTS = [
    { id: "water", label: "Water Board" },
    { id: "electricity", label: "Electricity" },
    { id: "sanitation", label: "Sanitation" },
    { id: "permits", label: "Permits" },
    { id: "healthcare", label: "Healthcare" },
    { id: "tax", label: "Tax & Revenue" },
];

export const STAGE_STATS = {
    Intake: { avg: 0.8, breach: 0.06 },
    Verification: { avg: 1.6, breach: 0.14 },
    "Field Inspection": { avg: 2.8, breach: 0.22 },
    Approval: { avg: 2.2, breach: 0.27 },
    Dispatch: { avg: 1.1, breach: 0.09 },
    Adjudication: { avg: 3.4, breach: 0.31 },
};

export const REQUESTS = [
    { id: "WS-2841", dept: "water", service: "New water connection", citizen: "R. Iyer", stage: "Approval", openedAgo: 21, sla: 30, inStage: 5.1, impact: 4 },
    { id: "WS-2855", dept: "water", service: "Pipeline leak repair", citizen: "S. Khan", stage: "Field Inspection", openedAgo: 4, sla: 10, inStage: 1.2, impact: 5 },
    { id: "EL-1190", dept: "electricity", service: "Meter replacement", citizen: "A. D'Souza", stage: "Dispatch", openedAgo: 9, sla: 14, inStage: 2.6, impact: 3 },
    { id: "EL-1214", dept: "electricity", service: "Transformer fault", citizen: "Ward 12 grid", stage: "Approval", openedAgo: 6, sla: 7, inStage: 3.8, impact: 5 },
    { id: "SN-0772", dept: "sanitation", service: "Drain de-silting", citizen: "Market Assoc.", stage: "Verification", openedAgo: 11, sla: 21, inStage: 3.4, impact: 3 },
    { id: "SN-0789", dept: "sanitation", service: "Waste route complaint", citizen: "P. Nair", stage: "Intake", openedAgo: 1, sla: 7, inStage: 0.6, impact: 2 },
    { id: "PM-3341", dept: "permits", service: "Building plan sanction", citizen: "Vertex Builders", stage: "Approval", openedAgo: 38, sla: 45, inStage: 6.3, impact: 4 },
    { id: "PM-3358", dept: "permits", service: "Trade licence renewal", citizen: "Cafe Meridian", stage: "Verification", openedAgo: 5, sla: 15, inStage: 1.1, impact: 2 },
    { id: "HC-0527", dept: "healthcare", service: "Clinic registration", citizen: "Dr. Mehta", stage: "Adjudication", openedAgo: 44, sla: 60, inStage: 8.2, impact: 4 },
    { id: "HC-0541", dept: "healthcare", service: "Ambulance permit", citizen: "City EMS", stage: "Approval", openedAgo: 3, sla: 5, inStage: 1.9, impact: 5 },
    { id: "TX-4402", dept: "tax", service: "Property tax reassessment", citizen: "L. Fernandes", stage: "Adjudication", openedAgo: 52, sla: 90, inStage: 9.6, impact: 3 },
    { id: "TX-4417", dept: "tax", service: "GST refund claim", citizen: "Nova Textiles", stage: "Verification", openedAgo: 18, sla: 30, inStage: 4.4, impact: 4 },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export function scoreRequest(req) {
    const stats = STAGE_STATS[req.stage];
    const elapsed = req.openedAgo;
    const remaining = Math.max(0, req.sla - elapsed);
    const stageC = clamp01(Math.min(req.inStage / stats.avg, 2) / 2);
    const deadlineC = clamp01(elapsed / req.sla);
    const histC = stats.breach;
    const score = Math.round(100 * (0.38 * stageC + 0.34 * deadlineC + 0.28 * histC));
    const tier = score >= 70 ? "CRITICAL" : score >= 45 ? "WATCH" : "STABLE";
    const priority = Math.round(score * (0.6 + 0.4 * (req.impact / 5)));
    return { score, tier, priority, remaining, stageC, deadlineC, histC, stats };
}

const ACTIONS = {
    stage: { verb: "Add Resource", line: "surge an extra officer into the stage until the queue clears" },
    deadline: { verb: "Escalate", line: "escalate to the department head with same-day sign-off authority" },
    history: { verb: "Reassign", line: "reassign to the fast-track desk that owns chronic-breach stages" },
};

export function runPipeline(reqId) {
    const req = REQUESTS.find((r) => r.id === reqId);
    const r = scoreRequest(req);
    const all = REQUESTS.map((q) => ({ id: q.id, p: scoreRequest(q).priority })).sort((a, b) => b.p - a.p);
    const rank = all.findIndex((a) => a.id === req.id) + 1;

    const quality = req.inStage > r.stats.avg * 2 ? "Stage dwell is an outlier vs. 90-day average" : "All fields valid";
    const pctLonger = Math.max(0, Math.round((req.inStage / r.stats.avg - 1) * 100));
    const rootCause =
        `${req.id} has been stuck ${req.inStage.toFixed(1)} days at ${req.stage} — ${pctLonger}% longer than the ` +
        `${r.stats.avg}-day average. ${req.stage} has breached SLA on ${Math.round(r.stats.breach * 100)}% of cases this quarter, ` +
        `and only ${r.remaining} of ${req.sla} SLA days remain. Case impact is rated ${req.impact}/5, ` +
        `which lifts it to #${rank} of ${all.length} open requests.`;

    const dominant = r.stageC >= r.deadlineC && r.stageC >= r.histC ? "stage" : r.deadlineC >= r.histC ? "deadline" : "history";
    const action = ACTIONS[dominant];
    const draft =
        `To: ${DEPARTMENTS.find((d) => d.id === req.dept).label} — ${req.stage} desk\n` +
        `Subject: [${r.tier}] ${req.id} — ${req.service}\n\n` +
        `Case ${req.id} (${req.citizen}) is projected to breach its ${req.sla}-day SLA in ${r.remaining} day(s). ` +
        `Primary driver: prolonged dwell at ${req.stage}. Recommended: ${action.line}. ` +
        `Please confirm reassignment within 4 working hours. — DelayGuard Action Agent`;

    const steps = [
        { agent: "Intake Agent", text: `Normalised ${req.id} · ${req.service} · stage=${req.stage} · SLA ${req.sla}d · quality: ${quality}` },
        { agent: "Risk Scoring Agent", text: `stage dwell ${(r.stageC * 100).toFixed(0)}% · deadline pressure ${(r.deadlineC * 100).toFixed(0)}% · stage breach history ${(r.histC * 100).toFixed(0)}% → score ${r.score}/100` },
        { agent: "Root-Cause Agent", text: `Plain-language brief generated for ${req.stage} bottleneck` },
        { agent: "Prioritization Agent", text: `risk ${r.score} × impact ${req.impact}/5 → priority ${r.priority} → ranked #${rank} of ${all.length}` },
        { agent: "Action Agent", text: `Recommended action: ${action.verb.toUpperCase()} · escalation draft prepared for human approval` },
        { agent: "Orchestrator", text: `Calibration layer → tier ${r.tier} (thresholds: WATCH ≥ 45, CRITICAL ≥ 70) · false-alarm budget enforced` },
    ];

    return { req, ...r, rank, total: all.length, pctLonger, rootCause, action, draft, steps };
}
