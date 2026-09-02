import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { getCata, salaById, type DayId, type SalaId } from "@/lib/catas/schedule";

export const dynamic = "force-dynamic";

interface SelectionRow {
  day: DayId;
  slot: string;
  sala_id: SalaId;
}

interface RegistrationRow {
  nombre: string;
  catas_selections: SelectionRow[];
}

const DAY_ORDER: Record<DayId, number> = { viernes: 0, sabado: 1 };

/**
 * Consulta pública de "a qué salas quedé inscripto" — misma lógica de
 * identificación que /api/catas/verificar-participante (buscar por
 * documento, sin login). Si la persona se anotó en más de un envío queda
 * repartida en varias filas de catas_registrations con el mismo documento;
 * acá se juntan todas para mostrar la selección completa en un solo resultado.
 */
export async function GET(request: NextRequest) {
  const documento = (request.nextUrl.searchParams.get("documento") ?? "").trim().toUpperCase();
  if (!documento) {
    return NextResponse.json({ error: "Falta el documento" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("catas_registrations")
    .select("nombre, catas_selections(day, slot, sala_id)")
    .eq("documento", documento);

  if (error) {
    console.error("mi-inscripcion fetch error:", error);
    return NextResponse.json({ error: "No se pudo consultar la inscripción" }, { status: 500 });
  }

  const rows = (data ?? []) as unknown as RegistrationRow[];
  if (rows.length === 0) {
    return NextResponse.json({ found: false });
  }

  const vistas = new Set<string>();
  const catas = rows
    .flatMap((r) => r.catas_selections)
    .filter((s) => {
      const key = `${s.day}__${s.slot}__${s.sala_id}`;
      if (vistas.has(key)) return false;
      vistas.add(key);
      return true;
    })
    .map((s) => ({
      day: s.day,
      slot: s.slot,
      salaNombre: salaById(s.sala_id)?.nombre ?? s.sala_id,
      bodega: getCata(s.day, s.slot, s.sala_id)?.bodega ?? "",
    }))
    .sort((a, b) => DAY_ORDER[a.day] - DAY_ORDER[b.day] || a.slot.localeCompare(b.slot));

  return NextResponse.json({ found: true, nombre: rows[0].nombre, catas });
}
