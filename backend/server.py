from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---------------------------------------------------------------------------
# MOCK DATASET — stand-in for real historical service-request data.
# Each record represents one pending request currently sitting in a stage.
# ---------------------------------------------------------------------------
MOCK_REQUESTS = [
    {
        "id": "REQ-4821",
        "type": "Municipal Permit Renewal",
        "department": "Zoning",
        "stage": "Approval",
        "hours_in_stage": 76.8,          # 3.2 days
        "stage_avg_hours": 26.4,         # 1.1 days average for this stage
        "hours_remaining": -4.0,         # already past deadline
        "sla_total_hours": 96.0,
        "stage_breach_rate": 0.27,       # this stage breaches 27% of the time
        "priority_weight": 4,            # 1 (low) - 5 (high impact)
    },
    {
        "id": "REQ-4790",
        "type": "Records Verification",
        "department": "Records",
        "stage": "Verification",
        "hours_in_stage": 30.0,
        "stage_avg_hours": 20.0,
        "hours_remaining": 28.0,
        "sla_total_hours": 72.0,
        "stage_breach_rate": 0.14,
        "priority_weight": 2,
    },
    {
        "id": "REQ-4801",
        "type": "Grant Disbursement",
        "department": "Finance",
        "stage": "Disbursement",
        "hours_in_stage": 40.0,
        "stage_avg_hours": 18.0,
        "hours_remaining": 11.0,
        "sla_total_hours": 72.0,
        "stage_breach_rate": 0.31,
        "priority_weight": 5,
    },
    {
        "id": "REQ-4756",
        "type": "Business License Review",
        "department": "Licensing",
        "stage": "Review",
        "hours_in_stage": 12.0,
        "stage_avg_hours": 16.0,
        "hours_remaining": 74.0,
        "sla_total_hours": 96.0,
        "stage_breach_rate": 0.08,
        "priority_weight": 3,
    },
    {
        "id": "REQ-4699",
        "type": "Zoning Intake",
        "department": "Zoning",
        "stage": "Intake",
        "hours_in_stage": 4.0,
        "stage_avg_hours": 10.0,
        "hours_remaining": 90.0,
        "sla_total_hours": 96.0,
        "stage_breach_rate": 0.05,
        "priority_weight": 1,
    },
]


# ---------------------------------------------------------------------------
# AGENT PIPELINE — each function owns one step, mirroring a human analyst.
# ---------------------------------------------------------------------------

def risk_scoring_agent(r):
    """Combine stage overrun, deadline proximity, and historical breach rate."""
    time_ratio = r["hours_in_stage"] / r["stage_avg_hours"]
    time_component = min(time_ratio / 3, 1.0)  # cap at 3x average = maxed out

    urgency_component = 1 - (r["hours_remaining"] / r["sla_total_hours"])
    urgency_component = max(0.0, min(urgency_component, 1.0))

    breach_component = r["stage_breach_rate"]

    score = 100 * (0.4 * time_component + 0.4 * urgency_component + 0.2 * breach_component)
    return round(min(score, 100), 1), round(time_ratio, 2)


def root_cause_agent(r, score, time_ratio):
    """Turn the score components into a plain-language explanation."""
    return (
        f"Stuck at {r['stage']} for {r['hours_in_stage']/24:.1f} days, "
        f"{time_ratio:.1f}x this stage's average. "
        f"{r['department']} {r['stage']} has breached SLA in "
        f"{int(r['stage_breach_rate']*100)}% of past cases."
    )


def tier_for(score):
    if score >= 75:
        return "critical"
    if score >= 45:
        return "watch"
    return "stable"


def action_agent(r, score, tier):
    """Recommend and draft an action based on risk tier and breach history."""
    if tier == "critical" and r["stage_breach_rate"] >= 0.2:
        return f"Escalate to {r['department']} department lead — recurring bottleneck stage."
    if tier == "critical":
        return f"Reassign {r['id']} to an available team member in {r['department']}."
    if tier == "watch":
        return f"Add to priority queue — monitor {r['stage']} stage closely."
    return "No action needed — on track."


def run_pipeline(requests):
    results = []
    for r in requests:
        score, time_ratio = risk_scoring_agent(r)
        tier = tier_for(score)
        explanation = root_cause_agent(r, score, time_ratio)
        action = action_agent(r, score, tier)
        results.append({
            "id": r["id"],
            "type": r["type"],
            "department": r["department"],
            "stage": r["stage"],
            "risk_score": score,
            "tier": tier,
            "explanation": explanation,
            "recommended_action": action,
            "priority_weight": r["priority_weight"],
            "priority_value": round(score * r["priority_weight"], 1),
        })
    # Prioritization agent: rank by risk combined with case impact, not risk alone
    results.sort(key=lambda x: x["priority_value"], reverse=True)
    for i, r in enumerate(results, start=1):
        r["rank"] = i
    return results


# ---------------------------------------------------------------------------
# ROUTES
# ---------------------------------------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "SLA Guardian API is running"}


@api_router.get("/requests")
async def get_scored_requests():
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "results": run_pipeline(MOCK_REQUESTS),
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)