import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { auth } from "@/lib/auth"
import { buildAuthUrl, ADMIN_GSC_PATH, GscConfigError } from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Starts the Google OAuth flow.
 *
 * Requires an existing admin session — Google login is used only to link
 * Search Console, never to authenticate into the admin.
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const state = crypto.randomBytes(32).toString("hex")

  let url: string
  try {
    url = buildAuthUrl(state)
  } catch (err) {
    const message =
      err instanceof GscConfigError ? err.message : "Google Search Console is not configured."
    // Derive the base from the incoming request so this works regardless of
    // whether NEXTAUTH_URL is set.
    const back = new URL(ADMIN_GSC_PATH, req.nextUrl.origin)
    back.searchParams.set("error", message)
    return NextResponse.redirect(back)
  }

  const res = NextResponse.redirect(url)

  // CSRF protection: the callback must present a state matching this cookie.
  // httpOnly so page scripts can't read it; SameSite=Lax survives Google's
  // top-level redirect back to us.
  res.cookies.set("gsc_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })

  return res
}
