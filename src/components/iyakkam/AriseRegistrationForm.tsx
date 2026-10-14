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
  ArrowRightLeft,
  Users
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

export interface BulkPerson {
  fullName: string;
  emailId: string;
  mobileNumber: string;
  qualification: string;
  institution: string;
  department: string;
  city: string;
}

const initialBulkPersons: BulkPerson[] = [
  { fullName: "", emailId: "", mobileNumber: "", qualification: "Student", institution: "", department: "", city: "" },
  { fullName: "", emailId: "", mobileNumber: "", qualification: "Student", institution: "", department: "", city: "" },
  { fullName: "", emailId: "", mobileNumber: "", qualification: "Student", institution: "", department: "", city: "" },
  { fullName: "", emailId: "", mobileNumber: "", qualification: "Student", institution: "", department: "", city: "" },
  { fullName: "", emailId: "", mobileNumber: "", qualification: "Student", institution: "", department: "", city: "" },
];

export default function AriseRegistrationForm({
  role,
  basePath = "/iyakkam/arise/register",
}: AriseRegistrationFormProps) {
  const lenis = useLenis();

  const isStudentRole = role === "student";

  // Step state (1: Details, 2: Confirm & Pay)
  const [step, setStep] = useState(1);

  // Form fields for single delegate
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState(
    isStudentRole ? "Student" : "Doctor / Physician"
  );
  const [qualification, setQualification] = useState("");
  const [category, setCategory] = useState(
    isStudentRole ? "Conference + Workshop (1000)" : "Conference"
  );
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");

  // Bulk delegates state (for 5 persons)
  const [bulkPersons, setBulkPersons] = useState<BulkPerson[]>(initialBulkPersons);
  const [sameCollegeForAll, setSameCollegeForAll] = useState(true);
  const [confirmedDelegates, setConfirmedDelegates] = useState<Array<{ name: string; code: string; email: string }>>([]);

  const [iapCreditPoints, setIapCreditPoints] = useState(false);
  const [iapMembershipNumber, setIapMembershipNumber] = useState("");
  const [source, setSource] = useState("Direct");
  const [transactionId, setTransactionId] = useState("");

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isBulk = isStudentRole && (category.includes("Bulk") || category.includes("5 Persons"));

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
      if (category.includes("Bulk") || category.includes("5 Persons")) {
        return 2500;
      }
      return 1000;
    }

    // Doctor role fee calculation
    if (category === "Conference with Workshop") {
      return 2500;
    }
    return 2000; // Conference Single
  };

  const totalFee = calculateTotalFee();
  const includeWorkshop = isStudentRole ? true : (category === "Conference with Workshop" || category === "Workshop");

  // Effective delegates for bulk registration with inherited college/city if same
  const getEffectiveBulkPersons = () => {
    return bulkPersons.map((p, idx) => {
      const effInst = sameCollegeForAll && idx > 0
        ? (p.institution.trim() || bulkPersons[0].institution.trim() || institution.trim())
        : (p.institution.trim() || institution.trim());
      const effCity = sameCollegeForAll && idx > 0
        ? (p.city.trim() || bulkPersons[0].city.trim() || city.trim())
        : (p.city.trim() || city.trim());
      const effDept = sameCollegeForAll && idx > 0
        ? (p.department.trim() || bulkPersons[0].department.trim() || department.trim())
        : (p.department.trim() || department.trim());
      const effQual = p.qualification.trim() || bulkPersons[0].qualification.trim() || qualification.trim() || "Student";
      return {
        fullName: p.fullName.trim(),
        emailId: p.emailId.trim(),
        mobileNumber: p.mobileNumber.trim(),
        institution: effInst,
        city: effCity,
        department: effDept,
        qualification: effQual,
      };
    });
  };

  const updateBulkPerson = (index: number, field: keyof BulkPerson, value: string) => {
    setBulkPersons((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });

    if (index === 0) {
      if (field === "fullName") setFullName(value);
      if (field === "emailId") setEmailId(value);
      if (field === "mobileNumber") setMobileNumber(value);
      if (field === "institution") setInstitution(value);
      if (field === "city") setCity(value);
      if (field === "qualification") setQualification(value);
      if (field === "department") setDepartment(value);
    }
  };

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
      if (!category.trim()) stepErrors.category = "Registration category is required";

      if (isBulk) {
        const effective = getEffectiveBulkPersons();
        effective.forEach((p, idx) => {
          if (!p.fullName.trim()) {
            stepErrors[`bulk_${idx}_fullName`] = `Person ${idx + 1}: Full Name is required`;
          }
          if (!p.emailId.trim() || !/\S+@\S+\.\S+/.test(p.emailId)) {
            stepErrors[`bulk_${idx}_emailId`] = `Person ${idx + 1}: Valid email address is required`;
          }
          if (!p.mobileNumber.trim() || !/^\d{10}$/.test(p.mobileNumber.trim())) {
            stepErrors[`bulk_${idx}_mobileNumber`] = `Person ${idx + 1}: 10-digit mobile number is required`;
          }
          if (!p.qualification.trim()) {
            stepErrors[`bulk_${idx}_qualification`] = `Person ${idx + 1}: Qualification is required`;
          }
          if (!p.institution.trim()) {
            stepErrors[`bulk_${idx}_institution`] = `Person ${idx + 1}: College / Institution name is required`;
          }
          if (!p.city.trim()) {
            stepErrors[`bulk_${idx}_city`] = `Person ${idx + 1}: City / Location is required`;
          }
        });
      } else {
        if (!fullName.trim()) stepErrors.fullName = "Full name is required";
        if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId)) {
          stepErrors.emailId = "A valid email ID is required";
        }
        if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim())) {
          stepErrors.mobileNumber = "A valid 10-digit mobile number is required";
        }
        if (!designation.trim()) stepErrors.designation = "Designation is required";
        if (!qualification.trim()) stepErrors.qualification = "Qualification is required";
        if (!institution.trim()) stepErrors.institution = "Institution/Hospital/College name is required";
        if (!city.trim()) stepErrors.city = "City/Location is required";
      }
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
      const effectiveDelegates = isBulk ? getEffectiveBulkPersons() : [];
      const payload = isBulk
        ? {
            isBulk: true,
            registrationCode: regCode,
            transactionId: details.paymentId,
            paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
            category,
            source,
            delegates: effectiveDelegates.map((d, idx) => ({
              fullName: d.fullName,
              emailId: d.emailId,
              mobileNumber: d.mobileNumber,
              category,
              includeWorkshop: true,
              institution: d.institution || institution,
              department: d.department || department,
              city: d.city || city,
              designation: "Student",
              qualification: d.qualification || "Student",
              foodPreference: "Vegetarian",
              iapCreditPoints: idx === 0 ? iapCreditPoints : false,
              iapMembershipNumber: idx === 0 && iapCreditPoints ? iapMembershipNumber : "",
            })),
            fullName: effectiveDelegates[0].fullName,
            emailId: effectiveDelegates[0].emailId,
            mobileNumber: effectiveDelegates[0].mobileNumber,
            institution: effectiveDelegates[0].institution || institution,
            city: effectiveDelegates[0].city || city,
            designation: "Student",
            qualification: effectiveDelegates[0].qualification,
            includeWorkshop: true,
            isVerified: true,
          }
        : {
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
          };

      const res = await fetch("/api/arise/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.registrationCode) {
          setRegCode(data.registrationCode);
        }
        if (data.delegates && Array.isArray(data.delegates)) {
          setConfirmedDelegates(data.delegates);
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
                      ? "Student Pricing: ₹1,000 Single (Conf + Workshop) / ₹2,500 Bulk for 5 (₹500 each)"
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

          {/* Success Screen */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="bg-white border border-slate-200/90 rounded-[2.5rem] shadow-xl p-6 sm:p-10 text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-200"
              >
                <CheckCircle2 size={36} />
              </motion.div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  {isBulk ? "Bulk Registration Confirmed 🎉" : "Registration Confirmed 🎉"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] uppercase">
                  Welcome to ARISE 2026!
                </h2>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {isBulk ? (
                    <>
                      Thank you, <span className="font-bold text-[#004B57]">{fullName}</span>! All 5 student delegates have been successfully registered. Individual delegate pass tickets and receipts have been sent to each registered email address.
                    </>
                  ) : (
                    <>
                      Thank you, <span className="font-bold text-[#004B57]">{fullName}</span>! Your CME Registration has been confirmed. A confirmation receipt and conference pass details have been sent to <span className="font-bold text-[#004B57]">{emailId}</span>.
                    </>
                  )}
                </p>
              </div>

              {isBulk ? (
                /* Bulk 5 Passes Display */
                <div className="max-w-xl mx-auto space-y-3 text-left">
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      CONFIRMED 5 DELEGATE PASSES
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Conference + Workshop
                    </span>
                  </div>

                  <div className="bg-[#F0FAF9]/60 border border-[#00A896]/20 rounded-2xl p-4 divide-y divide-[#00A896]/10 shadow-sm">
                    {(confirmedDelegates.length > 0
                      ? confirmedDelegates
                      : getEffectiveBulkPersons().map((p, i) => ({
                          name: p.fullName,
                          code: `ARISE26-${String(parseInt(regCode.replace(/\D/g, "") || "1") + i).padStart(4, "0")}`,
                          email: p.emailId,
                        }))
                    ).map((del, i) => (
                      <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {i + 1}
                          </span>
                          <div className="min-w-0">
                            <span className="font-bold text-[#004B57] block truncate">{del.name}</span>
                            <span className="text-[11px] text-slate-500 block truncate">{del.email}</span>
                          </div>
                        </div>
                        <span className="font-mono font-black text-[#FF8C00] bg-white border border-[#FF8C00]/30 px-2.5 py-1 rounded-lg text-xs tracking-wider shrink-0 select-all">
                          {del.code}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border border-slate-200 p-4 rounded-xl text-xs flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Payment Status</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Verified Paid (₹2,500 Total)
                      </span>
                    </div>
                    {transactionId && (
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] uppercase font-mono block">Transaction ID</span>
                        <span className="font-mono text-slate-700 text-xs font-semibold select-all">{transactionId}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Single Digital Boarding Pass Ticket */
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
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
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
              )}

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
                    { num: 1, title: isBulk ? "1. Enter 5 Persons Details" : "1. Delegate Details" },
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
                      {/* Registration Category Selector - Prominently at Top */}
                      <div className="bg-[#F0FAF9] border-2 border-[#00A896]/30 p-5 rounded-2xl space-y-3 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-[#004B57] flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#00A896]" /> Registration Category *
                          </label>
                          <span className="text-xs font-extrabold text-[#FF8C00] bg-white border border-[#FF8C00]/30 px-3 py-1 rounded-full self-start sm:self-auto shadow-xs">
                            Amount: ₹{totalFee.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="relative">
                          <select
                            value={category}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCategory(val);
                              // Sync primary person if switching
                              if (val.includes("Bulk") && fullName && !bulkPersons[0].fullName) {
                                setBulkPersons((prev) => {
                                  const next = [...prev];
                                  next[0] = {
                                    ...next[0],
                                    fullName,
                                    emailId,
                                    mobileNumber,
                                    qualification: qualification || "Student",
                                    institution,
                                    city,
                                    department,
                                  };
                                  return next;
                                });
                              }
                            }}
                            className="w-full bg-white border border-[#00A896]/40 hover:border-[#00A896] rounded-xl px-4 py-3.5 text-xs font-bold text-slate-800 transition-all duration-200 focus:outline-none focus:border-[#00A896] focus:ring-4 focus:ring-[#00A896]/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300A896%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10 shadow-xs"
                          >
                            {isStudentRole ? (
                              <>
                                <option value="Conference + Workshop (1000)">
                                  Conference + Workshop (1000)
                                </option>
                                <option value="Bulk Registration 5 Persons (500 each)">
                                  Bulk Registration 5 Persons (500 each)
                                </option>
                              </>
                            ) : (
                              <>
                                <option value="Conference">Conference Single (₹2,000)</option>
                                <option value="Conference with Workshop">Conference + Workshop (₹2,500)</option>
                              </>
                            )}
                          </select>
                        </div>

                        {isStudentRole && (
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            {isBulk ? (
                              <span className="text-amber-800 font-semibold bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
                                👥 Bulk Offer: 5 Persons details required • ₹500 each (Total ₹2,500)
                              </span>
                            ) : (
                              <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                                🎓 Student Single: Conference + Workshop included (₹1,000)
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bulk Registration: 5 Persons Details Form */}
                      {isBulk ? (
                        <div className="space-y-6">
                          {/* Banner & Global Options */}
                          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                                <Users className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-[#004B57] uppercase tracking-wide">
                                  Bulk Registration for 5 Delegates
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                  Please fill details for each of the 5 delegates below.
                                </p>
                              </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors self-start sm:self-auto">
                              <input
                                type="checkbox"
                                checked={sameCollegeForAll}
                                onChange={(e) => setSameCollegeForAll(e.target.checked)}
                                className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896]"
                              />
                              <span className="text-[11px] font-semibold text-slate-700">
                                Same College & City for all 5
                              </span>
                            </label>
                          </div>

                          {/* 5 Persons Cards */}
                          {[0, 1, 2, 3, 4].map((idx) => {
                            const isLeadPerson = idx === 0;
                            const person = bulkPersons[idx];
                            const hasErrors = Object.keys(errors).some((k) => k.startsWith(`bulk_${idx}_`));

                            return (
                              <div
                                key={idx}
                                className={`bg-white border rounded-2xl p-5 sm:p-6 space-y-4 transition-all shadow-sm ${
                                  hasErrors
                                    ? "border-red-400 bg-red-50/20"
                                    : isLeadPerson
                                    ? "border-[#00A896]/40 shadow-md"
                                    : "border-slate-200"
                                }`}
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shadow-xs ${
                                        isLeadPerson
                                          ? "bg-[#004B57] text-white"
                                          : "bg-amber-100 text-amber-800"
                                      }`}
                                    >
                                      {idx + 1}
                                    </span>
                                    <h4 className="font-display text-sm font-bold text-[#004B57] uppercase tracking-wide">
                                      Person {idx + 1} {isLeadPerson ? "— Primary Contact / Lead Delegate" : "Details"}
                                    </h4>
                                  </div>
                                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                    Delegate #{idx + 1} • ₹500
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Full Name */}
                                  <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                      <User className="w-3.5 h-3.5 text-teal" /> Full Name (as to appear on Certificate) *
                                    </label>
                                    <input
                                      type="text"
                                      value={person.fullName}
                                      onChange={(e) => updateBulkPerson(idx, "fullName", e.target.value)}
                                      placeholder={`e.g. Delegate ${idx + 1} Full Name`}
                                      className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                        errors[`bulk_${idx}_fullName`]
                                          ? "border-red-500 focus:ring-red-500/10"
                                          : "border-[#E2E8F0] hover:border-slate-350"
                                      }`}
                                    />
                                    {errors[`bulk_${idx}_fullName`] && (
                                      <p className="text-[10px] text-red-500 font-semibold">{errors[`bulk_${idx}_fullName`]}</p>
                                    )}
                                  </div>

                                  {/* Email ID */}
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                      <Mail className="w-3.5 h-3.5 text-teal" /> Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      value={person.emailId}
                                      onChange={(e) => updateBulkPerson(idx, "emailId", e.target.value)}
                                      placeholder="e.g. delegate@institution.edu"
                                      className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                        errors[`bulk_${idx}_emailId`]
                                          ? "border-red-500 focus:ring-red-500/10"
                                          : "border-[#E2E8F0] hover:border-slate-350"
                                      }`}
                                    />
                                    {errors[`bulk_${idx}_emailId`] && (
                                      <p className="text-[10px] text-red-500 font-semibold">{errors[`bulk_${idx}_emailId`]}</p>
                                    )}
                                  </div>

                                  {/* Mobile Number */}
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                      <Phone className="w-3.5 h-3.5 text-teal" /> Mobile Number *
                                    </label>
                                    <input
                                      type="tel"
                                      maxLength={10}
                                      value={person.mobileNumber}
                                      onChange={(e) => updateBulkPerson(idx, "mobileNumber", e.target.value.replace(/\D/g, ""))}
                                      placeholder="10-digit mobile number"
                                      className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                        errors[`bulk_${idx}_mobileNumber`]
                                          ? "border-red-500 focus:ring-red-500/10"
                                          : "border-[#E2E8F0] hover:border-slate-350"
                                      }`}
                                    />
                                    {errors[`bulk_${idx}_mobileNumber`] && (
                                      <p className="text-[10px] text-red-500 font-semibold">{errors[`bulk_${idx}_mobileNumber`]}</p>
                                    )}
                                  </div>

                                  {/* Qualification */}
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                      <FileText className="w-3.5 h-3.5 text-teal" /> Qualification *
                                    </label>
                                    <input
                                      type="text"
                                      value={person.qualification}
                                      onChange={(e) => updateBulkPerson(idx, "qualification", e.target.value)}
                                      placeholder="e.g. BPT Student, MBBS Intern, MPT Student"
                                      className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                        errors[`bulk_${idx}_qualification`]
                                          ? "border-red-500 focus:ring-red-500/10"
                                          : "border-[#E2E8F0] hover:border-slate-350"
                                      }`}
                                    />
                                    {errors[`bulk_${idx}_qualification`] && (
                                      <p className="text-[10px] text-red-500 font-semibold">{errors[`bulk_${idx}_qualification`]}</p>
                                    )}
                                  </div>

                                  {/* Department */}
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                      <Compass className="w-3.5 h-3.5 text-teal" /> Department
                                    </label>
                                    <input
                                      type="text"
                                      value={person.department}
                                      onChange={(e) => updateBulkPerson(idx, "department", e.target.value)}
                                      placeholder="e.g. Physiotherapy, Orthopaedics"
                                      className="w-full bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal"
                                    />
                                  </div>

                                  {/* College & City */}
                                  {(isLeadPerson || !sameCollegeForAll) ? (
                                    <>
                                      <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                          <Building className="w-3.5 h-3.5 text-teal" /> College / Institution *
                                        </label>
                                        <input
                                          type="text"
                                          value={person.institution}
                                          onChange={(e) => updateBulkPerson(idx, "institution", e.target.value)}
                                          placeholder="Enter college or university name"
                                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                            errors[`bulk_${idx}_institution`]
                                              ? "border-red-500 focus:ring-red-500/10"
                                              : "border-[#E2E8F0] hover:border-slate-350"
                                          }`}
                                        />
                                        {errors[`bulk_${idx}_institution`] && (
                                          <p className="text-[10px] text-red-500 font-semibold">{errors[`bulk_${idx}_institution`]}</p>
                                        )}
                                      </div>

                                      <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                          <MapPin className="w-3.5 h-3.5 text-teal" /> City / Location *
                                        </label>
                                        <input
                                          type="text"
                                          value={person.city}
                                          onChange={(e) => updateBulkPerson(idx, "city", e.target.value)}
                                          placeholder="e.g. Salem, Chennai, Bangalore"
                                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all focus:outline-none focus:border-teal ${
                                            errors[`bulk_${idx}_city`] ? "border-red-500" : "border-[#E2E8F0]"
                                          }`}
                                        />
                                        {errors[`bulk_${idx}_city`] && (
                                          <p className="text-[10px] text-red-500 font-semibold">{errors[`bulk_${idx}_city`]}</p>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="md:col-span-2 bg-slate-50 border border-slate-200/80 p-3 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                      <span className="flex items-center gap-2">
                                        <Building className="w-3.5 h-3.5 text-slate-400" />
                                        <span>
                                          College: <strong className="text-[#004B57]">{bulkPersons[0].institution || "Same as Person 1"}</strong>
                                          {bulkPersons[0].city ? `, ${bulkPersons[0].city}` : ""}
                                        </span>
                                      </span>
                                      <span className="text-[10px] font-semibold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                                        Synced from Person 1
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {/* IAP Credit Points (Optional) for Group / Lead */}
                          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={iapCreditPoints}
                                onChange={(e) => setIapCreditPoints(e.target.checked)}
                                className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896]"
                              />
                              <span className="text-xs font-semibold text-slate-700">
                                Request IAP Credit Points for this CME
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
                        </div>
                      ) : (
                        /* Single Delegate Personal Details Form */
                        <div className="space-y-6">
                          <div className="border-b border-slate-100 pb-3">
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
                                onChange={(e) => {
                                  setFullName(e.target.value);
                                  updateBulkPerson(0, "fullName", e.target.value);
                                }}
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
                                onChange={(e) => {
                                  setEmailId(e.target.value);
                                  updateBulkPerson(0, "emailId", e.target.value);
                                }}
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
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, "");
                                  setMobileNumber(val);
                                  updateBulkPerson(0, "mobileNumber", val);
                                }}
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

                            {/* Qualification */}
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-teal" /> Qualification *
                              </label>
                              <input
                                type="text"
                                value={qualification}
                                onChange={(e) => {
                                  setQualification(e.target.value);
                                  updateBulkPerson(0, "qualification", e.target.value);
                                }}
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
                                onChange={(e) => {
                                  setInstitution(e.target.value);
                                  updateBulkPerson(0, "institution", e.target.value);
                                }}
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
                                onChange={(e) => {
                                  setDepartment(e.target.value);
                                  updateBulkPerson(0, "department", e.target.value);
                                }}
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
                                onChange={(e) => {
                                  setCity(e.target.value);
                                  updateBulkPerson(0, "city", e.target.value);
                                }}
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
                        </div>
                      )}
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
                          Review & Complete Payment
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Review your registration details and complete payment via Razorpay.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Summary Box */}
                        {isBulk ? (
                          <div className="bg-slate-50 border border-[#E2E8F0] p-5 rounded-2xl space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                  Registration Category
                                </span>
                                <span className="font-bold text-[#004B57] text-sm">
                                  Bulk Registration (5 Persons)
                                </span>
                              </div>
                              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                                ₹500 × 5 Delegates
                              </span>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                5 Registered Delegates:
                              </span>
                              <div className="divide-y divide-slate-200 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                                {getEffectiveBulkPersons().map((p, i) => (
                                  <div key={i} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="w-5 h-5 rounded-md bg-[#00A896]/15 text-[#00A896] font-bold text-[10px] flex items-center justify-center shrink-0">
                                        {i + 1}
                                      </span>
                                      <div className="min-w-0">
                                        <span className="font-bold text-[#004B57] truncate">{p.fullName}</span>
                                        <span className="text-slate-400 text-[11px] ml-1.5">({p.qualification})</span>
                                      </div>
                                    </div>
                                    <div className="text-[11px] text-slate-500 sm:text-right pl-7 sm:pl-0 truncate">
                                      <span>{p.emailId}</span> • <span>{p.mobileNumber}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="text-xs text-slate-600 bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                              <span className="text-slate-500">College / Institution:</span>
                              <span className="font-bold text-[#004B57] truncate max-w-[280px]">
                                {bulkPersons[0].institution || institution || "Salem"}
                              </span>
                            </div>

                            <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                              <div>
                                <span className="block text-[10px] font-bold text-[#004B57] uppercase tracking-wider">
                                  Total Amount to Pay:
                                </span>
                                <span className="text-[10px] text-slate-400">All 5 delegates • Conference + Workshop</span>
                              </div>
                              <span className="text-[#FF8C00] font-black text-xl">
                                ₹2,500
                              </span>
                            </div>
                          </div>
                        ) : (
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
                        )}

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
                            description={
                              isBulk
                                ? "Bulk Student Registration (5 Persons - ₹2,500)"
                                : `${isStudentRole ? "Student" : "Doctor"} Registration - ${fullName}`
                            }
                            prefillName={fullName || (bulkPersons[0] && bulkPersons[0].fullName)}
                            prefillEmail={emailId || (bulkPersons[0] && bulkPersons[0].emailId)}
                            prefillPhone={mobileNumber || (bulkPersons[0] && bulkPersons[0].mobileNumber)}
                            eventType="ARISE_2026"
                            registrationCode={regCode}
                            notes={{
                              role,
                              category,
                              isBulk: String(isBulk),
                              delegatesCount: isBulk ? "5" : "1",
                              includeWorkshop: String(includeWorkshop),
                              fullName: fullName || (bulkPersons[0] && bulkPersons[0].fullName),
                              emailId: emailId || (bulkPersons[0] && bulkPersons[0].emailId),
                              mobileNumber: mobileNumber || (bulkPersons[0] && bulkPersons[0].mobileNumber),
                              institution: institution || (bulkPersons[0] && bulkPersons[0].institution),
                              city: city || (bulkPersons[0] && bulkPersons[0].city),
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
                      Continue to Payment <ChevronRight size={16} />
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
