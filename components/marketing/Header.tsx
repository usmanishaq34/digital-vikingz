"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/data/site-content"
import { services as staticServices, getServicesByTier } from "@/data/services"
import clsx from "clsx"

interface NavService {
  slug: string
  title: string
  shortDescription: string
  tier: string // "Claim" | "Shield" | "Scale" (case-insensitive)
  categoryId?: string | null
}

interface NavCategory {
  id: string
  name: string
  slug: string
}

interface HeaderProps {
  services?: NavService[]
  categories?: NavCategory[]
}

export default function Header({ services: servicesProp, categories = [] }: HeaderProps = {}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  // Scroll behavior
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // Close dropdown on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")
  const isServicesActive = pathname.startsWith("/services")

  // Group services by tier — prefer DB-driven (servicesProp) if provided,
  // otherwise fall back to the static data file so untouched pages still work.
  const filterTier = (svc: NavService[] | undefined, tier: string) =>
    (svc ?? []).filter((s) => (s.tier || "").toString().toLowerCase() === tier.toLowerCase())

  const claimServices = servicesProp
    ? filterTier(servicesProp, "Claim")
    : getServicesByTier("Claim")
  const shieldServices = servicesProp
    ? filterTier(servicesProp, "Shield")
    : getServicesByTier("Shield")
  const scaleServices = servicesProp
    ? filterTier(servicesProp, "Scale")
    : getServicesByTier("Scale")

  // Categories — only show if there are services using them (otherwise empty section)
  const categoriesWithServices = (servicesProp && categories.length > 0)
    ? categories.filter((c) => servicesProp.some((s) => s.categoryId === c.id))
    : []

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b",
        scrolled ? "bg-white/96 shadow-sm" : "bg-white/85",
        "border-line"
      )}
    >
      <div className="max-w-content mx-auto px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            {/* Inline SVG logo placeholder — replace with /images/logo.svg if available */}
            <div className="w-9 h-9 bg-ink flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <span className="text-white font-display italic text-lg" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}>
                Dv
              </span>
            </div>
            <span className="font-display font-semibold text-[22px] tracking-tight text-ink">
              Digital Vikingz
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className={clsx(
            "hidden lg:flex items-center gap-8 m-0 p-0",
          )}>
            <li>
              <Link
                href="/operating-manual"
                className={clsx(
                  "text-sm font-medium font-body transition-colors whitespace-nowrap hover:text-accent",
                  isActive("/operating-manual") ? "text-accent" : "text-ink-2"
                )}
              >
                Operating Manual
              </Link>
            </li>
            <li>
              <Link
                href="/build-process"
                className={clsx(
                  "text-sm font-medium font-body transition-colors whitespace-nowrap hover:text-accent",
                  isActive("/build-process") ? "text-accent" : "text-ink-2"
                )}
              >
                Build Process
              </Link>
            </li>
            <li>
              <Link
                href="/vertical-playbooks"
                className={clsx(
                  "text-sm font-medium font-body transition-colors whitespace-nowrap hover:text-accent",
                  isActive("/vertical-playbooks") ? "text-accent" : "text-ink-2"
                )}
              >
                Vertical Playbooks
              </Link>
            </li>

            {/* Services Dropdown */}
            <li ref={dropdownRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setDropdownOpen(!dropdownOpen)
                }}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={clsx(
                  "inline-flex items-center gap-1.5 text-sm font-medium font-body transition-colors hover:text-accent",
                  (isServicesActive || dropdownOpen) ? "text-accent" : "text-ink-2"
                )}
              >
                Services
                <svg
                  className={clsx("transition-transform duration-200", dropdownOpen && "rotate-180")}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 bg-bg border border-line shadow-2xl p-6 min-w-[480px] grid grid-cols-2 gap-x-7 gap-y-5"
                  style={{ borderRadius: "2px" }}
                >
                  {/* Claim Tier */}
                  <div className="flex flex-col gap-2 col-start-1 row-start-1">
                    <span className="mono-pill text-accent border-b border-line pb-2 mb-1">
                      Claim Tier
                    </span>
                    {claimServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex flex-col gap-0.5 px-3 py-2.5 hover:bg-accent-soft transition-colors no-underline group/link"
                        style={{ borderRadius: "2px" }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="font-body font-semibold text-sm text-ink leading-tight group-hover/link:text-accent">
                          {s.title}
                        </span>
                        <span className="font-mono text-[10.5px] text-ink-muted tracking-wide leading-tight">
                          {s.shortDescription.split(".")[0].slice(0, 40)}…
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Shield Tier */}
                  <div className="flex flex-col gap-2 col-start-2 row-start-1 row-span-2">
                    <span className="mono-pill text-accent border-b border-line pb-2 mb-1">
                      Shield Tier
                    </span>
                    {shieldServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex flex-col gap-0.5 px-3 py-2.5 hover:bg-accent-soft transition-colors no-underline group/link"
                        style={{ borderRadius: "2px" }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="font-body font-semibold text-sm text-ink leading-tight group-hover/link:text-accent">
                          {s.title}
                        </span>
                        <span className="font-mono text-[10.5px] text-ink-muted tracking-wide leading-tight">
                          {s.shortDescription.split(".")[0].slice(0, 40)}…
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Scale Tier */}
                  <div className="flex flex-col gap-2 col-start-1 row-start-2">
                    <span className="mono-pill text-accent border-b border-line pb-2 mb-1">
                      Scale Tier
                    </span>
                    {scaleServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex flex-col gap-0.5 px-3 py-2.5 hover:bg-accent-soft transition-colors no-underline group/link"
                        style={{ borderRadius: "2px" }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="font-body font-semibold text-sm text-ink leading-tight group-hover/link:text-accent">
                          {s.title}
                        </span>
                        <span className="font-mono text-[10.5px] text-ink-muted tracking-wide leading-tight">
                          {s.shortDescription.split(".")[0].slice(0, 40)}…
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Categories — only shown in DB mode when categories exist */}
                  {categoriesWithServices.length > 0 && (
                    <div className="col-span-2 pt-4 mt-2 border-t border-line">
                      <span className="mono-pill text-accent block mb-3">
                        Browse by Category
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {categoriesWithServices.map((c) => (
                          <Link
                            key={c.id}
                            href={`/services?category=${c.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="font-mono text-[11px] uppercase tracking-widest font-bold px-3 py-1.5 border border-line-strong text-ink hover:border-accent hover:bg-accent hover:text-white transition-colors no-underline"
                            style={{ borderRadius: "2px" }}
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>

            <li>
              <Link
                href="/the-audit"
                className={clsx(
                  "text-sm font-medium font-body transition-colors whitespace-nowrap hover:text-accent",
                  isActive("/the-audit") ? "text-accent" : "text-ink-2"
                )}
              >
                The Audit
              </Link>
            </li>

            <li>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 font-semibold uppercase text-xs tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderRadius: "2px" }}
              >
                {siteConfig.cta.primary}
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="lg:hidden flex flex-col gap-1 border border-line-strong w-11 h-11 items-center justify-center"
          >
            <span className={clsx("w-4.5 h-px bg-ink transition-transform", mobileOpen && "translate-y-1.5 rotate-45")} />
            <span className={clsx("w-4.5 h-px bg-ink transition-opacity", mobileOpen && "opacity-0")} />
            <span className={clsx("w-4.5 h-px bg-ink transition-transform", mobileOpen && "-translate-y-1.5 -rotate-45")} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-bg border-b border-line shadow-lg px-7 py-6 flex flex-col gap-1">
            <Link href="/operating-manual" onClick={() => setMobileOpen(false)} className="py-3.5 border-b border-line text-ink-2 hover:text-accent">Operating Manual</Link>
            <Link href="/build-process" onClick={() => setMobileOpen(false)} className="py-3.5 border-b border-line text-ink-2 hover:text-accent">Build Process</Link>
            <Link href="/vertical-playbooks" onClick={() => setMobileOpen(false)} className="py-3.5 border-b border-line text-ink-2 hover:text-accent">Vertical Playbooks</Link>

            <details className="border-b border-line py-3.5">
              <summary className="cursor-pointer text-ink-2 list-none flex items-center justify-between">
                Services
                <span className="text-xs">▾</span>
              </summary>
              <div className="mt-3 pl-3 flex flex-col gap-2">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="text-sm text-ink-muted hover:text-accent py-1.5">
                    {s.title}
                  </Link>
                ))}
              </div>
            </details>

            <Link href="/the-audit" onClick={() => setMobileOpen(false)} className="py-3.5 border-b border-line text-ink-2 hover:text-accent">The Audit</Link>
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="bg-accent text-white text-center py-3 mt-3 font-semibold uppercase text-xs tracking-wide"
              style={{ borderRadius: "2px" }}
            >
              {siteConfig.cta.primary}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
