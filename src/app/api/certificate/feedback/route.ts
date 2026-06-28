import { NextResponse } from "next/server";
import { saveFeedbackResponse } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { 
      delegateId, 
      email, 
      q1EventQuality, 
      q2SessionRelevance, 
      q3SpeakerEffectiveness, 
      q4OrganizationVenue, 
      comments 
    } = await req.json();

    if (!delegateId || !email) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    await saveFeedbackResponse({
      delegateId: Number(delegateId),
      email: String(email),
      q1EventQuality: Number(q1EventQuality) || 5,
      q2SessionRelevance: Number(q2SessionRelevance) || 5,
      q3SpeakerEffectiveness: Number(q3SpeakerEffectiveness) || 5,
      q4OrganizationVenue: Number(q4OrganizationVenue) || 5,
      comments: String(comments || ""),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { error: "Failed to record feedback. Please try again." },
      { status: 500 }
    );
  }
}
