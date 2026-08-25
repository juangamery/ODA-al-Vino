import type { Metadata } from "next";
import { AdminPanel } from "@/components/catas/AdminPanel";

export const metadata: Metadata = {
  title: "Panel de administración · Inscripción a salas",
  robots: { index: false, follow: false },
};

export default function InscripcionAdminPage() {
  return <AdminPanel />;
}
