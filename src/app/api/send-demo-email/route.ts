import { NextResponse } from "next/server";
import { sendDemoVerificationEmail } from "@/lib/email";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to") || "mohammedarif2303@gmail.com";
  const type = (searchParams.get("type") || "both") as "salem" | "arise" | "both";

  try {
    const result = await sendDemoVerificationEmail(to, type);
    return NextResponse.json({
      success: true,
      message: `Demo verification email triggered to ${to}`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to dispatch demo email",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const to = body.to || "mohammedarif2303@gmail.com";
    const type = (body.type || "both") as "salem" | "arise" | "both";

    const result = await sendDemoVerificationEmail(to, type);
    return NextResponse.json({
      success: true,
      message: `Demo verification email triggered to ${to}`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to dispatch demo email",
      },
      { status: 500 }
    );
  }
}
