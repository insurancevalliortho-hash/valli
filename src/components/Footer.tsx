"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#001418] text-white pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#004b57]/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#f98825]/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-5 pr-0 lg:pr-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <img src="/logo.png" alt="Valli Hospital Logo" className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tight text-white leading-none">Valli <span className="text-[#f5a623] font-medium">Hospital</span></span>
                                <span className="text-[10px] tracking-[0.2em] text-[#f98825] uppercase font-bold mt-1">Committed to Excellence</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
                            Plan Your Visit
                        </h3>
                        <p className="text-white/70 font-medium leading-relaxed max-w-sm mb-8">
                            Your journey to a pain-free, healthier life begins here. Valli Super Speciality Hospital is committed to you.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors border border-white/10">
                                Submit Inquiry
                            </a>
                            <a href="#" className="bg-[#f98825] text-[#001418] px-6 py-3 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(129,243,229,0.3)] hover:shadow-[0_0_30px_rgba(129,243,229,0.5)] transition-all">
                                Get Directions
                            </a>
                        </div>
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-4">
                        <h4 className="text-[#f5a623] font-bold uppercase tracking-widest text-xs mb-8">Connect With Us</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start group">
                                <div className="mt-1 text-[#f98825] group-hover:scale-110 transition-transform"><MapPin size={20} /></div>
                                <div>
                                    <strong className="block text-white mb-1">Address</strong>
                                    <span className="text-white/70 text-sm leading-relaxed block max-w-[250px]">
                                        Opp. to Sri Vidya Mandir School, Meyyanoor Road, Salem - 636 004
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start group">
                                <div className="mt-1 text-[#f98825] group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                                <div>
                                    <strong className="block text-white mb-1">24/7 Helpline</strong>
                                    <span className="text-white/70 text-sm block">
                                        +91 90034 17111
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start group">
                                <div className="mt-1 text-[#f98825] group-hover:scale-110 transition-transform"><Mail size={20} /></div>
                                <div>
                                    <strong className="block text-white mb-1">Website</strong>
                                    <span className="text-white/70 text-sm block">
                                        www.vallihospital.in
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[#f5a623] font-bold uppercase tracking-widest text-xs mb-8">Visiting Hours</h4>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center gap-3 text-[#f98825] mb-4">
                                <Clock size={24} />
                                <span className="font-bold text-white">Open 24 Hours</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Emergency Services and Pharmacy available round the clock, 365 days a year.
                            </p>
                            <div className="w-full h-px bg-white/10 my-4" />
                            <div className="flexjustify-between text-sm">
                                <span className="text-white/80 font-medium">OPD Consultation</span>
                            </div>
                            <div className="text-[#f98825] font-bold text-sm mt-1">9:00 AM - 8:00 PM</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-xs font-medium tracking-wide text-center md:text-left">
                        © {new Date().getFullYear()} Valli Super Speciality Hospital. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/40 font-medium">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
