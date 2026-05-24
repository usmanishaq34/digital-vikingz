import Link from "next/link"
import { prisma } from "@/lib/db"

export default async function AdminDashboard() {
  const [pageCount, postCount, serviceCount] = await Promise.all([
    prisma.page.count().catch(() => 0),
    prisma.post.count().catch(() => 0),
    prisma.service.count().catch(() => 0),
  ])

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl">
      <header className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-line">
        <h1 className="h2-display italic-accent">
          Welcome <em>back.</em>
        </h1>
        <p className="text-base text-ink-2 mt-2">Manage every piece of your website from here.</p>
      </header>

      {/* Quick Stats */}
      <section className="mb-12">
        <h2 className="mono-label mb-5">At a glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line">
          <StatCard label="Pages" count={pageCount} href="/vikingz-1000-admin/pages" />
          <StatCard label="Blog Posts" count={postCount} href="/vikingz-1000-admin/posts" />
          <StatCard label="Services" count={serviceCount} href="/vikingz-1000-admin/services" />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <h2 className="mono-label mb-5">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/vikingz-1000-admin/posts/new" className="btn-primary">+ New Post</Link>
          <Link href="/vikingz-1000-admin/services/new" className="btn-ghost">+ New Service</Link>
          <Link href="/vikingz-1000-admin/settings" className="btn-ghost">Edit Settings</Link>
        </div>
      </section>

      {/* Help */}
      <section>
        <h2 className="mono-label mb-5">Where to edit</h2>
        <div className="bg-bg border border-line p-4 sm:p-6">
          <ul className="space-y-3 text-sm text-ink-2">
            <li className="flex items-start gap-3"><span className="text-accent mt-0.5">➤</span><span><strong>Page hero text</strong> → Pages → click any page → edit fields</span></li>
            <li className="flex items-start gap-3"><span className="text-accent mt-0.5">➤</span><span><strong>Blog posts</strong> → Posts → New Post or edit existing</span></li>
            <li className="flex items-start gap-3"><span className="text-accent mt-0.5">➤</span><span><strong>Service pricing &amp; content</strong> → Services → click any service</span></li>
            <li className="flex items-start gap-3"><span className="text-accent mt-0.5">➤</span><span><strong>Email, Calendly, social URLs</strong> → Settings</span></li>
            <li className="flex items-start gap-3"><span className="text-accent mt-0.5">➤</span><span><strong>Founder photo, logo</strong> → Media Library</span></li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, count, href }: { label: string; count: number; href: string }) {
  return (
    <Link href={href} className="bg-bg p-6 hover:bg-bg-2 transition-colors group block">
      <span className="mono-pill text-ink-muted block mb-2">{label}</span>
      <span className="font-display text-4xl sm:text-5xl font-medium text-ink group-hover:text-accent transition-colors block">{count}</span>
    </Link>
  )
}