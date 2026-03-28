"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const specialities = [
    {
        title: "Advanced Joint Care & Replacement",
        description: "Comprehensive, evidence-based treatments specializing in minimally invasive total knee and hip replacements for faster recovery.",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#00333c] to-[#004b57]",
        textColor: "text-white",
        descColor: "text-[#f5a623]",
        colSpan: "col-span-1 md:col-span-8",
        rowSpan: "row-span-2",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        tag: "Flagship Department",
        dark: true,
    },
    {
        title: "Sports Medicine & Arthroscopy",
        description: "Cutting-edge arthroscopy for rapid healing of ligament and tendon damage.",
        accentColor: "#f98825",
        bg: "bg-white",
        textColor: "text-[#00333c]",
        descColor: "text-[#40484a]",
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        tag: "Elite Recovery",
        dark: false,
    },
    {
        title: "Trauma & Fracture Clinic",
        description: "Painless treatment using Ultrasound-guided nerve blocks for all fracture cases.",
        accentColor: "#ba1a1a",
        bg: "bg-[#ffdad6]",
        textColor: "text-[#93000a]",
        descColor: "text-[#ba1a1a]/80",
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        tag: "Emergency Ready",
        dark: false,
    },
    {
        title: "Foot & Ankle Clinic",
        description: "Advanced Pedoscan with Doppler Assessment to prevent complications.",
        accentColor: "#004b57",
        bg: "bg-white",
        textColor: "text-[#00333c]",
        descColor: "text-[#40484a]",
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
        tag: "Precision Diagnostics",
        dark: false,
    },
    {
        title: "Back Pain & Spinal Disorders",
        description: "Modern therapeutic interventions for spinal disorders to help you live pain-free.",
        accentColor: "#f98825",
        bg: "bg-white",
        textColor: "text-[#00333c]",
        descColor: "text-[#40484a]",
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        ),
        tag: "Pain Management",
        dark: false,
    },
    {
        title: "Bone Cancer Treatment",
        description: "Compassionate, conservative, and surgical approach to musculoskeletal oncology.",
        accentColor: "#004b57",
        bg: "bg-white",
        textColor: "text-[#00333c]",
        descColor: "text-[#40484a]",
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        tag: "Full Support",
        dark: false,
    },
    {
        title: "Paediatric Orthopaedics",
        description: "Gentle, specialized care for childhood orthopaedic issues and congenital deformities — tailored exactly for children's unique needs.",
        accentColor: "#f98825",
        bg: "bg-gradient-to-r from-[#ebfdfc] to-[#ffffff]",
        textColor: "text-[#00333c]",
        descColor: "text-[#40484a]",
        colSpan: "col-span-1 md:col-span-12",
        rowSpan: "row-span-1",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        tag: "Child-First Care",
        dark: false,
    },
];

export default function SpecialityGrid() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgShapeY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    return (
        <section id="specialities" ref={ref} className="py-24 md:py-32 bg-[#f9fafb] relative overflow-hidden">

            {/* ── Hero-language geometric background shapes ── */}
            <motion.div
                style={{ y: bgShapeY }}
                className="absolute top-0 right-[-15%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-[#f98825]/6 rounded-[5rem] rotate-45 pointer-events-none"
            />
            <div className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vw] max-w-[480px] max-h-[480px] bg-[#004b57]/5 rounded-[4.5rem] rotate-45 pointer-events-none" />
            {/* Dotted grid pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle, #004b57 1px, transparent 1px)",
                backgroundSize: "36px 36px",
                opacity: 0.04,
            }} />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            Departments
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-[#00333c] leading-[1.07] tracking-tight">
                            Centers of <span className="text-[#f98825]">Excellence</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="text-lg text-[#40484a] max-w-sm md:text-right font-medium leading-relaxed"
                    >
                        World-class specialists utilizing cutting-edge technology for precise diagnostics and holistic care.
                    </motion.p>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[260px]">
                    {specialities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6 }}
                            className={`group relative rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden cursor-pointer
                                shadow-sm hover:shadow-2xl transition-shadow duration-500
                                ${item.colSpan} ${item.rowSpan} ${item.bg}
                                border ${item.dark ? "border-white/10" : "border-[#e5eaeb]"}
                            `}
                        >
                            {/* Giant faded icon watermark */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] flex items-center justify-center pointer-events-none opacity-[0.035] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-[2s]"
                                style={{ color: item.accentColor }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full max-w-[200px] max-h-[200px]">
                                    {item.icon.props.children}
                                </svg>
                            </div>

                            {/* Rotating corner accent — Hero language */}
                            <div
                                className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl rotate-45 opacity-20 group-hover:opacity-35 group-hover:scale-125 transition-all duration-700"
                                style={{ backgroundColor: item.accentColor }}
                            />

                            {/* Top row */}
                            <div className="flex justify-between items-start relative z-10">
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm
                                        ${item.dark ? "bg-white/12 backdrop-blur-md" : "bg-white shadow-md"}`}
                                    style={{ color: item.accentColor }}
                                >
                                    {item.icon}
                                </div>
                                <span
                                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full
                                        ${item.dark ? "bg-white/10 text-white border border-white/15" : "bg-white text-[#40484a] border border-[#e5eaeb]"}`}
                                >
                                    {item.tag}
                                </span>
                            </div>

                            {/* Bottom row */}
                            <div className="relative z-10 mt-auto group-hover:-translate-y-2 transition-transform duration-500">
                                <h3 className={`text-2xl md:text-[1.7rem] font-black mb-3 tracking-tight leading-tight ${item.textColor}`}>
                                    {item.title}
                                </h3>
                                <p className={`font-medium leading-relaxed text-sm md:text-base ${item.descColor}`}>
                                    {item.description}
                                </p>
                            </div>

                            {/* Arrow on hover */}
                            <div
                                className={`absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-400
                                    ${item.dark ? "bg-white/20 text-white" : "text-white"}`}
                                style={item.dark ? {} : { backgroundColor: item.accentColor }}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
