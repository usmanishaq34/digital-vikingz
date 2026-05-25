'use client';

import { useState } from 'react';

export default function Page() {
  const [calendarState, setCalendarState] = useState<'building' | 'complete'>('building');

  return (
    <main className="dv-clean-page">



<nav style={{background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "relative", zIndex: "1000"}}>
<div className="wrap">
<div style={{display: "flex", alignItems: "center", justifyContent: "space-between", height: "62px"}}>

<a href="/" id="logoLink" className="logo" style={{display: "flex", alignItems: "center", gap: "8px", textDecoration: "none"}}>
<img id="logoImg" src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{height: "42px", width: "auto"}} />
<span style={{fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: "600", color: "#111"}}>Digital Vikingz</span>
</a>

<ul id="navLinks" style={{display: "flex", alignItems: "center", listStyle: "none", margin: "0", padding: "0", gap: "0"}}>
<li><a id="link-om" href="/operating-manual" className="nav-link-item">Operating Manual</a></li>
<li><a id="link-bp" href="/build-process" className="nav-link-item">Build Process</a></li>
<li><a id="link-vp" href="/vertical-playbooks" className="nav-link-item">Vertical Playbooks</a></li>

<li style={{position: "relative"}} id="servicesDropdown">
<a href="#" id="servicesToggle" className="nav-link-item" style={{color: "#C4401A", gap: "4px"}}>
            Services
            <svg id="serviceChevron" style={{width: "10px", height: "10px", transition: "transform 0.2s", opacity: "0.7", flexShrink: "0"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
<polyline points="6 9 12 15 18 9"></polyline>
</svg>
</a>
<div id="megaMenu" style={{position: "absolute", top: "100%", left: "-20px", width: "580px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderTop: "2px solid rgba(0,0,0,0.05)", boxShadow: "0 12px 40px rgba(0,0,0,0.09)", opacity: "0", pointerEvents: "none", transform: "translateY(-4px)", transition: "opacity 0.18s ease,transform 0.18s ease", zIndex: "999"}}>
<div className="mega-grid-inner" style={{display: "grid", gridTemplateColumns: "1fr 1fr", padding: "24px 28px 26px", gap: "0 40px"}}>

<div>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px"}}>Claim Tier</div>
<ul style={{listStyle: "none", margin: "0 0 20px 0", padding: "0"}}>
<li>
<a data-svc="semantic-seo-architecture" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>Semantic SEO Architecture</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>12-month authority blueprint</div>
</a>
</li>
<li>
<a data-svc="semantic-content-audit" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>Semantic Content Audit</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>Diagnostic foundation · $2000</div>
</a>
</li>
</ul>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px"}}>Scale Tier</div>
<ul style={{listStyle: "none", margin: "0", padding: "0"}}>
<li>
<a data-svc="semantic-content-production" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>Semantic Content Production</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>Execute at velocity</div>
</a>
</li>
<li>
<a data-svc="pipeline-attribution-seo" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>Pipeline Attribution SEO</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>SEO tied to pipeline</div>
</a>
</li>
</ul>
</div>

<div>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px"}}>Shield Tier</div>
<ul style={{listStyle: "none", margin: "0", padding: "0"}}>
<li>
<a data-svc="llm-ai-search-visibility" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>LLM & AI Search Visibility</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>Get cited by AI search</div>
</a>
</li>
<li>
<a data-svc="authority-link-building" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>Authority Link Building</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>Methodology-grade links</div>
</a>
</li>
<li>
<a data-svc="semantic-content-network" className="svc-link" href="#" style={{textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none"}}>
<div style={{fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px"}}>Semantic Content Network</div>
<div style={{fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3"}}>External authority distribution</div>
</a>
</li>
</ul>
</div>
</div>
</div>
</li>
<li><a id="link-audit" href="/the-audit" className="nav-link-item">The Audit</a></li>
<li>
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" style={{fontFamily: "'Inter',sans-serif", background: "#db4c23", color: "#fff", borderRadius: "5px", fontWeight: "700", fontSize: "13px", padding: "9px 20px", letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", marginLeft: "10px", display: "inline-block"}}>
            Book Strategy Call
          </a>
</li>
</ul>
<button id="menuBtn" style={{display: "none", cursor: "pointer", background: "none", border: "1px solid #ddd", fontFamily: "'Inter',sans-serif", fontSize: "14px", padding: "7px 16px", borderRadius: "6px", fontWeight: "500", color: "#333"}}>Menu</button>
</div>
</div>
</nav>


<header className="hero">
<div className="hero-grid-bg"></div>
<div className="semantic-graph-bg" aria-hidden="true">
<svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<g>
<line className="graph-line" x1="200" y1="180" x2="500" y2="320"></line>
<line className="graph-line" x1="500" y1="320" x2="800" y2="200"></line>
<line className="graph-line" x1="800" y1="200" x2="1100" y2="350"></line>
<line className="graph-line" x1="1100" y1="350" x2="1250" y2="600"></line>
<line className="graph-line" x1="500" y1="320" x2="700" y2="550"></line>
<line className="graph-line" x1="700" y1="550" x2="950" y2="650"></line>
<line className="graph-line" x1="950" y1="650" x2="1100" y2="350"></line>
<line className="graph-line-2" x1="200" y1="180" x2="700" y2="550"></line>
<line className="graph-line-2" x1="800" y1="200" x2="950" y2="650"></line>
</g>
<g>
<circle className="graph-node-ring" cx="200" cy="180" r="4" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node" cx="200" cy="180" r="3" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node-ring" cx="500" cy="320" r="5" style={{animationDelay: "0.8s"}}></circle>
<circle className="graph-node" cx="500" cy="320" r="4" style={{animationDelay: "0.8s"}}></circle>
<circle className="graph-node-ring" cx="800" cy="200" r="5" style={{animationDelay: "1.6s"}}></circle>
<circle className="graph-node" cx="800" cy="200" r="4" style={{animationDelay: "1.6s"}}></circle>
<circle className="graph-node-ring" cx="1100" cy="350" r="5" style={{animationDelay: "2.4s"}}></circle>
<circle className="graph-node" cx="1100" cy="350" r="4" style={{animationDelay: "2.4s"}}></circle>
<circle className="graph-node-ring" cx="700" cy="550" r="4" style={{animationDelay: "3.2s"}}></circle>
<circle className="graph-node" cx="700" cy="550" r="3" style={{animationDelay: "3.2s"}}></circle>
<circle className="graph-node-ring" cx="950" cy="650" r="4" style={{animationDelay: "4s"}}></circle>
<circle className="graph-node" cx="950" cy="650" r="3" style={{animationDelay: "4s"}}></circle>
<circle className="graph-node-ring" cx="1250" cy="600" r="3" style={{animationDelay: "4.8s"}}></circle>
<circle className="graph-node" cx="1250" cy="600" r="2" style={{animationDelay: "4.8s"}}></circle>
</g>
<g>
<text className="graph-label" x="170" y="160" style={{animationDelay: "0s"}}>Discovery</text>
<text className="graph-label" x="450" y="300" style={{animationDelay: "1s"}}>Audit</text>
<text className="graph-label" x="755" y="180" style={{animationDelay: "2s"}}>Architecture</text>
<text className="graph-label" x="1050" y="330" style={{animationDelay: "3s"}}>Production</text>
<text className="graph-label" x="640" y="530" style={{animationDelay: "4s"}}>Distribution</text>
<text className="graph-label" x="900" y="630" style={{animationDelay: "5s"}}>Attribution</text>
</g>
</svg>
</div>
<div className="wrap">
<div className="hero-breadcrumb">
<a href="https://digitalvikingz.com">Home</a>
<span className="hero-breadcrumb-sep">/</span>
<span className="hero-breadcrumb-current">The Build Process</span>
</div>
<h1 className="h-display hero-h1">
      The operational walkthrough of a <em>semantic SEO build.</em>
</h1>
<p className="hero-sub">
      This page is for prospects who already understand <strong>what</strong> Digital Vikingz does and want to know <strong>how the engagement actually runs</strong> — phase by phase, deliverable by deliverable, decision by decision. No marketing language. No vague promises. The mechanics of the build.
    </p>
<div className="hero-meta-line">
<div className="hero-meta-line-item">5 sequenced stages</div>
<div className="hero-meta-line-item">6–18 month engagements</div>
<div className="hero-meta-line-item">Weekly cadence</div>
<div className="hero-meta-line-item">Architecture-first</div>
</div>
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book a 30-Min Strategy Call <span className="btn-arrow"></span></a>
</div>
</header>

<section className="section paths">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">01 / Engagement Paths</span>
<h2 className="h-display section-h2">Two ways to start. <em>One ends in architecture.</em></h2>
</div>
<p className="section-intro">
        Engagements with Digital Vikingz begin one of two ways — depending on whether your business already has clarity on the topical direction or needs the diagnostic layer first. Both paths converge on the same destination: a <strong>semantic SEO architecture</strong> your business owns.
      </p>
</div>
<div className="paths-grid">
<div className="path-card recommended">
<div className="path-card-head">
<span className="path-card-tag">Path 01 · Audit-First</span>
<h3 className="path-card-title">Start with the <em>Semantic Audit.</em></h3>
<p className="path-card-desc">A fixed-scope diagnostic that evaluates your existing site against entity coverage, predicate consistency, semantic dilution, and AI citation readiness. Becomes the foundation of an architecture engagement — or a roadmap your internal team executes.</p>
</div>
<div className="path-card-body">
<div>
<span className="path-fits-label">Fits if you</span>
<ul className="path-fits-list">
<li>Have an existing site with content already published</li>
<li>Suspect rankings have flatlined or reset after updates</li>
<li>Need a written deliverable before committing to a longer engagement</li>
<li>Want diagnostic data to bring to internal stakeholders</li>
</ul>
</div>
</div>
</div>
<div className="path-card">
<div className="path-card-head">
<span className="path-card-tag">Path 02 · Direct Architecture</span>
<h3 className="path-card-title">Skip the audit. Go to <em>build.</em></h3>
<p className="path-card-desc">For businesses with clear topical direction and existing diagnostic data — internal SEO reports, prior agency audits, or strong baseline understanding. The engagement begins directly at architecture, accelerating the initial rollout phase without redundant discovery overhead.</p>
</div>
<div className="path-card-body">
<div>
<span className="path-fits-label">Fits if you</span>
<ul className="path-fits-list">
<li>Are launching a new site or new content vertical</li>
<li>Already have a diagnostic SEO audit completed elsewhere</li>
<li>Have internal clarity on the Central Entity and category</li>
<li>Need to move from strategy to build without diagnostic delay</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="section stages">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">02 / The Five Stages</span>
<h2 className="h-display section-h2">Each stage <em>earns the next.</em></h2>
</div>
<p className="section-intro">
        The engagement is sequenced — not modular. You can't skip stages, and stages don't run in parallel. Each one produces a structural foundation the next stage depends on. This is what separates compounding authority work from ad-hoc tactical work that resets every quarter.
      </p>
</div>

<div className="stage-block">
<div className="stage-header">
<div className="stage-num-block">
<span className="stage-num-label">Stage</span>
<span className="stage-num-value">01</span>
</div>
<div className="stage-title-block">
<h3 className="stage-title">Semantic Audit</h3>
<div className="stage-tagline">Diagnostic Layer</div>
<p className="stage-summary">Before architecture is designed, the site is evaluated against the structural standards that determine ranking, AI citation, and authority compounding. The output is a <strong>prioritized issue map</strong> that informs every architectural decision in Stage 02.</p>
</div>
</div>
<div className="stage-grid">
<div className="stage-panel">
<span className="stage-panel-label">What gets diagnosed</span>
<h4>Operational checks</h4>
<ul>
<li>Central Entity clarity and definition strength</li>
<li>Predicate consistency across pages and clusters</li>
<li>Source Term Vector drift — vocabulary fragmentation</li>
<li>Semantic dilution from off-topic or thin content</li>
<li>AI citation readiness — how LLMs currently see the site</li>
<li>Technical entity infrastructure (schema, internal linking, hierarchy)</li>
<li>Competitive entity positioning relative to category leaders</li>
</ul>
</div>
<div className="stage-panel">
<span className="stage-panel-label">What you receive</span>
<h4>Stage 01 deliverables</h4>
<ul>
<li>Semantic Audit Report (DOCX, 25–40 pages depending on site scale)</li>
<li>Prioritized Issue Map with severity scoring</li>
<li>Entity Coverage Heatmap across the existing topical map</li>
<li>AI Visibility Diagnostic — current citation status across LLMs</li>
<li>Technical SEO Diagnostic Summary</li>
<li>Recommended next-stage scope (architecture or remediation)</li>
<li>Live walkthrough call covering findings and recommendations</li>
</ul>
</div>
</div>
<div className="stage-outcome-banner">
<span className="stage-outcome-banner-label">Outcome of Stage 01</span>
<div className="stage-outcome-banner-text">A complete written diagnostic that either becomes the foundation of an architecture engagement, <em>or a roadmap your internal team can execute alone.</em></div>
</div>
</div>

<div className="stage-block">
<div className="stage-header">
<div className="stage-num-block">
<span className="stage-num-label">Stage</span>
<span className="stage-num-value">02</span>
</div>
<div className="stage-title-block">
<h3 className="stage-title">Architecture</h3>
<div className="stage-tagline">Strategic Foundation</div>
<p className="stage-summary">The structural blueprint is built. Topical map, entity inventory, Source Term Vector, and the 12-month publishing roadmap are designed and locked before any production work begins. This is where most agencies skip ahead — and why most agency work fails to compound.</p>
</div>
</div>
<div className="stage-grid">
<div className="stage-panel">
<span className="stage-panel-label">What gets built</span>
<h4>Architecture components</h4>
<ul>
<li>Central Entity definition and supporting attribute matrix</li>
<li>Topical map — clusters, pillars, supporting nodes, query coverage</li>
<li>Source Term Vector specification — vocabulary governance</li>
<li>Predicate framework — relationship logic between entities</li>
<li>Internal linking architecture and anchor text governance</li>
<li>12-month publishing roadmap with sequenced priorities</li>
<li>Technical entity infrastructure spec (schema, structured data, hierarchy)</li>
</ul>
</div>
<div className="stage-panel">
<span className="stage-panel-label">What you receive</span>
<h4>Stage 02 deliverables</h4>
<ul>
<li>Architecture Blueprint Document (DOCX, 40–80 pages)</li>
<li>Visual topical map (interactive, exportable)</li>
<li>Entity inventory and attribute coverage matrix</li>
<li>Publishing roadmap with month-by-month sequence</li>
<li>Technical SEO implementation specification</li>
<li>Editorial governance manual — banned phrases, voice, predicates</li>
<li>Architecture handoff session with stakeholders</li>
</ul>
</div>
</div>
<div className="stage-outcome-banner">
<span className="stage-outcome-banner-label">Outcome of Stage 02</span>
<div className="stage-outcome-banner-text">Your business owns a structural blueprint that <em>guides every content decision for the next 12+ months</em> — whether executed by us, by your internal team, or both.</div>
</div>
</div>

<div className="stage-block">
<div className="stage-header">
<div className="stage-num-block">
<span className="stage-num-label">Stage</span>
<span className="stage-num-value">03</span>
</div>
<div className="stage-title-block">
<h3 className="stage-title">Production</h3>
<div className="stage-tagline">The Execution Engine</div>
<p className="stage-summary">Architecture becomes content. Briefs, writing, on-page configuration, internal linking, and publishing run in disciplined cycles — every output governed by the topical map and Source Term Vector. Production is the longest stage and runs in parallel with Stages 04 and 05.</p>
</div>
</div>
<div className="stage-grid">
<div className="stage-panel">
<span className="stage-panel-label">Weekly production cycle</span>
<h4>How a production week runs</h4>
<ul>
<li>Day 1 — brief queue review, priority alignment, writer assignments</li>
<li>Day 2 — long-form content writing in production</li>
<li>Day 3 — editorial QA, predicate-cleanup, entity-reinforcement check</li>
<li>Day 4 — on-page configuration, internal linking, publishing</li>
<li>On Going — Source Term Vector enforcement, banned-phrase governance</li>
</ul>
</div>
<div className="stage-panel">
<span className="stage-panel-label">What you receive</span>
<h4>Stage 03 deliverables</h4>
<ul>
<li>Weekly content production aligned to the publishing roadmap</li>
<li>Brief documents for every published piece (entity-aligned)</li>
<li>On-page SEO configuration applied at publish</li>
<li>Internal linking implementation across the cluster</li>
<li>Weekly production report with publishing log</li>
<li>Monthly editorial review and direction adjustment</li>
</ul>
</div>
</div>
<div className="stage-outcome-banner">
<span className="stage-outcome-banner-label">Outcome of Stage 03</span>
<div className="stage-outcome-banner-text">Content output that <em>compounds topical authority every cycle</em> — instead of producing isolated articles that rank briefly and lose ground after the next algorithm update.</div>
</div>
</div>

<div className="stage-block">
<div className="stage-header">
<div className="stage-num-block">
<span className="stage-num-label">Stage</span>
<span className="stage-num-value">04</span>
</div>
<div className="stage-title-block">
<h3 className="stage-title">Distribution</h3>
<div className="stage-tagline">Authority Reinforcement</div>
<p className="stage-summary">Content alone doesn't make an entity authoritative. Distribution engineers entity recognition <strong>across the open web</strong> — through link acquisition, third-party citations, AI search optimization, and external authority signals that reinforce the Central Entity beyond your own domain.</p>
</div>
</div>
<div className="stage-grid">
<div className="stage-panel">
<span className="stage-panel-label">Distribution channels</span>
<h4>Where authority gets reinforced</h4>
<ul>
<li>Authority link acquisition from entity-aligned domains</li>
<li>Guest publication placements on topical authority sites</li>
<li>Third-party citation engineering — co-occurrence with entity</li>
<li>AI citation optimization for ChatGPT, Perplexity, Claude, Gemini</li>
<li>Schema and structured data reinforcement across the open web</li>
<li>Brand entity recognition signals (Wikipedia, Wikidata where applicable)</li>
</ul>
</div>
<div className="stage-panel">
<span className="stage-panel-label">What you receive</span>
<h4>Stage 04 deliverables</h4>
<ul>
<li>Monthly link acquisition report (placements, anchor distribution)</li>
<li>Guest publication tracker with topical relevance scoring</li>
<li>AI visibility diagnostic — citation tracking across LLMs</li>
<li>Quarterly entity reinforcement summary</li>
<li>Co-occurrence and brand mention analysis</li>
</ul>
</div>
</div>
<div className="stage-outcome-banner">
<span className="stage-outcome-banner-label">Outcome of Stage 04</span>
<div className="stage-outcome-banner-text">Your entity is recognized <em>across the open web and inside AI search systems</em> — not just on your own site. This is the layer where competitive authority becomes structurally defensible.</div>
</div>
</div>

<div className="stage-block">
<div className="stage-header">
<div className="stage-num-block">
<span className="stage-num-label">Stage</span>
<span className="stage-num-value">05</span>
</div>
<div className="stage-title-block">
<h3 className="stage-title">Attribution</h3>
<div className="stage-tagline">Pipeline-Level Reporting</div>
<p className="stage-summary">SEO output is connected to revenue — not impressions, not clicks, not vanity rankings. Attribution runs from week one of production and reports quarterly on the line tying organic traffic to qualified pipeline. If the work isn't producing pipeline, this is where we see it first.</p>
</div>
</div>
<div className="stage-grid">
<div className="stage-panel">
<span className="stage-panel-label">What gets measured</span>
<h4>The attribution model</h4>
<ul>
<li>Query-level traffic mapped to buyer intent stages</li>
<li>Cluster-level performance across the topical map</li>
<li>Conversion path tracking from entry query to qualified pipeline</li>
<li>AI citation contribution to high-intent traffic</li>
<li>Entity authority signals over time (rankings, citations, mentions)</li>
<li>ROI calculation against engagement investment</li>
</ul>
</div>
<div className="stage-panel">
<span className="stage-panel-label">What you receive</span>
<h4>Stage 05 deliverables</h4>
<ul>
<li>Monthly performance report with cluster-level attribution</li>
<li>Quarterly pipeline attribution analysis</li>
<li>Conversion path documentation for top-performing queries</li>
<li>AI citation impact summary</li>
<li>Annual ROI report tied to business outcomes</li>
<li>Strategic adjustment recommendations based on data</li>
</ul>
</div>
</div>
<div className="stage-outcome-banner">
<span className="stage-outcome-banner-label">Outcome of Stage 05</span>
<div className="stage-outcome-banner-text">SEO output justifies itself in <em>pipeline numbers, not impression charts.</em> Every quarter the work either earns its budget — or you have the data to make an informed decision.</div>
</div>
</div>
</div>
</section>

<section className="section calendar">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">03 / The Build Calendar</span>
<h2 className="h-display section-h2">What happens, <em>1st phase to 12th phase.</em></h2>
</div>
<p className="section-intro">
        The first 12 phases of an Audit-First engagement, mapped at a granular level. Production and Distribution continue beyond this window in monthly cycles. The calendar below has <strong>two states</strong>: a representative engagement at <strong>Phase 05 (mid-build)</strong>, and the same engagement at <strong>completion</strong>. Toggle to see both.
      </p>
</div>
<div className="live-calendar" id="liveCalendar" data-state={calendarState}>

<div className="lc-header">
<div className="lc-header-left">
<span className="lc-pill">
{calendarState === 'building' ? 'Live · Phase 05 of 12' : 'Cycle Closed · 12 / 12'}
</span>
<span className="lc-title">
{calendarState === 'building' ? (
  <>Active engagement: <strong>SaaS workflow automation · Topical Map under construction</strong></>
) : (
  <>Engagement complete: <strong>blueprint shipped · production live · distribution active</strong></>
)}
</span>
</div>
<button
  type="button"
  className="lc-toggle-btn"
  onClick={() => setCalendarState(s => s === 'building' ? 'complete' : 'building')}
  aria-label="Toggle between mid-build and complete states"
>
<span className="lc-toggle-dot"></span>
{calendarState === 'building' ? 'See completion' : 'Back to live'}
</button>
</div>

<div className="lc-body">

<div className="lc-week is-milestone is-past">
<div className="lc-week-num">Phase 01</div>
<div className="lc-week-action">
<div className="lc-week-title">Discovery & Kickoff</div>
<div className="lc-week-detail">Stakeholder alignment · access provisioning (GSC, GA4, CMS) · stakeholder interviews · scope confirmation.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>✓ Complete</span>
</div>
</div>

<div className="lc-week is-past">
<div className="lc-week-num">Phase 02</div>
<div className="lc-week-action">
<div className="lc-week-title">Audit Diagnostics Begin</div>
<div className="lc-week-detail">Entity coverage analysis · predicate consistency review · technical SEO diagnostic · AI citation visibility check · competitive positioning.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>✓ Complete</span>
</div>
</div>

<div className="lc-week is-past">
<div className="lc-week-num">Phase 03</div>
<div className="lc-week-action">
<div className="lc-week-title">Audit Synthesis & Walkthrough</div>
<div className="lc-week-detail">Findings synthesized into prioritized issue map · live walkthrough call · decision point — proceed to architecture or close with roadmap.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>✓ Complete</span>
</div>
</div>

<div className="lc-week is-milestone is-past">
<div className="lc-week-num">Phase 04</div>
<div className="lc-week-action">
<div className="lc-week-title">Architecture Begins · Central Entity</div>
<div className="lc-week-detail">Central Entity defined · attribute matrix built · supporting concepts mapped. Foundation locked before topical work begins.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>✓ Complete</span>
</div>
</div>

<div className="lc-week is-active">
<div className="lc-week-num">Phase 05</div>
<div className="lc-week-action">
<div className="lc-week-title">Topical Map Construction</div>
<div className="lc-week-detail">Cluster design · pillar identification · supporting node mapping · query path coverage planning. <strong>Currently active.</strong></div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '▸ In progress' : '✓ Complete'}</span>
</div>
</div>

<div className="lc-week is-future">
<div className="lc-week-num">Phase 06</div>
<div className="lc-week-action">
<div className="lc-week-title">Source Term Vector & Predicate Framework</div>
<div className="lc-week-detail">Vocabulary governance specification · predicate logic between entities · banned-phrase registry · voice and tone documentation.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Queued' : '✓ Complete'}</span>
</div>
</div>

<div className="lc-week is-future">
<div className="lc-week-num">Phase 07</div>
<div className="lc-week-action">
<div className="lc-week-title">Internal Linking & Technical Spec</div>
<div className="lc-week-detail">Internal linking architecture · schema and structured data plan · hierarchy and URL structure · technical SEO implementation spec.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Queued' : '✓ Complete'}</span>
</div>
</div>

<div className="lc-week is-future">
<div className="lc-week-num">Phase 08</div>
<div className="lc-week-action">
<div className="lc-week-title">Publishing Roadmap</div>
<div className="lc-week-detail">12-month publishing sequence · priority scoring · content velocity calibration · capacity alignment with internal team.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Queued' : '✓ Complete'}</span>
</div>
</div>

<div className="lc-week is-future">
<div className="lc-week-num">Phase 09</div>
<div className="lc-week-action">
<div className="lc-week-title">Architecture QA & Documentation</div>
<div className="lc-week-detail">Internal review · architecture document compilation · editorial governance manual finalized · visual topical map exported.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Queued' : '✓ Complete'}</span>
</div>
</div>

<div className="lc-week is-milestone is-future">
<div className="lc-week-num">Phase 10</div>
<div className="lc-week-action">
<div className="lc-week-title">Architecture Handoff</div>
<div className="lc-week-detail">Live handoff session · blueprint, governance manual, roadmap delivered · decision point — proceed to production with us, or execute internally.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Milestone' : '✓ Handed off'}</span>
</div>
</div>

<div className="lc-week is-future">
<div className="lc-week-num">Phase 11</div>
<div className="lc-week-action">
<div className="lc-week-title">Production Cycle 01 Begins</div>
<div className="lc-week-detail">Brief generation for Cycle 01 priorities · writer onboarding · editorial QA workflow activation · first content batch enters production.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Queued' : '✓ Live'}</span>
</div>
</div>

<div className="lc-week is-milestone is-future">
<div className="lc-week-num">Phase 12+</div>
<div className="lc-week-action">
<div className="lc-week-title">Continuous Production · Distribution · Attribution</div>
<div className="lc-week-detail">Weekly production cycles · monthly link acquisition · quarterly attribution reports. Engagement runs in this rhythm for 6–18 months.</div>
</div>
<div className="lc-week-status">
<span className="lc-week-status-dot"></span>
<span>{calendarState === 'building' ? '○ Continuous' : '✓ Sustained'}</span>
</div>
</div>
</div>

{calendarState === 'complete' && (
<div className="lc-outcome-banner">
<span className="lc-outcome-tag">Engagement complete · representative outcome · 14-month cycle</span>
<div className="lc-outcome-text">All 12 phases cleared · <strong>blueprint shipped at Phase 10</strong> · production live by Phase 11 · 84 entity-clean nodes shipped · 247 AI citations earned across GPT, Perplexity, Gemini · pipeline attribution mapped quarter over quarter.</div>
</div>
)}

<div className="lc-foot">
<span className="lc-foot-text">
{calendarState === 'building' ? (
  <>Live engagement · <strong>Phase 05 of 12</strong> · Topical Map under construction</>
) : (
  <>Build complete · <strong>cycle closed</strong> · production runs in continuous monthly rhythm</>
)}
</span>
<div className="lc-foot-meter">
<span className="lc-foot-meter-label">Progress</span>
<div className="lc-foot-meter-bar">
<div className="lc-foot-meter-fill"></div>
</div>
<span className="lc-foot-meter-num">
{calendarState === 'building' ? '5 / 12' : '12 / 12'}
</span>
</div>
</div>
</div>
</div>
</section>

<section className="section deliverables">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">04 / Deliverable Inventory</span>
<h2 className="h-display section-h2">Every artifact you receive, <em>named.</em></h2>
</div>
<p className="section-intro">
        Most agencies are vague about deliverables. We're not. Below is the complete inventory of artifacts produced during a full engagement — what they are, what format they ship in, and what your business does with each one. Every artifact you pay for ends up in your hands as a permanent asset.
      </p>
</div>
<div className="deliverables-grid">
<div className="deliverable-card">
<div className="deliverable-icon">01</div>
<div className="deliverable-format">DOCX · 25–40 PAGES</div>
<h4>Semantic Audit Report</h4>
<p>The diagnostic foundation. Entity coverage, predicate consistency, semantic dilution, AI citation gaps, technical SEO issues. Prioritized and severity-scored.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">02</div>
<div className="deliverable-format">DOCX · 40–80 PAGES</div>
<h4>Architecture Blueprint</h4>
<p>The structural plan for 12+ months of content. Central Entity definition, topical map, Source Term Vector, predicate framework, technical specification.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">03</div>
<div className="deliverable-format">VISUAL · INTERACTIVE</div>
<h4>Topical Map</h4>
<p>Visual representation of clusters, pillars, supporting content, and query coverage. Exportable as PDF, image, and editable diagram for internal sharing.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">04</div>
<div className="deliverable-format">DOCX · GOVERNANCE</div>
<h4>Editorial Manual</h4>
<p>Voice, tone, banned-phrase registry, predicate guidelines, on-page rules. Used by every writer touching the site — internal or external — to maintain consistency.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">05</div>
<div className="deliverable-format">SHEET · ROADMAP</div>
<h4>Publishing Roadmap</h4>
<p>12-month sequence of content priorities mapped to clusters, with velocity calibration, dependency tracking, and capacity alignment.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">06</div>
<div className="deliverable-format">DOCX · PER-PIECE</div>
<h4>Content Briefs</h4>
<p>One brief per published asset. Entity-aligned, predicate-clean, with information-gain requirements, target queries, and internal linking instructions.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">07</div>
<div className="deliverable-format">PUBLISHED · ON-SITE</div>
<h4>Long-Form Content</h4>
<p>The actual content production output — service pages, blog posts, comparison guides, location pages, whatever the architecture calls for, delivered ready-to-publish.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">08</div>
<div className="deliverable-format">REPORT · WEEKLY</div>
<h4>Production Reports</h4>
<p>Weekly logs of what was published, what's in QA, what's in brief, and where the program stands against the roadmap.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">09</div>
<div className="deliverable-format">REPORT · MONTHLY</div>
<h4>Link Acquisition Report</h4>
<p>Monthly placement log with anchor text distribution, topical relevance scoring, and entity reinforcement contribution per link.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">10</div>
<div className="deliverable-format">REPORT · MONTHLY</div>
<h4>AI Visibility Diagnostic</h4>
<p>Monthly tracking of citations across ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews — including new citations, lost citations, and competitive positioning.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">11</div>
<div className="deliverable-format">REPORT · QUARTERLY</div>
<h4>Pipeline Attribution Report</h4>
<p>Quarterly synthesis tying SEO output to qualified pipeline — query-level traffic, cluster performance, conversion paths, ROI against engagement investment.</p>
</div>
<div className="deliverable-card">
<div className="deliverable-icon">12</div>
<div className="deliverable-format">DOCX · ANNUAL</div>
<h4>Annual Strategic Review</h4>
<p>End-of-year synthesis covering authority gains, AI visibility shifts, competitive movement, and strategic recommendations for the next cycle.</p>
</div>
</div>
</div>
</section>

<section className="section roles">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">05 / Roles & Responsibilities</span>
<h2 className="h-display section-h2">Who owns <em>what.</em></h2>
</div>
<p className="section-intro">
        The most common cause of agency engagement friction is unclear ownership. Below is the explicit map of who handles what across the build. Every task has one owner — no shared responsibility, no diffused accountability. If something needs to happen, this map shows whose job it is.
      </p>
</div>
<div className="roles-table">
<div className="roles-row roles-row-header">
<div className="roles-cell">Build Activity</div>
<div className="roles-cell">Digital Vikingz</div>
<div className="roles-cell">Your Team</div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Stakeholder discovery & business context</div>
<div className="roles-cell"><span className="roles-tag roles-tag-shared">Facilitate</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Search Console / GA4 / CMS access</div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Receive</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Provision</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Semantic audit & diagnostic analysis</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Review</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Architecture design & topical map</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Approve</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Content brief generation</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Approve scope</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Long-form content writing</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">SME review</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Subject-matter expert input</div>
<div className="roles-cell"><span className="roles-tag roles-tag-shared">Request</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Editorial QA & predicate cleanup</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Final approval</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">CMS publishing & deployment</div>
<div className="roles-cell"><span className="roles-tag roles-tag-shared">Default</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-shared">Optional</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Technical SEO implementation</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Specify</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Implement</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Authority link acquisition</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Notified</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">AI visibility & citation tracking</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-client">Receive</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Pipeline attribution reporting</div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Own</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Validate data</span></div>
</div>
<div className="roles-row">
<div className="roles-cell roles-cell-task">Strategic adjustment decisions</div>
<div className="roles-cell"><span className="roles-tag roles-tag-shared">Recommend</span></div>
<div className="roles-cell"><span className="roles-tag roles-tag-dv">Decide</span></div>
</div>
</div>
</div>
</section>

<section className="section communication">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">06 / Communication Cadence</span>
<h2 className="h-display section-h2">How meetings, reports, and approvals run.</h2>
</div>
<p className="section-intro">
        The cadence below applies during active engagement. Every touchpoint has a defined purpose — no status calls without an agenda, no reports without a decision attached. Communication overhead is engineered to be light enough that it doesn't burden your team, but structured enough that nothing falls through.
      </p>
</div>
<div className="comm-grid">
<div className="comm-card">
<div className="comm-card-frequency">Weekly</div>
<h4>Production Sync</h4>
<p>Light-touch alignment call. What shipped last phasee, what's in production this phase, blockers, SME input requests. Optional for most phases once the rhythm is established.</p>
</div>
<div className="comm-card">
<div className="comm-card-frequency">Monthly</div>
<h4>Strategy Review</h4>
<p>Performance synthesis call. Cluster-level data, query path performance, link acquisition status, AI citation movement. Strategic adjustment decisions made here.</p>
</div>
<div className="comm-card">
<div className="comm-card-frequency">Quarterly</div>
<h4>Pipeline Review</h4>
<p>Pipeline attribution synthesis with stakeholders. ROI against investment, conversion path performance, strategic recommendations for next quarter.</p>
</div>
<div className="comm-card">
<div className="comm-card-frequency">Annual</div>
<h4>Strategic Review</h4>
<p>Year-in-review with full stakeholder team. Authority compounding evidence, competitive positioning shifts, AI visibility trajectory, next-year roadmap.</p>
</div>
</div>
</div>
</section>

<section className="section decisions">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">07 / Decision Points</span>
<h2 className="h-display section-h2">Where you make <em>go / no-go</em> calls.</h2>
</div>
<p className="section-intro">
        Engagements aren't open-ended commitments. There are defined moments where the client makes binding decisions about whether to continue, adjust scope, or close out. These checkpoints exist to protect both sides — they prevent runaway engagements and force honest conversations about whether the work is producing value.
      </p>
</div>
<div className="decisions-list">
<div className="decision-row">
<div className="decision-num">01</div>
<div className="decision-content">
<div className="decision-when">After Week 03 · Audit Complete</div>
<div className="decision-title">Proceed to architecture, or close with the audit roadmap?</div>
<div className="decision-desc">Once the Semantic Audit walkthrough is complete, you decide whether to engage Stage 02. Some clients close here with a roadmap their internal team executes. Both outcomes are intended — no pressure, no upsell tactics.</div>
</div>
<div className="decision-marker">Client Decision</div>
</div>
<div className="decision-row">
<div className="decision-num">02</div>
<div className="decision-content">
<div className="decision-when">After Week 10 · Architecture Handoff</div>
<div className="decision-title">Run production with Digital Vikingz, or execute internally?</div>
<div className="decision-desc">After architecture is delivered, you choose your production model. We handle production end-to-end, you handle production with our briefs and oversight, or you handle everything internally with the architecture as a reference. All three paths are supported.</div>
</div>
<div className="decision-marker">Client Decision</div>
</div>
<div className="decision-row">
<div className="decision-num">03</div>
<div className="decision-content">
<div className="decision-when">End of Quarter 01 · First Performance Review</div>
<div className="decision-title">Continue, adjust scope, or pause?</div>
<div className="decision-desc">First quarterly checkpoint. Authority signals appearing? Production cadence sustainable? Strategic direction holding? Scope can be adjusted up or down — or paused if business conditions require it. Quarterly contracts protect this flexibility.</div>
</div>
<div className="decision-marker">Mutual Review</div>
</div>
<div className="decision-row">
<div className="decision-num">04</div>
<div className="decision-content">
<div className="decision-when">End of Quarter 02 · Compounding Check</div>
<div className="decision-title">Are authority signals compounding?</div>
<div className="decision-desc">By Q2, structural authority signals should be visible — entity recognition in AI search, ranking improvements on architecture-aligned clusters, growing citation footprint. If they're not, this is the moment to diagnose why and decide on remediation versus continuation.</div>
</div>
<div className="decision-marker">Mutual Review</div>
</div>
<div className="decision-row">
<div className="decision-num">05</div>
<div className="decision-content">
<div className="decision-when">End of Year 01 · Strategic Review</div>
<div className="decision-title">Renew, expand, or transition out?</div>
<div className="decision-desc">Year-end review. Most engagements either renew with expanded scope (additional clusters, new verticals, deeper distribution) or transition to maintenance mode where your internal team owns ongoing production with our quarterly oversight.</div>
</div>
<div className="decision-marker">Strategic Review</div>
</div>
</div>
</div>
</section>

<section className="section stack">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">08 / The Operating Stack</span>
<h2 className="h-display section-h2">What we use. What we plug into.</h2>
</div>
<p className="section-intro">
        Tool transparency matters. Below is the operating stack — the tools that govern audits, architecture, production, and reporting. We integrate with whatever your business already uses; the stack below is what we run inside Digital Vikingz operations and what we recommend to clients building or migrating their own.
      </p>
</div>
<div className="stack-grid">
<div className="stack-card">
<div className="stack-card-category">Diagnostic</div>
<div className="stack-card-name">Search Console</div>
<div className="stack-card-purpose">Primary diagnostic source. Query data, ranking distribution, indexation, technical issues.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">Diagnostic</div>
<div className="stack-card-name">GA4</div>
<div className="stack-card-purpose">Behavior and conversion path tracking. Required for pipeline attribution work.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">Architecture</div>
<div className="stack-card-name">InLinks</div>
<div className="stack-card-purpose">Entity-level analysis, internal linking architecture, schema generation, topical authority scoring.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">Architecture</div>
<div className="stack-card-name">Diffbot</div>
<div className="stack-card-purpose">NLP-based entity extraction and competitive entity analysis at scale.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">Research</div>
<div className="stack-card-name">Ahrefs / SEMrush</div>
<div className="stack-card-purpose">Backlink analysis, query research, competitive positioning data.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">AI Visibility</div>
<div className="stack-card-name">Custom Tracking</div>
<div className="stack-card-purpose">In-house monitoring of ChatGPT, Perplexity, Claude, Gemini citations across target queries.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">Production</div>
<div className="stack-card-name">Claude Projects</div>
<div className="stack-card-purpose">Knowledge bank for editorial governance, predicate consistency, banned-phrase enforcement.</div>
</div>
<div className="stack-card">
<div className="stack-card-category">Project Ops</div>
<div className="stack-card-name">Notion / Slack</div>
<div className="stack-card-purpose">Internal coordination, client-facing documentation, async communication. Slack channel per client engagement.</div>
</div>
</div>
</div>
</section>

<section className="section disqualify">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">09 / Honest Disqualification</span>
<h2 className="h-display section-h2">When the engagement <em>doesn't work.</em></h2>
</div>
<p className="section-intro">
        We turn down engagements regularly. The methodology produces compounding results when it's applied to fitting businesses — and produces frustration when it isn't. Below is the honest map of where the engagement breaks down. If you see your business in the left column, this isn't the right partnership.
      </p>
</div>
<div className="disqualify-grid">
<div className="disqualify-col no">
<span className="disqualify-tag">Where it Fails</span>
<h3>The engagement won't work if you...</h3>
<ul className="disqualify-list">
<li>Need rankings or pipeline impact within 30–60 days. Semantic SEO is a 6–18 month discipline; faster expectations create false disappointment.</li>
<li>Are unwilling to invest in architecture before content production. Skipping Stage 02 collapses the rest of the engagement.</li>
<li>Have no defined Central Entity and no willingness to commit to one. Topic drift mid-engagement breaks Source Term Vector consistency.</li>
<li>Want to publish 40+ pieces per month at low cost. Volume publishing produces semantic dilution, not authority.</li>
<li>Treat content as a marketing afterthought, not a structural business asset. The discipline doesn't survive low-priority engagement.</li>
<li>Need an agency that says yes to every request without methodology constraints. We push back when the work would damage compounding authority.</li>
<li>Lack subject-matter expert availability for content review. SME input is required for technical and high-stakes verticals.</li>
</ul>
</div>
<div className="disqualify-col yes">
<span className="disqualify-tag">Where it Compounds</span>
<h3>The engagement <em>works</em> when you...</h3>
<ul className="disqualify-list">
<li>Have a 6–18 month time horizon and treat SEO as an asset investment, not a tactical spend.</li>
<li>Are committed to one Central Entity and willing to defend it through architecture decisions.</li>
<li>Value depth over volume — fewer, structurally engineered pieces over content factories.</li>
<li>Have leadership buy-in for the architectural foundation before production begins.</li>
<li>Have or can provide subject-matter expert input for high-stakes content review.</li>
<li>Want pipeline attribution and ROI accountability — not vanity metrics.</li>
<li>Are willing to engage in honest strategic conversations when the data calls for adjustment.</li>
<li>Treat the agency as a partner with methodology authority, not a vendor executing every request without question.</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section post-build">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">10 / After the Build</span>
<h2 className="h-display section-h2">What happens when architecture is <em>done.</em></h2>
</div>
<p className="section-intro">
        Architecture is a one-time foundation. Production, distribution, and attribution are continuous. This section addresses what happens at the natural exit points of an engagement — and the two paths most clients take when the initial build cycle completes.
      </p>
</div>
<div className="post-build-grid">
<div className="post-build-card">
<span className="post-build-card-num">Path A · Continuation</span>
<h3>Expand the program <em>into new clusters.</em></h3>
<p>Most engagements continue past the initial 12-month cycle by expanding the architecture into adjacent clusters, new content verticals, additional service lines, or new geographic markets. The Central Entity stays consistent — the topical map grows around it.</p>
<p>This path also includes deepening distribution work — more aggressive link acquisition, expanded AI visibility programs, and entity reinforcement across new authority publications.</p>
</div>
<div className="post-build-card">
<span className="post-build-card-num">Path B · Handoff & Maintenance</span>
<h3>Transition production <em>to your internal team.</em></h3>
<p>Some clients reach a point where their internal team has absorbed the methodology and is ready to own ongoing production. We transition into a quarterly oversight role — providing strategic review, methodology guidance, and architectural updates as the business evolves.</p>
<p>This path is fully supported. The architecture, governance manual, and editorial standards are designed to be ownable — your business runs the engine, we audit and advise.</p>
</div>
</div>
</div>
</section>

<section className="section faq">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">11 / Process Questions</span>
<h2 className="h-display section-h2">What buyers ask about <em>how the build runs.</em></h2>
</div>
<p className="section-intro">
        These are the questions that come up specifically about the operational mechanics of an engagement — not what we do or what semantic SEO means, but how the work actually runs once a contract is signed.
      </p>
</div>
<div className="faq-list">
<div className="faq-item">
<button className="faq-question">
          What does the kickoff week actually involve?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>phase 01 is structured around <strong>three deliverables</strong>: stakeholder alignment, business context capture, and access provisioning. We run a 90-minute discovery session covering the business, the topic, the buyer, and existing assets. We collect access to Search Console, GA4, the CMS, and any prior audit work. We synthesize the discovery output into a working document that informs the audit.</p>
<p>Your team's required time during phase 01 is roughly 2–3 hours total — the discovery session plus access provisioning. After phase 01, time commitment drops significantly.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          How much of our team's time does an active engagement require?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>During the audit and architecture stages (phases 1–10), expect 3–5 hours per phase of stakeholder time — primarily for review sessions, SME input, and approval decisions. Once production is running, weekly time drops to 1–2 hours for the production sync, with monthly review sessions adding another hour.</p>
<p>The engagement is engineered to be light on internal time. We handle execution; your team handles approval, SME input, and strategic decisions.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Can we have our internal writers produce content using your briefs?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Yes — this is one of the supported production models. We deliver entity-aligned briefs, and your internal writers execute against them under our editorial QA. This works well when your writers have category expertise and you want to retain content production in-house while gaining methodology rigor.</p>
<p>We also offer hybrid models where strategic content (pillars, comparison guides, BOFU) is produced by us and supporting content is produced by your team. The decision is made during the architecture handoff in phase 10.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What happens if we need to pause the engagement mid-build?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Quarterly contracts are designed to allow this. At any quarterly checkpoint, the engagement can be paused, scope-adjusted, or terminated without penalty beyond the current quarter. Mid-quarter pauses are accommodated when business conditions require it — we don't hold scope hostage.</p>
<p>Whatever was delivered up to the pause point is yours permanently. Architecture, briefs, content, governance manuals — all transferred and owned by your business regardless of engagement status.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          How do you handle subject-matter expertise for technical or specialized verticals?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Two-layer approach. Layer 1 — our internal writers have semantic SEO discipline and research capability across most B2B and B2C verticals. Layer 2 — for technical, regulated, or YMYL content, we require <strong>SME input</strong> from your team during brief approval and content review.</p>
<p>Highly specialized engagements (medical, legal, financial advisory, aviation, etc.) typically include 30–60 minutes of SME review time per major piece. We coordinate this asynchronously to minimize interruption to your experts.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Who handles publishing — does content go live directly through your team or through ours?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Default is that we handle CMS publishing end-to-end — including on-page SEO configuration, internal linking implementation, and schema deployment. This requires CMS access (typically WordPress; other platforms supported on request).</p>
<p>If your team prefers to retain publishing control, we deliver publish-ready content packages with all configurations specified, and your team handles the CMS step. Both models work — the choice is made at architecture handoff.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What does the reporting actually look like during active engagement?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>phases: a production log showing what shipped, what's in QA, what's in brief. Monthly: a performance synthesis covering cluster-level traffic, ranking movement, AI citation tracking, and link acquisition status. Quarterly: a full pipeline attribution analysis tying SEO output to qualified business outcomes.</p>
<p>All reports are delivered as DOCX or PDF documents. We don't use dashboard tools that obscure interpretation behind charts — every report includes our analysis, our recommendations, and the strategic decision points the data implies.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What happens if rankings or AI citations don't materialize on schedule?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>This is what the quarterly review process exists to surface. If structural authority signals aren't appearing by the end of Quarter 01 or 02 in line with the architecture's expectations, we diagnose why — typically through a focused review of execution quality, technical implementation, competitive movement, or distribution gaps.</p>
<p>Diagnosis is honest. If the cause is something we control (execution issues, brief quality, technical implementation gaps), we fix it without re-billing. If the cause is something the client controls (publishing delays, CMS issues, blocked technical changes), we surface it directly. Engagements that aren't producing expected signals get adjusted or paused — we don't run engagements that aren't working.</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="final-cta" id="cta">
<div className="semantic-graph-subtle" aria-hidden="true">
<svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<g>
<line className="graph-line" x1="700" y1="300" x2="350" y2="150"></line>
<line className="graph-line" x1="700" y1="300" x2="1050" y2="150"></line>
<line className="graph-line" x1="700" y1="300" x2="350" y2="450"></line>
<line className="graph-line" x1="700" y1="300" x2="1050" y2="450"></line>
<line className="graph-line" x1="350" y1="150" x2="1050" y2="150"></line>
<line className="graph-line" x1="350" y1="450" x2="1050" y2="450"></line>
</g>
<g>
<circle className="graph-node" cx="700" cy="300" r="5" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node" cx="350" cy="150" r="3" style={{animationDelay: "1s"}}></circle>
<circle className="graph-node" cx="1050" cy="150" r="3" style={{animationDelay: "2s"}}></circle>
<circle className="graph-node" cx="350" cy="450" r="3" style={{animationDelay: "3s"}}></circle>
<circle className="graph-node" cx="1050" cy="450" r="3" style={{animationDelay: "4s"}}></circle>
</g>
</svg>
</div>
<div className="wrap" style={{position: "relative", zIndex: "2"}}>
<span className="label final-cta-label">12 / The Next Step</span>
<h2 className="h-display">Now you know <em>how the build runs.</em></h2>
<p>If the operational structure above matches how you'd want a serious engagement to run — predictable, transparent, decision-driven, and honest about what works and what doesn't — the next step is a 30-minute call.</p>
<div className="final-cta-ctas">
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book a 30-Min Strategy Call <span className="btn-arrow"></span></a>
<a href="https://digitalvikingz.com" className="btn btn-ghost">Return to Home <span className="btn-arrow"></span></a>
</div>
<div className="final-cta-note">Limited intake <span>·</span> 6 new client engagements per quarter <span>·</span> Maintained for delivery quality</div>
</div>
</section>

<footer className="footer">
<div className="wrap">
<div className="footer-grid">
<div className="footer-brand">
<a href="https://digitalvikingz.com" className="logo">
<img src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" />
<span>Digital Vikingz</span>
</a>
<p>Semantic SEO authority agency built on Koray Tuğberk Gübür's methodology. We architect topical authority, defend it against AI dilution, and convert it into pipeline for businesses that want to claim a topic and own it.</p>
<div className="footer-location">Based in Bahawalpur <span>·</span> Serving US · UK · CA · AU · DE</div>
</div>
<div className="footer-col">
<h5>Services</h5>
<ul>
<li><a href="/services/semantic-seo-architecture">Semantic SEO Architecture</a></li>
<li><a href="/services/semantic-content-audit">Semantic Content Audit</a></li>
<li><a href="/services/llm-ai-search-visibility">LLM & AI Search Visibility</a></li>
<li><a href="/services/authority-link-building">Authority Link Building</a></li>
<li><a href="/services/semantic-content-network">Semantic Content Network</a></li>
<li><a href="/services/semantic-content-production">Semantic Content Production</a></li>
<li><a href="/services/pipeline-attribution-seo">Pipeline Attribution SEO</a></li>
</ul>
</div>
<div className="footer-col">
<h5>Agency</h5>
<ul>
<li><a href="/about">About Us</a></li>
<li><a href="/contact">Contact Us</a></li>
<li><a href="/blog">Blogs</a></li>
<li><a href="/operating-manual">Operating Manual</a></li>
<li><a href="/build-process">Build Process</a></li>
<li><a href="/vertical-playbooks">Vertical Playbooks</a></li>
<li><a href="/#rankings">Live Rankings</a></li>
<li><a href="/#team">Team</a></li>
<li><a href="/privacy-policy">Privacy Policy</a></li>
<li><a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener">Book a Call</a></li>
</ul>
</div>
<div className="footer-col">
<h5>Connect</h5>
<ul>
<li><a href="https://www.linkedin.com/company/digital-vikingz/" target="_blank" rel="noopener" style={{display: "flex", alignItems: "center", gap: "8px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>LinkedIn</a></li>
<li><a href="https://www.facebook.com/DigitalVikingz" target="_blank" rel="noopener" style={{display: "flex", alignItems: "center", gap: "8px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>Facebook</a></li>
<li><a href="https://www.instagram.com/digitalvikingz" target="_blank" rel="noopener" style={{display: "flex", alignItems: "center", gap: "8px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path></svg>Instagram</a></li>
<li><a href="https://www.youtube.com/@DigitalVikingz" target="_blank" rel="noopener" style={{display: "flex", alignItems: "center", gap: "8px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path></svg>YouTube</a></li>
<li><a href="mailto:workwithus@digitalvikingz.com" style={{display: "flex", alignItems: "center", gap: "8px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>workwithus@digitalvikingz.com</a></li>
</ul></div>
</div>
<div className="footer-bottom">
<div className="footer-bottom-text">© 2026 Digital Vikingz · All rights reserved</div>
<div className="footer-tagline">Claim<span>.</span> Shield<span>.</span> Scale<span>.</span></div>
</div>
</div>
</footer>


    </main>
  );
}