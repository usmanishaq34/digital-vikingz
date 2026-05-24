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
              Semantic SEO Architecture
            </span>
          </div>
          <span className="hero-tier-pill">
            <strong>
              CLAIM TIER
            </strong>
            · Service 01 · Authority Foundation
          </span>
          <h1 className="h-display hero-h1">
            Your topic,
            {' '}
            <em>
              architected end-to-end.
            </em>
          </h1>
          <p className="hero-sub">
            A
            {' '}
            <strong>
              12-month authority blueprint
            </strong>
            {' '}
            for your category — Central Entity definition, topical map, Source Term Vector specification, internal linking architecture, publishing roadmap, and technical entity infrastructure. Delivered as a complete system your team or ours can execute against.
            {' '}
            <strong>
              This is the strategic foundation everything else builds on.
            </strong>
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
                8–10
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
                12-month
                {' '}
                <em>
                  blueprint
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
              Seven deliverable components ship across the engagement. Each one is a defined artifact — not a vague "we'll think about it" promise. The
              {' '}
              <strong>
                complete architecture document
              </strong>
              {' '}
              is the binding artifact; the supporting deliverables are the operational instruments your team uses to execute against it.
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
                Central Entity
                {' '}
                <em>
                  Definition
                </em>
              </h3>
              <p>
                A locked, written definition of your site's Central Entity — the single concept everything else flows from.
                {' '}
                <strong>
                  Single source of truth
                </strong>
                {' '}
                referenced verbatim across pages. Drift in this layer breaks every layer above it.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 02
                </span>
                <div className="inside-card-icon">
                  T
                </div>
              </div>
              <h3>
                Topical Map
                {' '}
                <em>
                  Blueprint
                </em>
              </h3>
              <p>
                Your category's question space mapped into
                {' '}
                <strong>
                  clusters, pillars, and supporting nodes
                </strong>. Each node justified, sequenced, and tied to buyer-stage intent. Visual map exported alongside the structured spreadsheet.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 03
                </span>
                <div className="inside-card-icon">
                  V
                </div>
              </div>
              <h3>
                Source Term Vector
                {' '}
                <em>
                  Specification
                </em>
              </h3>
              <p>
                The vocabulary your site speaks — defined, locked, and enforced. Includes
                {' '}
                <strong>
                  banned-phrase registry
                </strong>, canonical predicate forms, and editorial governance protocol. Eliminates semantic dilution at the publishing layer.
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
                Entity-Attribute
                {' '}
                <em>
                  Matrix
                </em>
              </h3>
              <p>
                A structured map of every attribute that defines your Central Entity, with coverage scoring per page.
                {' '}
                <strong>
                  Source of truth
                </strong>
                {' '}
                for content briefs — every brief references this matrix before production.
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
                Internal Linking
                {' '}
                <em>
                  Architecture
                </em>
              </h3>
              <p>
                Predicate-clean linking specification — anchor governance, hub-and-spoke architecture, contextual reinforcement rules. Engineered so
                {' '}
                <strong>
                  every link signals entity relationship
                </strong>, not generic relevance.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 06
                </span>
                <div className="inside-card-icon">
                  R
                </div>
              </div>
              <h3>
                12-Month Publishing
                {' '}
                <em>
                  Roadmap
                </em>
              </h3>
              <p>
                A prioritized, sequenced publishing plan with velocity calibration.
                {' '}
                <strong>
                  Cluster sequence justified
                </strong>, batch sizing scoped to your team's capacity, decision points called out for cycle reviews.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 07
                </span>
                <div className="inside-card-icon">
                  I
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
                Schema specification, structured data plan, URL hierarchy, technical SEO layer — all
                {' '}
                <strong>
                  tied directly to entity recognition
                </strong>, not generic technical hygiene. Implementable by your developers or ours.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ENGAGEMENT CONSOLE — TWO STATE */}
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
              Below: the engagement compressed into 6 active components, shown in
              {' '}
              <strong>
                two states
              </strong>.
              {' '}
              <strong>
                Building mode
              </strong>
              {' '}
              shows the engagement mid-flight (representative state at phase 06).
              {' '}
              <strong>
                Outcome mode
              </strong>
              {' '}
              shows the same engagement at handoff. Toggle to see both.
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
                      Architecture in flight · phase 06 of 8–10
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Engagement:
                    {' '}
                    <strong>
                      Architecture complete · all 6 components signed off
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
                  Central
                  {' '}
                  <em>
                    Entity
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Defining:
                    {' '}
                    <strong>
                      narrowing scope · attribute inventory in progress
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Locked:
                    {' '}
                    <strong>
                      60-word definition · cascaded across 4 priority pages
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Specifying
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Anchored
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 02
                </span>
                <div className="ec-card-name">
                  Topical
                  {' '}
                  <em>
                    Map
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Constructing:
                    {' '}
                    <strong>
                      6 clusters identified · supporting nodes mapping
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Built:
                    {' '}
                    <strong>
                      6 clusters · 84 supporting nodes · 12-month sequence locked
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Constructing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Sequenced
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 03
                </span>
                <div className="ec-card-name">
                  Source Term
                  {' '}
                  <em>
                    Vector
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Specifying:
                    {' '}
                    <strong>
                      vocabulary inventory · banned-phrase registry drafting
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Specified:
                    {' '}
                    <strong>
                      47 vocabulary terms · 23 banned terms · governance manual delivered
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Specifying
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Enforced
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 04
                </span>
                <div className="ec-card-name">
                  Entity-Attribute
                  {' '}
                  <em>
                    Matrix
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Mapping:
                    {' '}
                    <strong>
                      SERP attribute inventory · gap analysis underway
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Mapped:
                    {' '}
                    <strong>
                      340 attributes catalogued · 3 net-new attributes engineered
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Mapping
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Catalogued
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 05
                </span>
                <div className="ec-card-name">
                  Linking
                  {' '}
                  <em>
                    Architecture
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Specifying:
                    {' '}
                    <strong>
                      hub-spoke architecture · anchor governance drafting
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Specified:
                    {' '}
                    <strong>
                      12 predicate-clean anchor patterns · hub-spoke locked
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Drafting
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Architected
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 06
                </span>
                <div className="ec-card-name">
                  Publishing
                  {' '}
                  <em>
                    Roadmap
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Sequencing:
                    {' '}
                    <strong>
                      velocity calibration · capacity alignment underway
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Sequenced:
                    {' '}
                    <strong>
                      12-month roadmap · 84 nodes · capacity-aligned
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Sequencing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Locked
                  </span>
                </div>
              </div>
            </div>
            <div className="ec-outcome-banner ec-state-block ec-state-outcome">
              <span className="ec-outcome-tag">
                Architecture complete · representative outcome · 8–10 phase cycle
              </span>
              <div className="ec-outcome-text">
                All 6 components
                {' '}
                <strong>
                  signed off and handed off
                </strong>
                · 12-month blueprint live · production cycles ready to begin · technical infrastructure spec ready for engineering · governance manual deployed for all writing.
              </div>
            </div>
            <div className="ec-foot">
              <span className="ec-foot-text">
                <span className="ec-state-block ec-state-building">
                  Live engagement ·
                  {' '}
                  <strong>
                    Phase 06 of 8–10
                  </strong>
                  · 6 components in active build
                </span>
                <span className="ec-state-block ec-state-outcome">
                  Architecture closed ·
                  {' '}
                  <strong>
                    blueprint delivered
                  </strong>
                  · ready for production handoff
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
              Architecture engagements produce real outcomes for businesses ready to commit to authority compounding — and frustrate businesses that want quick wins. The fit map below is honest. If your business is in the right column, the audit or content production engagements are likely better starting points.
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
                  Want to claim a topic and own it for the long term — 12+ month horizon
                </li>
                <li>
                  Have an existing site that needs structural rebuild, not surface optimization
                </li>
                <li>
                  Are willing to commit budget across cycles — not month-to-month tactics
                </li>
                <li>
                  Have content production capacity in-house OR want to add ours
                </li>
                <li>
                  Need a methodology-grade deliverable for internal stakeholders or board
                </li>
                <li>
                  Operate in a vertical where AI search visibility increasingly drives discovery
                </li>
                <li>
                  Recognize that authority compounds slowly and want infrastructure for it
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
                  Need rankings improvements within 60 days — architecture surfaces gaps, fixes take quarters
                </li>
                <li>
                  Want a list of keywords to chase — this is entity-first, not keyword-first
                </li>
                <li>
                  Are looking for tactical link-building or technical-only fixes
                </li>
                <li>
                  Don't have a clear category — architecture requires defensible topical scope
                </li>
                <li>
                  Want hands-off engagement — your team participates in entity definition
                </li>
                <li>
                  Are pre-launch with no published content — start with audit-free greenfield brief instead
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* TIMELINE / ENGAGEMENT MODEL */}
      <section className="section timeline">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">
                04 / The Timeline
              </span>
              <h2 className="h-display section-h2">
                8–10 Phases,
                {' '}
                <em>
                  stage by stage.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              The architecture engagement runs in 4 stages over 8–10 phases. Pre-engagement audit (recommended but optional) precedes Phase 01. Production engagements typically begin Phase 11 if continuing with us — your internal team can begin Phase 11 if executing independently.
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
                  Discovery &amp; Foundation
                </div>
                <div className="timeline-action-detail">
                  Stakeholder alignment · business context capture · access provisioning · stakeholder interviews · scope confirmation. Central Entity definition begins. Foundation locked before topical work starts.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 02
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Topical Architecture
                </div>
                <div className="timeline-action-detail">
                  Topical map construction · cluster design · pillar identification · supporting node mapping · entity-attribute matrix population · SERP agreement-area analysis · query path coverage planning.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 03
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Governance &amp; Infrastructure
                </div>
                <div className="timeline-action-detail">
                  Source Term Vector specification · banned-phrase registry · predicate framework · internal linking architecture · schema and structured data spec · technical entity infrastructure plan.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 04
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Roadmap · QA · Handoff
                </div>
                <div className="timeline-action-detail">
                  12-month publishing roadmap · velocity calibration · architecture document compilation · governance manual finalized · live handoff session with stakeholders.
                  {' '}
                  <strong>
                    Decision point
                  </strong>
                  {' '}
                  — proceed to production with us, or execute internally.
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
                Custom · scoped per
                {' '}
                <em>
                  engagement.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              Architecture engagements are custom-scoped — final pricing depends on site complexity, vertical depth, multilingual scope, and content production capacity.
              {' '}
              <strong>
                All pricing locked at kickoff
              </strong>
              {' '}
              — no scope creep, no surprise additions. The audit is a productized $2000 entry point if you want to validate fit before committing.
            </p>
          </div>
          <div className="pricing-card">
            <div className="pricing-left">
              <h3>
                Semantic SEO
                {' '}
                <em>
                  Architecture
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
                Scoped during the strategy call. Pricing depends on
                {' '}
                <strong>
                  site complexity, vertical depth, multilingual scope, and team capacity alignment
                </strong>. Audit fee credited toward architecture if started within 60 days of audit deliverable.
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
                  All 7 deliverable components
                </li>
                <li>
                  Central Entity definition document
                </li>
                <li>
                  Topical map blueprint (visual + structured)
                </li>
                <li>
                  Source Term Vector specification
                </li>
                <li>
                  Entity-attribute matrix (spreadsheet)
                </li>
                <li>
                  Internal linking architecture
                </li>
                <li>
                  12-month publishing roadmap
                </li>
                <li>
                  Technical entity infrastructure spec
                </li>
                <li>
                  Live handoff session (90 min)
                </li>
                <li>
                  30 days follow-up support post-handoff
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
              Architecture engagements are the highest-commitment service we offer. The questions below come up most often during scoping calls.
            </p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-question">
                Why don't you publish a fixed price?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Architecture pricing varies by
                    {' '}
                    <strong>
                      5–10× across engagements
                    </strong>
                    {' '}
                    depending on site complexity, vertical depth, regulatory layer, and multilingual scope. Publishing a flat number would either price out small clients or undercharge enterprise ones — both produce bad outcomes.
                  </p>
                  <p>
                    If you want a price-validated entry point, the
                    <a href="../the-audit" style={{ color: "var(--accent)" }}>
                      $2000 Semantic Audit
                    </a>
                    is fully productized. Audit fee is credited toward architecture if you proceed within 60 days.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Do I have to use Digital Vikingz for production after the architecture?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    No. The architecture deliverable is
                    {' '}
                    <strong>
                      fully self-contained
                    </strong>
                    {' '}
                    — your internal team or another vendor can execute against it. The blueprint, governance manual, and roadmap are all written for execution by anyone trained on them, not just by us.
                  </p>
                  <p>
                    Many clients keep us on for production cycles because the methodology is easier to maintain with the architecture team — but it's not a contractual lock-in.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What's the difference between architecture and audit?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    The
                    {' '}
                    <strong>
                      audit diagnoses
                    </strong>
                    {' '}
                    — entity coverage gaps, predicate inconsistencies, semantic dilution, AI citation gaps. Output: prioritized issue map. 2–3 phases. $2000.
                  </p>
                  <p>
                    The
                    {' '}
                    <strong>
                      architecture builds
                    </strong>
                    {' '}
                    — Central Entity, topical map, governance, roadmap, technical infrastructure. Output: 12-month authority blueprint. 8–10 phases. Custom-scoped.
                  </p>
                  <p>
                    Audit answers "what's broken." Architecture answers "what to build." Most engagements run audit first, then architecture — but architecture can run standalone for sites confident in their diagnostic.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What does my team need to provide during the engagement?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Material time commitments:
                    {' '}
                    <strong>
                      Phase 01 stakeholder interviews
                    </strong>
                    {' '}
                    (3–4 hours total across 1–2 sessions),
                    {' '}
                    <strong>
                      Phase 02 entity validation reviews
                    </strong>
                    {' '}
                    (2 hours),
                    {' '}
                    <strong>
                      Phase 03 governance review
                    </strong>
                    {' '}
                    (2 hours),
                    {' '}
                    <strong>
                      Phase 04 final handoff session
                    </strong>
                    {' '}
                    (90 minutes). Roughly
                    {' '}
                    <strong>
                      8–10 hours of stakeholder time
                    </strong>
                    {' '}
                    across 8–10 phases.
                  </p>
                  <p>
                    Access requirements: GSC, GA4, CMS read-only access, brand guidelines, and any prior SEO documentation.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Is this a "one-time" project or an ongoing engagement?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    The architecture itself is a
                    {' '}
                    <strong>
                      one-time, productized engagement
                    </strong>
                    {' '}
                    with a defined deliverable and end date. Once the blueprint hands off, the architecture work is complete.
                  </p>
                  <p>
                    What's
                    {' '}
                    <em>
                      not
                    </em>
                    {' '}
                    one-time is the production work that follows — content briefs, content production, internal linking maintenance, distribution. Those run in continuous monthly cycles. You can run those internally or with us, but they're scoped separately from the architecture itself.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How is this different from a generic content strategy deliverable?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Most content strategies start with keyword research and back into "topics." This architecture starts with
                    {' '}
                    <strong>
                      entity definition
                    </strong>
                    {' '}
                    and back into queries — which is the inverse of generic content strategy and the opposite direction of keyword-first SEO.
                  </p>
                  <p>
                    The architecture also produces governance artifacts (Source Term Vector spec, banned-phrase registry, predicate framework, anchor governance) that generic content strategies don't include. Those governance artifacts are why the architecture survives Google updates and AI retrieval shifts that flatline generic content strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RELATED SERVICES */}
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
                  architecture.
                </em>
              </h2>
            </div>
            <p className="section-intro">
              Architecture is the strategic foundation. These three services run downstream of it — they execute the blueprint, defend it, or measure its impact. All three become more valuable post-architecture; many clients sequence them in this order.
            </p>
          </div>
          <div className="related-grid">
            <a href="semantic-content-audit" className="related-card">
              <span className="related-tier">
                Claim · Service 02
              </span>
              <div className="related-name">
                Semantic Content
                {' '}
                <em>
                  Audit
                </em>
              </div>
              <div className="related-desc">
                Diagnostic-only entry point. Run before architecture to validate fit and surface high-priority issues.
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
                Execute the architecture's publishing roadmap. Briefs, drafts, editorial QA, schema deployment — at velocity.
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
                Tie published architecture to qualified pipeline. Reveal which clusters convert; reinforce those, prune the rest.
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
            Architect the foundation,
            {' '}
            <em>
              own the topic.
            </em>
          </h2>
          <p>
            Architecture is the highest-leverage decision in your authority strategy. Get the foundation right, every cycle compounds. Get it wrong, every cycle leaks. Book a strategy call to scope your engagement.
          </p>
          <div className="final-cta-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
              Book Strategy Call
              <span className="btn-arrow"></span>
            </a>
            <a href="../the-audit" className="btn btn-ghost">
              Or Start with the Audit
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
