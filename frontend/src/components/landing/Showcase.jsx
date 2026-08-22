import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading, Reveal } from "./shared";

const SHOTS = [
    {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZSUyMGRhc2hib2FyZCUyMFVJfGVufDB8fHx8MTc4NzQwODk4OXww&ixlib=rb-4.1.0&q=85",
        title: "Ops Console",
        desc: "The ranked queue of at-risk requests, tier badges, and per-stage dwell analytics.",
        chip: { label: "Approval · 27% breach rate", pos: "-left-4 top-8" },
    },
    {
        src: "https://images.unsplash.com/photo-1543286386-713bdd548da4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        title: "Delay Trends",
        desc: "Quarterly SLA performance, delay trends and bottleneck stages per department.",
        chip: { label: "Q2 breaches ↓ 84%", pos: "-right-4 bottom-10" },
    },
];

export const Showcase = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [90, -70]);

    return (
        <section id="showcase" ref={ref} className="relative py-28 lg:py-36 overflow-hidden" data-testid="showcase-section">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-6">
                <SectionHeading
                    overline="Already built"
                    title={<>The product, <span className="text-slate-500">in the flesh</span></>}
                    sub="Working screens from the pilot deployment — not mockups."
                    align="center"
                    testid="showcase"
                />
                <div className="mt-20 grid lg:grid-cols-2 gap-10">
                    {SHOTS.map((s, i) => (
                        <motion.div key={s.title} style={{ y: i === 0 ? y1 : y2 }}>
                            <Reveal delay={i * 0.12}>
                                <div className="group relative" data-testid={`showcase-${s.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                    <div className="glass rounded-2xl p-3 overflow-hidden">
                                        <div className="relative rounded-xl overflow-hidden">
                                            <img src={s.src} alt={s.title} className="w-full h-72 md:h-80 object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <p className="font-display text-lg tracking-tight">{s.title}</p>
                                                <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`absolute ${s.chip.pos} glass rounded-xl px-4 py-2.5 font-mono text-[11px] text-neon animate-float`}>
                                        {s.chip.label}
                                    </div>
                                </div>
                            </Reveal>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
