import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/DemoNavy.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find start: the /* comment line before "APPLICATIONS — Persona"
mid_start = content.find('APPLICATIONS \u2014 Persona \u2192 Domain \u2192 Scenario')
if mid_start == -1:
    print("ERROR: start marker not found")
    sys.exit(1)
si = content.rfind('/*', 0, mid_start)
if si == -1:
    print("ERROR: /* before start not found")
    sys.exit(1)

# Find end: the /* comment line before "TIER USE CASES"
mid_end = content.find('TIER USE CASES \u2014 20 specific shipping')
if mid_end == -1:
    print("ERROR: end marker not found")
    sys.exit(1)
ei = content.rfind('/*', 0, mid_end)
if ei == -1:
    print("ERROR: /* before end not found")
    sys.exit(1)

print(f"Replacing chars {si} to {ei}")

new_section = """\
/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u00b7 APPLICATIONS \u2014 3-step scenario filter
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
const APP_ROLES = [
  { id: "founder",   label: "Founder / CEO" },
  { id: "sales",     label: "Sales / BD" },
  { id: "executive", label: "Executive" },
  { id: "hr",        label: "HR / People" },
  { id: "ops",       label: "Operations" },
];

const APP_AGENT_TYPES = [
  { id: "assistant", label: "Personal Assistant", sub: "Email \u00b7 Calendar \u00b7 Scheduling" },
  { id: "sales",     label: "Sales Agent",        sub: "Outreach \u00b7 Pipeline \u00b7 CRM" },
  { id: "finance",   label: "Finance Agent",      sub: "Payments \u00b7 Approvals \u00b7 Budget" },
  { id: "hr",        label: "HR Agent",           sub: "Hiring \u00b7 Offers \u00b7 Onboarding" },
  { id: "ops",       label: "Operations Agent",   sub: "Workflow \u00b7 Coordination \u00b7 Vendor" },
];

const APP_DOMAINS = [
  { id: "pipeline", label: "Sales & Pipeline" },
  { id: "finance",  label: "Finance & Payments" },
  { id: "hiring",   label: "HR & Hiring" },
  { id: "cs",       label: "Customer Success" },
  { id: "ops",      label: "Operations" },
  { id: "strategy", label: "Strategic Decisions" },
];

const APP_SCENARIOS = [
  // \u2500\u2500\u2500 PERSONAL ASSISTANT AGENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  { id: "a01", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
    title: "Pre-meeting brief with no relationship context",
    scenario: "You have a call with a key account in 30 minutes. Your PA agent pulls the calendar event and generates a briefing.",
    withMemory: "Pulls last meeting notes and attendee names. No context on what\u2019s shifted in the relationship since.",
    withGenios: "Delivers relationship health score, open commitments from your side, what\u2019s changed in their org in 2 weeks, and the recommended opening move.",
    theOneThing: "Memory prepares you for the meeting. GeniOS tells you how to open it.",
    whyItMatters: "The first 90 seconds of the call sets the agenda. Walking in cold costs you control of it.",
    impact: "Avg 4 hrs/week saved on manual pre-call research across active accounts.",
    graphs: "Relationship \u00b7 State \u00b7 Precedent",
  },
  { id: "a02", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
    title: "Follow-up drafted to a champion who just left",
    scenario: "PA agent drafts a follow-up email to your main contact at a key account. That contact changed roles last week.",
    withMemory: "Recalls the contact\u2019s name and last interaction. Drafts and queues the email.",
    withGenios: "State graph detects: contact\u2019s title changed 8 days ago. Authority graph updates decision-maker. Recommends waiting for a warm intro before outreach.",
    theOneThing: "Memory knows who you emailed. GeniOS knows if they still matter.",
    whyItMatters: "Emailing someone who left signals you\u2019re not paying attention. Relationship cost: high and silent.",
    impact: "Caught in 100% of cases where org change happened post-last-email.",
    graphs: "State \u00b7 Authority \u00b7 Relationship",
  },
  { id: "a03", agentType: "assistant", roles: ["founder","executive"], domains: ["pipeline","strategy"],
    title: "Commitment due today. Agent doesn\u2019t know.",
    scenario: "You promised a key investor a monthly update in an email 3 days ago. Today is the implied deadline.",
    withMemory: "Memory doesn\u2019t extract commitments from email threads. No concept of what was promised or to whom.",
    withGenios: "Commitment extracted at ingest. Push delivered at T-24h with draft update pre-generated based on what this investor cares about most.",
    theOneThing: "Memory stores messages. GeniOS extracts the commitments hidden inside them.",
    whyItMatters: "Missed investor commitments compound. First miss is forgiven. Second miss is a pattern.",
    impact: "Zero missed commitments vs. avg 2.3 missed per month without GeniOS.",
    graphs: "Precedent \u00b7 State",
  },
  { id: "a04", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["cs","pipeline"],
    title: "Inbox triage that treats all senders equally",
    scenario: "PA agent sorts 80 emails. Marks your top customer\u2019s message as \u2018reply later\u2019. Flags a newsletter as priority.",
    withMemory: "Triages by keywords and sender frequency. Doesn\u2019t know who actually matters in your org graph.",
    withGenios: "Every sender carries a relationship weight, authority score, and deal status. Top customer: reply now. CFO thread: escalate. Newsletter: archive.",
    theOneThing: "Keyword triage is fast. Context-aware triage is accurate.",
    whyItMatters: "A customer who waited 3 days for a reply because your agent misfiled them already knows.",
    impact: "Avg 1.2 mis-prioritized critical threads caught and corrected per day.",
    graphs: "Relationship \u00b7 Authority",
  },
  { id: "a05", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
    title: "Auto-reply sent during active negotiation",
    scenario: "You\u2019re mid-negotiation on a renewal. PA agent sends an automated product update to the same contact.",
    withMemory: "Doesn\u2019t know there\u2019s an active negotiation. Sends the scheduled email on time.",
    withGenios: "State graph: active renewal negotiation in progress \u2014 outreach hold recommended. Auto-response suppressed. Account manager notified.",
    theOneThing: "Memory doesn\u2019t know what\u2019s in-flight. GeniOS reads the org\u2019s active state.",
    whyItMatters: "Sending a promotional email mid-negotiation signals your teams aren\u2019t talking to each other.",
    impact: "Prevents avg 3 misfire automated emails per month during active deal cycles.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "a06", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["cs","pipeline"],
    title: "Meeting recap missing prior commitments",
    scenario: "PA agent writes a recap after a customer call. Commitments made in earlier sessions aren\u2019t referenced.",
    withMemory: "Summarizes today\u2019s call only. No awareness of what was promised in prior sessions.",
    withGenios: "Pulls full relationship context: outstanding commitments, what was said last time, relationship health. Recap shows what\u2019s changed and what was honored.",
    theOneThing: "A recap that only covers today misses everything that mattered before.",
    whyItMatters: "Customers notice when you don\u2019t remember what you promised. Recaps are a trust signal.",
    impact: "100% commitment continuity across meeting recaps for tracked accounts.",
    graphs: "Precedent \u00b7 Relationship",
  },
  { id: "a07", agentType: "assistant", roles: ["founder","sales","executive"], domains: ["cs"],
    title: "Renewal call booked \u2014 account is cooling",
    scenario: "PA agent schedules a renewal call for next week. The account\u2019s relationship health has been deteriorating for 30 days.",
    withMemory: "Books the available slot. No context on account health or what\u2019s changed in the relationship.",
    withGenios: "Relationship graph: account health score dropped 44% in 30 days. Flags before booking: recommend human-led repair outreach first. Do not open with a renewal pitch.",
    theOneThing: "A calendar tool sees availability. GeniOS sees whether you should show up.",
    whyItMatters: "Entering renewal with a cold relationship and no repair strategy has a 3\u00d7 higher churn rate.",
    impact: "Relationship health flagged pre-booking in 100% of at-risk renewal accounts.",
    graphs: "Relationship \u00b7 State",
  },
  { id: "a08", agentType: "assistant", roles: ["founder"], domains: ["strategy","pipeline"],
    title: "Investor outreach ignoring a prior rejection",
    scenario: "PA agent drafts a fundraising email to a VC. That investor passed 6 months ago with a specific reason.",
    withMemory: "No recall of prior fundraising conversations unless they\u2019re in the current context window.",
    withGenios: "Precedent graph: this investor passed 6 months ago \u2014 cited \u2018too early for our check size.\u2019 Recommends: lead with milestone progress, not product update.",
    theOneThing: "Re-approaching an investor without addressing their exact rejection reason signals you weren\u2019t listening.",
    whyItMatters: "Second passes are harder to recover from. The right framing can reopen them; the wrong one closes them permanently.",
    impact: "100% of prior VC passes surfaced before re-outreach is drafted.",
    graphs: "Precedent \u00b7 Relationship",
  },
  { id: "a09", agentType: "assistant", roles: ["founder","executive"], domains: ["strategy"],
    title: "Two high-stakes calls scheduled back to back",
    scenario: "PA agent books a difficult conversation with a departing employee and a board update in the same 90-minute window.",
    withMemory: "Checks calendar availability. Books both. No awareness of the context weight of either conversation.",
    withGenios: "State graph: both conversations are high-stakes. Recommends: 90-min buffer between them. Suggests reordering based on emotional load.",
    theOneThing: "Calendar tools see time slots. GeniOS sees what\u2019s inside them.",
    whyItMatters: "Walking into a board call directly after a difficult HR conversation is a preparation failure with no undo.",
    impact: "High-stakes scheduling conflicts flagged before they\u2019re confirmed.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "a10", agentType: "assistant", roles: ["founder","sales"], domains: ["pipeline","cs"],
    title: "Thank-you note that reads like first contact",
    scenario: "After a deal closes, PA agent drafts a thank-you email. It\u2019s polished but generic \u2014 no reference to the 6-month journey.",
    withMemory: "Writes a well-formatted email. No context on the relationship arc, what was overcome, or who championed the deal.",
    withGenios: "Relationship graph: 6-month journey, 3 near-losses, 2 internal champions. Email references the specific moment that turned the deal.",
    theOneThing: "A generic thank-you after 6 months is worse than no thank-you \u2014 it signals you weren\u2019t paying attention.",
    whyItMatters: "The close is the beginning of the renewal. How you end the sale determines how you enter the relationship.",
    impact: "Relationship-aware close communications correlate with 2.4\u00d7 higher renewal rates.",
    graphs: "Relationship \u00b7 Precedent",
  },

  // \u2500\u2500\u2500 SALES AGENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  { id: "s01", agentType: "sales", roles: ["founder","sales","executive"], domains: ["pipeline","cs"],
    title: "Follow-up email during a CEO transition",
    scenario: "Sales agent sends a follow-up to a warm prospect. Their CEO resigned 9 days ago \u2014 leadership is in flux.",
    withMemory: "Recalls last email date and account status. Drafts and sends the follow-up on schedule.",
    withGenios: "State graph: leadership transition in progress. Relationship graph: engagement cooling. Recommends: hold outreach 14 days, route to CSM for temperature check.",
    theOneThing: "Memory sees a warm account. GeniOS sees a company mid-crisis.",
    whyItMatters: "Outreach during a leadership transition reads as tone-deaf. Timing is the entire message.",
    impact: "Outreach hold applied in 100% of accounts with detected leadership transitions.",
    graphs: "State \u00b7 Relationship \u00b7 Precedent",
  },
  { id: "s02", agentType: "sales", roles: ["founder","sales","executive"], domains: ["pipeline","finance"],
    title: "Proposal sent after budget freeze",
    scenario: "Sales agent sends a detailed proposal to a prospect. Their Q4 budget freeze started 11 days ago.",
    withMemory: "Drafts and sends the proposal based on the last meeting notes. No awareness of external budget conditions.",
    withGenios: "State graph: Q4 budget freeze detected at prospect org via signal. Recommends: delay proposal, switch to ROI-forward nurture until Q1 opens.",
    theOneThing: "A proposal during a budget freeze isn\u2019t rejected \u2014 it\u2019s ignored. That\u2019s worse.",
    whyItMatters: "Sending the right thing at the wrong time trains prospects to deprioritize you.",
    impact: "Deal timing accuracy improves by avg 34% when state-aware outreach is applied.",
    graphs: "State \u00b7 Precedent",
  },
  { id: "s03", agentType: "sales", roles: ["sales","founder"], domains: ["pipeline"],
    title: "Re-engagement that forgets an open commitment",
    scenario: "Sales agent sends a \u2018checking in\u2019 email to a stalled prospect. The last exchange had an open commitment from your side.",
    withMemory: "Detects the gap in conversation. Drafts a check-in. Sends it.",
    withGenios: "Precedent graph: last exchange had an open commitment \u2014 deck update, 22 days overdue. Recommends: lead with the commitment, not a check-in. Pattern closed 3 of 3 similar cases.",
    theOneThing: "A check-in when you owe something reads as avoidance. Lead with what you owe.",
    whyItMatters: "Stalled deals are rarely stalled by the prospect. Usually there\u2019s an unfulfilled promise on your side.",
    impact: "3 of 3 similar commitment-led re-engagements closed vs. 1 of 7 generic check-ins.",
    graphs: "Precedent \u00b7 Relationship",
  },
  { id: "s04", agentType: "sales", roles: ["sales","executive","founder"], domains: ["pipeline"],
    title: "Outreach routed to low-authority contact",
    scenario: "Sales agent sends a detailed proposal to the original champion. Decision authority shifted to VP level 3 weeks ago.",
    withMemory: "Sends to the stored contact. No awareness of authority drift within the account.",
    withGenios: "Authority graph: decision authority shifted to VP of Engineering 3 weeks ago. Champion is now an influencer, not a decision-maker. Recommends re-routing.",
    theOneThing: "Memory knows who you talked to last. GeniOS knows who can say yes now.",
    whyItMatters: "A proposal that lands with the wrong person delays the deal by weeks and signals poor account knowledge.",
    impact: "Authority drift detected in avg 2.1 active accounts per month per rep.",
    graphs: "Authority \u00b7 State",
  },
  { id: "s05", agentType: "sales", roles: ["sales","founder","executive"], domains: ["cs","pipeline"],
    title: "Renewal pitch to a cooling account",
    scenario: "Sales agent sends a renewal package to an account at contract end. Engagement has dropped 66% in 30 days.",
    withMemory: "Detects the renewal date and sends the renewal pitch. No context on relationship health.",
    withGenios: "Relationship graph: 66% engagement drop. State graph: champion hasn\u2019t responded in 21 days. Recommends: personal outreach before any renewal pitch.",
    theOneThing: "A renewal pitch to a cooling account accelerates churn. The pitch is the last thing they need.",
    whyItMatters: "Customers who churn rarely complain first \u2014 they go quiet. That silence is the signal.",
    impact: "At-risk accounts caught avg 3.2 weeks before renewal conversation, giving recovery time.",
    graphs: "Relationship \u00b7 State \u00b7 Precedent",
  },
  { id: "s06", agentType: "sales", roles: ["sales","ops","executive"], domains: ["pipeline","ops"],
    title: "Duplicate outreach by sales and BD agents",
    scenario: "Sales agent starts an outreach sequence. BD agent targets the same prospect for a partnership conversation simultaneously.",
    withMemory: "Each agent operates independently. No shared awareness of what the other is doing.",
    withGenios: "State graph: Sales agent has active sequence on this prospect \u2014 started 3 days ago. BD agent action blocked. Coordination signal sent to sales lead.",
    theOneThing: "Memory is per-agent. GeniOS is shared across your entire agent fleet.",
    whyItMatters: "Prospect receiving two outreach threads from the same company in one day loses trust immediately.",
    impact: "Cross-agent conflicts caught before contact in 100% of detected cases.",
    graphs: "State \u00b7 All four graphs",
  },
  { id: "s07", agentType: "sales", roles: ["sales","founder"], domains: ["pipeline"],
    title: "Personalized email with no relationship depth",
    scenario: "Sales agent drafts a \u2018personalized\u2019 outreach using name, company, and recent news. No history context.",
    withMemory: "Pulls name and company from CRM. Adds recent news hook. Looks personalized on surface.",
    withGenios: "Relationship graph: this contact met your co-founder at a conference 4 months ago. Recommends: reference that touchpoint. Relationship-grounded opening has 3\u00d7 reply rate.",
    theOneThing: "Personalization without relationship depth is just mail merge with extra steps.",
    whyItMatters: "Buyers can smell template personalization from three sentences in. True context changes the tone.",
    impact: "Relationship-grounded outreach averages 3.1\u00d7 reply rate vs. template personalization.",
    graphs: "Relationship \u00b7 Precedent",
  },
  { id: "s08", agentType: "sales", roles: ["sales","executive"], domains: ["pipeline","finance"],
    title: "Price quote sent during procurement hold",
    scenario: "Sales agent sends a formal price quote to a prospect. Their procurement process is on a 60-day hold.",
    withMemory: "Sends the quote as scheduled. No awareness of the prospect\u2019s internal procurement state.",
    withGenios: "State graph: procurement hold active at this org \u2014 detected via signal. Recommends: send ROI summary instead of formal quote. Flag for re-approach in 45 days.",
    theOneThing: "A formal quote during a procurement hold creates process friction you\u2019ll have to undo.",
    whyItMatters: "Making a prospect explain \u2018why they can\u2019t engage\u2019 trains them to associate you with friction.",
    impact: "Timing-aware follow-ups reduce avg sales cycle by 18 days in affected accounts.",
    graphs: "State \u00b7 Precedent",
  },
  { id: "s09", agentType: "sales", roles: ["sales","founder"], domains: ["cs","pipeline"],
    title: "Upsell pitch during an open support complaint",
    scenario: "Sales agent sends an upsell offer to an account. There\u2019s an active, unresolved support ticket with that customer.",
    withMemory: "CRM shows the account as \u2018healthy\u2019. Agent sends the upsell. No context on open support threads.",
    withGenios: "State graph: active unresolved support ticket \u2014 priority 2, 6 days open. Recommends: hold all commercial outreach until resolved. Route to CS immediately.",
    theOneThing: "Upselling a customer with an open complaint is the clearest signal that your systems don\u2019t talk.",
    whyItMatters: "Nothing destroys trust faster than being sold to when you\u2019re waiting for a fix.",
    impact: "Commercial outreach suppressed on 100% of accounts with open priority tickets.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "s10", agentType: "sales", roles: ["sales","founder","executive"], domains: ["pipeline"],
    title: "Win-back to an account that churned on bad terms",
    scenario: "Sales agent identifies a churned account as a win-back target. The account left due to a specific unresolved issue.",
    withMemory: "Finds the account in CRM as \u2018churned\u2019. Drafts a win-back sequence. No context on why they left.",
    withGenios: "Precedent graph: churned 8 months ago \u2014 specific reason: support SLA breach, 3 incidents. Recommends: acknowledge the failure directly, lead with what\u2019s changed, not with features.",
    theOneThing: "Win-backs without acknowledging why they left don\u2019t win anything back.",
    whyItMatters: "Customers who churned on bad terms remember exactly what happened. Generic win-backs confirm they made the right call.",
    impact: "Reason-aware win-back messaging has 2.8\u00d7 higher re-engagement rate vs. standard sequences.",
    graphs: "Precedent \u00b7 Relationship",
  },

  // \u2500\u2500\u2500 FINANCE AGENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  { id: "f01", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance"],
    title: "$12K payment processed during budget freeze",
    scenario: "Finance agent processes a $12K vendor payment. A Q4 budget freeze has been active for 11 days.",
    withMemory: "Processes the payment as queued. The freeze happened after the agent\u2019s last context update.",
    withGenios: "State graph: Q4 budget freeze active since Nov 1. Authority graph: $12K exceeds $10K CFO threshold. Payment paused, CFO notified with context bundle.",
    theOneThing: "Memory stores the approval. GeniOS knows the approval was superseded.",
    whyItMatters: "An unauthorized payment found in audit is a compliance event, not just a mistake.",
    impact: "Zero unauthorized payments vs. avg 1.4 per quarter in orgs without context-aware finance agents.",
    graphs: "State \u00b7 Authority",
  },
  { id: "f02", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
    title: "Vendor payment above approval threshold",
    scenario: "Finance agent queues $14K vendor payment. CFO approval threshold is $10K \u2014 agent doesn\u2019t check.",
    withMemory: "Processes the payment. No live model of what the current approval thresholds are.",
    withGenios: "Authority graph queried before processing: $14K exceeds $10K CFO threshold. Payment flagged, CFO notified, precedent logged. Processed within 48h after approval.",
    theOneThing: "The threshold is in the Authority graph. Not in the prompt.",
    whyItMatters: "Payments above threshold without approval are audit findings regardless of how small they seem.",
    impact: "100% of above-threshold payments caught before processing \u2014 zero exceptions.",
    graphs: "Authority \u00b7 Precedent",
  },
  { id: "f03", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance","ops"],
    title: "Auto-renewal on a product the team stopped using",
    scenario: "$84K SaaS contract is 18 days from auto-renewing. The team migrated off it 6 weeks ago.",
    withMemory: "No signal on renewal windows unless explicitly provided. No usage monitoring.",
    withGenios: "State graph: renewal window opens in 18 days. Usage signal: zero logins in 43 days. Precedent: 2 similar non-renewals saved $60K+. Alert sent to procurement lead.",
    theOneThing: "Your contract tracker knows the renewal date. GeniOS knows the team stopped using it.",
    whyItMatters: "$84K locks in the moment the window closes. There\u2019s no undo.",
    impact: "Avg $47K saved per year in detected non-renewal situations across tracked contracts.",
    graphs: "State \u00b7 Precedent",
  },
  { id: "f04", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
    title: "Expense reimbursement above updated travel policy",
    scenario: "Finance agent processes a $3,200 travel reimbursement. The travel policy cap was updated 3 weeks ago to $2,500.",
    withMemory: "Processes based on prior policy knowledge. No live model of policy updates.",
    withGenios: "Authority graph: travel policy updated 3 weeks ago \u2014 new cap $2,500. Reimbursement flagged for manager review before processing.",
    theOneThing: "Policies update. Memory doesn\u2019t.",
    whyItMatters: "Inconsistent expense enforcement creates compliance risk and employee trust issues simultaneously.",
    impact: "Policy violations caught in 100% of cases where Authority graph is updated.",
    graphs: "Authority \u00b7 State",
  },
  { id: "f05", agentType: "finance", roles: ["executive","ops"], domains: ["finance","cs"],
    title: "Invoice processed after contract end",
    scenario: "Finance agent processes an invoice from a vendor whose contract expired 18 days ago.",
    withMemory: "Processes the invoice. No live tracking of vendor contract status.",
    withGenios: "State graph: vendor contract expired 18 days ago \u2014 no renewal executed. Invoice flagged, sent to procurement for contract resolution before payment.",
    theOneThing: "Memory processes invoices. GeniOS checks if you still have a contract.",
    whyItMatters: "Paying an expired vendor creates both financial and legal exposure depending on contract terms.",
    impact: "100% of post-contract invoices flagged before payment processing.",
    graphs: "State \u00b7 Authority",
  },
  { id: "f06", agentType: "finance", roles: ["executive","ops"], domains: ["finance","ops"],
    title: "Duplicate payment by two finance agents",
    scenario: "Finance agent A processes a vendor invoice. Finance agent B processes the same invoice routed through a different channel.",
    withMemory: "Each agent processes independently. No shared awareness of what the other has already executed.",
    withGenios: "State graph: payment for this invoice already processed by Agent A 2 days ago. Agent B action blocked. Duplicate flagged for reconciliation.",
    theOneThing: "Two agents, same invoice, no shared state \u2014 the org pays twice.",
    whyItMatters: "Duplicate payments are rarely caught until reconciliation. By then, recovery is slow and awkward.",
    impact: "Zero duplicate payments detected across multi-agent finance fleet in tracked deployments.",
    graphs: "State \u00b7 All four graphs",
  },
  { id: "f07", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
    title: "Payment to a vendor with an active dispute",
    scenario: "Finance agent processes a $22K payment. There\u2019s an open dispute with this vendor over a prior delivery failure.",
    withMemory: "Processes the payment as queued. Dispute exists in a Slack thread the agent never saw.",
    withGenios: "State graph: active dispute with this vendor \u2014 raised 12 days ago, unresolved. Payment flagged, routed to procurement lead before processing.",
    theOneThing: "Memory processes what\u2019s in the queue. GeniOS checks what\u2019s in the relationship.",
    whyItMatters: "Paying a vendor mid-dispute removes your leverage and signals the dispute is resolved when it isn\u2019t.",
    impact: "Vendor dispute hold applied in 100% of detected cases before payment triggers.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "f08", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance"],
    title: "Subscription upgrade approved without budget owner",
    scenario: "Finance agent approves a $1,200/mo software upgrade requested by a team lead. Budget owner wasn\u2019t looped in.",
    withMemory: "Processes the approval. No live model of who the budget owner is for this cost center.",
    withGenios: "Authority graph: software upgrades over $800/mo require VP Finance approval for this cost center. Approval flagged, routed to correct authority before processing.",
    theOneThing: "The request looked approved. The Authority graph knew it wasn\u2019t.",
    whyItMatters: "Approvals without the right authority are liabilities, not decisions.",
    impact: "Authority routing accuracy: 100% for configured cost centers.",
    graphs: "Authority \u00b7 State",
  },
  { id: "f09", agentType: "finance", roles: ["executive","ops"], domains: ["finance"],
    title: "PO sent to an offboarded vendor contact",
    scenario: "Finance agent sends a purchase order to the vendor\u2019s primary contact. That contact left the vendor 3 months ago.",
    withMemory: "Sends to stored contact email. No monitoring of vendor-side org changes.",
    withGenios: "State graph: vendor contact offboarded 3 months ago based on email bounce pattern and LinkedIn signal. PO redirected to vendor account manager.",
    theOneThing: "Memory stores contacts. GeniOS notices when they stop being contacts.",
    whyItMatters: "A PO that reaches no one is a PO that disappears. Delays compound.",
    impact: "Avg 4-day PO processing delay eliminated in orgs with state-aware vendor contact tracking.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "f10", agentType: "finance", roles: ["executive","ops","founder"], domains: ["finance","strategy"],
    title: "Budget forecast built on stale headcount data",
    scenario: "Finance agent builds Q1 budget forecast. Headcount data is 60 days old \u2014 3 roles filled, 2 new openings added.",
    withMemory: "Uses the headcount snapshot it was given. No live org model.",
    withGenios: "State graph: headcount updated \u2014 3 roles filled (Oct), 2 new openings added (Nov). Forecast recalculated with live data before CFO review.",
    theOneThing: "A forecast is only as good as the org model it\u2019s built on.",
    whyItMatters: "Budget decisions made on stale headcount create real-money misallocations that take quarters to correct.",
    impact: "Forecast accuracy improves by avg 12% with live-state headcount inputs.",
    graphs: "State \u00b7 Authority",
  },

  // \u2500\u2500\u2500 HR AGENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  { id: "h01", agentType: "hr", roles: ["hr","executive","founder"], domains: ["hiring"],
    title: "Offer letter sent above compensation cap",
    scenario: "HR agent processes a final offer at $180K base. Internal equity policy caps new senior hires at $165K.",
    withMemory: "Processes the offer as drafted. Policy was updated last quarter \u2014 not in context.",
    withGenios: "Authority graph: comp policy updated Q3 \u2014 senior hire cap $165K until Feb review. Offer flagged before sending. Hiring manager looped in.",
    theOneThing: "The workflow was correct. The policy awareness wasn\u2019t.",
    whyItMatters: "An above-cap offer that has to be renegotiated damages candidate trust before day one.",
    impact: "Zero policy violations on offers in orgs with live Authority graph comp policies.",
    graphs: "Authority \u00b7 Precedent",
  },
  { id: "h02", agentType: "hr", roles: ["hr","founder","executive"], domains: ["hiring","cs"],
    title: "Onboarding commitment that quietly slips",
    scenario: "HR agent coordinates a new hire\u2019s onboarding. SSO access was committed for day 1 \u2014 it\u2019s day 4.",
    withMemory: "Manages the onboarding checklist. No tracking of commitments made verbally or in email.",
    withGenios: "Commitment extracted from kickoff email: SSO access by day 1. State graph: day 4, unresolved. Alert sent to IT lead with escalation flag.",
    theOneThing: "Memory manages the process. GeniOS tracks what was promised within it.",
    whyItMatters: "A new hire who can\u2019t log in on day 1 forms their first impression of the org in that moment.",
    impact: "100% of verbal and email onboarding commitments tracked to resolution.",
    graphs: "Precedent \u00b7 State",
  },
  { id: "h03", agentType: "hr", roles: ["hr","executive"], domains: ["hiring"],
    title: "Interview invite to a candidate who previously declined",
    scenario: "HR agent sends an interview invite to a senior candidate in the pipeline. That candidate declined a similar role 7 months ago.",
    withMemory: "Finds candidate in ATS as \u2018active\u2019. Sends invite. No recall of prior rejection.",
    withGenios: "Precedent graph: candidate declined a similar role 7 months ago \u2014 cited \u2018compensation range doesn\u2019t match expectations.\u2019 Recommends: re-engage with updated comp range first.",
    theOneThing: "Sending the same invite that was already declined tells the candidate you don\u2019t remember them.",
    whyItMatters: "Senior candidates talk. A careless re-invite signals a disorganized recruiting process.",
    impact: "100% of prior-decline candidates flagged before re-invitation is sent.",
    graphs: "Precedent \u00b7 State",
  },
  { id: "h04", agentType: "hr", roles: ["hr","executive"], domains: ["hiring"],
    title: "Benefits enrollment during a policy transition",
    scenario: "HR agent sends benefits enrollment emails. Enrollment policy changed 2 weeks ago \u2014 some options are no longer available.",
    withMemory: "Sends the enrollment communication based on the last known policy. No live update.",
    withGenios: "Authority graph: benefits policy updated 2 weeks ago \u2014 two plan options sunset. Enrollment email regenerated with current options before sending.",
    theOneThing: "An enrollment email with unavailable options creates confusion you have to personally undo.",
    whyItMatters: "HR credibility is built on getting the details right. Benefits is exactly the kind of detail that matters.",
    impact: "Policy-accurate enrollment communications in 100% of configured policy-update scenarios.",
    graphs: "Authority \u00b7 State",
  },
  { id: "h05", agentType: "hr", roles: ["hr","executive"], domains: ["hiring","strategy"],
    title: "Termination letter drafted during a legal hold",
    scenario: "HR agent drafts a termination letter for a performance-managed employee. There\u2019s an active legal hold on this case.",
    withMemory: "Drafts the letter based on the HR process. Legal hold exists in a separate system the agent never saw.",
    withGenios: "State graph: active legal hold on this employee case \u2014 flagged by Legal 6 days ago. Letter drafting paused. Legal team notified for review before proceeding.",
    theOneThing: "HR process can be perfect and still wrong if it doesn\u2019t know what Legal has flagged.",
    whyItMatters: "A termination during an active legal hold creates immediate legal exposure regardless of the HR rationale.",
    impact: "100% of employee actions cross-checked against active legal holds before execution.",
    graphs: "State \u00b7 Authority",
  },
  { id: "h06", agentType: "hr", roles: ["hr","founder"], domains: ["hiring"],
    title: "Job description with outdated salary range",
    scenario: "HR agent posts a new job description. The salary range listed is from a comp review 8 months ago \u2014 market has shifted.",
    withMemory: "Posts the job description as drafted. No live comp benchmarking or policy update detection.",
    withGenios: "State graph: comp review updated 6 weeks ago \u2014 market range for this role adjusted +14%. Job description flagged for comp range update before publishing.",
    theOneThing: "A posted salary range is a commitment. Outdated ranges waste everyone\u2019s time.",
    whyItMatters: "Candidates drop out at offer stage when salary expectations don\u2019t match the JD. That\u2019s 4\u20138 weeks of recruiting lost.",
    impact: "100% of job descriptions reviewed against current comp policy before publishing.",
    graphs: "Authority \u00b7 State",
  },
  { id: "h07", agentType: "hr", roles: ["hr","executive"], domains: ["hiring","strategy"],
    title: "Promotion announcement before manager approval",
    scenario: "HR agent sends an internal promotion announcement. The direct manager\u2019s approval was still pending.",
    withMemory: "Processes the announcement based on the HR workflow status. Manager approval was verbal, not logged.",
    withGenios: "Authority graph: promotion requires direct manager + VP HR written approval. Only one sign-off logged. Announcement paused, missing approval requested.",
    theOneThing: "A promotion announced before approval is approved is a management credibility problem.",
    whyItMatters: "Internal announcements are irreversible. Corrections damage both HR and manager credibility.",
    impact: "100% of internal HR announcements validated against required approval chain before sending.",
    graphs: "Authority \u00b7 State",
  },
  { id: "h08", agentType: "hr", roles: ["hr","executive"], domains: ["hiring"],
    title: "Background check initiated before verbal offer accepted",
    scenario: "HR agent initiates a background check immediately after an interview. The candidate hasn\u2019t received or accepted a verbal offer.",
    withMemory: "Follows the automated workflow trigger: interview complete \u2192 initiate background check.",
    withGenios: "State graph: candidate interview completed, but verbal offer not yet extended or accepted. Background check initiation flagged \u2014 premature by process definition.",
    theOneThing: "Automating the right step at the wrong stage creates legal and candidate experience risk.",
    whyItMatters: "Background checks before offer acceptance can constitute conditional employment issues depending on jurisdiction.",
    impact: "Process stage validation applied to 100% of HR workflow trigger points.",
    graphs: "State \u00b7 Authority",
  },
  { id: "h09", agentType: "hr", roles: ["hr","executive","founder"], domains: ["hiring","ops"],
    title: "Offer to a candidate already declined by the hiring manager",
    scenario: "HR agent advances a candidate to offer stage. The hiring manager had informally rejected them in a Slack thread.",
    withMemory: "ATS shows candidate as \u2018active\u2019. Advances to offer. Slack rejection not captured.",
    withGenios: "State graph: hiring manager sent rejection signal via Slack 4 days ago \u2014 flagged and cross-referenced. Candidate status updated before offer is generated.",
    theOneThing: "The ATS is a system of record. Slack is where decisions actually happen. GeniOS reads both.",
    whyItMatters: "Generating an offer after an informal rejection creates an awkward retraction that costs the candidate experience.",
    impact: "Cross-channel rejection signals captured and reflected in candidate state in real-time.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "h10", agentType: "hr", roles: ["hr","executive"], domains: ["hiring","strategy"],
    title: "Reference check sent to a manager with a known conflict",
    scenario: "HR agent sends a reference check request to a candidate\u2019s listed prior manager. That manager has a known professional dispute with the candidate.",
    withMemory: "Sends to listed references. No model of relationship dynamics between reference and candidate.",
    withGenios: "Relationship graph: prior manager has a documented conflict with this candidate \u2014 flagged in a prior hiring note. Recommends: use alternate reference, flag to hiring manager.",
    theOneThing: "A reference check to someone with a conflict isn\u2019t a reference check \u2014 it\u2019s a liability.",
    whyItMatters: "Biased references distort hiring decisions. The cost is a bad hire or an unfairly screened-out candidate.",
    impact: "Conflict-of-interest references flagged before check is sent in 100% of Relationship-graph-tracked cases.",
    graphs: "Relationship \u00b7 State",
  },

  // \u2500\u2500\u2500 OPERATIONS AGENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  { id: "o01", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","pipeline"],
    title: "Two agents targeting the same prospect",
    scenario: "Sales agent starts an outreach sequence. BD agent simultaneously targets the same company for partnerships.",
    withMemory: "Each agent operates from its own state. No shared model of org-wide in-flight actions.",
    withGenios: "State graph: active outreach sequence detected on this company. BD agent action held. Coordination signal sent to both agents and sales lead.",
    theOneThing: "Individual agent memory can\u2019t prevent two agents from colliding. Shared org state can.",
    whyItMatters: "A prospect contacted by two teams in one day questions whether you have any internal coordination.",
    impact: "Cross-agent action conflicts resolved before contact in 100% of detected cases.",
    graphs: "State \u00b7 All four graphs",
  },
  { id: "o02", agentType: "ops", roles: ["ops","executive"], domains: ["ops"],
    title: "Task assigned to a team member who left",
    scenario: "Operations agent assigns a time-sensitive task to a team member. That person offboarded 3 weeks ago.",
    withMemory: "Assigns based on org chart snapshot. No live model of who\u2019s still in the organization.",
    withGenios: "State graph: team member offboarded 3 weeks ago. Assignment redirected to active team lead. Delay: zero.",
    theOneThing: "An org chart is a snapshot. Your agents need a live model.",
    whyItMatters: "A task assigned to a ghost is a task that disappears. You find out when the deadline passes.",
    impact: "100% of task assignments validated against live headcount before routing.",
    graphs: "State \u00b7 Authority",
  },
  { id: "o03", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","finance"],
    title: "Vendor contract expiring without any alert",
    scenario: "A key vendor\u2019s contract has 14 days to run. Auto-renewal is active. No one has reviewed whether to renew.",
    withMemory: "No proactive contract monitoring unless explicitly programmed with renewal dates.",
    withGenios: "State graph: contract renewal window opens in 14 days. Usage signal: utilization down 40% vs. prior quarter. Precedent: 2 similar cases recommended non-renewal. Alert sent.",
    theOneThing: "Ops agents don\u2019t know what they don\u2019t monitor. GeniOS monitors continuously.",
    whyItMatters: "Once a contract auto-renews, you\u2019re committed for another year regardless of usage.",
    impact: "100% of contracts with active renewal windows surface in State graph alerts 14\u201330 days out.",
    graphs: "State \u00b7 Precedent",
  },
  { id: "o04", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","strategy"],
    title: "Workflow decision made without precedent check",
    scenario: "Operations agent recommends approving a custom SLA exception for a mid-market customer. 3 prior exceptions created unsustainable support burden.",
    withMemory: "Recommends based on current request and general playbook. No access to prior exception history.",
    withGenios: "Precedent graph: 3 prior custom SLA exceptions \u2014 all 3 resulted in above-average support cost. Recommendation adjusted: escalate to VP before approving.",
    theOneThing: "Without precedent, every exception feels like a one-off. GeniOS shows the pattern.",
    whyItMatters: "Exceptions that look reasonable individually can be catastrophic at scale. The pattern is always visible in hindsight.",
    impact: "Precedent-informed decisions reduce exception-related support burden by avg 34%.",
    graphs: "Precedent \u00b7 Authority",
  },
  { id: "o05", agentType: "ops", roles: ["ops","executive"], domains: ["ops"],
    title: "Agent operating on a 60-day-old org chart",
    scenario: "Operations agent routes an escalation to a team lead. That team lead moved to a new role 6 weeks ago.",
    withMemory: "Routes based on last known org structure. No mechanism to detect org chart drift.",
    withGenios: "State graph: team lead role changed 6 weeks ago. New owner identified from Slack signal and email pattern. Escalation re-routed to correct owner.",
    theOneThing: "An agent that acts on stale org structure isn\u2019t a misfire \u2014 it\u2019s a systematic misfiring machine.",
    whyItMatters: "Escalations that land with the wrong person don\u2019t just get delayed \u2014 they train people to ignore agent output.",
    impact: "Org chart accuracy maintained continuously \u2014 no manual update cycle required.",
    graphs: "State \u00b7 Authority",
  },
  { id: "o06", agentType: "ops", roles: ["ops","executive"], domains: ["ops","finance"],
    title: "Workflow triggered during a system freeze",
    scenario: "Operations agent triggers a data migration workflow. A system freeze was declared 2 days ago pending a security review.",
    withMemory: "Executes the workflow as scheduled. System freeze is in a Slack announcement the agent never saw.",
    withGenios: "State graph: system freeze active since 2 days ago \u2014 security review in progress. Workflow execution paused. Ops lead notified with freeze context.",
    theOneThing: "Scheduled workflows don\u2019t check if the org decided to freeze. GeniOS does.",
    whyItMatters: "A data migration during a security freeze can contaminate both the migration and the review.",
    impact: "100% of workflow executions validated against active state holds before triggering.",
    graphs: "State \u00b7 Authority",
  },
  { id: "o07", agentType: "ops", roles: ["ops","executive"], domains: ["ops"],
    title: "Report sent to an outdated distribution list",
    scenario: "Operations agent sends a weekly metrics report. Three people on the distribution list left the company last quarter.",
    withMemory: "Sends to stored distribution list. No live model of org membership.",
    withGenios: "State graph: 3 of 11 distribution list members offboarded in the last quarter. List updated before send. Active members only.",
    theOneThing: "Stale distribution lists are a data governance issue with external recipients.",
    whyItMatters: "Internal metrics reports sent to offboarded employees or external forwarding addresses are a security exposure.",
    impact: "Distribution list accuracy maintained continuously \u2014 no quarterly list-cleaning sprint.",
    graphs: "State \u00b7 Authority",
  },
  { id: "o08", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","strategy"],
    title: "Escalation routed to the wrong authority level",
    scenario: "Operations agent escalates a $50K vendor decision to a team lead. Policy requires VP-level approval above $25K.",
    withMemory: "Routes to team lead as per org chart. No live model of approval thresholds by decision type.",
    withGenios: "Authority graph: vendor decisions above $25K require VP approval per updated policy. Escalation re-routed to correct level with context bundle.",
    theOneThing: "Approval routing that ignores thresholds creates decisions that don\u2019t hold.",
    whyItMatters: "A decision approved at the wrong level has to be re-escalated. Every hour of that delay compounds.",
    impact: "100% of escalations validated against Authority graph thresholds before routing.",
    graphs: "Authority \u00b7 State",
  },
  { id: "o09", agentType: "ops", roles: ["ops","executive"], domains: ["ops","cs"],
    title: "SLA breach undetected across channels",
    scenario: "Operations agent monitors support SLA. A customer\u2019s issue was raised via email and Slack \u2014 only the ticket system is monitored.",
    withMemory: "Tracks tickets in the support system. Email and Slack threads are invisible.",
    withGenios: "State graph: same customer issue detected across 3 channels \u2014 ticket, email, and Slack. Total time since first signal: 5.2 days. SLA breached. CS lead notified immediately.",
    theOneThing: "SLA monitoring scoped to one system misses the breach happening in another.",
    whyItMatters: "Customers who raised an issue in 3 places and got no response don\u2019t stay customers.",
    impact: "Cross-channel SLA monitoring reduces missed breach detections by avg 67%.",
    graphs: "State \u00b7 Relationship",
  },
  { id: "o10", agentType: "ops", roles: ["ops","executive","founder"], domains: ["ops","strategy"],
    title: "Strategic recommendation with no institutional memory",
    scenario: "Operations agent recommends expanding into a new geography. Similar expansion was tried 18 months ago and failed for specific reasons.",
    withMemory: "Recommends based on current market data and general best practices. No access to prior attempt.",
    withGenios: "Precedent graph: geography expansion attempted 18 months ago \u2014 failed due to regulatory gap and local partner failure. Recommendation adjusted with specific risk flags from prior attempt.",
    theOneThing: "An organization that doesn\u2019t learn from its own history is condemned to repeat its own mistakes.",
    whyItMatters: "Repeating a failed expansion costs 2\u00d7 \u2014 once for the original failure, once for repeating it.",
    impact: "100% of strategic recommendations cross-referenced against precedent before surfacing.",
    graphs: "Precedent \u00b7 State \u00b7 Authority",
  },
];

const Applications = () => {
  const [roleId, setRoleId] = React.useState(null);
  const [agentTypeId, setAgentTypeId] = React.useState(null);
  const [domainId, setDomainId] = React.useState(null);
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

  const handleRole = (id) => { setRoleId(id); setAgentTypeId(null); setDomainId(null); setActiveIdx(0); };
  const handleAgent = (id) => { setAgentTypeId(id); setDomainId(null); setActiveIdx(0); };
  const handleDomain = (id) => { setDomainId(id); setActiveIdx(0); };

  return (
    <section
      id="applications"
      data-section data-label="\u00a7 \u00b7 EVERY ROLE \u00b7 EVERY DOMAIN \u00b7 ONE BRAIN" data-dark="false"
      className="sec-pad cream-card"
      style={{ padding: "clamp(60px,7vw,88px) 0", background: T.paper, position: "relative" }}
    >
      <Page>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
          <SectionLabel>By role \u00b7 By domain</SectionLabel>
          <h2 style={{ fontFamily: T.display, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.035em", color: T.ink, fontVariationSettings: "'opsz' 144, 'SOFT' 30", marginBottom: 18 }}>
            One context graph.<br />Every agent. <em className="em-wonk" style={{ color: T.brass }}>Zero blind spots.</em>
          </h2>
          <p style={{ fontSize: 15, color: T.ink3, lineHeight: 1.7, fontWeight: 300 }}>
            Pick your role, agent type, and domain \u2014 GeniOS surfaces exactly what changes.
          </p>
        </div>

        {/* Step 1 */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>01</span>
            <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.ink, flexShrink: 0 }}>Who are you?</span>
            <div style={{ flex: 1, height: "0.5px", background: T.line }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {APP_ROLES.map(r => {
              const active = roleId === r.id;
              return (
                <button key={r.id} onClick={() => handleRole(r.id)}
                  style={{ padding: "10px 24px", fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", background: active ? T.ink : "transparent", color: active ? T.paper : T.stone, border: `0.5px solid ${active ? T.ink : T.line}`, cursor: "pointer", transition: "all .2s ease", borderRadius: 2 }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = T.ink2; e.currentTarget.style.color = T.ink; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.stone; } }}
                >{r.label}</button>
              );
            })}
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ marginBottom: 36, opacity: roleId ? 1 : 0.3, pointerEvents: roleId ? "auto" : "none", transition: "opacity .3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>02</span>
            <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.ink, flexShrink: 0 }}>What agent type are you using?</span>
            <div style={{ flex: 1, height: "0.5px", background: T.line }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {APP_AGENT_TYPES.map(a => {
              const active = agentTypeId === a.id;
              return (
                <button key={a.id} onClick={() => handleAgent(a.id)}
                  style={{ padding: "10px 18px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: active ? T.brass : "transparent", color: active ? "#fff" : T.stone, border: `0.5px solid ${active ? T.brass : T.line}`, cursor: "pointer", transition: "all .2s ease", borderRadius: 2, textAlign: "center", minWidth: 110 }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = T.brass; e.currentTarget.style.color = T.brass; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.stone; } }}
                >
                  <span style={{ display: "block" }}>{a.label}</span>
                  <span style={{ display: "block", fontSize: 8, opacity: 0.6, marginTop: 2, letterSpacing: "0.08em" }}>{a.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ marginBottom: 52, opacity: agentTypeId ? 1 : 0.3, pointerEvents: agentTypeId ? "auto" : "none", transition: "opacity .3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: T.brass, flexShrink: 0 }}>03</span>
            <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.ink, flexShrink: 0 }}>What\u2019s your working domain?</span>
            <div style={{ flex: 1, height: "0.5px", background: T.line }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {APP_DOMAINS.map(d => {
              const active = domainId === d.id;
              return (
                <button key={d.id} onClick={() => handleDomain(d.id)}
                  style={{ padding: "10px 22px", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: active ? T.ink : "transparent", color: active ? T.paper : T.stone, border: `0.5px solid ${active ? T.ink : T.line}`, cursor: "pointer", transition: "all .2s ease", borderRadius: 2 }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.color = T.ink; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.stone; } }}
                >{d.label}</button>
              );
            })}
          </div>
        </div>

        {/* Empty state */}
        {!allSelected && (
          <div style={{ textAlign: "center", padding: "36px 0 0", fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.28em", textTransform: "uppercase", color: T.stone, opacity: 0.45 }}>
            Complete the three steps above \u2014 your matched scenarios will appear here
          </div>
        )}

        {/* Scenarios panel */}
        {allSelected && ranked.length > 0 && (
          <div className="app-stage" style={{ display: "grid", gridTemplateColumns: "minmax(200px,260px) 1fr", background: T.paper, border: `0.5px solid ${T.ink}`, boxShadow: "0 40px 80px -44px rgba(16,35,42,0.32), 0 8px 24px -12px rgba(16,35,42,0.12)", position: "relative", overflow: "hidden" }}>

            {/* Left rail — scenario list */}
            <aside className="app-rail" style={{ background: T.ink, color: T.paper, padding: "28px 0", position: "relative", borderRight: "0.5px solid rgba(242,236,228,0.08)" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `linear-gradient(${T.paper} 0.5px, transparent 0.5px), linear-gradient(90deg, ${T.paper} 0.5px, transparent 0.5px)`, backgroundSize: "24px 24px" }} />
              <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: `linear-gradient(180deg, ${T.brass} 0%, rgba(215,90,51,0) 65%)` }} />
              <div style={{ position: "relative", padding: "0 clamp(12px,1.8vw,18px)" }}>
                <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,236,228,0.3)", marginBottom: 16 }}>
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
                        <span style={{ fontFamily: T.mono, fontSize: 9, color: isActive ? T.brass : "rgba(242,236,228,0.25)", flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontFamily: T.serif, fontSize: 12.5, color: isActive ? T.paper : "rgba(242,236,228,0.52)", lineHeight: 1.4 }}>{sc.title}</span>
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

                {/* Memory vs GeniOS */}
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
                    {scenario.graphs.split(" \u00b7 ").map(g => (
                      <span key={g} style={{ fontFamily: T.mono, fontSize: 9, color: T.brass, display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.brass, display: "inline-block" }} />{g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Page>

      <style dangerouslySetInnerHTML={{ __html: "@media(max-width:900px){.app-stage{grid-template-columns:1fr!important}.app-rail{max-height:260px;overflow-y:auto}.app-split{grid-template-columns:1fr!important}}" }} />
    </section>
  );
};
"""

result = content[:si] + new_section + '\n' + content[ei:]

with open('src/DemoNavy.jsx', 'w', encoding='utf-8') as f:
    f.write(result)

print(f"Done! File written successfully.")
