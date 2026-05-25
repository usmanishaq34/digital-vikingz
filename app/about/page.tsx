'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [consoleState, setConsoleState] = useState<'in-practice' | 'track-record'>('in-practice');

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
  var path     = window.location.pathname;
  var inSvc    = path.indexOf('/services/') !== -1;
  var root     = inSvc ? '../' : './';
  var svcRoot  = inSvc ? './' : 'services/';

  // ── SERVICE LINKS ──
  document.querySelectorAll('.svc-link').forEach(function (link) {
    var svc = link.getAttribute('data-svc');
    link.href = svcRoot + svc;
  });

  // ── MEGA MENU HOVER ──
  var dropdown = document.getElementById('servicesDropdown');
  var megaMenu = document.getElementById('megaMenu');
  var chevron  = document.getElementById('serviceChevron');

  if (dropdown && megaMenu && chevron) {
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
  }

  // ── MOBILE MENU ──
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      document.getElementById('navLinks').classList.toggle('show');
    });
  }

  // ── MOBILE DROPDOWN ──
  var servicesToggle = document.getElementById('servicesToggle');
  if (servicesToggle && megaMenu && chevron) {
    servicesToggle.addEventListener('click', function (e) {
      if (window.innerWidth < 960) {
        e.preventDefault();
        megaMenu.classList.toggle('show');
        chevron.style.transform = megaMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
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

  document.querySelectorAll('.section, .practitioner-section').forEach(s => {
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
  .btn-arrow { width: 16px; height: 1px; background: currentColor; position: relative; transition: transform 0.2s; }
  .btn-arrow::after { content: ''; position: absolute; right: 0; top: -3px; width: 7px; height: 7px; border-top: 1px solid currentColor; border-right: 1px solid currentColor; transform: rotate(45deg); }
  .btn:hover .btn-arrow { transform: translateX(4px); }

  /* HERO */
  .hero { padding: 160px 0 100px; border-bottom: 1px solid var(--line); position: relative; overflow: hidden; }
  .hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 80px 80px; mask-image: radial-gradient(ellipse 90% 70% at center, black 0%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 90% 70% at center, black 0%, transparent 75%); opacity: 0.5; pointer-events: none; z-index: 0; }
  .hero > .wrap { position: relative; z-index: 3; }
  .hero-breadcrumb { display: flex; align-items: center; gap: 12px; margin-bottom: 48px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }
  .hero-breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .hero-breadcrumb a:hover { color: var(--accent); }
  .hero-breadcrumb-sep { color: var(--accent); }
  .hero-breadcrumb-current { color: var(--text); }

  .hero-pill { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); font-weight: 700; padding: 8px 16px; border: 1px solid var(--accent); background: var(--accent-soft); margin-bottom: 36px; }
  .hero-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

  .hero-h1 { font-size: clamp(48px, 7.5vw, 108px); margin-bottom: 36px; max-width: 1100px; }
  .hero-sub { font-size: clamp(18px, 1.55vw, 22px); color: var(--text-2); max-width: 720px; line-height: 1.55; margin-bottom: 48px; }

  .hero-meta-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 48px; border: 1px solid var(--line); background: var(--bg-2); }
  .hero-meta-cell { padding: 22px 24px; border-right: 1px solid var(--line); display: flex; flex-direction: column; gap: 6px; }
  .hero-meta-cell:last-child { border-right: none; }
  .hero-meta-label { font-family: var(--mono); font-size: 10px; color: var(--text-muted); letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; }
  .hero-meta-value { font-family: var(--display); font-size: 22px; font-weight: 500; color: var(--text); letter-spacing: -0.01em; line-height: 1.1; }
  .hero-meta-value em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "opsz" 144; }

  .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

  /* SECTION SHELL */
  .section { padding: 140px 0; border-bottom: 1px solid var(--line); position: relative; }
  .section-head { display: grid; grid-template-columns: 1fr 2fr; gap: 64px; margin-bottom: 80px; align-items: end; }
  .section-head-left { display: flex; flex-direction: column; gap: 20px; }
  .section-h2 { font-size: clamp(38px, 4.8vw, 68px); }
  .section-intro { font-size: clamp(16px, 1.2vw, 19px); color: var(--text-2); line-height: 1.65; max-width: 660px; }

  /* FOUNDER SECTION */
  .founder { background: var(--bg); }
  .founder-card {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 64px;
    align-items: start;
  }

  .founder-portrait-wrap {
    position: sticky;
    top: 120px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .founder-portrait {
    width: 100%;
    aspect-ratio: 3 / 4;
    background:
      linear-gradient(135deg, var(--bg-3) 0%, var(--bg-2) 100%);
    border: 1px solid var(--line);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .founder-portrait::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.5;
    pointer-events: none;
  }

  .founder-portrait::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    bottom: 16px;
    border: 1px solid var(--accent);
    border-radius: 0;
    pointer-events: none;
  }

  .founder-initials {
    font-family: var(--display);
    font-size: clamp(80px, 12vw, 140px);
    font-weight: 300;
    color: var(--accent);
    letter-spacing: -0.04em;
    font-style: italic;
    font-variation-settings: "SOFT" 100, "opsz" 144;
    z-index: 2;
    line-height: 1;
  }

  .founder-tag {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
    text-align: center;
    padding-top: 4px;
  }

  .founder-meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px 24px;
    background: var(--bg-2);
    border: 1px solid var(--line);
    border-left: 3px solid var(--accent);
  }

  .founder-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 8px 0;
    border-bottom: 1px dashed var(--line);
  }

  .founder-meta-row:last-child { border-bottom: none; padding-bottom: 0; }
  .founder-meta-row:first-child { padding-top: 0; }

  .founder-meta-key { color: var(--text-muted); font-weight: 600; }
  .founder-meta-val { color: var(--text); font-weight: 700; }
  .founder-meta-val.accent { color: var(--accent); }

  .founder-bio {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .founder-bio-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
    margin-bottom: 4px;
  }

  .founder-bio h3 {
    font-family: var(--display);
    font-size: clamp(36px, 4.5vw, 56px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }

  .founder-bio h3 em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .founder-bio-role {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line);
  }

  .founder-bio p {
    font-size: 16.5px;
    color: var(--text-2);
    line-height: 1.75;
  }

  .founder-bio p strong { color: var(--accent); font-weight: 600; }

  .founder-bio-pullquote {
    margin: 16px 0 8px;
    padding: 28px 32px;
    background: var(--bg-2);
    border-left: 3px solid var(--accent);
    font-family: var(--display);
    font-style: italic;
    font-size: clamp(20px, 2vw, 26px);
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: var(--text);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .founder-bio-pullquote-attr {
    display: block;
    margin-top: 16px;
    font-family: var(--mono);
    font-style: normal;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 600;
    font-variation-settings: normal;
  }

  .founder-bio-pullquote-attr span { color: var(--accent); }

  .founder-bio-section-h {
    font-family: var(--display);
    font-size: 22px;
    font-weight: 500;
    color: var(--text);
    letter-spacing: -0.005em;
    line-height: 1.2;
    margin-top: 16px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }

  .founder-bio-section-h em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  /* PRACTITIONER CONSOLE — Two-State */
  .practitioner-section { background: var(--bg-2); padding: 100px 0 140px; border-bottom: 1px solid var(--line); }
  .practitioner-head { display: grid; grid-template-columns: 1fr 2fr; gap: 64px; align-items: end; margin-bottom: 64px; }
  .practitioner-head-left { display: flex; flex-direction: column; gap: 20px; }

  .practitioner-console {
    background: #0a0a0a;
    border: 1px solid rgba(219, 76, 35, 0.25);
    overflow: hidden;
    color: #fff;
    box-shadow: 0 24px 60px rgba(10, 10, 10, 0.18);
  }

  .pc-header {
    padding: 20px 32px;
    background: rgba(219, 76, 35, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .pc-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .pc-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
  }

  .pc-pill::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pcPulse 1.4s ease-in-out infinite;
  }

  @keyframes pcPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(219, 76, 35, 0.6); }
    50% { box-shadow: 0 0 0 8px rgba(219, 76, 35, 0); }
  }

  @keyframes pcOutcomePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
    50% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
  }

  .pc-title {
    font-family: var(--mono);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.04em;
  }

  .pc-title strong { color: #fff; font-weight: 600; }

  .pc-toggle-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 8px 14px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .pc-toggle-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .pc-toggle-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    transition: background 0.2s;
  }

  /* Top stat row */
  .pc-stat-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .pc-stat-cell {
    padding: 32px 28px;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pc-stat-cell:last-child { border-right: none; }

  .pc-stat-label {
    font-family: var(--mono);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .pc-stat-value {
    font-family: var(--display);
    font-size: clamp(36px, 4vw, 52px);
    font-weight: 400;
    color: var(--accent);
    line-height: 1;
    letter-spacing: -0.02em;
    font-variation-settings: "SOFT" 30;
  }

  [data-state="track-record"] .pc-stat-value { color: #4ade80; }

  .pc-stat-detail {
    font-family: var(--mono);
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }

  /* Body — list rows */
  .pc-body { padding: 0; background: #0a0a0a; }

  .pc-body-section {
    padding: 32px 32px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .pc-body-section:last-child { border-bottom: none; }

  .pc-body-h {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 20px;
  }

  [data-state="track-record"] .pc-body-h { color: #4ade80; }

  .pc-body-rows {
    display: grid;
    gap: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 16px;
  }

  .pc-row {
    display: grid;
    grid-template-columns: 200px 1fr 140px;
    background: #0a0a0a;
    align-items: stretch;
    transition: background 0.2s;
  }

  .pc-row:hover { background: rgba(219, 76, 35, 0.04); }

  [data-state="track-record"] .pc-row:hover { background: rgba(74, 222, 128, 0.04); }

  .pc-row-key {
    padding: 18px 24px;
    font-family: var(--mono);
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
  }

  .pc-row-detail {
    padding: 18px 26px;
    color: #fff;
    font-family: var(--display);
    font-size: 15px;
    line-height: 1.5;
    letter-spacing: -0.005em;
    display: flex;
    align-items: center;
  }

  .pc-row-detail strong {
    color: var(--accent);
    font-weight: 600;
  }

  [data-state="track-record"] .pc-row-detail strong { color: #4ade80; }

  .pc-row-status {
    padding: 18px 22px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--accent);
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    white-space: nowrap;
    justify-content: flex-end;
  }

  .pc-row-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pcPulse 1.6s ease-in-out infinite;
  }

  [data-state="track-record"] .pc-row-status { color: #4ade80; }
  [data-state="track-record"] .pc-row-status-dot { background: #4ade80; animation: pcOutcomePulse 2.4s ease-in-out infinite; }

  /* OUTCOME (track-record) state — green */
  [data-state="track-record"] .pc-pill { color: #4ade80; }
  [data-state="track-record"] .pc-pill::before { background: #4ade80; animation: pcOutcomePulse 2s ease-in-out infinite; }
  [data-state="track-record"] .pc-title strong { color: #4ade80; }
  [data-state="track-record"] .pc-toggle-btn { border-color: rgba(74, 222, 128, 0.4); color: #4ade80; }
  [data-state="track-record"] .pc-toggle-btn:hover { border-color: #4ade80; background: rgba(74, 222, 128, 0.1); }
  [data-state="track-record"] .pc-toggle-dot { background: #4ade80; }

  .pc-state-block { display: none; }
  [data-state="in-practice"] .pc-state-practice { display: block; }
  [data-state="track-record"] .pc-state-record { display: block; }

  /* Foot */
  .pc-foot {
    padding: 18px 32px;
    background: rgba(255, 255, 255, 0.02);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .pc-foot-text {
    font-family: var(--mono);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .pc-foot-text strong { color: var(--accent); font-weight: 700; }

  [data-state="track-record"] .pc-foot { background: rgba(74, 222, 128, 0.04); border-top-color: rgba(74, 222, 128, 0.2); }
  [data-state="track-record"] .pc-foot-text strong { color: #4ade80; }

  /* METHODOLOGY LINEAGE */
  .lineage { background: var(--bg); }

  .lineage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  .lineage-block {
    padding: 48px 40px;
    background: var(--bg-2);
    border: 1px solid var(--line);
    position: relative;
  }

  .lineage-block.attribution {
    border-left: 3px solid var(--accent);
  }

  .lineage-block.adaptation {
    border-left: 3px solid var(--text);
  }

  .lineage-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
    margin-bottom: 20px;
    display: inline-block;
  }

  .lineage-block.adaptation .lineage-tag {
    color: var(--text);
  }

  .lineage-block h3 {
    font-family: var(--display);
    font-size: clamp(28px, 3vw, 38px);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }

  .lineage-block h3 em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .lineage-block p {
    font-size: 15.5px;
    color: var(--text-2);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .lineage-block p strong { color: var(--accent); font-weight: 600; }

  .lineage-block.adaptation p strong { color: var(--text); font-weight: 600; }

  .lineage-list {
    list-style: none;
    padding-top: 12px;
    border-top: 1px solid var(--line);
    margin-top: 12px;
  }

  .lineage-list li {
    padding: 16px 0;
    border-bottom: 1px dashed var(--line);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .lineage-list li:last-child { border-bottom: none; padding-bottom: 0; }

  .lineage-list-num {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--accent);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .lineage-list-title {
    font-family: var(--display);
    font-size: 18px;
    font-weight: 500;
    color: var(--text);
    line-height: 1.3;
    letter-spacing: -0.005em;
  }

  .lineage-list-title em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .lineage-list-detail {
    font-size: 13.5px;
    color: var(--text-2);
    line-height: 1.6;
  }

  .lineage-list-detail strong { color: var(--accent); font-weight: 600; }

  /* TEAM */
  .team { background: var(--bg-2); }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .team-card {
    background: var(--bg);
    border: 1px solid var(--line);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: all 0.3s;
  }

  .team-card:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(10, 10, 10, 0.06);
  }

  .team-portrait {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, var(--bg-3) 0%, var(--bg-2) 100%);
    border: 1px solid var(--line);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .team-portrait::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 16px 16px;
    opacity: 0.5;
  }

  .team-portrait::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    border: 1px solid var(--accent);
  }

  .team-initials {
    font-family: var(--display);
    font-size: clamp(48px, 7vw, 72px);
    font-weight: 300;
    color: var(--accent);
    letter-spacing: -0.04em;
    font-style: italic;
    font-variation-settings: "SOFT" 100, "opsz" 144;
    z-index: 2;
    line-height: 1;
  }

  .team-card h4 {
    font-family: var(--display);
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-top: 8px;
  }

  .team-card h4 em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .team-role {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }

  .team-role span { color: var(--accent); font-weight: 700; }

  .team-bio {
    font-size: 14px;
    color: var(--text-2);
    line-height: 1.7;
  }

  .team-bio strong { color: var(--accent); font-weight: 600; }

  .team-extra {
    margin-top: 32px;
    padding: 28px 32px;
    background: var(--bg);
    border: 1px solid var(--line);
    border-left: 3px solid var(--accent);
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    align-items: center;
  }

  .team-extra-icon {
    width: 48px;
    height: 48px;
    background: var(--text);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--display);
    font-size: 22px;
    font-style: italic;
    font-weight: 600;
    clip-path: polygon(50% 0%, 100% 18%, 100% 78%, 50% 100%, 0% 78%, 0% 18%);
  }

  .team-extra-text {
    font-family: var(--display);
    font-size: 17px;
    line-height: 1.55;
    color: var(--text);
    letter-spacing: -0.005em;
  }

  .team-extra-text strong {
    color: var(--accent);
    font-weight: 600;
  }

  .team-extra-text em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  /* GEOGRAPHY */
  .geo { background: var(--bg); }

  .geo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  .geo-base {
    background: var(--bg-2);
    border: 1px solid var(--line);
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .geo-base-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
  }

  .geo-base-h {
    font-family: var(--display);
    font-size: clamp(32px, 3.5vw, 44px);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .geo-base-h em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .geo-base-p {
    font-size: 15.5px;
    color: var(--text-2);
    line-height: 1.7;
  }

  .geo-base-p strong { color: var(--accent); font-weight: 600; }

  .geo-base-meta {
    margin-top: 16px;
    padding: 20px 24px;
    background: var(--bg);
    border-left: 3px solid var(--accent);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .geo-base-meta-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 8px 0;
    border-bottom: 1px dashed var(--line);
  }

  .geo-base-meta-row:last-child { border-bottom: none; padding-bottom: 0; }
  .geo-base-meta-row:first-child { padding-top: 0; }

  .geo-base-meta-key { color: var(--text-muted); font-weight: 600; }
  .geo-base-meta-val { color: var(--text); font-weight: 700; }

  .geo-regions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .geo-regions-h {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
    margin-bottom: 12px;
  }

  .geo-region {
    display: grid;
    grid-template-columns: 80px 1fr 100px;
    padding: 20px 24px;
    background: var(--bg-2);
    border: 1px solid var(--line);
    align-items: center;
    transition: all 0.3s;
  }

  .geo-region:hover {
    border-color: var(--accent);
    transform: translateX(4px);
  }

  .geo-region-flag {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 0.15em;
  }

  .geo-region-name {
    font-family: var(--display);
    font-size: 18px;
    font-weight: 500;
    color: var(--text);
    letter-spacing: -0.005em;
  }

  .geo-region-detail {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: right;
    font-weight: 600;
  }

  /* DON'TS — Disqualification */
  .donts { background: var(--bg-2); }

  .donts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .dont-card {
    background: var(--bg);
    border: 1px solid var(--line);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.3s;
  }

  .dont-card:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(10, 10, 10, 0.06);
  }

  .dont-card-num {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }

  .dont-card h4 {
    font-family: var(--display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .dont-card h4 em {
    font-style: italic;
    color: var(--accent);
    font-variation-settings: "SOFT" 100, "opsz" 144;
  }

  .dont-card p {
    font-size: 14.5px;
    color: var(--text-2);
    line-height: 1.7;
  }

  .dont-card p strong { color: var(--accent); font-weight: 600; }

  /* FINAL CTA */
  .final-cta { padding: 160px 0; text-align: center; background: radial-gradient(circle at 50% 0%, var(--accent-soft) 0%, transparent 60%), var(--bg); border-bottom: 1px solid var(--line); position: relative; overflow: hidden; }
  .final-cta-label { margin: 0 auto 32px; justify-content: center; }
  .final-cta h2 { font-family: var(--display); font-size: clamp(48px, 7vw, 96px); font-weight: 400; line-height: 1.0; letter-spacing: -0.03em; margin-bottom: 32px; max-width: 1100px; margin-left: auto; margin-right: auto; font-variation-settings: "SOFT" 30, "opsz" 144; }
  .final-cta h2 em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "opsz" 144; }
  .final-cta p { font-size: 18px; color: var(--text-2); max-width: 660px; margin: 0 auto 48px; line-height: 1.65; }
  .final-cta-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

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
    .section { padding: 110px 0; }
    .section-head, .practitioner-head { grid-template-columns: 1fr; gap: 32px; }
    .founder-card { grid-template-columns: 1fr; gap: 40px; }
    .founder-portrait-wrap { position: static; }
    .lineage-grid { grid-template-columns: 1fr; gap: 24px; }
    .team-grid { grid-template-columns: 1fr 1fr; }
    .geo-grid { grid-template-columns: 1fr; gap: 32px; }
    .donts-grid { grid-template-columns: 1fr; }
    .pc-stat-row { grid-template-columns: 1fr 1fr; }
    .pc-stat-cell:nth-child(2) { border-right: none; }
    .pc-stat-cell:nth-child(1), .pc-stat-cell:nth-child(2) { border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .pc-row { grid-template-columns: 160px 1fr 110px; }
    .pc-header { padding: 16px 22px; flex-direction: column; align-items: flex-start; }
    .pc-foot { padding: 14px 22px; flex-direction: column; align-items: flex-start; }
    .pc-body-section { padding: 24px 22px 12px; }
    .hero-meta-strip { grid-template-columns: 1fr 1fr; }
    .hero-meta-cell:nth-child(2) { border-right: none; }
    .hero-meta-cell:nth-child(1), .hero-meta-cell:nth-child(2) { border-bottom: 1px solid var(--line); }
    .nav-links { display: none; }
    .nav-links.show { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); padding: 24px 28px; gap: 18px; border-bottom: 1px solid var(--line); align-items: flex-start; }
    .menu-btn { display: block; }
    .nav-cta { display: none; }
  }
  @media (max-width: 768px) {
    .wrap { padding: 0 24px; }
    .section { padding: 88px 0; }
    .hero { padding: 120px 0 64px; }
    .hero-meta-strip { grid-template-columns: 1fr; }
    .hero-meta-cell { border-right: none; border-bottom: 1px solid var(--line); }
    .hero-meta-cell:last-child { border-bottom: none; }
    .team-grid { grid-template-columns: 1fr; }
    .team-extra { grid-template-columns: 1fr; gap: 16px; text-align: center; }
    .team-extra-icon { margin: 0 auto; }
    .pc-row { grid-template-columns: 100px 1fr; }
    .pc-row-status { grid-column: 2; padding: 0 22px 14px; border-left: none; justify-content: flex-start; }
    .lineage-block { padding: 36px 28px; }
    .geo-base { padding: 36px 28px; }
    .geo-region { grid-template-columns: 60px 1fr 80px; padding: 16px 18px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .footer-brand { grid-column: 1 / -1; }
  }
  @media (max-width: 480px) {
    .wrap { padding: 0 18px; }
    .section { padding: 72px 0; }
    .hero { padding: 100px 0 48px; }
    .hero-h1 { font-size: clamp(32px, 9vw, 44px); margin-bottom: 24px; }
    .hero-sub { font-size: 16px; margin-bottom: 36px; }
    .btn { padding: 14px 22px; font-size: 13px; }
    .founder-bio-pullquote { padding: 22px 22px; font-size: 18px; }
    .lineage-block { padding: 28px 22px; }
    .team-card { padding: 28px 22px; }
    .geo-base { padding: 28px 22px; }
    .geo-region { grid-template-columns: 50px 1fr 60px; padding: 14px 14px; gap: 8px; }
    .geo-region-name { font-size: 15px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .footer-brand { grid-column: auto; }
    .final-cta { padding: 96px 0; }
    .final-cta-ctas .btn { width: 100%; max-width: 360px; justify-content: center; }
    .footer { padding: 56px 0 28px; }
    .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    .pc-pill::before, .pc-row-status-dot { animation: none; }
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
            <a href="/" id="logoLink" className="logo" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img id="logoImg" src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{ height: "42px", width: "auto" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: "600", color: "#111" }}>
                Digital Vikingz
              </span>
            </a>
            <ul id="navLinks" style={{ display: "flex", alignItems: "center", listStyle: "none", margin: "0", padding: "0", gap: "0" }}>
              <li>
                <a id="link-om" href="/operating-manual" className="nav-link-item">Operating Manual</a>
              </li>
              <li>
                <a id="link-bp" href="/build-process" className="nav-link-item">Build Process</a>
              </li>
              <li>
                <a id="link-vp" href="/vertical-playbooks" className="nav-link-item">Vertical Playbooks</a>
              </li>
              <li style={{ position: "relative" }} id="servicesDropdown">
                <a href="#" id="servicesToggle" className="nav-link-item" style={{ gap: "4px" }}>
                  Services
                  <svg id="serviceChevron" style={{ width: "10px", height: "10px", transition: "transform 0.2s", opacity: "0.7", flexShrink: "0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
                <div id="megaMenu" style={{ position: "absolute", top: "100%", left: "-20px", width: "580px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderTop: "2px solid rgba(0,0,0,0.05)", boxShadow: "0 12px 40px rgba(0,0,0,0.09)", opacity: "0", pointerEvents: "none", transform: "translateY(-4px)", transition: "opacity 0.18s ease,transform 0.18s ease", zIndex: "999" }}>
                  <div className="mega-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "24px 28px 26px", gap: "0 40px" }}>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>Claim Tier</div>
                      <ul style={{ listStyle: "none", margin: "0 0 20px 0", padding: "0" }}>
                        <li><a data-svc="semantic-seo-architecture" className="svc-link" href="/services/semantic-seo-architecture" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>Semantic SEO Architecture</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>12-month authority blueprint</div></a></li>
                        <li><a data-svc="semantic-content-audit" className="svc-link" href="/services/semantic-content-audit" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>Semantic Content Audit</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>Diagnostic foundation · $2000</div></a></li>
                      </ul>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>Scale Tier</div>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                        <li><a data-svc="semantic-content-production" className="svc-link" href="/services/semantic-content-production" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>Semantic Content Production</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>Execute at velocity</div></a></li>
                        <li><a data-svc="pipeline-attribution-seo" className="svc-link" href="/services/pipeline-attribution-seo" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>Pipeline Attribution SEO</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>SEO tied to pipeline</div></a></li>
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>Shield Tier</div>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                        <li><a data-svc="llm-ai-search-visibility" className="svc-link" href="/services/llm-ai-search-visibility" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>LLM &amp; AI Search Visibility</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>Get cited by AI search</div></a></li>
                        <li><a data-svc="authority-link-building" className="svc-link" href="/services/authority-link-building" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>Authority Link Building</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>Methodology-grade links</div></a></li>
                        <li><a data-svc="semantic-content-network" className="svc-link" href="/services/semantic-content-network" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}><div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>Semantic Content Network</div><div style={{ fontFamily: "monospace", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>External authority distribution</div></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a id="link-audit" href="/the-audit" className="nav-link-item">The Audit</a>
              </li>
              <li>
                <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" style={{ fontFamily: "'Inter',sans-serif", background: "#db4c23", color: "#fff", borderRadius: "5px", fontWeight: "700", fontSize: "13px", padding: "9px 20px", letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", marginLeft: "10px", display: "inline-block" }}>Book Strategy Call</a>
              </li>
            </ul>
            <button id="menuBtn" style={{ display: "none", cursor: "pointer", background: "none", border: "1px solid #ddd", fontFamily: "'Inter',sans-serif", fontSize: "14px", padding: "7px 16px", borderRadius: "6px", fontWeight: "500", color: "#333" }}>Menu</button>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <header className="hero">
        <div className="hero-grid-bg"></div>
        <div className="wrap">
          <div className="hero-breadcrumb">
            <a href="/">Home</a>
            <span className="hero-breadcrumb-sep">/</span>
            <span className="hero-breadcrumb-current">About</span>
          </div>
          <span className="hero-pill">Founder-led · Methodology-trained · Practitioner agency</span>
          <h1 className="h-display hero-h1">Architected by a practitioner, <em>not an agency.</em></h1>
          <p className="hero-sub">
            Digital Vikingz is a <strong>semantic SEO authority agency</strong> founded by Usman Ishaq — a methodology-trained practitioner with 200+ shipped projects across 80+ industries. The agency runs lean by design. The work is methodology-grade because the practitioner running it owns the methodology — not because a sales deck says so.
          </p>
          <div className="hero-meta-strip">
            <div className="hero-meta-cell"><span className="hero-meta-label">Practicing since</span><span className="hero-meta-value">2023 <em>·</em></span></div>
            <div className="hero-meta-cell"><span className="hero-meta-label">Projects shipped</span><span className="hero-meta-value">200+ <em>·</em></span></div>
            <div className="hero-meta-cell"><span className="hero-meta-label">Verticals served</span><span className="hero-meta-value">80+ <em>·</em></span></div>
            <div className="hero-meta-cell"><span className="hero-meta-label">Regions</span><span className="hero-meta-value">5 <em>continents</em></span></div>
          </div>
          <div className="hero-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book Strategy Call <span className="btn-arrow"></span></a>
            <a href="#founder" className="btn btn-ghost">Read the Founder Bio <span className="btn-arrow"></span></a>
          </div>
        </div>
      </header>
      {/* FOUNDER */}
      <section className="section founder" id="founder">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">01 / The Founder</span>
              <h2 className="h-display section-h2">The practitioner <em>behind the work.</em></h2>
            </div>
            <p className="section-intro">Most agencies sell methodology they don't actually own. The methodology Digital Vikingz applies is one I've spent years studying, applying, and refining across hundreds of projects. The bio below is the version that matters — not the LinkedIn version.</p>
          </div>
          <div className="founder-card">
            <div className="founder-portrait-wrap">
              <div className="founder-portrait">
                <img src="/images/founder.webp" alt="Usman Ishaq, Founder & CEO of Digital Vikingz" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2" }} />
              </div>
              <div className="founder-tag">Usman Ishaq · Founder</div>
              <div className="founder-meta">
                <div className="founder-meta-row"><span className="founder-meta-key">Role</span><span className="founder-meta-val">Founder · CEO</span></div>
                <div className="founder-meta-row"><span className="founder-meta-key">Based</span><span className="founder-meta-val">Bahawalpur, PK</span></div>
                <div className="founder-meta-row"><span className="founder-meta-key">Background</span><span className="founder-meta-val">Mech. Engineering</span></div>
                <div className="founder-meta-row"><span className="founder-meta-key">Methodology</span><span className="founder-meta-val accent">Koray-aligned</span></div>
                <div className="founder-meta-row"><span className="founder-meta-key">Practicing since</span><span className="founder-meta-val">2023</span></div>
                <div className="founder-meta-row"><span className="founder-meta-key">Specialty</span><span className="founder-meta-val accent">Semantic SEO</span></div>
              </div>
            </div>
            <div className="founder-bio">
              <span className="founder-bio-tag">Founder Bio</span>
              <h3>Usman <em>Ishaq</em></h3>
              <div className="founder-bio-role">Founder &amp; CEO · Digital Vikingz · Practitioner of semantic SEO</div>
              <p>I trained as a <strong>mechanical engineer</strong>. After graduation, I pivoted into digital marketing — first as a freelance SEO content writer and WordPress developer, then deeper into semantic SEO as the discipline matured. The engineering background never left. It informs how I think about authority architecture: <strong>entities as components, predicates as interfaces, governance as system design.</strong> Most career marketers think in narratives. Engineers think in dependencies. Semantic SEO is closer to systems engineering than to copywriting.</p>
              <p>I've been actively practicing on Upwork since 2023. Across that span, I've shipped <strong>200+ projects across 80+ industries</strong> — from SaaS and finance to home services, legal, automotive, e-commerce, and education. The variety isn't a brag — it's how I learned which methodology principles transfer across verticals and which need vertical-specific adaptation. <strong>You don't see what works until you've stress-tested the methodology against radically different category constraints.</strong></p>
              <div className="founder-bio-pullquote">
                "Generalist agencies build the same machine for every client. Methodology agencies build the right machine for each client — the architecture is the same, the configuration changes."
                <span className="founder-bio-pullquote-attr">Usman Ishaq <span>·</span> on the agency model behind Digital Vikingz</span>
              </div>
              <h4 className="founder-bio-section-h">Why <em>semantic SEO</em></h4>
              <p>Around 2021, I started working through Koray Tuğberk Gübür's body of work on semantic SEO — entity-first thinking, topical authority architecture, Source Term Vector consistency, predicate-clean infrastructure. The framework matched the way I'd been instinctively trying to build content systems but couldn't articulate. <strong>It's the only SEO methodology I've encountered that holds up at the entity layer</strong> rather than the keyword layer — which means it's also the only methodology that compounds defensibly under AI retrieval and Google's ongoing entity-graph maturation.</p>
              <p>Since then, semantic SEO has become the operational core of every engagement Digital Vikingz runs. Not as a positioning angle. As <strong>the actual operating system</strong> behind how we architect topical authority, govern editorial production, deploy structured data, and measure outcomes.</p>
              <h4 className="founder-bio-section-h">Why <em>this agency</em></h4>
              <p>Digital Vikingz exists because most SEO agencies sell tactics — keyword research, link building, technical audits — without an architectural framework underneath. The work compounds for 6–12 months, then breaks under the next algorithm update. <strong>Authority that survives requires structural foundations</strong>, not tactical execution. The agencies I'd want to hire didn't exist at a price point most businesses could afford. So I built one.</p>
              <p>The agency runs <strong>lean by design</strong>. Methodology-trained team, not high headcount. Founder-led on every architecture engagement — not handed off to an account manager. I read every deliverable that ships under the Digital Vikingz name. <strong>That doesn't scale to a 50-person agency. It does scale to producing methodology-grade work.</strong></p>
            </div>
          </div>
        </div>
      </section>
      {/* PRACTITIONER CONSOLE — TWO STATE (REACT-CONTROLLED) */}
      <section className="practitioner-section">
        <div className="wrap">
          <div className="practitioner-head">
            <div className="practitioner-head-left">
              <span className="label">02 / The Console</span>
              <h2 className="h-display section-h2">Practitioner record, <em>in two states.</em></h2>
            </div>
            <p className="section-intro">
              Below: the practitioner record compressed into one console with two states. <strong>In Practice</strong> shows what's currently active — engagements running, methodology applications live, regions being served right now. <strong>Track Record</strong> shows the cumulative footprint — projects shipped, verticals served, methodology lineage timeline. Toggle to see both.
            </p>
          </div>
          <div className="practitioner-console" id="practitionerConsole" data-state={consoleState}>
            <div className="pc-header">
              <div className="pc-header-left">
                <span className="pc-pill">
                  {consoleState === 'in-practice' ? 'Live · In Practice' : 'Live · Track Record'}
                </span>
                <span className="pc-title">
                  {consoleState === 'in-practice' ? (
                    <>Practitioner state · <strong>active engagements &amp; current applications</strong></>
                  ) : (
                    <>Practitioner state · <strong>cumulative record &amp; methodology lineage</strong></>
                  )}
                </span>
              </div>
              <button
                type="button"
                className="pc-toggle-btn"
                onClick={() => setConsoleState(s => s === 'in-practice' ? 'track-record' : 'in-practice')}
                aria-label="Toggle between in-practice and track-record"
              >
                <span className="pc-toggle-dot"></span>
                {consoleState === 'in-practice' ? 'See track record' : 'Back to in practice'}
              </button>
            </div>
            {/* TOP STAT ROW */}
            <div className="pc-stat-row">
              <div className="pc-stat-cell">
                <span className="pc-stat-label">{consoleState === 'in-practice' ? 'Active engagements' : 'Projects shipped'}</span>
                <span className="pc-stat-value">{consoleState === 'in-practice' ? '12' : '200+'}</span>
                <span className="pc-stat-detail">{consoleState === 'in-practice' ? 'Across 6 verticals · 4 regions' : 'Cumulative · 2023 to present'}</span>
              </div>
              <div className="pc-stat-cell">
                <span className="pc-stat-label">{consoleState === 'in-practice' ? 'In flight by tier' : 'Verticals served'}</span>
                <span className="pc-stat-value">{consoleState === 'in-practice' ? '3 / 6 / 3' : '40+'}</span>
                <span className="pc-stat-detail">{consoleState === 'in-practice' ? 'Claim · Shield · Scale' : 'SaaS · finance · home · legal · auto · ecom · ed · health'}</span>
              </div>
              <div className="pc-stat-cell">
                <span className="pc-stat-label">{consoleState === 'in-practice' ? 'Production cycles' : 'Years practicing'}</span>
                <span className="pc-stat-value">{consoleState === 'in-practice' ? '8' : '7'}</span>
                <span className="pc-stat-detail">{consoleState === 'in-practice' ? 'Active monthly · methodology-governed' : 'Continuous semantic SEO practice'}</span>
              </div>
              <div className="pc-stat-cell">
                <span className="pc-stat-label">{consoleState === 'in-practice' ? 'Regions live' : 'Continents served'}</span>
                <span className="pc-stat-value">{consoleState === 'in-practice' ? '4' : '5'}</span>
                <span className="pc-stat-detail">{consoleState === 'in-practice' ? 'US · UK · CA · AU active this cycle' : 'N. America · Europe · Asia · Australia · MENA'}</span>
              </div>
            </div>
            {/* BODY ROWS */}
            <div className="pc-body">
              {consoleState === 'in-practice' ? (
                <>
                  <div className="pc-body-section">
                    <div className="pc-body-h">▸ Engagements active this cycle</div>
                    <div className="pc-body-rows">
                      <div className="pc-row">
                        <div className="pc-row-key">SaaS · USA</div>
                        <div className="pc-row-detail">Workflow automation · <strong>architecture in flight · Week 06 of 10</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Building</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Auto · Saudi Arabia</div>
                        <div className="pc-row-detail">Tire e-commerce · <strong>topical map · Phase 02 underway</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Building</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Local · USA</div>
                        <div className="pc-row-detail">Multi-location services · <strong>GBP content cycle · production active</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Producing</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">EdTech · USA</div>
                        <div className="pc-row-detail">Consulting prep platform · <strong>cluster production · cycle 03</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Producing</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Health · USA</div>
                        <div className="pc-row-detail">Behavioral coaching · <strong>GEO/schema audit · in flight</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Auditing</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Local · UK</div>
                        <div className="pc-row-detail">Waste management · <strong>entity architecture proposal under review</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Scoping</div>
                      </div>
                    </div>
                  </div>
                  <div className="pc-body-section">
                    <div className="pc-body-h">▸ Methodology applications live</div>
                    <div className="pc-body-rows">
                      <div className="pc-row">
                        <div className="pc-row-key">Central Entity</div>
                        <div className="pc-row-detail">12 active definitions · <strong>4 newly cascaded this month</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Cascading</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Source Term Vec.</div>
                        <div className="pc-row-detail">8 specifications enforced · <strong>0 banned-phrase violations this cycle</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Clean</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">AI Visibility</div>
                        <div className="pc-row-detail">3 active engagements · <strong>monthly retrieval testing across 4 LLMs</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>▸ Testing</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="pc-body-section">
                    <div className="pc-body-h">▸ Vertical coverage · cumulative</div>
                    <div className="pc-body-rows">
                      <div className="pc-row">
                        <div className="pc-row-key">SaaS · B2B</div>
                        <div className="pc-row-detail">28+ engagements · <strong>workflow automation · DevTools · vertical SaaS</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Deep</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Local services</div>
                        <div className="pc-row-detail">42+ engagements · <strong>home · legal · medical · automotive · trades</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Deep</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">E-commerce</div>
                        <div className="pc-row-detail">22+ engagements · <strong>fashion · auto · pet · home · health products</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Deep</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Finance · Insurance</div>
                        <div className="pc-row-detail">18+ engagements · <strong>YMYL-grade SME review · regulatory layer</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ YMYL</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">EdTech · Coaching</div>
                        <div className="pc-row-detail">16+ engagements · <strong>consulting prep · learning platforms · creator ed</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Deep</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">Other (40+ vert.)</div>
                        <div className="pc-row-detail">74+ engagements · <strong>SaaS-adjacent · creative · misc verticals</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Wide</div>
                      </div>
                    </div>
                  </div>
                  <div className="pc-body-section">
                    <div className="pc-body-h">▸ Methodology lineage timeline</div>
                    <div className="pc-body-rows">
                      <div className="pc-row">
                        <div className="pc-row-key">2023</div>
                        <div className="pc-row-detail">Active practice begins · <strong>SEO content + WordPress development on Upwork</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Started</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">2021</div>
                        <div className="pc-row-detail">Encountered Koray Tuğberk Gübür's work · <strong>methodology adoption begins</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Adopted</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">2022</div>
                        <div className="pc-row-detail">Semantic SEO becomes operational core · <strong>first cross-vertical applications</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Operational</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">2023</div>
                        <div className="pc-row-detail">Digital Vikingz formalized · <strong>agency structure · methodology-trained team</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Formalized</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">2024–25</div>
                        <div className="pc-row-detail">AI/LLM visibility layer added · <strong>methodology extended to retrieval engineering</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Extended</div>
                      </div>
                      <div className="pc-row">
                        <div className="pc-row-key">2026</div>
                        <div className="pc-row-detail">200+ projects · 40+ verticals · <strong>5 continents · methodology compounding</strong></div>
                        <div className="pc-row-status"><span className="pc-row-status-dot"></span>✓ Current</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="pc-foot">
              <span className="pc-foot-text">
                {consoleState === 'in-practice' ? (
                  <>Live snapshot · <strong>updated cycle by cycle</strong> · current as of this month</>
                ) : (
                  <>Cumulative footprint · <strong>2023 to present</strong> · methodology lineage compounding</>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* METHODOLOGY LINEAGE */}
      <section className="section lineage" id="lineage">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">03 / Methodology Lineage</span>
              <h2 className="h-display section-h2">Where the methodology <em>comes from.</em></h2>
            </div>
            <p className="section-intro">The methodology Digital Vikingz applies isn't original. It's adapted from Koray Tuğberk Gübür's body of work on semantic SEO. Pretending otherwise would be the kind of dishonesty that breaks the entire trust structure of this page. <strong>Honest attribution + named adaptations</strong> is the right posture — and it's the same posture every other page on this site takes.</p>
          </div>
          <div className="lineage-grid">
            <div className="lineage-block attribution">
              <span className="lineage-tag">Attribution</span>
              <h3>Built on <em>Koray's framework</em></h3>
              <p>The semantic SEO methodology applied across every Digital Vikingz engagement is rooted in <strong>Koray Tuğberk Gübür's published body of work</strong> — entity-first authority architecture, topical map design, Source Term Vector consistency, predicate cleanliness, agreement-area analysis, query path mapping, and Information Gain engineering.</p>
              <p>Koray is the <strong>methodologist of record</strong>. Digital Vikingz is a practitioner agency that applies that methodology across client engagements. We don't claim Koray endorses us. We don't claim methodology origination. We claim what's true: <strong>experienced practitioners of his framework</strong>, with 200+ projects of applied execution.</p>
              <ul className="lineage-list">
                <li><span className="lineage-list-num">Concept 01</span><span className="lineage-list-title">Topical <em>Authority</em></span><span className="lineage-list-detail">Authority compounds when entities, predicates, and topical maps are governed coherently — not when keywords stack up.</span></li>
                <li><span className="lineage-list-num">Concept 02</span><span className="lineage-list-title">Central <em>Entity</em></span><span className="lineage-list-detail">A site's authority binds to a single locked Central Entity definition. Drift here breaks every layer above it.</span></li>
                <li><span className="lineage-list-num">Concept 03</span><span className="lineage-list-title">Source Term <em>Vector</em></span><span className="lineage-list-detail">A site's vocabulary is its semantic signature. Inconsistent terminology fragments authority at the entity layer.</span></li>
                <li><span className="lineage-list-num">Concept 04</span><span className="lineage-list-title">Information <em>Gain</em></span><span className="lineage-list-detail">Pages contributing net-new attributes beyond the SERP agreement area get retrieved disproportionately by AI systems.</span></li>
              </ul>
            </div>
            <div className="lineage-block adaptation">
              <span className="lineage-tag">Adaptations</span>
              <h3>Three things <em>we apply differently</em></h3>
              <p>Within Koray's framework, three operational adaptations have emerged from running 200+ engagements across 40+ verticals. <strong>None of these contradict the underlying methodology.</strong> They extend it into operational territory the published work touches lightly — because applying methodology at agency scale surfaces problems theoretical work doesn't always address.</p>
              <p>These adaptations are <strong>practitioner-level decisions</strong>, not methodological revisions. Koray's framework is the source. Our adaptations are how we operationalize it under the constraints of paid client engagements at variable budgets.</p>
              <ul className="lineage-list">
                <li><span className="lineage-list-num">Adaptation 01</span><span className="lineage-list-title">Engineering <em>Systems Thinking</em></span><span className="lineage-list-detail">My mechanical engineering background informs how we model entities (components), predicates (interfaces), and governance (system design). The architecture deliverables look more like engineering specs than content briefs.</span></li>
                <li><span className="lineage-list-num">Adaptation 02</span><span className="lineage-list-title">Vertical-Specific <em>Playbooks</em></span><span className="lineage-list-detail">200+ projects across 40+ verticals produced documented vertical playbooks — local services run differently from SaaS, which run differently from YMYL finance. The methodology is universal; the configuration is vertical-specific.</span></li>
                <li><span className="lineage-list-num">Adaptation 03</span><span className="lineage-list-title">AI/LLM Visibility <em>Extension</em></span><span className="lineage-list-detail">We extended the framework into post-search retrieval — engineering for ChatGPT, Perplexity, Claude, Gemini, and AI Overviews citations. The structural moves that make sites rank also make them retrievable; the AI layer adds Information Gain testing across LLM surfaces.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* TEAM */}
      <section className="section team" id="team">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">04 / The Team</span>
              <h2 className="h-display section-h2">Lean by design, <em>methodology-trained.</em></h2>
            </div>
            <p className="section-intro">Digital Vikingz is a small team. That's a deliberate choice, not a stage we're trying to grow out of. Every team member is methodology-trained on the governance manual before producing client work. <strong>No outsourced contractor pools.</strong> No fake team-size inflation. No stock photos with made-up names. Below: who actually does the work.</p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-portrait">
                <img src="/images/CEO.png" alt="Usman Ishaq" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2" }} />
              </div>
              <h4>Usman <em>Ishaq</em></h4>
              <div className="team-role">Founder · CEO · <span>Methodology Lead</span></div>
              <p className="team-bio">Owns architecture engagements end-to-end. Reads every deliverable that ships under the Digital Vikingz name. Engineering background informs how authority architectures get built. <strong>Founder-led on every Claim-tier engagement</strong> — not handed off to account managers.</p>
            </div>
            <div className="team-card">
              <div className="team-portrait">
                <img src="/images/umair bhai.webp" alt="Umair Mehmood" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2" }} />
              </div>
              <h4>Umair <em>Mehmood</em></h4>
              <div className="team-role">Workflow &amp; <span>Team Management</span></div>
              <p className="team-bio">Operations backbone of the agency. Manages production workflows, cycle scheduling, and team capacity alignment across active engagements. <strong>If a deliverable ships on time, it's because Umair tracked it</strong>.</p>
            </div>
            <div className="team-card">
              <div className="team-portrait">
                <img src="/images/abad bhai.webp" alt="Abad Aslam" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "relative", zIndex: "2" }} />
              </div>
              <h4>Abad <em>Aslam</em></h4>
              <div className="team-role">Content Marketing · <span>Editorial QA</span></div>
              <p className="team-bio">Editorial leadership across content production engagements. Multi-pass QA on every asset — predicate consistency, banned-phrase scans, schema validation, internal linking compliance. <strong>The reason zero banned-phrase violations ship</strong>.</p>
            </div>
          </div>
          <div className="team-extra">
            <div className="team-extra-icon">W</div>
            <div className="team-extra-text">Plus a <strong>methodology-trained writer network</strong> for production scaling. Each writer is onboarded on the client's governance manual, Source Term Vector specification, and predicate framework <em>before</em> producing assets. <strong>Writers don't guess — they execute against governance specs.</strong></div>
          </div>
        </div>
      </section>
      {/* GEOGRAPHY */}
      <section className="section geo" id="geo">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">05 / Where We Operate</span>
              <h2 className="h-display section-h2">Based in Bahawalpur. <em>Serving the world.</em></h2>
            </div>
            <p className="section-intro">Digital Vikingz operates remote-first from Bahawalpur, Pakistan. Most engagements run async — written deliverables, scheduled review calls, Slack/email channels. <strong>Geography hasn't been a constraint</strong> across 200+ projects. The methodology is what scales globally; the timezone is just a logistics detail.</p>
          </div>
          <div className="geo-grid">
            <div className="geo-base">
              <span className="geo-base-tag">Home Base</span>
              <h3 className="geo-base-h">Bahawalpur, <em>Pakistan</em></h3>
              <p className="geo-base-p">A mid-sized city in southern Punjab — not Karachi, not Islamabad. The base is deliberate. Lower overhead than Tier-1 SEO agency cities means we can run methodology-grade engagements at price points that would be unviable from London or NYC. <strong>The methodology is the value</strong>; the geography reduces the cost of delivering it.</p>
              <p className="geo-base-p">Most client communication runs <strong>async</strong> — written deliverables, recorded walkthroughs, scheduled review calls. Live calls scheduled within a 12-hour window aligned to the client's region.</p>
              <div className="geo-base-meta">
                <div className="geo-base-meta-row"><span className="geo-base-meta-key">Timezone</span><span className="geo-base-meta-val">PKT · UTC +05:00</span></div>
                <div className="geo-base-meta-row"><span className="geo-base-meta-key">Working hours</span><span className="geo-base-meta-val">10am–10pm flexible</span></div>
                <div className="geo-base-meta-row"><span className="geo-base-meta-key">Language</span><span className="geo-base-meta-val">English (deliverables)</span></div>
              </div>
            </div>
            <div className="geo-regions">
              <span className="geo-regions-h">▸ Active Client Regions</span>
              <div className="geo-region"><span className="geo-region-flag">US</span><span className="geo-region-name">United States</span><span className="geo-region-detail">Largest base</span></div>
              <div className="geo-region"><span className="geo-region-flag">UK</span><span className="geo-region-name">United Kingdom</span><span className="geo-region-detail">Active</span></div>
              <div className="geo-region"><span className="geo-region-flag">CA</span><span className="geo-region-name">Canada</span><span className="geo-region-detail">Active</span></div>
              <div className="geo-region"><span className="geo-region-flag">AU</span><span className="geo-region-name">Australia</span><span className="geo-region-detail">Active</span></div>
              <div className="geo-region"><span className="geo-region-flag">DE</span><span className="geo-region-name">Germany</span><span className="geo-region-detail">Active</span></div>
              <div className="geo-region"><span className="geo-region-flag">SA</span><span className="geo-region-name">Saudi Arabia</span><span className="geo-region-detail">Active</span></div>
              <div className="geo-region"><span className="geo-region-flag">PT</span><span className="geo-region-name">Portugal</span><span className="geo-region-detail">Past engagement</span></div>
              <div className="geo-region"><span className="geo-region-flag">+</span><span className="geo-region-name">Other regions</span><span className="geo-region-detail">Per project</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* DON'TS — Disqualification */}
      <section className="section donts" id="donts">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head-left">
              <span className="label">06 / What We Don't Do</span>
              <h2 className="h-display section-h2">The work we <em>decline.</em></h2>
            </div>
            <p className="section-intro">Disqualification is a credibility move. Most agencies will say yes to anything that sends a wire transfer. Below is the explicit list of work Digital Vikingz declines — even when offered. This list isn't exhaustive, but it covers the patterns that come up repeatedly in scoping calls.</p>
          </div>
          <div className="donts-grid">
            <div className="dont-card"><span className="dont-card-num">Decline 01</span><h4>PBN, link networks, <em>or paid placements</em></h4><p>We don't build private blog networks. We don't run guest post networks with low editorial standards. We don't pay for placements. <strong>Every link in our authority engagements is editorially earned</strong> on category-aligned publications. If a category genuinely has no editorially-earnable placements, we tell you that and decline the link engagement.</p></div>
            <div className="dont-card"><span className="dont-card-num">Decline 02</span><h4>Keyword-first <em>SEO strategy</em></h4><p>We don't lead engagements with keyword research. The methodology is entity-first — Central Entity, topical map, predicate framework, then queries derive from that structure. <strong>Keyword-first SEO produces fragile authority that breaks under algorithm updates.</strong> If keyword research is your starting point, we're wrong fit.</p></div>
            <div className="dont-card"><span className="dont-card-num">Decline 03</span><h4>30-day <em>ranking guarantees</em></h4><p>Authority compounds over quarters, not weeks. We don't make 30-day or 60-day ranking promises because the underlying mechanics don't work that way. <strong>Agencies that make those promises are either lying or building short-term tactics</strong> that break the moment the next update lands. We won't compete with them on timeline; we compete on durability.</p></div>
            <div className="dont-card"><span className="dont-card-num">Decline 04</span><h4>Adult, gambling, <em>or extractive verticals</em></h4><p>We decline engagements in adult content, online gambling outside regulated markets, predatory financial products, and other extractive verticals. <strong>The methodology can't undo the harm</strong>, and authority engineering for those verticals would be aiding it. Not a moral lecture — just an explicit scope boundary.</p></div>
            <div className="dont-card"><span className="dont-card-num">Decline 05</span><h4>Anonymous brand <em>ghostwriting</em></h4><p>For Content Network engagements (Service 05), we don't ghostwrite under fictional expert personas. The expert voice has to be a real person with category credibility on record. <strong>Fake expert personas are detectable and reputationally fragile.</strong> If you don't have an expert voice available, the service isn't right for you.</p></div>
            <div className="dont-card"><span className="dont-card-num">Decline 06</span><h4>Engagements without <em>methodology fit</em></h4><p>If a prospect explicitly wants tactics-first SEO, generic content writing, or quick-win optimization, we decline. <strong>Forcing methodology onto unwilling clients produces frustration on both sides.</strong> Better to point them toward a generalist agency that fits their model than to take work that compounds nothing.</p></div>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="final-cta" id="cta">
        <div className="wrap">
          <span className="label final-cta-label">07 / The Next Step</span>
          <h2 className="h-display">Work with the practitioner, <em>not the agency.</em></h2>
          <p>Most agencies sell methodology they don't actually own. The strategy call goes directly to the founder — not an SDR, not an account manager. If we're right fit, you'll know in 30 minutes. If we're not, I'll tell you who is.</p>
          <div className="final-cta-ctas">
            <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" className="btn btn-primary">Book Strategy Call <span className="btn-arrow"></span></a>
            <a href="/the-audit" className="btn btn-ghost">Or Start with the Audit <span className="btn-arrow"></span></a>
          </div>
        </div>
      </section>
      {/* ============== FOOTER ============== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo">
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
                <li><a href="/services/llm-ai-search-visibility">LLM &amp; AI Search Visibility</a></li>
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
                <li><a href="https://www.linkedin.com/company/digital-vikingz/" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>LinkedIn</a></li>
                <li><a href="https://www.facebook.com/DigitalVikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>Facebook</a></li>
                <li><a href="https://www.instagram.com/digitalvikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path></svg>Instagram</a></li>
                <li><a href="https://www.youtube.com/@DigitalVikingz" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path></svg>YouTube</a></li>
                <li><a href="mailto:workwithus@digitalvikingz.com" style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>workwithus@digitalvikingz.com</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-text">© 2026 Digital Vikingz · All rights reserved</div>
            <div className="footer-tagline">Claim<span>.</span> Shield<span>.</span> Scale<span>.</span></div>
          </div>
        </div>
      </footer>
    </>
  );
}