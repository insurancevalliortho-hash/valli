"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Brain,
  Activity,
  Watch,
  BarChart3,
  ChevronRight,
  TrendingUp
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Footer from "../../../components/Footer";

// ─── Animated Number Component ────────────────────────────────────────────────
function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const startTime = performance.now();

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMiliseconds, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * (end - start) + start);
      setCurrent(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(updateNumber);
      }
    };

    window.requestAnimationFrame(updateNumber);
  }, [isInView, value, duration]);

  return <span ref={ref}>₹{current.toLocaleString("en-IN")}</span>;
}


// ─── Countdown Timer Component ────────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const targetDate = new Date("2026-07-15T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 justify-center sm:justify-start">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" }
      ].map((t, idx) => (
        <div key={idx} className="bg-white text-slate-800 border border-slate-150 rounded-[1.25rem] p-4 text-center min-w-[85px] shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,168,150,0.08)] transition-all duration-300 relative overflow-hidden border-t-4 border-t-[#FF8C00]">
          <div className="font-display text-3xl font-black tracking-tight leading-none text-[#FF8C00]">
            {t.value.toString().padStart(2, "0")}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="about"
      className="grid-bg-dots"
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 110,
        paddingBottom: 60,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 items-center">

          {/* Left Block */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(38px, 4vw, 72px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 0.95,
                  color: "#004B57",
                }}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-2"
              >
                <span>TECHNNO<span className="text-[#FF8C00]">VATIONS</span></span>
                <span className="bg-[#FF8C00] text-white px-4 py-1.5 rounded-xl text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight shadow-md shadow-orange/10 leading-none self-center">
                  2026
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--ink-mid)",
                maxWidth: 480,
                lineHeight: 1.65,
              }}
            >
              The premier national project expo and Sport<span className="text-[#FF8C00]">AI</span>thon for college innovators. Build the future of athletic recovery, wearable telemetry, and computer-vision kinesiology.
              <span className="block text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">
                Organised by Valli Super Speciality Hospital - Iyakkam CME
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/iyakkam/technnovations/register"
                className="btn-primary btn-orange"
                style={{ padding: "14px 32px", borderRadius: 12, fontSize: 14 }}
              >
                Register Now
                <ArrowRight size={16} />
              </Link>
              <a
                href="#tracks"
                className="btn-primary btn-outline-navy"
                style={{ padding: "14px 32px", borderRadius: 12, fontSize: 14 }}
              >
                Explore Tracks <ChevronRight size={14} />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-xs font-semibold text-slate-400 mt-2 text-left"
            >
              Already registered? Upload project presentation slides at the{" "}
              <Link href="/iyakkam/technnovations/portal" className="text-teal hover:underline font-bold">
                Leader Submission Portal
              </Link>
            </motion.p>

            {/* Telemetry info ribbon (Minimalist / Editorial) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-6 border-t border-slate-200 max-w-[480px]"
            >
              <div className="grid grid-cols-3 gap-6 text-slate-800">
                {[
                  { label: "Prize Pool", val: "₹60,000+", color: "text-[#FF8C00]" },
                  { label: "Category Tracks", val: "4 Paths", color: "text-[#004B57]" },
                  { label: "Submission", val: "July 15", color: "text-[#004B57]" }
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {s.label}
                    </span>
                    <span className={`font-display text-2xl font-black tracking-tight block ${s.color}`}>
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Block: Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex items-center justify-center w-full max-w-[500px] mx-auto lg:max-w-none aspect-square lg:h-[500px]"
          >
            <DotLottieReact
              src="https://lottie.host/3d2b8da5-ca4c-4cbc-9683-fe6ab3f4bdb1/vg4lqHCZuw.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Topic Tracks Section ────────────────────────────────────────────────────
const TRACKS = [
  {
    icon: <Brain size={24} strokeWidth={1.8} style={{ color: "var(--teal)" }} />,
    title: "AI Injury Detection",
    desc: "Deploy neural networks on orthopaedic data to predict strain locations, locate microfractures, and evaluate joint load limits.",
    ideas: ["ACL strain classifier from dynamic video feedback", "Scoliosis progression models from optical posture scans", "Foot contact stress mapping via tensor plating"],
    stack: "PyTorch, YOLOv8, OpenCV, React Native",
    rubric: "Clinical Accuracy (40%), Technical Depth (30%), Design Feasibility (30%)"
  },
  {
    icon: <Activity size={24} strokeWidth={1.8} style={{ color: "var(--teal)" }} />,
    title: "Return to Play Assessment",
    desc: "Create dynamic logic engines to gauge athlete load tolerance, compute range-of-motion metrics, and declare recovery thresholds.",
    ideas: ["Real-time dynamic knee range-of-motion capture app", "Shoulder rotation asymmetry mapping for cricketers", "Biomechanical recovery countdown model"],
    stack: "TensorFlow Lite, MediaPipe, Swift, Kotlin",
    rubric: "Clinical Viability (40%), Execution UX (30%), Innovation Level (30%)"
  },
  {
    icon: <Watch size={24} strokeWidth={1.8} style={{ color: "var(--teal)" }} />,
    title: "Wearable Rehab Tech",
    desc: "Build telemetry channels linking muscle sensors, IoT bands, and mobile graphs to monitor post-op joint movements.",
    ideas: ["EMG-integrated wearable knee brace transmitter", "Cadence analysis band with haptic footbed correction", "Smartwatch ECG recovery tracker dashboard"],
    stack: "ESP32, BLE Protocol, Arduino, Next.js WebSockets",
    rubric: "Hardware Execution (40%), Data Visuals (30%), Market Potential (30%)"
  },
  {
    icon: <BarChart3 size={24} strokeWidth={1.8} style={{ color: "var(--teal)" }} />,
    title: "AI in Sports Analytics",
    desc: "Harness predictive algorithms to isolate speed leaks, refine athletic posture, and calculate athletic potential indices.",
    ideas: ["Running cadence telemetry tracker with speech feedback", "Pose-estimation platform for weightlifting velocity", "Athlete kinetic energy expenditure calculator"],
    stack: "Python, Scikit-Learn, React, Chart.js",
    rubric: "Analytical Depth (40%), Dashboard Usability (30%), Scale Potential (30%)"
  },
];

function TopicTracks() {
  return (
    <section
      id="tracks"
      className="relative overflow-hidden grid-bg-dots"
      style={{
        background: "#FFFFFF",
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">

        {/* Title */}
        <div className="mb-12">
          <span className="eyebrow">EXPEDITION ROADMAPS</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase" style={{ marginBottom: 12 }}>
            CHALLENGE TRACK CATEGORIES
          </h2>
          <p className="text-slate-550 font-semibold text-xs sm:text-sm max-w-xl leading-relaxed">
            Select one of our four sports-medicine development lanes. Form your team, pick a path, and design the future of rehabilitation.
          </p>
        </div>

        {/* Tracks Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACKS.map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-lift relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 min-h-[250px]"
            >
              <div className="absolute top-4 right-6 text-5xl font-display font-black text-slate-100/60 select-none pointer-events-none">
                0{i + 1}
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-11 h-11 bg-[#E0F2F1] border border-[#004B57]/15 rounded-xl flex items-center justify-center">
                  {track.icon}
                </div>
                <h3 className="font-display text-base font-extrabold tracking-tight uppercase text-[#004B57]">
                  {track.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {track.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Prize Section ────────────────────────────────────────────────────────────
function PrizeSection() {
  return (
    <section
      id="prizes"
      className="relative overflow-hidden grid-bg-dots"
      style={{
        background: "#FFFFFF",
        paddingTop: 96,
        paddingBottom: 96,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>HONOUR ROLL &amp; COMPENSATION</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase" style={{ marginBottom: 12 }}>
            Prize Pool &amp; Incubation Perks
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Substantial funding support and lab access guarantees for top teams to push prototypes into production.
          </p>
        </div>

        {/* Olympic Podium Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-5xl mx-auto">
          {/* 2nd Place: Left Flank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-lift bg-white border border-slate-200 border-l-4 border-l-[#004B57] rounded-3xl p-8 flex flex-col justify-between flex-1 relative order-2 lg:order-1 self-center h-auto min-h-[360px]"
          >
            <div className="space-y-4">
              <span className="pill pill-teal">2nd Place Runner-Up</span>
              <div className="w-11 h-11 bg-[#E0F2F1] border border-[#004B57]/15 rounded-xl flex items-center justify-center text-[#004B57] shadow-inner">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="10" r="6" />
                  <path d="M12 16v6M9 22h6" />
                </svg>
              </div>
              <div className="prize-count text-[#004B57] font-display text-4xl font-black tracking-tight">
                <AnimatedNumber value={20000} />
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Outstanding technical execution, functional prototype deployment, and accurate gait mapping logic.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              INCLUDES SILVER MEDAL
            </div>
          </motion.div>

          {/* 1st Place: Elevated Center */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="card-lift bg-white text-[#1A1A2E] border-2 border-[#FF8C00] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between flex-1 relative order-1 lg:order-2 lg:-translate-y-4 z-10 shadow-xl shadow-orange/10 min-h-[420px]"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="pill pill-orange">1st Place Winner</span>
                <span className="text-[#FF8C00] font-bold text-[10px] tracking-widest font-mono">CHAMPIONSHIP</span>
              </div>
              <div className="w-14 h-14 bg-[#FFF8F0] border border-[#FF8C00]/20 rounded-2xl flex items-center justify-center text-[#FF8C00] shadow-inner">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
                </svg>
              </div>
              <div className="prize-count text-[#FF8C00] font-display text-5xl md:text-6xl font-black tracking-tight">
                <AnimatedNumber value={30000} />
              </div>
              <p className="text-slate-600 font-semibold text-xs leading-relaxed">
                Highest scoring project across all vectors of feasibility, clinical depth, wearable execution, and presentation pitch.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-8 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <span>GOLD CUP + SHIELD</span>
              <span className="text-[#FF8C00] font-black">TOP SCORE</span>
            </div>
          </motion.div>

          {/* 3rd Place / Special Mention: Right Flank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-lift bg-white border border-slate-200 border-l-4 border-l-slate-400 rounded-3xl p-8 flex flex-col justify-between flex-1 relative order-3 self-center h-auto min-h-[360px]"
          >
            <div className="space-y-4">
              <span className="pill" style={{ background: "#F1F5F9", color: "#475569" }}>3rd Place Special Mention</span>
              <div className="w-11 h-11 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 shadow-inner">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="prize-count text-slate-800 font-display text-4xl font-black tracking-tight">
                <AnimatedNumber value={10000} />
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Outstanding presentation, unique problem-solving methodology, or high novelty in biomechanical research vectors.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              INCLUDES BRONZE MEDAL
            </div>
          </motion.div>
        </div>

        {/* Incubation Perks ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Clinical Mentoring", desc: "Coaching by Valli Hospital orthopaedic surgeons and biomechanics physical therapists." },
              { title: "Lab Workspace Access", desc: "Gain permission to execute testing cycles at the Iyakkam Rehabilitation Center labs." },
              { title: "Fast-Track Incubation", desc: "Direct evaluation pathway for Seed funding pathways via Valli Incubation division." }
            ].map((p, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="text-[#FF8C00] font-bold font-mono text-sm">✓</div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase text-[#004B57] tracking-wider">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Register Section ─────────────────────────────────────────────────────────
function RegisterSection() {
  return (
    <section
      id="register"
      className="relative overflow-hidden grid-bg-dots"
      style={{
        background: "#F8FAFC",
        paddingTop: 110,
        paddingBottom: 110,
        borderTop: "1.5px solid #E2E8F0",
      }}
    >
      {/* Decorative accent orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E0F2F1]/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-12 items-center">

          {/* Left Block - Countdown & details */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="eyebrow">EXPIRY AND REGISTRATION LIMITS</span>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#004B57] uppercase leading-none">
                Gateway Closes in...
              </h2>
              <div className="w-16 h-1 bg-[#FF8C00] rounded-full mt-2" />
            </div>

            {/* Live Countdown Clock */}
            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-[2rem] shadow-inner inline-block">
              <CountdownTimer />
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {[
                {
                  title: "Verification Gate",
                  desc: "Standard entry fee of ₹3,000 on submission. Free to initial team draft setup.",
                  icon: <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                },
                {
                  title: "Leader Submission Portal",
                  desc: "Log in with your Team Registration Code and Email to upload project PPT/PDF (up to 5MB).",
                  icon: <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                },
                {
                  title: "Acceptance Notice",
                  desc: "Review notifications dispatched within 48 hours of document uploads.",
                  icon: <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.5 0l-2.25 1.5" /></svg>
                },
                {
                  title: "Submission Deadline",
                  desc: "July 15, 2026 midnight IST. Absolutely no late entries permitted.",
                  icon: <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                }
              ].map((d, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,168,150,0.06)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#E0F2F1] text-[#004B57] rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    {d.icon}
                  </div>
                  <div className="self-center">
                    <h4 className="font-display text-xs font-bold uppercase text-[#004B57] tracking-wider">{d.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Block - Overhauled Registration CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="relative border border-slate-200 rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden group min-w-0"
          >
            {/* Top border accent */}
            <div className="h-3.5 bg-[#FF8C00]" />

            {/* Upper section */}
            <div className="p-8 pb-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-teal tracking-[0.25em] uppercase block">OFFICIAL CHALLENGE REGISTRATION</span>
                <h3 className="font-display text-3xl font-black tracking-tight text-[#004B57] uppercase leading-none">
                  BUILD THE FUTURE<br />OF ATHLETICS
                </h3>
              </div>

              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Join engineering and medical stream teams across the nation. Register your team online to secure your slot.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Draft configuration takes under 5 minutes",
                  "Open to all departments & year classes",
                  "Includes challenge entry, certificate & mentorship",

                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#E0F2F1] text-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal font-black text-xs">✓</span>
                    </div>
                    <span className="text-xs text-slate-600 font-bold leading-none">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lower section */}
            <div className="p-8 pt-6 bg-slate-50 border-t border-slate-100 flex flex-col justify-center min-h-[120px] gap-3.5">
              <Link
                href="/iyakkam/technnovations/register"
                className="btn-primary btn-orange group/btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 14,
                  padding: "16px 28px",
                  borderRadius: 16,
                }}
              >
                Register Online Now
                <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/iyakkam/technnovations/portal"
                className="text-center text-xs font-bold text-teal hover:text-teal-dark transition-colors mt-1 block uppercase tracking-wider"
              >
                Already registered? Log in to Leader Portal
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function TechFooter() {
  return (
    <footer
      style={{
        background: "#fff",
        paddingTop: 48,
        paddingBottom: 48,
        borderTop: "1.5px solid var(--border)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
            marginBottom: 40,
            paddingBottom: 40,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="/logo.png"
                alt="Valli Super Speciality Hospital"
                style={{ height: 32, width: "auto" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--ink-mid)",
              }}
            >
              Valli Super Speciality Hospital · NABH Accredited
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
              }}
            >
              Technovations 2026
            </div>
            <span
              style={{
                background: "var(--teal-mist)",
                color: "var(--teal-dark)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                padding: "5px 14px",
                borderRadius: 9999,
              }}
            >
              AI Sports Rehabilitation Innovation Challenge
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--ink-light)",
            }}
          >
            © 2026 Technovations. Organised by Valli Super Speciality Hospital.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Terms", "Privacy", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--ink-light)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--teal)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--ink-light)";
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Submission Workflow Section ──────────────────────────────────────────────
function SubmissionWorkflow() {
  return (
    <section
      id="submission-workflow"
      className="relative overflow-hidden grid-bg-dots"
      style={{
        background: "#F8FAFC",
        paddingTop: 80,
        paddingBottom: 80,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        {/* Title */}
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow">SUBMISSION PROTOCOL</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase" style={{ marginBottom: 12 }}>
            HOW TO SUBMIT YOUR PROJECT
          </h2>
          <p className="text-slate-550 font-semibold text-xs sm:text-sm max-w-xl leading-relaxed">
            Follow this simple 4-step workflow to complete your registration, access the leader portal, and upload your project presentation.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Online Registration",
              desc: "Fill out the registration wizard with your team details, and provide your transaction reference ID with a screenshot.",
              badge: "₹3,000 Fee"
            },
            {
              step: "02",
              title: "Get Login Code",
              desc: "Upon submission, you will receive a unique Registration Code (e.g. TECH26-XXXX) on screen and via email.",
              badge: "Instant Code"
            },
            {
              step: "03",
              title: "Leader Portal Login",
              desc: "Navigate to the Leader Portal. Authenticate using your Registration Code and the Leader's email/phone number.",
              badge: "Secure Access"
            },
            {
              step: "04",
              title: "Upload Presentation",
              desc: "Upload your project pitch slides in PPT, PPTX, or PDF format (maximum size 5MB) before the submission deadline.",
              badge: "Deadline: July 15"
            }
          ].map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 relative shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-display text-4xl font-black text-[#FF8C00]/25 select-none">{s.step}</span>
                  <span className="pill pill-teal text-[9px] uppercase tracking-wider">{s.badge}</span>
                </div>
                <h3 className="font-display text-sm font-extrabold uppercase text-[#004B57] tracking-tight">{s.title}</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action card */}
        <div className="mt-12 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left space-y-1">
            <h4 className="font-display text-base font-extrabold uppercase text-[#004B57]">Ready to access your dashboard?</h4>
            <p className="text-xs text-slate-500 font-semibold">Registered team leads can manage their uploads and check verification status anytime.</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <Link
              href="/iyakkam/technnovations/portal"
              className="btn-primary btn-teal text-xs w-full sm:w-auto justify-center"
              style={{ padding: "12px 24px", borderRadius: 12 }}
            >
              Access Leader Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page Assembly ───────────────────────────────────────────────────────
export default function TechnnovationsPage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <TopicTracks />
      <PrizeSection />
      <SubmissionWorkflow />
      <RegisterSection />
      <Footer />
    </main>
  );
}
