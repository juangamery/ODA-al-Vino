import type { Metadata } from "next";
import { CatasForm } from "@/components/catas/CatasForm";

const TITLE = "Inscripción a salas de degustación · ODA al Vino 2026";
const DESCRIPTION = "Elegí tus catas para el 4 y 5 de septiembre en Iguazú.";
const OG_IMAGE = "https://www.odaalvino.com.br/og-image-2026.jpg";

export const metadata: Metadata = {
  title: "Inscripción a salas de degustación",
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 1200, alt: "ODA AL VINO 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function InscripcionPage() {
  return <CatasForm />;
}
