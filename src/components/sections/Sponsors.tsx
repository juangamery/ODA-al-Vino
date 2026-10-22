"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const SPONSORS = [
  "Hotel de Selva",
  "La Aldea de la Selva Lodge",
  "Hotel Saint George Iguazú",
  "AHGAI — Asociación Hotelera, Gastronómica y Afines de Iguazú",
  "Duty Free Shop Puerto Iguazú",
  "Bagu Hoteles 7 Bocas",
  "Iguazú Grand Puerto Iguazú",
  "Río Uruguay",
  "Merendero Mano Abierta",
  "Alsultan Shawarma",
  "Arami Hotel & Lodge",
  "Selva de Laurel Boutique Lodge",
  "Caracol Internacional Viajes & Turismo",
  "Perobal Restaurante",
  "Mercure Hotels",
  "O2 Hotel Iguazú",
  "Agua de las Misiones",
  "El Quincho del Tío Querido",
  "Riosma",
];

export function Sponsors() {
  const { language } = useLanguage();

  return (
    <section id="sponsors" className="bg-olive pb-20 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-4 border-t border-paper/20">
        <Reveal>
          <p className="lato-expanded text-[10px] text-paper/60 uppercase tracking-[0.35em] font-bold mt-16 mb-4">
            {t("sponsorsLabel", language)}
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] pt-[0.1em] uppercase text-paper max-w-3xl">
            {t("sponsorsTitle", language)}
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <div className="mx-auto max-w-[1440px] md:px-10 lg:px-16 mt-6 md:mt-4">
          <Image
            src="/oda/sponsors/sponsors-oav26.webp"
            alt={`Logos de las marcas que acompañaron ODA Al Vino 2026: ${SPONSORS.join(", ")}.`}
            width={1920}
            height={1080}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="w-full h-auto"
          />
        </div>
      </Reveal>
    </section>
  );
}
