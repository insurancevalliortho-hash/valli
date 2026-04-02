"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const stats = [
    { value: "21+", label: "Years Experience" },
    { value: "5,000+", label: "Surgeries" },
    { value: "98%", label: "Success Rate" },
    { value: "15+", label: "Specialities" },
];

const creds = ["M.S. Orthopaedics", "FIAS", "Joint Replacement", "Arthroscopy Specialist", "Trauma & Spine", "Sports Medicine"];

const milestones = [
    { year: "2003", title: "Founded Valli Super Speciality Hospital in Salem" },
    { year: "2010", title: "Pioneered minimally invasive joint replacement in Salem" },
    { year: "2015", title: "First C-ARM guided arthroscopy in the district" },
    { year: "2018", title: "Reached 3,000 successful knee replacements" },
    { year: "2021", title: "Introduced ultrasound-guided nerve block for painless fracture care" },
    { year: "2024", title: "Awarded Best Orthopaedic Surgeon — Tamil Nadu" },
];

const awards = [
    { title: "Best Orthopaedic Surgeon", year: "2024", org: "Tamil Nadu Medical Excellence Awards" },
    { title: "Excellence in Joint Care", year: "2022", org: "Indian Orthopaedic Association" },
    { title: "Community Healthcare Leader", year: "2020", org: "Salem District Medical Board" },
    { title: "Innovation in Arthroscopy", year: "2019", org: "ISAS — Indian Society of Arthroscopy" },
];

const supportingTeam = [
    { name: "Dr. I. Vijayalakshmi", role: "Co-Founder & Director", specialty: "Hospital Administration & Patient Care Excellence", exp: "21+ years", initials: "IV" },
    { name: "Dr. Priya Raghunathan", role: "Senior Resident — Orthopaedics", specialty: "Fracture Management & Sports Medicine", exp: "6 years", initials: "PR" },
    { name: "Dr. Karthik Sundar", role: "Consultant — Spine & Pain", specialty: "Lumbar Disorders & Epidural Therapy", exp: "9 years", initials: "KS" },
    { name: "Dr. Meena Velankanni", role: "Consultant — Paediatric Ortho", specialty: "Club Foot, DDH & Scoliosis", exp: "8 years", initials: "MV" },
];

export default function DoctorsPage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-end bg-[#001f25] overflow-hidden pt-32 pb-20">
                <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-[45vw] h-[45vw] bg-[#f98825]/10 rounded-[6rem] rotate-12" />
                    <div className="absolute -bottom-20 -left-10 w-[35vw] h-[35vw] bg-[#004b57]/30 rounded-[5rem] rotate-45" />
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.03 }} />
                </motion.div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Home
                        </a>
                    </motion.div>
                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Our Surgeons
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Hands That<br /><span className="text-[#f98825]">Heal</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-xl text-white/60 max-w-xl leading-relaxed font-medium">
                        Led by our founders Dr. T. Natanasabapathy and Dr. I. Vijayalakshmi — our team brings decades of expertise and genuine care.
                    </motion.p>
                </div>
            </section>

            {/* Chief Surgeon Profile */}
            <section className="bg-white py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#001f25] border border-white/10">
                        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#f98825] rounded-[2rem] rotate-45 opacity-20 pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#3cb3a6] rounded-[1.8rem] rotate-45 opacity-15 pointer-events-none" />
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-[360px] shrink-0 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#004b57] via-[#f98825]/30 to-[#3cb3a6]/50" />
                                <div className="relative h-80 lg:h-full min-h-[400px]">
                                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=90&w=700" alt="Dr. T. Natanasabapathy" className="w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#001f25]/70 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001825]/40 hidden lg:block" />
                                </div>
                                <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                                    className="absolute bottom-5 left-5 right-5 bg-[#001f25]/80 backdrop-blur-xl border border-white/15 rounded-2xl px-5 py-4">
                                    <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Chairman & Chief</div>
                                    <div className="text-white font-black text-base mt-0.5">Orthopaedic Surgeon</div>
                                </motion.div>
                            </div>
                            <div className="flex-1 px-8 md:px-12 py-10 md:py-12 flex flex-col justify-between gap-8">
                                <div>
                                    <div className="overflow-hidden mb-2">
                                        <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-3xl md:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
                                            Dr. T. Natanasabapathy
                                        </motion.h2>
                                    </div>
                                    <p className="text-[#f98825] font-semibold text-base mt-1">Chairman & Chief Orthopaedic Surgeon, Valli Hospital</p>
                                </div>
                                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10">
                                    {stats.map((s) => (
                                        <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="text-center">
                                            <div className="text-2xl md:text-3xl font-black text-[#f98825] leading-none">{s.value}</div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mt-1">{s.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <p className="text-white/65 text-base leading-relaxed">
                                    With over 21 years of dedicated practice, Dr. T. Natanasabapathy has transformed orthopaedic care in Salem. His expertise spans complex joint replacements, arthroscopic surgery, and severe trauma reconstruction. A pioneer of minimally invasive techniques in the region, he built Valli Hospital into a center of genuine excellence — where every patient&apos;s path to recovery is met with precision, compassion, and innovation.
                                </p>
                                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="flex flex-wrap gap-2">
                                    {creds.map((c) => (
                                        <motion.span key={c} variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }} className="bg-white/7 border border-white/12 text-white/65 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                            {c}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a href="/book-appointment" className="bg-[#f98825] text-white px-7 py-3 rounded-full font-bold text-sm shadow-[0_6px_20px_rgba(249,136,37,0.35)] hover:bg-[#e0751e] hover:-translate-y-0.5 transform transition-all duration-200 text-center">
                                        Book a Consultation →
                                    </a>
                                    <a href="tel:+919003417111" className="bg-white/10 hover:bg-white/20 text-white border border-white/15 px-7 py-3 rounded-full font-bold text-sm transition-colors text-center">
                                        Call Directly
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-[#f9fafb] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />Career Journey
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#00333c] leading-tight tracking-tight">A Legacy of <span className="text-[#f98825]">Milestones</span></h2>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#e5eaeb]" />
                        <div className="space-y-10">
                            {milestones.map((m, i) => (
                                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: 0.05 * i }}
                                    className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#f98825] border-4 border-white shadow-md z-10" />
                                    <div className={`pl-16 md:pl-0 md:w-[45%] ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                                        <div className="text-[#f98825] text-xs font-black uppercase tracking-widest mb-1">{m.year}</div>
                                        <div className="text-[#00333c] font-semibold text-base">{m.title}</div>
                                    </div>
                                    <div className="hidden md:block md:w-[45%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />Recognition
                        </span>
                        <h2 className="text-4xl font-black text-[#00333c] tracking-tight">Awards & <span className="text-[#f98825]">Honours</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {awards.map((a, i) => (
                            <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}
                                className="flex items-start gap-5 bg-[#f9fafb] border border-[#e5eaeb] rounded-2xl p-6">
                                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825]">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#f98825] text-xs font-black uppercase tracking-widest mb-1">{a.year}</div>
                                    <div className="text-[#00333c] font-black text-base mb-1">{a.title}</div>
                                    <div className="text-[#40484a] text-sm font-medium">{a.org}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supporting Team */}
            <section className="bg-[#f9fafb] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />Our Team
                        </span>
                        <h2 className="text-4xl font-black text-[#00333c] tracking-tight">Supporting <span className="text-[#f98825]">Specialists</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {supportingTeam.map((doc, i) => (
                            <motion.div key={doc.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className="bg-white border border-[#e5eaeb] rounded-2xl p-7 hover:shadow-xl transition-shadow duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#004b57] to-[#3cb3a6] flex items-center justify-center mb-5">
                                    <span className="text-white font-black text-xl">{doc.initials}</span>
                                </div>
                                <div className="text-[#f98825] text-[10px] font-black uppercase tracking-widest mb-1">{doc.exp} Experience</div>
                                <h3 className="text-[#00333c] font-black text-lg mb-1">{doc.name}</h3>
                                <div className="text-[#004b57] text-xs font-bold mb-3">{doc.role}</div>
                                <p className="text-[#40484a] text-sm leading-relaxed">{doc.specialty}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#001f25] py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Ready to meet your surgeon?
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/60 text-lg mb-8">
                        Book a consultation with Dr. Natanasabapathy or one of our specialists today.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/book-appointment" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg">Book Appointment</a>
                        <a href="tel:+919003417111" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors">Call +91 90034 17111</a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
