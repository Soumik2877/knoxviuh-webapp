"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function ProductCardInteraction() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create a tall container to allow for a long scroll sequence
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Background effects
    const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

    // -- STAGE 1 (0 to 0.33): Scale down & lift --
    // We use a shared scale and Y for the whole group initially, or apply it to the base wrapper.
    const groupScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.75]);
    const groupY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "-5vh"]);

    // -- STAGE 2 (0.33 to 0.66): Lateral split --
    // Spread them out fully first, then maintain spread for the final arch
    const leftTranslateX = useTransform(scrollYProgress, [0.33, 0.66, 0.95], ["0vw", "-26vw", "-30vw"]);
    const rightTranslateX = useTransform(scrollYProgress, [0.33, 0.66, 0.95], ["0vw", "26vw", "30vw"]);

    // Slight rotation during the split for depth
    const splitRotateYLeft = useTransform(scrollYProgress, [0.33, 0.66], [0, 8]);
    const splitRotateYRight = useTransform(scrollYProgress, [0.33, 0.66], [0, -8]);

    // -- STAGE 3 (0.66 to 1): 3D Flip & Angle Formation --
    // Flip angle from 0 to 180
    const flipRotateY = useTransform(scrollYProgress, [0.66, 0.95], [0, 180]);

    // Formation angles at the end (Semi-circular fan)
    // Reversed due to the 180deg flip mirroring the visuals
    const finalRotateZLeft = useTransform(scrollYProgress, [0.66, 0.95], [0, 14]);
    const finalRotateZRight = useTransform(scrollYProgress, [0.66, 0.95], [0, -14]);

    // Drop them slightly on the Y axis to create the arched "fan" look
    const finalTranslateYLeftRight = useTransform(scrollYProgress, [0.66, 0.95], ["0vh", "8vh"]);

    // Combined transforms for each card
    // Left Card
    const leftRotateY = useTransform(() => splitRotateYLeft.get() + flipRotateY.get());
    // Center Card
    const centerRotateY = flipRotateY;
    // Right Card
    const rightRotateY = useTransform(() => splitRotateYRight.get() + flipRotateY.get());

    // Opacity swaps for the flip reveal content (triggers when flip is past 90 degrees)
    const frontOpacity = useTransform(scrollYProgress, [0.8, 0.81], [1, 0]);
    const backOpacity = useTransform(scrollYProgress, [0.8, 0.81], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[300vh] w-full bg-black z-20">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>

                {/* Subtle dotted background grid & vignette that fades in */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ opacity: bgOpacity }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, white 2px, transparent 0)",
                            backgroundSize: "32px 32px"
                        }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
                </motion.div>

                {/* Overlay Title */}
                <motion.div
                    className="absolute top-[10%] left-0 w-full text-center z-30 pointer-events-none"
                    style={{ opacity: bgOpacity }}
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide font-serif">
                        Where are you <span className="italic text-white/70">in</span> your journey?
                    </h2>
                </motion.div>

                <motion.div
                    className="relative z-10 w-[80vw] sm:w-[50vw] md:w-[28vw] aspect-[2.8/4] max-h-[85vh] flex items-center justify-center mt-12"
                    style={{
                        scale: groupScale,
                        y: groupY,
                        transformStyle: "preserve-3d" // VERY IMPORTANT
                    }}
                >

                    {/* LEFT CARD */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            x: leftTranslateX,
                            y: finalTranslateYLeftRight,
                            rotateY: leftRotateY,
                            rotateZ: finalRotateZLeft,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            zIndex: 1 // behind center
                        }}
                    >
                        <CardBody
                            frontOpacity={frontOpacity}
                            backOpacity={backOpacity}
                            title="Logic"
                            backTitle={
                                <>
                                    <span className="block mb-2 text-[#333]">Break Down</span>
                                    <span className="block text-[#111]">Complexity</span>
                                </>
                            }
                            desc="Understand the structure beneath problems and learn to solve what others cannot."
                            bgClass="bg-gradient-to-br from-[#e0e0e0] to-[#b0b0b0]"
                            textColor="text-black"
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/60"><path d="M22 7L13.5 15.5L8.5 10.5L2 17M22 7H16M22 7V13" /></svg>}
                        />
                    </motion.div>

                    {/* RIGHT CARD */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            x: rightTranslateX,
                            y: finalTranslateYLeftRight,
                            rotateY: rightRotateY,
                            rotateZ: finalRotateZRight,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            zIndex: 1 // behind center
                        }}
                    >
                        <CardBody
                            frontOpacity={frontOpacity}
                            backOpacity={backOpacity}
                            title="Strategy"
                            backTitle={
                                <>
                                    <span className="block mb-2 text-white/90">Quiet</span>
                                    <span className="block text-white">Tactician</span>
                                </>
                            }
                            desc="Operate strategically, transitioning from randomness to deliberate, powerful action."
                            bgClass="bg-gradient-to-br from-[#222] to-[#0a0a0a]"
                            textColor="text-white"
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><path d="M7 7l4 4-4 4M13 15h4M4 4h16v16H4z" /></svg>}
                        />
                    </motion.div>

                    {/* CENTER CARD (renders last so it stays on top initially) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            rotateY: centerRotateY,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            zIndex: 10 // keeping it dominant
                        }}
                    >
                        <CardBody
                            frontOpacity={frontOpacity}
                            backOpacity={backOpacity}
                            title="Systems"
                            backTitle={
                                <>
                                    <span className="block mb-2 text-white/90">Design</span>
                                    <span className="block text-white">Intelligently</span>
                                </>
                            }
                            desc="Engineer robust, systemic solutions and frameworks instead of guessing outcomes."
                            isCenter
                            bgClass="bg-gradient-to-br from-blue-700 to-[#0f172a]"
                            textColor="text-white"
                            icon={
                                <div className="flex flex-col items-center gap-1 opacity-80">
                                    <div className="w-2 h-2 rounded-full border border-white"></div>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full border border-white"></div>
                                        <div className="w-2 h-2 rounded-full border border-white"></div>
                                    </div>
                                </div>
                            }
                        />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}

// Reusable card body for front and back faces
function CardBody({
    frontOpacity,
    backOpacity,
    title,
    backTitle,
    desc,
    isCenter = false,
    bgClass = "bg-gradient-to-br from-[#111] to-black",
    textColor = "text-white",
    icon
}: {
    frontOpacity: MotionValue<number>,
    backOpacity: MotionValue<number>,
    title: string,
    backTitle: React.ReactNode,
    desc?: string,
    isCenter?: boolean,
    bgClass?: string,
    textColor?: string,
    icon?: React.ReactNode
}) {
    return (
        <>
            {/* Front Face (Initial Logo/Title state before flip) */}
            <motion.div
                className={`absolute inset-0 rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${isCenter ? 'bg-gradient-to-b from-[#1a1a1a] to-black z-10' : 'bg-gradient-to-br from-[#111] to-black'}`}
                style={{ opacity: frontOpacity, backfaceVisibility: "hidden" }}
            >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent h-1/2 pointer-events-none" />
                <div className="flex items-center justify-center w-full h-full p-8 text-center text-white">
                    <h3 className="text-3xl font-light tracking-[0.2em] uppercase">{title}</h3>
                </div>
            </motion.div>

            {/* Back Face (flipped 180 - Final Revealed State) */}
            <motion.div
                className={`absolute inset-0 rounded-[2rem] overflow-hidden ${isCenter ? 'shadow-[0_40px_100px_rgba(29,78,216,0.4)]' : 'shadow-[0_40px_80px_rgba(0,0,0,0.5)]'} ${bgClass}`}
                style={{
                    opacity: backOpacity,
                    rotateY: 180,
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d"
                }}
            >
                <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-overlay mix-blend-color-burn" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent h-[40%] pointer-events-none" />

                <div className={`flex flex-col w-full h-full p-10 md:p-14 ${textColor}`} style={{ transform: "translateZ(30px)" }}>

                    {/* Top Icon Area */}
                    <div className="mb-auto">
                        {icon && icon}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col text-left gap-4">
                        <h3 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
                            {backTitle}
                        </h3>

                        {desc && (
                            <p className={`text-sm md:text-base leading-relaxed mt-4 font-normal ${textColor === 'text-white' ? 'text-white/60' : 'text-black/60'}`}>
                                {desc}
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
}
