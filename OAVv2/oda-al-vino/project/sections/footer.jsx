function Footer() {
  const t = useT();
  return (
    <footer style={{background:"var(--ink)", color:"var(--paper)", padding:"80px 40px 40px", position:"relative"}}>
      <div style={{maxWidth:1440, margin:"0 auto"}}>
        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1.2fr) repeat(3, minmax(0,1fr))", gap:40, marginBottom:60}} className="foot-grid">
          <div>
            <img src="assets/logo_crema_horizontal.svg" style={{height:48, width:"auto"}} />
            <p style={{marginTop:24, fontSize:14, opacity:0.7, lineHeight:1.6, maxWidth:320, textWrap:"pretty"}}>{t.footer.tagline}</p>
          </div>
          <div>
            <p className="lato-expanded" style={{fontSize:10, letterSpacing:"0.42em", opacity:0.55, marginBottom:20}}>Navegación</p>
            <ul style={{display:"flex", flexDirection:"column", gap:10}}>
              {t.footer.links1.map(l => <li key={l}><a href="#" className="hover-underline" style={{fontSize:14, opacity:0.85}}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="lato-expanded" style={{fontSize:10, letterSpacing:"0.42em", opacity:0.55, marginBottom:20}}>Información</p>
            <ul style={{display:"flex", flexDirection:"column", gap:10}}>
              {t.footer.links2.map(l => <li key={l}><a href="#" className="hover-underline" style={{fontSize:14, opacity:0.85}}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="lato-expanded" style={{fontSize:10, letterSpacing:"0.42em", opacity:0.55, marginBottom:20}}>Social</p>
            <ul style={{display:"flex", flexDirection:"column", gap:10}}>
              {t.footer.social.map(l => <li key={l}><a href="#" className="hover-underline" style={{fontSize:14, opacity:0.85}}>@ odaalvino</a></li>)}
            </ul>
            <p style={{marginTop:20, fontSize:12, opacity:0.6}}>gerencia@odavinoteca.com.ar</p>
            <p style={{fontSize:12, opacity:0.6, marginTop:4}}>+54 9 3757 571591</p>
          </div>
        </div>

        <div style={{paddingTop:30, borderTop:"1px solid rgba(255,245,225,0.14)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, flexWrap:"wrap"}}>
          <p className="lato-expanded" style={{fontSize:10, opacity:0.5, letterSpacing:"0.35em"}}>{t.footer.legal}</p>
          <p style={{fontSize:11, opacity:0.5, fontFamily:"var(--sans)"}}>www.odaalvino.com.br</p>
        </div>
      </div>
      <style>{`@media (max-width:760px){ .foot-grid{grid-template-columns:1fr 1fr!important;} }`}</style>
    </footer>
  );
}
Object.assign(window, { Footer });
