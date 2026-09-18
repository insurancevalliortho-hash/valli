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

      // Determine which table to update based on event notes and code prefix
      const isSalem = eventTarget.includes("SALEM") || registrationCode.startsWith("SALEM");
      const isArise = eventTarget.includes("ARISE") || registrationCode.startsWith("ARISE");

      if (isSalem || (!isArise && registrationCode)) {
        const res = await pool.query(
          `UPDATE active_salem_registrations
           SET is_verified = TRUE,
               transaction_id = CASE WHEN transaction_id IS NULL OR transaction_id = '' THEN $1 ELSE transaction_id END
           WHERE transaction_id = $1
              OR (registration_code = $2 AND $2 != '');`,
          [paymentId, registrationCode]
        );
        activeSalemUpdated = res.rowCount || 0;
      }

      if (isArise || (!isSalem && registrationCode)) {
        const res = await pool.query(
          `UPDATE arise_registrations
           SET is_verified = TRUE,
               transaction_id = CASE WHEN transaction_id IS NULL OR transaction_id = '' THEN $1 ELSE transaction_id END
           WHERE transaction_id = $1
              OR (registration_code = $2 AND $2 != '');`,
          [paymentId, registrationCode]
        );
        ariseUpdated = res.rowCount || 0;
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
