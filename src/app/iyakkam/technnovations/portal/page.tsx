"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  LogOut,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Building,
  Phone,
  Mail,
  User,
  Users,
  FileText,
  Download,
  Info,
  ExternalLink
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import SmoothScroll from "../../../../components/SmoothScroll";

interface TeamData {
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
  is_verified: boolean;
  ppt_filename: string | null;
  ppt_uploaded_at: string | null;
}

export default function LeaderPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  // File Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Persistence check on mount
  useEffect(() => {
    const savedCode = sessionStorage.getItem("tech_leader_code");
    const savedIdent = sessionStorage.getItem("tech_leader_ident");
    if (savedCode && savedIdent) {
      verifyAndFetch(savedCode, savedIdent);
    }
  }, []);

  const verifyAndFetch = async (code: string, ident: string) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/technnovations/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationCode: code, emailOrPhone: ident }),
      });

      const result = await response.json();

      if (response.ok) {
        setTeamData(result.data);
        setIsAuthenticated(true);
        sessionStorage.setItem("tech_leader_code", code);
        sessionStorage.setItem("tech_leader_ident", ident);
        setRegistrationCode(code);
        setEmailOrPhone(ident);
      } else {
        setLoginError(result.error || "Authentication failed.");
        sessionStorage.removeItem("tech_leader_code");
        sessionStorage.removeItem("tech_leader_ident");
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
    if (!registrationCode.trim() || !emailOrPhone.trim()) {
      setLoginError("Please enter both fields.");
      return;
    }
    verifyAndFetch(registrationCode, emailOrPhone);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tech_leader_code");
    sessionStorage.removeItem("tech_leader_ident");
    setIsAuthenticated(false);
    setTeamData(null);
    setRegistrationCode("");
    setEmailOrPhone("");
  };

  // Convert and upload presentation PPT file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    // Limit size to 5MB to optimize base64 database storage
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit. Please compress your presentation.");
      setIsUploading(false);
      return;
    }

    // Check extension
    const validExtensions = [".ppt", ".pptx", ".pdf"];
    const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      setUploadError("Invalid format. Please upload a .ppt, .pptx, or .pdf presentation.");
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;

      try {
        const response = await fetch("/api/technnovations/portal", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationCode,
            emailOrPhone,
            pptFile: base64Data,
            pptFilename: file.name,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setUploadSuccess(true);
          // Update client-side local team state
          if (teamData) {
            setTeamData({
              ...teamData,
              ppt_filename: result.pptFilename,
              ppt_uploaded_at: result.pptUploadedAt,
            });
          }
        } else {
          setUploadError(result.error || "Failed to upload file.");
        }
      } catch (err) {
        console.error(err);
        setUploadError("A connection error occurred during file upload.");
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setUploadError("Failed to read presentation file.");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // Safe parse co-members
  const coMembers: Array<{ name: string; phone: string }> = useMemo(() => {
    if (!teamData?.co_members) return [];
    try {
      const parsed = typeof teamData.co_members === "string" ? JSON.parse(teamData.co_members) : teamData.co_members;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [teamData?.co_members]);

  return (
    <SmoothScroll>
      <Navbar />

      <div className="min-h-screen bg-slate-50/50 text-[#1A1A2E] font-body pt-32 pb-28 px-4 sm:px-6 md:px-8 relative overflow-hidden grid-bg-dots">
        {/* Glow Backdrops */}
        <div className="absolute top-[-5%] left-[10%] w-[450px] h-[450px] bg-teal/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[550px] h-[550px] bg-orange/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          {/* Header Back button */}
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
                className="btn-primary btn-outline-navy flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-xs"
                style={{ padding: "8px 16px", borderRadius: 12 }}
              >
                <LogOut size={13} /> Log Out
              </button>
            )}
          </div>

          {/* Secure Login Portal Card */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-2xl p-8 space-y-6 mt-12">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-teal-mist text-teal rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-teal/10">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="font-display text-2xl font-black uppercase text-[#004B57] tracking-tight">
                  Leader Portal Login
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Access Team Console &amp; PPT Submission
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Registration Code
                  </label>
                  <input
                    type="text"
                    value={registrationCode}
                    onChange={(e) => setRegistrationCode(e.target.value.toUpperCase())}
                    placeholder="e.g. TECH26-1234"
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Leader Email or Phone
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="e.g. lead@college.edu or 9876543210"
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-semibold text-[#1A1A2E] focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10"
                  />
                  {loginError && <p className="text-[10px] text-red-500 font-bold mt-1">{loginError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary btn-teal w-full justify-center mt-2"
                  style={{ padding: "12px 24px", fontSize: 13, borderRadius: 12 }}
                >
                  {isLoading ? "Authenticating..." : "Unlock Dashboard"}
                </button>
              </form>
            </div>
          ) : (
            // Authenticated Leader Portal View
            teamData && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* Greeting Card Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                  <div className="space-y-1 text-left">
                    <span className="eyebrow tracking-[0.25em] text-[10px]">Leader submission portal</span>
                    <h1 className="font-display text-4xl font-black text-[#004B57] uppercase tracking-tight leading-none">
                      TEAM CONSOLE
                    </h1>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
                      Manage project PPT &amp; Registration details
                    </p>
                  </div>
                </div>

                {/* Verification alerts */}
                {teamData.is_verified ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-emerald-800">Registration Verified &amp; Active</h4>
                      <p className="text-xs text-emerald-600 font-semibold leading-relaxed">
                        Valli Orthopaedic &amp; Sports Hospital has successfully verified your payment reference. Your presentation is locked in for review.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-amber-800">Payment Verification Pending</h4>
                      <p className="text-xs text-amber-600 font-semibold leading-relaxed">
                        Your UPI reference ID is currently undergoing review. Once verified, your PPT upload will be marked as finalized.
                      </p>
                    </div>
                  </div>
                )}

                {/* Dashboard Grid split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Card 1: Team & Academic Profile details */}
                  <div className="bg-white border border-slate-200/80 p-8 rounded-[2.25rem] shadow-sm flex flex-col justify-between">
                    <div className="space-y-6 text-left">
                      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <h3 className="font-display font-black text-slate-800 uppercase text-sm tracking-wide">
                          Registration Details
                        </h3>
                        <span className="font-mono text-xs font-bold text-teal">{teamData.registration_code}</span>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Team Name</span>
                          <span className="text-sm font-bold text-slate-700">{teamData.team_name}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Team Leader</span>
                          <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                            <User size={13} className="text-slate-450" /> {teamData.team_lead}
                          </span>
                          <span className="text-[10px] text-slate-450 block">{teamData.lead_phone} ● {teamData.email_id}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">College &amp; Department</span>
                          <span className="text-sm font-bold text-slate-700 block leading-tight">
                            {teamData.college_name}
                          </span>
                          <span className="text-[10px] text-slate-450 font-bold block uppercase mt-0.5">
                            {teamData.department} Dept ({teamData.year_of_study} Year)
                          </span>
                        </div>
                        <div className="space-y-1 pt-2">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Co-Members</span>
                          {coMembers.length === 0 ? (
                            <span className="text-xs text-slate-400 font-semibold italic">No co-members registered</span>
                          ) : (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {coMembers.map((m, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-200/50 rounded-xl px-3 py-1 text-[10px] font-bold text-slate-600">
                                  {m.name || "N/A"}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: PPT Submission dropzone & status */}
                  <div className="bg-white border border-slate-200/80 p-8 rounded-[2.25rem] shadow-sm flex flex-col justify-between">
                    <div className="space-y-6 text-left">
                      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <h3 className="font-display font-black text-slate-800 uppercase text-sm tracking-wide">
                          Project Presentation
                        </h3>
                        <span className="text-[9px] font-bold bg-teal-mist text-teal-dark px-2 py-0.5 rounded uppercase">
                          Upload PPT
                        </span>
                      </div>

                      {/* File Uploader UI */}
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-200 hover:border-teal/50 transition-colors rounded-3xl p-6 text-center cursor-pointer relative bg-slate-50/20">
                          <input
                            type="file"
                            accept=".ppt,.pptx,.pdf"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="space-y-2">
                            <div className="w-10 h-10 bg-teal-mist text-teal rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-teal/10">
                              <Upload size={16} className={isUploading ? "animate-bounce" : ""} />
                            </div>
                            <p className="text-xs font-bold text-slate-700">
                              {isUploading ? "Uploading file..." : "Browse or Drop presentation"}
                            </p>
                            <p className="text-[9px] text-slate-400 font-semibold uppercase">
                              PPTX, PPT, or PDF up to 5MB
                            </p>
                          </div>
                        </div>

                        {uploadError && (
                          <p className="text-[10px] text-red-500 font-bold flex items-center gap-1.5">
                            <AlertTriangle size={12} /> {uploadError}
                          </p>
                        )}

                        {uploadSuccess && (
                          <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1.5">
                            <CheckCircle2 size={12} /> File uploaded successfully!
                          </p>
                        )}
                      </div>

                      {/* Upload status view */}
                      {teamData.ppt_filename ? (
                        <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 flex items-center gap-3">
                          <div className="w-9 h-9 bg-teal-mist text-teal rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <span className="block font-bold text-slate-800 text-xs truncate">
                              {teamData.ppt_filename}
                            </span>
                            <span className="block text-[8px] text-slate-400 font-semibold uppercase">
                              Uploaded: {teamData.ppt_uploaded_at ? new Date(teamData.ppt_uploaded_at).toLocaleString() : "Recently"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-slate-200/40 rounded-2xl p-4 text-center text-slate-400 text-xs font-semibold italic">
                          No presentation file uploaded yet.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

    </SmoothScroll>
  );
}
