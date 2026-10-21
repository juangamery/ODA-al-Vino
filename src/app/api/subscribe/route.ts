import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  "https://odaalvino.com.br",
  "https://www.odaalvino.com.br",
  "https://odaalvino.com.ar",
  "https://www.odaalvino.com.ar",
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const language = body.language === "pt" ? "pt" : "es";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400, headers });
    }

    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{
        email,
        language,
        subscribed_at: new Date().toISOString()
      }]);

    // 23505 = unique_violation: ya estaba suscripto, no es un error para el usuario.
    if (dbError?.code === "23505") {
      return NextResponse.json({ success: true }, { headers });
    }

    if (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Could not save email" }, { status: 500, headers });
    }

    // "oda-al-vino.com" nunca estuvo verificado en Resend, así que Resend
    // rechazaba el envío con 403 sin que el código lo notara (el SDK no
    // tira excepción en errores de la API, resuelve con { error }) —
    // usamos el dominio que sí está verificado, y ahora sí logueamos si falla.
    const { error: resendError } = await resend.emails.send({
      from: "ODA al Vino <noreply@odavinoteca.com.ar>",
      to: email,
      subject: language === "pt" ? "Bem-vindo à ODA al Vino 🍷" : "Bienvenido a ODA al Vino 🍷",
      html: language === "pt"
        ? `<h1>Bem-vindo!</h1><p>Você se inscreveu para receber novidades, histórias e conteúdos da ODA al Vino.</p>`
        : `<h1>¡Bienvenido!</h1><p>Te suscribiste para recibir novedades, historias y contenidos de ODA al Vino.</p>`,
    });
    if (resendError) {
      console.error("subscribe: email de bienvenida error:", resendError);
    }

    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500, headers });
  }
}
