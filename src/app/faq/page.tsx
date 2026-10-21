import type { Metadata } from 'next'
import Script from 'next/script'
import { LayoutClient } from "@/components/LayoutClient";
import FaqPage from "@/components/sections/FaqPage";
import { translations } from "@/lib/translations";
import { faqItems } from "@/lib/faq";

const TITLE = 'Preguntas frecuentes'
const DESCRIPTION =
  'Todo lo que necesitás saber sobre ODA Al Vino, su experiencia y sus próximas novedades: qué es, dónde se realiza, la décima edición 2026 y más.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.odaalvino.com.br/faq',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.odaalvino.com.br/faq',
    type: 'website',
    images: [
      {
        url: 'https://www.odaalvino.com.br/og-image-2026.jpg',
        width: 1200,
        height: 1200,
        alt: 'ODA Al Vino — Preguntas frecuentes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://www.odaalvino.com.br/og-image-2026.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ questionKey, answerKey }) => ({
    '@type': 'Question',
    name: translations.es[questionKey],
    acceptedAnswer: {
      '@type': 'Answer',
      text: translations.es[answerKey],
    },
  })),
}

export default function FAQ() {
  return (
    <>
      <LayoutClient>
        <FaqPage />
      </LayoutClient>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
