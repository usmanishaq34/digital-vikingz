import Link from "next/link"
import { prisma } from "@/lib/db"

export default async function AdminPagesList() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
  }).catch(() => [])

  return (
    <div className="max-w-5xl">
      <header className="mb-6 sm:mb-10 pb-6 border-b border-line flex items-end justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label mb-4">Content</span>
          <h1 className="h2-display italic-accent">Marketing <em>pages.</em></h1>
          <p className="text-base text-ink-2 mt-2">
            Edit hero text, body content, and SEO for each public page. Create custom pages with any URL slug.
          </p>
        </div>
        <Link href="/vikingz-1000-admin/pages/new" className="btn-primary">
          New page →
        </Link>
      </header>

      {pages.length === 0 ? (
        <div className="bg-bg border border-line p-10 text-center text-ink-muted">
          <p className="mb-3">No pages found in database.</p>
          <p className="text-sm">Run <code className="font-mono bg-bg-3 px-2 py-1">npm run db:seed</code> to populate.</p>
        </div>
      ) : (
        <>
          {/* ============ DESKTOP / TABLET TABLE ============ */}
          <div className="hidden md:block bg-bg border border-line admin-table-wrap">
            <table className="w-full">
              <thead className="bg-bg-3 border-b border-line">
                <tr>
                  <th className="text-left px-6 py-3.5 mono-pill">Title</th>
                  <th className="text-left px-6 py-3.5 mono-pill">Slug</th>
                  <th className="text-left px-6 py-3.5 mono-pill">Status</th>
                  <th className="text-right px-6 py-3.5 mono-pill">Last edited</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-b-0 hover:bg-bg-2 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/vikingz-1000-admin/pages/${p.id}`} className="font-display text-lg font-medium text-ink hover:text-accent">
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-ink-muted">/{p.slug === "home" ? "" : p.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`mono-pill ${p.published ? "text-green-700" : "text-ink-muted"}`}>
                        {p.published ? "● Published" : "○ Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-ink-muted">
                      {p.updatedAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============ MOBILE CARDS ============ */}
          <ul className="md:hidden space-y-3">
            {pages.map((p) => (
              <li key={p.id} className="bg-bg border border-line p-4">
                <Link
                  href={`/vikingz-1000-admin/pages/${p.id}`}
                  className="font-display text-lg font-medium text-ink hover:text-accent break-words"
                >
                  {p.title}
                </Link>

                <div className="font-mono text-sm text-ink-muted mt-1 break-all">
                  /{p.slug === "home" ? "" : p.slug}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
                  <span className={`mono-pill ${p.published ? "text-green-700" : "text-ink-muted"}`}>
                    {p.published ? "● Published" : "○ Draft"}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    {p.updatedAt.toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}