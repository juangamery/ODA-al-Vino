"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { Reveal } from "@/components/motion/Reveal";

interface FAQItem {
  id: number;
  questionKey: "faqQuestion1" | "faqQuestion2" | "faqQuestion3" | "faqQuestion4" | "faqQuestion5" | "faqQuestion6" | "faqQuestion7" | "faqQuestion8" | "faqQuestion9" | "faqQuestion10" | "faqQuestion11" | "faqQuestion12" | "faqQuestion13" | "faqQuestion14" | "faqQuestion15" | "faqQuestion16" | "faqQuestion17" | "faqQuestion18" | "faqQuestion19" | "faqQuestion20";
  answerKey: "faqAnswer1" | "faqAnswer2" | "faqAnswer3" | "faqAnswer4" | "faqAnswer5" | "faqAnswer6" | "faqAnswer7" | "faqAnswer8" | "faqAnswer9" | "faqAnswer10" | "faqAnswer11" | "faqAnswer12" | "faqAnswer13" | "faqAnswer14" | "faqAnswer15" | "faqAnswer16" | "faqAnswer17" | "faqAnswer18" | "faqAnswer19" | "faqAnswer20";
}

const faqItems: FAQItem[] = [
  // Block 1: General Event Info
  { id: 1, questionKey: "faqQuestion1", answerKey: "faqAnswer1" },
  { id: 2, questionKey: "faqQuestion2", answerKey: "faqAnswer2" },
  { id: 3, questionKey: "faqQuestion3", answerKey: "faqAnswer3" },
  { id: 4, questionKey: "faqQuestion4", answerKey: "faqAnswer4" },
  // Block 2: Tickets & Pricing
  { id: 5, questionKey: "faqQuestion5", answerKey: "faqAnswer5" },
  { id: 6, questionKey: "faqQuestion6", answerKey: "faqAnswer6" },
  { id: 7, questionKey: "faqQuestion7", answerKey: "faqAnswer7" },
  { id: 8, questionKey: "faqQuestion8", answerKey: "faqAnswer8" },
  // Block 3: Experience & Activities
  { id: 9, questionKey: "faqQuestion9", answerKey: "faqAnswer9" },
  { id: 10, questionKey: "faqQuestion10", answerKey: "faqAnswer10" },
  { id: 11, questionKey: "faqQuestion11", answerKey: "faqAnswer11" },
  { id: 12, questionKey: "faqQuestion12", answerKey: "faqAnswer12" },
  // Block 4: Travel to Iguazú
  { id: 13, questionKey: "faqQuestion13", answerKey: "faqAnswer13" },
  { id: 14, questionKey: "faqQuestion14", answerKey: "faqAnswer14" },
  { id: 15, questionKey: "faqQuestion15", answerKey: "faqAnswer15" },
  { id: 16, questionKey: "faqQuestion16", answerKey: "faqAnswer16" },
  // Block 5: Logistics & Practical
  { id: 17, questionKey: "faqQuestion17", answerKey: "faqAnswer17" },
  { id: 18, questionKey: "faqQuestion18", answerKey: "faqAnswer18" },
  { id: 19, questionKey: "faqQuestion19", answerKey: "faqAnswer19" },
  { id: 20, questionKey: "faqQuestion20", answerKey: "faqAnswer20" },
];

export default function FaqPage() {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-wine py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
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
                  <span className="font-serif font-bold text-wine text-base md:text-lg">
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
                href="/politicas-privacidad.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wine/60 text-sm hover:text-wine transition-colors"
              >
                Políticas de Privacidad
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
  );
}
