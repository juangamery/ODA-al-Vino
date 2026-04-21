"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  /** "clip" = slide up through clip-path (estilo Aupale), "fade" = fade+translate clásico */
  variant?: "clip" | "fade";
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.9,
  threshold = 0.12,
  variant = "fade",
}: RevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (variant === "clip") {
      /* Slide-up a través de clip-path — igual a Aupale */
      gsap.fromTo(
        innerRef.current,
        {
          yPercent: 105,
          skewY: 3,
        },
        {
          yPercent: 0,
          skewY: 0,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      const directions = {
        up: { y: 48, x: 0 },
        down: { y: -48, x: 0 },
        left: { x: 48, y: 0 },
        right: { x: -48, y: 0 },
      };

      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, ...directions[direction] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [direction, delay, duration, threshold, variant]);

  if (variant === "clip") {
    return (
      /* overflow:hidden actúa como la "máscara" del clip */
      <div ref={wrapRef} className={cn("overflow-hidden", className)}>
        <div ref={innerRef}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
