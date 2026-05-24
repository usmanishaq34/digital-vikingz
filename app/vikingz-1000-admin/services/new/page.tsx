import Link from "next/link"
import ServiceEditorForm from "@/components/admin/ServiceEditorForm"
import { prisma } from "@/lib/db"

export default async function AdminServiceNew() {
  const categories = await prisma.category
    .findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
    .catch(() => [])

  // Pass a default empty service template
  const emptyService = {
    id: "",
    slug: "",
    title: "",
    tier: "CLAIM" as const,
    shortDescription: "",
    heroLabel: "",
    heroHeading: "",
    heroSub: "",
    pricing: "Custom · scoped per engagement",
    minEngagement: "6 months",
    fullDescription: "",
    deliverables: [],
    process: [],
    faqs: [],
    fitsYou: [],
    notFitsYou: [],
    featuredImage: null,
    featuredImageAlt: null,
    featuredImageTitle: null,
    seoTitle: null,
    seoDescription: null,
    focusKeyword: null,
    canonicalUrl: null,
    noindex: false,
    nofollow: false,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    twitterTitle: null,
    twitterDescription: null,
    twitterImage: null,
    schemaType: "Service",
    published: false,
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className="max-w-7xl">
      <header className="mb-8 pb-6 border-b border-line">
        <Link href="/vikingz-1000-admin/services" className="mono-pill text-ink-muted hover:text-accent mb-3 inline-block">
          ← Back to services
        </Link>
        <h1 className="h2-display italic-accent">New <em>service.</em></h1>
        <p className="text-base text-ink-2 mt-2">Build a new service page.</p>
      </header>

      <ServiceEditorForm service={emptyService as any} categories={categories} isNew />
    </div>
  )
}
