"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Home, Compass, Cpu, Layers, Archive, MessageSquare } from "lucide-react";

// You can update the hrefs below to match section IDs if you want anchor scrolling
const navItems = [
    { name: "Home", icon: Home, href: "#" },
    { name: "Journey", icon: Compass, href: "#" },
    { name: "Systems", icon: Cpu, href: "#" },
    { name: "Products", icon: Layers, href: "#" },
    { name: "Case Studies", icon: Archive, href: "#" },
    { name: "Tacticians", icon: MessageSquare, href: "#" },
];

export default function AppleDock() {
    // Track mouse X position relative to viewport
    const mouseX = useMotionValue(Infinity);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, 1200); // Disappear after 1.2s of no scroll
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    const isVisible = isScrolling || isHovered;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 80, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onMouseMove={(e) => mouseX.set(e.clientX)}
                        onMouseLeave={() => { mouseX.set(Infinity); setIsHovered(false); }}
                        onMouseEnter={() => setIsHovered(true)}
                        className="flex items-end gap-3 px-4 pb-3 pt-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
                        style={{
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.5)',
                        }}
                    >
                        {navItems.map((item, i) => (
                            <DockItem key={i} mouseX={mouseX} item={item} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DockItem({ mouseX, item }: { mouseX: any; item: any }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [hovered, setHovered] = useState(false);

    // Calculate distance from mouse to center of this icon
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Translate distance to width (magnification)
    // -150px to 150px proximity causes scaling
    // base width: 48, max width: 80
    const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);

    // Smooth the width change with a spring physics engine for 60fps ultra-premium feel
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 250, damping: 15 });

    return (
        <a href={item.href} ref={ref}>
            <motion.div
                style={{ width, height: width }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 cursor-pointer overflow-visible drop-shadow-md"
            >
                {/* Refraction background: simulates glass thickness with shadows and linear highlights */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.3)] pointer-events-none" />

                {/* Top highlight mimicking Apple's semi-spherical gloss */}
                <div className="absolute top-0 left-0 right-0 rounded-t-full bg-gradient-to-b from-white/30 to-transparent opacity-50 h-1/2 pointer-events-none" />

                {/* Tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -45, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 flex items-center justify-center px-3 py-1.5 bg-[#1e3a8a]/90 backdrop-blur-xl border border-blue-400/30 rounded-lg text-white text-xs font-semibold tracking-wide whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 pointer-events-none"
                        >
                            {item.name}
                            {/* Downwards carrot triangle */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e3a8a]/90 rotate-45 border-r border-b border-blue-400/30"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Icon wrapper - Scales nicely within its constrained box */}
                <motion.div
                    className="relative z-10 flex items-center justify-center w-full h-full text-white drop-shadow-md"
                >
                    <item.icon className="w-[45%] h-[45%]" strokeWidth={2} />
                </motion.div>
            </motion.div>
        </a>
    );
}
