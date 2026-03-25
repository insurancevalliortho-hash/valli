"use client";

import { motion } from "framer-motion";
import { Clock, HeartHandshake, ShieldCheck } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

                    {/* Left Side: Images & Graphics */}
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                                alt="Hospital Exterior"
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00333c]/80 via-transparent to-transparent mix-blend-multiply" />

                            {/* Floating Stats Badge */}
                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[200px] border border-white/40">
                                <h4 className="text-4xl font-black text-[#f98825] mb-1">20+</h4>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#40484a] leading-tight">Years of Healing Legacy</p>
                            </div>
                        </motion.div>

                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c3efff]/40 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#f98825] border border-[#f98825]/20 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                                About Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#00333c] leading-[1.1] tracking-tight mb-8">
                                A Trusted Center for <br />
                                <span className="text-[#f98825]">Complex Medical Interventions</span>
                            </h2>
                            <p className="text-[#40484a] font-medium text-lg leading-relaxed mb-6">
                                Located in the heart of Salem at Meyyanoor Main Road, Valli Super Speciality Hospital is a premier healthcare institution dedicated to delivering advanced medical treatments. With a legacy of over two decades, we specialize heavily in orthopedics, sports medicine, and trauma care.
                            </p>
                            <p className="text-[#40484a] font-medium text-lg leading-relaxed mb-10">
                                We believe that medical expertise is most effective when paired with kindness, clear communication, and a patient-centric environment, strictly adhering to national protocols for affordable excellence.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white flex items-center justify-center text-[#f98825]">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#00333c] text-lg">24/7 Availability</h4>
                                        <p className="text-sm text-[#40484a] font-medium leading-loose mt-1">Round-the-clock emergency care, trauma support, and pharmacy.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white flex items-center justify-center text-[#f98825]">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#00333c] text-lg">Affordable Excellence</h4>
                                        <p className="text-sm text-[#40484a] font-medium leading-loose mt-1">World-class healthcare accessible to all sections of society.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start md:col-span-2 mt-2">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white flex items-center justify-center text-[#f98825]">
                                        <HeartHandshake className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#00333c] text-lg">Holistic Healing</h4>
                                        <p className="text-sm text-[#40484a] font-medium leading-loose mt-1">We focus on physiological, biomechanical, and emotional support for complete recovery.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
