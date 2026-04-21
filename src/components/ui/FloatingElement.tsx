"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

type Effect =
  | "parallax"       // sube más lento que el scroll — profundidad
  | "rotate-in"      // entra rotando desde un ángulo
  | "pop"            // escala desde 0 con bounce
  | "drift-left"     // se mueve hacia la izquierda con el scroll
  | "drift-right"    // se mueve hacia la derecha con el scroll
  | "fall-in";       // cae desde arriba

interface FloatingElementProps {
  src: string;
  alt?: string;
  className?: string;
  effect?: Effect;
  delay?: number;
  parallaxStrength?: number; // cuántos px se mueve en parallax
  rotate?: number;           // rotación inicial para rotate-in
  float?: boolean;           // agrega CSS float animation
}

export function FloatingElement({
  src,
  alt = "",
  className = "",
  effect = "parallax",
  delay = 0,
  parallaxStrength = 60,
  rotate = 12,
  float = false,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (effect === "parallax") {
      // Aparece con fade, luego hace parallax
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    if (effect === "rotate-in") {
      gsap.fromTo(el,
        { opacity: 0, rotate, scale: 0.7, y: 40 },
        {
          opacity: 1, rotate: 0, scale: 1, y: 0,
          duration: 1.4, delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }

    if (effect === "pop") {
      gsap.fromTo(el,
        { opacity: 0, scale: 0, rotate: -8 },
        {
          opacity: 1, scale: 1, rotate: 0,
          duration: 1, delay,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    if (effect === "drift-left") {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1.2, delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    if (effect === "drift-right") {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.2, delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    if (effect === "fall-in") {
      gsap.fromTo(el,
        { opacity: 0, y: -80, rotate: -15 },
        {
          opacity: 1, y: 0, rotate: 0,
          duration: 1.6, delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    }
  }, [effect, delay, parallaxStrength, rotate]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none absolute opacity-0",
        float && "animate-float",
        className
      )}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" loading="lazy" />
    </div>
  );
}
