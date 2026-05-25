import { prisma } from "@/lib/db";
import ClientFixes from "../ClientFixes";

export const revalidate = 30; // ISR: refresh posts every 30s

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function slugifyCat(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function Page() {
  // Fetch published posts from DB. Falls back to empty array if DB unreachable.
  // We accept either: status='published' (new schema) OR published=true (legacy).
  const posts = await prisma.post
    .findMany({
      where: {
        OR: [
          { status: "published" } as any,
          { published: true },
        ],
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      include: { category: true },
    })
    .catch(() => []);

  const navAndFilterScript = `
// Nav mega menu
(function () {
  var dropdown = document.getElementById('servicesDropdown');
  var megaMenu = document.getElementById('megaMenu');
  var chevron  = document.getElementById('serviceChevron');
  if (dropdown && megaMenu && chevron) {
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth >= 960) { megaMenu.style.opacity='1'; megaMenu.style.pointerEvents='all'; megaMenu.style.transform='translateY(0)'; chevron.style.transform='rotate(180deg)'; }
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth >= 960) { megaMenu.style.opacity='0'; megaMenu.style.pointerEvents='none'; megaMenu.style.transform='translateY(-4px)'; chevron.style.transform='rotate(0deg)'; }
    });
  }
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn) menuBtn.addEventListener('click', function () { document.getElementById('navLinks').classList.toggle('show'); });
  var servicesToggle = document.getElementById('servicesToggle');
  if (servicesToggle) servicesToggle.addEventListener('click', function (e) {
    if (window.innerWidth < 960) { e.preventDefault(); megaMenu.classList.toggle('show'); chevron.style.transform = megaMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)'; }
  });
})();

// Category filter
document.querySelectorAll('.dv-blog-cat-pill').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.dv-blog-cat-pill').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.dv-blog-card').forEach(function(card) {
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
`;

  return (
    <>
      <ClientFixes />
      <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('DOMContentLoaded', function(){${navAndFilterScript}});` }} />
      <style dangerouslySetInnerHTML={{ __html: `
/* ===== DESIGN SYSTEM ===== */
:root {
  --bg: #ffffff;
  --bg-2: #faf9f6;
  --bg-3: #f3f1ec;
  --bg-card: #ffffff;
  --line: rgba(10, 10, 10, 0.1);
  --line-strong: rgba(10, 10, 10, 0.22);
  --line-accent: rgba(219, 76, 35, 0.4);
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

.wrap {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
}

/* ===== NAV ===== */
.nav-link-item {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 500;
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

.logo-mark { border-radius: 10px; }

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
    z-index: 999;
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

/* ===== FOOTER ===== */
.footer {
  background: var(--text);
  padding: 80px 0 32px;
  color: rgba(255, 255, 255, 0.7);
}

.footer .logo-text { color: #fff; }

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 64px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand a { display: flex; align-items: center; gap: 10px; text-decoration: none; margin-bottom: 24px; }
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

/* ===== BLOG HERO ===== */
.dv-blog-wrap {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px 80px;
}

.dv-blog-hero {
  padding: 80px 0 56px;
  max-width: 780px;
}

.dv-blog-label {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.dv-blog-label::before {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: var(--accent);
}

.dv-blog-h1 {
  font-family: var(--display);
  font-weight: 400;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.06;
  letter-spacing: -0.025em;
  font-variation-settings: "SOFT" 30, "opsz" 144;
  color: var(--text);
  margin-bottom: 20px;
}

.dv-blog-h1 em {
  font-style: italic;
  font-variation-settings: "SOFT" 100, "opsz" 144;
  color: var(--accent);
}

.dv-blog-intro {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 32px;
  max-width: 640px;
}

.dv-blog-intro strong {
  color: var(--text);
  font-weight: 600;
}

/* Category pills */
.dv-blog-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.dv-blog-cat-pill {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 8px 18px;
  border: 1px solid var(--line-strong);
  border-radius: 2px;
  text-decoration: none;
  color: var(--text-muted);
  transition: all 0.2s;
  text-transform: uppercase;
  cursor: pointer;
  background: none;
}

.dv-blog-cat-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}

.dv-blog-cat-pill.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* ===== BLOG GRID ===== */
.dv-blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.dv-blog-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--bg-card);
}

.dv-blog-card:hover {
  border-color: var(--line-strong);
  box-shadow: 0 8px 32px rgba(10, 10, 10, 0.06);
  transform: translateY(-3px);
}

.dv-blog-card-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-3);
}

.dv-blog-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.dv-blog-card:hover .dv-blog-card-image img {
  transform: scale(1.04);
}

.dv-blog-card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-3) 0%, var(--bg-2) 100%);
}

.dv-blog-card-image-initial {
  font-family: var(--display);
  font-size: 56px;
  font-weight: 300;
  color: var(--accent);
  opacity: 0.4;
  font-variation-settings: "SOFT" 100, "opsz" 144;
  font-style: italic;
}

.dv-blog-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dv-blog-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 12px;
}

.dv-blog-card-cat {
  color: var(--accent);
  font-weight: 600;
}

.dv-blog-card-meta-sep {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-dim);
  flex-shrink: 0;
}

.dv-blog-card h2 {
  font-family: var(--display);
  font-weight: 400;
  font-size: 20px;
  line-height: 1.28;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 10px;
  font-variation-settings: "SOFT" 20, "opsz" 36;
}

.dv-blog-card-excerpt {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 16px;
  flex: 1;
}

.dv-blog-card-readmore {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  transition: letter-spacing 0.2s;
}

.dv-blog-card:hover .dv-blog-card-readmore {
  letter-spacing: 0.16em;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .dv-blog-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}

@media (max-width: 640px) {
  .dv-blog-wrap { padding: 0 20px 60px; }
  .dv-blog-hero { padding: 48px 0 36px; }
  .dv-blog-h1 { font-size: 32px; }
  .dv-blog-grid { grid-template-columns: 1fr; gap: 20px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-brand { grid-column: auto; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
  .wrap { padding: 0 20px; }
}
`}} />
      {/* ============== NAV ============== */}
      <nav style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "fixed", top: "0", left: "0", right: "0", zIndex: "1000" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "62px" }}>
            <a href="/" className="logo" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{ height: "42px", width: "auto" }} />
              <span style={{ fontFamily: "var(--display)", fontSize: "22px", fontWeight: "600", color: "#111", letterSpacing: "-0.02em" }}>
                Digital Vikingz
              </span>
            </a>
            <ul id="navLinks" style={{ display: "flex", alignItems: "center", listStyle: "none", margin: "0", padding: "0", gap: "0" }}>
              <li>
                <a href="/operating-manual" className="nav-link-item">
                  Operating Manual
                </a>
              </li>
              <li>
                <a href="/build-process" className="nav-link-item">
                  Build Process
                </a>
              </li>
              <li>
                <a href="/vertical-playbooks" className="nav-link-item">
                  Vertical Playbooks
                </a>
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
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>
                        Claim Tier
                      </div>
                      <ul style={{ listStyle: "none", margin: "0 0 20px 0", padding: "0" }}>
                        <li>
                          <a href="/services/semantic-seo-architecture" data-svc="semantic-seo-architecture" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic SEO Architecture
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              12-month authority blueprint
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/services/semantic-content-audit" data-svc="semantic-content-audit" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Audit
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Diagnostic foundation · $2000
                            </div>
                          </a>
                        </li>
                      </ul>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>
                        Scale Tier
                      </div>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                        <li>
                          <a href="/services/semantic-content-production" data-svc="semantic-content-production" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Production
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Execute at velocity
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/services/pipeline-attribution-seo" data-svc="pipeline-attribution-seo" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Pipeline Attribution SEO
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              SEO tied to pipeline
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: "2px" }}>
                        Shield Tier
                      </div>
                      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                        <li>
                          <a href="/services/llm-ai-search-visibility" data-svc="llm-ai-search-visibility" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              LLM &amp; AI Search Visibility
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Get cited by AI search
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/services/authority-link-building" data-svc="authority-link-building" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Authority Link Building
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
                              Methodology-grade links
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/services/semantic-content-network" data-svc="semantic-content-network" className="svc-link" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                            <div style={{ fontFamily: "var(--body)", fontSize: "16px", fontWeight: "500", color: "#111", lineHeight: "1.3", marginBottom: "2px" }}>
                              Semantic Content Network
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#888", lineHeight: "1.3" }}>
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
                <a href="/the-audit" className="nav-link-item">
                  The Audit
                </a>
              </li>
              <li>
                <a href="https://calendly.com/usmanishaqsemanticseospecialist/30min" target="_blank" rel="noopener" style={{ fontFamily: "var(--body)", background: "#db4c23", color: "#fff", borderRadius: "5px", fontWeight: "700", fontSize: "13px", padding: "9px 20px", letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", marginLeft: "10px", display: "inline-block" }}>
                  Book Strategy Call
                </a>
              </li>
            </ul>
            <button id="menuBtn" style={{ display: "none", cursor: "pointer", background: "none", border: "1px solid #ddd", fontFamily: "var(--body)", fontSize: "14px", padding: "7px 16px", borderRadius: "6px", fontWeight: "500", color: "#333" }}>
              Menu
            </button>
          </div>
        </div>
      </nav>
      <div style={{ height: "62px" }}></div>
      {/* ============== BLOG HERO ============== */}
      <main>
        <div className="dv-blog-wrap">
          <header className="dv-blog-hero">
            <span className="dv-blog-label">
              Insights
            </span>
            <h1 className="dv-blog-h1">
              Methodology,
              {' '}
              <em>
                not motivation.
              </em>
            </h1>
            <p className="dv-blog-intro">
              Long-form essays on semantic SEO architecture, entity-layer diagnostics, AI retrieval engineering, and methodology adaptations from 200+ shipped engagements.
              {' '}
              <strong>
                No tactical guides. No 5-tip listicles. No AI-generated filler.
              </strong>
              {' '}
              Every post earns its publish.
            </p>
            <div className="dv-blog-categories">
              <button className="dv-blog-cat-pill active" data-cat="all">
                All
              </button>
              <button className="dv-blog-cat-pill" data-cat="semantic-seo">
                Semantic SEO
              </button>
              <button className="dv-blog-cat-pill" data-cat="case-studies">
                Case Studies
              </button>
              <button className="dv-blog-cat-pill" data-cat="ai-visibility">
                AI Visibility
              </button>
              <button className="dv-blog-cat-pill" data-cat="methodology">
                Methodology
              </button>
              <button className="dv-blog-cat-pill" data-cat="strategy">
                Strategy
              </button>
            </div>
          </header>
          {/* ============== BLOG GRID ============== */}
          <div className="dv-blog-grid" id="blogGrid">
            {posts.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", padding: "60px 20px", textAlign: "center", color: "#6b6b65" }}>
                <p style={{ fontFamily: "var(--display)", fontSize: "20px", fontStyle: "italic", marginBottom: "8px" }}>
                  No posts yet.
                </p>
                <p style={{ fontSize: "14px" }}>
                  Posts you publish in the dashboard will appear here.
                </p>
              </div>
            ) : (
              posts.map((post) => {
                const catName = post.category?.name ?? "Methodology";
                const catSlug = post.category?.slug ?? slugifyCat(catName);
                return (
                  <a
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="dv-blog-card"
                    data-cat={catSlug}
                  >
                    <div className="dv-blog-card-image">
                      <div className="dv-blog-card-image-placeholder">
                        {post.featuredImage ? (
                          <img src={post.featuredImage} alt={post.featuredImageAlt ?? post.title} />
                        ) : (
                          <span className="dv-blog-card-image-initial">
                            {post.title.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="dv-blog-card-body">
                      <div className="dv-blog-card-meta">
                        <span className="dv-blog-card-cat">{catName}</span>
                        <span className="dv-blog-card-meta-sep"></span>
                        <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p className="dv-blog-card-excerpt">{post.excerpt}</p>
                      <span className="dv-blog-card-readmore">Read article</span>
                    </div>
                  </a>
                );
              })
            )}
          </div>
        </div>
      </main>
      {/* ============== FOOTER ============== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/">
                <img src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{ height: "36px", width: "auto", filter: "brightness(1.2)" }} />
                <span className="logo-text" style={{ fontFamily: "var(--display)", fontSize: "22px", fontWeight: "600", color: "#fff", letterSpacing: "-0.02em" }}>
                  Digital Vikingz
                </span>
              </a>
              <p>
                Semantic SEO authority agency built on Koray Tuğberk Gübür&apos;s methodology. We architect topical authority, defend it against AI dilution, and convert it into pipeline for businesses that want to claim a topic and own it.
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
                  <a href="/blog">
                    Insights
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