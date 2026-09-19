import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import { verifySessionToken, SUPERADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SUPERADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No active session" },
        { status: 401 }
      );
    }

    const payload: any = await verifySessionToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session token" },
        { status: 401 }
      );
    }

    // Verify admin is still active in database
    const [rows]: any = await pool.query(
      "SELECT id, name, email, username, role, status, last_login_at FROM super_admins WHERE id = ? LIMIT 1",
      [payload.id]
    );

    if (!rows || rows.length === 0 || rows[0].status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, message: "Account not found or inactive" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: rows[0],
    });
  } catch (error: any) {
    console.error("Superadmin me error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify session", error: error.message },
      { status: 500 }
    );
  }
}
