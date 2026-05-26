"use client";

import { motion } from "framer-motion";
import ObfuscatedEmail from "./ObfuscatedEmail";

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

                        <a href="/book-appointment" className="group w-fit flex items-center gap-4 bg-[#f98825] text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-[#3cb3a6] hover:-translate-y-1 transition-all duration-300 shadow-md">
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
                                <a href="tel:+919003417111" className="text-2xl sm:text-3xl font-black text-[#001014] tracking-tight hover:text-[#3cb3a6] transition-colors leading-none inline-block">+91 90034 17111</a>
                            </li>
                            <li className="pt-6 border-t border-gray-100 group">
                                <p className="text-[10px] uppercase tracking-widest text-[#f98825] mb-2 font-bold group-hover:translate-x-1 transition-transform">General Inquiry</p>
                                <ObfuscatedEmail className="text-lg sm:text-xl font-bold tracking-tight text-gray-500 inline-block" />
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
                            <li><a href="/" className="hover:text-[#f98825] hover:ml-2 transition-all block">Home</a></li>
                            <li><a href="/specialities" className="hover:text-[#f98825] hover:ml-2 transition-all block">Specialities</a></li>
                            <li><a href="/doctors" className="hover:text-[#f98825] hover:ml-2 transition-all block">The Surgeons</a></li>
                            <li><a href="/facilities" className="hover:text-[#f98825] hover:ml-2 transition-all block">Facilities</a></li>
                            <li className="pt-2"><a href="/contact-us" className="text-[#3cb3a6] hover:text-[#f98825] transition-colors block border-b border-gray-200 hover:border-[#f98825] pb-1 w-fit">Contact Us</a></li>
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
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <p>© {new Date().getFullYear()} VALLI SUPER SPECIALITY HOSPITAL.<br className="md:hidden" /> ALL RIGHTS RESERVED.</p>
                        
                        {/* Social Signals for SEO & Trust */}
                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full">
                            <a href="https://facebook.com/ValliHospitalSalem" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3b5998] transition-colors" title="Follow Valli Hospital on Facebook" id="social-fb">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3.625L15 8h-3V6.125C12 5.5 12.375 5 13.125 5H15V2h-2.625C9.75 2 9 3.375 9 5.25V8z"/></svg>
                            </a>
                            <a href="https://x.com/ValliHospital" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" title="Follow Valli Hospital on X" id="social-x">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://instagram.com/ValliHospital" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e1306c] transition-colors" title="Follow Valli Hospital on Instagram" id="social-instagram">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="https://linkedin.com/company/valli-hospital-salem" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" title="Follow Valli Hospital on LinkedIn" id="social-linkedin">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <a href="https://youtube.com/@ValliHospitalSalem" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff0000] transition-colors" title="Follow Valli Hospital on YouTube" id="social-youtube">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className="hover:text-[#001014] transition-colors">PRIVACY POLICY</a>
                        <a href="/terms-of-use" className="hover:text-[#001014] transition-colors">TERMS OF USE</a>
                    </div>
                </motion.div>

            </div>
        </footer>
    );
}
