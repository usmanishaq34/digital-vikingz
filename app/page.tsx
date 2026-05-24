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
<div className="hero-meta reveal">
<div className="hero-tagline">Claim<span>•</span>Shield<span>•</span>Scale</div>
<div className="hero-tagline">Est. 2023 · Bahawalpur, PK · Serving 5 Countries</div>
</div>
<div className="hero-split">
<div className="hero-text-col">
<h1 className="h-display hero-h1 reveal reveal-delay-1">
          Semantic SEO architecture for businesses claiming <em>topical authority</em> in the AI search era.
        </h1>
<p className="hero-sub reveal reveal-delay-2">
<strong>Digital Vikingz</strong> builds the entity infrastructure that ranks in Google and gets cited by ChatGPT, Perplexity, Claude, and AI Overviews. We engineer <strong>structural authority</strong> — using Koray Tuğberk Gübür's semantic SEO methodology proven across <strong>200+ projects in 40+ industries.</strong>
</p>
<div className="hero-ctas reveal reveal-delay-3">
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book a 30-Min Strategy Call <span className="btn-arrow"></span></a>
<a href="/operating-manual" className="btn btn-ghost">See the Methodology <span className="btn-arrow"></span></a>
</div>
</div>

<div className="hero-engine-col reveal reveal-delay-2">
<div className="live-engine" id="liveEngine" data-state="building">

<div className="le-header">
<div className="le-live-pill">
<span className="le-live-dot"></span>
<span className="state-block state-building">Live · Building</span>
<span className="state-block state-outcome">Live · Outcome</span>
</div>
<div className="le-variant">
<span className="state-block state-building">Building: <strong>SaaS topical authority architecture</strong></span>
<span className="state-block state-outcome">Complete: <strong>14-month engagement · all systems live</strong></span>
</div>
</div>

<div className="le-log-wrap">

<div className="le-log state-block state-building" aria-live="polite">
<div className="le-log-track">

<div className="le-log-line"><span className="le-log-ts">00:01</span><span className="le-log-tx"><span className="le-arrow">▸</span>Central Entity locked · <b>SaaS workflow automation</b></span></div>
<div className="le-log-line"><span className="le-log-ts">00:02</span><span className="le-log-tx">Source Term Vector · <b>47 vocabulary terms</b> specified</span></div>
<div className="le-log-line"><span className="le-log-ts">00:03</span><span className="le-log-tx"><span className="le-arrow">▸</span>Predicate framework · 12 entity relationships defined</span></div>
<div className="le-log-line"><span className="le-log-ts">00:04</span><span className="le-log-tx">Topical map · <b>6 clusters · 84 supporting nodes</b></span></div>
<div className="le-log-line le-type-buyer"><span className="le-log-tx">Architecture compounds across all 84 nodes</span></div>
<div className="le-log-line"><span className="le-log-ts">00:05</span><span className="le-log-tx"><span className="le-arrow">▸</span>Information Gain audit · SERP agreement area mapped</span></div>
<div className="le-log-line"><span className="le-log-ts">00:06</span><span className="le-log-tx"><span className="le-check">✓</span>3 net-new attributes identified</span></div>
<div className="le-log-line"><span className="le-log-ts">00:07</span><span className="le-log-tx">Koray Tuğberk Gübür framework · Layer 08 / 21</span></div>
<div className="le-log-line"><span className="le-log-ts">00:08</span><span className="le-log-tx"><span className="le-arrow">▸</span>AI citation diagnostic · GPT · Perplexity · Gemini</span></div>
<div className="le-log-line"><span className="le-log-ts">00:09</span><span className="le-log-tx">Schema deployed · Article + FAQ + Breadcrumb</span></div>
<div className="le-log-line"><span className="le-log-ts">00:10</span><span className="le-log-tx"><span className="le-arrow">▸</span>Editorial QA · predicate consistency check</span></div>
<div className="le-log-line"><span className="le-log-ts">00:11</span><span className="le-log-tx"><span className="le-check">✓</span>0 banned phrases detected · MIRENA pass</span></div>
<div className="le-log-line le-type-human"><span className="le-log-ts">00:12</span><span className="le-log-tx">Usman approved batch · <b>methodology lead</b></span></div>
<div className="le-log-line"><span className="le-log-ts">00:13</span><span className="le-log-tx"><span className="le-arrow">▸</span>Pipeline attribution · Layer 21 active</span></div>
<div className="le-log-line le-type-buyer"><span className="le-log-tx">Authority compounds quarter over quarter</span></div>

<div className="le-log-line"><span className="le-log-ts">00:01</span><span className="le-log-tx"><span className="le-arrow">▸</span>Central Entity locked · <b>SaaS workflow automation</b></span></div>
<div className="le-log-line"><span className="le-log-ts">00:02</span><span className="le-log-tx">Source Term Vector · <b>47 vocabulary terms</b> specified</span></div>
<div className="le-log-line"><span className="le-log-ts">00:03</span><span className="le-log-tx"><span className="le-arrow">▸</span>Predicate framework · 12 entity relationships defined</span></div>
<div className="le-log-line"><span className="le-log-ts">00:04</span><span className="le-log-tx">Topical map · <b>6 clusters · 84 supporting nodes</b></span></div>
<div className="le-log-line le-type-buyer"><span className="le-log-tx">Architecture compounds across all 84 nodes</span></div>
<div className="le-log-line"><span className="le-log-ts">00:05</span><span className="le-log-tx"><span className="le-arrow">▸</span>Information Gain audit · SERP agreement area mapped</span></div>
<div className="le-log-line"><span className="le-log-ts">00:06</span><span className="le-log-tx"><span className="le-check">✓</span>3 net-new attributes identified</span></div>
<div className="le-log-line"><span className="le-log-ts">00:07</span><span className="le-log-tx">Koray Tuğberk Gübür framework · Layer 08 / 21</span></div>
<div className="le-log-line"><span className="le-log-ts">00:08</span><span className="le-log-tx"><span className="le-arrow">▸</span>AI citation diagnostic · GPT · Perplexity · Gemini</span></div>
<div className="le-log-line"><span className="le-log-ts">00:09</span><span className="le-log-tx">Schema deployed · Article + FAQ + Breadcrumb</span></div>
<div className="le-log-line"><span className="le-log-ts">00:10</span><span className="le-log-tx"><span className="le-arrow">▸</span>Editorial QA · predicate consistency check</span></div>
<div className="le-log-line"><span className="le-log-ts">00:11</span><span className="le-log-tx"><span className="le-check">✓</span>0 banned phrases detected · MIRENA pass</span></div>
<div className="le-log-line le-type-human"><span className="le-log-ts">00:12</span><span className="le-log-tx">Usman approved batch · <b>methodology lead</b></span></div>
<div className="le-log-line"><span className="le-log-ts">00:13</span><span className="le-log-tx"><span className="le-arrow">▸</span>Pipeline attribution · Layer 21 active</span></div>
<div className="le-log-line le-type-buyer"><span className="le-log-tx">Authority compounds quarter over quarter</span></div>
</div>
</div>

<div className="le-log state-block state-outcome" style={{height: "auto", maskImage: "none", WebkitMaskImage: "none"}} aria-live="polite">
<div className="le-log-outcome">
<div className="le-log-line"><span className="le-log-ts">M+1</span><span className="le-log-tx"><span className="le-check-final">✓</span>Architecture · all 21 layers signed off</span></div>
<div className="le-log-line"><span className="le-log-ts">M+3</span><span className="le-log-tx"><span className="le-check-final">✓</span>Production · <b>84 entity-clean assets</b> shipped</span></div>
<div className="le-log-line"><span className="le-log-ts">M+6</span><span className="le-log-tx"><span className="le-check-final">✓</span>Distribution · authority links across category</span></div>
<div className="le-log-line"><span className="le-log-ts">M+9</span><span className="le-log-tx"><span className="le-check-final">✓</span>AI citations · <b>47 verified retrievals</b></span></div>
<div className="le-log-line"><span className="le-log-ts">M+12</span><span className="le-log-tx"><span className="le-check-final">✓</span>Pipeline attribution · revenue mapped to clusters</span></div>
<div className="le-log-line le-type-final"><span className="le-log-tx">Engagement complete · authority compounding self-sustains</span></div>
</div>
</div>
</div>

<div className="le-caption">
<span className="state-block state-building">Every line is a structural authority signal we engineer</span>
<span className="state-block state-outcome">Final state · 14 months · representative engagement</span>
</div>

<div className="le-metrics-big">
<div className="le-mb-cell">
<div className="le-mb-label">Topical Coverage</div>
<div className="le-mb-value">
<span className="le-mb-amt state-block state-building">28% → 84%</span>
<span className="le-mb-amt state-block state-outcome">94%</span>
</div>
</div>
<div className="le-mb-cell">
<div className="le-mb-label">AI Citations</div>
<div className="le-mb-value">
<span className="le-mb-amt state-block state-building">0 → 47</span>
<span className="le-mb-amt state-block state-outcome">247</span>
<span className="le-mb-unit">GPT · PER · GEM</span>
</div>
</div>
<div className="le-mb-cell">
<div className="le-mb-label">Predicate Pass</div>
<div className="le-mb-value">
<span className="le-mb-amt">100%</span>
</div>
</div>
</div>

<div className="le-metrics-small">
<div className="le-ms-cell">
<span className="le-ms-label">Cluster depth</span>
<span className="le-ms-value state-block state-building">6 / 6</span>
<span className="le-ms-value state-block state-outcome">14 / 14</span>
</div>
<div className="le-ms-cell">
<span className="le-ms-label">Schema pass</span>
<span className="le-ms-value">21 / 21</span>
</div>
<div className="le-ms-cell">
<span className="le-ms-label">Editorial QA</span>
<span className="le-ms-value state-block state-building">13 / 13</span>
<span className="le-ms-value state-block state-outcome">340 / 340</span>
</div>
</div>

<div className="le-outcome-summary state-block state-outcome">
<span className="le-outcome-tag">Engagement Outcome</span>
<div className="le-outcome-text">After 14 months · 84 nodes built · 247 AI citations earned · authority compounding <strong>without further architectural intervention</strong>.</div>
</div>

<button type="button" className="le-toggle" data-toggle="liveEngine" aria-label="Toggle between building and outcome states">
<span className="state-block state-building-flex" style={{alignItems: "center", gap: "10px"}}>See the final state <span className="le-toggle-arrow">→</span></span>
<span className="state-block state-outcome-flex" style={{alignItems: "center", gap: "10px"}}><span className="le-toggle-arrow">←</span> Back to building</span>
</button>
</div>
</div>
</div>
<div className="hero-stats reveal reveal-delay-4">
<div className="stat">
<div className="stat-num">200+</div>
<div className="stat-label">Projects Delivered</div>
</div>
<div className="stat">
<div className="stat-num">40+</div>
<div className="stat-label">Industries Served</div>
</div>
<div className="stat">
<div className="stat-num">15</div>
<div className="stat-label">Specialist Team</div>
</div>
<div className="stat">
<div className="stat-num">6+</div>
<div className="stat-label">Years on Methodology</div>
</div>
</div>
</div>
</header>

<section className="featured-logos">
<div className="wrap">
<div className="featured-logos-label">Trusted by businesses building category authority <span>—</span></div>
<div className="logos-grid">
<div className="logo-item"><div className="logo-name">My<em>tello</em></div></div>
<div className="logo-item"><div className="logo-name">Crew<em>sim</em></div></div>
<div className="logo-item"><div className="logo-name">Prep<em>matter</em></div></div>
<div className="logo-item"><div className="logo-name">Diabetics <em>Trust</em></div></div>
<div className="logo-item"><div className="logo-name">ADHD <em>Dude</em></div></div>
<div className="logo-item"><div className="logo-name">Advanced <em>SE</em></div></div>
<div className="logo-item"><div className="logo-name">AJ <em>Kumar</em></div></div>
<div className="logo-item"><div className="logo-name">CFL <em>Boating</em></div></div>
<div className="logo-item"><div className="logo-name">World <em>Springs</em></div></div>
<div className="logo-item"><div className="logo-name">Pep<em>thrive</em></div></div>
<div className="logo-item"><div className="logo-name">Earn<em>Edits</em></div></div>
<div className="logo-item"><div className="logo-name">Article<em>gen</em></div></div>
</div>

<div className="featured-bylines">
<div className="featured-bylines-label">Featured bylines & published work <span>—</span></div>
<div className="bylines-grid">
<div className="byline-item">
<span className="byline-tag">Contributing Author</span>
<span className="byline-name">Clip<em>champ</em></span>
</div>
<div className="byline-item">
<span className="byline-tag">Methodology Reference</span>
<span className="byline-name">Koray Tuğberk <em>Gübür</em></span>
</div>
</div>
</div>
</div>
</section>

<section className="section shift">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">01 / The Shift</span>
<h2 className="h-display section-h2">Search isn't ranking. It's <em>citing.</em></h2>
</div>
<p className="section-intro">
        Google rewrote the rules with Helpful Content updates and AI Overviews. ChatGPT, Perplexity, and Claude opened a second search layer entirely — one where rankings don't matter, but <strong>citations do.</strong> The businesses winning this shift aren't producing more content. They're producing structurally authoritative content that AI systems quote and Google recognizes as the source.
      </p>
</div>
<div className="shift-grid">
<div className="shift-card">
<div className="shift-card-num">01</div>
<h3>Authority compounds. Tactics don't.</h3>
<p>Sites engineered around <strong>entity architecture</strong> survive algorithm updates and grow stronger over time. Sites built on isolated keyword optimization reset with every update — and clients wonder why a year of work didn't move the line.</p>
</div>
<div className="shift-card">
<div className="shift-card-num">02</div>
<h3>AI search reads structure, not keywords.</h3>
<p>LLMs cite entities with <strong>predicate consistency</strong> and structural credibility. Generic content gets ignored regardless of word count. Sites with clean Source Term Vectors and defined entity hierarchies become the source AI quotes.</p>
</div>
<div className="shift-card">
<div className="shift-card-num">03</div>
<h3>Topical depth beats topical breadth.</h3>
<p>Trying to rank for everything signals <strong>semantic dilution</strong>. Owning a topic deeply — with predicate-clean content, comprehensive query path coverage, and reinforced entity signals — produces the authority that converts clicks into pipeline.</p>
</div>
</div>
<div className="shift-conclusion">
<p>The businesses that win the next decade aren't producing more content. They're <em>claiming fewer topics, deeper, with structural integrity that compounds.</em></p>
</div>
</div>
</section>

<section className="section how-help">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">02 / How Digital Vikingz Helps</span>
<h2 className="h-display section-h2">What working with us actually changes.</h2>
</div>
<p className="section-intro">
<strong>Digital Vikingz</strong> isn't a content factory or a link broker. We're a <strong>semantic SEO architecture firm</strong> — and the businesses we work with experience six structural shifts inside their search and pipeline operations. These aren't promises. They're the outcomes the methodology produces when it's applied correctly.
      </p>
</div>
<div className="help-grid">
<div className="help-card">
<div className="help-card-icon">01</div>
<h3>You stop spending on content that doesn't compound.</h3>
<p>Every asset we publish reinforces the <strong>Central Entity</strong>. No more articles that rank briefly, drop, and need to be rewritten in 12 months.</p>
</div>
<div className="help-card">
<div className="help-card-icon">02</div>
<h3>Your authority survives algorithm updates.</h3>
<p>Sites built on <strong>entity architecture</strong> are structurally aligned with what Google's helpful content systems reward. Updates stop being existential events.</p>
</div>
<div className="help-card">
<div className="help-card-icon">03</div>
<h3>You become citable in AI search.</h3>
<p>ChatGPT, Perplexity, Claude, and Google's AI Overviews start quoting your site as a <strong>primary source</strong> — capturing the high-intent traffic competitors are losing.</p>
</div>
<div className="help-card">
<div className="help-card-icon">04</div>
<h3>Your topical authority becomes defensible.</h3>
<p>You don't compete for keywords anymore. You <strong>own the topic</strong>. New competitors entering your space have to climb past architectural authority — not just outrank a few pages.</p>
</div>
<div className="help-card">
<div className="help-card-icon">05</div>
<h3>SEO finally connects to revenue.</h3>
<p>We engineer <strong>bottom-funnel content clusters</strong> tied to qualified pipeline — not vanity traffic. Every quarter, the work justifies itself in pipeline numbers, not impression charts.</p>
</div>
<div className="help-card">
<div className="help-card-icon">06</div>
<h3>Your internal team gets to execute, not strategize.</h3>
<p>We deliver the architecture, the briefs, the system. Your in-house team executes against a <strong>structured blueprint</strong> instead of trying to invent strategy from scratch every month.</p>
</div>
</div>
</div>
</section>

<section className="section pillars-section">

<div className="semantic-graph-subtle" aria-hidden="true">
<svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<g>
<line className="graph-line" x1="200" y1="150" x2="500" y2="350"></line>
<line className="graph-line" x1="500" y1="350" x2="900" y2="200"></line>
<line className="graph-line" x1="900" y1="200" x2="1200" y2="450"></line>
<line className="graph-line" x1="500" y1="350" x2="700" y2="650"></line>
<line className="graph-line" x1="900" y1="200" x2="700" y2="650"></line>
<line className="graph-line" x1="200" y1="150" x2="100" y2="500"></line>
<line className="graph-line" x1="100" y1="500" x2="500" y2="350"></line>
</g>
<g>
<circle className="graph-node" cx="200" cy="150" r="3" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node" cx="500" cy="350" r="4" style={{animationDelay: "1s"}}></circle>
<circle className="graph-node" cx="900" cy="200" r="3" style={{animationDelay: "2s"}}></circle>
<circle className="graph-node" cx="1200" cy="450" r="3" style={{animationDelay: "3s"}}></circle>
<circle className="graph-node" cx="700" cy="650" r="3" style={{animationDelay: "4s"}}></circle>
<circle className="graph-node" cx="100" cy="500" r="3" style={{animationDelay: "5s"}}></circle>
</g>
</svg>
</div>
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">03 / The Framework</span>
<h2 className="h-display section-h2">Claim. Shield. Scale.</h2>
</div>
<p className="section-intro">
        Three operating principles. Three service tiers. <strong>One outcome</strong> — businesses that own their topic, defend that ownership against AI dilution and competitive pressure, and convert authority into measurable pipeline.
      </p>
</div>
<div className="pillars">
<div className="pillar">
<span className="pillar-num">PILLAR 01</span>
<h3 className="h-display">Claim</h3>
<div className="pillar-def">Establish topical authority through entity architecture.</div>
<p className="pillar-body">
          We map your <strong>Central Entity</strong>, design the topical hierarchy, and build the semantic foundation that lets your site rank for the topics that matter. Architecture is engineered before a single article is written.
        </p>
<ul className="pillar-services">
<li>Semantic SEO Architecture</li>
<li>Semantic Content Audit</li>
</ul>
</div>
<div className="pillar">
<span className="pillar-num">PILLAR 02</span>
<h3 className="h-display">Shield</h3>
<div className="pillar-def">Defend authority against AI dilution and competitor pressure.</div>
<p className="pillar-body">
          We optimize for citation in <strong>LLMs and AI search</strong>, reinforce entity signals across the open web, and ensure topical authority compounds — instead of eroding with every algorithm shift or competitor entry.
        </p>
<ul className="pillar-services">
<li>LLM & AI Search Visibility</li>
<li>Authority Link Building</li>
<li>Semantic Content Network</li>
</ul>
</div>
<div className="pillar">
<span className="pillar-num">PILLAR 03</span>
<h3 className="h-display">Scale</h3>
<div className="pillar-def">Convert authority into pipeline and revenue.</div>
<p className="pillar-body">
          We engineer query path coverage from awareness to conversion, attribute SEO output to <strong>pipeline impact</strong>, and expand topical clusters strategically — based on entity logic, not content calendars.
        </p>
<ul className="pillar-services">
<li>Semantic Content Production</li>
<li>Pipeline Attribution SEO</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section methodology" id="methodology">

<div className="semantic-graph-subtle" aria-hidden="true">
<svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<g>
<line className="graph-line" x1="1200" y1="180" x2="900" y2="380"></line>
<line className="graph-line" x1="900" y1="380" x2="500" y2="240"></line>
<line className="graph-line" x1="500" y1="240" x2="200" y2="450"></line>
<line className="graph-line" x1="900" y1="380" x2="700" y2="650"></line>
<line className="graph-line" x1="500" y1="240" x2="700" y2="650"></line>
<line className="graph-line" x1="200" y1="450" x2="1100" y2="600"></line>
</g>
<g>
<circle className="graph-node" cx="1200" cy="180" r="3" style={{animationDelay: "0.5s"}}></circle>
<circle className="graph-node" cx="900" cy="380" r="4" style={{animationDelay: "1.5s"}}></circle>
<circle className="graph-node" cx="500" cy="240" r="3" style={{animationDelay: "2.5s"}}></circle>
<circle className="graph-node" cx="200" cy="450" r="3" style={{animationDelay: "3.5s"}}></circle>
<circle className="graph-node" cx="700" cy="650" r="3" style={{animationDelay: "4.5s"}}></circle>
<circle className="graph-node" cx="1100" cy="600" r="3" style={{animationDelay: "5.5s"}}></circle>
</g>
</svg>
</div>
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">04 / The Methodology</span>
<h2 className="h-display section-h2">Built on a methodology, not a playbook.</h2>
</div>
<p className="section-intro">
<strong>Digital Vikingz</strong> runs methodology, not process. Every engagement is grounded in semantic SEO principles developed by <strong>Koray Tuğberk Gübür</strong> and proven across 200+ projects in our hands. These four principles separate authority-building work from generic SEO.
      </p>
</div>
<div className="methodology-banner">
<div className="methodology-banner-text">
<strong>Digital Vikingz</strong> operates as a Koray methodology agency — entity-first, predicate-clean, agreement-aware, and engineered for <strong>information gain</strong> on every published asset.
      </div>
<div className="methodology-banner-tag">Koray Methodology Aligned</div>
</div>
<div className="principles">
<div className="principle">
<span className="principle-num">PRINCIPLE 01</span>
<h3 className="h-display">Entity-first, <em>not keyword-first.</em></h3>
<p>Search systems index entities and the relationships between them. <strong>Digital Vikingz</strong> builds sites around the Central Entity and its supporting concepts, then attaches query coverage to that structure. Keywords become outputs of the architecture — not inputs to it. This is why the work survives core updates that reset other sites.</p>
</div>
<div className="principle">
<span className="principle-num">PRINCIPLE 02</span>
<h3 className="h-display">Source Term Vector <em>consistency.</em></h3>
<p>Every site has a vocabulary it speaks. When that vocabulary drifts across pages, search engines and AI systems lose confidence in the entity. We define <strong>Source Term Vectors</strong> at the architectural layer and enforce them across content, internal linking, and external signals — eliminating the semantic dilution that flatlines most sites.</p>
</div>
<div className="principle">
<span className="principle-num">PRINCIPLE 03</span>
<h3 className="h-display">AI visibility as a <em>structural property.</em></h3>
<p>Getting cited by ChatGPT, Perplexity, Claude, and Google's AI Overviews is not an afterthought optimization. It's a function of how cleanly your entity is defined, how consistent your predicates are, and how much <strong>information gain</strong> each page contributes. We engineer for AI citation at the architecture layer.</p>
</div>
<div className="principle">
<span className="principle-num">PRINCIPLE 04</span>
<h3 className="h-display">Information gain as a <em>publishing standard.</em></h3>
<p>Every page <strong>Digital Vikingz</strong> publishes earns its place in your topical map by adding something that doesn't already exist on the SERP. We don't summarize. We extend the topic, fill agreement-area gaps, and contribute new attribute coverage — which is exactly what helpful content systems and AI retrieval models reward.</p>
</div>
</div>

<div className="layer-stack-block" id="layerStack" data-state="building" aria-label="The 21-layer methodology framework">
<div className="ls-header">
<div className="ls-header-left">
<span className="ls-pill">
<span className="state-block state-building">Live · Stack</span>
<span className="state-block state-outcome">Stack · Complete</span>
</span>
<span className="ls-title">
<span className="state-block state-building">Compiling: <strong>21-Layer Methodology Framework</strong></span>
<span className="state-block state-outcome">Built: <strong>21-Layer Methodology · all signed off</strong></span>
</span>
</div>
<button type="button" className="ls-toggle-btn" data-toggle="layerStack" aria-label="Toggle stack state">
<span className="toggle-dot"></span>
<span className="state-block state-building">See built state</span>
<span className="state-block state-outcome">Back to building</span>
</button>
</div>
<div className="ls-phases">

<div className="ls-phase">
<div className="ls-phase-head">
<span className="ls-phase-tag">Phase 01 · Layers 01–07</span>
<div className="ls-phase-name"><em>Foundation</em></div>
</div>
<ul className="ls-layer-list">
<li className="ls-layer" style={{animationDelay: "0.05s"}}><span className="ls-layer-num">01</span><span className="ls-layer-name">Central Entity Definition</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.12s"}}><span className="ls-layer-num">02</span><span className="ls-layer-name">Entity Attribute Inventory</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.19s"}}><span className="ls-layer-num">03</span><span className="ls-layer-name">Source Term Vector Spec</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.26s"}}><span className="ls-layer-num">04</span><span className="ls-layer-name">Predicate Framework</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.33s"}}><span className="ls-layer-num">05</span><span className="ls-layer-name">Buyer Query Mapping</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.40s"}}><span className="ls-layer-num">06</span><span className="ls-layer-name">Competitive Positioning</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.47s"}}><span className="ls-layer-num">07</span><span className="ls-layer-name">Agreement Area Synthesis</span><span className="ls-layer-status"></span></li>
</ul>
</div>

<div className="ls-phase">
<div className="ls-phase-head">
<span className="ls-phase-tag">Phase 02 · Layers 08–14</span>
<div className="ls-phase-name"><em>Architecture</em></div>
</div>
<ul className="ls-layer-list">
<li className="ls-layer" style={{animationDelay: "0.55s"}}><span className="ls-layer-num">08</span><span className="ls-layer-name">Topical Map Construction</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.62s"}}><span className="ls-layer-num">09</span><span className="ls-layer-name">Cluster Pillar Identification</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.69s"}}><span className="ls-layer-num">10</span><span className="ls-layer-name">Internal Linking Architecture</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.76s"}}><span className="ls-layer-num">11</span><span className="ls-layer-name">Anchor Text Governance</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.83s"}}><span className="ls-layer-num">12</span><span className="ls-layer-name">Schema & Structured Data</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.90s"}}><span className="ls-layer-num">13</span><span className="ls-layer-name">URL Hierarchy & Structure</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "0.97s"}}><span className="ls-layer-num">14</span><span className="ls-layer-name">Technical SEO Specification</span><span className="ls-layer-status"></span></li>
</ul>
</div>

<div className="ls-phase">
<div className="ls-phase-head">
<span className="ls-phase-tag">Phase 03 · Layers 15–21</span>
<div className="ls-phase-name"><em>Production-Ready</em></div>
</div>
<ul className="ls-layer-list">
<li className="ls-layer" style={{animationDelay: "1.05s"}}><span className="ls-layer-num">15</span><span className="ls-layer-name">Editorial Voice & Tone</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "1.12s"}}><span className="ls-layer-num">16</span><span className="ls-layer-name">Banned Phrase Registry</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "1.19s"}}><span className="ls-layer-num">17</span><span className="ls-layer-name">Information Gain Standards</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "1.26s"}}><span className="ls-layer-num">18</span><span className="ls-layer-name">E-A-V Brief Structure</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "1.33s"}}><span className="ls-layer-num">19</span><span className="ls-layer-name">Publishing Sequence Logic</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "1.40s"}}><span className="ls-layer-num">20</span><span className="ls-layer-name">Distribution Reinforcement</span><span className="ls-layer-status"></span></li>
<li className="ls-layer" style={{animationDelay: "1.47s"}}><span className="ls-layer-num">21</span><span className="ls-layer-name">Attribution Model Spec</span><span className="ls-layer-status"></span></li>
</ul>
</div>
</div>
<div className="ls-foot">
<span className="state-block state-building">Every layer is <strong>built and signed off</strong> before content production begins · Skipping layers collapses authority compounding</span>
<span className="state-block state-outcome"><strong>All 21 layers</strong> · structurally complete · authority compounds without further architectural intervention</span>
</div>
<div className="ls-outcome-banner state-block state-outcome">
        Outcome state · <strong>21 / 21 layers</strong> built · authority infrastructure complete · ready for production cycles
      </div>
</div>
</div>
</section>

<section className="section inside" id="inside">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">05 / Inside the System</span>
<h2 className="h-display section-h2">Seven services. <em>Engineered to compound.</em></h2>
</div>
<p className="section-intro">
        Every service maps to a tier in the Claim · Shield · Scale framework. Each one is fully scoped — you know exactly what's <strong>inside the deliverable</strong> before you commit. Most clients begin with an audit or architecture engagement and expand outward as the system matures.
      </p>
</div>

<div className="service-pipeline-block" aria-label="Service pipeline flow across the three tiers">
<div className="sp-header">
<div className="sp-header-left">
<span className="sp-pill">Live · Pipeline</span>
<span className="sp-title">Engagement flow: <strong>Claim → Shield → Scale</strong></span>
</div>
<div className="sp-stats">
<div className="sp-stat">
<span className="sp-stat-num">7</span>
<span className="sp-stat-label">Services</span>
</div>
<div className="sp-stat">
<span className="sp-stat-num">3</span>
<span className="sp-stat-label">Tiers</span>
</div>
<div className="sp-stat">
<span className="sp-stat-num">21</span>
<span className="sp-stat-label">Layers</span>
</div>
</div>
</div>
<div className="sp-flow">
<div className="sp-flow-inner">

<div className="sp-tier">
<div className="sp-tier-head">
<span className="sp-tier-name"><em>Claim</em></span>
<span className="sp-tier-count">2 · Foundation</span>
</div>
<div className="sp-tier-services">
<div className="sp-service">
<span className="sp-service-num">01</span>
<span className="sp-service-name">Semantic SEO Architecture</span>
<span className="sp-service-status"></span>
</div>
<div className="sp-service">
<span className="sp-service-num">02</span>
<span className="sp-service-name">Semantic Content Audit</span>
<span className="sp-service-status"></span>
</div>
</div>
</div>
<div className="sp-arrow">
<div className="sp-arrow-line"></div>
<span className="sp-arrow-head">▸</span>
</div>

<div className="sp-tier">
<div className="sp-tier-head">
<span className="sp-tier-name"><em>Shield</em></span>
<span className="sp-tier-count">3 · Visibility</span>
</div>
<div className="sp-tier-services">
<div className="sp-service">
<span className="sp-service-num">03</span>
<span className="sp-service-name">LLM & AI Search Visibility</span>
<span className="sp-service-status"></span>
</div>
<div className="sp-service">
<span className="sp-service-num">04</span>
<span className="sp-service-name">Authority Link Building</span>
<span className="sp-service-status"></span>
</div>
<div className="sp-service">
<span className="sp-service-num">05</span>
<span className="sp-service-name">Semantic Content Network</span>
<span className="sp-service-status"></span>
</div>
</div>
</div>
<div className="sp-arrow">
<div className="sp-arrow-line"></div>
<span className="sp-arrow-head">▸</span>
</div>

<div className="sp-tier">
<div className="sp-tier-head">
<span className="sp-tier-name"><em>Scale</em></span>
<span className="sp-tier-count">2 · Compound</span>
</div>
<div className="sp-tier-services">
<div className="sp-service">
<span className="sp-service-num">06</span>
<span className="sp-service-name">Semantic Content Production</span>
<span className="sp-service-status"></span>
</div>
<div className="sp-service">
<span className="sp-service-num">07</span>
<span className="sp-service-name">Pipeline Attribution SEO</span>
<span className="sp-service-status"></span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="inside-tier">
<div className="inside-tier-head">
<div className="inside-tier-name h-display">Claim</div>
<div className="inside-tier-tagline">Authority Foundation · The Strategic Layer</div>
</div>
<div className="inside-services">
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 01</div>
<h4 className="h-display">Semantic SEO Architecture</h4>
<div className="inside-card-desc">The strategic foundation — your <strong>12-month authority blueprint</strong>. Delivered as a complete system your team or ours can execute against.</div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>Topical map blueprint</li>
<li>Central Entity definition</li>
<li>Source Term Vector specification</li>
<li>Entity-attribute matrix</li>
<li>Internal linking architecture</li>
<li>Publishing roadmap (12-month)</li>
<li>Technical entity infrastructure spec</li>
</ul>
</div>
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 02</div>
<h4 className="h-display">Semantic Content Audit</h4>
<div className="inside-card-desc">A diagnostic-only entry point. <strong>Fixed scope, written deliverable</strong> — designed to assess fit before either side commits to a longer engagement.</div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>Entity coverage analysis</li>
<li>Predicate consistency review</li>
<li>Semantic dilution diagnostic</li>
<li>AI citation readiness assessment</li>
<li>Competitive entity gap analysis</li>
<li>Prioritized issue map (DOCX)</li>
</ul>
</div>
</div>
</div>

<div className="inside-tier">
<div className="inside-tier-head">
<div className="inside-tier-name h-display">Shield</div>
<div className="inside-tier-tagline">Authority Defense · The Visibility Layer</div>
</div>
<div className="inside-services">
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 03</div>
<h4 className="h-display">LLM & AI Search Visibility</h4>
<div className="inside-card-desc">Optimization for <strong>citation in ChatGPT, Perplexity, Claude, Gemini, and AI Overviews.</strong> Engineered at the structural layer — not bolted on after publishing.</div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>AI citation gap analysis</li>
<li>Entity definition tuning</li>
<li>Predicate signal optimization</li>
<li>Schema and markup architecture</li>
<li>Author entity establishment</li>
<li>AI-native content engineering</li>
</ul>
</div>
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 04</div>
<h4 className="h-display">Authority Link Building</h4>
<div className="inside-card-desc"><strong>Entity-reinforcing</strong> link acquisition. Every link selected to strengthen your Central Entity in the eyes of search systems — not chase DR scores.</div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>Entity-aligned domain prospecting</li>
<li>Topical relevance scoring</li>
<li>Outreach and acquisition</li>
<li>Anchor text governance</li>
<li>Link velocity calibration</li>
<li>Monthly link reports</li>
</ul>
</div>
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 05</div>
<h4 className="h-display">Semantic Content Network</h4>
<div className="inside-card-desc">Entity reinforcement through <strong>external authority signals</strong> — guest publications, syndicated content, and citations across topically aligned domains.</div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>Authority publication strategy</li>
<li>Guest publication placements</li>
<li>Third-party citation engineering</li>
<li>Co-occurrence pattern reinforcement</li>
<li>Brand entity recognition signals</li>
</ul>
</div>
</div>
</div>

<div className="inside-tier">
<div className="inside-tier-head">
<div className="inside-tier-name h-display">Scale</div>
<div className="inside-tier-tagline">Authority Production · The Pipeline Layer</div>
</div>
<div className="inside-services">
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 06</div>
<h4 className="h-display">Semantic Content Production</h4>
<div className="inside-card-desc">The execution engine. Briefs, content, configuration, internal linking, and publishing sequence — all governed by your <strong>topical map and Source Term Vector.</strong></div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>Brief creation (Koray-aligned)</li>
<li>Long-form content writing</li>
<li>On-page SEO configuration</li>
<li>Internal linking implementation</li>
<li>Publishing sequence governance</li>
<li>Editorial QA and revisions</li>
</ul>
</div>
<div className="inside-card">
<div className="inside-card-head">
<div className="inside-card-num">SERVICE 07</div>
<h4 className="h-display">Pipeline Attribution SEO</h4>
<div className="inside-card-desc">SEO tied to <strong>revenue, not vanity metrics.</strong> Bottom-funnel content engineering, conversion-intent clusters, and pipeline-level reporting — built for founder-led businesses.</div>
</div>
<div className="inside-list-label">Inside the system</div>
<ul className="inside-list">
<li>Bottom-funnel content engineering</li>
<li>Buyer query path mapping</li>
<li>Conversion-intent content clusters</li>
<li>Attribution model setup</li>
<li>Pipeline-to-SEO reporting</li>
</ul>
</div>
</div>
</div>
</div>
</section>

<section className="section industries" id="industries">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">06 / Industries</span>
<h2 className="h-display section-h2">Where the methodology has been <em>proven.</em></h2>
</div>
<p className="section-intro">
        Semantic SEO works differently in every industry. Buyer query paths, entity hierarchies, predicate vocabularies, and conversion patterns shift dramatically across verticals. <strong>Digital Vikingz</strong> has refined the methodology across these primary industries — and we map your specific page architecture to the buyer behavior of your category.
      </p>
</div>
<div className="industries-grid">

<div className="industry-card">
<div className="industry-card-head">
<div className="industry-card-title h-display">Sa<em>aS</em> & B2B Software</div>
<div className="industry-card-num">VERTICAL 01</div>
</div>
<div className="industry-card-body">
<div className="industry-pages-label">Page architecture inside this vertical</div>
<div className="industry-pages">
<span>Feature pages</span>
<span>Comparison guides</span>
<span>Alternatives pages</span>
<span>Integration guides</span>
<span>Pricing pages</span>
<span>Landing pages</span>
<span>Use case pages</span>
<span>Knowledge base articles</span>
<span>Case studies</span>
<span>Roundup articles</span>
</div>
</div>
</div>

<div className="industry-card">
<div className="industry-card-head">
<div className="industry-card-title h-display"><em>E</em>-commerce & Retail</div>
<div className="industry-card-num">VERTICAL 02</div>
</div>
<div className="industry-card-body">
<div className="industry-pages-label">Page architecture inside this vertical</div>
<div className="industry-pages">
<span>Product pages</span>
<span>Category pages</span>
<span>Collection pages</span>
<span>Buying guides</span>
<span>Product comparisons</span>
<span>Review pages</span>
<span>Best-of guides</span>
<span>Brand pages</span>
<span>FAQ hubs</span>
</div>
</div>
</div>

<div className="industry-card">
<div className="industry-card-head">
<div className="industry-card-title h-display"><em>H</em>ealthcare & Medical</div>
<div className="industry-card-num">VERTICAL 03</div>
</div>
<div className="industry-card-body">
<div className="industry-pages-label">Page architecture inside this vertical</div>
<div className="industry-pages">
<span>Service pages</span>
<span>Condition guides</span>
<span>Treatment overviews</span>
<span>Location pages</span>
<span>Provider profiles</span>
<span>Patient resources</span>
<span>Procedure explainers</span>
<span>FAQ hubs</span>
</div>
</div>
</div>

<div className="industry-card">
<div className="industry-card-head">
<div className="industry-card-title h-display"><em>F</em>inance & Fintech</div>
<div className="industry-card-num">VERTICAL 04</div>
</div>
<div className="industry-card-body">
<div className="industry-pages-label">Page architecture inside this vertical</div>
<div className="industry-pages">
<span>Product pages</span>
<span>Comparison guides</span>
<span>Rate comparisons</span>
<span>Educational content</span>
<span>Regulatory guides</span>
<span>Trust & security pages</span>
<span>Calculator pages</span>
<span>Insurance explainers</span>
</div>
</div>
</div>

<div className="industry-card">
<div className="industry-card-head">
<div className="industry-card-title h-display"><em>R</em>eal Estate & Property</div>
<div className="industry-card-num">VERTICAL 05</div>
</div>
<div className="industry-card-body">
<div className="industry-pages-label">Page architecture inside this vertical</div>
<div className="industry-pages">
<span>Property listings</span>
<span>Neighborhood guides</span>
<span>Market reports</span>
<span>Buyer guides</span>
<span>Seller guides</span>
<span>Mortgage explainers</span>
<span>Investment guides</span>
<span>Location pages</span>
<span>Agent profiles</span>
</div>
</div>
</div>

<div className="industry-card">
<div className="industry-card-head">
<div className="industry-card-title h-display"><em>A</em>gencies (White-Label)</div>
<div className="industry-card-num">VERTICAL 06</div>
</div>
<div className="industry-card-body">
<div className="industry-pages-label">White-label scope inside this vertical</div>
<div className="industry-pages">
<span>Semantic SEO architecture</span>
<span>Topical maps</span>
<span>Content briefs</span>
<span>Long-form writing</span>
<span>Audit reports</span>
<span>AI visibility programs</span>
<span>Link building</span>
<span>Client-facing deliverables</span>
</div>
</div>
</div>
</div>
<div className="industry-extras">
<p>Plus deep work in <strong>local services, professional services, education, legal, automotive, manufacturing, hospitality, and content publishing</strong> — across copywriting, blog production, conversion content, and full topical authority programs.</p>
</div>
</div>
</section>

<section className="section process">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">07 / The Process</span>
<h2 className="h-display section-h2">How engagements run.</h2>
</div>
<p className="section-intro">
        Five stages. Sequenced so each one earns the next. <strong>Digital Vikingz</strong> doesn't sell month-to-month tactical work — we engineer outcomes across cycles. Most engagements run <strong>6 to 18 months</strong>, with attribution layered in from phase one.
      </p>
</div>
<div className="process-stages">
<div className="process-stage">
<div className="process-marker"></div>
<span className="process-num">STAGE 01</span>
<h4 className="h-display">Semantic Audit</h4>
<p>Diagnose entity coverage, predicate consistency, semantic dilution, AI visibility gaps. Output: prioritized issue map.</p>
</div>
<div className="process-stage">
<div className="process-marker"></div>
<span className="process-num">STAGE 02</span>
<h4 className="h-display">Architecture</h4>
<p>Design topical map, Source Term Vector, entity infrastructure, and content sequence. Output: 12-month blueprint.</p>
</div>
<div className="process-stage">
<div className="process-marker"></div>
<span className="process-num">STAGE 03</span>
<h4 className="h-display">Production</h4>
<p>Execute briefs, content, configuration, internal linking, and authority link reinforcement against the architecture.</p>
</div>
<div className="process-stage">
<div className="process-marker"></div>
<span className="process-num">STAGE 04</span>
<h4 className="h-display">Distribution</h4>
<p>Amplify across AI search, LLMs, and the open authority network. Engineer entity recognition at the citation layer.</p>
</div>
<div className="process-stage">
<div className="process-marker"></div>
<span className="process-num">STAGE 05</span>
<h4 className="h-display">Attribution</h4>
<p>Measure impact on qualified pipeline — not vanity metrics. Tie rankings, citations, and traffic to revenue outcomes.</p>
</div>
</div>

<div className="stage-tracker-block" id="stageTracker" data-state="building" aria-label="Live stage progression tracker">
<div className="st-header">
<div className="st-header-left">
<span className="st-pill">
<span className="state-block state-building">Live · Tracker</span>
<span className="state-block state-outcome">Tracker · Complete</span>
</span>
<span className="st-label">
<span className="state-block state-building">Engagement flow: <strong>Audit → Architecture → Production → Distribution → Attribution</strong></span>
<span className="state-block state-outcome">All 5 stages: <strong>complete · authority cycle closed</strong></span>
</span>
</div>
<button type="button" className="st-toggle-btn" data-toggle="stageTracker" aria-label="Toggle tracker state">
<span className="toggle-dot"></span>
<span className="state-block state-building">See completion</span>
<span className="state-block state-outcome">Back to live</span>
</button>
</div>
<div className="st-tracker">
<div className="st-rail" aria-hidden="true">
<div className="st-rail-cell"></div>
<div className="st-rail-cell"></div>
<div className="st-rail-cell"></div>
<div className="st-rail-cell"></div>
<div className="st-rail-cell"></div>
</div>
<div className="st-stages">
<div className="st-stage">
<span className="st-stage-num">Stage 01</span>
<div className="st-stage-name">Semantic <em>Audit</em></div>
<div className="st-stage-meta">diagnostic</div>
<div className="st-stage-status">
<span className="st-stage-status-dot"></span>
<span className="state-block state-building">Diagnostic</span>
<span className="state-block state-outcome">✓ Complete</span>
</div>
</div>
<div className="st-stage">
<span className="st-stage-num">Stage 02</span>
<div className="st-stage-name"><em>Architecture</em></div>
<div className="st-stage-meta">strategic</div>
<div className="st-stage-status">
<span className="st-stage-status-dot"></span>
<span className="state-block state-building">Foundation</span>
<span className="state-block state-outcome">✓ Complete</span>
</div>
</div>
<div className="st-stage is-active">
<span className="st-stage-num">Stage 03</span>
<div className="st-stage-name"><em>Production</em></div>
<div className="st-stage-meta">Phase cycles</div>
<div className="st-stage-status">
<span className="st-stage-status-dot"></span>
<span className="state-block state-building">Running</span>
<span className="state-block state-outcome">✓ 84 nodes</span>
</div>
</div>
<div className="st-stage">
<span className="st-stage-num">Stage 04</span>
<div className="st-stage-name"><em>Distribution</em></div>
<div className="st-stage-meta">monthly cycles</div>
<div className="st-stage-status">
<span className="st-stage-status-dot"></span>
<span className="state-block state-building">Reinforcement</span>
<span className="state-block state-outcome">✓ 247 cites</span>
</div>
</div>
<div className="st-stage">
<span className="st-stage-num">Stage 05</span>
<div className="st-stage-name"><em>Attribution</em></div>
<div className="st-stage-meta">quarterly</div>
<div className="st-stage-status">
<span className="st-stage-status-dot"></span>
<span className="state-block state-building">Reporting</span>
<span className="state-block state-outcome">✓ Pipeline</span>
</div>
</div>
</div>
</div>

<div className="st-outcome-banner state-block state-outcome">
<span className="st-outcome-banner-tag">14-month engagement · representative outcome</span>
<div className="st-outcome-banner-text">All 5 stages cleared · <strong>84 entity-clean nodes shipped</strong> · <strong>247 AI citations earned</strong> · pipeline attribution mapped quarter over quarter · authority compounds without further architectural intervention.</div>
</div>
<div className="st-foot">
<span className="st-foot-text">
<span className="state-block state-building">Each stage <strong>earns the next</strong> · No skipping · No parallelization</span>
<span className="state-block state-outcome">Cycle closed · <strong>authority self-sustains</strong> · ready for cluster expansion</span>
</span>
<a href="/build-process" className="st-foot-cta">See full Build Process →</a>
</div>
</div>
</div>
</section>

<section className="section transformation">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">08 / The Transformation</span>
<h2 className="h-display section-h2">The state of your business — <em>before and after.</em></h2>
</div>
<p className="section-intro">
        This isn't a comparison to other agencies. It's a description of how the operational reality of your search and content function shifts when <strong>Digital Vikingz</strong> architects the system. The transformation is observable inside the business — usually within the first two quarters.
      </p>
</div>
<div className="transformation-grid">
<div className="transformation-col">
<span className="transformation-tag">Before · The Current State</span>
<h3 className="h-display">Search and content as a cost center.</h3>
<ul className="transformation-list">
<li>Rankings reset or slip after every algorithm update — last quarter's gains get repriced.</li>
<li>Content volume increases monthly, but topical authority stays flat or fragments.</li>
<li>The Central Entity is unclear — pages dilute the brand instead of reinforcing it.</li>
<li>AI search engines ignore the site. Competitors get cited in ChatGPT and Perplexity instead.</li>
<li>SEO output is tracked in impressions and clicks, with no line tying it to qualified pipeline.</li>
<li>Internal teams build strategy from scratch every quarter, with no architectural anchor.</li>
</ul>
</div>
<div className="transformation-col after">
<span className="transformation-tag">After · With Digital Vikingz</span>
<h3 className="h-display">Search and content as <em>a compounding asset.</em></h3>
<ul className="transformation-list">
<li>Rankings hold and strengthen across update cycles — authority compounds instead of resetting.</li>
<li>Content output is engineered for entity reinforcement. Every asset adds to authority.</li>
<li>The <strong>Central Entity is claimed and defended.</strong> Every page strengthens the topical map.</li>
<li>The site is cited as a primary source by ChatGPT, Perplexity, Claude, Gemini, and AI Overviews.</li>
<li>SEO output is attributed to <strong>qualified pipeline</strong> — every cycle justifies itself in revenue terms.</li>
<li>Internal teams execute against a structured 12-month blueprint, not a blank page.</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section results" id="results">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">09 / Real Results</span>
<h2 className="h-display section-h2">Methodology, executed.</h2>
</div>
<p className="section-intro">
        Authority is claimed through evidence — not adjectives. The work below represents semantic SEO programs <strong>Digital Vikingz</strong> has delivered for businesses across SaaS, e-commerce, professional services, healthcare, local services, and content publishing.
      </p>
</div>
<div className="results-stats">
<div className="results-stat">
<div className="results-stat-num">200<span>+</span></div>
<div className="results-stat-label">Projects across<br />40+ industries</div>
</div>
<div className="results-stat">
<div className="results-stat-num">6<span>+</span></div>
<div className="results-stat-label">Years applying<br />Koray methodology</div>
</div>
<div className="results-stat">
<div className="results-stat-num">15</div>
<div className="results-stat-label">Specialist team<br />in Bahawalpur, PK</div>
</div>
<div className="results-stat">
<div className="results-stat-num">5</div>
<div className="results-stat-label">Country footprint<br />US · UK · CA · AU · DE</div>
</div>
</div>
<div className="case-studies">
<article className="case">
<div className="case-header">
<div className="case-industry">Healthcare · Patient Education</div>
<div className="case-client h-display">Diabetics Trust</div>
</div>
<div className="case-body">
<p className="case-result">Topical authority architecture for the <strong>diabetes patient education vertical</strong> — entity-driven content clusters, condition guides, and information-gain content engineered for high-stakes healthcare buyer queries.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">YMYL</div>
<div className="case-metric-label">Health Authority</div>
</div>
<div>
<div className="case-metric-num">E-E-A-T</div>
<div className="case-metric-label">Compliance Standard</div>
</div>
</div>
</div>
</article>
<article className="case">
<div className="case-header">
<div className="case-industry">SaaS · Telecom</div>
<div className="case-client h-display">Mytello</div>
</div>
<div className="case-body">
<p className="case-result">Semantic content engineering for <strong>international calling vertical</strong> — Source Term Vector definition, comparison cluster architecture, and predicate-clean writing across high-conversion buyer queries.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">B2C</div>
<div className="case-metric-label">Telecom Authority</div>
</div>
<div>
<div className="case-metric-num">EU+US</div>
<div className="case-metric-label">Market Coverage</div>
</div>
</div>
</div>
</article>
<article className="case">
<div className="case-header">
<div className="case-industry">SaaS · Aviation</div>
<div className="case-client h-display">Crewsim</div>
</div>
<div className="case-body">
<p className="case-result">Topical authority program for the <strong>aviation training simulator</strong> category — entity-driven feature pages, comparison architecture, and bottom-funnel content engineered for high-intent commercial pilot queries.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">Niche</div>
<div className="case-metric-label">B2B Aviation</div>
</div>
<div>
<div className="case-metric-num">BOFU</div>
<div className="case-metric-label">Content Architecture</div>
</div>
</div>
</div>
</article>
<article className="case">
<div className="case-header">
<div className="case-industry">SaaS · Consulting Tech</div>
<div className="case-client h-display">Prepmatter</div>
</div>
<div className="case-body">
<p className="case-result">Bottom-funnel content architecture for <strong>BCG CCA and consulting platform comparison clusters.</strong> Founder-aligned semantic content engineered for sophisticated B2B buyer queries and AI consultation citation.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">BOFU</div>
<div className="case-metric-label">Content Engineering</div>
</div>
<div>
<div className="case-metric-num">B2B</div>
<div className="case-metric-label">SaaS Authority</div>
</div>
</div>
</div>
</article>
<article className="case">
<div className="case-header">
<div className="case-industry">Personal Brand · Author Platform</div>
<div className="case-client h-display">AJ Kumar</div>
</div>
<div className="case-body">
<p className="case-result">Author-led content platform for an <strong>entrepreneurial thought leader</strong> — semantic content production, technical SEO diagnostics, and CMS migration governance to support compounding personal-brand authority across a high-velocity publishing schedule.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">Author</div>
<div className="case-metric-label">Entity Establishment</div>
</div>
<div>
<div className="case-metric-num">CMS</div>
<div className="case-metric-label">Migration Support</div>
</div>
</div>
</div>
</article>
<article className="case">
<div className="case-header">
<div className="case-industry">Boating Education · USA</div>
<div className="case-client h-display">CFL Boating</div>
</div>
<div className="case-body">
<p className="case-result">Topical authority program for the <strong>Florida boating safety and education vertical</strong> — semantic content clusters built around licensing, safety, and seasonal boating queries with state-specific entity infrastructure.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">Local</div>
<div className="case-metric-label">FL Authority</div>
</div>
<div>
<div className="case-metric-num">Niche</div>
<div className="case-metric-label">Boating Education</div>
</div>
</div>
</div>
</article>
<article className="case">
<div className="case-header">
<div className="case-industry">Hospitality · Destination</div>
<div className="case-client h-display">World Springs</div>
</div>
<div className="case-body">
<p className="case-result">Semantic SEO program for a <strong>destination wellness and hot springs venue</strong> — entity architecture spanning experience, location, and hospitality query paths to capture high-intent travel research traffic.</p>
<div className="case-metrics">
<div>
<div className="case-metric-num">B2C</div>
<div className="case-metric-label">Destination Travel</div>
</div>
<div>
<div className="case-metric-num">Multi</div>
<div className="case-metric-label">Query Path Cluster</div>
</div>
</div>
</div>
</article>
</div>
</div>
</section>

<section className="section rankings" id="rankings">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">10 / Real Rankings</span>
<h2 className="h-display section-h2">Live Search Console data. <em>Not edited.</em></h2>
</div>
<p className="section-intro">
        Most agencies show case study graphics. <strong>Digital Vikingz</strong> shows the actual Google Search Console panels — clicks, impressions, position, and the full 16-month curve. The screenshots below are pulled from real client properties spanning <strong>SaaS, healthcare, e-commerce, local services, IT, B2B, and content publishing</strong>. Different industries. Same methodology. Same compounding pattern.
      </p>
</div>
<div className="rankings-intro-banner">
<div className="rankings-intro-banner-icon">✓</div>
<div className="rankings-intro-banner-text">
        Every screenshot below is a <strong>direct GSC export</strong> from a Digital Vikingz client property — not a graphic, not a recreation, not a marketing chart. The numbers are what Google reports.
      </div>
</div>

<div className="rankings-tier">
<div className="rankings-tier-head">
<span className="rankings-tier-num">TIER 01</span>
<h3 className="rankings-tier-title">Established sites — <em>massive organic scale.</em></h3>
</div>
<div className="rankings-grid">
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">Healthcare · 16 Months</span>
<span className="rank-card-tag">Flagship</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/Health_website_SEO.png" alt="Healthcare site GSC: 105K clicks, 3.19M impressions, 3.3% CTR, position 15.4" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">Healthcare authority site</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">703K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">33.7M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">2.1%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">10.1</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">IT Services · 16 Months</span>
<span className="rank-card-tag">Scale</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/433.png" alt="IT services site GSC: 31.6K clicks, 3.44M impressions, position 29.8" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">IT services authority site</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">433K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">15.6M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">2.8%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">29.5</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">Content Publishing · 16 Months</span>
<span className="rank-card-tag">Scale</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/Started_SEO_for_IT.png" alt="Content publishing site GSC: 31.9K clicks, 7.06M impressions, position 11.9" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">Content publishing authority site</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">87.6K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">1.66M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">5.3%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">14.1</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
</div>
</div>

<div className="rankings-tier">
<div className="rankings-tier-head">
<span className="rankings-tier-num">TIER 02</span>
<h3 className="rankings-tier-title">Mid-scale — <em>strong, compounding programs.</em></h3>
</div>
<div className="rankings-grid">
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">Local Services · 16 Months</span>
<span className="rank-card-tag">Solid</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/Blogging_SEO.png" alt="Local business site GSC: 24.1K clicks, 524K impressions, 4.6% CTR, position 21.9" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">Local business authority site</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">60.8K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">1.43M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">4.3%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">9.8</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">B2B SaaS · 16 Months</span>
<span className="rank-card-tag">Solid</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/58k.png" alt="B2B SaaS site GSC: 13.8K clicks, 463K impressions, 3% CTR, position 26.9" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">B2B SaaS authority site</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">58.2K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">6.29M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">0.9%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">19.8</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">E-commerce · 16 Months</span>
<span className="rank-card-tag">Solid</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/53k.png" alt="E-commerce site GSC: 2.83K clicks, 743K impressions, position 45.4" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">Diamond ring e-commerce site</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">53.3K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">2.97M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">1.8%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">27.8</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
</div>
</div>

<div className="rankings-tier">
<div className="rankings-tier-head">
<span className="rankings-tier-num">TIER 03</span>
<h3 className="rankings-tier-title">Newer engagements — <em>visible compounding curves.</em></h3>
</div>
<div className="rankings-grid">
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">Local Services · Recent</span>
<span className="rank-card-tag">Growth</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/23k.png" alt="Local services site GSC growth from zero to 2.54K clicks, 223K impressions" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">Local services — zero to traction</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">23.9K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">2.37M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">1%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">32.4</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">Tourism · Recent</span>
<span className="rank-card-tag">Growth</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/21k.png" alt="Bike rental tourism site GSC growth: 1.75K clicks, 41.7K impressions" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">Bike rental — clean upward curve</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">21.8K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">2.5M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">0.9%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">20.9</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
<article className="rank-card">
<div className="rank-card-head">
<span className="rank-card-industry">Content Publishing · Recent</span>
<span className="rank-card-tag">New Site</span>
</div>
<div className="rank-card-image">
<img loading="lazy" decoding="async" src="/images/rankings/19k.png" alt="New blogging site GSC: 220 clicks, 62.3K impressions, explosive recent growth" />
</div>
<div className="rank-card-body">
<div className="rank-card-title">New blog — explosive recent growth</div>
<div className="rank-card-metrics">
<div>
<div className="rank-metric-num">19.9K</div>
<div className="rank-metric-label">Total Clicks</div>
</div>
<div>
<div className="rank-metric-num">6.77M</div>
<div className="rank-metric-label">Impressions</div>
</div>
<div>
<div className="rank-metric-num">0.3%</div>
<div className="rank-metric-label">Avg CTR</div>
</div>
<div>
<div className="rank-metric-num">14.3</div>
<div className="rank-metric-label">Avg Position</div>
</div>
</div>
</div>
</article>
</div>
</div>

<div className="rankings-tier">
<div className="rankings-tier-head">
<span className="rankings-tier-num">TIER 04</span>
<h3 className="rankings-tier-title">More verticals — <em>same methodology, different categories.</em></h3>
</div>
<div className="rankings-grid-compact">
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">Service Industry</span>
<div className="rank-card-compact-num">15.6K<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/15k.png" alt="Digital service site GSC: 2.19K clicks, 477K impressions" />
</div>
</article>
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">Beauty · Local</span>
<div className="rank-card-compact-num">14.5K<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/14k.png" alt="Local hair oil brand GSC: 2.01K clicks, 4.7% CTR" />
</div>
</article>
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">Pro Services</span>
<div className="rank-card-compact-num">12.5K<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/12k.png" alt="Service authority site GSC: 1.53K clicks, 165K impressions" />
</div>
</article>
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">Tourism · Local</span>
<div className="rank-card-compact-num">7.74K<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/7k.png" alt="Local boating tourism site GSC: 432 clicks, 14.6K impressions" />
</div>
</article>
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">E-commerce</span>
<div className="rank-card-compact-num">3.71<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/3.7k.png" alt="LED lighting e-commerce site GSC: 132 clicks, 43.9K impressions" />
</div>
</article>
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">Real Estate</span>
<div className="rank-card-compact-num">3.16k<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/3.1k.png" alt="Real estate site GSC: 32 clicks, 5.83K impressions, position 15.6" />
</div>
</article>
<article className="rank-card-compact">
<div className="rank-card-compact-head">
<span className="rank-card-compact-industry">Wedding · Local</span>
<div className="rank-card-compact-num">2.66K<span>clicks</span></div>
</div>
<div className="rank-card-compact-image">
<img loading="lazy" decoding="async" src="/images/rankings/2.6k.png" alt="Wedding services site GSC: 18 clicks, 2.13K impressions, recently launched" />
</div>
</article>
<article className="rank-card-compact" style={{display: "flex", alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", borderColor: "var(--accent)", minHeight: "240px"}}>
<div style={{padding: "24px", textAlign: "center"}}>
<div style={{fontFamily: "var(--display)", fontSize: "32px", fontWeight: "500", color: "var(--accent)", lineHeight: "1", marginBottom: "8px", letterSpacing: "-0.02em"}}>50 +</div>
<div style={{fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-2)", letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: "1.5"}}>More verticals across<br />40+ industries served</div>
</div>
</article>
</div>
</div>
<div className="rankings-disclaimer">
<p>Screenshots are anonymized for client confidentiality. <span>Full case context, traffic-to-pipeline attribution, and methodology details</span> are shared on the strategy call.</p>
</div>
</div>
</section>











<section className="feedback-section">
<div className="container">
<h2 className="heading">Client <span>Feedback</span></h2>

<div className="slider desktop-slider">
<div className="track" id="desktopTrack"></div>
</div>
<div className="controls desktop-controls">
<button>‹</button>
<button>›</button>
</div>
<div className="page-counter desktop-counter" id="desktopCounter"></div>

<div className="mobile-slider">
<div style={{overflow: "hidden"}}>
<div className="mobile-track" id="mobileTrack"></div>
</div>
<div className="controls">
<button>‹</button>
<button>›</button>
</div>
<div className="page-counter" id="mobileCounter"></div>
</div>
</div>
</section>




<section className="section team" id="team">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">11 / The Team</span>
<h2 className="h-display section-h2">Specialists, not generalists.</h2>
</div>
<p className="section-intro">
<strong>Digital Vikingz</strong> is a 15-person specialist team. Every operator on staff is trained on the Koray methodology, the agency's <strong>internal Semantic SEO Master Instruction</strong>, and the operating standards that govern entity-clean content production. We hire for depth — not for headcount.
      </p>
</div>
<div className="team-leadership">
<article className="team-card">
<div className="team-portrait">
<img src="/images/CEO.png" alt="Usman Ishaq" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2"}} />
</div>
<div className="team-info">
<div className="team-name">Usman Ishaq</div>
<div className="team-role">Founder & CEO</div>
<p className="team-bio">Architect of every engagement. Six years applying the Koray methodology across 200+ projects in 80+ industries. Owns strategic direction, methodology governance, and senior client engagement.</p>
</div>
</article>
<article className="team-card">
<div className="team-portrait">
<img src="/images/umair bhai.webp" alt="Usman Ishaq" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2"}} />
</div>
<div className="team-info">
<div className="team-name">Umair Mehmood</div>
<div className="team-role">Operations & Workflow</div>
<p className="team-bio">Owns delivery operations across the agency. Manages the workflow systems, team coordination, and quality governance that ensure semantic SEO programs ship on architecture, on time, on standard.</p>
</div>
</article>
<article className="team-card">
<div className="team-portrait">
<img src="/images/abad bhai.webp" alt="Usman Ishaq" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2"}} />
</div>
<div className="team-info">
<div className="team-name">Abad Aslam</div>
<div className="team-role">Content Marketing</div>
<p className="team-bio">Heads content production governance. Owns brief integrity, editorial standards, banned-phrase enforcement, and the publishing workflow that turns architecture into entity-reinforcing assets.</p>
</div>
</article>
</div>
<div className="team-specialists">
<div className="team-specialists-num">12<span>+ specialists</span></div>
<div className="team-specialists-roles">
<h4>Behind the leadership — a full execution team.</h4>
<p>Trained writers, semantic SEO analysts, link acquisition operators, technical SEO engineers, and AI visibility specialists working across active client architectures every day.</p>
<div className="team-roles-list">
<span>SEO Architects</span>
<span>Content Strategists</span>
<span>Long-form Writers</span>
<span>Technical SEO</span>
<span>Link Acquisition</span>
<span>AI Visibility</span>
<span>Editorial QA</span>
<span>Project Ops</span>
</div>
</div>
</div>
</div>
</section>

<section className="founder" id="founder">
<div className="wrap">
<div className="founder-grid">
<div className="founder-portrait">
<div className="founder-portrait-frame">
<img src="/images/founder.webp" alt="Usman Ishaq, Founder & CEO of Digital Vikingz" />
</div>
<div className="founder-name-block">
<div className="founder-name">Usman Ishaq</div>
<div className="founder-title">Founder & CEO · Digital Vikingz</div>
</div>
</div>
<div className="founder-content">
<span className="label">12 / A Word From the Founder</span>
<h2 className="h-display">I built Digital Vikingz to sell <em>authority architecture</em> — not activity.</h2>
<div className="founder-message">
<p>
            I started <strong>Digital Vikingz</strong> in 2023 around a frustration that took me years to fully name. SEO was being sold as activity. Title tags. Backlinks. Content volume. Clients paid agencies every month and quietly wondered why authority never compounded — why every algorithm update wiped the last quarter's progress, why rankings felt rented instead of owned.
          </p>
<p>
            The shift to AI search exposed the gap permanently. <strong>ChatGPT, Perplexity, Claude, and Google's AI Overviews</strong> don't reward keyword density or backlink count. They cite entities. They surface authority. They reference sources with structural credibility — and every business not engineered for that signal is being quietly written out of the search layer that's defining the next decade.
          </p>
<p>
            I spent six years applying <strong>Koray Tuğberk Gübür's semantic SEO methodology</strong> across 200+ projects in 40+ industries, and the pattern is consistent. Sites built on entity architecture rank, get cited, and convert. Sites built on tactics stall, slip, and eventually need to be rebuilt — usually by us.
          </p>
<p>
<strong>Digital Vikingz exists for one type of business:</strong> the kind that wants to claim a topic and own it. Not chase keywords. Not buy links. Not flood the internet with content that adds noise instead of authority. We work with founders, marketing leads, and operators who understand that semantic SEO is no longer a tactic — it's an architectural decision their business will live with for years.
          </p>
<p>
            If you want a search and content function that compounds — that survives updates, gets cited by AI, and connects to revenue — we should talk. The audit is the entry point. The architecture is what changes the trajectory.
          </p>
</div>
<div className="founder-signature">
<div className="founder-signature-mark">Usman</div>
<div className="founder-signature-name">Usman Ishaq</div>
<div className="founder-signature-title">Founder & CEO · Digital Vikingz</div>
</div>
</div>
</div>
</div>
</section>

<section className="implementation">
<div className="wrap">
<div className="impl-inner">
<div className="impl-left">
<span className="label" style={{marginBottom: "24px", display: "inline-flex"}}>For Active Clients</span>
<h3 className="h-display">Implementation Support</h3>
<p>For clients running active semantic SEO programs with us, <strong>Digital Vikingz</strong> offers in-house implementation support — built so structural integrity carries through from architecture to publish without handoff loss. These services are not sold standalone. They exist only to protect the integrity of the SEO work.</p>
</div>
<div className="impl-services">
<div className="impl-service">
<div className="impl-service-name">SEO-Architected WordPress Development</div>
<div className="impl-service-desc">Sites built with semantic structure, schema markup, entity infrastructure, and topical hierarchy from the first commit — not retrofitted afterward.</div>
</div>
<div className="impl-service">
<div className="impl-service-name">Authority Distribution & LinkedIn</div>
<div className="impl-service-desc">Founder-led content distribution, LinkedIn carousels, and B2B authority repurposing — turning semantic SEO output into multi-platform entity signals.</div>
</div>
</div>
</div>
</div>
</section>

<section className="section faq">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">13 / Common Questions</span>
<h2 className="h-display section-h2">What sophisticated buyers ask <em>before engaging.</em></h2>
</div>
<p className="section-intro">
        These are the questions that come up consistently on first calls. Every answer is the version <strong>Digital Vikingz</strong> would give in a real sales conversation — direct, specific, and aligned with how engagements actually run.
      </p>
</div>
<div className="faq-list">
<div className="faq-item">
<button className="faq-question">
          How do you justify the investment when traditional SEO retainers cost a fraction of this?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>The math is straightforward when you separate <strong>activity</strong> from <strong>asset</strong>. A traditional retainer pays for monthly tactics — content volume, link counts, status reports — that reset value to zero every quarter. The work is rented, not owned.</p>
<p>Semantic SEO architecture pays for an asset. The topical map, the entity infrastructure, and the authority that compounds across cycles belong to your business permanently. Most engagements break even on pipeline impact within the first 6–9 months and produce returning gains for years afterward — including across algorithm updates that reset competitor sites entirely. We share the unit economics on the discovery call once we understand the topic and current baseline.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Where does AI fit into your content production — and isn't AI content penalized by Google?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Google penalizes <strong>thin, generic, low-information-gain content</strong> — regardless of whether a human or an AI produced it. The 2024 helpful content updates clarified this directly: the discriminator is structural quality and information gain, not authorship.</p>
<p>We use AI as a research and acceleration layer inside a human-governed methodology. Briefs, entity definitions, predicate consistency, fact integrity, and editorial standards are owned by trained operators. AI assists with research synthesis and draft generation; it never determines what gets published. Every asset goes through a Koray-aligned brief and editorial QA before it ships. That's the difference between AI-assisted authority content and the AI slop Google penalizes.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          We have an in-house content team already. How does Digital Vikingz work alongside internal teams?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Most of our clients have internal teams. The architecture engagement is designed to <strong>empower in-house operators</strong>, not replace them. We deliver the topical map, the entity blueprint, the briefs, and the publishing standards — your team executes against the system instead of inventing strategy from scratch every quarter.</p>
<p>Clients typically choose one of three models. We handle architecture, your team handles production. We handle architecture and briefs, your team handles writing. Or we handle everything, and your team focuses on distribution and conversion. All three work — the right fit depends on your team's capacity and where you want internal time to focus.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Our category is technical and niche. Does semantic SEO actually work for specialized industries?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Specialized industries are where semantic SEO produces the strongest leverage. The deeper and more technical the topic, the more clearly entity architecture separates authoritative sites from generic content factories — because the buyer queries are precise, the predicates are specific, and the agreement areas are well-defined.</p>
<p>We've architected programs in <strong>aviation training simulators (Crewsim), consulting platform technology (Prepmatter), telecom infrastructure (Mytello), healthcare patient education (Diabetics Trust, ADHD Dude), and dozens of other technical verticals</strong>. The methodology adapts to the topic — the architecture changes; the principles don't. If your category has a defined entity, semantic SEO works.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What evidence do you have that this methodology works for businesses like ours?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p><strong>Digital Vikingz</strong> has executed 200+ projects across 40+ industries over six years on the Koray methodology. The reference work spans healthcare patient-education (Diabetics Trust, ADHD Dude), B2B SaaS (Prepmatter, Crewsim, Mytello), professional services (AJ Kumar, AdvancedSE), hospitality and destination travel (World Springs, CFL Boating), e-commerce (Pepthrive), and content publishing (EarnEdits, Articlegen).</p>
<p>On the discovery call, we walk through a case study from a vertical adjacent to yours — including the architecture decisions, the publishing sequence, and the measurable outcomes that resulted. We don't make blanket promises; we show the specific work and let the structure speak for itself.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Are we locked into a long-term contract, or can we step out after the architecture is built?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>You're never locked in. The architecture engagement is project-priced and stands on its own — you receive the complete blueprint, topical map, entity infrastructure spec, and 12-month publishing roadmap as a permanent deliverable your business owns.</p>
<p>From there, ongoing engagement is a choice. Many clients continue with <strong>Digital Vikingz</strong> for production, AI visibility, link building, and attribution work because the methodology is easier to execute through us than to operationalize internally. Others take the architecture and execute it with their internal team. Both paths are intended outcomes — the architecture is built to be ownable, not held hostage.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          Do you build websites or run social media?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Yes — but only for active semantic SEO clients. <strong>Digital Vikingz</strong> offers SEO-architected WordPress development and authority distribution support as implementation extensions of the core SEO work. Neither is sold standalone, because both only produce real outcomes when built on the same entity architecture as the SEO program.</p>
<p>If you need a standalone website build or a generalist social media manager, we'll point you to a partner. It's the right answer for both of us.</p>
</div>
</div>
</div>
<div className="faq-item">
<button className="faq-question">
          What does the first conversation look like?
          <span className="faq-icon"></span>
</button>
<div className="faq-answer">
<div className="faq-answer-inner">
<p>Two stages. First, a 30-minute fit call — we understand the business, the topic, and the goal; you understand the methodology, the team, and how engagements run. No pitch decks, no canned slides.</p>
<p>If there's mutual fit, we move to the <strong>Semantic Audit</strong> as the structured entry point: a paid, fixed-scope diagnostic with a written deliverable. The audit either becomes the foundation of an architecture engagement, or it becomes a roadmap your internal team executes. Both outcomes are intended.</p>
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
<line className="graph-line" x1="100" y1="300" x2="350" y2="150"></line>
<line className="graph-line" x1="100" y1="300" x2="350" y2="450"></line>
<line className="graph-line" x1="1300" y1="300" x2="1050" y2="150"></line>
<line className="graph-line" x1="1300" y1="300" x2="1050" y2="450"></line>
</g>
<g>
<circle className="graph-node" cx="700" cy="300" r="5" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node" cx="350" cy="150" r="3" style={{animationDelay: "1s"}}></circle>
<circle className="graph-node" cx="1050" cy="150" r="3" style={{animationDelay: "2s"}}></circle>
<circle className="graph-node" cx="350" cy="450" r="3" style={{animationDelay: "3s"}}></circle>
<circle className="graph-node" cx="1050" cy="450" r="3" style={{animationDelay: "4s"}}></circle>
<circle className="graph-node" cx="100" cy="300" r="2" style={{animationDelay: "5s"}}></circle>
<circle className="graph-node" cx="1300" cy="300" r="2" style={{animationDelay: "6s"}}></circle>
</g>
</svg>
</div>
<div className="wrap" style={{position: "relative", zIndex: "2"}}>
<span className="label final-cta-label">14 / The Next Step</span>
<h2 className="h-display">Stop chasing keywords. Start <em>claiming the topic.</em></h2>
<p>The audit is the structured entry point. <strong>Fixed scope, written deliverable, zero commitment</strong> to longer engagement. If the methodology fits your business, we move forward. If it doesn't, you leave with a roadmap your team can execute.</p>
<div className="final-cta-ctas">
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book a 30-Min Strategy Call <span className="btn-arrow"></span></a>
<a href="#methodology" className="btn btn-ghost">Review the Methodology <span className="btn-arrow"></span></a>
</div>
<div className="final-cta-note">Limited intake <span>·</span> 6 new client engagements per quarter <span>·</span> Maintained for delivery quality</div>
</div>
</section>

<footer className="footer">
<div className="wrap">
<div className="footer-grid">
<div className="footer-brand">
<a href="#" className="logo">
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
<li><a href="#rankings">Live Rankings</a></li>
<li><a href="#team">Team</a></li>
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
