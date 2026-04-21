'use client';

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

interface Card {
  src: string;
  alt: string;
  title: string;
  desc: string;
}

function getCards(language: string): Card[] {
  return [
    {
      src: "/oda/gallery/iguazu/Cataratas.jpg",
      alt: t("iguazuCard1Title", language as any),
      title: t("iguazuCard1Title", language as any),
      desc: t("iguazuCard1Desc", language as any),
    },
    {
      src: "/oda/gallery/iguazu/Rueda.jpg",
      alt: t("iguazuCard2Title", language as any),
      title: t("iguazuCard2Title", language as any),
      desc: t("iguazuCard2Desc", language as any),
    },
    {
      src: "/oda/gallery/iguazu/Urban.jpg",
      alt: t("iguazuCard3Title", language as any),
      title: t("iguazuCard3Title", language as any),
      desc: t("iguazuCard3Desc", language as any),
    },
  ];
}

export function Iguazu() {
  const { language } = useLanguage();
  const cards = getCards(language);
  return (
    <section id="iguazu" className="bg-olive overflow-visible relative py-28 md:py-40">
      {/* Patrón de fondo */}
      <img
        src="/oda/Graphics/fondoverde.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-[0.12] mix-blend-screen"
      />

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 relative">
        {/* Header */}
        <Reveal delay={0.05}>
          <p className="lato-expanded text-[10px] text-paper/50 uppercase tracking-[0.35em] font-bold mb-6">
            {t("iguazuSectionLabel", language)}
          </p>
        </Reveal>

        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.88] uppercase text-paper mb-12">
            {t("iguazuTitle", language)} <span className="script normal-case italic text-paper text-[1.25em]">
              {(() => {
                const text = t("iguazuTitleScript", language);
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

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-paper/80 leading-relaxed max-w-2xl mb-16">
            {t("iguazuDescription", language)}
          </p>
        </Reveal>

        {/* Grid de 3 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <Reveal key={idx} delay={0.25 + idx * 0.1}>
              <div className="flex flex-col overflow-hidden rounded-lg">
                {/* Área de imagen */}
                <div className="relative w-full aspect-square border-4 border-paper bg-paper overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Área de contenido */}
                <div className="flex-1 bg-olive/50 border-l-4 border-r-4 border-b-4 border-paper p-6 flex flex-col justify-between">
                  {/* Título */}
                  <h4 className="font-serif text-lg md:text-xl uppercase text-paper font-bold mb-3 leading-tight">
                    {card.title}
                  </h4>

                  {/* Descripción */}
                  <p className="text-xs md:text-sm text-paper/80 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
