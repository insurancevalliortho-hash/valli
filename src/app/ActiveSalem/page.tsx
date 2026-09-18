"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Clock,
  MapPin,
  Trophy,
  Award,
  ShieldCheck,
  CheckCircle2,
  Shirt,
  FileCheck,
  Droplets,
  ChevronRight,
  ArrowRight,
  Flag,
  Radio,
  Navigation,
  Zap,
  PhoneCall,
  Info,
  ExternalLink,
  HeartHandshake,
  Star
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: typeof delay === "number" ? delay : 0, ease: easeSmooth },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: typeof delay === "number" ? delay : 0, ease: "easeOut" },
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  hover: {
    y: -5,
    boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

// ─── Countdown Timer ──────────────────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-10-11T05:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-2 sm:gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" },
      ].map((t, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + idx * 0.08, type: "spring", stiffness: 200 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center min-w-[68px] sm:min-w-[78px] shadow-sm relative overflow-hidden group hover:border-[#F26522]/40 transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/60 pointer-events-none" />
          <div className="relative font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:text-[#F26522] transition-colors tabular-nums">
            {t.value.toString().padStart(2, "0")}
          </div>
          <div className="relative text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[92dvh] flex items-center pt-24 pb-20 overflow-hidden bg-[#FAFCFC] text-slate-900">
      {/* Ambient radials */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#00A896]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#F26522]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left: Copy */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-semibold tracking-wide text-slate-600 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse" />
              <span className="text-[#004B57] font-bold uppercase tracking-wider text-[11px]">Active Salem 4.0</span>
              <span className="text-slate-300">•</span>
              <span>Valli Super Speciality Hospital</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeSmooth }}
              className="space-y-3"
            >
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight text-slate-900 leading-[0.95] uppercase">
                ACTIVE <br />
                <span className="text-[#004B57]">SALEM</span>{" "}
                <span className="text-[#F26522] italic font-light">4.0</span>
              </h1>
              <p className="text-[#00A896] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                RUN SALEM RUN • SUNDAY, 11 OCTOBER 2026
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: easeSmooth }}
              className="text-slate-600 text-sm sm:text-base max-w-xl font-medium leading-relaxed"
            >
              Join Salem's premier running movement uniting competitive athletes, fitness runners, and armed forces veterans across the heart of the city.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: easeSmooth }}
              className="space-y-3 max-w-lg"
            >
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm cursor-default"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">5 KMS</span>
                    <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">TIMED</span>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-black text-slate-900">Rs.249</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Official Tee + Finisher Medal</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(242,101,34,0.15)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-[#FFF8F3] border border-[#F26522]/30 rounded-2xl p-4 shadow-sm cursor-default"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#F26522] uppercase">10 KMS</span>
                    <span className="text-[9px] font-mono font-bold text-[#F26522] bg-orange-100/60 px-2 py-0.5 rounded border border-orange-200">ELITE</span>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-black text-[#F26522]">₹299</span>
                  <span className="text-[10px] text-orange-950/60 block mt-1">₹5,000 Top Podium Cash Prize</span>
                </motion.div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-teal-50/60 border border-teal-100 rounded-xl text-[11px] text-slate-600">
                <Info size={14} className="text-[#00A896] shrink-0" />
                <span><strong>3 KMS Walkathon:</strong> Complimentary on-spot entry for Ex-Servicemen and Armed Forces veterans.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4, ease: easeSmooth }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                <Link
                  href="/ActiveSalem/Registration"
                  className="bg-[#F26522] hover:bg-[#d95315] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <span>Register For 5K / 10K</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="px-6 py-4 rounded-2xl font-semibold text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Race Categories</span>
                <ChevronRight size={16} />
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Countdown Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.35, ease: easeSmooth }}
            className="lg:col-span-5"
          >
            <div className="bg-white border border-slate-200/90 rounded-[2rem] p-7 sm:p-8 shadow-[0_12px_48px_rgba(0,0,0,0.07)] space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00A896] font-bold uppercase block">COUNTDOWN TO FLAG OFF</span>
                  <h3 className="font-display text-lg font-bold text-slate-900 uppercase">Sunday, Oct 11, 2026</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center">
                  <Zap size={18} />
                </div>
              </div>

              <div className="flex justify-center">
                <CountdownTimer />
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { icon: <Clock size={14} className="text-[#00A896]" />, label: "Assembly & Start", value: "5:00 AM • 6:00 AM Flag Off" },
                  { icon: <MapPin size={14} className="text-[#F26522]" />, label: "Start & Finish Point", value: "Valli Super Speciality Hospital" },
                  { icon: <Trophy size={14} className="text-amber-500" />, label: "Cash Prize Pool", value: "Top 3 Finishers" },
                  { icon: <Radio size={14} className="text-rose-500" />, label: "Radio Partner", value: "93.9 Suryan FM" },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center justify-between text-xs py-2 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                    <span className="text-slate-500 flex items-center gap-2">{row.icon} {row.label}</span>
                    <span className="text-slate-800 font-semibold text-right">{row.value}</span>
                  </div>
                ))}
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

// ─── Categories Section ────────────────────────────────────────────────────────
function CategoriesSection() {
  const categories = [
    {
      badge: "HONORARY WALKATHON",
      badgeColor: "text-[#00A896] bg-teal-50 border-teal-100",
      statusLabel: "FREE (ON-SPOT)",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      distance: "3 KMS",
      desc: "Dedicated exclusively to Ex-Servicemen and Armed Forces veterans with complimentary on-spot entry.",
      accentColor: "text-[#00A896]",
      borderHover: "hover:border-[#00A896]/50",
      features: [
        { icon: <CheckCircle2 size={14} className="text-[#00A896]" />, label: "Salute Walkathon & Tribute" },
        { icon: <CheckCircle2 size={14} className="text-[#00A896]" />, label: "Finisher Medal & Certificate" },
        { icon: <CheckCircle2 size={14} className="text-[#00A896]" />, label: "Full On-Route Medical & Hydration" },
      ],
      fee: "Rs.0",
      feeColor: "text-[#00A896]",
      cta: null,
      ctaNote: "Direct / On-Spot Entry",
    },
    {
      badge: "COMMUNITY RUN",
      badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
      statusLabel: "TIMED EVENT",
      statusColor: "text-amber-700",
      distance: "5 KMS",
      desc: "Perfect for runners, fitness enthusiasts, families, and college students embarking on their running journey.",
      accentColor: "text-amber-600",
      borderHover: "hover:border-amber-400/50",
      features: [
        { icon: <CheckCircle2 size={14} className="text-amber-600" />, label: "Official Valli Running Tee" },
        { icon: <CheckCircle2 size={14} className="text-amber-600" />, label: "Finisher Medal & Verified Certificate" },
        { icon: <CheckCircle2 size={14} className="text-amber-600" />, label: "1st Prize ₹2,000 • Top 3 Cash Awards" },
      ],
      fee: "₹249",
      feeColor: "text-slate-900",
      cta: "/ActiveSalem/Registration",
      ctaNote: null,
    },
    {
      badge: "ELITE CHALLENGE",
      badgeColor: "text-[#F26522] bg-orange-100/70 border-orange-200",
      statusLabel: "PODIUM CASH",
      statusColor: "text-[#F26522] bg-orange-100/50",
      distance: "10 KMS",
      desc: "The premier distance across Salem's central avenues. Compete against top athletes for grand cash prizes.",
      accentColor: "text-[#F26522]",
      borderHover: "hover:border-[#F26522]",
      features: [
        { icon: <CheckCircle2 size={14} className="text-[#F26522]" />, label: "1st Prize ₹5,000 • Top 3 Cash Awards" },
        { icon: <CheckCircle2 size={14} className="text-[#F26522]" />, label: "Official Tee, Bib Tag & Custom Medal" },
        { icon: <CheckCircle2 size={14} className="text-[#F26522]" />, label: "Hydration & Electrolyte Stations" },
      ],
      fee: "₹299",
      feeColor: "text-[#F26522]",
      cta: "/ActiveSalem/Registration",
      ctaNote: null,
    },
  ];

  return (
    <section id="categories" className="py-28 bg-white text-slate-900 border-t border-slate-100 relative">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
            CHOOSE YOUR CHALLENGE
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Whether racing for podium cash prizes or walking in gratitude with our veterans, choose the category that fits your spirit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.distance}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              custom={i * 0.12}
              whileHover="hover"
              className={`bg-[#FAFCFC] border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between cursor-default transition-all duration-300 ${cat.borderHover}`}
              style={{ willChange: "transform" }}
            >
              <motion.div variants={cardHover} className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`px-3 py-1 border rounded-lg text-xs font-mono font-bold ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${cat.statusColor}`}>
                    {cat.statusLabel}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-black uppercase text-slate-900">{cat.distance}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{cat.desc}</p>
                <ul className="space-y-2 pt-2 text-xs text-slate-600">
                  {cat.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">{f.icon} {f.label}</li>
                  ))}
                </ul>
              </motion.div>

              <div className="pt-8 mt-6 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Entry Fee</span>
                  <span className={`font-display text-2xl font-black ${cat.feeColor}`}>{cat.fee}</span>
                </div>
                <div className="text-right">
                  {cat.cta ? (
                    <Link
                      href={cat.cta}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      Register Online
                    </Link>
                  ) : (
                    <div>
                      <span className="inline-block px-3.5 py-2 bg-teal-50 border border-teal-200 text-[#00A896] rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
                        {cat.ctaNote}
                      </span>
                      <span className="text-[9px] text-slate-400 block mt-1">No online booking needed</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Runner Inclusions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.2}
          className="mt-16 bg-[#FAFCFC] border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <h4 className="font-display text-lg font-bold text-slate-900 uppercase">Official Kit & Course Amenities</h4>
            <p className="text-xs text-slate-500 mt-1">Every registered runner receives the full Active Salem experience.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {[
              { label: "Valli Running Tee", icon: <Shirt className="w-5 h-5 text-[#00A896]" /> },
              { label: "Finisher Medal", icon: <Award className="w-5 h-5 text-amber-500" /> },
              { label: "Time Certificate", icon: <FileCheck className="w-5 h-5 text-emerald-600" /> },
              { label: "Hydration Stations", icon: <Droplets className="w-5 h-5 text-blue-500" /> },
              { label: "Medical Support", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
            ].map((inc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: easeSmooth }}
                whileHover={{ y: -3 }}
                className="p-3 bg-white rounded-2xl border border-slate-200/70 shadow-sm space-y-2 flex flex-col items-center justify-center cursor-default"
              >
                <div className="p-2.5 rounded-xl bg-slate-50">{inc.icon}</div>
                <span className="text-xs font-semibold text-slate-700 block">{inc.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Armed Forces Tribute Section ─────────────────────────────────────────────
function TributeSection() {
  return (
    <section className="py-20 bg-[#F5F8F8] text-slate-900 border-t border-slate-200/70 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#004B57]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Tribute Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={slideLeft}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#00A896] font-bold uppercase flex items-center gap-2">
                <Flag size={14} className="text-[#00A896]" /> ARMED FORCES WALKATHON
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-slate-900 leading-[1.05]">
                Salute to the<br />Heroes of the Nation
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-lg">
                Active Salem 4.0 dedicates a special 3 KMS walkathon category to honour our Ex-Servicemen and Armed Forces personnel with complimentary on-spot entry. Walk with Salem. Walk for our heroes.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "01", title: "Honour Heroes", sub: "Gratitude to veterans" },
                { num: "02", title: "Spirit of Service", sub: "Courage and discipline" },
                { num: "03", title: "Walk Together", sub: "Solidarity with citizens" },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: easeSmooth }}
                  className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1"
                >
                  <span className="text-[10px] font-bold text-[#00A896] uppercase block">Pillar {p.num}</span>
                  <span className="font-display text-xs font-bold text-slate-900 block uppercase">{p.title}</span>
                  <span className="text-[9px] text-slate-500">{p.sub}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-slate-500 font-mono italic pt-1">
              "Honouring courage, discipline, and dedication beyond duty."
            </p>
          </motion.div>

          {/* Right: Community Spirit Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={slideRight}
            className="lg:col-span-6"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F26522]/5 to-transparent rounded-bl-[80px]" />

              <div className="space-y-3 relative">
                <span className="text-[10px] font-mono tracking-widest text-[#F26522] font-bold uppercase flex items-center gap-2">
                  <HeartHandshake size={14} className="text-[#F26522]" /> SALEM COMMUNITY SPIRIT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-slate-900">
                  One City.<br />One Run.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Active Salem 4.0 brings together every corner of Salem - families, students, athletes, and veterans - in one powerful movement. This is not just a race. It is Salem's celebration of health, community, and pride.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { num: "01", title: "Salem Pride", sub: "City-wide participation" },
                  { num: "02", title: "Fitness First", sub: "Health for all ages" },
                  { num: "03", title: "Run Together", sub: "Every step counts" },
                ].map((v, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-1">
                    <span className="text-[10px] font-bold text-[#F26522] uppercase block">Value {v.num}</span>
                    <span className="font-display text-xs font-bold text-slate-900 block uppercase">{v.title}</span>
                    <span className="text-[9px] text-slate-500">{v.sub}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 font-mono italic">
                "Building a stronger, healthier, and truly united Salem."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Cash Prizes Section ───────────────────────────────────────────────────────
function PrizesSection() {
  return (
    <section className="py-28 bg-white text-slate-900 border-t border-slate-100 relative">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
            EXCITING CASH AWARDS
          </h2>
          <p className="text-slate-500 text-sm">
            Cash awards given to top podium finishers across race categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {[
            {
              label: "ELITE DISTANCE",
              title: "10 KMS Cash Prizes",
              entry: "Entry: ₹299/-",
              bg: "bg-[#FFF8F3]",
              border: "border-orange-200",
              accent: "text-[#F26522]",
              prizes: [
                { medal: "1st", emoji: "gold", pos: "1st Place Winner", val: "₹5,000/-", highlight: true },
                { medal: "2nd", emoji: "silver", pos: "2nd Place Winner", val: "₹2,500/-", highlight: false },
                { medal: "3rd", emoji: "bronze", pos: "3rd Place Winner", val: "₹1,250/-", highlight: false },
              ],
            },
            {
              label: "COMMUNITY DISTANCE",
              title: "5 KMS Cash Prizes",
              entry: "Entry: ₹249/-",
              bg: "bg-[#FAFCFC]",
              border: "border-slate-200",
              accent: "text-[#00A896]",
              prizes: [
                { medal: "1st", emoji: "gold", pos: "1st Place Winner", val: "₹2,000/-", highlight: true },
                { medal: "2nd", emoji: "silver", pos: "2nd Place Winner", val: "₹1,000/-", highlight: false },
                { medal: "3rd", emoji: "bronze", pos: "3rd Place Winner", val: "₹500/-", highlight: false },
              ],
            },
          ].map((cat, ci) => (
            <motion.div
              key={ci}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={ci * 0.12}
              className={`${cat.bg} border ${cat.border} rounded-3xl p-8 space-y-6 shadow-sm`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className={`text-[10px] font-mono ${cat.accent} font-bold uppercase tracking-wider block`}>{cat.label}</span>
                  <h3 className="font-display text-2xl font-black text-slate-900 uppercase">{cat.title}</h3>
                </div>
                <span className={`px-3 py-1 bg-white ${cat.accent} font-mono font-bold text-xs rounded-lg border ${cat.border} shadow-sm`}>
                  {cat.entry}
                </span>
              </div>

              <div className="space-y-3">
                {cat.prizes.map((prize, pi) => (
                  <motion.div
                    key={pi}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + pi * 0.08, duration: 0.5, ease: easeSmooth }}
                    className={`rounded-2xl p-4 flex items-center justify-between shadow-sm ${
                      prize.highlight
                        ? "bg-gradient-to-r from-amber-50 to-white border border-amber-200"
                        : "bg-white border border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        prize.emoji === "gold" ? "bg-amber-50" : prize.emoji === "silver" ? "bg-slate-100" : "bg-orange-50"
                      }`}>
                        {prize.emoji === "gold" ? "🥇" : prize.emoji === "silver" ? "🥈" : "🥉"}
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase text-slate-900 block">{prize.pos}</span>
                      </div>
                    </div>
                    <span className={`font-display font-black text-slate-900 ${pi === 0 ? "text-2xl" : pi === 1 ? "text-xl" : "text-lg"}`}>
                      {prize.val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

// ─── Schedule & Route Section ──────────────────────────────────────────────────
function ScheduleAndRouteSection() {
  const [activeRoute, setActiveRoute] = useState<"3K" | "5K" | "10K">("10K");

  const timeline = [
    { time: "5:00 AM", title: "Assembly & Warm-Up", desc: "Runners report at Valli Super Speciality Hospital for bib check & warm-up session." },
    { time: "6:00 AM", title: "Flag-Off Ceremonies", desc: "Official start of 10K, 5K, and 3K runs with national anthem and dignitary flag-off." },
    { time: "6:45 AM", title: "Armed Forces Tribute", desc: "Felicitation ceremony honouring Ex-Servicemen and Armed Forces veterans." },
    { time: "7:30 AM", title: "Podium & Prize Distribution", desc: "Awarding of cash prizes, trophies, and closing celebration with radio partners." },
  ];

  const routeDetails = {
    "3K": {
      name: "3 KMS Walkathon",
      turnPoint: "Meyyanur Main Rd - Sarada College Rd Junction",
      turnDistance: "1.5 KM Turnpoint",
      mapUrl: "https://maps.app.goo.gl/13Pn3D56LS7L3dfg8",
      embedUrl: "https://maps.google.com/maps?saddr=11.6673798,78.1322976&daddr=11.6766126,78.1387286&output=embed",
      description: "Smooth walking corridor along Meyyanur Main Road connecting to the Sarada College Road junction. Gentle gradient and fully marshaled for veterans.",
      stations: "1 Hydration Station • 1 First-Aid Station • Ambulance Escort",
      waypoints: [
        { label: "Valli Super Speciality Hospital", mark: "Start (0.0 KM)" },
        { label: "Meyyanur Main Road", mark: "Corridor" },
        { label: "Sarada College Rd Jn", mark: "Turnpoint (1.5 KM)" },
        { label: "Valli Super Speciality Hospital", mark: "Finish (3.0 KM)" },
      ],
    },
    "5K": {
      name: "5 KMS Community Run",
      turnPoint: "Sarada College Road Midpoint",
      turnDistance: "2.5 KM Turnpoint",
      mapUrl: "https://maps.app.goo.gl/qyQ9YhqGkybktFBj8",
      embedUrl: "https://maps.google.com/maps?saddr=11.6673798,78.1322976&daddr=11.676613,78.1496092&output=embed",
      description: "Scenic city road stretch heading through Meyyanur Main Road into Sarada College Road with clear kilometer signage, cheer squads, and RFID tracking.",
      stations: "2 Hydration Stations • 2 Paramedic Posts • RFID Mat Checkpoint",
      waypoints: [
        { label: "Valli Super Speciality Hospital", mark: "Start (0.0 KM)" },
        { label: "Meyyanur Main Road", mark: "1.2 KM" },
        { label: "Sarada College Midpoint", mark: "Turnpoint (2.5 KM)" },
        { label: "Valli Super Speciality Hospital", mark: "Finish (5.0 KM)" },
      ],
    },
    "10K": {
      name: "10 KMS Elite Challenge",
      turnPoint: "Hasthampatty Roundabout Landmark Loop",
      turnDistance: "5.0 KM Turnpoint",
      mapUrl: "https://maps.app.goo.gl/t1n1EMxGRszEkCxt6",
      embedUrl: "https://maps.google.com/maps?saddr=11.6673798,78.1322976&daddr=11.6856881,78.1618847&output=embed",
      description: "Salem's premier long-distance course spanning Meyyanur Main Road, Sarada College Road, and looping around the landmark Hasthampatty Roundabout.",
      stations: "4 Hydration Stations • 3 Paramedic Posts • Rapid Trauma Ambulance Escort",
      waypoints: [
        { label: "Valli Super Speciality Hospital", mark: "Start (0.0 KM)" },
        { label: "Sarada College Corridor", mark: "2.5 KM" },
        { label: "Hasthampatty Roundabout", mark: "Turnpoint (5.0 KM)" },
        { label: "Valli Super Speciality Hospital", mark: "Finish (10.0 KM)" },
      ],
    },
  };

  const curr = routeDetails[activeRoute];

  return (
    <section className="py-28 bg-[#FAFCFC] text-slate-900 border-t border-slate-200/70 relative">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Timeline */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="space-y-2"
            >
              <h3 className="font-display text-3xl font-black uppercase text-slate-900">Race Morning Schedule</h3>
              <p className="text-xs text-slate-500 font-medium">
                Sunday, 11 October 2026 • Coordinated with Salem City Police & Medical Teams.
              </p>
            </motion.div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.55, ease: easeSmooth }}
                  className="relative flex items-start gap-4 pl-1"
                >
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-[#00A896] flex-shrink-0 z-10 flex items-center justify-center mt-0.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#00A896] block">{item.time}</span>
                    <h4 className="font-display text-sm font-bold text-slate-900 uppercase">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Live Route Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            custom={0.2}
            className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm space-y-6"
          >
            <div className="space-y-4">

              {/* Header & Distance Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#F26522] font-bold uppercase tracking-wider block">CERTIFIED LIVE GPS COURSE</span>
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={curr.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-xl font-bold uppercase text-slate-900"
                    >
                      {curr.name}
                    </motion.h4>
                  </AnimatePresence>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/70">
                  {(["3K", "5K", "10K"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRoute(r)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        activeRoute === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Turnpoint Summary + GPS Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-slate-900 text-xs font-bold">
                    <Navigation size={14} className="text-[#00A896]" />
                    <span>{curr.turnDistance}</span>
                    <span className="text-slate-400 font-normal">•</span>
                    <span className="text-slate-600 font-medium">{curr.turnPoint}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Start & Finish: Valli Super Speciality Hospital, Meyyanur
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

              {/* Embedded Map */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoute}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100"
                >
                  <iframe
                    title={`${curr.name} Course Map`}
                    src={curr.embedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-sm text-xs font-mono flex items-center gap-2 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-800">{curr.name}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 text-[11px]">{curr.turnDistance}</span>
                  </div>
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
                </motion.div>
              </AnimatePresence>

              {/* Waypoints */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {curr.waypoints.map((wp, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-mono text-[#00A896] font-bold block">{wp.mark}</span>
                    <span className="text-[11px] font-semibold text-slate-800 line-clamp-2 block leading-tight mt-0.5">{wp.label}</span>
                  </div>
                ))}
              </div>

              {/* Route Description & Medical Info */}
              <div className="space-y-2 text-xs text-slate-600">
                <p className="leading-relaxed">{curr.description}</p>
                <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-3 text-[11px] text-[#004B57] font-mono">
                  {curr.stations}
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-400 font-bold">All Live Links:</span>
                {[
                  { label: "3K", url: "https://maps.app.goo.gl/13Pn3D56LS7L3dfg8", color: "hover:bg-teal-50 hover:text-[#00A896]" },
                  { label: "5K", url: "https://maps.app.goo.gl/qyQ9YhqGkybktFBj8", color: "hover:bg-amber-50 hover:text-amber-700" },
                  { label: "10K", url: "https://maps.app.goo.gl/t1n1EMxGRszEkCxt6", color: "hover:bg-orange-50 hover:text-[#F26522]" },
                ].map((lnk) => (
                  <a
                    key={lnk.label}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-mono text-[11px] font-bold border border-slate-200 transition-colors inline-flex items-center gap-1 ${lnk.color}`}
                  >
                    {lnk.label} Live Map <ExternalLink size={10} />
                  </a>
                ))}
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">Medical Support: 24/7 Ambulance & Trauma Care</span>
              <Link href="/ActiveSalem/Registration" className="text-[#00A896] hover:underline font-bold flex items-center gap-1">
                Register for 5K / 10K →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Radio & Support Section ───────────────────────────────────────────────────
function RadioAndSupportSection() {
  return (
    <section className="py-16 bg-white text-slate-900 border-t border-slate-200/70 relative">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Radio size={28} />,
              iconBg: "bg-rose-50 text-rose-600 border-rose-100",
              label: "OFFICIAL RADIO PARTNER",
              labelColor: "text-rose-600",
              title: "93.9 Suryan FM",
              desc: "Tune in for live athlete interviews, countdown buzz, and race morning announcements across Salem.",
            },
            {
              icon: <PhoneCall size={26} />,
              iconBg: "bg-teal-50 text-[#00A896] border-teal-100",
              label: "DIRECT RUNNER DESK",
              labelColor: "text-[#00A896]",
              title: "Need Help or Bulk Entries?",
              desc: null,
              phones: ["+91 900 34 17 111", "+91 709 27 77 764"],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: easeSmooth }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-5 p-6 bg-[#FAFCFC] border border-slate-200 rounded-2xl shadow-sm"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0 border ${card.iconBg}`}>
                {card.icon}
              </div>
              <div className="space-y-1 text-left">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${card.labelColor}`}>{card.label}</span>
                <h4 className="font-display text-lg font-bold text-slate-900 uppercase">{card.title}</h4>
                {card.desc && <p className="text-xs text-slate-500">{card.desc}</p>}
                {card.phones && (
                  <p className="text-xs text-slate-500">
                    Call{" "}
                    <a href={`tel:+91${card.phones[0].replace(/\D/g, "")}`} className="text-slate-900 font-bold hover:underline">{card.phones[0]}</a>
                    {" "}or{" "}
                    <a href={`tel:+91${card.phones[1].replace(/\D/g, "")}`} className="text-slate-900 font-bold hover:underline">{card.phones[1]}</a>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────
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
