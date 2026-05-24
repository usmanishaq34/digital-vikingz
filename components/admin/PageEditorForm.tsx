"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Page } from "@prisma/client"
import FormField from "./FormField"
import SeoFieldsPanel, { type SeoFields } from "./SeoFieldsPanel"
import SeoScorePanel from "./SeoScorePanel"
import ImagePicker from "./ImagePicker"

export default function PageEditorForm({
  page,
  isNew = false,
}: {
  page: Page
  isNew?: boolean
}) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: page.slug,
    title: page.title,
    heroLabel: page.heroLabel ?? "",
    heroHeading: page.heroHeading,
    heroSub: page.heroSub,
    body: page.body ?? "",
    featuredImage: page.featuredImage ?? "",
    featuredImageAlt: page.featuredImageAlt ?? "",
    featuredImageTitle: page.featuredImageTitle ?? "",
    seoTitle: page.seoTitle ?? "",
    seoDescription: page.seoDescription ?? "",
    focusKeyword: page.focusKeyword ?? "",
    canonicalUrl: page.canonicalUrl ?? "",
    noindex: page.noindex,
    nofollow: page.nofollow,
    ogTitle: page.ogTitle ?? "",
    ogDescription: page.ogDescription ?? "",
    ogImage: page.ogImage ?? "",
    twitterTitle: page.twitterTitle ?? "",
    twitterDescription: page.twitterDescription ?? "",
    twitterImage: page.twitterImage ?? "",
    schemaType: page.schemaType ?? "WebPage",
    published: page.published,
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm({ ...form, [key]: value })
  }

  function updateSeo(seo: SeoFields) {
    setForm({ ...form, ...seo })
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const endpoint = isNew ? "/api/pages" : `/api/pages/${page.id}`
      const method = isNew ? "POST" : "PATCH"
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Save failed")
      const saved = await res.json()
      toast.success(isNew ? "Page created." : "Saved. Live in ~60 seconds.")
      if (isNew) {
        router.push(`/vikingz-1000-admin/pages/${saved.id}`)
      } else {
        router.refresh()
      }
    } catch {
      toast.error("Save failed.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      <div className="space-y-7">
        {isNew && (
          <FormField label="URL slug" required hint="Determines the page URL. Lowercase, hyphenated. E.g. 'careers' → /careers">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
              className="form-input font-mono text-sm"
              required
              placeholder="careers"
            />
          </FormField>
        )}

        <FormField label="Page title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Hero label (pill)" hint="Small uppercase text above the headline.">
          <input
            type="text"
            value={form.heroLabel}
            onChange={(e) => set("heroLabel", e.target.value)}
            className="form-input"
            placeholder="Section · Subsection · Tag"
          />
        </FormField>

        <FormField label="Hero heading" required hint="Use <em>word</em> for orange italic accent.">
          <textarea
            value={form.heroHeading}
            onChange={(e) => set("heroHeading", e.target.value)}
            className="form-input min-h-[80px] font-display"
            required
          />
        </FormField>

        <FormField label="Hero subtext" required>
          <textarea
            value={form.heroSub}
            onChange={(e) => set("heroSub", e.target.value)}
            className="form-input min-h-[120px]"
            required
          />
        </FormField>

        {(page.slug === "privacy-policy" || form.body) && (
          <FormField
            label="Body content"
            hint="Long-form HTML body. Used on the Privacy Policy page and any custom page."
          >
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              className="form-input min-h-[400px] font-mono text-sm"
            />
          </FormField>
        )}

        {/* Featured image */}
        <div className="border border-line bg-bg-2">
          <div className="px-5 py-3 border-b border-line bg-bg">
            <h3 className="mono-label">Featured Image</h3>
          </div>
          <div className="p-5">
            <ImagePicker
              value={form.featuredImage}
              onChange={(url, meta) => {
                set("featuredImage", url)
                if (meta?.alt) set("featuredImageAlt", meta.alt)
                if (meta?.title) set("featuredImageTitle", meta.title)
              }}
              altValue={form.featuredImageAlt}
              onAltChange={(v) => set("featuredImageAlt", v)}
              titleValue={form.featuredImageTitle}
              onTitleChange={(v) => set("featuredImageTitle", v)}
              showInlineMeta={true}
            />
          </div>
        </div>

        {/* SEO Panel */}
        <SeoFieldsPanel
          values={{
            seoTitle: form.seoTitle,
            seoDescription: form.seoDescription,
            focusKeyword: form.focusKeyword,
            canonicalUrl: form.canonicalUrl,
            noindex: form.noindex,
            nofollow: form.nofollow,
            ogTitle: form.ogTitle,
            ogDescription: form.ogDescription,
            ogImage: form.ogImage,
            twitterTitle: form.twitterTitle,
            twitterDescription: form.twitterDescription,
            twitterImage: form.twitterImage,
            schemaType: form.schemaType,
          }}
          onChange={updateSeo}
          baseUrl={`https://digitalvikingz.com${page.slug === "home" ? "" : "/" + page.slug}`}
          showSecondaryKeywords={false}
        />

        {/* Save bar */}
        <div className="sticky bottom-4 z-10 bg-bg border border-line p-4 flex items-center justify-between shadow-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="mono-pill text-ink">{form.published ? "● Published" : "○ Draft"}</span>
          </label>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving..." : "Save page →"}
          </button>
        </div>
      </div>

      <aside className="space-y-6">
        <SeoScorePanel
          input={{
            title: form.title,
            seoTitle: form.seoTitle,
            seoDescription: form.seoDescription,
            content: form.heroSub + " " + form.body,
            slug: page.slug,
            focusKeyword: form.focusKeyword,
            featuredImage: form.featuredImage,
            featuredImageAlt: form.featuredImageAlt,
          }}
        />
      </aside>

      <style>{`
        .form-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid var(--line-strong);
          font-family: var(--font-body);
          color: var(--text);
          background: var(--bg);
          border-radius: 2px;
          transition: border-color 0.2s;
          font-size: 14px;
        }
        .form-input:focus { outline: none; border-color: var(--accent); }
      `}</style>
    </form>
  )
}
