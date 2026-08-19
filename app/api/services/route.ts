import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// This file serves the COLLECTION endpoint only:
//   GET  /api/services   -> list all services
//   POST /api/services   -> create a new service
//
// Individual service GET/PATCH/DELETE live in app/api/services/[id]/route.ts.
// Handlers that expect params.id must never be placed here: at /api/services
// Next.js passes no dynamic params, so params.id is always undefined and the
// handler is dead code. That misplacement is exactly what broke the previous
// attempt (and it also deleted this POST, which broke service creation).

export const dynamic = "force-dynamic"

// NOTE: templateData is intentionally NOT in this schema.
// Zod's z.object() strips unknown keys silently, so templateData is pulled
// out of the request body before parsing and handled manually below. This
// guarantees the JSON template can never be dropped by validation.
const createSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tier: z.enum(["CLAIM", "SHIELD", "SCALE"]),
  shortDescription: z.string().min(1),
  heroLabel: z.string().min(1),
  heroHeading: z.string().min(1),
  heroSub: z.string().min(1),
  pricing: z.string().min(1),
  minEngagement: z.string().nullable().optional(),
  fullDescription: z.string().min(1),
  deliverables: z.array(z.string()),
  process: z.array(z.object({ title: z.string(), description: z.string() })),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  fitsYou: z.array(z.string()),
  notFitsYou: z.array(z.string()),
  featuredImage: z.string().nullable().optional(),
  featuredImageAlt: z.string().nullable().optional(),
  featuredImageTitle: z.string().nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  focusKeyword: z.string().nullable().optional(),
  canonicalUrl: z.string().nullable().optional(),
  noindex: z.boolean().optional(),
  nofollow: z.boolean().optional(),
  ogTitle: z.string().nullable().optional(),
  ogDescription: z.string().nullable().optional(),
  ogImage: z.string().nullable().optional(),
  twitterTitle: z.string().nullable().optional(),
  twitterDescription: z.string().nullable().optional(),
  twitterImage: z.string().nullable().optional(),
  schemaType: z.string().nullable().optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().optional(),
  status: z.enum(["draft", "scheduled", "published"]).optional(),
  scheduledFor: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
})

// Postgres jsonb does not preserve object key order, so persistence is
// verified by value rather than by raw string comparison.
function sortKeysDeep(value: any): any {
  if (Array.isArray(value)) return value.map(sortKeysDeep)
  if (value && typeof value === "object") {
    const out: Record<string, any> = {}
    for (const key of Object.keys(value).sort()) out[key] = sortKeysDeep(value[key])
    return out
  }
  return value
}

function canonicalJson(value: unknown): string {
  return JSON.stringify(sortKeysDeep(value))
}

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } })
  return NextResponse.json(services)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  // Pull templateData out BEFORE Zod parsing (see note above the schema).
  const { templateData, ...normalBody } = body as {
    templateData?: unknown
    [key: string]: unknown
  }

  const parsed = createSchema.safeParse(normalBody)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  if (
    templateData !== undefined &&
    (templateData === null || typeof templateData !== "object" || Array.isArray(templateData))
  ) {
    return NextResponse.json({ error: "templateData must be a JSON object" }, { status: 400 })
  }

  const data: any = {
    ...parsed.data,
    scheduledFor: parsed.data.scheduledFor ? new Date(parsed.data.scheduledFor) : null,
  }

  // CRITICAL: persist the exact JSON the editor sent.
  if (templateData !== undefined) {
    data.templateData = templateData
  }

  // ── Temporary diagnostics (safe to remove once verified) ──────────────
  const submittedPrice =
    (templateData as any)?.pricing?.amountValue ?? "(no template price in request)"
  console.log("[SERVICE CREATE SERVER] received price =", submittedPrice)
  // ──────────────────────────────────────────────────────────────────────

  const created = await prisma.service.create({ data })

  // Read the row straight back from the database and prove the write.
  const persisted = await prisma.service.findUnique({ where: { id: created.id } })
  if (!persisted) {
    return NextResponse.json({ error: "Service disappeared after create" }, { status: 500 })
  }

  // ── Temporary diagnostics (safe to remove once verified) ──────────────
  const persistedPrice =
    (persisted.templateData as any)?.pricing?.amountValue ?? "(no persisted template price)"
  console.log("[SERVICE CREATE DB] persisted price =", persistedPrice)
  // ──────────────────────────────────────────────────────────────────────

  if (
    templateData !== undefined &&
    canonicalJson(persisted.templateData) !== canonicalJson(templateData)
  ) {
    console.error("[SERVICE CREATE DB] TEMPLATE MISMATCH: submitted JSON was not persisted")
    return NextResponse.json(
      {
        error: "templateData did not persist exactly as submitted",
        submittedPrice,
        persistedPrice,
      },
      { status: 500 }
    )
  }

  revalidatePath(`/services/${persisted.slug}`)
  revalidatePath("/vikingz-1000-admin/services")
  revalidatePath("/")

  // Echo the submitted templateData shape (verified identical by value)
  // so client-side JSON comparisons are immune to jsonb key reordering.
  const responseBody =
    templateData !== undefined ? { ...persisted, templateData } : persisted

  return NextResponse.json(responseBody, { status: 201 })
}