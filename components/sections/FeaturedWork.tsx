"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const projects = [
    { id: 1, title: "Alpha Framework", category: "Systems Architecture", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" },
    { id: 2, title: "Project Zero", category: "Game Mechanics", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { id: 3, title: "Tactical Matrix", category: "Analytical Reasoning", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" },
];

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        scale: 1.05,
        opacity: 1,
    }),
    center: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: {
            x: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
            scale: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        scale: 0.95,
        opacity: 1,
        transition: {
            x: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
            scale: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
        },
    }),
};

export default function FeaturedWork() {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(1);

    const imageIndex = Math.abs(page % projects.length);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setPage(page + newDirection);
    };

    return (
        <section className="relative w-full py-32 bg-black flex flex-col pt-40 px-6 max-w-[100vw] overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-end mb-12 relative z-10">
                <div>
                    <span className="text-blue-500/60 uppercase tracking-[0.3em] text-sm block mb-4 font-semibold">Strategic Implementations</span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Case Studies</h2>
                </div>

                {/* Controls */}
                <div className="flex gap-4">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto cursor-pointer"
                    >
                        <ArrowLeft strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto cursor-pointer"
                    >
                        <ArrowRight strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto h-[60vh] md:h-[75vh] overflow-hidden rounded-2xl group cursor-pointer">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={projects[imageIndex].img}
                            alt={projects[imageIndex].title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/100" />

                        {/* Text Content */}
                        <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="text-white/70 tracking-[0.2em] uppercase text-sm mb-3 block">
                                {projects[imageIndex].category}
                            </span>
                            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                {projects[imageIndex].title}
                            </h3>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
