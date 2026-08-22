import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Radar, AlertTriangle, Eye } from "lucide-react";
import { CountUp, EASE, scrollToId } from "./shared";

const LINES = ["Every SLA breach", "is visible", "days in advance."];

const PARTICLES = [
    { left: "6%", top: "22%", delay: "0s", dur: "8s" },
    { left: "14%", top: "64%", delay: "1.2s", dur: "10s" },
    { left: "23%", top: "38%", delay: "0.6s", dur: "9s" },
    { left: "31%", top: "78%", delay: "2s", dur: "11s" },
    { left: "42%", top: "18%", delay: "0.9s", dur: "8.5s" },
    { left: "50%", top: "58%", delay: "1.7s", dur: "10.5s" },
    { left: "58%", top: "30%", delay: "0.3s", dur: "9.5s" },
    { left: "66%", top: "70%", delay: "2.4s", dur: "12s" },
    { left: "74%", top: "20%", delay: "1.1s", dur: "8s" },
    { left: "82%", top: "52%", delay: "0.5s", dur: "10s" },
    { left: "90%", top: "76%", delay: "1.9s", dur: "9s" },
    { left: "95%", top: "34%", delay: "2.8s", dur: "11s" },
];

const MaskedLine = ({ text, delay, accent }) => (
    <span className="block overflow-hidden pb-1 -mb-1">
        <motion.span
            className={`block ${accent ? "text-neon text-glow" : "text-slate-50"}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay, ease: EASE }}
        >
            {text}
        </motion.span>
    </span>
);

const STATS = [
    { to: 84, suffix: "%", label: "breaches intercepted in pilot" },
    { to: 5, suffix: "", label: "specialised agents per case" },
    { to: 2, suffix: "", label: "calibrated alert tiers" },
    { to: 3, suffix: "s", label: "from raw record to action", prefix: "<" },
];

export const Hero = () => {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 70, damping: 18 });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 70, damping: 18 });

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };

    return (
        <section id="top" ref={ref} onMouseMove={onMove} className="relative min-h-screen grid-bg overflow-hidden pt-[72px]" data-testid="hero-section">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-40 left-1/4 w-[560px] h-[560px] rounded-full bg-neon/10 blur-[140px] animate-drift-a" />
                <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-emerald-600/10 blur-[120px] animate-drift-b" />
                <div className="absolute top-1/3 -left-24 w-[380px] h-[380px] rounded-full bg-neon/5 blur-[110px] animate-drift-c" />
                {PARTICLES.map((p, i) => (
                    <span key={i} className="hero-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur }} />
                ))}
                <div className="hero-beam" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7">
                    <h1 className="font-display mt-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tighter leading-[1.04]" data-testid="hero-heading">
                        <MaskedLine text={LINES[0]} delay={0.25} />
                        <MaskedLine text={LINES[1]} delay={0.38} />
                        <MaskedLine text={LINES[2]} delay={0.51} accent />
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
                        className="mt-8 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed"
                        data-testid="hero-subtitle"
                    >
                        DelayGuard fields a team of five AI agents that watch every pending service request,
                        name the exact stage causing the hold-up, explain the risk in plain language, and
                        draft the fix — <span className="text-slate-200">before the deadline slips.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <button
                            onClick={() => scrollToId("#demo")}
                            className="group inline-flex items-center gap-2.5 rounded-full bg-neon text-black font-semibold px-7 py-3.5 hover:shadow-[0_0_30px_rgba(0,229,160,0.7)] transition-shadow duration-300"
                            data-testid="hero-run-demo-btn"
                        >
                            <Radar className="w-5 h-5" />
                            Run the live demo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scrollToId("#agents")}
                            className="rounded-full border border-neon/50 text-neon px-7 py-3.5 hover:bg-neon hover:text-black hover:shadow-[0_0_20px_rgba(0,229,160,0.6)] transition-colors duration-300"
                            data-testid="hero-meet-agents-btn"
                        >
                            Meet the agents
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.15 }}
                        className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8"
                        data-testid="hero-stats"
                    >
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <div className="font-mono text-2xl md:text-3xl text-neon font-medium">
                                    {s.prefix}<CountUp to={s.to} suffix={s.suffix} />
                                </div>
                                <div className="mt-1.5 text-xs text-slate-500 leading-snug">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
                    className="lg:col-span-5 hidden lg:block"
                    style={{ perspective: 1200 }}
                >
                    <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
                        <div className="glass rounded-2xl p-5 neon-glow" data-testid="hero-product-frame">
                            <div className="flex items-center gap-1.5 pb-4 border-b border-white/10">
                                <span className="w-2.5 h-2.5 rounded-full bg-critical/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-watch/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-neon/80" />
                                <span className="ml-3 font-mono text-[10px] tracking-widest text-slate-500">DELAYGUARD / OPS CONSOLE</span>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZSUyMGRhc2hib2FyZCUyMFVJfGVufDB8fHx8MTc4NzQwODk4OXww&ixlib=rb-4.1.0&q=85"
                                alt="DelayGuard operations dashboard"
                                className="mt-4 rounded-lg w-full h-64 object-cover opacity-90"
                                data-testid="hero-dashboard-img"
                            />
                            <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[10px]">
                                <div className="rounded-lg border border-critical/30 bg-critical/10 p-2.5 text-critical">CRITICAL · 88<span className="block text-slate-500 mt-1">EL-1214</span></div>
                                <div className="rounded-lg border border-watch/30 bg-watch/10 p-2.5 text-watch">WATCH · 64<span className="block text-slate-500 mt-1">PM-3341</span></div>
                                <div className="rounded-lg border border-neon/30 bg-neon/10 p-2.5 text-neon">STABLE · 21<span className="block text-slate-500 mt-1">SN-0789</span></div>
                            </div>
                        </div>
                        <div className="absolute -left-8 -top-8 glass rounded-xl px-4 py-3 animate-float" style={{ transform: "translateZ(60px)" }}>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <AlertTriangle className="w-4 h-4 text-watch" />
                                Approval stage — 27% breach rate
                            </div>
                        </div>
                        <div className="absolute -right-6 -bottom-8 glass rounded-xl px-4 py-3 animate-float-slow" style={{ transform: "translateZ(80px)" }}>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Eye className="w-4 h-4 text-neon" />
                                Escalation drafted · awaiting approval
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
