import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "bIi0nGfsMISX1pJZP5pXT27R").trim();

    const body = await request.json().catch(() => ({}));
    
    const razorpay_order_id = body.razorpay_order_id || body.order_id || body.orderId;
    const razorpay_payment_id = body.razorpay_payment_id || body.payment_id || body.paymentId;
    const razorpay_signature = body.razorpay_signature || body.signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are all required",
        },
        { status: 400 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Payment verification failed: Signature mismatch",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
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
