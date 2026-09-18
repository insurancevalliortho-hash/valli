import { NextResponse } from "next/server";
import { getPgPool } from "../../../../lib/db";

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

    const pool = getPgPool();
    const res = await pool.query(
      `SELECT * FROM active_salem_registrations ORDER BY created_at DESC;`
    );

    return NextResponse.json({ success: true, data: res.rows });
  } catch (error: any) {
    console.error("Active Salem Admin API Error:", error);
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

    const pool = getPgPool();
    await pool.query(
      `DELETE FROM active_salem_registrations WHERE id = $1;`,
      [id]
    );

    return NextResponse.json({ success: true, message: "Registration deleted successfully" });
  } catch (error: any) {
    console.error("Active Salem Admin Delete Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH to update verification status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const password = body.password;
    const id = body.id;
    const is_verified = body.is_verified ?? body.isVerified ?? false;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    const pool = getPgPool();
    await pool.query(
      `UPDATE active_salem_registrations SET is_verified = $1 WHERE id = $2;`,
      [is_verified, id]
    );

    return NextResponse.json({ success: true, message: "Verification status updated" });
  } catch (error: any) {
    console.error("Active Salem Admin Patch Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
