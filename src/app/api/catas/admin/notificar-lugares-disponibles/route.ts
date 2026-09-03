import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { buildLugaresDisponiblesEmail } from "@/lib/catas/emailTemplate";
import { agruparPorPersona, type RegistrationRow } from "@/lib/catas/agruparPersonas";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_TOTAL = 4;

/**
 * A diferencia de notificar-limite (una lista fija de gente ya identificada
 * en un incidente puntual), este endpoint escanea TODA la base cada vez que
 * se llama: cualquier persona con menos de 4 catas confirmadas en total
 * (osea con algún día por debajo de 2) es candidata al recordatorio.
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const dryRun = request.nextUrl.searchParams.get("dryRun") !== "false";
  const lang = request.nextUrl.searchParams.get("lang") === "pt" ? "pt" : "es";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta RESEND_API_KEY en el entorno" }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();
  const { data: registrations, error: fetchError } = await supabase
    .from("catas_registrations")
    .select("id, nombre, contacto, documento, catas_selections(day, slot, sala_id)")
    .order("created_at", { ascending: true });

  if (fetchError) {
    console.error("notificar-lugares-disponibles fetch error:", fetchError);
    return NextResponse.json({ error: "No se pudo cargar la lista de inscripciones" }, { status: 500 });
  }

  const rows = (registrations ?? []) as unknown as RegistrationRow[];
  const personas = agruparPorPersona(rows).filter(
    (p) => p.selections.length > 0 && p.selections.length < MAX_TOTAL
  );

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      lang,
      encontrados: personas.length,
      destinatarios: personas.map((p) => {
        const viernes = p.selections.filter((s) => s.day === "viernes").length;
        const sabado = p.selections.filter((s) => s.day === "sabado").length;
        return { nombre: p.nombre, contacto: p.contacto, catas: p.selections.length, viernes, sabado };
      }),
    });
  }

  const resend = new Resend(apiKey);
  const enviados: string[] = [];
  const fallidos: { contacto: string; motivo: string }[] = [];

  for (const p of personas) {
    const { subject, html } = buildLugaresDisponiblesEmail(p.nombre, p.selections, lang);
    try {
      const { error } = await resend.emails.send({
        from: "ODA al Vino <noreply@odavinoteca.com.ar>",
        to: p.contacto,
        subject,
        html,
      });
      if (error) {
        fallidos.push({ contacto: p.contacto, motivo: JSON.stringify(error) });
      } else {
        enviados.push(p.contacto);
      }
    } catch (e) {
      fallidos.push({ contacto: p.contacto, motivo: e instanceof Error ? e.message : String(e) });
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  return NextResponse.json({
    dryRun: false,
    lang,
    totalProcesados: personas.length,
    enviadosOk: enviados.length,
    fallidos,
  });
}
