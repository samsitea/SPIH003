import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ShieldCheck, ArrowLeft, LogIn, Radar, MessageSquareText, Send } from "lucide-react";
import { EASE } from "../components/landing/shared";

const PITCH = [
    { icon: Radar, text: "Predict breaches days before the deadline" },
    { icon: MessageSquareText, text: "Every alert explained in plain language" },
    { icon: Send, text: "Escalations drafted, you just approve" },
];

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const submit = (e) => {
        e.preventDefault();
        toast.success("Welcome back", { description: "Demo preview — accounts are not enabled yet." });
        setTimeout(() => navigate("/"), 900);
    };

    return (
        <div className="min-h-screen grid-bg relative flex items-center justify-center px-6 py-16" data-testid="login-page">
            <div className="noise-overlay" aria-hidden="true" />
            <div className="absolute top-1/4 left-1/3 w-[480px] h-[480px] bg-neon/10 blur-[140px] rounded-full pointer-events-none" />

            <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-neon transition-colors" data-testid="login-back-link">
                <ArrowLeft className="w-4 h-4" /> Back to site
            </Link>

            <div className="relative w-full max-w-4xl grid md:grid-cols-2 glass rounded-3xl overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="hidden md:flex flex-col justify-between p-10 border-r border-white/10 bg-slate-950/50"
                >
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-neon" />
                        <span className="font-display tracking-tight">DelayGuard</span>
                    </div>
                    <div>
                        <h2 className="font-display text-2xl lg:text-3xl tracking-tighter leading-snug">
                            Your queue has been <span className="text-neon">guarded</span> while you were away.
                        </h2>
                        <div className="mt-8 space-y-4">
                            {PITCH.map((p) => (
                                <div key={p.text} className="flex items-center gap-3 text-sm text-slate-400">
                                    <p.icon className="w-4 h-4 text-neon shrink-0" /> {p.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="font-mono text-[10px] tracking-widest text-slate-600">3 CRITICAL · 7 WATCH · 212 STABLE</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                    className="p-8 md:p-10"
                >
                    <h1 className="font-display text-2xl tracking-tighter" data-testid="login-heading">Log in</h1>
                    <p className="mt-2 text-sm text-slate-500">Back to the console. The agents kept watch.</p>
                    <form onSubmit={submit} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="login-email" className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Work email</label>
                            <input
                                id="login-email" type="email" required value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="officer@dept.gov"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-neon/60 focus:shadow-[0_0_16px_rgba(0,229,160,0.15)] transition-[border-color,box-shadow] duration-300"
                                data-testid="login-email-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="login-password" className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Password</label>
                            <input
                                id="login-password" type="password" required value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="••••••••"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-neon/60 focus:shadow-[0_0_16px_rgba(0,229,160,0.15)] transition-[border-color,box-shadow] duration-300"
                                data-testid="login-password-input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neon text-black font-semibold px-6 py-3.5 hover:shadow-[0_0_26px_rgba(0,229,160,0.7)] transition-shadow duration-300"
                            data-testid="login-submit-btn"
                        >
                            <LogIn className="w-4 h-4" /> Enter the console
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-slate-500 text-center">
                        New here? <Link to="/signup" className="text-neon hover:underline" data-testid="login-signup-link">Request access</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
