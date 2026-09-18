"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Tag,
  Info,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Sparkles
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import RazorpayCheckout from "../../../components/RazorpayCheckout";
import confetti from "canvas-confetti";

type CategoryType = "5KM" | "10KM";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

export default function ActiveSalemRegistrationPage() {
  const lenis = useLenis();

  // Wizard Step State (1: Runner Profile & Category, 2: Payment & Confirmation)
  const [step, setStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState<CategoryType>("5KM");
  const [tshirtSize, setTshirtSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("M");
  const [city, setCity] = useState("Salem");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("SALEM26-0001");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch next sequential registration code (ordered, non-random)
    fetch("/api/active-salem/register")
      .then((res) => res.json())
      .then((data) => {
        if (data?.nextRegistrationCode) {
          setRegCode(data.nextRegistrationCode);
        }
      })
      .catch(() => {
        setRegCode("SALEM26-0001");
      });
  }, []);

  // Compute total entry fee
  const calculateTotalFee = () => {
    if (category === "10KM") return 299;
    return 249; // 5KM
  };

  const totalFee = calculateTotalFee();

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { x: 0.25, y: 0.6 },
      colors: ["#F26522", "#00A896", "#D97706", "#0F172A"],
    });
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { x: 0.75, y: 0.6 },
      colors: ["#F26522", "#00A896", "#D97706", "#0F172A"],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      triggerConfetti();
    }
  }, [isSuccess]);

  // Step Validation
  const validateStep = (currentStep: number) => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!fullName.trim()) stepErrors.fullName = "Full name is required";
      if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId)) {
        stepErrors.emailId = "A valid email address is required";
      }
      if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim())) {
        stepErrors.mobileNumber = "A valid 10-digit mobile number is required";
      }
      const ageNum = Number(age);
      if (!age.trim() || isNaN(ageNum) || ageNum < 12 || ageNum > 99) {
        stepErrors.age = "Runner must be 12 years or above";
      }
      if (!category) stepErrors.category = "Please choose a run category";
      if (!tshirtSize) stepErrors.tshirtSize = "Please select your T-shirt size";
      if (!city.trim()) stepErrors.city = "City / Location is required";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Handle successful online checkout
  const handlePaymentSuccess = async (details: { paymentId: string; orderId: string; signature: string }) => {
    setIsSubmitting(true);
    setErrors({});
    setTransactionId(details.paymentId);

    try {
      const response = await fetch("/api/active-salem/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationCode: regCode,
          fullName,
          emailId,
          mobileNumber,
          category,
          tshirtSize,
          gender,
          age: Number(age),
          emergencyContact: emergencyContact || "N/A",
          city,
          source: "Online Gateway",
          transactionId: details.paymentId,
          paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
          isVerified: true,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.registrationCode) {
          setRegCode(result.registrationCode);
        }
        setIsSuccess(true);
        if (lenis) lenis.scrollTo(0, { immediate: true });
      } else {
        alert(result.error || "Payment received, but registration record could not be saved. Contact helpline.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error confirming registration. Payment ID: " + details.paymentId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFCFC] text-slate-900 pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-teal-100/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Top Breadcrumb Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/ActiveSalem"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F26522] font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={14} /> Back to Overview
            </Link>
            <span className="text-[11px] font-mono text-slate-400 font-bold">
              ACTIVE SALEM 4.0 • 11 OCT 2026
            </span>
          </div>

          {/* ─── SUCCESS SCREEN: Boarding Pass ─── */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeSmooth }}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.06)] p-7 sm:p-10 space-y-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm"
              >
                <CheckCircle2 size={36} />
              </motion.div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#00A896] uppercase block">
                  REGISTRATION CONFIRMED
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-slate-900">
                  You're Ready To Run!
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  A confirmation receipt and bib collection instructions have been recorded for <strong className="text-slate-900">{emailId}</strong>.
                </p>
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left relative overflow-hidden max-w-md mx-auto space-y-5 shadow-sm">
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">RUNNER PASS CODE</span>
                    <span className="font-mono text-2xl font-black text-[#F26522] tracking-wider select-all">{regCode}</span>
                  </div>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-mono font-bold uppercase shadow-sm">
                    {category} RUN
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Participant</span>
                    <span className="text-slate-900 font-bold text-sm block truncate">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">T-Shirt Size</span>
                    <span className="text-[#00A896] font-bold text-sm block">{tshirtSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Date & Time</span>
                    <span className="text-slate-900 font-medium block">11 Oct 2026, 5:00 AM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Payment Status</span>
                    <span className="text-emerald-600 font-bold block">Verified Paid (₹{totalFee})</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Txn: {transactionId ? `${transactionId.slice(0, 16)}...` : "Confirmed"}</span>
                  <span>Venue: Valli Super Speciality Hospital</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center pt-2">
                <Link
                  href="/ActiveSalem"
                  className="px-8 py-3.5 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Back to Event Page
                </Link>
              </div>
            </motion.div>
          ) : (
            /* ─── MULTI-STEP WIZARD ─── */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="bg-white border border-slate-200/90 rounded-3xl shadow-[0_8px_36px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              {/* Step Progress Header */}
              <div className="bg-slate-50/80 border-b border-slate-200/80 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#F26522] text-white text-xs font-bold font-mono flex items-center justify-center shadow-sm">
                    0{step}
                  </span>
                  <div>
                    <h2 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      {step === 1 ? "Runner Profile & Category" : "Payment & Pass Confirmation"}
                    </h2>
                    <span className="text-[10px] text-slate-400 font-mono block">Step {step} of 2</span>
                  </div>
                </div>

                <div className="w-24 sm:w-36 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00A896] to-[#F26522]"
                    initial={{ width: "50%" }}
                    animate={{ width: `${(step / 2) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* ─── STEP 1: RUNNER DETAILS & CATEGORY ─── */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35, ease: easeSmooth }}
                      className="space-y-6"
                    >
                      {/* Distance Selector (5KM & 10KM only) */}
                      <div className="space-y-3">
                        <label className="text-[11px] font-mono text-[#00A896] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <Tag size={13} /> Select Marathon Distance *
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* 5KM */}
                          <motion.button
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setCategory("5KM")}
                            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              category === "5KM"
                                ? "border-[#D97706] bg-amber-50/60 shadow-sm ring-2 ring-[#D97706]/20"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-sm font-extrabold uppercase text-slate-900">5 KMS Run</span>
                                <span className="text-[9px] font-mono font-bold text-[#D97706] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">TIMED</span>
                              </div>
                              <span className="text-xs text-slate-500 block leading-relaxed">
                                Fitness & Community Run • Official Tee, Medal & Certificate Included
                              </span>
                            </div>
                            <span className="font-display text-xl font-black text-[#D97706] mt-4">₹249</span>
                          </motion.button>

                          {/* 10KM */}
                          <motion.button
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setCategory("10KM")}
                            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              category === "10KM"
                                ? "border-[#F26522] bg-orange-50/60 shadow-sm ring-2 ring-[#F26522]/20"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-sm font-extrabold uppercase text-slate-900">10 KMS Run</span>
                                <span className="text-[9px] font-mono font-bold text-[#F26522] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">ELITE</span>
                              </div>
                              <span className="text-xs text-slate-500 block leading-relaxed">
                                Podium Cash Rewards (₹5,000 Top Prize) • Bib Tag, Tee & Medal
                              </span>
                            </div>
                            <span className="font-display text-xl font-black text-[#F26522] mt-4">₹299</span>
                          </motion.button>
                        </div>

                        {/* Callout regarding 3KM Walkathon */}
                        <div className="flex items-start gap-2.5 p-3.5 bg-teal-50/50 border border-teal-100 rounded-xl text-xs text-slate-600">
                          <Info size={16} className="text-[#00A896] shrink-0 mt-0.5" />
                          <p className="text-[11px] leading-relaxed">
                            <strong>Looking for the 3 KMS Walkathon?</strong> The 3 KMS walkathon is exclusively dedicated to Ex-Servicemen and Armed Forces veterans with complimentary entry. It is coordinated directly on-spot or via participating institutions (no online payment registration required).
                          </p>
                        </div>
                      </div>

                      {/* Runner Fields Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Anandha Kumar"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F26522] focus:ring-2 focus:ring-[#F26522]/10 transition-all ${
                              errors.fullName ? "border-rose-500" : "border-slate-200"
                            }`}
                          />
                          {errors.fullName && <p className="text-[10px] text-rose-500">{errors.fullName}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit mobile number"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F26522] focus:ring-2 focus:ring-[#F26522]/10 transition-all ${
                              errors.mobileNumber ? "border-rose-500" : "border-slate-200"
                            }`}
                          />
                          {errors.mobileNumber && <p className="text-[10px] text-rose-500">{errors.mobileNumber}</p>}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                            Email ID (For Pass & Bib Info) *
                          </label>
                          <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="runner@example.com"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F26522] focus:ring-2 focus:ring-[#F26522]/10 transition-all ${
                              errors.emailId ? "border-rose-500" : "border-slate-200"
                            }`}
                          />
                          {errors.emailId && <p className="text-[10px] text-rose-500">{errors.emailId}</p>}
                        </div>

                        {/* Age & Gender */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                              Age *
                            </label>
                            <input
                              type="number"
                              min={12}
                              max={99}
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              placeholder="e.g. 26"
                              className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F26522] transition-all ${
                                errors.age ? "border-rose-500" : "border-slate-200"
                              }`}
                            />
                            {errors.age && <p className="text-[10px] text-rose-500">{errors.age}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                              Gender *
                            </label>
                            <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#F26522] cursor-pointer"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        {/* T-Shirt Size: ONLY M, L, XL */}
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            <span>Official Valli T-Shirt Size *</span>
                            <span className="text-[10px] text-[#00A896] font-sans font-medium">Moisture-wicking dry-fit</span>
                          </label>
                          <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                            {(["S", "M", "L", "XL", "XXL"] as const).map((size) => (
                              <motion.button
                                key={size}
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setTshirtSize(size)}
                                className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                                  tshirtSize === size
                                    ? "bg-[#F26522] border-[#F26522] text-white shadow-sm"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                {size}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                            City / District *
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Salem, Namakkal, Erode"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F26522] transition-all ${
                              errors.city ? "border-rose-500" : "border-slate-200"
                            }`}
                          />
                          {errors.city && <p className="text-[10px] text-rose-500">{errors.city}</p>}
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                            Emergency Contact Number (Optional)
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value.replace(/\D/g, ""))}
                            placeholder="Relative / Friend contact"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F26522]"
                          />
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* ─── STEP 2: SUMMARY & PAYMENT ─── */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, ease: easeSmooth }}
                      className="space-y-6"
                    >
                      {/* Order Summary */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">Selected Distance</span>
                            <span className="font-display text-lg font-black uppercase text-slate-900">{category} Run</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Payable</span>
                            <span className="font-display text-2xl font-black text-[#F26522]">
                              ₹{totalFee}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-mono">Runner Name</span>
                            <span className="font-semibold text-slate-900">{fullName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-mono">T-Shirt Size</span>
                            <span className="font-semibold text-slate-900">{tshirtSize}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-mono">Contact Mobile</span>
                            <span className="font-semibold text-slate-900">{mobileNumber}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-mono">Email Confirmation</span>
                            <span className="font-semibold text-slate-900 truncate block">{emailId}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Card (No Razorpay wording) */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-display text-base font-bold uppercase text-slate-900">
                            Pay Registration Fee
                          </h3>
                          <p className="text-xs text-slate-600 max-w-sm mx-auto">
                            Pay using UPI (Google Pay, PhonePe, Paytm), Cards, or Net Banking.
                          </p>
                        </div>

                        <div className="max-w-sm mx-auto pt-2">
                          <RazorpayCheckout
                            amount={totalFee}
                            title="Active Salem Marathon 4.0"
                            description={`${category} Entry - ${fullName}`}
                            prefillName={fullName}
                            prefillEmail={emailId}
                            prefillPhone={mobileNumber}
                            eventType="ACTIVE_SALEM"
                            registrationCode={regCode}
                            notes={{ category, tshirtSize, gender, age, city }}
                            onSuccess={handlePaymentSuccess}
                            onFailure={(errMsg) => setErrors({ payment: errMsg })}
                            buttonText={`Pay ₹${totalFee} & Confirm Registration`}
                            buttonClassName="w-full bg-[#F26522] hover:bg-[#d95315] text-white py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                          />
                        </div>

                        {errors.payment && (
                          <p className="text-xs text-rose-500 font-medium pt-1">{errors.payment}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Navigation Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  {step > 1 ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePrev}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft size={16} /> Back
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {step === 1 && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="px-7 py-3 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      Continue to Payment <ChevronRight size={16} />
                    </motion.button>
                  )}
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
