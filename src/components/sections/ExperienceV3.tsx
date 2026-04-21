"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t, Language } from "@/lib/translations";

interface ExperienceItem {
  id: number;
  title: string;
  text: string;
  images: string[];
}

function getExperienceItems(language: Language): ExperienceItem[] {
  return [
    {
      id: 0,
      title: t("experienceItem1Title", language),
      text: t("experienceItem1Text", language),
      images: [
        "/oda/gallery/oav25/009A7064.webp",
        "/oda/gallery/oav25/009A7140.webp",
        "/oda/gallery/oav25/009A7373.webp",
        "/oda/gallery/oav25/0D0A7446.webp",
        "/oda/Graphics/700 etiquetas@2x.webp",
      ],
    },
    {
      id: 1,
      title: t("experienceItem2Title", language),
      text: t("experienceItem2Text", language),
      images: [
        "/oda/gallery/oav24/_HID9206.webp",
        "/oda/gallery/oav24/_HID9267.webp",
        "/oda/gallery/oav24/_HID9322.webp",
        "/oda/gallery/oav24/_HID0705.webp",
      ],
    },
    {
      id: 2,
      title: t("experienceItem3Title", language),
      text: t("experienceItem3Text", language),
      images: [
        "/oda/gallery/oav25/009A7272.webp",
        "/oda/gallery/oav25/0D0A7461.webp",
        "/oda/gallery/oav25/009A7134.webp",
        "/oda/gallery/oav24/_HID8934.webp",
      ],
    },
    {
      id: 3,
      title: t("experienceItem4Title", language),
      text: t("experienceItem4Text", language),
      images: [
        "/oda/gallery/oav24/_HID8934.webp",
        "/oda/gallery/oav25/009A7064.webp",
        "/oda/gallery/oav24/_HID9206.webp",
        "/oda/gallery/oav25/009A7272.webp",
      ],
    },
  ];
}

interface ImageSliderProps {
  images: string[];
  title: string;
}

function ImageSlider({ images, title }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-wine group">
      {/* Imagen actual con transición suave */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          priority={currentIndex === 0}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wine/50 pointer-events-none" />

      {/* Contador de imágenes */}
      <div className="absolute bottom-6 left-6 text-paper text-xs font-bold tracking-widest opacity-75">
        {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Botones de navegación — solo en hover/desktop */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-paper/80 hover:text-paper text-2xl"
            aria-label="Imagen anterior"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-paper/80 hover:text-paper text-2xl"
            aria-label="Siguiente imagen"
          >
            →
          </button>

          {/* Indicadores de puntos */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === currentIndex ? "bg-paper w-6" : "bg-paper/40 hover:bg-paper/60"
                )}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ExperienceItemProps {
  item: ExperienceItem;
  isActive: boolean;
  onHover: () => void;
}

function ExperienceItemComponent({ item, isActive, onHover }: ExperienceItemProps) {
  return (
    <div
      onMouseEnter={onHover}
      className={cn(
        "py-7 md:py-8 border-b border-paper/8 cursor-pointer transition-all duration-500 flex items-start gap-6",
        isActive ? "opacity-100" : "opacity-50"
      )}
    >
      {/* Número */}
      <span className="lato-expanded text-[10px] md:text-[11px] text-paper/50 uppercase tracking-widest pt-1 md:pt-2 min-w-fit">
        0{item.id + 1}
      </span>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-serif text-[clamp(1.75rem,4vw,3.5rem)] leading-tight uppercase tracking-tight transition-colors duration-500",
            isActive ? "text-harvest" : "text-paper/70"
          )}
        >
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-paper/60 leading-relaxed mt-3 max-w-md">
          {item.text}
        </p>
      </div>

      {/* Arrow */}
      <div
        className={cn(
          "text-xl md:text-2xl transition-all duration-500 mt-1",
          isActive ? "opacity-100 translate-x-1 rotate-0" : "opacity-30 translate-x-0 -rotate-45"
        )}
      >
        →
      </div>
    </div>
  );
}

export function ExperienceV3() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState(0);
  const items = getExperienceItems(language);

  return (
    <section id="experiencia" className="relative overflow-hidden py-28 md:py-40" style={{ backgroundColor: "var(--plum, #700143)", color: "var(--paper, #fff5e1)" }}>
      {/* Patrón de fondo */}
      <img
        src="/oda/Graphics/fondovioleta2.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.1, mixBlendMode: "screen" }}
      />

      <div className="mx-auto max-w-[1500px] px-8 md:px-12 lg:px-24 relative">
        {/* Título */}
        <div className="max-w-md lg:max-w-lg mb-12 md:mb-16">
          <Reveal>
            <p className="lato-expanded text-[10px] text-paper/70 uppercase tracking-[0.35em] font-bold mb-4">
              {language === "es" ? "Experiencia" : "Experiência"}
            </p>
          </Reveal>
          <Reveal variant="clip" delay={0.15}>
            <h2 className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[0.88] uppercase text-paper mb-6">
              {t("experienceSectionTitle", language)} <span className="script normal-case italic text-paper text-[1.3em]">
                {(() => {
                  const text = t("experienceSectionTitleScript", language);
                  return (
                    <>
                      <span className="script-ss01">{text[0]}</span>
                      {text.slice(1)}
                    </>
                  );
                })()}
              </span>
              <br />
              {t("experienceSectionSubtitle", language)}
            </h2>
          </Reveal>
        </div>

        {/* Grid: Lista + Imágenes */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start" style={{ display: "grid" }}>
          {/* LEFT: Lista de items con líneas y flechitas */}
          <div>
            {items.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.1}>
                <div
                  onMouseEnter={() => setActiveId(item.id)}
                  style={{
                    padding: "28px 0",
                    borderTop: idx === 0 ? "1px solid rgba(255,245,225,0.22)" : "none",
                    borderBottom: "1px solid rgba(255,245,225,0.22)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "24px",
                    transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    opacity: activeId === item.id ? 1 : 0.55,
                  }}
                >
                  {/* Número */}
                  <span
                    className="lato-expanded"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.42em",
                      opacity: 0.7,
                      paddingTop: "14px",
                      minWidth: "40px",
                      color: "var(--paper, #fff5e1)",
                    }}
                  >
                    {item.title.slice(0, 2).toUpperCase()}
                  </span>

                  {/* Contenido */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: '"CCS Belvare", Georgia, serif',
                        fontSize: "clamp(2rem, 6vw, 4rem)",
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        color: activeId === item.id ? "var(--harvest, #7c8419)" : "var(--paper, #fff5e1)",
                        transition: "color 0.5s",
                        margin: 0,
                        fontWeight: "400",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        maxWidth: "560px",
                        marginTop: "12px",
                        fontSize: "clamp(14px, 1.1vw, 17px)",
                        lineHeight: 1.6,
                        opacity: 0.85,
                        color: "var(--paper, #fff5e1)",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>

                  {/* Flecha */}
                  <div
                    style={{
                      fontSize: "24px",
                      opacity: activeId === item.id ? 1 : 0.4,
                      transition: "all 0.5s",
                      transform: activeId === item.id ? "translateX(4px) rotate(0deg)" : "translateX(0) rotate(-45deg)",
                      color: "var(--paper, #fff5e1)",
                    }}
                  >
                    →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RIGHT: Imagen sticky con información */}
          <div className="hidden lg:block" style={{ position: "sticky", top: "120px", aspectRatio: "4/5", maxHeight: "80vh" }}>
            {/* Animación del Sobre - Identidad ODA - Arriba a la derecha */}
            <div
              style={{
                position: "absolute",
                top: "-380px",
                right: "-60px",
                width: "380px",
                height: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              {/* Fondo sutil con efecto de luz */}
              <div
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at center, rgba(255,245,225,0.08) 0%, transparent 70%)",
                  animation: "glow-pulse 4s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />

              {/* Sobre - elemento principal */}
              <div
                style={{
                  position: "relative",
                  width: "300px",
                  height: "300px",
                  animation: "sobre-float 3.5s ease-in-out infinite, sobre-rotate 4s ease-in-out infinite",
                  transformOrigin: "center",
                  zIndex: 2,
                }}
              >
                <img
                  src="/oda/gallery/animacion/Sobre.svg"
                  alt="Sobre ODA"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 12px 30px rgba(71, 7, 44, 0.25))",
                  }}
                />
              </div>

              {/* Lacre animado - sutil y refinado */}
              <div
                style={{
                  position: "absolute",
                  width: "140px",
                  height: "140px",
                  animation: "lacre-gentle 3s ease-in-out infinite",
                  transformOrigin: "center",
                  zIndex: 3,
                  filter: "drop-shadow(0 8px 20px rgba(71, 7, 44, 0.35))",
                  opacity: 0.95,
                }}
              >
                <img
                  src="/oda/gallery/animacion/Lacre OAV.svg"
                  alt="Lacre"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: "var(--wine, #47072c)",
              }}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: activeId === item.id ? 1 : 0,
                    transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 1.5s",
                    transform: activeId === item.id ? "scale(1)" : "scale(1.08)",
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(71,7,44,0.7) 100%)",
                }}
              />

              {/* Info bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  right: "24px",
                  color: "var(--paper, #fff5e1)",
                }}
              >
                <p className="lato-expanded" style={{ fontSize: "10px", letterSpacing: "0.4em", opacity: 0.8, margin: 0 }}>
                  · {String(activeId + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                <h4
                  style={{
                    fontFamily: '"CCS Belvare", Georgia, serif',
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    marginTop: "10px",
                    textTransform: "uppercase",
                    margin: "10px 0 0 0",
                  }}
                >
                  {items[activeId].title}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile image — debajo en mobile */}
        <div className="lg:hidden mt-12" style={{ aspectRatio: "4/3" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "4px",
              backgroundColor: "var(--wine, #47072c)",
            }}
          >
            <img
              src={items[activeId].images[0]}
              alt={items[activeId].title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sobre-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes sobre-rotate {
          0%, 100% {
            transform: rotateZ(-1deg);
          }
          50% {
            transform: rotateZ(1deg);
          }
        }

        @keyframes lacre-gentle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.9;
          }
          25% {
            transform: scale(1.05) rotate(-5deg);
            opacity: 1;
          }
          50% {
            transform: scale(1) rotate(0deg);
            opacity: 0.9;
          }
          75% {
            transform: scale(0.98) rotate(3deg);
            opacity: 0.85;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}
