import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

/**
 * POST /api/signup/verify-otp
 * Verifies a 7-digit OTP against the email_otps table.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (cleanOtp.length !== 7 || !/^\d{7}$/.test(cleanOtp)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 7-digit OTP." },
        { status: 400 }
      );
    }

    // Find the latest unexpired, unverified OTP for this email
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, otp FROM email_otps 
       WHERE email = ? AND verified = 0 AND expires_at > NOW() 
       ORDER BY id DESC LIMIT 1`,
      [cleanEmail]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "OTP expired or not found. Please request a new one." },
        { status: 400 }
      );
    }

    if (rows[0].otp !== cleanOtp) {
      return NextResponse.json(
        { success: false, error: "Incorrect OTP. Please check and try again." },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await pool.query(
      "UPDATE email_otps SET verified = 1 WHERE id = ?",
      [rows[0].id]
    );

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error: unknown) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
