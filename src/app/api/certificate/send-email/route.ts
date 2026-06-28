import { NextResponse } from "next/server";
import { sendCertificateEmail } from "@/lib/email";
import { saveCertificateFile } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { delegateId, delegateName, email, pdfBase64 } = await req.json();

    if (!delegateName || !email || !pdfBase64) {
      return NextResponse.json(
        { error: "Missing required parameters for emailing certificate." },
        { status: 400 }
      );
    }

    // 1. Store PDF file in Neon DB storage
    if (delegateId) {
      try {
        await saveCertificateFile(Number(delegateId), String(email), String(pdfBase64));
      } catch (dbErr) {
        console.error("Error saving certificate to Neon DB:", dbErr);
      }
    }

    // 2. Dispatch Email with download link & attachment
    const result = await sendCertificateEmail({
      delegateId: delegateId ? Number(delegateId) : undefined,
      delegateName,
      email,
      pdfBase64
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to dispatch certificate email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Certificate send-email API error:", error);
    return NextResponse.json(
      { error: "Server error sending certificate email." },
      { status: 500 }
    );
  }
}
