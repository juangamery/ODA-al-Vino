"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "manifiesto", label: "Manifiesto" },
  { id: "experiencia", label: "Experiencia" },
  { id: "tickets", label: "Entradas" },
  { id: "iguazu", label: "Destino" },
];

export function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = height > 0 ? scrollTop / height : 0;
      setProgress(Math.min(Math.max(nextProgress, 0), 1));

      let current = "inicio";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:flex xl:items-center xl:gap-4">
      <div className="relative h-48 w-px overflow-hidden rounded-full bg-wine/12">
        <div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-plum via-wine to-harvest transition-transform duration-200"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <div className="flex flex-col gap-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={cn(
              "flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
              activeSection === section.id ? "bg-paper/90 shadow-lg" : "bg-paper/35"
            )}
          >
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em]",
                activeSection === section.id ? "text-wine" : "text-wine/50"
              )}
            >
              {`0${index + 1}`}
            </span>
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.24em]",
                activeSection === section.id ? "text-wine" : "text-wine/55"
              )}
            >
              {section.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
