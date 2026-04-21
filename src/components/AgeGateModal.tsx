"use client";

import { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function AgeGateModal() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si el usuario ya pasó la verificación
    const ageVerified = localStorage.getItem("oda_age_verified");

    if (!ageVerified) {
      setIsVisible(true);
      // Animar entrada del modal
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.5)" }
        );
      }
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("oda_age_verified", "true");

    // Animar salida
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setIsVisible(false)
          });
        }
      });
    }
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ opacity: 0 }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-md bg-gradient-to-br from-wine via-plum to-wine rounded-2xl p-8 md:p-12 shadow-2xl"
        style={{
          opacity: 0,
          boxShadow: "0 20px 60px rgba(71, 7, 44, 0.4)"
        }}
      >
        {/* Decorativo: Línea punteada lateral */}
        <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col items-center justify-between py-8">
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-paper/30" />
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="ml-4 text-center">
          {/* Logo/Marca */}
          <p className="text-paper/70 text-sm md:text-base tracking-widest uppercase font-bold mb-6">
            {t("ageGateLabel", language)}
          </p>

          {/* Título */}
          <h2 className="font-serif text-3xl md:text-4xl uppercase text-paper leading-tight mb-4">
            {t("ageGateTitle", language)}
          </h2>

          {/* Mensaje */}
          <p className="text-paper/80 text-base md:text-lg leading-relaxed mb-8">
            {t("ageGateMessage", language)}
          </p>

          {/* Botones */}
          <div className="space-y-3">
            <button
              onClick={handleVerify}
              className="w-full bg-paper hover:bg-paper/95 text-wine font-serif font-bold uppercase tracking-wider py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("ageGateButton", language)}
            </button>

            <button
              onClick={handleExit}
              className="w-full bg-transparent hover:bg-paper/10 text-paper border-2 border-paper font-bold uppercase tracking-wider py-4 rounded-full transition-all duration-300"
            >
              {t("ageGateExit", language)}
            </button>
          </div>

          {/* Microcopy */}
          <p className="text-paper/60 text-xs mt-6 text-center">
            {t("ageGateDisclaimer", language)}
          </p>
        </div>
      </div>
    </div>
  );
}
