"use client";

import { useState, useRef, useEffect } from "react";
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

export function BodegasV3() {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(0);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  // Slider 1 (top - scroll left)
  const [isDragging1, setIsDragging1] = useState(false);
  const [dragStart1, setDragStart1] = useState(0);
  const [translateX1, setTranslateX1] = useState(0);

  // Slider 2 (bottom - scroll right)
  const [isDragging2, setIsDragging2] = useState(false);
  const [dragStart2, setDragStart2] = useState(0);
  const [translateX2, setTranslateX2] = useState(0);

  // Slider 1 handlers
  const handleMouseDown1 = (e: React.MouseEvent) => {
    setIsDragging1(true);
    setDragStart1(e.clientX);
  };

  const handleMouseMove1 = (e: React.MouseEvent) => {
    if (!isDragging1) return;
    const delta = e.clientX - dragStart1;
    setTranslateX1(delta);
  };

  const handleMouseUp1 = () => {
    setIsDragging1(false);
  };

  const handleNextClick1 = () => {
    setTranslateX1((prev) => prev - 250);
  };

  // Slider 2 handlers
  const handleMouseDown2 = (e: React.MouseEvent) => {
    setIsDragging2(true);
    setDragStart2(e.clientX);
  };

  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (!isDragging2) return;
    const delta = e.clientX - dragStart2;
    setTranslateX2(delta);
  };

  const handleMouseUp2 = () => {
    setIsDragging2(false);
  };

  const handlePrevClick2 = () => {
    setTranslateX2((prev) => prev + 250);
  };

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

          {/* Right: Details Sticky */}
          <div className="hidden lg:block sticky top-24">
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

      {/* Bodegas Marquees - Full Width Dual Sliders */}
      <div className="mt-24 space-y-0">
            {/* Slider 1 - Scroll Left */}
            <div className="border-t border-paper/20 py-6 overflow-hidden">
              <p className="lato-expanded text-[10px] text-paper/50 uppercase tracking-widest mb-4 px-8 md:px-12 lg:px-20">
                {t("bodegasParticipants", language)}
              </p>
              <div className="flex items-center gap-8">
                <div className="overflow-hidden group cursor-grab active:cursor-grabbing flex-1"
                  onMouseDown={handleMouseDown1}
                  onMouseMove={handleMouseMove1}
                  onMouseUp={handleMouseUp1}
                  onMouseLeave={handleMouseUp1}
                >
                  <div
                    ref={marqueeRef1}
                    className="flex whitespace-nowrap gap-12"
                    style={{
                      animation: "marquee-right 20s linear infinite",
                      animationPlayState: isDragging1 ? "paused" : "running",
                      transform: `translateX(${translateX1}px)`,
                      transition: isDragging1 ? "none" : "transform 0.3s ease-out",
                      cursor: isDragging1 ? "grabbing" : "grab",
                      willChange: "transform"
                    }}
                  >
                    {[...Array(10)].map((_, k) => (
                      <div key={k} className="flex gap-12">
                        {bodegas.slice(0, Math.ceil(bodegas.length / 2)).map((bodega, i) => (
                          <div key={i} className="flex items-center gap-4 font-serif text-5xl md:text-6xl lg:text-7xl uppercase text-paper/80 flex-shrink-0">
                            <span>{bodega}</span>
                            <span className="text-harvest text-3xl md:text-4xl">★</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right Arrow for Slider 1 */}
                <button
                  onClick={handleNextClick1}
                  className="flex-shrink-0 p-3 rounded-full border border-paper/30 text-paper/70 hover:text-paper hover:bg-paper/10 transition-all duration-300 hover:scale-110 mr-4"
                  aria-label="Next bodegas"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slider 2 - Scroll Right */}
            <div className="border-t border-b border-paper/20 py-6 overflow-hidden bg-olive/5">
              <div className="flex items-center gap-8">
                {/* Left Arrow for Slider 2 */}
                <button
                  onClick={handlePrevClick2}
                  className="flex-shrink-0 p-3 rounded-full border border-paper/30 text-paper/70 hover:text-paper hover:bg-paper/10 transition-all duration-300 hover:scale-110 ml-4"
                  aria-label="Previous bodegas"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="overflow-hidden group cursor-grab active:cursor-grabbing flex-1"
                  onMouseDown={handleMouseDown2}
                  onMouseMove={handleMouseMove2}
                  onMouseUp={handleMouseUp2}
                  onMouseLeave={handleMouseUp2}
                >
                  <div
                    ref={marqueeRef2}
                    className="flex whitespace-nowrap gap-12"
                    style={{
                      animation: "marquee-left 20s linear infinite",
                      animationPlayState: isDragging2 ? "paused" : "running",
                      transform: `translateX(${translateX2}px)`,
                      transition: isDragging2 ? "none" : "transform 0.3s ease-out",
                      cursor: isDragging2 ? "grabbing" : "grab",
                      willChange: "transform"
                    }}
                  >
                    {[...Array(10)].map((_, k) => (
                      <div key={k} className="flex gap-12">
                        {bodegas.slice(Math.ceil(bodegas.length / 2)).map((bodega, i) => (
                          <div key={i} className="flex items-center gap-4 font-serif text-5xl md:text-6xl lg:text-7xl uppercase text-paper/80 flex-shrink-0">
                            <span>{bodega}</span>
                            <span className="text-harvest text-3xl md:text-4xl">★</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-10%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(10%); }
        }
      `}</style>
    </section>
  );
}
