"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DAYS,
  MAX_PER_DAY,
  SALAS,
  SCHEDULE,
  SLOTS,
  cataId,
  getCata,
  salaById,
  validateSelections,
  type DayId,
  type SalaId,
  type Selection,
} from "@/lib/catas/schedule";
import { Button } from "@/components/ui/Button";

interface SelectionRow {
  day: DayId;
  slot: string;
  sala_id: SalaId;
  bodega: string;
}

interface RegistrationRow {
  id: string;
  nombre: string;
  contacto: string;
  created_at: string;
  catas_selections: SelectionRow[];
}

interface CupoRow {
  day: DayId;
  slot: string;
  sala_id: SalaId;
  ocupados: number;
  cupo_max: number;
}

interface Attendee {
  id: string;
  nombre: string;
  contacto: string;
}

export function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [cupos, setCupos] = useState<CupoRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<"sala" | "panorama">("sala");
  const [filterDay, setFilterDay] = useState<DayId | "todos">("todos");
  const [filterSala, setFilterSala] = useState<SalaId | "todas">("todas");

  const [editingSala, setEditingSala] = useState<SalaId | null>(null);
  const [cupoInput, setCupoInput] = useState("");
  const [savingCupo, setSavingCupo] = useState(false);
  const [cupoError, setCupoError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showManualAdd, setShowManualAdd] = useState(false);
  const [manualNombre, setManualNombre] = useState("");
  const [manualDocumento, setManualDocumento] = useState("");
  const [manualContacto, setManualContacto] = useState("");
  const [manualSelections, setManualSelections] = useState<Selection[]>([]);
  const [manualError, setManualError] = useState<string | null>(null);
  const [manualSaving, setManualSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/catas/admin/data", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setLoadError(data.error ?? "No se pudo cargar la información.");
        return;
      }
      setAuthed(true);
      setRegistrations(data.registrations ?? []);
      setCupos(data.cupos ?? []);
    } catch (e) {
      console.error(e);
      setLoadError("No se pudo cargar. Reintentá.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = async () => {
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/catas/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // respuesta no-JSON (ej. error 500 genérico del servidor)
      }
      if (!res.ok) {
        setLoginError(data.error ?? `Error inesperado (${res.status}). Probá de nuevo.`);
        return;
      }
      setPasscode("");
      await loadData();
    } catch (e) {
      console.error(e);
      setLoginError("No se pudo conectar con el servidor. Probá de nuevo.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/catas/admin/logout", { method: "POST" });
    setAuthed(false);
    setRegistrations([]);
    setCupos([]);
  };

  // cataId -> lista de inscriptos en esa cata puntual.
  const attendeesByCata = useMemo(() => {
    const map = new Map<string, Attendee[]>();
    registrations.forEach((r) => {
      r.catas_selections.forEach((sel) => {
        const key = cataId(sel.day, sel.slot, sel.sala_id);
        const list = map.get(key) ?? [];
        list.push({ id: r.id, nombre: r.nombre, contacto: r.contacto });
        map.set(key, list);
      });
    });
    return map;
  }, [registrations]);

  const cupoByCata = useMemo(() => {
    const map = new Map<string, CupoRow>();
    cupos.forEach((c) => map.set(cataId(c.day, c.slot, c.sala_id), c));
    return map;
  }, [cupos]);

  // Estructura principal: sala → (día, horario) → bodega + inscriptos.
  const salaSections = useMemo(() => {
    const visibleSalas = filterSala === "todas" ? SALAS : SALAS.filter((s) => s.id === filterSala);
    const visibleDays = filterDay === "todos" ? DAYS : DAYS.filter((d) => d.id === filterDay);

    return visibleSalas
      .map((sala) => {
        const rows = visibleDays.flatMap((day) =>
          SLOTS.map((slot) => {
            const cata = SCHEDULE[day.id][slot]?.[sala.id];
            if (!cata) return null;
            const key = cataId(day.id, slot, sala.id);
            const attendees = (attendeesByCata.get(key) ?? []).slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
            const cupo = cupoByCata.get(key);
            return { day, slot, cata, attendees, cupoMax: cupo?.cupo_max ?? sala.pax };
          })
        ).filter((r): r is NonNullable<typeof r> => r !== null);

        const total = rows.reduce((acc, r) => acc + r.attendees.length, 0);
        return { sala, rows, total };
      })
      .filter((s) => s.rows.length > 0);
  }, [filterSala, filterDay, attendeesByCata, cupoByCata]);

  const totalInscriptos = registrations.length;

  // Panorama: métricas generales de ocupación, calculadas sobre los mismos
  // datos que ya trae /api/catas/admin/data — no pega a ningún endpoint nuevo.
  const panorama = useMemo(() => {
    const totalCatasElegidas = cupos.reduce((acc, c) => acc + c.ocupados, 0);
    const totalCupoMax = cupos.reduce((acc, c) => acc + c.cupo_max, 0);

    const porDia = DAYS.map((day) => {
      const rows = cupos.filter((c) => c.day === day.id);
      const ocupados = rows.reduce((acc, c) => acc + c.ocupados, 0);
      const cupoMax = rows.reduce((acc, c) => acc + c.cupo_max, 0);
      return { day, ocupados, cupoMax };
    });

    const catasOrdenadas = cupos
      .map((c) => {
        const cata = getCata(c.day, c.slot, c.sala_id);
        const sala = salaById(c.sala_id);
        const pct = c.cupo_max > 0 ? Math.round((100 * c.ocupados) / c.cupo_max) : 0;
        return { ...c, bodega: cata?.bodega ?? "—", salaNombre: sala?.nombre ?? c.sala_id, pct };
      })
      .sort((a, b) => b.pct - a.pct);

    const vacias = catasOrdenadas.filter((c) => c.ocupados === 0);

    const bodegaCounts = new Map<string, number>();
    registrations.forEach((r) =>
      r.catas_selections.forEach((sel) => {
        bodegaCounts.set(sel.bodega, (bodegaCounts.get(sel.bodega) ?? 0) + 1);
      })
    );
    const topBodegas = Array.from(bodegaCounts.entries())
      .map(([bodega, inscriptos]) => ({ bodega, inscriptos }))
      .sort((a, b) => b.inscriptos - a.inscriptos)
      .slice(0, 10);

    return { totalCatasElegidas, totalCupoMax, porDia, catasOrdenadas, vacias, topBodegas };
  }, [cupos, registrations]);

  const buildCsvRows = (onlySala?: SalaId) => {
    const rows: string[][] = [];
    SALAS.forEach((sala) => {
      if (onlySala && sala.id !== onlySala) return;
      DAYS.forEach((day) => {
        SLOTS.forEach((slot) => {
          const cata = SCHEDULE[day.id][slot]?.[sala.id];
          if (!cata) return;
          const key = cataId(day.id, slot, sala.id);
          const attendees = (attendeesByCata.get(key) ?? []).slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
          attendees.forEach((a) => rows.push([sala.nombre, day.label, slot, cata.bodega, a.nombre, a.contacto]));
        });
      });
    });
    return rows;
  };

  const downloadCsv = (rows: string[][], filename: string) => {
    if (!rows.length) return;
    const header = ["Sala", "Día", "Horario", "Bodega", "Nombre", "Contacto"];
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAll = () => downloadCsv(buildCsvRows(), "inscripciones_oav_2026_completo.csv");
  const exportSala = (salaId: SalaId) => {
    const sala = salaById(salaId);
    downloadCsv(buildCsvRows(salaId), `inscripciones_oav_2026_${sala?.nombre.toLowerCase() ?? salaId}.csv`);
  };

  const startEditCupo = (salaId: SalaId, currentMax: number) => {
    setEditingSala(salaId);
    setCupoInput(String(currentMax));
    setCupoError(null);
  };

  const saveCupo = async (salaId: SalaId) => {
    const value = Number(cupoInput);
    if (!Number.isInteger(value) || value < 1) {
      setCupoError("Ingresá un número entero mayor a 0.");
      return;
    }
    setSavingCupo(true);
    setCupoError(null);
    try {
      const res = await fetch("/api/catas/admin/cupo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salaId, cupoMax: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCupoError(data.error ?? "No se pudo actualizar el cupo.");
        return;
      }
      setEditingSala(null);
      await loadData();
    } catch (e) {
      console.error(e);
      setCupoError("No se pudo actualizar el cupo.");
    } finally {
      setSavingCupo(false);
    }
  };

  const handleDelete = async (attendee: Attendee) => {
    const confirmed = window.confirm(
      `¿Eliminar la inscripción de ${attendee.nombre} (${attendee.contacto})? Esto borra TODAS las salas que eligió, no sólo esta, y libera su cupo. No se puede deshacer.`
    );
    if (!confirmed) return;

    setDeletingId(attendee.id);
    try {
      const res = await fetch("/api/catas/admin/inscripcion", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: attendee.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "No se pudo eliminar la inscripción.");
        return;
      }
      await loadData();
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar la inscripción.");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleManualSelection = (sel: Selection) => {
    setManualError(null);
    setManualSelections((prev) => {
      const exists = prev.some((s) => s.day === sel.day && s.slot === sel.slot && s.salaId === sel.salaId);
      if (exists) {
        return prev.filter((s) => !(s.day === sel.day && s.slot === sel.slot && s.salaId === sel.salaId));
      }
      return [...prev, sel];
    });
  };

  const resetManualForm = () => {
    setManualNombre("");
    setManualDocumento("");
    setManualContacto("");
    setManualSelections([]);
    setManualError(null);
  };

  const handleManualSubmit = async () => {
    if (!manualNombre.trim()) {
      setManualError("Completá al menos el nombre.");
      return;
    }
    const validation = validateSelections(manualSelections);
    if (!validation.ok) {
      setManualError(validation.error ?? "Revisá las catas elegidas.");
      return;
    }
    setManualSaving(true);
    setManualError(null);
    try {
      const res = await fetch("/api/catas/admin/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: manualNombre.trim(),
          documento: manualDocumento.trim(),
          contacto: manualContacto.trim(),
          selections: manualSelections,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setManualError(data.error ?? "No se pudo guardar la inscripción.");
        return;
      }
      resetManualForm();
      setShowManualAdd(false);
      await loadData();
    } catch (e) {
      console.error(e);
      setManualError("No se pudo guardar la inscripción.");
    } finally {
      setManualSaving(false);
    }
  };

  if (authed === null) {
    return <div className="py-24 text-center text-wine/60">Cargando…</div>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-5 py-24 text-center">
        <p className="lato-expanded text-[11px] text-plum">ODA al Vino · 2026</p>
        <h2 className="mt-2 text-2xl text-wine">Panel de administración</h2>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Clave de acceso"
          className="my-4 w-full rounded-lg border border-wine/25 bg-white px-3 py-2.5 text-center text-sm text-wine focus:outline-none focus:ring-2 focus:ring-harvest"
        />
        <Button className="w-full" disabled={loggingIn} onClick={handleLogin}>
          {loggingIn ? "Ingresando…" : "Ingresar"}
        </Button>
        {loginError && <p className="mt-3 text-sm text-plum">{loginError}</p>}
        <p className="mt-6 text-[11.5px] leading-relaxed text-wine/50">
          Este es un acceso simple pensado para uso interno del equipo organizador, no un login con contraseñas
          individuales por persona.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:py-12">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl text-wine">Panel de administración</h1>
        <button
          onClick={handleLogout}
          className="rounded-full border border-wine/25 px-3 py-1.5 text-xs text-wine/70 hover:border-wine/50"
        >
          Cerrar panel
        </button>
      </div>
      <p className="mb-4 text-[12.5px] text-wine/50">
        {totalInscriptos} inscripto{totalInscriptos === 1 ? "" : "s"} en total · organizado por sala para control en
        la entrada.
      </p>

      <div className="mb-4 flex gap-1 rounded-full border border-wine/15 bg-white/60 p-1 text-xs">
        <button
          onClick={() => setView("sala")}
          className={`rounded-full px-3 py-1.5 ${view === "sala" ? "bg-wine text-paper" : "text-wine/60 hover:text-wine"}`}
        >
          Por sala
        </button>
        <button
          onClick={() => setView("panorama")}
          className={`rounded-full px-3 py-1.5 ${view === "panorama" ? "bg-wine text-paper" : "text-wine/60 hover:text-wine"}`}
        >
          Panorama
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowManualAdd((v) => !v)}
          className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine hover:border-wine/50"
        >
          {showManualAdd ? "Cancelar alta manual" : "+ Agregar inscripción manual"}
        </button>
        {showManualAdd && (
          <div className="mt-3 rounded-2xl border border-wine/15 bg-white/60 p-4">
            <p className="mb-3 text-[11.5px] leading-relaxed text-wine/60">
              Para casos puntuales (ej. el validador de documento no le funciona a alguien, o sólo tenés el nombre).
              Esto NO verifica contra el CRM de participantes — asumís que ya confirmaste que es una persona válida.
              Sí respeta el cupo y el máximo de {MAX_PER_DAY} catas por día. Documento y email son opcionales: si no
              los cargás, esa persona no va a recibir mail de confirmación ni se va a poder identificar por
              documento más adelante.
            </p>
            <div className="mb-3 grid gap-2 sm:grid-cols-3">
              <input
                type="text"
                value={manualNombre}
                onChange={(e) => setManualNombre(e.target.value)}
                placeholder="Nombre completo"
                className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-sm text-wine focus:outline-none focus:ring-2 focus:ring-harvest"
              />
              <input
                type="text"
                value={manualDocumento}
                onChange={(e) => setManualDocumento(e.target.value)}
                placeholder="Documento (opcional)"
                className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-sm text-wine focus:outline-none focus:ring-2 focus:ring-harvest"
              />
              <input
                type="email"
                value={manualContacto}
                onChange={(e) => setManualContacto(e.target.value)}
                placeholder="Email (opcional)"
                className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-sm text-wine focus:outline-none focus:ring-2 focus:ring-harvest"
              />
            </div>

            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              {DAYS.map((day) => (
                <div key={day.id} className="rounded-xl border border-wine/10 p-3">
                  <p className="mb-2 lato-expanded text-[10px] text-plum">{day.label}</p>
                  <div className="space-y-1.5">
                    {SLOTS.flatMap((slot) =>
                      SALAS.map((sala) => {
                        const cata = SCHEDULE[day.id][slot]?.[sala.id];
                        if (!cata) return null;
                        const key = cataId(day.id, slot, sala.id);
                        const cupo = cupoByCata.get(key);
                        const ocupados = cupo?.ocupados ?? 0;
                        const cupoMax = cupo?.cupo_max ?? sala.pax;
                        const checked = manualSelections.some(
                          (s) => s.day === day.id && s.slot === slot && s.salaId === sala.id
                        );
                        const full = ocupados >= cupoMax && !checked;
                        return (
                          <label
                            key={key}
                            className={`flex items-center justify-between gap-2 text-[11.5px] ${
                              full ? "text-wine/30" : "text-wine/80"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={full}
                                onChange={() => toggleManualSelection({ day: day.id, slot, salaId: sala.id })}
                              />
                              {slot} · {sala.nombre} · {cata.bodega}
                            </span>
                            <span>
                              {ocupados}/{cupoMax}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>

            {manualError && <p className="mb-3 text-[12px] text-plum">{manualError}</p>}

            <button
              onClick={handleManualSubmit}
              disabled={manualSaving}
              className="rounded-full bg-wine px-4 py-2 text-xs font-semibold text-paper hover:bg-plum disabled:opacity-50"
            >
              {manualSaving ? "Guardando…" : "Guardar inscripción"}
            </button>
          </div>
        )}
      </div>

      {view === "sala" && (
        <div className="mb-6 flex flex-wrap gap-2">
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value as DayId | "todos")}
            className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine"
          >
            <option value="todos">Todos los días</option>
            {DAYS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
          <select
            value={filterSala}
            onChange={(e) => setFilterSala(e.target.value as SalaId | "todas")}
            className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine"
          >
            <option value="todas">Todas las salas</option>
            {SALAS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
          <button
            onClick={loadData}
            className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine hover:border-wine/50"
          >
            Actualizar
          </button>
          <button
            onClick={exportAll}
            className="rounded-lg border border-wine/25 bg-wine px-3 py-2 text-xs font-semibold text-paper hover:bg-plum"
          >
            Descargar CSV completo
          </button>
        </div>
      )}
      {view === "panorama" && (
        <div className="mb-6">
          <button
            onClick={loadData}
            className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine hover:border-wine/50"
          >
            Actualizar
          </button>
        </div>
      )}

      {loadError && <p className="mb-4 text-sm text-plum">{loadError}</p>}
      {loading && <p className="mb-4 text-sm text-wine/50">Cargando…</p>}

      {view === "sala" && !loading && salaSections.length === 0 && (
        <p className="py-8 text-center text-sm text-wine/40">No hay catas para este filtro.</p>
      )}

      {view === "sala" && (
      <div className="space-y-6">
        {salaSections.map(({ sala, rows, total }) => {
          const currentCupo = rows[0]?.cupoMax ?? sala.pax;
          const isEditing = editingSala === sala.id;
          return (
          <section key={sala.id} className="overflow-hidden rounded-2xl border border-wine/15 bg-white/60">
            <header className="flex flex-wrap items-center justify-between gap-2 bg-wine/8 px-4 py-3">
              <div>
                <h2 className="font-serif text-lg normal-case tracking-normal text-wine">Sala {sala.nombre}</h2>
                <p className="text-[11.5px] text-wine/60">
                  {total} inscripto{total === 1 ? "" : "s"} · cupo {currentCupo} por cata
                </p>
              </div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    autoFocus
                    value={cupoInput}
                    onChange={(e) => setCupoInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveCupo(sala.id)}
                    className="w-20 rounded-lg border border-wine/25 bg-white px-2 py-1.5 text-sm text-wine focus:outline-none focus:ring-2 focus:ring-harvest"
                  />
                  <button
                    onClick={() => saveCupo(sala.id)}
                    disabled={savingCupo}
                    className="rounded-full bg-wine px-3 py-1.5 text-[11px] font-semibold text-paper hover:bg-plum disabled:opacity-50"
                  >
                    {savingCupo ? "Guardando…" : "Guardar"}
                  </button>
                  <button
                    onClick={() => setEditingSala(null)}
                    className="text-[11px] text-wine/50 hover:text-wine"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditCupo(sala.id, currentCupo)}
                    className="rounded-full border border-wine/25 bg-white px-3 py-1.5 text-[11px] text-wine hover:border-wine/50"
                  >
                    Editar cupo
                  </button>
                  <button
                    onClick={() => exportSala(sala.id)}
                    className="rounded-full border border-wine/25 bg-white px-3 py-1.5 text-[11px] text-wine hover:border-wine/50"
                  >
                    CSV de esta sala
                  </button>
                </div>
              )}
            </header>
            {isEditing && cupoError && (
              <p className="border-b border-wine/10 bg-plum/10 px-4 py-2 text-[11.5px] text-plum">{cupoError}</p>
            )}
            <div className="divide-y divide-wine/10">
              {rows.map((row) => (
                <div key={`${row.day.id}-${row.slot}`} className="px-4 py-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="lato-expanded text-[10px] text-plum">
                        {row.day.label} · {row.slot}
                      </span>
                      <p className="font-serif text-base normal-case tracking-normal text-wine">{row.cata.bodega}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10.5px] ${
                        row.attendees.length >= row.cupoMax ? "bg-plum/15 text-plum" : "bg-wine/8 text-wine/60"
                      }`}
                    >
                      {row.attendees.length}/{row.cupoMax}
                    </span>
                  </div>
                  {row.attendees.length === 0 ? (
                    <p className="text-[12px] italic text-wine/40">Sin inscriptos todavía.</p>
                  ) : (
                    <ol className="space-y-1 text-[12.5px] text-wine/80">
                      {row.attendees.map((a, i) => (
                        <li
                          key={a.id}
                          className="flex items-baseline justify-between gap-3 border-b border-dashed border-wine/10 pb-1 last:border-0"
                        >
                          <span>
                            {i + 1}. {a.nombre}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-wine/50">{a.contacto}</span>
                            <button
                              onClick={() => handleDelete(a)}
                              disabled={deletingId === a.id}
                              title="Eliminar esta inscripción"
                              className="text-wine/40 hover:text-plum disabled:opacity-40"
                            >
                              {deletingId === a.id ? "…" : "✕"}
                            </button>
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </section>
          );
        })}
      </div>
      )}

      {view === "panorama" && !loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Inscripciones", value: totalInscriptos },
              { label: "Catas elegidas", value: panorama.totalCatasElegidas },
              {
                label: "Ocupación general",
                value:
                  panorama.totalCupoMax > 0
                    ? `${Math.round((100 * panorama.totalCatasElegidas) / panorama.totalCupoMax)}%`
                    : "—",
              },
              { label: "Catas sin inscriptos", value: panorama.vacias.length },
            ].map((tile) => (
              <div key={tile.label} className="rounded-2xl border border-wine/15 bg-white/60 px-4 py-3">
                <p className="text-2xl text-wine">{tile.value}</p>
                <p className="text-[11px] text-wine/60">{tile.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-wine/15 bg-white/60 p-4">
            <h2 className="mb-3 font-serif text-lg normal-case tracking-normal text-wine">Ocupación por día</h2>
            <div className="space-y-3">
              {panorama.porDia.map(({ day, ocupados, cupoMax }) => {
                const pct = cupoMax > 0 ? Math.round((100 * ocupados) / cupoMax) : 0;
                return (
                  <div key={day.id}>
                    <div className="mb-1 flex items-center justify-between text-[12px] text-wine/70">
                      <span>{day.label}</span>
                      <span>
                        {ocupados}/{cupoMax} · {pct}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-wine/10">
                      <div
                        className="h-full rounded-full bg-harvest"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-wine/15 bg-white/60 p-4">
            <h2 className="mb-3 font-serif text-lg normal-case tracking-normal text-wine">
              Ocupación por cata (de más a menos llena)
            </h2>
            <div className="max-h-[28rem] overflow-y-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="sticky top-0 bg-paper text-wine/50">
                  <tr>
                    <th className="py-1.5 pr-2 font-normal">Bodega</th>
                    <th className="py-1.5 pr-2 font-normal">Sala</th>
                    <th className="py-1.5 pr-2 font-normal">Día · horario</th>
                    <th className="py-1.5 pr-2 text-right font-normal">Ocupación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wine/10">
                  {panorama.catasOrdenadas.map((c) => (
                    <tr key={cataId(c.day, c.slot, c.sala_id)}>
                      <td className="py-1.5 pr-2 text-wine">{c.bodega}</td>
                      <td className="py-1.5 pr-2 text-wine/70">{c.salaNombre}</td>
                      <td className="py-1.5 pr-2 text-wine/70">
                        {DAYS.find((d) => d.id === c.day)?.label} · {c.slot}
                      </td>
                      <td className="py-1.5 pr-2 text-right">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10.5px] ${
                            c.pct >= 90
                              ? "bg-plum/15 text-plum"
                              : c.pct >= 50
                                ? "bg-harvest/20 text-wine"
                                : c.ocupados === 0
                                  ? "bg-wine/5 text-wine/40"
                                  : "bg-wine/8 text-wine/60"
                          }`}
                        >
                          {c.ocupados}/{c.cupo_max} ({c.pct}%)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-wine/15 bg-white/60 p-4">
            <h2 className="mb-3 font-serif text-lg normal-case tracking-normal text-wine">Bodegas más elegidas</h2>
            {panorama.topBodegas.length === 0 ? (
              <p className="text-[12px] italic text-wine/40">Todavía no hay inscripciones.</p>
            ) : (
              <ol className="space-y-1.5 text-[12.5px] text-wine/80">
                {panorama.topBodegas.map((b, i) => (
                  <li key={b.bodega} className="flex items-center justify-between gap-3">
                    <span>
                      {i + 1}. {b.bodega}
                    </span>
                    <span className="text-wine/50">{b.inscriptos}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-[11.5px] leading-relaxed text-wine/50">
        Los datos se leen directamente de la base del formulario. Compartí siempre el mismo enlace de inscripción
        para que todas las respuestas queden juntas.
      </p>
    </div>
  );
}
