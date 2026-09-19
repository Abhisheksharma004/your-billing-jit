import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SUPERADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SUPERADMIN_COOKIE_NAME);

    return NextResponse.json({
      success: true,
      message: "Superadmin logged out successfully",
    });
  } catch (error: any) {
    console.error("Superadmin logout error:", error);
    return NextResponse.json(
      { success: false, message: "Error during logout", error: error.message },
      { status: 500 }
    );
  }
}
