"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "50K+", label: "Patients Treated" },
    { value: "98%", label: "Success Rate" },
    { value: "15+", label: "Specialities" },
];

const headlineLines = [
    { words: ["World-Class"], orange: false },
    { words: ["Healthcare", "&"], orange: false },
    { words: ["Orthopedic", "Excellence"], orange: true },
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={sectionRef} className="relative w-full min-h-[100svh] overflow-hidden bg-white">

            {/* Subtle dot-grid — lightweight, no animation */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle, rgba(0,75,87,0.045) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
            }} />

            {/* Static ambient glow blobs — no animation, just CSS */}
            <div className="absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-[#f98825]/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[440px] max-h-[440px] bg-[#3cb3a6]/6 rounded-full blur-[100px] pointer-events-none" />

            {/* ═══════════════════════════════════════
                MOBILE LAYOUT  (< md)
                Full-bleed image with rich overlaid content
            ═══════════════════════════════════════ */}
            <div className="block md:hidden relative w-full min-h-[100svh]">

                {/* Parallax image — light gradient overlay */}
                <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=900')" }}
                    />
                    {/* Light-friendly gradient: white fades from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/50 to-white/95" />
                    {/* Top teal wash */}
                    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#004b57]/40 to-transparent" />
                </motion.div>

                {/* Content over image */}
                <div className="relative z-10 flex flex-col min-h-[100svh] px-5 pt-24 pb-10">

                    {/* Geometric mini-shapes top — matching desktop language */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotate: 30 }}
                        animate={{ opacity: 1, scale: 1, rotate: 45 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-14 right-4 w-20 h-20 bg-[#f98825] rounded-[1.2rem] shadow-xl z-20"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 45 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-20 right-14 w-14 h-14 bg-[#3cb3a6] rounded-[1rem] z-10"
                    />

                    {/* Staggered headline */}
                    <div className="mt-auto mb-5">
                        {headlineLines.map((line, li) => (
                            <div key={li} className="flex flex-wrap gap-x-3 leading-none">
                                {line.words.map((word, wi) => (
                                    <motion.span
                                        key={word}
                                        initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ duration: 0.65, delay: 0.1 + li * 0.13 + wi * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className={`text-[2.5rem] font-black tracking-tight leading-[1.1]
                                            ${word === "&" ? "text-[#004b57]/30" : line.orange ? "text-[#f98825]" : "text-[#00333c]"}`}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.52 }}
                        className="text-[#40484a] text-[0.95rem] leading-relaxed mb-7 max-w-[300px]"
                    >
                        Cutting-edge technology, evidence-based treatments, and compassionate care — helping you reclaim health and mobility.
                    </motion.p>

                    {/* Stats grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.65 }}
                        className="grid grid-cols-2 gap-3 mb-6"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, scale: 0.88 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.72 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white/80 backdrop-blur-md border border-[#004b57]/10 rounded-2xl px-4 py-3.5 shadow-sm"
                            >
                                <div className="text-[1.7rem] font-black text-[#f98825] leading-none">{s.value}</div>
                                <div className="text-[#5b6668] text-[0.68rem] font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.88 }}
                        className="flex flex-col gap-3"
                    >
                        <button className="w-full bg-[#f98825] text-white py-4 rounded-2xl font-bold text-base shadow-[0_6px_24px_rgba(249,136,37,0.38)] hover:bg-[#e0751e] active:scale-[0.98] transition-all duration-200">
                            Book an Appointment
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#ba1a1a]/20 text-[#ba1a1a] py-4 rounded-2xl font-semibold text-base shadow-sm active:scale-[0.98] transition-all duration-200">
                            <span className="relative flex h-3 w-3 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-60" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ba1a1a]" />
                            </span>
                            Call 24/7 Emergency
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════════════════════════════════
                DESKTOP LAYOUT  (≥ md)
            ═══════════════════════════════════════ */}
            <div className="hidden md:flex relative w-full min-h-[100svh] items-center">

                {/* ── Left: Geometric image panel ── */}
                <div className="absolute top-0 left-0 w-[52vw] h-full z-10 pointer-events-none">
                    <div className="w-full h-full relative">
                        {/* Outer border ring */}
                        <motion.div
                            initial={{ x: "-20%", rotate: 45, opacity: 0 }}
                            animate={{ x: "0%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-1/2 right-[5%] -translate-y-1/2 translate-x-1/2 w-[65vh] h-[65vh] rounded-[4rem] border-2 border-[#f98825]/30"
                        />
                        {/* Dark teal backing */}
                        <motion.div
                            initial={{ x: "-50%", rotate: 45, opacity: 0 }}
                            animate={{ x: "-15%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[73vh] h-[73vh] bg-[#004b57] rounded-[4.5rem] shadow-2xl"
                        />
                        {/* Teal accent */}
                        <motion.div
                            initial={{ x: "0%", y: "100%", rotate: 45, opacity: 0 }}
                            animate={{ x: "5%", y: "50%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[40vh] h-[40vh] bg-[#3cb3a6] rounded-[3rem]"
                        />
                        {/* Orange accent */}
                        <motion.div
                            initial={{ x: "-60%", rotate: 45, opacity: 0 }}
                            animate={{ x: "-25%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                            className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[73vh] h-[73vh] bg-[#f98825] rounded-[4rem] shadow-xl"
                        />
                        {/* Main photo */}
                        <motion.div
                            initial={{ x: "-70%", rotate: 45, opacity: 0 }}
                            animate={{ x: "-32%", rotate: 45, opacity: 1 }}
                            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[73vh] h-[73vh] rounded-[3.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)] pointer-events-auto"
                        >
                            <div className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45">
                                <img
                                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600"
                                    alt="Advanced Orthopedic Surgery at Valli Hospital"
                                    className="w-full h-full object-cover object-center -scale-x-100 contrast-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004b57]/60 via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-[18%] left-[10%] z-30 bg-white rounded-2xl px-5 py-4 shadow-2xl border border-[#f98825]/15"
                        >
                            <div className="text-3xl font-black text-[#f98825] leading-none">5K+</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#40484a] mt-1">Surgeries Performed</div>
                        </motion.div>
                    </div>
                </div>

                {/* ── Right: Text ── */}
                <div className="container mx-auto px-6 md:px-16 relative z-20 flex justify-end">
                    <div className="w-full md:w-[48%] flex flex-col justify-center text-left  md:rounded-3xl md:px-10 md:py-12">

                        {/* Staggered headline */}
                        <div className="mb-6">
                            {headlineLines.map((line, li) => (
                                <div key={li} className="flex flex-wrap gap-x-4">
                                    {line.words.map((word, wi) => (
                                        <motion.span
                                            key={word}
                                            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            transition={{ duration: 0.75, delay: 0.1 + li * 0.14 + wi * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className={`text-5xl xl:text-[3.4rem] font-black leading-[1.08] tracking-tight
                                                ${word === "&" ? "text-[#004b57]/25" : line.orange ? "text-[#f98825]" : "text-[#00333c]"}`}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.55 }}
                            className="text-[#5b6668] text-lg leading-relaxed max-w-md mb-9"
                        >
                            Welcome to Valli Super Speciality Hospital. We combine cutting-edge medical technology, evidence-based treatments, and compassionate care to help you reclaim your health and mobility.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.68 }}
                            className="flex flex-row gap-4 mb-12"
                        >
                            <button className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-base shadow-[0_8px_24px_rgba(249,136,37,0.32)] hover:bg-[#e0751e] hover:-translate-y-0.5 transform transition-all duration-200">
                                Book an Appointment
                            </button>
                            <button className="flex items-center gap-3 bg-white text-[#ba1a1a] border border-[#ba1a1a]/20 px-8 py-4 rounded-full font-semibold text-base shadow-sm hover:bg-[#ffdad6]/30 hover:-translate-y-0.5 transform transition-all duration-200">
                                <span className="relative flex h-3 w-3 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-60" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ba1a1a]" />
                                </span>
                                24/7 Emergency
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.82 }}
                            className="grid grid-cols-4 gap-4 pt-7 border-t border-[#004b57]/10"
                        >
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.88 + i * 0.08 }}
                                    className="flex flex-col"
                                >
                                    <span className="text-2xl xl:text-3xl font-black text-[#f98825] leading-none">{s.value}</span>
                                    <span className="text-[#5b6668] text-[11px] font-semibold mt-1.5 uppercase tracking-wider leading-tight">{s.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
