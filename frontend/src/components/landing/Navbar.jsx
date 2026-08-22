import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, ArrowRight } from "lucide-react";
import { scrollToId } from "./shared";

const LINKS = [
    { label: "The Problem", href: "#problem" },
    { label: "Agents", href: "#agents" },
    { label: "Live Demo", href: "#demo" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
];

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/10"
            data-testid="navbar"
        >
            <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
                <button onClick={() => scrollToId("#top")} className="flex items-center gap-3 group" data-testid="brand-logo">
                    <span className="relative grid place-items-center w-9 h-9 rounded-xl border border-neon/40 bg-neon/10">
                        <ShieldCheck className="w-5 h-5 text-neon" />
                        <span className="absolute inset-0 rounded-xl border border-neon/40 animate-pulse-ring" />
                    </span>
                    <span className="text-left leading-none">
                        <span className="font-display text-sm font-semibold tracking-tight block">DelayGuard</span>
                        <span className="font-mono text-[9px] tracking-[0.3em] text-neon/70">SLA GUARDIAN</span>
                    </span>
                </button>
                <div className="hidden md:flex items-center gap-8">
                    {LINKS.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => scrollToId(l.href)}
                            className="text-sm text-slate-400 hover:text-neon transition-colors duration-300"
                            data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2" data-testid="nav-login-btn">
                        Log in
                    </Link>
                    <Link
                        to="/signup"
                        className="group inline-flex items-center gap-2 rounded-full border border-neon text-neon text-sm px-5 py-2.5 hover:bg-neon hover:text-black hover:shadow-[0_0_20px_rgba(232,121,249,0.6)] transition-colors duration-300"
                        data-testid="nav-get-access-btn"
                    >
                        Get Access <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
                <button className="md:hidden text-slate-200" onClick={() => setOpen(!open)} data-testid="nav-mobile-toggle">
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden border-t border-white/10 bg-slate-950/90 backdrop-blur-xl"
                        data-testid="nav-mobile-menu"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {LINKS.map((l) => (
                                <button
                                    key={l.href}
                                    onClick={() => { setOpen(false); scrollToId(l.href); }}
                                    className="text-left text-slate-300 hover:text-neon transition-colors"
                                    data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                            <div className="flex gap-3 pt-2">
                                <Link to="/login" className="flex-1 text-center rounded-full border border-white/15 px-4 py-2.5 text-sm" data-testid="nav-mobile-login-btn">Log in</Link>
                                <Link to="/signup" className="flex-1 text-center rounded-full border border-neon text-neon px-4 py-2.5 text-sm" data-testid="nav-mobile-signup-btn">Get Access</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
