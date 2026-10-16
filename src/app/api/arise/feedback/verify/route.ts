import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile, mobileNumber, registrationId, registrationCode, email } = body;

    // Direct lookup by registrationId if chosen from multiple list
    if (registrationId) {
      const rows = await sql`
        SELECT id, registration_code, full_name, email_id, mobile_number, category, institution, is_verified
        FROM arise_registrations
        WHERE id = ${Number(registrationId)}
        LIMIT 1;
      `;
      if (!rows || rows.length === 0) {
        return NextResponse.json({ error: "Delegate registration not found." }, { status: 404 });
      }
      const delegate = rows[0];
      const fbRows = await sql`
        SELECT id FROM arise_feedback WHERE registration_id = ${delegate.id} LIMIT 1;
      `;
      return NextResponse.json({
        success: true,
        delegate: {
          registrationId: delegate.id,
          registrationCode: delegate.registration_code,
          fullName: delegate.full_name,
          email: delegate.email_id,
          mobile: delegate.mobile_number,
          category: delegate.category,
          institution: delegate.institution,
          isVerified: delegate.is_verified,
        },
        alreadySubmitted: fbRows.length > 0,
      });
    }

    const inputPhone = String(mobile || mobileNumber || "").trim();

    // 1. Mobile number lookup
    if (inputPhone) {
      const digitsOnly = inputPhone.replace(/\D/g, "");
      const phone10 = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;

      if (phone10.length < 10) {
        return NextResponse.json(
          { error: "Please enter a valid 10-digit mobile number." },
          { status: 400 }
        );
      }

      const rows = await sql`
        SELECT id, registration_code, full_name, email_id, mobile_number, category, institution, is_verified
        FROM arise_registrations
        WHERE RIGHT(REGEXP_REPLACE(mobile_number, '[^0-9]', '', 'g'), 10) = ${phone10}
           OR mobile_number ILIKE ${'%' + phone10 + '%'}
        ORDER BY id ASC;
      `;

      if (!rows || rows.length === 0) {
        return NextResponse.json(
          { error: `No ARISE registration found for mobile number ${phone10}. Please check your number or contact the organizers.` },
          { status: 404 }
        );
      }

      // Check feedback submissions for all matching delegates
      const ids = rows.map((r: any) => Number(r.id));
      const submittedFeedbacks = await sql`
        SELECT registration_id FROM arise_feedback WHERE registration_id = ANY(${ids});
      `;
      const submittedSet = new Set(submittedFeedbacks.map((f: any) => Number(f.registration_id)));

      if (rows.length === 1) {
        const delegate = rows[0];
        return NextResponse.json({
          success: true,
          delegate: {
            registrationId: delegate.id,
            registrationCode: delegate.registration_code,
            fullName: delegate.full_name,
            email: delegate.email_id,
            mobile: delegate.mobile_number,
            category: delegate.category,
            institution: delegate.institution,
            isVerified: delegate.is_verified,
          },
          alreadySubmitted: submittedSet.has(Number(delegate.id)),
        });
      }

      // Multiple delegates found with the same mobile (e.g. bulk group)
      return NextResponse.json({
        success: true,
        multiple: true,
        delegates: rows.map((delegate: any) => ({
          registrationId: delegate.id,
          registrationCode: delegate.registration_code,
          fullName: delegate.full_name,
          email: delegate.email_id,
          mobile: delegate.mobile_number,
          category: delegate.category,
          institution: delegate.institution,
          isVerified: delegate.is_verified,
          alreadySubmitted: submittedSet.has(Number(delegate.id)),
        })),
      });
    }

    // 2. Fallback: code + email
    if (registrationCode && email) {
      const rows = await sql`
        SELECT id, registration_code, full_name, email_id, mobile_number, category, institution, is_verified
        FROM arise_registrations
        WHERE LOWER(TRIM(registration_code)) = LOWER(TRIM(${registrationCode}))
          AND LOWER(TRIM(email_id)) = LOWER(TRIM(${email}))
        LIMIT 1;
      `;

      if (!rows || rows.length === 0) {
        return NextResponse.json(
          { error: "Registration not found. Please check your Pass Code and email." },
          { status: 404 }
        );
      }

      const delegate = rows[0];
      const fbRows = await sql`
        SELECT id FROM arise_feedback WHERE registration_id = ${delegate.id} LIMIT 1;
      `;

      return NextResponse.json({
        success: true,
        delegate: {
          registrationId: delegate.id,
          registrationCode: delegate.registration_code,
          fullName: delegate.full_name,
          email: delegate.email_id,
          mobile: delegate.mobile_number,
          category: delegate.category,
          institution: delegate.institution,
          isVerified: delegate.is_verified,
        },
        alreadySubmitted: fbRows.length > 0,
      });
    }

    return NextResponse.json(
      { error: "Please enter your registered mobile number." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("ARISE Feedback Verify Error:", error);
    return NextResponse.json(
      { error: "Failed to verify mobile number. Please try again." },
      { status: 500 }
    );
  }
}
