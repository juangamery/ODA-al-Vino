import type { Metadata } from 'next'
import Script from 'next/script'
import dynamic from "next/dynamic";
import { Authority } from "@/components/sections/Authority";
import { ExperienceV3 } from "@/components/sections/ExperienceV3";
import { FinalV3 } from "@/components/sections/FinalV3";
import { FooterV3 } from "@/components/sections/FooterV3";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { HeroV3 } from "@/components/sections/HeroV3";
import { ManifestoV3 } from "@/components/sections/ManifestoV3";
import { SealDivider } from "@/components/sections/SealDivider";
import { Tickets } from "@/components/sections/Tickets";
import { VenueV3 } from "@/components/sections/VenueV3";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: 'ODA AL VINO 2026 | Festival de Vinos en Iguazú - Triple Frontera',
  description:
    'El evento de vinos más importante de la Triple Frontera vuelve en 2026. 10ª edición en Iguazú: catas, bodegas, gastronomía y experiencias únicas. ¡Comprá tu entrada!',
  alternates: {
    canonical: 'https://odaalvino.com.br',
    languages: {
      'pt-BR': 'https://odaalvino.com.br',
      'es-AR': 'https://odaalvino.com.ar',
      'x-default': 'https://odaalvino.com.br',
    },
  },
  openGraph: {
    title: 'ODA AL VINO 2026 | Festival de Vinos en Iguazú - Triple Frontera',
    description:
      'El evento de vinos más importante de la Triple Frontera vuelve en 2026. 10ª edición en Iguazú: catas, bodegas, gastronomía y experiencias únicas. ¡Comprá tu entrada!',
    url: 'https://odaalvino.com.br',
    type: 'website',
    images: [
      {
        url: 'https://odaalvino.com.br/og-image-2026.jpg',
        width: 1200,
        height: 1200,
        alt: 'ODA AL VINO 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ODA AL VINO 2026 | Festival de Vinos en Iguazú - Triple Frontera',
    description:
      'El evento de vinos más importante de la Triple Frontera vuelve en 2026. 10ª edición en Iguazú: catas, bodegas, gastronomía y experiencias únicas.',
    images: ['https://odaalvino.com.br/og-image-2026.jpg'],
  },
}

// Lazy load secciones no críticas
const BodegasV3 = dynamic(() => import("@/components/sections/BodegasV3").then(mod => ({ default: mod.BodegasV3 })), {
  loading: () => <div className="h-64" />,
});

const Community = dynamic(() => import("@/components/sections/Community").then(mod => ({ default: mod.Community })), {
  loading: () => <div className="h-64" />,
});

const Iguazu = dynamic(() => import("@/components/sections/Iguazu").then(mod => ({ default: mod.Iguazu })), {
  loading: () => <div className="h-96" />,
});

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'ODA AL VINO 2026 — 10ª Edición',
  description:
    'La experiencia de vinos más importante de la Triple Frontera. Más de 200 bodegas argentinas, masterclasses, gastronomía y encuentros con productores.',
  startDate: '2026-09-04T12:00:00-03:00',
  endDate: '2026-09-05T22:00:00-03:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Iguazú, Misiones',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Puerto Iguazú',
      addressRegion: 'Misiones',
      addressCountry: 'AR',
    },
  },
  image: 'https://odaalvino.com.br/og-image-2026.jpg',
  organizer: {
    '@type': 'Organization',
    name: 'ODA Vinoteca',
    url: 'https://odaalvino.com.br',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://odaalvino.com.br/#entradas',
    priceCurrency: 'BRL',
    price: '630',
    priceValidUntil: '2026-09-04',
    availability: 'https://schema.org/InStock',
    validFrom: '2025-01-01',
  },
  performer: {
    '@type': 'Organization',
    name: 'Bodegas Argentinas',
  },
}

export default function Home() {
  return (
    <main className="bg-paper text-wine">
      <h1 className="sr-only">
        ODA AL VINO 2026 — Festival de Vinos en Iguazú, Triple Frontera
      </h1>
      <FloatingHeader />
      <WhatsAppButton />

      {/* ── Secciones ── */}
      <HeroV3 />

      <SealDivider />

      <ManifestoV3 />

      <Marquee
        text="ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE · EL VINO NOS REÚNE · ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE · EL VINO NOS REÚNE ·"
        variant="dark"
      />

      <ExperienceV3 />

      <Marquee
        text="+100 BODEGAS · +700 ETIQUETAS · 10 AÑOS · +2000 ASISTENTES · TRIPLE FRONTERA ·"
        variant="harvest"
        speed={35}
      />

      <Authority />

      <Tickets />

      <BodegasV3 />

      <VenueV3 />

      <Marquee
        text="ODA AL VINO · 4 Y 5 SEPTIEMBRE · IGUAZÚ · ARGENTINA · 10° EDICIÓN ·"
        variant="dark"
        speed={38}
      />

      <Community />

      <Iguazu />

      <FinalV3 />

      <FooterV3 />

      <Script
        id="schema-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
    </main>
  );
}
