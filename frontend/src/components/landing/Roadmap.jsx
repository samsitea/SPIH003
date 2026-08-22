import { MailCheck, PlugZap, BrainCircuit, Globe2, MessageCircle } from "lucide-react";
import { SectionHeading, Reveal } from "./shared";

const PHASES = [
    { tag: "SHIPPING NEXT", icon: MailCheck, title: "Automated email dispatch", desc: "Approved escalation drafts send themselves — with full audit trail of who approved what, when." },
    { tag: "IN DEVELOPMENT", icon: PlugZap, title: "Cross-department API sync", desc: "Direct connectors to existing grievance and ticketing systems. No more CSV exports on a Friday." },
    { tag: "IN DEVELOPMENT", icon: BrainCircuit, title: "Self-tuning risk model", desc: "Rule weights retrain on live outcomes — every resolved case makes the next prediction sharper." },
    { tag: "EXPLORING", icon: Globe2, title: "Citizen-facing status portal", desc: "Let applicants see honest, agent-written ETAs instead of calling the office twice a week." },
    { tag: "EXPLORING", icon: MessageCircle, title: "WhatsApp & SMS alerts", desc: "Watch and Critical pings delivered where field officers actually look — their phones." },
];

export const Roadmap = () => (
    <section id="roadmap" className="relative py-28 lg:py-36" data-testid="roadmap-section">
        <div className="max-w-4xl mx-auto px-6">
            <SectionHeading
                overline="Features in development"
                title={<>Where the Guardians <span className="text-slate-500">go next</span></>}
                testid="roadmap"
            />
            <div className="mt-16 relative">
                <span className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-neon/60 via-white/10 to-transparent" />
                {PHASES.map((p, i) => (
                    <Reveal key={p.title} delay={i * 0.08}>
                        <div className="relative flex gap-6 pb-12 last:pb-0" data-testid={`roadmap-${p.title.toLowerCase().replace(/\s+/g, "-")}`}>
                            <span className="relative z-10 grid place-items-center w-10 h-10 rounded-full border border-neon/40 bg-void shrink-0">
                                <p.icon className="w-4 h-4 text-neon" />
                            </span>
                            <div className="pt-1.5">
                                <span className="font-mono text-[10px] tracking-[0.3em] text-neon/80">{p.tag}</span>
                                <h3 className="font-display mt-2 text-lg tracking-tight text-slate-100">{p.title}</h3>
                                <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-xl">{p.desc}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
