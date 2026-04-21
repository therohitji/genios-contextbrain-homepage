import React from "react";

/* ──────────────────────────────────────────────────────────────
  TOKENS  -  deep teal x copper x cream (luxury editorial)
  Palette derived from reference: #10232A  -  #3D4D55  -  #A79E9C
  #D3C3B9  -  #B58863  -  #161616
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
  lineOnDark:  "rgba(211,195,185,0.14)",
  lineOnLight: "rgba(22,22,22,0.12)",
  display: "'Cormorant Garamond', serif",
  body:  "'Inter', sans-serif",
  mono:  "'JetBrains Mono', monospace",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.copper};color:${T.cream};font-family:${T.body};font-weight:400;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}

::selection{background:${T.copper};color:${T.deep}}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
.fu{animation:fadeUp 1.1s both}
.d1{animation-delay:.08s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.54s}.d5{animation-delay:.70s}

.wrap{max-width:1320px;margin:0 auto;padding:0 40px;position:relative;z-index:2}

/* ── COPPER OUTER FRAME ── */
.frame-outer{background:${T.copper};padding:28px;min-height:100vh}
.frame-inner{background:${T.deep};color:${T.cream};border-radius:6px;overflow:hidden;position:relative;min-height:calc(100vh - 56px)}
.frame-inner::before{content:'';position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;opacity:0.18;background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}

/* ── NAV ── */
.nav{position:relative;z-index:10;border-bottom:0.5px solid ${T.lineOnDark}}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:80px;padding:0 48px}
.nav-left{display:flex;align-items:center;gap:32px}
.nav-burger{display:flex;flex-direction:column;gap:5px;cursor:pointer}
.nav-burger span{width:22px;height:1px;background:${T.cream}}
.brand{font-family:${T.display};font-weight:500;font-size:20px;letter-spacing:0.3em;color:${T.cream}}
.nav-center{display:flex;gap:48px;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${T.warmGray}}
.nav-center a{color:inherit;text-decoration:none;padding-bottom:4px;border-bottom:1px solid transparent;transition:color .25s,border-color .25s}
.nav-center a.active{color:${T.cream};border-color:${T.cream}}
.nav-center a:hover{color:${T.cream}}
.nav-right{display:flex;gap:22px;color:${T.cream};opacity:0.85}
.nav-icon{width:18px;height:18px;cursor:pointer;transition:opacity .2s}
.nav-icon:hover{opacity:0.6}

/* ── HERO ── */
.hero{position:relative;display:grid;grid-template-columns:80px 1fr 1fr 80px;min-height:680px;padding:0}
.hero-rail{display:flex;flex-direction:column;justify-content:center;padding-left:48px;gap:18px;font-family:${T.display};color:${T.warmGray}}
.hero-rail .num{font-size:34px;font-weight:300;letter-spacing:-0.02em;line-height:1;cursor:pointer;transition:color .25s;position:relative;display:inline-block;width:max-content}
.hero-rail .num.active{color:${T.cream}}
.hero-rail .num.active::after{content:'';position:absolute;left:-8px;right:-8px;top:50%;height:1px;background:${T.copper};animation:strike .9s .3s both}

.hero-visual{display:flex;align-items:center;justify-content:center;padding:60px 0;position:relative}
.hero-orb{width:420px;height:420px;border-radius:50%;background:radial-gradient(circle at 35% 30%,${T.cream2} 0%,${T.cream} 38%,${T.copper2} 65%,${T.copper} 100%);position:relative;box-shadow:0 30px 90px rgba(0,0,0,0.45),inset 0 0 60px rgba(22,22,22,0.18)}
.hero-orb::before{content:'';position:absolute;inset:32px;border-radius:50%;background:radial-gradient(circle at 50% 45%,${T.deep2} 0%,${T.deep} 70%);box-shadow:inset 0 0 40px rgba(0,0,0,0.6)}
.hero-orb::after{content:'';position:absolute;inset:80px;border-radius:50%;border:1px solid ${T.copper};opacity:0.4}
.hero-dial{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;color:${T.cream};font-family:${T.display};z-index:2}
.hero-dial-time{font-size:96px;font-weight:300;letter-spacing:-0.04em;line-height:1;display:flex;align-items:flex-start}
.hero-dial-time sup{font-size:38px;margin-top:14px;margin-left:4px;color:${T.copper}}
.hero-dial-meta{font-family:${T.mono};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${T.warmGray};margin-top:12px}
.hero-dial-arc{position:absolute;width:340px;height:340px;border-radius:50%;border:1px solid transparent;border-top-color:${T.copper};border-right-color:${T.copper};opacity:0.7;animation:pulse 4s ease-in-out infinite}

.hero-text{display:flex;flex-direction:column;justify-content:center;padding:0 48px 0 32px;position:relative}
.hero-text::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:1px;height:38%;background:${T.copper}}
.hero-kicker{font-family:${T.mono};font-size:11px;letter-spacing:0.36em;text-transform:uppercase;color:${T.warmGray};writing-mode:vertical-rl;transform:rotate(180deg);position:absolute;left:14px;top:50%;translate:0 -50%;display:flex;align-items:center;gap:14px}
.hero-h{font-family:${T.display};font-size:clamp(54px,7.4vw,104px);line-height:0.96;letter-spacing:-0.025em;color:${T.cream};max-width:14ch}
.hero-h .thin{font-weight:300;font-style:italic;color:${T.warmGray}}
.hero-h .bold{font-weight:600;color:${T.cream}}
.hero-sub{margin-top:32px;max-width:42ch;font-size:15px;line-height:1.65;color:${T.warmGray}}
.hero-cta{margin-top:44px;display:inline-flex;align-items:center;gap:14px;background:${T.cream};color:${T.deep};font-family:${T.body};font-weight:500;font-size:14px;padding:16px 26px;border-radius:999px;border:none;cursor:pointer;letter-spacing:0.02em;transition:transform .25s,background .25s;width:max-content}
.hero-cta:hover{background:${T.cream2};transform:translateX(4px)}
.hero-cta .price{color:${T.copper};font-weight:600;margin-left:6px}

.hero-side{position:relative;display:flex;align-items:center;justify-content:flex-end;padding-right:48px}
.hero-side .vert{font-family:${T.display};font-weight:600;font-size:96px;letter-spacing:-0.04em;color:${T.cream};opacity:0.08;writing-mode:vertical-rl;transform:rotate(180deg);line-height:1}

/* ── PRINCIPLES (cream) ── */
.principles{background:${T.cream};color:${T.ink};padding:140px 0 160px;position:relative;z-index:2}
.princ-kicker{font-family:${T.mono};font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:${T.copper};display:flex;align-items:center;gap:14px;margin-bottom:32px}
.princ-kicker::before{content:'';width:48px;height:1px;background:${T.copper}}
.princ-h{font-family:${T.display};font-weight:300;font-size:clamp(44px,6vw,84px);line-height:1.02;letter-spacing:-0.028em;max-width:18ch;color:${T.deep}}
.princ-h em{font-style:italic;color:${T.copper};font-weight:400}
.princ-h b{font-weight:600;color:${T.deep}}
.princ-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:96px;border-top:1px solid ${T.lineOnLight}}
.pcell{padding:48px 36px 56px;border-right:1px solid ${T.lineOnLight};border-bottom:1px solid ${T.lineOnLight};min-height:280px;display:flex;flex-direction:column;justify-content:space-between;transition:background .35s}
.pcell:nth-child(3n){border-right:0}
.pcell:hover{background:rgba(181,136,99,0.08)}
.pcell-n{font-family:${T.mono};font-size:11px;letter-spacing:0.22em;color:${T.copper}}
.pcell-h{font-family:${T.display};font-weight:500;font-size:26px;line-height:1.15;margin-top:auto;letter-spacing:-0.015em;color:${T.deep}}
.pcell-p{font-size:14px;line-height:1.6;color:${T.slate};margin-top:14px}

/* ── SPLIT (deep x cream flip) ── */
.split{display:grid;grid-template-columns:1fr 1fr;min-height:580px}
.split-l{background:${T.deep};color:${T.cream};padding:96px 64px 96px 8vw;display:flex;flex-direction:column;justify-content:space-between;position:relative}
.split-l::after{content:'';position:absolute;right:0;top:20%;bottom:20%;width:1px;background:${T.copper};opacity:0.4}
.split-r{background:${T.cream};color:${T.deep};padding:96px 8vw 96px 64px;display:flex;flex-direction:column;justify-content:space-between}
.split-num{font-family:${T.mono};font-size:11px;letter-spacing:0.28em;color:${T.copper}}
.split-h{font-family:${T.display};font-weight:300;font-size:clamp(36px,4.2vw,58px);line-height:1.06;letter-spacing:-0.022em}
.split-h em{font-style:italic;color:${T.copper};font-weight:400}
.split-h b{font-weight:600}
.split-p{max-width:42ch;font-size:15px;line-height:1.65;margin-top:24px;opacity:0.82}

/* ── CTA FOOTER ── */
.cta{background:${T.deep};color:${T.cream};padding:160px 0 80px;text-align:center;position:relative}
.cta::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:60px;background:${T.copper}}
.cta-kicker{font-family:${T.mono};font-size:11px;letter-spacing:0.36em;text-transform:uppercase;color:${T.copper};margin-bottom:36px}
.cta-h{font-family:${T.display};font-weight:300;font-size:clamp(48px,7.2vw,118px);line-height:1.0;letter-spacing:-0.03em;max-width:16ch;margin:0 auto;color:${T.cream}}
.cta-h em{font-style:italic;color:${T.warmGray};font-weight:400}
.cta-h b{font-weight:600}
.cta-btn{display:inline-flex;align-items:center;gap:12px;margin-top:64px;background:${T.cream};color:${T.deep};font-family:${T.body};font-weight:500;font-size:14px;padding:18px 34px;border-radius:999px;border:none;cursor:pointer;letter-spacing:0.02em;transition:background .25s,transform .25s}
.cta-btn:hover{background:${T.copper};color:${T.cream};transform:translateY(-2px)}
.cta-foot{margin-top:120px;padding-top:36px;border-top:1px solid ${T.lineOnDark};display:flex;justify-content:space-between;align-items:center;font-family:${T.mono};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${T.warmGray};padding-left:48px;padding-right:48px}
.cta-socials{display:flex;gap:24px}
.cta-socials a{color:${T.warmGray};text-decoration:none;transition:color .2s}
.cta-socials a:hover{color:${T.cream}}

@media(max-width:980px){
  .frame-outer{padding:14px}
  .nav-inner{padding:0 24px}
  .nav-center{display:none}
  .hero{grid-template-columns:1fr;padding:0 24px}
  .hero-rail{flex-direction:row;padding:24px 0;justify-content:center;gap:28px}
  .hero-visual{padding:24px 0}
  .hero-orb{width:300px;height:300px}
  .hero-orb::before{inset:24px}
  .hero-text{padding:24px 0 60px}
  .hero-text::before,.hero-kicker,.hero-side{display:none}
  .princ-grid{grid-template-columns:1fr}
  .pcell{border-right:0}
  .split{grid-template-columns:1fr}
  .split-l,.split-r{padding:64px 24px}
  .split-l::after{display:none}
  .cta-foot{flex-direction:column;gap:18px;text-align:center}
}
`;

export default function DemoCopper() {
  return (
  <>
  <style>{CSS}</style>

  <div className="frame-outer">
  <div className="frame-inner">

  <nav className="nav">
  <div className="nav-inner">
  <div className="nav-left">
  <div className="nav-burger"><span /><span /><span /></div>
  <div className="brand">GENIOS</div>
  </div>
  <div className="nav-center">
  <a className="active" href="#">Product</a>
  <a href="#">Studio</a>
  <a href="#">Journal</a>
  <a href="#">Pricing</a>
  </div>
  <div className="nav-right">
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h2l2 12h12l2-9H6" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></svg>
  </div>
  </div>
  </nav>

  <section className="hero">
  <div className="hero-rail fu d1">
  <span className="num active">01</span>
  <span className="num">02</span>
  <span className="num">03</span>
  <span className="num">04</span>
  </div>

  <div className="hero-visual fu d2">
  <div className="hero-orb">
  <div className="hero-dial-arc" />
  <div className="hero-dial">
  <div className="hero-dial-time">12<sup>38</sup></div>
  <div className="hero-dial-meta">Wed  -  8/7  -  GMT+5</div>
  </div>
  </div>
  </div>

  <div className="hero-text fu d3">
  <div className="hero-kicker">Operating  -  System</div>
  <h1 className="hero-h">
  <span className="thin">Quiet</span> <span className="bold">Intelligence</span><br />
  <span className="thin">Loud</span> <span className="bold">Output</span>
  </h1>
  <p className="hero-sub">
  A workspace calibrated for thinking. One surface, one cursor, one canvas  - 
  built for the long arc of serious work.
  </p>
  <button className="hero-cta">
  Request access <span className="price"> -  $0 / beta</span>
  </button>
  </div>

  <div className="hero-side">
  <div className="vert">GENIOS</div>
  </div>
  </section>

  </div>
  </div>

  <section className="principles">
  <div className="wrap">
  <div className="princ-kicker">Principles</div>
  <h2 className="princ-h">
  Six <em>rules</em> we wrote on the <b>first day</b> - <br />
  and still keep.
  </h2>
  <div className="princ-grid">
  {[
  ["01", "No notifications", "Nothing pulls you out of the sentence you’re writing."],
  ["02", "One column", "Reading and writing share a single editorial measure."],
  ["03", "No metrics", "We do not count streaks, badges, or engagement minutes."],
  ["04", "Local first", "Your work is yours before it is ours. Always."],
  ["05", "Slow software", "We ship less, but we ship it correctly."],
  ["06", "Private by default", "No analytics on your prose. No exceptions."],
  ].map(([n, h, p]) => (
  <div className="pcell" key={n}>
  <div className="pcell-n">{n}</div>
  <div>
  <div className="pcell-h">{h}</div>
  <div className="pcell-p">{p}</div>
  </div>
  </div>
  ))}
  </div>
  </div>
  </section>

  <section className="split">
  <div className="split-l">
  <div className="split-num">01 / Philosophy</div>
  <div>
  <h2 className="split-h">Quiet is a <em>feature</em>,<br /><b>not</b> an absence.</h2>
  <p className="split-p">
  We removed what you don’t need. Notifications, counters, confetti.
  What’s left is the work and the mind doing it.
  </p>
  </div>
  </div>
  <div className="split-r">
  <div className="split-num">02 / Practice</div>
  <div>
  <h2 className="split-h">Tools that <em>stay out</em><br />of the <b>sentence</b>.</h2>
  <p className="split-p">
  Every surface is typographically composed  -  one column, one voice.
  The interface disappears the moment you begin.
  </p>
  </div>
  </div>
  </section>

  <section className="cta">
  <div className="cta-kicker">Limited  -  Private Beta</div>
  <h2 className="cta-h">
  Write the <em>next</em> thing<br />
  on a <b>quieter</b> surface.
  </h2>
  <button className="cta-btn">Request an invitation →</button>
  <div className="cta-foot">
  <span>GeniOS  -  MMXXVI</span>
  <div className="cta-socials">
  <a href="#">Twitter</a>
  <a href="#">Instagram</a>
  <a href="#">Journal</a>
  </div>
  <span>Hand-built  -  Bengaluru</span>
  </div>
  </section>
  </>
  );
}
