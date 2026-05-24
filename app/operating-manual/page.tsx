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
<div className="semantic-graph-bg" aria-hidden="true">
<svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<g>
<line className="graph-line" x1="700" y1="400" x2="350" y2="180"></line>
<line className="graph-line" x1="700" y1="400" x2="1050" y2="180"></line>
<line className="graph-line" x1="700" y1="400" x2="350" y2="620"></line>
<line className="graph-line" x1="700" y1="400" x2="1050" y2="620"></line>
<line className="graph-line" x1="700" y1="400" x2="200" y2="400"></line>
<line className="graph-line" x1="700" y1="400" x2="1200" y2="400"></line>
<line className="graph-line" x1="350" y1="180" x2="1050" y2="180"></line>
<line className="graph-line" x1="350" y1="620" x2="1050" y2="620"></line>
<line className="graph-line" x1="350" y1="180" x2="200" y2="400"></line>
<line className="graph-line" x1="1050" y1="180" x2="1200" y2="400"></line>
</g>
<g>
<circle className="graph-node-ring" cx="700" cy="400" r="6" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node" cx="700" cy="400" r="5" style={{animationDelay: "0s"}}></circle>
<circle className="graph-node-ring" cx="350" cy="180" r="4" style={{animationDelay: "0.5s"}}></circle>
<circle className="graph-node" cx="350" cy="180" r="3" style={{animationDelay: "0.5s"}}></circle>
<circle className="graph-node-ring" cx="1050" cy="180" r="4" style={{animationDelay: "1s"}}></circle>
<circle className="graph-node" cx="1050" cy="180" r="3" style={{animationDelay: "1s"}}></circle>
<circle className="graph-node-ring" cx="350" cy="620" r="4" style={{animationDelay: "1.5s"}}></circle>
<circle className="graph-node" cx="350" cy="620" r="3" style={{animationDelay: "1.5s"}}></circle>
<circle className="graph-node-ring" cx="1050" cy="620" r="4" style={{animationDelay: "2s"}}></circle>
<circle className="graph-node" cx="1050" cy="620" r="3" style={{animationDelay: "2s"}}></circle>
<circle className="graph-node-ring" cx="200" cy="400" r="4" style={{animationDelay: "2.5s"}}></circle>
<circle className="graph-node" cx="200" cy="400" r="3" style={{animationDelay: "2.5s"}}></circle>
<circle className="graph-node-ring" cx="1200" cy="400" r="4" style={{animationDelay: "3s"}}></circle>
<circle className="graph-node" cx="1200" cy="400" r="3" style={{animationDelay: "3s"}}></circle>
</g>
<g>
<text className="graph-label" x="660" y="380" style={{animationDelay: "0s"}}>Central Entity</text>
<text className="graph-label" x="290" y="160" style={{animationDelay: "1s"}}>Predicates</text>
<text className="graph-label" x="980" y="160" style={{animationDelay: "2s"}}>Source Term Vector</text>
<text className="graph-label" x="280" y="650" style={{animationDelay: "3s"}}>Information Gain</text>
<text className="graph-label" x="970" y="650" style={{animationDelay: "4s"}}>Agreement Area</text>
<text className="graph-label" x="135" y="380" style={{animationDelay: "5s"}}>Microsemantics</text>
<text className="graph-label" x="1140" y="380" style={{animationDelay: "6s"}}>E-A-V</text>
</g>
</svg>
</div>
<div className="wrap">
<div className="hero-breadcrumb">
<a href="https://digitalvikingz.com">Home</a>
<span className="hero-breadcrumb-sep">/</span>
<span className="hero-breadcrumb-current">The Operating Manual</span>
</div>
<h1 className="h-display hero-h1">
      The technical methodology behind <em>every build.</em>
</h1>
<p className="hero-sub">
      This page is the engineering reference. It documents the frameworks, vocabulary, and structural logic that govern every Digital Vikingz engagement. <strong>If you want to understand the discipline at the level your in-house SEO would</strong> — keep reading. If you only need the marketing version, the homepage is the right page.
    </p>
<div className="hero-meta-line">
<div className="hero-meta-line-item">21-layer framework</div>
<div className="hero-meta-line-item">8 core terms</div>
<div className="hero-meta-line-item">46 microsemantic techniques</div>
<div className="hero-meta-line-item">Koray-aligned</div>
</div>
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book a 30-Min Strategy Call <span className="btn-arrow"></span></a>
</div>
</header>

<section className="section premise">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">01 / The Foundational Premise</span>
<h2 className="h-display section-h2">Why this methodology exists.</h2>
</div>
<p className="section-intro">
        Search systems used to rank pages. They now <strong>rank entities and the relationships between them.</strong> This is the shift the methodology is built on. Once that shift is understood, every other decision in the discipline — from architecture to writing to link acquisition — follows from it.
      </p>
</div>
<div className="premise-grid">
<div className="premise-col before">
<span className="premise-tag">The Old Model</span>
<h3>Pages competing for keywords.</h3>
<p>Search engines indexed pages, matched query strings to keyword density, and weighted authority by backlink count. Every page was a standalone unit competing against other standalone units for ranking on a single query.</p>
<p>The optimization logic was tactical — better title tag, more keyword variants, faster page speed, more backlinks. Authority was something you accumulated; it was not something you architected.</p>
<p>This model worked from roughly 2005 to 2018. It stopped working when Google began rewriting its understanding of how language describes the world.</p>
</div>
<div className="premise-col after">
<span className="premise-tag">The New Model</span>
<h3>Entities competing for <em>topical authority.</em></h3>
<p>Search systems now index <strong>entities</strong> — concepts, brands, people, products, places — and the <strong>predicates</strong> that connect them. A page is no longer a standalone unit. It's a contribution to an entity's topical credibility on the open web.</p>
<p>Authority is no longer accumulated through backlinks. It's <strong>architected</strong> through coverage of an entity's attributes, consistency of vocabulary across pages, and strength of relationship logic between concepts.</p>
<p>This is the model Google's Helpful Content systems reward, the model AI search engines retrieve from, and the model that produces compounding rankings instead of tactical wins that reset every algorithm update.</p>
</div>
</div>
<div className="premise-bottom-line">
<p>Semantic SEO is not a tactic layered on top of traditional SEO. It is <em>a different operating model entirely</em> — and the businesses that recognize this are the ones claiming category authority while their competitors chase keywords.</p>
</div>
</div>
</section>

<section className="section vocabulary">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">02 / The Vocabulary</span>
<h2 className="h-display section-h2">Terms that <em>govern every decision.</em></h2>
</div>
<p className="section-intro">
        Below are the eight terms used across every audit, architecture document, and brief Digital Vikingz produces. They are working definitions — operational, not academic. If you read these eight terms once, the rest of the page (and most semantic SEO discourse) becomes legible.
      </p>
</div>
<div className="vocab-grid">
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term">Central <em>Entity</em></h3>
<span className="vocab-num">Term 01</span>
</div>
<p className="vocab-definition">The single concept your site exists to be authoritative on. Every other decision — topical map, query coverage, internal linking — flows from this. A site without a clearly defined Central Entity ranks volatilely and gets ignored by AI systems because there's <strong>nothing for the search engine to bind authority to.</strong></p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          A pediatric speech therapy practice's Central Entity isn't "speech therapy." It's "pediatric speech therapy" — narrower, more defensible, more citable.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term">Source Term <em>Vector</em></h3>
<span className="vocab-num">Term 02</span>
</div>
<p className="vocab-definition">The vocabulary your site speaks. Every site has an implicit one — but most are inconsistent, fragmented across pages and writers. A defined Source Term Vector specifies which terms reinforce the entity, which terms drift from it, and how new content stays vocabulary-consistent. <strong>Drift in this vector is the leading cause of semantic dilution.</strong></p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          A B2B SaaS site might define its vector to include "platform, integration, workflow, automation" — and exclude "tool, app, software" because they signal a different category.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term"><em>Predicate</em></h3>
<span className="vocab-num">Term 03</span>
</div>
<p className="vocab-definition">The relationship between two entities. In the sentence "Tesla manufactures electric vehicles," the predicate is "manufactures." Search systems index these relationships explicitly. <strong>Predicate consistency</strong> means the same relationship between the same two entities is described the same way across every page on a site. Inconsistent predicates collapse credibility.</p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          One page calls a service "designed for B2B teams." Another calls it "built for enterprises." A third says "made for businesses." Three different predicates for the same relationship. Predicate inconsistency.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term">Agreement <em>Area</em></h3>
<span className="vocab-num">Term 04</span>
</div>
<p className="vocab-definition">The set of facts about a topic that ranking sites already agree on. Before publishing on any topic, the agreement area is identified — and content is engineered to either <strong>cover the area completely</strong> or contribute net-new information. Pages that simply restate the agreement area without extending it produce zero information gain and rank temporarily at best.</p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          On "what is sourdough" — the agreement area includes wild yeast, fermentation, hydration, starter. Any new article must cover this area before earning the right to add new attributes.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term">Information <em>Gain</em></h3>
<span className="vocab-num">Term 05</span>
</div>
<p className="vocab-definition">The measurable amount of new attribute coverage, new perspective, or new structural insight a page contributes beyond what already exists on the SERP for its target query. Google's helpful content systems and AI retrieval models are explicitly calibrated to reward this. <strong>Pages with zero information gain don't compound authority</strong> — they consume index budget and add semantic noise.</p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          Ten ranking sites cover "best CRM for small business" by listing the same nine tools. Information gain is added by introducing the eleventh tool, the comparison framework, the missing use case, or the structural variable competitors missed.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term">E-A-V <em>Structure</em></h3>
<span className="vocab-num">Term 06</span>
</div>
<p className="vocab-definition">Entity-Attribute-Value. The structural format every well-written semantic page produces. The Entity is what the page is about. Attributes are the questions the topic answers. Values are the specific facts. <strong>Pages structured around clean E-A-V triples are quoted by AI systems</strong> because they map directly to the relational format LLMs retrieve from.</p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          Entity: Tesla Model 3. Attribute: Range. Value: 358 miles. Three clean E-A-V triples per page beat ten paragraphs of marketing prose for AI citation.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term">Topical <em>Coverage</em></h3>
<span className="vocab-num">Term 07</span>
</div>
<p className="vocab-definition">The percentage of the topic's question space your site addresses with dedicated content. A site covering 90% of the meaningful queries in its topic outranks a site covering 30% — because <strong>completeness signals authority</strong>. The topical map is how coverage gets engineered systematically rather than randomly.</p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          A pediatric speech therapy site at 30% coverage answers "what is speech therapy" but not "when to start," "what to expect," "how to choose a therapist." Coverage gaps are competitor opportunities.
        </div>
</div>
<div className="vocab-card">
<div className="vocab-card-header">
<h3 className="vocab-term"><em>Microsemantics</em></h3>
<span className="vocab-num">Term 08</span>
</div>
<p className="vocab-definition">The writing-level techniques that signal entity authority at the sentence and paragraph level. While macro-architecture handles entity hierarchy, microsemantics handles how each sentence reinforces the Central Entity, maintains predicate consistency, and contributes to information gain. <strong>This is where most agency content fails</strong> — strategy is correct, sentences leak authority.</p>
<div className="vocab-example">
<span className="vocab-example-label">Example</span>
          The 46 microsemantic techniques include extractive summaries, definitional density, attribute clustering, and predicate compression. Section 04 covers the categories.
        </div>
</div>
</div>
</div>
</section>

<section className="console-section">
<div className="wrap">
<div className="console-head">
<div className="console-head-left">
<span className="label">02.5 / The Console</span>
<h2 className="h-display section-h2">Methodology, <em>as a working system.</em></h2>
</div>
<p className="section-intro">
        The 8 vocabulary terms aren't theoretical. They become operational the moment an engagement begins — each one tracked, each one applied, each one structurally enforced. Below is the methodology in <strong>two states</strong>: theory (definitional reference) and applied (live engagement on a real client cluster).
      </p>
</div>
<div className="methodology-console" id="methodologyConsole" data-state="theory">

<div className="mc-header">
<div className="mc-header-left">
<span className="mc-pill">
<span className="mc-state-block mc-state-theory">Theory · Reference</span>
<span className="mc-state-block mc-state-applied">Applied · Live</span>
</span>
<span className="mc-title">
<span className="mc-state-block mc-state-theory">Mode: <strong>Definitional · the methodology as a manual</strong></span>
<span className="mc-state-block mc-state-applied">Mode: <strong>Operational · live SaaS workflow automation engagement</strong></span>
</span>
</div>
<button type="button" className="mc-toggle-btn" data-toggle="methodologyConsole" aria-label="Toggle between theory and applied states">
<span className="mc-toggle-dot"></span>
<span className="mc-state-block mc-state-theory">See applied state</span>
<span className="mc-state-block mc-state-applied">Back to theory</span>
</button>
</div>

<div className="mc-body">
<div className="mc-grid">

<div className="mc-card">
<span className="mc-card-num">Term 01</span>
<div className="mc-card-name">Central <em>Entity</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">The single concept your site exists to be authoritative on. Every architectural decision flows from this.</span>
<span className="mc-state-block mc-state-applied">Locked: <strong>SaaS workflow automation</strong> · narrower than "B2B SaaS" · more defensible</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Unbound</span>
<span className="mc-state-block mc-state-applied">✓ Anchored</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 02</span>
<div className="mc-card-name">Source Term <em>Vector</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">The vocabulary your site speaks. Drift in this vector causes semantic dilution and authority loss.</span>
<span className="mc-state-block mc-state-applied"><strong>47 terms</strong> specified · 23 banned terms registry · category-specific lexicon enforced</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ Specified</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 03</span>
<div className="mc-card-name"><em>Predicate</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">The relationship between two entities. Search systems index these explicitly. Inconsistency collapses credibility.</span>
<span className="mc-state-block mc-state-applied"><strong>12 relationships</strong> defined and locked · enforced across 84 nodes · QA pass: 100%</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ Enforced</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 04</span>
<div className="mc-card-name">Agreement <em>Area</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">The set of facts ranking sites already agree on. Content must cover this area before earning the right to extend it.</span>
<span className="mc-state-block mc-state-applied">SERP mapped across <strong>top 10 sites</strong> · agreement saturated · 3 net-new attributes located</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ Mapped</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 05</span>
<div className="mc-card-name">Information <em>Gain</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">Net-new attribute coverage a page contributes beyond the SERP. Helpful content systems and AI retrieval reward this.</span>
<span className="mc-state-block mc-state-applied"><strong>3 net-new attributes</strong> identified per cluster · synthesis layer integrated · 84 pages all clear gain threshold</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ Engineered</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 06</span>
<div className="mc-card-name">E-A-V <em>Structure</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">Entity-Attribute-Value. The relational format LLMs retrieve from. Pages structured this way get cited.</span>
<span className="mc-state-block mc-state-applied"><strong>340 E-A-V triples</strong> deployed · schema-aligned · AI citation diagnostic pass: 247 verified retrievals</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ Deployed</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 07</span>
<div className="mc-card-name">Topical <em>Coverage</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">Percentage of the topic's question space your site addresses with dedicated content. Completeness signals authority.</span>
<span className="mc-state-block mc-state-applied">Coverage: <strong>28% → 94%</strong> · 6 clusters mapped · 84 supporting nodes shipped · zero gap zones</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ 94% coverage</span>
</div>
</div>

<div className="mc-card">
<span className="mc-card-num">Term 08</span>
<div className="mc-card-name"><em>Microsemantics</em></div>
<div className="mc-card-state">
<span className="mc-state-block mc-state-theory">Sentence-level techniques that signal entity authority. Where most agency content fails the methodology.</span>
<span className="mc-state-block mc-state-applied"><strong>46 techniques</strong> active · 6 categories enforced · MIRENA pass · 0 banned phrases · editorial QA: 340/340</span>
</div>
<div className="mc-card-status">
<span className="mc-card-status-dot"></span>
<span className="mc-state-block mc-state-theory">Concept</span>
<span className="mc-state-block mc-state-applied">✓ Operational</span>
</div>
</div>
</div>
</div>

<div className="mc-outcome-banner mc-state-block mc-state-applied">
<span className="mc-outcome-tag">Methodology applied · representative engagement · 14-month cycle</span>
<div className="mc-outcome-text">All 8 terms <strong>operationalized end-to-end</strong> · 84 entity-clean nodes shipped · 247 AI citations earned · authority compounds without further architectural intervention. The vocabulary became infrastructure.</div>
</div>

<div className="mc-foot">
<span className="mc-state-block mc-state-theory">Theory mode · <strong>definitional reference</strong> · click toggle to see methodology applied to a real engagement</span>
<span className="mc-state-block mc-state-applied">Applied mode · <strong>live engagement state</strong> · this is what the methodology produces in 14 months</span>
</div>
</div>
</div>
</section>

<section className="section framework">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">03 / The 21-Layer Framework</span>
<h2 className="h-display section-h2">Architecture, <em>fully decomposed.</em></h2>
</div>
<p className="section-intro">
        Every Digital Vikingz architecture engagement passes through 21 sequential layers. The layers don't run in parallel — each one's output feeds the next. Most agencies skip directly from concept to content; the missing layers are why their work doesn't compound.
      </p>
</div>
<div className="framework-intro">
<p>The 21 layers map across <strong>three structural phases</strong>: Foundation (Layers 01–07), Architecture (Layers 08–14), and Production-Readiness (Layers 15–21). Skipping layers compresses the engagement timeline but increases the probability the program collapses by Quarter 02.</p>
</div>
<div className="framework-stack">
<div className="framework-layer">
<div className="framework-layer-num">Layer 01</div>
<div className="framework-layer-name">Central Entity Definition</div>
<div className="framework-layer-purpose">Identifying and locking the single concept the site will be authoritative on.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 02</div>
<div className="framework-layer-name">Entity Attribute Inventory</div>
<div className="framework-layer-purpose">Cataloguing every attribute the entity needs to be associated with for category credibility.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 03</div>
<div className="framework-layer-name">Source Term Vector Specification</div>
<div className="framework-layer-purpose">Defining the vocabulary that reinforces the entity — and the vocabulary that drifts away from it.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 04</div>
<div className="framework-layer-name">Predicate Framework</div>
<div className="framework-layer-purpose">Documenting the relationships between the Central Entity and each supporting concept.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 05</div>
<div className="framework-layer-name">Buyer Query Intent Mapping</div>
<div className="framework-layer-purpose">Mapping the buyer's question space across awareness, consideration, decision, and post-decision intent.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 06</div>
<div className="framework-layer-name">Competitive Entity Positioning</div>
<div className="framework-layer-purpose">Where competitors hold authority, where gaps exist, and which clusters are defensible.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 07</div>
<div className="framework-layer-name">Agreement Area Synthesis</div>
<div className="framework-layer-purpose">Identifying the consensus facts on each topic and locating the information gain opportunities beyond them.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 08</div>
<div className="framework-layer-name">Topical Map Construction</div>
<div className="framework-layer-purpose">Designing the cluster, pillar, and supporting node hierarchy across the entire topical surface.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 09</div>
<div className="framework-layer-name">Cluster Pillar Identification</div>
<div className="framework-layer-purpose">Selecting which concepts become pillar pages versus supporting content.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 10</div>
<div className="framework-layer-name">Internal Linking Architecture</div>
<div className="framework-layer-purpose">Designing the relational pathways between pages that reinforce entity authority.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 11</div>
<div className="framework-layer-name">Anchor Text Governance</div>
<div className="framework-layer-purpose">Specifying the predicate-clean anchors that maintain Source Term Vector consistency across links.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 12</div>
<div className="framework-layer-name">Schema & Structured Data Plan</div>
<div className="framework-layer-purpose">Defining the entity-aligned schema markup that makes the site machine-readable.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 13</div>
<div className="framework-layer-name">URL Hierarchy & Site Structure</div>
<div className="framework-layer-purpose">Engineering the structural hierarchy that maps to the topical map.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 14</div>
<div className="framework-layer-name">Technical SEO Specification</div>
<div className="framework-layer-purpose">Documenting the crawl, indexation, and rendering requirements for compounding authority.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 15</div>
<div className="framework-layer-name">Editorial Voice & Tone</div>
<div className="framework-layer-purpose">Defining the voice that supports E-E-A-T and entity credibility — not generic brand voice.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 16</div>
<div className="framework-layer-name">Banned Phrase Registry</div>
<div className="framework-layer-purpose">The explicit list of phrases that signal generic AI content, marketing fluff, or category drift.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 17</div>
<div className="framework-layer-name">Information Gain Standards</div>
<div className="framework-layer-purpose">The minimum threshold of net-new attribute coverage every published asset must contribute.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 18</div>
<div className="framework-layer-name">E-A-V Brief Structure</div>
<div className="framework-layer-purpose">The standardized brief format that produces AI-citable, predicate-clean content output.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 19</div>
<div className="framework-layer-name">Publishing Sequence Logic</div>
<div className="framework-layer-purpose">Ordering content release for cluster integrity and incremental authority compounding.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 20</div>
<div className="framework-layer-name">Distribution & Reinforcement Map</div>
<div className="framework-layer-purpose">Designing where entity signals propagate beyond the site — guest content, citations, AI surfaces.</div>
</div>
<div className="framework-layer">
<div className="framework-layer-num">Layer 21</div>
<div className="framework-layer-name">Attribution Model Specification</div>
<div className="framework-layer-purpose">Defining how SEO output gets connected to qualified pipeline — the accountability layer.</div>
</div>
</div>
</div>
</section>

<section className="section mirena">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">04 / The MIRENA Principle</span>
<h2 className="h-display section-h2">Structural <em>compression.</em></h2>
</div>
<p className="section-intro">
        MIRENA is the structural compression principle developed within Koray Tuğberk Gübür's framework — and applied as a writing-level discipline across every Digital Vikingz brief. Each letter represents a structural property a page must demonstrate. Pages that fail any letter typically rank temporarily, then slip.
      </p>
</div>
<div className="mirena-banner">
<span className="mirena-banner-tag">The Core Principle</span>
<h3>Authority is <em>structural compression.</em></h3>
<p>The most authoritative pages are not the longest pages — they are the pages where every paragraph compresses maximum entity coverage into minimum reader effort. MIRENA defines the six structural properties that make this compression measurable.</p>
</div>
<div className="mirena-letters">
<div className="mirena-letter">
<div className="mirena-letter-char">M</div>
<div className="mirena-letter-word">Macro Context</div>
<div className="mirena-letter-purpose">Establishing where the topic sits in the broader category landscape before drilling in.</div>
</div>
<div className="mirena-letter">
<div className="mirena-letter-char">I</div>
<div className="mirena-letter-word">Initial Definition</div>
<div className="mirena-letter-purpose">Defining the entity early, completely, and in one extractable paragraph.</div>
</div>
<div className="mirena-letter">
<div className="mirena-letter-char">R</div>
<div className="mirena-letter-word">Relationship Density</div>
<div className="mirena-letter-purpose">Connecting the entity to its supporting concepts through clean predicate links across the page.</div>
</div>
<div className="mirena-letter">
<div className="mirena-letter-char">E</div>
<div className="mirena-letter-word">Extension Beyond</div>
<div className="mirena-letter-purpose">Adding net-new attribute coverage past the SERP's existing agreement area.</div>
</div>
<div className="mirena-letter">
<div className="mirena-letter-char">N</div>
<div className="mirena-letter-word">Narrative Continuity</div>
<div className="mirena-letter-purpose">Maintaining a logical thread that carries the reader from definition to depth without breakage.</div>
</div>
<div className="mirena-letter">
<div className="mirena-letter-char">A</div>
<div className="mirena-letter-word">Anchored Closure</div>
<div className="mirena-letter-purpose">Closing with summary that compresses key attributes into AI-extractable, retrievable form.</div>
</div>
</div>
</div>
</section>

<section className="section micro">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">05 / Microsemantics</span>
<h2 className="h-display section-h2">The <em>writing-level</em> discipline.</h2>
</div>
<p className="section-intro">
        Architecture sets the structural foundation. Microsemantics is what happens at the sentence and paragraph level — the techniques that make individual content assets AI-citable, entity-reinforcing, and predicate-clean. This is where most agency content fails the methodology even when the strategy is correct.
      </p>
</div>
<div className="micro-intro">
<p>The full microsemantic stack contains <strong>46 techniques</strong> across six categories. Below is the category-level overview. Every brief Digital Vikingz produces specifies which techniques apply to that piece — and editorial QA enforces them at the sentence level before publishing.</p>
</div>
<div className="micro-categories">
<div className="micro-category">
<div className="micro-category-head">
<h3 className="micro-category-name">Definitional <em>Density</em></h3>
<span className="micro-category-count">8 techniques</span>
</div>
<ul className="micro-category-list">
<li>Extractive opening summaries that AI systems retrieve verbatim</li>
<li>Definitional compression — full entity definition in under 40 words</li>
<li>Attribute clustering — related attributes grouped for retrieval efficiency</li>
<li>Lead-with-the-answer structure for question-pattern content</li>
<li>Categorical anchoring — the entity placed inside its parent category</li>
<li>Counter-definition technique — defining what the entity is NOT</li>
<li>Comparative definition against adjacent entities</li>
<li>Multi-level definitions — beginner, intermediate, expert formulations</li>
</ul>
</div>
<div className="micro-category">
<div className="micro-category-head">
<h3 className="micro-category-name">Predicate <em>Compression</em></h3>
<span className="micro-category-count">7 techniques</span>
</div>
<ul className="micro-category-list">
<li>Single-verb predicates over verb phrases ("manufactures" beats "is involved in the manufacturing of")</li>
<li>Active voice for entity-action relationships</li>
<li>Predicate normalization — same relationship expressed identically across pages</li>
<li>Concrete verbs over abstract verbs</li>
<li>Predicate-attribute pairing for fact-density</li>
<li>Avoiding hedging language that weakens predicate strength</li>
<li>Predicate consistency review at brief and editorial layers</li>
</ul>
</div>
<div className="micro-category">
<div className="micro-category-head">
<h3 className="micro-category-name">Information Gain <em>Engineering</em></h3>
<span className="micro-category-count">9 techniques</span>
</div>
<ul className="micro-category-list">
<li>SERP agreement-area mapping before writing</li>
<li>Net-new attribute identification through gap analysis</li>
<li>Original framework introduction</li>
<li>Counter-narrative against prevailing assumption</li>
<li>Edge case coverage missed by ranking competitors</li>
<li>Quantification where competitors are qualitative</li>
<li>Process documentation where competitors are theoretical</li>
<li>Practitioner perspective where competitors are journalistic</li>
<li>Synthesis layer that connects fragmented competitive coverage</li>
</ul>
</div>
<div className="micro-category">
<div className="micro-category-head">
<h3 className="micro-category-name">E-A-V <em>Triple Production</em></h3>
<span className="micro-category-count">6 techniques</span>
</div>
<ul className="micro-category-list">
<li>Sentence-level entity-attribute-value structure</li>
<li>Quantified value statements over qualitative descriptions</li>
<li>Specificity discipline — exact figures over rounded estimates</li>
<li>Attribute table production for retrieval-friendly format</li>
<li>Comparative E-A-V matrices across adjacent entities</li>
<li>Schema-aligned markup of E-A-V triples in HTML</li>
</ul>
</div>
<div className="micro-category">
<div className="micro-category-head">
<h3 className="micro-category-name">Source Term Vector <em>Discipline</em></h3>
<span className="micro-category-count">8 techniques</span>
</div>
<ul className="micro-category-list">
<li>Vector vocabulary enforcement at the sentence level</li>
<li>Banned-phrase elimination at editorial QA</li>
<li>Synonym discipline — vector terms over off-vector synonyms</li>
<li>Category-signal vocabulary for entity reinforcement</li>
<li>Cluster-level term cohesion across linked content</li>
<li>Voice consistency across writers and content cycles</li>
<li>Anti-drift review at monthly editorial cadence</li>
<li>Vector update protocol when category language evolves</li>
</ul>
</div>
<div className="micro-category">
<div className="micro-category-head">
<h3 className="micro-category-name">Anchored <em>Closure</em></h3>
<span className="micro-category-count">8 techniques</span>
</div>
<ul className="micro-category-list">
<li>Compressed summary at the page tail for AI extraction</li>
<li>Key-attribute recap aligned to schema</li>
<li>Internal linking that reinforces topical context, not just navigation</li>
<li>Anchor text governance enforcing Source Term Vector</li>
<li>FAQ blocks structured as retrievable Q-A pairs</li>
<li>Comparison anchor for adjacent entity pages</li>
<li>Citation-friendly takeaway formatting</li>
<li>CTA logic that aligns to query intent stage</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section query-path">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">06 / Query Path Logic</span>
<h2 className="h-display section-h2">Buyer questions, <em>mapped to entities.</em></h2>
</div>
<p className="section-intro">
        Buyers don't search in keywords. They search in question paths — moving through stages of awareness, comparison, and decision before they convert. The methodology maps these paths explicitly, then assigns each stage to a specific entity-cluster on the topical map. Coverage gaps in any stage create competitor opportunities.
      </p>
</div>
<div className="query-path-flow">
<div className="query-path-stage">
<div className="query-path-stage-num">Stage 01</div>
<h4>Awareness <em>queries</em></h4>
<p>"What is X?" "Why does X happen?" Buyer doesn't yet know the category exists or has a problem to solve.</p>
</div>
<div className="query-path-arrow">→</div>
<div className="query-path-stage">
<div className="query-path-stage-num">Stage 02</div>
<h4>Consideration <em>queries</em></h4>
<p>"How to X." "Best way to X." "X vs Y." Buyer is evaluating approaches before committing to one.</p>
</div>
<div className="query-path-arrow">→</div>
<div className="query-path-stage">
<div className="query-path-stage-num">Stage 03</div>
<h4>Decision <em>queries</em></h4>
<p>"X for [use case]." "X pricing." "X reviews." "Top X." Buyer is short-listing solutions before purchase.</p>
</div>
</div>
<div className="query-path-rule">
<p>The methodology rule is simple: <em>every cluster on the topical map must have content for all three stages</em>, or the cluster leaks pipeline at the stage that's missing.</p>
</div>
</div>
</section>

<section className="section info-gain">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">07 / Information Gain Engineering</span>
<h2 className="h-display section-h2">Earning the right to <em>publish.</em></h2>
</div>
<p className="section-intro">
        Information gain is the measurable amount of net-new value a page contributes beyond what already exists on the SERP. It is no longer optional — Google's helpful content systems and AI retrieval models are explicitly calibrated to reward it. Below is the operational formula and the three engineering techniques used at every Digital Vikingz brief.
      </p>
</div>
<div className="info-gain-formula">
<span className="info-gain-formula-label">The Operational Formula</span>
<div className="info-gain-formula-text">Information Gain = <em>(Net-New Attributes Covered)</em><br />÷ <em>(Existing Agreement Area Coverage)</em></div>
</div>
<div className="info-gain-grid">
<div className="info-gain-card">
<div className="info-gain-card-num">01</div>
<h4>Agreement Area Saturation</h4>
<p>Before publishing, the existing SERP is mapped — what attributes are already covered, by which sources, with what depth. The piece must <strong>match this baseline</strong> before earning the right to add new value.</p>
</div>
<div className="info-gain-card">
<div className="info-gain-card-num">02</div>
<h4>Gap Identification</h4>
<p>Attributes the agreement area misses — edge cases, practitioner perspective, quantification, process detail, original frameworks, contrarian angles. <strong>The gap is the publishing opportunity.</strong> No gap, no publish.</p>
</div>
<div className="info-gain-card">
<div className="info-gain-card-num">03</div>
<h4>Synthesis Layer</h4>
<p>Connecting fragmented competitive coverage into a single coherent synthesis. When competitors cover pieces of the topic in isolation, the synthesis page that integrates them becomes the citation source — for both Google and AI systems.</p>
</div>
</div>
</div>
</section>

<section className="section predicate">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">08 / Predicate Governance</span>
<h2 className="h-display section-h2">Consistency at <em>scale.</em></h2>
</div>
<p className="section-intro">
        Predicate consistency is the most underestimated discipline in semantic SEO. Most sites have no predicate framework at all — every writer describes the same relationships in different language, and the result is an entity that search systems cannot bind authority to. Below is how the governance layer actually runs.
      </p>
</div>
<div className="predicate-grid">
<div className="predicate-explainer">
<h3>Same relationship. <em>Same language. Every page.</em></h3>
<p>Predicate governance is the operational discipline that ensures every relationship between two entities is described identically across every page on a site. When this discipline holds, search systems consolidate authority around the entity. When it doesn't, authority fragments across linguistic variants.</p>
<p>The governance is enforced at three layers — the <strong>brief layer</strong>, where allowed predicates are specified per piece; the <strong>writing layer</strong>, where writers reference the predicate framework while drafting; and the <strong>editorial QA layer</strong>, where predicate inconsistencies get caught and corrected before publishing.</p>
<p>Most agencies have none of these layers. The result is a site where the same product is "designed for" on one page, "built for" on another, and "made for" on a third — and the entity loses credibility despite the strategy being correct.</p>
</div>
<div className="predicate-example">
<span className="predicate-example-label">Predicate Inconsistency vs. Discipline</span>
<div className="predicate-row">
<span className="predicate-row-tag bad">Inconsistent</span>
<div className="predicate-row-text">"Designed for B2B teams."</div>
</div>
<div className="predicate-row">
<span className="predicate-row-tag bad">Inconsistent</span>
<div className="predicate-row-text">"Built for enterprises."</div>
</div>
<div className="predicate-row">
<span className="predicate-row-tag bad">Inconsistent</span>
<div className="predicate-row-text">"Made for businesses."</div>
</div>
<div className="predicate-row">
<span className="predicate-row-tag good">Discipline</span>
<div className="predicate-row-text">"Built for B2B teams." — every page.</div>
</div>
</div>
</div>
</div>
</section>

<section className="section ai-visibility">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">09 / AI Visibility</span>
<h2 className="h-display section-h2">Why the methodology gets <em>cited.</em></h2>
</div>
<p className="section-intro">
        AI search engines retrieve differently than Google. They don't rank pages — they extract facts, attribute facts to sources, and generate answers from structured retrieval. The methodology is engineered specifically for this retrieval pattern. Below are the four mechanisms that produce citation in ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews.
      </p>
</div>
<div className="ai-vis-grid">
<div className="ai-vis-card">
<div className="ai-vis-card-num">Mechanism 01</div>
<h4>Clean E-A-V <em>structure</em></h4>
<p>LLMs retrieve from relational structures — entity, attribute, value. Pages that produce clean E-A-V triples at the sentence level are extracted with high fidelity. Pages that bury facts inside marketing prose lose to pages that surface them in retrievable format.</p>
<div className="ai-vis-card-mechanism">
<span className="ai-vis-card-mechanism-label">What this looks like in practice</span>
<div className="ai-vis-card-mechanism-text">Schema markup, structured headings, definitional density, and quantified values that LLMs can lift verbatim into answers.</div>
</div>
</div>
<div className="ai-vis-card">
<div className="ai-vis-card-num">Mechanism 02</div>
<h4>Entity definition <em>strength</em></h4>
<p>AI systems prefer to cite sources that define their entity early, completely, and unambiguously. Pages with weak or scattered definitions get skipped for pages where the entity is locked down in the first paragraph. The MIRENA "Initial Definition" property addresses this directly.</p>
<div className="ai-vis-card-mechanism">
<span className="ai-vis-card-mechanism-label">What this looks like in practice</span>
<div className="ai-vis-card-mechanism-text">Extractive opening summaries — 30-60 words that fully define the entity and can stand alone as the answer to "what is X."</div>
</div>
</div>
<div className="ai-vis-card">
<div className="ai-vis-card-num">Mechanism 03</div>
<h4>Predicate <em>consistency</em></h4>
<p>When LLMs retrieve facts about an entity, they cross-validate across multiple sources. Sites where predicates remain consistent across pages strengthen the model's confidence in the entity. Sites where predicates fragment confuse the retrieval and lose to consistent competitors.</p>
<div className="ai-vis-card-mechanism">
<span className="ai-vis-card-mechanism-label">What this looks like in practice</span>
<div className="ai-vis-card-mechanism-text">A predicate framework defined at the architecture layer and enforced through brief, writing, and editorial QA layers.</div>
</div>
</div>
<div className="ai-vis-card">
<div className="ai-vis-card-num">Mechanism 04</div>
<h4>Information gain <em>contribution</em></h4>
<p>AI retrieval models are calibrated to weight sources that contribute net-new attribute coverage above sources that restate the agreement area. A page that adds something the SERP doesn't already cover earns retrieval priority — and citation preference over time.</p>
<div className="ai-vis-card-mechanism">
<span className="ai-vis-card-mechanism-label">What this looks like in practice</span>
<div className="ai-vis-card-mechanism-text">Original frameworks, quantification where competitors qualify, edge cases competitors skip, synthesis where competitors fragment.</div>
</div>
</div>
</div>
</div>
</section>

<section className="section lineage">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">10 / Methodology Lineage</span>
<h2 className="h-display section-h2">Where the <em>discipline came from.</em></h2>
</div>
<p className="section-intro">
        Honest attribution matters. Digital Vikingz did not invent semantic SEO. The discipline above is built on the foundational work of Koray Tuğberk Gübür — and adapted through six years of operational application across 200+ projects. Below is the lineage and the specific adaptations.
      </p>
</div>
<div className="lineage-card">
<span className="lineage-card-tag">Methodology Origin</span>
<h3>The framework was developed by <em>Koray Tuğberk Gübür.</em></h3>
<p>The semantic SEO discipline that governs every Digital Vikingz engagement was originally formalized by Koray Tuğberk Gübür — an SEO researcher and practitioner whose work redefined how the industry thinks about entity-based search, topical authority, and structural compression. The 21-layer framework, the MIRENA principle, microsemantic technique stack, and the predicate consistency discipline all originate in his published research and ongoing methodology development.</p>
<p>Digital Vikingz operates as a <strong>Koray-aligned methodology agency</strong>. We are not the inventors of the discipline. We are operators who have applied the discipline at scale across 200+ engagements, accumulated practical observations from those builds, and developed the operational adaptations documented below.</p>
</div>
<div className="lineage-adaptations">
<div className="lineage-adaptation">
<span className="lineage-adaptation-tag">Adaptation 01</span>
<h4>AI Visibility Layer Integration</h4>
<p>We've integrated explicit AI visibility engineering into every architecture engagement — adding schema discipline, E-A-V triple production, and citation-tracking specifically for ChatGPT, Perplexity, Claude, and Gemini retrieval patterns.</p>
</div>
<div className="lineage-adaptation">
<span className="lineage-adaptation-tag">Adaptation 02</span>
<h4>Pipeline Attribution Discipline</h4>
<p>We've added the attribution layer (Layer 21) to connect every stage of methodology output to qualified pipeline — moving accountability beyond rankings and impressions toward business outcomes.</p>
</div>
<div className="lineage-adaptation">
<span className="lineage-adaptation-tag">Adaptation 03</span>
<h4>Operational Governance Stack</h4>
<p>We've productized the governance layer into a brief format, banned-phrase registry, editorial QA workflow, and Claude Project knowledge bank — making the discipline operationally repeatable across writers and engagements.</p>
</div>
</div>
</div>
</section>

<section className="section not">
<div className="wrap">
<div className="section-head">
<div className="section-head-left">
<span className="label">11 / Disqualification</span>
<h2 className="h-display section-h2">What this methodology is <em>not.</em></h2>
</div>
<p className="section-intro">
        Semantic SEO has been increasingly co-opted as a marketing label by agencies that don't actually run the discipline. Below is what the methodology explicitly is not — so prospects can verify whether the practitioner they're evaluating is operating at the methodology layer or merely using the vocabulary.
      </p>
</div>
<div className="not-list">
<div className="not-row">
<span className="not-row-tag">Not 01</span>
<div className="not-row-content">
<h4>It is not <em>keyword research</em> with new vocabulary.</h4>
<p>Adding the word "entity" to a keyword research deliverable doesn't make the work semantic. The methodology starts at the entity layer and builds queries from it — not the reverse. If a practitioner's deliverable is still a keyword spreadsheet with semantic terms sprinkled in, they're operating at the old layer.</p>
</div>
</div>
<div className="not-row">
<span className="not-row-tag">Not 02</span>
<div className="not-row-content">
<h4>It is not <em>schema markup</em> as a finishing layer.</h4>
<p>Schema is a downstream output of entity architecture, not a substitute for it. Adding JSON-LD to a site that lacks a defined Central Entity, predicate framework, or topical map produces no compounding authority. The practitioners selling "schema audits" as semantic SEO are missing the entire foundation.</p>
</div>
</div>
<div className="not-row">
<span className="not-row-tag">Not 03</span>
<div className="not-row-content">
<h4>It is not <em>content volume</em> with topical clusters as a label.</h4>
<p>Calling a 40-piece-per-month content factory a "topical cluster strategy" doesn't make it semantic SEO. Volume without architecture, predicate consistency, and information gain produces semantic dilution — the opposite of what the methodology is engineered for.</p>
</div>
</div>
<div className="not-row">
<span className="not-row-tag">Not 04</span>
<div className="not-row-content">
<h4>It is not <em>"E-E-A-T optimization"</em> as a service line.</h4>
<p>E-E-A-T is a Google evaluation criterion, not a methodology. It's a downstream signal of entity authority — when the methodology is applied correctly, E-E-A-T strengthens automatically. Practitioners selling "E-E-A-T audits" without addressing entity architecture are selling a symptom, not the cause.</p>
</div>
</div>
<div className="not-row">
<span className="not-row-tag">Not 05</span>
<div className="not-row-content">
<h4>It is not <em>"AI SEO"</em> as a separate practice.</h4>
<p>AI visibility is a property of correct semantic architecture, not a separate discipline bolted on after the fact. Practitioners pitching "GEO" or "AEO" or "AI SEO" as standalone services are usually missing the underlying entity work that produces AI citation in the first place.</p>
</div>
</div>
<div className="not-row">
<span className="not-row-tag">Not 06</span>
<div className="not-row-content">
<h4>It is not <em>fast.</em></h4>
<p>The methodology is engineered for compounding authority — which by definition takes time to compound. Practitioners promising semantic SEO results in 30-90 days are misrepresenting the discipline. The credible engagement window is 6–18 months for material outcomes; faster timelines indicate a different (typically tactical) approach being marketed under the wrong label.</p>
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
<h2 className="h-display">Now you know <em>how the discipline works.</em></h2>
<p>If the methodology above maps to how you'd want a serious SEO partnership engineered — entity-first, predicate-clean, AI-citable, and architected for compounding authority — the next step is a 30-minute call.</p>
<div className="final-cta-ctas">
<a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book a 30-Min Strategy Call <span className="btn-arrow"></span></a>
<a href="/build-process" className="btn btn-ghost">See the Build Process <span className="btn-arrow"></span></a>
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
