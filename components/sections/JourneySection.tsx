"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
    { id: 1, title: "Break Down Complexity", subtitle: "Understanding the structure beneath problems.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" },
    { id: 2, title: "Design Systems", subtitle: "Engineering intelligent, efficient solutions.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" },
    { id: 3, title: "Robust Strategies", subtitle: "Developing proactive problem-solving frameworks.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
    { id: 4, title: "Quiet Tacticians", subtitle: "Operating strategically from the background.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop" },
];

export default function JourneySection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the container (which is 400vh tall)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Calculate the horizontal translation offset based on the number of panels
    // We want to move left by ((n - 1) / n) * 100% of the container width
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(panels.length - 1) * 100 / panels.length}%`]);

    // General parallax drift based on total scroll. 
    // It provides subtle background motion independent of the layout shifting.
    const bgX = useTransform(scrollYProgress, [0, 1], ["0px", "10vw"]);
    const textX = useTransform(scrollYProgress, [0, 1], ["0px", "-5vw"]);

    return (
        <section ref={containerRef} className="relative h-[400vh] w-full bg-black z-20">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                <motion.div
                    className="flex h-[90vh] w-[400vw]"
                    style={{ x, width: `${panels.length * 100}vw` }}
                >
                    {panels.map((panel, index) => {
                        return (
                            <div key={panel.id} className="relative w-[100vw] h-full overflow-hidden flex items-center justify-center p-8 md:p-24 origin-center">
                                {/* Background Layer */}
                                <motion.div
                                    className="absolute inset-0 w-[120%] h-full -left-[10%]"
                                    style={{ x: bgX }}
                                >
                                    <img src={panel.img} alt={panel.title} className="w-full h-full object-cover grayscale opacity-60" />
                                    {/* Royal Blue Overlay Tint */}
                                    <div className="absolute inset-0 bg-[#0a1128]/70 mix-blend-multiply" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-90" />
                                </motion.div>

                                {/* Text Layer */}
                                <motion.div
                                    className="relative z-10 max-w-4xl w-full"
                                    style={{ x: textX }}
                                >
                                    <span className="text-white/50 tracking-[0.3em] uppercase text-sm mb-6 block">Phase 0{index + 1}</span>
                                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 uppercase leading-[0.9]">
                                        {panel.title}
                                    </h2>
                                    <p className="text-xl md:text-3xl text-white/80 font-light max-w-xl border-l border-white/20 pl-6">
                                        {panel.subtitle}
                                    </p>
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
