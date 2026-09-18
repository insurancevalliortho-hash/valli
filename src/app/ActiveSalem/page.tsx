"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Trophy,
  Award,
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
  PhoneCall,
  Info,
  ExternalLink
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ─── Countdown Timer Component ───────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-11T05:00:00").getTime();
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
          className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center min-w-[68px] sm:min-w-[78px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:border-[#F26522]/40 transition-all duration-300"
        >
          <div className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:text-[#F26522] transition-colors">
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
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#FAFCFC] text-slate-900">
      {/* Soft Ambient Radial Backgrounds */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#00A896]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#F26522]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Grid Canvas */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Host Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-semibold tracking-wide text-slate-600 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse" />
              <span className="text-[#004B57] font-bold uppercase tracking-wider text-[11px]">Active Salem 4.0</span>
              <span className="text-slate-300">•</span>
              <span>Valli Super Speciality Hospital</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight text-slate-900 leading-[0.96] uppercase">
                ACTIVE <br />
                <span className="text-[#004B57]">SALEM</span>{" "}
                <span className="text-[#F26522] italic font-light">4.0</span>
              </h1>
              <p className="text-[#00A896] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                RUN SALEM RUN • SUNDAY, 11 OCTOBER 2026
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base max-w-xl font-medium leading-relaxed"
            >
              Join Salem's premier running movement uniting competitive athletes, fitness runners, armed forces veterans, and differently-abled champions across the heart of the city.
            </motion.p>

            {/* Category Quick Badges (5K & 10K Online Registration) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 max-w-lg"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-amber-400/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">5 KMS</span>
                    <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">TIMED</span>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-black text-slate-900">₹249</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Official Tee + Finisher Medal Included</span>
                </div>

                <div className="bg-[#FFF8F3] border border-[#F26522]/30 rounded-2xl p-4 shadow-sm hover:border-[#F26522] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#F26522] uppercase">10 KMS</span>
                    <span className="text-[9px] font-mono font-bold text-[#F26522] bg-orange-100/60 px-2 py-0.5 rounded border border-orange-200">ELITE</span>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-black text-[#F26522]">₹299</span>
                  <span className="text-[10px] text-orange-950/60 block mt-1">₹10,000 Top Podium Cash Prize</span>
                </div>
              </div>

              {/* Note on 3KM Walkathon */}
              <div className="flex items-center gap-2 px-3 py-2 bg-teal-50/60 border border-teal-100 rounded-xl text-[11px] text-slate-600">
                <Info size={14} className="text-[#00A896] shrink-0" />
                <span><strong>3 KMS Walkathon:</strong> Free direct entry on-spot for Ex-Servicemen & differently-abled heroes.</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/ActiveSalem/Registration"
                className="bg-[#F26522] hover:bg-[#d95315] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>Register For 5K / 10K</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="#categories"
                className="px-6 py-4 rounded-2xl font-semibold text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all flex items-center gap-2"
              >
                <span>Race Categories</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right Card: Race Morning Brief & Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-white border border-slate-200/90 rounded-[2rem] p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00A896] font-bold uppercase block">
                    COUNTDOWN TO FLAG OFF
                  </span>
                  <h3 className="font-display text-lg font-bold text-slate-900 uppercase">
                    Sunday, Oct 11, 2026
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center">
                  <Zap size={18} />
                </div>
              </div>

              {/* Countdown */}
              <div className="flex justify-center">
                <CountdownTimer />
              </div>

              {/* Key Metrics */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Clock size={14} className="text-[#00A896]" /> Assembly & Start
                  </span>
                  <span className="text-slate-800 font-mono font-bold">5:00 AM • 6:00 AM Flag Off</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <MapPin size={14} className="text-[#F26522]" /> Start & Finish Point
                  </span>
                  <span className="text-slate-800 font-semibold">Valli Hospital Grounds</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Trophy size={14} className="text-amber-500" /> Cash Prize Pool
                  </span>
                  <span className="text-amber-600 font-mono font-bold">Top 3 Finishers (M & F)</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Radio size={14} className="text-rose-500" /> Radio Partner
                  </span>
                  <span className="text-slate-800 font-medium">93.9 Suryan FM</span>
                </div>
              </div>

              <Link
                href="/ActiveSalem/Registration"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-center block text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Proceed To Booking (5K / 10K) →
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
    <section id="categories" className="py-24 bg-white text-slate-900 border-t border-slate-100 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00A896] uppercase bg-teal-50 border border-teal-100 px-3.5 py-1 rounded-full">
            OFFICIAL RACE DISTANCES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
            CHOOSE YOUR CHALLENGE
          </h2>
          <p className="text-slate-500 text-sm">
            Whether racing for podium cash prizes or walking in gratitude with our veterans, choose the category that fits your spirit.
          </p>
        </div>

        {/* Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* 3 KMS Inclusive & Armed Forces (No Online Registration Required) */}
          <div className="bg-[#FAFCFC] border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#00A896]/50 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-teal-50 text-[#00A896] border border-teal-100 rounded-lg text-xs font-mono font-bold">
                  HONORARY WALKATHON
                </span>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  FREE (ON-SPOT)
                </span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-slate-900">
                3 KMS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Specially designed for <strong className="text-slate-900">Ex-Servicemen, Armed Forces veterans, and Differently Abled</strong> athletes.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00A896]" /> Salute Walkathon & Tribute
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00A896]" /> Finisher Medal & Certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00A896]" /> Full On-Route Medical & Hydration
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Entry Fee</span>
                <span className="font-display text-2xl font-black text-[#00A896]">₹0</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3.5 py-2 bg-teal-50 border border-teal-200 text-[#00A896] rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
                  Direct / On-Spot Entry
                </span>
                <span className="text-[9px] text-slate-400 block mt-1">No online booking needed</span>
              </div>
            </div>
          </div>

          {/* 5 KMS Fitness Run */}
          <div className="bg-[#FAFCFC] border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-amber-400/50 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-mono font-bold">
                  COMMUNITY RUN
                </span>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  TIMED EVENT
                </span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-slate-900">
                5 KMS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Perfect for runners, fitness enthusiasts, families, and college students embarking on their running journey.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-600" /> Official Valli Running Tee
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-600" /> Finisher Medal & Verified Certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-600" /> Cash Prizes for Top 3 (M & F)
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Entry Fee</span>
                <span className="font-display text-2xl font-black text-slate-900">₹249</span>
              </div>
              <Link
                href="/ActiveSalem/Registration"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                Register Online
              </Link>
            </div>
          </div>

          {/* 10 KMS Elite Challenge */}
          <div className="bg-[#FFF8F3] border-2 border-[#F26522]/30 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#F26522] transition-all duration-300">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-orange-100/70 text-[#F26522] border border-orange-200 rounded-lg text-xs font-mono font-bold">
                  ELITE CHALLENGE
                </span>
                <span className="text-[10px] font-bold text-[#F26522] uppercase tracking-widest bg-orange-100/50 px-2.5 py-1 rounded-full">
                  PODIUM CASH
                </span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-slate-900">
                10 KMS
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                The premier distance across Salem's central avenues. Compete against top athletes for grand cash prizes.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700">
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

            <div className="pt-8 mt-6 border-t border-orange-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Entry Fee</span>
                <span className="font-display text-2xl font-black text-[#F26522]">₹299</span>
              </div>
              <Link
                href="/ActiveSalem/Registration"
                className="px-5 py-2.5 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Register Online
              </Link>
            </div>
          </div>

        </div>

        {/* Runner Inclusions Ribbon */}
        <div className="mt-16 bg-[#FAFCFC] border border-slate-200/80 rounded-2xl p-6 lg:p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] font-mono text-[#00A896] font-bold tracking-widest uppercase">
              REGISTERED RUNNER PRIVILEGES
            </span>
            <h4 className="font-display text-lg font-bold text-slate-900 uppercase mt-1">
              Official Kit & Course Amenities
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: "Valli Running Tee", icon: <Shirt className="w-5 h-5 text-[#00A896]" /> },
              { label: "Finisher Medal", icon: <Award className="w-5 h-5 text-amber-500" /> },
              { label: "Time Certificate", icon: <FileCheck className="w-5 h-5 text-emerald-600" /> },
              { label: "Hydration Stations", icon: <Apple className="w-5 h-5 text-rose-500" /> },
              { label: "Hospital Medics", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
              { label: "Breakfast & Fruits", icon: <Gift className="w-5 h-5 text-[#F26522]" /> },
            ].map((inc, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-sm space-y-2 flex flex-col items-center justify-center">
                <div className="p-2 rounded-lg bg-slate-50">
                  {inc.icon}
                </div>
                <span className="text-xs font-semibold text-slate-700 block">{inc.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Tribute & Inclusivity Spotlight ──────────────────────────────────────────
function TributeSection() {
  return (
    <section className="py-20 bg-[#F5F8F8] text-slate-900 border-t border-slate-200/70 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Ex-Servicemen Tribute */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#00A896] font-bold uppercase flex items-center gap-2">
                <Flag size={14} className="text-[#00A896]" /> ARMED FORCES WALKATHON
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-slate-900">
                Salute to the Heroes of the Nation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                "Let us walk with our nation's heroes." Active Salem 4.0 dedicates a special 3 KMS category to honor our Ex-Servicemen and Armed Forces personnel with complimentary on-spot entry.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00A896] uppercase block">Pillar 01</span>
                <span className="font-display text-xs font-bold text-slate-900 block uppercase">Honour Heroes</span>
                <span className="text-[9px] text-slate-500">Gratitude to veterans</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00A896] uppercase block">Pillar 02</span>
                <span className="font-display text-xs font-bold text-slate-900 block uppercase">Spirit of Service</span>
                <span className="text-[9px] text-slate-500">Courage and discipline</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00A896] uppercase block">Pillar 03</span>
                <span className="font-display text-xs font-bold text-slate-900 block uppercase">Walk Together</span>
                <span className="text-[9px] text-slate-500">Solidarity with citizens</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 font-mono italic">
              "Honouring courage, discipline, and dedication beyond duty."
            </div>
          </div>

          {/* 3 KMS Inclusive Run */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#004B57] font-bold uppercase flex items-center gap-2">
                <HeartHandshake size={14} className="text-[#00A896]" /> INCLUSIVE COMMUNITY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-slate-900">
                Different Abilities. Same Determination.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                A dedicated 3 KMS walkathon for Differently-Abled athletes, para-sports champions, and inspiring community walkers. Creating an accessible, barrier-free celebration of willpower and joy with direct participation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00A896] uppercase block">Value 01</span>
                <span className="font-display text-xs font-bold text-slate-900 block uppercase">Inclusion</span>
                <span className="text-[9px] text-slate-500">Equal celebration for all</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00A896] uppercase block">Value 02</span>
                <span className="font-display text-xs font-bold text-slate-900 block uppercase">Inspiration</span>
                <span className="text-[9px] text-slate-500">Unstoppable willpower</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                <span className="text-[10px] font-bold text-[#00A896] uppercase block">Value 03</span>
                <span className="font-display text-xs font-bold text-slate-900 block uppercase">United Salem</span>
                <span className="text-[9px] text-slate-500">Move together, rise together</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 font-mono italic">
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
    <section className="py-24 bg-white text-slate-900 border-t border-slate-100 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-600 uppercase bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            PODIUM REWARDS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
            EXCITING CASH AWARDS
          </h2>
          <p className="text-slate-500 text-sm">
            Cash awards given equally to top finishers across both Male & Female categories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 10 KMS Prizes */}
          <div className="bg-[#FFF8F3] border border-orange-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-orange-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#F26522] font-bold uppercase tracking-wider">
                  ELITE DISTANCE
                </span>
                <h3 className="font-display text-2xl font-black text-slate-900 uppercase">
                  10 KMS Cash Prizes
                </h3>
              </div>
              <span className="px-3 py-1 bg-white text-[#F26522] font-mono font-bold text-xs rounded-lg border border-orange-200 shadow-sm">
                Entry: ₹299
              </span>
            </div>

            <div className="space-y-3">
              {/* 1st */}
              <div className="bg-white border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-black flex items-center justify-center text-lg">
                    🥇
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block">1st Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-slate-900">₹10,000/-</span>
              </div>

              {/* 2nd */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-black flex items-center justify-center text-lg">
                    🥈
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block">2nd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-slate-900">₹5,000/-</span>
              </div>

              {/* 3rd */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F26522] font-black flex items-center justify-center text-lg">
                    🥉
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block">3rd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-lg font-black text-slate-900">₹2,500/-</span>
              </div>
            </div>
          </div>

          {/* 5 KMS Prizes */}
          <div className="bg-[#FAFCFC] border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#00A896] font-bold uppercase tracking-wider">
                  COMMUNITY DISTANCE
                </span>
                <h3 className="font-display text-2xl font-black text-slate-900 uppercase">
                  5 KMS Cash Prizes
                </h3>
              </div>
              <span className="px-3 py-1 bg-white text-[#00A896] font-mono font-bold text-xs rounded-lg border border-teal-100 shadow-sm">
                Entry: ₹249
              </span>
            </div>

            <div className="space-y-3">
              {/* 1st */}
              <div className="bg-white border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-black flex items-center justify-center text-lg">
                    🥇
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block">1st Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-black text-slate-900">₹5,000/-</span>
              </div>

              {/* 2nd */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-black flex items-center justify-center text-lg">
                    🥈
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block">2nd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-slate-900">₹2,500/-</span>
              </div>

              {/* 3rd */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F26522] font-black flex items-center justify-center text-lg">
                    🥉
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block">3rd Place Winner</span>
                    <span className="text-[10px] text-slate-400">Male & Female (Each)</span>
                  </div>
                </div>
                <span className="font-display text-lg font-black text-slate-900">₹1,250/-</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Schedule & Route Overview ────────────────────────────────────────────────
function ScheduleAndRouteSection() {
  const [activeRoute, setActiveRoute] = useState<"3K" | "5K" | "10K">("10K");

  const timeline = [
    { time: "5:00 AM", title: "Assembly & Warm-Up", desc: "Runners report at Valli Hospital grounds for bib check & warm-up session." },
    { time: "6:00 AM", title: "Flag-Off Ceremonies", desc: "Official start of 10K, 5K, and 3K runs with national anthem and dignitary flag-off." },
    { time: "6:45 AM", title: "Armed Forces & Inclusive Tribute", desc: "Felicitation ceremony honouring Ex-Servicemen and differently-abled runners." },
    { time: "7:30 AM", title: "Podium & Prize Distribution", desc: "Awarding of cash prizes, trophies, and closing celebration with radio partners." }
  ];

  const routeDetails = {
    "3K": {
      name: "3 KMS Walkathon",
      category: "Honorary & Inclusive Walk",
      fee: "Free On-Spot",
      turnPoint: "Meyyanur Main Rd - Sarada College Rd Junction",
      turnDistance: "1.5 KM Turnpoint",
      mapUrl: "https://maps.app.goo.gl/13Pn3D56LS7L3dfg8",
      embedQuery: "Valli+Hospital+Meyyanur+Salem+Tamil+Nadu",
      zoom: 15,
      description: "Smooth, barrier-free walking corridor along Meyyanur Main Road connecting to the Sarada College Road junction. Gentle gradient and fully marshaled.",
      highlights: [
        "100% barrier-free paved route with traffic marshals",
        "Dedicated walking lane for veterans and differently-abled athletes",
        "1 Hydration & glucose refreshment post at 1.5 KM turn"
      ],
      stations: "1 Hydration Station • 1 First-Aid Station • Ambulance Escort",
      waypoints: [
        { label: "Valli Hospital Grounds", mark: "Start (0.0 KM)" },
        { label: "Meyyanur Main Road", mark: "Corridor" },
        { label: "Sarada College Rd Jn", mark: "Turnpoint (1.5 KM)" },
        { label: "Valli Hospital", mark: "Finish (3.0 KM)" }
      ]
    },
    "5K": {
      name: "5 KMS Community Run",
      category: "Fitness & Open Category",
      fee: "₹249",
      turnPoint: "Sarada College Road Midpoint",
      turnDistance: "2.5 KM Turnpoint",
      mapUrl: "https://maps.app.goo.gl/qyQ9YhqGkybktFBj8",
      embedQuery: "Sarada+College+Road+Salem+Tamil+Nadu",
      zoom: 14,
      description: "Scenic city road stretch heading through Meyyanur Main Road into Sarada College Road with clear kilometer signage, cheer squads, and RFID tracking.",
      highlights: [
        "Electronic timing chip checkpoints at start, turn, and finish",
        "2 Refreshment & energy drink stations along the route",
        "Clear distance markers every 500 meters"
      ],
      stations: "2 Hydration Stations • 2 Paramedic Posts • RFID Mat Checkpoint",
      waypoints: [
        { label: "Valli Hospital Grounds", mark: "Start (0.0 KM)" },
        { label: "Meyyanur Main Road", mark: "1.2 KM" },
        { label: "Sarada College Midpoint", mark: "Turnpoint (2.5 KM)" },
        { label: "Valli Hospital", mark: "Finish (5.0 KM)" }
      ]
    },
    "10K": {
      name: "10 KMS Elite Challenge",
      category: "Championship Timed Race",
      fee: "₹299",
      turnPoint: "Hasthampatty Roundabout Landmark Loop",
      turnDistance: "5.0 KM Turnpoint",
      mapUrl: "https://maps.app.goo.gl/t1n1EMxGRszEkCxt6",
      embedQuery: "Hasthampatty+Roundabout+Salem+Tamil+Nadu",
      zoom: 14,
      description: "Salem's premier long-distance course spanning Meyyanur Main Road, Sarada College Road, and looping around the landmark Hasthampatty Roundabout.",
      highlights: [
        "Podium-certified chip-timed ranking with ₹10,000 top cash prize",
        "4 Hydration, electrolyte, and cold-sponge stations",
        "Salem City Police marshaled corridor with dedicated lead vehicle"
      ],
      stations: "4 Hydration Stations • 3 Paramedic Posts • Rapid Trauma Ambulance Escort",
      waypoints: [
        { label: "Valli Hospital Grounds", mark: "Start (0.0 KM)" },
        { label: "Sarada College Corridor", mark: "2.5 KM" },
        { label: "Hasthampatty Roundabout", mark: "Turnpoint (5.0 KM)" },
        { label: "Valli Hospital", mark: "Finish (10.0 KM)" }
      ]
    }
  };

  const curr = routeDetails[activeRoute];

  return (
    <section className="py-24 bg-[#FAFCFC] text-slate-900 border-t border-slate-200/70 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Schedule */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00A896] uppercase">
                EVENT PROGRAM
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-slate-900">
                Race Morning Schedule
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Sunday, 11 October 2026 • Coordinated with Salem City Police & Medical Teams.
              </p>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-1">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-[#00A896] flex-shrink-0 z-10 flex items-center justify-center mt-0.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#00A896] block">
                      {item.time}
                    </span>
                    <h4 className="font-display text-sm font-bold text-slate-900 uppercase">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Live Route Map */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm space-y-6">
            <div className="space-y-4">
              
              {/* Card Header & Distance Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#F26522] font-bold uppercase tracking-wider block">
                    CERTIFIED LIVE GPS COURSE
                  </span>
                  <h4 className="font-display text-xl font-bold uppercase text-slate-900">
                    {curr.name}
                  </h4>
                </div>

                {/* Distance Selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/70">
                  {(["3K", "5K", "10K"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRoute(r)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        activeRoute === r
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Banner & Turnpoint Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-slate-900 text-xs font-bold">
                    <Navigation size={14} className="text-[#00A896]" />
                    <span>{curr.turnDistance}</span>
                    <span className="text-slate-400 font-normal">•</span>
                    <span className="text-slate-600 font-medium">{curr.turnPoint}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Start & Finish: Valli Super Speciality Hospital Grounds, Meyyanur
                  </p>
                </div>

                <a
                  href={curr.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#004B57] text-white text-xs font-bold font-mono uppercase tracking-wider rounded-xl hover:bg-[#003842] shadow-sm transition-all whitespace-nowrap"
                >
                  <Navigation size={13} className="text-[#00A896]" />
                  Live GPS Route
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Embedded Interactive Google Maps Frame */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                <iframe
                  title={`${curr.name} Course Map`}
                  src={`https://maps.google.com/maps?q=${curr.embedQuery}&t=&z=${curr.zoom}&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />

                {/* Floating Map Overlay Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-sm text-xs font-mono flex items-center gap-2 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-800">{curr.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 text-[11px]">{curr.turnDistance}</span>
                </div>

                {/* Direct GPS Button on Map */}
                <a
                  href={curr.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-900 border border-slate-200 rounded-xl px-3 py-1.5 shadow-md text-[11px] font-bold font-mono flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <MapPin size={12} className="text-[#F26522]" />
                  Open in Google Maps
                  <ExternalLink size={11} />
                </a>
              </div>

              {/* Milestones Progression */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {curr.waypoints.map((wp, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-mono text-[#00A896] font-bold block">
                      {wp.mark}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-800 line-clamp-1 block">
                      {wp.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Route Description & Highlights */}
              <div className="space-y-2 pt-1 text-xs text-slate-600">
                <p className="leading-relaxed">{curr.description}</p>
                <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-3 text-[11px] text-[#004B57] font-mono">
                  {curr.stations}
                </div>
              </div>

              {/* Direct Route Links Switcher */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-400 font-bold">All Live Links:</span>
                <a
                  href="https://maps.app.goo.gl/13Pn3D56LS7L3dfg8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-[#00A896] rounded-lg font-mono text-[11px] font-bold border border-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  3K Live Map <ExternalLink size={10} />
                </a>
                <a
                  href="https://maps.app.goo.gl/qyQ9YhqGkybktFBj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-lg font-mono text-[11px] font-bold border border-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  5K Live Map <ExternalLink size={10} />
                </a>
                <a
                  href="https://maps.app.goo.gl/t1n1EMxGRszEkCxt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#F26522] rounded-lg font-mono text-[11px] font-bold border border-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  10K Live Map <ExternalLink size={10} />
                </a>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">Medical Support: 24/7 Ambulance & Trauma Care</span>
              <Link
                href="/ActiveSalem/Registration"
                className="text-[#00A896] hover:underline font-bold flex items-center gap-1"
              >
                Register for 5K / 10K →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Radio Partner & Support Ribbon ──────────────────────────────────────────
function RadioAndSupportSection() {
  return (
    <section className="py-16 bg-white text-slate-900 border-t border-slate-200/70 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Radio Partner Spotlight */}
          <div className="flex items-center gap-5 p-6 bg-[#FAFCFC] border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-inner flex-shrink-0 border border-rose-100">
              <Radio size={28} />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-wider block">
                OFFICIAL RADIO PARTNER
              </span>
              <h4 className="font-display text-lg font-bold text-slate-900 uppercase">
                93.9 Suryan FM
              </h4>
              <p className="text-xs text-slate-500">
                Tune in for live athlete interviews, countdown buzz, and race morning announcements across Salem.
              </p>
            </div>
          </div>

          {/* Quick Enquiries & Bulk Bookings */}
          <div className="flex items-center gap-5 p-6 bg-[#FAFCFC] border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#00A896] flex items-center justify-center shadow-inner flex-shrink-0 border border-teal-100">
              <PhoneCall size={26} />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-[#00A896] font-bold uppercase tracking-wider block">
                DIRECT RUNNER DESK
              </span>
              <h4 className="font-display text-lg font-bold text-slate-900">
                Need Help or Bulk Entries?
              </h4>
              <p className="text-xs text-slate-500">
                Call <a href="tel:+919003417111" className="text-slate-900 font-bold hover:underline">+91 900 34 17 111</a> or{" "}
                <a href="tel:+917092777764" className="text-slate-900 font-bold hover:underline">+91 709 27 77 764</a>
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
    <main className="bg-white text-slate-900 selection:bg-[#F26522] selection:text-white min-h-screen">
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
