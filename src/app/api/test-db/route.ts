import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT id, name, email, username, role, status, created_at FROM super_admins LIMIT 5");
    return NextResponse.json({
      success: true,
      message: "Database connection successful via .env!",
      database: process.env.DB_NAME,
      superAdmins: rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
