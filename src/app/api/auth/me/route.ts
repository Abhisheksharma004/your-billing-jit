import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import { verifySessionToken, TENANT_COOKIE_NAME } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TENANT_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No active session" },
        { status: 401 }
      );
    }

    const payload: any = await verifySessionToken(token);
    if (!payload || !payload.companyId) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session token" },
        { status: 401 }
      );
    }

    // Fetch fresh company details from database
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, company_id, company_name, contact_person, email, contact_number, 
              whatsapp_updates, email_verified, is_first_login, status, trial_start, trial_end, created_at 
       FROM companies 
       WHERE company_id = ? OR id = ? 
       LIMIT 1`,
      [payload.companyId, payload.id || 0]
    );

    if (rows.length === 0 || rows[0].status === "suspended" || rows[0].status === "inactive") {
      return NextResponse.json(
        { success: false, message: "Company account inactive or not found" },
        { status: 401 }
      );
    }

    const company = rows[0];

    return NextResponse.json({
      success: true,
      company: {
        id: company.id,
        companyId: company.company_id,
        companyName: company.company_name,
        contactPerson: company.contact_person,
        email: company.email,
        contactNumber: company.contact_number,
        trialStart: company.trial_start,
        trialEnd: company.trial_end,
        status: company.status,
      },
    });
  } catch (error: any) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching session", error: error.message },
      { status: 500 }
    );
  }
}
