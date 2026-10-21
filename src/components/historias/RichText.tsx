import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function RichText({ texto }: { texto: string }) {
  const partes: React.ReactNode[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(LINK)) {
    const [completo, label, href] = m;
    partes.push(texto.slice(ultimo, m.index));
    const externo = /^https?:\/\//.test(href);
    partes.push(
      externo ? (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-wine/40 underline-offset-4 hover:decoration-wine">
          {label}
        </a>
      ) : (
        <Link key={m.index} href={href} className="underline decoration-wine/40 underline-offset-4 hover:decoration-wine">
          {label}
        </Link>
      )
    );
    ultimo = m.index! + completo.length;
  }
  partes.push(texto.slice(ultimo));
  return <>{partes}</>;
}
