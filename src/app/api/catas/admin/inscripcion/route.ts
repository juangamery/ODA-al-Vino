import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { getCata, salaById, validateSelections, type Selection } from "@/lib/catas/schedule";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Alta manual desde el panel admin — para casos como alguien a quien el
 * validador de documento contra el CRM no le funciona por algún motivo
 * puntual. A diferencia de /api/catas/inscribir, NO llama al CRM: el
 * organizador ya asume la responsabilidad de confirmar a mano que es un
 * participante válido. Sí respeta las mismas reglas de negocio (máximo 2
 * catas por día, sin conflicto de horario, cupo disponible) porque usa la
 * misma función atómica catas_inscribir.
 *
 * Documento y contacto son opcionales acá (a diferencia del formulario
 * público) — hay casos donde el organizador sólo tiene el nombre a mano.
 * catas_inscribir exige ambos campos no vacíos, así que si faltan se generan
 * placeholders únicos ("SIN-DOCUMENTO-...", "sin-contacto+...@..."): no
 * apuntan a nadie real, no reciben mail de confirmación, y como son únicos
 * no chocan entre sí ni afectan el límite de 2 catas/día de otras personas.
 */
export async function POST(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: { nombre?: string; contacto?: string; documento?: string; selections?: Selection[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const nombre = (body.nombre ?? "").trim();
  const contactoIngresado = (body.contacto ?? "").trim().toLowerCase();
  // Mayúsculas: consistente con /api/catas/inscribir, para que el límite de
  // 2 catas/día por documento no se pueda esquivar con otra capitalización.
  const documentoIngresado = (body.documento ?? "").trim().toUpperCase();
  const selections = Array.isArray(body.selections) ? body.selections : [];

  if (!nombre) {
    return NextResponse.json({ error: "Completá al menos el nombre." }, { status: 400 });
  }
  if (contactoIngresado && !EMAIL_RE.test(contactoIngresado)) {
    return NextResponse.json({ error: "Ingresá un email válido, o dejalo vacío si no lo tenés." }, { status: 400 });
  }

  const contacto = contactoIngresado || `sin-contacto+${randomUUID()}@sin-datos.odaalvino.local`;
  const documento = documentoIngresado || `SIN-DOCUMENTO-${randomUUID().slice(0, 8).toUpperCase()}`;

  const validation = validateSelections(selections);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const payload = selections.map((sel) => {
    const cata = getCata(sel.day, sel.slot, sel.salaId)!;
    return { day: sel.day, slot: sel.slot, salaId: sel.salaId, bodega: cata.bodega };
  });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc("catas_inscribir", {
    p_nombre: nombre,
    p_contacto: contacto,
    p_documento: documento,
    p_selections: payload,
  });

  if (error) {
    if (error.message?.includes("CUPO_LLENO")) {
      const [, day, slot, salaId] = error.message.split(":");
      const sala = salaById(salaId);
      const cata = getCata(day as Selection["day"], slot, salaId as Selection["salaId"]);
      const label = cata ? `"${cata.bodega}" (${sala?.nombre ?? salaId}, ${slot})` : "";
      return NextResponse.json({ error: `${label} se quedó sin cupo justo ahora.`.trim() }, { status: 409 });
    }
    if (error.message?.includes("LIMITE_DIA")) {
      return NextResponse.json(
        { error: "Este documento ya tiene el máximo de 2 catas anotadas para ese día." },
        { status: 409 }
      );
    }
    console.error("alta manual error:", error);
    return NextResponse.json({ error: "No se pudo guardar la inscripción." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

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
