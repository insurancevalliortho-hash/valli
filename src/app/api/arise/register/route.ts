import { NextResponse } from "next/server";
import { saveAriseRegistration } from "../../../../lib/db";
import { sendAriseRegistrationEmail } from "../../../../lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const {
      registrationCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      includeWorkshop,
      institution,
      department,
      city,
      source,
      transactionId,
      paymentScreenshot,
      designation,
      qualification,
      bonafideCertificate,
      foodPreference,
      iapCreditPoints,
      iapMembershipNumber
    } = body;

    if (
      !registrationCode ||
      !fullName ||
      !emailId ||
      !mobileNumber ||
      !category ||
      !institution ||
      !city ||
      !transactionId ||
      !paymentScreenshot ||
      !designation ||
      !qualification ||
      !foodPreference
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into Neon Database
    await saveAriseRegistration({
      registrationCode,
      fullName,
      emailId,
      mobileNumber,
      category,
      includeWorkshop: !!includeWorkshop,
      institution,
      department: department || "",
      city: city || "",
      source: source || "Other",
      transactionId,
      paymentScreenshot,
      designation,
      qualification,
      bonafideCertificate,
      foodPreference,
      iapCreditPoints: !!iapCreditPoints,
      iapMembershipNumber
    });

    // Dispatch confirmation email
    try {
      await sendAriseRegistrationEmail({
        registrationCode,
        fullName,
        emailId,
        mobileNumber,
        category,
        includeWorkshop: !!includeWorkshop,
        institution,
        department: department || "",
        city: city || "",
        transactionId,
        designation,
        qualification,
        foodPreference,
        iapCreditPoints: !!iapCreditPoints,
        iapMembershipNumber,
        bonafideCertificate
      });
    } catch (emailErr) {
      console.error("API error in dispatching ARISE registration email:", emailErr);
    }

    return NextResponse.json({ success: true, registrationCode });
  } catch (error: any) {
    console.error("API Error in ARISE registration:", error);
    
    // Handle unique constraint violations
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
