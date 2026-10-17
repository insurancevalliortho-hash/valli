import { NextResponse } from "next/server";
import { getPgPool } from "../../../../lib/db";
import { sendAriseRegistrationEmail } from "@/lib/email";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ValliAdmin2026!";

// POST to fetch all registrations securely with feedback data
export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    const pool = getPgPool();

    // Ensure feedback table exists defensively
    await pool.query(`
      CREATE TABLE IF NOT EXISTS arise_feedback (
        id                       SERIAL PRIMARY KEY,
        registration_id          INTEGER NOT NULL,
        registration_code        TEXT NOT NULL,
        email                    TEXT NOT NULL,
        full_name                TEXT,
        q1_event_quality         INTEGER CHECK (q1_event_quality BETWEEN 1 AND 5),
        q2_session_relevance     INTEGER CHECK (q2_session_relevance BETWEEN 1 AND 5),
        q3_speaker_effectiveness INTEGER CHECK (q3_speaker_effectiveness BETWEEN 1 AND 5),
        q4_hands_on_workshop     INTEGER CHECK (q4_hands_on_workshop BETWEEN 1 AND 5),
        q5_organization_venue    INTEGER CHECK (q5_organization_venue BETWEEN 1 AND 5),
        comments                 TEXT DEFAULT '',
        submitted_at             TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(registration_id)
      );
    `);

    // Fetch registrations joined with feedback
    const res = await pool.query(`
      SELECT 
        r.*,
        f.id AS feedback_id,
        f.q1_event_quality,
        f.q2_session_relevance,
        f.q3_speaker_effectiveness,
        f.q4_hands_on_workshop,
        f.q5_organization_venue,
        f.comments AS feedback_comments,
        f.submitted_at AS feedback_submitted_at
      FROM arise_registrations r
      LEFT JOIN arise_feedback f ON r.id = f.registration_id
      ORDER BY r.created_at DESC;
    `);

    // Fetch all feedbacks ordered by newest
    const fbRes = await pool.query(
      `SELECT * FROM arise_feedback ORDER BY submitted_at DESC;`
    );
    const feedbacks = fbRes.rows || [];

    const totalRegistrations = res.rows.length;
    const totalSubmitted = feedbacks.length;
    const submissionRate = totalRegistrations > 0 ? Math.round((totalSubmitted / totalRegistrations) * 100) : 0;

    let q1Total = 0, q2Total = 0, q3Total = 0, q4Total = 0, q5Total = 0;
    feedbacks.forEach((f: any) => {
      q1Total += Number(f.q1_event_quality) || 0;
      q2Total += Number(f.q2_session_relevance) || 0;
      q3Total += Number(f.q3_speaker_effectiveness) || 0;
      q4Total += Number(f.q4_hands_on_workshop) || 0;
      q5Total += Number(f.q5_organization_venue) || 0;
    });

    const avgQ1 = totalSubmitted > 0 ? Number((q1Total / totalSubmitted).toFixed(1)) : 0;
    const avgQ2 = totalSubmitted > 0 ? Number((q2Total / totalSubmitted).toFixed(1)) : 0;
    const avgQ3 = totalSubmitted > 0 ? Number((q3Total / totalSubmitted).toFixed(1)) : 0;
    const avgQ4 = totalSubmitted > 0 ? Number((q4Total / totalSubmitted).toFixed(1)) : 0;
    const avgQ5 = totalSubmitted > 0 ? Number((q5Total / totalSubmitted).toFixed(1)) : 0;
    const overallAvg = totalSubmitted > 0 
      ? Number(((avgQ1 + avgQ2 + avgQ3 + avgQ4 + avgQ5) / 5).toFixed(1)) 
      : 0;

    const feedbackStats = {
      totalSubmitted,
      totalRegistrations,
      submissionRate,
      avgQ1,
      avgQ2,
      avgQ3,
      avgQ4,
      avgQ5,
      overallAvg,
    };

    return NextResponse.json({
      success: true,
      data: res.rows,
      feedbacks,
      feedbackStats,
    });
  } catch (error: any) {
    console.error("ARISE Admin API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE a registration (and associated feedback)
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

    const pool = getPgPool();
    await pool.query(`DELETE FROM arise_feedback WHERE registration_id = $1;`, [id]);
    await pool.query(
      `DELETE FROM arise_registrations WHERE id = $1;`,
      [id]
    );

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

    const pool = getPgPool();
    await pool.query(
      `UPDATE arise_registrations SET is_verified = $1 WHERE id = $2;`,
      [isVerified, id]
    );

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

    const pool = getPgPool();

    if (id) {
      const res = await pool.query(
        `SELECT * FROM arise_registrations WHERE id = $1 LIMIT 1;`,
        [id]
      );
      if (res.rows.length === 0) {
        return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
      }

      const reg = res.rows[0];
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
      const res = await pool.query(`SELECT * FROM arise_registrations ORDER BY id ASC;`);
      let count = 0;
      for (const reg of res.rows) {
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
