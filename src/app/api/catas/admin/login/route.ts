import { NextRequest, NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE, checkAdminPasscode, createAdminSessionToken } from "@/lib/catas/adminAuth";

export async function POST(request: NextRequest) {
  let body: { passcode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const passcode = body.passcode ?? "";
  let valid: boolean;
  try {
    valid = !!passcode && checkAdminPasscode(passcode);
  } catch (e) {
    console.error("admin login config error:", e);
    return NextResponse.json(
      { error: "El panel no está configurado: falta CATAS_ADMIN_PASSCODE en las variables de entorno." },
      { status: 500 }
    );
  }
  if (!valid) {
    return NextResponse.json({ error: "Clave incorrecta." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(CATAS_ADMIN_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
