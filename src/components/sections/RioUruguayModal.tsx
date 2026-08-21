"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function RioUruguayModal({ isOpen, onClose }: Props) {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const suffix = language === "pt" ? "por" : "esp";
  const images = [
    `/oda/sponsor/RU-OAV26-1-${suffix}.png`,
    `/oda/sponsor/RU-OAV26-2-${suffix}.png`,
    `/oda/sponsor/RU-OAV26-3-${suffix}.png`,
    `/oda/sponsor/RU-OAV26-4-${suffix}.png`,
  ];

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!isOpen) { setCurrent(0); return; }
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, next, prev]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <img
          src={images[current]}
          alt={`Rio Uruguay beneficio ${current + 1}`}
          className="w-full rounded-2xl shadow-2xl"
        />

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none hover:bg-black/80 transition"
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Flechas */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
              aria-label="Siguiente"
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
