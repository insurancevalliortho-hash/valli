"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const techItems = [
    {
        title: "Advanced Robotics",
        description: "Minimally invasive surgeries with pinpoint precision.",
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "High-Res Imaging",
        description: "Next-gen MRI and CT scanners for accurate diagnosis.",
        img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "Smart OT",
        description: "Fully integrated operation theaters with digital monitoring.",
        img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    },
];

export default function TechShowcase() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section
            id="technology"
            ref={targetRef}
            className="relative h-[300vh] bg-[#0A0A0A] text-white"
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden py-24">

                <div className="absolute top-12 left-6 md:left-12 z-20">
                    <p className="text-[var(--color-secondary)] uppercase tracking-widest font-semibold text-sm mb-4">Innovation</p>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-xl text-white">
                        State-of-the-art Technology Showcase
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-[30vw] pt-32">
                    {techItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative w-[85vw] md:w-[60vw] h-[60vh] rounded-3xl overflow-hidden shrink-0"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-10 left-10 right-10">
                                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-300 text-lg">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
