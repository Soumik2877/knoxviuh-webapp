"use client";

import { motion, Variants } from "framer-motion";

const logos = [
    { id: 1, name: "Studio Alpha", src: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Apple_logo_black.svg" },
    { id: 2, name: "Vanguard", src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { id: 3, name: "Obscura", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { id: 4, name: "Prism", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { id: 5, name: "Aether", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 6, name: "Nexus", src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg" },
    { id: 7, name: "Lumina", src: "https://upload.wikimedia.org/wikipedia/commons/b/b2/IBM_logo.svg" },
    { id: 8, name: "Zenith", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            ease: [0.33, 1, 0.68, 1] as const,
            duration: 0.8
        }
    }
};

export default function TrustLogos() {
    return (
        <section className="relative w-full py-32 bg-background z-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    className="text-center text-sm uppercase tracking-[0.3em] text-white/40 mb-20"
                >
                    Trusted by Industry Leaders
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }} // Triggers when 20% visible
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-10 items-center justify-items-center"
                >
                    {logos.map((logo) => (
                        <motion.div
                            key={logo.id}
                            variants={logoVariants}
                            className="flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-all duration-300 w-40 h-16 relative cursor-pointer group"
                            whileHover={{
                                scale: 1.05,
                            }}
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="max-h-12 w-auto object-contain filter invert brightness-0 group-hover:brightness-100 transition-all duration-300"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
