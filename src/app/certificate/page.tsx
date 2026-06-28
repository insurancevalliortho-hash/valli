"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  Star,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Sparkles,
  UserCheck
} from "lucide-react";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";

interface Delegate {
  delegateId: number;
  name: string;
  email: string;
  phone: string;
  regNo: string;
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Average",
  3: "Good",
  4: "Very Good",
  5: "Outstanding!"
};

// Subtle spring transition preset for Apple-like fluid feel
const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 30
};

export default function CertificatePage() {
  const [step, setStep] = useState<"verify" | "feedback" | "certificate">("verify");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [delegate, setDelegate] = useState<Delegate | null>(null);

  // 4 Specific Feedback Questions State - By default 0 (None selected)
  const [q1EventQuality, setQ1EventQuality] = useState<number>(0);
  const [q2SessionRelevance, setQ2SessionRelevance] = useState<number>(0);
  const [q3SpeakerEffectiveness, setQ3SpeakerEffectiveness] = useState<number>(0);
  const [q4OrganizationVenue, setQ4OrganizationVenue] = useState<number>(0);
  const [comments, setComments] = useState<string>("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Trigger celebratory confetti on certificate step
  useEffect(() => {
    if (step === "certificate") {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#004B57", "#007A8C", "#E5E5EA", "#1D1D1F"]
        });
      } catch (e) {
        console.log("Confetti trigger", e);
      }
    }
  }, [step]);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/certificate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Email not found in delegate records.");
        return;
      }

      setDelegate(data.delegate);
      if (data.alreadySubmitted) {
        setStep("certificate");
      } else {
        setStep("feedback");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegate) return;

    if (q1EventQuality === 0 || q2SessionRelevance === 0 || q3SpeakerEffectiveness === 0 || q4OrganizationVenue === 0) {
      alert("Please provide a rating for all 4 questions before submitting.");
      return;
    }

    try {
      setSubmittingFeedback(true);
      const res = await fetch("/api/certificate/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delegateId: delegate.delegateId,
          email: delegate.email,
          q1EventQuality,
          q2SessionRelevance,
          q3SpeakerEffectiveness,
          q4OrganizationVenue,
          comments,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to submit feedback.");
        return;
      }

      setStep("certificate");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // Apple-style Gold Star Rating Control (Default None Selected)
  const renderGoldStarRating = (
    value: number,
    onChange: (val: number) => void
  ) => {
    return (
      <div className="space-y-2.5">
        <div className="bg-[#F5F5F7] p-2.5 sm:p-3 rounded-2xl border border-[#E5E5EA] flex items-center justify-between gap-1 max-w-xs">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = value >= star;
            return (
              <motion.button
                key={star}
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={() => onChange(star)}
                className="p-1.5 sm:p-2 hover:scale-110 transition-transform cursor-pointer touch-manipulation flex-1 flex items-center justify-center"
              >
                <Star
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-200 ${
                    isFilled
                      ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                      : "text-slate-300 hover:text-amber-200"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
        <div className="flex justify-between items-center px-1 max-w-xs text-xs">
          <span className="text-[11px] font-medium text-slate-400">1 - Poor</span>
          {value > 0 ? (
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
              {value} / 5 — {RATING_LABELS[value]}
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-400 italic">
              Tap to rate
            </span>
          )}
          <span className="text-[11px] font-medium text-slate-400">5 - Outstanding</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#004B57] selection:text-white relative overflow-hidden pb-16">
      {/* Frosted Glass Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-black/[0.05] transition-all">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 sm:h-10 w-36 sm:w-48">
              <Image
                src="/logo.png"
                alt="Valli Super Speciality Hospital"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#004B57] bg-[#004B57]/5 px-3 py-1.5 rounded-full border border-[#004B57]/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#004B57] shrink-0" />
            <span className="truncate tracking-tight font-medium">Summit 2026</span>
          </div>
        </div>
      </header>

      {/* Main Container - Mobile First Focus */}
      <main className="max-w-xl mx-auto px-4 pt-8 sm:pt-12 relative z-10">
        {/* Summit Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-center mb-8 space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.03] text-slate-600 border border-black/[0.06] text-[11px] font-semibold tracking-tight">
            <Calendar className="w-3.5 h-3.5 text-[#004B57]" />
            <span>28th June, 2026 • Salem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight leading-snug">
            The Practical Ortho Rheumat Summit 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-md mx-auto">
            Delegate Feedback & Official Certificate Download Portal
          </p>
        </motion.div>

        {/* STEP 1: VERIFY EMAIL */}
        <AnimatePresence mode="wait">
          {step === "verify" && (
            <motion.div
              key="verify-card"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={springTransition}
              className="bg-white border border-[#E5E5EA] rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden"
            >
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] text-[#004B57] mx-auto flex items-center justify-center mb-4 border border-[#E5E5EA]">
                  <Mail className="w-7 h-7 text-[#004B57]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">Enter Registered Email</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto font-normal">
                  Verify your attendance by entering the email address registered for the summit to generate your official certificate.
                </p>
              </div>

              <form onSubmit={handleVerifyEmail} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Delegate Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@example.com"
                    required
                    className="w-full bg-[#F5F5F7] border border-[#E5E5EA] focus:border-[#004B57] focus:bg-white rounded-2xl px-4 py-3.5 text-[#1D1D1F] placeholder-slate-400 text-sm font-medium outline-none transition-all"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50/80 border border-rose-200 text-rose-800 text-xs p-4 rounded-2xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{error}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#004B57] hover:bg-[#003842] text-white font-semibold py-3.5 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify Attendance</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: IMMERSIVE MOBILE-FIRST FEEDBACK FORM */}
          {step === "feedback" && delegate && (
            <motion.div
              key="feedback-card"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={springTransition}
              className="bg-white border border-[#E5E5EA] rounded-3xl p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden space-y-6"
            >
              {/* Delegate Greeting Banner */}
              <div className="bg-[#FBFBFD] border border-[#E5E5EA] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#004B57] mb-1">
                    <UserCheck className="w-3 h-3 text-[#004B57]" /> Verified Delegate
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F] tracking-tight">
                    Welcome, {delegate.name.toLowerCase().startsWith("dr.") || delegate.name.toLowerCase().startsWith("dr ") ? delegate.name : `Dr. ${delegate.name}`}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    MMC Reg No: <span className="font-semibold text-slate-700">{delegate.regNo || `#${delegate.delegateId}`}</span>
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#004B57] text-white shrink-0 flex items-center justify-center font-bold text-lg shadow-sm">
                  {delegate.name.charAt(0)}
                </div>
              </div>

              <div className="border-b border-black/[0.05] pb-3">
                <h4 className="text-base sm:text-lg font-bold text-[#1D1D1F] tracking-tight">Summit Evaluation</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Please rate all 4 questions below to generate your official certificate.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                {/* QUESTION 1 */}
                <div className="space-y-2.5">
                  <label className="block text-xs sm:text-sm font-semibold text-[#1D1D1F] leading-snug">
                    1. How would you rate the overall quality of the event?
                  </label>
                  {renderGoldStarRating(q1EventQuality, setQ1EventQuality)}
                </div>

                {/* QUESTION 2 */}
                <div className="space-y-2.5">
                  <label className="block text-xs sm:text-sm font-semibold text-[#1D1D1F] leading-snug">
                    2. Were the scientific sessions relevant to your clinical practice?
                  </label>
                  {renderGoldStarRating(q2SessionRelevance, setQ2SessionRelevance)}
                </div>

                {/* QUESTION 3 */}
                <div className="space-y-2.5">
                  <label className="block text-xs sm:text-sm font-semibold text-[#1D1D1F] leading-snug">
                    3. How effective were the speakers in explaining the topics clearly?
                  </label>
                  {renderGoldStarRating(q3SpeakerEffectiveness, setQ3SpeakerEffectiveness)}
                </div>

                {/* QUESTION 4 */}
                <div className="space-y-2.5">
                  <label className="block text-xs sm:text-sm font-semibold text-[#1D1D1F] leading-snug">
                    4. Was the event schedule, venue, and overall organization satisfactory?
                  </label>
                  {renderGoldStarRating(q4OrganizationVenue, setQ4OrganizationVenue)}
                </div>

                {/* Additional Comments */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Additional Feedback (Optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share any key takeaways or suggested improvements..."
                    rows={3}
                    className="w-full bg-[#F5F5F7] border border-[#E5E5EA] focus:border-[#004B57] focus:bg-white rounded-2xl p-3.5 text-[#1D1D1F] placeholder-slate-400 text-sm font-medium outline-none transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submittingFeedback}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#004B57] hover:bg-[#003842] text-white font-semibold py-3.5 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                >
                  {submittingFeedback ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Submit & Access Certificate</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS & CERTIFICATE GENERATION */}
          {step === "certificate" && delegate && (
            <motion.div
              key="certificate-card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springTransition}
            >
              <CertificateTemplate delegateName={delegate.name} regNo={delegate.regNo} showPreview={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-400 space-y-1">
        <p className="font-medium text-slate-500">© 2026 Valli Super Speciality Hospital. All Rights Reserved.</p>
        <p className="text-[11px] text-slate-400">The Practical Ortho Rheumat Summit 2026 • Hotel Grand Estancia, Salem</p>
      </footer>
    </div>
  );
}
