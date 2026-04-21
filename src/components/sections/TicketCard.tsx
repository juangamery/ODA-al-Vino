"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface TicketCardProps {
  lot: {
    number: number;
    price: string;
    label: string;
    ars?: string;
    pyg?: string;
  };
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export function TicketCard({ lot, isSelected, onClick, index }: TicketCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Animación de entrada con rotación y stagger
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.4, y: 30, rotation: index % 2 === 0 ? -8 : 8 },
      {
        opacity: isSelected ? 1 : 0.5,
        scale: isSelected ? 1 : 0.95,
        y: 0,
        rotation: index % 2 === 0 ? -1.5 : 1.5,
        duration: 0.9,
        delay: index * 0.15,
        ease: "back.out(1.7)",
      }
    );
  }, [isSelected, index]);

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`relative w-full transition-all duration-300 group origin-center hover:scale-105 ${
        isSelected ? "z-10 scale-105 md:scale-110" : "scale-95 md:scale-100"
      }`}
      style={{
        willChange: "transform",
        transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Label AFUERA del ticket - arriba */}
      <div className="mb-3 flex justify-center">
        <div
          className={`px-4 py-2 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
            isSelected
              ? "bg-harvest text-paper"
              : "bg-wine/20 text-wine/50"
          }`}
        >
          {lot.label}
        </div>
      </div>

      {/* SVG Background - Ticket Shape */}
      <div className="relative w-full aspect-[2.35/1]" style={{ backfaceVisibility: "hidden" }}>

        <svg
          viewBox="-2 -2 443.13 191.16"
          className="w-full h-full absolute inset-0 transition-all duration-300"
          style={{
            filter: isSelected
              ? "drop-shadow(0 25px 50px rgba(71, 7, 44, 0.4)) drop-shadow(0 0 30px rgba(124, 132, 25, 0.3))"
              : "drop-shadow(0 8px 16px rgba(71, 7, 44, 0.1))",
          }}
          preserveAspectRatio="xMidYMid meet"
        >

          {/* Main ticket fill */}
          <path
            d="M427,175.2c-.05.81-.02,1.59.09,2.36l-321.02.25c.12-.57.2-1.16.24-1.77.4-6.34-4.42-11.8-10.75-12.2-6.34-.4-11.8,4.42-12.2,10.75-.07,1.12.02,2.2.26,3.23l-71.68.05c-.25-5.8-4.83-10.59-10.76-10.97-.36-.02-.71-.02-1.06-.02L0,10.35C5.24,9.78,9.5,5.65,10.15.31l74.21-.05c.11,5.93,4.76,10.87,10.77,11.25,6.34.4,11.8-4.42,12.2-10.75.01-.17.02-.34.02-.51l317.72-.24c.27,5.78,4.86,10.56,10.76,10.93.93.06,1.83,0,2.71-.15l.11,153.64c-6.12-.1-11.28,4.62-11.67,10.78Z"
            fill={isSelected ? "#fff5e1" : "#fff5e1"}
            opacity={isSelected ? 1 : 0.95}
            className="transition-opacity duration-300"
          />

          {/* Punteada line */}
          <line
            x1="94.79"
            y1="12.47"
            x2="94.79"
            y2="164.8"
            stroke="#4c5409"
            strokeDasharray="6"
            strokeWidth="1.5"
            opacity={isSelected ? 1 : 0.8}
            className="transition-opacity duration-300"
          />
        </svg>

        {/* Content Overlay - Text inside ticket */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          {/* Top: DISPONIBLE line (only for first lot) */}
          {isSelected && lot.number === 1 && (
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-harvest/60" />
              <span className="text-[8px] font-bold tracking-[0.25em] text-harvest uppercase whitespace-nowrap">
                Disponible
              </span>
              <div className="h-px flex-1 bg-harvest/60" />
            </div>
          )}

          {/* Center - Main Content */}
          <div className="flex items-center justify-between flex-1">
            {/* Left: Flag emojis centered - con animación de ondulación */}
            <div className="flex flex-col items-center gap-0.5 text-sm md:text-base" style={{ animation: isSelected ? "flag-wave 0.6s ease-in-out infinite" : "none" }}>
              <span style={{ display: "inline-block", transformOrigin: "center", animation: isSelected ? "flag-individual 0.6s ease-in-out infinite" : "none" }}>🇧🇷</span>
              <span style={{ display: "inline-block", transformOrigin: "center", animation: isSelected ? "flag-individual 0.6s ease-in-out 0.1s infinite" : "none" }}>🇦🇷</span>
              <span style={{ display: "inline-block", transformOrigin: "center", animation: isSelected ? "flag-individual 0.6s ease-in-out 0.2s infinite" : "none" }}>🇵🇾</span>
            </div>

            {/* Center: Lote number, precio, conversiones */}
            <div className="flex flex-col items-center justify-center flex-1 px-4">
              {/* Número de lote - pequeño arriba */}
              <p
                className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] transition-colors duration-300 mb-1 ${
                  isSelected ? "text-olive" : "text-olive/40"
                }`}
              >
                {lot.number}° LOTE
              </p>

              {/* Precio con R$ adelante - con pulse cuando está seleccionado */}
              <div className="flex items-baseline justify-center gap-1 md:gap-2 leading-none" style={{ animation: isSelected ? "price-pulse 2s ease-in-out infinite" : "none" }}>
                <span
                  className={`font-serif font-bold transition-colors duration-300 ${
                    isSelected
                      ? "text-wine text-2xl md:text-3xl lg:text-4xl"
                      : "text-wine/40 text-xl md:text-2xl lg:text-3xl"
                  }`}
                >
                  R$
                </span>
                <p
                  className={`font-serif font-bold transition-colors duration-300 ${
                    isSelected
                      ? "text-wine text-5xl md:text-5xl lg:text-6xl"
                      : "text-wine/40 text-4xl md:text-4xl lg:text-5xl"
                  }`}
                >
                  {lot.price}
                </p>
              </div>

              {/* Precios convertidos - Una línea dentro del ticket */}
              <div
                className={`text-[9px] md:text-xs font-bold transition-colors duration-300 mt-3 text-center hidden md:block ${
                  isSelected ? "text-wine/70" : "text-wine/50"
                }`}
              >
                ≈ ARS ${lot.ars || "−"} · ≈ PYG ₲{lot.pyg || "−"}
              </div>
            </div>

            {/* Right: Empty space for balance */}
            <div className="w-8 md:w-10" />
          </div>
        </div>

        {/* ODA AL VINO Logo - Right Edge Detail */}
        <svg
          viewBox="0 0 25.62 171.71"
          className="absolute right-2 md:right-4 top-0 bottom-0 pointer-events-none"
          style={{
            width: "clamp(16px, 4vw, 24px)",
            height: "100%",
            filter: "drop-shadow(0 2px 4px rgba(102, 16, 65, 0.2))"
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Capa_1-2" data-name="Capa 1">
            <g>
              <path fill="#661041" d="M13.34,146.13c7.06.29,12.54,6.25,12.24,13.31-.29,7.06-6.25,12.54-13.31,12.25-7.06-.29-12.54-6.25-12.24-13.31.29-7.06,6.25-12.54,13.31-12.25ZM10.02,151.28c-6.35,2.8-9.53,7.48-8.3,11.78,1.24,4.3,7.85,6.3,14.2,3.5,6.35-2.8,9.21-7.61,7.97-11.92-1.24-4.3-7.53-6.17-13.88-3.37Z"/>
              <path fill="#661041" d="M12.05,129.09c11.93-.03,13.39,7.07,13.53,9.42v2.26h0s0,4.26,0,4.26c-.58-.38-2.84-.8-5.61-.98-.62-.04-1.26-.07-1.92-.08H7.56c-3.6.07-6.82.59-7.53,1.06l-.02-3.42c0-1.68-.08-3.97.4-5.41,1.6-4.73,4.39-7.09,11.64-7.11ZM23.67,136.46c-1.44-1.58-4.65-3.05-11.57-3.05-5.63,0-11.45.5-11.15,5.3.03.49.14,1.16.41,1.66h20.51c2.03,0,3.16-2.41,1.8-3.91h0Z"/>
              <path fill="#661041" d="M25.58,119.85c-.44-.31-1.97-.71-3.88-.93-1.31-.16-5.4.59-9.59,1.47l5.49,5.93c2.42.42,3.95.21,6.52-.52.44-.13.95-.26,1.45-.38v4.05s-12.69-3.33-12.69-3.33l-10.79-2.74c-.9.42-1.88,1-2.07,1.11v-4.71c1.3-.32,2.6-.64,3.89-.97,7.2-1.79,14.46-3.59,21.66-5.38v6.39h0ZM10.75,120.67c-3.95.86-7.36,1.7-8.33,2.1,0,0,9.85,2.51,14.52,3.46l-6.19-5.56Z"/>
              <path fill="#661041" d="M25.58,95.67c-.44-.31-1.97-.71-3.88-.93-1.31-.16-5.4.59-9.59,1.47l5.49,5.93c2.42.42,3.95.21,6.52-.52.44-.13.95-.26,1.45-.38v4.05s-12.69-3.33-12.69-3.33l-10.79-2.74c-.9.42-1.88,1-2.07,1.11v-4.71c1.3-.32,2.6-.64,3.89-.97,7.2-1.79,14.46-3.59,21.66-5.38v6.39h0ZM10.75,96.49c-3.95.86-7.36,1.7-8.33,2.1,0,0,9.85,2.51,14.52,3.46l-6.19-5.56Z"/>
              <path fill="#661041" d="M20,87.65c-.62-.05-1.27-.08-1.92-.09H7.58c-.66.02-1.31.05-1.93.09-2.78.2-5.04.68-5.62,1.11v-6.03c.58.43,2.85.91,5.62,1.11.62.05,1.27.08,1.93.09h17.09c0-2.69-1.43-5.45-3-8.98l3.93-.04-.03,13.84c-.58-.43-2.79-.9-5.57-1.11h0Z"/>
              <path fill="#661041" d="M0,50.16l24.17,6.4,1.4-.84v4.52s-18.3,4.76-18.3,4.76L.02,66.9v-6.67c.43.33,1.93.72,3.84.95,1.67.2,3.65.02,5.28-.39l14.12-3.63-15.86-2.92c-1.95-.53-3.99-.54-5.93.03-.45.13-.91.26-1.42.39l-.04-4.5h0Z"/>
              <path fill="#661041" d="M19.98,44.73c2.78-.2,5.04-.68,5.62-1.11v6.03c-.58-.43-2.84-.91-5.62-1.11-.62-.05-1.27-.08-1.92-.09H7.57c-.66.02-1.31.05-1.93.09-2.78.2-5.04.68-5.62,1.11v-6.03c.58.43,2.84.91,5.62,1.11.62.05,1.27.08,1.93.09h10.49c.66-.01,1.3-.05,1.92-.09Z"/>
              <path fill="#661041" d="M21.65,27.74l3.95-1.11v3.61c-1.29.27-2.46.8-3.6,1.38l-11.97,5.85-6.18,3.03,7.27-.04c5.55-.18,10.8-1.65,14.51-2.44l-.03,4.09c-4.18-.56-5.38-.57-9.64-.67h-3.04s-11.1.01-11.1.01l-1.79.49v-3.93c0-.06,1.15-.32,1.26-.35.62-.18,1.22-.45,1.77-.72.11-.05,12.5-6.13,12.5-6.13l4.29-2.03-5.29-.03c-5.55.18-10.8,1.65-14.51,2.44v-4.1c4.18.56,5.38.57,9.64.67h3.04s8.95,0,8.95,0h0Z"/>
              <path fill="#661041" d="M13.34.01c7.06.29,12.54,6.25,12.24,13.31-.29,7.06-6.25,12.54-13.31,12.25C5.22,25.28-.26,19.32.04,12.26.33,5.2,6.29-.28,13.34.01ZM10.02,5.16C3.67,7.96.49,12.63,1.72,16.94c1.24,4.3,7.85,6.3,14.2,3.5,6.35-2.8,9.21-7.61,7.97-11.92-1.24-4.3-7.53-6.17-13.88-3.37Z"/>
              <path fill="#661041" d="M6.17,158.7c-.15-.11,0-.16.13-.18.42-.05.92.04,1.35,0,3.28-.29,5.98-1.89,5.95-5.5.06,1.09.21,2.13.82,3.06,1.32,2.02,4.04,2.47,6.28,2.5.11,0,.2-.09.25.12-3.53-.25-7.51,1.4-7.35,5.5-.14-1.82-.72-3.36-2.31-4.37-.74-.47-2.52-1.13-3.37-1.13h-1.76Z"/>
            </g>
          </g>
        </svg>
      </div>

      {/* Precios convertidos - Mobile solo (debajo del ticket) */}
      <div
        className={`text-[10px] font-bold transition-colors duration-300 mt-2 text-center md:hidden ${
          isSelected ? "text-wine/70" : "text-wine/50"
        }`}
      >
        ≈ ARS ${lot.ars || "−"} · ≈ PYG ₲{lot.pyg || "−"}
      </div>

      <style>{`
        @keyframes flag-wave {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes flag-individual {
          0%, 100% { transform: rotateZ(0deg) scale(1); }
          25% { transform: rotateZ(8deg) scale(1.1); }
          50% { transform: rotateZ(0deg) scale(1.15); }
          75% { transform: rotateZ(-8deg) scale(1.1); }
        }

        @keyframes price-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.95; }
        }
      `}</style>
    </button>
  );
}
