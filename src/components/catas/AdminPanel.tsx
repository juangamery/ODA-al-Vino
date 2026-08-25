"use client";

import { useEffect, useMemo, useState } from "react";
import { DAYS, SALAS, SCHEDULE, SLOTS, salaById, type DayId, type SalaId } from "@/lib/catas/schedule";
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

export function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [cupos, setCupos] = useState<CupoRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [filterDay, setFilterDay] = useState<DayId | "todos">("todos");
  const [filterSala, setFilterSala] = useState<SalaId | "todas">("todas");

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
      if (!res.ok) {
        const data = await res.json();
        setLoginError(data.error ?? "Clave incorrecta.");
        return;
      }
      setPasscode("");
      await loadData();
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

  const perCata = useMemo(() => {
    return cupos
      .filter((c) => (filterDay === "todos" || c.day === filterDay) && (filterSala === "todas" || c.sala_id === filterSala))
      .map((c) => {
        const sala = salaById(c.sala_id);
        const cata = SCHEDULE[c.day]?.[c.slot]?.[c.sala_id];
        const day = DAYS.find((d) => d.id === c.day);
        return { ...c, salaNombre: sala?.nombre ?? c.sala_id, bodega: cata?.bodega ?? "—", dayLabel: day?.label ?? c.day };
      })
      .sort((a, b) => (a.dayLabel + a.slot).localeCompare(b.dayLabel + b.slot));
  }, [cupos, filterDay, filterSala]);

  const filteredRegs = useMemo(() => {
    return registrations.filter((r) =>
      r.catas_selections.some(
        (sel) => (filterDay === "todos" || sel.day === filterDay) && (filterSala === "todas" || sel.sala_id === filterSala)
      )
    );
  }, [registrations, filterDay, filterSala]);

  const exportCsv = () => {
    if (!registrations.length) return;
    const header = ["Nombre", "Contacto", "Fecha", "Catas"];
    const rows = registrations.map((r) => {
      const detalle = r.catas_selections
        .map((sel) => {
          const day = DAYS.find((d) => d.id === sel.day);
          const sala = salaById(sel.sala_id);
          return `${day?.label} ${sel.slot} ${sala?.nombre}: ${sel.bodega}`;
        })
        .join(" | ");
      return [r.nombre, r.contacto, new Date(r.created_at).toLocaleString("es-AR"), detalle];
    });
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inscripciones_oav_2026.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl text-wine">Panel de administración</h1>
        <button onClick={handleLogout} className="rounded-full border border-wine/25 px-3 py-1.5 text-xs text-wine/70 hover:border-wine/50">
          Cerrar panel
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
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
        <button onClick={loadData} className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine hover:border-wine/50">
          Actualizar
        </button>
        <button onClick={exportCsv} className="rounded-lg border border-wine/25 bg-white px-3 py-2 text-xs text-wine hover:border-wine/50">
          Descargar CSV
        </button>
      </div>

      {loadError && <p className="mb-4 text-sm text-plum">{loadError}</p>}
      {loading && <p className="mb-4 text-sm text-wine/50">Cargando…</p>}

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {perCata.length === 0 && !loading && <p className="text-sm text-wine/40">No hay catas para este filtro.</p>}
        {perCata.map((c) => (
          <div key={`${c.day}-${c.slot}-${c.sala_id}`} className="rounded-lg border border-wine/15 bg-white/60 p-2.5 text-[11.5px]">
            <b className="block font-serif text-base normal-case tracking-normal text-plum">
              {c.ocupados} / {c.cupo_max}
            </b>
            {c.bodega}
            <br />
            {c.dayLabel.split(" ")[0]} · {c.slot} · {c.salaNombre}
          </div>
        ))}
      </div>

      {filteredRegs.length === 0 ? (
        <p className="py-8 text-center text-sm text-wine/40">No hay inscriptos para este filtro.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-wine/15">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="bg-wine/5 text-left text-[10.5px] uppercase tracking-wide text-plum">
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Contacto</th>
                <th className="px-3 py-2">Catas elegidas</th>
                <th className="px-3 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegs
                .slice()
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((r) => (
                  <tr key={r.id} className="border-t border-wine/10 align-top">
                    <td className="px-3 py-2">{r.nombre}</td>
                    <td className="px-3 py-2">{r.contacto}</td>
                    <td className="px-3 py-2">
                      {r.catas_selections
                        .filter(
                          (sel) => (filterDay === "todos" || sel.day === filterDay) && (filterSala === "todas" || sel.sala_id === filterSala)
                        )
                        .map((sel, i) => {
                          const day = DAYS.find((d) => d.id === sel.day);
                          const sala = salaById(sel.sala_id);
                          return (
                            <div key={i}>
                              {day?.label.split(" ")[0]} {sel.slot} · {sala?.nombre}: {sel.bodega}
                            </div>
                          );
                        })}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString("es-AR")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-[11.5px] leading-relaxed text-wine/50">
        Los datos se leen directamente de la base del formulario. Compartí siempre el mismo enlace de inscripción
        para que todas las respuestas queden juntas.
      </p>
    </div>
  );
}
