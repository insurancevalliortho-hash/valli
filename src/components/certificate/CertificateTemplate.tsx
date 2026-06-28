"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { Download, CheckCircle2, Award } from "lucide-react";

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
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed font-normal">
          Your feedback for <span className="font-semibold text-[#1D1D1F]">The Practical Ortho Rheumat Summit 2026</span> has been safely saved. Your official certificate is generated and ready for instant download.
        </p>

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
