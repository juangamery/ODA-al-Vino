"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { Reveal } from "@/components/motion/Reveal";
import { FloatingHeader } from "@/components/layout/FloatingHeader";

export default function CompliancePage() {
  const { language } = useLanguage();

  return (
    <>
      <FloatingHeader />
      <main className="min-h-screen bg-paper">
        {/* Header */}
        <div className="bg-wine py-16 md:py-24 relative overflow-hidden">
          {/* Decorative illustration */}
          <Reveal direction="left" delay={0.2}>
            <img
              src="/oda/Graphics/Recurso 13.svg"
              alt=""
              aria-hidden
              className="absolute -right-32 -top-16 md:-right-24 md:-top-8 w-96 h-auto opacity-20 pointer-events-none"
            />
          </Reveal>

          <div className="mx-auto max-w-6xl px-8 md:px-16 lg:px-24 relative z-10">
            <Reveal>
              <div className="flex items-center justify-center gap-4 mb-6">
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
