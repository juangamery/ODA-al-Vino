import CompliancePage from "@/components/sections/CompliancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos Legales | ODA AL VINO 2026",
  description: "Términos de Servicio, Política de Privacidad y Política de Cookies de ODA AL VINO 2026.",
};

export default function Page() {
  return <CompliancePage />;
}
