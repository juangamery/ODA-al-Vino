"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { BODEGAS_2026 } from "@/lib/bodegas2026";

const bodegas = [...BODEGAS_2026].sort((x, y) => x.localeCompare(y, "es"));

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BodegasModal({ isOpen, onClose }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative bg-paper w-full max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-wine px-6 md:px-10 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="lato-expanded text-[9px] text-paper/50 uppercase tracking-[0.35em] font-bold mb-1">
              ✦ ODA AL VINO 2026 ✦
            </p>
            <h3 className="font-serif text-xl md:text-3xl uppercase text-paper leading-tight">
              {t("bodegasParticipants", language)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-paper/60 hover:text-paper transition text-2xl leading-none ml-4 flex-shrink-0"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Lista scrollable */}
        <div className="overflow-y-auto px-6 md:px-10 py-6 flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
            {bodegas.map((bodega, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-harvest text-xs flex-shrink-0">★</span>
                <span className="text-sm md:text-base text-wine/80 font-medium leading-snug">
                  {bodega}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-wine/10 px-6 md:px-10 py-4 flex-shrink-0 text-center">
          <p className="text-[10px] uppercase tracking-widest text-wine/40 font-bold">
            {language === "pt" ? "10ª edição · 105 adegas participantes" : "10ª edición · 105 bodegas participantes"}
          </p>
        </div>
      </div>
    </div>
  );
}
