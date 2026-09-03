import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { buildLimiteAjustadoEmail } from "@/lib/catas/emailTemplate";
import { agruparPorPersona, type RegistrationRow } from "@/lib/catas/agruparPersonas";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * Gente que quedó con más catas de las permitidas (arriba de 4, o más de 2
 * en un mismo día) por el bug de límite que arregla la migración
 * 0005_limite_robusto.sql, y ya se les recortó la inscripción a mano en la
 * base. Nombre+contacto normalizados (mismo criterio que agruparPorPersona)
 * para identificar a quién avisar.
 */
const AFECTADOS_DEFAULT = [
  { nombre: "diego poletto", contacto: "poletto@gmail.com" },
  { nombre: "julia rainho meister", contacto: "juliarainho@yahoo.com.br" },
  { nombre: "marilia coral dos santos hesse", contacto: "marilia_hesse@hotmail.com" },
  { nombre: "cleusa luzia faccio", contacto: "cleusaconto@gmail.com" },
  { nombre: "emilene de carvalho lourenço", contacto: "emilenedecarvalholourenco@gmail.com" },
  { nombre: "carlos scholze", contacto: "fernanda_hirt@yahoo.com.br" },
  { nombre: "fernanda raquel hirt", contacto: "fernanda_hirt@yahoo.com.br" },
  { nombre: "franciele natividade", contacto: "fran.natividade@hotmail.com" },
  { nombre: "homero antônio rosa junior", contacto: "htim2007@uol.com.br" },
  { nombre: "rafael antonio dos santos correia", contacto: "ras_correia@yahoo.com.br" },
  { nombre: "simone cristina dos santos barbosa", contacto: "simonetitina@hotmail.com" },
];

export async function GET(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const dryRun = request.nextUrl.searchParams.get("dryRun") !== "false";
  // Los 11 afectados son todos de Brasil — este mail va en portugués por
  // default (se puede pasar ?lang=es para forzarlo al español si hiciera falta).
  const lang = request.nextUrl.searchParams.get("lang") === "es" ? "es" : "pt";

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
    console.error("notificar-limite fetch error:", fetchError);
    return NextResponse.json({ error: "No se pudo cargar la lista de inscripciones" }, { status: 500 });
  }

  const rows = (registrations ?? []) as unknown as RegistrationRow[];
  const todasLasPersonas = agruparPorPersona(rows);

  const objetivo = new Set(AFECTADOS_DEFAULT.map((a) => `${a.nombre}|||${a.contacto}`));
  const personas = todasLasPersonas.filter((p) =>
    objetivo.has(`${p.nombre.trim().toLowerCase()}|||${p.contacto.trim().toLowerCase()}`)
  );

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      lang,
      objetivo: AFECTADOS_DEFAULT.length,
      encontrados: personas.length,
      destinatarios: personas.map((p) => ({
        nombre: p.nombre,
        contacto: p.contacto,
        catas: p.selections.length,
      })),
    });
  }

  const resend = new Resend(apiKey);
  const enviados: string[] = [];
  const fallidos: { contacto: string; motivo: string }[] = [];

  for (const p of personas) {
    const { subject, html } = buildLimiteAjustadoEmail(p.nombre, p.selections, lang);
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
