import Footer from "./Footer"
import { siteConfig } from "@/data/site-content"

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "relative", zIndex: 1000 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
            <a href="/" id="logoLink" className="logo" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", minWidth: 220, flexShrink: 0 }}>
              <img id="logoImg" src="/images/logo.png" alt="Digital Vikingz" className="logo-mark" style={{ height: 42, width: 42, objectFit: "contain", display: "block", flexShrink: 0, borderRadius: 10 }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 600, color: "#111" }}>Digital Vikingz</span>
            </a>
            <ul id="navLinks" style={{ display: "flex", alignItems: "center", listStyle: "none", margin: 0, padding: 0, gap: 0 }}>
              <li><a id="link-om" href="/operating-manual" className="nav-link-item">Operating Manual</a></li>
              <li><a id="link-bp" href="/build-process" className="nav-link-item">Build Process</a></li>
              <li><a id="link-vp" href="/vertical-playbooks" className="nav-link-item">Vertical Playbooks</a></li>

              <li style={{ position: "relative" }} id="servicesDropdown">
                <a href="#" id="servicesToggle" className="nav-link-item" style={{ gap: 4 }}>
                  Services
                  <svg id="serviceChevron" style={{ width: 10, height: 10, transition: "transform 0.2s", opacity: 0.7, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
                <div id="megaMenu" style={{ position: "absolute", top: "100%", left: -20, width: 580, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderTop: "2px solid rgba(0,0,0,0.05)", boxShadow: "0 12px 40px rgba(0,0,0,0.09)", opacity: 0, pointerEvents: "none", transform: "translateY(-4px)", transition: "opacity 0.18s ease,transform 0.18s ease", zIndex: 999 }}>
                  <div className="mega-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "24px 28px 26px", gap: "0 40px" }}>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: 2 }}>Claim Tier</div>
                      <ul style={{ listStyle: "none", margin: "0 0 20px 0", padding: 0 }}>
                        <li>
                          <a data-svc="semantic-seo-architecture" className="svc-link" href="/services/semantic-seo-architecture" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>Semantic SEO Architecture</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>12-month authority blueprint</div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="semantic-content-audit" className="svc-link" href="/services/semantic-content-audit" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>Semantic Content Audit</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>Diagnostic foundation · $2000</div>
                          </a>
                        </li>
                      </ul>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: 2 }}>Scale Tier</div>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        <li>
                          <a data-svc="semantic-content-production" className="svc-link" href="/services/semantic-content-production" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>Semantic Content Production</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>Execute at velocity</div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="pipeline-attribution-seo" className="svc-link" href="/services/pipeline-attribution-seo" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>Pipeline Attribution SEO</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>SEO tied to pipeline</div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#C4401A", paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.09)", marginBottom: 2 }}>Shield Tier</div>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        <li>
                          <a data-svc="llm-ai-search-visibility" className="svc-link" href="/services/llm-ai-search-visibility" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>LLM &amp; AI Search Visibility</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>Get cited by AI search</div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="authority-link-building" className="svc-link" href="/services/authority-link-building" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>Authority Link Building</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>Methodology-grade links</div>
                          </a>
                        </li>
                        <li>
                          <a data-svc="semantic-content-network" className="svc-link" href="/services/semantic-content-network" style={{ textDecoration: "none", display: "block", padding: "8px 0", borderBottom: "none" }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 2 }}>Semantic Content Network</div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", lineHeight: 1.3 }}>External authority distribution</div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li><a id="link-audit" href="/the-audit" className="nav-link-item">The Audit</a></li>
              <li>
                <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener" style={{ fontFamily: "'Inter',sans-serif", background: "#db4c23", color: "#fff", borderRadius: 5, fontWeight: 700, fontSize: 13, padding: "9px 20px", letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", marginLeft: 10, display: "inline-block" }}>
                  Book Strategy Call
                </a>
              </li>
            </ul>
            <button id="menuBtn" style={{ display: "none", cursor: "pointer", background: "none", border: "1px solid #ddd", fontFamily: "'Inter',sans-serif", fontSize: 14, padding: "7px 16px", borderRadius: 6, fontWeight: 500, color: "#333" }}>
              Menu
            </button>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <Footer />
    </>
  )
}