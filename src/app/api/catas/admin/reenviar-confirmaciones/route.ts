import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CATAS_ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/catas/adminAuth";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { buildConfirmationEmail } from "@/lib/catas/emailTemplate";
import type { DayId, SalaId, Selection } from "@/lib/catas/schedule";

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
  documento: string | null;
  catas_selections: SelectionRow[];
}

interface Persona {
  nombre: string;
  contacto: string;
  documento?: string;
  selections: Selection[];
}

/**
 * Junta las inscripciones por persona (nombre + email, normalizados) antes
 * de mandar nada. Bastante gente completó el formulario varias veces (una
 * cata por vez) en vez de elegir las 2 juntas — sin esto cada quien
 * recibiría un mail separado por cada envío suelto, en vez de uno solo con
 * toda su selección. También junta variantes de mayúsculas del mismo
 * nombre ("Julia rainho meister" / "Julia Rainho Meister").
 */
function agruparPorPersona(rows: RegistrationRow[]): Persona[] {
  const grupos = new Map<string, Persona>();

  for (const r of rows) {
    const key = `${r.nombre.trim().toLowerCase()}|||${r.contacto.trim().toLowerCase()}`;
    const existente = grupos.get(key);
    const nuevasSelections: Selection[] = r.catas_selections.map((s) => ({
      day: s.day,
      slot: s.slot,
      salaId: s.sala_id,
    }));
    const documento = r.documento?.trim() || undefined;

    if (existente) {
      existente.selections.push(...nuevasSelections);
      if (!existente.documento && documento) existente.documento = documento;
    } else {
      grupos.set(key, { nombre: r.nombre.trim(), contacto: r.contacto.trim(), documento, selections: nuevasSelections });
    }
  }

  // Por si la misma cata puntual quedó guardada duplicada entre envíos.
  for (const persona of grupos.values()) {
    const vistas = new Set<string>();
    persona.selections = persona.selections.filter((s) => {
      const key = `${s.day}__${s.slot}__${s.salaId}`;
      if (vistas.has(key)) return false;
      vistas.add(key);
      return true;
    });
  }

  return Array.from(grupos.values());
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
 * Con ~150-190 personas y un pequeño delay entre envíos (para no pegarle
 * al rate limit de Resend), la corrida real puede tardar varios minutos —
 * de ahí el maxDuration alto.
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(CATAS_ADMIN_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const dryRun = request.nextUrl.searchParams.get("dryRun") !== "false";
  const lang = request.nextUrl.searchParams.get("lang") === "pt" ? "pt" : "es";
  // Para reintentar sólo a quienes falló el envío (ej: se cortó por la cuota
  // diaria de Resend) sin volver a mandarle a quien ya recibió su mail hoy.
  // ?contactos=mail1@x.com,mail2@x.com
  const contactosFiltro = request.nextUrl.searchParams.get("contactos");

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
    console.error("reenviar-confirmaciones fetch error:", fetchError);
    return NextResponse.json({ error: "No se pudo cargar la lista de inscripciones" }, { status: 500 });
  }

  const rows = (registrations ?? []) as unknown as RegistrationRow[];
  let personas = agruparPorPersona(rows).filter((p) => p.selections.length > 0);

  if (contactosFiltro) {
    const set = new Set(
      contactosFiltro
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean)
    );
    personas = personas.filter((p) => set.has(p.contacto.toLowerCase()));
  }

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      lang,
      totalInscripciones: rows.length,
      personasUnicas: personas.length,
      destinatarios: personas.map((p) => ({
        nombre: p.nombre,
        contacto: p.contacto,
        documento: p.documento ?? null,
        catas: p.selections.length,
      })),
    });
  }

  const resend = new Resend(apiKey);
  const enviados: string[] = [];
  const fallidos: { contacto: string; motivo: string }[] = [];

  for (const p of personas) {
    const { subject, html } = buildConfirmationEmail(p.nombre, p.selections, lang, p.documento);
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
    // Pequeño respiro entre envíos para no pegarle al rate limit de Resend.
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
