import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPgPool } from "@/lib/db";

// Production Webhook Secret from environment
const WEBHOOK_SECRET = (
  process.env.RAZORPAY_WEBHOOK_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  ""
).trim();

export async function POST(request: Request) {
  try {
    if (!WEBHOOK_SECRET) {
      console.error("Razorpay Webhook Error: RAZORPAY_WEBHOOK_SECRET / RAZORPAY_KEY_SECRET not set.");
      return NextResponse.json(
        { success: false, error: "Webhook secret not configured on server" },
        { status: 500 }
      );
    }

    // 1. Read raw body as text for exact HMAC-SHA256 signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing x-razorpay-signature header" },
        { status: 400 }
      );
    }

    // 2. Verify signature against raw body
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf-8");
    const receivedBuffer = Buffer.from(signature, "utf-8");

    const isSignatureValid =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!isSignatureValid) {
      console.warn("Razorpay Webhook: Invalid signature detected!");
      return NextResponse.json(
        { success: false, error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    // 3. Parse JSON event payload
    const eventData = JSON.parse(rawBody);
    const eventType = eventData.event;
    console.log(`Razorpay Webhook Received Event: ${eventType}`);

    // Process payment success events
    if (
      eventType === "payment.captured" ||
      eventType === "payment_link.paid" ||
      eventType === "order.paid"
    ) {
      const paymentEntity =
        eventData.payload?.payment?.entity ||
        eventData.payload?.payment_link?.entity ||
        {};
      const orderEntity = eventData.payload?.order?.entity || {};

      const paymentId = paymentEntity.id || "";
      const notes = { ...(orderEntity.notes || {}), ...(paymentEntity.notes || {}) };
      const registrationCode = notes.registration_code || notes.registrationCode || "";
      const eventTarget = (notes.eventType || notes.event || "").toUpperCase();

      console.log("Razorpay Webhook Verified Payment Details:", {
        eventType,
        paymentId,
        registrationCode,
        eventTarget,
      });

      const pool = getPgPool();
      let activeSalemUpdated = 0;
      let ariseUpdated = 0;

      const amountInPaise = Number(paymentEntity.amount || orderEntity.amount || 0);

      // Determine which table to update based on event notes, code prefix, and parameters
      const isSalem =
        eventTarget.includes("SALEM") ||
        registrationCode.startsWith("SALEM") ||
        Boolean(notes.tshirtSize || notes.tshirt_size || (amountInPaise >= 24900 && amountInPaise <= 35000));

      const isArise =
        eventTarget.includes("ARISE") ||
        registrationCode.startsWith("ARISE") ||
        Boolean(notes.institution || notes.qualification || notes.includeWorkshop || notes.isBulk || amountInPaise >= 50000);

      // 1. ACTIVE SALEM REGISTRATIONS
      if (isSalem || (!isArise && registrationCode.startsWith("SALEM"))) {
        const res = await pool.query(
          `UPDATE active_salem_registrations
           SET is_verified = TRUE,
               transaction_id = CASE WHEN transaction_id IS NULL OR transaction_id = '' THEN $1 ELSE transaction_id END
           WHERE transaction_id = $1
              OR (registration_code = $2 AND $2 != '');`,
          [paymentId, registrationCode]
        );
        activeSalemUpdated = res.rowCount || 0;

        // Fallback auto-insert if record was not created by the browser client
        if (activeSalemUpdated === 0 && paymentId) {
          try {
            const existing = await pool.query(
              `SELECT id, registration_code FROM active_salem_registrations WHERE transaction_id = $1 LIMIT 1;`,
              [paymentId]
            );

            if (existing.rowCount && existing.rowCount > 0) {
              activeSalemUpdated = 1;
            } else {
              const runnerName = notes.fullName || notes.full_name || paymentEntity.notes?.fullName || "Active Salem Runner";
              const runnerEmail = notes.emailId || notes.email_id || paymentEntity.email || "runner@activesalem.in";
              const runnerMobile = notes.mobileNumber || notes.mobile_number || paymentEntity.contact || "9999999999";
              const runnerCategory = notes.category || (amountInPaise >= 29900 ? "10KM" : "5KM");
              const runnerSize = notes.tshirtSize || notes.tshirt_size || "M";
              const runnerGender = notes.gender || "Other";
              const runnerAge = Number(notes.age) || 25;
              const runnerEmergency = notes.emergencyContact || notes.emergency_contact || "N/A";
              const runnerCity = notes.city || "Salem";
              const runnerSource = notes.source || "Razorpay Online Gateway";

              let runnerCode = registrationCode;
              if (!runnerCode || !runnerCode.startsWith("SALEM26-")) {
                const seqRes = await pool.query(
                  "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations"
                );
                const nextId = seqRes.rows[0]?.next_id || 1;
                runnerCode = `SALEM26-${String(nextId).padStart(4, "0")}`;
              }

              await pool.query(
                `INSERT INTO active_salem_registrations (
                  registration_code, full_name, email_id, mobile_number, category, tshirt_size,
                  gender, age, emergency_contact, city, source, transaction_id, payment_screenshot, is_verified
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'RAZORPAY_ONLINE_PAYMENT',TRUE)
                ON CONFLICT (transaction_id) DO UPDATE SET is_verified = TRUE;`,
                [
                  runnerCode,
                  runnerName,
                  runnerEmail,
                  runnerMobile,
                  runnerCategory,
                  runnerSize,
                  runnerGender,
                  runnerAge,
                  runnerEmergency,
                  runnerCity,
                  runnerSource,
                  paymentId
                ]
              );
              activeSalemUpdated = 1;
              console.log(`Razorpay Webhook: Auto-inserted Active Salem registration for ${paymentId} (${runnerCode})`);

              // Dispatch email confirmation
              try {
                const { sendActiveSalemRegistrationEmail } = await import("../../../../lib/email");
                await sendActiveSalemRegistrationEmail({
                  registrationCode: runnerCode,
                  fullName: runnerName,
                  emailId: runnerEmail,
                  mobileNumber: runnerMobile,
                  category: runnerCategory,
                  tshirtSize: runnerSize,
                  gender: runnerGender,
                  age: runnerAge,
                  emergencyContact: runnerEmergency,
                  city: runnerCity,
                  transactionId: paymentId,
                });
              } catch (mailErr) {
                console.error("Razorpay Webhook: Error sending Active Salem confirmation email:", mailErr);
              }
            }
          } catch (autoErr) {
            console.error("Razorpay Webhook: Error auto-inserting Active Salem registration:", autoErr);
          }
        }
      }

      // 2. ARISE 2026 REGISTRATIONS
      if (isArise || (!isSalem && registrationCode.startsWith("ARISE"))) {
        const res = await pool.query(
          `UPDATE arise_registrations
           SET is_verified = TRUE,
               transaction_id = CASE WHEN transaction_id IS NULL OR transaction_id = '' THEN $1 ELSE transaction_id END
           WHERE transaction_id = $1
              OR (registration_code = $2 AND $2 != '');`,
          [paymentId, registrationCode]
        );
        ariseUpdated = res.rowCount || 0;

        // Fallback auto-insert if record was not created by the browser client
        if (ariseUpdated === 0 && paymentId) {
          try {
            const existing = await pool.query(
              `SELECT id, registration_code FROM arise_registrations WHERE transaction_id = $1 OR transaction_id = $2 LIMIT 1;`,
              [paymentId, `${paymentId}-LEAD`]
            );

            if (existing.rowCount && existing.rowCount > 0) {
              ariseUpdated = 1;
            } else {
              const delegateName = notes.fullName || notes.full_name || paymentEntity.notes?.fullName || "ARISE Delegate";
              const delegateEmail = notes.emailId || notes.email_id || paymentEntity.email || "delegate@vallicountry.com";
              const delegateMobile = notes.mobileNumber || notes.mobile_number || paymentEntity.contact || "9999999999";
              const delegateCategory = notes.category || "Conference";
              const delegateWorkshop = notes.includeWorkshop === "true" || notes.includeWorkshop === true;
              const delegateInstitution = notes.institution || "Healthcare Institution";
              const delegateDepartment = notes.department || "";
              const delegateCity = notes.city || "Salem";
              const delegateSource = notes.source || "Razorpay Online Gateway";
              const delegateDesignation = notes.designation || "Delegate";
              const delegateQualification = notes.qualification || "Physiotherapist / Medical Professional";
              const delegateBonafide = notes.bonafideCertificate || null;
              const delegateFood = notes.foodPreference || "Vegetarian";
              const delegateIapPoints = notes.iapCreditPoints === "true" || notes.iapCreditPoints === true;
              const delegateIapNo = notes.iapMembershipNumber || null;

              let delegateCode = registrationCode;
              const isBulkPayment = notes.isBulk === "true" || notes.isBulk === true || amountInPaise === 2000000;
              if (isBulkPayment) {
                delegateCode = delegateCode ? `${delegateCode}-LEAD` : `ARISE26-BULK-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
              } else if (!delegateCode || !delegateCode.startsWith("ARISE26-")) {
                const seqRes = await pool.query(
                  "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM arise_registrations"
                );
                const nextId = seqRes.rows[0]?.next_id || 1;
                delegateCode = `ARISE26-${String(nextId).padStart(4, "0")}`;
              }

              await pool.query(
                `INSERT INTO arise_registrations (
                  registration_code, full_name, email_id, mobile_number, category, include_workshop,
                  institution, department, city, source, transaction_id, payment_screenshot,
                  designation, qualification, bonafide_certificate, food_preference,
                  iap_credit_points, iap_membership_number, is_verified
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'RAZORPAY_ONLINE_PAYMENT',$12,$13,$14,$15,$16,$17,TRUE)
                ON CONFLICT (transaction_id) DO UPDATE SET is_verified = TRUE;`,
                [
                  delegateCode,
                  delegateName,
                  delegateEmail,
                  delegateMobile,
                  delegateCategory,
                  delegateWorkshop,
                  delegateInstitution,
                  delegateDepartment,
                  delegateCity,
                  delegateSource,
                  isBulkPayment ? `${paymentId}-LEAD` : paymentId,
                  delegateDesignation,
                  delegateQualification,
                  delegateBonafide,
                  delegateFood,
                  delegateIapPoints,
                  delegateIapNo
                ]
              );
              ariseUpdated = 1;
              console.log(`Razorpay Webhook: Auto-inserted ARISE registration for ${paymentId} (${delegateCode})`);

              // Dispatch email confirmation
              try {
                const { sendAriseRegistrationEmail } = await import("../../../../lib/email");
                await sendAriseRegistrationEmail({
                  registrationCode: delegateCode,
                  fullName: delegateName,
                  emailId: delegateEmail,
                  mobileNumber: delegateMobile,
                  category: delegateCategory,
                  includeWorkshop: delegateWorkshop,
                  institution: delegateInstitution,
                  department: delegateDepartment,
                  city: delegateCity,
                  transactionId: paymentId,
                  designation: delegateDesignation,
                  qualification: delegateQualification,
                  foodPreference: delegateFood,
                  iapCreditPoints: delegateIapPoints,
                  iapMembershipNumber: delegateIapNo || "",
                  bonafideCertificate: delegateBonafide || ""
                });
              } catch (mailErr) {
                console.error("Razorpay Webhook: Error sending ARISE confirmation email:", mailErr);
              }
            }
          } catch (autoErr) {
            console.error("Razorpay Webhook: Error auto-inserting ARISE registration:", autoErr);
          }
        }
      }

      console.log(
        `Razorpay Webhook DB Sync: Active Salem updated (${activeSalemUpdated} rows), ARISE updated (${ariseUpdated} rows)`
      );

      return NextResponse.json({
        success: true,
        message: "Webhook processed and registration verified automatically",
        updated: {
          activeSalem: activeSalemUpdated,
          arise: ariseUpdated,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Event '${eventType}' acknowledged`,
    });
  } catch (error: any) {
    console.error("Razorpay Webhook Processing Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
