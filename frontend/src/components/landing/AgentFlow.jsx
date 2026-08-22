import { motion } from "framer-motion";
import { ScanSearch, Gauge, FileSearch, ListOrdered, Send, Orbit } from "lucide-react";
import { SectionHeading, Reveal } from "./shared";

const AGENTS = [
    { n: "1", name: "Intake", icon: ScanSearch, desc: "Normalises request records, flags dirty data" },
    { n: "2", name: "Risk Scoring", icon: Gauge, desc: "Dwell vs. average, deadline pressure, breach history" },
    { n: "3", name: "Root-Cause", icon: FileSearch, desc: "Turns score components into a plain-language why" },
    { n: "4", name: "Prioritization", icon: ListOrdered, desc: "Ranks by risk × case impact, not raw score" },
    { n: "5", name: "Action", icon: Send, desc: "Drafts escalate / reassign / add-resource for approval" },
];

export const AgentFlow = () => (
    <section id="agents" className="relative py-28 lg:py-36 bg-slate-950/40 border-y border-white/5 overflow-hidden" data-testid="agents-section">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-neon/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
            <SectionHeading
                overline="The architecture"
                title={<>Five agents. One orchestrator. <span className="text-slate-500">Zero unexplained alerts.</span></>}
                sub="Each agent owns a single step a human SLA analyst would take, then hands off to the next. Every decision is traceable to a specific reason."
                testid="agents"
            />

            <Reveal className="mt-20 flex justify-center">
                <div className="relative" data-testid="orchestrator-node">
                    <span className="absolute inset-0 rounded-2xl border border-neon/40 animate-pulse-ring" />
                    <div className="glass rounded-2xl px-8 py-5 flex items-center gap-4">
                        <Orbit className="w-7 h-7 text-neon animate-spin-slow" />
                        <div>
                            <p className="font-display text-sm tracking-tight">Orchestrator</p>
                            <p className="font-mono text-[10px] text-slate-500 tracking-wider mt-0.5">CALIBRATION · WATCH ≥ 45 · CRITICAL ≥ 70</p>
                        </div>
                    </div>
                </div>
            </Reveal>

            <div className="mt-6 hidden lg:flex justify-center">
                <svg width="900" height="60" viewBox="0 0 900 60" fill="none" className="text-neon/40">
                    {[90, 270, 450, 630, 810].map((x) => (
                        <path key={x} d={`M450 0 C 450 40, ${x} 20, ${x} 60`} stroke="currentColor" strokeWidth="1" strokeDasharray="5 6" className="animate-dash-flow" />
                    ))}
                </svg>
            </div>

            <div className="mt-4 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" data-testid="agent-nodes">
                {AGENTS.map((a, i) => (
                    <Reveal key={a.n} delay={0.1 + i * 0.1}>
                        <div
                            className="group relative bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full hover:-translate-y-1.5 hover:border-neon/50 hover:shadow-[0_0_24px_rgba(0,229,160,0.15)] transition-[transform,border-color,box-shadow] duration-300"
                            data-testid={`agent-card-${a.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="grid place-items-center w-11 h-11 rounded-xl border border-neon/30 bg-neon/10 group-hover:bg-neon/20 transition-colors duration-300">
                                    <a.icon className="w-5 h-5 text-neon" />
                                </span>
                                <span className="font-mono text-xs text-slate-600">0{a.n}</span>
                            </div>
                            <h3 className="font-display mt-5 text-base tracking-tight text-slate-100">{a.name} Agent</h3>
                            <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">{a.desc}</p>
                            {i < AGENTS.length - 1 && (
                                <motion.span
                                    className="hidden lg:block absolute top-1/2 -right-[22px] w-4 h-[2px] bg-neon/60 z-10"
                                    animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                                />
                            )}
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-14" delay={0.2}>
                <div className="glass rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-mono text-xs" data-testid="calibration-strip">
                    <span className="text-slate-500 tracking-widest">TWO-TIER ALERTS</span>
                    <span className="flex items-center gap-2 text-watch"><span className="w-2 h-2 rounded-full bg-watch animate-pulse" /> WATCH — monitor this week</span>
                    <span className="flex items-center gap-2 text-critical"><span className="w-2 h-2 rounded-full bg-critical animate-pulse" /> CRITICAL — act today</span>
                    <span className="text-slate-500">false-alarm budget: <span className="text-neon">&lt; 12%</span> on validation set</span>
                </div>
            </Reveal>
        </div>
    </section>
);
