import { NextRequest, NextResponse } from "next/server";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  const email = (request.nextUrl.searchParams.get("email") ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  try {
    const result = await checkParticipant(email);
    if (!result.is_participant || !result.participant) {
      return NextResponse.json({ is_participant: false });
    }
    const { first_name, last_name } = result.participant;
    return NextResponse.json({ is_participant: true, nombre: `${first_name} ${last_name}`.trim() });
  } catch (e) {
    // Chequeo en vivo: si el API externo falla (timeout, rate limit, token rotado),
    // no bloqueamos al usuario mientras escribe — el submit vuelve a validar,
    // ahí sí de forma estricta.
    console.error("verificar-participante error:", e instanceof ParticipantsApiError ? e.code : e);
    return NextResponse.json({ is_participant: null });
  }
}
