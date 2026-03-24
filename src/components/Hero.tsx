"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, Phone } from "lucide-react";

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section className="relative w-full min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-[var(--color-mint)]">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col space-y-8 z-10"
                >
                    <motion.div variants={itemVariants} className="inline-block">
                        <span className="bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-[var(--color-primary)]">
                            Transforming Healthcare
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold leading-[1.1] text-gray-900 tracking-tight"
                    >
                        The Clinical <br />
                        <span className="text-[var(--color-primary)]">Sanctuary.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-700 max-w-lg leading-relaxed"
                    >
                        A high-end wellness retreat blending precision medical tech with
                        compassionate, world-class care. Your journey to health starts here.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                        <button className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00333c] transition-colors flex items-center gap-2 group">
                            Consult a Specialist
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-semibold border border-gray-200 hover:border-[var(--color-primary)] transition-colors">
                            Explore Our Tech
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right Imagery (Split Screen) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Medical Imagery */}
                    <img
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
                        alt="Medical Facility"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 to-transparent mix-blend-multiply" />

                    {/* Floating 'Quick Appointment' Card */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="absolute bottom-6 left-6 right-6 md:left-auto md:w-80 bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,75,87,0.1)]"
                    >
                        <h3 className="font-bold text-gray-900 mb-2">Need Urgent Care?</h3>
                        <p className="text-sm text-gray-600 mb-4">Book a slot in under 2 minutes or call our 24/7 emergency line.</p>
                        <div className="flex flex-col gap-3">
                            <button className="w-full bg-[var(--color-secondary)] text-white py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#e67e00] transition-colors">
                                <Calendar size={16} /> Quick Appointment
                            </button>
                            <button className="w-full bg-transparent text-[var(--color-primary)] py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/5 transition-colors">
                                <Phone size={16} /> Emergency Line
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
