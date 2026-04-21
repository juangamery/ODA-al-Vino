function Iguazu() {
  const t = useT();
  return (
    <section id="iguazu" className="tex-olive grain" style={{padding:"140px 0", color:"var(--paper)", position:"relative", overflow:"hidden"}}>
      <div style={{maxWidth:1500, margin:"0 auto", padding:"0 40px"}}>
        <div style={{maxWidth:900, marginBottom:70}}>
          <Reveal><Eyebrow color="var(--paper)">{t.iguazu.eyebrow}</Eyebrow></Reveal>
          <Reveal variant="clip" delay={1}>
            <div style={{marginTop:24}}>
              <SectionTitle before={t.iguazu.titleA} script={t.iguazu.script} color="var(--paper)" size="xl" />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p style={{fontSize:18, maxWidth:600, marginTop:30, opacity:0.85, lineHeight:1.55, textWrap:"pretty"}}>{t.iguazu.sub}</p>
          </Reveal>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:30}} className="ig-grid">
          {t.iguazu.items.map((it, i) => (
            <Reveal key={i} delay={i}>
              <div className="lift" style={{background:"rgba(255,245,225,0.07)", borderRadius:4, overflow:"hidden", border:"1px solid rgba(255,245,225,0.12)", height:"100%", display:"flex", flexDirection:"column"}}>
                {it.stat ? (
                  <div style={{aspectRatio:"4/3", display:"flex", alignItems:"center", justifyContent:"center", padding:30, background:"linear-gradient(135deg, rgba(255,245,225,0.08), rgba(255,245,225,0.02))"}}>
                    <div style={{textAlign:"center"}}>
                      <p style={{fontFamily:"var(--serif)", fontSize:"clamp(3rem, 5vw, 4.5rem)", lineHeight:0.9, color:"var(--harvest)"}}>R$3.500</p>
                      <p className="script" style={{fontSize:"clamp(1.5rem, 2.5vw, 2.2rem)", marginTop:6, opacity:0.9}}>gasto promedio</p>
                      <p className="lato-expanded" style={{fontSize:10, marginTop:14, opacity:0.6, letterSpacing:"0.4em"}}>USD 650 · AR$ 650.000</p>
                    </div>
                  </div>
                ) : (
                  <div className="photo-dreamy" style={{aspectRatio:"4/3", overflow:"hidden"}}>
                    <img src={it.img} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                  </div>
                )}
                <div style={{padding:24}}>
                  <h4 style={{fontFamily:"var(--serif)", fontSize:22, textTransform:"uppercase", letterSpacing:"0.03em"}}>{it.t}</h4>
                  <p style={{marginTop:10, fontSize:14, opacity:0.8, lineHeight:1.55, textWrap:"pretty"}}>{it.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width:880px){ .ig-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}
Object.assign(window, { Iguazu });
