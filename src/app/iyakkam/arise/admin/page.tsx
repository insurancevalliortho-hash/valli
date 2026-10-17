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
  Share2,
  Star,
  MessageSquare,
  ExternalLink,
  ThumbsUp
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AdminAnalyticsChart, { ChartDataPoint } from "../../../../components/iyakkam/AdminAnalyticsChart";
import SourceAttributionWidget from "../../../../components/iyakkam/SourceAttributionWidget";
import { normalizeSource, getSourceBadgeStyle } from "../../../../lib/attribution";

interface Registration {
  id: number;
  registration_code: string;
  full_name: string;
  email_id: string;
  mobile_number: string;
  category: string;
  designation?: string;
  qualification?: string;
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
  // Live Feedback fields
  feedback_id?: number | null;
  q1_event_quality?: number | null;
  q2_session_relevance?: number | null;
  q3_speaker_effectiveness?: number | null;
  q4_hands_on_workshop?: number | null;
  q5_organization_venue?: number | null;
  feedback_comments?: string | null;
  feedback_submitted_at?: string | null;
}

type SortField =
  | "created_at"
  | "full_name"
  | "registration_code"
  | "category"
  | "institution"
  | "source"
  | "is_verified"
  | "feedback";

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
  const [sourceFilter, setSourceFilter] = useState("all");
  const [feedbackFilter, setFeedbackFilter] = useState<"all" | "submitted" | "pending">("all");

  // Sorting
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Date Filtering
  const [dateFilter, setDateFilter] = useState<string>("all"); // "all" | "today" | "yesterday" | "7d" | "30d" | "custom"
  const [customDate, setCustomDate] = useState<string>("");
  const [selectedChartDate, setSelectedChartDate] = useState<string | null>(null);

  // Chart range: "7d" | "14d" | "30d" | "all"
  const [chartRange, setChartRange] = useState<"7d" | "14d" | "30d" | "all">("14d");

  // Modals
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [activeFeedbackModal, setActiveFeedbackModal] = useState<Registration | null>(null);
  const [showAllFeedbacksModal, setShowAllFeedbacksModal] = useState(false);
  const [feedbacksSearch, setFeedbacksSearch] = useState("");
  const [feedbacksOnlyWithComments, setFeedbacksOnlyWithComments] = useState(false);

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
    const catLower = (r.category || "").toLowerCase();
    const desigLower = (r.designation || "").toLowerCase();
    const qualLower = (r.qualification || "").toLowerCase();
    const isStudent =
      desigLower.includes("student") ||
      desigLower.includes("intern") ||
      catLower.includes("student") ||
      qualLower.includes("student");

    // 0. Special Concession: ₹300
    if (
      catLower.includes("special concession") ||
      catLower.includes("concession") ||
      (catLower.includes("special") && catLower.includes("300")) ||
      catLower.includes("300")
    ) {
      return 300;
    }

    // 1. Bulk Registrations: ₹500 per person (package of 5 = ₹2,500 total)
    if (catLower.includes("bulk") || catLower.includes("5 persons")) {
      return 500;
    }

    // 2. Special Categories
    if (
      catLower.includes("special catagory 1") ||
      catLower.includes("special category 1") ||
      (catLower.includes("special") && catLower.includes("500"))
    ) {
      return 500;
    }
    if (
      catLower.includes("special catagory 2") ||
      catLower.includes("special category 2") ||
      (catLower.includes("special") && catLower.includes("1000"))
    ) {
      return 1000;
    }

    // 3. Online Conference Pass: ₹500 for students, ₹1,000 for doctors / professionals
    if (catLower.includes("online")) {
      return isStudent ? 500 : 1000;
    }

    // 4. Conference + Workshop (1000) offer: ₹1,000
    if (catLower.includes("1000")) {
      return 1000;
    }

    // 5. Standalone Workshop Only (without conference): ₹500
    const isWorkshopOnly =
      catLower === "workshop" ||
      (catLower.includes("workshop") && !catLower.includes("conference") && !r.include_workshop);

    if (isWorkshopOnly) {
      return 500;
    }

    // 6. Conference with Workshop: ₹1,500 for students, ₹2,500 for doctors / consultants
    const hasWorkshop = r.include_workshop || catLower.includes("workshop");
    if (hasWorkshop) {
      return isStudent ? 1500 : 2500;
    }

    // 7. Conference Only: ₹1,000 for students, ₹2,000 for doctors / consultants
    return isStudent ? 1000 : 2000;
  };

  // Compute stats metrics
  const stats = useMemo(() => {
    const total = registrations.length;
    const verified = registrations.filter((r) => r.is_verified).length;
    const pending = total - verified;

    const revenue = registrations
      .filter((r) => r.is_verified)
      .reduce((sum, r) => sum + calculateFee(r), 0);

    // Workshop seats
    const workshopCount = registrations.filter(
      (r) => r.include_workshop || (r.category && r.category.toLowerCase().includes("workshop"))
    ).length;

    // Catering counts
    const nonVegCount = registrations.filter(
      (r) => (r.food_preference || "").toLowerCase().includes("non")
    ).length;
    const vegCount = registrations.filter(
      (r) => !(r.food_preference || "").toLowerCase().includes("non")
    ).length;

    // IAP credit counts
    const iapCount = registrations.filter((r) => r.iap_credit_points).length;

    // Designation counts
    const studentCount = registrations.filter((r) => {
      const catLower = (r.category || "").toLowerCase();
      const desigLower = (r.designation || "").toLowerCase();
      const qualLower = (r.qualification || "").toLowerCase();
      return (
        desigLower.includes("student") ||
        desigLower.includes("intern") ||
        catLower.includes("student") ||
        qualLower.includes("student")
      );
    }).length;
    const profCount = total - studentCount;

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
        sourceMap[src].revenue += calculateFee(r);
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

    // Feedback Analytics calculations
    const submittedFeedbacks = registrations.filter((r) => Boolean(r.feedback_id));
    const feedbackCount = submittedFeedbacks.length;
    const feedbackRate = total > 0 ? Math.round((feedbackCount / total) * 100) : 0;

    let fbQ1 = 0, fbQ2 = 0, fbQ3 = 0, fbQ4 = 0, fbQ5 = 0;
    submittedFeedbacks.forEach((r) => {
      fbQ1 += Number(r.q1_event_quality) || 0;
      fbQ2 += Number(r.q2_session_relevance) || 0;
      fbQ3 += Number(r.q3_speaker_effectiveness) || 0;
      fbQ4 += Number(r.q4_hands_on_workshop) || 0;
      fbQ5 += Number(r.q5_organization_venue) || 0;
    });

    const avgQ1 = feedbackCount > 0 ? Number((fbQ1 / feedbackCount).toFixed(1)) : 0;
    const avgQ2 = feedbackCount > 0 ? Number((fbQ2 / feedbackCount).toFixed(1)) : 0;
    const avgQ3 = feedbackCount > 0 ? Number((fbQ3 / feedbackCount).toFixed(1)) : 0;
    const avgQ4 = feedbackCount > 0 ? Number((fbQ4 / feedbackCount).toFixed(1)) : 0;
    const avgQ5 = feedbackCount > 0 ? Number((fbQ5 / feedbackCount).toFixed(1)) : 0;
    const overallAvg = feedbackCount > 0
      ? Number(((avgQ1 + avgQ2 + avgQ3 + avgQ4 + avgQ5) / 5).toFixed(1))
      : 0;

    const feedbackWithComments = submittedFeedbacks.filter(
      (r) => Boolean(r.feedback_comments && r.feedback_comments.trim())
    ).length;

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
      sourceBreakdown,
      feedbackCount,
      feedbackRate,
      avgQ1,
      avgQ2,
      avgQ3,
      avgQ4,
      avgQ5,
      overallAvg,
      feedbackWithComments,
      submittedFeedbacks,
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

      // Source Channel Filtering
      let matchesSource = true;
      if (sourceFilter !== "all") {
        matchesSource = normalizeSource(r.source).toLowerCase() === sourceFilter.toLowerCase();
      }

      // Feedback Status Filtering
      let matchesFeedback = true;
      if (feedbackFilter === "submitted") {
        matchesFeedback = Boolean(r.feedback_id);
      } else if (feedbackFilter === "pending") {
        matchesFeedback = !r.feedback_id;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVerification &&
        matchesWorkshop &&
        matchesFood &&
        matchesDate &&
        matchesSource &&
        matchesFeedback
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
        case "source":
          comparison = normalizeSource(a.source).localeCompare(normalizeSource(b.source));
          break;
        case "is_verified":
          comparison = (a.is_verified ? 1 : 0) - (b.is_verified ? 1 : 0);
          break;
        case "feedback":
          comparison = (a.feedback_id ? 1 : 0) - (b.feedback_id ? 1 : 0);
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
    feedbackFilter,
    dateFilter,
    customDate,
    selectedChartDate,
    sourceFilter,
    sortField,
    sortDirection,
  ]);

  // Export registrations spreadsheet helper with full feedback columns
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
      "Fee (INR)",
      "Source Channel",
      "Food Preference",
      "IAP Points",
      "IAP Number",
      "UPI Reference ID",
      "Verified Status",
      "Feedback Status",
      "Q1 Event Quality (1-5)",
      "Q2 Clinical Relevance (1-5)",
      "Q3 Speaker Expertise (1-5)",
      "Q4 Hands-on Workshop (1-5)",
      "Q5 Venue & Hospitality (1-5)",
      "Feedback Overall Rating",
      "Feedback Comments / Suggestions",
      "Feedback Submitted At",
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
      calculateFee(r),
      `"${normalizeSource(r.source)}"`,
      r.food_preference || "Vegetarian",
      r.iap_credit_points ? "Yes" : "No",
      `'${r.iap_membership_number || ""}`,
      `'${r.transaction_id}`,
      r.is_verified ? "Verified" : "Pending",
      r.feedback_id ? "Submitted" : "Pending",
      r.q1_event_quality ?? "",
      r.q2_session_relevance ?? "",
      r.q3_speaker_effectiveness ?? "",
      r.q4_hands_on_workshop ?? "",
      r.q5_organization_venue ?? "",
      r.feedback_id
        ? (
            (Number(r.q1_event_quality || 0) +
              Number(r.q2_session_relevance || 0) +
              Number(r.q3_speaker_effectiveness || 0) +
              Number(r.q4_hands_on_workshop || 0) +
              Number(r.q5_organization_venue || 0)) /
            5
          ).toFixed(1)
        : "",
      r.feedback_comments ? `"${r.feedback_comments.replace(/"/g, '""')}"` : "",
      r.feedback_submitted_at ? new Date(r.feedback_submitted_at).toLocaleString() : "",
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
      `arise_delegates_with_feedback_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dedicated Export for Feedback Responses Only
  const exportFeedbackOnlyCSV = () => {
    const feedbackRows = registrations.filter((r) => Boolean(r.feedback_id));
    if (feedbackRows.length === 0) {
      alert("No feedback submissions to export yet.");
      return;
    }

    const headers = [
      "Registration Code",
      "Delegate Name",
      "Institution",
      "Email ID",
      "Mobile Number",
      "Category",
      "Q1 Event Quality (1-5)",
      "Q2 Clinical Relevance (1-5)",
      "Q3 Speaker Expertise (1-5)",
      "Q4 Hands-on Workshop (1-5)",
      "Q5 Venue & Hospitality (1-5)",
      "Overall Rating (Average)",
      "Feedback Comments & Suggestions",
      "Submitted At",
    ];

    const rows = feedbackRows.map((r) => [
      r.registration_code,
      `"${r.full_name.replace(/"/g, '""')}"`,
      `"${r.institution.replace(/"/g, '""')}"`,
      r.email_id,
      `'${r.mobile_number}`,
      r.category,
      r.q1_event_quality ?? "",
      r.q2_session_relevance ?? "",
      r.q3_speaker_effectiveness ?? "",
      r.q4_hands_on_workshop ?? "",
      r.q5_organization_venue ?? "",
      (
        (Number(r.q1_event_quality || 0) +
          Number(r.q2_session_relevance || 0) +
          Number(r.q3_speaker_effectiveness || 0) +
          Number(r.q4_hands_on_workshop || 0) +
          Number(r.q5_organization_venue || 0)) /
        5
      ).toFixed(1),
      r.feedback_comments ? `"${r.feedback_comments.replace(/"/g, '""')}"` : "",
      r.feedback_submitted_at ? new Date(r.feedback_submitted_at).toLocaleString() : "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `arise_feedback_responses_${new Date().toISOString().split("T")[0]}.csv`
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

              {/* Operational Breakdown Cards: Workshops & IAP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

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

              {/* ARISE 2026 CME Delegate Feedback & Quality Ratings Ribbon */}
              <div className="bg-gradient-to-br from-white via-teal-50/20 to-white border border-teal-200/90 rounded-[2rem] p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-200 text-amber-600 shadow-inner shrink-0">
                      <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-black text-slate-800 tracking-tight">
                          ARISE 2026 Delegate Feedback &amp; Ratings
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full border border-teal-200">
                          Live Responses
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Real-time evaluation across clinical relevance, workshops, faculty, and venue hospitality.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowAllFeedbacksModal(true)}
                      disabled={stats.feedbackCount === 0}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#004B57] hover:bg-[#003842] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MessageSquare size={14} />
                      <span>Browse All Feedback ({stats.feedbackCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={exportFeedbackOnlyCSV}
                      disabled={stats.feedbackCount === 0}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                      title="Export all feedback responses and ratings to CSV"
                    >
                      <Download size={13} />
                      <span>Export Feedback CSV</span>
                    </button>

                    <a
                      href="/arise/feedback"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-50 border border-teal-200 text-[#00A896] hover:bg-teal-100 rounded-xl text-xs font-bold transition-all"
                      title="Open delegate feedback form in a new tab"
                    >
                      <ExternalLink size={13} />
                      <span>Open Feedback Form</span>
                    </a>
                  </div>
                </div>

                {/* Overall Score & Core Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Metric 1: Overall Average */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Overall Rating</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-display text-2xl font-black text-slate-800">
                        {stats.feedbackCount > 0 ? stats.overallAvg : "—"}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            stats.feedbackCount > 0 && Math.round(stats.overallAvg) >= s
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Metric 2: Submissions count & rate */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Responses Received</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-display text-2xl font-black text-[#00A896]">
                        {stats.feedbackCount}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">/ {stats.total} delegates</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">
                      {stats.feedbackRate}% total submission rate
                    </div>
                  </div>

                  {/* Metric 3: Suggestions & Comments */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Written Remarks</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-display text-2xl font-black text-slate-800">
                        {stats.feedbackWithComments}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">reviews</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">
                      Suggestions for next edition
                    </div>
                  </div>

                  {/* Metric 4: Satisfaction Index */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Satisfaction Index</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-2xl font-black text-emerald-600">
                        {stats.feedbackCount > 0 && stats.overallAvg >= 4 ? "Exceptional" : stats.feedbackCount > 0 ? "Positive" : "Awaiting Data"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">
                      {stats.feedbackCount > 0 ? "High delegate satisfaction" : "Form active for attendees"}
                    </div>
                  </div>
                </div>

                {/* Category Rating Breakdown Bars */}
                {stats.feedbackCount > 0 && (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Score Breakdown Across 5 Focus Areas
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                      {[
                        { label: "1. Event Quality", score: stats.avgQ1 },
                        { label: "2. Clinical Sessions", score: stats.avgQ2 },
                        { label: "3. Speaker Expertise", score: stats.avgQ3 },
                        { label: "4. Hands-on Workshop", score: stats.avgQ4 },
                        { label: "5. Venue & Hospitality", score: stats.avgQ5 },
                      ].map((item, idx) => {
                        const pct = Math.min(100, Math.round((item.score / 5) * 100));
                        return (
                          <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-slate-700 truncate text-[11px]">{item.label}</span>
                              <span className="font-black text-[#00A896] font-mono text-xs">{item.score} ★</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#00A896] h-full rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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

              {/* Source Attribution & Acquisition Channels */}
              <SourceAttributionWidget
                sources={stats.sourceBreakdown}
                totalRegistrations={stats.total}
                activeSourceFilter={sourceFilter}
                onSelectSource={(src) => setSourceFilter(src)}
                eventName="ARISE 2026 CME"
                landingPath="/iyakkam/arise"
                registerPath="/iyakkam/arise/register"
                brandColor="#00A896"
              />

              {/* Filters / Actions Toolbar */}
              <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 space-y-4 shadow-sm">
                {/* Active Channel Filter Alert Banner */}
                {sourceFilter !== "all" && (
                  <div className="bg-teal-50/90 border border-teal-200 text-teal-900 px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-semibold shadow-sm">
                    <div className="flex items-center gap-2">
                      <Share2 size={14} className="text-teal-600 shrink-0" />
                      <span>
                        Filtering by Acquisition Channel:{" "}
                        <strong className="font-mono bg-teal-100/80 px-2 py-0.5 rounded-lg border border-teal-300/60 uppercase">
                          {sourceFilter}
                        </strong>{" "}
                        ({filteredRegistrations.length} delegate{filteredRegistrations.length === 1 ? "" : "s"} matched)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSourceFilter("all")}
                      className="text-teal-800 hover:text-teal-950 font-bold underline text-[11px] uppercase tracking-wider cursor-pointer flex items-center gap-1 ml-auto"
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
                      <option value="source-asc">Source (A → Z)</option>
                      <option value="source-desc">Source (Z → A)</option>
                      <option value="is_verified-desc">Status (Paid First)</option>
                      <option value="is_verified-asc">Status (Pending First)</option>
                      <option value="feedback-desc">Feedback (Submitted First)</option>
                      <option value="feedback-asc">Feedback (Pending First)</option>
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

                  {/* Feedback Status filter */}
                  <select
                    value={feedbackFilter}
                    onChange={(e) => setFeedbackFilter(e.target.value as any)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Feedback: All ({stats.total})</option>
                    <option value="submitted">Feedback: Submitted ({stats.feedbackCount})</option>
                    <option value="pending">Feedback: Pending ({stats.total - stats.feedbackCount})</option>
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
                    sourceFilter !== "all" ||
                    feedbackFilter !== "all" ||
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
                        setSourceFilter("all");
                        setFeedbackFilter("all");
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

                        {/* Feedback Column Header */}
                        <th
                          onClick={() => handleSort("feedback")}
                          className="p-4 text-center cursor-pointer hover:bg-slate-100 transition-colors group"
                          title="Click to sort by Feedback submission status"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>Feedback</span>
                            {renderSortIcon("feedback")}
                          </div>
                        </th>

                        <th className="p-4 text-center">Quick Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-150 text-xs sm:text-sm font-semibold text-slate-700">
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-12 text-center text-slate-400 font-bold">
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

                              {/* Acquisition Source */}
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border shadow-2xs ${getSourceBadgeStyle(r.source)}`}>
                                  <Share2 size={10} className="shrink-0" />
                                  {normalizeSource(r.source)}
                                </span>
                              </td>

                              {/* Payment & Date */}
                              <td className="p-4">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="font-bold text-[#004B57] text-xs font-mono">
                                    ₹{calculateFee(r).toLocaleString("en-IN")}
                                  </span>
                                  {r.is_verified ? (
                                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-250 px-1.5 py-0.5 rounded-full">
                                      PAID
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-250 px-1.5 py-0.5 rounded-full">
                                      PENDING
                                    </span>
                                  )}
                                </div>
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

                              {/* Feedback Status */}
                              <td className="p-4 text-center">
                                {r.feedback_id ? (
                                  <button
                                    type="button"
                                    onClick={() => setActiveFeedbackModal(r)}
                                    className="inline-flex flex-col items-center gap-0.5 px-2.5 py-1.5 bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-200 rounded-xl transition-all cursor-pointer group shadow-2xs"
                                    title="Click to view detailed ratings and comments"
                                  >
                                    <div className="flex items-center gap-1 text-[11px] font-black">
                                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                      <span>
                                        {(
                                          (Number(r.q1_event_quality || 0) +
                                            Number(r.q2_session_relevance || 0) +
                                            Number(r.q3_speaker_effectiveness || 0) +
                                            Number(r.q4_hands_on_workshop || 0) +
                                            Number(r.q5_organization_venue || 0)) /
                                          5
                                        ).toFixed(1)}{" "}
                                        ★
                                      </span>
                                    </div>
                                    <span className="text-[9px] font-semibold text-emerald-700 flex items-center gap-1">
                                      <span>Submitted</span>
                                      {r.feedback_comments && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Delegate provided written remarks" />
                                      )}
                                    </span>
                                  </button>
                                ) : (
                                  <span className="inline-block text-[10px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                                    Pending
                                  </span>
                                )}
                              </td>

                              {/* Quick Actions (Feedback View, WhatsApp, Resend Email, Screenshot, Delete) */}
                              <td className="p-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {/* View Feedback Modal */}
                                  {r.feedback_id && (
                                    <button
                                      type="button"
                                      onClick={() => setActiveFeedbackModal(r)}
                                      className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg transition-all cursor-pointer"
                                      title="Inspect feedback ratings and comments"
                                    >
                                      <Star size={14} className="fill-amber-400 text-amber-500" />
                                    </button>
                                  )}

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

      {/* Individual Delegate Feedback Inspection Modal */}
      {activeFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 border border-slate-200">
            <button
              onClick={() => setActiveFeedbackModal(null)}
              className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5 pr-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-200 shrink-0">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A896] block">
                  ARISE 2026 CME Feedback
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {activeFeedbackModal.full_name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {activeFeedbackModal.registration_code} • {activeFeedbackModal.institution || activeFeedbackModal.category}
                </p>
              </div>
            </div>

            {/* Overall Score Banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">Overall Score</span>
                <div className="text-2xl font-black text-amber-950 font-display mt-0.5">
                  {(
                    (Number(activeFeedbackModal.q1_event_quality || 0) +
                      Number(activeFeedbackModal.q2_session_relevance || 0) +
                      Number(activeFeedbackModal.q3_speaker_effectiveness || 0) +
                      Number(activeFeedbackModal.q4_hands_on_workshop || 0) +
                      Number(activeFeedbackModal.q5_organization_venue || 0)) /
                    5
                  ).toFixed(1)}{" "}
                  / 5.0 ★
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-slate-400 block">Submitted At</span>
                <span className="text-xs font-mono text-slate-700">
                  {activeFeedbackModal.feedback_submitted_at
                    ? new Date(activeFeedbackModal.feedback_submitted_at).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recorded"}
                </span>
              </div>
            </div>

            {/* 5 Questions Breakdown */}
            <div className="space-y-2.5 mb-5">
              {[
                { label: "1. Overall Event Quality & Relevance", score: activeFeedbackModal.q1_event_quality },
                { label: "2. Scientific Sessions & Clinical Applicability", score: activeFeedbackModal.q2_session_relevance },
                { label: "3. Speaker Expertise & Communication", score: activeFeedbackModal.q3_speaker_effectiveness },
                { label: "4. Hands-on Workshop & Equipment", score: activeFeedbackModal.q4_hands_on_workshop },
                { label: "5. Venue, Hospitality & Organization", score: activeFeedbackModal.q5_organization_venue },
              ].map((q, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-150 text-xs">
                  <span className="font-semibold text-slate-700 truncate max-w-[280px]">{q.label}</span>
                  <div className="flex items-center gap-1 font-bold text-amber-600 shrink-0">
                    <span className="font-mono text-sm">{q.score || "—"}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Written Remarks */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Written Remarks &amp; Suggestions
              </span>
              {activeFeedbackModal.feedback_comments && activeFeedbackModal.feedback_comments.trim() ? (
                <p className="text-xs text-slate-800 italic leading-relaxed whitespace-pre-wrap">
                  &ldquo;{activeFeedbackModal.feedback_comments}&rdquo;
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">No written comments provided by delegate.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Browse All Feedbacks Modal */}
      {showAllFeedbacksModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-200 shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black text-slate-900">
                    All ARISE 2026 Feedback Responses ({stats.feedbackCount})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Average Score: <strong className="text-[#00A896]">{stats.overallAvg} / 5.0 ★</strong> • {stats.feedbackWithComments} reviews with written comments
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAllFeedbacksModal(false)}
                className="p-2 bg-white hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter bar inside modal */}
            <div className="p-4 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={feedbacksSearch}
                  onChange={(e) => setFeedbacksSearch(e.target.value)}
                  placeholder="Search delegate or remarks..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:bg-white focus:border-[#00A896]"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={feedbacksOnlyWithComments}
                    onChange={(e) => setFeedbacksOnlyWithComments(e.target.checked)}
                    className="rounded text-[#00A896] focus:ring-[#00A896]"
                  />
                  <span>Only show with comments ({stats.feedbackWithComments})</span>
                </label>

                <button
                  type="button"
                  onClick={exportFeedbackOnlyCSV}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#00A896] border border-teal-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Download size={12} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Feed list */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {(() => {
                const list = stats.submittedFeedbacks.filter((r) => {
                  const matchSearch =
                    !feedbacksSearch ||
                    `${r.full_name} ${r.registration_code} ${r.institution} ${r.feedback_comments || ""}`
                      .toLowerCase()
                      .includes(feedbacksSearch.toLowerCase());
                  const matchComments = !feedbacksOnlyWithComments || Boolean(r.feedback_comments && r.feedback_comments.trim());
                  return matchSearch && matchComments;
                });

                if (list.length === 0) {
                  return (
                    <div className="py-12 text-center text-slate-400 font-semibold text-xs">
                      No feedback entries match your search criteria.
                    </div>
                  );
                }

                return list.map((item) => {
                  const avg = (
                    (Number(item.q1_event_quality || 0) +
                      Number(item.q2_session_relevance || 0) +
                      Number(item.q3_speaker_effectiveness || 0) +
                      Number(item.q4_hands_on_workshop || 0) +
                      Number(item.q5_organization_venue || 0)) /
                    5
                  ).toFixed(1);

                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-300 transition-colors space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{item.full_name}</span>
                            <span className="font-mono text-[10px] text-[#00A896] bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-bold">
                              {item.registration_code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.institution || item.category} • {item.mobile_number}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-amber-900 text-xs font-black">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>{avg} / 5.0</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.feedback_submitted_at ? new Date(item.feedback_submitted_at).toLocaleDateString() : ""}
                          </span>
                        </div>
                      </div>

                      {/* 5 mini rating chips */}
                      <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600">
                        <span className="bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-lg">
                          Quality: <strong className="text-amber-600">{item.q1_event_quality}★</strong>
                        </span>
                        <span className="bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-lg">
                          Sessions: <strong className="text-amber-600">{item.q2_session_relevance}★</strong>
                        </span>
                        <span className="bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-lg">
                          Speakers: <strong className="text-amber-600">{item.q3_speaker_effectiveness}★</strong>
                        </span>
                        <span className="bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-lg">
                          Workshop: <strong className="text-amber-600">{item.q4_hands_on_workshop}★</strong>
                        </span>
                        <span className="bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-lg">
                          Venue: <strong className="text-amber-600">{item.q5_organization_venue}★</strong>
                        </span>
                      </div>

                      {/* Comment text */}
                      {item.feedback_comments && item.feedback_comments.trim() ? (
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-3 text-xs text-slate-800 italic">
                          &ldquo;{item.feedback_comments}&rdquo;
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No written comments provided.</p>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
