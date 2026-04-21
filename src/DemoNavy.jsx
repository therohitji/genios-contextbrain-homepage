import React, { useState, useEffect } from "react";
import { BLOG_POSTS, getBlogPost } from "./blogPosts.js";

/* ──────────────────────────────────────────────────────────────
  TOKENS  -  navy + cream + brass
─────────────────────────────────────────────────────────────── */
const T = {
  // COPPER THEME  -  deep teal x cream x copper
  ink: "#0d1a22",  // deep  -  primary dark (section bgs on dark, dark text on cream)
  ink2: "#060c11",  // deep2  -  deepest (matches hero base)
  ink3: "#3D4D55",  // slate  -  body text on cream
  ink4: "#3D4D55",
  slate: "#3D4D55",
  paper: "#F2ECE4",  // cream  -  main light bg / text on dark
  paper2: "#EAE2D4",
  paperDeep: "#DFD6C4",
  cardBg: "#FAFAF6",  // off-white boxes  -  pops against cream bg
  cardBgHover: "#FFFFFF",
  sand: "#A79E9C",  // warmGray  -  muted text
  sandDim: "#A79E9C",
  sandLow: "#3D4D55",
  brass: "#D75A33",  // RUST accent (brighter  -  reads on both cream and ink)
  brass2: "#E8805C",  // rust soft (for glow/dark section emphasis)
  brassDeep: "#A8431F",
  moss: "#3D4D55",
  stone: "#A79E9C",
  navy: "#060c11",
  line: "rgba(22,22,22,0.10)",
  lineStrong: "rgba(22,22,22,0.20)",
  lineDark: "rgba(242,236,228,0.10)",
  display: "'Fraunces', serif",
  body: "'IBM Plex Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
  serif: "'IBM Plex Serif', serif",
  orbit: "'Orbitron', sans-serif",
};

/* ──────────────────────────────────────────────────────────────
  GLOBAL CSS
─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400&family=Orbitron:wght@500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.navy};color:${T.ink};font-family:${T.body};font-weight:400;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}

body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:1;mix-blend-mode:multiply;opacity:0.32;background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.035 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}

::selection{background:${T.brass};color:${T.ink}}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes strikeIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes nodePulse{0%,100%{opacity:0.9}50%{opacity:0.35}}
@keyframes dashRun{to{stroke-dashoffset:-120}}
@keyframes rotateLabel{from{opacity:0;transform:rotate(-90deg) translateX(8px)}to{opacity:0.62;transform:rotate(-90deg) translateX(0)}}
@keyframes floatP{0%,100%{transform:translateY(0) scale(1);opacity:.55}50%{transform:translateY(-18px) scale(1.12);opacity:1}}
@keyframes nodeBlink{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes globeDrift{0%,100%{opacity:.62}50%{opacity:.34}}
@keyframes leaderDraw{from{stroke-dashoffset:320}to{stroke-dashoffset:0}}
@keyframes tickPulse{0%,100%{background:rgba(215,90,51,0.4)}50%{background:${T.brass}}}
@keyframes ringBreath{0%,100%{stroke-opacity:0.28;r:94}50%{stroke-opacity:0.55;r:97}}
@keyframes flowDash{to{stroke-dashoffset:-36}}
@keyframes dotFlow{0%{opacity:0;offset-distance:0%}10%{opacity:1}90%{opacity:1}100%{opacity:0;offset-distance:100%}}
@keyframes funnelGlow{0%,100%{opacity:0.18}50%{opacity:0.32}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.trusted-track{display:flex;width:max-content;animation:marquee 22s linear infinite}
.trusted-track:hover{animation-play-state:paused}
.trusted-wrap{overflow:hidden;position:relative}
.trusted-wrap::before,.trusted-wrap::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none}
.trusted-wrap::before{left:0;background:linear-gradient(to right,${T.paper},transparent)}
.trusted-wrap::after{right:0;background:linear-gradient(to left,${T.paper},transparent)}
.hero-particle{position:absolute;border-radius:50%;background:${T.brass};pointer-events:none;z-index:2}

/* ═══ CONTEXT BRAIN  -  editorial figure ═══ */
.cb-figure{position:relative;width:100%;max-width:1240px;margin:96px auto 0;padding:0 4px;opacity:0;animation:fadeUp 1.6s .9s both}
.cb-frame{display:flex;align-items:baseline;justify-content:space-between;gap:24px;font-family:${T.mono};font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(242,236,228,0.5)}
.cb-frame-top{margin-bottom:18px;padding-bottom:14px;border-bottom:0.5px solid rgba(242,236,228,0.14)}
.cb-frame-bot{margin-top:18px;padding-top:14px;border-top:0.5px solid rgba(242,236,228,0.14)}
.cb-fig-kicker{color:${T.brass};letter-spacing:0.32em;font-weight:500}
.cb-fig-title{font-family:${T.serif};font-style:italic;font-size:14px;letter-spacing:0.02em;text-transform:none;color:${T.paper};font-weight:400;font-variation-settings:"opsz" 144}
.cb-ticks{display:flex;gap:5px;align-items:center}
.cb-ticks span{width:1px;height:7px;background:rgba(242,236,228,0.3);display:block}
.cb-ticks span.cb-tick-hot{height:11px;animation:tickPulse 3s ease-in-out infinite}
.cb-fig-caption{font-family:${T.serif};font-style:italic;font-size:15.5px;color:${T.paper};letter-spacing:0;font-variation-settings:"opsz" 144,"SOFT" 30;line-height:1.4;text-transform:none;letter-spacing:0.01em}
.cb-fig-caption em{color:${T.brass2};font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1}
.cb-fig-source{font-family:${T.mono};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(242,236,228,0.4)}
.cb-stage{position:relative;width:100%;aspect-ratio:1200/580}
.cb-stage svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.cb-meridians{animation:globeDrift 22s ease-in-out infinite}
.cb-node{animation:nodeBlink 3.2s ease-in-out infinite}
.cb-anchor{animation:nodeBlink 2.6s ease-in-out infinite}
.cb-leader{stroke-dasharray:320;stroke-dashoffset:320;animation:leaderDraw 2s ease-out 1.2s forwards}
@media(max-width:900px){
  .cb-figure{margin-top:72px}
  .cb-stage{aspect-ratio:900/720}
  .cb-fig-title{font-size:12px}
  .cb-fig-caption{font-size:14px}
}
@media(max-width:640px){
  .cb-figure{margin-top:56px;padding:0}
  .cb-frame-top,.cb-frame-bot{font-size:9px;letter-spacing:0.2em}
  .cb-fig-title{display:none}
  .cb-ticks{display:none}
}

.fu{animation:fadeUp 1.1s both}
.d1{animation-delay:.08s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.54s}.d5{animation-delay:.72s}

.node-c{animation:nodePulse 4s ease-in-out infinite}
.edge-d{stroke-dasharray:3 4;animation:dashRun 22s linear infinite}

/* DROP CAP  -  the editorial signal */
.dropcap::first-letter{
  font-family:${T.display};
  font-size:5.2em;
  line-height:0.82;
  float:left;
  padding:8px 18px 0 0;
  margin-top:6px;
  color:${T.brass};
  font-weight:300;
  font-variation-settings:"opsz" 144,"SOFT" 30,"WONK" 0;
}
.dark .dropcap::first-letter{color:${T.brass2}}
.dropcap::first-line{
  font-variant:small-caps;
  letter-spacing:0.05em;
  color:${T.ink};
}
.dark .dropcap::first-line{color:${T.ink}}

/* CARD TYPES  -  tiered hierarchy */

/* CONTENT  -  default  -  structured readable blocks */
.card,.card-content{border:0.5px solid ${T.lineStrong};padding:32px;background:${T.cardBg};transition:border-color .3s ease,background .3s ease,transform .3s ease;position:relative}
.card:hover,.card-content:hover{border-color:${T.ink};background:${T.cardBgHover};transform:translateY(-1px)}

/* METRIC  -  minimal  -  stat-forward, no walls */
.card-metric{border:0.5px solid ${T.line};padding:28px 24px;background:transparent;transition:background .3s ease,border-color .3s ease;position:relative}
.card-metric:hover{background:rgba(10,9,8,0.025);border-color:${T.lineStrong}}

/* FEATURE  -  elevated  -  pricing, testimonials, conversion */
.card-feature{border:0.5px solid ${T.lineStrong};padding:36px;background:${T.cardBg};position:relative;transition:border-color .35s ease,background .35s ease,transform .35s ease,box-shadow .35s ease}
.card-feature::before{content:'';position:absolute;top:-1px;left:12%;right:12%;height:1px;background:linear-gradient(90deg,transparent 0%,${T.brass} 50%,transparent 100%);opacity:0;transition:opacity .4s ease}
.card-feature:hover{border-color:${T.ink};background:${T.cardBgHover};transform:translateY(-3px);box-shadow:0 16px 42px rgba(10,9,8,0.07),0 2px 8px rgba(10,9,8,0.04)}
.card-feature:hover::before{opacity:1}
.card-feature.is-popular::before{opacity:0.7}
.card-feature.is-popular:hover::before{opacity:1}

/* ═══ THESIS INLINE VISUALS ═══ */
@media(max-width:600px){
  .thesis-stats-row{grid-template-columns:1fr !important}
}

/* DARK CARD */
.card-dk{border:0.5px solid ${T.lineDark};padding:32px;background:rgba(244,238,227,0.025);transition:border-color .3s ease,background .3s ease,transform .3s ease;position:relative}
.card-dk:hover{border-color:${T.ink};background:rgba(244,238,227,0.05);transform:translateY(-1px)}

/* TOC bar */
.toc-bar{position:sticky;top:0;z-index:100;background:rgba(6,12,17,0.97);backdrop-filter:blur(20px);color:${T.ink};border-bottom:0.5px solid ${T.lineDark};padding:14px 0}
.toc-bar a{color:${T.sandDim};text-decoration:none;transition:color .2s;font-family:${T.mono};font-size:11px;letter-spacing:.18em;text-transform:uppercase}
.toc-bar a:hover{color:${T.ink}}

/* TABLE */
table{width:100%;border-collapse:collapse;margin:24px 0;font-size:14px}
th{text-align:left;font-family:${T.mono};font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:${T.stone};font-weight:500;padding:12px 16px 10px;border-bottom:2px solid ${T.ink}}
td{padding:14px 16px;border-bottom:0.5px solid ${T.line};vertical-align:top;font-size:14px;line-height:1.5;color:${T.ink2}}
td.mono{font-family:${T.mono};font-size:12px;color:${T.ink3}}

/* SCORE VIZ */
.sv{display:grid;grid-template-columns:140px 1fr 80px;gap:20px;align-items:center;padding:14px 0;border-bottom:0.5px solid ${T.line}}
.sv-lbl{font-family:${T.display};font-size:16px;font-weight:500;letter-spacing:-0.01em}
.sv-bar{height:6px;background:rgba(10,28,38,0.08);position:relative;overflow:hidden}
.sv-fill{position:absolute;top:0;left:0;bottom:0;background:${T.paper};transition:width 2s ease}
.sv-val{font-family:${T.mono};font-size:13px;text-align:right;color:${T.ink3}}

/* em with WONK  -  reserved for emphasis */
.em-wonk{font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1}

/* FLOATING NAV */
.fnav-item:hover{color:${T.ink} !important;background:rgba(244,238,227,0.04)}
.fnav-top:hover{color:${T.brass} !important}

/* FOOTER */
.footer-link{transition:color .2s ease}
.footer-link:hover{color:${T.brass} !important}

/* PRICING */
.pricing-cta{transition:background .25s ease,color .25s ease,border-color .25s ease}
.pricing-cta:hover{background:${T.brass} !important;color:${T.ink} !important;border-color:${T.brass} !important}
.pricing-cta-popular{transition:background .25s ease,color .25s ease,border-color .25s ease}
.pricing-cta-popular:hover{background:${T.brass} !important;border-color:${T.brass} !important}

/* REQUEST */
.request-cta{transition:background .3s ease,color .3s ease,border-color .3s ease}
.request-cta:hover{background:${T.paper} !important;color:${T.ink} !important;border-color:${T.ink} !important}
.request-cta:hover .request-arrow{transform:translateX(4px)}
.request-arrow{transition:transform .3s ease;display:inline-block}

/* UNIFIED BUTTON SYSTEM  -  navbar shape, smart CTA hierarchy */
.btn{transition:background .28s ease,color .28s ease,border-color .28s ease,box-shadow .28s ease;display:inline-flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer;white-space:nowrap;border-radius:3px;text-transform:uppercase;font-family:${T.mono};border:0.5px solid;box-sizing:border-box}
/* PRIMARY  -  dominant CTA: solid brass fill, highest contrast */
.btn-primary{background:${T.brass};color:${T.ink};border-color:${T.brass};font-weight:600;box-shadow:0 6px 20px rgba(215,90,51,0.30),inset 0 1px 0 rgba(255,255,255,0.12)}
.btn-primary:hover{background:${T.paper};color:${T.ink};border-color:${T.paper};box-shadow:0 8px 28px rgba(215,90,51,0.18)}
/* SECONDARY  -  supporting action: dark glass shell with brass border + text */
.btn-secondary{background:linear-gradient(160deg,rgba(6,12,17,0.60) 0%,rgba(6,12,17,0.78) 100%);backdrop-filter:blur(12px) saturate(160%);-webkit-backdrop-filter:blur(12px) saturate(160%);color:${T.brass2};border-color:rgba(215,90,51,0.42);font-weight:500;box-shadow:0 4px 14px rgba(0,0,0,0.24),inset 0 1px 0 rgba(242,236,228,0.08)}
.btn-secondary:hover{background:${T.brass};color:${T.ink};border-color:${T.brass};box-shadow:0 6px 20px rgba(215,90,51,0.26)}
/* GHOST  -  softest option: dark glass, muted paper text, barely-there border */
.btn-ghost{background:linear-gradient(160deg,rgba(6,12,17,0.38) 0%,rgba(6,12,17,0.55) 100%);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:rgba(242,236,228,0.58);border-color:rgba(242,236,228,0.14);font-weight:500;box-shadow:0 2px 10px rgba(0,0,0,0.18),inset 0 1px 0 rgba(242,236,228,0.06)}
.btn-ghost:hover{color:${T.paper};border-color:rgba(242,236,228,0.28);background:linear-gradient(160deg,rgba(6,12,17,0.55) 0%,rgba(6,12,17,0.72) 100%)}
.btn-ghost.btn-dark{color:rgba(242,236,228,0.52);border-color:rgba(242,236,228,0.12)}
.btn-ghost.btn-dark:hover{color:${T.paper};border-color:rgba(242,236,228,0.28)}
.btn-sm{padding:10px 18px;font-size:10px;letter-spacing:0.18em}
.btn-md{padding:13px 26px;font-size:11px;letter-spacing:0.2em}
.btn-lg{padding:16px 34px;font-size:12px;letter-spacing:0.22em}
.btn-arrow{display:inline-block;transition:transform .28s ease;font-size:1.05em;line-height:1}
.btn:hover .btn-arrow{transform:translateX(3px)}

/* TOP NAV */
.tnav::after{content:'';position:absolute;inset:0;border-radius:3px;pointer-events:none;background:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.028 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");mix-blend-mode:overlay;opacity:0.7;z-index:0}
.nav-link{position:relative;display:inline-flex;align-items:center;padding:7px 13px;border-radius:2px;transition:color .25s ease, background .25s ease}
.nav-link::before{content:'';position:absolute;inset:0;border-radius:2px;background:rgba(242,236,228,0.00);transition:background .25s ease;z-index:-1}
.nav-link:hover{color:${T.paper} !important}
.nav-link:hover::before{background:rgba(242,236,228,0.08)}
.nav-link.nav-link-active{color:${T.paper} !important}
.nav-link.nav-link-active::before{background:rgba(242,236,228,0.10);box-shadow:inset 0 0 0 0.5px rgba(242,236,228,0.14)}
.nav-signin:hover{color:${T.ink} !important}
.nav-cta{transition:background .3s ease,color .3s ease,border-color .3s ease}
.nav-cta:hover{background:${T.brass} !important;color:${T.ink} !important;border-color:${T.brass} !important}
.nav-cta:hover .nav-arrow{transform:translateX(3px)}
.nav-arrow{transition:transform .3s ease;display:inline-block}

/* RESPONSIVE */
@media(max-width:1100px){
  .vrail{display:none !important}
}
@media(max-width:1100px){
  .footer-grid{grid-template-columns:1.4fr 1fr 1fr 1fr !important;gap:40px !important}
  .footer-grid > div:nth-child(5){display:none !important}
}
@media(max-width:1000px){
  .nav-tagline{display:none !important}
  .nav-signin{display:none !important}
  .footer-grid{grid-template-columns:1fr 1fr 1fr !important}
  .footer-grid > div:nth-child(1){grid-column:1 / -1}
  .footer-grid > div:nth-child(5){display:block !important}
}
@media(max-width:640px){
  .footer-grid{grid-template-columns:1fr 1fr !important;gap:32px !important}
  .footer-grid > div:nth-child(1){grid-column:1 / -1 !important}
}
/* FLOATING NAV  -  responsive scaling  -  nothing hides, everything just shrinks */
@media(max-width:960px){
  .tnav{padding:9px 14px !important}
  .tnav .brand-logo{font-size:13.5px !important;letter-spacing:0.12em !important}
  .tnav .nav-links{gap:2px !important}
  .nav-link{font-size:12px !important;padding:6px 10px !important}
  .tnav .btn-sm{padding:7px 12px !important;font-size:11px !important;letter-spacing:0.1em !important}
}
@media(max-width:760px){
  .tnav{padding:7px 10px !important;width:calc(100vw - 16px) !important}
  .tnav .brand-logo{font-size:12px !important;letter-spacing:0.08em !important}
  .tnav .nav-links{gap:1px !important}
  .nav-link{font-size:10.5px !important;padding:5px 7px !important;letter-spacing:-0.01em !important}
  .tnav .btn-sm{padding:5px 9px !important;font-size:9.5px !important;letter-spacing:0.04em !important}
  .tnav-top{padding:5px 7px !important}
  .tnav-top .tnav-lbl{display:none !important}
  .nav-link-hide-mobile{display:none !important}
}
@media(max-width:520px){
  .tnav{padding:6px 8px !important;width:calc(100vw - 12px) !important}
  .tnav .brand-logo{font-size:10.5px !important;letter-spacing:0.06em !important}
  .tnav .nav-links{gap:0px !important}
  .nav-link{font-size:10px !important;padding:4px 6px !important;letter-spacing:-0.015em !important}
  .tnav .btn-sm{padding:5px 8px !important;font-size:8.5px !important;letter-spacing:0.04em !important}
  .tnav-top .tnav-lbl{display:none !important}
  .tnav-top{padding:5px 6px !important}
  .nav-link-hide-phone{display:none !important}
}
@media(max-width:400px){
  .tnav{padding:5px 6px !important}
  .tnav .brand-logo{font-size:9.5px !important;letter-spacing:0.02em !important}
  .nav-link{font-size:9px !important;padding:4px 5px !important;letter-spacing:-0.02em !important}
  .tnav .btn-sm{padding:5px 7px !important;font-size:8px !important;letter-spacing:0.02em !important}
  .tnav-top{padding:5px 5px !important}
}
@media(max-width:640px){
  .fnav-lbl{display:none !important}
  .fnav{bottom:12px !important}
}
@media(max-width:820px){
  .hero-stat-strip{grid-template-columns:1fr 1fr !important;gap:28px 0 !important}
  .hero-stat-strip > div{border-left:none !important;padding:16px 20px !important}
}
@media(max-width:480px){
  .hero-stat-strip{grid-template-columns:1fr !important}
}
@media(max-width:1000px){
  .mast-mid{display:none !important}
  .hero-meta-inner{display:none !important}
  .stat-hero{grid-template-columns:1fr 1fr !important;gap:32px !important}
  .g4{grid-template-columns:1fr 1fr !important}
  .page{padding:0 clamp(16px,3vw,24px) !important}
  .hero-pad{padding:28px 24px 44px !important}
  .sec-pad{padding:clamp(40px,6vw,72px) 0 !important}
  .toc-links{display:none !important}
  .stat-row-cells{grid-template-columns:1fr 1fr !important}
  .dropcap::first-letter{font-size:4.2em;padding:4px 12px 0 0}
  .g2{gap:clamp(12px,2.5vw,32px) !important}
  .g3{gap:clamp(10px,2vw,24px) !important}
}
@media(max-width:640px){
  .stat-hero{grid-template-columns:1fr !important}
  .g2{grid-template-columns:1fr !important}
  .g4,.stat-row-cells{grid-template-columns:1fr !important}
}

/* ═══ HERO V2  -  orbital context brain ═══ */
.hero-v2{position:relative}
.hero-v2-glow{position:absolute;top:12%;left:50%;width:min(900px,96vw);height:min(900px,96vw);transform:translateX(-50%);background:radial-gradient(circle, rgba(215,90,51,0.18) 0%, rgba(215,90,51,0.06) 30%, transparent 60%);pointer-events:none;z-index:1;animation:hv2Glow 6s ease-in-out infinite}
@keyframes hv2Glow{0%,100%{opacity:.8;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.05)}}
.hero-v2-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(242,236,228,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(242,236,228,0.03) 1px, transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse at center, black 28%, transparent 75%);-webkit-mask-image:radial-gradient(ellipse at center, black 28%, transparent 75%);pointer-events:none;z-index:1}
.hero-v2-body{flex:1;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,0.95fr);gap:clamp(24px,4vw,56px);align-items:start;position:relative;z-index:5;padding:clamp(20px,3vw,40px) 0 clamp(8px,1.2vw,16px)}
.hero-v2-text{position:relative;z-index:10;max-width:640px;padding-top:48px}
.hero-v2-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:${T.mono};font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:${T.brass2};margin-bottom:36px;padding:6px 14px 6px 10px;border:0.5px solid rgba(215,90,51,0.38);border-radius:3px;background:rgba(215,90,51,0.07)}
.hero-v2-eyebrow .dot{width:6px;height:6px;background:${T.brass2};border-radius:50%;animation:hv2Blink 2s ease-in-out infinite}
@keyframes hv2Blink{0%,100%{opacity:1;box-shadow:0 0 8px ${T.brass2}}50%{opacity:.4;box-shadow:0 0 2px ${T.brass2}}}
.hero-v2-title{font-family:${T.display};font-size:clamp(34px,5vw,64px);font-weight:300;line-height:1.0;letter-spacing:-0.035em;margin-bottom:32px;color:${T.paper};font-variation-settings:"opsz" 144,"SOFT" 50;white-space:nowrap}
.hero-v2-title em{font-family:${T.display};font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1;color:${T.brass}}
.hero-v2-lede{font-family:${T.serif};font-style:italic;font-size:clamp(17px,1.4vw,22px);line-height:1.55;max-width:560px;color:${T.paper};font-weight:400;margin-bottom:40px}
.hero-v2-lede b{font-style:normal;color:${T.brass2};font-weight:500}
.hero-v2-ctas{display:flex;gap:14px;margin-bottom:16px;flex-wrap:wrap}
.hero-v2-legend{display:flex;gap:28px;flex-wrap:wrap}
.hero-v2-legend .legend-item{display:flex;gap:12px;align-items:flex-start}
.hero-v2-legend .swatch{width:12px;height:12px;border-radius:50%;margin-top:5px;flex-shrink:0}
.hero-v2-legend .swatch.graph{background:transparent;border:1px solid #D9C5A6;box-shadow:0 0 6px rgba(217,197,166,.4)}
.hero-v2-legend .swatch.intel{background:${T.brass};box-shadow:0 0 8px ${T.brass}}
.hero-v2-legend .swatch.brain{background:${T.paper};box-shadow:0 0 10px ${T.paper}}
.hero-v2-legend .l-label{font-family:${T.mono};font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${T.sandDim};line-height:1.2;margin-bottom:3px}
.hero-v2-legend .l-name{font-family:${T.display};font-size:14px;color:${T.paper};letter-spacing:-0.01em}
.hero-v2-legend .l-name em{color:${T.brass2};font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1;font-style:italic}
.hero-v2-illu{position:relative;width:100%;aspect-ratio:720/860;max-width:620px;margin:0 auto}
.hero-v2-illu svg{width:100%;height:100%;overflow:visible}
.hv2-orbit-a{animation:hv2RotCCW 80s linear infinite;transform-origin:50% 50%}
.hv2-orbit-b{animation:hv2RotCW 60s linear infinite;transform-origin:50% 50%}
.hv2-orbit-c{animation:hv2RotCCW 100s linear infinite;transform-origin:50% 50%}
@keyframes hv2RotCW{to{transform:rotate(360deg)}}
@keyframes hv2RotCCW{to{transform:rotate(-360deg)}}
.hv2-node{animation:hv2Twinkle 3s ease-in-out infinite}
@keyframes hv2Twinkle{0%,100%{opacity:.35}50%{opacity:1}}
.hv2-beam{transform-origin:50% 100%;animation:hv2Beam 3s ease-in-out infinite}
@keyframes hv2Beam{0%,100%{opacity:.4;transform:scaleY(.92)}50%{opacity:.9;transform:scaleY(1.05)}}
.hv2-scan{transform-origin:50% 50%;animation:hv2Scan 4s ease-in-out infinite}
@keyframes hv2Scan{0%,100%{opacity:0;transform:scale(.3)}50%{opacity:.5}100%{transform:scale(1.8);opacity:0}}
.hero-v2-stats{display:grid;grid-template-columns:repeat(4,1fr) auto;gap:32px;padding:28px 0 0;border-top:0.5px solid ${T.lineDark};position:relative;z-index:10;align-items:end}
.hero-v2-stat{padding:0 clamp(12px,1.6vw,24px)}
.hero-v2-stat + .hero-v2-stat{border-left:0.5px solid ${T.lineDark}}
.hero-v2-stat .label{font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.sandDim};margin-bottom:10px}
.hero-v2-stat .value{font-family:${T.display};font-size:clamp(22px,2.4vw,32px);color:${T.paper};line-height:1.05;letter-spacing:-0.02em;font-variation-settings:"opsz" 144,"SOFT" 50}
.hero-v2-stat .value em{font-style:italic;color:${T.brass2};font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1;font-size:0.62em;margin-left:2px}
.hero-v2-scrollhint{font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.sandDim};display:flex;align-items:center;gap:8px;padding-bottom:3px}
.hero-v2-scrollhint .line-down{display:inline-block;width:1px;height:24px;background:linear-gradient(to bottom,${T.sandDim},transparent);animation:hv2Scroll 2s ease-in-out infinite}
@keyframes hv2Scroll{0%,100%{opacity:.3;transform:translateY(-4px)}50%{opacity:1;transform:translateY(0)}}
@media(max-width:1100px){
  .hero-v2-body{grid-template-columns:1fr;gap:24px}
  .hero-v2-illu{max-width:560px;order:2}
  .hero-v2-text{order:1}
}
@media(max-width:820px){
  .hero-v2-title{font-size:clamp(24px,6.5vw,44px);white-space:normal}
  .hero-v2-stats{grid-template-columns:1fr 1fr;gap:22px 0}
  .hero-v2-stat + .hero-v2-stat{border-left:none}
  .hero-v2-stat{padding:16px 20px;border-top:0.5px solid ${T.lineDark}}
  .hero-v2-stats .hero-v2-scrollhint{display:none}
  .hero-v2-legend{gap:16px}
}
@media(max-width:480px){
  .hero-v2-stats{grid-template-columns:1fr}
}

/* logo marquee  -  trusted/supported by */
@keyframes logoScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.logo-strip{position:relative;overflow:hidden;padding:6px 0;mask-image:linear-gradient(to right,transparent 0,black 6%,black 94%,transparent 100%);-webkit-mask-image:linear-gradient(to right,transparent 0,black 6%,black 94%,transparent 100%)}
.logo-strip-track{display:flex;gap:32px;width:max-content;animation:logoScroll 38s linear infinite;will-change:transform}
.logo-strip-track.rev{animation-direction:reverse;animation-duration:46s}
.logo-strip:hover .logo-strip-track{animation-play-state:paused}
.logo-slot{flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:0 32px;background:transparent;border:none;transition:opacity .25s ease}
.logo-slot:hover{opacity:1}
.logo-slot.dark{background:transparent;border:none}
.logo-slot.dark:hover{background:transparent}
.logo-slot .logo-placeholder{font-family:${T.mono};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(242,236,228,0.3);transition:color .25s ease}
.logo-slot:hover .logo-placeholder{color:rgba(242,236,228,0.6)}
.logo-slot img{max-height:36px;max-width:130px;object-fit:contain;transition:opacity .25s ease,filter .25s ease}
.logo-slot.dark img{filter:brightness(0) invert(1);opacity:.4}
.logo-slot.dark:hover img{opacity:.75}
.logo-slot:hover img{opacity:1}
.logo-strip-label{font-family:${T.mono};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${T.stone};margin-bottom:18px;padding-bottom:10px;border-bottom:0.5px solid ${T.line}}
.logo-dual-strip{display:flex;flex-direction:column;gap:12px}
@media(max-width:640px){.logo-slot{min-width:120px;height:58px;padding:0 14px}.logo-strip-track{gap:16px}}

/* ═══ THESIS  -  editorial layout polish ═══ */
.thesis-card{margin-top:clamp(40px,5vw,64px);margin-bottom:24px;scroll-margin-top:120px}
.thesis-card-rule{display:block;width:100%;height:1px;background:${T.lineStrong};margin-bottom:0}
.thesis-card-tag{font-family:${T.mono};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${T.brass};margin-top:28px;display:block}
.thesis-card-num{font-family:${T.display};font-size:80px;font-weight:300;color:${T.navy};line-height:0.9;letter-spacing:-0.04em;font-variation-settings:"opsz" 144,"SOFT" 30;font-style:italic;display:block;margin-top:12px}
.thesis-card-title{font-family:${T.display};font-size:clamp(28px,3vw,40px);font-weight:400;line-height:1.05;letter-spacing:-0.028em;color:${T.ink};font-variation-settings:"opsz" 144,"SOFT" 30;margin:16px 0 0}
.thesis-card-label{font-family:${T.mono};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${T.stone};margin-top:12px;display:block}
@media(max-width:640px){
  .thesis-card-num{font-size:60px}
  .thesis-card-title{font-size:26px}
}

.thesis-toc{margin:32px 0 60px;border-top:0.5px solid ${T.lineStrong};border-bottom:0.5px solid ${T.lineStrong};padding:26px 0 0}
.thesis-toc-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:22px;font-family:${T.mono};font-size:10.5px;letter-spacing:0.24em;text-transform:uppercase}
.thesis-toc-head .tl{color:${T.brass};display:inline-flex;align-items:center;gap:12px}
.thesis-toc-head .tl::before{content:"";display:inline-block;width:28px;height:1px;background:${T.brass}}
.thesis-toc-head .tr{color:${T.stone}}
.thesis-toc-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:0.5px solid ${T.line}}
@media(max-width:980px){.thesis-toc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.thesis-toc-grid{grid-template-columns:1fr}}
.thesis-toc-item{display:block;text-decoration:none;padding:22px 20px 24px;border-right:0.5px solid ${T.line};border-bottom:0.5px solid ${T.line};border-left:2px solid transparent;transition:border-left-color .22s ease,padding-left .22s ease;position:relative;background:${T.paper}}
.thesis-toc-item:nth-child(4n){border-right:none}
@media(max-width:980px){.thesis-toc-item{border-right:0.5px solid ${T.line}!important}.thesis-toc-item:nth-child(2n){border-right:none!important}}
@media(max-width:520px){.thesis-toc-item{border-right:none!important}}
.thesis-toc-item:hover{border-left-color:${T.brass};padding-left:18px}
.thesis-toc-item:hover .thesis-toc-num{color:${T.brass}}
.thesis-toc-item:hover .thesis-toc-arrow{color:${T.brass};transform:translateX(3px)}
.thesis-toc-num{font-family:${T.display};font-size:38px;font-weight:300;color:${T.navy};line-height:1;letter-spacing:-0.035em;font-variation-settings:"opsz" 144,"SOFT" 30;font-style:italic;margin-bottom:14px;display:block;transition:color .2s ease}
.thesis-toc-label{font-family:${T.mono};font-size:9.5px;letter-spacing:0.22em;text-transform:uppercase;color:${T.stone};margin-bottom:8px}
.thesis-toc-title{font-family:${T.display};font-size:14.5px;font-weight:500;line-height:1.32;letter-spacing:-0.01em;color:${T.ink};font-variation-settings:"opsz" 144,"SOFT" 30}
.thesis-toc-arrow{position:absolute;bottom:14px;right:18px;font-family:${T.mono};font-size:12px;color:${T.stone};transition:color .2s ease,transform .2s ease}
.thesis-toc-end{background:rgba(16,35,42,0.04);display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:22px}
.thesis-toc-end .k{font-family:${T.mono};font-size:9.5px;letter-spacing:0.22em;text-transform:uppercase;color:${T.brass};margin-bottom:10px}
.thesis-toc-end .t{font-family:${T.display};font-style:italic;font-size:15px;color:${T.navy};letter-spacing:-0.01em;line-height:1.3;font-variation-settings:"opsz" 144,"SOFT" 80}

.thesis-interlude{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;margin-top:clamp(40px,5vw,64px);margin-bottom:clamp(32px,4vw,52px);background:${T.navy};color:${T.paper};padding:clamp(72px,9vw,120px) clamp(24px,5vw,60px);overflow:hidden}
.thesis-interlude-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(242,236,228,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.045) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 85%);mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 85%);pointer-events:none}
.thesis-interlude-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(900px,90vw);height:420px;background:radial-gradient(ellipse,rgba(215,90,51,0.14) 0%,rgba(215,90,51,0.04) 40%,transparent 72%);pointer-events:none}
.thesis-interlude-inner{max-width:960px;margin:0 auto;position:relative;z-index:2}
.thesis-interlude-kicker{font-family:${T.mono};font-size:10.5px;letter-spacing:0.3em;text-transform:uppercase;color:${T.brass};margin-bottom:32px;display:flex;align-items:center;gap:14px}
.thesis-interlude-kicker::before{content:"";display:inline-block;width:32px;height:1px;background:${T.brass}}
.thesis-interlude h3{font-family:${T.display};font-size:clamp(30px,4.4vw,58px);font-weight:300;line-height:1.14;letter-spacing:-0.028em;color:${T.paper};font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1;font-style:italic;margin:0 0 36px;max-width:920px}
.thesis-interlude h3 em{color:${T.brass2};font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 100,"WONK" 1}
.thesis-interlude-attrib{font-family:${T.mono};font-size:10.5px;letter-spacing:0.26em;text-transform:uppercase;color:rgba(242,236,228,0.5);padding-top:26px;border-top:0.5px solid rgba(242,236,228,0.16);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.thesis-interlude-attrib .em{color:${T.brass2}}

.thesis-colophon{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;margin-top:clamp(40px,5vw,64px);background:${T.navy};color:${T.paper};padding:clamp(24px,3vw,40px) clamp(24px,5vw,60px);border-top:1px solid rgba(215,90,51,0.35)}
.thesis-colophon-inner{max-width:720px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;font-family:${T.mono};font-size:10.5px;letter-spacing:0.26em;text-transform:uppercase;color:rgba(242,236,228,0.5)}
.thesis-colophon-inner .mid{text-align:center;color:${T.paper};font-size:13.5px;font-family:${T.display};font-style:italic;letter-spacing:0.01em;font-weight:400;font-variation-settings:"opsz" 144,"SOFT" 80;text-transform:none}
.thesis-colophon-inner .next{text-align:right;color:${T.brass2};text-decoration:none;transition:color .22s ease,transform .22s ease;display:inline-flex;justify-content:flex-end;align-items:center;gap:10px}
.thesis-colophon-inner .next:hover{color:${T.paper}}
.thesis-colophon-inner .next .arrow{transition:transform .22s ease;display:inline-block}
.thesis-colophon-inner .next:hover .arrow{transform:translateX(4px)}
@media(max-width:720px){.thesis-colophon-inner{grid-template-columns:1fr;text-align:left}.thesis-colophon-inner .mid{text-align:left}.thesis-colophon-inner .next{justify-content:flex-start;text-align:left}}

/* ═══ CREAM SECTION  -  embedded terrain in the dark river ═══ */
.cream-card{
  position:relative;
}
.cream-card::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(215,90,51,0.38) 30%,rgba(215,90,51,0.38) 70%,transparent 100%);
  z-index:3;
  pointer-events:none;
}
.cream-card::after{
  content:'';
  position:absolute;
  bottom:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(215,90,51,0.2) 30%,rgba(215,90,51,0.2) 70%,transparent 100%);
  z-index:3;
  pointer-events:none;
}

/* dark TOC overrides */
.thesis-toc-dark{border-color:rgba(242,236,228,0.16)}
.thesis-toc-dark .thesis-toc-head .tl{color:${T.brass}}
.thesis-toc-dark .thesis-toc-head .tl::before{background:${T.brass}}
.thesis-toc-dark .thesis-toc-head .tr{color:rgba(242,236,228,0.38)}
.thesis-toc-dark .thesis-toc-grid{border-color:rgba(242,236,228,0.14)}
.thesis-toc-dark .thesis-toc-item{background:transparent;border-color:rgba(242,236,228,0.14)!important}
.thesis-toc-dark .thesis-toc-item:hover{background:rgba(242,236,228,0.06)}
.thesis-toc-dark .thesis-toc-item:hover .thesis-toc-num{color:${T.brass}}
.thesis-toc-dark .thesis-toc-item:hover .thesis-toc-arrow{color:${T.brass}}
.thesis-toc-dark .thesis-toc-num{color:rgba(242,236,228,0.85)}
.thesis-toc-dark .thesis-toc-label{color:rgba(242,236,228,0.42)}
.thesis-toc-dark .thesis-toc-title{color:${T.paper}}
.thesis-toc-dark .thesis-toc-arrow{color:rgba(242,236,228,0.28)}
.thesis-toc-dark .thesis-toc-end{background:rgba(242,236,228,0.05)}
.thesis-toc-dark .thesis-toc-end .k{color:${T.brass}}
.thesis-toc-dark .thesis-toc-end .t{color:rgba(242,236,228,0.65)}

/* ═══ INSIGHTS  -  index grid + dark chapter panels ═══ */
.insights-idx{margin:0 0 clamp(64px,7vw,96px);border-top:0.5px solid ${T.lineStrong};border-bottom:0.5px solid ${T.lineStrong}}
.insights-idx-head{display:flex;justify-content:space-between;align-items:baseline;padding:20px 0 18px;font-family:${T.mono};font-size:10.5px;letter-spacing:0.26em;text-transform:uppercase;border-bottom:0.5px solid ${T.line}}
.insights-idx-head .l{color:${T.brass};display:inline-flex;align-items:center;gap:12px}
.insights-idx-head .l::before{content:"";display:inline-block;width:28px;height:1px;background:${T.brass}}
.insights-idx-head .r{color:${T.stone}}
.insights-idx-grid{display:grid;grid-template-columns:repeat(5,1fr)}
@media(max-width:980px){.insights-idx-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:640px){.insights-idx-grid{grid-template-columns:repeat(2,1fr)}}
.insights-idx-item{display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;padding:22px 20px 22px;min-height:152px;border-right:0.5px solid ${T.line};border-bottom:0.5px solid ${T.line};background:${T.paper};transition:background .22s ease,transform .22s ease}
.insights-idx-item:nth-child(5n){border-right:none}
.insights-idx-item:nth-last-child(-n+5){border-bottom:none}
@media(max-width:980px){.insights-idx-item{border-right:0.5px solid ${T.line}!important;border-bottom:0.5px solid ${T.line}!important}.insights-idx-item:nth-child(3n){border-right:none!important}.insights-idx-item:nth-last-child(-n+1){border-bottom:none!important}}
@media(max-width:640px){.insights-idx-item{border-right:0.5px solid ${T.line}!important;border-bottom:0.5px solid ${T.line}!important}.insights-idx-item:nth-child(2n){border-right:none!important}}
.insights-idx-item.is-dark{background:${T.navy};color:${T.paper}}
.insights-idx-item:hover{background:rgba(16,35,42,0.05)}
.insights-idx-item.is-dark:hover{background:#081619}
.insights-idx-item:hover .insights-idx-num{color:${T.brass}}
.insights-idx-item.is-dark:hover .insights-idx-num{color:${T.brass2}}
.insights-idx-num{font-family:${T.display};font-size:34px;font-weight:300;color:${T.navy};line-height:1;letter-spacing:-0.035em;font-variation-settings:"opsz" 144,"SOFT" 30;font-style:italic;display:block;transition:color .22s ease}
.insights-idx-item.is-dark .insights-idx-num{color:${T.brass2}}
.insights-idx-kick{font-family:${T.mono};font-size:9.5px;letter-spacing:0.22em;text-transform:uppercase;color:${T.stone};margin:10px 0 6px}
.insights-idx-item.is-dark .insights-idx-kick{color:rgba(242,236,228,0.5)}
.insights-idx-title{font-family:${T.display};font-size:13.5px;font-weight:500;line-height:1.32;letter-spacing:-0.01em;color:${T.ink};font-variation-settings:"opsz" 144,"SOFT" 30}
.insights-idx-item.is-dark .insights-idx-title{color:${T.paper}}

.insight-dark{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;margin-top:clamp(72px,8vw,112px);margin-bottom:clamp(72px,8vw,112px);background:${T.navy};color:${T.paper};padding:clamp(64px,8vw,104px) clamp(24px,5vw,60px);overflow:hidden;border-top:1px solid rgba(215,90,51,0.38);border-bottom:1px solid rgba(215,90,51,0.12)}
.insight-dark-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(242,236,228,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.035) 1px,transparent 1px);background:linear-gradient(rgba(242,236,228,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.035) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 85%);mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 85%);pointer-events:none}
.insight-dark-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(760px,90vw);height:320px;background:radial-gradient(ellipse,rgba(215,90,51,0.1) 0%,rgba(215,90,51,0.03) 40%,transparent 72%);pointer-events:none}
.insight-dark-inner{max-width:900px;margin:0 auto;position:relative;z-index:2}

/* ═══ INSIGHTS  -  new viz components ═══ */
.insight-stat-row{display:grid;gap:1px;background:${T.lineStrong};border:0.5px solid ${T.lineStrong};margin:28px 0}
@media(max-width:640px){.insight-stat-row{grid-template-columns:1fr!important}}
.insight-summary-grid{display:grid;grid-template-columns:repeat(3,1fr)}
@media(max-width:900px){.insight-summary-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.insight-summary-grid{grid-template-columns:1fr}}
.insight-gantt-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
.insight-gantt-inner{min-width:560px}
.insight-layer-grid{display:grid;grid-template-columns:200px 1fr}
@media(max-width:640px){.insight-layer-grid{grid-template-columns:1fr}}
.verdict-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:${T.lineStrong}}
@media(max-width:580px){.verdict-grid{grid-template-columns:1fr}}

/* ═══ V2 REDESIGN ═══ */
@keyframes orbPulse{0%,100%{box-shadow:0 0 70px rgba(215,90,51,0.45),0 0 35px rgba(215,90,51,0.3),0 0 16px rgba(215,90,51,0.5)}50%{box-shadow:0 0 100px rgba(215,90,51,0.65),0 0 50px rgba(215,90,51,0.45),0 0 24px rgba(215,90,51,0.7)}}
@keyframes cardFloat0{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes cardFloat1{0%,100%{transform:translateY(-5px)}50%{transform:translateY(3px)}}
@keyframes cardFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
@keyframes cardFloat3{0%,100%{transform:translateY(-4px)}50%{transform:translateY(5px)}}
@keyframes termBlink{0%,100%{opacity:1}50%{opacity:0}}

.hero-nucleus{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;margin:0 auto;user-select:none}
.hero-orb{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:clamp(140px,28%,190px);height:clamp(140px,28%,190px);border-radius:50%;background:radial-gradient(circle at 36% 34%,#1f2d3d 0%,${T.ink2} 55%,#060c11 100%);border:1px solid rgba(215,90,51,0.35);animation:orbPulse 4s ease-in-out infinite;z-index:3;overflow:hidden}
.hero-orb-inner{position:absolute;top:20%;left:24%;width:28%;height:20%;border-radius:50%;background:rgba(232,128,92,0.2);filter:blur(5px)}
.hero-orb-dot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:${T.brass2};box-shadow:0 0 14px ${T.brass2}}
.hero-cap-card{position:absolute;background:rgba(6,12,17,0.88);border:0.5px solid rgba(215,90,51,0.2);backdrop-filter:blur(16px);padding:14px 18px;border-radius:10px;min-width:144px;z-index:4}
.hero-cap-card:hover{border-color:rgba(215,90,51,0.5)}
.hero-cap-card.c0{top:5%;left:0%;animation:cardFloat0 5.2s ease-in-out infinite}
.hero-cap-card.c1{top:5%;right:0%;animation:cardFloat1 6s ease-in-out infinite}
.hero-cap-card.c2{bottom:5%;left:0%;animation:cardFloat2 5.6s ease-in-out infinite}
.hero-cap-card.c3{bottom:5%;right:0%;animation:cardFloat3 4.9s ease-in-out infinite}
.hero-cap-dot{width:7px;height:7px;border-radius:50%;margin-bottom:8px}
.hero-cap-label{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,236,228,0.9);margin-bottom:3px;white-space:nowrap}
.hero-cap-sub{font-family:'IBM Plex Mono',monospace;font-size:9px;color:rgba(162,149,138,0.7);white-space:nowrap}
@media(max-width:640px){.hero-cap-card{min-width:120px;padding:10px 12px}.hero-cap-label{font-size:9px}.hero-cap-sub{display:none}}
@media(max-width:480px){.hero-cap-card.c1,.hero-cap-card.c3{display:none}}

.flow-diagram{display:grid;grid-template-columns:1fr auto 1fr;gap:clamp(16px,3vw,36px);align-items:center;margin-bottom:clamp(40px,6vw,64px)}
.flow-col{display:flex;flex-direction:column;gap:10px}
.flow-node{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-radius:8px;font-size:13px;line-height:1.45;transition:transform .2s ease}
.flow-node:hover{transform:translateX(4px)}
.flow-node-bad{background:rgba(156,74,62,0.07);border:0.5px solid rgba(156,74,62,0.22);color:#7a3330}
.flow-node-good{background:rgba(176,137,70,0.07);border:0.5px solid rgba(176,137,70,0.28);color:#5a3e1a}
.flow-node-icon{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px}
.flow-hub{display:flex;flex-direction:column;align-items:center;gap:12px}
.flow-hub-orb{width:clamp(60px,7vw,84px);height:clamp(60px,7vw,84px);border-radius:50%;background:radial-gradient(circle at 35% 35%,${T.ink},${T.ink2});border:1px solid rgba(215,90,51,0.45);box-shadow:0 0 28px rgba(215,90,51,0.18),inset 0 0 20px rgba(215,90,51,0.05);display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.08em;text-align:center;color:${T.brass};animation:orbPulse 4s ease-in-out infinite;padding:8px;line-height:1.3}
.flow-hub-label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${T.stone};text-align:center;line-height:1.5}
@media(max-width:820px){.flow-diagram{grid-template-columns:1fr}.flow-hub{flex-direction:row;justify-content:center;padding:8px 0}.flow-col{display:grid;grid-template-columns:1fr 1fr;gap:8px}}

.terminal-card{background:#080e14;border:0.5px solid rgba(242,236,228,0.1);border-radius:12px;overflow:hidden}
.terminal-header{display:flex;align-items:center;gap:6px;padding:11px 16px;background:#0b1318;border-bottom:0.5px solid rgba(242,236,228,0.07)}
.terminal-dot{width:10px;height:10px;border-radius:50%}
.terminal-title{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,236,228,0.3);margin-left:6px}
.terminal-body{padding:18px 20px;font-family:'IBM Plex Mono',monospace;font-size:12.5px;line-height:1.75;display:flex;flex-direction:column;gap:2px}
.t-prompt{color:${T.brass};font-size:11px}
.t-cmd{color:rgba(242,236,228,0.88)}
.t-out{color:#4ade80;font-size:11px}
.t-muted{color:rgba(242,236,228,0.32);font-size:11px}
.t-cursor{display:inline-block;width:7px;height:13px;background:${T.brass};animation:termBlink 1.1s step-end infinite;vertical-align:text-bottom;margin-left:2px;border-radius:1px}

.pricing-v2{border:0.5px solid ${T.lineStrong};background:${T.cardBg};padding:clamp(28px,3.5vw,44px) clamp(22px,3vw,38px);position:relative;transition:border-color .35s,box-shadow .35s,transform .35s;border-radius:14px}
.pricing-v2::before{content:'';position:absolute;top:-1px;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,${T.brass} 50%,transparent);opacity:0;transition:opacity .4s}
.pricing-v2:hover{border-color:${T.ink};transform:translateY(-3px);box-shadow:0 16px 40px rgba(10,9,8,0.07)}
.pricing-v2:hover::before{opacity:1}
.pricing-v2.pop{background:rgba(176,137,70,0.04);border-color:rgba(176,137,70,0.38);box-shadow:0 0 52px rgba(176,137,70,0.09)}
.pricing-v2.pop::before{opacity:0.65}
.pricing-v2.pop:hover{box-shadow:0 0 72px rgba(176,137,70,0.14),0 16px 40px rgba(10,9,8,0.06)}

.metrics-bar{height:2px;background:rgba(242,236,228,0.07);margin-top:14px;position:relative;overflow:hidden;border-radius:1px}
.metrics-bar-fill{position:absolute;top:0;left:0;height:100%;background:linear-gradient(90deg,${T.brassDeep},${T.brass},${T.brass2});border-radius:1px;transition:width 1.6s cubic-bezier(.16,1,.3,1)}

.traction-grid{display:grid;grid-template-columns:1fr 1px 1fr;gap:clamp(24px,5vw,64px);align-items:center}
.traction-divider{background:linear-gradient(to bottom,transparent,${T.lineStrong},transparent);height:140px;width:1px}
.traction-hero-num{font-family:'Fraunces',serif;font-size:clamp(56px,8vw,100px);font-weight:300;letter-spacing:-0.04em;line-height:0.9;color:${T.ink};font-variation-settings:'opsz' 144,'SOFT' 20}
.traction-hero-num em{color:${T.brass};font-style:italic;font-size:0.55em;margin-left:2px;font-variation-settings:'opsz' 144,'SOFT' 100,'WONK' 1}
@media(max-width:760px){.traction-grid{grid-template-columns:1fr;text-align:center}.traction-divider{height:1px;width:100px;margin:0 auto}}

.prefooter{position:relative;padding:clamp(88px,11vw,144px) clamp(24px,5vw,60px);background:${T.navy};color:${T.paper};overflow:hidden;text-align:center;border-top:1px solid rgba(215,90,51,0.32)}
.prefooter-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(242,236,228,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.04) 1px,transparent 1px);background-size:68px 68px;mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 10%,transparent 80%);pointer-events:none}
.prefooter-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(680px,90vw);height:280px;background:radial-gradient(ellipse,rgba(215,90,51,0.11) 0%,rgba(215,90,51,0.03) 55%,transparent 75%);pointer-events:none}

.scroll-progress-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,${T.brass},${T.brass2});z-index:9999;pointer-events:none;transition:width .08s linear}

/* ═══════════════════════════════════════════════════════════════
   COMPREHENSIVE MOBILE RESPONSIVENESS
   Scales every section, card, grid, and spacing down for phones.
   Desktop layout is untouched - these only fire below breakpoints.
═══════════════════════════════════════════════════════════════ */

/* ─── CARD PADDING ─── */
@media(max-width:768px){
  .card,.card-content{padding:24px !important}
  .card-metric{padding:20px 16px !important}
  .card-feature{padding:28px 22px !important}
  .card-dk{padding:24px !important}
  .pricing-v2{padding:26px 20px !important}
}
@media(max-width:640px){
  .card,.card-content{padding:18px !important}
  .card-metric{padding:16px 12px !important}
  .card-feature{padding:22px 16px !important}
  .card-dk{padding:18px !important}
  .pricing-v2{padding:20px 16px !important}
}
@media(max-width:480px){
  .card,.card-content{padding:14px !important}
  .card-feature{padding:18px 14px !important}
  .card-dk{padding:14px !important}
}

/* ─── SECTION PADDING ─── */
@media(max-width:640px){
  .sec-pad{padding:44px 0 !important}
  .hero-pad{padding:22px 0 36px !important}
  .thesis-interlude{padding:44px clamp(16px,5vw,24px) !important}
  .thesis-colophon{padding:18px clamp(16px,5vw,24px) !important}
  .insight-dark{padding:44px clamp(16px,5vw,24px) !important}
  .prefooter{padding:52px clamp(16px,5vw,24px) !important}
}
@media(max-width:480px){
  .sec-pad{padding:32px 0 !important}
  .thesis-interlude{padding:32px 16px !important}
  .insight-dark{padding:32px 16px !important}
  .prefooter{padding:40px 16px !important}
}

/* ─── PAGE CONTAINER ─── */
@media(max-width:480px){
  .page{padding:0 16px !important}
}

/* ─── DROP CAP ─── */
@media(max-width:640px){
  .dropcap::first-letter{font-size:4em !important;padding:4px 10px 0 0 !important}
}
@media(max-width:480px){
  .dropcap::first-letter{font-size:3.4em !important;padding:3px 8px 0 0 !important}
}

/* ─── SCORE VIZ ─── */
@media(max-width:640px){
  .sv{grid-template-columns:1fr 80px !important;gap:10px !important}
  .sv-lbl{font-size:14px !important}
}
@media(max-width:480px){
  .sv{grid-template-columns:1fr !important;gap:4px !important}
  .sv-bar{display:none !important}
  .sv-val{text-align:left !important}
}

/* ─── HERO V2 EXTRA ─── */
@media(max-width:820px){
  .hero-v2-title{white-space:normal !important;font-size:clamp(26px,3.8vw,52px) !important;margin-bottom:20px !important}
  .hero-v2-lede{font-size:clamp(14px,1.8vw,18px) !important;margin-bottom:28px !important}
  .hero-v2-body{gap:clamp(16px,3vw,32px) !important}
}
@media(max-width:640px){
  .hero-v2-text{text-align:center}
  .hero-v2-text > div:first-child{display:flex;justify-content:center;margin-bottom:12px !important}
  .hero-v2-text > div:first-child > div{padding:5px 11px !important;gap:7px !important;border-radius:2px !important}
  .hero-v2-text > div:first-child span{font-size:10px !important}
  .hero-v2-text > div:first-child img{height:12px !important}
  .hero-v2-eyebrow{justify-content:center;margin-bottom:14px !important;font-size:11px !important;padding:5px 11px 5px 8px !important}
  .hero-v2-title{font-size:clamp(26px,6.5vw,40px) !important;margin-bottom:16px !important}
  .hero-v2-lede{font-size:clamp(15px,3.8vw,17px) !important;margin-bottom:18px !important;max-width:100% !important}
  .hero-v2-ctas{justify-content:center;gap:8px !important;margin-bottom:10px !important}
  .hero-v2-ctas .btn-lg{padding:11px 22px !important;font-size:10px !important;letter-spacing:0.16em !important}
  .hero-chips{justify-content:center}
  .hero-v2-legend{gap:10px !important}
  .hero-v2-legend .l-name{font-size:11px !important}
  .hero-v2-legend .l-label{font-size:9px !important}
  .hero-v2-illu{max-width:min(100%,200px) !important;margin:0 auto !important}
}
@media(max-width:480px){
  .hero-v2-eyebrow{margin-bottom:10px !important;font-size:10.5px !important}
  .hero-v2-title{font-size:clamp(26px,6.5vw,38px) !important}
  .hero-v2-lede{font-size:15px !important}
  .hero-v2-legend{display:none !important}
  .hero-v2-ctas{gap:6px !important}
  .hero-v2-ctas .btn-lg{padding:10px 20px !important;font-size:9.5px !important}
}

/* ─── THESIS EXTRA ─── */
@media(max-width:640px){
  .thesis-interlude h3{margin-bottom:18px !important}
  .thesis-interlude-kicker{margin-bottom:18px !important}
  .thesis-toc{margin:14px 0 32px !important;padding:20px 0 0 !important}
  .thesis-toc-num{font-size:28px !important}
  .thesis-toc-item{padding:14px 12px 16px !important}
  .thesis-toc-item:hover{padding-left:10px !important}
  .thesis-card-num{font-size:52px !important}
  .thesis-interlude-attrib{padding-top:18px !important}

  /* ThreeShiftsViz cards: compress */
  .shifts-cell{padding:11px 12px !important}
  .shifts-cell h4{font-size:12px !important;margin-bottom:4px !important}
  .shifts-cell p{font-size:10.5px !important;line-height:1.45 !important}

  /* TwoHalvesFigure: BET numbers fit inside narrow half-column */
  .bet-figs-grid > div{padding:8px 6px !important}
  .bet-fig-n{font-size:17px !important;margin-bottom:4px !important}
  .bet-fig-l{font-size:7.5px !important;letter-spacing:0.12em !important}
  .thesis-two-halves-inner{padding:16px 16px !important}
  .thesis-two-halves-inner h4{font-size:17px !important;margin-bottom:10px !important}
  .thesis-two-halves-inner p{font-size:12.5px !important;line-height:1.6 !important;margin-bottom:12px !important}

  /* PositioningStrip: stack inner key-value pairs */
  .pos-kv-row{grid-template-columns:1fr !important;gap:2px !important}

  /* ArchitectureStack: compress cell padding */
  .thesis-arch > div > div{padding:14px 14px !important}

  /* Bar chart rows: compress padding */
  .thesis-bar-row{padding:10px 14px !important;gap:0 8px !important}
  .thesis-bar-row > div:first-child{font-size:11px !important}
  .thesis-bar-row > div:last-child{font-size:9px !important;min-width:32px !important}

  /* Voice/quote padding */
  .thesis-voice{padding:16px 18px !important}

}
@media(max-width:480px){
  .thesis-toc-num{font-size:22px !important}
  .thesis-card-num{font-size:40px !important}
  .thesis-card-title{font-size:24px !important}
  .shifts-cell{padding:9px 10px !important}
  .shifts-cell h4{font-size:11px !important}
  .shifts-cell p{font-size:9.5px !important}
  .bet-fig-n{font-size:14px !important}
  .thesis-arch > div > div{padding:12px 12px !important}
  .thesis-bar-row{padding:8px 12px !important}
}

/* ─── BUTTONS ─── */
@media(max-width:480px){
  .btn-lg{padding:13px 20px !important;font-size:11px !important;letter-spacing:0.14em !important}
  .btn-md{padding:11px 16px !important;font-size:10px !important}
}
/* Pricing card CTAs: wrap + compress on mobile */
@media(max-width:640px){
  .pricing-grid .btn{
    white-space:normal !important;
    text-align:center !important;
    justify-content:center !important;
    line-height:1.35 !important;
    font-size:8px !important;
    padding:8px 6px !important;
    gap:3px !important;
    letter-spacing:0.1em !important;
    width:100% !important;
  }
}

/* ─── GRID CHILDREN OVERFLOW PREVENTION ─── */
.g2>*,.g3>*,.g4>*{min-width:0}

/* ─── SOLUTION RADIAL GRID ─── */
@media(max-width:800px){
  .sol-radial-grid{grid-template-columns:1fr !important;gap:28px !important}
  .sol-radial-grid > *:first-child{padding-right:0 !important}
  .sol-radial-grid > *:last-child{padding-left:0 !important}
}

/* ─── PRICING CARD SCALING ─── */
@media(max-width:900px){
  .pc-name{font-size:22px !important}
  .pc-price{font-size:38px !important}
  .pc-tag{font-size:11.5px !important;margin-bottom:18px !important}
  .pc-no{font-size:9px !important;margin-bottom:10px !important}
  .pricing-v2{padding:20px 14px !important}
  .pc-badge{top:10px !important;right:10px !important}
  .pc-badge span{font-size:8px !important;padding:4px 8px !important}
}
@media(max-width:640px){
  .pc-name{font-size:15px !important}
  .pc-price{font-size:26px !important}
  .pc-tag{font-size:9.5px !important;margin-bottom:10px !important}
  .pc-no{font-size:8px !important;margin-bottom:7px !important}
  .pricing-v2{padding:12px 9px !important;border-radius:10px !important}
  .pc-price-block{margin-bottom:12px !important}
  .pc-price-row{margin-bottom:4px !important;gap:3px !important}
  .pc-divider{margin-bottom:10px !important}
  .pc-features{margin-bottom:10px !important}
  .pc-features li{margin-bottom:5px !important;font-size:10.5px !important;gap:5px !important;line-height:1.4 !important}
  .pc-features li span{font-size:9px !important;margin-top:1px !important}
}
@media(max-width:420px){
  .pc-name{font-size:12px !important}
  .pc-price{font-size:20px !important}
  .pc-tag{font-size:8.5px !important}
  .pricing-v2{padding:8px 6px !important}
  .pc-price-block{margin-bottom:8px !important}
  .pc-features li{font-size:9.5px !important;margin-bottom:4px !important}
}

/* ─── G2 / G3 GAP SCALING ─── */
@media(max-width:640px){
  .g2{gap:clamp(8px,2vw,16px) !important}
  .g3{gap:clamp(6px,1.5vw,12px) !important}
  .g4{gap:clamp(6px,1.5vw,12px) !important}
  /* Non-pricing g3 grids go 2-col on phones; pricing stays 3-col */
  .g3:not(.pricing-grid){grid-template-columns:1fr 1fr !important}
}
@media(max-width:420px){
  .g2{gap:6px !important}
  .g3{gap:5px !important}
  .g4{gap:5px !important}
  .g3:not(.pricing-grid){grid-template-columns:1fr !important}
  /* Keep pricing always 3-col */
  .pricing-grid{grid-template-columns:repeat(3,1fr) !important;gap:5px !important}
}

/* ─── STAT / HERO GRID ─── */
@media(max-width:640px){
  .stat-hero{gap:16px !important}
  .stat-row-cells{gap:16px !important}
}

/* ─── INSIGHTS PAGE MOBILE ─── */
@media(max-width:640px){
  /* Index: scale number + min-height */
  .insights-idx-num{font-size:26px !important}
  .insights-idx-item{min-height:120px !important;padding:16px 16px !important}
  /* NarrativeCards cells */
  .narrative-cell{padding:18px 20px !important}
  /* DoesDoesnt cells */
  .doesnt-cell{padding:18px 20px !important}
  /* FAQ items */
  .faq-item{padding:16px 18px !important}
  /* StatRow cells */
  .insight-stat-row > div{padding:16px 18px !important}
  /* VerdictCard cells */
  .verdict-grid > div{padding:16px 18px !important}
  /* LayerDiagram cells (already 1-col at 640px) */
  .insight-layer-grid > div{padding:14px 16px !important}
}
@media(max-width:480px){
  .insights-idx-num{font-size:20px !important}
  .insights-idx-item{min-height:88px !important;padding:12px 14px !important}
  .narrative-cell{padding:14px 16px !important}
  .doesnt-cell{padding:14px 16px !important}
  .faq-item{padding:12px 14px !important}
  .insight-stat-row > div{padding:12px 14px !important}
  .verdict-grid > div{padding:12px 14px !important}
  .insight-layer-grid > div{padding:12px 14px !important}
  .insight-sum-header{padding:14px 16px !important}
  .insight-sum-footer{padding:14px 16px !important}
  .insight-sum-footer a{display:none !important}
}

/* ─── COMPARISON TABLE SCROLL ─── */
.alt-table-inner{min-width:0}
@media(max-width:860px){
  .alt-table-inner{min-width:640px}
}

/* ─── BEFORE/AFTER BRIDGE TABLE ─── */
@media(max-width:640px){
  .bridge-table > div{grid-template-columns:1fr !important}
  .bridge-table > div > div{border-right:none !important;border-left:none !important;padding:16px 20px !important}
}

/* ─── METRICS BAR 6-COL → 3+3 ─── */
@media(max-width:768px){
  .metrics-bar-grid{grid-template-columns:repeat(3,1fr) !important}
}
@media(max-width:480px){
  .metrics-bar-grid{grid-template-columns:repeat(2,1fr) !important}
}

/* ─── AGENT FEATURES 2-COL → 1-COL ─── */
@media(max-width:640px){
  .agent-features-grid{grid-template-columns:1fr !important;gap:8px 0 !important}
}

/* ─── FOOTER CONTENT GRID ─── */
@media(max-width:760px){
  .footer-content-grid{grid-template-columns:1fr !important;gap:28px !important;padding-top:44px !important}
}

/* ─── HERO FEATURE CHIPS ─── */
@media(max-width:480px){
  .hero-chips{gap:6px !important;margin-top:18px !important}
  .hero-chips > span{font-size:8.5px !important;padding:5px 10px !important;letter-spacing:0.1em !important}
}
/* ─── HERO PYRAMID ─── */
@media(max-width:480px){
  .hero-v2-illu{max-width:260px !important}
}
/* ─── HOW IT WORKS SVG SCROLL ─── */
@media(max-width:600px){
  .hiw-svg-outer{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -16px;padding-bottom:6px}
  .hiw-svg-outer svg{min-width:520px !important;width:520px !important}
}
/* ─── TRUSTED BY LABEL ─── */
@media(max-width:420px){
  .trusted-label{display:none !important}
}
/* ─── PRICING COHORT PILL ─── */
@media(max-width:420px){
  .cohort-pill span:last-child{font-size:12.5px !important}
}

/* ─── HERO CHIPS AT 640px ─── */
@media(max-width:640px){
  .hero-chips > span{font-size:9.5px !important;padding:6px 13px !important;letter-spacing:0.12em !important}
}

/* ─── PROBLEM CARDS ─── */
@media(max-width:640px){
  #problem .page > div:first-child{margin-bottom:40px !important}
  #problem .g3 > div{padding:28px 22px !important}
  #problem .g3 > div > div:first-child{font-size:30px !important;margin-bottom:14px !important}
  #problem .g3 > div h3{font-size:18px !important;margin-bottom:10px !important}
  #problem .g3 > div p{font-size:13.5px !important;line-height:1.6 !important}
}
@media(max-width:480px){
  #problem .page > div:first-child{margin-bottom:28px !important}
  #problem .g3 > div{padding:22px 18px !important}
  #problem .g3 > div > div:first-child{font-size:26px !important;margin-bottom:10px !important}
  #problem .g3 > div h3{font-size:16px !important}
}

/* ─── SECTION HEADER SPACING ─── */
@media(max-width:640px){
  #why-fails .page > div:first-child{margin-bottom:36px !important}
  #tagline p{font-size:14px !important;line-height:1.7 !important;margin-bottom:24px !important}
  #tagline .g2 > div:first-child > div:first-child{margin-bottom:18px !important}
}

/* ─── TRACTION SECTION ─── */
@media(max-width:640px){
  #trusted .page > div:first-child{margin-bottom:32px !important}
  #trusted .page > div:last-child{margin-top:36px !important;padding-top:32px !important}
  #trusted .traction-grid > div:last-child > div:nth-child(2){font-size:9px !important;margin-top:8px !important;margin-bottom:24px !important}
}

/* ─── SECTION H2 SCALE ON MOBILE ─── */
@media(max-width:640px){
  #problem h2,#invisible-layer h2,#why-fails h2,#why-genios h2{font-size:clamp(26px,6.5vw,40px) !important;margin-bottom:16px !important}
  #problem .page > div:first-child h2,#why-fails .page > div:first-child h2{font-size:clamp(26px,6.5vw,40px) !important}
}
@media(max-width:480px){
  #problem h2,#invisible-layer h2,#why-fails h2,#why-genios h2{font-size:clamp(24px,6vw,36px) !important}
}

/* ─── REQUEST ACCESS ─── */
@media(max-width:640px){
  #request .page > div > h2{font-size:clamp(32px,8vw,50px) !important;margin-bottom:16px !important}
  #request .page > div > p:first-of-type{font-size:15px !important;margin-bottom:28px !important}
  #request .page > div > div:first-child{margin-bottom:20px !important}
}
@media(max-width:480px){
  #request .page > div > h2{font-size:clamp(28px,7.5vw,40px) !important}
}

/* ─── AXIS TABLE / 3-COL TABLES  -  horizontal scroll ─── */
.axis-table-outer{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
@media(max-width:600px){
  .axis-table-inner{min-width:400px}
}

/* ─── TERMINAL CARD ─── */
@media(max-width:640px){
  .terminal-body{font-size:11px !important;padding:14px 16px !important;line-height:1.65 !important}
}

/* ─── STANDARD TABLES ─── */
@media(max-width:768px){
  table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%}
  th,td{padding:10px 12px !important;font-size:13px !important}
}

/* ─── PREFOOTER GLOW ─── */
@media(max-width:640px){
  .prefooter-glow{width:min(280px,90vw) !important;height:160px !important}
}

/* ─── TRACTION ─── */
@media(max-width:480px){
  .traction-hero-num{font-size:clamp(42px,14vw,72px) !important}
}

/* ─── STAT HERO ─── */
@media(max-width:480px){
  .stat-hero{gap:14px !important}
}

/* ─── APP TUC GRID ─── */
@media(max-width:640px){
  .tuc-grid{grid-template-columns:1fr !important}
}

/* ─── TRUSTED STRIP ─── */
@media(max-width:480px){
  .trusted-wrap::before,.trusted-wrap::after{width:36px !important}
}

/* ─── STARTUP PROGRAM ─── */
@media(max-width:640px){
  .sp-price-grid{grid-template-columns:1fr !important}
  .sp-elig-grid{grid-template-columns:1fr !important;gap:20px !important}
}

/* ─── BLOG GRIDS ─── */
@media(max-width:640px){
  .bl-featured > div{grid-template-columns:1fr !important}
}
@media(max-width:720px){
  .tldr-grid{grid-template-columns:1fr !important;gap:14px !important}
  .blog-nav-grid{grid-template-columns:1fr !important}
}

/* ─── INSIGHT SUMMARY / LAYER GRIDS ─── */
@media(max-width:480px){
  .insight-dark-inner{max-width:100% !important}
}

/* ─── THESIS STATS ROW ─── */
@media(max-width:480px){
  .thesis-stats-row{grid-template-columns:repeat(2,1fr) !important}
}
@media(max-width:360px){
  .thesis-stats-row{grid-template-columns:1fr !important}
}

/* ─── PULLQUOTE ─── */
@media(max-width:640px){
  .pullquote-mobile{padding:32px 0 !important}
}

/* ─── LOGO STRIP LABEL ─── */
@media(max-width:640px){
  .logo-strip-label{font-size:9px !important;letter-spacing:0.16em !important}
}

/* ─── FLOW DIAGRAM EXTRA ─── */
@media(max-width:640px){
  .flow-col{grid-template-columns:1fr !important}
  .flow-node{font-size:12px !important}
}
`;



/* ──────────────────────────────────────────────────────────────
  PRIMITIVES
─────────────────────────────────────────────────────────────── */
const Page = ({ children, narrow, style = {} }) => (
  <div className="page" style={{ maxWidth: narrow ? 880 : 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,60px)", position: "relative", zIndex: 2, ...style }}>{children}</div>
);

const SectionLabel = ({ children, accent = T.brass }) => (
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: accent }} />
  {children}
  </div>
);

const H2 = ({ children, dark, style = {} }) => (
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.8vw,64px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: dark ? T.paper : T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 22, maxWidth: 1000, ...style }}>{children}</h2>
);

const Kicker = ({ children, dark, dropCap, style = {} }) => (
  <p className={dropCap ? "dropcap" : ""} style={{ fontSize: "clamp(17px,1.55vw,21px)", color: dark ? T.sandDim : T.ink3, maxWidth: 740, lineHeight: 1.55, marginBottom: 56, fontWeight: 300, ...style }}>{children}</p>
);

const Card = ({ no, title, italic, body, dark }) => (
  <div className={dark ? "card-dk" : "card"}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: dark ? T.sandDim : T.stone, marginBottom: 16 }}>{no}</div>
  <div style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.012em", marginBottom: 14, color: dark ? T.paper : T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {title}{title && italic && " "}
  {italic && <em className="em-wonk">{italic}</em>}
  </div>
  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: dark ? T.sand : T.slate }}>{body}</p>
  </div>
);

const Pullquote = ({ children, dark, style = {} }) => (
  <div className="pullquote-mobile" style={{ fontFamily: T.display, fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 300, lineHeight: 1.2, fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1", padding: "56px 0", maxWidth: 920, letterSpacing: "-0.02em", color: dark ? T.paper : T.ink, ...style }}>
  {children}
  </div>
);

const Mark = ({ children }) => <span style={{ color: T.brass, fontFamily: T.display }}>{children}</span>;

const Footnote = ({ children, dark }) => (
  <div style={{ fontFamily: T.mono, fontSize: 11, color: dark ? T.sandDim : T.stone, paddingTop: 24, borderTop: `0.5px solid ${dark ? T.lineDark : T.line}`, marginTop: 44, lineHeight: 1.65 }}>{children}</div>
);

/* ──────────────────────────────────────────────────────────────
  UNIFIED BUTTON  -  primary  -  secondary  -  ghost x sm  -  md  -  lg
─────────────────────────────────────────────────────────────── */
const Btn = ({ variant = "secondary", size = "md", dark, arrow, href, target, rel, onClick, className = "", children, ...rest }) => {
  const cls = `btn btn-${variant} btn-${size}${dark ? " btn-dark" : ""}${className ? " " + className : ""}`;
  const content = (
  <>
  {children}
  {arrow && <span className="btn-arrow">{arrow === "right" ? "→" : arrow === "down" ? "↓" : arrow}</span>}
  </>
  );
  if (href) return <a className={cls} href={href} target={target} rel={rel} onClick={onClick} {...rest}>{content}</a>;
  return <button type="button" className={cls} onClick={onClick} {...rest}>{content}</button>;
};

/* ──────────────────────────────────────────────────────────────
  1  -  MASTHEAD  -  editorial top strip (Bloomberg/FT cover feel)
─────────────────────────────────────────────────────────────── */
const Masthead = () => (
  <div style={{
  background: T.paper,
  color: T.sandDim,
  borderBottom: `0.5px solid ${T.lineDark}`,
  fontFamily: T.mono,
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  padding: "16px clamp(24px,5vw,60px)",
  position: "relative",
  zIndex: 6,
  }}>
  <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <span style={{ color: T.ink, fontWeight: 500 }}>§ GENIOS  -  MONOGRAPH</span>
  <span className="mast-mid" style={{ color: T.sandDim }}>VOL. I  -  ISS. 01</span>
  <span className="mast-mid" style={{ color: T.brass, fontSize: 12, letterSpacing: 0 }}>✦</span>
  <span className="mast-mid" style={{ color: T.sandDim }}>APRIL  -  MMXXVI</span>
  <span style={{ color: T.sandDim }}>NOIDA  -  IN</span>
  </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
  4  -  VERTICAL RAIL LABEL  -  follows active section
─────────────────────────────────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState({ label: "§ 00  -  COVER  -  MMXXVI", dark: true, id: "" });
  useEffect(() => {
  const observer = new IntersectionObserver(
  (entries) => {
  const visible = entries.filter((e) => e.isIntersecting);
  if (visible.length === 0) return;
  visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
  const top = visible[0];
  setActive({
  label: top.target.dataset.label || "",
  dark: top.target.dataset.dark === "true",
  id: top.target.id || "",
  });
  },
  { threshold: [0.15, 0.4, 0.75], rootMargin: "-25% 0px -25% 0px" }
  );
  document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
  return () => observer.disconnect();
  }, []);
  return active;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
  const calc = () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
  };
  calc();
  window.addEventListener("scroll", calc, { passive: true });
  window.addEventListener("resize", calc);
  return () => {
  window.removeEventListener("scroll", calc);
  window.removeEventListener("resize", calc);
  };
  }, []);
  return p;
}

/* ──────────────────────────────────────────────────────────────
  ROUTING  -  path-based, no router library
─────────────────────────────────────────────────────────────── */
function navigate(to) {
  if (to === window.location.pathname + window.location.search) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new CustomEvent("genios:navigate", { detail: to }));
  window.scrollTo({ top: 0, behavior: "instant" });
}

function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
  const onChange = () => setPath(window.location.pathname);
  window.addEventListener("popstate", onChange);
  window.addEventListener("genios:navigate", onChange);
  return () => {
  window.removeEventListener("popstate", onChange);
  window.removeEventListener("genios:navigate", onChange);
  };
  }, []);
  return path;
}

const Link = ({ to, children, className, style, ...rest }) => (
  <a
  href={to}
  onClick={(e) => { e.preventDefault(); navigate(to); }}
  className={className}
  style={style}
  {...rest}
  >
  {children}
  </a>
);

const VerticalRail = ({ active }) => (
  <div className="vrail" style={{
  position: "fixed",
  left: 0, top: 0, bottom: 0,
  width: "clamp(28px, 3vw, 52px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
  pointerEvents: "none",
  }}>
  <div key={active.label} style={{
  transform: "rotate(-90deg)",
  whiteSpace: "nowrap",
  fontFamily: T.mono,
  fontSize: 10,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: active.dark ? T.sandDim : T.ink3,
  animation: "rotateLabel 0.6s ease both",
  }}>
  {active.label}
  </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
  FLOATING BOTTOM NAV  -  5 pages + home + back-to-top
─────────────────────────────────────────────────────────────── */
const FNAV_PAGES = [
  { to: "/",  no: "00", label: "Home" },
  { to: "/thesis",  no: "01", label: "Thesis" },
  { to: "/insights",  no: "02", label: "Insights" },
  { to: "/applications",  no: "03", label: "Apps" },
  { to: "/blogs",  no: "04", label: "Essays" },
  { to: "/startup-program",  no: "05", label: "Programs" },
];

const FloatingNav = ({ currentPath, progress }) => {
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
  <div
  className="fnav"
  style={{
  position: "fixed",
  bottom: "clamp(14px, 2vw, 22px)",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 90,
  background: T.paper,
  border: `0.5px solid rgba(217,197,166,0.22)`,
  borderRadius: 4,
  boxShadow:
  "0 16px 44px rgba(10,9,8,0.55), 0 2px 10px rgba(10,9,8,0.35), inset 0 1px 0 rgba(244,238,227,0.07)",
  overflow: "hidden",
  maxWidth: "min(880px, calc(100vw - 20px))",
  fontFamily: T.mono,
  }}
  >
  {/* hairline scroll-progress at top */}
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(217,197,166,0.1)", pointerEvents: "none" }}>
  <div style={{ height: "100%", width: `${progress * 100}%`, background: T.brass, transition: "width 0.08s linear" }} />
  </div>

  <div style={{ display: "flex", alignItems: "stretch" }}>
  {FNAV_PAGES.map((p, i) => {
  const on = currentPath === p.to || (p.to === "/" && (currentPath === "" || currentPath === "/"));
  return (
  <Link
  key={p.to}
  to={p.to}
  className="fnav-item"
  style={{
  padding: "14px clamp(8px, 1.1vw, 14px)",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: on ? T.brass : T.sandDim,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 9,
  borderRight: `0.5px solid rgba(217,197,166,0.1)`,
  transition: "color 0.2s ease, background 0.2s ease",
  position: "relative",
  }}
  >
  <span
  style={{
  width: 5, height: 5, borderRadius: "50%",
  background: on ? T.brass : "transparent",
  border: `0.5px solid ${on ? T.brass : T.sandDim}`,
  transition: "background 0.25s ease, border-color 0.25s ease",
  flexShrink: 0,
  }}
  />
  <span>{p.no}</span>
  <span className="fnav-lbl" style={{ opacity: 0.88 }}>{p.label}</span>
  </Link>
  );
  })}

  <button
  onClick={backToTop}
  aria-label="Back to top"
  className="fnav-top"
  style={{
  padding: "14px 16px",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: T.sandDim,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  transition: "color 0.2s ease",
  fontFamily: T.mono,
  display: "flex",
  alignItems: "center",
  gap: 6,
  }}
  >
  <span style={{ fontSize: 14, lineHeight: 1 }}>^</span>
  <span className="fnav-lbl">Top</span>
  </button>
  </div>
  </div>
  );
};

/* ──────────────────────────────────────────────────────────────
  HERO BACKGROUND ELEMENTS
─────────────────────────────────────────────────────────────── */
const HERO_PARTICLES = [
  { x: "9%",  y: "18%", s: 2.8, dur: "9s",  del: "0s" },
  { x: "85%", y: "14%", s: 2.2, dur: "12s",  del: "2.4s" },
  { x: "92%", y: "55%", s: 3.2, dur: "8s",  del: "4.8s" },
  { x: "5%",  y: "72%", s: 2.2, dur: "15s",  del: "1.2s" },
  { x: "60%", y: "82%", s: 2.6, dur: "11s",  del: "3.1s" },
  { x: "36%", y: "8%",  s: 2,  dur: "10s",  del: "6s" },
  { x: "19%", y: "58%", s: 3,  dur: "13s",  del: "1.8s" },
  { x: "74%", y: "42%", s: 2.4, dur: "9.5s", del: "7.2s" },
  { x: "48%", y: "88%", s: 2,  dur: "14s",  del: "0.6s" },
  { x: "28%", y: "30%", s: 1.8, dur: "11s",  del: "5.3s" },
];

const HeroConstellation = ({ mirrored = false }) => (
  <div style={{
  position: "absolute",
  top: "50%",
  [mirrored ? "left" : "right"]: "-5%",
  transform: `translateY(-52%)${mirrored ? " scaleX(-1)" : ""}`,
  width: mirrored ? "36%" : "44%",
  opacity: mirrored ? 0.14 : 0.32,
  pointerEvents: "none",
  zIndex: 1,
  WebkitMaskImage: "linear-gradient(to left, black 15%, transparent 100%)",
  maskImage: "linear-gradient(to left, black 15%, transparent 100%)",
  }}>
  <svg viewBox="0 0 800 800" style={{ width: "100%", height: "auto", display: "block" }}>
  <g>
  {[[400,400,200,220],[400,400,620,180],[400,400,700,500],[400,400,180,600],[400,400,480,680],[200,220,620,180],[620,180,700,500],[700,500,480,680],[480,680,180,600],[180,600,200,220]].map((l, i) => (
  <line key={i} className="edge-d" x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={T.sand} strokeWidth="1" />
  ))}
  </g>
  <g>
  <circle className="node-c" cx="400" cy="400" r="6" fill={T.brass} />
  {[[200,220,0.2],[620,180,0.5],[700,500,0.9],[180,600,1.3],[480,680,1.7]].map((p, i) => (
  <circle key={i} className="node-c" cx={p[0]} cy={p[1]} r="4" fill={T.paper} style={{ animationDelay: `${p[2]}s` }} />
  ))}
  </g>
  </svg>
  </div>
);

const HERO_STATS = [
  { pre: "",  n: "4",  suf: "x",  label: "Context Layers" },
  { pre: "",  n: "Proactive",  suf: "",  label: "Delivery Model" },
  { pre: "",  n: "Org-wide",  suf: "",  label: "Context Scope" },
  { pre: "",  n: "10",  suf: "+",  label: "Integration Signals" },
  { pre: "",  n: "Multi-agent", suf: "",  label: "Built For" },
];

/* ──────────────────────────────────────────────────────────────
  CONTEXT BRAIN  -  editorial figure (hero centerpiece)
  19th-c. anatomical plate x technical drawing x rotating graph globe
─────────────────────────────────────────────────────────────── */

// 4 callouts  -  Roman numerals, anchored to points on the sphere, labelled at corners
const CB_CALLOUTS = [
  { num: "I",  name: "Relationship", q: "Who knows whom, how recently.",  anchor: [486, 236], label: [64, 96],  align: "start" },
  { num: "II",  name: "Authority",  q: "Who decides what, who approves.",  anchor: [634, 236], label: [1136, 96], align: "end"  },
  { num: "III", name: "State",  q: "What is currently true.",  anchor: [486, 346], label: [64, 490],  align: "start" },
  { num: "IV",  name: "Precedent",  q: "What has happened before.",  anchor: [634, 346], label: [1136, 490],align: "end"  },
];

// Globe parallels (latitude rings), tilted 15 degrees forward  -  precomputed from r=140, cy=290
const CB_PARALLELS = [
  { cy: 173, rx: 70,  ry: 18, op: 0.09 },
  { cy: 222, rx: 121, ry: 31, op: 0.13 },
  { cy: 290, rx: 140, ry: 36, op: 0.26 },  // equator  -  slightly brighter
  { cy: 358, rx: 121, ry: 31, op: 0.13 },
  { cy: 407, rx: 70,  ry: 18, op: 0.09 },
];

// Meridians (longitude) as vertical-axis ellipses with varying rx
const CB_MERIDIANS = [
  { rx: 140, op: 0.16 }, // central
  { rx: 121, op: 0.12 },
  { rx: 99,  op: 0.10 },
  { rx: 70,  op: 0.08 },
  { rx: 36,  op: 0.07 },
];

// Graph nodes scattered on the sphere (rust)
const CB_SPHERE_NODES = [
  { lat: 22,  long: -42, r: 2.2 },
  { lat: -8,  long: 28,  r: 2.2 },
  { lat: 44,  long: 18,  r: 1.8 },
  { lat: -32, long: -22, r: 1.8 },
  { lat: 8,  long: -72, r: 2.0 },
  { lat: -48, long: 58,  r: 1.6 },
  { lat: 32,  long: 56,  r: 2.0 },
  { lat: -18, long: -88, r: 1.6 },
  { lat: 0,  long: 0,  r: 2.4 },
  { lat: 12,  long: 75,  r: 1.6 },
];

function projectOnSphere(lat, long, cx = 560, cy = 290, r = 140, tiltDeg = 15) {
  const latR  = (lat  * Math.PI) / 180;
  const longR = (long * Math.PI) / 180;
  const tiltR = (tiltDeg * Math.PI) / 180;
  const x = r * Math.cos(latR) * Math.sin(longR);
  const y = r * Math.sin(latR);
  const z = r * Math.cos(latR) * Math.cos(longR);
  const y2 = y * Math.cos(tiltR) - z * Math.sin(tiltR);
  const z2 = y * Math.sin(tiltR) + z * Math.cos(tiltR);
  return { x: cx + x, y: cy - y2, front: z2 >= -10 };
}

const ContextBrainViz = () => (
  <div className="cb-figure">
  {/* ── TOP FRAME ── */}
  <div className="cb-frame cb-frame-top">
  <span className="cb-fig-kicker">Fig. 01</span>
  <span className="cb-fig-title">The Context Brain, anatomised</span>
  <span className="cb-ticks" aria-hidden>
  <span /><span /><span className="cb-tick-hot" /><span /><span />
  </span>
  </div>

  {/* ── STAGE ── */}
  <div className="cb-stage">
  <svg viewBox="0 0 1200 580" preserveAspectRatio="xMidYMid meet">
  <defs>
  <radialGradient id="cbCore" cx="50%" cy="45%" r="55%">
  <stop offset="0%"  stopColor={T.brass2} stopOpacity="0.09" />
  <stop offset="70%" stopColor={T.brass}  stopOpacity="0.02" />
  <stop offset="100%" stopColor={T.ink}  stopOpacity="0" />
  </radialGradient>
  </defs>

  {/* Soft rust glow under the sphere */}
  <circle cx="560" cy="290" r="210" fill="url(#cbCore)" />

  {/* GLOBE  -  parallels */}
  <g fill="none" stroke={T.paper} strokeWidth="0.5">
  {CB_PARALLELS.map((p, i) => (
  <ellipse key={i} cx="560" cy={p.cy} rx={p.rx} ry={p.ry} strokeOpacity={p.op} />
  ))}
  </g>

  {/* GLOBE  -  meridians (slow opacity drift) */}
  <g className="cb-meridians" fill="none" stroke={T.paper} strokeWidth="0.5">
  {CB_MERIDIANS.map((m, i) => (
  <ellipse key={i} cx="560" cy="290" rx={m.rx} ry={140 * Math.cos((15 * Math.PI) / 180)} strokeOpacity={m.op} />
  ))}
  <line x1="560" y1={290 - 140 * Math.cos((15 * Math.PI) / 180)} x2="560" y2={290 + 140 * Math.cos((15 * Math.PI) / 180)} strokeOpacity="0.2" />
  </g>

  {/* GLOBE  -  sphere outline */}
  <circle cx="560" cy="290" r="140" fill="none" stroke={T.paper} strokeOpacity="0.38" strokeWidth="0.8" />

  {/* Axis tick marks (top & bottom of globe  -  compass-like) */}
  <g stroke={T.brass} strokeWidth="0.6" strokeOpacity="0.7">
  <line x1="560" y1={290 - 140 * Math.cos((15 * Math.PI) / 180) - 6} x2="560" y2={290 - 140 * Math.cos((15 * Math.PI) / 180)} />
  <line x1="560" y1={290 + 140 * Math.cos((15 * Math.PI) / 180)} x2="560" y2={290 + 140 * Math.cos((15 * Math.PI) / 180) + 6} />
  </g>

  {/* SPHERE NODES (rust graph points) */}
  <g>
  {CB_SPHERE_NODES.map((n, i) => {
  const p = projectOnSphere(n.lat, n.long);
  if (!p.front) return null;
  return (
  <circle
  key={i}
  cx={p.x}
  cy={p.y}
  r={n.r}
  fill={T.brass2}
  className="cb-node"
  style={{ animationDelay: `${i * 0.27}s`, filter: `drop-shadow(0 0 3px ${T.brass})` }}
  />
  );
  })}
  </g>

  {/* EQUATORIAL SATELLITE  -  continuous reasoning loop */}
  <g>
  <ellipse id="cbEquator" cx="560" cy="290" rx="140" ry="36" fill="none" stroke="none" />
  <circle r="3.2" fill={T.paper} style={{ filter: `drop-shadow(0 0 6px ${T.brass})` }}>
  <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
  <mpath href="#cbEquator" />
  </animateMotion>
  </circle>
  </g>

  {/* CROSS-HAIR at core */}
  <g stroke={T.brass} strokeWidth="0.5" strokeOpacity="0.55">
  <line x1="548" y1="290" x2="572" y2="290" />
  <line x1="560" y1="278" x2="560" y2="302" />
  </g>

  {/* CALLOUTS  -  leader lines + numbered labels */}
  {CB_CALLOUTS.map((c, i) => {
  const labelYBase = c.label[1];
  const isLeft = c.align === "start";
  return (
  <g key={c.num}>
  {/* Leader line  -  draws in on load */}
  <line
  x1={c.anchor[0]}
  y1={c.anchor[1]}
  x2={c.label[0]}
  y2={c.label[1]}
  stroke={T.paper}
  strokeOpacity="0.32"
  strokeWidth="0.5"
  className="cb-leader"
  style={{ animationDelay: `${0.8 + i * 0.2}s` }}
  />
  {/* Anchor  -  outer ring */}
  <circle cx={c.anchor[0]} cy={c.anchor[1]} r="8" fill="none" stroke={T.brass} strokeOpacity="0.28" strokeWidth="0.6" />
  {/* Anchor  -  dot */}
  <circle
  cx={c.anchor[0]}
  cy={c.anchor[1]}
  r="3.2"
  fill={T.brass}
  className="cb-anchor"
  style={{ animationDelay: `${i * 0.5}s`, filter: `drop-shadow(0 0 5px ${T.brass})` }}
  />

  {/* Label cluster  -  numeral + name + short italic descriptor */}
  <g transform={`translate(${c.label[0]} ${labelYBase})`}>
  {/* Numeral  -  giant Fraunces italic */}
  <text
  x="0"
  y="-22"
  fill={T.brass}
  fontFamily="'Fraunces', serif"
  fontStyle="italic"
  fontSize="40"
  fontWeight="400"
  letterSpacing="0"
  textAnchor={c.align}
  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}
  >
  {c.num}
  </text>
  {/* Name  -  mono uppercase with rust hairline accent */}
  <text
  x="0"
  y="6"
  fill={T.paper}
  fontFamily="'IBM Plex Mono', monospace"
  fontSize="10.5"
  fontWeight="500"
  letterSpacing="0.22em"
  textAnchor={c.align}
  >
  {c.name.toUpperCase()}
  </text>
  {/* Descriptor  -  Fraunces italic, dim */}
  <text
  x="0"
  y="28"
  fill={T.sandDim}
  fontFamily="'Fraunces', serif"
  fontStyle="italic"
  fontSize="13"
  fontWeight="400"
  textAnchor={c.align}
  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
  >
  {c.q}
  </text>
  {/* Tiny rust rule below the name  -  anchored to label side */}
  <line
  x1={isLeft ? 0 : -36}
  x2={isLeft ? 36 : 0}
  y1="14"
  y2="14"
  stroke={T.brass}
  strokeWidth="0.8"
  strokeOpacity="0.7"
  />
  </g>
  </g>
  );
  })}

  {/* CORNER BRACKETS  -  technical drawing convention */}
  <g stroke={T.paper} strokeOpacity="0.28" strokeWidth="0.5" fill="none">
  <path d="M 20 20 L 20 40 M 20 20 L 40 20" />
  <path d="M 1180 20 L 1180 40 M 1180 20 L 1160 20" />
  <path d="M 20 560 L 20 540 M 20 560 L 40 560" />
  <path d="M 1180 560 L 1180 540 M 1180 560 L 1160 560" />
  </g>
  </svg>
  </div>

  {/* ── BOTTOM FRAME ── */}
  <div className="cb-frame cb-frame-bot">
  <span className="cb-fig-source">Plate I</span>
  <span className="cb-fig-caption">
  Four graphs, <em>one reasoning loop</em>  -  continuously.
  </span>
  <span className="cb-fig-source">§ GeniOS  -  Monograph Vol. I</span>
  </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
  HERO  -  nucleus orb with floating capability cards
─────────────────────────────────────────────────────────────── */
const HERO_CAPS = [
  { cls: "c0", label: "Memory Graph",  sub: "Live org knowledge",  dot: T.brass },
  { cls: "c1", label: "Agent Context",  sub: "Sub-50ms recall",  dot: T.brass2 },
  { cls: "c2", label: "Reasoning Layer",  sub: "Multi-step planning",  dot: T.brass },
  { cls: "c3", label: "Tool Dispatch",  sub: "Model-agnostic",  dot: T.brass2 },
];

const HeroNucleus = () => (
  <div className="hero-nucleus">
  {/* orbital rings */}
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, overflow: "visible" }}>
  <defs>
  <radialGradient id="edgeBlue" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stopColor={T.brass} stopOpacity="0.35" />
  <stop offset="100%" stopColor={T.brass} stopOpacity="0" />
  </radialGradient>
  </defs>
  {/* rings */}
  <circle cx="50%" cy="50%" r="45%" fill="none" stroke={T.brass} strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="3 7" className="hv2-orbit-a" style={{ transformOrigin: "50% 50%" }} />
  <circle cx="50%" cy="50%" r="32%" fill="none" stroke={T.brass} strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 9" className="hv2-orbit-b" style={{ transformOrigin: "50% 50%" }} />
  {/* arc connectors: orb center (50%,50%) → card corners */}
  <path d="M 50% 50% Q 32% 35% 18% 16%" stroke={T.brass} strokeOpacity="0.22" strokeWidth="0.8" fill="none" strokeDasharray="3 5" className="edge-d" />
  <path d="M 50% 50% Q 68% 35% 82% 16%" stroke={T.brass} strokeOpacity="0.22" strokeWidth="0.8" fill="none" strokeDasharray="3 5" className="edge-d" />
  <path d="M 50% 50% Q 32% 65% 18% 84%" stroke={T.brass2} strokeOpacity="0.18" strokeWidth="0.8" fill="none" strokeDasharray="3 5" className="edge-d" />
  <path d="M 50% 50% Q 68% 65% 82% 84%" stroke={T.brass2} strokeOpacity="0.18" strokeWidth="0.8" fill="none" strokeDasharray="3 5" className="edge-d" />
  {/* animated dot on each arc */}
  <circle r="2.5" fill={T.brass} opacity="0.9">
  <animateMotion path="M280,280 C180,200 100,90 0,0" dur="2.4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
  </circle>
  <circle r="2" fill={T.brass2} opacity="0.7">
  <animateMotion path="M280,280 C380,200 460,90 560,0" dur="2.8s" begin="-0.7s" repeatCount="indefinite" />
  </circle>
  </svg>

  {/* Central orb */}
  <div className="hero-orb">
  <div className="hero-orb-inner" />
  <div className="hero-orb-dot" />
  </div>

  {/* Capability cards */}
  {HERO_CAPS.map((c) => (
  <div key={c.cls} className={`hero-cap-card ${c.cls}`}>
  <div className="hero-cap-dot" style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }} />
  <div className="hero-cap-label">{c.label}</div>
  <div className="hero-cap-sub">{c.sub}</div>
  </div>
  ))}
  </div>
);

/* ──────────────────────────────────────────────────────────────
  HERO ORBITAL  -  exact port of Hero.html orbital variant
─────────────────────────────────────────────────────────────── */
const HeroOrbital = () => (
  <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", maxWidth: 720, margin: "0 auto" }}>
  <svg viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }}>
  <defs>
  <linearGradient id="hoOrbitA" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%"  stopColor="#D9C5A6" stopOpacity="0"/>
  <stop offset="30%"  stopColor="#D9C5A6" stopOpacity="0.55"/>
  <stop offset="70%"  stopColor="#D9C5A6" stopOpacity="0.55"/>
  <stop offset="100%" stopColor="#D9C5A6" stopOpacity="0"/>
  </linearGradient>
  <linearGradient id="hoOrbitB" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%"  stopColor="#C04F2E" stopOpacity="0"/>
  <stop offset="35%"  stopColor="#C04F2E" stopOpacity="0.75"/>
  <stop offset="65%"  stopColor="#D97A5C" stopOpacity="0.75"/>
  <stop offset="100%" stopColor="#C04F2E" stopOpacity="0"/>
  </linearGradient>
  <linearGradient id="hoOrbitMerge" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%"  stopColor="#F4EEE3" stopOpacity="0"/>
  <stop offset="50%"  stopColor="#F4EEE3" stopOpacity="0.9"/>
  <stop offset="100%" stopColor="#F4EEE3" stopOpacity="0"/>
  </linearGradient>
  <linearGradient id="hoBeamGrad" x1="0" y1="1" x2="0" y2="0">
  <stop offset="0%"  stopColor="#C04F2E" stopOpacity="0"/>
  <stop offset="20%"  stopColor="#C04F2E" stopOpacity="0.35"/>
  <stop offset="70%"  stopColor="#E88A5C" stopOpacity="0.7"/>
  <stop offset="100%" stopColor="#F4EEE3" stopOpacity="1"/>
  </linearGradient>
  <radialGradient id="hoCoreGlow" cx="50%" cy="50%" r="50%">
  <stop offset="0%"  stopColor="#F4EEE3" stopOpacity="1"/>
  <stop offset="40%"  stopColor="#E88A5C" stopOpacity="0.5"/>
  <stop offset="100%" stopColor="#C04F2E" stopOpacity="0"/>
  </radialGradient>
  <radialGradient id="hoNodeGlow" cx="50%" cy="50%" r="50%">
  <stop offset="0%"  stopColor="#F4EEE3" stopOpacity="1"/>
  <stop offset="100%" stopColor="#F4EEE3" stopOpacity="0"/>
  </radialGradient>
  <filter id="hoSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="3" result="blur"/>
  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="hoStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
  <feGaussianBlur stdDeviation="8" result="blur"/>
  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <path id="hoPathOuter" d="M 360,420 m -280,0 a 280,70 0 1,1 560,0 a 280,70 0 1,1 -560,0"/>
  <path id="hoPathMid"  d="M 360,390 m -210,0 a 210,55 0 1,1 420,0 a 210,55 0 1,1 -420,0"/>
  <path id="hoPathInner" d="M 360,360 m -140,0 a 140,38 0 1,1 280,0 a 140,38 0 1,1 -280,0"/>
  </defs>

  {/* Ambient wash */}
  <ellipse cx="360" cy="360" rx="320" ry="320" fill="url(#hoCoreGlow)" opacity="0.35"/>

  {/* Rising beam */}
  <g className="hv2-beam">
  <path d="M 280 490 L 340 110 L 380 110 L 440 490 Z" fill="url(#hoBeamGrad)" opacity="0.35" filter="url(#hoStrongGlow)"/>
  <path d="M 325 490 L 352 120 L 368 120 L 395 490 Z" fill="url(#hoBeamGrad)" opacity="0.85"/>
  <line x1="360" y1="500" x2="360" y2="105" stroke="#F4EEE3" strokeWidth="1" opacity="0.4"/>
  </g>

  {/* Outer orbit  -  sand / signals */}
  <g className="hv2-orbit-a">
  <ellipse cx="360" cy="420" rx="280" ry="70" fill="none" stroke="#D9C5A6" strokeOpacity="0.12" strokeWidth="1"/>
  <ellipse cx="360" cy="420" rx="280" ry="70" fill="none" stroke="url(#hoOrbitA)" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.9"/>
  </g>
  {/* Outer orbit nodes */}
  {[
  { cx:  80, cy: 420, r: 3.0, r2: 8, col: "#F4EEE3", d: "0s"  },
  { cx: 640, cy: 420, r: 3.0, r2: 8, col: "#F4EEE3", d: "0.4s"},
  { cx: 150, cy: 475, r: 2.5, r2: 0, col: "#D9C5A6", d: "0.8s"},
  { cx: 570, cy: 475, r: 2.5, r2: 0, col: "#D9C5A6", d: "1.2s"},
  { cx: 240, cy: 490, r: 2.0, r2: 0, col: "#D9C5A6", d: "1.6s"},
  { cx: 480, cy: 490, r: 2.0, r2: 0, col: "#D9C5A6", d: "2s"  },
  { cx: 360, cy: 490, r: 2.0, r2: 0, col: "#D9C5A6", d: "0.6s"},
  ].map((n, i) => (
  <g key={i} className="hv2-node" style={{ animationDelay: n.d }}>
  <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.col}/>
  {n.r2 > 0 && <circle cx={n.cx} cy={n.cy} r={n.r2} fill="url(#hoNodeGlow)" opacity="0.6"/>}
  </g>
  ))}
  {/* Outer orbit pulse dots */}
  <circle r="2.5" fill="#F4EEE3" filter="url(#hoSoftGlow)">
  <animateMotion dur="14s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathOuter"/></animateMotion>
  </circle>
  <circle r="2" fill="#D9C5A6" filter="url(#hoSoftGlow)" opacity="0.8">
  <animateMotion dur="14s" begin="-4.6s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathOuter"/></animateMotion>
  </circle>
  <circle r="2" fill="#D9C5A6" filter="url(#hoSoftGlow)" opacity="0.6">
  <animateMotion dur="14s" begin="-9.2s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathOuter"/></animateMotion>
  </circle>

  {/* Middle orbit  -  rust / reasoning */}
  <g className="hv2-orbit-b">
  <ellipse cx="360" cy="390" rx="210" ry="55" fill="none" stroke="#C04F2E" strokeOpacity="0.15" strokeWidth="1"/>
  <ellipse cx="360" cy="390" rx="210" ry="55" fill="none" stroke="url(#hoOrbitB)" strokeWidth="1.4"/>
  </g>
  {/* Middle orbit pulse dots */}
  <circle r="3" fill="#E88A5C" filter="url(#hoSoftGlow)">
  <animateMotion dur="9s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathMid"/></animateMotion>
  </circle>
  <circle r="2.5" fill="#D97A5C" filter="url(#hoSoftGlow)">
  <animateMotion dur="9s" begin="-2.2s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathMid"/></animateMotion>
  </circle>
  <circle r="2.5" fill="#C04F2E" filter="url(#hoSoftGlow)">
  <animateMotion dur="9s" begin="-4.5s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathMid"/></animateMotion>
  </circle>
  <circle r="2" fill="#E88A5C" filter="url(#hoSoftGlow)" opacity="0.7">
  <animateMotion dur="9s" begin="-6.8s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathMid"/></animateMotion>
  </circle>

  {/* Inner orbit  -  cream / merged output */}
  <g className="hv2-orbit-c">
  <ellipse cx="360" cy="360" rx="140" ry="38" fill="none" stroke="#F4EEE3" strokeOpacity="0.15" strokeWidth="1"/>
  <ellipse cx="360" cy="360" rx="140" ry="38" fill="none" stroke="url(#hoOrbitMerge)" strokeWidth="1.5"/>
  </g>
  {/* Inner orbit pulse dots */}
  <circle r="2.5" fill="#F4EEE3" filter="url(#hoSoftGlow)">
  <animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathInner"/></animateMotion>
  </circle>
  <circle r="2" fill="#F4EEE3" filter="url(#hoSoftGlow)" opacity="0.7">
  <animateMotion dur="6s" begin="-3s" repeatCount="indefinite" rotate="auto"><mpath href="#hoPathInner"/></animateMotion>
  </circle>

  {/* Central core */}
  <circle className="hv2-scan" cx="360" cy="220" r="40" fill="none" stroke="#E88A5C" strokeWidth="1" opacity="0.5"/>
  <circle cx="360" cy="220" r="70" fill="url(#hoCoreGlow)" opacity="0.9"/>
  <g filter="url(#hoSoftGlow)">
  <circle cx="360" cy="220" r="38" fill="#0A0908" stroke="#F4EEE3" strokeWidth="1"/>
  <circle cx="360" cy="220" r="38" fill="none" stroke="#E88A5C" strokeWidth="0.5" strokeDasharray="2 3"/>
  <g transform="translate(360,220)">
  <circle r="16" fill="none" stroke="#E88A5C" strokeWidth="0.6"/>
  <path d="M 0,-10 L 9,0 L 0,10 L -9,0 Z" fill="none" stroke="#F4EEE3" strokeWidth="1"/>
  <circle r="3" fill="#E88A5C">
  <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/>
  </circle>
  </g>
  </g>
  <text textAnchor="middle" x="360" y="152"
  fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="3" fill="#A89878">
  CONTEXT  BRAIN
  </text>

  {/* Section A label  -  bottom left */}
  <g transform="translate(90,580)">
  <line x1="0" y1="-10" x2="0" y2="-40" stroke="#D9C5A6" strokeOpacity="0.3" strokeWidth="1"/>
  <circle cx="0" cy="-48" r="2.5" fill="#D9C5A6"/>
  <text x="0" y="8"  fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="1.5" fill="#A89878">SECTION A</text>
  <text x="0" y="24" fontFamily="'Fraunces', serif" fontSize="14" fill="#F4EEE3" fontStyle="italic">Context Graph</text>
  <text x="0" y="40" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#A89878">20%  -  substrate</text>
  </g>

  {/* Section B label  -  bottom right */}
  <g transform="translate(540,580)">
  <line x1="0" y1="-10" x2="0" y2="-40" stroke="#C04F2E" strokeOpacity="0.5" strokeWidth="1"/>
  <circle cx="0" cy="-48" r="2.5" fill="#C04F2E"/>
  <text x="0" y="8"  fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="1.5" fill="#D97A5C">SECTION B</text>
  <text x="0" y="24" fontFamily="'Fraunces', serif" fontSize="14" fill="#F4EEE3" fontStyle="italic">Context Intelligence</text>
  <text x="0" y="40" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#D97A5C">80%  -  product</text>
  </g>

  {/* Signal source boxes  -  top corners */}
  <g opacity="0.7">
  <g transform="translate(40,130)">
  <rect x="0" y="0" width="78" height="22" fill="none" stroke="#A89878" strokeOpacity="0.3"/>
  <text x="6" y="14" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#A89878" letterSpacing="1">GMAIL  -  SLACK</text>
  <line x1="78" y1="22" x2="160" y2="220" stroke="#A89878" strokeOpacity="0.15" strokeDasharray="3 4"/>
  <circle r="1.8" fill="#F4EEE3" opacity="0">
  <animate attributeName="cx" values="78;160" dur="3.2s" repeatCount="indefinite"/>
  <animate attributeName="cy" values="22;220" dur="3.2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" repeatCount="indefinite"/>
  </circle>
  </g>
  <g transform="translate(602,130)">
  <rect x="0" y="0" width="78" height="22" fill="none" stroke="#A89878" strokeOpacity="0.3"/>
  <text x="6" y="14" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#A89878" letterSpacing="1">CAL  -  CRM  -  DOCS</text>
  <line x1="0" y1="22" x2="-82" y2="220" stroke="#A89878" strokeOpacity="0.15" strokeDasharray="3 4"/>
  <circle r="1.8" fill="#F4EEE3" opacity="0">
  <animate attributeName="cx" values="0;-82" dur="3.2s" begin="1.1s" repeatCount="indefinite"/>
  <animate attributeName="cy" values="22;220" dur="3.2s" begin="1.1s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" begin="1.1s" repeatCount="indefinite"/>
  </circle>
  </g>
  </g>

  {/* Right-side technical tick stats */}
  <g transform="translate(630,300)"
  fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#A89878" letterSpacing="1.2">
  <line x1="-10" y1="0"  x2="-2" y2="0"  stroke="#A89878" strokeOpacity="0.4"/>
  <text x="0" y="3">4 GRAPHS</text>
  <line x1="-10" y1="22" x2="-2" y2="22" stroke="#A89878" strokeOpacity="0.4"/>
  <text x="0" y="25">5 SCORES</text>
  <line x1="-10" y1="44" x2="-2" y2="44" stroke="#A89878" strokeOpacity="0.4"/>
  <text x="0" y="47">8 OPS</text>
  </g>
  </svg>
  </div>
);

/* ── HERO PYRAMID  -  4-layer annotated illustration ── */
const HeroPyramid = () => (
  <svg viewBox="0 0 720 860" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", overflow: "visible" }}>
  <defs>
  <linearGradient id="hpConeGrad" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%"  stopColor={T.paper}  stopOpacity="0.95" />
  <stop offset="25%"  stopColor={T.brass2} stopOpacity="0.60" />
  <stop offset="60%"  stopColor={T.brass}  stopOpacity="0.22" />
  <stop offset="100%" stopColor={T.brass}  stopOpacity="0"  />
  </linearGradient>
  <radialGradient id="hpCoreGlow" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stopColor={T.paper} stopOpacity="1" />
  <stop offset="40%" stopColor={T.brass2} stopOpacity="0.5" />
  <stop offset="100%" stopColor={T.brass} stopOpacity="0" />
  </radialGradient>
  <filter id="hpSoft" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="3" result="blur" />
  <feMerge>
  <feMergeNode in="blur" />
  <feMergeNode in="SourceGraphic" />
  </feMerge>
  </filter>
  <filter id="hpStrong" x="-100%" y="-100%" width="300%" height="300%">
  <feGaussianBlur stdDeviation="8" result="blur" />
  <feMerge>
  <feMergeNode in="blur" />
  <feMergeNode in="SourceGraphic" />
  </feMerge>
  </filter>
  </defs>

  {/* Ambient halo */}
  <ellipse cx="360" cy="162" rx="190" ry="140" fill="url(#hpCoreGlow)" opacity="0.38" />

  {/* Volumetric light cone  -  brain apex → signals base */}
  <g className="hv2-beam">
  <polygon points="360,162 67,666 653,666"  fill="url(#hpConeGrad)" opacity="0.07" filter="url(#hpStrong)" />
  <polygon points="360,162 160,666 560,666"  fill="url(#hpConeGrad)" opacity="0.12" filter="url(#hpSoft)" />
  <polygon points="360,162 280,666 440,666"  fill="url(#hpConeGrad)" opacity="0.20" />
  <rect x="355" y="162" width="10" height="504" fill="url(#hpConeGrad)" opacity="0.65" />
  </g>

  {/* ── TIER 01  -  CONTEXT BRAIN ── */}
  <text x="360" y="60" textAnchor="middle" fontFamily={T.display} fontSize="30" fontStyle="italic" fontWeight="400" fill={T.paper} letterSpacing="-0.02em">Context Brain</text>
  <text x="360" y="84" textAnchor="middle" fontFamily={T.mono} fontSize="11" fill="#A89878" letterSpacing="0.24em">KNOWS EVERYTHING</text>
  <circle cx="360" cy="162" r="94" fill="url(#hpCoreGlow)" opacity="0.50" />
  <circle className="hv2-scan" cx="360" cy="162" r="70" fill="none" stroke={T.brass2} strokeWidth="1" opacity="0.5" />
  <circle cx="360" cy="162" r="52" fill={T.ink} stroke={T.paper} strokeWidth="1.5" />
  <circle cx="360" cy="162" r="52" fill="none" stroke={T.brass2} strokeOpacity="0.65" strokeWidth="0.9" strokeDasharray="3 5" />
  <g transform="translate(360,162)" fill="none" strokeLinecap="round" strokeLinejoin="round">
  {/* Hemisphere fills  -  very subtle */}
  <path d="M 0,-36 C -10,-38 -24,-34 -32,-22 C -38,-10 -38,4 -34,16 C -30,26 -20,32 -10,34 C -5,35 0,33 0,33 Z"
  fill={T.brass} fillOpacity="0.07" />
  <path d="M 0,-36 C 10,-38 24,-34 32,-22 C 38,-10 38,4 34,16 C 30,26 20,32 10,34 C 5,35 0,33 0,33 Z"
  fill={T.brass} fillOpacity="0.07" />
  {/* Left hemisphere outline */}
  <path d="M 0,-36 C -10,-38 -24,-34 -32,-22 C -38,-10 -38,4 -34,16 C -30,26 -20,32 -10,34 C -5,35 0,33 0,33"
  stroke={T.brass2} strokeWidth="1.4" strokeOpacity="0.8" />
  {/* Right hemisphere outline */}
  <path d="M 0,-36 C 10,-38 24,-34 32,-22 C 38,-10 38,4 34,16 C 30,26 20,32 10,34 C 5,35 0,33 0,33"
  stroke={T.brass2} strokeWidth="1.4" strokeOpacity="0.8" />
  {/* Longitudinal fissure */}
  <line x1="0" y1="-36" x2="0" y2="33" stroke={T.brass2} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="2 5" />
  {/* Left gyri  -  fold curves */}
  <path d="M -8,-28 C -16,-20 -20,-6 -18,8 C -16,18 -10,26 -4,29"
  stroke={T.brass2} strokeWidth="0.9" strokeOpacity="0.5" />
  <path d="M -20,-16 C -28,-8 -28,6 -24,18"
  stroke={T.brass2} strokeWidth="0.8" strokeOpacity="0.38" />
  {/* Right gyri */}
  <path d="M 8,-28 C 16,-20 20,-6 18,8 C 16,18 10,26 4,29"
  stroke={T.brass2} strokeWidth="0.9" strokeOpacity="0.5" />
  <path d="M 20,-16 C 28,-8 28,6 24,18"
  stroke={T.brass2} strokeWidth="0.8" strokeOpacity="0.38" />
  {/* Corpus callosum cross-connects */}
  <path d="M -9,-4 C -4,-1 4,-1 9,-4"  stroke={T.brass2} strokeWidth="0.8" strokeOpacity="0.3" />
  <path d="M -9,8  C -4,5  4,5  9,8"  stroke={T.brass2} strokeWidth="0.8" strokeOpacity="0.3" />
  {/* Neural nodes */}
  <circle cx="-20" cy="-19" r="2"  fill={T.paper}  />
  <circle cx="-30" cy="3"  r="1.7" fill="#D9C5A6"  />
  <circle cx="-16" cy="22"  r="2"  fill={T.paper}  />
  <circle cx="20"  cy="-19" r="2"  fill={T.paper}  />
  <circle cx="30"  cy="3"  r="1.7" fill="#D9C5A6"  />
  <circle cx="16"  cy="22"  r="2"  fill={T.paper}  />
  {/* Central synapse  -  pulsing */}
  <circle r="3.4" fill={T.brass2}>
  <animate attributeName="r" values="2.2;4.2;2.2" dur="1.8s" repeatCount="indefinite" />
  </circle>
  </g>

  {/* ── TIER 02  -  CONTEXT INTELLIGENCE ── */}
  <ellipse cx="360" cy="360" rx="196" ry="37" fill={T.ink} fillOpacity="0.55" stroke={T.brass} strokeOpacity="0.35" strokeWidth="1.2" />
  <ellipse cx="360" cy="360" rx="196" ry="37" fill="none" stroke={T.brass2} strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="2.5 4" />
  <ellipse cx="360" cy="360" rx="148" ry="26" fill="none" stroke={T.brass2} strokeOpacity="0.2" strokeWidth="0.6" strokeDasharray="1.5 3.5" />
  <text x="360" y="313" textAnchor="middle" fontFamily={T.display} fontSize="26" fontStyle="italic" fill={T.paper} fontWeight="300" letterSpacing="-0.01em">Context Intelligence</text>
  <text x="360" y="364" textAnchor="middle" fontFamily={T.mono} fontSize="10" fill="#A89878" letterSpacing="0.2em">HOW THE BRAIN THINKS</text>

  {/* Intelligence right  -  vertical track + bullet callouts */}
  <line x1="556" y1="360" x2="580" y2="360" stroke={T.brass2} strokeWidth="0.6" strokeOpacity="0.35" />
  <line x1="580" y1="304" x2="580" y2="428" stroke="#C04F2E" strokeWidth="0.8" strokeOpacity="0.3" />
  {[
  { label: "HEBBIAN",  sub: "on fire → on wire",  y: 310 },
  { label: "HIPPOCAMPAL", sub: "replay, consolidate", y: 344 },
  { label: "PREDICTIVE",  sub: "minimize surprise",  y: 378 },
  { label: "SALIENCE",  sub: "what matters now",  y: 412 },
  ].map(({ label, sub, y }) => (
  <g key={label}>
  <circle cx="580" cy={y+5} r="2.5" fill="#C04F2E" fillOpacity="0.85" />
  <text x="589" y={y+9}  fontFamily={T.mono} fontSize="10"  fill="#D9C5A6" letterSpacing="0.12em" fontWeight="700">{label}</text>
  <text x="589" y={y+21} fontFamily={T.mono} fontSize="8.5" fill="#5E5649" letterSpacing="0.04em" fontStyle="italic">{sub}</text>
  </g>
  ))}

  {/* ── TIER 03  -  CONTEXT GRAPH ── */}
  <ellipse cx="360" cy="510" rx="238" ry="39" fill={T.ink} fillOpacity="0.5" stroke="#D9C5A6" strokeOpacity="0.25" strokeWidth="1.2" />
  <ellipse cx="360" cy="510" rx="238" ry="39" fill="none" stroke="#D9C5A6" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2.5 4" />
  <ellipse cx="360" cy="510" rx="190" ry="30" fill="none" stroke="#D9C5A6" strokeOpacity="0.18" strokeWidth="0.6" />
  <ellipse cx="360" cy="510" rx="142" ry="22" fill="none" stroke="#D9C5A6" strokeOpacity="0.2"  strokeWidth="0.6" />
  <ellipse cx="360" cy="510" rx="95"  ry="14" fill="none" stroke={T.brass2} strokeOpacity="0.22" strokeWidth="0.5" />
  <ellipse cx="360" cy="510" rx="55"  ry="8"  fill={T.brass} fillOpacity="0.08" stroke={T.brass2} strokeOpacity="0.5" strokeWidth="0.7" />
  <text x="360" y="462" textAnchor="middle" fontFamily={T.display} fontSize="26" fontStyle="italic" fill={T.paper} fontWeight="300" letterSpacing="-0.01em">Context Graph</text>
  <text x="360" y="514" textAnchor="middle" fontFamily={T.mono} fontSize="10" fill="#A89878" letterSpacing="0.2em">FOUR LAYERS OF TRUTH</text>
  <g className="hv2-node" style={{ animationDelay: "0s"  }}><circle cx="129" cy="511" r="2.5" fill={T.paper}  /></g>
  <g className="hv2-node" style={{ animationDelay: ".35s"  }}><circle cx="591" cy="509" r="2.5" fill={T.paper}  /></g>
  <g className="hv2-node" style={{ animationDelay: ".7s"  }}><circle cx="188" cy="498" r="2"  fill="#D9C5A6"  /></g>
  <g className="hv2-node" style={{ animationDelay: "1.05s" }}><circle cx="532" cy="502" r="2"  fill="#D9C5A6"  /></g>
  <g className="hv2-node" style={{ animationDelay: "1.4s"  }}><circle cx="246" cy="492" r="2"  fill={T.brass2} /></g>
  <g className="hv2-node" style={{ animationDelay: "1.75s" }}><circle cx="474" cy="494" r="2"  fill={T.brass2} /></g>

  {/* Graph left  -  vertical track + bullet callouts (mirrored) */}
  <line x1="122" y1="510" x2="98" y2="510" stroke="#D9C5A6" strokeWidth="0.6" strokeOpacity="0.35" />
  <line x1="98" y1="454" x2="98" y2="578" stroke="#D9C5A6" strokeWidth="0.8" strokeOpacity="0.3" />
  {[
  { label: "RELATIONSHIP", sub: "who → who",  y: 460 },
  { label: "AUTHORITY",  sub: "who decides",  y: 494 },
  { label: "STATE",  sub: "true now",  y: 528 },
  { label: "PRECEDENT",  sub: "what happened", y: 562 },
  ].map(({ label, sub, y }) => (
  <g key={label}>
  <circle cx="98" cy={y+5} r="2.5" fill="#A89878" fillOpacity="0.8" />
  <text x="89" y={y+9}  textAnchor="end" fontFamily={T.mono} fontSize="10"  fill="#D9C5A6" letterSpacing="0.1em"  fontWeight="700">{label}</text>
  <text x="89" y={y+21} textAnchor="end" fontFamily={T.mono} fontSize="8.5" fill="#5E5649" letterSpacing="0.04em" fontStyle="italic">{sub}</text>
  </g>
  ))}

  {/* ── TIER 04  -  SIGNALS ── */}
  <ellipse cx="360" cy="666" rx="293" ry="38" fill={T.ink} fillOpacity="0.45" stroke="#D9C5A6" strokeOpacity="0.18" strokeWidth="1.2" />
  <ellipse cx="360" cy="666" rx="293" ry="38" fill="none" stroke="#D9C5A6" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="2.5 4" />
  <text x="360" y="619" textAnchor="middle" fontFamily={T.display} fontSize="26" fontStyle="italic" fill={T.paper} fontWeight="300" letterSpacing="-0.01em">Signals</text>
  <text x="360" y="670" textAnchor="middle" fontFamily={T.mono} fontSize="10" fill="#A89878" letterSpacing="0.2em">EVERY TOOL, ONE CONTEXT</text>

  {/* ── ANIMATED DATA STREAMS  -  particles rising through the cone ── */}
  {[
  { x: 330, dur: "3.0s", begin: "0s",  r: 1.5, color: T.brass  },
  { x: 347, dur: "2.4s", begin: "-0.9s",  r: 2.0, color: T.brass2 },
  { x: 358, dur: "2.8s", begin: "-1.8s",  r: 2.2, color: T.paper  },
  { x: 362, dur: "2.1s", begin: "-0.5s",  r: 2.2, color: T.paper  },
  { x: 373, dur: "3.2s", begin: "-1.4s",  r: 2.0, color: T.brass2 },
  { x: 390, dur: "2.6s", begin: "-2.2s",  r: 1.5, color: T.brass  },
  ].map(({ x, dur, begin, r, color }) => (
  <g key={`stream-${x}`}>
  <line x1={x} y1="170" x2={x} y2="660"
  stroke={color} strokeWidth="0.5" strokeOpacity="0.12"
  strokeDasharray="2 14" />
  <circle cx={x} r={r} fill={color} filter="url(#hpSoft)">
  <animate attributeName="cy"  values="660;170"  dur={dur} begin={begin} repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;0;0.7;1;0.7;0" dur={dur} begin={begin} repeatCount="indefinite" />
  </circle>
  </g>
  ))}

  {/* Ring anchor dots  -  chip attachment points on Signals ellipse bottom arc */}
  {/* cy_anchor = 666 + 38*sqrt(1-((cx-360)/293)2) */}
  <g fill={T.brass2} opacity="0.75">
  <circle cx="80"  cy="677" r="2.5" />
  <circle cx="142" cy="691" r="2.5" />
  <circle cx="204" cy="698" r="2.5" />
  <circle cx="268" cy="702" r="2.5" />
  <circle cx="328" cy="704" r="2.5" />
  <circle cx="392" cy="704" r="2.5" />
  <circle cx="452" cy="702" r="2.5" />
  <circle cx="516" cy="698" r="2.5" />
  <circle cx="578" cy="691" r="2.5" />
  <circle cx="640" cy="677" r="2.5" />
  </g>

  {/* ── 10 ICON CHIPS  -  sitting ON the Signals ellipse bottom arc ── */}
  {/* Each chip center cy = ring_bottom_y + 20 so chip top edge kisses the ring */}
  {/* GMAIL x=80 y=697 */}
  <g transform="translate(80,697)">
  <circle r="20" fill="#F4EEE3" />
  <g transform="translate(-9,-7)">
  <path d="M 0,2.5 Q 0,0 2.5,0 L 3.5,0 L 9,4.8 L 14.5,0 L 15.5,0 Q 18,0 18,2.5 L 18,13 Q 18,15 15.5,15 L 14,15 L 14,6 L 9,10.5 L 4,6 L 4,15 L 2.5,15 Q 0,15 0,13 Z" fill="#EA4335" />
  <path d="M 0,2.5 L 0,13 Q 0,15 2.5,15 L 4,15 L 4,6 Z" fill="#C5221F" />
  <path d="M 14,6 L 14,15 L 15.5,15 Q 18,15 18,13 L 18,2.5 Z" fill="#C5221F" />
  </g>
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">GMAIL</text>
  </g>
  {/* SLACK x=142 y=711 */}
  <g transform="translate(142,711)">
  <circle r="20" fill="#F4EEE3" />
  <rect x="-7" y="-3" width="5" height="5" fill="#36C5F0" /><rect x="-7" y="-9" width="5" height="7" rx="2.5" fill="#36C5F0" />
  <rect x="-3" y="-8" width="5" height="5" fill="#2EB67D" /><rect x="2" y="-8" width="7" height="5" rx="2.5" fill="#2EB67D" />
  <rect x="2" y="-3" width="5" height="5" fill="#ECB22E" /><rect x="2" y="2" width="5" height="7" rx="2.5" fill="#ECB22E" />
  <rect x="-3" y="2" width="5" height="5" fill="#E01E5A" /><rect x="-9" y="2" width="7" height="5" rx="2.5" fill="#E01E5A" />
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">SLACK</text>
  </g>
  {/* NOTION x=204 y=718 */}
  <g transform="translate(204,718)">
  <circle r="20" fill="#F4EEE3" />
  <g stroke="#111" strokeWidth="2.2" fill="none" strokeLinecap="square">
  <line x1="-5.5" y1="-7" x2="-5.5" y2="7" /><line x1="5.5" y1="-7" x2="5.5" y2="7" /><line x1="-5.5" y1="-7" x2="5.5" y2="7" />
  </g>
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">NOTION</text>
  </g>
  {/* DOCS x=268 y=722 */}
  <g transform="translate(268,722)">
  <circle r="20" fill="#F4EEE3" />
  <rect x="-7" y="-8.5" width="13" height="16" rx="1.5" fill="white" stroke="#4285F4" strokeWidth="0.8" />
  <path d="M -4,-8.5 L -4,-3.5 L 2,-3.5" fill="none" stroke="#4285F4" strokeWidth="1.5" strokeLinejoin="round" />
  <path d="M -4,-8.5 L 2,-3.5 L 6,-3.5" fill="#4285F4" fillOpacity="0.15" stroke="none" />
  <line x1="-4" y1="0" x2="4" y2="0" stroke="#4285F4" strokeWidth="1.2" strokeOpacity="0.7" />
  <line x1="-4" y1="3" x2="4" y2="3" stroke="#4285F4" strokeWidth="1.2" strokeOpacity="0.7" />
  <line x1="-4" y1="6" x2="1"  y2="6" stroke="#4285F4" strokeWidth="1.2" strokeOpacity="0.7" />
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">DOCS</text>
  </g>
  {/* CAL x=328 y=724 */}
  <g transform="translate(328,724)">
  <circle r="20" fill="#F4EEE3" />
  <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#fff" stroke="#DADCE0" strokeWidth="0.7" />
  <rect x="-8" y="-8" width="16" height="4.5" fill="#4285F4" />
  <text x="0" y="6" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#1A73E8">31</text>
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">CAL</text>
  </g>
  {/* SHEETS x=392 y=724 */}
  <g transform="translate(392,724)">
  <circle r="20" fill="#F4EEE3" />
  <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#0F9D58" />
  <g stroke="#fff" strokeWidth="0.8" fill="none">
  <line x1="-3" y1="-8" x2="-3" y2="8" /><line x1="3" y1="-8" x2="3" y2="8" />
  <line x1="-8" y1="-3" x2="8" y2="-3" /><line x1="-8" y1="3" x2="8" y2="3" />
  </g>
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">SHEETS</text>
  </g>
  {/* NOTES x=452 y=722 */}
  <g transform="translate(452,722)">
  <circle r="20" fill="#F4EEE3" />
  <rect x="-7" y="-8" width="14" height="16" rx="1.5" fill="#FFD60A" />
  <line x1="-4" y1="-3" x2="4"  y2="-3" stroke="#333" strokeWidth="1.2" />
  <line x1="-4" y1="0"  x2="4"  y2="0"  stroke="#333" strokeWidth="1.2" />
  <line x1="-4" y1="3"  x2="4"  y2="3"  stroke="#333" strokeWidth="1.2" />
  <line x1="-4" y1="6"  x2="1"  y2="6"  stroke="#333" strokeWidth="1.2" />
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">NOTES</text>
  </g>
  {/* HRM x=516 y=718 */}
  <g transform="translate(516,718)">
  <circle r="20" fill="#F4EEE3" />
  <circle cx="-4" cy="-5" r="3.5" fill="#5E6AD2" />
  <circle cx="4"  cy="-5" r="3.5" fill="#5E6AD2" />
  <path d="M -10,7 Q -10,0 -4,0 Q 0,0 0,4 Q 0,0 4,0 Q 10,0 10,7 Z" fill="#5E6AD2" />
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">HRM</text>
  </g>
  {/* CRM x=578 y=711 */}
  <g transform="translate(578,711)">
  <circle r="20" fill="#F4EEE3" />
  <g stroke="#FF7A59" strokeWidth="1.6" fill="none">
  <circle cx="1" cy="0" r="5" />
  <line x1="1" y1="-5" x2="1" y2="-8" />
  </g>
  <circle cx="1" cy="-9.5" r="2" fill="#FF7A59" />
  <circle cx="-5" cy="-1"  r="2" fill="#FF7A59" />
  <line x1="-3.5" y1="0" x2="-0.5" y2="1" stroke="#FF7A59" strokeWidth="1.2" />
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">CRM</text>
  </g>
  {/* VOICE x=640 y=697 */}
  <g transform="translate(640,697)">
  <circle r="20" fill="#F4EEE3" />
  <rect x="-5" y="-9" width="10" height="13" rx="5" fill="#111" />
  <path d="M -7,-1 Q -7,7 0,7 Q 7,7 7,-1" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
  <line x1="0" y1="7" x2="0" y2="10" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
  <line x1="-4" y1="10" x2="4" y2="10" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
  <text y="30" textAnchor="middle" fontFamily={T.mono} fontSize="8.5" fill="#A89878" letterSpacing="0.08em">VOICE</text>
  </g>

  {/* Rising signal pulses: ring chips → brain */}
  <g fill={T.paper} filter="url(#hpSoft)">
  <circle r="2.2">
  <animate attributeName="cx" values="80;360"  dur="3.4s"  repeatCount="indefinite" />
  <animate attributeName="cy" values="697;162" dur="3.4s"  repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;1;1;0" dur="3.4s"  repeatCount="indefinite" />
  </circle>
  <circle r="2.2">
  <animate attributeName="cx" values="360;360" dur="3.4s" begin="-1.1s" repeatCount="indefinite" />
  <animate attributeName="cy" values="724;162" dur="3.4s" begin="-1.1s" repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;1;1;0" dur="3.4s" begin="-1.1s" repeatCount="indefinite" />
  </circle>
  <circle r="2.2">
  <animate attributeName="cx" values="640;360" dur="3.4s" begin="-2.2s" repeatCount="indefinite" />
  <animate attributeName="cy" values="697;162" dur="3.4s" begin="-2.2s" repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;1;1;0" dur="3.4s" begin="-2.2s" repeatCount="indefinite" />
  </circle>
  </g>

  {/* Beam pulses  -  signals → brain */}
  <circle r="3" cx="360" fill={T.paper} filter="url(#hpSoft)">
  <animate attributeName="cy" values="660;162" dur="4.5s" repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" />
  </circle>
  <circle r="2.5" cx="360" fill={T.brass2} filter="url(#hpSoft)">
  <animate attributeName="cy" values="660;162" dur="4.5s" begin="-1.5s" repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" begin="-1.5s" repeatCount="indefinite" />
  </circle>
  <circle r="2.5" cx="360" fill={T.brass} filter="url(#hpSoft)">
  <animate attributeName="cy" values="660;162" dur="4.5s" begin="-3s" repeatCount="indefinite" />
  <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" begin="-3s" repeatCount="indefinite" />
  </circle>
  </svg>
);

const Hero = () => (
  <section
  data-section data-label="§ 00  -  COVER  -  APRIL MMXXVI" data-dark="true"
  className="hero-v2 hero-pad"
  style={{
  minHeight: "calc(100vh - 44px)",
  background: T.navy,
  color: T.paper,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(80px,10vh,120px) clamp(24px,5vw,60px) 44px",
  position: "relative",
  overflow: "hidden",
  }}
  >
  {/* deeper, tighter glow  -  rust centered */}
  <div style={{ position: "absolute", top: "8%", left: "50%", width: "min(800px,94vw)", height: "min(800px,94vw)", transform: "translateX(-50%)", background: "radial-gradient(circle,rgba(215,90,51,0.14) 0%,rgba(215,90,51,0.04) 30%,transparent 60%)", pointerEvents: "none", zIndex: 1, animation: "hv2Glow 6s ease-in-out infinite" }} />
  <div className="hero-v2-grid" />

  <div className="hero-v2-body">
  <div className="hero-v2-text">
  {/* Building with Founders, Inc */}
  <div className="fu d1" style={{ marginBottom: 18 }}>
  <div style={{
  display: "inline-flex", alignItems: "center", gap: 10,
  background: "rgba(242,236,228,0.92)",
  border: "0.5px solid rgba(242,236,228,0.6)",
  borderRadius: 3,
  padding: "8px 16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
  }}>
  <span style={{ fontFamily: T.body, fontSize: 12, fontWeight: 400, letterSpacing: "0.01em", color: "rgba(6,12,17,0.55)" }}>Building with</span>
  <img
  src="/logos/logo-finc.png"
  alt="Founders, Inc"
  style={{ height: 16, width: "auto", filter: "brightness(0) opacity(0.75)" }}
  />
  </div>
  </div>

  <div className="hero-v2-eyebrow fu d1">
  <span className="dot" />
  <span>Context Brain for AI Agents</span>
  </div>

  <h1 className="hero-v2-title fu d2">
  Your agents are <em>capable.</em><br />
  They’re not thinking.
  </h1>

  <p className="hero-v2-lede fu d3">
  <span style={{ opacity: 0.5 }}>Memory tells your agent what happened.</span><br /><b>GeniOS tells it what to do about it.</b>
  </p>

  <div className="hero-v2-ctas fu d4">
  <Btn variant="primary" size="lg" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request Access
  </Btn>
  <Btn variant="ghost" size="lg" dark arrow="down" href="#gap" onClick={(e) => { e.preventDefault(); document.getElementById("gap")?.scrollIntoView({ behavior: "smooth" }); }}>
  See How It Works
  </Btn>
  </div>

  <div className="fu d5 hero-chips" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
  {["Context Graph", "Continuous Reasoning", "Proactive Moves"].map((label) => (
  <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(242,236,228,0.52)", border: "0.5px solid rgba(242,236,228,0.12)", padding: "6px 14px", borderRadius: 2, background: "rgba(6,12,17,0.38)" }}>
  <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.brass, display: "block", flexShrink: 0, boxShadow: `0 0 6px ${T.brass}` }} />
  {label}
  </span>
  ))}
  </div>

  </div>

  {/* Pyramid illustration */}
  <div className="hero-v2-illu fu d3">
  <HeroPyramid />
  </div>
  </div>

  <div style={{ borderTop: `0.5px solid ${T.lineDark}`, marginTop: 0 }}>
  <Page>
  <MetricsBar />
  </Page>
  </div>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  TRUSTED BY  -  builder logos strip
─────────────────────────────────────────────────────────────── */
const TRUSTED_BRANDS = [
  "Google", "IBM", "Gartner", "Hestabit", "Adobe", "Shark Tank India", "Antler", "IIITD",
];

const TrustedBy = () => {
  const items = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS];
  return (
  <div style={{ background: T.paper, borderTop: `0.5px solid ${T.lineStrong}`, borderBottom: `0.5px solid ${T.lineStrong}`, padding: "18px 0" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
  {/* pinned label */}
  <div style={{ flexShrink: 0, padding: "0 28px 0 clamp(20px,4vw,56px)", borderRight: `0.5px solid ${T.lineStrong}`, marginRight: 0 }}>
  <span className="trusted-label" style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 400, letterSpacing: "0.24em", textTransform: "uppercase", color: T.brass, whiteSpace: "nowrap", opacity: 0.72 }}>
  Trusted by builders from
  </span>
  </div>
  {/* marquee */}
  <div className="trusted-wrap" style={{ flex: 1, minWidth: 0 }}>
  <div className="trusted-track">
  {items.map((name, i) => (
  <React.Fragment key={i}>
  <span style={{ fontFamily: T.body, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em", color: T.slate, whiteSpace: "nowrap", padding: "0 clamp(20px,3vw,40px)" }}>
  {name}
  </span>
  <span style={{ display: "block", width: 4, height: 4, borderRadius: "50%", background: T.brass, opacity: 0.28, flexShrink: 0, alignSelf: "center" }} />
  </React.Fragment>
  ))}
  </div>
  </div>
  </div>
  </div>
  );
};

/* ──────────────────────────────────────────────────────────────
  TOP NAV  -  sticky, 5 pages + brand + CTA
─────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { to: "/",  label: "Home", icon: "home" },
  { to: "/thesis",  label: "Thesis" },
  { to: "/insights",  label: "Insights" },
  { to: "/applications",  label: "Applications" },
  { to: "/blogs",  label: "Essays", hideMobile: true },
  { to: "/startup-program", label: "Programs", hidePhone: true },
];

const HomeIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M3 10.5 12 3l9 7.5" />
  <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  </svg>
);

function useNavDocked(threshold = 120) {
  const [docked, setDocked] = useState(false);
  useEffect(() => {
  const onScroll = () => setDocked(window.scrollY > threshold);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return docked;
}

const TopNav = ({ currentPath, progress = 0 }) => {
  const docked = useNavDocked(120);

  const requestClick = (e) => {
  const el = document.getElementById("request");
  if (el) {
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  };
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
  <nav
  className={`tnav${docked ? " tnav-docked" : ""}`}
  style={{
  position: "fixed",
  top: "calc(30px + clamp(6px, 0.8vw, 10px))",
  left: "50%",
  transform: docked
  ? "translateX(-50%) translateY(calc(100vh - 100% - 30px - clamp(6px, 0.8vw, 10px) - clamp(8px, 1vw, 12px)))"
  : "translateX(-50%)",
  transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
  willChange: "transform",
  zIndex: 100,
  background:
  "linear-gradient(160deg, rgba(6,12,17,0.52) 0%, rgba(6,12,17,0.68) 100%)",
  backdropFilter: "blur(32px) saturate(220%) brightness(1.06)",
  WebkitBackdropFilter: "blur(32px) saturate(220%) brightness(1.06)",
  border: `0.5px solid rgba(242,236,228,0.10)`,
  borderRadius: 3,
  boxShadow:
  "0 28px 64px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.32), inset 0 1px 0 rgba(242,236,228,0.14), inset 0 -1px 0 rgba(0,0,0,0.28), inset 1px 0 0 rgba(242,236,228,0.04), inset -1px 0 0 rgba(242,236,228,0.04)",
  width: "min(940px, calc(100vw - 24px))",
  padding: "10px clamp(12px, 1.8vw, 18px) 10px clamp(16px, 2.2vw, 22px)",
  fontFamily: T.mono,
  overflow: "hidden",
  }}
  >
  {/* Scroll progress  -  sits on the top edge of the pill in both states */}
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(242,236,228,0.06)", pointerEvents: "none" }}>
  <div style={{ height: "100%", width: `${progress * 100}%`, background: T.brass, transition: "width 0.08s linear" }} />
  </div>

  <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "clamp(4px, 1.6vw, 16px)",
  }}>
  {/* BRAND */}
  <Link to="/" style={{ display: "flex", alignItems: "baseline", textDecoration: "none" }}>
  <span className="brand-logo" style={{ fontFamily: T.orbit, fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: T.paper, lineHeight: 1 }}>
  Geni<span style={{ color: T.brass }}>OS</span>
  </span>
  </Link>

  {/* LINKS */}
  <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 1.5vw, 18px)" }}>
  {NAV_LINKS.map((l) => {
  const isActive = l.to === "/"
  ? (currentPath === "" || currentPath === "/")
  : currentPath === l.to;
  return (
  <Link
  key={l.to}
  to={l.to}
  aria-label={l.icon === "home" ? "Home" : undefined}
  title={l.icon === "home" ? "Home" : undefined}
  className={`nav-link${isActive ? " nav-link-active" : ""}${l.hideMobile ? " nav-link-hide-mobile" : ""}${l.hidePhone ? " nav-link-hide-phone" : ""}`}
  style={{
  fontFamily: T.body,
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "-0.005em",
  color: isActive ? T.paper : "rgba(242,236,228,0.68)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  }}
  >
  {l.icon === "home" ? <HomeIcon /> : l.label}
  </Link>
  );
  })}
  </div>

  {/* RIGHT CLUSTER  -  CTA + (back-to-top when docked) */}
  <div style={{ display: "flex", alignItems: "center", gap: "clamp(3px, 0.9vw, 10px)" }}>
  {docked && (
  <button
  onClick={backToTop}
  aria-label="Back to top"
  className="tnav-top"
  style={{
  padding: "8px 12px",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(242,236,228,0.62)",
  background: "transparent",
  border: `0.5px solid rgba(242,236,228,0.14)`,
  borderRadius: 2,
  cursor: "pointer",
  transition: "color 0.2s ease, border-color 0.2s ease",
  fontFamily: T.mono,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  lineHeight: 1,
  }}
  >
  <span style={{ fontSize: 13 }}>^</span>
  <span className="tnav-lbl">Top</span>
  </button>
  )}
  <Btn variant="secondary" size="sm" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
  Request access
  </Btn>
  </div>
  </div>
  </nav>
  );
};

/* ──────────────────────────────────────────────────────────────
  01  -  PROBLEM  -  legacy content verbatim
─────────────────────────────────────────────────────────────── */
const PROBLEM_PAINS = [
  { title: "Agents Act Without Context", body: "Every agent starts from zero. No org structure, no approval chains, no awareness of in-flight operations. They fire actions into a void  -  and hope for the best." },
  { title: "Humans Still Babysit Every Decision", body: "Because agents lack org context, humans review, correct and override constantly. The promise of autonomous AI collapses back into a supervised assembly line." },
  { title: "Multi-Agent Systems Conflict", body: "Two agents, no shared context. One approves a payment while another freezes the budget. One follows up while a colleague just emailed the same contact. Chaos at scale." },
];

const Problem = () => (
  <section
  id="problem"
  data-section data-label="§ 01  -  PROBLEM  -  AGENTS READY, ORGS NOT" data-dark="false"
  className="sec-pad"
  style={{ padding: "clamp(60px,7vw,88px) 0", borderBottom: `0.5px solid ${T.lineStrong}`, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 52px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  The Problem
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(36px,5vw,68px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 22 }}>
  AI agents are ready.<br />
  Organizations are <em className="em-wonk" style={{ color: T.brass }}>not.</em>
  </h2>
  <p style={{ fontSize: "clamp(16px,1.45vw,18px)", color: T.ink3, lineHeight: 1.6, fontWeight: 300 }}>
  The bottleneck in agentic AI is not model intelligence. It is the structural absence of organizational context. Agents cannot act correctly on what they cannot see.
  </p>
  </div>

  <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: T.lineStrong, border: `0.5px solid ${T.lineStrong}` }}>
  {PROBLEM_PAINS.map((p, i) => (
  <div key={i} style={{ background: T.paper, padding: "40px 32px", position: "relative" }}>
  <div style={{ fontFamily: T.display, fontSize: 44, fontWeight: 300, color: MUTED_RED, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 22, fontVariationSettings: "'opsz' 144, 'SOFT' 20", opacity: 0.7 }}>
  {String(i + 1).padStart(2, "0")}
  </div>
  <h3 style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em", color: T.ink, marginBottom: 14, lineHeight: 1.25, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {p.title}
  </h3>
  <p style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>{p.body}</p>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  01.5  -  THE INVISIBLE LAYER  -  memory-vs-context comparison
  (ported verbatim from legacy GeniOS.jsx GapExample)
─────────────────────────────────────────────────────────────── */
const MEM_ROWS = [
  { ok: true,  t: "Here’s the thread" },
  { ok: true,  t: "Here’s the contact" },
  { ok: true,  t: "Here’s the timestamp" },
  { ok: false, t: "Is this the right moment to follow up?" },
  { ok: false, t: "Has someone else already reached out?" },
  { ok: false, t: "Does org policy allow this action right now?" },
];
const CTX_ROWS = [
  "Relationship is warm. Last contact: 8 days ago",
  "Open commitment from their side  -  overdue by 6 days",
  "No deal freeze on this account",
  "Colleague emailed same contact 2 days ago  -  hold",
  "Best conversion window: Tuesday outreach",
  "Escalation requires manager sign-off first",
];
const CTX_MOVE = "Move delivered: Hold outreach. Schedule for Tuesday. Tag manager for sign-off.";
const MUTED_RED = "#9C4A3E";


const InvisibleLayer = () => (
  <section
  id="gap"
  data-section data-label="§  -  THE INVISIBLE LAYER  -  THE GAP"
  data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper, position: "relative" }}
  >
  <Page>
  {/* Header block, centered */}
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 52px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  The Invisible Layer
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(36px,5vw,68px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "’opsz’ 144, ‘SOFT’ 30", marginBottom: 22 }}>
  The problem isn’t recall.<br />
  It’s <em className="em-wonk" style={{ color: T.brass }}>reasoning.</em>
  </h2>
  <p style={{ fontSize: "clamp(16px,1.45vw,18px)", color: T.ink3, maxWidth: 720, margin: "0 auto", lineHeight: 1.6, fontWeight: 300 }}>
  Every memory tool on the market solves retrieval. None of them solve what comes after  -  <em style={{ fontFamily: T.serif, fontStyle: "italic" }}>what should the agent actually do?</em> That’s the gap GeniOS was built to close.
  </p>
  </div>

  {/* Two-column comparison */}
  <div className="g2 gap-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `0.5px solid ${T.lineStrong}`, marginBottom: 0 }}>
  {/* LEFT  -  Memory Layer  -  Today */}
  <div style={{ padding: "clamp(28px,3.6vw,44px) clamp(24px,3.2vw,40px)", borderRight: `0.5px solid ${T.line}`, background: "rgba(10,9,8,0.02)" }}>
  <div style={{ marginBottom: 22 }}>
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone, background: "rgba(10,9,8,0.04)", border: `0.5px solid ${T.line}`, padding: "5px 12px", borderRadius: 100 }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.stone, display: "block" }} />
  Memory Layer  -  Today
  </span>
  </div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(17px,1.9vw,22px)", fontWeight: 500, letterSpacing: "-0.018em", lineHeight: 1.3, color: T.ink3, marginBottom: 28, fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
  "Who did you last email?"
  </p>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone, marginBottom: 16 }}>
  What memory gives you:
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
  {MEM_ROWS.map((r, i) => (
  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, lineHeight: 1.55, color: r.ok ? T.ink2 : MUTED_RED, opacity: r.ok ? 1 : 0.85 }}>
  <span style={{ fontFamily: T.mono, fontSize: 12, color: r.ok ? T.stone : MUTED_RED, flexShrink: 0, marginTop: 1 }}>{r.ok ? "✓" : "✕"}</span>
  {r.t}
  </div>
  ))}
  </div>
  <div style={{ padding: "14px 18px", background: "rgba(156,74,62,0.06)", border: `0.5px solid rgba(156,74,62,0.28)`, fontSize: 13, lineHeight: 1.6, color: MUTED_RED }}>
  Retrieval without judgment. The agent still guesses.
  </div>
  </div>

  {/* RIGHT  -  Context Brain  -  GeniOS */}
  <div style={{ padding: "clamp(28px,3.6vw,44px) clamp(24px,3.2vw,40px)", background: "rgba(176,137,70,0.04)", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ marginBottom: 22 }}>
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.brass, background: "rgba(176,137,70,0.1)", border: `0.5px solid ${T.brass}`, padding: "5px 12px", borderRadius: 100 }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.brass, display: "block" }} />
  Context Brain  -  GeniOS
  </span>
  </div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(17px,1.9vw,22px)", fontWeight: 500, letterSpacing: "-0.018em", lineHeight: 1.3, color: T.ink, marginBottom: 28, fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
  "Here’s what your agent should do next  -  and why."
  </p>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone, marginBottom: 16 }}>
  What GeniOS gives you:
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
  {CTX_ROWS.map((t, i) => (
  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, lineHeight: 1.55, color: T.ink2 }}>
  <span style={{ fontFamily: T.mono, fontSize: 12, color: T.brass, flexShrink: 0, marginTop: 1 }}>✓</span>
  {t}
  </div>
  ))}
  </div>
  <div style={{ padding: "14px 18px", background: "rgba(176,137,70,0.08)", border: `0.5px solid rgba(176,137,70,0.32)`, fontSize: 13, lineHeight: 1.6, color: T.brassDeep, marginBottom: 10 }}>
  The agent doesn’t retrieve and guess. It receives a reasoned move.
  </div>
  </div>
  </div>

  {/* Compact summary strip */}
  <div style={{ border: `0.5px solid ${T.lineStrong}`, borderTop: `1px solid ${T.brass}`, padding: "18px clamp(24px,3.2vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
  <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: T.stone, margin: 0 }}>
  Storage is 20% of the problem.
  </p>
  <p style={{ fontFamily: T.serif, fontSize: 14, fontStyle: "italic", color: T.ink2, margin: 0, lineHeight: 1.5 }}>
  The other 80% is knowing what the stored information <em style={{ color: T.brass, fontStyle: "normal" }}>means</em>  -  and what to do with it. That is what the GeniOS Context Brain Memory Layer does.
  </p>
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  WHY EVERYTHING FAILS  -  objection-killer section
─────────────────────────────────────────────────────────────── */
const WHY_FAILS_ROWS = [
  {
  no: "01",
  tool: "Prompt Engineering",
  does: "Sets agent rules, persona, and context at startup",
  breaks: "Static at design time. A colleague reaches the same contact. Authority shifts. A deal moves. Your prompt knows none of it  -  and your agent acts anyway.",
  fix: "Context ≠ instructions.",
  demands: "Self-updating context, not static prompts.",
  },
  {
  no: "02",
  tool: "Orchestrators",
  does: "Sequences agent tasks, manages workflow and execution order",
  breaks: "Manages execution state  -  not organizational state. Knows Agent A completed Task B. Has no model of what’s actually true in your org right now.",
  fix: "Execution ≠ organizational awareness.",
  demands: "Org-awareness as a layer beneath execution.",
  },
  {
  no: "03",
  tool: "Memory APIs",
  does: "Stores what happened and surfaces relevant facts when queried - Supermemory, Mem0, and others make this fast to integrate",
  breaks: "Returns facts. Does not reason over them. 'Last email: 8 days ago, 40% reply rate' - cannot tell you their company announced layoffs yesterday and now is the worst possible moment.",
  fix: "Memory ≠ reasoning.",
  demands: "Reasoning over facts, not just retrieval.",
  },
  {
  no: "04",
  tool: "OSS Memory Layers",
  does: "Mem0, Zep, Graphiti, Letta, Cognee - entity graphs, temporal reasoning, works beautifully in controlled demos",
  breaks: "Production is not a demo. Multi-tenant isolation breaks, entity resolution fails at scale, memory goes stale with no detection. Built for one user in dev. Not for twelve customers in prod.",
  fix: "Demo-ready ≠ production-grade.",
  demands: "Production-grade from day one.",
  },
  {
  no: "05",
  tool: "In-house RAG",
  does: "Retrieves semantically relevant docs from your knowledge base - even with daily ingestion and fresh vectors",
  breaks: "RAG retrieves what looks similar - not what’s currently true. Stale chunks are indistinguishable from fresh ones. Your agent gets high confidence in outdated information.",
  fix: "Retrieval ≠ truth.",
  demands: "Tracks current truth, not semantic similarity.",
  },
  {
  no: "06",
  tool: "Build It Ourselves",
  does: "Full control - no vendor dependency, tailored exactly to your data and workflows",
  breaks: "Not architecturally complex - operationally brutal. Gmail connector, signal decay, entity resolution, authority graph. Each sounds like a sprint. Together they are a product someone has to own forever.",
  fix: "Ownership ≠ leverage.",
  demands: "Infrastructure that compounds across customers.",
  },
];


const WhyEverythingFails = () => (
  <section
  id="why-fails"
  data-section data-label="§  -  WHY EVERYTHING FAILS" data-dark="true"
  style={{ padding: "clamp(60px,7vw,88px) 0 clamp(28px,3.5vw,40px)", background: T.paper, color: T.ink, borderBottom: `0.5px solid ${T.line}`, position: "relative" }}
  >
  <Page>
  {/* Header */}
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 52px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  Why Everything You’re Already Using Fails
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.8vw,64px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "’opsz’ 144, ‘SOFT’ 30", marginBottom: 22 }}>
  You’ve already tried to solve this.<br /><em className="em-wonk" style={{ color: T.brass }}>Here’s why it didn’t work.</em>
  </h2>
  <p style={{ fontSize: "clamp(16px,1.4vw,18px)", color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>
  Prompt engineering. Orchestrators. Memory tools. Each moves the problem forward slightly  -  and leaves the hard part exactly where it was.
  </p>
  </div>

  {/* Comparison table  -  one row per alternative */}
  <div style={{ border: `1px solid ${T.line}`, borderRadius: 8, overflow: "auto", WebkitOverflowScrolling: "touch" }}>
  <div className="alt-table-inner">

  {/* Header */}
  <div style={{ display: "grid", gridTemplateColumns: "1.1fr 2fr 2fr 2fr", background: T.paper2, borderBottom: `1px solid ${T.line}` }}>
  <div style={{ padding: "11px 20px", fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone }}>Alternative</div>
  <div style={{ padding: "11px 20px", fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5C8A5C", borderLeft: `1px solid ${T.line}` }}>✓ What it does</div>
  <div style={{ padding: "11px 20px", fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C4A3E", borderLeft: `1px solid ${T.line}` }}>✗ Where it breaks</div>
  <div style={{ padding: "11px 20px", fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, borderLeft: `1px solid ${T.lineDark}`, background: T.navy, borderTop: "2px solid rgba(215,90,51,0.45)" }}>→ GeniOS instead</div>
  </div>

  {/* Rows */}
  {WHY_FAILS_ROWS.map((r, i) => {
  const isLast = i === WHY_FAILS_ROWS.length - 1;
  return (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.1fr 2fr 2fr 2fr", borderBottom: isLast ? "none" : `1px solid ${T.line}` }}>
  {/* Tool */}
  <div style={{ padding: "20px", borderRight: `1px solid ${T.line}`, background: i % 2 === 0 ? "#fff" : T.paper2, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.brass, opacity: 0.7, letterSpacing: "0.15em" }}>{r.no}</span>
  <span style={{ fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.2, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{r.tool}</span>
  <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.1em", color: T.brass, background: "rgba(176,137,70,0.08)", border: "1px solid rgba(176,137,70,0.25)", padding: "2px 8px", borderRadius: 100, alignSelf: "flex-start" }}>{r.fix}</span>
  </div>
  {/* Does */}
  <div style={{ padding: "20px", borderRight: `1px solid ${T.line}`, background: i % 2 === 0 ? "#fff" : T.paper2, display: "flex", alignItems: "center" }}>
  <p style={{ fontSize: 13, lineHeight: 1.6, color: T.ink2, margin: 0, fontWeight: 300 }}>{r.does}</p>
  </div>
  {/* Breaks */}
  <div style={{ padding: "20px", borderRight: `1px solid ${T.lineDark}`, background: i % 2 === 0 ? "rgba(156,74,62,0.025)" : "rgba(156,74,62,0.05)", display: "flex", alignItems: "center" }}>
  <p style={{ fontSize: 13, lineHeight: 1.6, color: T.ink2, margin: 0, fontWeight: 300 }}>{r.breaks}</p>
  </div>
  {/* GeniOS */}
  <div style={{ padding: "20px", background: "rgba(10,18,35,0.96)", display: "flex", alignItems: "center" }}>
  <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(242,236,228,0.82)", margin: 0, fontWeight: 300 }}>{r.demands}</p>
  </div>
  </div>
  );
  })}
  </div>{/* alt-table-inner */}
  </div>

  {/* Closing line */}
  <div style={{
  marginTop: 32,
  padding: "20px 48px",
  background: "linear-gradient(135deg, #060c11 0%, #0a141e 100%)",
  borderRadius: 8,
  border: "1px solid rgba(215,90,51,0.14)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 14,
  }}>
  <div style={{ width: 40, height: 1.5, background: T.brass, borderRadius: 2, opacity: 0.85 }} />
  <p style={{
  fontFamily: T.display,
  fontSize: "clamp(22px,2.6vw,32px)",
  fontWeight: 400,
  lineHeight: 1.3,
  color: T.paper,
  margin: 0,
  fontVariationSettings: "'opsz' 144, 'SOFT' 30",
  maxWidth: 540,
  letterSpacing: "-0.01em",
  }}>
  One layer that satisfies all six.{" "}
  <em className="em-wonk" style={{ color: T.brass }}>That’s GeniOS.</em>
  </p>
  <p style={{
  fontFamily: T.body,
  fontSize: "clamp(12px,1.1vw,13.5px)",
  fontWeight: 400,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(242,236,228,0.35)",
  margin: 0,
  }}>
  One OS. Six pillars. Zero compromise.
  </p>
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  WHY GENIOS  -  bridge section: painkiller answer
─────────────────────────────────────────────────────────────── */
const WHY_BRIDGE = [
  {
  without: "Agent queries memory → gets facts → guesses the move",
  with:  "Agent receives the move + the reasoning behind it",
  },
  {
  without: "Org context lives in prompts, stale by Week 2",
  with:  "Org context updates continuously  -  always current",
  },
  {
  without: "Every tool retrieves. Nobody decides.",
  with:  "GeniOS decides. Your agents execute.",
  },
];

const WhyGeniOS = () => (
  <section
  id="why-genios"
  data-section data-label="§  -  WHY GENIOS" data-dark="false"
  style={{ background: T.paper, padding: "clamp(40px,5vw,56px) 0", borderBottom: `0.5px solid ${T.line}` }}
  >
  <Page>
  {/* Header */}
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 52px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  So why GeniOS
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.8vw,64px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "’opsz’ 144, ‘SOFT’ 30", marginBottom: 22 }}>
  You don’t replace your stack.<br />
  <em className="em-wonk" style={{ color: T.brass }}>You finally give it a brain.</em>
  </h2>
  <p style={{ fontSize: "clamp(16px,1.45vw,18px)", color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>
  Your memory tool still runs. Your RAG still runs. Your orchestrator still runs. The GeniOS Context Brain sits above all of it  -  reads every signal, reasons over what it means right now, and tells your agent the move. One Context Layer. The one that was always missing.
  </p>
  </div>

  {/* Before / After table */}
  <div className="bridge-table" style={{ border: `1px solid ${T.lineStrong}`, borderRadius: 6, overflow: "hidden", maxWidth: 900, margin: "0 auto 56px" }}>
  {/* Header row */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: T.paper2, borderBottom: `1px solid ${T.lineStrong}` }}>
  <div style={{ padding: "12px 28px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, borderRight: `1px solid ${T.lineStrong}` }}>Without GeniOS</div>
  <div style={{ padding: "12px 28px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, borderLeft: "2px solid rgba(215,90,51,0.38)", borderTop: "2px solid rgba(215,90,51,0.38)" }}>With GeniOS →</div>
  </div>
  {/* Rows */}
  {WHY_BRIDGE.map((r, i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < WHY_BRIDGE.length - 1 ? `1px solid ${T.line}` : "none" }}>
  <div style={{ padding: "22px 28px", borderRight: `1px solid ${T.line}`, background: "#fff", display: "flex", alignItems: "center", gap: 14 }}>
  <span style={{ color: "#B85040", fontFamily: T.mono, fontSize: 14, flexShrink: 0 }}>✗</span>
  <span style={{ fontFamily: T.serif, fontSize: 14.5, color: T.stone, lineHeight: 1.55, fontStyle: "italic" }}>{r.without}</span>
  </div>
  <div style={{ padding: "22px 28px", background: "rgba(215,90,51,0.04)", display: "flex", alignItems: "center", gap: 14, borderLeft: "2px solid rgba(215,90,51,0.15)" }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 14, flexShrink: 0 }}>✓</span>
  <span style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink, lineHeight: 1.55, fontStyle: "italic" }}>{r.with}</span>
  </div>
  </div>
  ))}
  </div>

  {/* Painkiller statement */}
  <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
  <p style={{ fontFamily: T.display, fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.02em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 10 }}>
  Every tool you tried solves part of the problem.<br />
  <em className="em-wonk" style={{ color: T.brass }}>None of them were built to decide.</em>
  </p>
  <div style={{ width: 32, height: 1, background: T.brass, margin: "14px auto 16px", opacity: 0.45 }} />
  <p style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: T.stone }}>
  GeniOS is the Context Brain. Not another retrieval tool.
  </p>
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  02  -  SOLUTION  -  legacy content: 4-graph Context Brain
─────────────────────────────────────────────────────────────── */
const SOLUTION_GRAPHS = [
  { label: "Relationship Graph", eg: "Sarah is warm, last contacted 12 days ago" },
  { label: "Authority Graph",  eg: "Approval needed above $10K from CFO" },
  { label: "State Graph",  eg: "Budget freeze active, started Nov 1" },
  { label: "Precedent Graph",  eg: "Similar action failed last month  -  see why" },
];
const SOLUTION_BULLETS = [
  "Continuous reasoning  -  not on-demand retrieval",
  "Proactive push  -  agents receive moves, not just facts",
  "Compounds over time  -  every correction sharpens the next recommendation",
];
const SECTION_A_BRIDGE = "The graph feeds Context Intelligence  -  which watches it continuously and acts.";
const SECTION_B_BULLETS = [
  "Continuous reasoning  -  not on-demand retrieval",
  "Proactive push  -  agents receive moves, not just facts",
  "Compounds over time  -  every correction sharpens the next recommendation",
];

const Solution = () => {
  const cx = 250, cy = 200, R = 145;
  const toRad = d => d * Math.PI / 180;
  const pt = (deg, r = R) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];

  // Annular sector path (donut slice)
  const sector = (ox, oy, r1, r2, a1, a2) => {
  const [x1o, y1o] = [ox + r2 * Math.cos(toRad(a1)), oy + r2 * Math.sin(toRad(a1))];
  const [x2o, y2o] = [ox + r2 * Math.cos(toRad(a2)), oy + r2 * Math.sin(toRad(a2))];
  const [x1i, y1i] = [ox + r1 * Math.cos(toRad(a2)), oy + r1 * Math.sin(toRad(a2))];
  const [x2i, y2i] = [ox + r1 * Math.cos(toRad(a1)), oy + r1 * Math.sin(toRad(a1))];
  const lg = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `M ${x1o} ${y1o} A ${r2} ${r2} 0 ${lg} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${r1} ${r1} 0 ${lg} 0 ${x2i} ${y2i} Z`;
  };

  const arcOnly = (ox, oy, r, a1, a2) => {
  const x1 = ox + r * Math.cos(toRad(a1)), y1 = oy + r * Math.sin(toRad(a1));
  const x2 = ox + r * Math.cos(toRad(a2)), y2 = oy + r * Math.sin(toRad(a2));
  const lg = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2}`;
  };

  // 4 graphs at diagonal positions  -  fans fill the cardinal directions
  const nodes = [
  { angle: -45,  lines: ["Relationship", "Graph"], eg: "Who to contact & how"  },
  { angle:  45,  lines: ["Authority",  "Graph"], eg: "Who owns decisions"  },
  { angle: 135,  lines: ["State",  "Graph"], eg: "What’s active right now" },
  { angle: 225,  lines: ["Precedent",  "Graph"], eg: "What worked before"  },
  ];

  return (
  <section
  id="solution"
  data-section data-label="§ 02  -  SOLUTION  -  THE CONTEXT BRAIN" data-dark="true"
  style={{ padding: "clamp(60px,7vw,88px) 0 clamp(60px,7vw,88px)", background: T.navy, color: T.paper, borderBottom: `0.5px solid ${T.lineDark}`, position: "relative", overflow: "hidden" }}
  >
  <Page>
  {/* Section heading */}
  <div style={{ textAlign: "center", marginBottom: 48 }}>
  <SectionLabel accent={T.brass2}>The Solution</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.8vw,64px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: "0 auto", maxWidth: 720 }}>
  GeniOS is not a memory layer.<br />
  <em className="em-wonk" style={{ color: T.brass }}>It’s a reasoning layer.</em>
  </h2>
  </div>

  {/* 3-col: left | radial | right */}
  <div className="sol-radial-grid" style={{ display: "grid", gridTemplateColumns: "1fr 500px 1fr", alignItems: "center", gap: 0, marginBottom: 64 }}>

  {/* LEFT text */}
  <div style={{ paddingRight: 40, position: "relative", zIndex: 2 }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 14 }}>Section A  -  Context Graph</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(18px,1.9vw,24px)", fontWeight: 400, lineHeight: 1.32, color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 16 }}>
  Your org’s ground truth  -  always current, never stale.
  </p>
  <p style={{ fontSize: 14, lineHeight: 1.75, color: T.sand, fontWeight: 300, marginBottom: 28 }}>
  Relationship, Authority, State, and Precedent  -  built continuously from real signals. Who owns what. What changed. What matters right now.
  </p>
  <div style={{ display: "flex", gap: 10, fontSize: 13, color: T.sand, alignItems: "flex-start", fontWeight: 300, borderTop: `0.5px solid ${T.lineDark}`, paddingTop: 16 }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 10, marginTop: 2, flexShrink: 0 }}>→</span>
  <span style={{ fontStyle: "italic" }}>{SECTION_A_BRIDGE}</span>
  </div>
  </div>

  {/* CENTER  -  radial SVG */}
  <div style={{ position: "relative", zIndex: 2 }}>
  <svg
  viewBox="0 0 500 400"
  style={{ width: "100%", height: "auto", overflow: "visible" }}
  >
  <defs>
  <radialGradient id="solGlow" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stopColor={T.brass} stopOpacity="0.28" />
  <stop offset="100%" stopColor={T.brass} stopOpacity="0" />
  </radialGradient>
  <radialGradient id="solOrb" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stopColor="#E8805C" />
  <stop offset="100%" stopColor="#A8431F" />
  </radialGradient>
  </defs>

  {/* ── LEFT FAN (spokes 150 degrees-210 degrees) ── */}
  <path d={sector(cx, cy, 56, 520, 148, 212)} fill={T.brass} fillOpacity="0.05" />
  {[180, 260, 340, 420, 490].map((r, i) => (
  <path key={i} d={arcOnly(cx, cy, r, 150, 210)} fill="none" stroke={T.brass} strokeWidth="0.6" strokeOpacity={0.13 - i * 0.02} />
  ))}

  {/* ── RIGHT FAN (spokes -30 degrees-30 degrees) ── */}
  <path d={sector(cx, cy, 56, 520, -32, 32)} fill={T.brass} fillOpacity="0.05" />
  {[180, 260, 340, 420, 490].map((r, i) => (
  <path key={i} d={arcOnly(cx, cy, r, -30, 30)} fill="none" stroke={T.brass} strokeWidth="0.6" strokeOpacity={0.13 - i * 0.02} />
  ))}

  {/* Outer ring */}
  <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.brass} strokeWidth="0.6" strokeOpacity="0.18" />

  {/* Glow halo */}
  <circle cx={cx} cy={cy} r="96" fill="url(#solGlow)" />

  {/* Spoke lines */}
  {nodes.map((n, i) => {
  const [x, y] = pt(n.angle);
  return (
  <line key={i} x1={cx} y1={cy} x2={x} y2={y}
  stroke={T.brass} strokeWidth="1" strokeOpacity="0.38" strokeDasharray="3 5" />
  );
  })}

  {/* Center orb */}
  <circle cx={cx} cy={cy} r="60" fill="none" stroke={T.brass} strokeWidth="1" strokeOpacity="0.3" />
  <circle cx={cx} cy={cy} r="48" fill="rgba(215,90,51,0.12)" />
  <circle cx={cx} cy={cy} r="36" fill="url(#solOrb)" />
  <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="13" fill={T.paper} fontWeight="600">{"<>"}</text>
  <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="7.5" fill={T.paper} fillOpacity="0.9" letterSpacing="0.12em">CONTEXT</text>
  <text x={cx} y={cy + 21} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="7.5" fill={T.paper} fillOpacity="0.9" letterSpacing="0.12em">BRAIN</text>

  {/* Node dots + labels */}
  {nodes.map((n, i) => {
  const [x, y] = pt(n.angle);
  const [lx, ly] = pt(n.angle, R + 28);
  const anchor = x < cx - 12 ? "end" : x > cx + 12 ? "start" : "middle";
  const lineH = 13;
  const totalLines = n.lines.length;
  const baseY = ly - ((totalLines - 1) * lineH) / 2 - 7;
  return (
  <g key={i}>
  <circle cx={x} cy={y} r="11" fill="none" stroke={T.brass} strokeWidth="0.7" strokeOpacity="0.28" />
  <circle cx={x} cy={y} r="5.5" fill={T.brass} fillOpacity="0.88" />
  {/* Node name */}
  {n.lines.map((line, li) => (
  <text key={li} x={lx} y={baseY + li * lineH}
  dominantBaseline="middle"
  textAnchor={anchor}
  fontFamily="'IBM Plex Sans',sans-serif"
  fontSize="11.5"
  fontWeight="500"
  fill={T.paper}
  fillOpacity="0.88"
  >{line}</text>
  ))}
  {/* Concrete example  -  the "aha" line */}
  <text
  x={lx}
  y={baseY + totalLines * lineH + 3}
  dominantBaseline="middle"
  textAnchor={anchor}
  fontFamily="'IBM Plex Serif',serif"
  fontSize="10"
  fontStyle="italic"
  fill={T.brass}
  fillOpacity="0.7"
  >{n.eg}</text>
  </g>
  );
  })}
  </svg>
  </div>

  {/* RIGHT text */}
  <div style={{ paddingLeft: 40, position: "relative", zIndex: 2 }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 14 }}>Section B  -  Context Intelligence</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(18px,1.9vw,24px)", fontWeight: 400, lineHeight: 1.32, color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 16 }}>
  Your agents get the decision  -  not raw data to guess from.
  </p>
  <p style={{ fontSize: 14, lineHeight: 1.75, color: T.sand, fontWeight: 300, marginBottom: 28 }}>
  GeniOS watches your context graph continuously, reasons over changes as they happen, and pushes the right decision to the right agent  -  at the right moment.
  </p>
  {[
  "Compounds over time  -  every correction sharpens the next recommendation",
  "Proactive push  -  agents receive moves, not just facts",
  ].map((b, i) => (
  <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: T.sand, alignItems: "flex-start", marginBottom: 10, fontWeight: 300 }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 10, marginTop: 2, flexShrink: 0 }}>→</span>
  {b}
  </div>
  ))}
  </div>
  </div>

  </Page>
  </section>
  );
};

/* ──────────────────────────────────────────────────────────────
  03  -  FOUR GRAPHS
─────────────────────────────────────────────────────────────── */
const GraphCard = ({ no, name, italic, q, body, diagram, badge, fig }) => (
  <div className="card" style={{ padding: 32 }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>{no}</div>
  {badge && <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: T.brass, background: "rgba(176,137,70,0.08)", border: `0.5px solid ${T.brass}`, padding: "4px 10px", borderRadius: 100 }}>{badge}</span>}
  </div>
  <div style={{ fontFamily: T.display, fontSize: 32, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.025em", marginBottom: 14, color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {name} <em className="em-wonk" style={{ color: T.brass }}>{italic}</em>
  </div>
  <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.ink3, marginBottom: 18, borderLeft: `2px solid ${T.brass}`, paddingLeft: 12 }}>{q}</div>
  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.slate, marginBottom: 22 }}>{body}</p>
  {diagram}
  {fig && (
  <div style={{ marginTop: 12, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>
  {fig}
  </div>
  )}
  </div>
);

const FourGraphs = () => (
  <section
  id="graphs"
  data-section data-label="§ 03  -  CONTEXT GRAPH  -  FOUR DIMENSIONS" data-dark="false"
  className="sec-pad"
  style={{ padding: "clamp(60px,7vw,88px) 0", borderBottom: `0.5px solid ${T.lineStrong}`, background: T.paper2, position: "relative" }}
  >
  <Page>
  <SectionLabel>03.1  -  The Four Graphs</SectionLabel>
  <H2>
  Four dimensions of org truth.<br /><em className="em-wonk" style={{ color: T.brass }}>One reasoning engine on top.</em>
  </H2>
  <Kicker dropCap>
  GeniOS doesn’t flatten your organization into a search index. It models it across four structurally different types of reality  -  because the reasoning that matters is different in each one.
  </Kicker>

  <div className="g2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginTop: 56 }}>
  <GraphCard
  no="Graph  -  01"
  name="Relationship"
  italic="graph"
  q='"Who knows who. Interaction history. Sentiment drift. Open commitments."'
  body="Relationship health scores that decay in real time. What it enables: agents that know when to reach out, when to hold, and when to escalate."
  fig="Fig. 01  -  Strength decays without reinforcement"
  diagram={
  <svg viewBox="0 0 400 120" style={{ width: "100%" }}>
  <circle cx="60" cy="60" r="11" fill={T.brass} />
  <text x="60" y="90" textAnchor="middle" fill={T.ink2} fontFamily={T.mono} fontSize="10">Jordan</text>
  <line x1="75" y1="60" x2="185" y2="60" stroke={T.ink3} strokeWidth="1.5" />
  <text x="130" y="52" textAnchor="middle" fill={T.ink3} fontFamily={T.mono} fontSize="9">strength 0.8</text>
  <text x="130" y="78" textAnchor="middle" fill={T.stone} fontFamily={T.mono} fontSize="9">decay -0.05/wk</text>
  <circle cx="200" cy="60" r="11" fill={T.brass} />
  <text x="200" y="90" textAnchor="middle" fill={T.ink2} fontFamily={T.mono} fontSize="10">Priya</text>
  <line x1="215" y1="60" x2="325" y2="60" stroke={T.ink4} strokeWidth="0.8" strokeDasharray="3 3" />
  <text x="270" y="52" textAnchor="middle" fill={T.stone} fontFamily={T.mono} fontSize="9">strength 0.3</text>
  <circle cx="340" cy="60" r="11" fill={T.ink4} />
  <text x="340" y="90" textAnchor="middle" fill={T.ink3} fontFamily={T.mono} fontSize="10">Kiran</text>
  </svg>
  }
  />

  <GraphCard
  no="Graph  -  02"
  name="Authority"
  italic="graph"
  q='"Who can approve what. Spending thresholds. Policy constraints. Escalation chains."'
  body="What it enables: agents that never take an action they’re not authorized to take."
  fig="Fig. 02  -  Inferred from signatures, titles, calendar patterns"
  diagram={
  <svg viewBox="0 0 400 120" style={{ width: "100%" }}>
  <rect x="160" y="8" width="80" height="24" fill="none" stroke={T.brass} strokeWidth="1" />
  <text x="200" y="24" textAnchor="middle" fill={T.ink} fontFamily={T.mono} fontSize="10">CRO</text>
  <line x1="200" y1="32" x2="110" y2="50" stroke={T.ink3} strokeWidth="1" />
  <line x1="200" y1="32" x2="290" y2="50" stroke={T.ink3} strokeWidth="1" />
  <rect x="70" y="50" width="80" height="22" fill="none" stroke={T.ink3} strokeWidth="1" />
  <text x="110" y="65" textAnchor="middle" fill={T.ink} fontFamily={T.mono} fontSize="10">VP Sales</text>
  <rect x="250" y="50" width="80" height="22" fill="none" stroke={T.ink3} strokeWidth="1" />
  <text x="290" y="65" textAnchor="middle" fill={T.ink} fontFamily={T.mono} fontSize="10">VP CS</text>
  <line x1="110" y1="72" x2="70" y2="95" stroke={T.ink3} strokeWidth="0.8" />
  <line x1="110" y1="72" x2="150" y2="95" stroke={T.ink3} strokeWidth="0.8" />
  <line x1="290" y1="72" x2="290" y2="95" stroke={T.ink3} strokeWidth="0.8" />
  <text x="70" y="108" textAnchor="middle" fill={T.stone} fontFamily={T.mono} fontSize="9">AE</text>
  <text x="150" y="108" textAnchor="middle" fill={T.stone} fontFamily={T.mono} fontSize="9">SDR</text>
  <text x="290" y="108" textAnchor="middle" fill={T.stone} fontFamily={T.mono} fontSize="9">CSM</text>
  </svg>
  }
  />

  <GraphCard
  no="Graph  -  03"
  name="State"
  italic="graph"
  q={"What’s live right now. Budget status. In-flight agent actions."}
  body="Shared awareness across your entire agent fleet. What it enables: no two agents ever working against each other."
  fig="Fig. 03  -  Compiled truth, denormalized"
  diagram={
  <div style={{ background: T.ink, padding: "14px 16px", fontFamily: T.mono, fontSize: 11, lineHeight: 1.75, borderLeft: `2px solid ${T.brass}`, color: T.paper }}>
  <span style={{ color: T.sandDim }}>Acme Corp ::</span> {"{"}<br />
  &nbsp;&nbsp;<span style={{ color: T.brass2 }}>health</span>: <span style={{ color: "#A8C099" }}>0.62</span> <span style={{ color: T.stone }}>(v from 0.84)</span><br />
  &nbsp;&nbsp;<span style={{ color: T.brass2 }}>stage</span>: <span style={{ color: "#A8C099" }}>renewal_approach</span><br />
  &nbsp;&nbsp;<span style={{ color: T.brass2 }}>sentiment_30d</span>: <span style={{ color: "#A8C099" }}>↘ declining</span><br />
  &nbsp;&nbsp;<span style={{ color: T.brass2 }}>next_event</span>: <span style={{ color: "#A8C099" }}>Apr 23 renewal</span><br />
  {"}"}
  </div>
  }
  />

  <GraphCard
  no="Graph  -  04"
  badge="moat kernel"
  name="Precedent"
  italic="graph"
  q='"What happened before and why it ended the way it did."'
  body="Situation matching against past decisions. What it enables: agents that inherit institutional memory, not just instructions."
  fig="Fig. 04  -  Pattern → outcome store, cross-tenant anonymized"
  diagram={
  <div style={{ background: T.ink, padding: "14px 16px", fontFamily: T.mono, fontSize: 11, lineHeight: 1.75, borderLeft: `2px solid ${T.brass}`, color: T.paper }}>
  <span style={{ color: T.sandDim }}>Pattern:</span> <span style={{ color: T.brass2 }}>engagement_drop + renewal_in_14d</span><br />
  <span style={{ color: T.sandDim }}>Prior cases:</span> <span style={{ color: "#A8C099" }}>17 observed</span><br />
  <span style={{ color: T.sandDim }}>Outcomes:</span> <span style={{ color: "#A8C099" }}>11 churned  -  6 retained</span><br />
  <span style={{ color: T.sandDim }}>Intervention:</span> <span style={{ color: "#A8C099" }}>warm_touch → +40% retain</span>
  </div>
  }
  />
  </div>

  <h4 style={{ fontFamily: T.body, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.brass, marginTop: 72, marginBottom: 14, fontWeight: 600 }}>Why four, not one</h4>
  <p style={{ fontSize: 19, lineHeight: 1.55, color: T.ink2, maxWidth: 860 }}>
  A single flat graph confuses three different questions  - {" "}
  <em style={{ fontFamily: T.serif, fontStyle: "italic" }}>"is this person important?"</em>{" "}
  (relationship),{" "}
  <em style={{ fontFamily: T.serif, fontStyle: "italic" }}>"can this person sign this?"</em>{" "}
  (authority),{" "}
  <em style={{ fontFamily: T.serif, fontStyle: "italic" }}>"what is the status right now?"</em>{" "}
  (state). You could answer all three from one graph, but you’d be doing the separation at query time, every time, badly.
  </p>


  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  04  -  SCORE
─────────────────────────────────────────────────────────────── */
const ScoreSection = () => (
  <section
  id="score"
  data-section data-label="§ 03.2  -  SCORING  -  FIVE AXES" data-dark="false"
  className="sec-pad"
  style={{ padding: "clamp(60px,7vw,88px) 0", borderBottom: `0.5px solid ${T.lineStrong}`, position: "relative" }}
  >
  <Page>
  <SectionLabel>03.2  -  Context Score</SectionLabel>
  <H2>
  Every fact in the graph<br />gets a <em className="em-wonk" style={{ color: T.brass }}>Context Score.</em>
  </H2>
  <Kicker dropCap>
  Five axes. Deterministic math. No LLM required. These scores combine multiplicatively into a composite  -  the Context Score  -  that determines which parts of the graph reach Section B’s attention. Cheap to compute. Trivial to audit. Brutal on weak facts.
  </Kicker>

  <div style={{ background: T.paper, color: T.ink, padding: "40px 48px", borderLeft: `3px solid ${T.brass}`, margin: "32px 0 56px", fontFamily: T.mono, fontSize: 15, lineHeight: 2 }}>
  <span style={{ color: T.brass2 }}>ContextScore</span>{" "}
  <span style={{ color: T.sand }}>=</span>{" "}
  Freshness <span style={{ color: T.sand }}>x</span>{" "}
  Confidence <span style={{ color: T.sand }}>x</span>{" "}
  Consistency <span style={{ color: T.sand }}>x</span>{" "}
  Signal <span style={{ color: T.sand }}>x</span>{" "}
  Authority
  <div style={{ color: T.sandDim, fontSize: 12, fontStyle: "italic", marginTop: 14 }}>
  bounded in [0, 1]  -  multiplicative, not additive  -  denormalized onto every row
  </div>
  </div>

  <h4 style={{ fontFamily: T.body, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.brass, marginBottom: 18, fontWeight: 600 }}>Worked example  -  Acme Corp deal-cooling signal</h4>

  {[
  { lbl: "Freshness", val: 0.90, w: 90 },
  { lbl: "Confidence", val: 0.87, w: 87 },
  { lbl: "Consistency", val: 0.80, w: 80 },
  { lbl: "Signal", val: 0.72, w: 72 },
  { lbl: "Authority", val: 0.65, w: 65 },
  ].map((r, i) => (
  <div key={i} className="sv">
  <div className="sv-lbl">{r.lbl}</div>
  <div className="sv-bar"><div className="sv-fill" style={{ width: `${r.w}%` }} /></div>
  <div className="sv-val">{r.val.toFixed(2)}</div>
  </div>
  ))}

  <div className="sv" style={{ borderTop: `1.5px solid ${T.ink}`, borderBottom: `1.5px solid ${T.ink}`, background: "rgba(176,137,70,0.08)", padding: "22px 16px", marginTop: 10 }}>
  <div className="sv-lbl" style={{ color: T.brass, fontWeight: 600 }}>Context Score</div>
  <div className="sv-bar"><div className="sv-fill" style={{ width: "29%", background: T.brass }} /></div>
  <div className="sv-val" style={{ color: T.brass, fontWeight: 700, fontSize: 15 }}>0.29</div>
  </div>

  <p style={{ fontFamily: T.mono, fontSize: 11, color: T.stone, marginTop: 20, lineHeight: 1.7 }}>
  Fig. 05  -  0.90 x 0.87 x 0.80 x 0.72 x 0.65 = <strong style={{ color: T.ink }}>0.29</strong>  -  below 0.60 threshold, excluded from Section B reasoning by default.
  </p>

  <Pullquote style={{ marginTop: 64 }}>
  A single weak axis drags the whole fact down.<br />
  <Mark>That’s exactly how it should work.</Mark>
  </Pullquote>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  FOOTER HINT
─────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────
  -  APPLICATIONS  -  3-step scenario filter
────────────────────────────────────────────────────────────── */
const APP_ROLES = [
  { id: "founder",  label: "Founder / CEO" },
  { id: "sales",  label: "Sales / BD" },
  { id: "executive", label: "Executive" },
  { id: "hr",  label: "HR / People" },
  { id: "ops",  label: "Operations" },
];

const APP_AGENT_TYPES = [
  { id: "assistant", label: "Personal Assistant", sub: "Email  -  Calendar  -  Scheduling" },
  { id: "sales",  label: "Sales Agent",  sub: "Outreach  -  Pipeline  -  CRM" },
  { id: "finance",  label: "Finance Agent",  sub: "Payments  -  Approvals  -  Budget" },
  { id: "hr",  label: "HR Agent",  sub: "Hiring  -  Offers  -  Onboarding" },
  { id: "ops",  label: "Operations Agent",  sub: "Workflow  -  Coordination  -  Vendor" },
];

const APP_DOMAINS = [
  { id: "pipeline", label: "Sales & Pipeline" },
  { id: "finance",  label: "Finance & Payments" },
  { id: "hiring",  label: "HR & Hiring" },
  { id: "cs",  label: "Customer Success" },
  { id: "ops",  label: "Operations" },
  { id: "strategy", label: "Strategic Decisions" },
];

const APP_SCENARIOS = [

  // ─── PERSONAL ASSISTANT AGENT ──────────────────────────────────

  { id: "a01", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Call in 20 minutes. Agent has no idea your champion left.",
  scenario: "You’ve got a board call with your biggest account in 20 minutes. PA agent sends a briefing  -  attendee list, last contact date. It doesn’t mention that your main champion moved to a new company 11 days ago, or that two commitments from your side are still open.",
  withMemory: "Pulls last meeting notes and attendee names. No signal on what’s shifted in the org or relationship since your last touchpoint.",
  withGenios: "Relationship health score, org change flagged 11 days ago, open commitments from your side, and a recommended opening move  -  delivered before the call starts.",
  theOneThing: "Memory prepares you for the meeting. GeniOS tells you how to walk in.",
  whyItMatters: "The first 90 seconds sets the agenda. Walking in with a champion who left costs you control of the room.",
  impact: "Avg 4 hrs/week saved on manual pre-call research across active accounts.",
  graphs: "Relationship  -  State  -  Precedent",
  },
  { id: "a02", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Follow-up queued to someone who left the company.",
  scenario: "PA agent drafts a follow-up to Rahul, your champion at a key account. What it doesn’t tell you: Rahul changed companies 8 days ago. The email is about to land in an inbox no one reads.",
  withMemory: "Recalls the contact’s name and last interaction. Drafts and queues the email. No mechanism to detect org changes at external companies.",
  withGenios: "State graph: contact’s role changed 8 days ago. Authority graph updates to the new decision-maker. Recommends: hold outreach, confirm new contact before sending.",
  theOneThing: "Memory knows who you emailed. GeniOS knows if they still matter.",
  whyItMatters: "Emailing someone who left is a trust signal  -  it tells their team you’re not paying attention. The relationship cost is silent and compounding.",
  impact: "Caught in 100% of cases where org change is detectable before outreach fires.",
  graphs: "State  -  Authority  -  Relationship",
  },
  { id: "a03", agentType: "assistant", roles: ["founder","executive"], domains: ["pipeline","strategy"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "You promised an investor an update by Friday. It’s Friday.",
  scenario: "Three days ago you told an angel investor over email that you’d send a monthly update 'by end of week.' Today is Friday afternoon. Your PA agent has no idea you said that  -  no reminder, no draft, no nudge.",
  withMemory: "Memory doesn’t extract commitments from email threads. It stores messages, not what they obligate you to do.",
  withGenios: "Commitment extracted at ingest. Push delivered at T-24h with a pre-generated draft tailored to what this specific investor cares about most.",
  theOneThing: "Memory stores messages. GeniOS extracts the commitments hidden inside them.",
  whyItMatters: "Missed investor commitments compound. The first one is forgiven. The second one becomes a pattern that defines your relationship.",
  impact: "Zero missed commitments vs. avg 2.3 per month in orgs without GeniOS.",
  graphs: "Precedent  -  State",
  },
  { id: "a04", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["cs","pipeline"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Your top customer’s email filed as 'reply Monday'.",
  scenario: "80 emails to triage. PA agent marks your top customer’s renewal question as low priority. Flags a VC newsletter as urgent because they emailed twice. Your $200K account waits three days.",
  withMemory: "Triages by keywords and sender frequency. Doesn’t know who actually matters to the business or what’s at stake in each thread.",
  withGenios: "Every sender carries a relationship weight, authority score, and deal status. Top customer renewal: reply now. VC newsletter: archive. CFO thread: escalate.",
  theOneThing: "Keyword triage is fast. Context-aware triage is accurate.",
  whyItMatters: "A customer who waited 3 days for a reply on a renewal question already knows where they stand. That silence is your answer too.",
  impact: "Avg 1.2 mis-prioritized critical threads caught and corrected per day.",
  graphs: "Relationship  -  Authority",
  },
  { id: "a05", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Scheduled product email fires mid-negotiation.",
  scenario: "You’ve been in a back-and-forth renewal negotiation with your anchor customer for 10 days  -  pricing, terms, SLA. While that’s in flight, your PA agent fires a scheduled 'product update' email to their CEO. Same person. Same moment.",
  withMemory: "No awareness of the active negotiation. Sends the scheduled email on time because the calendar said to.",
  withGenios: "State graph: active renewal negotiation in progress  -  outreach hold applied automatically. Email suppressed. Account owner notified.",
  theOneThing: "Memory doesn’t know what’s in-flight. GeniOS reads your org’s active state before it acts.",
  whyItMatters: "A product pitch email mid-negotiation signals your teams don’t talk to each other. That signal arrives before the actual damage does.",
  impact: "Prevents avg 3 misfire automated emails per month during active deal cycles.",
  graphs: "State  -  Relationship",
  },
  { id: "a06", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["cs","pipeline"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Recap sent with zero memory of the last 3 sessions.",
  scenario: "PA agent writes the post-call recap. It accurately captures today’s conversation. It says nothing about the commitment you made last month that still isn’t done, or the issue the customer raised twice in prior sessions.",
  withMemory: "Summarizes today’s call. No awareness of what was promised in prior sessions or whether past commitments have been honored.",
  withGenios: "Pulls full relationship context: outstanding commitments, what was said last time, what’s changed. Recap shows what was honored, what’s still open, and what’s new.",
  theOneThing: "Your customer remembers every session. Your recap shouldn’t be meeting them for the first time.",
  whyItMatters: "Customers notice when you don’t reference what you promised. Recaps are a trust signal  -  they show whether you were paying attention.",
  impact: "100% commitment continuity across meeting recaps for tracked accounts.",
  graphs: "Precedent  -  Relationship",
  },
  { id: "a07", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["cs"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Renewal call booked into a cooling relationship.",
  scenario: "PA agent books a renewal call for next week. Nobody flagged that the account’s engagement has been dropping for 30 days and the main contact stopped replying 3 weeks ago. You’re walking into a pitch when you should be walking into a repair.",
  withMemory: "Books the available slot. No awareness of relationship health or what’s changed in the account since the last call.",
  withGenios: "Relationship graph: engagement dropped 44% over 30 days. Flags before booking: recommend human-led repair outreach first. Do not open with a renewal pitch.",
  theOneThing: "A calendar tool sees availability. GeniOS sees whether you should show up at all.",
  whyItMatters: "A renewal pitch to a cooling account doesn’t just fail  -  it often accelerates the churn by confirming the customer’s suspicion that you’re not paying attention.",
  impact: "Relationship health flagged pre-booking in 100% of at-risk renewal accounts.",
  graphs: "Relationship  -  State",
  },
  { id: "a08", agentType: "assistant", roles: ["founder"], domains: ["strategy","pipeline"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Re-approaching a VC who passed 5 months ago with a generic email.",
  scenario: "PA agent drafts a fundraising email to a partner at Sequoia you met at a conference. That partner passed 5 months ago  -  specifically said 'come back when you have 6 months of revenue.' Your agent doesn’t know. The email leads with a product update.",
  withMemory: "No recall of prior conversations outside the current context window. Drafts an outreach that ignores the prior pass entirely.",
  withGenios: "Precedent graph: investor passed 5 months ago  -  cited 'too early, come back with revenue.' Recommends: lead with month-6 revenue milestone. Address the exact concern they raised.",
  theOneThing: "Re-approaching a VC without addressing their exact rejection reason tells them you weren’t listening the first time.",
  whyItMatters: "Second passes are harder to reverse. The right framing can reopen the conversation; the wrong one closes it for good.",
  impact: "100% of prior VC passes surfaced before re-outreach is drafted.",
  graphs: "Precedent  -  Relationship",
  },
  { id: "a09", agentType: "assistant", roles: ["founder","executive"], domains: ["pipeline","strategy"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Lunch invite declined. That person could unblock your stalled deal.",
  scenario: "PA agent declines a lunch invite from a key account’s VP of Engineering  -  your calendar shows you’re busy. That VP is the one person who can unblock a renewal that’s been stuck in legal review for 6 weeks. The invite is gone.",
  withMemory: "Checks calendar availability. You’re blocked. Declines on your behalf. No awareness of who the sender is or what’s at stake.",
  withGenios: "Relationship graph: VP is the authority on the stalled renewal. State graph: deal in legal limbo 6 weeks. GeniOS flags before declining: this contact is high-value. Recommends counter with a specific time instead.",
  theOneThing: "A calendar tool manages your time. GeniOS manages what your time is worth.",
  whyItMatters: "An auto-declined invite from the one person who can unblock a deal is a 6-week delay you’ll never trace back to a scheduling agent.",
  impact: "High-relationship contacts flagged before calendar declines on 100% of active deal accounts.",
  graphs: "Relationship  -  State  -  Authority",
  },
  { id: "a10", agentType: "assistant", roles: ["founder","sales"], domains: ["pipeline","cs"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Deal closed. Thank-you email reads like you just met.",
  scenario: "Six months. Three near-collapses. Two internal champions who fought for you. Deal finally closes. PA agent drafts the thank-you email  -  it’s polished, professional, and completely generic. No reference to any of it.",
  withMemory: "Writes a well-formatted email. No context on the relationship arc, what was overcome, or who championed the deal internally.",
  withGenios: "Relationship graph: 6-month journey, 3 near-losses, 2 internal champions identified. Email references the specific moment that turned the deal  -  grounded in your actual history.",
  theOneThing: "A generic thank-you after 6 months is worse than no thank-you  -  it signals you weren’t paying attention.",
  whyItMatters: "The close is the beginning of the renewal. How you end the sale determines how you enter the relationship.",
  impact: "Relationship-aware close communications correlate with 2.4x higher renewal rates.",
  graphs: "Relationship  -  Precedent",
  },

  // ─── SALES AGENT ─────────────────────────────────────────────────────────

  { id: "s01", agentType: "sales", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Follow-up sent while their CEO transition is still live.",
  scenario: "You’ve been courting this company for 3 months. Sales agent sends a scheduled follow-up. Their CEO resigned 9 days ago  -  the org is frozen, leadership is unsettled, nobody is making decisions. Your email lands in the middle of it.",
  withMemory: "Recalls last email date and account status. Drafts and sends the follow-up on schedule. No awareness of what’s happening at the prospect’s org.",
  withGenios: "State graph: leadership transition active  -  CEO departed 9 days ago. Relationship graph: engagement cooling. Recommends: hold outreach 14 days, route to CSM for a temperature check.",
  theOneThing: "Memory sees a warm account. GeniOS sees a company mid-crisis.",
  whyItMatters: "Outreach during a leadership transition reads as tone-deaf. Timing sends a signal before your words do.",
  impact: "Outreach hold applied in 100% of accounts with detected leadership transitions.",
  graphs: "State  -  Relationship  -  Precedent",
  },
  { id: "s02", agentType: "sales", roles: ["founder","sales","executive"], domains: ["pipeline","finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Proposal sent 11 days into their Q4 budget freeze.",
  scenario: "Perfect timing  -  prospect said 'send us a proposal' two weeks ago. Sales agent sends it. What no one flagged: their Q4 budget freeze started 11 days ago. No new vendor commitments until Q1. The proposal goes unread.",
  withMemory: "Drafts and sends the proposal based on the last meeting notes. No awareness of external budget conditions at the prospect’s org.",
  withGenios: "State graph: Q4 budget freeze detected at prospect org. Recommends: delay proposal, switch to ROI-forward nurture content until Q1 opens.",
  theOneThing: "A proposal during a budget freeze isn’t rejected  -  it’s ignored. That’s worse.",
  whyItMatters: "Sending the right thing at the wrong time trains prospects to deprioritize you. You can’t un-send a proposal that landed in a frozen quarter.",
  impact: "Deal timing accuracy improves by avg 34% when state-aware outreach is applied.",
  graphs: "State  -  Precedent",
  },
  { id: "s03", agentType: "sales", roles: ["sales","founder"], domains: ["pipeline"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Check-in email sent when you owe them a deck update.",
  scenario: "Deal has been stalled for 3 weeks. Sales agent sends a 'just checking in' email to nudge the prospect. The last exchange ended with you promising to send an updated deck. That was 22 days ago. The check-in arrives before the deck does.",
  withMemory: "Detects the gap in conversation. Drafts a check-in. Sends it. No awareness of what was owed from your side.",
  withGenios: "Precedent graph: last exchange had an open commitment  -  deck update, 22 days overdue. Recommends: lead with the commitment, not a check-in. Commitment-led re-engagement has consistently higher close rates than generic follow-ups.",
  theOneThing: "A check-in when you owe something reads as avoidance. Lead with what you owe.",
  whyItMatters: "Stalled deals are rarely stalled by the prospect. Usually there’s an unfulfilled promise on your side that nobody tracked.",
  impact: "Commitment-led re-engagements consistently outperform generic check-ins in stalled deal recovery.",
  graphs: "Precedent  -  Relationship",
  },
  { id: "s04", agentType: "sales", roles: ["sales","executive","founder"], domains: ["pipeline"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Full proposal sent to a contact who can’t say yes.",
  scenario: "Sales agent sends the proposal to Neha, your champion. Three weeks ago the deal escalated internally  -  the actual decision is now owned by the VP of Engineering. Neha has influence, not authority. The proposal sits with the wrong person for two weeks.",
  withMemory: "Sends to the stored contact. No awareness that authority has drifted within the account since the last interaction.",
  withGenios: "Authority graph: decision-making shifted to VP of Engineering 3 weeks ago. Champion is now an influencer. Recommends: re-route proposal and loop in the VP directly.",
  theOneThing: "Memory knows who you talked to last. GeniOS knows who can actually say yes now.",
  whyItMatters: "A proposal that lands with the wrong person delays the deal by weeks  -  and signals to the account that you don’t know their org.",
  impact: "Authority drift detected in avg 2.1 active accounts per month per sales rep.",
  graphs: "Authority  -  State",
  },
  { id: "s05", agentType: "sales", roles: ["sales","founder","executive"], domains: ["cs","pipeline"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Renewal pitch sent to an account that’s been going cold for 30 days.",
  scenario: "Contract end is 3 weeks out. Sales agent sends the renewal package. Nobody flagged that engagement has dropped 66% over the last month and the main contact hasn’t replied in 21 days. The pitch lands into silence.",
  withMemory: "Detects the renewal date. Sends the renewal package. No context on relationship health or what’s been happening in the account.",
  withGenios: "Relationship graph: 66% engagement drop. State graph: champion silent for 21 days. Recommends: personal outreach from a founder or exec before any renewal pitch.",
  theOneThing: "A renewal pitch to a cooling account doesn’t just fail  -  it tells them you weren’t watching.",
  whyItMatters: "Customers who churn rarely complain first. They go quiet. That silence is the only warning you get.",
  impact: "At-risk accounts caught avg 3.2 weeks before renewal conversation, giving recovery time.",
  graphs: "Relationship  -  State  -  Precedent",
  },
  { id: "s06", agentType: "sales", roles: ["sales","founder"], domains: ["pipeline"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "Competitor comparison doc sent to someone who left that competitor badly.",
  scenario: "Sales agent sends a competitor comparison document to a prospect. Your champion spent 4 years at that competitor and left after a very public acquisition dispute. The deck leads with why your competitor is inferior. You lose the meeting before it starts.",
  withMemory: "Pulls the prospect’s profile and recent news. Attaches the deck. No awareness of who the champion actually is or their history.",
  withGenios: "Relationship graph: champion spent 4 years at this competitor  -  left following a widely reported dispute. Recommends: remove competitor section, replace with customer-evidence positioning. Direct comparison risks the relationship.",
  theOneThing: "Sending a competitor takedown to someone who left that company badly is the fastest way to lose the room.",
  whyItMatters: "Your champion’s reaction to the first slide determines whether the meeting continues. Sales collateral that works against the relationship is worse than no collateral.",
  impact: "Background-aware content recommendations applied to 100% of configured key-contact profiles.",
  graphs: "Relationship  -  Precedent",
  },
  { id: "s07", agentType: "sales", roles: ["sales","founder"], domains: ["pipeline"],
  plan: "early", planLabel: "Early Plan  -  $35 /mo",
  title: "'Personalized' outreach with zero actual context.",
  scenario: "Sales agent drafts a 'personalized' email  -  name, company, recent funding news, a line about their product. It looks personal. What it misses: this contact met your co-founder at a conference 4 months ago and walked away genuinely impressed.",
  withMemory: "Pulls name and company from CRM. Adds recent news hook. Looks personalized on the surface.",
  withGenios: "Relationship graph: this contact met your co-founder at a conference 4 months ago  -  flagged as a warm touchpoint. Recommends: reference that moment. Relationship-grounded opening delivers 3.1x reply rate.",
  theOneThing: "Personalization without relationship depth is just mail merge with extra steps.",
  whyItMatters: "Buyers can tell the difference between a templated email and a real one within 2 sentences. True context changes the tone in a way that can’t be faked.",
  impact: "Relationship-grounded outreach averages 3.1x reply rate vs. template personalization.",
  graphs: "Relationship  -  Precedent",
  },
  { id: "s08", agentType: "sales", roles: ["sales","executive"], domains: ["pipeline","finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Formal quote sent during their 60-day procurement hold.",
  scenario: "Prospect said they’re ready to move. Sales agent sends a formal price quote. What didn’t get communicated: their procurement team is on a 60-day hold following an internal policy change. The quote creates a process friction you now have to undo.",
  withMemory: "Sends the quote as scheduled. No awareness of the prospect’s internal procurement state.",
  withGenios: "State graph: procurement hold active at this org. Recommends: send ROI summary instead of formal quote. Flag for re-approach in 45 days.",
  theOneThing: "A formal quote during a procurement hold creates friction you’ll have to work backwards from.",
  whyItMatters: "Making a prospect explain why they can’t engage trains them to associate your name with process pain.",
  impact: "Timing-aware follow-ups reduce avg sales cycle by 18 days in affected accounts.",
  graphs: "State  -  Precedent",
  },
  { id: "s09", agentType: "sales", roles: ["sales","founder"], domains: ["cs","pipeline"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Upsell email sent while their support ticket is 6 days unresolved.",
  scenario: "Sales agent sends an upsell offer to one of your best accounts. That same account has had an open Priority 1 support ticket for 6 days. Nobody told the sales agent. The account reads the upsell email while waiting for a fix.",
  withMemory: "CRM shows the account as 'healthy.' Upsell goes out. No connection to the open support thread.",
  withGenios: "State graph: active unresolved Priority 1 support ticket  -  6 days open. All commercial outreach suppressed automatically. CS team notified for immediate escalation.",
  theOneThing: "Upselling a customer with an open complaint is the clearest signal that your systems don’t talk to each other.",
  whyItMatters: "Nothing destroys enterprise trust faster than being sold to while waiting for a fix. It confirms that your teams don’t share state  -  and that the customer’s problem doesn’t actually matter.",
  impact: "Commercial outreach suppressed on 100% of accounts with open priority support tickets.",
  graphs: "State  -  Relationship",
  },
  { id: "s10", agentType: "sales", roles: ["sales","founder","executive"], domains: ["pipeline"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Win-back sequence sent to an account that left over a specific incident.",
  scenario: "Sales agent spots a churned account and launches a win-back sequence. Standard stuff  -  new features, updated pricing, a friendly re-intro. What it doesn’t know: this account left over a support SLA breach that happened 3 times and was never properly acknowledged.",
  withMemory: "Finds the account in CRM as 'churned.' Launches a standard win-back. No context on the specific reason they left.",
  withGenios: "Precedent graph: churned 8 months ago  -  3 SLA breaches, never escalated or acknowledged. Recommends: lead with a direct acknowledgment of what failed, not with features.",
  theOneThing: "Win-backs that don’t address why they left confirm that nothing has changed.",
  whyItMatters: "Customers who left on bad terms remember exactly what happened. A generic re-intro tells them the org still doesn’t know  -  or care.",
  impact: "Reason-aware win-back messaging has 2.8x higher re-engagement rate vs. standard sequences.",
  graphs: "Precedent  -  Relationship",
  },

  // ─── FINANCE AGENT ───────────────────────────────────────────────────────────

  { id: "f01", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Payment processed 11 days into an active budget freeze.",
  scenario: "Finance agent processes a routine $12K vendor payment from the queue. A Q4 budget freeze was announced company-wide 11 days ago via email. The agent wasn’t there for that email. Payment goes through.",
  withMemory: "Processes the payment as scheduled. Agents act on queued tasks  -  they don’t monitor real-time changes to org budget policy between sessions.",
  withGenios: "State graph: Q4 budget freeze active since Nov 1  -  declared via all-hands. Payment paused automatically. Procurement lead notified with freeze context before any action taken.",
  theOneThing: "A queued payment is a decision made in the past. GeniOS checks whether the org has moved on since.",
  whyItMatters: "An unauthorized payment found in audit is a compliance event, not a process error. Finance agents that can’t read real-time org state are a liability on every cycle.",
  impact: "Zero unauthorized spend during declared freeze periods in orgs with State-graph-connected finance agents.",
  graphs: "State  -  Precedent",
  },
  { id: "f02", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Payment queued at $14K. CFO threshold is $10K.",
  scenario: "Finance agent queues a $14K vendor payment and processes it. CFO approval is required for anything above $10K  -  the policy is in the org’s authority documentation, not in the agent’s prompt. Payment processes without escalation.",
  withMemory: "Processes the payment. No live model of current approval thresholds. The threshold lives in a document the agent was never given.",
  withGenios: "Authority graph queried before processing: $14K exceeds $10K CFO threshold. Payment flagged, CFO notified with context bundle. Processed within 48h after approval.",
  theOneThing: "The threshold is in the Authority graph. Not in the prompt.",
  whyItMatters: "Payments above approval threshold without escalation are audit findings  -  regardless of whether the vendor relationship is good or the work was done.",
  impact: "100% of above-threshold payments caught before processing  -  zero exceptions.",
  graphs: "Authority  -  Precedent",
  },
  { id: "f03", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance","ops"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "$84K SaaS renewal in 18 days. Team migrated off it 6 weeks ago.",
  scenario: "Your $84K SaaS contract auto-renews in 18 days. The team migrated off the tool 6 weeks ago  -  zero logins since. No one cancelled. Finance agent processes renewals from the queue, no usage signal, no alert.",
  withMemory: "No proactive contract monitoring. Renewals process as scheduled unless someone manually flags them for review.",
  withGenios: "State graph: renewal window opens in 18 days. Usage: zero logins in 43 days. Precedent: 2 similar non-renewals caught and saved $60K+. Alert sent to procurement lead with cancellation recommendation.",
  theOneThing: "Your contract tracker knows the renewal date. GeniOS knows the team stopped using it.",
  whyItMatters: "$84K locks in the moment the window closes. There’s no undo  -  you’re committed for another 12 months on a tool nobody opens.",
  impact: "Avg $47K saved per year in detected non-renewal situations across tracked contracts.",
  graphs: "State  -  Precedent",
  },
  { id: "f04", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Travel reimbursement processed above the cap that changed 3 weeks ago.",
  scenario: "Finance agent processes a $3,200 travel reimbursement. The travel policy cap was updated to $2,500 three weeks ago following a cost review. The agent was working from the previous policy. Reimbursement goes through without a flag.",
  withMemory: "Processes based on prior policy knowledge. No mechanism to detect or ingest policy changes between sessions.",
  withGenios: "Authority graph: travel policy updated 3 weeks ago  -  cap now $2,500. Reimbursement flagged for manager review before processing.",
  theOneThing: "Policies update. Memory doesn’t.",
  whyItMatters: "Inconsistent expense enforcement creates compliance exposure and trust issues simultaneously  -  some employees get flagged, others don’t, based on when their agent last learned the rules.",
  impact: "Policy violations caught in 100% of cases where Authority graph is updated.",
  graphs: "Authority  -  State",
  },
  { id: "f05", agentType: "finance", roles: ["executive","ops"], domains: ["finance","cs"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Invoice paid to a vendor whose contract expired 18 days ago.",
  scenario: "Finance agent receives an invoice from a vendor and processes it. The vendor’s contract expired 18 days ago and no renewal was executed. No one connected the invoice to the contract status.",
  withMemory: "Processes the invoice as received. No live tracking of vendor contract status outside of what it was explicitly told.",
  withGenios: "State graph: vendor contract expired 18 days ago  -  no renewal on file. Invoice flagged, sent to procurement for contract resolution before any payment is processed.",
  theOneThing: "Memory processes invoices. GeniOS checks if you still have a contract first.",
  whyItMatters: "Paying an expired vendor creates financial and potential legal exposure depending on contract terms  -  and removes your leverage to renegotiate.",
  impact: "100% of post-contract invoices flagged before payment processing.",
  graphs: "State  -  Authority",
  },
  { id: "f06", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
  plan: "scale", planLabel: "Scale Plan  -  Custom",
  title: "Payroll file submitted with a contractor who offboarded 6 weeks ago.",
  scenario: "Finance agent prepares the monthly payroll file for bank submission. A contractor on the list officially offboarded 6 weeks ago  -  HR updated the system, sent the offboarding email, closed access. The payroll agent’s headcount list never updated.",
  withMemory: "Generates payroll from the employee list in its dataset. Offboarding happened in an HR system the agent wasn’t connected to.",
  withGenios: "State graph: contractor offboarded 6 weeks ago  -  cross-referenced against HR records. Payroll line flagged before submission. Finance lead alerted for correction.",
  theOneThing: "Payroll is a legal document. An agent that runs from a stale headcount file creates a compliance exposure on every cycle.",
  whyItMatters: "Paying a former contractor creates immediate tax, legal, and HR complications. Recovery requires multiple teams and takes weeks  -  from a list that should have been current.",
  impact: "Stale headcount in payroll files caught before submission in 100% of cases where State graph is current.",
  graphs: "State  -  Authority",
  },
  { id: "f07", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Paying a vendor mid-dispute removes your only leverage.",
  scenario: "Finance agent queues a $22K payment to a vendor. There’s an active dispute over a failed delivery from last month  -  raised in a Slack thread 12 days ago, still unresolved. The agent never saw the Slack thread. Payment processes.",
  withMemory: "Processes the payment as queued. The dispute exists in a channel the agent was never connected to.",
  withGenios: "State graph: active vendor dispute  -  raised 12 days ago, unresolved. Payment flagged, routed to procurement lead before processing.",
  theOneThing: "Memory processes what’s in the queue. GeniOS checks what’s in the relationship before it acts.",
  whyItMatters: "Paying a vendor mid-dispute signals the dispute is resolved when it isn’t. You’ve lost your leverage before the negotiation even starts.",
  impact: "Vendor dispute hold applied in 100% of detected active disputes before payment triggers.",
  graphs: "State  -  Relationship",
  },
  { id: "f08", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Software upgrade approved without the person who owns the budget.",
  scenario: "A team lead requests a $1,200/mo software upgrade. Finance agent processes the approval. The budget owner for that cost center is the VP of Finance  -  who requires sign-off on any software above $800/mo. Approval goes through without them.",
  withMemory: "Processes the approval as received. No live model of who owns which budget or what thresholds apply by cost center.",
  withGenios: "Authority graph: software upgrades above $800/mo require VP Finance approval for this cost center. Approval flagged, re-routed to correct authority before processing.",
  theOneThing: "The request looked approved. The Authority graph knew it wasn’t.",
  whyItMatters: "Approvals that bypass the right authority aren’t decisions  -  they’re liabilities. They get reversed, create friction, and erode trust in the finance process.",
  impact: "Authority routing accuracy: 100% for configured cost centers.",
  graphs: "Authority  -  State",
  },
  { id: "f09", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "PO sent to a vendor contact who left 3 months ago.",
  scenario: "Finance agent sends a purchase order to the primary contact at a key vendor. That contact left the vendor 3 months ago. The PO lands in a dead inbox. Nobody follows up. The order disappears for two weeks.",
  withMemory: "Sends to the stored contact email. No monitoring of changes at vendor orgs after the contact was first saved.",
  withGenios: "State graph: vendor contact offboarded 3 months ago  -  detected via email bounce pattern. PO automatically re-routed to the vendor’s account manager.",
  theOneThing: "Memory stores contacts. GeniOS notices when they stop being contacts.",
  whyItMatters: "A PO that reaches no one is a PO that disappears  -  and a vendor relationship that quietly degrades because your systems were running on stale data.",
  impact: "Avg 4-day PO delay eliminated in orgs with state-aware vendor contact tracking.",
  graphs: "State  -  Relationship",
  },
  { id: "f10", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance","strategy"],
  plan: "scale", planLabel: "Scale Plan  -  Custom",
  title: "Q1 budget forecast built on headcount that’s 60 days out of date.",
  scenario: "Finance agent builds the Q1 budget forecast. It uses the headcount snapshot from 60 days ago  -  3 roles filled since then, 2 new openings added. The CFO reviews a forecast that doesn’t reflect the actual org.",
  withMemory: "Uses the headcount data it was given at setup. No live org model to detect changes between sessions.",
  withGenios: "State graph: headcount updated  -  3 roles filled in Oct, 2 new openings added in Nov. Forecast recalculated with live data before the CFO review.",
  theOneThing: "A forecast is only as accurate as the org model underneath it.",
  whyItMatters: "Budget decisions made on 60-day-old headcount create real-money misallocations that take quarters to unwind  -  and nobody traces them back to a stale dataset.",
  impact: "Forecast accuracy improves by avg 12% with live-state headcount inputs vs. static snapshots.",
  graphs: "State  -  Precedent",
  },

  // ─── HR AGENT ─────────────────────────────────────────────────────────────────────

  { id: "h01", agentType: "hr", roles: ["hr","executive","founder"], domains: ["hiring"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Offer letter sent $15K above the comp cap that changed last quarter.",
  scenario: "HR agent processes the final offer for a senior hire  -  $180K base, standard package. Comp policy was updated last quarter: senior hires are capped at $165K until February’s review cycle. Agent was working from the previous policy.",
  withMemory: "Processes the offer as drafted. Policy update happened after the agent’s last context. No live model of current comp policy.",
  withGenios: "Authority graph: comp policy updated Q3  -  senior hire cap $165K until Feb review. Offer flagged before sending. Hiring manager looped in immediately.",
  theOneThing: "The workflow was correct. The policy awareness wasn’t.",
  whyItMatters: "An above-cap offer that has to be walked back damages candidate trust before their first day. Some candidates withdraw rather than renegotiate.",
  impact: "Zero comp policy violations on offers in orgs with live Authority graph comp policies.",
  graphs: "Authority  -  Precedent",
  },
  { id: "h02", agentType: "hr", roles: ["hr","founder","executive"], domains: ["hiring","cs"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Day 4. New hire still can’t log in. SSO was promised by day 1.",
  scenario: "During the new hire kickoff call, your team committed to having SSO access ready by day 1. HR agent is managing the onboarding checklist. It’s day 4. The commitment was made verbally in an email  -  no one tracked it, no one followed up.",
  withMemory: "Manages the onboarding checklist. No mechanism to extract and track commitments made verbally or in email threads.",
  withGenios: "Commitment extracted from kickoff email: SSO access by day 1. State graph: day 4, unresolved. Alert sent to IT lead with escalation priority.",
  theOneThing: "Memory manages the process. GeniOS tracks what was promised inside it.",
  whyItMatters: "A new hire who can’t log in on day 1 forms their first impression of the org in that moment. That impression is hard to walk back.",
  impact: "100% of verbal and email onboarding commitments tracked through to resolution.",
  graphs: "Precedent  -  State",
  },
  { id: "h03", agentType: "hr", roles: ["hr","executive"], domains: ["hiring"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Interview invite sent to a candidate who already declined this role 7 months ago.",
  scenario: "HR agent finds a strong senior candidate in the pipeline and sends an interview invite. That candidate declined a nearly identical role 7 months ago  -  specifically citing the compensation range. The agent sends the same invite without any adjustment.",
  withMemory: "Finds candidate in ATS as 'active.' Sends the interview invite. No recall of prior rejection.",
  withGenios: "Precedent graph: candidate declined a similar role 7 months ago  -  cited 'comp range doesn’t match expectations.' Recommends: re-engage with updated comp range before sending an invite.",
  theOneThing: "Sending the same invite that was already declined tells the candidate you don’t remember them.",
  whyItMatters: "Senior candidates have options. A careless re-invite signals a disorganized recruiting process and wastes goodwill you may have built before.",
  impact: "100% of prior-decline candidates flagged before re-invitation is sent.",
  graphs: "Precedent  -  State",
  },
  { id: "h04", agentType: "hr", roles: ["hr","executive"], domains: ["hiring"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Benefits enrollment email lists two plans that no longer exist.",
  scenario: "HR agent sends the open enrollment email to all employees. Two weeks ago, the benefits policy updated and sunset two plan options. The enrollment email still lists them. Employees try to select a plan that doesn’t exist.",
  withMemory: "Sends the enrollment communication based on the last known benefits policy. No live update detection.",
  withGenios: "Authority graph: benefits policy updated 2 weeks ago  -  two plan options sunset. Enrollment email regenerated with current options before sending.",
  theOneThing: "An enrollment email with unavailable options creates a confusion you have to personally fix for every affected employee.",
  whyItMatters: "HR credibility is built on precision. Benefits is exactly where employees expect it  -  and exactly where a policy mismatch creates the most visible damage.",
  impact: "Policy-accurate enrollment communications in 100% of configured policy-update scenarios.",
  graphs: "Authority  -  State",
  },
  { id: "h05", agentType: "hr", roles: ["hr","executive"], domains: ["hiring","strategy"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Termination letter drafted while Legal has an active hold on this case.",
  scenario: "HR agent drafts a termination letter for an employee who’s been on a performance plan. The process is correct. What the agent doesn’t know: Legal flagged this case 6 days ago and put an active hold on any employment actions pending a review.",
  withMemory: "Drafts the termination letter per HR process. The legal hold exists in a separate system the agent was never connected to.",
  withGenios: "State graph: active legal hold on this employee  -  flagged by Legal 6 days ago. Letter drafting paused. Legal team notified for review before any further action.",
  theOneThing: "HR process can be perfect and still wrong if it doesn’t know what Legal has flagged.",
  whyItMatters: "A termination during an active legal hold creates immediate legal exposure  -  regardless of the HR rationale. The process was right; the sequencing wasn’t.",
  impact: "100% of employee actions cross-checked against active legal holds before execution.",
  graphs: "State  -  Authority",
  },
  { id: "h06", agentType: "hr", roles: ["hr","founder"], domains: ["hiring"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "JD published with a salary range from a comp review 8 months ago.",
  scenario: "HR agent posts a new job description. The salary range is pulled from the last comp review  -  8 months ago. Market rates for this role have shifted +14% since then. Candidates apply, get to the offer stage, and drop out when the numbers don’t match what was posted.",
  withMemory: "Posts the JD as drafted. No live comp benchmarking or detection of policy updates since the last context.",
  withGenios: "Authority graph: comp review updated 6 weeks ago  -  market range for this role adjusted +14%. JD flagged for salary range update before publishing.",
  theOneThing: "A posted salary range is a commitment. An outdated one wastes 4-8 weeks of recruiting on candidates who will leave at offer stage.",
  whyItMatters: "Candidates who drop out at offer stage because of a salary mismatch represent 4-8 weeks of recruiting time lost  -  traced back to a number nobody updated.",
  impact: "100% of job descriptions reviewed against current comp policy before publishing.",
  graphs: "Authority  -  State",
  },
  { id: "h07", agentType: "hr", roles: ["hr","executive"], domains: ["hiring","strategy"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Promotion announcement sent before the manager approved it.",
  scenario: "HR agent sends an internal promotion announcement to the team. The direct manager gave verbal approval but never logged it formally. The written sign-off from VP HR is still pending. The announcement goes out before either is confirmed.",
  withMemory: "Processes the announcement based on workflow status. Verbal approval wasn’t logged  -  not in scope to detect.",
  withGenios: "Authority graph: promotion requires direct manager + VP HR written approval. Only one sign-off logged. Announcement paused, missing approval requested.",
  theOneThing: "A promotion announced before the approval chain is complete is a management credibility problem, not a process one.",
  whyItMatters: "Internal announcements can’t be un-sent. A correction damages both HR credibility and the manager’s standing with the team.",
  impact: "100% of internal HR announcements validated against full approval chain before sending.",
  graphs: "Authority  -  State",
  },
  { id: "h08", agentType: "hr", roles: ["hr","executive"], domains: ["hiring"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Background check triggered the moment the interview ended  -  before any offer.",
  scenario: "HR agent triggers a background check automatically after an interview completes. The workflow is set up to fire at 'interview complete.' The candidate hasn’t received or accepted a verbal offer yet. Background check kicks off 3 stages too early.",
  withMemory: "Follows the automated trigger: interview complete → initiate background check. No awareness of what stage the candidate is actually at.",
  withGenios: "State graph: interview completed but verbal offer not yet extended or accepted. Background check initiation flagged as premature. Action blocked until offer acceptance is confirmed.",
  theOneThing: "The right action fired at the wrong stage. GeniOS is the only layer that knows the difference.",
  whyItMatters: "Background checks before offer acceptance can create conditional employment exposure depending on jurisdiction  -  and spooks candidates who weren’t expecting it.",
  impact: "Process stage validation applied to 100% of HR workflow trigger points.",
  graphs: "State  -  Authority",
  },
  { id: "h09", agentType: "hr", roles: ["hr","executive","founder"], domains: ["hiring","ops"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Offer generated for a candidate the hiring manager already rejected on Slack.",
  scenario: "HR agent sees the candidate as 'active' in the ATS and advances them to offer stage. Four days ago the hiring manager sent a message in Slack saying 'we’re going a different direction on this one.' The ATS never got that signal.",
  withMemory: "ATS shows candidate as active. Advances to offer generation. Slack-based rejection is invisible.",
  withGenios: "State graph: hiring manager rejection signal detected via Slack 4 days ago  -  cross-referenced. Candidate status updated before offer is generated.",
  theOneThing: "The ATS is a system of record. Slack is where decisions actually happen. GeniOS reads both.",
  whyItMatters: "Generating an offer after an informal rejection requires an awkward retraction that damages the candidate’s experience and signals a disorganized process.",
  impact: "Cross-channel rejection signals captured and reflected in candidate state in real-time.",
  graphs: "State  -  Relationship",
  },
  { id: "h10", agentType: "hr", roles: ["hr","executive"], domains: ["hiring","strategy"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Reference check sent to a manager with a documented conflict.",
  scenario: "HR agent sends a reference check request to a candidate’s listed prior manager. What isn’t in the ATS: that manager and the candidate had a documented dispute during a performance review cycle  -  captured in an internal HR email thread from 14 months ago.",
  withMemory: "Sends to listed references as provided. No model of relationship dynamics between the reference and the candidate.",
  withGenios: "Relationship graph: prior manager has a flagged conflict with this candidate  -  documented in an HR email thread 14 months ago. Recommends: use alternate reference, flag conflict of interest to hiring manager.",
  theOneThing: "A reference check sent to someone with a conflict isn’t a reference check  -  it’s a liability.",
  whyItMatters: "A biased reference distorts hiring decisions in both directions  -  unfairly screening out a strong candidate or missing a real issue. The cost is a wrong hire or a missed one.",
  impact: "Conflict-of-interest references flagged before check is sent in 100% of Relationship-graph-tracked cases.",
  graphs: "Relationship  -  State",
  },

  // ─── OPERATIONS AGENT ─────────────────────────────────────────────────────────

  { id: "o01", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","cs"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "CS escalation open. Sales agent sends renewal offer. Same account. Same day.",
  scenario: "Ops agent opens a high-priority escalation for a complaint from Account X  -  customer is upset, issue is unresolved. Two hours later, sales agent sends a renewal offer to the same account’s main contact. The customer receives both on the same day.",
  withMemory: "Each agent operates from its own task queue. No shared model of what’s actively happening across the account.",
  withGenios: "State graph: active escalation in progress on Account X  -  opened 2 hours ago, unresolved. Sales agent renewal outreach blocked. CS lead notified to coordinate timing.",
  theOneThing: "One team handling a complaint, another sending a renewal offer  -  the customer experiences both as the same company.",
  whyItMatters: "A renewal offer arriving while an urgent complaint is being escalated tells the customer exactly how much you’re paying attention. That signal travels faster than the renewal conversation.",
  impact: "Cross-agent account conflicts prevented before customer contact in 100% of detected cases.",
  graphs: "State  -  Relationship",
  },
  { id: "o02", agentType: "ops", roles: ["ops","executive"], domains: ["ops"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Time-sensitive task routed to someone who offboarded 3 weeks ago.",
  scenario: "Ops agent assigns a time-critical deliverable to a team member. That person left the company 3 weeks ago. The task routes to an empty inbox. Nobody follows up. You find out when the deadline passes.",
  withMemory: "Assigns based on the last known org chart. No live model of who is still in the organization.",
  withGenios: "State graph: team member offboarded 3 weeks ago. Assignment automatically redirected to the active team lead. Zero delay.",
  theOneThing: "An org chart is a snapshot. Your ops agents are making decisions based on one.",
  whyItMatters: "A task routed to a former employee doesn’t just get delayed  -  it disappears. You find out when the deadline passes and the ops agent has no visibility into why.",
  impact: "100% of task assignments validated against live headcount before routing.",
  graphs: "State  -  Authority",
  },
  { id: "o03", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","finance"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Vendor contract auto-renews. Nobody reviewed it. Usage is down 40%.",
  scenario: "A key vendor contract has 14 days left. Auto-renewal is active. Utilization is down 40% from last quarter. No alert has fired. Ops agent isn’t monitoring renewals unless someone explicitly asks it to. The window closes and the contract locks.",
  withMemory: "No proactive contract monitoring. Renewals process unless someone manually reviews and flags them before the window.",
  withGenios: "State graph: renewal window opens in 14 days. Usage down 40% vs. prior quarter. Precedent: 2 similar cases recommended non-renewal. Alert sent to procurement lead automatically.",
  theOneThing: "Ops agents don’t know what they don’t monitor. GeniOS monitors continuously.",
  whyItMatters: "Once a contract auto-renews, you’re committed for another year regardless of usage. The decision point was 14 days earlier and it passed without a flag.",
  impact: "100% of contracts with active renewal windows surface in State graph alerts 14-30 days out.",
  graphs: "State  -  Precedent",
  },
  { id: "o04", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","strategy"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Custom SLA exception approved. Same exception caused problems 3 times before.",
  scenario: "Ops agent recommends approving a custom SLA exception for a mid-market customer. The request looks reasonable in isolation. Nobody checked: the same exception was approved 3 times in the last 18 months, and all 3 created above-average support burden.",
  withMemory: "Recommends based on current request and general playbook. No access to the history of similar decisions and their outcomes.",
  withGenios: "Precedent graph: 3 custom SLA exceptions in 18 months  -  all 3 resulted in elevated support cost. Recommendation adjusted: escalate to VP before approving. Show the pattern.",
  theOneThing: "Without precedent, every exception feels like a one-off. GeniOS shows the pattern.",
  whyItMatters: "Exceptions that look reasonable individually become catastrophic at scale. The pattern is always visible in hindsight  -  GeniOS surfaces it in advance.",
  impact: "Precedent-informed decisions reduce exception-related support burden by avg 34%.",
  graphs: "Precedent  -  Authority",
  },
  { id: "o05", agentType: "ops", roles: ["ops","executive"], domains: ["ops"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "Escalation routed to a team lead who changed roles 6 weeks ago.",
  scenario: "Ops agent routes a customer escalation to the team lead  -  as per the org chart. That team lead moved to a new role 6 weeks ago. The escalation lands in the wrong place, sits for two days, and the customer notices.",
  withMemory: "Routes based on the last known org structure. No mechanism to detect role changes in real time.",
  withGenios: "State graph: team lead’s role changed 6 weeks ago. New owner identified from Slack signal and email pattern. Escalation re-routed to correct person automatically.",
  theOneThing: "An agent that routes based on a stale org structure isn’t misfiring once  -  it’s a systematic misfiring machine.",
  whyItMatters: "Escalations that land with the wrong person don’t just get delayed  -  they train your org to distrust agent output.",
  impact: "Org chart accuracy maintained continuously. No manual update cycle required.",
  graphs: "State  -  Authority",
  },
  { id: "o06", agentType: "ops", roles: ["ops","executive"], domains: ["ops","finance"],
  plan: "scale", planLabel: "Scale Plan  -  Custom",
  title: "Data migration triggered while a security freeze is active.",
  scenario: "Ops agent triggers a scheduled data migration workflow. Two days ago the security team declared a system freeze pending a compliance review  -  announced in an all-hands Slack message. The agent had no visibility into that channel.",
  withMemory: "Executes the workflow as scheduled. The system freeze exists in a Slack announcement the agent was never connected to.",
  withGenios: "State graph: system freeze active  -  declared 2 days ago, security review ongoing. Workflow execution paused. Ops lead notified with freeze context and expected timeline.",
  theOneThing: "Scheduled workflows don’t check if the org decided to stop. GeniOS does.",
  whyItMatters: "Running a data migration during a security freeze can contaminate both the migration and the compliance review simultaneously  -  creating two problems from one action.",
  impact: "100% of scheduled workflow executions validated against active org-wide holds before triggering.",
  graphs: "State  -  Authority",
  },
  { id: "o07", agentType: "ops", roles: ["ops","executive"], domains: ["ops"],
  plan: "scale", planLabel: "Scale Plan  -  Custom",
  title: "Weekly metrics report emailed to 3 people who left last quarter.",
  scenario: "Ops agent sends the weekly internal metrics report to the standard distribution list. Three people on that list left the company last quarter. Their emails forward externally or go to inactive inboxes. Internal metrics are now outside the company.",
  withMemory: "Sends to the stored distribution list. No live model of org membership or email activity.",
  withGenios: "State graph: 3 of 11 distribution list members offboarded last quarter. List updated before send. Active members only.",
  theOneThing: "A stale distribution list isn’t just a process problem  -  it’s a data governance exposure.",
  whyItMatters: "Internal metrics reports reaching external or forwarded addresses are a security event that nobody intended to trigger. It happens on the cadence of your distribution list.",
  impact: "Distribution list accuracy maintained continuously  -  no quarterly cleanup sprint required.",
  graphs: "State  -  Authority",
  },
  { id: "o08", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","strategy"],
  plan: "scale", planLabel: "Scale Plan  -  Custom",
  title: "$50K vendor decision escalated to someone without the authority to approve it.",
  scenario: "Ops agent escalates a $50K vendor contract decision to the team lead as per the org chart. Policy requires VP-level approval for any vendor decision above $25K. The team lead approves it. The VP finds out later. The decision has to be re-done.",
  withMemory: "Routes to team lead per org chart. No live model of approval thresholds by decision type or dollar amount.",
  withGenios: "Authority graph: vendor decisions above $25K require VP approval per updated policy. Escalation re-routed to correct authority level with full context bundle.",
  theOneThing: "A decision approved at the wrong level isn’t a decision  -  it’s a liability waiting to be re-escalated.",
  whyItMatters: "Every hour between a wrong-authority approval and the correct one is a delay that compounds. And it signals that your ops infrastructure doesn’t know its own rules.",
  impact: "100% of escalations validated against Authority graph thresholds before routing.",
  graphs: "Authority  -  State",
  },
  { id: "o09", agentType: "ops", roles: ["ops","executive"], domains: ["ops","cs"],
  plan: "startup", planLabel: "Startup Plan  -  $149 /mo",
  title: "SLA breach happening across email and Slack. Agent only watches tickets.",
  scenario: "A customer raised a critical issue in the ticket system, then followed up via email, then sent a Slack message to their CSM. Ops agent monitors the ticket system. Email and Slack are invisible. Five days pass. SLA is breached. Customer escalates to your CEO.",
  withMemory: "Tracks tickets in the support system. Email threads and Slack messages from the same customer are in a different system.",
  withGenios: "State graph: same issue detected across 3 channels. Total time since first signal: 5.2 days. SLA breached. CS lead notified immediately with full cross-channel context.",
  theOneThing: "SLA monitoring scoped to one channel misses the breach already happening in another.",
  whyItMatters: "Customers who raised a critical issue in 3 places and got no coordinated response don’t stay customers. And they tell others.",
  impact: "Cross-channel SLA monitoring reduces missed breach detections by avg 67%.",
  graphs: "State  -  Relationship",
  },
  { id: "o10", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","strategy"],
  plan: "scale", planLabel: "Scale Plan  -  Custom",
  title: "Agent recommends a geography expansion that failed 18 months ago for specific reasons.",
  scenario: "Ops agent recommends expanding into a new market based on current data and general best practices. Eighteen months ago, the same expansion was attempted and failed  -  regulatory gap, wrong local partner, specific cost structure. Nobody told the agent.",
  withMemory: "Recommends based on current market data and its training. No access to what the org has actually tried and what happened.",
  withGenios: "Precedent graph: expansion attempted 18 months ago  -  failed on regulatory gap and local partner failure. Recommendation adjusted with specific risk flags from your org’s own attempt.",
  theOneThing: "An org that doesn’t learn from its own history is condemned to repeat it.",
  whyItMatters: "Repeating a failed expansion costs twice  -  once for the original failure, once for not learning from it. The precedent was there. Nobody queried it.",
  impact: "100% of strategic recommendations cross-referenced against org precedent before surfacing.",
  graphs: "Precedent  -  State  -  Authority",
  },
];

const Applications = () => {
  const [roleId, setRoleId] = React.useState("founder");
  const [agentTypeId, setAgentTypeId] = React.useState("assistant");
  const [domainId, setDomainId] = React.useState("pipeline");
  const [activeIdx, setActiveIdx] = React.useState(0);

  const allSelected = roleId !== null && agentTypeId !== null && domainId !== null;

  const ranked = React.useMemo(() => {
  if (!allSelected) return [];
  return [...APP_SCENARIOS]
  .map(sc => {
  let score = 0;
  if (sc.agentType === agentTypeId) score += 3;
  if (sc.roles.includes(roleId)) score += 2;
  if (sc.domains.includes(domainId)) score += 1;
  return { ...sc, score };
  })
  .filter(sc => sc.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10);
  }, [roleId, agentTypeId, domainId, allSelected]);

  const scenario = ranked[activeIdx] || null;

  const handleRole = (id) => { setRoleId(id); setActiveIdx(0); };
  const handleAgent = (id) => { setAgentTypeId(id); setActiveIdx(0); };
  const handleDomain = (id) => { setDomainId(id); setActiveIdx(0); };

  return (
  <section
  id="applications"
  data-section data-label="§  -  EVERY ROLE  -  EVERY DOMAIN  -  ONE BRAIN" data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper, position: "relative" }}
  >
  <Page>
  {/* Header  -  above the box */}
  <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
  <div style={{ display: "flex", justifyContent: "center" }}><SectionLabel>Scenario Calculator</SectionLabel></div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 16 }}>
  One context graph.<br />Every agent. <em className="em-wonk" style={{ color: T.brass }}>Zero blind spots.</em>
  </h2>
  <p style={{ fontSize: 15, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>
  Pick your role, agent type, and domain. See exactly where GeniOS changes the outcome.
  </p>
  </div>

  {/* ── THE CALCULATOR BOX ── */}
  <div style={{ border: `0.5px solid ${T.navy}`, boxShadow: "0 40px 80px -44px rgba(16,35,42,0.32), 0 8px 24px -12px rgba(16,35,42,0.12)", background: T.paper, overflow: "hidden" }}>

  {/* Control Panel  -  dark top strip */}
  <div style={{ background: T.navy, padding: "clamp(18px,2.4vw,28px) clamp(18px,2.8vw,32px)", borderBottom: "0.5px solid rgba(242,236,228,0.08)" }}>

  {/* Title bar + live selection status */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.brass, display: "inline-block", boxShadow: "0 0 0 3px rgba(215,90,51,0.2)" }} />
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass }}>Scenario Calculator</span>
  </div>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.12em", color: "rgba(242,236,228,0.38)", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
  <span style={{ color: "rgba(242,236,228,0.65)" }}>{APP_ROLES.find(r => r.id === roleId)?.label}</span>
  <span style={{ color: "rgba(242,236,228,0.2)" }}> - </span>
  <span style={{ color: "rgba(242,236,228,0.65)" }}>{APP_AGENT_TYPES.find(a => a.id === agentTypeId)?.label}</span>
  <span style={{ color: "rgba(242,236,228,0.2)" }}> - </span>
  <span style={{ color: "rgba(242,236,228,0.65)" }}>{APP_DOMAINS.find(d => d.id === domainId)?.label}</span>
  </div>
  </div>

  {/* Row 1  -  Role */}
  <div style={{ marginBottom: 18 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
  <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>01</span>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,236,228,0.45)", flexShrink: 0 }}>Who are you?</span>
  <div style={{ flex: 1, height: "0.5px", background: "rgba(242,236,228,0.08)" }} />
  </div>
  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
  {APP_ROLES.map(r => {
  const active = roleId === r.id;
  return (
  <button key={r.id} onClick={() => handleRole(r.id)}
  style={{ padding: "8px 18px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: active ? T.paper : "transparent", color: active ? T.ink : "rgba(242,236,228,0.45)", border: `0.5px solid ${active ? T.paper : "rgba(242,236,228,0.14)"}`, cursor: "pointer", transition: "all .18s ease", borderRadius: 2, outline: "none" }}
  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.4)"; e.currentTarget.style.color = "rgba(242,236,228,0.8)"; } }}
  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.14)"; e.currentTarget.style.color = "rgba(242,236,228,0.45)"; } }}
  >{r.label}</button>
  );
  })}
  </div>
  </div>

  {/* Row 2  -  Agent Type */}
  <div style={{ marginBottom: 18 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
  <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>02</span>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,236,228,0.45)", flexShrink: 0 }}>Agent type?</span>
  <div style={{ flex: 1, height: "0.5px", background: "rgba(242,236,228,0.08)" }} />
  </div>
  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
  {APP_AGENT_TYPES.map(a => {
  const active = agentTypeId === a.id;
  return (
  <button key={a.id} onClick={() => handleAgent(a.id)}
  style={{ padding: "8px 16px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", background: active ? T.brass : "transparent", color: active ? "#fff" : "rgba(242,236,228,0.45)", border: `0.5px solid ${active ? T.brass : "rgba(242,236,228,0.14)"}`, cursor: "pointer", transition: "all .18s ease", borderRadius: 2, textAlign: "center", outline: "none" }}
  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = T.brass; e.currentTarget.style.color = T.brass; } }}
  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.14)"; e.currentTarget.style.color = "rgba(242,236,228,0.45)"; } }}
  >
  <span style={{ display: "block" }}>{a.label}</span>
  <span style={{ display: "block", fontSize: 7.5, opacity: 0.55, marginTop: 2, letterSpacing: "0.07em" }}>{a.sub}</span>
  </button>
  );
  })}
  </div>
  </div>

  {/* Row 3  -  Domain */}
  <div>
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
  <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>03</span>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,236,228,0.45)", flexShrink: 0 }}>Working domain?</span>
  <div style={{ flex: 1, height: "0.5px", background: "rgba(242,236,228,0.08)" }} />
  </div>
  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
  {APP_DOMAINS.map(d => {
  const active = domainId === d.id;
  return (
  <button key={d.id} onClick={() => handleDomain(d.id)}
  style={{ padding: "8px 16px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", background: active ? "rgba(242,236,228,0.12)" : "transparent", color: active ? T.paper : "rgba(242,236,228,0.45)", border: `0.5px solid ${active ? "rgba(242,236,228,0.35)" : "rgba(242,236,228,0.14)"}`, cursor: "pointer", transition: "all .18s ease", borderRadius: 2, outline: "none" }}
  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.4)"; e.currentTarget.style.color = "rgba(242,236,228,0.8)"; } }}
  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.14)"; e.currentTarget.style.color = "rgba(242,236,228,0.45)"; } }}
  >{d.label}</button>
  );
  })}
  </div>
  </div>
  </div>

  {/* Results  -  left rail + right panel */}
  <div className="app-stage" style={{ display: "grid", gridTemplateColumns: "minmax(200px,260px) 1fr" }}>

  {/* Left rail */}
  <aside className="app-rail" style={{ background: T.navy, color: T.paper, padding: "24px 0", position: "relative", borderRight: "0.5px solid rgba(242,236,228,0.08)" }}>
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `linear-gradient(${T.paper} 0.5px, transparent 0.5px), linear-gradient(90deg, ${T.paper} 0.5px, transparent 0.5px)`, backgroundSize: "24px 24px" }} />
  <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: `linear-gradient(180deg, ${T.brass} 0%, rgba(215,90,51,0) 65%)` }} />
  <div style={{ position: "relative", padding: "0 clamp(12px,1.8vw,18px)" }}>
  <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,236,228,0.25)", marginBottom: 14 }}>
  Top {ranked.length} scenarios
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
  {ranked.map((sc, i) => {
  const isActive = i === activeIdx;
  return (
  <button key={sc.id} onClick={() => setActiveIdx(i)}
  style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 10px", background: isActive ? "rgba(215,90,51,0.12)" : "transparent", border: "none", borderLeft: `2px solid ${isActive ? T.brass : "transparent"}`, cursor: "pointer", textAlign: "left", transition: "all .18s ease", width: "100%", outline: "none" }}
  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(242,236,228,0.04)"; }}
  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
  >
  <span style={{ fontFamily: T.mono, fontSize: 9, color: isActive ? T.brass : "rgba(242,236,228,0.22)", flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
  <span style={{ fontFamily: T.serif, fontSize: 12.5, color: isActive ? T.paper : "rgba(242,236,228,0.5)", lineHeight: 1.4 }}>{sc.title}</span>
  </button>
  );
  })}
  </div>
  </div>
  </aside>

  {/* Right panel */}
  {scenario && (
  <div style={{ background: T.paper, display: "flex", flexDirection: "column" }}>

  {/* ① Header  -  context tags + title + scenario */}
  <div style={{ padding: "clamp(22px,2.8vw,36px) clamp(22px,2.8vw,36px) 22px", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
  <span style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, padding: "3px 10px", border: "0.5px solid rgba(215,90,51,0.3)", background: "rgba(215,90,51,0.06)" }}>
  {APP_AGENT_TYPES.find(a => a.id === scenario.agentType)?.label}
  </span>
  {scenario.domains.slice(0, 2).map(d => (
  <span key={d} style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, padding: "3px 10px", border: `0.5px solid ${T.line}` }}>
  {APP_DOMAINS.find(x => x.id === d)?.label}
  </span>
  ))}
  </div>
  <h3 style={{ fontFamily: T.display, fontSize: "clamp(18px,2.1vw,26px)", fontWeight: 400, lineHeight: 1.14, letterSpacing: "-0.024em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: "0 0 14px" }}>
  {scenario.title}
  </h3>
  <p style={{ fontSize: 13.5, color: T.ink2, lineHeight: 1.68, margin: 0 }}>{scenario.scenario}</p>
  </div>

  {/* ② Without vs With GeniOS  -  flush edge-to-edge */}
  <div className="app-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
  <div style={{ background: "rgba(156,74,62,0.04)", borderBottom: `0.5px solid rgba(156,74,62,0.16)`, borderRight: `0.5px solid rgba(156,74,62,0.1)`, padding: "20px clamp(16px,2vw,24px)" }}>
  <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED_RED, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
  <span style={{ fontWeight: 700, fontSize: 9 }}>✕</span> Without GeniOS
  </div>
  <p style={{ fontSize: 13, color: T.ink2, lineHeight: 1.68, margin: 0 }}>{scenario.withMemory}</p>
  </div>
  <div style={{ background: T.navy, borderBottom: `0.5px solid ${T.brass}`, borderTop: `2px solid ${T.brass}`, padding: "20px clamp(16px,2vw,24px)", position: "relative", overflow: "hidden" }}>
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `linear-gradient(${T.paper} 0.5px, transparent 0.5px), linear-gradient(90deg, ${T.paper} 0.5px, transparent 0.5px)`, backgroundSize: "20px 20px" }} />
  <div aria-hidden="true" style={{ position: "absolute", bottom: 0, right: 0, width: 90, height: 90, background: "radial-gradient(circle at bottom right, rgba(215,90,51,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />
  <div style={{ position: "relative" }}>
  <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
  <span style={{ fontWeight: 700, fontSize: 9 }}>✓</span> With GeniOS
  </div>
  <p style={{ fontSize: 13, color: "rgba(242,236,228,0.84)", lineHeight: 1.68, margin: 0 }}>{scenario.withGenios}</p>
  </div>
  </div>
  </div>

  {/* ③ The One Thing  -  pull quote, full bleed left border */}
  <div style={{ padding: "20px clamp(22px,2.8vw,36px)", borderBottom: `0.5px solid ${T.line}`, borderLeft: `4px solid ${T.brass}`, background: "rgba(215,90,51,0.03)" }}>
  <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.3em", textTransform: "uppercase", color: T.brass, marginBottom: 10, opacity: 0.85 }}>The one thing</div>
  <p className="app-pull-quote" style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, color: T.ink, lineHeight: 1.48, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 40", letterSpacing: "-0.012em" }}>{scenario.theOneThing}</p>
  </div>

  {/* ④ Why it matters */}
  <div style={{ padding: "20px clamp(22px,2.8vw,36px)", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: T.stone, marginBottom: 9 }}>Why it matters</div>
  <p style={{ fontSize: 13.5, color: T.ink2, lineHeight: 1.68, margin: 0 }}>{scenario.whyItMatters}</p>
  </div>

  {/* ⑤ Impact  -  full-width metric strip with brass left rail */}
  <div style={{ display: "flex", alignItems: "stretch", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ width: 3, background: T.brass, flexShrink: 0 }} />
  <div style={{ padding: "14px 20px", background: "rgba(16,35,42,0.025)", flex: 1 }}>
  <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.26em", textTransform: "uppercase", color: T.stone, marginBottom: 6 }}>Impact</div>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 13, color: T.ink2, lineHeight: 1.52, margin: 0 }}>{scenario.impact}</p>
  </div>
  </div>

  {/* ⑥ Graphs queried  -  proper tag pills */}
  <div style={{ padding: "14px clamp(22px,2.8vw,36px)", borderBottom: `0.5px solid ${T.line}`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
  <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, flexShrink: 0 }}>Graphs queried</div>
  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
  {scenario.graphs.split(" \xb7 ").map(g => (
  <span key={g} style={{ fontFamily: T.mono, fontSize: 8.5, color: T.brass, display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", border: "0.5px solid rgba(215,90,51,0.28)", background: "rgba(215,90,51,0.05)" }}>
  <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.brass, display: "inline-block", flexShrink: 0 }} />{g}
  </span>
  ))}
  </div>
  </div>

  {/* ⑦ Plan CTA */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px clamp(22px,2.8vw,36px)", background: T.navy, position: "relative", overflow: "hidden", flexWrap: "wrap", gap: 12 }}>
  <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${T.brass} 0%, rgba(215,90,51,0.25) 100%)` }} />
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", backgroundImage: `linear-gradient(${T.paper} 0.5px, transparent 0.5px), linear-gradient(90deg, ${T.paper} 0.5px, transparent 0.5px)`, backgroundSize: "20px 20px" }} />
  <div style={{ position: "relative" }}>
  <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(242,236,228,0.32)", marginBottom: 6 }}>If this is your reality</div>
  <div className="app-plan-label" style={{ fontFamily: T.display, fontSize: 19, fontWeight: 400, color: T.paper, letterSpacing: "-0.02em", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{scenario.planLabel}</div>
  </div>
  <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
  style={{ position: "relative", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, padding: "11px 22px", border: "0.5px solid " + T.brass, textDecoration: "none", display: "inline-block", flexShrink: 0, background: "rgba(215,90,51,0.08)", transition: "background .2s ease, color .2s ease" }}
  onMouseEnter={e => { e.currentTarget.style.background = T.brass; e.currentTarget.style.color = "#fff"; }}
  onMouseLeave={e => { e.currentTarget.style.background = "rgba(215,90,51,0.08)"; e.currentTarget.style.color = T.brass; }}
  >
  Get access →  </a>
  </div>
  </div>
  )}
  </div>
  </div>
  </Page>

  <style dangerouslySetInnerHTML={{ __html: ".app-stage button:focus,.app-stage a:focus{outline:none!important}@media(max-width:900px){.app-stage{grid-template-columns:1fr!important}.app-rail{max-height:260px;overflow-y:auto}.app-split{grid-template-columns:1fr!important}}@media(max-width:640px){.app-plan-label{font-size:15px!important}.app-pull-quote{font-size:14px!important}}@media(max-width:480px){.app-plan-label{font-size:13px!important}.app-pull-quote{font-size:12.5px!important}.app-rail{max-height:200px!important}}" }} />
  </section>
  );
};

/* ──────────────────────────────────────────────────────────────
  -  TIER USE CASES  -  20 specific shipping patterns by plan
─────────────────────────────────────────────────────────────── */
const TIER_USE_CASES = {
  early: {
  id: "early",
  name: "Early",
  price: "$35",
  cadence: "/mo",
  sources: "Gmail + Calendar",
  audience: "Solo founders  -  indie builders  -  tiny AI-native teams",
  cases: [
  { n: "01", title: "Sales copilot that knows your relationships", persona: "Founder running an AI sales-assistant on Claude SDK. Agent answers prospects, drafts replies, books meetings.", without: "Agent opens every conversation from zero. You paste context manually for every decision  -  who this person is, where they are in the process, what was last discussed.", withh: "Before the agent acts, GeniOS delivers the move: \"This contact is warm. Last meaningful exchange 8 days ago. Open commitment on their side  -  overdue by 6 days. Reference the commitment, not the product.\"", diff: "Memory returns the thread. GeniOS tells the agent what to do with it. That’s the gap." },
  { n: "02", title: "Pre-meeting intelligence, automatic", persona: "Fractional CEOs, BD leads, indie consultants with 15+ calls a week.", without: "You wing it or spend 90 minutes scrolling email. Most days you wing it.", withh: "The night before each meeting, GeniOS reasons over the relationship graph and delivers: who this person is, what’s pending from your side, what the relationship health score is, and what move opens the call right.", diff: "Your calendar tool knows you have a meeting. GeniOS knows what’s been building in the relationship for 6 months." },
  { n: "03", title: "Commitment tracker that actually works", persona: "Founder promised: 4 investors a monthly update, 2 customers a feature ETA, 1 advisor a deck review.", without: "Commitments extracted from sent-mail by hand into Notion. Notion dies by week 3. Credibility burns quietly.", withh: "Commitment facts extracted at ingest. Push notification 24 hours before each is due. The agent doesn’t need to be asked  -  it already knows.", diff: "Rules trigger on keywords. GeniOS reasons over what a commitment is, who it was made to, and what the relationship cost of missing it would be." },
  { n: "04", title: "\"Who went quiet\" detector", persona: "A champion at a key prospect hasn’t replied in 21 days. You don’t know yet.", without: "You don’t notice until renewal season. By then the relationship is cold.", withh: "Change-point detection fires a relationship cooling recommendation  -  before you’ve noticed. The move delivered: \"Jordan Lee at BrightPath has gone quiet  -  21 days no response. Recommend: personal outreach from founder, not automated sequence.\"", diff: "Cannot be built with email rules. Requires continuous reasoning over a graph." },
  { n: "05", title: "Inbox-triage agent that knows who matters", persona: "An agent sorts incoming mail: reply now / reply later / delegate / archive.", without: "Every sender treated equally. A message from your top customer gets the same triage weight as a cold newsletter.", withh: "Every sender has a context score, authority weight, and relationship state. The agent pulls this in under 100ms and triages by actual organizational importance.", diff: "Your contacts list doesn’t know that this person’s deal went live last week or that you have an open commitment to them. GeniOS does." },
  { n: "06", title: "Fundraising pipeline, built from your inbox", persona: "Solo founder tracking 40+ investor conversations across email + calendar. No CRM.", without: "You build and abandon a Notion database. Or pay $20/mo for Affinity. Either way, you still do the data entry.", withh: "Pipeline graph builds automatically from Gmail + Calendar. The move delivered: \"Sequoia contact has gone 18 days without response after expressing strong interest. This matches 3 past conversations that closed when re-engaged within 7 days. Founder outreach recommended this week.\"", diff: "Your fundraising tracker is your inbox, queryable. With reasoning on top." },
  { n: "07", title: "Post-meeting follow-through that sounds like you", persona: "Calendar event ends. Agent sends recap and next-step email.", without: "Agent knows there was a meeting. Not the history, the commitments made in the last 3 calls, or the tone that’s been established. Recap reads like it was written by someone who just met this person.", withh: "Long context bundle: past threads, prior commitments, relationship arc, suggested next step from precedent. The agent writes like it’s been in every call.", diff: "The difference between a recap that builds the relationship and one that reminds them it’s automated." },
  { n: "08", title: "Candidate pipeline that doesn’t leak", persona: "Solo founder running their own sourcing.", without: "Candidates go cold because nobody watches individual threads. You find out 3 weeks later when they accepted somewhere else.", withh: "Commitment due and relationship cooling signals push to your agent automatically. You’re notified before the candidate goes cold  -  not after.", diff: "You stop losing candidates to your own silence." },
  { n: "09", title: "Client memory for independent consultants", persona: "8 active clients, 40+ concurrent threads.", without: "You’re the single point of failure. Nobody else can answer \"what did Acme ask for last month?\" without finding you.", withh: "Any agent or AI assistant pulls context scoped to that client  -  history, commitments, relationship state, open items  -  in one call.", diff: "The business becomes delegable. That’s a structural change for a one-person shop." },
  { n: "10", title: "MCP-native workflow for Claude Code / Claude Desktop", persona: "You’re building in Claude Code or Cursor. You ask: \"Update the onboarding flow for Acme’s tier preferences.\"", without: "Claude has no idea who Acme is. You paste chunks of spec manually every time.", withh: "claude mcp add genios  -  Claude pulls org context as a tool call. Your code editor knows your clients, your commitments, your org structure.", diff: "The friction between your code and your org goes away. The entire reason Early exists." },
  ],
  },
  startup: {
  id: "startup",
  name: "Startup",
  price: "$149",
  cadence: "/mo",
  sources: "+ Slack + HubSpot + Sonnet cascade",
  audience: "5-25 person AI-native / B2B SaaS teams",
  cases: [
  { n: "11", title: "Multi-agent fleet with shared context", persona: "Research agent, writer, reviewer, reply-drafter  -  all operating on the same org.", without: "Each agent rebuilds facts independently  -  token cost is 3-4x what it should be, and three agents disagree about the same person’s role.", withh: "One Genios tenant, all agents pull scoped bundles.", diff: "The fleet becomes coherent. The single most defensible use case at Startup tier." },
  { n: "12", title: "Cross-channel cooling-deal detection", persona: "HubSpot says \"proposal sent.\" Email engagement dropped 58%. Slack channel with customer dead for 14 days.", without: "HubSpot fires no alert because the CRM signal is fine; sales manager finds out at QBR.", withh: "Genios correlates across three sources, fires deal_cooling at priority 0.7+.", diff: "HubSpot literally cannot do this. The feature most likely to drive a HubSpot-dependent revenue team to upgrade." },
  { n: "13", title: "Champion-change / authority-drift detection", persona: "Your customer’s CTO just moved to VP Eng. Decision-maker at a prospect changed jobs.", without: "Your agent keeps emailing the old champion as decision-maker; CS team finds out 3 months late.", withh: "Section B fires authority_change, updates the Authority graph, warns any agent with cached titles within 48h.", diff: "You stop walking into meetings with the wrong mental model of who runs the room." },
  { n: "14", title: "Cross-functional commitment ledger", persona: "Engineer commits in Slack. PM confirms timeline in Gmail. Sales writes scope in HubSpot notes.", without: "No single system of record; the customer asks \"is Acme’s integration on track?\" and three people give different answers.", withh: "Genios ties all three to one commitment entity with evidence links.", diff: "The question \"what did we commit to?\" becomes a 200ms API call." },
  { n: "15", title: "Sales-enablement agent that drafts real outreach", persona: "Agent drafts personalized messages for warm leads.", without: "Agent uses templates with {first_name} and vague \"hope you’re doing well\"; open rates tank.", withh: "Agent pulls deal stage + last Slack exchange + past emails + matched precedent, drafts an actually-specific message.", diff: "The message sounds like it was written by a human who remembered the relationship." },
  { n: "16", title: "Agent-identity layer for enterprise-leaning startups", persona: "You’re selling to SMB now but mid-market is on the roadmap.", without: "\"Under whose identity did this agent act?\" is unanswerable; you retrofit agent identity at Series A under SOC 2 pressure.", withh: "Every agent is a registered entity with a revocable key, scoped permissions, and a full audit trail from day one.", diff: "You skip a 3-month enterprise-readiness scramble. Hidden value of Startup tier." },
  { n: "17", title: "Customer-onboarding concierge agent", persona: "New customer kickoff. Slack Connect fires up, email threads, kickoff call.", without: "Your team makes 12 verbal commitments during onboarding (\"we’ll configure SSO by Friday\"); 3-4 silently slip.", withh: "Genios extracts commitments at ingest, tracks each until fulfilled, pushes commitment_due at T-24h.", diff: "Onboarding credibility stops being dependent on the CSM’s memory." },
  { n: "18", title: "Internal-knowledge agent for 10-25 person startups", persona: "New hire asks in Slack: \"who owns the auth system?\" \"what did we decide about the pricing change?\"", without: "3 senior engineers keep getting pinged; tribal knowledge bottleneck.", withh: "Genios' ownership + topic graphs answer from 6 months of ambient signal.", diff: "You stop paying a \"senior engineer tax\" every time someone joins." },
  { n: "19", title: "Precedent-driven recommendations", persona: "\"Deals that cooled this way at stage X were recovered 67% of the time with action Y.\"", without: "Your agent suggests generic playbook moves that didn’t work for this specific team.", withh: "After 90 days, Genios has learned your team’s pattern library; recommendations are grounded in your own outcomes.", diff: "The system gets specifically better at your business. Nothing else in the memory market does this. The reason a customer stays at month 6+." },
  { n: "20", title: "You’re building an AI-agent product and memory isn’t your moat", persona: "YC/Antler/PH-style startup shipping an AI agent to your customers.", without: "You spend 4-6 months building a context layer that ends up being v0.3 of what Genios already ships. Your actual product slips.", withh: "Integrate the Genios tenant-per-customer model in a week.", diff: "You work on the agent your customers are paying for, not the memory plumbing. The one use case where \"mandatory\" genuinely applies." },
  ],
  },
};

const TierUseCaseCard = ({ n, title, persona, without, withh, diff }) => (
  <article
  style={{
  border: `0.5px solid ${T.lineStrong}`,
  background: T.cardBg,
  padding: "clamp(24px,2.4vw,30px)",
  display: "flex",
  flexDirection: "column",
  gap: 18,
  transition: "border-color .3s ease, background .3s ease, transform .3s ease",
  position: "relative",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.background = T.cardBgHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
  onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.lineStrong; e.currentTarget.style.background = T.cardBg; e.currentTarget.style.transform = "translateY(0)"; }}
  >
  <header style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: `0.5px solid ${T.line}`, paddingBottom: 14 }}>
  <span style={{ fontFamily: T.display, fontSize: 28, fontWeight: 400, color: T.brass, letterSpacing: "-0.02em", lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>{n}</span>
  <h3 style={{ fontFamily: T.display, fontSize: 18, fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.012em", color: T.ink, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 30", flex: 1 }}>
  {title}
  </h3>
  </header>

  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 14, lineHeight: 1.55, color: T.ink3, margin: 0 }}>
  {persona}
  </p>

  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "rgba(156,74,62,0.05)", border: `0.5px solid rgba(156,74,62,0.18)` }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED_RED, fontWeight: 600, flexShrink: 0, marginTop: 2, width: 56 }}>Without</span>
  <span style={{ fontSize: 13, lineHeight: 1.55, color: T.ink2 }}>{without}</span>
  </div>
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "rgba(176,137,70,0.05)", border: `0.5px solid rgba(176,137,70,0.22)`, borderLeft: `2px solid ${T.brass}` }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.brass, fontWeight: 600, flexShrink: 0, marginTop: 2, width: 56 }}>With</span>
  <span style={{ fontSize: 13, lineHeight: 1.55, color: T.ink2 }}>{withh}</span>
  </div>
  </div>

  <footer style={{ marginTop: "auto", paddingTop: 14, borderTop: `0.5px solid ${T.line}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, fontWeight: 500, flexShrink: 0, marginTop: 3 }}>&gt;</span>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 13.5, lineHeight: 1.55, color: T.ink, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}>
  {diff}
  </p>
  </footer>
  </article>
);

const TierUseCases = () => {
  const [tier, setTier] = React.useState("early");
  const active = TIER_USE_CASES[tier];

  return (
  <section
  id="tier-use-cases"
  data-section data-label="§  -  TWENTY WAYS TEAMS SHIP WITH GENIOS" data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper2, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
  <SectionLabel>By tier  -  By persona</SectionLabel>
  <H2 style={{ marginLeft: "auto", marginRight: "auto" }}>
  Twenty specific ways<br />
  <em className="em-wonk" style={{ color: T.brass }}>teams ship with GeniOS.</em>
  </H2>
  <p style={{ fontSize: 16, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>
  Each plan unlocks a different shape of work. Toggle a tier to see the patterns built for it  -  what breaks without context, what changes the moment a brain plugs in.
  </p>
  </div>

  {/* Tier toggle */}
  <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
  <div style={{ display: "inline-flex", padding: 4, background: T.paper, border: `0.5px solid ${T.lineStrong}`, borderRadius: 100 }}>
  {Object.values(TIER_USE_CASES).map((t) => {
  const isActive = tier === t.id;
  return (
  <button
  key={t.id}
  onClick={() => setTier(t.id)}
  style={{
  padding: "12px 26px",
  fontFamily: T.mono,
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: isActive ? 600 : 500,
  color: isActive ? T.ink : T.stone,
  background: isActive ? T.brass : "transparent",
  border: "none",
  borderRadius: 100,
  cursor: "pointer",
  transition: "background .25s ease, color .25s ease",
  display: "inline-flex",
  alignItems: "baseline",
  gap: 10,
  }}
  >
  <span>{t.name}</span>
  <span style={{ fontFamily: T.mono, fontSize: 10, opacity: 0.85, letterSpacing: "0.1em" }}>{t.price}{t.cadence}</span>
  </button>
  );
  })}
  </div>
  </div>

  {/* Tier metadata strip */}
  <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28, marginBottom: 56, paddingBottom: 24, borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>Sources</span>
  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.ink, letterSpacing: "0.04em" }}>{active.sources}</span>
  </div>
  <div style={{ width: 1, background: T.line }} />
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>Built for</span>
  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.ink, letterSpacing: "0.04em" }}>{active.audience}</span>
  </div>
  <div style={{ width: 1, background: T.line }} />
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>Patterns</span>
  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.brass, letterSpacing: "0.04em", fontWeight: 600 }}>{active.cases.length} live</span>
  </div>
  </div>

  {/* Cards grid */}
  <div className="tuc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
  {active.cases.map((c) => <TierUseCaseCard key={c.n} {...c} />)}
  </div>

  {/* Footer CTA strip */}
  <div style={{ marginTop: 64, padding: "28px 32px", border: `0.5px solid ${T.lineStrong}`, background: T.cardBg, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 8 }}>
  See yourself in one of these patterns?
  </div>
  <p style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, color: T.ink, margin: 0, lineHeight: 1.25, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  Lock in the founding rate on <em className="em-wonk" style={{ color: T.brass }}>{active.name}</em> while early access is open.
  </p>
  </div>
  <Btn variant="primary" size="md" arrow="right" href={TALLY_URL} target="_blank" rel="noopener noreferrer">
  Apply for {active.name}
  </Btn>
  </div>
  </Page>

  <style>{`
  @media (max-width: 900px) {
  .tuc-grid { grid-template-columns: 1fr !important; }
  }
  `}</style>
  </section>
  );
};


/* ──────────────────────────────────────────────────────────────
  HOW IT WORKS  -  hub-and-spoke diagram
─────────────────────────────────────────────────────────────── */
const HIW_INPUTS = [
  { label: "Gmail",  sub: "Email threads & signals"  },
  { label: "Slack",  sub: "Messages & decisions"  },
  { label: "CRM",  sub: "Deal & contact state"  },
  { label: "Documents", sub: "Policies & precedents"  },
];
const HIW_OUTPUTS = [
  { label: "Recommended move",  sub: "Scored, evidence-backed"  },
  { label: "Authority check",  sub: "Who owns this decision"  },
  { label: "Timing signal",  sub: "Act now vs. wait"  },
  { label: "Agent context",  sub: "Full org picture attached"  },
];

/* kept for reference, not rendered */
const _HIW_STEPS = [
  {
  no: "01",
  title: "Connect Your Data Sources",
  you: {
  label: "What you do",
  body: "Authorize GeniOS to read from your org’s data sources. Gmail, Calendar to start. OAuth  -  no engineering required. Takes under 10 minutes.",
  },
  genios: {
  label: "What GeniOS does immediately",
  body: "Begins backfill. Reads your historical signals  -  emails, meetings, threads  -  and starts building the four-layer context graph. Entities extracted. Relationships mapped. Authority chains identified. State captured.",
  note: "You don’t configure the graph. GeniOS builds it from your data.",
  },
  code: null,
  flow: null,
  },
  {
  no: "02",
  title: "Drop One Line Into Your Agent",
  you: {
  label: "What you do",
  body: "Add a single API call to your existing agent. One endpoint. Returns full organizational context before your agent acts. Works with LangGraph, CrewAI, AutoGen, n8n, or raw SDK  -  no framework changes required.",
  },
  genios: {
  label: "What GeniOS does",
  body: "Begins routing context to your agent on every relevant event. Your agent stops starting from zero. It starts every run knowing what matters.",
  note: "One line of code. Your agent gains organizational awareness.",
  },
  code: `context = genios.pull(\n  tenant_id="your-org",\n  entity="brightpath-inc",\n  agent_id="sales-agent"\n)\n# Returns: relationship state, authority constraints,\n# open commitments, relevant precedents  -  scored and ranked`,
  flow: null,
  },
  {
  no: "03",
  title: "Receive Intelligence. Don’t Ask For It.",
  you: {
  label: "What you do",
  body: "Register a webhook endpoint. That’s it. You’re done.",
  },
  genios: {
  label: "What GeniOS does from here  -  permanently",
  body: "The reasoning loop runs continuously. No queries needed. Every correction your team makes trains the loop. Accuracy compounds  -  30 days, 60 days, 90 days.",
  note: "Your agent doesn’t ask. GeniOS already knows.",
  },
  code: null,
  flow: [
  ["Org signal detected", "Gmail thread, calendar event, state change"],
  ["Graph updated + scored", "Freshness checked, lifecycle managed"],
  ["Reasoning engine activates", "Is this relevant? To which agent?"],
  ["Priority scored", "High confidence only  -  noise filtered out"],
  ["Recommendation pushed", "Agent receives the move with evidence"],
  ["Outcome logged", "Graph sharpens for the next recommendation"],
  ],
  },
];

const hiwIcon = (label) => {
  const s = "rgba(242,236,228,0.82)";
  if (label === "Gmail") return <><path d="M -7,-5 L 7,-5 L 7,5 L -7,5 Z" fill="none" stroke={s} strokeWidth="1.1" /><path d="M -7,-5 L 0,1 L 7,-5" fill="none" stroke={s} strokeWidth="1.1" /></>;
  if (label === "Slack") return <><line x1="-5" y1="-7" x2="-7" y2="5" stroke={s} strokeWidth="1.3" strokeLinecap="round" /><line x1="1" y1="-7" x2="-1" y2="5" stroke={s} strokeWidth="1.3" strokeLinecap="round" /><line x1="-8" y1="-2" x2="4" y2="-2" stroke={s} strokeWidth="1.3" strokeLinecap="round" /><line x1="-6" y1="2" x2="6" y2="2" stroke={s} strokeWidth="1.3" strokeLinecap="round" /></>;
  if (label === "Calendar") return <><rect x="-7" y="-5" width="14" height="12" rx="1.5" fill="none" stroke={s} strokeWidth="1.1" /><line x1="-7" y1="-1" x2="7" y2="-1" stroke={s} strokeWidth="1.1" /><line x1="-3" y1="-5" x2="-3" y2="-8" stroke={s} strokeWidth="1.4" strokeLinecap="round" /><line x1="3" y1="-5" x2="3" y2="-8" stroke={s} strokeWidth="1.4" strokeLinecap="round" /></>;
  if (label === "CRM") return <><circle cx="0" cy="-4" r="3.2" fill="none" stroke={s} strokeWidth="1.1" /><path d="M -6,6 Q -6,0 0,0 Q 6,0 6,6" fill="none" stroke={s} strokeWidth="1.1" /></>;
  if (label === "Documents") return <><path d="M -5,-8 L 3,-8 L 7,-4 L 7,8 L -5,8 Z" fill="none" stroke={s} strokeWidth="1.1" /><path d="M 3,-8 L 3,-4 L 7,-4" fill="none" stroke={s} strokeWidth="1.1" /><line x1="-2" y1="-1" x2="4" y2="-1" stroke={s} strokeWidth="0.9" /><line x1="-2" y1="2" x2="4" y2="2" stroke={s} strokeWidth="0.9" /></>;
  if (label === "API / SDK") return <text textAnchor="middle" dominantBaseline="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="9" fill={s} fontWeight="700">{"</>"}</text>;
  return null;
};

const HowItWorks = () => {
  const cx = 600, cy = 260, R = 100;
  const lx = 195, rx = 1005;
  const allInputs = [...HIW_INPUTS, { label: "API / SDK", sub: "Drop one line into your agent" }];

  const inputs = allInputs.map((d, i) => ({ ...d, y: 40 + i * 86 }));
  const outputs = HIW_OUTPUTS.map((d, i) => ({ ...d, y: 122 + i * 92 }));

  const lPath = (y) => `M ${lx} ${y} C 360 ${y} 476 ${cy} ${cx - R} ${cy}`;
  const rPath = (y) => `M ${cx + R} ${cy} C 724 ${cy} 840 ${y} ${rx} ${y}`;

  return (
  <section
  id="how-it-works"
  data-section data-label="§  -  HOW IT WORKS" data-dark="true"
  style={{ padding: "clamp(60px,7vw,88px) 0", background: T.navy, borderBottom: `0.5px solid ${T.lineDark}`, position: "relative" }}
  >
  <Page>
  {/* Header */}
  <div style={{ textAlign: "center", marginBottom: 64 }}>
  <SectionLabel>How It Works</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(32px,4.2vw,56px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: "0 auto", maxWidth: 620 }}>
  Set it up once.<br />
  <em className="em-wonk" style={{ color: T.brass }}>GeniOS runs from there.</em>
  </h2>
  </div>

  {/* Hub-and-spoke diagram */}
  <div className="hiw-svg-outer">
  <svg viewBox="0 0 1200 700" style={{ width: "100%", overflow: "visible" }}>
  <defs>
  <radialGradient id="hiwHalo" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stopColor={T.brass} stopOpacity="0.18" />
  <stop offset="100%" stopColor={T.brass} stopOpacity="0" />
  </radialGradient>
  <radialGradient id="hiwCG" cx="38%" cy="34%" r="65%">
  <stop offset="0%" stopColor="#D0744A" />
  <stop offset="100%" stopColor="#5C1E08" />
  </radialGradient>
  <radialGradient id="hiwCI" cx="38%" cy="34%" r="65%">
  <stop offset="0%" stopColor="#A84830" />
  <stop offset="100%" stopColor="#341005" />
  </radialGradient>
  <clipPath id="hiwClipCG"><circle cx={cx - 34} cy={cy} r={43} /></clipPath>
  <clipPath id="hiwClipCI"><circle cx={cx + 34} cy={cy} r={43} /></clipPath>
  {inputs.map((inp, i) => <path key={i} id={`hL${i}`} d={lPath(inp.y)} fill="none" />)}
  {outputs.map((out, i) => <path key={i} id={`hR${i}`} d={rPath(out.y)} fill="none" />)}
  </defs>

  {/* Paths */}
  {inputs.map((inp, i) => <path key={i} d={lPath(inp.y)} fill="none" stroke={T.brass} strokeWidth="0.7" strokeOpacity="0.24" />)}
  {outputs.map((out, i) => <path key={i} d={rPath(out.y)} fill="none" stroke={T.brass} strokeWidth="0.7" strokeOpacity="0.24" />)}

  {/* Animated dots */}
  {inputs.map((inp, i) => (
  <circle key={i} r="2.6" fill={T.brass} fillOpacity="0.88">
  <animateMotion dur={`${2.5 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.46}s`}>
  <mpath xlinkHref={`#hL${i}`} />
  </animateMotion>
  </circle>
  ))}
  {outputs.map((out, i) => (
  <circle key={i} r="2.6" fill={T.brass} fillOpacity="0.88">
  <animateMotion dur={`${2.3 + i * 0.25}s`} repeatCount="indefinite" begin={`${0.85 + i * 0.46}s`}>
  <mpath xlinkHref={`#hR${i}`} />
  </animateMotion>
  </circle>
  ))}

  {/* Outer halo */}
  <circle cx={cx} cy={cy} r={R + 42} fill="url(#hiwHalo)" />

  {/* Two inner circles */}
  <circle cx={cx - 34} cy={cy} r={43} fill="url(#hiwCG)" />
  <circle cx={cx + 34} cy={cy} r={43} fill="url(#hiwCI)" />

  {/* Inner network  -  Context Graph */}
  <g clipPath="url(#hiwClipCG)" opacity="0.16">
  <line x1={cx-58} y1={cy-18} x2={cx-22} y2={cy+16} stroke={T.paper} strokeWidth="0.6" />
  <line x1={cx-22} y1={cy+16} x2={cx-8} y2={cy-14} stroke={T.paper} strokeWidth="0.6" />
  <line x1={cx-8} y1={cy-14} x2={cx-44} y2={cy-22} stroke={T.paper} strokeWidth="0.6" />
  <line x1={cx-44} y1={cy-22} x2={cx-58} y2={cy-18} stroke={T.paper} strokeWidth="0.6" />
  <circle cx={cx-58} cy={cy-18} r="2.5" fill={T.paper} />
  <circle cx={cx-22} cy={cy+16} r="2.5" fill={T.paper} />
  <circle cx={cx-8} cy={cy-14} r="2.5" fill={T.paper} />
  <circle cx={cx-44} cy={cy-22} r="2" fill={T.paper} />
  </g>

  {/* Inner concentric rings  -  Context Intelligence */}
  <g clipPath="url(#hiwClipCI)" opacity="0.14">
  <circle cx={cx+34} cy={cy} r="16" fill="none" stroke={T.paper} strokeWidth="0.6" />
  <circle cx={cx+34} cy={cy} r="30" fill="none" stroke={T.paper} strokeWidth="0.6" />
  </g>

  {/* Outer brain ring */}
  <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.brass} strokeWidth="1" strokeOpacity="0.32" style={{ animation: "funnelGlow 3s ease-in-out infinite" }} />
  <circle cx={cx - 34} cy={cy} r={43} fill="none" stroke={T.brass} strokeWidth="0.6" strokeOpacity="0.22" />
  <circle cx={cx + 34} cy={cy} r={43} fill="none" stroke={T.brass} strokeWidth="0.6" strokeOpacity="0.22" />

  {/* Center label above */}
  <text x={cx} y={cy - R - 12} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="12" fill={T.brass} fillOpacity="0.7" letterSpacing="0.22em">CONTEXT BRAIN</text>

  {/* Inner labels  -  Context Graph */}
  <text x={cx-34} y={cy-8} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="7" fill={T.paper} fillOpacity="0.42" letterSpacing="0.14em">01</text>
  <text x={cx-34} y={cy+8} textAnchor="middle" fontFamily="'Fraunces',serif" fontSize="13" fill={T.paper} fontWeight="400">Context</text>
  <text x={cx-34} y={cy+23} textAnchor="middle" fontFamily="'Fraunces',serif" fontSize="13" fill={T.paper} fontStyle="italic">Graph</text>

  {/* Inner labels  -  Context Intelligence */}
  <text x={cx+34} y={cy-8} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="7" fill={T.paper} fillOpacity="0.42" letterSpacing="0.14em">02</text>
  <text x={cx+34} y={cy+8} textAnchor="middle" fontFamily="'Fraunces',serif" fontSize="13" fill={T.paper} fontWeight="400">Context</text>
  <text x={cx+34} y={cy+23} textAnchor="middle" fontFamily="'Fraunces',serif" fontSize="13" fill={T.paper} fontStyle="italic">Intelligence</text>

  {/* Left input nodes  -  icon badges + labels */}
  {inputs.map((inp, i) => (
  <g key={i}>
  <circle cx={lx} cy={inp.y} r={17} fill="rgba(215,90,51,0.14)" stroke={T.brass} strokeWidth="0.7" strokeOpacity="0.38" />
  <g transform={`translate(${lx},${inp.y})`}>{hiwIcon(inp.label)}</g>
  <text x={lx - 50} y={inp.y - 5} textAnchor="end" fontFamily="'IBM Plex Sans',sans-serif" fontSize="13.5" fontWeight="500" fill={T.paper} fillOpacity="0.92">{inp.label}</text>
  <text x={lx - 50} y={inp.y + 11} textAnchor="end" fontFamily="'IBM Plex Mono',monospace" fontSize="9.5" fill={T.sandDim}>{inp.sub}</text>
  </g>
  ))}

  {/* Right output nodes + labels */}
  {outputs.map((out, i) => (
  <g key={i}>
  <circle cx={rx} cy={out.y} r={11} fill="none" stroke={T.brass} strokeWidth="0.5" strokeOpacity="0.28" />
  <circle cx={rx} cy={out.y} r={4.5} fill={T.brass} fillOpacity="0.8" />
  <text x={rx + 44} y={out.y - 4} textAnchor="start" fontFamily="'IBM Plex Sans',sans-serif" fontSize="13.5" fontWeight="500" fill={T.paper} fillOpacity="0.92">{out.label}</text>
  <text x={rx + 44} y={out.y + 12} textAnchor="start" fontFamily="'IBM Plex Mono',monospace" fontSize="9.5" fill={T.sandDim}>{out.sub}</text>
  </g>
  ))}

  {/* Column headers  -  vertical sidebar labels */}
  <g transform="translate(-30, 240) rotate(-90)">
  <line x1="-28" y1="0" x2="-6" y2="0" stroke={T.brass} strokeWidth="0.8" strokeOpacity="0.55" />
  <text x="0" y="4" textAnchor="start" fontFamily="'IBM Plex Mono',monospace" fontSize="11" fill={T.brass} fillOpacity="0.7" letterSpacing="0.22em">YOUR DATA</text>
  </g>
  <g transform="translate(1230, 240) rotate(90)">
  <line x1="-28" y1="0" x2="-6" y2="0" stroke={T.brass} strokeWidth="0.8" strokeOpacity="0.55" />
  <text x="0" y="4" textAnchor="start" fontFamily="'IBM Plex Mono',monospace" fontSize="11" fill={T.brass} fillOpacity="0.7" letterSpacing="0.22em">AGENT GETS</text>
  </g>

  {/* ── MULTI-AGENT FLEET ── */}
  {[
  { label: "Sales Agent",  sub: "Deal intelligence",  x: 340 },
  { label: "Finance Agent",  sub: "Budget & approvals", x: 470 },
  { label: "Ops Agent",  sub: "Workflow execution", x: 600 },
  { label: "Support Agent",  sub: "Customer context",  x: 730 },
  { label: "Marketing Agent", sub: "Campaign & pipeline", x: 860 },
  ].map((ag, i) => {
  const ay = 590;
  const pathId = `hA${i}`;
  return (
  <g key={i}>
  <path id={pathId} d={`M ${cx} ${cy + R} C ${cx} 490 ${ag.x} 490 ${ag.x} ${ay - 18}`} fill="none" stroke={T.brass} strokeWidth="0.7" strokeOpacity="0.2" strokeDasharray="3 5" />
  <circle r="2.4" fill={T.brass} fillOpacity="0.85">
  <animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.45}s`}>
  <mpath xlinkHref={`#hA${i}`} />
  </animateMotion>
  </circle>
  <rect x={ag.x - 26} y={ay - 18} width={52} height={52} rx="9"
  fill="rgba(215,90,51,0.08)" stroke={T.brass} strokeWidth="0.7" strokeOpacity="0.38" />
  <circle cx={ag.x} cy={ay + 4} r="5.5" fill="none" stroke="rgba(242,236,228,0.72)" strokeWidth="1.1" />
  <path d={`M ${ag.x - 9} ${ay + 22} Q ${ag.x - 9} ${ay + 13} ${ag.x} ${ay + 13} Q ${ag.x + 9} ${ay + 13} ${ag.x + 9} ${ay + 22}`}
  fill="none" stroke="rgba(242,236,228,0.72)" strokeWidth="1.1" />
  <text x={ag.x} y={ay + 54} textAnchor="middle" fontFamily="'IBM Plex Sans',sans-serif" fontSize="11.5" fontWeight="500" fill={T.paper} fillOpacity="0.88">{ag.label}</text>
  <text x={ag.x} y={ay + 68} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="8.5" fill={T.sandDim}>{ag.sub}</text>
  </g>
  );
  })}

  {/* "via API / SDK" label under center brain */}
  <text x={cx} y={cy + R + 28} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="11" fill={T.brass} fillOpacity="0.65" letterSpacing="0.16em">via API / SDK</text>

  {/* Fleet bracket */}
  <line x1="280" y1="682" x2="920" y2="682" stroke={T.brass} strokeWidth="0.5" strokeOpacity="0.22" />
  <line x1="280" y1="678" x2="280" y2="682" stroke={T.brass} strokeWidth="0.5" strokeOpacity="0.22" />
  <line x1="920" y1="678" x2="920" y2="682" stroke={T.brass} strokeWidth="0.5" strokeOpacity="0.22" />
  <text x="600" y="695" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="12" fill={T.brass} fillOpacity="0.65" letterSpacing="0.2em">MULTI-AGENT FLEET  -  SHARED CONTEXT BRAIN</text>
  </svg>
  </div>{/* hiw-svg-outer */}

  {/* Caption */}
  <div style={{ textAlign: "center", marginTop: 56 }}>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, color: T.sandDim, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.6 }}>
  Three steps from your team. Everything after that  -  GeniOS.
  </p>
  <Btn variant="primary" size="md" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request Access
  </Btn>
  </div>
  </Page>
  </section>
  );
};

/* ──────────────────────────────────────────────────────────────
  -  METRICS 1  -  market key metrics
─────────────────────────────────────────────────────────────── */
function useCountUp(target, active, dur = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
  if (!active) return;
  let t0 = null;
  let raf;
  const tick = (ts) => {
  if (!t0) t0 = ts;
  const p = Math.min((ts - t0) / dur, 1);
  setV(Math.round(p * target));
  if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
  }, [active, target, dur]);
  return v;
}
function useInView(threshold = 0.25) {
  const ref = React.useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
  if (ref.current) io.observe(ref.current);
  return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

const METRICS1 = [
  { pre: "$", n: 47, suf: "B+", label: "AI Agent Market by 2030",  fill: 65 },
  { pre: "",  n: 78, suf: "%",  label: "Orgs Deploying AI Agents",  fill: 78 },
  { pre: "",  n: 67, suf: "%",  label: "Still Human-Supervised",  fill: 67 },
  { pre: "<", n: 200, suf: "ms", label: "GeniOS Context Retrieval",  fill: 85 },
  { pre: "",  n: 4,  suf: "",  label: "Intelligence Graph Layers",  fill: 40 },
  { pre: "",  n: "Push", suf: "", label: "Proactive Delivery",  fill: 90 },
];

const MetricCell = ({ pre, n, suf, label, active, dur, first }) => {
  const counted = useCountUp(typeof n === "number" ? n : 0, active, dur);
  const v = typeof n === "number" ? counted : n;
  return (
  <div style={{
  padding: "28px clamp(12px,1.6vw,28px)",
  borderLeft: first ? "none" : `0.5px solid ${T.lineDark}`,
  }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sandDim, marginBottom: 10 }}>
  {label}
  </div>
  <div style={{ fontFamily: T.display, fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05, color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
  {pre}{v}<em style={{ fontStyle: "italic", color: T.brass, fontSize: "0.65em", marginLeft: 2, fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>{suf}</em>
  </div>
  </div>
  );
};

const MetricsBar = () => {
  const [ref, seen] = useInView(0.1);
  return (
  <div ref={ref} className="metrics-bar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", alignItems: "end" }}>
  {METRICS1.map((c, i) => <MetricCell key={i} {...c} active={seen} dur={1100 + i * 90} first={i === 0} />)}
  </div>
  );
};

/* ──────────────────────────────────────────────────────────────
  -  METRICS 2  -  product performance (legacy)
─────────────────────────────────────────────────────────────── */
const METRICS2 = [
  { val: "Day 1",  label: "Useful from day one",  sub: "Backfill runs on first connect  -  no ramp period" },
  { val: "Day 30",  label: "Calibrated to your patterns",  sub: "Org-specific reasoning kicks in by month one" },
  { val: "Real-time", label: "Context freshness",  sub: "Signal decay scored on every query" },
  { val: "4",  label: "Graph layers working together", sub: "Relationship  -  Authority  -  State  -  Precedent" },
];

const Metrics2 = () => (
  <section
  id="product-metrics"
  data-section data-label="§  -  PRODUCT PERFORMANCE  -  COMPOUNDING METRICS" data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(40px,5vw,56px) 0", background: T.paper, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", marginBottom: 56 }}>
  <SectionLabel>Product Performance</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(32px,4.2vw,54px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  Numbers that compound<br /><em className="em-wonk" style={{ color: T.brass }}>the longer GeniOS runs.</em>
  </h2>
  </div>
  <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
  {METRICS2.map((c, i) => (
  <div key={i} className="card-metric">
  <div style={{ fontFamily: T.display, fontSize: 40, fontWeight: 400, letterSpacing: "-0.035em", color: T.ink, lineHeight: 1, marginBottom: 14, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>{c.val}</div>
  <div style={{ fontFamily: T.display, fontSize: 15, fontWeight: 500, color: T.ink, marginBottom: 8, letterSpacing: "-0.01em" }}>{c.label}</div>
  <div style={{ fontSize: 13, color: T.stone, lineHeight: 1.55 }}>{c.sub}</div>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  -  PILLARS  -  Four dimensions of org intelligence (legacy)
─────────────────────────────────────────────────────────────── */
const PILLARS = [
  { n: "01", title: "Relationships", body: "Who knows who. Interaction history. Sentiment trends. Open commitments. Which relationships are warm  -  and which are dying." },
  { n: "02", title: "Authority",  body: "Who can approve what. Spending thresholds. Escalation chains. Policy constraints agents respect without being told twice." },
  { n: "03", title: "Operational State", body: "What’s live right now. Budget status. In-flight agent actions. Real-time awareness so no two agents ever work against each other." },
  { n: "04", title: "Past Decisions", body: "What happened before. Outcomes and reasoning. Situation matching so agents inherit institutional memory, not just instructions." },
];

const Pillars = () => (
  <section
  id="product"
  data-section data-label="§  -  FOUR DIMENSIONS  -  ONE CONTEXT LAYER" data-dark="false"
  className="sec-pad"
  style={{ padding: "clamp(60px,7vw,88px) 0", borderBottom: `0.5px solid ${T.lineStrong}`, background: T.paper2, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
  <SectionLabel>Four Dimensions of Org Intelligence</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 22 }}>
  One context layer.<br /><em className="em-wonk" style={{ color: T.brass }}>Every agent benefits.</em>
  </h2>
  <p style={{ fontSize: 16, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>
  Not a memory tool. Not another agent framework. GeniOS structures four fundamentally different types of organizational truth  -  each storing what no other layer captures.
  </p>
  </div>
  <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: T.lineStrong, border: `0.5px solid ${T.lineStrong}` }}>
  {PILLARS.map((p, i) => (
  <div key={i} style={{ background: T.paper, padding: "36px 28px", position: "relative", transition: "background .25s ease" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", color: T.stone, marginBottom: 24 }}>{p.n}</div>
  <div style={{ fontFamily: T.display, fontSize: 56, fontWeight: 300, color: T.ink, lineHeight: 1, marginBottom: 18, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144, 'SOFT' 20", opacity: 0.14 }}>§</div>
  <h3 style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em", color: T.ink, marginBottom: 14, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{p.title}</h3>
  <p style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.65 }}>{p.body}</p>
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone, marginTop: 22, border: `0.5px solid ${T.line}`, padding: "5px 12px", borderRadius: 100 }}>
  Details in demo
  </span>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  -  API SECTION  -  animated SDK code (legacy)
─────────────────────────────────────────────────────────────── */
const API_LINES = [
  { c: "cmt", t: "// 1. Install the GeniOS SDK" },
  { c: "cmd", t: "npm install @genios/sdk" },
  { c: "blank" },
  { c: "cmt", t: "// 2. Initialize with your org data sources" },
  { c: "pts", p: [{ s: "d", t: "const " }, { s: "k", t: "brain" }, { s: "d", t: " = new " }, { s: "v", t: "GeniOS" }, { s: "d", t: "({ apiKey: process.env.GENIOS_KEY })" }] },
  { c: "blank" },
  { c: "cmt", t: "// 3. Before any agent action  -  query org context" },
  { c: "pts", p: [{ s: "d", t: "const " }, { s: "k", t: "ctx" }, { s: "d", t: " = await " }, { s: "k", t: "brain" }, { s: "d", t: ".query({" }] },
  { c: "pts", p: [{ s: "i" }, { s: "k", t: "action" }, { s: "d", t: ": " }, { s: "s", t: '"process_payment"' }, { s: "d", t: "," }] },
  { c: "pts", p: [{ s: "i" }, { s: "k", t: "amount" }, { s: "d", t: ": " }, { s: "n", t: "12000" }, { s: "d", t: "," }] },
  { c: "pts", p: [{ s: "i" }, { s: "k", t: "vendor" }, { s: "d", t: ": " }, { s: "s", t: '"OpenAI"' }] },
  { c: "pts", p: [{ s: "d", t: "});" }] },
  { c: "blank" },
  { c: "cmt", t: "// ctx → full organizational context returned" },
  { c: "pts", p: [{ s: "d", t: "// { authorized: " }, { s: "n", t: "false" }, { s: "d", t: ", reason: " }, { s: "s", t: '"CFO threshold exceeded"' }, { s: "d", t: "," }] },
  { c: "pts", p: [{ s: "d", t: "//  escalate_to: " }, { s: "s", t: '"sarah@acme.com"' }, { s: "d", t: ", precedent: " }, { s: "s", t: '"Approved 2x. Avg: 4h"' }, { s: "d", t: " }" }] },
];
const API_SC = { cmt: "rgba(244,238,227,0.35)", d: "rgba(244,238,227,0.42)", cmd: "#B08946", k: "#B08946", v: "#A8C099", s: "#C88FAE", n: "#A8C099", i: "rgba(0,0,0,0)" };

const ApiSection = () => {
  const [ref, seen] = useInView(0.2);
  const [shown, setShown] = useState(0);
  useEffect(() => {
  if (!seen) return;
  if (shown === 0) { setShown(1); return; }
  if (shown >= API_LINES.length) return;
  const l = API_LINES[shown];
  const delay = l?.c === "blank" ? 55 : l?.c === "cmd" ? 150 : 95;
  const id = setTimeout(() => setShown(v => v + 1), delay);
  return () => clearTimeout(id);
  }, [seen, shown]);

  return (
  <section
  id="api"
  data-section data-label="§  -  API  -  ONE CALL, FULL CONTEXT" data-dark="true"
  className="sec-pad dark"
  ref={ref}
  style={{ padding: "clamp(40px,5vw,56px) 0", background: T.navy, color: T.paper, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
  <SectionLabel accent={T.brass2}>Developer First</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 22 }}>
  One API call.<br /><em className="em-wonk" style={{ color: T.brass }}>Full org context.</em>
  </h2>
  <p style={{ fontSize: 16, color: T.sand, lineHeight: 1.7, fontWeight: 300 }}>
  Drop GeniOS into any agent stack in minutes. Works with every LLM, every orchestration framework, every tool integration.
  </p>
  </div>
  <div style={{ background: "#060607", border: `0.5px solid ${T.lineDark}`, maxWidth: 820, margin: "0 auto", position: "relative" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 22px", background: "#0a0a0c", borderBottom: `0.5px solid ${T.lineDark}` }}>
  {["rgba(255,96,96,0.55)", "rgba(255,189,46,0.55)", "rgba(50,215,75,0.55)"].map((c, i) => <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "block" }} />)}
  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.sandDim, marginLeft: 10, letterSpacing: "0.04em" }}>agent.ts  -  genios SDK integration</span>
  </div>
  <div style={{ padding: "26px 34px 96px", fontFamily: T.mono, fontSize: 13, lineHeight: 1.9, minHeight: 360 }}>
  {API_LINES.slice(0, shown).map((l, i) => (
  <div key={i} style={{ minHeight: "1.9em" }}>
  {l.c === "blank" ? "\u00A0" :
  l.c === "cmt" ? <span style={{ color: API_SC.cmt }}>{l.t}</span> :
  l.c === "cmd" ? <span style={{ color: API_SC.cmd }}>{l.t}</span> :
  l.c === "pts" ? l.p.map((p, j) => <span key={j} style={{ color: API_SC[p.s] || T.sand }}>{p.t || "  "}</span>) :
  null}
  </div>
  ))}
  {shown > 0 && <span style={{ display: "inline-block", width: 8, height: 14, background: T.brass, verticalAlign: "middle", marginLeft: 3, animation: "nodePulse 1.1s step-end infinite" }} />}
  </div>
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "52px 32px 28px", background: "linear-gradient(to top,#060607 48%,transparent)", display: "flex", justifyContent: "center" }}>
  <Btn variant="primary" size="md" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request API Access
  </Btn>
  </div>
  </div>
  </Page>
  </section>
  );
};

/* ──────────────────────────────────────────────────────────────
  -  TESTIMONIALS  -  3 quotes (legacy verbatim)
─────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  { q: "We deployed 12 agents across finance and operations. Before GeniOS, we had three policy violations in the first week. After integrating the context layer, we’ve had zero in four months. The authority graph alone justified the entire investment.", name: "Prateek Agarwal", role: "Founder", co: "Closyng" },
  { q: "Every agent framework we tried gave us intelligent but organizationally blind agents. GeniOS solved the hardest problem  -  not how smart the agent is, but whether it understands who we are and how we work. That’s the layer that was always missing.", name: "Sneha Vats", role: "Engineer", co: "Gartner" },
  { q: "The autonomous execution rate metric is genuinely the right north star. We went from 30% to 72% in 90 days. My team stopped reviewing agent actions and started reviewing agent outcomes. That’s the shift we were building toward.", name: "Harsh Tripathi", role: "Sr. Engineer", co: "Hestabit" },
];

const Testimonials = () => (
  <section
  id="testimonials"
  data-section data-label="§  -  TESTIMONIALS  -  WHAT BUILDERS SAY" data-dark="false"
  className="sec-pad"
  style={{ padding: "clamp(60px,7vw,88px) 0", borderBottom: `0.5px solid ${T.lineStrong}`, background: T.paper, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
  <SectionLabel>What Builders Say</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(32px,4.2vw,54px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 22 }}>
  Trusted by engineering teams<br /><em className="em-wonk" style={{ color: T.brass }}>building at the frontier.</em>
  </h2>
  </div>
  <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
  {TESTIMONIALS.map((q, i) => (
  <div key={i} className="card-feature" style={{ padding: "36px 30px", display: "flex", flexDirection: "column" }}>
  <div style={{ position: "absolute", top: 18, right: 22, fontFamily: T.display, fontSize: 72, lineHeight: 1, color: "rgba(176,137,70,0.16)", fontWeight: 400, userSelect: "none", pointerEvents: "none", fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>"</div>
  <div style={{ marginBottom: 20 }}>
  {[0, 1, 2, 3, 4].map(si => <span key={si} style={{ color: T.brass, fontSize: 12, marginRight: 3 }}>★</span>)}
  </div>
  <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.8, flex: 1, marginBottom: 28, fontStyle: "italic", fontFamily: T.serif, position: "relative", zIndex: 1 }}>"{q.q}"</p>
  <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `0.5px solid ${T.line}`, paddingTop: 22, position: "relative", zIndex: 1 }}>
  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(176,137,70,0.1)", border: `0.5px solid ${T.brass}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, fontSize: 12, color: T.brass, fontWeight: 600, flexShrink: 0 }}>
  {q.name.split(" ").map(n => n[0]).join("")}
  </div>
  <div>
  <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: "-0.01em" }}>{q.name}</div>
  <div style={{ fontSize: 11, color: T.stone, fontFamily: T.mono, letterSpacing: "0.04em", marginTop: 2 }}>{q.role}  -  {q.co}</div>
  </div>
  </div>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  -  AGENT TAGLINE  -  closing statement (legacy)
─────────────────────────────────────────────────────────────── */
const AGENT_FEATURES = ["Model-agnostic", "Always-on context", "Self-improving graph", "Zero-retraining needed"];

const TERM_TABS = {
  SDK: {
  label: "SDK",
  title: "GeniOS SDK  -  Live",
  lines: [
  { type: "prompt", text: "> genios.remember(" },
  { type: "cmd",  text: '  "Sarah owns the OpenAI vendor deal"' },
  { type: "cmd",  text: ")" },
  { type: "out",  text: "✓ Stored  -  context node #4821" },
  { type: "blank" },
  { type: "prompt", text: "> genios.query({" },
  { type: "cmd",  text: '  action: "process_payment",' },
  { type: "cmd",  text: "  amount: 12000" },
  { type: "cmd",  text: "})" },
  { type: "out",  text: "✓ Authorized: false" },
  { type: "muted",  text: '  reason: "CFO threshold exceeded"' },
  { type: "muted",  text: '  escalate_to: "sarah@acme.com"' },
  { type: "blank" },
  { type: "prompt", text: "> _" },
  ],
  },
  API: {
  label: "API",
  title: "GeniOS API  -  REST",
  lines: [
  { type: "prompt", text: "POST /v1/context/query" },
  { type: "cmd",  text: "Authorization: Bearer gns_--------" },
  { type: "blank" },
  { type: "cmd",  text: "{" },
  { type: "cmd",  text: '  "agent_id": "sales-bot-01",' },
  { type: "cmd",  text: '  "action": "send_proposal",' },
  { type: "cmd",  text: '  "deal_id": "acme-q2"' },
  { type: "cmd",  text: "}" },
  { type: "blank" },
  { type: "out",  text: "200 OK" },
  { type: "muted",  text: '  "approved": true,' },
  { type: "muted",  text: '  "move": "Send exec summary first",' },
  { type: "muted",  text: '  "context_nodes": 38' },
  { type: "blank" },
  { type: "prompt", text: "_ " },
  ],
  },
  Plugins: {
  label: "Plugins",
  title: "GeniOS Plugins  -  Native",
  lines: [
  { type: "prompt", text: "# genios.yaml" },
  { type: "blank" },
  { type: "cmd",  text: "plugins:" },
  { type: "cmd",  text: "  - name: slack-watcher" },
  { type: "muted",  text: "  events: [message, reaction]" },
  { type: "cmd",  text: "  - name: crm-sync" },
  { type: "muted",  text: "  source: hubspot" },
  { type: "muted",  text: "  interval: 5m" },
  { type: "blank" },
  { type: "out",  text: "✓ slack-watcher  connected" },
  { type: "out",  text: "✓ crm-sync  syncing" },
  { type: "muted",  text: "  last_pull: 2m ago  -  14 new nodes" },
  { type: "blank" },
  { type: "prompt", text: "> _" },
  ],
  },
};

const TerminalCard = () => {
  const [ref, seen] = useInView(0.3);
  const [activeTab, setActiveTab] = useState("SDK");
  const [shown, setShown] = useState(0);
  const lines = TERM_TABS[activeTab].lines;

  useEffect(() => { setShown(0); }, [activeTab]);

  useEffect(() => {
  if (!seen) return;
  if (shown >= lines.length) return;
  const line = lines[shown];
  const delay = line.type === "blank" ? 60 : line.type === "prompt" ? 320 : 110;
  const id = setTimeout(() => setShown(v => v + 1), delay);
  return () => clearTimeout(id);
  }, [seen, shown, lines]);

  return (
  <div className="terminal-card" ref={ref}>
  <div className="terminal-header">
  <div className="terminal-dot" style={{ background: "#FF5F57" }} />
  <div className="terminal-dot" style={{ background: "#FEBC2E" }} />
  <div className="terminal-dot" style={{ background: "#28C840" }} />
  <span className="terminal-title">{TERM_TABS[activeTab].title}</span>
  {/* Tabs */}
  <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
  {Object.keys(TERM_TABS).map(tab => (
  <button
  key={tab}
  onClick={() => setActiveTab(tab)}
  style={{
  fontFamily: T.mono, fontSize: 10, letterSpacing: "0.1em",
  textTransform: "uppercase", border: "none", cursor: "pointer",
  padding: "3px 10px", borderRadius: 4,
  background: activeTab === tab ? "rgba(215,90,51,0.18)" : "transparent",
  color: activeTab === tab ? T.brass : "rgba(242,236,228,0.3)",
  transition: "all 0.15s",
  }}
  >{tab}</button>
  ))}
  </div>
  </div>
  <div className="terminal-body">
  {lines.slice(0, shown).map((line, i) => {
  if (line.type === "blank") return <div key={i} style={{ height: 8 }} />;
  return <div key={i} className={`t-${line.type}`}>{line.text}</div>;
  })}
  {shown < lines.length && <span className="t-cursor" />}
  </div>
  </div>
  );
};

const AgentTagline = () => (
  <section
  id="tagline"
  data-section data-label="§  -  NEW ERA  -  AGENTIC AI" data-dark="true"
  className="sec-pad"
  style={{ padding: "clamp(40px,5vw,56px) 0", background: T.navy, position: "relative" }}
  >
  <Page>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
  {/* Left: pitch text */}
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: T.brass, marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
  <span style={{ display: "inline-block", width: 28, height: 1, background: T.brass }} />
  A new era of agentic AI
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(28px,4vw,56px)", fontWeight: 400, letterSpacing: "-0.035em", lineHeight: 1.08, color: T.paper, marginBottom: 28, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  Agents don’t need to be <em className="em-wonk" style={{ color: "rgba(242,236,228,0.5)" }}>smarter.</em><br />
  They need to know <em className="em-wonk" style={{ color: T.brass }}>where they are.</em>
  </h2>
  <p style={{ fontSize: 15.5, fontWeight: 300, color: "rgba(242,236,228,0.6)", lineHeight: 1.75, marginBottom: 36 }}>
  The most capable agent in the world still fails without the context to act correctly inside your organization. GeniOS is the infrastructure that changes that  -  permanently.
  </p>
  <div className="agent-features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
  {AGENT_FEATURES.map((t, i) => (
  <span key={i} style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(242,236,228,0.55)", display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.brass, display: "block", flexShrink: 0, boxShadow: `0 0 6px ${T.brass}` }} />{t}
  </span>
  ))}
  </div>
  </div>
  {/* Right: animated terminal */}
  <TerminalCard />
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  -  BACKED BY & ADVISED BY (legacy)
─────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────
  -  TRUSTED / SUPPORTED BY  -  logo marquee
  Swap the placeholders below with real logos when ready.
  Each item accepts either:
  { name, src: "/logos/acme.svg" }  → renders the image
  { name }  -> renders a labelled placeholder slot
─────────────────────────────────────────────────────────────── */
const TRUSTED_DEVS = [
  { name: "IBM",  logo: "ibm" },
  { name: "Google",  logo: "google" },
  { name: "Founders Inc", src: "/logos/founders, inc.avif" },
  { name: "Antler",  src: "/logos/antler.png" },
  { name: "Adobe",  logo: "adobe" },
  { name: "Gartner",  logo: "gartner" },
  { name: "Hestabit",  logo: "hestabit" },
  { name: "IIITD" },
  { name: "20+ others",  logo: "others" },
];

const LogoSlot = ({ name, src, logo, dark }) => (
  <div className={`logo-slot${dark ? " dark" : ""}`} title={name}>
  {src
  ? <img src={src} alt={name} loading="lazy" />
  : logo
  ? <BrandLogo id={logo} />
  : null}
  </div>
);

const LogoMarquee = ({ items, reverse, dark, dual }) => {
  const loop = [...items, ...items];
  const half = Math.ceil(items.length / 2);
  const row1 = [...items.slice(0, half), ...items.slice(0, half)];
  const row2 = [...items.slice(half), ...items.slice(half)];
  if (dual) return (
  <div className="logo-dual-strip">
  <div className="logo-strip">
  <div className="logo-strip-track">
  {row1.map((item, i) => <LogoSlot key={i} {...item} dark={dark} />)}
  </div>
  </div>
  <div className="logo-strip">
  <div className="logo-strip-track rev">
  {row2.map((item, i) => <LogoSlot key={i} {...item} dark={dark} />)}
  </div>
  </div>
  </div>
  );
  return (
  <div className="logo-strip">
  <div className={`logo-strip-track${reverse ? " rev" : ""}`}>
  {loop.map((item, i) => <LogoSlot key={i} {...item} dark={dark} />)}
  </div>
  </div>
  );
};

const Traction = () => {
  const [ref, seen] = useInView(0.2);
  const count = useCountUp(2400, seen, 1800);
  return (
  <section
  id="trusted"
  ref={ref}
  data-section data-label="§  -  TRACTION  -  BACKED & TRUSTED" data-dark="true"
  style={{ padding: "clamp(40px,5vw,56px) 0", background: T.navy, position: "relative", overflow: "hidden" }}
  >
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 560, height: 280, background: "radial-gradient(ellipse,rgba(215,90,51,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
  <Page>
  <div style={{ textAlign: "center", marginBottom: 56 }}>
  <SectionLabel dark>Traction</SectionLabel>
  </div>
  <div className="traction-grid">
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.38)", marginBottom: 24, paddingBottom: 10, borderBottom: "0.5px solid rgba(242,236,228,0.1)" }}>Backed &amp; Supported by</div>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
  {BACKED.map((item, i) => (
  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "rgba(242,236,228,0.03)", border: "0.5px solid rgba(242,236,228,0.08)", borderRadius: 10 }}>
  <div style={{ width: 28, height: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
  <BrandLogo id={item.logo} />
  </div>
  <span style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(242,236,228,0.55)", letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</span>
  </div>
  ))}
  </div>
  </div>
  <div className="traction-divider" />
  <div style={{ textAlign: "center" }}>
  <div className="traction-hero-num">
  {count.toLocaleString()}+<em>devs</em>
  </div>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(242,236,228,0.42)", marginTop: 10, marginBottom: 36 }}>
  developers in private beta
  </div>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(242,236,228,0.32)", marginBottom: 18, paddingBottom: 10, borderBottom: "0.5px solid rgba(242,236,228,0.1)" }}>
  Engineers from
  </div>
  <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
  {ADVISED.map((item, i) => (
  <div key={i} title={item.name} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7, transition: "opacity .2s", cursor: "default" }}
  onMouseEnter={e => e.currentTarget.style.opacity = 1}
  onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
  <BrandLogo id={item.logo} />
  </div>
  ))}
  </div>
  </div>
  </div>
  <div style={{ marginTop: 56, paddingTop: 48, borderTop: "0.5px solid rgba(242,236,228,0.08)" }}>
  <div style={{ textAlign: "center", marginBottom: 36 }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.32)", marginBottom: 12 }}>Trusted by builders from</div>
  <div style={{ fontFamily: T.display, fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 600, color: "rgba(242,236,228,0.88)", lineHeight: 1.2 }}>Engineers who know what real tools feel like</div>
  </div>
  <LogoMarquee items={TRUSTED_DEVS} dark dual />
  </div>
  </Page>
  </section>
  );
};

const BACKED = [
  { name: "NVIDIA Inception", logo: "nvidia" },
  { name: "NSRCEL  -  IIMB",  logo: "iimb" },
  { name: "IIITD-IC",  logo: "iiitd" },
  { name: "Microsoft",  logo: "microsoft" },
];
const ADVISED = [
  { name: "Aakriti Aggarwal  -  Sr. AI Engineer  -  IBM",  logo: "ibm" },
  { name: "Shiv Kumar Sah  -  DevOps Engineer  -  Adobe",  logo: "adobe" },
  { name: "Pratiksha Aggarwal  -  SDE  -  Google",  logo: "google" },
  { name: "Arka Mazumder  -  SDE-II  -  Google",  logo: "google" },
];

const BrandLogo = ({ id }) => {
  const L = {
  nvidia:  <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#76B90018"/><text x="14" y="20" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="15" fontWeight="900" fill="#76B900">N</text></svg>,
  iimb:  <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#1d4ed820"/><text x="14" y="18" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="10" fontWeight="900" fill="#60a5fa">IIMB</text></svg>,
  iiitd:  <svg viewBox="0 0 60 24" width="60" height="24"><text x="1" y="18" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="800" fill="#111" letterSpacing="-0.3">IIITD</text></svg>,
  microsoft: <svg viewBox="0 0 28 28" width="28" height="28"><rect x="3" y="3" width="10" height="10" fill="#F25022"/><rect x="15" y="3" width="10" height="10" fill="#7FBA00"/><rect x="3" y="15" width="10" height="10" fill="#00A4EF"/><rect x="15" y="15" width="10" height="10" fill="#FFB900"/></svg>,
  ibm:  <svg viewBox="0 0 62 22" width="62" height="22"><defs><mask id="ibm-mask"><rect x="0" y="0" width="62" height="3" fill="white"/><rect x="0" y="4.8" width="62" height="3" fill="white"/><rect x="0" y="9.6" width="62" height="3" fill="white"/><rect x="0" y="14.4" width="62" height="3" fill="white"/><rect x="0" y="19.2" width="62" height="3" fill="white"/></mask></defs><rect x="0" y="0" width="10" height="22" fill="#111" mask="url(#ibm-mask)"/><rect x="14" y="0" width="4" height="22" fill="#111" mask="url(#ibm-mask)"/><rect x="18" y="0" width="7" height="11" fill="#111" mask="url(#ibm-mask)"/><ellipse cx="25" cy="5.5" rx="5" ry="5.5" fill="#111" mask="url(#ibm-mask)"/><rect x="18" y="11" width="8" height="11" fill="#111" mask="url(#ibm-mask)"/><ellipse cx="26.5" cy="16.5" rx="5.5" ry="5.5" fill="#111" mask="url(#ibm-mask)"/><rect x="36" y="0" width="4" height="22" fill="#111" mask="url(#ibm-mask)"/><rect x="56" y="0" width="4" height="22" fill="#111" mask="url(#ibm-mask)"/><polygon points="40,0 48,13 56,0" fill="#111" mask="url(#ibm-mask)"/></svg>,
  adobe:  <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#FF0000"/><path d="M14 5l7 18h-4.5l-1.5-4h-6L7.5 23H3L10 5h4zm0 5.5L12 17h4l-2-6.5z" fill="white"/></svg>,
  google:  <svg viewBox="0 0 28 28" width="28" height="28"><rect width="28" height="28" rx="5" fill="#ffffff"/><path d="M22 14.2c0-.7-.1-1.3-.2-1.9H14v3.5h4.5c-.2 1-.8 1.9-1.7 2.5v2h2.7c1.6-1.5 2.5-3.6 2.5-6.1z" fill="#4285F4"/><path d="M14 23c2.2 0 4.1-.7 5.5-2l-2.7-2c-.7.5-1.7.8-2.8.8-2.1 0-3.9-1.4-4.6-3.4H6.6v2.1C8 21.4 10.8 23 14 23z" fill="#34A853"/><path d="M9.4 16.4c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6v-2.1H6.6C6 12.3 5.7 13.1 5.7 14s.3 1.7.9 2.4l2.8-2z" fill="#FBBC05"/><path d="M14 9.6c1.2 0 2.3.4 3.1 1.2l2.3-2.3C17.9 7.3 16.1 6.5 14 6.5c-3.2 0-6 1.6-7.4 4l2.8 2.1c.7-2 2.5-3 4.6-3z" fill="#EA4335"/></svg>,
  foundersInc: <svg viewBox="0 0 80 24" width="80" height="24"><text x="1" y="18" fontFamily="Arial, Helvetica, sans-serif" fontSize="14" fontWeight="800" fill="#111" letterSpacing="-0.2">Founders Inc</text></svg>,
  antler:  <svg viewBox="0 0 60 24" width="60" height="24"><text x="1" y="18" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="800" fill="#111" letterSpacing="-0.3">Antler</text></svg>,
  gartner:  <svg viewBox="0 0 100 24" width="100" height="24"><text x="1" y="19" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="800" fill="#111" letterSpacing="-0.5">Gartner</text></svg>,
  hestabit:  <svg viewBox="0 0 112 24" width="112" height="24"><text x="1" y="19" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="700" fill="#111" letterSpacing="-0.3">HestaBit</text></svg>,
  others:  <svg viewBox="0 0 28 28" width="28" height="28"><circle cx="14" cy="14" r="12.5" fill="none" stroke="#A79E9C" strokeWidth="1" strokeDasharray="3 2"/><text x="14" y="18" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="700" fill="#A79E9C">20+</text></svg>,
  };
  return L[id] || null;
};

const BackedBy = () => (
  <section
  id="backed"
  data-section data-label="§  -  BACKED & ADVISED BY" data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(40px,5vw,56px) 0", background: T.paper, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", marginBottom: 56 }}>
  <SectionLabel>Backed & Advised By</SectionLabel>
  </div>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
  {[{ label: "Backed by", items: BACKED }, { label: "Advised by", items: ADVISED }].map((group, gi) => (
  <div key={gi}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 20, paddingBottom: 10, borderBottom: `0.5px solid ${T.line}` }}>{group.label}</div>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
  {group.items.map((item, i) => (
  <div key={i} className="card" style={{ padding: "20px 18px" }}>
  <div style={{ width: 30, height: 30, background: "rgba(176,137,70,0.08)", border: `0.5px solid rgba(176,137,70,0.3)`, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
  <BrandLogo id={item.logo} />
  </div>
  <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
  </div>
  ))}
  </div>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  -  COMMUNITY  -  connect (legacy)
─────────────────────────────────────────────────────────────── */
const COMMUNITY = [
  { label: "Founder", desc: "Connect with Rohit Swerashi.", cta: "Connect", href: "https://www.linkedin.com/in/rohitswerashi/" },
  { label: "GeniOS",  desc: "Follow us on LinkedIn.",  cta: "Follow",  href: "https://www.linkedin.com/company/thegenios/" },
];

const Community = () => (
  <section
  id="community"
  data-section data-label="§  -  CONNECT  -  THE JOURNEY" data-dark="true"
  className="sec-pad"
  style={{ padding: "clamp(40px,5vw,56px) 0", background: T.navy, position: "relative" }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
  <SectionLabel dark>Connect with Us</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(30px,4vw,48px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 20 }}>
  Follow our journey<br /><em className="em-wonk" style={{ color: T.brass }}>building context infrastructure.</em>
  </h2>
  </div>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, maxWidth: 800, margin: "0 auto" }}>
  {COMMUNITY.map((ch, i) => (
  <a key={i} href={ch.href} target="_blank" rel="noopener noreferrer" className="card-dk" style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 18, textDecoration: "none" }}>
  <div style={{ width: 40, height: 40, background: "rgba(215,90,51,0.12)", border: `0.5px solid ${T.brass}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={T.brass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>
  </div>
  <div style={{ flex: 1, minWidth: 0 }}>
  <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 600, color: T.paper, marginBottom: 4, letterSpacing: "-0.01em" }}>{ch.label}</div>
  <div style={{ fontSize: 13, color: "rgba(242,236,228,0.5)", lineHeight: 1.5 }}>{ch.desc}</div>
  </div>
  <span className="btn btn-secondary btn-sm">
  {ch.cta} <span className="btn-arrow">→</span>
  </span>
  </a>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  05  -  PRICING
─────────────────────────────────────────────────────────────── */
const TALLY_URL = "https://tally.so/r/xX2jj9";
const CAL_URL  = "https://cal.com/rohitswerashi/genios-partners";

const PRICING_TIERS = [
  {
  id: "early", no: "Plan  -  01", name: "Early",
  tag: "Start reasoning over org context with 3 agents and core graph layers.",
  price: 25, original: 35,
  features: [
  "3 AI agents",
  "Limited data sources",
  "10k context calls / month",
  "Relationship & Authority graphs",
  "Email support",
  ],
  cta: "Apply for Early Access",
  },
  {
  id: "startup", no: "Plan  -  02", name: "Startup",
  tag: "Full intelligence stack  -  all 4 graph layers, proactive push, Sonnet-cascade reasoning.",
  price: 149, original: 199, popular: true,
  features: [
  "10 AI agents",
  "Unlimited data sources",
  "100k context calls / month",
  "All 4 intelligence graph layers",
  "Priority support + white-glove onboarding",
  ],
  cta: "Apply for Early Access",
  },
  {
  id: "scale", no: "Plan  -  03", name: "Scale",
  tag: "Org-wide deployment with dedicated reasoning infrastructure and custom connector support.",
  price: null,
  features: [
  "Unlimited AI agents",
  "Unlimited data sources",
  "Unlimited context calls",
  "On-premise deployment",
  "Dedicated success team",
  ],
  cta: "Contact Sales",
  },
];

const PricingCard = ({ no, name, tag, price, original, popular, features, cta, founding }) => (
  <div className={popular ? "pricing-v2 pop" : "pricing-v2"} style={{ borderRadius: 14 }}>
  {popular && (
  <div className="pc-badge" style={{ position: "absolute", top: 16, right: 16 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: T.paper, background: T.brass, padding: "5px 12px", borderRadius: 100, fontWeight: 600 }}>Most Popular</span>
  </div>
  )}

  <div className="pc-no" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 14 }}>
  {no}
  </div>
  <div className="pc-name" style={{ fontFamily: T.display, fontSize: 30, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", color: T.ink, marginBottom: 6, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {name}
  </div>
  <div className="pc-tag" style={{ fontSize: 13.5, color: T.stone, marginBottom: 28, lineHeight: 1.45 }}>{tag}</div>

  {price !== null ? (
  <div className="pc-price-block" style={{ marginBottom: 28 }}>
  <div className="pc-price-row" style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
  <span className="pc-price" style={{ fontFamily: T.display, fontSize: 56, fontWeight: 400, letterSpacing: "-0.035em", color: T.ink, lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>
  ${founding ? Math.round(price * 0.5) : price}
  </span>
  <span style={{ fontFamily: T.mono, fontSize: 12, color: T.stone }}>/mo</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  {founding
  ? <span style={{ fontFamily: T.mono, fontSize: 11, color: T.stone, textDecoration: "line-through" }}>${price}/mo</span>
  : original && <span style={{ fontFamily: T.mono, fontSize: 11, color: T.stone, textDecoration: "line-through" }}>${original}/mo</span>
  }
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: T.brass, background: "rgba(176,137,70,0.08)", border: `0.5px solid ${T.brass}`, padding: "3px 9px", borderRadius: 100 }}>
  {founding ? "Founding Customer" : "Early Pricing"}
  </span>
  </div>
  </div>
  ) : (
  <div style={{ marginBottom: 28 }}>
  <span className="pc-price" style={{ fontFamily: T.display, fontSize: 48, fontWeight: 400, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 40" }}>
  <em className="em-wonk">Custom</em>
  </span>
  <p style={{ fontFamily: T.mono, fontSize: 10, color: T.stone, marginTop: 8, letterSpacing: "0.18em", textTransform: "uppercase" }}>
  Contact for quote
  </p>
  </div>
  )}

  <div className="pc-divider" style={{ height: 1, background: T.line, marginBottom: 22 }} />

  <ul className="pc-features" style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
  {features.map((f, j) => (
  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: T.ink2, lineHeight: 1.55, marginBottom: 11 }}>
  <span style={{ color: popular ? T.brass : T.stone, fontFamily: T.mono, fontSize: 11, flexShrink: 0, marginTop: 2, opacity: popular ? 1 : 0.7 }}>→</span>
  {f}
  </li>
  ))}
  </ul>

  <Btn
  variant={popular ? "primary" : "secondary"}
  size="md"
  arrow="right"
  href={TALLY_URL}
  target="_blank"
  rel="noopener noreferrer"
  style={{ width: "100%", justifyContent: "center" }}
  >
  {cta}
  </Btn>
  </div>
);

const Pricing = () => {
  const [annual, setAnnual] = React.useState(false);
  const [founding, setFounding] = React.useState(false);
  return (
  <section
  id="pricing"
  data-section data-label="§ 05  -  PRICING  -  SIMPLE, SERIOUS" data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper, position: "relative" }}
  >
  <Page>
  <SectionLabel>05  -  Pricing</SectionLabel>
  <H2>
  Simple pricing.<br />
  <em className="em-wonk" style={{ color: T.brass }}>Serious intelligence.</em>
  </H2>
  <Kicker>
  No contracts, no lock-in. Cancel any time.
  </Kicker>

  {/* Founding Customer toggle */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 40 }}>
  <span style={{ fontFamily: T.mono, fontSize: 12, color: founding ? T.stone : T.ink, letterSpacing: "0.08em" }}>Regular</span>
  <button
  onClick={() => setFounding(f => !f)}
  style={{ width: 48, height: 26, borderRadius: 100, background: founding ? T.brass : T.line, border: "none", cursor: "pointer", position: "relative", transition: "background .25s", padding: 0 }}
  aria-label="Toggle founding customer pricing"
  >
  <span style={{ position: "absolute", top: 3, left: founding ? 24 : 3, width: 20, height: 20, borderRadius: "50%", background: T.paper, transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }} />
  </button>
  <span style={{ fontFamily: T.mono, fontSize: 12, color: founding ? T.ink : T.stone, letterSpacing: "0.08em" }}>
  Founding Customer <span style={{ color: T.brass, fontWeight: 600 }}>-50%</span>
  </span>
  </div>

  {/* Cohort banner */}
  <div className="cohort-pill" style={{ display: "inline-flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center", background: "rgba(176,137,70,0.06)", border: `0.5px solid ${T.brass}`, borderRadius: 100, padding: "10px 22px 10px 14px", marginBottom: 48 }}>
  <span style={{ background: T.brass, color: T.paper, fontFamily: T.mono, fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100 }}>
  Founding Customers
  </span>
  <span style={{ fontFamily: T.body, fontSize: 14, fontWeight: 400, color: T.ink2 }}>
  50% off until 2030  -  <strong style={{ color: T.brass, fontWeight: 600 }}>let’s build towards AGI together.</strong>
  </span>
  </div>

  <div className="g3 pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignItems: "stretch" }}>
  {PRICING_TIERS.map((tier) => <PricingCard key={tier.id} {...tier} annual={annual} founding={founding} />)}
  </div>

  <p style={{ textAlign: "center", marginTop: 56, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone }}>
  All plans include a 14-day free trial  -  No credit card required  -  Founding rate guaranteed as long as you stay
  </p>
  </Page>
  </section>
  );
};

/* ──────────────────────────────────────────────────────────────
  06  -  FAQ
─────────────────────────────────────────────────────────────── */
const FAQS = [
  {
  q: "How is GeniOS different from Mem0, Zep, or Supermemory?",
  a: "Those are retrieval layers  -  they fetch facts when the agent knows to ask. GeniOS reasons over those facts continuously, without being asked. Section A stores what’s true about your org; Section B watches the graph 24/7 and pushes recommendations when patterns emerge. Mem0 answers queries. GeniOS initiates.",
  },
  {
  q: "What data do you store?",
  a: "Extracted facts  -  entities, relationships, events, state snapshots  -  not raw email bodies or message verbatim. Data is encrypted at rest with per-tenant keys (AES-256, KMS-wrapped) and TLS 1.3 in transit. You can export everything or delete everything with a single API call. GDPR-compliant by default.",
  },
  {
  q: "How quickly can my agent start using GeniOS?",
  a: "Sign up with Google SSO, connect Gmail + Calendar via OAuth (~3 minutes), and the backfill runs over 4-6 hours for 90 days of history. Your agent can hit the Pull API within minutes; proactive recommendations begin firing within 24 hours as the graph calibrates.",
  },
  {
  q: "Which AI frameworks does it work with?",
  a: "Framework-agnostic. Works with LangGraph, CrewAI, Autogen, Anthropic SDK, OpenAI Agent SDK, n8n, or any custom orchestration. Typed SDKs for Python, TypeScript, and Go, plus a first-class MCP server for Claude Desktop, Claude Code, and Cursor.",
  },
  {
  q: "Can I self-host?",
  a: "Scale tier only  -  we deploy into your VPC with customer-managed KMS, dedicated Postgres, and on-prem model routing. Shared tiers are managed SaaS in ap-south-1 and us-east-1. Migration from shared to dedicated is supported.",
  },
  {
  q: "What is the SLA?",
  a: "Startup tier: 99.5% uptime, 24-hour support response. Scale: 99.9% uptime, 4-hour response, dedicated success engineer. Pull API p95 latency target: under 400ms. Benchmarks published quarterly.",
  },
  {
  q: "What happens to my data if I leave?",
  a: "Full export of raw facts via API before cancellation. 30-day grace period before deletion. Audit trail retained (anonymized) per compliance requirements. The tuning accumulated over months is not exportable by nature  -  but that is true of any learning system.",
  },
];

const FAQ = () => (
  <section
  id="faq"
  data-section data-label="§ 06  -  FREQUENTLY ASKED  -  SEVEN QUESTIONS" data-dark="false"
  className="sec-pad"
  style={{ padding: "clamp(60px,7vw,88px) 0", borderBottom: `0.5px solid ${T.lineStrong}`, background: T.paper2, position: "relative" }}
  >
  <Page narrow>
  <SectionLabel>06  -  Frequently Asked</SectionLabel>
  <H2>
  Honest answers<br />to <em className="em-wonk" style={{ color: T.brass }}>the hard questions.</em>
  </H2>
  <Kicker>
  If you are evaluating memory products for an agent in production, these are the questions that matter. Direct, not marketing.
  </Kicker>

  <div style={{ borderTop: `0.5px solid ${T.lineStrong}`, marginTop: 24 }}>
  {FAQS.map((f, i) => (
  <div key={i} style={{ padding: "36px 0", borderBottom: `0.5px solid ${T.lineStrong}`, display: "grid", gridTemplateColumns: "80px 1fr", gap: 32, alignItems: "start" }}>
  <div style={{ fontFamily: T.display, fontSize: 44, fontWeight: 300, color: T.brass, lineHeight: 1, letterSpacing: "-0.03em", fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>
  {String(i + 1).padStart(2, "0")}
  </div>
  <div>
  <div style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.015em", color: T.ink, marginBottom: 14, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {f.q}
  </div>
  <p style={{ fontSize: 15, lineHeight: 1.65, color: T.ink2, maxWidth: 720 }}>
  {f.a}
  </p>
  </div>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  07  -  REQUEST ACCESS
─────────────────────────────────────────────────────────────── */
{/* Variant A  -  large centered, pulsing signal (homepage mid-page) */}
const RequestAccess = () => (
  <section
  id="request"
  data-section data-label="§ 07  -  REQUEST ACCESS  -  COHORT ZERO" data-dark="true"
  style={{
  padding: "clamp(60px,7vw,88px) 0",
  background: T.navy,
  color: T.paper,
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
  }}
  >
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(242,236,228,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(242,236,228,0.028) 1px, transparent 1px)`, backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)", pointerEvents: "none" }} />
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(900px,90vw)", height: 400, background: "radial-gradient(ellipse,rgba(215,90,51,0.12) 0%,rgba(215,90,51,0.04) 40%,transparent 70%)", pointerEvents: "none" }} />
  <Page>
  <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: T.mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, marginBottom: 28 }}>
  <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.brass, animation: "orbPulse 2s ease-in-out infinite", display: "inline-block" }} />
  Private Beta  -  Now Open
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(40px,5.5vw,80px)", fontWeight: 300, lineHeight: 1.04, letterSpacing: "-0.04em", color: T.paper, marginBottom: 20, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>
  Your agents are ready.<br /><em className="em-wonk" style={{ color: T.brass }}>Give them a brain.</em>
  </h2>
  <p style={{ fontFamily: T.body, fontSize: "clamp(16px,1.5vw,18px)", lineHeight: 1.6, color: "rgba(242,236,228,0.6)", maxWidth: 600, margin: "0 auto 44px" }}>
  GeniOS is in private beta. We’re onboarding teams building real agent products who need more than retrieval  -  teams that need their agents to think.
  </p>
  <Btn variant="primary" size="lg" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request Access
  </Btn>
  <p style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(242,236,228,0.3)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 24 }}>
  Limited spots  -  No waitlist theater  -  Direct onboarding
  </p>
  </div>
  </Page>
  </section>
);

{/* Variant B  -  two-column with value props (Thesis / Insights end) */}
const RequestAccessB = () => (
  <section
  data-section data-label="§  -  REQUEST ACCESS  -  FURTHER READING" data-dark="true"
  style={{ padding: "clamp(72px,9vw,120px) clamp(24px,5vw,60px)", background: T.navy, color: T.paper, position: "relative", overflow: "hidden", textAlign: "center" }}
  >
  <div style={{ maxWidth: 620, margin: "0 auto" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: T.brass, marginBottom: 28 }}>
  Thesis v1.0  -  Genios  -  2026
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.032em", color: T.paper, marginBottom: 36, fontVariationSettings: "'opsz' 144, 'SOFT' 20", fontStyle: "italic" }}>
  The reasoning layer is being built.<br />Get early access.
  </h2>
  <Btn variant="primary" size="lg" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request Access
  </Btn>
  </div>
  </section>
);

{/* Variant C  -  minimal editorial (Applications end) */}
const RequestAccessC = () => (
  <section
  id="request"
  data-section data-label="§  -  REQUEST ACCESS  -  CLOSE" data-dark="true"
  style={{ padding: "clamp(88px,11vw,144px) 0", background: T.navy, color: T.paper, position: "relative", overflow: "hidden", textAlign: "center", borderTop: "1px solid rgba(215,90,51,0.32)" }}
  >
  {/* grid */}
  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(242,236,228,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.04) 1px,transparent 1px)`, backgroundSize: "68px 68px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 10%,transparent 80%)", pointerEvents: "none" }} />
  {/* glow */}
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(680px,90vw)", height: 280, background: "radial-gradient(ellipse,rgba(215,90,51,0.11) 0%,rgba(215,90,51,0.03) 55%,transparent 75%)", pointerEvents: "none" }} />
  <Page>
  <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, lineHeight: 1.04, letterSpacing: "-0.04em", color: T.paper, marginBottom: 20, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>
  Ready to give your<br />
  <em className="em-wonk" style={{ color: T.brass }}>agents a brain?</em>
  </h2>
  <p style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.08em", color: "rgba(242,236,228,0.45)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
  Two-minute setup. No ramp period. Your agents start acting on org context from day one.
  </p>
  <Btn variant="primary" size="lg" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request Early Access
  </Btn>
  </div>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  FOOTER  -  editorial 4-column, cream bg
─────────────────────────────────────────────────────────────── */
const FOOTER_COLS = [
  {
  title: "Pages",
  items: [
  { label: "Thesis",  to: "/thesis" },
  { label: "Insights",  to: "/insights" },
  { label: "Applications",  to: "/applications" },
  { label: "Essays",  to: "/blogs" },
  { label: "Programs",  to: "/startup-program" },
  ],
  },
  {
  title: "Product",
  items: [
  { label: "Context Graph",  href: "#" },
  { label: "Context Intelligence", href: "#" },
  { label: "Integrations",  href: "#" },
  { label: "ContextKit OSS",  href: "#" },
  ],
  },
  {
  title: "Company",
  items: [
  { label: "Team",  href: "#" },
  { label: "Principles", href: "#" },
  { label: "Security",  href: "#" },
  { label: "Contact",  href: "#" },
  ],
  },
];

const PreFooter = () => (
  <div className="prefooter">
  <div className="prefooter-bg" />
  <div className="prefooter-glow" />
  <div style={{ position: "relative", zIndex: 1 }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(242,236,228,0.35)", marginBottom: 28 }}>
  GeniOS  -  Context Infrastructure
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.04em", color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 20", marginBottom: 16, maxWidth: 800, margin: "0 auto 16px" }}>
  The intelligence layer.<br />
  <em style={{ fontStyle: "italic", color: T.brass, fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>For AI agents.</em>
  </h2>
  <p style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.1em", color: "rgba(242,236,228,0.45)", marginBottom: 40 }}>
  Stores your org’s context. Reasons over it continuously. Tells your agents the move.
  </p>
  <Btn variant="primary" size="lg" arrow="right" href={CAL_URL} target="_blank" rel="noopener noreferrer">
  Request Access
  </Btn>
  </div>
  </div>
);

const FOOTER_SOCIALS = [
  {
  label: "X / Twitter",
  href: "https://x.com/the_genios",
  icon: (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
  ),
  },
  {
  label: "LinkedIn",
  href: "https://www.linkedin.com/company/thegenios/",
  icon: (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
  ),
  },
  {
  label: "GitHub",
  href: "https://github.com/geniosbrain",
  icon: (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
  ),
  },
];

/* LLM brand logos  -  monochrome SVG marks */
const FOOTER_LLMS = [
  {
  name: "ChatGPT",
  icon: (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
  ),
  },
  {
  name: "Claude",
  icon: (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.57 3.52zm2.7 4.885l-2.05 5.297h4.1l-2.05-5.297z"/>
  </svg>
  ),
  },
  {
  name: "Gemini",
  icon: (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.304 14.304 0 0 0 12 12 14.304 14.304 0 0 0-12 12"/>
  </svg>
  ),
  },
  {
  name: "Perplexity",
  icon: (
  <svg width="18" height="18" viewBox="0 0 28 37" fill="none" stroke="currentColor" strokeWidth="1" strokeMiterlimit="10">
  <path d="m23.566,1.398l-9.495,9.504h9.495V1.398v2.602V1.398Zm-9.496,9.504L4.574,1.398v9.504h9.496Zm-.021-10.902v36m9.517-15.596l-9.495-9.504v13.625l9.495,9.504v-13.625Zm-18.991,0l9.496-9.504v13.625l-9.496,9.504v-13.625ZM.5,10.9v13.57h4.074v-4.066l9.496-9.504H.5Zm13.57,0l9.495,9.504v4.066h4.075v-13.57h-13.57Z"/>
  </svg>
  ),
  },
  {
  name: "xAI",
  icon: (
  <svg width="18" height="18" viewBox="0 0 841.89 595.28" fill="currentColor">
  <polygon points="557.09,211.99 565.4,538.36 631.96,538.36 640.28,93.18"/>
  <polygon points="640.28,56.91 538.72,56.91 379.35,284.53 430.13,357.05"/>
  <polygon points="201.61,538.36 303.17,538.36 353.96,465.84 303.17,393.31"/>
  <polygon points="201.61,211.99 430.13,538.36 531.69,538.36 303.17,211.99"/>
  </svg>
  ),
  },
];

const Footer = () => (
  <footer className="cream-card" style={{ background: T.paper, position: "relative", overflow: "hidden", padding: "0" }}>

  {/* ── GENIOS WATERMARK ── */}
  <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none", userSelect: "none", zIndex: 0 }}>
  <span style={{
  fontFamily: T.orbit,
  fontSize: "clamp(100px,17vw,240px)",
  fontWeight: 700,
  letterSpacing: "0.18em",
  color: T.ink,
  opacity: 0.055,
  lineHeight: 1,
  whiteSpace: "nowrap",
  textTransform: "uppercase",
  display: "block",
  }}>GENIOS</span>
  </div>

  <Page style={{ position: "relative", zIndex: 1 }}>
  <div className="footer-content-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", paddingTop: 80 }}>

  {/* ── LEFT  -  logo  -  description  -  links ── */}
  <div>
  <Link to="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: 10 }}>
  <span style={{ fontFamily: T.orbit, fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", color: T.ink, lineHeight: 1 }}>
  Geni<span style={{ color: T.brass }}>OS</span>
  </span>
  </Link>
  <p style={{ fontSize: 13, lineHeight: 1.6, color: T.slate, maxWidth: 240, marginBottom: 20 }}>
  Context Brain for AI agents. Stores your org’s context, reasons over it, and delivers the move  -  before your agents ask.
  </p>
  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
  {[
  { label: "The Founder", href: "https://www.linkedin.com/in/rohitswerashi/", external: true },
  { label: "Privacy Policy", href: "/privacy-policy" },
  ].map((l) => l.external ? (
  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{
  display: "inline-flex", alignItems: "center", gap: 10,
  fontSize: 12.5, color: T.ink3, textDecoration: "none",
  fontFamily: T.body, letterSpacing: "0.01em",
  }}>
  <span style={{ display: "inline-block", width: 14, height: "0.5px", background: T.stone, flexShrink: 0 }} />
  {l.label}
  </a>
  ) : (
  <Link key={l.label} to={l.href} className="footer-link" style={{
  display: "inline-flex", alignItems: "center", gap: 10,
  fontSize: 12.5, color: T.ink3, textDecoration: "none",
  fontFamily: T.body, letterSpacing: "0.01em",
  }}>
  <span style={{ display: "inline-block", width: 14, height: "0.5px", background: T.stone, flexShrink: 0 }} />
  {l.label}
  </Link>
  ))}
  </div>
  </div>

  {/* ── RIGHT  -  socials  -  LLM logos ── */}
  <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-end" }}>

  {/* Social icons  -  black squares */}
  <div style={{ display: "flex", gap: 8 }}>
  {FOOTER_SOCIALS.map((s) => (
  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
  style={{
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 34, height: 34, borderRadius: 3,
  background: T.ink, color: T.paper,
  transition: "background .2s, transform .2s",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.background = T.brass; e.currentTarget.style.transform = "translateY(-2px)"; }}
  onMouseLeave={(e) => { e.currentTarget.style.background = T.ink; e.currentTarget.style.transform = "translateY(0)"; }}
  >
  {s.icon}
  </a>
  ))}
  </div>

  {/* LLM logos  -  "Known by" */}
  <div style={{ textAlign: "right" }}>
  <div style={{
  fontFamily: T.mono, fontSize: 9, letterSpacing: "0.26em",
  textTransform: "uppercase", color: T.stone,
  marginBottom: 10, display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end",
  }}>
  <span style={{ display: "inline-block", width: 20, height: "0.5px", background: T.stone }} />
  Known by leading AI
  <span style={{ display: "inline-block", width: 20, height: "0.5px", background: T.stone }} />
  </div>
  <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", alignItems: "center" }}>
  {FOOTER_LLMS.map((llm) => (
  <div key={llm.name} title={llm.name} style={{
  display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
  color: T.ink3, opacity: 0.55,
  transition: "opacity .2s",
  cursor: "default",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.55"; }}
  >
  {llm.icon}
  <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
  {llm.name}
  </span>
  </div>
  ))}
  </div>
  </div>

  {/* Contact */}
  <div style={{ textAlign: "right", marginTop: 4 }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: T.stone, marginBottom: 6 }}>Contact</div>
  <a href="mailto:hello@thegenios.com" style={{ fontFamily: T.mono, fontSize: 11, color: T.brassDeep, textDecoration: "none", letterSpacing: "0.04em" }}>hello@thegenios.com</a>
  </div>

  </div>
  </div>

  {/* ── BOTTOM BAR ── */}
  <div style={{
  borderTop: `0.5px solid ${T.line}`, marginTop: 28, paddingTop: 12,
  display: "flex", justifyContent: "space-between", alignItems: "center",
  flexWrap: "wrap", gap: 10,
  fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.12em",
  textTransform: "uppercase", color: T.stone,
  }}>
  <span>🇮🇳 Built for the world, from India  -  GeniOS 2026</span>
  <span style={{ fontFamily: T.mono, letterSpacing: "0.14em", color: T.ink3 }}>The Operating System of Intelligence</span>
  </div>
  </Page>
  </footer>
);

/* ──────────────────────────────────────────────────────────────
  PAGE INTRO  -  slim chapter-page hero (used on all non-home pages)
─────────────────────────────────────────────────────────────── */
const PageIntro = ({ chapter, breadcrumb, title, italic, lede, dark }) => (
  <section
  data-section data-label={`§  -  ${(breadcrumb || "").toUpperCase()}  -  INTRO`} data-dark={dark ? "true" : "false"}
  style={{
  background: dark ? T.navy : T.paper,
  color: dark ? T.paper : T.ink,
  padding: "clamp(84px,10vw,140px) clamp(24px,5vw,60px) clamp(64px,8vw,100px)",
  borderBottom: dark ? `0.5px solid rgba(242,236,228,0.12)` : `0.5px solid ${T.lineDark}`,
  position: "relative",
  overflow: "hidden",
  }}>
  {/* glow */}
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 400, borderRadius: "50%", background: dark ? "radial-gradient(ellipse,rgba(215,90,51,0.18) 0%,rgba(215,90,51,0.05) 45%,transparent 72%)" : "radial-gradient(ellipse,rgba(176,137,70,0.09) 0%,rgba(176,137,70,0.02) 45%,transparent 72%)", pointerEvents: "none", zIndex: 1 }} />
  {/* grid */}
  <div style={{ position: "absolute", inset: 0, backgroundImage: dark ? `linear-gradient(rgba(242,236,228,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.045) 1px,transparent 1px)` : `linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)`, backgroundSize: "72px 72px", WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 50%, black 25%, transparent 85%)", maskImage: "radial-gradient(ellipse 85% 65% at 50% 50%, black 25%, transparent 85%)", pointerEvents: "none", zIndex: 1 }} />

  <Page style={{ position: "relative", zIndex: 2 }}>
  {/* breadcrumb */}
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: dark ? "rgba(242,236,228,0.45)" : T.sandDim, marginBottom: 26 }}>
  <Link to="/" style={{ color: dark ? "rgba(242,236,228,0.45)" : T.sandDim, textDecoration: "none", transition: "color .2s" }} className="footer-link">§ Home</Link>
  <span style={{ margin: "0 12px", color: dark ? "rgba(242,236,228,0.25)" : T.ink4 }}>/</span>
  <span style={{ color: T.brass }}>{breadcrumb}</span>
  </div>

  {/* chapter eyebrow */}
  {chapter && (
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass, marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  {chapter}
  </div>
  )}

  {/* title */}
  <h1 style={{
  fontFamily: T.display,
  fontSize: "clamp(40px,6.4vw,92px)",
  fontWeight: 400,
  lineHeight: 1.02,
  letterSpacing: "-0.042em",
  color: dark ? T.paper : T.ink,
  marginBottom: lede ? 28 : 0,
  fontVariationSettings: "'opsz' 144, 'SOFT' 20",
  maxWidth: 1080,
  }}>
  {title}
  {italic && <><br /><em className="em-wonk" style={{ color: T.brass }}>{italic}</em></>}
  </h1>

  {/* lede */}
  {lede && (
  <p style={{
  fontFamily: T.serif,
  fontStyle: "italic",
  fontSize: "clamp(18px,1.8vw,24px)",
  lineHeight: 1.5,
  color: dark ? "rgba(242,236,228,0.62)" : T.sand,
  maxWidth: 780,
  fontWeight: 400,
  }}>
  {lede}
  </p>
  )}
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  BLOGS  -  index + per-post renderer
─────────────────────────────────────────────────────────────── */

// Inline markup: [text](url), **bold**, _italic_, `code`
const renderInline = (text, key = "k") => {
  if (text == null) return null;
  // tokenize on links first, then bold/italic/code
  const out = [];
  const linkRx = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = linkRx.exec(text)) !== null) {
  if (m.index > last) out.push(...renderEmphasis(text.slice(last, m.index), `${key}-t${i++}`));
  out.push(
  <a key={`${key}-a${i++}`} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: T.brass, textDecoration: "underline", textDecorationColor: "rgba(215,90,51,0.4)", textUnderlineOffset: "3px" }}>
  {m[1]}
  </a>
  );
  last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...renderEmphasis(text.slice(last), `${key}-t${i++}`));
  return out;
};

const renderEmphasis = (text, key) => {
  const out = [];
  // **bold**
  const boldRx = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = boldRx.exec(text)) !== null) {
  if (m.index > last) out.push(...renderItalicCode(text.slice(last, m.index), `${key}-b${i++}`));
  out.push(<strong key={`${key}-bs${i++}`} style={{ fontWeight: 600, color: T.ink }}>{renderItalicCode(m[1], `${key}-bi${i++}`)}</strong>);
  last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...renderItalicCode(text.slice(last), `${key}-b${i++}`));
  return out;
};

const renderItalicCode = (text, key) => {
  const out = [];
  const rx = /_([^_]+)_|`([^`]+)`/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = rx.exec(text)) !== null) {
  if (m.index > last) out.push(text.slice(last, m.index));
  if (m[1] !== null) {
  out.push(<em key={`${key}-i${i++}`} style={{ fontStyle: "italic", color: T.ink2 }}>{m[1]}</em>);
  } else if (m[2] !== null) {
  out.push(<code key={`${key}-c${i++}`} style={{ fontFamily: T.mono, fontSize: "0.92em", background: "rgba(10,28,38,0.05)", padding: "2px 6px", borderRadius: 3, color: T.ink }}>{m[2]}</code>);
  }
  last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const formatBlogDate = (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric" });
};

const CATEGORY_COLORS = {
  "AI Infrastructure": "#D75A33",
  "AI Memory":  "#6B9E85",
  "LLM Benchmarks":  "#8B7BAD",
  "Agent Engineering": "#C4A94A",
  "Market Trends":  "#6B8DAD",
  "Knowledge Graph":  "#AD8B6B",
};

const BlogList = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const sorted = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const categories = ["All", ...Array.from(new Set(sorted.map(p => p.category)))];
  const filtered = activeCategory === "All" ? sorted : sorted.filter(p => p.category === activeCategory);
  const [featured, ...rest] = filtered;

  return (
  <section style={{ background: T.navy, padding: "clamp(40px,5vw,56px) 0" }}>
  <Page>

  {/* ── Category filters ── */}
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 52 }}>
  {categories.map(cat => {
  const active = activeCategory === cat;
  const col = CATEGORY_COLORS[cat] || T.brass;
  return (
  <button
  key={cat}
  onClick={() => setActiveCategory(cat)}
  style={{
  fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
  padding: "8px 18px", border: `0.5px solid ${active ? col : "rgba(242,236,228,0.15)"}`,
  background: active ? `${col}18` : "transparent",
  color: active ? col : T.sandDim, cursor: "pointer", borderRadius: 2,
  transition: "all .2s ease", outline: "none",
  }}
  >{cat}</button>
  );
  })}
  </div>

  {/* ── Featured hero post ── */}
  {featured && (() => {
  const col = CATEGORY_COLORS[featured.category] || T.brass;
  return (
  <Link to={`/blogs/${featured.slug}`} style={{ display: "block", textDecoration: "none", marginBottom: 24 }} className="bl-featured">
  <div style={{
  display: "grid", gridTemplateColumns: "1fr 240px",
  borderRadius: 12, overflow: "hidden",
  border: `1px solid rgba(242,236,228,0.08)`,
  boxShadow: "0 4px 40px rgba(0,0,0,0.18)",
  transition: "box-shadow .3s ease",
  }}>
  {/* ── Left: content ── */}
  <div style={{
  background: "rgba(242,236,228,0.025)", padding: "clamp(36px,4.5vw,56px)",
  position: "relative", overflow: "hidden",
  }}>
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
  background: `linear-gradient(90deg, ${col} 0%, transparent 60%)` }} />

  {/* meta */}
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 7,
  border: `1px solid ${col}35`, borderRadius: 4, padding: "4px 10px" }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: col, flexShrink: 0 }} />
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em",
  color: col, fontWeight: 600, textTransform: "uppercase" }}>
  Latest  -  {featured.category}
  </span>
  </div>
  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.stone, letterSpacing: "0.14em", textTransform: "uppercase" }}>
  {formatBlogDate(featured.date)}  -  {featured.readMin} min read
  </span>
  </div>

  {/* title */}
  <h2 style={{
  fontFamily: T.display, fontSize: "clamp(24px,3vw,44px)", fontWeight: 400,
  lineHeight: 1.12, letterSpacing: "-0.028em", color: T.paper, marginBottom: 18,
  fontVariationSettings: "'opsz' 144, 'SOFT' 30", maxWidth: 700,
  }}>{featured.title}</h2>

  {/* dek */}
  <p style={{ fontSize: 15, color: T.sandDim, lineHeight: 1.7, maxWidth: 580,
  fontWeight: 300, margin: "0 0 32px" }}>{featured.dek}</p>

  {/* CTA */}
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
  fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
  color: T.brass, borderBottom: `1px solid ${T.brass}50`, paddingBottom: 2 }}>
  Read essay <span className="bl-featured-arrow" style={{ transition: "transform .25s ease" }}>→</span>
  </div>
  </div>

  {/* ── Right: visual panel ── */}
  <div style={{
  background: `linear-gradient(150deg, ${col}1A 0%, ${col}08 60%, rgba(0,0,0,0.15) 100%)`,
  borderLeft: `1px solid ${col}18`,
  display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center",
  padding: "40px 28px", position: "relative", overflow: "hidden", gap: 12,
  }}>
  {/* giant faded number */}
  <div style={{
  position: "absolute", bottom: -10, right: -8,
  fontFamily: T.display, fontSize: 140, fontWeight: 300, lineHeight: 1,
  color: `${col}20`, letterSpacing: "-0.05em", userSelect: "none",
  fontVariationSettings: "'opsz' 144, 'SOFT' 10",
  }}>{featured.no}</div>
  {/* category vertical label */}
  <div style={{
  fontFamily: T.mono, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase",
  color: col, opacity: 0.9, writingMode: "vertical-rl",
  transform: "rotate(180deg)", zIndex: 1,
  }}>{featured.category}</div>
  {/* featured pill */}
  <div style={{
  fontFamily: T.mono, fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase",
  color: "rgba(242,236,228,0.28)", border: "1px solid rgba(242,236,228,0.12)",
  padding: "4px 10px", borderRadius: 20, zIndex: 1,
  }}>FEATURED</div>
  </div>
  </div>
  </Link>
  );
  })()}

  {/* ── Card grid ── */}
  <div className="bl-grid" style={{
  display: "grid", gridTemplateColumns: "repeat(3,1fr)",
  gap: 20, marginBottom: 64,
  }}>
  {rest.map((post) => {
  const col = CATEGORY_COLORS[post.category] || T.brass;
  return (
  <Link key={post.slug} to={`/blogs/${post.slug}`} style={{ textDecoration: "none" }} className="bl-card">
  <div style={{
  padding: "clamp(32px,3.5vw,44px) clamp(28px,3vw,36px) clamp(28px,3vw,36px)",
  background: T.cardBg,
  height: "100%", minHeight: 300, boxSizing: "border-box",
  position: "relative", overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 10,
  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
  transition: "transform .22s ease, box-shadow .22s ease, background .22s ease",
  display: "flex", flexDirection: "column",
  }}>
  {/* top accent line */}
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "10px 10px 0 0",
  background: `linear-gradient(90deg, ${col} 0%, transparent 65%)` }} />

  {/* category + read time */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
  <span style={{ width: 6, height: 6, borderRadius: "50%", background: col, flexShrink: 0 }} />
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase",
  color: col, fontWeight: 600 }}>{post.category}</span>
  </div>
  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.sand, letterSpacing: "0.12em",
  background: "rgba(0,0,0,0.04)", padding: "3px 8px", borderRadius: 20 }}>{post.readMin} min</span>
  </div>

  {/* title */}
  <h3 style={{
  fontFamily: T.display, fontSize: "clamp(18px,1.8vw,23px)", fontWeight: 400,
  lineHeight: 1.32, letterSpacing: "-0.018em", color: T.ink, marginBottom: 14,
  fontVariationSettings: "'opsz' 144, 'SOFT' 30", flex: 1,
  }}>{post.title}</h3>

  {/* excerpt */}
  <p style={{
  fontSize: 13.5, color: T.ink3, lineHeight: 1.72, margin: "0 0 28px",
  fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical", overflow: "hidden",
  }}>{post.dek}</p>

  {/* footer */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
  paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.sand, letterSpacing: "0.14em", textTransform: "uppercase" }}>
  {formatBlogDate(post.date)}
  </span>
  <span className="bl-arrow" style={{ fontFamily: T.mono, fontSize: 13, color: col,
  transition: "transform .22s ease", display: "flex", alignItems: "center", gap: 4 }}>
  READ <span style={{ fontSize: 15 }}>→</span>
  </span>
  </div>
  </div>
  </Link>
  );
  })}
  </div>

  {/* ── Subscribe bar ── */}
  <div style={{
  padding: "clamp(24px,3vw,36px) clamp(28px,3.5vw,44px)",
  border: `0.5px solid rgba(215,90,51,0.22)`,
  background: "rgba(215,90,51,0.04)",
  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap",
  }}>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 8 }}>
  Notify me when new essays drop
  </div>
  <p style={{ fontSize: 14, color: T.sandDim, lineHeight: 1.55, margin: 0 }}>
  One email per post. No newsletter spam, no algorithm games.
  </p>
  </div>
  <Btn variant="secondary" size="md" arrow="right" href={TALLY_URL} target="_blank" rel="noopener noreferrer">
  Get notified
  </Btn>
  </div>

  <style>{`
  .bl-featured:hover > div { border-color: rgba(242,236,228,0.18) !important; box-shadow: 0 8px 48px rgba(0,0,0,0.28) !important; }
  .bl-featured:hover .bl-featured-arrow { transform: translateX(6px); }
  .bl-card:hover > div { background: ${T.cardBgHover} !important; transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.10) !important; }
  .bl-card:hover .bl-arrow { transform: translateX(5px); }
  @media (max-width: 960px) { .bl-grid { grid-template-columns: repeat(2,1fr) !important; } }
  @media (max-width: 600px) { .bl-grid { grid-template-columns: 1fr !important; } }
  @media (max-width: 640px) { .bl-featured > div { grid-template-columns: 1fr !important; } }
  `}</style>
  </Page>
  </section>
  );
};

/* ─── BLOG POST  -  single-post view ─── */
const BlogBlock = ({ block, idx }) => {
  switch (block.type) {
  case "h2":
  return (
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(26px,3vw,38px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.022em", color: T.ink, margin: "56px 0 18px", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {renderInline(block.text, `h2-${idx}`)}
  </h2>
  );
  case "h3":
  return (
  <h3 style={{ fontFamily: T.display, fontSize: "clamp(20px,2.1vw,24px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.014em", color: T.ink, margin: "36px 0 12px", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {renderInline(block.text, `h3-${idx}`)}
  </h3>
  );
  case "p":
  return (
  <p style={{ fontSize: 17, lineHeight: 1.78, color: T.ink2, fontWeight: 300, marginBottom: 22 }}>
  {renderInline(block.text, `p-${idx}`)}
  </p>
  );
  case "quote":
  return (
  <blockquote style={{ margin: "32px 0", padding: "24px 28px", borderLeft: `3px solid ${T.brass}`, background: "rgba(176,137,70,0.05)" }}>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: "clamp(18px,1.7vw,22px)", lineHeight: 1.55, color: T.ink, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}>
  "{renderInline(block.text, `q-${idx}`)}"
  </p>
  {block.attr && (
  <footer style={{ marginTop: 14, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>
  {block.url ? (
  <a href={block.url} target="_blank" rel="noopener noreferrer" style={{ color: T.brass, textDecoration: "none" }}> -  {block.attr} ↗</a>
  ) : (
  <> -  {block.attr}</>
  )}
  </footer>
  )}
  </blockquote>
  );
  case "ul":
  return (
  <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 28px" }}>
  {block.items.map((item, i) => (
  <li key={i} style={{ display: "flex", gap: 14, fontSize: 16, lineHeight: 1.7, color: T.ink2, fontWeight: 300, marginBottom: 12, alignItems: "flex-start" }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 12, marginTop: 5, flexShrink: 0 }}>▸</span>
  <span>{renderInline(item, `ul-${idx}-${i}`)}</span>
  </li>
  ))}
  </ul>
  );
  case "ol":
  return (
  <ol style={{ listStyle: "none", padding: 0, margin: "16px 0 28px", counterReset: "li" }}>
  {block.items.map((item, i) => (
  <li key={i} style={{ display: "flex", gap: 14, fontSize: 16, lineHeight: 1.7, color: T.ink2, fontWeight: 300, marginBottom: 12, alignItems: "flex-start" }}>
  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.brass, fontWeight: 600, flexShrink: 0, marginTop: 5, letterSpacing: "0.06em" }}>
  {String(i + 1).padStart(2, "0")}
  </span>
  <span>{renderInline(item, `ol-${idx}-${i}`)}</span>
  </li>
  ))}
  </ol>
  );
  case "table":
  return (
  <div style={{ overflowX: "auto", margin: "32px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720, fontFamily: T.body }}>
  <thead>
  <tr>
  {block.headers.map((h, i) => (
  <th key={i} style={{ background: T.paper, padding: "14px 16px", textAlign: "left", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.stone, fontWeight: 600, borderBottom: `2px solid ${T.ink}` }}>{h}</th>
  ))}
  </tr>
  </thead>
  <tbody>
  {block.rows.map((row, ri) => (
  <tr key={ri}>
  {row.map((cell, ci) => (
  <td key={ci} style={{ padding: "14px 16px", borderBottom: ri < block.rows.length - 1 ? `0.5px solid ${T.line}` : "none", borderRight: ci < row.length - 1 ? `0.5px solid ${T.line}` : "none", fontSize: 13.5, lineHeight: 1.55, color: ci === 0 ? T.ink : T.ink2, fontWeight: ci === 0 ? 500 : 400, verticalAlign: "top" }}>
  {renderInline(cell, `td-${idx}-${ri}-${ci}`)}
  </td>
  ))}
  </tr>
  ))}
  </tbody>
  </table>
  </div>
  );
  case "callout":
  return (
  <aside style={{ margin: "36px 0", padding: "26px 30px", background: T.ink, color: T.paper, borderLeft: `3px solid ${T.brass}` }}>
  {block.title && (
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 12, fontWeight: 600 }}>
  {block.title}
  </div>
  )}
  <p style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.7, color: T.paper, margin: 0, fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {renderInline(block.body, `co-${idx}`)}
  </p>
  </aside>
  );
  case "faq":
  return (
  <div style={{ margin: "48px 0 24px", border: `0.5px solid ${T.lineStrong}`, background: T.cardBg }}>
  <div style={{ padding: "16px 24px", borderBottom: `0.5px solid ${T.line}`, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, fontWeight: 600, background: "rgba(176,137,70,0.04)" }}>
  FAQ
  </div>
  {block.items.map((row, i) => (
  <div key={i} style={{ padding: "22px 24px", borderBottom: i < block.items.length - 1 ? `0.5px solid ${T.line}` : "none" }}>
  <h4 style={{ fontFamily: T.display, fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", color: T.ink, marginBottom: 10, lineHeight: 1.3, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {renderInline(row.q, `faq-q-${idx}-${i}`)}
  </h4>
  <p style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.7, margin: 0 }}>
  {renderInline(row.a, `faq-a-${idx}-${i}`)}
  </p>
  </div>
  ))}
  </div>
  );
  case "divider":
  return <hr style={{ border: "none", borderTop: `0.5px solid ${T.line}`, margin: "48px 0" }} />;

  default:
  return null;
  }
};

/* ── SEO / AEO / GEO helpers ── */
const DEFAULT_TITLE = "GeniOS  -  Context Brain for AI Agents";
const DEFAULT_DESC  = "GeniOS  -  Context Brain for AI Agents. The organizational context graph that makes AI agents actually work inside your company.";

const _setMeta = (selector, attrName, attrVal, content) => {
  let el = document.querySelector(selector);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attrName, attrVal); document.head.appendChild(el); }
  el.setAttribute("content", content);
};
const _setLink = (rel, href) => {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
};
const _injectSchema = (schema) => {
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.setAttribute("data-genios-schema", "");
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
};
const _clearSchemas = () => document.querySelectorAll("script[data-genios-schema]").forEach(s => s.remove());
const _resetMeta = () => {
  document.title = DEFAULT_TITLE;
  _setMeta('meta[name="description"]', "name", "description", DEFAULT_DESC);
  ["og:title","og:description","og:type","og:url","og:image","article:published_time","article:section","twitter:card","twitter:title","twitter:description","twitter:image"]
  .forEach(p => { const el = document.querySelector(`meta[property="${p}"],meta[name="${p}"]`); if (el) el.remove(); });
  const canonical = document.querySelector('link[rel="canonical"]'); if (canonical) canonical.remove();
  _clearSchemas();
};

const BlogPost = ({ slug }) => {
  const post = getBlogPost(slug);

  useEffect(() => {
  if (!post) return;
  window.scrollTo(0, 0);

  const origin = window.location.origin;
  const url  = `${origin}/blogs/${post.slug}`;
  const title  = `${post.title} | GeniOS`;

  const ogImage = `${origin}/genios-logo.png`;

  document.title = title;
  _setMeta('meta[name="description"]',  "name",  "description",  post.dek);
  _setMeta('meta[property="og:title"]',  "property", "og:title",  title);
  _setMeta('meta[property="og:description"]',  "property", "og:description",  post.dek);
  _setMeta('meta[property="og:type"]',  "property", "og:type",  "article");
  _setMeta('meta[property="og:url"]',  "property", "og:url",  url);
  _setMeta('meta[property="og:image"]',  "property", "og:image",  ogImage);
  _setMeta('meta[property="article:published_time"]',"property","article:published_time", post.date);
  _setMeta('meta[property="article:section"]',  "property", "article:section",  post.category);
  _setMeta('meta[name="twitter:card"]',  "name",  "twitter:card",  "summary_large_image");
  _setMeta('meta[name="twitter:title"]',  "name",  "twitter:title",  title);
  _setMeta('meta[name="twitter:description"]',  "name",  "twitter:description",  post.dek);
  _setMeta('meta[name="twitter:image"]',  "name",  "twitter:image",  ogImage);
  _setLink("canonical", url);

  _clearSchemas();

  _injectSchema({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": post.title,
  "description": post.dek,
  "datePublished": post.date,
  "url": url,
  "articleSection": post.category,
  "timeRequired": `PT${post.readMin}M`,
  "author":  { "@type": "Organization", "name": "GeniOS", "url": origin },
  "publisher": { "@type": "Organization", "name": "GeniOS", "url": origin },
  });

  const faqBlock = post.blocks.find(b => b.type === "faq");
  if (faqBlock) {
  _injectSchema({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqBlock.items.map(item => ({
  "@type": "Question",
  "name": item.q,
  "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
  });
  }

  _injectSchema({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
  { "@type": "ListItem", "position": 1, "name": "Home",  "item": origin },
  { "@type": "ListItem", "position": 2, "name": "Essays", "item": `${origin}/blogs` },
  { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
  ],
  });

  return () => _resetMeta();
  }, [post]);

  if (!post) {
  return (
  <section className="sec-pad" style={{ padding: "clamp(120px,15vw,180px) 0", background: T.paper, textAlign: "center" }}>
  <Page>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: T.brass, marginBottom: 24 }}>§ 404</div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, marginBottom: 20, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  Essay not found.
  </h2>
  <p style={{ fontSize: 16, color: T.ink3, lineHeight: 1.7, fontWeight: 300, marginBottom: 32 }}>
  That URL doesn’t match any post. Head back to the index.
  </p>
  <Btn variant="secondary" size="md" arrow="right" href="/blogs" onClick={(e) => { e.preventDefault(); navigate("/blogs"); }}>
  Back to all essays
  </Btn>
  </Page>
  </section>
  );
  }

  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? BLOG_POSTS[idx - 1] : null;
  const next = idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null;

  return (
  <>
  {/* HEADER */}
  <section style={{
  background: T.paper,
  color: T.ink,
  padding: "clamp(72px,9vw,120px) clamp(24px,5vw,60px) clamp(40px,5vw,64px)",
  borderBottom: `0.5px solid ${T.line}`,
  position: "relative",
  overflow: "hidden",
  }}>
  <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 900, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(176,137,70,0.08) 0%,rgba(176,137,70,0.02) 45%,transparent 72%)", pointerEvents: "none", zIndex: 1 }} />

  <Page style={{ position: "relative", zIndex: 2, maxWidth: 880 }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: T.sand, marginBottom: 26 }}>
  <Link to="/" style={{ color: T.sand, textDecoration: "none" }} className="footer-link">§ Home</Link>
  <span style={{ margin: "0 12px", color: T.ink4 }}>/</span>
  <Link to="/blogs" style={{ color: T.sand, textDecoration: "none" }} className="footer-link">Essays</Link>
  <span style={{ margin: "0 12px", color: T.ink4 }}>/</span>
  <span style={{ color: T.brass }}>Essay {post.no}</span>
  </div>

  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 26, flexWrap: "wrap" }}>
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, fontWeight: 600 }}>{post.category}</span>
  <span style={{ width: 4, height: 4, background: T.stone, borderRadius: "50%" }} />
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>{formatBlogDate(post.date)}</span>
  <span style={{ width: 4, height: 4, background: T.stone, borderRadius: "50%" }} />
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>{post.readMin} min read</span>
  </div>

  <h1 style={{
  fontFamily: T.display,
  fontSize: "clamp(34px,5vw,64px)",
  fontWeight: 400,
  lineHeight: 1.06,
  letterSpacing: "-0.035em",
  color: T.ink,
  marginBottom: 24,
  fontVariationSettings: "'opsz' 144, 'SOFT' 20",
  }}>
  {post.title}
  </h1>

  <p style={{
  fontFamily: T.serif,
  fontStyle: "italic",
  fontSize: "clamp(18px,1.7vw,22px)",
  lineHeight: 1.5,
  color: T.ink3,
  fontWeight: 400,
  marginBottom: 0,
  }}>
  {post.dek}
  </p>
  </Page>
  </section>

  {/* TL;DR */}
  {post.tldr && (
  <section style={{ background: T.paper2, borderBottom: `0.5px solid ${T.line}`, padding: "clamp(40px,5vw,64px) clamp(24px,5vw,60px)" }}>
  <Page style={{ maxWidth: 880 }}>
  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 32, alignItems: "start" }} className="tldr-grid">
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: T.brass, fontWeight: 600, paddingTop: 6 }}>
  <div style={{ width: 32, height: 1, background: T.brass, marginBottom: 14 }} />
  TL;DR
  </div>
  <p style={{ fontSize: 16, lineHeight: 1.75, color: T.ink2, fontWeight: 300, margin: 0 }}>
  {renderInline(post.tldr, "tldr")}
  </p>
  </div>
  </Page>
  <style>{`@media (max-width: 720px) { .tldr-grid { grid-template-columns: 1fr !important; gap: 14px !important; } }`}</style>
  </section>
  )}

  {/* BODY */}
  <section style={{ background: T.paper, padding: "clamp(56px,7vw,88px) clamp(24px,5vw,60px) clamp(64px,8vw,100px)" }}>
  <Page style={{ maxWidth: 760 }}>
  <article>
  {post.blocks.map((b, i) => <BlogBlock key={i} block={b} idx={i} />)}
  </article>

  {/* Sources */}
  {post.sources && post.sources.length > 0 && (
  <div style={{ marginTop: 80, paddingTop: 32, borderTop: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: T.stone, marginBottom: 18, fontWeight: 600 }}>
  Sources
  </div>
  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
  {post.sources.map((s, i) => (
  <li key={i} style={{ marginBottom: 10, fontSize: 13.5, lineHeight: 1.55 }}>
  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: T.ink2, textDecoration: "none", borderBottom: `0.5px solid ${T.line}`, paddingBottom: 1, transition: "color .2s" }}
  onMouseEnter={(e) => { e.currentTarget.style.color = T.brass; }}
  onMouseLeave={(e) => { e.currentTarget.style.color = T.ink2; }}
  >
  {s.label} <span style={{ color: T.brass, marginLeft: 4 }}>↗</span>
  </a>
  </li>
  ))}
  </ul>
  </div>
  )}
  </Page>
  </section>

  {/* PREV / NEXT */}
  <section style={{ background: T.paper2, borderTop: `0.5px solid ${T.lineStrong}`, padding: "clamp(40px,5vw,64px) clamp(24px,5vw,60px)" }}>
  <Page>
  <div style={{ display: "grid", gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr", gap: 18 }} className="blog-nav-grid">
  {prev && (
  <Link to={`/blogs/${prev.slug}`} style={{ display: "block", padding: "24px 28px", border: `0.5px solid ${T.lineStrong}`, background: T.cardBg, textDecoration: "none", color: "inherit", transition: "background .25s ease, border-color .25s ease" }}
  onMouseEnter={(e) => { e.currentTarget.style.background = T.cardBgHover; e.currentTarget.style.borderColor = T.ink; }}
  onMouseLeave={(e) => { e.currentTarget.style.background = T.cardBg; e.currentTarget.style.borderColor = T.lineStrong; }}
  >
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>← Previous - Essay {prev.no}</div>
  <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 500, letterSpacing: "-0.012em", color: T.ink, lineHeight: 1.3, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{prev.title}</div>
  </Link>
  )}
  {next && (
  <Link to={`/blogs/${next.slug}`} style={{ display: "block", padding: "24px 28px", border: `0.5px solid ${T.lineStrong}`, background: T.cardBg, textDecoration: "none", color: "inherit", textAlign: prev ? "right" : "left", transition: "background .25s ease, border-color .25s ease" }}
  onMouseEnter={(e) => { e.currentTarget.style.background = T.cardBgHover; e.currentTarget.style.borderColor = T.ink; }}
  onMouseLeave={(e) => { e.currentTarget.style.background = T.cardBg; e.currentTarget.style.borderColor = T.lineStrong; }}
  >
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>Next  -  Essay {next.no} →</div>
  <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 500, letterSpacing: "-0.012em", color: T.ink, lineHeight: 1.3, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{next.title}</div>
  </Link>
  )}
  </div>

  <div style={{ marginTop: 32, textAlign: "center" }}>
  <Btn variant="ghost" size="md" arrow="right" href="/blogs" onClick={(e) => { e.preventDefault(); navigate("/blogs"); }}>
  All essays
  </Btn>
  </div>

  <style>{`@media (max-width: 720px) { .blog-nav-grid { grid-template-columns: 1fr !important; } }`}</style>
  </Page>
  </section>
  </>
  );
};

const BlogPostPage = ({ slug }) => (
  <div style={{ background: T.navy }}>
  <div className="cream-card" style={{ background: T.paper }}>
  <BlogPost slug={slug} />
  </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
  STARTUP PROGRAM  -  For pre-seed founders  -  50% off Startup plan
─────────────────────────────────────────────────────────────── */
const SP_PRICE_PUBLIC = 149;
const SP_PRICE_PRESEED = 75;
const SP_SAVED_YEAR = (SP_PRICE_PUBLIC - SP_PRICE_PRESEED) * 12;

const SP_BENEFITS = [
  { h: "10 AI agents",  b: "Deploy up to 10 agents across your org  -  each with persistent context, not starting from zero every run." },
  { h: "Unlimited data sources",  b: "Connect everything: Gmail, Calendar, Slack, HubSpot, and more. No integration paywall, no tier-locked connectors." },
  { h: "100k context calls / mo",  b: "Enough headroom for a full pre-seed team running agents daily across sales, ops, and product workflows." },
  { h: "All 4 intelligence graphs", b: "Relationship  -  Authority  -  State  -  Precedent  -  the full reasoning stack, not a stripped-down subset." },
  { h: "Priority support + onboarding", b: "White-glove onboarding with an engineer on our side. Priority queue for any support request." },
];

const SP_ELIGIBILITY = [
  { ok: true,  t: "Pre-seed stage company" },
  { ok: true,  t: "Under 10 employees" },
  { ok: true,  t: "Building an AI-native product (agents, copilots, automation)" },
  { ok: false, t: "Already at Series A or beyond" },
  { ok: false, t: "Pure-services or consultancy  -  no shipped product" },
];

const SP_STEPS = [
  { n: "01", h: "Apply",  b: "Two-minute form. Tell us what you’re building, current stage, and where context is breaking today." },
  { n: "02", h: "Verify",  b: "We’ll ask for a quick stage check  -  investor confirmation, latest deck, or cap-table screenshot. 24-hour turnaround." },
  { n: "03", h: "Lock in", b: "Approved founders get the discounted rate locked while you’re pre-seed. Onboarding call scheduled within the week." },
];

const SP_FAQ = [
  { q: "What happens if I raise a Series A?", a: "Your rate graduates to the public founding rate ($149/mo) at Series A close, or when you cross 25 employees  -  whichever comes first. We give you 60 days' notice and never auto-uplift mid-quarter." },
  { q: "Is this the same product as the paid Startup plan?", a: "Yes  -  identical. Same SLA, same integrations, same graph layers, same support queue. The only difference is the line item on the invoice." },
  { q: "Can I switch from Early if I qualify?", a: "Absolutely. Apply, verify, and we’ll migrate your tenant within a day. Your data, agents, and integrations move with you." },
  { q: "Do you take equity?", a: "No. This is a discount program, not an investment. We don’t take equity, advisory shares, or warrants in exchange for the rate." },
];

const SP_PriceCard = ({ label, price, sub, accent, tag, line }) => (
  <div style={{
  padding: "32px 30px",
  background: accent ? "rgba(176,137,70,0.06)" : T.cardBg,
  border: `0.5px solid ${accent ? T.brass : T.lineStrong}`,
  borderLeft: accent ? `3px solid ${T.brass}` : `0.5px solid ${T.lineStrong}`,
  position: "relative",
  }}>
  {tag && (
  <div style={{ position: "absolute", top: 16, right: 16 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink, background: T.brass, padding: "5px 11px", borderRadius: 100, fontWeight: 600 }}>{tag}</span>
  </div>
  )}
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: accent ? T.brass : T.stone, marginBottom: 16 }}>{label}</div>
  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
  <span style={{ fontFamily: T.display, fontSize: 64, fontWeight: 400, letterSpacing: "-0.035em", color: T.ink, lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>${price}</span>
  <span style={{ fontFamily: T.mono, fontSize: 12, color: T.stone }}>/mo</span>
  </div>
  {line && <div style={{ fontFamily: T.mono, fontSize: 11, color: T.stone, marginTop: 4, marginBottom: 14 }}>{line}</div>}
  <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.55, marginTop: line ? 0 : 18 }}>{sub}</div>
  </div>
);

/* ── Hustler Program constants ── */
const HP_PRICE_PUBLIC  = 79;
const HP_PRICE_HUSTLER = 39;
const HP_SAVED_YEAR  = (HP_PRICE_PUBLIC - HP_PRICE_HUSTLER) * 12;

const HP_BENEFITS = [
  { h: "3 AI agents",  b: "Three agents running with persistent context  -  enough for a solo builder to automate the workflows that eat your day." },
  { h: "Limited data sources",  b: "Core connectors: Gmail, Calendar, Slack. Enough to wire your stack and keep your agents informed." },
  { h: "10k context calls / mo",  b: "Right-sized for one builder moving fast  -  enough headroom without paying for capacity you won’t use." },
  { h: "Relationship & Authority graphs", b: "Two of the four intelligence layers  -  know who matters and where decisions are made in any org." },
  { h: "Email support",  b: "Async support via email. Fast turnaround, no hand-holding  -  built for builders who can figure things out." },
];

const HP_ELIGIBILITY = [
  { ok: true,  t: "Solo builder  -  one person shipping alone" },
  { ok: true,  t: "Bootstrapped or self-funded" },
  { ok: true,  t: "Actively building an AI-native product" },
  { ok: false, t: "Teams of 2 or more  -  use Startup Program" },
  { ok: false, t: "Agency or client work only, no shipped product" },
];

const HP_STEPS = [
  { n: "01", h: "Apply",  b: "One-minute form. Tell us what you’re shipping solo and where context is breaking." },
  { n: "02", h: "Check",  b: "We verify you’re solo and self-funded. 48-hour turnaround, async  -  no calls required." },
  { n: "03", h: "Build",  b: "Approved builders lock in at $39/mo. Same-day onboarding. Move on." },
];

const HP_FAQ = [
  { q: "What if I bring on a co-founder?",  a: "Your Hustler rate stays locked for 6 months after you add a team member, then migrates to the Startup Program rate. We’ll give you advance notice." },
  { q: "Is this the same product as the paid plan?",  a: "Same graph layers, same integrations, same reasoning quality. Solo plan caps on agents (3) and query volume (5K/mo)  -  right-sized for one builder moving fast." },
  { q: "Difference from the Startup Program?",  a: "Startup Program is for pre-seed teams of 2-20 people. Hustler is for solo builders going it alone  -  lower cap, lower price, faster setup." },
  { q: "Do you take equity?",  a: "No. Same answer as Startup Program: no equity, no advisory shares, no warrants. Just a discount for builders who are early." },
];

const ProgramCard = ({ tag, badge, name, freePeriod, afterPrice, afterNote, desc, benefits, eligibility, ctaLabel, ctaGrad, idealFor }) => (
  <div style={{ background: T.cardBg, borderRadius: 20, overflow: "hidden", border: `0.5px solid ${T.lineStrong}`, boxShadow: "0 6px 32px rgba(10,9,8,0.07), 0 1px 4px rgba(10,9,8,0.04)", display: "flex", flexDirection: "column" }}>

  {/* ── Detail ── */}
  <div style={{ padding: "36px 36px 28px", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: T.brass }}>{tag}</div>
  {badge && (
  <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", background: T.ink, color: T.paper, padding: "5px 13px", borderRadius: 100, fontWeight: 600 }}>{badge}</span>
  )}
  </div>
  <h3 style={{ fontFamily: T.display, fontSize: "clamp(26px,2.6vw,36px)", fontWeight: 400, letterSpacing: "-0.028em", color: T.ink, lineHeight: 1.05, marginBottom: 24, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{name}</h3>

  {/* Free period highlight */}
  <div style={{ marginBottom: 16 }}>
  <div style={{ display: "inline-flex", alignItems: "baseline", gap: 8, background: `rgba(215,90,51,0.08)`, border: `0.5px solid rgba(215,90,51,0.25)`, borderRadius: 8, padding: "10px 16px", marginBottom: 10 }}>
  <span style={{ fontFamily: T.display, fontSize: "clamp(28px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.035em", color: T.brass, lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>{freePeriod}</span>
  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.brass, letterSpacing: "0.06em" }}>free</span>
  </div>
  <div style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.6 }}>
  After that  -  <span style={{ fontFamily: T.mono, fontWeight: 600, color: T.ink, fontSize: 13 }}>${afterPrice}/mo</span> <span style={{ color: T.stone }}>{afterNote}</span>
  </div>
  </div>

  <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, marginBottom: 22 }}>{desc}</p>
  <div style={{ height: 1, background: `linear-gradient(90deg, ${T.brass} 0%, rgba(215,90,51,0.15) 55%, transparent 100%)` }} />
  </div>

  {/* ── Benefits ── */}
  <div style={{ padding: "28px 36px", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: T.stone, marginBottom: 18 }}>Benefits</div>
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
  {benefits.map((b, i) => (
  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 13, lineHeight: 1, marginTop: 3, flexShrink: 0 }}>✓</span>
  <div>
  <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, lineHeight: 1.3, marginBottom: 3 }}>{b.h}</div>
  <div style={{ fontSize: 13, color: T.slate, lineHeight: 1.65 }}>{b.b}</div>
  </div>
  </li>
  ))}
  </ul>
  </div>

  {/* ── Additional / Eligibility ── */}
  <div style={{ padding: "28px 36px", flexGrow: 1, borderBottom: `0.5px solid ${T.line}`, minHeight: 0 }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: T.stone, marginBottom: 18 }}>Eligibility</div>
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
  {eligibility.map((e, i) => (
  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
  <span style={{ color: e.ok ? T.brass : T.stone, fontFamily: T.mono, fontSize: 12, lineHeight: 1, marginTop: 3, flexShrink: 0 }}>{e.ok ? "✓" : "✗"}</span>
  <span style={{ fontSize: 13.5, color: e.ok ? T.ink2 : T.stone, lineHeight: 1.55, textDecoration: e.ok ? "none" : "line-through" }}>{e.t}</span>
  </li>
  ))}
  </ul>
  </div>

  {/* ── Apply Now ── */}
  <a href={TALLY_URL} target="_blank" rel="noopener noreferrer"
  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: ctaGrad, color: "#fff", fontFamily: T.mono, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, padding: "22px 36px", textDecoration: "none", transition: "opacity .2s", cursor: "pointer" }}
  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
  >
  {ctaLabel} <span style={{ fontSize: 16, marginLeft: 2 }}>→</span>
  </a>

  {/* ── Ideal for ── */}
  {idealFor && (
  <div style={{ padding: "14px 36px 20px", textAlign: "center" }}>
  <span style={{ fontFamily: T.mono, fontSize: 10.5, color: T.brass, fontWeight: 600, letterSpacing: "0.08em" }}>*Ideal for: </span>
  <span style={{ fontSize: 12, color: T.stone, lineHeight: 1.5 }}>{idealFor}</span>
  </div>
  )}
  </div>
);

const ProgramsHubSection = () => (
  <section style={{ padding: "clamp(72px,9vw,108px) 0", background: T.paper }}>
  <Page>
  <div className="prog-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "stretch" }}>
  <ProgramCard
  tag="For Pre-seed Startups"
  badge="Startup Plan"
  name="Startup Program"
  freePeriod="3 months"
  afterPrice={75}
  afterNote=" -  50% off until seed"
  desc="You focus on building AI agents. GeniOS gives intelligence to your agents  -  so every agent knows your org, customers, and context from day one."
  benefits={SP_BENEFITS}
  eligibility={SP_ELIGIBILITY}
  ctaLabel="Apply for Startup Program"
  ctaGrad={`linear-gradient(135deg, ${T.brass} 0%, ${T.brassDeep} 100%)`}
  idealFor="Pre-seed startups under 10 employees, building AI-native products."
  />
  <ProgramCard
  tag="For Solo Builders"
  badge="Early Plan"
  name="Hustler Program"
  freePeriod="2 months"
  afterPrice={13}
  afterNote=" -  50% off while bootstrapped"
  desc="You focus on shipping. GeniOS gives your AI agents context, relationships, and decisions - so they never start from zero."
  benefits={HP_BENEFITS}
  eligibility={HP_ELIGIBILITY}
  ctaLabel="Apply for Hustler Program"
  ctaGrad="linear-gradient(135deg, #3D4D55 0%, #060c11 100%)"
  idealFor="Solo builders, bootstrapped, shipping an AI-native product alone."
  />
  </div>
  </Page>
  <style>{`.prog-compare-grid { } @media (max-width: 768px) { .prog-compare-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

/* ── Shared program section components ── */
const ProgramDivider = ({ num, title, subtitle }) => (
  <div style={{ padding: "clamp(32px,4vw,48px) 0", background: T.navy, borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
  <Page>
  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass, whiteSpace: "nowrap" }}>{num}  -  Program</div>
  <div style={{ height: 1, background: "rgba(255,255,255,0.1)", flexGrow: 1 }} />
  <div style={{ fontFamily: T.display, fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 400, letterSpacing: "-0.025em", color: T.paper, lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {title}  -  <em style={{ color: T.brass2, fontStyle: "italic" }}>{subtitle}</em>
  </div>
  </div>
  </Page>
  </div>
);

const ProgramOffer = ({ headline, italic, kicker, publicLabel, publicPrice, publicLineCopy, publicSub, programLabel, programPrice, savedYear, programSub, programTag, savingsCaption }) => (
  <section className="sec-pad cream-card" style={{ padding: "clamp(40px,5vw,56px) 0", background: T.paper }}>
  <Page>
  <div style={{ maxWidth: 980, margin: "0 auto" }}>
  <SectionLabel>The offer</SectionLabel>
  <H2>{headline}<br /><em className="em-wonk" style={{ color: T.brass }}>{italic}</em></H2>
  <Kicker>{kicker}</Kicker>
  <div className="g2 sp-price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 16 }}>
  <SP_PriceCard label={publicLabel} price={publicPrice} line={publicLineCopy} sub={publicSub} />
  <SP_PriceCard label={programLabel} price={programPrice} line={`50% off  -  save $${savedYear.toLocaleString()}/yr`} sub={programSub} accent tag={programTag} />
  </div>
  <div style={{ marginTop: 28, padding: "22px 26px", background: T.ink, color: T.paper, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", border: `0.5px solid ${T.ink}` }}>
  <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass2 }}>Annual delta</span>
  <span style={{ fontFamily: T.display, fontSize: 30, fontWeight: 400, color: T.paper, letterSpacing: "-0.025em", lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>${savedYear.toLocaleString()}</span>
  <span style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.sandDim }}>{savingsCaption}</span>
  </div>
  <Btn variant="primary" size="md" arrow="right" href={TALLY_URL} target="_blank" rel="noopener noreferrer">Apply for the rate</Btn>
  </div>
  </div>
  </Page>
  </section>
);

const ProgramBenefits = ({ headline, italic, intro, benefits }) => (
  <section className="sec-pad cream-card" style={{ padding: "clamp(80px,10vw,120px) 0", background: T.paper2 }}>
  <Page>
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
  <SectionLabel>What’s included</SectionLabel>
  <H2 style={{ marginLeft: "auto", marginRight: "auto" }}>
  {headline}<br /><em className="em-wonk" style={{ color: T.brass }}>{italic}</em>
  </H2>
  <p style={{ fontSize: 16, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>{intro}</p>
  </div>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
  {benefits.map((c, i) => (
  <div key={i} className="card-content" style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
  <div style={{ fontFamily: T.display, fontSize: 36, fontWeight: 400, color: T.brass, lineHeight: 1, letterSpacing: "-0.025em", flexShrink: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>
  {String(i + 1).padStart(2, "0")}
  </div>
  <div>
  <h3 style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, letterSpacing: "-0.012em", color: T.ink, marginBottom: 10, lineHeight: 1.22, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{c.h}</h3>
  <p style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>{c.b}</p>
  </div>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

const ProgramEligibility = ({ headline, italic, lede, eligibility }) => (
  <section className="sec-pad cream-card" style={{ padding: "clamp(80px,10vw,120px) 0", background: T.paper }}>
  <Page>
  <div className="g2 sp-elig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start" }}>
  <div>
  <SectionLabel>Eligibility</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(30px,3.6vw,48px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.03em", color: T.ink, marginBottom: 24, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  {headline}<br /><em className="em-wonk" style={{ color: T.brass }}>{italic}</em>
  </h2>
  <p style={{ fontSize: 15.5, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>{lede}</p>
  </div>
  <div style={{ border: `0.5px solid ${T.lineStrong}`, background: T.cardBg }}>
  {eligibility.map((row, i) => (
  <div key={i} style={{
  padding: "18px 24px", display: "flex", alignItems: "center", gap: 16,
  borderBottom: i < eligibility.length - 1 ? `0.5px solid ${T.line}` : "none",
  background: row.ok ? "transparent" : "rgba(156,74,62,0.03)",
  }}>
  <span style={{
  width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
  background: row.ok ? "rgba(176,137,70,0.12)" : "rgba(156,74,62,0.1)",
  border: `0.5px solid ${row.ok ? T.brass : MUTED_RED}`,
  color: row.ok ? T.brass : MUTED_RED,
  fontFamily: T.mono, fontSize: 11, flexShrink: 0,
  }}>{row.ok ? "✓" : "✕"}</span>
  <span style={{ fontSize: 14.5, color: row.ok ? T.ink2 : MUTED_RED, lineHeight: 1.5 }}>{row.t}</span>
  </div>
  ))}
  </div>
  </div>
  </Page>
  </section>
);

const ProgramSteps = ({ italic, steps }) => (
  <section className="sec-pad cream-card" style={{ padding: "clamp(80px,10vw,120px) 0", background: T.paper2 }}>
  <Page>
  <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
  <SectionLabel>How it works</SectionLabel>
  <H2 style={{ marginLeft: "auto", marginRight: "auto" }}>
  Three steps.<br /><em className="em-wonk" style={{ color: T.brass }}>{italic}</em>
  </H2>
  </div>
  <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: `0.5px solid ${T.lineStrong}`, background: T.cardBg }}>
  {steps.map((s, i) => (
  <div key={i} style={{ padding: "36px 32px", borderRight: i < steps.length - 1 ? `0.5px solid ${T.line}` : "none" }}>
  <div style={{ fontFamily: T.display, fontSize: 56, fontWeight: 400, color: T.brass, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 18, fontVariationSettings: "'opsz' 144, 'SOFT' 20", opacity: 0.9 }}>{s.n}</div>
  <h3 style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, letterSpacing: "-0.012em", color: T.ink, marginBottom: 12, lineHeight: 1.2, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{s.h}</h3>
  <p style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>{s.b}</p>
  </div>
  ))}
  </div>
  </Page>
  </section>
);

const ProgramFAQ = ({ headline, italic, faq }) => (
  <section className="sec-pad cream-card" style={{ padding: "clamp(80px,10vw,120px) 0", background: T.paper }}>
  <Page>
  <div style={{ maxWidth: 880, margin: "0 auto" }}>
  <SectionLabel>Common questions</SectionLabel>
  <H2>
  {headline}<br /><em className="em-wonk" style={{ color: T.brass }}>{italic}</em>
  </H2>
  <div style={{ marginTop: 32, border: `0.5px solid ${T.lineStrong}`, background: T.cardBg }}>
  {faq.map((row, i) => (
  <div key={i} style={{
  padding: "26px 30px",
  borderBottom: i < faq.length - 1 ? `0.5px solid ${T.line}` : "none",
  display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "start",
  }} className="sp-faq-row">
  <h3 style={{ fontFamily: T.display, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", color: T.ink, lineHeight: 1.3, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{row.q}</h3>
  <p style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.7, margin: 0 }}>{row.a}</p>
  </div>
  ))}
  </div>
  </div>
  </Page>
  </section>
);

const ProgramCTA = ({ headline, italic, lede, buttonLabel }) => (
  <section className="sec-pad" style={{ padding: "clamp(96px,12vw,140px) 0", background: T.navy, color: T.paper, position: "relative", overflow: "hidden" }}>
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(176,137,70,0.16) 0%,rgba(176,137,70,0.04) 45%,transparent 72%)", pointerEvents: "none" }} />
  <Page style={{ position: "relative" }}>
  <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass, marginBottom: 26, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ width: 32, height: 1, background: T.brass }} /> Apply now <span style={{ width: 32, height: 1, background: T.brass }} />
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(38px,5.4vw,72px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 24 }}>
  {headline}<br /><em className="em-wonk" style={{ color: T.brass2 }}>{italic}</em>
  </h2>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: "clamp(17px,1.5vw,21px)", color: T.sandDim, lineHeight: 1.55, maxWidth: 580, margin: "0 auto 40px" }}>{lede}</p>
  <Btn variant="primary" size="lg" arrow="right" href={TALLY_URL} target="_blank" rel="noopener noreferrer">{buttonLabel}</Btn>
  <div style={{ marginTop: 22, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.sandDim }}>
  No equity  -  No advisory shares  -  No lock-in
  </div>
  </div>
  </Page>
  </section>
);

const HustlerProgramContent = () => (
  <div id="hustler-program">
  <ProgramDivider num="02" title="Hustler Program" subtitle="For Solo Builders" />
  <ProgramOffer
  headline="$39/mo. Solo plan."
  italic="Built for builders going it alone."
  kicker={`The individual plan runs $${HP_PRICE_PUBLIC}/mo. Solo builders accepted into this program pay $${HP_PRICE_HUSTLER}/mo, locked at that rate while you’re bootstrapped and building solo.`}
  publicLabel="Public  -  individual rate" publicPrice={HP_PRICE_PUBLIC} publicLineCopy="What every solo builder pays" publicSub="Individual plan, full product. Locked for the first 200 solo builders."
  programLabel="Hustler program" programPrice={HP_PRICE_HUSTLER} savedYear={HP_SAVED_YEAR} programSub="Same plan, same support. Locked while you’re bootstrapped and solo. No equity, no lock-in." programTag="For solo builders"
  savingsCaption="stays in your pocket, not on a SaaS invoice."
  />
  <ProgramBenefits headline="Full product." italic="Solo-sized limits." intro="Three agents, five thousand context queries a month, all four graph layers. Everything that matters for one builder shipping fast." benefits={HP_BENEFITS} />
  <ProgramEligibility headline="One person." italic="Shipping alone." lede="The Hustler rate is for solo builders who are genuinely going it alone  -  no team, no institutional backing, just you and the product." eligibility={HP_ELIGIBILITY} />
  <ProgramSteps italic="Start building tomorrow." steps={HP_STEPS} />
  <ProgramFAQ headline="Solo-builder" italic="FAQ." faq={HP_FAQ} />
  <ProgramCTA headline="Build the product." italic="Solo  -  with context." lede={`$${HP_PRICE_HUSTLER}/mo, locked while you’re solo and bootstrapped. One-minute application. 48-hour decision.`} buttonLabel="Apply for the Hustler rate" />
  </div>
);

const StartupProgramContent = () => (
  <>
  <ProgramsHubSection />
  </>
);

/* ──────────────────────────────────────────────────────────────
  THESIS  -  A single long-form editorial manifesto
  One paper background, one reading flow, rich inline figures.
─────────────────────────────────────────────────────────────── */

const PROSE = { fontSize: 18, lineHeight: 1.82, color: T.ink2, fontWeight: 300, marginBottom: 26, maxWidth: 800 };

const THESIS_ORDERS = [
  { order: "First order",  h: "Agents, not AI features.",  b: "Not copilots. Not chat. Agents  -  closing loops end-to-end, without a human in the middle." },
  { order: "Second order", h: "Humans exit the monitoring layer.", b: "Noticing, correlating, prioritizing  -  all continuous, all background. Humans show up only for the decision." },
  { order: "Third order",  h: "No single agent wins. Fleets do.",  b: "Five agents, one org  -  they can’t each rebuild context from scratch. They need shared infrastructure underneath." },
];

const ThreeShiftsViz = () => {
  const nodes = [{ x: 130, y: 148 }, { x: 380, y: 100 }, { x: 630, y: 56 }];
  return (
  <figure style={{ margin: "32px 0 8px", border: `0.5px solid ${T.lineStrong}`, background: T.paper }}>
  <svg viewBox="0 0 760 180" width="100%" style={{ display: "block" }}>
  <defs>
  <marker id="tsv-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
  <path d="M0,0 L6,3 L0,6 z" fill="rgba(215,90,51,0.45)"/>
  </marker>
  </defs>
  {[50,100,150].map(y => (
  <line key={y} x1="50" y1={y} x2="710" y2={y} stroke="rgba(13,26,34,0.03)" strokeWidth="0.5"/>
  ))}
  {nodes.map((n, i) => (
  <line key={i} x1={n.x} y1={n.y + 18} x2={n.x} y2={173} stroke="rgba(13,26,34,0.07)" strokeWidth="0.5" strokeDasharray="3 4"/>
  ))}
  <path d="M 50,165 C 90,165 110,148 130,148 C 255,148 255,100 380,100 C 505,100 505,56 630,56 C 662,56 700,44 724,36"
  fill="none" stroke={T.brass} strokeWidth="1.5" strokeOpacity="0.48" strokeLinecap="round" markerEnd="url(#tsv-arr)"/>
  {nodes.map((n, i) => (
  <circle key={i} cx={n.x} cy={n.y} r={22} fill={`rgba(215,90,51,${0.03 + i * 0.02})`}/>
  ))}
  {nodes.map((n, i) => (
  <g key={i}>
  <circle cx={n.x} cy={n.y} r={16} fill={T.paper} stroke={T.brass} strokeWidth="1.5" strokeOpacity="0.6"/>
  <circle cx={n.x} cy={n.y} r={9} fill="rgba(215,90,51,0.1)" stroke={T.brass} strokeWidth="0.75" strokeOpacity="0.75"/>
  <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={T.brass} fontWeight="700">{String(i+1).padStart(2,"0")}</text>
  </g>
  ))}
  {THESIS_ORDERS.map((o, i) => (
  <text key={i} x={nodes[i].x} y={nodes[i].y - 26} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(13,26,34,0.35)" letterSpacing="0.12em">{o.order.toUpperCase()}</text>
  ))}
  </svg>
  <div className="shifts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: T.line }}>
  {THESIS_ORDERS.map((o, i) => (
  <div key={i} className="shifts-cell" style={{ background: T.paper, padding: "16px 18px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, marginBottom: 6 }}>{o.order}</div>
  <h4 style={{ fontFamily: T.display, fontSize: 14, fontWeight: 500, letterSpacing: "-0.012em", color: T.ink, marginBottom: 6, lineHeight: 1.2, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{o.h}</h4>
  <p style={{ fontSize: 12, color: T.slate, lineHeight: 1.55, margin: 0 }}>{o.b}</p>
  </div>
  ))}
  </div>
  <figcaption style={{ fontFamily: T.mono, fontSize: 9.5, color: T.stone, letterSpacing: "0.18em", textTransform: "uppercase", padding: "8px 12px", borderTop: `0.5px solid ${T.line}` }}>Fig. I  -  Three orders of shift  -  Agents → Monitoring → Fleet</figcaption>
  </figure>
  );
};
const OrdersFigure = ThreeShiftsViz;

const IsntIsFigure = () => (
  <figure style={{ margin: "28px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.lineStrong }} className="g2">
  <div style={{ background: T.paper, padding: "20px 24px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>Not this</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.35, color: T.ink3, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: 0 }}>
  The gap is not model intelligence.
  </p>
  </div>
  <div style={{ background: T.paper, padding: "20px 24px", borderLeft: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: T.brass, marginBottom: 10 }}>This</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.35, color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: 0 }}>
  Every run starts from <em className="em-wonk" style={{ color: T.brass }}>zero context</em> about the org it serves.
  </p>
  </div>
  </figure>
);

const MEMORY_PLAYERS = ["Mem0", "Zep", "Graphiti", "Supermemory"];

const MemoryPills = () => (
  <div style={{ margin: "20px 0 8px", padding: "16px 20px", background: "rgba(10,9,8,0.03)", border: `0.5px solid ${T.line}`, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>Today’s memory category</div>
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
  {MEMORY_PLAYERS.map((p) => (
  <span key={p} style={{ fontFamily: T.mono, fontSize: 11, color: T.ink3, border: `0.5px solid ${T.lineStrong}`, padding: "4px 11px", borderRadius: 100, letterSpacing: "0.04em", background: T.paper }}>{p}</span>
  ))}
  </div>
  </div>
);

const ChapterCard = ({ n, title, label, id, readTime }) => (
  <div id={id} className="thesis-card">
  <span className="thesis-card-rule" />
  <span className="thesis-card-tag">Chapter  -  {n}</span>
  <span className="thesis-card-num">{n}</span>
  <h2 className="thesis-card-title">{title}</h2>
  <span className="thesis-card-label">{label}{readTime ? `  -  ${readTime}` : ""}</span>
  </div>
);

const THESIS_CHAPTERS = [
  { n: "I",  label: "The shift",  title: "Three orders of shift." },
  { n: "II",  label: "The diagnosis",  title: "Agents have no context." },
  { n: "III", label: "The gap",  title: "Storage is solved. Reasoning isn’t." },
  { n: "IV",  label: "The ceiling",  title: "Vector DBs  -  hitting the wall." },
  { n: "V",  label: "The claim",  title: "Continuous reasoning is the missing layer." },
  { n: "VI",  label: "The bet",  title: "Genios  -  two halves, one brain." },
  { n: "VII", label: "Why now",  title: "The room just opened." },
];

const ChapterIndex = ({ dark }) => (
  <nav className={`thesis-toc${dark ? " thesis-toc-dark" : ""}`} aria-label="Thesis contents">
  <div className="thesis-toc-head">
  <span className="tl">§ Contents  -  seven chapters</span>
  <span className="tr">~ 9 min read</span>
  </div>
  <div className="thesis-toc-grid">
  {THESIS_CHAPTERS.map((c) => (
  <a key={c.n} href={`#chapter-${c.n.toLowerCase()}`} className="thesis-toc-item">
  <span className="thesis-toc-num">{c.n}</span>
  <div className="thesis-toc-label">{c.label}</div>
  <div className="thesis-toc-title">{c.title}</div>
  <span className="thesis-toc-arrow">↘</span>
  </a>
  ))}
  <div className="thesis-toc-item thesis-toc-end" aria-hidden="true">
  <div className="k">End  -  Colophon</div>
  <div className="t">Thesis  -  2026</div>
  </div>
  </div>
  </nav>
);

/* ─── THESIS  -  Inline article visual blocks ─── */
const ThesisStat = ({ value, label, context, source }) => (
  <div style={{ margin: "32px 0", padding: "24px 0", borderTop: `1px solid ${T.lineStrong}`, borderBottom: `1px solid ${T.lineStrong}`, textAlign: "center" }}>
  <div style={{ fontFamily: T.display, fontSize: "clamp(72px,14vw,120px)", fontWeight: 600, lineHeight: 1, color: T.brass, letterSpacing: "-0.045em", fontVariationSettings: "'opsz' 144, 'SOFT' 0" }}>{value}</div>
  <div style={{ fontSize: 17, fontWeight: 500, color: T.ink, marginTop: 16, letterSpacing: "-0.01em" }}>{label}</div>
  {context && <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.ink3, marginTop: 8, lineHeight: 1.55, fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}>{context}</div>}
  {source && <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginTop: 18 }}>{source}</div>}
  </div>
);

const ThesisStats = ({ items }) => (
  <div style={{ margin: "28px 0", display: "grid", gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`, background: T.lineStrong, gap: "0.5px" }} className="thesis-stats-row">
  {items.map((s, i) => (
  <div key={i} style={{ padding: "18px 16px", background: T.paper, textAlign: "center", display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
  <div style={{ fontFamily: T.display, fontSize: "clamp(36px,5.5vw,58px)", fontWeight: 600, lineHeight: 1, color: T.brass, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144" }}>{s.value}</div>
  <div style={{ fontSize: 13.5, fontWeight: 500, color: T.ink, letterSpacing: "-0.005em" }}>{s.label}</div>
  {s.context && <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.stone, marginTop: 2 }}>{s.context}</div>}
  </div>
  ))}
  </div>
);

const ThesisBarChart = ({ title, caption, bars, note }) => {
  const [go, setGo] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: 0.2 });
  if (ref.current) obs.observe(ref.current);
  return () => obs.disconnect();
  }, []);
  const max = Math.max(...bars.map(b => b.value));
  return (
  <div ref={ref} style={{ margin: "28px 0" }}>
  {title && <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, fontWeight: 600, marginBottom: 4 }}>{title}</div>}
  {caption && <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 14, color: T.ink3, margin: "4px 0 18px", lineHeight: 1.5 }}>{caption}</p>}
  <div style={{ border: `0.5px solid ${T.lineStrong}`, background: T.cardBg, overflow: "hidden" }}>
  {bars.map((bar, i) => (
  <div key={i} className="thesis-bar-row" style={{ display: "grid", gridTemplateColumns: "clamp(110px,26%,180px) 1fr auto", gap: "0 14px", alignItems: "center", padding: "13px 20px", borderBottom: i < bars.length - 1 ? `0.5px solid ${T.line}` : "none", background: i % 2 === 0 ? T.cardBg : T.paper }}>
  <div style={{ fontFamily: T.body, fontSize: 12.5, color: T.ink2, lineHeight: 1.3, textAlign: "right", paddingRight: 8 }}>{bar.label}</div>
  <div style={{ height: 7, background: T.paper2, position: "relative", overflow: "hidden", borderRadius: 1 }}>
  <div style={{ position: "absolute", inset: "0 auto 0 0", width: go ? `${(bar.value / max) * 100}%` : "0%", background: bar.accent ? T.brass : `rgba(215,90,51,0.52)`, transition: `width 0.85s cubic-bezier(.4,0,.2,1) ${i * 0.09}s` }} />
  </div>
  <div style={{ fontFamily: T.mono, fontSize: 11, color: bar.accent ? T.brass : T.stone, fontWeight: bar.accent ? 600 : 400, letterSpacing: "0.04em", whiteSpace: "nowrap", minWidth: 44, textAlign: "right" }}>{bar.tag}</div>
  </div>
  ))}
  </div>
  {note && <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.stone, marginTop: 10 }}>Source: {note}</div>}
  </div>
  );
};

const ThesisInterlude = () => (
  <aside className="thesis-interlude" role="complementary">
  <div className="thesis-interlude-bg" />
  <div className="thesis-interlude-glow" />
  <div className="thesis-interlude-inner">
  <div className="thesis-interlude-kicker">The keystone  -  bridge between IV and V</div>
  <h3>
  The missing layer is not more storage. It is <em>continuous reasoning</em> between the graph and the agent  -  running before anyone thinks to ask.
  </h3>
  <div className="thesis-interlude-attrib">
  <span>Genios  -  A seven-part thesis</span>
  <span className="em">v The claim  -  §V</span>
  </div>
  </div>
  </aside>
);

const ThesisQuote = ({ children }) => (
  <blockquote style={{
  margin: "32px auto",
  padding: "20px 0",
  borderTop: `1.5px solid ${T.brass}`,
  borderBottom: `1.5px solid ${T.brass}`,
  maxWidth: 660,
  fontFamily: T.serif,
  fontSize: "clamp(20px,2.4vw,28px)",
  fontWeight: 400,
  fontStyle: "italic",
  lineHeight: 1.45,
  letterSpacing: "-0.008em",
  color: T.ink,
  textAlign: "center",
  fontVariationSettings: "'opsz' 144, 'SOFT' 60",
  }}>
  {children}
  </blockquote>
);

const Voice = ({ who, role, q, after }) => (
  <figure className="thesis-voice" style={{ margin: "28px 0", padding: "22px 26px", background: "rgba(10,9,8,0.035)", border: `0.5px solid ${T.line}`, borderLeft: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, marginBottom: 12 }}>
  {who} <span style={{ color: T.stone }}> -  {role}</span>
  </div>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16.5, color: T.ink2, lineHeight: 1.65, marginBottom: after ? 10 : 0 }}>
  "{q}"
  </p>
  {after && <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, fontWeight: 300 }}>{after}</p>}
  </figure>
);

const AXIS_ROWS = [
  ["Retrieval", "Pull on request", "Push on relevance"],
  ["Trigger", "Agent asks", "Graph notices"],
  ["Time axis", "Static snapshot", "Lifecycle + freshness"],
  ["Noticing layer", "The human", "The substrate"],
  ["Multi-agent share", "Per-agent silos", "Shared ground truth"],
];

const AxisTable = () => (
  <div className="axis-table-outer" style={{ margin: "28px 0" }}>
  <div className="axis-table-inner" style={{ border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", background: T.paper2, borderBottom: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ padding: "11px 16px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone }}>Axis</div>
  <div style={{ padding: "11px 16px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, borderLeft: `0.5px solid ${T.line}` }}>Reactive memory</div>
  <div style={{ padding: "11px 16px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, borderLeft: `0.5px solid ${T.line}` }}>Proactive substrate</div>
  </div>
  {AXIS_ROWS.map((row, i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", borderTop: i === 0 ? "none" : `0.5px solid ${T.line}` }}>
  <div style={{ padding: "12px 16px", fontSize: 14, color: T.ink3 }}>{row[0]}</div>
  <div style={{ padding: "12px 16px", fontSize: 14, color: T.ink3, opacity: 0.7, borderLeft: `0.5px solid ${T.line}` }}>{row[1]}</div>
  <div style={{ padding: "12px 16px", fontSize: 14, color: T.brassDeep, fontWeight: 500, borderLeft: `0.5px solid ${T.line}` }}>{row[2]}</div>
  </div>
  ))}
  </div>
  </div>
);

const INFRA_TERMS = [
  ["Specific", "customer code grows around our schema."],
  ["Audit-capable", "enterprise IT signs off."],
  ["Write-capable", "removing us breaks live workflows."],
  ["Shared", "every agent in the fleet pulls from the same ground truth."],
];

const TakeawayCallout = ({ label, children }) => (
  <div style={{ margin: "24px 0", padding: "20px 26px", background: T.navy, borderLeft: `3px solid ${T.brass}`, position: "relative", overflow: "hidden" }}>
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 90% 50%,rgba(215,90,51,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: T.brass, marginBottom: 10, position: "relative" }}>{label}</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, letterSpacing: "-0.018em", lineHeight: 1.4, color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", position: "relative" }}>
  {children}
  </p>
  </div>
);

const ContrastFigure = () => (
  <figure style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }} className="g2">
  <div style={{ background: T.paper, padding: "18px 22px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>Built on reactive memory</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(19px,2vw,24px)", fontWeight: 500, letterSpacing: "-0.018em", lineHeight: 1.25, color: T.ink3, marginBottom: 12, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  A chatbot with a search bar.
  </p>
  <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, fontWeight: 300 }}>
  Waits. Answers when pulled. Forgets what changed while no one was looking.
  </p>
  </div>
  <div style={{ background: T.paper, padding: "18px 22px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 10 }}>Built on a proactive substrate</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(19px,2vw,24px)", fontWeight: 500, letterSpacing: "-0.018em", lineHeight: 1.25, color: T.ink, marginBottom: 12, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  The thing buyers are paying for.
  </p>
  <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, fontWeight: 300 }}>
  Watches the graph. Notices what changed. Scores what matters. Pushes signals before anyone pulls them.
  </p>
  </div>
  </div>
  </figure>
);

const BET_FIGS = [
  { n: "04", l: "Graph types" },
  { n: "05", l: "Scoring axes" },
  { n: "06", l: "Lifecycle stages" },
];

const PROACTIVE_BEATS = [
  "Watches  -  per-tenant calibration, not global heuristics",
  "Notices  -  drift, freshness decay, contradiction, escalation",
  "Scores  -  relevance against the decision in front of the agent",
  "Pushes  -  signals arrive before the agent thinks to ask",
];

const TwoHalvesFigure = () => (
  <figure style={{ margin: "24px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }} className="g2">
  <div className="thesis-two-halves-inner" style={{ background: T.paper, padding: "20px 24px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>Half  -  I</div>
  <h4 style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, letterSpacing: "-0.018em", color: T.ink, marginBottom: 14, lineHeight: 1.22, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  The Reactive Graph <span style={{ color: T.stone, fontWeight: 400, fontStyle: "italic" }}> -  storage</span>
  </h4>
  <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, marginBottom: 18 }}>
  Structured across four fundamentally different dimensions of truth. Scored on five axes. Moved through six lifecycle stages. Queryable, auditable, durable.
  </p>
  <div className="bet-figs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: T.line, border: `0.5px solid ${T.line}` }}>
  {BET_FIGS.map((f, i) => (
  <div key={i} style={{ background: T.paper, padding: "14px 10px", textAlign: "center" }}>
  <div className="bet-fig-n" style={{ fontFamily: T.display, fontSize: 28, fontWeight: 300, color: T.brass, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 6, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>{f.n}</div>
  <div className="bet-fig-l" style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>{f.l}</div>
  </div>
  ))}
  </div>
  </div>
  <div className="thesis-two-halves-inner" style={{ background: T.paper, padding: "20px 24px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 10 }}>Half  -  II</div>
  <h4 style={{ fontFamily: T.display, fontSize: 22, fontWeight: 500, letterSpacing: "-0.018em", color: T.ink, marginBottom: 14, lineHeight: 1.22, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  The Proactive Intelligence <span style={{ color: T.stone, fontWeight: 400, fontStyle: "italic" }}> -  reasoning</span>
  </h4>
  <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, marginBottom: 18 }}>
  Runs continuously between storage and agent. Watches the graph, notices what changed, scores what matters, and delivers recommendations with attached evidence.
  </p>
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  {PROACTIVE_BEATS.map((b, i) => (
  <div key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: T.ink2, alignItems: "flex-start", fontWeight: 300, lineHeight: 1.55 }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>
  {b}
  </div>
  ))}
  </div>
  </div>
  </div>
  </figure>
);

const PositioningStrip = () => (
  <div style={{ margin: "24px 0", padding: "18px 24px", background: T.paper2, border: `0.5px solid ${T.lineStrong}`, borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 16 }}>The positioning</div>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr", gap: 28, alignItems: "flex-start" }}>
  <p style={{ fontFamily: T.display, fontSize: "clamp(19px,2vw,24px)", fontWeight: 500, letterSpacing: "-0.018em", lineHeight: 1.3, color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
  The goal is runtime infrastructure  -  not another tool in the fleet.
  </p>
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  {INFRA_TERMS.map(([k, v], i) => (
  <div key={i} className="pos-kv-row" style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 14, fontSize: 13.5, color: T.ink2, lineHeight: 1.6, fontWeight: 300 }}>
  <span style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: T.brass }}>{k}</span>
  <span>{v}</span>
  </div>
  ))}
  </div>
  </div>
  </div>
);

const WHY_NOW_FORCES = [
  { tag: "Forcing function  -  01", h: "Multi-agent is the default pattern.",  b: "CrewAI, LangGraph, Autogen, and n8n have turned agent fleets into a standard architecture  -  not research. A shared context substrate shifts from nice-to-have to structural requirement the moment fleets ship." },
  { tag: "Forcing function  -  02", h: "The buyer cycle closed.",  b: "Buyers shipped first-wave agents in 2024-2025, watched where the failures happen, and now know what they actually need underneath. They are asking for the substrate by name." },
  { tag: "Forcing function  -  03", h: "Frameworks standardized. Room opened.",  b: "Agent frameworks are stable enough that a shared context layer can plug into all of them without picking a side. The memory category is crowded. The reasoning category is empty." },
];

const ForcesFigure = () => (
  <figure style={{ margin: "24px 0", border: `0.5px solid ${T.lineStrong}`, background: T.paper }}>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: T.line }} className="g3">
  {WHY_NOW_FORCES.map((f, i) => (
  <div key={i} style={{ background: T.paper, padding: "18px 18px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 14 }}>{f.tag}</div>
  <h4 style={{ fontFamily: T.display, fontSize: 19, fontWeight: 500, letterSpacing: "-0.015em", color: T.ink, marginBottom: 12, lineHeight: 1.22, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{f.h}</h4>
  <p style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>{f.b}</p>
  </div>
  ))}
  </div>
  </figure>
);

const CrowdedEmptyCallout = () => (
  <div style={{ margin: "28px 0 8px", padding: "clamp(28px,3.5vw,48px) clamp(24px,4vw,48px)", background: T.navy, textAlign: "center", position: "relative", overflow: "hidden", borderTop: `1px solid rgba(215,90,51,0.4)` }}>
  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(242,236,228,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.03) 1px,transparent 1px)`, backgroundSize: "48px 48px", WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 80%)", maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 80%)", pointerEvents: "none" }} />
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass, marginBottom: 18, position: "relative" }}>The position  -  Genios</div>
  <p style={{ fontFamily: T.display, fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.25, color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", position: "relative", maxWidth: 720, margin: "0 auto" }}>
  The memory category is crowded.<br />
  The reasoning category is <em className="em-wonk" style={{ color: T.brass2, fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>empty.</em>
  </p>
  </div>
);

/* ──────────────────────────────────────────────────────────────
  THESIS / INSIGHTS  -  Illustrative Visual Components
─────────────────────────────────────────────────────────────── */

const ContextGapDiagram = () => {
  const rows = [
  { org: "Gmail & email history",  agent: " - " },
  { org: "Calendar & meetings",  agent: " - " },
  { org: "Slack threads & context",  agent: " - " },
  { org: "Notion docs & decisions",  agent: " - " },
  ];
  return (
  <figure style={{ margin: "20px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: T.paper2, borderBottom: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ padding: "10px 18px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>Your org has</div>
  <div style={{ padding: "10px 18px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, borderLeft: `0.5px solid ${T.lineStrong}` }}>Agent starts with</div>
  </div>
  {rows.map((r, i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `0.5px solid ${T.line}` }}>
  <div style={{ padding: "11px 18px", fontSize: 13, color: T.ink2, display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ color: T.stone, fontSize: 10 }}>✓</span>{r.org}
  </div>
  <div style={{ padding: "11px 18px", fontSize: 13, color: T.stone, borderLeft: `0.5px solid ${T.line}`, fontFamily: T.mono, letterSpacing: "0.06em" }}>{r.agent}</div>
  </div>
  ))}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${T.lineStrong}`, background: T.paper2 }}>
  <div style={{ padding: "12px 18px", fontFamily: T.mono, fontSize: 10, color: T.stone, letterSpacing: "0.1em" }}>Rich org context</div>
  <div style={{ padding: "12px 18px", fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.brass, borderLeft: `0.5px solid ${T.lineStrong}`, letterSpacing: "-0.01em", fontVariationSettings: "'opsz' 144" }}>Zero. Every run.</div>
  </div>
  </figure>
  );
};

const PullVsPushDiagram = () => {
  const mkSteps = (steps, nBg, nBorder, nColor, lColor) => steps.map((s, i) => (
  <div key={i} style={{ display: "flex", gap: 12 }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
  <div style={{ width: 24, height: 24, borderRadius: "50%", background: nBg, border: `1px solid ${nBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
  <span style={{ fontFamily: T.mono, fontSize: 8, color: nColor }}>{String(i + 1).padStart(2, "0")}</span>
  </div>
  {i < 3 && <div style={{ width: 1, height: 20, background: lColor, marginTop: 1 }} />}
  </div>
  <div style={{ paddingBottom: i < 3 ? 20 : 0, paddingTop: 2 }}>
  <div style={{ fontSize: 13.5, color: s.warn ? "#C0543A" : s.good ? T.brassDeep : T.ink2, fontWeight: s.good ? 500 : 400, lineHeight: 1.4 }}>{s.label}</div>
  {s.detail && <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.stone, marginTop: 3, lineHeight: 1.4 }}>{s.detail}</div>}
  </div>
  </div>
  ));
  const pull = [
  { label: "Agent decides to ask", detail: "Only if it thinks to query" },
  { label: "Retrieves stored facts", detail: "Point-in-time snapshot" },
  { label: "Context may be stale", detail: "No freshness tracking" },
  { label: "Changes go unnoticed", detail: "Until next explicit query", warn: true },
  ];
  const push = [
  { label: "Graph watches continuously", detail: "24/7, per-tenant calibration" },
  { label: "Detects change or drift", detail: "Scored on every new event" },
  { label: "Ranks by live relevance", detail: "Against the decision in context" },
  { label: "Pushes signal before asked", detail: "Agent acts, not reacts", good: true },
  ];
  return (
  <figure style={{ margin: "24px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }}>
  <div style={{ background: T.paper, padding: "20px 22px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, marginBottom: 14 }}>Reactive memory  -  pull model</div>
  {mkSteps(pull, T.paper2, T.lineStrong, T.stone, T.line)}
  </div>
  <div style={{ background: T.paper, padding: "20px 22px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, marginBottom: 14 }}>GeniOS  -  push model</div>
  {mkSteps(push, "rgba(176,137,70,0.12)", T.brass, T.brassDeep, "rgba(176,137,70,0.35)")}
  </div>
  </div>
  <figcaption style={{ fontFamily: T.mono, fontSize: 10, color: T.stone, letterSpacing: "0.18em", textTransform: "uppercase", padding: "12px 20px", borderTop: `0.5px solid ${T.line}` }}>Fig. V  -  Pull vs Push  -  Reactive retrieval vs proactive signal delivery</figcaption>
  </figure>
  );
};

const ARCH_LAYERS = [
  { label: "Agent Fleet",  sub: "Any framework  -  your AI agents",  chips: ["CRM Agent", "Research Agent", "Ops Agent", "Custom Agent"], accent: false },
  { label: "Proactive Intelligence", sub: "Watches  -  Notices  -  Scores  -  Pushes",  chips: ["Graph monitoring", "Freshness scoring", "Signal delivery", "Evidence pack"], accent: true, top: true },
  { label: "Reactive Graph",  sub: "4 graph types  -  5 scoring axes  -  6 lifecycle stages", chips: ["Relationship", "Authority", "State", "Precedent"], accent: true },
  { label: "Data Sources",  sub: "Gmail  -  Calendar  -  Slack  -  G-Suite  -  Notion  -  HubSpot", chips: ["Email", "Meetings", "Chat", "CRM"], accent: false },
];

const ArchitectureStack = () => (
  <figure className="thesis-arch" style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, padding: "11px 18px", borderBottom: `0.5px solid ${T.line}`, background: T.paper2, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
  <span>System architecture  -  layer by layer</span>
  <span style={{ color: T.brass }}>^ Agents receive context from below</span>
  </div>
  {ARCH_LAYERS.map((l, i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 3fr", borderBottom: i < 3 ? `0.5px solid ${T.line}` : "none", borderTop: l.top ? `2px solid ${T.brass}` : "none" }}>
  <div style={{ padding: "20px 22px", background: l.accent ? "rgba(176,137,70,0.05)" : T.paper }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: l.accent ? T.brass : T.stone, marginBottom: 5 }}>{l.label}</div>
  <div style={{ fontSize: 12, color: T.stone, fontStyle: "italic" }}>{l.sub}</div>
  </div>
  <div style={{ padding: "20px 22px", background: l.accent ? "rgba(176,137,70,0.05)" : T.paper, borderLeft: `0.5px solid ${T.line}`, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
  {l.chips.map((chip, j) => (
  <span key={j} style={{ fontFamily: T.mono, fontSize: 10, color: l.accent ? T.brassDeep : T.ink3, border: `0.5px solid ${l.accent ? "rgba(176,137,70,0.4)" : T.lineStrong}`, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.04em" }}>{chip}</span>
  ))}
  </div>
  </div>
  ))}
  <div style={{ padding: "9px 18px", background: T.paper2, fontFamily: T.mono, fontSize: 9, letterSpacing: "0.12em", color: T.stone, textTransform: "uppercase" }}>
  Compatible: LangGraph  -  CrewAI  -  Autogen  -  n8n  -  Raw SDK
  </div>
  </figure>
);


const VectorVennDiagram = () => (
  <figure style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }}>
  <div style={{ background: T.paper, padding: "26px 28px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 14 }}>Vector DB alone</div>
  <div style={{ padding: "16px 18px", border: `1px dashed ${T.lineStrong}`, borderRadius: 8, marginBottom: 14 }}>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.stone, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Covers:</div>
  {["Semantic similarity search", "Unstructured text retrieval", "Nearest-neighbor lookup"].map((x, i) => (
  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 13, color: T.ink3 }}><span style={{ color: T.stone, flexShrink: 0 }}>✓</span>{x}</div>
  ))}
  </div>
  <div style={{ padding: "14px 18px", background: "rgba(215,90,51,0.05)", border: `0.5px solid rgba(215,90,51,0.25)`, borderRadius: 6 }}>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C0543A", marginBottom: 8 }}>Misses:</div>
  {["Entity relationships & authority", "Data freshness & lifecycle state", "Temporal patterns over time", "Who can act on what, and when"].map((x, i) => (
  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: T.slate }}><span style={{ color: "#C0543A", flexShrink: 0 }}>✕</span>{x}</div>
  ))}
  </div>
  </div>
  <div style={{ background: T.paper, padding: "26px 28px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 14 }}>GeniOS hybrid context store</div>
  <div style={{ padding: "16px 18px", border: `0.5px solid rgba(176,137,70,0.3)`, borderRadius: 8, marginBottom: 14 }}>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.brass, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Covers everything, plus:</div>
  {["Vector + graph + lifecycle together", "Full entity relationship map", "Freshness scored on every event", "Authority: who approved what & when", "Patterns compound over time, per tenant"].map((x, i) => (
  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 13, color: T.ink2 }}><span style={{ color: T.brass, flexShrink: 0 }}>✓</span>{x}</div>
  ))}
  </div>
  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.stone, lineHeight: 1.6, fontStyle: "italic" }}>Vector is one component. Context store is the system. Conflating them is the most common agent-stack mistake.</div>
  </div>
  </div>
  </figure>
);

const PositioningMatrix = () => (
  <figure style={{ margin: "28px 0", border: `1px solid ${T.lineStrong}`, overflow: "hidden" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.7)", padding: "12px 20px", borderBottom: `1px solid rgba(242,236,228,0.1)`, background: T.ink }}>
  Market map  -  memory depth vs. reasoning capability
  </div>
  <div style={{ background: T.paper, padding: "32px 36px" }}>
  <svg viewBox="0 0 500 310" width="100%" style={{ maxWidth: 580, display: "block", margin: "0 auto", overflow: "visible" }}>
  {/* quadrant fills */}
  <rect x="270" y="20" width="200" height="120" fill="rgba(176,137,70,0.06)" />
  {/* axes */}
  <line x1="70" y1="260" x2="470" y2="260" stroke={T.ink2} strokeWidth="1.5" />
  <line x1="70" y1="20" x2="70" y2="260" stroke={T.ink2} strokeWidth="1.5" />
  {/* dividers */}
  <line x1="270" y1="20" x2="270" y2="260" stroke={T.lineStrong} strokeWidth="1" strokeDasharray="5 4" />
  <line x1="70" y1="140" x2="470" y2="140" stroke={T.lineStrong} strokeWidth="1" strokeDasharray="5 4" />
  {/* axis labels */}
  <text x="270" y="290" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10" fill={T.ink2} fontWeight="500">Memory depth →</text>
  <text x="16" y="140" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10" fill={T.ink2} fontWeight="500" transform="rotate(-90 16 140)">Reasoning ^</text>
  {/* axis ticks */}
  <text x="74" y="276" fontFamily="IBM Plex Mono,monospace" fontSize="9" fill={T.stone}>Low</text>
  <text x="450" y="276" textAnchor="end" fontFamily="IBM Plex Mono,monospace" fontSize="9" fill={T.stone}>High</text>
  <text x="62" y="264" textAnchor="end" fontFamily="IBM Plex Mono,monospace" fontSize="9" fill={T.stone}>Low</text>
  <text x="62" y="28" textAnchor="end" fontFamily="IBM Plex Mono,monospace" fontSize="9" fill={T.stone}>High</text>
  {/* RAG  -  label right */}
  <circle cx="138" cy="220" r="10" fill="rgba(16,35,42,0.08)" stroke={T.lineStrong} strokeWidth="1.5" />
  <text x="154" y="217" fontFamily="IBM Plex Mono,monospace" fontSize="10" fill={T.ink3} fontWeight="600">RAG</text>
  <text x="154" y="229" fontFamily="IBM Plex Mono,monospace" fontSize="8" fill={T.stone}>basic retrieval</text>
  {/* Custom Build  -  label below, dot moved left away from divider */}
  <circle cx="170" cy="148" r="10" fill="rgba(16,35,42,0.08)" stroke={T.lineStrong} strokeWidth="1.5" />
  <text x="170" y="170" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10" fill={T.ink3} fontWeight="600">Custom Build</text>
  {/* Mem0/Zep  -  label left */}
  <circle cx="370" cy="208" r="10" fill="rgba(16,35,42,0.08)" stroke={T.lineStrong} strokeWidth="1.5" />
  <text x="286" y="205" fontFamily="IBM Plex Mono,monospace" fontSize="10" fill={T.ink3} fontWeight="600">Mem0 / Zep</text>
  <text x="286" y="217" fontFamily="IBM Plex Mono,monospace" fontSize="8" fill={T.stone}>storage-only</text>
  {/* GeniOS  -  label below-left */}
  <circle cx="410" cy="58" r="14" fill="rgba(215,90,51,0.16)" stroke="#D75A33" strokeWidth="2.5" />
  <text x="322" y="56" fontFamily="IBM Plex Mono,monospace" fontSize="12" fill="#D75A33" fontWeight="700">GeniOS</text>
  <text x="322" y="70" fontFamily="IBM Plex Mono,monospace" fontSize="9" fill={T.brassDeep}>purpose-built</text>
  {/* quadrant label */}
  <text x="350" y="110" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8.5" fill={T.brass} fontWeight="600">Context intelligence</text>
  </svg>
  </div>
  </figure>
);

const MultiAgentDiagram = () => {
  const agents = ["CRM Agent", "Research Agent", "Ops Agent"];
  return (
  <figure style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }}>
  <div style={{ background: T.paper, padding: "26px 28px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, marginBottom: 18 }}>Without GeniOS  -  silos</div>
  {agents.map((a, i) => (
  <div key={i}>
  <div style={{ padding: "10px 14px", background: T.paper2, border: `0.5px solid ${T.lineStrong}`, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
  <span style={{ fontSize: 12, color: T.ink3 }}>{a}</span>
  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.stone, background: T.paper, padding: "2px 8px", border: `0.5px solid ${T.line}`, borderRadius: 4 }}>own copy</span>
  </div>
  {i < 2 && <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 14px 8px" }}><span style={{ fontFamily: T.mono, fontSize: 10, color: "#C0543A" }}>⚠</span><span style={{ fontSize: 11, color: "#C0543A" }}>no shared state  -  may conflict</span></div>}
  </div>
  ))}
  </div>
  <div style={{ background: T.paper, padding: "26px 28px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, marginBottom: 18 }}>With GeniOS  -  shared brain</div>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
  {agents.map((a, i) => (
  <div key={i} style={{ padding: "10px 14px", background: "rgba(176,137,70,0.05)", border: `0.5px solid rgba(176,137,70,0.25)`, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <span style={{ fontSize: 12, color: T.ink2 }}>{a}</span>
  <svg width="26" height="10" viewBox="0 0 26 10"><line x1="0" y1="5" x2="18" y2="5" stroke={T.brass} strokeWidth="1" /><polygon points="18,2 24,5 18,8" fill={T.brass} /></svg>
  </div>
  ))}
  </div>
  <div style={{ padding: "14px 18px", background: "rgba(176,137,70,0.08)", border: `1px solid rgba(176,137,70,0.35)`, borderRadius: 8, textAlign: "center" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.brass, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>GeniOS Context Graph</div>
  <div style={{ fontSize: 12, color: T.stone }}>One ground truth  -  Shared across all agents</div>
  </div>
  <div style={{ marginTop: 12, fontSize: 12, color: T.ink2, lineHeight: 1.65, fontStyle: "italic" }}>Shared ground truth underneath. Continuous reasoning on top. Every agent in the fleet acts on the same organizational reality  -  and receives recommendations before it asks.</div>
  </div>
  </div>
  </figure>
  );
};

const Thesis = () => (
  <div id="thesis">

  {/* ── Cream article header (article/essay style) ── */}
  <section
  data-section data-label="§  -  THESIS  -  MANIFESTO" data-dark="false"
  style={{
  background: T.paper,
  color: T.ink,
  padding: "clamp(48px,6vw,80px) clamp(24px,5vw,60px) clamp(28px,3.5vw,48px)",
  borderBottom: `0.5px solid ${T.line}`,
  position: "relative",
  overflow: "hidden",
  }}
  >
  {/* subtle radial glow */}
  <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 900, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(176,137,70,0.08) 0%,rgba(176,137,70,0.02) 45%,transparent 72%)", pointerEvents: "none", zIndex: 1 }} />

  <Page style={{ position: "relative", zIndex: 2, maxWidth: 800 }}>
  {/* Breadcrumb */}
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: T.sand, marginBottom: 26 }}>
  <Link to="/" style={{ color: T.sand, textDecoration: "none" }} className="footer-link">§ Home</Link>
  <span style={{ margin: "0 12px", color: T.ink4 }}>/</span>
  <Link to="/thesis" style={{ color: T.brass, textDecoration: "none" }} className="footer-link">Thesis</Link>
  </div>

  {/* Meta row */}
  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, fontWeight: 600 }}>Manifesto</span>
  <span style={{ width: 4, height: 4, background: T.stone, borderRadius: "50%" }} />
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>2026</span>
  <span style={{ width: 4, height: 4, background: T.stone, borderRadius: "50%" }} />
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone }}>~9 min read</span>
  </div>

  {/* Brass rule accent */}
  <div style={{ width: 48, height: 1.5, background: T.brass, marginBottom: 24 }} />

  {/* Display title */}
  <h1 style={{
  fontFamily: T.display,
  fontSize: "clamp(34px,5vw,64px)",
  fontWeight: 400,
  lineHeight: 1.08,
  letterSpacing: "-0.035em",
  color: T.ink,
  marginBottom: 8,
  fontVariationSettings: "'opsz' 144, 'SOFT' 20",
  }}>
  A seven-part thesis on<br />
  <em style={{ color: T.brass, fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 60, 'WONK' 1" }}>context infrastructure.</em>
  </h1>

  {/* Italic dek */}
  <p style={{
  fontFamily: T.serif,
  fontStyle: "italic",
  fontSize: "clamp(19px,1.8vw,23px)",
  lineHeight: 1.5,
  color: T.ink3,
  fontWeight: 400,
  marginBottom: 0,
  }}>
  Why the future of software runs on agents. Why none of them have the context they need. And what has to be built underneath.
  </p>
  </Page>
  </section>

  {/* ── TOC strip (paper2 background) ── */}
  <section
  data-section data-label="§  -  THESIS  -  CONTENTS" data-dark="false"
  style={{ background: T.paper2, borderBottom: `0.5px solid ${T.line}`, padding: "clamp(24px,3vw,40px) clamp(24px,5vw,60px)" }}
  >
  <Page style={{ maxWidth: 800 }}>
  <ChapterIndex />
  </Page>
  </section>

  {/* ── Cream body: opening paragraph + Chapters I-VII ── */}
  <section
  data-section data-label="§  -  THESIS  -  CHAPTERS" data-dark="false"
  className="cream-card"
  style={{ background: T.paper, padding: "clamp(32px,4vw,52px) 0 0", position: "relative" }}
  >
  <Page>
  <article style={{ maxWidth: 800, margin: "0 auto" }}>

  {/* Opening dropcap paragraph */}
  <p className="dropcap" style={{ fontSize: 19, lineHeight: 1.78, color: T.ink2, marginBottom: 28, fontWeight: 300 }}>
  The direction is already decided. The future of software belongs to AI agents  -  not chat interfaces, not copilots, not AI features bolted onto SaaS. <strong style={{ color: T.ink, fontWeight: 500 }}>Agents.</strong>
  </p>

  {/* Chapter I */}
  <ChapterCard n="I" title="Three orders of shift." label="The shift" id="chapter-i" readTime="~2 min" />
  <p style={PROSE}>
  The <em style={{ color: T.ink, fontStyle: "italic" }}>second-order</em> shift is that the future belongs to teams where humans stop being the monitoring layer and become only the decision layer. The grunt work of noticing, correlating, and prioritizing runs continuously in the background. The human shows up only for the call that actually matters.
  </p>
  <p style={PROSE}>
  The <em style={{ color: T.ink, fontStyle: "italic" }}>third-order</em> shift is that no single agent wins. The future is multi-agent  -  a research agent, a writing agent, a review agent, specialist agents per workflow. Each one doing less. All needing the same thing underneath. When five agents share one organization, they cannot each rebuild context from scratch. They cannot each maintain separate models of authority, state, and relationship without contradicting each other. The multi-agent fleet isn’t just a new deployment pattern  -  it’s a forcing function for shared infrastructure.
  </p>
  <OrdersFigure />

  {/* Chapter II */}
  <ChapterCard n="II" title="They all need context. They don’t have it." label="The diagnosis" id="chapter-ii" readTime="~2 min" />
  <p style={PROSE}>
  It is 2026. Agents are demo-strong and production-weak. Most of what gets called an "AI agent" works in a three-minute video and breaks in a thirty-day deployment.
  </p>
  <IsntIsFigure />
  <ContextGapDiagram />
  <ThesisStats items={[
  { value: "2024-25", label: "First wave shipped", context: "Agents deployed into real production" },
  { value: "~80%", label: "Failed at the context layer", context: "Not model failure  -  memory failure" },
  { value: "0", label: "Deployed with shared org context", context: "At the time of first deployment" },
  ]} />
  <ThesisQuote>
  Every agent run starts from zero context about the organization it is supposed to serve.
  </ThesisQuote>
  <p style={PROSE}>
  Context has to be stuffed into the prompt manually, every time, for every decision. That does not scale past the demo  -  and it breaks completely the moment a second agent joins the system.
  </p>

  {/* Chapter III */}
  <ChapterCard n="III" title="The stack solved storage. It did not solve reasoning." label="The gap" id="chapter-iii" readTime="~2 min" />
  <p style={PROSE}>
  The memory category did the useful work of answering <em>what facts does this agent know?</em> It does not answer <em>what should the agent be paying attention to right now that no one thought to ask about?</em> That is a different problem.
  </p>
  <MemoryPills />
  <p style={PROSE}>
  Reactive memory waits to be asked. If the agent does not think to look, the relevant fact stays buried. The human does the noticing. The agent answers when pulled and never initiates.
  </p>
  <AxisTable />
  <ThesisBarChart
  title="Memory layer benchmark  -  LongMemEval (GPT-4o)"
  caption="How accurately today’s best memory products recall facts across long agent sessions. Even the leader tops out at 63.8%  -  the reasoning gap is not closed."
  note="Atlan memory layer comparison, 2026"
  bars={[
  { label: "Zep / Graphiti",  value: 63.8, tag: "63.8%", accent: true },
  { label: "Letta (MemGPT)", value: 44.0, tag: "44.0%" },
  { label: "Mem0",  value: 49.0, tag: "49.0%" },
  { label: "OpenAI Memory",  value: 33.7, tag: "33.7%" },
  ]}
  />
  <ThesisQuote>
  Every memory product on the market today is a database dressed as a teammate.
  </ThesisQuote>

  {/* Chapter IV */}
  <ChapterCard n="IV" title="Vector databases are hitting their ceiling  -  out loud." label="The ceiling" id="chapter-iv" readTime="~2 min" />
  <p style={PROSE}>
  The vector-DB promise was that semantic similarity would be enough. It isn’t. Vector search retrieves what looks related, not what matters to the decision in front of the agent right now. It has no notion of freshness, lifecycle, or what changed in the last hour.
  </p>
  <ThesisStat
  value="41%"
  label="of end-to-end RAG latency consumed by retrieval"
  context="Before LLM generation even begins  -  the bottleneck is not the model, it is the memory architecture."
  source="MindStudio RAG Latency Analysis, 2026"
  />
  <ThesisBarChart
  title="Where RAG latency actually goes"
  caption="Retrieval is the dominant cost in a typical RAG pipeline  -  yet it is the part that fails silently when it returns near-miss results."
  note="MindStudio, 2026"
  bars={[
  { label: "Vector retrieval",  value: 41, tag: "41%", accent: true },
  { label: "LLM generation",  value: 21, tag: "21%" },
  { label: "Reranking",  value: 18, tag: "18%" },
  { label: "Doc embedding",  value: 12, tag: "12%" },
  { label: "Context assembly",  value: 8,  tag: "8%"  },
  ]}
  />
  <Voice
  who="Andrej Karpathy"
  role="former Director of AI, Tesla  -  OpenAI founding team"
  q="RAG is stateless and amnesiac  -  rediscovering knowledge on every query with no compounding."
  after="Reframed the whole discipline as context engineering  -  'a delicate art and science' of getting the right information into the window at the right step."
  />
  <TakeawayCallout label="The takeaway">
  When Karpathy publicly declares RAG insufficient and reframes the whole discipline as context engineering  -  the category has been validated by the voice that moves <em className="em-wonk" style={{ color: T.brass }}>capital, talent, and direction.</em>
  </TakeawayCallout>

  {/* Keystone interlude  -  full-bleed navy */}
  <ThesisInterlude />

  {/* Chapter V */}
  <ChapterCard n="V" title="The claim." label="The claim" id="chapter-v" readTime="~1 min" />
  <p style={PROSE}>
  The missing layer is not more storage. It is <em style={{ color: T.ink, fontStyle: "italic" }}>continuous reasoning</em> between storage and agent. An agent built on reactive memory will always be a chatbot with a search bar. An agent built on a proactive substrate  -  one that watches the graph, notices what changed, scores what matters, and pushes signals before anyone pulls them  -  is the thing buyers are actually paying for when they say "we want an AI teammate."
  </p>
  <ContrastFigure />
  <PullVsPushDiagram />
  <ThesisStats items={[
  { value: "Pull", label: "How every memory product works today", context: "Agent asks. Memory answers. Nothing happens in between." },
  { value: "Push", label: "What the next layer does", context: "Graph watches. Substrate notices. Signal arrives before anyone asks." },
  { value: "0", label: "Memory products in the push category", context: "The reasoning category is still empty." },
  ]} />
  <p style={PROSE}>
  This is more true for multi-agent systems than for single agents. When five agents share one organization, they cannot each rebuild context from scratch.
  </p>
  <ThesisQuote>
  They need a shared brain underneath them.
  </ThesisQuote>

  {/* Chapter VI */}
  <ChapterCard n="VI" title="The bet  -  Genios." label="The bet" id="chapter-vi" readTime="~1 min" />
  <p style={PROSE}>
  Genios is that substrate. <strong style={{ color: T.ink, fontWeight: 500 }}>Two halves, one brain.</strong> A reactive graph that stores, and a proactive intelligence that reasons continuously, calibrates per tenant, and delivers recommendations with attached evidence.
  </p>
  <TwoHalvesFigure />
  <ArchitectureStack />
  <p style={PROSE}>
  We are deliberately not building the agent. We are building what the agent stands on.
  </p>
  <PositioningStrip />
  <ThesisStats items={[
  { value: "04", label: "Graph types in Section A", context: "Entity, relationship, temporal, semantic" },
  { value: "05", label: "Scoring axes per node", context: "Confidence, freshness, consistency, signal, authority" },
  { value: "06", label: "Lifecycle stages tracked", context: "Active, stale, contested, archived, escalated, resolved" },
  ]} />
  <ThesisQuote>
  Tools get swapped every quarter. Infrastructure gets approved once and stays.
  </ThesisQuote>

  {/* Interlude II  -  before Why Now */}
  <aside className="thesis-interlude" role="complementary">
  <div className="thesis-interlude-bg" />
  <div className="thesis-interlude-glow" />
  <div className="thesis-interlude-inner">
  <div className="thesis-interlude-kicker">The moment  -  bridge into VII</div>
  <h3>
  The window is open <em>right now.</em> Not because the idea is new  -  because the infrastructure finally caught up with the ambition.
  </h3>
  <div className="thesis-interlude-attrib">
  <span>Genios  -  A seven-part thesis</span>
  <span className="em">v Why now  -  §VII</span>
  </div>
  </div>
  </aside>

  {/* Chapter VII */}
  <ChapterCard n="VII" title="Why now." label="Why now" id="chapter-vii" readTime="~1 min" />
  <p style={PROSE}>
  Multi-agent architectures have stopped being research. <em style={{ color: T.ink, fontStyle: "italic" }}>CrewAI, LangGraph, Autogen, n8n</em> have made agent fleets the default pattern  -  which turns a shared context substrate from a nice-to-have into a structural requirement.
  </p>
  <p style={PROSE}>
  Buyers have finished a full cycle with first-wave agents. They shipped in 2024 and 2025, watched where the failures happen, and now know what they actually need underneath. Agent frameworks have standardized enough that a shared context layer can plug into all of them without picking a side.
  </p>
  <ThesisStats items={[
  { value: "2024", label: "First wave shipped", context: "Agents went into real production at scale" },
  { value: "2025", label: "Buyer cycle closed", context: "Failures observed, root cause identified: context layer" },
  { value: "2026", label: "Window is open", context: "Frameworks stable, category empty, buyers asking by name" },
  ]} />
  <ForcesFigure />
  <CrowdedEmptyCallout />
  <p style={{ ...PROSE, marginTop: 40, textAlign: "center", maxWidth: 680, margin: "40px auto 0" }}>
  GeniOS is the first system built for the reasoning category. Not a memory tool with a reasoner bolted on. A reasoning engine with a graph underneath it.
  </p>

  {/* Navy colophon  -  full-bleed end-cap */}
  <div className="thesis-colophon">
  <div className="thesis-colophon-inner">
  <span>End  -  Thesis  -  Genios</span>
  <span className="mid">A seven-part thesis  -  2026</span>
  <Link to="/applications" className="next">
  <span>Keep reading  -  Applications</span>
  <span className="arrow">→</span>
  </Link>
  </div>
  </div>
  </article>
  </Page>
  </section>
  </div>
);


/* ──────────────────────────────────────────────────────────────
  INSIGHTS  -  Field manual  -  10 sectioned arguments, one paper flow
─────────────────────────────────────────────────────────────── */

const INSIGHTS_PROSE = { fontSize: 16, lineHeight: 1.75, color: T.ink2, fontWeight: 300, marginBottom: 18, maxWidth: 760 };
const INSIGHTS_PROSE_DARK = { ...INSIGHTS_PROSE, color: "rgba(242,236,228,0.78)" };

const InsightThemeContext = React.createContext(false);

const InsightChapter = ({ children, first = false, dark = false, id }) => {
  if (dark) {
  return (
  <InsightThemeContext.Provider value={true}>
  <div id={id} className="insight-dark">
  <div className="insight-dark-bg" aria-hidden="true" />
  <div className="insight-dark-glow" aria-hidden="true" />
  <div className="insight-dark-inner">{children}</div>
  </div>
  </InsightThemeContext.Provider>
  );
  }
  return (
  <InsightThemeContext.Provider value={false}>
  <div id={id} style={{ marginTop: first ? 0 : "clamp(56px, 6vw, 84px)", paddingTop: first ? 0 : 44, borderTop: first ? "none" : `0.5px solid ${T.lineStrong}`, scrollMarginTop: 96 }}>{children}</div>
  </InsightThemeContext.Provider>
  );
};

const InsightHead = ({ n, title, oneLine }) => {
  const dark = React.useContext(InsightThemeContext);
  const numColor = dark ? T.brass2 : T.brass;
  const ruleColor = dark ? "rgba(242,236,228,0.22)" : T.lineStrong;
  const labelColor = dark ? "rgba(242,236,228,0.5)" : T.stone;
  const titleColor = dark ? T.paper : T.ink;
  const subLabelColor = dark ? "rgba(242,236,228,0.5)" : T.stone;
  const subColor = dark ? T.brass2 : T.brassDeep;
  return (
  <div style={{ marginBottom: 32 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26, fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.26em", textTransform: "uppercase" }}>
  <span style={{ color: numColor, fontWeight: 500, flexShrink: 0 }}>§ {n}</span>
  <span style={{ flex: 1, height: 1, background: ruleColor }} />
  <span style={{ color: labelColor, flexShrink: 0 }}>Insight</span>
  </div>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.03em", color: titleColor, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: 0, maxWidth: 820 }}>{title}</h2>
  {oneLine && (
  <div style={{ marginTop: 24, paddingLeft: 20, borderLeft: `2px solid ${numColor}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: subLabelColor, marginBottom: 8 }}>The one-line truth</div>
  <p style={{ fontFamily: T.display, fontStyle: "italic", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.015em", color: subColor, fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1", maxWidth: 760, margin: 0 }}>{oneLine}</p>
  </div>
  )}
  </div>
  );
};

const BottomLine = ({ children }) => {
  const dark = React.useContext(InsightThemeContext);
  return (
  <div style={{
  marginTop: 28,
  padding: "18px 24px",
  background: dark ? "rgba(242,236,228,0.06)" : "rgba(16,35,42,0.06)",
  borderLeft: `2px solid ${T.brass}`,
  display: "flex",
  gap: 16,
  alignItems: "baseline",
  flexWrap: "wrap",
  }}>
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: dark ? T.brass2 : T.brass, flexShrink: 0 }}>Bottom line</span>
  <span style={{ fontSize: 15, color: dark ? T.paper : T.ink, lineHeight: 1.65, fontWeight: 400 }}>{children}</span>
  </div>
  );
};

const CompareCell = ({ value, muted }) => {
  const isCheck = value === "\u2713"; const isCross = value === "\u2717";
  const color = isCheck ? (muted ? T.stone : T.brass) : isCross ? MUTED_RED : T.ink3;
  return (<div style={{ padding: "13px 16px", fontSize: isCheck || isCross ? 16 : 13, color, borderLeft: `0.5px solid ${T.line}`, textAlign: "center", fontWeight: isCheck || isCross ? 600 : 400, fontStyle: !isCheck && !isCross ? "italic" : "normal" }}>{value}</div>);
};

const InsightsCompareTable = ({ headers, rows }) => (
  <div style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 0.8fr", background: T.paper2, borderBottom: `0.5px solid ${T.lineStrong}` }}>
  {headers.map((h, i) => (<div key={i} style={{ padding: "11px 16px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: i === 2 ? T.brass : T.stone, borderLeft: i > 0 ? `0.5px solid ${T.line}` : "none", textAlign: i === 0 ? "left" : "center" }}>{h}</div>))}
  </div>
  {rows.map((r, i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 0.8fr", borderTop: i === 0 ? "none" : `0.5px solid ${T.line}` }}>
  <div style={{ padding: "13px 16px", fontSize: 14, color: T.ink3 }}>{r.label}</div>
  <CompareCell value={r.a} muted />
  <CompareCell value={r.b} />
  </div>
  ))}
  </div>
);

const InsightBulletList = ({ heading, items, tone = "normal" }) => {
  const accent = tone === "warn" ? MUTED_RED : T.brass;
  const mark = tone === "warn" ? "\u2715" : "\u2192";
  return (
  <div style={{ margin: "22px 0" }}>
  {heading && (<div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: accent, marginBottom: 14 }}>{heading}</div>)}
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  {items.map((b, i) => (
  <div key={i} style={{ display: "flex", gap: 12, fontSize: 15, color: T.ink2, lineHeight: 1.65, alignItems: "flex-start", fontWeight: 300 }}>
  <span style={{ color: accent, fontFamily: T.mono, fontSize: 11, marginTop: 3, flexShrink: 0 }}>{mark}</span>
  <span>{b}</span>
  </div>
  ))}
  </div>
  </div>
  );
};

const NarrativeCards = ({ memory, genios }) => {
  const dark = React.useContext(InsightThemeContext);
  const cardBg = dark ? "rgba(242,236,228,0.045)" : T.paper;
  const cardBorder = dark ? "rgba(242,236,228,0.2)" : T.lineStrong;
  const rule = dark ? "rgba(242,236,228,0.1)" : T.line;
  const memLabel = dark ? "rgba(242,236,228,0.55)" : T.stone;
  const memBody = dark ? "rgba(242,236,228,0.62)" : T.ink3;
  const memOutcome = dark ? "#E08775" : MUTED_RED;
  const gLabel = dark ? T.brass2 : T.brass;
  const gBody = dark ? T.paper : T.ink;
  const gOutcome = dark ? T.brass2 : T.brassDeep;
  return (
  <figure style={{ margin: "28px 0", border: `0.5px solid ${cardBorder}` }}>
  <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: rule }}>
  <div className="narrative-cell" style={{ background: cardBg, padding: "28px 30px" }}>
  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: memLabel, background: dark ? "rgba(242,236,228,0.06)" : "rgba(10,9,8,0.05)", border: `0.5px solid ${memLabel}40`, padding: "5px 12px", borderRadius: 2, marginBottom: 20 }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: memLabel, display: "inline-block" }} />
  Memory returns
  </div>
  <p style={{ fontFamily: T.serif, fontSize: 15, fontStyle: "italic", color: memBody, lineHeight: 1.65, marginBottom: 18 }}>{memory.body}</p>
  <p style={{ fontSize: 13.5, color: memOutcome, lineHeight: 1.65, fontWeight: 400 }}>{memory.outcome}</p>
  </div>
  <div className="narrative-cell" style={{ background: cardBg, padding: "28px 30px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: gLabel, background: dark ? "rgba(176,137,70,0.12)" : "rgba(176,137,70,0.1)", border: `0.5px solid ${T.brass}`, padding: "5px 12px", borderRadius: 2, marginBottom: 20 }}>
  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.brass, display: "inline-block" }} />
  Genios returns
  </div>
  <p style={{ fontFamily: T.serif, fontSize: 15, fontStyle: "italic", color: gBody, lineHeight: 1.65, marginBottom: 18 }}>{genios.body}</p>
  <p style={{ fontSize: 13.5, color: gOutcome, lineHeight: 1.65, fontWeight: 500 }}>{genios.outcome}</p>
  </div>
  </div>
  </figure>
  );
};

const FAQList = ({ items }) => {
  const dark = React.useContext(InsightThemeContext);
  const border = dark ? "rgba(242,236,228,0.2)" : T.lineStrong;
  const rule = dark ? "rgba(242,236,228,0.1)" : T.line;
  const stripe = dark ? "rgba(242,236,228,0.035)" : "rgba(16,35,42,0.035)";
  const pillBg = dark ? "rgba(242,236,228,0.1)" : T.navy;
  const pillColor = T.paper;
  const qColor = dark ? T.paper : T.ink;
  const aColor = dark ? "rgba(242,236,228,0.75)" : T.ink2;
  return (
  <div style={{ margin: "20px 0", border: `0.5px solid ${border}` }}>
  {items.map((q, i) => (
  <div key={i} className="faq-item" style={{ padding: "24px 26px", borderTop: i === 0 ? "none" : `0.5px solid ${rule}`, background: i % 2 === 0 ? "transparent" : stripe }}>
  <div style={{ display: "inline-block", padding: "3px 10px", background: pillBg, color: pillColor, fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>Q  -  {String(i + 1).padStart(2, "0")}</div>
  <h4 style={{ fontFamily: T.display, fontSize: 18.5, fontWeight: 500, color: qColor, marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.015em", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{q.q}</h4>
  <p style={{ fontSize: 14.5, color: aColor, lineHeight: 1.7, fontWeight: 300 }}>{q.a}</p>
  </div>
  ))}
  </div>
  );
};

const DoesDoesnt = ({ does, doesnt, doesLabel = "Does", doesntLabel = "Doesn’t" }) => {
  const dark = React.useContext(InsightThemeContext);
  const cardBg = dark ? "rgba(242,236,228,0.045)" : T.paper;
  const cardBorder = dark ? "rgba(242,236,228,0.2)" : T.lineStrong;
  const rule = dark ? "rgba(242,236,228,0.1)" : T.line;
  const doesColor = dark ? T.brass2 : T.brass;
  const doesntColor = dark ? "rgba(242,236,228,0.5)" : T.stone;
  const textYes = dark ? "rgba(242,236,228,0.85)" : T.ink2;
  const textNo = dark ? "rgba(242,236,228,0.55)" : T.slate;
  const noMark = dark ? "#E08775" : MUTED_RED;
  return (
  <div className="g2" style={{ margin: "28px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: rule, border: `0.5px solid ${cardBorder}` }}>
  <div className="doesnt-cell" style={{ background: cardBg, padding: "28px 30px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: doesColor, marginBottom: 18 }}>{doesLabel}</div>
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  {does.map((b, i) => (<div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: textYes, lineHeight: 1.6, alignItems: "flex-start", fontWeight: 300 }}><span style={{ color: doesColor, fontFamily: T.mono, fontSize: 11, marginTop: 2, flexShrink: 0 }}>{"\u2713"}</span><span>{b}</span></div>))}
  </div>
  </div>
  <div className="doesnt-cell" style={{ background: cardBg, padding: "28px 30px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: doesntColor, marginBottom: 18 }}>{doesntLabel}</div>
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  {doesnt.map((b, i) => (<div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: textNo, lineHeight: 1.6, alignItems: "flex-start", fontWeight: 300 }}><span style={{ color: noMark, fontFamily: T.mono, fontSize: 11, marginTop: 2, flexShrink: 0 }}>{"\u2715"}</span><span>{b}</span></div>))}
  </div>
  </div>
  </div>
  );
};

const MonthTimeline = ({ items }) => {
  const dark = React.useContext(InsightThemeContext);
  const rail = dark ? "rgba(242,236,228,0.22)" : "rgba(16,35,42,0.28)";
  const dotBg = dark ? T.navy : T.paper;
  const tagColor = dark ? T.brass2 : T.brass;
  const headColor = dark ? T.paper : T.ink;
  const bodyColor = dark ? "rgba(242,236,228,0.78)" : T.ink2;
  return (
  <div style={{ margin: "28px 0", borderLeft: `1px solid ${rail}`, paddingLeft: 32, marginLeft: 8 }}>
  {items.map((m, i) => (
  <div key={i} style={{ marginBottom: i === items.length - 1 ? 0 : 30, position: "relative" }}>
  <div style={{ position: "absolute", left: -39, top: 6, width: 12, height: 12, borderRadius: "50%", background: dotBg, border: `2px solid ${T.brass}` }} />
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: tagColor, marginBottom: 6 }}>Month {m.month}  -  {m.tag}</div>
  <p style={{ fontSize: 15, color: bodyColor, lineHeight: 1.65, fontWeight: 300, maxWidth: 680 }}><strong style={{ color: headColor, fontWeight: 500 }}>{m.headline}</strong> {m.body}</p>
  </div>
  ))}
  </div>
  );
};

/* ─────────────────────────────────────────────────────────────
  INSIGHTS  -  Visualization components
───────────────────────────────────────────────────────────── */

const StatRow = ({ stats }) => {
  const [ref, seen] = useInView(0.3);
  return (
  <div ref={ref} className="insight-stat-row" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
  {stats.map((s, i) => (
  <div key={i} style={{ background: T.paper, padding: "22px 24px", transform: seen ? "translateY(0)" : "translateY(14px)", opacity: seen ? 1 : 0, transition: `transform 0.6s cubic-bezier(.16,1,.3,1) ${i * 0.1}s, opacity 0.5s ease ${i * 0.1}s` }}>
  <div style={{ fontFamily: T.display, fontSize: "clamp(30px,3.8vw,46px)", fontWeight: 600, color: s.warn ? MUTED_RED : T.brass, lineHeight: 1, letterSpacing: "-0.035em", fontVariationSettings: "'opsz' 144,'SOFT' 0", marginBottom: 8 }}>{s.stat}</div>
  <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, lineHeight: 1.3, marginBottom: s.sub ? 4 : 0 }}>{s.label}</div>
  {s.sub && <div style={{ fontSize: 11.5, color: T.stone, lineHeight: 1.45 }}>{s.sub}</div>}
  </div>
  ))}
  </div>
  );
};

const VerdictCard = ({ without, withGenios, headline }) => {
  const [ref, seen] = useInView(0.25);
  return (
  <div ref={ref} style={{ margin: "32px 0 4px", border: `0.5px solid ${T.lineStrong}`, overflow: "hidden", transform: seen ? "none" : "translateY(12px)", opacity: seen ? 1 : 0, transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.5s ease" }}>
  {headline && (
  <div style={{ padding: "10px 20px", background: T.ink, fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.paper, display: "flex", alignItems: "center", gap: 10 }}>
  <span style={{ color: T.brass }}>→</span><span>{headline}</span>
  </div>
  )}
  <div className="verdict-grid">
  <div style={{ background: "#fff", padding: "22px 24px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED_RED, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
  <span style={{ width: 6, height: 6, borderRadius: "50%", background: MUTED_RED, display: "inline-block", flexShrink: 0 }} />Without Genios
  </div>
  {without.map((item, i) => (
  <div key={i} style={{ display: "flex", gap: 9, fontSize: 13.5, color: T.slate, lineHeight: 1.55, marginBottom: 9, alignItems: "flex-start" }}>
  <span style={{ color: MUTED_RED, fontFamily: T.mono, fontSize: 10, marginTop: 2, flexShrink: 0 }}>✕</span><span>{item}</span>
  </div>
  ))}
  </div>
  <div style={{ background: "#fff", padding: "22px 24px", borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.brass, display: "inline-block", flexShrink: 0 }} />With Genios
  </div>
  {withGenios.map((item, i) => (
  <div key={i} style={{ display: "flex", gap: 9, fontSize: 13.5, color: T.ink2, lineHeight: 1.55, marginBottom: 9, alignItems: "flex-start", fontWeight: 300 }}>
  <span style={{ color: T.brass, fontFamily: T.mono, fontSize: 10, marginTop: 2, flexShrink: 0 }}>✓</span><span>{item}</span>
  </div>
  ))}
  </div>
  </div>
  </div>
  );
};


const LAYER_DATA = [
  { label: "Agent Fleet", sub: "Execution layer - sequences tasks, calls tools", chips: ["LangGraph", "CrewAI", "AutoGen", "n8n", "Raw SDK"], note: "<- Your orchestrator lives here", noteColor: T.stone, accent: false },
  { label: "GeniOS", sub: "Reasoning layer - knows your org, not just your workflow", chips: ["Org relationships", "Authority & policy", "Freshness scoring", "Pattern memory"], note: "<- The layer orchestrators cannot see", noteColor: T.brass, accent: true },
  { label: "Org Data", sub: "All context sources, continuously ingested", chips: ["Gmail", "Calendar", "Slack", "CRM", "Notion", "HubSpot"], note: null, noteColor: T.stone, accent: false },
];

const LayerDiagram = () => {
  const [ref, seen] = useInView(0.25);
  return (
  <figure ref={ref} style={{ margin: "28px 0", border: `1px solid ${T.lineStrong}`, overflow: "hidden" }}>
  <div style={{ padding: "12px 20px", background: T.ink, borderBottom: `1px solid rgba(242,236,228,0.12)`, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.6)" }}>Architecture  -  three layers  -  one blind spot</div>
  {LAYER_DATA.map((l, i) => (
  <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${T.lineStrong}` : "none", borderTop: l.accent ? `3px solid ${T.brass}` : "none", background: l.accent ? "rgba(215,90,51,0.07)" : i === 0 ? "rgba(16,35,42,0.03)" : T.paper, transform: seen ? "none" : `translateX(${i % 2 === 0 ? -20 : 20}px)`, opacity: seen ? 1 : 0, transition: `transform 0.7s cubic-bezier(.16,1,.3,1) ${i * 0.14}s, opacity 0.5s ease ${i * 0.14}s` }}>
  <div className="insight-layer-grid">
  <div style={{ padding: "22px 24px", borderRight: `1px solid ${l.accent ? "rgba(215,90,51,0.3)" : T.lineStrong}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: l.accent ? T.brass : T.ink2, marginBottom: 8, fontWeight: l.accent ? 700 : 400 }}>{l.label}</div>
  <div style={{ fontSize: 13, color: l.accent ? T.ink2 : T.stone, lineHeight: 1.5, marginBottom: l.note ? 12 : 0 }}>{l.sub}</div>
  {l.note && <div style={{ fontFamily: T.mono, fontSize: 9.5, color: l.noteColor, fontStyle: "italic", fontWeight: l.accent ? 600 : 400 }}>{l.note}</div>}
  </div>
  <div style={{ padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: 8, alignContent: "center" }}>
  {l.chips.map((chip, j) => (
  <span key={j} style={{ fontFamily: T.mono, fontSize: 10, color: l.accent ? T.brass : T.ink2, border: `1px solid ${l.accent ? T.brass : T.lineStrong}`, padding: "5px 13px", borderRadius: 100, background: l.accent ? "rgba(215,90,51,0.09)" : "rgba(16,35,42,0.04)" }}>{chip}</span>
  ))}
  </div>
  </div>
  </div>
  ))}
  <div style={{ padding: "16px 24px", background: T.ink, display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <div style={{ width: 48, height: 2, background: "rgba(242,236,228,0.3)" }} />
  <span style={{ fontFamily: T.mono, fontSize: 9.5, color: "rgba(242,236,228,0.55)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Orchestrator: Layer 1 only</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <div style={{ width: 48, height: 2, background: T.brass }} />
  <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.brass, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>GeniOS: All 3 layers</span>
  </div>
  </div>
  </figure>
  );
};

const RADAR_AXES = ["Semantic\nSimilarity", "Entity\nRelationships", "Data\nFreshness", "Authority\n& Policy", "Temporal\nPatterns"];
const VEC_SCORES = [0.92, 0.10, 0.15, 0.06, 0.11];
const GEN_SCORES = [0.90, 0.88, 0.85, 0.82, 0.80];

const RadarChart = () => {
  const [ref, seen] = useInView(0.3);
  const [prog, setProg] = useState(0);
  useEffect(() => {
  if (!seen) return;
  let frame;
  const t0 = performance.now();
  const tick = (now) => { const p = Math.min((now - t0) / 1200, 1); setProg(1 - Math.pow(1 - p, 3)); if (p < 1) frame = requestAnimationFrame(tick); };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
  }, [seen]);

  const cx = 180, cy = 160, r = 108, n = RADAR_AXES.length;
  const pt = (score, i, s = 1) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return { x: cx + r * score * s * Math.cos(a), y: cy + r * score * s * Math.sin(a) }; };
  const poly = (scores, s) => scores.map((v, i) => { const p = pt(v, i, s); return `${p.x},${p.y}`; }).join(" ");
  const lp = (i) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return { x: cx + (r + 30) * Math.cos(a), y: cy + (r + 30) * Math.sin(a) }; };

  return (
  <figure ref={ref} style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ padding: "11px 18px", background: T.paper2, borderBottom: `0.5px solid ${T.lineStrong}`, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
  <span>Coverage radar  -  5 dimensions</span>
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9 }}><span style={{ width: 10, height: 10, background: `${T.stone}44`, border: `1px solid ${T.stone}`, display: "inline-block" }} /> Vector DB</span>
  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9 }}><span style={{ width: 10, height: 10, background: `${T.brass}30`, border: `1px solid ${T.brass}`, display: "inline-block" }} /><span style={{ color: T.brass }}>GeniOS</span></span>
  </div>
  </div>
  <div style={{ background: T.paper, display: "flex", justifyContent: "center", padding: "10px 0" }}>
  <svg viewBox="0 0 360 320" width="100%" style={{ maxWidth: 380, display: "block" }}>
  {[0.25, 0.5, 0.75, 1.0].map((ring, ri) => (
  <polygon key={ri} points={RADAR_AXES.map((_, i) => { const p = pt(ring, i); return `${p.x},${p.y}`; }).join(" ")} fill="none" stroke={T.line} strokeWidth="0.75" />
  ))}
  {RADAR_AXES.map((_, i) => { const p = pt(1, i); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={T.line} strokeWidth="0.75" />; })}
  <polygon points={poly(VEC_SCORES, prog)} fill={`${T.stone}28`} stroke={T.stone} strokeWidth="1.5" opacity="0.85" />
  <polygon points={poly(GEN_SCORES, prog)} fill={`${T.brass}22`} stroke={T.brass} strokeWidth="2" />
  {GEN_SCORES.map((s, i) => { const p = pt(s, i, prog); return <circle key={i} cx={p.x} cy={p.y} r="4" fill={T.brass} opacity={prog > 0.5 ? 1 : 0} style={{ transition: "opacity 0.3s" }} />; })}
  {VEC_SCORES.map((s, i) => { const p = pt(s, i, prog); return <circle key={i} cx={p.x} cy={p.y} r="3" fill={T.stone} opacity={prog > 0.5 ? 0.7 : 0} style={{ transition: "opacity 0.3s" }} />; })}
  {RADAR_AXES.map((label, i) => {
  const { x, y } = lp(i);
  const lines = label.split("\n");
  return (
  <text key={i} textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8.5" fill={T.stone}>
  {lines.map((ln, li) => <tspan key={li} x={x} y={li === 0 ? y - (lines.length - 1) * 5.5 : undefined} dy={li > 0 ? "12" : undefined}>{ln}</tspan>)}
  </text>
  );
  })}
  <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7.5" fill={T.stone} opacity="0.4">Coverage</text>
  </svg>
  </div>
  <div style={{ padding: "8px 18px", background: T.paper2, borderTop: `0.5px solid ${T.line}`, fontFamily: T.mono, fontSize: 9, color: T.stone, fontStyle: "italic" }}>Vector DB wins axis 1. GeniOS covers all five. The missing four are where agent failures live.</div>
  </figure>
  );
};

const PAIN_EVENTS = [
  { month: 2,  label: "Agent sprawl",  y: 32  },
  { month: 4,  label: "Stale context",  y: 88  },
  { month: 6,  label: "Compliance gap", y: 152 },
  { month: 8,  label: "Token costs",  y: 198 },
  { month: 10, label: "Review queue",  y: 228 },
];

const PainCurve = () => {
  const [ref, seen] = useInView(0.2);
  const [prog, setProg] = useState(0);
  useEffect(() => {
  if (!seen) return;
  let frame;
  const t0 = performance.now();
  const tick = (now) => { const p = Math.min((now - t0) / 1800, 1); setProg(p); if (p < 1) frame = requestAnimationFrame(tick); };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
  }, [seen]);

  const W = 540, H = 240, pL = 44, pR = 36, pT = 18, pB = 34;
  const pw = W - pL - pR, ph = H - pT - pB;
  const tx = (m) => pL + (m / 12) * pw;
  const ty = (v) => pT + ph - (v / 250) * ph;
  const curvePts = Array.from({ length: 49 }, (_, i) => {
  const m = (i / 48) * 12;
  const v = m < 1 ? 5 : Math.min(246, 5 + Math.pow(m / 1.15, 2.3));
  return `${i === 0 ? "M" : "L"}${tx(m)},${ty(v)}`;
  }).join(" ");

  return (
  <figure ref={ref} style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ padding: "11px 18px", background: T.paper2, borderBottom: `0.5px solid ${T.lineStrong}`, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
  <span>Operational friction  -  without a context layer</span>
  <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9 }}><span style={{ display: "inline-block", width: 16, height: 2, background: MUTED_RED, verticalAlign: "middle" }} /> Without Genios</span>
  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9 }}><span style={{ display: "inline-block", width: 16, height: 2, background: T.brass, opacity: 0.7, verticalAlign: "middle" }} /><span style={{ color: T.brass }}>With Genios</span></span>
  </div>
  </div>
  <div style={{ background: T.paper, overflow: "hidden" }}>
  <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
  <defs><clipPath id="pc-clip"><rect x={pL} y={0} width={pw * prog} height={H} /></clipPath></defs>
  {[0, 0.33, 0.66, 1.0].map((t, i) => <line key={i} x1={pL} y1={pT + ph * (1 - t)} x2={W - pR} y2={pT + ph * (1 - t)} stroke={T.line} strokeWidth="0.5" />)}
  {["Low", "Med", "High"].map((lbl, i) => <text key={i} x={pL - 5} y={pT + ph * (1 - i * 0.5)} textAnchor="end" dominantBaseline="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8" fill={T.stone}>{lbl}</text>)}
  {[0, 2, 4, 6, 8, 10, 12].map((m) => <text key={m} x={tx(m)} y={H - pB + 14} textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8" fill={T.stone}>M{m}</text>)}
  <line x1={tx(0)} y1={ty(12)} x2={tx(12)} y2={ty(18)} stroke={T.brass} strokeWidth="2" strokeDasharray="6 3" opacity="0.75" />
  <text x={tx(11)} y={ty(34)} textAnchor="end" fontFamily="IBM Plex Mono,monospace" fontSize="8" fill={T.brass} opacity="0.85">With Genios →</text>
  <path d={`${curvePts} L${tx(12)},${ty(0)} L${tx(0)},${ty(0)} Z`} fill={`${MUTED_RED}10`} clipPath="url(#pc-clip)" />
  <path d={curvePts} fill="none" stroke={MUTED_RED} strokeWidth="2.5" clipPath="url(#pc-clip)" />
  {PAIN_EVENTS.map((e, i) => {
  const px = tx(e.month), py = ty(e.y);
  const show = prog > e.month / 12;
  return (
  <g key={i} style={{ opacity: show ? 1 : 0, transition: "opacity 0.3s ease" }}>
  <circle cx={px} cy={py} r="5" fill={T.paper} stroke={MUTED_RED} strokeWidth="2" />
  <line x1={px} y1={py - 7} x2={px} y2={py - 22} stroke={MUTED_RED} strokeWidth="0.75" opacity="0.5" />
  <rect x={px - 40} y={py - 37} width={80} height={14} fill={T.paper2} rx="2" />
  <text x={px} y={py - 27} textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7.5" fill={MUTED_RED}>{e.label}</text>
  </g>
  );
  })}
  </svg>
  </div>
  <div style={{ padding: "8px 18px", background: T.paper2, borderTop: `0.5px solid ${T.line}`, fontFamily: T.mono, fontSize: 9, color: T.stone, fontStyle: "italic" }}>Five compounding failures  -  each makes the next worse. All share one root cause: no context layer.</div>
  </figure>
  );
};

const INSIGHT_VERDICTS = [
  { n: "01", title: "The Invisible Wall",  verdict: "Demo works. Production doesn’t. Now you know why.",  win: "Context, continuously" },
  { n: "02", title: "Memory vs Genios",  verdict: "Memory stores facts. Genios acts on patterns.",  win: "Proactive reasoning" },
  { n: "03", title: "Build vs Buy",  verdict: "12 months of infra you didn’t come here to build.",  win: "Day 1 deployment" },
  { n: "04", title: "Why Agents Fail",  verdict: "Not hallucinating  -  working with an incomplete picture.", win: "5-signal coverage" },
  { n: "05", title: "The Real Example",  verdict: "4 hours to follow up. Or one instruction to GeniOS.",  win: "Pattern-aware decisions" },
  { n: "06", title: "Five Questions",  verdict: "Framework-agnostic. Zero agent migration.",  win: "Drop-in integration" },
  { n: "07", title: "Why Genios Exists",  verdict: "Nobody is building the reasoning layer. Yet.",  win: "Uncontested category" },
  { n: "08", title: "Scope",  verdict: "Under your agent. Not replacing it.",  win: "Clear, honest limits" },
  { n: "09", title: "Multi-Agent Fleets",  verdict: "Single-agent infra breaks at fleet scale. Always.",  win: "Fleet-native from day 1" },
];

const InsightSummaryGrid = () => {
  const [ref, seen] = useInView(0.1);
  return (
  <div ref={ref} style={{ marginTop: 80, border: `0.5px solid ${T.lineStrong}`, overflow: "hidden" }}>
  <div className="insight-sum-header" style={{ background: T.ink, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.26em", textTransform: "uppercase", color: T.brass, marginBottom: 8 }}>Summary  -  The Case for Genios</div>
  <div style={{ fontFamily: T.display, fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 500, color: T.paper, letterSpacing: "-0.022em", fontVariationSettings: "'opsz' 144,'SOFT' 30", lineHeight: 1.1 }}>9 arguments. One conclusion.</div>
  </div>
  <div style={{ fontFamily: T.display, fontSize: "clamp(44px,6vw,72px)", fontWeight: 600, color: T.brass, letterSpacing: "-0.04em", lineHeight: 1, fontVariationSettings: "'opsz' 144,'SOFT' 0" }}>9/9</div>
  </div>
  <div className="insight-summary-grid" style={{ borderTop: `0.5px solid ${T.line}` }}>
  {INSIGHT_VERDICTS.map((v, i) => (
  <div key={i} style={{ padding: "18px 20px", borderBottom: `0.5px solid ${T.line}`, borderRight: `0.5px solid ${T.line}`, background: i % 2 === 0 ? T.paper : `${T.paper2}99`, transform: seen ? "none" : "translateY(10px)", opacity: seen ? 1 : 0, transition: `transform 0.5s cubic-bezier(.16,1,.3,1) ${i * 0.04}s, opacity 0.4s ease ${i * 0.04}s` }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.stone, letterSpacing: "0.18em" }}>§ {v.n}</span>
  <span style={{ fontFamily: T.mono, fontSize: 8, color: T.paper, background: T.brass, padding: "2px 7px", borderRadius: 2, letterSpacing: "0.08em" }}>WIN</span>
  </div>
  <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, marginBottom: 6, lineHeight: 1.25 }}>{v.title}</div>
  <div style={{ fontSize: 12, color: T.slate, lineHeight: 1.5, marginBottom: 10 }}>{v.verdict}</div>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.brassDeep }}>→ {v.win}</div>
  </div>
  ))}
  </div>
  <div className="insight-sum-footer" style={{ background: T.ink, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
  <p style={{ fontFamily: T.display, fontSize: "clamp(15px,1.8vw,20px)", color: "rgba(242,236,228,0.88)", lineHeight: 1.55, fontWeight: 400, fontVariationSettings: "'opsz' 144,'SOFT' 50", margin: 0, maxWidth: 580 }}>The context layer your agents need already exists. The question is whether you build it, borrow it, or buy the only product purpose-built for it.</p>
  <a href="/applications" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, flexShrink: 0, textDecoration: "none", cursor: "pointer" }}>→ See it run  -  Applications</a>
  </div>
  </div>
  );
};

const INSIGHTS_TOC = [
  { n: "01", kick: "Problem",  title: "The invisible wall", dark: true },
  { n: "02", kick: "Compare",  title: "Genios vs memory layers" },
  { n: "03", kick: "Build",  title: "vs building it yourself" },
  { n: "04", kick: "Stack",  title: "Why your agent retrieves wrong" },
  { n: "05", kick: "Narrative", title: "The Real Example", dark: true },
  { n: "06", kick: "FAQ",  title: "Five questions you’re asking" },
  { n: "07", kick: "Position",  title: "Why Genios, when others exist" },
  { n: "08", kick: "Scope",  title: "What Genios does  -  and doesn’t" },
  { n: "09", kick: "Fleets",  title: "Multi-agent support" },
];

const InsightsIndex = () => (
  <nav className="insights-idx" aria-label="Insights index">
  <div className="insights-idx-head">
  <span className="l">Index  -  Eleven insights</span>
  <span className="r">I  -  XI</span>
  </div>
  <div className="insights-idx-grid">
  {INSIGHTS_TOC.map((it) => (
  <a key={it.n} href={`#insight-${it.n}`} className={`insights-idx-item${it.dark ? " is-dark" : ""}`}>
  <span className="insights-idx-num">{it.n}</span>
  <div>
  <div className="insights-idx-kick">{it.kick}</div>
  <div className="insights-idx-title">{it.title}</div>
  </div>
  </a>
  ))}
  </div>
  </nav>
);

const Insights = () => (
  <section
  id="insights"
  data-section data-label="§  -  INSIGHTS  -  FIELD MANUAL  -  v1.0" data-dark="false"
  className="sec-pad cream-card"
  style={{ padding: "clamp(64px, 8vw, 96px) 0 clamp(88px, 11vw, 130px)", background: T.paper, position: "relative" }}
  >
  <Page>
  <article style={{ maxWidth: 960, margin: "0 auto" }}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.stone, marginBottom: 44, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderBottom: `0.5px solid ${T.line}`, paddingBottom: 18 }}>
  <span>Field Manual  -  2026</span>
  <span style={{ color: T.brass }}>Nine insights  -  Genios</span>
  </div>

  {/* ── 01 The Invisible Wall ── */}
  <InsightChapter id="insight-01" first>
  <InsightHead n="01" title="The invisible wall." />
  <p style={{ ...INSIGHTS_PROSE, fontSize: 17, color: T.ink }}>Every agent works in the demo. Most break in production.</p>
  <p style={INSIGHTS_PROSE}>Teams blame the model. It’s not the model. In a demo, a human hand-fed the agent the context it needed to look smart. In production, no human is doing that. The agent runs against whatever fits in a prompt, or whatever retrieval happens to return.</p>
  <p style={INSIGHTS_PROSE}>The context the agent actually needed is sitting in your Gmail, Slack, CRM, meeting transcripts, and your team’s heads  -  with no layer connecting it to the moment the agent needs it.</p>
  <p style={INSIGHTS_PROSE}>That’s the wall. Once you see it, you can’t unsee it. Every agent failure you’ve lived through in the last year lines up against it.</p>
  <div style={{ marginTop: 32, padding: "36px 36px", background: T.ink, borderTop: `2px solid ${T.brass}`, textAlign: "center" }}>
  <p style={{ fontFamily: T.display, fontSize: "clamp(24px, 2.8vw, 34px)", fontWeight: 500, letterSpacing: "-0.022em", lineHeight: 1.3, color: T.paper, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: 0 }}>Genios <em className="em-wonk" style={{ color: T.brass2 }}>dismantles</em> the wall.</p>
  </div>
  </InsightChapter>

  {/* ── 02 Memory vs Genios ── */}
  <InsightChapter id="insight-02">
  <InsightHead n="02" title="Genios vs Memory Layers" oneLine="Memory tools tell your agent what happened. Genios tells your agent what to do next." />
  <StatRow stats={[
  { stat: "1/6", label: "Capabilities covered by memory tools", sub: "Storage & recall only" },
  { stat: "6/6", label: "Capabilities covered by GeniOS", sub: "Storage, reasoning, push, multi-agent, authority, patterns" },
  { stat: "0x", label: "Times memory tools push proactively", sub: "They wait to be asked. Always.", warn: true },
  ]} />
  <p style={INSIGHTS_PROSE}><strong style={{ color: T.ink, fontWeight: 500 }}>Where they overlap</strong>  -  storage and retrieval. Both hold facts.</p>
  <p style={INSIGHTS_PROSE}><strong style={{ color: T.ink, fontWeight: 500 }}>Where they diverge</strong>  -  memory waits to be asked. Genios notices on its own, scores signals, and pushes context before your agent queries.</p>
  <InsightsCompareTable
  headers={["Capability", "Memory tools", "Genios"]}
  rows={[
  { label: "Stores facts", a: "✓", b: "✓" },
  { label: "Reasons without being asked", a: "✗", b: "✓" },
  { label: "Pushes signals proactively", a: "✗", b: "✓" },
  { label: "Multi-agent shared state", a: "✗", b: "✓" },
  { label: "Authority & policy logic", a: "✗", b: "✓" },
  { label: "Learns org patterns over time", a: "Limited", b: "✓" },
  ]}
  />
  <VerdictCard
  headline="The memory question, answered"
  without={[
  "Agent acts on data it was given  -  never on data it should have known.",
  "Retrieval is reactive: agent asks, memory answers.",
  "Five capabilities simply don’t exist.",
  ]}
  withGenios={[
  "Agent receives scored, prioritized context before it asks.",
  "Patterns surface automatically  -  cooling deals, authority conflicts, overdue commitments.",
  "All six capabilities in one layer. No assembly required.",
  ]}
  />
  </InsightChapter>

  {/* ── 03 Build vs Buy ── */}
  <InsightChapter id="insight-03">
  <InsightHead n="03" title="Genios vs building it yourself." oneLine="You can build a weekend version. You cannot build the production version while also building your actual product." />
  <StatRow stats={[
  { stat: "12mo", label: "Engineering time to reach production parity", sub: "2 dedicated engineers, full-time", warn: true },
  { stat: "$0", label: "Engineering months spent on your actual product", sub: "While you’re building context infra", warn: true },
  { stat: "Day 1", label: "When Genios is connected and useful", sub: "Ship your product. Not the layer under it." },
  ]} />
  <VerdictCard
  headline="Build vs buy  -  the honest math"
  without={[
  "12 months of engineering before your agent has real context.",
  "Your product roadmap stalls while you maintain infra.",
  "Every new connector is another 4-6 months.",
  ]}
  withGenios={[
  "Connected and useful on Day 1.",
  "Your engineers ship the product they came to build.",
  "Connector roadmap driven by customer demand  -  not your capacity.",
  ]}
  />
  </InsightChapter>

  {/* ── 04 Why your agent fails ── */}
  <InsightChapter id="insight-04">
  <InsightHead n="04" title="Why your agent retrieves the wrong context." oneLine="It’s not hallucinating. It’s working with an incomplete picture of reality." />
  <StatRow stats={[
  { stat: "1/5", label: "Signals your agent currently sees", sub: "Semantic similarity  -  the only signal it gets", warn: true },
  { stat: "5/5", label: "Signals GeniOS gives it", sub: "Similarity + relationships + freshness + authority + patterns" },
  ]} />
  <RadarChart />
  <InsightBulletList
  heading="The four gaps that make your agent fail"
  items={[
  "Relationships  -  it doesn’t know who’s connected to what deal, or who the decision-maker is.",
  "Freshness  -  it can’t see what changed this morning vs six months ago.",
  "Authority  -  it doesn’t know who has to approve, or what happened last time they were asked.",
  "History  -  it can’t learn from past outcomes in your specific org.",
  ]}
  />
  <p style={INSIGHTS_PROSE}>Retrieval finds what looks similar. Context intelligence knows what matters, when, and why. <em style={{ color: T.brassDeep }}>Confusing the two is the most common agent-stack mistake of the last two years.</em></p>
  <VectorVennDiagram />
  <VerdictCard
  headline="The retrieval question, answered"
  without={[
  "Agent finds text that looks relevant  -  but misses what actually matters.",
  "No sense of freshness, authority, or relationship context.",
  "Agent acts on a snapshot, not a living model of your org.",
  ]}
  withGenios={[
  "All five signals scored together  -  relevance across the full context picture.",
  "Every piece of context carries freshness, authority, and provenance.",
  "Agent acts on a continuously updated model of your org’s reality.",
  ]}
  />
  </InsightChapter>

  {/* ── 05 Narrative ── */}
  <InsightChapter id="insight-05">
  <InsightHead n="05" title="The Real Example." />
  <p style={INSIGHTS_PROSE}>A founder reached out to 20 Antler portfolio companies. Mixed responses  -  some via referral, some cold. Then 40 days passed. No follow-up. Not because they didn’t want to. Because doing it right would take half a day they didn’t have.</p>
  <figure style={{ margin: "28px 0", border: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: T.paper2, borderBottom: `0.5px solid ${T.lineStrong}` }}>
  <div style={{ padding: "10px 18px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>Memory returns</div>
  <div style={{ padding: "10px 18px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, borderLeft: `0.5px solid ${T.lineStrong}`, borderTop: `2px solid ${T.brass}` }}>GeniOS returns</div>
  </div>
  {[
  {
  left: "20 contacts. Emails sent 40 days ago. 6 replied, 14 didn’t. That’s all it knows.",
  right: "Every thread already read. Relationship state per contact understood.",
  leftMuted: true,
  },
  { left: "✕  Re-read 20 threads to remember who said what.", right: <><strong>Priya</strong>  -  asked about pricing, came via referral. Lead with the new update that answers her question.</> },
  { left: "✕  Recall who asked a question, who came via referral, who ghosted.", right: <><strong>Arjun</strong>  -  opened 3 times, never replied. Lightweight re-engage. No pitch, just presence.</> },
  { left: "✕  Write a different email for each person from scratch.", right: <><strong>Sneha</strong>  -  replied enthusiastically, then went quiet. Personal note. Acknowledge the gap. Founder-to-founder.</> },
  { left: "", right: <><strong>14 who ignored</strong>  -  one short update. Low friction. Let the product do the talking.</> },
  ].map((r, i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `0.5px solid ${T.line}` }}>
  <div style={{ padding: "13px 18px", fontSize: 13, color: r.leftMuted ? T.stone : MUTED_RED, lineHeight: 1.6, fontStyle: r.leftMuted ? "italic" : "normal" }}>{r.left}</div>
  <div style={{ padding: "13px 18px", fontSize: 13, color: T.ink2, lineHeight: 1.6, borderLeft: `0.5px solid ${T.line}` }}>{r.right}</div>
  </div>
  ))}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${T.lineStrong}`, background: T.paper2 }}>
  <div style={{ padding: "13px 18px", fontFamily: T.mono, fontSize: 10, color: MUTED_RED, letterSpacing: "0.06em" }}>4 hours minimum. The leads go cold.</div>
  <div style={{ padding: "13px 18px", fontSize: 13, fontStyle: "italic", fontFamily: T.serif, color: T.brassDeep, borderLeft: `0.5px solid ${T.lineStrong}` }}>The founder types one instruction. GeniOS writes four different follow-ups  -  each shaped by what actually happened 40 days ago.</div>
  </div>
  </figure>
  <BottomLine>The follow-up didn’t fail because the founder forgot. It failed because doing it right was too expensive. GeniOS makes the right action the easy action.</BottomLine>
  </InsightChapter>

  {/* ── 06 FAQ ── */}
  <InsightChapter id="insight-06">
  <InsightHead n="06" title="Five questions you’re probably asking." />
  <FAQList
  items={[
  { q: "Does Genios replace my memory tool?", a: "For most teams, yes. Our four graphs include the storage work memory tools do. If you’re committed to Mem0 or Zep, Genios reads from them as one more signal source." },
  { q: "Do I have to change my agent framework?", a: "No. Genios plugs into LangGraph, CrewAI, Autogen, n8n, or raw SDK  -  pull API plus webhook push. Framework-agnostic by design." },
  { q: "How fast does Genios get smart about my org?", a: "Useful from day one. Calibrated to your patterns by day 30. Our target agent-action-rate moves from baseline to 65%+ over 90 days  -  that’s what we’re building toward with design partners now." },
  { q: "What happens when Genios is wrong?", a: <span>Every recommendation ships with its evidence. Agent or human can override. Overrides train the loop.<br /><br /><strong style={{ color: T.ink, fontWeight: 600 }}>Wrong recommendations are data, not failures.</strong></span> },
  { q: "Where does our data live?", a: "Raw source data stays in your tenant. Zero-retention on LLM calls. We don’t train on your data. VPC peering available on enterprise." },
  ]}
  />
  <VerdictCard
  headline="The integration question, answered"
  without={[
  "Framework lock-in every time you need better context.",
  "Months of migration to swap memory backends.",
  "No path to calibration  -  generic retrieval forever.",
  ]}
  withGenios={[
  "One API. Works with every major agent framework today.",
  "Zero migration  -  drop in alongside your existing stack.",
  "Calibrated to your org’s patterns by day 30, 65%+ action rate by day 90.",
  ]}
  />
  </InsightChapter>


  {/* ── 07 Positioning ── */}
  <InsightChapter id="insight-07">
  <InsightHead n="07" title="Why Genios, when others exist." />
  <StatRow stats={[
  { stat: "0", label: "Other products purpose-built for the reasoning layer", sub: "Memory tools solve storage. Nobody else solves continuous reasoning.", warn: true },
  { stat: "2yr", label: "Head start on multi-tenant, multi-agent reasoning", sub: "Built for this from day one  -  not a roadmap item" },
  ]} />
  <p style={INSIGHTS_PROSE}>Memory tools solved storage. Nobody has solved the continuous reasoning layer between storage and agent.</p>
  <p style={INSIGHTS_PROSE}>Genios is built for that layer  -  multi-tenant and multi-agent from day one. If you trust a memory company’s roadmap to get there eventually, use them. If you believe reasoning is a different category than memory  -  as Karpathy and YC have signalled  -  Genios is purpose-built for it, and nobody else is yet.</p>
  <PositioningMatrix />
  <VerdictCard
  headline="The market position, mapped"
  without={[
  "Memory tools: high on storage depth, low on reasoning.",
  "RAG / vector: retrieval only, no org model.",
  "Custom builds: high cost, low leverage, permanent maintenance.",
  ]}
  withGenios={[
  "Top-right quadrant: high memory depth AND high reasoning capability.",
  "Purpose-built for the layer nobody else owns.",
  "First-mover in context intelligence  -  not playing catch-up.",
  ]}
  />
  </InsightChapter>

  {/* ── 08 Scope ── */}
  <InsightChapter id="insight-08">
  <InsightHead n="08" title="What Genios does  -  and doesn’t." />
  <DoesDoesnt
  does={[
  "Surfaces cooling deals and missed commitments proactively.",
  "Every recommendation ships with its evidence.",
  "Keeps all your agents on the same ground truth.",
  "Gets sharper over 30-90 days as it learns your org.",
  ]}
  doesnt={[
  "Replace your agent  -  it sits under it, not instead.",
  "Work perfectly on day one  -  needs 2-4 weeks to calibrate.",
  "Remove humans from high-stakes decisions  -  by design.",
  "Access data outside your connected sources.",
  ]}
  />
  <BottomLine>Honest limits matter. We’d rather you know exactly what you’re buying than discover the gaps in production.</BottomLine>
  </InsightChapter>

  {/* ── 09 Multi-agent ── */}
  <InsightChapter id="insight-09">
  <InsightHead n="09" title="Multi-agent support." oneLine="Most memory tools assume one agent. Genios is built for fleets." />
  <DoesDoesnt
  doesLabel="With GeniOS"
  doesntLabel="Without GeniOS"
  does={[
  "One shared context graph  -  many agents, one ground truth.",
  "Agent identity as a first-class primitive with scoped access.",
  "Cross-agent handoffs tracked with full provenance.",
  "Per-agent calibration  -  learns which agent handles what best.",
  ]}
  doesnt={[
  "Agents duplicate ingestion and conflict on facts.",
  "Two agents act on the same opportunity the same hour.",
  "No shared precedent → no learning across agents.",
  "No agent-identity layer → no clean audit trail.",
  ]}
  />
  </InsightChapter>

  <InsightSummaryGrid />

  <div style={{ marginTop: 48, paddingTop: 28, borderTop: `0.5px solid ${T.lineStrong}`, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
  <span>End  -  Insights  -  Genios</span>
  <a href="/applications" style={{ color: T.brass, textDecoration: "none", cursor: "pointer" }}>{"\u2192"} See it run  -  Applications</a>
  </div>
  </article>
  </Page>
  </section>
);

/* ──────────────────────────────────────────────────────────────
  PAGES
─────────────────────────────────────────────────────────────── */
const HomePage = () => (
  <div style={{ background: T.navy }}>
  <Hero />
  <TrustedBy />
  <WhyEverythingFails />
  <WhyGeniOS />
  <Solution />
  <HowItWorks />
  <AgentTagline />
  <Pricing />
  <RequestAccess />
  </div>
);

const ThesisPage = () => (
  <div style={{ background: T.navy }}>
  <PageIntro
  dark
  chapter="Chapter  -  I  -  The Thesis"
  breadcrumb="Thesis"
  title="A seven-part thesis on"
  italic="context infrastructure."
  lede="Why the future of software runs on agents. Why none of them have the context they need. And what has to be built underneath  -  before the multi-agent fleet becomes the norm."
  />
  <Thesis />
  </div>
);

const InsightsPage = () => (
  <div style={{ background: T.navy }}>
  <PageIntro
  dark
  chapter="Chapter  -  II  -  Insights"
  breadcrumb="Insights"
  title="A field manual for teams"
  italic="building with agents."
  lede="Ten arguments, side-by-side  -  how Genios compares to memory layers, vector DBs, and the weekend DIY. What breaks without a reasoning layer. What to buy, what to build, and what to leave alone."
  />
  <InvisibleLayer />
  <FourGraphs />
  <Insights />
  </div>
);

const CASE_STUDIES = [
  {
  n: "01",
  title: "A solo founder running a sales agent across 60+ active accounts",
  tag: "Private Beta  -  Solo",
  situation: "Pre-seed founder, B2B SaaS, running an AI sales assistant to manage outreach across 60+ accounts. Model: Claude SDK, custom prompting. Working well in demo. Breaking in production.",
  problem: "Every morning the agent queued 15-20 follow-ups based on email timestamps. No sense of relationship health. No awareness of what had changed since last contact. On three occasions the agent followed up on contacts who had already moved to a competitor. Twice it followed up on deals the founder had verbally agreed to pause  -  commitments extracted nowhere. The founder was spending 90 minutes a day reviewing the agent’s queue before allowing sends. Defeating the entire purpose.",
  changes: [
  "Day 1: Gmail + Calendar connected. Backfill completed.",
  "Day 3: First commitment facts extracted  -  7 open commitments the founder had forgotten.",
  "Day 7: First relationship cooling signal  -  a champion who’d gone quiet 18 days ago.",
  "Day 14: Agent queue review time dropped from 90 minutes to under 15.",
  "Day 30: Founder removed manual review entirely for standard follow-ups.",
  ],
  moment: "GeniOS detected that a contact the agent was about to follow up on had just posted a LinkedIn announcement about joining a competitor. State graph updated. Recommendation pushed: \"Hold outreach. Contact has transitioned  -  no longer relevant for this deal. Update CRM. Flag account for re-assessment.\" The founder never saw the LinkedIn post. GeniOS caught it.",
  result: "Zero inappropriate follow-ups in 45 days after day 14. Follow-up quality  -  measured by reply rate  -  improved from 18% to 31%. Time spent supervising the agent: down 83%.",
  disclaimer: "Figures from our private beta. Individual results vary based on data source depth and agent configuration.",
  },
  {
  n: "02",
  title: "A 3-person AI-native startup running multiple agents across one organization",
  tag: "Private Beta  -  Multi-agent",
  situation: "Seed-stage startup, 3 founders, 2 engineers. Running 4 agents  -  research, sales, customer success, and internal ops. All built on LangGraph. All pulling from the same organization’s data. None of them sharing context.",
  problem: "Within the first month, the sales agent and CS agent made contact with the same prospect on the same day  -  different messages, different tones, neither aware of the other. The prospect noticed. The research agent was surfacing leads the sales agent had already disqualified  -  no shared state on what \"disqualified\" meant or why. The ops agent was scheduling follow-ups based on calendar availability without knowing the sales agent had already committed to specific timing. Three agents. One organization. Three separate models of reality.",
  changes: [
  "Week 1: Single shared context graph connected to all 4 agents.",
  "Week 2: First conflict prevention  -  CS agent held back on a contact the sales agent had in active sequence.",
  "Week 3: Research agent lead quality improved  -  disqualification reasons shared as precedent facts.",
  "Week 4: Ops agent began scheduling based on relationship state, not just calendar slots.",
  ],
  moment: "GeniOS detected that the sales and CS agents were both about to contact the same enterprise prospect within a 4-hour window. State graph: sales agent had an active sequence, day 3 of 7. GeniOS pushed a coordination signal: \"CS agent: hold. Sales agent has active outreach. Route to sales lead for decision on whether to merge or hand off. Do not contact until resolved.\" No duplicate contact. No confused prospect.",
  result: "Agent conflict incidents dropped to zero after week 2. Lead re-processing by the research agent eliminated. Founders reported spending 60% less time manually coordinating between agent outputs.",
  disclaimer: "Figures from our private beta. Individual results vary based on team size, agent count, and connector depth.",
  },
];

const CaseStudies = () => (
  <section
  style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper2 }}
  >
  <Page>
  <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 72px" }}>
  <SectionLabel>Field Reports</SectionLabel>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(30px,3.8vw,52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.032em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 18 }}>
  From private beta.<br /><em className="em-wonk" style={{ color: T.brass }}>Two real deployments.</em>
  </h2>
  <p style={{ fontSize: 16, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>
  What actually happened when teams replaced manual agent supervision with a reasoning layer.
  </p>
  </div>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: 2, background: T.lineStrong }}>
  {CASE_STUDIES.map((cs) => (
  <article key={cs.n} style={{ background: T.paper, padding: "clamp(36px,4vw,56px)", display: "flex", flexDirection: "column", gap: 28 }}>
  <header>
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
  <span style={{ fontFamily: T.display, fontSize: 42, fontWeight: 300, color: T.brass, letterSpacing: "-0.03em", lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>{cs.n}</span>
  <span style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}>{cs.tag}</span>
  </div>
  <h3 style={{ fontFamily: T.display, fontSize: "clamp(18px,2vw,24px)", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.018em", color: T.ink, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{cs.title}</h3>
  </header>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>The situation</div>
  <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{cs.situation}</p>
  </div>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>The problem</div>
  <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{cs.problem}</p>
  </div>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>What changed</div>
  {cs.changes.map((c, i) => (
  <div key={i} style={{ display: "flex", gap: 12, fontSize: 13.5, color: T.ink2, lineHeight: 1.6, marginBottom: 8, alignItems: "flex-start" }}>
  <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.brass, flexShrink: 0, marginTop: 2 }}>→</span>
  <span>{c}</span>
  </div>
  ))}
  </div>
  <div style={{ padding: "20px 22px", background: T.ink, borderTop: `2px solid ${T.brass}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 12 }}>The move that mattered most</div>
  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 14, color: "rgba(242,236,228,0.85)", lineHeight: 1.65, margin: 0 }}>{cs.moment}</p>
  </div>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>Result</div>
  <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{cs.result}</p>
  <p style={{ fontSize: 11.5, color: T.stone, lineHeight: 1.6, margin: "12px 0 0", fontStyle: "italic" }}>{cs.disclaimer}</p>
  </div>
  </article>
  ))}
  </div>
  </Page>
  </section>
);

const ApplicationsPage = () => (
  <div style={{ background: T.navy }}>
  <PageIntro
  dark
  chapter="Chapter  -  III  -  Applications"
  breadcrumb="Applications"
  title="One context graph."
  italic="Every agent. Zero blind spots."
  lede="How GeniOS changes agent behavior across the functions where the stakes are highest. Not by giving agents more facts  -  by telling them the move before they ask."
  />
  <Applications />
  <RequestAccessC />
  </div>
);

const BlogsPage = () => {
  useEffect(() => {
  const origin = window.location.origin;
  document.title = "Essays on Context Infrastructure | GeniOS";
  _setMeta('meta[name="description"]',  "name",  "description",  "Engineering decisions, field reports, and teardowns from building the organizational context brain.");
  _setMeta('meta[property="og:title"]',  "property", "og:title",  "Essays on Context Infrastructure | GeniOS");
  _setMeta('meta[property="og:description"]', "property", "og:description", "Engineering decisions, field reports, and teardowns from building the organizational context brain.");
  _setMeta('meta[property="og:type"]',  "property", "og:type",  "website");
  _setMeta('meta[property="og:url"]',  "property", "og:url",  `${origin}/blogs`);
  _setLink("canonical", `${origin}/blogs`);
  _clearSchemas();
  _injectSchema({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
  { "@type": "ListItem", "position": 1, "name": "Home",  "item": origin },
  { "@type": "ListItem", "position": 2, "name": "Essays", "item": `${origin}/blogs` },
  ],
  });
  return () => _resetMeta();
  }, []);

  return (
  <div style={{ background: T.navy }}>
  <PageIntro
  dark
  chapter="Writing  -  Field Notes"
  breadcrumb="Blogs"
  title="Essays on"
  italic="context infrastructure."
  lede="Engineering decisions, field reports, and teardowns from building the organizational context brain."
  />
  <BlogList />
  </div>
  );
};

const StartupProgramPage = () => (
  <div style={{ background: T.navy }}>
  <PageIntro
  dark
  chapter="Programs  -  Two On-Ramps, One Engine"
  breadcrumb="Programs"
  title="Two programs."
  italic="One context layer."
  lede="Reserved for early-stage founders and solo builders. Startup Program for pre-seed teams. Hustler Program for solo builders. Same context engine  -  priced for where you actually are."
  />
  <StartupProgramContent />
  </div>
);

/* ──────────────────────────────────────────────────────────────
  PRIVACY POLICY PAGE
─────────────────────────────────────────────────────────────── */
const PP_SECTIONS = [
  {
  no: "01", title: "Definitions",
  body: [
  ["Account", "Shall mean any registered individual user account or organizational account, howsoever designated, that has been created, provisioned, and activated for the purpose of accessing, utilizing, or otherwise interacting with the Service, whether on a trial, complimentary, or paid subscription basis."],
  ["Connected Source", "Shall mean any third-party data source, software platform, application programming interface, digital system, or external data repository that a User or Tenant has expressly authorized GeniOS to access, read, retrieve data from, or otherwise interface with on such User’s or Tenant’s behalf, including without limitation electronic mail platforms, calendaring systems, customer relationship management systems, messaging platforms, project management tools, and any analogous business applications."],
  ["Customer Data", "Shall mean the totality of all data, content, materials, information, records, and other digital assets that a User, Tenant, or their authorized representatives submit, upload, transmit, make accessible to, or cause to be ingested by the Service, including without limitation any data received by the Service from Connected Sources pursuant to User-granted authorizations."],
  ["Derived Data", "Shall mean all data, analytical outputs, statistical patterns, inference signals, contextual scores, predictive indicators, relational maps, and operational insights that GeniOS generates, computes, or produces as a result of the automated and computational processing of Customer Data or any subset thereof. Derived Data constitutes a distinct category of information that is produced as a functional output of the Service and shall not be construed to be Customer Data for the purposes of this Policy."],
  ["Personal Data", "Shall mean any information, or any combination of information, that identifies, or that could with reasonable effort be used to identify, a specific natural person, whether directly or indirectly, as such term is construed and defined under applicable data protection legislation, including the Digital Personal Data Protection Act, 2023 (India), the General Data Protection Regulation (EU) 2016/679, and any analogous statutory instruments enacted within jurisdictions in which GeniOS operates or processes data."],
  ["Processing", "Shall mean any operation or set of operations performed upon data or sets of data, whether or not carried out by automated means, including but not limited to collection, recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure by transmission, dissemination, alignment, combination, restriction, erasure, and destruction of such data."],
  ["Service", "Shall mean, in its entirety, the GeniOS proprietary software platform, all associated application programming interfaces, software development kits, administrative and management interfaces, developer documentation, publicly accessible websites, and all ancillary products, features, components, and capabilities provided, operated, and maintained by GeniOS, as such Service may be modified, updated, supplemented, or replaced from time to time at the sole and absolute discretion of GeniOS."],
  ["Tenant", "Shall mean any individual natural person or legal entity, including corporations, limited liability companies, partnerships, sole proprietors, and other recognized legal formations, that has established an Account and is accessing or utilizing the Service pursuant to a valid subscription agreement, trial authorization, or other contractual arrangement with GeniOS."],
  ],
  type: "glossary",
  },
  {
  no: "02", title: "Categories of Information Collected",
  subsections: [
  { label: "Account and Registration Information", items: ["Full legal name and professional designation or title", "Business or professional electronic mail address", "Legal name of the employing or contracting company or organization", "Country of residence or principal place of business, together with general geographic region", "Authentication credentials, which are stored exclusively in irreversibly hashed cryptographic form; plaintext passwords are never retained by GeniOS at any point in the data lifecycle", "Active subscription tier and associated billing plan designation"] },
  { label: "Billing and Payment Information", items: ["Name and electronic mail address associated with the designated payment instrument", "Registered billing address corresponding to the payment method on file", "Payment instrument classification, including card network type and the terminal four digits of the card number", "GeniOS does not directly collect, store, index, or retain full payment card numbers, card verification values, bank account routing numbers, or any analogous sensitive financial authentication data; all payment transaction processing is performed exclusively by contracted third-party payment processors who bear independent regulatory and contractual responsibility for the security and handling of such financial data"] },
  { label: "Customer Data Derived from Connected Sources", items: ["Electronic mail message metadata, transmission headers, sender and recipient address information, message subject lines, and the substantive content of messages, to the extent transmitted through authorized Connected Source integrations", "Calendar event denominations, scheduled attendee identifications, temporal scheduling parameters, recurrence configurations, and associated event metadata", "Contact record identifiers, professional role designations, organizational affiliation data, and historical communication records accessible through Connected Source APIs", "Workflow records, task assignments, project state information, and operational data accessible through authorized business platform integrations", "The precise scope and categories of Customer Data received from any individual Connected Source are determined exclusively by: (i) the permissions expressly granted by the User during the authorization process; (ii) the data types made technically available through that Connected Source’s API; and (iii) what is operationally necessary for the Service to perform its described functions"] },
  { label: "Application Programming Interface and Usage Data", items: ["API request logs comprising endpoint identifiers, request timestamps, HTTP response status codes, and volumetric consumption metrics", "Tenant and Account identifiers associated with each discrete API transaction", "System response latency measurements and service-level performance instrumentation data", "Exception traces, error codes, and system diagnostic logs generated in connection with Service interactions", "Webhook dispatch records and corresponding delivery outcome data"] },
  { label: "Technical, Device, and Network Data", items: ["Internet Protocol address and approximate geographic location at the regional or metropolitan level", "Client browser type, version designation, and rendering engine classification", "Host operating system and device form factor classification", "Inbound referral source and navigation pathway data", "Uniform Resource Locator interaction records and session duration metrics", "Session and state persistence identifiers"] },
  { label: "Communications and Correspondence Data", items: ["The substantive content of all written communications directed to GeniOS through any channel", "Contact and identification information voluntarily provided in the course of such communications", "Chronological records of prior interactions, support engagements, and correspondence history"] },
  ],
  type: "subsections-list",
  },
  {
  no: "03", title: "Mechanisms of Data Collection",
  items: [
  ["Direct Voluntary Disclosure", "Information provided by the User or Tenant in the course of Account registration, profile configuration, Connected Source authorization, commercial inquiries, technical support requests, or any other volitional interaction with the Service or GeniOS personnel."],
  ["Automated Technical Collection", "Information collected passively and automatically through the operation of the Service, including data generated by API request processing, server-side logging infrastructure, product telemetry instrumentation, and standard network-layer technical mechanisms, whenever the User, Tenant, or any integrated automated system initiates contact with or queries the Service."],
  ["Connected Source Ingestion", "Information received by GeniOS from authorized Connected Source platforms through OAuth 2.0 authorization flows, API key authentication, or such other technical authorization mechanisms as the User has explicitly initiated, reviewed, and approved through the applicable Connected Source’s standard authorization interface."],
  ["Third-Party Vendor Transmission", "Strictly limited categories of information transmitted by contracted third-party service vendors solely in connection with the performance of Account identity verification, payment transaction processing, and security threat screening functions, in each case subject to binding contractual data protection obligations governing such vendor’s use, storage, and disclosure of such information."],
  ],
  type: "pairs",
  note: "GeniOS does not acquire, purchase, license, lease, or otherwise procure Personal Data from commercial data brokers, third-party data marketplaces, data aggregators, or any analogous data intermediaries.",
  },
  {
  no: "04", title: "Purposes and Legal Bases for Processing",
  subsections: [
  { label: "Provision and Delivery of the Service", items: ["Computational processing of data received from Connected Sources for the purpose of generating structured contextual outputs for consumption by User-operated software agents and automated systems", "Structural organization, analytical processing, and inferential reasoning over Organizational Data for the production of Derived Data outputs", "Receipt, processing, and fulfillment of API requests and delivery of corresponding Service outputs to designated endpoints", "Continuous maintenance of the accuracy, currency, and integrity of contextual information representations maintained within each Tenant Account", "Proactive delivery of intelligence outputs, operational recommendations, and state-change signals to User-designated webhooks, notification endpoints, and integrated systems"] },
  { label: "Account Administration and Operational Management", items: ["Establishment, provisioning, and lifecycle management of User and Tenant Accounts", "Processing, settlement, and reconciliation of subscription fees and billing transactions", "Enforcement of applicable usage limitations, rate thresholds, and plan-level entitlements", "Issuance of transactional communications, including payment receipts, overage notifications, usage threshold alerts, and account status notices"] },
  { label: "Service Improvement, Research, and Development", items: ["Statistical analysis of aggregated usage patterns for the purpose of enhancing Service reliability, computational accuracy, and operational performance", "Detection, diagnosis, and remediation of technical defects, system vulnerabilities, and service degradation incidents", "Research and development activities directed at the creation of new Service features and the enhancement of existing functional capabilities", "Internal performance benchmarking and qualitative evaluation of automated processing outputs", "Notwithstanding the foregoing, GeniOS does not utilize identifiable Customer Data for the purpose of training, fine-tuning, calibrating, or otherwise developing any publicly released or commercially distributed artificial intelligence or machine learning model without the prior written consent of the relevant Tenant"] },
  { label: "Information Security and Fraud Mitigation", items: ["Detection, investigation, and prevention of unauthorized access attempts, service abuse, credential compromise, and misappropriation of Service resources", "Protection of the security, operational integrity, and continuous availability of GeniOS' technical infrastructure", "Fulfillment of obligations imposed by applicable information security regulatory frameworks"] },
  { label: "Legal Compliance and Rights Enforcement", items: ["Compliance with applicable statutes, administrative regulations, judicial orders, and mandatory legal processes", "Enforcement of the GeniOS Terms of Service, Acceptable Use Policy, and all ancillary contractual agreements", "Response to lawful compulsory disclosure demands issued by governmental, regulatory, or law enforcement authorities possessing competent jurisdiction", "Establishment, assertion, exercise, or defense of legal rights and claims in judicial, arbitral, or administrative proceedings"] },
  { label: "Communications and Commercial Outreach", items: ["Response to technical support requests, commercial inquiries, and other User-initiated communications", "Delivery of product update notifications, policy amendment notices, and mandatory service communications", "Subject to the prior express opt-in consent of the recipient, transmission of commercial marketing communications relating to GeniOS products, features, and promotional offerings; any such consent may be withdrawn at any time by submitting a written opt-out request to hello@thegenios.com; withdrawal of consent shall not affect the lawfulness of processing carried out prior to such withdrawal; transactional and operational communications are not subject to opt-out and shall continue for the duration of the active Account relationship"] },
  ],
  type: "subsections-list",
  },
  {
  no: "05", title: "Automated Processing and Algorithmic Intelligence Systems",
  paras: [
  "The GeniOS Service is predicated upon, and operates substantially through, proprietary automated processing systems, computational reasoning engines, and algorithmic inference frameworks that ingest, structure, analyze, and reason over Customer Data and Connected Source data for the purpose of generating Derived Data and contextual outputs. Such automated processing constitutes an essential, core, and non-severable functional characteristic of the Service. By accessing or using the Service, each User and Tenant expressly and irrevocably acknowledges and consents to the automated processing of their Customer Data as described herein, and affirms that such consent is informed, voluntary, and freely given.",
  "The automated processing operations performed by GeniOS include, without limitation, the following categories of computational activity: (i) ingestion, parsing, normalization, and structural transformation of data received from Connected Sources; (ii) extraction, classification, entity recognition, and taxonomic categorization of entities, events, relational structures, temporal signals, and operational indicators present within Organizational Data; (iii) continuous longitudinal analysis of evolving data patterns, state transitions, and informational changes occurring within a Tenant’s Organizational Data corpus; (iv) generation of structured and machine-readable contextual output payloads for delivery to User-designated API endpoints; (v) synthesis of operational recommendations, anomaly alerts, and priority signals for delivery to configured notification systems; and (vi) perpetual maintenance, recalibration, and versioning of internal data representations in response to newly ingested signals.",
  "GeniOS employs third-party large language model application programming interfaces as a component of its automated processing and inferential reasoning pipeline. Data submitted to or processed by such third-party model providers is subject to those providers' respective data processing agreements and terms of service, with which GeniOS maintains binding contractual data protection obligations as a condition of such engagement. GeniOS takes commercially reasonable precautions to limit, anonymize, or pseudonymize the volume and specificity of identifiable information transmitted to third-party model providers.",
  "GeniOS does not exercise, and the Service does not perform, fully automated decision-making processes that produce legal effects, legal consequences, or comparably significant impacts upon natural persons without human intervention. All outputs generated by the Service constitute informational context, analytical recommendations, and operational signals, the use, interpretation, validation, approval, rejection, and execution of which remains exclusively, irrevocably, and non-delegably the responsibility of the Tenant, its designated personnel, and its integrated automated systems.",
  ],
  type: "paras",
  },
  {
  no: "06", title: "Disclosure and Onward Transfer of Data",
  intro: "GeniOS does not sell, rent, barter, trade, lease, sublicense, or otherwise transfer for commercial consideration any Personal Data or Customer Data to any third party. Disclosure of data is strictly confined to the following exhaustively enumerated circumstances:",
  subsections: [
  { label: "Authorized Subprocessors and Service Vendors", items: ["Cloud infrastructure and colocation providers engaged for the purposes of computational hosting, data storage, content delivery, and platform operations", "Payment processing entities and financial intermediaries engaged for billing management, subscription fee settlement, and chargeback administration", "Cybersecurity, intrusion detection, and infrastructure monitoring services engaged for threat identification, vulnerability management, and incident response", "Product analytics and performance observability services engaged for reliability monitoring and service quality assurance", "Transactional electronic mail delivery services engaged for the dispatch of Account-related communications", "All contracted subprocessors are bound by legally enforceable data processing agreements that prohibit any use of Tenant data beyond the scope of services rendered to GeniOS and that impose standards of data security no less rigorous than those maintained by GeniOS; a current and complete register of authorized subprocessors is available upon written request submitted to hello@thegenios.com"] },
  { label: "Legal Process and Regulatory Compliance", items: ["Pursuant to requirements imposed by applicable statute, regulation, binding judicial decree, or other mandatory legal instrument", "In response to a valid compulsory disclosure demand issued by a governmental authority, regulatory body, or law enforcement agency possessing lawful jurisdiction over GeniOS or the subject matter of the demand", "GeniOS will, where permissible under applicable law and not prohibited by a lawful confidentiality order, provide prior or contemporaneous notice to the affected Tenant of any such compelled disclosure; GeniOS shall not voluntarily furnish data to law enforcement authorities in excess of what is compelled by applicable legal process"] },
  { label: "Protection of Legal Rights and Safety", items: ["Where GeniOS has a reasonable, good-faith belief that disclosure is necessary to investigate, prevent, or take protective action against suspected fraudulent conduct, unauthorized access, active security incidents, or material violations of the GeniOS Terms of Service", "Where disclosure is reasonably necessary to protect the legal rights, proprietary interests, physical safety, or property of GeniOS, its personnel, its Users, or the general public"] },
  { label: "Corporate Restructuring and Business Succession", items: ["In connection with a merger, acquisition, divestiture, restructuring, reorganization, dissolution, sale, or transfer of all or a material portion of GeniOS' assets or business operations, whether as a going concern or in connection with insolvency proceedings, your information may be transferred to, or subjected to due diligence review by, the relevant successor or acquiring entity", "GeniOS will provide reasonably practicable advance notice to affected Tenants prior to any such transfer, and any successor entity will be contractually required to either: (a) honor the terms of this Privacy Policy without material diminution of Tenant rights; or (b) provide Tenants with advance notice of any material changes and afford a reasonable opportunity to request deletion of their data prior to the effective date of such changes"] },
  { label: "Processing Subject to Explicit Consent", items: ["GeniOS may disclose or transfer information to third parties for purposes not described in this Privacy Policy where the relevant Tenant or User has provided prior, explicit, specific, freely given, and revocable informed consent to such disclosure; such consent may be withdrawn at any time in accordance with the procedures set forth in Section 11 of this Policy."] },
  ],
  type: "subsections-list",
  },
  {
  no: "07", title: "Third-Party Integrations and Connected Source Governance",
  items: [
  ["Scope and Limits of Access", "Upon connection of a third-party platform as a Connected Source, GeniOS shall access, retrieve, and process data from that platform exclusively within the scope of the permissions expressly granted by the User during the applicable authorization flow, and solely to the extent operationally necessary for the delivery of the Service; GeniOS shall not access, retrieve, or utilize Connected Source data for any purpose extraneous to the provision of the Service to the relevant Tenant."],
  ["User and Tenant Responsibility", "Each User and Tenant bears sole and exclusive responsibility for ensuring that: (i) they possess the legal right, authority, and, where applicable, necessary third-party consents required to authorize GeniOS to access and process data from the relevant Connected Sources, including any data pertaining to third-party individuals, contacts, colleagues, or counterparties whose information may be accessible through such sources; (ii) their use of Connected Sources in conjunction with the Service complies in all respects with the terms of service, acceptable use policies, and applicable licensing terms of the respective Connected Source platforms; and (iii) all natural persons whose Personal Data may be processed by GeniOS through Connected Source integrations have been provided with legally adequate notice of such processing to the extent required under applicable law."],
  ["Third-Party Data Practices Disclaimer", "GeniOS exercises no control over, accepts no responsibility for, and makes no representations regarding the data collection, storage, Processing, retention, or disclosure practices of third-party Connected Source platforms. Each User’s and Tenant’s engagement with such platforms is independently governed by the respective privacy policies, terms of service, and data processing agreements of those platforms, which GeniOS strongly encourages all Users to review in their entirety."],
  ["Revocation of Connected Source Authorization", "A User or Tenant may revoke GeniOS' authorization to access any Connected Source at any time by: (a) utilizing the Connected Source platform’s own native authorization and permissions management interface to revoke the GeniOS application’s access credentials; or (b) disconnecting the relevant integration through the Account settings interface of the GeniOS Service. Upon revocation, GeniOS shall cease the collection of new data from the relevant Connected Source; provided, however, that Customer Data previously ingested and processed, together with any Derived Data generated therefrom, shall be retained in accordance with Section 08 of this Policy unless the Tenant submits a separate and express written deletion request."],
  ],
  type: "pairs",
  },
  {
  no: "08", title: "Data Retention and Destruction",
  table: [
  ["Account and registration information", "Duration of active Account subsistence plus ninety (90) calendar days following Account termination"],
  ["Billing and payment records", "Seven (7) years from the date of the underlying transaction, as mandated by applicable tax and financial recordkeeping statutes"],
  ["Customer Data (active Account)", "Duration of active Account subsistence plus thirty (30) calendar days following Account termination"],
  ["Archived contextual data (Early Plan)", "Seven (7) calendar days from date of archival"],
  ["Archived contextual data (Startup Plan)", "Ninety (90) calendar days from date of archival"],
  ["Archived contextual data (Scale / Enterprise)", "As expressly stipulated in the applicable Order Form or Master Service Agreement"],
  ["API transaction and usage logs", "Twelve (12) calendar months from the date of generation"],
  ["Security incident and audit logs", "Twenty-four (24) calendar months from the date of generation"],
  ["Support correspondence and communications", "Three (3) years from the date of the most recent interaction"],
  ],
  type: "table",
  note: "Upon Account termination by either party, GeniOS shall cease active Processing of Customer Data and shall permanently delete or render irreversibly anonymized all Customer Data within thirty (30) calendar days of the effective termination date, subject to extension where retention is mandated by applicable law, regulatory obligation, or pending legal process. In such circumstances, GeniOS shall retain only the minimum data categories and volumes required and for only the minimum duration mandated. Anonymized and statistically aggregated data, which by definition cannot be used to re-identify any individual or organization, may be retained and utilized by GeniOS in perpetuity.",
  },
  {
  no: "09", title: "Information Security Safeguards",
  items: [
  ["Data-in-Transit Encryption", "All data transmitted between User or Tenant systems and GeniOS infrastructure is encrypted using Transport Layer Security (TLS) version 1.2 or such higher version as represents the current industry standard, ensuring that data cannot be intercepted or read during network transmission."],
  ["Data-at-Rest Encryption", "All Customer Data and other Tenant information stored within GeniOS' infrastructure is encrypted at rest utilizing industry-standard symmetric encryption algorithms of not less than 256-bit key strength, protecting stored data against unauthorized physical or logical access."],
  ["Logical Tenant Isolation", "GeniOS implements strict logical and architectural data isolation controls ensuring that the Customer Data, Organizational Data, and Derived Data of each individual Tenant are maintained in a segregated environment that is inaccessible to any other Tenant, customer, or unauthorized party."],
  ["Role-Based Access Controls", "Access to Customer Data by GeniOS personnel is governed by a principle-of-least-privilege, role-based access control framework, under which access is granted exclusively to personnel whose specific job functions require such access; all such access is subject to comprehensive audit logging for accountability and forensic investigation purposes."],
  ["API Authentication Requirements", "All programmatic requests to the GeniOS Service API must present valid, non-expired authentication credentials; unauthenticated or improperly authenticated requests are rejected without processing."],
  ["Security Assessment Program", "GeniOS conducts regular internal security reviews, vulnerability assessments, penetration testing engagements, and dependency audits, and applies secure software development lifecycle practices, including mandatory code review and dependency management protocols, in the development and maintenance of the Service."],
  ],
  type: "pairs",
  note: "Notwithstanding the foregoing security measures, no information security architecture, however robust, can guarantee absolute immunity from all unauthorized access, disclosure, or loss. GeniOS cannot warrant the unconditional security of data transmitted over public internet infrastructure, which inherently carries risks beyond our operational control. In the event that GeniOS confirms a security breach resulting in unauthorized access to, or disclosure of, Personal Data, GeniOS shall notify affected Tenants within seventy-two (72) hours of such confirmation, to the extent required by applicable law, and shall notify relevant regulatory authorities as required.",
  },
  {
  no: "10", title: "Cross-Border Data Transfers and Jurisdictional Compliance",
  paras: [
  "GeniOS is a company incorporated and headquartered in India. Customer Data and other Tenant information may be Processed on computational infrastructure located within India and, where technically necessitated by specific product configurations, geographic redundancy requirements, or contractual commitments, on infrastructure operated in other jurisdictions in which GeniOS' contracted cloud infrastructure providers maintain data processing facilities. By accessing or using the Service, each User and Tenant expressly acknowledges and consents to the transfer, storage, and Processing of their data in India and in any other jurisdiction in which GeniOS' infrastructure partners operate.",
  "Where GeniOS transfers Personal Data across international borders, it shall implement contractually binding data processing agreements with all relevant subprocessors incorporating legally recognized cross-border data transfer mechanisms as required by applicable law, and shall apply data security standards consistent with those described in Section 09 of this Policy, irrespective of the jurisdiction in which Processing occurs.",
  "GeniOS is committed to the ongoing compliance with all applicable data protection and privacy statutes and regulatory frameworks in the jurisdictions in which it conducts operations, including without limitation: the Digital Personal Data Protection Act, 2023, as the primary governing data protection statute applicable to GeniOS; the General Data Protection Regulation (EU) 2016/679, to the extent that GeniOS Processes Personal Data of natural persons located within the European Economic Area; and such other national, regional, or sector-specific data protection instruments as may be applicable based on the jurisdictions from which the Service is accessed.",
  ],
  type: "paras",
  },
  {
  no: "11", title: "Data Subject Rights and Procedural Mechanisms",
  subsections: [
  { label: "Enumeration of Applicable Rights", items: ["Right of Access: the right to request and obtain confirmation of whether GeniOS Processes Personal Data relating to you and, if so, to obtain a copy of such Personal Data together with comprehensive information regarding the purposes, legal bases, categories, recipients, and retention periods applicable to such Processing", "Right of Rectification: the right to request the correction or completion of Personal Data that is inaccurate, incomplete, or misleading, including through the provision of a supplementary statement", "Right of Erasure: the right to request the permanent deletion of Personal Data, subject to the right’s limitations where retention is required by applicable legal obligations, regulatory mandates, or the establishment, exercise, or defense of legal claims", "Right to Restriction of Processing: the right to request a temporary or permanent suspension of the Processing of Personal Data under specified statutory conditions, including pending the verification of accuracy disputes or the determination of objection grounds", "Right to Object: the right to object, on grounds relating to the particular situation of the data subject, to the Processing of Personal Data carried out on the basis of legitimate interests or in the public interest, including profiling activities predicated on such grounds", "Right to Data Portability: the right, where technically feasible and required by applicable law, to receive Personal Data provided to GeniOS in a structured, commonly used, machine-readable, and interoperable format, and to transmit such data to an alternative controller without impediment from GeniOS", "Right to Withdraw Consent: where Processing is predicated upon the data subject’s consent, the right to withdraw such consent at any time without prejudice to the lawfulness of Processing activities carried out prior to such withdrawal"] },
  { label: "Procedural Requirements for Exercising Rights", items: ["All requests for the exercise of the foregoing rights must be submitted in writing to hello@thegenios.com", "Requests must include: the full legal name and Account-associated electronic mail address of the requesting party; a specific and unambiguous description of the right or rights the requesting party wishes to exercise; and sufficient identifying information to enable GeniOS to locate the specific data categories to which the request pertains", "GeniOS shall respond to valid and verified requests within thirty (30) calendar days of receipt; in cases of complexity or high request volume, GeniOS reserves the right to extend this response period by an additional thirty (30) days, provided that the requesting party is notified in writing of such extension and the reasons therefor prior to expiration of the initial period", "GeniOS may require reasonable identity verification procedures prior to processing any rights request, in order to protect against fraudulent or unauthorized requests; GeniOS shall not fulfill requests that are demonstrably unfounded, excessive in scope, or repetitive in nature"] },
  ],
  type: "subsections-list",
  note: "The rights enumerated in this Section apply exclusively to Personal Data. Customer Data submitted to GeniOS on behalf of an organizational Tenant is primarily governed by and subject to the control of that Tenant. Natural persons whose Personal Data has been processed through a third-party Tenant’s Account should direct their rights requests to that Tenant organization as the primary data controller; GeniOS shall cooperate with such requests as required by applicable law.",
  },
  {
  no: "12", title: "Multi-Tenancy Architecture and Logical Data Segregation",
  paras: [
  "The GeniOS Service is architected and operated as a multi-tenant software platform wherein each individual Tenant Account operates within a logically and architecturally isolated computational environment. GeniOS implements and continuously maintains stringent technical controls and architectural safeguards designed to ensure that: (i) no Tenant is capable of accessing, reading, querying, or otherwise obtaining any Customer Data, Organizational Data, Derived Data, or other information belonging to or associated with any other Tenant, whether through the Service’s user interface, API, or any other access vector; (ii) Customer Data ingested or processed on behalf of one Tenant does not infiltrate, contaminate, influence, or introduce artifacts into the contextual representations, Derived Data, or Service outputs generated for any other Tenant; and (iii) all GeniOS personnel access to Customer Data is subject to role-based access controls and comprehensive audit logging as described in Section 09.",
  "GeniOS does not, under any circumstances whatsoever, share, disclose, transmit, expose, or make accessible any raw Customer Data, raw Organizational Data, or identifiable information belonging to one Tenant to any other Tenant, customer, or third party, except as expressly and exhaustively enumerated in Section 06 of this Policy.",
  ],
  type: "paras",
  },
  {
  no: "13", title: "Anonymized, Aggregated, and De-Identified Data",
  paras: [
  "In the course of providing, operating, maintaining, and improving the Service, GeniOS may, as a technical and operational byproduct of Service operation, generate, compile, retain, and utilize anonymized, aggregated, statistically processed, and permanently de-identified data derived from patterns of Service utilization and automated processing outputs. Such de-identified data may encompass, without limitation: population-level statistical distributions of Service usage behaviors across the aggregate Tenant base; aggregated computational performance benchmarks and accuracy instrumentation metrics; de-identified signal pattern corpora utilized to calibrate and improve the reliability and quality of automated processing outputs; and generalized, non-attributable observations regarding the performance characteristics of automated processing systems when applied to differing categories of organizational data inputs.",
  "Anonymized and aggregated data as described herein does not include, and GeniOS takes active technical and procedural measures to ensure that such data does not incorporate: any individually identifiable Personal Data; any identifiable Organizational Data attributable to a specific Tenant; any raw or unprocessed Customer Data; any communications content, contact records, or organizational records in their original or substantially unmodified form; or any data that could, whether through re-identification attacks, inference, correlation, or any other analytical technique, be reverse-engineered, reconstructed, or otherwise used to identify, attribute data to, or distinguish any individual natural person, Tenant organization, or third party.",
  "All anonymized and aggregated data generated by GeniOS as a derivative output of Service operation constitutes the sole and exclusive intellectual property of GeniOS. GeniOS reserves the right to use, retain, analyze, publish, and commercialize such anonymized and aggregated data indefinitely and in perpetuity for any lawful business purpose, including without limitation Service improvement, academic and commercial research, industry benchmarking, and the development of new products and capabilities. This perpetual right expressly survives and is unaffected by the termination or expiration of any individual Tenant Account or subscription agreement.",
  ],
  type: "paras",
  },
  {
  no: "14", title: "Limitation of Liability Pertaining to Service Outputs",
  paras: [
  "The GeniOS Service generates and delivers contextual information, analytical recommendations, operational signals, probabilistic indicators, and other computational outputs (collectively, \"Service Outputs\") to software agents, application programming interfaces, webhook endpoints, notification systems, and other programmatic or human-facing endpoints as designated by the Tenant. All Service Outputs are generated by automated, algorithmic processing systems and are designed and intended solely to augment, supplement, and inform the deliberative processes of software agents and human operators; they are not intended to, and shall not be construed to, constitute determinative instructions, mandatory directives, professional advice of any kind, or a substitute for independent human or agent judgment, oversight, and decision-making.",
  "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GENIOS TECHNOLOGIES EXPRESSLY AND IRREVOCABLY DISCLAIMS ALL LIABILITY, AND SHALL HAVE NO OBLIGATION TO INDEMNIFY, DEFEND, OR HOLD HARMLESS ANY PERSON OR ENTITY, ARISING OUT OF OR IN CONNECTION WITH: (I) ANY ACTION TAKEN, INITIATED, OR OMITTED BY ANY SOFTWARE AGENT, AUTOMATED SYSTEM, HUMAN OPERATOR, EMPLOYEE, CONTRACTOR, OR ANY OTHER PARTY IN RELIANCE UPON, BASED UPON, OR IN RESPONSE TO ANY SERVICE OUTPUT; (II) ANY DECISION, TRANSACTION, COMMITMENT, OR COURSE OF CONDUCT MADE, ENTERED INTO, OR ADOPTED USING OR INFORMED BY SERVICE OUTPUTS, REGARDLESS OF WHETHER SUCH DECISION RESULTS IN ECONOMIC HARM, OPERATIONAL LOSS, THIRD-PARTY LIABILITY, OR ANY OTHER FORM OF DAMAGE OR PREJUDICE; (III) ANY INACCURACY, INCOMPLETENESS, UNTIMELINESS, STALENESS, OR UNFITNESS FOR ANY PARTICULAR PURPOSE OF ANY SERVICE OUTPUT; OR (IV) ANY CONSEQUENCE, INJURY, LOSS, OR LIABILITY ARISING FROM A SERVICE OUTPUT THAT IS ERRONEOUS, INCOMPLETE, DELAYED, MISDELIVERED, OR MISINTERPRETED BY ANY PARTY.",
  "The Tenant bears sole, exclusive, and non-delegable responsibility for: (a) subjecting all Service Outputs to independent validation, verification, and quality review prior to acting upon them or incorporating them into automated workflows; (b) implementing and maintaining adequate human oversight protocols, approval gating mechanisms, circuit-breaker safeguards, and escalation procedures governing the actions of software agents operating in conjunction with the Service; (c) ensuring that all software agents, automated systems, and personnel operating under the Tenant’s direction conduct themselves appropriately, lawfully, and in compliance with applicable regulations, irrespective of the content of any Service Output; and (d) assuming full legal and operational responsibility for all actions taken by agents, employees, contractors, or systems under the Tenant’s control.",
  "THE SERVICE, ALL SERVICE OUTPUTS, AND ALL ASSOCIATED FUNCTIONALITY ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, RELIABILITY, OR UNINTERRUPTED AVAILABILITY.",
  ],
  type: "paras",
  },
  {
  no: "15", title: "Minors and Age Restrictions",
  paras: [
  "The GeniOS Service constitutes a strictly business-to-business commercial software platform designed, developed, marketed, and licensed exclusively for use by commercial entities, professional organizations, and adult professionals acting within the scope of their business or employment capacity. The Service is not directed at, designed for, intended for use by, or marketed to natural persons below the age of eighteen (18) years. GeniOS does not knowingly solicit, collect, Process, or retain Personal Data from individuals under the age of eighteen (18). In the event that GeniOS becomes aware that it has inadvertently or unknowingly collected Personal Data from a person under the age of eighteen (18), GeniOS shall, upon such discovery, take immediate and prompt steps to permanently delete such data from all applicable systems and records. Any party with knowledge or reasonable belief that GeniOS has received data from a minor is requested to provide immediate written notice to hello@thegenios.com.",
  ],
  type: "paras",
  },
  {
  no: "16", title: "Cookies, Tracking Technologies, and Session Instrumentation",
  items: [
  ["Strictly Necessary Operational Cookies", "Cookies and analogous session-state technologies that are technically required for the proper functioning, security, and integrity of the Service’s website and application interfaces; these cookies cannot be disabled, restricted, or rejected without materially impairing the functionality of the Service, and no opt-out mechanism is provided with respect to this category."],
  ["Performance and Aggregate Analytics Cookies", "Cookies and instrumentation technologies deployed for the purpose of collecting aggregate, anonymized statistical information regarding user interaction patterns, navigation behaviors, and feature engagement metrics for the purposes of diagnosing performance issues and improving user experience; data collected through these technologies is processed exclusively in aggregate form and is not utilized to identify, profile, or track individual users."],
  ["Functional Preference Cookies", "Cookies utilized to retain user-specific interface preferences, regional settings, language configurations, and session customizations in order to deliver a consistent and personalized Service experience across successive sessions."],
  ],
  type: "pairs",
  note: "GeniOS does not deploy, authorize, or permit the use of third-party behavioral advertising cookies, cross-site user tracking technologies, browser fingerprinting techniques, or any other persistent tracking mechanism for advertising targeting, behavioral profiling, or commercial audience segmentation purposes. Users may configure, restrict, or disable cookies through their browser’s native privacy and storage management controls; GeniOS notes that restricting or disabling certain cookie categories may impair the functionality, performance, or availability of specific Service features.",
  },
  {
  no: "17", title: "Governing Law, Jurisdiction, and Regulatory Compliance",
  paras: [
  "This Privacy Policy, and all rights, obligations, disputes, and legal relationships arising out of or in connection with it, shall be exclusively governed by, construed in accordance with, and enforced pursuant to the laws of the Republic of India, including without limitation the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and all subsidiary rules, regulations, and amendments promulgated thereunder, without regard to any conflict-of-laws principles that might otherwise require the application of the law of another jurisdiction. All disputes, controversies, or claims arising out of or in connection with this Privacy Policy, including disputes regarding its existence, validity, interpretation, breach, or termination, shall be subject to the exclusive jurisdiction of the competent courts of India, and each party irrevocably submits to such jurisdiction.",
  "With respect to Users and Tenants located within, or whose Personal Data originates from, the European Economic Area, the United Kingdom, or Switzerland, GeniOS represents and warrants its commitment to compliance with all GDPR obligations applicable to GeniOS in its capacity as a data processor and, where applicable, a data controller. The lawful bases upon which GeniOS relies for Processing activities include: (i) performance of a contract, where Processing is strictly necessary for the delivery of the Service to which the Tenant has subscribed and with respect to which a valid agreement is in force; (ii) legitimate interests pursued by GeniOS, including the maintenance of information security, the prevention and investigation of fraudulent activity, the improvement and optimization of the Service, and the communication of material service updates, provided that such interests are not overridden by the fundamental rights and freedoms of the data subjects concerned; (iii) compliance with a legal obligation, where Processing is required by applicable statute or regulatory mandate; and (iv) consent, where GeniOS has obtained the prior, specific, freely given, and unambiguous consent of the relevant data subject for a defined Processing purpose.",
  ],
  type: "paras",
  },
  {
  no: "18", title: "Amendments, Modifications, and Policy Versioning",
  paras: [
  "GeniOS expressly reserves the unconditional right to amend, modify, supplement, restate, or otherwise revise this Privacy Policy at any time and without prior notice, in its sole and absolute discretion, as may be necessitated by changes in applicable law or regulatory requirements, modifications to the technical architecture or functional scope of the Service, evolving industry standards and best practices, corporate restructuring, changes in data processing practices, or any other business or operational requirements of GeniOS. This Policy is therefore subject to change at any time and without limitation, and Users and Tenants are strongly advised to review this page periodically to remain informed of the then-current terms.",
  "For amendments constituting material changes, defined as modifications that substantively affect the categories of Personal Data collected, the purposes for which Personal Data is Processed, the rights afforded to data subjects, or the conditions under which data is disclosed to third parties, GeniOS shall endeavor to provide notification by electronic mail to the address associated with the relevant Account and shall post a conspicuous notice within the Service interface no fewer than fourteen (14) calendar days in advance of the effective date of such changes; provided, however, that GeniOS does not guarantee the delivery of such notices and assumes no liability for any failure of the data subject to receive, read, or act upon any such notice.",
  "Amendments constituting non-material changes, including but not limited to editorial clarifications, typographical corrections, structural reorganization, or formatting modifications that do not substantively alter the rights or obligations of any party, may be implemented by GeniOS immediately and without advance notice or individual notification; the \"Last Reviewed\" date at the head of this Policy document shall in all cases be updated to reflect the date of the most recent revision.",
  "A User’s or Tenant’s continued access to or use of the Service following the effective date of any amended Privacy Policy shall constitute, and shall be irrevocably deemed to constitute, unqualified acceptance of the amended Policy in its entirety. Users or Tenants who do not agree with the terms of an amended Privacy Policy must discontinue all use of the Service prior to the effective date of the amendment. Archived prior versions of this Privacy Policy are maintained in GeniOS' internal document management system and are available upon written request submitted to hello@thegenios.com.",
  ],
  type: "paras",
  },
  {
  no: "19", title: "Contact and Correspondence",
  paras: [
  "All inquiries, requests, complaints, concerns, or correspondence relating to this Privacy Policy, GeniOS' data processing practices, the exercise of data subject rights, or any other privacy-related matter should be directed in writing to GeniOS at the following designated contact address: hello@thegenios.com. GeniOS shall endeavor to acknowledge receipt of and respond substantively to all privacy-related inquiries within thirty (30) calendar days of receipt of a complete and properly submitted communication. Where a User or Tenant is not satisfied with the response provided by GeniOS or believes that GeniOS has failed to adequately address or resolve a privacy concern, such party retains the right to escalate the matter and lodge a formal complaint with the competent data protection supervisory authority or regulatory body having jurisdiction over the relevant data subject’s place of habitual residence or the location in which the alleged Privacy Policy breach occurred.",
  ],
  type: "paras",
  },
];

const PrivacyPolicyPage = () => {
  useEffect(() => {
  document.title = "Privacy Policy | GeniOS";
  window.scrollTo(0, 0);
  }, []);

  return (
  <div style={{ background: T.paper }}>
  {/* Hero */}
  <section style={{ background: T.navy, padding: "clamp(88px,10vw,140px) clamp(24px,5vw,60px) clamp(64px,8vw,100px)", borderBottom: `0.5px solid rgba(242,236,228,0.12)`, position: "relative", overflow: "hidden" }}>
  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(242,236,228,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,236,228,0.04) 1px,transparent 1px)`, backgroundSize: "68px 68px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 10%,transparent 80%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 10%,transparent 80%)", pointerEvents: "none" }} />
  <Page style={{ position: "relative", zIndex: 1 }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,236,228,0.45)", marginBottom: 26 }}>
  <Link to="/" style={{ color: "rgba(242,236,228,0.45)", textDecoration: "none" }} className="footer-link">§ Home</Link>
  <span style={{ margin: "0 12px", color: "rgba(242,236,228,0.2)" }}>/</span>
  <span style={{ color: T.brass }}>Privacy Policy</span>
  </div>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass, marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 14 }}>
  <span style={{ display: "inline-block", width: 32, height: 1, background: T.brass }} />
  Legal  -  GeniOS
  </div>
  <h1 style={{ fontFamily: T.display, fontSize: "clamp(40px,6vw,88px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.042em", color: T.paper, marginBottom: 24, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>
  Privacy <em className="em-wonk" style={{ color: T.brass }}>Policy</em>
  </h1>
  <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.35)", marginBottom: 4 }}>Effective Date</div>
  <div style={{ fontFamily: T.mono, fontSize: 12, color: T.paper, letterSpacing: "0.08em" }}>April 20, 2026</div>
  </div>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.35)", marginBottom: 4 }}>Last Reviewed</div>
  <div style={{ fontFamily: T.mono, fontSize: 12, color: T.paper, letterSpacing: "0.08em" }}>April 20, 2026</div>
  </div>
  <div>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.35)", marginBottom: 4 }}>Document Ref</div>
  <div style={{ fontFamily: T.mono, fontSize: 12, color: T.paper, letterSpacing: "0.08em" }}>GeniOS-PRIVACY-POL-v1.0</div>
  </div>
  </div>
  </Page>
  </section>

  {/* Preamble */}
  <Page style={{ paddingTop: 64, paddingBottom: 0, maxWidth: 760 }}>
  <div style={{ borderLeft: `2px solid ${T.brass}`, paddingLeft: 24, marginBottom: 72 }}>
  <p style={{ fontFamily: T.serif, fontSize: 15, lineHeight: 1.72, color: T.ink2, margin: 0, fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}>
  This Privacy Policy sets forth the legally binding terms and conditions governing the collection, use, processing, storage, retention, disclosure, and protection of information by GeniOS in connection with the provision of the Service. This document constitutes a binding legal instrument. By accessing, registering for, or otherwise using the Service, each User and Tenant represents, warrants, and irrevocably agrees to be bound by the terms of this Privacy Policy in their entirety. GeniOS expressly reserves the right to amend, modify, or restate this Policy at any time and without prior notice, in accordance with Section 18. Continued use of the Service following any such amendment shall constitute unqualified acceptance of the revised Policy.
  </p>
  </div>
  </Page>

  {/* Sections */}
  <Page style={{ paddingTop: 0, paddingBottom: 120, maxWidth: 760 }}>
  <div>
  {PP_SECTIONS.map((sec) => (
  <div key={sec.no} style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `0.5px solid ${T.line}` }}>
  {/* Section header */}
  <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28 }}>
  <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>{sec.no}</span>
  <h2 style={{ fontFamily: T.display, fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 400, letterSpacing: "-0.025em", color: T.ink, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 20" }}>{sec.title}</h2>
  </div>

  {/* Glossary */}
  {sec.type === "glossary" && (
  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
  {sec.body.map(([term, def], i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, padding: "16px 0", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", color: T.brassDeep, textTransform: "uppercase", paddingTop: 2 }}>{term}</div>
  <div style={{ fontFamily: T.body, fontSize: 14, lineHeight: 1.65, color: T.ink2 }}>{def}</div>
  </div>
  ))}
  </div>
  )}

  {/* Pairs */}
  {sec.type === "pairs" && (
  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
  {sec.items.map(([label, val], i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, padding: "16px 0", borderBottom: `0.5px solid ${T.line}` }}>
  <div style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.1em", color: T.brassDeep, textTransform: "uppercase", paddingTop: 2 }}>{label}</div>
  <div style={{ fontFamily: T.body, fontSize: 14, lineHeight: 1.65, color: T.ink2 }}>{val}</div>
  </div>
  ))}
  {sec.note && <p style={{ fontFamily: T.body, fontSize: 13, lineHeight: 1.6, color: T.slate, margin: "20px 0 0", fontStyle: "italic" }}>{sec.note}</p>}
  </div>
  )}

  {/* Table */}
  {sec.type === "table" && (
  <div>
  <div style={{ border: `0.5px solid ${T.lineDark}`, overflow: "hidden" }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: T.ink, padding: "10px 20px" }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T.paper, opacity: 0.6 }}>Data Category</div>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T.paper, opacity: 0.6 }}>Retention Period</div>
  </div>
  {sec.table.map(([cat, period], i) => (
  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "13px 20px", borderTop: `0.5px solid ${T.line}`, background: i % 2 === 0 ? "transparent" : "rgba(176,137,70,0.03)" }}>
  <div style={{ fontFamily: T.body, fontSize: 13.5, color: T.ink2 }}>{cat}</div>
  <div style={{ fontFamily: T.mono, fontSize: 12, color: T.brassDeep, letterSpacing: "0.04em" }}>{period}</div>
  </div>
  ))}
  </div>
  {sec.note && <p style={{ fontFamily: T.body, fontSize: 13, lineHeight: 1.6, color: T.slate, margin: "20px 0 0", fontStyle: "italic" }}>{sec.note}</p>}
  </div>
  )}

  {/* Subsections list */}
  {sec.type === "subsections-list" && (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
  {sec.intro && <p style={{ fontFamily: T.body, fontSize: 14, lineHeight: 1.68, color: T.ink2, margin: 0 }}>{sec.intro}</p>}
  {sec.subsections.map((sub, i) => (
  <div key={i}>
  <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brassDeep, marginBottom: 12 }}>{sub.label}</div>
  <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 7 }}>
  {sub.items.map((item, j) => (
  <li key={j} style={{ fontFamily: T.body, fontSize: 14, lineHeight: 1.65, color: T.ink2 }}>{item}</li>
  ))}
  </ul>
  </div>
  ))}
  {sec.note && <p style={{ fontFamily: T.body, fontSize: 13, lineHeight: 1.6, color: T.slate, margin: "8px 0 0", fontStyle: "italic" }}>{sec.note}</p>}
  </div>
  )}

  {/* Paragraphs */}
  {sec.type === "paras" && (
  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
  {sec.paras.map((p, i) => (
  <p key={i} style={{ fontFamily: T.body, fontSize: 14.5, lineHeight: 1.72, color: T.ink2, margin: 0 }}>{p}</p>
  ))}
  </div>
  )}
  </div>
  ))}

  {/* Bottom signature */}
  <div style={{ textAlign: "center", paddingTop: 20 }}>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.stone, marginBottom: 10 }}>GeniOS  -  Built in India for the World</div>
  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", color: T.stone }}>(c) 2026 GeniOS. All rights reserved.</div>
  </div>
  </div>
  </Page>
  </div>
  );
};

/* ──────────────────────────────────────────────────────────────
  ROOT
─────────────────────────────────────────────────────────────── */
export default function DemoNavy() {
  const path = useRoute();
  const active = useActiveSection();
  const progress = useScrollProgress();

  const isHome = path === "/" || path === "";

  const page = (() => {
  if (path && path.startsWith("/blogs/")) {
  const slug = path.slice("/blogs/".length).replace(/\/$/, "");
  return <BlogPostPage slug={slug} />;
  }
  switch (path) {
  case "/thesis":  return <ThesisPage />;
  case "/insights":  return <InsightsPage />;
  case "/applications":  return <ApplicationsPage />;
  case "/blogs":  return <BlogsPage />;
  case "/startup-program":  return <StartupProgramPage />;
  case "/privacy-policy":  return <PrivacyPolicyPage />;
  default:  return <HomePage />;
  }
  })();

  return (
  <>
  <style>{CSS}</style>
  {/* ── ANNOUNCEMENT BAR ── */}
  <div style={{ background: T.brass, color: T.navy, fontFamily: T.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center", padding: "6px 16px", position: "relative", zIndex: 200 }}>
  <span style={{ opacity: 0.7, marginRight: 10 }}>✦</span>
  Early access open  -  Founding Customer pricing locked till 2030 &nbsp; - &nbsp; 50% off forever
  <span style={{ opacity: 0.7, marginLeft: 10 }}>✦</span>
  </div>
  <TopNav currentPath={path} progress={progress} />
  {page}
  {!isHome && path !== "/applications" && <PreFooter />}
  <Footer />
  </>
  );
}
