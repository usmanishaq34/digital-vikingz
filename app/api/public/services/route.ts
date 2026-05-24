import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Force dynamic so newly published services appear immediately
export const dynamic = "force-dynamic"
export const revalidate = 0

/**
 * Public endpoint that returns all published services.
 * Used by ClientFixes.tsx to inject dashboard-created services
 * into the inline navigation dropdowns across the site.
 */
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        OR: [{ status: "published" } as any, { published: true }],
      },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        heroLabel: true,
        tier: true,
      },
    })

    return NextResponse.json(
      { services },
      {
        headers: {
          // Don't cache — newly published services should appear instantly
          "Cache-Control": "no-store, max-age=0",
        },
      }
    )
  } catch (err) {
    console.error("[/api/public/services] error:", err)
    return NextResponse.json({ services: [] }, { status: 200 })
  }
}
