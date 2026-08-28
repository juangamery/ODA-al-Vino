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
      norte: { bodega: "Lui Wines", profesional: "Mauricio Veguetti", restaurante: "Perobal Iguazú", presenta: "20 años de Lui" },
      patagonia: { bodega: "Ernesto Zapata", profesional: "Indiana Jones", restaurante: "La Toscana", presenta: "Siesta Adobe" },
      iguazu: { bodega: "Iniciando en el Mundo del Vino", profesional: "Alma María Cabral - Mejor Sommelier Argentina 2025", presenta: "Iniciantes en el Mundo del Vino" },
      argentina: { bodega: "Bemberg", profesional: "Sebastián Nazabal Canalis", restaurante: "El Quincho del Tío Querido", presenta: "La Linterna Varietales 2016 - Homenaje 10 años" },
      atlantica: { bodega: "Mil Suelos", profesional: "Colo Sejantovich", restaurante: "ALSULTAN Shawarma", presenta: "BVOM La Verdade Tinto, Teho El Corte & Teho Gran Cru Las Paquerettes" },
    },
    "16:30–17:15": {
      norte: { bodega: "A16", profesional: "Emiliano Santillán", restaurante: "Perobal Iguazú", presenta: "Gran Apogeo" },
      patagonia: { bodega: "Domingo Molina", profesional: "Rafael Molina", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Rupestre" },
      cuyo: { bodega: "Maison Pouget", profesional: "Ricardo Scandura & Pablo Delgado", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "La Coste de los Andes", profesional: "Natalia Valentina Suarez", presenta: "Máximas" },
      argentina: { bodega: "Antucura", profesional: "Mauricio Ortiz", presenta: "Antucura Single Gran Vin" },
      atlantica: { bodega: "Ojo de Tigre", profesional: "Alexandre Furniel", presenta: "Cofermentado" },
    },
    "17:30–18:15": {
      norte: { bodega: "Funckenhausen", profesional: "Brad Pitt & Geroge Clone", restaurante: "Perobal Iguazú", presenta: "Cerpe Diem" },
      patagonia: { bodega: "Catena Zapata", profesional: "Arnaldo Gometz", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "The Birth of Cabernet Sauvignon" },
      cuyo: { bodega: "Maison Pouget", profesional: "Ricardo Scandura & Pablo Delgado", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "Trapiche", profesional: "La Reina del Baile", restaurante: "Yvyrá del Hotel O2", presenta: "Terroirs de Argentina" },
      argentina: { bodega: "Cicchitti", profesional: "José Cicchitti", restaurante: "La Toscana", presenta: "Cicchitti Emblema" },
      atlantica: { bodega: "Desquiciado", profesional: "Gonzalo Camagnini", presenta: "Alfa Malbec & Lanzamiento Salvaje Pinot Noir" },
    },
    "18:30–19:15": {
      norte: { bodega: "Antigal", profesional: "Federico Calderón", presenta: "ONE De Angeles" },
      patagonia: { bodega: "Primogénito", profesional: "Alejandro Clinaz", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Primogenito Sommelier" },
      iguazu: { bodega: "Zuccardi Olivas", profesional: "Victoria Ferre", restaurante: "La Toscana", presenta: "Varietales Zuccardi" },
      argentina: { bodega: "Proyecto X", profesional: "Maximiliano Zafate & Sebastián Visole", presenta: "Proyecto X Microfermentados" },
      atlantica: { bodega: "Los Imposibles", profesional: "Gabriela Armendariz", presenta: "Vinos de Altura" },
    },
    "19:30–20:15": {
      norte: { bodega: "Caro", profesional: "Pablo Serrano", presenta: "Caro 2010" },
      patagonia: { bodega: "Mauricio Lorca", profesional: "José Lorca", presenta: "Inspirado" },
      iguazu: { bodega: "Cuarto Surco", profesional: "Juan Diego Pannocchia", presenta: "El mundo de la Sidra" },
      argentina: { bodega: "Rutini Wines", profesional: "Diego Córdoba", presenta: "Centenario" },
      atlantica: { bodega: "Hermelinda Exceptional Blend", profesional: "María Rosa", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Aromas, Colores y Sabores del Té argentino" },
    },
  },
  sabado: {
    "15:30–16:15": {
      norte: { bodega: "Kalòs Cru", profesional: "Manuel Koteski", restaurante: "Perobal Iguazú", presenta: "Gran Kalòs" },
      patagonia: { bodega: "Cara Sur", profesional: "Francisco Bugallo", presenta: "La Totora y el Duraznero" },
      iguazu: { bodega: "Iniciando en el Mundo del Vino", profesional: "Alma María Cabral - Mejor Sommelier Argentina 2025", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Vamos al mundial de Sommelier" },
      argentina: { bodega: "Bemberg", profesional: "Sebastián Nazabal Canalis", restaurante: "El Quincho del Tío Querido", presenta: "Vertical Pionero" },
      atlantica: { bodega: "Bianchi", profesional: "Cristian Flores", presenta: "Enzo 2015" },
    },
    "16:30–17:15": {
      norte: { bodega: "Sanchez Carrillo", profesional: "Jorge Gabriel", presenta: "Jorge Carrillo" },
      patagonia: { bodega: "Flechas de los Andes", profesional: "La Princesa Alicia", restaurante: "La Toscana", presenta: "Gran Corte" },
      cuyo: { bodega: "Maison Pouget", profesional: "Ricardo Scandura & Pablo Delgado", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "A Corazón Abierto", profesional: "Leandro Azin", presenta: "Whisky de Montaña" },
      argentina: { bodega: "Yacochuya", profesional: "Arnaldo Etchart", presenta: "Herencial" },
      atlantica: { bodega: "Sposato", profesional: "Fernanda Gonzales", presenta: "Gran Sposato" },
    },
    "17:30–18:15": {
      norte: { bodega: "Lauri Viana", profesional: "Pablo Sanchez", restaurante: "Perobal Iguazú" },
      patagonia: { bodega: "López", profesional: "Juan Pablo Diaz", presenta: "115 años" },
      cuyo: { bodega: "Maison Pouget", profesional: "Ricardo Scandura & Pablo Delgado", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "Olivas Olei", profesional: "Gabriel Guardia", restaurante: "La Toscana", presenta: "Acetos y Olivas" },
      argentina: { bodega: "Los Dragones", profesional: "Andrés Biscaizaque", restaurante: "El Quincho del Tío Querido", presenta: "IG Barreal, IG Sorocayense & IG Hilario" },
      atlantica: { bodega: "Isasmendi", profesional: "Lucca Isasmendi", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Estiva Familiar Reservada Família Isasmendi 2022" },
    },
    "18:30–19:15": {
      norte: { bodega: "Montequieto", profesional: "Leo Quercetti", restaurante: "Perobal Iguazú" },
      patagonia: { bodega: "Grazie Mille", profesional: "Fernando Spigatin", restaurante: "La Toscana", presenta: "Designe" },
      iguazu: { bodega: "Susana Balbo", profesional: "Carlos Timoner", restaurante: "Yvyrá del Hotel O2", presenta: "Torrontés Naaranjo" },
      argentina: { bodega: "Vistalba", profesional: "Fernando Colucci", restaurante: "ALSULTAN Shawarma", presenta: "Gran Malbec DOC & Malbec DOC" },
      atlantica: { bodega: "Hermelinda Exceptional Blend", profesional: "María Rosa", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Té Puro & Blend" },
    },
    "19:30–20:15": {
      norte: { bodega: "Diamandes", profesional: "Ramiro Barillo", presenta: "Terruño Diamandes" },
      patagonia: { bodega: "Domaine Bousquet", profesional: "Francisco Pannocchia", presenta: "Ameri" },
      cuyo: { bodega: "Maison Pouget", profesional: "Ricardo Scandura & Pablo Delgado", restaurante: "El Quincho del Tío Querido" },
      iguazu: { bodega: "Durigutti", profesional: "Mateo Durigutti", presenta: "Pruecto las Compuertas 1914 Malbec Histórico" },
      argentina: { bodega: "Falasco Wines", profesional: "Agente 007", presenta: "Brassano Malbec & Chaardonnay" },
      atlantica: { bodega: "Familia Altieri", profesional: "Miss Dulce", restaurante: "Café & Bistró La Carolina (CDE)", presenta: "Lanzamiento Sangiovese" },
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
