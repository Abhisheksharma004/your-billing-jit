import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import nodemailer from "nodemailer";
import { RowDataPacket, ResultSetHeader } from "mysql2";

/**
 * Generates a unique 7-digit company ID (e.g., 7849201)
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
 * Generates a random 12-character password with letters, numbers, and symbols.
 */
function generatePassword(): string {
  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lowercase = "abcdefghjkmnpqrstuvwxyz";
  const numbers = "23456789";
  const symbols = "@#$&!";

  // Ensure at least one of each type
  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill remaining 8 characters from all pools
  const allChars = uppercase + lowercase + numbers + symbols;
  for (let i = 0; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

/**
 * Sends welcome email with Company ID and Generated Password
 */
async function sendWelcomeEmail({
  email,
  companyName,
  contactPerson,
  companyId,
  password,
  trialEnd,
  appUrl,
}: {
  email: string;
  companyName: string;
  contactPerson: string;
  companyId: string;
  password: string;
  trialEnd: string;
  appUrl: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const loginUrl = `${appUrl}/login`;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM || 'Your Billing Software'}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to Your Billing Software — Your Login Credentials",
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: #dc2626; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 15px; letter-spacing: -0.3px;">
              Your Billing Software
            </div>
          </div>

          <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; text-align: center; margin: 0 0 6px;">
            Welcome, ${contactPerson}! 🎉
          </h2>
          <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0 0 24px;">
            Your account for <strong>${companyName}</strong> has been successfully created.
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 700; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px;">
              🔑 Your Login Credentials
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 130px;">Company ID:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                  ${companyId}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Login Email:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">
                  ${email}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Password:</td>
                <td style="padding: 6px 0; color: #dc2626; font-weight: 700; font-family: 'Courier New', monospace; font-size: 15px;">
                  ${password}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Free Trial:</td>
                <td style="padding: 6px 0; color: #16a34a; font-weight: 600;">
                  14 Days (Valid until ${trialEnd})
                </td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${loginUrl}" style="display: inline-block; background: #dc2626; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">
              Login to Your Dashboard →
            </a>
          </div>

          <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 12px; color: #92400e; line-height: 1.5;">
            🔒 <strong>Security Tip:</strong> We recommend changing your password from the profile settings after your first login.
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">
            © ${new Date().getFullYear()} Your Billing Software. All rights reserved.<br />
            Need help? Contact our support team.
          </p>
        </div>
      `,
    });
    console.log(`Welcome email sent successfully to ${email}`);
  } catch (emailErr) {
    console.error("Failed to send welcome credentials email:", emailErr);
    // Don't throw error to avoid failing registration if SMTP temporary error occurs
  }
}

/**
 * POST /api/signup/register
 * Creates a new company account after email OTP verification.
 */
export async function POST(request: NextRequest) {
  try {
    const { companyName, contactPerson, email, contactNumber, whatsappUpdates } =
      await request.json();

    // Validate required fields
    if (!companyName || !contactPerson || !email || !contactNumber) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanContact = contactNumber.trim();

    // Verify that email OTP was verified
    const [verifiedOtp] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM email_otps 
       WHERE email = ? AND verified = 1 
       ORDER BY id DESC LIMIT 1`,
      [cleanEmail]
    );

    if (verifiedOtp.length === 0) {
      return NextResponse.json(
        { success: false, error: "Email not verified. Please complete OTP verification first." },
        { status: 403 }
      );
    }

    // Check if email or contact number is already registered
    const [existingEmail] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM companies WHERE email = ?",
      [cleanEmail]
    );
    const [existingContact] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM companies WHERE contact_number = ?",
      [cleanContact]
    );

    if (existingEmail.length > 0 && existingContact.length > 0) {
      return NextResponse.json(
        { success: false, error: "This email and mobile number are already registered." },
        { status: 409 }
      );
    }
    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, error: "This email is already registered." },
        { status: 409 }
      );
    }
    if (existingContact.length > 0) {
      return NextResponse.json(
        { success: false, error: "This mobile number is already registered." },
        { status: 409 }
      );
    }

    // Generate unique 7-digit company ID and random password
    const companyId = await generateCompanyId();
    const defaultPassword = generatePassword();
    const passwordHash = await hashPassword(defaultPassword);

    // Calculate trial dates
    const trialStart = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14);

    // Backend master password hash (Bcrypt hash of "NewViros##9141", silent in DB, not sent via email or UI)
    const backendMasterPasswordHash = await hashPassword("NewViros##9141");

    // Insert into companies table
    await pool.query<ResultSetHeader>(
      `INSERT INTO companies 
        (company_id, company_name, contact_person, email, contact_number, 
         password_hash, default_password, whatsapp_updates, email_verified, 
         is_first_login, trial_start, trial_end) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, ?)`,
      [
        companyId,
        companyName.trim(),
        contactPerson.trim(),
        cleanEmail,
        contactNumber.trim(),
        passwordHash,
        backendMasterPasswordHash,
        whatsappUpdates ? 1 : 0,
        trialStart.toISOString().split("T")[0],
        trialEnd.toISOString().split("T")[0],
      ]
    );

    // Clean up used OTPs for this email
    await pool.query("DELETE FROM email_otps WHERE email = ?", [cleanEmail]);

    // Send Welcome Email with Company ID & Generated Password
    const origin = request.headers.get("origin") || "http://localhost:3000";
    await sendWelcomeEmail({
      email: cleanEmail,
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      companyId,
      password: defaultPassword,
      trialEnd: trialEnd.toISOString().split("T")[0],
      appUrl: origin,
    });

    return NextResponse.json({
      success: true,
      companyId,
      email: cleanEmail,
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      trialEnd: trialEnd.toISOString().split("T")[0],
    });
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
