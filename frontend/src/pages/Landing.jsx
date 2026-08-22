import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Marquee } from "../components/landing/Marquee";
import { Manifesto } from "../components/landing/Manifesto";
import { AgentFlow } from "../components/landing/AgentFlow";
import { DemoWidget } from "../components/landing/DemoWidget";
import { Services } from "../components/landing/Services";
import { WhyUs } from "../components/landing/WhyUs";
import { Showcase } from "../components/landing/Showcase";
import { Testimonials } from "../components/landing/Testimonials";
import { Roadmap } from "../components/landing/Roadmap";
import { Pricing } from "../components/landing/Pricing";
import { FAQ } from "../components/landing/FAQ";
import { Footer } from "../components/landing/Footer";

export default function Landing() {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
        return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
    }, []);

    return (
        <div className="relative">
            <div className="noise-overlay" aria-hidden="true" />
            <Navbar />
            <main>
                <Hero />
                <Marquee />
                <Manifesto />
                <AgentFlow />
                <DemoWidget />
                <Services />
                <WhyUs />
                <Showcase />
                <Testimonials />
                <Roadmap />
                <Pricing />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}
