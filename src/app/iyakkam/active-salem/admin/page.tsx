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
  Shirt
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

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

export default function ActiveSalemAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState<ActiveSalemRegistration[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  // Load password from session storage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("active_salem_admin_pwd");
    if (savedPassword) {
      setPassword(savedPassword);
      handleLogin(savedPassword);
    }
  }, []);

  const handleLogin = async (pwdToTest?: string) => {
    const targetPassword = pwdToTest || password;
    if (!targetPassword) return;

    setIsLoading(true);
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

    return { total, verified, pending, revenue };
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
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

      return matchesSearch && matchesCategory && matchesVerification;
    });
  }, [registrations, searchQuery, categoryFilter, verificationFilter]);

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
      "Created At"
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
      r.source || "Website",
      `'${r.transaction_id}`,
      r.is_verified ? "Verified" : "Pending",
      new Date(r.created_at).toLocaleString()
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `active_salem_registrations_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots text-left">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-6 flex justify-between items-center">
            <Link
              href="/iyakkam/active-salem"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#00A896] font-semibold text-xs transition-colors group uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Active Salem landing
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <LogOut size={14} /> Log Out
              </button>
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
                  Active Salem Admin Portal
                </h1>
                <p className="text-xs text-slate-400 font-semibold">
                  Authentication gateway required to access marathon database.
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
              {/* Stats Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { label: "Total Registrations", value: stats.total, sub: "All time marathon signups", icon: <ClipboardList className="w-5 h-5 text-slate-500" />, color: "border-slate-200" },
                  { label: "Verified Runners", value: stats.verified, sub: "Receipt checked successfully", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, color: "border-emerald-250 bg-emerald-50/10" },
                  { label: "Pending Verification", value: stats.pending, sub: "Awaiting bank check", icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, color: "border-amber-250 bg-amber-50/10" },
                  { label: "Total Revenue Generated", value: `₹${stats.revenue.toLocaleString("en-IN")}`, sub: "Sum of verified ticket sales (5KM ₹249 / 10KM ₹299)", icon: <IndianRupee className="w-5 h-5 text-[#FF8C00]" />, color: "border-orange/20 bg-orange/5" }
                ].map((s, idx) => (
                  <div key={idx} className={`bg-white border rounded-[1.75rem] p-6 shadow-sm flex items-start gap-4 justify-between ${s.color}`}>
                    <div className="space-y-2">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</span>
                      <span className="font-display text-2xl font-black text-slate-800 tracking-tight block">{s.value}</span>
                      <span className="block text-[9px] text-slate-500 font-semibold leading-none">{s.sub}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/50 shadow-inner flex items-center justify-center">
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters / Actions Toolbar */}
              <div className="bg-white border border-slate-200 rounded-[1.75rem] p-5 flex flex-wrap gap-4 items-center justify-between shadow-sm">
                <div className="flex flex-wrap gap-4 flex-1 min-w-[280px]">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, code, transaction ID, city..."
                      className="w-full bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#00A896] focus:ring-4 focus:ring-teal/10"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="5km">5KM Run (₹249)</option>
                    <option value="10km">10KM Timed Run (₹299)</option>
                  </select>

                  {/* Verification status filter */}
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] hover:border-slate-350 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="verified">Verified Only</option>
                    <option value="pending">Pending Only</option>
                  </select>
                </div>

                {/* CSV download button */}
                <button
                  type="button"
                  onClick={exportToCSV}
                  disabled={filteredRegistrations.length === 0}
                  className="bg-[#00A896] hover:bg-[#008B7A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Download size={14} /> Export CSV Excel
                </button>
              </div>

              {/* Main Registrations List Table */}
              <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[9px] sm:text-xs">
                        <th className="p-5">Receipt Code</th>
                        <th className="p-5">Runner Info</th>
                        <th className="p-5">Category & Shirt</th>
                        <th className="p-5">Age / Gender / Emg</th>
                        <th className="p-5">Reference UPI & Date</th>
                        <th className="p-5 text-center">Verification status</th>
                        <th className="p-5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-xs sm:text-sm font-semibold text-slate-700">
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-10 text-center text-slate-400 font-bold">
                            No matching registrations found in active salem database.
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                            {/* Receipt Code */}
                            <td className="p-5">
                              <span className="font-mono font-bold text-[#FF8C00] tracking-wider block">
                                {r.registration_code}
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mt-1 tracking-wider">
                                ID: #{r.id}
                              </span>
                            </td>

                            {/* Runner Info */}
                            <td className="p-5">
                              <span className="block text-slate-800 font-bold uppercase">{r.full_name}</span>
                              <span className="flex items-center gap-1.5 text-[10px] text-slate-550 mt-1 leading-none font-medium">
                                <Mail className="w-3 h-3 text-slate-400" /> {r.email_id}
                              </span>
                              <span className="flex items-center gap-1.5 text-[10px] text-slate-550 mt-1 leading-none font-medium">
                                <Phone className="w-3 h-3 text-slate-400" /> {r.mobile_number}
                              </span>
                              {r.city && (
                                <span className="inline-flex items-center gap-1 text-[9px] text-[#00A896] bg-[#00A896]/5 border border-[#00A896]/10 px-2 py-0.5 rounded mt-1 font-bold">
                                  <MapPin className="w-2.5 h-2.5" /> {r.city}
                                </span>
                              )}
                            </td>

                            {/* Category & Shirt */}
                            <td className="p-5">
                              <span className="block font-bold text-[#004B57]">{r.category}</span>
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full mt-1.5 bg-amber-100 text-amber-800 border border-amber-200">
                                <Shirt className="w-2.5 h-2.5" /> Size: {r.tshirt_size}
                              </span>
                            </td>

                            {/* Age / Gender / Emergency */}
                            <td className="p-5">
                              <span className="block text-slate-800 leading-snug">{r.gender}, {r.age} yrs</span>
                              {r.emergency_contact && (
                                <span className="block text-[10px] text-slate-400 leading-snug mt-0.5">
                                  Emg: {r.emergency_contact}
                                </span>
                              )}
                            </td>

                            {/* Reference UPI ID & Date */}
                            <td className="p-5">
                              <span className="font-mono text-slate-850 bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs tracking-widest inline-block select-all">
                                {r.transaction_id}
                              </span>
                              <span className="block text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                                {new Date(r.created_at).toLocaleDateString()} at {new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>

                            {/* Verification status */}
                            <td className="p-5 text-center">
                              <button
                                type="button"
                                onClick={() => toggleVerification(r.id, r.is_verified)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                  r.is_verified 
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100" 
                                    : "bg-amber-50 text-amber-600 border border-amber-250 hover:bg-amber-100 animate-pulse"
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

                            {/* Delete */}
                            <td className="p-5 text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete(r.id, r.registration_code)}
                                className="p-2 border border-red-200 hover:border-red-500 hover:bg-red-50 text-red-500 rounded-lg transition-all cursor-pointer"
                                title="Delete database record"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
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
