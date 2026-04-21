"use client";

interface MarqueeProps {
  text?: string;
  speed?: number;
  className?: string;
  variant?: "dark" | "light" | "harvest";
}

export function Marquee({
  text = "ODA AL VINO · 10° EDICIÓN · IGUAZÚ · ARGENTINA · 4 Y 5 DE SEPTIEMBRE ·",
  speed = 30,
  className = "",
  variant = "dark",
}: MarqueeProps) {
  const colors = {
    dark: "bg-wine text-paper/60",
    light: "bg-paper text-wine/30",
    harvest: "bg-harvest text-paper/70",
  };

  const repeated = Array(6).fill(text).join(" ");

  return (
    <div
      className={`overflow-hidden border-y py-6 ${
        variant === "dark"
          ? "border-paper/8"
          : variant === "harvest"
          ? "border-paper/20"
          : "border-wine/8"
      } ${colors[variant]} ${className}`}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.5em] pr-16">
          {repeated}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.5em] pr-16" aria-hidden="true">
          {repeated}
        </span>
      </div>
    </div>
  );
}
