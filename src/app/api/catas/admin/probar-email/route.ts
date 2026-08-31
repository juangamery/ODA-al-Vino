import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";

export const dynamic = "force-dynamic";

/**
 * Diagnóstico admin: manda un mail de prueba real por Resend a la
 * dirección que se pase, sin crear ninguna inscripción — para confirmar
 * que el envío de confirmación funciona sin tener que hacer una
 * inscripción real ni molestar a un participante.
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const to = (request.nextUrl.searchParams.get("to") ?? "").trim();
  if (!to) {
    return NextResponse.json({ error: "Falta el parámetro to" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Falta RESEND_API_KEY en el entorno" });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "ODA al Vino <noreply@oda-al-vino.com>",
      to,
      subject: "Prueba de envío · ODA al Vino 2026",
      html: "<p>Este es un mail de prueba del panel admin, para confirmar que Resend está enviando correctamente. No corresponde a ninguna inscripción real.</p>",
    });

    if (error) {
      return NextResponse.json({ ok: false, codigo: "RESEND_ERROR", bodyCrudoDeResend: error });
    }
    return NextResponse.json({ ok: true, respuestaResend: data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
}
