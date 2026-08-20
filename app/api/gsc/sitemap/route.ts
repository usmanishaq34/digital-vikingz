import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import {
  defaultSitemapUrl,
  errorPayload,
  getSitemap,
  requireSiteUrl,
  submitSitemap,
  upsertConnection,
} from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Live sitemap status, read from Google on every request.
 * Uses the site's existing /sitemap.xml — no second sitemap is created.
 */
export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const siteUrl = await requireSiteUrl()
    const feedpath = defaultSitemapUrl()
    const sitemap = await getSitemap(siteUrl, feedpath)

    return NextResponse.json({
      siteUrl,
      feedpath,
      submitted: Boolean(sitemap),
      sitemap: sitemap
        ? {
            path: sitemap.path,
            lastSubmitted: sitemap.lastSubmitted ?? null,
            lastDownloaded: sitemap.lastDownloaded ?? null,
            isPending: sitemap.isPending ?? false,
            isSitemapsIndex: sitemap.isSitemapsIndex ?? false,
            type: sitemap.type ?? null,
            // Google returns these as string-encoded integers.
            warnings: Number(sitemap.warnings ?? 0),
            errors: Number(sitemap.errors ?? 0),
            contents: sitemap.contents ?? [],
          }
        : null,
    })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}

/** Manual re-submit. Never called automatically on publish. */
export async function POST() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const siteUrl = await requireSiteUrl()
    const feedpath = defaultSitemapUrl()

    await submitSitemap(siteUrl, feedpath)
    await upsertConnection({ sitemapPath: feedpath, sitemapSubmittedAt: new Date() })

    return NextResponse.json({
      ok: true,
      feedpath,
      message: "Sitemap re-submitted to Google. Status can take a few minutes to update.",
    })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}
