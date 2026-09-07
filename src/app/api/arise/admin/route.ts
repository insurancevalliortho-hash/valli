import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ValliAdmin2026!";

// POST to fetch all registrations securely
export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    const registrations = await sql`
      SELECT * FROM arise_registrations
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ success: true, data: registrations });
  } catch (error: any) {
    console.error("ARISE Admin API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE a registration
export async function DELETE(request: Request) {
  try {
    const { password, id } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing registration ID" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM arise_registrations
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ARISE Admin DELETE API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH to toggle verification status of a registration
export async function PATCH(request: Request) {
  try {
    const { password, id, isVerified } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing registration ID" },
        { status: 400 }
      );
    }

    await sql`
      UPDATE arise_registrations
      SET is_verified = ${isVerified}
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ARISE Admin PATCH API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT to resend confirmation email for a registration (or all)
export async function PUT(request: Request) {
  try {
    const { password, id } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    const { sendAriseRegistrationEmail } = await import("../../../../lib/email");

    if (id) {
      const records = await sql`
        SELECT * FROM arise_registrations WHERE id = ${id} LIMIT 1;
      `;
      if (records.length === 0) {
        return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
      }

      const reg = records[0];
      const result = await sendAriseRegistrationEmail({
        registrationCode: reg.registration_code,
        fullName: reg.full_name,
        emailId: reg.email_id,
        mobileNumber: reg.mobile_number,
        category: reg.category,
        includeWorkshop: Boolean(reg.include_workshop),
        institution: reg.institution,
        department: reg.department || "",
        city: reg.city || "",
        transactionId: reg.transaction_id,
        designation: reg.designation || "",
        qualification: reg.qualification || "",
        foodPreference: reg.food_preference || "",
        iapCreditPoints: Boolean(reg.iap_credit_points),
        iapMembershipNumber: reg.iap_membership_number || "",
        bonafideCertificate: reg.bonafide_certificate || ""
      });

      const previewUrl = "previewUrl" in result ? result.previewUrl : null;
      const messageId = "messageId" in result ? result.messageId : null;
      return NextResponse.json({ success: result.success, messageId, previewUrl });
    } else {
      // Send for all
      const records = await sql`SELECT * FROM arise_registrations ORDER BY id ASC;`;
      let count = 0;
      for (const reg of records) {
        await sendAriseRegistrationEmail({
          registrationCode: reg.registration_code,
          fullName: reg.full_name,
          emailId: reg.email_id,
          mobileNumber: reg.mobile_number,
          category: reg.category,
          includeWorkshop: Boolean(reg.include_workshop),
          institution: reg.institution,
          department: reg.department || "",
          city: reg.city || "",
          transactionId: reg.transaction_id,
          designation: reg.designation || "",
          qualification: reg.qualification || "",
          foodPreference: reg.food_preference || "",
          iapCreditPoints: Boolean(reg.iap_credit_points),
          iapMembershipNumber: reg.iap_membership_number || "",
          bonafideCertificate: reg.bonafide_certificate || ""
        });
        count++;
      }
      return NextResponse.json({ success: true, count });
    }
  } catch (error: any) {
    console.error("ARISE Admin Resend Email Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

