"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const GALLERY_IMAGES = [
  { src: "/oda/gallery/oav25/009A7064.webp", alt: "ODA al Vino 2026 — Bodegas y público" },
  { src: "/oda/gallery/oav25/009A7134.webp", alt: "ODA al Vino 2026 — Degustación" },
  { src: "/oda/gallery/oav25/009A7140.webp", alt: "ODA al Vino 2026 — Encuentros" },
  { src: "/oda/gallery/oav25/009A7272.webp", alt: "ODA al Vino 2026 — Charlas" },
  { src: "/oda/gallery/oav25/009A7373.webp", alt: "ODA al Vino 2026 — Experiencia" },
  { src: "/oda/gallery/oav25/0D0A7446.webp", alt: "ODA al Vino 2026 — Gastronomía" },
  { src: "/oda/gallery/oav25/0D0A7461.webp", alt: "ODA al Vino 2026 — Ambiente" },
  { src: "/oda/gallery/oav25/Conecta.webp", alt: "ODA al Vino 2026 — Comunidad" },
];

export function GalleryV1() {
  const { language } = useLanguage();

  return (
    <section id="galeria" className="bg-paper py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24">
        {/* Header */}
        <Reveal>
          <p className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.35em] font-bold mb-4">
            {language === "pt" ? "10ª Edição · Setembro 2026" : "10ª Edición · Septiembre 2026"}
          </p>
        </Reveal>

        <Reveal variant="clip" delay={0.15}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.88] uppercase text-wine mb-4">
            {language === "pt" ? "Assim vivemos" : "Así vivimos"}{" "}
            <span className="script normal-case italic text-[1.2em]">
              <span className="script-ss01">O</span>DA al Vino 2026
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="text-lg text-wine/65 max-w-2xl mb-16">
            {language === "pt"
              ? "Dez anos de histórias, descobertas e momentos compartilhados em torno do vinho argentino."
              : "Diez años de historias, descubrimientos y momentos compartidos alrededor del vino argentino."}
          </p>
        </Reveal>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.06}>
              <div
                className={`relative overflow-hidden rounded-lg bg-wine/10 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
