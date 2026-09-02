"use client";

import { useState } from "react";
import Link from "next/link";
import type { DayId } from "@/lib/catas/schedule";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

type Status = "idle" | "loading" | "found" | "not_found" | "error";

interface CataItem {
  day: DayId;
  slot: string;
  salaNombre: string;
  bodega: string;
}

const DAY_LABEL_KEY: Record<DayId, "catasDayViernes" | "catasDaySabado"> = {
  viernes: "catasDayViernes",
  sabado: "catasDaySabado",
};

export function ConsultarInscripcion() {
  const { language } = useLanguage();
  const [documento, setDocumento] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [nombre, setNombre] = useState("");
  const [catas, setCatas] = useState<CataItem[]>([]);

  const buscar = async () => {
    const doc = documento.trim();
    if (!doc) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/catas/mi-inscripcion?documento=${encodeURIComponent(doc)}`);
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        return;
      }
      if (!data.found) {
        setStatus("not_found");
        return;
      }
      setNombre(data.nombre);
      setCatas(data.catas ?? []);
      setStatus("found");
    } catch (e) {
      console.error("mi-inscripcion error:", e);
      setStatus("error");
    }
  };

  if (status === "found") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <img src="/oda/brand/lacre_oav.svg" alt="" className="mx-auto mb-6 h-16 w-16" />
        <p className="script text-4xl text-wine mb-2">
          {t("catasConsultarSaludo", language)}, {nombre}!
        </p>
        <p className="text-wine/70 mb-8">{t("catasConsultarResultSubtitle", language)}</p>
        <ul className="mb-8 space-y-3 text-left">
          {catas.map((item, i) => (
            <li key={i} className="rounded-xl border border-wine/15 bg-white/60 px-4 py-3">
              <p className="lato-expanded text-[10px] text-plum">
                {t(DAY_LABEL_KEY[item.day], language)} · {item.slot} {t("catasHoursAbbrev", language)}
              </p>
              <p className="font-serif text-lg normal-case tracking-normal text-wine">{item.bodega}</p>
              <p className="text-xs text-wine/60">
                {t("catasEmailSala", language)}: {item.salaNombre}
              </p>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          onClick={() => {
            setStatus("idle");
            setDocumento("");
          }}
        >
          {t("catasConsultarBack", language)}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <img src="/oda/brand/logo_violeta_horizontal.svg" alt="ODA al Vino" className="mx-auto mb-6 h-10" />
      <h1 className="text-3xl text-wine">{t("catasConsultarTitle", language)}</h1>
      <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-wine/70 normal-case tracking-normal font-sans">
        {t("catasConsultarSubtitle", language)}
      </p>

      <div className="mt-8 text-left">
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
          placeholder={t("catasConsultarPlaceholder", language)}
          className="w-full rounded-lg border border-wine/15 bg-white/60 px-3.5 py-3 text-base text-wine placeholder:text-wine/35 focus:outline-none focus:ring-2 focus:ring-wine"
        />
        <Button
          variant="secondary"
          className="mt-3 w-full !text-base"
          disabled={status === "loading" || !documento.trim()}
          onClick={buscar}
        >
          {status === "loading" ? t("catasConsultarBuscando", language) : t("catasConsultarBtn", language)}
        </Button>

        {status === "not_found" && (
          <div className="mt-3 rounded-lg border border-plum/40 bg-white/60 px-3 py-2.5 text-sm text-plum">
            {t("catasConsultarNoEncontrado", language)}
          </div>
        )}
        {status === "error" && (
          <div className="mt-3 rounded-lg border border-plum/40 bg-white/60 px-3 py-2.5 text-sm text-plum">
            {t("catasConsultarError", language)}
          </div>
        )}
      </div>

      <Link href="/inscripcion" className="mt-8 inline-block text-sm text-plum underline">
        {t("catasVolverInscripcion", language)}
      </Link>
    </div>
  );
}
