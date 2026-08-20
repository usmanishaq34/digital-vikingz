import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { clearConnection, resetTokenCache, revokeRefreshToken } from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Disconnects Google Search Console.
 * Revokes the grant at Google (best effort), then clears local credentials.
 * The selected property is kept so a reconnect lands on the same site.
 */
export async function POST() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await revokeRefreshToken()
  await clearConnection()
  resetTokenCache()

  return NextResponse.json({ ok: true, message: "Google Search Console disconnected." })
}
