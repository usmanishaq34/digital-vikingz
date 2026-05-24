import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const updateSchema = z.object({
  title: z.string().optional(),
  heroLabel: z.string().nullable().optional(),
  heroHeading: z.string().optional(),
  heroSub: z.string().optional(),
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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } })
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(page)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const page = await prisma.page.update({
    where: { id: params.id },
    data: parsed.data,
  })

  const path = page.slug === "home" ? "/" : `/${page.slug}`
  revalidatePath(path)
  return NextResponse.json(page)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await prisma.page.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}
