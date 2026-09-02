import type { Metadata } from "next";
import { ConsultarInscripcion } from "@/components/catas/ConsultarInscripcion";

export const metadata: Metadata = {
  title: "Consultá tu inscripción",
  robots: { index: false, follow: false },
};

export default function ConsultarInscripcionPage() {
  return <ConsultarInscripcion />;
}
