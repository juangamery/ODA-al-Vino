import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { FooterV3 } from "@/components/sections/FooterV3";
import { HistoriaCard } from "@/components/historias/HistoriaCard";
import { RichText } from "@/components/historias/RichText";
import { ETIQUETAS, LANG_TAG, contarPalabras, formatFecha, getHistoria, getRelacionadas, historias, minutosLectura, textoPlano } from "@/lib/historias";

const SITE = "https://www.odaalvino.com.br";

export const dynamicParams = false;

export function generateStaticParams() {
  return historias.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = getHistoria(slug);
  if (!h) return {};
  const url = `${SITE}/historias/${h.slug}`;
  const title = h.tituloSeo ?? h.titulo;
  const t = h.traduccion ? getHistoria(h.traduccion) : undefined;
  return {
    title: /oda al vino/i.test(title) ? { absolute: title } : title,
    description: h.descripcionSeo,
    keywords: h.palabrasClave,
    authors: [{ name: h.autor, url: SITE }],
    alternates: {
      canonical: url,
      ...(t ? { languages: { [LANG_TAG[h.idioma]]: url, [LANG_TAG[t.idioma]]: `${SITE}/historias/${t.slug}` } } : {}),
    },
    openGraph: {
      title,
      description: h.descripcionSeo,
      url,
      type: "article",
      publishedTime: h.fecha,
      modifiedTime: h.actualizado ?? h.fecha,
      locale: h.idioma === "pt" ? "pt_BR" : "es_AR",
      authors: [h.autor],
      images: [{ url: `${SITE}${h.imagen.src}`, width: h.imagen.ancho, height: h.imagen.alto, alt: h.imagen.alt }],
    },
    twitter: { card: "summary_large_image", title, description: h.descripcionSeo, images: [`${SITE}${h.imagen.src}`] },
  };
}

export default async function HistoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = getHistoria(slug);
  if (!h) notFound();

  const relacionadas = getRelacionadas(h);
  const e = ETIQUETAS[h.idioma];
  const traduccion = h.traduccion ? getHistoria(h.traduccion) : undefined;
  const url = `${SITE}/historias/${h.slug}`;
  const faq = h.cuerpo.find((b) => b.tipo === "faq");
  const organizacion = {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "ODA al Vino",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/oda/brand/logo_crema_horizontal.svg` },
    parentOrganization: { "@type": "Organization", name: "ODA Vinoteca", url: "https://www.odavinoteca.com.ar/" },
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: h.titulo,
        alternativeHeadline: h.tituloSeo,
        description: h.descripcionSeo,
        image: [`${SITE}${h.imagen.src}`],
        datePublished: h.fecha,
        dateModified: h.actualizado ?? h.fecha,
        author: /^(Equipo|Equipe) /.test(h.autor) ? { "@id": `${SITE}/#organization` } : { "@type": "Person", name: h.autor },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: url,
        inLanguage: LANG_TAG[h.idioma],
        keywords: h.palabrasClave?.join(", "),
        wordCount: contarPalabras(h),
        isPartOf: { "@type": "WebSite", "@id": `${SITE}/#website`, name: "ODA al Vino", url: SITE },
        about: {
          "@type": "Event",
          name: "ODA al Vino 2026 — 10ª edición",
          startDate: "2026-09-04",
          endDate: "2026-09-05",
          eventStatus: "https://schema.org/EventCompleted",
          location: {
            "@type": "Place",
            name: "Puerto Iguazú",
            address: { "@type": "PostalAddress", addressLocality: "Puerto Iguazú", addressRegion: "Misiones", addressCountry: "AR" },
          },
          organizer: { "@id": `${SITE}/#organization` },
        },
        ...(traduccion ? { workTranslation: { "@id": `${SITE}/historias/${traduccion.slug}#article` } } : {}),
      },
      organizacion,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: e.inicio, item: SITE },
          { "@type": "ListItem", position: 2, name: e.historias, item: `${SITE}/historias` },
          { "@type": "ListItem", position: 3, name: h.titulo, item: url },
        ],
      },
      ...(faq && faq.tipo === "faq"
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: LANG_TAG[h.idioma],
              mainEntity: faq.items.map((q) => ({
                "@type": "Question",
                name: q.pregunta,
                acceptedAnswer: { "@type": "Answer", text: textoPlano(q.respuesta) },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <FloatingHeader />
      <main className="bg-paper text-wine">
        <article lang={LANG_TAG[h.idioma]}>
          <header className="bg-wine pt-48 md:pt-40 pb-14 md:pb-20 px-6 md:px-12">
            <div className="mx-auto max-w-3xl md:px-2">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <nav aria-label="Breadcrumb">
                  <ol className="lato-expanded flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-paper/60">
                    <li><Link href="/" className="hover:text-paper">{e.inicio}</Link></li>
                    <li aria-hidden>›</li>
                    <li><Link href="/historias" className="hover:text-paper">{e.historias}</Link></li>
                  </ol>
                </nav>
                {traduccion && (
                  <Link
                    href={`/historias/${traduccion.slug}`}
                    hrefLang={LANG_TAG[traduccion.idioma]}
                    lang={LANG_TAG[traduccion.idioma]}
                    className="lato-expanded inline-block text-[10px] uppercase tracking-[0.3em] font-bold text-paper/80 hover:text-paper border border-paper/30 rounded-full px-4 py-2"
                  >
                    {e.otroIdioma}
                  </Link>
                )}
              </div>
              <h1 className="font-serif text-[clamp(2.25rem,6vw,4.25rem)] leading-[1] uppercase text-paper mb-6 [text-wrap:balance]">{h.titulo}</h1>
              <p className="text-lg md:text-xl text-paper/80 leading-relaxed mb-8">{h.bajada}</p>
              <p className="text-sm text-paper/60">
                <time dateTime={h.fecha}>{formatFecha(h.fecha, h.idioma)}</time> · {h.autor} · {minutosLectura(h)} {e.lectura}
                {h.actualizado && h.actualizado !== h.fecha && (
                  <>
                    <br />
                    {e.actualizado}: <time dateTime={h.actualizado}>{formatFecha(h.actualizado, h.idioma)}</time>
                  </>
                )}
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6 md:px-12 -mt-2 md:mt-12">
            <Image
              src={h.imagen.src}
              alt={h.imagen.alt}
              width={h.imagen.ancho}
              height={h.imagen.alto}
              sizes="(max-width: 896px) 100vw, 896px"
              priority
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="mx-auto max-w-3xl px-6 md:px-8 py-14 md:py-20 text-lg md:text-[1.1875rem] leading-[1.75] text-wine/85">
            {h.cuerpo.map((b, i) => {
              switch (b.tipo) {
                case "h2":
                  return (
                    <h2 key={i} className="font-serif text-[1.75rem] md:text-[2.125rem] uppercase text-wine leading-[1.1] mt-16 mb-6 [text-wrap:balance]">
                      <span className="block w-10 h-[3px] bg-harvest mb-5" aria-hidden />
                      {b.texto}
                    </h2>
                  );
                case "h3":
                  return <h3 key={i} className="lato-expanded text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-plum mt-10 mb-3 [text-wrap:balance]">{b.texto}</h3>;
                case "resumen":
                  return (
                    <aside key={i} className="mb-12 rounded-xl bg-wine text-paper p-6 md:p-8">
                      <h2 className="lato-expanded text-[11px] uppercase tracking-[0.3em] font-bold text-harvest mb-4">{b.titulo}</h2>
                      <ul className="space-y-3 text-base md:text-lg leading-relaxed text-paper/90 [&_strong]:text-paper">
                        {b.items.map((it, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="text-harvest mt-[0.15em]" aria-hidden>✦</span>
                            <span className="[text-wrap:pretty]"><RichText texto={it} /></span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  );
                case "linea":
                  return (
                    <section key={i} className="my-14" aria-label={b.titulo}>
                      <h3 className="lato-expanded text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-plum mb-6">{b.titulo}</h3>
                      <ol className="relative border-l-2 border-harvest/60 ml-2 space-y-6">
                        {b.items.map((it, j) => (
                          <li key={j} className="pl-6 relative">
                            <span className="absolute -left-[9px] top-[0.45em] w-4 h-4 rounded-full bg-paper border-2 border-harvest" aria-hidden />
                            <p className="font-serif text-xl md:text-2xl uppercase text-wine leading-tight">{it.marca}</p>
                            <p className="text-base md:text-lg text-wine/80 leading-relaxed">{it.texto}</p>
                          </li>
                        ))}
                      </ol>
                    </section>
                  );
                case "faq":
                  return (
                    <section key={i} className="mt-20 pt-12 border-t border-wine/15" aria-labelledby={`faq-${i}`}>
                      <h2 id={`faq-${i}`} className="font-serif text-[1.75rem] md:text-[2.125rem] uppercase text-wine leading-[1.1] mb-8 [text-wrap:balance]">
                        <span className="block w-10 h-[3px] bg-harvest mb-5" aria-hidden />
                        {b.titulo}
                      </h2>
                      <div className="divide-y divide-wine/10">
                        {b.items.map((q, j) => (
                          <div key={j} className="py-6">
                            <h3 className="font-bold text-wine text-lg md:text-xl mb-2 [text-wrap:balance]">{q.pregunta}</h3>
                            <p className="text-base md:text-lg text-wine/80 leading-relaxed [text-wrap:pretty]"><RichText texto={q.respuesta} /></p>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                case "cita":
                  return (
                    <blockquote key={i} className="my-12 border-l-4 border-harvest pl-6 md:pl-8 font-serif text-2xl md:text-[2rem] leading-snug text-wine [text-wrap:balance]">
                      <RichText texto={b.texto} />
                    </blockquote>
                  );
                case "img":
                  return (
                    <figure key={i} className={`my-12 ${b.alto > b.ancho ? "max-w-sm mx-auto" : ""}`}>
                      <Image src={b.src} alt={b.alt} width={b.ancho} height={b.alto} sizes={b.alto > b.ancho ? "384px" : "(max-width: 768px) 100vw, 768px"} className="w-full h-auto rounded-lg" />
                      {b.epigrafe && <figcaption className="text-sm text-wine/55 mt-3">{b.epigrafe}</figcaption>}
                    </figure>
                  );
                default:
                  return <p key={i} className="mb-6 [text-wrap:pretty]"><RichText texto={b.texto} /></p>;
              }
            })}
          </div>
        </article>

        {relacionadas.length > 0 && (
          <section className="border-t border-wine/10 mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-20">
            <h2 className="font-serif text-3xl md:text-4xl uppercase text-wine mb-12">{e.otras}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relacionadas.map((r) => (
                <HistoriaCard key={r.slug} historia={r} />
              ))}
            </div>
            <div className="mt-14 flex flex-wrap gap-6">
              <Link href="/historias" className="text-xs font-bold uppercase tracking-widest text-wine underline underline-offset-4">{e.todas}</Link>
              <Link href="/" className="text-xs font-bold uppercase tracking-widest text-wine underline underline-offset-4">{e.conoce}</Link>
            </div>
          </section>
        )}
      </main>
      <FooterV3 />
      <script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
