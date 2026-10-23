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

// Área visual común: los logos altos y los anchos se ven del mismo "peso".
const AREA_LOGO = 11000;

const LOGOS: { file: string; nombre: string; w: number; h: number }[] = [
  { file: "hotel-de-selva", nombre: "Hotel de Selva", w: 243, h: 105 },
  { file: "la-aldea-de-la-selva-lodge", nombre: "La Aldea de la Selva Lodge", w: 274, h: 201 },
  { file: "hotel-saint-george", nombre: "Hotel Saint George Iguazú", w: 238, h: 209 },
  { file: "ahgai", nombre: "AHGAI — Asociación Hotelera, Gastronómica y Afines de Iguazú", w: 315, h: 136 },
  { file: "duty-free-shop-puerto-iguazu", nombre: "Duty Free Shop Puerto Iguazú", w: 233, h: 220 },
  { file: "bagu-hoteles-7-bocas", nombre: "Bagu Hoteles 7 Bocas", w: 212, h: 130 },
  { file: "iguazu-grand", nombre: "Iguazú Grand Puerto Iguazú", w: 254, h: 135 },
  { file: "rio-uruguay", nombre: "Río Uruguay", w: 226, h: 183 },
  { file: "merendero-mano-abierta", nombre: "Merendero Mano Abierta", w: 221, h: 203 },
  { file: "alsultan-shawarma", nombre: "Alsultan Shawarma", w: 279, h: 112 },
  { file: "arami-hotel-lodge", nombre: "Arami Hotel & Lodge", w: 278, h: 100 },
  { file: "selva-de-laurel", nombre: "Selva de Laurel Boutique Lodge", w: 230, h: 116 },
  { file: "caracol-internacional", nombre: "Caracol Internacional Viajes & Turismo", w: 310, h: 84 },
  { file: "perobal", nombre: "Perobal Restaurante", w: 273, h: 164 },
  { file: "mercure-hotels", nombre: "Mercure Hotels", w: 286, h: 76 },
  { file: "o2-hotel-iguazu", nombre: "O2 Hotel Iguazú", w: 268, h: 111 },
  { file: "agua-de-las-misiones", nombre: "Agua de las Misiones", w: 210, h: 93 },
  { file: "el-quincho-del-tio-querido", nombre: "El Quincho del Tío Querido", w: 212, h: 168 },
  { file: "riosma", nombre: "Riosma", w: 294, h: 59 },
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

      <ul className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 md:gap-y-16 items-center">
        {LOGOS.map((l, i) => (
          <li key={l.file} className="flex items-center justify-center">
            <Reveal delay={(i % 5) * 0.05}>
              <Image
                src={`/oda/sponsors/logos/${l.file}.png`}
                alt={l.nombre}
                width={l.w}
                height={l.h}
                sizes="220px"
                style={{ width: `${Math.round(Math.sqrt(AREA_LOGO * (l.w / l.h)))}px` }}
                className="h-auto max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 mt-16 md:mt-20">
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
