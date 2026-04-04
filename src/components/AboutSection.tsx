"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

// Aceternity/Magic UI inspired Blur Reveal effect
const BlurFade = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
        {children}
    </motion.div>
);

// High-end Scroll Word Reveal component (like modern Awwwards sites)
const WordFade = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
            {children}
        </motion.span>
    );
};

const ScrollTextReveal = ({ text }: { text: string }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 85%", "end 50%"]
    });

    const words = text.split(" ");
    return (
        <p ref={ref} className="text-xl md:text-2xl lg:text-[1.6rem] text-[#00333c] leading-[1.7] font-medium tracking-wide flex flex-wrap">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return <WordFade key={i} progress={scrollYProgress} range={[start, end]}>{word}</WordFade>;
            })}
        </p>
    );
};

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Elegant and lightweight parallax effects for the sticky image
    const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const P1 = "From its landmark inception in October 2022 as Valli Orthopedic and Sports Hospital, our institution has been driven by a singular mission: to provide world-class surgical and rehabilitative care. Recognizing the growing need for comprehensive medical intervention in the region, we underwent a transformative upgradation in 2025, emerging as Valli Superspecialty Hospital. This expansion has solidified our position as a premier 50-bedded multispecialty hub, where advanced technology meets compassionate care.";

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative py-24 md:py-32 lg:py-48 bg-[#f8fbfa] selection:bg-[#004b57] selection:text-white"
        >
            <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left side: Sticky High-End Parallax Image. No text overlays, purely visual. */}
                    <div className="lg:col-span-5 relative w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] rounded-[2rem] overflow-hidden lg:sticky lg:top-24 shadow-2xl bg-[#004b57] border border-black/5">
                        <motion.div
                            className="absolute inset-0 w-full h-full origin-top"
                        >
                            <motion.img
                                style={{ y: imgY, scale: imgScale }}
                                src="/hospital.png"
                                alt="Valli Superspecialty Hospital"
                                className="w-full h-[120%] -top-[10%] relative object-cover filter contrast-[1.05] grayscale-[5%] will-change-transform"
                            />
                            {/* Elegant Cinematic Overlays (Minimal) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00333c]/80 via-transparent to-transparent opacity-80" />
                            <div className="absolute inset-0 bg-[#004b57]/10 mix-blend-overlay" />
                        </motion.div>
                    </div>

                    {/* Right side: Typographic Content River */}
                    <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-12 pb-12 lg:pb-24">

                        <BlurFade delay={0}>
                            <div className="flex items-center gap-3 text-[#3cb3a6] font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-8">
                                <span className="w-12 h-[1px] bg-[#3cb3a6]"></span>
                                Heritage & Evolution
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.1}>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-light text-[#004b57] leading-[1.05] tracking-tight mb-16">
                                The Evolution of Excellence: <br />
                                <span className="font-bold text-[#f98825]">Valli Superspecialty Hospital</span>
                            </h2>
                        </BlurFade>

                        <div className="space-y-12 lg:space-y-16">

                            {/* Stunning Text Reveal by scroll - Shadcn/Aceternity style */}
                            <ScrollTextReveal text={P1} />

                            <BlurFade delay={0.1}>
                                <div className="h-px w-full bg-gradient-to-r from-[#004b57]/10 to-transparent my-2"></div>
                            </BlurFade>

                            <BlurFade delay={0.2}>
                                <p className="text-lg lg:text-xl text-[#40484a]/90 leading-[1.9] font-light">
                                    While our roots remain deeply embedded in Sports Medicine, Spine Surgeries, and Joint Replacements, our growth has been defined by an obsession with Trauma and Emergency services. We operate with the belief that during the <span className="font-medium text-[#f98825]">"Golden Hour,"</span> every second is a lifeline.
                                </p>
                            </BlurFade>

                            <BlurFade delay={0.3}>
                                <div className="pl-6 md:pl-8 border-l-[3px] border-[#3cb3a6]/80 py-2 bg-gradient-to-r from-[#3cb3a6]/5 to-transparent rounded-r-xl">
                                    <p className="text-lg lg:text-xl text-[#004b57] leading-[1.9] font-medium pr-4">
                                        To support this, we have integrated a high-tech ICU, a sophisticated Surgical Gastroenterology wing, and a 24/7 diagnostic suite featuring CT scans and Ultrasound.
                                    </p>
                                </div>
                            </BlurFade>

                            <BlurFade delay={0.4}>
                                <p className="text-lg lg:text-xl text-[#40484a]/90 leading-[1.9] font-light">
                                    With a medical team rigorously trained in ACLS and ATLS, Valli Superspecialty Hospital stands as a beacon of reliability—transforming complex emergencies into stories of survival and recovery.
                                </p>
                            </BlurFade>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
