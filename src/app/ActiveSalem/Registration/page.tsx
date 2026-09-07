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
  User,
  MapPin,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Lock,
  Upload,
  X,
  Download,
  Zap,
  Shirt,
  Calendar,
  Tag,
  ShieldCheck,
  Heart
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import confetti from "canvas-confetti";

export default function ActiveSalemRegistrationPage() {
  const lenis = useLenis();

  // Wizard Step State (1: Personal & Category Info, 2: Payment Gateway)
  const [step, setStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("5KM"); // "5KM" | "10KM"
  const [tshirtSize, setTshirtSize] = useState("M"); // "S" | "M" | "L" | "XL" | "XXL"
  const [emergencyContact, setEmergencyContact] = useState("");
  const [city, setCity] = useState("Salem");
  const [source, setSource] = useState("Social Media");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // UI Status States
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
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
    if (category === "10KM") {
      return 299;
    }
    return 249;
  };

  const totalFee = calculateTotalFee();

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Screenshot file size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setScreenshot(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearScreenshot = () => {
    setScreenshot(null);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.15, y: 0.6 },
      colors: ["#F26522", "#00A896", "#004B57", "#FFF4EE"],
    });
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.85, y: 0.6 },
      colors: ["#F26522", "#00A896", "#004B57", "#FFF4EE"],
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
        stepErrors.emailId = "A valid email ID is required";
      }
      if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim())) {
        stepErrors.mobileNumber = "A valid 10-digit mobile number is required";
      }
      const ageNum = Number(age);
      if (!age.trim() || isNaN(ageNum) || ageNum < 16 || ageNum > 99) {
        stepErrors.age = "Runner must be 16 years or above";
      }
      if (!category.trim()) stepErrors.category = "Marathon category is required";
      if (!tshirtSize.trim()) stepErrors.tshirtSize = "T-shirt size is required";
      if (!city.trim()) stepErrors.city = "City/Location is required";
    } else if (currentStep === 2) {
      if (!transactionId.trim() || !/^\d{12}$/.test(transactionId.trim())) {
        stepErrors.transactionId = "Enter a valid 12-digit UPI Reference ID / UTR";
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

  // Submit Registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/active-salem/register", {
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
          tshirtSize,
          gender,
          age: Number(age),
          emergencyContact,
          city,
          source,
          transactionId,
          paymentScreenshot: screenshot,
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
          {/* Back Link */}
          <div className="mb-6 max-w-2xl mx-auto">
            <Link
              href="/ActiveSalem"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F26522] font-extrabold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Marathon Overview
            </Link>
          </div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-[2rem] shadow-2xl relative overflow-hidden mt-8">
              {/* Top accent bar */}
              <div className="h-4 bg-[#F26522]" />

              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-orange-50 text-[#F26522] rounded-full flex items-center justify-center mx-auto shadow-inner border border-orange-100">
                  <CheckCircle2 size={42} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">
                    MARATHON RUNNER TICKET GENERATED
                  </span>
                  <h1 className="font-display text-3xl font-black text-[#004B57] uppercase tracking-tight">
                    Registration Submitted!
                  </h1>
                </div>

                <div className="max-w-md mx-auto bg-[#FFF8F3] border-2 border-dashed border-[#F26522] rounded-2xl p-6 space-y-3">
                  <span className="block text-[10px] font-extrabold text-[#F26522] uppercase tracking-widest font-mono">
                    Your Marathon Ticket Code
                  </span>
                  <p className="font-mono text-3xl font-black text-[#F26522] tracking-wider select-all">
                    {regCode}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                    Please keep a screenshot of this receipt ticket. Present this code at the registration desk on race day to claim your BIB and runner kit. Confirmation copy sent to <span className="font-bold text-slate-700">{emailId}</span>.
                  </p>
                </div>

                {/* Event Summary Ticket Details */}
                <div className="border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto bg-slate-50/50 space-y-3">
                  <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                    Runner Ticket Summary
                  </span>
                  <ul className="space-y-2 text-xs font-semibold text-slate-600">
                    <li className="flex justify-between">
                      <span className="text-slate-400">Runner Name:</span>
                      <span className="text-[#004B57] font-bold">{fullName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="text-[#F26522] font-black">{category} Run</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">T-Shirt Size:</span>
                      <span className="text-slate-800 font-bold">{tshirtSize}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Amount Paid:</span>
                      <span className="text-[#00A896] font-bold">₹{totalFee}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">UPI Ref ID:</span>
                      <span className="text-slate-700 font-mono tracking-wider">{transactionId}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-col gap-3 justify-center items-center">
                  <Link
                    href="/ActiveSalem"
                    className="btn-primary btn-outline-navy w-full max-w-xs justify-center uppercase tracking-wider text-xs py-3 rounded-xl font-extrabold"
                  >
                    Return to Marathon Overview
                  </Link>
                  <button
                    type="button"
                    onClick={triggerConfetti}
                    className="text-[10px] font-extrabold text-[#F26522] hover:underline uppercase tracking-wider"
                  >
                    Celebrate Again! 🎉
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-step Registration Wizard Card */
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden mt-4">
              {/* Progress Bar */}
              <div className="bg-slate-100 h-2 flex">
                <div
                  className="bg-[#F26522] transition-all duration-500"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>

              <div className="p-6 sm:p-10">
                <div className="space-y-6">

                  {/* STEP 1: Runner Info & Category */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-orange-100 text-[#F26522] text-xs font-bold flex items-center justify-center font-mono">01</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">Runner Information</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category Selection */}
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-[#F26522]" /> Select Category *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setCategory("5KM")}
                              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${category === "5KM" ? "border-[#00A896] bg-[#E8F7F5]" : "border-slate-200 bg-white hover:border-slate-300"}`}
                            >
                              <span className="text-xs font-black text-[#004B57] uppercase">5KM Run</span>
                              <span className="font-display text-xl font-black text-[#004B57] mt-1">₹249/-</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCategory("10KM")}
                              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${category === "10KM" ? "border-[#F26522] bg-[#FFF4EE]" : "border-slate-200 bg-white hover:border-slate-300"}`}
                            >
                              <span className="text-xs font-black text-[#F26522] uppercase">10KM Run</span>
                              <span className="font-display text-xl font-black text-[#F26522] mt-1">₹299/-</span>
                            </button>
                          </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#F26522]" /> Full Name (As Per Identity) *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rahul Kumar"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all focus:outline-none focus:border-[#F26522] focus:ring-4 focus:ring-[#F26522]/10 ${errors.fullName ? "border-red-500" : "border-slate-200"}`}
                          />
                          {errors.fullName && <p className="text-[10px] text-red-500 font-semibold">{errors.fullName}</p>}
                        </div>

                        {/* Email ID */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#F26522]" /> Email ID *
                          </label>
                          <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="runner.email@example.com"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all focus:outline-none focus:border-[#F26522] focus:ring-4 focus:ring-[#F26522]/10 ${errors.emailId ? "border-red-500" : "border-slate-200"}`}
                          />
                          {errors.emailId && <p className="text-[10px] text-red-500 font-semibold">{errors.emailId}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#F26522]" /> Mobile Number *
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit mobile number"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 transition-all focus:outline-none focus:border-[#F26522] focus:ring-4 focus:ring-[#F26522]/10 ${errors.mobileNumber ? "border-red-500" : "border-slate-200"}`}
                          />
                          {errors.mobileNumber && <p className="text-[10px] text-red-500 font-semibold">{errors.mobileNumber}</p>}
                        </div>

                        {/* Age & Gender */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              Age (16+) *
                            </label>
                            <input
                              type="number"
                              min={16}
                              max={99}
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              placeholder="e.g. 24"
                              className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#F26522] ${errors.age ? "border-red-500" : "border-slate-200"}`}
                            />
                            {errors.age && <p className="text-[10px] text-red-500 font-semibold">{errors.age}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              Gender *
                            </label>
                            <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs font-medium text-slate-800 cursor-pointer"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        {/* T-Shirt Size */}
                        <div className="space-y-1.5 md:col-span-2 text-left">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Shirt className="w-3.5 h-3.5 text-[#F26522]" /> T-Shirt Size *
                          </label>
                          <div className="grid grid-cols-5 gap-2.5">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setTshirtSize(size)}
                                className={`py-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${tshirtSize === size ? "border-[#F26522] bg-[#F26522] text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-slate-350"}`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Emergency Phone Number
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value.replace(/\D/g, ""))}
                            placeholder="Relative / Friend contact"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#F26522]"
                          />
                        </div>

                        {/* City / Location */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#F26522]" /> City / Location *
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Salem, Namakkal, Erode"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#F26522] ${errors.city ? "border-red-500" : "border-slate-200"}`}
                          />
                          {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
                        </div>

                        {/* How did you hear */}
                        <div className="space-y-1.5 md:col-span-2 text-left">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-[#F26522]" /> How did you hear about Valli Marathon?
                          </label>
                          <select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 cursor-pointer"
                          >
                            <option value="Social Media">Social Media (Instagram / Facebook)</option>
                            <option value="Hospital Banner">Hospital banner / billboard</option>
                            <option value="Friends">Friends / Colleagues</option>
                            <option value="Running Club">Running Club / Academy</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: UPI Billing Gateway */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-orange-100 text-[#F26522] text-xs font-bold flex items-center justify-center font-mono">02</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">Secure Payment Gateway</h2>
                      </div>

                      <div className="p-4 bg-[#FFF8F3] border border-[#FFD8C2] rounded-2xl text-left flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-[#F26522] flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="block text-[10px] font-extrabold text-[#004B57] uppercase tracking-wider">
                            Amount to Pay: <span className="text-[#F26522] font-black">₹{totalFee}</span>
                          </span>
                          <p className="text-[10px] text-slate-500 font-medium leading-normal">
                            Category selected: <span className="font-bold text-slate-700">{category} Run</span>. T-Shirt Size: <span className="font-bold text-slate-700">{tshirtSize}</span>.
                          </p>
                        </div>
                      </div>

                      {/* UPI QR Details */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F0FAF9]/60 border border-teal/15 p-5 rounded-2xl">
                          {/* QR Image */}
                          <div className="md:col-span-5 flex flex-col items-center">
                            <button
                              type="button"
                              onClick={() => setQrModalOpen(true)}
                              className="relative bg-white border border-slate-200 rounded-2xl p-3 shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer group"
                              title="Click to expand QR Code"
                            >
                              <Image src="/assets/payment-qr.jpg" alt="UPI QR Code" width={135} height={135} className="w-[135px] h-[135px] object-contain rounded-lg bg-white" />
                              <div className="absolute inset-0 bg-[#F26522]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center">
                                <span className="bg-white/95 text-[#F26522] text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md border border-orange-200">Click to Expand</span>
                              </div>
                            </button>
                            <span className="text-[8px] font-mono text-slate-400 mt-2 tracking-widest uppercase">Click to scan / save</span>
                          </div>

                          {/* Pay Instructions */}
                          <div className="md:col-span-7 space-y-4">
                            {/* Copy VPA */}
                            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                              <div>
                                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Quick Pay / UPI VPA</span>
                                <span className="font-mono text-xs font-bold text-[#1A1A2E]">drvjl79-2@okicici</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText("drvjl79-2@okicici");
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer"
                                title="Copy UPI VPA"
                              >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                            </div>

                            {/* Mobile deep link */}
                            <div className="space-y-1.5">
                              <a
                                href={`upi://pay?pa=drvjl79-2@okicici&pn=Valli%20Hospital&am=${totalFee}&cu=INR`}
                                className="w-full bg-[#F26522] hover:bg-[#C94F0E] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <Zap size={14} /> Quick Pay (UPI App)
                              </a>
                            </div>

                            <div className="text-xs space-y-2 text-[#004B57] font-semibold leading-relaxed text-left">
                              <ol className="list-decimal list-inside text-[11px] text-slate-500 pl-1 space-y-1">
                                <li>Scan QR code using Google Pay, PhonePe, Paytm, or BHIM UPI app.</li>
                                <li>Pay exact registration entry fee of <span className="font-bold text-[#1A1A2E]">₹{totalFee}</span>.</li>
                                <li>Recipient name will display as <span className="font-bold text-[#1A1A2E]">Valli Hospital</span>.</li>
                                <li>Enter the 12-digit UPI Transaction / UTR ID below.</li>
                              </ol>
                            </div>
                          </div>
                        </div>

                        {/* UPI Transaction ID Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-[#F26522]" /> Payment Transaction ID / UTR Number *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={12}
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value.replace(/\D/g, ""))}
                              placeholder="e.g. 329012345678"
                              className={`w-full bg-white border rounded-xl pl-4 pr-12 py-3 text-xs font-mono tracking-widest text-[#1A1A2E] transition-all focus:outline-none focus:border-[#F26522] focus:ring-4 focus:ring-[#F26522]/10 ${errors.transactionId ? "border-red-500" : "border-slate-200"}`}
                            />
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-slate-400 pointer-events-none">
                              {transactionId.length === 12 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <span className="text-[9px] font-bold font-mono">{transactionId.length}/12</span>
                              )}
                            </div>
                          </div>
                          {errors.transactionId && <p className="text-[10px] text-red-500 font-semibold">{errors.transactionId}</p>}
                        </div>

                        {/* Screenshot upload */}
                        <div className="space-y-1.5 mt-4 text-left">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-[#F26522]" /> Upload Payment Screenshot *
                          </label>

                          {!screenshot ? (
                            <div className="border-2 border-dashed border-slate-200 hover:border-[#F26522]/50 transition-colors rounded-xl p-5 text-center cursor-pointer relative bg-slate-50/30">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <div className="space-y-2">
                                <div className="w-8 h-8 bg-orange-50 text-[#F26522] rounded-lg flex items-center justify-center mx-auto shadow-inner border border-orange-200">
                                  <Upload size={14} />
                                </div>
                                <p className="text-[11px] font-bold text-slate-700">Click or Drag screenshot here</p>
                                <p className="text-[9px] text-slate-400 font-medium">JPEG, PNG up to 2MB. Ensure the 12-digit UTR ID is visible.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="relative border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={screenshot} alt="Payment SS" className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-bold text-slate-700 truncate">payment_screenshot.png</p>
                                <p className="text-[9px] text-[#00A896] font-bold">Image loaded successfully</p>
                              </div>
                              <button
                                type="button"
                                onClick={handleClearScreenshot}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors text-xs font-bold"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                          {errors.screenshot && <p className="text-[10px] text-red-500 font-semibold">{errors.screenshot}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Navigation Controls */}
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
                      className="btn-primary btn-orange"
                      style={{ padding: "10px 24px", fontSize: 13, borderRadius: 10 }}
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-primary btn-orange"
                      style={{ padding: "12px 28px", fontSize: 13, borderRadius: 10 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Registration <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Expanded Modal */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="bg-white rounded-[2rem] p-6 max-w-sm w-full border border-orange-200 shadow-2xl relative flex flex-col items-center gap-5 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 mt-2 text-center">
              <h3 className="font-display text-lg font-bold uppercase text-[#004B57]">Marathon UPI QR</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Scan using Google Pay, PhonePe, Paytm, or any UPI app to pay ₹{totalFee}.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-center">
              <Image
                src="/assets/payment-qr.jpg"
                alt="UPI QR Code Expanded"
                width={260}
                height={260}
                className="w-[260px] h-[260px] object-contain rounded-xl bg-white shadow-sm"
              />
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <a
                href="/assets/payment-qr.jpg"
                download="valli-marathon-payment-qr.jpg"
                className="bg-[#F26522] hover:bg-[#C94F0E] text-white w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Download size={14} /> Save QR Code
              </a>
              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-[#004B57] w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
