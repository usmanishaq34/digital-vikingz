import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const tierSchema = z.enum(["CLAIM", "SHIELD", "SCALE"])

const createSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tier: tierSchema,
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

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } })
  return NextResponse.json(services)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const data = {
    ...parsed.data,
    scheduledFor: parsed.data.scheduledFor ? new Date(parsed.data.scheduledFor) : null,
  }
  const service = await prisma.service.create({ data: data as any })
  revalidatePath("/services/[slug]", "page")
  revalidatePath("/")
  return NextResponse.json(service, { status: 201 })
}
