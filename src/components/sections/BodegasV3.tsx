"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

type RegionDescKey = "mendozaDesc" | "sanjuanDesc" | "saltaDesc" | "lariojDesc" | "patagoniaDesc";

interface Region {
  name: string;
  pct: string;
  varietals: string;
  descriptionKey: RegionDescKey;
  characteristics: string[];
}

const regions: Region[] = [
  {
    name: "Mendoza",
    pct: "45%",
    varietals: "Malbec, Cabernet Sauvignon, Syrah",
    descriptionKey: "mendozaDesc",
    characteristics: ["800-1200m altitud", "Clima seco cálido", "Cordillera moderadora"],
  },
  {
    name: "San Juan",
    pct: "22%",
    varietals: "Syrah, Bonarda, Petit Verdot",
    descriptionKey: "sanjuanDesc",
    characteristics: ["Norte de Cuyo", "Continental seco", "Vinos robustos"],
  },
  {
    name: "Salta",
    pct: "15%",
    varietals: "Malbec, Cabernet Franc, Tannat",
    descriptionKey: "saltaDesc",
    characteristics: ["Hasta 3.300m altitud", "Valles Calchaquíes", "Torrontés autóctono"],
  },
  {
    name: "La Rioja",
    pct: "12%",
    varietals: "Torrontés, Malbec, Syrah",
    descriptionKey: "lariojDesc",
    characteristics: ["Límite norte Cuyo", "Clima mineral", "Tradición histórica"],
  },
  {
    name: "Patagonia",
    pct: "6%",
    varietals: "Pinot Noir, Sauvignon Blanc, Chardonnay",
    descriptionKey: "patagoniaDesc",
    characteristics: ["Región más austral", "Clima frío intenso", "Amplitud térmica extrema"],
  },
];

const bodegas = [
  "A 16",
  "Alma Negra",
  "Antigal",
  "Araujo",
  "Argaña",
  "Argento",
  "Arístides",
  "Atamisque",
  "Bemberg",
  "Bianchi",
  "Cara Sur",
  "Carinae",
  "Caro",
  "Catena Zapata",
  "Celler del Pi",
  "Château Subsónico",
  "Claroscuro",
  "Clos de Los Andes",
  "Chacra",
  "Colosso Wine",
  "Conejo Verde",
  "Conte Grand",
  "Cruzat",
  "Cuchillo de Palo",
  "Cuchillo de Palo Domingo Molina",
  "Doña Paula",
  "Durigutti",
  "El Esteco",
  "El Porvenir",
  "Escorihuela Gascón",
  "Etchart",
  "Familia Altieri",
  "Familia Blanco",
  "Familia Falasco",
  "Familia Zuccardi",
  "Finca Ambrosía",
  "Finca Flichman",
  "Finca Iral",
  "Finca La Anita",
  "Finca Suarez",
  "Flecha de Los Andes",
  "Funckenhausen",
  "Gauchezco",
  "Ginard Ballester",
  "Goyenechea",
  "Heracles",
  "Huarpe",
  "Humberto Canale",
  "Humberto Canale Jorge Rubio",
  "Kalós",
  "La Dolfina",
  "La Florita",
  "La Macarena",
  "La Magdalena",
  "La Mansa",
  "Lacoste de Los Andes",
  "Lagarde",
  "La Madrid",
  "Las Moras",
  "Las Mojaras",
  "Laureano Gómez",
  "Lauri Viana",
  "Los Dragones",
  "Los Haroldos",
  "Luigi Bosca",
  "Makila",
  "Matervini",
  "Mauricio Lorca",
  "Michelini",
  "Mufatto",
  "Monteviejo",
  "Mosquita Muerta",
  "Navarro Correas",
  "Ojo de Tigre",
  "Otronia",
  "Patritti",
  "Piedra Negra",
  "Puna",
  "Renacer",
  "Ribera del Cuarzo",
  "Riglos",
  "Rocamadre",
  "Rutini",
  "Saint Rose",
  "Salentein",
  "San Huberto",
  "Sánchez Carrillo",
  "Sin Reglas",
  "Sottano",
  "Sposato",
  "Susana Balbo",
  "Séptima",
  "Cordorníu",
  "Trapiche",
  "Trivento",
  "Viejo Isaías",
  "Vignes des Andes",
  "Vignes des Andes Vistalba",
  "Yacochuya",
  "Bousquet",
  "Nina",
];

// Shuffle array function
const shuffleArray = (arr: string[]): string[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export function BodegasV3() {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [shuffledBodegas] = useState(() => shuffleArray(bodegas));
  const [sliderOffset, setSliderOffset] = useState(0);

  return (
    <section id="bodegas" className="bg-olive overflow-hidden relative py-28 md:py-40">
      {/* Patrón de fondo */}
      <img
        src="/oda/Graphics/fondoverde.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none select-none mix-blend-screen"
      />

      {/* Header con padding normal */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 relative">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <Reveal>
            <p className="lato-expanded text-[10px] text-paper/60 uppercase tracking-[0.35em] font-bold mb-4">
              {t("bodegasSelectionLabel", language)}
            </p>
          </Reveal>

          <Reveal variant="clip" delay={0.15}>
            <h2 className="font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.88] uppercase text-paper mb-6">
              {t("bodegasTitle", language)} <span className="script normal-case italic text-paper text-[1.25em]">
                {(() => {
                  const text = t("bodegasTitleScript", language);
                  return (
                    <>
                      <span className="script-ss01">{text[0]}</span>
                      {text.slice(1)}
                    </>
                  );
                })()}
              </span>
              <br />
              {t("bodegasTitleC", language)}
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-lg md:text-xl text-paper/70 max-w-2xl">
              {t("bodegasDescription", language)}
            </p>
          </Reveal>
        </div>

        {/* Regiones Selector + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          {/* Left: Region List */}
          <div className="border-t border-paper/20">
            {regions.map((region, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <button
                  onClick={() => setSelectedRegion(idx)}
                  onMouseEnter={() => setSelectedRegion(idx)}
                  className={`w-full text-left py-6 md:py-8 border-b border-paper/20 transition-all duration-500 flex items-center justify-between group ${
                    selectedRegion === idx ? "opacity-100" : "opacity-60 hover:opacity-75"
                  }`}
                >
                  <div className="flex-1">
                    <p className="lato-expanded text-[10px] text-paper/50 uppercase tracking-widest mb-1">
                      {region.pct}
                    </p>
                    <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] uppercase text-paper leading-tight">
                      {region.name}
                    </h3>
                  </div>
                  <div
                    className={`text-xl text-paper transition-transform duration-500 ${
                      selectedRegion === idx ? "translate-x-2" : "translate-x-0"
                    }`}
                  >
                    →
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Right: Details + Cartel Decorativo */}
          <div className="hidden lg:block relative">
            {/* Cartel Flotante - Decorativo en la esquina superior */}
            <div className="absolute right-0 w-64 h-80 z-20" style={{ top: "-260px" }}>
              <Reveal delay={0.2}>
                <div className="relative w-full h-full flex items-center justify-center" style={{ animation: "float 5s ease-in-out infinite" }}>
                  <Image
                    src="/oda/gallery/los mejores vinos.png"
                    alt="Los Mejores Vinos en un Solo Evento"
                    width={240}
                    height={320}
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </Reveal>
            </div>

            {/* Details Sticky */}
            <div className="sticky top-24">
            <Reveal key={selectedRegion}>
              <div className="space-y-8">
                <div>
                  <h4 className="font-serif text-[clamp(2.5rem,6vw,4rem)] uppercase text-paper leading-tight">
                    {regions[selectedRegion].name}
                  </h4>
                  <p className="script text-[clamp(1.5rem,3vw,3rem)] text-harvest mt-2">
                    {regions[selectedRegion].pct}
                  </p>
                </div>

                {/* Características visuales */}
                <div className="space-y-3">
                  <p className="text-xs text-paper/50 uppercase tracking-widest font-semibold">Características</p>
                  <div className="flex flex-wrap gap-2">
                    {regions[selectedRegion].characteristics.map((char, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-paper/30 text-paper/80 bg-paper/5 hover:bg-paper/10 transition-colors"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-base md:text-lg text-paper/75 leading-relaxed max-w-md">
                  <span className="italic font-semibold">{t("bodegasVarietals", language)}</span>{" "}
                  {regions[selectedRegion].varietals}
                </p>

                <p className="text-sm text-paper/60 leading-relaxed max-w-md">
                  {t(regions[selectedRegion].descriptionKey, language)}
                </p>
              </div>
            </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Bodegas Marquee - Faster, Shuffled, Controllable */}
      <div className="mt-24 border-t border-paper/20">
        <div className="flex items-center justify-between px-8 md:px-12 lg:px-20 pt-6 pb-4 gap-4">
          <p className="lato-expanded text-[10px] text-paper/50 uppercase tracking-widest">
            {t("bodegasParticipants", language)}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setSliderOffset(o => o - 300)}
              className="p-2 rounded-full border border-paper/30 text-paper/70 hover:text-paper hover:bg-paper/10 transition-all duration-300 flex-shrink-0 hover:scale-110"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSliderOffset(o => o + 300)}
              className="p-2 rounded-full border border-paper/30 text-paper/70 hover:text-paper hover:bg-paper/10 transition-all duration-300 flex-shrink-0 hover:scale-110"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-hidden py-8">
          <div
            className="flex whitespace-nowrap gap-12 transition-transform duration-500"
            style={{
              animation: sliderOffset === 0 ? "marquee-infinite 180s linear infinite" : "none",
              transform: `translateX(${sliderOffset}px)`,
              willChange: "transform"
            }}
          >
            {/* First set - shuffled */}
            {shuffledBodegas.map((bodega, i) => (
              <div key={`set1-${i}`} className="flex items-center gap-4 font-serif text-4xl md:text-5xl lg:text-6xl uppercase text-paper/80 flex-shrink-0">
                <span>{bodega}</span>
                <span className="text-harvest text-2xl md:text-3xl">★</span>
              </div>
            ))}
            {/* Seamless loop - second set identical to first */}
            {shuffledBodegas.map((bodega, i) => (
              <div key={`set2-${i}`} className="flex items-center gap-4 font-serif text-4xl md:text-5xl lg:text-6xl uppercase text-paper/80 flex-shrink-0">
                <span>{bodega}</span>
                <span className="text-harvest text-2xl md:text-3xl">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
