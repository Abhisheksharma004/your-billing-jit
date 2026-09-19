import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM subscription_plans WHERE status = 'active' ORDER BY monthly_price ASC"
    );

    const plans = rows.map((r: any) => {
      let parsedFeatures = [];
      try {
        parsedFeatures = typeof r.features === "string" ? JSON.parse(r.features) : (r.features || []);
      } catch {
        parsedFeatures = [];
      }
      return {
        ...r,
        monthly_price: Number(r.monthly_price),
        features: parsedFeatures,
        is_popular: Boolean(r.is_popular),
      };
    });

    return NextResponse.json({
      success: true,
      plans,
    });
  } catch (error: any) {
    console.error("Fetch plans error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      tagline,
      billingCycle = "monthly",
      monthlyPrice = 0,
      maxUsers = "5",
      ewayLimit = "2,500",
      trialDays = 14,
      ctaText = "Start 14-Day Free Trial",
      isPopular = false,
      description = "",
      features = [],
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Plan name is required" },
        { status: 400 }
      );
    }

    const cleanFeatures = Array.isArray(features)
      ? features.map((f: any) => (typeof f === "string" ? f.trim() : "")).filter(Boolean)
      : [];

    const numMonthlyPrice = parseFloat(monthlyPrice) || 0;
    const numTrialDays = parseInt(trialDays) || 14;
    const isPopularVal = isPopular ? 1 : 0;

    const [result]: any = await pool.query(
      `INSERT INTO subscription_plans 
       (name, tagline, billing_cycle, monthly_price, max_users, eway_limit, trial_days, cta_text, is_popular, description, features, subscribers_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        name.trim(),
        tagline?.trim() || null,
        billingCycle,
        numMonthlyPrice,
        maxUsers?.toString() || "5",
        ewayLimit?.toString() || "2,500",
        numTrialDays,
        ctaText?.trim() || "Start 14-Day Free Trial",
        isPopularVal,
        description?.trim() || null,
        JSON.stringify(cleanFeatures),
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Plan created successfully",
      planId: result.insertId,
    });
  } catch (error: any) {
    console.error("Create plan error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      tagline,
      billingCycle = "monthly",
      monthlyPrice = 0,
      maxUsers = "5",
      ewayLimit = "2,500",
      trialDays = 14,
      ctaText = "Start 14-Day Free Trial",
      isPopular = false,
      description = "",
      features = [],
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Plan ID is required for update" },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Plan name is required" },
        { status: 400 }
      );
    }

    const cleanFeatures = Array.isArray(features)
      ? features.map((f: any) => (typeof f === "string" ? f.trim() : "")).filter(Boolean)
      : [];

    const numMonthlyPrice = parseFloat(monthlyPrice) || 0;
    const numTrialDays = parseInt(trialDays) || 14;
    const isPopularVal = isPopular ? 1 : 0;

    await pool.query(
      `UPDATE subscription_plans 
       SET name = ?, tagline = ?, billing_cycle = ?, monthly_price = ?, max_users = ?, eway_limit = ?, trial_days = ?, cta_text = ?, is_popular = ?, description = ?, features = ?
       WHERE id = ?`,
      [
        name.trim(),
        tagline?.trim() || null,
        billingCycle,
        numMonthlyPrice,
        maxUsers?.toString() || "5",
        ewayLimit?.toString() || "2,500",
        numTrialDays,
        ctaText?.trim() || "Start 14-Day Free Trial",
        isPopularVal,
        description?.trim() || null,
        JSON.stringify(cleanFeatures),
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Plan updated successfully",
    });
  } catch (error: any) {
    console.error("Update plan error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // no body
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Plan ID is required to delete" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM subscription_plans WHERE id = ?", [id]);

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete plan error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
