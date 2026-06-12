"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Download
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import SmoothScroll from "../../../../components/SmoothScroll";
import confetti from "canvas-confetti";

export default function RegisterPage() {
  // Current step state (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Form fields
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState(2);
  const [teamLead, setTeamLead] = useState("");
  const [memberNames, setMemberNames] = useState<string[]>(["", "", "", "", ""]);
  const [memberPhones, setMemberPhones] = useState<string[]>(["", "", "", "", ""]);
  const [emailId, setEmailId] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("1st");
  const [mobileNumber, setMobileNumber] = useState("");
  const [source, setSource] = useState("Social Media");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // Payment Overhaul States
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    // Generate a random mock registration code on load
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setRegCode(`TECH26-${randNum}`);
  }, []);

  // Trigger rich, impressive confetti bursts
  const triggerConfetti = () => {
    // Left side burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
      colors: ["#00A896", "#F26522", "#004B57", "#FF8C00", "#FFF4EE"],
    });
    // Right side burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
      colors: ["#00A896", "#F26522", "#004B57", "#FF8C00", "#FFF4EE"],
    });

    // Central fireworks-like delays
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ["#00A896", "#F26522", "#FF8C00"],
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ["#00A896", "#F26522", "#FF8C00"],
      });
    }, 350);

    // Continuous soft confetti snowfall from the top
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 200);
  };

  useEffect(() => {
    if (isSuccess) {
      triggerConfetti();
    }
  }, [isSuccess]);

  // Handle member name inputs
  const handleMemberNameChange = (index: number, value: string) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  const handleMemberPhoneChange = (index: number, value: string) => {
    const updated = [...memberPhones];
    updated[index] = value.replace(/\D/g, "");
    setMemberPhones(updated);
  };

  // Step validation
  const validateStep = (currentStep: number) => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!teamName.trim()) stepErrors.teamName = "Team name is required";
      if (!teamLead.trim()) stepErrors.teamLead = "Team lead name is required";
      if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber.trim())) {
        stepErrors.mobileNumber = "Team lead mobile number (10 digits) is required";
      }
      for (let i = 1; i < teamSize; i++) {
        if (!memberNames[i - 1]?.trim()) {
          stepErrors[`member_${i}`] = `Member ${i + 1} name is required`;
        }
        const ph = memberPhones[i - 1]?.trim();
        if (!ph || !/^\d{10}$/.test(ph)) {
          stepErrors[`member_phone_${i}`] = `Member ${i + 1} mobile number (10 digits) is required`;
        }
      }
    } else if (currentStep === 2) {
      if (!collegeName.trim()) stepErrors.collegeName = "College name is required";
      if (!collegeLocation.trim()) stepErrors.collegeLocation = "College location is required";
      if (!department.trim()) stepErrors.department = "Department is required";
      if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId)) {
        stepErrors.emailId = "A valid email ID is required";
      }
    } else if (currentStep === 3) {
      if (!transactionId.trim() || !/^\d{12}$/.test(transactionId.trim())) {
        stepErrors.transactionId = "Enter a valid 12-digit UPI reference ID";
      }
      if (!screenshot) {
        stepErrors.screenshot = "Payment screenshot upload is required";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Navigating between steps
  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // Form submission
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Structure co-members array based on selected team size
      const coMembersList = Array.from({ length: teamSize - 1 }).map((_, idx) => ({
        name: memberNames[idx] || "",
        phone: memberPhones[idx] || "",
      }));

      const response = await fetch("/api/technnovations/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationCode: regCode,
          teamName,
          teamSize,
          teamLead,
          leadPhone: mobileNumber,
          coMembers: coMembersList,
          emailId,
          collegeName,
          collegeLocation,
          department,
          yearOfStudy: year,
          source,
          transactionId,
          paymentScreenshot: screenshot,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    <SmoothScroll>
      <Navbar />

      <div className="min-h-screen bg-slate-50 text-[#1A1A2E] font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots">

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Back button */}
          <div className="mb-6 max-w-2xl mx-auto">
            <Link
              href="/iyakkam/technnovations"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-teal font-semibold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Challenge Details
            </Link>
          </div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-[2rem] shadow-2xl relative overflow-hidden mt-8 animate-float">
              {/* Colorful top strip */}
              <div className="h-4 bg-teal" />

              <div className="p-8 md:p-12 text-center space-y-8">
                <div className="w-16 h-16 bg-[#E0F2F1] text-teal rounded-full flex items-center justify-center mx-auto shadow-inner border border-teal/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase text-[#004B57] leading-none">
                    REGISTRATION<br />
                    <span className="text-[#FF8C00]">CONFIRMED</span>
                  </h2>
                  <p className="text-slate-500 font-semibold text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Your team has been successfully registered for Technovations 2026. A confirmation details package has been dispatched to <span className="text-[#1A1A2E] font-bold">{emailId}</span>.
                  </p>
                </div>

                {/* Impressive Holographic Team Pass Card */}
                <div className="relative max-w-lg mx-auto bg-gradient-to-br from-[#1A1A2E] to-[#0A0A15] border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 text-white text-left shadow-2xl overflow-hidden group">
                  {/* Holographic scanning line effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00A896]/10 to-transparent -translate-x-full group-hover:animate-hologram pointer-events-none" />

                  {/* Radial neon glow backdrops */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00A896]/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#FF8C00]/15 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#00A896] uppercase font-bold">OFFICIAL ENTRY PASS</span>
                      <h3 className="font-display text-2xl font-black tracking-tight text-white uppercase mt-1">
                        {teamName}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{collegeName}</p>
                    </div>

                    <span className="text-[8px] font-bold tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md uppercase">
                      ACTIVE PASS
                    </span>
                  </div>

                  {/* Core Ticket Code Centerpiece */}
                  <div className="my-6 p-5 bg-black/45 border border-slate-800/60 rounded-2xl flex items-center justify-between shadow-inner">
                    <div className="space-y-1">
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">REGISTRATION / LOGIN CODE</span>
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#FF8C00] tracking-wider block">
                        {regCode}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(regCode);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[#00A896] hover:text-[#00c2ad] transition-all rounded-xl text-xs font-bold shadow-md cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400 font-mono">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span className="font-mono">COPY CODE</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom Stub details */}
                  <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-dashed border-slate-800/80">
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">TEAM LEADER</span>
                      <span className="font-bold text-slate-200 mt-0.5 block">{teamLead}</span>
                      <span className="text-[10px] text-slate-500 block">{mobileNumber}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">CAPACITY</span>
                      <span className="font-bold text-slate-200 mt-0.5 block">{teamSize} Members</span>
                      <span className="text-[10px] text-slate-500 block">{department} Dept</span>
                    </div>
                  </div>

                  {/* Inline Holographic styling keyframes */}
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes hologram {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                    .group:hover .group-hover\\:animate-hologram {
                      animation: hologram 2s infinite linear;
                    }
                  `}} />
                </div>

                {/* Next Steps / PPT Portal Instruction */}
                <div className="bg-[#E8F7F5]/35 border border-[#B2E0DA] rounded-[2rem] p-6 text-left space-y-4 max-w-lg mx-auto shadow-inner-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#B2E0DA]/40">
                    <div className="w-6 h-6 rounded-lg bg-teal text-white flex items-center justify-center flex-shrink-0">
                      <Info size={13} />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#004B57]">
                      CRITICAL NEXT STEPS: PPT SUBMISSION
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-600 font-medium">
                    <p>
                      To finalize your submission, the Team Leader must log in to the <span className="font-bold text-[#1A1A2E]">Leader Portal</span> using the credentials below to upload the project slides:
                    </p>

                    <ul className="list-disc list-inside space-y-1.5 pl-1 text-[11px] text-slate-500">
                      <li>
                        Portal Link: <Link href="/iyakkam/technnovations/portal" className="text-teal font-bold hover:underline">/iyakkam/technnovations/portal</Link>
                      </li>
                      <li>
                        Username / Registration Code: <span className="font-mono font-bold text-[#1A1A2E] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-250">{regCode}</span>
                      </li>
                      <li>
                        Authentication: Use the Team Leader's Email (<span className="font-bold text-[#1A1A2E]">{emailId}</span>) or Mobile Number (<span className="font-bold text-[#1A1A2E]">{mobileNumber}</span>) to log in.
                      </li>
                      <li>
                        Format: <span className="font-bold text-[#1A1A2E]">PPT, PPTX, or PDF</span> (Max size <span className="font-bold">5MB</span>).
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/iyakkam/technnovations/portal"
                      className="btn-primary btn-orange w-full justify-center text-xs"
                      style={{ padding: "10px 20px", borderRadius: 10 }}
                    >
                      Go to Leader Portal <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Return Button */}
                <div className="pt-2 flex justify-center">
                  <Link
                    href="/iyakkam/technnovations"
                    className="btn-primary btn-teal"
                    style={{ padding: "12px 28px", fontSize: 13, borderRadius: 12 }}
                  >
                    Return to challenge details <ArrowRight size={15} className="ml-1.5 inline" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Header Titles */}
              <div className="mb-10 text-center space-y-2">
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#004B57] tracking-tight leading-none">
                  Sport<span className="text-[#FF8C00]">AI</span>thon Registration
                </h1>
                <p className="text-slate-500 font-semibold text-xs sm:text-sm">
                  Technovations 2026 AI Sports Rehabilitation Expo &amp; SportAlthon
                </p>
              </div>

              {/* Checkout Wizard Panel */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden flex flex-col min-w-0">
                {/* Border top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal" />

                {/* Progress Stepper Bar - EMBEDDED INSIDE the wizard container */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between relative max-w-sm mx-auto">
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 -z-0" />

                    {[
                      { number: 1, label: "Identity" },
                      { number: 2, label: "University" },
                      { number: 3, label: "Payment" }
                    ].map((s) => (
                      <div key={s.number} className="flex flex-col items-center gap-1 relative z-10 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                        <div
                          className={`w-7 h-7 rounded-full border-2 font-mono text-[10px] font-bold flex items-center justify-center transition-colors duration-300 ${step >= s.number
                            ? "bg-teal border-teal text-white shadow-md shadow-teal/20"
                            : "bg-white border-slate-300 text-slate-400"
                            }`}
                        >
                          {step > s.number ? <CheckCircle2 size={13} className="text-white" /> : `0${s.number}`}
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${step >= s.number ? "text-teal" : "text-slate-400"
                            }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form inputs container */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* STEP 1: Team Identity */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-[#E0F2F1] text-teal text-xs font-bold flex items-center justify-center font-mono">01</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">Team Identity Setup</h2>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-teal" /> Team Name
                        </label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="e.g. BioSync Dynamics"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.teamName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                            }`}
                        />
                        {errors.teamName && <p className="text-[10px] text-red-500 font-semibold">{errors.teamName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-teal" /> Team Size
                        </label>
                        <div className="relative">
                          <select
                            value={teamSize}
                            onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                            className="w-full bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                          >
                            <option value={2}>2 Members</option>
                            <option value={3}>3 Members</option>
                            <option value={4}>4 Members</option>
                            <option value={5}>5 Members</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-teal" /> Team Lead Name
                          </label>
                          <input
                            type="text"
                            value={teamLead}
                            onChange={(e) => setTeamLead(e.target.value)}
                            placeholder="Full Name"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.teamLead ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                              }`}
                          />
                          {errors.teamLead && <p className="text-[10px] text-red-500 font-semibold">{errors.teamLead}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-teal" /> Lead Contact Number
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit phone number"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.mobileNumber ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                              }`}
                          />
                          {errors.mobileNumber && <p className="text-[10px] text-red-500 font-semibold">{errors.mobileNumber}</p>}
                          <p className="text-[9px] text-slate-400 mt-1">Used alongside your Registration Code to log in to the Leader Portal later.</p>
                        </div>
                      </div>

                      {teamSize > 1 && (
                        <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Co-Members Contact Information</span>
                          <div className="grid grid-cols-1 gap-4">
                            {Array.from({ length: teamSize - 1 }).map((_, idx) => {
                              const errNameKey = `member_${idx + 1}`;
                              const errPhoneKey = `member_phone_${idx + 1}`;
                              return (
                                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                                  <div className="text-[9px] font-mono font-bold text-teal tracking-wider uppercase">Co-Member {idx + 2} Details</div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-bold text-slate-500 uppercase">Full Name</label>
                                      <input
                                        type="text"
                                        value={memberNames[idx] || ""}
                                        onChange={(e) => handleMemberNameChange(idx, e.target.value)}
                                        placeholder={`Member ${idx + 2} Name`}
                                        className={`w-full bg-white border rounded-xl px-4 py-2 text-xs font-medium text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors[errNameKey] ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                                          }`}
                                      />
                                      {errors[errNameKey] && <p className="text-[10px] text-red-500 font-semibold">{errors[errNameKey]}</p>}
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-bold text-slate-500 uppercase">Mobile Number</label>
                                      <input
                                        type="tel"
                                        maxLength={10}
                                        value={memberPhones[idx] || ""}
                                        onChange={(e) => handleMemberPhoneChange(idx, e.target.value)}
                                        placeholder="10-digit phone number"
                                        className={`w-full bg-white border rounded-xl px-4 py-2 text-xs font-medium text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors[errPhoneKey] ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                                          }`}
                                      />
                                      {errors[errPhoneKey] && <p className="text-[10px] text-red-500 font-semibold">{errors[errPhoneKey]}</p>}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2: University & Contact Details */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-[#E0F2F1] text-teal text-xs font-bold flex items-center justify-center font-mono">02</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">University & Contact Info</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-teal" /> College Name
                          </label>
                          <input
                            type="text"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            placeholder="College or University Name"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.collegeName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                              }`}
                          />
                          {errors.collegeName && <p className="text-[10px] text-red-500 font-semibold">{errors.collegeName}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-teal" /> Location
                          </label>
                          <input
                            type="text"
                            value={collegeLocation}
                            onChange={(e) => setCollegeLocation(e.target.value)}
                            placeholder="City, State"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.collegeLocation ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                              }`}
                          />
                          {errors.collegeLocation && <p className="text-[10px] text-red-500 font-semibold">{errors.collegeLocation}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-teal" /> Department
                          </label>
                          <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Biomedical, CS"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.department ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                              }`}
                          />
                          {errors.department && <p className="text-[10px] text-red-500 font-semibold">{errors.department}</p>}
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-teal" /> Year of Study
                          </label>
                          <div className="relative">
                            <select
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              className="w-full bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                            >
                              <option value="1st">1st Year</option>
                              <option value="2nd">2nd Year</option>
                              <option value="3rd">3rd Year</option>
                              <option value="4th">4th Year</option>
                              <option value="PG">Post Graduate (PG)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-teal" /> Lead Email ID
                          </label>
                          <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="lead.email@example.com"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.emailId ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                              }`}
                          />
                          {errors.emailId && <p className="text-[10px] text-red-500 font-semibold">{errors.emailId}</p>}
                          <p className="text-[9px] text-slate-400 mt-1">Used alongside your Registration Code to log in to the Leader Portal later.</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-teal" /> How did you hear about Technovations?
                        </label>
                        <div className="relative">
                          <select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A4A6A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                          >
                            <option value="Social Media">Social Media</option>
                            <option value="Pamphlet">Pamphlet</option>
                            <option value="Friends">Friends</option>
                            <option value="College">College recommendation</option>
                            <option value="Hospital">Hospital billboard</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Payment Verification */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-[#E0F2F1] text-teal text-xs font-bold flex items-center justify-center font-mono">03</span>
                        <h2 className="font-display text-base font-bold text-[#004B57] uppercase tracking-wider">Secure Billing Gateway</h2>
                      </div>

                      {/* Info alert about next steps (PPT upload & Login details) */}
                      <div className="p-4 bg-[#E8F7F5]/60 border border-[#B2E0DA] rounded-2xl text-left flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="block text-[10px] font-bold text-[#004B57] uppercase tracking-wider">PPT Submission after registration</span>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            Upon successful registration, you will get a unique Registration Code. The Team Leader will use this code and email/phone to log in to the <span className="font-bold text-[#1A1A2E]">Leader Portal</span> to upload the project presentation (.ppt, .pptx, or .pdf, max 5MB).
                          </p>
                        </div>
                      </div>

                      {/* UPI Only Scanner UI */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F0FAF9]/60 border border-teal/15 p-5 rounded-2xl">
                          {/* QR code scanner wrapper */}
                          <div className="md:col-span-5 flex flex-col items-center">
                            <button
                              type="button"
                              onClick={() => setQrModalOpen(true)}
                              className="relative bg-white border border-slate-200 rounded-2xl p-3 shadow-md hover:shadow-lg hover:border-teal/30 hover:scale-105 transition-all duration-300 cursor-pointer group"
                              title="Click to expand QR Code"
                            >
                              <img src="/assets/payment-qr.jpg" alt="UPI QR Code" className="w-[135px] h-[135px] object-contain" />
                              <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center">
                                <span className="bg-white/95 text-teal text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md border border-teal/10">Click to Expand</span>
                              </div>
                            </button>
                            <span className="text-[8px] font-mono text-slate-450 mt-2 tracking-widest uppercase">Click to scan / save</span>
                          </div>

                          {/* Payment instructions */}
                          <div className="md:col-span-7 space-y-4">
                            {/* UPI VPA ID Box */}
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

                            <div className="text-xs space-y-2 text-[#004B57] font-semibold leading-relaxed">
                              <p className="text-teal font-bold flex items-center gap-1.5 text-sm">
                                <Info className="w-4 h-4" /> UPI Payment Steps:
                              </p>
                              <ol className="list-decimal list-inside text-[11px] text-slate-500 pl-1 space-y-2">
                                <li>Scan this QR code using Google Pay, PhonePe, Paytm, or any standard UPI app.</li>
                                <li>Pay the entry fee amount of <span className="font-bold text-[#1A1A2E]">₹3,000</span>.</li>
                                <li>Verify that the recipient name displays as <span className="font-bold text-[#1A1A2E]">Valli Hospital</span>.</li>
                                <li>Copy the 12-digit UPI Transaction/Reference ID and enter it below.</li>
                              </ol>
                            </div>
                          </div>
                        </div>

                        {/* UPI Input field */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-teal" /> 12-Digit UPI Reference ID
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={12}
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value.replace(/\D/g, ""))}
                              placeholder="e.g. 329012345678"
                              className={`w-full bg-white border rounded-xl pl-4 pr-12 py-3 text-xs font-mono tracking-widest text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${errors.transactionId ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                                }`}
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
                          <p className="text-[10px] text-slate-400 leading-normal">
                            Standard banking transaction ID. Found in your bank SMS or UPI transaction details screen.
                          </p>
                        </div>

                        {/* Payment Screenshot Upload */}
                        <div className="space-y-1.5 mt-4">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-teal" /> Upload Payment Screenshot
                          </label>

                          {!screenshot ? (
                            <div className="border-2 border-dashed border-slate-200 hover:border-teal/50 transition-colors rounded-xl p-5 text-center cursor-pointer relative bg-slate-50/30">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <div className="space-y-2">
                                <div className="w-8 h-8 bg-teal-mist text-teal rounded-lg flex items-center justify-center mx-auto shadow-inner border border-teal/10">
                                  <Upload size={14} />
                                </div>
                                <p className="text-[11px] font-bold text-slate-700">Click or Drag screenshot here</p>
                                <p className="text-[9px] text-slate-400 font-medium">JPEG, PNG up to 2MB. Make sure the UTR/TxID is visible.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="relative border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                <img src={screenshot} alt="Payment SS" className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-bold text-slate-700 truncate">screenshot_uploaded.png</p>
                                <p className="text-[9px] text-emerald-500 font-bold">Image loaded successfully</p>
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

                {/* Navigation controls */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
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

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary btn-teal"
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
                          Verifying...
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

      {/* Google Pay QR Code Expanded Lightbox Modal */}
      {qrModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#1A1A2E]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setQrModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-sm w-full border border-teal/10 shadow-2xl relative flex flex-col items-center gap-5 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 mt-2">
              <h3 className="font-display text-lg font-bold uppercase text-[#004B57]">Google Pay QR Code</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Scan this QR code with Google Pay, PhonePe, Paytm, or any UPI app to transfer the ₹3,000 entry fee.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shadow-inner flex items-center justify-center">
              <img 
                src="/assets/payment-qr.jpg" 
                alt="UPI QR Code Expanded" 
                className="w-[260px] h-[260px] object-contain rounded-xl bg-white shadow-sm"
              />
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <a
                href="/assets/payment-qr.jpg"
                download="valli-hospital-payment-qr.jpg"
                className="bg-[#00A896] hover:bg-[#008B7A] text-white w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <Download size={14} /> Save QR to Device
              </a>
              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-[#004B57] w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </SmoothScroll>
  );
}
