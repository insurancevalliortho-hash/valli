"use client";

import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { Download, CheckCircle2, Award, MailCheck, Send } from "lucide-react";

interface CertificateTemplateProps {
  delegateName: string;
  email?: string;
  regNo?: string;
  showPreview?: boolean;
}

export default function CertificateTemplate({ delegateName, email, regNo, showPreview = false }: CertificateTemplateProps) {
  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const hasSentEmail = useRef(false);

  // Ensure "Dr." prefix if appropriate
  const formattedName = delegateName.toLowerCase().startsWith("dr.") || delegateName.toLowerCase().startsWith("dr ")
    ? delegateName
    : `Dr. ${delegateName}`;

  const generatePDFBase64 = async (): Promise<{ pdfBase64: string; pdfObj: jsPDF }> => {
    const canvas = document.createElement("canvas");
    const width = 2000;
    const height = 1414;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get 2D canvas context");
    }

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/certificate-template.png";

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("Failed to load certificate template image"));
    });

    ctx.drawImage(img, 0, 0, width, height);

    let fontSize = 84;
    if (formattedName.length > 25) fontSize = 60;
    else if (formattedName.length > 20) fontSize = 72;

    ctx.font = `bold ${fontSize}px Georgia, "Times New Roman", serif`;
    ctx.fillStyle = "#0f5947";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const yPosition = height * 0.542;
    ctx.fillText(formattedName, width / 2, yPosition);

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const pdfBase64 = pdf.output("datauristring");

    return { pdfBase64, pdfObj: pdf };
  };

  // Automatically dispatch certificate PDF to delegate's email upon loading
  useEffect(() => {
    if (!email || hasSentEmail.current) return;
    hasSentEmail.current = true;

    const dispatchEmail = async () => {
      try {
        setEmailStatus("sending");
        const res = await fetch("/api/certificate/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            delegateName,
            email
          }),
        });

        if (res.ok) {
          setEmailStatus("sent");
        } else {
          setEmailStatus("failed");
        }
      } catch (err) {
        console.error("Auto email dispatch error:", err);
        setEmailStatus("failed");
      }
    };

    dispatchEmail();
  }, [email, delegateName]);

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      const { pdfObj } = await generatePDFBase64();
      pdfObj.save(`Certificate_${delegateName.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("There was an error generating your certificate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-6">
      {/* Apple Niche Minimalist Success Card */}
      <div className="bg-white border border-[#E5E5EA] rounded-3xl p-6 sm:p-8 text-center text-[#1D1D1F] w-full shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-[#004B57]/5 text-[#004B57] mx-auto flex items-center justify-center mb-4 border border-[#004B57]/15">
          <CheckCircle2 className="w-7 h-7 text-[#004B57]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] text-slate-600 text-[11px] font-semibold tracking-tight mb-3 border border-black/[0.06]">
          <Award className="w-3.5 h-3.5 text-[#004B57]" />
          <span>Submission Confirmed</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight mb-2">
          Thank You, {formattedName}!
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed font-normal">
          Your feedback for <span className="font-semibold text-[#1D1D1F]">The Practical Ortho Rheumat Summit 2026</span> has been safely saved. Your official certificate is ready below.
        </p>

        {/* Email Dispatch Status Badge */}
        {email && (
          <div className="mb-8 max-w-sm mx-auto">
            {emailStatus === "sending" && (
              <div className="inline-flex items-center gap-2 bg-[#004B57]/5 text-[#004B57] border border-[#004B57]/15 px-4 py-2 rounded-xl text-xs font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-[#004B57] border-t-transparent rounded-full animate-spin" />
                <span>Sending certificate PDF to {email}...</span>
              </div>
            )}
            {emailStatus === "sent" && (
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">
                <MailCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificate PDF sent to <strong>{email}</strong></span>
              </div>
            )}
            {emailStatus === "failed" && (
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-xl text-xs font-medium">
                <Send className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Download your PDF below (Email delivery pending)</span>
              </div>
            )}
          </div>
        )}

        <motion.button
          onClick={handleDownloadPDF}
          disabled={downloading}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#004B57] hover:bg-[#003842] text-white font-semibold px-8 py-3.5 rounded-2xl shadow-sm transition-all duration-200 disabled:opacity-50 cursor-pointer text-sm"
        >
          {downloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Official Certificate (PDF)</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
