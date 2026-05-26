"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Calendar, Stethoscope, PhoneCall, AlertTriangle } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import MagneticCursor from "../components/MagneticCursor";

// Premium Mouse Tilt Hook for buttery-smooth interactive 3D Tilting
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springConfig = { damping: 30, stiffness: 120, mass: 0.6 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), springConfig);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left - width / 2;
            const mouseY = e.clientY - rect.top - height / 2;
            
            x.set(mouseX / width);
            y.set(mouseY / height);
        };
        
        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };
        
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref, x, y]);
    
    return { rotateX, rotateY };
}

export default function NotFound() {
    const mainCanvasRef = useRef<HTMLDivElement>(null);
    const { rotateX, rotateY } = useTilt(mainCanvasRef);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleGlobalMouse = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleGlobalMouse);
        return () => window.removeEventListener("mousemove", handleGlobalMouse);
    }, []);

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />
            <main className="min-h-screen bg-[#000d10] text-white flex flex-col justify-center items-center relative overflow-hidden pt-36 pb-24">
                
                {/* ── CINEMATIC DYNAMIC LIGHTING SUITE ── */}
                <div 
                    className="absolute w-[600px] h-[600px] rounded-full bg-[#3cb3a6]/10 blur-[150px] pointer-events-none transition-all duration-300 z-0"
                    style={{
                        left: `${mousePos.x - 300}px`,
                        top: `${mousePos.y - 300}px`,
                    }}
                />
                
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#f98825]/5 rounded-full blur-[200px] pointer-events-none z-0" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-[#3cb3a6]/5 rounded-full blur-[200px] pointer-events-none z-0" />

                {/* 3D Depth Lines Background Mesh */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(to right, #3cb3a6 1px, transparent 1px), linear-gradient(to bottom, #3cb3a6 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }}
                />

                <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col items-center justify-center">
                    
                    {/* ── 3D INTERACTIVE HERO INTERACTION ZONE ── */}
                    <div 
                        ref={mainCanvasRef}
                        className="w-full flex flex-col items-center justify-center perspective-[1500px] py-10 cursor-pointer"
                    >
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="flex flex-col items-center justify-center select-none"
                        >
                            
                            {/* FLOATING 3D ORTHOPEDIC RING SYSTEM (Awwwards-Level Joint Animation) */}
                            <div className="relative w-80 h-80 flex items-center justify-center mb-8 transform-style-3d">
                                
                                {/* Outer Orbiting Segment (X-axis tilt) */}
                                <div 
                                    className="absolute w-full h-full rounded-full border border-dashed border-[#3cb3a6]/30 animate-[spin_40s_linear_infinite]" 
                                    style={{ transform: "rotateX(70deg) rotateY(25deg) translateZ(50px)" }} 
                                />

                                {/* Middle Orbiting Segment (Y-axis tilt) */}
                                <div 
                                    className="absolute w-[85%] h-[85%] rounded-full border-[2.5px] border-[#f98825]/40 animate-[spin_25s_linear_infinite_reverse]" 
                                    style={{ transform: "rotateX(-35deg) rotateY(60deg) translateZ(20px)" }} 
                                />

                                {/* Inner Core Ring (Z-axis alignment) */}
                                <div 
                                    className="absolute w-[65%] h-[65%] rounded-full border border-double border-[#3cb3a6]/60 animate-[spin_12s_linear_infinite]" 
                                    style={{ transform: "rotateX(80deg) rotateY(-15deg) translateZ(-30px)" }} 
                                />

                                {/* Interactive Glowing Joint Sphere */}
                                <motion.div 
                                    animate={{ 
                                        scale: [1, 1.08, 1],
                                        boxShadow: [
                                            "0 0 50px rgba(60,179,166,0.4)",
                                            "0 0 80px rgba(249,136,37,0.5)",
                                            "0 0 50px rgba(60,179,166,0.4)"
                                        ]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#3cb3a6] via-[#f98825] to-[#000d10] flex items-center justify-center z-10"
                                    style={{ transform: "translateZ(80px)" }}
                                >
                                    <AlertTriangle className="w-8 h-8 text-white drop-shadow-md" />
                                </motion.div>

                                {/* Ambient Spotlight Inside Ring */}
                                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#3cb3a6]/10 to-[#f98825]/10 blur-[30px]" />
                            </div>

                            {/* Massive Tilting 3D Glass 404 Text */}
                            <motion.h1
                                style={{ transform: "translateZ(100px)" }}
                                className="text-[12vw] md:text-[10rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#3cb3a6]/30 drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] mb-2 font-montserrat uppercase select-none"
                            >
                                Lost Path
                            </motion.h1>

                            {/* Glowing sub-tag */}
                            <motion.span
                                style={{ transform: "translateZ(60px)" }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#f98825] text-xs font-bold tracking-[0.25em] uppercase mb-8"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-ping" />
                                System Out of Bounds
                            </motion.span>

                            {/* Description text */}
                            <motion.p
                                style={{ transform: "translateZ(40px)" }}
                                className="text-gray-300 text-base md:text-lg mb-16 leading-relaxed max-w-xl text-center px-4"
                            >
                                The clinical corridor or resource you sought has been relocated. Let us guide you back to our primary care portals immediately.
                            </motion.p>

                        </motion.div>
                    </div>

                    {/* ── 3D FLOATING HOLOGRAPHIC NAVIGATION GRID ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-12">
                        {[
                            {
                                href: "/",
                                icon: <Home size={22} />,
                                title: "Return Home",
                                desc: "Re-center at the lobby.",
                                accent: "#3cb3a6",
                                delay: 0.1
                            },
                            {
                                href: "/book-appointment",
                                icon: <Calendar size={22} />,
                                title: "Appointment",
                                desc: "Book clinical care.",
                                accent: "#f98825",
                                delay: 0.2
                            },
                            {
                                href: "/specialities",
                                icon: <Stethoscope size={22} />,
                                title: "Specialities",
                                desc: "Explore our wings.",
                                accent: "#3cb3a6",
                                delay: 0.3
                            },
                            {
                                href: "tel:+919003417111",
                                icon: <PhoneCall size={22} className="animate-pulse" />,
                                title: "Emergency 24/7",
                                desc: "ACLS/ATLS emergency.",
                                accent: "#ef4444",
                                delay: 0.4
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ 
                                    y: -8,
                                    scale: 1.02,
                                    borderColor: `${card.accent}80`,
                                    boxShadow: `0 20px 40px ${card.accent}12`
                                }}
                                className="bg-white/[0.02] border border-white/[0.04] backdrop-blur-3xl rounded-[2rem] p-7 transition-all duration-500 cursor-pointer relative overflow-hidden group"
                            >
                                <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl" style={{ backgroundColor: card.accent }} />
                                
                                <Link 
                                    href={card.href} 
                                    className="flex flex-col h-full justify-between items-start"
                                    id={`notfound-card-${i}`}
                                >
                                    <div 
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                                        style={{ backgroundColor: `${card.accent}15`, color: card.accent }}
                                    >
                                        {card.icon}
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="font-black text-white text-lg leading-tight mb-2 group-hover:text-white transition-colors">{card.title}</h3>
                                        <p className="text-gray-400 text-xs font-medium leading-relaxed">{card.desc}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </SmoothScroll>
    );
}
