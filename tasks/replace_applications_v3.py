import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/DemoNavy.jsx', encoding='utf-8') as f:
    content = f.read()

# ── Find the Applications component JSX (return statement to closing };)
COMP_START = "  return (\n    <section\n      id=\"applications\""
COMP_END   = "};\n\n/* ──────────────────────────────────────────────────────────────\n   · TIER USE CASES"

si = content.find(COMP_START)
ei = content.find(COMP_END, si)
assert si != -1, "Could not find Applications return start"
assert ei != -1, "Could not find Applications component end"

OLD_BLOCK = content[si:ei]

NEW_BLOCK = """  return (
    <section
      id="applications"
      data-section data-label="§ · EVERY ROLE · EVERY DOMAIN · ONE BRAIN" data-dark="false"
      className="sec-pad cream-card"
      style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper, position: "relative" }}
    >
      <Page>
        {/* Header — above the box */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
          <SectionLabel>Scenario Calculator</SectionLabel>
          <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 16 }}>
            One context graph.<br />Every agent. <em className="em-wonk" style={{ color: T.brass }}>Zero blind spots.</em>
          </h2>
          <p style={{ fontSize: 15, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>
            Pick your role, agent type, and domain. See exactly where GeniOS changes the outcome.
          </p>
        </div>

        {/* ── THE CALCULATOR BOX ── */}
        <div style={{ border: `0.5px solid ${T.ink}`, boxShadow: "0 40px 80px -44px rgba(16,35,42,0.32), 0 8px 24px -12px rgba(16,35,42,0.12)", background: T.paper, overflow: "hidden" }}>

          {/* Control Panel — dark top strip */}
          <div style={{ background: T.ink, padding: "clamp(18px,2.4vw,28px) clamp(18px,2.8vw,32px)", borderBottom: "0.5px solid rgba(242,236,228,0.08)" }}>

            {/* Title bar + live selection status */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.brass, display: "inline-block", boxShadow: "0 0 0 3px rgba(215,90,51,0.2)" }} />
                <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.brass }}>Scenario Calculator</span>
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.12em", color: "rgba(242,236,228,0.38)", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ color: "rgba(242,236,228,0.65)" }}>{APP_ROLES.find(r => r.id === roleId)?.label}</span>
                <span style={{ color: "rgba(242,236,228,0.2)" }}>·</span>
                <span style={{ color: "rgba(242,236,228,0.65)" }}>{APP_AGENT_TYPES.find(a => a.id === agentTypeId)?.label}</span>
                <span style={{ color: "rgba(242,236,228,0.2)" }}>·</span>
                <span style={{ color: "rgba(242,236,228,0.65)" }}>{APP_DOMAINS.find(d => d.id === domainId)?.label}</span>
              </div>
            </div>

            {/* Row 1 — Role */}
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
                      style={{ padding: "8px 18px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: active ? T.paper : "transparent", color: active ? T.ink : "rgba(242,236,228,0.45)", border: `0.5px solid ${active ? T.paper : "rgba(242,236,228,0.14)"}`, cursor: "pointer", transition: "all .18s ease", borderRadius: 2 }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.4)"; e.currentTarget.style.color = "rgba(242,236,228,0.8)"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.14)"; e.currentTarget.style.color = "rgba(242,236,228,0.45)"; } }}
                    >{r.label}</button>
                  );
                })}
              </div>
            </div>

            {/* Row 2 — Agent Type */}
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
                      style={{ padding: "8px 16px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", background: active ? T.brass : "transparent", color: active ? "#fff" : "rgba(242,236,228,0.45)", border: `0.5px solid ${active ? T.brass : "rgba(242,236,228,0.14)"}`, cursor: "pointer", transition: "all .18s ease", borderRadius: 2, textAlign: "center" }}
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

            {/* Row 3 — Domain */}
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
                      style={{ padding: "8px 16px", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", background: active ? "rgba(242,236,228,0.12)" : "transparent", color: active ? T.paper : "rgba(242,236,228,0.45)", border: `0.5px solid ${active ? "rgba(242,236,228,0.35)" : "rgba(242,236,228,0.14)"}`, cursor: "pointer", transition: "all .18s ease", borderRadius: 2 }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.4)"; e.currentTarget.style.color = "rgba(242,236,228,0.8)"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(242,236,228,0.14)"; e.currentTarget.style.color = "rgba(242,236,228,0.45)"; } }}
                    >{d.label}</button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results — left rail + right panel */}
          <div className="app-stage" style={{ display: "grid", gridTemplateColumns: "minmax(200px,260px) 1fr" }}>

            {/* Left rail */}
            <aside className="app-rail" style={{ background: T.ink, color: T.paper, padding: "24px 0", position: "relative", borderRight: "0.5px solid rgba(242,236,228,0.08)" }}>
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
              <div style={{ padding: "clamp(24px,3vw,40px)", background: T.paper, display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Scenario title + description */}
                <div style={{ paddingBottom: 20, borderBottom: `0.5px solid ${T.line}` }}>
                  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: T.stone, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-block", width: 18, height: "0.5px", background: T.ink, opacity: 0.3 }} />
                    Scenario
                  </div>
                  <h3 style={{ fontFamily: T.display, fontSize: "clamp(17px,2vw,24px)", fontWeight: 400, lineHeight: 1.18, letterSpacing: "-0.022em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: "0 0 12px" }}>
                    {scenario.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: T.ink2, lineHeight: 1.65, margin: 0 }}>{scenario.scenario}</p>
                </div>

                {/* Without vs With */}
                <div className="app-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "rgba(156,74,62,0.045)", border: "0.5px solid rgba(156,74,62,0.22)", padding: "18px 20px" }}>
                    <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED_RED, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 600 }}>&#x2715;</span> Without GeniOS
                    </div>
                    <p style={{ fontSize: 13, color: T.ink2, lineHeight: 1.65, margin: 0 }}>{scenario.withMemory}</p>
                  </div>
                  <div style={{ background: T.ink, border: `0.5px solid ${T.brass}`, borderTop: `2px solid ${T.brass}`, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `linear-gradient(${T.paper} 0.5px, transparent 0.5px), linear-gradient(90deg, ${T.paper} 0.5px, transparent 0.5px)`, backgroundSize: "20px 20px" }} />
                    <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "radial-gradient(circle at top right, rgba(215,90,51,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
                    <div style={{ position: "relative" }}>
                      <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 600 }}>&#x2713;</span> With GeniOS
                      </div>
                      <p style={{ fontSize: 13, color: "rgba(242,236,228,0.78)", lineHeight: 1.65, margin: 0 }}>{scenario.withGenios}</p>
                    </div>
                  </div>
                </div>

                {/* The One Thing */}
                <div style={{ background: T.cardBg, border: `0.5px solid ${T.lineStrong}`, borderLeft: `3px solid ${T.brass}`, padding: "14px 20px" }}>
                  <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, marginBottom: 8 }}>The one thing</div>
                  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 14, color: T.ink, lineHeight: 1.55, margin: 0, fontVariationSettings: "'opsz' 144, 'SOFT' 40" }}>{scenario.theOneThing}</p>
                </div>

                {/* Why it matters + Impact */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                  <div>
                    <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 8 }}>Why it matters</div>
                    <p style={{ fontSize: 13, color: T.ink2, lineHeight: 1.65, margin: 0 }}>{scenario.whyItMatters}</p>
                  </div>
                  <div style={{ background: T.ink, color: T.paper, padding: "14px 16px", minWidth: 150, maxWidth: 190, textAlign: "center", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: `linear-gradient(${T.paper} 0.5px, transparent 0.5px), linear-gradient(90deg, ${T.paper} 0.5px, transparent 0.5px)`, backgroundSize: "16px 16px" }} />
                    <div style={{ position: "relative" }}>
                      <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.35)", marginBottom: 8 }}>Impact</div>
                      <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 12, color: "rgba(242,236,228,0.78)", lineHeight: 1.55, margin: 0 }}>{scenario.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Graphs */}
                <div style={{ paddingTop: 16, borderTop: `0.5px solid ${T.line}`, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone }}>Graphs queried</div>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {scenario.graphs.split(" \xb7 ").map(g => (
                      <span key={g} style={{ fontFamily: T.mono, fontSize: 9, color: T.brass, display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.brass, display: "inline-block" }} />{g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plan recommendation */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: T.ink, marginTop: 8, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,236,228,0.38)", marginBottom: 5 }}>If this is your reality</div>
                    <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 400, color: T.paper, letterSpacing: "-0.015em", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>{scenario.planLabel}</div>
                  </div>
                  <a href="#request" style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, padding: "10px 18px", border: "0.5px solid " + T.brass, textDecoration: "none", display: "inline-block", flexShrink: 0 }}>
                    Get access \u2192
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </Page>

      <style dangerouslySetInnerHTML={{ __html: "@media(max-width:900px){.app-stage{grid-template-columns:1fr!important}.app-rail{max-height:260px;overflow-y:auto}.app-split{grid-template-columns:1fr!important}}" }} />
    </section>
  );
"""

result = content.replace(OLD_BLOCK, NEW_BLOCK, 1)
assert result != content, "Replacement did not change file — check markers"

with open('src/DemoNavy.jsx', 'w', encoding='utf-8') as f:
    f.write(result)

print("Done! Calculator layout applied.")
