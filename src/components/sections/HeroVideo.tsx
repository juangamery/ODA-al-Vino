"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const HERO_IMG = "/oda/gallery/Hero imagen fondo.webp";

export function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    /* Parallax suave en la foto de fondo */
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    /* Timeline de entrada — animación secuencial del hero */
    const tl = gsap.timeline({ delay: 0.3 });

    // 1. Logo aparece con fade + slide down
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // 2. Tagline SVG aparece con scale + fade
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.4"
      );
    }

    // 3. Subtítulo aparece con fade + slide up
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }

  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* Foto de fondo con parallax y tratamiento dreamy */}
      <div ref={imgRef} className="absolute inset-0 scale-110 photo-dreamy">
        <Image
          src={HERO_IMG}
          alt="ODA al Vino 2025"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-wine/20 via-transparent to-wine/40 pointer-events-none" />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-32 pb-32">
        {/* Marco ornamental SVG — tagline completo */}
        <div ref={taglineRef} className="w-full max-w-[500px] md:max-w-[560px] lg:max-w-[620px] opacity-0">
          <img
            src="/oda/Graphics/hero-tagline.svg"
            alt="4 y 5 de Septiembre — El Vino Nos Reúne — Iguazú, Argentina"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Subtítulo debajo del marco */}
        <p
          ref={subtitleRef}
          className="mt-6 text-center text-paper text-sm md:text-base lg:text-lg font-medium tracking-wide max-w-md opacity-0"
          style={{ textShadow: "0 2px 12px rgba(71,7,44,0.4)" }}
        >
          La experiencia de vino más importante de la Triple Frontera
        </p>
      </div>

    </section>
  );
}
