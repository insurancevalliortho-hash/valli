"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RazorpayCheckout from "../../components/RazorpayCheckout";
import { ShieldCheck, IndianRupee, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RazorpayDemoPage() {
  const [customAmount, setCustomAmount] = useState<number>(100);
  const [name, setName] = useState("Dr. John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [paymentLog, setPaymentLog] = useState<{
    paymentId: string;
    orderId: string;
    signature: string;
    timestamp: string;
  } | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-800 font-body pt-28 pb-20 px-4 sm:px-6 text-left">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Back link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-teal font-semibold text-xs transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>

          {/* Heading */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E0F2F1] text-teal flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-[#004B57] uppercase tracking-tight">
                  Razorpay Checkout Integration
                </h1>
                <p className="text-xs text-slate-500 font-semibold">
                  Test backend order creation, frontend modal, and signature verification.
                </p>
              </div>
            </div>

            {/* Test Form Controls */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Payment Details
              </h2>

              {/* Quick Amount Selectors */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCustomAmount(amt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      customAmount === amt
                        ? "bg-[#004B57] text-white border-[#004B57] shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-teal"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Amount input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-teal" /> Amount (INR)
                </label>
                <input
                  type="number"
                  min={1}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-teal"
                />
              </div>

              {/* Prefill Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-teal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-teal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-teal"
                  />
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="pt-4 border-t border-slate-100">
              <RazorpayCheckout
                amount={customAmount}
                title="Valli Hospital - Payment Demo"
                description={`Test payment of ₹${customAmount}`}
                prefillName={name}
                prefillEmail={email}
                prefillPhone={phone}
                onSuccess={(details) => {
                  setPaymentLog({
                    ...details,
                    timestamp: new Date().toLocaleString(),
                  });
                }}
                onFailure={(err) => {
                  console.error("Demo checkout failed:", err);
                }}
              />
            </div>
          </div>

          {/* Verified Receipt Log */}
          {paymentLog && (
            <div className="bg-emerald-900 text-white rounded-[2rem] p-8 shadow-2xl space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                  Payment Verified Successfully!
                </h3>
              </div>

              <div className="bg-emerald-950/80 border border-emerald-700/50 rounded-2xl p-5 space-y-2 font-mono text-xs text-emerald-200">
                <p>
                  <span className="text-emerald-400 font-bold">Payment ID:</span> {paymentLog.paymentId}
                </p>
                <p>
                  <span className="text-emerald-400 font-bold">Order ID:</span> {paymentLog.orderId}
                </p>
                <p className="truncate">
                  <span className="text-emerald-400 font-bold">HMAC Signature:</span> {paymentLog.signature}
                </p>
                <p>
                  <span className="text-emerald-400 font-bold">Verified At:</span> {paymentLog.timestamp}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
