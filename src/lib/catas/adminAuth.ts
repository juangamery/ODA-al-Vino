import { createHmac, timingSafeEqual } from "crypto";

/**
 * Sesión de administrador para el panel de /inscripcion/admin.
 *
 * No hay usuarios individuales (mismo criterio que el resto del proyecto):
 * una única clave de acceso interna (CATAS_ADMIN_PASSCODE) protege el panel.
 * Al loguearse, el servidor emite una cookie httpOnly con un token firmado
 * (HMAC), así la clave nunca se guarda en el navegador ni se reenvía en cada
 * request — sólo viaja una vez, en el login.
 */

export const CATAS_ADMIN_COOKIE = "catas_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 horas

function getSigningSecret() {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en el entorno");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
}

export function createAdminSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `catas-admin:${expires}`;
  return `${expires}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiresStr, sig] = token.split(".");
  if (!expiresStr || !sig) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = sign(`catas-admin:${expires}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function checkAdminPasscode(passcode: string): boolean {
  const expected = process.env.CATAS_ADMIN_PASSCODE;
  if (!expected) {
    throw new Error("Falta CATAS_ADMIN_PASSCODE en el entorno");
  }
  const a = Buffer.from(passcode);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
