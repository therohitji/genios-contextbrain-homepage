import React from "react";

/* ──────────────────────────────────────────────────────────────
  TOKENS  -  black x off-white text x pale ivory cards x gold
─────────────────────────────────────────────────────────────── */
const T = {
  black:  "#111110",  // primary bg  -  soft matte black, not shiny
  black2:  "#1A1A18",  // section alt
  black3:  "#242421",  // slight elevation (borders/subtle surfaces)
  offwhite: "#EDE9DD",  // body text on dark
  mute:  "#8A8378",  // muted labels / captions
  mute2:  "#55504A",  // even lower contrast
  ivory:  "#F3F0E7",  // CARD / BOX bg
  ivory2:  "#E8E3D4",  // card alt
  gold:  "#D97A28",  // saffron accent (was yellow/gold)
  goldDim:  "#A35B1D",  // deeper saffron for light bg
  line:  "rgba(237,233,221,0.12)",
  lineStrong: "rgba(237,233,221,0.22)",
  lineOnLight: "rgba(10,9,8,0.14)",
  display: "'Fraunces', serif",
  body:  "'IBM Plex Sans', sans-serif",
  mono:  "'IBM Plex Mono', monospace",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.black};color:${T.offwhite};font-family:${T.body};font-weight:400;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}

body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:1;mix-blend-mode:overlay;opacity:0.22;background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}

::selection{background:${T.gold};color:${T.black}}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.03);opacity:.8}}
.fu{animation:fadeUp 1.1s both}
.d1{animation-delay:.08s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.54s}

.wrap{max-width:1280px;margin:0 auto;padding:0 40px;position:relative;z-index:2}

/* NAV */
.nav{position:sticky;top:0;z-index:40;background:rgba(10,9,8,0.82);backdrop-filter:saturate(140%) blur(8px);border-bottom:0.5px solid ${T.line}}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:72px}
.brand{font-family:${T.display};font-weight:400;font-size:22px;letter-spacing:-0.01em;font-variation-settings:"opsz" 144;color:${T.offwhite}}
.brand em{font-style:italic;color:${T.gold}}
.nav-links{display:flex;gap:36px;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:${T.mute}}
.nav-links a{color:inherit;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:${T.offwhite}}
.nav-cta{font-family:${T.mono};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:10px 18px;border:0.5px solid ${T.offwhite};color:${T.offwhite};background:transparent;cursor:pointer;transition:all .25s}
.nav-cta:hover{background:${T.ivory};color:${T.black};border-color:${T.ivory}}

/* HERO */
.hero{padding:140px 0 120px;position:relative;overflow:hidden}
.hero-kicker{font-family:${T.mono};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${T.gold};display:flex;align-items:center;gap:14px;margin-bottom:40px}
.hero-kicker::before{content:'';width:56px;height:1px;background:${T.gold}}
.hero-h{font-family:${T.display};font-weight:300;font-size:clamp(64px,10vw,148px);line-height:0.92;letter-spacing:-0.035em;font-variation-settings:"opsz" 144;max-width:14ch;color:${T.offwhite}}
.hero-h em{font-style:italic;font-weight:300;color:${T.mute}}
.hero-h .u{display:inline-block;position:relative}
.hero-h .u::after{content:'';position:absolute;left:0;right:0;bottom:0.12em;height:1px;background:${T.gold};transform-origin:left;animation:strike 1.2s .8s both}
.hero-sub{max-width:52ch;margin-top:44px;font-size:19px;line-height:1.55;color:${T.offwhite};opacity:0.78}
.hero-meta{display:flex;gap:48px;margin-top:64px;padding-top:32px;border-top:0.5px solid ${T.line}}
.meta-k{font-family:${T.mono};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${T.mute};margin-bottom:8px}
.meta-v{font-family:${T.display};font-size:28px;font-weight:300;letter-spacing:-0.02em;font-variation-settings:"opsz" 144;color:${T.offwhite}}

/* decorative ring */
.ring{position:absolute;right:-180px;top:80px;width:520px;height:520px;border-radius:50%;border:0.5px solid ${T.line};pointer-events:none;z-index:0;animation:ringPulse 9s ease-in-out infinite}
.ring.r2{right:-120px;top:140px;width:400px;height:400px;opacity:0.6}
.ring.r3{right:-60px;top:200px;width:280px;height:280px;opacity:0.35}

/* IVORY CARD BAND (the hero of this theme  -  ivory boxes on black) */
.cards{padding:40px 0 120px}
.cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.card{background:${T.ivory};color:${T.black};padding:36px 32px;min-height:300px;display:flex;flex-direction:column;justify-content:space-between;position:relative;transition:transform .3s ease,box-shadow .3s ease}
.card:hover{transform:translateY(-3px);box-shadow:0 18px 44px rgba(0,0,0,0.35)}
.card-n{font-family:${T.mono};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${T.goldDim}}
.card-h{font-family:${T.display};font-weight:400;font-size:26px;line-height:1.12;letter-spacing:-0.015em;margin-top:auto;font-variation-settings:"opsz" 144}
.card-h em{font-style:italic;color:${T.goldDim}}
.card-p{font-size:14.5px;line-height:1.55;opacity:0.72;margin-top:12px;color:${T.black}}

/* FEATURE (big ivory block with black type  -  high contrast pop) */
.feature{padding:120px 0}
.feature-inner{background:${T.ivory};color:${T.black};padding:88px 72px;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:end;position:relative}
.feature-inner::before{content:'';position:absolute;top:-1px;left:10%;right:10%;height:2px;background:${T.gold}}
.feature-kicker{font-family:${T.mono};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${T.goldDim};display:flex;align-items:center;gap:14px;margin-bottom:24px}
.feature-kicker::before{content:'';width:40px;height:1px;background:${T.goldDim}}
.feature-h{font-family:${T.display};font-weight:300;font-size:clamp(40px,5vw,72px);line-height:0.98;letter-spacing:-0.03em;font-variation-settings:"opsz" 144}
.feature-h em{font-style:italic;color:${T.goldDim}}
.feature-p{font-size:17px;line-height:1.6;opacity:0.78}
.feature-list{margin-top:24px;font-family:${T.mono};font-size:13px;letter-spacing:0.04em}
.feature-list li{list-style:none;padding:14px 0;border-top:0.5px solid ${T.lineOnLight};display:flex;justify-content:space-between;align-items:center}
.feature-list li:last-child{border-bottom:0.5px solid ${T.lineOnLight}}
.feature-list .k{color:${T.black};opacity:0.6}
.feature-list .v{font-family:${T.display};font-size:16px;letter-spacing:-0.01em}

/* CTA */
.cta{padding:140px 0 100px;text-align:center;border-top:0.5px solid ${T.line}}
.cta-kicker{font-family:${T.mono};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${T.gold};margin-bottom:32px}
.cta-h{font-family:${T.display};font-weight:300;font-size:clamp(48px,7vw,110px);line-height:0.98;letter-spacing:-0.03em;font-variation-settings:"opsz" 144;max-width:18ch;margin:0 auto;color:${T.offwhite}}
.cta-h em{font-style:italic;color:${T.gold}}
.cta-btn{display:inline-block;margin-top:56px;font-family:${T.mono};font-size:13px;letter-spacing:0.14em;text-transform:uppercase;padding:18px 36px;background:${T.ivory};color:${T.black};border:0.5px solid ${T.ivory};cursor:pointer;transition:all .25s}
.cta-btn:hover{background:transparent;color:${T.ivory}}
.cta-foot{font-family:${T.mono};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${T.mute};margin-top:100px;padding-top:32px;border-top:0.5px solid ${T.line};display:flex;justify-content:space-between}

@media(max-width:860px){
  .wrap{padding:0 24px}
  .nav-links{display:none}
  .cards-grid{grid-template-columns:1fr}
  .feature-inner{grid-template-columns:1fr;gap:40px;padding:56px 28px}
  .hero-meta{flex-wrap:wrap;gap:24px}
  .ring{display:none}
}
`;

export default function DemoBlack() {
  return (
  <>
  <style>{CSS}</style>

  <nav className="nav">
  <div className="wrap nav-inner">
  <div className="brand">GeniOS<em>.</em></div>
  <div className="nav-links">
  <a href="#">Product</a>
  <a href="#">Philosophy</a>
  <a href="#">Pricing</a>
  <a href="#">Journal</a>
  </div>
  <button className="nav-cta">Request access</button>
  </div>
  </nav>

  <section className="hero">
  <div className="ring" />
  <div className="ring r2" />
  <div className="ring r3" />
  <div className="wrap">
  <div className="hero-kicker fu d1">A thinking operating system</div>
  <h1 className="hero-h fu d2">
  Stop burning <em>tokens</em>.<br />
  Start <span className="u">thinking</span>.
  </h1>
  <p className="hero-sub fu d3">
  GeniOS is a quiet workspace for people who want to think, not to scroll.
  One surface, one canvas, one cursor  -  calibrated for the long arc of serious work.
  </p>
  <div className="hero-meta fu d4">
  <div><div className="meta-k">Est.</div><div className="meta-v">MMXXVI</div></div>
  <div><div className="meta-k">Build</div><div className="meta-v">0.4.1</div></div>
  <div><div className="meta-k">Status</div><div className="meta-v">Private beta</div></div>
  </div>
  </div>
  </section>

  <section className="cards">
  <div className="wrap">
  <div className="cards-grid">
  {[
  ["01", "No notifications", "Nothing pulls you out of the sentence you’re writing."],
  ["02", "One column", "Reading and writing share a single editorial measure."],
  ["03", "Private by default", "No analytics on your prose. No exceptions."],
  ].map(([n, h, p]) => (
  <div className="card" key={n}>
  <div className="card-n">{n}</div>
  <div>
  <div className="card-h">{h}</div>
  <div className="card-p">{p}</div>
  </div>
  </div>
  ))}
  </div>
  </div>
  </section>

  <section className="feature">
  <div className="wrap">
  <div className="feature-inner">
  <div>
  <div className="feature-kicker">The thesis</div>
  <h2 className="feature-h">
  Tools that <em>stay out</em> of the sentence.
  </h2>
  <p className="feature-p" style={{marginTop:24}}>
  Every surface is typographically composed  -  one column, one voice.
  The interface disappears the moment you begin.
  </p>
  </div>
  <ul className="feature-list">
  <li><span className="k">Surfaces</span><span className="v">One</span></li>
  <li><span className="k">Columns</span><span className="v">One</span></li>
  <li><span className="k">Metrics</span><span className="v">Zero</span></li>
  <li><span className="k">Notifications</span><span className="v">Zero</span></li>
  <li><span className="k">Typefaces</span><span className="v">Fraunces + Plex</span></li>
  </ul>
  </div>
  </div>
  </section>

  <section className="cta">
  <div className="wrap">
  <div className="cta-kicker">Private beta  -  MMXXVI</div>
  <h2 className="cta-h">
  Write the <em>next</em> thing<br />
  on a <em>quieter</em> surface.
  </h2>
  <button className="cta-btn">Request an invitation →</button>
  <div className="cta-foot">
  <span>GeniOS  -  MMXXVI</span>
  <span>Hand-built  -  Bengaluru</span>
  </div>
  </div>
  </section>
  </>
  );
}
