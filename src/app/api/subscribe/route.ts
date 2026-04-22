import { NextRequest, NextResponse } from "next/server";

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

    // Guardar en Supabase si RESEND_API_KEY existe
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const { error: dbError } = await supabase
          .from("newsletter_subscribers")
          .insert([
            {
              email: email.toLowerCase(),
              language: language || "es",
              verified: false,
            },
          ]);

        if (dbError && dbError.code !== "23505") {
          console.error("Supabase error:", dbError);
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
      }
    }

    // Enviar email si RESEND_API_KEY existe
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

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
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #fff5e1; border: 1px solid #e0d4c4; }
    .header { background: linear-gradient(135deg, #47072c 0%, #700143 100%); padding: 40px 30px; text-align: center; }
    .content { padding: 50px 40px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #7c8419; margin-bottom: 20px; font-weight: bold; }
    h1 { font-family: Georgia, serif; font-size: 36px; color: #47072c; margin: 0 0 20px 0; font-weight: normal; }
    .subtitle { font-size: 16px; color: #47072c; line-height: 1.8; margin: 30px 0; }
    .highlight { color: #7c8419; font-weight: bold; }
    .footer { background-color: #47072c; color: #fff5e1; padding: 30px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p style="color: #fff5e1; font-size: 14px; margin: 0;">ODA al Vino</p>
    </div>
    <div class="content">
      <p class="eyebrow">✦ Bienvenido ✦</p>
      <h1>El Vino Nos Reúne</h1>
      <p class="subtitle">¡Gracias por suscribirte a ODA al Vino! Pronto recibirás noticias exclusivas.</p>
    </div>
    <div class="footer">
      <p>© 2026 ODA al Vino · Todos los derechos reservados</p>
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
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #fff5e1; border: 1px solid #e0d4c4; }
    .header { background: linear-gradient(135deg, #47072c 0%, #700143 100%); padding: 40px 30px; text-align: center; }
    .content { padding: 50px 40px; text-align: center; }
    .eyebrow { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #7c8419; margin-bottom: 20px; font-weight: bold; }
    h1 { font-family: Georgia, serif; font-size: 36px; color: #47072c; margin: 0 0 20px 0; font-weight: normal; }
    .subtitle { font-size: 16px; color: #47072c; line-height: 1.8; margin: 30px 0; }
    .footer { background-color: #47072c; color: #fff5e1; padding: 30px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p style="color: #fff5e1; font-size: 14px; margin: 0;">ODA ao Vinho</p>
    </div>
    <div class="content">
      <p class="eyebrow">✦ Bem-vindo ✦</p>
      <h1>O Vinho Nos Reúne</h1>
      <p class="subtitle">Obrigado por se inscrever em ODA ao Vinho! Em breve você receberá notícias exclusivas.</p>
    </div>
    <div class="footer">
      <p>© 2026 ODA ao Vinho · Todos os direitos reservados</p>
    </div>
  </div>
</body>
</html>
`;

        await resend.emails.send({
          from: "ODA al Vino 🍷 <noreply@odaalvino.com>",
          to: email,
          subject: subject,
          html: htmlContent,
          replyTo: "info@odaalvino.com",
        });
      } catch (err) {
        console.error("Resend error:", err);
        // No fallar si Resend no funciona
      }
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
