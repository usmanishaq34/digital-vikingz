import { siteConfig } from "@/data/site-content"

export default function CTASection({
  heading,
  sub,
}: {
  heading?: string
  sub?: string
}) {
  const finalHeading = heading || siteConfig.cta.finalHeading
  const finalSub = sub || siteConfig.cta.finalSub

  return (
    <section className="bg-bg-2 py-24 px-8 border-y border-line">
      <div className="max-w-content mx-auto">
        <div className="max-w-3xl">
          <h2
            className="h2-display italic-accent mb-5"
            dangerouslySetInnerHTML={{ __html: finalHeading }}
          />
          <p className="text-base md:text-lg text-ink-2 leading-relaxed mb-8">
            {finalSub}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {siteConfig.cta.primary} →
            </a>
            <a
              href={siteConfig.calendlyAuditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {siteConfig.cta.audit}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
