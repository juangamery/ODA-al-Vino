import { NextRequest, NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { salaById } from "@/lib/catas/schedule";

/**
 * Cambia el cupo máximo de una sala, aplicado a todas sus catas (ambos días,
 * todos los horarios) — se piensa "por sala", no por franja puntual.
 */
export async function PATCH(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: { salaId?: string; cupoMax?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const sala = salaById(body.salaId ?? "");
  const cupoMax = Number(body.cupoMax);

  if (!sala) {
    return NextResponse.json({ error: "Sala inválida" }, { status: 400 });
  }
  if (!Number.isInteger(cupoMax) || cupoMax < 1) {
    return NextResponse.json({ error: "El cupo debe ser un número entero mayor a 0." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("catas_cupos").update({ cupo_max: cupoMax }).eq("sala_id", sala.id);

  if (error) {
    console.error("admin cupo update error:", error);
    return NextResponse.json({ error: "No se pudo actualizar el cupo." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
