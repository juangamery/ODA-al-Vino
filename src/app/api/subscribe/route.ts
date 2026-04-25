import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{
        email,
        language: "es",
        subscribed_at: new Date().toISOString()
      }]);

    if (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Could not save email" }, { status: 500 });
    }

    // Send welcome email
    await resend.emails.send({
      from: "ODA al Vino <noreply@oda-al-vino.com>",
      to: email,
      subject: "Bienvenido a ODA al Vino 🍷",
      html: `<h1>Bienvenido!</h1><p>Te has suscrito a nuestro newsletter. Pronto recibirás noticias sobre ODA al Vino.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
