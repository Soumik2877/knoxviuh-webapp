"use client";

import { motion, Variants } from "framer-motion";

const services = [
    { title: "Game Mechanics", desc: "Harnessing mechanics to drive engagement and structural learning.", icon: "⛋" },
    { title: "Analytical Reasoning", desc: "Thinking logically under pressure to solve what others cannot.", icon: "◈" },
    { title: "Systems Architecture", desc: "Designing intelligent systems instead of guessing outcomes.", icon: "✦" },
    { title: "Tactical Frameworks", desc: "Developing robust problem-solving strategies for any scenario.", icon: "◓" },
    { title: "Invisible Strategy", desc: "Operating strategically and efficiently from the background.", icon: "▤" },
    { title: "Clear Precision", desc: "Moving from randomness to structured, deliberate, and powerful action.", icon: "◎" },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotateX: 5 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const }
    },
};

export default function ServicesGrid() {
    return (
        <section className="relative w-full py-40 bg-black z-10" style={{ perspective: "1200px" }}>
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    className="mb-24"
                >
                    <span className="text-blue-500/60 uppercase tracking-[0.3em] text-sm block mb-6 font-semibold">Core Pillars</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Redefining Education <br className="hidden md:block" /> through Logic
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light">
                        We envision a world where complexity is not feared but engineered, where strategy replaces randomness, and thinking becomes structured, deliberate, and powerful.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                backgroundColor: "#0f172a", // slate-900 (dark blue)
                                borderColor: "rgba(59, 130, 246, 0.2)", // blue-500
                                boxShadow: "0 30px 60px rgba(30, 58, 138, 0.3)", // blue shadow
                            }}
                            className="bg-[#050914] rounded-xl border border-white/[0.05] p-12 transition-[background-color,transform,box-shadow,border-color] duration-400 ease-out group cursor-pointer flex flex-col items-start min-h-[320px]"
                        >
                            <motion.div
                                className="text-5xl text-blue-500/40 mb-auto origin-left group-hover:text-blue-400 transition-colors duration-400"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {service.icon}
                            </motion.div>
                            <div className="mt-16">
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-white/50 leading-relaxed font-light">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
