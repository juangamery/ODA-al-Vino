"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function FooterV3() {
  const { language } = useLanguage();

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
        </div>

        {/* Base */}
        <div className="border-t border-wine/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wine/25">
            {t("footerCopyright", language)}
          </p>
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
        <img
          src="/oda/brand/logo-oda.svg"
          alt="ODA"
          className="h-20 md:h-28 w-auto opacity-[0.35] mx-auto select-none"
        />
      </div>
    </footer>
  );
}
