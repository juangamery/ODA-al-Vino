import type { Metadata } from "next";
import { CatasForm } from "@/components/catas/CatasForm";

export const metadata: Metadata = {
  title: "Inscripción a salas de degustación",
  robots: { index: false, follow: false },
};

export default function InscripcionPage() {
  return <CatasForm />;
}
