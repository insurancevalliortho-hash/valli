"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import { Download, CheckCircle, Sparkles } from "lucide-react";

interface CertificateTemplateProps {
  delegateName: string;
  regNo?: string;
  showPreview?: boolean;
}

export default function CertificateTemplate({ delegateName, regNo, showPreview = false }: CertificateTemplateProps) {
  const [downloading, setDownloading] = useState(false);

  // Ensure "Dr." prefix if appropriate
  const formattedName = delegateName.toLowerCase().startsWith("dr.") || delegateName.toLowerCase().startsWith("dr ")
    ? delegateName
    : `Dr. ${delegateName}`;

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);

      // Native HTML5 Canvas generation for 100% crisp high-res output without html2canvas CSS errors
      const canvas = document.createElement("canvas");
      // High resolution 300 DPI canvas (2000 x 1414 pixels)
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

      // 1. Draw Background Template Image
      ctx.drawImage(img, 0, 0, width, height);

      // 2. Configure Exact Teal Green Typography
      let fontSize = 84;
      if (formattedName.length > 25) fontSize = 60;
      else if (formattedName.length > 20) fontSize = 72;

      ctx.font = `bold ${fontSize}px Georgia, "Times New Roman", serif`;
      ctx.fillStyle = "#0f5947"; // Dark Teal Green matching CERTIFICATE OF PARTICIPATION
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 3. Draw Participant Name at Exact Vertical Position (54.2% of height)
      const yPosition = height * 0.542;
      ctx.fillText(formattedName, width / 2, yPosition);

      // 4. Generate High-Quality PDF
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificate_${delegateName.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("There was an error generating your certificate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-6">
      {/* Light Universal Theme Success Card */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-8 text-center text-slate-800 w-full shadow-xl shadow-emerald-900/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600" />
        
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 border border-emerald-200/60 shadow-inner">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200/50">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Submission Confirmed
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Thank You, {formattedName}!
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Your feedback for <span className="font-semibold text-emerald-800">The Practical Ortho Rheumat Summit 2026</span> has been recorded. Your official participation certificate is ready for instant download.
        </p>
        
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer text-base"
        >
          {downloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download Official Certificate (PDF)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
