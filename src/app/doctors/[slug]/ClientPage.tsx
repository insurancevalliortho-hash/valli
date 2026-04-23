"use client";

import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SmoothScroll from "../../../components/SmoothScroll";
import MagneticCursor from "../../../components/MagneticCursor";
import { Doctor } from "../../../data/doctors";

export default function DoctorClientPage({ doctor }: { doctor: Doctor }) {
    const creds = doctor.qualifications.split(", ").map(c => c.trim()).filter(Boolean);

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-20 bg-[#f9fafb] min-h-[40vh] flex items-center">
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                        <a href="/doctors" className="inline-flex items-center gap-2 text-[#004b57]/60 hover:text-[#004b57] text-sm transition-colors font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Back to Doctors
                        </a>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-4xl md:text-6xl font-black text-[#00333c] tracking-tight mb-4">
                        {doctor.name}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-[#004b57] max-w-2xl font-medium">
                        {doctor.department}
                    </motion.p>
                </div>
            </section>

            {/* Profile Section */}
            <section className="bg-white py-10 md:py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#001f25] border border-white/10 shadow-2xl">
                        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#f98825] rounded-[2rem] rotate-45 opacity-20 pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#3cb3a6] rounded-[1.8rem] rotate-45 opacity-15 pointer-events-none" />
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-[400px] shrink-0 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#004b57] via-[#f98825]/30 to-[#3cb3a6]/50" />
                                <div className="relative h-96 lg:h-full min-h-[500px]">
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top opacity-90 mix-blend-luminosity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#001f25]/90 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001825]/40 hidden lg:block" />
                                </div>
                                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                                    className="absolute bottom-5 left-5 right-5 bg-[#001f25]/80 backdrop-blur-xl border border-white/15 rounded-2xl px-5 py-4">
                                    <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{doctor.shortDescription}</div>
                                    <div className="text-white font-black text-lg mt-1">{doctor.name}</div>
                                </motion.div>
                            </div>
                            <div className="flex-1 px-8 md:px-12 py-10 md:py-16 flex flex-col justify-center gap-8">
                                <div>
                                    <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
                                        About {doctor.name}
                                    </h2>
                                    <p className="text-[#f98825] font-semibold text-lg mt-2">{doctor.department}</p>
                                </div>
                                
                                <div className="py-6 border-y border-white/10">
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Qualifications</div>
                                    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="flex flex-wrap gap-2">
                                        {creds.map((c) => (
                                            <motion.span key={c} variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }} className="bg-white/7 border border-white/12 text-white/80 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                                                {c}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                                
                                <div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Professional Biography</div>
                                    <p className="text-white/70 text-lg leading-relaxed font-medium">
                                        {doctor.description}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a href="/book-appointment" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm shadow-[0_6px_20px_rgba(249,136,37,0.35)] hover:bg-[#e0751e] hover:-translate-y-0.5 transform transition-all duration-200 text-center">
                                        Book a Consultation →
                                    </a>
                                    <a href="tel:+919003417111" className="bg-white/10 hover:bg-white/20 text-white border border-white/15 px-8 py-4 rounded-full font-bold text-sm transition-colors text-center">
                                        Call Directly
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </SmoothScroll>
    );
}
