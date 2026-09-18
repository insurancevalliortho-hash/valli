import { NextResponse } from "next/server";
import { saveAriseRegistration, getPgPool } from "../../../../lib/db";
import { sendAriseRegistrationEmail } from "../../../../lib/email";

export async function GET() {
  try {
    const pool = getPgPool();
    const res = await pool.query(
      "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM arise_registrations"
    );
    const nextId = res.rows[0]?.next_id || 1;
    const orderedCode = `ARISE26-${String(nextId).padStart(4, "0")}`;
    return NextResponse.json({ success: true, nextRegistrationCode: orderedCode, nextId });
  } catch (err: any) {
    return NextResponse.json({ success: true, nextRegistrationCode: "ARISE26-0001", nextId: 1 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const {
      registrationCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      includeWorkshop,
      institution,
      department,
      city,
      source,
      transactionId,
      paymentScreenshot,
      designation,
      qualification,
      bonafideCertificate,
      foodPreference,
      iapCreditPoints,
      iapMembershipNumber
    } = body;

    if (
      !fullName ||
      !emailId ||
      !mobileNumber ||
      !category ||
      !institution ||
      !city ||
      !transactionId ||
      !paymentScreenshot ||
      !designation ||
      !qualification ||
      !foodPreference
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Assign sequential ordered registration code if single registration
    let finalCode = registrationCode;
    if (!finalCode || (finalCode.startsWith("ARISE26-") && !finalCode.includes("BULK") && !finalCode.includes("LEAD") && finalCode.length >= 11)) {
      try {
        const pool = getPgPool();
        const seqRes = await pool.query(
          "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM arise_registrations"
        );
        const nextId = seqRes.rows[0]?.next_id || 1;
        finalCode = `ARISE26-${String(nextId).padStart(4, "0")}`;
      } catch {
        if (!finalCode) {
          finalCode = "ARISE26-0001";
        }
      }
    }

    // Insert into Neon Database
    const isOnlinePayment = paymentScreenshot === "RAZORPAY_ONLINE_PAYMENT" || String(transactionId).startsWith("pay_");
    await saveAriseRegistration({
      registrationCode: finalCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      includeWorkshop: !!includeWorkshop,
      institution,
      department: department || "",
      city: city || "",
      source: source || "Other",
      transactionId,
      paymentScreenshot,
      designation,
      qualification,
      bonafideCertificate,
      foodPreference,
      iapCreditPoints: !!iapCreditPoints,
      iapMembershipNumber,
      isVerified: Boolean(body.isVerified || isOnlinePayment),
    });

    // Dispatch confirmation email
    try {
      await sendAriseRegistrationEmail({
        registrationCode: finalCode,
        fullName,
        emailId,
        mobileNumber,
        category,
        includeWorkshop: !!includeWorkshop,
        institution,
        department: department || "",
        city: city || "",
        transactionId,
        designation,
        qualification,
        foodPreference,
        iapCreditPoints: !!iapCreditPoints,
        iapMembershipNumber,
        bonafideCertificate
      });
    } catch (emailErr) {
      console.error("API error in dispatching ARISE registration email:", emailErr);
    }

    return NextResponse.json({ success: true, registrationCode: finalCode });
  } catch (error: any) {
    console.error("API Error in ARISE registration:", error);
    
    // Handle unique constraint violations
    if (error.message && error.message.toLowerCase().includes("unique constraint")) {
      if (error.message.toLowerCase().includes("transaction_id")) {
        return NextResponse.json(
          { success: false, error: "This UPI Reference ID has already been registered." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: "This registration code or transaction ID has already been used." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
