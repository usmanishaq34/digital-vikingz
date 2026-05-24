"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Settings } from "@prisma/client"

type Tab = "identity" | "contact" | "stats" | "ctas" | "social" | "founder" | "audit" | "seo" | "analytics"

export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<Tab>("identity")
  const [form, setForm] = useState(settings)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Save failed")
      toast.success("Settings saved.")
      router.refresh()
    } catch {
      toast.error("Save failed. Try again.")
    } finally {
      setSaving(false)
    }
  }

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm({ ...form, [key]: value })
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "identity", label: "Identity" },
    { id: "contact", label: "Contact" },
    { id: "stats", label: "Stats" },
    { id: "ctas", label: "CTAs" },
    { id: "social", label: "Social" },
    { id: "founder", label: "Founder" },
    { id: "audit", label: "Audit" },
    { id: "seo", label: "Global SEO" },
    { id: "analytics", label: "Analytics" },
  ]

  return (
    <form onSubmit={handleSave}>
      <div className="flex flex-wrap gap-2 border-b border-line mb-8 -mt-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 mono-pill border-b-2 transition-all ${
              tab === t.id
                ? "border-accent text-accent"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-7">
        {tab === "identity" && (
          <>
            <F label="Site Title">
              <input type="text" value={form.siteTitle} onChange={(e) => set("siteTitle", e.target.value)} className="form-input" />
            </F>
            <F label="Site Tagline">
              <textarea value={form.siteTagline ?? ""} onChange={(e) => set("siteTagline", e.target.value)} className="form-input min-h-[80px]" />
            </F>
            <F label="Logo URL">
              <input type="url" value={form.logoUrl ?? ""} onChange={(e) => set("logoUrl", e.target.value || null)} className="form-input" placeholder="https://..." />
            </F>
          </>
        )}

        {tab === "contact" && (
          <>
            <F label="Contact Email">
              <input type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} className="form-input" />
            </F>
            <F label="Calendly URL">
              <input type="url" value={form.calendlyUrl} onChange={(e) => set("calendlyUrl", e.target.value)} className="form-input" />
            </F>
            <F label="Calendly Audit URL">
              <input type="url" value={form.calendlyAuditUrl} onChange={(e) => set("calendlyAuditUrl", e.target.value)} className="form-input" />
            </F>
            <F label="Agency Location">
              <input type="text" value={form.agencyLocation} onChange={(e) => set("agencyLocation", e.target.value)} className="form-input" />
            </F>
            <F label="Regions Served">
              <input type="text" value={form.agencyRegions} onChange={(e) => set("agencyRegions", e.target.value)} className="form-input" />
            </F>
          </>
        )}

        {tab === "stats" && (
          <>
            <F label="Projects Shipped"><input type="text" value={form.statsProjects} onChange={(e) => set("statsProjects", e.target.value)} className="form-input" /></F>
            <F label="Verticals Served"><input type="text" value={form.statsVerticals} onChange={(e) => set("statsVerticals", e.target.value)} className="form-input" /></F>
            <F label="Practicing Since"><input type="text" value={form.statsPracticingSince} onChange={(e) => set("statsPracticingSince", e.target.value)} className="form-input" /></F>
            <F label="Team Size"><input type="text" value={form.statsTeamSize} onChange={(e) => set("statsTeamSize", e.target.value)} className="form-input" /></F>
            <F label="Methodology Lineage"><input type="text" value={form.statsMethodologyLineage} onChange={(e) => set("statsMethodologyLineage", e.target.value)} className="form-input" /></F>
          </>
        )}

        {tab === "ctas" && (
          <>
            <F label="Primary CTA Label"><input type="text" value={form.ctaPrimaryLabel} onChange={(e) => set("ctaPrimaryLabel", e.target.value)} className="form-input" /></F>
            <F label="Audit CTA Label"><input type="text" value={form.ctaAuditLabel} onChange={(e) => set("ctaAuditLabel", e.target.value)} className="form-input" /></F>
            <F label="Final CTA Heading" hint="HTML allowed. Use <em>word</em> for orange italic accent.">
              <textarea value={form.ctaFinalHeading} onChange={(e) => set("ctaFinalHeading", e.target.value)} className="form-input min-h-[80px]" />
            </F>
            <F label="Final CTA Subtext">
              <textarea value={form.ctaFinalSub} onChange={(e) => set("ctaFinalSub", e.target.value)} className="form-input min-h-[100px]" />
            </F>
            <F label="Footer Tagline">
              <textarea value={form.footerTagline} onChange={(e) => set("footerTagline", e.target.value)} className="form-input min-h-[100px]" />
            </F>
            <F label="No-Promises Disclaimer">
              <textarea value={form.noPromisesDisclaimer} onChange={(e) => set("noPromisesDisclaimer", e.target.value)} className="form-input min-h-[60px]" />
            </F>
          </>
        )}

        {tab === "social" && (
          <>
            <F label="Facebook URL"><input type="url" value={form.facebookUrl ?? ""} onChange={(e) => set("facebookUrl", e.target.value || null)} className="form-input" /></F>
            <F label="LinkedIn URL"><input type="url" value={form.linkedinUrl ?? ""} onChange={(e) => set("linkedinUrl", e.target.value || null)} className="form-input" /></F>
            <F label="Instagram URL"><input type="url" value={form.instagramUrl ?? ""} onChange={(e) => set("instagramUrl", e.target.value || null)} className="form-input" /></F>
            <F label="TikTok URL"><input type="url" value={form.tiktokUrl ?? ""} onChange={(e) => set("tiktokUrl", e.target.value || null)} className="form-input" /></F>
          </>
        )}

        {tab === "founder" && (
          <>
            <F label="Founder Name"><input type="text" value={form.founderName} onChange={(e) => set("founderName", e.target.value)} className="form-input" /></F>
            <F label="Founder Title"><input type="text" value={form.founderTitle} onChange={(e) => set("founderTitle", e.target.value)} className="form-input" /></F>
            <F label="Founder Photo URL"><input type="url" value={form.founderPhotoUrl ?? ""} onChange={(e) => set("founderPhotoUrl", e.target.value || null)} className="form-input" /></F>
            <F label="Founder Short Bio">
              <textarea value={form.founderShortBio} onChange={(e) => set("founderShortBio", e.target.value)} className="form-input min-h-[140px]" />
            </F>
          </>
        )}

        {tab === "audit" && (
          <>
            <F label="Audit Price"><input type="text" value={form.auditPrice} onChange={(e) => set("auditPrice", e.target.value)} className="form-input" /></F>
            <F label="Price Prefix" hint="E.g. 'Starts at'"><input type="text" value={form.auditPricePrefix} onChange={(e) => set("auditPricePrefix", e.target.value)} className="form-input" /></F>
            <F label="Credit Window (days)"><input type="number" value={form.auditCreditWindow} onChange={(e) => set("auditCreditWindow", parseInt(e.target.value || "0"))} className="form-input" /></F>
            <F label="Intake Capacity (per month)"><input type="number" value={form.auditIntakeCapacity} onChange={(e) => set("auditIntakeCapacity", parseInt(e.target.value || "0"))} className="form-input" /></F>
          </>
        )}

        {tab === "seo" && (
          <>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              Site-wide SEO defaults. Used when individual pages/posts don&apos;t specify their own values.
            </p>
            <F label="Default OG image" hint="1200×630px. Used when individual pages don't set their own. Paste URL or upload via Media Library.">
              <input type="url" value={form.defaultOgImage ?? ""} onChange={(e) => set("defaultOgImage", e.target.value || null)} className="form-input" placeholder="https://digitalvikingz.com/og-default.png" />
            </F>
            <F label="Twitter handle" hint="Your @username on X/Twitter. Used in Twitter Card metadata.">
              <input type="text" value={form.twitterHandle ?? ""} onChange={(e) => set("twitterHandle", e.target.value || null)} className="form-input" placeholder="@digitalvikingz" />
            </F>
            <F label="Google Search Console verification" hint="Verification meta tag content. Find this in GSC → Settings → Ownership verification → HTML tag.">
              <input type="text" value={form.googleSearchConsoleVerification ?? ""} onChange={(e) => set("googleSearchConsoleVerification", e.target.value || null)} className="form-input font-mono text-sm" placeholder="abc123..." />
            </F>
            <F label="Bing Webmaster verification" hint="Verification meta tag content from Bing Webmaster Tools.">
              <input type="text" value={form.bingVerification ?? ""} onChange={(e) => set("bingVerification", e.target.value || null)} className="form-input font-mono text-sm" />
            </F>
            <F label="Favicon URL" hint="32×32 PNG or ICO. Defaults to /favicon.ico if blank.">
              <input type="url" value={form.faviconUrl ?? ""} onChange={(e) => set("faviconUrl", e.target.value || null)} className="form-input" />
            </F>
          </>
        )}

        {tab === "analytics" && (
          <>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              Pick one analytics platform. Plausible is privacy-friendly. GA4 is industry standard.
            </p>
            <F label="Google Analytics 4 measurement ID" hint='Starts with "G-". Leave blank to disable GA4.'>
              <input type="text" value={form.googleAnalyticsId ?? ""} onChange={(e) => set("googleAnalyticsId", e.target.value || null)} className="form-input font-mono text-sm" placeholder="G-XXXXXXXXXX" />
            </F>
            <F label="Plausible domain" hint="Your verified domain in Plausible. Leave blank to disable.">
              <input type="text" value={form.plausibleDomain ?? ""} onChange={(e) => set("plausibleDomain", e.target.value || null)} className="form-input font-mono text-sm" placeholder="digitalvikingz.com" />
            </F>
          </>
        )}
      </div>

      <div className="pt-8 mt-8 border-t border-line">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save settings →"}
        </button>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--line-strong);
          font-family: var(--font-body);
          color: var(--text);
          background: var(--bg);
          border-radius: 2px;
          transition: border-color 0.2s;
        }
        .form-input:focus { outline: none; border-color: var(--accent); }
      `}</style>
    </form>
  )
}

function F({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mono-pill block mb-2">{label}</label>
      {hint && <p className="text-xs text-ink-muted mb-2">{hint}</p>}
      {children}
    </div>
  )
}
