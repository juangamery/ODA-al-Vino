import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { DAYS, getCata, salaById, validateSelections, type Selection } from "@/lib/catas/schedule";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Body {
  nombre?: string;
  contacto?: string;
  documento?: string;
  selections?: Selection[];
}

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const nombre = (body.nombre ?? "").trim();
  const contacto = (body.contacto ?? "").trim().toLowerCase();
  const documento = (body.documento ?? "").trim();
  const selections = Array.isArray(body.selections) ? body.selections : [];

  if (!nombre || !contacto || !documento) {
    return NextResponse.json({ error: "Completá nombre, documento y email." }, { status: 400 });
  }
  if (!EMAIL_RE.test(contacto)) {
    return NextResponse.json({ error: "Ingresá un email válido." }, { status: 400 });
  }

  const validation = validateSelections(selections);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Sólo participantes confirmados de la edición vigente pueden anotarse a las catas.
  // Se busca por documento (DNI/CPF/RUT/Cédula), no por email.
  // Si el API del CRM responde explícitamente "no es participante", bloqueamos.
  // Si el API del CRM falla (caído, timeout), dejamos pasar la inscripción sin
  // verificar — ver logs: "participant check error". Apenas el CRM vuelva a
  // responder normalmente, la validación real se reactiva sola, sin tocar este código.
  try {
    const participantCheck = await checkParticipant(documento);
    if (!participantCheck.is_participant) {
      return NextResponse.json(
        {
          error:
            "Este documento no corresponde a un participante confirmado de ODA al Vino 2026. Usá el mismo documento con el que compraste tu entrada.",
        },
        { status: 403 }
      );
    }
  } catch (e) {
    console.error(
      "participant check error (dejando pasar sin verificar):",
      e instanceof ParticipantsApiError ? `${e.code} status=${e.status} body=${e.body}` : e
    );
  }

  const payload = selections.map((sel) => {
    const cata = getCata(sel.day, sel.slot, sel.salaId)!;
    return { day: sel.day, slot: sel.slot, salaId: sel.salaId, bodega: cata.bodega };
  });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("catas_inscribir", {
    p_nombre: nombre,
    p_contacto: contacto,
    p_selections: payload,
  });

  if (error) {
    if (error.message?.includes("CUPO_LLENO")) {
      const [, day, slot, salaId] = error.message.split(":");
      const sala = salaById(salaId);
      const cata = getCata(day as Selection["day"], slot, salaId as Selection["salaId"]);
      const label = cata ? `"${cata.bodega}" (${sala?.nombre ?? salaId}, ${slot})` : "una de las salas elegidas";
      return NextResponse.json(
        { error: `${label} se quedó sin cupo justo ahora. Elegí otra opción.` },
        { status: 409 }
      );
    }
    console.error("inscribir error:", error);
    return NextResponse.json(
      { error: "Hubo un problema al guardar la inscripción. Probá de nuevo en unos segundos." },
      { status: 500 }
    );
  }

  if (resend) {
    const resumen = selections
      .map((sel) => {
        const cata = getCata(sel.day, sel.slot, sel.salaId)!;
        const sala = salaById(sel.salaId);
        const day = DAYS.find((d) => d.id === sel.day);
        return `<li>${day?.label} · ${sel.slot} · ${sala?.nombre}: ${cata.bodega}</li>`;
      })
      .join("");

    resend.emails
      .send({
        from: "ODA al Vino <noreply@oda-al-vino.com>",
        to: contacto,
        subject: "Tu inscripción a las salas de degustación · ODA al Vino 2026",
        html: `<h1>¡Listo, ${nombre}!</h1><p>Tu inscripción a las salas de degustación quedó confirmada:</p><ul>${resumen}</ul>`,
      })
      .catch((e) => console.error("email confirmación error:", e));
  }

  return NextResponse.json({ success: true, id: data });
}
