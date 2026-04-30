import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - ODA AL VINO 2026",
  description:
    "Respuestas a las preguntas frecuentes sobre ODA al Vino 2026. Información sobre entradas, experiencia, viajes a Iguazú y más.",
  alternates: {
    canonical: "https://odaalvino.com.br/faq",
    languages: {
      "pt-BR": "https://odaalvino.com.br/faq",
      "es-AR": "https://odaalvino.com.ar/faq",
      "x-default": "https://odaalvino.com.br/faq",
    },
  },
  openGraph: {
    title: "Preguntas Frecuentes - ODA AL VINO 2026",
    description:
      "Respuestas a las preguntas frecuentes sobre ODA al Vino 2026.",
    url: "https://odaalvino.com.br/faq",
    type: "website",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
