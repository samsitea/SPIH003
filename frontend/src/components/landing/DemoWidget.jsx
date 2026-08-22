import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
    Droplets, Zap, Trash2, FileText, Activity, Landmark,
    Play, RotateCcw, TerminalSquare, ShieldCheck, Send,
} from "lucide-react";
import { DEPARTMENTS, REQUESTS, runPipeline } from "../../lib/pipeline";
import { SectionHeading, Reveal, cn, EASE } from "./shared";

const DEPT_ICONS = { water: Droplets, electricity: Zap, sanitation: Trash2, permits: FileText, healthcare: Activity, tax: Landmark };
const GLYPHS = "01<>/#$%&@Δ∑";

const TIER_STYLE = {
    CRITICAL: "border-critical/50 bg-critical/10 text-critical",
    WATCH: "border-watch/50 bg-watch/10 text-watch",
    STABLE: "border-neon/50 bg-neon/10 text-neon",
};
const TIER_HEX = { CRITICAL: "#FF3366", WATCH: "#FFD600", STABLE: "#E879F9" };

const Gauge = ({ score, tier }) => {
    const R = 52;
    const C = 2 * Math.PI * R;
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let raf;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min(1, (t - start) / 1300);
            setDisplay(Math.round(score * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [score]);
    return (
        <div className="relative w-32 h-32" data-testid="risk-gauge">
            <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                <motion.circle
                    cx="64" cy="64" r={R} fill="none"
                    stroke={TIER_HEX[tier]} strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    animate={{ strokeDashoffset: C * (1 - score / 100) }}
                    transition={{ duration: 1.3, ease: EASE }}
                    style={{ filter: `drop-shadow(0 0 8px ${TIER_HEX[tier]})` }}
                />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                    <div className="font-mono text-3xl font-medium" style={{ color: TIER_HEX[tier] }}>{display}</div>
                    <div className="font-mono text-[9px] tracking-widest text-slate-500">RISK / 100</div>
                </div>
            </div>
        </div>
    );
};

const Typewriter = ({ text, speed = 14 }) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        setN(0);
        const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 2)), speed);
        return () => clearInterval(id);
    }, [text, speed]);
    return <p className={cn("text-sm text-slate-300 leading-relaxed", n < text.length && "caret")} data-testid="root-cause-text">{text.slice(0, n)}</p>;
};

export const DemoWidget = () => {
    const [dept, setDept] = useState("water");
    const deptRequests = REQUESTS.filter((r) => r.dept === dept);
    const [reqId, setReqId] = useState(deptRequests[0].id);
    const [phase, setPhase] = useState("idle");
    const [scramble, setScramble] = useState("");
    const [log, setLog] = useState([]);
    const [result, setResult] = useState(null);
    const timers = useRef([]);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const pickDept = (d) => {
        setDept(d);
        setReqId(REQUESTS.find((r) => r.dept === d).id);
        reset();
    };
    const reset = () => {
        timers.current.forEach(clearTimeout);
        setPhase("idle"); setLog([]); setResult(null);
    };

    const run = () => {
        reset();
        setPhase("scanning");
        const scan = setInterval(() => {
            setScramble(Array.from({ length: 34 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(""));
        }, 50);
        const out = runPipeline(reqId);
        timers.current.push(setTimeout(() => {
            clearInterval(scan);
            setPhase("running");
            out.steps.forEach((s, i) => {
                timers.current.push(setTimeout(() => {
                    setLog((l) => [...l, s]);
                    if (i === out.steps.length - 1) {
                        timers.current.push(setTimeout(() => { setResult(out); setPhase("done"); }, 500));
                    }
                }, 420 * (i + 1)));
            });
        }, 1000));
    };

    return (
        <section id="demo" className="relative py-28 lg:py-36" data-testid="demo-section">
            <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-neon/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-6">
                <SectionHeading
                    overline="Make it real"
                    title={<>This isn't a screenshot. <span className="text-slate-500">Run the Guardians.</span></>}
                    sub="Pick a department, choose a live request, and watch all five agents score, explain, rank and draft — the full pipeline, end to end."
                    testid="demo"
                />

                <div className="mt-16 grid lg:grid-cols-12 gap-8">
                    <Reveal className="lg:col-span-4">
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">01 · Choose a department</p>
                            <div className="mt-4 grid grid-cols-3 gap-3" data-testid="dept-selector">
                                {DEPARTMENTS.map((d) => {
                                    const Icon = DEPT_ICONS[d.id];
                                    return (
                                        <button
                                            key={d.id}
                                            onClick={() => pickDept(d.id)}
                                            className={cn(
                                                "rounded-xl border p-3.5 flex flex-col items-center gap-2 transition-[border-color,background-color,box-shadow] duration-300",
                                                dept === d.id
                                                    ? "border-neon bg-neon/10 shadow-[0_0_16px_rgba(232,121,249,0.25)]"
                                                    : "border-white/10 hover:border-neon/40 bg-white/[0.02]"
                                            )}
                                            data-testid={`dept-${d.id}-btn`}
                                        >
                                            <Icon className={cn("w-5 h-5", dept === d.id ? "text-neon" : "text-slate-400")} />
                                            <span className="text-[10px] text-slate-400 leading-tight text-center">{d.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase mt-8">02 · Choose a request</p>
                            <div className="mt-4 space-y-2.5">
                                {deptRequests.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => { setReqId(r.id); reset(); }}
                                        className={cn(
                                            "w-full text-left rounded-xl border px-4 py-3 transition-[border-color,background-color] duration-300",
                                            reqId === r.id ? "border-neon/60 bg-neon/5" : "border-white/10 hover:border-white/25"
                                        )}
                                        data-testid={`request-${r.id}-btn`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xs text-neon">{r.id}</span>
                                            <span className="font-mono text-[10px] text-slate-500">SLA {r.sla}d</span>
                                        </div>
                                        <div className="mt-1 text-sm text-slate-300">{r.service}</div>
                                        <div className="text-[11px] text-slate-500">at {r.stage} · {r.inStage}d in stage</div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={run}
                                disabled={phase === "scanning" || phase === "running"}
                                className="mt-8 w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-neon text-black font-semibold px-6 py-3.5 hover:shadow-[0_0_26px_rgba(232,121,249,0.7)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                data-testid="run-demo-btn"
                            >
                                <Play className="w-4 h-4" />
                                {phase === "scanning" || phase === "running" ? "Agents working…" : "Run the Guardians"}
                            </button>
                        </div>
                    </Reveal>

                    <Reveal className="lg:col-span-8" delay={0.12}>
                        <div className="relative glass rounded-2xl overflow-hidden h-full min-h-[560px] flex flex-col" data-testid="demo-terminal">
                            {phase === "scanning" && (
                                <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-neon/20 to-transparent animate-scanline pointer-events-none" />
                            )}
                            <div className="flex items-center gap-1.5 px-5 py-4 border-b border-white/10">
                                <span className="w-2.5 h-2.5 rounded-full bg-critical/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-watch/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-neon/80" />
                                <span className="ml-3 font-mono text-[10px] tracking-widest text-slate-500 flex items-center gap-2">
                                    <TerminalSquare className="w-3.5 h-3.5" /> DELAYGUARD PIPELINE — {reqId}
                                </span>
                            </div>

                            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto">
                                {phase === "idle" && (
                                    <div className="h-full grid place-items-center text-center text-slate-600">
                                        <div>
                                            <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-slate-700" />
                                            <p className="tracking-widest">PIPELINE IDLE — SELECT A REQUEST AND RUN</p>
                                        </div>
                                    </div>
                                )}
                                {phase === "scanning" && (
                                    <div className="space-y-3">
                                        <p className="text-neon">$ delayguard scan --request {reqId}</p>
                                        <p className="text-slate-500 break-all">{scramble}</p>
                                        <p className="text-slate-500 break-all opacity-60">{scramble}</p>
                                    </div>
                                )}
                                {(phase === "running" || phase === "done") && (
                                    <div className="space-y-3.5">
                                        <p className="text-neon">$ delayguard run --pipeline full --request {reqId}</p>
                                        {log.map((s, i) => (
                                            <motion.p key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="text-slate-400">
                                                <span className="text-neon">[{s.agent}]</span> {s.text}
                                            </motion.p>
                                        ))}
                                        {phase === "running" && <p className="text-neon animate-pulse">▍</p>}
                                    </div>
                                )}
                            </div>

                            <AnimatePresence>
                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: EASE }}
                                        className="border-t border-white/10 bg-slate-950/70 p-6"
                                        data-testid="demo-result"
                                    >
                                        <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-start">
                                            <div className="flex sm:flex-col items-center gap-4">
                                                <Gauge score={result.score} tier={result.tier} />
                                                <span className={cn("rounded-full border px-4 py-1.5 font-mono text-xs tracking-widest", TIER_STYLE[result.tier])} data-testid="tier-badge">
                                                    {result.tier}
                                                </span>
                                            </div>
                                            <div className="space-y-5">
                                                <div className="flex flex-wrap gap-3 font-mono text-[11px]">
                                                    <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-300" data-testid="priority-rank">
                                                        PRIORITY <span className="text-neon">#{result.rank}</span> of {result.total} open
                                                    </span>
                                                    <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-300">
                                                        ACTION <span className="text-neon">{result.action.verb.toUpperCase()}</span>
                                                    </span>
                                                    <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-300">
                                                        {result.remaining} SLA DAYS LEFT
                                                    </span>
                                                </div>
                                                <div className="font-sans">
                                                    <p className="font-mono text-[10px] tracking-[0.3em] text-slate-500 mb-2">ROOT-CAUSE AGENT — PLAIN LANGUAGE BRIEF</p>
                                                    <Typewriter text={result.rootCause} />
                                                </div>
                                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4" data-testid="action-draft">
                                                    <p className="font-mono text-[10px] tracking-[0.3em] text-slate-500 mb-2">ACTION AGENT — DRAFTED, AWAITING HUMAN APPROVAL</p>
                                                    <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-400 leading-relaxed">{result.draft}</pre>
                                                    <button
                                                        onClick={() => toast.success("Escalation queued for approval", { description: "Demo build — no message is actually sent." })}
                                                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-neon text-neon text-xs px-5 py-2.5 hover:bg-neon hover:text-black transition-colors duration-300"
                                                        data-testid="approve-escalation-btn"
                                                    >
                                                        <Send className="w-3.5 h-3.5" /> Approve & send
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>

                <Reveal className="mt-8 flex justify-center">
                    <button onClick={reset} className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-neon transition-colors" data-testid="reset-demo-btn">
                        <RotateCcw className="w-3.5 h-3.5" /> reset console
                    </button>
                </Reveal>
            </div>
        </section>
    );
};
