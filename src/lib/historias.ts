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

// Para publicar un artículo, agregar un objeto como este (fotos en public/oda/historias/):
// {
//   slug: "semana-oda-2026",                       // URL: /historias/semana-oda-2026
//   titulo: "Título del artículo",
//   bajada: "Una o dos líneas que resumen el artículo.",
//   descripcionSeo: "Descripción para Google (hasta ~155 caracteres).",
//   fecha: "2026-11-05",
//   autor: "Nombre de quien firma",
//   imagen: { src: "/oda/historias/semana-oda-2026.webp", alt: "Qué muestra la foto", ancho: 2000, alto: 1334 },
//   cuerpo: [
//     { tipo: "p", texto: "Párrafo con un [enlace interno](/faq)." },
//     { tipo: "h2", texto: "Subtítulo" },
//     { tipo: "img", src: "/oda/historias/foto-2.webp", alt: "…", ancho: 2000, alto: 1334, epigrafe: "Opcional" },
//   ],
//   relacionadas: ["otro-slug"],                   // opcional
// },
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
