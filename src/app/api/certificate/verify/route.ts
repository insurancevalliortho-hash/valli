import { NextResponse } from "next/server";
import { getDelegateByEmail, checkFeedbackSubmitted } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const delegate = await getDelegateByEmail(email);

    if (!delegate) {
      return NextResponse.json(
        { error: "Email address not found in delegate records. Please verify your registered email." },
        { status: 444 }
      );
    }

    const alreadySubmitted = await checkFeedbackSubmitted(delegate.delegate_id);

    return NextResponse.json({
      success: true,
      delegate: {
        delegateId: delegate.delegate_id,
        name: delegate.name,
        email: delegate.email,
        phone: delegate.phone,
        regNo: delegate.reg_no,
      },
      alreadySubmitted
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify delegate email. Please try again." },
      { status: 500 }
    );
  }
}
