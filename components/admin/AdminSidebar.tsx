"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const navItems = [
  { href: "/vikingz-1000-admin", label: "Dashboard" },
  { href: "/vikingz-1000-admin/pages", label: "Pages" },
  { href: "/vikingz-1000-admin/posts", label: "Posts" },
  { href: "/vikingz-1000-admin/services", label: "Services" },
  { href: "/vikingz-1000-admin/settings", label: "Settings" },
  { href: "/vikingz-1000-admin/media", label: "Media" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-ink text-white flex flex-col flex-shrink-0 sticky top-0 h-screen">
      <div className="p-6 border-b border-white/10">
        <Link href="/vikingz-1000-admin" className="font-display text-xl font-semibold flex items-center gap-2.5">
          <span className="w-8 h-8 bg-accent flex items-center justify-center font-display italic text-sm" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}>
            Dv
          </span>
          <span>Digital Vikingz</span>
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "/vikingz-1000-admin" ? pathname === "/vikingz-1000-admin" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block px-4 py-2.5 text-sm transition-colors",
                isActive ? "bg-accent text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              style={{ borderRadius: "2px" }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link href="/" className="block text-xs text-white/50 hover:text-white px-4 py-2 transition-colors">
          ← View site
        </Link>
      </div>
    </aside>
  )
}
