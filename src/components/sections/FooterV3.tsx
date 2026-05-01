"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function FooterV3() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("✓ Suscrito exitosamente");
        setEmail("");
      } else {
        setMessage("✗ Error al suscribirse");
      }
    } catch (error) {
      setMessage("✗ Error de conexión");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const navLinks = [
    { label: t("navInicio", language), href: "#inicio" },
    { label: t("navManifiesto", language), href: "#manifiesto" },
    { label: t("navExperiencia", language), href: "#experiencia" },
    { label: t("navEntradas", language), href: "#tickets" },
    { label: t("navDestino", language), href: "#iguazu" },
  ];

  const externalLinks = [
    { label: t("footerVinotienda", language), href: "https://www.odavinoteca.com.ar/" },
    { label: t("footerDutyFree", language), href: "https://odavinhoteca.com.br/" },
    { label: t("footerWineshop", language), href: "https://odawineshop.com.br/" },
  ];
  return (
    <footer className="bg-paper border-t border-wine/8">
      {/* Strip de personajes como separador superior */}
      <div className="border-b border-wine/5 overflow-hidden">
        <img
          src="/oda/Graphics/copas y personajes.webp"
          alt=""
          aria-hidden="true"
          className="w-full max-w-5xl mx-auto object-contain py-4 px-8 md:px-16"
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-16 md:py-20">
        {/* Logo y Fecha - Encima */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mb-12">
          {/* Logo */}
          <img
            src="/oda/brand/logo_violeta_horizontal.svg"
            alt="ODA al Vino"
            className="h-10 w-auto"
          />

          {/* Fecha */}
          <div className="text-right hidden md:block">
            <p className="font-serif italic text-wine/25 text-sm">{t("footerDate", language)}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-wine/20">{t("footerLocation", language)}</p>
          </div>
        </div>

        {/* Navegación Centrada - Dos líneas */}
        <div className="flex flex-col gap-4 items-center justify-center mb-16">
          {/* Primera línea - Enlaces internos */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] font-bold uppercase tracking-[0.34em] text-wine/50 hover:text-wine transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Segunda línea - Enlaces externos */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
            {externalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-[0.34em] text-wine/30 hover:text-wine/50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Tercera línea - Redes Sociales */}
          <nav className="flex gap-x-4 gap-y-2 justify-center mt-8">
            <a
              href="https://www.instagram.com/odaalvino/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wine/30 hover:text-wine/70 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/odaalvinooficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wine/30 hover:text-wine/70 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="border-t border-wine/8 py-12 mt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wine/60 text-center mb-6">
            Mantente informado
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="px-4 py-2 bg-wine/10 text-wine placeholder:text-wine/40 border border-wine/20 rounded flex-1 text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-wine text-paper rounded font-bold text-sm hover:bg-wine/90 transition disabled:opacity-50"
            >
              {loading ? "..." : "Suscribir"}
            </button>
          </form>
          {message && (
            <p className="text-center text-xs text-wine/70 mt-2">{message}</p>
          )}
        </div>

        {/* Base */}
        <div className="border-t border-wine/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wine/25">
              {t("footerCopyright", language)}
            </p>
            <a
              href="/compliance"
              className="text-[8px] font-bold uppercase tracking-[0.2em] text-wine/20 hover:text-wine/40 transition-colors"
            >
              Términos Legales
            </a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wine/20">
            {t("footerEdition", language)}
          </p>
        </div>
      </div>

      {/* Organizado por - Logo ODA */}
      <div className="overflow-hidden py-8 border-t border-wine/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wine/40 text-center mb-6">
          {t("footerOrganizedBy", language)}
        </p>
        <a
          href="https://www.odavinoteca.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center w-full hover:opacity-80 transition-opacity"
        >
          <img
            src="/oda/brand/logo-oda.svg"
            alt="ODA"
            className="h-20 md:h-28 w-auto opacity-100 select-none"
          />
        </a>
      </div>
    </footer>
  );
}
