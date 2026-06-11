"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  Award,
  Flame,
  Users,
  Calendar,
  Sparkles,
  Info,
  Sliders,
  CheckCircle,
  Eye
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";

const SERVICES = [
  {
    icon: <Activity className="w-6 h-6 text-[#00A896]" />,
    title: "Biomechanical Gait Analysis",
    description: "Using high-speed motion capture and pressure-plate force sensors, we dissect your movement mechanics. We identify load distribution anomalies, joint angle imbalances, and energy leaks to optimize running economy and resolve persistent pain."
  },
  {
    icon: <Shield className="w-6 h-6 text-[#00A896]" />,
    title: "Sports Injury Prevention",
    description: "Musculoskeletal screenings, customized stability drills, and movement mapping designed to discover vulnerabilities before they become injuries. Protect your season with targeted reinforcement."
  },
  {
    icon: <Zap className="w-6 h-6 text-[#00A896]" />,
    title: "Return to Play Assessments",
    description: "State-of-the-art functional threshold testing, limb symmetry evaluation, and sports-specific loading metrics. We take the guesswork out of recovery, ensuring you return to peak competition safely."
  },
  {
    icon: <Heart className="w-6 h-6 text-[#00A896]" />,
    title: "Advanced Physiotherapy",
    description: "Combining manual therapy, dry needling, and target-loaded neuromuscular re-education. Our clinical protocols are designed to rebuild athletic resilience from the ground up."
  }
];

const STATS = [
  { value: "500+", label: "Athletes Restored" },
  { value: "98%", label: "Safe Return Rate" },
  { value: "10+", label: "Sports Partners" },
  { value: "0", label: "Re-injury Recurrence" }
];

const TESTIMONIALS = [
  {
    quote: "Following my ACL reconstruction, the functional testing and biomechanical symmetry checks at Iyakkam gave me the confidence and metrics to step back on the field. Truly a game-changer.",
    author: "Karthik R.",
    role: "State level Sprinter"
  },
  {
    quote: "The running gait analysis here isolated a hip drop I had been compensating for. Correcting it saved my marathon season and helped me set a personal record.",
    author: "Priya M.",
    role: "Marathon Runner"
  }
];

// ─── Interactive Biomechanics Scanner Component ──────────────────────────────
function BiomechanicsScanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive control states
  const [showJoints, setShowJoints] = useState(true);
  const [showForces, setShowForces] = useState(true);
  const [cadence, setCadence] = useState(170); // steps per minute
  
  // HUD state variables
  const [metrics, setMetrics] = useState({ kneeAngle: 120, ankleFlexion: 85, hipExtension: 145 });
  const [logs, setLogs] = useState<string[]>([
    "System initialized",
    "Calibrating force plates...",
    "Scanning joint markers"
  ]);

  // Append logs periodically
  useEffect(() => {
    const messages = [
      "Scan locked on L_KNEE",
      "Stance phase detected",
      "Stride cadence synchronised",
      "Computing load vector symmetry",
      "Center of gravity: 98.4% nominal",
      "ROM bounds confirmed",
      "EMG signals tracking active",
      "Plotting biomechanical curves"
    ];

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
      setLogs((prev) => [`[${timestamp}] ${randomMsg}`, ...prev.slice(0, 4)]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 360;
      canvas.height = canvas.parentElement?.clientHeight || 340;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const scale = Math.min(w, h) / 300;

      // Base coordinates (Hip joint at center)
      const hipX = w / 2;
      const hipY = h / 2 - 10 * scale;

      // Speed factor derived from Cadence (Base cadence 170)
      const speedFactor = cadence / 170;
      time += 0.04 * speedFactor;
      
      const hipOffset = Math.sin(time * 2) * 5 * scale;
      
      // Spine and head
      const shoulderX = hipX - 8 * scale + Math.cos(time * 2) * 2 * scale;
      const shoulderY = hipY - 55 * scale + hipOffset;
      const headX = shoulderX + 4 * scale;
      const headY = shoulderY - 22 * scale;

      // Legs alternate phase
      const rHipY = hipY + hipOffset;
      const lHipY = hipY + hipOffset;

      // Right leg
      const rThighAngle = Math.sin(time) * 0.7 + 0.3;
      const rKneeX = hipX + Math.sin(rThighAngle) * 48 * scale;
      const rKneeY = rHipY + Math.cos(rThighAngle) * 48 * scale;
      const rAnkleAngle = rThighAngle + Math.sin(time + 1.2) * 0.8 + 0.5;
      const rAnkleX = rKneeX + Math.sin(rAnkleAngle) * 42 * scale;
      const rAnkleY = rKneeY + Math.cos(rAnkleAngle) * 42 * scale;
      const rFootX = rAnkleX + 12 * scale;
      const rFootY = rAnkleY + 4 * scale;

      // Left leg (opposite phase)
      const lThighAngle = Math.sin(time + Math.PI) * 0.7 + 0.3;
      const lKneeX = hipX + Math.sin(lThighAngle) * 48 * scale;
      const lKneeY = lHipY + Math.cos(lThighAngle) * 48 * scale;
      const lAnkleAngle = lThighAngle + Math.sin(time + Math.PI + 1.2) * 0.8 + 0.5;
      const lAnkleX = lKneeX + Math.sin(lAnkleAngle) * 42 * scale;
      const lAnkleY = lKneeY + Math.cos(lAnkleAngle) * 42 * scale;
      const lFootX = lAnkleX + 12 * scale;
      const lFootY = lAnkleY + 4 * scale;

      // Right arm
      const rShoulderY = shoulderY;
      const rElbowAngle = Math.sin(time + Math.PI) * 0.8 - 0.2;
      const rElbowX = shoulderX + Math.sin(rElbowAngle) * 32 * scale;
      const rElbowY = rShoulderY + Math.cos(rElbowAngle) * 32 * scale;
      const rHandX = rElbowX + Math.cos(time + Math.PI) * 18 * scale;
      const rHandY = rElbowY + 18 * scale;

      // Left arm
      const lShoulderY = shoulderY;
      const lElbowAngle = Math.sin(time) * 0.8 - 0.2;
      const lElbowX = shoulderX + Math.sin(lElbowAngle) * 32 * scale;
      const lElbowY = lShoulderY + Math.cos(lElbowAngle) * 32 * scale;
      const lHandX = lElbowX + Math.cos(time) * 18 * scale;
      const lHandY = lElbowY + 18 * scale;

      // Draw Grid background
      ctx.strokeStyle = "rgba(0, 168, 150, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw scan sweep bar if active
      if (showForces) {
        const sweepY = (Math.sin(time * 0.4) * 0.5 + 0.5) * h;
        ctx.strokeStyle = "rgba(242, 101, 34, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(10, sweepY);
        ctx.lineTo(w - 10, sweepY);
        ctx.stroke();

        // Center of Gravity load arrow (vector down)
        ctx.strokeStyle = "#F26522";
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(hipX, hipY + hipOffset);
        ctx.lineTo(hipX, hipY + hipOffset + 40 * scale);
        ctx.stroke();
        
        ctx.fillStyle = "#F26522";
        ctx.beginPath();
        ctx.moveTo(hipX - 4 * scale, hipY + hipOffset + 36 * scale);
        ctx.lineTo(hipX, hipY + hipOffset + 42 * scale);
        ctx.lineTo(hipX + 4 * scale, hipY + hipOffset + 36 * scale);
        ctx.fill();
      }

      // Draw Bones
      ctx.lineWidth = 3.5 * scale;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Spine & Head
      ctx.strokeStyle = "#1A1A2E";
      ctx.beginPath();
      ctx.moveTo(hipX, hipY + hipOffset);
      ctx.lineTo(shoulderX, shoulderY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(headX, headY, 11 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#E8F7F5";
      ctx.fill();
      ctx.stroke();

      // Left leg & arm (Background - dim)
      ctx.strokeStyle = "rgba(0, 168, 150, 0.35)";
      ctx.beginPath();
      ctx.moveTo(hipX, hipY + hipOffset);
      ctx.lineTo(lKneeX, lKneeY);
      ctx.lineTo(lAnkleX, lAnkleY);
      ctx.lineTo(lFootX, lFootY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(lElbowX, lElbowY);
      ctx.lineTo(lHandX, lHandY);
      ctx.stroke();

      // Right leg & arm (Foreground - solid)
      ctx.strokeStyle = "#00A896";
      ctx.beginPath();
      ctx.moveTo(hipX, hipY + hipOffset);
      ctx.lineTo(rKneeX, rKneeY);
      ctx.lineTo(rAnkleX, rAnkleY);
      ctx.lineTo(rFootX, rFootY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(rElbowX, rElbowY);
      ctx.lineTo(rHandX, rHandY);
      ctx.stroke();

      // Draw Joint Markers (Pulsing nodes)
      if (showJoints) {
        const joints = [
          { x: hipX, y: hipY + hipOffset, color: "#FF8C00" },
          { x: shoulderX, y: shoulderY, color: "#004B57" },
          { x: rKneeX, y: rKneeY, color: "#004B57" },
          { x: rAnkleX, y: rAnkleY, color: "#004B57" },
          { x: lKneeX, y: lKneeY, color: "rgba(0, 75, 87, 0.7)" },
          { x: lAnkleX, y: lAnkleY, color: "rgba(0, 75, 87, 0.7)" }
        ];

        joints.forEach((j) => {
          ctx.beginPath();
          ctx.arc(j.x, j.y, 5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = j.color;
          ctx.fill();
          ctx.lineWidth = 1.5 * scale;
          ctx.strokeStyle = "#FFFFFF";
          ctx.stroke();

          // Pulse ring
          ctx.beginPath();
          ctx.arc(j.x, j.y, 10 * scale, 0, Math.PI * 2);
          ctx.strokeStyle = j.color === "#FF8C00" ? "rgba(255, 140, 0, 0.2)" : "rgba(0, 75, 87, 0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // Feed angles to metrics
      const kAng = Math.round(105 + Math.sin(time) * 45);
      const aAng = Math.round(80 + Math.cos(time) * 15);
      const hExt = Math.round(130 + Math.sin(time - 1.1) * 25);

      if (Math.random() < 0.12) {
        setMetrics({ kneeAngle: kAng, ankleFlexion: aAng, hipExtension: hExt });
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [showJoints, showForces, cadence]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
      {/* Canvas Scanner block */}
      <div className="md:col-span-8 bg-[#E0F2F1]/10 text-slate-800 border border-slate-200 rounded-[2.5rem] p-6 shadow-xl relative flex flex-col justify-between overflow-hidden min-h-[360px]">
        {/* Absolute indicators */}
        <div className="absolute top-6 left-6 space-y-1.5 pointer-events-none z-10 font-mono">
          <div className="bg-white/90 border border-slate-200 rounded-lg px-2.5 py-1 backdrop-blur-sm shadow-sm">
            <span className="block text-[7px] text-slate-500 uppercase tracking-widest leading-none">KNEE_ANGLE</span>
            <span className="text-xs font-bold text-teal">{metrics.kneeAngle}°</span>
          </div>
          <div className="bg-white/90 border border-slate-200 rounded-lg px-2.5 py-1 backdrop-blur-sm shadow-sm">
            <span className="block text-[7px] text-slate-500 uppercase tracking-widest leading-none">ANKLE_FLEX</span>
            <span className="text-xs font-bold text-slate-700">{metrics.ankleFlexion}°</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 space-y-1.5 pointer-events-none z-10 text-right font-mono">
          <div className="bg-white/90 border border-slate-200 rounded-lg px-2.5 py-1 backdrop-blur-sm shadow-sm">
            <span className="block text-[7px] text-slate-500 uppercase tracking-widest leading-none">HIP_EXTENSION</span>
            <span className="text-xs font-bold text-slate-700">{metrics.hipExtension}°</span>
          </div>
          <div className="bg-white/90 border border-slate-200 rounded-lg px-2.5 py-1 backdrop-blur-sm shadow-sm text-left">
            <span className="block text-[7px] text-orange uppercase tracking-widest leading-none">CADENCE_TARGET</span>
            <span className="text-xs font-bold text-orange">{cadence} spm</span>
          </div>
        </div>

        {/* Canvas element */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* HUD footer */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-slate-200 pt-4 backdrop-blur-sm z-10 font-mono text-[9px] text-[#004B57]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
            <span className="font-bold text-slate-500 tracking-wider">TELEM_ACTIVE</span>
          </div>
          <span className="font-bold text-teal tracking-widest">IYAKKAM BIOMECHANICAL CAPTURE</span>
        </div>
      </div>

      {/* Control desk panel */}
      <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-xl flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="text-teal w-4.5 h-4.5" />
            <span className="font-display text-xs font-extrabold uppercase text-[#1A1A2E] tracking-wider">
              Control Console
            </span>
          </div>

          {/* Toggle 1: Joint Tracking */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Joint Tracking</span>
            <button
              onClick={() => setShowJoints(!showJoints)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${showJoints ? "bg-teal" : "bg-slate-250"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${showJoints ? "left-6" : "left-1"}`} />
            </button>
          </div>

          {/* Toggle 2: Load Forces */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Force Vectors</span>
            <button
              onClick={() => setShowForces(!showForces)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${showForces ? "bg-teal" : "bg-slate-250"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${showForces ? "left-6" : "left-1"}`} />
            </button>
          </div>

          {/* Slider: Cadence Target */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-600 uppercase">
              <span>Runner Cadence</span>
              <span className="text-teal font-mono">{cadence} SPM</span>
            </div>
            <input
              type="range"
              min="140"
              max="200"
              step="5"
              value={cadence}
              onChange={(e) => setCadence(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal border border-slate-200"
            />
          </div>
        </div>

        {/* Live system logs ticker */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-[9px] text-slate-600 space-y-1.5 min-h-[96px] overflow-hidden select-none">
          <div className="text-teal font-bold border-b border-slate-200 pb-1 flex justify-between">
            <span>CONSOLE LOGS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          </div>
          <div className="space-y-1 text-slate-500">
            {logs.map((log, idx) => (
              <div key={idx} className="truncate tracking-wide hover:text-slate-800 transition-colors">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Showcase Gallery (With pulsing hotspots) ───────────────────
function ShowcaseGallery() {
  const [tab, setTab] = useState<"gait" | "rehab">("gait");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = {
    gait: [
      { id: 1, top: "36%", left: "32%", title: "Force Plates Matrix", desc: "4,096 high-sensitivity piezo sensors track stance-phase center of gravity and ground forces." },
      { id: 2, top: "25%", left: "54%", title: "Skeletal Optical Telemetry", desc: "High-speed multi-camera setup calculates dynamic rotation angles for joints." },
      { id: 3, top: "78%", left: "42%", title: "Variable Speed Treadmill", desc: "Instrumented velocity control adjusting up to 22 km/h for sprint metrics." }
    ],
    rehab: [
      { id: 1, top: "54%", left: "45%", title: "Joint ROM Trackers", desc: "Wireless inertial measurement units track precise flexion and extension bounds." },
      { id: 2, top: "28%", left: "62%", title: "Ligament Load Testing", desc: "Targeted resistance loading checks ligament tensile strength during movement." }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Selector tabs */}
      <div className="flex gap-2 justify-center">
        {[
          { id: "gait", label: "Gait Telemetry Lab" },
          { id: "rehab", label: "Joint Rehabilitation Lab" }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id as "gait" | "rehab");
              setActiveHotspot(null);
            }}
            className={`font-display text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-xl border transition-all cursor-pointer ${
              tab === t.id
                ? "bg-[#1A1A2E] text-white border-[#1A1A2E] shadow-lg shadow-slate-900/10"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-350"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Hotspot image block */}
        <div className="lg:col-span-7 relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-video select-none">
          <img
            src={tab === "gait" ? "/assets/iyakkam-gait.png" : "/assets/iyakkam-rehab.png"}
            alt={tab === "gait" ? "Treadmill Gait Analysis Lab" : "Joint Rehab assessment Lab"}
            className="w-full h-full object-cover opacity-95"
          />

          {/* Overlay pulsing hotspot indicators */}
          {hotspots[tab].map((h) => (
            <div
              key={h.id}
              style={{ top: h.top, left: h.left }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setActiveHotspot(h.id)}
            >
              {/* Outer pulsing ring */}
              <div className="w-6 h-6 rounded-full bg-orange/40 absolute -top-1.5 -left-1.5 animate-ping" />
              {/* Solid inner core */}
              <div className={`w-3.5 h-3.5 rounded-full border border-white shadow-md flex items-center justify-center transition-colors ${
                activeHotspot === h.id ? "bg-teal" : "bg-orange hover:bg-teal"
              }`}>
                <span className="block w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Informative text sidebox */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm min-h-[220px] flex flex-col justify-center">
          {activeHotspot !== null ? (
            <div className="space-y-3 animate-pulse-soft">
              <span className="pill pill-orange">LAB HARDWARE LOCK</span>
              <h4 className="font-display text-lg font-extrabold uppercase text-[#1A1A2E]">
                {hotspots[tab].find((x) => x.id === activeHotspot)?.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {hotspots[tab].find((x) => x.id === activeHotspot)?.desc}
              </p>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-[10px] font-bold text-teal uppercase tracking-wider hover:underline block pt-2 cursor-pointer"
              >
                ← View all instruments
              </button>
            </div>
          ) : (
            <div className="text-center space-y-3 py-6">
              <Eye className="mx-auto text-slate-400 w-8 h-8 animate-bounce" />
              <h4 className="font-display text-sm font-bold uppercase text-[#1A1A2E]">Interactive Lab Scanner</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-semibold">
                Click any of the orange pulsing hotspots on the laboratory display to inspect the diagnostic equipment specs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function IyakkamPage() {
  return (
    <SmoothScroll>
      <Navbar />

      <div className="font-body text-[#1A1A2E] bg-white min-h-screen selection:bg-orange selection:text-white">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-white text-navy overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(#00A896 1.5px, transparent 1.5px)",
              backgroundSize: "36px 36px"
            }} />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A896]/5 border border-[#00A896]/10 text-[#00A896] text-xs font-bold tracking-[0.2em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse" />
                  Valli Super Speciality Hospital
                </div>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display tracking-tight leading-none text-[#1A1A2E] uppercase">
                  IYAKKAM<br />
                  <span className="text-[#F26522]">SPORTS REHAB</span>
                </h1>
              
                <p className="text-[#004B57] text-xs font-bold uppercase tracking-[0.25em]">
                  &ldquo;Iyakkam&rdquo; &mdash; Flagship Movement Initiative
                </p>
                
                <p className="text-slate-500 text-sm max-w-xl leading-relaxed font-semibold">
                  As the premier Sports Rehabilitation &amp; Biomechanics center of Valli Hospital, we combine clinical orthopedic expertise with advanced motion-capture telemetry. We restore movement, prevent injury, and elevate athletic performance.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <a 
                    href="#services" 
                    className="bg-[#00A896] hover:bg-[#008B7A] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-[#00A896]/15 hover:-translate-y-0.5"
                  >
                    Our Services
                  </a>
                  <Link 
                    href="/iyakkam/technnovations" 
                    className="bg-[#F26522] hover:bg-[#D44E0E] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-[#F26522]/15 flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    Technovations Challenge
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Graphics (Interactive motion loop scanner!) */}
              <div className="lg:col-span-5 w-full">
                <BiomechanicsScanner />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-white border-y border-slate-200 py-12 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl sm:text-5xl font-display text-[#1A1A2E] mb-1 font-extrabold">{stat.value}</div>
                  <div className="text-xs font-bold text-[#00A896] uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-[#FCFDFD] py-24 relative z-10 border-b border-slate-200">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A896]/5 text-[#00A896] border border-[#00A896]/10 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <Award className="w-4 h-4" /> CLINICAL FOCUS
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-[#1A1A2E] tracking-tight leading-tight uppercase font-extrabold">
                REHABILITATION &amp; MOTION ANALYSIS
              </h2>
              <p className="mt-4 text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed">
                We employ clinical-grade biomechanical assessments and targeted functional therapy to solve orthopaedic challenges at their root.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {SERVICES.map((srv, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-[#E2E8F0] border-t-4 border-t-[#00A896] rounded-3xl p-8 hover:border-[#B2E0DA] hover:shadow-xl hover:shadow-[#00A896]/5 hover:-translate-y-1.5 transition-all duration-300 ease-out"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F0FAF9] border border-[#B2E0DA] flex items-center justify-center mb-6 shadow-inner">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl font-display text-[#1A1A2E] mb-3 uppercase tracking-tight font-bold">
                    {srv.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-xs font-semibold">
                    {srv.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Precision vs Standard Comparison table */}
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-center text-[#1A1A2E] mb-6">
                Precision Rehabilitation Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[#00A896]">
                      <th className="py-3 pr-4 uppercase tracking-wider">Diagnostic Area</th>
                      <th className="py-3 px-4 uppercase tracking-wider">Standard Clinic</th>
                      <th className="py-3 pl-4 uppercase tracking-wider">Iyakkam Precision Lab</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {[
                      { area: "Gait Examination", std: "Visual assessment by physiotherapist", precision: "Capacitive force sensors + high-speed cameras" },
                      { area: "Range of Motion", std: "Manual goniometer measurement", precision: "Active wireless ROM telemetry tracking" },
                      { area: "Recovery declare", std: "Pain index + time-based protocols", precision: "Limb force symmetry threshold testing" },
                      { area: "Prevention screening", std: "Subjective balance test checks", precision: "Skeletal joint load computer vision mapping" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-4 pr-4 text-[#1A1A2E] font-bold">{row.area}</td>
                        <td className="py-4 px-4 text-slate-400">{row.std}</td>
                        <td className="py-4 pl-4 text-teal">{row.precision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Biomechanical Lab Showcase (Showcase Gallery with Hotspots) */}
        <section className="bg-white py-24 relative z-10 border-b border-slate-250">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F26522]/5 text-[#F26522] border border-[#F26522]/10 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <Sparkles className="w-4 h-4 text-[#F26522]" /> PRECISION TELEMETRY
              </span>
              <h2 className="text-4xl font-display text-[#1A1A2E] uppercase tracking-tight font-extrabold">
                CLINICAL ANALYSIS LABS
              </h2>
            </div>

            <ShowcaseGallery />
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-50 text-navy py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "radial-gradient(circle, #00A896 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px"
          }} />
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F26522]/5 text-[#F26522] border border-[#F26522]/10 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  <Users className="w-4 h-4" /> ATHLETE FEEDBACK
                </span>
                <h2 className="text-4xl font-display text-[#1A1A2E] uppercase tracking-tight font-extrabold">
                  TRUSTED BY ELITE ATHLETES
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TESTIMONIALS.map((t, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#E2E8F0] border-l-4 border-l-[#00A896] rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-[#B2E0DA] hover:shadow-xl hover:shadow-[#00A896]/5 hover:-translate-y-1.5 transition-all duration-300 ease-out"
                  >
                    <p className="text-slate-500 italic leading-relaxed text-sm font-semibold mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div>
                      <h4 className="text-[#1A1A2E] font-black text-sm tracking-wide">{t.author}</h4>
                      <span className="text-xs text-[#F26522] font-bold uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technovations CTA Banner */}
        <section className="bg-white py-24 relative z-10 border-t border-slate-200">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <div className="relative bg-slate-50 rounded-[3rem] p-10 md:p-16 text-[#1A1A2E] border border-[#00A896]/20 overflow-hidden shadow-xl shadow-[#004B57]/5 font-body">

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/5 text-[#F26522] border border-[#F26522]/10 text-xs font-bold tracking-[0.15em] uppercase">
                    <Flame className="w-3.5 h-3.5 animate-pulse text-[#F26522]" /> CHALLENGE ACTIVE
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display tracking-tight leading-none uppercase text-[#1A1A2E] font-extrabold">
                    Technovations 2026
                  </h2>
                  <h3 className="text-lg font-bold text-[#00A896] leading-tight uppercase">
                    AI Sports Rehabilitation &amp; Biomechanics Challenge
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl font-semibold">
                    We invite engineering, tech, and medical college students to build innovative AI models, wear-tech applications, and biomechanical analytics systems. Showcase your project and compete for a total prize pool of ₹60,000.
                  </p>
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#00A896]" /> July 15, 2026 Submission</span>
                    <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#F26522]" /> INR 30K Top Prize</span>
                  </div>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link 
                    href="/iyakkam/technnovations" 
                    className="bg-[#F26522] hover:bg-[#D44E0E] text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-xl shadow-[#F26522]/20 hover:scale-105 inline-flex items-center gap-2"
                  >
                    Join the Challenge
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </SmoothScroll>
  );
}
