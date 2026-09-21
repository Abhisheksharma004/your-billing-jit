import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import nodemailer from "nodemailer";
import { RowDataPacket } from "mysql2";

/**
 * POST /api/signup/send-otp
 * Generates a 7-digit OTP and sends it to the provided email.
 * Rate-limited: max 1 OTP per email per 60 seconds.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, contactNumber } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanContact = contactNumber ? String(contactNumber).trim() : "";

    // Check if email is already registered
    const [existingEmail] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM companies WHERE email = ?",
      [cleanEmail]
    );

    // Check if contact number is already registered
    let existingContact: RowDataPacket[] = [];
    if (cleanContact) {
      const [res] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM companies WHERE contact_number = ?",
        [cleanContact]
      );
      existingContact = res;
    }

    if (existingEmail.length > 0 && existingContact.length > 0) {
      return NextResponse.json(
        { success: false, error: "This email and mobile number are already registered. Please log in instead." },
        { status: 409 }
      );
    }

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, error: "This email is already registered. Please log in instead." },
        { status: 409 }
      );
    }

    if (existingContact.length > 0) {
      return NextResponse.json(
        { success: false, error: "This mobile number is already registered. Please use a different number or log in." },
        { status: 409 }
      );
    }

    // Rate limit: check if an OTP was sent in the last 60 seconds
    const [recentOtp] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM email_otps WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 60 SECOND) ORDER BY id DESC LIMIT 1",
      [cleanEmail]
    );
    if (recentOtp.length > 0) {
      return NextResponse.json(
        { success: false, error: "OTP already sent. Please wait 60 seconds before requesting again." },
        { status: 429 }
      );
    }

    // Generate 7-digit OTP
    const otp = String(Math.floor(1000000 + Math.random() * 9000000));

    // Store OTP in database (expires in 10 minutes)
    await pool.query(
      "INSERT INTO email_otps (email, otp, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))",
      [cleanEmail, otp]
    );

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: cleanEmail,
      subject: "Your Billing Software — Email Verification OTP",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: #dc2626; color: white; padding: 8px 12px; border-radius: 8px; font-weight: 800; font-size: 14px; letter-spacing: -0.3px;">
              Your Billing Software
            </div>
          </div>
          <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; text-align: center; margin: 0 0 8px;">
            Email Verification
          </h2>
          <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0 0 24px;">
            Use the OTP below to verify your email and complete registration.
          </p>
          <div style="background: #fef2f2; border: 2px dashed #fca5a5; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #dc2626; font-family: 'Courier New', monospace;">
              ${otp}
            </div>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
            This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #cbd5e1; font-size: 11px; text-align: center; margin: 0;">
            If you didn't request this, please ignore this email.<br />
            © ${new Date().getFullYear()} Your Billing Software
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully to your email.",
    });
  } catch (error: unknown) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
