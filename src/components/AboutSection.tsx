"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Clock, HeartHandshake, ShieldCheck } from "lucide-react";

const pillars = [
    {
        icon: <Clock className="w-5 h-5" />,
        title: "24/7 Availability",
        desc: "Round-the-clock emergency care, trauma support, and pharmacy.",
    },
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Affordable Excellence",
        desc: "World-class healthcare accessible to all sections of society.",
    },
    {
        icon: <HeartHandshake className="w-5 h-5" />,
        title: "Holistic Healing",
        desc: "Physiological, biomechanical, and emotional support for complete recovery.",
    },
];

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120, mass: 0.05 });

    // Background shapes parallax
    const shapeY1 = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
    const shapeY2 = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

    // Image & Glass layers parallax
    const imageScale = useTransform(smoothProgress, [0.2, 0.8], [0.95, 1.05]);
    const glassRotate1 = useTransform(smoothProgress, [0.2, 0.8], [30, 8]);
    const glassRotate2 = useTransform(smoothProgress, [0.2, 0.8], [-25, -5]);

    // Floating badge parallax
    const badgeY = useTransform(smoothProgress, [0.3, 0.7], [30, -20]);

    return (
        <section id="about" className="py-24 md:py-36 bg-[#f8fbfa] relative overflow-hidden" ref={containerRef}>

            {/* --- Ambient Background Glows --- */}
            <div className="absolute top-[20%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#3cb3a6]/8 rounded-full blur-[120px] pointer-events-none will-change-transform" />
            <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-[#f98825]/8 rounded-full blur-[100px] pointer-events-none will-change-transform" />

            {/* --- Geometric wireframe shapes --- */}
            <motion.div
                style={{ y: shapeY1 }}
                className="absolute top-0 right-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] border-[1.5px] border-[#004b57]/5 rounded-[4rem] rotate-12 pointer-events-none will-change-transform"
            />
            <motion.div
                style={{ y: shapeY2 }}
                className="absolute bottom-[-10%] left-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] border-[1.5px] border-[#f98825]/10 rounded-[3.5rem] -rotate-12 pointer-events-none will-change-transform"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* ── Left: Advanced Image & Glassmorphism Panel ── */}
                    <div className="w-full lg:w-[46%] relative shrink-0 perspective-[1000px]">
                        <motion.div
                            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[4/5] max-w-[500px] mx-auto lg:mx-0 will-change-transform"
                        >
                            {/* Animated Glass Layer 1 */}
                            <motion.div
                                style={{ rotate: glassRotate1 }}
                                className="absolute -inset-2 sm:-inset-4 md:-inset-8 bg-gradient-to-br from-[#f98825]/80 to-[#f98825]/40 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_40px_rgba(249,136,37,0.2)] border border-white/30 z-0 will-change-transform origin-center"
                            />

                            {/* Animated Glass Layer 2 */}
                            <motion.div
                                style={{ rotate: glassRotate2 }}
                                className="absolute -inset-2 sm:-inset-4 md:-inset-8 bg-gradient-to-tr from-[#004b57]/80 to-[#3cb3a6]/60 backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,75,87,0.25)] border border-white/20 z-0 will-change-transform origin-center"
                            />

                            {/* Main High-Fidelity Image Element */}
                            <motion.div
                                style={{ scale: imageScale }}
                                className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl z-10 will-change-transform"
                            >
                                <img
                                    src="/hospital.png"
                                    alt="Valli Super Speciality Hospital"
                                    className="object-cover w-full h-full contrast-[1.1] saturate-105"
                                />
                                {/* Cinematic overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00333c]/90 via-[#00333c]/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#004b57]/40 via-transparent to-transparent opacity-60" />

                                {/* Top-right Tag */}
                                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl border border-white/40 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                    NABH Accredited
                                </div>
                            </motion.div>

                            {/* Immersive Floating Stat Badge */}
                            <motion.div
                                style={{ y: badgeY }}
                                className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:-left-6 md:-left-12 bg-white/80 backdrop-blur-2xl p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,51,60,0.15)] border border-white max-w-[180px] sm:max-w-[220px] isolate z-20 will-change-transform"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-white/20 rounded-[1.5rem] sm:rounded-[2rem] -z-10" />
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f98825] to-[#e0751e] shadow-lg flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-4xl lg:text-5xl font-black text-[#004b57] leading-none drop-shadow-sm">20<span className="text-[#f98825]">+</span></h4>
                                </div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-[#40484a] leading-relaxed mt-2">Years of Healing Legacy</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Right: Premium Content ── */}
                    <div className="w-full lg:w-[54%] flex flex-col justify-center mt-12 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Section Label */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#004b57]/10 shadow-sm text-xs font-black tracking-widest uppercase mb-8"
                            >
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f98825] opacity-50" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f98825]" />
                                </div>
                                <span className="text-[#004b57]">About Us</span>
                            </motion.div>

                            {/* Elevated Headline */}
                            <h2 className="text-4xl sm:text-5xl xl:text-[4rem] font-black text-[#004b57] leading-[1.05] tracking-tight mb-8">
                                A Trusted Center for
                                <br />
                                <span className="text-[#f98825]">Complex Medical </span>
                                <br className="hidden md:block" />
                                Interventions
                            </h2>

                            {/* Polished Paragraphs */}
                            <div className="space-y-6 mb-12">
                                <p className="text-[#00333c] font-semibold text-base md:text-lg leading-relaxed max-w-2xl bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                                    Located in the heart of Salem at Opposite to Sri Vidya Mandir School, Meyyanoor Road, Valli Super Speciality Hospital is a premier healthcare institution dedicated to delivering advanced medical treatments. With a legacy of over two decades, we specialize heavily in orthopedics, sports medicine, and trauma care.
                                </p>
                                <p className="text-[#40484a]/90 font-medium text-base md:text-lg leading-relaxed max-w-xl px-4 border-l-[3px] border-[#3cb3a6]">
                                    We believe that medical expertise is most effective when paired with kindness, clear communication, and a patient-centric environment, strictly adhering to national protocols for affordable excellence.
                                </p>
                            </div>

                            {/* Advanced Pillar Cards */}
                            <div className="flex flex-col gap-4 max-w-2xl">
                                {pillars.map((p, i) => (
                                    <motion.div
                                        key={p.title}
                                        initial={{ opacity: 0, x: 40, filter: "blur(5px)" }}
                                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                        className="group relative flex items-start gap-5 p-6 rounded-[1.5rem] bg-white border border-[#004b57]/5 shadow-[0_10px_30px_rgba(0,51,60,0.03)] hover:shadow-[0_20px_50px_rgba(0,75,87,0.12)] hover:-translate-y-1 transition-all duration-500 cursor-default overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#004b57]/[0.02] to-[#3cb3a6]/5 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700 ease-out" />

                                        <div className="relative z-10 w-14 h-14 shrink-0 rounded-[1.2rem] bg-gradient-to-br from-[#f8fbfa] to-[#e8f2f0] border border-[#004b57]/10 flex items-center justify-center text-[#3cb3a6] group-hover:scale-110 group-hover:text-[#f98825] group-hover:border-[#f98825]/30 group-hover:shadow-[0_8px_20px_rgba(249,136,37,0.15)] transition-all duration-500">
                                            {p.icon}
                                        </div>
                                        <div className="relative z-10 pt-1.5">
                                            <h4 className="font-black text-[#004b57] text-lg lg:text-xl mb-1.5 tracking-tight group-hover:text-[#f98825] transition-colors">{p.title}</h4>
                                            <p className="text-sm font-medium text-[#40484a]/80 leading-relaxed group-hover:text-[#00333c] transition-colors">{p.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Organic SVG wave bottom divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0 60 C360 20 1080 60 1440 30 L1440 60 L0 60Z" fill="#001f25" opacity="0.03" />
                </svg>
            </div>
        </section>
    );
}
