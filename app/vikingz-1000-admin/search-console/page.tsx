import SearchConsolePanel from "@/components/admin/SearchConsolePanel"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Search Console",
}

/**
 * Auth is enforced by app/vikingz-1000-admin/layout.tsx, which renders the
 * login form when there is no session — same as every other admin page.
 */
export default function SearchConsoleAdminPage({
  searchParams,
}: {
  searchParams: { notice?: string; error?: string; connected?: string }
}) {
  return (
    <SearchConsolePanel
      initialNotice={searchParams?.notice}
      initialError={searchParams?.error}
    />
  )
}
