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
  Compass
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import confetti from "canvas-confetti";
import RazorpayCheckout from "../../../../components/RazorpayCheckout";

export default function AriseRegisterPage() {
  const lenis = useLenis();

  // Current step state (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState("Student / Intern");
  const [qualification, setQualification] = useState("");
  const [category, setCategory] = useState("Conference"); // "Conference" | "Conference with Workshop" | "Workshop"
  const [bonafideCertificate, setBonafideCertificate] = useState<string | null>(null);
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [foodPreference, setFoodPreference] = useState("Vegetarian");
  const [iapCreditPoints, setIapCreditPoints] = useState(false);
  const [iapMembershipNumber, setIapMembershipNumber] = useState("");
  const [source, setSource] = useState("Social Media");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "upi_qr">("online");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // UI status states
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Generate a random registration code
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setRegCode(`ARISE26-${randNum}`);
  }, []);

  // Compute total fee amount to pay
  const calculateTotalFee = () => {
    if (category.toLowerCase().includes("bulk")) {
      return 15000;
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

  // Helper to compress image before state to ensure light JSON payload and instant processing
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

  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setScreenshot(compressed);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => setScreenshot(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClearScreenshot = () => {
    setScreenshot(null);
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
    // Confetti showers
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
      if (!institution.trim()) stepErrors.institution = "Institution/Hospital/Organization name is required";
      if (!city.trim()) stepErrors.city = "City/Location is required";
      if (iapCreditPoints && !iapMembershipNumber.trim()) {
        stepErrors.iapMembershipNumber = "IAP Membership Number is required for credit points";
      }
    } else if (currentStep === 2) {
      if (!transactionId.trim() || !/^\d{12}$/.test(transactionId.trim())) {
        stepErrors.transactionId = "Enter a valid 12-digit UPI Reference ID";
      }
      if (!screenshot) {
        stepErrors.screenshot = "Payment screenshot upload is required";
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

  // Handle successful Razorpay payment submission
  const handleRazorpaySuccess = async (details: { paymentId: string; orderId: string; signature: string }) => {
    setIsSubmitting(true);
    setErrors({});
    setTransactionId(details.paymentId);
    setScreenshot("RAZORPAY_ONLINE_PAYMENT");

    try {
      const response = await fetch("/api/arise/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          iapMembershipNumber: iapCreditPoints ? iapMembershipNumber : ""
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        alert(result.error || "Failed to complete registration after online payment.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error submitting registration. Payment ID: " + details.paymentId);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit registration form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/arise/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          transactionId,
          paymentScreenshot: screenshot,
          designation,
          qualification,
          bonafideCertificate,
          foodPreference,
          iapCreditPoints,
          iapMembershipNumber: iapCreditPoints ? iapMembershipNumber : ""
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        setErrors({
          transactionId: result.error || "Failed to submit registration.",
        });
      }
    } catch (err) {
      console.error(err);
      setErrors({
        transactionId: "A network error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-x-clip grid-bg-dots text-left">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6 max-w-2xl mx-auto">
            <Link
              href="/iyakkam/arise"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-teal font-semibold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Event Overview
            </Link>
          </div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-[2rem] shadow-2xl relative overflow-hidden mt-8">
              {/* Top border strip */}
              <div className="h-4 bg-[#00A896]" />

              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 text-[#00A896] rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                  <CheckCircle2 size={40} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    RECEIPT CODE DISPATCHED
                  </span>
                  <h1 className="font-display text-3xl font-black text-[#004B57] uppercase tracking-tight">
                    Registration Submitted!
                  </h1>
                </div>

                <div className="max-w-md mx-auto bg-[#F0FAF9] border-2 border-dashed border-[#00A896] rounded-2xl p-6 space-y-3">
                  <span className="block text-[10px] font-bold text-[#00A896] uppercase tracking-widest font-mono">
                    Your Registration Ticket
                  </span>
                  <p className="font-mono text-3xl font-black text-[#FF8C00] tracking-wider select-all">
                    {regCode}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                    Please take a screenshot of this receipt. A confirmation copy has also been sent to your email address: <span className="font-bold text-slate-700">{emailId}</span>.
                  </p>
                </div>

                {/* Event Summary Receipt details */}
                <div className="border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto bg-slate-50/50 space-y-3">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                    Summary Details
                  </span>
                  <ul className="space-y-2 text-xs font-semibold text-slate-600">
                    <li className="flex justify-between">
                      <span className="text-slate-400">Delegate Name:</span>
                      <span className="text-[#1A1A2E]">{fullName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="text-[#1A1A2E]">
                        {category} {includeWorkshop ? "+ Workshop" : ""}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Amount Paid:</span>
                      <span className="text-[#00A896] font-bold">₹{totalFee.toLocaleString("en-IN")}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Transaction ID:</span>
                      <span className="text-slate-700 font-mono tracking-wider">{transactionId}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Institution:</span>
                      <span className="text-slate-700 truncate max-w-[200px]">{institution}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-col gap-3 justify-center items-center">
                  <Link
                    href="/iyakkam/arise"
                    className="btn-primary btn-outline-navy w-full max-w-xs justify-center"
                    style={{ padding: "12px 24px", borderRadius: 12, fontSize: 13 }}
                  >
                    Return to Landing Page
                  </Link>
                  <button
                    type="button"
                    onClick={triggerConfetti}
                    className="text-[10px] font-bold text-teal hover:underline uppercase tracking-wider"
                  >
                    Celebrate Again! 🎉
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-step registration wizard card */
            <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-[2rem] shadow-2xl overflow-hidden mt-6">
              {/* Progress Bar */}
              <div className="bg-slate-100 h-2 flex">
                <div
                  className="bg-[#00A896] transition-all duration-500"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>

              <div className="p-6 sm:p-10">
                <div className="space-y-6">
                  {/* STEP 1: Attendee Info */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-[#E0F2F1] text-teal text-xs font-bold flex items-center justify-center font-mono">01</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">Attendee Information</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-teal" /> Full Name (As Per Your Identity) *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Dr. Jane Doe"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.fullName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
                          />
                          {errors.fullName && <p className="text-[10px] text-red-500 font-semibold">{errors.fullName}</p>}
                        </div>

                        {/* Email ID */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-teal" /> Email ID *
                          </label>
                          <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="delegate.email@example.com"
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

                        {/* Registration Category (Type) */}
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
                              <option value="Conference">Conference</option>
                              <option value="Conference with Workshop">Conference with Workshop</option>
                              {designation === "Student / Intern" && (
                                <option value="Bulk Student Registration (30 Students - 50% OFF)">Bulk Student Registration (30 Students @ 50% OFF - ₹15,000 Total)</option>
                              )}
                            </select>
                          </div>
                        </div>

                        {/* Upload Bonafide Certificate (Conditionally Rendered for Students/Interns in Step 1) */}
                        {designation === "Student / Intern" && (
                          <div className="space-y-2 p-5 bg-amber-50/55 border border-amber-200/50 rounded-2xl animate-in slide-in-from-top-2 duration-300 text-left md:col-span-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5 text-[#FF8C00]" /> Upload Bonafide Certificate / Student ID (Recommended)
                            </label>
                            <p className="text-[9px] text-slate-500 font-semibold leading-normal">
                              Upload a scan/photo of your Student ID card or college bonafide certificate for verification. Student designation rate is ₹1,000 for Conference / ₹1,500 for Conference with Workshop. For group bookings of 30 students, select Bulk Student Registration for 50% OFF (₹500 each, total ₹15,000).
                            </p>

                            {!bonafideCertificate ? (
                              <div className="border-2 border-dashed border-slate-200 hover:border-teal/50 transition-colors rounded-xl p-4 text-center cursor-pointer relative bg-white">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleBonafideChange}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <div className="space-y-1">
                                  <div className="w-7 h-7 bg-[#E0F2F1] text-teal rounded-lg flex items-center justify-center mx-auto border border-teal/10">
                                    <Upload size={13} />
                                  </div>
                                  <p className="text-[10px] font-bold text-slate-700">Click or Drag bonafide file here</p>
                                  <p className="text-[8px] text-slate-400 font-medium">JPEG, PNG up to 2MB.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="relative border border-slate-200 rounded-xl p-3 bg-white flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={bonafideCertificate} alt="Bonafide Certificate" className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[10px] font-bold text-slate-700 truncate">bonafide_certificate.png</p>
                                  <p className="text-[8px] text-[#00A896] font-bold">Loaded successfully</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={handleClearBonafide}
                                  className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors text-[9px] font-bold"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Qualification */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-teal" /> Qualification *
                          </label>
                          <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder="e.g. BPT, MPT, MBBS, MS, PhD"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.qualification ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
                          />
                          {errors.qualification && <p className="text-[10px] text-red-500 font-semibold">{errors.qualification}</p>}
                        </div>

                        {/* Institution / Hospital / Organization */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-teal" /> Institution / Hospital / Organization *
                          </label>
                          <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="Enter your college, hospital, or work organization name"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.institution ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
                          />
                          {errors.institution && <p className="text-[10px] text-red-500 font-semibold">{errors.institution}</p>}
                        </div>

                        {/* Department / Speciality */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-teal" /> Department / Speciality
                          </label>
                          <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Physiotherapy, Orthopaedics (Optional)"
                            className="w-full bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10"
                          />
                        </div>

                        {/* City / Location */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-teal" /> City / Location *
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Salem, Bangalore"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.city ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"}`}
                          />
                          {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
                        </div>

                        {/* Food Preference */}
                        <div className="space-y-2 md:col-span-2 text-left">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            Food Preference *
                          </label>
                          <div className="flex gap-6 mt-1.5">
                            {[
                              { id: "Vegetarian", label: "Vegetarian" },
                              { id: "Non-Vegetarian", label: "Non-Vegetarian" }
                            ].map((food) => (
                              <label key={food.id} className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-700">
                                <input
                                  type="radio"
                                  name="foodPreference"
                                  value={food.id}
                                  checked={foodPreference === food.id}
                                  onChange={() => setFoodPreference(food.id)}
                                  className="w-4.5 h-4.5 accent-[#00A896]"
                                />
                                {food.label}
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* IAP Credit Points */}
                        <div className="md:col-span-2 p-4 bg-[#F0FAF9]/60 border border-teal/15 rounded-2xl space-y-3 text-left">
                          <label className="flex items-center gap-2.5 cursor-pointer font-bold text-xs text-[#004B57]">
                            <input
                              type="checkbox"
                              checked={iapCreditPoints}
                              onChange={(e) => setIapCreditPoints(e.target.checked)}
                              className="w-4.5 h-4.5 accent-[#00A896] rounded border-[#E2E8F0]"
                            />
                            IAP Credit Points Required
                          </label>
                          <p className="text-[10px] text-slate-500 font-medium leading-normal pl-7">
                            Check this option if you are a member of the Indian Association of Physiotherapists (IAP) and require credit hours for this conference.
                          </p>
                          {iapCreditPoints && (
                            <div className="pl-7 space-y-1.5 animate-in fade-in duration-200">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                IAP Membership Number *
                              </label>
                              <input
                                type="text"
                                value={iapMembershipNumber}
                                onChange={(e) => setIapMembershipNumber(e.target.value)}
                                placeholder="e.g. L-12345 or PT-6789"
                                className={`w-full max-w-md bg-white border rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 transition-all focus:outline-none focus:border-teal ${errors.iapMembershipNumber ? "border-red-500" : "border-[#E2E8F0]"}`}
                              />
                              {errors.iapMembershipNumber && <p className="text-[10px] text-red-500 font-semibold">{errors.iapMembershipNumber}</p>}
                            </div>
                          )}
                        </div>

                        {/* How did you hear */}
                        <div className="space-y-1.5 md:col-span-2 text-left">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-teal" /> How did you hear about ARISE 2026?
                          </label>
                          <div className="relative">
                            <select
                              value={source}
                              onChange={(e) => setSource(e.target.value)}
                              className="w-full bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                            >
                              <option value="Social Media">Social Media</option>
                              <option value="Email Newsletter">Email Newsletter</option>
                              <option value="Friends">Friends / Colleagues</option>
                              <option value="College">College recommendation</option>
                              <option value="Hospital Banner">Hospital banner / billboard</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Secure Billing Gateway */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-[#E0F2F1] text-teal text-xs font-bold flex items-center justify-center font-mono">02</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">Secure Billing Gateway</h2>
                      </div>
                      <div className="p-4 bg-[#E8F7F5]/60 border border-[#B2E0DA] rounded-2xl text-left flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="block text-[10px] font-bold text-[#004B57] uppercase tracking-wider">
                            Amount to Pay: <span className="text-[#FF8C00] font-black">₹{totalFee.toLocaleString("en-IN")}</span>
                          </span>
                          <p className="text-[10px] text-slate-500 font-medium leading-normal">
                            Category selected: <span className="font-bold text-slate-700">{category}</span>.
                          </p>
                        </div>
                      </div>

                      {/* Razorpay Online Payment Box */}
                      <div className="p-6 bg-[#F0FAF9]/60 border border-teal/20 rounded-2xl space-y-4 text-center">
                        <div className="space-y-1">
                          <h3 className="font-display text-sm font-bold text-[#004B57] uppercase tracking-wider">
                            Fast & Secure Online Checkout
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium max-w-sm mx-auto">
                            Pay ₹{totalFee.toLocaleString("en-IN")} instantly using UPI (GPay, PhonePe, Paytm), Credit/Debit Card, Net Banking, or Wallets.
                          </p>
                        </div>

                        <RazorpayCheckout
                          amount={totalFee}
                          title="ARISE 2026 CME Registration"
                          description={`Delegate Registration Fee - ${fullName}`}
                          prefillName={fullName}
                          prefillEmail={emailId}
                          prefillPhone={mobileNumber}
                          onSuccess={handleRazorpaySuccess}
                          onFailure={(errMsg) => setErrors({ transactionId: errMsg })}
                          buttonText={`Pay ₹${totalFee.toLocaleString("en-IN")} via Razorpay`}
                          buttonClassName="w-full bg-[#00A896] hover:bg-[#008B7A] text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-teal/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>

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
                      Click the Pay button above to proceed via Razorpay
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
