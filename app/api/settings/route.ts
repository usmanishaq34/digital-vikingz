import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function GET() {
  let settings = await prisma.settings.findFirst()
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: "singleton",
        siteTagline: "Semantic SEO authority agency. Built on Koray methodology.",
        calendlyUrl: "https://calendly.com/usmanishaqsemanticseospecialist/30min",
        calendlyAuditUrl: "https://calendly.com/usmanishaqsemanticseospecialist/30min?audit=true",
        footerTagline: "Semantic SEO authority agency built on Koray Tuğberk Gübür's methodology.",
        noPromisesDisclaimer: "No ranking guarantees · No traffic promises · Methodology only",
        ctaFinalHeading: "Want this <em>methodology</em> applied to your site?",
        ctaFinalSub: "Book a 30-minute strategy call.",
        founderShortBio: "Methodology-trained semantic SEO practitioner.",
      },
    })
  }
  return NextResponse.json(settings)
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const settings = await prisma.settings.upsert({
    where: { id: "singleton" },
    update: body,
    create: { id: "singleton", ...body },
  })

  revalidatePath("/", "layout")
  return NextResponse.json(settings)
}
