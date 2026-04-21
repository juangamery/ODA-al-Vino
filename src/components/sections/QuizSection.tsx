"use client";

import { Container, Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export function QuizSection() {
  return (
    <Section variant="harvest" className="relative border-b border-paper/8">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-plum),transparent)]" />
      </div>
      
      <Container>
        <div className="relative overflow-hidden rounded-[3rem] border border-wine/6 bg-paper p-10 text-center shadow-[0_30px_100px_rgba(71,7,44,0.15)] md:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,1,67,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />
          {/* Decorative frame corner */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-plum/20 rounded-tl-[3rem]" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-plum/20 rounded-br-[3rem]" />

          <Reveal className="relative z-10">
            <div className="w-16 h-16 bg-wine/5 rounded-full flex items-center justify-center mb-8 mx-auto">
              <Sparkles className="w-8 h-8 text-plum" />
            </div>
            <h2 className="text-4xl md:text-6xl text-wine mb-6">
              Descubrí tu experiencia <span className="block script text-plum italic lowercase">en ODA al Vino</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-olive max-w-2xl mb-12 italic">
              Cada persona vive ODA al Vino de una manera distinta. Respondé 4 preguntas y te recomendaremos el recorrido perfecto para vos.
            </p>
          </Reveal>

          <Reveal delay={0.4} direction="up" className="relative z-10">
            <Button size="lg" className="px-12">
              Empezar experiencia
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
