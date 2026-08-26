"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-[#bfc8ca]/30 py-2 shadow-[0_8px_30px_rgba(0,51,60,0.06)]"
                    : "bg-transparent border-transparent py-4"
                    }`}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        {/* Mobile: full logo.png (has Tamil text), no extra label */}
                        <Image
                            src="/logo.png"
                            alt="Valli Super Specialty Hospital logo"
                            width={522}
                            height={245}
                            priority
                            sizes="(max-width: 640px) 160px, 200px"
                            className="h-10 w-auto sm:hidden object-contain"
                            style={{ width: "auto" }}
                        />

                        {/* Desktop: favicon icon + 2-line name */}
                        <Image
                            src="/favicon.png"
                            alt="Valli Super Specialty Hospital emblem"
                            width={151}
                            height={166}
                            priority
                            sizes="(max-width: 1280px) 40px, 44px"
                            className="hidden sm:block h-10 xl:h-11 w-auto object-contain"
                            style={{ width: "auto" }}
                        />
                        <div className={`hidden sm:flex flex-col justify-center transition-colors duration-500 ${isScrolled ? "text-[#004b57]" : "text-[#f98825]"}`}>
                            <span className="text-lg xl:text-xl font-black leading-none tracking-tight">Valli</span>
                            <span className="text-[10px] xl:text-xs font-bold tracking-[0.15em] uppercase mt-0.5 opacity-80">Super Specialty Hospital</span>
                        </div>
                    </Link>

                    {/* Desktop Menu - Rounded Floating Pill */}
                    <div className="hidden lg:flex items-center bg-white/70 border border-[#bfc8ca]/40 rounded-full px-1.5 xl:px-2 py-1 xl:py-1.5 backdrop-blur-md shadow-[0_8px_20px_rgba(0,51,60,0.05)]">
                        {/* About Us */}
                        <Link href="/about-us" className="relative text-[13px] xl:text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-3 xl:px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10 whitespace-nowrap">About us</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </Link>

                        {/* Specialties Dropdown */}
                        <div className="relative group/dropdown">
                            <button className="relative text-[13px] xl:text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-3 xl:px-5 py-2 rounded-full transition-colors overflow-hidden focus:outline-none">
                                <span className="relative z-10 flex items-center gap-1 whitespace-nowrap">Specialties <svg className="w-3 h-3 transition-transform group-hover/dropdown:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                            </button>
                            {/* 2-column mega-menu */}
                            <div className="absolute top-full left-0 mt-4 w-[540px] bg-white border border-[#bfc8ca]/40 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 origin-top-left z-50 p-2">
                                <div className="grid grid-cols-2 divide-x divide-[#e5eaeb]">
                                    {/* Left column */}
                                    <div className="flex flex-col pr-1">
                                        <span className="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-widest text-[#3cb3a6]">Orthopaedics</span>
                                        <Link href="/joint-care-clinic" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Joint Care Clinic</Link>
                                        <Link href="/sports-medicine-clinic" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Sports Medicine</Link>
                                        <Link href="/sports-injury-clinic" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Sports Injury Clinic</Link>
                                        <Link href="/foot-and-ankle-clinic" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Foot &amp; Ankle Clinic</Link>
                                        <Link href="/fracture-clinic" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Fracture Clinic</Link>
                                        <Link href="/back-pain-and-spinal-disorders" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Back Pain &amp; Spinal Disorders</Link>
                                        <Link href="/paediatric-orthopaedics-deformity-clinic" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Paediatric Orthopaedics</Link>
                                        <Link href="/failed-surgery-corrections" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Failed Surgery Corrections</Link>
                                        <Link href="/brachial-plexus-nerve-surgery" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#3cb3a6] rounded-lg">Brachial Plexus &amp; Nerve Surgery</Link>
                                        <Link href="/oral-maxillofacial-surgery" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#004b57] rounded-lg">Oral &amp; Maxillofacial Surgery</Link>
                                    </div>
                                    {/* Right column */}
                                    <div className="flex flex-col pl-1">
                                        <span className="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-widest text-[#f98825]">Medicine &amp; Critical Care</span>
                                        <Link href="/internal-medicine" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Internal Medicine &amp; Diabetology</Link>
                                        <Link href="/neurosurgery-neurological-care" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Neurosurgery &amp; Neurology</Link>
                                        <Link href="/critical-care-anaesthesia" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Critical Care &amp; Anaesthesia</Link>
                                        <Link href="/respiratory-care-pulmonology" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#3cb3a6] rounded-lg">Respiratory Care &amp; Pulmonology</Link>
                                        <Link href="/surgical-gastroenterology" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">Surgical Gastroenterology</Link>
                                        <Link href="/hematology-blood-disorders" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-red-600 rounded-lg">Hematology &amp; Blood Disorders</Link>
                                        <Link href="/interventional-ultrasound-pain-management" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#3cb3a6] rounded-lg">Interventional Ultrasound &amp; Pain</Link>
                                        <Link href="/dialysis-kidney-care" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825] rounded-lg">24/7 Dialysis &amp; Kidney Care</Link>
                                        <Link href="/plastic-reconstructive-surgery" className="px-4 py-1.5 text-sm text-[#40484a] hover:bg-gray-50 hover:text-rose-600 rounded-lg">Plastic &amp; Reconstructive Surgery</Link>
                                        <div className="my-1 mx-4 border-t border-[#e5eaeb]" />
                                        <Link href="/specialties" className="px-4 py-1.5 text-sm font-semibold text-[#004b57] hover:bg-gray-50 hover:text-[#f98825] rounded-lg flex items-center gap-1">
                                            View All Specialties
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services Dropdown */}
                        <div className="relative group/dropdown">
                            <button className="relative text-[13px] xl:text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-3 xl:px-5 py-2 rounded-full transition-colors overflow-hidden focus:outline-none">
                                <span className="relative z-10 flex items-center gap-1 whitespace-nowrap">Services <svg className="w-3 h-3 transition-transform group-hover/dropdown:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                            </button>
                            <div className="absolute top-full left-0 mt-4 w-56 bg-white border border-[#bfc8ca]/40 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 origin-top-left z-50 flex flex-col py-2">
                                <Link href="/arthroscopy" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Arthroscopy</Link>
                                <Link href="/bone-cancer-treatment" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Bone Cancer Treatment</Link>
                                <Link href="/genetic-testing" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Genetic Testing</Link>
                                <Link href="/sports-training" className="px-4 py-2 text-sm text-[#40484a] hover:bg-gray-50 hover:text-[#f98825]">Sports Training</Link>
                            </div>
                        </div>

                        {/* Facilities */}
                        <Link href="/facilities" className="relative text-[13px] xl:text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-3 xl:px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10 whitespace-nowrap">Facilities</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </Link>

                        {/* Doctors */}
                        <Link href="/doctors" className="relative text-[13px] xl:text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-3 xl:px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10 whitespace-nowrap">Doctors</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </Link>

                        {/* Contact Us */}
                        <Link href="/contact-us" className="relative text-[13px] xl:text-sm font-medium text-[#40484a] hover:text-[#f98825] hover:font-bold px-3 xl:px-5 py-2 rounded-full transition-colors group overflow-hidden">
                            <span className="relative z-10 whitespace-nowrap">Contact us</span>
                            <div className="absolute inset-0 bg-[#f98825]/15 rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </Link>
                    </div>

                    {/* Primary Action Button */}
                    <div className="hidden lg:block">
                        <Link href="/book-appointment" className="relative bg-[#004b57] text-white px-5 xl:px-6 py-2 xl:py-2.5 rounded-full text-sm font-semibold hover:bg-[#00333c] hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(0,75,87,0.3)] inline-block whitespace-nowrap">
                            Book Appointment
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full border border-[#bfc8ca]/30 text-[#00333c] backdrop-blur-md shadow-sm"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col justify-center items-center lg:hidden"
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
                                { label: "Specialties", href: "/specialties" },
                                { label: "Services", href: "/services" },
                                { label: "Facilities", href: "/facilities" },
                                { label: "Doctors", href: "/doctors" },
                                { label: "Contact us", href: "/contact-us" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-4xl font-light text-[#00333c] hover:text-[#f98825] hover:font-medium transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Link
                                    href="/book-appointment"
                                    className="bg-[#004b57] text-white px-8 py-3 rounded-full font-bold text-lg mx-auto inline-block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Book Appointment
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

