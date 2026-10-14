import { NextResponse } from "next/server";
import { saveAriseRegistration, getPgPool } from "../../../../lib/db";
import { sendAriseRegistrationEmail } from "../../../../lib/email";
import { normalizeSource } from "../../../../lib/attribution";

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
  let body: any = null;
  try {
    body = await request.json();
    
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
      iapCreditPoints,
      iapMembershipNumber
    } = body;

    const finalFoodPreference = body.foodPreference || "Vegetarian";

    // Bulk registration with delegates array
    if (Array.isArray(body.delegates) && body.delegates.length > 0) {
      const delegates = body.delegates;
      const { transactionId, paymentScreenshot = "RAZORPAY_ONLINE_PAYMENT", source, category } = body;

      if (!transactionId || !paymentScreenshot) {
        return NextResponse.json(
          { success: false, error: "Payment transaction details are required" },
          { status: 400 }
        );
      }

      for (let i = 0; i < delegates.length; i++) {
        const d = delegates[i];
        if (!d.fullName || !d.emailId || !d.mobileNumber) {
          return NextResponse.json(
            { success: false, error: `Missing required details for Delegate ${i + 1}` },
            { status: 400 }
          );
        }
      }

      const pool = getPgPool();
      let nextId = 1;
      try {
        const seqRes = await pool.query(
          "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM arise_registrations"
        );
        nextId = parseInt(seqRes.rows[0]?.next_id || "1", 10);
      } catch {
        nextId = 1;
      }

      const isOnlinePayment = paymentScreenshot === "RAZORPAY_ONLINE_PAYMENT" || String(transactionId).startsWith("pay_");
      const savedDelegates: Array<{ name: string; code: string; email: string }> = [];

      for (let i = 0; i < delegates.length; i++) {
        const d = delegates[i];
        const delCode = `ARISE26-${String(nextId + i).padStart(4, "0")}`;
        const delTxId = i === 0 ? transactionId : `${transactionId}-${i + 1}`;
        const delCategory = d.category || category || "Bulk Registration 5 Persons (500 each)";
        const delInst = d.institution || body.institution || "College / Institution";
        const delCity = d.city || body.city || "Salem";
        const delDept = d.department || body.department || "";
        const delQual = d.qualification || "Student";
        const delFood = d.foodPreference || "Vegetarian";

        const savedRows = await saveAriseRegistration({
          registrationCode: delCode,
          fullName: d.fullName,
          emailId: d.emailId,
          mobileNumber: d.mobileNumber,
          category: delCategory,
          includeWorkshop: d.includeWorkshop !== undefined ? !!d.includeWorkshop : true,
          institution: delInst,
          department: delDept,
          city: delCity,
          source: normalizeSource(d.source || source),
          transactionId: delTxId,
          paymentScreenshot,
          designation: d.designation || "Student",
          qualification: delQual,
          bonafideCertificate: d.bonafideCertificate || null,
          foodPreference: delFood,
          iapCreditPoints: !!d.iapCreditPoints,
          iapMembershipNumber: d.iapMembershipNumber || "",
          isVerified: Boolean(body.isVerified || isOnlinePayment),
        });

        const confirmedCode = savedRows?.[0]?.registration_code || delCode;
        savedDelegates.push({
          name: d.fullName,
          code: confirmedCode,
          email: d.emailId,
        });

        // Dispatch confirmation email to each delegate
        try {
          await sendAriseRegistrationEmail({
            registrationCode: confirmedCode,
            fullName: d.fullName,
            emailId: d.emailId,
            mobileNumber: d.mobileNumber,
            category: delCategory,
            includeWorkshop: d.includeWorkshop !== undefined ? !!d.includeWorkshop : true,
            institution: delInst,
            department: delDept,
            city: delCity,
            transactionId: delTxId,
            designation: d.designation || "Student",
            qualification: delQual,
            foodPreference: delFood,
            iapCreditPoints: !!d.iapCreditPoints,
            iapMembershipNumber: d.iapMembershipNumber || "",
          });
        } catch (mailErr) {
          console.error(`Warning: Email dispatch failed for bulk delegate ${d.emailId}:`, mailErr);
        }
      }

      return NextResponse.json({
        success: true,
        registrationCode: savedDelegates[0]?.code,
        registrationCodes: savedDelegates,
        delegates: savedDelegates,
      });
    }

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
      !qualification
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
    const savedRows = await saveAriseRegistration({
      registrationCode: finalCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      includeWorkshop: !!includeWorkshop,
      institution,
      department: department || "",
      city: city || "",
      source: normalizeSource(source),
      transactionId,
      paymentScreenshot,
      designation,
      qualification,
      bonafideCertificate,
      foodPreference: finalFoodPreference,
      iapCreditPoints: !!iapCreditPoints,
      iapMembershipNumber,
      isVerified: Boolean(body.isVerified || isOnlinePayment),
    });

    const confirmedCode = savedRows?.[0]?.registration_code || finalCode;

    // Dispatch confirmation email
    try {
      const emailResult = await sendAriseRegistrationEmail({
        registrationCode: confirmedCode,
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
        foodPreference: finalFoodPreference,
        iapCreditPoints: !!iapCreditPoints,
        iapMembershipNumber,
        bonafideCertificate
      });
      if (emailResult && !emailResult.success) {
        console.error("Warning: ARISE confirmation email failed:", emailResult.error);
      }
    } catch (emailErr) {
      console.error("API error in dispatching ARISE registration email:", emailErr);
    }

    return NextResponse.json({ success: true, registrationCode: confirmedCode });
  } catch (error: any) {
    console.error("API Error in ARISE registration:", error);
    
    const isOnlinePayment = body?.paymentScreenshot === "RAZORPAY_ONLINE_PAYMENT" || String(body?.transactionId).startsWith("pay_");

    // Handle unique constraint violations
    if (error.message && error.message.toLowerCase().includes("unique constraint")) {
      if (isOnlinePayment && body?.transactionId) {
        try {
          const pool = getPgPool();
          const existing = await pool.query(
            "SELECT * FROM arise_registrations WHERE transaction_id = $1 LIMIT 1;",
            [body.transactionId]
          );
          if (existing.rows.length > 0) {
            const reg = existing.rows[0];
            try {
              await sendAriseRegistrationEmail({
                registrationCode: reg.registration_code,
                fullName: reg.full_name || body.fullName,
                emailId: reg.email_id || body.emailId,
                mobileNumber: reg.mobile_number || body.mobileNumber,
                category: reg.category || body.category,
                includeWorkshop: reg.include_workshop ?? !!body.includeWorkshop,
                institution: reg.institution || body.institution,
                department: reg.department || body.department || "",
                city: reg.city || body.city || "",
                transactionId: body.transactionId,
                designation: reg.designation || body.designation,
                qualification: reg.qualification || body.qualification,
                foodPreference: reg.food_preference || body.foodPreference,
                iapCreditPoints: reg.iap_credit_points ?? !!body.iapCreditPoints,
                iapMembershipNumber: reg.iap_membership_number || body.iapMembershipNumber,
                bonafideCertificate: reg.bonafide_certificate || body.bonafideCertificate
              });
            } catch (mailErr) {
              console.error("Error in fallback ARISE email dispatch:", mailErr);
            }
            return NextResponse.json({ success: true, registrationCode: existing.rows[0].registration_code });
          }
        } catch (_) {}
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
