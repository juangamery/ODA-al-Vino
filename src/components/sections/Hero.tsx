import { Container, Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { WaxSeal } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { HeroVisual } from "@/components/sections/HeroVisual";

export function Hero() {
  return (
    <Section
      id="inicio"
      variant="paper"
      className="texture-paper min-h-screen border-b border-wine/8 pt-32 pb-12 md:pt-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,1,67,0.12),transparent_26%),radial-gradient(circle_at_left_center,rgba(76,84,9,0.08),transparent_24%)]" />
      {/* SVG decorativo marco — esquina inferior derecha */}
      <img
        src="/oda/Graphics/Recurso 13.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 w-64 opacity-10 select-none"
      />
      {/* SVG decorativo — esquina superior izquierda */}
      <img
        src="/oda/Graphics/Recurso 14.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-8 w-48 opacity-8 select-none"
      />
      <Container className="relative grid min-h-[78vh] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="z-10 order-2 lg:order-1 lg:pb-8">
          <Reveal direction="down" delay={0.2}>
            <div className="mb-8 flex items-center gap-4">
              <WaxSeal className="animate-float" />
              <div>
                <p className="text-xs font-bold text-plum tracking-widest uppercase">
                  Edición especial — 10 años OAV
                </p>
                <p className="text-xs font-medium text-olive tracking-widest uppercase">
                  25 años ODA
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="max-w-4xl text-6xl md:text-8xl lg:text-9xl mb-6 leading-[0.86]">
              El vino <span className="block italic text-wine script lowercase text-[1.25em]">nos reúne</span>
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="max-w-2xl text-xl md:text-2xl text-olive mb-10 font-medium leading-relaxed">
              Viví la experiencia del vino más importante de la Triple Frontera
            </p>
          </Reveal>

          <Reveal delay={0.8} direction="up">
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary">
                Comprar entradas
              </Button>
              <Button size="lg" variant="outline">
                Descubrí tu experiencia
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1} className="mt-14 hidden items-center gap-4 md:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-wine/45">
              Scroll
            </span>
            <div className="relative h-px w-24 overflow-hidden bg-wine/15">
              <div className="absolute left-0 top-0 h-full w-10 animate-[drift_3.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-plum to-transparent" />
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 relative">
          <Reveal direction="left" delay={0.4} className="h-full">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
