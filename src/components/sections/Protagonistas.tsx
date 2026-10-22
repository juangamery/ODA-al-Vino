"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

// Tarjetas oficiales de OAV 2026: nombre y bodega tal como figuran en cada pieza.
const PROTAGONISTAS: { foto: string; nombre: string; rol?: { es: string; pt: string }; bodega: string }[] = [
  { foto: "rafael-molina", nombre: "Rafael Molina", bodega: "Domingo Molina" },
  { foto: "pablo-sanchez", nombre: "Pablo Sanchez", bodega: "Lauri Viana" },
  { foto: "ramiro-barrillo", nombre: "Ramiro Barrillo", rol: { es: "Enólogo", pt: "Enólogo" }, bodega: "Diamandes" },
  { foto: "natalia-suarez", nombre: "Natalia Suarez", rol: { es: "Sommelier", pt: "Sommelier" }, bodega: "La Coste de los Andes" },
  { foto: "alicia-cruz", nombre: "Alicia Cruz", bodega: "Flechas de los Andes" },
];

const TEXTOS = {
  label: { es: "10ª Edición · ODA al Vino 2026", pt: "10ª Edição · ODA al Vino 2026" },
  titulo: { es: "Protagonistas de la décima edición.", pt: "Protagonistas da décima edição." },
  texto: {
    es: "Enólogos, sommeliers y referentes de bodegas que compartieron sus vinos y su conocimiento con nuestra comunidad.",
    pt: "Enólogos, sommeliers e referências de adegas que compartilharam seus vinhos e seu conhecimento com a nossa comunidade.",
  },
};

export function Protagonistas() {
  const { language } = useLanguage();
  const lang = language as "es" | "pt";

  return (
    <section id="protagonistas" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24">
        <Reveal>
          <p className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.35em] font-bold mb-4">
            ✦ {TEXTOS.label[lang]} ✦
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] pt-[0.1em] uppercase text-wine mb-6 max-w-4xl">
            {TEXTOS.titulo[lang]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-wine/70 leading-relaxed max-w-2xl mb-14">{TEXTOS.texto[lang]}</p>
        </Reveal>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {PROTAGONISTAS.map((p, i) => (
            <li key={p.foto}>
              <Reveal delay={(i % 5) * 0.08}>
                <figure>
                  <Image
                    src={`/oda/protagonistas/${p.foto}.webp`}
                    alt={`${p.nombre}${p.rol ? `, ${p.rol[lang]}` : ""} de ${p.bodega}`}
                    width={900}
                    height={1125}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="w-full h-auto rounded-lg"
                  />
                  <figcaption className="sr-only">
                    {p.nombre} — {p.rol ? `${p.rol[lang]}, ` : ""}{p.bodega}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
