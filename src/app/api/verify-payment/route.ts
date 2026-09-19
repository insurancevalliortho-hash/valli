import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keySecret) {
      console.error("Razorpay Error: Missing RAZORPAY_KEY_SECRET in environment variables.");
      return NextResponse.json(
        { success: false, error: "Razorpay payment gateway secret is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const razorpay_order_id =
      body.razorpay_order_id ||
      body.order_id ||
      body.orderId ||
      body.razorpayOrderId ||
      body.orderCreationId;
    const razorpay_payment_id =
      body.razorpay_payment_id ||
      body.payment_id ||
      body.paymentId ||
      body.razorpayPaymentId;
    const razorpay_signature =
      body.razorpay_signature ||
      body.signature ||
      body.razorpaySignature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          isOk: false,
          error: "Missing required fields: order ID, payment ID, and signature are all required",
        },
        { status: 400 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf-8");
    const receivedBuffer = Buffer.from(razorpay_signature, "utf-8");

    const isSignatureValid =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!isSignatureValid) {
      return NextResponse.json(
        {
          success: false,
          isOk: false,
          verified: false,
          error: "Payment verification failed: Signature mismatch",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      isOk: true,
      verified: true,
      message: "Payment signature verified successfully",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });
  } catch (error: any) {
    console.error("Error verifying Razorpay payment signature:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error during payment verification" },
      { status: 500 }
    );
  }
}
