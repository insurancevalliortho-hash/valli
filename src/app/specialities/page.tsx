"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const specialities = [
    {
        id: "joint-care",
        title: "Advanced Joint Care & Replacement",
        subtitle: "Flagship Department",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#00333c] to-[#004b57]",
        dark: true,
        tag: "Flagship Department",
        tagBg: "bg-[#f98825]/20 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        description: "Comprehensive, evidence-based treatments specializing in minimally invasive total knee and hip replacements for faster recovery and less pain.",
        procedures: ["Total Knee Replacement", "Total Hip Replacement", "Unicondylar Knee Replacement", "Revision Joint Replacement", "Bilateral Knee Replacement"],
        tech: ["C-ARM Fluoroscopy", "Computer Navigation", "Ultrasound-Guided Blocks"],
        stat: { value: "3,000+", label: "Joint Replacements Performed" },
    },
    {
        id: "sports-medicine",
        title: "Sports Medicine & Arthroscopy",
        subtitle: "Elite Recovery",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Elite Recovery",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        description: "Cutting-edge arthroscopy for rapid healing of ligament and tendon damage. We get athletes and active patients back to peak performance.",
        procedures: ["ACL Reconstruction", "Meniscus Repair", "Shoulder Arthroscopy", "Rotator Cuff Repair", "Cartilage Restoration"],
        tech: ["4K Arthroscope", "MRI-Guided Planning", "PRP Therapy"],
        stat: { value: "500+", label: "Arthroscopic Procedures" },
    },
    {
        id: "trauma",
        title: "Trauma & Fracture Clinic",
        subtitle: "Emergency Ready",
        accentColor: "#ba1a1a",
        bg: "bg-[#fff5f5]",
        dark: false,
        tag: "Emergency Ready",
        tagBg: "bg-red-100 text-red-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        description: "Painless treatment using Ultrasound-guided nerve blocks for all fracture cases. Our 24/7 emergency team handles the most complex polytrauma.",
        procedures: ["Complex Fracture Fixation", "Polytrauma Management", "Nerve Block Anesthesia", "Pelvi-Acetabular Surgery", "Intramedullary Nailing"],
        tech: ["Ultrasound Nerve Block", "C-ARM Imaging", "ICU Monitoring"],
        stat: { value: "24/7", label: "Emergency Coverage" },
    },
    {
        id: "foot-ankle",
        title: "Foot & Ankle Clinic",
        subtitle: "Precision Diagnostics",
        accentColor: "#004b57",
        bg: "bg-white",
        dark: false,
        tag: "Precision Diagnostics",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
        description: "Advanced Pedoscan with Doppler Assessment to prevent complications. Expert care for all foot and ankle conditions, from flatfoot to tendon disorders.",
        procedures: ["Flatfoot Correction", "Hallux Valgus Surgery", "Ankle Arthroscopy", "Achilles Tendon Repair", "Diabetic Foot Care"],
        tech: ["Pedoscan Analysis", "Doppler Assessment", "3D Gait Analysis"],
        stat: { value: "98%", label: "Patient Satisfaction" },
    },
    {
        id: "back-spine",
        title: "Back Pain & Spinal Disorders",
        subtitle: "Pain Management",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Pain Management",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        ),
        description: "Modern therapeutic interventions for spinal disorders to help you live pain-free. From conservative management to minimally invasive surgery.",
        procedures: ["Disc Prolapse Treatment", "Spinal Stenosis Surgery", "Lumbar Fusion", "Cervical Disc Replacement", "Epidural Injections"],
        tech: ["Fluoroscopy-Guided", "Neuro-Monitoring", "Endoscopic Spine"],
        stat: { value: "90%", label: "Non-Surgical Success Rate" },
    },
    {
        id: "bone-cancer",
        title: "Bone Cancer Treatment",
        subtitle: "Full Support",
        accentColor: "#004b57",
        bg: "bg-white",
        dark: false,
        tag: "Full Support",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        description: "Compassionate, conservative, and surgical approach to musculoskeletal oncology. Limb-salvage surgery to preserve function while fighting cancer.",
        procedures: ["Limb Salvage Surgery", "Bone Tumor Resection", "Prosthetic Reconstruction", "Biopsy & Staging", "Chemotherapy Coordination"],
        tech: ["PET-CT Guided", "Intraoperative Navigation", "Oncology MDT"],
        stat: { value: "Limb", label: "Salvage Priority" },
    },
    {
        id: "paediatric",
        title: "Paediatric Orthopaedics",
        subtitle: "Child-First Care",
        accentColor: "#f98825",
        bg: "bg-gradient-to-r from-[#ebfdfc] to-[#ffffff]",
        dark: false,
        tag: "Child-First Care",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        description: "Gentle, specialized care for childhood orthopaedic issues and congenital deformities—tailored exactly for children's unique needs and growth.",
        procedures: ["Club Foot Correction", "DDH Treatment", "Cerebral Palsy Surgery", "Scoliosis Management", "Growth Plate Fractures"],
        tech: ["Ponseti Method", "EOS Imaging", "Pediatric Anesthesia"],
        stat: { value: "100%", label: "Child-Safe Protocols" },
    },
];

export default function SpecialitiesPage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-end bg-[#001f25] overflow-hidden pt-32 pb-20">
                <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#f98825]/10 rounded-[6rem] rotate-12 blur-sm" />
                    <div className="absolute -bottom-32 -left-16 w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[5rem] rotate-45" />
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.03 }} />
                </motion.div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4">
                        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Home
                        </a>
                    </motion.div>

                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Departments
                    </motion.span>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Centers of<br /><span className="text-[#f98825]">Excellence</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-xl text-white/60 max-w-xl leading-relaxed font-medium">
                        7 specialized departments. One goal — restoring your quality of life with world-class orthopedic care in Salem, Tamil Nadu.
                    </motion.p>
                </div>
            </section>

            {/* Speciality Cards */}
            <main className="bg-[#f9fafb] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="space-y-8">
                        {specialities.map((item, index) => (
                            <motion.div
                                key={item.id}
                                id={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                                className={`rounded-[2rem] overflow-hidden border ${item.dark ? "border-white/10" : "border-[#e5eaeb]"} shadow-sm hover:shadow-xl transition-shadow duration-500 ${item.bg}`}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Left — Icon + Title */}
                                    <div className={`md:w-80 lg:w-96 p-8 md:p-10 flex flex-col justify-between ${item.dark ? "" : "border-b md:border-b-0 md:border-r border-[#e5eaeb]"}`}>
                                        <div>
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                                                    style={{ backgroundColor: item.dark ? "rgba(255,255,255,0.1)" : `${item.accentColor}18`, color: item.accentColor }}>
                                                    {item.icon}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${item.tagBg}`}>
                                                    {item.tag}
                                                </span>
                                            </div>
                                            <h2 className={`text-2xl md:text-3xl font-black leading-tight tracking-tight mb-3 ${item.dark ? "text-white" : "text-[#00333c]"}`}>
                                                {item.title}
                                            </h2>
                                            <p className={`text-sm leading-relaxed font-medium ${item.dark ? "text-white/60" : "text-[#40484a]"}`}>
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Stat */}
                                        <div className={`mt-8 pt-6 border-t ${item.dark ? "border-white/10" : "border-[#e5eaeb]"}`}>
                                            <div className="text-3xl font-black" style={{ color: item.accentColor }}>{item.stat.value}</div>
                                            <div className={`text-xs font-bold uppercase tracking-widest mt-1 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>{item.stat.label}</div>
                                        </div>
                                    </div>

                                    {/* Right — Procedures + Tech + CTA */}
                                    <div className="flex-1 p-8 md:p-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                                            <div>
                                                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>Procedures</h3>
                                                <ul className="space-y-2.5">
                                                    {item.procedures.map((p) => (
                                                        <li key={p} className={`flex items-center gap-2.5 text-sm font-medium ${item.dark ? "text-white/70" : "text-[#00333c]"}`}>
                                                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.accentColor }} />
                                                            {p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>Technology Used</h3>
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {item.tech.map((t) => (
                                                        <span key={t} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${item.dark ? "bg-white/10 text-white/70 border border-white/15" : "bg-white text-[#004b57] border border-[#e5eaeb]"}`}>
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>

                                                <a href="/book-appointment"
                                                    className="inline-flex items-center gap-2 bg-[#004b57] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#00333c] hover:-translate-y-0.5 transform transition-all duration-200 shadow-md">
                                                    Book Consultation
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* CTA Banner */}
            <section className="bg-[#004b57] py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Not sure which department<br />is right for you?
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/60 text-lg mb-8 font-medium">
                        Call us and our team will guide you to the right specialist.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+919003417111" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg">
                            Call +91 90034 17111
                        </a>
                        <a href="/book-appointment" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors">
                            Book Online
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
