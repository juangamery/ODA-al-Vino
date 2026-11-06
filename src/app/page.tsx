import type { Metadata } from 'next'
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
import { GalleryV1 } from "@/components/sections/GalleryV1";
import { Sponsors } from "@/components/sections/Sponsors";
import { Protagonistas } from "@/components/sections/Protagonistas";
import { HistoriasHome } from "@/components/sections/HistoriasHome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Marquee } from "@/components/ui/Marquee";

const HOME_TITLE = 'ODA Al Vino | El vino nos reúne en la Triple Frontera'
const HOME_DESCRIPTION =
  'Conocé ODA Al Vino, el encuentro dedicado al vino argentino en Puerto Iguazú. Reviví su décima edición, descubrí experiencias, bodegas e historias.'

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: 'https://www.odaalvino.com.br',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://www.odaalvino.com.br',
    type: 'website',
    images: [
      {
        url: 'https://www.odaalvino.com.br/og-image-2026.jpg',
        width: 1200,
        height: 1200,
        alt: 'ODA Al Vino — 10ª edición 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['https://www.odaalvino.com.br/og-image-2026.jpg'],
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
    'La décima edición de ODA al Vino reunió 105 bodegas argentinas en Puerto Iguazú. Más de 500 etiquetas, masterclasses, gastronomía y 370 personas en charlas y degustaciones.',
  startDate: '2026-09-04T15:00:00-03:00',
  endDate: '2026-09-05T20:00:00-03:00',
  eventStatus: 'https://schema.org/EventCompleted',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Iguazú Urban Mall, Puerto Iguazú',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Puerto Iguazú',
      addressRegion: 'Misiones',
      addressCountry: 'AR',
    },
  },
  image: 'https://www.odaalvino.com.br/og-image-2026.jpg',
  organizer: {
    '@type': 'Organization',
    name: 'ODA Vinoteca',
    url: 'https://www.odaalvino.com.br',
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
        ODA Al Vino — El vino nos reúne en la Triple Frontera
      </h1>
      <FloatingHeader />
      <WhatsAppButton />

      {/* ── Secciones ── */}
      <HeroV3 />

      <SealDivider />

      <ManifestoV3 />

      <Marquee
        text="ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE 2026 · EL VINO NOS REÚNE · ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE 2026 · EL VINO NOS REÚNE ·"
        variant="dark"
      />

      <ExperienceV3 />

      <Marquee
        text="105 BODEGAS · +500 ETIQUETAS · 10 AÑOS · TRIPLE FRONTERA · ODA AL VINO 2026 ·"
        variant="harvest"
        speed={35}
      />

      <Authority />

      <Tickets />

      <Protagonistas />

      <BodegasV3 />

      <Sponsors />

      <GalleryV1 />

      <Marquee
        text="ODA AL VINO · 4 Y 5 DE SEPTIEMBRE 2026 · IGUAZÚ · ARGENTINA · 10° EDICIÓN ·"
        variant="dark"
        speed={38}
      />

      <Community />

      <Iguazu />

      <HistoriasHome />

      <FinalV3 />

      <FooterV3 />

      <script id="schema-event" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c") }} />
    </main>
  );
}
