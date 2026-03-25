"use client";

import { motion } from "framer-motion";

export default function SurgeonProfile() {
    return (
        <section className="py-24 bg-[#001f25] relative overflow-hidden text-white">
            {/* Dark elegant backdrop matching the deep teal branding */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00333c]/40 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f98825]/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Portrait Frame */}
                    <div className="w-full lg:w-5/12 order-2 lg:order-1 relative">
                        {/* Immersive layered frame */}
                        <div className="relative aspect-[3/4] md:aspect-[4/5] max-w-md mx-auto z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-gradient-to-tl from-[#f98825] to-[#f98825] rounded-[2.5rem] -z-10"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-gray-200 relative group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200" // Placeholder Surgeon Portrait
                                    alt="Dr. T. Natanasabapathy"
                                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-[2s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#001f25] via-transparent to-transparent opacity-80" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Biography Content */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-[#f98825] border border-white/10 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
                                Meet Our Chief Surgeon
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                                Dr. T. Natanasabapathy
                            </h2>
                            <h3 className="text-xl md:text-2xl text-[#f5a623] font-bold tracking-tight mb-8 border-b border-white/10 pb-6 inline-block">
                                M.S. Ortho, FIAS, Fellow in Joint Replacement <br />
                                <span className="font-normal text-white/70 text-lg mt-2 inline-block">Chairman & Chief Orthopedic Surgeon</span>
                            </h3>

                            <p className="text-white/80 font-medium text-lg leading-relaxed mb-6">
                                With over 21 years of dedicated medical experience, Dr. Natanasabapathy is celebrated as one of Salem's most trusted and skilled orthopedic surgeons. Known affectionately by his patients as a life-saver, he approaches every case with intense precision and deep empathy.
                            </p>

                            <p className="text-white/80 font-medium text-lg leading-relaxed mb-10">
                                He specializes in complex joint replacements, arthroscopy, and severe trauma reconstruction. Under his visionary leadership, Valli Super Speciality Hospital has achieved remarkable milestones in performing successful, minimally invasive surgeries with dramatically accelerated recovery times.
                            </p>

                            {/* Signature / Accent */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-12">
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-[#f98825] mb-1">5K+</div>
                                        <div className="text-[10px] uppercase tracking-widest text-[#f5a623] font-bold">Surgeries <br /> Performed</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-[#f98825] mb-1">21+</div>
                                        <div className="text-[10px] uppercase tracking-widest text-[#f5a623] font-bold">Years of <br /> Excellence</div>
                                    </div>
                                </div>

                                <button className="hidden md:flex items-center gap-3 bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl hover:bg-[#f98825] hover:text-[#001f25] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    Book Consultation
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
