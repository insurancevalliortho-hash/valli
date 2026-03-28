"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const techItems = [
    {
        title: "C-ARM Fluoroscopy",
        tag: "Real-Time Imaging",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#00333c] to-[#004b57]",
        dark: true,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            </svg>
        ),
        description: "High-definition intraoperative X-ray guidance gives our surgeons a live view during complex joint replacements and fracture fixations — minimizing complications and ensuring perfect implant placement.",
        benefits: ["Sub-millimetre accuracy", "Reduced radiation exposure", "Real-time implant positioning", "Intraoperative validation"],
        stat: { value: "0.1mm", label: "Placement Accuracy" },
    },
    {
        title: "4K Arthroscope System",
        tag: "Minimally Invasive",
        accentColor: "#3cb3a6",
        bg: "bg-white",
        dark: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
        ),
        description: "Crystal-clear 4K resolution inside the joint allows our surgeons to diagnose and treat ligament tears, cartilage damage, and meniscus injuries through tiny incisions — faster healing, less scarring.",
        benefits: ["3–5mm keyhole incisions", "Same-day discharge option", "4K ultra-clear vision", "Reduced infection risk"],
        stat: { value: "4K", label: "Ultra HD Resolution" },
    },
    {
        title: "Ultrasound Nerve Block",
        tag: "Pain-Free Surgery",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
        description: "Ultrasound-guided nerve blocks deliver targeted anaesthesia directly to the surgical site. Patients wake up with minimal pain and fewer side effects — a revolutionary approach to fracture and post-op pain management.",
        benefits: ["Targeted pain control", "Reduced opioid use", "Faster recovery", "Suitable for elderly patients"],
        stat: { value: "80%", label: "Less Post-Op Pain" },
    },
    {
        title: "Computer Navigation System",
        tag: "Precision Surgery",
        accentColor: "#004b57",
        bg: "bg-[#f0fafa]",
        dark: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
        ),
        description: "GPS-like computer navigation maps each patient's unique anatomy during knee replacement, guiding precise cuts and implant alignment. The result: a joint that feels natural and lasts decades longer.",
        benefits: ["Patient-specific mapping", "Optimal implant alignment", "Longer implant life", "Fewer revision surgeries"],
        stat: { value: "15°", label: "Alignment Precision" },
    },
    {
        title: "Pedoscan & Doppler Assessment",
        tag: "Precision Diagnostics",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        description: "Our Pedoscan digitally maps the pressure distribution of your foot in real time, while Doppler ultrasound assesses blood flow — critical for diabetic foot care and preventing limb-threatening complications.",
        benefits: ["Dynamic gait analysis", "Diabetic foot screening", "Blood flow assessment", "Custom orthotic planning"],
        stat: { value: "100%", label: "Diabetic Safety Protocol" },
    },
    {
        title: "Modular Operation Theatre",
        tag: "Sterile Environment",
        accentColor: "#004b57",
        bg: "bg-white",
        dark: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        description: "Our modular laminar-flow OT suite maintains Class 100 clean-room conditions — the gold standard for joint replacement surgery. HEPA filtration, positive pressure, and UV sterilisation ensure zero infection risk.",
        benefits: ["Class 100 clean room", "Laminar airflow", "HEPA filtration", "UV sterilisation"],
        stat: { value: "0%", label: "Post-Op Infection Rate" },
    },
];

const whyItems = [
    { icon: "🎯", title: "Pinpoint Accuracy", desc: "Advanced imaging ensures implants are placed to within fractions of a millimetre, dramatically improving outcomes and longevity." },
    { icon: "⚡", title: "Faster Recovery", desc: "Minimally invasive techniques and nerve blocks mean patients walk sooner, hurt less, and return to normal life faster." },
    { icon: "🛡️", title: "Lower Risk", desc: "Computer navigation and real-time imaging reduce the chance of complications during and after surgery." },
    { icon: "🔬", title: "Accurate Diagnosis", desc: "Pedoscan, Doppler, and high-res imaging ensure we treat the root cause, not just the symptoms." },
];

export default function TechnologyPage() {
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
                    <div className="absolute -top-20 right-[-15%] w-[50vw] h-[50vw] bg-[#3cb3a6]/15 rounded-[6rem] rotate-12" />
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
                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6] animate-pulse" />
                        Advanced Technology
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Medicine at the<br /><span className="text-[#f98825]">Edge of Science</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-xl text-white/60 max-w-xl leading-relaxed font-medium">
                        Six advanced technologies working together — so our surgeons can do more, do it better, and do it safer than ever before.
                    </motion.p>
                </div>
            </section>

            {/* Tech Cards */}
            <main className="bg-[#f9fafb] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {techItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -4 }}
                                className={`group relative rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-500 ${item.bg} ${item.dark ? "border-white/10" : "border-[#e5eaeb]"}`}
                            >
                                {/* Accent corner */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-[1.2rem] rotate-45 opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" style={{ backgroundColor: item.accentColor }} />

                                <div className="p-8 md:p-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                                            style={{ backgroundColor: item.dark ? "rgba(255,255,255,0.1)" : `${item.accentColor}18`, color: item.accentColor }}>
                                            {item.icon}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${item.dark ? "bg-white/10 text-white border border-white/15" : "bg-white text-[#40484a] border border-[#e5eaeb]"}`}>
                                            {item.tag}
                                        </span>
                                    </div>

                                    <h2 className={`text-2xl font-black tracking-tight mb-3 ${item.dark ? "text-white" : "text-[#00333c]"}`}>{item.title}</h2>
                                    <p className={`text-sm leading-relaxed mb-6 font-medium ${item.dark ? "text-white/60" : "text-[#40484a]"}`}>{item.description}</p>

                                    <ul className="space-y-2 mb-8">
                                        {item.benefits.map((b) => (
                                            <li key={b} className={`flex items-center gap-2.5 text-sm font-medium ${item.dark ? "text-white/70" : "text-[#00333c]"}`}>
                                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.accentColor }} />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className={`mt-auto pt-5 border-t ${item.dark ? "border-white/10" : "border-[#e5eaeb]"}`}>
                                        <div className="text-3xl font-black" style={{ color: item.accentColor }}>{item.stat.value}</div>
                                        <div className={`text-xs font-bold uppercase tracking-widest mt-1 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>{item.stat.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Why Technology Matters */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            Our Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#00333c] tracking-tight leading-tight">
                            Why Technology <span className="text-[#f98825]">Matters</span>
                        </h2>
                        <p className="text-[#40484a] text-lg mt-4 leading-relaxed">
                            At Valli Hospital, technology is not an expense — it is our commitment to you.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyItems.map((w, i) => (
                            <motion.div key={w.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className="bg-[#f9fafb] border border-[#e5eaeb] rounded-2xl p-7 hover:shadow-lg transition-shadow duration-400">
                                <div className="text-4xl mb-4">{w.icon}</div>
                                <h3 className="text-[#00333c] font-black text-lg mb-2">{w.title}</h3>
                                <p className="text-[#40484a] text-sm leading-relaxed">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#004b57] py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Experience the difference<br />technology makes.
                    </motion.h2>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <a href="/book-appointment" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg">Book a Consultation</a>
                        <a href="/specialities" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors">View Specialities</a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
