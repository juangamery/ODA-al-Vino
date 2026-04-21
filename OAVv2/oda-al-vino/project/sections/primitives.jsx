const { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext } = React;

const TweakCtx = createContext(null);
const useTweaks = () => useContext(TweakCtx);
const useT = () => {
  const ctx = useContext(TweakCtx);
  return I18N[ctx?.tweaks?.lang || "es"];
};

// Reveal on scroll
function Reveal({ children, delay = 0, variant = "up", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const d = delay > 0 ? ` d${Math.min(5, Math.round(delay))}` : "";
  const klass = variant === "clip" ? "clip-reveal" : "rv";
  return <div ref={ref} className={`${klass}${d} ${className}`}>{variant === "clip" ? <span>{children}</span> : children}</div>;
}

// Ornamental divider - 4-point star
const Star = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" className={className} aria-hidden>
    <path d="M7 0L8 5.5L14 7L8 8.5L7 14L6 8.5L0 7L6 5.5Z" fill="currentColor" />
  </svg>
);

// Ornamental serif line with stars — disabled (kept for backward compat, renders nothing)
const OrnamentalLine = () => null;
const _OrnamentalLineUnused = ({ color = "currentColor", className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`} style={{color}}>
    <div style={{flex:1, height:1, background:"currentColor", opacity:.3}}></div>
    <Star size={10} />
    <Star size={14} />
    <Star size={10} />
    <div style={{flex:1, height:1, background:"currentColor", opacity:.3}}></div>
  </div>
);

// Marquee
function Marquee({ text, variant = "dark", speed = 42 }) {
  const bg = variant === "dark" ? "var(--wine)" : variant === "harvest" ? "var(--harvest)" : variant === "paper" ? "var(--paper)" : "var(--plum)";
  const fg = variant === "paper" ? "var(--wine)" : "var(--paper)";
  return (
    <div className="marquee" style={{background:bg, color:fg, padding:"22px 0", borderTop:"1px solid rgba(255,245,225,0.1)", borderBottom:"1px solid rgba(255,245,225,0.1)"}}>
      <div className="marquee-track" style={{animationDuration:`${speed}s`}}>
        {Array(4).fill(0).map((_, i) => (
          <div key={i} style={{display:"flex", alignItems:"center", gap:"36px", paddingRight:"36px"}} className="lato-expanded">
            <span style={{fontSize:"clamp(14px,1.6vw,20px)", fontWeight:400, letterSpacing:"0.4em"}}>{text}</span>
            <Star size={10} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Button
function Btn({ children, variant = "wine", href, onClick, size = "md", className = "" }) {
  const sizes = { sm: "padding:10px 22px; font-size:11px;", md: "padding:16px 32px; font-size:13px;", lg: "padding:20px 40px; font-size:14px;" };
  const variants = {
    wine: { bg: "var(--wine)", fg: "var(--paper)", hover: "var(--plum)" },
    paper: { bg: "var(--paper)", fg: "var(--wine)", hover: "var(--paper-soft)" },
    harvest: { bg: "var(--harvest)", fg: "var(--paper)", hover: "var(--olive)" },
    ghost: { bg: "transparent", fg: "currentColor", hover: "rgba(255,245,225,0.08)" },
  };
  const v = variants[variant];
  const [hover, setHover] = useState(false);
  const style = {
    background: hover ? v.hover : v.bg,
    color: v.fg,
    border: variant === "ghost" ? "1px solid currentColor" : "none",
    borderRadius: "999px",
    fontFamily: "var(--sans)",
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all .4s cubic-bezier(.22,1,.36,1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: size === "sm" ? "10px 22px" : size === "lg" ? "20px 40px" : "16px 32px",
    fontSize: size === "sm" ? "11px" : size === "lg" ? "14px" : "13px",
    transform: hover ? "translateY(-2px)" : "none",
    boxShadow: hover ? "0 14px 30px rgba(71,7,44,0.3)" : "0 4px 10px rgba(71,7,44,0.1)",
  };
  const Comp = href ? "a" : "button";
  return (
    <Comp href={href} onClick={onClick} style={style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={className}>
      {children}
      <span style={{fontSize:"1.2em", display:"inline-block", transform: hover ? "translateX(4px)" : "none", transition:"transform .4s cubic-bezier(.22,1,.36,1)"}}>→</span>
    </Comp>
  );
}

// Eyebrow
const Eyebrow = ({ children, color = "currentColor", className="" }) => (
  <p className={`lato-expanded ${className}`} style={{fontSize:11, letterSpacing:"0.42em", opacity:.75, color}}>
    {children}
  </p>
);

// Section Title — supports script word
const SectionTitle = ({ before, script, after, size = "xl", color = "currentColor" }) => {
  const fs = size === "xl" ? "clamp(3rem, 8vw, 8rem)" : size === "lg" ? "clamp(2.5rem, 6vw, 6rem)" : "clamp(2rem, 5vw, 4.5rem)";
  return (
    <h2 style={{fontFamily:"var(--serif)", fontSize:fs, lineHeight:0.88, textTransform:"uppercase", color, letterSpacing:"0.02em"}}>
      {before && <span>{before} </span>}
      {script && <span className="script" style={{fontSize:"1.28em", textTransform:"none", display:"inline-block", verticalAlign:"baseline", lineHeight:0.6, padding:"0 0.05em", transform:"translateY(0.04em)"}}>{script}</span>}
      {after && <span> {after}</span>}
    </h2>
  );
};

// Scroll progress
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{width:`${w}%`}} />;
}

Object.assign(window, { TweakCtx, useTweaks, useT, Reveal, Star, OrnamentalLine, Marquee, Btn, Eyebrow, SectionTitle, ScrollProgress });
