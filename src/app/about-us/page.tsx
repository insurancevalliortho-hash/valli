"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const VISION = {
    icon: "🔭",
    title: "Vision",
    desc: "To lead as a center of excellence in orthopedic surgery and sports medicine, delivering state-of-the-art clinical outcomes and redefining healthcare standards for our community."
};

const MISSION = {
    icon: "🏥",
    title: "Mission",
    desc: "We aim to bring compassionate, high-quality, and affordable healthcare services to our patients and to provide excellence in medical education and clinical research for the benefit of humanity."
};

const VALUES = [
    {
        num: "01",
        title: "Accountability",
        desc: "To run as an honorable and reliable medical institution in the community renowned for ethical medical practice."
    },
    {
        num: "02",
        title: "Compassion",
        desc: "To adopt a human approach towards our patients and colleagues to improve everyone's lives."
    },
    {
        num: "03",
        title: "Expertise",
        desc: "Continuous medical education for medical and paramedical professionals focusing on clinical expertise and quality care."
    },
    {
        num: "04",
        title: "Globalization",
        desc: "Raising our healthcare standards to confidently cater to patients from across the globe."
    },
    {
        num: "05",
        title: "Quality",
        desc: "Ensuring excellence in clinical service delivery for effective, efficient quality improvement and patient safety."
    }
];

const milestones = [
    {
        year: "2022",
        title: "🏥 Co-Foundation & Core Launch",
        event: "Valli Orthopedic and Sports Hospital is co-founded on October 16 as a specialized 20-bed 24/7 trauma & emergency center by Dr. Natanasabapathy Thiagarajan and Dr. Vijayalakshmi Irulappan, bringing advanced trauma and trauma resuscitation protocols to Salem."
    },
    {
        year: "2023",
        title: "🔬 Expansion of Specialties",
        event: "Introduced dedicated specialty clinics for keyhole arthroscopy, computer-guided joint replacement, pediatric orthopedics, and spine surgery, successfully treating over 5,000 patients in the first year."
    },
    {
        year: "2024",
        title: "🏅 NABH National Safety Accreditation",
        event: "Achieved full NABH Accreditation following rigorous clinical audits, validating our absolute dedication to patient safety, clinical quality, and transparent operational systems."
    },
    {
        year: "2025",
        title: "🏢 Transformation into Superspecialty Hospital",
        event: "Upgraded into the 50-bed Valli Superspecialty Hospital, launching a high-tech ICU, specialized Surgical Gastroenterology division, and a 24/7 diagnostic wing with high-speed CT scans."
    }
];

const stats = [
    { value: "3+", label: "Years of Excellence" },
    { value: "16K+", label: "Patients Treated" },
    { value: "95%", label: "Success Rate" },
    { value: "15+", label: "Specialities" },
    { value: "24/7", label: "Trauma Emergency" },
    { value: "Salem", label: "Heart of Tamil Nadu" },
];

const accreditations = [
    "Indian Orthopaedic Association (IOA)", "Arthroscopy Society of India (ASI)",
    "Indian Society of Hip & Knee Surgeons (ISHKS)", "Indian Medical Association (IMA)",
    "Tamil Nadu Medical Council", "NABH Safety Standards Adherent",
];

const FAQ_ITEMS = [
    {
        question: "Who is the best ortho doctor in Salem at Valli Hospital?",
        answer: "Dr. T. Natanasabapathy, Chairman and Chief Orthopedic Surgeon at Valli Super Speciality Hospital, is widely recognized as the best ortho doctor in Salem. With over 30 years of clinical experience, he specializes in high-precision knee replacement, fracture clinic trauma care, and arthroscopy."
    },
    {
        question: "What makes Valli Super Speciality Hospital the best ortho hospital in Salem?",
        answer: "Valli Super Speciality Hospital is the premier ortho hospital in Salem, co-founded as a specialized trauma center and upgraded into a 50-bed multispecialty hospital Opp. to Sri Vidya Mandir School, Meyyanur Bypass Road. It is renowned for advanced diagnostics, computer-guided joint replacement, and full NABH accreditation."
    },
    {
        question: "Does Valli Hospital have a lady ortho doctor in Salem?",
        answer: "Yes, Valli Super Speciality Hospital provides comprehensive patient care including consulting with top specialists. For patients seeking a lady ortho doctor in Salem, our dedicated orthopedic and sports medicine departments ensure comfortable, customized care."
    },
    {
        question: "Do you have the best rheumatologist in Salem at Valli Hospital?",
        answer: "Yes, Valli Super Speciality Hospital has a dedicated department for joint pain and rheumatology. Our expert rheumatologist in Salem provides advanced medical therapy for rheumatoid arthritis treatment, gout, and autoimmune disorders."
    },
    {
        question: "What surgical specialties are performed at Valli Orthopedic and Sports Hospital?",
        answer: "Valli Orthopedic and Sports Hospital is equipped with state-of-the-art operation suites for complex arthroscopic surgery, ACL surgery, knee replacement surgery, and advanced fracture treatment. We cover comprehensive sports medicine and arthroplasty."
    }
];

export default function AboutPage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const aboutSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://www.vallihospital.in/about-us#webpage",
                "url": "https://www.vallihospital.in/about-us",
                "name": "About Valli Super Speciality Hospital Salem | Advanced Orthopedic Care",
                "description": "Learn about Valli Super Speciality Hospital, a 50-bed multispecialty center in Salem co-founded by Dr. T. Natanasabapathy Thiagarajan and Dr. Vijayalakshmi Irulappan. Specialized in joint replacement, advanced arthroscopy, and trauma care.",
                "publisher": {
                    "@id": "https://www.vallihospital.in/#organization"
                },
                "about": [
                    {
                        "@type": "Hospital",
                        "@id": "https://www.vallihospital.in/#hospital",
                        "name": "Valli Super Speciality Hospital",
                        "url": "https://www.vallihospital.in/",
                        "logo": "https://www.vallihospital.in/favicon.png",
                        "telephone": "+919003417111",
                        "knowsAbout": [
                            "Orthopedic Surgery",
                            "Joint Replacement Surgery",
                            "Knee Replacement Surgery",
                            "Spine Surgery",
                            "Trauma Care & Resuscitation",
                            "Sports Medicine & Arthroscopy",
                            "Rheumatoid Arthritis Treatment"
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Meyyanur Bypass Road, Opposite to Sri Vidya Mandir School",
                            "addressLocality": "Salem",
                            "addressRegion": "Tamil Nadu",
                            "postalCode": "636004",
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 11.6643,
                            "longitude": 78.1460
                        },
                        "hasMap": "https://maps.app.goo.gl/c4oHsAMwjLq9UqYi8",
                        "openingHours": "00:00-23:59"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.vallihospital.in/about-us#faq",
                "mainEntity": FAQ_ITEMS.map((item) => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            }
        ]
    };

    return (
        <SmoothScroll>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
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
                        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Home
                        </Link>
                    </motion.div>
                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        About Us
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Advanced Trauma &<br /><span className="text-[#f98825]">Orthopedic Excellence</span>
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
            <section className="bg-gradient-to-b from-white via-[#004b57]/2 to-white py-20 md:py-28 overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            Who We Are
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#00333c] leading-tight tracking-tight">
                            Guided by <span className="text-[#f98825]">Purpose</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Left Column: Vision & Mission stacked */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Vision Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }} 
                                whileInView={{ opacity: 1, x: 0 }} 
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="bg-[#004b57]/5 border border-[#004b57]/12 rounded-3xl p-8 hover:bg-[#004b57]/8 hover:border-[#004b57]/30 transition-all duration-500 shadow-[0_15px_30px_rgba(0,75,87,0.03)] flex flex-col relative overflow-hidden group flex-1 justify-center"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3cb3a6]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                                <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform duration-300">{VISION.icon}</div>
                                <h3 className="text-[#00333c] font-black text-2xl mb-2 tracking-tight">{VISION.title}</h3>
                                <p className="text-[#40484a] text-sm md:text-base leading-relaxed font-semibold">{VISION.desc}</p>
                            </motion.div>

                            {/* Mission Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }} 
                                whileInView={{ opacity: 1, x: 0 }} 
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="bg-[#f98825]/5 border border-[#f98825]/12 rounded-3xl p-8 hover:bg-[#f98825]/8 hover:border-[#f98825]/30 transition-all duration-500 shadow-[0_15px_30px_rgba(249,136,37,0.03)] flex flex-col relative overflow-hidden group flex-1 justify-center"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f98825]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{MISSION.icon}</div>
                                <h3 className="text-[#00333c] font-black text-2xl mb-2 tracking-tight">{MISSION.title}</h3>
                                <p className="text-[#40484a] text-sm md:text-base leading-relaxed font-semibold">{MISSION.desc}</p>
                            </motion.div>
                        </div>

                        {/* Right Column: Values dashboard card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="lg:col-span-7 bg-[#004b57] text-white border border-[#004b57]/20 rounded-3xl p-8 md:p-10 shadow-[0_30px_60px_rgba(0,75,87,0.15)] flex flex-col relative overflow-hidden group justify-between"
                        >
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#3cb3a6]/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            
                            <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <h3 className="font-black text-3xl tracking-tight flex items-center gap-3 text-white">
                                    <span className="text-[#f98825]">❤️</span> Core Values
                                </h3>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold border border-white/10 px-3 py-1 rounded-full">
                                    5 Pillars
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                                {VALUES.map((item, index) => (
                                    <div key={item.num} className={`flex gap-4 group/item ${index === 4 ? "md:col-span-2 md:max-w-xl" : ""}`}>
                                        <span className="text-xl font-black text-[#f98825]/80 select-none group-hover/item:text-[#f98825] transition-colors duration-300">
                                            {item.num}
                                        </span>
                                        <div className="flex flex-col">
                                            <h4 className="text-white font-bold text-base mb-1 tracking-tight group-hover/item:text-[#3cb3a6] transition-colors duration-300">
                                                {item.title}
                                            </h4>
                                            <p className="text-white/70 text-xs md:text-sm leading-relaxed font-medium">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
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
                                Our Legacy & Vision:<br /><span className="text-[#f98825]">The Journey of Valli Superspecialty Hospital</span>
                            </h2>
                            <div className="space-y-6 text-[#40484a] text-base leading-relaxed font-medium">
                                <p>
                                    From its very inception, Valli Superspecialty Hospital was built on a foundation of clinical excellence and a deep-rooted commitment to the community of Salem and its surrounding districts. Our story is one of rapid transformation, fueled by the unwavering vision of our founders and a tireless pursuit of international healthcare standards.
                                </p>

                                <div>
                                    <h3 className="text-xl font-bold text-[#00333c] mb-2">The Foundation of Excellence</h3>
                                    <p className="mb-4">
                                        Valli Orthopedic and Sports Hospital was co-founded on October 16, 2022, by Dr. Natanasabapathy Thiagarajan, M.S., and Dr. Vijayalakshmi Irulappan, M.D. Their goal was clear: to establish a center of excellence in Orthopedics that would bridge the gap between local healthcare and global medical standards. What began as a specialized 24-hour Trauma and Emergency Hospital with 20 beds was designed to serve Salem—a thriving business hub of 3.5 million people—and the adjoining regions. By prioritizing updated medical knowledge for our doctors and healthcare staff, we ensure that every patient receives treatment aligned with the latest global protocols.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#00333c] mb-2">The Arduous Path to Quality: NABH Accreditation</h3>
                                    <p className="mb-4">
                                        The true turning point in our journey arrived in 2024. Driven by the aspiration to be the safest hospital for our patients, our team underwent a rigorous and arduous journey to meet exacting national standards, achieving Full NABH Accreditation. This milestone validated our commitment to patient safety, clinical outcomes, and operational transparency, paving the way for prestigious corporate, industrial, and health insurance tie-ups.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#f98825] mb-2">Evolution into Valli Superspecialty Hospital</h3>
                                    <p>
                                        Growth is a natural byproduct of trust. In 2025, responding to the growing needs of our community, we successfully transformed into the 50-bedded Valli Superspecialty Hospital. Today, we stand as a beacon of advanced medical care. Whether it is complex orthopedic surgery, sports medicine, or emergency trauma care, our mission remains the same: to deliver compassionate, safe, and international-standard healthcare to every patient who walks through our doors.
                                    </p>
                                </div>

                                <div className="mt-8 pl-6 border-l-4 border-[#f98825] bg-[#f98825]/5 rounded-r-2xl py-6 pr-6 relative group">
                                    <span className="absolute -top-4 left-4 text-6xl text-[#f98825]/20 font-serif select-none pointer-events-none">&ldquo;</span>
                                    <p className="text-[#00333c] text-sm md:text-base italic leading-relaxed font-semibold mb-3">
                                        At Valli Hospital, our foundation was co-built on a promise to bring world-class orthopedic interventions and immediate trauma care to Salem. Every system we upgrade, from our high-tech ICUs to full NABH safety protocols, is designed with one goal: ensuring the absolute safety and recovery of our patients.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#004b57] text-white flex items-center justify-center font-bold text-xs">DT</div>
                                        <div>
                                            <span className="block text-xs font-bold text-[#00333c]">Dr. Natanasabapathy Thiagarajan, M.S. (Ortho)</span>
                                            <span className="block text-[10px] text-gray-500 font-medium">Co-Founder, Chairman & Chief Surgeon</span>
                                        </div>
                                    </div>
                                </div>
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
            <section className="bg-[#001f25] py-20 md:py-28 overflow-hidden">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            History
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                            Our Path of <span className="text-[#f98825]">Excellence</span>
                        </h2>
                    </motion.div>

                    <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-6 md:pl-12 space-y-12 max-w-5xl">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="relative group"
                            >
                                {/* Glowing Bullet Point */}
                                <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-[#f98825] border-4 border-[#001f25] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(249,136,37,0.6)]" />
                                
                                {/* Card Body */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-[#f98825]/45 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-[#f98825] text-white font-black text-xs tracking-widest shadow-[0_4px_12px_rgba(249,136,37,0.3)]">
                                            {m.year}
                                        </span>
                                        <h3 className="text-white text-base md:text-lg font-bold tracking-tight">
                                            {m.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium">
                                        {m.event}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
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

            {/* FAQ Accordion Section */}
            <section className="bg-[#f9fafb] py-20 md:py-28 border-t border-b border-[#e5eaeb]">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <div className="max-w-3xl mx-auto mb-16 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                            Common Inquiries
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#00333c] tracking-tight">
                            Frequently Asked <span className="text-[#f98825]">Questions</span>
                        </h2>
                        <p className="mt-4 text-[#40484a] text-sm md:text-base leading-relaxed font-semibold max-w-xl mx-auto">
                            Get detailed information about {"Salem's"} leading orthopedic services, treatment protocols, and specialist doctors.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,75,87,0.03)] ${
                                    activeFaq === i ? "border-[#004b57]/30 bg-[#004b57]/[0.01]" : "border-[#e5eaeb]"
                                }`}
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between text-left p-6 md:p-8 font-black text-base md:text-lg text-[#00333c] hover:text-[#f98825] transition-colors gap-4"
                                >
                                    <span>{item.question}</span>
                                    <span className={`w-8 h-8 rounded-full bg-[#004b57]/5 flex items-center justify-center text-[#004b57] shrink-0 transition-transform duration-300 ${
                                        activeFaq === i ? "rotate-180 bg-[#f98825]/10 text-[#f98825]" : ""
                                    }`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: activeFaq === i ? "auto" : 0 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 md:px-8 md:pb-8 text-[#40484a] text-sm md:text-base leading-relaxed font-semibold border-t border-[#e5eaeb]/50 pt-4">
                                        {item.answer}
                                    </div>
                                </motion.div>
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
                        <Link href="/book-appointment" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg">Book Appointment</Link>
                        <a href="tel:+919003417111" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors">Call +91 90034 17111</a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
