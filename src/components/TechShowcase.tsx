"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const facilities = [
    {
        title: "Advanced Emergency Room",
        description: "Equipped with an Advanced Trauma Life Support facility, ready to handle all critical and emergency cases 24/7 with immediate response protocols.",
        img: "https://picsum.photos/seed/hosp-er/1400/900",
        tag: "24/7 Rapid Response",
        accent: "#f98825",
        number: "01",
    },
    {
        title: "Sports Physiotherapy & Rehab",
        description: "Personalized exercise and diet plans (including Genetic Testing for athletes) to restore mobility, enhance performance, and prevent future injuries.",
        img: "https://picsum.photos/seed/hospital/1400/900",
        tag: "Elite Recovery",
        accent: "#3cb3a6",
        number: "02",
    },
    {
        title: "24/7 In-House Pharmacy",
        description: "Fully stocked with essential medicines and specialized medical supplies, catering to both in-patients and out-patients at all times.",
        img: "https://picsum.photos/seed/hosp-pharmacy/1400/900",
        tag: "Always Accessible",
        accent: "#f98825",
        number: "03",
    },
    {
        title: "Strict Sterilization Protocols",
        description: "We pride ourselves on maintaining the highest standards of clinical cleanliness and hygiene, frequently praised by patients.",
        img: "https://picsum.photos/seed/hosp-sterile/1400/900",
        tag: "Ultra-Hygienic",
        accent: "#3cb3a6",
        number: "04",
    },
];

function FacilityRow({ fac, idx }: { fac: typeof facilities[0]; idx: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
    const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

    const isEven = idx % 2 === 0;

    return (
        <div ref={rowRef} className="relative flex flex-col lg:flex-row min-h-[70vh] overflow-hidden">

            {/* Image half */}
            <motion.div
                className={`relative w-full lg:w-[55%] min-h-[50vw] lg:min-h-[70vh] overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}
            >
                {/* Rotating corner diamond */}
                <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 45 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute ${isEven ? "top-8 right-8" : "top-8 left-8"} w-20 h-20 rounded-2xl z-20 shadow-xl`}
                    style={{ backgroundColor: fac.accent }}
                />
                <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 45 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute ${isEven ? "top-[4.5rem] right-[4.5rem]" : "top-[4.5rem] left-[4.5rem]"} w-12 h-12 rounded-xl z-20 opacity-70`}
                    style={{ backgroundColor: idx % 2 === 0 ? "#3cb3a6" : "#f98825" }}
                />

                {/* Parallax image */}
                <motion.div style={{ scale: imgScale }} className="absolute inset-0">
                    <img
                        src={fac.img}
                        alt={fac.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient towards text side */}
                <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-[#f5f7f8]/10 to-[#f5f7f8]`} />
                {/* Bottom gradient for mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f7f8] via-transparent to-transparent lg:hidden" />

                {/* Tag pill */}
                <div className="absolute bottom-6 left-6 z-10">
                    <span
                        className="inline-flex items-center gap-2 text-white text-[10px] uppercase font-black tracking-widest px-4 py-2 rounded-full backdrop-blur-md border border-white/25 shadow-lg"
                        style={{ backgroundColor: `${fac.accent}cc` }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {fac.tag}
                    </span>
                </div>
            </motion.div>

            {/* Text half */}
            <div className={`relative w-full lg:w-[45%] bg-[#f5f7f8] flex items-center px-8 md:px-12 lg:px-16 py-14 lg:py-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>

                {/* Background ring decoration */}
                <div
                    className={`absolute ${isEven ? "-right-16" : "-left-16"} top-1/2 -translate-y-1/2 w-72 h-72 rounded-[4rem] rotate-45 pointer-events-none border-2`}
                    style={{ borderColor: `${fac.accent}18` }}
                />

                <motion.div style={{ y: textY }} className="relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Giant number watermark */}
                        <div
                            className="text-[7rem] font-black leading-none select-none pointer-events-none mb-2 -ml-2 opacity-[0.07]"
                            style={{ color: fac.accent }}
                        >
                            {fac.number}
                        </div>

                        <h3 className="text-3xl md:text-4xl xl:text-[2.7rem] font-black text-[#00333c] tracking-tight leading-[1.1] mb-5">
                            {fac.title}
                        </h3>
                        <p className="text-[#40484a] font-medium text-base md:text-lg leading-relaxed mb-8 max-w-md">
                            {fac.description}
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 font-bold text-sm tracking-wide transition-all duration-200 group"
                            style={{ color: fac.accent }}
                        >
                            Learn More
                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default function TechShowcase() {
    return (
        <section id="facilities" className="bg-[#f5f7f8] text-[#0e1e1e]">

            {/* Section header */}
            <div className="container mx-auto px-6 md:px-12 pt-24 pb-16 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f98825]/10 text-[#f98825] border border-[#f98825]/20 text-xs font-bold tracking-[0.2em] uppercase mb-6"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                    Infrastructure
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-5xl xl:text-6xl font-black text-[#00333c] tracking-tight leading-[1.07] mb-5"
                >
                    State-of-the-Art <span className="text-[#f98825]">Facilities</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18, duration: 0.8 }}
                    className="text-[#40484a] font-medium text-lg max-w-xl mx-auto"
                >
                    Equipped with modern infrastructure to guarantee maximum safety, precise treatments, and uncompromising comfort.
                </motion.p>
            </div>

            {/* Alternating rows — no sticky, no overflow issues */}
            <div className="flex flex-col">
                {facilities.map((fac, idx) => (
                    <FacilityRow key={fac.number} fac={fac} idx={idx} />
                ))}
            </div>


        </section>
    );
}
