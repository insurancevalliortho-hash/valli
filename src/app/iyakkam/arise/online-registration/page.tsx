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
  Calendar,
  Check,
  Briefcase,
  Layers,
  Compass,
  Video,
  ExternalLink,
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import RazorpayCheckout from "../../../../components/RazorpayCheckout";
import { resolveClientSource } from "../../../../lib/attribution";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

// ─── Placeholder – replace with your actual Google Meet link ───────────────
const GOOGLE_MEET_LINK = "https://meet.google.com/placeholder-link";
// ────────────────────────────────────────────────────────────────────────────

const SELECT_ARROW =
  "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10";

export default function AriseOnlineRegisterPage() {
  const lenis = useLenis();

  const [step, setStep] = useState(1);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState("Student / Intern");
  const [qualification, setQualification] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [iapCreditPoints, setIapCreditPoints] = useState(false);
  const [iapMembershipNumber, setIapMembershipNumber] = useState("");
  const [source, setSource] = useState("Direct");
  const [transactionId, setTransactionId] = useState("");

  // UI states
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const detectedSource = resolveClientSource("arise_source");
    setSource(detectedSource);

    fetch("/api/arise/register")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.nextRegistrationCode) {
          setRegCode(`ONLINE-${data.nextRegistrationCode}`);
        } else {
          setRegCode("ONLINE-ARISE26-0001");
        }
      })
      .catch(() => setRegCode("ONLINE-ARISE26-0001"));
  }, []);

  // Online-only pricing: ₹500 student / ₹1,000 professional
  const isStudent = designation === "Student / Intern";
  const totalFee = isStudent ? 500 : 1000;

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
    if (isSuccess) triggerConfetti();
  }, [isSuccess]);

  // Step validation
  const validateStep = () => {
    const stepErrors: Record<string, string> = {};
    if (!fullName.trim()) stepErrors.fullName = "Full name is required";
    if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId))
      stepErrors.emailId = "A valid email address is required";
    if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim()))
      stepErrors.mobileNumber = "A valid 10-digit mobile number is required";
    if (!qualification.trim()) stepErrors.qualification = "Qualification is required";
    if (!institution.trim()) stepErrors.institution = "Institution / Hospital name is required";
    if (!city.trim()) stepErrors.city = "City / Location is required";
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(2);
      lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep(1);
    lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  };

  const handleRazorpaySuccess = async (details: {
    paymentId: string;
    orderId: string;
    signature: string;
  }) => {
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
          category: "Online Conference Pass",
          includeWorkshop: false,
          institution,
          department,
          city,
          source,
          transactionId: details.paymentId,
          paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
          designation,
          qualification,
          iapCreditPoints,
          iapMembershipNumber: iapCreditPoints ? iapMembershipNumber : "",
          isVerified: true,
          isOnlineDelegate: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.registrationCode) setRegCode(data.registrationCode);
        setIsSuccess(true);
        lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
      } else {
        throw new Error(data.error || "Failed to save registration");
      }
    } catch (err: any) {
      console.error(err);
      alert(
        (err?.message || "Error submitting registration") +
          ". Payment ID: " +
          details.paymentId
      );
    }
  };

  const inputCls = (field: string) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500/10"
        : "border-[#E2E8F0] hover:border-slate-300"
    }`;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAFAF9] text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots text-left">
        <div className="relative z-10 max-w-3xl mx-auto">

          {/* ── Header ── */}
          <div className="mb-8">
            <Link
              href="/iyakkam/arise"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#00A896] font-semibold text-xs transition-colors group mb-3 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to ARISE 2026 Home
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 border border-violet-200">
                  <Video className="w-3 h-3" /> Online CME · Google Meet
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] tracking-tight uppercase">
                  ARISE 2026 — Online Registration
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Attend the full conference live via Google Meet from anywhere in India.
                </p>
              </div>

              {!isSuccess && (
                <div className="bg-white border border-[#E2E8F0] px-4 py-2.5 rounded-2xl shadow-sm text-right shrink-0">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Registration Code
                  </span>
                  <span className="font-mono text-sm font-black text-[#FF8C00] tracking-wider">
                    {regCode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Online perks banner ── */}
          {!isSuccess && (
            <div className="mb-6 bg-violet-50 border border-violet-200 rounded-2xl p-4 flex flex-wrap gap-4 text-xs">
              {[
                { icon: Video, label: "Live Google Meet session" },
                { icon: CheckCircle2, label: "Digital E-Certificate" },
                { icon: Calendar, label: "14–15 February 2026" },
                { icon: CheckCircle2, label: "IAP Credit Points (if applicable)" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-violet-700 font-semibold">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          )}

          {/* ── Success Screen ── */}
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
                className="w-20 h-20 bg-violet-50 text-violet-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-violet-200"
              >
                <Video size={38} />
              </motion.div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  Online Registration Confirmed 🎉
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] uppercase">
                  You&apos;re In, {fullName.split(" ")[0]}!
                </h2>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Your ARISE 2026 Online Pass is confirmed. A confirmation receipt and your
                  Google Meet joining details will be sent to{" "}
                  <span className="font-bold text-[#004B57]">{emailId}</span>.
                </p>
              </div>

              {/* Digital Pass */}
              <div className="bg-[#F5F3FF] border border-violet-200 p-6 rounded-2xl max-w-md mx-auto space-y-4 text-left relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-start border-b border-violet-200 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      ONLINE DELEGATE PASS CODE
                    </span>
                    <span className="font-mono text-2xl font-black text-[#FF8C00] tracking-wider select-all">
                      {regCode}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-white border border-violet-300 text-violet-700 rounded-lg text-xs font-mono font-bold uppercase shadow-sm">
                    Online CME
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">
                      Delegate Name
                    </span>
                    <span className="text-[#004B57] font-bold text-sm block truncate">
                      {fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">
                      Designation
                    </span>
                    <span className="text-slate-800 font-semibold text-xs block truncate">
                      {designation}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">
                      Institution
                    </span>
                    <span className="text-slate-800 font-medium block truncate">
                      {institution || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">
                      Payment Status
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} /> Paid (₹{totalFee.toLocaleString("en-IN")})
                    </span>
                  </div>
                </div>

                {/* Google Meet Join Box */}
                <div className="border-t border-violet-200 pt-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase text-violet-500 tracking-widest">
                    Your Google Meet Link
                  </p>
                  <a
                    href={GOOGLE_MEET_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md w-full justify-center"
                  >
                    <Video className="w-4 h-4" />
                    Join Google Meet Session
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <p className="text-[10px] text-slate-400 text-center">
                    This link will be active on the day of the event (14–15 Feb 2026).
                    Please save your registration code above.
                  </p>
                </div>

                {transactionId && (
                  <div className="border-t border-dashed border-violet-200 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Txn: {transactionId.slice(0, 18)}...</span>
                    <span>Mode: Online · Google Meet</span>
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
            /* ── Wizard Form ── */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-xl overflow-hidden"
            >
              {/* Step header */}
              <div className="bg-slate-50 border-b border-[#E2E8F0] p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                  {[
                    { num: 1, title: "1. Your Details" },
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
                      <span className="text-xs uppercase tracking-wider truncate">
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form content */}
              <div className="p-6 sm:p-10">
                <AnimatePresence mode="wait">

                  {/* ── Step 1: Delegate Details ── */}
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
                          Online Delegate Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Enter your details accurately — they will appear on your digital e-certificate.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Full Name */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-teal" /> Full Name (as to appear on Certificate) *
                          </label>
                          <input
                            id="online-reg-fullname"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Dr. Ramesh Kumar"
                            className={inputCls("fullName")}
                          />
                          {errors.fullName && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.fullName}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-teal" /> Email Address *
                          </label>
                          <input
                            id="online-reg-email"
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="e.g. ramesh@hospital.com"
                            className={inputCls("emailId")}
                          />
                          {errors.emailId && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.emailId}</p>
                          )}
                        </div>

                        {/* Mobile */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-teal" /> Mobile Number *
                          </label>
                          <input
                            id="online-reg-mobile"
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit mobile number"
                            className={inputCls("mobileNumber")}
                          />
                          {errors.mobileNumber && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.mobileNumber}</p>
                          )}
                        </div>

                        {/* Designation */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-teal" /> Designation *
                          </label>
                          <select
                            id="online-reg-designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className={`w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none ${SELECT_ARROW}`}
                          >
                            <option value="Student / Intern">Student / Intern</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Physiotherapist / Professional">Physiotherapist / Professional</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Category (display only — online is fixed) */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-teal" /> Registration Category
                          </label>
                          <div className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-violet-700 flex items-center gap-2">
                            <Video className="w-3.5 h-3.5" />
                            Online Conference Pass — ₹{totalFee.toLocaleString("en-IN")}
                          </div>
                          <p className="text-[10px] text-slate-400">
                            ₹500 for Students · ₹1,000 for Professionals
                          </p>
                        </div>

                        {/* Qualification */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-teal" /> Qualification *
                          </label>
                          <input
                            id="online-reg-qualification"
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder="e.g. BPT, MPT, MBBS, MS"
                            className={inputCls("qualification")}
                          />
                          {errors.qualification && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.qualification}</p>
                          )}
                        </div>

                        {/* Institution */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-teal" /> Institution / Hospital / College *
                          </label>
                          <input
                            id="online-reg-institution"
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="Enter your college or hospital name"
                            className={inputCls("institution")}
                          />
                          {errors.institution && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.institution}</p>
                          )}
                        </div>

                        {/* Department */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-teal" /> Department
                          </label>
                          <input
                            id="online-reg-department"
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Physiotherapy"
                            className="w-full bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal"
                          />
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-teal" /> City / Location *
                          </label>
                          <input
                            id="online-reg-city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Bangalore, Chennai"
                            className={inputCls("city")}
                          />
                          {errors.city && (
                            <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>
                          )}
                        </div>

                        {/* IAP Credit Points */}
                        <div className="md:col-span-2 space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              id="online-reg-iap"
                              type="checkbox"
                              checked={iapCreditPoints}
                              onChange={(e) => setIapCreditPoints(e.target.checked)}
                              className="w-4 h-4 accent-teal cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-slate-700">
                              I want to claim IAP Credit Points (Membership number required)
                            </span>
                          </label>
                          {iapCreditPoints && (
                            <motion.input
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              id="online-reg-iap-number"
                              type="text"
                              value={iapMembershipNumber}
                              onChange={(e) => setIapMembershipNumber(e.target.value)}
                              placeholder="IAP Membership Number"
                              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2: Review & Pay ── */}
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
                          Review your registration and complete the online payment.
                        </p>
                      </div>

                      {/* Summary */}
                      <div className="bg-slate-50 border border-[#E2E8F0] p-5 rounded-2xl space-y-3">
                        {[
                          ["Registrant", fullName],
                          ["Email", emailId],
                          ["Designation", designation],
                          ["Institution", institution],
                          ["City", city],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">{label}:</span>
                            <span className="font-bold text-[#004B57] text-right max-w-[60%] truncate">
                              {value}
                            </span>
                          </div>
                        ))}

                        {/* Online badge */}
                        <div className="flex justify-between items-center text-xs bg-violet-50 p-2 rounded-xl border border-violet-200">
                          <span className="text-violet-700 font-bold flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5" /> Online Conference Pass (Google Meet)
                          </span>
                          <span className="font-bold text-violet-700">
                            ₹{totalFee.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                          <span className="block text-[10px] font-bold text-[#004B57] uppercase tracking-wider">
                            Amount to Pay:
                          </span>
                          <span className="text-[#FF8C00] font-black text-lg">
                            ₹{totalFee.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="p-6 bg-violet-50 border border-violet-200 rounded-2xl space-y-4 text-center">
                        <div className="space-y-1">
                          <h3 className="font-display text-sm font-bold text-violet-800 uppercase tracking-wider">
                            Complete Online Payment
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium max-w-sm mx-auto">
                            Pay ₹{totalFee.toLocaleString("en-IN")} via UPI, Cards, or Net Banking.
                            Your Google Meet link will be shared upon confirmation.
                          </p>
                        </div>

                        <RazorpayCheckout
                          amount={totalFee}
                          title="ARISE 2026 Online CME Registration"
                          description={`Online Delegate Pass – ${fullName}`}
                          prefillName={fullName}
                          prefillEmail={emailId}
                          prefillPhone={mobileNumber}
                          eventType="ARISE_2026"
                          registrationCode={regCode}
                          notes={{
                            category: "Online Conference Pass",
                            includeWorkshop: "false",
                            fullName,
                            emailId,
                            mobileNumber,
                            institution,
                            department,
                            city,
                            source,
                            designation,
                            qualification,
                            iapCreditPoints: String(iapCreditPoints),
                            iapMembershipNumber,
                            isBulk: "false",
                            isOnlineDelegate: "true",
                          }}
                          onSuccess={handleRazorpaySuccess}
                          onFailure={(errMsg) => setErrors({ transactionId: errMsg })}
                          buttonText={`Pay ₹${totalFee.toLocaleString("en-IN")} & Get Online Pass`}
                          buttonClassName="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wizard nav */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="btn-primary btn-outline-navy"
                      style={{ padding: "10px 20px", fontSize: 13, borderRadius: 10 }}
                    >
                      ← Back
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
                      Continue →
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
