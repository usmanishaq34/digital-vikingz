'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const originalAddEventListener = document.addEventListener.bind(document);
    const patchedAddEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
      if (type === 'DOMContentLoaded') {
        if (typeof listener === 'function') {
          setTimeout(() => listener(new Event('DOMContentLoaded')), 0);
        } else if (listener && typeof listener.handleEvent === 'function') {
          setTimeout(() => listener.handleEvent(new Event('DOMContentLoaded')), 0);
        }
        return;
      }
      return originalAddEventListener(type, listener, options);
    }) as typeof document.addEventListener;

    try {
      document.addEventListener = patchedAddEventListener;
      const script = `
(function () {

  // ── PATH DETECTION ──
  // Check kar rahe hain ke hum services/ folder mein hain ya root mein
  var path     = window.location.pathname;
  var inSvc    = path.indexOf('/services/') !== -1;
  var root     = '/';
  var svcRoot  = '/services/';

  // ── LOGO & MAIN LINKS ──
  document.getElementById('logoLink').href       = root + '';
  document.getElementById('logoImg').src         = root + 'images/logo.png';
  document.getElementById('link-om').href        = root + 'operating-manual';
  document.getElementById('link-bp').href        = root + 'build-process';
  document.getElementById('link-vp').href        = root + 'vertical-playbooks';
  document.getElementById('link-audit').href     = root + 'the-audit';

  // ── SERVICE LINKS ──
  document.querySelectorAll('.svc-link').forEach(function (link) {
    var svc = link.getAttribute('data-svc');
    link.href = svcRoot + svc;
  });

  // ── MEGA MENU HOVER ──
  var dropdown = document.getElementById('servicesDropdown');
  var megaMenu = document.getElementById('megaMenu');
  var chevron  = document.getElementById('serviceChevron');

  dropdown.addEventListener('mouseenter', function () {
    if (window.innerWidth >= 960) {
      megaMenu.style.opacity      = '1';
      megaMenu.style.pointerEvents = 'all';
      megaMenu.style.transform    = 'translateY(0)';
      chevron.style.transform     = 'rotate(180deg)';
    }
  });
  dropdown.addEventListener('mouseleave', function () {
    if (window.innerWidth >= 960) {
      megaMenu.style.opacity      = '0';
      megaMenu.style.pointerEvents = 'none';
      megaMenu.style.transform    = 'translateY(-4px)';
      chevron.style.transform     = 'rotate(0deg)';
    }
  });

  // ── MOBILE MENU ──
  document.getElementById('menuBtn').addEventListener('click', function () {
    document.getElementById('navLinks').classList.toggle('show');
  });

  // ── MOBILE DROPDOWN ──
  document.getElementById('servicesToggle').addEventListener('click', function (e) {
    if (window.innerWidth < 960) {
      e.preventDefault();
      megaMenu.classList.toggle('show');
      chevron.style.transform = megaMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  });

  // ── AUTO HIGHLIGHT current service page ──
  var currentFile = path.split('/').pop();
  if (currentFile && currentFile !== '' && currentFile !== '') {
    document.querySelectorAll('.svc-link').forEach(function (link) {
      if (link.getAttribute('data-svc') === currentFile) {
        link.style.background   = '#FEF0EC';
        link.style.padding      = '8px 10px';
        link.style.borderRadius = '5px';
        link.style.margin       = '0 -2px';
        link.style.borderBottom = 'none';
        link.querySelectorAll('div').forEach(function (d) {
          d.style.color = '#C4401A';
        });
      }
    });
  }

})();



  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-answer').style.maxHeight = '0px'; }
      });
      if (isOpen) { item.classList.remove('open'); answer.style.maxHeight = '0px'; }
      else { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.section, .engagement-section').forEach(s => {
    s.style.opacity = '0'; s.style.transform = 'translateY(24px)'; s.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; observer.observe(s);
  });

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 80) { nav.style.background = 'rgba(255, 255, 255, 0.96)'; nav.style.boxShadow = '0 1px 0 rgba(10,10,10,0.06)'; }
    else { nav.style.background = 'rgba(255, 255, 255, 0.85)'; nav.style.boxShadow = 'none'; }
  });

  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle');
      const target = document.getElementById(targetId);
      if (!target) return;
      const current = target.getAttribute('data-state') || 'building';
      const next = current === 'building' ? 'outcome' : 'building';
      target.setAttribute('data-state', next);
      const rect = target.getBoundingClientRect();
      if (rect.top < -100 || rect.bottom > window.innerHeight + 100) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  });
`;
      if (script.trim()) {
        new Function(script)();
      }
    } catch (error) {
      console.error('Page script error:', error);
    } finally {
      document.addEventListener = originalAddEventListener;
    }
  }, []);

  return (
    <>
      
      {/* ============== NAV ============== */}
      <nav style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "relative", zIndex: "1000" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "62px" }}>
            {/* LOGO */}
            <a href="/" id="logoLink" className="logo" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", minWidth: "220px", flexShrink: "0" }}>
              <img id="logoImg" src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{ height: "42px", width: "42px", objectFit: "contain", display: "block", flexShrink: "0", borderRadius: "10px" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: "600", color: "#111" }}>
                Digital Vikingz
              </span>
            </a>
            {/* NAV LINKS */}
            <ul id="navLinks" style={{ display: "flex", alignItems: "center", listStyle: "none", margin: "0", padding: "0", gap: "0" }}>
              <li>
                <a id="link-om" href="/operating-manual" className="nav-link-item">
                  Operating Manual
                </a>
              </li>
              <li>
                <a id="link-bp" href="/build-process" className="nav-link-item">
                  Build Process
                </a>
              </li>
              <li>
                <a id="link-vp" href="/vertical-playbooks" className="nav-link-item">
                  Vertical Playbooks
                </a>
              </li>
              {/* SERVICES MEGA MENU */}
              <li style={{ position: "relative" }} id="servicesDropdown">
                <a href="/services/semantic-seo-architecture" id="servicesToggle" className="nav-link-item" style={{ color: "#C4401A", gap: "4px" }}>
                  Services
                  <svg id="serviceChevron" style={{ width: "10px", height: "10px", transition: "transform 0.2s", opacity: "0.7", flexShrink: "0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
                <div id="megaMenu" style={{ position: "absolute", top: "100%", left: "-20px", width: "580px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderTop: "2px solid rgba(0,0,0,0.05)", boxShadow: "0 12px 40px rgba(0,0,0,0.09)", opacity: "0", pointerEvents: "none", transform: "translateY(-4px)", transition: "opacity 0.18s ease,transform 0.18s ease", zIndex: "999" }}>
                  <div className="mega-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "24px 28px 26px", gap: "0 40px" }}>
                    {/* LEFT COLUMN */}
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>
                        Claim Tier
                      </div>
                      <ul style={{ listStyle: "none", margin: "0 0 20px 0", padding: "0" }}>
                        <li>
                          <a data-svc="semantic-seo-architecture" className="svc-link" href="/services/semantic-seo-architecture" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic SEO Architecture
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              12-month authority blueprint
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="semantic-content-audit" className="svc-link" href="/services/semantic-content-audit" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Audit
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Diagnostic foundation · $2000
                            </div>
                          </a>
                        </li>
                      </ul>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>
                        Scale Tier
                      </div>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                        <li>
                          <a data-svc="semantic-content-production" className="svc-link" href="/services/semantic-content-production" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Production
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Execute at velocity
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="pipeline-attribution-seo" className="svc-link" href="/services/pipeline-attribution-seo" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Pipeline Attribution SEO
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              SEO tied to pipeline
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* RIGHT COLUMN */}
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>
                        Shield Tier
                      </div>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                        <li>
                          <a data-svc="llm-ai-search-visibility" className="svc-link" href="/services/llm-ai-search-visibility" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              LLM &amp; AI Search Visibility
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Get cited by AI search
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="authority-link-building" className="svc-link" href="/services/authority-link-building" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Authority Link Building
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Methodology-grade links
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="semantic-content-network" className="svc-link" href="/services/semantic-content-network" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Network
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              External authority distribution
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a id="link-audit" href="/the-audit" className="nav-link-item">
                  The Audit
                </a>
              </li>
              <li>
                <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" style={{ fontFamily: "'Inter',sans-serif", background: "#db4c23", color: "#fff", borderRadius: "5px", fontWeight: "700", fontSize: "13px", padding: "9px 20px", letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", marginLeft: "10px", display: "inline-block" }}>
                  Book Strategy Call
                </a>
              </li>
            </ul>
            <button id="menuBtn" style={{ display: "none", cursor: "pointer", background: "none", border: "1px solid #ddd", fontFamily: "'Inter',sans-serif", fontSize: "14px", padding: "7px 16px", borderRadius: "6px", fontWeight: "500", color: "#333" }}>
              Menu
            </button>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <header className="hero service-hero">
        <div className="hero-grid-bg"></div>
        <div className="wrap">
          <div className="hero-breadcrumb">
            <a href="https://digitalvikingz.com">
              Home
            </a>
            <span className="hero-breadcrumb-sep">
              /
            </span>
            <a href="/#inside">
              Services
            </a>
            <span className="hero-breadcrumb-sep">
              /
            </span>
            <span className="hero-breadcrumb-current">
              Semantic Content Audit
            </span>
          </div>
          <span className="hero-tier-pill">
            <strong>
              CLAIM TIER
            </strong>
            · Service 02 · Diagnostic Foundation
          </span>
          <h1 className="h-display hero-h1">
            Diagnose what's actually
            {' '}
            <em>
              broken.
            </em>
          </h1>
          <p className="hero-sub">
            A
            {' '}
            <strong>
              fixed-scope diagnostic
            </strong>
            {' '}
            of your site's entity coverage, predicate consistency, semantic dilution, AI citation readiness, and technical infrastructure. Delivered as a 25–40 page written report with prioritized issue map. Yours to keep, execute internally, or use as the foundation of architecture work.
          </p>
          <div className="hero-meta-strip">
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Tier
              </span>
              <span className="hero-meta-value">
                <em>
                  Claim
                </em>
              </span>
            </div>
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Duration
              </span>
              <span className="hero-meta-value">
                2–3
                {' '}
                <em>
                  phases
                </em>
              </span>
            </div>
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Deliverable
              </span>
              <span className="hero-meta-value">
                25–40
                {' '}
                <em>
                  pages
                </em>
              </span>
            </div>
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Pricing
              </span>
              <span className="hero-meta-value">
                $2000
                {' '}
                <em>
                  USD
                </em>
              </span>
            </div>
          </div>
          <div className="hero-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
              Book Strategy Call
              <span className="btn-arrow"></span>
            </a>
            <a href="#inside" className="btn btn-ghost">
              See What's Inside
              <span className="btn-arrow"></span>
            </a>
          </div>
        </div>
      </header>
      {/* WHAT'S INSIDE */}
      <section className="section inside" id="inside">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                01 / The Deliverable
              </span>
              <h2 className="h-display section-h2">
                What's actually
                {' '}
                <em>
                  inside the engagement.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              Seven diagnostic components run sequentially across the audit. Each one produces written findings that flow into the final prioritized issue map.
              {' '}
              <strong>
                No vague "SEO health checks."
              </strong>
              {' '}
              Every component has a defined scope, defined output, and defined contribution to the recommendation layer.
            </p>
          </div>
          <div className="inside-grid deliverable-style-grid">
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 01
                </span>
                <div className="inside-card-icon">
                  E
                </div>
              </div>
              <h3>
                Entity Coverage
                {' '}
                <em>
                  Analysis
                </em>
              </h3>
              <p>
                Maps your existing entity footprint against the topic's full attribute space. Identifies where the Central Entity is well-defined, fragmented, or where coverage gaps create competitor opportunities. Output:
                {' '}
                <strong>
                  entity coverage heatmap
                </strong>
                {' '}
                with severity scoring.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 02
                </span>
                <div className="inside-card-icon">
                  P
                </div>
              </div>
              <h3>
                Predicate Consistency
                {' '}
                <em>
                  Review
                </em>
              </h3>
              <p>
                Audits how the same relationships between entities are described across pages. Flags inconsistent predicate language fragmenting authority. Output:
                {' '}
                <strong>
                  predicate consistency report
                </strong>
                {' '}
                with documented examples and proposed unified vocabulary.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 03
                </span>
                <div className="inside-card-icon">
                  S
                </div>
              </div>
              <h3>
                Semantic Dilution
                {' '}
                <em>
                  Diagnostic
                </em>
              </h3>
              <p>
                Identifies content drift — pages, clusters, or topics pulling authority away from the Central Entity. Locates Source Term Vector violations, off-topic content, category-confusing assets. Output:
                {' '}
                <strong>
                  dilution map
                </strong>
                {' '}
                with prune/redirect/restructure recommendations.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 04
                </span>
                <div className="inside-card-icon">
                  A
                </div>
              </div>
              <h3>
                AI Citation
                {' '}
                <em>
                  Readiness
                </em>
              </h3>
              <p>
                Evaluates how ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews currently see your site. Tests against representative queries. Identifies why retrievals fail. Output:
                {' '}
                <strong>
                  AI visibility diagnostic
                </strong>
                {' '}
                with citation-readiness scoring per cluster.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 05
                </span>
                <div className="inside-card-icon">
                  T
                </div>
              </div>
              <h3>
                Technical Entity
                {' '}
                <em>
                  Infrastructure
                </em>
              </h3>
              <p>
                Reviews schema, structured data, internal linking, and crawl signals — only the parts affecting entity recognition.
                {' '}
                <strong>
                  Not a generic technical SEO audit
                </strong>
                {' '}
                — every finding ties back to entity authority impact. Output:
                {' '}
                <strong>
                  technical findings
                </strong>
                {' '}
                tied to entity outcomes.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 06
                </span>
                <div className="inside-card-icon">
                  C
                </div>
              </div>
              <h3>
                Competitive Entity
                {' '}
                <em>
                  Positioning
                </em>
              </h3>
              <p>
                Maps your entity authority against 3–5 ranking competitors. Identifies where they hold structural advantage, where you have defensible openings, which clusters are realistically winnable. Output:
                {' '}
                <strong>
                  competitive entity gap analysis
                </strong>
                {' '}
                with prioritized opportunities.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 07
                </span>
                <div className="inside-card-icon">
                  M
                </div>
              </div>
              <h3>
                Prioritized
                {' '}
                <em>
                  Issue Map
                </em>
              </h3>
              <p>
                Synthesis layer. All findings consolidated into severity-scored, sequenced issue map with proposed remediation paths. Each issue tagged with effort estimate, expected impact, dependencies. Output:
                {' '}
                <strong>
                  actionable roadmap
                </strong>
                {' '}
                your team or ours can execute against.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ENGAGEMENT CONSOLE TWO-STATE */}
      <section className="engagement-section">
        <div className="wrap">
          <div className="engagement-head">
            <div className="engagement-head-left">
              <span className="label">
                02 / The Console
              </span>
              <h2 className="h-display section-h2">
                Engagement,
                {' '}
                <em>
                  in two states.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              The audit runs through 6 active diagnostic components.
              {' '}
              <strong>
                Building mode
              </strong>
              {' '}
              shows the audit mid-flight.
              {' '}
              <strong>
                Outcome mode
              </strong>
              {' '}
              shows the deliverable at handoff. Toggle to see both.
            </p>
          </div>
          <div className="engagement-console" id="engagementConsole" data-state="building">
            <div className="ec-header">
              <div className="ec-header-left">
                <span className="ec-pill">
                  <span className="ec-state-block ec-state-building">
                    Live · Building
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Live · Outcome
                  </span>
                </span>
                <span className="ec-title">
                  <span className="ec-state-block ec-state-building">
                    Engagement:
                    {' '}
                    <strong>
                      Audit in flight · phase 02 of 2–3
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Engagement:
                    {' '}
                    <strong>
                      Audit complete · 6 components synthesized
                    </strong>
                  </span>
                </span>
              </div>
              <button type="button" className="ec-toggle-btn" data-toggle="engagementConsole" aria-label="Toggle between building and outcome">
                <span className="ec-toggle-dot"></span>
                <span className="ec-state-block ec-state-building">
                  See completion
                </span>
                <span className="ec-state-block ec-state-outcome">
                  Back to building
                </span>
              </button>
            </div>
            <div className="ec-grid">
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 01
                </span>
                <div className="ec-card-name">
                  Entity
                  {' '}
                  <em>
                    Coverage
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Mapping:
                    {' '}
                    <strong>
                      SERP attribute inventory · gaps surfacing
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Mapped:
                    {' '}
                    <strong>
                      entity footprint scored · 12 coverage gaps flagged
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Diagnosing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Scored
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 02
                </span>
                <div className="ec-card-name">
                  Predicate
                  {' '}
                  <em>
                    Audit
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Reviewing:
                    {' '}
                    <strong>
                      cross-page predicate language · drift surfacing
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Audited:
                    {' '}
                    <strong>
                      18 inconsistencies documented · canonical forms proposed
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Reviewing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Documented
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 03
                </span>
                <div className="ec-card-name">
                  Dilution
                  {' '}
                  <em>
                    Diagnostic
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Surfacing:
                    {' '}
                    <strong>
                      off-vector content · drift assets identifying
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Surfaced:
                    {' '}
                    <strong>
                      23 dilution sources · prune/redirect plan delivered
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Surfacing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Mapped
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 04
                </span>
                <div className="ec-card-name">
                  AI
                  {' '}
                  <em>
                    Citation Test
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Testing:
                    {' '}
                    <strong>
                      12 representative queries · 4 LLM surfaces
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Tested:
                    {' '}
                    <strong>
                      0/12 retrievals · root cause analysis delivered
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Testing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Diagnosed
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 05
                </span>
                <div className="ec-card-name">
                  Technical
                  {' '}
                  <em>
                    Layer
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Auditing:
                    {' '}
                    <strong>
                      schema · linking · entity recognition signals
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Audited:
                    {' '}
                    <strong>
                      8 technical findings · all tied to entity impact
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Auditing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Tied
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 06
                </span>
                <div className="ec-card-name">
                  Issue
                  {' '}
                  <em>
                    Map
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Synthesizing:
                    {' '}
                    <strong>
                      findings consolidating · priority scoring underway
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Synthesized:
                    {' '}
                    <strong>
                      40-row roadmap · severity-scored · sequenced
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Synthesizing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Roadmapped
                  </span>
                </div>
              </div>
            </div>
            <div className="ec-outcome-banner ec-state-block ec-state-outcome">
              <span className="ec-outcome-tag">
                Engagement complete · representative outcome
              </span>
              <div className="ec-outcome-text">
                All 6 diagnostic components
                {' '}
                <strong>
                  complete and synthesized
                </strong>
                {' '}
                into the prioritized issue map · 25–40 page audit document delivered · live walkthrough call scheduled · 30 days of follow-up Q&amp;A activated.
              </div>
            </div>
            <div className="ec-foot">
              <span className="ec-foot-text">
                <span className="ec-state-block ec-state-building">
                  Live engagement ·
                  {' '}
                  <strong>
                    active build cycle
                  </strong>
                  · components in flight
                </span>
                <span className="ec-state-block ec-state-outcome">
                  Cycle outcome ·
                  {' '}
                  <strong>
                    compounding state
                  </strong>
                  · ready for next cycle
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* WHO IT'S FOR */}
      <section className="section fit">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                03 / The Fit
              </span>
              <h2 className="h-display section-h2">
                Who this
                {' '}
                <em>
                  fits.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              This engagement produces real outcomes for businesses ready for the methodology — and frustrates businesses looking for quick fixes. The fit map below is honest. If your business is in the right column, an audit-first approach or a different service is the better starting point.
            </p>
          </div>
          <div className="fit-grid">
            <div className="fit-col yes">
              <span className="fit-tag">
                Where it fits
              </span>
              <h3>
                This audit
                {' '}
                <em>
                  works
                </em>
                {' '}
                if you...
              </h3>
              <ul className="fit-list">
                <li>
                  Have an existing site with content already published
                </li>
                <li>
                  Suspect rankings have flatlined or reset after Google updates
                </li>
                <li>
                  Need a written diagnostic before committing to a longer engagement
                </li>
                <li>
                  Want a prioritized roadmap your internal team can execute
                </li>
                <li>
                  Need diagnostic data to bring to internal stakeholders or board
                </li>
                <li>
                  Are evaluating multiple SEO partners and need a deliverable to compare
                </li>
                <li>
                  Have AI citation gaps you can't diagnose with traditional SEO tools
                </li>
              </ul>
            </div>
            <div className="fit-col no">
              <span className="fit-tag">
                Where it doesn't
              </span>
              <h3>
                This isn't right if you...
              </h3>
              <ul className="fit-list">
                <li>
                  Have no published content yet — you need architecture, not audit
                </li>
                <li>
                  Want a list of keywords to target — this isn't keyword research
                </li>
                <li>
                  Need a generic "SEO health check" — this is entity-level diagnostics
                </li>
                <li>
                  Are unwilling to act on the findings — the audit produces work, not magic
                </li>
                <li>
                  Need rankings improvements within 30–60 days — this surfaces issues, fixes take quarters
                </li>
                <li>
                  Need backlink opportunities — this is structural, not link-acquisition
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* TIMELINE */}
      <section className="section timeline">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                04 / The Timeline
              </span>
              <h2 className="h-display section-h2">
                How the engagement
                {' '}
                <em>
                  runs.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              The audit runs on a fixed 2–3 phase schedule. phase 01 is intake and access provisioning — your team's only material time commitment. phase 02 is diagnostic execution. phase 03 is synthesis and walkthrough.
            </p>
          </div>
          <div className="timeline-wrap">
            <div className="timeline-row timeline-row-header">
              <div className="timeline-phase">
                Phase
              </div>
              <div className="timeline-action">
                Activity
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 01
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Intake &amp; Access Provisioning
                </div>
                <div className="timeline-action-detail">
                  90-minute intake call · business context capture · access provisioning (GSC, GA4, CMS read-only) · scope confirmation.
                  {' '}
                  <strong>
                    Your team's time: ~2 hours total.
                  </strong>
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                phase 02
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Diagnostic Execution
                </div>
                <div className="timeline-action-detail">
                  All 7 diagnostic components run sequentially. Entity coverage · predicate consistency · semantic dilution · AI citation testing · technical infrastructure · competitive positioning.
                  {' '}
                  <strong>
                    Your team's time: zero.
                  </strong>
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                phase 03
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Synthesis · Deliverable · Walkthrough
                </div>
                <div className="timeline-action-detail">
                  Findings synthesized into prioritized issue map · 25–40 page audit document compiled · 60-minute live walkthrough call.
                  {' '}
                  <strong>
                    Decision point
                  </strong>
                  {' '}
                  — proceed to architecture, execute internally, or close with the roadmap.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PRICING */}
      <section className="section pricing" id="pricing">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                05 / Pricing
              </span>
              <h2 className="h-display section-h2">
                Pricing &amp;
                {' '}
                <em>
                  engagement model.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              The audit is a productized engagement — fully scoped before kickoff, no surprise additions. Final pricing depends on site complexity (page count, vertical complexity, multilingual scope). The audit is the lowest-commitment way to validate fit before architecture work.
            </p>
          </div>
          <div className="pricing-card">
            <div className="pricing-left">
              <h3>
                Semantic Content
                {' '}
                <em>
                  Audit
                </em>
              </h3>
              <div className="pricing-amount">
                <span className="pricing-amount-prefix">
                  Starts at
                </span>
                <span className="pricing-amount-value">
                  $2000
                </span>
              </div>
              <p>
                Single payment · invoiced at kickoff · 50% upfront / 50% on deliverable · USD wire or Wise. Audit fee
                {' '}
                <strong>
                  credited toward architecture engagement
                </strong>
                {' '}
                if started within 60 days of deliverable.
              </p>
              <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
                Book Strategy Call
                <span className="btn-arrow"></span>
              </a>
            </div>
            <div className="pricing-included">
              <span className="pricing-included-label">
                What's Included
              </span>
              <ul>
                <li>
                  All 7 diagnostic components
                </li>
                <li>
                  25–40 page audit document (DOCX)
                </li>
                <li>
                  Prioritized issue map with severity scoring
                </li>
                <li>
                  Entity coverage heatmap (visual)
                </li>
                <li>
                  AI visibility diagnostic across 4 LLM surfaces
                </li>
                <li>
                  Competitive entity gap analysis (3–5 competitors)
                </li>
                <li>
                  Recommendation map with effort &amp; impact estimates
                </li>
                <li>
                  60-minute live walkthrough call
                </li>
                <li>
                  30 days of follow-up Q&amp;A via email
                </li>
                <li>
                  Audit fee credited toward architecture (60-day window)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="section faq">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                06 / Questions
              </span>
              <h2 className="h-display section-h2">
                What buyers ask
                {' '}
                <em>
                  before committing.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              The questions below come up most often during scoping calls for this engagement.
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
                  <p>
                    The base price covers a single-language site with up to 200 indexed pages, 1 vertical, and standard scope (no regulatory or YMYL specialization). Pricing scales upward for:
                    {' '}
                    <strong>
                      multilingual sites
                    </strong>
                    {' '}
                    (additional language adds $800–$1500),
                    {' '}
                    <strong>
                      large sites
                    </strong>
                    {' '}
                    (500+ pages adds $1,500),
                    {' '}
                    <strong>
                      YMYL verticals
                    </strong>
                    {' '}
                    (medical, legal, financial — adds $2,000 for SME-grade review), and
                    {' '}
                    <strong>
                      multiple verticals
                    </strong>
                    {' '}
                    on one domain.
                  </p>
                  <p>
                    Final pricing is locked during the intake call before any work starts.
                  </p>
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
                  <p>
                    Traditional SEO audits diagnose technical issues, content gaps, and backlink profile health. The Semantic Audit operates at the
                    {' '}
                    <strong>
                      entity layer
                    </strong>
                    {' '}
                    — it diagnoses how cleanly your Central Entity is defined, how consistently your predicates run, how completely your topical map covers the buyer's question space, and how AI retrieval models currently see your site.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Do I need to commit to architecture afterward?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    No. The audit is a
                    {' '}
                    <strong>
                      standalone productized engagement
                    </strong>. You pay for the audit, receive the deliverable, and decide independently what to do next. Many clients close with us after the audit and execute the roadmap internally.
                  </p>
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
                  <p>
                    Three artifacts ship at end of phase 03: (1) the
                    {' '}
                    <strong>
                      main audit document
                    </strong>
                    {' '}
                    in DOCX format (25–40 pages), (2) the
                    {' '}
                    <strong>
                      prioritized issue map
                    </strong>
                    {' '}
                    as a separate spreadsheet, and (3) the
                    {' '}
                    <strong>
                      entity coverage heatmap
                    </strong>
                    {' '}
                    as both an embedded visual and exportable PDF.
                  </p>
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
                  <p>
                    Yes. The deliverable is yours after delivery — no NDA constraints. We treat this as a feature, not a leak. A buyer who runs a methodology-grade audit through three competing agencies and chooses us based on the depth is a stronger fit than one who only saw our pitch.
                  </p>
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
                  <p>
                    The audit isn't the right product for greenfield sites. There's nothing structural to audit yet.
                    {' '}
                    <strong>
                      Pre-launch sites need architecture, not audit
                    </strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RELATED */}
      <section className="section related">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                07 / Adjacent Services
              </span>
              <h2 className="h-display section-h2">
                What pairs with
                {' '}
                <em>
                  this service.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              These services run upstream, downstream, or alongside this engagement. Most clients sequence them in tier order: Claim → Shield → Scale.
            </p>
          </div>
          <div className="related-grid">
            <a href="semantic-seo-architecture" className="related-card">
              <span className="related-tier">
                Claim · Service 01
              </span>
              <div className="related-name">
                Semantic SEO
                {' '}
                <em>
                  Architecture
                </em>
              </div>
              <div className="related-desc">
                The strategic build that follows audit. 12-month authority blueprint. Most audit clients proceed here.
              </div>
              <div className="related-arrow">
                View service →
              </div>
            </a>
            <a href="llm-ai-search-visibility" className="related-card">
              <span className="related-tier">
                Shield · Service 03
              </span>
              <div className="related-name">
                LLM &amp; AI Search
                {' '}
                <em>
                  Visibility
                </em>
              </div>
              <div className="related-desc">
                Solve the AI citation gaps the audit surfaces. Engineer entity recognition at the LLM layer.
              </div>
              <div className="related-arrow">
                View service →
              </div>
            </a>
            <a href="semantic-content-production" className="related-card">
              <span className="related-tier">
                Scale · Service 06
              </span>
              <div className="related-name">
                Semantic Content
                {' '}
                <em>
                  Production
                </em>
              </div>
              <div className="related-desc">
                Execute the audit's issue map at velocity. Briefs · drafts · editorial QA · schema deployment.
              </div>
              <div className="related-arrow">
                View service →
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="wrap">
          <span className="label final-cta-label">
            08 / The Next Step
          </span>
          <h2 className="h-display">
            Diagnose what's actually
            {' '}
            <em>
              broken.
            </em>
          </h2>
          <p>
            The audit is the lowest-commitment path to working with Digital Vikingz. You receive a structurally complete diagnostic of your site's authority infrastructure — yours to keep regardless of what you decide next.
          </p>
          <div className="final-cta-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
              Book Strategy Call
              <span className="btn-arrow"></span>
            </a>
            <a href="../the-audit" className="btn btn-ghost">
              See Full Audit Page
              <span className="btn-arrow"></span>
            </a>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="../" className="logo">
                <img src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" />
                <span>
                  Digital Vikingz
                </span>
              </a>
              <p>
                Semantic SEO authority agency built on Koray Tuğberk Gübür's methodology. We architect topical authority, defend it against AI dilution, and convert it into pipeline.
              </p>
              <div className="footer-location">
                Based in Bahawalpur
                <span>
                  ·
                </span>
                Serving US · UK · CA · AU · DE
              </div>
            </div>
            <div className="footer-col">
              <h5>
                Services
              </h5>
              <ul>
                <li>
                  <a href="semantic-seo-architecture">
                    Semantic SEO Architecture
                  </a>
                </li>
                <li>
                  <a href="semantic-content-audit">
                    Semantic Content Audit
                  </a>
                </li>
                <li>
                  <a href="llm-ai-search-visibility">
                    LLM &amp; AI Search Visibility
                  </a>
                </li>
                <li>
                  <a href="authority-link-building" style={{ color: "var(--accent)" }}>
                    Authority Link Building
                  </a>
                </li>
                <li>
                  <a href="semantic-content-network">
                    Semantic Content Network
                  </a>
                </li>
                <li>
                  <a href="semantic-content-production">
                    Semantic Content Production
                  </a>
                </li>
                <li>
                  <a href="pipeline-attribution-seo">
                    Pipeline Attribution SEO
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>
                Agency
              </h5>
              <ul>
                <li>
                  <a href="../about">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="../contact">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="../blog">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="../operating-manual">
                    Operating Manual
                  </a>
                </li>
                <li>
                  <a href="../build-process">
                    Build Process
                  </a>
                </li>
                <li>
                  <a href="/#rankings">
                    Live Rankings
                  </a>
                </li>
                <li>
                  <a href="../vertical-playbooks">
                    Vertical Playbooks
                  </a>
                </li>
                <li>
                  <a href="../the-audit">
                    The Audit
                  </a>
                </li>
                <li>
                  <a href="../privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener">
                    Book a Call
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>
                Connect
              </h5>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/company/digital-vikingz/" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/DigitalVikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/digitalvikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path>
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@DigitalVikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path>
                    </svg>
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="mailto:workwithus@digitalvikingz.com" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                    </svg>
                    workwithus@digitalvikingz.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-text">
              © 2026 Digital Vikingz · All rights reserved
            </div>
            <div className="footer-tagline">
              Claim
              <span>
                .
              </span>
              Shield
              <span>
                .
              </span>
              Scale
              <span>
                .
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
