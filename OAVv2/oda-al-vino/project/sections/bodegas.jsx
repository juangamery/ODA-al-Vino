function Bodegas() {
  const t = useT();
  const [region, setRegion] = useState(0);
  return (
    <section id="bodegas" className="tex-olive grain" style={{padding:"140px 0", color:"var(--paper)", position:"relative", overflow:"hidden"}}>
      <div style={{maxWidth:1500, margin:"0 auto", padding:"0 40px"}}>
        <div style={{maxWidth:900, marginBottom:70}}>
          <Reveal><Eyebrow color="var(--paper)">{t.bodegas.eyebrow}</Eyebrow></Reveal>
          <Reveal variant="clip" delay={1}>
            <div style={{marginTop:24}}>
              <SectionTitle before={t.bodegas.titleA} script={t.bodegas.script} after={t.bodegas.titleB} color="var(--paper)" size="xl" />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p style={{fontSize:18, maxWidth:600, marginTop:30, opacity:0.82, lineHeight:1.55, textWrap:"pretty"}}>{t.bodegas.sub}</p>
          </Reveal>
        </div>

        {/* Region selector + details */}
        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1.4fr)", gap:60, marginBottom:90}} className="reg-grid">
          <div style={{display:"flex", flexDirection:"column", borderTop:"1px solid rgba(255,245,225,0.22)"}}>
            {t.bodegas.regions.map((r, i) => (
              <button key={i} onMouseEnter={() => setRegion(i)} style={{
                display:"flex", alignItems:"center", gap:18, padding:"20px 0",
                borderBottom:"1px solid rgba(255,245,225,0.22)",
                textAlign:"left", opacity: region === i ? 1 : 0.55, transition:"opacity .4s",
              }}>
                <span className="lato-expanded" style={{fontSize:11, letterSpacing:"0.42em", opacity:0.7, minWidth:50}}>{r.pct}</span>
                <span style={{flex:1, fontFamily:"var(--serif)", fontSize:"clamp(1.25rem, 2.2vw, 1.9rem)", textTransform:"uppercase", color: region === i ? "var(--paper)" : "var(--paper)", letterSpacing:"0.02em"}}>
                  {r.n}
                </span>
                <span style={{fontSize:20, transition:"transform .4s", transform: region === i ? "translateX(4px)" : ""}}>→</span>
              </button>
            ))}
          </div>
          <div>
            <div style={{position:"sticky", top:120, padding:"30px 0"}}>
              <Reveal key={region}>
                <h4 style={{fontFamily:"var(--serif)", fontSize:"clamp(2.5rem, 6vw, 5rem)", textTransform:"uppercase", lineHeight:0.9, color:"var(--paper)"}}>
                  {t.bodegas.regions[region].n}
                </h4>
                <p className="script" style={{fontSize:"clamp(2rem, 3.5vw, 3.5rem)", color:"var(--harvest)", lineHeight:0.9, marginTop:6}}>{t.bodegas.regions[region].pct}</p>
                <p style={{fontSize:17, opacity:0.8, marginTop:24, maxWidth:480, lineHeight:1.5, textWrap:"pretty"}}>
                  <span style={{fontStyle:"italic"}}>Varietales destacados:</span> {t.bodegas.regions[region].d}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Marquee of all bodegas */}
        <Reveal>
          <div style={{borderTop:"1px solid rgba(255,245,225,0.22)", borderBottom:"1px solid rgba(255,245,225,0.22)", padding:"30px 0", margin:"30px 0"}}>
            <p className="lato-expanded" style={{fontSize:10, opacity:0.55, letterSpacing:"0.42em", marginBottom:16}}>Algunas de las bodegas participantes</p>
            <div className="marquee marquee-slow" style={{margin:"0 -40px", padding:"0 40px"}}>
              <div className="marquee-track">
                {Array(2).fill(0).map((_, k) => (
                  <div key={k} style={{display:"flex", gap:34, paddingRight:34, fontFamily:"var(--serif)", fontSize:"clamp(1.1rem, 1.8vw, 1.5rem)", textTransform:"uppercase", opacity:0.9, letterSpacing:"0.03em"}}>
                    {BODEGAS.slice(0, 60).map((b, i) => (
                      <span key={i} style={{whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:34}}>
                        {b} <Star size={6} className="" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{textAlign:"center", marginTop:40}}>
            <Btn variant="paper" size="md">{t.bodegas.seeAll}</Btn>
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width:880px){ .reg-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}
Object.assign(window, { Bodegas });
