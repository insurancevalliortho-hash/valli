import { NextResponse } from "next/server";
import { saveActiveSalemRegistration } from "../../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      registrationCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      tshirtSize,
      gender,
      age,
      emergencyContact,
      city,
      source,
      transactionId,
      paymentScreenshot,
    } = body;

    if (
      !registrationCode ||
      !fullName ||
      !emailId ||
      !mobileNumber ||
      !category ||
      !tshirtSize ||
      !gender ||
      !age ||
      !transactionId ||
      !paymentScreenshot
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required runner fields" },
        { status: 400 }
      );
    }

    // Save into Neon database
    await saveActiveSalemRegistration({
      registrationCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      tshirtSize,
      gender,
      age: Number(age),
      emergencyContact: emergencyContact || "",
      city: city || "",
      source: source || "Other",
      transactionId,
      paymentScreenshot,
    });

    return NextResponse.json({ success: true, registrationCode });
  } catch (error: any) {
    console.error("API error in Active Salem registration:", error);

    if (error.message && error.message.toLowerCase().includes("unique constraint")) {
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
