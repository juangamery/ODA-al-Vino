/**
 * Cliente del API externo del CRM de OAV para verificar si un documento
 * (DNI/CPF/RUT/Cédula) corresponde a un participante confirmado de la
 * edición vigente. Server-side únicamente: el token es secreto y nunca
 * debe llegar al cliente.
 * Ver: apiparticipantcheck.md — el admin del CRM confirmó reemplazar la
 * búsqueda por email (como decía la doc original) por búsqueda por
 * documento (param `document`).
 */

const API_BASE = "https://crm.odaalvino.com.br/api/external";

export interface Participant {
  first_name: string;
  last_name: string;
  email: string;
  document: string | null;
  ticket_number: string;
  ticket_name: string | null;
  checkin_at: string | null;
}

export interface ParticipantCheckResult {
  is_participant: boolean;
  edition_id: number;
  edition_name: string;
  count: number;
  participant: Participant | null;
}

export class ParticipantsApiError extends Error {
  constructor(
    public code: "UNAUTHORIZED" | "RATE_LIMITED" | "BAD_REQUEST" | "UPSTREAM_ERROR",
    message: string,
    public status?: number,
    public body?: string
  ) {
    super(message);
    this.name = "ParticipantsApiError";
  }
}

export async function checkParticipant(document: string): Promise<ParticipantCheckResult> {
  const token = process.env.OAV_PARTICIPANTS_API_TOKEN;
  if (!token) {
    throw new Error("Falta OAV_PARTICIPANTS_API_TOKEN en el entorno");
  }

  const url = new URL(`${API_BASE}/participants/check`);
  url.searchParams.set("document", document);

  const res = await fetch(url, {
    headers: { "X-API-Token": token },
    signal: AbortSignal.timeout(8000),
  });

  if (res.status === 401) {
    throw new ParticipantsApiError(
      "UNAUTHORIZED",
      "El token del API de participantes fue rechazado (¿rotado?).",
      res.status,
      await res.text().catch(() => "")
    );
  }
  if (res.status === 429) {
    throw new ParticipantsApiError(
      "RATE_LIMITED",
      "Rate limit del API de participantes excedido.",
      res.status,
      await res.text().catch(() => "")
    );
  }
  if (res.status === 400) {
    throw new ParticipantsApiError(
      "BAD_REQUEST",
      "Documento inválido o faltante para el API de participantes.",
      res.status,
      await res.text().catch(() => "")
    );
  }
  if (!res.ok) {
    throw new ParticipantsApiError(
      "UPSTREAM_ERROR",
      `API de participantes respondió ${res.status}.`,
      res.status,
      await res.text().catch(() => "")
    );
  }

  return res.json();
}
