import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { SectionHeading, Reveal } from "./shared";

const FAQS = [
    { q: "Do we need a trained ML model or years of historical data?", a: "No. DelayGuard starts rule-based and fully explainable — stage dwell vs. average, deadline pressure, and that stage's breach rate. A spreadsheet of past requests is enough to begin; the model self-tunes as outcomes accumulate." },
    { q: "How is this different from the SLA tracker we already have?", a: "Trackers report breaches after they happen. DelayGuard predicts them days early, names the exact stage and department responsible, explains the why in plain language, and drafts the fix — ranked by true urgency, not just a raw score." },
    { q: "Won't staff stop trusting it if it raises false alarms?", a: "That's exactly what the Orchestrator's calibration layer is for. Alerts ship in two tiers — Watch and Critical — with thresholds tuned against a false-alarm budget. On our validation set, Critical stays under a 12% false-positive rate, so when it says act today, people act." },
    { q: "Does the AI act on its own?", a: "Never. The Action Agent drafts the escalation, reassignment, or resource request — a human approves, edits, or rejects it. Every decision stays traceable to a specific agent and a specific reason." },
    { q: "What data do we need to provide?", a: "Five fields per request: request time, SLA deadline, current stage, department, and past delay history. CSV upload works today; direct API sync with existing ticketing systems is shipping next." },
    { q: "Who is DelayGuard built for?", a: "Government offices, municipal corporations, utilities, and any large organisation with citizen or customer service commitments — anywhere deadlines are tracked by hand and breaches are discovered too late." },
];

export const FAQ = () => (
    <section id="faq" className="relative py-28 lg:py-36" data-testid="faq-section">
        <div className="max-w-3xl mx-auto px-6">
            <SectionHeading
                overline="FAQ"
                title={<>Asked by every <span className="text-slate-500">ops lead we meet</span></>}
                align="center"
                testid="faq"
            />
            <Reveal className="mt-14">
                <Accordion.Root type="single" collapsible className="border-t border-white/10" data-testid="faq-accordion">
                    {FAQS.map((f, i) => (
                        <Accordion.Item key={i} value={`item-${i}`} className="border-b border-white/10">
                            <Accordion.Trigger
                                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-base md:text-lg text-slate-200 hover:text-neon transition-colors duration-300 [&[data-state=open]>span.icon]:rotate-45"
                                data-testid={`faq-question-${i}`}
                            >
                                {f.q}
                                <span className="icon grid place-items-center w-8 h-8 rounded-full border border-white/15 shrink-0 transition-transform duration-300 group-hover:border-neon/50">
                                    <Plus className="w-4 h-4" />
                                </span>
                            </Accordion.Trigger>
                            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                <p className="pb-7 pr-12 text-sm md:text-base text-slate-400 leading-relaxed" data-testid={`faq-answer-${i}`}>{f.a}</p>
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Reveal>
        </div>
    </section>
);
