/**
 * Google Search Console integration — server only.
 *
 * Design notes:
 *  - Raw fetch against Google's REST endpoints. No `googleapis` dependency:
 *    the surface we need is four endpoints, and pulling in a ~50MB SDK for
 *    that would bloat the deploy for no benefit.
 *  - The refresh token is encrypted at rest (AES-256-GCM) and never leaves
 *    the server. Access tokens are held in memory only, for their lifetime.
 *  - NOTHING from Search Analytics or URL Inspection is persisted. The only
 *    stored data is connection state, quota-alert metadata and a local
 *    request counter.
 *
 * Never import this from a client component.
 */

import crypto from "crypto"
import { prisma } from "./db"

// ============================================================
// CONSTANTS
// ============================================================

export const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters"

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_REVOKE_URL = "https://oauth2.googleapis.com/revoke"
const WEBMASTERS_API = "https://www.googleapis.com/webmasters/v3"
const SEARCHCONSOLE_API = "https://searchconsole.googleapis.com/v1"

/**
 * Google's documented URL Inspection limits, per property:
 *   2,000 queries per day AND 600 queries per minute.
 * The per-minute ceiling is the one you hit in practice by clicking
 * Inspect repeatedly, so both are surfaced in the admin.
 */
export const URL_INSPECTION_DAILY_QUOTA = 2000
export const URL_INSPECTION_PER_MINUTE_QUOTA = 600

export const ADMIN_GSC_PATH = "/vikingz-1000-admin/search-console"

const SINGLETON = "singleton"
const REQUEST_TIMEOUT_MS = 20000

// ============================================================
// ENVIRONMENT
// ============================================================

export interface GscEnv {
  clientId: string
  clientSecret: string
  encryptionKey: string
  siteUrl: string
  redirectUri: string
}

export class GscConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GscConfigError"
  }
}

/** Default site origin used to build the OAuth redirect URI. */
function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalvikingz.com"
  const trimmed = raw.replace(/\/+$/, "")
  // A localhost value must not silently produce a redirect_uri Google will
  // reject — but it IS valid for local dev if registered in Google Cloud.
  return trimmed
}

/**
 * Reads and validates GSC environment variables.
 * Throws GscConfigError with an actionable message rather than a bare 500.
 */
export function getGscEnv(): GscEnv {
  const missing: string[] = []

  const clientId = process.env.GSC_GOOGLE_CLIENT_ID?.trim() || ""
  const clientSecret = process.env.GSC_GOOGLE_CLIENT_SECRET?.trim() || ""
  const encryptionKey = process.env.GSC_TOKEN_ENCRYPTION_KEY?.trim() || ""
  const siteUrl = process.env.GSC_SITE_URL?.trim() || "sc-domain:digitalvikingz.com"

  if (!clientId) missing.push("GSC_GOOGLE_CLIENT_ID")
  if (!clientSecret) missing.push("GSC_GOOGLE_CLIENT_SECRET")
  if (!encryptionKey) missing.push("GSC_TOKEN_ENCRYPTION_KEY")

  if (missing.length > 0) {
    throw new GscConfigError(
      `Missing environment variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}. ` +
        `Add them to your server environment (never as NEXT_PUBLIC_*) and restart the app.`
    )
  }

  const redirectUri =
    process.env.GSC_REDIRECT_URI?.trim() || `${siteOrigin()}/api/gsc/callback`

  return { clientId, clientSecret, encryptionKey, siteUrl, redirectUri }
}

/** Non-throwing check used by the status endpoint. */
export function gscEnvStatus(): { ok: boolean; message?: string } {
  try {
    getGscEnv()
    return { ok: true }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Configuration error" }
  }
}

// ============================================================
// ENCRYPTION — AES-256-GCM
// ============================================================

/**
 * Derives a 32-byte key. A 64-char hex string is used directly (the
 * documented format, from `openssl rand -hex 32`); anything else is
 * hashed to 32 bytes so a human-typed passphrase still works.
 *
 * Changing GSC_TOKEN_ENCRYPTION_KEY makes existing tokens undecryptable
 * and forces a reconnect. That is intentional and documented.
 */
function derivedKey(secret: string): Buffer {
  if (/^[0-9a-fA-F]{64}$/.test(secret)) {
    return Buffer.from(secret, "hex")
  }
  return crypto.createHash("sha256").update(secret, "utf8").digest()
}

export function encryptToken(plain: string, secret: string): string {
  const key = derivedKey(secret)
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()
  // v1:<iv>:<tag>:<ciphertext>, all base64url
  return [
    "v1",
    iv.toString("base64url"),
    tag.toString("base64url"),
    enc.toString("base64url"),
  ].join(":")
}

export function decryptToken(payload: string, secret: string): string {
  const parts = payload.split(":")
  if (parts.length !== 4 || parts[0] !== "v1") {
    throw new Error("Stored token is malformed. Reconnect Google Search Console.")
  }
  const key = derivedKey(secret)
  const iv = Buffer.from(parts[1], "base64url")
  const tag = Buffer.from(parts[2], "base64url")
  const data = Buffer.from(parts[3], "base64url")

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8")
}

// ============================================================
// ERRORS
// ============================================================

/** A Google API failure translated into something an admin can act on. */
export class GscApiError extends Error {
  status: number
  /** true when Google reported a quota or rate-limit condition */
  isQuota: boolean
  /** true when the stored refresh token is dead and a reconnect is required */
  needsReconnect: boolean

  constructor(
    message: string,
    opts: { status?: number; isQuota?: boolean; needsReconnect?: boolean } = {}
  ) {
    super(message)
    this.name = "GscApiError"
    this.status = opts.status ?? 500
    this.isQuota = opts.isQuota ?? false
    this.needsReconnect = opts.needsReconnect ?? false
  }
}

export class GscNotConnectedError extends Error {
  constructor(message = "Google Search Console is not connected yet.") {
    super(message)
    this.name = "GscNotConnectedError"
  }
}

// ============================================================
// CONNECTION RECORD
// ============================================================

export async function getConnection() {
  return prisma.gscConnection.findUnique({ where: { id: SINGLETON } })
}

export async function upsertConnection(data: Record<string, any>) {
  return prisma.gscConnection.upsert({
    where: { id: SINGLETON },
    update: data,
    create: { id: SINGLETON, ...data },
  })
}

export async function clearConnection() {
  await prisma.gscConnection
    .update({
      where: { id: SINGLETON },
      data: {
        refreshTokenEnc: null,
        connectedAt: null,
        sitemapPath: null,
        sitemapSubmittedAt: null,
        lastQuotaError: null,
        lastQuotaErrorAt: null,
        lastQuotaSource: null,
      },
    })
    .catch(() => null)
}

// ============================================================
// QUOTA DAY (America/Los_Angeles)
// ============================================================

/**
 * Google's API quota windows reset at midnight Pacific Time. Counting by
 * UTC — or by the server's local zone — puts the local counter 7-8 hours
 * out of step with Google's, which is exactly when a "0 / 2000" reading
 * would be most misleading.
 */
export function quotaDayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
}

/** Reads the counter, rolling it over if the Pacific day has changed. */
export async function readInspectUsage(): Promise<{ used: number; day: string }> {
  const day = quotaDayKey()
  const conn = await getConnection()
  if (!conn || conn.inspectUsageDay !== day) return { used: 0, day }
  return { used: conn.inspectUsageCount, day }
}

/** Increments the local counter. Monitoring only — never gates a request. */
export async function incrementInspectUsage(): Promise<number> {
  const day = quotaDayKey()
  const conn = await getConnection()
  const next = conn && conn.inspectUsageDay === day ? conn.inspectUsageCount + 1 : 1
  await upsertConnection({ inspectUsageDay: day, inspectUsageCount: next })
  return next
}

// ============================================================
// QUOTA ALERT METADATA
// ============================================================

export async function recordQuotaError(message: string, source: string) {
  await upsertConnection({
    lastQuotaError: message.slice(0, 1000),
    lastQuotaErrorAt: new Date(),
    lastQuotaSource: source,
  })
}

export async function clearQuotaError() {
  await prisma.gscConnection
    .update({
      where: { id: SINGLETON },
      data: { lastQuotaError: null, lastQuotaErrorAt: null, lastQuotaSource: null },
    })
    .catch(() => null)
}

// ============================================================
// OAUTH
// ============================================================

export function buildAuthUrl(state: string): string {
  const env = getGscEnv()
  const params = new URLSearchParams({
    client_id: env.clientId,
    redirect_uri: env.redirectUri,
    response_type: "code",
    // Only the scope configured on the OAuth consent screen. Requesting an
    // extra scope (e.g. userinfo.email, purely to display which account is
    // linked) risks invalid_scope on a verified app, and is not worth
    // trading a working connection for a cosmetic label.
    scope: GSC_SCOPE,
    access_type: "offline",
    // REQUIRED. Google only issues a refresh_token on first consent; without
    // prompt=consent a reconnect completes "successfully" but returns no
    // refresh token, and the integration dies at the next token expiry.
    prompt: "consent",
    include_granted_scopes: "true",
    state,
  })
  return `${GOOGLE_AUTH_URL}?${params.toString()}`
}

interface TokenResponse {
  access_token: string
  expires_in: number
  refresh_token?: string
  scope?: string
  token_type?: string
}

async function postToken(body: Record<string, string>): Promise<TokenResponse> {
  const res = await fetchWithTimeout(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
  })

  const text = await res.text()
  let json: any = {}
  try {
    json = JSON.parse(text)
  } catch {
    /* fall through to the raw text below */
  }

  if (!res.ok) {
    const code = json?.error || "unknown_error"
    const desc = json?.error_description || text.slice(0, 200)

    if (code === "invalid_grant") {
      throw new GscApiError(
        "Google rejected the stored credentials (invalid_grant). The refresh token was revoked, expired, or the account password changed. Reconnect Google Search Console.",
        { status: 401, needsReconnect: true }
      )
    }
    throw new GscApiError(`Google token request failed: ${code} — ${desc}`, {
      status: res.status,
    })
  }

  return json as TokenResponse
}

export async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const env = getGscEnv()
  return postToken({
    code,
    client_id: env.clientId,
    client_secret: env.clientSecret,
    redirect_uri: env.redirectUri,
    grant_type: "authorization_code",
  })
}

/**
 * Exchanges the stored refresh token for a fresh access token.
 * Cached in-process for its lifetime so a single admin page load that fires
 * five analytics requests doesn't perform five token exchanges.
 */
const tokenCache: { value: string | null; expiresAt: number } = {
  value: null,
  expiresAt: 0,
}

export async function getAccessToken(): Promise<string> {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.value
  }

  const env = getGscEnv()
  const conn = await getConnection()
  if (!conn?.refreshTokenEnc) {
    throw new GscNotConnectedError()
  }

  let refreshToken: string
  try {
    refreshToken = decryptToken(conn.refreshTokenEnc, env.encryptionKey)
  } catch {
    throw new GscApiError(
      "Stored Google token could not be decrypted. GSC_TOKEN_ENCRYPTION_KEY has probably changed. Reconnect Google Search Console.",
      { status: 401, needsReconnect: true }
    )
  }

  const tokens = await postToken({
    client_id: env.clientId,
    client_secret: env.clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  })

  tokenCache.value = tokens.access_token
  tokenCache.expiresAt = Date.now() + (tokens.expires_in ?? 3600) * 1000
  return tokens.access_token
}

/** Invalidates the in-process access token (used on disconnect). */
export function resetTokenCache() {
  tokenCache.value = null
  tokenCache.expiresAt = 0
}

export async function revokeRefreshToken(): Promise<void> {
  const conn = await getConnection()
  if (!conn?.refreshTokenEnc) return
  try {
    const env = getGscEnv()
    const token = decryptToken(conn.refreshTokenEnc, env.encryptionKey)
    await fetchWithTimeout(GOOGLE_REVOKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token }).toString(),
    })
  } catch {
    // Revocation is best-effort: the local record is cleared regardless.
  }
}

// ============================================================
// AUTHENTICATED GOOGLE REQUESTS
// ============================================================

async function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: "no-store" })
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new GscApiError("Google did not respond in time. Check network connectivity and retry.", {
        status: 504,
      })
    }
    throw new GscApiError(
      `Could not reach Google: ${err?.message || "network failure"}.`,
      { status: 502 }
    )
  } finally {
    clearTimeout(timer)
  }
}

const QUOTA_REASONS = new Set([
  "quotaExceeded",
  "rateLimitExceeded",
  "userRateLimitExceeded",
  "dailyLimitExceeded",
  "RESOURCE_EXHAUSTED",
])

/**
 * Translates a Google error payload into an actionable admin message.
 * Deliberately verbose: the whole point is to avoid generic 500s.
 */
function interpretGoogleError(status: number, json: any, raw: string): GscApiError {
  const err = json?.error ?? {}
  const message: string = err?.message || raw.slice(0, 300) || "Unknown Google API error"
  const reason: string =
    err?.errors?.[0]?.reason || err?.status || err?.details?.[0]?.reason || ""

  const isQuota =
    status === 429 || QUOTA_REASONS.has(reason) || /quota|rate limit/i.test(message)

  if (isQuota) {
    return new GscApiError(
      "Google Search Console API quota has been reached. Please wait for the Google quota window to reset before trying again.",
      { status: 429, isQuota: true }
    )
  }

  if (status === 401) {
    return new GscApiError(
      "Google rejected the access token. Reconnect Google Search Console.",
      { status: 401, needsReconnect: true }
    )
  }

  if (status === 403) {
    if (/Search Console API has not been used|is disabled|SERVICE_DISABLED/i.test(message)) {
      return new GscApiError(
        "The Google Search Console API is not enabled for this Google Cloud project. Enable it in Google Cloud Console, then retry.",
        { status: 403 }
      )
    }
    return new GscApiError(
      `Google denied access: ${message} — the connected Google account may not have permission on this Search Console property.`,
      { status: 403 }
    )
  }

  if (status === 404) {
    return new GscApiError(
      `Google returned 404: ${message} — the property or resource was not found. Check the selected property, and that the URL belongs to it.`,
      { status: 404 }
    )
  }

  if (status >= 500) {
    return new GscApiError(
      `Google Search Console returned a server error (${status}). This is on Google's side — retry shortly.`,
      { status: 502 }
    )
  }

  return new GscApiError(`Google Search Console error (${status}): ${message}`, { status })
}

/**
 * Performs an authenticated Google API call, recording quota alerts and
 * surfacing reconnect conditions.
 *
 * `source` labels the feature for the persisted quota alert.
 */
export async function googleRequest<T = any>(
  url: string,
  init: RequestInit & { source: string }
): Promise<T> {
  const { source, ...rest } = init
  const accessToken = await getAccessToken()

  const res = await fetchWithTimeout(url, {
    ...rest,
    headers: {
      ...(rest.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
    },
  })

  if (res.status === 204) return undefined as T

  const raw = await res.text()
  let json: any = null
  if (raw) {
    try {
      json = JSON.parse(raw)
    } catch {
      /* non-JSON body handled below */
    }
  }

  if (!res.ok) {
    const apiError = interpretGoogleError(res.status, json, raw)
    if (apiError.isQuota) {
      await recordQuotaError(apiError.message, source)
    }
    throw apiError
  }

  return (json ?? ({} as T)) as T
}

// ============================================================
// SEARCH CONSOLE ENDPOINTS
// ============================================================

export interface SiteEntry {
  siteUrl: string
  permissionLevel: string
}

export async function listProperties(): Promise<SiteEntry[]> {
  const data = await googleRequest<{ siteEntry?: SiteEntry[] }>(`${WEBMASTERS_API}/sites`, {
    method: "GET",
    source: "properties",
  })
  return data.siteEntry ?? []
}

/** Picks the best property: configured value, then sc-domain, then any owned. */
export function pickPreferredProperty(
  entries: SiteEntry[],
  preferred: string
): string | null {
  if (entries.length === 0) return null

  const usable = entries.filter((e) =>
    ["siteOwner", "siteFullUser", "siteRestrictedUser"].includes(e.permissionLevel)
  )
  const pool = usable.length > 0 ? usable : entries

  const exact = pool.find((e) => e.siteUrl === preferred)
  if (exact) return exact.siteUrl

  const domainProp = pool.find((e) => e.siteUrl.startsWith("sc-domain:"))
  if (domainProp) return domainProp.siteUrl

  return pool[0]?.siteUrl ?? null
}

/** Resolves the active property, falling back to the configured default. */
export async function requireSiteUrl(): Promise<string> {
  const conn = await getConnection()
  const selected = conn?.siteUrl?.trim()
  if (selected) return selected

  const env = getGscEnv()
  if (env.siteUrl) return env.siteUrl

  throw new GscApiError(
    "No Search Console property is selected. Choose a property in the admin first.",
    { status: 400 }
  )
}

// ---------- Sitemaps ----------

export interface SitemapStatus {
  path: string
  lastSubmitted?: string
  lastDownloaded?: string
  isPending?: boolean
  isSitemapsIndex?: boolean
  type?: string
  warnings?: string
  errors?: string
  contents?: Array<{ type?: string; submitted?: string; indexed?: string }>
}

export function defaultSitemapUrl(): string {
  return `${siteOrigin()}/sitemap.xml`
}

export async function listSitemaps(siteUrl: string): Promise<SitemapStatus[]> {
  const data = await googleRequest<{ sitemap?: SitemapStatus[] }>(
    `${WEBMASTERS_API}/sites/${encodeURIComponent(siteUrl)}/sitemaps`,
    { method: "GET", source: "sitemap" }
  )
  return data.sitemap ?? []
}

export async function getSitemap(
  siteUrl: string,
  feedpath: string
): Promise<SitemapStatus | null> {
  try {
    return await googleRequest<SitemapStatus>(
      `${WEBMASTERS_API}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`,
      { method: "GET", source: "sitemap" }
    )
  } catch (err) {
    if (err instanceof GscApiError && err.status === 404) return null
    throw err
  }
}

export async function submitSitemap(siteUrl: string, feedpath: string): Promise<void> {
  await googleRequest(
    `${WEBMASTERS_API}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`,
    { method: "PUT", source: "sitemap" }
  )
}

/**
 * Submits the sitemap only if Google doesn't already list it.
 * Called once after a successful connection — never on publish.
 */
export async function ensureSitemapSubmitted(
  siteUrl: string,
  feedpath: string
): Promise<{ submitted: boolean; alreadyPresent: boolean }> {
  const existing = await listSitemaps(siteUrl).catch(() => [] as SitemapStatus[])
  const present = existing.some((s) => s.path === feedpath)
  if (present) return { submitted: false, alreadyPresent: true }

  await submitSitemap(siteUrl, feedpath)
  await upsertConnection({ sitemapPath: feedpath, sitemapSubmittedAt: new Date() })
  return { submitted: true, alreadyPresent: false }
}

// ---------- URL Inspection ----------

export interface InspectionResult {
  inspectionResultLink?: string
  indexStatusResult?: {
    verdict?: string
    coverageState?: string
    robotsTxtState?: string
    indexingState?: string
    lastCrawlTime?: string
    pageFetchState?: string
    googleCanonical?: string
    userCanonical?: string
    sitemap?: string[]
    referringUrls?: string[]
    crawledAs?: string
  }
  mobileUsabilityResult?: { verdict?: string; issues?: Array<{ issueType?: string; message?: string }> }
  richResultsResult?: { verdict?: string }
  ampResult?: { verdict?: string }
}

export async function inspectUrl(
  siteUrl: string,
  inspectionUrl: string
): Promise<InspectionResult> {
  const data = await googleRequest<{ inspectionResult?: InspectionResult }>(
    `${SEARCHCONSOLE_API}/urlInspection/index:inspect`,
    {
      method: "POST",
      source: "inspect",
      body: JSON.stringify({ inspectionUrl, siteUrl, languageCode: "en-US" }),
    }
  )
  return data.inspectionResult ?? {}
}

/**
 * Checks the URL belongs to the selected property before spending quota.
 * sc-domain properties cover every scheme and subdomain of the domain.
 */
export function urlBelongsToProperty(inspectionUrl: string, siteUrl: string): boolean {
  let parsed: URL
  try {
    parsed = new URL(inspectionUrl)
  } catch {
    return false
  }

  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase()
    const host = parsed.hostname.toLowerCase()
    return host === domain || host.endsWith(`.${domain}`)
  }

  const prefix = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`
  return inspectionUrl.startsWith(prefix) || inspectionUrl === siteUrl.replace(/\/$/, "")
}

// ---------- Search Analytics ----------

export interface AnalyticsRow {
  keys?: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export async function searchAnalytics(
  siteUrl: string,
  body: {
    startDate: string
    endDate: string
    dimensions?: string[]
    rowLimit?: number
    type?: string
  }
): Promise<AnalyticsRow[]> {
  const data = await googleRequest<{ rows?: AnalyticsRow[] }>(
    `${WEBMASTERS_API}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    { method: "POST", source: "analytics", body: JSON.stringify(body) }
  )
  return data.rows ?? []
}

/** Formats a Date as YYYY-MM-DD in UTC, which is what the API expects. */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function dateRange(days: number): { startDate: string; endDate: string } {
  const end = new Date()
  const start = new Date(end.getTime() - (days - 1) * 24 * 60 * 60 * 1000)
  return { startDate: isoDate(start), endDate: isoDate(end) }
}

// ============================================================
// ERROR → HTTP RESPONSE SHAPE
// ============================================================

export function errorPayload(err: unknown): {
  status: number
  body: { error: string; needsReconnect?: boolean; quota?: boolean; notConnected?: boolean }
} {
  if (err instanceof GscNotConnectedError) {
    return { status: 400, body: { error: err.message, notConnected: true } }
  }
  if (err instanceof GscConfigError) {
    return { status: 500, body: { error: err.message } }
  }
  if (err instanceof GscApiError) {
    return {
      status: err.status,
      body: {
        error: err.message,
        ...(err.needsReconnect ? { needsReconnect: true } : {}),
        ...(err.isQuota ? { quota: true } : {}),
      },
    }
  }
  const message = err instanceof Error ? err.message : "Unexpected error"
  return { status: 500, body: { error: message } }
}
