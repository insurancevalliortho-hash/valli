import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keyId || !keySecret) {
      console.error("Razorpay Error: Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment variables.");
      return NextResponse.json(
        { success: false, error: "Razorpay payment gateway credentials are not configured on the server." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { amount, currency = "INR", receipt, eventType, registrationCode, notes: inputNotes } = body;

    if (amount === undefined || amount === null || amount === "") {
      return NextResponse.json(
        { success: false, error: "Payment amount is required" },
        { status: 400 }
      );
    }

    const amountInRupees = Number(amount);
    if (isNaN(amountInRupees) || amountInRupees < 1) {
      return NextResponse.json(
        { success: false, error: "Order amount must be at least ₹1" },
        { status: 400 }
      );
    }

    // Always convert Rupees to paise (1 INR = 100 paise)
    const amountInPaise = Math.round(amountInRupees * 100);

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const notes: Record<string, string> = {
      eventType: String(eventType || inputNotes?.eventType || "GENERAL"),
      registrationCode: String(registrationCode || inputNotes?.registrationCode || ""),
      ...(inputNotes || {}),
    };

    const options = {
      amount: amountInPaise,
      currency: (currency || "INR").toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      orderId: order.id,
      amount: order.amount, // in paise
      amountInRupees: amountInRupees,
      currency: order.currency,
      key: keyId,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);

    if (error?.statusCode === 401 || error?.error?.code === "BAD_REQUEST_ERROR") {
      return NextResponse.json(
        { success: false, error: error?.error?.description || "Razorpay API Authentication Failed" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: error?.error?.description || error?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
