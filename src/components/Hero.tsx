"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[100svh] overflow-hidden bg-white flex flex-col md:flex-row items-center pt-24 md:pt-0">

            {/* Top Right Decorative Shapes (Desktop Only) */}
            <motion.div
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="hidden md:block absolute top-[-10%] right-[-5%] w-[30vh] h-[30vh] bg-[#f98825] rounded-[2.5rem] rotate-45 z-0 shadow-lg"
            />
            <motion.div
                initial={{ opacity: 0, x: 30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="hidden md:block absolute top-[5%] right-[5%] w-[20vh] h-[20vh] bg-[#229e91] rounded-[2rem] rotate-45 z-0 opacity-90 shadow-lg"
            />

            {/* Subtle background abstract lines (Hidden on mobile for cleaner look) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.05] z-0">
                <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 80% Q 25% 60%, 50% 80% T 100% 80%" stroke="#004b57" strokeWidth="2" />
                    <circle cx="50%" cy="50%" r="40%" stroke="#004b57" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* ---> MOBILE IMAGE HEADER <--- */}
            {/* Extremely clean, responsive clipping shape avoiding complex absolute rotation logic */}
            <div className="w-full h-[45vh] relative block md:hidden mb-6 z-10 shrink-0">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full relative"
                >
                    {/* The main image clipped into a downward-pointing chevron */}
                    <div
                        className="w-full h-full bg-cover bg-center shadow-lg"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800')",
                            clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 mix-blend-multiply" />
                    </div>
                </motion.div>
                {/* Accent lines following the shape */}
                <div
                    className="absolute inset-0 border-b-[8px] border-[#f98825] z-[-1] translate-y-2 opacity-50"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)" }}
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-20 flex h-full items-center justify-center md:justify-end pb-12 md:pb-0">

                {/* Right Content Area (Fills space on mobile, takes right half on desktop) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left md:pl-12 order-2 md:order-1">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[2rem] leading-[1.15] sm:text-4xl lg:text-5xl font-black md:leading-[1.05] tracking-tight text-[#f98825] mb-4 md:mb-6"
                    >
                        World-Class <br className="hidden md:block" /> Healthcare &amp; <br />
                        <span className="text-[#004b57]">Orthopedic Excellence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-[#5b6668] font-medium leading-relaxed max-w-lg mb-8 md:mb-10 mx-auto md:mx-0"
                    >
                        Welcome to Valli Super Speciality Hospital. We combine cutting-edge medical technology, evidence-based treatments, and compassionate care to help you reclaim your health and mobility.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <button className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-[0_8px_20px_rgba(249,136,37,0.3)] hover:bg-[#e0751e] hover:shadow-[0_12px_25px_rgba(249,136,37,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                            Book an Appointment
                        </button>
                        <button className="flex items-center justify-center gap-3 bg-white text-[#ba1a1a] border border-[#ba1a1a]/20 px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-sm hover:bg-[#ffdad6]/30 transition-all duration-300 group">
                            <span className="relative flex h-3 w-3 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ba1a1a]"></span>
                            </span>
                            Call 24/7 Emergency
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* ---> DESKTOP GEOMETRIC IMAGE LAYERS <--- */}
            {/* Safely hidden on mobile to prevent layout blowout, shown robustly on md+ */}
            <div className="hidden md:block absolute top-0 left-0 w-[50vw] h-full z-10 pointer-events-none">
                <div className="w-full h-full relative">
                    <motion.div
                        initial={{ x: "-20%", rotate: 45 }}
                        animate={{ x: "0%", rotate: 45 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 right-[5%] -translate-y-1/2 translate-x-1/2 w-[65vh] h-[65vh] rounded-[4rem] border border-[#f98825]/40"
                    />
                    <motion.div
                        initial={{ x: "-50%", rotate: 45 }}
                        animate={{ x: "-15%", rotate: 45 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[75vh] h-[75vh] bg-[#004b57] rounded-[4.5rem] shadow-2xl"
                    />
                    <motion.div
                        initial={{ x: "0%", y: "100%", rotate: 45 }}
                        animate={{ x: "5%", y: "50%", rotate: 45 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[40vh] h-[40vh] bg-[#3cb3a6] rounded-[3rem]"
                    />
                    <motion.div
                        initial={{ x: "-60%", rotate: 45 }}
                        animate={{ x: "-25%", rotate: 45 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[75vh] h-[75vh] bg-[#f98825] rounded-[4rem] shadow-xl"
                    />
                    <motion.div
                        initial={{ x: "-70%", rotate: 45 }}
                        animate={{ x: "-32%", rotate: 45 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-[75vh] h-[75vh] rounded-[3.5rem] overflow-hidden shadow-2xl bg-gray-200 pointer-events-auto"
                    >
                        <div className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45">
                            <img
                                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600"
                                alt="Advanced Orthopedic Surgery"
                                className="w-full h-full object-cover object-center transform -scale-x-100 filter contrast-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00333c]/80 via-transparent to-transparent opacity-80 mix-blend-multiply" />
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
