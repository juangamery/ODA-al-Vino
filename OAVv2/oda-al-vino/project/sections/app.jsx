function App() {
  const initial = (() => {
    try { return JSON.parse(document.getElementById("__tweak_defaults").textContent.match(/\/\*EDITMODE-BEGIN\*\/([\s\S]*?)\/\*EDITMODE-END\*\//)[1]); }
    catch(e) { return { lang:"es", heroVariant:"cinematic", accent:"harvest", showGrain:true }; }
  })();
  const [tweaks, setTweaks] = useState(initial);
  const setTweak = (k, v) => setTweaks(t => ({...t, [k]: v}));

  useEffect(() => {
    const accents = { harvest: "#7c8419", plum: "#700143", olive: "#4c5409" };
    const root = document.documentElement;
    root.style.setProperty("--harvest", accents[tweaks.accent] || "#7c8419");
    root.classList.toggle("no-grain", !tweaks.showGrain);
  }, [tweaks]);

  return (
    <TweakCtx.Provider value={{ tweaks, setTweak }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Manifesto />
      <ScaleBlock />
      <Experience />
      <Marquee text={`+150 BODEGAS · +700 ETIQUETAS · 10 AÑOS · +2000 ASISTENTES · TRIPLE FRONTERA · `} variant="harvest" speed={36} />
      <Tickets />
      <Bodegas />
      <Venue />
      <Legacy />
      <Testimonials />
      <Iguazu />
      <Marquee text={`ODA AL VINO · 4 Y 5 SEPTIEMBRE 2026 · IGUAZÚ ARGENTINA · EL VINO NOS REÚNE · 10° EDICIÓN · `} variant="dark" speed={44} />
      <B2B />
      <Final />
      <Footer />
      <TweaksPanel />
    </TweakCtx.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
