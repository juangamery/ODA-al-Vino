import type { DayId, SalaId, Selection } from "@/lib/catas/schedule";

export interface SelectionRow {
  day: DayId;
  slot: string;
  sala_id: SalaId;
}

export interface RegistrationRow {
  id: string;
  nombre: string;
  contacto: string;
  documento: string | null;
  catas_selections: SelectionRow[];
}

export interface Persona {
  nombre: string;
  contacto: string;
  documento?: string;
  selections: Selection[];
}

/**
 * Junta las inscripciones por persona (nombre + email, normalizados) antes
 * de mandar nada. Bastante gente completó el formulario varias veces (una
 * cata por vez) en vez de elegir las 2 juntas — sin esto cada quien
 * recibiría un mail separado por cada envío suelto, en vez de uno solo con
 * toda su selección. También junta variantes de mayúsculas del mismo
 * nombre ("Julia rainho meister" / "Julia Rainho Meister").
 */
export function agruparPorPersona(rows: RegistrationRow[]): Persona[] {
  const grupos = new Map<string, Persona>();

  for (const r of rows) {
    const key = `${r.nombre.trim().toLowerCase()}|||${r.contacto.trim().toLowerCase()}`;
    const existente = grupos.get(key);
    const nuevasSelections: Selection[] = r.catas_selections.map((s) => ({
      day: s.day,
      slot: s.slot,
      salaId: s.sala_id,
    }));
    const documento = r.documento?.trim() || undefined;

    if (existente) {
      existente.selections.push(...nuevasSelections);
      if (!existente.documento && documento) existente.documento = documento;
    } else {
      grupos.set(key, { nombre: r.nombre.trim(), contacto: r.contacto.trim(), documento, selections: nuevasSelections });
    }
  }

  // Por si la misma cata puntual quedó guardada duplicada entre envíos.
  for (const persona of grupos.values()) {
    const vistas = new Set<string>();
    persona.selections = persona.selections.filter((s) => {
      const key = `${s.day}__${s.slot}__${s.salaId}`;
      if (vistas.has(key)) return false;
      vistas.add(key);
      return true;
    });
  }

  return Array.from(grupos.values());
}
