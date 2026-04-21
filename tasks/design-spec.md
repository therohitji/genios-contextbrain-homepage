# GeniOS Design Reference — Extracted Spec

Analyzed from 45 reference images in `Smart Design Reference/`.

---

## Dominant Aesthetic: Dark Premium Tech / AI-Brain

The collection strongly skews **dark, glassmorphic, and orbital** — sophisticated AI/SaaS look with glowing focal points, network connections, and layered depth. This aligns perfectly with GeniOS as an "AI OS brain."

---

## Color System

### Backgrounds
| Role | Hex |
|---|---|
| Page base (darkest) | `#080B14` |
| Section dark | `#0D1117` |
| Card surface | `#111827` |
| Card elevated | `#1A1D2E` |
| Glassmorphism card | `rgba(255,255,255,0.04)` |

### Accent Palettes (seen across refs)
| Palette | Primary | Soft | Glow |
|---|---|---|---|
| **Blue** (dominant) | `#2563EB` | `#60A5FA` | `rgba(37,99,235,0.35)` |
| **Purple** | `#7C3AED` | `#A78BFA` | `rgba(124,58,237,0.35)` |
| **Orange/Rust** | `#F97316` | `#FB923C` | `rgba(249,115,22,0.4)` |
| **Teal/Green** | `#0D9488` | `#2DD4BF` | `rgba(13,148,136,0.35)` |
| **Neon Green** | `#22C55E` | `#4ADE80` | `rgba(34,197,94,0.4)` |

### Text
| Role | Hex |
|---|---|
| Primary (on dark) | `#F8FAFC` |
| Secondary | `#CBD5E1` |
| Muted | `#64748B` |
| Label/caption | `#94A3B8` |

---

## Typography

### Scale
| Level | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | 72–96px | 700–800 | Tight tracking −0.02em |
| H2 | 48–56px | 600–700 | Section headers |
| H3 | 28–36px | 600 | Card/feature titles |
| Body | 16–18px | 400 | 1.6–1.7 line-height |
| Label | 11–13px | 500 | 0.15–0.2em tracking, uppercase |
| Caption | 12–14px | 400 | Muted color |
| Mono accent | 11–13px | 400 | Monospace for data/code |

### Font Choices Seen
- **Display serif**: Fraunces, Playfair (editorial weight)
- **Geometric sans**: Space Grotesk, Inter, Söhne
- **Mono accent**: IBM Plex Mono, JetBrains Mono

---

## Key Visual Patterns (for GeniOS)

### 1. Central Orb / Sphere Hero
- Glowing 3D sphere centered on hero (Neurovia, Boltshift, Exein)
- Subtle particle/star field around it
- Feature cards float around it connected by lines
- CSS: radial gradient + box-shadow glow, no real 3D needed

### 2. Network Mind-Map
- Central node radiates lines to labeled satellites (Gyanaguru, Advbox, pillars.live)
- Lines are SVG paths with subtle animation (dashRun / draw-in)
- Node dots glow/pulse
- Perfect for "GeniOS connects everything" narrative

### 3. Concentric Orbital Rings
- Multiple dashed/solid circles, user/content at nodes on rings (Future without Boundaries, PulseUp)
- Implies hierarchy: core OS → devices → apps → environment
- Works well for the "OS ecosystem" message

### 4. Hexagonal Feature Grid
- Honeycomb layout for features (Engage, Pillars SRE)
- One cell highlighted as primary accent
- Dark background, orange/purple glow on active hex

### 5. Flow / Process Timeline
- Horizontal steps with dot track (CRO "How it works")
- Cards below each step, step labels above
- CTA button centered below
- Bottom diagram shows actual flow visualization

### 6. Layered Stack / Architecture Diagram
- Isometric stacked layers (Multi-Brand Design System, Alibaba layered discs)
- Labels left/right of each layer
- Implies depth and foundation

---

## Component Specs

### Cards (feature/info)
```
background: rgba(255,255,255,0.04)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 12–16px
padding: 24–32px
backdrop-filter: blur(12px)
```
On hover: `border-color: rgba(accent, 0.3)`, slight `translateY(-2px)`

### Buttons
```
Primary:
  background: accent
  border-radius: 8–10px
  padding: 12px 24px
  box-shadow: 0 0 20px rgba(accent, 0.4)
  
Secondary/Ghost:
  background: transparent
  border: 1px solid rgba(255,255,255,0.15)
  border-radius: 8–10px
  padding: 12px 24px
  
On hover: border-color opacity increases
```

### Badges / Labels
```
background: rgba(accent, 0.12)
border: 1px solid rgba(accent, 0.25)
border-radius: 999px
padding: 4px 12px
font-size: 11–12px
letter-spacing: 0.1em
text-transform: uppercase
```

### Section dividers
- Subtle horizontal rule: `1px solid rgba(255,255,255,0.06)`
- Or gradient fade: `linear-gradient(90deg, transparent, rgba(accent,0.3), transparent)`

---

## Section Spacing
| | Desktop | Mobile |
|---|---|---|
| Hero section | `160px 0` | `100px 0` |
| Content section | `100–120px 0` | `64–80px 0` |
| Card gap | `24px` | `16px` |
| Container max-width | `1200–1280px` | `100% − 32px` |

---

## Animations
| Effect | Usage | Timing |
|---|---|---|
| `fadeUp` | Section entrance | 0.6–1s, easing out |
| `dashRun` | SVG path lines | 20–30s linear infinite |
| `nodePulse` | Glowing dots | 3–4s ease-in-out infinite |
| `leaderDraw` | Connection lines on enter | 1.5–2s ease-out |
| `floatOrb` | Hero sphere | 6s ease-in-out infinite |
| Scroll-triggered fadeUp | All sections | IntersectionObserver |

---

## GeniOS-Specific Recommendations

Given GeniOS is an "AI OS brain":

1. **Hero**: Central glowing orb/brain sphere, feature cards floating around it
2. **"How It Works"**: Concentric orbital ring showing GeniOS at center, layers expanding outward (Apps → Agents → OS → Cloud)
3. **Features section**: Hexagonal or node-map layout connecting GeniOS capabilities
4. **Architecture section**: Layered stack diagram (3D isometric discs) showing system depth
5. **Integrations**: Radiating lines from center GeniOS node to integration logos (like Gyanaguru/DataGenie)
6. **Color**: Deep navy/dark with blue+purple accent gradient — feels like premium AI infrastructure

---

## Current GeniOS Tokens (reference)
The existing DemoNavy uses:
- `ink: #10232A` (deep teal-black)
- `paper: #F2ECE4` (cream)  
- `brass: #D75A33` (rust/orange accent)
- Fonts: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (mono)

**Recommendation**: Keep Fraunces + IBM Plex Sans as font stack (editorial + technical). Shift palette toward darker base with the current brass/rust as accent — closer to the "dark premium" references.
