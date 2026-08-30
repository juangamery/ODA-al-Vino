import { NextRequest, NextResponse } from "next/server";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";

/**
 * El CRM devuelve nombres en mayúsculas ("JAIR ALFONSO KAO"). Los pasamos a
 * Título Inicial porque se autocompletan en un input editable y en la
 * confirmación se muestran con una tipografía manuscrita, que en mayúsculas
 * sostenidas se ve mal.
 */
function toTitleCase(value: string): string {
  return value.toLowerCase().replace(/(^|[\s'-])\p{L}/gu, (c) => c.toUpperCase());
}

export async function GET(request: NextRequest) {
  // Mayúsculas: algunos documentos son códigos alfanuméricos (no sólo DNI
  // numérico), y si alguien lo tipea en minúscula, una comparación exacta
  // del lado del CRM podría no encontrarlo aunque sea el documento correcto.
  const document = (request.nextUrl.searchParams.get("document") ?? "").trim().toUpperCase();

  // Sin formato estándar (DNI, CPF, RUT, Cédula) — sólo exigimos que no esté vacío.
  if (!document) {
    return NextResponse.json({ error: "Documento inválido" }, { status: 400 });
  }

  try {
    const result = await checkParticipant(document);
    if (!result.is_participant || !result.participant) {
      return NextResponse.json({ is_participant: false });
    }
    const { first_name, last_name, email } = result.participant;
    return NextResponse.json({
      is_participant: true,
      nombre: toTitleCase(`${first_name} ${last_name}`.trim()),
      email: email ? email.toLowerCase() : undefined,
    });
  } catch (e) {
    // Chequeo en vivo: si el API externo falla (timeout, rate limit, token rotado),
    // no bloqueamos al usuario mientras escribe — el submit vuelve a validar,
    // ahí sí de forma estricta.
    console.error(
      "verificar-participante error:",
      e instanceof ParticipantsApiError ? `${e.code} status=${e.status} body=${e.body}` : e
    );
    return NextResponse.json({ is_participant: null });
  }
}
