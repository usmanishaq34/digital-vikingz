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
  var root     = inSvc ? '../' : './';
  var svcRoot  = inSvc ? './' : 'services/';

  // ── LOGO & MAIN LINKS ──
  document.getElementById('logoLink').href       = root + '';
  document.getElementById('logoImg').src         = root + 'images/logo.png';
  document.getElementById('link-om').href        = root + 'operating-manual.html';
  document.getElementById('link-bp').href        = root + 'build-process.html';
  document.getElementById('link-vp').href        = root + 'vertical-playbooks.html';
  document.getElementById('link-audit').href     = root + 'the-audit.html';

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



  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('main').forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(24px)';
    s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(s);
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
      <style jsx global>{`
  :root {
    --bg: #ffffff;
    --bg-2: #faf9f6;
    --bg-3: #f3f1ec;
    --line: rgba(10, 10, 10, 0.1);
    --line-strong: rgba(10, 10, 10, 0.22);
    --text: #0a0a0a;
    --text-2: #2a2a2a;
    --text-muted: #6b6b65;
    --text-dim: #9b9b95;
    --accent: #db4c23;
    --accent-hover: #c43d18;
    --accent-soft: rgba(219, 76, 35, 0.08);
    --accent-glow: rgba(219, 76, 35, 0.18);
    --display: 'Fraunces', Georgia, serif;
    --body: 'Manrope', system-ui, sans-serif;
    --mono: 'JetBrains Mono', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: var(--accent); color: #fff; }

  .wrap { max-width: 1320px; margin: 0 auto; padding: 0 32px; position: relative; }
  b, strong { color: var(--accent); font-weight: 600; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.85); border-bottom: 1px solid var(--line); }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; }
  .logo { border-radius: 10px; font-family: var(--display); font-weight: 600; font-size: 22px; letter-spacing: -0.02em; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 10px; }
  .logo-mark { border-radius: 10px; width: 36px; height: 36px; object-fit: contain; transition: transform 0.4s ease; background: #fff; border-radius: 6px; padding: 3px; }
  .logo:hover .logo-mark { transform: rotate(-8deg) scale(1.05); border-radius: 10px; }
  .footer .logo-mark { filter: brightness(1.2); border-radius: 10px; }
  .nav-links { display: flex; gap: 36px; list-style: none; align-items: center; }
  .nav-links a { color: var(--text-2); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
  .nav-links a:hover { color: var(--accent); }
  .nav-cta { background: var(--accent); color: #fff !important; padding: 10px 22px; border-radius: 2px; font-weight: 600 !important; font-size: 13px !important; letter-spacing: 0.04em; text-transform: uppercase; transition: all 0.2s; }
  .nav-cta:hover { background: var(--accent-hover) !important; transform: translateY(-1px); box-shadow: 0 6px 20px var(--accent-glow); }
  .menu-btn { display: none; background: none; border: 1px solid var(--line-strong); color: var(--text); padding: 10px 16px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; }

  /* UTILITY */
  .label { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); display: inline-flex; align-items: center; gap: 12px; }
  .label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--accent); }
  .h-display { font-family: var(--display); font-weight: 400; line-height: 1.04; letter-spacing: -0.025em; font-variation-settings: "SOFT" 30, "opsz" 144; color: var(--text); }
  .h-display em { font-style: italic; font-variation-settings: "SOFT" 100, "opsz" 144; color: var(--accent); }

  .btn { display: inline-flex; align-items: center; gap: 12px; padding: 16px 28px; border-radius: 2px; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; transition: all 0.25s; border: 1px solid transparent; cursor: pointer; }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-glow); }
  .btn-ghost { background: transparent; color: var(--text); border-color: var(--text); }
  .btn-ghost:hover { background: var(--text); color: #fff; }

  /* HERO */
  .hero { padding: 160px 0 80px; border-bottom: 1px solid var(--line); position: relative; overflow: hidden; }
  .hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 80px 80px; mask-image: radial-gradient(ellipse 90% 70% at center, black 0%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 90% 70% at center, black 0%, transparent 75%); opacity: 0.5; pointer-events: none; z-index: 0; }
  .hero > .wrap { position: relative; z-index: 3; }
  .hero-h1 { font-size: clamp(48px, 7.5vw, 96px); margin-bottom: 28px; max-width: 900px; }
  .hero-sub { font-size: clamp(17px, 1.4vw, 20px); color: var(--text-2); max-width: 720px; line-height: 1.6; margin-bottom: 32px; }

  /* PAGE CONTENT */
  .dv-page { padding: 160px 0 80px; }
  .dv-page-wrap { max-width: 1320px; margin: 0 auto; padding: 0 32px; }
  .dv-page-narrow { max-width: 800px; }
  .dv-page-hero { margin-bottom: 64px; }
  .dv-page-hero h1 { font-family: var(--display); font-weight: 400; font-size: clamp(42px, 6vw, 80px); line-height: 1.08; letter-spacing: -0.025em; font-variation-settings: "SOFT" 30, "opsz" 144; color: var(--text); margin-bottom: 20px; }
  .dv-page-hero h1 em { font-style: italic; font-variation-settings: "SOFT" 100, "opsz" 144; color: var(--accent); }
  .dv-page-hero-sub { font-size: clamp(17px, 1.4vw, 20px); color: var(--text-2); max-width: 720px; line-height: 1.6; }

  .dv-page-content { max-width: 780px; }
  .dv-page-content h2 { font-family: var(--display); font-weight: 400; font-size: clamp(28px, 3vw, 38px); line-height: 1.15; letter-spacing: -0.02em; font-variation-settings: "SOFT" 30, "opsz" 144; color: var(--text); margin-top: 56px; margin-bottom: 20px; }
  .dv-page-content h2 em { font-style: italic; font-variation-settings: "SOFT" 100, "opsz" 144; color: var(--accent); }
  .dv-page-content h3 { font-family: var(--body); font-weight: 600; font-size: 18px; color: var(--text); margin-top: 36px; margin-bottom: 12px; }
  .dv-page-content p { color: var(--text-2); font-size: 16px; line-height: 1.7; margin-bottom: 20px; }
  .dv-page-content ul { list-style: none; margin-bottom: 24px; }
  .dv-page-content li { color: var(--text-2); font-size: 16px; line-height: 1.7; padding: 8px 0; padding-left: 24px; position: relative; }
  .dv-page-content li::before { content: ''; position: absolute; left: 0; top: 17px; width: 8px; height: 1px; background: var(--accent); }
  .dv-page-content a { color: var(--accent); text-decoration: none; transition: color 0.2s; }
  .dv-page-content a:hover { color: var(--accent-hover); }

  
  /* CONTACT PAGE */
  .dv-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 48px; }
  .dv-contact-card { border: 1px solid var(--line); padding: 36px; background: var(--bg-2); }
  .dv-contact-card h3 { font-family: var(--display); font-weight: 400; font-size: 26px; line-height: 1.2; letter-spacing: -0.015em; font-variation-settings: "SOFT" 30, "opsz" 144; color: var(--text); margin-bottom: 16px; }
  .dv-contact-card h3 em { font-style: italic; font-variation-settings: "SOFT" 100, "opsz" 144; color: var(--accent); }
  .dv-contact-card p { color: var(--text-2); font-size: 15px; line-height: 1.65; margin-bottom: 24px; }
  .dv-contact-card-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 2px; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; transition: all 0.25s; background: var(--accent); color: #fff; }
  .dv-contact-card-btn:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 6px 20px var(--accent-glow); }
  .dv-contact-card-btn.ghost { background: transparent; color: var(--text); border: 1px solid var(--text); }
  .dv-contact-card-btn.ghost:hover { background: var(--text); color: #fff; }
  .dv-contact-meta-row { display: flex; align-items: baseline; gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--line); }
  .dv-contact-meta-key { font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); min-width: 140px; flex-shrink: 0; }
  .dv-contact-meta-val { color: var(--text-2); font-size: 15px; }
  .dv-contact-meta-val a { color: var(--accent); text-decoration: none; transition: color 0.2s; }
  .dv-contact-meta-val a:hover { color: var(--accent-hover); }


  /* FOOTER */
  .footer { background: var(--text); padding: 80px 0 32px; color: rgba(255, 255, 255, 0.7); }
  .footer .logo { color: #fff; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 64px; padding-bottom: 48px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
  .footer-brand .logo { margin-bottom: 24px; }
  .footer-brand p { color: rgba(255, 255, 255, 0.7); font-size: 14px; line-height: 1.7; max-width: 360px; margin-bottom: 24px; }
  .footer-location { font-family: var(--mono); font-size: 11px; color: rgba(255, 255, 255, 0.5); letter-spacing: 0.12em; text-transform: uppercase; }
  .footer-location span { color: var(--accent); font-weight: 600; }
  .footer-col h5 { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 24px; font-weight: 600; }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 12px; }
  .footer-col a { color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: 14px; transition: color 0.2s; }
  .footer-col a:hover { color: #fff; }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
  .footer-bottom-text { font-family: var(--mono); font-size: 11px; color: rgba(255, 255, 255, 0.4); letter-spacing: 0.1em; }
  .footer-tagline { font-family: var(--display); font-style: italic; font-size: 14px; color: rgba(255, 255, 255, 0.6); font-variation-settings: "SOFT" 100, "opsz" 144; }
  .footer-tagline span { color: var(--accent); }

  /* RESPONSIVE */
  @media (max-width: 1280px) { .wrap { padding: 0 28px; } }
  @media (max-width: 1024px) {
    .nav-links { display: none; }
    .nav-links.show { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); padding: 24px 28px; gap: 18px; border-bottom: 1px solid var(--line); box-shadow: 0 8px 32px rgba(10, 10, 10, 0.08); align-items: flex-start; }
    .nav-links.show .nav-cta { width: 100%; text-align: center; padding: 14px 22px; }
    .menu-btn { display: block; }
    .hero { padding: 120px 0 60px; }
    .dv-page { padding: 120px 0 60px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .footer-brand { grid-column: 1 / -1; }
    .dv-blog-grid { grid-template-columns: 1fr; }
    .dv-contact-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .wrap { padding: 0 18px; }
    .hero { padding: 100px 0 48px; }
    .dv-page { padding: 100px 0 48px; }
    .footer-grid { grid-template-columns: 1fr; }
    .footer { padding: 56px 0 28px; }
    .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
    .dv-blog-categories { gap: 8px; }
    .dv-contact-meta-row { flex-direction: column; gap: 4px; }
  }



  .nav-link-item {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #222;
    text-decoration: none;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .nav-link-item:hover { color: #C4401A; }
  .svc-link { transition: padding 0.12s; }
  .svc-link:hover > div:first-child { color: #C4401A !important; }
  .svc-link:hover { padding-left: 6px !important; }

  @media (max-width: 960px) {
    #menuBtn { display: block !important; }
    #navLinks {
      position: absolute;
      top: 62px; left: 0;
      width: 100%;
      background: #fff;
      flex-direction: column !important;
      align-items: stretch !important;
      display: none !important;
      padding: 12px 20px 24px;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    #navLinks.show { display: flex !important; }
    #navLinks > li > a { padding: 10px 4px !important; border-bottom: 1px solid rgba(0,0,0,0.05); }
    #megaMenu {
      position: static !important;
      width: 100% !important;
      opacity: 1 !important;
      pointer-events: all !important;
      transform: none !important;
      box-shadow: none !important;
      border: none !important;
      background: #f9f9f9 !important;
      display: none;
      transition: none !important;
    }
    #megaMenu .mega-grid-inner { grid-template-columns: 1fr !important; }
    #megaMenu.show { display: block !important; }
  }
`}</style>
      {/* ============== NAV ============== */}
      <nav style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "relative", zIndex: "1000" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "62px" }}>
            {/* LOGO */}
            <a href="/" id="logoLink" className="logo" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img id="logoImg" src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{ height: "42px", width: "auto" }} />
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
                <a href="#" id="servicesToggle" className="nav-link-item" style={{ gap: "4px" }}>
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
                          <a data-svc="semantic-seo-architecture" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic SEO Architecture
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              12-month authority blueprint
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="semantic-content-audit" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
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
                          <a data-svc="semantic-content-production" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Production
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Execute at velocity
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="pipeline-attribution-seo" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
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
                          <a data-svc="llm-ai-search-visibility" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              LLM &amp; AI Search Visibility
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Get cited by AI search
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="authority-link-building" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Authority Link Building
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Methodology-grade links
                            </div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="semantic-content-network" className="svc-link" href="#" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
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
      <main className="dv-page">
        <div className="dv-page-wrap">
          <header className="dv-page-hero">
            <h1>
              Talk to the
              {' '}
              <em>
                practitioner.
              </em>
            </h1>
            <p className="dv-page-hero-sub">
              No SDR. No account manager. Strategy calls go directly to Usman.
              {' '}
              <strong>
                If we're right fit, you'll know in 30 minutes. If we're not, I'll tell you who is.
              </strong>
            </p>
          </header>
          <div className="dv-contact-grid">
            <div className="dv-contact-card">
              <h3>
                Book a
                {' '}
                <em>
                  strategy call
                </em>
              </h3>
              <p>
                Best starting point for most engagements. 30 minutes. We discuss your category, current authority architecture, and whether the methodology fits. No pitch deck — just methodology fit assessment.
              </p>
              <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="dv-contact-card-btn">
                Book Strategy Call →
              </a>
            </div>
            <div className="dv-contact-card">
              <h3>
                Book an
                {' '}
                <em>
                  audit intake
                </em>
              </h3>
              <p>
                If you want a productized $3,500 diagnostic of your site's entity layer before committing to longer engagements, book the audit intake call instead. Same calendar — different scope.
              </p>
              <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min?audit=true" target="_blank" rel="noopener" className="dv-contact-card-btn ghost">
                Book Audit Intake →
              </a>
            </div>
          </div>
          <div className="dv-contact-meta" style={{ marginTop: "32px" }}>
            <div className="dv-contact-meta-row">
              <span className="dv-contact-meta-key">
                Email
              </span>
              <span className="dv-contact-meta-val">
                <a href="mailto:workwithus@digitalvikingz.com">
                  workwithus@digitalvikingz.com
                </a>
              </span>
            </div>
            <div className="dv-contact-meta-row">
              <span className="dv-contact-meta-key">
                Founder
              </span>
              <span className="dv-contact-meta-val">
                Usman Ishaq · Digital Vikingz
              </span>
            </div>
            <div className="dv-contact-meta-row">
              <span className="dv-contact-meta-key">
                Location
              </span>
              <span className="dv-contact-meta-val">
                Bahawalpur, Pakistan · UTC +05:00
              </span>
            </div>
            <div className="dv-contact-meta-row">
              <span className="dv-contact-meta-key">
                Working hours
              </span>
              <span className="dv-contact-meta-val">
                10am–10pm PKT · flexible across regions
              </span>
            </div>
            <div className="dv-contact-meta-row">
              <span className="dv-contact-meta-key">
                Regions served
              </span>
              <span className="dv-contact-meta-val">
                US · UK · CA · AU · DE
              </span>
            </div>
            <div className="dv-contact-meta-row">
              <span className="dv-contact-meta-key">
                Social
              </span>
              <span className="dv-contact-meta-val" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href="https://www.facebook.com/DigitalVikingz" target="_blank" rel="noopener">
                  Facebook
                </a>
                <a href="https://www.linkedin.com/company/digital-vikingz" target="_blank" rel="noopener">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/digitalvikingz/" target="_blank" rel="noopener">
                  Instagram
                </a>
                <a href="https://www.tiktok.com/@digital.vikingzofficial" target="_blank" rel="noopener">
                  TikTok
                </a>
              </span>
            </div>
          </div>
          <div className="dv-page-content" style={{ marginTop: "64px" }}>
            <h2>
              What to
              {' '}
              <em>
                expect
              </em>
              {' '}
              on the call
            </h2>
            <p>
              The strategy call is not a sales call. There is no slide deck, no ROI calculator, no "limited-time offer." It's a 30-minute conversation about whether the methodology fits your situation.
            </p>
            <p>
              Three things typically happen:
            </p>
            <ul>
              <li>
                <strong>
                  You describe your category, current site, and what you're trying to accomplish.
                </strong>
                {' '}
                The first 10 minutes are diagnostic — I ask questions about your entity layer, current rankings, AI visibility, and pipeline.
              </li>
              <li>
                <strong>
                  I tell you what I think.
                </strong>
                {' '}
                If the methodology fits, I'll explain how I'd approach the engagement and roughly what scope/timeline/budget looks like. If it doesn't fit, I'll tell you that and recommend who does fit.
              </li>
              <li>
                <strong>
                  You decide what to do next.
                </strong>
                {' '}
                Common outcomes: book the audit ($3,500 productized diagnostic), scope an architecture engagement, or take what we discussed and execute it internally. All three are intended outcomes — not failure modes.
              </li>
            </ul>
            <p>
              What I won't do on the call: pressure you to commit on the spot, send "limited-time" follow-up emails, or chase you with SDR sequences afterward.
              {' '}
              <strong>
                If the fit is right, you'll know. If it's not, neither of us benefits from continuing.
              </strong>
            </p>
          </div>
        </div>
      </main>
      {/* ============== FOOTER ============== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <img src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" />
                <span>
                  Digital Vikingz
                </span>
              </a>
              <p>
                Semantic SEO authority agency built on Koray Tuğberk Gübür's methodology. We architect topical authority, defend it against AI dilution, and convert it into pipeline for businesses that want to claim a topic and own it.
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
                  <a href="/services/semantic-seo-architecture">
                    Semantic SEO Architecture
                  </a>
                </li>
                <li>
                  <a href="/services/semantic-content-audit">
                    Semantic Content Audit
                  </a>
                </li>
                <li>
                  <a href="/services/llm-ai-search-visibility">
                    LLM &amp; AI Search Visibility
                  </a>
                </li>
                <li>
                  <a href="/services/authority-link-building">
                    Authority Link Building
                  </a>
                </li>
                <li>
                  <a href="/services/semantic-content-network">
                    Semantic Content Network
                  </a>
                </li>
                <li>
                  <a href="/services/semantic-content-production">
                    Semantic Content Production
                  </a>
                </li>
                <li>
                  <a href="/services/pipeline-attribution-seo">
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
                  <a href="/about">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/blog">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/operating-manual">
                    Operating Manual
                  </a>
                </li>
                <li>
                  <a href="/build-process">
                    Build Process
                  </a>
                </li>
                <li>
                  <a href="/vertical-playbooks">
                    Vertical Playbooks
                  </a>
                </li>
                <li>
                  <a href="/#rankings">
                    Live Rankings
                  </a>
                </li>
                <li>
                  <a href="/#team">
                    Team
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy">
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
                  <a href="https://www.linkedin.com/company/digital-vikingz/" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/DigitalVikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/digitalvikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path>
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@DigitalVikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path>
                    </svg>
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="mailto:workwithus@digitalvikingz.com" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
