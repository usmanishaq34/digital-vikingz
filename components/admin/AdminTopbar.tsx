"use client"

import { signOut } from "next-auth/react"

export default function AdminTopbar({ user }: { user: { email: string; name: string | null } }) {
  return (
    <div className="bg-bg border-b border-line px-8 lg:px-10 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Signed in as</p>
        <p className="text-sm text-ink font-medium">{user.name || user.email}</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="font-mono text-[11px] uppercase tracking-widest text-ink-muted hover:text-accent px-4 py-2 border border-line hover:border-accent transition-colors"
        style={{ borderRadius: "2px" }}
      >
        Sign out
      </button>
    </div>
  )
}
