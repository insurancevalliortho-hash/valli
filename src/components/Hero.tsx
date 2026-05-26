"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

const HERO_SLIDES = [
    {
        id: 1,
        image: "/hero-surgery.png",
        title: "VALLI SUPER SPECIALITY",
        highlight: "HOSPITAL",
        subtitle: "Orthopedic Care in Salem",
        description: "Where expertise restores lives. We provide advanced care, precision healing, and excellence in every specialty."
    },
    {
        id: 2,
        image: "/hero-person.png",
        title: "COMPASSIONATE",
        highlight: "PATIENT CARE",
        subtitle: "Healing with Empathy",
        description: "Experience healthcare designed around your well-being, guided by empathy and advanced medical science."
    },
    {
        id: 3,
        image: "/hero-motion.png",
        title: "STATE-OF-THE-ART",
        highlight: "TECHNOLOGY",
        subtitle: "Precision & Safety",
        description: "Equipped with cutting-edge medical technology to ensure the highest standards of safety and recovery."
    }
];

const STATS = [
    { value: "3+", label: "Years of Excellence" },
    { value: "16K+", label: "Patients Treated" },
    { value: "95%", label: "Success Rate" },
    { value: "15+", label: "Specialities" },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [mountKey, setMountKey] = useState("initial");

    // Force a fresh key on mount to prevent Framer Motion from getting stuck during Next.js client navigation
    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMountKey(Math.random().toString());
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    // Auto-play with pause on hover
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, [isHovered]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

    // Wait until mounted to render animations to avoid hydration/navigation bugs
    if (mountKey === "initial") {
        return (
            <section className="relative w-full h-[100svh] bg-[#001014] overflow-hidden flex flex-col justify-end">
                {/* Cinematic Background Images for SSR/First Paint */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={HERO_SLIDES[0].image}
                        alt="Valli Super Speciality Hospital"
                        className="w-full h-full object-cover object-[center_top]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001014]/95 via-[#001014]/60 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001014] via-[#001014]/20 to-transparent opacity-90" />
                </div>

                <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center pt-32 sm:pt-40 lg:pt-32 pb-32 sm:pb-40 lg:pb-48">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center h-full">
                        <div className="lg:col-span-8 flex flex-col items-start mt-10 lg:mt-0">
                            <div className="max-w-4xl">
                                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                                    <span className="w-12 sm:w-16 h-[2px] bg-[#f98825]"></span>
                                    <span className="text-[#3cb3a6] tracking-[0.2em] uppercase text-xs sm:text-sm">
                                        {HERO_SLIDES[0].subtitle}
                                    </span>
                                </div>

                                <h1 className="text-white font-light text-[2.8rem] sm:text-[4.2rem] lg:text-[5rem] xl:text-[5.5rem] leading-[1] tracking-tighter mb-6">
                                    <span className="block">{HERO_SLIDES[0].title}</span>
                                    <span className="block font-black text-[#f98825]">{HERO_SLIDES[0].highlight}</span>
                                </h1>

                                <p className="text-gray-200 text-sm sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed border-l-2 border-[#3cb3a6]/30 pl-5 sm:pl-6">
                                    {HERO_SLIDES[0].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative w-full h-[100svh] bg-[#001014] overflow-hidden flex flex-col justify-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cinematic Background Images */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={`bg-${mountKey}-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <motion.img
                        src={HERO_SLIDES[currentIndex].image}
                        alt="Hero background"
                        className="w-full h-full object-cover object-[center_top]"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 12, ease: "easeOut" }}
                    />
                    {/* Immersive Gradients to blend colors flawlessly */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001014]/95 via-[#001014]/60 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001014] via-[#001014]/20 to-transparent opacity-90" />
                    {/* Subtle Teal glow for deep integration */}
                    <div className="absolute inset-0 bg-[#3cb3a6]/5 mix-blend-overlay pointer-events-none" />
                </motion.div>
            </AnimatePresence>

            {/* Main Content Grid */}
            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center pt-32 sm:pt-40 lg:pt-32 pb-32 sm:pb-40 lg:pb-48">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center h-full">

                    {/* Left Text Content */}
                    <div className="lg:col-span-8 flex flex-col items-start mt-10 lg:mt-0">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={`text-${mountKey}-${currentIndex}`}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                                    exit: { opacity: 0, transition: { duration: 0.4 } }
                                }}
                                className="max-w-4xl"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                    }}
                                    className="flex items-center gap-4 mb-6 sm:mb-8"
                                >
                                    <span className="w-12 sm:w-16 h-[2px] bg-[#f98825] shadow-[0_0_10px_rgba(249,136,37,0.5)]"></span>
                                    <span className="text-[#3cb3a6]  tracking-[0.2em] uppercase text-xs sm:text-sm drop-shadow-lg">
                                        {HERO_SLIDES[currentIndex].subtitle}
                                    </span>
                                </motion.div>

                                <h1 className="text-white font-light text-[2.8rem] sm:text-[4.2rem] lg:text-[5rem] xl:text-[5.5rem] leading-[1] tracking-tighter mb-6">
                                    <motion.span
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        className="block drop-shadow-2xl"
                                    >
                                        {HERO_SLIDES[currentIndex].title}
                                    </motion.span>
                                    <motion.span
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        className="block font-black text-[#f98825] drop-shadow-2xl"
                                    >
                                        {HERO_SLIDES[currentIndex].highlight}
                                    </motion.span>
                                </h1>

                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
                                    }}
                                    className="text-gray-200 text-sm sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed drop-shadow-md border-l-2 border-[#3cb3a6]/30 pl-5 sm:pl-6"
                                >
                                    {HERO_SLIDES[currentIndex].description}
                                </motion.p>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
                                    }}
                                    className="mt-10 sm:mt-14"
                                >
                                    <button className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-[#f98825] text-white font-bold text-xs sm:text-sm tracking-[0.15em] uppercase overflow-hidden rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_rgba(249,136,37,0.3)] hover:shadow-[0_15px_40px_rgba(249,136,37,0.5)]">
                                        <span className="relative z-10 flex items-center gap-3">
                                            Book Appointment
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                        </span>
                                        <div className="absolute inset-0 h-full w-full bg-[#3cb3a6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] z-0"></div>
                                    </button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Navigation & Progress - Desktop */}
                    <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center h-full gap-16 relative z-20">
                        {/* Elegant Vertical Slide Indicators */}
                        <div className="flex flex-col gap-6 items-end">
                            {HERO_SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className="group relative flex items-center justify-end w-24 h-6 cursor-pointer"
                                >
                                    <span
                                        className={`absolute right-0 h-[3px] rounded-full transition-all duration-700 ease-[0.22,1,0.36,1] ${idx === currentIndex
                                                ? "w-full bg-[#f98825] shadow-[0_0_10px_rgba(249,136,37,0.8)]"
                                                : "w-1/3 bg-white/20 group-hover:w-2/3 group-hover:bg-white/60"
                                            }`}
                                    />
                                    <span className={`absolute right-full mr-4 text-xs font-bold transition-opacity duration-300 ${idx === currentIndex ? "opacity-100 text-[#f98825]" : "opacity-0"}`}>
                                        0{idx + 1}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Premium Circular Controls */}
                        <div className="flex gap-4">
                            <button
                                onClick={prevSlide}
                                className="group relative w-16 h-16 rounded-full border border-white/20 bg-[#001014]/40 backdrop-blur-xl flex items-center justify-center text-white overflow-hidden transition-all hover:border-[#3cb3a6]/80 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(60,179,166,0.3)]"
                            >
                                <div className="absolute inset-0 bg-[#3cb3a6] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                                <ChevronLeft className="w-6 h-6 relative z-10 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="group relative w-16 h-16 rounded-full border border-white/20 bg-[#001014]/40 backdrop-blur-xl flex items-center justify-center text-white overflow-hidden transition-all hover:border-[#3cb3a6]/80 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(60,179,166,0.3)]"
                            >
                                <div className="absolute inset-0 bg-[#3cb3a6] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                                <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation (Visible only on small screens) */}
            <div className="lg:hidden absolute bottom-32 sm:bottom-40 left-6 right-6 z-20 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    {HERO_SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-[3px] rounded-full transition-all duration-500 ${idx === currentIndex ? "w-10 bg-[#f98825]" : "w-4 bg-white/30"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Ultra-Premium Glassmorphic Stats Dock - Centered at bottom */}
            <div className="absolute bottom-6 sm:bottom-10 left-0 w-full z-30 px-6 sm:px-10 lg:px-16 hidden md:block">
                <motion.div
                    key={`stats-${mountKey}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[1440px] mx-auto"
                >
                    <div className="grid grid-cols-4 bg-[#001014]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                        {/* Premium Glow Effect inside dock */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#3cb3a6]/5 blur-[60px] pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        {STATS.map((stat, i) => (
                            <div key={i} className={`flex flex-col items-center justify-center text-center relative group ${i !== 0 ? "border-l border-white/10" : ""}`}>
                                <span className={`text-4xl lg:text-5xl font-black tracking-tighter mb-2 transition-transform duration-500 group-hover:scale-105 ${i % 2 === 0 ? "text-[#f98825]" : "text-[#3cb3a6]"}`}>
                                    {stat.value}
                                </span>
                                <span className="text-[10px] lg:text-xs text-gray-300 uppercase tracking-[0.25em] font-bold">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
