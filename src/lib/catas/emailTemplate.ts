import { getCata, salaById, type Selection } from "@/lib/catas/schedule";
import { t, type Language } from "@/lib/translations";

/**
 * HTML del mail de confirmación de inscripción a catas — tablas + estilos
 * inline porque es lo único que renderiza de forma consistente en clientes
 * de mail (Gmail, Outlook, Apple Mail, etc.), no CSS moderno ni fuentes
 * externas. Georgia/Arial son fuentes "web-safe" (siempre disponibles),
 * no las tipografías de marca del sitio.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dayLabel(day: Selection["day"], lang: Language): string {
  return day === "viernes" ? t("catasDayViernes", lang) : t("catasDaySabado", lang);
}

function selectionCardHtml(sel: Selection, lang: Language): string {
  const cata = getCata(sel.day, sel.slot, sel.salaId);
  const sala = salaById(sel.salaId);
  const bodega = escapeHtml(cata?.bodega ?? "");
  const salaNombre = escapeHtml(sala?.nombre ?? sel.salaId);
  const horario = `${dayLabel(sel.day, lang)} · ${sel.slot} ${t("catasHoursAbbrev", lang)}`;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 10px;border:1px solid #47072c26;border-radius:8px;">
      <tr>
        <td style="padding:14px 16px;">
          <div style="font-family:Arial,Helvetica,sans-serif;color:#700143;font-size:11px;letter-spacing:1px;text-transform:uppercase;">${horario}</div>
          <div style="font-family:Georgia,'Times New Roman',serif;color:#47072c;font-size:19px;margin-top:4px;">${bodega}</div>
          <div style="font-family:Arial,Helvetica,sans-serif;color:#47072ca6;font-size:12px;margin-top:2px;">${t("catasEmailSala", lang)}: ${salaNombre}</div>
        </td>
      </tr>
    </table>`;
}

export function buildConfirmationEmail(
  nombre: string,
  selections: Selection[],
  lang: Language
): { subject: string; html: string } {
  const subject =
    lang === "pt"
      ? "Sua inscrição para as salas de degustação · ODA al Vino 2026"
      : "Tu inscripción a las salas de degustación · ODA al Vino 2026";

  const cardsHtml = selections
    // Viernes primero, y dentro de cada día por horario — más fácil de leer que el orden de selección.
    .slice()
    .sort((a, b) => (a.day === b.day ? a.slot.localeCompare(b.slot) : a.day === "viernes" ? -1 : 1))
    .map((sel) => selectionCardHtml(sel, lang))
    .join("");

  const html = `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#fff5e1;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff5e1;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td style="background-color:#47072c;padding:28px 24px;text-align:center;border-radius:12px 12px 0 0;">
                <img
                  src="https://www.odaalvino.com.br/oda/brand/logo-email-crema.png"
                  alt="ODA al Vino · 10ª edición"
                  width="200"
                  height="59"
                  style="display:block;margin:0 auto;width:200px;height:59px;border:0;"
                />
                <div style="font-family:Arial,Helvetica,sans-serif;color:#e8c9a0;font-size:11px;letter-spacing:2px;margin-top:8px;">2026</div>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;padding:32px 24px;">
                <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;color:#47072c;font-size:28px;font-weight:normal;">
                  ${t("catasListo", lang)}, ${escapeHtml(nombre)}!
                </h1>
                <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:15px;line-height:1.5;">
                  ${t("catasConfirmationSubtitle", lang)}
                </p>
                <div style="font-family:Arial,Helvetica,sans-serif;color:#700143;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">
                  ${t("catasEmailDetalle", lang)}
                </div>
                ${cardsHtml}
                <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:14px;">
                  ${t("catasEmailCierre", lang)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#fff5e1;padding:16px 24px;text-align:center;border-radius:0 0 12px 12px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;color:#47072c99;font-size:11px;">
                  ${t("catasEmailNoResponder", lang)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}
