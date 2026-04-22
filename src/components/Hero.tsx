"use client";

import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const STATS = [
    { value: "3+", label: "Years of Excellence" },
    { value: "16K+", label: "Patients Treated" },
    { value: "95%", label: "Success Rate" },
    { value: "15+", label: "Specialities" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

// Clip-path line reveal — each line slides up from below its own mask
const lineReveal: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
        y: "0%",
        opacity: 1,
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
};

// Fade + slight upward drift
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
};

// Badge slide-in from left
const badgeReveal: Variants = {
    hidden: { opacity: 0, x: -30, scale: 0.92 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    },
};

// Stat counter pop
const statPop: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
        },
    }),
};

// Image panel entrance
const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.08, x: 40 },
    show: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
};

// Button spring bounce
const buttonBounce: Variants = {
    hidden: { opacity: 0, scale: 0.88, y: 16 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
    },
};

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 80, mass: 0.3 });

    const yDesktopText = useTransform(smooth, [0, 1], ["0%", "-20%"]);
    const yDesktopImage = useTransform(smooth, [0, 1], ["0%", "-10%"]);
    const imgScale = useTransform(smooth, [0, 1], [1, 1.06]);
    const desktopFade = useTransform(smooth, [0, 0.7], [1, 0]);

    // ── Shared Content Block ───────────────────────────────────────────────────
    const Content = (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col mt-10"
        >


            {/* WORLD-CLASS */}
            <div className="overflow-hidden">
                <motion.span
                    variants={lineReveal}
                    className="block font-light text-[#001014] text-[2.5rem] sm:text-[3.4rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem] leading-[0.95] tracking-tighter"
                >
                    WORLD-CLASS
                </motion.span>
            </div>

            {/* HEALTHCARE */}
            <div className="overflow-hidden">
                <motion.span
                    variants={lineReveal}
                    className="block font-black text-[#f98825] text-[2.5rem] sm:text-[3.4rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem] leading-[0.95] tracking-tighter"
                >
                    HEALTHCARE
                </motion.span>
            </div>

            {/* & Orthopedic Excellence */}
            <div className="overflow-hidden mt-1">
                <motion.span
                    variants={lineReveal}
                    className="block font-light text-[#3cb3a6] text-[1.5rem] sm:text-[2rem] lg:text-[1.8rem] xl:text-[2.2rem] 2xl:text-[2.6rem] leading-[1.0] tracking-tight italic mb-3"
                >
                    &amp; Orthopedic Excellence
                </motion.span>
            </div>

            {/* Divider line accent */}
            <motion.div variants={fadeUp} className="w-10 h-[2px] bg-[#f98825] mb-4 origin-left" />

            {/* Description */}
            <motion.p
                variants={fadeUp}
                className="text-gray-500 font-medium text-sm leading-relaxed max-w-[440px] mb-5"
            >
                Welcome to Valli Super Speciality Hospital. Where expertise restores lives. We provide advanced care, precision healing, and excellence in every specialty.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                variants={containerVariants}
                className="flex flex-wrap items-center gap-4 mb-6 lg:mb-8"
            >
                <motion.a
                    variants={buttonBounce}
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-3 bg-[#f98825] text-white px-7 py-3.5 rounded-full font-bold uppercase tracking-[0.1em] text-xs hover:bg-[#3cb3a6] shadow-md hover:shadow-[0_12px_24px_rgba(60,179,166,0.25)] transition-all duration-500"
                >
                    Book Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                    variants={buttonBounce}
                    href="#"
                    whileHover={{ x: 4 }}
                    className="text-[#001014] hover:text-[#3cb3a6] text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#3cb3a6] hover:after:w-full after:transition-all after:duration-300 pb-1"
                >
                    View Outcomes
                </motion.a>
            </motion.div>

            {/* Stats Strip */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0 gap-x-2 border-t border-gray-100 pt-6">
                {STATS.map((s, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={statPop}
                        whileHover={{ y: -3, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`flex flex-col items-start cursor-default ${(i % 2 !== 0) ? "border-l border-gray-100 pl-4" : ""} ${i >= 2 ? "lg:border-l lg:border-gray-100 lg:pl-4" : ""}`}
                    >
                        <span className={`text-[1.5rem] sm:text-[2rem] lg:text-[2.2rem] font-black leading-none tracking-tighter ${i % 2 === 0 ? "text-[#f98825]" : "text-[#3cb3a6]"}`}>
                            {s.value}
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 leading-tight">
                            {s.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full lg:h-[100vh] min-h-[100svh] bg-[#fcfdfd] selection:bg-[#3cb3a6] selection:text-white lg:overflow-hidden"
        >
            <div className="lg:sticky lg:top-0 w-full lg:h-[100svh] flex flex-col">

                {/* Blueprint Grid BG */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}
                        className="absolute inset-0 bg-[linear-gradient(rgba(60,179,166,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(60,179,166,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_80%_at_30%_50%,#000_20%,transparent_100%)]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3, delay: 0.3 }}
                        className="absolute top-[-10%] right-[0%] w-[40vw] h-[40vw] rounded-full border border-[#f98825]/10 animate-[spin_60s_linear_infinite]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3, delay: 0.5 }}
                        className="absolute top-[10%] right-[-8%] w-[55vw] h-[55vw] rounded-full border border-[#3cb3a6]/5 animate-[spin_100s_linear_infinite_reverse]"
                    />
                </div>

                {/* ══════════ MOBILE LAYOUT ══════════ */}
                <div className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                        src="/hero-person.png"
                        alt=""
                        className="w-full h-full object-cover object-right-top opacity-[0.07]"
                        loading="eager"
                    />
                </div>
                <div className="lg:hidden relative z-10 flex flex-col justify-center min-h-[100svh] px-6 sm:px-10 pt-32 pb-16">
                    {Content}
                </div>

                {/* ══════════ DESKTOP LAYOUT ══════════ */}
                <div className="hidden lg:flex w-full h-full">

                    {/* Left text panel — scroll parallax */}
                    <motion.div
                        style={{ y: yDesktopText, opacity: desktopFade }}
                        className="flex flex-col justify-center px-16 xl:px-20 w-[52%] shrink-0 h-full"
                    >
                        {Content}
                    </motion.div>

                    {/* Right image panel */}
                    <motion.div
                        variants={imageReveal}
                        initial="hidden"
                        animate="show"
                        style={{ y: yDesktopImage, scale: imgScale, opacity: desktopFade }}
                        className="flex-1 relative h-full overflow-hidden"
                    >
                        <img
                            src="/hero-person.png"
                            alt="Orthopedic Care – Valli Hospital"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            loading="eager"
                        />
                        {/* Seamless edge blend */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfd] via-[#fcfdfd]/50 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfd]/10 via-transparent to-[#fcfdfd]/20 pointer-events-none" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
