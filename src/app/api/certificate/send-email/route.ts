import { NextResponse } from "next/server";
import { sendCertificateEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { delegateName, email, pdfBase64 } = await req.json();

    if (!delegateName || !email || !pdfBase64) {
      return NextResponse.json(
        { error: "Missing required parameters for emailing certificate." },
        { status: 400 }
      );
    }

    const result = await sendCertificateEmail({
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
