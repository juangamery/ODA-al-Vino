import { NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE } from "@/lib/catas/adminAuth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(CATAS_ADMIN_COOKIE);
  return res;
}
