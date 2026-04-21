"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!rootRef.current || !mediaRef.current || !panelRef.current || !statRef.current || !haloRef.current) {
      return;
    }

    gsap.to(mediaRef.current, {
      yPercent: -10,
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(panelRef.current, {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(statRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(haloRef.current, {
      rotate: 18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto aspect-[4/5] max-w-[34rem]">
      <div ref={panelRef} className="absolute -left-6 top-8 hidden h-[72%] w-[34%] rounded-[2rem] border border-wine/12 bg-paper/70 shadow-xl backdrop-blur-sm md:block" />
      <div ref={statRef} className="absolute -right-6 bottom-10 hidden h-[30%] w-[38%] rounded-[2rem] border border-paper/60 bg-plum/95 shadow-2xl md:flex md:flex-col md:justify-between md:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper/60">
          OAV26
        </p>
        <div>
          <p className="text-4xl font-serif text-paper">+100</p>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-paper/65">
            bodegas invitadas
          </p>
        </div>
      </div>

      <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] border border-paper/70 bg-wine/10 shadow-[0_30px_100px_rgba(71,7,44,0.18)]">
        <div ref={mediaRef} className="absolute inset-0">
          <Image
            src="/oda/gallery/oav25/009A7373.webp"
                    sizes="(max-width: 1024px) 100vw, 50vw"
            alt="ODA AL VINO 2025"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-wine/38 via-transparent to-paper/10 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="rounded-[1.8rem] border border-paper/25 bg-wine/72 p-5 text-paper backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-paper/65">
              Edición aniversario
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/88">
              Degustaciones, gastronomía y encuentros con la curaduría de ODA en una nueva puesta más inmersiva.
            </p>
          </div>
        </div>
      </div>

      <div ref={haloRef} className="absolute -top-10 -right-10 h-40 w-40 opacity-20 pointer-events-none">
        <div className="h-full w-full rounded-full border-2 border-wine animate-float" />
      </div>
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-plum/10 blur-xl animate-pulse" />
    </div>
  );
}
