import Link from "next/link"
import { prisma } from "@/lib/db"
import DeleteWithUndo from "@/components/admin/DeleteWithUndo"

export default async function AdminServicesList() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])

  // Format helpers — force Asia/Karachi timezone (PKT) so Vercel UTC servers
  // don't render times 5 hours behind for our team in Pakistan.
  const fmtDateTime = (d: Date | string) =>
    new Date(d).toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("en-US", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  // Shared helpers so table + mobile cards stay consistent
  const renderStatus = (s: any) => {
    const status = s.status as string | undefined
    const scheduledFor = s.scheduledFor as Date | null | undefined
    if (status === "scheduled" && scheduledFor) {
      return (
        <span className="mono-pill text-accent" title={fmtDateTime(scheduledFor)}>
          ◐ Scheduled
        </span>
      )
    }
    if (status === "published" || s.published) {
      return <span className="mono-pill text-green-700">● Published</span>
    }
    return <span className="mono-pill text-ink-muted">○ Draft</span>
  }

  const renderUpdated = (s: any) => {
    const status = s.status as string | undefined
    const scheduledFor = s.scheduledFor as Date | null | undefined
    if (status === "scheduled" && scheduledFor) {
      return `Goes live ${fmtDateTime(scheduledFor)}`
    }
    return fmtDate(s.updatedAt)
  }

  return (
    <div className="max-w-7xl">
      <header className="mb-6 sm:mb-10 pb-6 border-b border-line flex items-end justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label mb-4">Content</span>
          <h1 className="h2-display italic-accent">Service <em>pages.</em></h1>
          <p className="text-base text-ink-2 mt-2">Manage all service pages. Drag to reorder (sortOrder field).</p>
        </div>
        <Link href="/vikingz-1000-admin/services/new" className="btn-primary">New service →</Link>
      </header>

      {services.length === 0 ? (
        <div className="bg-bg border border-line p-10 text-center text-ink-muted">
          <p>No services yet. Run <code className="font-mono bg-bg-3 px-2 py-1">npm run db:seed</code> to populate.</p>
        </div>
      ) : (
        <>
          {/* ============ DESKTOP / TABLET TABLE ============ */}
          <div className="hidden md:block bg-bg border border-line admin-table-wrap">
            <table className="w-full">
              <thead className="bg-bg-3 border-b border-line">
                <tr>
                  <th className="text-left px-6 py-3.5 mono-pill">Title</th>
                  <th className="text-left px-6 py-3.5 mono-pill">Tier</th>
                  <th className="text-left px-6 py-3.5 mono-pill">Slug</th>
                  <th className="text-left px-6 py-3.5 mono-pill">Status</th>
                  <th className="text-right px-6 py-3.5 mono-pill">Updated</th>
                  <th className="text-right px-6 py-3.5 mono-pill">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-line last:border-b-0 hover:bg-bg-2 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/vikingz-1000-admin/services/${s.id}`} className="font-display text-lg font-medium text-ink hover:text-accent">
                        {s.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="mono-pill text-accent">{s.tier}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-ink-muted">/services/{s.slug}</td>
                    <td className="px-6 py-4">{renderStatus(s)}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-ink-muted whitespace-nowrap">
                      {renderUpdated(s)}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/vikingz-1000-admin/services/${s.id}`}
                        className="font-mono text-xs uppercase tracking-widest font-bold text-accent hover:underline"
                      >
                        Edit →
                      </Link>
                      <DeleteWithUndo
                        itemId={s.id}
                        itemLabel="service"
                        itemName={s.title}
                        apiPath="/api/services"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============ MOBILE CARDS ============ */}
          <ul className="md:hidden space-y-3">
            {services.map((s) => (
              <li key={s.id} className="bg-bg border border-line p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <Link
                    href={`/vikingz-1000-admin/services/${s.id}`}
                    className="font-display text-lg font-medium text-ink hover:text-accent break-words"
                  >
                    {s.title}
                  </Link>
                  <span className="mono-pill text-accent shrink-0">{s.tier}</span>
                </div>

                <div className="font-mono text-sm text-ink-muted mb-3 break-all">/services/{s.slug}</div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                  {renderStatus(s)}
                  <span className="font-mono text-xs text-ink-muted">{renderUpdated(s)}</span>
                </div>

                <div className="flex items-center justify-between border-t border-line pt-3">
                  <Link
                    href={`/vikingz-1000-admin/services/${s.id}`}
                    className="font-mono text-xs uppercase tracking-widest font-bold text-accent hover:underline"
                  >
                    Edit →
                  </Link>
                  <DeleteWithUndo
                    itemId={s.id}
                    itemLabel="service"
                    itemName={s.title}
                    apiPath="/api/services"
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}