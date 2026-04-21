import React from "react";

/* ──────────────────────────────────────────────────────────────
  SKELETON / LOADING STATE for the Copper theme
  Same composition as DemoCopper  -  content replaced with
  shimmering placeholder blocks. Used while data is loading.
─────────────────────────────────────────────────────────────── */
const T = {
  deep:  "#10232A",
  deep2:  "#0B1A20",
  slate:  "#3D4D55",
  warmGray: "#A79E9C",
  cream:  "#F2ECE4",
  cream2:  "#FAF6F0",
  copper:  "#B58863",
  copper2:  "#C99A75",
  ink:  "#161616",
  lineOnDark:  "rgba(242,236,228,0.10)",
  lineOnLight: "rgba(22,22,22,0.10)",
  display: "'Cormorant Garamond', serif",
  body:  "'Inter', sans-serif",
  mono:  "'JetBrains Mono', monospace",
};

/* shimmer helpers  -  gradient that sweeps left->right */
const shimmerOnDark = `linear-gradient(90deg,
  rgba(242,236,228,0.06) 0%,
  rgba(242,236,228,0.14) 50%,
  rgba(242,236,228,0.06) 100%)`;
const shimmerOnLight = `linear-gradient(90deg,
  rgba(22,22,22,0.06) 0%,
  rgba(22,22,22,0.13) 50%,
  rgba(22,22,22,0.06) 100%)`;
const shimmerCopper = `linear-gradient(90deg,
  rgba(181,136,99,0.18) 0%,
  rgba(201,154,117,0.40) 50%,
  rgba(181,136,99,0.18) 100%)`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.copper};font-family:${T.body};font-size:16px;-webkit-font-smoothing:antialiased;overflow-x:hidden}

@keyframes shimmer{
  0%{background-position:-200% 0}
  100%{background-position:200% 0}
}
@keyframes pulse{
  0%,100%{opacity:0.55}
  50%{opacity:1}
}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

/* ── shimmer block primitives ── */
.sk{position:relative;border-radius:6px;overflow:hidden;background-size:200% 100%;animation:shimmer 1.6s linear infinite;display:inline-block}
.sk-dark{background-image:${shimmerOnDark}}
.sk-light{background-image:${shimmerOnLight}}
.sk-copper{background-image:${shimmerCopper}}
.sk-pill{border-radius:999px}
.sk-circle{border-radius:50%}

/* common widths/heights */
.h8{height:8px}.h10{height:10px}.h12{height:12px}.h14{height:14px}.h18{height:18px}.h22{height:22px}.h28{height:28px}.h36{height:36px}.h48{height:48px}.h64{height:64px}.h80{height:80px}.h96{height:96px}
.w20{width:20%}.w30{width:30%}.w40{width:40%}.w50{width:50%}.w60{width:60%}.w70{width:70%}.w80{width:80%}.w90{width:90%}.w100{width:100%}
.row{display:flex;align-items:center;gap:12px}
.col{display:flex;flex-direction:column;gap:14px}
.stack-tight{display:flex;flex-direction:column;gap:8px}
.stack-md{display:flex;flex-direction:column;gap:18px}
.stack-lg{display:flex;flex-direction:column;gap:28px}

.wrap{max-width:1320px;margin:0 auto;padding:0 40px;position:relative;z-index:2}

/* ── COPPER OUTER FRAME ── */
.frame-outer{background:${T.copper};padding:28px;min-height:100vh}
.frame-inner{background:${T.deep};border-radius:6px;overflow:hidden;position:relative;min-height:calc(100vh - 56px)}
.frame-inner::before{content:'';position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;opacity:0.18;background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}

/* ── NAV ── */
.nav{position:relative;z-index:10;border-bottom:0.5px solid ${T.lineOnDark}}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:80px;padding:0 48px}
.nav-left{display:flex;align-items:center;gap:32px}
.nav-burger{display:flex;flex-direction:column;gap:5px}
.nav-burger span{width:22px;height:1px;background:${T.warmGray};opacity:0.4}
.nav-center{display:flex;gap:48px}
.nav-right{display:flex;gap:22px}

/* ── HERO ── */
.hero{position:relative;display:grid;grid-template-columns:80px 1fr 1fr 80px;min-height:680px;padding:0}
.hero-rail{display:flex;flex-direction:column;justify-content:center;padding-left:48px;gap:22px}

.hero-visual{display:flex;align-items:center;justify-content:center;padding:60px 0;position:relative}
.hero-orb-wrap{position:relative;width:420px;height:420px}
.hero-orb-ring{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 90deg, ${T.copper} 0deg, ${T.copper2} 120deg, transparent 200deg, transparent 360deg);animation:spin 6s linear infinite;opacity:0.45;mask:radial-gradient(circle at center, transparent 58%, #000 60%);-webkit-mask:radial-gradient(circle at center, transparent 58%, #000 60%)}
.hero-orb{position:absolute;inset:24px;border-radius:50%;background:${T.deep2};box-shadow:0 30px 90px rgba(0,0,0,0.45),inset 0 0 60px rgba(0,0,0,0.55);overflow:hidden}
.hero-orb::before{content:'';position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,rgba(242,236,228,0.18) 0%,rgba(242,236,228,0.05) 35%,transparent 65%)}
.hero-orb-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:2;padding:0 60px}

.hero-text{display:flex;flex-direction:column;justify-content:center;padding:0 48px 0 32px;position:relative;gap:18px}
.hero-text::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:1px;height:38%;background:${T.copper};opacity:0.6}

.hero-side{position:relative;display:flex;align-items:center;justify-content:flex-end;padding-right:48px}
.hero-side-vert{width:38px;height:60%;display:flex;flex-direction:column;gap:14px;justify-content:center;opacity:0.18}

/* ── PRINCIPLES (cream) ── */
.principles{background:${T.cream};padding:140px 0 160px;position:relative;z-index:2}
.princ-head{display:flex;flex-direction:column;gap:24px}
.princ-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:96px;border-top:1px solid ${T.lineOnLight}}
.pcell{padding:48px 36px 56px;border-right:1px solid ${T.lineOnLight};border-bottom:1px solid ${T.lineOnLight};min-height:280px;display:flex;flex-direction:column;justify-content:space-between;gap:20px}
.pcell:nth-child(3n){border-right:0}

/* ── SPLIT (deep x cream flip) ── */
.split{display:grid;grid-template-columns:1fr 1fr;min-height:580px}
.split-l{background:${T.deep};padding:96px 64px 96px 8vw;display:flex;flex-direction:column;justify-content:space-between;gap:32px;position:relative}
.split-l::after{content:'';position:absolute;right:0;top:20%;bottom:20%;width:1px;background:${T.copper};opacity:0.4}
.split-r{background:${T.cream};padding:96px 8vw 96px 64px;display:flex;flex-direction:column;justify-content:space-between;gap:32px}

/* ── CTA FOOTER ── */
.cta{background:${T.deep};padding:160px 0 80px;text-align:center;position:relative}
.cta::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:60px;background:${T.copper};opacity:0.5}
.cta-inner{display:flex;flex-direction:column;align-items:center;gap:36px}
.cta-foot{margin-top:120px;padding-top:36px;border-top:1px solid ${T.lineOnDark};display:flex;justify-content:space-between;align-items:center;padding-left:48px;padding-right:48px;gap:24px}

/* badge for "loading" hint */
.loading-badge{position:fixed;bottom:20px;right:20px;z-index:99;background:rgba(16,35,42,0.92);color:${T.cream};font-family:${T.mono};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;padding:10px 16px;border:1px solid ${T.copper};border-radius:999px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(10px)}
.loading-badge .dot{width:6px;height:6px;border-radius:50%;background:${T.copper};animation:pulse 1.2s ease-in-out infinite}

@media(max-width:980px){
  .frame-outer{padding:14px}
  .nav-inner{padding:0 24px}
  .nav-center{display:none}
  .hero{grid-template-columns:1fr;padding:0 24px}
  .hero-rail{flex-direction:row;padding:24px 0;justify-content:center;gap:28px}
  .hero-visual{padding:24px 0}
  .hero-orb-wrap{width:300px;height:300px}
  .hero-text{padding:24px 0 60px}
  .hero-text::before,.hero-side{display:none}
  .princ-grid{grid-template-columns:1fr}
  .pcell{border-right:0}
  .split{grid-template-columns:1fr}
  .split-l,.split-r{padding:64px 24px}
  .split-l::after{display:none}
  .cta-foot{flex-direction:column;gap:18px;text-align:center}
}
`;

/* ── tiny shimmer-block helpers ── */
const Sk = ({ w = "100%", h = 14, variant = "dark", pill = false, circle = false, style }) => (
  <span
  className={`sk sk-${variant}${pill ? " sk-pill" : ""}${circle ? " sk-circle" : ""}`}
  style={{ width: w, height: h, borderRadius: circle ? "50%" : pill ? 999 : 6, ...style }}
  />
);

export default function DemoSkeleton() {
  return (
  <>
  <style>{CSS}</style>

  <div className="frame-outer">
  <div className="frame-inner">

  <nav className="nav">
  <div className="nav-inner">
  <div className="nav-left">
  <div className="nav-burger"><span /><span /><span /></div>
  <Sk w={120} h={16} variant="dark" />
  </div>
  <div className="nav-center">
  <Sk w={70} h={12} variant="dark" />
  <Sk w={70} h={12} variant="dark" />
  <Sk w={70} h={12} variant="dark" />
  <Sk w={70} h={12} variant="dark" />
  </div>
  <div className="nav-right">
  <Sk w={20} h={20} variant="dark" circle />
  <Sk w={20} h={20} variant="dark" circle />
  <Sk w={20} h={20} variant="dark" circle />
  </div>
  </div>
  </nav>

  <section className="hero">
  <div className="hero-rail">
  <Sk w={42} h={36} variant="copper" />
  <Sk w={42} h={32} variant="dark" />
  <Sk w={42} h={32} variant="dark" />
  <Sk w={42} h={32} variant="dark" />
  </div>

  <div className="hero-visual">
  <div className="hero-orb-wrap">
  <div className="hero-orb-ring" />
  <div className="hero-orb">
  <div className="hero-orb-content">
  <Sk w={180} h={64} variant="dark" />
  <Sk w={120} h={10} variant="dark" pill />
  </div>
  </div>
  </div>
  </div>

  <div className="hero-text">
  <Sk w={140} h={10} variant="copper" pill />
  <div className="stack-tight">
  <Sk w="78%" h={56} variant="dark" />
  <Sk w="92%" h={56} variant="dark" />
  <Sk w="60%" h={56} variant="dark" />
  </div>
  <div className="stack-tight" style={{ marginTop: 14 }}>
  <Sk w="92%" h={12} variant="dark" />
  <Sk w="86%" h={12} variant="dark" />
  <Sk w="64%" h={12} variant="dark" />
  </div>
  <Sk w={210} h={48} variant="copper" pill style={{ marginTop: 18 }} />
  </div>

  <div className="hero-side">
  <div className="hero-side-vert">
  <Sk w="100%" h="100%" variant="dark" />
  </div>
  </div>
  </section>

  </div>
  </div>

  <section className="principles">
  <div className="wrap">
  <div className="princ-head">
  <Sk w={140} h={10} variant="copper" pill />
  <div className="stack-tight">
  <Sk w="60%" h={48} variant="light" />
  <Sk w="48%" h={48} variant="light" />
  </div>
  </div>
  <div className="princ-grid">
  {Array.from({ length: 6 }).map((_, i) => (
  <div className="pcell" key={i}>
  <Sk w={36} h={10} variant="copper" pill />
  <div className="stack-tight">
  <Sk w="70%" h={22} variant="light" />
  <Sk w="92%" h={11} variant="light" />
  <Sk w="86%" h={11} variant="light" />
  <Sk w="58%" h={11} variant="light" />
  </div>
  </div>
  ))}
  </div>
  </div>
  </section>

  <section className="split">
  <div className="split-l">
  <Sk w={120} h={10} variant="copper" pill />
  <div className="stack-tight">
  <Sk w="86%" h={44} variant="dark" />
  <Sk w="70%" h={44} variant="dark" />
  <div style={{ height: 22 }} />
  <Sk w="92%" h={12} variant="dark" />
  <Sk w="84%" h={12} variant="dark" />
  <Sk w="60%" h={12} variant="dark" />
  </div>
  </div>
  <div className="split-r">
  <Sk w={120} h={10} variant="copper" pill />
  <div className="stack-tight">
  <Sk w="86%" h={44} variant="light" />
  <Sk w="70%" h={44} variant="light" />
  <div style={{ height: 22 }} />
  <Sk w="92%" h={12} variant="light" />
  <Sk w="84%" h={12} variant="light" />
  <Sk w="60%" h={12} variant="light" />
  </div>
  </div>
  </section>

  <section className="cta">
  <div className="wrap">
  <div className="cta-inner">
  <Sk w={140} h={10} variant="copper" pill />
  <div className="stack-tight" style={{ alignItems: "center", width: "100%" }}>
  <Sk w="60%" h={64} variant="dark" />
  <Sk w="48%" h={64} variant="dark" />
  </div>
  <Sk w={240} h={52} variant="copper" pill />
  </div>
  <div className="cta-foot">
  <Sk w={140} h={10} variant="dark" />
  <div className="row">
  <Sk w={70} h={10} variant="dark" />
  <Sk w={70} h={10} variant="dark" />
  <Sk w={70} h={10} variant="dark" />
  </div>
  <Sk w={140} h={10} variant="dark" />
  </div>
  </div>
  </section>

  <div className="loading-badge">
  <span className="dot" /> Loading
  </div>
  </>
  );
}
