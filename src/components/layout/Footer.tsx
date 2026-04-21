const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Manifiesto", href: "#manifiesto" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Entradas", href: "#tickets" },
  { label: "Destino", href: "#iguazu" },
];

export function Footer() {
  return (
    <footer className="bg-paper border-t border-wine/8">
      {/* Strip de personajes como separador superior */}
      <div className="border-b border-wine/5 overflow-hidden">
        <img
          src="/oda/Graphics/copas y personajes.webp"
          alt=""
          aria-hidden="true"
          className="w-full max-w-5xl mx-auto object-contain py-4 px-8 md:px-16"
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mb-16">

          {/* Logo */}
          <img
            src="/oda/brand/logo_violeta_horizontal.svg"
            alt="ODA al Vino"
            className="h-10 w-auto"
          />

          {/* Navegación */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] font-bold uppercase tracking-[0.34em] text-wine/50 hover:text-wine transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Fecha */}
          <div className="text-right hidden md:block">
            <p className="font-serif italic text-wine/25 text-sm">4 y 5 de Septiembre</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-wine/20">Iguazú · Argentina</p>
          </div>
        </div>

        {/* Base */}
        <div className="border-t border-wine/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wine/25">
            Oda Vinoteca © 2026 — Todos los derechos reservados
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wine/20">
            10° Edición OAV · 25 Años ODA
          </p>
        </div>
      </div>

      {/* Logo grande al pie */}
      <div className="overflow-hidden py-6 border-t border-wine/5">
        <img
          src="/oda/brand/logo_violeta_horizontal.svg"
          alt=""
          aria-hidden="true"
          className="h-20 md:h-28 w-auto opacity-[0.04] mx-auto select-none"
        />
      </div>
    </footer>
  );
}
