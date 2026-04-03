"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const specialities = [
    {
        id: "orthopaedics",
        title: "Orthopaedics & Joint Replacement",
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
        description: "Comprehensive bone and joint care for all ages, specializing in minimally invasive total knee and hip replacements. We get active patients back to peak performance.",
        procedures: ["Total Joint Replacement", "Sports Injuries & Ligament Reconstruction", "Fracture Management", "Spine Disorders Treatment", "Trauma Care"],
        tech: ["Arthroscopy", "Computer Navigation", "Ultrasound-Guided Blocks"],
        stat: { value: "3,000+", label: "Joint Replacements Performed" },
    },
    {
        id: "gastroenterology",
        title: "Surgical Gastroenterology",
        subtitle: "Advanced Solutions for Digestive Health",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Digestive Health",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M8 7v4m8-4v4m-4-8v12m-6 4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2z" />
            </svg>
        ),
        description: "Experience world-class care at our specialized Surgical Gastroenterology wing, integrated within our robust 50-bedded multispecialty framework.",
        bullets: [
            "Precision Surgical Excellence: Experience world-class care at our specialized Surgical Gastroenterology wing, integrated within our robust 50-bedded multispecialty framework.",
            "Minimally Invasive Mastery: We specialize in advanced laparoscopy, offering \"keyhole\" surgeries that ensure faster recovery, less pain, and minimal scarring.",
            "Expert Specialist Leadership: Our department is led by a dedicated Surgical Gastroenterologist, providing expert management for complex abdominal and digestive disorders.",
            "Complete Diagnostic Suite: Benefit from immediate, on-site insights with our high-resolution CT scan and Ultrasound facilities for rapid and accurate diagnosis.",
            "Advanced Endoscopic Interventions: From routine screenings to therapeutic procedures, our high-definition Endoscopy and Colonoscopy services provide a clear window to your health.",
            "Comprehensive Trauma Support: As a trauma-heavy setup, we are uniquely equipped to handle emergency abdominal surgeries and acute GI injuries with 24/7 readiness.",
            "Tailored Treatment Plans: We provide personalized care for conditions ranging from gallstones and hernias to complex gastrointestinal cancers.",
            "Integrated Critical Care: Our surgical team works in tandem with our high-tech ICUs to provide seamless post-operative monitoring for high-risk patients.",
            "Cutting-Edge Infrastructure: Our modular operating theaters are designed for maximum safety, utilizing the latest surgical technology for superior clinical outcomes.",
            "Restoring Your Quality of Life: At Valli Superspecialty, we combine diagnostic precision with surgical innovation to get you back to your best self, faster."
        ],
        procedures: [],
        tech: [],
        stat: { value: "Top", label: "Digestive Care" },
    },
    {
        id: "neurosurgery",
        title: "Neurosurgery & Neurology",
        subtitle: "Brain & Spine",
        accentColor: "#ba1a1a",
        bg: "bg-[#fff5f5]",
        dark: false,
        tag: "Brain & Spine",
        tagBg: "bg-red-100 text-red-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        description: "Advanced treatments for brain and spinal cord injuries. Expert diagnosis and treatment for nerve conditions including stroke and epilepsy.",
        procedures: ["Brain Tumour Surgery", "Herniated Disc Surgery", "Stroke & Aneurysm Treatment", "Parkinson's Care", "Migraine Treatment"],
        tech: ["Neuro-Monitoring", "Fluoroscopy-Guided", "Endoscopic Spine"],
        stat: { value: "High", label: "Success Rate" },
    },
    {
        id: "plastic-surgery",
        title: "Plastic & Vascular Surgery",
        subtitle: "Reconstructive",
        accentColor: "#004b57",
        bg: "bg-white",
        dark: false,
        tag: "Reconstructive",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
        description: "Restoring function and enhancing aesthetics with meticulous care for burns, trauma, and vascular complications.",
        procedures: ["Reconstructive Surgery", "Hand Surgery & Microsurgery", "Scar Revision", "Skin Grafting", "Vascular Repair"],
        tech: ["Microsurgery Tools", "Doppler Assessment", "Modular OT"],
        stat: { value: "Top", label: "Aesthetic Outcomes" },
    },
    {
        id: "internal-medicine",
        title: "Internal Medicine",
        subtitle: "The Foundation of Comprehensive Healing",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Primary Care",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        ),
        description: "Our Department of Internal Medicine serves as the expert core of our 50-bedded multispecialty hospital, managing diverse and complex medical conditions.",
        bullets: [
            "Holistic Healthcare Excellence: Our Department of Internal Medicine serves as the expert core of our 50-bedded multispecialty hospital, managing diverse and complex medical conditions.",
            "Elite Life-Saving Skills: Rest easy knowing our medical staff is rigorously trained in ACLS and ATLS, ensuring immediate, world-class intervention during any crisis.",
            "Integrated Critical Care: With a high-tech ICU on-site, we provide seamless transitions for patients requiring intensive monitoring and advanced life support.",
            "Diagnostic Powerhouse: We utilize immediate, in-house CT scans and Ultrasound to transform clinical symptoms into precise, actionable diagnoses within minutes.",
            "Advanced Internal Imaging: Our specialists offer high-definition Endoscopy and Colonoscopy, providing vital insights into gastrointestinal health without the need for external referrals.",
            "Surgical Synergy: We work hand-in-hand with our Laparoscopy team to offer minimally invasive surgical solutions for internal medical complications.",
            "Expert Chronic Disease Management: From hypertension and diabetes to complex infectious diseases, we provide personalized, evidence-based treatment plans.",
            "Rapid Trauma Response: In our trauma-centric environment, our physicians are masters of stabilizing and managing multi-system medical emergencies 24/7.",
            "Preventative Wellness: Beyond acute care, we focus on comprehensive health screenings and early detection to safeguard your long-term vitality.",
            "Compassionate Expertise: At Valli Superspecialty, we combine cutting-edge medical science with a dedicated human touch to lead your journey back to health."
        ],
        procedures: [],
        tech: [],
        stat: { value: "24/7", label: "Care & Diagnostics" },
    },
    {
        id: "paediatrics",
        title: "Paediatrics & Surgery",
        subtitle: "Child-First Care",
        accentColor: "#004b57",
        bg: "bg-white",
        dark: false,
        tag: "Child-First Care",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        description: "Complete healthcare for children including newborn wellness, emergency surgeries, and laparoscopic procedures—tailored exactly for young ones.",
        procedures: ["Newborn Check-ups", "Immunization", "Birth Defect Corrections", "Hernia Surgery", "Laparoscopic Procedures"],
        tech: ["Pediatric Anesthesia", "Safe Diagnostics", "Incubators"],
        stat: { value: "100%", label: "Child-Safe Protocols" },
    },
    {
        id: "critical-care",
        title: "Anaesthesiology & ICU",
        subtitle: "The Architects of Critical Care",
        accentColor: "#ba1a1a",
        bg: "bg-[#fff5f5]",
        dark: false,
        tag: "Critical Care",
        tagBg: "bg-red-100 text-red-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        description: "Our Anaesthesia and Critical Care team stands as the ultimate shield against the unpredictable, providing the silent, steady heartbeat behind every life-saving surgery.",
        bullets: [
            "Vigilance in the Vortex: Our Department of Anaesthesiology provides the silent, steady heartbeat behind every life-saving surgery in our high-volume trauma center.",
            "10-Bedded Critical Care: We manage one of the region's best Critical Care units, offering a sophisticated safety net for the most complex emergency cases.",
            "Mastery Over Pain: Utilizing advanced ultrasound-guided nerve blocks and precision analgesia, we ensure patient comfort even in the aftermath of severe trauma.",
            "Real-Time Life Support: Our specialists are experts in advanced hemodynamic monitoring and mechanical ventilation, maintaining stability when it matters most.",
            "The Bridge to Recovery: We provide a seamless continuum of care, transitioning patients from the chaos of the ER to the controlled stability of our modern ICUs.",
            "Precision Anaesthesia: From medical emergencies to geriatric trauma, our tailored anesthetic plans prioritize safety and rapid post-operative recovery.",
            "24/7 Intensivist Presence: Round-the-clock coverage by board-certified intensivists means expert intervention is always seconds away, never minutes.",
            "Cutting-Edge Technology: Equipped with high-end workstations and point-of-care diagnostics to make split-second, data-driven clinical decisions.",
            "Multidisciplinary Synergy: We act as the vital link between surgery and recovery, collaborating across specialties to optimize outcomes for every patient.",
            "Guardians of Survival: At Valli Superspecialty, our Anaesthesia and Critical Care team stands as the ultimate shield against the unpredictable."
        ],
        procedures: [],
        tech: [],
        stat: { value: "10", label: "ICU Beds" },
    },
    {
        id: "emergency",
        title: "Emergency Medicine",
        subtitle: "Every Second Counts",
        accentColor: "#f98825",
        bg: "bg-gradient-to-r from-[#ebfdfc] to-[#ffffff]",
        dark: false,
        tag: "Emergency Ready",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        description: "At Valli Superspecialty, we don’t just treat emergencies—we redefine survival through innovation, massive infrastructure, and rapid-response protocols.",
        bullets: [
            "Precision in Emergencies: Experience world-class trauma care in our massive, state-of-the-art 50-bedded Emergency & Trauma center.",
            "The Golden Hour Advantage: Our rapid-response protocols are designed to deliver life-saving interventions when every millisecond matters.",
            "Elite Trauma Specialists: Our department is spearheaded by a multidisciplinary team of certified surgeons and emergency physicians available 24/7/365.",
            "Advanced Diagnostics On-Site: Instant access to high-speed imaging and bedside pathology ensures no time is wasted in reaching a diagnosis.",
            "Comprehensive Critical Care: From acute cardiac events to complex poly-trauma, we provide a seamless transition from the ER to our high-tech ICUs.",
            "Cutting-Edge Infrastructure: Equipped with a dedicated Triage Zone, specialized procedure rooms, and integrated life-support systems.",
            "Air and Road Connectivity: Our seamless ambulance network ensures that expert medical intervention begins the moment we reach your doorstep.",
            "Mass Casualty Readiness: One of the region's largest setups, uniquely capable of managing large-scale emergencies with clinical excellence.",
            "Compassion Under Pressure: We combine high-velocity medical care with a human touch, supporting families through their most difficult moments.",
            "Your Safety, Our Mission: At Valli Superspecialty, we don’t just treat emergencies—we redefine survival through innovation and expertise."
        ],
        procedures: [],
        tech: [],
        stat: { value: "50+", label: "Trauma Bed Capacity" },
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
                                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                        {(item as any).bullets ? (
                                            <div className="mb-8">
                                                <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>Department Highlights</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
                                                    {(item as any).bullets.map((b: string) => (
                                                        <div key={b} className={`flex items-start gap-3 text-sm font-medium ${item.dark ? "text-white/80" : "text-[#00333c]"}`}>
                                                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: item.accentColor }} />
                                                            <span className="leading-relaxed">{b}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full mb-8">
                                                <div>
                                                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>Procedures</h3>
                                                    <ul className="space-y-2.5">
                                                        {item.procedures.map((p) => (
                                                            <li key={p} className={`flex items-start gap-2.5 text-sm font-medium ${item.dark ? "text-white/70" : "text-[#00333c]"}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: item.accentColor }} />
                                                                <span className="leading-relaxed">{p}</span>
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
                                                </div>
                                            </div>
                                        )}

                                        <div>
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
