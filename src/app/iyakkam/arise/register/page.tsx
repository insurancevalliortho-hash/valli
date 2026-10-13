"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Stethoscope,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AriseRegistrationForm from "../../../../components/iyakkam/AriseRegistrationForm";
import { motion } from "framer-motion";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

function RegisterContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") || searchParams.get("type");
  const source = searchParams.get("source");

  // If a role is explicitly provided in query params (?role=student or ?role=doctor)
  if (roleParam === "student") {
    return <AriseRegistrationForm role="student" basePath="/iyakkam/arise/register" />;
  }
  if (roleParam === "doctor") {
    return <AriseRegistrationForm role="doctor" basePath="/iyakkam/arise/register" />;
  }

  // Preserve any source parameter for downstream links
  const studentHref = `/iyakkam/arise/register/student${source ? `?source=${encodeURIComponent(source)}` : ""}`;
  const doctorHref = `/iyakkam/arise/register/doctor${source ? `?source=${encodeURIComponent(source)}` : ""}`;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAFAF9] text-slate-800 font-body selection:bg-orange selection:text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden grid-bg-dots text-left">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/iyakkam/arise"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#00A896] font-semibold text-xs transition-colors group mb-3 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to ARISE 2026 Home
            </Link>

            <div className="text-center sm:text-left max-w-2xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00A896] bg-[#00A896]/10 px-3.5 py-1 rounded-full inline-block mb-2.5 border border-[#00A896]/20">
                National CME Conference Registration
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-black text-[#004B57] tracking-tight uppercase">
                Choose Registration Category
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Please select whether you are registering as a <strong className="text-[#004B57]">Student</strong> or a <strong className="text-[#004B57]">Doctor / Consultant</strong> to view the respective registration categories and fees.
              </p>
            </div>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Student Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="bg-white border-2 border-amber-300/80 hover:border-amber-500 rounded-[2.5rem] p-7 sm:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                    Student Delegates
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] uppercase tracking-wide">
                  Student
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                  For Undergraduates, Postgraduates, BPT, MPT & MBBS students.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={studentHref}
                  className="w-full bg-[#004B57] hover:bg-[#00363F] text-white py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
                >
                  Register as Student <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Doctor Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: easeSmooth }}
              className="bg-white border-2 border-[#00A896]/30 hover:border-[#00A896] rounded-[2.5rem] p-7 sm:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F0FAF9] border border-[#00A896]/20 flex items-center justify-center text-[#00A896] shadow-sm group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-teal/10 text-[#004B57] px-3 py-1 rounded-full border border-teal/20">
                    Doctors & Professionals
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#004B57] uppercase tracking-wide">
                  Doctor
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                  For Consultants, Surgeons, Physicians, Physiotherapists & Medical Practitioners.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={doctorHref}
                  className="w-full bg-[#00A896] hover:bg-[#008B7A] text-white py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
                >
                  Register as Doctor <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quick Note */}
          <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00A896]" />
            <span>Secure registration backed by Razorpay online payments and instant e-ticket generation.</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function AriseRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
          <div className="w-8 h-8 border-4 border-[#00A896] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
