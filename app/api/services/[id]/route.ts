import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const s = await prisma.service.findUnique({ where: { id: params.id } })
  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(s)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const data = {
    ...parsed.data,
    scheduledFor:
      parsed.data.scheduledFor !== undefined
        ? parsed.data.scheduledFor
          ? new Date(parsed.data.scheduledFor)
          : null
        : undefined,
  }

  const updated = await prisma.service.update({
    where: { id: params.id },
    data: data as any,
  })

  revalidatePath(`/services/${updated.slug}`)
  revalidatePath("/")
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await prisma.service.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}
