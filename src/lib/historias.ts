// Artículos de "Historias de ODA Al Vino".
// La sección, el menú, el footer y el sitemap se activan solos cuando hay al menos un artículo.
// Los textos se cargan tal como fueron redactados; no completar con contenido de relleno.

export type Bloque =
  | { tipo: "p"; texto: string } // admite enlaces con la forma [texto](/ruta)
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "img"; src: string; alt: string; ancho: number; alto: number; epigrafe?: string };

export type Idioma = "es" | "pt";

export interface Historia {
  slug: string;
  idioma: Idioma; // idioma original del texto

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
//   idioma: "es",
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
export const historias: Historia[] = [
  {
    slug: "dez-edicoes-uma-historia",
    idioma: "pt",
    titulo: "Dez edições, uma história: o que a ODA al Vino construiu em Puerto Iguazú",
    bajada: "Há eventos que acontecem. E há eventos que ficam.",
    descripcionSeo:
      "A ODA al Vino chegou à décima edição em 2026. A trajetória do encontro que, desde 2015, reúne bodegas argentinas e amantes do vinho em Puerto Iguazú.",
    fecha: "2026-10-27",
    autor: "Equipe ODA al Vino",
    imagen: {
      src: "/oda/gallery/oav26/oav26-muro-bodegas-oda-al-vino.webp",
      alt: "Muro de boas-vindas da ODA al Vino 2026, com nomes de bodegas participantes e peças de edições anteriores",
      ancho: 2000,
      alto: 1334,
    },
    cuerpo: [
      { tipo: "p", texto: "A diferença raramente está no tamanho, está no que eles deixam para trás quando as portas se fecham e as pessoas voltam para casa. Está no que continua existindo depois que a última taça é servida e a última garrafa é guardada." },
      { tipo: "p", texto: "A ODA al Vino chegou à sua [décima edição](/#oav-2026) em setembro de 2026. E olhar para esse número (dez) é olhar para uma trajetória que começou pequena, com uma ideia simples, e foi crescendo não por acaso, mas pela insistência em fazer algo que valesse a pena ser feito." },
      { tipo: "h2", texto: "O começo" },
      { tipo: "p", texto: "Tudo começou em 2015 como um evento para os clientes da ODA Vinoteca. Uma reunião de pessoas que gostavam de vinho, que queriam experimentar, conversar e descobrir. Quarenta e seis bodegas aceitaram o convite naquela primeira edição. O resultado foi uma tarde que se transformou em noite, e em algo que ninguém queria que terminasse." },
      { tipo: "p", texto: "O que aconteceu nos anos seguintes foi a confirmação de que aquilo não tinha sido sorte." },
      { tipo: "p", texto: "A segunda edição trouxe mais de sessenta bodegas. A terceira introduziu pela primeira vez uma degustação exclusiva para profissionais da hotelaria e gastronomia. A quarta consolidou o evento como referência no mundo do vinho argentino. Em 2019, já eram mais de oitenta e cinco bodegas e mil e quinhentos participantes reunidos sob a premissa de sentir, conhecer e deleitar." },
      { tipo: "p", texto: "A pandemia interrompeu o calendário, como interrompeu tantas outras coisas. Mas em 2022 o evento voltou, com inscrições online, com mais de cem bodegas expositoras e com a certeza de que o que havia sido construído resistia ao tempo e às circunstâncias." },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-muro-25-anos-historia.webp", alt: "Muro «25 años de historia, 10 años de encuentros» com fotos da trajetória da ODA Vinoteca e da ODA al Vino", ancho: 1334, alto: 2000 },
      { tipo: "h2", texto: "O que faz a ODA al Vino ser o que é" },
      { tipo: "p", texto: "Puerto Iguazú não é o centro vitivinícola da Argentina. Mendoza fica a mais de mil quilômetros. As vinícolas de Salta, de San Juan, de La Rioja estão do outro lado do país. E ainda assim, a cada setembro, produtores, enólogos e famílias inteiras embarcam com seus rótulos e percorrem esse caminho até a fronteira." },
      { tipo: "p", texto: "Por quê?" },
      { tipo: "p", texto: "Porque a ODA al Vino não é uma feira de vinhos no sentido convencional da expressão. Não é um salão onde as bodegas montam estandes e esperam que os visitantes apareçam. É um encontro, no sentido mais humano da palavra. Um espaço onde quem faz o vinho e quem o bebe estão no mesmo lugar, no mesmo nível, com o mesmo interesse." },
      { tipo: "p", texto: "Essa foi sempre a intenção do evento. E é o que explica por que pessoas atravessam fronteiras (literalmente) para estar presentes." },
      { tipo: "p", texto: "E ah, o público, são pessoas que planejam a viagem com antecedência, que reservam hotel, que organizam o fim de semana em torno do evento. Não vêm apenas para beber vinho. Vêm para aprender, para descobrir, para se encontrar com outras pessoas que compartilham a mesma curiosidade." },
      { tipo: "h2", texto: "A décima edição" },
      { tipo: "p", texto: "A edição de 2026 carregava um peso diferente. Dez anos é um número que obriga a olhar para trás, e o que se vê é uma história que cresceu de maneiras que não estavam previstas." },
      { tipo: "p", texto: "Cento e cinco bodegas. Mais de quinhentos e vinte e cinco rótulos. Seis restaurantes integrando gastronomia e vinho. Salas de degustação guiadas conduzidas pelos próprios produtores. Arte ao vivo. Um público que chegou sabendo o que queria e saiu tendo descoberto o que não esperava." },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-comunidad-grupo-brindis.webp", alt: "Um grupo de participantes brinda com as taças no alto durante a ODA al Vino 2026", ancho: 2000, alto: 1334 },
      { tipo: "p", texto: "A história inteira está nas conversas que aconteceram entre uma taça e outra. Nos produtores que apresentaram pessoalmente seus vinhos de alta gama para um público que os recebeu com genuína curiosidade. Na bodega boutique que chegou como novidade e conquistou o público antes mesmo do fim do primeiro dia. Nas salas que lotaram não por obrigação, mas por vontade." },
      { tipo: "h2", texto: "O que fica" },
      { tipo: "p", texto: "E quantas histórias cabem em 10 edições? Toda grande história tem um fio que a atravessa. No caso da ODA al Vino, esse fio é a convicção de que o vinho é mais interessante quando deixa de intimidar, quando se torna uma linguagem acessível, um motivo de encontro, uma porta para algo maior do que a garrafa em si." },
      { tipo: "p", texto: "Dez anos de evento são dez anos insistindo nessa ideia." },
      { tipo: "p", texto: "E o resultado não está apenas nos números de cada edição. Está no fato de que Puerto Iguazú hoje é reconhecida como destino enogastronômico na região. Está no público que volta a cada setembro e traz alguém novo. Está nas bodegas que escolhem a ODA al Vino como um dos poucos espaços onde o encontro com o consumidor acontece de verdade." },
      { tipo: "p", texto: "A décima edição não foi o fim de nada. Foi a confirmação de que o que foi plantado em 2015 cresceu o suficiente para sustentar o que ainda está por vir." },
      { tipo: "p", texto: "E o que está por vir começa agora." },
    ],
  },
];

export const historiasOrdenadas = [...historias].sort((a, b) => b.fecha.localeCompare(a.fecha));

export function getHistoria(slug: string) {
  return historias.find((h) => h.slug === slug);
}

export function getRelacionadas(h: Historia, max = 3) {
  const elegidas = (h.relacionadas ?? []).map(getHistoria).filter((x): x is Historia => !!x);
  const resto = historiasOrdenadas.filter((x) => x.slug !== h.slug && !elegidas.includes(x));
  return [...elegidas, ...resto].slice(0, max);
}

export function formatFecha(iso: string, idioma: Idioma = "es") {
  return new Date(iso + "T12:00:00").toLocaleDateString(idioma === "pt" ? "pt-BR" : "es-AR", { day: "numeric", month: "long", year: "numeric" });
}

export const ETIQUETAS: Record<Idioma, { leer: string; volver: string; otras: string; todas: string; conoce: string }> = {
  es: { leer: "Leer historia →", volver: "← Historias", otras: "Otras historias", todas: "Todas las historias", conoce: "Conocé ODA al Vino" },
  pt: { leer: "Ler história →", volver: "← Histórias", otras: "Outras histórias", todas: "Todas as histórias", conoce: "Conheça a ODA al Vino" },
};

export const LANG_TAG: Record<Idioma, string> = { es: "es-AR", pt: "pt-BR" };
