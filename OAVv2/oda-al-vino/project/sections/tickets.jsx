function Tickets() {
  const t = useT();
  const [selected, setSelected] = useState(0);
  const [currency, setCurrency] = useState("r");
  const lot = t.tickets.lots[selected];
  const price = currency === "r" ? `R$ ${lot.r}` : currency === "ars" ? `AR$ ${lot.ars}` : `₲ ${lot.pyg}`;

  return (
    <section id="entradas" className="tex-paper" style={{padding:"140px 0", position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", top:"-10%", left:"-5%", width:"30vw", height:"30vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(112,1,67,0.08), transparent 70%)"}}></div>

      <div style={{maxWidth:1440, margin:"0 auto", padding:"0 40px"}}>
        <div style={{marginBottom:60}}>
          <Reveal><Eyebrow color="var(--wine)">{t.tickets.eyebrow}</Eyebrow></Reveal>
          <Reveal variant="clip" delay={1}>
            <div style={{marginTop:24}}>
              <SectionTitle before={t.tickets.titleA} script={t.tickets.script} color="var(--wine)" size="xl" />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p style={{fontSize:18, maxWidth:560, marginTop:30, color:"var(--wine)", opacity:0.75, lineHeight:1.55, textWrap:"pretty"}}>{t.tickets.sub}</p>
          </Reveal>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1.15fr)", gap:50, alignItems:"flex-start"}} className="tickets-grid">
          {/* Left: lots timeline */}
          <div>
            <Reveal><Eyebrow color="var(--wine)" className="">Lotes · Timeline de precios</Eyebrow></Reveal>
            <div style={{marginTop:24, position:"relative"}}>
              <div style={{position:"absolute", left:24, top:12, bottom:12, width:1, background:"rgba(71,7,44,0.2)"}}></div>
              {t.tickets.lots.map((l, i) => {
                const active = selected === i;
                return (
                  <Reveal key={i} delay={i}>
                    <button onClick={() => setSelected(i)} style={{
                      display:"flex", alignItems:"center", gap:24, width:"100%", textAlign:"left",
                      padding:"18px 0", position:"relative",
                      transition:"all .4s",
                      opacity: active ? 1 : 0.55,
                    }}>
                      <span style={{
                        width:48, height:48, borderRadius:"50%",
                        border:"1px solid var(--wine)",
                        background: active ? "var(--wine)" : "var(--paper)",
                        color: active ? "var(--paper)" : "var(--wine)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"var(--serif)", fontSize:18,
                        transition:"all .4s",
                        flexShrink:0, zIndex:2,
                      }}>
                        {String(i+1).padStart(2,"0")}
                      </span>
                      <div style={{flex:1}}>
                        <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
                          <div>
                            <h4 style={{fontFamily:"var(--serif)", fontSize:"clamp(1.2rem, 2vw, 1.6rem)", textTransform:"uppercase", color:"var(--wine)", letterSpacing:"0.02em"}}>{l.label}</h4>
                            <p className="lato-expanded" style={{fontSize:9.5, marginTop:4, color: active ? "var(--harvest)" : "var(--wine)", opacity: active ? 1 : 0.5, letterSpacing:"0.32em"}}>{l.status}</p>
                          </div>
                          <p style={{fontFamily:"var(--serif)", fontSize:"clamp(1.5rem, 2.5vw, 2.1rem)", color:"var(--wine)", letterSpacing:"-0.01em"}}>R${l.r}</p>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={5}>
              <p style={{marginTop:24, fontSize:12, color:"var(--plum)", fontStyle:"italic", opacity:0.75}}>↑ {t.tickets.urgency}</p>
            </Reveal>
          </div>

          {/* Right: ticket card */}
          <Reveal delay={2}>
            <div style={{position:"sticky", top:120}}>
              <div className="tex-wine grain" style={{
                position:"relative",
                color:"var(--paper)",
                padding:"48px 44px",
                borderRadius:4,
                boxShadow:"0 30px 80px rgba(71,7,44,0.3)",
                overflow:"hidden",
              }}>
                {/* ticket perforation */}
                <div style={{position:"absolute", top:"48%", left:-12, width:24, height:24, borderRadius:"50%", background:"var(--paper)"}}></div>
                <div style={{position:"absolute", top:"48%", right:-12, width:24, height:24, borderRadius:"50%", background:"var(--paper)"}}></div>
                <div style={{position:"absolute", left:0, right:0, top:"calc(48% + 12px)", borderTop:"1.5px dashed rgba(255,245,225,0.3)"}}></div>

                {/* upper half */}
                <div style={{paddingBottom:50}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:20, marginBottom:28}}>
                    <div>
                      <Eyebrow color="var(--paper)">ODA AL VINO · 2026</Eyebrow>
                      <p className="fecha-flanqueo" style={{fontSize:14, marginTop:12}}>4 · 5 SEPT · IGUAZÚ</p>
                    </div>
                    <img src="assets/logo_blanco_vertical.svg" style={{height:72, width:"auto"}} />
                  </div>

                  <div>
                    <p className="lato-expanded" style={{fontSize:10, opacity:0.6, letterSpacing:"0.42em"}}>PRECIO ACTUAL · {lot.label}</p>
                    <div style={{display:"flex", alignItems:"baseline", gap:18, marginTop:10, flexWrap:"wrap"}}>
                      <p style={{fontFamily:"var(--serif)", fontSize:"clamp(3rem, 6vw, 5rem)", lineHeight:0.9, letterSpacing:"-0.02em"}}>{price}</p>
                    </div>
                    <div style={{display:"flex", gap:8, marginTop:18}}>
                      {[{k:"r", l:"R$"}, {k:"ars", l:"AR$"}, {k:"pyg", l:"PYG"}].map(c => (
                        <button key={c.k} onClick={() => setCurrency(c.k)} style={{
                          padding:"7px 14px",
                          fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700,
                          border:"1px solid rgba(255,245,225,0.3)",
                          background: currency === c.k ? "var(--paper)" : "transparent",
                          color: currency === c.k ? "var(--wine)" : "var(--paper)",
                          borderRadius:999,
                          cursor:"pointer", transition:"all .3s",
                        }}>{c.l}</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* lower half */}
                <div style={{paddingTop:50}}>
                  <Eyebrow color="var(--paper)">{t.tickets.includes}</Eyebrow>
                  <ul style={{marginTop:20, display:"flex", flexDirection:"column", gap:12}}>
                    {t.tickets.list.map((li, i) => (
                      <li key={i} style={{display:"flex", gap:14, alignItems:"flex-start", fontSize:14, opacity:0.92, lineHeight:1.5}}>
                        <span style={{color:"var(--harvest)", fontFamily:"var(--serif)", fontSize:13, flexShrink:0, marginTop:2}}>{String(i+1).padStart(2,"0")}</span>
                        <span style={{textWrap:"pretty"}}>{li}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{marginTop:36}}>
                    <Btn variant="paper" size="lg" className="">{t.tickets.cta}</Btn>
                  </div>
                  <p className="lato-expanded" style={{fontSize:9.5, marginTop:20, opacity:0.55, letterSpacing:"0.32em"}}>{t.tickets.foot}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width:880px){ .tickets-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </section>
  );
}

Object.assign(window, { Tickets });
