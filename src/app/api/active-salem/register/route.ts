import { NextResponse } from "next/server";
import { saveActiveSalemRegistration, getPgPool } from "../../../../lib/db";
import { sendActiveSalemRegistrationEmail } from "../../../../lib/email";
import { normalizeSource } from "../../../../lib/attribution";

const LIMIT_5KM = 650;
const LIMIT_10KM = 450;

export async function GET() {
  try {
    const pool = getPgPool();
    const res = await pool.query(
      "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations"
    );
    const nextId = res.rows[0]?.next_id || 1;
    const orderedCode = `SALEM26-${String(nextId).padStart(4, "0")}`;

    const countRes = await pool.query(
      `SELECT 
         COUNT(*) FILTER (WHERE UPPER(TRIM(category)) = '5KM') AS count_5k,
         COUNT(*) FILTER (WHERE UPPER(TRIM(category)) = '10KM') AS count_10k
       FROM active_salem_registrations`
    );
    const count5k = parseInt(countRes.rows[0]?.count_5k || "0", 10);
    const count10k = parseInt(countRes.rows[0]?.count_10k || "0", 10);

    const isClosed5k = count5k >= LIMIT_5KM;
    const isClosed10k = count10k >= LIMIT_10KM;

    return NextResponse.json({
      success: true,
      nextRegistrationCode: orderedCode,
      nextId,
      counts: {
        "5KM": count5k,
        "10KM": count10k,
      },
      limits: {
        "5KM": LIMIT_5KM,
        "10KM": LIMIT_10KM,
      },
      isClosed: {
        "5KM": isClosed5k,
        "10KM": isClosed10k,
      },
      isFullyClosed: isClosed5k && isClosed10k,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      nextRegistrationCode: "SALEM26-0001",
      nextId: 1,
      counts: { "5KM": 0, "10KM": 0 },
      limits: { "5KM": LIMIT_5KM, "10KM": LIMIT_10KM },
      isClosed: { "5KM": false, "10KM": false },
      isFullyClosed: false,
    });
  }
}

export async function POST(request: Request) {
  let body: any = null;
  try {
    body = await request.json();

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

    const ageNum = Number(age);
    if (
      !fullName ||
      !emailId ||
      !mobileNumber ||
      !category ||
      !tshirtSize ||
      !gender ||
      isNaN(ageNum) ||
      ageNum <= 0 ||
      !transactionId ||
      !paymentScreenshot
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required runner fields" },
        { status: 400 }
      );
    }

    // Server-side check for category limits (5KM: 650, 10KM: 450)
    try {
      const pool = getPgPool();
      const countRes = await pool.query(
        `SELECT 
           COUNT(*) FILTER (WHERE UPPER(TRIM(category)) = '5KM') AS count_5k,
           COUNT(*) FILTER (WHERE UPPER(TRIM(category)) = '10KM') AS count_10k
         FROM active_salem_registrations`
      );
      const count5k = parseInt(countRes.rows[0]?.count_5k || "0", 10);
      const count10k = parseInt(countRes.rows[0]?.count_10k || "0", 10);

      const normCat = String(category).toUpperCase().trim();
      if (normCat === "5KM" && count5k >= LIMIT_5KM) {
        return NextResponse.json(
          { success: false, error: "Registration Closed for 5KM category (Limit of 650 runners reached)" },
          { status: 400 }
        );
      }
      if (normCat === "10KM" && count10k >= LIMIT_10KM) {
        return NextResponse.json(
          { success: false, error: "Registration Closed for 10KM category (Limit of 450 runners reached)" },
          { status: 400 }
        );
      }
    } catch (countErr) {
      console.error("Error verifying category limit:", countErr);
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
    const savedRows = await saveActiveSalemRegistration({
      registrationCode: finalCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      tshirtSize,
      gender,
      age: ageNum,
      emergencyContact: emergencyContact || "",
      city: city || "",
      source: normalizeSource(source),
      transactionId,
      paymentScreenshot,
      isVerified: Boolean(body.isVerified || isOnlinePayment),
    });

    const confirmedCode = savedRows?.[0]?.registration_code || finalCode;

    // Dispatch confirmation email to runner
    try {
      const emailRes = await sendActiveSalemRegistrationEmail({
        registrationCode: confirmedCode,
        fullName,
        emailId,
        mobileNumber,
        category,
        tshirtSize,
        gender,
        age: ageNum,
        emergencyContact,
        city,
        transactionId,
      });
      if (emailRes && !emailRes.success) {
        console.error("Warning: Active Salem confirmation email failed:", emailRes.error);
      }
    } catch (emailErr) {
      console.error("API error in dispatching Active Salem confirmation email:", emailErr);
    }

    return NextResponse.json({ success: true, registrationCode: confirmedCode });
  } catch (error: any) {
    console.error("API error in Active Salem registration:", error);

    const isOnlinePayment = body?.paymentScreenshot === "RAZORPAY_ONLINE_PAYMENT" || String(body?.transactionId).startsWith("pay_");

    if (error.message && error.message.toLowerCase().includes("unique constraint")) {
      if (isOnlinePayment && body?.transactionId) {
        try {
          const pool = getPgPool();
          const existing = await pool.query(
            "SELECT * FROM active_salem_registrations WHERE transaction_id = $1 LIMIT 1;",
            [body.transactionId]
          );
          if (existing.rows.length > 0) {
            const reg = existing.rows[0];
            try {
              await sendActiveSalemRegistrationEmail({
                registrationCode: reg.registration_code,
                fullName: reg.full_name || body.fullName,
                emailId: reg.email_id || body.emailId,
                mobileNumber: reg.mobile_number || body.mobileNumber,
                category: reg.category || body.category,
                tshirtSize: reg.tshirt_size || body.tshirtSize,
                gender: reg.gender || body.gender,
                age: Number(reg.age) || Number(body.age),
                emergencyContact: reg.emergency_contact || body.emergencyContact,
                city: reg.city || body.city,
                transactionId: body.transactionId,
              });
            } catch (mailErr) {
              console.error("Error in fallback Active Salem email dispatch:", mailErr);
            }
            return NextResponse.json({ success: true, registrationCode: existing.rows[0].registration_code });
          }
        } catch (_) { }
      }

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

