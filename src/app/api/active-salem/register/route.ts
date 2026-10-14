import { NextResponse } from "next/server";
import { getPgPool } from "../../../../lib/db";

const LIMIT_5KM = 650;
const LIMIT_10KM = 450;

export async function GET() {
  try {
    const pool = getPgPool();
    const res = await pool.query(
      "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations"
    );
    const nextId = res.rows[0]?.next_id || 1;
    const orderedCode = `SALEM26-${String(nextId).padStart(4, "0")}`;

    const countRes = await pool.query(
      `SELECT 
         COUNT(*) FILTER (WHERE UPPER(TRIM(category)) = '5KM') AS count_5k,
         COUNT(*) FILTER (WHERE UPPER(TRIM(category)) = '10KM') AS count_10k
       FROM active_salem_registrations`
    );
    const count5k = parseInt(countRes.rows[0]?.count_5k || "0", 10);
    const count10k = parseInt(countRes.rows[0]?.count_10k || "0", 10);

    return NextResponse.json({
      success: true,
      nextRegistrationCode: orderedCode,
      nextId,
      counts: {
        "5KM": count5k,
        "10KM": count10k,
      },
      limits: {
        "5KM": LIMIT_5KM,
        "10KM": LIMIT_10KM,
      },
      isClosed: {
        "5KM": true,
        "10KM": true,
      },
      isFullyClosed: true,
      message: "Active Salem 4.0 registration has officially closed as the event date has ended.",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      nextRegistrationCode: "SALEM26-0001",
      nextId: 1,
      counts: { "5KM": 0, "10KM": 0 },
      limits: { "5KM": LIMIT_5KM, "10KM": LIMIT_10KM },
      isClosed: { "5KM": true, "10KM": true },
      isFullyClosed: true,
      message: "Active Salem 4.0 registration has officially closed as the event date has ended.",
    });
  }
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Active Salem 4.0 registration has officially closed as the event date has ended. No new registrations are accepted.",
    },
    { status: 403 }
  );
}
