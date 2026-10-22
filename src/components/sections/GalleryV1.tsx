"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

interface Foto {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
}

// Selección editorial de la décima edición (8 a 12 fotos reales de OAV 2026).
const FOTOS: Foto[] = [
  { src: "/oda/gallery/oav26/oav26-degustacion-publico-barra.webp", alt: "Público degustando vinos en una de las barras de la décima edición de ODA Al Vino", ancho: 2000, alto: 1334 },
  { src: "/oda/gallery/oav26/oav26-brindis-el-esteco.webp", alt: "Dos visitantes brindan con vino tinto en el stand de El Esteco", ancho: 2000, alto: 1334 },
  { src: "/oda/gallery/oav26/oav26-charla-catena-zapata.webp", alt: "Charla sobre Catena Zapata: el orador muestra la ilustración de la etiqueta Birth of Cabernet", ancho: 2000, alto: 1334 },
  { src: "/oda/gallery/oav26/oav26-degustacion-guiada-rutini-charla.webp", alt: "Degustación guiada de Rutini Wines en una sala con estantes de madera", ancho: 2000, alto: 1334 },
  { src: "/oda/gallery/oav26/oav26-degustacion-guiada-rutini-servicio.webp", alt: "El presentador de Rutini Wines sirve vino a los participantes de la degustación guiada", ancho: 2000, alto: 1334 },
  { src: "/oda/gallery/oav26/oav26-photocall-el-vino-nos-reune.webp", alt: "Photocall «El vino nos reúne» de la décima edición, con bolas espejadas y carteles de neón", ancho: 1500, alto: 1000 },
  { src: "/oda/gallery/oav26/oav26-neon-oda-vinoteca-25-anos.webp", alt: "Cartel de neón de ODA Vinoteca y sus 25 años de aniversario", ancho: 1500, alto: 1000 },
];

const ARCHIVO_URL = "https://drive.google.com/drive/folders/1oaUiNLSvSgaieUWs3c15Ll8-m-ZXpn4G";

// Video institucional: completar cuando esté disponible. Mientras sea null no se muestra nada.
const VIDEO: { src: string; poster: string } | null = null;

export function GalleryV1() {
  const { language } = useLanguage();
  const [abierta, setAbierta] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (paso: number) => setAbierta((i) => (i === null ? i : (i + paso + FOTOS.length) % FOTOS.length)),
    []
  );

  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierta, cerrar, mover]);

  return (
    <section id="galeria" className="bg-paper py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24">
        <Reveal>
          <p className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.35em] font-bold mb-4">
            ✦ {t("finalEyebrow", language)} ✦
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] pt-[0.1em] uppercase text-wine mb-6 max-w-4xl">
            {t("galleryTitle", language)}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-wine/70 leading-relaxed max-w-2xl mb-14">{t("galleryText", language)}</p>
        </Reveal>

        {FOTOS.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
            {FOTOS.map((f, i) => (
              <li key={f.src} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <button
                  type="button"
                  onClick={() => setAbierta(i)}
                  className="group relative block w-full aspect-square overflow-hidden rounded-lg bg-wine/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-wine"
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        {VIDEO && (
          <div className="mb-16">
            <h3 className="font-serif text-3xl md:text-4xl uppercase text-wine mb-3">{t("galleryVideoTitle", language)}</h3>
            <p className="text-base text-wine/70 max-w-2xl mb-6">{t("galleryVideoText", language)}</p>
            <video
              controls
              playsInline
              preload="none"
              poster={VIDEO.poster}
              className="w-full max-w-5xl aspect-video rounded-lg bg-wine"
            >
              <source src={VIDEO.src} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Archivo fotográfico ampliado */}
        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-wine/15 pt-10">
            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl uppercase text-wine mb-2">{t("galleryArchiveTitle", language)}</h3>
              <p className="text-base text-wine/70 leading-relaxed">{t("galleryArchiveText", language)}</p>
            </div>
            <a
              href={ARCHIVO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="photo_archive_click"
              data-event-location="gallery_section"
              className="inline-block self-start md:self-auto rounded-full bg-wine px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-plum transition-colors whitespace-nowrap"
            >
              {t("galleryArchiveButton", language)} ↗
            </a>
          </div>
        </Reveal>
      </div>

      {abierta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={FOTOS[abierta].alt}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={cerrar}
        >
          <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={FOTOS[abierta].src} alt={FOTOS[abierta].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={cerrar} aria-label={t("galleryClose", language)} className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full bg-paper/15 hover:bg-paper/30 text-paper w-11 h-11 text-2xl leading-none">
            ×
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); mover(-1); }} aria-label={t("galleryPrev", language)} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-paper/15 hover:bg-paper/30 text-paper w-11 h-11 text-xl">
            ‹
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); mover(1); }} aria-label={t("galleryNext", language)} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-paper/15 hover:bg-paper/30 text-paper w-11 h-11 text-xl">
            ›
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-paper/70 text-sm">
            {abierta + 1} / {FOTOS.length}
          </p>
        </div>
      )}
    </section>
  );
}
