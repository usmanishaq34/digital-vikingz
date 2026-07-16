import Link from "next/link"
import { notFound } from "next/navigation"
import PageShell from "@/components/marketing/PageShell"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { siteConfig } from "@/data/site-content"

interface PageProps {
  params: { id: string }
}

// Never cache a preview — always show the latest saved draft.
export const dynamic = "force-dynamic"

function slugifyCat(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export default async function PreviewPostPage({ params }: PageProps) {
  // Only logged-in admins can preview drafts.
  const session = await auth()
  if (!session) notFound()

  const post = await prisma.post
    .findUnique({
      where: { id: params.id },
      include: { category: true, postAuthor: true },
    })
    .catch(() => null)

  if (!post) notFound()

  const categoryName = post.category?.name ?? "Methodology"
  const categorySlug = post.category?.slug ?? slugifyCat(categoryName)
  const author = (post as any).postAuthor as
    | { name: string; title: string | null; bio: string | null; photoUrl: string | null }
    | null

  const statusLabel =
    (post as any).status === "published" || post.published
      ? "PUBLISHED"
      : (post as any).status === "scheduled"
      ? "SCHEDULED"
      : "DRAFT"

  return (
    <PageShell>
      {/* Preview banner — only admins see this */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#0a0a0a",
          color: "#fff",
        }}
        className="px-6 py-3 flex items-center justify-between gap-4 flex-wrap"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">
          👁 Preview — status: <span style={{ color: "#db4c23" }}>{statusLabel}</span> · not indexed by search engines
        </span>
        <Link
          href={`/vikingz-1000-admin/posts/${post.id}`}
          className="font-mono text-[11px] uppercase tracking-widest underline hover:text-accent"
        >
          ← Back to editor
        </Link>
      </div>

      <article className="pt-16 pb-24 px-8 bg-bg">
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
            <span className="text-accent">{categoryName}</span>
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
          <h1 className="h1-display italic-accent mb-8" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
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

          {/* Content */}
          <div
            className="post-content prose-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 mb-12">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 border border-line text-ink-2">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author bio box */}
          {author && author.bio && (
            <div className="flex gap-4 items-start bg-bg-2 border border-line p-6 my-12">
              {author.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={author.photoUrl}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border border-line flex-shrink-0"
                />
              ) : (
                <span className="w-16 h-16 rounded-full bg-bg border border-line flex items-center justify-center font-display italic text-2xl text-accent flex-shrink-0">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">Written by</div>
                <div className="font-display text-lg font-medium text-ink">{author.name}</div>
                {author.title && (
                  <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-2">{author.title}</div>
                )}
                <p className="text-sm text-ink-2 leading-relaxed">{author.bio}</p>
              </div>
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
        .post-content h2 em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "opsz" 144; }
        .post-content h3 {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(22px, 2.5vw, 28px);
          line-height: 1.3;
          color: var(--text);
          margin: 40px 0 16px 0;
        }
        .post-content h3 em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "opsz" 144; }
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
        .post-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 32px 0;
          font-size: 15px;
        }
        .post-content th, .post-content td {
          border: 1px solid var(--line-strong);
          padding: 10px 14px;
          text-align: left;
          vertical-align: top;
        }
        .post-content th { background: var(--bg-2); font-weight: 600; color: var(--text); }
        .post-content tr:nth-child(even) td { background: var(--bg-2); }
      `}</style>
    </PageShell>
  )
}
