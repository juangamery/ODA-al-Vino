// Artículos de "Historias de ODA Al Vino".
// La sección, el menú, el footer y el sitemap se activan solos cuando hay al menos un artículo.
// Los textos se cargan tal como fueron redactados; no completar con contenido de relleno.

export type Bloque =
  | { tipo: "p"; texto: string } // admite **negrita** y enlaces [texto](/ruta)
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "cita"; texto: string } // frase destacada en grande
  | { tipo: "img"; src: string; alt: string; ancho: number; alto: number; epigrafe?: string }
  // Recuadro de datos clave al inicio: frases cortas y autocontenidas (útil para buscadores e IA)
  | { tipo: "resumen"; titulo: string; items: string[] }
  | { tipo: "linea"; titulo: string; items: { marca: string; texto: string }[] }
  | { tipo: "faq"; titulo: string; items: { pregunta: string; respuesta: string }[] };

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
  /** "AAAA-MM-DD", última revisión del contenido */
  actualizado?: string;
  autor: string;
  palabrasClave?: string[];
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
    tituloSeo: "Historia de ODA al Vino: 10 ediciones en Puerto Iguazú",
    descripcionSeo:
      "ODA al Vino llegó a su décima edición en 2026. La trayectoria del encuentro que, desde 2015, reúne a bodegas argentinas y amantes del vino en Puerto Iguazú.",
    fecha: "2026-10-27",
    actualizado: "2026-11-03",
    autor: "Equipo ODA al Vino",
    palabrasClave: ["ODA al Vino", "vino argentino", "Puerto Iguazú", "Triple Frontera", "evento de vinos", "bodegas argentinas", "degustación de vinos", "ODA Vinoteca"],
    imagen: {
      src: "/oda/gallery/oav26/oav26-muro-bodegas-oda-al-vino.webp",
      alt: "Muro de bienvenida de ODA al Vino 2026, con nombres de bodegas participantes y piezas de ediciones anteriores",
      ancho: 2000,
      alto: 1334,
    },
    cuerpo: [
      { tipo: "resumen", titulo: "En pocas palabras", items: ["**ODA al Vino** es un encuentro dedicado al vino argentino que se realiza cada septiembre en **Puerto Iguazú (Misiones, Argentina)**, en la Triple Frontera con Brasil y Paraguay.", "Nació en **2015** como un evento para los clientes de **ODA Vinoteca**, con **46 bodegas**.", "Su **décima edición** se realizó el **4 y 5 de septiembre de 2026** y reunió **105 bodegas, más de 525 etiquetas y seis restaurantes**.", "Su diferencial: no es una feria convencional, sino **un encuentro entre quienes hacen el vino y quienes lo toman**, con degustaciones guiadas por los propios productores."] },
      { tipo: "p", texto: "La diferencia rara vez está en el tamaño: está en **lo que dejan atrás cuando las puertas se cierran** y la gente vuelve a casa. Está en lo que sigue existiendo después de que se sirve la última copa y se guarda la última botella." },
      { tipo: "p", texto: "ODA al Vino llegó a su [décima edición](/#oav-2026) en **septiembre de 2026**. Y mirar ese número (diez) es mirar una trayectoria que empezó pequeña, con una idea simple, y fue creciendo no por casualidad, sino **por la insistencia en hacer algo que valiera la pena**." },
      { tipo: "h2", texto: "El comienzo" },
      { tipo: "h3", texto: "2015 · La primera edición" },
      { tipo: "p", texto: "Todo empezó en 2015 como **un evento para los clientes de ODA Vinoteca**. Una reunión de personas a las que les gustaba el vino, que querían probar, conversar y descubrir. **Cuarenta y seis bodegas** aceptaron la invitación en aquella primera edición. El resultado fue una tarde que se transformó en noche, y en algo que nadie quería que terminara." },
      { tipo: "p", texto: "Lo que pasó en los años siguientes fue la confirmación de que aquello no había sido suerte." },
      { tipo: "h3", texto: "Edición tras edición: de 46 a más de 100 bodegas" },
      { tipo: "p", texto: "La segunda edición reunió a **más de sesenta bodegas**. La tercera incorporó por primera vez **una degustación exclusiva para profesionales** de la hotelería y la gastronomía. La cuarta consolidó el evento como **referencia en el mundo del vino argentino**. En 2019 ya eran **más de ochenta y cinco bodegas y mil quinientos participantes** reunidos bajo la premisa de sentir, conocer y deleitarse." },
      { tipo: "h3", texto: "2022 · La vuelta" },
      { tipo: "p", texto: "La pandemia interrumpió el calendario, como interrumpió tantas otras cosas. Pero **en 2022 el evento volvió**, con inscripciones online, con **más de cien bodegas expositoras** y con la certeza de que lo construido resistía al tiempo y a las circunstancias." },
      { tipo: "linea", titulo: "Diez ediciones en el tiempo", items: [{"marca": "2015 · 1.ª edición", "texto": "Evento para los clientes de ODA Vinoteca, con 46 bodegas."}, {"marca": "2.ª edición", "texto": "Más de 60 bodegas."}, {"marca": "3.ª edición", "texto": "Primera degustación exclusiva para profesionales de la hotelería y la gastronomía."}, {"marca": "4.ª edición", "texto": "Se consolida como referencia en el mundo del vino argentino."}, {"marca": "2019", "texto": "Más de 85 bodegas y 1.500 participantes."}, {"marca": "2020–2021", "texto": "La pandemia interrumpe el calendario."}, {"marca": "2022", "texto": "El evento vuelve, con inscripciones online y más de 100 bodegas."}, {"marca": "2026 · 10.ª edición", "texto": "105 bodegas, más de 525 etiquetas, seis restaurantes, salas de degustación guiadas y arte en vivo."}] },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-muro-25-anos-historia.webp", alt: "Muro «25 años de historia, 10 años de encuentros» con fotos de la trayectoria de ODA Vinoteca y ODA al Vino", ancho: 1334, alto: 2000 },
      { tipo: "h2", texto: "Lo que hace que ODA al Vino sea lo que es" },
      { tipo: "p", texto: "Puerto Iguazú no es el centro vitivinícola de la Argentina. Mendoza está a más de mil kilómetros. Las bodegas de Salta, de San Juan, de La Rioja están del otro lado del país. Y aun así, **cada septiembre, productores, enólogos y familias enteras viajan con sus etiquetas** y recorren ese camino hasta la frontera." },
      { tipo: "p", texto: "¿Por qué?" },
      { tipo: "h3", texto: "Un encuentro de vino argentino, no una feria" },
      { tipo: "p", texto: "Porque ODA al Vino **no es una feria de vinos en el sentido convencional** de la expresión. No es un salón donde las bodegas arman sus stands y esperan que aparezcan los visitantes. **Es un encuentro, en el sentido más humano de la palabra.**" },
      { tipo: "cita", texto: "Un espacio donde quien hace el vino y quien lo toma están en el mismo lugar, al mismo nivel, con el mismo interés." },
      { tipo: "p", texto: "Esa fue siempre la intención del evento. Y es lo que explica por qué hay personas que **cruzan fronteras (literalmente)** para estar presentes." },
      { tipo: "h3", texto: "Un público que cruza la Triple Frontera para descubrir" },
      { tipo: "p", texto: "Y ah, el público: son personas que **planifican el viaje con anticipación**, que reservan hotel, que organizan el fin de semana en torno al evento. No vienen solo a tomar vino. **Vienen a aprender, a descubrir, a encontrarse** con otras personas que comparten la misma curiosidad." },
      { tipo: "h2", texto: "La décima edición" },
      { tipo: "p", texto: "La edición 2026 tenía un peso distinto. Diez años es un número que obliga a mirar hacia atrás, y lo que se ve es una historia que creció de maneras que no estaban previstas." },
      { tipo: "p", texto: "**[Ciento cinco bodegas](/#bodegas). Más de quinientas veinticinco etiquetas. [Seis restaurantes](/#sponsors)** integrando gastronomía y vino. **[Salas de degustación guiadas](/#oav-2026)** conducidas por los propios productores. **Arte en vivo.** Un público que llegó sabiendo lo que quería y se fue habiendo descubierto lo que no esperaba." },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-comunidad-grupo-brindis.webp", alt: "Un grupo de participantes brinda con las copas en alto durante ODA al Vino 2026", ancho: 2000, alto: 1334 },
      { tipo: "h3", texto: "Lo que pasó entre una copa y otra" },
      { tipo: "p", texto: "La historia completa está en las conversaciones que sucedieron entre una copa y otra. En **los [productores](/#protagonistas) que presentaron personalmente sus vinos de alta gama** a un público que los recibió con genuina curiosidad. En **la bodega boutique que llegó como novedad** y conquistó al público antes incluso de que terminara el primer día. En **las salas que se llenaron no por obligación, sino por ganas**." },
      { tipo: "h2", texto: "Lo que queda" },
      { tipo: "p", texto: "¿Y cuántas historias caben en 10 ediciones? Toda gran historia tiene un hilo que la atraviesa. En el caso de ODA al Vino, ese hilo es la convicción de que **el vino es más interesante cuando deja de intimidar**, cuando se vuelve un lenguaje accesible, un motivo de encuentro, una puerta hacia algo más grande que la botella en sí." },
      { tipo: "cita", texto: "Diez años de evento son diez años insistiendo en esa idea." },
      { tipo: "p", texto: "Y el resultado no está solo en los números de cada edición. Está en que **[Puerto Iguazú](/#iguazu) hoy es reconocida como destino enogastronómico** en la región. Está en **el público que vuelve cada septiembre y trae a alguien nuevo**. Está en las bodegas que eligen ODA al Vino como uno de los pocos espacios donde **el encuentro con el consumidor sucede de verdad**." },
      { tipo: "p", texto: "La décima edición no fue el final de nada. Fue la confirmación de que **lo que se sembró en 2015 creció lo suficiente para sostener lo que todavía está por venir**." },
      { tipo: "cita", texto: "Y lo que está por venir empieza ahora." },
      { tipo: "faq", titulo: "Preguntas frecuentes sobre ODA al Vino", items: [{"pregunta": "¿Qué es ODA al Vino?", "respuesta": "ODA al Vino es un encuentro dedicado al vino argentino, organizado por ODA Vinoteca, que se realiza cada septiembre en Puerto Iguazú, en la Triple Frontera. Reúne en un mismo espacio a bodegas, productores, enólogos y amantes del vino."}, {"pregunta": "¿Cuándo comenzó ODA al Vino?", "respuesta": "En 2015, como un evento para los clientes de ODA Vinoteca. En esa primera edición participaron 46 bodegas."}, {"pregunta": "¿Dónde se realiza ODA al Vino?", "respuesta": "En Puerto Iguazú, provincia de Misiones, Argentina, en la Triple Frontera con Brasil y Paraguay. Cada año viajan hasta allí bodegas de Mendoza, Salta, San Juan, La Rioja y otras regiones del país."}, {"pregunta": "¿Cuántas bodegas participaron en la décima edición?", "respuesta": "La décima edición, realizada el 4 y 5 de septiembre de 2026, reunió 105 bodegas, más de 525 etiquetas y seis restaurantes, con salas de degustación guiadas por los propios productores y arte en vivo."}, {"pregunta": "¿En qué se diferencia ODA al Vino de una feria de vinos?", "respuesta": "No es un salón donde las bodegas esperan a los visitantes, sino un encuentro donde quien hace el vino y quien lo toma están al mismo nivel. El público viene a aprender y a descubrir, no solo a degustar."}, {"pregunta": "¿Dónde puedo ver fotos de la décima edición?", "respuesta": "En la [galería de la décima edición](/#galeria), que también da acceso al archivo fotográfico completo de ODA al Vino 2026."}, {"pregunta": "¿Cuándo será la próxima edición?", "respuesta": "Las novedades de la próxima edición se comparten por los canales oficiales de ODA al Vino. Podés consultar las [preguntas frecuentes](/faq) o suscribirte a las novedades al pie de esta página."}] },
    ],
  },
  {
    slug: "dez-edicoes-uma-historia",
    idioma: "pt",
    traduccion: "diez-ediciones-una-historia",
    titulo: "Dez edições, uma história: o que a ODA al Vino construiu em Puerto Iguazú",
    bajada: "Há eventos que acontecem. E há eventos que ficam.",
    tituloSeo: "História da ODA al Vino: 10 edições em Puerto Iguazú",
    descripcionSeo:
      "A ODA al Vino chegou à décima edição em 2026. A trajetória do encontro que, desde 2015, reúne bodegas argentinas e amantes do vinho em Puerto Iguazú.",
    fecha: "2026-10-27",
    actualizado: "2026-11-03",
    autor: "Equipe ODA al Vino",
    palabrasClave: ["ODA al Vino", "vinho argentino", "Puerto Iguazú", "Tríplice Fronteira", "evento de vinhos", "vinícolas argentinas", "degustação de vinhos", "ODA Vinoteca"],
    imagen: {
      src: "/oda/gallery/oav26/oav26-muro-bodegas-oda-al-vino.webp",
      alt: "Muro de boas-vindas da ODA al Vino 2026, com nomes de bodegas participantes e peças de edições anteriores",
      ancho: 2000,
      alto: 1334,
    },
    cuerpo: [
      { tipo: "resumen", titulo: "Em poucas palavras", items: ["A **ODA al Vino** é um encontro dedicado ao vinho argentino que acontece todo mês de setembro em **Puerto Iguazú (Misiones, Argentina)**, na Tríplice Fronteira com o Brasil e o Paraguai.", "Nasceu em **2015** como um evento para os clientes da **ODA Vinoteca**, com **46 bodegas**.", "A **décima edição** foi realizada em **4 e 5 de setembro de 2026** e reuniu **105 bodegas, mais de 525 rótulos e seis restaurantes**.", "O diferencial: não é uma feira convencional, mas **um encontro entre quem faz o vinho e quem o bebe**, com degustações guiadas pelos próprios produtores."] },
      { tipo: "p", texto: "A diferença raramente está no tamanho, está **no que eles deixam para trás quando as portas se fecham** e as pessoas voltam para casa. Está no que continua existindo depois que a última taça é servida e a última garrafa é guardada." },
      { tipo: "p", texto: "A ODA al Vino chegou à sua [décima edição](/#oav-2026) em **setembro de 2026**. E olhar para esse número (dez) é olhar para uma trajetória que começou pequena, com uma ideia simples, e foi crescendo não por acaso, mas **pela insistência em fazer algo que valesse a pena ser feito**." },
      { tipo: "h2", texto: "O começo" },
      { tipo: "h3", texto: "2015 · A primeira edição" },
      { tipo: "p", texto: "Tudo começou em 2015 como **um evento para os clientes da ODA Vinoteca**. Uma reunião de pessoas que gostavam de vinho, que queriam experimentar, conversar e descobrir. **Quarenta e seis bodegas** aceitaram o convite naquela primeira edição. O resultado foi uma tarde que se transformou em noite, e em algo que ninguém queria que terminasse." },
      { tipo: "p", texto: "O que aconteceu nos anos seguintes foi a confirmação de que aquilo não tinha sido sorte." },
      { tipo: "h3", texto: "Edição após edição: de 46 a mais de 100 bodegas" },
      { tipo: "p", texto: "A segunda edição trouxe **mais de sessenta bodegas**. A terceira introduziu pela primeira vez **uma degustação exclusiva para profissionais** da hotelaria e gastronomia. A quarta consolidou o evento como **referência no mundo do vinho argentino**. Em 2019, já eram **mais de oitenta e cinco bodegas e mil e quinhentos participantes** reunidos sob a premissa de sentir, conhecer e deleitar." },
      { tipo: "h3", texto: "2022 · A volta" },
      { tipo: "p", texto: "A pandemia interrompeu o calendário, como interrompeu tantas outras coisas. Mas **em 2022 o evento voltou**, com inscrições online, com **mais de cem bodegas expositoras** e com a certeza de que o que havia sido construído resistia ao tempo e às circunstâncias." },
      { tipo: "linea", titulo: "Dez edições no tempo", items: [{"marca": "2015 · 1ª edição", "texto": "Evento para os clientes da ODA Vinoteca, com 46 bodegas."}, {"marca": "2ª edição", "texto": "Mais de 60 bodegas."}, {"marca": "3ª edição", "texto": "Primeira degustação exclusiva para profissionais da hotelaria e gastronomia."}, {"marca": "4ª edição", "texto": "Consolida-se como referência no mundo do vinho argentino."}, {"marca": "2019", "texto": "Mais de 85 bodegas e 1.500 participantes."}, {"marca": "2020–2021", "texto": "A pandemia interrompe o calendário."}, {"marca": "2022", "texto": "O evento volta, com inscrições online e mais de 100 bodegas."}, {"marca": "2026 · 10ª edição", "texto": "105 bodegas, mais de 525 rótulos, seis restaurantes, salas de degustação guiadas e arte ao vivo."}] },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-muro-25-anos-historia.webp", alt: "Muro «25 años de historia, 10 años de encuentros» com fotos da trajetória da ODA Vinoteca e da ODA al Vino", ancho: 1334, alto: 2000 },
      { tipo: "h2", texto: "O que faz a ODA al Vino ser o que é" },
      { tipo: "p", texto: "Puerto Iguazú não é o centro vitivinícola da Argentina. Mendoza fica a mais de mil quilômetros. As vinícolas de Salta, de San Juan, de La Rioja estão do outro lado do país. E ainda assim, **a cada setembro, produtores, enólogos e famílias inteiras embarcam com seus rótulos** e percorrem esse caminho até a fronteira." },
      { tipo: "p", texto: "Por quê?" },
      { tipo: "h3", texto: "Um encontro de vinho argentino, não uma feira" },
      { tipo: "p", texto: "Porque a ODA al Vino **não é uma feira de vinhos no sentido convencional** da expressão. Não é um salão onde as bodegas montam estandes e esperam que os visitantes apareçam. **É um encontro, no sentido mais humano da palavra.**" },
      { tipo: "cita", texto: "Um espaço onde quem faz o vinho e quem o bebe estão no mesmo lugar, no mesmo nível, com o mesmo interesse." },
      { tipo: "p", texto: "Essa foi sempre a intenção do evento. E é o que explica por que pessoas **atravessam fronteiras (literalmente)** para estar presentes." },
      { tipo: "h3", texto: "Um público que atravessa a Tríplice Fronteira para descobrir" },
      { tipo: "p", texto: "E ah, o público, são pessoas que **planejam a viagem com antecedência**, que reservam hotel, que organizam o fim de semana em torno do evento. Não vêm apenas para beber vinho. **Vêm para aprender, para descobrir, para se encontrar** com outras pessoas que compartilham a mesma curiosidade." },
      { tipo: "h2", texto: "A décima edição" },
      { tipo: "p", texto: "A edição de 2026 carregava um peso diferente. Dez anos é um número que obriga a olhar para trás, e o que se vê é uma história que cresceu de maneiras que não estavam previstas." },
      { tipo: "p", texto: "**[Cento e cinco bodegas](/#bodegas). Mais de quinhentos e vinte e cinco rótulos. [Seis restaurantes](/#sponsors)** integrando gastronomia e vinho. **[Salas de degustação guiadas](/#oav-2026)** conduzidas pelos próprios produtores. **Arte ao vivo.** Um público que chegou sabendo o que queria e saiu tendo descoberto o que não esperava." },
      { tipo: "img", src: "/oda/gallery/oav26/oav26-comunidad-grupo-brindis.webp", alt: "Um grupo de participantes brinda com as taças no alto durante a ODA al Vino 2026", ancho: 2000, alto: 1334 },
      { tipo: "h3", texto: "O que aconteceu entre uma taça e outra" },
      { tipo: "p", texto: "A história inteira está nas conversas que aconteceram entre uma taça e outra. Nos **[produtores](/#protagonistas) que apresentaram pessoalmente seus vinhos de alta gama** para um público que os recebeu com genuína curiosidade. Na **bodega boutique que chegou como novidade** e conquistou o público antes mesmo do fim do primeiro dia. Nas **salas que lotaram não por obrigação, mas por vontade**." },
      { tipo: "h2", texto: "O que fica" },
      { tipo: "p", texto: "E quantas histórias cabem em 10 edições? Toda grande história tem um fio que a atravessa. No caso da ODA al Vino, esse fio é a convicção de que **o vinho é mais interessante quando deixa de intimidar**, quando se torna uma linguagem acessível, um motivo de encontro, uma porta para algo maior do que a garrafa em si." },
      { tipo: "cita", texto: "Dez anos de evento são dez anos insistindo nessa ideia." },
      { tipo: "p", texto: "E o resultado não está apenas nos números de cada edição. Está no fato de que **[Puerto Iguazú](/#iguazu) hoje é reconhecida como destino enogastronômico** na região. Está no **público que volta a cada setembro e traz alguém novo**. Está nas bodegas que escolhem a ODA al Vino como um dos poucos espaços onde **o encontro com o consumidor acontece de verdade**." },
      { tipo: "p", texto: "A décima edição não foi o fim de nada. Foi a confirmação de que **o que foi plantado em 2015 cresceu o suficiente para sustentar o que ainda está por vir**." },
      { tipo: "cita", texto: "E o que está por vir começa agora." },
      { tipo: "faq", titulo: "Perguntas frequentes sobre a ODA al Vino", items: [{"pregunta": "O que é a ODA al Vino?", "respuesta": "A ODA al Vino é um encontro dedicado ao vinho argentino, organizado pela ODA Vinoteca, que acontece todo mês de setembro em Puerto Iguazú, na Tríplice Fronteira. Reúne no mesmo espaço bodegas, produtores, enólogos e amantes do vinho."}, {"pregunta": "Quando começou a ODA al Vino?", "respuesta": "Em 2015, como um evento para os clientes da ODA Vinoteca. Nessa primeira edição participaram 46 bodegas."}, {"pregunta": "Onde acontece a ODA al Vino?", "respuesta": "Em Puerto Iguazú, província de Misiones, Argentina, na Tríplice Fronteira com o Brasil e o Paraguai. Todos os anos chegam até lá bodegas de Mendoza, Salta, San Juan, La Rioja e outras regiões do país."}, {"pregunta": "Quantas bodegas participaram da décima edição?", "respuesta": "A décima edição, realizada em 4 e 5 de setembro de 2026, reuniu 105 bodegas, mais de 525 rótulos e seis restaurantes, com salas de degustação guiadas pelos próprios produtores e arte ao vivo."}, {"pregunta": "Qual é a diferença entre a ODA al Vino e uma feira de vinhos?", "respuesta": "Não é um salão onde as bodegas esperam os visitantes, mas um encontro onde quem faz o vinho e quem o bebe estão no mesmo nível. O público vem para aprender e descobrir, não apenas para degustar."}, {"pregunta": "Onde posso ver fotos da décima edição?", "respuesta": "Na [galeria da décima edição](/#galeria), que também dá acesso ao arquivo fotográfico completo da ODA al Vino 2026."}, {"pregunta": "Quando será a próxima edição?", "respuesta": "As novidades da próxima edição são divulgadas pelos canais oficiais da ODA al Vino. Você pode consultar as [perguntas frequentes](/faq) ou se inscrever para receber novidades no rodapé desta página."}] },
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

export const ETIQUETAS: Record<
  Idioma,
  { leer: string; volver: string; otras: string; todas: string; conoce: string; otroIdioma: string; inicio: string; historias: string; lectura: string; actualizado: string }
> = {
  es: { leer: "Leer historia →", volver: "← Historias", otras: "Otras historias", todas: "Todas las historias", conoce: "Conocé ODA al Vino", otroIdioma: "Ler em português", inicio: "Inicio", historias: "Historias", lectura: "min de lectura", actualizado: "Actualizado" },
  pt: { leer: "Ler história →", volver: "← Histórias", otras: "Outras histórias", todas: "Todas as histórias", conoce: "Conheça a ODA al Vino", otroIdioma: "Leer en español", inicio: "Início", historias: "Histórias", lectura: "min de leitura", actualizado: "Atualizado" },
};

function textoPlano(t: string) {
  return t.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function contarPalabras(h: Historia) {
  const partes: string[] = [h.titulo, h.bajada];
  for (const b of h.cuerpo) {
    if ("texto" in b) partes.push(b.texto);
    else if (b.tipo === "resumen") partes.push(...b.items);
    else if (b.tipo === "linea") partes.push(...b.items.map((i) => `${i.marca} ${i.texto}`));
    else if (b.tipo === "faq") partes.push(...b.items.flatMap((i) => [i.pregunta, i.respuesta]));
  }
  return textoPlano(partes.join(" ")).split(/\s+/).filter(Boolean).length;
}

export function minutosLectura(h: Historia) {
  return Math.max(1, Math.round(contarPalabras(h) / 220));
}

export { textoPlano };

export const LANG_TAG: Record<Idioma, string> = { es: "es-AR", pt: "pt-BR" };
