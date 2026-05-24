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
              Authority Link Building
            </span>
          </div>
          <span className="hero-tier-pill">
            <strong>
              SHIELD TIER
            </strong>
            · Service 04 · Authority Reinforcement
          </span>
          <h1 className="h-display hero-h1">
            Authority links,
            {' '}
            <em>
              methodology-grade.
            </em>
          </h1>
          <p className="hero-sub">
            A continuous link acquisition engagement engineered for
            {' '}
            <strong>
              topical relevance, predicate cleanliness, and editorial defensibility
            </strong>. No PBNs. No spam vectors. No "guest post networks." Authority links earned through category-aligned publications, contributed editorial, podcast appearances, and structurally relevant placements that reinforce your entity rather than dilute it.
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
                6–12 links
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
              Six continuous workstreams run the engagement. Every link acquired is topically aligned with your Central Entity, editorially earned, and reinforces your Source Term Vector.
              {' '}
              <strong>
                Quality over quantity
              </strong>
              {' '}
              — most agencies optimize for link count; we optimize for link defensibility against future Google updates.
            </p>
          </div>
          <div className="inside-grid deliverable-style-grid">
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 01
                </span>
                <div className="inside-card-icon">
                  P
                </div>
              </div>
              <h3>
                Publication
                {' '}
                <em>
                  Mapping
                </em>
              </h3>
              <p>
                <strong>
                  Topical category mapping
                </strong>
                {' '}
                of 100–300 category-aligned publications. Authority scored. Editorial standards reviewed. Filtered for genuine topical relevance — not generic DA score chasing.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 02
                </span>
                <div className="inside-card-icon">
                  A
                </div>
              </div>
              <h3>
                Angle
                {' '}
                <em>
                  Development
                </em>
              </h3>
              <p>
                Pitch angles developed per publication. Each angle aligned with the publication's editorial voice AND your Source Term Vector.
                {' '}
                <strong>
                  Predicate-clean angles
                </strong>
                {' '}
                that don't require post-publish editing.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 03
                </span>
                <div className="inside-card-icon">
                  O
                </div>
              </div>
              <h3>
                Outreach
                {' '}
                <em>
                  Cadence
                </em>
              </h3>
              <p>
                Personalized outreach to editorial contacts on a defined monthly cadence. Real relationships, not spray-and-pray.
                {' '}
                <strong>
                  Response rates 4–8×
                </strong>
                {' '}
                generic agency benchmarks because the angles are actually aligned.
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 04
                </span>
                <div className="inside-card-icon">
                  C
                </div>
              </div>
              <h3>
                Contributed
                {' '}
                <em>
                  Editorial
                </em>
              </h3>
              <p>
                Where placement is via contributed content, briefs are written to the publication's standards AND your governance manual. Editorial QA before submission.
                {' '}
                <strong>
                  Zero post-publish takedowns.
                </strong>
              </p>
            </div>
            <div className="inside-card">
              <div className="inside-card-head">
                <span className="inside-card-num">
                  Deliverable 05
                </span>
                <div className="inside-card-icon">
                  M
                </div>
              </div>
              <h3>
                Monthly Link
                {' '}
                <em>
                  Earned
                </em>
              </h3>
              <p>
                6–12 links monthly target — actual rate depends on category, vertical, and editorial cycle length. Each link logged with placement context, anchor text, predicate alignment notes.
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
                Reinforcement
                {' '}
                <em>
                  Reporting
                </em>
              </h3>
              <p>
                Monthly report: links earned · publications relationship status · pipeline · upcoming pitches · decline rate analysis.
                {' '}
                <strong>
                  Predicate alignment validated
                </strong>
                {' '}
                for every published placement.
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
              shows the engagement at month 03 (typical ramp state).
              {' '}
              <strong>
                Outcome mode
              </strong>
              {' '}
              shows representative state at month 09.
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
                      Link build · Month 03 of continuous
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Engagement:
                    {' '}
                    <strong>
                      Link build · representative state · month 09
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
                  Publication
                  {' '}
                  <em>
                    Mapping
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Mapping:
                    {' '}
                    <strong>
                      180 publications scored · category-aligned
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Mapped:
                    {' '}
                    <strong>
                      240 publications · active relationships with 47
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Mapping
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ 47 active
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 02
                </span>
                <div className="ec-card-name">
                  Angle
                  {' '}
                  <em>
                    Development
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Developing:
                    {' '}
                    <strong>
                      22 angles in pipeline · per-publication
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Developed:
                    {' '}
                    <strong>
                      180 angles shipped · response rate 32%
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Developing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ 32% rate
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 03
                </span>
                <div className="ec-card-name">
                  Outreach
                  {' '}
                  <em>
                    Cadence
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Outreaching:
                    {' '}
                    <strong>
                      40 pitches this month · personalized
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Outreaching:
                    {' '}
                    <strong>
                      monthly cadence stable · 240 pitches/quarter
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Active
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Stable
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 04
                </span>
                <div className="ec-card-name">
                  Editorial
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
                      3 contributed pieces in flight · QA underway
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Produced:
                    {' '}
                    <strong>
                      54 contributed pieces · zero takedowns
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Producing
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Zero TD
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 05
                </span>
                <div className="ec-card-name">
                  Monthly
                  {' '}
                  <em>
                    Yield
                  </em>
                </div>
                <div className="ec-card-state">
                  <span className="ec-state-block ec-state-building">
                    Yielding:
                    {' '}
                    <strong>
                      9 links earned this month · ramping
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Yielding:
                    {' '}
                    <strong>
                      11 links/month average · 9 high-DA
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Earning
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ 11/mo
                  </span>
                </div>
              </div>
              <div className="ec-card">
                <span className="ec-card-num">
                  Component 06
                </span>
                <div className="ec-card-name">
                  Reinforcement
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
                      cycle 03 report · trending up
                    </strong>
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    Reporting:
                    {' '}
                    <strong>
                      cycle 09 · authority compounding stable
                    </strong>
                  </span>
                </div>
                <div className="ec-card-status">
                  <span className="ec-card-status-dot"></span>
                  <span className="ec-state-block ec-state-building">
                    ▸ Trending
                  </span>
                  <span className="ec-state-block ec-state-outcome">
                    ✓ Compounding
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
                · 47 active publication relationships · 11 links/month average · zero post-publish takedowns · category authority reinforced quarter over quarter without spam vectors or PBN risk.
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
                  Operate in a defensible topical category with category-aligned publications
                </li>
                <li>
                  Have an existing topical architecture (or are building one alongside)
                </li>
                <li>
                  Want links that survive Google updates — not links that risk penalties
                </li>
                <li>
                  Are willing to commit to 6+ months for relationship-driven outreach
                </li>
                <li>
                  Care about link quality over link count — DR/DA chasing produces fragile authority
                </li>
                <li>
                  Have category expertise we can develop into editorial angles
                </li>
                <li>
                  Want monthly reporting on actual relationships and earned placements
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
                  Want 100+ links/month — we're wrong fit, that's spam vector territory
                </li>
                <li>
                  Need links within 30 days — relationship-based outreach has cycle time
                </li>
                <li>
                  Want generic DA-chasing — we score by topical relevance, not generic authority
                </li>
                <li>
                  Are willing to risk PBN-style work for short-term gains
                </li>
                <li>
                  Operate in categories where category-aligned publications don't exist
                </li>
                <li>
                  Want anchor text manipulation as a tactic — predicate-clean only
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
              The engagement starts with 4-phase mapping and angle development phase. Outreach begins month 02. First placements typically land month 02–03 depending on editorial cycle length. Compounding velocity reaches steady-state around month 06.
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
                  Mapping &amp; Foundation
                </div>
                <div className="timeline-action-detail">
                  Publication mapping (100–300 category-aligned outlets) · authority and topical relevance scoring · editorial standards review · initial angle development per priority publication · pitch templates aligned with Source Term Vector.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 02
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Active Outreach &amp; Production
                </div>
                <div className="timeline-action-detail">
                  Monthly outreach cadence active · personalized pitches sent · contributed editorial production · placement logging · relationship tracking. First placements begin landing.
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-phase">
                Phase 03
              </div>
              <div className="timeline-action">
                <div className="timeline-action-title">
                  Compounding &amp; Reinforcement
                </div>
                <div className="timeline-action-detail">
                  Steady-state cadence · 6–12 monthly placements · existing relationships maintained · new publications added · angle pipeline maintained 2–3 months ahead.
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
                  Quarterly review · publications retired · category shifts integrated · angle library refreshed · pitch performance analyzed · cycle continues.
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
              Continuous engagement priced as monthly retainer. Final pricing depends on category competition, target link velocity, contributed editorial volume, and vertical complexity.
              {' '}
              <strong>
                All pricing locked at kickoff
              </strong>
              {' '}
              with 6-month minimum.
            </p>
          </div>
          <div className="pricing-card">
            <div className="pricing-left">
              <h3>
                Authority
                {' '}
                <em>
                  Link Building
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
                Monthly retainer billed in advance. Minimum 6-month engagement to allow relationship-driven outreach to compound. Cycle review at month 06 for scope continuation.
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
                  Publication mapping (100–300 outlets)
                </li>
                <li>
                  Angle development per priority publication
                </li>
                <li>
                  Personalized outreach cadence
                </li>
                <li>
                  Contributed editorial production where applicable
                </li>
                <li>
                  6–12 monthly link placements (target)
                </li>
                <li>
                  Predicate alignment validation per placement
                </li>
                <li>
                  Monthly reinforcement report
                </li>
                <li>
                  Quarterly strategic review
                </li>
                <li>
                  Editorial relationship logbook
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
                Do you do PBN, guest post networks, or paid placements?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    No. None. Ever.
                    {' '}
                    <strong>
                      Every link is editorially earned
                    </strong>
                    {' '}
                    through real relationships with category-aligned publications. Paid placements are explicitly off the table because they fail predicate alignment and create future risk.
                  </p>
                  <p>
                    If a category genuinely has no editorially-earnable placements, we tell you that during scoping and decline the engagement.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How many links should I expect per month?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    6–12 placements per month at steady state, varying by category.
                    {' '}
                    <strong>
                      Quality and topical alignment trump count.
                    </strong>
                    {' '}
                    A category with rigorous editorial publications produces fewer monthly placements but stronger authority compounding. A category with looser editorial standards produces higher volume.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How is this different from generic link building?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Three differences: (1)
                    {' '}
                    <strong>
                      topical alignment scoring
                    </strong>
                    {' '}
                    — we score for genuine category relevance, not generic DA, (2)
                    {' '}
                    <strong>
                      predicate cleanliness
                    </strong>
                    {' '}
                    — anchor text and surrounding content match your Source Term Vector, (3)
                    {' '}
                    <strong>
                      editorial defensibility
                    </strong>
                    {' '}
                    — every link survives Google update scrutiny because it's genuinely earned.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What if you can't deliver the monthly target?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    We adjust the scope rather than compromise quality. If a category genuinely has lower editorial-cycle velocity, we set realistic targets at scoping.
                    {' '}
                    <strong>
                      We've declined engagements where the math didn't favor the client
                    </strong>
                    {' '}
                    — better than over-promising and delivering spam.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                How do you measure quality?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    Each placement is scored on: (1)
                    {' '}
                    <strong>
                      topical relevance
                    </strong>
                    {' '}
                    to your Central Entity, (2)
                    {' '}
                    <strong>
                      publication editorial standards
                    </strong>, (3)
                    {' '}
                    <strong>
                      predicate alignment
                    </strong>
                    {' '}
                    of anchor and surrounding content, (4)
                    {' '}
                    <strong>
                      contextual placement quality
                    </strong>, (5)
                    {' '}
                    <strong>
                      indexed-ness and discoverability
                    </strong>. Authority score is a derived metric, not the primary one.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Can I see your previous placements?
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>
                    NDA-permitted samples shared during scoping calls. Most clients prefer their placements not be publicly indexed as "case studies" because that creates predictable patterns. Verbal walk-throughs of representative placements available on call.
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
                Foundation that defines the entity and Source Term Vector links reinforce.
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
                External content distribution. Pairs with link building — placements earned through contributed editorial.
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
                AI citation engineering. External authority signals reinforce LLM retrieval patterns.
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
            Authority links,
            {' '}
            <em>
              built right.
            </em>
          </h2>
          <p>
            Most agencies build links that work for 18 months and break under the next Google update. We build links that compound for 5+ years because they're structurally defensible. Different math, different outcomes.
          </p>
          <div className="final-cta-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">
              Book Strategy Call
              <span className="btn-arrow"></span>
            </a>
            <a href="../the-audit" className="btn btn-ghost">
              Diagnose Link Profile First
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
