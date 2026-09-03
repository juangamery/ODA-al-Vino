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
  lang: Language,
  documento?: string
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

  // Varias entradas se compraron en grupo y quedaron con el mismo email de
  // contacto — el documento identifica claramente de quién es cada mail
  // cuando quien compró se los tiene que reenviar a sus amigos.
  const documentoHtml = documento
    ? `
                <div style="display:inline-block;background-color:#fff5e1;color:#47072c;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;padding:6px 12px;border-radius:20px;margin-bottom:20px;">
                  ${t("catasEmailDocumento", lang)}: ${escapeHtml(documento)}
                </div>`
    : "";

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
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:15px;line-height:1.5;">
                  ${t("catasConfirmationSubtitle", lang)}
                </p>${documentoHtml}
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

const DAY_MAX = 2;
const DAYS_ORDER: Selection["day"][] = ["viernes", "sabado"];

/**
 * A quienes les quedaron menos de 2 catas en algún día (porque nunca
 * llegaron a elegir nada para ese día, no porque se les haya recortado) se
 * les avisa que todavía pueden completar su selección.
 */
function lugaresLibresHtml(selections: Selection[], lang: Language): string {
  const counts: Record<string, number> = {};
  for (const s of selections) counts[s.day] = (counts[s.day] ?? 0) + 1;

  const libres = DAYS_ORDER.map((day) => ({ day, libres: DAY_MAX - (counts[day] ?? 0) })).filter(
    (d) => d.libres > 0
  );
  if (libres.length === 0) return "";

  const partes = libres.map(
    (d) =>
      `${d.libres} ${t(d.libres === 1 ? "catasCataSingular" : "catasCataPlural", lang)} ${t(
        d.libres === 1 ? "catasEmailLimiteLibreSufijoSingular" : "catasEmailLimiteLibreSufijoPlural",
        lang
      )} ${dayLabel(d.day, lang)}`
  );
  const texto = partes.length === 2 ? `${partes[0]} ${t("catasEmailLimiteY", lang)} ${partes[1]}` : partes[0];

  return `
                <div style="margin:20px 0;padding:14px 16px;border:1px dashed #7c8419;border-radius:8px;background-color:#7c841914;">
                  <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:13px;font-weight:bold;">
                    ${t("catasEmailLimiteLibreTitulo", lang)}
                  </p>
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:13px;line-height:1.5;">
                    ${texto}. <a href="https://www.odaalvino.com.br/inscripcion" style="color:#700143;">${t(
                      "catasEmailLimiteLibreLink",
                      lang
                    )}</a>
                  </p>
                </div>`;
}

/**
 * Mail de ajuste: se manda a quienes quedaron con más catas de las
 * permitidas (por el bug de límite descripto en la migración
 * 0005_limite_robusto.sql) explicando que se ajustó su inscripción, y con
 * el detalle de lo que quedó confirmado. Mismo diseño que el mail de
 * confirmación normal, pero con otro texto de apertura y cierre.
 */
export function buildLimiteAjustadoEmail(
  nombre: string,
  selections: Selection[],
  lang: Language
): { subject: string; html: string } {
  const subject =
    lang === "pt"
      ? "Ajuste na sua inscrição para as salas de degustação · ODA al Vino 2026"
      : "Ajuste en tu inscripción a las salas de degustación · ODA al Vino 2026";

  const cardsHtml = selections
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
                <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;color:#47072c;font-size:26px;font-weight:normal;">
                  ${t("catasEmailLimiteSaludo", lang)}, ${escapeHtml(nombre)}
                </h1>
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:15px;line-height:1.6;">
                  ${t("catasEmailLimiteIntro", lang)}
                </p>
                <div style="font-family:Arial,Helvetica,sans-serif;color:#700143;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">
                  ${t("catasEmailDetalle", lang)}
                </div>
                ${cardsHtml}
                ${lugaresLibresHtml(selections, lang)}
                <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;color:#47072c;font-size:14px;line-height:1.6;">
                  ${t("catasEmailLimiteCierre", lang)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#fff5e1;padding:16px 24px;text-align:center;border-radius:0 0 12px 12px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;color:#47072c99;font-size:11px;">
                  ${t("catasEmailLimiteContacto", lang)}
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
