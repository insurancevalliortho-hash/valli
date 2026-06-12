"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Brain,
  Activity,
  Cpu,
  TrendingUp,
  Award,
  Users,
  Mail,
  Phone,
  ArrowRight,
  Shield,
  Smartphone,
  CheckCircle,
  FileText,
  Send,
  Zap,
  Sparkles,
  Info
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SmoothScroll from "../../../components/SmoothScroll";
// @ts-ignore
import { animate, stagger } from "animejs";

// Topics Data from the second flyer image
const TOPICS = [
  {
    id: "01",
    title: "Role of Artificial Intelligence in Early Sports Injury Detection",
    desc: "Deploying machine learning models to identify sub-clinical biomechanical anomalies and predict soft-tissue strains before they manifest clinically.",
    icon: <Brain className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "02",
    title: "Future of Smart Sports Hospitals in India",
    desc: "Examining digital infrastructure, connected clinical wards, and data streams defining the next generation of specialized athletic care centers.",
    icon: <Cpu className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "03",
    title: "Artificial Intelligence in Return-to-Play Decision Making",
    desc: "Establishing metric-driven recovery thresholds using dynamic joint loading telemetry to remove subjective bias from athletic clearance.",
    icon: <Activity className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "04",
    title: "Biomechanical Pattern Recognition Using Deep Learning",
    desc: "Applying convolutional neural networks to high-speed video frames to analyze running gait symmetry and joint angle cadences.",
    icon: <TrendingUp className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "05",
    title: "Intelligent Rehabilitation Systems for Athlete Performance Recovery",
    desc: "Utilizing closed-loop biofeedback systems to adjust resistance profiles and clinical loading protocols in real-time.",
    icon: <Shield className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "06",
    title: "Practical Use of Wearable Sensors in Sports Rehabilitation",
    desc: "Integrating wireless IMU sensors, EMG muscle monitors, and force-plate insoles for field-based athletic telemetry.",
    icon: <Smartphone className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "07",
    title: "AI and Human Collaboration in Clinical Physiotherapy",
    desc: "Empowering clinical physical therapists with AI-driven joint load prediction to optimize exercise volume and intensity.",
    icon: <Users className="w-5 h-5 text-[#00A896]" />
  },
  {
    id: "08",
    title: "AI-Guided Recovery Optimization in Elite Sports",
    desc: "Leveraging predictive analytics to model fatigue recovery rates and optimize training loads for professional athletes.",
    icon: <Award className="w-5 h-5 text-[#00A896]" />
  }
];

export default function AISportsRehabEventPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partnerType, setPartnerType] = useState("Academic");
  const [message, setMessage] = useState("");
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  // Setup Anime.js Animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Hero entrance animations
    animate(".hero-badge", {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: 200,
      easing: "easeOutExpo",
      duration: 1000
    });

    animate(".hero-title", {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 350,
      easing: "easeOutExpo",
      duration: 1000
    });

    animate(".hero-subtitle", {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: 500,
      easing: "easeOutExpo",
      duration: 1000
    });

    animate(".hero-desc", {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: 650,
      easing: "easeOutExpo",
      duration: 1000
    });

    animate(".hero-ctas", {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: 800,
      easing: "easeOutExpo",
      duration: 1000
    });

    animate(".hero-stats-card", {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: stagger(100, { start: 900 }),
      easing: "easeOutExpo",
      duration: 1000
    });

    animate(".hero-runner-container", {
      scale: [0.95, 1],
      opacity: [0, 1],
      delay: 400,
      easing: "easeOutExpo",
      duration: 1200
    });

    // 2. Floating animations for HUD graphics on the right
    animate(".floating-hud-card-1", {
      translateY: [0, -10],
      duration: 2000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine"
    });

    animate(".floating-hud-card-2", {
      translateY: [0, 12],
      duration: 2200,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine"
    });

    animate(".floating-hud-card-3", {
      translateY: [0, -8],
      duration: 1900,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine"
    });

    // 3. Scroll Reveal using Intersection Observer & Anime.js
    const revealOnScroll = (className: string, animationConfig: any) => {
      const elements = document.querySelectorAll(className);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target as any, {
                ...animationConfig
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Reveal Focus areas
    revealOnScroll(".reveal-focus-card", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutCubic",
      delay: stagger(150)
    });

    // Reveal Topics grid
    revealOnScroll(".reveal-topic-card", {
      translateY: [30, 0],
      scale: [0.96, 1],
      opacity: [0, 1],
      duration: 700,
      easing: "easeOutCubic",
      delay: stagger(80)
    });

    // Reveal partnership cards
    revealOnScroll(".reveal-partner-card", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 900,
      easing: "easeOutCubic",
      delay: stagger(150)
    });

    // Reveal contacts & form
    revealOnScroll(".reveal-inquiry-section", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 900,
      easing: "easeOutCubic"
    });
  }, []);

  // Submit Handler with custom anime.js particle explosion
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setFormSubmitted(true);

    // Dynamic greeting confetti/particles inside the success screen
    setTimeout(() => {
      const container = confettiContainerRef.current;
      if (!container) return;

      const particleCount = 75;
      const colors = ["#00A896", "#FF8C00", "#FFB800", "#004B57", "#E0F2F1", "#FFF8F0"];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-2.5 h-2.5 rounded-full pointer-events-none";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = "50%";
        particle.style.top = "50%";
        container.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 260 + 80;
        
        animate(particle, {
          translateX: [0, Math.cos(angle) * distance],
          translateY: [0, Math.sin(angle) * distance - 80],
          scale: [1.2, Math.random() * 2 + 0.4],
          rotate: [0, Math.random() * 360],
          opacity: [1, 0],
          duration: Math.random() * 1600 + 1200,
          easing: "easeOutExpo",
          complete: () => {
            particle.remove();
          }
        });
      }
    }, 100);
  };

  return (
    <SmoothScroll>
      <Navbar />

      <div className="font-body text-slate-800 bg-[#FCFDFD] min-h-screen selection:bg-[#FF8C00] selection:text-white relative overflow-hidden">
        
        {/* Soft Decorative Ambient Lights (No Dark Theme) */}
        <div className="absolute top-[-5%] left-[5%] w-[600px] h-[600px] bg-[#E0F2F1]/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[25%] right-[-5%] w-[700px] h-[700px] bg-[#FFF8F0]/40 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-[#E0F2F1]/20 rounded-full blur-[130px] pointer-events-none" />

        {/* Diagonal Light Lines Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #00A896 0px, #00A896 1px, transparent 1px, transparent 40px)",
        }} />

        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column - Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="hero-badge opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F2F1] border border-[#B2E0DA] text-[#004B57] text-xs font-bold tracking-[0.2em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse" />
                  Valli Super Speciality Hospital CME
                </div>

                <h1
                  className="hero-title opacity-0 text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05] uppercase text-[#004B57]"
                >
                  AI IN SPORTS<br />
                  <span className="text-[#FF8C00]">REHABILITATION</span>
                </h1>

                <p
                  className="hero-subtitle opacity-0 text-[#00A896] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] leading-relaxed"
                >
                  Bridging Technology, Academic and Clinical Excellence
                </p>

                <p
                  className="hero-desc opacity-0 text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed max-w-xl"
                >
                  Explore the convergence of computer vision, wearable telemetry, and orthopedic diagnostics. Organized by Valli Orthopaedic &amp; Sports Hospital, this premier symposium gathers industry tech leaders, research universities, and clinical professionals.
                </p>

                {/* Info badging list */}
                <div className="hero-stats-card opacity-0 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-2">
                  <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex items-center gap-4 hover:border-[#B2E0DA] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF8F0] text-[#FF8C00] flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">SCHEDULE DATE</span>
                      <span className="text-xs font-bold text-[#004B57]">To Be Announced Soon</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex items-center gap-4 hover:border-[#B2E0DA] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#E0F2F1] text-[#00A896] flex items-center justify-center flex-shrink-0 shadow-inner">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">EVENT VENUE</span>
                      <span className="text-xs font-bold text-[#004B57]">Salem, Tamil Nadu</span>
                    </div>
                  </div>
                </div>

                {/* Call-to-actions */}
                <div className="hero-ctas opacity-0 flex flex-wrap gap-4 pt-4">
                  <a
                    href="#inquire"
                    className="bg-[#FF8C00] hover:bg-[#E07B00] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#FF8C00]/20 hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    Join Collaboration <ArrowRight size={14} />
                  </a>
                  <a
                    href="#topics"
                    className="bg-white hover:bg-[#E0F2F1] text-[#004B57] border border-[#E2E8F0] hover:border-[#B2E0DA] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                  >
                    View Key Topics
                  </a>
                </div>
              </div>

              {/* Right Column - Premium Scanning Graphics */}
              <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] hero-runner-container opacity-0">
                {/* Circular Scanning Radar Grid */}
                <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full border border-[#00A896]/10 flex items-center justify-center">
                  <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-[#00A896]/15 flex items-center justify-center">
                    <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-[#00A896]/20 border-dashed animate-spin [animation-duration:40s]" />
                  </div>
                </div>

                {/* Main Runner Image Overlay */}
                <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px]">
                  <img
                    src="/assets/runner-overlay.png"
                    alt="AI Sports Rehabilitation telemetry scan"
                    className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,168,150,0.12)]"
                  />
                  
                  {/* Glowing Radar scan effect line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A896]/60 to-transparent shadow-[0_0_8px_#00A896] animate-bounce [animation-duration:5s]" />
                </div>

                {/* Floating telemetry metrics cards (Animated via anime.js) */}
                <div className="floating-hud-card-1 absolute top-[10%] right-[-5%] z-20 bg-white/90 backdrop-blur-md border border-[#B2E0DA] rounded-2xl p-3 shadow-md text-left flex items-center gap-2 max-w-[170px]">
                  <div className="w-7 h-7 bg-[#E0F2F1] rounded-lg flex items-center justify-center text-[#00A896]">
                    <Activity size={14} className="animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">MUSCLE ACTIVITY</span>
                    <span className="font-mono text-xs font-extrabold text-[#004B57]">Active - 92%</span>
                  </div>
                </div>

                <div className="floating-hud-card-2 absolute bottom-[15%] left-[-8%] z-20 bg-white/90 backdrop-blur-md border border-[#E2E8F0] rounded-2xl p-3 shadow-md text-left flex items-center gap-2 max-w-[170px]">
                  <div className="w-7 h-7 bg-[#FFF8F0] rounded-lg flex items-center justify-center text-[#FF8C00]">
                    <TrendingUp size={14} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">JOINT FLEXION</span>
                    <span className="font-mono text-xs font-extrabold text-[#FF8C00]">ROM 142°</span>
                  </div>
                </div>

                <div className="floating-hud-card-3 absolute bottom-[8%] right-[5%] z-20 bg-white/90 backdrop-blur-md border border-[#B2E0DA] rounded-2xl p-3 shadow-md text-left flex items-center gap-2 max-w-[175px]">
                  <div className="w-7 h-7 bg-[#E0F2F1] rounded-lg flex items-center justify-center text-[#00A896]">
                    <Brain size={14} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">FATIGUE RISK</span>
                    <span className="font-mono text-xs font-extrabold text-[#004B57]">Symmetry Index 98%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── STICKY INFORMATION STRIP ─── */}
        <section className="bg-white border-y border-slate-200 py-8 relative z-20">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PARTICIPATION FEE</span>
                <span className="text-xl font-display font-black text-[#FF8C00]">FREE REGISTRATION</span>
              </div>
              <div className="text-center border-l border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AUDIENCE PROFILE</span>
                <span className="text-xl font-display font-black text-[#004B57]">ACADEMIC &amp; TECH EXPERTS</span>
              </div>
              <div className="text-center border-l border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ORGANIZED BY</span>
                <span className="text-xl font-display font-black text-[#004B57]">VALLI ORTHOPAEDIC</span>
              </div>
              <div className="text-center border-l border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">NABH STATUS</span>
                <span className="text-xl font-display font-black text-[#004B57]">ACCREDITED SUPER SPECIALITY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── KEY FOCUS AREAS SECTION ─── */}
        <section className="py-24 bg-[#FCFDFD] relative z-10 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 text-center">
            
            <div className="mb-14 space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2F1] text-[#004B57] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={12} /> Research Domains
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#004B57] uppercase">
                KEY FOCUS AREAS
              </h2>
              <div className="w-12 h-1 bg-[#00A896] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Focus Area 1 */}
              <div className="reveal-focus-card opacity-0 bg-white border border-[#E2E8F0] rounded-[2.25rem] p-8 text-left space-y-4 hover:border-[#B2E0DA] hover:shadow-xl hover:shadow-[#004B57]/5 transition-all duration-300">
                <div className="w-12 h-12 bg-[#E0F2F1] text-[#00A896] rounded-2xl flex items-center justify-center shadow-inner">
                  <Brain size={22} />
                </div>
                <h3 className="text-xl font-display font-bold uppercase text-[#004B57] tracking-tight">
                  Predictive Analytics
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Developing machine learning models optimized for dynamic injury risk profiling, athletic loading thresholds, and continuous muscle fatigue/workload monitoring.
                </p>
                <ul className="space-y-2 text-[11px] text-[#004B57] font-bold">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00A896] font-extrabold">✓</span> Video pose-estimation algorithms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00A896] font-extrabold">✓</span> Ground reaction force risk models
                  </li>
                </ul>
              </div>

              {/* Focus Area 2 */}
              <div className="reveal-focus-card opacity-0 bg-white border border-[#E2E8F0] rounded-[2.25rem] p-8 text-left space-y-4 hover:border-[#B2E0DA] hover:shadow-xl hover:shadow-[#004B57]/5 transition-all duration-300">
                <div className="w-12 h-12 bg-[#FFF8F0] text-[#FF8C00] rounded-2xl flex items-center justify-center shadow-inner">
                  <Smartphone size={22} />
                </div>
                <h3 className="text-xl font-display font-bold uppercase text-[#004B57] tracking-tight">
                  Wearable Tech Integration
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Harnessing IoT sensor pipelines, muscle telemetry bands, and gait-analysis force sensors to streamline recovery benchmarks for elite competitive athletes.
                </p>
                <ul className="space-y-2 text-[11px] text-[#004B57] font-bold">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF8C00] font-extrabold">✓</span> Real-time EMG muscle monitors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF8C00] font-extrabold">✓</span> Bluetooth telemetry gait sensors
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ─── KEY TOPICS SECTION ─── */}
        <section id="topics" className="py-24 bg-white relative z-10">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 text-center">
            
            <div className="mb-16 space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8F0] text-[#FF8C00] text-[10px] font-bold uppercase tracking-wider">
                <Info size={12} /> Agenda Index
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#004B57] uppercase">
                KEY SYMPOSIUM TOPICS
              </h2>
              <p className="text-slate-500 font-semibold text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Exploring the cutting edge of AI models and diagnostic systems in orthopaedics and biomechanics.
              </p>
            </div>

            {/* Topics 8 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOPICS.map((topic, i) => (
                <div
                  key={topic.id}
                  className="reveal-topic-card opacity-0 bg-[#FCFDFD] border border-[#E2E8F0] hover:border-[#B2E0DA] hover:shadow-xl hover:shadow-[#00A896]/5 hover:-translate-y-1.5 transition-all duration-300 rounded-[2rem] p-6 text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] flex items-center justify-center shadow-inner">
                        {topic.icon}
                      </div>
                      <span className="font-display font-black text-2xl text-slate-200 select-none">{topic.id}</span>
                    </div>

                    <h4 className="text-sm font-display font-bold uppercase text-[#004B57] tracking-tight leading-snug">
                      {topic.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── PARTNERSHIP COLLABORATION SECTION ─── */}
        <section className="py-24 bg-[#FCFDFD] relative z-10 border-t border-slate-200">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 text-center">
            
            <div className="mb-14 space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2F1] text-[#004B57] text-[10px] font-bold uppercase tracking-wider">
                <Users size={12} /> Cooperative Network
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#004B57] uppercase">
                JOIN US AS A COLLABORATIVE PARTNER
              </h2>
              <div className="w-12 h-1 bg-[#00A896] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Card 1 */}
              <div className="reveal-partner-card opacity-0 bg-white border border-[#E2E8F0] rounded-[2rem] p-8 text-left space-y-4 shadow-sm hover:border-[#B2E0DA] transition-all duration-300">
                <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-[#FFF8F0] text-[#FF8C00] tracking-wider">Sponsorship &amp; Innovation</span>
                <h3 className="text-xl font-display font-bold uppercase text-[#004B57] tracking-tight">
                  For Tech and AI Companies
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Partner to showcase products, demonstrate hardware wearables, BLE sensor models, or sponsor development labs for next-gen physical rehabilitation systems.
                </p>
                <div className="pt-2">
                  <a href="#inquire" className="text-[#00A896] font-bold text-xs uppercase tracking-wider hover:text-[#004B57] flex items-center gap-1.5 transition-colors">
                    Become Tech Partner <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="reveal-partner-card opacity-0 bg-white border border-[#E2E8F0] rounded-[2rem] p-8 text-left space-y-4 shadow-sm hover:border-[#B2E0DA] transition-all duration-300">
                <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-[#E0F2F1] text-[#004B57] tracking-wider">Academic &amp; Research</span>
                <h3 className="text-xl font-display font-bold uppercase text-[#004B57] tracking-tight">
                  For Colleges &amp; Universities
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Establish collaborative pipelines linking academic computer science labs with our active orthopaedic clinical wards to test, deploy, and refine biomechanical research models.
                </p>
                <div className="pt-2">
                  <a href="#inquire" className="text-[#00A896] font-bold text-xs uppercase tracking-wider hover:text-[#004B57] flex items-center gap-1.5 transition-colors">
                    Register Academic Partnership <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── CONTACT & INQUIRY FORM SECTION ─── */}
        <section id="inquire" className="py-24 bg-white border-t border-slate-200 relative z-10 reveal-inquiry-section opacity-0">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5 space-y-8 text-left">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8F0] text-[#FF8C00] text-[10px] font-bold uppercase tracking-wider">
                    <Mail size={12} /> Contact Gateway
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#004B57] uppercase leading-none">
                    COLLABORATION GATEWAY
                  </h2>
                  <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed max-w-sm">
                    Connect directly with the Iyakkam organizing committee to secure summit details, partnership slots, or speak at the panel.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="bg-[#FCFDFD] border border-[#E2E8F0] p-4 rounded-2xl flex items-center gap-4 shadow-sm max-w-sm">
                    <div className="w-10 h-10 bg-[#E0F2F1] text-[#00A896] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">CALL COORDINATORS</span>
                      <a href="tel:+917092777764" className="text-xs font-bold text-slate-800 hover:text-[#00A896] block">7092777764</a>
                      <a href="tel:+916382941172" className="text-xs font-bold text-slate-800 hover:text-[#00A896] block mt-0.5">6382941172</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-[#FCFDFD] border border-[#E2E8F0] p-4 rounded-2xl flex items-center gap-4 shadow-sm max-w-sm">
                    <div className="w-10 h-10 bg-[#FFF8F0] text-[#FF8C00] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">EMAIL INQUIRIES</span>
                      <a href="mailto:info@vallihospital.in" className="text-xs font-bold text-slate-800 hover:text-[#FF8C00] block mt-0.5">
                        info@vallihospital.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Form */}
              <div className="lg:col-span-7 bg-[#FCFDFD] border border-[#E2E8F0] rounded-[2.5rem] p-6 sm:p-8 shadow-md relative" ref={confettiContainerRef}>
                
                {formSubmitted ? (
                  <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 space-y-4 relative z-10">
                    <div className="w-16 h-16 bg-[#E0F2F1] text-[#00A896] rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle size={32} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display text-xl font-extrabold uppercase text-[#004B57]">Inquiry Logged Successfully!</h4>
                      <p className="text-xs text-slate-500 font-semibold max-w-sm leading-relaxed mx-auto">
                        Thank you for registering your interest. Our symposium coordinators will review your details and connect with you at <span className="font-bold text-slate-800">{email}</span> within 24 hours.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <FileText size={16} className="text-[#00A896]" />
                      <h3 className="text-xs font-display font-bold uppercase text-[#004B57] tracking-wider">
                        Quick Collaboration Form
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Ramesh Kumar"
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/10"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@university.edu"
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/10"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Partnership Category</label>
                        <div className="relative">
                          <select
                            value={partnerType}
                            onChange={(e) => setPartnerType(e.target.value)}
                            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23004B57%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                          >
                            <option value="Academic">Academic &amp; Research Partnership</option>
                            <option value="Sponsor">Sponsorship &amp; Tech Innovation</option>
                            <option value="General">General Inquiry</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Inquiry Message</label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please detail your partnership interest or questions..."
                        className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/10 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#00A896] hover:bg-[#008B7A] text-white w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                      Send Inquiry <Send size={13} />
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </SmoothScroll>
  );
}
