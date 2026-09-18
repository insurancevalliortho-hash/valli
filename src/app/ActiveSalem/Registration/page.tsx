"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Lock,
  Shirt,
  Tag,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Ticket,
  Printer,
  Check,
  HeartHandshake
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import RazorpayCheckout from "../../../components/RazorpayCheckout";
import confetti from "canvas-confetti";

export default function ActiveSalemRegistrationPage() {
  const lenis = useLenis();

  // Wizard Step State (1: Runner Profile & Category, 2: Payment & Checkout)
  const [step, setStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState<"3KM" | "5KM" | "10KM">("5KM");
  const [tshirtSize, setTshirtSize] = useState("M"); // "S" | "M" | "L" | "XL" | "XXL"
  const [city, setCity] = useState("Salem");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Generate unique random registration ticket code
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setRegCode(`SALEM26-${randNum}`);
  }, []);

  // Compute total entry fee
  const calculateTotalFee = () => {
    if (category === "3KM") return 0;
    if (category === "10KM") return 299;
    return 249; // 5KM
  };

  const totalFee = calculateTotalFee();

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: ["#F26522", "#00E5C8", "#FFB703", "#FFFFFF"],
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ["#F26522", "#00E5C8", "#FFB703", "#FFFFFF"],
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

  // Handle Free 3KM Registration Submission
  const handleFreeRegistration = async () => {
    setIsSubmitting(true);
    setErrors({});
    const freeTxnId = `FREE_INCLUSIVE_${Date.now()}`;
    setTransactionId(freeTxnId);

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
          source: "Website Direct",
          transactionId: freeTxnId,
          paymentScreenshot: "FREE_INCLUSIVE_ENTRY",
          isVerified: true,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        if (lenis) lenis.scrollTo(0, { immediate: true });
      } else {
        alert(result.error || "Failed to complete registration.");
      }
    } catch (err) {
      console.error(err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle successful Razorpay online checkout
  const handleRazorpaySuccess = async (details: { paymentId: string; orderId: string; signature: string }) => {
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

      <main className="min-h-screen bg-[#001217] text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00A896]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F26522]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          
          {/* Top Breadcrumb Link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/ActiveSalem"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00E5C8] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={14} /> Back to Overview
            </Link>
            <span className="text-[10px] font-mono text-slate-400">
              ACTIVE SALEM 4.0 • 18 OCT 2026
            </span>
          </div>

          {/* Success Screen: Luxury Digital Pass */}
          {isSuccess ? (
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-3xl overflow-hidden shadow-2xl p-7 sm:p-10 space-y-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-2xl bg-[#00E5C8]/20 border border-[#00E5C8]/40 flex items-center justify-center text-[#00E5C8] mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#00E5C8] uppercase block">
                  REGISTRATION CONFIRMED
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
                  You're Ready To Run!
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  A confirmation receipt and bib collection instructions have been logged for <strong className="text-white">{emailId}</strong>.
                </p>
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="bg-[#00171F] border border-white/10 rounded-2xl p-6 text-left relative overflow-hidden max-w-md mx-auto space-y-5">
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">RUNNER PASS CODE</span>
                    <span className="font-mono text-2xl font-black text-[#F26522] tracking-wider select-all">{regCode}</span>
                  </div>
                  <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-mono font-bold uppercase">
                    {category} RUN
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Participant</span>
                    <span className="text-white font-bold text-sm block truncate">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">T-Shirt Size</span>
                    <span className="text-[#00E5C8] font-bold text-sm block">{tshirtSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Date & Time</span>
                    <span className="text-white font-medium block">18 Oct 2026, 5:00 AM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Payment Status</span>
                    <span className="text-emerald-400 font-bold block">{totalFee === 0 ? "Free Entry" : "Verified Paid"}</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-white/10 pt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Txn: {transactionId.slice(0, 16)}...</span>
                  <span>Venue: Valli Hospital Grounds</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer size={14} /> Print / Save Pass
                </button>
                <Link
                  href="/ActiveSalem"
                  className="px-6 py-3 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Back to Event Page
                </Link>
              </div>
            </div>
          ) : (
            /* Multi-step Registration Card */
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Top Step Progress Bar */}
              <div className="bg-white/5 border-b border-white/10 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#F26522] text-white text-xs font-bold font-mono flex items-center justify-center">
                    0{step}
                  </span>
                  <div>
                    <h2 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      {step === 1 ? "Runner Information & Distance" : "Payment & Pass Confirmation"}
                    </h2>
                    <span className="text-[10px] text-slate-400 block">Step {step} of 2</span>
                  </div>
                </div>

                <div className="w-24 sm:w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00E5C8] to-[#F26522] transition-all duration-300"
                    style={{ width: `${(step / 2) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* ─── STEP 1: RUNNER DETAILS & CATEGORY ─── */}
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Category Selection Cards */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#00E5C8] uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <Tag size={13} /> Select Marathon Distance *
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* 3KM */}
                        <button
                          type="button"
                          onClick={() => setCategory("3KM")}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            category === "3KM"
                              ? "border-[#00E5C8] bg-[#00E5C8]/15 shadow-md"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-black uppercase text-white">3 KMS Run</span>
                              <span className="text-[9px] font-mono font-bold text-[#00E5C8] bg-[#00E5C8]/20 px-2 py-0.5 rounded">FREE</span>
                            </div>
                            <span className="text-[10px] text-slate-300 block leading-snug">
                              Ex-Servicemen & Inclusive
                            </span>
                          </div>
                          <span className="font-display text-lg font-black text-[#00E5C8] mt-3">₹0 Entry</span>
                        </button>

                        {/* 5KM */}
                        <button
                          type="button"
                          onClick={() => setCategory("5KM")}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            category === "5KM"
                              ? "border-amber-400 bg-amber-400/15 shadow-md"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-black uppercase text-white">5 KMS Run</span>
                              <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">TIMED</span>
                            </div>
                            <span className="text-[10px] text-slate-300 block leading-snug">
                              Fitness & Community Run
                            </span>
                          </div>
                          <span className="font-display text-lg font-black text-amber-300 mt-3">₹249</span>
                        </button>

                        {/* 10KM */}
                        <button
                          type="button"
                          onClick={() => setCategory("10KM")}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            category === "10KM"
                              ? "border-[#F26522] bg-[#F26522]/15 shadow-md"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-black uppercase text-white">10 KMS Run</span>
                              <span className="text-[9px] font-mono font-bold text-[#F26522] bg-[#F26522]/20 px-2 py-0.5 rounded">ELITE</span>
                            </div>
                            <span className="text-[10px] text-slate-300 block leading-snug">
                              Podium Cash Rewards
                            </span>
                          </div>
                          <span className="font-display text-lg font-black text-[#F26522] mt-3">₹299</span>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Anandha Kumar"
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5C8] focus:bg-white/10 transition-all ${
                            errors.fullName ? "border-rose-500" : "border-white/10"
                          }`}
                        />
                        {errors.fullName && <p className="text-[10px] text-rose-400">{errors.fullName}</p>}
                      </div>

                      {/* Mobile Number */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit mobile number"
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5C8] focus:bg-white/10 transition-all ${
                            errors.mobileNumber ? "border-rose-500" : "border-white/10"
                          }`}
                        />
                        {errors.mobileNumber && <p className="text-[10px] text-rose-400">{errors.mobileNumber}</p>}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Email ID (For Pass & Bib Info) *
                        </label>
                        <input
                          type="email"
                          value={emailId}
                          onChange={(e) => setEmailId(e.target.value)}
                          placeholder="runner@example.com"
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5C8] focus:bg-white/10 transition-all ${
                            errors.emailId ? "border-rose-500" : "border-white/10"
                          }`}
                        />
                        {errors.emailId && <p className="text-[10px] text-rose-400">{errors.emailId}</p>}
                      </div>

                      {/* Age & Gender */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            Age *
                          </label>
                          <input
                            type="number"
                            min={12}
                            max={99}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 26"
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5C8] transition-all ${
                              errors.age ? "border-rose-500" : "border-white/10"
                            }`}
                          />
                          {errors.age && <p className="text-[10px] text-rose-400">{errors.age}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            Gender *
                          </label>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#00E5C8] cursor-pointer"
                          >
                            <option value="Male" className="bg-[#00171F]">Male</option>
                            <option value="Female" className="bg-[#00171F]">Female</option>
                            <option value="Other" className="bg-[#00171F]">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* T-Shirt Size */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Official Valli T-Shirt Size *</span>
                          <span className="text-[9px] text-[#00E5C8]">Moisture-wicking dry-fit</span>
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {(["S", "M", "L", "XL", "XXL"] as const).map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setTshirtSize(size)}
                              className={`py-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                                tshirtSize === size
                                  ? "bg-[#F26522] border-[#F26522] text-white shadow-md"
                                  : "bg-white/5 border-white/10 text-slate-300 hover:border-white/25"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          City / District *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Salem, Namakkal, Erode"
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5C8] transition-all ${
                            errors.city ? "border-rose-500" : "border-white/10"
                          }`}
                        />
                        {errors.city && <p className="text-[10px] text-rose-400">{errors.city}</p>}
                      </div>

                      {/* Emergency Contact */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Emergency Contact Number (Optional)
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value.replace(/\D/g, ""))}
                          placeholder="Relative / Friend contact"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5C8]"
                        />
                      </div>

                    </div>
                  </div>
                )}

                {/* ─── STEP 2: SUMMARY & GATEWAY ─── */}
                {step === 2 && (
                  <div className="space-y-6">
                    {/* Order Summary Box */}
                    <div className="bg-[#00171F] border border-white/10 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Selected Category</span>
                          <span className="font-display text-lg font-black uppercase text-white">{category} Run</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Payable</span>
                          <span className="font-display text-2xl font-black text-[#00E5C8]">
                            {totalFee === 0 ? "FREE" : `₹${totalFee}`}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Runner Name</span>
                          <span className="font-semibold text-white">{fullName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">T-Shirt Size</span>
                          <span className="font-semibold text-white">{tshirtSize}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Contact Mobile</span>
                          <span className="font-semibold text-white">{mobileNumber}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Email Confirmation</span>
                          <span className="font-semibold text-white truncate block">{emailId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Gateway Trigger View */}
                    {totalFee === 0 ? (
                      /* Free 3KM Entry Flow */
                      <div className="bg-white/5 border border-cyan-500/20 rounded-2xl p-6 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[#00E5C8]/10 text-[#00E5C8] flex items-center justify-center mx-auto">
                          <HeartHandshake size={24} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-display text-base font-bold uppercase text-white">
                            3 KMS Inclusive Community Entry
                          </h3>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Free entry honors Ex-Servicemen and differently-abled participants. Click below to generate your official pass instantly.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleFreeRegistration}
                          disabled={isSubmitting}
                          className="w-full bg-[#00E5C8] hover:bg-[#00c4ab] text-[#001217] py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer disabled:opacity-60"
                        >
                          {isSubmitting ? "Generating Ticket Pass..." : "Confirm Free Registration →"}
                        </button>
                      </div>
                    ) : (
                      /* Paid 5KM / 10KM Razorpay Gateway Flow */
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-display text-base font-bold uppercase text-white">
                            Instant Razorpay Checkout
                          </h3>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Pay securely using UPI (Google Pay, PhonePe, Paytm), Credit/Debit Card, or Net Banking.
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
                            onSuccess={handleRazorpaySuccess}
                            onFailure={(errMsg) => setErrors({ payment: errMsg })}
                            buttonText={`Pay ₹${totalFee} & Claim Ticket`}
                            buttonClassName="w-full bg-[#F26522] hover:bg-[#d95315] text-white py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 cursor-pointer flex items-center justify-center gap-2"
                          />
                        </div>

                        {errors.payment && (
                          <p className="text-xs text-rose-400 font-medium pt-1">{errors.payment}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Navigation Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-7 py-3 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      Continue to Payment <ChevronRight size={16} />
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
