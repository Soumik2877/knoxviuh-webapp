"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, cubicBezier } from "framer-motion";

const text = "We architect strategic frameworks, logical systems, and digital ecosystems that keep up with your ambition. So you can focus on building what matters, while we structure the mechanics behind it.";

export default function TextScrollReveal() {
    const container = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const words = text.split(" ");

    // Total letters to calculate specific activation ranges
    const totalLetters = text.replace(/\s+/g, "").length;
    let letterIndex = 0;

    // Logos array based on user's reference image
    const logos = [
        "BURGER BAE",
        "Flipkart Commerce Cloud",
        "# Schbang.",
        "ISKCON",
        "the mom",
        "BURGER BAE",
        "Flipkart Commerce Cloud",
        "# Schbang.",
        "ISKCON",
        "the mom",
    ];

    return (
        <section
            ref={container}
            className="relative w-full h-[240vh] bg-[#000000]"
        >
            <div className="sticky top-0 w-full h-[80vh] overflow-hidden flex items-center justify-center">

                {/* 1px dotted background with 28px spacing perfectly aligned */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        backgroundPosition: "center center"
                    }}
                />

                {/* Center vignette overlay (40% transparent center -> 65% black edges) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 100%)"
                    }}
                />

                {/* Typography Container */}
                <div
                    className="relative z-10 w-full max-w-[1440px] px-4 md:px-8 xl:px-12 flex flex-wrap justify-center text-center font-serif text-[#262626]"
                    style={{
                        fontSize: "clamp(2.4rem, 4.2vw, 4.4rem)",
                        lineHeight: 1.08,
                        letterSpacing: "-0.02em"
                    }}
                >
                    {words.map((word, i) => {
                        const letters = word.split("");
                        return (
                            <span key={i} className="inline-flex mr-[0.25em] mb-[0.1em]">
                                {letters.map((letter, j) => {
                                    const currentLetter = letterIndex++;
                                    // Total animation range 0% - 80% scroll progress
                                    // Map this letter's range within that 0 to 0.8 window
                                    const start = (currentLetter / totalLetters) * 0.8;
                                    const end = start + (1 / totalLetters) * 0.8;

                                    return (
                                        <Letter
                                            key={j}
                                            progress={scrollYProgress}
                                            range={[start, end]}
                                        >
                                            {letter}
                                        </Letter>
                                    );
                                })}
                            </span>
                        );
                    })}
                </div>

                {/* Auto-scrolling Trusted By Banner */}
                <div className="absolute w-full bottom-0 left-0 right-0 py-8 border-t border-white/[0.05] bg-black/40 backdrop-blur-md flex items-center overflow-hidden">

                    {/* Fixed Trusted By Badge on Left */}
                    <div className="relative z-20 flex items-center bg-black/60 shadow-[20px_0_30px_rgba(0,0,0,0.8)] px-8 md:px-12 h-full">
                        <div className="flex items-center gap-4 text-white/50">
                            {/* Left Laurel SVG */}
                            <svg width="24" height="48" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-80">
                                <path d="M20 4 C10 10 4 20 4 32 C4 38 6 44 8 48" strokeLinecap="round" />
                                <path d="M18 10 C14 12 10 14 10 18 C10 20 12 20 14 20" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 18 C10 20 6 24 6 28 C6 30 8 30 10 30" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 28 C8 32 4 36 6 40 C8 42 10 42 12 40" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <div className="flex flex-col text-[13px] font-medium tracking-wider leading-[1.4] uppercase text-center">
                                <span>Trusted by 60+</span>
                                <span>Organizations</span>
                            </div>

                            {/* Right Laurel SVG */}
                            <svg width="24" height="48" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-80">
                                <path d="M4 4 C14 10 20 20 20 32 C20 38 18 44 16 48" strokeLinecap="round" />
                                <path d="M6 10 C10 12 14 14 14 18 C14 20 12 20 10 20" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 18 C14 20 18 24 18 28 C18 30 16 30 14 30" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 28 C16 32 20 36 18 40 C16 42 14 42 12 40" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Scrolling Marquee Container */}
                    <div className="relative flex-1 flex items-center overflow-hidden h-full">
                        {/* Right Gradient Mask for smooth fade out */}
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                        {/* Infinite Marquee Track powered by Framer Motion for 120fps smoothness */}
                        <motion.div
                            className="flex items-center gap-16 min-w-max pr-16 pl-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                        >
                            {/* Duplicate the array EXACTLY ONCE for perfect -50% seamless looping */}
                            {[...logos, ...logos].map((logo, index) => (
                                <div key={index} className="text-xl font-black tracking-tighter text-white/40 whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                                    {logo}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Letter({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
    const ease = cubicBezier(0.76, 0, 0.24, 1);

    // Interpolate RGB values smoothly from #262626 to #F1F1F1
    const color = useTransform(progress, range, ["#262626", "#F1F1F1"], { ease });

    // Blur reduction from 0.6px to 0px
    const blurAmount = useTransform(progress, range, [0.6, 0], { ease });
    const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);

    // Slight glow near activation threshold (midpoint of the letter's range)
    const textShadowAmount = useTransform(
        progress,
        [range[0], range[0] + (range[1] - range[0]) / 2, range[1]],
        [0, 15, 0]
    );
    const textShadow = useTransform(textShadowAmount, (v) => `0px 0px ${v}px rgba(255,255,255,0.4)`);

    return (
        <motion.span
            style={{
                color,
                filter,
                textShadow
            }}
            className="inline-block"
        >
            {children}
        </motion.span>
    );
}
