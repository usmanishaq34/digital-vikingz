export default function Page() {
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
<a href="#" id="servicesToggle" className="nav-link-item" style={{gap: "4px"}}>
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
<div className="wrap">
<div className="hero-breadcrumb">
<a href="https://digitalvikingz.com">Home</a>
<span className="hero-breadcrumb-sep">/</span>
<span className="hero-breadcrumb-current">The Audit</span>
</div>
<span className="hero-pill">Productized · Fixed Scope · 2–3 Phases</span>
<h1 className="h-display hero-h1">
      A semantic SEO audit you actually <em>own.</em>
</h1>
<p className="hero-sub">
      A fixed-scope diagnostic of your site's entity coverage, predicate consistency, semantic dilution, AI citation readiness, and technical infrastructure — delivered as a <strong>25–40 page written report</strong> with a prioritized issue map. Yours to keep, execute internally, or use as the foundation of a longer engagement. <strong>No commitment beyond the audit.</strong>
</p>
<div className="hero-meta-strip">
<div className="hero-meta-cell">
<span className="hero-meta-label">Duration</span>
<span className="hero-meta-value">2–3 <em>phases</em></span>
</div>
<div className="hero-meta-cell">
<span className="hero-meta-label">Deliverable</span>
<span className="hero-meta-value">25–40 <em>pages</em></span>
</div>
<div className="hero-meta-cell">
<span className="hero-meta-label">Starts at</span>
<span className="hero-meta-value">$2000 <em>USD</em></span>
</div>
<div className="hero-meta-cell">
<span className="hero-meta-label">Commitment</span>
<span className="hero-meta-value">One-time</span>
</div>
</div>
<div className="hero-ctas">
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min?audit=true" target="_blank" rel="noopener" className="btn btn-primary">Book Audit Intake Call <span className="btn-arrow"></span></a>
<a href="#scope" className="btn btn-ghost">See What's Inside <span className="btn-arrow"></span></a>
</div>
</div>
</header>

<section className="section scope" id="scope">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">01 / Scope</span>
<h2 className="h-display section-h2">What's actually <em>in the audit.</em></h2>
</div>
<p className="section-intro">
        Seven diagnostic components run sequentially across the audit. Each one produces written findings that flow into the final prioritized issue map. <strong>No vague "SEO health checks."</strong> Every component has a defined scope, a defined output, and a defined contribution to the recommendation layer.
      </p>
</div>
<div className="scope-grid">
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 01</span>
<div className="scope-card-icon">E</div>
</div>
<h3>Entity Coverage <em>Analysis</em></h3>
<p>Maps your site's existing entity footprint against the topic's full attribute space. Identifies where the Central Entity is well-defined, where it's fragmented, and where coverage gaps create competitor opportunities. Output: <strong>entity coverage heatmap</strong> with severity scoring.</p>
</div>
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 02</span>
<div className="scope-card-icon">P</div>
</div>
<h3>Predicate Consistency <em>Review</em></h3>
<p>Audits how the same relationships between entities are described across pages. Flags inconsistent predicate language that fragments authority. Output: <strong>predicate consistency report</strong> with documented examples and proposed unified vocabulary.</p>
</div>
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 03</span>
<div className="scope-card-icon">S</div>
</div>
<h3>Semantic Dilution <em>Diagnostic</em></h3>
<p>Identifies content drift — pages, clusters, or topics that pull authority away from the Central Entity. Locates Source Term Vector violations, off-topic content, and category-confusing assets. Output: <strong>dilution map</strong> with prune/redirect/restructure recommendations.</p>
</div>
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 04</span>
<div className="scope-card-icon">A</div>
</div>
<h3>AI Citation <em>Readiness</em></h3>
<p>Evaluates how ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews currently see your site. Tests against representative queries. Identifies why retrievals fail. Output: <strong>AI visibility diagnostic</strong> with citation-readiness scoring per cluster.</p>
</div>
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 05</span>
<div className="scope-card-icon">T</div>
</div>
<h3>Technical Entity <em>Infrastructure</em></h3>
<p>Reviews schema, structured data, internal linking, hierarchy, and crawl signals — but only the parts that affect entity recognition. <strong>Not a generic technical SEO audit</strong> — every finding ties back to entity authority impact. Output: <strong>technical findings</strong> tied to entity outcomes.</p>
</div>
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 06</span>
<div className="scope-card-icon">C</div>
</div>
<h3>Competitive Entity <em>Positioning</em></h3>
<p>Maps your entity authority against 3–5 ranking competitors. Identifies where they hold structural advantage, where you have defensible openings, and which clusters are realistically winnable. Output: <strong>competitive entity gap analysis</strong> with prioritized opportunities.</p>
</div>
<div className="scope-card">
<div className="scope-card-head">
<span className="scope-card-num">Component 07</span>
<div className="scope-card-icon">M</div>
</div>
<h3>Prioritized <em>Issue Map</em></h3>
<p>Synthesis layer. All findings consolidated into a severity-scored, sequenced issue map with proposed remediation paths. Each issue tagged with effort estimate, expected impact, and dependencies. Output: <strong>actionable roadmap</strong> your team or ours can execute against.</p>
</div>
</div>
</div>
</section>

<section className="sample-section">
<div className="wrap">
<div className="sample-head">
<div className="sample-head-left">
<span className="label">02 / The Sample</span>
<h2 className="h-display section-h2">What the deliverable <em>actually looks like.</em></h2>
</div>
<p className="section-intro">
        Below is a sample slice from a recent audit deliverable — not a marketing mockup. Toggle between the <strong>Issue Map</strong> view (problems flagged with severity scoring) and the <strong>Recommendation Map</strong> view (the same issues with prioritized remediation paths). The actual audit document includes 30–60 such rows depending on site complexity.
      </p>
</div>
<div className="audit-console" id="auditConsole" data-state="issue">

<div className="ac-header">
<div className="ac-header-left">
<span className="ac-pill">
<span className="ac-state-block ac-state-issue">Live · Issue Map</span>
<span className="ac-state-block ac-state-rec">Live · Recommendation Map</span>
</span>
<span className="ac-title">
<span className="ac-state-block ac-state-issue">Sample audit deliverable: <strong>SaaS workflow automation site · 8 issues flagged</strong></span>
<span className="ac-state-block ac-state-rec">Recommendation map: <strong>8 prioritized fixes with effort & impact estimates</strong></span>
</span>
</div>
<button type="button" className="ac-toggle-btn" data-toggle="auditConsole" aria-label="Toggle between issue and recommendation states">
<span className="ac-toggle-dot"></span>
<span className="ac-state-block ac-state-issue">See recommendations</span>
<span className="ac-state-block ac-state-rec">Back to issues</span>
</button>
</div>

<div className="ac-body">

<div className="ac-row priority">
<div className="ac-severity high">High</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Central Entity definition fragmented across 4 pages</span>
<span className="ac-state-block ac-state-rec">Lock unified Central Entity definition · cascade across all pages</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">Homepage, About, Pricing, and Solutions pages each define the entity differently. <strong>Authority cannot bind.</strong></span>
<span className="ac-state-block ac-state-rec">Single 60-word entity definition · deployed verbatim across 4 pages · <strong>Effort: 2 days · Impact: high</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row priority">
<div className="ac-severity high">High</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Source Term Vector drift — 18 off-vector synonyms in use</span>
<span className="ac-state-block ac-state-rec">Source Term Vector spec + banned-phrase registry · enforce at editorial QA</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">"platform" / "tool" / "app" / "software" used interchangeably. <strong>Vocabulary fragments authority.</strong></span>
<span className="ac-state-block ac-state-rec">"platform" canonized · 17 banned terms registered · governance manual delivered · <strong>Effort: 5 days · Impact: high</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row">
<div className="ac-severity med">Med</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Predicate inconsistency on product-customer relationship</span>
<span className="ac-state-block ac-state-rec">Canonical predicate: "built for" · enforce across all surfaces</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">"designed for," "built for," "made for," "tailored to" all describe the same relationship across 12 pages.</span>
<span className="ac-state-block ac-state-rec">"built for" canonized · 12 page edits scoped · <strong>Effort: 3 days · Impact: medium-high</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row priority">
<div className="ac-severity high">High</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Zero AI citations across GPT, Perplexity, Gemini for 12 target queries</span>
<span className="ac-state-block ac-state-rec">E-A-V triple production + schema deployment · cluster-by-cluster</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">Tested against 12 representative queries · zero retrievals across all 4 LLM surfaces. <strong>AI visibility broken.</strong></span>
<span className="ac-state-block ac-state-rec">340 E-A-V triples specified · Article + FAQ schema deployed · <strong>Effort: 12 days · Impact: critical</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row">
<div className="ac-severity med">Med</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Topical map missing 3 buyer-stage clusters</span>
<span className="ac-state-block ac-state-rec">Add comparison + alternative + use-case clusters · 24 pages scoped</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">No comparison content · no alternatives content · no use-case-specific content. <strong>Decision-stage queries leak.</strong></span>
<span className="ac-state-block ac-state-rec">3 clusters specified · 24-page roadmap delivered · <strong>Effort: 3 months · Impact: high</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row">
<div className="ac-severity low">Low</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Internal linking architecture lacks anchor-text governance</span>
<span className="ac-state-block ac-state-rec">Anchor governance manual · enforce predicate-clean anchors</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">88 internal links use varied anchor text for the same target page. Reinforcement signal noisy.</span>
<span className="ac-state-block ac-state-rec">Anchor schema specified · 88 links normalized · <strong>Effort: 2 days · Impact: medium</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row">
<div className="ac-severity med">Med</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Schema deployment incomplete · 60% coverage</span>
<span className="ac-state-block ac-state-rec">Article + FAQ + Breadcrumb + Organization schema · full deployment</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">Only Organization + WebPage schema present. <strong>Missing layers limit AI extraction.</strong></span>
<span className="ac-state-block ac-state-rec">4 schema types specified · 84 pages tagged · <strong>Effort: 4 days · Impact: high</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Fix specified</span>
</div>
</div>

<div className="ac-row">
<div className="ac-severity med">Med</div>
<div className="ac-content">
<div className="ac-content-title">
<span className="ac-state-block ac-state-issue">Competitor X owns 4 high-value clusters · structurally defensible</span>
<span className="ac-state-block ac-state-rec">Pivot to 6 winnable adjacent clusters · 18-month authority play</span>
</div>
<div className="ac-content-detail">
<span className="ac-state-block ac-state-issue">4 clusters where competitor X is structurally entrenched. <strong>Direct attack uneconomical.</strong></span>
<span className="ac-state-block ac-state-rec">6 adjacent clusters identified · defensible openings mapped · <strong>Effort: strategic · Impact: long-term</strong></span>
</div>
</div>
<div className="ac-status">
<span className="ac-status-dot"></span>
<span className="ac-state-block ac-state-issue">▸ Flagged</span>
<span className="ac-state-block ac-state-rec">✓ Pivot specified</span>
</div>
</div>
</div>

<div className="ac-outcome-banner ac-state-block ac-state-rec">
<span className="ac-outcome-tag">Recommendation map · all 8 issues with prioritized fixes</span>
<div className="ac-outcome-text">Every flagged issue gets a <strong>specified remediation path</strong> · effort estimate · impact projection · dependency map. The audit deliverable closes when the issue list converts into an actionable roadmap your team or ours can execute against.</div>
</div>

<div className="ac-foot">
<span className="ac-foot-text">
<span className="ac-state-block ac-state-issue">Sample slice · <strong>8 of ~40 rows</strong> · full deliverable contains complete diagnostic</span>
<span className="ac-state-block ac-state-rec">Sample slice · <strong>8 of ~40 fixes</strong> · full roadmap sequenced for execution</span>
</span>
<div className="ac-foot-meter">
<span className="ac-foot-meter-label">Severity Mix</span>
<span className="ac-foot-meter-num">3 High · 4 Med · 1 Low</span>
</div>
</div>
</div>
</div>
</section>

<section className="section timeline">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">03 / The Timeline</span>
<h2 className="h-display section-h2">2–3 phase, <em>1st phase to 12th phase.</em></h2>
</div>
<p className="section-intro">
        The audit runs on a fixed schedule. Phase 01 is intake and access provisioning — your team's only material time commitment. Phase 02 is diagnostic execution (silent on our side). Phase 03 is synthesis, deliverable production, and the live walkthrough call. <strong>You receive everything in writing</strong> — the call is the explanation, not the deliverable.
      </p>
</div>
<div className="timeline-wrap">
<div className="timeline-row timeline-row-header">
<div className="timeline-week">Phase</div>
<div className="timeline-action">Activity</div>
</div>
<div className="timeline-row">
<div className="timeline-week">phase 01</div>
<div className="timeline-action">
<div className="timeline-action-title">Intake & Access Provisioning</div>
<div className="timeline-action-detail">90-minute intake call · business context capture · access provisioning (Search Console, GA4, CMS read-only) · scope confirmation. <strong>Your team's time: ~2 hours total.</strong></div>
</div>
</div>
<div className="timeline-row">
<div className="timeline-week">phase 02</div>
<div className="timeline-action">
<div className="timeline-action-title">Diagnostic Execution</div>
<div className="timeline-action-detail">All 7 diagnostic components run in sequence on our side. Entity coverage analysis · predicate consistency review · semantic dilution diagnostic · AI citation testing · technical infrastructure review · competitive positioning. <strong>Your team's time: zero.</strong></div>
</div>
</div>
<div className="timeline-row">
<div className="timeline-week">phase 03</div>
<div className="timeline-action">
<div className="timeline-action-title">Synthesis · Deliverable · Walkthrough</div>
<div className="timeline-action-detail">Findings synthesized into the prioritized issue map · 25–40 page audit document compiled · 60-minute live walkthrough call with stakeholders. <strong>Decision point</strong> — proceed to architecture, execute internally, or close with the roadmap.</div>
</div>
</div>
</div>
</div>
</section>

<section className="section fit">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">04 / Fit</span>
<h2 className="h-display section-h2">Who the audit <em>fits.</em></h2>
</div>
<p className="section-intro">
        The audit produces high value for businesses with existing site footprints and clear topical direction — and produces frustration for businesses without them. Below is the explicit fit map. If your business is in the left column, this is the right starting point. If it's in the right column, the audit isn't the right product yet.
      </p>
</div>
<div className="fit-grid">
<div className="fit-col yes">
<span className="fit-tag">Where it fits</span>
<h3>The audit <em>works</em> if you...</h3>
<ul className="fit-list">
<li>Have an existing site with content already published</li>
<li>Suspect rankings have flatlined or reset after Google updates</li>
<li>Need a written diagnostic before committing to a longer engagement</li>
<li>Want a prioritized roadmap your internal team can execute against</li>
<li>Need diagnostic data to bring to internal stakeholders or board</li>
<li>Are evaluating multiple SEO partners and need a deliverable to compare</li>
<li>Have AI citation gaps you can't diagnose with traditional SEO tools</li>
</ul>
</div>
<div className="fit-col no">
<span className="fit-tag">Where it doesn't</span>
<h3>The audit isn't right if you...</h3>
<ul className="fit-list">
<li>Have no published content yet — you need architecture, not audit</li>
<li>Want a list of keywords to target — this isn't keyword research</li>
<li>Need a generic "SEO health check" — this is entity-level diagnostics</li>
<li>Are unwilling to act on the findings — the audit produces work, not magic</li>
<li>Need rankings improvements within 30–60 days — this surfaces issues, fixes take quarters</li>
<li>Need backlink opportunities — this is structural, not link-acquisition</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section paths">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">05 / Paths</span>
<h2 className="h-display section-h2">What you do <em>with the audit.</em></h2>
</div>
<p className="section-intro">
        Three intended paths after the audit deliverable lands. None of them require a follow-on engagement with us. The audit is designed to be valuable as a standalone deliverable — the architecture engagement is one option among three.
      </p>
</div>
<div className="paths-grid">
<div className="path-card">
<div className="path-card-num">01</div>
<h4>Proceed to <em>architecture</em></h4>
<p>The audit becomes the foundation of a 6–18 month architecture engagement. The issue map sequences directly into the build roadmap. Audit fee credited toward architecture engagement if started within 60 days.</p>
</div>
<div className="path-card">
<div className="path-card-num">02</div>
<h4>Execute <em>internally</em></h4>
<p>Your internal team takes the audit and runs the work themselves. The deliverable is structured as an executable roadmap — not a marketing report. Many clients close with us at this point and execute the audit findings without further engagement.</p>
</div>
<div className="path-card">
<div className="path-card-num">03</div>
<h4>Shop the <em>roadmap</em></h4>
<p>The audit travels. Some clients use it to evaluate other SEO partners, brief internal hires, or take to leadership for budget approval. The deliverable is yours — no NDA constraints on how you use it after delivery.</p>
</div>
</div>
</div>
</section>

<section className="section pricing" id="pricing">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">06 / Pricing</span>
<h2 className="h-display section-h2">Transparent. <em>Productized. Fixed.</em></h2>
</div>
<p className="section-intro">
        The audit is a productized engagement. <strong>Starting price: $2000 USD.</strong> Final pricing depends on site complexity (page count, vertical complexity, multilingual scope, regulatory layer). All pricing locked before kickoff — no surprise additions. Below is what's included at the base tier.
      </p>
</div>
<div className="pricing-card">
<div className="pricing-left">
<h3>The Semantic <em>Audit</em></h3>
<div className="pricing-amount">
<span className="pricing-amount-prefix">Starts at</span>
<span className="pricing-amount-value">$2000</span>
<span className="pricing-amount-suffix">USD</span>
</div>
<p>Single payment · invoiced at kickoff · 50% upfront / 50% on deliverable · USD wire or Wise. Audit fee <strong>credited toward architecture engagement</strong> if started within 60 days of deliverable.</p>
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min?audit=true" target="_blank" rel="noopener" className="btn btn-primary">Book Audit Intake Call <span className="btn-arrow"></span></a>
</div>
<div className="pricing-included">
<span className="pricing-included-label">What's Included</span>
<ul>
<li>All 7 diagnostic components</li>
<li>25–40 page audit document (DOCX)</li>
<li>Prioritized issue map with severity scoring</li>
<li>Entity coverage heatmap (visual)</li>
<li>AI visibility diagnostic across 4 LLM surfaces</li>
<li>Competitive entity gap analysis (3–5 competitors)</li>
<li>Recommendation map with effort & impact estimates</li>
<li>60-minute live walkthrough call</li>
<li>30 days of follow-up Q&A via email</li>
<li>Audit fee credited toward architecture (60-day window)</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section faq">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">07 / Audit Questions</span>
<h2 className="h-display section-h2">What buyers ask before <em>committing.</em></h2>
</div>
<p className="section-intro">
        These are the questions that come up specifically about the audit — pricing, scope variance, deliverable format, and the relationship between audit and architecture engagements.
      </p>
</div>
<div className="faq-list">
<div className="faq-item">
<button className="faq-question">
          What does "starts at $2000" actually mean — when does it go higher?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>The base price covers a single-language site with up to 200 indexed pages, 1 vertical, and standard scope (no regulatory or YMYL specialization). Pricing scales upward for: <strong>multilingual sites</strong> (additional language adds $1,500–$3,000), <strong>large sites</strong> (500+ pages adds $1,500), <strong>YMYL verticals</strong> (medical, legal, financial — adds $2,000 for SME-grade review), and <strong>multiple verticals</strong> on one domain.</p>
<p>Final pricing is locked during the intake call before any work starts. No surprise scope additions after kickoff.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          How is this different from a regular SEO audit?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Traditional SEO audits diagnose technical issues, content gaps, and backlink profile health. They produce checklists. <strong>The Semantic Audit operates at the entity layer</strong> — it diagnoses how cleanly your site's Central Entity is defined, how consistently your predicates run, how completely your topical map covers the buyer's question space, and how AI retrieval models currently see your site.</p>
<p>If a generic SEO audit tells you "fix your title tags and improve internal linking," the Semantic Audit tells you "your Central Entity is fragmented across 4 pages and your Source Term Vector contains 18 off-vector terms — here's how to consolidate authority before content production."</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Do I need to commit to a longer engagement to get the audit?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>No. The audit is a <strong>standalone productized engagement</strong>. You pay for the audit, receive the deliverable, and decide independently what to do next. Many clients close with us after the audit and execute the roadmap internally — that's an intended outcome, not a failure mode.</p>
<p>The 60-day credit window exists if you do want to proceed to architecture — but it doesn't expire your right to the deliverable.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Can I use the audit to evaluate other SEO agencies?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Yes. The deliverable is yours after delivery — no NDA constraints on how you use it. Some clients use the audit to brief internal hires, evaluate competing agency proposals, or get budget approval from leadership before committing to a longer build.</p>
<p>We treat this as a feature, not a leak. A buyer who runs a methodology-grade audit through three competing agencies and chooses us based on the depth is a stronger fit than one who only saw our pitch.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What if my site has no published content yet?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>The audit isn't the right product for greenfield sites. There's nothing structural to audit yet. <strong>Pre-launch sites need architecture, not audit</strong> — and the architecture engagement starts at a different price point and timeline.</p>
<p>If you're pre-launch, book a strategy call directly (not the audit intake) and we'll scope an architecture engagement instead.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What deliverable format do I receive?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Three artifacts ship at the end of Phase 03: (1) the <strong>main audit document</strong> in DOCX format (25–40 pages), (2) the <strong>prioritized issue map</strong> as a separate spreadsheet, and (3) the <strong>entity coverage heatmap</strong> as both an embedded visual and exportable PDF.</p>
<p>All artifacts are yours permanently. Editable formats so your internal team can annotate, brief contractors, or reuse content directly.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What happens during the live walkthrough call?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>60-minute call after the deliverable lands. We walk through the prioritized issue map, explain why each high-severity finding matters, answer questions about specific recommendations, and discuss the three intended paths (proceed / execute / shop).</p>
<p>Recommended attendees: whoever owns SEO + whoever owns content + (if relevant) whoever owns the budget decision. The call is included in the audit fee — no upsell pressure during it.</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="final-cta" id="cta">
<div className="wrap">
<span className="label final-cta-label">08 / The Next Step</span>
<h2 className="h-display">Diagnose what's actually <em>broken.</em></h2>
<p>The audit is the lowest-commitment path to working with Digital Vikingz. You receive a structurally complete diagnostic of your site's authority infrastructure — yours to keep regardless of what you decide next.</p>
<div className="final-cta-ctas">
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min?audit=true" target="_blank" rel="noopener" className="btn btn-primary">Book Audit Intake Call <span className="btn-arrow"></span></a>
<a href="/build-process" className="btn btn-ghost">Or See the Full Build Process <span className="btn-arrow"></span></a>
</div>
<div className="final-cta-note">Limited intake <span>·</span> 4 audits per month <span>·</span> Maintained for delivery quality</div>
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
