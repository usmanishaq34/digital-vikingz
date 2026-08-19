"use client"

import { useRef, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Service } from "@prisma/client"
import { slugify } from "@/lib/slugify"
import FormField from "./FormField"
import SeoFieldsPanel, { type SeoFields } from "./SeoFieldsPanel"
import SeoScorePanel from "./SeoScorePanel"
import ImagePicker from "./ImagePicker"
import ScheduleControl, { type PublishStatus } from "./ScheduleControl"
import { premiumToast } from "./premiumToast"

interface ServiceTemplateMetaItem {
  label: string
  value: string
}

interface ServiceTemplateDeliverable {
  numberLabel: string
  icon: string
  titleHtml: string
  bodyHtml: string
}

interface ServiceTemplateConsoleComponent {
  numberLabel: string
  nameHtml: string
  buildingTextHtml: string
  outcomeTextHtml: string
  buildingStatus: string
  outcomeStatus: string
}

interface ServiceTemplateTimelineItem {
  phase: string
  title: string
  detail: string
}

interface ServiceTemplateFaqItem {
  question: string
  answerHtml: string
}

interface ServiceTemplateRelatedItem {
  tierLabel: string
  nameHtml: string
  description: string
  href: string
  arrowLabel: string
}

interface StaticServiceTemplateData {
  version: 1
  hero: {
    tierLabel: string
    headingHtml: string
    subtextHtml: string
    meta: ServiceTemplateMetaItem[]
    primaryCtaLabel: string
    primaryCtaUrl: string
    secondaryCtaLabel: string
    secondaryCtaUrl: string
  }
  deliverables: {
    label: string
    headingHtml: string
    introHtml: string
    items: ServiceTemplateDeliverable[]
  }
  console: {
    label: string
    headingHtml: string
    introHtml: string
    buildingPill: string
    outcomePill: string
    buildingTitleHtml: string
    outcomeTitleHtml: string
    toggleToOutcomeLabel: string
    toggleToBuildingLabel: string
    items: ServiceTemplateConsoleComponent[]
    outcomeBannerLabel: string
    outcomeBannerTextHtml: string
    buildingFootHtml: string
    outcomeFootHtml: string
  }
  fit: {
    label: string
    headingHtml: string
    introHtml: string
    yesTag: string
    yesHeadingHtml: string
    yesItems: string[]
    noTag: string
    noHeadingHtml: string
    noItems: string[]
  }
  timeline: {
    label: string
    headingHtml: string
    introHtml: string
    phaseColumnLabel: string
    activityColumnLabel: string
    items: ServiceTemplateTimelineItem[]
  }
  pricing: {
    label: string
    headingHtml: string
    introHtml: string
    badge: string
    cardTitleHtml: string
    amountPrefix: string
    amountValue: string
    descriptionHtml: string
    ctaLabel: string
    ctaUrl: string
    includedLabel: string
    includedItems: string[]
  }
  faq: {
    label: string
    headingHtml: string
    introHtml: string
    items: ServiceTemplateFaqItem[]
  }
  related: {
    label: string
    headingHtml: string
    introHtml: string
    items: ServiceTemplateRelatedItem[]
  }
  cta: {
    label: string
    headingHtml: string
    subtextHtml: string
    primaryLabel: string
    primaryUrl: string
    secondaryLabel: string
    secondaryUrl: string
    noteHtml: string
  }
}

const DEFAULT_CAL_URL = "https://calendly.com/usmanishaqsemanticseospecialist/30min"

function stripHtml(value: string): string {
  return (value || "")
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function makeDefaultServiceTemplate(input?: {
  title?: string
  tier?: string
  pricing?: string
  minEngagement?: string | null
  heroHeading?: string
  heroSub?: string
}): StaticServiceTemplateData {
  const title = input?.title || "New Service"
  const tier = input?.tier
    ? input.tier.charAt(0).toUpperCase() + input.tier.slice(1).toLowerCase()
    : "Claim"
  const pricing = input?.pricing || "Custom"
  const minEngagement = input?.minEngagement || "Scoped per engagement"

  return {
    version: 1,
    hero: {
      tierLabel: `${tier} Tier · Service`,
      headingHtml: input?.heroHeading || `${title}. <em>Built with methodology.</em>`,
      subtextHtml: input?.heroSub || "Describe the service outcome, who it is for, and why this engagement exists.",
      meta: [
        { label: "Tier", value: tier },
        { label: "Pricing", value: pricing },
        { label: "Min engagement", value: minEngagement },
        { label: "Methodology", value: "Koray-aligned" },
      ],
      primaryCtaLabel: "Book Strategy Call",
      primaryCtaUrl: DEFAULT_CAL_URL,
      secondaryCtaLabel: "See What's Inside",
      secondaryCtaUrl: "#inside",
    },
    deliverables: {
      label: "01 / The Deliverable",
      headingHtml: "What's actually <em>inside the engagement.</em>",
      introHtml: "Explain what ships in this engagement and what the buyer receives at handoff.",
      items: [
        {
          numberLabel: "Deliverable 01",
          icon: "A",
          titleHtml: "First <em>Deliverable</em>",
          bodyHtml: "Describe the artifact, why it matters, and what the client receives.",
        },
      ],
    },
    console: {
      label: "02 / The Console",
      headingHtml: "Engagement, <em>in two states.</em>",
      introHtml: "Show how the engagement looks while work is in progress and how those same components look at completion.",
      buildingPill: "Live · Building",
      outcomePill: "Live · Outcome",
      buildingTitleHtml: "Engagement: <strong>work in flight</strong>",
      outcomeTitleHtml: "Engagement: <strong>complete · signed off</strong>",
      toggleToOutcomeLabel: "See completion",
      toggleToBuildingLabel: "Back to building",
      items: [
        {
          numberLabel: "Component 01",
          nameHtml: "Core <em>Component</em>",
          buildingTextHtml: "Building: <strong>describe the active work</strong>",
          outcomeTextHtml: "Complete: <strong>describe the final outcome</strong>",
          buildingStatus: "▸ Building",
          outcomeStatus: "✓ Complete",
        },
      ],
      outcomeBannerLabel: "Engagement complete · representative outcome",
      outcomeBannerTextHtml: "Summarize the completed engagement and what is ready for handoff or execution.",
      buildingFootHtml: "Live engagement · <strong>work in progress</strong>",
      outcomeFootHtml: "Engagement closed · <strong>handoff complete</strong>",
    },
    fit: {
      label: "03 / The Fit",
      headingHtml: "Who this <em>fits.</em>",
      introHtml: "Set expectations clearly. Explain the situations where this service produces the best outcome and where another engagement is a better fit.",
      yesTag: "Where it fits",
      yesHeadingHtml: "This engagement <em>works</em> if you...",
      yesItems: ["Add a good-fit signal"],
      noTag: "Where it doesn't",
      noHeadingHtml: "This isn't right if you...",
      noItems: ["Add a not-fit signal"],
    },
    timeline: {
      label: "04 / The Timeline",
      headingHtml: "The engagement, <em>stage by stage.</em>",
      introHtml: "Explain the sequence of the engagement from kickoff through handoff.",
      phaseColumnLabel: "Phase",
      activityColumnLabel: "Activity",
      items: [
        { phase: "Phase 01", title: "Discovery & Foundation", detail: "Describe what happens in this phase and the output that gets locked." },
      ],
    },
    pricing: {
      label: "05 / The Investment",
      headingHtml: "Custom · scoped per <em>engagement.</em>",
      introHtml: "Explain what drives scope and how pricing is confirmed.",
      badge: "Scoped Engagement",
      cardTitleHtml: `${title}`,
      amountPrefix: "Pricing",
      amountValue: pricing,
      descriptionHtml: "Describe the commercial model, scope factors, and what happens after the strategy call.",
      ctaLabel: "Book Strategy Call",
      ctaUrl: DEFAULT_CAL_URL,
      includedLabel: "What's Included",
      includedItems: ["Add an included item"],
    },
    faq: {
      label: "06 / Questions",
      headingHtml: "What buyers ask <em>before committing.</em>",
      introHtml: "Answer the questions that normally come up during scoping calls.",
      items: [
        { question: "Add a common question", answerHtml: "<p>Add a concise, useful answer.</p>" },
      ],
    },
    related: {
      label: "07 / Adjacent Services",
      headingHtml: "What pairs with <em>this service.</em>",
      introHtml: "Point buyers to the most relevant services that come before, after, or alongside this engagement.",
      items: [],
    },
    cta: {
      label: "08 / The Next Step",
      headingHtml: `Ready to build <em>${title.toLowerCase()}.</em>`,
      subtextHtml: "Book a strategy call to confirm fit, scope, and the right starting point.",
      primaryLabel: "Book Strategy Call",
      primaryUrl: DEFAULT_CAL_URL,
      secondaryLabel: "See The Audit",
      secondaryUrl: "/the-audit",
      noteHtml: "No ranking promises. <span>Methodology, execution, and measurable work.</span>",
    },
  }
}

function isObject(value: unknown): value is Record<string, any> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

/**
 * Returns a complete V1 static-service template. Existing dashboard services
 * without templateData are automatically adapted from the legacy CMS fields,
 * so the migration does not break existing pages.
 */
function normalizeServiceTemplate(service: any): StaticServiceTemplateData {
  const fallback = makeDefaultServiceTemplate({
    title: service?.title,
    tier: service?.tier,
    pricing: service?.pricing,
    minEngagement: service?.minEngagement,
    heroHeading: service?.heroHeading,
    heroSub: service?.heroSub,
  })

  const saved = service?.templateData
  if (isObject(saved) && saved.version === 1) {
    return {
      ...fallback,
      ...saved,
      hero: { ...fallback.hero, ...(saved.hero || {}) },
      deliverables: { ...fallback.deliverables, ...(saved.deliverables || {}) },
      console: { ...fallback.console, ...(saved.console || {}) },
      fit: { ...fallback.fit, ...(saved.fit || {}) },
      timeline: { ...fallback.timeline, ...(saved.timeline || {}) },
      pricing: { ...fallback.pricing, ...(saved.pricing || {}) },
      faq: { ...fallback.faq, ...(saved.faq || {}) },
      related: { ...fallback.related, ...(saved.related || {}) },
      cta: { ...fallback.cta, ...(saved.cta || {}) },
    } as StaticServiceTemplateData
  }

  const legacyDeliverables = Array.isArray(service?.deliverables) ? service.deliverables : []
  const legacyProcess = Array.isArray(service?.process) ? service.process : []
  const legacyFaqs = Array.isArray(service?.faqs) ? service.faqs : []
  const fits = Array.isArray(service?.fitsYou) ? service.fitsYou : []
  const notFits = Array.isArray(service?.notFitsYou) ? service.notFitsYou : []

  fallback.deliverables.introHtml = service?.fullDescription || fallback.deliverables.introHtml
  fallback.deliverables.items = legacyDeliverables.length
    ? legacyDeliverables.map((item: any, index: number) => {
        const text = typeof item === "string" ? item : item?.text || item?.title || ""
        return {
          numberLabel: `Deliverable ${String(index + 1).padStart(2, "0")}`,
          icon: (stripHtml(text).charAt(0) || String(index + 1)).toUpperCase(),
          titleHtml: typeof item === "object" && item?.title ? item.title : text,
          bodyHtml: typeof item === "object" && item?.description ? item.description : text,
        }
      })
    : fallback.deliverables.items

  fallback.console.items = fallback.deliverables.items.slice(0, 6).map((item, index) => ({
    numberLabel: `Component ${String(index + 1).padStart(2, "0")}`,
    nameHtml: item.titleHtml,
    buildingTextHtml: `Building: <strong>${stripHtml(item.bodyHtml)}</strong>`,
    outcomeTextHtml: `Complete: <strong>${stripHtml(item.bodyHtml)}</strong>`,
    buildingStatus: "▸ Building",
    outcomeStatus: "✓ Complete",
  }))

  fallback.fit.yesItems = fits.length ? fits.map(String) : fallback.fit.yesItems
  fallback.fit.noItems = notFits.length ? notFits.map(String) : fallback.fit.noItems
  fallback.timeline.items = legacyProcess.length
    ? legacyProcess.map((step: any, index: number) => ({
        phase: `Phase ${String(index + 1).padStart(2, "0")}`,
        title: step?.title || `Phase ${index + 1}`,
        detail: step?.description || "",
      }))
    : fallback.timeline.items
  fallback.pricing.includedItems = legacyDeliverables.length
    ? legacyDeliverables.map((item: any) => (typeof item === "string" ? item : item?.text || item?.title || "")).filter(Boolean)
    : fallback.pricing.includedItems
  fallback.faq.items = legacyFaqs.length
    ? legacyFaqs.map((faq: any) => ({ question: faq?.question || "", answerHtml: `<p>${faq?.answer || ""}</p>` }))
    : fallback.faq.items

  return fallback
}

interface TemplateEditorProps {
  value: StaticServiceTemplateData
  onChange: (value: StaticServiceTemplateData) => void
}

type SectionKey = keyof Omit<StaticServiceTemplateData, "version">

const inputClass = "form-input"
const textareaClass = "form-input min-h-[88px]"

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="mono-pill text-ink">{label}</span>
      {hint && <span className="block text-[11px] text-ink-muted leading-relaxed">{hint}</span>}
      {children}
    </label>
  )
}

function SectionCard({ title, subtitle, children, open = false }: { title: string; subtitle: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="border border-line bg-bg" open={open}>
      <summary className="cursor-pointer list-none px-5 py-4 bg-bg-2 border-b border-line flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-medium text-ink">{title}</h3>
          <p className="text-xs text-ink-muted mt-1">{subtitle}</p>
        </div>
        <span className="mono-pill text-accent">Edit section ↓</span>
      </summary>
      <div className="p-5 md:p-6 space-y-5">{children}</div>
    </details>
  )
}

function ItemShell({ title, index, count, onRemove, onMove, children }: { title: string; index: number; count: number; onRemove: () => void; onMove: (direction: -1 | 1) => void; children: ReactNode }) {
  return (
    <div className="border border-line bg-bg-2 p-4 md:p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-pill text-ink">{title}</span>
        <div className="flex items-center gap-1">
          <button type="button" disabled={index === 0} onClick={() => onMove(-1)} className="px-2 py-1 border border-line text-xs disabled:opacity-30">↑</button>
          <button type="button" disabled={index === count - 1} onClick={() => onMove(1)} className="px-2 py-1 border border-line text-xs disabled:opacity-30">↓</button>
          <button type="button" onClick={onRemove} className="px-2 py-1 border border-line text-xs text-accent">Remove</button>
        </div>
      </div>
      {children}
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="w-full border border-dashed border-line-strong px-4 py-3 mono-pill text-accent hover:border-accent">+ {label}</button>
}

function ServiceTemplateEditor({ value, onChange }: TemplateEditorProps) {
  const setSection = <K extends SectionKey>(section: K, patch: Partial<StaticServiceTemplateData[K]>) => {
    onChange({ ...value, [section]: { ...value[section], ...patch } })
  }

  const move = <T,>(items: T[], index: number, direction: -1 | 1): T[] => {
    const target = index + direction
    if (target < 0 || target >= items.length) return items
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    return next
  }

  const htmlHint = 'Supports inline HTML: use <em>text</em> for the orange italic accent and <strong>text</strong> for emphasized orange text.'

  return (
    <div className="space-y-5">
      <div className="border border-accent/30 bg-accent/5 p-4 text-sm text-ink-2 leading-relaxed">
        This editor mirrors the live static service layout. Section labels, headings, icons, lists, console states, pricing, FAQs, related cards and CTA copy all render through the same static CSS classes used by the existing service pages.
      </div>

      <SectionCard title="Hero" subtitle="Static service hero, breadcrumb context, 4-cell meta strip and CTAs." open>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Tier pill"><input className={inputClass} value={value.hero.tierLabel} onChange={(e) => setSection("hero", { tierLabel: e.target.value })} /></Field>
          <Field label="Primary CTA label"><input className={inputClass} value={value.hero.primaryCtaLabel} onChange={(e) => setSection("hero", { primaryCtaLabel: e.target.value })} /></Field>
        </div>
        <Field label="Hero heading" hint={htmlHint}><textarea className={textareaClass} value={value.hero.headingHtml} onChange={(e) => setSection("hero", { headingHtml: e.target.value })} /></Field>
        <Field label="Hero description" hint={htmlHint}><textarea className="form-input min-h-[120px]" value={value.hero.subtextHtml} onChange={(e) => setSection("hero", { subtextHtml: e.target.value })} /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Primary CTA URL"><input className={inputClass} value={value.hero.primaryCtaUrl} onChange={(e) => setSection("hero", { primaryCtaUrl: e.target.value })} /></Field>
          <Field label="Secondary CTA label"><input className={inputClass} value={value.hero.secondaryCtaLabel} onChange={(e) => setSection("hero", { secondaryCtaLabel: e.target.value })} /></Field>
          <Field label="Secondary CTA URL"><input className={inputClass} value={value.hero.secondaryCtaUrl || "#inside"} onChange={(e) => setSection("hero", { secondaryCtaUrl: e.target.value })} /></Field>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3"><span className="mono-pill text-ink">Hero meta strip</span><span className="text-[11px] text-ink-muted">Static design shows up to 4 cells.</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(value.hero.meta || []).map((item, index) => (
              <div key={index} className="border border-line p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input className={inputClass} placeholder="Label" value={item.label} onChange={(e) => { const next=[...value.hero.meta]; next[index]={...item,label:e.target.value}; setSection("hero",{meta:next}) }} />
                <input className={inputClass} placeholder="Value" value={item.value} onChange={(e) => { const next=[...value.hero.meta]; next[index]={...item,value:e.target.value}; setSection("hero",{meta:next}) }} />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="01 · Deliverables" subtitle="The static two-column card grid with number, letter/icon, heading and body text.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.deliverables.label} onChange={(e) => setSection("deliverables", { label: e.target.value })} /></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.deliverables.headingHtml} onChange={(e) => setSection("deliverables", { headingHtml: e.target.value })} /></Field>
        </div>
        <Field label="Section intro" hint={htmlHint}><textarea className={textareaClass} value={value.deliverables.introHtml} onChange={(e) => setSection("deliverables", { introHtml: e.target.value })} /></Field>
        <div className="space-y-3">
          {value.deliverables.items.map((item, index) => (
            <ItemShell key={index} title={`Deliverable ${index + 1}`} index={index} count={value.deliverables.items.length} onMove={(d) => setSection("deliverables", { items: move(value.deliverables.items, index, d) })} onRemove={() => setSection("deliverables", { items: value.deliverables.items.filter((_, i) => i !== index) })}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-3">
                <Field label="Number label"><input className={inputClass} value={item.numberLabel} onChange={(e) => { const next=[...value.deliverables.items]; next[index]={...item,numberLabel:e.target.value}; setSection("deliverables",{items:next}) }} /></Field>
                <Field label="Icon / letter"><input className={inputClass} maxLength={4} value={item.icon} onChange={(e) => { const next=[...value.deliverables.items]; next[index]={...item,icon:e.target.value}; setSection("deliverables",{items:next}) }} /></Field>
              </div>
              <Field label="Card heading" hint={htmlHint}><input className={inputClass} value={item.titleHtml} onChange={(e) => { const next=[...value.deliverables.items]; next[index]={...item,titleHtml:e.target.value}; setSection("deliverables",{items:next}) }} /></Field>
              <Field label="Card body" hint={htmlHint}><textarea className={textareaClass} value={item.bodyHtml} onChange={(e) => { const next=[...value.deliverables.items]; next[index]={...item,bodyHtml:e.target.value}; setSection("deliverables",{items:next}) }} /></Field>
            </ItemShell>
          ))}
          <AddButton label="Add deliverable card" onClick={() => setSection("deliverables", { items: [...value.deliverables.items, { numberLabel: `Deliverable ${String(value.deliverables.items.length + 1).padStart(2,"0")}`, icon: "A", titleHtml: "New <em>Deliverable</em>", bodyHtml: "Describe this deliverable." }] })} />
        </div>
      </SectionCard>

      <SectionCard title="02 · Engagement Console" subtitle="Interactive Building ↔ Outcome console from the static service design.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.console.label} onChange={(e) => setSection("console", { label: e.target.value })} /></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.console.headingHtml} onChange={(e) => setSection("console", { headingHtml: e.target.value })} /></Field>
        </div>
        <Field label="Section intro" hint={htmlHint}><textarea className={textareaClass} value={value.console.introHtml} onChange={(e) => setSection("console", { introHtml: e.target.value })} /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Building pill"><input className={inputClass} value={value.console.buildingPill} onChange={(e) => setSection("console", { buildingPill: e.target.value })} /></Field>
          <Field label="Outcome pill"><input className={inputClass} value={value.console.outcomePill} onChange={(e) => setSection("console", { outcomePill: e.target.value })} /></Field>
          <Field label="Building header" hint={htmlHint}><input className={inputClass} value={value.console.buildingTitleHtml} onChange={(e) => setSection("console", { buildingTitleHtml: e.target.value })} /></Field>
          <Field label="Outcome header" hint={htmlHint}><input className={inputClass} value={value.console.outcomeTitleHtml} onChange={(e) => setSection("console", { outcomeTitleHtml: e.target.value })} /></Field>
          <Field label="Toggle → outcome"><input className={inputClass} value={value.console.toggleToOutcomeLabel} onChange={(e) => setSection("console", { toggleToOutcomeLabel: e.target.value })} /></Field>
          <Field label="Toggle → building"><input className={inputClass} value={value.console.toggleToBuildingLabel} onChange={(e) => setSection("console", { toggleToBuildingLabel: e.target.value })} /></Field>
        </div>
        <div className="space-y-3">
          {value.console.items.map((item, index) => (
            <ItemShell key={index} title={`Console component ${index + 1}`} index={index} count={value.console.items.length} onMove={(d) => setSection("console", { items: move(value.console.items,index,d) })} onRemove={() => setSection("console", { items: value.console.items.filter((_,i)=>i!==index) })}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Number label"><input className={inputClass} value={item.numberLabel} onChange={(e)=>{const next=[...value.console.items];next[index]={...item,numberLabel:e.target.value};setSection("console",{items:next})}} /></Field>
                <Field label="Component name" hint={htmlHint}><input className={inputClass} value={item.nameHtml} onChange={(e)=>{const next=[...value.console.items];next[index]={...item,nameHtml:e.target.value};setSection("console",{items:next})}} /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Building state" hint={htmlHint}><textarea className={textareaClass} value={item.buildingTextHtml} onChange={(e)=>{const next=[...value.console.items];next[index]={...item,buildingTextHtml:e.target.value};setSection("console",{items:next})}} /></Field>
                <Field label="Outcome state" hint={htmlHint}><textarea className={textareaClass} value={item.outcomeTextHtml} onChange={(e)=>{const next=[...value.console.items];next[index]={...item,outcomeTextHtml:e.target.value};setSection("console",{items:next})}} /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Building status"><input className={inputClass} value={item.buildingStatus} onChange={(e)=>{const next=[...value.console.items];next[index]={...item,buildingStatus:e.target.value};setSection("console",{items:next})}} /></Field>
                <Field label="Outcome status"><input className={inputClass} value={item.outcomeStatus} onChange={(e)=>{const next=[...value.console.items];next[index]={...item,outcomeStatus:e.target.value};setSection("console",{items:next})}} /></Field>
              </div>
            </ItemShell>
          ))}
          <AddButton label="Add console component" onClick={()=>setSection("console",{items:[...value.console.items,{numberLabel:`Component ${String(value.console.items.length+1).padStart(2,"0")}`,nameHtml:"New <em>Component</em>",buildingTextHtml:"Building: <strong>work in progress</strong>",outcomeTextHtml:"Complete: <strong>final outcome</strong>",buildingStatus:"▸ Building",outcomeStatus:"✓ Complete"}]})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Outcome banner label"><input className={inputClass} value={value.console.outcomeBannerLabel} onChange={(e)=>setSection("console",{outcomeBannerLabel:e.target.value})} /></Field>
          <Field label="Outcome banner text" hint={htmlHint}><textarea className={textareaClass} value={value.console.outcomeBannerTextHtml} onChange={(e)=>setSection("console",{outcomeBannerTextHtml:e.target.value})} /></Field>
          <Field label="Building footer" hint={htmlHint}><input className={inputClass} value={value.console.buildingFootHtml} onChange={(e)=>setSection("console",{buildingFootHtml:e.target.value})} /></Field>
          <Field label="Outcome footer" hint={htmlHint}><input className={inputClass} value={value.console.outcomeFootHtml} onChange={(e)=>setSection("console",{outcomeFootHtml:e.target.value})} /></Field>
        </div>
      </SectionCard>

      <SectionCard title="03 · Fit" subtitle="Green good-fit column and red/neutral not-fit column from the static template.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.fit.label} onChange={(e)=>setSection("fit",{label:e.target.value})} /></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.fit.headingHtml} onChange={(e)=>setSection("fit",{headingHtml:e.target.value})} /></Field>
        </div>
        <Field label="Section intro"><textarea className={textareaClass} value={value.fit.introHtml} onChange={(e)=>setSection("fit",{introHtml:e.target.value})} /></Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="border border-line p-4 space-y-4">
            <Field label="Good-fit tag"><input className={inputClass} value={value.fit.yesTag} onChange={(e)=>setSection("fit",{yesTag:e.target.value})} /></Field>
            <Field label="Good-fit heading" hint={htmlHint}><input className={inputClass} value={value.fit.yesHeadingHtml} onChange={(e)=>setSection("fit",{yesHeadingHtml:e.target.value})} /></Field>
            {value.fit.yesItems.map((item,index)=><div key={index} className="flex gap-2"><input className={inputClass} value={item} onChange={(e)=>{const next=[...value.fit.yesItems];next[index]=e.target.value;setSection("fit",{yesItems:next})}}/><button type="button" className="px-3 border border-line text-accent" onClick={()=>setSection("fit",{yesItems:value.fit.yesItems.filter((_,i)=>i!==index)})}>×</button></div>)}
            <AddButton label="Add good-fit item" onClick={()=>setSection("fit",{yesItems:[...value.fit.yesItems,"New good-fit signal"]})}/>
          </div>
          <div className="border border-line p-4 space-y-4">
            <Field label="Not-fit tag"><input className={inputClass} value={value.fit.noTag} onChange={(e)=>setSection("fit",{noTag:e.target.value})} /></Field>
            <Field label="Not-fit heading" hint={htmlHint}><input className={inputClass} value={value.fit.noHeadingHtml} onChange={(e)=>setSection("fit",{noHeadingHtml:e.target.value})} /></Field>
            {value.fit.noItems.map((item,index)=><div key={index} className="flex gap-2"><input className={inputClass} value={item} onChange={(e)=>{const next=[...value.fit.noItems];next[index]=e.target.value;setSection("fit",{noItems:next})}}/><button type="button" className="px-3 border border-line text-accent" onClick={()=>setSection("fit",{noItems:value.fit.noItems.filter((_,i)=>i!==index)})}>×</button></div>)}
            <AddButton label="Add not-fit item" onClick={()=>setSection("fit",{noItems:[...value.fit.noItems,"New not-fit signal"]})}/>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="04 · Timeline" subtitle="Static phase/activity table; rows are fully repeatable and reorderable.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.timeline.label} onChange={(e)=>setSection("timeline",{label:e.target.value})}/></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.timeline.headingHtml} onChange={(e)=>setSection("timeline",{headingHtml:e.target.value})}/></Field>
        </div>
        <Field label="Section intro"><textarea className={textareaClass} value={value.timeline.introHtml} onChange={(e)=>setSection("timeline",{introHtml:e.target.value})}/></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Left column label"><input className={inputClass} value={value.timeline.phaseColumnLabel} onChange={(e)=>setSection("timeline",{phaseColumnLabel:e.target.value})}/></Field>
          <Field label="Right column label"><input className={inputClass} value={value.timeline.activityColumnLabel} onChange={(e)=>setSection("timeline",{activityColumnLabel:e.target.value})}/></Field>
        </div>
        <div className="space-y-3">
          {value.timeline.items.map((item,index)=><ItemShell key={index} title={`Timeline row ${index+1}`} index={index} count={value.timeline.items.length} onMove={(d)=>setSection("timeline",{items:move(value.timeline.items,index,d)})} onRemove={()=>setSection("timeline",{items:value.timeline.items.filter((_,i)=>i!==index)})}>
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3">
              <Field label="Phase"><input className={inputClass} value={item.phase} onChange={(e)=>{const next=[...value.timeline.items];next[index]={...item,phase:e.target.value};setSection("timeline",{items:next})}}/></Field>
              <Field label="Activity title"><input className={inputClass} value={item.title} onChange={(e)=>{const next=[...value.timeline.items];next[index]={...item,title:e.target.value};setSection("timeline",{items:next})}}/></Field>
            </div>
            <Field label="Activity detail" hint={htmlHint}><textarea className={textareaClass} value={item.detail} onChange={(e)=>{const next=[...value.timeline.items];next[index]={...item,detail:e.target.value};setSection("timeline",{items:next})}}/></Field>
          </ItemShell>)}
          <AddButton label="Add timeline row" onClick={()=>setSection("timeline",{items:[...value.timeline.items,{phase:`Phase ${String(value.timeline.items.length+1).padStart(2,"0")}`,title:"New phase",detail:"Describe the activity and output."}]})}/>
        </div>
      </SectionCard>

      <SectionCard title="05 · Pricing" subtitle="Outlined pricing card, dynamic badge, included checklist and strategy-call CTA.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.pricing.label} onChange={(e)=>setSection("pricing",{label:e.target.value})}/></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.pricing.headingHtml} onChange={(e)=>setSection("pricing",{headingHtml:e.target.value})}/></Field>
        </div>
        <Field label="Section intro" hint={htmlHint}><textarea className={textareaClass} value={value.pricing.introHtml} onChange={(e)=>setSection("pricing",{introHtml:e.target.value})}/></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Top-right badge"><input className={inputClass} value={value.pricing.badge} onChange={(e)=>setSection("pricing",{badge:e.target.value})}/></Field>
          <Field label="Card title" hint={htmlHint}><input className={inputClass} value={value.pricing.cardTitleHtml} onChange={(e)=>setSection("pricing",{cardTitleHtml:e.target.value})}/></Field>
          <Field label="Amount prefix"><input className={inputClass} value={value.pricing.amountPrefix} onChange={(e)=>setSection("pricing",{amountPrefix:e.target.value})}/></Field>
          <Field label="Amount value"><input className={inputClass} value={value.pricing.amountValue} onChange={(e)=>setSection("pricing",{amountValue:e.target.value})}/></Field>
        </div>
        <Field label="Pricing description" hint={htmlHint}><textarea className={textareaClass} value={value.pricing.descriptionHtml} onChange={(e)=>setSection("pricing",{descriptionHtml:e.target.value})}/></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="CTA label"><input className={inputClass} value={value.pricing.ctaLabel} onChange={(e)=>setSection("pricing",{ctaLabel:e.target.value})}/></Field>
          <Field label="CTA URL"><input className={inputClass} value={value.pricing.ctaUrl} onChange={(e)=>setSection("pricing",{ctaUrl:e.target.value})}/></Field>
        </div>
        <Field label="Included list label"><input className={inputClass} value={value.pricing.includedLabel} onChange={(e)=>setSection("pricing",{includedLabel:e.target.value})}/></Field>
        <div className="space-y-2">
          {value.pricing.includedItems.map((item,index)=><div key={index} className="flex gap-2"><input className={inputClass} value={item} onChange={(e)=>{const next=[...value.pricing.includedItems];next[index]=e.target.value;setSection("pricing",{includedItems:next})}}/><button type="button" className="px-3 border border-line text-accent" onClick={()=>setSection("pricing",{includedItems:value.pricing.includedItems.filter((_,i)=>i!==index)})}>×</button></div>)}
          <AddButton label="Add included item" onClick={()=>setSection("pricing",{includedItems:[...value.pricing.includedItems,"New included item"]})}/>
        </div>
      </SectionCard>

      <SectionCard title="06 · FAQ" subtitle="Static animated accordion. Answers support paragraphs, links, strong and emphasis HTML.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.faq.label} onChange={(e)=>setSection("faq",{label:e.target.value})}/></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.faq.headingHtml} onChange={(e)=>setSection("faq",{headingHtml:e.target.value})}/></Field>
        </div>
        <Field label="Section intro"><textarea className={textareaClass} value={value.faq.introHtml} onChange={(e)=>setSection("faq",{introHtml:e.target.value})}/></Field>
        <div className="space-y-3">
          {value.faq.items.map((item,index)=><ItemShell key={index} title={`FAQ ${index+1}`} index={index} count={value.faq.items.length} onMove={(d)=>setSection("faq",{items:move(value.faq.items,index,d)})} onRemove={()=>setSection("faq",{items:value.faq.items.filter((_,i)=>i!==index)})}>
            <Field label="Question"><input className={inputClass} value={item.question} onChange={(e)=>{const next=[...value.faq.items];next[index]={...item,question:e.target.value};setSection("faq",{items:next})}}/></Field>
            <Field label="Answer HTML" hint={'Use <p>...</p> for paragraphs. You can also use <strong>, <em>, and <a href="...">.'}><textarea className="form-input min-h-[130px]" value={item.answerHtml} onChange={(e)=>{const next=[...value.faq.items];next[index]={...item,answerHtml:e.target.value};setSection("faq",{items:next})}}/></Field>
          </ItemShell>)}
          <AddButton label="Add FAQ" onClick={()=>setSection("faq",{items:[...value.faq.items,{question:"New question",answerHtml:"<p>New answer.</p>"}]})}/>
        </div>
      </SectionCard>

      <SectionCard title="07 · Related Services" subtitle="Three-column static related-service cards. Add as many as you need; empty section is hidden.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.related.label} onChange={(e)=>setSection("related",{label:e.target.value})}/></Field>
          <Field label="Section heading" hint={htmlHint}><input className={inputClass} value={value.related.headingHtml} onChange={(e)=>setSection("related",{headingHtml:e.target.value})}/></Field>
        </div>
        <Field label="Section intro"><textarea className={textareaClass} value={value.related.introHtml} onChange={(e)=>setSection("related",{introHtml:e.target.value})}/></Field>
        <div className="space-y-3">
          {value.related.items.map((item,index)=><ItemShell key={index} title={`Related service ${index+1}`} index={index} count={value.related.items.length} onMove={(d)=>setSection("related",{items:move(value.related.items,index,d)})} onRemove={()=>setSection("related",{items:value.related.items.filter((_,i)=>i!==index)})}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Tier label"><input className={inputClass} value={item.tierLabel} onChange={(e)=>{const next=[...value.related.items];next[index]={...item,tierLabel:e.target.value};setSection("related",{items:next})}}/></Field>
              <Field label="Service URL"><input className={inputClass} value={item.href} onChange={(e)=>{const next=[...value.related.items];next[index]={...item,href:e.target.value};setSection("related",{items:next})}}/></Field>
            </div>
            <Field label="Service name" hint={htmlHint}><input className={inputClass} value={item.nameHtml} onChange={(e)=>{const next=[...value.related.items];next[index]={...item,nameHtml:e.target.value};setSection("related",{items:next})}}/></Field>
            <Field label="Description"><textarea className={textareaClass} value={item.description} onChange={(e)=>{const next=[...value.related.items];next[index]={...item,description:e.target.value};setSection("related",{items:next})}}/></Field>
            <Field label="Arrow label"><input className={inputClass} value={item.arrowLabel} onChange={(e)=>{const next=[...value.related.items];next[index]={...item,arrowLabel:e.target.value};setSection("related",{items:next})}}/></Field>
          </ItemShell>)}
          <AddButton label="Add related service" onClick={()=>setSection("related",{items:[...value.related.items,{tierLabel:"Claim · Service",nameHtml:"Related <em>Service</em>",description:"Explain how this service relates.",href:"/services/service-slug",arrowLabel:"View service →"}]})}/>
        </div>
      </SectionCard>

      <SectionCard title="08 · Final CTA" subtitle="Large centered closing CTA, same typography and button treatment as static services.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section label"><input className={inputClass} value={value.cta.label} onChange={(e)=>setSection("cta",{label:e.target.value})}/></Field>
          <Field label="Heading" hint={htmlHint}><input className={inputClass} value={value.cta.headingHtml} onChange={(e)=>setSection("cta",{headingHtml:e.target.value})}/></Field>
        </div>
        <Field label="Subtext" hint={htmlHint}><textarea className={textareaClass} value={value.cta.subtextHtml} onChange={(e)=>setSection("cta",{subtextHtml:e.target.value})}/></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Primary label"><input className={inputClass} value={value.cta.primaryLabel} onChange={(e)=>setSection("cta",{primaryLabel:e.target.value})}/></Field>
          <Field label="Primary URL"><input className={inputClass} value={value.cta.primaryUrl} onChange={(e)=>setSection("cta",{primaryUrl:e.target.value})}/></Field>
          <Field label="Secondary label"><input className={inputClass} value={value.cta.secondaryLabel} onChange={(e)=>setSection("cta",{secondaryLabel:e.target.value})}/></Field>
          <Field label="Secondary URL"><input className={inputClass} value={value.cta.secondaryUrl} onChange={(e)=>setSection("cta",{secondaryUrl:e.target.value})}/></Field>
        </div>
        <Field label="Small note" hint={htmlHint}><input className={inputClass} value={value.cta.noteHtml} onChange={(e)=>setSection("cta",{noteHtml:e.target.value})}/></Field>
      </SectionCard>
    </div>
  )
}

interface ServiceCategory {
  id: string
  name: string
}

interface Props {
  service: Service
  categories?: ServiceCategory[]
  isNew?: boolean
}

function getMetaValue(template: StaticServiceTemplateData, labelPart: string, fallback = "") {
  const found = template.hero.meta?.find((item) => item.label.toLowerCase().includes(labelPart.toLowerCase()))
  return found ? stripHtml(found.value) : fallback
}

export default function ServiceEditorForm({ service, categories = [], isNew = false }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<"basics" | "template">("basics")
  const slugManuallyEditedRef = useRef<boolean>(!isNew && service.slug !== slugify(service.title))

  const [form, setForm] = useState({
    slug: service.slug,
    title: service.title,
    tier: service.tier,
    shortDescription: service.shortDescription,
    templateData: normalizeServiceTemplate(service as any),
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
    categoryId: (service as any).categoryId ?? (null as string | null),
    published: service.published,
    status: ((service as any).status ?? (service.published ? "published" : "draft")) as PublishStatus,
    scheduledFor: ((service as any).scheduledFor as Date | null)
      ? new Date((service as any).scheduledFor).toISOString()
      : (null as string | null),
    sortOrder: service.sortOrder,
  })

  // Keep a synchronous copy of the latest editor state. This avoids saving a
  // stale template when the user edits a field and immediately clicks Update.
  const formRef = useRef(form)

  // Dedicated synchronous source of truth for the large nested template.
  // React state is still used for rendering, but save reads this ref directly.
  const templateRef = useRef<StaticServiceTemplateData>(form.templateData)

  function commitForm(next: typeof form) {
    formRef.current = next
    templateRef.current = next.templateData
    setForm(next)
  }

  function commitTemplate(templateData: StaticServiceTemplateData) {
    templateRef.current = templateData
    const next = { ...formRef.current, templateData }
    formRef.current = next
    setForm(next)
  }

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    commitForm({ ...formRef.current, [key]: value })
  }

  function handleTitleChange(newTitle: string) {
    const prev = formRef.current
    const template = prev.templateData
    const nextTemplate = isNew
      ? {
          ...template,
          hero: {
            ...template.hero,
            headingHtml:
              template.hero.headingHtml === "New Service. <em>Built with methodology.</em>"
                ? `${newTitle || "New Service"}. <em>Built with methodology.</em>`
                : template.hero.headingHtml,
          },
          pricing: {
            ...template.pricing,
            cardTitleHtml:
              template.pricing.cardTitleHtml === "New Service"
                ? newTitle || "New Service"
                : template.pricing.cardTitleHtml,
          },
          cta: {
            ...template.cta,
            headingHtml:
              template.cta.headingHtml === "Ready to build <em>new service.</em>"
                ? `Ready to build <em>${(newTitle || "new service").toLowerCase()}.</em>`
                : template.cta.headingHtml,
          },
        }
      : template

    commitForm({
      ...prev,
      title: newTitle,
      slug: slugManuallyEditedRef.current ? prev.slug : slugify(newTitle),
      templateData: nextTemplate,
    })
  }

  function handleTierChange(nextTier: "CLAIM" | "SHIELD" | "SCALE") {
    const prev = formRef.current
    const display = (tier: string) => tier.charAt(0) + tier.slice(1).toLowerCase()
    const previousDisplay = display(prev.tier)
    const nextDisplay = display(nextTier)
    const meta = (prev.templateData.hero.meta || []).map((item) =>
      item.label.trim().toLowerCase() === "tier" ? { ...item, value: nextDisplay } : item
    )
    const tierLabel = prev.templateData.hero.tierLabel.startsWith(`${previousDisplay} Tier`)
      ? prev.templateData.hero.tierLabel.replace(`${previousDisplay} Tier`, `${nextDisplay} Tier`)
      : prev.templateData.hero.tierLabel

    commitForm({
      ...prev,
      tier: nextTier,
      templateData: {
        ...prev.templateData,
        hero: { ...prev.templateData.hero, tierLabel, meta },
      },
    })
  }

  function handleSlugChange(newSlug: string) {
    slugManuallyEditedRef.current = true
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
    commitForm({ ...formRef.current, ...seo })
  }

  function buildLegacyCompatibilityFields(template: StaticServiceTemplateData) {
    const deliverables = (template.deliverables.items || [])
      .map((item) => stripHtml(item.titleHtml || item.bodyHtml))
      .filter(Boolean)
    const process = (template.timeline.items || []).map((item) => ({
      title: item.title || item.phase,
      description: stripHtml(item.detail),
    }))
    const faqs = (template.faq.items || []).map((item) => ({
      question: item.question,
      answer: stripHtml(item.answerHtml),
    }))

    const description =
      stripHtml(template.deliverables.introHtml) ||
      stripHtml(template.hero.subtextHtml) ||
      form.shortDescription ||
      "Service details"

    return {
      heroLabel: template.hero.tierLabel || `${form.tier} Tier`,
      heroHeading: template.hero.headingHtml || form.title,
      heroSub: stripHtml(template.hero.subtextHtml) || form.shortDescription || form.title,
      pricing: stripHtml(template.pricing.amountValue) || getMetaValue(template, "pricing", "Custom") || "Custom",
      minEngagement: getMetaValue(template, "engagement", null as any) || null,
      fullDescription: description,
      deliverables,
      process,
      faqs,
      fitsYou: (template.fit.yesItems || []).filter(Boolean),
      notFitsYou: (template.fit.noItems || []).filter(Boolean),
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()

    // Build the save snapshot from synchronous refs only.
    // This guarantees nested template edits are the exact JSON sent to PATCH.
    const current = {
      ...formRef.current,
      templateData: templateRef.current,
    }

    if (current.status === "scheduled" && !current.scheduledFor) {
      toast.error("Pick a date/time for scheduled publish.")
      return
    }
    if (!current.title.trim() || !current.slug.trim() || !current.shortDescription.trim()) {
      toast.error("Title, slug and short menu description are required.")
      setTab("basics")
      return
    }

    setSaving(true)
    try {
      const isPublished = current.status === "published"
      const legacy = buildLegacyCompatibilityFields(current.templateData)
      const payload = {
        ...current,
        ...legacy,
        templateData: current.templateData,
        published: isPublished,
        scheduledFor: current.status === "scheduled" ? current.scheduledFor : null,
      }
      const endpoint = isNew ? "/api/services" : `/api/services/${service.id}`
      const method = isNew ? "POST" : "PATCH"
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        let errMsg = "Save failed."
        if (errBody?.error) {
          if (typeof errBody.error === "string") errMsg = errBody.error
          else if (errBody.error?.fieldErrors) errMsg = `Invalid fields: ${Object.keys(errBody.error.fieldErrors).join(", ")}`
        }
        if (res.status === 500) {
          errMsg = "Database error. Check the Service.templateData column and server logs."
        }
        throw new Error(errMsg)
      }

      const saved = await res.json()

      // Do not show a false "saved" success. Verify the API returned exactly
      // the template JSON that the editor submitted.
      if (!isNew) {
        const submittedTemplate = JSON.stringify(current.templateData)
        const savedTemplate = JSON.stringify(saved?.templateData ?? null)

        if (submittedTemplate !== savedTemplate) {
          throw new Error(
            "Update reached the server, but templateData was not saved. Check app/api/services/[id]/route.ts."
          )
        }

        // Keep the exact submitted values visible after a successful save.
        commitForm({
          ...current,
          published: saved.published ?? current.published,
          status: (saved.status ?? current.status) as PublishStatus,
          sortOrder: saved.sortOrder ?? current.sortOrder,
        })
      }

      const action: "published" | "scheduled" | "saved" | "created" =
        current.status === "published" ? "published" : current.status === "scheduled" ? "scheduled" : isNew ? "created" : "saved"

      premiumToast({
        kind: "service",
        action,
        title: current.title,
        scheduledFor: current.status === "scheduled" ? current.scheduledFor : null,
        viewUrl:
          action === "published"
            ? `${typeof window !== "undefined" ? window.location.origin : ""}/services/${current.slug}`
            : undefined,
      })

      if (isNew) {
        router.push(`/vikingz-1000-admin/services/${saved.id}`)
      }
      // Existing-service edits intentionally do NOT call router.refresh().
      // The local editor already contains the latest saved values, and the
      // public service page is revalidated by the API route.
    } catch (err: any) {
      toast.error(typeof err?.message === "string" ? err.message : "Save failed. Try again.")
    } finally {
      setSaving(false)
    }
  }

  const seoContent = stripHtml(
    [
      form.templateData.hero.headingHtml,
      form.templateData.hero.subtextHtml,
      form.templateData.deliverables.introHtml,
      ...form.templateData.deliverables.items.flatMap((item) => [item.titleHtml, item.bodyHtml]),
      form.templateData.fit.introHtml,
      ...form.templateData.fit.yesItems,
      ...form.templateData.fit.noItems,
      ...form.templateData.timeline.items.flatMap((item) => [item.title, item.detail]),
      form.templateData.pricing.descriptionHtml,
      ...form.templateData.faq.items.flatMap((item) => [item.question, item.answerHtml]),
    ].join(" ")
  )

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 pb-32">
      <div className="space-y-6 min-w-0">
        <div className="border-b border-line">
          <nav className="flex gap-1 -mb-px">
            {[
              { id: "basics", label: "Service basics" },
              { id: "template", label: "Static page template" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id as "basics" | "template")}
                className={`px-5 py-3 mono-pill border-b-2 transition-colors ${
                  tab === item.id ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {tab === "basics" && (
          <div className="space-y-5">
            <div className="border border-line bg-bg-2 p-4 text-sm text-ink-2">
              Published services appear in the header Services menu automatically. Draft services stay out of the menu. No separate menu toggle is used.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Title" required hint="Service name shown in the breadcrumb, admin list and menu.">
                <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="form-input" required />
              </FormField>
              <FormField label="URL slug" required hint="Auto-generated from title until you edit it manually.">
                <input type="text" value={form.slug} onChange={(e) => handleSlugChange(e.target.value)} className="form-input font-mono text-sm" required />
                <p className="text-[11px] text-ink-muted mt-1">Live URL: /services/{form.slug || "..."}</p>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Tier" required>
                <select value={form.tier} onChange={(e) => handleTierChange(e.target.value as "CLAIM" | "SHIELD" | "SCALE")} className="form-input">
                  <option value="CLAIM">Claim</option>
                  <option value="SHIELD">Shield</option>
                  <option value="SCALE">Scale</option>
                </select>
              </FormField>
              <FormField label="Category">
                <select value={form.categoryId ?? ""} onChange={(e) => set("categoryId", e.target.value || null)} className="form-input">
                  <option value="">— Uncategorized —</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </FormField>
            </div>

            <FormField label="Menu short description" required hint="Shown under this service name when a dashboard-created service is injected into the header mega menu.">
              <textarea value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className="form-input min-h-[90px]" required />
            </FormField>

            <div className="border border-line bg-bg-2">
              <div className="px-5 py-3 border-b border-line bg-bg"><h3 className="mono-label">Featured / Social Image</h3></div>
              <div className="p-5">
                <ImagePicker
                  value={form.featuredImage}
                  onChange={(url, meta) => {
                    set("featuredImage", url)
                    if (meta?.alt) set("featuredImageAlt", meta.alt)
                    if (meta?.title) set("featuredImageTitle", meta.title)
                  }}
                  altValue={form.featuredImageAlt}
                  onAltChange={(value) => set("featuredImageAlt", value)}
                  titleValue={form.featuredImageTitle}
                  onTitleChange={(value) => set("featuredImageTitle", value)}
                />
              </div>
            </div>
          </div>
        )}

        {tab === "template" && (
          <ServiceTemplateEditor
            value={form.templateData}
            onChange={commitTemplate}
          />
        )}

        <SeoFieldsPanel values={seoValues} onChange={updateSeoFields} baseUrl={`https://digitalvikingz.com/services/${form.slug}`} />

        <div className="mt-8">
          <ScheduleControl
            status={form.status}
            scheduledFor={form.scheduledFor}
            onStatusChange={(status) => set("status", status)}
            onScheduledForChange={(iso) => set("scheduledFor", iso)}
          />
        </div>

        <div className="sticky bottom-4 z-10 bg-bg border border-line p-4 mt-4 flex items-center justify-between shadow-lg gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="mono-pill text-ink-muted">
              {form.status === "draft" && "Draft · hidden from menu"}
              {form.status === "scheduled" && form.scheduledFor && `Scheduled · ${new Date(form.scheduledFor).toLocaleString()}`}
              {form.status === "published" && "Published · visible in menu"}
            </span>
            <span className="text-ink-muted">|</span>
            <label className="flex items-center gap-2">
              <span className="mono-pill text-ink-muted">Sort:</span>
              <input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", parseInt(e.target.value || "0"))} className="w-16 px-2 py-1 border border-line-strong text-sm" />
            </label>
          </div>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60 flex-shrink-0">
            {saving ? "Saving..." : form.status === "scheduled" ? "Schedule service →" : form.status === "published" ? (isNew ? "Publish service →" : "Update service →") : "Save draft →"}
          </button>
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-4 lg:self-start">
        <div className="border border-line bg-bg p-4 text-xs text-ink-2 leading-relaxed">
          <div className="mono-pill text-accent mb-2">Template source</div>
          New dashboard services now render with the same static service CSS/layout system as the existing hand-built service pages.
        </div>
        <SeoScorePanel
          input={{
            title: form.title,
            slug: form.slug,
            seoTitle: form.seoTitle,
            seoDescription: form.seoDescription,
            focusKeyword: form.focusKeyword,
            content: seoContent,
          }}
        />
      </aside>
    </form>
  )
}
