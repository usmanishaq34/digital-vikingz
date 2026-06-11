import Link from "next/link"
import { siteConfig } from "@/data/site-content"
import { services } from "@/data/services"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: "#0a0a0a", padding: "80px 0 32px", color: "rgba(255,255,255,0.7)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
        <div
          className="dv-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "64px",
            paddingBottom: "48px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* BRAND COLUMN */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "24px",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Digital Vikingz"
                style={{
                  width: "36px",
                  height: "36px",
                  objectFit: "contain",
                  background: "#fff",
                  padding: "3px",
                  borderRadius: "10px",
                  filter: "brightness(1.2)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Digital Vikingz
              </span>
            </Link>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "360px",
                marginBottom: "24px",
              }}
            >
              Semantic SEO authority agency built on Koray Tuğberk Gübür&apos;s methodology. We architect topical authority,
              defend it against AI dilution, and convert it into pipeline for businesses that want to claim a topic and own it.
            </p>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Based in Bahawalpur <span style={{ color: "#db4c23", fontWeight: 600 }}>·</span> Serving US · UK · CA · AU · DE
            </div>
          </div>

          {/* SERVICES COLUMN */}
          <div>
            <h5
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "11px",
                color: "#db4c23",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "24px",
                fontWeight: 600,
              }}
            >
              Services
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {services.map((s) => (
                <li key={s.slug} style={{ marginBottom: "12px" }}>
                  <Link
                    href={`/services/${s.slug}`}
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AGENCY COLUMN */}
          <div>
            <h5
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "11px",
                color: "#db4c23",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "24px",
                fontWeight: 600,
              }}
            >
              Agency
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/about" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>About Us</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/contact" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Contact Us</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/blog" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Blogs</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/operating-manual" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Operating Manual</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/build-process" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Build Process</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/vertical-playbooks" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Vertical Playbooks</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/#rankings" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Live Rankings</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/#team" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Team</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link href="/privacy-policy" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}>Privacy Policy</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener"
                  style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>

          {/* CONNECT COLUMN */}
          <div>
            <h5
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "11px",
                color: "#db4c23",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "24px",
                fontWeight: 600,
              }}
            >
              Connect
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <a
                  href="https://www.youtube.com/@DigitalVikingz"
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                  </svg>
                  YouTube
                </a>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#db4c23">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            © {year} Digital Vikingz · All rights reserved
          </div>
          <div
            style={{
              fontFamily: "'Fraunces',Georgia,serif",
              fontStyle: "italic",
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Claim<span style={{ color: "#db4c23" }}>.</span> Shield<span style={{ color: "#db4c23" }}>.</span> Scale<span style={{ color: "#db4c23" }}>.</span>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .dv-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .dv-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}