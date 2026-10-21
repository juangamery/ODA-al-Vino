// Artículos de "Historias de ODA Al Vino".
// La sección, el menú, el footer y el sitemap se activan solos cuando hay al menos un artículo.
// Los textos se cargan tal como fueron redactados; no completar con contenido de relleno.

export type Bloque =
  | { tipo: "p"; texto: string } // admite enlaces con la forma [texto](/ruta)
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "img"; src: string; alt: string; ancho: number; alto: number; epigrafe?: string };

export interface Historia {
  slug: string;
  titulo: string;
  bajada: string;
  /** Opcional: título para buscadores si difiere del H1 */
  tituloSeo?: string;
  descripcionSeo: string;
  fecha: string; // "AAAA-MM-DD", fecha real de publicación
  autor: string;
  imagen: { src: string; alt: string; ancho: number; alto: number };
  cuerpo: Bloque[];
  relacionadas?: string[]; // slugs
}

export const historias: Historia[] = [];

export const historiasOrdenadas = [...historias].sort((a, b) => b.fecha.localeCompare(a.fecha));

export function getHistoria(slug: string) {
  return historias.find((h) => h.slug === slug);
}

export function getRelacionadas(h: Historia, max = 3) {
  const elegidas = (h.relacionadas ?? []).map(getHistoria).filter((x): x is Historia => !!x);
  const resto = historiasOrdenadas.filter((x) => x.slug !== h.slug && !elegidas.includes(x));
  return [...elegidas, ...resto].slice(0, max);
}

export function formatFecha(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
}
