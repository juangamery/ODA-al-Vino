"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PolaroidImage {
  src: string;
  caption: string;
  id: string;
}

interface ScatterPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  range(min: number, max: number): number { return min + this.next() * (max - min); }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0, staggerChildren: 1.4 },
  },
};

const cardVariants = {
  hidden: (c: { zIndex: number }) => ({
    x: 0, y: 0, rotate: 0, scale: 1, zIndex: c.zIndex,
  }),
  visible: (c: { position: ScatterPosition; zIndex: number; spring: object }) => ({
    x: c.position.x,
    y: c.position.y,
    rotate: c.position.rotation,
    scale: c.position.scale,
    zIndex: c.zIndex,
    transition: c.spring,
  }),
};

interface PolaroidStackProps {
  images: PolaroidImage[];
  seed?: number;
}

export function PolaroidStack({ images, seed = 42 }: PolaroidStackProps) {
  const [visible, setVisible] = React.useState(false);
  const [positions, setPositions] = React.useState<ScatterPosition[]>([]);
  const [currentSeed, setCurrentSeed] = React.useState(seed);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const generate = React.useCallback((s: number) => {
    const rng = new SeededRandom(s);
    return images.map(() => ({
      x: rng.range(-320, -260),
      y: rng.range(-40, 40),
      rotation: rng.range(-14, 14),
      scale: rng.range(0.96, 1.04),
    }));
  }, [images]);

  React.useEffect(() => {
    setPositions(generate(currentSeed));
  }, [currentSeed, generate]);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const spring = prefersReducedMotion
    ? { type: "tween", duration: 0.3 }
    : { type: "spring", stiffness: 90, damping: 18 };

  const reshuffle = () => {
    setVisible(false);
    setCurrentSeed(Math.floor(Math.random() * 999999));
    setTimeout(() => setVisible(true), 120);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 520 }}>
      <motion.div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ perspective: 1000, minWidth: 1200 }}
        variants={containerVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
      >
        {images.map((img, i) => {
          const pos = positions[i];
          if (!pos) return null;
          return (
            <motion.div
              key={`${img.id}-${currentSeed}`}
              className="absolute cursor-pointer"
              variants={cardVariants}
              custom={{ position: pos, zIndex: images.length - i, spring }}
              style={{ left: "50%", top: "50%", marginLeft: -130, marginTop: -190 }}
              whileHover={{ scale: 1.06, zIndex: 99 }}
            >
              {/* Polaroid frame */}
              <div className="bg-paper p-4 pb-10 shadow-2xl" style={{ width: 260, border: "1px solid rgba(71,7,44,0.07)" }}>
                <div className="photo-dreamy relative overflow-hidden" style={{ width: 228, height: 300 }}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p
                  className="mt-4 text-center script text-wine/60"
                  style={{ fontSize: "1.1rem", fontFamily: "var(--font-script)" }}
                >
                  {img.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Botón reshuffle */}
      <button
        onClick={reshuffle}
        className="absolute bottom-4 right-4 text-[9px] font-bold uppercase tracking-[0.38em] text-wine/30 hover:text-wine/60 transition-colors"
      >
        ↺ Revolver
      </button>
    </div>
  );
}
