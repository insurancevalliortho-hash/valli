"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const values = [
    {
        icon: "🏥",
        title: "Mission",
        desc: "To empower patients with strength, mobility, and confidence through cutting-edge medical expertise while providing advanced, compassionate care.",
    },
    {
        icon: "🔭",
        title: "Vision",
        desc: "To be a premier Super Specialty Hospital, setting new standards in advanced medical care and patient well-being.",
    },
    {
        icon: "❤️",
        title: "Values",
        desc: "Compassion, Innovation, Excellence, Integrity & Commitment. Your health is our priority, and we are dedicated to providing 24/7 specialized care.",
    },
];

const milestones = [
    { year: "2003", event: "Valli Super Speciality Hospital founded in Salem by Dr. T. Natanasabapathy" },
    { year: "2006", event: "Established dedicated Trauma & Fracture emergency unit" },
    { year: "2010", event: "Pioneered minimally invasive joint replacement in the Salem region" },
    { year: "2013", event: "Launched Paediatric Orthopaedics & Foot-Ankle Clinic" },
    { year: "2015", event: "Installed first C-ARM guided arthroscopy suite in the district" },
    { year: "2018", event: "Crossed 3,000 successful knee replacements" },
    { year: "2020", event: "Introduced computer navigation for precision joint surgery" },
    { year: "2021", event: "Ultrasound-guided nerve blocks become standard of care" },
    { year: "2024", event: "Dr. Natanasabapathy named Best Orthopaedic Surgeon — Tamil Nadu" },
];

const stats = [
    { value: "21+", label: "Years of Service" },
    { value: "5,000+", label: "Surgeries Performed" },
    { value: "7", label: "Speciality Departments" },
    { value: "98%", label: "Patient Satisfaction" },
    { value: "24/7", label: "Emergency Care" },
    { value: "salem", label: "Heart of Tamil Nadu" },
];

const accreditations = [
    "Indian Orthopaedic Association (IOA)", "Arthroscopy Society of India (ASI)",
    "Indian Society of Hip & Knee Surgeons (ISHKS)", "Indian Medical Association (IMA)",
    "Tamil Nadu Medical Council", "NABH Safety Standards Adherent",
];

export default function AboutPage() {
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
                    <div className="absolute -top-20 right-[-15%] w-[50vw] h-[50vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
                    <div className="absolute -bottom-20 -left-10 w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
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
                        About Us
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Two Decades of<br /><span className="text-[#f98825]">Healing Salem</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-xl text-white/60 max-w-xl leading-relaxed font-medium">
                        Founded by Dr. T. Natanasabapathy and Dr. I. Vijayalakshmi, what began as a 20-bed orthopaedic trauma center now stands as a beacon of excellence in specialized medical care.
                    </motion.p>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="bg-[#004b57] py-12">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {stats.map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="text-center">
                                <div className={`font-black leading-none mb-1 ${s.value.length > 4 ? "text-2xl" : "text-3xl"} text-[#f98825]`}>{s.value === "salem" ? "Salem" : s.value}</div>
                                <div className="text-white/50 text-xs font-bold uppercase tracking-wider">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission / Vision / Values */}
            <section className="bg-white py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            Who We Are
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#00333c] leading-tight tracking-tight">
                            Guided by <span className="text-[#f98825]">Purpose</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className="bg-[#f9fafb] border border-[#e5eaeb] rounded-2xl p-8 hover:shadow-xl transition-shadow duration-500">
                                <div className="text-4xl mb-5">{v.icon}</div>
                                <h3 className="text-[#00333c] font-black text-2xl mb-3 tracking-tight">{v.title}</h3>
                                <p className="text-[#40484a] text-base leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hospital Story */}
            <section className="bg-[#f9fafb] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                                Our Story
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#00333c] leading-tight tracking-tight mb-6">
                                Built on Trust,<br /><span className="text-[#f98825]">One Patient at a Time</span>
                            </h2>
                            <div className="space-y-4 text-[#40484a] text-base leading-relaxed font-medium">
                                <p>
                                    Established in 2022, we began as a 20-bed orthopaedic trauma and emergency care center. Our founders' vision was clear: to create a center of excellence providing world-class healthcare across multiple specialties.
                                </p>
                                <p>
                                    At Valli, patients aren't just case files; they are individuals with stories, dreams, and hopes. Every diagnosis, every surgery, and every treatment plan is crafted with precision and compassion.
                                </p>
                                <p>
                                    Today, we stand as a beacon of excellence in specialized medical care, offering cutting-edge treatments in Orthopaedics, Plastic Surgery, Gastroenterology, Neurosurgery, Paediatrics, Internal Medicine, and more.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative rounded-[2rem] overflow-hidden h-80 lg:h-[480px]">
                            <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=85&w=900" alt="Valli Hospital" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001f25]/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 bg-[#001f25]/70 backdrop-blur-md border border-white/15 rounded-xl px-5 py-4">
                                <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Location</div>
                                <div className="text-white font-bold text-sm">Opp. Sri Vidya Mandir School, Meyyanoor Road, Salem</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Milestone Timeline */}
            <section className="bg-[#001f25] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            History
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                            21 Years of <span className="text-[#f98825]">Progress</span>
                        </h2>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: 0.04 * i }}
                                    className="relative flex gap-10 items-center pl-16">
                                    <div className="absolute left-[19px] w-3 h-3 rounded-full bg-[#f98825] border-2 border-[#001f25] shadow-[0_0_0_3px_rgba(249,136,37,0.3)]" />
                                    <span className="text-[#f98825] text-xs font-black uppercase tracking-widest shrink-0 w-12">{m.year}</span>
                                    <span className="text-white/70 text-sm font-medium leading-snug">{m.event}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Accreditations */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            Standards
                        </span>
                        <h2 className="text-4xl font-black text-[#00333c] tracking-tight">Professional <span className="text-[#f98825]">Memberships</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accreditations.map((a, i) => (
                            <motion.div key={a} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }}
                                className="flex items-center gap-4 bg-[#f9fafb] border border-[#e5eaeb] rounded-xl px-5 py-4">
                                <div className="w-9 h-9 shrink-0 rounded-xl bg-[#004b57]/10 flex items-center justify-center text-[#004b57]">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <span className="text-[#00333c] text-sm font-semibold">{a}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#004b57] py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Visit Us in Salem
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                        Opp. to Sri Vidya Mandir School, Meyyanoor Road, Salem - 636 004
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
