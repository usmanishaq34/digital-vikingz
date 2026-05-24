import Link from "next/link"
import PageEditorForm from "@/components/admin/PageEditorForm"

export default function AdminPageNew() {
  const emptyPage = {
    id: "",
    slug: "",
    title: "",
    heroLabel: null,
    heroHeading: "",
    heroSub: "",
    body: null,
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
    schemaType: "WebPage",
    published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className="max-w-7xl">
      <header className="mb-8 pb-6 border-b border-line">
        <Link
          href="/vikingz-1000-admin/pages"
          className="mono-pill text-ink-muted hover:text-accent mb-3 inline-block"
        >
          ← Back to pages
        </Link>
        <h1 className="h2-display italic-accent">New <em>page.</em></h1>
        <p className="text-base text-ink-2 mt-2">
          Create a custom page. The slug determines the URL (e.g. slug{" "}
          <code className="font-mono bg-bg-3 px-1.5">careers</code> → /careers).
        </p>
      </header>

      <PageEditorForm page={emptyPage as any} isNew />
    </div>
  )
}
