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
  Upload
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import SmoothScroll from "../../../../components/SmoothScroll";
import QRCodePlaceholder from "../../../../components/svg/QRCodePlaceholder";

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

                {/* Receipt Details Table */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden text-left text-xs font-semibold text-slate-700 max-w-lg mx-auto shadow-sm">
                  <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                    <span className="font-mono text-[9px] tracking-wider text-slate-500 uppercase">OFFICIAL RECEIPT</span>
                    <span className="font-mono text-teal font-bold">{regCode}</span>
                  </div>
                  
                  <div className="divide-y divide-slate-200 font-medium">
                    <div className="p-4 grid grid-cols-3 gap-2">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider self-center">Team Details</span>
                      <span className="col-span-2 text-slate-800 font-bold">{teamName} ({teamSize} Members)</span>
                    </div>

                    <div className="p-4 grid grid-cols-3 gap-2">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider">Team Lead</span>
                      <span className="col-span-2 text-slate-800 font-bold">
                        {teamLead}
                        <span className="block text-[10px] text-slate-500 font-semibold mt-0.5">{mobileNumber}</span>
                      </span>
                    </div>

                    {teamSize > 1 && (
                      <div className="p-4 grid grid-cols-3 gap-2">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider">Co-Members</span>
                        <div className="col-span-2 space-y-2 text-slate-800">
                          {memberNames.slice(0, teamSize - 1).map((name, i) => (
                            <div key={i} className="font-semibold flex items-center justify-between">
                              <span>{name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">({memberPhones[i] || "No mobile"})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-4 grid grid-cols-3 gap-2">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider">Institution</span>
                      <span className="col-span-2 text-slate-800 font-bold">
                        {collegeName}
                        <span className="block text-[10px] text-slate-500 font-semibold mt-0.5">{department} Department - {year} Year</span>
                      </span>
                    </div>

                    <div className="p-4 grid grid-cols-3 gap-2 bg-[#E0F2F1]/30">
                      <span className="text-[#004B57] text-[10px] uppercase tracking-wider self-center font-bold">Payment Status</span>
                      <span className="col-span-2 font-mono text-teal font-black text-xs self-center">
                        UPI REF ID: {transactionId}
                      </span>
                    </div>
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
                <span className="eyebrow">Innovation Challenge Gateway</span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#004B57] uppercase tracking-tight leading-none">
                  CHALLENGE REGISTRATION
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
                          className={`w-7 h-7 rounded-full border-2 font-mono text-[10px] font-bold flex items-center justify-center transition-colors duration-300 ${
                            step >= s.number
                              ? "bg-teal border-teal text-white shadow-md shadow-teal/20"
                              : "bg-white border-slate-300 text-slate-400"
                          }`}
                        >
                          {step > s.number ? <CheckCircle2 size={13} className="text-white" /> : `0${s.number}`}
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                            step >= s.number ? "text-teal" : "text-slate-400"
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
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                            errors.teamName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.teamLead ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.mobileNumber ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-350"
                            }`}
                          />
                          {errors.mobileNumber && <p className="text-[10px] text-red-500 font-semibold">{errors.mobileNumber}</p>}
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
                                        className={`w-full bg-white border rounded-xl px-4 py-2 text-xs font-medium text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                          errors[errNameKey] ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                                        className={`w-full bg-white border rounded-xl px-4 py-2 text-xs font-medium text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                          errors[errPhoneKey] ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.collegeName ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.collegeLocation ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.department ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                              errors.emailId ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
                            }`}
                          />
                          {errors.emailId && <p className="text-[10px] text-red-500 font-semibold">{errors.emailId}</p>}
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

                      {/* UPI Only Scanner UI */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F0FAF9]/60 border border-teal/15 p-5 rounded-2xl">
                          {/* QR code scanner wrapper */}
                          <div className="md:col-span-5 flex flex-col items-center">
                            <div className="relative bg-white border border-slate-200 rounded-2xl p-3 shadow-md">
                              <QRCodePlaceholder size={135} />
                              {/* Scanning line */}
                              <div className="absolute left-3 right-3 h-[1.5px] bg-[#FF8C00] top-3 animate-sweep" />
                            </div>
                            <span className="text-[8px] font-mono text-slate-400 mt-2 tracking-widest uppercase">SCAN TO PAY</span>
                          </div>

                          {/* Payment instructions */}
                          <div className="md:col-span-7 space-y-4">
                            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                              <div>
                                  <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">OFFICIAL UPI VPA</span>
                                  <span className="font-mono text-xs font-bold text-[#1A1A2E]">valli.hosp@upi</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText("valli.hosp@upi");
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 transition-colors"
                              >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                            </div>

                            <div className="text-xs space-y-2 text-slate-600 font-semibold leading-relaxed">
                              <p className="text-teal font-bold flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5" /> Payment Steps:
                              </p>
                              <ol className="list-decimal list-inside text-[11px] text-slate-500 pl-1 space-y-1">
                                <li>Scan the QR with any standard UPI app.</li>
                                <li>Enter the entry fee amount of <span className="font-bold text-[#1A1A2E]">₹3,000</span>.</li>
                                <li>Verify recipient is <span className="font-bold text-slate-800">Valli Hospital Trust</span>.</li>
                                <li>Copy the 12-digit UPI Transaction reference ID.</li>
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
                              className={`w-full bg-white border rounded-xl pl-4 pr-12 py-3 text-xs font-mono tracking-widest text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 ${
                                errors.transactionId ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] hover:border-slate-300"
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

      <Footer />
    </SmoothScroll>
  );
}
