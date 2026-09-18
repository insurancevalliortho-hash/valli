"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Shirt,
  FileCheck,
  Apple,
  ChevronRight,
  ArrowRight,
  HeartHandshake,
  Flag,
  Radio,
  Navigation,
  Compass,
  Zap,
  PhoneCall
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ─── Countdown Timer Component ───────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-18T05:00:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 sm:gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" }
      ].map((t, idx) => (
        <div
          key={idx}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center min-w-[62px] sm:min-w-[76px] shadow-xl relative overflow-hidden group hover:border-[#F26522]/40 transition-all duration-300"
        >
          <div className="font-display text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-[#F26522] transition-colors">
            {t.value.toString().padStart(2, "0")}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#001217] text-white">
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,168,150,0.25),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#F26522]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-[#00A896]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Typography */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Host Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-slate-300 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#00E5C8] animate-ping" />
              <span className="text-[#00E5C8] font-bold">4TH EDITION</span>
              <span className="text-slate-500">•</span>
              <span>Valli Super Speciality Hospital</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.95]">
                ACTIVE <br />
                <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                  SALEM
                </span>{" "}
                <span className="text-[#F26522] italic text-4xl sm:text-6xl lg:text-7xl font-light">4.0</span>
              </h1>
              <p className="text-[#00E5C8] font-mono text-sm sm:text-base font-bold uppercase tracking-[0.25em]">
                RUN SALEM RUN • ONE RUN, ONE UNITED SALEM
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed"
            >
              Salem's premier annual road race returns on <strong className="text-white font-bold">Sunday, 18 October 2026</strong>. 
              Uniting athletes, families, armed forces veterans, and differently-abled runners for health, pride, and community triumph.
            </motion.p>

            {/* Category Quick Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 max-w-lg"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="text-[10px] font-mono font-bold text-[#00E5C8] block uppercase">3 KMS</span>
                <span className="font-display text-base sm:text-lg font-black text-white">FREE</span>
                <span className="text-[9px] text-slate-400 block truncate">Inclusive / Armed Forces</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">5 KMS</span>
                <span className="font-display text-base sm:text-lg font-black text-white">₹249</span>
                <span className="text-[9px] text-slate-400 block truncate">Medal + Kit Included</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm border-[#F26522]/30 bg-[#F26522]/10">
                <span className="text-[10px] font-mono font-bold text-[#F26522] block uppercase">10 KMS</span>
                <span className="font-display text-base sm:text-lg font-black text-[#F26522]">₹299</span>
                <span className="text-[9px] text-amber-200/70 block truncate">₹10K Podium Awards</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/ActiveSalem/Registration"
                className="bg-[#F26522] hover:bg-[#d95315] text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="#categories"
                className="px-6 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
              >
                <span>Explore Details</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right Card: Race Day Brief & Live Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-7 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00E5C8] font-bold uppercase block">
                    COUNTDOWN TO FLAG-OFF
                  </span>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                    Sunday, Oct 18, 2026
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#F26522]/20 border border-[#F26522]/30 flex items-center justify-center text-[#F26522]">
                  <Zap size={18} />
                </div>
              </div>

              {/* Countdown Component */}
              <div className="flex justify-center">
                <CountdownTimer />
              </div>

              {/* Quick Race Key Metrics */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Clock size={14} className="text-[#00E5C8]" /> Start Time
                  </span>
                  <span className="text-white font-mono font-bold">5:00 AM Assembly • 6:00 AM Flag Off</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin size={14} className="text-[#F26522]" /> Start & Finish
                  </span>
                  <span className="text-white font-semibold">Valli Super Speciality Hospital</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Trophy size={14} className="text-amber-400" /> Cash Prize Pool
                  </span>
                  <span className="text-amber-300 font-mono font-bold">Top Finishers (M & F)</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Radio size={14} className="text-pink-400" /> Radio Partner
                  </span>
                  <span className="text-white font-medium">93.9 Suryan FM</span>
                </div>
              </div>

              <Link
                href="/ActiveSalem/Registration"
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-center block text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                Quick Book Ticket →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Categories & Inclusions Section ──────────────────────────────────────────
function CategoriesSection() {
  return (
    <section id="categories" className="py-24 bg-[#00171F] text-white relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00E5C8] uppercase bg-[#00E5C8]/10 border border-[#00E5C8]/20 px-3.5 py-1 rounded-full">
            OFFICIAL RACE CATEGORIES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
            CHOOSE YOUR DISTANCE
          </h2>
          <p className="text-slate-400 text-sm">
            Whether you are racing for personal bests or walking in solidarity with heroes, there is a category for everyone.
          </p>
        </div>

        {/* Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* 3 KMS Inclusive */}
          <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-7 flex flex-col justify-between hover:border-[#00E5C8]/50 transition-all duration-300 relative group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-[#00E5C8]/10 text-[#00E5C8] border border-[#00E5C8]/20 rounded-lg text-xs font-mono font-bold">
                  INCLUSIVE RUN
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  FREE ENTRY
                </span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                3 KMS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Specially designed for <strong className="text-white">Ex-Servicemen, Armed Forces veterans, Special Children, and Differently Abled</strong> participants.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00E5C8]" /> Salute Walkathon & Tribute
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00E5C8]" /> Finisher Medal & Certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00E5C8]" /> Full Medical & Route Aid
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Entry Fee</span>
                <span className="font-display text-2xl font-black text-[#00E5C8]">₹0</span>
              </div>
              <Link
                href="/ActiveSalem/Registration"
                className="px-5 py-2.5 bg-white/10 hover:bg-[#00E5C8] hover:text-[#00171F] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                Join Free
              </Link>
            </div>
          </div>

          {/* 5 KMS Fitness Run */}
          <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 relative group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-lg text-xs font-mono font-bold">
                  COMMUNITY RUN
                </span>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  TIMED EVENT
                </span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                5 KMS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Perfect for runners, fitness enthusiasts, families, and college students embarking on their running journey.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Official Valli Technical Running Tee
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Finisher Medal & Verified Certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Cash Prizes for Top 3 (M & F)
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Entry Fee</span>
                <span className="font-display text-2xl font-black text-white">₹249</span>
              </div>
              <Link
                href="/ActiveSalem/Registration"
                className="px-5 py-2.5 bg-white/10 hover:bg-amber-400 hover:text-[#00171F] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                Register
              </Link>
            </div>
          </div>

          {/* 10 KMS Elite Challenge */}
          <div className="bg-gradient-to-b from-[#F26522]/15 to-white/[0.02] border-2 border-[#F26522]/40 rounded-3xl p-7 flex flex-col justify-between hover:border-[#F26522] transition-all duration-300 relative group shadow-2xl shadow-orange-950/20">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-[#F26522]/20 text-[#F26522] border border-[#F26522]/40 rounded-lg text-xs font-mono font-bold">
                  ELITE CHALLENGE
                </span>
                <span className="text-[10px] font-bold text-[#F26522] uppercase tracking-widest bg-[#F26522]/15 px-2.5 py-1 rounded-full">
                  PODIUM CASH
                </span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                10 KMS
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                The marquee distance across Salem's central avenues. Compete against top regional athletes for grand cash prizes.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#F26522]" /> 1st Prize ₹10,000 (M & F each)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#F26522]" /> Official Tee, Bib Tag & Custom Medal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#F26522]" /> Hydration & Electrolyte Stations
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Entry Fee</span>
                <span className="font-display text-2xl font-black text-[#F26522]">₹299</span>
              </div>
              <Link
                href="/ActiveSalem/Registration"
                className="px-5 py-2.5 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Register
              </Link>
            </div>
          </div>

        </div>

        {/* Runner Inclusions Ribbon */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] font-mono text-[#00E5C8] font-bold tracking-widest uppercase">
              ALL REGISTERED RUNNERS RECEIVE
            </span>
            <h4 className="font-display text-lg font-bold text-white uppercase mt-1">
              Complete Runner Kit & On-Course Privileges
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: "Valli Running Tee", icon: <Shirt className="w-5 h-5 text-[#00E5C8]" /> },
              { label: "Finisher Medal", icon: <Award className="w-5 h-5 text-amber-400" /> },
              { label: "Time Certificate", icon: <FileCheck className="w-5 h-5 text-emerald-400" /> },
              { label: "Hydration Stations", icon: <Apple className="w-5 h-5 text-rose-400" /> },
              { label: "Hospital Medics", icon: <ShieldCheck className="w-5 h-5 text-blue-400" /> },
              { label: "Breakfast & Fruits", icon: <Gift className="w-5 h-5 text-[#F26522]" /> },
            ].map((inc, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 flex flex-col items-center justify-center">
                <div className="p-2 rounded-lg bg-white/5">
                  {inc.icon}
                </div>
                <span className="text-xs font-semibold text-slate-300 block">{inc.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Tribute & Inclusivity Spotlight (PDF Pages 5 & 6) ────────────────────────
function TributeSection() {
  return (
    <section className="py-20 bg-[#001015] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Ex-Servicemen & Armed Forces Tribute */}
          <div className="bg-gradient-to-br from-[#0B2530] to-[#04131A] border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#00E5C8] font-bold uppercase flex items-center gap-2">
                <Flag size={14} className="text-[#00E5C8]" /> ARMED FORCES WALKATHON
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                Salute to the Heroes of the Nation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Let us walk with our nation's heroes." Active Salem 4.0 dedicates a special 3 KMS category to honor our Ex-Servicemen and Armed Forces personnel.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00E5C8] uppercase block">Pillar 01</span>
                <span className="font-display text-xs font-bold text-white block uppercase">Honour Heroes</span>
                <span className="text-[9px] text-slate-400">Gratitude to our veterans</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00E5C8] uppercase block">Pillar 02</span>
                <span className="font-display text-xs font-bold text-white block uppercase">Spirit of Service</span>
                <span className="text-[9px] text-slate-400">Courage and discipline</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00E5C8] uppercase block">Pillar 03</span>
                <span className="font-display text-xs font-bold text-white block uppercase">Walk Together</span>
                <span className="text-[9px] text-slate-400">Solidarity with citizens</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-cyan-200/80 font-mono italic">
              "Honouring courage, discipline, and dedication beyond duty."
            </div>
          </div>

          {/* 3 KMS Inclusive Run */}
          <div className="bg-gradient-to-br from-[#1E192B] to-[#0D0B14] border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase flex items-center gap-2">
                <HeartHandshake size={14} className="text-purple-400" /> INCLUSIVE COMMUNITY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                Different Abilities. Same Determination.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A dedicated 3 KMS run for Special Children and Differently-Abled athletes. Creating an accessible, barrier-free celebration of willpower and joy.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase block">Value 01</span>
                <span className="font-display text-xs font-bold text-white block uppercase">Inclusion</span>
                <span className="text-[9px] text-slate-400">Equal celebration for all</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase block">Value 02</span>
                <span className="font-display text-xs font-bold text-white block uppercase">Inspiration</span>
                <span className="text-[9px] text-slate-400">Unstoppable determination</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase block">Value 03</span>
                <span className="font-display text-xs font-bold text-white block uppercase">United Salem</span>
                <span className="text-[9px] text-slate-400">Move together, rise together</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-purple-200/80 font-mono italic">
              "Building a stronger, healthier, and truly inclusive Salem."
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Cash Prizes Section ─────────────────────────────────────────────────────
function PrizesSection() {
  return (
    <section className="py-24 bg-[#00171F] text-white relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full">
            PODIUM REWARDS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
            EXCITING CASH AWARDS
          </h2>
          <p className="text-slate-400 text-sm">
            Cash prizes awarded equally to top finishers across both Male & Female categories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 10 KMS Prizes */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-[#F26522]/30 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#F26522] font-bold uppercase tracking-wider">
                  ELITE DISTANCE
                </span>
                <h3 className="font-display text-2xl font-black text-white uppercase">
                  10 KMS Cash Prizes
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#F26522]/20 text-[#F26522] font-mono font-bold text-xs rounded-lg border border-[#F26522]/30">
                Entry: ₹299
              </span>
            </div>

            <div className="space-y-3">
              {/* 1st */}
              <div className="bg-white/5 border border-amber-400/30 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 font-black flex items-center justify-center text-lg">
                    🥇
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-white block">1st Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-amber-400">₹10,000/-</span>
              </div>

              {/* 2nd */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-400/20 text-slate-300 font-black flex items-center justify-center text-lg">
                    🥈
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-white block">2nd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-white">₹5,000/-</span>
              </div>

              {/* 3rd */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-400/20 text-orange-300 font-black flex items-center justify-center text-lg">
                    🥉
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-white block">3rd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-lg font-black text-slate-300">₹2,500/-</span>
              </div>
            </div>
          </div>

          {/* 5 KMS Prizes */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#00E5C8] font-bold uppercase tracking-wider">
                  COMMUNITY DISTANCE
                </span>
                <h3 className="font-display text-2xl font-black text-white uppercase">
                  5 KMS Cash Prizes
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#00E5C8]/10 text-[#00E5C8] font-mono font-bold text-xs rounded-lg border border-[#00E5C8]/20">
                Entry: ₹249
              </span>
            </div>

            <div className="space-y-3">
              {/* 1st */}
              <div className="bg-white/5 border border-amber-400/30 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 font-black flex items-center justify-center text-lg">
                    🥇
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-white block">1st Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-amber-400">₹5,000/-</span>
              </div>

              {/* 2nd */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-400/20 text-slate-300 font-black flex items-center justify-center text-lg">
                    🥈
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-white block">2nd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-white">₹2,500/-</span>
              </div>

              {/* 3rd */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-400/20 text-orange-300 font-black flex items-center justify-center text-lg">
                    🥉
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-white block">3rd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-lg font-black text-slate-300">₹1,250/-</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Schedule & Route Overview (PDF Pages 7 & 8) ──────────────────────────────
function ScheduleAndRouteSection() {
  const [activeRoute, setActiveRoute] = useState<"3K" | "5K" | "10K">("10K");

  const timeline = [
    { time: "5:00 AM", title: "Assembly & Warm-Up", desc: "Runners report at Valli Super Speciality Hospital grounds for bib check & warm-up session." },
    { time: "6:00 AM", title: "Flag-Off Ceremonies", desc: "Official start of 10K, 5K, and 3K runs with national anthem and dignitary flag-off." },
    { time: "6:45 AM", title: "Armed Forces & Inclusive Tribute", desc: "Special felicitation ceremony honouring Ex-Servicemen and differently-abled runners." },
    { time: "7:30 AM", title: "Podium & Prize Distribution", desc: "Awarding of cash prizes, trophies, and closing celebration with official radio partners." }
  ];

  return (
    <section className="py-24 bg-[#001015] text-white relative border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Event Morning Timeline */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00E5C8] uppercase">
                EVENT PROGRAM
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                Race Morning Schedule
              </h3>
              <p className="text-xs text-slate-400">
                Sunday, 18 October 2026 • Coordinated with Salem City Police & Medical Teams.
              </p>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-1">
                  <div className="w-6 h-6 rounded-full bg-[#00171F] border-2 border-[#00E5C8] flex-shrink-0 z-10 flex items-center justify-center mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C8]" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#00E5C8] block">
                      {item.time}
                    </span>
                    <h4 className="font-display text-sm font-bold text-white uppercase">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Route Visual Map */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#F26522] font-bold uppercase tracking-wider">
                    CERTIFIED RACE COURSE
                  </span>
                  <h4 className="font-display text-xl font-bold uppercase text-white">
                    Salem City Landmarks Route
                  </h4>
                </div>

                {/* Distance Selector Buttons */}
                <div className="flex bg-white/10 p-1 rounded-xl border border-white/10">
                  {(["3K", "5K", "10K"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRoute(r)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                        activeRoute === r
                          ? "bg-[#F26522] text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Route Milestones Description */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Navigation size={14} className="text-[#00E5C8]" />
                  <span>Start / Finish: Valli Super Speciality Hospital</span>
                </div>
                {activeRoute === "3K" && (
                  <p className="text-slate-400 leading-relaxed">
                    Turns at <strong className="text-white">1.5 KMS</strong> milestone via Meyyanur Main Road & Sarada College Road intersection. Safe and gentle gradient suitable for walkathons.
                  </p>
                )}
                {activeRoute === "5K" && (
                  <p className="text-slate-400 leading-relaxed">
                    Turns at <strong className="text-white">2.5 KMS</strong> milestone along Sarada College Road. Includes 2 dedicated water and energy drink stations.
                  </p>
                )}
                {activeRoute === "10K" && (
                  <p className="text-slate-400 leading-relaxed">
                    Loops at <strong className="text-white">5.0 KMS</strong> milestone reaching Hasthampatty Roundabout before returning to Valli Hospital. 4 hydration points and ambulance coverage.
                  </p>
                )}
              </div>

              {/* Graphical Route Visual Representation */}
              <div className="h-44 w-full bg-[#00171F] border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00E5C8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual Pathway diagram */}
                <div className="relative w-full max-w-md flex items-center justify-between">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#00E5C8]/20 border border-[#00E5C8] flex items-center justify-center text-[#00E5C8]">
                      <MapPin size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-white font-mono">Valli Hospital</span>
                    <span className="text-[8px] text-slate-400">0.0 KM</span>
                  </div>

                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#00E5C8] via-[#F26522] to-[#00E5C8] mx-2 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400">
                      Meyyanur Main Rd
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#F26522]/20 border border-[#F26522] flex items-center justify-center text-[#F26522]">
                      <Compass size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-white font-mono">Sarada College</span>
                    <span className="text-[8px] text-slate-400">Midpoint</span>
                  </div>

                  {activeRoute === "10K" && (
                    <>
                      <div className="flex-1 h-0.5 bg-[#F26522] mx-2 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400">
                          Hasthampatty
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400">
                          <Flag size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-white font-mono">Turn Point</span>
                        <span className="text-[8px] text-slate-400">5.0 KM</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Medical Support: 24/7 Ambulance & Trauma Station</span>
              <Link
                href="/ActiveSalem/Registration"
                className="text-[#00E5C8] hover:underline font-bold flex items-center gap-1"
              >
                Choose This Distance →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Radio Partner & Support Footer Ribbon ───────────────────────────────────
function RadioAndSupportSection() {
  return (
    <section className="py-16 bg-[#001217] text-white border-t border-white/10 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Radio Partner Spotlight */}
          <div className="flex items-center gap-5 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Radio size={28} />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider block">
                OFFICIAL RADIO PARTNER
              </span>
              <h4 className="font-display text-lg font-bold text-white uppercase">
                93.9 Suryan FM
              </h4>
              <p className="text-xs text-slate-400">
                Tune in for live athlete interviews, countdown buzz, and race day announcements across Salem.
              </p>
            </div>
          </div>

          {/* Quick Enquiries & Bulk Bookings */}
          <div className="flex items-center gap-5 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#00A896]/20 border border-[#00A896]/30 flex items-center justify-center text-[#00E5C8] shadow-lg flex-shrink-0">
              <PhoneCall size={26} />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-[#00E5C8] font-bold uppercase tracking-wider block">
                DIRECT RUNNER DESK
              </span>
              <h4 className="font-display text-lg font-bold text-white">
                Need Help or Bulk Entries?
              </h4>
              <p className="text-xs text-slate-400">
                Call <a href="tel:+919003417111" className="text-white font-bold hover:underline">+91 900 34 17 111</a> or{" "}
                <a href="tel:+917092777764" className="text-white font-bold hover:underline">+91 709 27 77 764</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Main Page Export ────────────────────────────────────────────────────────
export default function ActiveSalemPage() {
  return (
    <main className="bg-[#001217] text-white selection:bg-[#F26522] selection:text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <TributeSection />
      <PrizesSection />
      <ScheduleAndRouteSection />
      <RadioAndSupportSection />
      <Footer />
    </main>
  );
}
