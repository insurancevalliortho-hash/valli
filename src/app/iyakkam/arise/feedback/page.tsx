"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Phone,
  User,
  Star,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

interface Delegate {
  registrationId: number;
  registrationCode: string;
  fullName: string;
  email: string;
  mobile: string;
  category: string;
  institution: string;
  isVerified: boolean;
  alreadySubmitted?: boolean;
}

const ratingLabels: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Outstanding!",
};

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 30,
};

export default function AriseFeedbackPage() {
  const [step, setStep] = useState<"verify" | "select" | "feedback" | "thankyou">("verify");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [multipleDelegates, setMultipleDelegates] = useState<Delegate[]>([]);
  const [delegate, setDelegate] = useState<Delegate | null>(null);

  // 5 feedback questions
  const [q1EventQuality, setQ1EventQuality] = useState(0);
  const [q2SessionRelevance, setQ2SessionRelevance] = useState(0);
  const [q3SpeakerEffectiveness, setQ3SpeakerEffectiveness] = useState(0);
  const [q4HandsOnWorkshop, setQ4HandsOnWorkshop] = useState(0);
  const [q5OrganizationVenue, setQ5OrganizationVenue] = useState(0);
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (step === "thankyou") {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#003d47", "#00A896", "#67e8d8", "#ffffff"] });
        setTimeout(() => confetti({ particleCount: 40, spread: 50, origin: { y: 0.5, x: 0.2 }, colors: ["#003d47", "#00A896"] }), 400);
        setTimeout(() => confetti({ particleCount: 40, spread: 50, origin: { y: 0.5, x: 0.8 }, colors: ["#003d47", "#00A896"] }), 700);
      } catch {}
    }
  }, [step]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleaned = mobileNumber.replace(/\D/g, "");
    if (cleaned.length < 10) {
      setError("Please enter a valid 10-digit registered mobile number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/arise/feedback/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: cleaned }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No registration found for this mobile number.");
        return;
      }

      if (data.multiple && data.delegates && data.delegates.length > 1) {
        setMultipleDelegates(data.delegates);
        setStep("select");
      } else {
        const del = data.delegate || (data.delegates && data.delegates[0]);
        setDelegate(del);
        if (data.alreadySubmitted || del?.alreadySubmitted) {
          setStep("thankyou");
        } else {
          setStep("feedback");
        }
      }
    } catch {
      setError("Connection error. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDelegate = (del: Delegate) => {
    setDelegate(del);
    if (del.alreadySubmitted) {
      setStep("thankyou");
    } else {
      setStep("feedback");
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegate) return;
    if ([q1EventQuality, q2SessionRelevance, q3SpeakerEffectiveness, q4HandsOnWorkshop, q5OrganizationVenue].some(v => v === 0)) {
      alert("Please provide a star rating for all 5 questions before submitting.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/arise/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: delegate.registrationId,
          email: delegate.email,
          q1EventQuality,
          q2SessionRelevance,
          q3SpeakerEffectiveness,
          q4HandsOnWorkshop,
          q5OrganizationVenue,
          comments,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to submit feedback. Please try again.");
        return;
      }
      setStep("thankyou");
    } catch {
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStarRating = (value: number, onChange: (v: number) => void) => (
    <div className="space-y-2.5">
      <div className="bg-[#f0fdf9] p-2.5 sm:p-3 rounded-2xl border border-teal-100 flex items-center justify-between gap-1 max-w-xs">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = value >= star;
          return (
            <motion.button
              key={star}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => onChange(star)}
              className="p-1.5 sm:p-2 hover:scale-110 transition-transform cursor-pointer touch-manipulation flex-1 flex items-center justify-center"
            >
              <Star className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-150 ${filled ? "text-amber-400 fill-amber-400 drop-shadow-sm" : "text-slate-300 hover:text-amber-200"}`} />
            </motion.button>
          );
        })}
      </div>
      <div className="h-5">
        {value > 0 ? (
          <motion.p
            key={value}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold text-[#00A896]"
          >
            {value} ★ — {ratingLabels[value]}
          </motion.p>
        ) : (
          <p className="text-xs text-slate-400 italic">Tap a star to rate</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] selection:bg-[#00A896]/20 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E5EA]">
        <div className="max-w-4xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 sm:h-10 w-36 sm:w-44">
              <Image
                src="/logo.png"
                alt="Valli Super Speciality Hospital"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex flex-col">
              <span className="font-bold text-[#003d47] text-sm tracking-tight leading-none">
                ARISE 2026
              </span>
              <span className="text-[10px] text-[#00A896] font-semibold tracking-wider uppercase">
                Delegate Feedback
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#003d47] bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
            <span className="truncate tracking-tight font-medium">KIOT Salem</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 pt-8 sm:pt-12 relative z-10">
        {/* Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-center mb-8 space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.03] text-slate-600 border border-black/[0.06] text-[11px] font-semibold tracking-tight">
            <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
            <span>17 October 2026 • Salem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight leading-snug">
            ARISE 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-sm mx-auto">
            Advancements in Recovery, Intelligence &amp; Sports Engineering
          </p>
          <p className="text-xs text-[#00A896] font-semibold">
            Delegate Feedback Portal
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ─── STEP 1: VERIFY BY MOBILE NUMBER ─── */}
          {step === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={springTransition}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
            >
              <div className="text-center mb-7">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#003d47] mx-auto flex items-center justify-center mb-4 border border-teal-100 shadow-inner">
                  <Phone className="w-8 h-8 text-[#00A896]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
                  Enter Mobile Number
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto font-normal">
                  Enter your registered mobile number to access your feedback form and share your thoughts.
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Registered Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center gap-1.5 text-slate-500 text-sm font-semibold pointer-events-none select-none">
                      <span className="text-[#00A896]">🇮🇳 +91</span>
                      <div className="w-px h-4 bg-slate-200" />
                    </div>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setMobileNumber(val);
                      }}
                      placeholder="98765 43210"
                      maxLength={10}
                      autoFocus
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#00A896] focus:bg-white rounded-2xl pl-24 pr-4 py-3.5 text-[#0f172a] placeholder-slate-400 text-base font-semibold tracking-wider outline-none transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 ml-1">
                    Enter the 10-digit mobile number given during registration
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-2xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{error}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading || mobileNumber.replace(/\D/g, "").length < 10}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#003d47] hover:bg-[#002e37] text-white font-semibold py-3.5 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continue to Feedback</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* ─── STEP 1.5: MULTIPLE DELEGATES SELECTION (FOR BULK GROUPS) ─── */}
          {step === "select" && multipleDelegates.length > 0 && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={springTransition}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#003d47] mx-auto flex items-center justify-center mb-3 border border-teal-100">
                  <User className="w-7 h-7 text-[#00A896]" />
                </div>
                <h2 className="text-xl font-bold text-[#0f172a] tracking-tight">
                  Select Your Name
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Multiple delegates are registered under +91 {mobileNumber}. Please choose your name to fill out your feedback:
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {multipleDelegates.map((del) => (
                  <motion.button
                    key={del.registrationId}
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectDelegate(del)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#00A896] hover:bg-teal-50/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 text-sm group-hover:text-[#003d47] flex items-center gap-2">
                        <span>{del.fullName}</span>
                        {del.alreadySubmitted && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Submitted ✓
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className="font-mono font-semibold text-[#00A896]">{del.registrationCode}</span>
                        <span>•</span>
                        <span className="truncate max-w-[180px]">{del.institution || del.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00A896] group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep("verify");
                  setError(null);
                }}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Use a different mobile number</span>
              </button>
            </motion.div>
          )}

          {/* ─── STEP 2: FEEDBACK FORM ─── */}
          {step === "feedback" && delegate && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={springTransition}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
            >
              {/* Delegate ID Card Header */}
              <div className="bg-gradient-to-r from-teal-50/80 to-emerald-50/50 border border-teal-100 rounded-2xl p-4 sm:p-5 mb-7 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A896]">Verified Delegate</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a] mt-0.5">
                    {delegate.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono font-medium mt-0.5">
                    {delegate.registrationCode}
                  </p>
                  {delegate.institution && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[240px]">{delegate.institution}</span>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("verify");
                    setDelegate(null);
                  }}
                  className="text-[11px] font-medium text-slate-400 hover:text-slate-600 underline underline-offset-2 shrink-0 self-start"
                >
                  Change
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">
                  Your Valuable Experience
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Please rate each parameter from 1 to 5 stars to help us improve future conferences.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-7">
                {/* Q1 */}
                <div className="border-b border-slate-100 pb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    1. Overall Event Quality &amp; Relevance <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    How would you rate the overall theme, topics, and value of ARISE 2026?
                  </p>
                  {renderStarRating(q1EventQuality, setQ1EventQuality)}
                </div>

                {/* Q2 */}
                <div className="border-b border-slate-100 pb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    2. Scientific Sessions &amp; Clinical Applicability <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    How practical, current, and applicable were the clinical lectures?
                  </p>
                  {renderStarRating(q2SessionRelevance, setQ2SessionRelevance)}
                </div>

                {/* Q3 */}
                <div className="border-b border-slate-100 pb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    3. Speaker Expertise &amp; Communication <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Did the faculty present clearly and address queries effectively?
                  </p>
                  {renderStarRating(q3SpeakerEffectiveness, setQ3SpeakerEffectiveness)}
                </div>

                {/* Q4 */}
                <div className="border-b border-slate-100 pb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    4. Hands-on Workshop &amp; Equipment <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    How satisfied are you with the practical hands-on demonstration and training?
                  </p>
                  {renderStarRating(q4HandsOnWorkshop, setQ4HandsOnWorkshop)}
                </div>

                {/* Q5 */}
                <div className="border-b border-slate-100 pb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    5. Venue, Hospitality &amp; Organization <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    How was the overall management, audio/visuals, food, and venue arrangements at KIOT?
                  </p>
                  {renderStarRating(q5OrganizationVenue, setQ5OrganizationVenue)}
                </div>

                {/* Optional Comments */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Suggestions &amp; Additional Feedback <span className="text-xs font-normal text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share any specific appreciation, key takeaways, or suggestions for our next edition..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#00A896] focus:bg-white rounded-2xl p-4 text-[#0f172a] placeholder-slate-400 text-sm outline-none transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#003d47] hover:bg-[#002e37] text-white font-semibold py-4 rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <Sparkles className="w-4 h-4 text-[#00A896]" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* ─── STEP 3: THANK YOU ─── */}
          {step === "thankyou" && (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springTransition}
              className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.05)] text-center"
            >
              <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200 mx-auto flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#00A896]" />
              </div>

              <span className="text-xs font-bold text-[#00A896] tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                Feedback Recorded
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight mt-4">
                Thank You, {delegate?.fullName || "Delegate"}!
              </h2>

              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Your feedback has been successfully submitted. It will help us make future editions of ARISE and our academic programs even more impactful!
              </p>

              {delegate && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-xs mx-auto mt-6 text-left">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pass Code</div>
                  <div className="font-mono font-bold text-slate-800 text-sm">{delegate.registrationCode}</div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-2">Delegate</div>
                  <div className="text-xs font-medium text-slate-700">{delegate.fullName}</div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/iyakkam/arise"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#003d47] hover:bg-[#002e37] text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all"
                >
                  Return to ARISE 2026 Home
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStep("verify");
                    setMobileNumber("");
                    setDelegate(null);
                    setMultipleDelegates([]);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Submit Another Delegate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
