import { NextRequest, NextResponse } from "next/server";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";

export const dynamic = "force-dynamic";

/**
 * Diagnóstico admin: pega directo a la API del CRM con un documento puntual
 * y devuelve la respuesta cruda (o el error tal cual, con status y body).
 * Pensado para casos como "este documento no lo encuentra" — permite
 * confirmar si el problema está en el CRM (dato mal cargado ahí) o en
 * nuestro código, sin que el organizador tenga que armar el request a mano
 * con curl/Postman y copiar el token.
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const document = (request.nextUrl.searchParams.get("document") ?? "").trim();
  if (!document) {
    return NextResponse.json({ error: "Falta el parámetro document" }, { status: 400 });
  }

  try {
    const result = await checkParticipant(document);
    return NextResponse.json({ ok: true, respuestaCrm: result });
  } catch (e) {
    if (e instanceof ParticipantsApiError) {
      return NextResponse.json({
        ok: false,
        codigo: e.code,
        statusHttp: e.status,
        bodyCrudoDelCrm: e.body,
      });
    }
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
}
