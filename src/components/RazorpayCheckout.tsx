"use client";

import React, { useState } from "react";
import { ShieldCheck, CreditCard, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount?: number; // Amount in Rupees (default: ₹100)
  title?: string; // Optional description/title
  description?: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  eventType?: string; // "ARISE" | "ACTIVE_SALEM" | "TECHNNOVATIONS"
  registrationCode?: string;
  notes?: Record<string, any>;
  onSuccess?: (details: {
    paymentId: string;
    orderId: string;
    signature: string;
  }) => void;
  onFailure?: (error: string) => void;
  buttonText?: string;
  buttonClassName?: string;
}

// Helper to dynamically load Razorpay checkout script if not present
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function RazorpayCheckout({
  amount = 100, // ₹100 by default
  title = "Valli Super Specialty Hospital",
  description = "Registration / Consultation Payment",
  prefillName = "",
  prefillEmail = "",
  prefillPhone = "",
  eventType,
  registrationCode,
  notes,
  onSuccess,
  onFailure,
  buttonText,
  buttonClassName,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentId: string;
    orderId: string;
  } | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setStatusMessage("Opening payment options...");
    setPaymentSuccess(null);

    try {
      // 1. Ensure payment script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Unable to load payment module. Please check your internet connection.");
      }

      // 2. Call backend to create order
      setStatusMessage("Preparing payment...");
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount, // Amount in Rupees
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          eventType,
          registrationCode,
          notes,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment");
      }

      const orderId = orderData.order_id || orderData.orderId;
      const orderAmount = orderData.amount;
      const orderCurrency = orderData.currency || "INR";

      // 3. Configure payment options
      const keyId = orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const options = {
        key: keyId,
        amount: orderAmount,
        currency: orderCurrency,
        name: title,
        description: description,
        order_id: orderId,
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillPhone,
        },
        theme: {
          color: eventType === "ACTIVE_SALEM" ? "#F26522" : "#00A896",
        },
        handler: async function (response: any) {
          setStatusMessage("Verifying payment...");
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderCreationId: orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && (verifyData.success || verifyData.verified || verifyData.isOk)) {
              setPaymentSuccess(true);
              setStatusMessage("Payment verified successfully!");
              setPaymentDetails({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });

              if (onSuccess) {
                await onSuccess({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                });
              }
            } else {
              throw new Error(verifyData.error || verifyData.message || "Payment verification failed");
            }
          } catch (verifyErr: any) {
            console.error("Verification error:", verifyErr);
            setPaymentSuccess(false);
            const msg = verifyErr.message || "Payment verification failed";
            setStatusMessage(msg);
            if (onFailure) onFailure(msg);
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setStatusMessage("Payment was cancelled.");
            if (onFailure) onFailure("Payment window closed");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", function (response: any) {
        setLoading(false);
        setPaymentSuccess(false);
        const errMsg = response.error?.description || "Payment failed";
        setStatusMessage(`Payment failed: ${errMsg}`);
        if (onFailure) onFailure(errMsg);
      });

      setStatusMessage("Opening payment window...");
      razorpayInstance.open();
    } catch (err: any) {
      console.error("Checkout error:", err);
      setLoading(false);
      setPaymentSuccess(false);
      const errorText = err.message || "Payment initiation failed";
      setStatusMessage(errorText);
      if (onFailure) onFailure(errorText);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className={
          buttonClassName ||
          "w-full bg-[#00A896] hover:bg-[#008B7A] text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-teal/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{statusMessage || "Processing..."}</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>{buttonText || `Pay ₹${amount.toLocaleString("en-IN")} & Confirm Registration`}</span>
          </>
        )}
      </button>

      {/* Payment methods support note */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>UPI (GPay, PhonePe, Paytm) • Cards • Net Banking</span>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`w-full p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 text-left transition-all ${
            paymentSuccess === true
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : paymentSuccess === false
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        >
          {paymentSuccess === true ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : paymentSuccess === false ? (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          ) : (
            <Loader2 className="w-4 h-4 text-teal animate-spin flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate">{statusMessage}</p>
            {paymentDetails && (
              <p className="text-[10px] font-mono text-emerald-700 mt-0.5 truncate">
                Payment ID: {paymentDetails.paymentId}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
