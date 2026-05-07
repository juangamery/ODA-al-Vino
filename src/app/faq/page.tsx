import type { Metadata } from 'next'
import Script from 'next/script'
import { LayoutClient } from "@/components/LayoutClient";
import FaqPage from "@/components/sections/FaqPage";

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | ODA AL VINO 2026 en Iguazú',
  description:
    'Todo lo que necesitás saber sobre ODA al Vino 2026 en Iguazú: cómo comprar entradas, qué incluye la experiencia, alojamiento y más. Resolvé tus dudas aquí.',
  alternates: {
    canonical: 'https://odaalvino.com.br/faq',
    languages: {
      'pt-BR': 'https://odaalvino.com.br/faq',
      'es-AR': 'https://odaalvino.com.ar/faq',
      'x-default': 'https://odaalvino.com.br/faq',
    },
  },
  openGraph: {
    title: 'Preguntas Frecuentes | ODA AL VINO 2026 en Iguazú',
    description:
      'Todo lo que necesitás saber sobre ODA al Vino 2026 en Iguazú: cómo comprar entradas, qué incluye la experiencia, alojamiento y más.',
    url: 'https://odaalvino.com.br/faq',
    type: 'website',
    images: [
      {
        url: 'https://odaalvino.com.br/og-image-2026.jpg',
        width: 1200,
        height: 1200,
        alt: 'ODA AL VINO 2026 — Preguntas Frecuentes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes | ODA AL VINO 2026 en Iguazú',
    description:
      'Todo lo que necesitás saber sobre ODA al Vino 2026 en Iguazú: cómo comprar entradas, qué incluye la experiencia, alojamiento y más.',
    images: ['https://odaalvino.com.br/og-image-2026.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es ODA al Vino?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ODA al Vino es la principal experiencia del vino en la Triple Frontera. Un encuentro donde más de 200 bodegas argentinas presentan sus vinos en un entorno diseñado para descubrir, aprender y disfrutar. En su 10ª edición, el evento celebra además los 25 años de trayectoria de ODA Vinoteca.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuándo es el evento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ODA al Vino 2026 se realiza los días 4 y 5 de septiembre.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde se realiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En Iguazú, Argentina, en el corazón de la Triple Frontera, con acceso directo desde Brasil, Paraguay y Argentina.',
      },
    },
    {
      '@type': 'Question',
      name: '¿A quién está dirigido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ODA al Vino es para quienes quieren disfrutar y entender el vino: amantes del vino, turistas, profesionales del sector y personas curiosas que desean aprender. No es necesario tener experiencia previa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el precio de las entradas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los precios se organizan por etapas (lotes). El valor inicial comienza desde R$ 630 y aumenta progresivamente a medida que se acerca el evento. Recomendamos asegurar tu lugar con anticipación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hay descuentos disponibles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El mejor valor está disponible en las primeras etapas de venta. También existen condiciones especiales para residentes de Misiones y promociones puntuales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye la entrada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada entrada incluye acceso al evento, copa de cristal modelo AFNOR, degustaciones ilimitadas, acceso a charlas y masterclasses y un vale de consumo para ODA Vinoteca y ODA Duty Free.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo comprar entradas el mismo día?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, sujeto a disponibilidad. El evento tiene capacidad limitada, por lo que recomendamos comprar anticipadamente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué bodegas participan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Más de 200 bodegas de las principales regiones vitivinícolas de Argentina, desde productores históricos hasta proyectos boutique, con una selección curada que garantiza calidad y diversidad.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hay actividades además de degustaciones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El evento incluye masterclasses, charlas, experiencias gastronómicas y encuentros con productores. ODA al Vino combina disfrute con aprendizaje.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo ir si es mi primer evento de vino?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. ODA al Vino está pensado para acompañarte, no para exigirte conocimiento. Podés venir a aprender, descubrir y disfrutar a tu ritmo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo llego a Iguazú?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Iguazú cuenta con aeropuerto internacional y acceso por ruta desde Argentina, Brasil y Paraguay.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde puedo hospedarme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hay opciones para todos los perfiles, desde hoteles hasta posadas. Recomendamos reservar con anticipación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué puedo hacer además del evento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podés visitar las Cataratas del Iguazú, el Parque Nacional y recorrer la Triple Frontera. Es un destino ideal para combinar turismo y experiencia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la mejor época para visitar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Septiembre es ideal, con clima agradable y condiciones perfectas para disfrutar del evento y el destino.',
      },
    },
  ],
}

export default function FAQ() {
  return (
    <>
      <h1>Preguntas Frecuentes — ODA AL VINO 2026</h1>
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
