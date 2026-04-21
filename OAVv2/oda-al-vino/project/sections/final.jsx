function Final() {
  const t = useT();
  return (
    <section className="tex-wine grain" style={{padding:"180px 0 160px", color:"var(--paper)", position:"relative", overflow:"hidden", textAlign:"center"}}>
      <div style={{maxWidth:1200, margin:"0 auto", padding:"0 40px", position:"relative"}}>
        <Reveal><OrnamentalLine color="var(--paper)" /></Reveal>
        <Reveal delay={1}>
          <Eyebrow color="var(--paper)">10° Edición · 2026</Eyebrow>
        </Reveal>

        <Reveal variant="clip" delay={2}>
          <h2 style={{fontFamily:"var(--serif)", fontSize:"clamp(3.5rem, 11vw, 9rem)", lineHeight:0.9, textTransform:"uppercase", marginTop:36, letterSpacing:"0.01em", fontWeight:400}}>
            {t.final.titleA}
          </h2>
        </Reveal>

        <Reveal delay={3}>
          <p className="script" style={{fontSize:"clamp(3rem, 7vw, 6rem)", lineHeight:1, marginTop:24, color:"var(--paper)"}}>
            {t.final.script}
          </p>
        </Reveal>

        <Reveal delay={4}>
          <div style={{marginTop:64, display:"flex", flexDirection:"column", alignItems:"center", gap:28}}>
            <div style={{display:"flex", gap:24, alignItems:"center", flexWrap:"wrap", justifyContent:"center"}}>
              <span className="fecha-flanqueo" style={{fontSize:15, letterSpacing:"0.3em"}}>{t.final.date}</span>
              <span style={{width:1, height:18, background:"var(--paper)", opacity:0.4}}></span>
              <span className="lato-expanded" style={{fontSize:11, opacity:0.75}}>{t.final.place}</span>
            </div>
            <Btn variant="paper" size="lg" href="#entradas">{t.final.cta}</Btn>
          </div>
        </Reveal>

        <Reveal delay={5}>
          <div style={{marginTop:80}}>
            <OrnamentalLine color="var(--paper)" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
Object.assign(window, { Final });
