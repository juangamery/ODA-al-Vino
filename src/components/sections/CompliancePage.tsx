"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { Reveal } from "@/components/motion/Reveal";
import { FloatingHeader } from "@/components/layout/FloatingHeader";

export default function CompliancePage() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<"terms" | "privacy" | "cookies">("terms");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["terms", "privacy", "cookies"];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId as "terms" | "privacy" | "cookies");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId as "terms" | "privacy" | "cookies");
    }
  };

  return (
    <>
      <FloatingHeader />
      <main className="min-h-screen bg-paper">
        {/* Header */}
        <div className="bg-wine py-24 md:py-48 min-h-96 md:min-h-auto flex items-center relative overflow-hidden">
          {/* Decorative illustration */}
          <Reveal direction="left" delay={0.2}>
            <img
              src="/oda/Graphics/Recurso 13.svg"
              alt=""
              aria-hidden
              className="absolute -right-32 -top-16 md:-right-24 md:-top-8 w-96 h-auto opacity-20 pointer-events-none"
            />
          </Reveal>

          <div className="mx-auto max-w-6xl px-8 md:px-16 lg:px-24 relative z-10 w-full">
            <Reveal>
              <div className="hidden md:flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-paper/40" />
                <span className="text-[11px] font-serif italic text-paper/60">·</span>
                <div className="w-12 h-px bg-paper/40" />
              </div>
            </Reveal>

            <Reveal variant="clip" delay={0.15}>
              <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] uppercase text-paper text-center mb-4">
                {t("compliancePageTitle", language) || "Términos Legales"}
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-center text-paper/75 max-w-2xl mx-auto">
                {t("compliancePageSubtitle", language) || "Términos de Servicio, Política de Privacidad y Política de Cookies"}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="sticky lg:fixed top-32 lg:left-8 lg:top-32 z-30 mx-4 md:mx-0">
          <nav className="bg-wine/95 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg max-w-xs">
            <p className="text-paper font-bold text-sm mb-4 uppercase tracking-wider">
              {language === "es" ? "Navegación" : "Navegação"}
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("terms")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    activeSection === "terms"
                      ? "bg-paper text-wine"
                      : "text-paper hover:bg-paper/20"
                  }`}
                >
                  {t("complianceTermsTitle", language) || "Términos"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("privacy")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    activeSection === "privacy"
                      ? "bg-paper text-wine"
                      : "text-paper hover:bg-paper/20"
                  }`}
                >
                  {t("compliancePrivacyTitle", language) || "Privacidad"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cookies")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    activeSection === "cookies"
                      ? "bg-paper text-wine"
                      : "text-paper hover:bg-paper/20"
                  }`}
                >
                  {t("complianceCookiesTitle", language) || "Cookies"}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Compliance Content */}
        <div className="mx-auto max-w-4xl px-8 md:px-16 lg:px-24 py-20">
          {/* Terms Section */}
          <Reveal delay={0.1}>
            <section className="mb-20 scroll-mt-20" id="terms">
              <div className="mb-8 pb-8 border-b border-wine/20">
                <h2 className="font-serif text-3xl md:text-4xl text-wine mb-6">
                  {t("complianceTermsTitle", language) || "Términos y Condiciones"}
                </h2>
              </div>
              <div className="prose prose-wine max-w-none">
                <p className="text-wine/80 text-base leading-relaxed whitespace-pre-wrap">
                  {t("complianceTermsContent", language)}
                </p>
              </div>
            </section>
          </Reveal>

          {/* Privacy Section */}
          <Reveal delay={0.15}>
            <section className="mb-20 scroll-mt-20" id="privacy">
              <div className="mb-8 pb-8 border-b border-wine/20">
                <h2 className="font-serif text-3xl md:text-4xl text-wine mb-6">
                  {t("compliancePrivacyTitle", language) || "Política de Privacidad"}
                </h2>
              </div>
              <div className="prose prose-wine max-w-none">
                <p className="text-wine/80 text-base leading-relaxed whitespace-pre-wrap">
                  {t("compliancePrivacyContent", language)}
                </p>
              </div>
            </section>
          </Reveal>

          {/* Cookies Section */}
          <Reveal delay={0.2}>
            <section className="mb-20 scroll-mt-20" id="cookies">
              <div className="mb-8 pb-8 border-b border-wine/20">
                <h2 className="font-serif text-3xl md:text-4xl text-wine mb-6">
                  {t("complianceCookiesTitle", language) || "Política de Cookies"}
                </h2>
              </div>
              <div className="prose prose-wine max-w-none">
                <p className="text-wine/80 text-base leading-relaxed whitespace-pre-wrap">
                  {t("complianceCookiesContent", language)}
                </p>
              </div>
            </section>
          </Reveal>
        </div>

        {/* Footer Links */}
        <div className="bg-wine/5 border-t border-wine/10 py-12">
          <div className="mx-auto max-w-4xl px-8 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <Link
                href="/"
                className="text-wine font-bold hover:text-wine/80 transition-colors"
              >
                ← {t("complianceBackHome", language) || "Volver al inicio"}
              </Link>

              <div className="flex gap-6">
                <span className="text-wine/60 text-sm">
                  {t("footerDate", language)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
