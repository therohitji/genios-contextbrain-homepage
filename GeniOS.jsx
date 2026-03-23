import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const T = {
  bg:"#08090c", bgCard:"#0e1016", bgRaised:"#13151e",
  border:"rgba(255,255,255,0.07)", borderMed:"rgba(255,255,255,0.12)",
  amber:"#e7a238", amberDim:"rgba(231,162,56,0.13)", amberGlow:"rgba(231,162,56,0.055)",
  amberBorder:"rgba(231,162,56,0.28)",
  red:"rgba(227,75,74,0.75)", redBg:"rgba(227,75,74,0.06)", redBorder:"rgba(227,75,74,0.16)",
  green:"rgba(80,200,120,0.75)",
  text:"#f0ede8", textSec:"rgba(240,237,232,0.5)", textDim:"rgba(240,237,232,0.22)",
  display:"'Blinker',sans-serif", mono:"'Space Mono',monospace", body:"'DM Sans',sans-serif",
  radius:"6px",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Blinker:wght@300;400;600;700;800;900&family=Orbitron:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background-color:${T.bg};background-image:radial-gradient(rgba(255,255,255,0.036) 1px,transparent 1px);background-size:32px 32px;color:${T.text};font-family:${T.body};-webkit-font-smoothing:antialiased;overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.38;transform:scale(.7)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes scrollLine{0%,100%{opacity:.4;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.1)}}
@keyframes float{0%,100%{transform:translateY(0) scale(1);opacity:.6}50%{transform:translateY(-16px) scale(1.1);opacity:1}}
@keyframes orbitSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.fi{opacity:0;transform:translateY(24px);transition:opacity .72s ease,transform .72s ease}
.fi.vis{opacity:1;transform:translateY(0)}
.fi.d1{transition-delay:.1s}.fi.d2{transition-delay:.2s}.fi.d3{transition-delay:.3s}.fi.d4{transition-delay:.4s}.fi.d5{transition-delay:.5s}
.hc{transition:background .25s ease}.hc:hover{background:rgba(231,162,56,0.032)!important}
.hl{transition:transform .2s ease,border-color .25s ease,box-shadow .25s ease}.hl:hover{transform:translateY(-4px);border-color:${T.amberBorder}!important;box-shadow:0 14px 44px rgba(231,162,56,0.10),0 4px 14px rgba(0,0,0,0.45)!important}
.ha{transition:color .2s}.ha:hover{color:${T.amber}!important}
.bp{transition:opacity .2s,transform .15s;cursor:pointer}.bp:hover{opacity:.84;transform:translateY(-1px)}
.bo{transition:border-color .2s,color .2s;cursor:pointer}.bo:hover{border-color:rgba(255,255,255,.28)!important;color:${T.text}!important}
.tb{transition:color .2s,background .2s,border-color .2s;cursor:pointer}
input::placeholder{color:${T.textDim}}
.cur{display:inline-block;width:8px;height:14px;background:${T.amber};vertical-align:middle;margin-left:3px;animation:blink 1.1s step-end infinite}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:rgba(231,162,56,.32);border-radius:2px}
[data-glow]::before,[data-glow]::after{pointer-events:none;content:"";position:absolute;inset:calc(var(--border-size,1px)*-1);border:var(--border-size,1px) solid transparent;border-radius:calc(var(--radius,10)*1px);background-attachment:fixed;background-size:calc(100% + (2*var(--border-size,1px))) calc(100% + (2*var(--border-size,1px)));background-repeat:no-repeat;background-position:50% 50%;mask:linear-gradient(transparent,transparent),linear-gradient(white,white);-webkit-mask:linear-gradient(transparent,transparent),linear-gradient(white,white);mask-clip:padding-box,border-box;-webkit-mask-clip:padding-box,border-box;mask-composite:intersect;-webkit-mask-composite:destination-in}
[data-glow]::before{background-image:radial-gradient(calc(var(--spotlight-size,200px)*0.75) calc(var(--spotlight-size,200px)*0.75) at calc(var(--x,0)*1px) calc(var(--y,0)*1px),hsl(var(--hue,38) calc(var(--saturation,78)*1%) calc(var(--lightness,56)*1%)/var(--border-spot-opacity,0.9)),transparent 100%);filter:brightness(2.2)}
[data-glow]::after{background-image:radial-gradient(calc(var(--spotlight-size,200px)*0.4) calc(var(--spotlight-size,200px)*0.4) at calc(var(--x,0)*1px) calc(var(--y,0)*1px),hsl(0 0% 100%/var(--border-light-opacity,0.4)),transparent 100%)}
[data-glow] [data-glow]{position:absolute;inset:0;will-change:filter;opacity:var(--outer,1);border-radius:calc(var(--radius,10)*1px);filter:blur(8px);background:none;pointer-events:none;border:none}
[data-glow]>[data-glow]::before{inset:-10px;border-width:10px}
@media(max-width:900px){
  .hm{display:none!important}.mob-menu-btn{display:flex!important}.g1m{grid-template-columns:1fr!important}.g2m{grid-template-columns:1fr 1fr!important}
  .pm{padding:0 24px!important}.nm{padding:12px 24px!important}.fcm{flex-direction:column!important}
  .gs{grid-template-columns:1fr!important}
  .gs .sl{border-radius:10px 10px 0 0!important;border-right:0.5px solid ${T.border}!important;border-bottom:none!important}
  .gs .sr{border-radius:0 0 10px 10px!important;border-left:0.5px solid ${T.amberBorder}!important}
  .gs .sdv{display:none!important}
}
@media(max-width:640px){
  .g2m{grid-template-columns:1fr!important}
  .pm{padding:0 16px!important}.nm{padding:12px 16px!important}
  .svg-flow{display:none!important}
  .flow-mobile{display:flex!important}
}
@media(max-width:480px){
  .fcm{flex-direction:column!important;width:100%!important}
  .fcm button,.fcm input{width:100%!important;box-sizing:border-box!important}
}
`;

/* ─── HOOKS ─── */
function useFI(ref) {
  useEffect(() => {
    if (!ref?.current) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { threshold: 0.07 });
    ref.current.querySelectorAll(".fi").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useIV(ref, th = 0.2) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setS(true); io.disconnect(); } }, { threshold: th });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return s;
}
function useCnt(target, dur, active) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0 = null;
    const fn = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / dur, 1); setV(Math.round(p * target)); if (p < 1) requestAnimationFrame(fn); };
    requestAnimationFrame(fn);
  }, [active, target, dur]);
  return v;
}

/* ─── PRIMITIVES ─── */
const Wrap = ({ children, style = {}, className = "" }) => (
  <div className={`pm ${className}`} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)", ...style }}>{children}</div>
);
const Lbl = ({ c, style = {} }) => (
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: 18, ...(c ? { textAlign: "center" } : {}), ...style }}>{c || style.children}</span>
);
const SectionLabel = ({ children, center, style = {} }) => (
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: 18, ...(center ? { textAlign: "center" } : {}), ...style }}>{children}</span>
);
const H2 = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.12, color: T.text, ...style }}>{children}</h2>
);
const Sec = ({ id, children, style = {}, sRef }) => (
  <section id={id} ref={sRef} style={{ borderTop: `0.5px solid ${T.border}`, ...style }}>{children}</section>
);
const IBox = ({ children, style = {} }) => (
  <div style={{ width: 40, height: 40, borderRadius: 8, background: T.amberGlow, border: `0.5px solid ${T.amberBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...style }}>{children}</div>
);
const Pill = ({ children, v = "amber" }) => {
  const m = { amber: [T.amber, "rgba(231,162,56,0.1)", "rgba(231,162,56,0.3)"], gray: [T.textDim, "rgba(255,255,255,0.04)", T.border] }[v] || [T.amber, T.amberGlow, T.amberBorder];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: m[0], background: m[1], border: `0.5px solid ${m[2]}`, padding: "5px 12px", borderRadius: 100 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "block" }} />{children}</span>;
};
const SVGIco = ({ d, size = 18, stroke = T.amber, children }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d ? <path d={d} /> : children}</svg>
);
const Arrow = () => <SVGIco size={14} stroke="currentColor"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></SVGIco>;


/* ═══════════════════════════════════════
   GLOBAL — AMBIENT BACKGROUND
═══════════════════════════════════════ */
const STARS = Array.from({ length: 110 }, (_, i) => ({
  x: `${(i * 17 + 3) % 97}%`,
  y: `${(i * 31 + 7) % 97}%`,
  r: 0.35 + (i % 4) * 0.38,
  o: 0.06 + (i % 6) * 0.05,
}));

function AmbientOrbs() {
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {/* Star field */}
      <svg width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
        {STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.o} />)}
      </svg>

      {/* Top-right: indigo-violet — innovation */}
      <div style={{ position:"absolute", top:-240, right:-220, width:820, height:820, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(99,102,241,0.13) 0%,rgba(99,102,241,0.04) 42%,transparent 68%)" }} />

      {/* Top-center: warm amber — hero atmosphere */}
      <div style={{ position:"absolute", top:-100, left:"20%", width:700, height:360,
        background:"radial-gradient(ellipse,rgba(231,162,56,0.09) 0%,rgba(231,162,56,0.025) 50%,transparent 70%)" }} />

      {/* Mid-left: cobalt blue — trust & depth */}
      <div style={{ position:"absolute", top:"32%", left:-240, width:620, height:620, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 64%)" }} />

      {/* Mid-right: teal — intelligence */}
      <div style={{ position:"absolute", top:"50%", right:-200, width:580, height:580, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(20,184,166,0.08) 0%,transparent 63%)" }} />

      {/* Bottom-left: amber — energy */}
      <div style={{ position:"absolute", bottom:-140, left:"5%", width:680, height:460,
        background:"radial-gradient(ellipse,rgba(231,162,56,0.075) 0%,transparent 66%)" }} />

      {/* Bottom-right: violet — depth */}
      <div style={{ position:"absolute", bottom:-220, right:"15%", width:560, height:560, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 63%)" }} />

      {/* Center-deep: very subtle amber pulse for mid-page */}
      <div style={{ position:"absolute", top:"68%", left:"38%", width:500, height:300,
        background:"radial-gradient(ellipse,rgba(231,162,56,0.045) 0%,transparent 68%)" }} />
    </div>
  );
}

/* ─── SPOTLIGHT GLOW CARD ─── */
function SpotlightCard({ children, style = {}, className = "" }) {
  const cardRef = useRef();
  useEffect(() => {
    const sync = (e) => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--x", e.clientX.toFixed(2));
      cardRef.current.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      cardRef.current.style.setProperty("--y", e.clientY.toFixed(2));
      cardRef.current.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);
  return (
    <div
      ref={cardRef}
      data-glow
      className={className}
      style={{
        "--base": 38, "--spread": 55, "--radius": 10, "--border": 1,
        "--saturation": 82, "--lightness": 58,
        "--bg-spot-opacity": 0.07, "--border-spot-opacity": 0.85, "--border-light-opacity": 0.35,
        "--size": 220, "--outer": 1,
        "--border-size": "1px",
        "--spotlight-size": "calc(var(--size) * 1px)",
        "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
        backgroundImage: "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x,0)*1px) calc(var(--y,0)*1px), hsl(var(--hue,38) calc(var(--saturation,82)*1%) calc(var(--lightness,58)*1%) / var(--bg-spot-opacity,0.07)), transparent)",
        backgroundColor: T.bgCard,
        backgroundSize: "calc(100% + 2px) calc(100% + 2px)",
        backgroundPosition: "50% 50%",
        backgroundAttachment: "fixed",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        position: "relative",
        touchAction: "none",
        ...style,
      }}
    >
      <div data-glow style={{ position: "absolute", inset: 0, borderRadius: 10, pointerEvents: "none" }} />
      {children}
    </div>
  );
}

/* ─── GENIOS WORDMARK LOGO ─── */
function GeniOSLogo({ size = 24, style = {} }) {
  return (
    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: size, fontWeight: 700, letterSpacing: "0.04em", color: T.text, lineHeight: 1, display: "block", ...style }}>GeniOS</span>
  );
}

/* ═══════════════════════════════════════
   ILLUSTRATION COMPONENTS
═══════════════════════════════════════ */
function OrgNetworkSVG() {
  const N = [
    {x:270,y:175,r:9,glow:true},
    {x:145,y:95,r:5},{x:235,y:72,r:4},{x:340,y:82,r:5},
    {x:415,y:148,r:4},{x:432,y:252,r:5},{x:378,y:345,r:4},
    {x:270,y:385,r:5},{x:158,y:342,r:4},{x:96,y:258,r:5},
    {x:108,y:168,r:4},{x:188,y:206,r:6},{x:302,y:198,r:4},
    {x:354,y:252,r:4},{x:238,y:288,r:5},{x:185,y:135,r:3},
    {x:328,y:144,r:3},{x:404,y:322,r:3},{x:128,y:312,r:3},
  ];
  const E = [
    [0,11],[0,12],[0,1],[0,7],
    [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,1],
    [11,1],[11,9],[11,10],[12,3],[12,4],[12,13],
    [13,5],[13,14],[14,8],[14,11],
    [15,1],[15,2],[16,3],[16,12],[17,5],[17,13],[18,8],[18,9],
  ];
  return (
    <svg viewBox="0 0 530 470" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto" }}>
      {E.map(([a,b],i) => (
        <line key={i} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} stroke="rgba(231,162,56,0.38)" strokeWidth="0.75"/>
      ))}
      {N.map((n,i) => (
        <g key={i}>
          {n.glow && <circle cx={n.x} cy={n.y} r={n.r+10} fill="rgba(231,162,56,0.1)">
            <animate attributeName="r" values={`${n.r+8};${n.r+20};${n.r+8}`} dur="3.2s" repeatCount="indefinite"/>
            <animate attributeName="fill-opacity" values="0.1;0.03;0.1" dur="3.2s" repeatCount="indefinite"/>
          </circle>}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.glow ? T.amber : i%4===0 ? "rgba(231,162,56,0.75)" : "rgba(231,162,56,0.35)"}/>
          {i%5===0 && <circle cx={n.x} cy={n.y} r={n.r+4} fill="none" stroke="rgba(231,162,56,0.28)" strokeWidth="0.5">
            <animate attributeName="r" values={`${n.r+3};${n.r+11};${n.r+3}`} dur={`${3.2+i*0.35}s`} repeatCount="indefinite" begin={`${i*0.3}s`}/>
            <animate attributeName="stroke-opacity" values="0.28;0;0.28" dur={`${3.2+i*0.35}s`} repeatCount="indefinite" begin={`${i*0.3}s`}/>
          </circle>}
        </g>
      ))}
    </svg>
  );
}

function OrbitalDiagram() {
  const cx = 190, cy = 190;
  const layers = [
    { label:"Relationship", color:"#5b8dee", r:52,  speed:"8s",  start:20  },
    { label:"Authority",    color:T.amber,   r:85,  speed:"13s", start:110 },
    { label:"State",        color:"#50c878", r:118, speed:"18s", start:200 },
    { label:"Precedent",    color:"#c77dff", r:151, speed:"23s", start:295 },
  ];
  return (
    <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:300, height:"auto", display:"block", margin:"0 auto" }}>
      {layers.map((l,i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={l.r} stroke={l.color} strokeWidth="0.5" strokeOpacity="0.22" strokeDasharray="3 9"/>
          <g>
            <animateTransform attributeName="transform" type="rotate"
              from={`${l.start} ${cx} ${cy}`} to={`${l.start+360} ${cx} ${cy}`}
              dur={l.speed} repeatCount="indefinite"/>
            <circle cx={cx+l.r} cy={cy} r="5.5" fill={l.color} opacity="0.88"/>
            <circle cx={cx+l.r} cy={cy} r="11" fill={l.color} opacity="0.1"/>
          </g>
          <text x={cx} y={cy-l.r-9} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="7" fill={l.color} fillOpacity="0.5" letterSpacing="0.12em">
            {l.label.toUpperCase()}
          </text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="34" fill="rgba(231,162,56,0.06)">
        <animate attributeName="r" values="34;44;34" dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="0.06;0.02;0.06" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx={cx} cy={cy} r="26" fill="rgba(231,162,56,0.07)" stroke={T.amber} strokeWidth="0.6" strokeOpacity="0.5"/>
      <circle cx={cx} cy={cy} r="14" fill="rgba(231,162,56,0.14)" stroke={T.amber} strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r="6" fill={T.amber}>
        <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <text x={cx} y={cy+22} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="6.5" fill="rgba(231,162,56,0.45)" letterSpacing="0.1em">CONTEXT BRAIN</text>
    </svg>
  );
}

/* ═══════════════════════════════════════
   SECTION 1 — NAV + HERO
═══════════════════════════════════════ */
function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 28); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  const links = [["gap","The Gap"],["solution","Solution"],["product","Pillars"],["api","API"]];
  return (
    <>
      <nav className="nm" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px clamp(16px,4vw,48px)", background: sc ? "rgba(8,9,12,0.97)" : "rgba(8,9,12,0.76)", backdropFilter: "blur(22px)", borderBottom: `0.5px solid ${sc ? T.borderMed : T.border}`, transition: "background .3s,border-color .3s" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.amber, boxShadow: "0 0 10px rgba(231,162,56,.75)", animation: "pulse 2.8s ease-in-out infinite", display: "block", flexShrink: 0 }} />
          <GeniOSLogo size={20} />
        </a>
        <div className="hm" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map(([id, l]) =>
            <button key={id} onClick={() => go(id)} className="ha" style={{ fontFamily: T.mono, fontSize: 10, color: T.textSec, letterSpacing: "0.08em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", padding: 0 }}>{l}</button>
          )}
          <a href="https://tally.so/r/xX2jj9" target="_blank" rel="noopener noreferrer" className="bp" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", border: `0.5px solid ${T.amber}`, color: T.amber, padding: "9px 20px", borderRadius: T.radius, textDecoration: "none" }}>Early Access</a>
        </div>
        {/* Hamburger — mobile only */}
        <button onClick={() => setOpen(o => !o)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6, flexDirection: "column", gap: 5 }} className="mob-menu-btn">
          <span style={{ display: "block", width: 22, height: 1.5, background: open ? T.amber : T.text, borderRadius: 2, transition: "transform .25s,opacity .25s", transform: open ? "translateY(3.25px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: T.text, borderRadius: 2, transition: "opacity .25s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: open ? T.amber : T.text, borderRadius: 2, transition: "transform .25s,opacity .25s", transform: open ? "translateY(-3.25px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>
      {/* Mobile menu drawer */}
      {open && (
        <div style={{ position: "fixed", top: 46, left: 0, right: 0, zIndex: 199, background: "rgba(8,9,12,0.98)", backdropFilter: "blur(24px)", borderBottom: `0.5px solid ${T.border}`, padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 0 }}>
          {links.map(([id, l]) => (
            <button key={id} onClick={() => go(id)} style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "none", border: "none", borderBottom: `0.5px solid ${T.border}`, color: T.textSec, padding: "16px 0", textAlign: "left", cursor: "pointer", width: "100%" }}>{l}</button>
          ))}
          <a href="https://tally.so/r/xX2jj9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "none", border: "none", borderBottom: `0.5px solid ${T.border}`, color: T.amber, padding: "16px 0", textAlign: "left", cursor: "pointer", width: "100%", textDecoration: "none", display: "block" }}>Early Access</a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "clamp(100px,12vw,140px) clamp(16px,4vw,24px) clamp(60px,8vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)`, backgroundSize: "64px 64px", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%,black 10%,transparent 78%)", maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%,black 10%,transparent 78%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "28%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 340, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(231,162,56,.10) 0%,rgba(231,162,56,0.03) 50%,transparent 68%)", pointerEvents: "none" }} />
      {/* Floating ambient particles */}
      {[
        { x:"9%",  y:"18%", s:2.8, dur:"9s",  del:"0s"   },
        { x:"85%", y:"14%", s:2.2, dur:"12s", del:"2.4s"  },
        { x:"92%", y:"55%", s:3.2, dur:"8s",  del:"4.8s"  },
        { x:"5%",  y:"72%", s:2.2, dur:"15s", del:"1.2s"  },
        { x:"60%", y:"82%", s:2.6, dur:"11s", del:"3.1s"  },
        { x:"36%", y:"8%",  s:2,   dur:"10s", del:"6.0s"  },
        { x:"19%", y:"58%", s:3,   dur:"13s", del:"1.8s"  },
        { x:"74%", y:"42%", s:2.4, dur:"9.5s",del:"7.2s"  },
        { x:"48%", y:"88%", s:2,   dur:"14s", del:"0.6s"  },
        { x:"28%", y:"30%", s:1.8, dur:"11s", del:"5.3s"  },
      ].map((p,i) => (
        <div key={i} style={{ position:"absolute", left:p.x, top:p.y, width:p.s, height:p.s, borderRadius:"50%", background:T.amber, boxShadow:`0 0 ${p.s*4}px ${p.s*1.5}px rgba(231,162,56,0.35)`, pointerEvents:"none", animation:`float ${p.dur} ease-in-out infinite`, animationDelay:p.del }} />
      ))}
      {/* Right side network illustration */}
      <div className="hm" style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-52%)", width:"38%", opacity:0.28, pointerEvents:"none", WebkitMaskImage:"linear-gradient(to left, black 10%, transparent 100%)", maskImage:"linear-gradient(to left, black 10%, transparent 100%)" }}>
        <OrgNetworkSVG />
      </div>
      {/* Left side (mirrored) */}
      <div className="hm" style={{ position:"absolute", left:0, top:"50%", transform:"translateY(-52%) scaleX(-1)", width:"38%", opacity:0.18, pointerEvents:"none", WebkitMaskImage:"linear-gradient(to left, black 10%, transparent 100%)", maskImage:"linear-gradient(to left, black 10%, transparent 100%)" }}>
        <OrgNetworkSVG />
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.amber, border: `0.5px solid rgba(231,162,56,.35)`, padding: "7px 18px", borderRadius: 100, background: T.amberGlow, marginBottom: 36, animation: "fadeUp .8s .18s both" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.amber, animation: "pulse 2s infinite", display: "block" }} />
        Context Brain for AI Agents
      </span>
      <h1 style={{ fontFamily: T.display, fontSize: "clamp(28px,4vw,56px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.028em", color: T.text, maxWidth: 700, marginBottom: 14, animation: "fadeUp .8s .36s both" }}>
        Your agents are smart. They just don't know <span style={{ color: T.amber }}>your world.</span>
      </h1>
      <p style={{ fontFamily: T.display, fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.014em", color: T.textSec, maxWidth: 600, marginBottom: 20, animation: "fadeUp .8s .5s both" }}>
        GeniOS builds the organizational context graph that makes AI agents actually work inside your company.
      </p>
      <p style={{ fontSize: 14, fontWeight: 300, color: T.textDim, maxWidth: 480, lineHeight: 1.7, marginBottom: 44, animation: "fadeUp .8s .64s both" }}>
        The shared intelligence layer — so agents understand context before they act, not after.
      </p>
      <div className="fcm" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp .8s .8s both" }}>
        <button onClick={() => go("waitlist")} className="bp" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", background: T.amber, color: "#080600", border: "none", padding: "14px 34px", borderRadius: T.radius, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 9 }}>
          Join the Waitlist <Arrow />
        </button>
        <button onClick={() => go("gap")} className="bo" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: T.textSec, border: `0.5px solid ${T.border}`, padding: "14px 34px", borderRadius: T.radius }}>
          See The Gap ↓
        </button>
      </div>
      <div style={{ position: "absolute", bottom: 38, left: "50%", transform: "translateX(-50%)", animation: "fadeUp .8s 1.2s both" }}>
        <div style={{ width: 1, height: 54, background: `linear-gradient(to bottom,${T.amber},transparent)`, animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 2 — KEY METRICS (Market)
═══════════════════════════════════════ */
function CountUp({ pre = "", target, suf = "", dur = 1300, active }) {
  const v = useCnt(target, dur, active);
  return <>{pre}{v}{suf}</>;
}

function Metrics1() {
  const ref = useRef();
  const seen = useIV(ref, 0.25);
  const cells = [
    { pre: "$", num: 47, suf: "B+", label: "AI Agent Market by 2030" },
    { pre: "", num: 78, suf: "%", label: "Orgs Deploying AI Agents" },
    { pre: "", num: 67, suf: "%", label: "Agent Actions Still Human-Supervised" },
    { pre: "<", num: 50, suf: "ms", label: "GeniOS Context Retrieval" },
    { pre: "", num: 4, suf: "", label: "Intelligence Graph Layers" },
    { pre: "", num: 70, suf: "%", label: "Deterministic Decision Rate" },
  ];
  return (
    <section ref={ref} style={{ borderTop: `0.5px solid ${T.border}` }}>
      <Wrap>
        <div className="g2m" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 1, background: T.border, border: `0.5px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
          {cells.map((c, i) => (
            <div key={i} className="hc" style={{ background: T.bgCard, padding: "34px 18px", textAlign: "center" }}>
              <span style={{ fontFamily: T.display, fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: T.amber, lineHeight: 1, marginBottom: 10, display: "block" }}>
                <CountUp pre={c.pre} target={c.num} suf={c.suf} active={seen} dur={1100 + i * 90} />
              </span>
              <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.09em", textTransform: "uppercase", color: T.textDim, display: "block", lineHeight: 1.55 }}>{c.label}</span>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 3 — THE GAP EXAMPLE
═══════════════════════════════════════ */
function GapExample() {
  const ref = useRef(); useFI(ref);
  const memR = [
    { ok: true, t: "Retrieve the last email thread" },
    { ok: true, t: "Surface the contact name and timestamp" },
    { ok: true, t: "Show what was written" },
    { ok: false, t: "Know if that person is in an active deal freeze" },
    { ok: false, t: "Understand your org's relationship history with them" },
    { ok: false, t: "Know a colleague already emailed them yesterday" },
  ];
  const ctxR = [
    "Relationship is warm — last contact 8 days ago",
    "Open commitment from their side — overdue by 6 days",
    "No active deal freeze in their account",
    "Colleague emailed same contact 2 days ago",
    "Similar follow-ups converted best on Tuesdays",
    "Manager approval required before any escalation",
  ];
  return (
    <Sec id="gap" sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto clamp(36px,5vw,60px)" }}>
          <SectionLabel center>The Invisible Layer</SectionLabel>
          <H2 style={{ marginBottom: 22 }}>Memory is not enough.<br />Neither is raw intelligence.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.8 }}>Agents can recall what happened. They can't understand what it means inside your organization. That gap is where every agent failure lives — completely invisible until something breaks.</p>
        </div>
        <div className="fi d1 gs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `0.5px solid ${T.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 48 }}>
          <div className="sl" style={{ background: T.bgCard, padding: "clamp(24px,4vw,44px) clamp(20px,3vw,38px)", borderRight: `0.5px solid ${T.border}` }}>
            <div style={{ marginBottom: 22 }}><Pill v="gray">Memory Layer — Today</Pill></div>
            <p style={{ fontFamily: T.display, fontSize: "clamp(14px,1.8vw,20px)", fontWeight: 600, letterSpacing: "-0.018em", lineHeight: 1.3, color: T.textSec, marginBottom: 26 }}>"Who did you last email?"</p>
            <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textDim, display: "block", marginBottom: 16 }}>An agent with memory can:</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {memR.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, fontWeight: 300, lineHeight: 1.5, color: r.ok ? T.textSec : "rgba(227,75,74,.42)" }}>
                  <span style={{ fontFamily: T.mono, fontSize: 11, color: r.ok ? T.textDim : "rgba(227,75,74,.38)", flexShrink: 0, marginTop: 1 }}>{r.ok ? "✓" : "✕"}</span>{r.t}
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 6, background: T.redBg, border: `0.5px solid ${T.redBorder}`, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: "rgba(227,75,74,.78)" }}>
              Factually correct. Organizationally blind. The agent acts — and often acts wrong.
            </div>
          </div>
          <div className="sr" style={{ background: "rgba(231,162,56,0.025)", padding: "clamp(24px,4vw,44px) clamp(20px,3vw,38px)", borderTop: `2px solid ${T.amber}` }}>
            <div style={{ marginBottom: 22 }}><Pill v="amber">Context Brain — GeniOS</Pill></div>
            <p style={{ fontFamily: T.display, fontSize: "clamp(14px,1.8vw,20px)", fontWeight: 600, letterSpacing: "-0.018em", lineHeight: 1.3, color: T.text, marginBottom: 26 }}>"Should you follow up with them?"</p>
            <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textDim, display: "block", marginBottom: 16 }}>GeniOS answers what memory cannot:</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {ctxR.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, fontWeight: 300, lineHeight: 1.5, color: T.textSec }}>
                  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.amber, flexShrink: 0, marginTop: 1 }}>✓</span>{t}
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 6, background: T.amberGlow, border: `0.5px solid rgba(231,162,56,.22)`, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: "rgba(231,162,56,.9)" }}>
              The agent doesn't just recall — it understands. It acts with the judgment of a senior employee.
            </div>
          </div>
        </div>
        <div className="fi d2" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", padding: "50px 48px", background: T.bgCard, border: `0.5px solid ${T.border}`, borderRadius: 10, borderTop: `1px solid rgba(231,162,56,.35)` }}>
          <p style={{ fontFamily: T.display, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.4, color: T.text, marginBottom: 16 }}>
            The missing layer isn't smarter agents.<br />It's <span style={{ color: T.amber }}>organizational reality</span> — and no agent can see it today.
          </p>
          <p style={{ fontSize: 15, fontWeight: 300, color: T.textSec, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
            Commitments. Authority chains. Past decisions and why they failed. Who trusts whom. What's frozen. What's urgent. GeniOS builds the graph that makes this visible to every agent you deploy.
          </p>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 4 — PROBLEM
═══════════════════════════════════════ */
function Problem() {
  const ref = useRef(); useFI(ref);
  const pains = [
    { icon: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01", title: "Agents Act Without Context", body: "Every agent starts from zero. No org structure, no approval chains, no awareness of in-flight operations. They fire actions into a void — and hope for the best." },
    { icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", title: "Humans Still Babysit Every Decision", body: "Because agents lack org context, humans review, correct and override constantly. The promise of autonomous AI collapses back into a supervised assembly line." },
    { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", title: "Multi-Agent Systems Conflict", body: "Two agents, no shared context. One approves a payment while another freezes the budget. One follows up while a colleague just emailed the same contact. Chaos at scale." },
  ];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(32px,5vw,56px)" }}>
          <SectionLabel center>The Problem</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>AI agents are ready.<br />Organizations are not.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78 }}>The bottleneck isn't model intelligence. It's the structural absence of organizational context. Agents can't act correctly on what they can't see.</p>
        </div>
        <div className="g1m" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: T.border, border: `0.5px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
          {pains.map((p, i) => (
            <div key={i} className={`hc fi d${i+1}`} style={{ background: T.bgCard, padding: "36px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-8, right:-8, width:88, height:88, opacity:0.07, pointerEvents:"none" }}>
                <svg viewBox="0 0 88 88" fill="none">
                  <circle cx="68" cy="20" r="7" stroke="rgba(227,75,74,1)" strokeWidth="1.5"/>
                  <circle cx="34" cy="54" r="5" stroke="rgba(227,75,74,1)" strokeWidth="1.5"/>
                  <circle cx="72" cy="64" r="4" stroke="rgba(227,75,74,1)" strokeWidth="1.5"/>
                  <line x1="62" y1="26" x2="39" y2="49" stroke="rgba(227,75,74,1)" strokeWidth="1" strokeDasharray="3 4"/>
                  <line x1="39" y1="59" x2="69" y2="61" stroke="rgba(227,75,74,1)" strokeWidth="1" strokeDasharray="3 4"/>
                  <line x1="62" y1="18" x2="78" y2="28" stroke="rgba(227,75,74,1)" strokeWidth="1" strokeDasharray="3 4"/>
                </svg>
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: T.redBg, border: `0.5px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                <SVGIco d={p.icon} stroke="rgba(227,75,74,0.72)" />
              </div>
              <h3 style={{ fontFamily: T.display, fontSize: 17, fontWeight: 700, letterSpacing: "-0.015em", color: T.text, marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: T.textSec, fontWeight: 300, lineHeight: 1.75 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 5 — SOLUTION
═══════════════════════════════════════ */
function Solution() {
  const ref = useRef(); useFI(ref);
  const graphs = [
    { label: "Relationship Graph", eg: "Sarah is warm, last contacted 12 days ago", col: "#5b8dee" },
    { label: "Authority Graph", eg: "Approval needed above $10K from CFO", col: T.amber },
    { label: "State Graph", eg: "Budget freeze active, started Nov 1", col: "#50c878" },
    { label: "Precedent Graph", eg: "Similar action failed last month — see why", col: "#c77dff" },
  ];
  return (
    <Sec id="solution" sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="g1m" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
          <div className="fi">
            <SectionLabel>The Solution</SectionLabel>
            <H2 style={{ marginBottom: 24 }}>The Context Brain<br />your agents have been missing.</H2>
            <p style={{ fontSize: 15, fontWeight: 300, color: T.textSec, lineHeight: 1.8, marginBottom: 16 }}>
              GeniOS builds and continuously maintains an Organizational Context Graph — a live model of your company's operational reality structured across four fundamentally different dimensions of truth.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, color: T.textSec, lineHeight: 1.8, marginBottom: 32 }}>
              Before any agent acts, it queries all four graph layers simultaneously. Context is managed as a dynamic system — signals check for freshness, old information loses weight, redundant data is compressed. Every human correction teaches the graph how your organization actually works.
            </p>
            {["Model-agnostic — works with every LLM and agent framework","Single API call returns full organizational context + past reasoning","Compounding moat — graph gets more accurate with every correction"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, fontWeight: 300, color: T.textSec, alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ color: T.amber, fontFamily: T.mono, fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>{t}
              </div>
            ))}
          </div>
          <div className="fi d2" style={{ display: "flex", flexDirection: "column", gap: 1, background: T.border, border: `0.5px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: T.bgCard, padding: "28px 24px 20px", display:"flex", justifyContent:"center" }}>
              <OrbitalDiagram />
            </div>
            {graphs.map((g, i) => (
              <div key={i} className="hc" style={{ background: T.bgCard, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: g.col, flexShrink: 0, boxShadow: `0 0 8px ${g.col}55` }} />
                <div>
                  <strong style={{ display: "block", fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: g.col, letterSpacing: "0.05em", marginBottom: 3 }}>{g.label}</strong>
                  <span style={{ fontSize: 13, color: T.textSec, fontWeight: 300, fontStyle: "italic" }}>Eg: "{g.eg}"</span>
                </div>
              </div>
            ))}
            <div style={{ background: T.bgRaised, padding: "20px 24px", borderTop: `0.5px solid ${T.border}` }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Every agent query hits all 4 graphs</span>
              <p style={{ fontSize: 13, color: T.textSec, fontWeight: 300, lineHeight: 1.6, margin: 0 }}>Simultaneously. Before any action executes. 70% deterministic · 30% probabilistic LLM.</p>
            </div>
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 6 — PRODUCT METRICS
═══════════════════════════════════════ */
function Metrics2() {
  const ref = useRef(); useFI(ref);
  const cells = [
    { val: "25→85%", label: "Autonomous Execution Rate", sub: "AER climbs over 90 days of org data" },
    { val: "~60%", label: "Human Interventions Reduced", sub: "Fewer corrections after first 30 days" },
    { val: "Real-time", label: "Context Freshness Checks", sub: "Signal decay scored on every query" },
    { val: "0", label: "Cross-Agent Conflicts", sub: "Shared state prevents all collisions" },
  ];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(44px,6vw,76px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel center>Product Performance</SectionLabel>
          <H2 style={{ textAlign: "center" }}>Numbers that compound<br />the longer GeniOS runs.</H2>
        </div>
        <div className="g2m" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {cells.map((c, i) => (
            <div key={i} className={`hl fi d${i+1}`} style={{ background: T.bgCard, border: `0.5px solid ${T.border}`, borderRadius: 10, padding: "28px 24px" }}>
              <span style={{ fontFamily: T.display, fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: T.amber, display: "block", marginBottom: 8, lineHeight: 1 }}>{c.val}</span>
              <strong style={{ display: "block", fontFamily: T.display, fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6 }}>{c.label}</strong>
              <span style={{ fontSize: 12, color: T.textDim, fontWeight: 300, lineHeight: 1.55 }}>{c.sub}</span>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 7 — KEY PILLARS
═══════════════════════════════════════ */
function Pillars() {
  const ref = useRef(); useFI(ref);
  const pillars = [
    { n:"01", title:"Relationships", body:"Who knows who. Interaction history. Sentiment trends. Open commitments. Which relationships are warm — and which are dying.", icon:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></> },
    { n:"02", title:"Authority", body:"Who can approve what. Spending thresholds. Escalation chains. Policy constraints agents respect without being told twice.", icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
    { n:"03", title:"Operational State", body:"What's live right now. Budget status. In-flight agent actions. Real-time awareness so no two agents ever work against each other.", icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
    { n:"04", title:"Past Decisions", body:"What happened before. Outcomes and reasoning. Situation matching so agents inherit institutional memory, not just instructions.", icon:<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></> },
  ];
  return (
    <Sec id="product" sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(32px,5vw,56px)" }}>
          <SectionLabel center>Four Dimensions of Org Intelligence</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>One context layer.<br />Every agent benefits.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78 }}>Not a memory tool. Not another agent framework. GeniOS structures four fundamentally different types of organizational truth — each storing what no other layer captures.</p>
        </div>
        <div className="g2m" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: T.border, border: `0.5px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
          {pillars.map((p, i) => (
            <div key={i} className={`hc fi d${i+1}`} style={{ background: T.bgCard, padding: "34px 26px", position: "relative" }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, letterSpacing: "0.1em", marginBottom: 22, display: "block" }}>{p.n}</span>
              <IBox><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={T.amber} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg></IBox>
              <h3 style={{ fontFamily: T.display, fontSize: 17, fontWeight: 700, letterSpacing: "-0.015em", color: T.text, margin: "20px 0 12px" }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: T.textSec, fontWeight: 300, lineHeight: 1.73 }}>{p.body}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textDim, marginTop: 22, border: `0.5px solid ${T.border}`, padding: "5px 12px", borderRadius: 100 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Details in demo
              </span>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 8.5 — INTEGRATIONS FLOW
═══════════════════════════════════════ */
function IntegrationsFlow() {
  const ref = useRef(); useFI(ref);

  const W = 920, H = 488;
  const cx = W / 2, cy = H / 2;
  const CR = 58;

  const tools = [
    { name: "Slack",       cat: "Comms",     col: "#E01E5A" },
    { name: "Notion",      cat: "Docs",       col: "#9CA3AF" },
    { name: "G-Suite",     cat: "Workspace",  col: "#4285F4" },
    { name: "Salesforce",  cat: "CRM",        col: "#00A1E0" },
    { name: "Jira",        cat: "Projects",   col: "#0052CC" },
    { name: "Workday",     cat: "HRM",        col: "#F36F21" },
    { name: "GitHub",      cat: "Code",       col: "#8B5CF6" },
    { name: "Confluence",  cat: "Policies",   col: "#2684FF" },
  ];

  // Brand icons — each renders in a 22×22 space at (x, y)
  const toolIcon = (name, x, y) => {
    const tr = `translate(${x},${y})`;
    switch (name) {
      case "Slack": return (
        <g transform={tr} key={name}>
          <rect x="1"   y="8.5" width="8.5" height="4"   rx="2" fill="#E01E5A"/>
          <rect x="12.5" y="8.5" width="8.5" height="4"  rx="2" fill="#ECB22E"/>
          <rect x="9"   y="1"   width="4"   height="8.5" rx="2" fill="#36C5F0"/>
          <rect x="9"   y="12.5" width="4"  height="8.5" rx="2" fill="#2EB67D"/>
        </g>
      );
      case "Notion": return (
        <g transform={tr} key={name}>
          <rect x="1" y="1" width="20" height="20" rx="3" fill="#191919" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
          <path d="M5 17 L5 5 L8 5 L14 13 L14 5 L17 5 L17 17 L14 17 L8 9 L8 17 Z" fill="white"/>
        </g>
      );
      case "G-Suite": return (
        <g transform={tr} key={name}>
          {[["#4285F4","#DB4437","#F4B400"],["#0F9D58","#4285F4","#DB4437"],["#F4B400","#0F9D58","#4285F4"]].map((row, ri) =>
            row.map((col, ci) => <rect key={`${ri}-${ci}`} x={2+ci*7} y={2+ri*7} width="5" height="5" rx="1" fill={col}/>)
          )}
        </g>
      );
      case "Salesforce": return (
        <g transform={tr} key={name}>
          <path d="M9.5 8.2C10 6.3 11.7 5 13.5 5c2.1 0 3.8 1.5 4.1 3.4.4-.1.8-.1 1.1-.1C20.5 8.3 22 9.8 22 11.6S20.5 15 18.7 15H4.5C2.6 15 1 13.4 1 11.5c0-1.7 1.2-3 2.8-3.3.3-.1.5-.1.8-.1.5 0 1.1.1 1.6.3" fill="#00A1E0"/>
        </g>
      );
      case "Jira": return (
        <g transform={tr} key={name}>
          <path d="M11 1L1 11l10 10 10-10L11 1z" fill="#0052CC"/>
          <path d="M11 5.5L6.5 11l4.5 4.5L15.5 11 11 5.5z" fill="white" opacity="0.85"/>
        </g>
      );
      case "Workday": return (
        <g transform={tr} key={name}>
          <path d="M2 6l3.5 12L11 8l5.5 10L20 6" fill="none" stroke="#F36F21" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      );
      case "GitHub": return (
        <g transform={tr} key={name}>
          <circle cx="11" cy="9" r="4.5" fill="none" stroke="#8B5CF6" strokeWidth="1.5"/>
          <path d="M7.5 13C5.5 14 4 16.5 4 16.5h14s-1.5-2.5-3.5-3.5" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="9" y1="13.5" x2="8.5" y2="17" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13" y1="13.5" x2="13.5" y2="17" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      );
      case "Confluence": return (
        <g transform={tr} key={name}>
          <path d="M15 7.5C13.5 5 11 3.5 8.5 3.5C5 3.5 2 6.5 2 10s3 6.5 6.5 6.5" fill="none" stroke="#2684FF" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 14l1.5 2.5 2.5-1.5" fill="none" stroke="#2684FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 14.5C8.5 17 11 18.5 13.5 18.5 17 18.5 20 15.5 20 12s-3-6.5-6.5-6.5" fill="none" stroke="#2684FF" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 8L16.5 5.5 14 7" fill="none" stroke="#2684FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      );
      default: return null;
    }
  };

  // Robot icon (20×20) matching the uploaded design
  const robotIcon = (x, y) => (
    <g transform={`translate(${x},${y})`} stroke={T.amber} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="11" rx="2"/>
      <line x1="10" y1="3.5" x2="10" y2="7"/>
      <circle cx="10" cy="2" r="1.5"/>
      <rect x="0" y="9.5" width="2" height="4" rx="1"/>
      <rect x="18" y="9.5" width="2" height="4" rx="1"/>
      <circle cx="7" cy="12.5" r="1.5"/>
      <circle cx="13" cy="12.5" r="1.5"/>
    </g>
  );

  const agents = [
    { name: "Finance Agent", outcome: "Budget-aware decisions"      },
    { name: "Sales Agent",   outcome: "Relationship-smart outreach" },
    { name: "HR Agent",      outcome: "Policy-compliant hiring"     },
    { name: "Ops Agent",     outcome: "Conflict-free execution"     },
  ];

  const TW = 152, TH = 44, TGap = 10;
  const AW = 164, AH = 54, AGap = 20;
  const TX = 4, AX = W - AW - 4;

  const totalToolH = tools.length * TH + (tools.length - 1) * TGap;
  const toolStartY = (H - totalToolH) / 2;

  const totalAgentH = agents.length * AH + (agents.length - 1) * AGap;
  const agentStartY = (H - totalAgentH) / 2;

  const toolCenters = tools.map((_, i) => ({
    x: TX + TW / 2,
    y: toolStartY + i * (TH + TGap) + TH / 2,
  }));

  const agentCenters = agents.map((_, i) => ({
    x: AX + AW / 2,
    y: agentStartY + i * (AH + AGap) + AH / 2,
  }));

  const toolPaths = toolCenters.map(tc => {
    const x1 = TX + TW, y1 = tc.y;
    const x2 = cx - CR, y2 = cy;
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  });

  const agentPaths = agentCenters.map(ac => {
    const x1 = cx + CR, y1 = cy;
    const x2 = AX, y2 = ac.y;
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  });

  return (
    <Sec sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(32px,5vw,56px)" }}>
          <SectionLabel center>Works With Your Stack</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>Every tool you use.<br />One context layer.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78 }}>
            GeniOS connects to every system your organization runs on — transforming fragmented signals into structured context your agents actually understand.
          </p>
        </div>

        <div className="svg-flow fi d1" style={{ background: T.bgCard, border: `0.5px solid ${T.border}`, borderRadius: 12, overflow: "hidden", overflowX: "auto", WebkitOverflowScrolling: "touch", padding: "32px 12px 28px" }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ifg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={T.amber} stopOpacity="0.22" />
                <stop offset="100%" stopColor={T.amber} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient center glow */}
            <ellipse cx={cx} cy={cy} rx="145" ry="125" fill="url(#ifg)" />

            {/* Tool → center paths */}
            {toolPaths.map((path, i) => (
              <g key={`tp${i}`}>
                <path d={path} fill="none" stroke="rgba(231,162,56,0.07)" strokeWidth="1.5" />
                <circle r="2.5" fill={T.amber} opacity="0.82">
                  <animateMotion path={path} dur={`${2.0 + i * 0.15}s`} repeatCount="indefinite" begin={`${(i * 0.28) % 2.0}s`} />
                </circle>
                <circle r="1.4" fill={T.amber} opacity="0.32">
                  <animateMotion path={path} dur={`${2.0 + i * 0.15}s`} repeatCount="indefinite" begin={`${((i * 0.28) + 0.9) % 2.0}s`} />
                </circle>
              </g>
            ))}

            {/* Center → agent paths */}
            {agentPaths.map((path, i) => (
              <g key={`ap${i}`}>
                <path d={path} fill="none" stroke="rgba(231,162,56,0.1)" strokeWidth="1.5" />
                <circle r="2.5" fill={T.amber} opacity="0.82">
                  <animateMotion path={path} dur={`${2.2 + i * 0.18}s`} repeatCount="indefinite" begin={`${(i * 0.38) % 2.2}s`} />
                </circle>
                <circle r="1.4" fill={T.amber} opacity="0.32">
                  <animateMotion path={path} dur={`${2.2 + i * 0.18}s`} repeatCount="indefinite" begin={`${((i * 0.38) + 1.0) % 2.2}s`} />
                </circle>
              </g>
            ))}

            {/* Tool cards */}
            {tools.map((tool, i) => {
              const cardX = TX, cardY = toolStartY + i * (TH + TGap);
              return (
                <g key={`tool${i}`}>
                  <rect x={cardX} y={cardY} width={TW} height={TH} rx="6" fill="#13151e" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                  {toolIcon(tool.name, cardX + 10, cardY + 11)}
                  <text x={cardX + 42} y={cardY + 22} fontFamily="'Blinker',sans-serif" fontSize="13" fill="#f0ede8" fontWeight="600">{tool.name}</text>
                  <text x={cardX + 42} y={cardY + 35} fontFamily="'Space Mono',monospace" fontSize="7.5" fill="rgba(240,237,232,0.22)" letterSpacing="0.08em">{tool.cat.toUpperCase()}</text>
                  <circle cx={cardX + TW - 6} cy={cardY + TH / 2} r="2.5" fill={T.amber} opacity="0.28" />
                </g>
              );
            })}

            {/* GeniOS node — pulsing rings */}
            <circle cx={cx} cy={cy} r={CR + 22} fill="none" stroke={T.amber} strokeWidth="0.5" strokeOpacity="0.1">
              <animate attributeName="r" values={`${CR+16};${CR+32};${CR+16}`} dur="4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.18;0;0.18" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r={CR + 10} fill="none" stroke={T.amber} strokeWidth="0.5">
              <animate attributeName="r" values={`${CR+8};${CR+20};${CR+8}`} dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.22;0.04;0.22" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Main circle body */}
            <circle cx={cx} cy={cy} r={CR} fill="#13151e" stroke={T.amber} strokeWidth="1" />
            <circle cx={cx} cy={cy} r={CR - 8} fill="rgba(231,162,56,0.055)" />
            {/* Ring accent dots */}
            {[0, 72, 144, 216, 288].map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              return <circle key={i} cx={cx + Math.cos(rad) * CR} cy={cy + Math.sin(rad) * CR} r="2.5" fill={T.amber} opacity="0.5" />;
            })}
            {/* Label */}
            <text x={cx} y={cy - 10} textAnchor="middle" fontFamily="'Blinker',sans-serif" fontSize="18" fill={T.amber} fontWeight="800">GeniOS</text>
            <text x={cx} y={cy + 7} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="7" fill="rgba(240,237,232,0.35)" letterSpacing="0.16em">CONTEXT</text>
            <text x={cx} y={cy + 19} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="7" fill="rgba(240,237,232,0.35)" letterSpacing="0.16em">BRAIN</text>

            {/* Agent cards */}
            {agents.map((agent, i) => {
              const cardX = AX, cardY = agentStartY + i * (AH + AGap);
              return (
                <g key={`agent${i}`}>
                  <rect x={cardX} y={cardY} width={AW} height={AH} rx="6" fill="rgba(231,162,56,0.055)" stroke="rgba(231,162,56,0.28)" strokeWidth="0.5" />
                  <rect x={cardX} y={cardY + 8} width="2.5" height={AH - 16} rx="1.25" fill={T.amber} />
                  {robotIcon(cardX + 10, cardY + 17)}
                  <text x={cardX + 38} y={cardY + 23} fontFamily="'Blinker',sans-serif" fontSize="13" fill="#f0ede8" fontWeight="700">{agent.name}</text>
                  <text x={cardX + 38} y={cardY + 38} fontFamily="'Space Mono',monospace" fontSize="7" fill={T.amber} letterSpacing="0.05em">{agent.outcome.toUpperCase()}</text>
                  <circle cx={cardX + 8} cy={cardY + AH / 2} r="2.5" fill={T.amber} opacity="0.5" />
                </g>
              );
            })}

            {/* Bottom axis labels */}
            <text x={TX + TW / 2} y={H - 6} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="7.5" fill="rgba(240,237,232,0.22)" letterSpacing="0.12em">DATA SOURCES</text>
            <text x={cx} y={H - 6} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="7.5" fill="rgba(231,162,56,0.5)" letterSpacing="0.12em">ORG CONTEXT GRAPH</text>
            <text x={AX + AW / 2} y={H - 6} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="7.5" fill="rgba(240,237,232,0.22)" letterSpacing="0.12em">YOUR AGENTS</text>
          </svg>
        </div>

        <div className="fi d2" style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginTop: 32 }}>
          {["Model-agnostic integration", "Real-time signal sync", "Zero raw data stored", "100+ tools supported"].map((t, i) => (
            <span key={i} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.1em", color: T.textSec, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.amber, display: "block" }} />{t}
            </span>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 9 — APPLICATIONS
═══════════════════════════════════════ */
function Applications() {
  const ref = useRef(); useFI(ref);
  const [tab, setTab] = useState(0);
  const apps = [
    { dept:"Finance", before:{ items:["Agent processes $12K vendor payment immediately","No awareness of Q4 budget freeze policy","No check against CFO approval threshold ($10K)","Finance team discovers the violation 6 days later"] }, after:{ items:["Agent queries Authority + State graph before acting","State graph: Budget freeze active — started Nov 1","Authority graph: $12K exceeds $10K CFO threshold","Action paused → CFO notified → precedent logged — zero human supervision"] }, outcome:"Zero unauthorized payments. Policy enforced automatically across every financial agent you deploy." },
    { dept:"Sales", before:{ items:["Agent sends aggressive follow-up email to prospect","No awareness that relationship cooled 3 weeks ago","No context that colleague already emailed yesterday","Prospect marks email as spam — deal permanently damaged"] }, after:{ items:["Agent checks Relationship graph before composing","Relationship: Cooling — last contact 22 days, commitment overdue","Duplicate contact detected: colleague emailed 1 day ago","Agent drafts softer re-engagement, defers follow-up by 5 days"] }, outcome:"Relationships protected. Follow-ups land at the right moment, with the right tone, automatically." },
    { dept:"HR", before:{ items:["Recruiting agent sends offer letter to candidate","No awareness candidate declined verbally last week","No context another team submitted a competing offer","Duplicate offer sent — legal exposure and candidate trust destroyed"] }, after:{ items:["Agent checks Precedent + State graph before sending","Precedent: Verbal decline logged 7 days ago","State: Competing offer in-flight from engineering team","Agent halts, routes to hiring manager with full context attached"] }, outcome:"Zero duplicate offers. Candidate experience protected. Competing offers resolved before they send." },
    { dept:"Operations", before:{ items:["Ops agent orders $8K of server infrastructure","No awareness of active cost-freeze policy","No context infra team already placed same order 2 days ago","Duplicate order processed — finance escalation required"] }, after:{ items:["Agent queries all 4 graphs before purchase action","State graph: Cost-freeze active — started 12 days ago","Precedent: Similar order submitted by infra team 2 days ago","Action blocked as duplicate — finance team notified automatically"] }, outcome:"Duplicate spend eliminated. Cost policies enforced automatically across every operational agent." },
  ];
  const a = apps[tab];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
          <SectionLabel center>Real-World Applications</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>Every department.<br />Every agent. One brain.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78 }}>See exactly how GeniOS changes agent behavior across the functions where the stakes are highest.</p>
        </div>
        <div className="fi d1" style={{ display: "flex", gap: 1, background: T.border, border: `0.5px solid ${T.border}`, borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
          {apps.map((ap, i) => (
            <button key={i} onClick={() => setTab(i)} className="tb" style={{ flex: 1, padding: "14px 20px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", background: tab === i ? T.amberDim : T.bgCard, color: tab === i ? T.amber : T.textDim, border: "none", borderBottom: tab === i ? `2px solid ${T.amber}` : `2px solid transparent` }}>
              {ap.dept}
            </button>
          ))}
        </div>
        <div className="fi d2 gs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `0.5px solid ${T.border}`, borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
          <div className="sl" style={{ background: T.bgCard, padding: "34px 34px", borderRight: `0.5px solid ${T.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 26, height: 26, borderRadius: 5, background: T.redBg, border: `0.5px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: T.red, fontFamily: T.mono, fontSize: 10 }}>✕</span></div>
              <strong style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(227,75,74,0.72)" }}>Without GeniOS</strong>
            </div>
            {a.before.items.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: T.textSec, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, flexShrink: 0, marginTop: 2 }}>{String(i+1).padStart(2,"0")}</span>{t}
              </div>
            ))}
          </div>
          <div className="sr" style={{ background: "rgba(231,162,56,0.022)", padding: "34px 34px", borderTop: `2px solid ${T.amber}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 26, height: 26, borderRadius: 5, background: T.amberGlow, border: `0.5px solid rgba(231,162,56,.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: T.amber, fontFamily: T.mono, fontSize: 10 }}>✓</span></div>
              <strong style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: T.amber }}>With GeniOS</strong>
            </div>
            {a.after.items.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: T.textSec, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.amber, flexShrink: 0, marginTop: 2 }}>{String(i+1).padStart(2,"0")}</span>{t}
              </div>
            ))}
            <div style={{ marginTop: 22, padding: "14px 18px", borderRadius: 6, background: T.amberGlow, border: `0.5px solid rgba(231,162,56,.2)`, fontSize: 13, color: "rgba(231,162,56,.9)", fontWeight: 300, lineHeight: 1.6 }}>
              <strong style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Outcome</strong>
              {a.outcome}
            </div>
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 9 — COMPARISON TABLE
═══════════════════════════════════════ */
function ComparisonTable() {
  const ref = useRef(); useFI(ref);
  const cols = ["GeniOS", "Memory Tools", "RAG Pipeline", "Agent Framework", "Manual Process"];
  const rows = [
    { label: "Organizational Context Awareness", vals: [true, false, false, false, true] },
    { label: "Multi-Agent Coordination & Conflict Prevention", vals: [true, false, false, false, false] },
    { label: "Authority & Policy Auto-Enforcement", vals: [true, false, false, false, true] },
    { label: "Dynamic Context — Signals Decay & Update in Real-time", vals: [true, false, false, false, false] },
    { label: "Self-Learning from Human Corrections Over Time", vals: [true, false, false, false, false] },
  ];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 60px" }}>
          <SectionLabel center>How GeniOS Compares</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>Nothing else does<br />what GeniOS does.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78 }}>Every existing tool solves a slice of the problem. GeniOS is the only system built around the full organizational context layer.</p>
        </div>
        <div className="fi d1" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, border: `0.5px solid ${T.border}`, borderRadius: 10, overflow: "hidden", fontFamily: T.body, minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ background: T.bgCard, padding: "16px 24px", textAlign: "left", fontFamily: T.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textDim, fontWeight: 400, borderBottom: `0.5px solid ${T.border}`, width: "28%" }}>Capability</th>
                {cols.map((c, i) => (
                  <th key={i} style={{ background: i === 0 ? T.amberGlow : T.bgCard, padding: "16px 18px", textAlign: "center", fontFamily: T.mono, fontSize: i === 0 ? 11 : 9, letterSpacing: "0.06em", color: i === 0 ? T.amber : T.textDim, fontWeight: i === 0 ? 700 : 400, borderBottom: `0.5px solid ${i === 0 ? T.amberBorder : T.border}`, borderLeft: `0.5px solid ${i === 0 ? T.amberBorder : T.border}` }}>
                    {i === 0 && <span style={{ display: "block", fontSize: 8, letterSpacing: "0.15em", marginBottom: 4, opacity: 0.7 }}>▲ RECOMMENDED</span>}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  <td style={{ background: T.bgCard, padding: "15px 24px", fontSize: 13, fontWeight: 300, color: T.textSec, lineHeight: 1.5, borderTop: `0.5px solid ${T.border}` }}>{r.label}</td>
                  {r.vals.map((v, ci) => (
                    <td key={ci} style={{ background: ci === 0 ? T.amberGlow : T.bgCard, textAlign: "center", padding: "15px 18px", borderTop: `0.5px solid ${ci === 0 ? T.amberBorder : T.border}`, borderLeft: `0.5px solid ${ci === 0 ? T.amberBorder : T.border}` }}>
                      <span style={{ fontFamily: T.mono, fontSize: 15, color: v ? (ci === 0 ? T.amber : T.green) : T.textDim }}>{v ? "✓" : "✕"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 10 — API INTEGRATION
═══════════════════════════════════════ */
const TL = [
  { c:"cmt", t:"// 1. Install the GeniOS SDK" },
  { c:"cmd", t:"npm install @genios/sdk" },
  { c:"blank" },
  { c:"cmt", t:"// 2. Initialize with your org data sources" },
  { c:"pts", p:[{s:"d",t:"const "},{s:"k",t:"brain"},{s:"d",t:" = new "},{s:"v",t:"GeniOS"},{s:"d",t:"({ apiKey: process.env.GENIOS_KEY })"}] },
  { c:"blank" },
  { c:"cmt", t:"// 3. Before any agent action — query org context" },
  { c:"pts", p:[{s:"d",t:"const "},{s:"k",t:"ctx"},{s:"d",t:" = await "},{s:"k",t:"brain"},{s:"d",t:".query({"}] },
  { c:"pts", p:[{s:"i"},{s:"k",t:"action"},{s:"d",t:": "},{s:"s",t:'"process_payment"'},{s:"d",t:","}] },
  { c:"pts", p:[{s:"i"},{s:"k",t:"amount"},{s:"d",t:": "},{s:"n",t:"12000"},{s:"d",t:","}] },
  { c:"pts", p:[{s:"i"},{s:"k",t:"vendor"},{s:"d",t:": "},{s:"s",t:'"OpenAI"'}] },
  { c:"pts", p:[{s:"d",t:"});"}] },
  { c:"blank" },
  { c:"cmt", t:"// ctx → full organizational context returned" },
  { c:"pts", p:[{s:"d",t:"// { authorized: "},{s:"n",t:"false"},{s:"d",t:", reason: "},{s:"s",t:'"CFO threshold exceeded"'},{s:"d",t:","}] },
  { c:"pts", p:[{s:"d",t:"//   escalate_to: "},{s:"s",t:'"sarah@acme.com"'},{s:"d",t:", precedent: "},{s:"s",t:'"Approved 2x. Avg: 4h"'},{s:"d",t:" }"}] },
];
const SC = { cmt:"rgba(255,255,255,0.22)", d:"rgba(255,255,255,0.28)", cmd:T.amber, k:T.amber, v:"rgba(157,221,154,0.78)", s:"rgba(206,147,216,0.78)", n:"rgba(157,221,154,0.78)", i:"rgba(0,0,0,0)" };

function ApiSection() {
  const ref = useRef(); useFI(ref);
  const boxRef = useRef();
  const fired = useRef(false);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        io.disconnect();
        setShown(1);
      }
    }, { threshold: 0.2 });
    if (boxRef.current) io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (shown === 0 || shown >= TL.length) return;
    const id = setTimeout(() => setShown(v => v + 1), TL[shown]?.c === "blank" ? 55 : TL[shown]?.c === "cmd" ? 150 : 95);
    return () => clearTimeout(id);
  });
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <Sec id="api" sRef={ref} style={{ padding: "clamp(44px,6vw,76px) 0 clamp(56px,7vw,96px)" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 52px" }}>
          <SectionLabel center>Developer First</SectionLabel>
          <H2 style={{ marginBottom: 16 }}>One API call.<br />Full org context.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78 }}>Drop GeniOS into any agent stack in minutes. Works with every LLM, every orchestration framework, every tool integration.</p>
        </div>
        <div ref={boxRef} className="fi d1" style={{ background: "#060608", border: `0.5px solid ${T.border}`, borderRadius: 10, overflow: "hidden", maxWidth: 820, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 22px", background: "#0c0c10", borderBottom: `0.5px solid ${T.border}` }}>
            {["rgba(255,96,96,0.5)","rgba(255,189,46,0.5)","rgba(50,215,75,0.5)"].map((c,i) => <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "block" }} />)}
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginLeft: 10, letterSpacing: "0.04em" }}>agent.ts — genios SDK integration</span>
          </div>
          <div style={{ padding: "26px 34px 96px", fontFamily: T.mono, fontSize: 13, lineHeight: 1.9, minHeight: 360 }}>
            {TL.slice(0, shown).map((l, i) => (
              <div key={i} style={{ minHeight: "1.9em" }}>
                {l.c === "blank" ? "\u00A0"
                  : l.c === "cmt" ? <span style={{ color: SC.cmt }}>{l.t}</span>
                  : l.c === "cmd" ? <span style={{ color: SC.cmd }}>{l.t}</span>
                  : l.c === "pts" ? l.p.map((p, j) => <span key={j} style={{ color: SC[p.s] || T.textSec }}>{p.t || "  "}</span>)
                  : null}
                {i === shown - 1 && shown < TL.length && <span className="cur" />}
              </div>
            ))}
            {shown >= TL.length && <span className="cur" />}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "52px 32px 28px", background: "linear-gradient(to top,#060608 48%,transparent)", display: "flex", justifyContent: "center" }}>
            <button onClick={() => go("waitlist")} className="bp" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", background: T.amber, color: "#080600", border: "none", padding: "13px 32px", borderRadius: T.radius, fontWeight: 700 }}>
              Request API Access →
            </button>
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 11 — TESTIMONIALS
═══════════════════════════════════════ */
function Testimonials() {
  const ref = useRef(); useFI(ref);
  const qs = [
    { q:"We deployed 12 agents across finance and operations. Before GeniOS, we had three policy violations in the first week. After integrating the context layer, we've had zero in four months. The authority graph alone justified the entire investment.", name:"Prateek Agarwal", role:"Founder", co:"Closyng" },
    { q:"Every agent framework we tried gave us intelligent but organizationally blind agents. GeniOS solved the hardest problem — not how smart the agent is, but whether it understands who we are and how we work. That's the layer that was always missing.", name:"Sneha Vats", role:"Engineer", co:"Gartner" },
    { q:"The autonomous execution rate metric is genuinely the right north star. We went from 30% to 72% in 90 days. My team stopped reviewing agent actions and started reviewing agent outcomes. That's the shift we were building toward.", name:"Harsh Tripathi", role:"Sr. Engineer", co:"Hestabit" },
  ];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 540, margin: "0 auto clamp(32px,5vw,56px)" }}>
          <SectionLabel center>What Builders Say</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>Trusted by engineering teams<br />building at the frontier.</H2>
        </div>
        <div className="g1m" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {qs.map((q, i) => (
            <SpotlightCard key={i} className={`fi d${i+1}`} style={{ padding: "30px 26px", display: "flex", flexDirection: "column" }}>
              {/* Amber quote accent */}
              <div style={{ position: "absolute", top: 20, right: 24, fontFamily: T.display, fontSize: 56, lineHeight: 1, color: "rgba(231,162,56,0.12)", fontWeight: 900, userSelect: "none", pointerEvents: "none" }}>"</div>
              <div style={{ marginBottom: 20 }}>{[0,1,2,3,4].map(si => <span key={si} style={{ color: T.amber, fontSize: 11, marginRight: 2 }}>★</span>)}</div>
              <p style={{ fontSize: 13, fontWeight: 300, color: T.textSec, lineHeight: 1.85, flex: 1, marginBottom: 26, fontStyle: "italic", position: "relative", zIndex: 1 }}>"{q.q}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 20, position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(231,162,56,0.10)", border: "0.5px solid rgba(231,162,56,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, fontSize: 12, color: T.amber, fontWeight: 700, flexShrink: 0 }}>
                  {q.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <strong style={{ display: "block", fontFamily: T.display, fontSize: 14, fontWeight: 600, color: T.text }}>{q.name}</strong>
                  <span style={{ fontSize: 11, color: T.textDim, fontFamily: T.mono, letterSpacing: "0.03em" }}>{q.role} · {q.co}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 12 — CTA / WAITLIST
═══════════════════════════════════════ */
function Waitlist() {
  const ref = useRef(); useFI(ref);
  return (
    <Sec id="waitlist" sRef={ref} style={{ padding: "clamp(60px,8vw,100px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:1000, height:560, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(231,162,56,0.12) 0%,rgba(231,162,56,0.05) 42%,transparent 68%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"20%", left:"8%",  width:360, height:260, background:"radial-gradient(ellipse,rgba(99,102,241,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"6%", width:320, height:240, background:"radial-gradient(ellipse,rgba(20,184,166,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <GeniOSLogo size={19} style={{ margin: "0 auto 28px" }} />
          <SectionLabel center>Limited Early Access</SectionLabel>
          <H2 style={{ marginBottom: 22, fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 800 }}>
            Be first to deploy<br /><span style={{ color: T.amber }}>intelligent agents.</span>
          </H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.8, marginBottom: 52 }}>
            We're onboarding a select group of AI teams. No waitlist theater — direct access, white-glove integration support, and real influence over the product roadmap.
          </p>
          <div style={{ margin: "0 auto 28px", textAlign: "center" }}>
            <a href="https://tally.so/r/xX2jj9" target="_blank" rel="noopener noreferrer" className="bp" style={{ display: "inline-block", fontFamily: T.mono, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", background: T.amber, color: "#080600", border: "none", padding: "16px 40px", borderRadius: T.radius, fontWeight: 700, textDecoration: "none" }}>Apply for Early Access →</a>
          </div>
          <p style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: "0.06em" }}>For teams building AI agents. Enterprise and startup teams welcome.</p>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 12.5 — PRICING
═══════════════════════════════════════ */
function Pricing() {
  const ref = useRef(); useFI(ref);
  const [sel, setSel] = useState("startup");

  const plans = [
    {
      id: "hustler",
      name: "Hustler",
      tag: "Solo builders & small teams",
      price: 25,
      original: 50,
      features: [
        "3 AI Agents",
        "Limited Data Sources",
        "3 Department Context Graphs",
        "3,000 Context queries / month",
        "Relationship & Authority graphs",
        "Email support",
      ],
    },
    {
      id: "startup",
      name: "Startup",
      tag: "Growing AI-native companies",
      price: 149,
      original: 299,
      popular: true,
      features: [
        "10 AI Agents",
        "Unlimited Data Sources",
        "10 Department Context Graphs",
        "20,000 Context queries / month",
        "All 4 intelligence graph layers",
        "Priority support + white-glove onboarding",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tag: "Large-scale org deployments",
      price: null,
      features: [
        "Unlimited AI Agents",
        "Unlimited Data Sources",
        "Unlimited Context Graphs",
        "Unlimited Context queries",
        "On-premise deployment option",
        "Dedicated success team",
      ],
    },
  ];

  return (
    <Sec id="pricing" sRef={ref} style={{ padding: "clamp(56px,7vw,96px) 0", position: "relative" }}>
      <Wrap>
        <div className="fi" style={{ textAlign:"center", maxWidth: 560, margin:"0 auto 48px" }}>
          <SectionLabel center>Pricing</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>Simple pricing.<br />Serious intelligence.</H2>
          <p style={{ fontSize: 15, color: T.textSec, fontWeight: 300, lineHeight: 1.78, marginBottom: 32 }}>No contracts, no lock-in. Cancel any time.</p>
          {/* Founding member banner */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap: 14, background:"linear-gradient(135deg,rgba(231,162,56,0.12) 0%,rgba(231,162,56,0.06) 100%)", border:`1px solid rgba(231,162,56,0.4)`, borderRadius: 100, padding:"10px 24px 10px 14px" }}>
              <span style={{ background: T.amber, color:"#080600", fontFamily: T.mono, fontSize: 9, fontWeight: 800, letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px", borderRadius: 100 }}>Founding Members</span>
              <span style={{ fontFamily: T.body, fontSize: 14, fontWeight: 300, color: T.text }}>
                Be among the first 100 teams — lock in <strong style={{ color: T.amber, fontWeight: 700 }}>50% off</strong> your plan.
              </span>
            </div>
          </div>
        </div>

        <div className="g1m" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 16 }}>
          {plans.map((plan, i) => {
            const isSel = sel === plan.id;
            return (
              <div key={plan.id} onClick={() => setSel(plan.id)}
                className={`fi d${i+1}`}
                style={{ background: isSel ? "rgba(231,162,56,0.04)" : T.bgCard, border:`1px solid ${isSel ? T.amber : T.border}`, borderRadius: 12, padding:"30px 26px", cursor:"pointer", position:"relative", overflow:"hidden", transition:"border-color .25s,background .25s", boxShadow: isSel ? `0 0 0 0.5px ${T.amber}, 0 16px 48px rgba(231,162,56,0.09)` : "none" }}>

                {/* Top bar accent */}
                {isSel && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${T.amber},transparent)` }} />}

                {plan.popular && (
                  <div style={{ position:"absolute", top:16, right:16 }}>
                    <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing:"0.14em", textTransform:"uppercase", color:"#080600", background: T.amber, padding:"4px 10px", borderRadius: 100, fontWeight: 800 }}>Most Popular</span>
                  </div>
                )}

                {/* Radio + Name */}
                <div style={{ display:"flex", alignItems:"center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 18, height: 18, borderRadius:"50%", border:`2px solid ${isSel ? T.amber : T.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink: 0, transition:"border-color .2s" }}>
                    {isSel && <div style={{ width: 8, height: 8, borderRadius:"50%", background: T.amber }} />}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: T.display, fontSize: 17, fontWeight: 700, letterSpacing:"-0.015em", color: T.text, lineHeight: 1 }}>{plan.name}</h3>
                    <p style={{ fontFamily: T.mono, fontSize: 9, letterSpacing:"0.08em", textTransform:"uppercase", color: T.textDim, marginTop: 4 }}>{plan.tag}</p>
                  </div>
                </div>

                {/* Price */}
                {plan.price ? (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: T.display, fontSize: 42, fontWeight: 800, letterSpacing:"-0.03em", color: T.amber, lineHeight: 1 }}>${plan.price}</span>
                      <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>/mo</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
                      <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, textDecoration:"line-through" }}>${plan.original}/mo</span>
                      <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(231,162,56,0.85)", background:"rgba(231,162,56,0.1)", border:`0.5px solid rgba(231,162,56,0.3)`, padding:"3px 8px", borderRadius: 100 }}>50% Off</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: T.display, fontSize: 34, fontWeight: 800, letterSpacing:"-0.03em", color: T.text, lineHeight: 1 }}>Custom</span>
                    <p style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, marginTop: 6, letterSpacing:"0.06em" }}>Contact us for a quote</p>
                  </div>
                )}

                {/* Divider */}
                <div style={{ height:1, background: isSel ? "rgba(231,162,56,0.2)" : T.border, marginBottom: 20 }} />

                {/* Features */}
                <div style={{ display:"flex", flexDirection:"column", gap: 11, marginBottom: 28 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display:"flex", alignItems:"flex-start", gap: 10, fontSize: 13, fontWeight: 300, color: T.textSec, lineHeight: 1.5 }}>
                      <span style={{ color: isSel ? T.amber : T.textDim, fontFamily: T.mono, fontSize: 11, flexShrink: 0, marginTop: 1 }}>→</span>
                      {f}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="https://tally.so/r/xX2jj9" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  className="bp"
                  style={{ display:"block", width:"100%", textAlign:"center", fontFamily: T.mono, fontSize: 10, letterSpacing:"0.1em", textTransform:"uppercase", background: isSel ? T.amber : "transparent", color: isSel ? "#080600" : T.textSec, border:`0.5px solid ${isSel ? T.amber : T.border}`, padding:"13px 20px", borderRadius: T.radius, fontWeight: isSel ? 700 : 400, cursor:"pointer", transition:"all .2s", textDecoration:"none", boxSizing:"border-box" }}>
                  {plan.price ? "Apply for Early Access →" : "Contact Sales →"}
                </a>
              </div>
            );
          })}
        </div>

        <div className="fi d3" style={{ textAlign:"center", marginTop: 36 }}>
          <p style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing:"0.06em" }}>
            All plans include a 14-day free trial · No credit card required · Founding rate guaranteed as long as you stay
          </p>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 13 — TAGLINE FOR AGENTS
═══════════════════════════════════════ */
function AgentTagline() {
  const ref = useRef(); useFI(ref);
  return (
    <Sec sRef={ref} style={{ padding: "clamp(44px,6vw,76px) 0", background: `linear-gradient(135deg,${T.bgCard} 0%,rgba(99,102,241,0.04) 35%,rgba(231,162,56,0.03) 65%,${T.bgCard} 100%)` }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
          <GeniOSLogo size={23} style={{ margin: "0 auto 24px" }} />
          <div style={{ width:"100%", maxWidth:680, margin:"0 auto 36px", opacity:0.45 }}>
            <svg viewBox="0 0 680 60" fill="none" style={{ width:"100%", height:"auto" }}>
              <circle cx="16" cy="30" r="4" fill="rgba(231,162,56,0.7)"/>
              <circle cx="40" cy="16" r="3" fill="rgba(231,162,56,0.5)"/>
              <circle cx="40" cy="44" r="3" fill="rgba(231,162,56,0.5)"/>
              <circle cx="62" cy="30" r="3" fill="rgba(231,162,56,0.4)"/>
              <line x1="20" y1="30" x2="37" y2="18" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="20" y1="30" x2="37" y2="42" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="43" y1="18" x2="59" y2="28" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="43" y1="42" x2="59" y2="32" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="65" y1="30" x2="315" y2="30" stroke="rgba(231,162,56,0.18)" strokeWidth="0.8" strokeDasharray="4 7"/>
              <circle cx="340" cy="30" r="20" fill="rgba(231,162,56,0.06)" stroke={T.amber} strokeWidth="0.8" strokeOpacity="0.5"/>
              <circle cx="340" cy="30" r="9" fill={T.amber} opacity="0.9"/>
              <circle cx="340" cy="30" r="26" fill="none" stroke={T.amber} strokeWidth="0.5" strokeOpacity="0.15">
                <animate attributeName="r" values="26;34;26" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite"/>
              </circle>
              <line x1="365" y1="30" x2="615" y2="30" stroke="rgba(231,162,56,0.18)" strokeWidth="0.8" strokeDasharray="4 7"/>
              <circle cx="618" cy="30" r="3" fill="rgba(231,162,56,0.4)"/>
              <circle cx="640" cy="16" r="3" fill="rgba(231,162,56,0.5)"/>
              <circle cx="640" cy="44" r="3" fill="rgba(231,162,56,0.5)"/>
              <circle cx="664" cy="30" r="4" fill="rgba(231,162,56,0.7)"/>
              <line x1="621" y1="28" x2="637" y2="18" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="621" y1="32" x2="637" y2="42" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="643" y1="18" x2="661" y2="28" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <line x1="643" y1="42" x2="661" y2="32" stroke="rgba(231,162,56,0.35)" strokeWidth="0.8"/>
              <circle r="2.5" fill={T.amber} opacity="0.9">
                <animateMotion path="M65,30 C180,30 240,30 315,30" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle r="2.5" fill={T.amber} opacity="0.9">
                <animateMotion path="M365,30 C460,30 540,30 615,30" dur="1.8s" repeatCount="indefinite" begin="0.35s"/>
              </circle>
            </svg>
          </div>
          <p style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.textDim, marginBottom: 40 }}>A new era of agentic AI</p>
          <p style={{ fontFamily: T.display, fontSize: "clamp(26px,4.5vw,68px)", fontWeight: 800, letterSpacing: "-0.034em", lineHeight: 1.06, color: T.text, marginBottom: 32 }}>
            Agents don't need to be <span style={{ color: T.amber }}>smarter.</span><br />
            They need to know <span style={{ color: T.amber }}>where they are.</span>
          </p>
          <div style={{ width: 48, height: 1, background: T.amber, margin: "0 auto 36px", opacity: 0.45 }} />
          <p style={{ fontSize: 15, fontWeight: 300, color: T.textSec, lineHeight: 1.8, maxWidth: 580, margin: "0 auto clamp(24px,4vw,44px)" }}>
            The most capable agent in the world still fails without the context to act correctly inside your organization. GeniOS is the infrastructure that changes that — permanently.
          </p>
          <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
            {["Model-agnostic", "Always-on context", "Self-improving graph", "Zero-retraining needed"].map((t, i) => (
              <span key={i} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.1em", color: T.textSec, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.amber, display: "block" }} />{t}
              </span>
            ))}
          </div>
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 14 — BACKED & ADVISED BY
═══════════════════════════════════════ */
const BrandLogo = ({ id }) => {
  const logos = {
    nvidia: <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#76B90018"/><text x="14" y="20" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="15" fontWeight="900" fill="#76B900">N</text></svg>,
    iimb:   <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#1d4ed820"/><text x="14" y="18" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="10" fontWeight="900" fill="#60a5fa">IIMB</text></svg>,
    iiitd:  <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#f9731618"/><text x="14" y="19" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="9" fontWeight="900" fill="#f97316">IIITD</text></svg>,
    microsoft: <svg viewBox="0 0 28 28" width="28" height="28"><rect x="3" y="3" width="10" height="10" fill="#F25022"/><rect x="15" y="3" width="10" height="10" fill="#7FBA00"/><rect x="3" y="15" width="10" height="10" fill="#00A4EF"/><rect x="15" y="15" width="10" height="10" fill="#FFB900"/></svg>,
    ibm:    <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#0062FF18"/><text x="14" y="19" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="11" fontWeight="900" fill="#0062FF" letterSpacing="1">IBM</text></svg>,
    adobe:  <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#FF0000"/><path d="M14 5l7 18h-4.5l-1.5-4h-6L7.5 23H3L10 5h4zm0 5.5L12 17h4l-2-6.5z" fill="white"/></svg>,
    google: <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#ffffff08"/><path d="M22 14.2c0-.7-.1-1.3-.2-1.9H14v3.5h4.5c-.2 1-.8 1.9-1.7 2.5v2h2.7c1.6-1.5 2.5-3.6 2.5-6.1z" fill="#4285F4"/><path d="M14 23c2.2 0 4.1-.7 5.5-2l-2.7-2c-.7.5-1.7.8-2.8.8-2.1 0-3.9-1.4-4.6-3.4H6.6v2.1C8 21.4 10.8 23 14 23z" fill="#34A853"/><path d="M9.4 16.4c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6v-2.1H6.6C6 12.3 5.7 13.1 5.7 14s.3 1.7.9 2.4l2.8-2z" fill="#FBBC05"/><path d="M14 9.6c1.2 0 2.3.4 3.1 1.2l2.3-2.3C17.9 7.3 16.1 6.5 14 6.5c-3.2 0-6 1.6-7.4 4l2.8 2.1c.7-2 2.5-3 4.6-3z" fill="#EA4335"/></svg>,
    gartner:<svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#009CDE18"/><text x="14" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="5.5" fontWeight="800" fill="#009CDE">GARTNER</text><rect x="4" y="17" width="20" height="1.5" fill="#009CDE" opacity="0.5"/></svg>,
  };
  return logos[id] || null;
};

function BackedBy() {
  const ref = useRef(); useFI(ref);
  const backed = [
    { name: "NVIDIA Inception", logo: "nvidia" },
    { name: "NSRCEL · IIMB",   logo: "iimb"   },
    { name: "IIITD-IC",        logo: "iiitd"  },
    { name: "Microsoft",       logo: "microsoft" },
  ];
  const advised = [
    { name: "Aakriti Aggarwal · Sr. AI Engineer · IBM",    logo: "ibm"    },
    { name: "Shiv Kumar Sah · DevOps Engineer · Adobe",    logo: "adobe"  },
    { name: "Pratiksha Aggarwal · SDE · Google",           logo: "google" },
    { name: "Arka Mazumder · SDE-II · Google",             logo: "google" },
  ];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(44px,6vw,76px) 0" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel center>Backed & Advised By</SectionLabel>
        </div>
        <div className="g1m fi d1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {[{ label: "Backed by", items: backed }, { label: "Advised by", items: advised }].map((group, gi) => (
            <div key={gi}>
              <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textDim, display: "block", marginBottom: 20 }}>{group.label}</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {group.items.map((item, i) => (
                  <div key={i} className="hc" style={{ background: T.bgCard, border: `0.5px solid ${T.border}`, borderRadius: 8, padding: "20px 18px" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: T.amberGlow, border: `0.5px solid ${T.amberBorder}`, marginBottom: 12, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                      <BrandLogo id={item.logo} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 300, color: T.textSec, lineHeight: 1.5, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ═══════════════════════════════════════
   SECTION 15 — JOIN THE COMMUNITY
═══════════════════════════════════════ */
function Community() {
  const ref = useRef(); useFI(ref);
  const channels = [
    { icon:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", label:"Founder", desc:"Connect with Rohit Swerashi.", cta:"Connect", href:"https://www.linkedin.com/in/rohitswerashi/" },
    { icon:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", label:"GeniOS", desc:"Follow us on LinkedIn.", cta:"Follow", href:"https://www.linkedin.com/company/thegenios/" },
  ];
  return (
    <Sec sRef={ref} style={{ padding: "clamp(44px,6vw,76px) 0 clamp(36px,5vw,64px)" }}>
      <Wrap>
        <div className="fi" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 44px" }}>
          <SectionLabel center>Connect with Us</SectionLabel>
          <H2 style={{ marginBottom: 20 }}>Follow our journey<br />building context infrastructure.</H2>
        </div>
        <div className="g1m" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, maxWidth: 800, margin: "0 auto" }}>
          {channels.map((ch, i) => (
            <a key={i} href={ch.href} target="_blank" rel="noopener noreferrer" className={`hl fi d${i+1}`} style={{ background: T.bgCard, border: `0.5px solid ${T.border}`, borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", gap: 18, textDecoration: "none" }}>
              <IBox style={{ marginBottom: 0, flexShrink: 0 }}><SVGIco d={ch.icon} /></IBox>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: T.display, fontSize: 15, fontWeight: 700, letterSpacing: "-0.015em", color: T.text, marginBottom: 4 }}>{ch.label}</h3>
                <p style={{ fontSize: 12, color: T.textSec, fontWeight: 300, lineHeight: 1.5, margin: 0 }}>{ch.desc}</p>
              </div>
              <span className="bo" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: T.amber, border: `0.5px solid ${T.amberBorder}`, padding: "9px 18px", borderRadius: T.radius, flexShrink: 0, whiteSpace: "nowrap" }}>
                {ch.cta} →
              </span>
            </a>
          ))}
        </div>
      </Wrap>
    </Sec>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ padding: "18px clamp(16px,4vw,48px)", borderTop: `0.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.amber, display: "block" }} />
        <GeniOSLogo size={15} style={{ opacity: 0.65 }} />
      </div>
      <div className="hm" style={{ display: "flex", gap: 26 }}>
        {[["Privacy","#"],["Security","#"],["Terms","#"],["Contact","#"],["LinkedIn","https://www.linkedin.com/company/thegenios/"]].map(([l,h]) => <a key={l} href={h} target={h.startsWith("http")?"_blank":undefined} rel={h.startsWith("http")?"noopener noreferrer":undefined} className="ha" style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</a>)}
      </div>
      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: "0.06em" }}>© 2026 GeniOS. All rights reserved.</span>
    </footer>
  );
}

/* ═══════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════ */
export default function GeniOSLanding() {
  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.body }}>
      <AmbientOrbs />
      <Nav />
      <Hero />
      <Metrics1 />
      <GapExample />
      <Problem />
      <Solution />
      <Metrics2 />
      <Pillars />
      <IntegrationsFlow />
      <Applications />
      <ComparisonTable />
      <ApiSection />
      <Testimonials />
      <Pricing />
      <Waitlist />
      <AgentTagline />
      <BackedBy />
      <Community />
      <Footer />
    </div>
  );
}
