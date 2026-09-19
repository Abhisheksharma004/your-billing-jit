import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const SALT_ROUNDS = 10;
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "superadmin_jwt_secret_your_billing_jit_2026_secure"
);

export const SUPERADMIN_COOKIE_NAME = "superadmin_session";

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a plain text password against a stored bcrypt hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Sign a JWT token for the authenticated superadmin session
 */
export async function signSessionToken(payload: {
  id: number;
  username: string;
  email: string;
  role: string;
}): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
