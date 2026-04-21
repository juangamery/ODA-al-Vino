"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function SealDivider() {
  const sealRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sealRef.current) return;

    // Animación de entrada con escala desde 0
    gsap.fromTo(
      sealRef.current,
      { opacity: 0, scale: 0.3, rotation: -20 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" }
    );

    // Flotación suave — movimiento vertical continuo
    gsap.to(sealRef.current, {
      y: -15,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.2
    });

    // Rotación lenta continua
    gsap.to(sealRef.current, {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
      delay: 1.2
    });
  }, []);

  return (
    <div className="relative w-full m-0 p-0 flex items-center justify-center overflow-visible z-20" style={{ marginTop: -110, marginBottom: -120 }}>
      <img
        ref={sealRef}
        src="/oda/brand/lacre_oav.svg"
        alt="Sello OAV"
        className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
        style={{
          filter: "drop-shadow(0 25px 50px rgba(122, 132, 25, 0.35))",
          willChange: "transform"
        }}
      />
    </div>
  );
}
