"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Brain,
  Activity,
  Watch,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  Award,
  Users,
  Compass,
  Briefcase,
  Layers,
  Heart,
  QrCode,
  Phone
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// ─── Countdown Timer Component ────────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-17T08:00:00").getTime();
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
        <div key={idx} className="bg-white text-slate-800 border border-slate-150 rounded-[1.25rem] p-4 text-center min-w-[85px] shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,168,150,0.08)] transition-all duration-300 relative overflow-hidden border-t-4 border-t-[#00A896]">
          <div className="font-display text-3xl font-black tracking-tight leading-none text-[#00A896]">
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
      className="grid-bg-dots"
      style={{
        background: "linear-gradient(135deg, #F0FAF9 0%, #FFFFFF 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 130,
        paddingBottom: 80,
      }}
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#E0F2F1]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] rounded-full bg-[#00A896]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">

          {/* Left Block */}
          <div className="space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A896]/5 border border-[#00A896]/15 text-[#00A896] text-xs font-bold tracking-wider uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse" />
              Valli Super Specialty Hospital Presents
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(42px, 5vw, 84px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 0.9,
                  color: "#004B57",
                }}
                className="flex flex-col gap-2"
              >
                <span>ARISE</span>
                <span className="text-[#FF8C00] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  2026
                </span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs sm:text-sm mt-3 leading-relaxed">
                Advancements in Recovery, Intelligence & Sports Engineering
              </p>
              <div className="w-20 h-1 bg-[#FF8C00] rounded-full mt-4" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 font-medium text-sm sm:text-base max-w-xl leading-relaxed"
            >
              The premier national CME and Workshop on Sports Science. Exploring where artificial intelligence meets human performance in recovery mapping, motion biomechanics, and telerehabilitation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/iyakkam/arise/register"
                className="btn-primary btn-orange px-8 py-4 rounded-2xl text-sm font-bold shadow-md shadow-orange/15 flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                Register For Event
                <ArrowRight size={16} />
              </Link>
              <a
                href="#faculty"
                className="btn-primary btn-outline-navy px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
              >
                View Distinguished Faculty
              </a>
            </motion.div>

            {/* Quick Details Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-6 border-t border-slate-200 max-w-[500px]"
            >
              <div className="grid grid-cols-3 gap-4 text-slate-800">
                {[
                  { label: "Event Date", val: "Oct 17, 2026", color: "text-[#004B57]", icon: <Calendar className="w-3.5 h-3.5 text-[#00A896]" /> },
                  { label: "Venue Location", val: "Salem (Yet To Be Announced)", color: "text-[#00A896]", icon: <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" /> },
                  { label: "Timing", val: "8:00 AM Onwards", color: "text-[#FF8C00]", icon: <Clock className="w-3.5 h-3.5 text-teal" /> }
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

          {/* Right Block: Image Collage / Tech Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center"
          >
            {/* Circular glowing outline */}
            <div className="absolute inset-0 border border-dashed border-[#00A896]/30 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 border border-[#FF8C00]/10 rounded-full" />

            {/* Embedded Visuals */}
            <div className="relative w-full h-full rounded-full overflow-hidden p-6 bg-white/40 backdrop-blur-md shadow-2xl border border-white/50 flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <Image
                  src="/assets/arise_telemetry_v4.png"
                  alt="AI sports telemetry and biomechanics visual"
                  width={800}
                  height={800}
                  priority
                  className="w-full h-full object-cover opacity-90 object-center rounded-full"
                />

                {/* Corner/Edge Blur Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none backdrop-blur-[6px] rounded-full"
                  style={{
                    maskImage: "radial-gradient(circle, transparent 50%, black 100%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 50%, black 100%)"
                  }}
                />

                {/* Floating circles representing AI telemetry metrics */}
                <div className="absolute top-8 left-8 bg-[#004B57]/80 text-[#00A896] p-3 rounded-full border border-[#00A896]/30 shadow-lg backdrop-blur-sm animate-bounce duration-[4s]">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>
                <div className="absolute bottom-12 right-12 bg-[#FF8C00]/80 text-white p-3 rounded-full border border-white/20 shadow-lg backdrop-blur-sm animate-bounce duration-[5s]">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="absolute top-1/2 right-6 bg-slate-900/80 text-[#E0F2F1] p-3 rounded-full border border-slate-700 shadow-lg backdrop-blur-sm">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Why Attend Section ───────────────────────────────────────────────────────
function WhyAttendSection() {
  const points = [
    {
      title: "AI in Injury Prevention",
      desc: "Explore machine learning algorithms applied to orthopaedic diagnostics, video gait mapping, and strain forecasting.",
      icon: <Brain className="w-5 h-5 text-teal" />
    },
    {
      title: "Wearable Tech & Devices",
      desc: "Experience real-time telemetry from muscle EMG sensors, inertial sensors, and smartwatch kinematics.",
      icon: <Watch className="w-5 h-5 text-teal" />
    },
    {
      title: "Sports Medicine Innovation",
      desc: "Discover breakthrough clinical insights on cartilage healing, ligament recovery protocols, and joint stability.",
      icon: <Activity className="w-5 h-5 text-teal" />
    },
    {
      title: "Hands-on Experience",
      desc: "Get real-world exposure to emerging AI interfaces, motion-capture sensor hubs, and VR tools.",
      icon: <Layers className="w-5 h-5 text-teal" />
    },
    {
      title: "Interdisciplinary Networking",
      desc: "Bridge connections between orthopaedic surgeons, sports biomechanists, rehabilitation therapists, and engineers.",
      icon: <Users className="w-5 h-5 text-teal" />
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100 relative z-10 text-left">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="max-w-2xl mb-16">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-[#00A896]/5 border border-[#00A896]/10 px-3.5 py-1.5 rounded-full">
            Key Objectives
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            Why Attend ARISE 2026?
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            Delve into five core clinical and engineering pillars designed to revolutionize athletic assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {points.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-[#00A896]/5 hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E0F2F1] rounded-xl flex items-center justify-center shadow-inner">
                  {p.icon}
                </div>
                <h3 className="font-display text-sm font-extrabold uppercase text-[#004B57] tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who Should Attend Section ────────────────────────────────────────────────
function WhoShouldAttendSection() {
  const groups = [
    { name: "Orthopaedic Surgeons", icon: <Award className="w-5 h-5 text-teal" /> },
    { name: "Sports Physicians & Medical Students", icon: <Users className="w-5 h-5 text-teal" /> },
    { name: "Physiotherapists & Rehab Specialists", icon: <Activity className="w-5 h-5 text-teal" /> },
    { name: "Biomedical Professionals", icon: <Compass className="w-5 h-5 text-teal" /> },
    { name: "Engineers & Researchers", icon: <Layers className="w-5 h-5 text-teal" /> },
    { name: "Athletic Trainers", icon: <Briefcase className="w-5 h-5 text-teal" /> },
    { name: "AI & ML Engineers", icon: <Brain className="w-5 h-5 text-teal" /> },
    { name: "Medical Device Developers", icon: <Watch className="w-5 h-5 text-teal" /> }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-white border border-[#00A896]/15 px-3.5 py-1.5 rounded-full shadow-sm">
            Audience Profiles
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            Who Should Attend?
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            This CME creates an intersection of clinical medical streams, sports science, and software engineering.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {groups.map((g, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center text-center justify-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#E0F2F1]/80 rounded-full flex items-center justify-center mb-3">
                {g.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide leading-tight">
                {g.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ─── Our Faculty Section ─────────────────────────────────────────────────────
function FacultySection() {
  const faculty = [
    {
      name: "DR. R.KARTHIKEYAN, M.B.B.S, M.D (PMR)",
      title: "Prof & Head, Dept of Physical Medicine & Rehabilitation",
      affiliation: "SRM Medical College Hospital and Research Centre, Tamil Nadu",
      img: "/SpeakersIMG/Karthikeyan.png",
      position: "object-center"
    },
    {
      name: "MR. TAMBI MEDABALAN, M.SC",
      title: "High Performance Director (Sports Science) Exercise Physiology & Human Performance",
      affiliation: "Sports Authority of India (SAI), NSNIS Patiala",
      img: "/SpeakersIMG/Tambi.png",
      position: "object-center"
    },
    {
      name: "DR. RAHUL TIWARI, PH.D.",
      title: "Head of Sports Performance Analysis",
      affiliation: "Inspire Institute of Sport (IIS), Karnataka",
      img: "/SpeakersIMG/RahulTiwari.png",
      position: "object-top"
    },
    {
      name: "DR. KISHOR LAKSHMINARAYANAN, PH.D",
      title: "Associate Professor",
      affiliation: "School of Healthcare Science and Engineering, VIT Vellore",
      img: "/SpeakersIMG/KishorLakshminarayanan.jpg",
      position: "object-center"
    },
    {
      name: "DR. BHARAT PULAVARTI, M.B.B.S, M.D (PMR)",
      title: "Physical Medicine and Rehabilitation",
      affiliation: "Sports Injury Centre New Delhi",
      img: "/SpeakersIMG/BharatPulavarti.jpg",
      position: "object-center"
    },
    {
      name: "MR. ADITYA SUBRAMANYAM, M.S",
      title: "Sports Scientist",
      affiliation: "Department of Sports Science, Vijayi Bharat Foundation, Gujarat",
      img: "/SpeakersIMG/aditya.png",
      position: "object-center"
    }
  ];

  return (
    <section id="faculty" className="py-24 bg-slate-50 border-t border-slate-100 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-white border border-[#00A896]/15 px-3.5 py-1.5 rounded-full shadow-sm">
            Event Lecturers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            Distinguished Faculty
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            Learn from leading experts in sports physiotherapy, clinical medicine, engineering, and data sciences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {faculty.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Doctor Avatar */}
              <div className="w-18 h-22 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                <Image
                  src={f.img}
                  alt={f.name}
                  width={150}
                  height={150}
                  className={`w-full h-full object-left ${f.position}`}
                />
              </div>

              {/* Doctor Bio */}
              <div className="space-y-1 self-center">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#004b57] uppercase tracking-wide leading-tight">
                  {f.name}
                </h3>
                <span className="block text-[10px] text-[#00A896] font-bold uppercase tracking-wider">
                  {f.title}
                </span>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  {f.affiliation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Committees Section */}
        <div className="mt-20 border-t border-slate-200 pt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: "Organising Chairman",
                name: "Dr. T. Natanasabapathy",
                credentials: "MBBS, MS(ORTHO), FIAS, FDFM",
                img: "/SpeakersIMG/natanasabapathy.jpeg"
              },
              {
                role: "Organising Secretary",
                name: "Dr. E. Aakash",
                credentials: "MBBS, MS ORTHO, FIJR, FIOT, FDEM",
                img: "/SpeakersIMG/aakash.jpeg"
              },
              {
                role: "Scientific Committee",
                name: "Prof. Dr. A. Rajan Samuel",
                credentials: "Ph.D(PT), MIAP, MCMT, VMRF Director (Academics)",
                img: "/SpeakersIMG/rajansamuel.jpeg"
              },
              {
                role: "persons",
                name: "Dr. V. Kaviya Sri (PT)",
                credentials: "BPT, FDFM",
                img: "/SpeakersIMG/Img1.jpeg"
              },
              {
                role: "persons",
                name: "Dr. D. Leela Kumari (PT)",
                credentials: "BPT, FDFM",
                img: "/SpeakersIMG/Img2.jpeg"
              }
            ].map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-16 h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 relative">
                  <Image
                    src={c.img}
                    alt={c.name}
                    width={100}
                    height={125}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Details */}
                <div className="space-y-1 text-left min-w-0">
                  <span className="block text-[9px] font-bold uppercase text-[#00A896] tracking-wider">
                    {c.role}
                  </span>
                  <h4 className="font-display text-xs sm:text-sm font-black text-[#004B57] uppercase tracking-wide leading-tight break-words">
                    {c.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-semibold leading-snug break-words">
                    {c.credentials}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing & CTA Section ────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100 text-left relative z-10 overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00A896]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-12 items-center">

          {/* Left Block */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-[#00A896]/5 border border-[#00A896]/10 px-3.5 py-1.5 rounded-full">
                Tickets & Pricing
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#004B57] uppercase leading-none mt-4">
                Secure Your Seats
              </h2>
              <div className="w-16 h-1 bg-[#FF8C00] rounded-full mt-2" />
            </div>

            {/* Live Countdown Clock */}
            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-[2rem] shadow-inner inline-block">
              <CountdownTimer />
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                {
                  cat: "Students with Bonafide",
                  price: "₹500",
                  desc: "Verification via student ID required at entry desk.",
                  icon: <Users className="w-4 h-4 text-teal" />
                },
                {
                  cat: "Professional & Consultant",
                  price: "₹2,000",
                  desc: "Includes full CME access & certificate credits.",
                  icon: <Briefcase className="w-4 h-4 text-teal" />
                },
                {
                  cat: "Hands-on VR Workshop",
                  price: "₹500",
                  desc: "Practical simulation training add-on ticket.",
                  icon: <QrCode className="w-4 h-4 text-[#FF8C00]" />
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-250 p-6 rounded-2xl flex flex-col justify-between h-[180px]">
                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-450 uppercase tracking-widest">
                      {card.icon} {card.cat}
                    </span>
                    <p className="text-[10px] text-slate-400 font-semibold leading-snug">
                      {card.desc}
                    </p>
                  </div>
                  <span className="font-display text-2xl font-black tracking-tight block text-[#004B57]">
                    {card.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Contacts */}
            <div className="flex items-center gap-6 pt-4 text-slate-500 font-semibold text-xs">
              <span className="flex items-center gap-1.5 text-[#004B57]">
                <Phone className="w-4 h-4 text-[#00A896]" /> Helpline: +91 7092777764
              </span>
              <span>
                •
              </span>
              <span className="text-[#004B57]">
                Helpline: +91 82203 77047
              </span>
            </div>
          </div>

          {/* Right Block: CTA Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="relative border border-slate-200 rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden group min-w-0"
          >
            {/* Top accent */}
            <div className="h-3.5 bg-[#FF8C00]" />

            <div className="p-8 pb-8 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-teal tracking-[0.25em] uppercase block">
                  Official Conference Booking
                </span>
                <h3 className="font-display text-3xl font-black tracking-tight text-[#004B57] uppercase leading-none">
                  REGISTRATION OPEN NOW
                </h3>
              </div>

              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Reserve your slot online by submitting individual info and uploading transaction reference screenshots instantly.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Quick 3-step registration layout",
                  "Includes attendance credit credits & certificate",
                  "Includes lunch and tea hospitality"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#E0F2F1] text-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal font-black text-xs">✓</span>
                    </div>
                    <span className="text-xs text-slate-600 font-bold leading-none">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="p-8 pt-6 bg-slate-50 border-t border-slate-100 flex flex-col justify-center min-h-[100px]">
              <Link
                href="/iyakkam/arise/register"
                className="btn-primary btn-orange group/btn w-full justify-center text-sm py-4 rounded-2xl font-bold flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-transform"
              >
                Register Online Now
                <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Main Page Assembly ───────────────────────────────────────────────────────
export default function ArisePage() {
  return (
    <main style={{ overflowX: "hidden" }} className="bg-slate-50 text-slate-800 select-none">
      <Navbar />
      <HeroSection />
      <WhyAttendSection />
      <WhoShouldAttendSection />
      <FacultySection />
      <PricingSection />
      <Footer />
    </main>
  );
}
