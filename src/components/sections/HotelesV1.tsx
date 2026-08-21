"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

interface Hotel {
  name: string;
  offer: { es: string; pt: string };
  note?: { es: string; pt: string };
  href: string;
}

const hotels: Hotel[] = [
  {
    name: "Lodge La Aldea de la Selva",
    offer: {
      es: "15% de descuento + 10% extra reservando por celular",
      pt: "15% de desconto + 10% extra reservando pelo celular",
    },
    href: "https://www.laaldeadelaselva.com/pt/",
  },
  {
    name: "Hotel Iru — Mercure",
    offer: { es: "USD 130", pt: "USD 130" },
    href: "https://all.accor.com/hotel/8431/index.en.shtml",
  },
  {
    name: "Yvy Hotel de la Selva",
    offer: { es: "USD 105 / USD 116", pt: "USD 105 / USD 116" },
    note: { es: "Por categoría de habitación", pt: "Por categoria do quarto" },
    href: "https://yvyhotel.com.ar/",
  },
  {
    name: "Hotel Iguazú Grand",
    offer: { es: "Tarifa especial evento", pt: "Tarifa especial evento" },
    href: "https://reservations.travelclick.com/13626?groupID=5410954",
  },
  {
    name: "Hotel Selva del Laurel",
    offer: { es: "R$ 365 / R$ 430 por día", pt: "R$ 365 / R$ 430 por dia" },
    note: { es: "Por categoría de habitación", pt: "Por categoria do quarto" },
    href: "https://selvadelaurel.com.ar/",
  },
  {
    name: "Hotel Bagu 7 Bocas",
    offer: { es: "USD 69.66 / USD 96.32", pt: "USD 69.66 / USD 96.32" },
    note: {
      es: "Por categoría · 10% descuento en restaurante",
      pt: "Por categoria · 10% de desconto no restaurante",
    },
    href: "https://hotelesbagu.com/hotel/bagu-7-bocas/",
  },
  {
    name: "Hotel Arami",
    offer: { es: "USD 66 + IVA / USD 88 + IVA", pt: "USD 66 + IVA / USD 88 + IVA" },
    note: { es: "Por categoría de habitación", pt: "Por categoria do quarto" },
    href: "https://aramihotel.com.ar/",
  },
  {
    name: "Hotel Saint George",
    offer: { es: "USD 129 + IVA", pt: "USD 129 + IVA" },
    href: "https://www.hotelsaintgeorge.com/",
  },
];

export function HotelesV1() {
  const { language } = useLanguage();
  const lang = language as "es" | "pt";

  return (
    <section id="hoteles" className="bg-paper py-24 md:py-36 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-wine/10" />

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <Reveal>
            <p className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.35em] font-bold mb-4">
              {t("hotelesLabel", language)}
            </p>
          </Reveal>

          <Reveal variant="clip" delay={0.15}>
            <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-[0.9] uppercase text-wine mb-2">
              {t("hotelesTitle", language)}{" "}
              <span className="script normal-case italic text-wine/70 text-[1.2em]">
                {t("hotelesTitleScript", language)}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="text-base md:text-lg text-wine/60 max-w-xl mt-4">
              {t("hotelesDesc", language)}
            </p>
          </Reveal>
        </div>

        {/* Grid de hoteles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {hotels.map((hotel, idx) => (
            <Reveal key={idx} delay={idx * 0.06}>
              <div className="h-full flex flex-col bg-olive rounded-xl p-6 hover:brightness-110 transition-all duration-300">
                {/* Nombre */}
                <h3 className="font-serif text-base md:text-lg text-paper leading-snug mb-3">
                  {hotel.name}
                </h3>

                {/* Oferta */}
                <p className="text-sm font-bold text-harvest leading-snug">
                  {hotel.offer[lang]}
                </p>

                {/* Nota */}
                {hotel.note && (
                  <p className="text-xs text-paper/50 mt-1 leading-snug">
                    {hotel.note[lang]}
                  </p>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Botón reservar */}
                <a
                  href={hotel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-[10px] font-bold uppercase tracking-widest text-paper/70 border border-paper/30 rounded-full px-4 py-2 text-center hover:border-paper hover:text-paper transition-all duration-200"
                >
                  {t("hotelesReservar", language)}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
