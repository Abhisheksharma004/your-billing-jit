import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

/**
 * Generates a unique 7-digit company ID
 */
async function generateCompanyId(): Promise<string> {
  let companyId = "";
  let isUnique = false;

  while (!isUnique) {
    const digits = String(Math.floor(1000000 + Math.random() * 9000000));
    companyId = digits;

    const [existing] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM companies WHERE company_id = ?",
      [companyId]
    );
    isUnique = existing.length === 0;
  }

  return companyId;
}

/**
 * GET /api/superadmin/companies
 * Fetch all registered tenant companies from MySQL database.
 */
export async function GET() {
  try {
    const [companies] = await pool.query<RowDataPacket[]>(
      `SELECT 
        id, 
        company_id, 
        company_name, 
        contact_person, 
        email, 
        contact_number, 
        whatsapp_updates,
        email_verified,
        status, 
        trial_start, 
        trial_end, 
        created_at, 
        updated_at 
       FROM companies 
       ORDER BY id DESC`
    );

    return NextResponse.json({
      success: true,
      companies,
      total: companies.length,
    });
  } catch (error: any) {
    console.error("Fetch companies error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/superadmin/companies
 * Superadmin direct company creation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, contactPerson, email, contactNumber, status = "active" } = body;

    if (!companyName || !companyName.trim()) {
      return NextResponse.json(
        { success: false, message: "Company name is required" },
        { status: 400 }
      );
    }

    const cleanEmail = (email || `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}_${Date.now()}@example.com`).trim().toLowerCase();
    const cleanPerson = (contactPerson || "Admin").trim();
    const cleanContact = (contactNumber || "0000000000").trim();

    // Check email uniqueness if valid email provided
    if (email) {
      const [existing] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM companies WHERE email = ?",
        [cleanEmail]
      );
      if (existing.length > 0) {
        return NextResponse.json(
          { success: false, message: "A company with this email already exists." },
          { status: 409 }
        );
      }
    }

    const companyId = await generateCompanyId();
    const defaultPasswordHash = await hashPassword("NewViros##9141");
    const userPasswordHash = await hashPassword("Welcome@123");

    const trialStart = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14);

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO companies 
        (company_id, company_name, contact_person, email, contact_number, 
         password_hash, default_password, whatsapp_updates, email_verified, 
         status, trial_start, trial_end) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1, ?, ?, ?)`,
      [
        companyId,
        companyName.trim(),
        cleanPerson,
        cleanEmail,
        cleanContact,
        userPasswordHash,
        defaultPasswordHash,
        status,
        trialStart.toISOString().split("T")[0],
        trialEnd.toISOString().split("T")[0],
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      companyId,
      id: result.insertId,
    });
  } catch (error: any) {
    console.error("Create company error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create company" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/superadmin/companies
 * Update company status (Active / Suspended / Inactive)
 */
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Company ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["active", "suspended", "inactive"];
    const cleanStatus = status.toLowerCase();

    if (!validStatuses.includes(cleanStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    await pool.query(
      "UPDATE companies SET status = ? WHERE id = ? OR company_id = ?",
      [cleanStatus, id, id]
    );

    return NextResponse.json({
      success: true,
      message: `Company status updated to ${cleanStatus}`,
    });
  } catch (error: any) {
    console.error("Update company status error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update company status" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/superadmin/companies
 * Delete a company by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {
        // no body
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Company ID is required" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM companies WHERE id = ? OR company_id = ?", [id, id]);

    return NextResponse.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete company error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete company" },
      { status: 500 }
    );
  }
}
