import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  heroLabel: z.string().nullable().optional(),
  heroHeading: z.string().min(1),
  heroSub: z.string().min(1),
  body: z.string().nullable().optional(),
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
})

export async function GET() {
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } })
  return NextResponse.json(pages)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const page = await prisma.page.create({ data: parsed.data })
  const path = page.slug === "home" ? "/" : `/${page.slug}`
  revalidatePath(path)
  return NextResponse.json(page, { status: 201 })
}
