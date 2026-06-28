import { NextResponse } from "next/server";
import { getAllDelegatesWithFeedback } from "@/lib/db";

export async function GET() {
  try {
    const records = await getAllDelegatesWithFeedback();

    const totalDelegates = records.length;
    const submittedCount = records.filter((r: any) => r.feedback_id !== null).length;
    const pendingCount = totalDelegates - submittedCount;

    // Calculate Averages for the 4 questions
    let q1Sum = 0, q2Sum = 0, q3Sum = 0, q4Sum = 0;
    records.forEach((r: any) => {
      if (r.feedback_id !== null) {
        q1Sum += r.q1_event_quality || 5;
        q2Sum += r.q2_session_relevance || 5;
        q3Sum += r.q3_speaker_effectiveness || 5;
        q4Sum += r.q4_organization_venue || 5;
      }
    });

    const avgQ1 = submittedCount > 0 ? (q1Sum / submittedCount).toFixed(1) : "0.0";
    const avgQ2 = submittedCount > 0 ? (q2Sum / submittedCount).toFixed(1) : "0.0";
    const avgQ3 = submittedCount > 0 ? (q3Sum / submittedCount).toFixed(1) : "0.0";
    const avgQ4 = submittedCount > 0 ? (q4Sum / submittedCount).toFixed(1) : "0.0";

    return NextResponse.json({
      success: true,
      stats: {
        totalDelegates,
        submittedCount,
        pendingCount,
        submissionRate: Math.round((submittedCount / totalDelegates) * 100),
        avgQ1,
        avgQ2,
        avgQ3,
        avgQ4
      },
      delegates: records
    });
  } catch (error: any) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin statistics." },
      { status: 500 }
    );
  }
}
