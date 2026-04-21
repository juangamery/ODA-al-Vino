'use client';

import { useRef, useState, useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import { useLanguage } from "@/context/LanguageContext";
import { t, Language } from "@/lib/translations";

interface Testimonial {
  text: string;
  author: string;
}

function getTestimonials(lang: Language): Testimonial[] {
  return [
    { text: t("testimonial1", lang), author: t("testimonial1Author", lang) },
    { text: t("testimonial2", lang), author: t("testimonial2Author", lang) },
    { text: t("testimonial3", lang), author: t("testimonial3Author", lang) },
    { text: t("testimonial4", lang), author: t("testimonial4Author", lang) },
    { text: t("testimonial5", lang), author: t("testimonial5Author", lang) },
    { text: t("testimonial6", lang), author: t("testimonial6Author", lang) },
    { text: t("testimonial7", lang), author: t("testimonial7Author", lang) },
  ];
}

const photos = [
  // OAV 2025
  "/oda/gallery/oav25/009A7272.webp",
  "/oda/gallery/oav25/009A7373.webp",
  "/oda/gallery/oav25/0D0A7461.webp",
  "/oda/gallery/oav25/009A7134.webp",
  "/oda/gallery/oav25/0D0A7446.webp",
  "/oda/gallery/oav25/009A7064.webp",
  "/oda/gallery/oav25/009A7140.webp",

  // OAV 2024
  "/oda/gallery/oav24/_HID9206.webp",
  "/oda/gallery/oav24/_HID9267.webp",
  "/oda/gallery/oav24/_HID8934.webp",
  "/oda/gallery/oav24/_HID9322.webp",
  "/oda/gallery/oav24/_HID0705.webp",
  "/oda/gallery/oav24/_HID8890.webp",

  // OAV 2023
  "/oda/gallery/oav23/_09A0147.webp",
  "/oda/gallery/oav23/_09A0080.webp",
  "/oda/gallery/oav23/_09A0640.webp",
  "/oda/gallery/oav23/_09A0339.webp",
  "/oda/gallery/oav23/_09A0021.webp",
  "/oda/gallery/oav23/_09A0216.webp",

  // Varias
  "/oda/gallery/Varias/Recurso 76@2x-100.webp",
  "/oda/gallery/Varias/Recurso 77@2x-100.webp",
  "/oda/gallery/Varias/Recurso 78@2x-100.webp",
  "/oda/gallery/Varias/Recurso 79@2x-100.webp",
  "/oda/gallery/Varias/Recurso 80@2x-100.webp",
  "/oda/gallery/Varias/Recurso 81@2x-100.webp",
  "/oda/gallery/Varias/Recurso 82@2x-100.webp",
  "/oda/gallery/Varias/Recurso 18@2x-100.webp",
  "/oda/gallery/Varias/Recurso 19@2x-100.webp",
  "/oda/gallery/Varias/Recurso 20@2x-100.webp",
  "/oda/gallery/Varias/Recurso 21@2x-100.webp",
];

export function Community() {
  const { language } = useLanguage();
  const testimonials = getTestimonials(language);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const [showAdvanceButton, setShowAdvanceButton] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // No need for additional event listeners - InfiniteGallery handles its own interactions

  // Rotate testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleAdvance = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowAdvanceButton(false);
  };

  const handleVolver = () => {
    const ticketsSection = document.getElementById('entradas');
    ticketsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="comunidad" className="bg-wine overflow-visible relative">
      {/* Patrón de fondo — fondovioleta2 */}
      <img
        src="/oda/Graphics/fondovioleta2.svg"
        alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none select-none mix-blend-screen"
      />

      {/* Header */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-24 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <Reveal variant="clip">
          <h2 className="font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.88] uppercase text-paper">
            Una experiencia<br />
            que <span className="script normal-case italic text-paper text-[1.25em]"><span className="script-ss01">S</span>e comparte</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lato-expanded text-[10px] text-paper/35 md:text-right">
            05 — Comunidad
          </p>
        </Reveal>
      </div>

      {/* Galería 3D Interactiva con Overlay */}
      <Reveal>
        <div className="relative">
          {/* Texto "10 AÑOS" al frente */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <h3 className="font-serif text-[clamp(4rem,12vw,8rem)] uppercase text-paper/40 leading-none text-center">
              10 <span className="script normal-case italic text-paper/30 text-[0.6em] block"><span className="script-ss01">A</span>ños</span>
            </h3>
          </div>

          {/* Indicaciones al pie */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
            <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-6 text-center">
              <p className="lato-expanded text-[10px] text-paper/50 uppercase tracking-widest mb-1">
                Rueda del ratón, flechas o toque para navegar
              </p>
              <p className="lato-expanded text-[10px] text-paper/40 uppercase tracking-widest">
                Reproducción automática después de 3 segundos
              </p>
            </div>
          </div>

          {/* Galería */}
          <InfiniteGallery
            images={photos}
            speed={1.2}
            zSpacing={3}
            visibleCount={12}
            falloff={{ near: 0.8, far: 14 }}
            className="h-[500px] md:h-[600px] w-full overflow-hidden"
            fadeSettings={{
              fadeIn: { start: 0.05, end: 0.25 },
              fadeOut: { start: 0.75, end: 0.95 },
            }}
            blurSettings={{
              blurIn: { start: 0.0, end: 0.1 },
              blurOut: { start: 0.75, end: 0.95 },
              maxBlur: 5.0,
            }}
          />
        </div>
      </Reveal>


      {/* Cita con rotación */}
      <Reveal delay={0.4}>
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-20 md:py-28" ref={nextSectionRef}>
          <div className="relative max-w-4xl mx-auto text-center">
            <blockquote
              className="relative font-serif text-[clamp(2rem,4vw,4rem)] uppercase text-paper leading-tight transition-opacity duration-500"
              style={{ opacity: 1 }}
            >
              {testimonials[currentTestimonial].text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </blockquote>
            <p className="lato-expanded relative mt-6 text-[10px] text-harvest uppercase tracking-widest">
              — {testimonials[currentTestimonial].author}
            </p>

            {/* Controlador de puntos */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentTestimonial
                      ? "bg-paper w-8 h-2"
                      : "bg-paper/40 w-2 h-2 hover:bg-paper/60"
                  }`}
                  aria-label={`Testimonio ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
