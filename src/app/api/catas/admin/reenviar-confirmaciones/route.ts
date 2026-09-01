import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { buildConfirmationEmail } from "@/lib/catas/emailTemplate";
import type { DayId, SalaId } from "@/lib/catas/schedule";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

interface SelectionRow {
  day: DayId;
  slot: string;
  sala_id: SalaId;
}

interface RegistrationRow {
  id: string;
  nombre: string;
  contacto: string;
  catas_selections: SelectionRow[];
}

/**
 * Reenvío masivo del mail de confirmación a TODAS las inscripciones ya
 * guardadas — pensado como corrida única para ponerse al día después de
 * arreglar el bug del dominio de Resend (nadie había recibido confirmación
 * hasta ahora, así que no hay riesgo de duplicar envíos reales).
 *
 * No sabemos en qué idioma se inscribió cada persona (no se guarda), así
 * que todo va en español por default — se puede pasar ?lang=pt para
 * mandarlo todo en portugués en su lugar.
 *
 * ?dryRun=true (default) NO manda nada — sólo devuelve a quién le mandaría
 * y cuántas catas tiene cada uno, para revisar antes del envío real.
 * ?dryRun=false hace el envío de verdad.
 *
 * Con ~90 inscripciones y un pequeño delay entre envíos (para no pegarle
 * al rate limit de Resend), la corrida real puede tardar más de un
 * minuto — de ahí el maxDuration alto.
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
    .select("id, nombre, contacto, catas_selections(day, slot, sala_id)")
    .order("created_at", { ascending: true });

  if (fetchError) {
    console.error("reenviar-confirmaciones fetch error:", fetchError);
    return NextResponse.json({ error: "No se pudo cargar la lista de inscripciones" }, { status: 500 });
  }

  const rows = (registrations ?? []) as unknown as RegistrationRow[];
  const conCatas = rows.filter((r) => r.catas_selections.length > 0);

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      lang,
      totalInscripciones: rows.length,
      seEnviarianA: conCatas.length,
      sinCatas: rows.length - conCatas.length,
      destinatarios: conCatas.map((r) => ({ nombre: r.nombre, contacto: r.contacto, catas: r.catas_selections.length })),
    });
  }

  const resend = new Resend(apiKey);
  const enviados: string[] = [];
  const fallidos: { contacto: string; motivo: string }[] = [];

  for (const r of conCatas) {
    const selections = r.catas_selections.map((s) => ({ day: s.day, slot: s.slot, salaId: s.sala_id }));
    const { subject, html } = buildConfirmationEmail(r.nombre, selections, lang);
    try {
      const { error } = await resend.emails.send({
        from: "ODA al Vino <noreply@odavinoteca.com.ar>",
        to: r.contacto,
        subject,
        html,
      });
      if (error) {
        fallidos.push({ contacto: r.contacto, motivo: JSON.stringify(error) });
      } else {
        enviados.push(r.contacto);
      }
    } catch (e) {
      fallidos.push({ contacto: r.contacto, motivo: e instanceof Error ? e.message : String(e) });
    }
    // Pequeño respiro entre envíos para no pegarle al rate limit de Resend.
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  return NextResponse.json({
    dryRun: false,
    lang,
    totalProcesados: conCatas.length,
    enviadosOk: enviados.length,
    fallidos,
  });
}
