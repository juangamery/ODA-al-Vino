"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  id: number;
  title: string;
  text: string;
  images: string[];
}

const items: ExperienceItem[] = [
  {
    id: 0,
    title: "Descubrí",
    text: "Recorré bodegas, probá nuevas etiquetas y dejate sorprender.",
    images: [
      "/oda/gallery/oav25/009A7064.webp",
      "/oda/gallery/oav25/009A7140.webp",
      "/oda/gallery/oav25/009A7373.webp",
      "/oda/gallery/oav25/0D0A7446.webp",
      "/oda/Graphics/700 etiquetas@2x.png",
    ],
  },
  {
    id: 1,
    title: "Conectá",
    text: "Conocé a quienes hacen el vino y compartí la experiencia con otros.",
    images: [
      "/oda/gallery/oav24/_HID9206.webp",
      "/oda/gallery/oav24/_HID9267.webp",
      "/oda/gallery/oav24/_HID9322.webp",
      "/oda/gallery/oav24/_HID0705.webp",
    ],
  },
  {
    id: 2,
    title: "Disfrutá",
    text: "Gastronomía pensada para acompañar cada momento.",
    images: [
      "/oda/gallery/oav25/009A7272.webp",
      "/oda/gallery/oav25/0D0A7461.webp",
      "/oda/gallery/oav25/009A7134.webp",
      "/oda/gallery/oav24/_HID8934.webp",
    ],
  },
  {
    id: 3,
    title: "Aprendé",
    text: "Experiencias que transforman la forma de vivir el vino.",
    images: [
      "/oda/gallery/oav24/_HID8934.webp",
      "/oda/gallery/oav25/009A7064.webp",
      "/oda/gallery/oav24/_HID9206.webp",
      "/oda/gallery/oav25/009A7272.webp",
    ],
  },
];

interface RevealImageItemProps {
  title: string;
  text: string;
  images: string[];
}

function RevealImageItem({ title, text, images }: RevealImageItemProps) {
  // Posiciones dinámicas para cada imagen - bien dispersas sin solapamiento
  const imagePositions = [
    { x: 80, y: -90, delay: 0 },
    { x: 200, y: -40, delay: 100 },
    { x: 40, y: 140, delay: 200 },
    { x: 180, y: 120, delay: 300 },
    { x: 330, y: 60, delay: 400 },
  ];

  return (
    <div className="group relative w-full py-2 md:py-3 lg:py-4 px-0 transition-all duration-300 border-t border-b border-paper/0 group-hover:border-paper/20">
      {/* Contenedor grid: texto a la izquierda + imágenes a la derecha */}
      <div className="flex items-center gap-8 md:gap-16 lg:gap-24 w-full">
        {/* Columna izquierda: título y descripción apilados */}
        <div className="flex-1 min-w-0 pr-4">
          {/* Título - más grande en la parte superior */}
          <h3
            className={cn(
              "font-serif text-[clamp(2rem,6vw,4rem)] uppercase leading-tight mb-6 md:mb-8",
              "transition-colors duration-500",
              "text-paper/70 group-hover:text-harvest"
            )}
          >
            {title}
          </h3>

          {/* Descripción debajo del título */}
          <p
            className={cn(
              "text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl",
              "transition-all duration-500",
              "text-paper/70 group-hover:text-paper"
            )}
          >
            {text}
          </p>
        </div>

        {/* Columna derecha: imágenes flotantes */}
        <div className="hidden sm:block relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[560px] h-[240px] sm:h-[300px] md:h-[380px] lg:h-[460px]">
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-lg shadow-lg transition-all duration-700 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-2xl"
              style={{
                width: "180px",
                height: "200px",
                left: `${imagePositions[i].x}px`,
                top: `${imagePositions[i].y}px`,
                transitionDelay: `${imagePositions[i].delay}ms`,
              }}
            >
              <Image
                src={img}
                alt={`${title} - Foto ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experiencia" className="bg-[#700143] overflow-visible relative">
      {/* Patrón de fondo */}
      <img
        src="/oda/Graphics/fondovioleta2.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none select-none mix-blend-screen"
      />

      {/* Etiqueta 700 Etiquetas - lado inferior derecho */}
      <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 w-48 h-56 lg:w-56 lg:h-64 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 250 300" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
          {/* Fondo ovalado */}
          <ellipse cx="125" cy="150" rx="120" ry="145" fill="#fff5e1" />

          {/* Texto: "MÁS DE" */}
          <text x="125" y="85" textAnchor="middle" fill="#4c5409" fontSize="16" fontWeight="400" letterSpacing="2" fontFamily="serif">
            MÁS DE
          </text>

          {/* Número: "700" */}
          <text x="125" y="175" textAnchor="middle" fill="#4c5409" fontSize="100" fontWeight="700" letterSpacing="-3" fontFamily="serif">
            700
          </text>

          {/* Texto: "ETIQUETAS" */}
          <text x="125" y="225" textAnchor="middle" fill="#4c5409" fontSize="22" fontWeight="700" letterSpacing="1" fontFamily="serif">
            ETIQUETAS
          </text>

          {/* Texto: "DISPONIBLES PARA" */}
          <text x="125" y="255" textAnchor="middle" fill="#4c5409" fontSize="11" fontWeight="400" letterSpacing="0.5" fontFamily="sans-serif">
            DISPONIBLES PARA
          </text>

          {/* Texto: "DEGUSTACIÓN" */}
          <text x="125" y="272" textAnchor="middle" fill="#4c5409" fontSize="11" fontWeight="400" letterSpacing="0.5" fontFamily="sans-serif">
            DEGUSTACIÓN
          </text>

          {/* Decoración: estrellas de cuatro puntas */}
          <g fill="#4c5409" opacity="0.5">
            {/* Estrella izquierda */}
            <line x1="30" y1="145" x2="30" y2="155" stroke="#4c5409" strokeWidth="1" />
            <line x1="25" y1="150" x2="35" y2="150" stroke="#4c5409" strokeWidth="1" />
            {/* Estrella derecha */}
            <line x1="220" y1="145" x2="220" y2="155" stroke="#4c5409" strokeWidth="1" />
            <line x1="215" y1="150" x2="225" y2="150" stroke="#4c5409" strokeWidth="1" />
          </g>
        </svg>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-24 py-16 md:py-24 lg:py-28">
        {/* Contenido */}
        <div className="relative max-w-full">
          {/* Título con ilustración decorativa */}
          <div className="flex items-start justify-between gap-4 md:gap-8 mb-8 md:mb-14">
            <Reveal variant="clip">
              <h2 className="font-serif text-[clamp(2rem,6vw,6rem)] leading-[0.88] uppercase text-paper">
                Viví el <span className="script normal-case italic text-paper text-[1.25em]"><span className="script-ss01">V</span>ino</span><br />
                de otra manera
              </h2>
            </Reveal>
          </div>

          {/* Items lista con hover y imágenes dinámicas */}
          <div className="space-y-0 sm:space-y-1 md:space-y-1">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <RevealImageItem
                  title={item.title}
                  text={item.text}
                  images={item.images}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
