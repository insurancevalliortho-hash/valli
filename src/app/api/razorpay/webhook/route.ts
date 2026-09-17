import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPgPool } from "@/lib/db";

// Production Webhook Secret from environment or fallback
const WEBHOOK_SECRET = (
  process.env.RAZORPAY_WEBHOOK_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  "bIi0nGfsMISX1pJZP5pXT27R"
).trim();

export async function POST(request: Request) {
  try {
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

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(expectedSignature, "utf-8")
    );

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

      const paymentId = paymentEntity.id || "";
      const email = (paymentEntity.email || "").trim().toLowerCase();
      let contact = (paymentEntity.contact || "").replace(/\D/g, "");
      if (contact.length > 10) {
        contact = contact.slice(-10); // Extract last 10 digits
      }

      const notes = paymentEntity.notes || {};
      const registrationCode = notes.registration_code || notes.registrationCode || "";

      console.log("Razorpay Webhook Verified Payment Details:", {
        eventType,
        paymentId,
        email,
        contact,
        registrationCode,
      });

      const pool = getPgPool();

      // Ensure is_verified column exists on tables
      await pool.query(
        `ALTER TABLE active_salem_registrations ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`
      );
      await pool.query(
        `ALTER TABLE arise_registrations ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`
      );

      // 4. Automated Database Confirmation for Active Salem Registrations
      const activeSalemRes = await pool.query(
        `UPDATE active_salem_registrations
         SET is_verified = TRUE
         WHERE transaction_id = $1
            OR (registration_code = $2 AND $2 != '')
            OR (email_id = $3 AND $3 != '')
            OR (mobile_number = $4 AND $4 != '');`,
        [paymentId, registrationCode, email, contact]
      );

      // 5. Automated Database Confirmation for ARISE Registrations
      const ariseRes = await pool.query(
        `UPDATE arise_registrations
         SET is_verified = TRUE
         WHERE transaction_id = $1
            OR (registration_code = $2 AND $2 != '')
            OR (email_id = $3 AND $3 != '')
            OR (mobile_number = $4 AND $4 != '');`,
        [paymentId, registrationCode, email, contact]
      );

      console.log(
        `Razorpay Webhook DB Sync: Active Salem updated (${activeSalemRes.rowCount} rows), ARISE updated (${ariseRes.rowCount} rows)`
      );

      return NextResponse.json({
        success: true,
        message: "Webhook processed and registration verified automatically",
        updated: {
          activeSalem: activeSalemRes.rowCount,
          arise: ariseRes.rowCount,
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
