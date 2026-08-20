import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { errorPayload, getConnection, listProperties, upsertConnection } from "@/lib/gsc"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Lists Search Console properties the connected Google account can access. */
export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const properties = await listProperties()
    const conn = await getConnection()
    return NextResponse.json({
      properties,
      selected: conn?.siteUrl ?? null,
    })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}

/** Switches the active property. */
export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    const siteUrl = typeof body?.siteUrl === "string" ? body.siteUrl.trim() : ""
    if (!siteUrl) {
      return NextResponse.json({ error: "A property must be provided." }, { status: 400 })
    }

    // Only accept a property Google actually reports for this account.
    const properties = await listProperties()
    if (!properties.some((p) => p.siteUrl === siteUrl)) {
      return NextResponse.json(
        {
          error:
            "That property is not available to the connected Google account. Verify it in Search Console, or reconnect with an account that owns it.",
        },
        { status: 404 }
      )
    }

    await upsertConnection({ siteUrl })
    return NextResponse.json({ ok: true, siteUrl })
  } catch (err) {
    const { status, body } = errorPayload(err)
    return NextResponse.json(body, { status })
  }
}
