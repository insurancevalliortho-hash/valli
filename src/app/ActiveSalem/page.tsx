"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Award,
  Users,
  HeartPulse,
  Sparkles,
  Phone,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Shirt,
  FileCheck,
  Apple
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ─── Countdown Timer Component ────────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-18T08:00:00").getTime();
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
    <div className="flex gap-3.5 justify-center sm:justify-start">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" }
      ].map((t, idx) => (
        <div
          key={idx}
          className="bg-white text-slate-800 border border-slate-200 rounded-2xl p-3.5 text-center min-w-[76px] sm:min-w-[85px] shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden border-t-4 border-t-[#F26522]"
        >
          <div className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-none text-[#F26522]">
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
      className="grid-bg-dots text-left"
      style={{
        background: "linear-gradient(135deg, #FFF8F3 0%, #FFFFFF 50%, #F0FAF9 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflowX: "clip",
        paddingTop: 130,
        paddingBottom: 80,
      }}
    >
      {/* Decorative Glow Orbs */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-[#F26522]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[35vw] h-[35vw] rounded-full bg-[#00A896]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 items-center">

          {/* Left Hero Block */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-extrabold tracking-wider uppercase shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F26522] animate-pulse" />
              Valli Super Speciality Hospital Presents • NABH Accredited
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-2"
            >
              <span className="block text-xs sm:text-sm font-extrabold text-[#00A896] uppercase tracking-[0.25em]">
                STRONGER YOU, HEALTHIER TOMORROW
              </span>

              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#004B57] leading-none uppercase">
                #ACTIVE <span className="text-[#004B57]">சேலம்</span>
              </h1>

              <div className="flex items-center gap-3">
                <span className="font-display text-3xl sm:text-5xl font-black text-[#F26522] uppercase tracking-tight">
                  VALLI MARATHON
                </span>
              </div>

              <p className="text-slate-600 font-bold uppercase tracking-wider text-xs sm:text-sm pt-2 leading-relaxed">
                We're back to make Salem Active Again!
              </p>
              <div className="w-24 h-1.5 bg-[#F26522] rounded-full mt-3" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 font-semibold text-sm sm:text-base max-w-xl leading-relaxed"
            >
              Every step towards a healthier community! Join Salem's biggest fitness movement. Run 5KM or 10KM, win exciting cash prizes up to ₹10,000, and claim your official runner kit & finisher medal.
            </motion.p>

            {/* Entry Category Price Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="bg-white border-2 border-[#00A896] rounded-2xl px-5 py-3 shadow-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E0F2F1] text-[#00A896] font-black text-xs flex items-center justify-center font-mono">
                  5KM
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Entry Fee</span>
                  <span className="font-display text-xl font-black text-[#004B57]">₹149/-</span>
                </div>
              </div>

              <div className="bg-white border-2 border-[#F26522] rounded-2xl px-5 py-3 shadow-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F26522] font-black text-xs flex items-center justify-center font-mono">
                  10KM
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Entry Fee</span>
                  <span className="font-display text-xl font-black text-[#F26522]">₹199/-</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/ActiveSalem/Registration"
                className="btn-primary btn-orange px-8 py-4 rounded-2xl text-sm font-bold shadow-lg shadow-orange/20 flex items-center gap-2 hover:-translate-y-0.5 transition-transform uppercase tracking-wider"
              >
                Register Now!
                <ArrowRight size={16} />
              </Link>
              <a
                href="#prizes"
                className="btn-primary btn-outline-navy px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 hover:-translate-y-0.5 transition-all uppercase tracking-wider"
              >
                View Cash Prizes
              </a>
            </motion.div>

            {/* Bulk Orders & Helpline Contact Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.43 }}
              className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#004B57] font-bold text-sm sm:text-base"
            >
              <span className="flex items-center gap-2 text-[#00A896] font-extrabold uppercase text-xs sm:text-sm tracking-wider">
                <Phone className="w-4.5 h-4.5 text-[#F26522]" /> For Enquiries & Bulk Registration:
              </span>
              <div className="flex flex-wrap items-center gap-3 font-extrabold text-sm sm:text-base text-[#004B57]">
                <a href="tel:+919003417111" className="hover:text-[#F26522] transition-colors">+91 900 34 17 111</a>
                <span className="text-slate-300">•</span>
                <a href="tel:+917092777764" className="hover:text-[#F26522] transition-colors">+91 7092777764</a>
              </div>
            </motion.div>

            {/* Quick Details Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-6 border-t border-slate-200 max-w-[540px]"
            >
              <div className="grid grid-cols-3 gap-4 text-slate-800">
                {[
                  { label: "Race Day Date", val: "Sun 18 Oct 2026", color: "text-[#004B57]", icon: <Calendar className="w-3.5 h-3.5 text-[#00A896]" /> },
                  { label: "Venue Location", val: "Salem City Route", color: "text-[#00A896]", icon: <MapPin className="w-3.5 h-3.5 text-[#F26522]" /> },
                  { label: "Timing", val: "8:00 AM – 5:00 PM", color: "text-[#F26522]", icon: <Clock className="w-3.5 h-3.5 text-teal" /> }
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1.5 text-left">
                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {s.icon} {s.label}
                    </span>
                    <span className={`font-display text-sm sm:text-base font-extrabold tracking-tight block ${s.color}`}>
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Hero Poster Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full max-w-[420px] mx-auto"
          >
            <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden space-y-6 text-center">
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#00A896] via-[#F26522] to-[#004B57]" />

              <div className="pt-3 space-y-2">
                <span className="text-[10px] font-extrabold text-[#00A896] uppercase tracking-widest block font-mono">
                  OFFICIAL RUNNER EVENT
                </span>
                <h3 className="font-display text-2xl font-black text-[#004B57] uppercase tracking-tight">
                  Be a Part of Something Bigger!
                </h3>
              </div>

              {/* Lottie Animation Display */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white aspect-square flex items-center justify-center p-2">
                <DotLottieReact
                  src="https://lottie.host/f2b19d55-0e25-42c9-8f63-246a1ddeedc0/3ZMR3mHRHE.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%", background: "transparent" }}
                />
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-[#E8F7F5] border border-[#B2E0DA] rounded-xl space-y-1">
                  <span className="block text-[9px] font-bold text-[#007A6E] uppercase">5KM Category</span>
                  <span className="font-display text-lg font-black text-[#004B57]">₹149</span>
                </div>
                <div className="p-3 bg-[#FFF4EE] border border-[#FFD8C2] rounded-xl space-y-1">
                  <span className="block text-[9px] font-bold text-[#C94F0E] uppercase">10KM Category</span>
                  <span className="font-display text-lg font-black text-[#F26522]">₹199</span>
                </div>
              </div>

              <Link
                href="/ActiveSalem/Registration"
                className="w-full btn-primary btn-orange justify-center text-xs py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-md flex items-center gap-2"
              >
                Register For Marathon <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Cash Prizes Section ─────────────────────────────────────────────────────
function PrizesSection() {
  return (
    <section id="prizes" className="py-24 bg-white border-t border-slate-100 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#F26522] text-[10px] font-extrabold uppercase tracking-widest bg-[#F26522]/10 border border-[#F26522]/20 px-4 py-1.5 rounded-full">
            Rewards & Recognition
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#004B57] uppercase">
            Exciting Cash Prizes
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed">
            Cash awards for top finishers in Male & Female categories for both 5KM and 10KM runs!
          </p>
        </div>

        {/* Prizes Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 5KM Category Prizes */}
          <div className="bg-slate-50 border-2 border-[#00A896]/30 rounded-[2.5rem] p-6 sm:p-8 shadow-lg relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#00A896] uppercase tracking-widest">Entry Fee: ₹249/-</span>
                <h3 className="font-display text-2xl font-black text-[#004B57] uppercase">5KM Run Prizes</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E0F2F1] text-[#00A896] font-black text-sm flex items-center justify-center font-mono shadow-sm">
                5KM
              </div>
            </div>

            <div className="space-y-4">
              {/* 1st Place */}
              <div className="bg-white border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 font-black flex items-center justify-center text-lg">
                    🥇
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">1ST PLACE WINNER</span>
                    <span className="text-[10px] font-semibold text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-[#004B57]">₹5,000/-</span>
              </div>

              {/* 2nd Place */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-black flex items-center justify-center text-lg">
                    🥈
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">2ND PLACE WINNER</span>
                    <span className="text-[10px] font-semibold text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-[#004B57]">₹2,500/-</span>
              </div>

              {/* 3rd Place */}
              <div className="bg-white border border-amber-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-black flex items-center justify-center text-lg">
                    🥉
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">3RD PLACE WINNER</span>
                    <span className="text-[10px] font-semibold text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-lg font-black text-[#004B57]">₹1,250/-</span>
              </div>
            </div>
          </div>

          {/* 10KM Category Prizes */}
          <div className="bg-slate-50 border-2 border-[#F26522]/30 rounded-[2.5rem] p-6 sm:p-8 shadow-lg relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#F26522] uppercase tracking-widest">Entry Fee: ₹299/-</span>
                <h3 className="font-display text-2xl font-black text-[#004B57] uppercase">10KM Run Prizes</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F26522] font-black text-sm flex items-center justify-center font-mono shadow-sm">
                10KM
              </div>
            </div>

            <div className="space-y-4">
              {/* 1st Place */}
              <div className="bg-white border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 font-black flex items-center justify-center text-lg">
                    🥇
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">1ST PLACE WINNER</span>
                    <span className="text-[10px] font-semibold text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-[#F26522]">₹10,000/-</span>
              </div>

              {/* 2nd Place */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-black flex items-center justify-center text-lg">
                    🥈
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">2ND PLACE WINNER</span>
                    <span className="text-[10px] font-semibold text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-[#F26522]">₹5,000/-</span>
              </div>

              {/* 3rd Place */}
              <div className="bg-white border border-amber-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-black flex items-center justify-center text-lg">
                    🥉
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">3RD PLACE WINNER</span>
                    <span className="text-[10px] font-semibold text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-lg font-black text-[#F26522]">₹2,500/-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── What You Will Get Section ────────────────────────────────────────────────
function AmenitiesSection() {
  const items = [
    { title: "Official Valli T-Shirt", desc: "High-performance moisture-wicking Valli Marathon running tee.", icon: <Shirt className="w-6 h-6 text-[#F26522]" /> },
    { title: "Official E-Certificate", desc: "Verified digital finisher certificate with time record.", icon: <FileCheck className="w-6 h-6 text-[#00A896]" /> },
    { title: "Refreshments & Water", desc: "Hydration points along route plus post-race fruits & snacks.", icon: <Apple className="w-6 h-6 text-[#F26522]" /> },
    { title: "Goodies & BIBS Bag", desc: "Exclusive event goodie bag with sponsor items & extras.", icon: <Gift className="w-6 h-6 text-[#00A896]" /> }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[#00A896] text-[10px] font-extrabold uppercase tracking-widest bg-white border border-[#00A896]/20 px-4 py-1.5 rounded-full shadow-sm">
            Runner Inclusions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#004B57] uppercase">
            What You Will Get
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm">
            Every registered runner receives a complete official Valli Marathon kit!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-150 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="font-display text-sm font-extrabold uppercase text-[#004B57] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Key Features Grid Section ────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { title: "OPEN TO ALL", desc: "Age 16 & Above welcome to run 5KM or 10KM.", icon: <Users className="w-5 h-5 text-[#00A896]" /> },
    { title: "MEDALS FOR ALL FINISHERS", desc: "Every participant completing the run gets an official medal.", icon: <Award className="w-5 h-5 text-[#F26522]" /> },
    { title: "EXCITING CASH PRIZES", desc: "Trophies and cash awards for 1st, 2nd, and 3rd rankers.", icon: <Trophy className="w-5 h-5 text-amber-500" /> },
    { title: "REFRESHMENTS & SUPPORT", desc: "Water stations, glucose, fruits, and hydration support.", icon: <Apple className="w-5 h-5 text-[#00A896]" /> },
    { title: "ON-ROUTE MEDICAL SUPPORT", desc: "First-aid stations and ambulance coverage by Valli Hospital.", icon: <HeartPulse className="w-5 h-5 text-red-500" /> }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[#F26522] text-[10px] font-extrabold uppercase tracking-widest bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full">
            Event Highlights
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#004B57] uppercase">
            Why Run Valli Marathon?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {features.map((f, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
                {f.icon}
              </div>
              <h3 className="font-display text-xs font-black uppercase text-[#004B57] tracking-tight">
                {f.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA & Registration Section ───────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100 text-left relative z-10 overflow-x-clip">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* Left Summary Block */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#00A896] text-[10px] font-extrabold uppercase tracking-widest bg-white border border-[#00A896]/20 px-4 py-1.5 rounded-full shadow-sm">
                Official Marathon Booking
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#004B57] uppercase leading-none">
                Register Now!
              </h2>
              <div className="w-20 h-1.5 bg-[#F26522] rounded-full mt-2" />
            </div>

            <p className="text-slate-600 font-semibold text-sm sm:text-base max-w-xl leading-relaxed">
              Secure your spot online in under 2 minutes! Choose your distance (5KM @ ₹149 or 10KM @ ₹199), select your T-shirt size, pay securely via UPI QR, and get instant ticket confirmation.
            </p>

            {/* Countdown Clock */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-[2rem] shadow-sm inline-block">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                RACE DAY COUNTDOWN
              </span>
              <CountdownTimer />
            </div>

            {/* Enquiries & Bulk Orders Bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-slate-200 text-slate-800 font-bold text-sm sm:text-base">
              <span className="flex items-center gap-2 text-[#00A896] font-extrabold uppercase text-xs sm:text-sm tracking-wider">
                <Phone className="w-4.5 h-4.5 text-[#F26522]" /> For Enquiries & Bulk Registration:
              </span>
              <div className="flex flex-wrap items-center gap-3 font-extrabold text-sm sm:text-base text-[#004B57]">
                <a href="tel:+919003417111" className="hover:text-[#F26522] transition-colors">+91 900 34 17 111</a>
                <span className="text-slate-300">•</span>
                <a href="tel:+917092777764" className="hover:text-[#F26522] transition-colors">+91 7092777764</a>
                <span className="text-slate-300">•</span>
                <a href="tel:+918220377047" className="hover:text-[#F26522] transition-colors">+91 82203 77047</a>
              </div>
            </div>
          </div>

          {/* Right Card CTA */}
          <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] shadow-2xl p-8 space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-[#F26522] tracking-[0.2em] uppercase block font-mono">
                ONLINE REGISTRATION
              </span>
              <h3 className="font-display text-2xl font-black text-[#004B57] uppercase">
                #ACTIVE SALEM 2026
              </h3>
            </div>

            <div className="space-y-3 text-left pt-2">
              {[
                "Instant digital receipt code & ticket dispatch",
                "Includes official T-Shirt & Finisher Medal",
                "Refreshments, medical support & bib tag included"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <Link
                href="/ActiveSalem/Registration"
                className="w-full btn-primary btn-orange justify-center py-4 text-sm font-bold uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2"
              >
                Proceed To Registration <ArrowRight size={16} />
              </Link>
              <span className="block text-[10px] text-slate-400 font-semibold">
                Entry fee: 5KM (₹249) | 10KM (₹299)
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Main Page Assembly ───────────────────────────────────────────────────────
export default function ActiveSalemPage() {
  return (
    <main className="bg-slate-50 text-slate-800 select-none overflow-x-clip">
      <Navbar />
      <HeroSection />
      <PrizesSection />
      <AmenitiesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
