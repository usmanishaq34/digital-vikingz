import Link from "next/link"
import type { Service } from "@/data/services"

export default function ServiceTierCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col bg-bg border border-line hover:border-accent transition-all hover:-translate-y-1 hover:shadow-xl no-underline p-7"
    >
      <span className="mono-pill text-accent mb-4">{service.tier} Tier</span>
      <h3 className="h3-display italic-accent mb-3 group-hover:text-accent transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-ink-2 leading-relaxed mb-6 flex-1">
        {service.shortDescription}
      </p>
      <div className="pt-4 border-t border-line flex items-center justify-between">
        <span className="mono-pill text-ink-muted">{service.pricing}</span>
        <span className="mono-pill text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Learn more →
        </span>
      </div>
    </Link>
  )
}
