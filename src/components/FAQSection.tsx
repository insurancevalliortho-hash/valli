"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQSchema } from "./seo/StructuredData";

const FAQ_ITEMS = [
    {
        question: "Which is the best orthopedic hospital in Salem?",
        answer: "Valli Super Speciality Hospital (formerly Valli Orthopedic and Sports Hospital) is widely recognized as the best orthopedic hospital in Salem, Tamil Nadu. The hospital features world-class infrastructure including class-100 laminar-flow modular OTs, a 10-bed advanced critical care ICU, a 24/7 laboratory, high-speed GE CT diagnostics, and full NABH safety accreditation."
    },
    {
        question: "Who is the best orthopedic doctor in Salem?",
        answer: "Dr. T. Natanasabapathy, Chairman & Chief Orthopedic Surgeon at Valli Super Speciality Hospital, is highly regarded as the best orthopedic doctor in Salem. With over 21 years of experience, 16,000+ successfully treated patients, and 5,000+ complex orthopedic surgeries, he specializes in high-precision knee replacements, spine surgery, trauma recovery, and advanced arthroscopic procedures."
    },
    {
        question: "Does Valli Hospital offer non-surgical treatments for joint and knee pain?",
        answer: "Yes, Valli Super Speciality Hospital is a center of excellence for both surgical and non-surgical joint care. We offer advanced conservative treatments including diagnostic & interventional ultrasound-guided PRP (Platelet-Rich Plasma) therapy, joint fluid injections, and comprehensive physical rehabilitation for knee pain, arthritis, and ligament injuries."
    },
    {
        question: "Is Valli Super Speciality Hospital equipped for 24/7 emergency trauma and fracture care?",
        answer: "Absolutely. Valli Hospital operates a state-of-the-art 24/7 trauma care and emergency resuscitation center in Salem. Our trauma teams are supported by in-house radiologists, anesthetists, high-speed GE CT scanners for rapid diagnostics, and ultrasound-guided block systems to ensure immediate, painless fracture stabilization."
    },
    {
        question: "What specialties and services are offered at Valli Hospital in Salem?",
        answer: "Valli Super Speciality Hospital offers elite care across multiple specialties including Joint Replacement (Arthroplasty), Arthroscopy & Sports Medicine, Back Pain & Spinal Surgery, Pediatric Orthopedics, Failed Surgery Corrections, general medicine, gastroenterology, and 24/7 diagnostics (radiology, biochemistry, and blood pharmacy services)."
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden border-t border-gray-100">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 left-[-10%] w-[35vw] h-[35vw] bg-[#3cb3a6]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Patient Information Hub
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-[#00333c] tracking-tight leading-tight"
                    >
                        Frequently Asked <span className="text-[#f98825]">Questions</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-[#40484a] text-sm md:text-base leading-relaxed font-semibold max-w-xl mx-auto"
                    >
                        Find clear, expert answers regarding Salem&apos;s leading orthopedic care, specialized surgical units, and medical treatments.
                    </motion.p>
                </div>

                {/* FAQ Accordion Grid */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, idx) => {
                        const isOpen = activeIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className={`bg-[#f9fafb] border rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,75,87,0.03)] ${
                                    isOpen ? "border-[#004b57]/30 bg-[#004b57]/[0.01]" : "border-[#e5eaeb]"
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between text-left p-6 md:p-8 font-black text-base md:text-lg text-[#00333c] hover:text-[#f98825] transition-colors gap-4"
                                    aria-expanded={isOpen}
                                    id={`faq-btn-${idx}`}
                                >
                                    <span>{item.question}</span>
                                    <span className={`w-8 h-8 rounded-full bg-[#004b57]/5 flex items-center justify-center text-[#004b57] shrink-0 transition-transform duration-300 ${
                                        isOpen ? "rotate-180 bg-[#f98825]/10 text-[#f98825]" : ""
                                    }`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 md:px-8 md:pb-8 text-[#40484a] text-sm md:text-base leading-relaxed font-semibold border-t border-[#e5eaeb]/50 pt-4">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Injected Schema Markup for Google rich snippet integration */}
            <FAQSchema questions={FAQ_ITEMS} />
        </section>
    );
}
