import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import {
  URL_INSPECTION_DAILY_QUOTA,
  URL_INSPECTION_PER_MINUTE_QUOTA,
  defaultSitemapUrl,
  getConnection,
  gscEnvStatus,
  readInspectUsage,
} from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Connection state for the admin panel. Never returns tokens. */
export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const env = gscEnvStatus()
  const conn = await getConnection().catch(() => null)
  const usage = await readInspectUsage().catch(() => ({ used: 0, day: "" }))

  return NextResponse.json({
    envOk: env.ok,
    envMessage: env.message ?? null,
    connected: Boolean(conn?.refreshTokenEnc),
    siteUrl: conn?.siteUrl ?? null,
    connectedAt: conn?.connectedAt ?? null,
    sitemapUrl: defaultSitemapUrl(),
    quota: {
      used: usage.used,
      limit: URL_INSPECTION_DAILY_QUOTA,
      perMinuteLimit: URL_INSPECTION_PER_MINUTE_QUOTA,
      day: usage.day,
      lastError: conn?.lastQuotaError ?? null,
      lastErrorAt: conn?.lastQuotaErrorAt ?? null,
      lastSource: conn?.lastQuotaSource ?? null,
    },
  })
}
