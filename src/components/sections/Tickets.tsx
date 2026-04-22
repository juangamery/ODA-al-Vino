"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TicketCard } from "./TicketCard";
import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

interface Lot {
  number: number;
  price: string;
  label: string;
  status: "available" | "next" | "upcoming" | "final";
  ars: string;
  pyg: string;
  voucherBrl: string;
  voucherArs: string;
  voucherMisioneros: string;
  voucherPyg: string;
}

function getLots(lang: string): Lot[] {
  return [
    {
      number: 1,
      price: "630",
      label: t("ticketsLot1Label", lang as any),
      status: "available",
      ars: "166.950",
      pyg: "793.800",
      voucherBrl: "189",
      voucherArs: "50.085",
      voucherMisioneros: "42.525",
      voucherPyg: "238.140",
    },
    {
      number: 2,
      price: "695",
      label: t("ticketsLot2Label", lang as any),
      status: "next",
      ars: "184.175",
      pyg: "875.700",
      voucherBrl: "210",
      voucherArs: "55.650",
      voucherMisioneros: "47.250",
      voucherPyg: "264.600",
    },
    {
      number: 3,
      price: "765",
      label: t("ticketsLot3Label", lang as any),
      status: "upcoming",
      ars: "202.725",
      pyg: "963.900",
      voucherBrl: "230",
      voucherArs: "60.950",
      voucherMisioneros: "51.750",
      voucherPyg: "289.800",
    },
    {
      number: 4,
      price: "840",
      label: t("ticketsLot4Label", lang as any),
      status: "final",
      ars: "222.600",
      pyg: "1.058.400",
      voucherBrl: "252",
      voucherArs: "66.780",
      voucherMisioneros: "56.700",
      voucherPyg: "317.520",
    },
  ];
}

const currencies = [
  { code: "brl", label: "R$", key: "price" },
  { code: "ars", label: "AR$", key: "ars" },
  { code: "pyg", label: "PYG", key: "pyg" },
];

function getIncludes(lang: string): string[] {
  return [
    t("ticketsInclude1", lang as any),
    t("ticketsInclude2", lang as any),
    t("ticketsInclude3", lang as any),
    t("ticketsInclude4", lang as any),
    t("ticketsInclude5", lang as any),
  ];
}

export function Tickets() {
  const { language } = useLanguage();
  const lots = getLots(language);
  const includes = getIncludes(language);
  const [selectedLot, setSelectedLot] = useState(0);
  const [currency, setCurrency] = useState<"brl" | "ars" | "pyg">("brl");
  const [isMisioneros, setIsMisioneros] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardsContainerRef.current) return;

    // Animar los tickets cuando entran al viewport
    const cards = cardsContainerRef.current.querySelectorAll("button");

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.5, y: 20 },
      {
        opacity: (i) => (i === 0 ? 1 : 0.5),
        scale: (i) => (i === 0 ? 1 : 0.95),
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          markers: false,
        },
      }
    );
  }, { scope: containerRef });

  const handleSelectLot = (index: number) => {
    setSelectedLot(index);
  };

  const getPrice = (lot: typeof lots[0]): string => {
    const selected = currencies.find((c) => c.code === currency);
    if (!selected) return lot.price;

    const value = lot[selected.key as keyof typeof lot];
    if (currency === "brl") return `R$${value}`;
    if (currency === "ars") return `AR$${value}`;
    if (currency === "pyg") return `₲${value}`;
    return `${value}`;
  };

  const getVoucherPrice = (lot: typeof lots[0]): string => {
    if (currency === "brl") return `R$${lot.voucherBrl}`;
    if (currency === "ars") {
      const value = isMisioneros ? lot.voucherMisioneros : lot.voucherArs;
      return `AR$${value}`;
    }
    if (currency === "pyg") return `₲${lot.voucherPyg}`;
    return lot.voucherBrl;
  };

  return (
    <>
      {/* Divisor verde tipo slider — elemento decorativo v2 */}
      <div className="bg-harvest overflow-hidden py-4">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] pr-16 text-paper/60">
            {t("ticketsMarqueeText", language)} · {t("ticketsMarqueeText", language)} ·
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] pr-16 text-paper/60" aria-hidden="true">
            {t("ticketsMarqueeText", language)} · {t("ticketsMarqueeText", language)} ·
          </span>
        </div>
      </div>

      <section
        id="entradas"
        className="bg-paper overflow-hidden relative py-28 md:py-40"
        ref={containerRef}
      >
      {/* Patrón de fondo - Círculos geométricos */}
      <img
        src="/oda/SVG/patron_fondo.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-40"
      />

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 relative">
        {/* Header */}
        <Reveal delay={0.05}>
          <div className="text-left mb-8">
            <p className="lato-expanded text-[10px] text-wine/35 tracking-[0.35em] uppercase font-bold">
              ✦ {t("ticketsLabel", language)} ✦
            </p>
          </div>
        </Reveal>

        {/* Título */}
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] uppercase text-wine mb-6 text-left">
            {t("ticketsTitle", language)} <br className="block md:hidden" />
            {t("ticketsTitleScript", language)}
            <br /> {t("ticketsTitleC", language)}
          </h2>
        </Reveal>

        {/* Subtítulo */}
        <Reveal delay={0.2}>
          <p className="text-left text-lg md:text-xl text-wine/70 mb-4 max-w-2xl">
            {t("ticketsSubtitle", language)}
          </p>
        </Reveal>

        {/* Texto breve */}
        <Reveal delay={0.25}>
          <p className="text-left text-base text-wine/60 mb-20 max-w-xl">
            {t("ticketsDescription", language)}
          </p>
        </Reveal>

        {/* Grid: Tickets + Card */}
        <div className="grid md:lg:grid-cols-[1fr_1.2fr] gap-6 md:gap-12 lg:gap-24 items-start">
          {/* LEFT: Tickets */}
          <div className="space-y-4 md:space-y-6" ref={cardsContainerRef}>
            {lots.map((lot, i) => (
              <TicketCard
                key={lot.number}
                lot={lot}
                isSelected={selectedLot === i}
                onClick={() => handleSelectLot(i)}
                index={i}
              />
            ))}
          </div>

          {/* RIGHT: Entrada Card - Label Style with Perforation */}
          <div>
            <div className="lg:sticky lg:top-32 bg-gradient-to-br from-wine via-plum to-wine p-6 md:p-10 lg:p-14 shadow-2xl relative" style={{
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(71, 7, 44, 0.4)",
              borderLeft: "2px dashed rgba(255, 245, 225, 0.5)",
              paddingLeft: "calc(24px + 1.5rem)",
            }}>
              {/* Perforación decorativa - solo en tablet/desktop */}
              <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-10 flex flex-col items-center justify-between py-4">
                <div className="space-y-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-paper/40" />
                  ))}
                </div>
              </div>
              {/* Header: Título + Logo */}
              <div className="mb-6 md:mb-10">
                <p className="lato-expanded text-[9px] md:text-[10px] text-paper/60 uppercase tracking-[0.35em] font-bold mb-2 md:mb-4">
                  ✦ Acceso Completo ✦
                </p>
                <div className="flex items-start justify-between gap-3 md:gap-4">
                  <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl uppercase text-paper leading-tight">
                    Entrada
                  </h3>
                  {/* Logo SVG - Más pequeño en mobile */}
                  <img
                    src="/oda/brand/logo_blanco_vertical.svg"
                    alt="ODA al Vino"
                    className="h-14 md:h-24 lg:h-32 w-auto flex-shrink-0 -mt-2 md:-mt-6 lg:-mt-8"
                  />
                </div>
              </div>

              {/* Precio Dinámico - Prominente */}
              <div className="bg-harvest/20 border-l-4 border-harvest rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                <p className="text-paper/70 text-xs md:text-sm mb-2 uppercase tracking-widest">{t("ticketsPriceLabel", language)}</p>
                <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-paper font-bold">
                  {getPrice(lots[selectedLot])}
                </p>
                <p className="text-harvest text-xs font-bold uppercase tracking-widest mt-2 md:mt-3">
                  {lots[selectedLot].label}
                </p>
              </div>

              {/* Vale de Consumo - Destacado */}
              <div className="bg-plum/10 border-l-4 border-plum rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                <p className="text-paper/70 text-xs md:text-sm mb-2 md:mb-3 uppercase tracking-widest font-bold">{t("ticketsVoucherLabel", language)}</p>
                <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-paper font-bold mb-2">
                  {getVoucherPrice(lots[selectedLot])}
                </p>
                <p className="text-plum text-xs font-bold uppercase tracking-widest">
                  {t("ticketsVoucherLocation", language)}
                </p>
              </div>

              {/* Selector de Monedas — v2 style */}
              <div className="flex gap-2 mb-4 md:mb-6">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code as "brl" | "ars" | "pyg");
                      if (c.code !== "ars") setIsMisioneros(false);
                    }}
                    className={`px-3 md:px-4 py-1.5 md:py-2 text-[11px] md:text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                      currency === c.code
                        ? "bg-paper text-wine border border-paper"
                        : "bg-transparent text-paper/70 border border-paper/30 hover:border-paper/60"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Toggle Misioneros - Solo visible para ARS */}
              {currency === "ars" && (
                <div className="mb-6 md:mb-10 flex items-center gap-3 bg-harvest/20 p-3 rounded-lg">
                  <input
                    type="checkbox"
                    id="misioneros-toggle"
                    checked={isMisioneros}
                    onChange={(e) => setIsMisioneros(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="misioneros-toggle" className="text-xs font-bold uppercase tracking-widest text-harvest cursor-pointer">
                    {t("ticketsResidenteMisiones", language)}
                  </label>
                </div>
              )}

              {/* Incluye - Cards Grid */}
              <div className="mb-6 md:mb-10">
                <p className="lato-expanded text-[9px] md:text-[10px] text-paper/60 uppercase tracking-[0.35em] font-bold mb-3 md:mb-5">
                  ✔️ {t("ticketsIncludesLabel", language)}
                </p>
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  {includes.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 md:gap-3 bg-paper/10 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-paper/10"
                    >
                      <span className="text-harvest text-lg md:text-xl leading-none mt-0.5 flex-shrink-0 font-bold">
                        {i + 1}.
                      </span>
                      <span className="text-xs md:text-sm lg:text-base text-paper/90 leading-snug font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Principal - Grande y Llamativo */}
              <button
                disabled={selectedLot !== 0}
                className={`w-full font-serif text-base md:text-lg lg:text-2xl font-bold uppercase tracking-wider py-4 md:py-6 rounded-full transition-all duration-300 shadow-2xl mb-3 md:mb-4 ${
                  selectedLot === 0
                    ? "bg-paper hover:bg-paper/95 text-wine transform hover:scale-105 cursor-pointer"
                    : "bg-paper/60 text-wine/60 cursor-not-allowed"
                }`}
              >
                {selectedLot === 0 ? t("ticketsBtnBuy", language) : t("ticketsBtnSoon", language)}
              </button>

              {/* Microcopy Footer */}
              <p className="text-center text-xs text-paper/70 font-semibold">
                {t("ticketsNoIntermediary", language)}
              </p>
            </div>

          {/* Urgencia Message */}
          <Reveal delay={0.8}>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.32em] text-wine text-center">
              ↑ {t("ticketsUrgency", language)}
            </p>
          </Reveal>
        </div>
        </div>
      </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
}
