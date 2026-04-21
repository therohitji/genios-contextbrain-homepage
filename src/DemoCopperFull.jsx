import React from "react";

/* ──────────────────────────────────────────────────────────────
  GENIOS  -  CONTEXT BRAIN  -  Master Whitepaper
  Copper theme  -  full content port
─────────────────────────────────────────────────────────────── */
const T = {
  deep:  "#10232A",
  deep2:  "#0B1A20",
  deep3:  "#182F38",
  slate:  "#3D4D55",
  warmGray:  "#A79E9C",
  warmGray2: "#8E857B",
  cream:  "#F2ECE4",
  cream2:  "#FAF6F0",
  creamDeep: "#E5DCC8",
  copper:  "#B58863",
  copper2:  "#C99A75",
  copperDim: "#8F6849",
  ink:  "#161616",
  ink2:  "#2A2A28",
  moss:  "#6B8A7A",
  line:  "rgba(22,22,22,0.12)",
  lineDark:  "rgba(242,236,228,0.14)",
  display:  "'Cormorant Garamond', serif",
  body:  "'Inter', sans-serif",
  mono:  "'JetBrains Mono', monospace",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:${T.body};font-weight:400;font-size:16px;line-height:1.6;color:${T.ink};background:${T.cream};-webkit-font-smoothing:antialiased;overflow-x:hidden}

h1,h2,h3,h4,.display,.num{font-family:${T.display};letter-spacing:-0.01em}
code,pre,.mono{font-family:${T.mono}}
em{font-family:${T.display};font-style:italic}

body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.035 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");pointer-events:none;z-index:1;mix-blend-mode:multiply;opacity:0.6}

.page{max-width:1280px;margin:0 auto;padding:0 60px;position:relative;z-index:2}
.page-narrow{max-width:880px;margin:0 auto;padding:0 60px;position:relative;z-index:2}

section{padding:100px 0;border-bottom:1px solid ${T.line};position:relative}
section.dark{background:${T.deep};color:${T.cream};border-color:${T.lineDark}}
section.dark code,section.dark .mono{color:${T.warmGray}}

/* ── Section intro ── */
.section-no{font-family:${T.mono};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${T.copper};margin-bottom:16px;display:flex;align-items:center;gap:14px;font-weight:500}
.section-no::before{content:'';width:32px;height:1px;background:${T.copper}}
.section-title{font-family:${T.display};font-size:clamp(42px,5.5vw,76px);font-weight:400;line-height:1.02;margin-bottom:24px;letter-spacing:-0.035em}
.section-title em{font-style:italic;color:${T.copper}}
.section-kicker{font-family:${T.body};font-size:clamp(17px,1.6vw,21px);color:${T.slate};max-width:680px;line-height:1.55;margin-bottom:56px;font-weight:400}
.dark .section-kicker{color:${T.warmGray}}

/* ── HERO ── */
.hero{min-height:100vh;background:${T.deep};color:${T.cream};display:flex;flex-direction:column;justify-content:space-between;padding:48px 60px 60px;position:relative;overflow:hidden;border-bottom:none}
.hero-top{display:flex;justify-content:space-between;align-items:center;font-family:${T.mono};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${T.warmGray};position:relative;z-index:10;font-weight:500}
.hero-top .logo{color:${T.cream};font-weight:600}
.hero-top .meta-grid{display:flex;gap:40px}
.hero-top .meta-grid span{display:flex;gap:8px}
.hero-top .meta-grid span b{color:${T.cream};font-weight:500}

.hero-body{flex:1;display:flex;align-items:center;position:relative;z-index:10}
.hero-title-wrap{max-width:1100px}
.hero-eyebrow{font-family:${T.mono};font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:${T.copper2};margin-bottom:40px;animation:fadeUp 1s 0.1s both;font-weight:500}
.hero-title{font-family:${T.display};font-size:clamp(64px,10vw,180px);font-weight:300;line-height:0.92;letter-spacing:-0.045em;margin-bottom:48px;animation:fadeUp 1.2s 0.2s both}
.hero-title em{font-style:italic;color:${T.copper2};display:block;font-weight:400}
.hero-title .strike{color:${T.warmGray};position:relative;font-weight:300}
.hero-title .strike::after{content:'';position:absolute;left:0;right:0;top:52%;height:3px;background:${T.copper};animation:strike 1s 1.4s both;transform-origin:left;transform:scaleX(0)}

.hero-lede{font-family:${T.display};font-style:italic;font-size:clamp(20px,2vw,28px);line-height:1.45;max-width:720px;color:${T.cream2};font-weight:400;animation:fadeUp 1.2s 0.5s both}
.hero-lede b{font-style:normal;color:${T.copper2};font-weight:500}

.hero-bottom{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;padding-top:40px;border-top:1px solid ${T.lineDark};animation:fadeUp 1s 0.8s both;position:relative;z-index:10}
.hero-stat .label{font-family:${T.mono};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${T.warmGray};margin-bottom:10px;font-weight:500}
.hero-stat .value{font-family:${T.display};font-size:32px;font-weight:400;color:${T.cream};line-height:1}
.hero-stat .value em{font-style:italic;color:${T.copper2};font-weight:400}
.hero-stat .sub{font-family:${T.body};font-size:12px;color:${T.warmGray};margin-top:8px;line-height:1.4}
.hero-stat .muted{color:${T.warmGray}}

.hero-graph{position:absolute;top:0;right:-5%;width:60%;height:100%;opacity:0.28;z-index:1}
.hero-graph svg{width:100%;height:100%}
.hero-graph .node circle{animation:pulse 3s ease-in-out infinite}
.hero-graph .edge{stroke-dasharray:4 3;animation:dash 20s linear infinite}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes pulse{0%,100%{opacity:1;r:4}50%{opacity:0.4;r:8}}
@keyframes dash{from{stroke-dashoffset:0}to{stroke-dashoffset:-100}}

/* ── Typography utilities ── */
p{font-family:${T.body};font-size:16px;line-height:1.65;margin-bottom:16px;color:${T.slate}}
.dark p{color:${T.cream2}}
p.large{font-size:19px;line-height:1.55;color:${T.slate}}
.dark p.large{color:${T.cream2}}
p.lead{font-family:${T.display};font-size:22px;line-height:1.5;font-style:italic;color:${T.ink};margin-bottom:24px;font-weight:400}
.dark p.lead{color:${T.cream}}
strong{font-weight:600;color:${T.ink}}
.dark strong{color:${T.cream}}
.accent{color:${T.copper}}
.muted{color:${T.warmGray}}

.pullquote{font-family:${T.display};font-size:clamp(28px,3.2vw,44px);font-weight:400;line-height:1.22;font-style:italic;padding:48px 0;max-width:900px;letter-spacing:-0.018em;color:${T.ink}}
.dark .pullquote{color:${T.cream}}
.pullquote .mark{color:${T.copper}}

h3.sub{font-family:${T.display};font-size:28px;font-weight:500;margin:48px 0 16px;letter-spacing:-0.02em;color:${T.ink}}
.dark h3.sub{color:${T.cream}}
h4.sub{font-family:${T.body};font-size:12.5px;letter-spacing:0.18em;text-transform:uppercase;color:${T.copper};margin:32px 0 12px;font-weight:600}

/* ── TOC bar ── */
.toc-bar{position:sticky;top:0;z-index:100;background:rgba(16,35,42,0.96);backdrop-filter:blur(20px);color:${T.cream};border-bottom:1px solid ${T.lineDark};padding:14px 0}
.toc-bar-inner{max-width:1280px;margin:0 auto;padding:0 60px;display:flex;justify-content:space-between;align-items:center;font-family:${T.mono};font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:500}
.toc-bar a{color:${T.warmGray};text-decoration:none;transition:color 0.2s}
.toc-bar a:hover{color:${T.cream}}
.toc-bar .brand{color:${T.cream};font-weight:600;font-family:${T.display};letter-spacing:0.2em;font-size:13px}
.toc-links{display:flex;gap:26px}
@media (max-width:1000px){.toc-links{display:none}}

/* ── Table ── */
table{width:100%;border-collapse:collapse;margin:24px 0;font-family:${T.body};font-size:14px}
th{text-align:left;font-family:${T.mono};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:${T.warmGray};font-weight:600;padding:12px 16px 10px;border-bottom:2px solid ${T.ink}}
td{padding:14px 16px;border-bottom:1px solid ${T.line};vertical-align:top;font-size:14px;line-height:1.55;color:${T.slate}}
td.mono{font-family:${T.mono};font-size:12px;color:${T.warmGray}}
.dark th{color:${T.warmGray};border-color:${T.cream}}
.dark td{border-color:${T.lineDark};color:${T.cream2}}
table.compact td{padding:9px 12px;font-size:13px}
table.compact th{padding:8px 12px 6px;font-size:9px}
tr.highlight td{background:rgba(181,136,99,0.08);font-weight:500;color:${T.ink}}
.dark tr.highlight td{background:rgba(181,136,99,0.14);color:${T.cream}}

/* ── Card ── */
.card{border:1px solid ${T.line};padding:28px;background:${T.cream2};position:relative;transition:border-color 0.3s,background 0.3s}
.card:hover{border-color:${T.copper}}
.card .card-no{font-family:${T.mono};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${T.copper};margin-bottom:12px;font-weight:500}
.card .card-title{font-family:${T.display};font-size:22px;font-weight:500;line-height:1.18;margin-bottom:10px;letter-spacing:-0.012em;color:${T.ink}}
.card .card-title em{font-style:italic;color:${T.copper}}
.card .card-desc{font-family:${T.body};font-size:14px;line-height:1.55;color:${T.slate}}
.card .card-formula{font-family:${T.mono};font-size:13px;margin:12px 0;padding:10px 14px;background:${T.deep};color:${T.copper2};display:inline-block;border-radius:2px}

.dark .card{background:rgba(242,236,228,0.03);border-color:${T.lineDark}}
.dark .card:hover{border-color:${T.copper}}
.dark .card .card-title{color:${T.cream}}
.dark .card .card-desc{color:${T.cream2}}

/* ── Grid ── */
.grid{display:grid;gap:24px}
.grid-2{grid-template-columns:repeat(2,1fr)}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-4{grid-template-columns:repeat(4,1fr)}
@media (max-width:900px){.grid-3,.grid-4{grid-template-columns:1fr}.grid-2{grid-template-columns:1fr}}

/* ── Code ── */
pre{background:${T.deep};color:${T.warmGray};padding:24px 28px;overflow-x:auto;font-size:13px;line-height:1.7;border-left:3px solid ${T.copper};margin:24px 0;font-family:${T.mono};border-radius:2px}
pre .k{color:${T.copper2}}
pre .s{color:#A8C099}
pre .c{color:${T.warmGray};font-style:italic;opacity:0.75}
pre .n{color:${T.cream}}
pre .fn{color:#E5D097}
code.inline{background:rgba(22,22,22,0.08);padding:2px 7px;border-radius:2px;font-size:13px;color:${T.copper};font-family:${T.mono}}
.dark code.inline{background:rgba(242,236,228,0.1);color:${T.copper2}}

/* ── Chip ── */
.chip{display:inline-block;padding:3px 10px;font-family:${T.mono};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;border:1px solid currentColor;border-radius:100px;margin-right:6px;font-weight:500}
.chip.rust{color:${T.copper}}
.chip.moss{color:${T.moss}}
.chip.stone{color:${T.warmGray}}

/* ── Index list ── */
.index-list{list-style:none;padding:0}
.index-list li{padding:14px 0;border-bottom:1px solid ${T.line};display:grid;grid-template-columns:40px 1fr 80px;gap:20px;align-items:baseline;font-size:15px}
.dark .index-list li{border-color:${T.lineDark}}
.index-list li .idx{font-family:${T.mono};font-size:11px;color:${T.warmGray};font-weight:500}
.index-list li .tname{font-family:${T.display};font-size:18px;font-weight:400;color:${T.ink}}
.index-list li .tpage{font-family:${T.mono};font-size:11px;color:${T.warmGray};text-align:right}

/* ── Footnote ── */
.footnote{font-family:${T.mono};font-size:11px;color:${T.warmGray};padding-top:24px;border-top:1px solid ${T.line};margin-top:40px;line-height:1.65}
.dark .footnote{border-color:${T.lineDark};color:${T.warmGray}}

/* ── Arch diagram wrapper ── */
.arch-diagram{border:1px solid ${T.line};padding:40px;background:${T.cream2};margin:32px 0;overflow-x:auto}
.dark .arch-diagram{background:${T.deep2};border-color:${T.lineDark}}

/* ── Graph card (4-graphs section) ── */
.graph-card{border:1px solid ${T.lineDark};padding:28px 24px;background:${T.deep2};position:relative;overflow:hidden}
.graph-card .g-no{font-family:${T.mono};font-size:10px;color:${T.copper};letter-spacing:0.2em;margin-bottom:16px;font-weight:500}
.graph-card .g-name{font-family:${T.display};font-size:32px;font-weight:400;line-height:1;margin-bottom:12px;letter-spacing:-0.025em;color:${T.cream}}
.graph-card .g-name em{font-style:italic;color:${T.copper}}
.graph-card .g-q{font-family:${T.display};font-style:italic;font-size:15px;color:${T.warmGray};margin-bottom:18px;border-left:2px solid ${T.copper};padding-left:12px;font-weight:400}
.graph-card .g-desc{font-family:${T.body};font-size:14px;line-height:1.6;margin-bottom:20px;color:${T.cream2}}

/* ── Score viz bars ── */
.score-viz{display:grid;grid-template-columns:140px 1fr 80px;gap:20px;align-items:center;padding:14px 0;border-bottom:1px solid ${T.line}}
.dark .score-viz{border-color:${T.lineDark}}
.score-viz .sv-label{font-family:${T.display};font-size:18px;font-weight:500;color:${T.ink}}
.dark .score-viz .sv-label{color:${T.cream}}
.score-viz .sv-bar{height:8px;background:rgba(22,22,22,0.08);position:relative;overflow:hidden}
.dark .score-viz .sv-bar{background:rgba(242,236,228,0.12)}
.score-viz .sv-fill{position:absolute;top:0;left:0;bottom:0;background:${T.copper};transition:width 2s ease}
.score-viz .sv-val{font-family:${T.mono};font-size:13px;text-align:right;color:${T.warmGray};font-weight:500}

/* ── Lifecycle ── */
.lifecycle{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:32px 0}
@media (max-width:900px){.lifecycle{grid-template-columns:repeat(2,1fr)}}
.ls{padding:24px 18px;background:${T.deep2};border:1px solid ${T.lineDark};position:relative;transition:background 0.3s}
.ls .ls-no{font-family:${T.display};font-size:44px;line-height:1;color:${T.copper};font-weight:300;margin-bottom:6px;letter-spacing:-0.03em}
.ls .ls-name{font-family:${T.display};font-size:20px;font-weight:500;margin-bottom:10px;color:${T.cream}}
.ls .ls-desc{font-family:${T.body};font-size:12.5px;line-height:1.5;color:${T.warmGray}}
.ls:nth-child(1){background:rgba(181,136,99,0.20)}
.ls:nth-child(2){background:rgba(181,136,99,0.14)}
.ls:nth-child(3){background:rgba(107,138,122,0.18)}
.ls:nth-child(4){background:rgba(167,158,156,0.10)}
.ls:nth-child(5){background:rgba(167,158,156,0.06)}
.ls:nth-child(6){background:rgba(242,236,228,0.03)}

/* ── Stat row ── */
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${T.lineDark};border:1px solid ${T.lineDark};margin:32px 0}
.stat-cell{background:${T.deep2};padding:32px 24px}
.stat-cell .sc-label{font-family:${T.mono};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${T.warmGray};margin-bottom:12px;font-weight:500}
.stat-cell .sc-val{font-family:${T.display};font-size:44px;line-height:1;font-weight:400;letter-spacing:-0.03em;margin-bottom:8px;color:${T.cream}}
.stat-cell .sc-val em{font-style:italic;color:${T.copper}}
.stat-cell .sc-sub{font-family:${T.body};font-size:12.5px;color:${T.warmGray};line-height:1.45}
@media (max-width:900px){.stat-row{grid-template-columns:repeat(2,1fr)}}

/* ── Brain ops grid ── */
.ops-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${T.line};margin:40px 0}
@media (max-width:900px){.ops-grid{grid-template-columns:repeat(2,1fr)}}
.op{background:${T.cream2};padding:28px 22px;min-height:260px;position:relative;transition:background 0.3s}
.op:hover{background:${T.creamDeep}}
.dark .op{background:${T.deep2}}
.dark .ops-grid{background:${T.lineDark}}
.dark .op:hover{background:${T.deep3}}
.op .op-n{font-family:${T.display};font-size:48px;line-height:1;font-weight:300;color:${T.copper};margin-bottom:16px;letter-spacing:-0.04em}
.op .op-name{font-family:${T.display};font-size:22px;font-weight:500;margin-bottom:10px;letter-spacing:-0.012em;color:${T.ink}}
.dark .op .op-name{color:${T.cream}}
.op .op-name em{font-style:italic;color:${T.copper}}
.op .op-desc{font-family:${T.body};font-size:13px;line-height:1.55;margin-bottom:14px;color:${T.slate}}
.dark .op .op-desc{color:${T.cream2}}
.op .op-tech{font-family:${T.mono};font-size:11px;color:${T.warmGray};border-top:1px solid ${T.line};padding-top:10px;line-height:1.5}
.dark .op .op-tech{border-color:${T.lineDark}}

/* ── Journey steps ── */
.journey{counter-reset:jstep;margin:40px 0}
.j-step{display:grid;grid-template-columns:80px 1fr;gap:32px;padding:32px 0;border-top:1px solid ${T.line};align-items:start}
.dark .j-step{border-color:${T.lineDark}}
.j-step:last-child{border-bottom:1px solid ${T.line}}
.dark .j-step:last-child{border-color:${T.lineDark}}
.j-step::before{counter-increment:jstep;content:counter(jstep,decimal-leading-zero);font-family:${T.display};font-size:48px;line-height:1;color:${T.copper};font-weight:300}
.j-step .j-title{font-family:${T.display};font-size:26px;font-weight:500;letter-spacing:-0.015em;margin-bottom:8px;color:${T.ink}}
.dark .j-step .j-title{color:${T.cream}}
.j-step .j-meta{font-family:${T.mono};font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${T.copper};margin-bottom:14px;font-weight:500}
.j-step .j-body{font-family:${T.body};font-size:15px;line-height:1.65;color:${T.slate};max-width:720px}
.dark .j-step .j-body{color:${T.cream2}}
.j-step .j-code{font-family:${T.mono};font-size:12px;background:${T.deep};color:${T.copper2};padding:10px 16px;display:inline-block;margin-top:12px;border-radius:2px}

/* ── Test cases ── */
.tc{border:1px solid ${T.line};padding:20px 24px;margin-bottom:12px;background:${T.cream2};display:grid;grid-template-columns:60px 1fr 160px;gap:20px;align-items:start}
.tc .tc-id{font-family:${T.display};font-size:28px;font-weight:400;color:${T.copper};line-height:1}
.tc .tc-name{font-family:${T.display};font-size:17px;font-weight:500;margin-bottom:6px;color:${T.ink}}
.tc .tc-desc{font-family:${T.body};font-size:13px;color:${T.slate};line-height:1.55;margin-bottom:8px}
.tc .tc-pass{font-family:${T.mono};font-size:11px;color:${T.moss};background:rgba(107,138,122,0.12);padding:4px 10px;display:inline-block;border-radius:2px;font-weight:500}
.tc .tc-cat{font-family:${T.mono};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:${T.warmGray};text-align:right}

/* ── Formula block ── */
.formula-block{background:${T.deep};color:${T.cream};padding:40px 48px;border-left:4px solid ${T.copper};margin:32px 0;font-family:${T.mono};font-size:15px;line-height:2;overflow-x:auto}

@media (max-width:900px){.page,.page-narrow{padding:0 24px}.hero{padding:24px 24px 40px}.hero-top .meta-grid{display:none}.hero-bottom{grid-template-columns:1fr 1fr}}
`;

/* ════════════════════════════════════════════════════════════════
  SECTION COMPONENTS  -  broken out for readability
  ════════════════════════════════════════════════════════════════ */

const Hero = () => (
  <section className="hero">
  <div className="hero-top">
  <div className="logo">GENIOS  -  01</div>
  <div className="meta-grid">
  <span>DOC <b>MASTER / V1.0</b></span>
  <span>DATE <b>APRIL 2026</b></span>
  <span>CLASS <b>INTERNAL</b></span>
  </div>
  </div>

  <div className="hero-graph" dangerouslySetInnerHTML={{__html: `
  <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <g class="edges">
  <line class="edge" x1="400" y1="400" x2="200" y2="220" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="400" y1="400" x2="620" y2="180" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="400" y1="400" x2="700" y2="500" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="400" y1="400" x2="180" y2="600" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="400" y1="400" x2="480" y2="680" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="200" y1="220" x2="620" y2="180" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="620" y1="180" x2="700" y2="500" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="700" y1="500" x2="480" y2="680" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="480" y1="680" x2="180" y2="600" stroke="${T.warmGray}" stroke-width="1" />
  <line class="edge" x1="180" y1="600" x2="200" y2="220" stroke="${T.warmGray}" stroke-width="1" />
  </g>
  <g class="nodes">
  <g class="node"><circle cx="400" cy="400" r="6" fill="${T.copper}" /></g>
  <g class="node" style="animation-delay: 0.2s"><circle cx="200" cy="220" r="4" fill="${T.cream}" /></g>
  <g class="node" style="animation-delay: 0.5s"><circle cx="620" cy="180" r="4" fill="${T.cream}" /></g>
  <g class="node" style="animation-delay: 0.9s"><circle cx="700" cy="500" r="4" fill="${T.cream}" /></g>
  <g class="node" style="animation-delay: 1.3s"><circle cx="180" cy="600" r="4" fill="${T.cream}" /></g>
  <g class="node" style="animation-delay: 1.7s"><circle cx="480" cy="680" r="4" fill="${T.cream}" /></g>
  </g>
  </svg>
  `}} />

  <div className="hero-body">
  <div className="hero-title-wrap">
  <div className="hero-eyebrow">Master Build Document  -  GeniOS Context Brain v1.0</div>
  <h1 className="hero-title">
  The <span className="strike">memory</span> <em>context</em><br />
  layer for<br />
  AI agents.
  </h1>
  <p className="hero-lede">
  Two halves of one brain. <b>Section A</b> knows what is true about your organization.
  {" "}<b>Section B</b> thinks about what to do next. Together, they remove the human
  from the thinking loop  -  not the decision loop, not the approval loop, just the thinking.
  </p>
  </div>
  </div>

  <div className="hero-bottom">
  <div className="hero-stat">
  <div className="label">Thesis</div>
  <div className="value">Memory is solved. <em>Reasoning isn’t.</em></div>
  <div className="sub">The graph-storage arms race ended in 2025. The continuous-reasoning arms race just began.</div>
  </div>
  <div className="hero-stat">
  <div className="label">Section A</div>
  <div className="value">20<span className="muted">%</span></div>
  <div className="sub">Reactive substrate. Commoditizing. Boring by design.</div>
  </div>
  <div className="hero-stat">
  <div className="label">Section B</div>
  <div className="value">80<span className="muted">%</span></div>
  <div className="sub">Proactive product. Defensible. The entire business.</div>
  </div>
  <div className="hero-stat">
  <div className="label">North Star</div>
  <div className="value">AAR</div>
  <div className="sub">Autonomous Act-on Rate. How often agents act on pushed recommendations without human review.</div>
  </div>
  </div>
  </section>
);

const TocBar = () => (
  <nav className="toc-bar">
  <div className="toc-bar-inner">
  <div className="brand">§ GENIOS  -  CONTEXT BRAIN</div>
  <div className="toc-links">
  <a href="#problem">01  -  Problem</a>
  <a href="#solution">02  -  Solution</a>
  <a href="#section-a">03  -  Section A</a>
  <a href="#section-b">04  -  Section B</a>
  <a href="#interplay">05  -  Interplay</a>
  <a href="#journey">06  -  Journey</a>
  <a href="#integration">07  -  Arch</a>
  <a href="#tests">08  -  Tests</a>
  <a href="#agentic">09  -  Agents</a>
  <a href="#moat">10  -  Moat</a>
  <a href="#build">11  -  Plan</a>
  </div>
  <div style={{color: T.warmGray}}>v1.0</div>
  </div>
  </nav>
);

const TocSection = () => (
  <section id="toc">
  <div className="page-narrow">
  <div className="section-no">0  -  Index</div>
  <h2 className="section-title">Table of <em>contents</em></h2>
  <p className="section-kicker">A full walkthrough of the system  -  problem, solution, substrate, intelligence, integration, testing, moat. Every component has a job, a mechanism, and a handoff.</p>

  <ul className="index-list">
  <li><span className="idx">01</span><span className="tname">Problem Statement  -  the thinking loop</span><span className="tpage">→</span></li>
  <li><span className="idx">02</span><span className="tname">Solution  -  Context Graph (20%) + Context Intelligence (80%)</span><span className="tpage">→</span></li>
  <li><span className="idx">03</span><span className="tname">Section A  -  Context Graph  -  Deep Dive</span><span className="tpage">→</span></li>
  <li><span className="idx">04</span><span className="tname">Section B  -  Context Intelligence  -  Deep Dive</span><span className="tpage">→</span></li>
  <li><span className="idx">05</span><span className="tname">The Interplay  -  how A and B actually work together</span><span className="tpage">→</span></li>
  <li><span className="idx">06</span><span className="tname">User Journeys  -  auth, operational, comparative</span><span className="tpage">→</span></li>
  <li><span className="idx">07</span><span className="tname">Integration Guide  -  Pull, Push, SDK, MCP</span><span className="tpage">→</span></li>
  <li><span className="idx">08</span><span className="tname">20 Test Cases  -  accuracy, latency, intelligence</span><span className="tpage">→</span></li>
  <li><span className="idx">09</span><span className="tname">Agentic Integration  -  multi-agent routing</span><span className="tpage">→</span></li>
  <li><span className="idx">10</span><span className="tname">Moat  -  why this is hard to copy</span><span className="tpage">→</span></li>
  <li><span className="idx">11</span><span className="tname">Tech Stack &amp; 12-Week Plan</span><span className="tpage">→</span></li>
  </ul>
  </div>
  </section>
);

const ProblemSection = () => (
  <section id="problem">
  <div className="page">
  <div className="section-no">01  -  Problem</div>
  <h2 className="section-title">Agents can act. <br />They still can’t <em>think about your org.</em></h2>
  <p className="section-kicker">Base models know everything about the world and nothing about your company. Every memory product on the market stores facts and hands them back when asked. None of them <em>reason</em> over those facts continuously. That gap is where agents fail in production.</p>

  <div className="grid grid-3" style={{marginTop: 56}}>
  <div className="card">
  <div className="card-no">Problem  -  01</div>
  <div className="card-title">Base models are <em>organizationally blind</em></div>
  <p className="card-desc">Claude doesn’t know who Priya is, what stage the Acme deal is in, or what Jordan promised last Thursday. Every agent run starts from zero. The customer’s context has to be stuffed into the prompt by the developer  -  manually, every time, for every decision.</p>
  </div>
  <div className="card">
  <div className="card-no">Problem  -  02</div>
  <div className="card-title">Memory layers <em>wait to be asked</em></div>
  <p className="card-desc">Mem0, Zep, Graphiti, Supermemory  -  all reactive. The agent has to know what to ask for. If the agent doesn’t think to look, the relevant fact stays buried. The memory layer is a database, not a collaborator.</p>
  </div>
  <div className="card">
  <div className="card-no">Problem  -  03</div>
  <div className="card-title">Humans still do the <em>noticing</em></div>
  <p className="card-desc">"This deal is cooling." "That commitment is slipping." "This champion just changed roles." These are human observations. The agent doesn’t notice them because nothing is continuously watching the graph. Result: agents answer well but never initiate.</p>
  </div>
  </div>

  <div className="pullquote">
  Every memory product solves storage.<br />
  <span className="mark">Nobody solves the reasoning loop.</span>
  </div>

  <p className="large">The result is a market of AI-native startups and platform teams shipping agents that look smart in demos and break in production  -  because in production, nobody asks the agent the right question at the right time. The agent needs a teammate that <em>watches</em>. That’s what Context Brain is.</p>
  </div>
  </section>
);

const SolutionSection = () => (
  <section id="solution" className="dark">
  <div className="page">
  <div className="section-no">02  -  Solution</div>
  <h2 className="section-title">Two halves. <br />One <em>brain.</em></h2>
  <p className="section-kicker">GeniOS Context Brain is not one product. It is a substrate and an intelligence layered on top of it, designed so that one <em>stores and retrieves</em> while the other <em>reasons and pushes</em>. The split is deliberate, not architectural accident.</p>

  <div className="stat-row">
  <div className="stat-cell">
  <div className="sc-label">Section A  -  Context Graph</div>
  <div className="sc-val"><em>20%</em></div>
  <div className="sc-sub">Reactive substrate. Signal ingestion, graph structure, scoring, lifecycle, retrieval. Commoditizing  -  we own it, we don’t compete on it.</div>
  </div>
  <div className="stat-cell">
  <div className="sc-label">Section B  -  Context Intelligence</div>
  <div className="sc-val"><em>80%</em></div>
  <div className="sc-sub">Proactive product. Continuous reasoning, priority scoring, push gate, calibration loop. Defensible  -  this is the entire business.</div>
  </div>
  <div className="stat-cell">
  <div className="sc-label">What A does</div>
  <div className="sc-val">Stores</div>
  <div className="sc-sub">4 graphs  -  5 scoring axes  -  6 lifecycle stages. Pure structure. No reasoning.</div>
  </div>
  <div className="stat-cell">
  <div className="sc-label">What B does</div>
  <div className="sc-val">Thinks</div>
  <div className="sc-sub">8 brain operations  -  reasoning pipeline  -  calibration loop. Pure intelligence. Always on.</div>
  </div>
  </div>

  <h3 className="sub" style={{marginTop: 80}}>The mental model</h3>
  <p className="large">Section A is <em>what the brain knows.</em> Section B is <em>how the brain thinks.</em> Together they produce what the brain says and does. If either half is missing, the whole is useless.</p>

  <div className="arch-diagram" dangerouslySetInnerHTML={{__html: `
  <svg viewBox="0 0 1200 520" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
  <defs>
  <pattern id="grid-sol" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${T.cream}" stroke-width="0.3" opacity="0.06"/>
  </pattern>
  <marker id="arrow-cream-sol" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${T.cream}"/></marker>
  <marker id="arrow-copper-sol" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${T.copper}"/></marker>
  </defs>
  <rect width="1200" height="520" fill="url(#grid-sol)"/>

  <g>
  <rect x="40" y="40" width="160" height="64" fill="none" stroke="${T.warmGray}" stroke-width="1"/>
  <text x="120" y="64" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="10" letter-spacing="1.5">SOURCES</text>
  <text x="120" y="86" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Gmail  -  Cal  -  Slack</text>
  </g>

  <g>
  <rect x="260" y="30" width="540" height="200" fill="none" stroke="${T.cream}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="280" y="20" fill="${T.copper}" font-family="JetBrains Mono" font-size="10" letter-spacing="2">SECTION A  -  CONTEXT GRAPH</text>
  <rect x="280" y="56" width="120" height="54" fill="${T.deep3}" stroke="${T.cream}" stroke-width="0.5"/>
  <text x="340" y="78" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Ingestion</text>
  <text x="340" y="94" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="10">OAuth  -  Queue</text>
  <rect x="420" y="56" width="120" height="54" fill="${T.deep3}" stroke="${T.cream}" stroke-width="0.5"/>
  <text x="480" y="78" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Extraction</text>
  <text x="480" y="94" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="10">LLM + Regex</text>
  <rect x="560" y="56" width="120" height="54" fill="${T.deep3}" stroke="${T.cream}" stroke-width="0.5"/>
  <text x="620" y="78" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Resolution</text>
  <text x="620" y="94" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="10">Entity Dedup</text>
  <rect x="280" y="130" width="500" height="84" fill="${T.deep2}" stroke="${T.cream}" stroke-width="0.5"/>
  <text x="530" y="152" text-anchor="middle" fill="${T.copper}" font-family="JetBrains Mono" font-size="10" letter-spacing="1.5">FOUR GRAPHS  -  UNIFIED POSTGRES + PGVECTOR</text>
  <text x="340" y="182" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Relationship</text>
  <text x="440" y="182" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Authority</text>
  <text x="540" y="182" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">State</text>
  <text x="640" y="182" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="14">Precedent</text>
  <text x="530" y="204" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">5 scoring axes  -  6 lifecycle stages</text>
  </g>

  <line x1="200" y1="72" x2="276" y2="83" stroke="${T.cream}" stroke-width="1" marker-end="url(#arrow-cream-sol)"/>

  <g>
  <rect x="260" y="290" width="540" height="180" fill="none" stroke="${T.copper}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="280" y="282" fill="${T.copper}" font-family="JetBrains Mono" font-size="10" letter-spacing="2">SECTION B  -  CONTEXT INTELLIGENCE</text>
  <rect x="280" y="310" width="130" height="48" fill="${T.deep3}" stroke="${T.copper}" stroke-width="0.8"/>
  <text x="345" y="330" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="13">Event Router</text>
  <text x="345" y="346" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">pg_notify  -  triggers</text>
  <rect x="425" y="310" width="130" height="48" fill="${T.deep3}" stroke="${T.copper}" stroke-width="0.8"/>
  <text x="490" y="330" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="13">Candidate Gen</text>
  <text x="490" y="346" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">algorithmic  -  cheap</text>
  <rect x="570" y="310" width="130" height="48" fill="${T.deep3}" stroke="${T.copper}" stroke-width="0.8"/>
  <text x="635" y="330" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="13">LLM Reasoner</text>
  <text x="635" y="346" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">Haiku → Sonnet</text>
  <rect x="280" y="380" width="180" height="48" fill="${T.deep3}" stroke="${T.copper}" stroke-width="0.8"/>
  <text x="370" y="400" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="13">Priority Scorer</text>
  <text x="370" y="416" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">urgency x novelty x actionability</text>
  <rect x="475" y="380" width="125" height="48" fill="${T.deep3}" stroke="${T.copper}" stroke-width="0.8"/>
  <text x="538" y="400" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="13">Push Gate</text>
  <text x="538" y="416" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">threshold  -  dedup</text>
  <rect x="615" y="380" width="170" height="48" fill="${T.deep3}" stroke="${T.copper}" stroke-width="0.8"/>
  <text x="700" y="400" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="13">Delivery</text>
  <text x="700" y="416" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9">webhook  -  SSE  -  poll</text>
  <text x="530" y="456" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="9" letter-spacing="1.5">8 BRAIN OPERATIONS  -  CONTINUOUS  -  PROACTIVE</text>
  </g>

  <path d="M 530 220 L 530 300" stroke="${T.copper}" stroke-width="1.5" fill="none" stroke-dasharray="4 2" marker-end="url(#arrow-copper-sol)"/>
  <text x="540" y="262" fill="${T.copper}" font-family="JetBrains Mono" font-size="10">reads state</text>
  <path d="M 490 300 Q 240 300 240 220" stroke="${T.moss}" stroke-width="1.5" fill="none" stroke-dasharray="4 2" marker-end="url(#arrow-cream-sol)"/>
  <text x="100" y="262" fill="${T.moss}" font-family="JetBrains Mono" font-size="10">writes precedent + feedback</text>

  <g>
  <rect x="880" y="210" width="240" height="100" fill="none" stroke="${T.warmGray}" stroke-width="1"/>
  <text x="1000" y="234" text-anchor="middle" fill="${T.warmGray}" font-family="JetBrains Mono" font-size="10" letter-spacing="1.5">CUSTOMER ORCHESTRATOR</text>
  <text x="1000" y="258" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="15">LangGraph  -  CrewAI</text>
  <text x="1000" y="278" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="15">OpenAI Agent SDK</text>
  <text x="1000" y="298" text-anchor="middle" fill="${T.cream}" font-family="Cormorant Garamond" font-size="15">In-house runtimes</text>
  </g>

  <line x1="800" y1="404" x2="880" y2="290" stroke="${T.copper}" stroke-width="1.5" marker-end="url(#arrow-copper-sol)"/>
  <text x="820" y="340" fill="${T.copper}" font-family="JetBrains Mono" font-size="10">push</text>
  <line x1="1000" y1="210" x2="780" y2="172" stroke="${T.cream}" stroke-width="1" marker-end="url(#arrow-cream-sol)"/>
  <text x="870" y="180" fill="${T.cream}" font-family="JetBrains Mono" font-size="10">pull</text>
  <line x1="1000" y1="310" x2="800" y2="430" stroke="${T.moss}" stroke-width="1" stroke-dasharray="4 2" marker-end="url(#arrow-cream-sol)"/>
  <text x="960" y="380" fill="${T.moss}" font-family="JetBrains Mono" font-size="10">feedback</text>
  </svg>
  `}} />

  <p className="footnote">System diagram  -  April 2026  -  Signals flow in, graph state feeds continuous reasoning, recommendations push to the orchestrator, feedback closes the loop. Section A and Section B share one database and one deployment but are developed as separable products with a clean interface between them.</p>

  <h3 className="sub" style={{marginTop: 80}}>Core insight</h3>
  <p className="lead">Memory is solved. Retrieval is solved. Graph storage is solved. What’s <em>not</em> solved is continuous reasoning over organizational context that produces proactive recommendations. Everything in this document exists to make that possible.</p>

  <div className="grid grid-3" style={{marginTop: 40}}>
  <div className="card">
  <div className="card-no">Job  -  01  -  A</div>
  <div className="card-title">Know the organization</div>
  <p className="card-desc">Build a live graph of the org  -  people, companies, commitments, meetings, deals, projects. Expose it through a clean API the agent can call before acting.</p>
  </div>
  <div className="card">
  <div className="card-no">Job  -  02  -  B</div>
  <div className="card-title">Reason continuously</div>
  <p className="card-desc">Run 24/7 over the graph. Detect drift, cooling deals, missed commitments, meetings without prep. Produce recommendations <em>before</em> the agent thinks to ask.</p>
  </div>
  <div className="card">
  <div className="card-no">Job  -  03  -  A+B</div>
  <div className="card-title">Improve over time</div>
  <p className="card-desc">Every recommendation acted on (or ignored) feeds calibration. Thresholds tune per tenant. Scorer weights adjust. The system gets better at this team’s actual patterns.</p>
  </div>
  </div>
  </div>
  </section>
);

/* ════════════════════════════════════════════════════════════════
  MAIN EXPORT  -  sections composed in whitepaper order
  ════════════════════════════════════════════════════════════════ */
export default function DemoCopperFull() {
  return (
  <>
  <style>{CSS}</style>
  <Hero />
  <TocBar />
  <TocSection />
  <ProblemSection />
  <SolutionSection />
  {/* More sections appended below */}
  </>
  );
}
