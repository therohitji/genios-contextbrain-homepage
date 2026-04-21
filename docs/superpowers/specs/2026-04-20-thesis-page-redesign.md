# Thesis Page Redesign — Design Spec
**Date:** 2026-04-20  
**Status:** Approved  
**File:** `src/DemoNavy.jsx` — `Thesis` component and related sub-components

---

## Goal

Redesign the `/thesis` page to feel like a landmark piece of writing — think Stripe Press meets The Browser Company. The page is a 7-chapter long-form editorial manifesto explaining why AI agents need a reasoning/context layer. It should read like a research journal article: narrow centered column, consistent margins, strong typographic rhythm, hero data moments.

---

## Design Decisions

| Question | Decision |
|---|---|
| Reading experience | Hybrid — single scroll, chapter breaks create pause |
| Visual prominence | Hero moments for key visuals, supporting for rest |
| Mood | Light and editorial — cream dominant, navy for drama |
| Chapter breaks | Typographic within column (not full-width bands) |
| Ending | Colophon (quiet, full-bleed navy) + Request Access section (CTA) |

---

## 1. Layout — The Column

**Single consistent content column throughout the entire article.**

- `max-width: 720px`
- `margin: 0 auto`
- `padding: 0 clamp(20px, 4vw, 40px)` (side padding on small screens only)
- Applied to: prose, chapter markers, pull quotes, figures, stat blocks, bar charts — everything inside the article

**Nothing breaks out of the column except:**
- Navy `thesis-interlude` full-bleed sections (intentional drama — keep exactly as-is)
- Page-level section backgrounds (`T.paper`, `T.paper2`) — full-width backgrounds, 720px column content inside
- Colophon — full-bleed navy (see Section 7)

**Removes:** The current inconsistency where article is `800px`, header is `880px`, some sections are `960px`. Everything becomes `720px`.

---

## 2. Chapter Markers — `ChapterCard` (replaces `ChapterHead`)

A typographic beat within the 720px column. No background-color band. No sidebar layout.

```
────────────────────────────────────────────────
                                                  ← 1px solid T.lineStrong, full column width

CHAPTER · I                                       ← T.mono, 10px, T.brass, letter-spacing: 0.3em, margin-top: 28px

I                                                 ← 80px italic display, T.navy, font-weight: 300, line-height: 0.9

Three orders of shift.                            ← clamp(28px, 3vw, 40px) display, T.ink, line-height: 1.05, margin-top: 16px

The shift · ~2 min                                ← T.mono, 10px, T.stone, margin-top: 12px
```

**Spacing:**
- `margin-top: clamp(80px, 10vw, 120px)` above the rule line — creates real scroll pause
- `margin-bottom: 48px` after label before prose resumes

**Props:** `n` (roman numeral string), `title` (string), `label` (string), `id` (string), `readTime` (string e.g. `"~2 min"`)

**All 7 chapter values:**

| n | title | label | readTime |
|---|---|---|---|
| I | Three orders of shift. | The shift | ~2 min |
| II | They all need context. They don't have it. | The diagnosis | ~2 min |
| III | The stack solved storage. It did not solve reasoning. | The gap | ~2 min |
| IV | Vector databases are hitting their ceiling — out loud. | The ceiling | ~2 min |
| V | The claim. | The claim | ~1 min |
| VI | The bet — Genios. | The bet | ~1 min |
| VII | Why now. | Why now | ~1 min |

**Implementation:** New `ChapterCard` component. Replace all 7 `ChapterHead` usages in `Thesis`. Remove `ChapterHead` after replacement.

---

## 3. Typography & Prose

### Body prose (`PROSE` constant update)
- `font-size: 18px` (up from 17.5px)
- `line-height: 1.82` (up from 1.78)
- `color: T.ink2`
- `font-weight: 300`
- `margin-bottom: 26px` (up from 22px)
- `max-width: 720px`

### Opening dropcap (first paragraph only)
- Keep existing `.dropcap` class
- Update `::first-letter` color to `T.brass` (the existing implementation already uses `T.brass` — keep it, do NOT change to navy)
- Adjust `font-size` to `5.2em` if not already set, `line-height: 0.82`, `margin: 6px 14px 0 0`

### Pull quotes — `ThesisQuote` upgrade
Remove box/border treatment. New style — floating ruled quote within column:

- `font-size: clamp(20px, 2.4vw, 28px)`
- `font-family: T.serif`, italic
- `color: T.ink`
- `text-align: center`
- `margin: 52px auto`
- `max-width: 600px`
- `border-top: 1.5px solid T.brass`, `padding-top: 28px`
- `border-bottom: 1.5px solid T.brass`, `padding-bottom: 28px`
- No background, no left border, no box — just ruled type in whitespace

### Section markers (design system element — optional placement)
Available as a styled element for future use. Not required to be placed in specific chapters in this sprint.

- Format: `— 01  Italic caption text`
- `font-family: T.mono`, `font-size: 11px`, `color: T.stone`
- Left-aligned within column
- `margin: 36px 0 16px`

---

## 4. Hero Visual Moments

### Full-column figures (720px, with caption system)
Add `margin: 56px 0` and a `<figcaption>` below to:

- `OrdersFigure` (Three Shifts SVG)
- `PullVsPushDiagram`

Caption style: `font-family: T.mono`, `font-size: 10px`, `color: T.stone`, `letter-spacing: 0.18em`, `text-transform: uppercase`, `margin-top: 12px`

Wrap each in `<figure>` element if not already.

### ThesisStat upgrade (hero number — no card background)
- Remove: `background: T.paper2` and `border` from container
- Number: `clamp(72px, 14vw, 120px)`, `T.brass`
- Add: `border-top: 1px solid T.lineStrong`, `padding-top: 36px`
- Add: `border-bottom: 1px solid T.lineStrong`, `padding-bottom: 36px`
- Floats in the column with ruled whitespace framing it

### ThesisBarChart + ThesisStats
- Stay within 720px column
- `margin: 52px 0` (up from 44px)
- No other changes

### ThesisInterlude (navy full-bleed) — NO CHANGES
- Both instances kept exactly as-is
- Note: the first interlude (keystone, IV→V) uses the `<ThesisInterlude />` component
- The second interlude (bridge, VI→VII) is inlined raw JSX — both are intentional and both kept unchanged

---

## 5. Article Hero Section (inside `Thesis` component, first `<section>`)

This is the cream header inside the `Thesis` component itself — **not** `PageIntro` (which is out of scope).

**Changes:**
- Constrain hero content column to `720px` (currently `880px`)
- Add a `1.5px solid T.brass` horizontal rule, `width: 48px`, positioned **below the meta row, above the H1 title** — editorial accent
- Title stays: `clamp(34px, 5vw, 64px)` display
- Dek (`font-family: T.serif`, italic): increase to `clamp(19px, 1.8vw, 23px)`
- Tighten `margin-bottom` between title and dek to `8px` for closer pairing

---

## 6. TOC Strip

**Changes:**
- Constrain inner content to `720px` column (currently `880px`)
- Remove background hover change on `.thesis-toc-item:hover`
- Default state: add `border-left: 2px solid transparent` to `.thesis-toc-item` so the width is always present and only the color transitions (prevents layout snap)
- Hover state: `border-left-color: T.brass`, `padding-left: 20px` (down from 22px to compensate for the 2px border)
- Transition: `border-left-color 0.2s ease, padding-left 0.2s ease`
- The existing `html { scroll-behavior: smooth }` already handles anchor scroll — no changes needed

---

## 7. End-cap — Colophon

The colophon stays **full-bleed navy** (keep the existing `.thesis-colophon` full-bleed approach). Update the inner column width from `960px` to `720px` for consistency.

```
────────────────────────────────────────────────  ← border-top: 1px solid rgba(215,90,51,0.35) [existing]

[navy full-bleed background]

End · Thesis v1.0 · Genios     ·     Keep reading → Applications
[T.mono, 10px, cream/0.5]            [T.mono, 10px, T.brass2, link]
```

- Inner `max-width: 720px` (down from `960px`)
- Text colors: keep existing cream-on-navy treatment
- "Keep reading" link: keep existing `T.brass2` color and `→` arrow
- `padding: 36px clamp(24px, 5vw, 60px)` — slightly tighter than current

---

## 8. Request Access End Section — `RequestAccessB` (rewrite)

`RequestAccessB` needs to be updated to match this spec. This is effectively a targeted rewrite of that component.

**New layout:**
- Full-width navy background
- Single centered column, `max-width: 560px`, `margin: 0 auto`
- `padding: clamp(72px, 9vw, 120px) clamp(24px, 5vw, 60px)`
- `text-align: center`

**Content:**
- Kicker: `T.mono`, 10px, `T.brass`, `letter-spacing: 0.3em`, `"Thesis v1.0 · Genios · 2026"`
- Headline (display, italic, cream): *"The reasoning layer is being built. Get early access."* — `clamp(28px, 3.5vw, 44px)`, `font-weight: 300`, `line-height: 1.1`, `T.paper`
- Single CTA button: `"Request Access →"` — existing brass button style
- No two-column grid, no secondary column

---

## Components to Create / Modify

| Component | Action | Notes |
|---|---|---|
| `ChapterCard` | **Create** | Replaces `ChapterHead` — all 7 chapter values in Section 2 |
| `ChapterHead` | **Remove** | After all 7 usages replaced |
| `ThesisQuote` | **Modify** | Ruled floating quote, no box |
| `ThesisStat` | **Modify** | Hero number, ruled top/bottom, no card background |
| `Thesis` | **Modify** | 720px column, new chapter markers, PROSE update |
| `PROSE` constant | **Modify** | font-size 18px, line-height 1.82, margin-bottom 26px |
| `OrdersFigure` | **Modify** | Wrap in `<figure>`, add `<figcaption>` |
| `PullVsPushDiagram` | **Modify** | Wrap in `<figure>`, add `<figcaption>` |
| Article hero section | **Modify** | 720px column, brass rule accent above H1 |
| TOC strip | **Modify** | 720px column, border-left hover instead of bg hover |
| Colophon | **Modify** | Inner column 720px (down from 960px) |
| `RequestAccessB` | **Rewrite** | Centered single-column, new headline, new layout |
| `.dropcap::first-letter` | **Verify** | Keep `T.brass` color — do not change |

---

## Out of Scope

- `PageIntro` dark navy hero banner — no changes
- Navigation / header — no changes
- Chapter prose content (words) — no changes
- `ThesisInterlude` navy full-bleed sections (both instances) — no changes
- `ThesisBarChart` animation logic — no changes
- `ThesisStats` structure — margin update only
- Routing / URLs — no changes
- Mobile breakpoints — maintain existing responsive behaviour, adjusted to new 720px column
