import { Radar, MessageSquareText, ListOrdered, DraftingCompass, Flame, BellRing } from "lucide-react";
import { SectionHeading, Reveal } from "./shared";

const SERVICES = [
    { icon: Radar, title: "Predictive risk scoring", desc: "Hybrid rule + ML scoring on dwell time, deadline pressure and stage history — computed per pending request, refreshed continuously.", span: "lg:col-span-4" },
    { icon: MessageSquareText, title: "Plain-language root cause", desc: "Not a number — a sentence your team can act on. 'Stuck 5.1 days at Approval, 132% longer than average.'", span: "lg:col-span-2" },
    { icon: ListOrdered, title: "Ranked action queue", desc: "Risk × case impact decides the order. The transformer fault outranks the licence renewal — automatically.", span: "lg:col-span-2" },
    { icon: DraftingCompass, title: "Drafted escalations", desc: "Escalate, reassign, add resource, prioritise — the Action Agent writes the message, a human approves it.", span: "lg:col-span-2" },
    { icon: Flame, title: "Bottleneck heatmaps", desc: "See which stage and department is quietly accumulating delay, quarter over quarter.", span: "lg:col-span-2" },
    { icon: BellRing, title: "Early-warning tiers", desc: "Watch vs. Critical, calibrated against a false-alarm budget — so the day it says Critical, people move.", span: "lg:col-span-4" },
];

export const Services = () => (
    <section id="services" className="relative py-28 lg:py-36" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
                overline="Services"
                title={<>What the Guardians <span className="text-slate-500">do for you</span></>}
                sub="From the first record to the approved fix — each capability is owned by one accountable agent."
                testid="services"
            />
            <div className="mt-16 grid lg:grid-cols-6 gap-5">
                {SERVICES.map((s, i) => (
                    <Reveal key={s.title} delay={i * 0.07} className={s.span}>
                        <div
                            className="group relative h-full bg-slate-900/50 border border-white/10 rounded-2xl p-7 overflow-hidden hover:-translate-y-1.5 hover:border-neon/50 hover:shadow-[0_0_24px_rgba(0,240,255,0.14)] transition-[transform,border-color,box-shadow] duration-300"
                            data-testid={`service-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <div className="absolute -top-16 -right-16 w-40 h-40 bg-neon/5 rounded-full blur-2xl group-hover:bg-neon/15 transition-colors duration-500" />
                            <s.icon className="w-7 h-7 text-neon" />
                            <h3 className="font-display mt-5 text-lg tracking-tight text-slate-100">{s.title}</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
