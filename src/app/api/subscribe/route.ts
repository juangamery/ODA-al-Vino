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
        ? "Bienvenido a ODA al Vino 🍷"
        : "Bem-vindo à ODA ao Vinho 🍷";

    const htmlContent =
      language === "es"
        ? `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #fff5e1; border: 1px solid #e0d4c4; }
    .header { background: linear-gradient(135deg, #47072c 0%, #700143 100%); padding: 40px 30px; text-align: center; }
    .logo { max-width: 120px; margin: 0 auto; }
    .logo img { width: 100%; height: auto; }
    .content { padding: 50px 40px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #7c8419; margin-bottom: 20px; font-weight: bold; }
    h1 { font-family: Georgia, serif; font-size: 36px; color: #47072c; margin: 0 0 20px 0; font-weight: normal; line-height: 1.2; }
    .subtitle { font-size: 16px; color: #47072c; line-height: 1.8; margin: 30px 0; }
    .highlight { color: #7c8419; font-weight: bold; }
    .cta-button { background: linear-gradient(135deg, #7c8419 0%, #6a7216 100%); color: #fff5e1; padding: 16px 40px; text-decoration: none; display: inline-block; margin: 30px 0; border-radius: 50px; font-weight: bold; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; transition: transform 0.3s ease; }
    .cta-button:hover { transform: scale(1.05); }
    .features { text-align: left; margin: 40px 0; padding: 30px; background-color: rgba(112, 1, 67, 0.05); border-left: 4px solid #700143; }
    .features li { color: #47072c; margin: 10px 0; font-size: 14px; line-height: 1.6; }
    .footer { background-color: #47072c; color: #fff5e1; padding: 30px; text-align: center; font-size: 12px; }
    .footer-text { margin: 10px 0; }
    .footer-links { margin-top: 20px; }
    .footer-links a { color: #7c8419; text-decoration: none; margin: 0 15px; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img src="https://raw.githubusercontent.com/juangamery/ODA-al-Vino/main/public/oda/brand/logo_blanco_vertical.svg" alt="ODA al Vino" width="120">
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="eyebrow">✦ Bienvenido a Nuestra Comunidad ✦</p>
      <h1>El Vino Nos Reúne</h1>
      <p class="subtitle">
        Te has suscrito a <span class="highlight">ODA al Vino</span>, la celebración del vino argentino en su máxima expresión.
      </p>

      <p style="color: #47072c; font-size: 15px; line-height: 1.8; margin: 30px 0;">
        En breve recibirás acceso exclusivo a:
      </p>

      <div class="features">
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li>🎁 Promociones especiales y descuentos exclusivos</li>
          <li>🗓️ Información sobre la 10° edición (4 y 5 de Septiembre)</li>
          <li>🍷 Experiencias y eventos del mundo del vino argentino</li>
          <li>👥 Acceso a nuestra comunidad de apasionados por el vino</li>
        </ul>
      </div>

      <a href="https://www.odaalvino.com" class="cta-button">Conocer ODA al Vino</a>

      <p style="color: #700143; font-size: 13px; font-style: italic; margin-top: 40px;">
        "Desayunar en Argentina, almorzar en Brasil, cenar en Paraguay."<br>
        Iguazú es el único lugar donde la Triple Frontera se vive en un mismo día.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text" style="margin-top: 0;">© 2026 ODA al Vino · Todos los derechos reservados</p>
      <div class="footer-links">
        <a href="https://www.instagram.com/odaalvino/">Instagram</a>
        <a href="https://www.facebook.com/odaalvinooficial">Facebook</a>
        <a href="https://www.odavinoteca.com.ar/">ODA Vinoteca</a>
      </div>
      <p class="footer-text" style="margin-top: 20px; color: #999; font-size: 11px;">
        Si deseas dejar de recibir estos emails, puedes darte de baja en cualquier momento.
      </p>
    </div>
  </div>
</body>
</html>
`
        : `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #fff5e1; border: 1px solid #e0d4c4; }
    .header { background: linear-gradient(135deg, #47072c 0%, #700143 100%); padding: 40px 30px; text-align: center; }
    .logo { max-width: 120px; margin: 0 auto; }
    .logo img { width: 100%; height: auto; }
    .content { padding: 50px 40px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #7c8419; margin-bottom: 20px; font-weight: bold; }
    h1 { font-family: Georgia, serif; font-size: 36px; color: #47072c; margin: 0 0 20px 0; font-weight: normal; line-height: 1.2; }
    .subtitle { font-size: 16px; color: #47072c; line-height: 1.8; margin: 30px 0; }
    .highlight { color: #7c8419; font-weight: bold; }
    .cta-button { background: linear-gradient(135deg, #7c8419 0%, #6a7216 100%); color: #fff5e1; padding: 16px 40px; text-decoration: none; display: inline-block; margin: 30px 0; border-radius: 50px; font-weight: bold; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; transition: transform 0.3s ease; }
    .cta-button:hover { transform: scale(1.05); }
    .features { text-align: left; margin: 40px 0; padding: 30px; background-color: rgba(112, 1, 67, 0.05); border-left: 4px solid #700143; }
    .features li { color: #47072c; margin: 10px 0; font-size: 14px; line-height: 1.6; }
    .footer { background-color: #47072c; color: #fff5e1; padding: 30px; text-align: center; font-size: 12px; }
    .footer-text { margin: 10px 0; }
    .footer-links { margin-top: 20px; }
    .footer-links a { color: #7c8419; text-decoration: none; margin: 0 15px; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img src="https://raw.githubusercontent.com/juangamery/ODA-al-Vino/main/public/oda/brand/logo_blanco_vertical.svg" alt="ODA ao Vinho" width="120">
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="eyebrow">✦ Bem-vindo à Nossa Comunidade ✦</p>
      <h1>O Vinho Nos Reúne</h1>
      <p class="subtitle">
        Você se inscreveu em <span class="highlight">ODA ao Vinho</span>, a celebração do vinho argentino em sua máxima expressão.
      </p>

      <p style="color: #47072c; font-size: 15px; line-height: 1.8; margin: 30px 0;">
        Em breve você receberá acesso exclusivo a:
      </p>

      <div class="features">
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li>🎁 Promoções especiais e descontos exclusivos</li>
          <li>🗓️ Informações sobre a 10ª edição (4 e 5 de Setembro)</li>
          <li>🍷 Experiências e eventos do mundo do vinho argentino</li>
          <li>👥 Acesso à nossa comunidade de apaixonados por vinho</li>
        </ul>
      </div>

      <a href="https://www.odaalvino.com" class="cta-button">Conhecer ODA ao Vinho</a>

      <p style="color: #700143; font-size: 13px; font-style: italic; margin-top: 40px;">
        "Desayunar na Argentina, almoçar no Brasil, jantar no Paraguai."<br>
        Iguazu é o único lugar onde a Tríplice Fronteira é vivida em um mesmo dia.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text" style="margin-top: 0;">© 2026 ODA ao Vinho · Todos os direitos reservados</p>
      <div class="footer-links">
        <a href="https://www.instagram.com/odaalvino/">Instagram</a>
        <a href="https://www.facebook.com/odaalvinooficial">Facebook</a>
        <a href="https://www.odavinoteca.com.ar/">ODA Vinoteca</a>
      </div>
      <p class="footer-text" style="margin-top: 20px; color: #999; font-size: 11px;">
        Se deseja deixar de receber esses e-mails, pode cancelar sua inscrição a qualquer momento.
      </p>
    </div>
  </div>
</body>
</html>
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
