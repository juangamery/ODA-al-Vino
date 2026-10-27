import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { FooterV3 } from "@/components/sections/FooterV3";
import { HistoriaCard } from "@/components/historias/HistoriaCard";
import { RichText } from "@/components/historias/RichText";
import { ETIQUETAS, LANG_TAG, formatFecha, getHistoria, getRelacionadas, historias } from "@/lib/historias";

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
    title,
    description: h.descripcionSeo,
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h.titulo,
    description: h.descripcionSeo,
    image: [`${SITE}${h.imagen.src}`],
    datePublished: h.fecha,
    author: { "@type": /^(Equipo|Equipe) /.test(h.autor) ? "Organization" : "Person", name: h.autor },
    publisher: {
      "@type": "Organization",
      name: "ODA Al Vino",
      logo: { "@type": "ImageObject", url: `${SITE}/oda/brand/logo_crema_horizontal.svg` },
    },
    mainEntityOfPage: `${SITE}/historias/${h.slug}`,
    inLanguage: LANG_TAG[h.idioma],
  };

  return (
    <>
      <FloatingHeader />
      <main className="bg-paper text-wine">
        <article lang={LANG_TAG[h.idioma]}>
          <header className="bg-wine pt-48 md:pt-40 pb-14 md:pb-20 px-6 md:px-12">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <Link href="/historias" className="lato-expanded inline-block text-[10px] uppercase tracking-[0.3em] font-bold text-paper/60 hover:text-paper">
                  {e.volver}
                </Link>
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
              <h1 className="font-serif text-[clamp(2.25rem,6vw,4.25rem)] leading-[1] uppercase text-paper mb-6">{h.titulo}</h1>
              <p className="text-lg md:text-xl text-paper/80 leading-relaxed mb-8">{h.bajada}</p>
              <p className="text-sm text-paper/60">
                <time dateTime={h.fecha}>{formatFecha(h.fecha, h.idioma)}</time> · {h.autor}
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

          <div className="mx-auto max-w-2xl px-6 md:px-0 py-14 md:py-20 text-lg leading-[1.8] text-wine/85">
            {h.cuerpo.map((b, i) => {
              switch (b.tipo) {
                case "h2":
                  return <h2 key={i} className="font-serif text-3xl md:text-4xl uppercase text-wine leading-tight mt-14 mb-5">{b.texto}</h2>;
                case "h3":
                  return <h3 key={i} className="font-serif text-2xl uppercase text-wine leading-tight mt-10 mb-4">{b.texto}</h3>;
                case "img":
                  return (
                    <figure key={i} className={`my-10 ${b.alto > b.ancho ? "max-w-sm mx-auto" : ""}`}>
                      <Image src={b.src} alt={b.alt} width={b.ancho} height={b.alto} sizes={b.alto > b.ancho ? "384px" : "(max-width: 672px) 100vw, 672px"} className="w-full h-auto rounded-lg" />
                      {b.epigrafe && <figcaption className="text-sm text-wine/55 mt-3">{b.epigrafe}</figcaption>}
                    </figure>
                  );
                default:
                  return <p key={i} className="mb-6"><RichText texto={b.texto} /></p>;
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
      <script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
