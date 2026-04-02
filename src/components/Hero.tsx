"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
    { value: "3+", label: "Years of Excellence" },
    { value: "16K+", label: "Patients Treated" },
    { value: "95%", label: "Success Rate" },
    { value: "15+", label: "Specialities" },
];

const headlineData = [
    { text: "WORLD-CLASS", color: "#004b57", size: "text-[12vw] md:text-[8vw] lg:text-[100px]" },
    { text: "HEALTHCARE &", color: "#3cb3a6", size: "text-[12vw] md:text-[8vw] lg:text-[100px]" },
    { text: "ORTHOPEDIC EXCELLENCE", color: "#f98825", size: "text-[10vw] md:text-[7vw] lg:text-[85px]" },
];

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120, mass: 0.05 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const width = typeof window !== "undefined" ? window.innerWidth : 1000;
        const height = typeof window !== "undefined" ? window.innerHeight : 1000;
        mouseX.set((clientX / width) * 2 - 1);
        mouseY.set((clientY / height) * 2 - 1);
    };

    const tiltX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 150, damping: 20 });
    const tiltY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 150, damping: 20 });
    const glassX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 100, damping: 30 });
    const glassY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 100, damping: 30 });

    const titleScale = useTransform(smoothProgress, [0, 0.25], [1, 2.5]);
    const titleOpacity = useTransform(smoothProgress, [0.05, 0.22], [1, 0]);
    const titleY = useTransform(smoothProgress, [0, 0.3], ["0%", "-40%"]);
    const titleBlur = useTransform(smoothProgress, [0, 0.2], ["blur(0px)", "blur(20px)"]);
    const letterSpacing = useTransform(smoothProgress, [0, 0.25], ["-0.03em", "0.15em"]);

    const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const textY = useTransform(smoothProgress, [0, 0.2], ["0px", "-30px"]);

    const imageScale = useTransform(smoothProgress, [0, 0.2, 0.5, 1], [0.85, 1, 1.25, 1.35]);
    const imageOpacity = useTransform(smoothProgress, [0, 0.2, 0.7, 1], [0.3, 1, 1, 0.7]);
    const imageBlur = useTransform(smoothProgress, [0, 0.15, 0.5], ["blur(12px)", "blur(0px)", "blur(0px)"]);

    const glassPanel1X = useTransform(smoothProgress, [0, 0.4], ["-20%", "-110%"]);
    const glassPanel1Y = useTransform(smoothProgress, [0, 0.4], ["10%", "-50%"]);
    const glassPanel1Rotate = useTransform(smoothProgress, [0, 0.4], [5, -15]);
    const glassPanel1Opacity = useTransform(smoothProgress, [0, 0.1, 0.4], [0, 1, 1]);

    const glassPanel2X = useTransform(smoothProgress, [0, 0.4], ["20%", "110%"]);
    const glassPanel2Y = useTransform(smoothProgress, [0, 0.4], ["-10%", "60%"]);
    const glassPanel2Rotate = useTransform(smoothProgress, [0, 0.4], [-5, 25]);
    const glassPanel2Opacity = useTransform(smoothProgress, [0, 0.1, 0.4], [0, 1, 1]);

    const ctaOpacity = useTransform(smoothProgress, [0.55, 0.75], [0, 1]);
    const ctaY = useTransform(smoothProgress, [0.55, 0.75], [50, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[300vh] bg-white"
        >
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative flex flex-col items-center"
                        >
                            <div className="relative">
                                <motion.img
                                    src="/logo.png"
                                    alt="Valli Hospital"
                                    className="h-20 md:h-28 w-auto mb-6"
                                    animate={{ filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full"
                                    animate={{ left: ["-100%", "200%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <div className="h-[2px] w-40 bg-[#004b57]/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#f98825]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.8, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center perspective-[1200px]"
                onMouseMove={handleMouseMove}
            >
                {/* --- Ambient Background --- */}
                <div className="absolute inset-0 z-0 bg-[#f8fbfa]" />
                <div className="absolute top-[10%] left-[15%] w-[45vw] h-[45vw] bg-[#3cb3a6]/15 rounded-full blur-[140px] pointer-events-none will-change-transform" />
                <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-full blur-[120px] pointer-events-none will-change-transform" />

                {/* --- Central Exploding Image & Glassmorphism --- */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">

                    <motion.div
                        style={{
                            scale: imageScale,
                            opacity: imageOpacity,
                            filter: imageBlur,
                        }}
                        className="relative w-[90vw] md:w-[65vw] h-[55vh] md:h-[75vh] max-w-[1000px] max-h-[800px] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_80px_rgba(0,40,50,0.25)] will-change-transform"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600"
                            alt="Advanced Surgery"
                            className="w-full h-full object-cover -scale-x-100 contrast-[1.1] saturate-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#004b57]/80 via-[#004b57]/20 to-transparent" />
                    </motion.div>

                    <motion.div
                        style={{
                            rotateX: tiltX,
                            rotateY: tiltY,
                            x: useTransform(() => `calc(${glassPanel1X.get()} + ${glassX.get()}px)`),
                            y: useTransform(() => `calc(${glassPanel1Y.get()} + ${glassY.get()}px)`),
                            rotateZ: glassPanel1Rotate,
                            opacity: glassPanel1Opacity,
                        }}
                        className="absolute z-20 w-[140px] sm:w-[200px] md:w-[360px] h-[180px] sm:h-[240px] md:h-[420px] rounded-[1rem] md:rounded-[2rem] bg-white/20 backdrop-blur-[24px] border border-white/60 shadow-[0_20px_50px_rgba(0,75,87,0.15)] flex flex-col justify-end p-3 sm:p-5 md:p-8 will-change-transform"
                    >
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#f98825] to-[#e0751e] mb-2 md:mb-4 shadow-xl flex items-center justify-center">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse" />
                        </div>
                        <h3 className="text-[#004b57] text-sm sm:text-xl md:text-3xl font-black mb-0.5 md:mb-1 opacity-95">Precision.</h3>
                        <p className="text-[#004b57]/80 text-[9px] md:text-base font-bold leading-tight md:leading-normal">Minimal Access and High Precision Surgeries.</p>
                    </motion.div>

                    <motion.div
                        style={{
                            rotateX: tiltX,
                            rotateY: tiltY,
                            x: useTransform(() => `calc(${glassPanel2X.get()} - ${glassX.get()}px)`),
                            y: useTransform(() => `calc(${glassPanel2Y.get()} - ${glassY.get()}px)`),
                            rotateZ: glassPanel2Rotate,
                            opacity: glassPanel2Opacity,
                        }}
                        className="absolute z-20 w-[120px] sm:w-[180px] md:w-[320px] h-[120px] sm:h-[180px] md:h-[320px] rounded-[1rem] md:rounded-[2rem] bg-gradient-to-br from-[#004b57]/90 to-[#3cb3a6]/80 backdrop-blur-2xl border border-white/30 shadow-[-20px_30px_60px_rgba(0,75,87,0.3)] p-3 sm:p-5 md:p-8 flex flex-col items-start justify-between will-change-transform"
                    >
                        <div className="text-white/80 font-mono text-[8px] md:text-sm uppercase tracking-widest font-bold"></div>
                        <div className="text-lg sm:text-3xl md:text-4xl font-black text-white leading-tight">Accredited by NABH</div>
                    </motion.div>
                </div>

                {/* --- Kinetic Typography & Paragraph --- */}
                <motion.div
                    style={{
                        scale: titleScale,
                        opacity: titleOpacity,
                        y: titleY,
                        filter: titleBlur,
                    }}
                    className="absolute z-30 pointer-events-none flex flex-col items-center justify-center text-center w-full px-4 h-full will-change-transform"
                >
                    {headlineData.map((line, li) => (
                        <motion.h1
                            key={li}
                            style={{ color: line.color, letterSpacing: letterSpacing as any }}
                            className={`${line.size} font-black leading-[0.9] tracking-tighter drop-shadow-[0_20px_40px_rgba(255,255,255,0.8)] flex flex-wrap justify-center gap-x-[0.2em] mb-1`}
                        >
                            {line.text.split(" ").map((word, wi) => (
                                <motion.span
                                    key={wi}
                                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                    animate={!isLoading ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.5 + (li * 0.2) + (wi * 0.1),
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>
                    ))}

                    <div className="relative mt-8 md:mt-12 group pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={!isLoading ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.div
                                style={{ opacity: textOpacity, y: textY }}
                                className="relative z-10 max-w-2xl px-8 py-6 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(0,51,60,0.08)] overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#f98825]" />
                                <p className="text-[#004b57] text-sm md:text-base lg:text-lg font-semibold leading-relaxed">
                                    Welcome to <span className="text-[#f98825] font-bold">Valli Super Speciality Hospital</span>.
                                    Where expertise restores lives. We provide advanced care, precision healing, and excellence in every specialty.
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-6 opacity-60">
                                    <div className="h-[1px] flex-1 bg-[#004b57]/10" />
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6]" />)}
                                    </div>
                                    <div className="h-[1px] flex-1 bg-[#004b57]/10" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* --- Exploding UI: Stats unpacking sequentially --- */}
                <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-end pb-[20vh] md:pb-0 md:justify-center items-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6 w-full max-w-7xl px-4 md:px-8 mt-16 md:mt-32">
                        {stats.map((stat, i) => {
                            const start = 0.35 + (i * 0.05);
                            const end = start + 0.15;
                            const statY = useTransform(smoothProgress, [start, end], [120, 0]);
                            const statOpacity = useTransform(smoothProgress, [start, end], [0, 1]);
                            const statBlur = useTransform(smoothProgress, [start, end], ["blur(20px)", "blur(0px)"]);
                            const statScale = useTransform(smoothProgress, [start, end], [0.85, 1]);

                            return (
                                <motion.div
                                    key={stat.label}
                                    style={{ y: statY, opacity: statOpacity, filter: statBlur, scale: statScale }}
                                    className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-3 sm:p-4 md:p-8 shadow-[0_20px_50px_rgba(0,75,87,0.08)] flex flex-col items-center justify-center text-center origin-bottom pointer-events-auto hover:bg-white hover:scale-105 transition-all duration-300 will-change-transform"
                                >
                                    <h4 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#f98825] mb-1">{stat.value}</h4>
                                    <p className="text-[#004b57] text-[8px] sm:text-[9px] md:text-xs font-black uppercase tracking-widest leading-tight opacity-70">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        style={{ opacity: ctaOpacity, y: ctaY }}
                        className="absolute bottom-6 md:bottom-16 pointer-events-auto flex flex-col md:flex-row gap-3 md:gap-4 px-4 w-full max-w-2xl mx-auto will-change-transform"
                    >
                        <button className="flex-1 bg-gradient-to-r from-[#f98825] to-[#e0751e] text-white px-6 md:px-14 py-3 md:py-4 rounded-full font-bold text-sm md:text-base shadow-[0_12px_30px_rgba(249,136,37,0.35)] hover:shadow-[0_15px_40px_rgba(249,136,37,0.45)] hover:-translate-y-1 transform transition-all duration-300 relative whitespace-nowrap text-center justify-center flex items-center">
                            Book Appointment
                        </button>
                        <button className="flex-1 shrink-0 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#ba1a1a] to-[#d92c2c] text-white px-6 md:px-14 py-3 md:py-4 rounded-full font-bold text-[13px] md:text-base shadow-[0_20px_40px_rgba(186,26,26,0.3)] hover:shadow-[0_25px_50px_rgba(186,26,26,0.4)] hover:-translate-y-1 transform transition-all duration-300 whitespace-nowrap text-center">
                            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
                                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white" />
                            </span>
                            24/7 Emergency
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
