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
import RazorpayCheckout from "../../../components/RazorpayCheckout";

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
  const [paymentMethod, setPaymentMethod] = useState<"online" | "upi_qr">("online");
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

  // Handle successful Razorpay payment submission
  const handleRazorpaySuccess = async (details: { paymentId: string; orderId: string; signature: string }) => {
    setIsSubmitting(true);
    setErrors({});
    setTransactionId(details.paymentId);
    setScreenshot("RAZORPAY_ONLINE_PAYMENT");

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
          transactionId: details.paymentId,
          paymentScreenshot: "RAZORPAY_ONLINE_PAYMENT",
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
        alert(result.error || "Failed to submit registration after online payment.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error submitting registration. Payment ID: " + details.paymentId);
    } finally {
      setIsSubmitting(false);
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
                      <span className="text-slate-400">Transaction ID:</span>
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

                      {/* Razorpay Online Payment Box */}
                      <div className="p-6 bg-[#FFF8F3]/70 border border-[#FFD8C2] rounded-2xl space-y-4 text-center">
                        <div className="space-y-1">
                          <h3 className="font-display text-sm font-bold text-[#004B57] uppercase tracking-wider">
                            Fast & Secure Online Checkout
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium max-w-sm mx-auto">
                            Pay ₹{totalFee} instantly using UPI (GPay, PhonePe, Paytm), Credit/Debit Card, Net Banking, or Wallets.
                          </p>
                        </div>

                        <RazorpayCheckout
                          amount={totalFee}
                          title="Active Salem Marathon"
                          description={`${category} Run Registration Fee - ${fullName}`}
                          prefillName={fullName}
                          prefillEmail={emailId}
                          prefillPhone={mobileNumber}
                          onSuccess={handleRazorpaySuccess}
                          onFailure={(errMsg) => setErrors({ transactionId: errMsg })}
                          buttonText={`Pay ₹${totalFee} via Razorpay`}
                          buttonClassName="w-full bg-[#F26522] hover:bg-[#C94F0E] text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                        />
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
