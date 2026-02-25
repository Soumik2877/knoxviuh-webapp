"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Apple } from "lucide-react"; // Using this as placehoder for download icon shown in image like apple store

export default function TopNavbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Calculate dynamic threshold: Hero (100vh) + TextScrollReveal (240vh) = 340vh
        const threshold = typeof window !== 'undefined' ? window.innerHeight * 3.4 : 3000;

        // Hide if scrolling down past the threshold (Journey Section and beyond)
        if (latest > previous && latest > threshold) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.div
            variants={{
                visible: { y: 0, opacity: 1, scale: 1 },
                hidden: { y: -100, opacity: 0, scale: 0.95 }
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-4 left-0 right-0 z-50 flex justify-center w-full px-4`}
        >
            <motion.nav
                className={`flex items-center justify-between w-full max-w-5xl px-3 py-2.5 rounded-[1.25rem] border bg-white/5 backdrop-blur-[32px] border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.5)]`}
                // Adding an ultra smooth hover scale effect for the entire navbar, adding to premium feel
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Left side Logo */}
                <div className="flex items-center justify-center font-semibold text-lg tracking-wide text-white gap-2 pointer-events-none pl-2">
                    {/* Abstract logo mark matching reference */}
                    <div className="w-5 h-5 relative flex items-end justify-between">
                        <div className="w-[40%] h-full bg-white rounded-sm" />
                        <div className="w-[40%] h-[60%] bg-white rounded-sm" />
                    </div>
                    KnoxViuh
                </div>

                {/* Center nav links */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2">
                    <NavLink text="About us" />
                    <NavLink text="Services" isActive />
                    <NavLink text="Company" />
                    <NavLink text="Pricing" />
                </div>

                {/* Right side CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative overflow-hidden flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#1e3a8a] rounded-full shadow-[0_4px_14px_rgba(30,58,138,0.4)] border border-white/10"
                >
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }} />
                    <span className="relative z-10">Contact Us</span>
                </motion.button>
            </motion.nav>
        </motion.div>
    );
}

function NavLink({ text, isActive = false }: { text: string; isActive?: boolean }) {
    return (
        <motion.a
            href={`#${text.toLowerCase()}`}
            whileHover={{ scale: 1.05, backgroundColor: isActive ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer
                ${isActive ? 'bg-black/40 text-white' : 'text-white/80 hover:text-white'}
            `}
        >
            {text}
        </motion.a>
    );
}
