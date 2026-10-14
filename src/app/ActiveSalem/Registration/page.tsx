"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Info,
  Lock
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const easeSmooth = [0.16, 1, 0.3, 1] as const;

export default function ActiveSalemRegistrationPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFCFC] text-slate-900 pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-teal-100/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Top Breadcrumb Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/ActiveSalem"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F26522] font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={14} /> Back to Overview
            </Link>
            <span className="text-[11px] font-mono text-slate-400 font-bold">
              ACTIVE SALEM 4.0 • 11 OCT 2026
            </span>
          </div>

          {/* ─── REGISTRATION CLOSED SCREEN ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="bg-white border border-slate-200/90 rounded-3xl shadow-[0_12px_48px_rgba(0,0,0,0.06)] p-7 sm:p-12 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center mx-auto text-rose-500 shadow-inner">
              <Lock className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full inline-block">
                Registration Closed • Date Has Ended
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Active Salem 4.0 Registration is Closed
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Thank you for the tremendous enthusiasm! The registration deadline for <strong>Active Salem 4.0 (5K & 10K Marathon)</strong> has concluded and registrations are now officially closed.
              </p>
            </div>

            {/* Event Details Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 max-w-md mx-auto text-left space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Event Information
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  Active Salem 4.0
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-[#F26522] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Race Day:</strong>
                    <span className="text-slate-600">Sunday, 11 October 2026 • 5:00 AM Flag-off</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Starting & Finishing Venue:</strong>
                    <span className="text-slate-600">Valli Super Speciality Hospital, Meyyanur Main Road, Salem</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Already Registered?</strong>
                    <span className="text-slate-600">
                      Registered runners will receive bib distribution timing, expo instructions, and race-day guidelines via email and SMS.
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-3 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Helpline: +91 94425 24000</span>
                <span>events@vallicountry.com</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/ActiveSalem"
                className="px-8 py-3.5 bg-[#F26522] hover:bg-[#d95315] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Back to Active Salem Overview
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
