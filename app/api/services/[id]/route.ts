import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Admin API must always read live rows. Next 14 can statically cache GET
// route handlers, so we opt out explicitly.
export const dynamic = "force-dynamic"

// NOTE: templateData is intentionally NOT in this schema.
// Zod's z.object() strips unknown keys silently. That silent strip was the
// exact bug that made "Update service" lose every templateData edit: the
// client sent the new JSON, safeParse() removed it, and prisma.update()
// never received it. templateData is therefore pulled out of the request
// body BEFORE parsing and handled manually below, so it can never be
// stripped again.
const updateSchema = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  tier: z.enum(["CLAIM", "SHIELD", "SCALE"]).optional(),
  shortDescription: z.string().optional(),
  heroLabel: z.string().optional(),
  heroHeading: z.string().optional(),
  heroSub: z.string().optional(),
  pricing: z.string().optional(),
  minEngagement: z.string().nullable().optional(),
  fullDescription: z.string().optional(),
  deliverables: z.array(z.string()).optional(),
  process: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  fitsYou: z.array(z.string()).optional(),
  notFitsYou: z.array(z.string()).optional(),
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

// Postgres jsonb does not preserve object key order. A byte-for-byte
// JSON.stringify comparison between the submitted object and the row read
// back from the database can therefore fail even when the data persisted
// perfectly. These helpers compare JSON by value, ignoring key order.
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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const s = await prisma.service.findUnique({ where: { id: params.id } })
  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(s)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  // Pull templateData out BEFORE Zod parsing (see note above the schema).
  const { templateData, ...normalBody } = body as {
    templateData?: unknown
    [key: string]: unknown
  }

  const parsed = updateSchema.safeParse(normalBody)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  // templateData, when present, must be a plain JSON object.
  if (
    templateData !== undefined &&
    (templateData === null || typeof templateData !== "object" || Array.isArray(templateData))
  ) {
    return NextResponse.json({ error: "templateData must be a JSON object" }, { status: 400 })
  }

  const data: any = {
    ...parsed.data,
    scheduledFor:
      parsed.data.scheduledFor !== undefined
        ? parsed.data.scheduledFor
          ? new Date(parsed.data.scheduledFor)
          : null
        : undefined,
  }

  // CRITICAL: persist the exact JSON the editor sent.
  if (templateData !== undefined) {
    data.templateData = templateData
  }

  // ── Temporary diagnostics (safe to remove once verified) ──────────────
  const submittedPrice =
    (templateData as any)?.pricing?.amountValue ?? "(no template price in request)"
  const submittedHero =
    (templateData as any)?.hero?.headingHtml ?? "(no template hero in request)"
  console.log("[SERVICE UPDATE SERVER] id =", params.id)
  console.log("[SERVICE UPDATE SERVER] received price =", submittedPrice)
  console.log("[SERVICE UPDATE SERVER] received hero =", submittedHero)
  // ──────────────────────────────────────────────────────────────────────

  await prisma.service.update({
    where: { id: params.id },
    data,
  })

  // Read the same row straight back from the database and prove the write.
  const persisted = await prisma.service.findUnique({ where: { id: params.id } })
  if (!persisted) {
    return NextResponse.json({ error: "Service disappeared after update" }, { status: 500 })
  }

  // ── Temporary diagnostics (safe to remove once verified) ──────────────
  const persistedTemplate = persisted.templateData as any
  const persistedPrice =
    persistedTemplate?.pricing?.amountValue ?? "(no persisted template price)"
  const persistedHero =
    persistedTemplate?.hero?.headingHtml ?? "(no persisted template hero)"
  console.log("[SERVICE UPDATE DB] persisted price =", persistedPrice)
  console.log("[SERVICE UPDATE DB] persisted hero =", persistedHero)
  // ──────────────────────────────────────────────────────────────────────

  // If templateData was submitted, verify the database now contains the
  // same JSON by value (key order ignored, see canonicalJson note).
  if (
    templateData !== undefined &&
    canonicalJson(persisted.templateData) !== canonicalJson(templateData)
  ) {
    console.error("[SERVICE UPDATE DB] TEMPLATE MISMATCH: submitted JSON was not persisted")
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
  revalidatePath(`/vikingz-1000-admin/services/${persisted.id}`)
  revalidatePath("/vikingz-1000-admin/services")
  revalidatePath("/")

  // Respond with the persisted row, but echo the submitted templateData
  // object. The two are verified identical by value above; echoing the
  // submitted shape keeps the editor's own byte-for-byte JSON check
  // passing even though Postgres jsonb reorders object keys on read-back.
  const responseBody =
    templateData !== undefined ? { ...persisted, templateData } : persisted

  return NextResponse.json(responseBody)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await prisma.service.delete({ where: { id: params.id } })

  revalidatePath("/vikingz-1000-admin/services")
  revalidatePath("/")

  return new NextResponse(null, { status: 204 })
}