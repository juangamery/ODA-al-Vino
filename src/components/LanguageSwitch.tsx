"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (lang: "es" | "pt") => {
    if (language !== lang) {
      // Animar el icono
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          rotation: 180,
          duration: 0.4,
          ease: "back.out(1.2)",
        });
      }
      setLanguage(lang);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-paper/10 transition-all duration-300 text-paper text-sm font-bold uppercase tracking-wider"
        title="Cambiar idioma"
      >
        <span className="text-lg">
          {language === "es" ? "🇦🇷" : "🇧🇷"}
        </span>
        <span className="hidden md:inline">{language === "es" ? "ES" : "PT"}</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 bg-wine border border-paper/20 rounded-lg shadow-xl overflow-hidden z-40"
          style={{
            animation: "fade-in 0.2s ease-out",
          }}
        >
          <button
            onClick={() => toggleLanguage("es")}
            className={`w-full px-4 py-3 text-left hover:bg-paper/10 transition-all flex items-center gap-3 whitespace-nowrap ${
              language === "es" ? "bg-paper/20 text-harvest" : "text-paper"
            }`}
          >
            <span>🇦🇷</span>
            <span className="font-bold uppercase tracking-wider">Español</span>
          </button>

          <div className="border-b border-paper/10" />

          <button
            onClick={() => toggleLanguage("pt")}
            className={`w-full px-4 py-3 text-left hover:bg-paper/10 transition-all flex items-center gap-3 whitespace-nowrap ${
              language === "pt" ? "bg-paper/20 text-harvest" : "text-paper"
            }`}
          >
            <span>🇧🇷</span>
            <span className="font-bold uppercase tracking-wider">Português</span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
