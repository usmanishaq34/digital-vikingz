// Auth checks happen inside the admin layout itself
// (app/vikingz-1000-admin/layout.tsx), not via middleware.
// This file is kept as a no-op so Next.js doesn't complain about
// a missing middleware in any cached build.
import { NextResponse } from "next/server"

export function middleware() {
  return NextResponse.next()
}

export const config = {
  // match nothing — middleware is effectively disabled
  matcher: [],
}
