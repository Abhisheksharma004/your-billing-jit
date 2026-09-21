import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, value, email, contactNumber } = body;

    const checkEmail = (type === "email" ? value : email)?.trim().toLowerCase();
    const checkContact = (type === "contact" ? value : contactNumber)?.trim();

    if (checkEmail && checkEmail.includes("@")) {
      const [existing] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM companies WHERE email = ? LIMIT 1",
        [checkEmail]
      );
      if (existing.length > 0) {
        return NextResponse.json({
          available: false,
          field: "email",
          error: "This email is already registered. Please log in instead.",
        });
      }
    }

    if (checkContact && checkContact.length === 10) {
      const [existing] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM companies WHERE contact_number = ? LIMIT 1",
        [checkContact]
      );
      if (existing.length > 0) {
        return NextResponse.json({
          available: false,
          field: "contact",
          error: "This mobile number is already registered. Please use a different number or log in.",
        });
      }
    }

    return NextResponse.json({
      available: true,
      message: "Available",
    });
  } catch (error) {
    console.error("Check availability error:", error);
    return NextResponse.json(
      { available: true, error: "Validation check skipped" },
      { status: 500 }
    );
  }
}
