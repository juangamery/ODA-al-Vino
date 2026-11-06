import CompliancePage from "@/components/sections/CompliancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos legales",
  description: "Términos de Servicio, Política de Privacidad y Política de Cookies de ODA Al Vino.",
  alternates: { canonical: "https://www.odaalvino.com.br/compliance" },
};

export default function Page() {
  return <CompliancePage />;
}
