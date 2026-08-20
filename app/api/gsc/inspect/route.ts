import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import {
  URL_INSPECTION_DAILY_QUOTA,
  errorPayload,
  incrementInspectUsage,
  inspectUrl,
  readInspectUsage,
  requireSiteUrl,
  urlBelongsToProperty,
} from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * URL Inspection.
 *
 * Every call hits Google fresh — there is deliberately no inspection cache
 * table and no reuse of previous results. The counter below is local
 * monitoring only; Google Cloud remains the source of truth for quota.
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    const raw = typeof body?.url === "string" ? body.url.trim() : ""

    if (!raw) {
      return NextResponse.json({ error: "Enter a URL to inspect." }, { status: 400 })
    }

    let target: string
    try {
      const parsed = new URL(raw)
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        throw new Error("bad protocol")
      }
      target = parsed.toString()
    } catch {
      return NextResponse.json(
        { error: "That is not a valid URL. Include the full address, e.g. https://digitalvikingz.com/blog/example-post" },
        { status: 400 }
      )
    }

    const siteUrl = await requireSiteUrl()

    // Reject out-of-property URLs before spending Google quota on a
    // request that can only fail.
    if (!urlBelongsToProperty(target, siteUrl)) {
      return NextResponse.json(
        {
          error: `That URL is outside the selected Search Console property (${siteUrl}). Inspect a URL that belongs to this property.`,
        },
        { status: 400 }
      )
    }

    const result = await inspectUrl(siteUrl, target)
    const used = await incrementInspectUsage().catch(async () => (await readInspectUsage()).used)

    const index = result.indexStatusResult ?? {}

    return NextResponse.json({
      url: target,
      siteUrl,
      inspectedAt: new Date().toISOString(),
      inspectionResultLink: result.inspectionResultLink ?? null,
      index: {
        verdict: index.verdict ?? null,
        coverageState: index.coverageState ?? null,
        robotsTxtState: index.robotsTxtState ?? null,
        indexingState: index.indexingState ?? null,
        lastCrawlTime: index.lastCrawlTime ?? null,
        pageFetchState: index.pageFetchState ?? null,
        googleCanonical: index.googleCanonical ?? null,
        userCanonical: index.userCanonical ?? null,
        crawledAs: index.crawledAs ?? null,
        sitemap: index.sitemap ?? [],
        referringUrls: index.referringUrls ?? [],
      },
      mobileUsability: result.mobileUsabilityResult?.verdict ?? null,
      richResults: result.richResultsResult?.verdict ?? null,
      quota: { used, limit: URL_INSPECTION_DAILY_QUOTA },
    })
  } catch (err) {
    // A failed call still consumed an attempt against Google's quota.
    await incrementInspectUsage().catch(() => null)
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}
