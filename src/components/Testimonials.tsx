"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    { name: "Bhuvaneshwari S.", initials: "BS", role: "Trauma Recovery Patient", text: "Dr. Natanasabapathy sir, you are the best ortho surgeon I have ever seen. Thank you so much for your care. I was injured by my own bullock in the neck area... I was unconscious but now I'm completely alright. He did a great job.", rating: 5, accent: "#f98825" },
    { name: "Karthikeyan", initials: "K", role: "Accident Survivor", text: "My sincere thanks to Valli Super Speciality Hospital. I met with a severe accident 5 months ago. Today I am living my life only because of the doctors here. Excellent treatment and accurate diagnosis.", rating: 5, accent: "#3cb3a6" },
    { name: "Yuvarajan", initials: "Y", role: "Surgical Patient", text: "Care shown by the doctors and staff members is outstanding. The procedure went better than we hoped. Clean and hygienic environment. I am fully satisfied.", rating: 5, accent: "#f98825" },
    { name: "Anonymous", initials: "A", role: "Joint Care Patient", text: "After years of pain, I can finally enjoy my morning walks again. Thanks to Valli Ortho for giving me my life back!", rating: 5, accent: "#004b57" },
];

const PAGES = [[0, 1], [2, 3]];

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(1);
    const dragX = useMotionValue(0);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const shapeY1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const shapeY2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

    const goPage = useCallback((p: number, dir: number) => { setDirection(dir); setPage(p); }, []);
    const prev = useCallback(() => goPage((page - 1 + PAGES.length) % PAGES.length, -1), [page, goPage]);
    const next = useCallback(() => goPage((page + 1) % PAGES.length, 1), [page, goPage]);

    useEffect(() => { const t = setInterval(() => next(), 6000); return () => clearInterval(t); }, [next]);

    const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
        if (info.offset.x < -50) next();
        else if (info.offset.x > 50) prev();
        dragX.set(0);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0, scale: 0.93 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0, scale: 0.93 }),
    };

    return (
        <section id="testimonials" ref={ref} className="py-24 md:py-36 bg-[#001f25] relative overflow-hidden text-white">
            <motion.div style={{ y: shapeY1 }} className="absolute -top-32 -right-32 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#f98825]/10 rounded-[5rem] rotate-45 pointer-events-none" />
            <motion.div style={{ y: shapeY2 }} className="absolute -bottom-32 -left-24 w-[35vw] h-[35vw] max-w-[440px] max-h-[440px] bg-[#3cb3a6]/8 rounded-[4.5rem] rotate-45 pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] border border-white/[0.04] rounded-[8rem] rotate-45 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center max-w-2xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#f98825] border border-white/10 text-xs font-bold tracking-[0.18em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />Patient Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight mb-5 leading-[1.07]">
                        Lives We&apos;ve <span className="text-[#f98825]">Transformed</span>
                    </h2>
                    <p className="text-lg text-white/55 font-medium leading-relaxed">Real stories from patients who reclaimed their health, mobility, and confidence.</p>
                </motion.div>

                {/* 2-up carousel */}
                <div className="overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div key={page} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd} style={{ x: dragX }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-grab active:cursor-grabbing"
                        >
                            {PAGES[page].map((idx) => {
                                const t = testimonials[idx];
                                return (
                                    <div key={t.name} className="relative rounded-[2rem] p-7 md:p-9 border border-white/10 bg-white/[0.06] backdrop-blur-md overflow-hidden">
                                        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-[1.2rem] rotate-45 opacity-20" style={{ backgroundColor: t.accent }} />
                                        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-[1rem] rotate-45 opacity-10" style={{ backgroundColor: t.accent }} />
                                        <Quote className="w-8 h-8 mb-5 opacity-60" style={{ color: t.accent }} />
                                        <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed italic mb-7">&ldquo;{t.text}&rdquo;</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg shrink-0" style={{ backgroundColor: t.accent }}>
                                                {t.initials}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-base leading-tight">{t.name}</h4>
                                                <p className="text-white/40 text-xs font-medium mt-0.5">{t.role}</p>
                                                <div className="flex text-[#ffb400] text-xs mt-1">{"★".repeat(t.rating)}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-5 mt-10">
                    <button onClick={prev} className="w-11 h-11 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all duration-200">
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="flex gap-2.5">
                        {PAGES.map((_, i) => (
                            <button key={i} onClick={() => goPage(i, i > page ? 1 : -1)} className="h-2 rounded-full transition-all duration-300"
                                style={{ width: page === i ? 28 : 8, backgroundColor: page === i ? "#f98825" : "rgba(255,255,255,0.2)" }} />
                        ))}
                    </div>
                    <button onClick={next} className="w-11 h-11 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all duration-200">
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Rating bar */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl border border-white/8 bg-white/5 max-w-lg mx-auto">
                    <div className="text-center sm:text-left">
                        <div className="text-5xl font-black text-white leading-none">4.9</div>
                        <div className="text-[#ffb400] text-xl mt-1">★★★★★</div>
                        <div className="text-white/35 text-[11px] font-bold uppercase tracking-wider mt-1">Overall Rating</div>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden sm:block" />
                    <div className="text-center sm:text-left">
                        <div className="text-white font-medium">Based on <strong>500+</strong> verified reviews</div>
                        <div className="text-white/40 text-sm mt-1">across Google, Practo & direct feedback</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
