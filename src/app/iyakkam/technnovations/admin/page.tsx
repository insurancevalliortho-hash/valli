"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  LogOut,
  Search,
  Download,
  Trash2,
  Users,
  Activity,
  IndianRupee,
  ClipboardList,
  Building,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  MapPin,
  User,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import SmoothScroll from "../../../../components/SmoothScroll";

interface Registration {
  id: number;
  registration_code: string;
  team_name: string;
  team_size: number;
  team_lead: string;
  lead_phone: string;
  co_members: any;
  email_id: string;
  college_name: string;
  college_location: string;
  department: string;
  year_of_study: string;
  source: string;
  transaction_id: string;
  created_at: string;
  payment_screenshot?: string;
  is_verified: boolean;
  ppt_filename?: string | null;
  ppt_file?: string | null;
  ppt_uploaded_at?: string | null;
}

// ─── CHART 1: REGISTRATION TREND (SLEEK AREA CHART) ──────────────────────────
const AreaChart = ({ data }: { data: { date: string; count: number }[] }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 500;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxCount = Math.max(...data.map((d) => d.count), 5);

  const points = data.map((d, i) => {
    const x = paddingLeft + i * (chartWidth / (data.length - 1 || 1));
    const y = height - paddingBottom - (d.count / maxCount) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`
      : "";

  return (
    <div className="relative bg-white border border-[#E2E8F0] p-8 rounded-[2.25rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[340px]">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Registration Trend</h3>
        <p className="text-base font-bold text-slate-700 mt-0.5">Daily Registration Volume</p>
      </div>

      <div className="relative flex-1 mt-6">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
            No registrations to chart.
          </div>
        ) : (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#004B57" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#004B57" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Y Axis Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingTop + ratio * chartHeight;
              const val = Math.round((1 - ratio) * maxCount);
              return (
                <g key={i} className="opacity-40">
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingLeft - 10}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[9px] fill-slate-400 font-bold font-mono"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Area Path */}
            {areaPath && (
              <motion.path
                d={areaPath}
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            )}

            {/* Line Path */}
            {linePath && (
              <motion.path
                d={linePath}
                fill="none"
                stroke="#004B57"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            )}

            {/* Interactive Dots */}
            {points.map((p, i) => (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIdx === i ? 5 : 3}
                  className="fill-white stroke-[#004B57] stroke-2 transition-all duration-150"
                />
                <circle cx={p.x} cy={p.y} r={12} className="fill-transparent" />
              </g>
            ))}

            {/* X Axis Labels */}
            {points.map((p, i) => (
              <text
                key={i}
                x={p.x}
                y={height - 6}
                textAnchor="middle"
                className="text-[9px] fill-slate-400 font-bold uppercase tracking-wider"
              >
                {p.date}
              </text>
            ))}
          </svg>
        )}

        {/* Tooltip Overlay */}
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              className="absolute bg-slate-900 text-white text-[10px] px-3 py-2 rounded-2xl shadow-lg border border-slate-800 pointer-events-none font-bold"
              style={{
                left: `${(points[hoveredIdx].x / width) * 100}%`,
                top: `${(points[hoveredIdx].y / height) * 100 - 15}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="text-teal-400 font-mono text-[8px] uppercase tracking-widest">
                {points[hoveredIdx].date}
              </div>
              <div className="text-xs font-black mt-0.5">{points[hoveredIdx].count} Teams</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── CHART 2: DEPARTMENT DISTRIBUTION (SPACIOUS BAR CHART) ───────────────────
const DeptBarChart = ({ data }: { data: { name: string; count: number }[] }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white border border-[#E2E8F0] p-8 rounded-[2.25rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[340px]">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Department Split</h3>
        <p className="text-base font-bold text-slate-700 mt-0.5">Top Registration Fields</p>
      </div>

      <div className="flex-1 mt-6 flex flex-col justify-center gap-4">
        {data.length === 0 ? (
          <div className="text-center text-slate-400 text-xs py-10 font-semibold">
            No department data available.
          </div>
        ) : (
          data.map((d, i) => {
            const pct = (d.count / maxCount) * 100;
            return (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-slate-550">
                  <span className="truncate max-w-[200px] uppercase tracking-wider">{d.name}</span>
                  <span className="font-mono text-teal">{d.count} Teams</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-teal to-[#004B57] rounded-full"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ─── CHART 3: YEAR OF STUDY DISTRIBUTION (SLEEK DONUT CHART) ─────────────────
const YearDonutChart = ({ data }: { data: { name: string; count: number }[] }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const radius = 38;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;

  const colors = ["#004B57", "#00A896", "#FF8C00", "#FFA53D", "#94A3B8"];

  let accumulatedPercent = 0;

  const segments = data
    .map((d, i) => {
      const percent = total > 0 ? d.count / total : 0;
      const strokeDashoffset = circumference - percent * circumference;
      const rotation = accumulatedPercent * 360;
      accumulatedPercent += percent;
      return {
        ...d,
        percent,
        strokeDashoffset,
        rotation,
        color: colors[i % colors.length]
      };
    })
    .filter((s) => s.count > 0);

  return (
    <div className="bg-white border border-[#E2E8F0] p-8 rounded-[2.25rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[340px]">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Year Representation</h3>
        <p className="text-base font-bold text-slate-700 mt-0.5">Registrations by Class Year</p>
      </div>

      <div className="flex-1 mt-6 flex items-center justify-between gap-6">
        {total === 0 ? (
          <div className="text-center text-slate-400 text-xs py-10 font-semibold w-full">
            No year details recorded.
          </div>
        ) : (
          <>
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 overflow-visible">
                {segments.map((seg, i) => (
                  <motion.circle
                    key={i}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: seg.strokeDashoffset }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.1 }}
                    style={{
                      transformOrigin: "center",
                      transform: `rotate(${seg.rotation}deg)`
                    }}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total</span>
                <span className="text-xl font-display font-black text-[#004B57] leading-none mt-1">{total}</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
              {segments.map((seg, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-550 uppercase tracking-wider"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="truncate flex-1">{seg.name} Year</span>
                  <span className="font-mono text-slate-700">{seg.count}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── SPACIOUS DYNAMIC CARD ROW ───────────────────────────────────────────────
const RegistrationRow = ({
  r,
  isExpanded,
  onToggle,
  onDelete,
  onVerify,
  deleteConfirmId,
  setDeleteConfirmId,
  onPreviewImage
}: {
  r: Registration;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: number) => void;
  onVerify: (id: number, isVerified: boolean) => void;
  deleteConfirmId: number | null;
  setDeleteConfirmId: (id: number | null) => void;
  onPreviewImage: (url: string) => void;
}) => {
  const [copiedTxId, setCopiedTxId] = useState<string | null>(null);

  const copyToClipboard = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedTxId(txt);
    setTimeout(() => setCopiedTxId(null), 2000);
  };

  const coMembers: Array<{ name: string; phone: string }> = useMemo(() => {
    try {
      const parsed = typeof r.co_members === "string" ? JSON.parse(r.co_members) : r.co_members;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [r.co_members]);

  return (
    <div
      className={`bg-white border transition-all duration-300 rounded-[2.25rem] overflow-hidden shadow-sm hover:shadow-md ${
        isExpanded ? "border-teal ring-8 ring-teal/5" : "border-slate-200/60"
      }`}
    >
      {/* Spacious Card Header */}
      <div
        onClick={onToggle}
        className="p-7 px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer select-none"
      >
        {/* Column 1: Team Info */}
        <div className="flex items-center gap-4 min-w-[280px]">
          <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-tr from-teal to-[#00A896] text-white flex items-center justify-center font-display font-black text-xl shadow-md border border-teal/10 flex-shrink-0">
            {r.team_lead.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-base truncate leading-tight">{r.team_name}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200/60 uppercase flex-shrink-0">
                {r.team_size} Members
              </span>
            </div>
            <span className="font-mono text-[9px] text-teal font-bold tracking-wider uppercase block">
              {r.registration_code}
            </span>
          </div>
        </div>

        {/* Column 2: Lead Name */}
        <div className="flex flex-col gap-0.5 text-sm text-slate-500 min-w-[180px]">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Team Leader</span>
          <span className="font-bold text-slate-700 flex items-center gap-1.5">{r.team_lead}</span>
          <span className="text-[10px] flex items-center gap-1 font-semibold text-slate-400">{r.lead_phone}</span>
        </div>

        {/* Column 3: College */}
        <div className="flex flex-col gap-0.5 text-sm text-slate-500 min-w-[240px] max-w-[300px] truncate">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Institution</span>
          <span className="font-bold text-slate-700 block truncate leading-tight">{r.college_name}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
            {r.year_of_study} Year
          </span>
        </div>

        {/* Column 4: UPI ID & Verification Badge */}
        <div className="flex items-center gap-3.5 min-w-[200px]">
          <div className="flex flex-col gap-1.5">
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1 flex items-center gap-1.5 shadow-inner-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${r.is_verified ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
              <span className="font-mono font-bold text-[9px] text-slate-650 truncate max-w-[100px]">
                {r.transaction_id}
              </span>
            </div>
            
            <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-center border ${
              r.is_verified 
                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                : "bg-amber-50 text-amber-600 border-amber-100"
            }`}>
              {r.is_verified ? "Verified" : "Pending"}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(r.transaction_id);
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-650 transition-colors self-start mt-0.5"
            title="Copy Transaction ID"
          >
            {copiedTxId === r.transaction_id ? (
              <Check size={13} className="text-green-500" />
            ) : (
              <Copy size={13} />
            )}
          </button>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="btn-primary btn-outline-navy flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-xs"
            style={{ padding: "8px 16px", borderRadius: 12 }}
          >
            {isExpanded ? "Hide Details" : "View Details"}
            {isExpanded ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
          </button>
        </div>
      </div>

      {/* Spacious Collapsible slide down details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-slate-100 bg-slate-50/40"
          >
            <div className="p-8 sm:p-10 space-y-8">
              {/* Detailed Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Box */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
                  <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                    Leader Profile
                  </h4>
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <span className="block text-[8px] font-bold text-slate-450 uppercase">Full Name</span>
                      <span className="font-bold text-slate-700 text-sm">{r.team_lead}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-455 uppercase">Contact details</span>
                      <a href={`tel:${r.lead_phone}`} className="block font-bold text-teal hover:underline mt-0.5">
                        {r.lead_phone}
                      </a>
                      <a href={`mailto:${r.email_id}`} className="block font-bold text-teal hover:underline mt-0.5">
                        {r.email_id}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Institution & Registration Details */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
                  <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                    Academic details
                  </h4>
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <span className="block text-[8px] font-bold text-slate-450 uppercase">College / University</span>
                      <span className="font-bold text-slate-700 text-sm block leading-snug">{r.college_name}</span>
                      <span className="text-[10px] text-slate-450 font-bold block mt-0.5">
                        {r.college_location}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-450 uppercase">Department / Year</span>
                      <span className="font-bold text-slate-700 block">
                        {r.department} Department ({r.year_of_study} Year)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification & Screenshot Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
                  <h4 className="text-[9px] font-bold text-[#004B57] uppercase tracking-widest border-b border-slate-100 pb-2">
                    Payment Verification
                  </h4>
                  <div className="space-y-3">
                    {r.is_verified ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onVerify(r.id, false);
                        }}
                        className="w-full py-2 px-4 bg-emerald-50 hover:bg-red-50 border border-emerald-200 hover:border-red-200 text-emerald-700 hover:text-red-750 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 group"
                      >
                        <CheckCircle2 size={13} className="group-hover:hidden" />
                        <span className="group-hover:hidden">Verified</span>
                        <span className="hidden group-hover:inline">Revoke Verification</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onVerify(r.id, true);
                        }}
                        className="w-full py-2 px-4 bg-amber-50 hover:bg-emerald-55 border border-amber-250 hover:border-emerald-300 text-amber-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 animate-pulse hover:animate-none"
                      >
                        <AlertTriangle size={13} /> Verify Payment
                      </button>
                    )}

                    {r.payment_screenshot ? (
                      <div className="space-y-1.5 pt-1.5">
                        <span className="block text-[8px] font-bold text-slate-400 uppercase">Screenshot Uploaded</span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (r.payment_screenshot) onPreviewImage(r.payment_screenshot);
                          }}
                          className="relative w-full h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in group shadow-inner-sm"
                        >
                          <img
                            src={r.payment_screenshot}
                            alt="Payment Receipt"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                            View Receipt
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 text-center text-slate-400 text-[10px] font-semibold italic">
                        No receipt image uploaded.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Co-Members list panel */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Co-Members details
                </h4>
                {coMembers.length === 0 ? (
                  <div className="text-slate-450 text-xs font-semibold italic p-4">
                    No co-members registered for this team.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {coMembers.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200/40 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <span className="block font-bold text-slate-700 text-xs">
                            {m.name || "N/A"}
                          </span>
                          <span className="block font-mono text-[10px] text-slate-450 mt-0.5">
                            {m.phone || "No contact"}
                          </span>
                        </div>
                        {m.phone && (
                          <a
                            href={`tel:${m.phone}`}
                            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-650 transition-colors"
                            title="Call member"
                          >
                            <Phone size={11} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Spacious Metadata & Actions banner */}
              <div className="bg-white p-6 px-8 rounded-[2rem] border border-slate-200/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs">
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase">
                      UPI Reference ID
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono font-bold text-slate-700">{r.transaction_id}</span>
                      <button
                        onClick={() => copyToClipboard(r.transaction_id)}
                        className="text-slate-400 hover:text-slate-650 transition-colors"
                        title="Copy Transaction ID"
                      >
                        {copiedTxId === r.transaction_id ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase">
                      Referral Source
                    </span>
                    <span className="font-bold text-slate-700 block mt-0.5 uppercase">{r.source}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase">
                      Date Registered
                    </span>
                    <span className="font-semibold text-slate-700 block mt-0.5">
                      {new Date(r.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400 uppercase">
                      Project Presentation
                    </span>
                    {r.ppt_filename && r.ppt_file ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const link = document.createElement("a");
                          link.href = r.ppt_file || "";
                          link.download = r.ppt_filename || "presentation.pptx";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="inline-flex items-center gap-1 font-bold text-teal hover:underline mt-0.5 text-xs leading-none animate-fadeIn"
                      >
                        <Download size={11} /> Download PPT
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold italic block mt-0.5">
                        Not uploaded yet
                      </span>
                    )}
                  </div>
                </div>

                {/* Record deletion control (fixed hover and color classes) */}
                <div>
                  {deleteConfirmId === r.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-red-650 flex items-center gap-1 uppercase tracking-wider animate-pulse">
                        <AlertTriangle size={11} /> Confirm Delete?
                      </span>
                      <button
                        onClick={() => onDelete(r.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-bold hover:bg-red-700 transition-colors shadow-sm"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-4 py-2 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-[10px] font-bold hover:bg-slate-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmId(r.id);
                      }}
                      className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-red-200/25"
                      title="Remove record"
                    >
                      <Trash2 size={13} /> Delete Registration
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN ADMIN PAGE COMPONENT ──────────────────────────────────────────────
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Check session storage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("tech_admin_pw");
    if (savedPassword) {
      verifyAndFetch(savedPassword);
    }
  }, []);

  const verifyAndFetch = async (pw: string) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/technnovations/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });

      const result = await response.json();

      if (response.ok) {
        setRegistrations(result.data || []);
        setIsAuthenticated(true);
        sessionStorage.setItem("tech_admin_pw", pw);
        setPassword(pw);
      } else {
        setLoginError(result.error || "Authentication failed.");
        sessionStorage.removeItem("tech_admin_pw");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    verifyAndFetch(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tech_admin_pw");
    setIsAuthenticated(false);
    setPassword("");
    setRegistrations([]);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/technnovations/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id }),
      });

      if (response.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
        setDeleteConfirmId(null);
        if (expandedId === id) setExpandedId(null);
      } else {
        const result = await response.json();
        alert(result.error || "Failed to delete registration.");
      }
    } catch (err) {
      console.error(err);
      alert("A network error occurred.");
    }
  };

  const handleVerify = async (id: number, isVerified: boolean) => {
    try {
      const response = await fetch("/api/technnovations/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id, isVerified }),
      });

      if (response.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, is_verified: isVerified } : r))
        );
      } else {
        const result = await response.json();
        alert(result.error || "Failed to update verification status.");
      }
    } catch (err) {
      console.error(err);
      alert("A network error occurred.");
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "Registration Code",
      "Team Name",
      "Team Size",
      "Team Lead",
      "Lead Phone",
      "Email ID",
      "College Name",
      "College Location",
      "Department",
      "Year of Study",
      "UPI Transaction ID",
      "Source",
      "Verification Status",
      "Created At",
      "Co-Members"
    ];

    const rows = registrations.map((r) => {
      let coMembersStr = "";
      try {
        const parsed = typeof r.co_members === "string" ? JSON.parse(r.co_members) : r.co_members;
        if (Array.isArray(parsed)) {
          coMembersStr = parsed.map((m: any) => `${m.name || ""} (${m.phone || ""})`).join("; ");
        } else {
          coMembersStr = String(r.co_members || "");
        }
      } catch (e) {
        coMembersStr = String(r.co_members || "");
      }

      return [
        r.registration_code,
        r.team_name,
        r.team_size,
        r.team_lead,
        r.lead_phone,
        r.email_id,
        r.college_name,
        r.college_location,
        r.department,
        r.year_of_study,
        r.transaction_id,
        r.source,
        r.is_verified ? "Verified" : "Pending",
        new Date(r.created_at).toLocaleString(),
        coMembersStr
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `technovations_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const query = searchQuery.toLowerCase();
    return (
      r.team_name.toLowerCase().includes(query) ||
      r.team_lead.toLowerCase().includes(query) ||
      r.college_name.toLowerCase().includes(query) ||
      r.registration_code.toLowerCase().includes(query) ||
      r.transaction_id.toLowerCase().includes(query)
    );
  });

  const totalTeams = registrations.length;
  const totalVerifiedTeams = registrations.filter((r) => r.is_verified).length;
  const totalParticipants = registrations.reduce((acc, curr) => acc + curr.team_size, 0);
  const totalRevenue = totalVerifiedTeams * 3000;

  const trendData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    const counts: Record<string, number> = {};
    last7Days.forEach((day) => {
      counts[day] = 0;
    });

    registrations.forEach((r) => {
      const dateStr = new Date(r.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
      if (dateStr in counts) {
        counts[dateStr] += 1;
      }
    });

    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [registrations]);

  const deptData = useMemo(() => {
    const counts: Record<string, number> = {};
    registrations.forEach((r) => {
      const dept = r.department.trim() || "Other";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [registrations]);

  const yearData = useMemo(() => {
    const counts: Record<string, number> = {
      "1st": 0,
      "2nd": 0,
      "3rd": 0,
      "4th": 0,
      "PG": 0
    };
    registrations.forEach((r) => {
      const yr = r.year_of_study || "1st";
      if (yr in counts) {
        counts[yr] += 1;
      } else {
        counts[yr] = (counts[yr] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [registrations]);

  return (
    <SmoothScroll>
      <Navbar />

      <div className="min-h-screen bg-slate-50/50 text-[#1A1A2E] font-body selection:bg-orange selection:text-white pt-32 pb-28 px-4 sm:px-6 md:px-8 relative overflow-hidden grid-bg-dots">
        {/* Glowing gradient backdrops */}
        <div className="absolute top-[-5%] left-[10%] w-[450px] h-[450px] bg-teal/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[550px] h-[550px] bg-orange/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-[40%] right-[15%] w-[350px] h-[350px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
          {/* Header Navigation */}
          <div className="flex justify-between items-center">
            <Link
              href="/iyakkam/technnovations"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal font-semibold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to challenge details
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="btn-primary btn-outline-navy flex items-center gap-1.5 bg-white hover:bg-slate-55 border border-slate-200 shadow-sm text-xs"
                style={{ padding: "8px 16px", borderRadius: 12 }}
              >
                <LogOut size={13} /> Log Out
              </button>
            )}
          </div>

          {/* Secure login gate */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-2xl p-8 space-y-6 mt-12">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-teal-mist text-teal rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-teal/10">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="font-display text-2xl font-black uppercase text-[#004B57] tracking-tight">
                  Admin authentication
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Secure Console Entry
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Security password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10"
                  />
                  {loginError && <p className="text-[10px] text-red-500 font-bold">{loginError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary btn-teal w-full justify-center"
                  style={{ padding: "12px 24px", fontSize: 13, borderRadius: 12 }}
                >
                  {isLoading ? "Authenticating..." : "Unlock Portal"}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-12 animate-fadeIn">
              {/* Header Title Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                <div className="space-y-1.5 text-left">
                  <span className="eyebrow tracking-[0.25em] text-[10px]">Management console</span>
                  <h1 className="font-display text-4xl sm:text-5xl font-black text-[#004B57] uppercase tracking-tight leading-none">
                    ADMIN DASHBOARD
                  </h1>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    Technovations 2026 Live Registrations Manager
                  </p>
                </div>
              </div>

              {/* Statistics Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Registered Teams",
                    value: `${totalTeams} total`,
                    icon: <ClipboardList size={22} />,
                    color: "text-[#004B57]",
                    bg: "bg-teal-mist/30 border-teal/10 hover:border-teal/30"
                  },
                  {
                    title: "Total Participants",
                    value: totalParticipants,
                    icon: <Users size={22} />,
                    color: "text-orange",
                    bg: "bg-orange-tint/40 border-orange/10 hover:border-orange/30"
                  },
                  {
                    title: "Revenue Collections (Verified)",
                    value: `₹${totalRevenue.toLocaleString("en-IN")}`,
                    icon: <IndianRupee size={22} />,
                    color: "text-slate-800",
                    bg: "bg-white border-slate-200/80 hover:border-slate-300"
                  }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`p-8 border rounded-[2.25rem] flex items-center justify-between shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${stat.bg}`}
                  >
                    <div className="space-y-1">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {stat.title}
                      </span>
                      <span className={`text-3xl font-display font-black tracking-tight ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                    <div className="w-14 h-14 bg-white/95 border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-slate-400">
                      {stat.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Animated Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AreaChart data={trendData} />
                <DeptBarChart data={deptData} />
                <YearDonutChart data={yearData} />
              </div>

              {/* Data Table Panel */}
              <div className="space-y-6">
                {/* Search and export controls */}
                <div className="bg-white border border-slate-200/80 rounded-[2.25rem] p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by team, lead, college, code..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-xs font-semibold focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/5"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="btn-primary btn-outline-navy flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm border border-slate-200 w-full sm:w-auto justify-center"
                    style={{ padding: "12px 24px", fontSize: 12, borderRadius: 16 }}
                  >
                    <Download size={14} /> Export Registrations (CSV)
                  </button>
                </div>

                {/* Grid Deck list of rows */}
                <div className="space-y-4">
                  {filteredRegistrations.length === 0 ? (
                    <div className="bg-white border border-slate-200/80 rounded-[2.25rem] p-16 text-center text-slate-400 shadow-sm space-y-2">
                      <Activity size={32} className="mx-auto text-slate-300 animate-pulse" />
                      <p className="text-xs font-bold uppercase tracking-wider mt-2">
                        No registrations match your search filters.
                      </p>
                    </div>
                  ) : (
                    filteredRegistrations.map((r) => (
                      <RegistrationRow
                        key={r.id}
                        r={r}
                        isExpanded={expandedId === r.id}
                        onToggle={() => setExpandedId(expandedId === r.id ? null : r.id)}
                        onDelete={handleDelete}
                        onVerify={handleVerify}
                        deleteConfirmId={deleteConfirmId}
                        setDeleteConfirmId={setDeleteConfirmId}
                        onPreviewImage={setPreviewImage}
                      />
                    ))
                  )}
                </div>

                {/* Record counter */}
                <div className="text-right text-[9px] font-bold text-slate-400 uppercase tracking-widest pr-4">
                  Showing {filteredRegistrations.length} of {registrations.length} registrations
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Screenshot Modal Preview Overlay */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2 border border-slate-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewImage}
                alt="Payment Screenshot Zoom"
                className="max-w-full max-h-[75vh] object-contain rounded-2xl bg-slate-50"
              />
              <div className="p-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">
                  Payment Verification Receipt Zoom
                </span>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </SmoothScroll>
  );
}
