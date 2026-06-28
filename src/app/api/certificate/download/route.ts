import { NextResponse } from "next/server";
import { getCertificateFile, sql } from "@/lib/db";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return new NextResponse("Missing delegate ID parameter", { status: 400 });
    }

    const delegateId = Number(idParam);

    // 1. Check Neon DB certificate storage
    const stored = await getCertificateFile(delegateId);
    let pdfBuffer: Buffer | null = null;
    let delegateName = "Delegate";

    if (stored && stored.pdf_base64) {
      const cleanBase64 = stored.pdf_base64.includes(";base64,")
        ? stored.pdf_base64.split(";base64,")[1]
        : stored.pdf_base64.replace(/^data:application\/pdf;.*base64,/, "");
      pdfBuffer = Buffer.from(cleanBase64, "base64");
      delegateName = stored.email.split("@")[0];
    } else {
      // 2. Fetch delegate name from database if not yet uploaded
      const delRes = await sql`SELECT name FROM delegates WHERE delegate_id = ${delegateId} LIMIT 1`;
      if (delRes.length > 0) {
        delegateName = delRes[0].name;
      }

      const formattedName = delegateName.toLowerCase().startsWith("dr.") || delegateName.toLowerCase().startsWith("dr ")
        ? delegateName
        : `Dr. ${delegateName}`;

      // Generate server-side PDF using jsPDF
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const publicPath = path.join(process.cwd(), "public", "certificate-template.png");
      
      if (fs.existsSync(publicPath)) {
        const imgData = fs.readFileSync(publicPath);
        const base64Img = `data:image/png;base64,${imgData.toString("base64")}`;
        pdf.addImage(base64Img, "PNG", 0, 0, 297, 210);
      }

      pdf.setFont("Georgia", "bold");
      let fontSize = 24;
      if (formattedName.length > 25) fontSize = 18;
      else if (formattedName.length > 20) fontSize = 20;

      pdf.setFontSize(fontSize);
      pdf.setTextColor(15, 89, 71); // #0f5947 Dark Teal
      pdf.text(formattedName, 148.5, 114, { align: "center" });

      const arrayBuf = pdf.output("arraybuffer");
      pdfBuffer = Buffer.from(arrayBuf);
    }

    const safeFilename = `Certificate_${delegateName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Download certificate error:", error);
    return new NextResponse("Error generating certificate PDF stream", { status: 500 });
  }
}
