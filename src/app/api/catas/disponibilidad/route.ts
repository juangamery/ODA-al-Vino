import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { cataId } from "@/lib/catas/schedule";

export const dynamic = "force-dynamic";

/**
 * Cupos ocupados por cata puntual. Público (sin datos personales) —
 * el formulario lo consulta para mostrar/bloquear tarjetas en tiempo real.
 */
export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("catas_cupos")
    .select("day, slot, sala_id, ocupados, cupo_max");

  if (error) {
    console.error("disponibilidad error:", error);
    return NextResponse.json({ error: "No se pudo cargar la disponibilidad" }, { status: 500 });
  }

  const counts: Record<string, number> = {};
  const cupoMax: Record<string, number> = {};
  for (const row of data ?? []) {
    const id = cataId(row.day, row.slot, row.sala_id);
    counts[id] = row.ocupados;
    cupoMax[id] = row.cupo_max;
  }

  return NextResponse.json({ counts, cupoMax });
}
