"use client";

import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="manifiesto" className="bg-wine overflow-hidden relative">
      {/* Patrón de fondo — fondovioleta */}
      <img
        src="/oda/Graphics/fondovioleta.svg"
        alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.10] pointer-events-none select-none mix-blend-screen"
      />

      {/* ── Bloque principal ── */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-32 pb-16 md:pt-40 md:pb-20 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

        {/* Texto lado izquierdo */}
        <div>
          <Reveal variant="clip" delay={0.15}>
            <h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] uppercase text-paper mb-10">
              Una <span className="script normal-case italic text-paper text-[1.25em]"><span className="script-ss01">C</span>elebración</span><br />
              del vino argentino
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-paper/70 leading-relaxed max-w-xl mb-8">
              ODA al Vino es el punto de encuentro donde el vino argentino se vive, se aprende y se comparte. Una celebración de la cultura, los sentidos y la comunidad en el corazón de la Triple Frontera.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="lato-expanded text-[10px] md:text-[11px] text-paper/40">
              Degustación · Experiencias · Gastronomía · Comunidad
            </p>
          </Reveal>
        </div>

        {/* Gráfico derecha — Recurso 4 (pareja/persona sobre copa) */}
        <Reveal direction="left" delay={0.2}>
          <div className="relative w-[240px] lg:w-[320px] shrink-0 mx-auto">
            {/* Sparkles decorativos */}
            <svg width="18" height="18" viewBox="0 0 14 14" className="absolute -top-4 -right-2 text-paper/50">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" fill="currentColor"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 14 14" className="absolute top-8 -right-6 text-paper/30">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" fill="currentColor"/>
            </svg>
            <img
              src="/oda/Graphics/Recurso 4@2x.png"
              alt="ODA al Vino — celebración"
              className="w-full object-contain drop-shadow-2xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
