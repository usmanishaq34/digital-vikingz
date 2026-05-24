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
              Semantic Content Production
            </span>
          </div>
          <span className="hero-tier-pill">
            <strong>
              SCALE TIER
            </strong>
            · Service 06 · Production at Velocity
          </span>
          <h1 className="h-display hero-h1">
            Execute the architecture
            {' '}
            <em>
              at scale.
            </em>
          </h1>
          <p className="hero-sub">
            A continuous content production engagement that
            {' '}
            <strong>
              executes your topical architecture
            </strong>
            {' '}
            at sustained velocity. Briefs · drafts · editorial QA · schema deployment · internal linking · all governed by your Source Term Vector, predicate framework, and Information Gain standards.
            {' '}
            <strong>
              Zero predicate drift
            </strong>, zero banned-phrase violations, zero generic content.
          </p>
          <div className="hero-meta-strip">
            <div className="hero-meta-cell">
              <span className="hero-meta-label">
                Tier
              </span>
              <span className="hero-meta-value">
                <em>
                  Scale
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
                8–24 assets
                {' '}
                <em>
                  monthly
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
              Six continuous production workstreams run the engagement. Every asset shipped is methodology-grade — entity-clean, predicate-consistent, Information Gain-engineered, schema-deployed.
              {' '}
              <strong>
                The architecture's blueprint becomes operational reality
              </strong>, cycle by cycle, without compromising on quality at velocity.
            </p>
          </div>
          <div className="inside-grid deliverable-style-grid">
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 01
                </span>
                <div className="inside-card-icon">
                  B
                </div>
              </div>
              <h3>
                Brief
                {' '}
                <em>
                  Production
                </em>
              </h3>
              <p>
                Per-asset briefs derived from the architecture's topical map and entity-attribute matrix.
                {' '}
                <strong>
                  Each brief references Source Term Vector, banned-phrase registry, predicate framework, Information Gain targets.
                </strong>
                {' '}
                Writers don't guess — they execute.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 02
                </span>
                <div className="inside-card-icon">
                  D
                </div>
              </div>
              <h3>
                Draft
                {' '}
                <em>
                  Production
                </em>
              </h3>
              <p>
                In-house writers trained on your governance manual produce drafts to the brief specification.
                {' '}
                <strong>
                  Predicate-clean from first draft
                </strong>
                {' '}
                — not "edited into compliance" after the fact. E-A-V structure baked in.
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
                Editorial
                {' '}
                <em>
                  QA
                </em>
              </h3>
              <p>
                Multi-pass editorial QA: predicate consistency check · banned-phrase scan · MIRENA validation · Information Gain audit · schema validation · internal linking compliance.
                {' '}
                <strong>
                  Zero exceptions on banned phrases.
                </strong>
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 04
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
                Article · FAQ · HowTo · Breadcrumb schema deployed per asset.
                {' '}
                <strong>
                  Validated against Google's structured data testing tool
                </strong>
                {' '}
                before publish. Tied to entity recognition, not generic SEO hygiene.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 05
                </span>
                <div className="inside-card-icon">
                  L
                </div>
              </div>
              <h3>
                Internal
                {' '}
                <em>
                  Linking
                </em>
              </h3>
              <p>
                Per-asset internal linking specification — anchors, target pages, contextual placement, predicate-clean phrasing.
                {' '}
                <strong>
                  Hub-and-spoke architecture
                </strong>
                {' '}
                reinforced with every published asset.
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
                Cycle
                {' '}
                <em>
                  Reporting
                </em>
              </h3>
              <p>
                Monthly: assets shipped · velocity vs. plan · QA pass rate · schema validation rate · upcoming cluster sequence.
                {' '}
                <strong>
                  Predictable production cadence
                </strong>
                {' '}
                your team can plan around.
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
              shows the engagement mid-cycle (typical state).
              {' '}
              <strong>
                Outcome mode
              </strong>
              {' '}
              shows representative cumulative state at month 12.
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
                      Production cycle · this month's batch in flight
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Engagement:
                    {' '}
                    <strong>
                      Production · cumulative state · month 12
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
                  Brief
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
                      14 briefs in flight · cluster 03 priority
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Produced:
                    {' '}
                    <strong>
                      168 briefs shipped · all governance-aligned
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Producing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Compliant
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 02
                </span>
                <div className="ec-card-name">
                  Draft
                  {' '}
                  <em>
                    Production
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Drafting:
                    {' '}
                    <strong>
                      11 drafts in flight · 3 in QA
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Drafted:
                    {' '}
                    <strong>
                      156 drafts published · 12 in active pipeline
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Drafting
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ At velocity
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 03
                </span>
                <div className="ec-card-name">
                  Editorial
                  {' '}
                  <em>
                    QA
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Reviewing:
                    {' '}
                    <strong>
                      multi-pass QA · 0 exceptions allowed
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Reviewed:
                    {' '}
                    <strong>
                      156 passes · 0 banned-phrase violations
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Reviewing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Zero violations
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 04
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
                      4 schema types · validated pre-publish
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Deployed:
                    {' '}
                    <strong>
                      624 schema instances · 100% validation pass
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Deploying
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ 100% pass
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 05
                </span>
                <div className="ec-card-name">
                  Internal
                  {' '}
                  <em>
                    Linking
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Linking:
                    {' '}
                    <strong>
                      per-asset link spec · predicate-clean
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Linked:
                    {' '}
                    <strong>
                      624 anchors deployed · architecture reinforced
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Linking
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Reinforced
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
                    Cycle
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Reporting:
                    {' '}
                    <strong>
                      cycle 06 · velocity 14 assets/month
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Reporting:
                    {' '}
                    <strong>
                      cycle 12 · 156 assets · cluster goals on plan
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ On track
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ On plan
                  </span>
                </div>
              </div>
            </div>
            <div className="ec-outcome-banner ec-state-block ec-state-outcome">
              <span className="ec-outcome-tag">
                Engagement complete · representative outcome
              </span>
              <div className="ec-outcome-text">
                All 6 workstreams
                {' '}
                <strong>
                  operational and compounding
                </strong>
                · 156 assets shipped · zero banned-phrase violations · 100% schema validation pass rate · architecture's 12-month roadmap executed on plan · production cadence stable and predictable for next cycle.
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
                  Have an existing topical architecture (or are building one alongside)
                </li>
                <li>
                  Want sustained velocity execution against the architecture's roadmap
                </li>
                <li>
                  Have governance standards we can train writers on
                </li>
                <li>
                  Want production output that compounds, not isolated content batches
                </li>
                <li>
                  Need predictable monthly velocity your team can plan around
                </li>
                <li>
                  Care about predicate cleanliness and banned-phrase governance
                </li>
                <li>
                  Want schema deployment and internal linking baked into production
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
                  Have no architecture defined — production without architecture compounds nothing
                </li>
                <li>
                  Want generic content writing — this is methodology-governed production
                </li>
                <li>
                  Need 1–2 articles per month — minimum velocity is 8 assets monthly
                </li>
                <li>
                  Want to skip editorial QA — every asset goes through multi-pass review
                </li>
                <li>
                  Want unbranded ghostwriting — production is governance-aligned, not stylistic
                </li>
                <li>
                  Need first asset within 2 phases — onboarding takes 4 phases minimum
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
              The engagement starts with a 4-phase onboarding phase to absorb your governance manual. First batch ships month 02. Velocity ramps to steady-state by month 03. Cycles continue as long as the architecture's roadmap requires.
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
                  Onboarding &amp; Calibration
                </div>
                <div className="timeline-action-detail">
                  Writer team absorbs your governance manual · Source Term Vector training · banned-phrase registry training · predicate framework calibration · brief template alignment · first sample brief and draft cycle for calibration.
                  {' '}
                  <strong>
                    Zero output ships in this phase.
                  </strong>
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 02
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  First Production Batch
                </div>
                <div className="timeline-action-detail">
                  First batch of 6–10 assets shipped at slightly reduced velocity. Editorial QA cadence calibrated. Schema deployment workflow validated. Internal linking spec workflow validated. Production rhythm established.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 03
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Continuous Production
                </div>
                <div className="timeline-action-detail">
                  Steady-state velocity (8–24 assets monthly depending on scope). Cycle reporting active. Cluster sequencing tracked against architecture roadmap. Production cadence predictable for downstream planning.
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
                  Quarterly review against architecture roadmap · velocity adjustments · cluster prioritization shifts · governance manual updates · cycle continues.
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
              Continuous engagement priced as monthly retainer. Final pricing depends on monthly velocity (8/12/16/24 assets), asset complexity (long-form vs. mid-form), regulatory layer (YMYL · finance · medical · legal add SME review), and schema deployment scope.
              {' '}
              <strong>
                3-month minimum
              </strong>
              {' '}
              to allow onboarding to land.
            </p>
          </div>
          <div className="pricing-card">
            <div className="pricing-left">
              <h3>
                Semantic Content
                {' '}
                <em>
                  Production
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
                Monthly retainer billed in advance. 4-phase onboarding phase included in first month. Cycle review at month 03 for velocity adjustment. Often paired with Pipeline Attribution SEO (Service 07) to tie production output to revenue outcomes.
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
                  4-phase onboarding and calibration
                </li>
                <li>
                  8–24 assets monthly (scoped at kickoff)
                </li>
                <li>
                  Per-asset briefs governance-aligned
                </li>
                <li>
                  Drafts produced predicate-clean
                </li>
                <li>
                  Multi-pass editorial QA
                </li>
                <li>
                  Schema deployment per asset
                </li>
                <li>
                  Internal linking specification per asset
                </li>
                <li>
                  Monthly cycle reporting
                </li>
                <li>
                  Quarterly strategic review
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
                What if my architecture is incomplete or doesn't exist yet?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Production without architecture compounds nothing. We strongly recommend completing
                    <a href="semantic-seo-architecture" style={{ color: "var(--accent)" }}>
                      Semantic SEO Architecture
                    </a>
                    first — or scoping architecture and production together as a sequenced engagement.
                  </p>
                  <p>
                    If your architecture is partial (some clusters defined, others not), we can scope production for the defined clusters while architecture work continues on the rest.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What's the minimum monthly velocity?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    8 assets per month at the base tier. Below that, the per-asset overhead (brief production, editorial QA, schema deployment, internal linking) consumes too much of the engagement value to justify the retainer. Many engagements run 12–16 assets monthly.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How are writers managed?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    In-house team of methodology-trained writers, not contractors. Each writer onboarded on your governance manual, banned-phrase registry, and predicate framework before producing your content.
                    {' '}
                    <strong>
                      One lead writer per account
                    </strong>
                    {' '}
                    + 2–3 supporting writers depending on velocity.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What if drafts come back needing major edits?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Editorial QA is multi-pass — first pass for predicate consistency, second for banned phrases, third for MIRENA, fourth for Information Gain, fifth for schema. By the time a draft reaches you, it's passed all 5.
                    {' '}
                    <strong>
                      If your team flags edits, those flow back into the editorial QA library
                    </strong>
                    {' '}
                    so future drafts catch the same patterns automatically.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Can you handle YMYL or regulated verticals?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Yes — with adjustments. YMYL verticals (medical · legal · financial) require SME review at brief and draft stages. We pair with subject matter experts (often the client's own team) for review cycles. Adds 1–2 days per asset to cycle time. Pricing scales accordingly.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How do you measure production quality?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    QA pass rate (target: 100% on banned phrases, predicate consistency, schema validation), velocity vs. plan, post-publish edit rate from your team, and cluster sequence adherence to architecture roadmap.
                    {' '}
                    <strong>
                      We track all four monthly.
                    </strong>
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
                Production executes the architecture's roadmap. Without architecture, production compounds nothing.
              </div>
              <div className="related-arrow">
                View service →
              </div>
            </a>
            <a href="pipeline-attribution-seo" className="related-card">
              <span className="related-tier">
                Scale · Service 07
              </span>
              <div className="related-name">
                Pipeline Attribution
                {' '}
                <em>
                  SEO
                </em>
              </div>
              <div className="related-desc">
                Pairs with production. Reveals which clusters convert to pipeline; reinforces those, prunes the rest.
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
                Every asset shipped is engineered for AI retrieval. Visibility compounds with production velocity.
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
            Execute the architecture,
            {' '}
            <em>
              cycle by cycle.
            </em>
          </h2>
          <p>
            Architecture without production is a deliverable on a shelf. Production without architecture is content that compounds nothing. The engagement that produces real outcomes is both — sequenced correctly, executed at sustained velocity.
          </p>
          <div className="final-cta-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
              Book Strategy Call
              <span className="btn-arrow"></span>
            </a>
            <a href="semantic-seo-architecture" className="btn btn-ghost">
              Build Architecture First
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
