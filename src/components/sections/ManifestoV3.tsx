"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function ManifestoV3() {
  const { language } = useLanguage();
  return (
    <section
      id="manifiesto"
      className="relative bg-wine overflow-visible py-12 md:py-16 lg:py-20"
    >
      {/* Patrón de fondo v2 */}
      <img
        src="/oda/Graphics/fondovioleta.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none select-none mix-blend-screen"
      />

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto w-full px-2 md:px-3 lg:px-6 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-center overflow-visible">
          {/* Texto lado izquierdo */}
          <div className="text-center lg:text-left">
            <Reveal>
              {/* Línea ornamental */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="w-8 h-px bg-paper/40" />
                <span className="text-paper/60 text-[11px] font-bold tracking-widest uppercase">
                  {t("manifestoLabel", language)}
                </span>
                <div className="w-8 h-px bg-paper/40" />
              </div>
            </Reveal>

            <Reveal variant="clip" delay={0.15}>
              <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] uppercase text-paper mb-6 md:mb-8">
                {t("manifestoTitleA", language)}{" "}
                <span className="script normal-case italic text-paper text-[1.25em]">
                  {(() => {
                    const text = t("manifestoTitleB", language);
                    return (
                      <>
                        <span className="script-ss01">{text[0]}</span>
                        {text.slice(1)}
                      </>
                    );
                  })()}
                </span>
                <br />
                {t("manifestoTitleC", language)}
              </h2>
            </Reveal>

            <Reveal variant="clip" delay={0.3}>
              <p className="text-base md:text-lg text-paper/75 leading-relaxed max-w-2xl mb-8">
                {t("manifestoDescription", language)}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="flex justify-center lg:justify-start">
                <p className="lato-expanded text-[10px] md:text-[11px] text-paper/50 tracking-widest">
                  {t("manifestoHighlights", language)}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Ilustración derecha — ODAalVINO style */}
          <Reveal direction="left" delay={0.2}>
            <div className="relative w-full max-w-xs mx-auto" style={{ animation: "float 5s ease-in-out infinite" }}>
              {/* Sparkles decorativos */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 14 14"
                className="absolute -top-6 -right-4 text-paper/50"
              >
                <path
                  d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                className="absolute top-10 -right-8 text-paper/30"
              >
                <path
                  d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z"
                  fill="currentColor"
                />
              </svg>

              <img
                src="/oda/Graphics/Recurso 4@2x.webp"
                alt="Celebración ODA al Vino"
                className="w-full object-contain drop-shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Sello giratorio — Abajo centrado (fuera del contenedor de padding) */}
      <Reveal delay={0.6}>
        <div className="flex justify-center py-8 md:py-12 overflow-visible">
          <img
            src="/oda/Graphics/Sellocalidad_ODA.svg"
            alt="Sello ODA al Vino"
            className="w-40 md:w-48 h-auto"
          />
        </div>
      </Reveal>

    </section>
  );
}
