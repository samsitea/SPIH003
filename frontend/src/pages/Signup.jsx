import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
    ShieldCheck, ArrowLeft, UserPlus,
    Droplets, Zap, Trash2, FileText, Activity, Landmark,
} from "lucide-react";
import { DEPARTMENTS } from "../lib/pipeline";
import { cn, EASE } from "../components/landing/shared";

const DEPT_ICONS = { water: Droplets, electricity: Zap, sanitation: Trash2, permits: FileText, healthcare: Activity, tax: Landmark };

export default function Signup() {
    const navigate = useNavigate();
    const [dept, setDept] = useState("water");
    const [form, setForm] = useState({ name: "", email: "", org: "" });

    const submit = (e) => {
        e.preventDefault();
        toast.success("Request received", { description: "Demo build — your pilot workspace would be provisioned here." });
        setTimeout(() => navigate("/"), 900);
    };

    return (
        <div className="min-h-screen grid-bg relative flex items-center justify-center px-6 py-16" data-testid="signup-page">
            <div className="noise-overlay" aria-hidden="true" />
            <div className="absolute bottom-1/4 right-1/3 w-[480px] h-[480px] bg-neon/10 blur-[140px] rounded-full pointer-events-none" />

            <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-neon transition-colors" data-testid="signup-back-link">
                <ArrowLeft className="w-4 h-4" /> Back to site
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="relative w-full max-w-xl glass rounded-3xl p-8 md:p-10"
            >
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-neon" />
                    <span className="font-display tracking-tight">DelayGuard</span>
                </div>
                <h1 className="font-display mt-8 text-2xl tracking-tighter" data-testid="signup-heading">Start your 90-day pilot</h1>
                <p className="mt-2 text-sm text-slate-500">Bring one spreadsheet of requests. Leave with a radar.</p>

                <form onSubmit={submit} className="mt-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="signup-name" className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Your name</label>
                            <input
                                id="signup-name" required value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="A. Sharma"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm placeholder:text-slate-600 focus:outline-none focus:border-neon/60 transition-colors duration-300"
                                data-testid="signup-name-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="signup-email" className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Work email</label>
                            <input
                                id="signup-email" type="email" required value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="officer@dept.gov"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm placeholder:text-slate-600 focus:outline-none focus:border-neon/60 transition-colors duration-300"
                                data-testid="signup-email-input"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="signup-org" className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Organisation</label>
                        <input
                            id="signup-org" required value={form.org}
                            onChange={(e) => setForm({ ...form, org: e.target.value })}
                            placeholder="City Corporation, Ward 7"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm placeholder:text-slate-600 focus:outline-none focus:border-neon/60 transition-colors duration-300"
                            data-testid="signup-org-input"
                        />
                    </div>
                    <div>
                        <p className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Which department are you guarding?</p>
                        <div className="mt-3 grid grid-cols-3 gap-2.5" data-testid="signup-dept-selector">
                            {DEPARTMENTS.map((d) => {
                                const Icon = DEPT_ICONS[d.id];
                                return (
                                    <button
                                        type="button" key={d.id} onClick={() => setDept(d.id)}
                                        className={cn(
                                            "rounded-xl border p-3 flex flex-col items-center gap-1.5 transition-[border-color,background-color] duration-300",
                                            dept === d.id ? "border-neon bg-neon/10" : "border-white/10 hover:border-neon/40"
                                        )}
                                        data-testid={`signup-dept-${d.id}-btn`}
                                    >
                                        <Icon className={cn("w-5 h-5", dept === d.id ? "text-neon" : "text-slate-400")} />
                                        <span className="text-[10px] text-slate-400 text-center leading-tight">{d.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neon text-black font-semibold px-6 py-3.5 hover:shadow-[0_0_26px_rgba(0,240,255,0.7)] transition-shadow duration-300"
                        data-testid="signup-submit-btn"
                    >
                        <UserPlus className="w-4 h-4" /> Request pilot access
                    </button>
                </form>
                <p className="mt-6 text-sm text-slate-500 text-center">
                    Already guarding? <Link to="/login" className="text-neon hover:underline" data-testid="signup-login-link">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
}
