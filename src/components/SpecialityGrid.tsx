"use client";

import { motion } from "framer-motion";
import { Heart, Bone, Eye, Brain, Baby, Activity } from "lucide-react";

const specialities = [
    {
        title: "Cardiology",
        description: "Advanced heart care and surgeries.",
        icon: <Heart size={32} className="text-[var(--color-primary)]" />,
        colSpan: "col-span-1 md:col-span-2",
        rowSpan: "row-span-1 md:row-span-2",
    },
    {
        title: "Orthopaedics",
        description: "Joint replacement & sports medicine.",
        icon: <Bone size={32} className="text-[var(--color-primary)]" />,
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
    {
        title: "Neurology",
        description: "Comprehensive brain & spine treatments.",
        icon: <Brain size={32} className="text-[var(--color-primary)]" />,
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
    {
        title: "Ophthalmology",
        description: "Vision correction and eye care.",
        icon: <Eye size={32} className="text-[var(--color-primary)]" />,
        colSpan: "col-span-1 md:col-span-2",
        rowSpan: "row-span-1",
    },
    {
        title: "Pediatrics",
        description: "Specialized childcare services.",
        icon: <Baby size={32} className="text-[var(--color-primary)]" />,
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
    {
        title: "Emergency Care",
        description: "24/7 critical care and trauma support.",
        icon: <Activity size={32} className="text-white" />,
        colSpan: "col-span-1 md:col-span-3",
        rowSpan: "row-span-1",
        highlight: true,
    },
];

export default function SpecialityGrid() {
    return (
        <section id="specialities" className="py-24 bg-[var(--color-mint)]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Centers of <span className="text-[var(--color-primary)]">Excellence</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        We bring together top-tier specialists and cutting-edge technology to offer comprehensive care across various disciplines.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
                    {specialities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(0, 75, 87, 0.15)"
                            }}
                            className={`rounded-3xl p-8 flex flex-col justify-between cursor-pointer transition-shadow 
                ${item.colSpan} ${item.rowSpan}
                ${item.highlight ? "bg-[var(--color-secondary)] text-white" : "bg-white"}
              `}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center 
                ${item.highlight ? "bg-white/20" : "bg-[var(--color-mint)]"}`}>
                                {item.icon}
                            </div>

                            <div className="mt-8">
                                <h3 className={`text-2xl font-bold mb-2 ${item.highlight ? "text-white" : "text-gray-900"}`}>
                                    {item.title}
                                </h3>
                                <p className={`font-medium ${item.highlight ? "text-white/90" : "text-gray-500"}`}>
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
