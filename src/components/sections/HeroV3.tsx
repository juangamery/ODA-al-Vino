"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const HERO_IMG = "/oda/gallery/Hero imagen fondo.webp";

export function HeroV3() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleARef = useRef<HTMLHeadingElement>(null);
  const titleScriptRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    /* Parallax suave en la foto de fondo */
    if (imgRef.current) {
      // Optimización: usar will-change para hardware acceleration
      imgRef.current.style.willChange = "transform";

      gsap.to(imgRef.current, {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5, // Cambio de true a 0.5 para mejor performance
        },
      });
    }

    /* Timeline de entrada */
    const tl = gsap.timeline({ delay: 0.1 }); // Reducido de 0.3 a 0.1

    /* Contenedor completo: oscilación pendular continua (SVG + texto) */
    if (containerRef.current) {
      /* Oscilación pendular sutil - todo se mueve junto */
      gsap.to(containerRef.current, {
        y: "+=8px",
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.2, // Reducido de 0.5 a 0.2
      });
    }

    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.4
      );
    }

    /* Título - contenedor */
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        0.6
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        1.1
      );
    }

  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen overflow-hidden flex flex-col bg-wine"
    >
      {/* Foto de fondo con parallax */}
      <div ref={imgRef} className="absolute inset-0 scale-110 photo-dreamy">
        <Image
          src={HERO_IMG}
          alt="ODA al Vino 2026"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay con difuminado wine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(112, 1, 67, 0.5) 0%, rgba(112, 1, 67, 0.15) 30%, rgba(112, 1, 67, 0.35) 70%, rgba(112, 1, 67, 0.85) 100%)",
        }}
      />

      {/* Contenedor con SVG al frente */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 md:px-6 pt-16 md:pt-32 pb-8 md:pb-16">
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl flex flex-col items-center justify-center"
          style={{
            minHeight: "auto",
            aspectRatio: "1 / 1.1",
            maxHeight: "clamp(280px, 60vh, 480px)",
          }}
        >
          {/* SVG del contenedor AL FRENTE */}
          <img
            ref={svgRef}
            src="/oda/Graphics/Contenedor de texto.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ zIndex: 2 }}
          />

          {/* Contenido texto dinámico DENTRO del contenedor */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-2xl px-4">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="text-wine/50 text-[8px] md:text-sm tracking-widest uppercase font-bold mb-3 md:mb-4 opacity-0"
          >
            {t("heroEyebrow", language)}
          </p>

          {/* Título dinámico - más armónico */}
          <div ref={titleRef} className="mb-0 opacity-0" style={{ marginTop: 'clamp(0px, 1vw, 35px)' }}>
            <h1
              ref={titleARef}
              className="font-serif uppercase text-wine mb-0 leading-[0.75]"
              style={{ fontSize: 'clamp(20px, 5vw, 96px)' }}
            >
              {t("heroTitleA", language)}
            </h1>
            <p
              ref={titleScriptRef}
              className="script normal-case italic text-wine leading-[0.85]"
              style={{ fontSize: 'clamp(32px, 9vw, 150px)' }}
            >
              {language === "es" ? (
                <>
                  <span className="script-ss01">R</span>eún<span className="script-ss01">e</span>
                </>
              ) : (
                <>
                  <span className="script-ss01">R</span>eún<span className="script-ss01">e</span>
                </>
              )}
            </p>
            <p className="lato-expanded text-wine font-bold tracking-widest mt-0 md:mt-4" style={{ fontSize: 'clamp(9px, 2vw, 14px)' }}>
              {t("heroYear", language)}
            </p>
          </div>
        </div>
      </div>

      {/* Subtítulo dinámico AFUERA del contenedor */}
      <div className="relative z-10 px-4 md:px-6 pt-3 md:pt-6 pb-0">
        <p
          ref={subtitleRef}
          className="text-center text-paper leading-snug md:leading-relaxed max-w-2xl mx-auto opacity-0"
          style={{ fontSize: 'clamp(13px, 3.2vw, 24px)' }}
        >
          {t("heroSubtitle", language)}
        </p>
      </div>

      </div>
    </section>
  );
}
