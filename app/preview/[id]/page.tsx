import Link from "next/link"
import { notFound } from "next/navigation"
import PageShell from "@/components/marketing/PageShell"
import { prisma } from "@/lib/db"
import TableScrollArrows from "@/components/blog/TableScrollArrows"
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

// Tables are often wider than the article column on phones. Each one is wrapped
// in a scroll container so the page layout stays intact and the reader gets a
// visible horizontal scrollbar instead of silently losing the right-hand
// columns. Content itself is never modified.
function withScrollableTables(html: string): string {
  if (!html) return ""
  return html
    .replace(
      /<table(?=[\s>])/gi,
      '<div class="dv-table-shell"><div class="dv-table-scroll"><table'
    )
    .replace(/<\/table\s*>/gi, "</table></div></div>")
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
            dangerouslySetInnerHTML={{ __html: withScrollableTables(post.content) }}
          />
          <TableScrollArrows />

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
        .post-content > p:first-child::first-letter {
          font-family: var(--display);
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
          font-family: var(--display);
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
          font-family: var(--display);
          font-weight: 500;
          font-size: clamp(22px, 2.5vw, 28px);
          line-height: 1.3;
          color: var(--text);
          margin: 40px 0 16px 0;
        }
        .post-content h3 em { font-style: italic; color: var(--accent); font-variation-settings: "SOFT" 100, "opsz" 144; }
        .post-content h4 {
          font-family: var(--display);
          font-weight: 600;
          font-size: clamp(19px, 2vw, 22px);
          line-height: 1.35;
          color: var(--text);
          margin: 34px 0 12px 0;
        }
        .post-content h4 em { font-style: italic; color: var(--accent); }
        .post-content h5 {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text);
          margin: 30px 0 10px 0;
        }
        .post-content h6 {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent);
          margin: 26px 0 8px 0;
        }
        .post-content strong { color: var(--accent); font-weight: 600; }
        .post-content blockquote {
          margin: 36px 0;
          padding: 28px 32px;
          background: var(--bg-2);
          border-left: 3px solid var(--accent);
          font-family: var(--display);
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
        .post-content code { background: var(--bg-2); padding: 2px 6px; font-family: var(--mono); font-size: 0.9em; border-radius: 2px; }
        /* Scroll arrows. Hidden until the script marks the shell scrollable,
           so a table that fits shows nothing at all. */
        .post-content .dv-table-shell { position: relative; margin: 40px 0; }
        .post-content .dv-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: var(--bg);
          color: var(--text);
          font-size: 15px;
          line-height: 1;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          box-shadow: 0 1px 5px rgba(10, 10, 10, 0.14);
          transition: color 0.15s, border-color 0.15s, opacity 0.15s;
        }
        .post-content .dv-table-shell.dv-scrollable .dv-arrow { display: flex; }
        .post-content .dv-arrow-prev { left: -15px; }
        .post-content .dv-arrow-next { right: -15px; }
        .post-content .dv-arrow:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
        }
        .post-content .dv-arrow:disabled { opacity: 0.22; cursor: default; }
        @media (max-width: 860px) {
          .post-content .dv-arrow-prev { left: 6px; }
          .post-content .dv-arrow-next { right: 6px; }
        }

        /* Horizontal scroll container injected around every table. The table
           keeps its own rounded frame; this only adds the scrolling and a
           clearly visible accent scrollbar. */
        .post-content .dv-table-scroll {
          overflow-x: auto;
          margin: 0;
          padding-bottom: 6px;
          scrollbar-width: thin;
          scrollbar-color: var(--accent) var(--bg-3);
          -webkit-overflow-scrolling: touch;
        }
        .post-content .dv-table-scroll::-webkit-scrollbar {
          height: 8px;
          -webkit-appearance: none;
        }
        .post-content .dv-table-scroll::-webkit-scrollbar-track {
          background: var(--bg-3);
          border-radius: 4px;
        }
        .post-content .dv-table-scroll::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
        }
        .post-content .dv-table-scroll > table {
          margin: 0;
          min-width: 560px;
        }
        @media (max-width: 720px) {
          .post-content .dv-table-scroll::after {
            content: "\u2192 swipe for more";
            display: block;
            position: sticky;
            left: 0;
            font-family: var(--mono);
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--text-muted);
            padding-top: 8px;
          }
        }

        /* ---------------------------------------------------------------
           Tables. Rounded frame, mono label header, horizontal rules only.
           Handles three cases: a real <th>, a TipTap table with no header
           row marked, and older hand-written tables using <thead>.
           --------------------------------------------------------------- */
        .post-content table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border: 1px solid var(--line-strong);
          border-radius: 6px;
          overflow: hidden;
          margin: 40px 0;
          font-size: 15px;
          line-height: 1.55;
        }
        .post-content td {
          border: none;
          border-bottom: 1px solid var(--line);
          padding: 13px 16px;
          text-align: left;
          vertical-align: top;
          color: var(--text-2);
        }
        .post-content tbody tr:last-child td { border-bottom: none; }

        /* Header, case 1: a real <th>. Kept as its own rule so it can never
           be dropped along with the :has() rule below. */
        .post-content table th {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          line-height: 1.4;
          color: var(--text);
          background: var(--bg-3);
          border: none;
          border-bottom: 2px solid var(--accent);
          padding: 13px 16px;
          text-align: left;
          vertical-align: middle;
        }
        /* Header, case 2: a pasted table where no header row was ever marked,
           so the first row is plain <td>. */
        .post-content table:not(:has(th)) tbody tr:first-child td {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          line-height: 1.4;
          color: var(--text);
          background: var(--bg-3);
          border: none;
          border-bottom: 2px solid var(--accent);
          padding: 13px 16px;
          text-align: left;
          vertical-align: middle;
        }
        /* Safety net for engines without :has(): a table that has a real
           <thead> keeps its first body row as ordinary data. */
        .post-content table thead ~ tbody tr:first-child td {
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          text-transform: none;
          letter-spacing: normal;
          color: var(--text);
          background: transparent;
          border-bottom: 1px solid var(--line);
          padding: 13px 16px;
          vertical-align: top;
        }

        /* <strong> inside a header must not repaint it accent-orange. */
        .post-content table th strong,
        .post-content table th em {
          color: inherit;
          font-weight: inherit;
          font-style: normal;
        }
        .post-content table:not(:has(th)) tbody tr:first-child td strong,
        .post-content table:not(:has(th)) tbody tr:first-child td em {
          color: inherit;
          font-weight: inherit;
          font-style: normal;
        }

        /* First column carries the row identity. */
        .post-content td:first-child { font-weight: 600; color: var(--text); }

        /* Cell and list-item paragraphs must not take the body-paragraph
           margin — that is what made TipTap tables and bullets look taller. */
        .post-content td > p,
        .post-content th > p,
        .post-content li > p { margin: 0; }
        .post-content td > p + p,
        .post-content th > p + p,
        .post-content li > p + p { margin-top: 8px; }

        /* The drop cap belongs to the article's opening paragraph only. */
        .post-content li::first-letter,
        .post-content li p::first-letter,
        .post-content td::first-letter,
        .post-content td p::first-letter,
        .post-content th::first-letter,
        .post-content th p::first-letter,
        .post-content blockquote p::first-letter {
          font-size: inherit;
          float: none;
          margin: 0;
          line-height: inherit;
          color: inherit;
          font-style: inherit;
          font-family: inherit;
          font-weight: inherit;
          font-variation-settings: normal;
        }

        /* Zebra striping. With the header as row 1 of tbody the data rows are
           the even ones; older <thead> tables start their data at row 1. */
        .post-content table tbody tr:nth-child(even) td { background: var(--bg-2); }
        .post-content table thead ~ tbody tr:nth-child(odd)  td { background: var(--bg-2); }
        .post-content table thead ~ tbody tr:nth-child(even) td { background: transparent; }

        /* ---------------------------------------------------------------
           Lists. Custom markers in the brand accent instead of browser
           defaults, and room to breathe.
           --------------------------------------------------------------- */
        .post-content ul { list-style: none; margin: 0 0 26px 0; padding: 0; }
        .post-content ul > li {
          position: relative;
          padding-left: 26px;
          margin-bottom: 12px;
        }
        .post-content ul > li::before {
          content: "";
          position: absolute;
          left: 4px;
          top: 0.6em;
          width: 6px;
          height: 6px;
          background: var(--accent);
          transform: rotate(45deg);
        }
        .post-content ol { list-style: none; counter-reset: dvcount; margin: 0 0 26px 0; padding: 0; }
        .post-content ol > li {
          position: relative;
          padding-left: 34px;
          margin-bottom: 12px;
          counter-increment: dvcount;
        }
        .post-content ol > li::before {
          content: counter(dvcount);
          position: absolute;
          left: 0;
          top: 0.15em;
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
        }
        .post-content li > ul,
        .post-content li > ol { margin: 12px 0 0 0; }
        .post-content li > ul > li::before { background: var(--text-muted); }
      `}</style>
    </PageShell>
  )
}
