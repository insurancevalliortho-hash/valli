"use client";

import React, { useState } from "react";
import {
  Share2,
  QrCode,
  Globe,
  MessageSquare,
  Tag,
  Copy,
  Check,
  ExternalLink,
  Compass,
  TrendingUp,
  X,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import { normalizeSource, getSourceBadgeStyle } from "../../lib/attribution";

export interface SourceStat {
  source: string;
  total: number;
  verified: number;
  revenue: number;
  pct: number;
  paidRate: number;
}

interface SourceAttributionWidgetProps {
  sources: SourceStat[];
  totalRegistrations: number;
  activeSourceFilter: string;
  onSelectSource: (source: string) => void;
  eventName: string;
  landingPath: string;
  registerPath: string;
  brandColor?: string;
}

export default function SourceAttributionWidget({
  sources,
  totalRegistrations,
  activeSourceFilter,
  onSelectSource,
  eventName,
  landingPath,
  registerPath,
  brandColor = "#F26522",
}: SourceAttributionWidgetProps) {
  const [campaignTag, setCampaignTag] = useState("qr");
  const [copiedLink, setCopiedLink] = useState<"landing" | "register" | null>(null);

  // Quick preset suggestions
  const presets = [
    { label: "QR Code", tag: "qr" },
    { label: "Meta Ads", tag: "meta" },
    { label: "Instagram", tag: "instagram" },
    { label: "WhatsApp", tag: "whatsapp" },
    { label: "College Poster", tag: "poster" },
    { label: "Brochure", tag: "brochure" },
  ];

  // Base origin
  const origin = typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "https://vallicountry.com";

  const cleanTag = campaignTag.trim().toLowerCase().replace(/\s+/g, "_");
  const landingUrl = `${origin}${landingPath}${cleanTag ? `?source=${cleanTag}` : ""}`;
  const registerUrl = `${origin}${registerPath}${cleanTag ? `?source=${cleanTag}` : ""}`;

  const copyToClipboard = async (text: string, type: "landing" | "register") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(null), 2500);
    } catch (_) {
      // Fallback
      prompt("Copy trackable link:", text);
    }
  };

  const getSourceIcon = (srcName: string) => {
    const s = srcName.toLowerCase();
    if (s.includes("qr")) return <QrCode size={16} className="text-purple-600" />;
    if (s.includes("meta") || s.includes("face") || s.includes("insta")) return <Share2 size={16} className="text-blue-600" />;
    if (s.includes("whats")) return <MessageSquare size={16} className="text-emerald-600" />;
    if (s.includes("direct")) return <Globe size={16} className="text-slate-500" />;
    return <Tag size={16} className="text-amber-600" />;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[1.75rem] p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner shrink-0"
            style={{
              backgroundColor: `${brandColor}12`,
              color: brandColor,
              borderColor: `${brandColor}30`,
            }}
          >
            <Compass size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Registration Source Attribution & Traffic Analytics
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Live Channels
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Breakdown of how runners/delegates discovered registration (QR Posters, Meta Ads, WhatsApp, or Direct).
            </p>
          </div>
        </div>

        {activeSourceFilter !== "all" && (
          <button
            type="button"
            onClick={() => onSelectSource("all")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <X size={13} />
            <span>Reset Source Filter ({activeSourceFilter})</span>
          </button>
        )}
      </div>

      {/* Source Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sources.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-400 text-xs">
            No registrations available yet to calculate source distribution.
          </div>
        ) : (
          sources.map((s) => {
            const badge = getSourceBadgeStyle(s.source);
            const isSelected = activeSourceFilter.toLowerCase() === s.source.toLowerCase();

            return (
              <button
                key={s.source}
                type="button"
                onClick={() => onSelectSource(isSelected ? "all" : s.source)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]"
                    : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-800 hover:shadow-sm"
                }`}
              >
                {/* Top Row: Icon + Source Name + % */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${isSelected ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
                      {getSourceIcon(s.source)}
                    </div>
                    <span className="font-display font-bold text-xs truncate">
                      {s.source}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? "bg-slate-800 text-slate-200 border border-slate-700"
                        : `${badge.bg} ${badge.text} border ${badge.border}`
                    }`}
                  >
                    {s.pct}% share
                  </span>
                </div>

                {/* Big Number: Total Count */}
                <div className="flex items-baseline justify-between mt-1">
                  <div>
                    <span className="font-display text-2xl font-black block leading-none">
                      {s.total}
                    </span>
                    <span className={`text-[10px] font-semibold mt-1 block ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {s.verified} Paid • {s.paidRate}% conv.
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-mono uppercase font-bold block ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
                      Revenue
                    </span>
                    <span className={`font-mono text-xs font-bold ${isSelected ? "text-emerald-300" : "text-emerald-600"}`}>
                      ₹{s.revenue.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="w-full h-1.5 bg-slate-200/80 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(s.pct, 4)}%`,
                      backgroundColor: isSelected ? "#10B981" : brandColor,
                    }}
                  />
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Proportional Stacked Traffic Distribution Bar */}
      {sources.length > 0 && totalRegistrations > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
            <span>Channel Proportions</span>
            <span>{totalRegistrations} total signups</span>
          </div>
          <div className="h-3 w-full rounded-xl overflow-hidden flex gap-0.5 bg-slate-100 p-0.5 border border-slate-200">
            {sources.map((s, idx) => {
              const colors = ["#F26522", "#00A896", "#8B5CF6", "#3B82F6", "#EC4899", "#10B981", "#64748B"];
              const color = colors[idx % colors.length];
              return (
                <div
                  key={s.source}
                  style={{ width: `${s.pct}%`, backgroundColor: color }}
                  className="h-full rounded-sm first:rounded-l-lg last:rounded-r-lg transition-all"
                  title={`${s.source}: ${s.total} (${s.pct}%)`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Campaign Link Generator Section */}
      <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-orange-100 text-[#F26522] flex items-center justify-center font-bold">
              <LinkIcon size={14} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Generate Trackable Campaign Links
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                Create links with custom tags for posters, QR standees, Meta ads, and WhatsApp broadcasts.
              </p>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Presets:
            </span>
            {presets.map((p) => (
              <button
                key={p.tag}
                type="button"
                onClick={() => setCampaignTag(p.tag)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                  cleanTag === p.tag
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Tag Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">
              ?source=
            </span>
            <input
              type="text"
              value={campaignTag}
              onChange={(e) => setCampaignTag(e.target.value)}
              placeholder="e.g. qr, meta, kiot_fest"
              className="w-full bg-white border border-slate-200 hover:border-slate-350 rounded-xl pl-20 pr-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-slate-800"
            />
          </div>
          <span className="text-[11px] text-slate-500 italic hidden sm:inline">
            Tag preview: <strong>{cleanTag || "direct"}</strong>
          </span>
        </div>

        {/* Copyable URLs Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
          {/* Landing Page Link */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                1. Event Landing Page
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(landingUrl, "landing")}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                  copiedLink === "landing"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {copiedLink === "landing" ? (
                  <>
                    <Check size={12} className="text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy Link
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-700 truncate bg-slate-50 px-2 py-1 rounded border border-slate-100 select-all">
              {landingUrl}
            </p>
          </div>

          {/* Direct Registration Form Link */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                2. Direct Registration Form
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(registerUrl, "register")}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                  copiedLink === "register"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {copiedLink === "register" ? (
                  <>
                    <Check size={12} className="text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy Link
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-700 truncate bg-slate-50 px-2 py-1 rounded border border-slate-100 select-all">
              {registerUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
