import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: { adminId: number; email: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { adminId: number; email: string } | null {
  try {
    return jwt.verify(token, SECRET) as { adminId: number; email: string };
  } catch {
    return null;
  }
}

export function getAdminFromCookies(): { adminId: number; email: string } | null {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
