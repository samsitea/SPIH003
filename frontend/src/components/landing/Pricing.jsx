import { Link } from "react-router-dom";
import { Check, Zap } from "lucide-react";
import { SectionHeading, Reveal, cn } from "./shared";

const PLANS = [
    {
        name: "Ward Pilot",
        price: "₹0",
        per: "90-day pilot",
        desc: "For a single ward or office proving the value.",
        features: ["Up to 500 open requests", "Full 5-agent pipeline", "CSV upload intake", "Watch + Critical tiers", "Community support"],
        cta: "Start the pilot",
        hot: false,
    },
    {
        name: "Department",
        price: "₹4,999",
        per: "per month",
        desc: "For one department running SLA ops daily.",
        features: ["Unlimited requests", "Ranked action queue", "Drafted escalations", "Bottleneck heatmaps", "False-alarm calibration report", "Priority support"],
        cta: "Deploy the Guardians",
        hot: true,
    },
    {
        name: "State / Enterprise",
        price: "Custom",
        per: "annual contract",
        desc: "For multi-department, multi-city rollouts.",
        features: ["Everything in Department", "API sync & SSO", "Self-tuning risk model", "Citizen status portal", "Dedicated success engineer", "On-prem option"],
        cta: "Talk to us",
        hot: false,
    },
];

export const Pricing = () => (
    <section id="pricing" className="relative py-28 lg:py-36 bg-slate-950/40 border-y border-white/5" data-testid="pricing-section">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
                overline="Payment plans"
                title={<>Costs less than <span className="text-slate-500">one missed SLA penalty</span></>}
                align="center"
                testid="pricing"
            />
            <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch">
                {PLANS.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.1} className="h-full">
                        <div
                            className={cn(
                                "relative h-full rounded-2xl p-8 flex flex-col border transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5",
                                p.hot
                                    ? "bg-slate-900/70 border-neon shadow-[0_0_36px_rgba(232,121,249,0.18)]"
                                    : "bg-slate-900/50 border-white/10 hover:border-white/25"
                            )}
                            data-testid={`plan-${p.name.toLowerCase().replace(/[\s/]+/g, "-")}`}
                        >
                            {p.hot && (
                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-neon text-black font-mono text-[10px] tracking-widest px-4 py-1.5 shadow-[0_0_20px_rgba(232,121,249,0.6)]">
                                    <Zap className="w-3 h-3" /> MOST DEPLOYED
                                </span>
                            )}
                            <h3 className="font-display text-lg tracking-tight">{p.name}</h3>
                            <p className="mt-2 text-sm text-slate-500">{p.desc}</p>
                            <div className="mt-6 flex items-baseline gap-2">
                                <span className="font-mono text-4xl text-slate-50">{p.price}</span>
                                <span className="font-mono text-[11px] text-slate-500">{p.per}</span>
                            </div>
                            <ul className="mt-8 space-y-3.5 flex-1">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className={cn("w-4 h-4 mt-0.5 shrink-0", p.hot ? "text-neon" : "text-slate-500")} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/signup"
                                className={cn(
                                    "mt-8 inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300",
                                    p.hot
                                        ? "bg-neon text-black hover:shadow-[0_0_26px_rgba(232,121,249,0.7)]"
                                        : "border border-white/20 text-slate-200 hover:border-neon hover:text-neon"
                                )}
                                data-testid={`plan-cta-${p.name.toLowerCase().replace(/[\s/]+/g, "-")}`}
                            >
                                {p.cta}
                            </Link>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
