import { NextRequest, NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";

/**
 * Borra una inscripción completa (todas las salas que eligió esa persona)
 * y libera el cupo correspondiente. Ver catas_eliminar_inscripcion en la
 * migración 0002.
 */
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "Falta el id de la inscripción" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc("catas_eliminar_inscripcion", { p_registration_id: body.id });

  if (error) {
    console.error("eliminar inscripcion error:", error);
    return NextResponse.json({ error: "No se pudo eliminar la inscripción." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
