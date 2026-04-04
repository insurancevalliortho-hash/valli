"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-white text-[#001014] pt-24 pb-12 border-t border-gray-200 relative overflow-hidden">

            {/* Flat Solid Background Without Gradients */}

            <div className="container mx-auto px-6 md:px-12 max-w-[1600px] relative z-10">

                {/* ── TOP UI STRUCTURE GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 lg:mb-24">

                    {/* Left Block - Huge Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}
                        className="lg:col-span-5 flex flex-col justify-between items-start"
                    >
                        <div className="w-full">
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light mb-6 tracking-tight leading-[1.1]">
                                Future of <br /> <strong className="font-black text-[#3cb3a6]">Orthopedic Care.</strong>
                            </h2>
                            <p className="text-gray-500 max-w-sm mb-12 leading-relaxed font-medium">
                                Driven by precision. Measured by recovery. Your physical independence is our architecture.
                            </p>
                        </div>

                        <a href="#" className="group w-fit flex items-center gap-4 bg-[#f98825] text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-[#3cb3a6] hover:-translate-y-1 transition-all duration-300 shadow-md">
                            Book Appointment
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </a>
                    </motion.div>

                    {/* Middle - Contact Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} viewport={{ once: true }}
                        className="lg:col-span-4 lg:col-start-7 flex flex-col gap-8 md:mt-0 mt-8"
                    >
                        <h4 className="text-[#f98825] text-xs font-bold uppercase tracking-[0.2em]">Contact & Info</h4>
                        <ul className="space-y-6">
                            <li className="group">
                                <p className="text-[10px] uppercase tracking-widest text-[#f98825] mb-2 font-bold group-hover:translate-x-1 transition-transform">Emergency 24/7</p>
                                <a href="#" className="text-2xl sm:text-3xl font-black text-[#001014] tracking-tight hover:text-[#3cb3a6] transition-colors leading-none inline-block">+91 90034 17111</a>
                            </li>
                            <li className="pt-6 border-t border-gray-100 group">
                                <p className="text-[10px] uppercase tracking-widest text-[#f98825] mb-2 font-bold group-hover:translate-x-1 transition-transform">General Inquiry</p>
                                <a href="#" className="text-lg sm:text-xl font-bold tracking-tight hover:text-[#001014] text-gray-500 transition-colors inline-block">info@vallihospital.in</a>
                            </li>
                            <li className="pt-6 border-t border-gray-100 group">
                                <p className="text-[10px] uppercase tracking-widest text-[#f98825] mb-2 font-bold group-hover:translate-x-1 transition-transform">Location</p>
                                <p className="text-sm font-bold tracking-wide text-gray-500 leading-relaxed max-w-[280px]">Opp. to Sri Vidya Mandir School,<br /> Meyyanoor Road, Salem - 636 004</p>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Right - Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col gap-8"
                    >
                        <h4 className="text-[#f98825] text-xs font-bold uppercase tracking-[0.2em]">Navigation</h4>
                        <ul className="space-y-4 font-bold text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-[#f98825] hover:ml-2 transition-all block">Home</a></li>
                            <li><a href="#" className="hover:text-[#f98825] hover:ml-2 transition-all block">Specialities</a></li>
                            <li><a href="#" className="hover:text-[#f98825] hover:ml-2 transition-all block">The Surgeon</a></li>
                            <li><a href="#" className="hover:text-[#f98825] hover:ml-2 transition-all block">Testimonials</a></li>
                            <li className="pt-2"><a href="#" className="text-[#3cb3a6] hover:text-[#f98825] transition-colors block border-b border-gray-200 hover:border-[#f98825] pb-1 w-fit">Contact Us</a></li>
                        </ul>
                    </motion.div>
                </div>

                {/* ── MASSIVE EDGE-TO-EDGE HOSPITAL NAME ── */}
                <div className="w-full flex justify-center items-center py-10 lg:py-16 border-b border-gray-200 relative overflow-hidden select-none">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 0.15, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }}
                        className="text-[9.5vw] md:text-[6.5vw] lg:text-[5.5vw] xl:text-[5vw] whitespace-nowrap font-black leading-none text-[#3cb3a6] tracking-tighter w-full text-center origin-bottom"
                    >
                        VALLI SUPER SPECIALITY HOSPITAL
                    </motion.span>
                </div>

                {/* Final Sub Bar */}
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
                    className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400"
                >
                    <p className="text-center md:text-left">© {new Date().getFullYear()} VALLI SUPER SPECIALITY HOSPITAL.<br className="md:hidden" /> ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#001014] transition-colors">PRIVACY POLICY</a>
                        <a href="#" className="hover:text-[#001014] transition-colors">TERMS OF USE</a>
                    </div>
                </motion.div>

            </div>
        </footer>
    );
}
