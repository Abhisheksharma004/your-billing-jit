import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/gst-verify
 * Proxies GSTIN verification requests to RapidAPI's "Powerful GSTIN Tool".
 * Keeps the API key server-side for security.
 *
 * Body: { gstin: string }
 * Returns: normalized GST details or error
 */
export async function POST(request: NextRequest) {
  try {
    const { gstin } = await request.json();

    // Validate GSTIN format (15 alphanumeric characters)
    if (!gstin || typeof gstin !== "string" || gstin.trim().length !== 15) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 15-character GSTIN." },
        { status: 400 }
      );
    }

    const cleanGstin = gstin.trim().toUpperCase();

    // Basic GSTIN regex: 2-digit state code + 10-char PAN + 1 entity + 1 check digit + Z
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
    if (!gstinRegex.test(cleanGstin)) {
      return NextResponse.json(
        { success: false, error: "Invalid GSTIN format. Please check and re-enter." },
        { status: 400 }
      );
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST || "powerful-gstin-tool.p.rapidapi.com";

    if (!rapidApiKey || rapidApiKey === "your_rapidapi_key_here") {
      return NextResponse.json(
        {
          success: false,
          error: "GST API key not configured. Please add your RapidAPI key to the .env file.",
        },
        { status: 500 }
      );
    }

    // Call RapidAPI — Powerful GSTIN Tool
    const apiUrl = `https://${rapidApiHost}/v1/gstin/${encodeURIComponent(cleanGstin)}`;

    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": rapidApiHost,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15000), // 15-second timeout
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("RapidAPI GST error:", apiResponse.status, errorText);

      if (apiResponse.status === 404) {
        return NextResponse.json(
          { success: false, error: "GSTIN not found. Please verify and try again." },
          { status: 404 }
        );
      }
      if (apiResponse.status === 429) {
        return NextResponse.json(
          { success: false, error: "API rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      if (apiResponse.status === 403) {
        return NextResponse.json(
          { success: false, error: "API key unauthorized. Please check your RapidAPI subscription." },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `GST verification service returned an error (${apiResponse.status}). Please try again.`,
        },
        { status: 502 }
      );
    }

    const data = await apiResponse.json();

    // Handle error in response body
    if (data.error || data.flag === false || data.success === false) {
      return NextResponse.json(
        {
          success: false,
          error: data.message || data.error || "GSTIN not found or invalid. Please verify and try again.",
        },
        { status: 404 }
      );
    }

    // Normalize the response for the frontend
    // RapidAPI Powerful GSTIN Tool response fields:
    //   gstin, legal_name, trade_name, status, taxpayer_type,
    //   registration_date, principal_place_of_business.address,
    //   business_nature[], is_active, constitution_of_business,
    //   state_jurisdiction, center_jurisdiction
    const gstDetails = {
      success: true,
      gstin: data.gstin || cleanGstin,
      legalName: data.legal_name || data.lgnm || "",
      tradeName: data.trade_name || data.tradeNam || "",
      status: data.status || data.sts || "",
      isActive: data.is_active ?? (data.status === "Active"),
      registrationDate: data.registration_date || data.rgdt || "",
      taxpayerType: data.taxpayer_type || data.dty || "",
      constitutionOfBusiness: data.constitution_of_business || data.ctb || "",
      businessNature: data.business_nature || data.nba || [],
      principalAddress:
        data.principal_place_of_business?.address ||
        data.pradr?.adr ||
        "",
      stateJurisdiction: data.state_jurisdiction || data.stj || "",
      centerJurisdiction: data.center_jurisdiction || data.ctj || "",
    };

    return NextResponse.json(gstDetails);
  } catch (error: unknown) {
    console.error("GST verification error:", error);

    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { success: false, error: "GST verification service timed out. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
