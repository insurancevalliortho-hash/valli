"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SurgeonProfile() {
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax mapping for subtle background
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 80, mass: 0.1 });
    const textY1 = useTransform(smoothScroll, [0, 1], ["0%", "-50%"]);
    const gridY = useTransform(smoothScroll, [0, 1], ["0%", "10%"]);

    const stats = [
        { value: "16", symbol: "+", label: "Years Excellence" },
        { value: "10", symbol: "K", label: "Successful Surgeries" },
        { value: "98", symbol: "%", label: "Recovery Rate" },
        { value: "15", symbol: "+", label: "Specializations" },
    ];

    const milestones = [
        { year: "2022", title: "Hospital Founded", desc: "Setting the foundation for elite frameworks." },
        { year: "2023", title: "Total Elbow Rep.", desc: "First successful regional complex joint mechanics." },
        { year: "2024", title: "3K+ Knee Rep.", desc: "A definitive state benchmark." },
        { year: "2025", title: "Bio Orthopedics", desc: "Advanced cellular joint restoration pathways." },
    ];

    const creds = ["M.S. Ortho", "FIAS", "Joint Replacement", "Arthroscopy", "Trauma & Spine", "Bio Regenerative"];

    return (
        <section ref={sectionRef} id="surgeon" className="relative w-full bg-[#001014] text-white selection:bg-[#3cb3a6] selection:text-[#001014] overflow-hidden pt-24 pb-32">

            {/* ── PARALLAX TYPOGRAPHY BACKGROUND ── */}
            <motion.div
                style={{ y: textY1 }}
                className="absolute left-[10%] lg:left-1/3 top-0 bottom-0 pointer-events-none z-0 opacity-[0.03] overflow-hidden flex items-center"
            >
                <div className="text-[25vh] font-black leading-none uppercase whitespace-nowrap rotate-[-90deg] origin-left text-[#3cb3a6] mix-blend-screen">
                    MASTERMIND
                </div>
            </motion.div>

            {/* ── AMBIENT GLOWS ── */}
            <div className="absolute top-[10%] left-0 w-[40vw] h-[50vh] bg-[#f98825]/10 rounded-full blur-[170px] pointer-events-none z-0" />
            <div className="absolute bottom-[10%] right-0 w-[40vw] h-[50vh] bg-[#3cb3a6]/10 rounded-full blur-[170px] pointer-events-none z-0" />

            {/* ── UNIFIED TIGHT LAYOUT GRID ── */}
            <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10 flex flex-col gap-12 lg:gap-24">

                {/* ── TOP SECTION: TITLES & IMAGE & BIO ── */}
                <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-24">

                    {/* LEFT: Portrait & Name */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center items-start relative">

                        {/* Subtle Logo Branding Motif inside Image Column */}
                        <motion.div
                            style={{ y: gridY }}
                            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden"
                        >
                            <svg className="w-[180%] h-auto absolute left-[-40%] bottom-[-20%]" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="100,100 0,100 100,0" fill="none" stroke="#f98825" strokeWidth="0.2" className="opacity-50" />
                                <polygon points="100,100 50,100 100,50" fill="none" stroke="#3cb3a6" strokeWidth="0.3" className="opacity-80" />
                            </svg>
                        </motion.div>

                        <div className="w-full relative z-10 mb-8 lg:mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                                className="flex items-center gap-4 mb-4 lg:mb-6"
                            >
                                <span className="w-12 h-[1px] bg-[#f98825]" />
                                <span className="text-[#f98825] font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase">Visionary</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                                className="font-light text-4xl sm:text-5xl leading-[1.1] mb-2 tracking-tight"
                            >
                                Dr. T. <br /> <span className="font-black text-white drop-shadow-[0_0_20px_rgba(249,136,37,0.2)]">Natanasabapathy</span>
                            </motion.h2>
                            <motion.h3
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-[#3cb3a6] font-light text-xl sm:text-2xl mt-3 italic tracking-wide"
                            >
                                Chief Orthopedic Surgeon
                            </motion.h3>
                        </div>

                        {/* Elegant Corporate Image Frame */}
                        <div className="w-full max-w-lg relative z-10">
                            {/* Triangle architectural accents */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[3px] border-r-[3px] border-[#f98825]/40 opacity-70 rounded-tr-xl" />
                            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[3px] border-l-[3px] border-[#3cb3a6]/40 opacity-70 rounded-bl-xl" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                                className="relative w-full aspect-[4/5] overflow-hidden group shadow-[0_30px_80px_rgba(0,0,0,0.8)] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-lg rounded-bl-lg bg-black"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#f98825]/20 to-[#3cb3a6]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#001014] via-transparent to-transparent z-10 opacity-70" />

                                <img
                                    src="surgeon.jpeg"
                                    alt="Dr. T. Natanasabapathy"
                                    className="w-full h-full object-cover filter grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                />
                            </motion.div>
                        </div>

                    </div>

                    {/* RIGHT: Bio & Analytics */}
                    <div className="w-full lg:w-[55%] flex flex-col justify-center gap-16 lg:gap-20">

                        {/* Bio Block */}
                        <div className="w-full">
                            <motion.h4
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.3] mb-6"
                            >
                                Orchestrating <span className="font-bold text-[#f98825]">movement</span>. <br /> Minimizing <span className="font-bold text-[#3cb3a6]">recovery</span>.
                            </motion.h4>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl"
                            >
                                With over a decade and a half of relentless pursuit of excellence, Dr. Natanasabapathy stands at the absolute forefront of joint mechanics, arthroscopic reconstruction, and complex trauma recovery. His methodologies blend immediate clinical intervention with long-term, cellular-level architectural restoration.
                            </motion.p>

                            <motion.div
                                initial="hidden" whileInView="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                                className="flex flex-wrap gap-2 lg:gap-3 max-w-2xl"
                            >
                                {creds.map((c, i) => (
                                    <motion.span key={i} variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                                        className="bg-[#3cb3a6]/10 border border-[#3cb3a6]/30 text-[#3cb3a6] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-2 rounded-full hover:bg-[#3cb3a6] hover:text-[#001014] hover:shadow-[0_0_15px_rgba(60,179,166,0.4)] transition-all duration-300"
                                    >
                                        {c}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-12 max-w-2xl">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="relative flex flex-col group p-6 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.04] transition-colors"
                                >
                                    <div className="flex items-start gap-1">
                                        <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#001014] leading-[0.8] tracking-tighter group-hover:from-[#f98825] transition-all duration-500">
                                            {stat.value}
                                        </span>
                                        <span className="text-[#3cb3a6] text-2xl sm:text-3xl font-bold mt-1 group-hover:-translate-y-1 transition-transform">{stat.symbol}</span>
                                    </div>
                                    <span className="text-white/50 text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase mt-5 group-hover:text-white/90 transition-colors">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                </div>

                {/* ── BOTTOM SECTION: UNIFIED TIMELINE ── */}
                <div className="w-full mt-4 lg:mt-8 pt-12 border-t border-white/10">
                    <motion.h5
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-12 sm:mb-16 flex items-center gap-6"
                    >
                        Milestones Track
                        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#f98825]/30 to-transparent" />
                    </motion.h5>

                    <div className="relative w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 sm:gap-x-12 lg:gap-x-16">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={m.year}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="relative group pt-0 md:pt-10"
                                >
                                    {/* Independent Top Line Connection for Grid layout */}
                                    <div className="hidden md:block absolute top-[9px] left-4 right-[-2rem] lg:right-[-4rem] h-[3px] bg-gradient-to-r from-[#f98825]/30 to-transparent z-0 group-last:hidden" />

                                    <div className="absolute -left-1.5 top-1.5 md:left-0 md:top-[1px] w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#f98825] z-10 group-hover:bg-[#3cb3a6] group-hover:scale-[1.8] transition-all duration-500 shadow-[0_0_20px_rgba(249,136,37,0.6)]" />

                                    <div className="pl-8 md:pl-0 border-l-[3px] border-dashed border-white/10 md:border-l-0 ml-0.5 md:ml-0 h-full cursor-pointer relative z-20">
                                        <div className="text-[#3cb3a6] text-3xl font-black tracking-widest mb-2 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(60,179,166,0.3)]">{m.year}</div>
                                        <h6 className="text-white text-xl sm:text-2xl font-bold leading-tight mb-3 group-hover:text-[#f98825] transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{m.title}</h6>
                                        <p className="text-white/60 text-sm sm:text-base leading-relaxed pr-4">{m.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
