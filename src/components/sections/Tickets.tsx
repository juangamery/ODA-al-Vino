"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t, type Language } from "@/lib/translations";

type EjeN = 1 | 2 | 3 | 4;

// Al sumar la foto de un eje, pasa automáticamente al formato reportaje (foto + texto).
const EJES: { n: EjeN; foto?: { src: string; alt: string } }[] = [
  { n: 1, foto: { src: "/oda/gallery/oav26/oav26-degustacion-etiqueta.webp", alt: "Un visitante lee la etiqueta de una botella mientras degusta un vino tinto en ODA Al Vino 2026" } },
  { n: 2, foto: { src: "/oda/gallery/oav26/oav26-comunidad-grupo-brindis.webp", alt: "Un grupo numeroso de visitantes brinda y celebra con copas en alto durante ODA Al Vino 2026" } },
  { n: 3, foto: { src: "/oda/gallery/oav26/oav26-degustacion-guiada-mauricio-lorca.webp", alt: "Degustación guiada de Mauricio Lorca: el presentador muestra una botella ante una mesa de participantes" } },
  { n: 4 }, // Semana ODA: falta foto de las capacitaciones
];
const conFoto = EJES.filter((e) => e.foto);
const sinFoto = EJES.filter((e) => !e.foto);

function EjeTexto({ n, language }: { n: EjeN; language: Language }) {
  const cierre = t(`eje${n}Cierre`, language);
  const dato2 = t(`eje${n}Dato2`, language);
  return (
    <div>
      <p className="font-serif text-2xl md:text-3xl text-plum leading-tight mb-5">
        {t(`eje${n}Dato`, language)}
        {dato2 && <span className="block mt-1">{dato2}</span>}
      </p>
      <h3 className="font-serif text-3xl md:text-4xl uppercase text-wine leading-[1.05] mb-5">{t(`eje${n}Title`, language)}</h3>
      <p className="text-base md:text-lg text-wine/75 leading-relaxed">{t(`eje${n}Text`, language)}</p>
      {cierre && <p className="mt-5 text-base md:text-lg text-wine/90 italic leading-relaxed">{cierre}</p>}
    </div>
  );
}

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

          {/* Ejes con fotografía: reportaje alternado */}
          <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
            {conFoto.map((eje, i) => (
              <div key={eje.n} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
                <Reveal className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-wine/10">
                    <Image src={eje.foto!.src} alt={eje.foto!.alt} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={0.15} className="md:col-span-5">
                  <EjeTexto n={eje.n} language={language} />
                </Reveal>
              </div>
            ))}
          </div>

          {/* Ejes que todavía no tienen fotografía */}
          {sinFoto.length > 0 && (
            <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 border-t border-wine/15 pt-14 md:pt-20">
              {sinFoto.map((eje, i) => (
                <Reveal key={eje.n} delay={i * 0.1}>
                  <EjeTexto n={eje.n} language={language} />
                </Reveal>
              ))}
            </div>
          )}
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
