import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import PageShell from "@/components/marketing/PageShell"
import HeroSection from "@/components/marketing/HeroSection"
import CTASection from "@/components/marketing/CTASection"
import { getServiceBySlug as getStaticService } from "@/data/services"
import { siteConfig } from "@/data/site-content"
import { prisma } from "@/lib/db"

export const revalidate = 30

interface PageProps {
  params: { slug: string }
}

async function getService(slug: string) {
  try {
    const dbService = await prisma.service.findFirst({
      where: {
        slug,
        OR: [{ status: "published" } as any, { published: true }],
      },
    })
    if (dbService) {
      return {
        slug: dbService.slug,
        title: dbService.title,
        tier:
          (dbService.tier ?? "").toString().charAt(0).toUpperCase() +
          (dbService.tier ?? "").toString().slice(1).toLowerCase(),
        shortDescription: dbService.shortDescription ?? "",
        heroLabel: dbService.heroLabel ?? "",
        heroHeading: dbService.heroHeading ?? dbService.title,
        heroSub: dbService.heroSub ?? "",
        fullDescription: dbService.fullDescription ?? "",
        pricing: dbService.pricing ?? "Custom",
        minEngagement: dbService.minEngagement ?? "—",
        deliverables: (dbService.deliverables as any) ?? [],
        process: (dbService.process as any) ?? [],
        fitsYou: (dbService.fitsYou as any) ?? [],
        notFitsYou: (dbService.notFitsYou as any) ?? [],
        faqs: (dbService.faqs as any) ?? [],
        seoTitle: dbService.seoTitle ?? dbService.title,
        seoDescription: dbService.seoDescription ?? "",
        __fromDb: true,
      }
    }
  } catch {}

  const staticService = getStaticService(slug)
  if (staticService) return { ...staticService, __fromDb: false }
  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getService(params.slug)
  if (!service) return { title: "Service Not Found" }
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const service = await getService(params.slug)
  if (!service) notFound()

  const descBlock = service.__fromDb ? (
    <div
      className="post-content text-base md:text-lg text-ink-2 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: service.fullDescription }}
    />
  ) : (
    <p className="text-base md:text-lg text-ink-2 leading-relaxed">
      {service.fullDescription}
    </p>
  )

  return (
    <PageShell>
      <HeroSection
        pill={service.heroLabel}
        heading={service.heroHeading}
        sub={service.heroSub}
        primaryCta={{ label: siteConfig.cta.primary, href: siteConfig.calendlyUrl, external: true }}
        metaStrip={[
          { key: "Tier", value: service.tier },
          { key: "Pricing", value: service.pricing },
          { key: "Min engagement", value: service.minEngagement },
          { key: "Methodology", value: "Koray-aligned" },
        ]}
      />

      <section className="py-20 px-8 bg-bg">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="section-label mb-6">What this engagement is</span>
              <h2 className="h2-display italic-accent mb-6">
                Methodology. <em>Not tactics.</em>
              </h2>
              {descBlock}
            </div>

            {service.deliverables && service.deliverables.length > 0 && (
              <div>
                <span className="section-label mb-6">Deliverables</span>
                <ul className="space-y-3">
                  {service.deliverables.map((d: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 pb-3 border-b border-line">
                      <span className="text-accent flex-shrink-0 mt-1">➤</span>
                      <span className="text-base text-ink-2 leading-relaxed">
                        {typeof d === "string" ? d : d.text ?? d.title ?? ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {service.process && service.process.length > 0 && (
        <section className="py-20 px-8 bg-bg-2 border-y border-line">
          <div className="max-w-content mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="section-label mb-6">Engagement process</span>
              <h2 className="h2-display italic-accent">
                How we <em>execute it.</em>
              </h2>
            </div>
            <div className="space-y-4">
              {service.process.map((step: any, idx: number) => (
                <div key={idx} className="border-l-2 border-accent pl-6 py-3 bg-bg p-6">
                  <div className="flex items-start gap-6">
                    <span className="font-display text-5xl font-medium text-accent flex-shrink-0" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-medium mb-2 italic-accent">{step.title}</h3>
                      <p className="text-base text-ink-2 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(service.fitsYou?.length > 0 || service.notFitsYou?.length > 0) && (
        <section className="py-20 px-8 bg-bg">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="section-label mb-6" style={{ color: "#15803d" }}>Fits you if</span>
                <h2 className="h2-display italic-accent mb-6">
                  You should <em>book this.</em>
                </h2>
                <ul className="space-y-3">
                  {(service.fitsYou ?? []).map((c: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent flex-shrink-0 mt-1">➤</span>
                      <span className="text-base text-ink-2 leading-relaxed">
                        {typeof c === "string" ? c : c.text ?? ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="section-label mb-6" style={{ color: "#b91c1c" }}>Doesn&apos;t fit if</span>
                <h2 className="h2-display italic-accent mb-6">
                  We&apos;re not your <em>agency.</em>
                </h2>
                <ul className="space-y-3">
                  {(service.notFitsYou ?? []).map((c: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-ink-muted flex-shrink-0 mt-1">✕</span>
                      <span className="text-base text-ink-2 leading-relaxed">
                        {typeof c === "string" ? c : c.text ?? ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 px-8 bg-bg-2 border-y border-line">
          <div className="max-w-prose mx-auto">
            <span className="section-label mb-6">Common questions</span>
            <h2 className="h2-display italic-accent mb-12">
              You probably want to <em>know.</em>
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq: any, idx: number) => (
                <details key={idx} className="border border-line bg-bg group">
                  <summary className="p-6 cursor-pointer font-display text-xl font-medium italic-accent flex items-center justify-between list-none hover:bg-bg-2 transition-colors">
                    <span>{faq.question}</span>
                    <span className="text-accent text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-base text-ink-2 leading-relaxed border-t border-line pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      <style dangerouslySetInnerHTML={{ __html: `
        .post-content h2 { font-family: var(--font-display, Fraunces, Georgia, serif); font-size: 2em; font-weight: 600; margin: 1.5em 0 0.5em; line-height: 1.2; color: #0a0a0a; }
        .post-content h3 { font-family: var(--font-display, Fraunces, Georgia, serif); font-size: 1.5em; font-weight: 600; margin: 1.2em 0 0.5em; line-height: 1.25; color: #0a0a0a; }
        .post-content h4 { font-family: var(--font-display, Fraunces, Georgia, serif); font-size: 1.2em; font-weight: 600; margin: 1em 0 0.4em; color: #0a0a0a; }
        .post-content p { margin: 0 0 1em 0; line-height: 1.7; }
        .post-content ul { list-style: disc; padding-left: 1.5em; margin: 1em 0; }
        .post-content ol { list-style: decimal; padding-left: 1.5em; margin: 1em 0; }
        .post-content li { margin: 0.3em 0; }
        .post-content blockquote { border-left: 3px solid #db4c23; padding-left: 1.2em; margin: 1.5em 0; font-style: italic; color: #6b6b65; }
        .post-content code { background: #f3f1ec; padding: 0.15em 0.4em; font-family: var(--font-mono, monospace); font-size: 0.9em; border-radius: 2px; }
        .post-content a { color: #db4c23; text-decoration: underline; }
        .post-content img { display: block; max-width: 100%; height: auto; margin: 1.5em auto; border-radius: 2px; }
        .post-content img[data-size="small"] { max-width: 25%; }
        .post-content img[data-size="medium"] { max-width: 50%; }
        .post-content img[data-size="large"] { max-width: 75%; }
        .post-content img[data-size="xlarge"] { max-width: 90%; }
        .post-content img[data-size="full"] { max-width: 100%; }
        .post-content em { color: #db4c23; font-style: italic; }
        .post-content strong { font-weight: 700; color: #0a0a0a; }
      `}} />
    </PageShell>
  )
}