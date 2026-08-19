import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import PageShell from "@/components/marketing/PageShell"
import { getServiceBySlug as getStaticService } from "@/data/services"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

interface PageProps {
  params: { slug: string }
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

function isObject(value: unknown): value is Record<string, any> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

function makeDefaultTemplate(service: any) {
  const title = service?.title || "New Service"
  const tierRaw = String(service?.tier || "CLAIM")
  const tier = tierRaw.charAt(0).toUpperCase() + tierRaw.slice(1).toLowerCase()
  const pricing = service?.pricing || "Custom"
  const minEngagement = service?.minEngagement || "Scoped per engagement"

  return {
    version: 1,
    hero: {
      tierLabel: service?.heroLabel || `${tier} Tier · Service`,
      headingHtml: service?.heroHeading || `${title}. <em>Built with methodology.</em>`,
      subtextHtml:
        service?.heroSub ||
        service?.shortDescription ||
        "Describe the service outcome, who it is for, and why this engagement exists.",
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
      introHtml:
        service?.fullDescription ||
        "Explain what ships in this engagement and what the buyer receives at handoff.",
      items: [] as any[],
    },
    console: {
      label: "02 / The Console",
      headingHtml: "Engagement, <em>in two states.</em>",
      introHtml:
        "Show how the engagement looks while work is in progress and how those same components look at completion.",
      buildingPill: "Live · Building",
      outcomePill: "Live · Outcome",
      buildingTitleHtml: "Engagement: <strong>work in flight</strong>",
      outcomeTitleHtml: "Engagement: <strong>complete · signed off</strong>",
      toggleToOutcomeLabel: "See completion",
      toggleToBuildingLabel: "Back to building",
      items: [] as any[],
      outcomeBannerLabel: "Engagement complete · representative outcome",
      outcomeBannerTextHtml:
        "Summarize the completed engagement and what is ready for handoff or execution.",
      buildingFootHtml: "Live engagement · <strong>work in progress</strong>",
      outcomeFootHtml: "Engagement closed · <strong>handoff complete</strong>",
    },
    fit: {
      label: "03 / The Fit",
      headingHtml: "Who this <em>fits.</em>",
      introHtml:
        "Set expectations clearly. Explain where this service produces the best outcome and where another engagement is a better fit.",
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
        {
          phase: "Phase 01",
          title: "Discovery & Foundation",
          detail: "Describe what happens in this phase and the output that gets locked.",
        },
      ],
    },
    pricing: {
      label: "05 / The Investment",
      headingHtml: "Custom · scoped per <em>engagement.</em>",
      introHtml: "Explain what drives scope and how pricing is confirmed.",
      badge: "Scoped Engagement",
      cardTitleHtml: title,
      amountPrefix: "Pricing",
      amountValue: pricing,
      descriptionHtml:
        "Describe the commercial model, scope factors, and what happens after the strategy call.",
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
        {
          question: "Add a common question",
          answerHtml: "<p>Add a concise, useful answer.</p>",
        },
      ],
    },
    related: {
      label: "07 / Adjacent Services",
      headingHtml: "What pairs with <em>this service.</em>",
      introHtml:
        "Point buyers to the most relevant services that come before, after, or alongside this engagement.",
      items: [] as any[],
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

function normalizeTemplate(service: any) {
  const fallback = makeDefaultTemplate(service)
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
    }
  }

  // Backward compatibility for services created with the old dashboard editor.
  const legacyDeliverables = Array.isArray(service?.deliverables) ? service.deliverables : []
  const legacyProcess = Array.isArray(service?.process) ? service.process : []
  const legacyFaqs = Array.isArray(service?.faqs) ? service.faqs : []
  const fits = Array.isArray(service?.fitsYou) ? service.fitsYou : []
  const notFits = Array.isArray(service?.notFitsYou) ? service.notFitsYou : []

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
    : [
        {
          numberLabel: "Deliverable 01",
          icon: "A",
          titleHtml: "First <em>Deliverable</em>",
          bodyHtml: "Describe the artifact, why it matters, and what the client receives.",
        },
      ]

  fallback.console.items = fallback.deliverables.items.slice(0, 6).map((item: any, index: number) => ({
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
    ? legacyDeliverables
        .map((item: any) => (typeof item === "string" ? item : item?.text || item?.title || ""))
        .filter(Boolean)
    : fallback.pricing.includedItems

  fallback.faq.items = legacyFaqs.length
    ? legacyFaqs.map((faq: any) => ({
        question: faq?.question || "",
        answerHtml: `<p>${faq?.answer || ""}</p>`,
      }))
    : fallback.faq.items

  return fallback
}

async function getService(slug: string) {
  // Force every public service-page request to read the latest database row.
  // This prevents the App Router/RSC cache from serving an older templateData
  // snapshot after a dashboard update.
  noStore()

  try {
    const dbService = await prisma.service.findUnique({
      where: { slug },
    })

    if (
      dbService &&
      dbService.status === "published" &&
      dbService.published === true
    ) {
      return { ...dbService, __fromDb: true as const }
    }
  } catch (error) {
    console.error(`[services/${slug}] database read failed`, error)
  }

  // Backward-compatible fallback only for legacy static service data.
  // Physical static routes under app/services/<slug>/page.tsx still take
  // precedence automatically in Next.js.
  const staticService = getStaticService(slug)
  if (staticService) {
    return { ...staticService, templateData: null, __fromDb: false as const }
  }

  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getService(params.slug)
  if (!service) return { title: "Service Not Found" }

  const title = (service as any).seoTitle || service.title
  const description =
    (service as any).seoDescription || (service as any).shortDescription || ""
  const canonical = (service as any).canonicalUrl || undefined
  const noindex = Boolean((service as any).noindex)
  const nofollow = Boolean((service as any).nofollow)

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: !noindex, follow: !nofollow },
    openGraph: {
      title: (service as any).ogTitle || title,
      description: (service as any).ogDescription || description,
      images: (service as any).ogImage ? [(service as any).ogImage] : undefined,
    },
    twitter: {
      title: (service as any).twitterTitle || title,
      description: (service as any).twitterDescription || description,
      images: (service as any).twitterImage ? [(service as any).twitterImage] : undefined,
    },
  }
}

function externalAttrs(href: string) {
  return /^https?:\/\//i.test(href || "")
    ? { target: "_blank" as const, rel: "noopener" }
    : {}
}

export default async function ServicePage({ params }: PageProps) {
  const service = await getService(params.slug)
  if (!service) notFound()

  const data = normalizeTemplate(service)

  return (
    <PageShell>
      <div className="dashboard-static-service">
        {/* HERO */}
        <header className="hero service-hero">
          <div className="hero-grid-bg"></div>
          <div className="wrap">
            <div className="hero-breadcrumb">
              <a href="/">Home</a>
              <span className="hero-breadcrumb-sep">/</span>
              <a href="/#inside">Services</a>
              <span className="hero-breadcrumb-sep">/</span>
              <span className="hero-breadcrumb-current">{service.title}</span>
            </div>

            <span
              className="hero-tier-pill"
              dangerouslySetInnerHTML={{ __html: data.hero.tierLabel || "" }}
            />

            <h1
              className="h-display hero-h1"
              dangerouslySetInnerHTML={{ __html: data.hero.headingHtml || "" }}
            />

            <p
              className="hero-sub"
              dangerouslySetInnerHTML={{ __html: data.hero.subtextHtml || "" }}
            />

            {Array.isArray(data.hero.meta) && data.hero.meta.length > 0 && (
              <div className="hero-meta-strip">
                {data.hero.meta.slice(0, 4).map((item: any, index: number) => (
                  <div className="hero-meta-cell" key={`${item?.label || "meta"}-${index}`}>
                    <span className="hero-meta-label">{item?.label || ""}</span>
                    <span
                      className="hero-meta-value"
                      dangerouslySetInnerHTML={{ __html: item?.value || "" }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="hero-ctas">
              {data.hero.primaryCtaLabel && data.hero.primaryCtaUrl && (
                <a
                  href={data.hero.primaryCtaUrl}
                  {...externalAttrs(data.hero.primaryCtaUrl)}
                  className="btn btn-primary"
                >
                  {data.hero.primaryCtaLabel}
                  <span className="btn-arrow"></span>
                </a>
              )}

              {data.hero.secondaryCtaLabel && (
                <a
                  href={data.hero.secondaryCtaUrl || "#inside"}
                  {...externalAttrs(data.hero.secondaryCtaUrl || "#inside")}
                  className="btn btn-ghost"
                >
                  {data.hero.secondaryCtaLabel}
                  <span className="btn-arrow"></span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* 01 — DELIVERABLES */}
        <section className="section inside" id="inside">
          <div className="wrap">
            <div className="section-head">
              <div className="section-head-left">
                <span className="label">{data.deliverables.label}</span>
                <h2
                  className="h-display section-h2"
                  dangerouslySetInnerHTML={{ __html: data.deliverables.headingHtml || "" }}
                />
              </div>
              <p
                className="section-intro"
                dangerouslySetInnerHTML={{ __html: data.deliverables.introHtml || "" }}
              />
            </div>

            <div className="inside-grid deliverable-style-grid">
              {(data.deliverables.items || []).map((item: any, index: number) => (
                <div className="inside-card" key={`${item?.numberLabel || "deliverable"}-${index}`}>
                  <div className="inside-card-head">
                    <span className="inside-card-num">
                      {item?.numberLabel || `Deliverable ${String(index + 1).padStart(2, "0")}`}
                    </span>
                    <div className="inside-card-icon">{item?.icon || String(index + 1)}</div>
                  </div>
                  <h3 dangerouslySetInnerHTML={{ __html: item?.titleHtml || "" }} />
                  <p dangerouslySetInnerHTML={{ __html: item?.bodyHtml || "" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — TWO-STATE ENGAGEMENT CONSOLE */}
        <section className="engagement-section">
          <div className="wrap">
            <div className="engagement-head">
              <div className="engagement-head-left">
                <span className="label">{data.console.label}</span>
                <h2
                  className="h-display section-h2"
                  dangerouslySetInnerHTML={{ __html: data.console.headingHtml || "" }}
                />
              </div>
              <p
                className="section-intro"
                dangerouslySetInnerHTML={{ __html: data.console.introHtml || "" }}
              />
            </div>

            <div className="dashboard-console-switch">
              <input
                id="dashboardEngagementToggle"
                className="dashboard-console-checkbox"
                type="checkbox"
                aria-label="Toggle between building and outcome"
              />

              <div className="engagement-console">
                <div className="ec-header">
                  <div className="ec-header-left">
                    <span className="ec-pill">
                      <span className="show-building">{data.console.buildingPill}</span>
                      <span className="show-outcome">{data.console.outcomePill}</span>
                    </span>
                    <span className="ec-title">
                      <span
                        className="show-building"
                        dangerouslySetInnerHTML={{ __html: data.console.buildingTitleHtml || "" }}
                      />
                      <span
                        className="show-outcome"
                        dangerouslySetInnerHTML={{ __html: data.console.outcomeTitleHtml || "" }}
                      />
                    </span>
                  </div>

                  <label className="ec-toggle-btn" htmlFor="dashboardEngagementToggle">
                    <span className="ec-toggle-dot"></span>
                    <span className="show-building">{data.console.toggleToOutcomeLabel}</span>
                    <span className="show-outcome">{data.console.toggleToBuildingLabel}</span>
                  </label>
                </div>

                <div className="ec-grid">
                  {(data.console.items || []).map((item: any, index: number) => (
                    <div className="ec-card" key={`${item?.numberLabel || "component"}-${index}`}>
                      <span className="ec-card-num">
                        {item?.numberLabel || `Component ${String(index + 1).padStart(2, "0")}`}
                      </span>
                      <div
                        className="ec-card-name"
                        dangerouslySetInnerHTML={{ __html: item?.nameHtml || "" }}
                      />
                      <div className="ec-card-state">
                        <span
                          className="show-building"
                          dangerouslySetInnerHTML={{ __html: item?.buildingTextHtml || "" }}
                        />
                        <span
                          className="show-outcome"
                          dangerouslySetInnerHTML={{ __html: item?.outcomeTextHtml || "" }}
                        />
                      </div>
                      <div className="ec-card-status">
                        <span className="ec-card-status-dot"></span>
                        <span className="show-building">{item?.buildingStatus || "▸ Building"}</span>
                        <span className="show-outcome">{item?.outcomeStatus || "✓ Complete"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {data.console.outcomeBannerTextHtml && (
                  <div className="ec-outcome-banner show-outcome outcome-block">
                    <span className="ec-outcome-tag">{data.console.outcomeBannerLabel}</span>
                    <div
                      className="ec-outcome-text"
                      dangerouslySetInnerHTML={{ __html: data.console.outcomeBannerTextHtml || "" }}
                    />
                  </div>
                )}

                <div className="ec-foot">
                  <span
                    className="ec-foot-text show-building"
                    dangerouslySetInnerHTML={{ __html: data.console.buildingFootHtml || "" }}
                  />
                  <span
                    className="ec-foot-text show-outcome"
                    dangerouslySetInnerHTML={{ __html: data.console.outcomeFootHtml || "" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — FIT */}
        <section className="section fit">
          <div className="wrap">
            <div className="section-head">
              <div className="section-head-left">
                <span className="label">{data.fit.label}</span>
                <h2
                  className="h-display section-h2"
                  dangerouslySetInnerHTML={{ __html: data.fit.headingHtml || "" }}
                />
              </div>
              <p
                className="section-intro"
                dangerouslySetInnerHTML={{ __html: data.fit.introHtml || "" }}
              />
            </div>

            <div className="fit-grid">
              <div className="fit-col yes">
                <span className="fit-tag">{data.fit.yesTag}</span>
                <h3 dangerouslySetInnerHTML={{ __html: data.fit.yesHeadingHtml || "" }} />
                <ul className="fit-list">
                  {(data.fit.yesItems || []).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="fit-col no">
                <span className="fit-tag">{data.fit.noTag}</span>
                <h3 dangerouslySetInnerHTML={{ __html: data.fit.noHeadingHtml || "" }} />
                <ul className="fit-list">
                  {(data.fit.noItems || []).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — TIMELINE */}
        <section className="section timeline">
          <div className="wrap">
            <div className="section-head">
              <div className="section-head-left">
                <span className="label">{data.timeline.label}</span>
                <h2
                  className="h-display section-h2"
                  dangerouslySetInnerHTML={{ __html: data.timeline.headingHtml || "" }}
                />
              </div>
              <p
                className="section-intro"
                dangerouslySetInnerHTML={{ __html: data.timeline.introHtml || "" }}
              />
            </div>

            <div className="timeline-wrap">
              <div className="timeline-row timeline-row-header">
                <div className="timeline-phase">{data.timeline.phaseColumnLabel}</div>
                <div className="timeline-action">{data.timeline.activityColumnLabel}</div>
              </div>

              {(data.timeline.items || []).map((item: any, index: number) => (
                <div className="timeline-row" key={`${item?.phase || "phase"}-${index}`}>
                  <div className="timeline-phase">{item?.phase || `Phase ${index + 1}`}</div>
                  <div className="timeline-action">
                    <div className="timeline-action-title">{item?.title || ""}</div>
                    <div
                      className="timeline-action-detail"
                      dangerouslySetInnerHTML={{ __html: item?.detail || "" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — PRICING */}
        <section className="section pricing" id="pricing">
          <div className="wrap">
            <div className="section-head">
              <div className="section-head-left">
                <span className="label">{data.pricing.label}</span>
                <h2
                  className="h-display section-h2"
                  dangerouslySetInnerHTML={{ __html: data.pricing.headingHtml || "" }}
                />
              </div>
              <p
                className="section-intro"
                dangerouslySetInnerHTML={{ __html: data.pricing.introHtml || "" }}
              />
            </div>

            <div className="pricing-card" data-badge={data.pricing.badge || "Scoped Engagement"}>
              <div className="pricing-left">
                <h3 dangerouslySetInnerHTML={{ __html: data.pricing.cardTitleHtml || "" }} />

                <div className="pricing-amount">
                  <span className="pricing-amount-prefix">{data.pricing.amountPrefix}</span>
                  <span
                    className="pricing-amount-value"
                    dangerouslySetInnerHTML={{ __html: data.pricing.amountValue || "" }}
                  />
                </div>

                <p dangerouslySetInnerHTML={{ __html: data.pricing.descriptionHtml || "" }} />

                {data.pricing.ctaLabel && data.pricing.ctaUrl && (
                  <a
                    href={data.pricing.ctaUrl}
                    {...externalAttrs(data.pricing.ctaUrl)}
                    className="btn btn-primary"
                  >
                    {data.pricing.ctaLabel}
                    <span className="btn-arrow"></span>
                  </a>
                )}
              </div>

              <div className="pricing-included">
                <span className="pricing-included-label">{data.pricing.includedLabel}</span>
                <ul>
                  {(data.pricing.includedItems || []).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — FAQ */}
        <section className="section faq">
          <div className="wrap">
            <div className="section-head">
              <div className="section-head-left">
                <span className="label">{data.faq.label}</span>
                <h2
                  className="h-display section-h2"
                  dangerouslySetInnerHTML={{ __html: data.faq.headingHtml || "" }}
                />
              </div>
              <p
                className="section-intro"
                dangerouslySetInnerHTML={{ __html: data.faq.introHtml || "" }}
              />
            </div>

            <div className="faq-list">
              {(data.faq.items || []).map((faq: any, index: number) => (
                <div className="faq-item" key={`${faq?.question || "faq"}-${index}`}>
                  <button className="faq-question" type="button">
                    <span>{faq?.question || ""}</span>
                    <span className="faq-icon"></span>
                  </button>
                  <div className="faq-answer">
                    <div
                      className="faq-answer-inner"
                      dangerouslySetInnerHTML={{ __html: faq?.answerHtml || "" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — RELATED SERVICES */}
        {Array.isArray(data.related.items) && data.related.items.length > 0 && (
          <section className="section related">
            <div className="wrap">
              <div className="section-head">
                <div className="section-head-left">
                  <span className="label">{data.related.label}</span>
                  <h2
                    className="h-display section-h2"
                    dangerouslySetInnerHTML={{ __html: data.related.headingHtml || "" }}
                  />
                </div>
                <p
                  className="section-intro"
                  dangerouslySetInnerHTML={{ __html: data.related.introHtml || "" }}
                />
              </div>

              <div className="related-grid">
                {data.related.items.map((item: any, index: number) => (
                  <a
                    href={item?.href || "#"}
                    className="related-card"
                    key={`${item?.href || "related"}-${index}`}
                  >
                    <span className="related-tier">{item?.tierLabel || "Service"}</span>
                    <div
                      className="related-name"
                      dangerouslySetInnerHTML={{ __html: item?.nameHtml || "" }}
                    />
                    <div className="related-desc">{item?.description || ""}</div>
                    <div className="related-arrow">{item?.arrowLabel || "View service →"}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 08 — FINAL CTA */}
        <section className="final-cta">
          <div className="wrap">
            <span className="label final-cta-label">{data.cta.label}</span>
            <h2
              className="h-display"
              dangerouslySetInnerHTML={{ __html: data.cta.headingHtml || "" }}
            />
            <p dangerouslySetInnerHTML={{ __html: data.cta.subtextHtml || "" }} />

            <div className="final-cta-ctas">
              {data.cta.primaryLabel && data.cta.primaryUrl && (
                <a
                  href={data.cta.primaryUrl}
                  {...externalAttrs(data.cta.primaryUrl)}
                  className="btn btn-primary"
                >
                  {data.cta.primaryLabel}
                  <span className="btn-arrow"></span>
                </a>
              )}

              {data.cta.secondaryLabel && data.cta.secondaryUrl && (
                <a href={data.cta.secondaryUrl} className="btn btn-ghost">
                  {data.cta.secondaryLabel}
                  <span className="btn-arrow"></span>
                </a>
              )}
            </div>

            {data.cta.noteHtml && (
              <div
                className="dashboard-final-note"
                dangerouslySetInnerHTML={{ __html: data.cta.noteHtml || "" }}
              />
            )}
          </div>
        </section>

        {/* Small compatibility layer only. The visual system itself comes from
            the exact static-service classes already present in app/globals.css. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body:has(.dashboard-static-service) #servicesToggle { color: #C4401A !important; }

              .dashboard-static-service .pricing-card::before {
                content: attr(data-badge) !important;
              }

              /* Keep the static two-column/right-icon layout, but restore
                 the original interactive hover treatment. */
              .dashboard-static-service .deliverable-style-grid .inside-card {
                transition: all 0.3s !important;
              }

              .dashboard-static-service .deliverable-style-grid .inside-card:hover {
                border-color: var(--accent) !important;
                transform: translateY(-3px) !important;
                box-shadow: 0 12px 32px rgba(10, 10, 10, 0.06) !important;
              }

              .dashboard-static-service .deliverable-style-grid .inside-card:hover .inside-card-icon {
                background: var(--accent) !important;
                color: var(--bg) !important;
              }

              .dashboard-static-service .dashboard-final-note {
                margin-top: 24px;
                font-family: var(--mono);
                font-size: 11px;
                letter-spacing: .1em;
                text-transform: uppercase;
                color: var(--text-muted);
              }

              .dashboard-static-service .dashboard-final-note span {
                color: var(--accent);
              }

              .dashboard-static-service .dashboard-console-switch {
                position: relative;
              }

              .dashboard-static-service .dashboard-console-checkbox {
                position: absolute;
                opacity: 0;
                pointer-events: none;
              }

              .dashboard-static-service .show-outcome {
                display: none;
              }

              .dashboard-static-service .outcome-block {
                display: none;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .show-building {
                display: none;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .show-outcome {
                display: inline;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .outcome-block {
                display: flex;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-pill {
                color: #4ade80;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-pill::before,
              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-toggle-dot,
              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-card-status-dot {
                background: #4ade80;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-title strong,
              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-card-state strong,
              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-card-status,
              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-card-num,
              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-foot-text strong {
                color: #4ade80;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-toggle-btn {
                border-color: rgba(74, 222, 128, 0.4);
                color: #4ade80;
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-card:hover {
                background: rgba(74, 222, 128, 0.04);
              }

              .dashboard-static-service .dashboard-console-checkbox:checked + .engagement-console .ec-foot {
                background: rgba(74, 222, 128, 0.04);
                border-top-color: rgba(74, 222, 128, 0.2);
              }

              .dashboard-static-service .ec-toggle-btn {
                cursor: pointer;
                user-select: none;
              }


              .dashboard-static-service .section-intro a,
              .dashboard-static-service .faq-answer-inner a,
              .dashboard-static-service .inside-card a,
              .dashboard-static-service .pricing-left a:not(.btn) {
                color: var(--accent);
              }
            `,
          }}
        />
      </div>
    </PageShell>
  )
}
