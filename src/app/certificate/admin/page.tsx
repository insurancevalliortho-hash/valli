"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Users, CheckCircle2, Clock, Star, Download, Search, RefreshCw, Eye, X, ShieldCheck, BarChart3, MessageSquare } from "lucide-react";

interface DelegateRecord {
  delegate_id: number;
  name: string;
  email: string;
  phone: string;
  reg_no: string;
  feedback_id: number | null;
  q1_event_quality: number | null;
  q2_session_relevance: number | null;
  q3_speaker_effectiveness: number | null;
  q4_organization_venue: number | null;
  comments: string | null;
  submitted_at: string | null;
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [delegates, setDelegates] = useState<DelegateRecord[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "submitted" | "pending">("all");
  const [selectedDelegate, setSelectedDelegate] = useState<DelegateRecord | null>(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/certificate/admin");
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setDelegates(data.delegates);
      }
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const filteredDelegates = delegates.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      (d.phone && d.phone.includes(search)) ||
      (d.reg_no && d.reg_no.toLowerCase().includes(search.toLowerCase()));

    if (filter === "submitted") return matchesSearch && d.feedback_id !== null;
    if (filter === "pending") return matchesSearch && d.feedback_id === null;
    return matchesSearch;
  });

  const handleExportCSV = () => {
    if (delegates.length === 0) return;

    const headers = ["ID", "Name", "Email", "Phone", "Reg/MMC No", "Feedback Status", "Q1: Overall Quality", "Q2: Session Relevance", "Q3: Speaker Effectiveness", "Q4: Venue & Org", "Comments", "Submitted At"];
    const rows = delegates.map((d) => [
      d.delegate_id,
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.email.replace(/"/g, '""')}"`,
      `"${d.phone || ""}"`,
      `"${d.reg_no || ""}"`,
      d.feedback_id ? "Submitted" : "Pending",
      d.q1_event_quality || "",
      d.q2_session_relevance || "",
      d.q3_speaker_effectiveness || "",
      d.q4_organization_venue || "",
      `"${(d.comments || "").replace(/"/g, '""')}"`,
      d.submitted_at ? new Date(d.submitted_at).toLocaleString() : ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Summit_Delegates_Feedback_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-44">
              <Image src="/logo.png" alt="Valli Hospital" fill className="object-contain object-left" priority />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <h1 className="font-bold text-slate-800 text-sm sm:text-base">Summit Admin Verification Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="p-2 text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 rounded-xl transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-teal-600" : ""}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export CSV Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Registered</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stats.totalDelegates}</h3>
                <p className="text-xs text-slate-400 mt-1">Delegates on record</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Feedback Submitted</p>
                <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.submittedCount}</h3>
                <p className="text-xs text-emerald-700 font-medium mt-1">{stats.submissionRate}% Completion Rate</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Responses</p>
                <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pendingCount}</h3>
                <p className="text-xs text-slate-400 mt-1">Awaiting verification</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Event Rating</p>
                <h3 className="text-3xl font-extrabold text-teal-700 mt-1">{stats.avgQ1} <span className="text-sm font-semibold text-slate-400">/ 5</span></h3>
                <p className="text-xs text-slate-400 mt-1">Overall Satisfaction</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                <Star className="w-6 h-6 fill-teal-500 text-teal-500" />
              </div>
            </div>
          </div>
        )}

        {/* Question Ratings Analytics Breakdown */}
        {stats && stats.submittedCount > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-700" /> Average Question Scores (Submitted Feedbacks)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-600 font-semibold mb-1">Q1: Overall Quality</p>
                <div className="text-2xl font-black text-teal-800">{stats.avgQ1} ⭐</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-600 font-semibold mb-1">Q2: Scientific Relevance</p>
                <div className="text-2xl font-black text-teal-800">{stats.avgQ2} ⭐</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-600 font-semibold mb-1">Q3: Speaker Effectiveness</p>
                <div className="text-2xl font-black text-teal-800">{stats.avgQ3} ⭐</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-600 font-semibold mb-1">Q4: Venue & Organization</p>
                <div className="text-2xl font-black text-teal-800">{stats.avgQ4} ⭐</div>
              </div>
            </div>
          </div>
        )}

        {/* Delegate Records Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Delegates ({delegates.length})
              </button>
              <button
                onClick={() => setFilter("submitted")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === "submitted" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Submitted ({delegates.filter(d => d.feedback_id !== null).length})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === "pending" ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Pending ({delegates.filter(d => d.feedback_id === null).length})
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 outline-none focus:border-teal-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">ID</th>
                  <th className="py-3.5 px-4">Delegate Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Reg / MMC No</th>
                  <th className="py-3.5 px-4">Feedback Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDelegates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                      No delegates found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDelegates.map((d) => (
                    <tr key={d.delegate_id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-400">#{d.delegate_id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{d.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{d.email}</td>
                      <td className="py-3.5 px-4 text-slate-600">{d.phone || "—"}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">{d.reg_no || "—"}</td>
                      <td className="py-3.5 px-4">
                        {d.feedback_id ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                            <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {d.feedback_id ? (
                          <button
                            onClick={() => setSelectedDelegate(d)}
                            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-teal-50 text-teal-800 font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-teal-200 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal-600" /> View Answers
                          </button>
                        ) : (
                          <span className="text-slate-400 italic">No submission</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detailed Feedback Modal */}
      {selectedDelegate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden animate-in fade-in zoom-in-95">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-600" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Detailed Feedback</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedDelegate.name}</h3>
                <p className="text-xs text-slate-500">{selectedDelegate.email}</p>
              </div>
              <button
                onClick={() => setSelectedDelegate(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700 mb-1">1. How would you rate the overall quality of the event?</p>
                <p className="text-sm font-black text-amber-500">{selectedDelegate.q1_event_quality || 5} / 5 Stars ⭐</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700 mb-1">2. Were the scientific sessions relevant to your clinical practice?</p>
                <p className="text-sm font-black text-amber-500">{selectedDelegate.q2_session_relevance || 5} / 5 Stars ⭐</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700 mb-1">3. How effective were the speakers in explaining the topics clearly?</p>
                <p className="text-sm font-black text-amber-500">{selectedDelegate.q3_speaker_effectiveness || 5} / 5 Stars ⭐</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700 mb-1">4. Was the event schedule, venue, and overall organization satisfactory?</p>
                <p className="text-sm font-black text-amber-500">{selectedDelegate.q4_organization_venue || 5} / 5 Stars ⭐</p>
              </div>

              {selectedDelegate.comments && (
                <div className="bg-teal-50/50 p-3.5 rounded-xl border border-teal-100">
                  <p className="font-bold text-teal-800 mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600" /> Additional Comments:
                  </p>
                  <p className="text-slate-700 italic">{selectedDelegate.comments}</p>
                </div>
              )}

              {selectedDelegate.submitted_at && (
                <p className="text-[11px] text-slate-400 text-right pt-2">
                  Submitted on: {new Date(selectedDelegate.submitted_at).toLocaleString()}
                </p>
              )}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedDelegate(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
