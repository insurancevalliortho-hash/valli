"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const facilities = [
    {
        title: "Advanced Emergency Room",
        description: "Equipped with an Advanced Trauma Life Support facility, ready to handle all critical and emergency cases 24/7 with immediate response protocols.",
        img: "https://images.unsplash.com/photo-1587560699334-cc4cf8e3e40c?auto=format&fit=crop&q=80&w=1200",
        stats: "24/7 Rapid Response"
    },
    {
        title: "Sports Physiotherapy & Rehab",
        description: "Personalized exercise and diet plans (including Genetic Testing for athletes) to restore mobility, enhance performance, and prevent future injuries.",
        img: "https://images.unsplash.com/photo-1576089291666-6b2de66c8916?auto=format&fit=crop&q=80&w=1200",
        stats: "Elite Recovery"
    },
    {
        title: "24/7 In-House Pharmacy",
        description: "Fully stocked with essential medicines and specialized medical supplies, catering to both in-patients and out-patients at all times.",
        img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80&w=1200",
        stats: "Always Accessible"
    },
    {
        title: "Strict Sterilization Protocols",
        description: "We pride ourselves on maintaining the highest standards of clinical cleanliness and hygiene, frequently praised by our patients for a safe environment.",
        img: "https://images.unsplash.com/photo-1581594693702-8a9d16a5b253?auto=format&fit=crop&q=80&w=1200",
        stats: "Ultra-Hygienic"
    }
];

export default function TechShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            id="facilities"
            ref={containerRef}
            className="relative bg-[#ffffff] text-[#0e1e1e]"
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative py-24">

                    {/* Left Sticky Column */}
                    <div className="lg:w-5/12 hidden lg:block">
                        <div className="sticky top-40">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#f98825] border border-[#f98825]/20 text-xs font-bold tracking-[0.2em] uppercase mb-6"
                            >
                                Infrastructure
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-black text-[#00333c] leading-[1.1] tracking-tight mb-8"
                            >
                                State-of-the-Art <br />
                                <span className="text-[#f98825]">
                                    Facilities
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-[#40484a] font-medium leading-relaxed max-w-md"
                            >
                                Valli Super Speciality Hospital is equipped with modern infrastructure to guarantee maximum safety, precise treatments, and uncompromising comfort.
                            </motion.p>

                            {/* Decorative element marking scroll progress visually */}
                            <div className="mt-16 w-1 h-32 bg-white rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute top-0 left-0 w-full bg-[#004b57] rounded-full"
                                    style={{
                                        height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Header (Only visible on small screens) */}
                    <div className="lg:hidden mb-12">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#f98825] border border-[#f98825]/20 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                            Infrastructure
                        </span>
                        <h2 className="text-4xl font-black text-[#00333c] leading-[1.1] tracking-tight mb-6">
                            State-of-the-Art <br />
                            <span className="text-[#f98825]">
                                Facilities
                            </span>
                        </h2>
                        <p className="text-[#40484a] font-medium leading-relaxed">
                            Valli Super Speciality Hospital is equipped with modern infrastructure to guarantee maximum safety, precise treatments, and uncompromising comfort.
                        </p>
                    </div>

                    {/* Right Scrolling Content Column */}
                    <div className="lg:w-7/12 flex flex-col gap-12 lg:gap-32 lg:pb-32">
                        {facilities.map((fac, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative"
                            >
                                {/* Immersive Image Card */}
                                <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-[2rem] overflow-hidden bg-gray-100 shadow-md">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${fac.img})` }}
                                    />
                                    {/* Subtle gradient so the image isn't too harsh */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#00333c]/80 via-[#00333c]/20 to-transparent opacity-80" />

                                    {/* Text Content laid over the image bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col justify-end">
                                        <div className="inline-flex max-w-max mb-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full">
                                            {fac.stats}
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
                                            {fac.title}
                                        </h3>
                                        <p className="text-white/80 font-medium md:text-lg leading-relaxed max-w-xl">
                                            {fac.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
