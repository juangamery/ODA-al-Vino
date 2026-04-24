"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t, Language } from "@/lib/translations";

interface Floor {
  name: string;
  capacity: number;
  description: string;
}

function getFloors(lang: Language): Floor[] {
  return [
    {
      name: lang === "es" ? "Planta Baja" : "Térreo",
      capacity: 1200,
      description:
        lang === "es"
          ? "Recorre bodegas argentinas distribuidas en el espacio. Degusta directamente, descubre nuevos rótulos, conecta con enólogos. Mesas de cata en el corazón del espacio para explorar sin apuro."
          : "Percorra adegas argentinas distribuídas no espaço. Deguste diretamente, descubra novos rótulos, conecte com enólogos. Mesas de prova no coração do espaço para explorar sem pressa.",
    },
    {
      name: lang === "es" ? "Planta Alta" : "Andar Superior",
      capacity: 600,
      description:
        lang === "es"
          ? "Experiencias gastronómicas pensadas como armonizaciones. Masterclasses y charlas de enólogos expertos. Espacios para compartir, disfrutar y aprender más profundamente del vino argentino."
          : "Experiências gastronômicas pensadas como harmonizações. Masterclasses e palestras de enólogos especialistas. Espaços para compartilhar, aproveitar e aprender mais profundamente sobre o vinho argentino.",
    },
  ];
}

const venueImages = [
  "_HID8883.webp",
  "_HID8893.webp",
  "_HID8908.webp",
  "_HID8910.webp",
  "_HID8934.webp",
  "_HID8935.webp",
  "_HID8937.webp",
  "_HID8943.webp",
  "_HID8946.webp",
  "_HID8949.webp",
  "_HID8967.webp",
  "_HID9460.webp",
  "_HID9705.webp",
  "_HID9800.webp",
  "_HID9875.webp",
];

export function VenueV3() {
  const { language } = useLanguage();
  const floors = getFloors(language);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <section id="venue" className="bg-paper overflow-hidden relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Reveal>
              <p className="lato-expanded text-[10px] text-wine/60 uppercase tracking-[0.35em] font-bold">
                {t("venueTitle", language)}
              </p>
            </Reveal>

            <Reveal variant="clip" delay={0.15}>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] uppercase text-wine">
                El Espacio
                <br />
                <span className="script normal-case italic text-wine text-[1.2em]"><span className="script-ss01">P</span>erfecto</span>
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-base md:text-lg text-wine/80 leading-relaxed max-w-lg whitespace-pre-line">
                {t("venueMainText", language)}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-sm text-wine/70 leading-relaxed max-w-lg italic">
                {t("venueSupportText", language)}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="pt-5 border-t border-wine/20">
                <p className="font-serif text-sm md:text-base text-wine">
                  {t("venueLocation", language)}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex gap-2">
                {floors.map((floor, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFloor(idx)}
                    className={`px-4 md:px-5 py-2 border rounded-full font-bold uppercase text-[10px] tracking-wider transition-all duration-300 ${
                      selectedFloor === idx
                        ? "bg-wine text-paper border-wine"
                        : "border-wine/40 text-wine/70 hover:border-wine/60"
                    }`}
                  >
                    {floor.name}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="text-sm md:text-base text-wine/75 leading-relaxed max-w-lg">
                {floors[selectedFloor].description}
              </p>
            </Reveal>
          </div>

          {/* Right: Floor Plan */}
          <Reveal delay={0.3}>
            <div className="bg-wine rounded p-8 md:p-10 shadow-lg aspect-square flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="lato-expanded text-[9px] text-paper/60 uppercase tracking-[0.3em] mb-1">
                    Planta · {selectedFloor === 0 ? "Baja" : "Alta"}
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-paper font-bold">
                    {floors[selectedFloor].capacity}
                    <span className="text-sm ml-2 font-normal">personas</span>
                  </p>
                </div>
                <img
                  src="/oda/brand/logo_blanco_vertical.svg"
                  alt="ODA"
                  className="h-12 opacity-60"
                />
              </div>

              {/* Gallery Carousel */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded bg-wine/5">
                {/* Image */}
                <Image
                  src={`/oda/venue/${venueImages[imageIndex]}`}
                  alt={`Venue space ${imageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={imageIndex === 0}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={() => setImageIndex((i) => (i - 1 + venueImages.length) % venueImages.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-wine/80 hover:bg-wine text-paper transition-all z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => setImageIndex((i) => (i + 1) % venueImages.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-wine/80 hover:bg-wine text-paper transition-all z-10"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-wine/90 px-4 py-2 rounded-full">
                  <p className="text-paper text-sm font-medium">
                    {imageIndex + 1} / {venueImages.length}
                  </p>
                </div>

                {/* Dots Navigation */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {venueImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === imageIndex ? "w-6 bg-paper" : "w-2 bg-paper/40 hover:bg-paper/60"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Old SVG Floor Plan - kept for reference, hidden */}
              <svg viewBox="0 0 400 400" className="w-full h-auto flex-grow hidden">
                <defs>
                  <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.5" fill="rgba(255, 245, 225, 0.15)" />
                  </pattern>
                </defs>

                {/* Grid background */}
                <rect
                  x="30"
                  y="50"
                  width="340"
                  height="300"
                  fill="url(#dots)"
                  stroke="rgba(255,245,225,0.3)"
                  strokeDasharray="2 4"
                  strokeWidth="1"
                />

                {selectedFloor === 0 ? (
                  <>
                    {/* Ground Floor: Bodegas around perimeter */}
                    {[...Array(12)].map((_, i) => (
                      <rect
                        key={`top-${i}`}
                        x={40 + i * 28}
                        y="60"
                        width="22"
                        height="12"
                        fill="#7c8419"
                        opacity={0.85}
                      />
                    ))}
                    {[...Array(12)].map((_, i) => (
                      <rect
                        key={`bottom-${i}`}
                        x={40 + i * 28}
                        y="328"
                        width="22"
                        height="12"
                        fill="#7c8419"
                        opacity={0.85}
                      />
                    ))}
                    {[...Array(7)].map((_, i) => (
                      <rect
                        key={`left-${i}`}
                        x="35"
                        y={80 + i * 38}
                        width="12"
                        height="28"
                        fill="#7c8419"
                        opacity={0.85}
                      />
                    ))}
                    {[...Array(7)].map((_, i) => (
                      <rect
                        key={`right-${i}`}
                        x="353"
                        y={80 + i * 38}
                        width="12"
                        height="28"
                        fill="#7c8419"
                        opacity={0.85}
                      />
                    ))}

                    {/* Center tasting tables */}
                    {[...Array(9)].map((_, i) => (
                      <circle
                        key={`table-${i}`}
                        cx={110 + (i % 3) * 60}
                        cy={150 + Math.floor(i / 3) * 50}
                        r="14"
                        fill="#700143"
                        opacity={0.9}
                      />
                    ))}

                    {/* Labels */}
                    <text
                      x="200"
                      y="40"
                      fill="rgba(255,245,225,0.6)"
                      fontSize="9"
                      textAnchor="middle"
                      letterSpacing="2"
                      fontFamily="monospace"
                    >
                      ACCESO PRINCIPAL
                    </text>
                    <text
                      x="200"
                      y="360"
                      fill="rgba(255,245,225,0.6)"
                      fontSize="9"
                      textAnchor="middle"
                      letterSpacing="2"
                      fontFamily="monospace"
                    >
                      ENTRADA SECUNDARIA
                    </text>
                  </>
                ) : (
                  <>
                    {/* Upper Floor: Gourmet + Masterclass */}
                    <rect
                      x="60"
                      y="100"
                      width="130"
                      height="100"
                      fill="#700143"
                      opacity={0.85}
                    />
                    <text
                      x="125"
                      y="160"
                      fill="rgba(255,245,225,0.8)"
                      fontSize="9"
                      textAnchor="middle"
                      letterSpacing="1.5"
                      fontFamily="monospace"
                    >
                      ÁREA GOURMET
                    </text>

                    <rect
                      x="210"
                      y="100"
                      width="130"
                      height="100"
                      fill="#7c8419"
                      opacity={0.85}
                    />
                    <text
                      x="275"
                      y="160"
                      fill="rgba(255,245,225,0.8)"
                      fontSize="9"
                      textAnchor="middle"
                      letterSpacing="1.5"
                      fontFamily="monospace"
                    >
                      MASTERCLASSES
                    </text>

                    {/* Seating areas */}
                    {[...Array(8)].map((_, i) => (
                      <circle
                        key={`seat-${i}`}
                        cx={90 + (i % 4) * 70}
                        cy={240 + Math.floor(i / 4) * 50}
                        r="16"
                        fill="#700143"
                        opacity={0.8}
                      />
                    ))}

                    <text
                      x="200"
                      y="40"
                      fill="rgba(255,245,225,0.6)"
                      fontSize="9"
                      textAnchor="middle"
                      letterSpacing="2"
                      fontFamily="monospace"
                    >
                      ODA VINOTECA
                    </text>
                  </>
                )}

                {/* Legend */}
                <g transform="translate(30, 360)">
                  <rect width="14" height="8" fill="#7c8419" />
                  <text x="18" y="6" fill="rgba(255,245,225,0.6)" fontSize="7.5" fontFamily="monospace">
                    BODEGAS
                  </text>
                  <circle cx="95" cy="4" r="6" fill="#700143" />
                  <text x="105" y="6" fill="rgba(255,245,225,0.6)" fontSize="7.5" fontFamily="monospace">
                    DEGUSTACIÓN
                  </text>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
