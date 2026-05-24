"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"

export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) {
        setError("Invalid email or password")
        toast.error("Sign-in failed")
      } else {
        toast.success("Signed in")
        router.push("/vikingz-1000-admin")
        router.refresh()
      }
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-12">
          <span className="w-11 h-11 bg-ink rounded-sm flex items-center justify-center p-1.5">
            <img
              src="/images/logo.png"
              alt="Digital Vikingz"
              className="w-full h-full object-contain"
            />
          </span>
          <span className="font-display font-semibold text-[22px] tracking-tight text-ink">Digital Vikingz</span>
        </Link>

        <div className="bg-bg border border-line p-8">
          <span className="section-label mb-5">Admin Access</span>
          <h1 className="font-display text-3xl font-medium mb-2 italic-accent">
            Sign in to <em>continue.</em>
          </h1>
          <p className="text-sm text-ink-2 mb-7">Editor access only. Public site requires no sign-in.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mono-pill block mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line-strong px-4 py-3 font-body text-ink focus:outline-none focus:border-accent transition-colors"
                style={{ borderRadius: "2px" }}
                placeholder="you@digitalvikingz.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mono-pill block mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-line-strong px-4 py-3 font-body text-ink focus:outline-none focus:border-accent transition-colors"
                style={{ borderRadius: "2px" }}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-ink-muted">
          <Link href="/" className="hover:text-accent transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  )
}
