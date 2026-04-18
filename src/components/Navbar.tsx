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
                    ? "bg-white/80 backdrop-blur-xl border-[#bfc8ca]/30 py-2 shadow-[0_8px_30px_rgba(0,51,60,0.06)]"
                    : "bg-transparent border-transparent py-4"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo Area */}
                    <a href="/" className="flex items-center gap-3 group cursor-pointer">
                        {/* Mobile: full logo.png (has Tamil text), no extra label */}
                        <img src="/logo.png" alt="Valli Hospital" className="h-10 w-auto sm:hidden" />

                        {/* Desktop: favicon icon + single-line teal name */}
                        <img src="/favicon.png" alt="Valli Hospital" className="hidden sm:block h-11 w-auto" />
                        <span className="hidden sm:block text-xl font-bold tracking-tight text-[#004b57] whitespace-nowrap">
                            Valli Super Speciality Hospital
                        </span>
                    </a>

                    {/* Desktop Menu - Rounded Floating Pill */}
                    <div className="hidden lg:flex items-center bg-white/70 border border-[#bfc8ca]/40 rounded-full px-2 py-1.5 backdrop-blur-md shadow-[0_8px_20px_rgba(0,51,60,0.05)]">
                        {/* About Us */}
                        <a href="/about-us" className="relative text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10">About us</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </a>

                        {/* Specialities Dropdown */}
                        <div className="relative group/dropdown">
                            <button className="relative text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-5 py-2 rounded-full transition-colors overflow-hidden focus:outline-none">
                                <span className="relative z-10 flex items-center gap-1">Specialities <svg className="w-3 h-3 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                            </button>
                            <div className="absolute top-full left-0 mt-4 w-64 bg-white border border-[#bfc8ca]/40 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 origin-top-left z-50 flex flex-col py-2">
                                <a href="/joint-care-clinic" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Joint Care Clinic</a>
                                <a href="/sports-medicine-clinic" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Sports Medicine</a>
                                <a href="/foot-and-ankle-clinic" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Foot & Ankle Clinic</a>
                                <a href="/back-pain-and-spinal-disorders" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Back Pain & Spinal Disorders</a>
                                <a href="/paediatric-orthopaedics-deformity-clinic" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Paediatric Orthopaedics & Deformity Clinic</a>
                                <a href="/failed-surgery-corrections" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Failed Surgery Corrections</a>
                                <a href="/sports-injury-clinic" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Sports Injury Clinic</a>
                                <a href="/fracture-clinic" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Fracture Clinic</a>
                            </div>
                        </div>

                        {/* Services Dropdown */}
                        <div className="relative group/dropdown">
                            <button className="relative text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-5 py-2 rounded-full transition-colors overflow-hidden focus:outline-none">
                                <span className="relative z-10 flex items-center gap-1">Services <svg className="w-3 h-3 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                            </button>
                            <div className="absolute top-full left-0 mt-4 w-56 bg-white border border-[#bfc8ca]/40 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 origin-top-left z-50 flex flex-col py-2">
                                <a href="/arthroscopy" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Arthroscopy</a>
                                <a href="/bone-cancer-treatment" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Bone Cancer Treatment</a>
                                <a href="/genetic-testing" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Genetic Testing</a>
                                <a href="/sports-training" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Sports Training</a>
                            </div>
                        </div>

                        {/* Facilities */}
                        <a href="/facilities" className="relative text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10">Facilities</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </a>

                        {/* Doctors */}
                        <a href="/doctors" className="relative text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10">Doctors</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </a>

                        {/* Contact Us */}
                        <a href="/contact-us" className="relative text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10">Contact us</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </a>
                    </div>

                    {/* Primary Action Button */}
                    <div className="hidden md:block">
                        <a href="/book-appointment" className="relative bg-[#004b57] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00333c] hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(0,75,87,0.3)] inline-block">
                            Book Appointment
                        </a>
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
                            {[
                                { label: "About us", href: "/about-us" },
                                { label: "Specialities", href: "/specialities" },
                                { label: "Services", href: "/services" },
                                { label: "Facilities", href: "/facilities" },
                                { label: "Doctors", href: "/doctors" },
                                { label: "Contact us", href: "/contact-us" },
                            ].map((item, i) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                    className="text-4xl font-light text-[#00333c] hover:text-[#f98825] hover:font-medium transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/book-appointment"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-[#004b57] text-white px-8 py-3 rounded-full font-bold text-lg mx-auto"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Book Appointment
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
