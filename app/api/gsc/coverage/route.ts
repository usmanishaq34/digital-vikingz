import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import {
  errorPayload,
  incrementInspectUsage,
  inspectUrl,
  requireSiteUrl,
  urlBelongsToProperty,
} from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
// Batches are small, but each Google call can take a second.
export const maxDuration = 60

/** Same base URL the sitemap uses, so coverage matches what Google was sent. */
function baseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalvikingz.com"
  return raw.replace(/\/+$/, "")
}

export interface CoverageTarget {
  url: string
  type: "Page" | "Post" | "Service" | "Category"
  title: string
}

/**
 * Builds the list of URLs to check.
 *
 * Deliberately mirrors app/sitemap.ts: the point of this report is to compare
 * what the site publishes against what Google actually indexed, so the two
 * lists must be built from the same source.
 */
async function collectTargets(): Promise<CoverageTarget[]> {
  const BASE = baseUrl()
  const targets: CoverageTarget[] = []

  const staticPages: Array<[string, string]> = [
    ["", "Homepage"],
    ["/about", "About"],
    ["/contact", "Contact"],
    ["/operating-manual", "Operating Manual"],
    ["/build-process", "Build Process"],
    ["/vertical-playbooks", "Vertical Playbooks"],
    ["/the-audit", "The Audit"],
    ["/blog", "Blog index"],
    ["/privacy-policy", "Privacy Policy"],
  ]
  for (const [path, title] of staticPages) {
    targets.push({ url: `${BASE}${path}`, type: "Page", title })
  }

  const published = { OR: [{ status: "published" } as any, { published: true }] }

  try {
    const services = await prisma.service.findMany({
      where: published,
      select: { slug: true, title: true },
    })
    for (const s of services) {
      targets.push({ url: `${BASE}/services/${s.slug}`, type: "Service", title: s.title })
    }
  } catch {
    /* a missing table should not break the whole report */
  }

  try {
    const posts = await prisma.post.findMany({
      where: published,
      select: { slug: true, title: true },
    })
    for (const p of posts) {
      targets.push({ url: `${BASE}/blog/${p.slug}`, type: "Post", title: p.title })
    }
  } catch {
    /* ignore */
  }

  try {
    const categories = await prisma.category.findMany({ select: { slug: true, name: true } })
    for (const c of categories) {
      targets.push({ url: `${BASE}/blog/category/${c.slug}`, type: "Category", title: c.name })
    }
  } catch {
    /* ignore */
  }

  // De-duplicate, keeping the first label for any repeated URL.
  const seen = new Set<string>()
  return targets.filter((t) => {
    if (seen.has(t.url)) return false
    seen.add(t.url)
    return true
  })
}

/**
 * Buckets Google's coverageState into the four states that actually matter
 * when auditing whether published content made it into the index.
 */
export function bucketOf(coverageState: string | null, verdict: string | null): string {
  const s = (coverageState || "").toLowerCase()

  if (s.includes("indexed") && !s.includes("not indexed")) return "indexed"
  if (s.includes("crawled") && s.includes("not indexed")) return "crawledNotIndexed"
  if (s.includes("discovered")) return "discoveredNotIndexed"
  if (s.includes("unknown to google")) return "neverCrawled"
  if (s.includes("excluded") || s.includes("blocked") || s.includes("redirect")) return "excluded"

  if (!coverageState) {
    return verdict === "PASS" ? "indexed" : "neverCrawled"
  }
  return "excluded"
}

/** Returns the URL list only. Costs no Google quota. */
export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const siteUrl = await requireSiteUrl()
    const all = await collectTargets()

    // Drop anything outside the selected property before it can waste quota.
    const targets = all.filter((t) => urlBelongsToProperty(t.url, siteUrl))
    const skipped = all.length - targets.length

    return NextResponse.json({ siteUrl, targets, total: targets.length, skipped })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}

/**
 * Inspects one small batch.
 *
 * The client walks the list a few URLs at a time so a large site can't blow
 * the function time limit, and so progress is visible while it runs.
 * Nothing is stored — every run asks Google fresh.
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    const urls: string[] = Array.isArray(body?.urls) ? body.urls.slice(0, 5) : []

    if (urls.length === 0) {
      return NextResponse.json({ error: "No URLs supplied." }, { status: 400 })
    }

    const siteUrl = await requireSiteUrl()

    const results = await Promise.all(
      urls.map(async (url) => {
        if (!urlBelongsToProperty(url, siteUrl)) {
          return {
            url,
            bucket: "excluded",
            coverageState: "Outside selected property",
            verdict: null,
            lastCrawlTime: null,
            robotsTxtState: null,
            googleCanonical: null,
            error: null,
          }
        }

        try {
          const result = await inspectUrl(siteUrl, url)
          await incrementInspectUsage().catch(() => null)
          const index = result.indexStatusResult ?? {}

          return {
            url,
            bucket: bucketOf(index.coverageState ?? null, index.verdict ?? null),
            coverageState: index.coverageState ?? null,
            verdict: index.verdict ?? null,
            lastCrawlTime: index.lastCrawlTime ?? null,
            robotsTxtState: index.robotsTxtState ?? null,
            googleCanonical: index.googleCanonical ?? null,
            error: null,
          }
        } catch (err) {
          await incrementInspectUsage().catch(() => null)
          const message = err instanceof Error ? err.message : "Inspection failed"
          // A quota failure must stop the whole run, so flag it distinctly.
          const isQuota = /quota/i.test(message)
          return {
            url,
            bucket: "error",
            coverageState: null,
            verdict: null,
            lastCrawlTime: null,
            robotsTxtState: null,
            googleCanonical: null,
            error: message,
            quota: isQuota,
          }
        }
      })
    )

    const quotaHit = results.some((r: any) => r.quota)

    return NextResponse.json({ results, quotaHit })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}
