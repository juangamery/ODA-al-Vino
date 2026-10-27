"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { HistoriaCard } from "@/components/historias/HistoriaCard";
import { useLanguage } from "@/context/LanguageContext";
import { historiasOrdenadas } from "@/lib/historias";
import { t } from "@/lib/translations";

export function HistoriasHome() {
  const { language } = useLanguage();
  if (historiasOrdenadas.length === 0) return null;

  return (
    <section id="historias" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24">
        <Reveal>
          <p className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.35em] font-bold mb-4">
            {t("navHistorias", language)}
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] pt-[0.1em] uppercase text-wine mb-6">
            {t("historiasHomeTitle", language)}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-wine/70 leading-relaxed max-w-2xl mb-14">{t("historiasHomeText", language)}</p>
        </Reveal>

        {historiasOrdenadas.length === 1 ? (
          <HistoriaCard historia={historiasOrdenadas[0]} mostrarFecha={false} destacada />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {historiasOrdenadas.slice(0, 3).map((h) => (
              <HistoriaCard key={h.slug} historia={h} mostrarFecha={false} />
            ))}
          </div>
        )}

        <div className="mt-14">
          <Link
            href="/historias"
            className="inline-block rounded-full bg-wine px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-plum transition-colors"
          >
            {t("historiasHomeCta", language)}
          </Link>
        </div>
      </div>
    </section>
  );
}
