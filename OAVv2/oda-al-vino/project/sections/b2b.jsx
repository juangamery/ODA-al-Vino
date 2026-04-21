function B2B() {
  const t = useT();
  return (
    <section id="b2b" className="tex-plum grain" style={{padding:"140px 0", color:"var(--paper)", position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", top:"8%", right:"4%", width:"clamp(120px, 13vw, 200px)", opacity:0.85}} className="bob">
        <img src="assets/copa4.png" style={{width:"100%"}} />
      </div>

      <div style={{maxWidth:1440, margin:"0 auto", padding:"0 40px"}}>
        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1.2fr)", gap:60, alignItems:"flex-start"}} className="b2b-grid">
          <div>
            <Reveal><Eyebrow color="var(--paper)">{t.b2b.eyebrow}</Eyebrow></Reveal>
            <Reveal variant="clip" delay={1}>
              <div style={{marginTop:24}}>
                <SectionTitle before={t.b2b.titleA} script={t.b2b.script} after={t.b2b.titleB} color="var(--paper)" size="lg" />
              </div>
            </Reveal>
            <Reveal delay={2}>
              <p style={{fontSize:17, marginTop:28, opacity:0.85, lineHeight:1.55, maxWidth:480, textWrap:"pretty"}}>{t.b2b.sub}</p>
            </Reveal>
            <Reveal delay={3}>
              <div style={{marginTop:32, padding:"20px 0", borderTop:"1px solid rgba(255,245,225,0.22)", borderBottom:"1px solid rgba(255,245,225,0.22)"}}>
                <p className="fecha-flanqueo" style={{fontSize:13}}>{t.b2b.stand}</p>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <p className="lato-expanded" style={{fontSize:10, marginTop:20, opacity:0.6, letterSpacing:"0.35em", maxWidth:440, lineHeight:1.8}}>{t.b2b.contact}</p>
            </Reveal>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:16}}>
            {t.b2b.lots.map((l, i) => (
              <Reveal key={i} delay={i}>
                <div className="lift" style={{padding:"28px 32px", background:"rgba(255,245,225,0.08)", border:"1px solid rgba(255,245,225,0.15)", borderRadius:3, display:"flex", alignItems:"center", gap:24, justifyContent:"space-between", flexWrap:"wrap"}}>
                  <div>
                    <p className="lato-expanded" style={{fontSize:10, letterSpacing:"0.4em", opacity:0.7}}>{l.venc}</p>
                    <p className="fecha-flanqueo" style={{fontSize:13, marginTop:8, opacity:0.9}}>{l.date}</p>
                  </div>
                  <p style={{fontFamily:"var(--serif)", fontSize:"clamp(2rem, 3.2vw, 2.8rem)", letterSpacing:"-0.01em"}}>{l.price}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={4}>
              <p style={{fontSize:12, opacity:0.65, marginTop:14, fontStyle:"italic", lineHeight:1.6, textWrap:"pretty"}}>{t.b2b.note}</p>
            </Reveal>
            <Reveal delay={5}>
              <div style={{marginTop:10}}>
                <Btn variant="paper" size="lg">{t.b2b.cta}</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media (max-width:880px){ .b2b-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}
Object.assign(window, { B2B });
