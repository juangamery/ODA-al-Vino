"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { Reveal } from "@/components/motion/Reveal";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { faqItems } from "@/lib/faq";

export default function FaqPage() {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

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
              {t("faqPageTitle", language) || "Preguntas Frecuentes"}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-center text-paper/75 max-w-2xl mx-auto">
              {t("faqPageSubtitle", language) || "Todo lo que necesitas saber sobre ODA al Vino 2026"}
            </p>
          </Reveal>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-4xl px-8 md:px-16 lg:px-24 py-20">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Reveal key={item.id} delay={0.05 * (index % 5)}>
              <div
                className="border border-wine/20 rounded-lg overflow-hidden hover:border-wine/40 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between hover:bg-wine/5 transition-colors text-left"
                >
                  <span className="font-serif font-bold text-wine text-lg md:text-xl lg:text-2xl">
                    {t(item.questionKey, language)}
                  </span>
                  <span
                    className={`text-wine text-2xl transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openId === item.id ? "rotate-180" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 md:px-8 bg-wine/2 border-t border-wine/10">
                    <p className="text-wine/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {t(item.answerKey, language)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-wine/5 border-t border-wine/10 py-12">
        <div className="mx-auto max-w-4xl px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href="/"
              className="text-wine font-bold hover:text-wine/80 transition-colors"
            >
              ← Volver al inicio
            </Link>

            <div className="flex gap-6">
              <a
                href="/compliance"
                className="text-wine/60 text-sm hover:text-wine transition-colors"
              >
                Términos Legales
              </a>
              <span className="text-wine/20">•</span>
              <span className="text-wine/60 text-sm">
                {t("footerDate", language)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: t(item.questionKey, language),
              acceptedAnswer: {
                "@type": "Answer",
                text: t(item.answerKey, language),
              },
            })),
          }),
        }}
      />
    </main>
    </>
  );
}
