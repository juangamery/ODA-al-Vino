"use client";

import { useState, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const regions = [
  {
    name: "Mendoza",
    pct: "45%",
    varietals: "Malbec, Cabernet Sauvignon, Syrah",
  },
  {
    name: "San Juan",
    pct: "22%",
    varietals: "Syrah, Bonarda, Petit Verdot",
  },
  {
    name: "Salta",
    pct: "15%",
    varietals: "Malbec, Cabernet Franc, Tannat",
  },
  {
    name: "La Rioja",
    pct: "12%",
    varietals: "Torrontés, Malbec, Syrah",
  },
  {
    name: "Otras regiones",
    pct: "6%",
    varietals: "Riesling, Tempranillo, Viognier",
  },
];

const bodegas = [
  "Luigi Bosca",
  "Trapiche",
  "Norton",
  "Catena Zapata",
  "Altos Las Hormigas",
  "Achaval Ferrado",
  "Carmelo Patti",
  "Finca Decero",
  "Familia Zuccardi",
  "Susana Balbo",
  "Herdade do Rocim",
  "Viña Maipo",
  "Maynard's",
  "Chandon",
  "Rutini Wines",
  "Tinta Negra",
  "Casarena",
  "El Enemigo",
  "Vistaflores",
  "Monteviejo",
];

export function BodegasV3() {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setTranslateX(delta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-[clamp(2.5rem,6vw,4rem)] uppercase text-paper leading-tight">
                    {regions[selectedRegion].name}
                  </h4>
                  <p className="script text-[clamp(1.5rem,3vw,3rem)] text-harvest mt-2">
                    {regions[selectedRegion].pct}
                  </p>
                </div>

                <p className="text-base md:text-lg text-paper/75 leading-relaxed max-w-md">
                  <span className="italic font-semibold">{t("bodegasVarietals", language)}</span>{" "}
                  {regions[selectedRegion].varietals}
                </p>

                <p className="text-sm text-paper/60 leading-relaxed">
                  {t("bodegasRegionDesc", language)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bodegas Marquee */}
        <Reveal delay={0.4}>
          <div className="mt-24 pt-8 border-t border-b border-paper/20 py-8">
            <p className="lato-expanded text-[10px] text-paper/50 uppercase tracking-widest mb-6">
              {t("bodegasParticipants", language)}
            </p>
            <div className="overflow-hidden group cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                ref={marqueeRef}
                className="flex whitespace-nowrap gap-8"
                style={{
                  animation: isDragging ? "none" : "marquee-slow 25s linear infinite",
                  animationPlayState: isDragging ? "paused" : "running",
                  transform: isDragging ? `translateX(${translateX}px)` : "translateX(0)",
                  transition: isDragging ? "none" : "transform 0.3s ease-out",
                  cursor: isDragging ? "grabbing" : "grab"
                }}
              >
                {[...Array(2)].map((_, k) => (
                  <div key={k} className="flex gap-8">
                    {bodegas.map((bodega, i) => (
                      <div key={i} className="flex items-center gap-3 font-serif text-2xl md:text-3xl lg:text-4xl uppercase text-paper/80">
                        <span>{bodega}</span>
                        <span className="text-harvest text-lg md:text-xl">★</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>

      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
