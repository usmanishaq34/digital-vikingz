import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PageShell from "@/components/marketing/PageShell"
import { prisma } from "@/lib/db"

interface PageProps {
  params: { slug: string }
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const cats = await prisma.category.findMany({ select: { slug: true } })
    return cats.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

async function fetchCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug } }).catch(() => null)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await fetchCategory(params.slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: category.seoTitle ?? `${category.name} — Insights`,
    description: category.seoDescription ?? `Methodology essays in the ${category.name} category.`,
  }
}

export default async function CategoryArchivePage({ params }: PageProps) {
  const category = await fetchCategory(params.slug)
  if (!category) notFound()

  const [categoryPosts, allCategories] = await Promise.all([
    prisma.post
      .findMany({
        where: { published: true, categoryId: category.id },
        orderBy: { publishedAt: "desc" },
      })
      .catch(() => []),
    prisma.category.findMany({ orderBy: { name: "asc" } }).catch(() => []),
  ])

  return (
    <PageShell>
      <section className="pt-40 pb-24 px-8 bg-bg relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-content mx-auto relative z-10">
          <header className="mb-16 pb-12 border-b border-line">
            <span className="section-label mb-6">Category</span>
            <h1 className="h1-display italic-accent mb-7 max-w-5xl">
              {category.name} <em>essays</em>
            </h1>
            <p className="text-base md:text-lg text-ink-2 max-w-3xl leading-relaxed">
              {category.description ?? `Methodology essays in the ${category.name} category. Each piece earns its place — no AI-generated filler, no tactical guides, no listicles.`}
            </p>

            <div className="flex gap-3 flex-wrap mt-8">
              <Link href="/blog" className="font-mono text-xs uppercase tracking-widest font-bold px-4 py-2 border border-line-strong text-ink hover:border-accent hover:bg-accent hover:text-white transition-colors">
                All
              </Link>
              {allCategories.map((cat) => {
                const isActive = cat.id === category.id
                return (
                  <Link
                    key={cat.id}
                    href={`/blog/category/${cat.slug}`}
                    className={`font-mono text-xs uppercase tracking-widest font-bold px-4 py-2 border transition-colors ${
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-line-strong text-ink hover:border-accent hover:bg-accent hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </Link>
                )
              })}
            </div>
          </header>

          {categoryPosts.length === 0 ? (
            <div className="p-20 border border-dashed border-line text-center">
              <p className="text-ink-muted">
                No posts in this category yet. <Link href="/blog" className="text-accent underline">Browse all insights</Link>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-bg border border-line hover:border-accent transition-all hover:-translate-y-1 hover:shadow-xl no-underline overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-bg-3 to-bg-2 flex items-center justify-center">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.featuredImageAlt ?? post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display italic font-light text-6xl text-accent" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}>
                        {post.title.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-7 flex flex-col gap-3.5 flex-1">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold text-ink-muted">
                      <span className="text-accent">{category.name}</span>
                      <span className="w-1 h-1 rounded-full bg-line-strong" />
                      <span>{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <h2 className="font-display text-2xl font-medium leading-tight italic-accent text-ink group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {post.excerpt.length > 140 ? post.excerpt.slice(0, 140) + "…" : post.excerpt}
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-accent pt-3 border-t border-dashed border-line">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  )
}
