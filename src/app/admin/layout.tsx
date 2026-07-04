import Link from 'next/link'
import { Building2, Newspaper, Users, LayoutDashboard, Upload } from 'lucide-react'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Import', href: '/admin/properties/import', icon: Upload },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Team', href: '/admin/team', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="w-56 bg-espresso text-cream flex flex-col shrink-0">
        <div className="p-5 border-b border-cream/10">
          <Link href="/admin" className="font-display text-h4 tracking-tight">LP Admin</Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-cream/70 hover:text-cream hover:bg-cream/10 transition-colors text-body-sm">
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-5 border-t border-cream/10">
          <Link href="/" className="text-cream/50 hover:text-cream text-body-xs transition-colors">
            ← View site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
