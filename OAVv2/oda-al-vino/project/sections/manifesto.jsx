function Manifesto() {
  const t = useT();
  return (
    <section id="manifiesto" className="tex-wine grain" style={{color:"var(--paper)", padding:"140px 0 120px", position:"relative", overflow:"hidden"}}>
      <img src="assets/fondovioleta.svg" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.08, mixBlendMode:"screen"}} aria-hidden />

      {/* decorative copa */}
      <div style={{position:"absolute", top:"15%", right:"4%", width:"clamp(140px, 15vw, 240px)", opacity:0.85}} className="bob">
        <img src="assets/copa2.png" style={{width:"100%"}} />
      </div>
      <div style={{position:"absolute", bottom:"10%", left:"3%", width:"clamp(120px, 12vw, 200px)", opacity:0.75}} className="bob" data-delay>
        <img src="assets/copa5.png" style={{width:"100%", animationDelay:"-2s"}} />
      </div>

      <div style={{maxWidth:1320, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:2}}>
        <div style={{textAlign:"center", maxWidth:980, margin:"0 auto"}}>
          <Reveal><OrnamentalLine color="var(--paper)" /></Reveal>
          <Reveal delay={1}><Eyebrow color="var(--paper)" className="" >{t.manifesto.eyebrow}</Eyebrow></Reveal>

          <div style={{marginTop:40}}>
            <Reveal variant="clip">
              <h2 style={{fontFamily:"var(--serif)", fontSize:"clamp(3rem, 8vw, 8rem)", lineHeight:0.9, textTransform:"uppercase", letterSpacing:"0.02em"}}>
                {t.manifesto.line1} <span className="script" style={{fontSize:"1.32em", color:"var(--paper)", display:"inline-block", lineHeight:0.6, padding:"0 0.08em", textShadow:"0 2px 20px rgba(0,0,0,0.2)"}}>{t.manifesto.script}</span>
              </h2>
            </Reveal>
            <Reveal variant="clip" delay={1}>
              <h2 style={{fontFamily:"var(--serif)", fontSize:"clamp(1.75rem, 4.3vw, 4rem)", lineHeight:0.95, textTransform:"uppercase", marginTop:20, fontWeight:400, opacity:0.85, letterSpacing:"0.03em", textWrap:"balance"}}>
                {t.manifesto.line2}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={3}>
            <p style={{fontSize:"clamp(16px, 1.3vw, 19px)", lineHeight:1.7, maxWidth:720, margin:"54px auto 0", opacity:0.82, textWrap:"pretty"}}>
              {t.manifesto.body}
            </p>
          </Reveal>

          <Reveal delay={4}>
            <div style={{marginTop:56}}>
              <OrnamentalLine color="var(--paper)" />
              <p className="lato-expanded" style={{fontSize:11, marginTop:18, opacity:0.55, letterSpacing:"0.5em"}}>{t.manifesto.tags}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScaleBlock() {
  const t = useT();
  return (
    <>
      <Marquee text={`ODA AL VINO · 10° EDICIÓN · 4 Y 5 SEPTIEMBRE · IGUAZÚ · ARGENTINA · EL VINO NOS REÚNE · `} variant="dark" />
      <section className="tex-paper" style={{padding:"120px 0 120px", position:"relative"}}>
        <div style={{maxWidth:1440, margin:"0 auto", padding:"0 40px"}}>
          <div style={{textAlign:"center", marginBottom:80}}>
            <Reveal><Eyebrow color="var(--wine)" className="">{t.scale.eyebrow}</Eyebrow></Reveal>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:40, borderTop:"1px solid rgba(71,7,44,0.15)"}}>
            {t.scale.stats.map((s, i) => (
              <Reveal key={i} delay={i}>
                <div style={{padding:"50px 20px 40px", borderRight: i < t.scale.stats.length-1 ? "1px solid rgba(71,7,44,0.15)" : "none", position:"relative"}}>
                  <p style={{fontFamily:"var(--serif)", fontSize:"clamp(4rem, 8vw, 8rem)", lineHeight:0.85, color:"var(--wine)", letterSpacing:"-0.02em", textTransform:"none"}}>{s.n}</p>
                  <p className="script" style={{fontSize:"clamp(2rem, 3vw, 3rem)", color:"var(--plum)", lineHeight:0.9, marginTop:-10}}>{s.t.toLowerCase()}</p>
                  <p className="lato-expanded" style={{fontSize:10, opacity:0.6, marginTop:18, letterSpacing:"0.42em", color:"var(--wine)"}}>{s.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { Manifesto, ScaleBlock });
