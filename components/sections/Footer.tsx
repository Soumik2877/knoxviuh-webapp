"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black p-4">

            {/* 
        Container for the actual footer card 
        We use a slightly rounded wrapper to mimic the image's embedded look
      */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="relative w-full h-full min-h-[75vh] rounded-3xl overflow-hidden flex flex-col justify-between p-8 md:p-16"
            >

                {/* === Background Layers === */}
                {/* 1. Base Royal Blue Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a] via-[#172554] to-[#020617] scale-110" />

                {/* 2. Abstract/Statue Image (Placeholder using a classical sculpture but with blue tones via mix-blend) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542281050-cfafed05139d?q=80&w=2000&auto=format&fit=crop" // Replacing the red statue with a neutral/classical one
                        alt="Classical Statue Background"
                        className="w-full h-full object-cover object-top opacity-30 mix-blend-overlay"
                    />
                    {/* Radial mask to darken edges and focus on center text */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
                </div>

                {/* 3. Cinematic Grain Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-10"
                    style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }}
                />

                {/* === Content Layers === */}
                <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <p className="text-white/70 tracking-widest uppercase text-sm mb-4 font-light">
                            That's the mission
                        </p>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif tracking-tight mb-10 leading-[1.1]">
                            Become an <span className="italic text-white/90">architect</span> of strategy
                        </h2>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    >
                        Get In Touch
                    </motion.button>

                </div>

                {/* === Bottom Links / Copyright === */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="relative z-20 flex flex-col md:flex-row justify-between items-center w-full pt-8 border-t border-white/10 mt-16 text-xs md:text-sm text-white/50"
                >
                    <div className="mb-4 md:mb-0">
                        © 2025 Knoxviuh | All Rights Reserved.
                    </div>

                    <div className="mb-4 md:mb-0 hover:text-white transition-colors cursor-pointer">
                        hello@knoxviuh.com
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Services</a>
                        <a href="#" className="hover:text-white transition-colors">Featured Work</a>
                        <a href="#" className="hover:text-white transition-colors">Testimonials</a>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
