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
    { value: 105, prefix: "", suffix: "", label: t("authorityBodegas", lang), sub: t("authorityBodegasSub", lang) },
    { value: 500, prefix: "+", suffix: "", label: t("authorityEtiquetas", lang), sub: t("authorityEtiquetasSub", lang) },
    { value: 10, prefix: "", suffix: "", label: t("authorityYears", lang), sub: t("authorityYearsSub", lang) },
    { value: 370, prefix: "", suffix: "", label: t("authorityAsistentes", lang), sub: t("authorityAsistentesSub", lang) },
  ];
}

function CounterNumber({ target, prefix = "", suffix = "", trigger = true }: { target: number; prefix?: string; suffix?: string; trigger?: boolean }) {
  const [count, setCount] = useState(target); // Start at target for SSR/SEO
  const animationStarted = useRef(false);

  useEffect(() => {
    if (!trigger || animationStarted.current) return;
    animationStarted.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCount(0);
    let animationId: number | null = null;
    const startTime = Date.now();
    const duration = 1800;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        setCount(target);
      } else {
        setCount(Math.floor(target * (elapsed / duration)));
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
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

        <Reveal>
          <p className="lato-expanded text-[10px] text-paper/55 uppercase tracking-[0.35em] font-bold mb-4">
            ✦ {t("authoritySubtitle", language)} ✦
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] pt-[0.1em] uppercase text-paper mb-16 md:mb-24 max-w-4xl">
            {t("authorityTitle", language)}
          </h2>
        </Reveal>

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
