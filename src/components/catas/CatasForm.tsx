"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DAYS,
  MAX_PER_DAY,
  SALAS,
  SCHEDULE,
  SLOTS,
  SalaId,
  Selection,
  cataId,
  salaById,
  validateSelections,
  type DayId,
} from "@/lib/catas/schedule";
import { Button } from "@/components/ui/Button";

type SelectionsByDay = Record<DayId, Selection[]>;
type ParticipantStatus = "idle" | "checking" | "confirmed" | "not_found";

const EMPTY_SELECTIONS: SelectionsByDay = { viernes: [], sabado: [] };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CatasForm() {
  const [activeDay, setActiveDay] = useState<DayId>(DAYS[0].id);
  const [selections, setSelections] = useState<SelectionsByDay>(EMPTY_SELECTIONS);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [openDetails, setOpenDetails] = useState<Set<string>>(new Set());
  const [ticketExpanded, setTicketExpanded] = useState(false);

  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [participantStatus, setParticipantStatus] = useState<ParticipantStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ nombre: string; items: string[] } | null>(null);

  const loadCounts = async () => {
    try {
      const res = await fetch("/api/catas/disponibilidad", { cache: "no-store" });
      const data = await res.json();
      if (data?.counts) setCounts(data.counts);
    } catch (e) {
      console.error("No se pudo cargar la disponibilidad", e);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  useEffect(() => {
    const email = contacto.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      setParticipantStatus("idle");
      return;
    }
    setParticipantStatus("checking");
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/catas/verificar-participante?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.is_participant === true) {
          setParticipantStatus("confirmed");
          setNombre((prev) => (prev.trim() ? prev : data.nombre ?? prev));
        } else if (data.is_participant === false) {
          setParticipantStatus("not_found");
        } else {
          setParticipantStatus("idle");
        }
      } catch (e) {
        console.error("verificar-participante error:", e);
        setParticipantStatus("idle");
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [contacto]);

  const totalSelected = selections.viernes.length + selections.sabado.length;

  const toggleSelection = (day: DayId, slot: string, salaId: SalaId) => {
    setSelections((prev) => {
      const daySel = prev[day];
      const exists = daySel.some((s) => s.slot === slot && s.salaId === salaId);
      const next = exists
        ? daySel.filter((s) => !(s.slot === slot && s.salaId === salaId))
        : [...daySel, { day, slot, salaId }];
      return { ...prev, [day]: next };
    });
  };

  const toggleDetails = (id: string) => {
    setOpenDetails((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async () => {
    setFormError(null);
    const trimmedNombre = nombre.trim();
    const trimmedContacto = contacto.trim();
    const allSelections = [...selections.viernes, ...selections.sabado];

    if (!trimmedNombre || !trimmedContacto) {
      setFormError("Completá nombre y email.");
      return;
    }
    if (!EMAIL_RE.test(trimmedContacto)) {
      setFormError("Ingresá un email válido.");
      return;
    }
    if (participantStatus === "not_found") {
      setFormError(
        "Este email no corresponde a un participante confirmado de ODA al Vino 2026. Usá el mismo email con el que compraste tu entrada."
      );
      return;
    }
    const validation = validateSelections(allSelections);
    if (!validation.ok) {
      setFormError(validation.error ?? "Revisá tu selección.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/catas/inscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: trimmedNombre, contacto: trimmedContacto, selections: allSelections }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error ?? "Hubo un problema al guardar la inscripción.");
        await loadCounts();
        return;
      }

      const items = allSelections.map((sel) => {
        const day = DAYS.find((d) => d.id === sel.day)!;
        const sala = salaById(sel.salaId)!;
        const cata = SCHEDULE[sel.day][sel.slot]![sel.salaId]!;
        return `${day.label} · ${sel.slot} · ${sala.nombre}: ${cata.bodega}`;
      });
      setConfirmation({ nombre: trimmedNombre, items });
      setNombre("");
      setContacto("");
      setParticipantStatus("idle");
      setSelections(EMPTY_SELECTIONS);
      await loadCounts();
    } catch (e) {
      console.error(e);
      setFormError("Hubo un problema al guardar la inscripción. Probá de nuevo en unos segundos.");
    } finally {
      setSubmitting(false);
    }
  };

  const daySelections = selections[activeDay];
  const dayMaxReached = daySelections.length >= MAX_PER_DAY;
  const takenSlots = useMemo(() => new Set(daySelections.map((s) => s.slot)), [daySelections]);

  if (confirmation) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <img src="/oda/brand/lacre_oav.svg" alt="" className="mx-auto mb-6 h-16 w-16" />
        <p className="script text-4xl text-wine mb-2">¡Listo, {confirmation.nombre}!</p>
        <p className="text-wine/70 mb-8">Tu inscripción a las salas de degustación quedó confirmada.</p>
        <ul className="mb-8 space-y-2 rounded-2xl border border-wine/15 bg-white/50 p-5 text-left text-base text-wine/90">
          {confirmation.items.map((item, i) => (
            <li key={i} className="border-b border-wine/10 pb-2 last:border-0 last:pb-0">
              {item}
            </li>
          ))}
        </ul>
        <Button variant="outline" onClick={() => setConfirmation(null)}>
          Hacer otra inscripción
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pb-28 md:pb-16">
      <header className="px-5 pb-4 pt-10 text-center md:pt-16">
        <img src="/oda/brand/logo_violeta_horizontal.svg" alt="ODA al Vino" className="mx-auto mb-6 h-10 md:h-12" />
        <p className="lato-expanded text-xs text-plum">ODA al Vino · 2026</p>
        <h1 className="mt-2 text-3xl text-wine md:text-5xl">Inscripción a salas de degustación</h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-wine/70 normal-case tracking-normal font-sans md:text-lg">
          Viernes 04 y sábado 05 de septiembre. Podés elegir hasta {MAX_PER_DAY} catas por día. Si dos salas
          coinciden en el mismo horario, sólo podés estar en una.
        </p>
        <div className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 md:max-w-none md:flex-nowrap md:whitespace-nowrap">
          <span className="lato-expanded text-xs text-plum">Las salas:</span>
          {SALAS.map((sala) => (
            <span
              key={sala.id}
              className="rounded-full bg-wine/8 px-3 py-1 text-sm font-semibold text-wine normal-case tracking-normal"
            >
              {sala.nombre}
            </span>
          ))}
        </div>
      </header>

      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-center gap-2 px-5 py-4">
        {DAYS.map((d) => {
          const n = selections[d.id].length;
          const active = d.id === activeDay;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDay(d.id)}
              className={`flex items-center gap-2.5 rounded-full border px-6 py-3 text-base transition ${
                active
                  ? "border-transparent bg-wine text-paper font-bold"
                  : "border-wine/25 bg-white/40 text-wine/80 hover:border-wine/50"
              }`}
            >
              {d.label}
              <span className="flex gap-1">
                {Array.from({ length: MAX_PER_DAY }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < n ? (active ? "bg-paper" : "bg-wine") : active ? "bg-paper/30" : "bg-wine/20"
                    }`}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-5 pb-10 md:grid-cols-[1fr_340px] md:items-start">
        <div>
          {SLOTS.map((slot) => {
            const salasEnFranja = SCHEDULE[activeDay][slot];
            if (!salasEnFranja) return null;
            const salaIds = Object.keys(salasEnFranja) as SalaId[];
            if (salaIds.length === 0) return null;

            return (
              <div key={slot} className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-wine px-5 py-2 font-sans text-lg font-bold text-paper md:text-xl">
                    {slot}
                  </span>
                  <span className="lato-expanded text-xs text-plum">hs</span>
                  <span className="h-px flex-1 bg-wine/15" />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {salaIds.map((salaId) => {
                    const cata = salasEnFranja[salaId]!;
                    const sala = salaById(salaId)!;
                    const id = cataId(activeDay, slot, salaId);
                    const isSelected = daySelections.some((s) => s.slot === slot && s.salaId === salaId);
                    const ocupados = counts[id] ?? 0;
                    const full = ocupados >= sala.pax && !isSelected;
                    const slotTaken = takenSlots.has(slot) && !isSelected;
                    const maxReached = dayMaxReached && !isSelected;
                    const disabled = full || slotTaken || maxReached;
                    const hasExtra = !!(cata.restaurante || cata.presenta);
                    const detailsOpen = openDetails.has(id);
                    const low = sala.pax - ocupados <= 5 && !full;

                    return (
                      <div
                        key={salaId}
                        onClick={() => !disabled && toggleSelection(activeDay, slot, salaId)}
                        className={`rounded-2xl border-2 p-5 transition ${
                          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-plum/40"
                        } ${
                          isSelected
                            ? "border-harvest bg-harvest/10 shadow-[0_0_0_1px_rgba(124,132,25,0.4)_inset]"
                            : "border-wine/15 bg-white/50"
                        }`}
                      >
                        <div className="lato-expanded text-xs text-plum">{sala.nombre}</div>
                        <div className="mt-1.5 font-serif text-2xl normal-case tracking-normal text-wine md:text-[26px]">
                          {cata.bodega}
                        </div>
                        <div className={`mt-1.5 text-base ${cata.profesional ? "text-wine/70" : "italic text-wine/40"}`}>
                          Presenta: {cata.profesional ?? "A confirmar"}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span
                            className={`rounded-full px-3 py-1.5 text-sm ${
                              full ? "bg-plum/15 text-plum" : low ? "bg-harvest/20 text-harvest" : "bg-wine/8 text-wine/60"
                            }`}
                          >
                            {full ? "Sin cupo" : `${ocupados}/${sala.pax}`}
                          </span>
                          {hasExtra && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDetails(id);
                              }}
                              className="text-sm text-plum underline"
                            >
                              Ver más
                            </button>
                          )}
                        </div>
                        {hasExtra && detailsOpen && (
                          <div className="mt-3 space-y-1 border-t border-dashed border-wine/20 pt-3 text-sm text-wine/70">
                            {cata.restaurante && (
                              <div>
                                <b className="text-wine">Restaurante:</b> {cata.restaurante}
                              </div>
                            )}
                            {cata.presenta && (
                              <div>
                                <b className="text-wine">Presenta:</b> {cata.presenta}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <aside
          className={`rounded-2xl border border-harvest bg-harvest backdrop-blur-sm md:sticky md:top-6 md:max-h-none md:overflow-visible md:p-5 md:shadow-none ${
            ticketExpanded ? "max-h-[80vh] overflow-y-auto" : "max-h-[64px] overflow-hidden"
          } fixed inset-x-0 bottom-0 z-40 rounded-b-none border-x-0 border-b-0 p-4 shadow-[0_-8px_30px_rgba(71,7,44,0.15)] transition-[max-height] duration-300 md:static md:rounded-2xl md:border`}
        >
          <button
            onClick={() => setTicketExpanded((v) => !v)}
            className="flex w-full items-center justify-between md:hidden"
          >
            <span className="font-serif text-lg normal-case tracking-normal text-paper">Tu ticket · {totalSelected}</span>
            <span className={`text-paper transition-transform ${ticketExpanded ? "rotate-180" : ""}`}>▲</span>
          </button>

          <h3 className="hidden font-serif text-xl normal-case tracking-normal text-paper md:block">Tu ticket</h3>
          <p className="mb-3 mt-1 hidden text-sm text-paper/75 md:block">
            {totalSelected} cata{totalSelected === 1 ? "" : "s"} elegida{totalSelected === 1 ? "" : "s"} (máx.{" "}
            {MAX_PER_DAY} por día)
          </p>

          <div className="mt-3 md:mt-0">
            {DAYS.map((d) => (
              <div key={d.id} className="mb-4">
                <div className="lato-expanded mb-2 text-xs text-paper/80">{d.label}</div>
                {selections[d.id].length === 0 ? (
                  <p className="text-sm italic text-paper/60">Todavía no elegiste ninguna sala.</p>
                ) : (
                  selections[d.id].map((sel) => {
                    const sala = salaById(sel.salaId)!;
                    const cata = SCHEDULE[d.id][sel.slot]![sel.salaId]!;
                    return (
                      <div
                        key={`${sel.slot}-${sel.salaId}`}
                        className="mb-2 flex items-start justify-between gap-2 rounded-lg bg-paper/90 px-3 py-2.5 text-sm"
                      >
                        <div>
                          <b className="block text-base text-wine">{cata.bodega}</b>
                          <span className="text-sm text-wine/60">
                            {sala.nombre} · {sel.slot}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSelection(d.id, sel.slot, sel.salaId)}
                          className="text-lg leading-none text-wine/50 hover:text-plum"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            ))}

            <div className="mb-4">
              <label htmlFor="nombre" className="lato-expanded mb-1.5 block text-xs text-paper/80">
                Nombre y apellido
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Marina Suárez"
                className="w-full rounded-lg border border-wine/15 bg-paper px-3.5 py-3 text-base text-wine placeholder:text-wine/35 focus:outline-none focus:ring-2 focus:ring-wine"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contacto" className="lato-expanded mb-1.5 block text-xs text-paper/80">
                Email
              </label>
              <input
                id="contacto"
                type="email"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                placeholder="El mismo con el que compraste tu entrada"
                className="w-full rounded-lg border border-wine/15 bg-paper px-3.5 py-3 text-base text-wine placeholder:text-wine/35 focus:outline-none focus:ring-2 focus:ring-wine"
              />
              {participantStatus === "checking" && (
                <p className="mt-1.5 rounded-lg bg-paper/90 px-3 py-2 text-sm text-wine/70">Verificando participante…</p>
              )}
              {participantStatus === "confirmed" && (
                <p className="mt-1.5 rounded-lg bg-paper/90 px-3 py-2 text-sm text-harvest">
                  ✓ Participante confirmado de ODA al Vino 2026
                </p>
              )}
              {participantStatus === "not_found" && (
                <p className="mt-1.5 rounded-lg bg-paper/90 px-3 py-2 text-sm text-plum">
                  No encontramos este email entre los participantes confirmados. Usá el mismo con el que compraste tu
                  entrada.
                </p>
              )}
            </div>

            <Button
              variant="secondary"
              className="w-full !text-base"
              disabled={submitting || participantStatus === "checking" || participantStatus === "not_found"}
              onClick={handleSubmit}
            >
              {submitting ? "Guardando…" : "Confirmar inscripción"}
            </Button>

            {formError && (
              <div className="mt-2.5 rounded-lg border border-plum/40 bg-paper px-3 py-2.5 text-sm text-plum">
                {formError}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
