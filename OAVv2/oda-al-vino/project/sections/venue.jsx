function Venue() {
  const t = useT();
  const [floor, setFloor] = useState(0);
  return (
    <section id="venue" className="tex-paper" style={{padding:"140px 0", position:"relative"}}>
      <div style={{maxWidth:1440, margin:"0 auto", padding:"0 40px"}}>
        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", gap:80, alignItems:"center"}} className="venue-grid">
          <div>
            <Reveal><Eyebrow color="var(--wine)">{t.venue.eyebrow}</Eyebrow></Reveal>
            <Reveal variant="clip" delay={1}>
              <div style={{marginTop:24}}>
                <SectionTitle before={t.venue.titleA} script={t.venue.script} color="var(--wine)" size="xl" />
              </div>
            </Reveal>
            <Reveal delay={2}>
              <p style={{fontSize:17, marginTop:30, color:"var(--wine)", opacity:0.8, lineHeight:1.55, maxWidth:480, textWrap:"pretty"}}>{t.venue.sub}</p>
            </Reveal>
            <Reveal delay={3}>
              <div style={{marginTop:30, paddingTop:24, borderTop:"1px solid rgba(71,7,44,0.2)"}}>
                <p className="fecha-flanqueo" style={{fontSize:13, color:"var(--wine)"}}>{t.venue.address}</p>
                <p className="lato-expanded" style={{fontSize:10, marginTop:10, opacity:0.55, color:"var(--wine)"}}>{t.venue.total}</p>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div style={{display:"flex", gap:10, marginTop:36}}>
                {t.venue.floors.map((f, i) => (
                  <button key={i} onClick={() => setFloor(i)} style={{
                    padding:"14px 22px", fontSize:11, letterSpacing:"0.26em", textTransform:"uppercase", fontWeight:700,
                    border:"1px solid var(--wine)",
                    background: floor === i ? "var(--wine)" : "transparent",
                    color: floor === i ? "var(--paper)" : "var(--wine)",
                    borderRadius:999, cursor:"pointer", transition:"all .3s",
                  }}>{f.name} · {f.cap}</button>
                ))}
              </div>
              <p style={{marginTop:18, fontSize:14, opacity:0.8, color:"var(--wine)", maxWidth:440, lineHeight:1.5, textWrap:"pretty"}}>{t.venue.floors[floor].desc}</p>
            </Reveal>
          </div>

          {/* Right: Floor plan SVG */}
          <Reveal delay={2}>
            <div className="tex-wine" style={{aspectRatio:"1", borderRadius:4, padding:30, position:"relative", overflow:"hidden", boxShadow:"0 20px 60px rgba(71,7,44,0.25)"}}>
              <div style={{position:"absolute", top:20, left:20, color:"var(--paper)"}}>
                <p className="lato-expanded" style={{fontSize:10, opacity:0.55, letterSpacing:"0.4em"}}>PLANTA · {floor === 0 ? "BAJA" : "ALTA"}</p>
                <p className="fecha-flanqueo" style={{fontSize:14, marginTop:8, color:"var(--paper)"}}>{t.venue.floors[floor].cap} PERSONAS</p>
              </div>
              <div style={{position:"absolute", top:20, right:20, color:"var(--paper)"}}>
                <img src="assets/logo_blanco_vertical.svg" style={{height:60, opacity:0.8}} />
              </div>

              <svg viewBox="0 0 400 400" style={{width:"100%", height:"100%"}}>
                <defs>
                  <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.5" fill="rgba(255,245,225,0.2)"/>
                  </pattern>
                </defs>
                <rect x="40" y="60" width="320" height="280" fill="url(#dots)" stroke="var(--paper)" strokeOpacity="0.4" strokeDasharray="3 3"/>

                {floor === 0 ? (
                  <>
                    {/* Ground floor: bodegas around perimeter + center mesas */}
                    {[...Array(10)].map((_, i) => (
                      <rect key={`t${i}`} x={55 + i*30} y={75} width={24} height={10} fill="var(--harvest)" opacity={0.9}/>
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <rect key={`b${i}`} x={55 + i*30} y={315} width={24} height={10} fill="var(--harvest)" opacity={0.9}/>
                    ))}
                    {[...Array(6)].map((_, i) => (
                      <rect key={`l${i}`} x={50} y={100 + i*32} width={10} height={24} fill="var(--harvest)" opacity={0.9}/>
                    ))}
                    {[...Array(6)].map((_, i) => (
                      <rect key={`r${i}`} x={340} y={100 + i*32} width={10} height={24} fill="var(--harvest)" opacity={0.9}/>
                    ))}
                    {/* central tasting tables */}
                    {[0,1,2].map(r => [0,1,2,3].map(c => (
                      <circle key={`c${r}-${c}`} cx={130 + c*50} cy={150 + r*50} r={14} fill="var(--plum)" opacity={0.9}/>
                    )))}
                    <text x="200" y="45" fill="var(--paper)" fontSize="10" textAnchor="middle" letterSpacing="3" opacity="0.6" fontFamily="monospace">ACCESO EOS SUPERMERCADO</text>
                    <text x="200" y="365" fill="var(--paper)" fontSize="10" textAnchor="middle" letterSpacing="3" opacity="0.6" fontFamily="monospace">ENTRADA PRINCIPAL</text>
                  </>
                ) : (
                  <>
                    {/* Upper floor: gourmet + masterclass */}
                    <rect x="80" y="100" width="120" height="90" fill="var(--plum)" opacity={0.85}/>
                    <text x="140" y="150" fill="var(--paper)" fontSize="9" textAnchor="middle" letterSpacing="2" fontFamily="monospace">SALA GOURMET</text>
                    <rect x="220" y="100" width="120" height="90" fill="var(--harvest)" opacity={0.85}/>
                    <text x="280" y="150" fill="var(--paper)" fontSize="9" textAnchor="middle" letterSpacing="2" fontFamily="monospace">MASTERCLASSES</text>
                    {[...Array(8)].map((_, i) => (
                      <circle key={i} cx={80 + (i%4)*80} cy={240 + Math.floor(i/4)*50} r={18} fill="var(--plum)" opacity={0.8}/>
                    ))}
                    <text x="200" y="45" fill="var(--paper)" fontSize="10" textAnchor="middle" letterSpacing="3" opacity="0.6" fontFamily="monospace">ODA VINOTECA</text>
                  </>
                )}
                {/* legend */}
                <g transform="translate(40, 370)">
                  <rect width="12" height="6" fill="var(--harvest)"/>
                  <text x="18" y="6" fill="var(--paper)" fontSize="8" opacity="0.7" fontFamily="monospace">BODEGAS</text>
                  <circle cx="100" cy="3" r="5" fill="var(--plum)"/>
                  <text x="112" y="6" fill="var(--paper)" fontSize="8" opacity="0.7" fontFamily="monospace">DEGUSTACIÓN</text>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width:880px){ .venue-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}
Object.assign(window, { Venue });
