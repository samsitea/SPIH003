import { Check, X } from "lucide-react";
import { SectionHeading, Reveal } from "./shared";

const ROWS = [
    { label: "Tells you a breach happened", tracker: true, dg: true },
    { label: "Predicts the breach days early", tracker: false, dg: true },
    { label: "Names the exact stage & department at fault", tracker: false, dg: true },
    { label: "Explains every flag in plain language", tracker: false, dg: true },
    { label: "Ranks by urgency, not just risk score", tracker: false, dg: true },
    { label: "Drafts the escalation for one-click approval", tracker: false, dg: true },
    { label: "Calibrated alerts with a false-alarm budget", tracker: false, dg: true },
];

export const WhyUs = () => (
    <section id="why" className="relative py-28 lg:py-36 bg-slate-950/40 border-y border-white/5" data-testid="why-section">
        <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
                overline="Why choose us"
                title={<>Trackers write the obituary. <span className="text-slate-500">DelayGuard calls the ambulance.</span></>}
                testid="why"
            />
            <Reveal className="mt-16">
                <div className="glass rounded-2xl overflow-hidden" data-testid="comparison-table">
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 md:px-8 py-5 border-b border-white/10 font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">
                        <span>Capability</span>
                        <span className="w-20 md:w-28 text-center">Trackers</span>
                        <span className="w-20 md:w-28 text-center text-neon">DelayGuard</span>
                    </div>
                    {ROWS.map((r, i) => (
                        <Reveal key={r.label} delay={i * 0.05} y={20}>
                            <div className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 md:px-8 py-4 ${i < ROWS.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors duration-300`} data-testid={`compare-row-${i}`}>
                                <span className="text-sm md:text-base text-slate-300">{r.label}</span>
                                <span className="w-20 md:w-28 flex justify-center">
                                    {r.tracker ? <Check className="w-4 h-4 text-slate-500" /> : <X className="w-4 h-4 text-slate-700" />}
                                </span>
                                <span className="w-20 md:w-28 flex justify-center">
                                    <span className="grid place-items-center w-7 h-7 rounded-full bg-neon/10 border border-neon/40">
                                        <Check className="w-4 h-4 text-neon" />
                                    </span>
                                </span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
);
