import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { DAYS, getCata, salaById, validateSelections, type Selection } from "@/lib/catas/schedule";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";
import { t, type Language } from "@/lib/translations";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
// Kill switch temporal para probar el flujo sin mandarle mails de verdad a
// nadie: poné CATAS_SKIP_CONFIRMATION_EMAIL=true en Vercel y listo, sin
// tocar código. Sacala (o ponela en false) para reactivar el envío.
const skipConfirmationEmail = process.env.CATAS_SKIP_CONFIRMATION_EMAIL === "true";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorCodeKey = {
  EMPTY: "catasErrVacio",
  MAX_PER_DAY: "catasErrMaxDia",
  SLOT_CONFLICT: "catasErrConflicto",
  INVALID_CATA: "catasErrCataInvalida",
} as const;

interface Body {
  nombre?: string;
  contacto?: string;
  documento?: string;
  selections?: Selection[];
  lang?: string;
}

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const lang: Language = body.lang === "pt" ? "pt" : "es";
  const nombre = (body.nombre ?? "").trim();
  const contacto = (body.contacto ?? "").trim().toLowerCase();
  const documento = (body.documento ?? "").trim();
  const selections = Array.isArray(body.selections) ? body.selections : [];

  if (!nombre || !contacto || !documento) {
    return NextResponse.json({ error: t("catasErrCompletar", lang) }, { status: 400 });
  }
  if (!EMAIL_RE.test(contacto)) {
    return NextResponse.json({ error: t("catasErrEmailInvalido", lang) }, { status: 400 });
  }

  const validation = validateSelections(selections);
  if (!validation.ok) {
    const key = validation.errorCode ? errorCodeKey[validation.errorCode] : "catasErrGuardar";
    return NextResponse.json({ error: t(key, lang) }, { status: 400 });
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
      return NextResponse.json({ error: t("catasErrNoParticipante", lang) }, { status: 403 });
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
      const label = cata ? `"${cata.bodega}" (${sala?.nombre ?? salaId}, ${slot})` : "";
      return NextResponse.json(
        { error: `${label} ${t("catasErrCupoLlenoSufijo", lang)}`.trim() },
        { status: 409 }
      );
    }
    console.error("inscribir error:", error);
    return NextResponse.json({ error: t("catasErrGuardarRetry", lang) }, { status: 500 });
  }

  if (resend && skipConfirmationEmail) {
    console.log("inscribir: envío de mail de confirmación saltado (CATAS_SKIP_CONFIRMATION_EMAIL=true)");
  } else if (resend) {
    const resumen = selections
      .map((sel) => {
        const cata = getCata(sel.day, sel.slot, sel.salaId)!;
        const sala = salaById(sel.salaId);
        const day = DAYS.find((d) => d.id === sel.day);
        return `<li>${day?.label} · ${sel.slot} · ${sala?.nombre}: ${cata.bodega}</li>`;
      })
      .join("");

    const subject =
      lang === "pt"
        ? "Sua inscrição para as salas de degustação · ODA al Vino 2026"
        : "Tu inscripción a las salas de degustación · ODA al Vino 2026";
    const heading = `${t("catasListo", lang)}, ${nombre}!`;

    resend.emails
      .send({
        from: "ODA al Vino <noreply@oda-al-vino.com>",
        to: contacto,
        subject,
        html: `<h1>${heading}</h1><p>${t("catasConfirmationSubtitle", lang)}</p><ul>${resumen}</ul>`,
      })
      .catch((e) => console.error("email confirmación error:", e));
  }

  return NextResponse.json({ success: true, id: data });
}
