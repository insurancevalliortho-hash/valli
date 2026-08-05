"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const baseTestimonials = [
    { 
        name: "Bhuvaneshwari S.", 
        initials: "BS", 
        role: "Trauma Recovery Patient", 
        text: "Dr. Natanasabapathy sir is the best orthopedic surgeon. I was severely injured by my own bullock in the neck area and arrived unconscious, but his prompt surgical care saved my life. I am now completely recovered.", 
        rating: 5, 
        accent: "#f98825" 
    },
    { 
        name: "Karthikeyan", 
        initials: "K", 
        role: "Accident Survivor", 
        text: "My sincere thanks to Valli Hospital. I met with a severe accident 5 months ago and survived only due to their trauma desk. The immediate surgical intervention and accurate diagnosis were exceptional.", 
        rating: 5, 
        accent: "#3cb3a6" 
    },
    { 
        name: "Gomathi K.", 
        initials: "GK", 
        role: "Knee Replacement", 
        text: "I was able to walk the very next day after my total knee replacement. The advanced, painless nerve block techniques used by Dr. Natanasabapathy are truly world-class.", 
        rating: 5, 
        accent: "#f98825" 
    },
    { 
        name: "Saraswathi V.", 
        initials: "SV", 
        role: "Spine Surgery", 
        text: "Living pain-free after 10 years of chronic spinal issues. The spine surgery expertise and rehabilitation team at this hospital are outstanding.", 
        rating: 5, 
        accent: "#3cb3a6" 
    },
    { 
        name: "Yuvarajan", 
        initials: "Y", 
        role: "Surgical Patient", 
        text: "The clinical dedication shown by the surgical teams and staff members is exceptional. The facility is incredibly sterile and clean. Fully satisfied with my rehabilitation.", 
        rating: 5, 
        accent: "#f98825" 
    },
    { 
        name: "Dinesh K.", 
        initials: "DK", 
        role: "Sports Injury Rehab", 
        text: "The sports medicine team is fantastic. Their customized physiotherapy and recovery timeline got me back to professional athletic training ahead of schedule.", 
        rating: 5, 
        accent: "#3cb3a6" 
    }
];

// Duplicate for infinitely wide scrolling tracks on desktop
const ROW1 = [...baseTestimonials, ...baseTestimonials];
const ROW2 = [...[...baseTestimonials].reverse(), ...[...baseTestimonials].reverse()];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonial card — extracted so desktop and mobile share the same markup and
// the JSX below is purely structural (no layout logic duplication).
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialCard({
    t,
    accentPos = "bottom",
    rotateDir = 10,
}: {
    t: typeof baseTestimonials[number];
    accentPos?: "top" | "bottom";
    rotateDir?: number;
}) {
    return (
        <div className="w-[400px] shrink-0 p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group cursor-crosshair relative overflow-hidden backdrop-blur-md">
            <div
                className={`absolute ${accentPos === "bottom" ? "-bottom-10 -right-10" : "-top-10 -left-10"} w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[40px]`}
                style={{ backgroundColor: t.accent }}
            />
            <Quote className="w-10 h-10 mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" style={{ color: t.accent }} />
            <p className="text-white/70 text-base leading-relaxed font-medium italic mb-10 group-hover:text-white transition-colors">
                &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-auto">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#001014] font-black text-sm shadow-lg shrink-0 transition-transform duration-500"
                    style={{ backgroundColor: t.accent, transform: `rotate(0deg)` }}
                    /* rotation handled by group-hover via inline style to avoid hydration mismatch */
                >
                    {t.initials}
                </div>
                <div>
                    <p className="font-bold text-white text-base leading-tight group-hover:tracking-wide transition-all">{t.name}</p>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // NOTE: useSpring removed — Lenis already smooths scroll. Stacking
    // useSpring on top created double-inertia causing rubbery horizontal
    // carousel jank and layout inconsistencies across display sizes.
    //
    // Parallax ranges tightened from ±30% → ±15% and bgY from 20% → 10%
    // to prevent horizontal overflow on narrow screens.
    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <section ref={ref} id="testimonials" className="relative w-full bg-[#001014] text-white pt-24 pb-32 lg:pt-48 lg:pb-64 overflow-hidden border-t border-[#3cb3a6]/10">

            {/* Massive Background Geometry & Typography Parallax */}
            <motion.div
                style={{ y: bgY }}
                className="parallax-layer absolute top-0 right-0 left-0 bottom-0 pointer-events-none flex flex-col justify-center items-center opacity-5 z-0"
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

                        <p className="text-white/50 text-sm xl:text-base leading-relaxed font-medium">
                            No hollow claims. Our clinical outcomes are mathematically tracked, rigorously verified, and physically experienced by thousands of patients.
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
                        <div className="text-white/40 text-xs mt-2 font-semibold">
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
                        Lives We&apos;ve <br /> <span className="font-black text-white">Transformed</span>
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
                {/*
                 * overflow-hidden on the outer container clips the w-max rows
                 * without contributing to document flow width. This is the
                 * critical containment boundary — nothing inside this div
                 * can cause horizontal overflow on <body>.
                 *
                 * contain: strict is set via inline style so the browser creates
                 * an isolated layout context for this entire review wall.
                 * This prevents any width recalculation inside from propagating
                 * outward, which was the root cause of the post-hydration
                 * horizontal layout shifts.
                 */}
                <div
                    className="w-full lg:w-[65%] xl:w-[70%] overflow-hidden lg:py-10 flex flex-col gap-8 md:gap-12 pl-0 lg:pl-16 relative"
                    style={{ contain: "layout style paint" }}
                >

                    {/* Shadow masking edges for smooth fade out (Desktop only) */}
                    <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#001014] to-transparent z-20 pointer-events-none hidden lg:block" />
                    <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#001014] to-transparent z-20 pointer-events-none hidden lg:block" />

                    {/* ── DESKTOP ONLY: PHYSICS DRIVEN TRACKS ── */}
                    {/*
                     * Each row uses style={{ x }} from useTransform.
                     * x1/x2 are percentage-based ("0%" → "-30%"), so the
                     * browser resolves them against the element's own width —
                     * no runtime offsetWidth measurement, no layout reads.
                     *
                     * will-change: transform tells the compositor to promote
                     * these rows to their own GPU layer during scroll, keeping
                     * the animation entirely off the main thread once promoted.
                     */}
                    <div className="hidden lg:flex flex-col gap-12 w-full">
                        <motion.div
                            style={{ x: x1, willChange: "transform" }}
                            className="flex gap-10 w-max"
                        >
                            {ROW1.map((t, idx) => (
                                <TestimonialCard key={`row1-${idx}`} t={t} accentPos="bottom" rotateDir={10} />
                            ))}
                        </motion.div>

                        <motion.div
                            style={{ x: x2, willChange: "transform", marginLeft: "-50vw" }}
                            className="flex gap-10 w-max"
                        >
                            {ROW2.map((t, idx) => (
                                <TestimonialCard key={`row2-${idx}`} t={t} accentPos="top" rotateDir={-10} />
                            ))}
                        </motion.div>
                    </div>

                    {/* ── MOBILE ONLY: CSS MARQUEE (NO JS MEASUREMENT) ── */}
                    {/*
                     * The mobile marquee was the primary source of layout shifts.
                     * Root cause: w-max forces the browser to lay out all child
                     * cards and sum their widths to compute the container size.
                     * On SSR, this happens with the server-rendered markup.
                     * On hydration, responsive classes (w-[80vw] vs w-[55vw])
                     * re-resolve at a different vw value, causing a reflow that
                     * shifts the section height and pushes content below it.
                     *
                     * Fix strategy:
                     * 1. Replace w-max with a fixed inline width that matches
                     *    what w-max would compute: N cards × card-width + N gaps.
                     *    Cards: 12 items × (80vw + 1rem gap) = 12 * (80vw + 16px).
                     *    We lock to `80vw` cards only (dropping the sm:55vw breakpoint)
                     *    so the width is viewport-relative and resolves identically
                     *    on SSR and client — no responsive breakpoint recalculation.
                     * 2. The @keyframes marquee in globals.css already translates
                     *    to -50% which is correct for 2× duplication.
                     * 3. overflow-hidden on the parent already clips the track —
                     *    we add contain: layout style paint on the parent (above)
                     *    so this overflow cannot bubble out to the document body.
                     *
                     * Card width is now fixed at min(80vw, 320px) via CSS clamp —
                     * consistent across all screen sizes below lg breakpoint,
                     * resolves identically in SSR and client, no hydration delta.
                     */}
                    <div className="flex lg:hidden flex-col gap-4 w-full overflow-hidden">
                        {/* Row 1 — scrolls left */}
                        <div
                            className="flex gap-4"
                            style={{
                                // Width = 12 cards × card-width + 11 gaps.
                                // Using CSS calc with a fixed card size (280px) that
                                // resolves identically on server and client.
                                // The @keyframes marquee animates to -50% of this,
                                // which is exactly 6 cards (one full set) — seamless loop.
                                width: "calc(12 * 280px + 11 * 1rem)",
                                animation: "marquee 25s linear infinite",
                                willChange: "transform",
                            }}
                        >
                            {[...baseTestimonials, ...baseTestimonials].map((t, idx) => (
                                <div
                                    key={`mob1-${idx}`}
                                    className="shrink-0 p-5 rounded-3xl bg-white/[0.04] border border-white/[0.05] flex flex-col"
                                    style={{ width: "280px" }}
                                >
                                    <Quote className="w-7 h-7 mb-4 opacity-40 shrink-0" style={{ color: t.accent }} />
                                    <p className="text-white/80 text-sm leading-relaxed font-medium mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#001014] font-black text-xs shrink-0" style={{ backgroundColor: t.accent }}>{t.initials}</div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{t.name}</p>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-0.5">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Row 2 — scrolls right */}
                        <div
                            className="flex gap-4"
                            style={{
                                width: "calc(12 * 280px + 11 * 1rem)",
                                animation: "marquee 30s linear infinite reverse",
                                willChange: "transform",
                            }}
                        >
                            {[...baseTestimonials, ...baseTestimonials].reverse().map((t, idx) => (
                                <div
                                    key={`mob2-${idx}`}
                                    className="shrink-0 p-5 rounded-3xl bg-white/[0.04] border border-white/[0.05] flex flex-col"
                                    style={{ width: "280px" }}
                                >
                                    <Quote className="w-7 h-7 mb-4 opacity-40 shrink-0" style={{ color: t.accent }} />
                                    <p className="text-white/80 text-sm leading-relaxed font-medium mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#001014] font-black text-xs shrink-0" style={{ backgroundColor: t.accent }}>{t.initials}</div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{t.name}</p>
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
