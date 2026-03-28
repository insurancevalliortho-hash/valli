"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const shapeY1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const shapeY2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    return (
        <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>

            {/* ── Hero-matching geometric background shapes ── */}
            <motion.div
                style={{ y: shapeY1 }}
                className="absolute -top-24 -left-24 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-[#004b57]/6 rounded-[4rem] rotate-45 pointer-events-none"
            />
            <motion.div
                style={{ y: shapeY2 }}
                className="absolute -bottom-24 -right-20 w-[30vw] h-[30vw] max-w-[360px] max-h-[360px] bg-[#f98825]/8 rounded-[3.5rem] rotate-45 pointer-events-none"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] border border-[#004b57]/5 rounded-[6rem] rotate-45 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* ── Left: Geometric image panel (mirroring Hero shapes) ── */}
                    <div className="w-full lg:w-[46%] relative shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[4/5] max-w-[480px] mx-auto lg:mx-0"
                        >
                            {/* Layered colored backing squares — same feel as Hero */}
                            <motion.div
                                initial={{ rotate: 40, scale: 0.8, opacity: 0 }}
                                whileInView={{ rotate: 8, scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="absolute -bottom-6 -right-6 w-[90%] h-[90%] bg-[#f98825] rounded-[2.5rem] z-0 shadow-xl"
                            />
                            <motion.div
                                initial={{ rotate: -35, scale: 0.8, opacity: 0 }}
                                whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="absolute -top-6 -left-6 w-[90%] h-[90%] bg-[#3cb3a6] rounded-[2.5rem] z-0 shadow-lg"
                            />

                            {/* Main image card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
                            >
                                <img
                                    src="/hospital.png"
                                    alt="Valli Super Speciality Hospital"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00333c]/85 via-[#00333c]/20 to-transparent" />

                                {/* Floating stat badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/50 max-w-[190px]"
                                >
                                    <h4 className="text-4xl font-black text-[#f98825] mb-1 leading-none">20+</h4>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#40484a] leading-tight mt-1">Years of Healing Legacy</p>
                                </motion.div>

                                {/* Top-right corner accent */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.7 }}
                                    className="absolute top-6 right-6 bg-[#f98825] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                                >
                                    NABH Accredited
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Right: Content ── */}
                    <div className="w-full lg:w-[54%] flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f98825]/10 text-[#f98825] border border-[#f98825]/20 text-xs font-bold tracking-[0.18em] uppercase mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                                About Us
                            </span>

                            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-[#00333c] leading-[1.07] tracking-tight mb-8">
                                A Trusted Center for{" "}
                                <br className="hidden md:block" />
                                <span className="text-[#f98825]">Complex Medical</span>
                                <br />
                                Interventions
                            </h2>

                            <p className="text-[#40484a] font-medium text-lg leading-relaxed mb-5">
                                Located in the heart of Salem at Meyyanoor Main Road, Valli Super Speciality Hospital is a premier healthcare institution dedicated to delivering advanced medical treatments. With a legacy of over two decades, we specialize heavily in orthopedics, sports medicine, and trauma care.
                            </p>
                            <p className="text-[#40484a] font-medium text-lg leading-relaxed mb-10">
                                We believe that medical expertise is most effective when paired with kindness, clear communication, and a patient-centric environment, strictly adhering to national protocols for affordable excellence.
                            </p>

                            {/* Pillar cards */}
                            <div className="flex flex-col gap-4">
                                {pillars.map((p, i) => (
                                    <motion.div
                                        key={p.title}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                                        className="group flex items-start gap-5 p-5 rounded-2xl border border-[#004b57]/8 bg-white hover:bg-[#004b57] hover:border-[#004b57] transition-all duration-400 shadow-sm hover:shadow-xl cursor-default"
                                    >
                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f98825]/10 group-hover:bg-white/15 flex items-center justify-center text-[#f98825] group-hover:text-[#f98825] transition-colors duration-300">
                                            {p.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#00333c] group-hover:text-white text-base mb-0.5 transition-colors duration-300">{p.title}</h4>
                                            <p className="text-sm text-[#40484a] group-hover:text-white/70 font-medium leading-relaxed transition-colors duration-300">{p.desc}</p>
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
