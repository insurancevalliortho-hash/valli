"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-[#bfc8ca]/30 py-4 shadow-[0_8px_30px_rgba(0,51,60,0.06)]"
                    : "bg-transparent border-transparent py-8"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <img src="/logo.png" alt="Valli Hospital Logo" className="h-12 w-auto" />
                        <div className="text-xl font-medium tracking-tight text-[#00333c] hidden sm:flex flex-col leading-tight">
                            <span>Valli <span className="font-light text-[#40484a]">Hospital</span></span>
                            <span className="text-[0.65rem] tracking-widest text-[#f98825] uppercase font-bold">Super Speciality</span>
                        </div>
                    </div>

                    {/* Desktop Menu - Rounded Floating Pill */}
                    <div className="hidden md:flex items-center bg-white/70 border border-[#bfc8ca]/40 rounded-full px-2 py-1.5 backdrop-blur-md shadow-[0_8px_20px_rgba(0,51,60,0.05)]">
                        {["Specialities", "Doctors", "Technology", "About"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative text-sm font-medium text-[#40484a] hover:text-[#00333c] hover:font-bold px-5 py-2 rounded-full transition-colors group overflow-hidden"
                            >
                                <span className="relative z-10">{item}</span>
                                <div className="absolute inset-0 bg-white rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                            </a>
                        ))}
                    </div>

                    {/* Primary Action Button */}
                    <div className="hidden md:block">
                        <button className="relative bg-[#004b57] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00333c] hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(0,75,87,0.3)]">
                            Book Appointment
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full border border-[#bfc8ca]/30 text-[#00333c] backdrop-blur-md shadow-sm"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col justify-center items-center md:hidden"
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-[50%] -right-[50%] w-[200vw] h-[200vw] bg-[radial-gradient(circle,#f98825_0%,transparent_40%)] opacity-30 mix-blend-multiply" />
                        </div>

                        <div className="flex flex-col space-y-8 text-center relative z-10">
                            {["Specialities", "Doctors", "Technology", "About"].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                    className="text-4xl font-light text-[#00333c] hover:text-[#f98825] hover:font-medium transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-12 bg-[#004b57] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
                        >
                            Log Portal
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
