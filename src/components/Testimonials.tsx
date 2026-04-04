"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const baseTestimonials = [
    { name: "Bhuvaneshwari S.", initials: "BS", role: "Trauma Recovery Patient", text: "Dr. Natanasabapathy sir, you are the best ortho surgeon I have ever seen. Thank you so much for your care. I was injured by my own bullock in the neck area... I was unconscious but now I'm completely alright. He did a great job.", rating: 5, accent: "#f98825" },
    { name: "Karthikeyan", initials: "K", role: "Accident Survivor", text: "My sincere thanks to Valli Super Speciality Hospital. I met with a severe accident 5 months ago. Today I am living my life only because of the doctors here. Excellent treatment and accurate diagnosis.", rating: 5, accent: "#3cb3a6" },
    { name: "Yuvarajan", initials: "Y", role: "Surgical Patient", text: "Care shown by the doctors and staff members is outstanding. The procedure went better than we hoped. Clean and hygienic environment. I am fully satisfied.", rating: 5, accent: "#f98825" },
    { name: "Anonymous", initials: "A", role: "Joint Care Patient", text: "After years of pain, I can finally enjoy my morning walks again. Thanks to Valli Ortho for giving me my life back!", rating: 5, accent: "#3cb3a6" },
    { name: "Priya M.", initials: "PM", role: "Post-Op Rehab", text: "The post-operative care and rehabilitation frameworks here are tremendous. My knee mobility returned flawlessly.", rating: 5, accent: "#f98825" },
    { name: "Ramesh T.", initials: "RT", role: "Fracture Recovery", text: "State of the art architectural facility. The surgical precision was seamless and the recovery timeframe was exactly as promised.", rating: 5, accent: "#3cb3a6" },
    { name: "Selvam P.", initials: "SP", role: "Orthopedic Patient", text: "The dedication of the team is unmatched. From diagnosis to surgery and physiotherapy, everything was handled professionally.", rating: 5, accent: "#f98825" },
    { name: "Gomathi K.", initials: "GK", role: "Knee Replacement", text: "I walked the very next day after my knee replacement. The advanced techniques used by Dr. Natanasabapathy are truly world-class.", rating: 5, accent: "#3cb3a6" },
    { name: "Dinesh K.", initials: "DK", role: "Sports Injury", text: "The sports medicine wing is fantastic. Accurate diagnosis and a beautifully structured rehab program got me back on the field.", rating: 5, accent: "#f98825" },
    { name: "Saraswathi V.", initials: "SV", role: "Spine Surgery", text: "Living pain-free after 10 years of chronic back issues. The spinal expertise at this hospital is extraordinary.", rating: 5, accent: "#3cb3a6" }
];

// Duplicate for infinitely wide scrolling tracks on desktop
const ROW1 = [...baseTestimonials, ...baseTestimonials];
const ROW2 = [...[...baseTestimonials].reverse(), ...[...baseTestimonials].reverse()];

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const spring = useSpring(scrollYProgress, { damping: 30, stiffness: 60, mass: 0.2 });

    // Desktop Reverse movement bindings
    const x1 = useTransform(spring, [0, 1], ["0%", "-30%"]);
    const x2 = useTransform(spring, [0, 1], ["-30%", "0%"]);

    const bgY = useTransform(spring, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} id="testimonials" className="relative w-full bg-[#001014] text-white pt-24 pb-32 lg:pt-48 lg:pb-64 overflow-hidden border-t border-[#3cb3a6]/10">

            {/* Massive Background Geometry & Typography Parallax */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-0 right-0 left-0 bottom-0 pointer-events-none flex flex-col justify-center items-center opacity-5 z-0"
            >
                <div className="text-[25vw] font-black leading-none uppercase whitespace-nowrap text-[#f98825] tracking-tighter mix-blend-screen">
                    OUTCOMES
                </div>
            </motion.div>

            {/* Ambient Lighting */}
            <div className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vh] bg-[#3cb3a6]/10 rounded-full blur-[200px] pointer-events-none z-0" />
            <div className="absolute bottom-[10%] -right-[10%] w-[50vw] h-[50vh] bg-[#f98825]/10 rounded-full blur-[200px] pointer-events-none z-0" />

            <div className="w-full flex flex-col lg:flex-row relative z-10 2xl:max-w-[2400px] mx-auto">

                {/* ── STICKY LEFT: THE STATS ANCHOR ── */}
                <div className="hidden lg:flex w-[35%] xl:w-[30%] shrink-0 flex-col justify-center px-10 xl:px-20 border-r border-[#3cb3a6]/20 bg-[#001014]/60 backdrop-blur-xl z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}
                        className="mb-16"
                    >
                        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse shadow-[0_0_10px_#f98825]" />
                            Verification Protocol
                        </span>

                        <h2 className="text-4xl xl:text-5xl font-light leading-[1.2] tracking-tight mb-6">
                            Architecting <br /> <span className="font-black text-white text-5xl xl:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Recovery</span>
                        </h2>

                        <p className="text-white/50 text-sm xl:text-base leading-relaxed">
                            No hollow promises. Our clinical outcomes are mathematically tracked, rigorously verified, and physically felt by thousands who reclaimed their movement.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }}
                        className="group"
                    >
                        <div className="text-8xl xl:text-[9rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-[#3cb3a6]/30 leading-[0.8] tracking-tighter mb-4 group-hover:scale-105 transition-transform duration-700 ease-out origin-left">
                            4.7
                        </div>
                        <div className="flex text-[#f98825] text-2xl mb-3 drop-shadow-[0_0_10px_rgba(249,136,37,0.4)]">
                            ★★★★★
                        </div>
                        <div className="text-[#3cb3a6] font-black text-sm uppercase tracking-[0.2em] mb-1">
                            920 Google Reviews
                        </div>
                        <div className="text-white/40 text-xs mt-2">
                            Orthopedic clinic in Salem, Tamil Nadu
                        </div>
                    </motion.div>
                </div>

                {/* ── MOBILE HEADER (Visible only on small screens) ── */}
                <div className="lg:hidden w-full px-6 mb-12 flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Patient Outcomes
                    </span>
                    <h2 className="text-4xl font-light leading-[1.1] tracking-tight mb-2">
                        Lives We've <br /> <span className="font-black text-white">Transformed</span>
                    </h2>

                    <div className="mt-8 p-6 rounded-3xl border border-white/10 bg-white/[0.02] w-full max-w-sm">
                        <div className="text-6xl font-black text-white leading-[0.8] tracking-tighter mb-3">
                            4.7
                        </div>
                        <div className="flex justify-center text-xl text-[#f98825] drop-shadow-[0_0_10px_rgba(249,136,37,0.4)] mb-3">
                            ★★★★★
                        </div>
                        <div className="text-[#3cb3a6] font-bold text-[10px] uppercase tracking-[0.2em]">
                            920 Google Reviews
                        </div>
                    </div>
                </div>

                {/* ── HIGH PERFORMANCE REVIEW WALL ── */}
                <div className="w-full lg:w-[70%] overflow-hidden lg:py-10 flex flex-col gap-8 md:gap-12 pl-0 lg:pl-16 relative">

                    {/* Shadow masking edges for smooth fade out (Desktop only) */}
                    <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#001014] to-transparent z-20 pointer-events-none hidden lg:block" />
                    <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#001014] to-transparent z-20 pointer-events-none hidden lg:block" />

                    {/* ── DESKTOP ONLY: PHYSICS DRIVEN TRACKS ── */}
                    <div className="hidden lg:flex flex-col gap-12 w-full">
                        <motion.div style={{ x: x1 }} className="flex gap-10 w-max">
                            {ROW1.map((t, idx) => (
                                <div key={`row1-${idx}`} className="w-[400px] shrink-0 p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group cursor-crosshair relative overflow-hidden backdrop-blur-md">
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[40px]" style={{ backgroundColor: t.accent }} />
                                    <Quote className="w-10 h-10 mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" style={{ color: t.accent }} />
                                    <p className="text-white/70 text-base leading-relaxed font-medium italic mb-10 group-hover:text-white transition-colors">
                                        &ldquo;{t.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#001014] font-black text-sm shadow-lg shrink-0 transition-transform duration-500 group-hover:rotate-[10deg]" style={{ backgroundColor: t.accent }}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base leading-tight group-hover:tracking-wide transition-all">{t.name}</h4>
                                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div style={{ x: x2 }} className="flex gap-10 w-max ml-[-50vw]">
                            {ROW2.map((t, idx) => (
                                <div key={`row2-${idx}`} className="w-[400px] shrink-0 p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group cursor-crosshair relative overflow-hidden backdrop-blur-md">
                                    <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[40px]" style={{ backgroundColor: t.accent }} />
                                    <Quote className="w-10 h-10 mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" style={{ color: t.accent }} />
                                    <p className="text-white/70 text-base leading-relaxed font-medium italic mb-10 group-hover:text-white transition-colors">
                                        &ldquo;{t.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#001014] font-black text-sm shadow-lg shrink-0 transition-transform duration-500 group-hover:rotate-[-10deg]" style={{ backgroundColor: t.accent }}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base leading-tight group-hover:tracking-wide transition-all">{t.name}</h4>
                                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── MOBILE ONLY: AUTO-PLAYING MARQUEE (no scrollbar) ── */}
                    <div className="flex lg:hidden flex-col gap-4 w-full overflow-hidden">
                        {/* Row 1 — scrolls left */}
                        <div className="flex gap-4 w-max animate-[marquee_40s_linear_infinite]">
                            {[...baseTestimonials, ...baseTestimonials].map((t, idx) => (
                                <div key={`mob1-${idx}`} className="w-[80vw] sm:w-[55vw] shrink-0 p-5 rounded-3xl bg-white/[0.04] border border-white/[0.05] flex flex-col">
                                    <Quote className="w-7 h-7 mb-4 opacity-40 shrink-0" style={{ color: t.accent }} />
                                    <p className="text-white/80 text-sm leading-relaxed font-medium mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#001014] font-black text-xs shrink-0" style={{ backgroundColor: t.accent }}>{t.initials}</div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{t.name}</h4>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-0.5">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Row 2 — scrolls right */}
                        <div className="flex gap-4 w-max animate-[marquee_50s_linear_infinite_reverse]">
                            {[...baseTestimonials, ...baseTestimonials].reverse().map((t, idx) => (
                                <div key={`mob2-${idx}`} className="w-[80vw] sm:w-[55vw] shrink-0 p-5 rounded-3xl bg-white/[0.04] border border-white/[0.05] flex flex-col">
                                    <Quote className="w-7 h-7 mb-4 opacity-40 shrink-0" style={{ color: t.accent }} />
                                    <p className="text-white/80 text-sm leading-relaxed font-medium mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#001014] font-black text-xs shrink-0" style={{ backgroundColor: t.accent }}>{t.initials}</div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{t.name}</h4>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-0.5">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
