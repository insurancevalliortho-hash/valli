import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TcMg1CMk9e7mZ6").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "bIi0nGfsMISX1pJZP5pXT27R").trim();

    console.log("Razorpay Order Creation - keyId:", keyId, "keySecret length:", keySecret?.length);

    const body = await request.json().catch(() => ({}));
    let { amount, currency = "INR", receipt } = body;

    if (!amount) {
      return NextResponse.json(
        { success: false, error: "Amount is required" },
        { status: 400 }
      );
    }

    // Ensure amount is in paise (minimum 100 paise = ₹1)
    let amountInPaise = Math.round(Number(amount));
    
    // If user passed amount in Rupees (e.g., 100 for ₹100), convert to paise
    if (amountInPaise < 100) {
      amountInPaise = Math.round(Number(amount) * 100);
    }

    if (isNaN(amountInPaise) || amountInPaise < 100) {
      return NextResponse.json(
        { success: false, error: "Minimum order amount must be at least 100 paise (₹1)" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    
    // Handle auth failure
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
