import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, language } = await request.json();

    // Validar email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, message: "Email inválido" },
        { status: 400 }
      );
    }

    // Guardar en Supabase
    const { data, error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email: email.toLowerCase(),
          language: language || "es",
          verified: false,
        },
      ])
      .select();

    // Si el email ya existe, retornar error
    if (dbError) {
      if (dbError.code === "23505") {
        // Error de unique constraint
        return NextResponse.json(
          { success: false, message: "Email ya está suscrito" },
          { status: 400 }
        );
      }
      throw dbError;
    }

    // Email de bienvenida en ES/PT
    const subject =
      language === "es"
        ? "¡Bienvenido a ODA al Vino!"
        : "Bem-vindo à ODA ao Vinho!";

    const htmlContent =
      language === "es"
        ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #47072c; margin-bottom: 20px;">¡Gracias por suscribirse!</h2>
      <p style="color: #333; line-height: 1.6;">
        Te has suscrito a las novedades de <strong>ODA al Vino</strong>.
      </p>
      <p style="color: #333; line-height: 1.6;">
        Pronto recibirás información sobre:
      </p>
      <ul style="color: #333;">
        <li>Promociones especiales y descuentos exclusivos</li>
        <li>Novedades sobre la 10° edición (4 y 5 de Septiembre)</li>
        <li>Experiencias y eventos relacionados con el vino argentino</li>
      </ul>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Si no deseas recibir más emails, puedes darte de baja en cualquier momento.
      </p>
      <p style="color: #7c8419; font-weight: bold; margin-top: 20px;">
        El vino nos reúne.<br/>
        ODA al Vino
      </p>
    </div>
  `
        : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #47072c; margin-bottom: 20px;">Bem-vindo à ODA ao Vinho!</h2>
      <p style="color: #333; line-height: 1.6;">
        Você se inscreveu nas novidades de <strong>ODA ao Vinho</strong>.
      </p>
      <p style="color: #333; line-height: 1.6;">
        Em breve você receberá informações sobre:
      </p>
      <ul style="color: #333;">
        <li>Promoções especiais e descontos exclusivos</li>
        <li>Novidades sobre a 10ª edição (4 e 5 de Setembro)</li>
        <li>Experiências e eventos relacionados ao vinho argentino</li>
      </ul>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Se não deseja receber mais e-mails, pode cancelar sua inscrição a qualquer momento.
      </p>
      <p style="color: #7c8419; font-weight: bold; margin-top: 20px;">
        O vinho nos reúne.<br/>
        ODA ao Vinho
      </p>
    </div>
  `;

    // Enviar email con Resend
    const emailData = await resend.emails.send({
      from: "ODA al Vino 🍷 <noreply@odaalvino.com>",
      to: email,
      subject: subject,
      html: htmlContent,
      replyTo: "info@odaalvino.com",
    });

    if (emailData.error) {
      return NextResponse.json(
        { success: false, message: "Error al enviar email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Suscripción exitosa" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en subscribe:", error);
    return NextResponse.json(
      { success: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}
