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
  Building,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  MapPin,
  User,
  CheckCircle2,
  Eye,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  BarChart3,
  MessageCircle,
  Send,
  Filter,
  GraduationCap,
  Utensils
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AdminAnalyticsChart, { ChartDataPoint } from "../../../../components/iyakkam/AdminAnalyticsChart";

interface Registration {
  id: number;
  registration_code: string;
  full_name: string;
  email_id: string;
  mobile_number: string;
  category: string;
  designation?: string;
  include_workshop: boolean;
  institution: string;
  department?: string;
  city?: string;
  source?: string;
  transaction_id: string;
  payment_screenshot?: string;
  bonafide_certificate?: string;
  food_preference?: string;
  iap_credit_points?: boolean;
  iap_membership_number?: string;
  is_verified: boolean;
  created_at: string;
}

type SortField =
  | "created_at"
  | "full_name"
  | "registration_code"
  | "category"
  | "institution"
  | "is_verified";

type SortDirection = "asc" | "desc";

export default function AriseAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [emailSendingId, setEmailSendingId] = useState<number | null>(null);
  const [bulkEmailSending, setBulkEmailSending] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [workshopFilter, setWorkshopFilter] = useState("all");
  const [foodFilter, setFoodFilter] = useState("all");

  // Sorting
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Date Filtering
  const [dateFilter, setDateFilter] = useState<string>("all"); // "all" | "today" | "yesterday" | "7d" | "30d" | "custom"
  const [customDate, setCustomDate] = useState<string>("");
  const [selectedChartDate, setSelectedChartDate] = useState<string | null>(null);

  // Chart range: "7d" | "14d" | "30d" | "all"
  const [chartRange, setChartRange] = useState<"7d" | "14d" | "30d" | "all">("14d");

  // Lightbox Modal for Screenshots or Certificates
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  // Load password from session storage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("arise_admin_pwd");
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
      const response = await fetch("/api/arise/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: targetPassword }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsAuthenticated(true);
        setRegistrations(result.data || []);
        setLastUpdated(new Date());
        sessionStorage.setItem("arise_admin_pwd", targetPassword);
      } else {
        setAuthError(result.error || "Invalid administrator password");
        sessionStorage.removeItem("arise_admin_pwd");
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
    sessionStorage.removeItem("arise_admin_pwd");
  };

  // Toggle verification status
  const toggleVerification = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_verified: newStatus } : r))
    );

    try {
      const response = await fetch("/api/arise/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("arise_admin_pwd") || password,
          id,
          isVerified: newStatus,
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

  // Delete registration entry
  const handleDelete = async (id: number, code: string) => {
    if (!window.confirm(`Are you absolutely sure you want to permanently delete registration code ${code}?`)) {
      return;
    }

    try {
      const response = await fetch("/api/arise/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("arise_admin_pwd") || password,
          id,
        }),
      });

      if (response.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Failed to delete record from database server");
      }
    } catch (err) {
      console.error(err);
      alert("A network error occurred during deletion");
    }
  };

  const handleResendEmail = async (id: number, email: string) => {
    setEmailSendingId(id);
    try {
      const response = await fetch("/api/arise/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("arise_admin_pwd") || password,
          id,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert(`Delegate confirmation pass successfully re-dispatched to ${email}`);
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
    if (!window.confirm("Resend confirmation emails to ALL registered ARISE delegates?")) {
      return;
    }
    setBulkEmailSending(true);
    try {
      const response = await fetch("/api/arise/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: sessionStorage.getItem("arise_admin_pwd") || password,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert(`Successfully dispatched confirmation emails to ${result.count || registrations.length} delegates!`);
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

  // Helper to compute delegate fee
  const calculateFee = (r: Registration) => {
    const isStudent = (r.designation && r.designation.toLowerCase().includes("student")) || r.category.toLowerCase().includes("student");
    if (r.registration_code?.includes("LEAD")) return 10000;
    if (r.category.toLowerCase().includes("bulk")) return 0;
    if (isStudent) return r.include_workshop ? 1500 : 1000;
    if (r.category.toLowerCase().includes("workshop")) return 500;
    return r.include_workshop ? 2500 : 2000;
  };

  // Compute stats metrics
  const stats = useMemo(() => {
    const total = registrations.length;
    const verified = registrations.filter((r) => r.is_verified).length;
    const pending = total - verified;

    const revenue = registrations
      .filter((r) => r.is_verified)
      .reduce((sum, r) => {
        let ticketPrice = 0;
        const isStudent = (r.designation && r.designation.toLowerCase().includes("student")) || r.category.toLowerCase().includes("student");
        if (r.registration_code?.includes("LEAD")) {
          ticketPrice = 20000;
        } else if (r.category.toLowerCase().includes("bulk")) {
          ticketPrice = 0; // Covered by the Lead Coordinator package
        } else if (isStudent) {
          ticketPrice = r.include_workshop ? 1500 : 1000;
        } else if (r.category.toLowerCase().includes("workshop")) {
          ticketPrice = 500;
        } else {
          // Professional
          ticketPrice = r.include_workshop ? 2500 : 2000;
        }
        return sum + ticketPrice;
      }, 0);

    // Catering counts
    const vegCount = registrations.filter((r) => (r.food_preference || "").toLowerCase().includes("veg") && !(r.food_preference || "").toLowerCase().includes("non")).length;
    const nonVegCount = registrations.filter((r) => (r.food_preference || "").toLowerCase().includes("non")).length;

    // IAP credit counts
    const iapCount = registrations.filter((r) => r.iap_credit_points).length;

    // Designation counts
    const studentCount = registrations.filter((r) => (r.designation && r.designation.toLowerCase().includes("student")) || r.category.toLowerCase().includes("student")).length;
    const profCount = total - studentCount;

    return {
      total,
      verified,
      pending,
      revenue,
      workshopCount,
      vegCount,
      nonVegCount,
      iapCount,
      studentCount,
      profCount,
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
          dateMap[key].revenue += calculateFee(r);
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

  // Filters & Search logic
  const filteredRegistrations = useMemo(() => {
    const list = registrations.filter((r) => {
      const searchStr = `${r.full_name} ${r.email_id} ${r.mobile_number} ${r.registration_code} ${r.transaction_id} ${r.institution}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());

      let matchesCategory = true;
      if (categoryFilter !== "all") {
        matchesCategory = r.category.toLowerCase().includes(categoryFilter.toLowerCase());
      }

      let matchesVerification = true;
      if (verificationFilter === "verified") {
        matchesVerification = r.is_verified === true;
      } else if (verificationFilter === "pending") {
        matchesVerification = r.is_verified === false;
      }

      let matchesWorkshop = true;
      if (workshopFilter === "yes") {
        matchesWorkshop = r.include_workshop || r.category.toLowerCase().includes("workshop");
      } else if (workshopFilter === "no") {
        matchesWorkshop = !r.include_workshop && !r.category.toLowerCase().includes("workshop");
      }

      let matchesFood = true;
      if (foodFilter === "veg") {
        matchesFood = (r.food_preference || "").toLowerCase().includes("veg") && !(r.food_preference || "").toLowerCase().includes("non");
      } else if (foodFilter === "nonveg") {
        matchesFood = (r.food_preference || "").toLowerCase().includes("non");
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

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVerification &&
        matchesWorkshop &&
        matchesFood &&
        matchesDate
      );
    });

    // Sorting with robust date handling
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
        case "institution":
          comparison = (a.institution || "").localeCompare(b.institution || "");
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
    workshopFilter,
    foodFilter,
    dateFilter,
    customDate,
    selectedChartDate,
    sortField,
    sortDirection,
  ]);

  // Export registrations spreadsheet helper
  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return;

    const headers = [
      "ID",
      "Registration Code",
      "Full Name",
      "Email ID",
      "Mobile Number",
      "Category",
      "Workshop Included",
      "Institution",
      "Department",
      "City",
      "Designation",
      "Food Preference",
      "IAP Points",
      "IAP Number",
      "UPI Reference ID",
      "Verified Status",
      "Created At",
    ];

    const rows = filteredRegistrations.map((r) => [
      r.id,
      r.registration_code,
      `"${r.full_name.replace(/"/g, '""')}"`,
      r.email_id,
      `'${r.mobile_number}`,
      r.category,
      r.include_workshop ? "Yes" : "No",
      `"${r.institution.replace(/"/g, '""')}"`,
      `"${(r.department || "").replace(/"/g, '""')}"`,
      `"${(r.city || "").replace(/"/g, '""')}"`,
      `"${(r.designation || "").replace(/"/g, '""')}"`,
      r.food_preference || "Vegetarian",
      r.iap_credit_points ? "Yes" : "No",
      `'${r.iap_membership_number || ""}`,
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
      `arise_delegates_${new Date().toISOString().split("T")[0]}.csv`
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
      <ArrowUp className="w-3 h-3 text-[#00A896] ml-1 inline font-bold" />
    ) : (
      <ArrowDown className="w-3 h-3 text-[#00A896] ml-1 inline font-bold" />
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
              href="/iyakkam/arise"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#00A896] font-semibold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to ARISE Landing
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
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#00A896]" : ""}`} />
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 text-[#004B57] hover:bg-teal-100 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  title="Resend delegate passes to all registered attendees"
                >
                  <Send className={`w-3.5 h-3.5 ${bulkEmailSending ? "animate-pulse" : ""}`} />
                  <span>{bulkEmailSending ? "Sending..." : "Resend All Passes"}</span>
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
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-[#004B57] border border-slate-200 shadow-inner">
                  <Lock size={24} />
                </div>
                <h1 className="font-display text-xl font-black text-[#004B57] uppercase tracking-tight">
                  ARISE 2026 Admin Portal
                </h1>
                <p className="text-xs text-slate-400 font-semibold">
                  Authentication gateway required to access CME database.
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
                    className="w-full bg-white border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A896] focus:ring-4 focus:ring-teal/10"
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
                  className="w-full bg-[#004B57] hover:bg-[#00333C] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex justify-center items-center gap-2 cursor-pointer"
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
                    label: "Total Delegates",
                    value: stats.total,
                    sub: `Students: ${stats.studentCount} • Professionals: ${stats.profCount}`,
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
                    sub: "Awaiting bank check",
                    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
                    color: "border-amber-250 bg-amber-50/10",
                  },
                  {
                    label: "Verified Revenue",
                    value: `₹${stats.revenue.toLocaleString("en-IN")}`,
                    sub: "Gross summit collections",
                    icon: <IndianRupee className="w-5 h-5 text-[#00A896]" />,
                    color: "border-teal-200 bg-teal-50/10",
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

              {/* Operational Breakdown Cards: Catering & Workshops & IAP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Catering Headcount */}
                <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center border border-amber-200 shrink-0">
                    <Utensils size={22} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      KIOT Catering Roster
                    </span>
                    <span className="font-display text-xl font-black text-slate-800 block mt-0.5">
                      {stats.vegCount} Veg • {stats.nonVegCount} Non-Veg
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Exact dining hall lunch counts
                    </span>
                  </div>
                </div>

                {/* Workshop Seats */}
                <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 text-[#00A896] rounded-2xl flex items-center justify-center border border-teal-200 shrink-0">
                    <Activity size={22} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Hands-on Workshop
                    </span>
                    <span className="font-display text-xl font-black text-slate-800 block mt-0.5">
                      {stats.workshopCount} Enrolled
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Practical VR & cadaveric rehab
                    </span>
                  </div>
                </div>

                {/* IAP Points */}
                <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center border border-purple-200 shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      IAP Credit Hours
                    </span>
                    <span className="font-display text-xl font-black text-slate-800 block mt-0.5">
                      {stats.iapCount} Claimants
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Delegates requesting Council points
                    </span>
                  </div>
                </div>
              </div>

              {/* HIGH-END INTERACTIVE SVG ANALYTICS CHART */}
              <AdminAnalyticsChart
                title="Daily Delegate Registration Velocity"
                subtitle="Volume of delegate passes booked and CME revenue recorded per calendar day"
                accentColor="#00A896"
                accentGradientId="ariseChartGradient"
                dataPoints={dailyChartPoints}
                range={chartRange}
                onRangeChange={(newRange) => setChartRange(newRange)}
                selectedDate={selectedChartDate}
                onSelectDate={(d) => setSelectedChartDate(d)}
                entityName="Delegates"
              />

              {/* Filters / Actions Toolbar */}
              <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 space-y-4 shadow-sm">
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
                        ({filteredRegistrations.length} delegate{filteredRegistrations.length === 1 ? "" : "s"} matched)
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
                      placeholder="Search name, code, transaction ID, college..."
                      className="w-full bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#00A896] focus:ring-4 focus:ring-teal/10"
                    />
                  </div>

                  {/* Actions right: CSV Export */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={exportToCSV}
                      disabled={filteredRegistrations.length === 0}
                      className="bg-[#00A896] hover:bg-[#008B7A] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <Download size={14} /> Export Filtered CSV ({filteredRegistrations.length})
                    </button>
                  </div>
                </div>

                {/* Filter & Sort Ribbon */}
                <div className="flex flex-wrap gap-2.5 items-center pt-1 border-t border-slate-100">
                  {/* Dedicated Sort Selector */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-[#E2E8F0] rounded-xl px-2.5 py-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <ArrowUpDown size={11} className="text-[#00A896]" /> Sort:
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
                      <option value="full_name-asc">Delegate Name (A → Z)</option>
                      <option value="full_name-desc">Delegate Name (Z → A)</option>
                      <option value="registration_code-asc">Pass Code (A → Z)</option>
                      <option value="registration_code-desc">Pass Code (Z → A)</option>
                      <option value="category-asc">Category & Track</option>
                      <option value="institution-asc">Institution (A → Z)</option>
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
                    <option value="all">All Packages</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="bulk">Bulk Group</option>
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

                  {/* Workshop filter */}
                  <select
                    value={workshopFilter}
                    onChange={(e) => setWorkshopFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Workshop: All</option>
                    <option value="yes">Includes Workshop</option>
                    <option value="no">Conference Only</option>
                  </select>

                  {/* Food filter */}
                  <select
                    value={foodFilter}
                    onChange={(e) => setFoodFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Food: All</option>
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                  </select>

                  {(categoryFilter !== "all" ||
                    verificationFilter !== "all" ||
                    workshopFilter !== "all" ||
                    foodFilter !== "all" ||
                    dateFilter !== "all" ||
                    selectedChartDate !== null ||
                    searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryFilter("all");
                        setVerificationFilter("all");
                        setWorkshopFilter("all");
                        setFoodFilter("all");
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
                        {/* Code */}
                        <th
                          onClick={() => handleSort("registration_code")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Pass Code</span>
                          {renderSortIcon("registration_code")}
                        </th>

                        {/* Delegate */}
                        <th
                          onClick={() => handleSort("full_name")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Delegate Profile</span>
                          {renderSortIcon("full_name")}
                        </th>

                        {/* Category */}
                        <th
                          onClick={() => handleSort("category")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Category & Track</span>
                          {renderSortIcon("category")}
                        </th>

                        {/* Institution */}
                        <th
                          onClick={() => handleSort("institution")}
                          className="p-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                        >
                          <span>Institution</span>
                          {renderSortIcon("institution")}
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
                              <span className="text-[9px] font-mono font-bold text-[#00A896] lowercase bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                                {sortDirection === "desc" ? "newest ↓" : "oldest ↑"}
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Status */}
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
                          <td colSpan={7} className="p-12 text-center text-slate-400 font-bold">
                            No matching ARISE delegates found with current filters.
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((r) => {
                          const cleanMobile = (r.mobile_number || "").replace(/\D/g, "");
                          const waText = encodeURIComponent(
                            `Hello ${r.full_name}, your ARISE 2026 Delegate Pass Code is ${r.registration_code}. Date: Saturday, 17 October 2026. Venue: Knowledge Institute of Technology (KIOT), Salem.`
                          );
                          const waUrl = `https://wa.me/91${cleanMobile}?text=${waText}`;

                          return (
                            <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                              {/* Pass Code */}
                              <td className="p-4">
                                <span className="font-mono font-black text-[#00A896] tracking-wider block">
                                  {r.registration_code}
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                                  ID: #{r.id}
                                </span>
                              </td>

                              {/* Delegate Info */}
                              <td className="p-4">
                                <span className="block text-slate-800 font-bold uppercase">{r.full_name}</span>
                                {r.designation && (
                                  <span className="block text-[10px] text-slate-500 font-semibold">
                                    {r.designation} {r.food_preference ? `• ${r.food_preference}` : ""}
                                  </span>
                                )}
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 leading-none font-medium">
                                  <Mail className="w-3 h-3" /> {r.email_id}
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 leading-none font-medium">
                                  <Phone className="w-3 h-3" /> {r.mobile_number}
                                </span>
                              </td>

                              {/* Category & Workshop */}
                              <td className="p-4">
                                <span className="block font-bold text-[#004B57]">{r.category}</span>
                                {r.include_workshop ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full mt-1.5 bg-teal-100 text-teal-800 border border-teal-200">
                                    <Activity className="w-2.5 h-2.5" /> Hands-on Workshop
                                  </span>
                                ) : (
                                  <span className="inline-block text-[9px] font-semibold text-slate-400 mt-1">
                                    Conference Only
                                  </span>
                                )}
                                {r.iap_credit_points && (
                                  <span className="inline-block text-[9px] font-mono text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 mt-1 block w-fit">
                                    IAP Points Requested
                                  </span>
                                )}
                              </td>

                              {/* Institution */}
                              <td className="p-4">
                                <span className="block text-slate-800 font-medium text-xs">{r.institution}</span>
                                {r.department && (
                                  <span className="block text-[10px] text-slate-400">{r.department}</span>
                                )}
                                {r.city && (
                                  <span className="inline-flex items-center gap-1 text-[9px] text-slate-500 mt-1">
                                    <MapPin className="w-2.5 h-2.5" /> {r.city}
                                  </span>
                                )}
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

                              {/* Status Toggle */}
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

                              {/* Quick Actions (WhatsApp, Resend Email, Screenshot, Delete) */}
                              <td className="p-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {/* WhatsApp Web direct */}
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-all"
                                    title="Open WhatsApp chat with delegate"
                                  >
                                    <MessageCircle size={14} />
                                  </a>

                                  {/* Resend Email */}
                                  <button
                                    type="button"
                                    onClick={() => handleResendEmail(r.id, r.email_id)}
                                    disabled={emailSendingId === r.id}
                                    className="p-1.5 bg-teal-50 hover:bg-teal-100 text-[#00A896] border border-teal-200 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                                    title="Resend delegate confirmation pass"
                                  >
                                    <Send size={14} className={emailSendingId === r.id ? "animate-spin" : ""} />
                                  </button>

                                  {/* Proof screenshot if available */}
                                  {r.payment_screenshot && r.payment_screenshot !== "RAZORPAY_ONLINE_PAYMENT" && (
                                    <button
                                      type="button"
                                      onClick={() => setActiveScreenshot(r.payment_screenshot || null)}
                                      className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition-all cursor-pointer"
                                      title="View payment screenshot"
                                    >
                                      <Eye size={14} />
                                    </button>
                                  )}

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

      {/* Lightbox for screenshots */}
      {activeScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-2xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4">
            <button
              onClick={() => setActiveScreenshot(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <div className="mt-8 flex justify-center">
              <img
                src={activeScreenshot}
                alt="Payment proof"
                className="max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
