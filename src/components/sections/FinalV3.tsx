"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function FinalV3() {
  const { language } = useLanguage();
  return (
    <section className="bg-wine overflow-hidden relative py-32 md:py-48">
      {/* Patrón de fondo */}
      <img
        src="/oda/Graphics/fondovioletachico.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none select-none mix-blend-screen"
      />

      <div className="mx-auto max-w-[1200px] px-8 md:px-12 lg:px-24 relative">
        <div className="text-center space-y-12">
          {/* Línea ornamental */}
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-paper/40" />
              <span className="text-[11px] font-serif italic text-paper/60">·</span>
              <div className="w-12 h-px bg-paper/40" />
            </div>
          </Reveal>

          {/* Eyebrow */}
          <Reveal delay={0.1}>
            <p className="lato-expanded text-[10px] text-paper/60 uppercase tracking-[0.4em] font-bold">
              10° Edición · 2026
            </p>
          </Reveal>

          {/* Título principal */}
          <Reveal variant="clip" delay={0.25}>
            <h2 className="font-serif text-[clamp(3.5rem,11vw,8rem)] leading-[0.88] uppercase text-paper">
              {t("finalTitle", language)}
              <br />
              <span className="script normal-case italic text-paper text-[1.3em]">
                {(() => {
                  const text = t("finalScript", language);
                  return (
                    <>
                      <span className="script-ss01">{text[0]}</span>
                      {text.slice(1)}
                    </>
                  );
                })()}
              </span>
            </h2>
          </Reveal>

          {/* Información de evento */}
          <Reveal delay={0.4}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-8">
              <span className="font-serif text-base md:text-lg text-paper/80 tracking-widest">
                4 y 5 de Septiembre
              </span>
              <div className="w-px h-6 bg-paper/40" />
              <span className="lato-expanded text-[11px] text-paper/70 uppercase tracking-[0.3em]">
                Iguazú · Argentina
              </span>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.55}>
            <div className="pt-8">
              <a
                href="#entradas"
                className="inline-block px-10 md:px-14 py-5 md:py-6 bg-paper text-wine font-serif text-lg md:text-xl font-bold uppercase tracking-widest hover:bg-harvest hover:text-paper transition-all duration-300 rounded-full shadow-2xl"
              >
                {t("ticketsBtnBuy", language)}
              </a>
            </div>
          </Reveal>

          {/* Línea ornamental final */}
          <Reveal delay={0.7}>
            <div className="pt-12 flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-paper/40" />
              <span className="text-[11px] font-serif italic text-paper/60">·</span>
              <div className="w-12 h-px bg-paper/40" />
            </div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.85}>
            <p className="text-paper/60 text-sm md:text-base font-serif italic max-w-2xl mx-auto">
              Una celebración de la cultura, los sentidos y la comunidad en el corazón de la Triple Frontera.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
