"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function Tickets() {
  const { language } = useLanguage();

  return (
    <>
      {/* Divisor decorativo */}
      <div className="bg-harvest overflow-hidden py-4">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] pr-16 text-paper/60">
            {t("ticketsMarqueeText", language)} · {t("ticketsMarqueeText", language)} ·
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] pr-16 text-paper/60" aria-hidden="true">
            {t("ticketsMarqueeText", language)} · {t("ticketsMarqueeText", language)} ·
          </span>
        </div>
      </div>

      <section
        id="oav-2026"
        className="bg-paper overflow-hidden relative py-28 md:py-40"
      >
        {/* Patrón de fondo */}
        <img
          src="/oda/SVG/patron_fondo.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-40"
        />

        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 relative">
          {/* Label */}
          <Reveal delay={0.05}>
            <div className="text-left mb-8">
              <p className="lato-expanded text-[10px] text-wine/35 tracking-[0.35em] uppercase font-bold">
                ✦ {t("ticketsLabel", language)} ✦
              </p>
            </div>
          </Reveal>

          {/* Título */}
          <Reveal variant="clip" delay={0.1}>
            <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[1] pt-[0.15em] uppercase text-wine mb-10 text-left max-w-5xl">
              {t("ticketsTitle", language)}
            </h2>
          </Reveal>

          {/* Introducción */}
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-wine/75 leading-relaxed max-w-3xl">
              {t("ticketsDescription", language)}
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
}
