function Testimonials() {
  const t = useT();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % t.testimonials.quotes.length), 7000);
    return () => clearInterval(id);
  }, [t.testimonials.quotes.length]);
  return (
    <section className="tex-paper" style={{padding:"140px 0", position:"relative"}}>
      <div style={{maxWidth:1200, margin:"0 auto", padding:"0 40px", textAlign:"center"}}>
        <Reveal><Eyebrow color="var(--wine)">{t.testimonials.eyebrow}</Eyebrow></Reveal>
        <Reveal variant="clip" delay={1}>
          <div style={{marginTop:24}}>
            <SectionTitle before={t.testimonials.titleA} script={t.testimonials.script} color="var(--wine)" size="xl" />
          </div>
        </Reveal>

        <div style={{marginTop:80, minHeight:260, position:"relative"}}>
          {t.testimonials.quotes.map((q, i) => (
            <div key={i} style={{
              position: i === idx ? "relative" : "absolute", inset:0,
              opacity: i === idx ? 1 : 0, transition:"opacity .9s cubic-bezier(.22,1,.36,1)",
              pointerEvents: i === idx ? "auto" : "none",
            }}>
              <div style={{fontFamily:"var(--serif)", fontSize:"clamp(2rem, 4vw, 3.5rem)", lineHeight:1.2, color:"var(--wine)", maxWidth:900, margin:"0 auto", textTransform:"none", letterSpacing:"-0.01em", textWrap:"balance"}}>
                <span className="script" style={{fontSize:"1.4em", color:"var(--plum)", display:"inline-block", marginRight:"0.08em", lineHeight:0.6, transform:"translateY(0.2em)"}}>“</span>
                {q.q}
                <span className="script" style={{fontSize:"1.4em", color:"var(--plum)", display:"inline-block", marginLeft:"0.08em", lineHeight:0.6, transform:"translateY(0.2em)"}}>”</span>
              </div>
              <p style={{marginTop:30, fontFamily:"var(--serif)", fontSize:20, textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--wine)"}}>{q.a}</p>
              <p className="lato-expanded" style={{fontSize:10, marginTop:6, opacity:0.6, color:"var(--wine)"}}>{q.r}</p>
            </div>
          ))}
        </div>

        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:40}}>
          {t.testimonials.quotes.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 30 : 8, height:8, borderRadius:999,
              background: i === idx ? "var(--wine)" : "rgba(71,7,44,0.25)",
              transition:"all .4s",
            }} aria-label={`quote ${i+1}`}></button>
          ))}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Testimonials });
