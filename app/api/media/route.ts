import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// A GET-only route handler with no dynamic input is pre-rendered ONCE at
// build time and served frozen, which is why images uploaded after a deploy
// never appeared in the picker. This forces it to read Supabase per request.
export const dynamic = "force-dynamic"

export async function GET() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(media)
}
