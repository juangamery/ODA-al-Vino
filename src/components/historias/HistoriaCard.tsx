import Image from "next/image";
import Link from "next/link";
import { ETIQUETAS, LANG_TAG, formatFecha, type Historia } from "@/lib/historias";

export function HistoriaCard({ historia, mostrarFecha = true, destacada = false }: { historia: Historia; mostrarFecha?: boolean; destacada?: boolean }) {
  return (
    <article className="group flex flex-col" lang={LANG_TAG[historia.idioma]}>
      <Link
        href={`/historias/${historia.slug}`}
        className={destacada ? "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center" : "flex flex-col h-full"}
      >
        <div className={`relative overflow-hidden rounded-lg bg-wine/10 ${destacada ? "aspect-[3/2] md:col-span-7" : "aspect-[4/3] mb-5"}`}>
          <Image
            src={historia.imagen.src}
            alt={historia.imagen.alt}
            fill
            sizes={destacada ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className={destacada ? "md:col-span-5 flex flex-col" : "contents"}>
        {mostrarFecha && (
          <time dateTime={historia.fecha} className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.3em] font-bold mb-3">
            {formatFecha(historia.fecha, historia.idioma)}
          </time>
        )}
        <h3 className={`font-serif uppercase text-wine leading-tight mb-3 group-hover:text-plum transition-colors ${destacada ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
          {historia.titulo}
        </h3>
        <p className="text-base text-wine/70 leading-relaxed mb-4">{historia.bajada}</p>
        <span className="mt-auto pt-2 text-xs font-bold uppercase tracking-widest text-wine/80 group-hover:text-wine">
          {ETIQUETAS[historia.idioma].leer}
        </span>
        </div>
      </Link>
    </article>
  );
}
