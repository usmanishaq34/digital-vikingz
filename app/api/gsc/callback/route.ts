import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { auth } from "@/lib/auth"
import {
  ADMIN_GSC_PATH,
  defaultSitemapUrl,
  encryptToken,
  ensureSitemapSubmitted,
  exchangeCodeForTokens,
  getGscEnv,
  listProperties,
  pickPreferredProperty,
  resetTokenCache,
  upsertConnection,
} from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function adminUrl(req: NextRequest, params: Record<string, string>): URL {
  const url = new URL(ADMIN_GSC_PATH, req.nextUrl.origin)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  return url
}

/**
 * Google's OAuth redirect target.
 *
 * A direct visit without OAuth parameters redirects back to the admin with
 * an explanatory message rather than rendering a 404.
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) {
    // Not signed into the admin — send them to the admin, which renders login.
    return NextResponse.redirect(
      adminUrl(req, { error: "Sign in to the admin before connecting Google Search Console." })
    )
  }

  const params = req.nextUrl.searchParams
  const code = params.get("code")
  const state = params.get("state")
  const oauthError = params.get("error")

  const jar = cookies()
  const expectedState = jar.get("gsc_oauth_state")?.value

  const clearStateCookie = (res: NextResponse) => {
    res.cookies.set("gsc_oauth_state", "", { path: "/", maxAge: 0 })
    return res
  }

  // ---- Google reported an error (user denied consent, etc.) ----
  if (oauthError) {
    const message =
      oauthError === "access_denied"
        ? "Google permission was denied. Search Console was not connected."
        : `Google returned an OAuth error: ${oauthError}`
    return clearStateCookie(NextResponse.redirect(adminUrl(req, { error: message })))
  }

  // ---- Direct visit with no OAuth parameters ----
  if (!code && !state) {
    return clearStateCookie(
      NextResponse.redirect(
        adminUrl(req, {
          error:
            "This is the Google OAuth callback route. Start the connection from the Connect Google Search Console button.",
        })
      )
    )
  }

  // ---- CSRF state validation ----
  if (!state || !expectedState || state !== expectedState) {
    return clearStateCookie(
      NextResponse.redirect(
        adminUrl(req, {
          error:
            "OAuth state mismatch — the request could not be verified. Start the connection again from the admin.",
        })
      )
    )
  }

  if (!code) {
    return clearStateCookie(
      NextResponse.redirect(
        adminUrl(req, { error: "Google did not return an authorization code. Try connecting again." })
      )
    )
  }

  try {
    const env = getGscEnv()
    const tokens = await exchangeCodeForTokens(code)

    if (!tokens.refresh_token) {
      // Should not happen: prompt=consent is always sent. If it does, the
      // app already holds a grant and Google is withholding a new token.
      return clearStateCookie(
        NextResponse.redirect(
          adminUrl(req, {
            error:
              "Google did not return a refresh token. Remove this app at myaccount.google.com/permissions, then connect again.",
          })
        )
      )
    }

    resetTokenCache()

    await upsertConnection({
      refreshTokenEnc: encryptToken(tokens.refresh_token, env.encryptionKey),
      connectedAt: new Date(),
      lastQuotaError: null,
      lastQuotaErrorAt: null,
      lastQuotaSource: null,
    })

    // ---- Detect and select a property ----
    let selected: string | null = null
    let notice = ""
    try {
      const properties = await listProperties()
      selected = pickPreferredProperty(properties, env.siteUrl)
      if (selected) {
        await upsertConnection({ siteUrl: selected })
      } else {
        notice =
          "Connected, but this Google account has no Search Console properties. Verify the property in Search Console first."
      }
    } catch (err) {
      notice = `Connected, but properties could not be listed: ${
        err instanceof Error ? err.message : "unknown error"
      }`
    }

    // ---- Submit the existing sitemap once, if Google doesn't have it ----
    let sitemapNote = ""
    if (selected) {
      try {
        const feed = defaultSitemapUrl()
        const result = await ensureSitemapSubmitted(selected, feed)
        sitemapNote = result.alreadyPresent
          ? "Sitemap was already submitted."
          : "Sitemap submitted to Google."
      } catch (err) {
        sitemapNote = `Sitemap could not be submitted automatically: ${
          err instanceof Error ? err.message : "unknown error"
        }`
      }
    }

    const message = ["Google Search Console connected.", notice, sitemapNote]
      .filter(Boolean)
      .join(" ")

    return clearStateCookie(
      NextResponse.redirect(adminUrl(req, { connected: "1", notice: message }))
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connection failed."
    return clearStateCookie(NextResponse.redirect(adminUrl(req, { error: message })))
  }
}
