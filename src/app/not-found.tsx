"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Calendar, Stethoscope, PhoneCall } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import MagneticCursor from "../components/MagneticCursor";

export default function NotFound() {
    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />
            <main className="min-h-screen bg-[#001014] text-white flex flex-col justify-center items-center relative overflow-hidden pt-32 pb-20">
                
                {/* Immersive Cinematic Background Gradients */}
                <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-[#3cb3a6]/10 rounded-full blur-[150px] pointer-events-none z-0" />
                <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[#f98825]/10 rounded-full blur-[150px] pointer-events-none z-0" />
                
                {/* Geometric background mesh */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle, #3cb3a6 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 flex flex-col items-center justify-center">
                    
                    {/* Big Bold 404 Watermark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 0.15, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12rem] md:text-[16rem] font-black tracking-tighter leading-none text-[#3cb3a6] select-none"
                    >
                        404
                    </motion.div>

                    <div className="-mt-10 md:-mt-16 max-w-xl flex flex-col items-center">
                        
                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-white"
                        >
                            Page Not Found
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-gray-300 text-base md:text-lg mb-12 leading-relaxed"
                        >
                            The medical clinical pathway you are trying to reach has moved or is currently offline. Rest assured, our critical care systems are fully active. Let's redirect you back to safety.
                        </motion.p>
                    </div>

                    {/* Quick Link Navigation Hub */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-16"
                    >
                        {/* Option 1: Back Home */}
                        <Link 
                            href="/" 
                            className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#3cb3a6]/50 hover:bg-white/10 p-6 rounded-3xl transition-all duration-300 text-left group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#3cb3a6]/10 text-[#3cb3a6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Home size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base leading-tight mb-1">Return Home</h3>
                                <p className="text-gray-400 text-xs font-semibold">Head back to the main lobby.</p>
                            </div>
                        </Link>

                        {/* Option 2: Appointment */}
                        <Link 
                            href="/book-appointment" 
                            className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#f98825]/50 hover:bg-white/10 p-6 rounded-3xl transition-all duration-300 text-left group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#f98825]/10 text-[#f98825] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Calendar size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base leading-tight mb-1">Book Consultation</h3>
                                <p className="text-gray-400 text-xs font-semibold">Schedule a specialist appointment.</p>
                            </div>
                        </Link>

                        {/* Option 3: Specialties */}
                        <Link 
                            href="/specialities" 
                            className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#3cb3a6]/50 hover:bg-white/10 p-6 rounded-3xl transition-all duration-300 text-left group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#3cb3a6]/10 text-[#3cb3a6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Stethoscope size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base leading-tight mb-1">Medical Specialties</h3>
                                <p className="text-gray-400 text-xs font-semibold">Explore our clinical offerings.</p>
                            </div>
                        </Link>

                        {/* Option 4: Emergency Line */}
                        <a 
                            href="tel:+919003417111" 
                            className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 p-6 rounded-3xl transition-all duration-300 text-left group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse">
                                <PhoneCall size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base leading-tight mb-1">Emergency 24/7</h3>
                                <p className="text-gray-400 text-xs font-semibold">Call our trauma room hotline.</p>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </SmoothScroll>
    );
}
