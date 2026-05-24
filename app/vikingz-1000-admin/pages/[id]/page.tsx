import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import PageEditorForm from "@/components/admin/PageEditorForm"

export default async function AdminPageEditor({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } }).catch(() => null)
  if (!page) notFound()

  return (
    <div className="max-w-4xl">
      <header className="mb-8 pb-6 border-b border-line">
        <Link href="/vikingz-1000-admin/pages" className="mono-pill text-ink-muted hover:text-accent mb-3 inline-block">
          ← Back to pages
        </Link>
        <h1 className="h2-display italic-accent">Edit <em>{page.title}</em></h1>
        <p className="font-mono text-xs text-ink-muted mt-2">/{page.slug === "home" ? "" : page.slug}</p>
      </header>

      <PageEditorForm page={page} />
    </div>
  )
}
