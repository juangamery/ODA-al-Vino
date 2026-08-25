import { NextRequest, NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const [{ data: registrations, error: regError }, { data: cupos, error: cuposError }] = await Promise.all([
    supabase
      .from("catas_registrations")
      .select("id, nombre, contacto, created_at, catas_selections(day, slot, sala_id, bodega)")
      .order("created_at", { ascending: false }),
    supabase.from("catas_cupos").select("day, slot, sala_id, ocupados, cupo_max"),
  ]);

  if (regError || cuposError) {
    console.error("admin data error:", regError ?? cuposError);
    return NextResponse.json({ error: "No se pudo cargar la información" }, { status: 500 });
  }

  return NextResponse.json({ registrations, cupos });
}
