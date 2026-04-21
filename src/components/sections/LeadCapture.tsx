import { Reveal } from "@/components/motion/Reveal";
import { FloatingElement } from "@/components/ui/FloatingElement";

export function LeadCapture() {
  return (
    <section className="bg-wine overflow-visible relative">
      {/* Patrón de fondo — fondovioletachico */}
      <img
        src="/oda/Graphics/fondovioletachico.svg"
        alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none select-none mix-blend-screen"
      />
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-28 md:py-40">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Texto */}
          <div>
            <Reveal variant="clip" delay={0.1}>
              <h2 className="font-serif text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.88] uppercase text-paper mb-8">
                Seguí siendo<br />
                Parte de<br />
                ODA al Vino
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-lg text-paper/60 leading-relaxed max-w-md">
                Accedé a experiencias únicas, beneficios exclusivos y todas las novedades del mundo del vino antes que nadie.
              </p>
            </Reveal>

            {/* Gráfico decorativo */}
            <div className="mt-12 pointer-events-none select-none">
              <img
                src="/oda/Graphics/Recurso 4@2x.webp"
                alt=""
                aria-hidden="true"
                className="w-48 opacity-20 animate-float"
              />
            </div>

          </div>

          {/* Formulario — directo sobre el fondo, sin card */}
          <Reveal delay={0.2} direction="left">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.38em] text-paper/85 mb-3">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full bg-transparent border-b border-paper/70 pb-4 text-paper text-lg placeholder:text-paper/70 focus:outline-none focus:border-harvest transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.38em] text-paper/85 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-transparent border-b border-paper/70 pb-4 text-paper text-lg placeholder:text-paper/70 focus:outline-none focus:border-harvest transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.38em] text-paper/85 mb-3">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+54 9..."
                  className="w-full bg-transparent border-b border-paper/70 pb-4 text-paper text-lg placeholder:text-paper/70 focus:outline-none focus:border-harvest transition-colors"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-paper text-wine text-[10px] font-bold uppercase tracking-[0.38em] py-5 rounded-full hover:bg-harvest hover:text-paper transition-colors duration-300"
                >
                  Sumarme a ODA
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
