import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import { verifyPassword, signSessionToken, SUPERADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    if (!userId || !password) {
      return NextResponse.json(
        { success: false, message: "Superadmin ID/Email and Password are required." },
        { status: 400 }
      );
    }

    // Query super admin from MySQL
    const [rows]: any = await pool.query(
      "SELECT id, name, email, username, password, role, status FROM super_admins WHERE username = ? OR email = ? LIMIT 1",
      [userId.trim(), userId.trim()]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid Superadmin credentials." },
        { status: 401 }
      );
    }

    const admin = rows[0];

    if (admin.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, message: "This Superadmin account is currently suspended or inactive." },
        { status: 403 }
      );
    }

    // Verify bcrypt password
    const isPasswordValid = await verifyPassword(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid Superadmin credentials." },
        { status: 401 }
      );
    }

    // Update last_login_at
    await pool.query(
      "UPDATE super_admins SET last_login_at = NOW() WHERE id = ?",
      [admin.id]
    );

    // Create JWT Session Token
    const token = await signSessionToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(SUPERADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error("Superadmin login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during authentication.", error: error.message },
      { status: 500 }
    );
  }
}
