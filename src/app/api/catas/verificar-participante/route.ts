import { NextRequest, NextResponse } from "next/server";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";

export async function GET(request: NextRequest) {
  const document = (request.nextUrl.searchParams.get("document") ?? "").trim();

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
      nombre: `${first_name} ${last_name}`.trim(),
      email: email || undefined,
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
