function TweaksPanel() {
  const { tweaks, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") { setEdit(true); setOpen(true); }
      if (e.data?.type === "__deactivate_edit_mode") { setEdit(false); setOpen(false); }
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({type:"__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const set = (k, v) => {
    setTweak(k, v);
    window.parent.postMessage({type:"__edit_mode_set_keys", edits:{[k]: v}}, "*");
  };

  if (!edit) return null;

  const Opt = ({ k, v, label }) => (
    <button className={`opt ${tweaks[k] === v ? "active" : ""}`} onClick={() => set(k, v)}>{label}</button>
  );

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position:"fixed", right:20, bottom:20, zIndex:199,
        background:"var(--wine)", color:"var(--paper)",
        width:52, height:52, borderRadius:"50%",
        boxShadow:"0 10px 30px rgba(0,0,0,0.3)", cursor:"pointer",
        display: open ? "none" : "flex", alignItems:"center", justifyContent:"center",
        fontFamily:"var(--serif)", fontSize:20,
      }} aria-label="tweaks">⚙</button>

      <div className={`tweaks-panel ${open ? "open" : ""}`}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18}}>
          <h4 style={{margin:0}}>Tweaks</h4>
          <button onClick={() => setOpen(false)} style={{color:"var(--paper)", fontSize:18, opacity:0.7}}>✕</button>
        </div>

        <div className="row">
          <h4>Idioma</h4>
          <div className="opts">
            <Opt k="lang" v="es" label="Español" />
            <Opt k="lang" v="pt" label="Português" />
          </div>
        </div>

        <div className="row">
          <h4>Variante del Hero</h4>
          <div className="opts">
            <Opt k="heroVariant" v="cinematic" label="Cinematográfico" />
            <Opt k="heroVariant" v="editorial" label="Editorial" />
            <Opt k="heroVariant" v="poster" label="Afiche" />
          </div>
        </div>

        <div className="row">
          <h4>Acento</h4>
          <div className="opts">
            <Opt k="accent" v="harvest" label="Verde cosecha" />
            <Opt k="accent" v="plum" label="Ciruela" />
            <Opt k="accent" v="olive" label="Oliva" />
          </div>
        </div>

        <div className="row">
          <h4>Textura Grain</h4>
          <div className="opts">
            <Opt k="showGrain" v={true} label="On" />
            <Opt k="showGrain" v={false} label="Off" />
          </div>
        </div>

        <p style={{fontSize:10, opacity:0.5, marginTop:14, letterSpacing:"0.1em"}}>Los cambios se guardan automáticamente.</p>
      </div>
    </>
  );
}
Object.assign(window, { TweaksPanel });
