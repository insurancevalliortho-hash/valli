import { NextResponse } from "next/server";
import { saveActiveSalemRegistration, getPgPool } from "../../../../lib/db";

export async function GET() {
  try {
    const pool = getPgPool();
    const res = await pool.query(
      "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations"
    );
    const nextId = res.rows[0]?.next_id || 1;
    const orderedCode = `SALEM26-${String(nextId).padStart(4, "0")}`;
    return NextResponse.json({ success: true, nextRegistrationCode: orderedCode, nextId });
  } catch (err: any) {
    return NextResponse.json({ success: true, nextRegistrationCode: "SALEM26-0001", nextId: 1 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      registrationCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      tshirtSize,
      gender,
      age,
      emergencyContact,
      city,
      source,
      transactionId,
      paymentScreenshot,
    } = body;

    if (
      !fullName ||
      !emailId ||
      !mobileNumber ||
      !category ||
      !tshirtSize ||
      !gender ||
      !age ||
      !transactionId ||
      !paymentScreenshot
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required runner fields" },
        { status: 400 }
      );
    }

    // Assign sequential ordered registration code
    let finalCode = registrationCode;
    try {
      const pool = getPgPool();
      const seqRes = await pool.query(
        "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations"
      );
      const nextId = seqRes.rows[0]?.next_id || 1;
      finalCode = `SALEM26-${String(nextId).padStart(4, "0")}`;
    } catch {
      if (!finalCode) {
        finalCode = "SALEM26-0001";
      }
    }

    // Save into Neon database
    const isOnlinePayment = paymentScreenshot === "RAZORPAY_ONLINE_PAYMENT" || String(transactionId).startsWith("pay_");
    await saveActiveSalemRegistration({
      registrationCode: finalCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      tshirtSize,
      gender,
      age: Number(age),
      emergencyContact: emergencyContact || "",
      city: city || "",
      source: source || "Other",
      transactionId,
      paymentScreenshot,
      isVerified: Boolean(body.isVerified || isOnlinePayment),
    });

    return NextResponse.json({ success: true, registrationCode: finalCode });
  } catch (error: any) {
    console.error("API error in Active Salem registration:", error);

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
