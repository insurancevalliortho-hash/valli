"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  Phone,
  Mail,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Shirt,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  BarChart3,
  Calendar,
  MessageCircle,
  Send,
  Filter,
  Award,
  Compass,
  X
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AdminAnalyticsChart, { ChartDataPoint } from "../../../../components/iyakkam/AdminAnalyticsChart";
import SourceAttributionWidget from "../../../../components/iyakkam/SourceAttributionWidget";
import { normalizeSource, getSourceBadgeStyle } from "../../../../lib/attribution";

interface ActiveSalemRegistration {
  id: number;
  registration_code: string;
  full_name: string;
  email_id: string;
  mobile_number: string;
  category: string;
  tshirt_size: string;
  gender: string;
  age: number;
  emergency_contact?: string;
  city?: string;
  source?: string;
  transaction_id: string;
  is_verified?: boolean;
  created_at: string;
}

type SortField =
  | "created_at"
  | "full_name"
  | "registration_code"
  | "category"
  | "tshirt_size"
  | "age"
  | "source"
  | "is_verified";

type SortDirection = "asc" | "desc";

const TSHIRT_ORDER: Record<string, number> = {
  S: 1,
  M: 2,
  L: 3,
  XL: 4,
  XXL: 5,
};

export default function ActiveSalemAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [registrations, setRegistrations] = useState<ActiveSalemRegistration[]>([]);
  const [emailSendingId, setEmailSendingId] = useState<number | null>(null);
  const [bulkEmailSending, setBulkEmailSending] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [tshirtFilter, setTshirtFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Sorting
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Date Filtering
  const [dateFilter, setDateFilter] = useState<string>("all"); // "all" | "today" | "yesterday" | "7d" | "30d" | "custom"
  const [customDate, setCustomDate] = useState<string>("");
  const [selectedChartDate, setSelectedChartDate] = useState<string | null>(null);

  // Chart view mode: "7d" | "14d" | "30d" | "all"
  const [chartRange, setChartRange] = useState<"7d" | "14d" | "30d" | "all">("14d");

  // Load password from session storage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("active_salem_admin_pwd");
    if (savedPassword) {
      setPassword(savedPassword);
      handleLogin(savedPassword);
    }
  }, []);

  const handleLogin = async (pwdToTest?: string, isSilentRefresh = false) => {
    const targetPassword = pwdToTest || password;
    if (!targetPassword) return;

    if (isSilentRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setAuthError("");

    try {
      const response = await fetch("/api/active-salem/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: targetPassword }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsAuthenticated(true);
        setRegistrations(result.data || []);
        setLastUpdated(new Date());
        sessionStorage.setItem("active_salem_admin_pwd", targetPassword);
      } else {
        setAuthError(result.error || "Invalid administrator password");
        sessionStorage.removeItem("active_salem_admin_pwd");
      }
    } catch (err) {
      console.error(err);
      setAuthError("Failed to connect to admin server gateway");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setRegistrations([]);
    sessionStorage.removeItem("active_salem_admin_pwd");
  };

  const toggleVerification = async (id: number, currentStatus?: boolean) => {
    const newStatus = !currentStatus;

    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_verified: newStatus } : r))
    );

    try {
      const response = await fetch("/api/active-salem/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("active_salem_admin_pwd") || password,
          id,
          is_verified: newStatus,
        }),
      });

      if (!response.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, is_verified: currentStatus } : r))
        );
        alert("Failed to update verification status on database server");
      }
    } catch (err) {
      console.error(err);
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_verified: currentStatus } : r))
      );
      alert("A network error occurred while updating status");
    }
  };

  const handleDelete = async (id: number, code: string) => {
    if (!window.confirm(`Are you absolutely sure you want to permanently delete registration code ${code}?`)) {
      return;
    }

    try {
      const response = await fetch("/api/active-salem/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("active_salem_admin_pwd") || password,
          id,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert(result.error || "Failed to delete record from database server");
      }
    } catch (err) {
      console.error(err);
      alert("A network error occurred during deletion");
    }
  };

  const handleResendEmail = async (id: number, email: string) => {
    setEmailSendingId(id);
    try {
      const response = await fetch("/api/active-salem/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("active_salem_admin_pwd") || password,
          id,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert(`Confirmation email successfully re-dispatched to ${email}`);
      } else {
        alert(result.error || "Failed to resend confirmation email");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while triggering email dispatch");
    } finally {
      setEmailSendingId(null);
    }
  };

  const handleResendAllEmails = async () => {
    if (!window.confirm("Resend confirmation emails to ALL registered runners? This will queue emails for all entries.")) {
      return;
    }
    setBulkEmailSending(true);
    try {
      const response = await fetch("/api/active-salem/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("active_salem_admin_pwd") || password,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert(`Successfully dispatched confirmation emails to ${result.count || registrations.length} runners!`);
      } else {
        alert(result.error || "Failed to dispatch bulk emails");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during bulk email dispatch");
    } finally {
      setBulkEmailSending(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection(field === "created_at" ? "desc" : "asc");
    }
  };

  // Compute stats metrics
  const stats = useMemo(() => {
    const total = registrations.length;
    const verified = registrations.filter((r) => r.is_verified).length;
    const pending = total - verified;

    const revenue = registrations
      .filter((r) => r.is_verified)
      .reduce((sum, r) => {
        const ticketPrice = r.category?.includes("10KM") ? 299 : 249;
        return sum + ticketPrice;
      }, 0);

    // T-Shirt size breakdown
    const tshirtSizes = ["S", "M", "L", "XL", "XXL"];
    const tshirtCounts: Record<string, { total: number; verified: number }> = {
      S: { total: 0, verified: 0 },
      M: { total: 0, verified: 0 },
      L: { total: 0, verified: 0 },
      XL: { total: 0, verified: 0 },
      XXL: { total: 0, verified: 0 },
    };

    registrations.forEach((r) => {
      const sz = (r.tshirt_size || "").toUpperCase().trim();
      if (tshirtCounts[sz]) {
        tshirtCounts[sz].total += 1;
        if (r.is_verified) {
          tshirtCounts[sz].verified += 1;
        }
      }
    });

    // Gender breakdown
    const maleCount = registrations.filter((r) => (r.gender || "").toLowerCase().startsWith("m")).length;
    const femaleCount = registrations.filter((r) => (r.gender || "").toLowerCase().startsWith("f")).length;
    const otherGenderCount = total - maleCount - femaleCount;

    // Age breakdown
    const under18 = registrations.filter((r) => Number(r.age) < 18).length;
    const age18to35 = registrations.filter((r) => Number(r.age) >= 18 && Number(r.age) <= 35).length;
    const age36to50 = registrations.filter((r) => Number(r.age) >= 36 && Number(r.age) <= 50).length;
    const above50 = registrations.filter((r) => Number(r.age) > 50).length;

    // Category breakdown
    const count5KM = registrations.filter((r) => (r.category || "").includes("5")).length;
    const count10KM = registrations.filter((r) => (r.category || "").includes("10")).length;

    // Source Attribution breakdown
    const sourceMap: Record<string, { total: number; verified: number; revenue: number }> = {};
    registrations.forEach((r) => {
      const src = normalizeSource(r.source);
      if (!sourceMap[src]) {
        sourceMap[src] = { total: 0, verified: 0, revenue: 0 };
      }
      sourceMap[src].total += 1;
      if (r.is_verified) {
        sourceMap[src].verified += 1;
        const ticketPrice = r.category?.includes("10KM") ? 299 : 249;
        sourceMap[src].revenue += ticketPrice;
      }
    });

    const sourceBreakdown = Object.entries(sourceMap)
      .map(([sourceName, data]) => ({
        source: sourceName,
        total: data.total,
        verified: data.verified,
        revenue: data.revenue,
        pct: total > 0 ? Math.round((data.total / total) * 100) : 0,
        paidRate: data.total > 0 ? Math.round((data.verified / data.total) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total);

    return {
      total,
      verified,
      pending,
      revenue,
      tshirtCounts,
      maleCount,
      femaleCount,
      otherGenderCount,
      under18,
      age18to35,
      age36to50,
      above50,
      count5KM,
      count10KM,
      sourceBreakdown,
    };
  }, [registrations]);

  // Continuous Daily Chart Data Points
  const dailyChartPoints = useMemo<ChartDataPoint[]>(() => {
    const now = new Date();
    let numDays = 14;
    if (chartRange === "7d") numDays = 7;
    else if (chartRange === "14d") numDays = 14;
    else if (chartRange === "30d") numDays = 30;
    else if (chartRange === "all") {
      let earliestTime = now.getTime();
      registrations.forEach((r) => {
        const t = new Date(r.created_at).getTime();
        if (!isNaN(t) && t < earliestTime) earliestTime = t;
      });
      const diffDays = Math.ceil((now.getTime() - earliestTime) / (1000 * 60 * 60 * 24));
      numDays = Math.max(diffDays + 1, 14);
    }

    const dateMap: Record<string, { count: number; verifiedCount: number; revenue: number }> = {};
    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;
      dateMap[key] = { count: 0, verifiedCount: 0, revenue: 0 };
    }

    registrations.forEach((r) => {
      const d = new Date(r.created_at);
      if (isNaN(d.getTime())) return;
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;

      if (dateMap[key]) {
        dateMap[key].count += 1;
        if (r.is_verified) {
          dateMap[key].verifiedCount += 1;
          const fee = r.category?.includes("10KM") ? 299 : 249;
          dateMap[key].revenue += fee;
        }
      }
    });

    return Object.keys(dateMap)
      .sort()
      .map((dateStr) => {
        const [y, m, d] = dateStr.split("-").map(Number);
        const dateObj = new Date(y, m - 1, d);
        const displayDate = dateObj.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
        const dayName = dateObj.toLocaleDateString("en-IN", { weekday: "short" });
        return {
          date: dateStr,
          displayDate,
          dayName,
          count: dateMap[dateStr].count,
          verifiedCount: dateMap[dateStr].verifiedCount,
          revenue: dateMap[dateStr].revenue,
        };
      });
  }, [registrations, chartRange]);

  // Filtered & Sorted Registrations
  const filteredRegistrations = useMemo(() => {
    const list = registrations.filter((r) => {
      const searchStr = `${r.full_name} ${r.email_id} ${r.mobile_number} ${r.registration_code} ${r.transaction_id} ${r.city}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());

      let matchesCategory = true;
      if (categoryFilter !== "all") {
        matchesCategory = r.category?.toLowerCase().includes(categoryFilter.toLowerCase());
      }

      let matchesVerification = true;
      if (verificationFilter === "verified") {
        matchesVerification = r.is_verified === true;
      } else if (verificationFilter === "pending") {
        matchesVerification = !r.is_verified;
      }

      let matchesTshirt = true;
      if (tshirtFilter !== "all") {
        matchesTshirt = (r.tshirt_size || "").toUpperCase() === tshirtFilter.toUpperCase();
      }

      let matchesGender = true;
      if (genderFilter === "male") {
        matchesGender = (r.gender || "").toLowerCase().startsWith("m");
      } else if (genderFilter === "female") {
        matchesGender = (r.gender || "").toLowerCase().startsWith("f");
      }

      let matchesAge = true;
      const ageNum = Number(r.age) || 0;
      if (ageFilter === "under18") {
        matchesAge = ageNum < 18;
      } else if (ageFilter === "18-35") {
        matchesAge = ageNum >= 18 && ageNum <= 35;
      } else if (ageFilter === "36-50") {
        matchesAge = ageNum >= 36 && ageNum <= 50;
      } else if (ageFilter === "above50") {
        matchesAge = ageNum > 50;
      }

      // Date Filtering Logic
      let matchesDate = true;
      const regDate = new Date(r.created_at);
      if (!isNaN(regDate.getTime())) {
        const regDateKey = `${regDate.getFullYear()}-${String(regDate.getMonth() + 1).padStart(2, "0")}-${String(regDate.getDate()).padStart(2, "0")}`;
        const now = new Date();
        const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const yday = new Date(now);
        yday.setDate(now.getDate() - 1);
        const yesterdayKey = `${yday.getFullYear()}-${String(yday.getMonth() + 1).padStart(2, "0")}-${String(yday.getDate()).padStart(2, "0")}`;

        if (selectedChartDate) {
          matchesDate = regDateKey === selectedChartDate;
        } else if (dateFilter === "today") {
          matchesDate = regDateKey === todayKey;
        } else if (dateFilter === "yesterday") {
          matchesDate = regDateKey === yesterdayKey;
        } else if (dateFilter === "7d") {
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() - 7);
          matchesDate = regDate.getTime() >= cutoff.getTime();
        } else if (dateFilter === "30d") {
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() - 30);
          matchesDate = regDate.getTime() >= cutoff.getTime();
        } else if (dateFilter === "custom" && customDate) {
          matchesDate = regDateKey === customDate;
        }
      }

      // Source Channel Filtering
      let matchesSource = true;
      if (sourceFilter !== "all") {
        matchesSource = normalizeSource(r.source).toLowerCase() === sourceFilter.toLowerCase();
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVerification &&
        matchesTshirt &&
        matchesGender &&
        matchesAge &&
        matchesDate &&
        matchesSource
      );
    });

    // Multi-column sorting with robust date sorting
    list.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "full_name":
          comparison = (a.full_name || "").localeCompare(b.full_name || "");
          break;
        case "registration_code":
          comparison = (a.registration_code || "").localeCompare(b.registration_code || "");
          break;
        case "category":
          comparison = (a.category || "").localeCompare(b.category || "");
          break;
        case "tshirt_size": {
          const orderA = TSHIRT_ORDER[(a.tshirt_size || "").toUpperCase()] || 99;
          const orderB = TSHIRT_ORDER[(b.tshirt_size || "").toUpperCase()] || 99;
          comparison = orderA - orderB;
          break;
        }
        case "age":
          comparison = (Number(a.age) || 0) - (Number(b.age) || 0);
          break;
        case "source":
          comparison = normalizeSource(a.source).localeCompare(normalizeSource(b.source));
          break;
        case "is_verified":
          comparison = (a.is_verified ? 1 : 0) - (b.is_verified ? 1 : 0);
          break;
        case "created_at":
        default: {
          const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
          if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
            comparison = timeA - timeB;
          } else {
            comparison = (Number(a.id) || 0) - (Number(b.id) || 0);
          }
          break;
        }
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return list;
  }, [
    registrations,
    searchQuery,
    categoryFilter,
    verificationFilter,
    tshirtFilter,
    genderFilter,
    ageFilter,
    dateFilter,
    customDate,
    selectedChartDate,
    sortField,
    sortDirection,
  ]);

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return;

    const headers = [
      "ID",
      "Registration Code",
      "Full Name",
      "Email ID",
      "Mobile Number",
      "Category",
      "T-Shirt Size",
      "Gender",
      "Age",
      "Emergency Contact",
      "City",
      "Source",
      "UPI Reference ID",
      "Verified Status",
      "Created At",
    ];

    const rows = filteredRegistrations.map((r) => [
      r.id,
      r.registration_code,
      `"${(r.full_name || "").replace(/"/g, '""')}"`,
      r.email_id,
      `'${r.mobile_number}`,
      r.category,
      r.tshirt_size,
      r.gender,
      r.age,
      `'${r.emergency_contact || ""}`,
      `"${(r.city || "").replace(/"/g, '""')}"`,
      normalizeSource(r.source),
      `'${r.transaction_id}`,
      r.is_verified ? "Verified" : "Pending",
      new Date(r.created_at).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `active_salem_runners_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-350 ml-1 inline opacity-60 group-hover:opacity-100" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3 h-3 text-[#F26522] ml-1 inline font-bold" />
    ) : (
      <ArrowDown className="w-3 h-3 text-[#F26522] ml-1 inline font-bold" />
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots text-left">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top navigation & session header */}
          <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
            <Link
              href="/ActiveSalem"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F26522] font-semibold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Active Salem Landing
            </Link>

            {isAuthenticated && (
              <div className="flex items-center gap-3">
                {/* Live updates / Refresh button */}
                <button
                  type="button"
                  onClick={() => handleLogin(undefined, true)}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-250 hover:border-slate-400 text-slate-600 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  title="Sync latest registrations from database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#F26522]" : ""}`} />
                  <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
                </button>

                {lastUpdated && (
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                    Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                )}

                {/* Bulk resend button */}
                <button
                  type="button"
                  onClick={handleResendAllEmails}
                  disabled={bulkEmailSending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 text-[#ea580c] hover:bg-orange-100 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  title="Resend email passes to all registered runners"
                >
                  <Send className={`w-3.5 h-3.5 ${bulkEmailSending ? "animate-pulse" : ""}`} />
                  <span>{bulkEmailSending ? "Sending..." : "Resend All Emails"}</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Login view */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-white border border-[#E2E8F0] rounded-[2rem] shadow-2xl p-8 space-y-6 mt-12">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto text-[#F26522] border border-orange-100 shadow-inner">
                  <Lock size={24} />
                </div>
                <h1 className="font-display text-xl font-black text-slate-800 uppercase tracking-tight">
                  Active Salem Admin Portal
                </h1>
                <p className="text-xs text-slate-400 font-semibold">
                  Administrator credentials required to manage runner rosters.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Administrator Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Enter database admin password"
                    className="w-full bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#F26522] focus:ring-4 focus:ring-orange/10"
                  />
                  {authError && (
                    <p className="text-[10px] text-red-500 font-semibold mt-1">
                      {authError}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleLogin()}
                  disabled={isLoading}
                  className="w-full bg-[#F26522] hover:bg-[#d95315] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? "Authenticating..." : "Login Securely"}
                </button>
              </div>
            </div>
          ) : (
            /* Main Dashboard View */
            <div className="space-y-6">
              {/* Primary Stats Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    label: "Total Runners",
                    value: stats.total,
                    sub: `5KM: ${stats.count5KM} • 10KM: ${stats.count10KM}`,
                    icon: <ClipboardList className="w-5 h-5 text-slate-500" />,
                    color: "border-slate-200",
                  },
                  {
                    label: "Verified Paid",
                    value: stats.verified,
                    sub: "Receipt & Gateway verified",
                    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
                    color: "border-emerald-250 bg-emerald-50/10",
                  },
                  {
                    label: "Pending Verification",
                    value: stats.pending,
                    sub: "Awaiting manual / UTR check",
                    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
                    color: "border-amber-250 bg-amber-50/10",
                  },
                  {
                    label: "Verified Revenue",
                    value: `₹${stats.revenue.toLocaleString("en-IN")}`,
                    sub: "5KM ₹249 / 10KM ₹299",
                    icon: <IndianRupee className="w-5 h-5 text-[#F26522]" />,
                    color: "border-orange-200 bg-orange-50/10",
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`bg-white border rounded-[1.75rem] p-5 shadow-sm flex items-start gap-4 justify-between ${s.color}`}
                  >
                    <div className="space-y-1.5">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {s.label}
                      </span>
                      <span className="font-display text-2xl font-black text-slate-800 tracking-tight block">
                        {s.value}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-semibold leading-none">
                        {s.sub}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/50 shadow-inner flex items-center justify-center">
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* ITEM 2 & 3: T-Shirt Inventory Matrix + Age & Gender Podium Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* T-Shirt Size Inventory Matrix (Item 2) */}
                <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 shadow-sm space-y-3 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200">
                        <Shirt size={16} />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                          T-Shirt Sizing & Inventory Matrix
                        </h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Click any size to quickly filter the table below
                        </p>
                      </div>
                    </div>

                    {tshirtFilter !== "all" && (
                      <button
                        type="button"
                        onClick={() => setTshirtFilter("all")}
                        className="text-[10px] font-bold text-[#F26522] hover:underline uppercase"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-3 pt-1">
                    {["S", "M", "L", "XL", "XXL"].map((size) => {
                      const item = stats.tshirtCounts[size] || { total: 0, verified: 0 };
                      const pct = stats.total > 0 ? Math.round((item.total / stats.total) * 100) : 0;
                      const isSelected = tshirtFilter === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setTshirtFilter(isSelected ? "all" : size)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#F26522] text-white border-[#F26522] shadow-md shadow-orange-500/20 scale-[1.02]"
                              : "bg-slate-50 hover:bg-orange-50/50 border-slate-200 hover:border-orange-200 text-slate-800"
                          }`}
                        >
                          <span className={`block text-[11px] font-mono font-black uppercase tracking-wider ${isSelected ? "text-white" : "text-[#F26522]"}`}>
                            SIZE {size}
                          </span>
                          <span className="block font-display text-lg font-black mt-0.5 leading-tight">
                            {item.total}
                          </span>
                          <span className={`block text-[9px] font-semibold mt-1 ${isSelected ? "text-orange-100" : "text-slate-400"}`}>
                            {item.verified} Paid • {pct}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Age & Gender Podium Metrics (Item 3) */}
                <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center border border-emerald-200">
                      <Award size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Podium Roster & Demographics
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Gender & age divisions for race medals
                      </p>
                    </div>
                  </div>

                  {/* Gender pill split */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Male Runners</span>
                      <span className="font-bold text-slate-800 text-sm font-mono">{stats.maleCount}</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200" />
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Female Runners</span>
                      <span className="font-bold text-slate-800 text-sm font-mono">{stats.femaleCount}</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200" />
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Ratio</span>
                      <span className="font-bold text-[#F26522] text-xs font-mono">
                        {stats.total > 0 ? `${Math.round((stats.maleCount / stats.total) * 100)}% M` : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Age bracket distribution */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">&lt; 18</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">{stats.under18}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">18-35</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">{stats.age18to35}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">36-50</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">{stats.age36to50}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">50+</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">{stats.above50}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGH-END INTERACTIVE SVG ANALYTICS CHART */}
              <AdminAnalyticsChart
                title="Daily Registration Trajectory & Velocity"
                subtitle="Volume of marathon registrations and ticket revenue recorded per calendar day"
                accentColor="#F26522"
                accentGradientId="activeSalemChartGradient"
                dataPoints={dailyChartPoints}
                range={chartRange}
                onRangeChange={(newRange) => setChartRange(newRange)}
                selectedDate={selectedChartDate}
                onSelectDate={(d) => setSelectedChartDate(d)}
                entityName="Runners"
              />

              {/* Acquisition Source Attribution & Campaign Link Builder */}
              <SourceAttributionWidget
                sources={stats.sourceBreakdown}
                totalRegistrations={stats.total}
                activeSourceFilter={sourceFilter}
                onSelectSource={(src) => setSourceFilter(src)}
                eventName="Active Salem Marathon 4.0"
                landingPath="/iyakkam/active-salem"
                registerPath="/iyakkam/active-salem/register"
                brandColor="#F26522"
              />

              {/* Filters / Search / Actions Toolbar */}
              <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 space-y-4 shadow-sm">
                {/* Active Source Filter Alert Banner */}
                {sourceFilter !== "all" && (
                  <div className="bg-purple-50/90 border border-purple-200 text-purple-900 px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-semibold shadow-sm">
                    <div className="flex items-center gap-2">
                      <Compass size={14} className="text-purple-600 shrink-0" />
                      <span>
                        Filtering by Acquisition Channel:{" "}
                        <strong className="font-mono bg-purple-100 px-2 py-0.5 rounded-lg border border-purple-300">
                          {sourceFilter}
                        </strong>{" "}
                        ({filteredRegistrations.length} runner{filteredRegistrations.length === 1 ? "" : "s"} matched)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSourceFilter("all")}
                      className="text-purple-800 hover:text-purple-950 font-bold underline text-[11px] uppercase tracking-wider cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <X size={12} /> Clear Channel Filter
                    </button>
                  </div>
                )}

                {/* Active Date Filter Alert Banner */}
                {(selectedChartDate || dateFilter !== "all") && (
                  <div className="bg-amber-50/90 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-semibold shadow-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-amber-600 shrink-0" />
                      <span>
                        Filtering by Date:{" "}
                        <strong className="font-mono bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-300/60">
                          {selectedChartDate
                            ? `Exact day ${selectedChartDate}`
                            : dateFilter === "today"
                            ? "Today"
                            : dateFilter === "yesterday"
                            ? "Yesterday"
                            : dateFilter === "7d"
                            ? "Past 7 Days"
                            : dateFilter === "30d"
                            ? "Past 30 Days"
                            : `Selected date ${customDate}`}
                        </strong>{" "}
                        ({filteredRegistrations.length} runner{filteredRegistrations.length === 1 ? "" : "s"} matched)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChartDate(null);
                        setDateFilter("all");
                        setCustomDate("");
                      }}
                      className="text-amber-800 hover:text-amber-950 font-bold underline text-[11px] uppercase tracking-wider cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <X size={12} /> Clear Date Filter
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 items-center justify-between">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[260px] max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, bib code, transaction ID, city, phone..."
                      className="w-full bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#F26522] focus:ring-4 focus:ring-orange/10"
                    />
                  </div>

                  {/* Actions right: CSV Export */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={exportToCSV}
                      disabled={filteredRegistrations.length === 0}
                      className="bg-[#F26522] hover:bg-[#d95315] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <Download size={14} /> Export Filtered CSV ({filteredRegistrations.length})
                    </button>
                  </div>
                </div>

                {/* Filter & Sort Ribbon */}
                <div className="flex flex-wrap gap-2.5 items-center pt-1 border-t border-slate-100">
                  {/* Dedicated Sort Order Selector */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-[#E2E8F0] rounded-xl px-2.5 py-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <ArrowUpDown size={11} className="text-[#F26522]" /> Sort:
                    </span>
                    <select
                      value={`${sortField}-${sortDirection}`}
                      onChange={(e) => {
                        const [field, dir] = e.target.value.split("-") as [SortField, SortDirection];
                        setSortField(field);
                        setSortDirection(dir);
                      }}
                      className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="created_at-desc">Date: Newest First (Latest ↓)</option>
                      <option value="created_at-asc">Date: Oldest First (Earliest ↑)</option>
                      <option value="full_name-asc">Runner Name (A → Z)</option>
                      <option value="full_name-desc">Runner Name (Z → A)</option>
                      <option value="registration_code-asc">Bib Code (A → Z)</option>
                      <option value="registration_code-desc">Bib Code (Z → A)</option>
                      <option value="category-asc">Category (5KM / 10KM)</option>
                      <option value="tshirt_size-asc">T-Shirt Size (S → XXL)</option>
                      <option value="tshirt_size-desc">T-Shirt Size (XXL → S)</option>
                      <option value="age-asc">Age (Youngest First)</option>
                      <option value="age-desc">Age (Oldest First)</option>
                      <option value="source-asc">Source (A → Z)</option>
                      <option value="source-desc">Source (Z → A)</option>
                      <option value="is_verified-desc">Status (Paid First)</option>
                      <option value="is_verified-asc">Status (Pending First)</option>
                    </select>
                  </div>

                  {/* Date Filter Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={selectedChartDate ? "chart_selected" : dateFilter}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedChartDate(null);
                        setDateFilter(val);
                      }}
                      className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      {selectedChartDate && (
                        <option value="chart_selected">Date: {selectedChartDate} (Selected)</option>
                      )}
                      <option value="all">Date: All Dates</option>
                      <option value="today">Date: Today</option>
                      <option value="yesterday">Date: Yesterday</option>
                      <option value="7d">Date: Last 7 Days</option>
                      <option value="30d">Date: Last 30 Days</option>
                      <option value="custom">Date: Specific Day...</option>
                    </select>
                    {dateFilter === "custom" && (
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="bg-slate-50 border border-[#E2E8F0] rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Category: All</option>
                    <option value="5km">5KM Marathon (₹249)</option>
                    <option value="10km">10KM Timed Run (₹299)</option>
                  </select>

                  {/* Source / Channel Filter */}
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Source: All Channels</option>
                    {stats.sourceBreakdown.map((s) => (
                      <option key={s.source} value={s.source}>
                        Source: {s.source} ({s.total})
                      </option>
                    ))}
                  </select>

                  {/* Verification filter */}
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Status: All</option>
                    <option value="verified">Verified Paid</option>
                    <option value="pending">Pending Verification</option>
                  </select>

                  {/* T-Shirt Filter */}
                  <select
                    value={tshirtFilter}
                    onChange={(e) => setTshirtFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">T-Shirt: All Sizes</option>
                    <option value="S">Size S</option>
                    <option value="M">Size M</option>
                    <option value="L">Size L</option>
                    <option value="XL">Size XL</option>
                    <option value="XXL">Size XXL</option>
                  </select>

                  {/* Gender filter */}
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Gender: All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  {/* Age bracket filter */}
                  <select
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Age: All Brackets</option>
                    <option value="under18">Junior (&lt; 18 yrs)</option>
                    <option value="18-35">Open (18 - 35 yrs)</option>
                    <option value="36-50">Veteran (36 - 50 yrs)</option>
                    <option value="above50">Masters (50+ yrs)</option>
                  </select>

                  {(categoryFilter !== "all" ||
                    verificationFilter !== "all" ||
                    tshirtFilter !== "all" ||
                    genderFilter !== "all" ||
                    ageFilter !== "all" ||
                    dateFilter !== "all" ||
                    selectedChartDate !== null ||
                    searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryFilter("all");
                        setVerificationFilter("all");
                        setSourceFilter("all");
                        setTshirtFilter("all");
                        setGenderFilter("all");
                        setAgeFilter("all");
                        setDateFilter("all");
                        setCustomDate("");
                        setSelectedChartDate(null);
                        setSearchQuery("");
                      }}
                      className="text-xs font-bold text-red-500 hover:text-red-700 underline ml-auto cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Main Registrations List Table with Multi-Column Sorting */}
              <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[9px] sm:text-xs select-none">
                        {/* Bib / Code Sortable */}
                        <th
                          onClick={() => handleSort("registration_code")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Bib / Code</span>
                          {renderSortIcon("registration_code")}
                        </th>

                        {/* Runner Info Sortable */}
                        <th
                          onClick={() => handleSort("full_name")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Runner Info</span>
                          {renderSortIcon("full_name")}
                        </th>

                        {/* Category Sortable */}
                        <th
                          onClick={() => handleSort("category")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Category</span>
                          {renderSortIcon("category")}
                        </th>

                        {/* T-Shirt Size Sortable */}
                        <th
                          onClick={() => handleSort("tshirt_size")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>T-Shirt</span>
                          {renderSortIcon("tshirt_size")}
                        </th>

                        {/* Age & Gender Sortable */}
                        <th
                          onClick={() => handleSort("age")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Age / Gender</span>
                          {renderSortIcon("age")}
                        </th>

                        {/* Source Sortable */}
                        <th
                          onClick={() => handleSort("source")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                          title="Click to sort by Acquisition Channel"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Source</span>
                            {renderSortIcon("source")}
                          </div>
                        </th>

                        {/* Date Sortable */}
                        <th
                          onClick={() => handleSort("created_at")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                          title="Click to sort by Date (Newest / Oldest)"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Payment & Date</span>
                            {renderSortIcon("created_at")}
                            {sortField === "created_at" && (
                              <span className="text-[9px] font-mono font-bold text-[#F26522] lowercase bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                                {sortDirection === "desc" ? "newest ↓" : "oldest ↑"}
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Verification Sortable */}
                        <th
                          onClick={() => handleSort("is_verified")}
                          className="p-4 text-center cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Status</span>
                          {renderSortIcon("is_verified")}
                        </th>

                        <th className="p-4 text-center">Quick Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-150 text-xs sm:text-sm font-semibold text-slate-700">
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-12 text-center text-slate-400 font-bold">
                            No matching registrations found with current filters.
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((r) => {
                          const cleanMobile = (r.mobile_number || "").replace(/\D/g, "");
                          const waText = encodeURIComponent(
                            `Hello ${r.full_name}, your Active Salem Marathon 4.0 Registration Code is ${r.registration_code}. Category: ${r.category}, T-Shirt: ${r.tshirt_size}. Date: Sunday, 11 October 2026. Venue: Valli Super Speciality Hospital, Salem. Reporting: 5:00 AM.`
                          );
                          const waUrl = `https://wa.me/91${cleanMobile}?text=${waText}`;

                          return (
                            <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                              {/* Bib / Code */}
                              <td className="p-4">
                                <span className="font-mono font-black text-[#F26522] tracking-wider block">
                                  {r.registration_code}
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                                  ID: #{r.id}
                                </span>
                              </td>

                              {/* Runner Info */}
                              <td className="p-4">
                                <span className="block text-slate-800 font-bold uppercase">{r.full_name}</span>
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 leading-none font-medium">
                                  <Mail className="w-3 h-3 text-slate-400" /> {r.email_id}
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 leading-none font-medium">
                                  <Phone className="w-3 h-3 text-slate-400" /> {r.mobile_number}
                                </span>
                                {r.city && (
                                  <span className="inline-flex items-center gap-1 text-[9px] text-[#F26522] bg-orange-50 border border-orange-100 px-2 py-0.5 rounded mt-1 font-bold">
                                    <MapPin className="w-2.5 h-2.5" /> {r.city}
                                  </span>
                                )}
                              </td>

                              {/* Category */}
                              <td className="p-4">
                                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-800 border border-slate-200">
                                  {r.category}
                                </span>
                              </td>

                              {/* T-Shirt Size */}
                              <td className="p-4">
                                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                                  <Shirt className="w-3 h-3" /> {r.tshirt_size}
                                </span>
                              </td>

                              {/* Age & Gender */}
                              <td className="p-4">
                                <span className="block text-slate-800 text-xs font-bold leading-snug">
                                  {r.gender || "N/A"}, {r.age} yrs
                                </span>
                                {r.emergency_contact && (
                                  <span className="block text-[10px] text-slate-400 leading-snug mt-0.5">
                                    Emg: {r.emergency_contact}
                                  </span>
                                )}
                              </td>

                              {/* Acquisition Channel */}
                              <td className="p-4">
                                {(() => {
                                  const srcNorm = normalizeSource(r.source);
                                  const badge = getSourceBadgeStyle(srcNorm);
                                  return (
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                      {srcNorm}
                                    </span>
                                  );
                                })()}
                              </td>

                              {/* Payment & Date */}
                              <td className="p-4">
                                <span className="font-mono text-slate-800 bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-[11px] tracking-wide inline-block select-all">
                                  {r.transaction_id}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-mono mt-1">
                                  {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </td>

                              {/* Verification status toggle */}
                              <td className="p-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => toggleVerification(r.id, r.is_verified)}
                                  className={`px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                    r.is_verified
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-250 hover:bg-emerald-100"
                                      : "bg-amber-50 text-amber-700 border border-amber-250 hover:bg-amber-100 animate-pulse"
                                  }`}
                                >
                                  {r.is_verified ? (
                                    <>
                                      <CheckCircle2 size={13} /> Verified
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle size={13} /> Pending
                                    </>
                                  )}
                                </button>
                              </td>

                              {/* Quick Actions (WhatsApp, Resend Email, Delete) */}
                              <td className="p-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {/* WhatsApp Web direct */}
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-all"
                                    title="Open WhatsApp chat with runner"
                                  >
                                    <MessageCircle size={14} />
                                  </a>

                                  {/* Resend Email */}
                                  <button
                                    type="button"
                                    onClick={() => handleResendEmail(r.id, r.email_id)}
                                    disabled={emailSendingId === r.id}
                                    className="p-1.5 bg-orange-50 hover:bg-orange-100 text-[#F26522] border border-orange-200 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                                    title="Resend runner confirmation email"
                                  >
                                    <Send size={14} className={emailSendingId === r.id ? "animate-spin" : ""} />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(r.id, r.registration_code)}
                                    className="p-1.5 hover:bg-red-50 text-red-500 border border-red-200 rounded-lg transition-all cursor-pointer"
                                    title="Delete registration from database"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
