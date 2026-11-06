import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { FooterV3 } from "@/components/sections/FooterV3";
import { HistoriaCard } from "@/components/historias/HistoriaCard";
import { historiasEnIdioma, historiasOrdenadas } from "@/lib/historias";

const DESCRIPTION =
  "Un espacio para seguir descubriendo todo lo que sucede alrededor de ODA Al Vino. Encuentros, protagonistas, experiencias y contenidos que forman parte de nuestra historia.";

export const metadata: Metadata = {
  title: "Historias de ODA Al Vino",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.odaalvino.com.br/historias" },
  openGraph: {
    title: "Historias de ODA Al Vino",
    description: DESCRIPTION,
    url: "https://www.odaalvino.com.br/historias",
    type: "website",
  },
};

export default function HistoriasPage() {
  if (historiasOrdenadas.length === 0) notFound();
  const lista = historiasEnIdioma("es");

  return (
    <>
      <FloatingHeader />
      <main className="bg-paper text-wine min-h-screen">
        <header className="bg-wine pt-48 md:pt-40 pb-16 md:pb-24 px-8 md:px-16 lg:px-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] uppercase text-paper mb-6">
              Historias de ODA Al Vino
            </h1>
            <p className="text-lg text-paper/75 leading-relaxed max-w-2xl mx-auto">{DESCRIPTION}</p>
          </div>
        </header>

        <section className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <HistoriaCard historia={lista[0]} destacada />
          {lista.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mt-20 pt-16 border-t border-wine/10">
              {lista.slice(1).map((h) => (
                <HistoriaCard key={h.slug} historia={h} />
              ))}
            </div>
          )}
        </section>
      </main>
      <FooterV3 />
    </>
  );
}
