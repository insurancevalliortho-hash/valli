"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const departments = [
    "Orthopaedics & Joint Replacement",
    "Gastroenterology",
    "Neurosurgery & Neurology",
    "Plastic & Vascular Surgery",
    "Internal Medicine & Urology",
    "Paediatrics & Surgery",
    "24x7 Emergency",
];

const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "4:00 PM",
    "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
];

type FormData = {
    department: string;
    doctor: string;
    date: string;
    time: string;
    name: string;
    phone: string;
    email: string;
    notes: string;
};

export default function BookAppointmentPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState<FormData>({
        department: "",
        doctor: "Dr. T. Natanasabapathy",
        date: "",
        time: "",
        name: "",
        phone: "",
        email: "",
        notes: "",
    });

    const set = (key: keyof FormData, val: string) => setForm((f) => ({ ...f, [key]: val }));

    const stepLabels = ["Department", "Date & Time", "Your Details", "Confirm"];

    const canNext = () => {
        if (step === 1) return !!form.department;
        if (step === 2) return !!form.date && !!form.time;
        if (step === 3) return !!form.name && !!form.phone;
        return true;
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    // Get min date (today)
    const today = new Date().toISOString().split("T")[0];

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />

            {/* Hero */}
            <section className="relative bg-[#001f25] pt-36 pb-20 overflow-hidden">
                <div className="absolute -top-20 right-[-10%] w-[40vw] h-[40vw] bg-[#f98825]/10 rounded-[6rem] rotate-12 pointer-events-none" />
                <div className="absolute -bottom-16 -left-10 w-[30vw] h-[30vw] bg-[#004b57]/20 rounded-[5rem] rotate-45 pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Home
                        </a>
                    </motion.div>
                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Appointment
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
                        Book a Consultation
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-xl text-white/60 max-w-lg leading-relaxed font-medium">
                        Tell us a little about what you need — we&apos;ll take care of the rest.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-[#f9fafb] py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* FORM COLUMN */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white border border-[#e5eaeb] rounded-[2rem] p-10 md:p-14 text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-[#d1faf5] flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-[#004b57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-black text-[#00333c] mb-3 tracking-tight">Request Received!</h2>
                                        <p className="text-[#40484a] text-lg mb-2 font-medium">
                                            Thank you, <strong>{form.name}</strong>. We&apos;ll call you on <strong>{form.phone}</strong> to confirm your appointment.
                                        </p>
                                        <p className="text-[#40484a] text-sm mb-8">
                                            Expected confirmation within 1–2 hours during working hours (9 AM – 8 PM).
                                        </p>
                                        <div className="bg-[#f9fafb] border border-[#e5eaeb] rounded-xl p-6 text-left mb-8 space-y-2.5">
                                            {[
                                                ["Department", form.department],
                                                ["Doctor", form.doctor],
                                                ["Date", form.date],
                                                ["Time", form.time],
                                            ].map(([label, value]) => (
                                                <div key={label} className="flex justify-between text-sm">
                                                    <span className="text-[#40484a] font-medium">{label}</span>
                                                    <span className="text-[#00333c] font-bold">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="/" className="bg-[#004b57] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#00333c] transition-colors inline-block">
                                            Back to Home
                                        </a>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-[#e5eaeb] rounded-[2rem] overflow-hidden">
                                        {/* Step indicator */}
                                        <div className="border-b border-[#e5eaeb] px-8 pt-8 pb-6">
                                            <div className="flex items-center gap-0">
                                                {stepLabels.map((label, i) => (
                                                    <div key={label} className="flex items-center flex-1 last:flex-none">
                                                        <div className="flex flex-col items-center">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${i + 1 < step ? "bg-[#004b57] text-white" : i + 1 === step ? "bg-[#f98825] text-white shadow-[0_0_0_4px_rgba(249,136,37,0.2)]" : "bg-[#f0f0f0] text-[#999]"}`}>
                                                                {i + 1 < step ? (
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                                ) : i + 1}
                                                            </div>
                                                            <span className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 ${i + 1 === step ? "text-[#f98825]" : "text-[#999]"}`}>{label}</span>
                                                        </div>
                                                        {i < stepLabels.length - 1 && (
                                                            <div className={`flex-1 h-px mx-3 mb-5 transition-all duration-500 ${i + 1 < step ? "bg-[#004b57]" : "bg-[#e5eaeb]"}`} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Step Content */}
                                        <div className="p-8 md:p-10 min-h-[340px]">
                                            <AnimatePresence mode="wait">
                                                {step === 1 && (
                                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                        <h2 className="text-2xl font-black text-[#00333c] mb-2">Select Department</h2>
                                                        <p className="text-[#40484a] text-sm mb-6">Which area of care do you need?</p>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {departments.map((d) => (
                                                                <button key={d} onClick={() => set("department", d)}
                                                                    className={`text-left px-5 py-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${form.department === d ? "border-[#f98825] bg-[#f98825]/8 text-[#00333c] shadow-[0_0_0_3px_rgba(249,136,37,0.15)]" : "border-[#e5eaeb] text-[#40484a] hover:border-[#004b57]/40 hover:bg-[#f9fafb]"}`}>
                                                                    {d}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === 2 && (
                                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                        <h2 className="text-2xl font-black text-[#00333c] mb-2">Choose Date & Time</h2>
                                                        <p className="text-[#40484a] text-sm mb-6">OPD: 9 AM – 8 PM, Monday to Saturday</p>

                                                        <div className="mb-6">
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-[#40484a] mb-2">Preferred Date</label>
                                                            <input type="date" min={today} value={form.date} onChange={(e) => set("date", e.target.value)}
                                                                className="w-full border border-[#e5eaeb] rounded-xl px-4 py-3 text-[#00333c] font-semibold text-sm focus:outline-none focus:border-[#f98825] focus:ring-2 focus:ring-[#f98825]/20 transition-all" />
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-[#40484a] mb-3">Preferred Time</label>
                                                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                                                                {timeSlots.map((t) => (
                                                                    <button key={t} onClick={() => set("time", t)}
                                                                        className={`py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${form.time === t ? "border-[#f98825] bg-[#f98825] text-white shadow-[0_4px_12px_rgba(249,136,37,0.3)]" : "border-[#e5eaeb] text-[#40484a] hover:border-[#004b57]/40"}`}>
                                                                        {t}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === 3 && (
                                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                        <h2 className="text-2xl font-black text-[#00333c] mb-2">Your Details</h2>
                                                        <p className="text-[#40484a] text-sm mb-6">We&apos;ll use this to reach you for confirmation.</p>
                                                        <div className="space-y-4">
                                                            {[
                                                                { key: "name" as const, label: "Full Name", type: "text", placeholder: "e.g. Rajesh Kumar" },
                                                                { key: "phone" as const, label: "Mobile Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                                                                { key: "email" as const, label: "Email (Optional)", type: "email", placeholder: "you@example.com" },
                                                            ].map((field) => (
                                                                <div key={field.key}>
                                                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#40484a] mb-2">{field.label}</label>
                                                                    <input type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={(e) => set(field.key, e.target.value)}
                                                                        className="w-full border border-[#e5eaeb] rounded-xl px-4 py-3 text-[#00333c] font-semibold text-sm focus:outline-none focus:border-[#f98825] focus:ring-2 focus:ring-[#f98825]/20 transition-all placeholder:text-[#bbb] placeholder:font-normal" />
                                                                </div>
                                                            ))}
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-[#40484a] mb-2">Additional Notes (Optional)</label>
                                                                <textarea placeholder="Describe your symptoms or any specific concerns..." value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3}
                                                                    className="w-full border border-[#e5eaeb] rounded-xl px-4 py-3 text-[#00333c] font-semibold text-sm focus:outline-none focus:border-[#f98825] focus:ring-2 focus:ring-[#f98825]/20 transition-all placeholder:text-[#bbb] placeholder:font-normal resize-none" />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === 4 && (
                                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                        <h2 className="text-2xl font-black text-[#00333c] mb-2">Confirm Appointment</h2>
                                                        <p className="text-[#40484a] text-sm mb-6">Please review your details before submitting.</p>
                                                        <div className="bg-[#f9fafb] border border-[#e5eaeb] rounded-2xl p-6 space-y-3 mb-4">
                                                            {[
                                                                ["Department", form.department],
                                                                ["Doctor", form.doctor],
                                                                ["Date", form.date],
                                                                ["Time", form.time],
                                                                ["Name", form.name],
                                                                ["Phone", form.phone],
                                                                ...(form.email ? [["Email", form.email]] : []),
                                                                ...(form.notes ? [["Notes", form.notes]] : []),
                                                            ].map(([label, value]) => (
                                                                <div key={label} className="flex justify-between text-sm gap-4">
                                                                    <span className="text-[#40484a] font-medium shrink-0">{label}</span>
                                                                    <span className="text-[#00333c] font-bold text-right">{value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-xs text-[#40484a] leading-relaxed">
                                                            By confirming, you agree that our team will contact you at the number provided to confirm your appointment. This is a consultation request, not a guaranteed booking.
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="px-8 md:px-10 pb-8 flex justify-between items-center border-t border-[#e5eaeb] pt-6">
                                            {step > 1 ? (
                                                <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 text-[#40484a] font-bold text-sm hover:text-[#00333c] transition-colors">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                                    Back
                                                </button>
                                            ) : <div />}

                                            {step < 4 ? (
                                                <button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}
                                                    className="bg-[#004b57] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#00333c] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                                                    Continue
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                                </button>
                                            ) : (
                                                <button onClick={handleSubmit} className="bg-[#f98825] text-white px-8 py-3 rounded-full font-bold text-sm shadow-[0_6px_20px_rgba(249,136,37,0.35)] hover:bg-[#e0751e] transition-all flex items-center gap-2">
                                                    Confirm Booking ✓
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-5">
                            {/* Emergency */}
                            <div className="bg-[#001f25] rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                    <span className="text-red-400 text-xs font-black uppercase tracking-widest">Emergency?</span>
                                </div>
                                <p className="text-white/70 text-sm mb-4">Don&apos;t wait — call our 24/7 helpline directly.</p>
                                <a href="tel:+919003417111" className="flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 hover:bg-red-500/30 transition-colors">
                                    <Phone size={18} className="text-red-400" />
                                    <span className="text-white font-bold text-sm">+91 90034 17111</span>
                                </a>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white border border-[#e5eaeb] rounded-2xl p-6 space-y-5">
                                <h3 className="text-[#00333c] font-black text-base">Contact Info</h3>
                                {[
                                    { icon: <MapPin size={18} />, label: "Address", val: "Opp. to Sri Vidya Mandir School, Meyyanoor Road, Salem - 636 004" },
                                    { icon: <Phone size={18} />, label: "Helpline", val: "+91 90034 17111" },
                                    { icon: <Mail size={18} />, label: "Email", val: "info@vallihospital.com" },
                                    { icon: <Clock size={18} />, label: "OPD Hours", val: "9:00 AM – 8:00 PM" },
                                ].map(({ icon, label, val }) => (
                                    <div key={label} className="flex gap-3 items-start">
                                        <div className="mt-0.5 text-[#f98825] shrink-0">{icon}</div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#40484a] mb-0.5">{label}</div>
                                            <div className="text-[#00333c] font-semibold text-sm">{val}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Why Valli */}
                            <div className="bg-[#004b57] rounded-2xl p-6 text-white space-y-3">
                                <h3 className="font-black text-base mb-4">Why Choose Valli?</h3>
                                {["21+ years of orthopaedic excellence", "5,000+ successful surgeries", "Advanced C-ARM & navigation tech", "Painless nerve block anaesthesia", "Same-day and walk-in consultations"].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] mt-1.5 shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
