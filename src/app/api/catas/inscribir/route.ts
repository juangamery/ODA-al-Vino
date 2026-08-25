import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/catas/supabaseAdmin";
import { DAYS, getCata, salaById, validateSelections, type Selection } from "@/lib/catas/schedule";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface Body {
  nombre?: string;
  contacto?: string;
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
  const contacto = (body.contacto ?? "").trim();
  const selections = Array.isArray(body.selections) ? body.selections : [];

  if (!nombre || !contacto) {
    return NextResponse.json(
      { error: "Completá nombre y un email o teléfono de contacto." },
      { status: 400 }
    );
  }

  const validation = validateSelections(selections);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
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
        to: contacto.includes("@") ? contacto : "inscripciones@oda-al-vino.com",
        subject: "Tu inscripción a las salas de degustación · ODA al Vino 2026",
        html: `<h1>¡Listo, ${nombre}!</h1><p>Tu inscripción a las salas de degustación quedó confirmada:</p><ul>${resumen}</ul>`,
      })
      .catch((e) => console.error("email confirmación error:", e));
  }

  return NextResponse.json({ success: true, id: data });
}
