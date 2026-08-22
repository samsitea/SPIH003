import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Github } from "lucide-react";
import { Reveal, scrollToId } from "./shared";

export const Footer = () => (
    <footer className="relative border-t border-white/10 overflow-hidden" data-testid="footer">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-neon/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-10">
            <Reveal className="text-center max-w-3xl mx-auto">
                <p className="font-mono text-xs tracking-[0.35em] text-neon uppercase">The next breach is already forming</p>
                <h2 className="font-display mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter leading-[1.1]">
                    Stop discovering breaches. <span className="text-neon text-glow">Start intercepting them.</span>
                </h2>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/signup"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-neon text-black font-semibold px-8 py-4 hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-shadow duration-300"
                        data-testid="footer-cta-btn"
                    >
                        Deploy DelayGuard
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                        onClick={() => scrollToId("#demo")}
                        className="rounded-full border border-white/20 text-slate-200 px-8 py-4 hover:border-neon hover:text-neon transition-colors duration-300"
                        data-testid="footer-demo-btn"
                    >
                        Replay the demo
                    </button>
                </div>
            </Reveal>

            <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-neon" />
                    <span className="font-display text-sm tracking-tight">DelayGuard</span>
                    <span className="font-mono text-[10px] text-slate-600 tracking-widest">· SLA GUARDIAN · TEAM DELAYGUARD</span>
                </div>
                <div className="flex items-center gap-7 font-mono text-[11px] text-slate-500 tracking-wider">
                    {["#problem", "#agents", "#demo", "#pricing"].map((h) => (
                        <button key={h} onClick={() => scrollToId(h)} className="hover:text-neon transition-colors" data-testid={`footer-link-${h.slice(1)}`}>
                            {h.slice(1).toUpperCase()}
                        </button>
                    ))}
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors flex items-center gap-1.5" data-testid="footer-github-link">
                        <Github className="w-3.5 h-3.5" /> GITHUB
                    </a>
                </div>
                <p className="font-mono text-[10px] text-slate-600 tracking-widest">HACKATHON · ROUND 3 · 2026</p>
            </div>
        </div>
    </footer>
);
