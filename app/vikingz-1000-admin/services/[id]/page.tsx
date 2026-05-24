import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import ServiceEditorForm from "@/components/admin/ServiceEditorForm"

export default async function AdminServiceEdit({ params }: { params: { id: string } }) {
  const [service, categories] = await Promise.all([
    prisma.service.findUnique({ where: { id: params.id } }).catch(() => null),
    prisma.category.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }).catch(() => []),
  ])
  if (!service) notFound()

  return (
    <div className="max-w-7xl">
      <header className="mb-8 pb-6 border-b border-line">
        <Link href="/vikingz-1000-admin/services" className="mono-pill text-ink-muted hover:text-accent mb-3 inline-block">
          ← Back to services
        </Link>
        <h1 className="h2-display italic-accent">Edit <em>{service.title}</em></h1>
        <p className="font-mono text-xs text-ink-muted mt-2">/services/{service.slug}</p>
      </header>

      <ServiceEditorForm service={service} categories={categories} />
    </div>
  )
}
