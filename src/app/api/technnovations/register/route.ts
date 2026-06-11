import { NextResponse } from "next/server";
import { saveRegistration } from "../../../../lib/db";
import { sendRegistrationEmail } from "../../../../lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic server-side validation
    const {
      registrationCode,
      teamName,
      teamSize,
      teamLead,
      leadPhone,
      coMembers,
      emailId,
      collegeName,
      collegeLocation,
      department,
      yearOfStudy,
      source,
      transactionId,
      paymentScreenshot
    } = body;

    if (!registrationCode || !teamName || !teamLead || !leadPhone || !emailId || !collegeName || !transactionId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into database
    await saveRegistration({
      registrationCode,
      teamName,
      teamSize,
      teamLead,
      leadPhone,
      coMembers: coMembers || [],
      emailId,
      collegeName,
      collegeLocation: collegeLocation || "",
      department: department || "",
      yearOfStudy: yearOfStudy || "1st",
      source: source || "Other",
      transactionId,
      paymentScreenshot
    });

    // Dispatch email confirmation instantly
    try {
      await sendRegistrationEmail({
        registrationCode,
        teamName,
        teamSize,
        teamLead,
        leadPhone,
        coMembers: coMembers || [],
        emailId,
        collegeName,
        collegeLocation: collegeLocation || "",
        department: department || "",
        yearOfStudy: yearOfStudy || "1st",
        transactionId
      });
    } catch (emailErr) {
      console.error("API error in dispatching registration email:", emailErr);
    }

    return NextResponse.json({ success: true, registrationCode });
  } catch (error: any) {
    console.error("API Error in registration:", error);
    
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
