import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PageShell from "@/components/marketing/PageShell"
import { prisma } from "@/lib/db"
import { siteConfig } from "@/data/site-content"

interface PageProps {
  params: { slug: string }
}

export const revalidate = 60

function slugifyCat(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-")
}

async function fetchPost(slug: string) {
  return prisma.post
    .findUnique({
      where: { slug },
      include: { category: true },
    })
    .catch(() => null)
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await fetchPost(params.slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    robots: { index: !post.noindex, follow: !post.nofollow },
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      title: post.ogTitle ?? post.seoTitle ?? post.title,
      description: post.ogDescription ?? post.seoDescription ?? post.excerpt,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitterTitle ?? post.ogTitle ?? post.title,
      description: post.twitterDescription ?? post.ogDescription ?? post.seoDescription ?? post.excerpt,
      images: post.twitterImage ? [post.twitterImage] : undefined,
    },
  }
}

export default async function SinglePostPage({ params }: PageProps) {
  const post = await fetchPost(params.slug)
  if (!post || !post.published) notFound()

  // Related posts: same category, excluding current, max 3
  const relatedPosts = await prisma.post
    .findMany({
      where: {
        published: true,
        slug: { not: params.slug },
        categoryId: post.categoryId ?? undefined,
      },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    })
    .catch(() => [])

  const categoryName = post.category?.name ?? "Methodology"
  const categorySlug = post.category?.slug ?? slugifyCat(categoryName)

  return (
    <PageShell>
      <article className="pt-40 pb-24 px-8 bg-bg">
        <div className="max-w-prose mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-widest text-ink-muted font-semibold flex-wrap">
            <Link href="/" className="text-ink-muted hover:text-accent transition-colors">Home</Link>
            <span className="text-accent">/</span>
            <Link href="/blog" className="text-ink-muted hover:text-accent transition-colors">Insights</Link>
            <span className="text-accent">/</span>
            <span>{post.title.slice(0, 40)}{post.title.length > 40 ? "…" : ""}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-widest font-bold text-ink-muted flex-wrap">
            <Link href={`/blog/category/${categorySlug}`} className="text-accent hover:underline">
              {categoryName}
            </Link>
            <span className="w-1 h-1 rounded-full bg-line-strong" />
            <span>{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            {post.readingTimeMinutes ? (
              <>
                <span className="w-1 h-1 rounded-full bg-line-strong" />
                <span>{post.readingTimeMinutes} min read</span>
              </>
            ) : null}
          </div>

          {/* Title */}
          <h1 className="h1-display italic-accent mb-12" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            {post.title}
          </h1>

          {/* Featured image */}
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt ?? post.title}
              title={post.featuredImageTitle ?? undefined}
              className="w-full mb-10"
              style={{ borderRadius: "2px" }}
            />
          )}

          {/* Content with drop cap on first paragraph */}
          <div
            className="post-content prose-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 mb-12">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 border border-line text-ink-2 hover:border-accent hover:text-accent transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="bg-bg-2 border border-line border-l-4 border-l-accent p-9 my-12">
            <h3 className="h3-display italic-accent mb-3">
              Want this <em>methodology</em> applied to your site?
            </h3>
            <p className="text-sm text-ink-2 leading-relaxed mb-5">
              Book a 30-minute strategy call. No pitch deck — methodology fit assessment, scope direction, and honest answers about whether we&apos;re the right partner.
            </p>
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book Strategy Call →
            </a>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-8 bg-bg-2 border-t border-line">
          <div className="max-w-content mx-auto">
            <h3 className="h2-display italic-accent mb-12" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
              More <em>methodology essays</em>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col bg-bg border border-line hover:border-accent transition-all hover:-translate-y-1 hover:shadow-xl no-underline overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-bg-3 to-bg-2 flex items-center justify-center">
                    {rp.featuredImage ? (
                      <img src={rp.featuredImage} alt={rp.featuredImageAlt ?? rp.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display italic font-light text-5xl text-accent" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}>
                        {rp.title.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">{rp.category?.name ?? "Methodology"}</span>
                    <h4 className="font-display text-lg font-medium leading-tight italic-accent group-hover:text-accent transition-colors">
                      {rp.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .post-content {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text-2);
        }
        .post-content p { margin: 0 0 24px 0; }
        .post-content p:first-child::first-letter {
          font-family: var(--font-display);
          font-size: 4em;
          float: left;
          line-height: 0.95;
          margin-right: 12px;
          margin-top: 4px;
          color: var(--accent);
          font-style: italic;
          font-variation-settings: "SOFT" 100, "opsz" 144;
        }
        .post-content h2 {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(28px, 3.5vw, 40px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 56px 0 20px 0;
          padding-top: 32px;
          border-top: 1px solid var(--line);
        }
        .post-content h2 em {
          font-style: italic;
          color: var(--accent);
          font-variation-settings: "SOFT" 100, "opsz" 144;
        }
        .post-content h3 {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(22px, 2.5vw, 28px);
          line-height: 1.3;
          color: var(--text);
          margin: 40px 0 16px 0;
        }
        .post-content h3 em {
          font-style: italic;
          color: var(--accent);
          font-variation-settings: "SOFT" 100, "opsz" 144;
        }
        .post-content strong { color: var(--accent); font-weight: 600; }
        .post-content ul, .post-content ol { margin: 0 0 24px 24px; }
        .post-content li { margin-bottom: 10px; }
        .post-content blockquote {
          margin: 36px 0;
          padding: 28px 32px;
          background: var(--bg-2);
          border-left: 3px solid var(--accent);
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(20px, 2vw, 24px);
          line-height: 1.45;
          color: var(--text);
          font-variation-settings: "SOFT" 100, "opsz" 144;
        }
        .post-content blockquote p { margin: 0; }
        /* Images */
        .post-content img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 32px auto;
          border-radius: 2px;
        }
        .post-content img[data-size="small"] { max-width: 25%; }
        .post-content img[data-size="medium"] { max-width: 50%; }
        .post-content img[data-size="large"] { max-width: 75%; }
        .post-content img[data-size="xlarge"] { max-width: 90%; }
        .post-content img[data-size="full"] { max-width: 100%; }
        .post-content a { color: var(--accent); text-decoration: underline; }
        .post-content code { background: var(--bg-2); padding: 2px 6px; font-family: var(--font-mono); font-size: 0.9em; border-radius: 2px; }
      `}</style>
    </PageShell>
  )
}