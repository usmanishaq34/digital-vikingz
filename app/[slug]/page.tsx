import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import PageShell from "@/components/marketing/PageShell"
import HeroSection from "@/components/marketing/HeroSection"
import CTASection from "@/components/marketing/CTASection"

// Reserved slugs handled by their own dedicated route files
// (Next.js routing prioritizes specific routes, but we belt-and-suspender it)
const RESERVED_SLUGS = new Set([
  "about",
  "operating-manual",
  "build-process",
  "vertical-playbooks",
  "the-audit",
  "contact",
  "privacy-policy",
  "blog",
  "services",
  "login",
  "vikingz-1000-admin",
  "api",
])

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  if (RESERVED_SLUGS.has(params.slug)) return {}

  const page = await prisma.page
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null)

  if (!page) return {}

  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined,
    robots: {
      index: !page.noindex,
      follow: !page.nofollow,
    },
    alternates: page.canonicalUrl ? { canonical: page.canonicalUrl } : undefined,
    openGraph: {
      title: page.ogTitle ?? page.seoTitle ?? page.title,
      description: page.ogDescription ?? page.seoDescription ?? undefined,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.twitterTitle ?? page.ogTitle ?? page.title,
      description:
        page.twitterDescription ?? page.ogDescription ?? page.seoDescription ?? undefined,
      images: page.twitterImage ? [page.twitterImage] : undefined,
    },
  }
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string }
}) {
  // Hard guard against reserved slugs
  if (RESERVED_SLUGS.has(params.slug)) notFound()

  const page = await prisma.page
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null)

  if (!page || !page.published) notFound()

  return (
    <PageShell>
      <HeroSection
        pill={page.heroLabel ?? ""}
        heading={page.heroHeading}
        sub={page.heroSub}
      />

      {page.body && (
        <section className="py-20 px-8 bg-bg">
          <div className="max-w-prose mx-auto">
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          </div>
        </section>
      )}

      <CTASection />

      <style>{`
        .prose-content { color: var(--text-2); font-size: 17px; line-height: 1.7; }
        .prose-content h2 { font-family: var(--font-display); font-weight: 500; font-size: 28px; margin: 32px 0 16px; color: var(--text); }
        .prose-content h3 { font-family: var(--font-display); font-weight: 500; font-size: 22px; margin: 28px 0 12px; color: var(--text); }
        .prose-content p { margin: 16px 0; }
        .prose-content a { color: var(--accent); border-bottom: 1px solid currentColor; }
        .prose-content ul, .prose-content ol { margin: 16px 0 16px 24px; }
        .prose-content li { margin: 8px 0; }
        .prose-content em { color: var(--accent); font-style: italic; }
        .prose-content strong { font-weight: 600; color: var(--text); }
      `}</style>
    </PageShell>
  )
}

// Generate static paths for known custom pages at build time
export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return pages
      .filter((p) => !RESERVED_SLUGS.has(p.slug) && p.slug !== "home")
      .map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export const revalidate = 60 // ISR — pages refresh every 60s
