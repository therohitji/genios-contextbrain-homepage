import React from "react";

/* ──────────────────────────────────────────────────────────────
  TOKENS  -  warm charcoal x pale ivory (two-tone + one mid)
─────────────────────────────────────────────────────────────── */
const T = {
  charcoal:  "#2A2529",
  charcoal2: "#201C1F",
  charcoal3: "#3A3438",
  ivory:  "#F3F0E7",
  ivory2:  "#EAE5D8",
  mid:  "#8A8388",
  lineOnDark:  "rgba(243,240,231,0.14)",
  lineOnLight: "rgba(42,37,41,0.14)",
  display: "'Fraunces', serif",
  body:  "'IBM Plex Sans', sans-serif",
  mono:  "'IBM Plex Mono', monospace",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.charcoal};color:${T.ivory};font-family:${T.body};font-weight:400;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}

body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:1;mix-blend-mode:overlay;opacity:0.22;background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}

::selection{background:${T.ivory};color:${T.charcoal}}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.fu{animation:fadeUp 1.1s both}
.d1{animation-delay:.08s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.54s}.d5{animation-delay:.70s}

.wrap{max-width:1280px;margin:0 auto;padding:0 40px;position:relative;z-index:2}

/* ── NAV ── */
.nav{position:sticky;top:0;z-index:40;background:${T.charcoal};border-bottom:0.5px solid ${T.lineOnDark};backdrop-filter:saturate(120%)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:72px}
.brand{font-family:${T.display};font-weight:400;font-size:22px;letter-spacing:-0.01em;font-variation-settings:"opsz" 144}
.brand em{font-style:italic;color:${T.mid}}
.nav-links{display:flex;gap:36px;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:${T.mid}}
.nav-links a{color:inherit;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:${T.ivory}}
.nav-cta{font-family:${T.mono};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:10px 18px;border:0.5px solid ${T.ivory};color:${T.ivory};background:transparent;cursor:pointer;transition:background .25s,color .25s}
.nav-cta:hover{background:${T.ivory};color:${T.charcoal}}

/* ── HERO ── */
.hero{padding:120px 0 140px;position:relative}
.hero-kicker{font-family:${T.mono};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${T.mid};display:flex;align-items:center;gap:14px;margin-bottom:40px}
.hero-kicker::before{content:'';width:56px;height:1px;background:${T.mid}}
.hero-h{font-family:${T.display};font-weight:300;font-size:clamp(64px,10vw,148px);line-height:0.92;letter-spacing:-0.035em;font-variation-settings:"opsz" 144;max-width:14ch}
.hero-h em{font-style:italic;font-weight:300;color:${T.mid}}
.hero-h .u{display:inline-block;position:relative}
.hero-h .u::after{content:'';position:absolute;left:0;right:0;bottom:0.12em;height:1px;background:${T.ivory};transform-origin:left;animation:strike 1.2s .8s both}
.hero-sub{max-width:52ch;margin-top:44px;font-size:19px;line-height:1.55;color:${T.ivory};opacity:0.82}
.hero-meta{display:flex;gap:48px;margin-top:64px;padding-top:32px;border-top:0.5px solid ${T.lineOnDark}}
.hero-meta > div{flex:0 0 auto}
.meta-k{font-family:${T.mono};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${T.mid};margin-bottom:8px}
.meta-v{font-family:${T.display};font-size:28px;font-weight:300;letter-spacing:-0.02em;font-variation-settings:"opsz" 144}

/* ── SPLIT (two-tone flip) ── */
.split{display:grid;grid-template-columns:1fr 1fr;min-height:560px;border-top:0.5px solid ${T.lineOnDark}}
.split-l{background:${T.charcoal};color:${T.ivory};padding:88px 8vw 88px 40px;display:flex;flex-direction:column;justify-content:space-between}
.split-r{background:${T.ivory};color:${T.charcoal};padding:88px 40px 88px 8vw;display:flex;flex-direction:column;justify-content:space-between;position:relative}
.split-num{font-family:${T.mono};font-size:12px;letter-spacing:0.2em;opacity:0.6}
.split-h{font-family:${T.display};font-weight:300;font-size:clamp(36px,4vw,54px);line-height:1.05;letter-spacing:-0.02em;font-variation-settings:"opsz" 144}
.split-h em{font-style:italic;color:${T.mid}}
.split-p{max-width:40ch;font-size:16px;line-height:1.6;opacity:0.78;margin-top:24px}

/* ── GRID (ivory) ── */
.grid-sec{background:${T.ivory};color:${T.charcoal};padding:120px 0 140px}
.grid-kicker{font-family:${T.mono};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${T.mid};display:flex;align-items:center;gap:14px;margin-bottom:32px}
.grid-kicker::before{content:'';width:56px;height:1px;background:${T.mid}}
.grid-h{font-family:${T.display};font-weight:300;font-size:clamp(44px,6vw,84px);line-height:0.98;letter-spacing:-0.03em;font-variation-settings:"opsz" 144;max-width:18ch;color:${T.charcoal}}
.grid-h em{font-style:italic;color:${T.mid}}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:80px;border-top:0.5px solid ${T.lineOnLight}}
.gcell{padding:48px 32px;border-right:0.5px solid ${T.lineOnLight};border-bottom:0.5px solid ${T.lineOnLight};min-height:260px;display:flex;flex-direction:column;justify-content:space-between;transition:background .3s}
.gcell:nth-child(3n){border-right:0}
.gcell:hover{background:rgba(42,37,41,0.035)}
.gcell-n{font-family:${T.mono};font-size:12px;letter-spacing:0.18em;color:${T.mid}}
.gcell-h{font-family:${T.display};font-weight:400;font-size:22px;line-height:1.15;margin-top:auto;letter-spacing:-0.01em}
.gcell-p{font-size:14px;line-height:1.55;color:${T.charcoal};opacity:0.7;margin-top:12px}

/* ── CTA footer ── */
.cta{background:${T.charcoal};color:${T.ivory};padding:140px 0 120px;text-align:center;border-top:0.5px solid ${T.lineOnDark}}
.cta-h{font-family:${T.display};font-weight:300;font-size:clamp(48px,7vw,110px);line-height:0.98;letter-spacing:-0.03em;font-variation-settings:"opsz" 144;max-width:18ch;margin:0 auto}
.cta-h em{font-style:italic;color:${T.mid}}
.cta-btn{display:inline-block;margin-top:56px;font-family:${T.mono};font-size:13px;letter-spacing:0.14em;text-transform:uppercase;padding:18px 36px;background:${T.ivory};color:${T.charcoal};border:0.5px solid ${T.ivory};cursor:pointer;transition:all .25s}
.cta-btn:hover{background:transparent;color:${T.ivory}}
.cta-foot{font-family:${T.mono};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${T.mid};margin-top:80px;padding-top:32px;border-top:0.5px solid ${T.lineOnDark};display:flex;justify-content:space-between}

@media(max-width:768px){
  .wrap{padding:0 24px}
  .nav-links{display:none}
  .split{grid-template-columns:1fr}
  .split-l,.split-r{padding:64px 24px}
  .grid{grid-template-columns:1fr}
  .gcell{border-right:0}
  .hero-meta{flex-wrap:wrap;gap:24px}
}
`;

export default function DemoCharcoal() {
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
  <div className="wrap">
  <div className="hero-kicker fu d1">A thinking operating system</div>
  <h1 className="hero-h fu d2">
  Intelligence, <em>rendered</em><br />
  <span className="u">clearly.</span>
  </h1>
  <p className="hero-sub fu d3">
  GeniOS is a quiet workspace for people who want to think, not to scroll.
  One surface, one canvas, one cursor  -  calibrated for the long arc of
  serious work.
  </p>
  <div className="hero-meta fu d4">
  <div><div className="meta-k">Est.</div><div className="meta-v">MMXXVI</div></div>
  <div><div className="meta-k">Build</div><div className="meta-v">0.4.1</div></div>
  <div><div className="meta-k">Status</div><div className="meta-v">Private beta</div></div>
  </div>
  </div>
  </section>

  <section className="split">
  <div className="split-l">
  <div className="split-num">01 / Philosophy</div>
  <div>
  <h2 className="split-h">Quiet is a <em>feature</em>, not an absence.</h2>
  <p className="split-p">
  We removed what you don’t need. Notifications, counters, confetti.
  What’s left is the work and the mind doing it.
  </p>
  </div>
  </div>
  <div className="split-r">
  <div className="split-num">02 / Practice</div>
  <div>
  <h2 className="split-h">Tools that <em>stay out</em> of the sentence.</h2>
  <p className="split-p">
  Every surface is typographically composed  -  one column, one voice.
  The interface disappears the moment you begin.
  </p>
  </div>
  </div>
  </section>

  <section className="grid-sec">
  <div className="wrap">
  <div className="grid-kicker">Principles</div>
  <h2 className="grid-h">
  Six <em>rules</em> we wrote on the first day and still keep.
  </h2>
  <div className="grid">
  {[
  ["01", "No notifications", "Nothing pulls you out of the sentence you’re writing."],
  ["02", "One column", "Reading and writing share a single editorial measure."],
  ["03", "No metrics", "We do not count streaks, badges, or engagement minutes."],
  ["04", "Local first", "Your work is yours before it is ours. Always."],
  ["05", "Slow software", "We ship less, but we ship it correctly."],
  ["06", "Private by default", "No analytics on your prose. No exceptions."],
  ].map(([n, h, p]) => (
  <div className="gcell" key={n}>
  <div className="gcell-n">{n}</div>
  <div>
  <div className="gcell-h">{h}</div>
  <div className="gcell-p">{p}</div>
  </div>
  </div>
  ))}
  </div>
  </div>
  </section>

  <section className="cta">
  <div className="wrap">
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
