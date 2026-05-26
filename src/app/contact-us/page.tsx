"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";
import { BreadcrumbSchema, HospitalSchema } from "../../components/seo/StructuredData";

interface FormState {
  fullName: string;
  phone: string;
  speciality: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  speciality?: string;
  message?: string;
}

export default function ContactUsPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    speciality: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.fullName.trim()) tempErrors.fullName = "Full name is required.";
    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9]{10,12}$/.test(form.phone.replace(/[\s-]/g, ""))) {
      tempErrors.phone = "Please enter a valid 10-12 digit phone number.";
    }
    if (!form.speciality) tempErrors.speciality = "Please select a specialty clinical interest.";
    if (!form.message.trim()) tempErrors.message = "Message cannot be blank.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Mock API call to represent sending a request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      phone: "",
      speciality: "",
      message: "",
    });
    setSubmitSuccess(false);
  };

  return (
    <SmoothScroll>
      <MagneticCursor />
      <Navbar />

      {/* SEO Schema Components */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://vallihospital.in/" },
          { name: "Contact Us", url: "https://vallihospital.in/contact-us" },
        ]}
      />
      <HospitalSchema />

      {/* Hero Header */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-end bg-[#001f25] overflow-hidden pt-36 pb-20"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-25%] right-[-10%] w-[50vw] h-[50vw] bg-[#004b57]/20 rounded-[8rem] rotate-45" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[35vw] h-[35vw] bg-[#f98825]/8 rounded-[6rem] rotate-12" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.03,
            }}
          />
        </motion.div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
            Active Care Support
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight mb-6"
          >
            Contact & <br />
            <span className="text-[#f98825]">Diagnostics Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-medium"
          >
            Connect instantly with our emergency trauma rooms, book radiological imaging, or submit clinical inquiries to our chief medical desks.
          </motion.p>
        </div>
      </section>

      {/* Directory Cards Section */}
      <section className="py-16 bg-[#f9fafb] border-b border-[#e5eaeb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[#e5eaeb] rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#00333c] mb-2">24/7 Emergency Hotline</h3>
                <p className="text-gray-500 text-sm font-semibold mb-6">
                  Direct pipeline to our trauma rooms and ambulance dispatchers. Call instantly for urgent orthopedic or surgical care.
                </p>
              </div>
              <a
                href="tel:+919003417111"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase text-center py-3.5 rounded-full transition-colors"
              >
                Call Hotline: +91 90034 17111
              </a>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[#e5eaeb] rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#004b57] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#00333c] mb-2">OPD Clinical Desk</h3>
                <p className="text-gray-500 text-sm font-semibold mb-6">
                  Consultation scheduling, general patient operations, check-ups, and outpatient coordination desks.
                </p>
              </div>
              <a
                href="tel:+914272445111"
                className="bg-[#004b57] hover:bg-[#00333c] text-white font-bold text-xs tracking-wider uppercase text-center py-3.5 rounded-full transition-colors"
              >
                Call Desk: +91 427 2445111
              </a>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-[#e5eaeb] rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f98825] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#00333c] mb-2">Diagnostics & Imaging Lab</h3>
                <p className="text-gray-500 text-sm font-semibold mb-6">
                  Book slots for High-Speed CT Scans, digital X-Rays, genetic DNA mapping profiles, and biochemistry lab screenings.
                </p>
              </div>
              <a
                href="mailto:info@vallihospital.in"
                className="bg-[#f98825] hover:bg-[#e0751e] text-white font-bold text-xs tracking-wider uppercase text-center py-3.5 rounded-full transition-colors"
              >
                Email desk: info@vallihospital.in
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form and Map Grid Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column - 7 Cols */}
            <div className="lg:col-span-7">
              <span className="block text-xs font-black text-[#f98825] uppercase tracking-widest mb-3">
                Digital Connection Pathway
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#00333c] tracking-tight mb-8">
                Submit an <span className="text-[#004b57]">Inquiry or Booking</span>
              </h2>

              <div className="bg-[#f9fafb] border border-[#e5eaeb] rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      {/* Name input */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-bold text-[#00333c] uppercase tracking-wider mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Anand Kumar"
                          className={`w-full px-5 py-4 rounded-xl border font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#004b57]/20 ${
                            errors.fullName
                              ? "border-red-400 bg-red-50/20 focus:border-red-400"
                              : "border-[#e5eaeb] bg-white focus:border-[#004b57]"
                          }`}
                        />
                        {errors.fullName && (
                          <span className="text-red-500 text-xs font-bold mt-1.5 block">
                            {errors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Phone input */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold text-[#00333c] uppercase tracking-wider mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full px-5 py-4 rounded-xl border font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#004b57]/20 ${
                            errors.phone
                              ? "border-red-400 bg-red-50/20 focus:border-red-400"
                              : "border-[#e5eaeb] bg-white focus:border-[#004b57]"
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-red-500 text-xs font-bold mt-1.5 block">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Specialty select */}
                      <div>
                        <label
                          htmlFor="speciality"
                          className="block text-xs font-bold text-[#00333c] uppercase tracking-wider mb-2"
                        >
                          Clinical specialty interest
                        </label>
                        <select
                          id="speciality"
                          name="speciality"
                          value={form.speciality}
                          onChange={handleChange}
                          className={`w-full px-5 py-4 rounded-xl border font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#004b57]/20 appearance-none bg-white ${
                            errors.speciality
                              ? "border-red-400 bg-red-50/20 focus:border-red-400"
                              : "border-[#e5eaeb] focus:border-[#004b57]"
                          }`}
                        >
                          <option value="">-- Choose Clinical Specialty --</option>
                          <option value="joint-care">Joint Replacement & Reconstruction</option>
                          <option value="arthroscopy">Arthroscopy & Sports Injury</option>
                          <option value="bone-cancer">Oncology & Bone Cancer Treatment</option>
                          <option value="pediatric">Paediatric Orthopaedics</option>
                          <option value="spine">Spine Disorders & Back Pain</option>
                          <option value="diagnostics">Diagnostics Labs & DNA Profiling</option>
                          <option value="other">General Medical Enquiry</option>
                        </select>
                        {errors.speciality && (
                          <span className="text-red-500 text-xs font-bold mt-1.5 block">
                            {errors.speciality}
                          </span>
                        )}
                      </div>

                      {/* Message input */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-bold text-[#00333c] uppercase tracking-wider mb-2"
                        >
                          Describe your clinical inquiry or symptoms
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Please supply any relevant medical history or preferred consultation timings..."
                          className={`w-full px-5 py-4 rounded-xl border font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#004b57]/20 ${
                            errors.message
                              ? "border-red-400 bg-red-50/20 focus:border-red-400"
                              : "border-[#e5eaeb] bg-white focus:border-[#004b57]"
                          }`}
                        />
                        {errors.message && (
                          <span className="text-red-500 text-xs font-bold mt-1.5 block">
                            {errors.message}
                          </span>
                        )}
                      </div>

                      {/* Submit btn */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#004b57] hover:bg-[#00333c] disabled:bg-[#004b57]/50 text-white font-bold text-xs tracking-widest uppercase py-4.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Dispatching Request...
                          </>
                        ) : (
                          <>
                            Submit Registration request
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-[#e0f2f1] text-[#004b57] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black text-[#00333c] mb-3">Registration Received</h3>
                      <p className="text-gray-500 font-semibold leading-relaxed max-w-sm mx-auto mb-8 text-sm">
                        Thank you, <span className="text-[#004b57]">{form.fullName}</span>. An active duty administrator will review your medical request and call you shortly at <span className="text-[#004b57]">{form.phone}</span>.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={handleReset}
                          className="bg-[#004b57] hover:bg-[#00333c] text-white text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors cursor-pointer"
                        >
                          Submit new request
                        </button>
                        <Link
                          href="/services"
                          className="border border-[#e5eaeb] text-[#40484a] text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full transition-all bg-white hover:border-[#f98825]"
                        >
                          Browse Services Catalog
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Map and Details Column - 5 Cols */}
            <div className="lg:col-span-5 space-y-8">
              {/* Info block */}
              <div>
                <span className="block text-xs font-black text-[#f98825] uppercase tracking-widest mb-3">
                  Corporate Location & Details
                </span>
                <h2 className="text-3xl font-black text-[#00333c] tracking-tight mb-6">
                  Physical HQ
                </h2>

                <div className="bg-[#f9fafb] border border-[#e5eaeb] rounded-[2rem] p-8 space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#004b57] flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#00333c] uppercase tracking-wider mb-1">
                        Corporate Address
                      </h4>
                      <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                        Opp. to Sri Vidya Mandir School,<br />
                        Meyyanoor Road, Salem - 636 004,<br />
                        Tamil Nadu, India.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#f98825] flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#00333c] uppercase tracking-wider mb-1">
                        Operating Hours
                      </h4>
                      <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                        <span className="text-[#004b57] font-bold">24/7 Trauma Emergency Desk</span><br />
                        OPD Consultation: Monday – Sunday, 9:00 AM – 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Component */}
              <div>
                <h3 className="text-xs font-black text-[#00333c] uppercase tracking-wider mb-4">
                  Interactive Route Map (Salem)
                </h3>

                <div className="relative border border-[#e5eaeb] rounded-[2rem] h-[280px] bg-white overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4065.106559033785!2d78.12971567505521!3d11.666995088541135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1c2ea9b3a3f%3A0x93bd1e1b0c15d6f0!2sValli%20Super%20Speciality%20Hospital!5e1!3m2!1sen!2sin!4v1779286929212!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Valli Super Speciality Hospital Salem Google Maps Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </SmoothScroll>
  );
}
