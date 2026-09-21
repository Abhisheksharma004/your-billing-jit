import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, verifyPassword, signTenantSessionToken, TENANT_COOKIE_NAME } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId, currentPassword, newPassword } = body;

    const cleanCompanyId = (companyId || "").trim();
    const cleanCurrentPassword = (currentPassword || "").trim();
    const cleanNewPassword = (newPassword || "").trim();

    if (!cleanCompanyId || !cleanNewPassword) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (cleanNewPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Fetch company record
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, company_id, company_name, contact_person, email, password_hash, default_password, is_first_login
       FROM companies 
       WHERE company_id = ? OR LOWER(email) = LOWER(?)
       LIMIT 1`,
      [cleanCompanyId, cleanCompanyId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Account not found." },
        { status: 404 }
      );
    }

    const company = rows[0];

    // Optional verification of current password if provided
    if (cleanCurrentPassword) {
      let isCurrentValid = await verifyPassword(cleanCurrentPassword, company.password_hash);
      if (!isCurrentValid && company.default_password) {
        isCurrentValid = await verifyPassword(cleanCurrentPassword, company.default_password);
      }
      if (!isCurrentValid) {
        return NextResponse.json(
          { success: false, error: "Current temporary password verification failed." },
          { status: 401 }
        );
      }
    }

    // Hash new permanent password
    const newPasswordHash = await hashPassword(cleanNewPassword);

    // Update company: set new password_hash and set is_first_login = 0
    await pool.query<ResultSetHeader>(
      `UPDATE companies 
       SET password_hash = ?, is_first_login = 0 
       WHERE id = ?`,
      [newPasswordHash, company.id]
    );

    // Generate JWT Session Token
    const token = await signTenantSessionToken({
      id: company.id,
      companyId: company.company_id,
      companyName: company.company_name,
      email: company.email,
      contactPerson: company.contact_person,
    });

    const response = NextResponse.json({
      success: true,
      message: "Permanent password set successfully! Welcome to your ERP dashboard.",
      companyId: company.company_id,
      companyName: company.company_name,
      contactPerson: company.contact_person,
      email: company.email,
    });

    // Set auth cookie
    response.cookies.set(TENANT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Set first password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update password. Please try again." },
      { status: 500 }
    );
  }
}
