import { Quote } from "lucide-react";
import { SectionHeading, Reveal } from "./shared";

const VOICES = [
    { name: "Meera Krishnan", role: "Grievance Cell, City Corporation", text: "We stopped discovering breaches from angry citizens. DelayGuard flags them a week early — Q1 breaches dropped 84%.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzQwODk4OHww&ixlib=rb-4.1.0&q=85" },
    { name: "Arjun Bhandari", role: "SLA Ops Lead, Utility Provider", text: "The 'why' is everything. My team trusts the Critical tier because it's never cried wolf in three months.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzQwODk4OHww&ixlib=rb-4.1.0&q=85" },
    { name: "Fatima Sheikh", role: "Director, Permits Authority", text: "Approval was our invisible bottleneck for years. The heatmap named it in the first week. We added two officers — backlog halved.", avatar: "https://images.unsplash.com/photo-1609436132311-e4b0c9370469?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzQwODk4OHww&ixlib=rb-4.1.0&q=85" },
    { name: "Daniel Osei", role: "CIO, Regional Health Board", text: "The drafted escalations save my leads an hour a day. Approve, edit, or reject — the agent does the paperwork.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzQwODk4OHww&ixlib=rb-4.1.0&q=85" },
    { name: "Kavitha Rao", role: "Deputy Commissioner, Ward 7", text: "Prioritisation by impact, not just risk, means the hospital permit jumps the queue over a licence renewal. As it should.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzQwODk4OHww&ixlib=rb-4.1.0&q=85" },
    { name: "Rohan Iyer", role: "Process Analyst, Tax Department", text: "We feed it a spreadsheet, it hands back a ranked to-do list with reasons. That's the whole pitch — and it works.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzQwODk4OHww&ixlib=rb-4.1.0&q=85" },
];

const Card = ({ v }) => (
    <div className="w-[340px] shrink-0 mx-3 bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-neon/40 transition-colors duration-300" data-testid={`testimonial-${v.name.toLowerCase().split(" ")[0]}`}>
        <Quote className="w-5 h-5 text-neon/60" />
        <p className="mt-4 text-sm text-slate-300 leading-relaxed min-h-[84px]">{v.text}</p>
        <div className="mt-5 flex items-center gap-3">
            <img src={v.avatar} alt={v.name} className="w-10 h-10 rounded-full object-cover border border-white/15" loading="lazy" />
            <div>
                <p className="text-sm text-slate-200">{v.name}</p>
                <p className="font-mono text-[10px] text-slate-500 tracking-wider">{v.role}</p>
            </div>
        </div>
    </div>
);

export const Testimonials = () => (
    <section id="voices" className="relative py-28 lg:py-36 bg-slate-950/40 border-y border-white/5 overflow-hidden" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
                overline="Voice of the community"
                title={<>The people who stopped <span className="text-slate-500">chasing deadlines</span></>}
                align="center"
                testid="voices"
            />
        </div>
        <Reveal className="mt-16">
            <div className="relative overflow-hidden mask-fade-x py-2" data-testid="testimonials-marquee">
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                    {[0, 1].map((dup) => (
                        <div key={dup} className="flex shrink-0">
                            {VOICES.map((v) => <Card key={`${dup}-${v.name}`} v={v} />)}
                        </div>
                    ))}
                </div>
            </div>
        </Reveal>
    </section>
);
