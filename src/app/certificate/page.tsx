"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Mail, Star, Award, CheckCircle2, AlertCircle, Sparkles, User, ShieldCheck, ArrowRight, Calendar, MapPin } from "lucide-react";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";

interface Delegate {
  delegateId: number;
  name: string;
  email: string;
  phone: string;
  regNo: string;
}

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
      setError("An unexpected error occurred. Please try again.");
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Dynamic Light Header with User's Hospital Logo */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-48 sm:w-56">
              <Image
                src="/logo.png"
                alt="Valli Super Speciality Hospital"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/60">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Practical Ortho Rheumat Summit 2026
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Summit Banner Info */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase">
            <Calendar className="w-3.5 h-3.5 text-teal-700" /> 28th June, 2026 • Salem, Tamil Nadu
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Delegate Feedback & Certificate Portal
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Welcome to the official portal for <span className="font-semibold text-slate-800">The Practical Ortho Rheumat Summit 2026</span>. Please enter your registered email below to proceed.
          </p>
        </div>

        {/* STEP 1: VERIFY EMAIL */}
        {step === "verify" && (
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
            
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 mx-auto flex items-center justify-center mb-3 border border-teal-100 shadow-inner">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Enter Registered Email</h3>
              <p className="text-xs text-slate-500 mt-1">
                Verify your registration email to access your feedback form and download your certificate.
              </p>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. doctor@gmail.com"
                  required
                  className="w-full bg-slate-50 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: FEEDBACK FORM WITH EXACT 4 QUESTIONS */}
        {step === "feedback" && delegate && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50/50 border border-teal-100 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-teal-800 font-bold uppercase tracking-wider">Welcome Delegate</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                  Welcome, {delegate.name.toLowerCase().startsWith("dr.") || delegate.name.toLowerCase().startsWith("dr ") ? delegate.name : `Dr. ${delegate.name}`}!
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Registration / MMC No: {delegate.regNo || `#${delegate.delegateId}`}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white shrink-0 flex items-center justify-center font-bold text-xl shadow-md">
                {delegate.name.charAt(0)}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-slate-900">Summit Feedback Form</h4>
              <p className="text-xs text-slate-500 mt-1">
                Please rate your experience below. Upon submission, your official certificate will be ready for instant download.
              </p>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              {/* Question 1 */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <label className="block text-sm font-bold text-slate-900 leading-snug">
                  1. How would you rate the overall quality of the event?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setQ1EventQuality(star)}
                      className="p-1.5 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= q1EventQuality
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{q1EventQuality} / 5 Stars</span>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <label className="block text-sm font-bold text-slate-900 leading-snug">
                  2. Were the scientific sessions relevant to your clinical practice?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setQ2SessionRelevance(star)}
                      className="p-1.5 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= q2SessionRelevance
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{q2SessionRelevance} / 5 Stars</span>
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <label className="block text-sm font-bold text-slate-900 leading-snug">
                  3. How effective were the speakers in explaining the topics clearly?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setQ3SpeakerEffectiveness(star)}
                      className="p-1.5 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= q3SpeakerEffectiveness
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{q3SpeakerEffectiveness} / 5 Stars</span>
                </div>
              </div>

              {/* Question 4 */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <label className="block text-sm font-bold text-slate-900 leading-snug">
                  4. Was the event schedule, venue, and overall organization satisfactory?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setQ4OrganizationVenue(star)}
                      className="p-1.5 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= q4OrganizationVenue
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{q4OrganizationVenue} / 5 Stars</span>
                </div>
              </div>

              {/* Additional Comments */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <label className="block text-sm font-bold text-slate-900">
                  Additional Comments & Feedback (Optional)
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share any key takeaways or suggestions..."
                  rows={3}
                  className="w-full bg-white border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 rounded-xl p-3.5 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingFeedback}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
              >
                {submittingFeedback ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Submit Feedback & Continue</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: CERTIFICATE CONFIRMATION & PDF DOWNLOAD (NO PREVIEW ON SCREEN) */}
        {step === "certificate" && delegate && (
          <CertificateTemplate delegateName={delegate.name} regNo={delegate.regNo} showPreview={false} />
        )}
      </main>

      {/* Light Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500 bg-white">
        <p>© 2026 Valli Super Speciality Hospital. All Rights Reserved.</p>
        <p className="mt-1 font-medium text-slate-600">The Practical Ortho Rheumat Summit 2026 • Hotel Grand Estancia, Salem</p>
      </footer>
    </div>
  );
}
