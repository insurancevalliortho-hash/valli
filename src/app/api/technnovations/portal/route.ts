import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

// POST: Authenticate Leader Login
export async function POST(request: Request) {
  try {
    const { registrationCode, emailOrPhone } = await request.json();

    if (!registrationCode || !emailOrPhone) {
      return NextResponse.json(
        { success: false, error: "Missing registration code or identifier" },
        { status: 400 }
      );
    }

    const regUpper = registrationCode.trim().toUpperCase();
    const identLower = emailOrPhone.trim().toLowerCase();

    // Query database for team matching code and email/phone
    const results = await sql`
      SELECT id, registration_code, team_name, team_size, team_lead, lead_phone, 
             co_members, email_id, college_name, college_location, department, 
             year_of_study, source, transaction_id, created_at, is_verified, 
             ppt_filename, ppt_uploaded_at
      FROM technovations_registrations
      WHERE UPPER(registration_code) = ${regUpper} 
        AND (LOWER(email_id) = ${identLower} OR lead_phone = ${emailOrPhone});
    `;

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid registration code or leader contact credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data: results[0] });
  } catch (error: any) {
    console.error("Leader Auth API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Upload/Save PPT File
export async function PUT(request: Request) {
  try {
    const { registrationCode, emailOrPhone, pptFile, pptFilename } = await request.json();

    if (!registrationCode || !emailOrPhone || !pptFile || !pptFilename) {
      return NextResponse.json(
        { success: false, error: "Missing required upload parameters" },
        { status: 400 }
      );
    }

    const regUpper = registrationCode.trim().toUpperCase();
    const identLower = emailOrPhone.trim().toLowerCase();

    // Validate authentication before updating
    const authCheck = await sql`
      SELECT id FROM technovations_registrations
      WHERE UPPER(registration_code) = ${regUpper}
        AND (LOWER(email_id) = ${identLower} OR lead_phone = ${emailOrPhone});
    `;

    if (authCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: "Unauthorized update attempt." },
        { status: 401 }
      );
    }

    // Update the PPT fields in the database
    await sql`
      UPDATE technovations_registrations
      SET ppt_file = ${pptFile},
          ppt_filename = ${pptFilename},
          ppt_uploaded_at = CURRENT_TIMESTAMP
      WHERE UPPER(registration_code) = ${regUpper};
    `;

    return NextResponse.json({ 
      success: true, 
      pptFilename, 
      pptUploadedAt: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error("Leader PPT Upload API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
