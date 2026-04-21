function Legacy() {
  const t = useT();
  const [focus, setFocus] = useState(t.legacy.timeline.length - 1);
  return (
    <section id="legado" className="tex-wine grain" style={{padding:"140px 0", color:"var(--paper)", position:"relative", overflow:"hidden"}}>
      <img src="assets/fondovioleta.svg" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.08, mixBlendMode:"screen"}} aria-hidden />

      <div style={{maxWidth:1500, margin:"0 auto", padding:"0 40px", position:"relative"}}>
        <div style={{maxWidth:900, marginBottom:70}}>
          <Reveal><Eyebrow color="var(--paper)">{t.legacy.eyebrow}</Eyebrow></Reveal>
          <Reveal variant="clip" delay={1}>
            <div style={{marginTop:24}}>
              <SectionTitle before={t.legacy.titleA} script={t.legacy.script} after={t.legacy.titleB} color="var(--paper)" size="xl" />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p style={{fontSize:18, maxWidth:600, marginTop:30, opacity:0.82, lineHeight:1.55, textWrap:"pretty"}}>{t.legacy.sub}</p>
          </Reveal>
        </div>

        {/* Timeline — horizontal scroll of years */}
        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1.1fr) minmax(0,1fr)", gap:60, alignItems:"flex-start"}} className="leg-grid">
          <div>
            <div style={{display:"flex", flexDirection:"column", gap:2, borderLeft:"1px solid rgba(255,245,225,0.25)", paddingLeft:32}}>
              {t.legacy.timeline.map((m, i) => {
                const active = focus === i;
                return (
                  <Reveal key={i} delay={Math.min(4, Math.floor(i / 2))}>
                    <button onMouseEnter={() => setFocus(i)} style={{
                      display:"flex", alignItems:"baseline", gap:20, padding:"16px 0", width:"100%", textAlign:"left",
                      opacity: active ? 1 : (m.active ? 0.95 : 0.45), transition:"all .4s",
                      position:"relative",
                    }}>
                      <span style={{position:"absolute", left: -40, top: 28, width: active ? 14 : 7, height: active ? 14 : 7, borderRadius:"50%", background: m.active ? "var(--harvest)" : "var(--paper)", transition:"all .4s", transform:"translateY(-50%)"}}></span>
                      <span className="fecha-flanqueo" style={{fontSize:13, minWidth:60, opacity:0.7}}>{m.y}</span>
                      <span style={{flex:1}}>
                        <h4 style={{fontFamily:"var(--serif)", fontSize:"clamp(1.3rem, 2.4vw, 2.1rem)", textTransform:"uppercase", letterSpacing:"0.02em", color: m.active ? "var(--harvest)" : "var(--paper)"}}>{m.t}</h4>
                        {active && <p style={{marginTop:8, fontSize:14, opacity:0.85, lineHeight:1.55, textWrap:"pretty", maxWidth:480}}>{m.d}</p>}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right: gallery — shows images from focused period */}
          <div style={{position:"sticky", top:120}}>
            <Reveal delay={2}>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
                {(t.legacy.timeline[focus].y === "2024" ? GALLERY.oav24 :
                  t.legacy.timeline[focus].y === "2023" ? GALLERY.oav23 :
                  t.legacy.timeline[focus].y === "2025" ? GALLERY.oav25 :
                  t.legacy.timeline[focus].y === "2026" ? [...GALLERY.oav25, ...GALLERY.oav24].slice(0,6) :
                  [...GALLERY.oav23, ...GALLERY.oav24].slice(0,4)
                ).slice(0, 6).map((img, i) => (
                  <div key={`${focus}-${i}`} className="photo-dreamy" style={{
                    aspectRatio: i === 0 ? "1" : i % 3 === 0 ? "3/4" : "1",
                    overflow:"hidden", borderRadius:2,
                    gridColumn: i === 0 ? "span 2" : "span 1",
                    gridRow: i === 0 ? "span 2" : "span 1",
                    animation: "fadeScale .8s cubic-bezier(.22,1,.36,1)",
                  }}>
                    <img src={img} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                  </div>
                ))}
              </div>
            </Reveal>
            <div style={{marginTop:18, display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
              <span className="lato-expanded" style={{fontSize:10, opacity:0.6, letterSpacing:"0.42em"}}>{t.legacy.timeline[focus].y} · {t.legacy.timeline[focus].t}</span>
              <span style={{fontFamily:"var(--serif)", fontSize:24}}>{String(focus+1).padStart(2,"0")}<span style={{opacity:0.4}}>/{String(t.legacy.timeline.length).padStart(2,"0")}</span></span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeScale { from{opacity:0; transform:scale(0.96);} to{opacity:1; transform:scale(1);} }
        @media (max-width:880px){ .leg-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </section>
  );
}
Object.assign(window, { Legacy });
