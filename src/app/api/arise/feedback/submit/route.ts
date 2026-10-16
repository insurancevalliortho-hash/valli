import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {
      registrationId,
      email,
      q1EventQuality,
      q2SessionRelevance,
      q3SpeakerEffectiveness,
      q4HandsOnWorkshop,
      q5OrganizationVenue,
      comments,
    } = await req.json();

    if (!registrationId || !email) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Get full_name + registration_code
    const regRows = await sql`
      SELECT full_name, registration_code FROM arise_registrations WHERE id = ${Number(registrationId)} LIMIT 1;
    `;
    const fullName = regRows[0]?.full_name || "";
    const registrationCode = regRows[0]?.registration_code || "";

    // Insert feedback (ignore if already submitted)
    await sql`
      INSERT INTO arise_feedback (
        registration_id, registration_code, email, full_name,
        q1_event_quality, q2_session_relevance, q3_speaker_effectiveness,
        q4_hands_on_workshop, q5_organization_venue, comments
      ) VALUES (
        ${Number(registrationId)},
        ${registrationCode},
        ${String(email)},
        ${fullName},
        ${Number(q1EventQuality) || 5},
        ${Number(q2SessionRelevance) || 5},
        ${Number(q3SpeakerEffectiveness) || 5},
        ${Number(q4HandsOnWorkshop) || 5},
        ${Number(q5OrganizationVenue) || 5},
        ${String(comments || "")}
      )
      ON CONFLICT (registration_id) DO NOTHING;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ARISE Feedback Submit Error:", error);
    return NextResponse.json(
      { error: "Failed to record feedback. Please try again." },
      { status: 500 }
    );
  }
}
