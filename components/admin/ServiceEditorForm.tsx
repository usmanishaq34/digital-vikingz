"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Service } from "@prisma/client"
import { slugify } from "@/lib/slugify"
import FormField from "./FormField"
import SeoFieldsPanel, { type SeoFields } from "./SeoFieldsPanel"
import SeoScorePanel from "./SeoScorePanel"
import ImagePicker from "./ImagePicker"
import { RepeatableTextList, RepeatableObjectList } from "./RepeatableList"
import ScheduleControl, { type PublishStatus } from "./ScheduleControl"
import RichTextEditor from "./RichTextEditor"
import { premiumToast } from "./premiumToast"

interface ServiceCategory {
  id: string
  name: string
}

interface Props {
  service: Service
  categories?: ServiceCategory[]
  isNew?: boolean
}

export default function ServiceEditorForm({ service, categories = [], isNew = false }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<"content" | "structure" | "fit">("content")

  // Track if user has manually edited the slug. If not, slug auto-syncs with title.
  // This is the key fix: pichla logic break ho jata tha jab user kuch bhi karta tha.
  const slugManuallyEditedRef = useRef<boolean>(!isNew && service.slug !== slugify(service.title))

  const [form, setForm] = useState({
    slug: service.slug,
    title: service.title,
    tier: service.tier,
    shortDescription: service.shortDescription,
    heroLabel: service.heroLabel,
    heroHeading: service.heroHeading,
    heroSub: service.heroSub,
    pricing: service.pricing,
    minEngagement: service.minEngagement ?? "",
    fullDescription: service.fullDescription,
    deliverables: Array.isArray(service.deliverables) ? (service.deliverables as string[]) : [],
    process: Array.isArray(service.process) ? (service.process as Array<{ title: string; description: string }>) : [],
    faqs: Array.isArray(service.faqs) ? (service.faqs as Array<{ question: string; answer: string }>) : [],
    fitsYou: Array.isArray(service.fitsYou) ? (service.fitsYou as string[]) : [],
    notFitsYou: Array.isArray(service.notFitsYou) ? (service.notFitsYou as string[]) : [],
    featuredImage: service.featuredImage ?? "",
    featuredImageAlt: service.featuredImageAlt ?? "",
    featuredImageTitle: service.featuredImageTitle ?? "",
    seoTitle: service.seoTitle ?? "",
    seoDescription: service.seoDescription ?? "",
    focusKeyword: service.focusKeyword ?? "",
    canonicalUrl: service.canonicalUrl ?? "",
    noindex: service.noindex,
    nofollow: service.nofollow,
    ogTitle: service.ogTitle ?? "",
    ogDescription: service.ogDescription ?? "",
    ogImage: service.ogImage ?? "",
    twitterTitle: service.twitterTitle ?? "",
    twitterDescription: service.twitterDescription ?? "",
    twitterImage: service.twitterImage ?? "",
    schemaType: service.schemaType ?? "Service",
    categoryId: (service as any).categoryId ?? null as string | null,
    published: service.published,
    status: ((service as any).status ?? (service.published ? "published" : "draft")) as PublishStatus,
    scheduledFor: ((service as any).scheduledFor as Date | null)
      ? new Date((service as any).scheduledFor).toISOString()
      : (null as string | null),
    sortOrder: service.sortOrder,
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleTitleChange(newTitle: string) {
    setForm((prev) => ({
      ...prev,
      title: newTitle,
      // Auto-sync slug with title unless user has manually edited it
      slug: slugManuallyEditedRef.current ? prev.slug : slugify(newTitle),
    }))
  }

  function handleSlugChange(newSlug: string) {
    slugManuallyEditedRef.current = true
    // Always sanitize whatever the user types (no spaces, no special chars)
    set("slug", slugify(newSlug))
  }

  const seoValues: SeoFields = {
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
  }

  function updateSeoFields(seo: SeoFields) {
    setForm((prev) => ({ ...prev, ...seo }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (form.status === "scheduled" && !form.scheduledFor) {
      toast.error("Pick a date/time for scheduled publish.")
      return
    }
    setSaving(true)
    try {
      const isPublished = form.status === "published"
      const payload = {
        ...form,
        published: isPublished,
        scheduledFor: form.status === "scheduled" ? form.scheduledFor : null,
      }
      const endpoint = isNew ? "/api/services" : `/api/services/${service.id}`
      const method = isNew ? "POST" : "PATCH"
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        let errMsg = "Save failed."
        if (errBody?.error) {
          if (typeof errBody.error === "string") {
            errMsg = errBody.error
          } else if (errBody.error?.fieldErrors) {
            const fields = Object.keys(errBody.error.fieldErrors)
            errMsg = `Invalid fields: ${fields.join(", ")}`
          }
        }
        if (res.status === 500) {
          errMsg =
            "Database error. Run the latest SQL migration in Supabase (adds status, scheduledFor, categoryId columns)."
        }
        throw new Error(errMsg)
      }
      const saved = await res.json()

      const action: "published" | "scheduled" | "saved" | "created" =
        form.status === "published"
          ? "published"
          : form.status === "scheduled"
          ? "scheduled"
          : isNew
          ? "created"
          : "saved"

      premiumToast({
        kind: "service",
        action,
        title: form.title,
        scheduledFor: form.status === "scheduled" ? form.scheduledFor : null,
        viewUrl:
          action === "published"
            ? `${typeof window !== "undefined" ? window.location.origin : ""}/services/${form.slug}`
            : undefined,
      })

      if (isNew) {
        router.push(`/vikingz-1000-admin/services/${saved.id}`)
      } else {
        router.refresh()
      }
    } catch (err: any) {
      toast.error(typeof err?.message === "string" ? err.message : "Save failed. Try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 pb-32">
      <div className="space-y-6">
        <div className="border-b border-line">
          <nav className="flex gap-1 -mb-px">
            {[
              { id: "content", label: "Content" },
              { id: "structure", label: "Process & deliverables" },
              { id: "fit", label: "Fit / FAQ" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id as any)}
                className={`px-5 py-3 mono-pill border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-accent text-accent"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {tab === "content" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Title" required hint="The service name as shown on the live page.">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="form-input"
                  required
                />
              </FormField>

              <FormField label="URL slug" required hint="Auto-generated from title. Edit if needed.">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="form-input font-mono text-sm"
                  required
                />
                <p className="text-[11px] text-ink-muted mt-1">
                  Live URL: /services/{form.slug || "..."}
                </p>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Tier" required>
                <select
                  value={form.tier}
                  onChange={(e) => set("tier", e.target.value as any)}
                  className="form-input"
                >
                  <option value="CLAIM">Claim</option>
                  <option value="SHIELD">Shield</option>
                  <option value="SCALE">Scale</option>
                </select>
              </FormField>
              <FormField label="Pricing display">
                <input
                  type="text"
                  value={form.pricing}
                  onChange={(e) => set("pricing", e.target.value)}
                  className="form-input"
                />
              </FormField>
              <FormField label="Min engagement">
                <input
                  type="text"
                  value={form.minEngagement}
                  onChange={(e) => set("minEngagement", e.target.value)}
                  className="form-input"
                  placeholder="6 months"
                />
              </FormField>
            </div>

            <div>
              <FormField label="Category">
                <select
                  value={form.categoryId ?? ""}
                  onChange={(e) => set("categoryId", e.target.value || null)}
                  className="form-input"
                >
                  <option value="">— Uncategorized —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField label="Short description" required hint="Used in service cards on homepage. 1-2 sentences.">
              <textarea
                value={form.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                className="form-input min-h-[80px]"
                required
              />
            </FormField>

            <FormField label="Hero label (pill)" required hint="Small uppercase text above headline.">
              <input
                type="text"
                value={form.heroLabel}
                onChange={(e) => set("heroLabel", e.target.value)}
                className="form-input"
                required
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

            <FormField label="Full description" required hint="Long-form description shown below the hero. Use the toolbar for formatting.">
              <RichTextEditor
                value={form.fullDescription}
                onChange={(html) => set("fullDescription", html)}
                placeholder="Write the full service description..."
              />
            </FormField>

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
                />
              </div>
            </div>
          </div>
        )}

        {tab === "structure" && (
          <div className="space-y-6">
            <FormField label="Deliverables" hint="List of concrete deliverables for this engagement.">
              <RepeatableTextList
                label=""
                items={form.deliverables ?? []}
                onChange={(v) => set("deliverables", v)}
                placeholder="A deliverable…"
              />
            </FormField>
            <FormField label="Engagement process" hint="Step-by-step process for the engagement.">
              <RepeatableObjectList
                label=""
                items={(form.process ?? []) as any}
                onChange={(v) => set("process", v as any)}
                field1Key="title"
                field1Label="Step title"
                field2Key="description"
                field2Label="Description"
                field2Long={true}
              />
            </FormField>
          </div>
        )}

        {tab === "fit" && (
          <div className="space-y-6">
            <FormField label="Fits you if…" hint="When this service is a good match.">
              <RepeatableTextList
                label=""
                items={form.fitsYou ?? []}
                onChange={(v) => set("fitsYou", v)}
                placeholder="A signal it fits…"
              />
            </FormField>
            <FormField label="Doesn't fit if…" hint="When this service is NOT a good match.">
              <RepeatableTextList
                label=""
                items={form.notFitsYou ?? []}
                onChange={(v) => set("notFitsYou", v)}
                placeholder="A signal it doesn't fit…"
              />
            </FormField>
            <FormField label="FAQs" hint="Common questions and concise answers.">
              <RepeatableObjectList
                label=""
                items={(form.faqs ?? []) as any}
                onChange={(v) => set("faqs", v as any)}
                field1Key="question"
                field1Label="Question"
                field2Key="answer"
                field2Label="Answer"
                field2Long={true}
              />
            </FormField>
          </div>
        )}

        {/* SEO & Social — always visible at the bottom, same as post editor */}
        <SeoFieldsPanel
          values={seoValues}
          onChange={updateSeoFields}
          baseUrl={`https://digitalvikingz.com/services/${form.slug}`}
        />

        <div className="mt-8">
          <ScheduleControl
            status={form.status}
            scheduledFor={form.scheduledFor}
            onStatusChange={(s) => set("status", s)}
            onScheduledForChange={(iso) => set("scheduledFor", iso)}
          />
        </div>

        <div className="sticky bottom-4 z-10 bg-bg border border-line p-4 mt-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="mono-pill text-ink-muted">
              {form.status === "draft" && "Not on site"}
              {form.status === "scheduled" && form.scheduledFor &&
                `Goes live ${new Date(form.scheduledFor).toLocaleString()}`}
              {form.status === "published" && "Live on site"}
            </span>

            <span className="text-ink-muted">|</span>

            <label className="flex items-center gap-2">
              <span className="mono-pill text-ink-muted">Sort:</span>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => set("sortOrder", parseInt(e.target.value || "0"))}
                className="w-16 px-2 py-1 border border-line-strong text-sm"
                style={{ borderRadius: 2 }}
              />
            </label>
          </div>

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving
              ? "Saving..."
              : form.status === "scheduled"
              ? "Schedule service →"
              : form.status === "published"
              ? (isNew ? "Publish service →" : "Update service →")
              : "Save draft →"}
          </button>
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-4 lg:self-start">
        <SeoScorePanel
          input={{
            title: form.title,
            slug: form.slug,
            baseUrl: `https://digitalvikingz.com/services/${form.slug}`,
            seoTitle: form.seoTitle,
            seoDescription: form.seoDescription,
            focusKeyword: form.focusKeyword,
            content: form.fullDescription,
            excerpt: form.shortDescription,
          }}
        />
      </aside>
    </form>
  )
}