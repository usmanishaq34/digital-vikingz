"use client"

import { useCallback, useEffect, useState } from "react"

// ============================================================
// TYPES
// ============================================================

interface StatusData {
  envOk: boolean
  envMessage: string | null
  connected: boolean
  siteUrl: string | null
  connectedAt: string | null
  sitemapUrl: string
  quota: {
    used: number
    limit: number
    perMinuteLimit: number
    day: string
    lastError: string | null
    lastErrorAt: string | null
    lastSource: string | null
  }
}

interface SitemapData {
  feedpath: string
  submitted: boolean
  sitemap: {
    path: string
    lastSubmitted: string | null
    lastDownloaded: string | null
    isPending: boolean
    isSitemapsIndex: boolean
    type: string | null
    warnings: number
    errors: number
    contents: Array<{ type?: string; submitted?: string; indexed?: string }>
  } | null
}

interface AnalyticsRowData {
  key: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

interface AnalyticsData {
  days: number
  startDate: string
  endDate: string
  totals: { clicks: number; impressions: number; ctr: number; position: number }
  pages: AnalyticsRowData[]
  queries: AnalyticsRowData[]
  devices: AnalyticsRowData[]
  countries: AnalyticsRowData[]
}

interface InspectData {
  url: string
  inspectedAt: string
  inspectionResultLink: string | null
  index: {
    verdict: string | null
    coverageState: string | null
    robotsTxtState: string | null
    indexingState: string | null
    lastCrawlTime: string | null
    pageFetchState: string | null
    googleCanonical: string | null
    userCanonical: string | null
    crawledAs: string | null
    sitemap: string[]
    referringUrls: string[]
  }
  mobileUsability: string | null
  quota: { used: number; limit: number }
}

interface PropertyEntry {
  siteUrl: string
  permissionLevel: string
}

// ============================================================
// HELPERS
// ============================================================

function fmtDate(value: string | null | undefined): string {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function fmtNumber(n: number): string {
  return n.toLocaleString()
}

function fmtCtr(n: number): string {
  return `${(n * 100).toFixed(2)}%`
}

function fmtPos(n: number): string {
  return n ? n.toFixed(1) : "—"
}

/** Turns Google's SCREAMING_SNAKE enums into readable text. */
function humanize(value: string | null | undefined): string {
  if (!value) return "—"
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
}

function verdictTone(verdict: string | null): string {
  switch (verdict) {
    case "PASS":
      return "text-green-700 bg-green-50 border-green-200"
    case "FAIL":
      return "text-red-700 bg-red-50 border-red-200"
    case "NEUTRAL":
    case "PARTIAL":
      return "text-amber-700 bg-amber-50 border-amber-200"
    default:
      return "text-ink-muted bg-bg-3 border-line"
  }
}

async function readError(res: Response): Promise<string> {
  try {
    const json = await res.json()
    return json?.error || `Request failed (${res.status})`
  } catch {
    return `Request failed (${res.status})`
  }
}

// ============================================================
// SMALL PRESENTATIONAL PIECES
// ============================================================

function Card({
  label,
  title,
  children,
  action,
}: {
  label: string
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section className="border border-line bg-bg mb-6">
      <header className="px-5 sm:px-6 py-4 border-b border-line bg-bg-3 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label mb-1">{label}</span>
          <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
        </div>
        {action}
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-line last:border-b-0">
      <span className="mono-pill text-ink-muted flex-shrink-0">{label}</span>
      <span className="text-sm text-ink text-right break-all">{value}</span>
    </div>
  )
}

function Banner({
  tone,
  children,
  onDismiss,
}: {
  tone: "error" | "success" | "warn" | "info"
  children: React.ReactNode
  onDismiss?: () => void
}) {
  const tones: Record<string, string> = {
    error: "border-red-300 bg-red-50 text-red-800",
    success: "border-green-300 bg-green-50 text-green-800",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
    info: "border-line-strong bg-bg-3 text-ink-2",
  }
  return (
    <div className={`border px-4 py-3 mb-4 text-sm leading-relaxed flex gap-3 ${tones[tone]}`}>
      <div className="flex-1">{children}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="mono-pill opacity-60 hover:opacity-100 flex-shrink-0"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  )
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-bg-2 p-4">
      <span className="mono-pill text-ink-muted block mb-2">{label}</span>
      <span className="font-display text-2xl font-medium text-ink">{value}</span>
    </div>
  )
}

function DataTable({
  head,
  rows,
  emptyText,
}: {
  head: string
  rows: AnalyticsRowData[]
  emptyText: string
}) {
  if (rows.length === 0) {
    return (
      <div className="border border-dashed border-line p-8 text-center text-sm text-ink-muted">
        {emptyText}
      </div>
    )
  }
  return (
    <div className="border border-line admin-table-wrap">
      <table className="w-full">
        <thead className="bg-bg-3 border-b border-line">
          <tr>
            <th className="text-left px-4 py-3 mono-pill">{head}</th>
            <th className="text-right px-4 py-3 mono-pill">Clicks</th>
            <th className="text-right px-4 py-3 mono-pill">Impr.</th>
            <th className="text-right px-4 py-3 mono-pill">CTR</th>
            <th className="text-right px-4 py-3 mono-pill">Pos.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.key}-${i}`} className="border-b border-line last:border-b-0 hover:bg-bg-2">
              <td className="px-4 py-3 text-sm text-ink max-w-[420px] truncate" title={r.key}>
                {r.key || "—"}
              </td>
              <td className="px-4 py-3 text-sm text-ink text-right tabular-nums">{fmtNumber(r.clicks)}</td>
              <td className="px-4 py-3 text-sm text-ink-2 text-right tabular-nums">{fmtNumber(r.impressions)}</td>
              <td className="px-4 py-3 text-sm text-ink-2 text-right tabular-nums">{fmtCtr(r.ctr)}</td>
              <td className="px-4 py-3 text-sm text-ink-2 text-right tabular-nums">{fmtPos(r.position)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// MAIN PANEL
// ============================================================

export default function SearchConsolePanel({
  initialNotice,
  initialError,
}: {
  initialNotice?: string
  initialError?: string
}) {
  const [status, setStatus] = useState<StatusData | null>(null)
  const [statusLoading, setStatusLoading] = useState(true)

  const [notice, setNotice] = useState<string | null>(initialNotice ?? null)
  const [error, setError] = useState<string | null>(initialError ?? null)

  // Properties
  const [properties, setProperties] = useState<PropertyEntry[] | null>(null)
  const [propertiesLoading, setPropertiesLoading] = useState(false)
  const [savingProperty, setSavingProperty] = useState(false)

  // Sitemap
  const [sitemap, setSitemap] = useState<SitemapData | null>(null)
  const [sitemapLoading, setSitemapLoading] = useState(false)
  const [sitemapError, setSitemapError] = useState<string | null>(null)
  const [resubmitting, setResubmitting] = useState(false)

  // Analytics
  const [days, setDays] = useState<number>(28)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [analyticsError, setAnalyticsError] = useState<string | null>(null)
  const [analyticsTab, setAnalyticsTab] = useState<"pages" | "queries" | "devices" | "countries">("pages")

  // Inspection
  const [inspectInput, setInspectInput] = useState("")
  const [inspecting, setInspecting] = useState(false)
  const [inspectResult, setInspectResult] = useState<InspectData | null>(null)
  const [inspectError, setInspectError] = useState<string | null>(null)

  const [disconnecting, setDisconnecting] = useState(false)

  // ---------- Status ----------

  const loadStatus = useCallback(async () => {
    setStatusLoading(true)
    try {
      const res = await fetch("/api/gsc/status", { cache: "no-store" })
      if (!res.ok) throw new Error(await readError(res))
      setStatus(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load connection status.")
    } finally {
      setStatusLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  const connected = Boolean(status?.connected)

  // ---------- Sitemap ----------

  const loadSitemap = useCallback(async () => {
    setSitemapLoading(true)
    setSitemapError(null)
    try {
      const res = await fetch("/api/gsc/sitemap", { cache: "no-store" })
      if (!res.ok) throw new Error(await readError(res))
      setSitemap(await res.json())
    } catch (err) {
      setSitemapError(err instanceof Error ? err.message : "Could not load sitemap status.")
    } finally {
      setSitemapLoading(false)
    }
  }, [])

  const resubmitSitemap = async () => {
    setResubmitting(true)
    setSitemapError(null)
    try {
      const res = await fetch("/api/gsc/sitemap", { method: "POST" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Re-submit failed.")
      setNotice(json.message)
      await loadSitemap()
      await loadStatus()
    } catch (err) {
      setSitemapError(err instanceof Error ? err.message : "Re-submit failed.")
    } finally {
      setResubmitting(false)
    }
  }

  // ---------- Analytics ----------

  const loadAnalytics = useCallback(async (range: number) => {
    setAnalyticsLoading(true)
    setAnalyticsError(null)
    try {
      const res = await fetch(`/api/gsc/analytics?days=${range}`, { cache: "no-store" })
      if (!res.ok) throw new Error(await readError(res))
      setAnalytics(await res.json())
    } catch (err) {
      setAnalyticsError(err instanceof Error ? err.message : "Could not load Search Analytics.")
    } finally {
      setAnalyticsLoading(false)
    }
  }, [])

  // Load live data once the connection is confirmed.
  useEffect(() => {
    if (!connected) return
    loadSitemap()
    loadAnalytics(days)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected])

  const changeRange = (range: number) => {
    setDays(range)
    loadAnalytics(range)
  }

  // ---------- Properties ----------

  const loadProperties = async () => {
    setPropertiesLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/gsc/properties", { cache: "no-store" })
      if (!res.ok) throw new Error(await readError(res))
      const json = await res.json()
      setProperties(json.properties ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not list properties.")
    } finally {
      setPropertiesLoading(false)
    }
  }

  const selectProperty = async (siteUrl: string) => {
    setSavingProperty(true)
    setError(null)
    try {
      const res = await fetch("/api/gsc/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteUrl }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Could not save property.")
      setNotice(`Property switched to ${siteUrl}.`)
      await loadStatus()
      await loadSitemap()
      await loadAnalytics(days)
      setInspectResult(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save property.")
    } finally {
      setSavingProperty(false)
    }
  }

  // ---------- Inspection ----------

  const runInspection = async () => {
    if (!inspectInput.trim()) {
      setInspectError("Enter a URL to inspect.")
      return
    }
    setInspecting(true)
    setInspectError(null)
    setInspectResult(null)
    try {
      const res = await fetch("/api/gsc/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inspectInput.trim() }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Inspection failed.")
      setInspectResult(json)
    } catch (err) {
      setInspectError(err instanceof Error ? err.message : "Inspection failed.")
    } finally {
      setInspecting(false)
      // Refresh the usage counter and any newly recorded quota alert.
      loadStatus()
    }
  }

  // ---------- Disconnect ----------

  const disconnect = async () => {
    if (!window.confirm("Disconnect Google Search Console? You will need to reconnect to use these tools.")) {
      return
    }
    setDisconnecting(true)
    try {
      const res = await fetch("/api/gsc/disconnect", { method: "POST" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Disconnect failed.")
      setNotice(json.message)
      setSitemap(null)
      setAnalytics(null)
      setInspectResult(null)
      setProperties(null)
      await loadStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Disconnect failed.")
    } finally {
      setDisconnecting(false)
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  const quota = status?.quota
  const quotaPct = quota && quota.limit > 0 ? Math.min(100, (quota.used / quota.limit) * 100) : 0

  return (
    <div className="max-w-5xl">
      <header className="mb-6 sm:mb-10 pb-6 border-b border-line">
        <span className="section-label mb-4">Search</span>
        <h1 className="h2-display italic-accent">
          Google <em>Search Console</em>
        </h1>
        <p className="text-base text-ink-2 mt-2">
          Sitemap status, URL inspection and search performance, read live from Google. Nothing is cached.
        </p>
      </header>

      {error && (
        <Banner tone="error" onDismiss={() => setError(null)}>
          {error}
        </Banner>
      )}
      {notice && (
        <Banner tone="success" onDismiss={() => setNotice(null)}>
          {notice}
        </Banner>
      )}

      {/* Persisted quota alert — survives a page refresh */}
      {quota?.lastError && (
        <Banner tone="warn">
          <strong className="block mb-1">{quota.lastError}</strong>
          <span className="text-xs">
            Reported {fmtDate(quota.lastErrorAt)}
            {quota.lastSource ? ` · triggered by: ${quota.lastSource}` : ""}
          </span>
        </Banner>
      )}

      {status && !status.envOk && (
        <Banner tone="error">{status.envMessage}</Banner>
      )}

      {/* ============ CONNECTION ============ */}
      <Card
        label="Connection"
        title="Google account"
        action={
          connected ? (
            <div className="flex items-center gap-2 flex-wrap">
              <a href="/api/gsc/connect" className="btn-ghost">
                Reconnect
              </a>
              <button
                type="button"
                onClick={disconnect}
                disabled={disconnecting}
                className="btn-ghost disabled:opacity-50"
              >
                {disconnecting ? "Disconnecting…" : "Disconnect"}
              </button>
            </div>
          ) : (
            <a
              href="/api/gsc/connect"
              className={`btn-primary ${status && !status.envOk ? "pointer-events-none opacity-50" : ""}`}
            >
              Connect Google Search Console
            </a>
          )
        }
      >
        {statusLoading ? (
          <p className="text-sm text-ink-muted">Loading connection status…</p>
        ) : (
          <>
            <Row
              label="Status"
              value={
                connected ? (
                  <span className="inline-flex items-center gap-2 text-green-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
                    Connected
                  </span>
                ) : (
                  <span className="text-ink-muted">Not connected</span>
                )
              }
            />
            <Row label="Property" value={status?.siteUrl || "—"} />
            <Row label="Connected" value={fmtDate(status?.connectedAt)} />

            {connected && (
              <div className="mt-5 pt-5 border-t border-line">
                {properties === null ? (
                  <button
                    type="button"
                    onClick={loadProperties}
                    disabled={propertiesLoading}
                    className="btn-ghost disabled:opacity-50"
                  >
                    {propertiesLoading ? "Detecting…" : "Detect available properties"}
                  </button>
                ) : properties.length === 0 ? (
                  <p className="text-sm text-ink-muted">
                    This Google account has no verified Search Console properties.
                  </p>
                ) : (
                  <div>
                    <span className="mono-pill block mb-2">Switch property</span>
                    <div className="space-y-2">
                      {properties.map((p) => {
                        const active = p.siteUrl === status?.siteUrl
                        return (
                          <div
                            key={p.siteUrl}
                            className={`flex items-center justify-between gap-4 border px-4 py-3 ${
                              active ? "border-accent bg-accent-soft" : "border-line bg-bg-2"
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="text-sm text-ink break-all">{p.siteUrl}</div>
                              <div className="mono-pill text-ink-muted mt-1">{p.permissionLevel}</div>
                            </div>
                            {active ? (
                              <span className="mono-pill text-accent flex-shrink-0">Selected</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => selectProperty(p.siteUrl)}
                                disabled={savingProperty}
                                className="mono-pill text-accent hover:underline flex-shrink-0 disabled:opacity-50"
                              >
                                Use this →
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Card>

      {!connected && !statusLoading && (
        <Banner tone="info">
          Connect a Google account that owns the Search Console property to enable sitemap status, URL
          inspection and performance data. Your admin login is unchanged — Google is used only to link
          Search Console.
        </Banner>
      )}

      {connected && (
        <>
          {/* ============ SITEMAP ============ */}
          <Card
            label="Sitemap"
            title="Submission status"
            action={
              <button
                type="button"
                onClick={resubmitSitemap}
                disabled={resubmitting}
                className="btn-ghost disabled:opacity-50"
              >
                {resubmitting ? "Submitting…" : "Re-submit Sitemap"}
              </button>
            }
          >
            {sitemapError && <Banner tone="error">{sitemapError}</Banner>}
            {sitemapLoading ? (
              <p className="text-sm text-ink-muted">Loading sitemap status…</p>
            ) : sitemap ? (
              <>
                <Row
                  label="Sitemap URL"
                  value={
                    <a
                      href={sitemap.feedpath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {sitemap.feedpath}
                    </a>
                  }
                />
                <Row
                  label="Status"
                  value={
                    !sitemap.submitted ? (
                      <span className="text-amber-700">Not submitted</span>
                    ) : sitemap.sitemap?.isPending ? (
                      <span className="text-amber-700">Submitted — pending processing</span>
                    ) : (
                      <span className="text-green-700">Submitted &amp; processed</span>
                    )
                  }
                />
                <Row label="Last submitted" value={fmtDate(sitemap.sitemap?.lastSubmitted)} />
                <Row label="Last downloaded by Google" value={fmtDate(sitemap.sitemap?.lastDownloaded)} />
                <Row
                  label="Errors"
                  value={
                    <span className={sitemap.sitemap?.errors ? "text-red-700 font-medium" : ""}>
                      {sitemap.sitemap?.errors ?? 0}
                    </span>
                  }
                />
                <Row
                  label="Warnings"
                  value={
                    <span className={sitemap.sitemap?.warnings ? "text-amber-700 font-medium" : ""}>
                      {sitemap.sitemap?.warnings ?? 0}
                    </span>
                  }
                />
                {sitemap.sitemap?.contents?.map((c, i) => (
                  <Row
                    key={i}
                    label={`${humanize(c.type) || "URLs"} discovered`}
                    value={`${fmtNumber(Number(c.submitted ?? 0))} submitted`}
                  />
                ))}
              </>
            ) : (
              <p className="text-sm text-ink-muted">No sitemap data.</p>
            )}
          </Card>

          {/* ============ SEARCH PERFORMANCE ============ */}
          <Card
            label="Performance"
            title="Search analytics"
            action={
              <div className="flex items-center gap-1">
                {[7, 28, 90].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => changeRange(r)}
                    className={`px-3 py-2 mono-pill border transition-colors ${
                      days === r
                        ? "bg-accent text-white border-accent"
                        : "bg-transparent text-ink border-line-strong hover:border-accent hover:text-accent"
                    }`}
                  >
                    {r} Days
                  </button>
                ))}
              </div>
            }
          >
            {analyticsError && <Banner tone="error">{analyticsError}</Banner>}

            {analyticsLoading ? (
              <p className="text-sm text-ink-muted">Loading performance data…</p>
            ) : analytics ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                  <MetricTile label="Clicks" value={fmtNumber(analytics.totals.clicks)} />
                  <MetricTile label="Impressions" value={fmtNumber(analytics.totals.impressions)} />
                  <MetricTile label="CTR" value={fmtCtr(analytics.totals.ctr)} />
                  <MetricTile label="Avg. position" value={fmtPos(analytics.totals.position)} />
                </div>

                <p className="text-xs text-ink-muted mb-5 leading-relaxed">
                  {analytics.startDate} → {analytics.endDate}. Search Console finalises data on a two to
                  three day lag, so the most recent days always read low. That is Google&apos;s reporting
                  delay, not a traffic drop.
                </p>

                <div className="flex items-center gap-1 mb-3 flex-wrap">
                  {([
                    ["pages", "Top Pages"],
                    ["queries", "Top Queries"],
                    ["devices", "Device"],
                    ["countries", "Country"],
                  ] as const).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAnalyticsTab(key)}
                      className={`px-3 py-2 mono-pill border transition-colors ${
                        analyticsTab === key
                          ? "bg-ink text-white border-ink"
                          : "bg-transparent text-ink border-line hover:border-accent hover:text-accent"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {analyticsTab === "pages" && (
                  <DataTable head="Page" rows={analytics.pages} emptyText="No page data for this range." />
                )}
                {analyticsTab === "queries" && (
                  <DataTable head="Query" rows={analytics.queries} emptyText="No query data for this range." />
                )}
                {analyticsTab === "devices" && (
                  <DataTable head="Device" rows={analytics.devices} emptyText="No device data for this range." />
                )}
                {analyticsTab === "countries" && (
                  <DataTable head="Country" rows={analytics.countries} emptyText="No country data for this range." />
                )}
              </>
            ) : (
              <p className="text-sm text-ink-muted">No performance data.</p>
            )}
          </Card>

          {/* ============ URL INSPECTION ============ */}
          <Card label="Inspection" title="URL Inspection">
            <div className="flex gap-2 flex-col sm:flex-row mb-4">
              <input
                type="url"
                value={inspectInput}
                onChange={(e) => setInspectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runInspection()
                }}
                placeholder="https://digitalvikingz.com/blog/example-post"
                className="form-input flex-1"
              />
              <button
                type="button"
                onClick={runInspection}
                disabled={inspecting}
                className="btn-primary disabled:opacity-50 flex-shrink-0"
              >
                {inspecting ? "Inspecting…" : "Inspect URL"}
              </button>
            </div>

            <p className="text-xs text-ink-muted mb-4 leading-relaxed">
              Every inspection requests fresh data from Google — results are never cached. Each click
              consumes one unit of your daily inspection quota.
            </p>

            {inspectError && <Banner tone="error">{inspectError}</Banner>}

            {inspectResult && (
              <div>
                <div
                  className={`border px-4 py-3 mb-4 ${verdictTone(inspectResult.index.verdict)}`}
                >
                  <span className="mono-pill block mb-1">Google index verdict</span>
                  <span className="font-display text-xl font-medium">
                    {humanize(inspectResult.index.coverageState) !== "—"
                      ? inspectResult.index.coverageState
                      : humanize(inspectResult.index.verdict)}
                  </span>
                </div>

                <Row label="URL" value={inspectResult.url} />
                <Row label="Verdict" value={humanize(inspectResult.index.verdict)} />
                <Row label="Coverage state" value={inspectResult.index.coverageState || "—"} />
                <Row label="Indexing allowed" value={humanize(inspectResult.index.indexingState)} />
                <Row label="robots.txt" value={humanize(inspectResult.index.robotsTxtState)} />
                <Row label="Page fetch" value={humanize(inspectResult.index.pageFetchState)} />
                <Row label="Last crawl" value={fmtDate(inspectResult.index.lastCrawlTime)} />
                <Row label="Crawled as" value={humanize(inspectResult.index.crawledAs)} />
                <Row label="User-declared canonical" value={inspectResult.index.userCanonical || "—"} />
                <Row label="Google-selected canonical" value={inspectResult.index.googleCanonical || "—"} />
                <Row
                  label="Canonical match"
                  value={
                    !inspectResult.index.googleCanonical || !inspectResult.index.userCanonical ? (
                      "—"
                    ) : inspectResult.index.googleCanonical === inspectResult.index.userCanonical ? (
                      <span className="text-green-700">Match</span>
                    ) : (
                      <span className="text-amber-700 font-medium">Mismatch</span>
                    )
                  }
                />
                <Row
                  label="In sitemap"
                  value={
                    inspectResult.index.sitemap.length > 0
                      ? inspectResult.index.sitemap.join(", ")
                      : "Not found in a submitted sitemap"
                  }
                />
                <Row label="Mobile usability" value={humanize(inspectResult.mobileUsability)} />
                <Row label="Fetched" value={fmtDate(inspectResult.inspectedAt)} />

                {inspectResult.inspectionResultLink && (
                  <a
                    href={inspectResult.inspectionResultLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-pill text-accent hover:underline inline-block mt-4"
                  >
                    Open in Search Console →
                  </a>
                )}
              </div>
            )}
          </Card>

          {/* ============ API USAGE ============ */}
          <Card label="Quota" title="API usage">
            <Row
              label="URL inspections today"
              value={
                quota ? (
                  <span className="tabular-nums">
                    {fmtNumber(quota.used)} / {fmtNumber(quota.limit)}
                  </span>
                ) : (
                  "—"
                )
              }
            />
            <div className="h-2 bg-bg-3 border border-line my-3">
              <div
                className={`h-full ${quotaPct > 90 ? "bg-red-600" : quotaPct > 70 ? "bg-amber-500" : "bg-accent"}`}
                style={{ width: `${quotaPct}%` }}
              />
            </div>
            <Row label="Quota day (Pacific)" value={quota?.day || "—"} />
            <Row
              label="Per-minute limit"
              value={quota ? `${fmtNumber(quota.perMinuteLimit)} requests / minute` : "—"}
            />
            <Row
              label="Last quota warning"
              value={quota?.lastError ? fmtDate(quota.lastErrorAt) : "None"}
            />
            <p className="text-xs text-ink-muted mt-4 leading-relaxed">
              This counter tracks only inspections made through this admin, and resets at midnight
              Pacific Time to match Google&apos;s quota window. Google Cloud remains the source of truth
              for total project quota.
            </p>
          </Card>
        </>
      )}
    </div>
  )
}
