"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Types matching the new image reference
interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Knoxviuh didn’t just teach me concepts — they fundamentally rewired how I approach complex problems. I'm now designing intelligent systems rather than guessing outcomes.",
        author: "Alex M.",
        role: "Senior Architect",
        company: "Apex Solutions",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        quote: "Learning to see the invisible structure beneath problems gave me a massive strategic advantage. Knoxviuh trains you to be a quiet tactician in chaotic environments.",
        author: "Elena Rostova",
        role: "CTO",
        company: "Horizon Corp",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        quote: "Their framework on game mechanics and analytical reasoning is unmatched. I learned to operate strategically and efficiently under immense pressure.",
        author: "Marcus Vance",
        role: "Director of Strategy",
        company: "Aether Studios",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: 4,
        quote: "I've explored many platforms, but none have delivered this level of technical execution combined with high-end tactical problem-solving frameworks.",
        author: "Sarah Lin",
        role: "Founder",
        company: "Lumina",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getVisibleCards = () => {
        const total = testimonials.length;
        // Calculate indices for left, center, right to give the wrap-around carousel effect
        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        return [
            { item: testimonials[prevIndex], position: "left", index: prevIndex },
            { item: testimonials[currentIndex], position: "center", index: currentIndex },
            { item: testimonials[nextIndex], position: "right", index: nextIndex }
        ];
    };

    const visibleCards = getVisibleCards();

    return (
        <section className="relative w-full py-32 bg-black flex flex-col items-center overflow-hidden">

            <div className="text-center mb-24 z-10 space-y-4">
                <h2 className="text-5xl md:text-6xl font-serif text-white tracking-wide">
                    Hear <span className="italic text-white/70">from</span> our tacticians
                </h2>
                <p className="text-white/40 text-lg font-light tracking-wide">
                    With warriors of logic across the globe, here's what they have to say
                </p>
            </div>

            {/* Slider Container */}
            <div className="relative w-full max-w-[100vw] h-[500px] flex items-center justify-center">

                {testimonials.map((item, index) => {
                    // Calculate relative position to handle infinite wrap-around
                    const total = testimonials.length;

                    let offset = index - currentIndex;
                    // Handle wrap-around math
                    if (offset < -Math.floor(total / 2)) offset += total;
                    if (offset > Math.floor(total / 2)) offset -= total;

                    const isCenter = offset === 0;
                    const isLeft = offset === -1;
                    const isRight = offset === 1;
                    const isHidden = Math.abs(offset) > 1;

                    return (
                        <motion.div
                            key={item.id}
                            initial={false}
                            animate={{
                                opacity: isCenter ? 1 : isHidden ? 0 : 0.4,
                                scale: isCenter ? 1 : isHidden ? 0.8 : 0.8,
                                x: isLeft ? "-65%" : isRight ? "65%" : isHidden && offset < 0 ? "-100%" : isHidden && offset > 0 ? "100%" : "0%",
                                zIndex: isCenter ? 10 : isHidden ? 0 : 5,
                                filter: isCenter ? "brightness(1)" : "brightness(0.3)"
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.76, 0, 0.24, 1] // The primary apple-like easing
                            }}
                            className={`absolute w-full max-w-4xl p-[1px] rounded-[2rem] ${isCenter ? 'cursor-default shadow-[0_30px_60px_rgba(0,0,0,0.8)]' : isHidden ? 'pointer-events-none' : 'cursor-pointer'}`}
                            onClick={() => {
                                if (isLeft) prevSlide();
                                if (isRight) nextSlide();
                            }}
                        >
                            {/* Background Card Wrapper */}
                            <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2rem] flex flex-col md:flex-row shadow-2xl overflow-hidden border border-white/5">

                                {/* Dotted geometric background pattern from reference image */}
                                <div
                                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen"
                                    style={{
                                        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                                        backgroundSize: "24px 24px"
                                    }}
                                />

                                {/* Left Side: Avatar Panel */}
                                <div className="w-full md:w-2/5 p-6 z-10 flex items-center justify-center">
                                    <div className="w-full h-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mix-blend-normal">
                                        <img
                                            src={item.avatar}
                                            alt={item.author}
                                            className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Content Panel */}
                                <div className="w-full md:w-3/5 p-8 md:p-12 z-10 flex flex-col justify-between">
                                    <div>
                                        <p className="text-white/80 font-light text-lg md:text-xl leading-relaxed">
                                            "{item.quote}"
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-12 gap-4">
                                        <div>
                                            <h4 className="text-white font-medium text-lg">{item.author}</h4>
                                            <p className="text-white/40 text-sm mt-1">{item.role} @ {item.company}</p>
                                        </div>

                                        {/* Fake company logo for matching ref */}
                                        <div className="flex items-center gap-2 opacity-50 shrink-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                            <span className="text-white font-medium text-sm tracking-widest hidden sm:inline-block">{item.company}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    );
                })}
                {/* Premium Glassmorphic Navigation Arrows - Fixed over the blurred side cards */}
                <button
                    onClick={prevSlide}
                    className="absolute left-[5%] md:left-[12%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 z-30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                    aria-label="Previous Testimonial"
                >
                    <ArrowLeft size={22} className="opacity-80" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-[5%] md:right-[12%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 z-30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                    aria-label="Next Testimonial"
                >
                    <ArrowRight size={22} className="opacity-80" />
                </button>

            </div>

            {/* Dot Indicators */}
            <div className="flex gap-2 mt-16 bg-white/5 px-4 py-2 rounded-full">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"}`}
                    />
                ))}
            </div>

        </section>
    );
}
