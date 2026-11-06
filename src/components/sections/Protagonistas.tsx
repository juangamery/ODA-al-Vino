"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

// Tarjetas oficiales de OAV 2026: nombre y bodega tal como figuran en cada pieza.
const PROTAGONISTAS: { foto: string; nombre: string; rol?: { es: string; pt: string }; bodega: string }[] = [
  { foto: "rafael-molina", nombre: "Rafael Molina", bodega: "Domingo Molina" },
  { foto: "pablo-sanchez", nombre: "Pablo Sanchez", bodega: "Lauri Viana" },
  { foto: "ramiro-barrillo", nombre: "Ramiro Barrillo", rol: { es: "Enólogo", pt: "Enólogo" }, bodega: "Diamandes" },
  { foto: "natalia-suarez", nombre: "Natalia Suarez", rol: { es: "Sommelier", pt: "Sommelier" }, bodega: "La Coste de los Andes" },
  { foto: "alicia-cruz", nombre: "Alicia Cruz", bodega: "Flechas de los Andes" },
  { foto: "lucas-ballester", nombre: "Lucas Ballester", bodega: "Wineco" },
  { foto: "lucca-isasmendi", nombre: "Lucca Isasmendi", rol: { es: "Enólogo", pt: "Enólogo" }, bodega: "Isasmendi" },
  { foto: "colo-sejantovich", nombre: "Colo Sejantovich", bodega: "Mil Suelos" },
  { foto: "leandro-azin", nombre: "Leandro Azin", rol: { es: "Propietario y enólogo", pt: "Proprietário e enólogo" }, bodega: "A Corazón Abierto" },
  { foto: "carlos-timoner", nombre: "Carlos Timoner", bodega: "Susana Balbo" },
  { foto: "gabriel-guardia", nombre: "Gabriel Guardia", rol: { es: "Propietario", pt: "Proprietário" }, bodega: "Aceites Olei Guardia" },
  { foto: "jose-lorca", nombre: "José Lorca", bodega: "Mauricio Lorca" },
  { foto: "pancho-bugallo", nombre: "Pancho Bugallo", rol: { es: "Propietario", pt: "Dono" }, bodega: "Cara Sur" },
  { foto: "andres-biscaizaque", nombre: "Andrés Biscaizaque", bodega: "Los Dragones" },
  { foto: "juan-diego-pannocchia", nombre: "Juan Diego Pannocchia", rol: { es: "Enólogo y propietario", pt: "Enólogo e dono" }, bodega: "Cuarto Surco" },
  { foto: "juan-pablo-diaz", nombre: "Juan Pablo Díaz", rol: { es: "Enólogo", pt: "Enólogo" }, bodega: "López" },
];

const TEXTOS = {
  label: { es: "10ª Edición · ODA al Vino 2026", pt: "10ª Edição · ODA al Vino 2026" },
  titulo: { es: "Conocé las personalidades de ODA al Vino.", pt: "Conheça as personalidades da ODA al Vino." },
  texto: {
    es: "Enólogos, sommeliers y referentes de bodegas que compartieron sus vinos y su conocimiento con nuestra comunidad.",
    pt: "Enólogos, sommeliers e referências de adegas que compartilharam seus vinhos e seu conhecimento com a nossa comunidade.",
  },
};

const mitad = Math.ceil(PROTAGONISTAS.length / 2);
const filaA = PROTAGONISTAS.slice(0, mitad);
const filaB = PROTAGONISTAS.slice(mitad);

export function Protagonistas() {
  const { language } = useLanguage();
  const lang = language as "es" | "pt";

  return (
    <section id="protagonistas" className="bg-paper py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24">
        <Reveal>
          <p className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.35em] font-bold mb-4">
            ✦ {TEXTOS.label[lang]} ✦
          </p>
        </Reveal>
        <Reveal variant="clip" delay={0.1}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] pt-[0.1em] uppercase text-wine mb-6 max-w-4xl">
            {TEXTOS.titulo[lang]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-wine/70 leading-relaxed max-w-2xl mb-10 md:mb-12">{TEXTOS.texto[lang]}</p>
        </Reveal>

      </div>

      {/* Dos filas en movimiento continuo y en sentidos opuestos; se pausan al pasar el mouse o tocar */}
      <div className="-mt-6 md:-mt-8">
        {[filaA, filaB].map((fila, f) => (
          <div key={f} className="protagonistas-viewport overflow-hidden py-10 md:py-12">
            <ul
              className={`protagonistas-track flex w-max ${f === 0 ? "protagonistas-left" : "protagonistas-right"}`}
              style={{ animationDuration: `${fila.length * 6}s` }}
            >
              {[0, 1].map((copia) =>
                fila.map((p, i) => (
                  <li
                    key={`${copia}-${p.foto}`}
                    aria-hidden={copia === 1 || undefined}
                    className="flex-shrink-0 w-[44vw] sm:w-[30vw] md:w-[22vw] lg:w-[17vw] max-w-[260px] px-2 md:px-3"
                  >
                    <figure
                      className="protagonista-card"
                      style={{ "--tilt": `${(i % 2 === 0 ? -1 : 1) * 1.5}deg` } as React.CSSProperties}
                    >
                      <Image
                        src={`/oda/protagonistas/${p.foto}.webp`}
                        alt={copia === 0 ? `${p.nombre}${p.rol ? `, ${p.rol[lang]}` : ""} de ${p.bodega}` : ""}
                        width={900}
                        height={1125}
                        sizes="(max-width: 640px) 44vw, (max-width: 1024px) 26vw, 260px"
                        className="w-full h-auto rounded-lg shadow-[0_14px_28px_rgba(71,7,44,0.2)]"
                      />
                      {copia === 0 && (
                        <figcaption className="sr-only">
                          {p.nombre} — {p.rol ? `${p.rol[lang]}, ` : ""}{p.bodega}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes protagonistas-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes protagonistas-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .protagonistas-track { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
        .protagonistas-left { animation-name: protagonistas-left; }
        .protagonistas-right { animation-name: protagonistas-right; }
        .protagonistas-viewport:hover .protagonistas-track,
        .protagonistas-viewport:active .protagonistas-track { animation-play-state: paused; }
        .protagonista-card { transform: rotate(var(--tilt)); transition: transform 0.5s ease-out; }
        .protagonista-card:hover { transform: translateY(-8px) scale(1.04) rotate(0deg); }
        @media (prefers-reduced-motion: reduce) {
          .protagonistas-track { animation: none; }
          .protagonistas-viewport { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}
