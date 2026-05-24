import clsx from "clsx"

interface MetaCell {
  key: string
  value: string
}

interface HeroSectionProps {
  pill: string
  heading: string // HTML allowed for <em>
  sub: string
  primaryCta?: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  metaStrip?: MetaCell[]
  className?: string
}

export default function HeroSection({
  pill,
  heading,
  sub,
  primaryCta,
  secondaryCta,
  metaStrip,
  className,
}: HeroSectionProps) {
  return (
    <section className={clsx("relative pt-40 pb-24 px-8 overflow-hidden", className)}>
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-content mx-auto relative z-10">
        <span className="section-label mb-6">{pill}</span>

        <h1
          className="h1-display max-w-5xl mb-7 italic-accent"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        <p className="text-base md:text-lg text-ink-2 max-w-3xl leading-relaxed mb-10">
          {sub}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-4">
            {primaryCta && (
              <a
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
                className="btn-primary"
              >
                {primaryCta.label} →
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                target={secondaryCta.external ? "_blank" : undefined}
                rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                className="btn-ghost"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}

        {metaStrip && metaStrip.length > 0 && (
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border border-line">
            {metaStrip.map((cell, idx) => (
              <div
                key={idx}
                className={clsx(
                  "px-6 py-5 flex flex-col gap-1",
                  idx < metaStrip.length - 1 && "border-b md:border-b-0 md:border-r border-line",
                  idx === metaStrip.length - 2 && "md:border-b-0"
                )}
              >
                <span className="mono-pill text-ink-muted">{cell.key}</span>
                <span className="font-display text-base font-medium text-ink" style={{ letterSpacing: "-0.01em" }}>
                  {cell.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
