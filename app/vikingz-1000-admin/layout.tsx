import { auth } from "@/lib/auth"
import AdminLoginForm from "@/components/admin/AdminLoginForm"
import AdminShell from "@/components/admin/AdminShell"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    return <AdminLoginForm />
  }

  return <AdminShell>{children}</AdminShell>
}