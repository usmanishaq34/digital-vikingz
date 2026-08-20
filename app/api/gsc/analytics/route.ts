import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { AnalyticsRow, dateRange, errorPayload, requireSiteUrl, searchAnalytics } from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ALLOWED_RANGES = [7, 28, 90] as const

/**
 * Search Analytics.
 *
 * Fetched fresh from Google on every request — no analytics cache table.
 * Note that Search Console finalises data on a ~2-3 day lag, so the last
 * couple of days will always read low. The UI labels this.
 */
export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const requested = Number(searchParams.get("days") ?? 28)
    const days = (ALLOWED_RANGES as readonly number[]).includes(requested) ? requested : 28

    const siteUrl = await requireSiteUrl()
    const range = dateRange(days)

    const shape = (rows: AnalyticsRow[]) =>
      rows.map((r) => ({
        key: r.keys?.[0] ?? "",
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      }))

    // Five parallel queries. Search Analytics quota is generous
    // (1,200/min per site), so this is comfortably within limits.
    const [totalsRows, pageRows, queryRows, deviceRows, countryRows] = await Promise.all([
      searchAnalytics(siteUrl, { ...range }),
      searchAnalytics(siteUrl, { ...range, dimensions: ["page"], rowLimit: 25 }),
      searchAnalytics(siteUrl, { ...range, dimensions: ["query"], rowLimit: 25 }),
      searchAnalytics(siteUrl, { ...range, dimensions: ["device"], rowLimit: 10 }),
      searchAnalytics(siteUrl, { ...range, dimensions: ["country"], rowLimit: 10 }),
    ])

    const totals = totalsRows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 }

    return NextResponse.json({
      siteUrl,
      days,
      startDate: range.startDate,
      endDate: range.endDate,
      fetchedAt: new Date().toISOString(),
      totals: {
        clicks: totals.clicks ?? 0,
        impressions: totals.impressions ?? 0,
        ctr: totals.ctr ?? 0,
        position: totals.position ?? 0,
      },
      pages: shape(pageRows),
      queries: shape(queryRows),
      devices: shape(deviceRows),
      countries: shape(countryRows),
    })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}
