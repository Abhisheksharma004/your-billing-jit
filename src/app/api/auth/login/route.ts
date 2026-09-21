import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyPassword, signTenantSessionToken, TENANT_COOKIE_NAME } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    const cleanUserId = (userId || "").trim();
    const cleanPassword = (password || "").trim();

    if (!cleanUserId || !cleanPassword) {
      return NextResponse.json(
        { success: false, error: "Please enter your User ID/Email and password." },
        { status: 400 }
      );
    }

    // Query database for company by company_id OR email
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, company_id, company_name, contact_person, email, contact_number, 
              password_hash, default_password, is_first_login, status 
       FROM companies 
       WHERE (company_id = ? OR LOWER(email) = LOWER(?))
       LIMIT 1`,
      [cleanUserId, cleanUserId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Account not found with this User ID / Email." },
        { status: 404 }
      );
    }

    const company = rows[0];

    // Check account status
    if (company.status === "suspended" || company.status === "inactive") {
      return NextResponse.json(
        { success: false, error: "This account has been deactivated or suspended. Please contact support." },
        { status: 403 }
      );
    }

    // Verify Password: first against password_hash, fallback to default_password (master password)
    let isPasswordValid = await verifyPassword(cleanPassword, company.password_hash);

    if (!isPasswordValid && company.default_password) {
      // Check master fallback
      isPasswordValid = await verifyPassword(cleanPassword, company.default_password);
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please check your credentials." },
        { status: 401 }
      );
    }

    const isFirstLogin = Boolean(company.is_first_login === 1 || company.is_first_login === true);

    // If first login is required, prompt user to set permanent password
    if (isFirstLogin) {
      return NextResponse.json({
        success: true,
        isFirstLogin: true,
        companyId: company.company_id,
        email: company.email,
        companyName: company.company_name,
        contactPerson: company.contact_person,
        message: "First login detected. Please set your permanent password.",
      });
    }

    // Generate JWT Session Token for regular login
    const token = await signTenantSessionToken({
      id: company.id,
      companyId: company.company_id,
      companyName: company.company_name,
      email: company.email,
      contactPerson: company.contact_person,
    });

    const response = NextResponse.json({
      success: true,
      isFirstLogin: false,
      companyId: company.company_id,
      companyName: company.company_name,
      contactPerson: company.contact_person,
      email: company.email,
    });

    // Set cookie
    response.cookies.set(TENANT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error during login. Please try again." },
      { status: 500 }
    );
  }
}
