import sys
sys.stdout.reconfigure(encoding='utf-8')

filepath = 'd:/AI Coding Files/GeniOS Files/geniosbrain-homepage/src/DemoNavy.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    src = f.read()

# Markers
SEP = '\u2500' * 62
start_needle = f'/* {SEP}\n   \u00b7 APPLICATIONS \u2014 Every department'
end_needle = f'\n/* {SEP}\n   \u00b7 TIER USE CASES'

start_idx = src.find(start_needle)
end_idx = src.find(end_needle)

if start_idx == -1 or end_idx == -1:
    print(f'ERROR: markers not found. start={start_idx} end={end_idx}')
    sys.exit(1)

print(f'Section found: chars {start_idx}-{end_idx} ({end_idx-start_idx} chars)')

before = src[:start_idx]
after = src[end_idx:]

new_section = f'''/* {SEP}
   \u00b7 APPLICATIONS \u2014 Persona \u2192 Domain \u2192 Scenario
{SEP} */
const PERSONAS = [
  {{
    id: "founder", label: "Founder",
    tagline: "You run agents that touch customers, investors, and team. One wrong move costs a relationship you spent months building.",
    domains: [
      {{ id: "sales", label: "Sales", sub: "Outreach \u00b7 Pipeline",
        scenario: "A follow-up email. About to send.", graphs: "Relationship \u00b7 Precedent",
        metric: "Preserved", metricLabel: "relationship, deal reopened",
        before: ["Agent checks last email date: 12 days ago, account looks warm","Drafts a friendly follow-up to Jordan Lee, CTO at BrightPath","Email sends automatically","CSM finds out 3 days later: CEO resigned \u2014 email read as tone-deaf"],
        after: ["Relationship graph: engagement dropped 66% \u2014 cooling signal detected","State graph: leadership transition in progress \u2014 CEO resigned 9 days ago","Precedent: 11 of 17 past churn cases match this exact pattern","GeniOS delivers the move before the send fires"],
        outcome: "Do not send. BrightPath matches the cooling-deal pattern (Precedent graph). CEO transition detected (State graph). Recommended: route to CSM for human temperature check. Hold automated outreach 14 days.",
        why: "Why RAG doesn't fix this: the CEO resignation was in a Slack thread your agent never thought to search for.",
        memoryLimit: "Memory stores past emails. It has no model of relationship health, leadership changes, or what this pattern means across your history.",
        geniosCan: "GeniOS reasons across email + CRM + org signals in real-time \u2014 detecting the cooling pattern and leadership shift before your agent acts.",
      }},
      {{ id: "fundraising", label: "Fundraising", sub: "Investors \u00b7 Deal tracking",
        scenario: "A re-engagement email. About to send.", graphs: "Relationship \u00b7 Precedent",
        metric: "Recovered", metricLabel: "warm investor conversation",
        before: ["Agent detects: Sequoia contact has gone 18 days without reply","Sends a templated 'just checking in' follow-up","Investor replies 4 days later \u2014 formal, distant","Founder realizes: they owed the investor a deck update that was never sent"],
        after: ["Relationship graph: last exchange was substantive \u2014 open commitment on founder's side","Precedent: 3 similar conversations closed when re-engaged with the pending item","GeniOS identifies the actual blocker before the agent drafts anything","Move delivered: send the deck update, reference the commitment"],
        outcome: "Do not send a check-in. The conversation is stalled on an open commitment from your side \u2014 deck update, 22 days overdue. This pattern closed in 3 of 3 similar cases when addressed within 7 days.",
        why: "Why your CRM doesn't fix this: it knows the stage. It doesn't know what you owe the investor.",
        memoryLimit: "Memory recalls past messages. It can't reason over what a commitment means, who owes what, or what pattern this matches.",
        geniosCan: "GeniOS tracks commitments as first-class entities \u2014 who made them, to whom, fulfilled or not \u2014 and surfaces the right move from precedent.",
      }},
      {{ id: "hiring", label: "Hiring", sub: "Candidates \u00b7 Offers",
        scenario: "A candidate offer. About to go out.", graphs: "Authority \u00b7 Precedent",
        metric: "Zero", metricLabel: "awkward renegotiations",
        before: ["HR agent processes final offer \u2014 $180K base, standard package","Agent sends offer letter automatically","Hiring manager flags next day: equity policy caps new senior hires at $165K","HR is in an awkward renegotiation \u2014 candidate trust damaged"],
        after: ["Authority graph: comp policy updated Q3 \u2014 senior hire cap $165K until Feb review","State graph: comp review cycle opens in 6 weeks","Precedent: 2 similar above-cap offers required renegotiation \u2014 one candidate withdrew","Recommendation pushed before offer sends"],
        outcome: "Hold this offer. Current comp policy caps senior hires at $165K (Authority graph). Review opens in 6 weeks. Two precedents resulted in renegotiation and one withdrawal. Loop hiring manager before sending.",
        why: "Why your agent framework doesn't fix this: it managed the workflow correctly. It had no access to the comp policy that changed last quarter.",
        memoryLimit: "Memory stores past offer letters. It doesn't know what your current comp policies say or when they were last updated.",
        geniosCan: "GeniOS maintains a live Authority graph of org policies and reasons over precedent to catch violations before they become apologies.",
      }},
      {{ id: "commitments", label: "Commitments", sub: "Tracking \u00b7 Accountability",
        scenario: "A commitment made. Never followed up.", graphs: "Precedent \u00b7 State",
        metric: "Zero", metricLabel: "missed commitments",
        before: ["Founder promises 4 investors a monthly update, 2 customers a feature ETA","Tracked manually in Notion \u2014 Notion dies by week 3","Investor sends a follow-up asking for the update","Founder scrambles; credibility damage already done"],
        after: ["Commitment extracted at ingest \u2014 who it was made to, what was promised, when due","State graph tracks fulfillment status in real-time","Push notification T-24h before each commitment is due","Agent doesn't wait to be asked \u2014 it already knows"],
        outcome: "Investor update to Andreessen due in 24 hours \u2014 28 days since last sent. Customer ETA on auth feature: overdue 6 days. Recommend: batch both today. Past pattern: updates sent within 3 days generated 2\u00d7 reply rate.",
        why: "Why a task manager doesn't fix this: it needs you to enter the tasks. GeniOS extracts them from what you actually said.",
        memoryLimit: "Memory can recall a message where you made a promise. It can't track whether you kept it or what the relationship cost of missing it is.",
        geniosCan: "GeniOS extracts commitments as structured facts from your communications, tracks their lifecycle, and pushes the move before credibility erodes.",
      }},
      {{ id: "retention", label: "Retention", sub: "Churn \u00b7 Relationship health",
        scenario: "A customer going quiet. Undetected.", graphs: "Relationship \u00b7 State",
        metric: "Caught", metricLabel: "before renewal conversation",
        before: ["Champion at key account hasn't replied in 21 days","CS agent sends another product update email \u2014 no response","Renewal season arrives \u2014 relationship is cold","Customer churns citing 'lack of engagement from your team'"],
        after: ["Relationship graph: engagement velocity dropped 78% over 21 days \u2014 cooling signal","State graph: champion's title may have changed \u2014 possible role shift","Precedent: this pattern preceded churn in 7 of 11 comparable accounts","GeniOS fires recommendation 3 weeks before renewal"],
        outcome: "This account is cooling. Engagement dropped 78% (Relationship graph). Champion role may have shifted (State graph). Pattern matches pre-churn signal in 64% of comparable cases. Recommend: personal outreach from founder within 48 hours \u2014 not automated sequence.",
        why: "Why your CRM doesn't fix this: deal stage says 'renewal' \u2014 everything looks fine. GeniOS reads the relationship, not the stage.",
        memoryLimit: "Memory can tell you when you last emailed them. It can't reason over whether the relationship is healthy or what the pattern of this silence means.",
        geniosCan: "GeniOS maintains a continuous relationship health score and fires recommendations based on patterns \u2014 not just recency.",
      }},
    ],
  }},
  {{
    id: "developer", label: "Developer",
    tagline: "You're building agents that take real actions in real orgs. Without live context, they're confident and wrong.",
    domains: [
      {{ id: "multi-agent", label: "Multi-Agent", sub: "Coordination \u00b7 Conflicts",
        scenario: "Two agents. Same prospect. Same afternoon.", graphs: "State \u00b7 All four graphs",
        metric: "Zero", metricLabel: "duplicate actions",
        before: ["Sales agent begins outreach on a high-priority prospect","BD agent identifies same prospect for a partnership conversation \u2014 simultaneously","No shared state \u2014 both agents send outreach the same afternoon","Prospect replies: 'Which team am I actually talking to?'"],
        after: ["State graph: Sales agent has active outreach sequence \u2014 started 3 days ago","GeniOS detects conflict before BD agent acts","Coordination signal pushed to both agents \u2014 no duplicate contact","Resolution routed to sales lead to decide thread ownership"],
        outcome: "BD agent: hold outreach. Sales agent has an active sequence on this prospect (State graph). Conflict detected. Route to sales lead to decide whether to merge threads or split engagement.",
        why: "Why multi-agent frameworks don't fix this: they coordinate workflow. They have no shared model of what's happening in your org right now.",
        memoryLimit: "Memory is per-agent. Each agent only knows what it has seen. There is no shared model of what the org is doing in parallel.",
        geniosCan: "GeniOS gives every agent a shared read of org state. When two agents would conflict, the conflict is caught before either acts.",
      }},
      {{ id: "mcp", label: "MCP / SDK", sub: "Integration \u00b7 Context injection",
        scenario: "Agent editing code. No org context.", graphs: "Relationship \u00b7 State \u00b7 Authority",
        metric: "One", metricLabel: "API call for full org context",
        before: ["Developer asks agent: 'Update the onboarding flow for Acme's tier preferences'","Agent has no idea who Acme is \u2014 asks for context","Developer pastes chunks of spec manually","Agent still doesn't know Acme's open commitments or escalation contact"],
        after: ["claude mcp add genios \u2014 2-minute setup","Agent pulls org context as a tool call \u2014 Acme's tier, commitments, relationship state","Drafts update with full client context, no manual paste","Every subsequent task on Acme works the same way"],
        outcome: "Context bundle for Acme: Startup tier (since March). Open commitment: SSO integration by May 1 (overdue 6 days). Primary contact: Maya Chen, CTO. Authority: scope changes require VP approval per contract. Relationship health: stable.",
        why: "Why system prompts don't fix this: the system prompt was written when you set up the agent. Acme's context changed last week.",
        memoryLimit: "Memory stores what the agent has seen in its own sessions. It doesn't know what happened in your email with Acme yesterday.",
        geniosCan: "GeniOS delivers a scoped context bundle per client per query \u2014 live, reasoned, and structured \u2014 through a single MCP tool call.",
      }},
      {{ id: "stale-context", label: "Live Context", sub: "Stale facts \u00b7 State drift",
        scenario: "Agent acting on cached context.", graphs: "State \u00b7 Authority",
        metric: "Live", metricLabel: "context, not cached facts",
        before: ["Agent was given context 30 days ago: budget approved, proceed","Agent processes a $45K purchase order \u2014 context says approved","Procurement flags: budget freeze activated 12 days ago, purchase unauthorized","Rollback takes 3 days; vendor relationship strained"],
        after: ["State graph: budget freeze activated 12 days ago \u2014 overrides prior approval","Authority graph: $45K exceeds delegated limit under freeze conditions","GeniOS pushes updated context before agent acts \u2014 not on cached facts","Action paused, procurement notified, zero unauthorized spend"],
        outcome: "Hold this PO. Budget freeze activated 12 days ago \u2014 supersedes the prior approval your agent was working from. Current delegated limit under freeze: $10K. Route to procurement lead for exception approval.",
        why: "Why vector memory doesn't fix this: it stored the approval. It doesn't know the freeze happened after.",
        memoryLimit: "Memory stores what was true when you wrote it. It has no mechanism to know when org state changes and cached context becomes wrong.",
        geniosCan: "GeniOS tracks org state continuously. When state changes, every downstream agent recommendation updates \u2014 always acting on what's true now.",
      }},
      {{ id: "guardrails", label: "Guard Rails", sub: "Authority \u00b7 Thresholds",
        scenario: "Agent about to exceed its mandate.", graphs: "Authority \u00b7 Precedent",
        metric: "Zero", metricLabel: "unauthorized executions",
        before: ["Workflow agent instructed: 'process all pending vendor payments'","Agent processes $8K, $11K, $14K payments \u2014 all in the queue","CFO finds out: $10K threshold requires CFO sign-off \u2014 agent skipped it","Two payments are technically unauthorized \u2014 compliance issue"],
        after: ["Authority graph queried before each payment \u2014 CFO threshold is $10K","$8K: authorized, processes immediately","$11K, $14K: flagged \u2014 exceed threshold, action paused","CFO notified with full context bundle for each flagged item"],
        outcome: "$8K payment: authorized, processed. $11K and $14K payments paused \u2014 both exceed CFO approval threshold (Authority graph). Precedent: similar items in Q3 approved within 48h after CFO review. Notifications sent.",
        why: "Why 'add a check' in your prompt doesn't fix this: the threshold changed last quarter. Your prompt didn't.",
        memoryLimit: "Memory can recall that a threshold exists if someone told the agent. It can't maintain a live policy layer that updates when org rules change.",
        geniosCan: "GeniOS maintains an Authority graph of org policies and queries it before every consequential action \u2014 regardless of what the original prompt says.",
      }},
      {{ id: "fleet", label: "Context Infra", sub: "Architecture \u00b7 Fleet scale",
        scenario: "10 agents. 10 stale context windows.", graphs: "All four graphs",
        metric: "One", metricLabel: "context layer, shared by all",
        before: ["10 agents, each with its own system prompt, each 30\u201390 days stale","Agent A knows about the leadership change. Agent B doesn't. Agent C was told something different.","Agents disagree on who owns a deal, what was committed, what the org policy is","20% of eng time goes to managing context drift across agents"],
        after: ["All 10 agents query one GeniOS tenant \u2014 same org model, same reasoning","Context updates propagate automatically \u2014 no manual prompt updates","Agents agree on state, authority, relationships, and precedent","Context becomes infrastructure, not a debugging problem"],
        outcome: "Context is centralized. All agents pull from the same live org model. When a budget freeze activates or a CEO transitions, every agent knows within minutes \u2014 without a single prompt update from your team.",
        why: "Why individual system prompts don't scale: you can't keep 10 prompts synchronized with a living organization.",
        memoryLimit: "Memory is per-agent and per-session. There is no mechanism for shared, continuously updated org context across an agent fleet.",
        geniosCan: "GeniOS is a multi-tenant context infrastructure layer. Every agent in your fleet reads from the same live model of your organization.",
      }},
    ],
  }},
  {{
    id: "executive", label: "Executive",
    tagline: "Your agents are making consequential decisions across the org. They don't know your rules. GeniOS makes sure they do.",
    domains: [
      {{ id: "finance", label: "Finance", sub: "Payments \u00b7 Controls \u00b7 Thresholds",
        scenario: "A $12K payment. About to send.", graphs: "Authority \u00b7 State",
        metric: "Zero", metricLabel: "unauthorized payments",
        before: ["Agent processes $12K vendor payment immediately","No awareness of Q4 budget freeze \u2014 it's not in the prompt","No check against CFO approval threshold ($10K)","Finance team discovers the violation 6 days later"],
        after: ["State graph detects: Budget freeze active since Nov 1","Authority graph flags: $12K exceeds $10K CFO threshold","GeniOS pushes recommendation before the agent acts \u2014 not after","Action paused \u2192 CFO notified \u2192 precedent logged \u2192 zero human supervision required"],
        outcome: "Hold this payment. Budget freeze is active (State graph). Amount exceeds CFO threshold (Authority graph). Route to CFO for approval. Similar actions in Q3 were approved within 48h after CFO review \u2014 precedent attached.",
        why: "Why prompt engineering doesn't fix this: the freeze happened after you wrote the prompt. Your system prompt is a static document. Your org is not.",
        memoryLimit: "Memory stores past payment approvals. It has no live model of budget state or what approval thresholds currently apply.",
        geniosCan: "GeniOS maintains live Authority and State graphs that update with your org \u2014 every agent action checked against what's actually true today.",
      }},
      {{ id: "hr", label: "HR", sub: "Offers \u00b7 Equity \u00b7 Compliance",
        scenario: "A candidate offer. About to go out.", graphs: "Authority \u00b7 Precedent",
        metric: "Zero", metricLabel: "policy violations",
        before: ["HR agent processes final offer \u2014 $180K base, standard package","Agent sends offer letter automatically","Hiring manager flags next day: equity policy caps new senior hires at $165K","HR is in an awkward renegotiation \u2014 candidate trust damaged"],
        after: ["Authority graph: comp policy updated Q3 \u2014 senior hire cap $165K until Feb review","State graph: comp review cycle opens in 6 weeks","Precedent: 2 similar above-cap offers required renegotiation \u2014 one candidate withdrew","Recommendation pushed before offer sends"],
        outcome: "Hold this offer. Current comp policy caps senior hires at $165K (Authority graph). Review opens in 6 weeks. Two precedents resulted in renegotiation and one withdrawal. Loop hiring manager before sending.",
        why: "Why your agent framework doesn't fix this: it managed the workflow correctly. It had no access to the comp policy that changed last quarter.",
        memoryLimit: "Memory stores past offer letters. It doesn't know what your current comp policies say or when they were last updated.",
        geniosCan: "GeniOS maintains an Authority graph of live org policies. Any agent action that would violate a policy is caught before it executes.",
      }},
      {{ id: "cross-team", label: "Cross-Team", sub: "Coordination \u00b7 Org signals",
        scenario: "Two agents. Same prospect. Same afternoon.", graphs: "State \u00b7 All four graphs",
        metric: "Zero", metricLabel: "duplicate prospect contacts",
        before: ["Sales agent begins outreach on a high-priority prospect","BD agent identifies same prospect for a partnership conversation \u2014 simultaneously","No shared state \u2014 both agents send outreach the same afternoon","Prospect replies: 'Which team am I actually talking to?'"],
        after: ["State graph: Sales agent has active sequence \u2014 started 3 days ago","GeniOS detects conflict before BD agent acts","Coordination signal pushed to both agents","No duplicate contact until resolved by sales lead"],
        outcome: "BD agent: hold outreach. Sales agent has an active sequence on this prospect (State graph). Conflict detected. Route to sales lead to decide whether to merge threads or split engagement.",
        why: "Why multi-agent frameworks don't fix this: they coordinate workflow. They have no shared model of what's happening in your org right now.",
        memoryLimit: "Each agent only knows what it has seen. There is no shared org-level awareness of what actions are in flight across teams.",
        geniosCan: "GeniOS gives every agent a shared read of org state. When two agents would conflict, the conflict is caught before either acts.",
      }},
      {{ id: "vendor", label: "Vendor", sub: "Contracts \u00b7 Renewals \u00b7 State",
        scenario: "A vendor contract. Silently expiring.", graphs: "State \u00b7 Precedent",
        metric: "Caught", metricLabel: "before auto-renewal locked in",
        before: ["SaaS vendor contract set to auto-renew at $84K \u2014 18-day notice window","Procurement agent focused on active negotiations \u2014 no active alert","Notice window closes; $84K renewal locks in","CFO review finds: team migrated off this vendor 6 weeks ago"],
        after: ["State graph: contract renewal window opens in 18 days \u2014 auto-renewal active","State graph also detects: zero user logins from vendor platform in 43 days","Precedent: 2 similar non-renewal situations caught by usage signal, saved $60K+","GeniOS fires recommendation to procurement lead with full evidence bundle"],
        outcome: "Flag: contract auto-renews in 18 days at $84K. Usage signal: zero logins in 43 days (State graph). Matches 2 past non-renewal situations. Recommend: cancel or renegotiate before window closes. Precedent: cancellation approved same-day in both prior cases.",
        why: "Why your contract tracker doesn't fix this: it knows the renewal date. It doesn't know the team stopped using the product.",
        memoryLimit: "Memory stores what it's been told about contracts. It doesn't observe usage patterns or cross-reference them with contract state.",
        geniosCan: "GeniOS reasons across usage signals, contract state, and precedent \u2014 catching the conflict before the window closes and the spend locks in.",
      }},
      {{ id: "strategic", label: "Strategic", sub: "Decisions \u00b7 Precedent \u00b7 Signal",
        scenario: "A strategic decision. No institutional memory.", graphs: "Precedent \u00b7 Relationship \u00b7 Authority",
        metric: "Grounded", metricLabel: "in your org's own outcomes",
        before: ["Executive asks agent: 'Should we offer a custom contract to this prospect?'","Agent gives a generic recommendation based on training data and the current prompt","Decision made; 6 months later it surfaces as a support burden and margin problem","No one can reconstruct why the decision was made"],
        after: ["Precedent graph: 3 custom contracts offered to similar segments in 18 months","2 of 3 resulted in above-average support cost; 1 churned at month 8","Relationship graph: this prospect's champion has low authority \u2014 decisions made above them","GeniOS delivers a recommendation grounded in your org's own outcomes"],
        outcome: "Custom contract carries risk. 2 of 3 comparable precedents resulted in elevated support cost; 1 churned at month 8. Buying authority is limited \u2014 decision likely to escalate. Recommend: standard contract with a 90-day review clause. Precedent: 3 of 3 renewals on that structure.",
        why: "Why a generic AI assistant doesn't fix this: it reasons from training data. GeniOS reasons from what actually happened at your organization.",
        memoryLimit: "Memory recalls what it was told in this session. It has no model of your org's decision history or what patterns led to good outcomes.",
        geniosCan: "GeniOS builds a Precedent graph from your org's actual decisions and outcomes \u2014 recommendations grounded in what worked for your specific context.",
      }},
    ],
  }},
];

const Applications = () => {{
  const [personaIdx, setPersonaIdx] = React.useState(0);
  const [domainIdx, setDomainIdx] = React.useState(0);

  const persona = PERSONAS[personaIdx];
  const d = persona.domains[domainIdx];

  const handlePersona = (i) => {{ setPersonaIdx(i); setDomainIdx(0); }};

  return (
    <section
      id="applications"
      data-section data-label="\u00a7 \u00b7 EVERY ROLE \u00b7 EVERY DOMAIN \u00b7 ONE BRAIN" data-dark="false"
      className="sec-pad cream-card"
      style={{{{ padding: "clamp(60px,7vw,88px) 0", background: T.paper, position: "relative" }}}}
    >
      <Page>
        {{/* Header */}}
        <div style={{{{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}}}>
          <SectionLabel>By role \u00b7 By domain</SectionLabel>
          <h2 style={{{{ fontFamily: T.display, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 18 }}}}>
            One context graph.<br />Every agent. <em className="em-wonk" style={{{{ color: T.brass }}}}>Zero blind spots.</em>
          </h2>
          <p style={{{{ fontSize: 15, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}}}>
            Pick your role and domain. See exactly what GeniOS changes \u2014 before your agent acts.
          </p>
        </div>

        {{/* Persona pills */}}
        <div style={{{{ textAlign: "center", marginBottom: 32 }}}}>
          <div style={{{{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.stone, marginBottom: 14 }}}}>I am a \u2014</div>
          <div style={{{{ display: "inline-flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}}}>
            {{PERSONAS.map((p, i) => {{
              const active = personaIdx === i;
              return (
                <button key={{p.id}} onClick={{() => handlePersona(i)}}
                  style={{{{ padding: "11px 28px", fontFamily: T.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: active ? T.ink : "transparent", color: active ? T.paper : T.stone, border: `0.5px solid ${{active ? T.ink : T.line}}`, cursor: "pointer", transition: "all .22s ease", borderRadius: 2 }}}}
                  onMouseEnter={{(e) => {{ if (!active) {{ e.currentTarget.style.borderColor = T.ink2; e.currentTarget.style.color = T.ink; }} }}}}
                  onMouseLeave={{(e) => {{ if (!active) {{ e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.stone; }} }}}}
                >
                  {{p.label}}
                </button>
              );
            }})}}
          </div>
          <p style={{{{ fontFamily: T.serif, fontStyle: "italic", fontSize: 13.5, color: T.ink3, marginTop: 14, maxWidth: 520, margin: "14px auto 0", lineHeight: 1.6 }}}}>
            {{persona.tagline}}
          </p>
        </div>

        {{/* Domain pills */}}
        <div style={{{{ textAlign: "center", marginBottom: 48 }}}}>
          <div style={{{{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.stone, marginBottom: 14 }}}}>Working in \u2014</div>
          <div style={{{{ display: "inline-flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}}}>
            {{persona.domains.map((dom, i) => {{
              const active = domainIdx === i;
              return (
                <button key={{dom.id}} onClick={{() => setDomainIdx(i)}}
                  style={{{{ padding: "10px 18px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: active ? T.brass : "transparent", color: active ? "#fff" : T.stone, border: `0.5px solid ${{active ? T.brass : T.line}}`, cursor: "pointer", transition: "all .22s ease", borderRadius: 2, textAlign: "center", minWidth: 90 }}}}
                  onMouseEnter={{(e) => {{ if (!active) {{ e.currentTarget.style.borderColor = T.brass; e.currentTarget.style.color = T.brass; }} }}}}
                  onMouseLeave={{(e) => {{ if (!active) {{ e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.stone; }} }}}}
                >
                  <span style={{{{ display: "block" }}}}>{{dom.label}}</span>
                  <span style={{{{ display: "block", fontSize: 8, opacity: 0.65, marginTop: 2, letterSpacing: "0.1em" }}}}>{{dom.sub}}</span>
                </button>
              );
            }})}}
          </div>
        </div>

        {{/* Main panel */}}
        <div className="app-stage" style={{{{ display: "grid", gridTemplateColumns: "minmax(220px,280px) 1fr", background: T.paper, border: `0.5px solid ${{T.ink}}`, boxShadow: "0 40px 80px -44px rgba(16,35,42,0.32), 0 8px 24px -12px rgba(16,35,42,0.12)", position: "relative", overflow: "hidden" }}}}>

          {{/* Left sidebar */}}
          <aside className="app-rail" style={{{{ background: T.ink, color: T.paper, padding: "32px 0 28px", position: "relative", borderRight: `0.5px solid ${{T.ink2}}` }}}}>
            <div aria-hidden="true" style={{{{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: `linear-gradient(${{T.paper}} 0.5px, transparent 0.5px), linear-gradient(90deg, ${{T.paper}} 0.5px, transparent 0.5px)`, backgroundSize: "28px 28px" }}}} />
            <div aria-hidden="true" style={{{{ position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: `linear-gradient(180deg, ${{T.brass}} 0%, rgba(215,90,51,0) 60%)` }}}} />
            <div style={{{{ position: "relative", padding: "0 clamp(20px,2vw,26px)" }}}}>
              <div style={{{{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(242,236,228,0.4)", marginBottom: 16 }}}}>
                {{persona.label}} \u00b7 {{d.label}}
              </div>
              <div style={{{{ fontFamily: T.display, fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: T.paper, letterSpacing: "-0.02em", lineHeight: 1.2, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 12 }}}}>
                {{d.scenario}}
              </div>
              <div style={{{{ fontFamily: T.mono, fontSize: 9, color: T.brass, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 24 }}}}>
                {{d.graphs}}
              </div>
              <div style={{{{ height: "0.5px", background: "rgba(242,236,228,0.1)", marginBottom: 20 }}}} />
              <div style={{{{ marginBottom: 18 }}}}>
                <div style={{{{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,90,70,0.75)", marginBottom: 7 }}}}>Memory can\u2019t \u2014</div>
                <p style={{{{ fontSize: 12, color: "rgba(242,236,228,0.48)", lineHeight: 1.65, margin: 0 }}}}>{{d.memoryLimit}}</p>
              </div>
              <div style={{{{ marginBottom: 24 }}}}>
                <div style={{{{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass, marginBottom: 7 }}}}>GeniOS does \u2014</div>
                <p style={{{{ fontSize: 12, color: "rgba(242,236,228,0.62)", lineHeight: 1.65, margin: 0 }}}}>{{d.geniosCan}}</p>
              </div>
              <div style={{{{ paddingTop: 18, borderTop: "0.5px solid rgba(242,236,228,0.1)" }}}}>
                <div style={{{{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,236,228,0.3)", marginBottom: 10 }}}}>Graphs queried</div>
                <div style={{{{ display: "flex", flexWrap: "wrap", gap: "6px 10px" }}}}>
                  {{["Authority", "State", "Precedent", "Relationship"].map((g) => (
                    <span key={{g}} style={{{{ fontFamily: T.mono, fontSize: 9, color: T.brass, display: "inline-flex", alignItems: "center", gap: 5 }}}}>
                      <span style={{{{ width: 4, height: 4, borderRadius: "50%", background: T.brass, display: "inline-block", opacity: 0.85 }}}} />{{g}}
                    </span>
                  ))}}
                </div>
              </div>
            </div>
          </aside>

          {{/* Right panel */}}
          <div style={{{{ padding: "clamp(28px,3vw,44px)", position: "relative", background: T.paper }}}}>
            <div style={{{{ marginBottom: 24, paddingBottom: 20, borderBottom: `0.5px solid ${{T.line}}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}}}>
              <div style={{{{ minWidth: 0, flex: "1 1 300px" }}}}>
                <div style={{{{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}}}>
                  <span style={{{{ display: "inline-block", width: 18, height: 1, background: T.ink, opacity: 0.35 }}}} />
                  Scenario \u00b7 {{persona.label}}
                </div>
                <h3 style={{{{ fontFamily: T.display, fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.025em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", margin: 0 }}}}>
                  {{d.label}}.{{" "}}<em className="em-wonk" style={{{{ color: T.brass, fontStyle: "italic" }}}}>{{d.scenario}}</em>
                </h3>
              </div>
              <div style={{{{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.stone, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", border: `0.5px solid ${{T.line}}`, background: T.cardBg, whiteSpace: "nowrap" }}}}>
                <span style={{{{ width: 6, height: 6, borderRadius: "50%", background: T.brass, display: "inline-block", boxShadow: "0 0 0 3px rgba(215,90,51,0.18)" }}}} />
                Before \u2192 After
              </div>
            </div>

            {{/* Before / After */}}
            <div className="app-split" style={{{{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, position: "relative", alignItems: "stretch" }}}}>
              <div style={{{{ background: "rgba(156,74,62,0.045)", border: "0.5px solid rgba(156,74,62,0.22)", padding: "24px" }}}}>
                <div style={{{{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "0.5px solid rgba(156,74,62,0.18)" }}}}>
                  <div style={{{{ width: 22, height: 22, background: "rgba(156,74,62,0.12)", border: "0.5px solid rgba(156,74,62,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}}}>
                    <span style={{{{ color: MUTED_RED, fontFamily: T.mono, fontSize: 10, fontWeight: 600 }}}}>&#x2715;</span>
                  </div>
                  <strong style={{{{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED_RED }}}}>Without GeniOS</strong>
                  <span style={{{{ marginLeft: "auto", fontFamily: T.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(156,74,62,0.55)" }}}}>flat agent</span>
                </div>
                {{d.before.map((t, i) => (
                  <div key={{i}} style={{{{ display: "flex", gap: 12, fontSize: 13, lineHeight: 1.6, color: T.ink2, marginBottom: 10, alignItems: "flex-start" }}}}>
                    <span style={{{{ fontFamily: T.mono, fontSize: 9.5, color: "rgba(156,74,62,0.6)", flexShrink: 0, marginTop: 3, width: 18 }}}}>{{String(i + 1).padStart(2, "0")}}</span>
                    <span style={{{{ opacity: 0.9 }}}}>{{t}}</span>
                  </div>
                ))}}
              </div>

              <div style={{{{ background: T.ink, color: T.paper, padding: "24px", position: "relative", boxShadow: "0 24px 48px -22px rgba(16,35,42,0.45), inset 0 1px 0 rgba(215,90,51,0.25)", borderTop: `1px solid ${{T.brass}}`, overflow: "hidden" }}}}>
                <div aria-hidden="true" style={{{{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: `linear-gradient(${{T.paper}} 0.5px, transparent 0.5px), linear-gradient(90deg, ${{T.paper}} 0.5px, transparent 0.5px)`, backgroundSize: "22px 22px" }}}} />
                <div aria-hidden="true" style={{{{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle at top right, rgba(215,90,51,0.22) 0%, rgba(215,90,51,0) 65%)", pointerEvents: "none" }}}} />
                <div style={{{{ position: "relative" }}}}>
                  <div style={{{{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: `0.5px solid ${{T.lineDark}}` }}}}>
                    <div style={{{{ width: 22, height: 22, background: "rgba(215,90,51,0.22)", border: `0.5px solid ${{T.brass}}`, display: "flex", alignItems: "center", justifyContent: "center" }}}}>
                      <span style={{{{ color: T.brass, fontFamily: T.mono, fontSize: 10, fontWeight: 600 }}}}>&#x2713;</span>
                    </div>
                    <strong style={{{{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.brass }}}}>With GeniOS</strong>
                    <span style={{{{ marginLeft: "auto", fontFamily: T.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(242,236,228,0.45)" }}}}>context-aware</span>
                  </div>
                  {{d.after.map((t, i) => (
                    <div key={{i}} style={{{{ display: "flex", gap: 12, fontSize: 13, lineHeight: 1.6, color: T.paper, marginBottom: 10, alignItems: "flex-start" }}}}>
                      <span style={{{{ fontFamily: T.mono, fontSize: 9.5, color: T.brass, flexShrink: 0, marginTop: 3, width: 18 }}}}>{{String(i + 1).padStart(2, "0")}}</span>
                      <span style={{{{ opacity: 0.9 }}}}>{{t}}</span>
                    </div>
                  ))}}
                </div>
              </div>

              <div className="app-arrow" aria-hidden="true"
                style={{{{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", background: T.paper, border: `0.5px solid ${{T.ink}}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 6px ${{T.paper}}, 0 6px 20px rgba(215,90,51,0.28)`, zIndex: 3 }}}}
              >
                <span style={{{{ color: T.brass, fontFamily: T.mono, fontSize: 15, fontWeight: 700 }}}}>&#x2192;</span>
              </div>
            </div>

            {{/* Outcome panel */}}
            <div style={{{{ marginTop: 20, display: "grid", gridTemplateColumns: "auto 1fr", border: `0.5px solid ${{T.ink}}`, background: T.cardBg, overflow: "hidden" }}}}>
              <div style={{{{ background: T.ink, color: T.paper, padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 130, position: "relative" }}}}>
                <div aria-hidden="true" style={{{{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none", backgroundImage: `linear-gradient(${{T.paper}} 0.5px, transparent 0.5px), linear-gradient(90deg, ${{T.paper}} 0.5px, transparent 0.5px)`, backgroundSize: "18px 18px" }}}} />
                <div style={{{{ position: "relative" }}}}>
                  <div style={{{{ fontFamily: T.display, fontSize: 28, fontWeight: 500, color: T.brass, letterSpacing: "-0.025em", lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}}}>{{d.metric}}</div>
                  <div style={{{{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(242,236,228,0.5)", marginTop: 6 }}}}>{{d.metricLabel}}</div>
                </div>
              </div>
              <div style={{{{ padding: "16px 22px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}}}>
                <div style={{{{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: T.brass, fontWeight: 600, whiteSpace: "nowrap" }}}}>The move GeniOS delivered</div>
                <div style={{{{ flex: 1, minWidth: 220 }}}}>
                  <div style={{{{ fontFamily: T.serif, fontStyle: "italic", fontSize: 14.5, lineHeight: 1.5, color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 40" }}}}>{{d.outcome}}</div>
                  {{d.why && <div style={{{{ fontFamily: T.mono, fontSize: 10.5, color: T.stone, lineHeight: 1.6, marginTop: 10 }}}}>{{d.why}}</div>}}
                </div>
              </div>
            </div>
          </div>
        </div>

        {{/* Bottom strip */}}
        <div style={{{{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, flexWrap: "wrap", gap: 16 }}}}>
          <div style={{{{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone }}}}>&#x21b3; Same brain. Every role. Every domain. Continuous.</div>
          <div style={{{{ display: "inline-flex", gap: 4 }}}}>
            {{persona.domains.map((_, i) => (
              <span key={{i}} onClick={{() => setDomainIdx(i)}} style={{{{ width: 14, height: 2, background: domainIdx === i ? T.brass : T.line, display: "inline-block", transition: "background .25s ease", cursor: "pointer" }}}} />
            ))}}
          </div>
        </div>
      </Page>

      <style dangerouslySetInnerHTML={{{{ __html: "@media(max-width:900px){{.app-stage{{grid-template-columns:1fr!important}}.app-rail{{padding-bottom:16px!important}}.app-split{{grid-template-columns:1fr!important}}.app-arrow{{display:none!important}}}}" }}}} />
    </section>
  );
}};'''

result = before + new_section + after
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(result)

print(f'Done. New file size: {len(result)} chars')
