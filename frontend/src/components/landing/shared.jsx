import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args) => twMerge(clsx(args));

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className, y = 44 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
    >
        {children}
    </motion.div>
);

export const SectionHeading = ({ overline, title, sub, align = "left", testid }) => (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
        <p className="font-mono text-xs tracking-[0.35em] text-neon uppercase" data-testid={testid ? `${testid}-overline` : undefined}>
            {overline}
        </p>
        <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter leading-[1.08] text-slate-50">
            {title}
        </h2>
        {sub && <p className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed">{sub}</p>}
    </Reveal>
);

export const CountUp = ({ to, suffix = "", duration = 1.6, className }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let raf;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, to, duration]);
    return (
        <span ref={ref} className={className}>
            {val}
            {suffix}
        </span>
    );
};

export const scrollToId = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -84 });
    else el.scrollIntoView({ behavior: "smooth" });
};
