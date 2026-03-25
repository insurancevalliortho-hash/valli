"use client";

import { motion } from "framer-motion";

const specialities = [
    {
        title: "Advanced Joint Care & Replacement",
        description: "Comprehensive, evidence-based treatments specializing in minimally invasive total knee and hip replacements for faster recovery.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
        colSpan: "col-span-1 md:col-span-8",
        rowSpan: "row-span-2",
        bg: "bg-gradient-to-br from-[#00333c] to-[#004b57]",
        text: "text-white",
        descText: "text-[#f5a623]",
        iconColor: "text-[#f98825]",
        border: "border border-white/10"
    },
    {
        title: "Sports Medicine & Arthroscopy",
        description: "Leading sports medicine center utilizing cutting-edge Arthroscopy for rapid healing of ligament and tendon damage.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        bg: "bg-white",
        text: "text-[#00333c]",
        descText: "text-[#40484a]",
        iconColor: "text-[#f98825]",
        border: "border border-[#bfc8ca]/30"
    },
    {
        title: "Trauma & Fracture Clinic",
        description: "State-of-the-art fracture clinic offering Painless Treatment using Ultrasound-guided nerve blocks.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        bg: "bg-[#ffdad6]",
        text: "text-[#93000a]",
        descText: "text-[#ba1a1a]/80",
        iconColor: "text-[#ba1a1a]",
        border: "border border-[#ba1a1a]/20"
    },
    {
        title: "Foot & Ankle Clinic",
        description: "Tackling complex foot problems. Utilizing advanced Pedoscan with Doppler Assessment to prevent complications.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />, // Metaphorical path
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        bg: "bg-white",
        text: "text-[#00333c]",
        descText: "text-[#40484a]",
        iconColor: "text-[#004b57]",
        border: "border border-[#bfc8ca]/30"
    },
    {
        title: "Back Pain & Spinal Disorders",
        description: "Comprehensive evaluation and modern therapeutic interventions for spinal disorders to live pain-free.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />,
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        bg: "bg-white",
        text: "text-[#00333c]",
        descText: "text-[#40484a]",
        iconColor: "text-[#f98825]",
        border: "border border-[#96d0de]/30"
    },
    {
        title: "Bone Cancer Treatment",
        description: "Compassionate, conservative, and surgical approach to musculoskeletal oncology with full support.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547" />,
        colSpan: "col-span-1 md:col-span-4",
        rowSpan: "row-span-1",
        bg: "bg-white",
        text: "text-[#00333c]",
        descText: "text-[#40484a]",
        iconColor: "text-[#004b57]",
        border: "border border-[#bfc8ca]/30"
    },
    {
        title: "Paediatric Orthopaedics",
        description: "Gentle, specialized care designed specifically for childhood orthopaedic issues and congenital deformities.",
        iconBody: <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
        colSpan: "col-span-1 md:col-span-12",
        rowSpan: "row-span-1",
        bg: "bg-gradient-to-r from-[#ebfdfc] to-[#ffffff]",
        text: "text-[#00333c]",
        descText: "text-[#40484a]",
        iconColor: "text-[#f98825]",
        border: "border border-[#bfc8ca]/40"
    }
];

export default function SpecialityGrid() {
    return (
        <section id="specialities" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#d4e6e5] text-[#064e5a] text-xs font-bold tracking-widest uppercase mb-4">
                            Departments
                        </span>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-[#00333c] leading-[1.1] tracking-tight">
                            Centers of <span className="text-[#f98825]">Excellence</span>
                        </h2>
                    </div>
                    <p className="text-lg text-[#40484a] max-w-sm md:text-right font-medium">
                        World-class specialists utilizing cutting-edge technology for precise diagnostics and holistic care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
                    {specialities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500
                                ${item.colSpan} ${item.rowSpan} ${item.bg} ${item.border}
                            `}
                        >
                            {/* Giant faded watermark SVG */}
                            <svg
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-[2s] pointer-events-none ${item.iconColor}`}
                                viewBox="0 0 24 24" fill="currentColor"
                            >
                                {item.iconBody}
                            </svg>

                            {/* Top row: Icon & Arrow */}
                            <div className="flex justify-between items-start relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center 
                                    ${item.bg === 'bg-white' ? 'bg-white shadow-inner' : 'bg-white/10 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.1)]'}`}>
                                    <svg className={`w-7 h-7 ${item.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        {item.iconBody}
                                    </svg>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500
                                    ${item.bg === 'bg-white' ? 'bg-white text-[#004b57]' : 'bg-white/20 text-white backdrop-blur-md'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>

                            {/* Bottom row: Text */}
                            <div className="relative z-10 mt-auto pt-6 group-hover:-translate-y-2 transition-transform duration-500">
                                <h3 className={`text-2xl md:text-3xl font-bold mb-3 tracking-tight ${item.text}`}>
                                    {item.title}
                                </h3>
                                <p className={`font-medium leading-relaxed ${item.descText}`}>
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background ambient light */}
            <div className="absolute top-1/3 -right-[20%] w-[50%] h-[50%] bg-[#b2ecfa]/30 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-[#f98825]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
