"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  Award,
  Users,
  Briefcase,
  Layers,
  Heart,
  QrCode,
  Phone,
  Sparkles,
  Coffee,
  Utensils,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Building2,
  Stethoscope,
  HelpCircle,
  FileText
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// ─── Countdown Timer Component ────────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-17T08:30:00").getTime();
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
    <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" }
      ].map((t, idx) => (
        <div
          key={idx}
          className="bg-white text-slate-800 border border-slate-200/80 rounded-2xl p-3 sm:p-4 text-center min-w-[72px] sm:min-w-[84px] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border-t-4 border-t-[#00A896]"
        >
          <div className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-none text-[#00A896]">
            {t.value.toString().padStart(2, "0")}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Header Partner Badges Component ───────────────────────────────────────────
function PartnerLogosHeader() {
  const partners = [
    { name: "Valli Super Speciality Hospital", subtitle: "Presents", primary: true },
    { name: "KIOT", full: "Knowledge Institute of Technology", badge: "Estd. 2009" },
    { name: "TNOA", full: "Tamilnadu Orthopaedic Association", badge: "Founded 1969" },
    { name: "OASIS", full: "Orthopaedic Association of South Indian States", badge: "Estd. 2002" },
    { name: "Mid West Ortho Society", full: "Mid West Ortho Society @ Salem", badge: "Estd. 1985" },
  ];

  return (
    <div className="w-full bg-[#004B57] border-b border-[#00A896]/30 text-white py-3 px-4 relative z-20 shadow-md">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C00] animate-ping" />
          <span className="font-extrabold text-[#00A896] uppercase tracking-wider text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
            National CME & Workshop 2026
          </span>
        </div>

        {/* Association Badges List */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-semibold text-[11px] text-slate-200">
          <span className="text-[#FF8C00] font-extrabold">In Joint Association With:</span>
          {partners.slice(1).map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full text-white shadow-sm"
              title={p.full}
            >
              <span className="font-extrabold text-white">{p.name}</span>
              <span className="text-[9px] text-[#00A896] bg-slate-900/60 px-1.5 py-0.2 rounded font-mono font-bold">
                {p.badge}
              </span>
            </span>
          ))}
        </div>

        {/* Credit Points Badge */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 text-amber-200 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider shadow-sm">
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>IAP Credit Points Applied</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="grid-bg-dots relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F0FAF9 0%, #FFFFFF 50%, #F5FAFB 100%)",
        paddingTop: 40,
        paddingBottom: 70,
      }}
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-[#E0F2F1]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[35vw] h-[35vw] rounded-full bg-[#00A896]/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-10 items-center">

          {/* Left Block */}
          <div className="space-y-6 text-left">

            {/* Host Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#00A896]/20 shadow-sm text-xs font-bold"
            >
              <span className="text-[#00A896] uppercase tracking-wider">Valli Super Speciality Hospital</span>
              <span className="text-slate-400 font-normal">Presents</span>
            </motion.div>

            {/* Title & Acronym */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-baseline gap-3">
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(48px, 6vw, 92px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.85,
                    color: "#004B57",
                  }}
                >
                  ARISE
                </h1>
                <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#FF8C00] bg-[#FF8C00]/10 px-3 py-1 rounded-2xl border border-[#FF8C00]/30">
                  2026
                </span>
              </div>

              {/* Acronym Breakdown */}
              <div className="mt-4 p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <p className="text-slate-700 font-extrabold text-sm sm:text-base leading-snug tracking-wide">
                  <span className="text-[#FF8C00]">A</span>dvancements in{" "}
                  <span className="text-[#FF8C00]">R</span>ecovery,{" "}
                  <span className="text-[#FF8C00]">I</span>ntelligence &{" "}
                  <span className="text-[#FF8C00]">S</span>ports{" "}
                  <span className="text-[#FF8C00]">E</span>ngineering
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-[#FF8C00] to-[#00A896] rounded-full mt-2" />
                <p className="text-[#004B57] font-black uppercase tracking-wider text-xs sm:text-sm mt-2.5">
                  WHERE ARTIFICIAL INTELLIGENCE MEETS HUMAN PERFORMANCE
                </p>
              </div>
            </motion.div>

            {/* Event Key Info Chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Date</span>
                  <span className="font-extrabold text-xs sm:text-sm text-[#004B57]">17 OCTOBER 2026</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/10 text-[#FF8C00] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Timing</span>
                  <span className="font-extrabold text-xs sm:text-sm text-[#004B57]">08:30 AM – 4:30 PM</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">City</span>
                  <span className="font-extrabold text-xs sm:text-sm text-[#004B57]">SALEM, TAMIL NADU</span>
                </div>
              </div>
            </motion.div>

            {/* Detailed Venue Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-slate-900 text-white p-4 rounded-2xl flex items-start gap-3 shadow-md border border-slate-800"
            >
              <Building2 className="w-5 h-5 text-[#00A896] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-[#00A896] uppercase tracking-wider block">Official Venue</span>
                <p className="font-bold text-xs sm:text-sm text-slate-100">
                  Knowledge Institute of Technology, Kakapalayam, Salem, Tamil Nadu
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/iyakkam/arise/register"
                className="btn-primary btn-orange px-8 py-4 rounded-2xl text-sm font-extrabold shadow-lg shadow-orange/20 flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                Register Online Now
                <ArrowRight size={18} />
              </Link>
              <a
                href="#schedule"
                className="bg-white text-[#004B57] border border-slate-300 hover:border-[#00A896] px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <Calendar size={16} className="text-[#00A896]" />
                View Session Schedule
              </a>
            </motion.div>

            {/* Phone Enquiries Banner */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#004B57] font-bold text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-[#00A896] uppercase tracking-wider font-extrabold">
                <Phone className="w-4 h-4 text-[#FF8C00]" /> Helpline & Bulk Registrations:
              </span>
              <div className="flex items-center gap-3 font-extrabold text-slate-800">
                <a href="tel:+917092777764" className="hover:text-[#00A896] transition-colors">+91 7092777764</a>
                <span className="text-slate-300">•</span>
                <a href="tel:+918220377047" className="hover:text-[#00A896] transition-colors">+91 82203 77047</a>
              </div>
            </div>

          </div>

          {/* Right Block: Interactive Telemetry Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center"
          >
            {/* Outer animated rings */}
            <div className="absolute inset-0 border border-dashed border-[#00A896]/30 rounded-full animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-5 border border-[#FF8C00]/20 rounded-full" />

            <div className="relative w-full h-full rounded-full overflow-hidden p-5 bg-white/60 backdrop-blur-md shadow-2xl border border-white/80 flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <Image
                  src="/assets/arise_telemetry_v4.png"
                  alt="AI sports telemetry and biomechanics visual"
                  width={800}
                  height={800}
                  priority
                  className="w-full h-full object-cover opacity-90 object-center rounded-full"
                />

                {/* Mask Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none backdrop-blur-[4px] rounded-full"
                  style={{
                    maskImage: "radial-gradient(circle, transparent 55%, black 100%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 100%)"
                  }}
                />

                {/* Metric Floating Badges */}
                <div className="absolute top-6 left-6 bg-[#004B57]/90 text-[#00A896] p-3 rounded-2xl border border-[#00A896]/30 shadow-lg backdrop-blur-md flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Bio-Telemetry</span>
                </div>
                <div className="absolute bottom-8 right-8 bg-[#FF8C00]/90 text-white p-3 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI Rehabilitation</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Dignitaries / Chief & Special Guests Section (Image 3) ────────────────────
function DignitariesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/80 relative z-10 text-left">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-[#00A896]/10 border border-[#00A896]/20 px-3.5 py-1.5 rounded-full">
            Brochure Page 3 • Guest Dignitaries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            Chief & Special Guests
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            Honored by leaders from the Government of Tamil Nadu, Sports Authority of India, and Academic Institutions.
          </p>
        </div>

        {/* Chief Guest Banner */}
        <div className="max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#004B57] via-[#005F6E] to-[#004B57] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#00A896]/30 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF8C00]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="bg-[#FF8C00] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md mb-3">
                CHIEF GUEST
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                Dr. K. G. ARUNRAJ
              </h3>
              <p className="text-[#00A896] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 bg-white/10 px-4 py-1 rounded-full border border-white/10 inline-block">
                HONORABLE HEALTH MINISTER, TAMIL NADU
              </p>
            </div>
          </motion.div>
        </div>

        {/* Special Guests Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              badge: "SPECIAL GUEST",
              name: "Dr. N. SHARATH CHANDRA YADAV",
              role: "Regional Director",
              inst: "Sports Authority of India (SAI)"
            },
            {
              badge: "SPECIAL GUEST",
              name: "Dr. PSS. SRINIVASAN",
              qual: "B.E., M.Tech.(IIT-B), Ph.D., MISTE., ISHMT., FMFPI",
              role: "Founder & Executive Chairman",
              inst: "Knowledge Institute of Technology"
            },
            {
              badge: "SPECIAL GUEST",
              name: "Dr. K. VISAGAVEL",
              qual: "B.E., M.E., Ph.D., FIE.",
              role: "Principal",
              inst: "Knowledge Institute of Technology"
            }
          ].map((g, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group border-t-4 border-t-[#00A896]"
            >
              <div>
                <span className="text-[9px] font-bold text-[#00A896] uppercase tracking-widest bg-[#00A896]/10 px-2.5 py-1 rounded-full inline-block mb-3">
                  {g.badge}
                </span>
                <h4 className="font-display text-base sm:text-lg font-black text-[#004B57] uppercase tracking-wide leading-snug">
                  {g.name}
                </h4>
                {g.qual && (
                  <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-tight">
                    {g.qual}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-extrabold text-slate-700 block">{g.role}</span>
                <span className="text-[11px] font-bold text-[#00A896] block">{g.inst}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Session Overview / Scientific Programme Schedule Section (Image 2) ────────
function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const scheduleData = [
    {
      time: "08:30 AM - 09:15 AM",
      session: "REGISTRATION",
      title: "Participant Check-In & Registration Kit Distribution",
      speaker: "Organizing Team",
      role: "Valli Super Speciality Hospital & KIOT Volunteers",
      type: "BREAK",
      icon: <FileText className="w-4 h-4 text-teal" />
    },
    {
      time: "09:30 AM - 10:00 AM",
      session: "SESSION I",
      title: "Strategic AI Adoption in Sports Medicine Education: The Fine Line Between Independence and Dependence",
      speaker: "Dr. Bharat Pulavarti, M.B.B.S, M.D (PMR)",
      role: "Physical Medicine & Rehabilitation, Sports Injury Centre, Safdarjung Hospital, New Delhi",
      type: "KEYNOTE",
      icon: <Brain className="w-4 h-4 text-teal" />
    },
    {
      time: "10:00 AM - 10:30 AM",
      session: "SESSION I",
      title: "Load Monitoring Injury Linkage Tracking by Biomarkers and Management",
      speaker: "Mr. Tambi Medabala, M.Sc",
      role: "Sports Physiologist; High Performance Director (Sports Sciences) NSNIS Patiala Under SAI",
      type: "KEYNOTE",
      icon: <Activity className="w-4 h-4 text-teal" />
    },
    {
      time: "10:30 AM - 11:00 AM",
      session: "SESSION I",
      title: "INAUGURATION CEREMONY",
      speaker: "Chief Guest & Dignitaries",
      role: "Official Opening & Lamp Lighting",
      type: "EVENT",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />
    },
    {
      time: "11:00 AM - 11:30 AM",
      session: "SESSION I",
      title: "The Future of Human Motion Analysis - AI, Biomechanics and Personalised Rehabilitation",
      speaker: "Dr. Rahul Tiwari, Ph.D",
      role: "Head of Sports Performance Analysis, Inspire Institute of Sport (IIS), Karnataka",
      type: "KEYNOTE",
      icon: <Watch className="w-4 h-4 text-teal" />
    },
    {
      time: "11:30 AM - 12:00 PM",
      session: "SESSION I",
      title: "EEG-Based Motor Imagery and Virtual Reality for Sports Medicine",
      speaker: "Dr. Kishor Lakshminarayanan, Ph.D",
      role: "Associate Professor, School of Healthcare Science and Engineering, VIT, Vellore",
      type: "KEYNOTE",
      icon: <Brain className="w-4 h-4 text-teal" />
    },
    {
      time: "12:00 PM - 12:15 PM",
      session: "SESSION I",
      title: "Tea Break & Networking",
      speaker: "All Participants",
      role: "Refresher & Coffee Lounge",
      type: "BREAK",
      icon: <Coffee className="w-4 h-4 text-amber-600" />
    },
    {
      time: "12:15 PM - 12:45 PM",
      session: "SESSION II",
      title: "Wearables and Sensors - Practical Applications for Athlete Recovery and Readiness",
      speaker: "Mr. Aditya Subramanyam, M.S.",
      role: "Sports Scientist, Department of Sports Science and Sports Medicine - Vijayi Bharath Foundation, Gujarat",
      type: "KEYNOTE",
      icon: <Watch className="w-4 h-4 text-teal" />
    },
    {
      time: "12:45 PM - 01:15 PM",
      session: "SESSION II",
      title: "Structuring AI for Health and Sports Performance among Athletes of Special Olympics",
      speaker: "Dr. R. Karthikeyan, M.B.B.S, M.D (PMR)",
      role: "Prof & Head, Dept of Physical Medicine and Rehabilitation, SRM Medical College Hospital, Kattankulathur",
      type: "KEYNOTE",
      icon: <Stethoscope className="w-4 h-4 text-teal" />
    },
    {
      time: "01:15 PM - 01:30 PM",
      session: "SESSION II",
      title: "Interactive Q&A Session & Live Kahoot Quiz",
      speaker: "Session Chairs & Faculty",
      role: "Audience Participation & Prize Distribution",
      type: "EVENT",
      icon: <HelpCircle className="w-4 h-4 text-teal" />
    },
    {
      time: "01:30 PM - 02:15 PM",
      session: "SESSION II",
      title: "Lunch Break",
      speaker: "All Participants",
      role: "Hospitality Dining Area",
      type: "BREAK",
      icon: <Utensils className="w-4 h-4 text-emerald-600" />
    },
    {
      time: "02:15 PM - 03:00 PM",
      session: "SESSION III",
      title: "Footwear as Medicine; Biomechanical Assessment for Smarter Footwear Selection",
      speaker: "Dr. Rahul Tiwari, Ph.D",
      role: "Head of Sports Performance Analysis, Inspire Institute of Sport (IIS)",
      type: "WORKSHOP",
      icon: <Layers className="w-4 h-4 text-[#FF8C00]" />
    },
    {
      time: "03:00 PM - 03:45 PM",
      session: "SESSION III",
      title: "Hands on Workshop on Tele Rehabilitation Using VR",
      speaker: "Dr. Kishor Lakshminarayanan, Ph.D",
      role: "Associate Professor, VIT Vellore",
      type: "WORKSHOP",
      icon: <Layers className="w-4 h-4 text-[#FF8C00]" />
    },
    {
      time: "03:45 PM - 04:30 PM",
      session: "SESSION III",
      title: "Cardiac Load Monitoring using Wearable Sensors",
      speaker: "Miss G.Sri Gayathri, M.S.",
      role: "Lead Researcher, Acrophase, Human performance lab, IIT Madras",
      type: "WORKSHOP",
      icon: <Layers className="w-4 h-4 text-[#FF8C00]" />
    },
    {
      time: "04:30 PM Onwards",
      session: "SESSION IV",
      title: "Valedictory & Feedback Session",
      speaker: "Organizing Committee & Faculty",
      role: "Certificate Distribution & Closing Remarks",
      type: "EVENT",
      icon: <Award className="w-4 h-4 text-[#00A896]" />
    }
  ];

  const filteredData = activeTab === "ALL"
    ? scheduleData
    : scheduleData.filter(item => item.session === activeTab);

  return (
    <section id="schedule" className="py-24 bg-white border-t border-slate-200 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-[#00A896]/10 border border-[#00A896]/20 px-3.5 py-1.5 rounded-full">
            Brochure Page 2 • Full Scientific Agenda
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            SESSION OVERVIEW
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            Detailed timeline featuring lectures, clinical keynotes, interactive Q&As, and hands-on workshops.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "ALL", label: "All Sessions" },
            { id: "SESSION I", label: "Session I (Morning)" },
            { id: "SESSION II", label: "Session II (Midday)" },
            { id: "SESSION III", label: "Session III (3 Hands-on Workshops)" },
            { id: "SESSION IV", label: "Session IV (Valedictory)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === tab.id
                ? "bg-[#004B57] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedule Table / List */}
        <div className="max-w-5xl mx-auto space-y-4">
          {filteredData.map((item, index) => {
            const isWorkshop = item.type === "WORKSHOP";
            const isBreak = item.type === "BREAK";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isWorkshop
                  ? "bg-gradient-to-r from-orange-50/90 to-amber-50/60 border-orange-200 shadow-sm"
                  : isBreak
                    ? "bg-slate-50 border-slate-200/60"
                    : "bg-white border-slate-200/90 hover:border-[#00A896]/40 hover:shadow-md"
                  }`}
              >
                {/* Time & Session Badge */}
                <div className="md:w-64 shrink-0 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00A896]">
                    <Clock className="w-4 h-4 text-[#FF8C00]" />
                    <span>{item.time}</span>
                  </div>
                  <span
                    className={`inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isWorkshop
                      ? "bg-[#FF8C00] text-white"
                      : "bg-[#004B57]/10 text-[#004B57]"
                      }`}
                  >
                    {item.session}
                  </span>
                </div>

                {/* Scientific Programme Title */}
                <div className="flex-1 space-y-1">
                  <h4 className="font-display text-sm sm:text-base font-extrabold text-[#004B57] leading-snug">
                    {item.title}
                  </h4>
                  {isWorkshop && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">
                      <Sparkles className="w-3 h-3" /> Hands-on Masterclass Session
                    </span>
                  )}
                </div>

                {/* Speaker Info */}
                <div className="md:w-72 shrink-0 md:text-right pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <span className="font-extrabold text-xs text-slate-800 block">
                    {item.speaker}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold leading-tight block">
                    {item.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ─── Our Faculty Section (Image 4) ─────────────────────────────────────────────
function FacultySection() {
  const faculty = [
    {
      name: "Dr. R. Karthikeyan, M.B.B.S, M.D (PMR)",
      title: "Prof & Head, Dept of Physical Medicine and Rehabilitation",
      affiliation: "SRM Medical College Hospital, Kattankulathur",
      img: "/SpeakersIMG/Karthikeyan.png",
      position: "object-center"
    },
    {
      name: "Mr. Tambi Medabala, M.Sc",
      title: "High Performance Director (Sports Science) Exercise Physiology & Human Performance",
      affiliation: "Sports Authority of India (SAI), NSNIS Patiala",
      img: "/SpeakersIMG/Tambi.png",
      position: "object-center"
    },
    {
      name: "Dr. Rahul Tiwari, Ph.D",
      title: "Head of Sports Performance Analysis",
      affiliation: "Inspire Institute of Sport (IIS), Karnataka",
      img: "/SpeakersIMG/RahulTiwari.png",
      position: "object-top"
    },
    {
      name: "Dr. Kishor Lakshminarayanan, Ph.D",
      title: "Associate Professor",
      affiliation: "School of Healthcare Science and Engineering, VIT, Vellore",
      img: "/SpeakersIMG/KishorLakshminarayanan.jpg",
      position: "object-center"
    },
    {
      name: "Dr. Bharat Pulavarti, M.B.B.S, M.D (PMR)",
      title: "Physical Medicine & Rehabilitation",
      affiliation: "Sports Injury Centre, Delhi",
      img: "/SpeakersIMG/BharatPulavarti.jpg",
      position: "object-center"
    },
    {
      name: "Mr. Aditya Subramanyam, M.S.",
      title: "Sports Scientist",
      affiliation: "Department of Sports Science and Sports Medicine - Vijayi Bharath Foundation, Gujarat",
      img: "/SpeakersIMG/aditya.png",
      position: "object-center"
    },
    {
      name: "Miss G. Sri Gayathri, M.S.",
      title: "Lead Researcher, Acrophase",
      affiliation: "Human performance lab, IIT Madras",
      img: "/SpeakersIMG/gayathri.jpeg",
      position: "object-contain p-2 bg-white"
    }
  ];

  return (
    <section id="faculty" className="py-24 bg-slate-50 border-t border-slate-200 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-white border border-[#00A896]/15 px-3.5 py-1.5 rounded-full shadow-sm">
            Brochure Page 4 • Distinguished Lecturers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            OUR FACULTY
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            Leading researchers and clinical experts spearheading sessions at ARISE 2026.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {faculty.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Doctor Avatar */}
              <div className="w-20 h-24 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative shadow-inner">
                <Image
                  src={f.img}
                  alt={f.name}
                  width={150}
                  height={150}
                  className={`w-full h-full object-cover ${f.position}`}
                />
              </div>

              {/* Doctor Bio */}
              <div className="space-y-1 self-center min-w-0">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#004B57] uppercase tracking-wide leading-tight">
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

      </div>
    </section>
  );
}

// ─── Organizing Committee Section (Image 3) ────────────────────────────────────
function CommitteeSection() {
  const committee = [
    {
      role: "ORGANIZING CHAIRMAN",
      name: "Dr. T. NATANASABAPATHY",
      title: "Chief Orthopedic Surgeon",
      inst: "Valli Super Speciality Hospital",
      img: "/SpeakersIMG/TNS.jpeg"
    },
    {
      role: "ORGANIZING CO-CHAIRMAN",
      name: "Dr. I. VIJAYALAKSHMI",
      title: "Chief Executive Officer",
      inst: "Valli Super Speciality Hospital",
      img: "/SpeakersIMG/mam.jpeg"
    },
    {
      role: "ORGANIZING SECRETARY",
      name: "Dr. E. AAKASH",
      title: "Consultant Orthopedic Surgeon",
      inst: "Valli Super Speciality Hospital",
      img: "/SpeakersIMG/Aakash.jpeg"
    },
    {
      role: "COMMITTEE MEMBER",
      name: "Prof. Dr. A. Rajan Samuel",
      title: "Ph.D(PT), MIAP, MCMT",
      inst: "VMRF DIRECTOR (ACADEMICS)",
      img: "/SpeakersIMG/rajansamuel.jpeg"
    },
    {
      role: "COMMITTEE MEMBER",
      name: "Dr. D. LEELA KUMARI",
      title: "Physiotherapist",
      inst: "Valli Super Speciality Hospital",
      img: "/SpeakersIMG/leela.jpeg"
    },
    {
      role: "COMMITTEE MEMBER",
      name: "Dr. V. KAVIYA SRI",
      title: "Physiotherapist",
      inst: "Valli Super Speciality Hospital",
      img: "/SpeakersIMG/kavya.jpeg"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200 text-left relative z-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-[#00A896]/10 border border-[#00A896]/20 px-3.5 py-1.5 rounded-full">
            Brochure Page 3 • Executive Leadership
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004B57] uppercase mt-4">
            Organizing Committee
          </h2>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            The leadership team behind ARISE 2026 at Valli Super Speciality Hospital.
          </p>
        </div>

        {/* Committee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {committee.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-18 h-22 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 relative shadow-sm">
                <Image
                  src={c.img}
                  alt={c.name}
                  width={100}
                  height={125}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-1 text-left min-w-0">
                <span className="block text-[9px] font-extrabold uppercase text-[#FF8C00] tracking-wider">
                  {c.role}
                </span>
                <h4 className="font-display text-xs sm:text-sm font-black text-[#004B57] uppercase tracking-wide leading-tight">
                  {c.name}
                </h4>
                <p className="text-[10px] text-slate-600 font-bold leading-snug">
                  {c.title}
                </p>
                <p className="text-[9px] text-slate-400 font-semibold leading-snug">
                  {c.inst}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Registration & Pricing Section (Image 4) ──────────────────────────────────
function PricingSection() {
  return (
    <section id="registration" className="py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200 text-left relative z-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* Left Column: Fees & Information */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#00A896] text-[10px] font-bold uppercase tracking-widest bg-[#00A896]/10 border border-[#00A896]/20 px-3.5 py-1.5 rounded-full">
                Brochure Page 4 • Fee Structure
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#004B57] uppercase leading-none mt-3">
                REGISTRATION
              </h2>
              <div className="w-16 h-1 bg-[#FF8C00] rounded-full mt-2" />
            </div>

            {/* Live Countdown Timer */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                Event Starts In:
              </span>
              <CountdownTimer />
            </div>

            {/* Pricing Cards Grid (Exact matching Brochure Page 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-[#00A896]/30 p-6 rounded-3xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded-full inline-block">
                    STUDENT RATE
                  </span>
                  <h3 className="font-display text-sm font-extrabold text-[#004B57] uppercase">
                    Students
                  </h3>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Applicable for UG/PG medical & physiotherapy students.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="font-display text-3xl font-black text-[#004B57]">
                    ₹1,000
                  </span>
                </div>
              </div>

              <div className="bg-white border-2 border-[#FF8C00]/30 p-6 rounded-3xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8C00] bg-[#FF8C00]/10 px-2.5 py-1 rounded-full inline-block">
                    PROFESSIONAL RATE
                  </span>
                  <h3 className="font-display text-sm font-extrabold text-[#004B57] uppercase">
                    Professionals, Consultants & Graduates
                  </h3>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Includes CME credits, full sessions & delegate kit.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="font-display text-3xl font-black text-[#004B57]">
                    ₹2,000
                  </span>
                </div>
              </div>

              <div className="bg-white border-2 border-teal/30 p-6 rounded-3xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-1 rounded-full inline-block">
                    PRACTICAL ADD-ON
                  </span>
                  <h3 className="font-display text-sm font-extrabold text-[#004B57] uppercase">
                    Workshop
                  </h3>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Hands-on interactive masterclass sessions.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="font-display text-3xl font-black text-[#004B57]">
                    ₹1,000
                  </span>
                </div>
              </div>
            </div>

            {/* Helpline Contacts */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-md">
              <div>
                <span className="text-[10px] font-bold text-[#00A896] uppercase tracking-wider block">
                  FOR REGISTRATION ENQUIRIES
                </span>
                <p className="text-xs text-slate-300 font-semibold">
                  Have questions about bulk student discounts or registration?
                </p>
              </div>
              <div className="flex items-center gap-4 font-black text-sm text-[#FF8C00]">
                <a href="tel:+917092777764" className="hover:text-white transition-colors">+91 7092777764</a>
                <span>|</span>
                <a href="tel:+918220377047" className="hover:text-white transition-colors">+91 8220377047</a>
              </div>
            </div>

          </div>

          {/* Right Column: Instant Registration Card with QR Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden text-center p-8 relative flex flex-col items-center justify-between space-y-6"
          >
            <div className="w-full space-y-2 text-center">
              <span className="text-[10px] font-bold text-[#00A896] tracking-widest uppercase block bg-[#00A896]/10 py-1 px-3 rounded-full">
                ONLINE REGISTRATION
              </span>
              <h3 className="font-display text-2xl font-black text-[#004B57] uppercase">
                SCAN TO REGISTER
              </h3>
              <p className="text-slate-500 font-semibold text-xs">
                Scan the QR code below using your phone camera or click the register button.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-slate-50 border-2 border-dashed border-[#00A896]/30 rounded-3xl inline-block shadow-inner">
              <Image
                src="/assets/payment-qr.jpg"
                alt="ARISE 2026 Registration QR Code"
                width={200}
                height={200}
                className="w-44 h-44 object-contain rounded-2xl"
              />
            </div>

            {/* Register CTA Button */}
            <Link
              href="/iyakkam/arise/register"
              className="btn-primary btn-orange w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange/20 hover:-translate-y-0.5 transition-transform"
            >
              <span>Go to Online Registration Form</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Session III: 3 Specialized Workshops Showcase ────────────────────────────
function WorkshopsSection() {
  const workshops = [
    {
      num: "Workshop 01",
      time: "02:15 PM – 03:00 PM",
      title: "Footwear as Medicine; Biomechanical Assessment for Smarter Footwear Selection",
      speaker: "Dr. Rahul Tiwari, Ph.D",
      role: "Head of Sports Performance Analysis, Inspire Institute of Sport (IIS), Karnataka",
      img: "/SpeakersIMG/RahulTiwari.png",
      badge: "Biomechanical Assessment & Gait Dynamics",
      desc: "Practical evaluation of lower-limb kinematics, plantagrade pressure mapping, gait diagnostics, and evidence-based criteria for clinical and athletic footwear selection."
    },
    {
      num: "Workshop 02",
      time: "03:00 PM – 03:45 PM",
      title: "Hands-on Workshop on Tele Rehabilitation Using VR",
      speaker: "Dr. Kishor Lakshminarayanan, Ph.D",
      role: "Associate Professor, School of Healthcare Science & Engineering, VIT Vellore",
      img: "/SpeakersIMG/KishorLakshminarayanan.jpg",
      badge: "Virtual Reality & Telerehab",
      desc: "Immersive hands-on session using virtual reality environments, wireless motion capture sensors, and remote digital health frameworks for telerehabilitation."
    },
    {
      num: "Workshop 03",
      time: "03:45 PM – 04:30 PM",
      title: "Cardiac Load Monitoring using Wearable Sensors",
      speaker: "Miss G. Sri Gayathri, M.S.",
      role: "Lead Researcher, Acrophase, Human Performance Lab, IIT Madras",
      img: "/SpeakersIMG/gayathri.jpeg",
      badge: "Wearable Sensor Telemetry",
      desc: "Real-time cardiovascular telemetry demo, continuous athletic load tracking, and wearable PPG/ECG sensor analytics developed at the Human Performance Lab, IIT Madras."
    }
  ];

  return (
    <section id="workshops" className="py-20 bg-slate-900 text-white relative overflow-hidden text-left border-t border-slate-800">
      {/* Background glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF8C00]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#00A896]/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#FF8C00] text-[10px] font-black uppercase tracking-widest bg-[#FF8C00]/15 border border-[#FF8C00]/30 px-4 py-1.5 rounded-full inline-block shadow-sm">
            SESSION III • 3 EXCLUSIVE HANDS-ON WORKSHOPS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-4">
            FEATURED SESSION III WORKSHOPS
          </h2>
          <p className="text-slate-300 font-semibold text-xs sm:text-sm mt-2 leading-relaxed">
            Session III features 3 intensive practical masterclasses designed for clinical doctors, physiotherapists, and sports engineers.
          </p>
        </div>

        {/* 3 Workshops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {workshops.map((w, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-800/90 border border-slate-700 hover:border-[#FF8C00]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-widest bg-[#FF8C00]/15 px-3 py-1 rounded-full border border-[#FF8C00]/30">
                    {w.num}
                  </span>
                  <span className="text-xs font-bold text-[#00A896] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {w.time}
                  </span>
                </div>

                {/* Workshop Title */}
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {w.title}
                </h3>

                {/* Badge Tag */}
                <span className="inline-block text-[10px] font-bold text-[#00A896] bg-[#00A896]/15 border border-[#00A896]/30 px-2.5 py-0.5 rounded-full">
                  {w.badge}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {w.desc}
                </p>
              </div>

              {/* Speaker Card at Bottom */}
              <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden shrink-0 border border-white/20">
                  <Image
                    src={w.img}
                    alt={w.speaker}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Workshop Lead</span>
                  <h4 className="font-bold text-xs text-white truncate">{w.speaker}</h4>
                  <p className="text-[10px] text-[#00A896] truncate">{w.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Main Page Assembly ───────────────────────────────────────────────────────
export default function ArisePage() {
  return (
    <main className="bg-white text-slate-800 select-none overflow-x-clip min-h-screen">
      <Navbar />
      {/* Top spacing to completely clear fixed header navbar (~88px) */}
      <div className="pt-[84px] sm:pt-[92px]">
        <PartnerLogosHeader />
      </div>
      <HeroSection />
      <DignitariesSection />
      <ScheduleSection />
      <WorkshopsSection />
      <FacultySection />
      <CommitteeSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
