function Nav() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    { id: "manifiesto", label: t.nav.manifiesto },
    { id: "experiencia", label: t.nav.experiencia },
    { id: "entradas", label: t.nav.tickets },
    { id: "bodegas", label: t.nav.bodegas },
    { id: "venue", label: t.nav.venue },
    { id: "legado", label: t.nav.legado },
    { id: "iguazu", label: t.nav.iguazu },
  ];
  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:90,
        padding: scrolled ? "14px 24px" : "26px 40px",
        transition: "all .5s cubic-bezier(.22,1,.36,1)",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:24,
        background: scrolled ? "rgba(71,7,44,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        color: "var(--paper)",
        borderBottom: scrolled ? "1px solid rgba(255,245,225,0.1)" : "1px solid transparent",
      }}>
        <a href="#top" style={{display:"flex", alignItems:"center", gap:12}}>
          <img src="assets/logo_crema_horizontal.svg" alt="ODA al Vino" style={{height: scrolled ? 32 : 40, transition:"height .5s", width:"auto"}} />
        </a>

        <nav style={{display:"flex", gap:24, alignItems:"center"}} className="hide-mobile">
          {items.map(it => (
            <a key={it.id} href={`#${it.id}`} className="hover-underline" style={{fontSize:11, letterSpacing:"0.26em", textTransform:"uppercase", fontWeight:700}}>
              {it.label}
            </a>
          ))}
        </nav>

        <div style={{display:"flex", alignItems:"center", gap:14}}>
          <Btn size="sm" variant={scrolled ? "paper" : "ghost"} href="#entradas">{t.cta.buy}</Btn>
          <button onClick={() => setMobileOpen(true)} className="show-mobile" style={{color:"var(--paper)", fontSize:22, display:"none"}} aria-label="menu">☰</button>
        </div>
      </header>

      {mobileOpen && (
        <div style={{position:"fixed", inset:0, zIndex:95, background:"var(--wine)", padding:"30px", color:"var(--paper)", display:"flex", flexDirection:"column"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:40}}>
            <img src="assets/logo_crema_horizontal.svg" style={{height:36}} />
            <button onClick={() => setMobileOpen(false)} style={{color:"var(--paper)", fontSize:26}}>✕</button>
          </div>
          <nav style={{display:"flex", flexDirection:"column", gap:22}}>
            {items.map(it => (
              <a key={it.id} href={`#${it.id}`} onClick={() => setMobileOpen(false)} style={{fontFamily:"var(--serif)", fontSize:32, textTransform:"uppercase", letterSpacing:"0.04em"}}>
                {it.label}
              </a>
            ))}
            <div style={{marginTop:30}}><Btn variant="paper" href="#entradas" onClick={() => setMobileOpen(false)}>{t.cta.buy}</Btn></div>
          </nav>
        </div>
      )}
      <style>{`
        @media (max-width:960px){ .hide-mobile{display:none!important;} .show-mobile{display:inline-block!important;} }
        @media (min-width:961px){ .show-mobile{display:none!important;} }
      `}</style>
    </>
  );
}
Object.assign(window, { Nav });
