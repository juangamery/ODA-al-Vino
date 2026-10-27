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
  /** slug de la misma historia en el otro idioma */
  traduccion?: string;

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
    slug: "diez-ediciones-una-historia",
    idioma: "es",
    traduccion: "dez-edicoes-uma-historia",
    titulo: "Diez ediciones, una historia: lo que ODA al Vino construyó en Puerto Iguazú",
    bajada: "Hay eventos que suceden. Y hay eventos que quedan.",
    descripcionSeo:
      "ODA al Vino llegó a su décima edición en 2026. La trayectoria del encuentro que, desde 2015, reúne a bodegas argentinas y amantes del vino en Puerto Iguazú.",
    fecha: "2026-10-27",
    autor: "Equipo ODA al Vino",
    imagen: {
      src: "/oda/gallery/oav26/oav26-muro-bodegas-oda-al-vino.webp",
      alt: "Muro de bienvenida de ODA al Vino 2026, con nombres de bodegas participantes y piezas de ediciones anteriores",
      ancho: 2000,
      alto: 1334,
    },
    cuerpo: [
      { tipo: "p", texto: "La diferencia rara vez está en el tamaño: está en lo que dejan atrás cuando las puertas se cierran y la gente vuelve a casa. Está en lo que sigue existiendo después de que se sirve la última copa y se guarda la última botella." },
      { tipo: "p", texto: "ODA al Vino llegó a su [décima edición](/#oav-2026) en septiembre de 2026. Y mirar ese número (diez) es mirar una trayectoria que empezó pequeña, con una idea simple, y fue creciendo no por casualidad, sino por la insistencia en hacer algo que valiera la pena." },
      { tipo: "h2", texto: "El comienzo" },
      { tipo: "p", texto: "Todo empezó en 2015 como un evento para los clientes de ODA Vinoteca. Una reunión de personas a las que les gustaba el vino, que querían probar, conversar y descubrir. Cuarenta y seis bodegas aceptaron la invitación en aquella primera edición. El resultado fue una tarde que se transformó en noche, y en algo que nadie quería que terminara." },
      { tipo: "p", texto: "Lo que pasó en los años siguientes fue la confirmación de que aquello no había sido suerte." },
      { tipo: "p", texto: "La segunda edición reunió a más de sesenta bodegas. La tercera incorporó por primera vez una degustación exclusiva para profesionales de la hotelería y la gastronomía. La cuarta consolidó el evento como referencia en el mundo del vino argentino. En 2019 ya eran más de ochenta y cinco bodegas y mil quinientos participantes reunidos bajo la premisa de sentir, conocer y deleitarse." },
      { tipo: "p", texto: "La pandemia interrumpió el calendario, como interrumpió tantas otras cosas. Pero en 2022 el evento volvió, con inscripciones online, con más de cien bodegas expositoras y con la certeza de que lo construido resistía al tiempo y a las circunstancias." },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-muro-25-anos-historia.webp", alt: "Muro «25 años de historia, 10 años de encuentros» con fotos de la trayectoria de ODA Vinoteca y ODA al Vino", ancho: 1334, alto: 2000 },
      { tipo: "h2", texto: "Lo que hace que ODA al Vino sea lo que es" },
      { tipo: "p", texto: "Puerto Iguazú no es el centro vitivinícola de la Argentina. Mendoza está a más de mil kilómetros. Las bodegas de Salta, de San Juan, de La Rioja están del otro lado del país. Y aun así, cada septiembre, productores, enólogos y familias enteras viajan con sus etiquetas y recorren ese camino hasta la frontera." },
      { tipo: "p", texto: "¿Por qué?" },
      { tipo: "p", texto: "Porque ODA al Vino no es una feria de vinos en el sentido convencional de la expresión. No es un salón donde las bodegas arman sus stands y esperan que aparezcan los visitantes. Es un encuentro, en el sentido más humano de la palabra. Un espacio donde quien hace el vino y quien lo toma están en el mismo lugar, al mismo nivel, con el mismo interés." },
      { tipo: "p", texto: "Esa fue siempre la intención del evento. Y es lo que explica por qué hay personas que cruzan fronteras (literalmente) para estar presentes." },
      { tipo: "p", texto: "Y ah, el público: son personas que planifican el viaje con anticipación, que reservan hotel, que organizan el fin de semana en torno al evento. No vienen solo a tomar vino. Vienen a aprender, a descubrir, a encontrarse con otras personas que comparten la misma curiosidad." },
      { tipo: "h2", texto: "La décima edición" },
      { tipo: "p", texto: "La edición 2026 tenía un peso distinto. Diez años es un número que obliga a mirar hacia atrás, y lo que se ve es una historia que creció de maneras que no estaban previstas." },
      { tipo: "p", texto: "Ciento cinco bodegas. Más de quinientas veinticinco etiquetas. Seis restaurantes integrando gastronomía y vino. Salas de degustación guiadas conducidas por los propios productores. Arte en vivo. Un público que llegó sabiendo lo que quería y se fue habiendo descubierto lo que no esperaba." },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-comunidad-grupo-brindis.webp", alt: "Un grupo de participantes brinda con las copas en alto durante ODA al Vino 2026", ancho: 2000, alto: 1334 },
      { tipo: "p", texto: "La historia completa está en las conversaciones que sucedieron entre una copa y otra. En los productores que presentaron personalmente sus vinos de alta gama a un público que los recibió con genuina curiosidad. En la bodega boutique que llegó como novedad y conquistó al público antes incluso de que terminara el primer día. En las salas que se llenaron no por obligación, sino por ganas." },
      { tipo: "h2", texto: "Lo que queda" },
      { tipo: "p", texto: "¿Y cuántas historias caben en 10 ediciones? Toda gran historia tiene un hilo que la atraviesa. En el caso de ODA al Vino, ese hilo es la convicción de que el vino es más interesante cuando deja de intimidar, cuando se vuelve un lenguaje accesible, un motivo de encuentro, una puerta hacia algo más grande que la botella en sí." },
      { tipo: "p", texto: "Diez años de evento son diez años insistiendo en esa idea." },
      { tipo: "p", texto: "Y el resultado no está solo en los números de cada edición. Está en que Puerto Iguazú hoy es reconocida como destino enogastronómico en la región. Está en el público que vuelve cada septiembre y trae a alguien nuevo. Está en las bodegas que eligen ODA al Vino como uno de los pocos espacios donde el encuentro con el consumidor sucede de verdad." },
      { tipo: "p", texto: "La décima edición no fue el final de nada. Fue la confirmación de que lo que se sembró en 2015 creció lo suficiente para sostener lo que todavía está por venir." },
      { tipo: "p", texto: "Y lo que está por venir empieza ahora." },
    ],
  },
  {
    slug: "dez-edicoes-uma-historia",
    idioma: "pt",
    traduccion: "diez-ediciones-una-historia",
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

/** Una entrada por historia: la versión en `idioma` si existe, si no la original. */
export function historiasEnIdioma(idioma: Idioma) {
  return historiasOrdenadas.filter((h) => h.idioma === idioma || !h.traduccion || !getHistoria(h.traduccion));
}

export function getRelacionadas(h: Historia, max = 3) {
  const pool = historiasEnIdioma(h.idioma).filter((x) => x.slug !== h.slug && x.slug !== h.traduccion);
  const elegidas = (h.relacionadas ?? []).map(getHistoria).filter((x): x is Historia => !!x && pool.includes(x));
  const resto = pool.filter((x) => !elegidas.includes(x));
  return [...elegidas, ...resto].slice(0, max);
}

export function formatFecha(iso: string, idioma: Idioma = "es") {
  return new Date(iso + "T12:00:00").toLocaleDateString(idioma === "pt" ? "pt-BR" : "es-AR", { day: "numeric", month: "long", year: "numeric" });
}

export const ETIQUETAS: Record<Idioma, { leer: string; volver: string; otras: string; todas: string; conoce: string; otroIdioma: string }> = {
  es: { leer: "Leer historia →", volver: "← Historias", otras: "Otras historias", todas: "Todas las historias", conoce: "Conocé ODA al Vino", otroIdioma: "Ler em português" },
  pt: { leer: "Ler história →", volver: "← Histórias", otras: "Outras histórias", todas: "Todas as histórias", conoce: "Conheça a ODA al Vino", otroIdioma: "Leer en español" },
};

export const LANG_TAG: Record<Idioma, string> = { es: "es-AR", pt: "pt-BR" };
