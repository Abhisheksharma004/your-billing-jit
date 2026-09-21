import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TENANT_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(TENANT_COOKIE_NAME);

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Explicitly delete cookie in response header
    response.cookies.set(TENANT_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Tenant logout error:", error);
    return NextResponse.json(
      { success: false, message: "Error during logout", error: error.message },
      { status: 500 }
    );
  }
}
