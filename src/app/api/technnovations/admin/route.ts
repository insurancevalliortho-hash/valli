import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

const ADMIN_PASSWORD = "ValliAdmin2026!";

// GET / POST to fetch all registrations securely
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
      SELECT * FROM technovations_registrations
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ success: true, data: registrations });
  } catch (error: any) {
    console.error("Admin API Error:", error);
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
      DELETE FROM technovations_registrations
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin DELETE API Error:", error);
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
      UPDATE technovations_registrations
      SET is_verified = ${isVerified}
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin PATCH API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
