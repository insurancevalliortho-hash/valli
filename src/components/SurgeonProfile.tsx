"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const creds = ["M.S. Ortho", "FIAS", "Joint Replacement", "Arthroscopy", "Trauma & Spine"];

const stats = [
    { value: "21+", label: "Years" },
    { value: "5K+", label: "Surgeries" },
    { value: "98%", label: "Success" },
    { value: "15+", label: "Specialities" },
];

const milestones = [
    { year: "2003", title: "Founded Valli Super Speciality Hospital" },
    { year: "2010", title: "Pioneered minimally invasive joint replacement in Salem" },
    { year: "2018", title: "Reached 3,000 successful knee replacements" },
    { year: "2024", title: "Best Orthopedic Surgeon — Tamil Nadu" },
];

export default function SurgeonProfile() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const shapeY1 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
    const shapeY2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

    return (
        <section ref={ref} id="surgeon" className="relative bg-[#001f25] py-20 md:py-28 overflow-hidden text-white">

            {/* Background shapes */}
            <motion.div style={{ y: shapeY1 }}
                className="absolute -top-32 -right-24 w-[36vw] h-[36vw] max-w-[440px] max-h-[440px] bg-[#f98825]/10 rounded-[5rem] rotate-45 pointer-events-none" />
            <motion.div style={{ y: shapeY2 }}
                className="absolute -bottom-32 -left-16 w-[30vw] h-[30vw] max-w-[380px] max-h-[380px] bg-[#3cb3a6]/8 rounded-[4rem] rotate-45 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Meet Our Chief Surgeon
                    </span>
                </motion.div>

                {/* ── MAIN CARD ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.05] backdrop-blur-md overflow-hidden"
                >
                    {/* Corner diamond accents */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f98825] rounded-[2rem] rotate-45 opacity-20 pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#3cb3a6] rounded-[1.8rem] rotate-45 opacity-15 pointer-events-none" />

                    <div className="flex flex-col md:flex-row">

                        {/* ── Portrait column ── */}
                        <div className="md:w-[320px] lg:w-[360px] shrink-0 relative">
                            {/* Geometric backing */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#004b57] via-[#f98825]/40 to-[#3cb3a6]/60" />

                            <div className="relative h-72 md:h-full min-h-[280px]">
                                <img
                                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=90&w=700"
                                    alt="Dr. T. Natanasabapathy"
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Gradient bottom fade on image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#001f25]/60 via-transparent to-transparent" />
                                {/* Right fade toward content */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001825]/40 hidden md:block" />
                            </div>

                            {/* Floating badge on image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute bottom-4 left-4 right-4 bg-[#001f25]/80 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3"
                            >
                                <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Chairman & Chief</div>
                                <div className="text-white font-black text-sm mt-0.5">Orthopedic Surgeon</div>
                            </motion.div>
                        </div>

                        {/* ── Content column ── */}
                        <div className="flex-1 px-7 md:px-10 py-8 md:py-10 flex flex-col justify-between gap-7">

                            {/* Name + title */}
                            <div>
                                <div className="overflow-hidden mb-1">
                                    <motion.h2
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: "0%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-2xl md:text-3xl xl:text-[2.2rem] font-black text-white tracking-tight leading-tight"
                                    >
                                        Dr. T. Natanasabapathy
                                    </motion.h2>
                                </div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="text-[#f98825] font-semibold text-sm md:text-base"
                                >
                                    Chairman & Chief Orthopedic Surgeon, Valli Hospital
                                </motion.p>
                            </div>

                            {/* Stats row */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                                className="grid grid-cols-4 gap-3 py-5 border-y border-white/10"
                            >
                                {stats.map((s) => (
                                    <motion.div
                                        key={s.label}
                                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                                        className="text-center"
                                    >
                                        <div className="text-xl md:text-2xl font-black text-[#f98825] leading-none">{s.value}</div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mt-1">{s.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Bio */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="text-white/60 text-sm md:text-base leading-relaxed"
                            >
                                With 21+ years of dedicated practice, Dr. Natanasabapathy specializes in complex joint replacements, arthroscopy, and severe trauma reconstruction — celebrated as one of Salem's most trusted orthopedic surgeons.
                            </motion.p>

                            {/* Credential pills */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                                className="flex flex-wrap gap-2"
                            >
                                {creds.map((c) => (
                                    <motion.span
                                        key={c}
                                        variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                                        className="bg-white/7 border border-white/12 text-white/65 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                                    >
                                        {c}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <button className="bg-[#f98825] text-white px-7 py-3 rounded-full font-bold text-sm shadow-[0_6px_20px_rgba(249,136,37,0.35)] hover:bg-[#e0751e] hover:-translate-y-0.5 transform transition-all duration-200">
                                    Book a Consultation →
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Timeline strip below card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {milestones.map((m, i) => (
                        <motion.div
                            key={m.year}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="bg-white/[0.04] border border-white/8 rounded-2xl px-5 py-4"
                        >
                            <div className="text-[#f98825] text-xs font-black uppercase tracking-widest mb-1">{m.year}</div>
                            <div className="text-white/60 text-sm font-medium leading-snug">{m.title}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
