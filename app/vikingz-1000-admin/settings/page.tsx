import { prisma } from "@/lib/db"
import SettingsForm from "@/components/admin/SettingsForm"

export default async function AdminSettings() {
  let settings = await prisma.settings.findFirst().catch(() => null)

  if (!settings) {
    // Render a stub so admin doesn't crash when DB is empty
    return (
      <div className="max-w-3xl">
        <h1 className="h2-display italic-accent mb-6">Settings <em>not initialized.</em></h1>
        <p className="text-base text-ink-2 mb-4">
          Run <code className="font-mono bg-bg-3 px-2 py-1">npm run db:seed</code> to create the default settings row.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <header className="mb-10 pb-6 border-b border-line">
        <span className="section-label mb-4">Configuration</span>
        <h1 className="h2-display italic-accent">Site <em>settings.</em></h1>
        <p className="text-base text-ink-2 mt-2">
          Brand, contact, CTAs, social URLs, founder info. Changes propagate to the live site within ~60 seconds.
        </p>
      </header>

      <SettingsForm settings={settings} />
    </div>
  )
}
