// Horizontal scroll storytelling experience with 4 pillars
function Experience() {
  const t = useT();
  const [active, setActive] = useState(0);
  const images = [GALLERY.oav25, GALLERY.oav24, GALLERY.oav25, GALLERY.oav24];

  return (
    <section id="experiencia" className="tex-plum" style={{padding:"140px 0 140px", color:"var(--paper)", position:"relative", overflow:"hidden"}}>
      <img src="assets/fondovioleta2.svg" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.1, mixBlendMode:"screen"}} aria-hidden onError={(e) => {e.target.style.display='none';}} />

      <div style={{maxWidth:1500, margin:"0 auto", padding:"0 40px"}}>
        <div style={{maxWidth:900, marginBottom:60}}>
          <Reveal><Eyebrow color="var(--paper)">{t.experience.eyebrow}</Eyebrow></Reveal>
          <Reveal variant="clip" delay={1}>
            <div style={{marginTop:24}}>
              <SectionTitle before={t.experience.titleA} script={t.experience.script} after={t.experience.titleB} color="var(--paper)" size="xl" />
            </div>
          </Reveal>
        </div>

        {/* Interactive grid: left list, right image */}
        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1.1fr)", gap:60, alignItems:"flex-start"}} className="exp-grid">
          <div>
            {t.experience.items.map((it, i) => (
              <Reveal key={i} delay={i}>
                <div
                  onMouseEnter={() => setActive(i)}
                  style={{
                    padding:"28px 0",
                    borderTop: i === 0 ? "1px solid rgba(255,245,225,0.22)" : "none",
                    borderBottom: "1px solid rgba(255,245,225,0.22)",
                    cursor:"pointer",
                    display:"flex",
                    alignItems:"flex-start",
                    gap:24,
                    transition:"all .5s cubic-bezier(.22,1,.36,1)",
                    opacity: active === i ? 1 : 0.55,
                  }}
                >
                  <span className="lato-expanded" style={{fontSize:11, letterSpacing:"0.42em", opacity:0.7, paddingTop:14, minWidth:40}}>{it.n}</span>
                  <div style={{flex:1}}>
                    <h3 style={{fontFamily:"var(--serif)", fontSize:"clamp(2rem, 4.5vw, 4rem)", lineHeight:0.95, textTransform:"uppercase", letterSpacing:"0.02em", color: active === i ? "var(--harvest)" : "var(--paper)", transition:"color .5s"}}>
                      {it.t}
                    </h3>
                    <p style={{maxWidth:560, marginTop:12, fontSize:"clamp(14px, 1.1vw, 17px)", lineHeight:1.6, opacity:0.85, textWrap:"pretty"}}>{it.d}</p>
                  </div>
                  <div style={{fontSize:24, opacity: active === i ? 1 : 0.4, transition:"all .5s", transform: active === i ? "translateX(4px) rotate(0)" : "translateX(0) rotate(-45deg)"}}>→</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: photo stack that changes with active */}
          <div style={{position:"sticky", top:120, aspectRatio:"4/5", maxHeight:"80vh"}} className="exp-image">
            <div style={{position:"relative", width:"100%", height:"100%", overflow:"hidden", borderRadius:4, background:"var(--wine)"}} className="photo-dreamy">
              {t.experience.items.map((it, i) => (
                <div key={i} style={{position:"absolute", inset:0, opacity: active === i ? 1 : 0, transition:"opacity .9s cubic-bezier(.22,1,.36,1), transform 1.5s", transform: active === i ? "scale(1)" : "scale(1.08)"}}>
                  <img src={images[i][0]} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                </div>
              ))}
              <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(71,7,44,0.7))"}}></div>
              <div style={{position:"absolute", bottom:24, left:24, right:24, color:"var(--paper)"}}>
                <p className="lato-expanded" style={{fontSize:10, letterSpacing:"0.4em", opacity:0.8}}>· {String(active+1).padStart(2,"0")} / {String(t.experience.items.length).padStart(2,"0")}</p>
                <h4 style={{fontFamily:"var(--serif)", fontSize:"clamp(1.8rem, 3vw, 2.8rem)", marginTop:10, textTransform:"uppercase"}}>{t.experience.items[active].t}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:860px){ .exp-grid{grid-template-columns:1fr!important;} .exp-image{position:relative!important; top:auto!important; order:-1; aspect-ratio:4/3!important;} }
      `}</style>
    </section>
  );
}
Object.assign(window, { Experience });
