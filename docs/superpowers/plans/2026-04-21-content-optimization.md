# Content Optimization — Pre-Production Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all em dashes and special characters site-wide, add cross-references between pages, and optimize all content for AEO/SEO/GEO targeting AI Agents, Memory Layer, Context Layer, Context Brain, Harness Engineering, and Agentic AI.

**Architecture:** Three-phase approach: (1) automated global character replacement via PowerShell, (2) targeted content rewrites for em-dash sentences that need restructuring, (3) SEO/AEO optimization layer — meta tags, JSON-LD, keyword density, cross-links, FAQ enhancement.

**Tech Stack:** React 18, Vite 5, plain JSX, no TypeScript — edits are string replacements in JSX/JS files.

---

## Special Character Inventory

| Character | Unicode | Count (blogPosts.js) | Replacement |
|---|---|---|---|
| — (em dash) | U+2014 | 327 | ` - ` (space-dash-space) or sentence rewrite |
| – (en dash) | U+2013 | 32 | `-` in year ranges, ` - ` in prose |
| × (multiplication) | U+00D7 | 24 | `x` |
| · (middle dot) | U+00B7 | 15 | ` - ` |
| ' (left single quote) | U+2018 | 9 | `'` |
| ' (right single quote) | U+2019 | 9 | `'` |
| ü (umlaut) | U+00FC | 7 | `u` (Lutke, not Lütke) |

DemoNavy.jsx has 415+ em dashes — bulk are in CSS `/* ── */` separator comments (U+2500, not em dash) and code comments. True em dashes exist in content strings and inline comments.

## File Map

| File | Lines | Priority | Notes |
|---|---|---|---|
| `src/blogPosts.js` | 1,409 | P0 | 20 posts, all user-visible content |
| `src/DemoNavy.jsx` | 8,925 | P0 | Primary production homepage |
| `index.html` | ~12 | P0 | Meta title + description |
| `src/DemoCharcoal.jsx` | ~340 | P1 | Secondary theme |
| `src/DemoBlack.jsx` | ~310 | P1 | Secondary theme |
| `src/DemoCopper.jsx` | ~620 | P1 | Secondary theme |
| `src/DemoCopperFull.jsx` | ~1,500 | P1 | Secondary theme |
| `src/DemoForest.jsx` | ~300 | P1 | Secondary theme |
| `src/DemoSkeleton.jsx` | ~350 | P2 | Loading state only |
| `GeniOS.jsx` | legacy | P2 | Only reachable via `?demo=old` |

## Target Keywords (by priority)

1. **Primary**: AI Agents, Memory Layer, Context Layer
2. **Brand**: Context Brain, GeniOS
3. **Technical**: Harness Engineering, Agentic AI, Context Engineering
4. **Long-tail**: Memory layer for AI agents, Context layer for AI agents, AI agent memory, Agentic AI infrastructure

---

## Task 1: Global Special Character Replacement (blogPosts.js)

**Files:** `src/blogPosts.js`

This is the highest-priority file: 1,409 lines, 20 blog posts, all user-visible. Run a targeted PowerShell replacement.

- [ ] **Step 1.1: Backup blogPosts.js**

```powershell
Copy-Item "src/blogPosts.js" "src/blogPosts.js.bak"
```

- [ ] **Step 1.2: Replace em dashes (—) with ` - `**

Open `src/blogPosts.js`, find every `—` and replace with ` - `. Do NOT use blind global replace in PowerShell as it may corrupt JSX string context. Instead, use the Edit tool for targeted blocks OR write a Node.js replacement script:

```javascript
// run as: node fix-special-chars.mjs
import { readFileSync, writeFileSync } from 'fs';
let c = readFileSync('src/blogPosts.js', 'utf-8');
// Em dash → spaced hyphen
c = c.replaceAll('\u2014', ' - ');
// En dash in year ranges (4-digit year context) → plain hyphen
c = c.replace(/(\d{4})\u2013(\d{4})/g, '$1-$2');
// Remaining en dashes → spaced hyphen
c = c.replaceAll('\u2013', ' - ');
// Multiplication sign → x
c = c.replaceAll('\u00D7', 'x');
// Middle dot → spaced hyphen
c = c.replaceAll('\u00B7', ' - ');
// Left/right single curly quotes → straight apostrophe
c = c.replaceAll('\u2018', "'");
c = c.replaceAll('\u2019', "'");
// Umlaut u (Lütke → Lutke)
c = c.replaceAll('\u00FC', 'u');
writeFileSync('src/blogPosts.js', c, 'utf-8');
console.log('Done.');
```

- [ ] **Step 1.3: Run the script**

```bash
node fix-special-chars.mjs
```

Expected: "Done." No errors.

- [ ] **Step 1.4: Verify no special chars remain**

```bash
node -e "
const c = require('fs').readFileSync('src/blogPosts.js','utf-8');
const bad = [];
for(const ch of c) if(ch.charCodeAt(0)>127) bad.push(ch);
const uniq = [...new Set(bad)];
console.log('Remaining non-ASCII:', uniq.length ? uniq.join(' ') : 'NONE');
"
```

Expected: `Remaining non-ASCII: NONE`

- [ ] **Step 1.5: Spot-check content quality**

Search for ` - ` in blogPosts.js and confirm the replacements read naturally. Em dashes that were used as parenthetical dashes (e.g., `"Karpathy—OpenAI founding member—said"`) may need rewriting to `"Karpathy, OpenAI founding member, said"` for better readability.

- [ ] **Step 1.6: Fix parenthetical em-dash patterns that read awkwardly**

Search for `" - "` occurrences where a comma-based rewrite is cleaner. Key patterns to rewrite:
- `X — Y — Z` (double em dash parenthetical) → `X, Y, Z`
- `Tool — what it does` (section label pattern) → `Tool: what it does`
- `X—Y` (no spaces, indicates tight coupling) → `X-Y`

Use Edit tool for each targeted fix.

- [ ] **Step 1.7: Delete backup**

```bash
rm src/blogPosts.js.bak
```

---

## Task 2: Global Special Character Replacement (DemoNavy.jsx)

**Files:** `src/DemoNavy.jsx`

DemoNavy.jsx is 8,925 lines. The CSS `/* ─────── */` separator decorations are U+2500 (box-drawing), NOT em dashes — do not touch them. True em dashes appear in:
1. Code comments: `// deep — primary dark` (not user-visible, low priority)
2. JSX content strings (user-visible, HIGH priority)
3. Data object properties (user-visible)

- [ ] **Step 2.1: Extract and fix only user-visible em dashes**

Run the same script, but only on string literals inside JSX, not CSS comments. The safest approach: run the global replacement (it is safe even on code comments since they are not user-visible), then verify no JSX/JS syntax was broken.

```javascript
// Extend fix-special-chars.mjs to also process DemoNavy.jsx
import { readFileSync, writeFileSync } from 'fs';
for (const file of ['src/DemoNavy.jsx']) {
  let c = readFileSync(file, 'utf-8');
  c = c.replaceAll('\u2014', ' - ');
  c = c.replace(/(\d{4})\u2013(\d{4})/g, '$1-$2');
  c = c.replaceAll('\u2013', ' - ');
  c = c.replaceAll('\u00D7', 'x');
  c = c.replaceAll('\u00B7', ' - ');
  c = c.replaceAll('\u2018', "'");
  c = c.replaceAll('\u2019', "'");
  c = c.replaceAll('\u00FC', 'u');
  writeFileSync(file, c, 'utf-8');
}
console.log('Done.');
```

- [ ] **Step 2.2: Verify dev build still compiles**

```bash
npm run build 2>&1 | tail -20
```

Expected: No errors. If errors, check around the replaced characters.

- [ ] **Step 2.3: Fix content objects that used em dashes as semantic separators**

In DemoNavy.jsx, these content objects use em dashes for labels (e.g., `Failure mode 1 — Semantic similarity`). After replacement they become `Failure mode 1  - Semantic similarity`. Fix the double-space and ensure readability by using `: ` instead:

Grep for ` - ` in JSX string literals (lines 2060+) and rewrite any that used `—` as a label separator:
- `"Failure mode 1 - Semantic similarity"` → `"Failure mode 1: Semantic similarity"`
- Table cell patterns: verify readability

- [ ] **Step 2.4: Verify no special chars remain in DemoNavy.jsx**

Same verification command as Task 1.4, targeting `src/DemoNavy.jsx`.

---

## Task 3: Special Character Replacement (Secondary Demo Files)

**Files:** `src/DemoCharcoal.jsx`, `src/DemoBlack.jsx`, `src/DemoCopper.jsx`, `src/DemoCopperFull.jsx`, `src/DemoForest.jsx`, `src/DemoSkeleton.jsx`

These are secondary design variants. Run the same character replacement script across all of them.

- [ ] **Step 3.1: Batch replacement script**

```javascript
// Add to fix-special-chars.mjs
const secondaryFiles = [
  'src/DemoCharcoal.jsx',
  'src/DemoBlack.jsx', 
  'src/DemoCopper.jsx',
  'src/DemoCopperFull.jsx',
  'src/DemoForest.jsx',
  'src/DemoSkeleton.jsx',
];
for (const file of secondaryFiles) {
  let c = readFileSync(file, 'utf-8');
  c = c.replaceAll('\u2014', ' - ');
  c = c.replace(/(\d{4})\u2013(\d{4})/g, '$1-$2');
  c = c.replaceAll('\u2013', ' - ');
  c = c.replaceAll('\u00D7', 'x');
  c = c.replaceAll('\u00B7', ' - ');
  c = c.replaceAll('\u2018', "'");
  c = c.replaceAll('\u2019', "'");
  c = c.replaceAll('\u00FC', 'u');
  writeFileSync(file, c, 'utf-8');
}
```

- [ ] **Step 3.2: Verify build**

```bash
npm run build 2>&1 | tail -10
```

---

## Task 4: SEO/AEO Meta Optimization (index.html)

**Files:** `index.html`

Current state: minimal meta tags. Need: keyword-rich title, description, Open Graph, JSON-LD structured data.

- [ ] **Step 4.1: Update title and meta description**

Current title: generic. Update to:

```html
<title>GeniOS - Context Brain and Memory Layer for AI Agents</title>
<meta name="description" content="GeniOS is the Context Brain and Memory Layer for AI agents. Give your agentic AI persistent organizational context, proactive reasoning, and harness-grade reliability. Used by teams building with Claude, GPT, and Gemini." />
```

- [ ] **Step 4.2: Add Open Graph meta tags**

```html
<meta property="og:title" content="GeniOS - Context Brain for AI Agents" />
<meta property="og:description" content="The Memory Layer and Context Layer your AI agents are missing. GeniOS tracks organizational state, authority chains, and relationship context so your agents act correctly — not just competently." />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="GeniOS" />
```

- [ ] **Step 4.3: Add canonical + robots meta**

```html
<link rel="canonical" href="https://genios.ai/" />
<meta name="robots" content="index, follow" />
<meta name="keywords" content="AI agents memory layer, context layer for AI agents, context brain, agentic AI, harness engineering, context engineering, AI agent infrastructure" />
```

- [ ] **Step 4.4: Add JSON-LD structured data for AEO/GEO**

Inside `<head>`, add:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "GeniOS",
  "description": "Context Brain and Memory Layer for AI Agents. GeniOS provides persistent organizational context, temporal state tracking, and proactive reasoning for agentic AI systems.",
  "applicationCategory": "AI Infrastructure",
  "operatingSystem": "Cloud",
  "keywords": ["AI agents", "memory layer", "context layer", "context brain", "harness engineering", "agentic AI", "context engineering"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/PreOrder"
  },
  "provider": {
    "@type": "Organization",
    "name": "GeniOS",
    "description": "Building the Context Brain for AI-native organizations"
  }
}
</script>
```

- [ ] **Step 4.5: Verify index.html renders correctly**

Open `http://localhost:3000` and check browser title bar + view-source to confirm all meta tags present.

---

## Task 5: Blog Post Cross-References (blogPosts.js)

**Files:** `src/blogPosts.js`

Goal: Each blog post should reference 2-3 related posts via inline links. The link format already supported in blogPosts.js is `[link text](url)` inside text strings.

Blog post slugs for internal links:
- `/insights/vector-databases-not-enough`
- `/insights/karpathy-on-memory-and-context`
- `/insights/what-yc-founders-are-saying`
- `/insights/open-source-memory-layers-2026`
- `/insights/context-engineering-replaced-prompt-engineering`
- `/insights/future-of-ai-agents`
- `/insights/why-88-percent-of-agents-fail`
- `/insights/orchestrator-vs-ai-agent`
- `/insights/multi-agent-systems-production`
- `/insights/growth-of-ai-agents-2026`
- `/insights/openclaw-vs-hermes`
- `/insights/self-evolving-ai-agents`
- `/insights/seven-types-of-ai-agents`
- `/insights/context-engineering-tactical-playbook`
- `/insights/harness-engineering-discipline`
- `/insights/databases-for-ai-agents-2026`
- `/insights/why-harness-engineering-is-the-future`
- `/insights/open-source-memory-layers-growth`
- `/insights/memory-in-robotics`
- `/insights/best-llm-for-ai-agents-2026`

### Cross-reference map (what links to what)

| Post | Add reference to |
|---|---|
| vector-databases-not-enough | open-source-memory-layers-2026, context-engineering-replaced-prompt-engineering |
| karpathy-on-memory-and-context | context-engineering-replaced-prompt-engineering, context-engineering-tactical-playbook |
| what-yc-founders-are-saying | open-source-memory-layers-2026, why-88-percent-of-agents-fail |
| open-source-memory-layers-2026 | vector-databases-not-enough, harness-engineering-discipline |
| context-engineering-replaced-prompt-engineering | karpathy-on-memory-and-context, context-engineering-tactical-playbook |
| future-of-ai-agents | growth-of-ai-agents-2026, self-evolving-ai-agents |
| why-88-percent-of-agents-fail | harness-engineering-discipline, orchestrator-vs-ai-agent |
| orchestrator-vs-ai-agent | multi-agent-systems-production, seven-types-of-ai-agents |
| multi-agent-systems-production | orchestrator-vs-ai-agent, open-source-memory-layers-2026 |
| harness-engineering-discipline | why-harness-engineering-is-the-future, best-llm-for-ai-agents-2026 |
| best-llm-for-ai-agents-2026 | harness-engineering-discipline, databases-for-ai-agents-2026 |

- [ ] **Step 5.1: Add cross-references to Post 01 (vector-databases-not-enough)**

In the "What coding agents actually do instead" section, add after the existing paragraph:

```
"For a full comparison of memory layer architectures, see [Open-Source Memory Layers for AI Agents: 2026 Comparison](/insights/open-source-memory-layers-2026)."
```

In the FAQ "What is the alternative to a vector database?" answer, add:

```
"See also: [Context Engineering: The Discipline That Replaced Prompt Engineering](/insights/context-engineering-replaced-prompt-engineering) for the architectural framing."
```

- [ ] **Step 5.2: Add cross-references to Post 02 (karpathy-on-memory-and-context)**

In "What this means for builders in 2026" section, add a reference paragraph:

```
"For the tactical implementation of context engineering, see [Context Engineering Tactical Playbook](/insights/context-engineering-tactical-playbook). For the discipline framing, see [Context Engineering: The Discipline That Replaced Prompt Engineering](/insights/context-engineering-replaced-prompt-engineering)."
```

- [ ] **Step 5.3: Add cross-references to Post 04 (open-source-memory-layers-2026)**

In "What all six have in common" section, add:

```
"For why vector-only approaches fail before reaching this layer, see [Why Vector Databases Are Not Enough for AI Agents in 2026](/insights/vector-databases-not-enough). For the harness layer above memory, see [Harness Engineering: The Discipline](/insights/harness-engineering-discipline)."
```

- [ ] **Step 5.4: Add cross-references to Posts 05-20 following same pattern**

For each post in the cross-reference map above: add 1-2 natural inline paragraph-ending references to related posts. Place them at the END of a relevant section, not mid-sentence. Format: `"For more on X, see [Post Title](/insights/slug)."` as a standalone sentence.

Use the Edit tool for each post, targeting the appropriate section's final paragraph.

- [ ] **Step 5.5: Verify links render correctly**

Start dev server, open a blog post, confirm links appear as clickable text.

---

## Task 6: SEO Keyword Optimization in blogPosts.js

**Files:** `src/blogPosts.js`

Target: Ensure primary keywords appear in title/dek/tldr of each post where relevant. The current content is already rich with target keywords. This task adds density where it is naturally missing.

### Keyword gap analysis

| Post | Missing primary keyword | Fix |
|---|---|---|
| Post 01 (vector-db) | "Memory Layer" | Add to dek: "...five failure modes and the Memory Layer architecture that is actually winning" |
| Post 02 (karpathy) | "Context Layer" | Add to dek: "...and what Context Layer engineering actually means for builders" |
| Post 03 (YC founders) | "Memory Layer" | Already in tldr. Add to dek. |
| Post 08 (orchestrator) | "Agentic AI" | Add to dek or tldr |
| Post 13 (seven types) | "Agentic AI" | Add to intro paragraph |
| Post 15 (harness) | "Harness Engineering" | Already present. Verify in H1 equivalent |
| Post 20 (best LLM) | "Harness Engineering" | Add to "harness matters more" section |

- [ ] **Step 6.1: Update dek fields for keyword density**

For each post in the gap analysis, edit the `dek` field to naturally include the missing keyword. Keep dek under 160 characters for meta description compatibility.

Example for Post 01:
```javascript
// BEFORE
dek: "Vector databases solve similarity search. They do not solve memory. Five failure modes, the architecture that's actually winning..."
// AFTER  
dek: "Vector databases solve similarity search. They do not solve the Memory Layer problem. Five failure modes AI agents face, the winning architecture, and why coding agents skip vector retrieval entirely."
```

- [ ] **Step 6.2: Add "Harness Engineering" keyword to Post 15 opening**

Ensure the first paragraph of the harness-engineering-discipline post explicitly defines "Harness Engineering" so answer engines can use it as a definition source:

Add/verify this opening: `"Harness Engineering is the discipline of building the scaffold around an AI model - the context system, tool interface, memory layer, and evaluation harness - that determines agent reliability in production."`

- [ ] **Step 6.3: Add "Agentic AI" keyword to Posts 08 and 13**

In Post 08 (orchestrator-vs-ai-agent) intro: replace first mention of "AI agent" with "agentic AI system" to capture that keyword variant.

In Post 13 (seven-types) intro: same pattern.

- [ ] **Step 6.4: Add Context Brain brand mention to callout blocks**

Each post has a `callout` block that mentions GeniOS. Ensure these also mention "Context Brain" since that is the product name for answer-engine attribution:

```javascript
// BEFORE: title: "How Genios sits in this stack"
// AFTER: title: "How Genios Context Brain sits in this stack"
```

And in the body, add "Context Brain" where "Genios" appears alone for the first time in each callout.

---

## Task 7: DemoNavy.jsx Homepage Keyword Optimization

**Files:** `src/DemoNavy.jsx`

The homepage is the primary AEO target for branded search ("GeniOS", "Context Brain"). Optimize headings and content sections.

- [ ] **Step 7.1: Add "Context Brain" to hero section**

Find the hero headline in DemoNavy.jsx (around line 2150+). Ensure the phrase "Context Brain" appears in or near the H1. If the current headline is "The Context Layer for AI-Native Organizations" or similar, verify it includes a context brain mention.

If not present, add a subheadline: `"The Context Brain that makes your AI agents actually work."`

- [ ] **Step 7.2: Add "Memory Layer" to The Invisible Layer section**

Find the `InvisibleLayer` component (around line 2133). In the section header text, ensure "Memory Layer" appears. Current header is "The Invisible Layer" - change the kicker label or subtitle to include "Memory Layer":

```
Kicker: "Memory Layer · Context Layer · Context Brain"
```

Or add to the closing strip: `"That is the Memory Layer problem. GeniOS is the Context Brain that solves it."`

- [ ] **Step 7.3: Add "Harness Engineering" to WHY EVERYTHING FAILS section**

In the `WhyEverythingFails` component (around line 2283), ensure "Harness Engineering" or "agentic AI" appears in the section summary. The closing line currently reads "One OS. Six pillars. Zero compromise." Add a supporting sentence:

`"This is what Harness Engineering looks like in practice."`

- [ ] **Step 7.4: Add "Agentic AI" to Problem section**

In the `Problem` component (around line 2069), add "agentic AI" to the supporting paragraph naturally:

Current: `"The bottleneck isn't model intelligence. It's the structural absence of organizational context."`
Update: `"The bottleneck in agentic AI isn't model intelligence. It's the structural absence of organizational context."`

- [ ] **Step 7.5: Add blog post links to homepage footer or insights section**

In the footer or insights section of DemoNavy.jsx, ensure there are links to the 3 most important blog posts. These serve as internal link equity and AEO cross-attribution:
1. Context Engineering (primary keyword post)
2. Why Vector Databases Are Not Enough (Memory Layer post)
3. Harness Engineering Discipline (Harness Engineering post)

---

## Task 8: Consistency Pass — Remove Remaining Orphaned Special Chars

After Tasks 1-3, do a final verification sweep across ALL files:

- [ ] **Step 8.1: Run global verification**

```javascript
// verify-all.mjs
import { readFileSync, readdirSync } from 'fs';
const files = [
  'src/blogPosts.js',
  'src/DemoNavy.jsx',
  'src/DemoCharcoal.jsx',
  'src/DemoBlack.jsx',
  'src/DemoCopper.jsx',
  'src/DemoCopperFull.jsx',
  'src/DemoForest.jsx',
  'src/DemoSkeleton.jsx',
  'index.html',
];
let totalBad = 0;
for (const file of files) {
  const c = readFileSync(file, 'utf-8');
  const bad = [...c].filter(ch => ch.charCodeAt(0) > 127 && ch.charCodeAt(0) !== 0x2500 && ch.charCodeAt(0) !== 0x2501);
  if (bad.length) {
    const uniq = [...new Set(bad)].map(ch => `U+${ch.charCodeAt(0).toString(16).toUpperCase()}`);
    console.log(`${file}: ${bad.length} chars — ${uniq.join(', ')}`);
    totalBad += bad.length;
  }
}
console.log(totalBad === 0 ? 'ALL CLEAR' : `${totalBad} chars remaining`);
```

Expected: `ALL CLEAR`

- [ ] **Step 8.2: Final build verification**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 8.3: Browser smoke test**

```bash
npm run preview
```

Open `http://localhost:4173` and check:
- Homepage loads without visual issues
- No garbled characters visible
- Links to blog posts work
- All sections render correctly

---

## Task 9: AEO FAQ Enhancement in blogPosts.js

AEO (Answer Engine Optimization) is won by FAQ blocks that directly answer questions search engines ask. Current posts have FAQs. This task enhances them with the exact phrasings answer engines query.

- [ ] **Step 9.1: Add AEO-targeted FAQ to Post 01 (vector-db)**

Add this FAQ item to the existing faq block:

```javascript
{ q: "What is a Memory Layer for AI agents?", a: "A Memory Layer for AI agents is an external system that gives a stateless LLM three capabilities it lacks by default: persistence (facts survive between sessions), retrieval (relevant facts surface when needed), and update (new facts override old ones). Examples include Mem0, Zep, Graphiti, Letta, Cognee, and GeniOS Context Brain." }
```

- [ ] **Step 9.2: Add AEO-targeted FAQ to Post 05 (context engineering)**

Add:

```javascript
{ q: "What is Context Engineering?", a: "Context Engineering is the discipline of dynamically filling an LLM's context window with precisely the right information - instructions, retrieved facts, tools, memory, and state - at each step of an agent's trajectory. The term was defined by Andrej Karpathy as 'the delicate art and science of filling the context window with just the right information for the next step.'" },
{ q: "What is a Context Layer for AI agents?", a: "A Context Layer for AI agents is the infrastructure layer responsible for assembling, scoring, and injecting the right organizational context into each agent call. It sits above the Memory Layer (which stores facts) and below the agent runtime (which executes tasks). GeniOS Context Brain is an example of a Context Layer." }
```

- [ ] **Step 9.3: Add AEO-targeted FAQ to Post 15 (harness engineering)**

Add:

```javascript
{ q: "What is Harness Engineering?", a: "Harness Engineering is the discipline of building the execution scaffold around an AI model - the context system, tool interface, memory layer, retrieval pipeline, and evaluation harness - that determines agent reliability in production. Research shows 22+ point performance swings between basic and optimized harnesses on identical models." },
{ q: "Why does the harness matter more than the model for AI agents?", a: "SWE-Bench Pro data shows 22+ point variance across harnesses on identical models. The scaffold around the model - how context is assembled, how tools are defined, how memory is retrieved - has more impact on production performance than model choice alone." }
```

- [ ] **Step 9.4: Add "What is Context Brain?" FAQ to any post that references GeniOS**

In Post 01, Post 02, Post 04 callout FAQ areas, add:

```javascript
{ q: "What is GeniOS Context Brain?", a: "GeniOS Context Brain is the Memory Layer and Context Layer for AI-native organizations. It tracks organizational state (who approved what, what changed, what was promised), maintains authority chains and relationship graphs, and delivers scored, deduplicated context to AI agents in real time - before the agent asks." }
```

---

## Completion Checklist

- [ ] Zero special characters (U+007F and above) in all content files
- [ ] Zero em dashes in user-visible text
- [ ] index.html has optimized title, meta description, OG tags, and JSON-LD
- [ ] Each of 20 blog posts links to at least 2 related posts
- [ ] Primary keywords (AI Agents, Memory Layer, Context Layer, Context Brain, Harness Engineering, Agentic AI) appear naturally in each post's title or first two paragraphs
- [ ] All FAQ blocks include at least one AEO-phrased question ("What is X?")
- [ ] DemoNavy.jsx homepage includes "Context Brain", "Memory Layer", "Harness Engineering", "Agentic AI" in user-visible headings or prominent content
- [ ] Build passes with no errors
- [ ] Browser smoke test passes
- [ ] Git commit with all changes
