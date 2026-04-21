function Hero() {
  const t = useT();
  const { tweaks } = useTweaks();
  const variant = tweaks.heroVariant || "cinematic";

  if (variant === "editorial") return <HeroEditorial t={t} />;
  if (variant === "poster") return <HeroPoster t={t} />;
  return <HeroCinematic t={t} />;
}

// Variant A: cinematic fullscreen with huge type over dreamy image
function HeroCinematic({ t }) {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" ref={heroRef} style={{position:"relative", minHeight:"100vh", overflow:"hidden", background:"var(--wine)"}}>
      <div ref={imgRef} className="photo-dreamy" style={{position:"absolute", inset:0, willChange:"transform"}}>
        <img src="assets/hero-bg.png" alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />
      </div>
      <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(71,7,44,0.5) 0%, rgba(71,7,44,0.15) 30%, rgba(71,7,44,0.35) 70%, rgba(71,7,44,0.85) 100%)"}}></div>
      <div className="grain" style={{position:"absolute", inset:0}}></div>

      {/* Eyebrow top center */}
      <div style={{position:"absolute", top:"12vh", left:0, right:0, textAlign:"center", color:"var(--paper)", zIndex:3}}>
        <Reveal delay={1}><OrnamentalLine color="var(--paper)" className="" /></Reveal>
        <Reveal delay={2}><p className="lato-expanded" style={{fontSize:12, letterSpacing:"0.5em", marginTop:18, opacity:0.9}}>{t.hero.eyebrow}</p></Reveal>
      </div>

      {/* Center title */}
      <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"var(--paper)", padding:"0 20px", zIndex:4, textAlign:"center"}}>
        <Reveal variant="clip">
          <h1 style={{fontFamily:"var(--serif)", fontSize:"clamp(3.5rem, 13vw, 13rem)", lineHeight:0.88, textTransform:"uppercase", letterSpacing:"0.02em"}}>
            {t.hero.titleA}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div className="script" style={{fontSize:"clamp(5rem, 18vw, 18rem)", lineHeight:0.75, color:"var(--paper)", marginTop:"-0.12em", textShadow:"0 6px 30px rgba(0,0,0,0.3)"}}>{t.hero.titleScript}</div>
        </Reveal>
        <Reveal delay={3}>
          <p style={{fontSize:"clamp(14px, 1.6vw, 19px)", maxWidth:560, marginTop:36, opacity:0.92, lineHeight:1.55, fontWeight:400, textWrap:"pretty"}}>{t.hero.subtitle}</p>
        </Reveal>
      </div>

      {/* Bottom: fecha flanqueo */}
      <div style={{position:"absolute", left:0, right:0, bottom:"7vh", color:"var(--paper)", zIndex:3, padding:"0 40px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:20, flexWrap:"wrap"}}>
          <Reveal delay={3}>
            <div>
              <p className="fecha-flanqueo" style={{fontSize:"clamp(13px, 1.5vw, 17px)"}}>{t.hero.date}</p>
              <p className="script" style={{fontSize:"clamp(3rem, 6vw, 5.5rem)", lineHeight:1, marginTop:6}}>{t.hero.year.replace("20", "")}<span style={{opacity:0.5}}></span></p>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:10, opacity:0.75}}>
              <span className="lato-expanded" style={{fontSize:10, letterSpacing:"0.4em"}}>{t.hero.scroll}</span>
              <div style={{width:1, height:40, background:"var(--paper)", animation:"scrollLine 2s ease-in-out infinite"}}></div>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div style={{textAlign:"right"}}>
              <p className="fecha-flanqueo" style={{fontSize:"clamp(13px, 1.5vw, 17px)"}}>{t.hero.place}</p>
              <p className="lato-expanded" style={{fontSize:11, letterSpacing:"0.38em", opacity:0.7, marginTop:8}}>10° Edición</p>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine { 0%,100%{transform:scaleY(0.3); transform-origin:top;} 50%{transform:scaleY(1); transform-origin:top;} }
      `}</style>
    </section>
  );
}

// Variant B: Editorial — giant type, photo as side accent
function HeroEditorial({ t }) {
  return (
    <section id="top" className="tex-paper" style={{minHeight:"100vh", position:"relative", overflow:"hidden", paddingTop:140, paddingBottom:80}}>
      <div style={{maxWidth:1500, margin:"0 auto", padding:"0 40px", display:"grid", gridTemplateColumns:"minmax(0,1.3fr) minmax(0,1fr)", gap:60, alignItems:"center", minHeight:"calc(100vh - 220px)"}}>
        <div>
          <Reveal><OrnamentalLine color="var(--wine)" /></Reveal>
          <Reveal delay={1}><p className="lato-expanded" style={{fontSize:11, letterSpacing:"0.42em", color:"var(--wine)", marginTop:20, opacity:0.7}}>{t.hero.eyebrow}</p></Reveal>

          <h1 style={{fontFamily:"var(--serif)", fontSize:"clamp(3rem, 10vw, 11rem)", lineHeight:0.85, textTransform:"uppercase", marginTop:40, color:"var(--wine)", letterSpacing:"0.02em"}}>
            <Reveal variant="clip"><span>{t.hero.titleA}</span></Reveal>
            <Reveal variant="clip" delay={1}><span className="script" style={{fontSize:"1.3em", lineHeight:0.6, display:"block", marginTop:"0.06em", marginBottom:"0.06em", color:"var(--plum)"}}>{t.hero.titleScript}</span></Reveal>
          </h1>

          <Reveal delay={2}>
            <p style={{maxWidth:520, marginTop:36, fontSize:18, lineHeight:1.55, color:"var(--wine)", opacity:0.85, textWrap:"pretty"}}>{t.hero.subtitle}</p>
          </Reveal>

          <Reveal delay={3}>
            <div style={{display:"flex", gap:16, marginTop:40, flexWrap:"wrap", alignItems:"center"}}>
              <Btn variant="wine" href="#entradas" size="lg">{t.cta.buy}</Btn>
              <a href="#manifiesto" className="hover-underline" style={{fontSize:12, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:700, color:"var(--wine)"}}>{t.cta.discover}</a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div style={{display:"flex", gap:40, marginTop:60, paddingTop:30, borderTop:"1px solid rgba(71,7,44,0.2)", flexWrap:"wrap"}}>
              <div>
                <p className="fecha-flanqueo" style={{fontSize:15, color:"var(--wine)"}}>{t.hero.date}</p>
                <p className="lato-expanded" style={{fontSize:10, marginTop:6, opacity:0.55, color:"var(--wine)"}}>{t.hero.year}</p>
              </div>
              <div>
                <p className="fecha-flanqueo" style={{fontSize:15, color:"var(--wine)"}}>{t.hero.place}</p>
                <p className="lato-expanded" style={{fontSize:10, marginTop:6, opacity:0.55, color:"var(--wine)"}}>Iguassu Urban Mall</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column: layered photo stack */}
        <Reveal delay={2}>
          <div style={{position:"relative", aspectRatio:"3/4", maxHeight:"80vh"}}>
            <div className="bob photo-dreamy" style={{position:"absolute", top:"8%", right:0, width:"75%", height:"70%", overflow:"hidden", borderRadius:2, boxShadow:"0 30px 80px rgba(71,7,44,0.3)"}}>
              <img src="assets/hero-bg.png" style={{width:"100%", height:"100%", objectFit:"cover"}} />
            </div>
            <div className="bob photo-dreamy" style={{animationDelay:"-3s", position:"absolute", bottom:"5%", left:0, width:"55%", height:"45%", overflow:"hidden", borderRadius:2, boxShadow:"0 30px 80px rgba(71,7,44,0.3)", border:"6px solid var(--paper)"}}>
              <img src="assets/gallery/oav25-2.webp" style={{width:"100%", height:"100%", objectFit:"cover"}} />
            </div>
            <div style={{position:"absolute", top:"-2%", left:"10%", width:120, height:120, opacity:0.9}}>
              <img src="assets/lacre_oav.svg" style={{width:"100%", height:"100%"}} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Variant C: Poster — vintage affiche feel
function HeroPoster({ t }) {
  return (
    <section id="top" style={{minHeight:"100vh", position:"relative", overflow:"hidden", background:"var(--paper)"}}>
      <img src="assets/fondovioleta.svg" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.08, mixBlendMode:"multiply"}} aria-hidden />
      <div style={{position:"relative", maxWidth:1200, margin:"0 auto", padding:"140px 40px 80px", textAlign:"center"}}>
        <Reveal><OrnamentalLine color="var(--wine)" className="" /></Reveal>
        <Reveal delay={1}><p className="lato-expanded" style={{fontSize:12, letterSpacing:"0.48em", color:"var(--wine)", marginTop:24, opacity:0.7}}>{t.hero.eyebrow}</p></Reveal>

        <Reveal delay={2}>
          <h1 style={{fontFamily:"var(--serif)", fontSize:"clamp(3.5rem, 12vw, 12rem)", lineHeight:0.85, textTransform:"uppercase", marginTop:40, color:"var(--wine)", letterSpacing:"0.02em"}}>
            {t.hero.titleA} <span className="script" style={{fontSize:"1.35em", color:"var(--plum)", display:"inline-block", lineHeight:0.6}}>{t.hero.titleScript}</span>
          </h1>
        </Reveal>

        <Reveal delay={3}>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:40, margin:"50px 0 40px", flexWrap:"wrap"}}>
            <div className="bob">
              <img src="assets/copa1.png" style={{width:"clamp(80px, 12vw, 140px)", height:"auto"}} />
            </div>
            <div style={{textAlign:"center"}}>
              <p className="fecha-flanqueo" style={{fontSize:"clamp(14px, 1.6vw, 20px)", color:"var(--wine)"}}>{t.hero.date}</p>
              <div className="script" style={{fontSize:"clamp(3rem, 5vw, 5rem)", color:"var(--plum)", lineHeight:0.9, margin:"6px 0"}}>2026</div>
              <p className="fecha-flanqueo" style={{fontSize:"clamp(13px, 1.4vw, 17px)", color:"var(--wine)", opacity:0.8}}>{t.hero.place}</p>
            </div>
            <div className="bob" style={{animationDelay:"-3s"}}>
              <img src="assets/copa3.png" style={{width:"clamp(80px, 12vw, 140px)", height:"auto"}} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <p style={{maxWidth:560, margin:"20px auto 0", fontSize:17, lineHeight:1.55, color:"var(--wine)", opacity:0.85, textWrap:"pretty"}}>{t.hero.subtitle}</p>
        </Reveal>

        <Reveal delay={5}>
          <div style={{marginTop:40}}>
            <Btn variant="wine" href="#entradas" size="lg">{t.cta.buy}</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
