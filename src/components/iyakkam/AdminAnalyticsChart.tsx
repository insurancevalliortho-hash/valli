"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  IndianRupee,
  Users,
  CheckCircle2,
  Filter,
  X,
  Layers,
  ChevronRight
} from "lucide-react";

export interface ChartDataPoint {
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Sep 20"
  dayName: string; // e.g. "Sun"
  count: number; // total registrations
  verifiedCount: number; // verified / paid count
  revenue: number; // ₹ revenue
}

interface AdminAnalyticsChartProps {
  title: string;
  subtitle: string;
  accentColor: string; // e.g. "#F26522" for Active Salem, "#00A896" for ARISE
  accentGradientId: string;
  dataPoints: ChartDataPoint[];
  range: "7d" | "14d" | "30d" | "all";
  onRangeChange: (range: "7d" | "14d" | "30d" | "all") => void;
  selectedDate?: string | null;
  onSelectDate?: (date: string | null) => void;
  entityName?: string; // "Runners" | "Delegates"
}

// Smooth Catmull-Rom to Cubic Bezier curve algorithm
function getSmoothCurvePath(points: { x: number; y: number }[], isArea: boolean, baselineY: number): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Control points with tension 0.25
    const cp1x = p1.x + (p2.x - p0.x) * 0.2;
    const cp1y = p1.y + (p2.y - p0.y) * 0.2;
    const cp2x = p2.x - (p3.x - p1.x) * 0.2;
    const cp2y = p2.y - (p3.y - p1.y) * 0.2;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  if (isArea) {
    const last = points[points.length - 1];
    const first = points[0];
    d += ` L ${last.x.toFixed(1)} ${baselineY.toFixed(1)} L ${first.x.toFixed(1)} ${baselineY.toFixed(1)} Z`;
  }

  return d;
}

export default function AdminAnalyticsChart({
  title,
  subtitle,
  accentColor,
  accentGradientId,
  dataPoints,
  range,
  onRangeChange,
  selectedDate,
  onSelectDate,
  entityName = "Registrations",
}: AdminAnalyticsChartProps) {
  // Chart Display Mode: "area" (smooth spline) vs "bars" (modern stacked pills)
  const [chartMode, setChartMode] = useState<"area" | "bars">("area");
  // Metric Mode: "count" (registrations) vs "revenue" (Rupees)
  const [metricMode, setMetricMode] = useState<"count" | "revenue">("count");
  // Hovered data point index for tooltip scrubber
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Summary Metrics for the current range
  const summary = useMemo(() => {
    const totalCount = dataPoints.reduce((sum, d) => sum + d.count, 0);
    const totalPaid = dataPoints.reduce((sum, d) => sum + d.verifiedCount, 0);
    const totalRevenue = dataPoints.reduce((sum, d) => sum + d.revenue, 0);
    const daysCount = Math.max(dataPoints.length, 1);
    const avgDaily = (totalCount / daysCount).toFixed(1);

    // Peak day
    let peakDay = dataPoints[0] || { date: "-", count: 0, revenue: 0, displayDate: "-" };
    dataPoints.forEach((d) => {
      if (metricMode === "count" ? d.count > peakDay.count : d.revenue > peakDay.revenue) {
        peakDay = d;
      }
    });

    const paidRate = totalCount > 0 ? Math.round((totalPaid / totalCount) * 100) : 0;

    return {
      totalCount,
      totalPaid,
      totalRevenue,
      avgDaily,
      peakDay,
      paidRate,
    };
  }, [dataPoints, metricMode]);

  // SVG Dimension Constants
  const svgWidth = 840;
  const svgHeight = 240;
  const padLeft = 45;
  const padRight = 25;
  const padTop = 25;
  const padBottom = 35;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;
  const baselineY = padTop + plotHeight;

  // Max value calculation for Y axis scale
  const yMax = useMemo(() => {
    if (metricMode === "count") {
      const rawMax = Math.max(...dataPoints.map((d) => d.count), 0);
      if (rawMax <= 4) return 4;
      if (rawMax <= 10) return 10;
      if (rawMax <= 20) return 20;
      return Math.ceil(rawMax / 5) * 5;
    } else {
      const rawMax = Math.max(...dataPoints.map((d) => d.revenue), 0);
      if (rawMax <= 1000) return 1000;
      if (rawMax <= 5000) return 5000;
      return Math.ceil(rawMax / 2000) * 2000;
    }
  }, [dataPoints, metricMode]);

  // Y-axis grid levels (4 equal intervals)
  const gridLevels = useMemo(() => {
    return [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
      const val = Math.round(yMax * ratio);
      const y = baselineY - plotHeight * ratio;
      return { val, y };
    });
  }, [yMax, baselineY, plotHeight]);

  // Compute (x, y) coordinates for data points
  const points = useMemo(() => {
    const len = dataPoints.length;
    if (len === 0) return [];

    return dataPoints.map((d, i) => {
      const x = len === 1 ? padLeft + plotWidth / 2 : padLeft + (i / (len - 1)) * plotWidth;
      const val = metricMode === "count" ? d.count : d.revenue;
      const verifiedVal = metricMode === "count" ? d.verifiedCount : Math.round(d.revenue * 0.9);
      const y = baselineY - (val / yMax) * plotHeight;
      const yVerified = baselineY - (verifiedVal / yMax) * plotHeight;

      return {
        x,
        y: isNaN(y) ? baselineY : y,
        yVerified: isNaN(yVerified) ? baselineY : yVerified,
        data: d,
        index: i,
      };
    });
  }, [dataPoints, metricMode, yMax, padLeft, plotWidth, baselineY, plotHeight]);

  // Generate SVG paths
  const areaPath = useMemo(() => {
    return getSmoothCurvePath(
      points.map((p) => ({ x: p.x, y: p.y })),
      true,
      baselineY
    );
  }, [points, baselineY]);

  const linePath = useMemo(() => {
    return getSmoothCurvePath(
      points.map((p) => ({ x: p.x, y: p.y })),
      false,
      baselineY
    );
  }, [points, baselineY]);

  const verifiedLinePath = useMemo(() => {
    if (metricMode !== "count") return "";
    return getSmoothCurvePath(
      points.map((p) => ({ x: p.x, y: p.yVerified })),
      false,
      baselineY
    );
  }, [points, metricMode, baselineY]);

  // Mouse handler for hover scrubber
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current || points.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * svgWidth;

    // Find nearest point
    let closestIndex = 0;
    let minDiff = Infinity;
    points.forEach((p, idx) => {
      const diff = Math.abs(p.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setHoveredIndex(closestIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  // Format currency
  const formatYValue = (val: number) => {
    if (metricMode === "revenue") {
      if (val >= 1000) return `₹${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k`;
      return `₹${val}`;
    }
    return `${val}`;
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-[2rem] p-5 sm:p-6 shadow-sm space-y-5 transition-all">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner"
            style={{
              backgroundColor: `${accentColor}12`,
              borderColor: `${accentColor}30`,
              color: accentColor,
            }}
          >
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                {title}
              </h3>
              {selectedDate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-700 animate-pulse">
                  Filtered: {selectedDate}
                  {onSelectDate && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDate(null);
                      }}
                      className="hover:text-amber-900 ml-0.5 cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  )}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* Controls: Chart Mode, Metric Toggle, Range Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric mode toggle (Signups vs Revenue) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setMetricMode("count")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metricMode === "count"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Signups
            </button>
            <button
              type="button"
              onClick={() => setMetricMode("revenue")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metricMode === "revenue"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Revenue (₹)
            </button>
          </div>

          {/* Chart Type (Area vs Bars) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setChartMode("area")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                chartMode === "area"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Smooth Area Curve View"
            >
              <TrendingUp size={13} />
              <span className="hidden sm:inline">Curve</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode("bars")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                chartMode === "bars"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Modern Bar View"
            >
              <BarChart3 size={13} />
              <span className="hidden sm:inline">Bars</span>
            </button>
          </div>

          {/* Time Range */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
            {(["7d", "14d", "30d", "all"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onRangeChange(r)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  range === r
                    ? "bg-white shadow-sm font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                style={{ color: range === r ? accentColor : undefined }}
              >
                {r === "7d" ? "7D" : r === "14d" ? "14D" : r === "30d" ? "30D" : "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Period Total
          </span>
          <span className="text-xl font-black font-display text-slate-800 block mt-0.5">
            {summary.totalCount}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            {entityName} registered
          </span>
        </div>

        <div className="bg-emerald-50/40 border border-emerald-200/60 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
            Verified Paid
          </span>
          <span className="text-xl font-black font-display text-emerald-700 block mt-0.5">
            {summary.totalPaid}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold">
            {summary.paidRate}% paid rate
          </span>
        </div>

        <div className="bg-orange-50/40 border border-orange-200/60 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-wider block">
            Period Revenue
          </span>
          <span className="text-xl font-black font-display text-[#ea580c] block mt-0.5">
            ₹{summary.totalRevenue.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-orange-600/80 font-medium">
            Gateway confirmed
          </span>
        </div>

        <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Daily Average
          </span>
          <span className="text-xl font-black font-display text-slate-800 block mt-0.5">
            {summary.avgDaily}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Entries / day
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Peak Velocity
          </span>
          <span className="text-xl font-black font-display text-slate-800 block mt-0.5">
            {metricMode === "count" ? summary.peakDay.count : `₹${summary.peakDay.revenue}`}
          </span>
          <span className="text-[10px] text-slate-500 font-medium truncate block">
            on {summary.peakDay.displayDate || "-"}
          </span>
        </div>
      </div>

      {/* Main SVG Chart Container */}
      <div
        ref={containerRef}
        className="relative w-full bg-slate-50/40 border border-slate-200/80 rounded-2xl p-2 sm:p-4 overflow-hidden select-none"
      >
        {dataPoints.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Calendar className="w-8 h-8 opacity-40" />
            <p className="text-xs font-semibold">No registration timeline events found in this window.</p>
          </div>
        ) : (
          <div className="relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-48 sm:h-56 overflow-visible cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                if (activePoint && onSelectDate) {
                  onSelectDate(selectedDate === activePoint.data.date ? null : activePoint.data.date);
                }
              }}
            >
              <defs>
                {/* Area Gradient */}
                <linearGradient id={accentGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentColor} stopOpacity="0.32" />
                  <stop offset="70%" stopColor={accentColor} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
                </linearGradient>

                {/* Verified Line Gradient */}
                <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={accentColor} floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Horizontal Gridlines & Y-Axis Labels */}
              {gridLevels.map((lvl, idx) => (
                <g key={idx}>
                  <line
                    x1={padLeft}
                    y1={lvl.y}
                    x2={svgWidth - padRight}
                    y2={lvl.y}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={padLeft - 10}
                    y={lvl.y + 3.5}
                    textAnchor="end"
                    className="text-[9px] font-mono font-semibold fill-slate-400"
                  >
                    {formatYValue(lvl.val)}
                  </text>
                </g>
              ))}

              {/* AREA CURVE MODE */}
              {chartMode === "area" && (
                <>
                  {/* Area Fill */}
                  <path d={areaPath} fill={`url(#${accentGradientId})`} />

                  {/* Stroke Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />

                  {/* Verified Line (if in count mode) */}
                  {metricMode === "count" && verifiedLinePath && (
                    <path
                      d={verifiedLinePath}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      strokeOpacity="0.8"
                    />
                  )}

                  {/* Data Points */}
                  {points.map((p, idx) => {
                    const isSelected = selectedDate === p.data.date;
                    const isHovered = hoveredIndex === idx;
                    const hasData = (metricMode === "count" ? p.data.count : p.data.revenue) > 0;

                    return (
                      <g key={idx} className="transition-transform duration-200">
                        {/* Outer Glow Ring when Selected or Hovered */}
                        {(isHovered || isSelected) && (
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isSelected ? 9 : 8}
                            fill="none"
                            stroke={isSelected ? "#F59E0B" : accentColor}
                            strokeWidth="2.5"
                            className="animate-pulse"
                            opacity="0.9"
                          />
                        )}

                        {/* Core Point Dot */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered || isSelected ? 5.5 : hasData ? 3.5 : 2}
                          fill={isSelected ? "#F59E0B" : hasData ? "#FFFFFF" : "#CBD5E1"}
                          stroke={isSelected ? "#D97706" : hasData ? accentColor : "#94A3B8"}
                          strokeWidth={isHovered || isSelected ? 2.5 : 2}
                        />
                      </g>
                    );
                  })}
                </>
              )}

              {/* MODERN BAR MODE */}
              {chartMode === "bars" && (
                <g>
                  {points.map((p, idx) => {
                    const isSelected = selectedDate === p.data.date;
                    const isHovered = hoveredIndex === idx;
                    const totalVal = metricMode === "count" ? p.data.count : p.data.revenue;
                    const paidVal = metricMode === "count" ? p.data.verifiedCount : Math.round(p.data.revenue * 0.9);

                    const barW = Math.max(Math.min(plotWidth / points.length - 6, 36), 8);
                    const barX = p.x - barW / 2;

                    const barH = totalVal > 0 ? (totalVal / yMax) * plotHeight : 4;
                    const barY = baselineY - barH;

                    const paidH = paidVal > 0 ? (paidVal / yMax) * plotHeight : 0;
                    const paidY = baselineY - paidH;

                    return (
                      <g key={idx} className="cursor-pointer">
                        {/* Background track */}
                        <rect
                          x={barX}
                          y={padTop}
                          width={barW}
                          height={plotHeight}
                          rx={barW > 14 ? 6 : 3}
                          fill="#F1F5F9"
                          opacity="0.6"
                        />

                        {/* Total Bar */}
                        <rect
                          x={barX}
                          y={barY}
                          width={barW}
                          height={barH}
                          rx={barW > 14 ? 6 : 3}
                          fill={isSelected ? "#F59E0B" : accentColor}
                          opacity={isHovered ? 1 : 0.85}
                          className="transition-all duration-200"
                        />

                        {/* Paid Sub-Bar (if count mode) */}
                        {metricMode === "count" && paidH > 0 && (
                          <rect
                            x={barX}
                            y={paidY}
                            width={barW}
                            height={paidH}
                            rx={barW > 14 ? 6 : 3}
                            fill="#10B981"
                            opacity={isHovered ? 1 : 0.9}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Vertical Scrubber Line on Hover */}
              {activePoint && (
                <g>
                  <line
                    x1={activePoint.x}
                    y1={padTop}
                    x2={activePoint.x}
                    y2={baselineY}
                    stroke={selectedDate === activePoint.data.date ? "#F59E0B" : accentColor}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.85"
                  />
                </g>
              )}

              {/* X-Axis Date Labels */}
              {points.map((p, idx) => {
                // Determine label density
                const skipInterval = points.length > 20 ? 4 : points.length > 10 ? 2 : 1;
                const showLabel = idx % skipInterval === 0 || idx === points.length - 1;

                if (!showLabel) return null;

                const isSelected = selectedDate === p.data.date;
                const isHovered = hoveredIndex === idx;

                return (
                  <text
                    key={idx}
                    x={p.x}
                    y={baselineY + 18}
                    textAnchor="middle"
                    className={`text-[10px] font-mono transition-colors ${
                      isSelected
                        ? "font-black fill-amber-700"
                        : isHovered
                        ? "font-bold fill-slate-900"
                        : "fill-slate-400 font-medium"
                    }`}
                  >
                    {p.data.displayDate}
                  </text>
                );
              })}
            </svg>

            {/* Floating Glassmorphic Tooltip Card */}
            {activePoint && (
              <div
                className="absolute pointer-events-none z-30 transition-all duration-150 ease-out"
                style={{
                  left: `${(activePoint.x / svgWidth) * 100}%`,
                  top: "12px",
                  transform:
                    activePoint.x > svgWidth * 0.7
                      ? "translateX(-100%)"
                      : activePoint.x < svgWidth * 0.3
                      ? "translateX(0%)"
                      : "translateX(-50%)",
                }}
              >
                <div className="bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-2xl shadow-2xl border border-slate-700/60 min-w-[190px] space-y-1.5 text-left">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
                    <span className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                      <Calendar size={12} className="text-amber-400" />
                      {activePoint.data.displayDate} ({activePoint.data.dayName})
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-medium">
                      {activePoint.data.date}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs font-semibold">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        Total {entityName}:
                      </span>
                      <span className="font-mono font-black text-white">
                        {activePoint.data.count}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Verified Paid:
                      </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {activePoint.data.verifiedCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-1">
                      <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                        <IndianRupee size={11} className="text-orange-400" />
                        Day Revenue:
                      </span>
                      <span className="font-mono font-bold text-orange-300">
                        ₹{activePoint.data.revenue.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {onSelectDate && (
                    <div className="pt-1 border-t border-slate-800/80 text-[9px] text-amber-300 font-bold flex items-center gap-1">
                      <span>Click to filter table to this day</span>
                      <ChevronRight size={10} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend & Quick Tips Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-semibold px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-slate-700">Total Signups</span>
          </div>
          {metricMode === "count" && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              <span className="text-slate-700">Paid / Verified</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-slate-500">Interactive: Click any point to filter table</span>
          </div>
        </div>

        {selectedDate && (
          <button
            type="button"
            onClick={() => onSelectDate && onSelectDate(null)}
            className="text-amber-700 hover:text-amber-900 font-bold text-[10px] uppercase flex items-center gap-1 hover:underline cursor-pointer"
          >
            Clear Date Filter ({selectedDate})
          </button>
        )}
      </div>
    </div>
  );
}
