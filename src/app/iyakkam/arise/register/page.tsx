"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Phone,
  Mail,
  Building,
  Users,
  FileText,
  User,
  MapPin,
  HelpCircle,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Lock,
  Upload,
  X,
  Download,
  Zap,
  Briefcase,
  Layers,
  Compass,
  Sparkles,
  FileSpreadsheet
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import RazorpayCheckout from "../../../../components/RazorpayCheckout";
import { resolveClientSource } from "../../../../lib/attribution";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

interface BulkStudent {
  fullName: string;
  emailId: string;
  mobileNumber: string;
  qualification: string;
  institution: string;
  department: string;
  city: string;
  foodPreference: string;
  iapCreditPoints: boolean;
  iapMembershipNumber: string;
}

export default function AriseRegisterPage() {
  const lenis = useLenis();

  // Current step state (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Lead / Coordinator Form fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState("Student / Intern");
  const [qualification, setQualification] = useState("");
  const [category, setCategory] = useState("Conference"); // "Conference" | "Conference with Workshop" | "Workshop" | "Bulk Student Registration (20 Students - 50% OFF)"
  const [bonafideCertificate, setBonafideCertificate] = useState<string | null>(null);
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [foodPreference, setFoodPreference] = useState("Vegetarian");
  const [iapCreditPoints, setIapCreditPoints] = useState(false);
  const [iapMembershipNumber, setIapMembershipNumber] = useState("");
  const [source, setSource] = useState("Direct");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "upi_qr">("online");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // Bulk 20 Students State
  const [bulkStudents, setBulkStudents] = useState<BulkStudent[]>(() =>
    Array.from({ length: 20 }, () => ({
      fullName: "",
      emailId: "",
      mobileNumber: "",
      qualification: "Undergraduate / Student",
      institution: "",
      department: "",
      city: "",
      foodPreference: "Vegetarian",
      iapCreditPoints: false,
      iapMembershipNumber: "",
    }))
  );

  // Active accordion index for bulk student cards
  const [activeStudentIndex, setActiveStudentIndex] = useState<number | null>(0);

  // UI status states
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
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

  const isBulk = category.includes("Bulk");

  // Compute total fee amount to pay
  const calculateTotalFee = () => {
    if (isBulk) {
      return 20000; // 20 Students @ ₹1000 each (₹20,000 Total)
    }
    const isStudent = designation === "Student / Intern";
    if (category === "Conference with Workshop") {
      return isStudent ? 1500 : 2500;
    }
    if (category === "Workshop") {
      return 500;
    }
    return isStudent ? 1000 : 2000;
  };

  const totalFee = calculateTotalFee();
  const includeWorkshop = category === "Conference with Workshop" || category === "Workshop";

  // Helper to update individual bulk student field
  const updateBulkStudent = (index: number, field: keyof BulkStudent, value: any) => {
    setBulkStudents((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  // Helper to sync coordinator college & city to all 20 bulk students
  const applyCoordinatorInfoToAll = () => {
    if (!institution && !city) {
      alert("Please fill in Institution and City in the Coordinator section first.");
      return;
    }
    setBulkStudents((prev) =>
      prev.map((s) => ({
        ...s,
        institution: institution || s.institution,
        city: city || s.city,
        department: department || s.department,
      }))
    );
  };

  // Auto-fill sample 20 students for testing/demo
  const autoFillSampleBulkRoster = () => {
    const inst = institution || "Valli Medical College";
    const cty = city || "Salem";
    setBulkStudents(
      Array.from({ length: 20 }, (_, i) => ({
        fullName: `Student ${i + 1} Delegate`,
        emailId: `student${i + 1}@vallicountry.edu`,
        mobileNumber: `9876543${(10 + i).toString().padStart(3, "0")}`,
        qualification: "Undergraduate Student",
        institution: inst,
        department: department || "Physiotherapy",
        city: cty,
        foodPreference: i % 2 === 0 ? "Vegetarian" : "Non-Vegetarian",
        iapCreditPoints: false,
        iapMembershipNumber: "",
      }))
    );
  };

  // CSV Bulk file import parser
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
      const parsed: BulkStudent[] = [];

      for (let i = 0; i < 20; i++) {
        const line = lines[i + 1] || lines[i]; // Skip header if present
        if (line) {
          const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
          parsed.push({
            fullName: parts[0] || `Student ${i + 1}`,
            emailId: parts[1] || `student${i + 1}@college.edu`,
            mobileNumber: parts[2] || `987654320${i}`,
            qualification: parts[3] || "Undergraduate Student",
            institution: parts[4] || institution || "Medical College",
            department: parts[5] || department || "",
            city: parts[6] || city || "Salem",
            foodPreference: parts[7] || "Vegetarian",
            iapCreditPoints: Boolean(parts[8]),
            iapMembershipNumber: parts[8] || "",
          });
        } else {
          parsed.push({
            fullName: `Student ${i + 1}`,
            emailId: `student${i + 1}@college.edu`,
            mobileNumber: `987654320${i}`,
            qualification: "Undergraduate Student",
            institution: institution || "Medical College",
            department: department || "",
            city: city || "Salem",
            foodPreference: "Vegetarian",
            iapCreditPoints: false,
            iapMembershipNumber: "",
          });
        }
      }
      setBulkStudents(parsed);
      alert("Successfully loaded 20 student roster records from CSV!");
    };
    reader.readAsText(file);
  };

  const compressImage = (file: File, maxWidth = 1000, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", quality));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  const handleBonafideChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setBonafideCertificate(compressed);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => setBonafideCertificate(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClearBonafide = () => {
    setBonafideCertificate(null);
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
      if (!fullName.trim()) stepErrors.fullName = "Coordinator / Full name is required";
      if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId)) {
        stepErrors.emailId = "A valid email ID is required";
      }
      if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim())) {
        stepErrors.mobileNumber = "A valid 10-digit mobile number is required";
      }
      if (!designation.trim()) stepErrors.designation = "Designation is required";
      if (!category.trim()) stepErrors.category = "Registration category is required";
      if (!qualification.trim()) stepErrors.qualification = "Qualification is required";
      if (!institution.trim()) stepErrors.institution = "Institution/Hospital name is required";
      if (!city.trim()) stepErrors.city = "City/Location is required";

      // If Bulk category selected, validate all 20 students
      if (isBulk) {
        bulkStudents.forEach((st, idx) => {
          if (!st.fullName.trim()) {
            stepErrors[`student_${idx}_fullName`] = `Student #${idx + 1}: Name required`;
          }
          if (!st.emailId.trim()) {
            stepErrors[`student_${idx}_emailId`] = `Student #${idx + 1}: Email required`;
          }
          if (!st.mobileNumber.trim()) {
            stepErrors[`student_${idx}_mobileNumber`] = `Student #${idx + 1}: Mobile required`;
          }
        });
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
      if (isBulk) {
        // Register Lead Coordinator + 20 Bulk Students
        const bulkPayloads = bulkStudents.map((st, idx) => ({
          registrationCode: `ARISE26-BULK${(idx + 1).toString().padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: st.fullName,
          emailId: st.emailId,
          mobileNumber: st.mobileNumber,
          category: "Bulk Student Pass (50% OFF)",
          includeWorkshop: false,
          institution: st.institution || institution,
          department: st.department || department,
          city: st.city || city,
          source: "Bulk Group Booking",
          transactionId: `${details.paymentId}-S${(idx + 1).toString().padStart(2, "0")}`,
          paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
          designation: "Student / Intern",
          qualification: st.qualification || qualification,
          bonafideCertificate,
          foodPreference: st.foodPreference,
          iapCreditPoints: st.iapCreditPoints,
          iapMembershipNumber: st.iapMembershipNumber,
          isVerified: true,
        }));

        // Submit Lead Coordinator Record
        const leadRes = await fetch("/api/arise/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationCode: `${regCode}-LEAD`,
            fullName: `${fullName} (Coordinator)`,
            emailId,
            mobileNumber,
            category: "Bulk Student Registration (20 Students @ 50% OFF)",
            includeWorkshop: false,
            institution,
            department,
            city,
            source,
            transactionId: `${details.paymentId}-LEAD`,
            paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
            designation: "Student Coordinator",
            qualification,
            bonafideCertificate,
            foodPreference,
            iapCreditPoints,
            iapMembershipNumber,
            isVerified: true,
          }),
        });
        const leadData = await leadRes.json();
        if (leadRes.ok && leadData.success) {
          if (leadData.registrationCode) {
            setRegCode(leadData.registrationCode);
          }
        } else {
          throw new Error(leadData.error || "Failed to save coordinator registration");
        }

        // Submit All 20 Student Records
        for (const payload of bulkPayloads) {
          await fetch("/api/arise/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      } else {
        // Single Delegate Registration
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
            bonafideCertificate,
            foodPreference,
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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAFAF9] text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots text-left">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
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
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full inline-block mb-2 border border-[#00A896]/20">
                  National CME Conference Registration
                </span>
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
                  Thank you, <span className="font-bold text-[#004B57]">{fullName}</span>! Your {isBulk ? "20-Student Bulk Registration" : "CME Registration"} has been confirmed. A confirmation receipt and conference pass details have been sent to <span className="font-bold text-[#004B57]">{emailId}</span>.
                </p>
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="bg-[#F0FAF9] border border-[#00A896]/20 p-6 rounded-2xl max-w-md mx-auto space-y-4 text-left relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-start border-b border-[#00A896]/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">DELEGATE PASS CODE</span>
                    <span className="font-mono text-2xl font-black text-[#FF8C00] tracking-wider select-all">{regCode}</span>
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
                    <span className="text-slate-800 font-medium block truncate">{institution ? `${institution}, ${city}` : city || "Salem"}</span>
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
                    { num: 1, title: isBulk ? "1. Coordinator & 20 Students Roster" : "1. Delegate & CME Details" },
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
                        {isBulk ? "Lead Coordinator & Organization" : "Delegate Personal Details"}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isBulk ? "Enter primary contact info for receipt, confirmation & bulk passes." : "Please enter your delegate info accurately for your certificate & badge."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-teal" /> {isBulk ? "Lead Coordinator Full Name *" : "Full Name (as to appear on Certificate) *"}
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Ramesh Kumar"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.fullName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
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
                          placeholder="e.g. ramesh@hospital.com"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.emailId ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
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
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.mobileNumber ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
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
                            onChange={(e) => {
                              const val = e.target.value;
                              setDesignation(val);
                              if (val !== "Student / Intern" && category.toLowerCase().includes("bulk")) {
                                setCategory("Conference");
                              }
                            }}
                            className="w-full bg-white border border-[#E2E8F0] hover:border-slate-355 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                          >
                            <option value="Student / Intern">Student / Intern</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Physiotherapist / Professional">Physiotherapist / Professional</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Other">Other</option>
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
                            <option value="Conference">Conference Single (₹1,000 Student / ₹2,000 Prof)</option>
                            <option value="Conference with Workshop">Conference + Workshop (₹1,500 Student / ₹2,500 Prof)</option>
                            {designation === "Student / Intern" && (
                              <option value="Bulk Student Registration (20 Students - ₹20,000 Total)">
                                🎓 Bulk Student Pass (20 Students - ₹20,000 Total)
                              </option>
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
                          onChange={(e) => setQualification(e.target.value)}
                          placeholder="e.g. BPT, MPT, MBBS, MS"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.qualification ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
                        />
                        {errors.qualification && <p className="text-[10px] text-red-500 font-semibold">{errors.qualification}</p>}
                      </div>

                      {/* Institution / College */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-teal" /> Institution / Hospital / College *
                        </label>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="Enter your college or hospital name"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.institution ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
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
                          placeholder="e.g. Physiotherapy"
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
                          placeholder="e.g. Salem, Bangalore"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all focus:outline-none focus:border-teal ${errors.city ? "border-red-500" : "border-[#E2E8F0]"}`}
                        />
                        {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
                      </div>
                    </div>

                    {/* BULK 20 STUDENTS ROSTER SECTION */}
                    {isBulk && (
                      <div className="mt-8 space-y-6 bg-slate-50 border-2 border-emerald-500/30 p-6 sm:p-8 rounded-[2rem] animate-in fade-in duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-1 border border-emerald-200">
                              🎓 Bulk Student Package (20 Passes - ₹20,000 Total)
                            </span>
                            <h3 className="font-display text-lg font-black text-[#004B57] uppercase">
                              20 Student Roster Details
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Fill all 20 students manually below, auto-sync college details, or import from CSV.
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={applyCoordinatorInfoToAll}
                              className="bg-white hover:bg-slate-100 text-[#004B57] border border-slate-300 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Copy College/City to All
                            </button>

                            <button
                              type="button"
                              onClick={autoFillSampleBulkRoster}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                            >
                              <Zap className="w-3.5 h-3.5" /> Auto-Fill Demo 20
                            </button>

                            <label className="bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
                              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Import CSV
                              <input type="file" accept=".csv,.txt" onChange={handleCSVUpload} className="hidden" />
                            </label>
                          </div>
                        </div>

                        {/* 20 Accordion Student Cards */}
                        <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
                          {bulkStudents.map((st, idx) => {
                            const isOpen = activeStudentIndex === idx;
                            const isFilled = st.fullName && st.emailId && st.mobileNumber;

                            return (
                              <div
                                key={idx}
                                className={`bg-white border rounded-2xl transition-all overflow-hidden ${
                                  isOpen
                                    ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/10"
                                    : isFilled
                                    ? "border-emerald-200 bg-emerald-50/20"
                                    : "border-slate-200"
                                }`}
                              >
                                {/* Card Header */}
                                <div
                                  onClick={() => setActiveStudentIndex(isOpen ? null : idx)}
                                  className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/80 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                                        isFilled
                                          ? "bg-emerald-500 text-white"
                                          : "bg-slate-200 text-slate-700"
                                      }`}
                                    >
                                      #{idx + 1}
                                    </div>
                                    <div>
                                      <span className="font-bold text-xs text-slate-800 block">
                                        {st.fullName || `Student #${idx + 1}`}
                                      </span>
                                      <span className="text-[10px] text-slate-400 font-mono">
                                        {st.emailId || "Pending email"} | {st.mobileNumber || "Pending mobile"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {isFilled ? (
                                      <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                        Filled ✓
                                      </span>
                                    ) : (
                                      <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">
                                        Required
                                      </span>
                                    )}
                                    <ChevronRight
                                      className={`w-4 h-4 text-slate-400 transition-transform ${
                                        isOpen ? "rotate-90 text-emerald-600" : ""
                                      }`}
                                    />
                                  </div>
                                </div>

                                {/* Card Expanded Body */}
                                {isOpen && (
                                  <div className="p-4 pt-0 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 animate-in fade-in duration-200">
                                    <div>
                                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-1">
                                        Student Name *
                                      </label>
                                      <input
                                        type="text"
                                        value={st.fullName}
                                        onChange={(e) => updateBulkStudent(idx, "fullName", e.target.value)}
                                        placeholder="Full name"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-1">
                                        Student Email *
                                      </label>
                                      <input
                                        type="email"
                                        value={st.emailId}
                                        onChange={(e) => updateBulkStudent(idx, "emailId", e.target.value)}
                                        placeholder="email@college.edu"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-1">
                                        Mobile Number *
                                      </label>
                                      <input
                                        type="tel"
                                        maxLength={10}
                                        value={st.mobileNumber}
                                        onChange={(e) => updateBulkStudent(idx, "mobileNumber", e.target.value.replace(/\D/g, ""))}
                                        placeholder="10-digit mobile"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-1">
                                        College / Institution *
                                      </label>
                                      <input
                                        type="text"
                                        value={st.institution}
                                        onChange={(e) => updateBulkStudent(idx, "institution", e.target.value)}
                                        placeholder="College name"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-1">
                                        City *
                                      </label>
                                      <input
                                        type="text"
                                        value={st.city}
                                        onChange={(e) => updateBulkStudent(idx, "city", e.target.value)}
                                        placeholder="City"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-1">
                                        Food Preference
                                      </label>
                                      <select
                                        value={st.foodPreference}
                                        onChange={(e) => updateBulkStudent(idx, "foodPreference", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                                      >
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                                      </select>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
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
                          <span className="text-slate-500 font-medium">Category:</span>
                          <span className="font-bold text-[#FF8C00]">{category}</span>
                        </div>
                        {isBulk && (
                          <div className="flex justify-between items-center text-xs bg-emerald-100/60 p-2 rounded-xl border border-emerald-200">
                            <span className="text-emerald-800 font-bold">Bulk Student Package Applied:</span>
                            <span className="font-bold text-emerald-700">20 Passes @ ₹1,000 each (₹20,000 Total)</span>
                          </div>
                        )}
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
                          description={`Delegate Registration Fee - ${fullName}`}
                          prefillName={fullName}
                          prefillEmail={emailId}
                          prefillPhone={mobileNumber}
                          eventType="ARISE_2026"
                          registrationCode={regCode}
                          notes={{
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
                            foodPreference,
                            iapCreditPoints: String(iapCreditPoints),
                            iapMembershipNumber,
                            isBulk: String(isBulk),
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
