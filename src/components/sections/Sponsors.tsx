"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

type Texto = { es: string; pt: string };

const ENCABEZADO = {
  label: { es: "Acompañaron la 10ª edición", pt: "Acompanharam a 10ª edição" },
  titulo: { es: "Una edición como esta se construye entre muchas manos.", pt: "Uma edição como esta se constrói a muitas mãos." },
  texto: {
    es: "Nuestro agradecimiento a los aliados, bodegas y expositores de ODA al Vino 2026.",
    pt: "Nosso agradecimento aos parceiros, adegas e expositores da ODA al Vino 2026.",
  },
};

// Textos tomados de las piezas oficiales de agradecimiento de OAV 2026.
const GRUPOS: { titulo: Texto; texto: Texto; marcas: string[] }[] = [
  {
    titulo: { es: "Un compromiso que compartimos", pt: "Um compromisso que compartilhamos" },
    texto: {
      es: "Gracias por acompañarnos en la construcción de un evento comprometido con el lugar que nos recibe.",
      pt: "Obrigado por nos acompanhar na construção de um evento comprometido com o lugar que nos recebe.",
    },
    marcas: ["Fundación Ecologista Verde", "Agua de las Misiones", "Riosma"],
  },
  {
    titulo: { es: "Alrededor de la mesa también sucedieron grandes encuentros", pt: "Em volta da mesa também aconteceram grandes encontros" },
    texto: {
      es: "Gracias por ser parte de la experiencia gastronómica de esta edición.",
      pt: "Obrigado por fazer parte da experiência gastronômica desta edição.",
    },
    marcas: ["Alsultan Shawarma", "Perobal Restaurante", "La Carolina Café · Bistró · Bar", "La Toscana Trattoria", "El Quincho del Tío Querido", "Rooftop Yvagá Bar del Cielo"],
  },
  {
    titulo: { es: "Puerto Iguazú también recibió a quienes vinieron a vivir ODA al Vino", pt: "Puerto Iguazú também recebeu quem veio viver a ODA al Vino" },
    texto: { es: "Gracias por la hospitalidad y por acompañarnos.", pt: "Obrigado pela hospitalidade e por nos acompanhar." },
    marcas: [
      "La Aldea de la Selva Lodge",
      "Arami Hotel & Lodge",
      "Selva de Laurel Boutique Lodge",
      "Hotel Saint George Iguazú",
      "Mercure Hotels",
      "Iguazú Grand",
      "O2 Hotel Iguazú",
      "Hotel de Selva",
      "Bagu Hoteles 7 Bocas",
    ],
  },
  {
    titulo: { es: "Gracias por ayudar a tantas personas a llegar hasta nosotros", pt: "Obrigado por ajudar tantas pessoas a chegar até nós" },
    texto: { es: "", pt: "" },
    marcas: ["Caracol Internacional Viajes & Turismo", "Río Uruguay"],
  },
];

const EN_LOGOS = [
  "Hotel de Selva", "La Aldea de la Selva Lodge", "Hotel Saint George Iguazú",
  "AHGAI — Asociación Hotelera, Gastronómica y Afines de Iguazú", "Duty Free Shop Puerto Iguazú",
  "Bagu Hoteles 7 Bocas", "Iguazú Grand Puerto Iguazú", "Río Uruguay", "Merendero Mano Abierta",
  "Alsultan Shawarma", "Arami Hotel & Lodge", "Selva de Laurel Boutique Lodge",
  "Caracol Internacional Viajes & Turismo", "Perobal Restaurante", "Mercure Hotels", "O2 Hotel Iguazú",
  "Agua de las Misiones", "El Quincho del Tío Querido", "Riosma",
];

export function Sponsors() {
  const { language } = useLanguage();
  const lang = language as "es" | "pt";

  return (
    <section id="sponsors" className="bg-olive pb-24 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-4 border-t border-paper/20">
        <Reveal>
          <p className="lato-expanded text-[10px] text-paper/60 uppercase tracking-[0.35em] font-bold mt-16 mb-4">
            {ENCABEZADO.label[lang]}
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] pt-[0.1em] uppercase text-paper max-w-4xl mb-6">
            {ENCABEZADO.titulo[lang]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-paper/75 leading-relaxed max-w-2xl">{ENCABEZADO.texto[lang]}</p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mx-auto max-w-[1440px] md:px-10 lg:px-16 mt-6 md:mt-4">
          <Image
            src="/oda/sponsors/sponsors-oav26.webp"
            alt={`Logos de las marcas que acompañaron ODA Al Vino 2026: ${EN_LOGOS.join(", ")}.`}
            width={1920}
            height={1080}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="w-full h-auto"
          />
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 mt-8 md:mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16 border-t border-paper/20 pt-12 md:pt-16">
          {GRUPOS.map((g, i) => (
            <Reveal key={g.titulo.es} delay={(i % 2) * 0.1}>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl uppercase text-paper leading-[1.05] mb-3">{g.titulo[lang]}</h3>
                {g.texto[lang] && <p className="text-base text-paper/70 leading-relaxed mb-5">{g.texto[lang]}</p>}
                <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                  {g.marcas.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm md:text-base text-paper/90">
                      <span className="text-harvest text-xs" aria-hidden>★</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
