import { ShieldCheck } from "lucide-react";

const ITEMS = [
    "Predict, don't report",
    "Name the bottleneck",
    "Every flag has a why",
    "Ranked by true urgency",
    "Calibrated, never crying wolf",
    "Human approves every action",
];

export const Marquee = () => (
    <div className="relative border-y border-white/10 bg-slate-950/70 py-6 overflow-hidden mask-fade-x" data-testid="editorial-marquee">
        <div className="flex w-max animate-marquee-slow">
            {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center">
                    {ITEMS.map((item) => (
                        <span key={`${dup}-${item}`} className="flex items-center gap-6 px-6">
                            <span className="font-display text-lg md:text-xl tracking-tight text-slate-500 whitespace-nowrap">{item}</span>
                            <ShieldCheck className="w-4 h-4 text-neon/50 shrink-0" />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);
