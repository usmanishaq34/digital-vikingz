"use client"

import { useState } from "react"

interface Target {
  url: string
  type: "Page" | "Post" | "Service" | "Category"
  title: string
}

interface Result {
  url: string
  bucket: string
  coverageState: string | null
  verdict: string | null
  lastCrawlTime: string | null
  robotsTxtState: string | null
  googleCanonical: string | null
  error: string | null
}

type Row = Target & Partial<Result>

const BUCKETS: Array<{ key: string; label: string; tone: string }> = [
  { key: "indexed", label: "Indexed", tone: "text-green-700" },
  { key: "crawledNotIndexed", label: "Crawled — not indexed", tone: "text-amber-700" },
  { key: "discoveredNotIndexed", label: "Discovered — not indexed", tone: "text-amber-700" },
  { key: "neverCrawled", label: "Never crawled", tone: "text-red-700" },
  { key: "excluded", label: "Excluded / other", tone: "text-ink-muted" },
  { key: "error", label: "Errors", tone: "text-red-700" },
]

const BATCH_SIZE = 5

function fmtDate(value: string | null | undefined): string {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

function shortPath(url: string): string {
  try {
    const p = new URL(url).pathname
    return p === "/" ? "/" : p
  } catch {
    return url
  }
}

export default function CoveragePanel() {
  const [rows, setRows] = useState<Row[]>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(0)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [finished, setFinished] = useState(false)

  const run = async () => {
    setRunning(true)
    setError(null)
    setRows([])
    setDone(0)
    setTotal(0)
    setFinished(false)

    try {
      // 1. Fetch the URL list. Costs no quota.
      const listRes = await fetch("/api/gsc/coverage", { cache: "no-store" })
      const listJson = await listRes.json()
      if (!listRes.ok) throw new Error(listJson?.error || "Could not build the URL list.")

      const targets: Target[] = listJson.targets ?? []
      if (targets.length === 0) {
        setError("No published URLs found to check.")
        setRunning(false)
        return
      }

      setTotal(targets.length)
      setRows(targets)

      // 2. Walk the list in small batches so the function can't time out
      //    and so progress stays visible.
      for (let i = 0; i < targets.length; i += BATCH_SIZE) {
        const slice = targets.slice(i, i + BATCH_SIZE)

        const res = await fetch("/api/gsc/coverage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: slice.map((t) => t.url) }),
        })
        const json = await res.json()

        if (!res.ok) throw new Error(json?.error || "Inspection batch failed.")

        const byUrl = new Map<string, Result>()
        for (const r of json.results as Result[]) byUrl.set(r.url, r)

        setRows((prev) =>
          prev.map((row) => (byUrl.has(row.url) ? { ...row, ...byUrl.get(row.url)! } : row))
        )
        setDone(Math.min(i + slice.length, targets.length))

        // Stop immediately on a quota wall — continuing only wastes calls.
        if (json.quotaHit) {
          setError(
            "Google Search Console API quota has been reached. The scan stopped early; results above are partial."
          )
          break
        }
      }

      setFinished(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed.")
    } finally {
      setRunning(false)
    }
  }

  const counts = BUCKETS.map((b) => ({
    ...b,
    count: rows.filter((r) => r.bucket === b.key).length,
  }))

  const checked = rows.filter((r) => r.bucket).length
  const visible = filter === "all" ? rows : rows.filter((r) => r.bucket === filter)
  const progressPct = total > 0 ? (done / total) * 100 : 0

  return (
    <section className="border border-line bg-bg mb-6">
      <header className="px-5 sm:px-6 py-4 border-b border-line bg-bg-3 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label mb-1">Coverage</span>
          <h2 className="font-display text-lg font-medium text-ink">Index coverage</h2>
        </div>
        <button type="button" onClick={run} disabled={running} className="btn-primary disabled:opacity-50">
          {running ? `Checking ${done} / ${total}…` : finished ? "Run scan again" : "Run coverage scan"}
        </button>
      </header>

      <div className="p-5 sm:p-6">
        <p className="text-xs text-ink-muted mb-5 leading-relaxed">
          Checks every published page, post, service and category against Google&apos;s index, one URL
          at a time. Each URL costs one unit of your daily inspection quota, and nothing is cached —
          every scan asks Google fresh.
        </p>

        {running && (
          <div className="h-2 bg-bg-3 border border-line mb-5">
            <div className="h-full bg-accent transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        )}

        {error && (
          <div className="border border-amber-300 bg-amber-50 text-amber-900 px-4 py-3 mb-5 text-sm leading-relaxed">
            {error}
          </div>
        )}

        {checked > 0 && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {counts.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setFilter(filter === b.key ? "all" : b.key)}
                  className={`border p-4 text-left transition-colors ${
                    filter === b.key ? "border-accent bg-accent-soft" : "border-line bg-bg-2 hover:border-line-strong"
                  }`}
                >
                  <span className="mono-pill text-ink-muted block mb-2">{b.label}</span>
                  <span className={`font-display text-2xl font-medium ${b.tone}`}>{b.count}</span>
                </button>
              ))}
            </div>

            {filter !== "all" && (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mono-pill text-accent hover:underline mb-3 inline-block"
              >
                ← Show all {rows.length}
              </button>
            )}

            <div className="border border-line admin-table-wrap">
              <table className="w-full">
                <thead className="bg-bg-3 border-b border-line">
                  <tr>
                    <th className="text-left px-4 py-3 mono-pill">URL</th>
                    <th className="text-left px-4 py-3 mono-pill">Type</th>
                    <th className="text-left px-4 py-3 mono-pill">Status</th>
                    <th className="text-right px-4 py-3 mono-pill">Last crawl</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => {
                    const bucket = BUCKETS.find((b) => b.key === r.bucket)
                    return (
                      <tr key={r.url} className="border-b border-line last:border-b-0 hover:bg-bg-2">
                        <td className="px-4 py-3">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-ink hover:text-accent block truncate max-w-[340px]"
                            title={r.url}
                          >
                            {shortPath(r.url)}
                          </a>
                          <span className="text-xs text-ink-muted line-clamp-1">{r.title}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="mono-pill text-ink-muted">{r.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          {!r.bucket ? (
                            <span className="text-sm text-ink-dim">Waiting…</span>
                          ) : (
                            <span className={`text-sm ${bucket?.tone ?? ""}`}>
                              {r.error || r.coverageState || bucket?.label}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-ink-2 text-right whitespace-nowrap">
                          {fmtDate(r.lastCrawlTime)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {checked === 0 && !running && !error && (
          <div className="border border-dashed border-line p-10 text-center text-sm text-ink-muted">
            Run a scan to see which published URLs Google has actually indexed.
          </div>
        )}
      </div>
    </section>
  )
}
