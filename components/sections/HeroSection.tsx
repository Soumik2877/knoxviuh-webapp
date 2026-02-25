"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const skyY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const cloud1Y = useTransform(scrollYProgress, [0, 1], [100, -800]);
    const cloud2Y = useTransform(scrollYProgress, [0, 1], [-150, -500]);
    const cloud3Y = useTransform(scrollYProgress, [0, 1], [-50, -650]);
    const mountBgY = useTransform(scrollYProgress, [0, 1], [-10, -100]);
    const mountMgY = useTransform(scrollYProgress, [0, 1], [-30, -250]);
    const mountFgY = useTransform(scrollYProgress, [0, 1], [-50, -600]);

    // Handle smooth scroll down on arrow click
    const handleScrollDown = () => {
        window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" });
    };

    return (
        <section ref={containerRef} className="relative w-full h-screen min-h-screen bg-[#0a1128] overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full object-cover">
                <mask id="m">
                    <motion.g style={{ y: cloud1Y }}>
                        <rect fill="#fff" width="100%" height="801" y="799" />
                        <image href="https://assets.codepen.io/721952/cloud1Mask.jpg" width="1200" height="800" />
                    </motion.g>
                </mask>

                <motion.image style={{ y: skyY }} href="https://assets.codepen.io/721952/sky.jpg" width="1200" height="590" />
                <motion.image style={{ y: mountBgY }} href="https://assets.codepen.io/721952/mountBg.png" width="1200" height="800" />
                <motion.image style={{ y: mountMgY }} href="https://assets.codepen.io/721952/mountMg.png" width="1200" height="800" />
                <motion.image style={{ y: cloud2Y }} href="https://assets.codepen.io/721952/cloud2.png" width="1200" height="800" />
                <motion.image style={{ y: mountFgY }} href="https://assets.codepen.io/721952/mountFg.png" width="1200" height="800" />
                <motion.image style={{ y: cloud1Y }} href="https://assets.codepen.io/721952/cloud1.png" width="1200" height="800" />
                <motion.image style={{ y: cloud3Y }} href="https://assets.codepen.io/721952/cloud3.png" width="1200" height="800" />

                {/* Dark text for Knoxviuh typography */}
                <text fill="#fff" x="600" y="360" textAnchor="middle" fontSize="100" fontWeight="900" fontFamily="var(--font-inter)" letterSpacing="-0.05em">STRATEGY</text>
                <text fill="#fff" x="600" y="260" textAnchor="middle" fontSize="100" fontWeight="900" fontFamily="var(--font-inter)" letterSpacing="-0.05em">ARCHITECTS OF</text>

                {/* Animated Arrow */}
                <motion.polyline
                    fill="#fff"
                    points="599,400 599,439 590,429 590,432 600,442 610,432 610,429 601,439 601,400"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <g mask="url(#m)">
                    <rect fill="#fff" width="100%" height="100%" />
                    {/* Theme color inside mask */}
                    <text x="600" y="360" textAnchor="middle" fill="#0a1128" fontSize="100" fontWeight="900" fontFamily="var(--font-inter)" letterSpacing="-0.05em">STRATEGY</text>
                    <text x="600" y="260" textAnchor="middle" fill="#0a1128" fontSize="100" fontWeight="900" fontFamily="var(--font-inter)" letterSpacing="-0.05em">ARCHITECTS OF</text>
                </g>

                <rect
                    width="100"
                    height="100"
                    opacity="0"
                    x="550"
                    y="370"
                    style={{ cursor: "pointer" }}
                    onClick={handleScrollDown}
                />
            </svg>
        </section>
    );
}
