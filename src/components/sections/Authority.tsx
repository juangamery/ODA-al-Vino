"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { t, Language } from "@/lib/translations";

interface Stat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  sub: string;
}

function getStats(lang: Language): Stat[] {
  return [
    { value: 200, prefix: "+", suffix: "", label: t("authorityBodegas", lang), sub: t("authorityBodegasSub", lang) },
    { value: 700, prefix: "+", suffix: "", label: t("authorityEtiquetas", lang), sub: t("authorityEtiquetasSub", lang) },
    { value: 10, prefix: "", suffix: "", label: t("authorityYears", lang), sub: t("authorityYearsSub", lang) },
    { value: 2000, prefix: "+", suffix: "", label: t("authorityAsistentes", lang), sub: t("authorityAsistentesSub", lang) },
  ];
}

function CounterNumber({ target, prefix = "", suffix = "", trigger = true }: { target: number; prefix?: string; suffix?: string; trigger?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let animationId: number | null = null;
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds animation

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= duration) {
        setCount(target);
      } else {
        const progress = elapsed / duration;
        const currentValue = Math.floor(target * progress);
        setCount(currentValue);
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [target, trigger]);

  return (
    <>{prefix}{count.toLocaleString()}{suffix}</>
  );
}

export function Authority() {
  const { language } = useLanguage();
  const stats = getStats(language);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="autoridad" ref={sectionRef} className="bg-olive overflow-hidden relative">
      {/* Patrón de fondo — fondoverde, oficial para fondos oliva */}
      <img
        src="/oda/Graphics/fondoverde.svg"
        alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none select-none mix-blend-screen"
      />

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-28 md:py-40">

        {/* Stats grid */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 divide-x divide-paper/20">
            {stats.map((s, i) => (
              <Reveal key={s.label} variant="clip" delay={i * 0.1}>
                <div className="flex flex-col">
                  <p className="font-serif text-[clamp(4rem,8vw,9rem)] leading-none text-paper tracking-tighter">
                    <CounterNumber target={s.value} prefix={s.prefix} suffix={s.suffix} trigger={hasAnimated} />
                  </p>
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl uppercase text-paper/85 mt-4 md:mt-6 leading-tight">
                    {s.label}
                  </p>
                  <p className="lato-expanded text-[10px] text-paper/45 mt-3 md:mt-4 leading-relaxed">
                    {s.sub}
                  </p>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
