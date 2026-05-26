"use client";


import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

const facilities = [
    {
        id: "01",
        title: "Advanced Radiology & Imaging",
        subtitle: "Rapid & Precise Diagnostics",
        stat: { value: "24/7", label: "Availability" },
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M9.879 9.879a3 3 0 104.242 4.242 3 3 0 00-4.242-4.242z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        paragraphs: [
            "Our premier 24-hour Radiology Department in Salem is dedicated to providing rapid and precise diagnostic imaging for all medical emergencies. Powered by a dedicated team of seven round-the-clock radiology technicians, we ensure seamless service delivery at any hour.",
            "The core of our emergency diagnostics is the Dual Slice GE Prospeed 2 CT machine, producing whole-body trauma CT films in well under 30 minutes—a critical factor in saving lives during the 'golden hour'."
        ],
        capabilities: [
            "CR & DR X-ray units for trauma",
            "Contrast CT for complex internal pathologies",
            "Dual Slice GE Prospeed 2 CT",
            "High-resolution skeletal imaging"
        ],
        theme: { bg: "#001f25", cardBg: "bg-white/5", text: "text-white", border: "border-white/10", accent: "#f98825", isDark: true }
    },
    {
        id: "02",
        title: "Clinical Laboratory Services",
        subtitle: "Round-the-clock Diagnostic Excellence",
        stat: { value: "<15m", label: "Critical TAT" },
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        paragraphs: [
            "Our 24-hour Laboratory provides uninterrupted diagnostic excellence 365 days a year. Managed by seven highly skilled technicians, we offer precise testing using advanced Hematology and Biochemistry units.",
            "For ICU and high-velocity trauma patients, we provide immediate ABG (Arterial Blood Gas) and Electrolyte analysis to guide critical life-saving decisions with the speed required in high-stakes environments."
        ],
        capabilities: [
            "Immediate ABG & Electrolyte analysis",
            "Hormonal & Tumor profiles",
            "Autoimmune disorder protocols",
            "Master Health Checkups"
        ],
        theme: { bg: "#f0fafa", cardBg: "bg-white", text: "text-[#00333c]", border: "border-[#e5eaeb]", accent: "#004b57", isDark: false }
    },
    {
        id: "03",
        title: "Specialized Diabetic Mini-Lab",
        subtitle: "Comprehensive Diabetes Monitoring",
        stat: { value: "100%", label: "Diabetic Protocol" },
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
        paragraphs: [
            "A dedicated facility focused on the comprehensive monitoring of diabetes-related complications. Operated by specialized technicians, we provide critical diagnostic data for treating diabetic neuropathy and angiopathy.",
            "We offer precise assessments for persistent abscesses and trophic ulcers, bridging the gap between routine blood work and advanced specialized diagnostics to tailor effective treatment plans for limb salvage."
        ],
        capabilities: [
            "Diabetic neuropathy screening",
            "Trophic ulcer wound care labs",
            "Advanced metabolic profiling",
            "Long-term glycemic control"
        ],
        theme: { bg: "#f9fafb", cardBg: "bg-white", text: "text-[#00333c]", border: "border-[#e5eaeb]", accent: "#f98825", isDark: false }
    },
    {
        id: "04",
        title: "Diagnostic & Interventional USG",
        subtitle: "Precision-guided Regenerative Therapies",
        stat: { value: "GE", label: "Versana System" },
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
        paragraphs: [
            "A center of excellence equipped with two state-of-the-art GE Versana USG machines. Powered by a collaborative team including a senior Radiologist, Pain Medicine Consultant, and Anesthetist.",
            "We specialize in ultra-precise ultrasound-guided biopsies and cutting-edge regenerative medicine, including PRP (Platelet-Rich Plasma) and Stem Cell injections for arthritis management and tissue repair."
        ],
        capabilities: [
            "Rapid trauma Echocardiography",
            "Ultrasound-guided biopsies",
            "PRP & Stem Cell injections",
            "Aesthetic dermatological USG"
        ],
        theme: { bg: "#00333c", cardBg: "bg-white/5", text: "text-white", border: "border-white/10", accent: "#3cb3a6", isDark: true }
    },
    {
        id: "05",
        title: "USG & Pain Management",
        subtitle: "Advanced Pain Relief Therapies",
        stat: { value: "80%", label: "Less Post-Op Pain" },
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        paragraphs: [
            "Our premier center for advanced pain relief ensures crystal-clear imaging for delicate interventions. We provide life-changing nerve blocks for trauma, ensuring immediate relief for acute pain.",
            "Our expertise extends to complex neurological pain, offering plexus and ganglion blocks for Trigeminal Neuralgia, TMJ, specialized protocols for chronic cancer pain and pain free Post Operative Phase."
        ],
        capabilities: [
            "Trauma nerve blocks",
            "Epidural & caudal injections",
            "Trigeminal Neuralgia blocks",
            "Chronic cancer pain management",
            "Chemical Neurolysis"
        ],
        theme: { bg: "#001f25", cardBg: "bg-white/5", text: "text-white", border: "border-white/10", accent: "#f98825", isDark: true }
    }
];

export default function FacilitiesPage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

    // Horizontal Scroll Logic
    const horizontalRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: horizontalRef });

    // Animate X translation from 0% to -80% (to scroll through the 5 items)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    // Dynamic background color transition based on scroll progress
    const bgColor = useTransform(scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        facilities.map(f => f.theme.bg)
    );

    // Dynamic nav/logo color logic
    const [isDarkBg, setIsDarkBg] = useState(true);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            // Determine active index roughly based on progress
            const index = Math.min(Math.floor(latest * 5), 4);
            setIsDarkBg(facilities[index].theme.isDark);
        });
    }, [scrollYProgress]);

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />

            {/* Immersive Hero Section */}
            <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center bg-[#001f25] overflow-hidden">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
                    {/* Glowing Orbs */}
                    <div className="absolute top-1/4 right-[-10%] w-[40vw] h-[40vw] bg-[#3cb3a6]/20 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#f98825]/15 rounded-full blur-[150px] mix-blend-screen" />

                    {/* Animated Grid Pattern */}
                    <motion.div
                        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                            backgroundSize: "60px 60px"
                        }}
                    />
                </motion.div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#f98825] shadow-[0_0_10px_#f98825] animate-pulse" />
                        Infrastructure
                    </motion.div>

                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[1.0] tracking-tighter mb-6"
                        >
                            The Architecture <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f98825] to-[#f9a052]">of Healing</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed font-medium mb-16"
                    >
                        Five specialized departments. Advanced diagnostic arrays. One unified mission to deliver precision care when every second counts.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-col items-center gap-4 text-white/30"
                    >
                        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to explore</span>
                        <motion.div
                            animate={{ height: ["0rem", "4rem", "0rem"], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-px bg-gradient-to-b from-[#f98825] to-transparent"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Horizontal Scroll Gallery Section */}
            <motion.section
                ref={horizontalRef}
                style={{ backgroundColor: bgColor }}
                className="relative h-[600vh]" // 600vh gives enough scroll distance for 5 items
            >
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-10 px-[10vw] md:px-[5vw] w-[500vw] md:w-[400vw] items-center">
                        {facilities.map((facility, index) => (
                            <div key={facility.id} className="w-[85vw] md:w-[75vw] h-[80vh] flex-shrink-0 relative group perspective-[2000px]">
                                <motion.div
                                    className={`w-full h-full rounded-[2.5rem] border shadow-2xl overflow-hidden ${facility.theme.cardBg} ${facility.theme.border} backdrop-blur-xl relative flex flex-col`}
                                    style={{
                                        boxShadow: facility.theme.isDark ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.05)"
                                    }}
                                >
                                    {/* Subtle background number parallax */}
                                    <div className="absolute right-0 bottom-[-5%] text-[12rem] lg:text-[16rem] font-black leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                                        style={{ color: facility.theme.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                                        {facility.id}
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 relative z-10">

                                        {/* Left Side: Title & Stat */}
                                        <div className={`lg:col-span-5 p-8 lg:p-12 flex flex-col border-b lg:border-b-0 lg:border-r ${facility.theme.border}`}>
                                            <div className="flex items-center gap-4 mb-auto">
                                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                                                    style={{ backgroundColor: `${facility.theme.accent}15`, color: facility.theme.accent }}>
                                                    {facility.icon}
                                                </div>
                                                <div className={`text-sm font-black tracking-[0.25em] uppercase ${facility.theme.isDark ? 'text-white/40' : 'text-black/40'}`}>
                                                    Facility {facility.id}
                                                </div>
                                            </div>

                                            <div className="mt-12 lg:mt-0">
                                                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 ${facility.theme.text}`}>
                                                    {facility.title}
                                                </h2>

                                                <p className={`text-base font-medium mb-10 max-w-sm ${facility.theme.isDark ? 'text-white/60' : 'text-[#475569]'}`}>
                                                    {facility.subtitle}
                                                </p>

                                                <div className="pt-6 border-t" style={{ borderColor: `${facility.theme.accent}30` }}>
                                                    <div className="text-4xl lg:text-5xl font-black mb-1 tracking-tight" style={{ color: facility.theme.accent }}>
                                                        {facility.stat.value}
                                                    </div>
                                                    <div className={`text-xs font-bold uppercase tracking-widest ${facility.theme.isDark ? 'text-white/40' : 'text-[#94a3b8]'}`}>
                                                        {facility.stat.label}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Details & Capabilities */}
                                        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-black/[0.02]">
                                            <div className="space-y-5 mb-12 relative z-10">
                                                {facility.paragraphs.map((p, i) => (
                                                    <p key={i} className={`text-base lg:text-lg leading-relaxed ${facility.theme.isDark ? 'text-white/75' : 'text-[#40484a]'}`}>
                                                        {p}
                                                    </p>
                                                ))}
                                            </div>

                                            <div className="relative z-10">
                                                <div className={`text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 ${facility.theme.isDark ? 'text-white/40' : 'text-black/30'}`}>
                                                    <span className="w-8 h-px bg-current" />
                                                    Key Capabilities
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                                    {facility.capabilities.map((cap, i) => (
                                                        <div key={i} className="flex items-start gap-4 group/cap">
                                                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 transition-colors duration-300 group-hover/cap:bg-current"
                                                                style={{ backgroundColor: `${facility.theme.accent}15`, color: facility.theme.accent }}>
                                                                <svg className="w-3 h-3 text-current group-hover/cap:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <span className={`text-sm lg:text-base font-semibold transition-colors ${facility.theme.isDark ? 'text-white/80 group-hover/cap:text-white' : 'text-[#00333c] group-hover/cap:text-[#f98825]'}`}>
                                                                {cap}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Ultra-Premium CTA */}
            <section className="bg-[#001f25] py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-[-50%] right-[-10%] w-[70vw] h-[70vw] bg-[#00333c] rounded-full blur-[100px] z-0 opacity-50" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-[60vw] h-[60vw] bg-[#f98825]/10 rounded-full blur-[120px] z-0" />
                </div>
                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-24 h-24 bg-[#f98825] rounded-[2rem] mx-auto mb-10 flex items-center justify-center rotate-12 shadow-2xl shadow-[#f98825]/30 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                        <svg className="w-12 h-12 text-white -rotate-12 hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
                        Excellence is not an act, <br className="hidden md:block" />
                        <span className="text-[#f98825]">but a standard.</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/60 text-xl mb-12 max-w-2xl mx-auto font-medium">
                        Experience the precision of advanced diagnostics and the warmth of compassionate care. Your health deserves nothing less.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a href="/book-appointment" className="group relative bg-[#f98825] text-white px-10 py-5 rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 shadow-xl shadow-[#f98825]/20">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                            <span className="relative z-10 flex items-center gap-2">Book an Appointment <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
                        </a>
                        <a href="tel:+919003417111" className="text-white/80 font-bold text-sm hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1 flex items-center gap-2">
                            Call 24/7 Emergency Line
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
