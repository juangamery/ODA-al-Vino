"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export function FloatingHeader() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si estamos en /faq y es un link a una sección, ir a home con el anchor
    if (pathname === "/faq" && href.startsWith("#")) {
      e.preventDefault();
      router.push(`/${href}`);
    }
  };

  const links = [
    { label: t("navInicio", language), href: "/" },
    { label: t("navManifiesto", language), href: "#manifiesto" },
    { label: t("navExperiencia", language), href: "#experiencia" },
    { label: t("navEntradas", language), href: "#entradas" },
    { label: t("navBodegas", language), href: "#bodegas" },
    { label: t("navDestino", language), href: "#iguazu" },
    { label: t("navComunidad", language), href: "#comunidad" },
    { label: t("navFaq", language), href: "/faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Activar cuando se hace scroll más de 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header inicial - Logo SVG vertical */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-4 pt-6 md:px-6 transition-all duration-300",
          isScrolled && "opacity-0 pointer-events-none"
        )}
      >
        <a href="#inicio" className="flex items-center justify-center">
          <img
            src="/oda/brand/logo_blanco_vertical.svg"
            alt="ODA al Vino"
            className="h-40 md:h-20 w-auto"
          />
        </a>
      </header>

      {/* Header flotante - Aparece al scroll */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-4 pt-2 md:px-6 transition-all duration-300 ease-out",
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-paper/20 bg-wine/80 px-3 md:px-6 py-2 md:py-3 shadow-[0_20px_80px_rgba(71,7,44,0.3)] backdrop-blur-xl gap-2 md:gap-4">
          {/* Logo horizontal a la izquierda */}
          <a
            href={pathname === "/faq" ? "/" : "#inicio"}
            onClick={(e) => handleNavClick(e, "#inicio")}
            className="flex items-center flex-shrink-0"
          >
            <img
              src="/oda/brand/logo_crema_horizontal.svg"
              alt="ODA al Vino"
              className="h-8 md:h-12 w-auto"
            />
          </a>

          {/* Navegación en el centro - hidden en mobile */}
          <nav className="hidden md:flex items-center gap-1 justify-center flex-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-full px-2 md:px-3 py-2 text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-paper/70 transition hover:bg-paper/15 hover:text-paper whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language Switch + Botón Comprar a la derecha */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Hamburger menu - mobile only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
              aria-label="Menu"
            >
              <span className={cn("w-6 h-0.5 bg-paper transition", isMenuOpen && "rotate-45 translate-y-2")}></span>
              <span className={cn("w-6 h-0.5 bg-paper transition", isMenuOpen && "opacity-0")}></span>
              <span className={cn("w-6 h-0.5 bg-paper transition", isMenuOpen && "-rotate-45 -translate-y-2")}></span>
            </button>

            <LanguageSwitch />
            <a
              href="#entradas"
              onClick={(e) => handleNavClick(e, "#entradas")}
              className="rounded-full bg-paper px-3 md:px-5 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-wine transition hover:bg-harvest hover:text-paper whitespace-nowrap"
            >
              {t("navBuy", language)}
            </a>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <nav className="md:hidden mx-auto max-w-7xl mt-2 rounded-2xl border border-paper/20 bg-wine/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(71,7,44,0.3)]">
            <div className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-paper/80 hover:text-paper hover:bg-paper/10 rounded-lg transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
