import Link from "next/link";

// Admite **negrita** y enlaces [texto](/ruta) o [texto](https://...).
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

const linkClass = "underline decoration-wine/40 underline-offset-4 hover:decoration-wine";

export function RichText({ texto }: { texto: string }) {
  const partes: React.ReactNode[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(TOKEN)) {
    const [completo, negrita, label, href] = m;
    partes.push(texto.slice(ultimo, m.index));
    if (negrita !== undefined) {
      partes.push(
        <strong key={m.index} className="font-bold text-wine">
          <RichText texto={negrita} />
        </strong>
      );
    } else if (/^https?:\/\//.test(href)) {
      partes.push(
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <RichText texto={label} />
        </a>
      );
    } else {
      partes.push(
        <Link key={m.index} href={href} className={linkClass}>
          <RichText texto={label} />
        </Link>
      );
    }
    ultimo = m.index! + completo.length;
  }
  partes.push(texto.slice(ultimo));
  return <>{partes}</>;
}
