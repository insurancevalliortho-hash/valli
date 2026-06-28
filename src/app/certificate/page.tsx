"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  Star,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Calendar,
  MapPin,
  Heart,
  ChevronRight,
  RefreshCcw,
  Download,
  Check,
  Building2,
  ThumbsUp,
  MessageSquare
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

export default function CertificatePage() {
  const [step, setStep] = useState<"verify" | "feedback" | "certificate">("verify");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [delegate, setDelegate] = useState<Delegate | null>(null);

  // 4 Specific Feedback Questions State
  const [q1EventQuality, setQ1EventQuality] = useState<number>(5);
  const [q2SessionRelevance, setQ2SessionRelevance] = useState<number>(5);
  const [q3SpeakerEffectiveness, setQ3SpeakerEffectiveness] = useState<number>(5);
  const [q4OrganizationVenue, setQ4OrganizationVenue] = useState<number>(5);
  const [comments, setComments] = useState<string>("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Trigger celebratory confetti on certificate step
  useEffect(() => {
    if (step === "certificate") {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#004B57", "#00A896", "#FF8C00", "#FFD166"]
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 text-slate-900 font-sans selection:bg-[#004B57] selection:text-white relative overflow-hidden pb-12">
      {/* Immersive Floating Ambient Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-100px] left-[10%] w-[350px] h-[350px] bg-teal-300/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[50px] right-[10%] w-[300px] h-[300px] bg-orange-300/15 rounded-full blur-[100px]" />
      </div>

      {/* Header Navigation */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm transition-all">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 sm:h-11 w-40 sm:w-52">
              <Image
                src="/logo.png"
                alt="Valli Super Speciality Hospital"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#004B57] bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200/60 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">Summit 2026</span>
          </div>
        </div>
      </header>

      {/* Main Container - Mobile First Focus */}
      <main className="max-w-xl mx-auto px-4 pt-6 sm:pt-10 relative z-10">
        {/* Summit Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.2 rounded-full bg-white text-[#004B57] border border-teal-200/80 text-[11px] font-extrabold shadow-sm tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Calendar className="w-3.5 h-3.5 text-teal-600" /> 28th June, 2026 • Salem
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug font-display">
            The Practical Ortho Rheumat Summit 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium px-2">
            Delegate Feedback & Participation Certificate Portal
          </p>
        </motion.div>

        {/* STEP 1: VERIFY EMAIL */}
        <AnimatePresence mode="wait">
          {step === "verify" && (
            <motion.div
              key="verify-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200/90 rounded-[2rem] p-6 sm:p-8 shadow-2xl shadow-teal-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#004B57] via-[#00A896] to-[#FF8C00]" />

              <div className="text-center mb-7">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#004B57] mx-auto flex items-center justify-center mb-4 border border-teal-100 shadow-inner">
                  <Mail className="w-8 h-8 text-[#004B57]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Enter Registered Email</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-sm mx-auto">
                  Enter the email address you registered with to verify your attendance and claim your certificate.
                </p>
              </div>

              <form onSubmit={handleVerifyEmail} className="space-y-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Delegate Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@gmail.com"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#004B57] focus:bg-white rounded-2xl px-4 py-4 text-slate-900 placeholder-slate-400 text-sm font-medium outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-2xl flex items-start gap-3 shadow-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#004B57] via-[#00606F] to-[#00A896] hover:opacity-95 text-white font-bold py-4 rounded-2xl shadow-xl shadow-teal-900/15 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] disabled:opacity-50 text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify Attendance</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: IMMERSIVE MOBILE-FIRST FEEDBACK FORM */}
          {step === "feedback" && delegate && (
            <motion.div
              key="feedback-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200/90 rounded-[2rem] p-5 sm:p-8 shadow-2xl shadow-teal-900/5 relative overflow-hidden space-y-6"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#004B57] to-[#00A896]" />

              {/* Delegate Greeting Banner */}
              <div className="bg-gradient-to-br from-teal-50 via-emerald-50/40 to-white border border-teal-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#004B57] mb-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Delegate Verified
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Welcome, {delegate.name.toLowerCase().startsWith("dr.") || delegate.name.toLowerCase().startsWith("dr ") ? delegate.name : `Dr. ${delegate.name}`}!
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-2">
                    MMC Reg No: <span className="font-bold text-slate-800">{delegate.regNo || `#${delegate.delegateId}`}</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#004B57] text-white shrink-0 flex items-center justify-center font-black text-xl shadow-md shadow-teal-900/20">
                  {delegate.name.charAt(0)}
                </div>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-lg font-extrabold text-slate-900">Summit Feedback</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your feedback helps us continuously improve our scientific conferences.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                {/* QUESTION 1 */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm hover:border-teal-200 transition-colors">
                  <label className="block text-sm font-bold text-slate-900 leading-snug">
                    1. How would you rate the overall quality of the event?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1 max-w-xs">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setQ1EventQuality(star)}
                          className="p-2 hover:scale-115 active:scale-90 transition-transform cursor-pointer touch-manipulation"
                        >
                          <Star
                            className={`w-8 h-8 sm:w-9 sm:h-9 ${
                              star <= q1EventQuality
                                ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-xs font-extrabold text-[#004B57] bg-teal-50 inline-block px-3 py-1 rounded-lg border border-teal-100">
                      {q1EventQuality} / 5 — {RATING_LABELS[q1EventQuality]}
                    </div>
                  </div>
                </div>

                {/* QUESTION 2 */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm hover:border-teal-200 transition-colors">
                  <label className="block text-sm font-bold text-slate-900 leading-snug">
                    2. Were the scientific sessions relevant to your clinical practice?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1 max-w-xs">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setQ2SessionRelevance(star)}
                          className="p-2 hover:scale-115 active:scale-90 transition-transform cursor-pointer touch-manipulation"
                        >
                          <Star
                            className={`w-8 h-8 sm:w-9 sm:h-9 ${
                              star <= q2SessionRelevance
                                ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-xs font-extrabold text-[#004B57] bg-teal-50 inline-block px-3 py-1 rounded-lg border border-teal-100">
                      {q2SessionRelevance} / 5 — {RATING_LABELS[q2SessionRelevance]}
                    </div>
                  </div>
                </div>

                {/* QUESTION 3 */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm hover:border-teal-200 transition-colors">
                  <label className="block text-sm font-bold text-slate-900 leading-snug">
                    3. How effective were the speakers in explaining the topics clearly?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1 max-w-xs">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setQ3SpeakerEffectiveness(star)}
                          className="p-2 hover:scale-115 active:scale-90 transition-transform cursor-pointer touch-manipulation"
                        >
                          <Star
                            className={`w-8 h-8 sm:w-9 sm:h-9 ${
                              star <= q3SpeakerEffectiveness
                                ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-xs font-extrabold text-[#004B57] bg-teal-50 inline-block px-3 py-1 rounded-lg border border-teal-100">
                      {q3SpeakerEffectiveness} / 5 — {RATING_LABELS[q3SpeakerEffectiveness]}
                    </div>
                  </div>
                </div>

                {/* QUESTION 4 */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm hover:border-teal-200 transition-colors">
                  <label className="block text-sm font-bold text-slate-900 leading-snug">
                    4. Was the event schedule, venue, and overall organization satisfactory?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1 max-w-xs">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setQ4OrganizationVenue(star)}
                          className="p-2 hover:scale-115 active:scale-90 transition-transform cursor-pointer touch-manipulation"
                        >
                          <Star
                            className={`w-8 h-8 sm:w-9 sm:h-9 ${
                              star <= q4OrganizationVenue
                                ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-xs font-extrabold text-[#004B57] bg-teal-50 inline-block px-3 py-1 rounded-lg border border-teal-100">
                      {q4OrganizationVenue} / 5 — {RATING_LABELS[q4OrganizationVenue]}
                    </div>
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-sm">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Additional Comments & Takeaways (Optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share any thoughts or key learnings..."
                    rows={3}
                    className="w-full bg-white border border-slate-300 focus:border-[#004B57] focus:ring-2 focus:ring-teal-500/20 rounded-xl p-3.5 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all resize-none font-medium"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="w-full bg-gradient-to-r from-[#004B57] via-[#00606F] to-[#00A896] hover:opacity-95 text-white font-bold py-4 rounded-2xl shadow-xl shadow-teal-900/15 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] disabled:opacity-50 text-base"
                >
                  {submittingFeedback ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Submit & Generate Certificate</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS & CERTIFICATE GENERATION */}
          {step === "certificate" && delegate && (
            <motion.div
              key="certificate-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <CertificateTemplate delegateName={delegate.name} regNo={delegate.regNo} showPreview={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-500 space-y-1">
        <p className="font-medium text-slate-600">© 2026 Valli Super Speciality Hospital. All Rights Reserved.</p>
        <p className="text-[11px] text-slate-400">The Practical Ortho Rheumat Summit 2026 • Hotel Grand Estancia, Salem</p>
      </footer>
    </div>
  );
}
