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
              LLM &amp; AI Search Visibility
            </span>
          </div>
          <span className="hero-tier-pill">
            <strong>
              SHIELD TIER
            </strong>
            · Service 03 · AI Visibility Layer
          </span>
          <h1 className="h-display hero-h1">
            Get cited by
            {' '}
            <em>
              AI search.
            </em>
          </h1>
          <p className="hero-sub">
            A continuous engagement to engineer your site for retrieval by
            {' '}
            <strong>
              ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews
            </strong>. Entity-clean infrastructure, E-A-V triple production, schema deployment, citation diagnostics, and structural reinforcement — designed to make your entity the one AI systems retrieve from on your category's queries.
          </p>
          <div className="hero-meta-strip">
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Tier
              </span>
              <span className="hero-meta-value">
                <em>
                  Shield
                </em>
              </span>
            </div>
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Duration
              </span>
              <span className="hero-meta-value">
                Continuous
              </span>
            </div>
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Deliverable
              </span>
              <span className="hero-meta-value">
                Citation
                {' '}
                <em>
                  infrastructure
                </em>
              </span>
            </div>
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Pricing
              </span>
              <span className="hero-meta-value">
                Custom
                {' '}
                <em>
                  scoped
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
              Six continuous workstreams run across the engagement. Each one operates on a defined cadence, with measurable AI retrieval outcomes.
              {' '}
              <strong>
                Not "we'll write FAQs"
              </strong>
              {' '}
              — entity-level engineering of the structural properties that make AI systems retrieve from your site over competitors.
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
                E-A-V Triple
                {' '}
                <em>
                  Production
                </em>
              </h3>
              <p>
                Structured Entity-Attribute-Value triples deployed across priority pages.
                {' '}
                <strong>
                  The relational format LLMs retrieve from.
                </strong>
                {' '}
                Each triple validated against schema and tied to a buyer-stage query.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 02
                </span>
                <div className="inside-card-icon">
                  S
                </div>
              </div>
              <h3>
                Schema
                {' '}
                <em>
                  Deployment
                </em>
              </h3>
              <p>
                Article, FAQ, Breadcrumb, HowTo, Organization, and Product schema types deployed at scale.
                {' '}
                <strong>
                  Tied to entity recognition
                </strong>, not generic SEO hygiene. Validated against Google's structured data testing tool monthly.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 03
                </span>
                <div className="inside-card-icon">
                  Q
                </div>
              </div>
              <h3>
                Query
                {' '}
                <em>
                  Diagnostics
                </em>
              </h3>
              <p>
                <strong>
                  Monthly testing
                </strong>
                {' '}
                across 4 LLM surfaces (GPT, Perplexity, Claude, Gemini) on 30–60 representative queries. Citation-readiness scored per cluster. Failures root-caused.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 04
                </span>
                <div className="inside-card-icon">
                  R
                </div>
              </div>
              <h3>
                Retrieval
                {' '}
                <em>
                  Reinforcement
                </em>
              </h3>
              <p>
                Iterative content adjustments based on citation diagnostic findings. Pages that fail retrieval get restructured for E-A-V clarity.
                {' '}
                <strong>
                  Closes the AI visibility gap
                </strong>
                {' '}
                systematically.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 05
                </span>
                <div className="inside-card-icon">
                  I
                </div>
              </div>
              <h3>
                Information Gain
                {' '}
                <em>
                  Engineering
                </em>
              </h3>
              <p>
                Ensures published content contributes
                {' '}
                <strong>
                  net-new attributes
                </strong>
                {' '}
                beyond the SERP agreement area. Pages with novel attribute coverage get retrieved disproportionately by LLMs.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 06
                </span>
                <div className="inside-card-icon">
                  M
                </div>
              </div>
              <h3>
                Monthly Visibility
                {' '}
                <em>
                  Reporting
                </em>
              </h3>
              <p>
                Cluster-by-cluster AI retrieval scorecard. Which queries earned citations, which didn't, why — with
                {' '}
                <strong>
                  specific remediation actions
                </strong>
                {' '}
                for the next cycle.
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
              Below: the engagement compressed into 6 active components.
              {' '}
              <strong>
                Building mode
              </strong>
              {' '}
              shows the engagement at month 02 (typical for new clients).
              {' '}
              <strong>
                Outcome mode
              </strong>
              {' '}
              shows representative state at month 06.
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
                      Visibility build · Month 02 of continuous
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Engagement:
                    {' '}
                    <strong>
                      Visibility live · representative state · month 06
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
                  E-A-V
                  {' '}
                  <em>
                    Production
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Producing:
                    {' '}
                    <strong>
                      120 triples specified · 84 deployed
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Deployed:
                    {' '}
                    <strong>
                      340 triples live across all priority pages
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Producing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Live
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 02
                </span>
                <div className="ec-card-name">
                  Schema
                  {' '}
                  <em>
                    Deployment
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Deploying:
                    {' '}
                    <strong>
                      4 types · 60% coverage · validation underway
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Deployed:
                    {' '}
                    <strong>
                      6 schema types · 100% coverage · validated
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Deploying
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Validated
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 03
                </span>
                <div className="ec-card-name">
                  Query
                  {' '}
                  <em>
                    Testing
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Testing:
                    {' '}
                    <strong>
                      30 queries · 4 surfaces · monthly cycle
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Tested:
                    {' '}
                    <strong>
                      247 verified retrievals · 4 LLM surfaces
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Testing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ 247 cites
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 04
                </span>
                <div className="ec-card-name">
                  Retrieval
                  {' '}
                  <em>
                    Reinforcement
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Reinforcing:
                    {' '}
                    <strong>
                      12 pages restructured this cycle
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Reinforced:
                    {' '}
                    <strong>
                      84 pages restructured · all clear retrieval
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Reinforcing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Cleared
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 05
                </span>
                <div className="ec-card-name">
                  Info Gain
                  {' '}
                  <em>
                    Engineering
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Engineering:
                    {' '}
                    <strong>
                      3 net-new attributes per cluster
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Engineered:
                    {' '}
                    <strong>
                      18 net-new attributes · category-defining
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Engineering
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Net-new
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 06
                </span>
                <div className="ec-card-name">
                  Monthly
                  {' '}
                  <em>
                    Reporting
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Reporting:
                    {' '}
                    <strong>
                      cluster scorecard · cycle 02 in progress
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Reporting:
                    {' '}
                    <strong>
                      cluster scorecard · cycle 06 · trending up
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Reporting
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Trending
                  </span>
                </div>
              </div>
            </div>
            <div className="ec-outcome-banner ec-state-block ec-state-outcome">
              <span className="ec-outcome-tag">
                Engagement complete · representative outcome
              </span>
              <div className="ec-outcome-text">
                All 6 components
                {' '}
                <strong>
                  operational and compounding
                </strong>
                · 247 verified AI citations across 4 LLM surfaces · 100% schema coverage · cluster-by-cluster reporting cycle stable · category-defining authority compounds without further architectural intervention.
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
                This engagement
                {' '}
                <em>
                  works
                </em>
                {' '}
                if you...
              </h3>
              <ul className="fit-list">
                <li>
                  Operate in a category where buyers increasingly use AI search for discovery
                </li>
                <li>
                  Have an existing topical architecture (or are building one alongside)
                </li>
                <li>
                  Want measurable AI citation outcomes per cluster, per cycle
                </li>
                <li>
                  Recognize AI visibility as structural, not a one-time fix
                </li>
                <li>
                  Want to be the entity AI retrieves from on your category's queries
                </li>
                <li>
                  Are willing to commit to multi-month cycles for compounding results
                </li>
                <li>
                  Need monthly visibility reporting your team or stakeholders can act on
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
                  Have no Central Entity defined yet — start with architecture first
                </li>
                <li>
                  Want a one-time "AI optimization" fix — this is continuous engineering
                </li>
                <li>
                  Believe AI citations don't matter for your category — fair, but we're wrong fit
                </li>
                <li>
                  Need traditional Google ranking improvements as the primary outcome
                </li>
                <li>
                  Don't have publishing capacity to support cluster reinforcement cycles
                </li>
                <li>
                  Are pre-launch with no published content — architecture before visibility
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
              The engagement runs in continuous monthly cycles after a 4-phase onboarding phase. Most clients see measurable AI citation gains by month 03 and category-defining retrieval by month 06–09.
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
                  Onboarding &amp; Baseline
                </div>
                <div className="timeline-action-detail">
                  Citation diagnostic across 30–60 representative queries · 4 LLM surfaces · root cause analysis · E-A-V triple production specification · schema deployment plan · cluster prioritization. Foundation for all monthly cycles.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 02
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Continuous Production
                </div>
                <div className="timeline-action-detail">
                  E-A-V triples deployed in priority order · schema rolled out · failed-retrieval pages restructured · Information Gain engineering across new content · monthly query testing cycle.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 03
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Reporting &amp; Reinforcement
                </div>
                <div className="timeline-action-detail">
                  Monthly visibility scorecard · cluster-by-cluster citation tracking · remediation specifications for next cycle · trending analysis. Cycle compounds quarter over quarter.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 04
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Strategic Review
                </div>
                <div className="timeline-action-detail">
                  Quarterly review of visibility progression · priorities re-sequenced based on category shifts · LLM model changes integrated into testing protocol · cycle continues.
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
              Continuous engagement priced as monthly retainer + onboarding fee. Final pricing depends on cluster count, query test surface, vertical regulatory layer, and reporting cadence.
              {' '}
              <strong>
                All pricing locked at kickoff
              </strong>
              {' '}
              with monthly cycles billed in advance.
            </p>
          </div>
          <div className="pricing-card">
            <div className="pricing-left">
              <h3>
                LLM &amp; AI Search
                {' '}
                <em>
                  Visibility
                </em>
              </h3>
              <div className="pricing-amount">
                <span className="pricing-amount-prefix">
                  Pricing
                </span>
                <span className="pricing-amount-value">
                  Custom
                </span>
              </div>
              <p>
                Onboarding fee at kickoff (Phase 01) · monthly retainer thereafter (Phase 02+). Minimum 6-month engagement to allow citation outcomes to compound. Cycle review after month 06 for scope continuation.
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
                  All 6 continuous workstreams
                </li>
                <li>
                  Onboarding citation diagnostic (30–60 queries)
                </li>
                <li>
                  E-A-V triple production at scale
                </li>
                <li>
                  Schema deployment across 6 types
                </li>
                <li>
                  Monthly query testing across 4 LLM surfaces
                </li>
                <li>
                  Retrieval reinforcement on failed pages
                </li>
                <li>
                  Information Gain engineering on new content
                </li>
                <li>
                  Monthly visibility scorecard report
                </li>
                <li>
                  Quarterly strategic review
                </li>
                <li>
                  Slack/email channel for cycle questions
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
                How long until I see AI citation improvements?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Measurable improvements typically appear by
                    {' '}
                    <strong>
                      month 03
                    </strong>
                    {' '}
                    as the first round of E-A-V triples and schema deploy. Category-defining retrieval (where your entity becomes the one AI systems prefer to cite) typically takes
                    {' '}
                    <strong>
                      6–9 months
                    </strong>
                    {' '}
                    of continuous engagement.
                  </p>
                  <p>
                    This is structural work, not switch-flipping. Authority compounds.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Which LLMs do you test against?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Standard test panel:
                    {' '}
                    <strong>
                      ChatGPT (GPT-4 and beyond)
                    </strong>,
                    {' '}
                    <strong>
                      Perplexity
                    </strong>,
                    {' '}
                    <strong>
                      Claude
                    </strong>, and
                    {' '}
                    <strong>
                      Gemini
                    </strong>. We also spot-check Google's AI Overviews where they appear for category queries. We expand the panel as new retrieval surfaces emerge.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Do I need an existing topical architecture for this to work?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Strongly recommended. AI visibility engineering operates on top of architectural foundation. If your Central Entity is fragmented or your topical map is incomplete, citation engineering compounds slowly.
                  </p>
                  <p>
                    If you don't have architecture yet, we typically scope architecture + visibility together as a sequenced engagement.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Is this just schema markup?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    No. Schema is one of 6 workstreams. The bigger leverage is in
                    {' '}
                    <strong>
                      E-A-V triple production
                    </strong>,
                    {' '}
                    <strong>
                      Information Gain engineering
                    </strong>, and
                    {' '}
                    <strong>
                      retrieval reinforcement
                    </strong>
                    {' '}
                    — which are content-layer disciplines, not technical-layer ones. Schema alone gets you partway; the rest is structural content engineering.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How do you measure success?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Cluster-by-cluster AI citation tracking. Each cluster has a representative query set tested monthly across 4 surfaces. Success = sustained citation rates increasing quarter over quarter.
                    {' '}
                    <strong>
                      Vanity metrics like impressions or rankings are not the success measure
                    </strong>
                    {' '}
                    — verified retrievals are.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What's the minimum engagement length?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    6 months. AI citation outcomes are structural and compound over cycles. A 1–3 month engagement produces work without producing the outcomes the work is engineered for. We've declined shorter engagements where the math didn't favor the client.
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
                The foundation. AI visibility engineering compounds dramatically faster on architected sites.
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
                Pairs with visibility — every new content asset is engineered with retrieval signals from production.
              </div>
              <div className="related-arrow">
                View service →
              </div>
            </a>
            <a href="semantic-content-network" className="related-card">
              <span className="related-tier">
                Shield · Service 05
              </span>
              <div className="related-name">
                Semantic Content
                {' '}
                <em>
                  Network
                </em>
              </div>
              <div className="related-desc">
                External authority distribution. Reinforces AI visibility through citation patterns across the open web.
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
            Become the entity
            {' '}
            <em>
              AI retrieves from.
            </em>
          </h2>
          <p>
            AI search is reshaping how buyers discover. The agencies that engineered for it early are compounding citations. The ones that didn't are watching their organic traffic decline. Get on the right side of the shift.
          </p>
          <div className="final-cta-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
              Book Strategy Call
              <span className="btn-arrow"></span>
            </a>
            <a href="../the-audit" className="btn btn-ghost">
              Diagnose AI Citation Gaps First
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
