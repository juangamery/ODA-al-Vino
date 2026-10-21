import Image from "next/image";
import Link from "next/link";
import { formatFecha, type Historia } from "@/lib/historias";

export function HistoriaCard({ historia, mostrarFecha = true }: { historia: Historia; mostrarFecha?: boolean }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/historias/${historia.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-wine/10 mb-5">
          <Image
            src={historia.imagen.src}
            alt={historia.imagen.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {mostrarFecha && (
          <time dateTime={historia.fecha} className="lato-expanded text-[10px] text-wine/50 uppercase tracking-[0.3em] font-bold mb-3">
            {formatFecha(historia.fecha)}
          </time>
        )}
        <h3 className="font-serif text-2xl md:text-3xl uppercase text-wine leading-tight mb-3 group-hover:text-plum transition-colors">
          {historia.titulo}
        </h3>
        <p className="text-base text-wine/70 leading-relaxed mb-4">{historia.bajada}</p>
        <span className="mt-auto text-xs font-bold uppercase tracking-widest text-wine/80 group-hover:text-wine">
          Leer historia →
        </span>
      </Link>
    </article>
  );
}
