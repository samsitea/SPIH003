import { Reveal } from "./shared";
import { FileWarning, Radar, MessageSquareText } from "lucide-react";

const CHAPTERS = [
    {
        num: "01",
        icon: FileWarning,
        title: "The backlog nobody sees",
        body: "A municipal office handles thousands of citizen requests, each with its own SLA deadline. Tracking them by hand means the delay is discovered the day the deadline passes — when it's already a complaint, a penalty, and a broken promise.",
        tag: "The problem",
    },
    {
        num: "02",
        icon: Radar,
        title: "From rear-view report to radar",
        body: "DelayGuard reads the same records your team already keeps — stage, timestamps, department, SLA — and predicts which requests will breach before they do. Not a dashboard of what went wrong. A radar for what's about to.",
        tag: "The shift",
    },
    {
        num: "03",
        icon: MessageSquareText,
        title: "Every flag carries its reason",
        body: "A red list nobody trusts gets ignored. So every DelayGuard alert arrives with a plain-language why — 'stuck 5.1 days at Approval, 132% longer than average; this stage breaches 27% of the time' — and a drafted fix, waiting for a human to approve.",
        tag: "The trust layer",
    },
];

export const Manifesto = () => (
    <section id="problem" className="relative py-28 lg:py-36" data-testid="manifesto-section">
        <div className="max-w-7xl mx-auto px-6">
            <Reveal>
                <p className="font-mono text-xs tracking-[0.35em] text-neon uppercase" data-testid="manifesto-overline">The manifesto</p>
                <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter leading-[1.08] max-w-3xl">
                    Deadlines don't fail suddenly. <span className="text-slate-500">They fail slowly, in full view.</span>
                </h2>
            </Reveal>
            <div className="mt-20 space-y-0">
                {CHAPTERS.map((c, i) => (
                    <Reveal key={c.num} delay={i * 0.08}>
                        <div
                            className={`grid md:grid-cols-12 gap-8 py-14 border-t border-white/10 ${i === CHAPTERS.length - 1 ? "border-b" : ""}`}
                            data-testid={`manifesto-chapter-${c.num}`}
                        >
                            <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4">
                                <span className="font-display text-5xl lg:text-6xl font-light text-transparent [-webkit-text-stroke:1px_rgba(232,121,249,0.4)]">{c.num}</span>
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon/70 border border-neon/25 rounded-full px-3 py-1">{c.tag}</span>
                            </div>
                            <div className="md:col-span-4">
                                <c.icon className="w-6 h-6 text-neon mb-4" />
                                <h3 className="font-display text-xl lg:text-2xl tracking-tight text-slate-100 leading-snug">{c.title}</h3>
                            </div>
                            <p className="md:col-span-5 text-slate-400 leading-relaxed text-base">{c.body}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
