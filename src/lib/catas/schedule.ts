/**
 * ODA al Vino 2026 — Inscripción a salas de degustación.
 * Fuente de verdad de la grilla (bodegas, profesionales, horarios, cupos).
 * Se usa tanto en el formulario (cliente) como en las rutas /api/catas/* (servidor),
 * así la validación de reglas de negocio es idéntica en ambos lados.
 */

export type SalaId = "norte" | "patagonia" | "cuyo" | "iguazu" | "argentina" | "atlantica";
export type DayId = "viernes" | "sabado";

export interface Sala {
  id: SalaId;
  nombre: string;
  pax: number;
}

export interface Day {
  id: DayId;
  label: string;
}

export interface Cata {
  bodega: string;
  profesional?: string;
  restaurante?: string;
  presenta?: string;
}

export type DaySchedule = Partial<Record<string, Partial<Record<SalaId, Cata>>>>;

export interface Selection {
  day: DayId;
  slot: string;
  salaId: SalaId;
}

export const SALAS: Sala[] = [
  { id: "norte", nombre: "Norte", pax: 16 },
  { id: "patagonia", nombre: "Patagonia", pax: 18 },
  { id: "cuyo", nombre: "Cuyo", pax: 16 },
  { id: "iguazu", nombre: "Iguazú", pax: 25 },
  { id: "argentina", nombre: "Argentina", pax: 18 },
  { id: "atlantica", nombre: "Atlántica", pax: 16 },
];

export const SLOTS = ["15:30–16:15", "16:30–17:15", "17:30–18:15", "18:30–19:15", "19:30–20:15"];

export const DAYS: Day[] = [
  { id: "viernes", label: "Viernes 04/09" },
  { id: "sabado", label: "Sábado 05/09" },
];

export const SCHEDULE: Record<DayId, DaySchedule> = {
  viernes: {
    "15:30–16:15": {
      norte: { bodega: "Lui Wines", profesional: "Mauricio Veguetti" },
      patagonia: { bodega: "Ernesto Zapata", profesional: "Indiana Jones" },
      iguazu: {
        bodega: "Iniciando en el Mundo del Vino",
        profesional: "Alma María Cabral - Mejor Sommelier Argentina 2025",
        presenta: "Nos preparamos para ODA al Vino",
      },
      argentina: { bodega: "Bemberg", profesional: "Sebastián Nazabal Canalis", restaurante: "El Quincho del Tío Querido" },
      atlantica: { bodega: "Mil Suelos", profesional: "Colo Sejantovich" },
    },
    "16:30–17:15": {
      norte: { bodega: "A16" },
      patagonia: { bodega: "Domingo Molina", profesional: "Rafael Molina" },
      iguazu: { bodega: "La Coste de los Andes", profesional: "Natalia Valentina Suarez" },
      argentina: { bodega: "Antucura", profesional: "Mauricio Ortiz" },
      atlantica: { bodega: "Ojo de Tigre", profesional: "Alexandre Furniel" },
    },
    "17:30–18:15": {
      norte: { bodega: "La Macarena", profesional: "Brad Pitt & George Clone" },
      patagonia: { bodega: "Catena Zapata", profesional: "Arnaldo Gometz" },
      cuyo: { bodega: "Maison Pouget", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "Trapiche", profesional: "La Reina del Baile" },
      argentina: { bodega: "Cicchitti", profesional: "José Cicchitti" },
      atlantica: { bodega: "Desquiciado", profesional: "Gonzalo Camagnini" },
    },
    "18:30–19:15": {
      norte: { bodega: "Antigal" },
      patagonia: { bodega: "Primogénito", profesional: "Nicolás Navio" },
      iguazu: { bodega: "Zuccardi Olivas" },
      argentina: { bodega: "Proyecto X", profesional: "Maximiliano Zafate & Sebastián Visole" },
      atlantica: { bodega: "Los Imposibles", profesional: "Gabriela Armendariz" },
    },
    "19:30–20:15": {
      norte: { bodega: "Argana", profesional: "Rubén Arroyo" },
      patagonia: { bodega: "Mauricio Lorca", profesional: "José Lorca" },
      iguazu: { bodega: "Cuarto Surco", profesional: "Juan Diego Pannocchia" },
      argentina: { bodega: "Rutini Wines", restaurante: "La Rueda" },
      atlantica: { bodega: "Hermelinda Exceptional Blend", profesional: "María Rosa", restaurante: "Café & Bistró La Carolina (CDE)" },
    },
  },
  sabado: {
    "15:30–16:15": {
      norte: { bodega: "Kalòs Cru" },
      patagonia: { bodega: "Cara Sur", profesional: "Francisco Bugallo" },
      iguazu: {
        bodega: "Iniciando en el Mundo del Vino",
        profesional: "Alma María Cabral - Mejor Sommelier Argentina 2025",
        presenta: "Nos preparamos para ODA al Vino",
      },
      argentina: { bodega: "Bemberg", profesional: "Sebastián Nazabal Canalis", restaurante: "El Quincho del Tío Querido" },
      atlantica: { bodega: "Colomé", profesional: "Alejandro Pepa" },
    },
    "16:30–17:15": {
      norte: { bodega: "Sanchez Carrillo", profesional: "Jorge Gabriel" },
      patagonia: { bodega: "Flechas de los Andes", profesional: "La Princesa Alicia" },
      iguazu: { bodega: "A Corazón Abierto", profesional: "Leandro Azin", presenta: "Whisky de Montaña" },
      argentina: { bodega: "Yacochuya", profesional: "Arnaldo Etchart" },
      atlantica: { bodega: "Sposato" },
    },
    "17:30–18:15": {
      norte: { bodega: "Lauri Viana", profesional: "Pablo Sanchez" },
      patagonia: { bodega: "López", profesional: "Juan Pablo Diaz" },
      cuyo: { bodega: "Maison Pouget", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "Olivas Olei", profesional: "Gabriel Guardia" },
      argentina: { bodega: "Los Dragones", profesional: "Andrés Biscaizaque", restaurante: "El Quincho del Tío Querido" },
      atlantica: { bodega: "Isasmendi", profesional: "Clara Isasmendi" },
    },
    "18:30–19:15": {
      norte: { bodega: "Montequieto", profesional: "Leo Quercetti" },
      patagonia: { bodega: "Grazie Mille", profesional: "Fernando Spigatin" },
      iguazu: { bodega: "Susana Balbo", profesional: "Carlos Timoner" },
      argentina: { bodega: "Matervini" },
      atlantica: { bodega: "Hermelinda Exceptional Blend", profesional: "María Rosa", restaurante: "Café & Bistró La Carolina (CDE)" },
    },
    "19:30–20:15": {
      norte: { bodega: "Diamandes", profesional: "Ramiro Barillo" },
      patagonia: { bodega: "Domaine Bousquet", profesional: "Francisco Pannocchia" },
      iguazu: { bodega: "Ballester", profesional: "Lucas Ballester" },
      argentina: { bodega: "Falasco Wines", profesional: "Emanuel Renzini" },
      atlantica: { bodega: "Familia Altieri", profesional: "Nuestra Bella Dama" },
    },
  },
};

export const MAX_PER_DAY = 2;

export const salaById = (id: string) => SALAS.find((s) => s.id === id);
export const dayById = (id: string) => DAYS.find((d) => d.id === id);

export function cataId(day: string, slot: string, salaId: string) {
  return `${day}__${slot}__${salaId}`;
}

export function getCata(day: DayId, slot: string, salaId: SalaId): Cata | undefined {
  return SCHEDULE[day]?.[slot]?.[salaId];
}

/** Recorre toda la grilla; útil para sembrar cupos o para validar en el servidor. */
export function forEachCataPuntual(
  cb: (info: { day: DayId; slot: string; salaId: SalaId; sala: Sala; cata: Cata }) => void
) {
  DAYS.forEach((d) => {
    SLOTS.forEach((slot) => {
      const salasEnFranja = SCHEDULE[d.id][slot];
      if (!salasEnFranja) return;
      (Object.keys(salasEnFranja) as SalaId[]).forEach((salaId) => {
        const cata = salasEnFranja[salaId];
        const sala = salaById(salaId);
        if (cata && sala) cb({ day: d.id, slot, salaId, sala, cata });
      });
    });
  });
}

export type ValidationErrorCode = "EMPTY" | "MAX_PER_DAY" | "SLOT_CONFLICT" | "INVALID_CATA";

export interface ValidationResult {
  ok: boolean;
  /** Mensaje en español, listo para usar donde no haga falta i18n (ej. API). */
  error?: string;
  /** Código estable para que el cliente arme el mensaje traducido con t(). */
  errorCode?: ValidationErrorCode;
}

/**
 * Valida las reglas de negocio "estructurales" (no de cupo, eso lo resuelve la DB
 * de forma atómica): máximo 2 catas/día y ninguna sala repetida/simultánea en el mismo horario.
 */
export function validateSelections(selections: Selection[]): ValidationResult {
  if (selections.length === 0) {
    return { ok: false, error: "Elegí al menos una sala.", errorCode: "EMPTY" };
  }

  for (const day of DAYS.map((d) => d.id)) {
    const daySelections = selections.filter((s) => s.day === day);
    if (daySelections.length > MAX_PER_DAY) {
      return { ok: false, error: `Máximo ${MAX_PER_DAY} catas por día.`, errorCode: "MAX_PER_DAY" };
    }
    const slots = new Set<string>();
    for (const sel of daySelections) {
      if (slots.has(sel.slot)) {
        return { ok: false, error: "No podés elegir dos salas en el mismo horario.", errorCode: "SLOT_CONFLICT" };
      }
      slots.add(sel.slot);
    }
  }

  for (const sel of selections) {
    if (!getCata(sel.day, sel.slot, sel.salaId)) {
      return { ok: false, error: "Una de las catas elegidas no existe.", errorCode: "INVALID_CATA" };
    }
  }

  return { ok: true };
}
