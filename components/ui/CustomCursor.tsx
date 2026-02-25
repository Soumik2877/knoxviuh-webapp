"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    if (!isClient) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 border border-white rounded-full pointer-events-none z-50 mix-blend-difference flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex"
            animate={{
                x: position.x - 10,
                y: position.y - 10,
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? "white" : "transparent",
            }}
            transition={{
                type: "spring",
                stiffness: 700,
                damping: 40,
                mass: 0.1,
            }}
        />
    );
}
