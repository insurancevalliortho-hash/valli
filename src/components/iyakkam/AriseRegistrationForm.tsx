"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  FileText,
  User,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Check,
  Briefcase,
  Layers,
  Compass,
  GraduationCap,
  Stethoscope,
  ArrowRightLeft
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import RazorpayCheckout from "../RazorpayCheckout";
import { resolveClientSource } from "../../lib/attribution";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

export interface AriseRegistrationFormProps {
  role: "student" | "doctor";
  basePath?: string;
}

export default function AriseRegistrationForm({
  role,
  basePath = "/iyakkam/arise/register",
}: AriseRegistrationFormProps) {
  const lenis = useLenis();

  const isStudentRole = role === "student";

  // Step state (1: Details, 2: Confirm & Pay)
  const [step, setStep] = useState(1);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState(
    isStudentRole ? "Student" : "Doctor / Physician"
  );
  const [qualification, setQualification] = useState("");
  const [category, setCategory] = useState(
    isStudentRole ? "Special Catagory 1 (₹500)" : "Conference"
  );
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");

  const [iapCreditPoints, setIapCreditPoints] = useState(false);
  const [iapMembershipNumber, setIapMembershipNumber] = useState("");
  const [source, setSource] = useState("Direct");
  const [transactionId, setTransactionId] = useState("");

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Resolve attribution source from URL params (?source=qr, ?source=meta) or stored session
    const detectedSource = resolveClientSource("arise_source");
    setSource(detectedSource);

    fetch("/api/arise/register")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.nextRegistrationCode) {
          setRegCode(data.nextRegistrationCode);
        } else {
          setRegCode("ARISE26-0001");
        }
      })
      .catch(() => {
        setRegCode("ARISE26-0001");
      });
  }, []);

  // Compute total fee amount to pay
  const calculateTotalFee = () => {
    if (isStudentRole) {
      if (category.includes("500") || category === "Special Catagory 1 (₹500)") {
        return 500;
      }
      if (category.includes("1000") || category === "Special Catagory 2 (₹1000)") {
        return 1000;
      }
      return 500;
    }

    // Doctor role fee calculation
    if (category === "Conference with Workshop") {
      return 2500;
    }
    return 2000; // Conference Single
  };

  const totalFee = calculateTotalFee();
  const includeWorkshop = category === "Conference with Workshop" || category === "Workshop";

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
      colors: ["#00A896", "#FF8C00", "#004B57", "#FFF4EE"],
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
      colors: ["#00A896", "#FF8C00", "#004B57", "#FFF4EE"],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      triggerConfetti();
    }
  }, [isSuccess]);

  // Step validation
  const validateStep = (currentStep: number) => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!fullName.trim()) stepErrors.fullName = "Full name is required";
      if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId)) {
        stepErrors.emailId = "A valid email ID is required";
      }
      if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim())) {
        stepErrors.mobileNumber = "A valid 10-digit mobile number is required";
      }
      if (!designation.trim()) stepErrors.designation = "Designation is required";
      if (!category.trim()) stepErrors.category = "Registration category is required";
      if (!qualification.trim()) stepErrors.qualification = "Qualification is required";
      if (!institution.trim()) stepErrors.institution = "Institution/Hospital/College name is required";
      if (!city.trim()) stepErrors.city = "City/Location is required";
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

  // Handle successful online payment submission
  const handleRazorpaySuccess = async (details: { paymentId: string; orderId: string; signature: string }) => {
    setIsSubmitting(true);
    setErrors({});
    setTransactionId(details.paymentId);

    try {
      const res = await fetch("/api/arise/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationCode: regCode,
          fullName,
          emailId,
          mobileNumber,
          category,
          includeWorkshop,
          institution,
          department,
          city,
          source,
          transactionId: details.paymentId,
          paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
          designation,
          qualification,
          foodPreference: "Vegetarian",
          iapCreditPoints,
          iapMembershipNumber: iapCreditPoints ? iapMembershipNumber : "",
          isVerified: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.registrationCode) {
          setRegCode(data.registrationCode);
        }
      } else {
        throw new Error(data.error || "Failed to save delegate registration");
      }

      setIsSuccess(true);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    } catch (err: any) {
      console.error(err);
      alert((err?.message || "Error submitting registration") + ". Payment ID: " + details.paymentId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const otherRoleHref = isStudentRole ? `${basePath}/doctor` : `${basePath}/student`;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAFAF9] text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots text-left">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <Link
                href="/iyakkam/arise"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-[#00A896] font-semibold text-xs transition-colors group uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to ARISE 2026 Home
              </Link>

              <Link
                href={basePath}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#004B57] font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-full transition-all shadow-sm"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#00A896]" />
                Change Category
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full inline-block border border-[#00A896]/20">
                    National CME Conference Registration
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1 border ${
                      isStudentRole
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-teal/10 text-[#004B57] border-teal/20"
                    }`}
                  >
                    {isStudentRole ? (
                      <>
                        <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                        Student Delegate
                      </>
                    ) : (
                      <>
                        <Stethoscope className="w-3.5 h-3.5 text-[#00A896]" />
                        Doctor / Professional Delegate
                      </>
                    )}
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] tracking-tight uppercase">
                  ARISE 2026 Registration
                </h1>
              </div>

              {!isSuccess && (
                <div className="bg-white border border-[#E2E8F0] px-4 py-2.5 rounded-2xl shadow-sm text-right">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Registration Code
                  </span>
                  <span className="font-mono text-sm font-black text-[#FF8C00] tracking-wider">
                    {regCode}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Switch Banner */}
            {!isSuccess && (
              <div className="mt-4 p-3 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-bold text-[#004B57]">
                    {isStudentRole ? "Registering as Student" : "Registering as Doctor"}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">
                    {isStudentRole
                      ? "Special Category pricing applies (₹500 / ₹1,000)"
                      : "Standard Doctor / Consultant pricing applies"}
                  </span>
                </div>
                <Link
                  href={otherRoleHref}
                  className="text-xs font-bold text-[#00A896] hover:text-[#008B7A] flex items-center gap-1 transition-colors self-start sm:self-auto"
                >
                  {isStudentRole ? "Registering as Doctor instead? →" : "Registering as Student instead? →"}
                </Link>
              </div>
            )}
          </div>

          {/* Success Screen: Digital Pass Ticket */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="bg-white border border-slate-200/90 rounded-[2.5rem] shadow-xl p-8 sm:p-12 text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-emerald-200"
              >
                <CheckCircle2 size={42} />
              </motion.div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  Registration Confirmed 🎉
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] uppercase">
                  Welcome to ARISE 2026!
                </h2>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Thank you, <span className="font-bold text-[#004B57]">{fullName}</span>! Your CME Registration has been confirmed. A confirmation receipt and conference pass details have been sent to <span className="font-bold text-[#004B57]">{emailId}</span>.
                </p>
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="bg-[#F0FAF9] border border-[#00A896]/20 p-6 rounded-2xl max-w-md mx-auto space-y-4 text-left relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-start border-b border-[#00A896]/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      DELEGATE PASS CODE
                    </span>
                    <span className="font-mono text-2xl font-black text-[#FF8C00] tracking-wider select-all">
                      {regCode}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-white border border-[#00A896]/30 text-[#004B57] rounded-lg text-xs font-mono font-bold uppercase shadow-sm">
                    {category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Delegate Name</span>
                    <span className="text-[#004B57] font-bold text-sm block truncate">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Designation</span>
                    <span className="text-slate-800 font-semibold text-xs block truncate">{designation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Institution / City</span>
                    <span className="text-slate-800 font-medium block truncate">
                      {institution ? `${institution}, ${city}` : city || "Salem"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Payment Status</span>
                    <span className="text-emerald-600 font-bold block flex items-center gap-1">
                      <CheckCircle2 size={13} /> Verified Paid (₹{totalFee.toLocaleString("en-IN")})
                    </span>
                  </div>
                </div>

                {transactionId && (
                  <div className="border-t border-dashed border-[#00A896]/20 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Txn: {transactionId.slice(0, 18)}...</span>
                    <span>Venue: Knowledge Institute of Technology</span>
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/iyakkam/arise"
                  className="bg-[#004B57] hover:bg-[#00333C] text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md text-center"
                >
                  Return to Event Homepage
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Wizard Main Form */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-xl overflow-hidden"
            >
              {/* Wizard Steps Header */}
              <div className="bg-slate-50 border-b border-[#E2E8F0] p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                  {[
                    { num: 1, title: "1. Delegate & CME Details" },
                    { num: 2, title: "2. Confirm & Pay" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        step === s.num
                          ? "bg-white text-[#004B57] shadow-sm border border-[#E2E8F0] font-bold"
                          : step > s.num
                          ? "text-emerald-600 font-bold"
                          : "text-slate-400 font-medium"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                          step === s.num
                            ? "bg-[#004B57] text-white"
                            : step > s.num
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {step > s.num ? <Check size={14} /> : s.num}
                      </div>
                      <span className="text-xs uppercase tracking-wider truncate">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35, ease: easeSmooth }}
                      className="space-y-6"
                    >
                      <div className="border-b border-slate-100 pb-4">
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">
                          Delegate Personal Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Please enter your delegate info accurately for your certificate & badge.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-teal" /> Full Name (as to appear on Certificate) *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={isStudentRole ? "e.g. John Doe" : "e.g. Dr. Ramesh Kumar"}
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.fullName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                            }`}
                          />
                          {errors.fullName && <p className="text-[10px] text-red-500 font-semibold">{errors.fullName}</p>}
                        </div>

                        {/* Email ID */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-teal" /> Email Address *
                          </label>
                          <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="e.g. delegate@institution.edu"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.emailId ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                            }`}
                          />
                          {errors.emailId && <p className="text-[10px] text-red-500 font-semibold">{errors.emailId}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-teal" /> Mobile Number *
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit mobile number"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.mobileNumber ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                            }`}
                          />
                          {errors.mobileNumber && <p className="text-[10px] text-red-500 font-semibold">{errors.mobileNumber}</p>}
                        </div>

                        {/* Designation */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-teal" /> Designation *
                          </label>
                          <div className="relative">
                            <select
                              value={designation}
                              onChange={(e) => setDesignation(e.target.value)}
                              className="w-full bg-white border border-[#E2E8F0] hover:border-slate-355 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                            >
                              {isStudentRole ? (
                                <>
                                  <option value="Student">Student</option>
                                  <option value="Undergraduate Student">Undergraduate Student</option>
                                  <option value="Postgraduate / PG Student">Postgraduate / PG Student</option>
                                  <option value="Other">Other</option>
                                </>
                              ) : (
                                <>
                                  <option value="Doctor / Physician">Doctor / Physician</option>
                                  <option value="Consultant">Consultant</option>
                                  <option value="Graduate">Graduate</option>
                                  <option value="Other">Other</option>
                                </>
                              )}
                            </select>
                          </div>
                        </div>

                        {/* Registration Category */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-teal" /> Registration Category *
                          </label>
                          <div className="relative">
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full bg-white border border-[#E2E8F0] hover:border-slate-355 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                            >
                              {isStudentRole ? (
                                <>
                                  <option value="Special Catagory 1 (₹500)">
                                    Special Catagory 1 (₹500)
                                  </option>
                                  <option value="Special Catagory 2 (₹1000)">
                                    Special Catagory 2 (₹1000)
                                  </option>
                                </>
                              ) : (
                                <>
                                  <option value="Conference">
                                    Conference Single (₹2,000)
                                  </option>
                                  <option value="Conference with Workshop">
                                    Conference + Workshop (₹2,500)
                                  </option>
                                </>
                              )}
                            </select>
                          </div>
                          {isStudentRole ? (
                            <p className="text-[10px] text-amber-600 font-medium">
                              🎓 Special discounted categories exclusive to student delegates.
                            </p>
                          ) : (
                            <p className="text-[10px] text-slate-400 font-medium">
                              🩺 Full conference access with option for hands-on workshop.
                            </p>
                          )}
                        </div>

                        {/* Qualification */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-teal" /> Qualification *
                          </label>
                          <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder={isStudentRole ? "e.g. BPT Student, MBBS Intern, MPT Student" : "e.g. MBBS, MS (Ortho), MD, DNB, BPT, MPT"}
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.qualification ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                            }`}
                          />
                          {errors.qualification && <p className="text-[10px] text-red-500 font-semibold">{errors.qualification}</p>}
                        </div>

                        {/* Institution / College */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-teal" /> {isStudentRole ? "College / Medical Institution *" : "Institution / Hospital / Clinic *"}
                          </label>
                          <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder={isStudentRole ? "Enter your college name" : "Enter your hospital or clinic name"}
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.institution ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                            }`}
                          />
                          {errors.institution && <p className="text-[10px] text-red-500 font-semibold">{errors.institution}</p>}
                        </div>

                        {/* Department */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-teal" /> Department
                          </label>
                          <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Physiotherapy, Orthopaedics, Surgery"
                            className="w-full bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal"
                          />
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-teal" /> City / Location *
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Salem, Chennai, Bangalore"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all focus:outline-none focus:border-teal ${
                              errors.city ? "border-red-500" : "border-[#E2E8F0]"
                            }`}
                          />
                          {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
                        </div>
                      </div>

                      {/* IAP Credit points checkbox (optional) */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={iapCreditPoints}
                            onChange={(e) => setIapCreditPoints(e.target.checked)}
                            className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896]"
                          />
                          <span className="text-xs font-semibold text-slate-700">
                            I require IAP Credit Points for this CME
                          </span>
                        </label>
                        {iapCreditPoints && (
                          <div className="pl-6 animate-in fade-in duration-200">
                            <input
                              type="text"
                              value={iapMembershipNumber}
                              onChange={(e) => setIapMembershipNumber(e.target.value)}
                              placeholder="Enter IAP Membership Number"
                              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, ease: easeSmooth }}
                      className="space-y-6"
                    >
                      <div className="border-b border-slate-100 pb-4">
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">
                          Payment Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Review your registration details and complete payment.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Summary Box */}
                        <div className="bg-slate-50 border border-[#E2E8F0] p-5 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">Registrant:</span>
                            <span className="font-bold text-[#004B57]">{fullName}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">Role:</span>
                            <span className="font-bold text-slate-700">
                              {isStudentRole ? "Student Delegate" : "Doctor Delegate"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">Category:</span>
                            <span className="font-bold text-[#FF8C00]">{category}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">Institution:</span>
                            <span className="font-bold text-slate-700 truncate max-w-[200px]">{institution}</span>
                          </div>
                          <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                            <div className="space-y-0.5">
                              <span className="block text-[10px] font-bold text-[#004B57] uppercase tracking-wider">
                                Amount to Pay: <span className="text-[#FF8C00] font-black">₹{totalFee.toLocaleString("en-IN")}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Box */}
                        <div className="p-6 bg-[#F0FAF9]/60 border border-[#00A896]/20 rounded-2xl space-y-4 text-center">
                          <div className="space-y-1">
                            <h3 className="font-display text-sm font-bold text-[#004B57] uppercase tracking-wider">
                              Pay Registration Fee
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium max-w-sm mx-auto">
                              Pay ₹{totalFee.toLocaleString("en-IN")} using UPI (GPay, PhonePe, Paytm), Cards, or Net Banking.
                            </p>
                          </div>

                          <RazorpayCheckout
                            amount={totalFee}
                            title="ARISE 2026 CME Registration"
                            description={`${isStudentRole ? "Student" : "Doctor"} Registration Fee - ${fullName}`}
                            prefillName={fullName}
                            prefillEmail={emailId}
                            prefillPhone={mobileNumber}
                            eventType="ARISE_2026"
                            registrationCode={regCode}
                            notes={{
                              role,
                              category,
                              includeWorkshop: String(includeWorkshop),
                              fullName,
                              emailId,
                              mobileNumber,
                              institution,
                              department,
                              city,
                              source,
                              designation,
                              qualification,
                              foodPreference: "Vegetarian",
                              iapCreditPoints: String(iapCreditPoints),
                              iapMembershipNumber,
                            }}
                            onSuccess={handleRazorpaySuccess}
                            onFailure={(errMsg) => setErrors({ transactionId: errMsg })}
                            buttonText={`Pay ₹${totalFee.toLocaleString("en-IN")} & Confirm Registration`}
                            buttonClassName="w-full bg-[#00A896] hover:bg-[#008B7A] text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-teal/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wizard navigation bar */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="btn-primary btn-outline-navy"
                      style={{ padding: "10px 20px", fontSize: 13, borderRadius: 10 }}
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary btn-teal"
                      style={{ padding: "10px 24px", fontSize: 13, borderRadius: 10 }}
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <div className="text-[11px] text-slate-400 font-semibold italic">
                      Click the Pay button above to complete registration
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
