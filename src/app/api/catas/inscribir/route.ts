import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { DAYS, getCata, salaById, validateSelections, type Selection } from "@/lib/catas/schedule";
import { checkParticipant, ParticipantsApiError } from "@/lib/catas/participantsApi";
import { buildConfirmationEmail } from "@/lib/catas/emailTemplate";
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
  // Mayúsculas: mismo motivo que en verificar-participante — evita que una
  // persona quede fuera del CRM, o esquive el límite de 2 catas/día, sólo
  // por haber tipeado su documento con otra capitalización.
  const documento = (body.documento ?? "").trim().toUpperCase();
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
    p_documento: documento,
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
    if (error.message?.includes("LIMITE_DIA")) {
      const [, day] = error.message.split(":");
      const dayLabel = DAYS.find((d) => d.id === day)?.label ?? day;
      return NextResponse.json(
        { error: `${t("catasErrLimiteDocumentoPrefijo", lang)} ${dayLabel}.` },
        { status: 409 }
      );
    }
    console.error("inscribir error:", error);
    return NextResponse.json({ error: t("catasErrGuardarRetry", lang) }, { status: 500 });
  }

  if (resend && skipConfirmationEmail) {
    console.log("inscribir: envío de mail de confirmación saltado (CATAS_SKIP_CONFIRMATION_EMAIL=true)");
  } else if (resend) {
    const { subject, html } = buildConfirmationEmail(nombre, selections, lang);

    // Hay que esperar el envío antes de devolver la respuesta: si se dispara
    // sin await, Vercel puede congelar la función serverless apenas se
    // manda el response, y el mail nunca termina de salir.
    // El SDK de Resend NO tira excepción ante un error de la API (dominio
    // sin verificar, API key inválida, etc.) — devuelve { error } en la
    // respuesta resuelta, así que hay que chequearlo explícitamente además
    // de envolver en try/catch por si falla la conexión en sí.
    try {
      const { error: resendError } = await resend.emails.send({
        // odavinoteca.com.ar es el único dominio verificado en la cuenta de
        // Resend — con "oda-al-vino.com" (sin verificar) Resend rechazaba
        // TODOS los envíos con 403, lo cual era la causa real de que nunca
        // llegara el mail de confirmación. Migrar a un dominio propio de
        // OAV queda pendiente (requiere tocar DNS con cuidado, ver el
        // registro SPF existente para no romper la casilla de mail actual).
        from: "ODA al Vino <noreply@odavinoteca.com.ar>",
        to: contacto,
        subject,
        html,
      });
      if (resendError) {
        console.error("email confirmación error (respuesta de Resend):", resendError);
      }
    } catch (e) {
      console.error("email confirmación error (excepción):", e);
    }
  }

  return NextResponse.json({ success: true, id: data });
}
